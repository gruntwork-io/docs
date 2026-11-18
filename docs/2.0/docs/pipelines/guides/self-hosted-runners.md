# Running Pipelines on a Self-Hosted Runner

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Pipelines jobs normally run on your CI platform's hosted runners. This guide shows how to point Pipelines at a self-hosted runner instead, and how to run one in Docker on a machine you control.

Use a self-hosted runner when:

- Hosted runners run out of memory on large plans or applies, such as account baselines. The job dies partway through, often with `exit code 143`, `exit code 137` or "The runner has received a shutdown signal".
- You want to debug a job on a machine where you can watch its memory use and logs.
- You need a bigger machine for a while, for example during a large migration.

A runner on one machine is not highly available. While it is offline, Pipelines jobs wait for it. For a permanent setup, use your platform's larger hosted runners or an autoscaling runner fleet.

:::warning Security
- Anyone who can run a pipeline in the repository can run code on the runner's machine, with the cloud credentials Pipelines obtains for the job. Use self-hosted runners only on private repositories with trusted contributors. GitHub [recommends against using them on public repositories](https://docs.github.com/en/actions/hosting-your-own-runners/managing-self-hosted-runners/about-self-hosted-runners#self-hosted-runner-security).
- The GitLab runner mounts the host's Docker socket, which is equivalent to root access on the host.
- Never put registration or runner tokens in command lines or commit them. Job logs and the runner's `~/.gitconfig` can contain live tokens.
- Don't bake AWS keys or SSH keys into the image. Pipelines authenticates to your cloud with OIDC and sets up git authentication for each job.
:::

## Configuring Pipelines to use the runner

Give the runner a label (GitHub) or tag (GitLab), such as `pipelines-local`, then tell Pipelines to request it. Setting up the runner itself is covered [below](#setting-up-the-runner).

<Tabs groupId="platform">
<TabItem value="github" label="GitHub">

Pipelines' reusable workflows take a `runner` input, which becomes the `runs-on` value of every job in the workflow. It is a JSON-encoded string holding a single label such as `'"ubuntu-latest"'` (the default), a list of labels, or a runner group object.

```yaml title=".github/workflows/pipelines.yml"
name: Pipelines
run-name: "[GWP]: ${{ github.event.commits[0].message || github.event.pull_request.title || 'No commit message' }}"
on:
  push:
    branches:
      - main
    paths-ignore:
      - ".github/**"
  pull_request:
    types:
      - opened
      - synchronize
      - reopened
    paths-ignore:
      - ".github/**"

permissions:
  id-token: write
  contents: write
  pull-requests: write

jobs:
  GruntworkPipelines:
    uses: gruntwork-io/pipelines-workflows/.github/workflows/pipelines.yml@v4
    with:
      runner: '["self-hosted", "pipelines-local"]'
```

Add the same `with: runner:` line to every workflow in your repository that calls `gruntwork-io/pipelines-workflows`:

| Workflow in your repository | Gruntwork workflow it calls |
|---|---|
| `pipelines.yml` (`infrastructure-live-root`) | `pipelines-root.yml` |
| `pipelines.yml` (other repositories) | `pipelines.yml` |
| `pipelines-drift-detection.yml` | `pipelines-drift-detection.yml` |
| `pipelines-unlock.yml` | `pipelines-unlock.yml` |

Workflows that don't call `pipelines-workflows`, such as `account-factory.yml`, set their own `runs-on` and are not affected.

For `pull_request` events, GitHub uses the workflow file from the pull request branch, so you can try the runner on a branch first. Applies on your deploy branch use the workflow file on that branch, so the change must be merged for applies to use the runner.

</TabItem>
<TabItem value="gitlab" label="GitLab">

The Pipelines component sets no tags on its jobs, so they use your project's defaults. Set `default.tags` in your root `.gitlab-ci.yml`, after the `spec` section:

```yaml title=".gitlab-ci.yml"
spec:
  inputs:
    # ... your existing inputs
---
default:
  tags:
    - pipelines-local

workflow:
  name: GruntworkPipelines
  rules:
    - if: $CI_PIPELINE_SOURCE == 'merge_request_event'
    - if: $CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH

include:
  - component: gitlab.com/gruntwork-io/pipelines-workflows/pipelines@v2
    inputs:
      # ... your existing inputs
```

Plans and applies run in child pipelines that Pipelines generates, which don't inherit `default` from your file. Pipelines therefore reads your CI configuration file (`.gitlab-ci.yml`, or your project's custom CI/CD configuration path) and copies the first `default.tags` it finds into each child pipeline. Tags set on individual jobs are not copied.

Instead of tags, you can enable **Run untagged jobs** on the runner and leave `default.tags` unset. Jobs could then still go to GitLab's instance runners, so also turn those off for the project under **Settings > CI/CD > Runners**.

Merge request pipelines use the `.gitlab-ci.yml` on the merge request branch. Pipelines after merge use the one on your deploy branch.

</TabItem>
</Tabs>

### Switching back to hosted runners

Remove the `runner` input (GitHub), or remove `default.tags` and turn instance runners back on if you disabled them (GitLab). Merge that change, or every Pipelines run will wait for your runner. Then remove the runner as described [below](#removing-the-runner).

## Setting up the runner

You need Docker Engine on the machine, outbound HTTPS to your CI platform, `api.prod.app.gruntwork.io`, GitHub and your cloud provider, and admin access to the GitHub repository or the Maintainer role on the GitLab project. If Docker runs in a VM, such as Docker Desktop, the VM's memory limit caps what containers can use.

Pin the image versions, as below, and update them when you choose to.

<Tabs groupId="platform">
<TabItem value="github" label="GitHub">

A GitHub runner runs every job in the same long-lived container, so the image needs the base tools Pipelines expects. Each job downloads the Pipelines CLI, then uses [mise](https://mise.jdx.dev/) to install the tools listed in your repository's `.mise.toml`, such as OpenTofu and Terragrunt.

```dockerfile title="Dockerfile"
FROM ghcr.io/actions/actions-runner:2.338.2

USER root
RUN apt-get update -qq \
 && apt-get install -y -qq --no-install-recommends bash git curl wget unzip jq ca-certificates gpg \
 && mkdir -p -m 755 /etc/apt/keyrings \
 && wget -qO /etc/apt/keyrings/githubcli-archive-keyring.gpg https://cli.github.com/packages/githubcli-archive-keyring.gpg \
 && echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" \
      > /etc/apt/sources.list.d/github-cli.list \
 && apt-get update -qq && apt-get install -y -qq gh \
 && rm -rf /var/lib/apt/lists/*

COPY --chmod=755 entrypoint.sh /usr/local/bin/runner-entrypoint.sh
USER runner
WORKDIR /home/runner
ENTRYPOINT ["/usr/local/bin/runner-entrypoint.sh"]
```

The image doesn't include the AWS CLI. If your modules or hooks call `aws`, list `awscli` in your `.mise.toml`, as in the [example configuration](/2.0/reference/pipelines/configurations#example-mise-configuration).

```bash title="entrypoint.sh"
#!/bin/bash
# /home/runner is a named volume, so the registration, ~/.cache and mise's tools persist.
set -euo pipefail
cd /home/runner

# mise rejects /dev/null as a global config file, so give it an empty one.
touch .mise-global.toml
mkdir -p .mise-data .cache

# Pipelines writes short-lived git credentials to ~/.gitconfig. The runner is reused
# between jobs, so delete it before each job.
printf '#!/bin/bash\nrm -f "$HOME/.gitconfig"\n' > reset-gitconfig.sh
chmod +x reset-gitconfig.sh

# The runner reads .env at startup.
touch .env
sed -i -E '/^(MISE_GLOBAL_CONFIG_FILE|MISE_DATA_DIR|MISE_CEILING_PATHS|ACTIONS_RUNNER_HOOK_JOB_STARTED)=/d' .env
cat >> .env <<ENV
MISE_GLOBAL_CONFIG_FILE=/home/runner/.mise-global.toml
MISE_DATA_DIR=/home/runner/.mise-data
MISE_CEILING_PATHS=/home/runner
ACTIONS_RUNNER_HOOK_JOB_STARTED=/home/runner/reset-gitconfig.sh
ENV

case "${1:-run}" in
  register)
    : "${RUNNER_TOKEN:?}" "${RUNNER_URL:?}" "${RUNNER_NAME:?}" "${RUNNER_LABELS:?}"
    exec ./config.sh --unattended --replace --url "${RUNNER_URL}" --token "${RUNNER_TOKEN}" \
      --name "${RUNNER_NAME}" --labels "${RUNNER_LABELS}" --work _work
    ;;
  run)
    [[ -f .runner ]] || { echo "Runner is not registered; run the register step first." >&2; exit 1; }
    exec ./run.sh
    ;;
  *) exec "$@" ;;
esac
```

Build the image, register once in a throwaway container, then start the runner. The registration is stored on the volume, in `/home/runner/.runner`, so the image isn't tied to a repository. Registration tokens expire after about an hour. Because the registration is on the volume, the long-running container never needs a token and can restart without registering again.

```bash
docker build -t pipelines-runner:2.338.2 .

# For an organization-level runner, use orgs/<org>/actions/runners/registration-token
# and RUNNER_URL=https://github.com/<org>.
export RUNNER_TOKEN="$(gh api -X POST repos/<owner>/<repo>/actions/runners/registration-token --jq .token)"
docker run --rm -v pipelines-runner-home:/home/runner \
  -e RUNNER_TOKEN \
  -e RUNNER_URL="https://github.com/<owner>/<repo>" \
  -e RUNNER_NAME="<machine-name>-pipelines" \
  -e RUNNER_LABELS="pipelines-local" \
  pipelines-runner:2.338.2 register
unset RUNNER_TOKEN

docker run -d --name pipelines-runner --restart unless-stopped \
  --memory 20g --memory-swap 20g \
  -v pipelines-runner-home:/home/runner \
  pipelines-runner:2.338.2
```

Setting `--memory-swap` equal to `--memory` disables swap, so a job that exceeds the cap is killed instead of exhausting the host. See [Sizing the runner](#sizing-the-runner) to choose the cap. To change it later, run `docker update --memory <size> --memory-swap <size> pipelines-runner`. The container doesn't need to restart. GitHub adds the `self-hosted` label automatically. Check the runner is online:

```bash
gh api repos/<owner>/<repo>/actions/runners --jq '.runners[] | "\(.name) \(.status) busy=\(.busy)"'
```

To change the image's tools, rebuild with a new tag and re-create the container on the same volume. Install tools system-wide, because the volume hides anything the image puts in `/home/runner`.

To serve more than one repository from the same image, either:

- Run one runner per repository. Each needs its own name, container, volume and memory cap, and the caps add up on the host.
- Register one organization-level runner with the `orgs/<org>` token endpoint and URL shown above. Use a [runner group](https://docs.github.com/en/actions/hosting-your-own-runners/managing-self-hosted-runners/managing-access-to-self-hosted-runners-using-groups) to limit which repositories can use it. A runner runs one job at a time, so jobs from different repositories wait for each other.

</TabItem>
<TabItem value="gitlab" label="GitLab">

A GitLab runner with the Docker executor starts a fresh container for each job from Pipelines' job image, so nothing carries over between jobs.

1. In your project, go to **Settings > CI/CD > Runners** and select **New project runner** (or create a group runner). Enter `pipelines-local` as a tag. Tags are set here, not when you register the runner. Leave **Protected** unchecked, or the runner won't run merge request plans. You can also use the [`POST /user/runners`](https://docs.gitlab.com/api/users/#create-a-runner-linked-to-a-user) API.
2. Copy the runner authentication token (it starts with `glrt-`), then register and start the runner:

```bash
# Paste the token at the prompt, so it stays out of your shell history.
read -rs CI_SERVER_TOKEN && export CI_SERVER_TOKEN
docker run --rm -v pipelines-gl-runner-config:/etc/gitlab-runner -e CI_SERVER_TOKEN \
  gitlab/gitlab-runner:v19.5.2 register --non-interactive \
  --url https://gitlab.com \
  --name "<machine-name>-pipelines" \
  --executor docker \
  --docker-image registry.gitlab.com/gruntwork-io/gitlab-pipelines-container-image:v1 \
  --docker-pull-policy always \
  --docker-memory 20g --docker-memory-swap 20g \
  --docker-volumes pipelines-gl-runner-cache:/root/.cache
unset CI_SERVER_TOKEN

docker run -d --name pipelines-gl-runner --restart unless-stopped \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v pipelines-gl-runner-config:/etc/gitlab-runner \
  gitlab/gitlab-runner:v19.5.2
```

- The memory flags cap each job container. Pipelines' job image runs as `root`, so the cache volume mounts at `/root/.cache`.
- `always` keeps the floating `:v1` job image current. If you hit registry rate limits, use `if-not-present` and pull the image yourself when you update Pipelines.
- The runner runs one job at a time. To run more, raise `concurrent` in `config.toml`:

  ```bash
  docker run --rm -v pipelines-gl-runner-config:/etc/gitlab-runner --entrypoint sh gitlab/gitlab-runner:v19.5.2 \
    -c "sed -i 's/^concurrent = .*/concurrent = 2/' /etc/gitlab-runner/config.toml"
  ```

Check that the runner shows as online under **Settings > CI/CD > Runners**.

</TabItem>
</Tabs>

### Removing the runner

<Tabs groupId="platform">
<TabItem value="github" label="GitHub">

```bash
docker rm -f pipelines-runner
RUNNER_ID=$(gh api repos/<owner>/<repo>/actions/runners --jq '.runners[] | select(.name == "<machine-name>-pipelines") | .id')
gh api -X DELETE "repos/<owner>/<repo>/actions/runners/${RUNNER_ID}"
docker volume rm pipelines-runner-home
```

</TabItem>
<TabItem value="gitlab" label="GitLab">

```bash
docker rm -f pipelines-gl-runner
docker run --rm -v pipelines-gl-runner-config:/etc/gitlab-runner gitlab/gitlab-runner:v19.5.2 unregister --all-runners
docker volume rm pipelines-gl-runner-config pipelines-gl-runner-cache
```

If the runner is still listed under **Settings > CI/CD > Runners**, delete it there.

</TabItem>
</Tabs>

## Sizing the runner

Memory use grows with the number of units Terragrunt runs at once. Allow about 3 GB for each heavy unit running at the same time, such as an account baseline, plus more for the other units. In one measured case, a plan with `TG_PARALLELISM=5` peaked at about 15 GiB. In another, a plan of 16 units with two account baselines running at once peaked at about 15 GiB and reached a 16 GiB cap. That peak rose from about 4 GiB to 15 GiB and fell back within about 20 seconds.

The examples above use a 20 GB cap for repositories with account baselines. With a 16 GB cap, those jobs come close to being killed.

The kernel frees page cache when a container reaches its cap, so a job can reach the cap and keep running. To check whether it did, run `docker exec pipelines-runner cat /sys/fs/cgroup/memory.events` on a host that uses cgroup v2. A non-zero `max` means the cap was reached, and a non-zero `oom_kill` means a process was killed. The counts accumulate until the container restarts.

Pick a memory cap the machine can spare, then lower `TG_PARALLELISM` with the [`env` option](/2.0/docs/pipelines/guides/terragrunt-env-vars) in `.gruntwork/config.yml` until your largest jobs fit under it. A GitHub runner runs one job at a time, so start more runners, each with its own name, container and volume, for parallel jobs. A GitLab runner needs `concurrent` times the per-job cap. `docker stats` shows memory use while a job runs, but it can miss short peaks like the one above.

## Troubleshooting

**Jobs wait for a runner and never start.** No online runner matches all the requested labels or tags. Check that the runner is online and idle, and that the labels in the `runner` input or `default.tags` match it exactly. On GitHub, the `runner` input must be valid JSON. On GitLab, check that the runner isn't paused or protected. GitHub [limits which self-hosted runners a reusable workflow owned by another organization can use](https://docs.github.com/en/actions/sharing-automations/reusing-workflows#using-self-hosted-runners). If the checks above pass and jobs still wait, contact Gruntwork support.

**Exit code 127.** A command was not found. On GitHub, the runner image lacks a tool that hosted runners include. Check with `docker exec pipelines-runner bash -c 'command -v <tool>'`, then add the tool to your `.mise.toml`, or to the `Dockerfile` and rebuild. On GitLab, jobs run in Pipelines' image, so the missing tool is usually one your own hooks or scripts need.

**State lock errors after a killed job.** A job killed for exceeding the memory cap (`docker inspect -f '{{.State.OOMKilled}}' <container>`) can leave a state lock behind, and the next run fails with `Error acquiring the state lock`. Check that no other Pipelines run is in progress on the unit, then [remove the lock](/2.0/docs/pipelines/guides/unlock) and re-run the failed jobs.

**Git authentication errors on a GitHub runner.** `Invalid username or token` or `could not read Username` while downloading modules means an expired token from an earlier job is still in `~/.gitconfig`. Check that `ACTIONS_RUNNER_HOOK_JOB_STARTED` is in `/home/runner/.env`, and run `docker exec pipelines-runner rm -f /home/runner/.gitconfig` to clear it immediately. GitLab runners start each job in a fresh container, so they are not affected.

# Ongoing Updates

## Overview

As we mentioned in the [Patcher overview](../concepts/index.md), Patcher supports two primary modes of working:

1. **Legacy upgrade.** You wish to take a repo or set of files that are significantly out of date and bring them up to date with the latest OpenTofu/Terraform module versions.
2. **Ongoing updates.** You wish to streamline the process of keeping a repo or set of files up to date over time.

In this guide, we'll use Patcher to help you with the second mode. The basic idea is that we'll set up a GitHub Action that scans your entire repository for outdated dependencies and automatically creates pull requests to keep everything up to date.

This approach is ideal for teams that want to:
- Maintain current dependencies across their entire codebase
- Receive regular automated updates without manual intervention
- Keep security vulnerabilities and technical debt to a minimum

## Which CI systems are supported?

Patcher CLI is a binary and is therefore agnostic to the underlying CI system, however the GitHub Action we describe here currently only works for GitHub.com, GitHub Enterprise, or GitHub Enterprise Self-Hosted.

## Implementation

We're about to create a single GitHub Actions workflow that consists of two main jobs:

1. **`patcher-report`**: Scans your entire repository for outdated dependencies
2. **`patcher-update`**: Creates individual pull requests for each dependency that needs updating

:::info
Individual pull requests can quickly get overwhelming. Once you've got this working, check out our page on [grouping](../concepts/grouping.md) to see how to consolidate many updates into a single pull request.
:::

### For GitHub.com users

#### 1. Create a GitHub token
- Create a token that can read patcher-cli and terrapatch-cli releases from `gruntwork-io`
  - See [GitHub Personal Access Token Setup](#github-personal-access-token-setup) below.
- Save it as a GitHub Actions secret named `PATCHER_CI_TOKEN`.

:::note
We've just insructed you to create a single GitHub token for both "read" privileges (when Patcher wants to read dependencies from other repos) and "write" privileges (when Patcher wants to open a pull request on a repo). But per the principle of least privilege, you can improve your security posture by creating one token for read privileges and one write privileges, and then saving them each as a separate secret, e.g.:

- `PATCHER_READ_TOKEN`
- `PATCHER_WRITE_TOKEN`
:::

:::warning
Most of the time when users have challenges getting Patcher to work, it's because their GitHub token is not set up correctly, so be sure to complete this step carefully!

If you'd like to explicitly validate that your GitHub token is configured correctly, consider copying and pasting our [Validate GitHub Access Token](https://github.com/gruntwork-io/patcher-action/blob/main/.github/workflows/validate-github-access.yml) workflow into your own GitHub Actions workflow and filling in the inputs as needed.
:::

#### 2. Add the GitHub Actions workflow file
- In the repo in which you want Patcher to run, create a new file `.github/workflows/patcher-updates.yml`.
- Populate it using one of the [GitHub Actions Workflow Examples](#github-actions-workflow-examples) below.

#### 3. Choose when to run Patcher
- There are three non-mutually exclusive options for when Patcher will run:
  1. **On a schedule (recommended):** Run Patcher on a weekly basis (or other cadence that fits your workflow).
  2. **Manually**: Use `workflow_dispatch` for ad-hoc runs. This lets you trigger Patcher on demand from the GitHub UI to test changes, validate permissions, or run outside your normal schedule.
  3. **When a new module version is released:** Use the `repository_dispatch` trigger to run when a new module release is published.

  See the examples below for a scheduled run and a `repository_dispatch` trigger you can reuse. For most teams, a weekly schedule plus the ability to run manually works well.

#### 4. Do a test run and review!
- Manually run the GitHub Actions workflow the first time to validate configuration.
  - To run manually: in your repo, go to Actions → select “Patcher Updates” → Run workflow → choose the branch → Run workflow.
- Review the generated PRs and merge as desired.
- Going forward, Patcher will continue to run according to the trigger you set in step 3, but you've now confirmed that it works successfully!
  

### For GitHub Enterprise Self-Hosted users

:::info
Self-hosting Patcher is extra work. Only follow this approach if your organization will not allow accessing Patcher via GitHub.com.
:::

Many GitHub Enterprise users self-host GitHub Enterprise and wish to host all binaries internally. If you'd like to fully [self-host Patcher](./self-hosting.md), then follow the steps below to set up ongoing updates:

#### 1. Self-host the relevant Gruntwork repos

The first step is to self-host the following repos:

1. https://github.com/gruntwork-io/patcher-cli
2. https://github.com/gruntwork-io/terrapatch-cli
3. https://github.com/gruntwork-io/patcher-action

To set up local copies of these repos in your own organization and automatically keep them up to date as Gruntwork issues new releases, we can use our [repo-copier](https://github.com/gruntwork-io/repo-copier) tool. We originally built repo-copier to enable customers to [self-host the IaC Library](../../library/guides/self-hosting.md), but even if you don't use any Gruntwork IaC Library modules, repo-copier does exactly what we want here -- On a nightly basis, it copies all git history, issues, pull requests, and release assets of each specified github.com/gruntwork-io repo to your local repo copy.

Complete this step by following guidance in [self-host-the IaC Library](../../library/guides/self-hosting.md), and configure repo-copier to copy the above repos. Once you have local copies of these repos, we will set up a GitHub Actions workflow to make use of them.

#### 2. Follow the steps above

Now follow all but the final step in [Step-by-step setup for GitHub.com users](#step-by-step-setup-for-githubcom-users). The final step above is to test that everything is working, but we don't wnat to do that until you've made the modifications below. Once you've completed steps 1 - 3 above, return here, and go to step 3 below.

#### 3. Confirm your GitHub Enterprise settings

Confirm that you updated the GitHub Action workflow as described in [For GitHub Enterprise Self-Hosted Users](#for-github-enterprise-self-hosted-users-1) to work with your specific GitHub Enterprise setup. This will:

- Specify your GitHub Enterprise settings
- Use your local copy of our Patcher GitHub Action (versus our version hosted at GitHub.com); remember that thanks to repo-copier, they should be exactly the same, except that yours is hosted internally.

#### 4. Confirm that your runners will work with the `patcher-action`.

Our published `patcher-action` specifies the GitHub Actions workflow will run on GitHub-hosted `ubuntu-latest` runners. But in the GitHub Enterprise self-hosted environment, this exact runner tag might not be available for you. If it's not, you'll either need to:

1. Change the GitHub Actions workflow `runs-on` value to a runner you have internaly, or
2. Tag your existing runners with `ubuntu-latest` so it gets picked up by the new GitHub Action.

#### 5. Make your internal GitHub Action accessible 

By default, repos in GitHub Enterprise are not accessible to GitHub Actions run in other repos. We will need to change this setting by going to your internal `patcher-action` repo → click **Settings** → click **Actions**, then **General** → scroll down to **Access** and select the desired access level (we recommend "Accessible from repositories in the 'your_org' organization").

#### 6. Do a test run and review!

At last, we're ready to test! Now head back up to [Do a test run and review!](#4-do-a-test-run-and-review) up above.

## GitHub Actions Workflow Examples

We've included example GitHub Actions workflow files both for GitHub.com users and GitHub Enterprise users (both hosted and self-hosted). These workflows work well "out of the box," but you are free to customize them as needed.

### For GitHub.com users

Create a new file `.github/workflows/patcher-updates.yml` in your repository:

```yml
name: Patcher Updates

on:
  workflow_dispatch:
  # If you don't need to manually trigger Patcher on every new module release, delete the `repository_dispatch` section.
  repository_dispatch:
    # Triggered when external systems POST to /repos/{owner}/{repo}/dispatches with event_type: "new_module_release"
    types: [new_module_release]
  schedule:
    # Run every Monday at 04:15 UTC
    - cron: "15 4 * * 1"

permissions:
  contents: write
  pull-requests: write

jobs:
  patcher-report:
    runs-on: ubuntu-latest
    outputs:
      dependencies: ${{ steps.get-deps.outputs.dependencies }}
    steps:
      - uses: actions/checkout@v4
      - id: get-deps
        uses: gruntwork-io/patcher-action@v2
        with:
          patcher_command: report
          read_token: ${{ secrets.PATCHER_CI_TOKEN }}
          working_dir: ./

  patcher-update:
    needs: [patcher-report]
    runs-on: ubuntu-latest
    strategy:
      fail-fast: false
      matrix:
        dependency: ${{ fromJson(needs.patcher-report.outputs.dependencies) }}
    steps:
      - uses: actions/checkout@v4
        with:
          # Make sure Patcher has enough Git history to correctly determine changes
          fetch-depth: 0

      - uses: gruntwork-io/patcher-action@v2
        with:
          patcher_command: update
          update_token: ${{ secrets.PATCHER_CI_TOKEN }}
          working_dir: ./
          dependency: ${{ matrix.dependency }}
          pull_request_title: "[Patcher] Update ${{ matrix.dependency }}"
          pull_request_branch: "patcher-updates-${{ matrix.dependency }}"
```

### For GitHub Enterprise Self-Hosted users

We can use the same GitHub Action above, but with the following changes:

1. GitHub Enterprise Server deployments often use self-hosted runners instead of GitHub-hosted runners. Update the `runs-on` value for each job to match your available runner labels.
2. Presumably, you're self-hosting the [gruntwork-io/patcher-action](https://github.com/gruntwork-io/patcher-action). If that's the case, update any instances of the `uses` value to match your local GitHub Enterprise repo. For example, replace `my-enterprise-org/patcher-action@v2` with your actual org name and the name you chose for the `patcher-action` repo.
3. Update the `github_base_url`, `github_org`, `patcher_git_repo` (if necessary), `terrapatch_git_repo` (if necessary), and `terrapatch_github_org` properties to reflect your organization's GitHub Enterprise Self-Hosted values.

```yml
name: Patcher Updates

on:
  workflow_dispatch:
  # If you don't need to manually trigger Patcher on every new module release, delete the `repository_dispatch` section.
  repository_dispatch:
    # Triggered when external systems POST to /repos/{owner}/{repo}/dispatches with event_type: "new_module_release"
    types: [new_module_release]
  schedule:
    # Run every Monday at 04:15 UTC
    - cron: "15 4 * * 1"

permissions:
  contents: write
  pull-requests: write

jobs:
  # 1) Report job (Enterprise): discover outdated dependencies
  patcher-report:
    runs-on: ubuntu-latest
    outputs:
      dependencies: ${{ steps.get-deps.outputs.dependencies }}
    steps:
      - uses: actions/checkout@v4
      - id: get-deps
        uses: my-enterprise-org/patcher-action@v2
        with:
          patcher_command: report
          read_token: ${{ secrets.PATCHER_CI_TOKEN }}
          github_base_url: "https://github.company.com"
          github_org: "my-enterprise-org"
          patcher_git_repo: "patcher-cli"
          terrapatch_git_repo: "terrapatch-cli"
          # Optional: defaults to github_org if not provided
          terrapatch_github_org: "my-enterprise-org"
          working_dir: ./

  # 2) Update job (Enterprise): open one PR per dependency
  patcher-update:
    needs: [patcher-report]
    runs-on: ubuntu-latest
    strategy:
      fail-fast: false
      matrix:
        dependency: ${{ fromJson(needs.patcher-report.outputs.dependencies) }}
    steps:
      - uses: actions/checkout@v4
        with:
          # Ensure enough history for accurate diffs
          fetch-depth: 0
      - uses: my-enterprise-org/patcher-action@v2
        with:
          patcher_command: update
          update_token: ${{ secrets.PATCHER_CI_TOKEN }}
          working_dir: ./
          dependency: ${{ matrix.dependency }}
          pull_request_title: "[Patcher] Update ${{ matrix.dependency }}"
          pull_request_branch: "patcher-updates-${{ matrix.dependency }}"
```

## GitHub Personal Access Token Setup

You'll need to manually create a GitHub token that has permission to access the Patcher CLI and Terrapatch CLI tools.
You could create either a [fine-grained or classic token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#types-of-personal-access-tokens), and we recommend creating a fine-grained token as follows:

#### 1. Navigate to GitHub Settings
   - Click your profile picture → **Settings** → **Developer settings** → **Personal access tokens** → **Fine-grained tokens**

#### 2. Create New Token
   - Click **Generate new token**
   - Select **Fine-grained personal access token**

#### 3. Configure Token Settings
   - **Token name**: Choose a descriptive name (e.g., `PATCHER_CI_TOKEN`)
   - **Expiration**: Set to **90 days** or shorter or longer, depending on your internal security policy.
   - **Resource owner**: Select the GitHub organization that holds the patcher-cli and terrapatch-cli tools.
     - If you are accessing these via GitHub.com, the organization is `gruntwork-io`.
     - If you are accessing these via self-hosted GitHub Enterprise, the organization is whatever GitHub organization has the `patcher-cli` and `terrapatch-cli` repos.

     :::warning
     It's easy to not select the right organization! Be sure to select the right GitHub org -- not your username -- that actually holds the repos you're looking to access.
     :::

#### 4. Configure Repository Access
   Configure access to the following repositories:
   - The **patcher-cli repository** (typically `gruntwork-io/patcher-cli` or your custom org)
   - The **terrapatch-cli repository** (typically `gruntwork-io/terrapatch-cli` or your custom org)

#### 5. Set Required Permissions
   Under "Permissions", configure these **Repository permissions**:
   - **Contents**: **Read** access
   - **Metadata**: **Read** access
   - **Actions**: **Read** access (for downloading releases)

   :::info
   The GitHub Action will also need the permission to open pull requests, however it will get that from the `GITHUB_TOKEN` that is automatically generated for each GitHub Actions workflow run. Therefore this token can be read-only.
   :::

#### 6. Generate and Store Token
   - Click **Generate token**
   - **Copy the token immediately** (you won't be able to see it again)
   - Store it as a GitHub Actions secret named `PATCHER_CI_TOKEN` in the repository where the workflow runs.

    :::warn
    Keep your token secure and never commit it to your repository. Always store it as a GitHub secret.
    :::

Your `PATCHER_CI_TOKEN` token is now ready for use!

## Configuration Options

For more information on the configuration options in our standard GitHub Action, see the README at https://github.com/gruntwork-io/patcher-action.

## Environment-Specific Updates

If you need to promote updates across multiple environments (dev → stage → prod) rather than updating everything at once, see the [Setting up Promotion Workflows](/2.0/docs/patcher/guides/promotion-workflows) guide. That approach provides:

- Environment-specific scanning and updates
- Controlled promotion between environments
- Validation gates between each environment
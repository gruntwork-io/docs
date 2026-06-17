# Setup & Prerequisites

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Before you can configure a hook, your repository needs to meet a couple of prerequisites.

## Enterprise license

:::info

Hooks are an Enterprise-only feature.

:::

## Plan encryption key

When any hooks are configured, the `PIPELINES_PLAN_ENCRYPTION_KEY` secret must be set.

Pipelines adds the OpenTofu/Terraform plan output to the job's artifacts so that hooks can read it. Because plan output can contain sensitive information, Pipelines encrypts it before storing it as an artifact, and the `PIPELINES_PLAN_ENCRYPTION_KEY` secret is the key used to do so.

If a hook is declared and this secret is missing, Pipelines fails its preflight checks before running.

### Generating a key

The secret can be any non-empty value. Use a long, randomly generated value rather than a memorable passphrase. For example:

```bash
openssl rand -base64 32
```

Store the generated value somewhere safe (such as a password manager) and treat it like any other sensitive credential. If you rotate the key, plan artifacts encrypted with the previous value can no longer be decrypted.

### Configuring the secret

Make the generated value available to your Pipelines workflows as a secret named `PIPELINES_PLAN_ENCRYPTION_KEY`.

<Tabs groupId="platform">
<TabItem value="github" label="GitHub" default>

Add a repository or organization secret named `PIPELINES_PLAN_ENCRYPTION_KEY` under **Settings > Secrets and variables > Actions**. See [GitHub's documentation on encrypted secrets](https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions) for details.

Then pass it through to the Pipelines workflow in your `.github/workflows/pipelines.yml` by adding it to the `secrets` block:

```yml
jobs:
  GruntworkPipelines:
    uses: gruntwork-io/pipelines-workflows/.github/workflows/pipelines.yml@v4
    secrets:
      # ... other secrets ...
      PIPELINES_PLAN_ENCRYPTION_KEY: ${{ secrets.PIPELINES_PLAN_ENCRYPTION_KEY }}
```

</TabItem>
<TabItem value="gitlab" label="GitLab">

Add a project or group CI/CD variable named `PIPELINES_PLAN_ENCRYPTION_KEY` under **Settings > CI/CD > Variables**. Mark it **Masked** so the value is not exposed in job logs, and leave both **Protect variable** and **Expand variable reference** unchecked. The variable must not be protected so that it is available on the feature branch pipelines where Pipelines runs `plan`. See [GitLab's documentation on CI/CD variables](https://docs.gitlab.com/ee/ci/variables/) for details.

</TabItem>
</Tabs>

## Next steps

- [Configuring Hooks](/2.0/docs/pipelines/guides/hooks/configuring)

# Updating Your Pipeline

Keeping Gruntwork Pipelines updated is straightforward. Regular updates are released to ensure optimal performance and scalability for managing infrastructure changes.

import Tabs from "@theme/Tabs"
import TabItem from "@theme/TabItem"

<Tabs groupId="platform">
<TabItem value="github" label="GitHub" default>

Regular updates are released for the Pipelines CLI, associated GitHub Actions Workflows, and custom GitHub Actions. To apply the latest updates across these components, modify the `pipelines.yml` file located in the `.github/workflows` directory of any repository integrated with Gruntwork Pipelines. Update the file to reference the latest version of the Pipelines GitHub Actions Workflow:

```yml
jobs:
  GruntworkPipelines:
    uses: gruntwork-io-team/pipelines-workflows/.github/workflows/pipelines-root.yml@v3.0.0
```

Due to our integration with [Dependabot](https://docs.github.com/en/code-security/getting-started/dependabot-quickstart-guide), you can automatically receive pull requests suggesting updates to the `pipelines.yml` file in your repository by including a `.github/dependabot.yml` file. This ensures your repository stays aligned with the latest changes in Gruntwork Pipelines. AWS Accelerator customers receive this configuration as part of their `infrastructure-live` repositories by default.

:::note

Gruntwork recommends leaving your workflow reference at a major-tag shorthand, such as `v3` to automatically get the latest minor-tag updates.
:::

### Updating customized workflows

If you have customized workflows as outlined in [Extending Pipelines](/2.0/docs/pipelines/guides/extending-pipelines.md), maintaining updates to these workflows may require additional effort. For those who have forked the [pipelines-workflows](https://github.com/gruntwork-io/pipelines-workflows) repository to implement customizations, manual updates will be necessary to incorporate the latest changes from the upstream repository.

To update your workflows, follow the instructions provided in the [GitHub documentation](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/syncing-a-fork). This process applies as long as there are no conflicts between your customizations and the upstream repository.

</TabItem>
<TabItem value="gitlab" label="GitLab">

Regular updates are released for the Pipelines CLI and GitLab CI/CD templates. To apply the latest updates, modify the `.gitlab-ci.yml` file in any project integrated with Gruntwork Pipelines. Update the include statement to reference the latest version:

```yml
include:
  - component: gitlab.com/gruntwork-io/pipelines-workflows/pipelines@v1.0.0
```

We recommend using GitLab's [Renovate integration](https://docs.gitlab.com/ee/user/project/integrations/renovate.html) to automatically receive merge requests suggesting updates to your pipeline configuration. This ensures your project stays aligned with the latest changes in Gruntwork Pipelines.

:::note

Gruntwork recommends leaving your workflow reference at a major-tag shorthand, such as `v1` to automatically get the latest minor-tag updates.
:::

</TabItem>
</Tabs>

# CI Workflows

Pipelines integrates with your repositories through GitHub/GitLab Workflows, leveraging [GitHub Reusable Workflows](https://docs.github.com/en/actions/sharing-automations/reusing-workflows) and [GitLab Shared Components](https://docs.gitlab.com/ee/ci/components/) from Gruntwork's repositories. The workflows in your repositories rely on Gruntwork workflows through the uses/component clause within the workflow declaration. This is structured as follows:

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="GitHub" label="GitHub">

```yml
jobs:
  GruntworkPipelines:
    uses: gruntwork-io/pipelines-workflows/.github/workflows/pipelines-root.yml@v3
```

</TabItem>
<TabItem value="GitLab" label="GitLab">

```yml
include:
  - component: gitlab.com/gruntwork-io/pipelines-workflows/pipelines@3
```

</TabItem>
</Tabs>
## Workflow versioning

Gruntwork follows [Semantic Versioning](https://semver.org/) for `pipelines-workflows` releases. New releases are tracked using git tags in the `v.MAJOR.MINOR.PATCH` format. A major tag, such as `v.MAJOR`, is also maintained and updated to point to the latest release within that major version. For example, when releasing a patch update from `v3.0.1` to `v3.0.2`, the `v3` tag will be updated to reference the newer version.

When referencing a workflow, the version is specified in the `uses` or `component` clause. For example: `pipelines-root.yml@v3`. Using the major version, e.g. v3, in your workflows ensures you receive the latest updates and performance enhancements. However, you can choose to pin to a specific version if needed.

## Modifying workflows

Changes made to workflows in your repositories only affect the specific repository where the modification occurs. For instance, customizing the `pipelines.yml` workflow in your `infrastructure-live-root` repository will not impact workflows in other repositories, such as delegated repositories.

If you [fork the Gruntwork Workflows](https://docs.gruntwork.io/2.0/docs/pipelines/guides/extending-pipelines#extend-the-github-actions-workflow), you can make changes that affect multiple repositories. Be sure to understand the dependencies between workflows in the `pipelines-workflows` repository and your repositories. The dependencies are detailed below.

## Workflow dependencies

<Tabs>
<TabItem value="GitHub" label="GitHub">

The `pipelines-workflows` repository includes the following reusable workflows:

- `pipelines-drift-detection.yml` - (Enterprise only) Used for [Pipelines Drift Detection](/2.0/docs/pipelines/concepts/drift-detection) in all repositories with Drift Detection installed.
- `pipelines-root.yml` - (Account Factory only) The core Pipelines workflow for the `infrastructure-live-root` repository, providing core plan/apply functionality and account vending.
- `pipelines-unlock.yml` - (AWS only) Used to manually unlock state files in all repositories.
- `pipelines.yml` - The core Pipelines workflow for `infrastructure-live-access-control` and delegated repositories, supporting plan/apply operations.

If you are using [Gruntwork Account Factory](/2.0/docs/accountfactory/concepts/), the following workflows are typically present:

### infrastructure-live-root

- `account-factory.yml` - A standalone workflow independent of `pipelines-workflows`.
- `pipelines-drift-detection.yml` (Enterprise only) - Uses the Gruntwork `pipelines-drift-detection.yml` workflow.
- `pipelines-unlock.yml` - Uses the Gruntwork `pipelines-unlock.yml` workflow.
- `pipelines.yml` - Uses `pipelines-root.yml`.

### infrastructure-live-access-control

- `pipelines-drift-detection.yml` (Enterprise only) - Uses the Gruntwork `pipelines-drift-detection.yml` workflow.
- `pipelines-unlock.yml` - Uses the Gruntwork `pipelines-unlock.yml` workflow (AWS only).
- `pipelines.yml` - Uses `pipelines.yml`.

### infrastructure-live-delegated ([Vended Delegated Repositories](/2.0/docs/accountfactory/guides/delegated-repositories))

- `pipelines-drift-detection.yml` - Uses the Gruntwork `pipelines-drift-detection.yml` workflow.
- `pipelines-unlock.yml` - Uses the Gruntwork `pipelines-unlock.yml` workflow.
- `pipelines.yml` - Uses `pipelines.yml`.

</TabItem>
<TabItem value="GitLab" label="GitLab">

Your `.gitlab-ci.yml` file will include the following workflow:

- `GruntworkPipelines` - The core Pipelines workflow for your repository.

</TabItem>
</Tabs>

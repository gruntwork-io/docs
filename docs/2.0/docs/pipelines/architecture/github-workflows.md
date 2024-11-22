# GitHub Workflows

Pipelines integrates via GitHub Workflows in your repositories that integrate with [Reusable Workflows](https://docs.github.com/en/actions/sharing-automations/reusing-workflows) in Gruntwork's [pipelines-workflows](https://github.com/gruntwork-io/pipelines-workflows) repository. The workflows in your repositories depend on the Gruntwork workflows via the `uses` clause within a job, this will appear like:

```yml
jobs:
  GruntworkPipelines:
    uses: gruntwork-io/pipelines-workflows/.github/workflows/pipelines-root.yml@v3
```

## Workflow Versioning

Gruntwork uses [Semantic Versioning](https://semver.org/) for `pipelines-workflows` releases. We create new git tags to track new releases of the workflows following the `v.MAJOR.MINOR.PATCH` format. We also publish a major tag e.g. `v.MAJOR` that we update to reference the latest release within that version. For example when we publish a patch from `v3.0.1` to `v3.0.2` we will update the `v3` tag to reference the newer version.

When calling a workflow the final part of the `uses` clause contains the version reference. E.g. `pipelines-root.yml@v3`. We recommend using the major version e.g. `v3` within your workflows to receive the latest fixes and performance improvements, but you are also able to pin to a specific tag.

## Modifying Workflows

If you make modifications to the workflows in _your_ repositories, these changes will only affect that specific repository. E.g. if you want to add a customization to the `pipelines.yml` in your `infrastructure-live-root` repository it will only affect this repository, and not your vended delegated repositories.

If you choose to [Fork the Gruntwork Workflows](https://docs.gruntwork.io/2.0/docs/pipelines/guides/extending-pipelines#extend-the-github-actions-workflow) you will be able to make changes that affect multiple repositories. It's important to understand exactly which workflows in the `pipelines-workflows` repository affect which of your repositories. See a full list of dependencies below.

## Workflow Dependencies

The Gruntwork pipelines-workflows repository contains the following reusable workflows:

- `pipelines-drift-detection.yml` - A workflow for [Pipelines Drift Detection](/2.0/docs/pipelines/concepts/drift-detection), used by all repositories where Drift Detection is installed.
- `pipelines-root.yml` - The core Pipelines workflow used only by your `infrastructure-live-root` repository. This workflow provides core plan/apply as well as account vending functionality.
- `pipelines-unlock.yml` - A workflow used to manually unlock state files, used by all repositories.
- `pipelines.yml` - The core Pipelines workflow used by your `infrastructure-live-access-control` and delegated repositories for plan/apply operations.


In your repositories you will have the following set of workflows:

#### infrastructure-live-root

- `account-factory.yml` - A standalone workflow that does not use a workflow from `pipelines-workflows`.
- `pipelines-drift-detection.yml` (enterprise only) - Uses the Gruntwork `pipelines-drift-detection.yml` drift detection workflow.
- `pipelines-unlock.yml` - Uses the Gruntwork `pipelines-unlock.yml` unlock workflow.
- `pipelines.yml` - Uses `pipelines-root.yml`.

#### infrastructure-live-access-control

- `pipelines-drift-detection.yml` - (enterprise only) - Uses the Gruntwork `pipelines-drift-detection.yml` drift detection workflow.
- `pipelines-unlock.yml` - Uses the Gruntwork `pipelines-unlock.yml` unlock workflow.
- `pipelines.yml` - Uses `pipelines.yml`.

#### infrastructure-live-delegated ([Vended Delegated Repositories](/2.0/docs/accountfactory/guides/delegated-repositories))

- `pipelines-drift-detection.yml` - Uses the Gruntwork `pipelines-drift-detection.yml` drift detection workflow.
- `pipelines-unlock.yml` - Uses the Gruntwork `pipelines-unlock.yml` unlock workflow.
- `pipelines.yml` - Uses `pipelines.yml`.



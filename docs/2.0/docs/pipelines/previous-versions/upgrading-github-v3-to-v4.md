# Upgrading Pipelines GitHub Workflows From v3 to v4

To upgrade Pipelines from v3 to v4, perform the following changes in each
repository that includes the Gruntwork Pipelines Workflows.

## Updating Terragrunt Version

The minimum supported Terragrunt version in v4 is **0.86.3**.

In `.mise.toml` in the root of the repository, update the `terragrunt` version e.g.

```
terragrunt = "0.86.3"
```

See the [Terragrunt Release Notes](https://github.com/gruntwork-io/terragrunt/releases)
for detailed information on the changes to Terragrunt.

<PersistentCheckbox id="upgrade-v3-to-v4-tgversion" label="Terragrunt Version Updated" />

## Migrating from root `terragrunt.hcl` to `root.hcl`

:::warning
When using a mix of older and newer catalogs, it is important that Terragrunt
units are consistent with their root HCL files. For example v4.0.0 of the
architecture catalog used by Account Factory requires a `root.hcl` file.
:::

Pipelines v3 used a `terragrunt.hcl` file in the root of the repository for common configuration.
This is no longer recommended and should be renamed to `root.hcl`.

This requires updating Terragrunt files that include this file.
Both `find_in_parent_folders()` and `find_in_parent_folders("terragrunt.hcl")` should
be replaced with `find_in_parent_folder("root.hcl")`.

Typically units including the root like:
```
include "root" {
  path = find_in_parent_folders()
}
```

Will need to be updated like so:
```
include "root" {
  path = find_in_parent_folders("root.hcl")
}
```

Refer to the [Terragrunt Documentation](https://terragrunt.gruntwork.io/docs/migrate/migrating-from-root-terragrunt-hcl/)
for more details.

<PersistentCheckbox id="upgrade-v3-to-v4-roothcl" label="Root Terragrunt File Renamed" />

## Replace `.gruntwork/config.yml` with HCL Config

:::note
Repositories using only YML configuration will still function with Pipelines v4,
but adding any HCL configuration will prevent the YML from having an effect.

In the next major release YML configuration will have no effect and HCL will be
required.
:::

YML configuration is officially deprecated in Pipelines v4. Migrating to HCL
configuration requires adding HCL files to the `.gruntwork` directory in the root
of your repository.

We recommend adding the following files to your repository.

```hcl title=".gruntwork/repository.hcl"
repository {
  deploy_branch_name = "main"
}
```



```hcl title=


<PersistentCheckbox id="upgrade-v3-to-v4-config" label="Config Replaced" />

## Allowlisting Actions

<PersistentCheckbox id="upgrade-v3-to-v4-2" label="Actions Allowlisted" />

## Pipelines Workflow `.github/workflows/pipelines.yml`

<PersistentCheckbox id="upgrade-v3-to-v4-3" label="Add actions: read" />
<PersistentCheckbox id="upgrade-v3-to-v4-4" label="Uses @v4" />

The pipelines workflow now runs a `GruntworkPipelines / Pipelines Status Check` job which can be used for Required status checks.

<PersistentCheckbox id="upgrade-v3-to-v4-5" label="Remove PipelinesPassed" />

## Drift Detection Workflow `.github/workflows/pipelines-drift-detection.yml`

<PersistentCheckbox id="upgrade-v3-to-v4-4" label="Uses @v4" />

## Unlock Workflow `.github/workflows/pipelines-unlock.yml`

<PersistentCheckbox id="upgrade-v3-to-v4-4" label="Uses @v4" />




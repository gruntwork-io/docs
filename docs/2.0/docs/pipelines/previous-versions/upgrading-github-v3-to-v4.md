# Upgrading Pipelines GitHub Workflows From v3 to v4

To upgrade Pipelines from v3 to v4, perform the following changes in each
repository that includes the Gruntwork Pipelines Workflows.

## Updating Terragrunt Version

The minimum supported Terragrunt version in v4 is **0.86.3**.

In `.mise.toml` in the root of the repository, update the `terragrunt` version e.g.

```
terragrunt = "0.86.3"
```

See the [Terragrunt Release Notes](https://github.com/gruntwork-io/terragrunt/releases) for detailed information on the changes to Terragrunt.

<PersistentCheckbox id="upgrade-v3-to-v4-tgversion" label="Terragrunt Version Updated" />

## Migrating from root `terragrunt.hcl` to `root.hcl`

Pipelines v3 used a `terragrunt.hcl` file in the root of the repository for common configuration. This is no longer recommended and should be renamed to `root.hcl`.

This requires updating Terragrunt files that include this file

OLD:

```
include "root" {
  path = find_in_parent_folders()
}
```

NEW:
```
include "root" {
  path = find_in_parent_folders("root.hcl")
}
```

<PersistentCheckbox id="upgrade-v3-to-v4-roothcl" label="Root Terragrunt File Renamed" />

## .gruntwork Config

YML configuration is officially deprecated in Pipelines v4



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




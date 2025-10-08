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
# Configurations applicable to the entire repository, see: https://docs.gruntwork.io/2.0/reference/pipelines/configurations-as-code/api#repository-block
repository {
  deploy_branch_name           = "main"
  consolidate_added_or_changed = "true"
  env {
    TG_STRICT_CONTROL = "skip-dependencies-inputs"
    TG_DEPENDENCY_FETCH_OUTPUT_FROM_STATE = "true"
    TG_EXPERIMENT = "auto-provider-cache-dir"
  }
}

```

The `repository` block contains settings for the entire repository. See the
[Repository Block Attributes](/2.0/reference/pipelines/configurations-as-code/api#repository-block-attributes)
to find which of your existing YML configurations need to be added here.


```hcl title=".gruntwork/accounts.hcl"
# AWS account configurations that are usable by the entire repository, see: https://docs.gruntwork.io/2.0/reference/pipelines/configurations-as-code/api#aws-block
aws {
  accounts "all" {
    // Reading the accounts.yml file from the root of the repository
    path = "../accounts.yml"
  }
}
```

The `accounts.hcl` file is a helper to read from the root `accounts.yml` file into your HCL configuration.

For each account in your repository add an environment-accountname.hcl. For example
for the management account add the following:

```hcl title=".gruntwork/environment-management.hcl"
# Configurations that are applicable to a specific environment within a repository, see: https://docs.gruntwork.io/2.0/reference/pipelines/configurations-as-code/api/#environment-block
environment "management" {
  filter {
    paths = ["management/*"]
  }

  authentication {
    aws_oidc {
      # The account references are defined in the accounts.hcl file via the aws block
      account_id         = aws.accounts.all.management.id
      plan_iam_role_arn  = "arn:aws:iam::${aws.accounts.all.management.id}:role/root-pipelines-plan"
      apply_iam_role_arn = "arn:aws:iam::${aws.accounts.all.management.id}:role/root-pipelines-apply"
    }
  }
}

```

Repeat this for each environment that needs to be authenticated.

If your repository has Account Factory add the following file

```hcl title=".gruntwork/account-factory.hcl"
account_factory {
  control_tower_module_version = "<REPLACE>"
  security_module_version = "<REPLACE>"
  access_control_repository_name = "<REPLACE>"
  architecture_catalog_module_version = "<REPLACE>"
  infrastructure_catalog_module_repository_name = "<REPLACE>"
}
```

Replacing and adding values with the existing values in your YML configuration.
See the [Account Factory HCL](2.0/reference/accountfactory/configurations-as-code) for
a full reference of values.

<PersistentCheckbox id="upgrade-v3-to-v4-config" label="Config Replaced" />

## Allowlisting Actions

If your organization maintains an allowlist of GitHub actions, update the allowlist
with the full list of actions in [pipelines-actions v4.0.0](https://github.com/gruntwork-io/pipelines-actions/tree/v4.0.0/.github/actions)

<PersistentCheckbox id="upgrade-v3-to-v4-allowlist" label="Actions Allowlisted" />

## Pipelines Workflow `.github/workflows/pipelines.yml`

### Add `actions: read` permission

Update the Pipelines Workflow in the repository to add `actions: read`

<PersistentCheckbox id="upgrade-v3-to-v4-actionsread" label="Add actions: read" />

### Update Pipelines GruntworkPipelines uses version

Update the `uses:` field of the GruntworkPipelines job to reference `@v4`

<PersistentCheckbox id="upgrade-v3-to-v4-pipelinesatv4" label="Pipelines Uses @v4" />

### Remove PipelinesPassed job

The pipelines workflow now runs a `GruntworkPipelines / Pipelines Status Check`
job which can be used for Required Status Checks. Remove the PipelinesPassed job
and update any Required Status Checks to use `GruntworkPipelines / Pipelines Status Check`.

<PersistentCheckbox id="upgrade-v3-to-v4-pipelinespassed" label="Remove PipelinesPassed" />

## Drift Detection Workflow `.github/workflows/pipelines-drift-detection.yml`

### Update Inputs

The inputs for Drift Detection have been renamed.

Update the `workflow_dispatch` section with the new inputs:

```
  workflow_dispatch:
    inputs:
      pipelines_drift_detection_filter:
        description: Limit drift detection to units matching filter https://docs.gruntwork.io/2.0/docs/pipelines/guides/running-drift-detection#drift-detection-filter
        type: string
      pipelines_drift_detection_branch:
        description: The branch name used for drift remediation PRs
        default: drift-detection
        type: string
```

Update the GruntworkPipelines job to use these inputs:

```
    with:
      pipelines_drift_detection_filter: ${{ inputs.pipelines_drift_detection_filter }}
      pipelines_drift_detection_branch: ${{ inputs.pipelines_drift_detection_branch }}
```

The syntax for the filter in Drift Detection has changed. Refer to the [Filter Reference](2.0/docs/pipelines/guides/running-drift-detection#drift-detection-filter)

### Update Drift Detection GruntworkPipelines uses version

Update the `uses:` field of the GruntworkPipelines job to reference `@v4`

<PersistentCheckbox id="upgrade-v3-to-v4-ddatv4" label="Drift Detection Uses @v4" />

## Unlock Workflow `.github/workflows/pipelines-unlock.yml`

### Update Inputs

The inputs for Unlock have been renamed.

Update the `workflow_dispatch` section with the new inputs:

```
    inputs:
      lock_id:
        description: "The ID of the lock, usually a GUID. This is generally found in the console output when Terraform/OpenTofu command fails due to a timeout waiting to acquire a lock. (required if not running unlock_all)"
        required: false
        type: string
      unit_path:
        description: "Path to the Terragrunt Unit directory where the lock is held (everything up to but not including terragrunt.hcl - required if not running unlock_all)"
        required: false
        type: string
      stack_path:
        description: "Path to a Terragrunt Stack directory (everything up to but not including terragrunt.stack.hcl) that generates content required to run unlock in a specified Terragrunt Unit"
        required: false
        type: string
      unlock_all:
        description: "Forcibly reset all locks by deleting the dynamodb table"
        required: false
        type: boolean
```

Update the GruntworkPipelines job to use these inputs:

```
      lock_id: ${{ inputs.lock_id }}
      unit_path: ${{ inputs.unit_path }}
      stack_path: ${{ inputs.stack_path }}
      unlock_all: ${{ inputs.unlock_all }}
```

### Update Unlock GruntworkPipelines uses version

Update the `uses:` field of the GruntworkPipelines job to reference `@v4`

<PersistentCheckbox id="upgrade-v3-to-v4-unlockatv4" label="Pipelines Unlock Uses @v4" />




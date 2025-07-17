---
id: change-types
title: Pull Request Behaviors – Change Types
sidebar_label: Pull Request Behaviors
description: How the Pipelines change-detection engine maps repo changes to Terragrunt commands.
---

# Pull Request Behaviors - Change Types
Pipelines implements a sophisticated change detection system that categorizes different types of infrastructure changes. This system determines which Terragrunt commands to run based on the specific changes detected in a pull request.

## Overview

The change detection system analyzes file changes between two Git references (typically the base and head of a pull request) and categorizes them into specific change types. Each change type triggers different Terragrunt commands and workflows to ensure appropriate infrastructure updates.

## Change Type Categories

:::note

As of July 2025 pipelines emits events using the word Module.  This is an outdated term, the updated term in the Terragrunt ecosystem is Unit.  The next major release of pipelines will rename these events and this document will be updated at that time.

:::

### Unit Related Changes

#### `ModuleChanged`
**Trigger**: Changes to existing Terragrunt units
- **Files**: `terragrunt.hcl` files in existing directories
- **Behavior**:
  - **PR**: `terragrunt plan`
  - **Merge**: `terragrunt apply`
- **Use Case**: When you modify configuration values, add new resources, or change existing resources in a unit

#### `ModuleAdded`
**Trigger**: Addition of new Terragrunt units
- **Files**: New `terragrunt.hcl` files in new directories
- **Behavior**:
  - **PR**: `terragrunt plan`
  - **Merge**: `terragrunt apply`
- **Use Case**: When you create a new infrastructure component or environment

#### `ModuleDeleted`
**Trigger**: Removal of existing Terragrunt units
- **Files**: Deleted `terragrunt.hcl` files
- **Behavior**:
  - **PR**: `terragrunt plan -destroy`
  - **Merge**: `terragrunt destroy`
- **Use Case**: When you want to remove units

#### `ModuleDriftedAndChanged`
**Trigger**: Units that have both drift and configuration changes
- **Behavior**: Special handling for units that need both drift correction and configuration updates
- **Use Case**: Complex scenarios where infrastructure has drifted from desired state and also has new changes

#### `ModulesAddedOrChanged`
**Trigger**: Aggregated change type for multiple unit modifications
- **Behavior**: Handles scenarios with multiple unit changes
- **Use Case**: Large refactoring or bulk infrastructure updates

### "Envcommon" Changes

#### `EnvCommonChanged`
**Trigger**: Changes to environment common configuration
- **Files**: `.hcl` files in the `_envcommon/` directory
- **Behavior**:
  - **PR**: `terragrunt run --all plan  --units-that-include=<changed_file>`
  - **Merge**: `terragrunt run --all apply   --units-that-include=<changed_file>`
- **Use Case**: When you modify shared configuration that affects multiple units

### HCL Configuration Changes

#### `HCLChanged`
**Trigger**: Changes to HCL configuration files
- **Files**: Any `.hcl` file (excluding `terragrunt.hcl` and certain excluded files)
- **Behavior**:
  - **PR**: `terragrunt run --all plan  --queue-include-dir=<changed_directory>`
  - **Merge**: `terragrunt run --all apply   --queue-include-dir=<changed_directory>`
- **Use Case**: When you modify shared HCL configurations, variables, or other HCL-based settings and want to propagate those changes to units that read and include those files.

### Account Factory Changes

#### `AccountsRequested`
**Trigger**: A new account is being requested
- **Files**: New `.yml` or `.yaml` files in the `_new-account-requests/` directory
- **Behavior**: Triggers account provisioning workflows
- **Use Case**: When requesting new AWS accounts

#### `AccountsAdded`
**Trigger**: New account directories
- **Files**: New root-level directories (when Account Factory is enabled)
- **Behavior**:
  - **PR**: `terragrunt run --all plan`
  - **Merge**: `terragrunt run --all apply`
- **Use Case**: Baselining newly provisioned accounts as part of the Account Factory workflow

#### `AccountsChanged`
**Trigger**: Modifications to existing account requests
- **Files**: Modified `.yml` or `.yaml` files in the `_new-account-requests/` directory
- **Behavior**: Triggers account update workflows
- **Use Case**: This should be a very rare use-case where one of the fundamental configuration properties of an account is changed.

#### `AccountsDeleted`
**Trigger**: Removal of account request files
- **Files**: Deleted `.yml` or `.yaml` files in the `_new-account-requests/` directory
- **Behavior**: Triggers account cleanup workflows
- **Use Case**: Deletion of an account that was previously provisioned with Account Factory

### Drift Detection

#### `DriftDetected`
**Trigger**: Changes to drift detection files
- **Files**: `.drift-history.json` files in directories with `terragrunt.hcl`
- **Behavior**:
  - **PR**: `terragrunt plan`
  - **Merge**: `terragrunt apply`
- **Use Case**: When infrastructure has drifted from the desired state

### General File Changes

#### `FileChanged`
**Trigger**: Changes to files that are read by HCL functions
- **Files**: Any file that might be referenced by Terragrunt units (excluding certain directories)
- **Behavior**:
  - **PR**: `terragrunt run --all plan  --queue-include-units-reading=<changed_file>`
  - **Merge**: `terragrunt run --all apply   --queue-include-units-reading=<changed_file>`
- **Use Case**: When you modify files (e.g. shared configurations) that are referenced by Terragrunt units

## Change Detection Order

The change detection system processes changes in a specific order to ensure accurate categorization:

1. **Ignore Files**: Filters out files that should be ignored based on configuration
2. **Account Added**: Detects new account directories
3. **Configuration Files**: Filters configuration files
4. **Environment Common**: Detects changes in `_envcommon/` directory
5. **Account Requests**: Detects changes in `_new-account-requests/` directory
6. **Drift Detection**: Detects drift detection files
7. **Modules**: Detects Terragrunt unit changes
8. **HCL Changes**: Detects general HCL file changes
9. **File Changes**: Detects other file changes

## Special Considerations

### Account Factory Isolation
When `AccountsAdded` changes are detected, they must be isolated in their own pull request. No other infrastructure changes can be included in the same PR.

### Module Change Detection Features
The system supports a feature flag `moduleChangeOnUnitFile` that enables detecting module changes when any file within a Terragrunt unit (directory with `terragrunt.hcl`) is modified.

For more information about how Pipelines handles changes to non-IaC file dependencies, see the [File Dependencies guide](/2.0/docs/pipelines/guides/file-dependencies).

### Stack Values Files
Changes to `terragrunt.values.hcl` files are treated as module changes and trigger the appropriate Terragrunt commands for the containing unit.

## Example Scenarios

### Scenario 1: Adding a New Unit
- **Changes**: New directory with `terragrunt.hcl`
- **Detected Type**: `ModuleAdded`
- **Action**: `terragrunt plan` and `terragrunt apply`

### Scenario 2: Modifying Shared Configuration via the Envcommon pattern
- **Changes**: File in `_envcommon/` directory
- **Detected Type**: `EnvCommonChanged`
- **Action**: Updates across all affected modules that use the changed envcommon file

### Scenario 3: Requesting New Account via Account Factory
- **Changes**: New `.yml` file in `_new-account-requests/`
- **Detected Type**: `AccountsRequested`
- **Action**: Account provisioning workflow

### Scenario 4: Changing a Data File Used by Units
- **Changes**: Modified `.json` file (e.g., `tags.json`, `config.json`) that is read by Terragrunt units
- **Detected Type**: `FileChanged`
- **Action**: `terragrunt run --all plan --queue-include-units-reading=<changed_file>` and `terragrunt run --all apply --queue-include-units-reading=<changed_file>` for all units that read the changed file

This change detection system ensures that pipelines runs the appropriate Terragrunt commands for each type of infrastructure change, maintaining consistency and reliability in your infrastructure deployments.

## User Perspective: What Commands Run for Your Changes

This section explains what happens from your perspective when you make different types of changes in your infrastructure repository.

### Common User Scenarios

#### Adding a New Environment or Module
**What you do**: Create a new directory with a `terragrunt.hcl` file
```bash
mkdir prod/vpc
# Create prod/vpc/terragrunt.hcl with your configuration
```

**What pipelines does**:
- Detects: `ModuleAdded`
- Runs: `terragrunt plan` and `terragrunt apply`
- Result: New infrastructure is created

#### Modifying Existing Infrastructure
**What you do**: Edit an existing `terragrunt.hcl` file
```bash
# Edit prod/vpc/terragrunt.hcl to change instance type
```

**What pipelines does**:
- Detects: `ModuleChanged`
- Runs: `terragrunt plan` and `terragrunt apply`
- Result: Infrastructure is updated to match your changes

#### Removing Infrastructure
**What you do**: Delete a `terragrunt.hcl` file
```bash
rm -rf staging/old-service/
```

**What pipelines does**:
- Detects: `ModuleDeleted`
- Runs: `terragrunt destroy`
- Result: Infrastructure is removed

#### Changing Shared Configuration
**What you do**: Modify files in the `_envcommon/` directory
```bash
# Edit _envcommon/network.hcl to change default VPC settings
```

**What pipelines does**:
- Detects: `EnvCommonChanged`
- Runs: `terragrunt plan` and `terragrunt apply` for all modules that reference the changed configuration
- Result: All affected environments are updated with the new shared settings

#### Requesting a New Account
**What you do**: Create a new YAML file in `_new-account-requests/`
```bash
# Create _new-account-requests/account-new-team.yml
```

**What pipelines does**:
- Detects: `AccountsRequested`
- Runs: Account provisioning workflow
- Result: New AWS account is created and configured

#### Adding a New Account Environment
**What you do**: Create a new root-level directory (when account factory is enabled)
```bash
mkdir new-team-account/
# Add terragrunt.hcl files for the new account
```

**What pipelines does**:
- Detects: `AccountsAdded`
- Runs: Account setup and initialization workflows
- Result: New account environment is created and configured

#### Modifying HCL Configuration Files
**What you do**: Edit any `.hcl` file (not `terragrunt.hcl`)
```bash
# Edit common/variables.hcl to add new variables
```

**What pipelines does**:
- Detects: `HCLChanged`
- Runs: Appropriate Terragrunt commands based on context
- Result: Changes are applied to affected modules

### What Commands Are Actually Run

#### For Unit Changes (`ModuleChanged`, `ModuleAdded`)
**Pull Request:**
```bash
terragrunt plan
```
**After Merge:**
```bash
terragrunt apply
```

#### For Unit Deletion (`ModuleDeleted`)
**Pull Request:**
```bash
terragrunt plan -destroy
```
**After Merge:**
```bash
terragrunt destroy
```

#### For EnvCommon Changes (`EnvCommonChanged`)
**Pull Request:**
```bash
terragrunt run --all plan  --units-that-include=_envcommon/changed-file.hcl
```
**After Merge:**
```bash
terragrunt run --all apply   --units-that-include=_envcommon/changed-file.hcl
```

#### For HCL Configuration Changes (`HCLChanged`)
**Pull Request:**
```bash
terragrunt run --all plan  --queue-include-dir=path/to/changed/directory
```
**After Merge:**
```bash
terragrunt run --all apply   --queue-include-dir=path/to/changed/directory
```

#### For File Changes (`FileChanged`)
**Pull Request:**
```bash
terragrunt run --all plan  --queue-include-units-reading=path/to/changed/file
```
**After Merge:**
```bash
terragrunt run --all apply   --queue-include-units-reading=path/to/changed/file
```

### Understanding the Workflow

1. **You make changes** in your Git repository
2. **You create a pull request** with your changes
3. **Pipelines analyzes** the changes and determines the change types
4. **Pipelines runs** the appropriate Terragrunt commands
5. **You review** the plan output in the pull request
6. **You approve** the changes (if required)
7. **Pipelines applies** the changes to your infrastructure

### Command Types: `run` vs `run --all`

Pipelines uses two main types of Terragrunt commands:

#### Single Unit Commands (`plan`, `apply`, `destroy`)
- **Used for**: Direct unit changes (`ModuleChanged`, `ModuleAdded`, `ModuleDeleted`, `DriftDetected`)
- **Scope**: Operates on a single Terragrunt unit (directory with `terragrunt.hcl`)
- **Example**: `terragrunt plan`

#### Multi-Unit Commands (`run --all`)
- **Used for**: Changes that affect multiple units (`EnvCommonChanged`, `HCLChanged`, `FileChanged`, `AccountsAdded`)
- **Scope**: Operates across multiple Terragrunt units that are affected by the change
- **Key Flags**:
  - `--units-that-include=<file>`: Runs on all units that include the specified file
  - `--queue-include-dir=<directory>`: Runs on all units in the specified directory
  - `--queue-include-units-reading=<file>`: Runs on all units that read the specified file
- **Example**: `terragrunt run --all plan  --units-that-include=_envcommon/network.hcl`

#### Key Differences
- **Single unit commands** are more targeted and efficient for direct unit changes
- **Multi-unit commands** ensure that all affected units are updated when shared configurations change
- **Multi-unit commands** use Terragrunt's dependency resolution to determine which units need updates

### Best Practices

- **Isolate account additions**: When adding new accounts, keep them in separate pull requests
- **Review plans carefully**: Always review the `terragrunt plan` output before approving
- **Use descriptive commit messages**: This helps with change tracking and debugging
- **Test in staging first**: Make changes in staging environments before applying to production

This system ensures that your infrastructure changes are applied consistently and safely, with appropriate validation at each step.
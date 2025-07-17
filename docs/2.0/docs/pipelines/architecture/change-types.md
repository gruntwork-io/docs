# Pull Request Behaviors - Change Types

Pipelines implements a sophisticated change detection system that categorizes different types of infrastructure changes. This system determines which Terragrunt commands to run based on the specific changes detected in a pull request.

## Overview

The change detection system analyzes file changes between two Git references (typically the base and head of a pull request) and categorizes them into specific change types. Each change type triggers different Terragrunt commands and workflows to ensure appropriate infrastructure updates.

## Change Type Categories

### Module-Related Changes

#### `ModuleChanged`
**Trigger**: Changes to existing Terragrunt modules
- **Files**: `terragrunt.hcl` files in existing directories
- **Behavior**:
  - **PR**: `terragrunt plan --non-interactive`
  - **Merge**: `terragrunt apply --non-interactive -auto-approve`
- **Use Case**: When you modify configuration values, add new resources, or change existing resources in a module

#### `ModuleAdded`
**Trigger**: Addition of new Terragrunt modules
- **Files**: New `terragrunt.hcl` files in new directories
- **Behavior**:
  - **PR**: `terragrunt plan --non-interactive`
  - **Merge**: `terragrunt apply --non-interactive -auto-approve`
- **Use Case**: When you create a new infrastructure component or environment

#### `ModuleDeleted`
**Trigger**: Removal of existing Terragrunt modules
- **Files**: Deleted `terragrunt.hcl` files
- **Behavior**:
  - **PR**: `terragrunt plan -destroy --non-interactive`
  - **Merge**: `terragrunt destroy --non-interactive -auto-approve`
- **Use Case**: When you want to remove infrastructure components

#### `ModuleDriftedAndChanged`
**Trigger**: Modules that have both drift and configuration changes
- **Behavior**: Special handling for modules that need both drift correction and configuration updates
- **Use Case**: Complex scenarios where infrastructure has drifted from desired state and also has new changes

#### `ModulesAddedOrChanged`
**Trigger**: Aggregated change type for multiple module modifications
- **Behavior**: Handles scenarios with multiple module changes
- **Use Case**: Large refactoring or bulk infrastructure updates

### Environment Common Changes

#### `EnvCommonChanged`
**Trigger**: Changes to environment common configuration
- **Files**: `.hcl` files in the `_envcommon/` directory
- **Behavior**:
  - **PR**: `terragrunt run --all plan --non-interactive --units-that-include=<changed_file>`
  - **Merge**: `terragrunt run --all apply --non-interactive -auto-approve --units-that-include=<changed_file>`
- **Use Case**: When you modify shared configuration that affects multiple environments

### HCL Configuration Changes

#### `HCLChanged`
**Trigger**: Changes to HCL configuration files
- **Files**: Any `.hcl` file (excluding `terragrunt.hcl` and certain excluded files)
- **Behavior**:
  - **PR**: `terragrunt run --all plan --non-interactive --queue-include-dir=<changed_directory>`
  - **Merge**: `terragrunt run --all apply --non-interactive -auto-approve --queue-include-dir=<changed_directory>`
- **Use Case**: When you modify shared HCL configurations, variables, or other HCL-based settings

### Account Management Changes

#### `AccountsRequested`
**Trigger**: New account request files
- **Files**: New `.yml` or `.yaml` files in the `_new-account-requests/` directory
- **Behavior**: Triggers account provisioning workflows
- **Use Case**: When requesting new AWS accounts or other cloud accounts

#### `AccountsAdded`
**Trigger**: New account directories
- **Files**: New root-level directories (when account factory is enabled)
- **Behavior**:
  - **PR**: `terragrunt run --all plan --non-interactive`
  - **Merge**: `terragrunt run --all apply --non-interactive -auto-approve`
- **Use Case**: When creating new account environments

#### `AccountsChanged`
**Trigger**: Modifications to existing account requests
- **Files**: Modified `.yml` or `.yaml` files in the `_new-account-requests/` directory
- **Behavior**: Triggers account update workflows
- **Use Case**: When modifying account configurations or settings

#### `AccountsDeleted`
**Trigger**: Removal of account request files
- **Files**: Deleted `.yml` or `.yaml` files in the `_new-account-requests/` directory
- **Behavior**: Triggers account cleanup workflows
- **Use Case**: When removing account requests or decommissioning accounts

### Drift Detection

#### `DriftDetected`
**Trigger**: Changes to drift detection files
- **Files**: `.drift-history.json` files in directories with `terragrunt.hcl`
- **Behavior**:
  - **PR**: `terragrunt plan --non-interactive`
  - **Merge**: `terragrunt apply --non-interactive -auto-approve`
- **Use Case**: When infrastructure has drifted from the desired state

### General File Changes

#### `FileChanged`
**Trigger**: Changes to files that are read by HCL functions
- **Files**: Any file that might be referenced by Terragrunt configurations (excluding certain directories)
- **Behavior**:
  - **PR**: `terragrunt run --all plan --non-interactive --queue-include-units-reading=<changed_file>`
  - **Merge**: `terragrunt run --all apply --non-interactive -auto-approve --queue-include-units-reading=<changed_file>`
- **Use Case**: When you modify files that are referenced by Terragrunt configurations

## Change Detection Order

The change detection system processes changes in a specific order to ensure accurate categorization:

1. **Ignore Files**: Filters out files that should be ignored
2. **Account Added**: Detects new account directories
3. **Configuration Files**: Filters configuration files
4. **Environment Common**: Detects changes in `_envcommon/` directory
5. **Account Requests**: Detects changes in `_new-account-requests/` directory
6. **Drift Detection**: Detects drift detection files
7. **Modules**: Detects Terragrunt module changes
8. **HCL Changes**: Detects general HCL file changes
9. **File Changes**: Detects other file changes

## Special Considerations

### Account Factory Isolation
When `AccountsAdded` changes are detected, they must be isolated in their own pull request. No other infrastructure changes can be included in the same PR.

### Module Change Detection Features
The system supports a feature flag `moduleChangeOnUnitFile` that enables detecting module changes when any file within a Terragrunt unit (directory with `terragrunt.hcl`) is modified.

### Stack Values Files
Changes to `terragrunt.values.hcl` files are treated as module changes and trigger the appropriate Terragrunt commands for the containing module.

## Example Scenarios

### Scenario 1: Adding a New Environment
- **Changes**: New directory with `terragrunt.hcl`
- **Detected Type**: `ModuleAdded`
- **Action**: `terragrunt plan` and `terragrunt apply`

### Scenario 2: Modifying Shared Configuration
- **Changes**: File in `_envcommon/` directory
- **Detected Type**: `EnvCommonChanged`
- **Action**: Updates across all affected modules

### Scenario 3: Requesting New Account
- **Changes**: New `.yml` file in `_new-account-requests/`
- **Detected Type**: `AccountsRequested`
- **Action**: Account provisioning workflow

### Scenario 4: Infrastructure Drift
- **Changes**: `.drift-history.json` file
- **Detected Type**: `DriftDetected`
- **Action**: Drift detection and correction

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
# Create _new-account-requests/new-team-account.yml
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

#### Infrastructure Drift
**What you do**: Pipelines detects drift automatically via `.drift-history.json` files
```bash
# No action needed - drift detection runs automatically
```

**What pipelines does**:
- Detects: `DriftDetected`
- Runs: Drift detection and correction workflows
- Result: Infrastructure is brought back to desired state

### What Commands Are Actually Run

#### For Module Changes (`ModuleChanged`, `ModuleAdded`)
**Pull Request:**
```bash
terragrunt plan --non-interactive
```
**After Merge:**
```bash
terragrunt apply --non-interactive -auto-approve
```

#### For Module Deletion (`ModuleDeleted`)
**Pull Request:**
```bash
terragrunt plan -destroy --non-interactive
```
**After Merge:**
```bash
terragrunt destroy --non-interactive -auto-approve
```

#### For Environment Common Changes (`EnvCommonChanged`)
**Pull Request:**
```bash
terragrunt run --all plan --non-interactive --units-that-include=_envcommon/changed-file.hcl
```
**After Merge:**
```bash
terragrunt run --all apply --non-interactive -auto-approve --units-that-include=_envcommon/changed-file.hcl
```

#### For HCL Configuration Changes (`HCLChanged`)
**Pull Request:**
```bash
terragrunt run --all plan --non-interactive --queue-include-dir=path/to/changed/directory
```
**After Merge:**
```bash
terragrunt run --all apply --non-interactive -auto-approve --queue-include-dir=path/to/changed/directory
```

#### For File Changes (`FileChanged`)
**Pull Request:**
```bash
terragrunt run --all plan --non-interactive --queue-include-units-reading=path/to/changed/file
```
**After Merge:**
```bash
terragrunt run --all apply --non-interactive -auto-approve --queue-include-units-reading=path/to/changed/file
```

#### For Account Management
**Account Requests (`AccountsRequested`, `AccountsChanged`, `AccountsDeleted`):**
```bash
# Account provisioning workflows (varies by platform)
# May include: account creation, IAM setup, baseline configuration
```

**Account Added (`AccountsAdded`):**
**Pull Request:**
```bash
terragrunt run --all plan --non-interactive
```
**After Merge:**
```bash
terragrunt run --all apply --non-interactive -auto-approve
```

#### For Drift Detection (`DriftDetected`)
**Pull Request:**
```bash
terragrunt plan --non-interactive
```
**After Merge:**
```bash
terragrunt apply --non-interactive -auto-approve
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
- **Used for**: Direct module changes (`ModuleChanged`, `ModuleAdded`, `ModuleDeleted`, `DriftDetected`)
- **Scope**: Operates on a single Terragrunt unit (directory with `terragrunt.hcl`)
- **Example**: `terragrunt plan --non-interactive`

#### Multi-Unit Commands (`run --all`)
- **Used for**: Changes that affect multiple modules (`EnvCommonChanged`, `HCLChanged`, `FileChanged`, `AccountsAdded`)
- **Scope**: Operates across multiple Terragrunt units that are affected by the change
- **Key Flags**:
  - `--units-that-include=<file>`: Runs on all units that include the specified file
  - `--queue-include-dir=<directory>`: Runs on all units in the specified directory
  - `--queue-include-units-reading=<file>`: Runs on all units that read the specified file
- **Example**: `terragrunt run --all plan --non-interactive --units-that-include=_envcommon/network.hcl`

#### Key Differences
- **Single unit commands** are more targeted and efficient for direct module changes
- **Multi-unit commands** ensure that all affected modules are updated when shared configurations change
- **Multi-unit commands** use Terragrunt's dependency resolution to determine which modules need updates

### Best Practices

- **Isolate account additions**: When adding new accounts, keep them in separate pull requests
- **Review plans carefully**: Always review the `terragrunt plan` output before approving
- **Use descriptive commit messages**: This helps with change tracking and debugging
- **Test in staging first**: Make changes in staging environments before applying to production
- **Monitor drift**: Regularly check for infrastructure drift and address it promptly

This system ensures that your infrastructure changes are applied consistently and safely, with appropriate validation at each step.
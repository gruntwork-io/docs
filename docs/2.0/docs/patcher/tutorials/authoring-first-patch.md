# Authoring Your First Patch

## Prerequisites
* Familiarity with Terraform or OpenTofu  
* [Patcher installed](/2.0/docs/patcher/installation/) either locally or as a GitHub Actions workflow in your repository  


## Overview

In this tutorial, we will guide you through the following steps:  

**Authoring a patch**:
* Identifying breaking changes in your module update and defining clear steps to resolve them. 
* Running `patcher generate` to template the patch  
* Completing the required patch fields  
* Modifying `config.yaml` to include the necessary configuration changes for your patch.


### Test module

For this tutorial, we will use the `patcher-test` module from the `gruntwork-io/terraform-aws-utilities` repository. The module has a version `v0.10.3`, which we will intentionally mark as outdated in our infrastructure unit. We will then write a patch to upgrade the module for the `v0.10.4` release. You can view the full, real-world example [here](https://github.com/gruntwork-io/terraform-aws-utilities/pull/102/), but we will walk through the steps to recreate it below.  

## Identifying the breaking change and its remediation steps

Suppose you need to add a new required variable to the `patcher-test` module.  
This change qualifies as a breaking change because consumers of your module must update their configurations to include the new variable. Without this update, OpenTofu will fail when planning or applying the infrastructure.  

<!-- spell-checker: disable -->
Add the new `sampleinput` variable to `variables.tf`:

```hcl title="$$DIRECTORY$$/variables.tf"
variable "sampleinput" {
    type = string
    description = "Sample input for the module"
    default = "unset-value"
}
```
<!-- spell-checker: enable -->

## Running `patcher generate` to template the patch

Next, run `patcher generate` from the root of the Git repository to generate the patch template, specifying the title of the patch:  

```bash
$ patcher generate "Sample Breaking Change"
```

This command creates a templated patch in your repository at the path `.patcher/patches/sample-breaking-change/patch.yaml`:  

```yaml title=".patcher/patches/sample-breaking-change/patch.yaml"
name: "Sample Breaking Change"
description: <REPLACE_ME>
author: <REPLACE_ME>

# Optional list of dependencies that the patch requires.
dependencies:
  - name: terrapatch
    version: "0.1.0"

# List of steps that this patch will execute.  
# Each step includes a `name` field (string) and a `run` field, which can specify either an OS command or an external script to execute.  
# If you use external scripts, ensure they are located in the same directory as the `patch.yaml` file.  
steps:
  - name: <REPLACE_ME>
    run: <REPLACE_ME>
  - name: <REPLACE_ME>
    run: <REPLACE_ME>
```
As the module maintainer, fill in the `<REPLACE_ME>` fields as needed:  
* `description`: Provide a full sentence that succinctly communicates the change.  
* `author`: Specify the author of the patch. This can be your name, an organization, or another appropriate identifier.  
* `steps.name`: Add a short, descriptive label for each step.  
* `steps.run`: Define the command to execute for that specific step.  

## Filling out the patch fields

Because this breaking change is straightforward, we can use [`terrapatch`](https://github.com/gruntwork-io/terrapatch) to perform the required step:  

<!-- spell-checker: disable -->
```bash
$ terrapatch add-module-argument $PATCHER_MODULE_ADDRESS sampleinput "\"samplevalue\""
```
<!-- spell-checker: enable -->

`$PATCHER_MODULE_ADDRESS` gets populated when Patcher is run; it doesn't need to be set independently anywhere. 

Once you have filled out the fields in the patch, it should look like this:  

<!-- spell-checker: disable -->
```yaml
name: "Sample Breaking Change"
description: A sample breaking change that adds a new argument
author: Gruntwork

# Optional list of dependencies required for this patch.  
dependencies:  
  - name: terrapatch  
    version: "0.1.0"  

# List of steps that this patch will execute.  
# Each step includes a `name` field (string) and a `run` field, which can specify either an OS command or an external script.  
# If using external scripts, ensure they are located in the same directory as the `patch.yaml` file.  
steps: 
  - name:
    run: terrapatch add-module-argument $PATCHER_MODULE_ADDRESS sampleinput "\"samplevalue\""
```
<!-- spell-checker: enable -->

## Modifying `config.yaml`

Next, update the `.patcher/config.yaml` file to include the new patch in your repository.  
The `config.yaml` file acts as an index of patches for the repository.  
Patcher uses this file to quickly determine if dependencies need to be updated when evaluating a version bump.  

The general structure of an entry in `config.yaml` is as follows:  

```yaml
  - tag: <VERSION>
    patches:
      - slug: "<PATCH_NAME_SLUG>"
        modules_affected:
          - <MODULE_NAME>
```

The following fields are defined as:  
* `<VERSION>`: The version of the module that introduces the breaking change.  
* `<PATCH_NAME_SLUG>`: The slug used as the directory name for the patch.  
* `<MODULE_NAME>`: The name of the module that includes the breaking change.  

Once you have filled out these fields, the new entry in the `config.yaml` file will look like this:  

```yaml
  - tag: v0.10.4
    patches:
      - slug: "sample-breaking-change"
        modules_affected:
          - patcher-test
```

Include all changes to `config.yaml`, the new `patch.yaml` file, and the updates to the Terraform module in a single release. This is typically done in one pull request, though it is not a strict requirement.  

Other Patcher users will receive these updates the next time they run `patcher update`, benefiting from the work completed here.  

:::info  
Testing patches using `patcher` is not currently supported.  
The recommended approach is to manually test the steps locally.  
Future updates to Patcher will introduce mechanisms to simplify testing new patches.  
:::  

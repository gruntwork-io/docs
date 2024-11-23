# Authoring your first patch

## Prerequisites
* You have familiarity with Terraform or OpenTofu
* You have [patcher installed](/2.0/docs/patcher/installation/) either locally or as a GitHub Actions Workflow in your repository

## Overview

In this tutorial we will walk you through the following steps:

**Authoring a Patch**:
* Identifying the breaking change and its remediation steps
* Running `patcher generate` to template the patch
* Filling out the patch fields
* Modifying `config.yaml`

### Test Module

In this tutorial we'll use the `patcher-test` module from the `gruntwork-io/terraform-aws-utilities` repository. This module has a version `v0.10.3` that we'll intentionally specify as outdated in our infrastructure unit, and we'll write a patch to go out with the `v0.10.4` release. You can find the full, real-world example [here](https://github.com/gruntwork-io/terraform-aws-utilities/pull/102/), but we'll walk through the steps to arrive there below.

## Identifying the Breaking Change and its Remediation Steps

Let's say you want to add a new required variable to the `patcher-test` module. 
This type of change definitely counts as a breaking change, because if consumers of your module don't update their attributes to include the new variable, then OpenTofu will fail to plan/apply the infrastructure going forward. 

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

Then, run `patcher generate` in the root of the git repo to generate the patch template, given the title of the patch:

```bash
$ patcher generate "Sample Breaking Change"
```

This command adds a templated patch to your repo with the path `.patcher/patches/sample-breaking-change/patch.yaml`:

```yaml title=".patcher/patches/sample-breaking-change/patch.yaml"
name: "Sample Breaking Change"
description: <REPLACE_ME>
author: <REPLACE_ME>

# Optional list of dependencies that the patch requires.
dependencies:
  - name: terrapatch
    version: "0.1.0"

# List of steps that this patch should execute.
# Each step has a name field (string) and a run field, which can denote either an OS command, or an external script to be run.
# If there are any external scripts, then make sure you include these in the same directory where the patch.yaml file is.
steps:
  - name: <REPLACE_ME>
    run: <REPLACE_ME>
  - name: <REPLACE_ME>
    run: <REPLACE_ME>
```

As the module maintainer, you'll fill in the `<REPLACE_ME>` fields as necessary:
* `description`: Describe the change in a full sentence, in a way that succinctly communicates the change.
* `author`: The author of the patch. This entry could be you, or an organization, or anything else appropriate. 
* `steps.name`: A short label for that particular step. 
* `steps.run`: The command to run to perform that particular step.

## Filling out the Patch Fields

Because this breaking change is pretty simple, we can use [`terrapatch`](https://github.com/gruntwork-io/terrapatch) to perform the one necessary step:

<!-- spell-checker: disable -->
```bash
$ terrapatch add-module-argument $PATCHER_MODULE_ADDRESS sampleinput "\"samplevalue\""
```
<!-- spell-checker: enable -->

`$PATCHER_MODULE_ADDRESS` gets populated when Patcher is run; it doesn't need to be set independently anywhere. 

Once the fields in the patch are filled out, the patch should look like this:

<!-- spell-checker: disable -->
```yaml
name: "Sample Breaking Change"
description: A sample breaking change that adds a new argument
author: Gruntwork

# Optional list of dependencies that the patch requires.
dependencies:
  - name: terrapatch
    version: "0.1.0"

# List of steps that this patch should execute.
# Each step has a name field (string) and a run field, which can denote either an OS command, or an external script to be run.
# If there are any external scripts, then make sure you include these in the same directory where the patch.yaml file is.
steps:
  - name:
    run: terrapatch add-module-argument $PATCHER_MODULE_ADDRESS sampleinput "\"samplevalue\""
```
<!-- spell-checker: enable -->

## Modifying `config.yaml`

Next, you'll need to update the `.patcher/config.yaml` file to reflect that a new patch is added in your repo. 
Think of the `config.yaml` file like an index of patches for the repo.
Patcher uses it to quickly identify if there are dependencies to incorporate, given a version bump to examine.

The general structure of an entry in `config.yaml` is the following:

```yaml
  - tag: <VERSION>
    patches:
      - slug: "<PATCH_NAME_SLUG>"
        modules_affected:
          - <MODULE_NAME>
```

The following fields are defined as:
* `<VERSION>`: the version of the module that introduces the breaking change
* `<PATCH_NAME_SLUG>`: the slug that the patch uses as its directory name
* `<MODULE_NAME>`: the name of the module that includes the breaking change

Once the fields are filled out, the new entry to the `config.yaml` file will look like this:

```yaml
  - tag: v0.10.4
    patches:
      - slug: "sample-breaking-change"
        modules_affected:
          - patcher-test
```

Include all changes to `config.yaml`, the new `patch.yaml` file, and the changes to the terraform module in one single release (typically, this is one single PR also, but that's not a requirement).
Other users of Patcher will receive the updates the next time they run `patcher update`, and benefit from the work done here. 

:::info
Using `patcher` to test patches is not supported at this time. 
The best strategy at this moment is to test steps manually and locally. 
Future updates to patcher will include additional mechanisms to make testing easier.
:::
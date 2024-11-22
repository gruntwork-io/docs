# Applying your first patch
import CustomizableValue from '/src/components/CustomizableValue';

## Prerequisites
* You have familiarity with Terraform or OpenTofu
* You have [patcher installed](/2.0/docs/patcher/installation/) either locally or as a GitHub Actions Workflow in your repository

## Overview

In this tutorial we will walk you through the following steps:

**Using Patcher Locally**:
* Creating a new [infrastructure Unit](https://terragrunt.gruntwork.io/docs/getting-started/terminology/#unit) referencing a sample OpenTofu module, intentionally specifying an outdated version
* Running patcher against that module and understanding the outputs / options Patcher provides.
* Instructing patcher to apply the patch
* Creating a commit incorporating the patch

**Using Patcher as a GitHub Actions Workflow**:
* Creating a new [infrastructure Unit](https://terragrunt.gruntwork.io/docs/getting-started/terminology/#unit) referencing a sample OpenTofu module, intentionally specifying an outdated version
* Pushing that unit up to your remote repository in GitHub
* Triggering patcher to detect the out of date unit and apply the patch
* Reviewing the pull request created by Patcher and merging the changes.

### Test Module

In this tutorial we'll use the `patcher-test` module from the `gruntwork-io/terraform-aws-utilities` repository. This module has a version `v0.10.3` that we'll intentionally specify as outdated in our infrastructure unit, and have patcher update to v0.10.4 which includes a demonstration breaking change.

## Applying a patch using Patcher locally

Choose a directory named: <CustomizableValue id="DIRECTORY" /> in your repository where we'll add a new infrastructure unit.  In that folder create a file called `terragrunt.hcl` with the following content:
l
```hcl title="$$DIRECTORY$$/terragrunt.hcl"

terraform {
  source = "git@github.com:gruntwork-io/terraform-aws-utilities.git//modules/patcher-test?ref=v0.10.3"
}

# Include the root `terragrunt.hcl` configuration, which has settings common across all environments & components.
include "root" {
  path = find_in_parent_folders()
}
```

Now we'll run `patcher update`.  This can be run from the root of the repository, where it will scan every unit in all subfolders, or directly inside the <CustomizableValue id="DIRECTORY" /> directory.

```bash

$ cd $$DIRECTORY$$
$ patcher update
```

<img src="/img/patcher/tutorials/patcher_update_preview.png" />
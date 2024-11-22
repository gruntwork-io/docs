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

### The `patcher-test` Module

In this tutorial we'll use the `patcher-test` module from the `gruntwork-io/terraform-aws-utilities` repository. This module has a version `v0.10.3` that we'll intentionally specify as outdated in our infrastructure unit, and have patcher update to v0.10.4 which includes a demonstration breaking change.

## Applying a patch using Patcher locally

Choose a directory named: <CustomizableValue id="DIRECTORY" /> in your repository where we'll add a new infrastructure unit.  In that folder create a file called `terragrunt.hcl` with the following content:

```hcl title="$$DIRECTORY$$/terragrunt.hcl"

terraform {
  source = "git@github.com:gruntwork-io/terraform-aws-utilities.git//modules/patcher-test?ref=v0.10.3"
}

# Include the root `terragrunt.hcl` configuration, which has settings common across all environments & components.
include "root" {
  path = find_in_parent_folders()
}
```

Now we'll run `patcher update`.  This can be run from the root of the repository, where it will scan every unit in all sub-folders, or directly inside the <CustomizableValue id="DIRECTORY" /> directory.

```bash

$ cd $$DIRECTORY$$
$ patcher update
```


![Patcher Update homepage showing an update to the patcher-test module is available](/img/patcher/tutorials/patcher_update_preview.png)

From here you can hit enter to update `patcher-test`, or `u` to view usages of the module, `v` to view the changelog, or `q` to quit.

<details>
<summary>Hitting `u` to view changes shows the following:</summary>

![The changes page shows every unit that uses the module, and what the most recent version it](/img/patcher/tutorials/patcher_update_usages.png)
</details>

<details>
<summary>Hitting `v` to view the changelog shows the following:</summary>

![The changelog page shows the changelog directly from the upstream module](/img/patcher/tutorials/patcher_update_changelog.png)
</details>

From here hit `enter` and patcher will apply the update:

![Patcher update shows that it found a patch to be applied and what version it is incrementing to](/img/patcher/tutorials/patcher_update_in_progress.png)

![Patcher Update completion notice](/img/patcher/tutorials/patcher_update_complete.png)

<!-- spell-checker: disable -->
You can now inspect the filesystem and see the results of the patch.  In this case it resulted in changing the version of `patcher-test` from `v0.10.3` to `v0.10.5` and added a new required argument `sampleinput` to the unit. This change can now be committed and pushed to your repository.
<!-- spell-checker: enable -->

![Patcher Update completion notice](/img/patcher/tutorials/patcher_update_results.png)

## Applying a patch using Patcher via GitHub Actions

Choose a directory named: <CustomizableValue id="DIRECTORY" /> in your repository where we'll add a new infrastructure unit.  In that folder create a file called `terragrunt.hcl` with the following content:

```hcl title="$$DIRECTORY$$/terragrunt.hcl"

terraform {
  source = "git@github.com:gruntwork-io/terraform-aws-utilities.git//modules/patcher-test?ref=v0.10.3"
}

# Include the root `terragrunt.hcl` configuration, which has settings common across all environments & components.
include "root" {
  path = find_in_parent_folders()
}
```

Now we'll push this up to your repository.

```bash
$ git checkout -b patcher-test-update
$ git add $$DIRECTORY$$/terragrunt.hcl
$ git commit -m "Adding a new infrastructure unit that uses the patcher-test module"
$ git push -u origin patcher-test-update

```

Now navigate to your repository in GitHub and create a new pull request for the `patcher-test-update` branch.  In order for Patcher to identify this unit as needing an update, it first has to be merged to main, so go ahead and merge the pull request.

:::info
In a real world use case, you are unlikely to create a new unit that immediately is out of date, and instead Patcher would on a schedule and detect updates to modules some time after they have been merged.  For the purpose of this tutorial, however, we're intentionally merging an out of date module to main so we can trigger Patcher to update it immediately.
:::

Once the code has been merged to main, we can now directly trigger Patcher to scan for out of date modules.

<details>
<summary>If you don't already have Patcher installed in your repository, you can add the following GitHub Actions workflow:</summary>

```yaml title=".github/workflows/patcher.yml"

name: Patcher - Update Dependencies

on:
  pull_request_target:
    types:
      - closed
    branches:
      - main
  workflow_dispatch:

permissions:
  contents: write

jobs:
  update:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: gruntwork-io/patcher-action@v2
        with:
          github_token: ${{ secrets.PATCHER_GRUNTWORK_READ_TOKEN }}
          pull_request_branch: patcher/update-dependencies
          pull_request_title: "Patcher: Update dependencies"
          spec_file: ""
```

</details>

Navigate to `https://github.com/YOUR_ORG/YOUR_REPO/actions/workflows/patcher.yml` and select `Run Workflow` -> `Run workflow`.

![Patcher GitHub Action Workflow Page](/img/patcher/tutorials/patcher_gh_update_action_page.png)

![Click on "Run workflow" to manually trigger patcher](/img/patcher/tutorials/patcher_gh_update_action_button.png)

At this point the action will begin.  After a few seconds you should see a new action run, and when it's complete a new pull request will be open in your repository including the updated code.

![The workflow completed successfully](/img/patcher/tutorials/patcher_gh_update_action_complete.png)

![The pull request Patcher created, complete with details of what was patched.](/img/patcher/tutorials/patcher_gh_update_action_pr.png)

![The content of the pull request, including version changes and code modifications as a result of applying patches](/img/patcher/tutorials/patcher_gh_update_action_pr_diff.png)

At this point if you are a [Gruntwork Pipelines](/2.0/docs/pipelines/concepts/overview) customer, Pipelines will kick in and plan your change and post the results to the comment.  If you're satisfied, you could then go ahead and merge the pull request to apply and finalize the change.
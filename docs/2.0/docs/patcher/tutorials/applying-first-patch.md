# Applying your First Patch
import CustomizableValue from '/src/components/CustomizableValue';

## Prerequisites
* Familiarity with Terraform or OpenTofu  
* [Patcher installed](/2.0/docs/patcher/installation/) either locally or as a GitHub Actions workflow in your repository  

## Overview

In this tutorial, we will walk through the following steps:  

**Using Patcher locally**:
* Create a new [infrastructure Unit](https://terragrunt.gruntwork.io/docs/getting-started/terminology/#unit) that references a sample OpenTofu module, intentionally specifying an outdated version.  
* Run `patcher` against the module and review the outputs and options provided.  
* Instruct `patcher` to apply the patch.  
* Commit the updated changes.  

**Using Patcher as a GitHub Actions workflow**:
* Create a new [infrastructure Unit](https://terragrunt.gruntwork.io/docs/getting-started/terminology/#unit) that references a sample OpenTofu module, intentionally specifying an outdated version.  
* Push the unit to your remote GitHub repository.  
* Trigger `patcher` to detect the outdated unit and apply the patch.  
* Review the pull request created by `patcher` and merge the changes. 

### The `patcher-test` Module
In this tutorial we use the `patcher-test` module from the [gruntwork-io/terraform-aws-utilities](https://github.com/gruntwork-io/terraform-aws-utilities) repository. For demonstration purposes, we will specify version `v0.10.3` as outdated in our infrastructure unit and update it to `v0.10.4`, which includes a breaking change.  


## Applying a patch using Patcher locally

Choose a directory named: <CustomizableValue id="DIRECTORY" /> in your repository to add a new infrastructure unit. Create a file called `terragrunt.hcl` in that folder with the following content:  

```hcl title="$$DIRECTORY$$/terragrunt.hcl"

terraform {
  source = "git@github.com:gruntwork-io/terraform-aws-utilities.git//modules/patcher-test?ref=v0.10.3"
}

# Include the root `terragrunt.hcl` configuration, which contains settings common across all environments and components.  
include "root" {  
  path = find_in_parent_folders()  
}
```

Now run `patcher update`. You can execute this command from the root of the repository to scan all units in sub-folders, or directly inside the <CustomizableValue id="DIRECTORY" /> directory.  

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

Press `enter` to apply the update with Patcher:

![Patcher update shows that it found a patch to be applied and what version it is incrementing to](/img/patcher/tutorials/patcher_update_in_progress.png)

![Patcher Update completion notice](/img/patcher/tutorials/patcher_update_complete.png)

<!-- spell-checker: disable -->  
You can now inspect the file system to verify the results of the patch. In this case, the update changed the version of `patcher-test` from `v0.10.3` to `v0.10.5` and added the required argument `sampleinput` to the unit. Commit and push these changes to your repository.  
<!-- spell-checker: enable -->  

![Patcher Update completion notice](/img/patcher/tutorials/patcher_update_results.png)  

## Applying a Patch Using Patcher via GitHub Actions  

Choose a directory named: <CustomizableValue id="DIRECTORY" /> in your repository to add a new infrastructure unit. Create a file called `terragrunt.hcl` in that folder with the following content:   
 
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

Now navigate to your repository in GitHub and create a new pull request for the `patcher-test-update` branch. For Patcher to recognize this unit as needing an update, it must first be merged into <CustomizableValue id='main' />. Go ahead and merge the pull request.

:::info  
In a real-world scenario, it is uncommon to create a new unit that is immediately out of date. Typically, Patcher runs on a schedule to detect module updates after they have been merged. For this tutorial, however, we are intentionally merging an outdated module into <CustomizableValue id='main' /> to trigger Patcher to update it immediately.  
:::

Once the code has been merged into <CustomizableValue id='main' />, you can trigger Patcher to scan for outdated modules.

<details>  
<summary>If Patcher is not already installed in your repository, you can add the following GitHub Actions workflow:</summary>  

```yaml title=".github/workflows/patcher.yml"

name: Patcher - Update Dependencies

on:
  pull_request_target:
    types:
      - closed
    branches:
      - $$main$$
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
          # If you're not sure what token to use here, reach out to Gruntwork support for guidance.
          github_token: ${{ secrets.GRUNTWORK_TOKEN }}
          pull_request_branch: patcher/update-dependencies
          pull_request_title: "Patcher: Update dependencies"
          spec_file: ""
```
</details>

Navigate to `https://github.com/YOUR_ORG/YOUR_REPO/actions/workflows/patcher.yml` and select **Run Workflow** -> **Run workflow**.  

![Patcher GitHub Action Workflow Page](/img/patcher/tutorials/patcher_gh_update_action_page.png)  

![Click on "Run workflow" to manually trigger patcher](/img/patcher/tutorials/patcher_gh_update_action_button.png)  

At this point, the action will begin. After a few seconds, you should see a new action run. Once it completes, a new pull request will be opened in your repository containing the updated code.  

![The workflow completed successfully](/img/patcher/tutorials/patcher_gh_update_action_complete.png)  

![The pull request Patcher created, complete with details of what was patched.](/img/patcher/tutorials/patcher_gh_update_action_pr.png)  

![The content of the pull request, including version changes and code modifications as a result of applying patches](/img/patcher/tutorials/patcher_gh_update_action_pr_diff.png)  

At this point, if you are a [Gruntwork Pipelines](/2.0/docs/pipelines/concepts/overview) customer, Pipelines will automatically plan the change and post the results as a comment. If the results look good, you can merge the pull request to apply and finalize the change.  

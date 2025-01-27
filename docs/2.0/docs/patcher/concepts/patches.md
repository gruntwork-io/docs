# What is a Patcher Patch?

A patch in Patcher is a set of instructions designed to automate code transformations. It enables the seamless adoption of breaking changes in infrastructure-as-code projects, streamlining updates for tools like Terragrunt, OpenTofu, and Terraform.

These instructions are delivered through a `yaml` file in the following format:

```yaml title=".patcher/patches/v1.0.0/my-patch/patch.yaml"
name: "<name-of-patch>"
description: "<description for patch>"
author: <your-name-here> <<your-email-address-here>>

# Optional dependencies. Terrapatch is a typical one
dependencies:
  - name: terrapatch
    version: "0.1.0"

# Steps necessary to resolve breaking changes
steps:
  - name: "<name-of-step>"
    run: <command-to-run>
  - name: "<name-of-second-step>"
    run: <second-command-to-run>
  # etc
```
[View an example patch in the CIS Service Catalog.](https://github.com/gruntwork-io/terraform-aws-service-catalog/blob/c3d5ede211fc3230a7d493ceea43622b337ee88a/.patcher/patches/v0.96.4/switch-to-cis-rds-module/patch.yaml)

## Module consumers and module authors

Patcher is designed for two key personas:

- **Module authors**: Authors of OpenTofu/Terraform modules.
- **Module consumers**: Users of OpenTofu/Terraform modules, typically referenced in Terragrunt units (`terragrunt.hcl` files) or directly in Terraform/OpenTofu code.

## For module authors

Module authors often need to introduce breaking changes in their modules, which can create a challenging experience for module consumers who must manually update their code. Patcher simplifies this process by allowing module authors to include a patch YAML file that automates these updates.

When a module consumer executes a patch, their code is updated automatically to reflect changes such as adding or renaming variables, updating provider references, or applying other transformations defined in the patch. 

While module authors have the flexibility to write any command steps for patches, such as validating tool versions or using `sed` for find-and-replace operations, it is **strongly recommended** to use [`terrapatch`](https://github.com/gruntwork-io/terrapatch). Terrapatch is a Gruntwork tool that enables precise updates to Terragrunt or Terraform/OpenTofu HCL files.

By investing a small amount of additional time in authoring a patch, module authors enable all module consumers to seamlessly adopt breaking changes without manual intervention.

## For module consumers

Module consumers typically reference specific versions of OpenTofu/Terraform modules to maintain consistency. Over time, as new versions of modules are released, consumer code can become outdated. In cases where updates introduce breaking changes, consuming code must be edited to ensure compatibility—this is where Patcher proves most valuable.

Patcher automates updates by applying patches that incorporate breaking changes, reducing the manual effort required to keep infrastructure code current.

### Two update strategies

Patcher offers two flexible strategies for applying updates:

1. **Push strategy**: Patcher automatically opens pull requests containing updates, allowing consumers to review and merge changes as needed.
2. **Pull strategy**: Users manually run the Patcher CLI to scan their repository, identify updates, and apply them directly.

While the implementation details differ, the purpose remains the same: Patcher suggests changes to keep your infrastructure code up to date.

### Update push strategy

In the push strategy, Patcher automatically opens pull requests on a schedule you define. Pull requests can be grouped by parameters such as environment or module version. For example:

![Patcher PR Example](/img/patcher/pr-example.png)

To enable the push strategy, implement the [Patcher GitHub Action workflow](https://github.com/gruntwork-io/patcher-action). This action provides full control over your upgrade cadence. For safer updates, you can promote changes sequentially through environments like `dev`, `stage`, and `prod`. 

Refer to our guide on [promotion workflows](/2.0/docs/patcher/guides/promotion-workflows) for more details.

### Update pull strategy

In the pull strategy, users manually invoke the Patcher CLI to scan the repository and apply updates.
To begin, run the following command in the target repository:

```bash
$ patcher update ./
```

By default, the CLI operates interactively, presenting details of available updates:

![Patcher Update Interactive Mode](/img/patcher/interactive-update.png).

Alternatively, use `--non-interactive` mode to apply updates automatically:

```bash
$ patcher update --non-interactive
```
By default, Patcher does not open a pull request. However, changes are visible in version control, allowing you to create pull requests or integrate changes using your IaC workflow.

### Examples running `patcher update`
Here is a basic example:

```bash
$ cd <repo-root-directory>
# Show patches available for all directories
$ patcher update ./
```
For advanced usage, including automated PR creation, run:
```bash
$ patcher update --update-strategy next-safe --non-interactive --publish --pr-branch grunty/update-via-patcher --pr-title "[Patcher] Update All Dependencies to Next Safe"
```
For a complete list of options, refer to the [Patcher CLI Reference](/2.0/reference/patcher/index.md#update).

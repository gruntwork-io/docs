# What is a Patcher Patch?

A Patch is a set of instructions executed by Patcher that do code transformations.
This strategy is especially useful as a way to automate adoption of a breaking change with infrastructure as code, such as Terragrunt, OpenTofu, or Terraform.
This instruction sheet is delivered by means of a `yaml` file in a specific format:

```yaml title=".patcher/patches/v1.0.0/my-patch/patch.yaml"
name: "<name-of-patch>"
description: "<description for patch>"
author: <your-name-here> <<your-email-address-here>>

# Optional dependencies. Terrapatch is a typical one
dependencies:
  - name: terrapatch
    version: "0.1.0"

# Steps necessary to resolve breaking change
steps:
  - name: "<name-of-step>"
    run: <command-to-run>
  - name: "<name-of-second-step>"
    run: <second-command-to-run>
  # etc
```

[Check out an example of a patch in the CIS Service Catalog.](https://github.com/gruntwork-io/terraform-aws-service-catalog/blob/c3d5ede211fc3230a7d493ceea43622b337ee88a/.patcher/patches/v0.96.4/switch-to-cis-rds-module/patch.yaml)

## Module consumers and module authors

Patcher is built around the idea of two specific personas:

- **Module authors.** Module authors write OpenTofu/Terraform modules, or make updates to those modules.
- **Module consumers.** Module consumers make use of an OpenTofu/Terraform module that was created by a module author, typically in Terragrunt units (`terragrunt.hcl` files) or directly in OpenTofu/Terraform code that calls a module.

## For Module Consumers

When module consumers reference an OpenTofu/Terraform module, it is a best practice to reference a specific version of the OpenTofu/Terraform module.
Over time, module authors release new versions of the module, and the code that consumes those modules slowly gets out of date.
In some cases, the latest update of the underlying modules requires a breaking change to the consuming code, meaning the version can't just be bumped; the code needs to be edited.
This is when using a patch with Patcher comes in handy.

### Two update strategies

Patches can be consumed with either a "push" strategy, where Patcher proactively opens a pull request with the latest update, or a "pull" strategy, where a repo is manually scanned to look at the current state of your infrastructure using the Patcher CLI tool.

Regardless of methodology, the concept remains the same.
Patcher will suggest changes to your codebase in order to keep your infrastructure up to date, however you see fit.

### Update Push Strategy

In the "push" strategy, Patcher opens pull requests against your codebase on a schedule you set. You can further customize how those pull requests are grouped by environment, module version, or other parameters. Here is an example of such a pull request:

![Patcher PR Example](/img/patcher/pr-example.png)

You can implement the push strategy by using the [Patcher GitHub action workflow](https://github.com/gruntwork-io/patcher-action).

The intention with this GitHub action is to leave the repo owner in full control of your upgrade cadence. Check out our guide on [promotion workflows](/2.0/docs/patcher/guides/promotion-workflows), so that updates can proceed from `dev` to `stage` to `prod` (or any other environment sequence) to mitigate risks around upgrades.

### Update Pull Strategy

In the "pull" strategy, you the user choose to launch the Patcher CLI to scan the current state of your repo.

The first step is to run `patcher update` within the repo in which updates are desired.
When `patcher update` is run, the default mode is to click through the updates **interactively**.
In this mode, available updates are found, and the details of those updates are presented to you:

![Patcher Update Interactive Mode](/img/patcher/interactive-update.png)

You can choose to run in `--non-interactive` mode, which will modify the codebase and present results about what the program did at the end.

By default a pull request will _not_ be opened with the changes.
However, the changes should be visible within the version control system. At that point, you may make a pull request or apply the changes using your IaC system.

### Examples Running `patcher update`

Here's the easiest way to run this command:

```bash
$ cd <repo-root-directory>
# Show what patches are available for everything in the current directory and all it's children
$ patcher update ./
```

If more fine-grain controls are desired, the following example (which includes advanced usage topics like [update strategies](/2.0/docs/patcher/concepts/update-strategies.md)) has those:

```bash
# run 'update' non-interactively, only up to the next safe version, and publish a PR with the changes
$ patcher update --update-strategy next-safe --non-interactive --publish --pr-branch grunty/update-via-patcher --pr-title "[Patcher] Update All Dependencies to Next Safe"
```

More details on the available options included in `patcher update` can be found in the [reference section](/2.0/reference/patcher/index.md#update).

## For Module Authors

Module authors periodically need to introduce breaking changes in their modules, causing a downstream, potentially painful, experience for module consumers.
With patches, module authors include a patch YAML file that automatically updates consuming code to incorporate the breaking changes associated with the updated module code.
Doing so allows module consumers to use patches to enable their modules consumers to automatically update consuming code to adopt breaking changes.

In a Patcher ecosystem, the resolution to such a change is written once, in a patch, and distributed to all consumers.
Although your release will succeed with or without a patch, downstream consumers of your breaking change will praise you thoroughly for your advance work.

In theory, you may write whatever command execution steps you want to perform patch steps.
For example, there are many cases where validating tool versions are required, or using `sed` to find and replace certain values.
However, we _strongly_ recommend using [`terrapatch`](https://github.com/gruntwork-io/terrapatch), a Gruntwork tool that surgically updates Terraform/OpenTofu HCL files.

# What is Gruntwork Patcher?

Gruntwork Patcher automates the process of keeping your infrastructure code ([Terragrunt](https://terragrunt.gruntwork.io/), [OpenTofu](https://opentofu.org/), and [Terraform](https://terraform.io)) up to date, including applying patches to ensure compatibility with backward-incompatible module releases.

We use the term "Patcher" to refer to the [Patcher CLI](https://github.com/gruntwork-io/patcher-cli), the public [Patcher GitHub Action](https://github.com/gruntwork-io/patcher-action), and the collection of tools (like [Terrapatch](https://github.com/gruntwork-io/terrapatch-cli)) that enable Patcher to be useful.

## Why use Patcher?

Manually identifying updates and assessing whether they can be safely applied can consume significant engineering time for each module dependency. Patcher eliminates this inefficiency by streamlining the update process.

Patcher supports keeping any set of OpenTofu/Terraform modules up to date, whether they be your inhouse modules, third-party open source modules, or modules from the [Gruntwork IaC Library](/2.0/docs/library/concepts/overview).

Patcher specializes in keeping infrastructure code up to date and currently supports automatic updates for:

- OpenTofu modules
- Terraform modules
- Terragrunt units
- Terragrunt stacks

## Two update modes

When most teams think about updating their infrastructure code, there are two core use cases they look to solve:

1. **Legacy upgrade.** You wish to take a repo or set of files that are significantly out of date and bring them up to date with the latest OpenTofu/Terraform module versions.
2. **Ongoing updates.** You wish to streamline the process of keeping a repo or set of files up to date over time.

Patcher can help with both of these use cases.

For legacy upgrades, the Patcher CLI offers an [interactive mode](../guides/update) where you can browse all modules in the current working directory and below, browse available updates, and upgrade modules one at a time. We've found this approach works well with a modest set of updates, however for significantly out of date repos or files or a large number of files, you may wish to consider alternative approaches.

For ongoing updates, you can use Patcher in conjunction with our [published GitHub Action](https://github.com/gruntwork-io/patcher-action) to automatically scan your repo's modules and [open pull requests](../guides/ongoing-updates) with updated module versions. Opening one pull request for every update can get cumbersome, so Patcher also supports a variety of [grouping modes](../concepts/grouping) that allow you to streamline your workflow.

## How does Patcher work?

Patcher handles both non-breaking and breaking changes. For non-breaking changes, for the [Gruntwork IaC Library](/docs/2.0/docs/library/concepts/overview.md), Patcher uses a set of pre-generated changelog files to identify the "next safe change," enabling upgrades to automatically bypass "empty" version upgrades where a module is available at a newer version but in fact has had no actual file changes. Upon request, we can work with you to implement these pre-generated changelogs in your own organization.

For breaking changes, Patcher offers a systematic approach to doing code transformations -- we call these "patches" -- so that module consumers can automatically apply breaking changes to their modules. Or if Patcher detects a breaking change but a patch does not exist, Patcher updates the relevant module to the next breaking change and generates a `README` file in the folder with the updated file that outlines the release notes and details the breaking changes. Users review the `README`, address any necessary actions, and remove the file before re-running Patcher.

## Supported integrations

Patcher currently works for GitHub, GitHub Enterprise, and GitHub Enterprise self-hosted.
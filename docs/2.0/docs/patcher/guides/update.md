# Patcher Update

:::info

Starting in `0.4.1`, Patcher applies patches using a Docker sandbox by default and will pull the latest version of the [`gruntwork/patcher_bash_env`](https://hub.docker.com/r/gruntwork/patcher_bash_env) image.

To run Patcher locally without Docker or in a CI pipeline you should add the `--skip-container-runtime` flag.

:::

The Patcher update command allows you to update some or all of the module dependencies in the current folder and any child folders.

Patcher supports two modes: **interactive mode** and **non-interactive mode**.

## Interactive Mode

In interactive mode, the update command lets you selectively update dependencies one module at time.

Example usage:
```
patcher update prod
```

After scanning for dependencies, Patcher will show you the 'Modules View'.

If all the dependencies are fully up to date, then Patcher shows a tick in the "Up to date" column.

![Patcher update screenshot showing dependendency that is fully up to date](/img/guides/stay-up-to-date/patcher/patcher-update-overview-futd.png)

If Patcher can update one or more usages of a module to a newer version, then Patcher offers two options:

* "Hit «ENTER» to update all usages to the next safe version."

* "Hit «b» to update all usages to the next version, even if it's a breaking change."

![Patcher update screenshot showing dependency that can be updated](/img/guides/stay-up-to-date/patcher/patcher-update-overview-update-available.png)

Pressing `ENTER` will update all the usages of that module to either the highest version before the next closest breaking change or the latest version of the dependecy, whichever is encountered first.

Pressing `b` will update all the usages of that module to either the next closest breaking change or the latest version of the dependency, whichever is encountered first.

After updating the "Up to date" column is changed to show "Updated". This indicates that at least one of the dependencies on that module have been updated.

![Patcher update screenshot showing dependency that has been updated](/img/guides/stay-up-to-date/patcher/patcher-update-overview-updated.png)

When you quit Patcher, it writes the details of all the updates to stdout in YAML format, for example:

![Patcher update screenshot showing YAML output](/img/guides/stay-up-to-date/patcher/patcher-update-yaml-output.png)

### Navigation commands

1. While in the modules view, press `u` to see the usages. It shows all places where module is being used:

![Patcher usages screenshot showing module with multiple usages](/img/guides/stay-up-to-date/patcher/patcher-update-usages-update-available.png)

2. While in the modules view, press `v` to see the changelogs from a module. Press `o` to open the page in the browser.

![Patcher changelogs screenshot](/img/guides/stay-up-to-date/patcher/patcher-update-changelog.png)

Some modules including third party modules may not have a CHANGELOGS.md file. In this case, press `o` to open the releases page for that repository.

![Patcher no changelogs screenshot](/img/guides/stay-up-to-date/patcher/patcher-update-no-changelog.png)

## Non-Interactive Mode

:::caution

Starting in `0.4.1`, Patcher applies patches using a Docker sandbox by default.

To run Patcher in a CI pipeline you should add the `--skip-container-runtime` flag.

:::

In non-interactive mode, Patcher updates all module dependencies in the current folder (and child folders) according to the specified update strategy.

Non-interactive mode supports both the `next-safe` and `next-breaking` update strategies.

### Next Safe (Default)

Using the [next safe update strategy](/patcher/update-strategies#next-safe-update-strategy-default), if Patcher encounters a breaking change that it cannot patch then it will update the dependencies to the highest version **before** that breaking change. Otherwise, it will update the dependencies the latest version of that module.

Example usage:
```
patcher update --non-interactive --skip-container-runtime --update-strategy next-safe prod
```
Or just
```
patcher update --non-interactive --skip-container-runtime prod
```

### Next Breaking

Using the [next breaking update strategy](/2.0/docs/patcher/concepts/update-strategies#next-breaking-update-strategy), if Patcher encounters a breaking change that it cannot patch then it will update the dependencies to the version with the breaking change and stop. Otherwise, it will update the dependencies the latest version of that module.

If Patcher updates a dependency to a breaking version, a `README-TO-COMPLETE-UPDATE.md` is written into the folder containing the dependendency. The `README-TO-COMPLETE-UPDATE.md` file contains a release note extract for each dependency in that folder that was updated to a breaking change.

Example usage:
```
patcher update --non-interactive --skip-container-runtime --update-strategy next-breaking prod
```

## Support for Third Party Modules

Patcher provides first class support for third party modules in both interactive mode and non-interactive mode, this includes your own modules.

Starting in `0.4.3`, Patcher provides first class support for updating third party modules. The updates to third party modules are based on the semver version.

For example, the [terraform-aws-modules/terraform-aws-vpc](https://github.com/terraform-aws-modules/terraform-aws-vpc) module has three recent change: `5.0.0`, `5.1.0` and `5.1.1`.

And in `infrastructure-live/dev` there is a dependency on `terraform-aws-vpc/vpc`:
- `dev/us-east-1/prod/dev/terragrunt.hcl` currently uses `4.0.0`

![Screenshot of third party module dependency with updates available](/img/guides/stay-up-to-date/patcher/patcher-update-overview-3p-update-available.png)

Patcher can update this dependency to the latest version but because there is a breaking version in between, Patcher updates to `5.0.0` and writes a `README-TO-COMPLETE-UPDATE.md` file into the folder containing the dependendency.

![Screenshot of third party module dependency usages with updates available](/img/guides/stay-up-to-date/patcher/patcher-update-usages-3p-update-available.png)

The `README-TO-COMPLETE-UPDATE.md` file contains the [release note](https://github.com/terraform-aws-modules/terraform-aws-vpc/releases/tag/v5.0.0).

```md
# vpc-endpoints v4.0.0 -> v5.0.0 (2023.08.15 13:39:56)

Updated dependency vpc-endpoints in dev/us-east-1/dev/vpc/terragrunt.hcl to version v5.0.0, which contains breaking changes. You MUST follow the instructions in the release notes to complete this update safely: https://github.com/terraform-aws-modules/terraform-aws-vpc/releases/tag/v5.0.0

Here are the release notes for version v5.0.0:

## [5.0.0](https://github.com/terraform-aws-modules/terraform-aws-vpc/compare/v4.0.2...v5.0.0) (2023-05-30)


### ⚠ BREAKING CHANGES

* Bump Terraform AWS Provider version to 5.0 (#941)

### Features

* Bump Terraform AWS Provider version to 5.0 ([#941](https://github.com/terraform-aws-modules/terraform-aws-vpc/issues/941)) ([2517eb9](https://github.com/terraform-aws-modules/terraform-aws-vpc/commit/2517eb98a39500897feecd27178994055ee2eb5e))
```

Running Patcher again will complete the update to `5.1.1`, the `README-TO-COMPLETE-UPDATE.md` file should be read, actioned and deleted first.

![Screenshot of third party module dependency full up to date](/img/guides/stay-up-to-date/patcher/patcher-report-overview-3p-futd.png)

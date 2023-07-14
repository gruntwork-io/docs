# Patcher Update

The Patcher update command allows you to update some or all of the module dependencies in the current folder and any child folders.

The update command supports two modes: **interactive mode** and **non-interactive mode**.

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

In non-interactive mode, Patcher updates all module dependencies in the current folder (and child folders) according to the specified update strategy.

Non-interactive mode supports both the `next-safe` and `next-breaking` update strategies.

### Next Safe (Default)

Using the [next safe update strategy](/patcher/update-strategies#next-safe-update-strategy-default), if Patcher encounters a breaking change that it cannot patch then it will update the dependencies to the highest version **before** that breaking change. Otherwise, it will update the dependencies the latest version of that module.

Example usage:
```
patcher update --non-interactive --update-strategy next-safe
```
Or just
```
patcher update --non-interactive
```

### Next Breaking

Using the [next-breaking update strategy](/patcher/update-strategies#next-breaking-update-strategy), if Patcher encounters a breaking change that it cannot patch then it will update the dependencies to the version with the breaking change and stop. Otherwise, it will update the dependencies the latest version of that module.

If Patcher updates a dependency to a breaking version, a `README-TO-COMPLETE-UPDATE.md` is written into the folder containing the dependendency. The `README-TO-COMPLETE-UPDATE.md` file contains a release note extract for each dependency in that folder that was updated to a breaking change.

Example usage:
```
patcher update --non-interactive --update-strategy next-breaking
```

## Support for Third Party Modules

Beginning with version `0.3.3`, Patcher provides limited support for updating third party modules, including your own modules. The updates to third party module are limited to bumping the semver patch version.

Third party modules are supported in both interactive mode and non-interactive mode.

For example, the [terraform-aws-modules/terraform-aws-vpc](https://github.com/terraform-aws-modules/terraform-aws-vpc) module has two recent changes: `4.0.2` and `5.0.0`.

And in `infrastructure-live/prod` there is a dependency on `terraform-aws-vpc/vpc`:
- `prod/us-east-1/prod/vpc/terragrunt.hcl` currently uses `4.0.0`

Patcher can update this dependency to `4.0.2` but because this only requires bumping the semver patch version.

![Screenshot of third party module dependency usages with updates available](/img/guides/stay-up-to-date/patcher/patcher-update-usages-3p-update-available.png)

Patcher cannot update from `4.0.x` to `5.0.0` and will instead show a `?` in the "Up to date" column and the message "Patcher can not determine an update plan for this dependency".

![Screenshot of third party module dependency that cannot be updated](/img/guides/stay-up-to-date/patcher/patcher-update-overview-3p-no-plan.png)

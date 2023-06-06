# Patcher Update

The `patcher update` command allows you to update some or all of the module dependencies in the current folder and any child folders.

@@TK 

## Interactive Mode

In interactive mode, the update command lets you selectively update dependencies one module at time.

After scanning for dependencies, Patcher will show you the 'Modules View'.

If all the dependencies are fully up to date, then Patcher shows a tick in the "Up to date" column.

![Patcher update screenshot showing dependendency that is fully up to date](/img/guides/stay-up-to-date/patcher/patcher-update-overview-futd.png)

If the next available version for a module dependency contains a breaking change that Patcher cannot patch, then a warning message is shown at the bottom of the screen. You can view the individual usages of the module but you are not able to update them.

![Patcher Update screenshot showing dependency that has a breaking change next](/img/guides/stay-up-to-date/patcher/patcher-update-overview-breaking-change.png)

If Patcher can update one or more usages of a module to a newer version, then Patcher shows the message "Hit «ENTER» to update all usages to the next safe version."

![Patcher Update screenshot showing dependency that can be updated](/img/guides/stay-up-to-date/patcher/patcher-update-overview-update-available.png)

Pressing `ENTER` will update all the usages of that module to either the highest version before the next closest breaking change or the latest version of the dependecy, whichever is encountered first.

The "Up to date" column is chnaged to show "Updated". This indicates that at least one of the dependencies on that module have been updated.

![Patcher Update screenshot showing dependency that has been updated](/img/guides/stay-up-to-date/patcher/patcher-update-overview-updated.png)

When you quit Patcher, it writes the details of all the updates to stdout in YAML format, for example:

![Patcher Update screenshot showing YAML output](/img/guides/stay-up-to-date/patcher/patcher-update-yaml-output.png)

### Navigation commands

1. While in the modules view, press `u` to see the usages. It shows all places where module is being used:

![Patcher Usages screenshot showing module with multiple usages](/img/guides/stay-up-to-date/patcher/patcher-update-usages-update-available.png)

2. While in the modules view, press `v` to see the changelogs from a module. Press `o` to open the page in the browser.

![Patcher Changelogs screenshot](/img/guides/stay-up-to-date/patcher/patcher-update-changelog.png)

:::info
Some modules do not have a CHANGELOGS.md file. In this case, press `o` to open the releases page for that repository.

:::

![Patcher No Changelogs screenshot](/img/guides/stay-up-to-date/patcher/patcher-update-no-changelog.png)

## Non-Interactive Mode

@@TODO
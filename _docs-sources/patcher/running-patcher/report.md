# Patcher Report

The `patcher report` command is a read-only version of Patcher that shows the changelog per module and its usages.

After scanning for dependencies, Patcher will show you the 'Modules View', similar to the screenshot below.

![Patcher report screenshot](/img/guides/stay-up-to-date/patcher/patcher-report-overview-futd.png)

### Navigation commands

1. While in the modules view, press `u` to see the usages. It shows all places where module is being used:

![Patcher usages screenshot](/img/guides/stay-up-to-date/patcher/patcher-report-usages.png)

2. While in the modules view, press `v` to see the changelogs from a module. Press `o` to open the page in the browser.

![Patcher changelogs screenshot](/img/guides/stay-up-to-date/patcher/patcher-report-changelog.png)

Some modules including third party modules may not have a CHANGELOGS.md file. In this case, press `o` to open the releases page for that repository.

![Patcher no changelogs screenshot](/img/guides/stay-up-to-date/patcher/patcher-report-no-changelog.png)



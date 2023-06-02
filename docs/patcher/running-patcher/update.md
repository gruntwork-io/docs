# Patcher Update

The `patcher update` command allows you to selectively update .

## Interactive Mode

After scanning for dependencies, Patcher will show you the 'Modules View', similar to the screenshot below.

![Patcher Update screenshot](/img/guides/stay-up-to-date/patcher/patcher-update-overview-futd.png)

@@TODO

![Patcher Update screenshot](/img/guides/stay-up-to-date/patcher/patcher-update-overview-breaking-change.png)

@@TODO

![Patcher Update screenshot](/img/guides/stay-up-to-date/patcher/patcher-update-overview-update-available.png)

### Navigation commands

1. While in the modules view, press `u` to see the usages. It shows all places where module is being used:

![Patcher Usages screenshot](/img/guides/stay-up-to-date/patcher/patcher-update-usages-update-available.png)

@@TODO explain "next safe" and "next breaking"

2. While in the modules view, press `v` to see the changelogs from a module. Press `o` to open the page in the browser.

![Patcher Changelogs screenshot](/img/guides/stay-up-to-date/patcher/patcher-update-changelog.png)

:::info
Some modules do not have a CHANGELOGS.md file. In this case, press `o` to open the releases page for that repository.

:::

![Patcher No Changelogs screenshot](/img/guides/stay-up-to-date/patcher/patcher-update-no-changelog.png)

## Non-Interactive Mode

@@TODO

<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "24b41279d94d321d04438cf50ca316b7"
}
##DOCS-SOURCER-END -->

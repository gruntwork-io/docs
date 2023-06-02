# Patcher Report

In `v0.2.x`, the only available command is `patcher report`. This is a read-only version of Patcher that shows the changelog per module and its usages. After running patcher report you will end up in the 'Modules View', similar to the screenshot below.

![Patcher Report screenshot](/img/guides/stay-up-to-date/patcher/patcher-report.png)

#### Navigation commands

1. While in the modules view, press `u` to see the usages. It shows all places where module is being used:

![Patcher Usages screenshot](/img/guides/stay-up-to-date/patcher/patcher-usages.png)


2. While in the modules view, press `v` to see the changelogs from a module. Press `o` to open the page in the browser.

![Patcher Changelogs screenshot](/img/guides/stay-up-to-date/patcher/patcher-changelogs.png)

:::info
Some modules do not have a CHANGELOGS.md file. In this case, press `o` to open the releases page for that repository.

:::

![Patcher Changelogs screenshot](/img/guides/stay-up-to-date/patcher/patcher-no-changelogs.png)


### CIS AWS v1.5 Upgrade

In `v0.1.x`, the only command available is `patcher upgrade cis`. This will upgrade your service catalogs to the latest
module versions in the context of CIS v1.5.

For the CIS AWS Foundations Benchmark v1.5 upgrade, refer to [the upgrade guide](https://docs.gruntwork.io/guides/stay-up-to-date/cis/cis-1.5.0/).


## Debugging

All logs are stored in the folder `~/.patcher/logs`. To also send `debug` logs, run Patcher with the `--loglevel debug` flag.

```
patcher report --loglevel debug
```



<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "f01267c343d80b51c698e7cce348bbeb"
}
##DOCS-SOURCER-END -->

# Patcher

## Installation

To install Patcher, download the appropriate package for your system from the [releases](https://github.com/gruntwork-io/patcher-cli/releases) page.

### For MacOS and Linux users

Patcher runs as a single binary called `patcher`. Make sure it's available within your `PATH`.

1. After downloading Patcher, move it to your desired destination directory. If you're using MacOS, you will have to unzip the package. For other operating systems, the artifact you download is the executable itself.
2. If necessary, rename the binary to `patcher`.
```bash
mv patcher_linux_amd64 patcher
```
3. Move `patcher` to a location available in your `PATH`.
```bash
echo $PATH
mv patcher /usr/local/bin
```

## Before Running Patcher

To fetch information from GitHub, Patcher requires a [GitHub Personal Access Token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token), with the `repo` scope. Set the
`GITHUB_OAUTH_TOKEN` environment variable to your GitHub Personal Access token:

```bash
export GITHUB_OAUTH_TOKEN="<YOUR_GITHUB_PAT>"
```

## Running Patcher

Patcher should be run in a local Terraform or Terragrunt Git repo. It will analyze _all_ modules that belong to the current folder
including its children. Patcher supports `source` values only from GitHub.

If you purchased and deployed our [Reference Architecture](https://gruntwork.io/reference-architecture/) and have your deployment organized in an `infrastructure-live` repository, we recommend running Patcher inside each environment folder, e.g. `infrastructure-live/dev`.

### Patcher Report

In `v0.2.x`, the only available command is `patcher report`. This is a read-only version of Patcher that shows the changelog per module and its usages. After running patcher report you will end up in the 'Modules View', similar to the screenshot below.

![Patcher Report screenshot](/img/guides/stay-up-to-date/patcher/patcher-report.png)

#### Navigation commands

1. While in the modules view, press `u` to see the usages. It shows all places where module is being used:

![Patcher Usages screenshot](/img/guides/stay-up-to-date/patcher/patcher-usages.png)


2. While in the modules view, press `v` to see the changelogs from a module. Press `o` to open the page in the browser.

![Patcher Changelogs screenshot](/img/guides/stay-up-to-date/patcher/patcher-changelogs.png)

:::info
Some modules do not have a CHANGELOGS.md file. In this case, press `o` to open the releases page for that repository.

![Patcher Changelogs screenshot](/img/guides/stay-up-to-date/patcher/patcher-no-changelogs.png)

:::

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
  "hash": "0fc04501fd4958c0b450df011f9ebd81"
}
##DOCS-SOURCER-END -->

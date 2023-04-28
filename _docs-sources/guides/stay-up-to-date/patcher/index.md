# Patcher

## Installation

To install Patcher, download the appropriate package for your system from the [releases](https://github.com/gruntwork-io/patcher-cli/releases) page.

### For MacOS and Linux users

Patcher runs in single binary called `patcher`. Make sure it's available within your `PATH`.

1. After downloading Patcher, unzip the package (only MacOS releases are zipped). Patcher runs in a single binary.
2. If necessary, rename the binary to `patcher`.
```
mv patcher_linux_amd64 patcher
```
3. Move `patcher` to a location available in your `PATH`.
```
echo $PATH
mv patcher /usr/local/bin
```

## Before Running Patcher

To fetch information from GitHub, Patcher requires a GitHub Personal Access Token, with the `repo` scope. Set the
`GITHUB_OAUTH_TOKEN` environment variable to your GitHub Personal Access token:

```bash
export GITHUB_OAUTH_TOKEN="<YOUR_GITHUB_PAT>"
```

## Running Patcher

Patcher should be run in a local Terraform or Terragrunt Git repo. It will analyze _all_ modules that belong to the current folder
including its children. Patcher supports `source` values only from GitHub.

In an `infrastructure-live` repository, we recommend running Patcher inside each environment folder, e.g. `infrastructure-live/dev`.

### Patcher Report

In `0.2.x`, the only available command is `patcher report`. This is a read-only version of Patcher that shows the changelog per module and its usages.

![Patcher Report screenshot](/img/guides/stay-up-to-date/patcher/patcher-report.png)

#### Navigation commands

1. While in the modules view, press `u` to see the usages. It shows all places where module is being used:

![Patcher Usages screenshot](/img/guides/stay-up-to-date/patcher/patcher-usages.png)


2. While in the modules view, press `v` to see the changelogs from a module. Press `o` to open the page in the browser.

![Patcher Changelogs screenshot](/img/guides/stay-up-to-date/patcher/patcher-changelogs.png)

2.1. Some modules do not have a CHANGELOGS.md file.In this case, press `o` to open the releases page for that repository:

![Patcher Changelogs screenshot](/img/guides/stay-up-to-date/patcher/patcher-no-changelogs.png)

### CIS AWS v1.5 Upgrade

In `v0.1.x`, the only command available is `patcher upgrade cis`. This will upgrade your service catalogs to the latest
module versions in the context of CIS v1.5.

For the CIS AWS Foundations Benchmark v1.5 upgrade, refer to [the upgrade guide](https://docs.gruntwork.io/guides/stay-up-to-date/cis/cis-1.5.0/).


## Debugging

By default, all logs are stored in the folder `~/.patcher/logs`. To also send `debug` logs, run Patcher with the `--loglevel debug` flag.

```
patcher report --loglevel debug
```


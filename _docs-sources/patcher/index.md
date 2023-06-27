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
3. Move `patcher` to a location available in your `PATH`. In the example below, we move to `/usr-local/bin`.
```bash
$ echo $PATH
/opt/homebrew/bin:/opt/homebrew/sbin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/go/bin:/Library/Apple/usr/bin:/Users/grunty/bin:/Users/grunty/go/bin
$ mv patcher /usr/local/bin
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

The patcher [report command](/patcher/running-patcher/report) is a read-only version of Patcher that shows the changelog per module and its usages.

### Patcher Update

The patcher [update command](/patcher/running-patcher/update) allows you to update some or all of the module dependencies in the current folder and any child folders.

## Debugging

All logs are stored in the folder `~/.patcher/logs`. To also send `debug` logs, run Patcher with the `--loglevel debug` flag.

```
patcher report --loglevel debug
```
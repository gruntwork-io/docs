# Installing Patcher

## Installation

To install Patcher, download the appropriate package for your system from the [releases](https://github.com/gruntwork-io/patcher-cli/releases) page.  

### For MacOS and Linux users  

Patcher runs as a single binary called `patcher`. Verify that the patcher binary is in your system's `PATH` to allow command-line access from any directory.

1. After downloading Patcher, move it to your desired destination directory.  
2. On macOS, unzip the downloaded package. For other operating systems, the downloaded artifact is the executable itself.  
3. If needed, rename the binary to `patcher`. 
```bash
mv patcher_linux_amd64 patcher
```
4. Move `patcher` to a directory included in your `PATH`. In the example below, we move it to `/usr-local/bin`.
```bash
$ echo $PATH
/opt/homebrew/bin:/opt/homebrew/sbin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/go/bin:/Library/Apple/usr/bin:/Users/grunty/bin:/Users/grunty/go/bin
$ mv patcher /usr/local/bin
```

## Before running Patcher

### GitHub Personal Access Token

To fetch information from GitHub, Patcher requires a [GitHub Personal Access Token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token), with the `repo` scope. Set the
`GITHUB_OAUTH_TOKEN` environment variable to your GitHub Personal Access token:

```bash
export GITHUB_OAUTH_TOKEN="<YOUR_GITHUB_PAT>"
```

### Docker

Starting in version `0.4.1`, the Patcher `update` command applies patches using a Docker sandbox by default and pulls the latest version of the [`gruntwork/patcher_bash_env`](https://hub.docker.com/r/gruntwork/patcher_bash_env) image.

To run the Patcher `update` command locally without Docker or in a CI pipeline, use the `--skip-container-runtime` flag.

## Running Patcher

Run Patcher within a local Git repository that uses OpenTofu/Terraform or Terragrunt to analyze **all** modules in the current folder, including child folders. Patcher supports `source` values only from GitHub.

If you have purchased and deployed the [Reference Architecture](https://gruntwork.io/reference-architecture/) and your deployment is organized in an `infrastructure-live` repository, we recommend running Patcher within each environment folder, such as `infrastructure-live/dev`.


### Patcher report

The `patcher report` command is a read-only operation that displays the changelog for each module and its usages. Learn more in the [report command guide](/2.0/docs/patcher/guides/report).

### Patcher update

The `patcher update` command updates some or all module dependencies in the current folder and any child folders. Learn more in the [update command guide](/2.0/docs/patcher/guides/update).

## Debugging

Patcher logs are stored in the `~/.patcher/logs` directory. To include `debug` logs, run Patcher with the `--loglevel debug` flag.  

```
patcher report --loglevel debug
```

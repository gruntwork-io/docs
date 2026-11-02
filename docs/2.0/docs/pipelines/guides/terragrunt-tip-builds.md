# Testing Terragrunt Tip and Test Builds

Pipelines can run an unreleased build of Terragrunt from your repository's `.mise.toml`. Use this to confirm a fix on Terragrunt's `main` branch works in your pipelines before it ships in a release, or to try a test build a Terragrunt maintainer has shared with you.

Tip builds come from commits on Terragrunt's `main` branch and have the version `tip-<commit sha>`. Test builds come from other branches, built on request by a maintainer, and have the version `test-<commit sha>`. See [Install tip or test builds](https://docs.terragrunt.com/getting-started/install/#install-tip-or-test-builds) in the Terragrunt docs.

:::caution
Tip and test builds may be deleted at any time, and Gruntwork does not test Pipelines against every build.

You are advised to avoid using them in production environments.
:::

## Requirements

Pipelines accepts tip and test builds starting with these workflow versions:

- GitHub: `pipelines-workflows` v4.29.0
- GitLab: `pipelines-workflows` v2.25.0

Earlier versions reject `tip-` and `test-` versions, and preflight fails its Terragrunt version check. See [Updating Pipelines](/2.0/docs/pipelines/guides/updating-pipelines) to upgrade.

## Update `.mise.toml`

Install the build with mise's [HTTP backend](https://mise.jdx.dev/dev-tools/backends/http.html), and lock its checksums so mise checks every download.

From the root of your repository, run the following commands to pin the latest tip build. They look up its commit with the [Terragrunt builds API](https://docs.terragrunt.com/process/releases/#accessing-tip-builds), and use `jq` to read the response:

```bash
BUILD_TYPE="tip"
COMMIT_SHA="$(curl -sSfL --proto '=https' --tlsv1.2 https://builds.terragrunt.com/api/v1/tip/latest | jq -r .commit)"
BASE_URL="https://builds.terragrunt.com/${BUILD_TYPE}/${COMMIT_SHA}"

mise unuse terragrunt
mise use "http:terragrunt[url=${BASE_URL}/terragrunt_{{os(macos=\"darwin\")}}_{{arch(x64=\"amd64\")}}.tar.gz,checksum_url=${BASE_URL}/SHA256SUMS,rename_exe=terragrunt]@${BUILD_TYPE}-${COMMIT_SHA}"
mise lock --platform linux-x64,linux-arm64,macos-x64,macos-arm64
```

To pin a test build or a specific tip build, set `BUILD_TYPE` to `test` or `tip` and `COMMIT_SHA` to the build's full 40-character commit SHA. A maintainer gives you the SHA of a test build.

- `mise unuse terragrunt` removes the release from `.mise.toml`.
- `mise use` adds the build to `.mise.toml` and installs it.
- `mise lock` records the checksum of each platform's archive in `mise.lock`, and mise fails the install if a download doesn't match.

Check the build:

```bash
terragrunt --version
```

The output should be `terragrunt version tip-<commit sha>` or `terragrunt version test-<commit sha>`.

### Windows

The commands above lock the build for Linux and macOS. To also install it on Windows, run these in the same shell:

```bash
mise config set 'tools.http:terragrunt.platforms.windows-x64.url' "${BASE_URL}/terragrunt_windows_amd64.exe.tar.gz"
mise lock --platform windows-x64
```

## Run Pipelines

Commit `.mise.toml` and `mise.lock` on a branch and open a pull request.

To go back to a release, remove the build and add the release again:

```bash
mise unuse http:terragrunt
mise use terragrunt@1.2.0
```

If your repository had no `mise.lock` before, delete it.

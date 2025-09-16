# Self-hosting Patcher

When you run Patcher to automate [ongoing updates](./ongoing-updates.md), Patcher runs in your own action GitHub Actions runners, giving you full control over where and how they run. In that sense, Patcher only works in self-hosted mode!

However, to set up Patcher to run in your GitHub Runners, our standard workflows involve calling a GitHub Action published by Gruntwork at GitHub.com, downloading Gruntwork binaries (including Patcher) from our GitHub org, and downloading third-party tools from public GitHub repos. To fully self-host Patcher, you will need to self-host each of these items.

## How Patcher works by default

Before we review the options for self-hosting Patcher, let's discuss in more detail how Patcher works in a standard setup.

First, you can run Patcher either as an interactive CLI tool (to interactively upgrade a legacy codebase), or as part of a CI job (e.g. with GitHub Actions) to automatically update infrastructure code on a scheduled basis or when certain events happen.

When you run Patcher as an interactive CLI tool,  you are already running everything locally, so no change is needed.

When you run Patcher as part of a CI job, you create your own custom GitHub Actions workflow based on our [examples](./ongoing-updates.md). Our example workflow typically calls our [published GitHub Action](https://github.com/gruntwork-io/patcher-action), which in turn downloads the Patcher binary and Terrapatch binary from Gruntwork's github org. These binaries are not publicly available so you must use a GitHub.com token to access these binaries. In addition, the GitHub Action downloads a small number of tools using pinned releases on public GitHub repos.

Therefore, if you wish to fully self-host Patcher, you will need to:

1. Call a GitHub Action hosted by you
1. Download Patcher and Terrapatch binaries from mirrored repos in your GitHub org
1. Download third-party tooling from mirrored repos in your GitHub org (or permit public downloads from GitHub.com)

In the rest of this document, we'll explore the different ways you might accomplish this.

## Self-hosting options

### Repo-copier + GitHub Actions (Recommended)

The primary recommended approach for self-hosting Patcher binaries is to use Gruntwork's [repo-copier](https://github.com/gruntwork-io/repo-copier) tool in combination with GitHub Actions or GitHub Enterprise.

Repo-copier automatically copies all content from Gruntwork's private repositories—including releases and binary assets—to your internal version control system. This ensures that Patcher binaries are available in your environment while maintaining automatic updates.

#### Required repositories for Patcher self-hosting

You need to configure repo-copier to copy the following Patcher-related repositories:

- [`gruntwork-io/patcher-cli`](https://github.com/gruntwork-io/patcher-cli) - The main Patcher binary
- [`gruntwork-io/patcher-action`](https://github.com/gruntwork-io/patcher-action) - GitHub Action for running Patcher
- [`gruntwork-io/terrapatch-cli`](https://github.com/gruntwork-io/terrapatch-cli) - Terrapatch binary for Terraform patching

#### GitHub Actions permissions configuration

After copying these repositories to your internal GitHub organization or GitHub Enterprise instance, you must configure GitHub Actions permissions for each repository to allow other repositories to access them.

For each of the three repositories above, navigate to the repository's Actions settings:
- Go to `https://your-github-instance.com/your-org/REPO_NAME/settings/actions`
- Scroll down to the "Access" section
- Select one of the following options (do **not** select "Not accessible"):
  - **"Accessible from repositories in the 'your-org' organization"** - Allows access from repositories within your organization
  - **"Accessible from repositories in the 'Your-Enterprise' enterprise"** - Allows access from repositories across your entire GitHub Enterprise

This configuration ensures that your other repositories can use the self-hosted Patcher actions and download the necessary binaries during CI/CD workflows.

For detailed repo-copier setup instructions, see the [IaC Library self-hosting guide](/2.0/docs/library/guides/self-hosting).

**Supported with repo-copier:**
- Your own GitHub.com organization
- GitHub Enterprise Server
- GitLab.com
- BitBucket Server

### Forking repositories (Alternative)

You can manually fork the [patcher-cli](https://github.com/gruntwork-io/patcher-cli) and [terrapatch-cli](https://github.com/gruntwork-io/terrapatch-cli) repositories to your internal GitHub organization or GitHub Enterprise instance.

However, manual forking has limitations:
- Updates from Gruntwork do not propagate automatically
- You must manually sync releases and binary assets
- Cross-references may need manual updates

### Alternative approaches

For organizations with specific requirements, you can:

1. **Download and host binaries manually**: Download releases from Gruntwork repositories and host them in your internal artifact storage
2. **Build from source**: Clone the repositories and build binaries using your internal build systems
3. **Mirror releases**: Set up automated mirroring of GitHub releases to your internal systems

:::caution

These alternative approaches require significant manual maintenance and may not receive automatic security updates.

:::

## GitHub Actions parameters for self-hosted binaries

### Current limitations

The current patcher-action implementation hardcodes the GitHub organization and repository names for binary downloads. The action downloads binaries from:

- `gruntwork-io/patcher-cli`
- `gruntwork-io/terrapatch-cli`
- `minamijoyo/tfupdate`
- `minamijoyo/hcledit`

### Custom SCM parameters

Currently, the patcher-action does not support custom SCM parameters for specifying alternative binary sources. The action would require modifications to support:

- Custom GitHub organizations
- Alternative GitHub Enterprise instances
- Custom binary repository URLs

### Authentication requirements

When using GitHub Enterprise or custom GitHub organizations, ensure your GitHub Actions have appropriate authentication:

```yaml
- name: Run Patcher
  uses: gruntwork-io/patcher-action@v2
  with:
    github_token: ${{ secrets.GITHUB_TOKEN }}
    read_token: ${{ secrets.CUSTOM_GITHUB_TOKEN }}  # For accessing your internal repos
    update_token: ${{ secrets.CUSTOM_GITHUB_TOKEN }}
```

## Code examples

### GitHub Enterprise configuration

If you're using repo-copier with GitHub Enterprise, your workflow might look like this:

```yaml
name: Patcher Update
on:
  schedule:
    - cron: '0 9 * * MON'  # Run weekly on Mondays
  workflow_dispatch:

jobs:
  patcher-update:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          token: ${{ secrets.GITHUB_ENTERPRISE_TOKEN }}

      - name: Run Patcher Update
        uses: gruntwork-io/patcher-action@v2
        with:
          patcher_command: update
          github_token: ${{ secrets.GITHUB_ENTERPRISE_TOKEN }}
          read_token: ${{ secrets.GITHUB_ENTERPRISE_TOKEN }}
          update_token: ${{ secrets.GITHUB_ENTERPRISE_TOKEN }}
          pull_request_branch: patcher-updates-${{ github.run_number }}
          pull_request_title: "[Patcher] Update dependencies"
          working_dir: "infrastructure-live/dev"
```

### GitLab CI support

Patcher supports GitLab CI environments, but this integration is newer and may require additional configuration.

:::info

For GitLab CI setup and configuration, please contact our support team at [support@gruntwork.io](mailto:support@gruntwork.io) for the latest guidance and best practices.

:::

## Unsupported methods and limitations

### Artifactory status

Artifactory and similar artifact management tools are **not currently supported** for hosting Patcher binaries. These tools lack the metadata and release management features that Patcher relies on, such as:

- GitHub release tags and versioning
- Release assets and checksums
- API compatibility for automated downloads

### Version management considerations

When self-hosting Patcher binaries:

- **Pin specific versions**: Use the `patcher_version` parameter to ensure consistent behavior across environments
- **Test updates**: Validate new Patcher versions in development environments before promoting to production
- **Monitor compatibility**: Ensure your self-hosted binaries remain compatible with your Terraform and Terragrunt versions

```yaml
- name: Run Patcher with pinned version
  uses: gruntwork-io/patcher-action@v2
  with:
    patcher_version: "v0.15.1"  # Pin to specific version
    # ... other parameters
```

### Current action limitations

The patcher-action currently requires modifications to support fully custom binary sources. If you need this functionality, please contact [support@gruntwork.io](mailto:support@gruntwork.io) to discuss your requirements and potential solutions.

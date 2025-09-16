# Self-hosting Patcher

When you run Patcher to automate [ongoing updates](/2.0/docs/patcher/guides/ongoing-updates), Patcher runs in your own action GitHub Actions runners, giving you full control over where and how they run. In that sense, Patcher works _only_ in self-hosted mode!

However, to set up Patcher to run in your GitHub Actions Runners, our standard workflows involve calling a GitHub Action published by Gruntwork at GitHub.com, downloading Gruntwork binaries (including Patcher) from our GitHub org, and downloading third-party tools from public GitHub repos. To fully self-host Patcher, you will need to self-host each of these items.

## How Patcher works by default

Before we review the options for self-hosting Patcher, let's discuss in more detail how Patcher works in a standard setup.

First, you can run Patcher either as an interactive CLI tool (to interactively upgrade a legacy codebase), or as part of a CI job (e.g. with GitHub Actions) to automatically update infrastructure code on a scheduled basis or when certain events happen.

When you run Patcher as an interactive CLI tool,  you are already running everything locally, so no change is needed.

When you run Patcher as part of a CI job, you create your own custom GitHub Actions workflow based on our [examples](/2.0/docs/patcher/guides/ongoing-updates). Our example workflow typically calls our [published GitHub Action](https://github.com/gruntwork-io/patcher-action), which in turn downloads the Patcher binary and Terrapatch binary from Gruntwork's github org. These binaries are only available to Gruntwork customers so you must use a GitHub.com token to access these binaries. In addition, the GitHub Action downloads a small number of tools using pinned releases on public GitHub repos.

Therefore, if you wish to fully self-host Patcher, as of September 2025, you will need to:

1. Call a GitHub Action hosted by you
1. Download [`patcher`](https://github.com/gruntwork-io/patcher-cli) and [`terrapatch`](https://github.com/gruntwork-io/terrapatch-cli) binaries from mirrored repos in your GitHub org
1. Download third-party tooling ([`minamijoyo/tfupdate`](https://github.com/minamijoyo/tfupdate) and [`minamijoyo/hcledit`](https://github.com/minamijoyo/hcledit)) from mirrored repos in your GitHub org (or permit public downloads from GitHub.com)

In the rest of this document, we'll explore the different ways you might accomplish this.

## Self-hosting options

### Repo-copier + GitHub Actions (Recommended)

We recommend using Gruntwork's [repo-copier](https://github.com/gruntwork-io/repo-copier) tool with GitHub Actions or GitHub Enterprise to self-host Patcher binaries.

Repo-copier automatically copies all content from Gruntwork's private repositories—including releases and binary assets—to your internal version control system. This keeps Patcher binaries and our published GitHub Action available in your environment while maintaining automatic updates.

See [ongoing updates](/2.0/docs/patcher/guides/ongoing-updates) for detailed instructions on how to configure GitHub Enterprise self-hosted.

### Forking repositories (Alternative)

You can manually fork the [`patcher-action`](https://github.com/gruntwork-io/patcher-action), [`patcher-cli`](https://github.com/gruntwork-io/patcher-cli) and [`terrapatch-cli`](https://github.com/gruntwork-io/terrapatch-cli) repositories to your internal GitHub organization or GitHub Enterprise instance.

However, manual forking has key limitations:
- Updates from Gruntwork do not propagate automatically.
- You must manually sync releases and binary assets.
- Cross-references (where one repo references another and assumes it's at github.com/gruntwork-io) may need manual updates.

### Artifact management tools (Advanced)

For organizations with strict security requirements, you can configure artifact management tools like JFrog Artifactory or Nexus Repository Manager to proxy and cache Patcher binaries.

This approach requires:
- Setting up artifact repositories to mirror Gruntwork's GitHub releases
- Configuring authentication for private binary access
- Maintaining compatibility with GitHub's release API for automated downloads
- Managing release tags, versioning, and checksums manually

This method provides the highest level of control but requires significant operational overhead to maintain. Gruntwork does not currently support this out of the box, however we do provide you with all the "raw materials" to enable this.
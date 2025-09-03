# Ongoing Updates

## Overview

As we mentioned in the [Patcher overview](../concepts/index.md), Patcher supports two primary modes of working:

1. **Legacy upgrade.** You wish to take a repo or set of files that are significantly out of date and bring them up to date with the latest OpenTofu/Terraform module versions.
2. **Ongoing updates.** You wish to streamline the process of keeping a repo or set of files up to date over time.

In this guide, we'll use Patcher to help you with the second mode. The basic idea is that we'll set up a GitHub Action that scans your entire repository for outdated dependencies and automatically creates pull requests to keep everything up to date.

This approach is ideal for teams that want to:
- Maintain current dependencies across their entire codebase
- Receive regular automated updates without manual intervention
- Keep security vulnerabilities and technical debt to a minimum

## Which CI systems are supported?

Patcher CLI is a binary and is therefore agnostic to the underlying CI system, however the GitHub Action we describe here currently only works for GitHub.com or GitHub Enterprise.

:::info
We'll be adding equivalent support for GitLab soon. In the meantime, for non-GitHub users, feel free to adapt the code at https://github.com/gruntwork-io/patcher-action to suit your needs.
:::

## Implementation

We're about to create a GitHub Actions workflow that consists of two main jobs:

1. **`patcher-report`**: Scans your entire repository for outdated dependencies
2. **`patcher-update`**: Creates individual pull requests for each dependency that needs updating

:::info
Individual pull requests can quickly get overwhelming. Once you've got this working, check out our page on [grouping](../concepts/grouping.md) to see how to consolidate many updates into a single pull request.
:::

### Step-by-step setup for GitHub.com users

#### 1. Create a GitHub token
- Create a token that can read patcher-cli and terrapatch-cli releases in your org (see [GitHub Personal Access Token Setup](#github-personal-access-token-setup) below).
- Save it as a GitHub Actions secret named `PATCHER_CI_TOKEN`.

:::warn
Most of the time when users have challenges getting Patcher to work, it's because their GitHub token is not set up correctly. Be sure to follow these steps carefully, but if you'd like to validate that your GitHub token is configured correctly, consider copying and pasting our [Validate GitHub Access Token](https://github.com/gruntwork-io/patcher-action/blob/main/.github/workflows/validate-github-access.yml) workflow.
:::

#### 2. Add the GitHub Actions workflow file
- In the repo in which you want Patcher to run, create a new file `.github/workflows/patcher-updates.yml`.
- Populate it using one of the [GitHub Actions Workflow Examples](#github-actions-workflow-examples) below.

#### 3. Choose when to run Patcher
- There are three non-mutually exclusive options for when Patcher will run:
  1. Schedule (recommended): Run Patcher on a weekly basis (or other cadence that fits your workflow).
  2. Manual: Use `workflow_dispatch` for ad-hoc runs. TODO: Clarify what this means and why it's useful.
  3. New module release: Use the `repository_dispatch` trigger to run when a new module release is published.

  TODO: Give examples of how to configure this, or generally more detail so users know what to do here. If the example below already has a schedule, just reference that.

:::info
Almost all customers opt for the scheduled approach, with a periodic manual run.
:::

#### 4. Run and review!
- Manually run the GitHub Actions workflow the first time to validate configuration.
- Review the generated PRs and merge as desired.

TODO: Give users more guidance on how to manually run the GitHub Actions workflow.

### Step-by-step setup for GitHub Enterprise users

Many GitHub Enterprise users self-host GitHub Enterprise and wish to host all binaries internally. If you'd like to fully self-host Patcher, then you'll eventually follow the same steps as above in [Step-by-step setup for GitHub.com users](#step-by-step-setup-for-githubcom-users), however first we need to copy over some assets from Gruntwork to your environment.

#### 1. Self-host the relevant Gruntwork repos

The first step is to [self-host the IaC Library](../../library/guides/self-hosting.md). Even if you don't use the Gruntwork IaC Library for its modules, we can use the [repo-copier](https://github.com/gruntwork-io/repo-copier) tool in the linked page to copy private repos to any VCS system of your choice.

To run Patcher locally, you'll need to configure repo-copier to mirror each of the following repos:

1. https://github.com/gruntwork-io/patcher-cli
2. https://github.com/gruntwork-io/terragrunt-cli
3. https://github.com/gruntwork-io/patcher-action

#### 2. Follow the steps above

Follow the steps above in [Step-by-step setup for GitHub.com users](#step-by-step-setup-for-githubcom-users), but don't start testing things (step 4 above), until we've made the modifications below.

#### 3. Specify your GitHub Enterprise settings

Update the GitHub Action workflow as described in [For GitHub Enterprise Users](#for-github-enterprise-users) to work with your specific GitHub Enterprise setup. This will:

- Specify your GitHub Enterprise settings
- Use your local copy of our Patcher GitHub Action (versus our version hosted at GitHub.com); remember that thanks to repo-copier, they should be exactly the same, except that yours is hosted internally.

#### 4. Make sure your runners will work with the `patcher-action`.

Our published `patcher-action` specifies the GitHub Actions workflow will `runs-on: ubuntu-latest`. In the GitHub Enterprise environment, this exact runner tag *might* be available for you, but if it's not, you'll either need to:

1. Change the GitHub Actions workflow `runs-on:` value to a runner you have internaly, or
2. Tag your existing runners with `ubuntu-latest` so it gets picked up by the new GitHub Action.

## GitHub Actions Workflow Examples

We've included example GitHub Actions workflow files both for GitHub.com users and GitHub Enterprise users (both hosted and self-hosted).

### For GitHub.com users

Create a new file `.github/workflows/patcher-updates.yml` in your repository:

```yml
name: Patcher Updates

on:
  workflow_dispatch:
  repository_dispatch:
    types: [new_module_release]
  schedule:
    # Run every Monday at 04:15 UTC
    - cron: "15 4 * * 1"

permissions:
  contents: write
  pull-requests: write

jobs:
  patcher-report:
    runs-on: ubuntu-latest
    outputs:
      dependencies: ${{ steps.get-deps.outputs.dependencies }}
    steps:
      - uses: actions/checkout@v4
      - id: get-deps
        uses: gruntwork-io/patcher-action@v2
        with:
          patcher_command: report
          read_token: ${{ secrets.PATCHER_CI_TOKEN }}
          working_dir: ./

  patcher-update:
    needs: [patcher-report]
    runs-on: ubuntu-latest
    strategy:
      fail-fast: false
      matrix:
        dependency: ${{ fromJson(needs.patcher-report.outputs.dependencies) }}
    steps:
      - uses: actions/checkout@v4
        with:
          # Make sure Patcher has enough Git history to correctly determine changes
          fetch-depth: 0
      
      - uses: gruntwork-io/patcher-action@v2
        with:
          patcher_command: update
          update_token: ${{ secrets.PATCHER_CI_TOKEN }}
          working_dir: ./
          dependency: ${{ matrix.dependency }}
          pull_request_title: "[Patcher] Update ${{ matrix.dependency }}"
          pull_request_branch: "patcher-updates-${{ matrix.dependency }}"
```

### For GitHub Enterprise Users

Use the same GitHub Action above, but replace each of the `uses: gruntwork-io/patcher-action@v2` as follows:

TODO: Double-check this; is this the right way to do this?

```yml
# TODO: Make it clear where this gets swapped in
# TODO: Make it clear the user should specify their own copy of gruntwork-io/patcher-action, not ours.
- uses: gruntwork-io/patcher-action@v2
  with:
    patcher_command: report
    read_token: ${{ secrets.PATCHER_CI_TOKEN }}
    github_base_url: "https://github.company.com"
    github_org: "my-custom-org"
    patcher_git_repo: "patcher-cli"
    terrapatch_git_repo: "terrapatch-cli"
    working_dir: ./

...

  # TODO: udpate these values to be correct for GitHUb Enterprise
 - uses: gruntwork-io/patcher-action@v2
        with:
          patcher_command: update
          update_token: ${{ secrets.PATCHER_CI_TOKEN }}
          working_dir: ./
          dependency: ${{ matrix.dependency }}
          pull_request_title: "[Patcher] Update ${{ matrix.dependency }}"
          pull_request_branch: "patcher-updates-${{ matrix.dependency }}"

```

## GitHub Personal Access Token Setup

You'll need to manually create a GitHub token that has permission to access the Patcher CLI and Terrapatch CLI tools.

You could create either a [fine-grained or classic token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#types-of-personal-access-tokens), and we recommend creating a fine-grained token as follows:

#### 1. Navigate to GitHub Settings
   - Click your profile picture → **Settings** → **Developer settings** → **Personal access tokens** → **Fine-grained tokens**

#### 2. Create New Token
   - Click **Generate new token**
   - Select **Fine-grained personal access token**

#### 3. Configure Token Settings
   - **Token name**: Choose a descriptive name (e.g., `PATCHER_CI_TOKEN`)
   - **Expiration**: Set to **90 days** or longer based on your security policy
   - **Resource owner**: Select the GitHub organization that holds the patcher-cli and terrapatch-cli tools.
     - If you are accessing these via GitHub.com, the organization is `gruntwork-io`.
     - If you are accessing these via self-hosted GitHub Enterprise, the organization is whatever GitHub organization has the `patcher-cli` and `terrapatch-cli` repos.

     :::warning
     It's easy to not select the right organization! Be sure to select the right GitHub org -- not your username -- that actually holds the repos you're looking to access.
     :::

#### 4. Configure Repository Access
   Configure access to the following repositories:
   - The **patcher-cli repository** (typically `gruntwork-io/patcher-cli` or your custom org)
   - The **terrapatch-cli repository** (typically `gruntwork-io/terrapatch-cli` or your custom org)

#### 5. Set Required Permissions
   Under "Permissions", configure these **Repository permissions**:
   - **Contents**: **Read** access
   - **Metadata**: **Read** access  
   - **Actions**: **Read** access (for downloading releases)

   :::info
   The GitHub Action will also need the permission to open pull requests, however it will get that from the `GITHUB_TOKEN` that is automatically generated for each GitHub Actions workflow run. Therefore this token can be read-only.
   :::

#### 6. Generate and Store Token
   - Click **Generate token**
   - **Copy the token immediately** (you won't be able to see it again)
   - Store it securely as a GitHub secret named `PATCHER_CI_TOKEN` in your repository
     TODO: Give more guidance on where to store this.

    :::warning
    Keep your token secure and never commit it to your repository. Always store it as a GitHub secret.
    :::

Your `PATCHER_CI_TOKEN` token is now ready for use!

## Key Configuration Options

For more information on the configuration options in our standard GitHub Action, see the README at https://github.com/gruntwork-io/patcher-action.

### Customization Options

### Filtering Dependencies
If you want to exclude certain directories or files, you can add filtering:

```yml
- uses: gruntwork-io/patcher-action@v3
  with:
    patcher_command: report
    read_token: ${{ secrets.PATCHER_CI_TOKEN }}
    exclude_dirs: "examples/**,tests/**"
    working_dir: ./
```

### Update Strategies
Control how aggressively Patcher updates dependencies:

```yml
- uses: gruntwork-io/patcher-action@v3
  with:
    patcher_command: update
    update_token: ${{ secrets.PATCHER_CI_TOKEN }}
    update_strategy: next-safe  # or "next-breaking"
    # ... other parameters
```

### Dry Run Mode
Test your workflow without creating actual pull requests:

```yml
- uses: gruntwork-io/patcher-action@v3
  with:
    patcher_command: update
    update_token: ${{ secrets.PATCHER_CI_TOKEN }}
    dry_run: true
    # ... other parameters
```

## Environment-Specific Updates

If you need to promote updates across multiple environments (dev → stage → prod) rather than updating everything at once, see the [Setting up Promotion Workflows](/2.0/docs/patcher/guides/promotion-workflows) guide. That approach provides:

- Environment-specific scanning and updates
- Controlled promotion between environments
- Validation gates between each environment
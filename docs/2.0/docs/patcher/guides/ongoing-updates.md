# Ongoing Updates

## Overview

Patcher supports two primary modes of working:

1. **Legacy upgrade.** You wish to take a repo or set of files that are significantly out of date and bring them up to date with the latest OpenTofu/Terraform module versions.
2. **Ongoing updates.** You wish to streamline the process of keeping a repo or set of files up to date over time.

In this guide, we'll use Patcher to help you with the second mode by setting up a GitHub Actions workflow that scans your entire repository for outdated dependencies and automatically creates pull requests to keep everything up to date.

This approach is ideal for teams that want to:
- Maintain current dependencies across their entire codebase
- Receive regular automated updates without manual intervention
- Keep security vulnerabilities and technical debt to a minimum

## Prerequisites

### Infrastructure as Code 
Your infrastructure should be defined as code using some combination of OpenTofu, Terragrunt, and/or Terraform. 

### GitHub Repository Setup
- Your infrastructure code should be in a GitHub repository
- Your default `GITHUB_TOKEN` that is automatically created with each GitHub Actions run must have permission to create pull requests on the repo where you'll be running Patcher.
- You'll need to manually create a token (we recommend calling it `PIPELINES_READ_TOKEN`) that has permission to access the Patcher CLI and Terrapatch CLI tools.

:::info
Patcher CLI is a binary and is agnostic to the underlying CI system, however the GitHub Action we describe here currently only works for GitHub.com or GitHub Enterprise. We'll be adding equivalent support for GitLab soon.
:::

## Implementation

The GitHub Actions workflow consists of two main jobs:

1. **`patcher-report`**: Scans your entire repository for outdated dependencies
2. **`update-dependencies`**: Creates individual pull requests for each dependency that needs updating

### Basic Workflow Setup

Create a new file `.github/workflows/patcher-continuous-updates.yml` in your repository:

```yml
name: Patcher Continuous Updates

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
      spec: ${{ steps.get-spec.outputs.spec }}
    steps:
      - uses: actions/checkout@v4
      - uses: gruntwork-io/patcher-action@v2
        id: get-spec
        with:
          patcher_command: report
          github_token: ${{ secrets.PIPELINES_READ_TOKEN }}
          working_dir: ./
          spec_file: /tmp/patcher-spec.json

  update-dependencies:
    needs: [patcher-report]
    runs-on: ubuntu-latest
    strategy:
      fail-fast: false
      matrix:
        dependency: ${{ fromJson(needs.patcher-report.outputs.spec).Dependencies }}
    steps:
      - uses: actions/checkout@v4
        with:
          # Make sure Patcher has enough Git history to correctly determine changes
          fetch-depth: 0

      - name: Create the spec file
        shell: bash
        run: |
          echo '${{ needs.patcher-report.outputs.spec }}' > /tmp/patcher-spec.json

      - uses: gruntwork-io/patcher-action@v2
        with:
          patcher_command: update
          github_token: ${{ secrets.PIPELINES_READ_TOKEN }}
          working_dir: ./
          dependency: ${{ matrix.dependency.ID }}
          spec_file: /tmp/patcher-spec.json
          pull_request_title: "[Patcher] Update ${{ matrix.dependency.ID }}"
          pull_request_branch: "patcher-updates-${{ matrix.dependency.ID }}"
```

### Custom Organization Setup (v3 Only)

For GitHub Enterprise or custom organizations:

```yml
- uses: gruntwork-io/patcher-action@v3
  with:
    patcher_command: report
    auth_token: ${{ secrets.PIPELINES_READ_TOKEN }}
    github_base_url: "https://github.company.com"
    github_org: "my-custom-org"
    patcher_git_repo: "patcher-cli"
    terrapatch_git_repo: "terrapatch-cli"
    terrapatch_github_org: "my-custom-org"  # Optional: defaults to github_org
    working_dir: ./
    spec_file: /tmp/patcher-spec.json
```

## Key Configuration Options

### Scheduling
The workflow is configured to run:
- **Manually**: Using `workflow_dispatch` for testing
- **On new releases**: Via `repository_dispatch` when Gruntwork releases new modules
- **Scheduled**: Every Monday at 04:15 UTC (customize as needed)

### Authentication
- `PIPELINES_READ_TOKEN`: Required for Gruntwork customers to access Patcher and download dependencies
- The token needs `contents: write` and `pull-requests: write` permissions

### Working Directory
- `working_dir: ./` scans the entire repository
- You can specify a subdirectory if your infrastructure code is in a specific folder

### Pull Request Strategy
- Creates one pull request per dependency
- Uses descriptive branch names: `patcher-updates-{dependency-id}`
- Includes clear titles indicating which dependency is being updated

## Customization Options

### Filtering Dependencies
If you want to exclude certain directories or files, you can add filtering:

```yml
- uses: gruntwork-io/patcher-action@v3
  with:
    patcher_command: report
    auth_token: ${{ secrets.PIPELINES_READ_TOKEN }}
    exclude_dirs: "examples/**,tests/**"
    working_dir: ./
    spec_file: /tmp/patcher-spec.json
```

### Update Strategies
Control how aggressively Patcher updates dependencies:

```yml
- uses: gruntwork-io/patcher-action@v3
  with:
    patcher_command: update
    update_strategy: next-safe  # or "next-breaking"
    # ... other parameters
```

### Dry Run Mode
Test your workflow without creating actual pull requests:

```yml
- uses: gruntwork-io/patcher-action@v3
  with:
    patcher_command: update
    dry_run: true
    # ... other parameters
```

## Environment-Specific Updates

If you need to promote updates across multiple environments (dev → stage → prod) rather than updating everything at once, see the [Setting up Promotion Workflows](/2.0/docs/patcher/guides/promotion-workflows) guide. That approach provides:

- Environment-specific scanning and updates
- Controlled promotion between environments
- Validation gates between each environment

## Next Steps

1. **Set up the workflow**: Add the YAML file to your repository
2. **Configure secrets**: Add your `PIPELINES_READ_TOKEN` to GitHub secrets
3. **Test manually**: Use the "Run workflow" button to test the setup
4. **Review pull requests**: Patcher will create PRs for each outdated dependency
5. **Merge updates**: Review and merge the pull requests to apply updates

The workflow will automatically run on your configured schedule, keeping your infrastructure dependencies current with minimal manual intervention.



### GitHub Fine-Grained Personal Access Token Setup

For GitHub Enterprise users, you'll need to create a fine-grained personal access token with specific permissions. Follow these steps:

1. **Navigate to GitHub Settings**
   - Go to your GitHub Enterprise instance
   - Click your profile picture → **Settings** → **Developer settings** → **Personal access tokens** → **Fine-grained tokens**

2. **Create New Token**
   - Click **Generate new token**
   - Select **Fine-grained personal access token**

3. **Configure Token Settings**
   - **Token name**: Choose a descriptive name (e.g., "Patcher CI Token")
   - **Expiration**: Set to **90 days** or longer based on your security policy
   - **Resource owner**: Select your organization
     :::warning
     It's easy to not select the right organization! Be sure to select the GitHub org -- not your username -- that actually holds the repos you're looking to access.
     :::

4. **Repository Access**
   Configure access to the following repositories:
   - **Your organization's patcher-cli repository** (typically `gruntwork-io/patcher-cli` or your custom org)
   - **Your organization's terrapatch-cli repository** (typically `gruntwork-io/terrapatch-cli` or your custom org)

5. **Set Required Permissions**
   Under "Permissions", configure these **Repository permissions**:
   - **Contents**: **Read** access
   - **Metadata**: **Read** access  
   - **Actions**: **Read** access (for downloading releases)

6. **Generate and Store Token**
   - Click **Generate token**
   - **Copy the token immediately** (you won't be able to see it again)
   - Store it securely as a GitHub secret named `PIPELINES_READ_TOKEN` in your repository

:::warning
Keep your token secure and never commit it to your repository. Always store it as a GitHub secret.
:::
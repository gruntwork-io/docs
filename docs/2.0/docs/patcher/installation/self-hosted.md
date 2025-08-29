# Self-hosted Patcher Binaries

## Introduction to self-hosted binaries

If your organization has strict network restrictions or security policies, you may need to host all dependencies internally rather than downloading them directly from external sources like github.com/gruntwork-io. The Patcher GitHub Action supports self-hosted binaries to accommodate these requirements.

When you use self-hosted binaries, only the Patcher and Terrapatch CLI binaries need to be hosted internally—the runtime environment and GitHub Action itself can still run in your standard CI/CD infrastructure. This approach provides a balance between security compliance and operational simplicity.

Patcher is a binary that scans your code and updates your files. Terrapatch is a binary that does code transformations. Patcher runs scripts that run Terrapatch. All Patcher customers have access to the github.com/gruntwork-io/patcher-cli repository, and if you use repo-copier, this repository will be available in your own private GitHub or GitLab repository.

You might want to self-host the Patcher binary because:
- Your corporate firewall blocks access to external GitHub repositories
- Your security policies require all software to be vetted and hosted internally
- You work in air-gapped environments with no external internet access
- You have compliance requirements for dependency provenance and control

## Self-hosting options

You have two main options for self-hosting Patcher binaries:

### Option 1: Repo-copier + GitHub Actions (recommended)

This approach involves two steps:

1. **Copy binaries to internal repositories**: Use Gruntwork's `repo-copier` tool to copy the Patcher and Terrapatch CLI binaries from the public Gruntwork repositories to your internal version control system.

2. **Configure the GitHub Action**: Update your workflow configuration to use the new parameters that point to your internal repositories instead of the default gruntwork-io locations.

This approach ensures that your CI/CD pipelines can access the required tools while maintaining compliance with your organization's security and network policies.

### Option 2: Fork

You can manually fork the Patcher repositories, but this approach has significant limitations that we'll discuss later in this document.

## Using repo-copier to copy binaries

Gruntwork's `repo-copier` tool enables you to create complete, self-hosted copies of Gruntwork repositories in your internal version control system. For Patcher, you'll need to copy two repositories:

- `gruntwork-io/patcher-cli` - The main Patcher CLI tool
- `gruntwork-io/terrapatch-cli` - The Terrapatch CLI tool used for Terraform patching operations

### Prerequisites

- Access to Gruntwork's private repositories (requires Enterprise subscription)
- `repo-copier` tool installed and configured
- Target repositories created in your internal version control system

### Repo-copier usage

```bash
# Copy patcher-cli repository
repo-copier \
  --source-url https://github.com/gruntwork-io/patcher-cli \
  --dest-url https://github.company.com/my-org/patcher-cli \
  --dest-branch main

# Copy terrapatch-cli repository  
repo-copier \
  --source-url https://github.com/gruntwork-io/terrapatch-cli \
  --dest-url https://github.company.com/my-org/terrapatch-cli \
  --dest-branch main
```

For detailed `repo-copier` configuration options, authentication setup, and advanced usage patterns, refer to the [Library self-hosting documentation](/2.0/docs/library/guides/self-hosting) and the [repo-copier GitHub repository](https://github.com/gruntwork-io/repo-copier).

## Configuring the GitHub Action

Once your internal repositories are set up, you can configure the Patcher GitHub Action to use your self-hosted binaries by specifying the new source location parameters.

### GitHub Actions parameters

You can use the following parameters to specify custom source locations for downloading Patcher binaries:

| Parameter | Description | Default |
|-----------|-------------|---------|
| `scm_type` | Type of SCM provider (`github` or `gitlab`) | `github` |
| `scm_base_url` | Base URL for your SCM provider | `https://github.com` |
| `scm_org` | Organization/group name in your SCM provider | `gruntwork-io` |
| `patcher_git_repo` | Repository name for patcher CLI | `patcher-cli` |
| `terrapatch_git_repo` | Repository name for terrapatch CLI | `terrapatch-cli` |
| `terrapatch_scm_org` | Separate organization for terrapatch (optional) | Same as `scm_org` |

### Authentication considerations

- Use `auth_token` instead of the legacy `github_token` parameter
- For GitHub Enterprise, use a Personal Access Token with appropriate repository access
- Ensure your token has access to both patcher and terrapatch repositories

## Example configurations

### GitHub Enterprise example

```yaml
name: Patcher Update
on:
  workflow_dispatch:
  schedule:
    - cron: '0 9 * * MON'

jobs:
  patcher-update:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Run Patcher
        uses: gruntwork-io/patcher-action@v2
        with:
          auth_token: ${{ secrets.GITHUB_TOKEN }}
          scm_type: "github"
          scm_base_url: "https://github.company.com"
          scm_org: "my-org"
          patcher_git_repo: "patcher-cli"
          terrapatch_git_repo: "terrapatch-cli"
          patcher_command: "update"
          working_dir: "infrastructure-live/dev"
          pr_target_branch: "patcher-updates"
          pr_title: "[Patcher] Update dependencies in dev environment"
```

### Separate organizations example

If your organization structure requires hosting patcher and terrapatch in different groups:

```yaml
- name: Run Patcher
  uses: gruntwork-io/patcher-action@v2
  with:
    auth_token: ${{ secrets.GITHUB_TOKEN }}
    scm_type: "github"
    scm_base_url: "https://github.company.com"
    scm_org: "infrastructure-tools"
    patcher_git_repo: "patcher-cli"
    terrapatch_git_repo: "terrapatch-cli"
    terrapatch_scm_org: "security-approved-tools"
    patcher_command: "report"
    include_dirs: "{*prod*}/**"
```

### GitLab self-hosted

GitLab is supported with Patcher but support is new, so please email [support@gruntwork.io](mailto:support@gruntwork.io) for assistance with GitLab configuration.

## Alternative approaches

If the repo-copier approach doesn't meet your needs, you have several alternatives:

### Artifactory

You can configure your artifact management system to proxy and cache releases from your internal GitHub/GitLab repositories.

### Manual binary management

You can download and host binaries directly, though this requires custom scripting for version management.

### Internal GitHub/GitLab

You can set up an internal GitHub Enterprise or GitLab instance specifically for hosting development tools.

## Troubleshooting tips

### Common issues and solutions

**Authentication failures**
- Verify your `auth_token` has read access to both patcher and terrapatch repositories
- For GitHub Enterprise, ensure the token scope includes `repo` permissions

**Binary download failures**
- Check that your `scm_base_url` is correct and accessible from your CI environment
- Verify repository names match exactly (case-sensitive)
- Ensure release assets are properly copied by repo-copier, not just source code

**Version compatibility issues**
- Confirm that your internal repositories have the same release tags as the upstream Gruntwork repositories
- Check that release assets (binaries) are attached to the correct tags
- Verify that repo-copier is configured to sync release assets, not just source code

**Network connectivity problems**
- Test connectivity from your CI environment to your internal SCM provider
- Verify firewall rules allow access to your internal repositories
- Check DNS resolution for your internal SCM base URL

### Debugging steps

1. **Verify repository access**: Test that you can manually access your internal repositories using the same credentials
2. **Check release assets**: Confirm that binary assets are properly attached to releases in your internal repositories
3. **Test API access**: Use curl or similar tools to verify API access to your internal SCM provider
4. **Review action logs**: Enable debug logging in your GitHub Action to see detailed download attempts

### Getting help

If you continue to experience issues:
- Review the Patcher documentation for general troubleshooting guidance
- Check the [repo-copier documentation](https://github.com/gruntwork-io/repo-copier) for repository copying issues
- Contact [support@gruntwork.io](mailto:support@gruntwork.io) for assistance with Enterprise-specific configurations

## Limitations of forking

While you can manually fork the Patcher repositories, **we don't recommend this approach** for the following reasons:

### Why forking has limitations

- **No automatic updates**: You won't receive new Patcher releases automatically, requiring manual effort to stay current
- **Missing metadata**: Forks may not include all release assets and metadata that repo-copier preserves
- **Maintenance overhead**: You'll need to manually manage updates, security patches, and version compatibility

### Why repo-copier is better

You should use `repo-copier` instead of manual forking because it:
- Automatically syncs new releases and updates from Gruntwork
- Preserves all release assets, tags, and metadata
- Updates internal cross-references to point to your hosting URLs
- Provides a complete self-hosted solution that meets enterprise requirements

If you have already forked the repositories manually, consider migrating to a repo-copier-based approach to ensure you receive future updates and maintain compatibility with new Patcher features.

For guidance on migrating from manual forks to repo-copier, contact [support@gruntwork.io](mailto:support@gruntwork.io).

## Artifactory limitations

**Artifactory is not currently supported** as a source for Patcher binaries. The Patcher GitHub Action is designed to work with version control systems (GitHub, GitLab) that provide both source code and release assets with proper API access.

If your organization requires Artifactory support for hosting Patcher binaries, please contact [support@gruntwork.io](mailto:support@gruntwork.io) to discuss your specific requirements and potential future enhancements.

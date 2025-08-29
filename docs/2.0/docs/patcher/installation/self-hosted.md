# Self-hosted Patcher Binaries

## Introduction to self-hosted binaries

Organizations with strict network restrictions or security policies may require hosting all dependencies internally rather than downloading them directly from external sources like github.com/gruntwork-io. The Patcher GitHub Action supports self-hosted binaries to accommodate these requirements.

When using self-hosted binaries, only the Patcher and Terrapatch CLI tools need to be hosted internally—the runtime environment and GitHub Action itself can still run in your standard CI/CD infrastructure. This approach provides a balance between security compliance and operational simplicity.

Common scenarios requiring self-hosted binaries include:
- Corporate firewalls blocking access to external GitHub repositories
- Security policies requiring all software to be vetted and hosted internally
- Air-gapped environments with no external internet access
- Compliance requirements for dependency provenance and control

## Two-step process overview

Setting up Patcher with self-hosted binaries involves two main steps:

1. **Copy binaries to internal repositories**: Use Gruntwork's `repo-copier` tool to copy the Patcher and Terrapatch CLI binaries from the public Gruntwork repositories to your internal version control system.

2. **Configure the GitHub Action**: Update your workflow configuration to use the new parameters that point to your internal repositories instead of the default gruntwork-io locations.

This approach ensures that your CI/CD pipelines can access the required tools while maintaining compliance with your organization's security and network policies.

## Step 1: Using repo-copier to copy binaries

Gruntwork's `repo-copier` tool enables you to create complete, self-hosted copies of Gruntwork repositories in your internal version control system. For Patcher, you'll need to copy two repositories:

- `gruntwork-io/patcher-cli` - The main Patcher CLI tool
- `gruntwork-io/terrapatch-cli` - The Terrapatch CLI tool used for Terraform patching operations

### Prerequisites

- Access to Gruntwork's private repositories (requires Enterprise subscription)
- `repo-copier` tool installed and configured
- Target repositories created in your internal version control system

### Basic repo-copier usage

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

### Version management recommendations

- Set up automated sync schedules to keep your internal copies up-to-date with Gruntwork releases
- Consider using semantic versioning tags to manage which versions are available internally
- Implement approval processes for new version deployments if required by your organization

## Step 2: Configuring the GitHub Action

Once your internal repositories are set up, configure the Patcher GitHub Action to use your self-hosted binaries by specifying the new source location parameters.

### New self-hosted parameters

The following parameters enable custom source locations for downloading Patcher binaries:

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
- For GitLab, use a Personal Access Token or Project Access Token with read access to your internal repositories
- Ensure the token has access to both patcher and terrapatch repositories

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

### GitLab example

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
          auth_token: ${{ secrets.GITLAB_TOKEN }}
          scm_type: "gitlab"
          scm_base_url: "https://gitlab.company.com"
          scm_org: "infrastructure-team"
          patcher_git_repo: "patcher-cli"
          terrapatch_git_repo: "terrapatch-cli"
          patcher_command: "update"
          working_dir: "infrastructure-live/staging"
          pr_target_branch: "patcher-updates"
          pr_title: "[Patcher] Update dependencies in staging environment"
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

## Artifactory status and alternatives

**Artifactory is not currently supported** as a source for Patcher binaries. The Patcher GitHub Action is designed to work with version control systems (GitHub, GitLab) that provide both source code and release assets with proper API access.

If your organization requires Artifactory support for hosting Patcher binaries, please contact [support@gruntwork.io](mailto:support@gruntwork.io) to discuss your specific requirements and potential future enhancements.

### Alternative approaches

While waiting for potential Artifactory support, consider these alternatives:

- **Internal GitHub/GitLab**: Set up an internal GitHub Enterprise or GitLab instance specifically for hosting development tools
- **Proxy repositories**: Configure your artifact management system to proxy and cache releases from your internal GitHub/GitLab repositories
- **Manual binary management**: Download and host binaries directly, though this requires custom scripting for version management

## Troubleshooting tips

### Common issues and solutions

**Authentication failures**
- Verify your `auth_token` has read access to both patcher and terrapatch repositories
- For GitHub Enterprise, ensure the token scope includes `repo` permissions
- For GitLab, verify the token has `read_repository` scope

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
- Review the [Patcher troubleshooting guide](/2.0/docs/patcher/guides/troubleshooting) for general Patcher issues
- Check the [repo-copier documentation](https://github.com/gruntwork-io/repo-copier) for repository copying issues
- Contact [support@gruntwork.io](mailto:support@gruntwork.io) for assistance with Enterprise-specific configurations

## Note about forking

While manually forking the Patcher repositories is technically possible, **it is not recommended** for the following reasons:

### Limitations of manual forking

- **No automatic updates**: You won't receive new Patcher releases automatically, requiring manual effort to stay current
- **Missing metadata**: Forks may not include all release assets and metadata that repo-copier preserves
- **Maintenance overhead**: You'll need to manually manage updates, security patches, and version compatibility

### Recommended approach

Use `repo-copier` instead of manual forking because it:
- Automatically syncs new releases and updates from Gruntwork
- Preserves all release assets, tags, and metadata
- Updates internal cross-references to point to your hosting URLs
- Provides a complete self-hosted solution that meets enterprise requirements

If you have already forked the repositories manually, consider migrating to a repo-copier-based approach to ensure you receive future updates and maintain compatibility with new Patcher features.

For guidance on migrating from manual forks to repo-copier, contact [support@gruntwork.io](mailto:support@gruntwork.io).

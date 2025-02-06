# Source Control Management Comparison

Gruntwork Pipelines supports both GitHub and GitLab (Beta) as source control management (SCM) platforms. This page outlines the key differences and capabilities of each platform integration.

## Feature Comparison

| Feature                          | GitHub                      | GitLab (Beta)                |
| -------------------------------- | --------------------------- | ---------------------------- |
| Infrastructure as Code Pipelines | ✅                           | ✅                            |
| Account Factory Integration      | ✅                           | ❌                            |
| App-based Authentication         | ✅                           | ❌                            |
| Machine User Authentication      | ✅                           | ✅                            |
| Customizable Workflows           | ✅                           | Limited                      |
| Pull Request Comments            | Rich formatting             | Basic formatting             |
| Repository/Group Authorization   | Self-service via GitHub App | Manual via Gruntwork Support |
| Required Setup Time              | ~30 minutes                 | ~45 minutes                  |

## Platform-Specific Requirements

### GitHub Requirements
- GitHub Organization
- Choice between GitHub App or Machine User authentication
- Repository access configuration
- GitHub Actions enabled

### GitLab Requirements
- GitLab Groups identified for Pipelines use
- Machine User account
- GitLab CI/CD enabled
- Gruntwork Developer Portal account
- Contact with Gruntwork Support for group authorization

## Authentication Methods

### GitHub Authentication Options
1. **GitHub App (Recommended)**
   - Simplified setup
   - Automatic token rotation
   - Fine-grained permissions
   - Enhanced security features

2. **Machine Users**
   - Traditional PAT-based authentication
   - Manual token rotation
   - Useful for air-gapped environments

### GitLab Authentication
- **Machine User Only**
  - Single machine user required
  - Personal Access Token with API scope
  - Manual token rotation required
  - Group-level access configuration

## Getting Started

- For GitHub setup, see [GitHub Installation Guide](/2.0/docs/pipelines/installation/viagithubapp)
- For GitLab setup, see [GitLab Installation Guide](/2.0/docs/pipelines/installation/gitlab)
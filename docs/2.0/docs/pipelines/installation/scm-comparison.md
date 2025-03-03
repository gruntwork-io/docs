# Gruntwork Pipelines CI/CD Platform Comparison

Gruntwork Pipelines supports both GitHub Actions and GitLab CI/CD as CI/CD platforms. This page outlines the key differences and capabilities of each platform integration.

## Feature Comparison

| Feature                          | GitHub                      | GitLab (Beta)                |
| -------------------------------- | --------------------------- | ---------------------------- |
| Infrastructure as Code Pipelines | ✅                           | ✅                            |
| Account Factory Integration      | ✅                           | ❌                            |
| App-based Authentication         | ✅                           | ❌                            |
| Machine User Authentication      | ✅                           | ✅                            |
| Customizable Workflows           | ✅                           | ✅                            |
| Pull Request Comments            | Rich formatting             | Rich formatting              |
| Repository/Group Authorization   | Self-service via GitHub App | Manual via Gruntwork Support |
| Required Setup Time              | ~30 minutes                 | ~30 minutes                  |

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

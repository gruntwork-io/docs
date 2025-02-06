# Installing Gruntwork Pipelines

## Choose Your Platform

Gruntwork Pipelines supports both GitHub Actions and GitLab CI/CD. The installation process differs depending on your platform choice:

### GitHub Actions

For GitHub Actions, you have two authentication options:

1. [GitHub App Authentication](/2.0/docs/pipelines/installation/viagithubapp) (Recommended)
2. [Machine User Authentication](/2.0/docs/pipelines/installation/viamachineusers)

### GitLab CI/CD (Beta)

For GitLab CI/CD:

1. [Machine User Authentication](/2.0/docs/pipelines/installation/viamachineusers) is the only supported method
2. Contact Gruntwork support to authorize your GitLab groups
3. Note that Account Factory features are not currently available on GitLab

## Prerequisites

Before installing Pipelines, ensure you have:

1. An active Gruntwork subscription
2. A Gruntwork Developer Portal account
3. Access to create AWS IAM roles and OIDC providers
4. For GitLab: Contact with Gruntwork support to authorize your groups
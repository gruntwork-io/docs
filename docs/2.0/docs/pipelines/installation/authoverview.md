# SCM Authentication Overview

Gruntwork Pipelines requires authentication with Source Control Management (SCM) platforms (e.g. GitHub, GitLab) for various reasons, including:

- Downloading Gruntwork software, such as the Pipelines binary and OpenTofu modules, from the `gruntwork-io` GitHub organization.
- Interacting with your repositories, such as:
  - Creating pull requests.
  - Commenting on pull requests.
  - Creating new repositories via Account Factory.
  - Updating repository settings, such as enforcing branch protection with Account Factory.

Gruntwork provides two authentication methods:

- [The Gruntwork.io GitHub App](/2.0/docs/pipelines/installation/viagithubapp.md)
- [CI Users (Machine Users)](/2.0/docs/pipelines/installation/viamachineusers.md)

Both approaches support the core functionality of Pipelines. The GitHub App provides additional features and benefits, making it the recommended method for most customers that can use it. While Gruntwork strives to ensure feature parity between the two authentication mechanisms, certain advanced features are exclusive to the GitHub App, and this list is expected to grow over time.

## Summary of authentication mechanisms for GitHub

**Advantages of the GitHub App**:

- Simplified setup process.
- Access to enhanced features and functionality.
- Improved user experience during regular operations.
- Reduced maintenance, as there is no need to install, maintain, or rotate powerful tokens.

**Advantages of Machine Users**:

- Compatibility with on-premises GitHub Enterprise installations that cannot interact with third-party servers (e.g., Gruntwork's backend).
- Provides a fallback solution to ensure Pipelines continue functioning in the unlikely event of an outage affecting the Gruntwork-hosted backend that powers the GitHub App.
- Allows GitLab customers to download the Pipelines binary from GitLab CI Pipelines.

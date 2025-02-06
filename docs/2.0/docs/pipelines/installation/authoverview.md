# Authenticating Gruntwork Pipelines

Gruntwork Pipelines requires authentication with GitHub/GitLab to perform various functions, including:
* Downloading Gruntwork code, such as the Pipelines binary and Terraform modules, from the `gruntwork-io` GitHub organization.
* Interacting with your repositories, such as:
  * Creating pull requests.
  * Commenting on pull requests.
  * Creating new repositories via Account Factory.
  * Updating repository settings, such as enforcing branch protection, via Account Factory.

Gruntwork provides two authentication methods: a [GitHub App](/2.0/docs/pipelines/installation/viagithubapp.md) and CI Users ([Machine Users](/2.0/docs/pipelines/installation/viamachineusers.md)) with personal access tokens for Pipelines.

Both approaches support the core functionality of Pipelines. However, the GitHub App provides additional features and benefits, making it the recommended method. While Gruntwork strives to ensure feature parity between the two authentication mechanisms, certain advanced features are exclusive to the GitHub App, and this list is expected to grow over time.

## Summary of authentication mechanisms for GitHub

**Advantages of the GitHub App**:
- Simplified setup process.
- Access to enhanced features and functionality.
- Improved user experience during regular operations.
- Reduced maintenance, as there is no need to install, maintain, or rotate powerful tokens.

**Advantages of Machine Users**:
- Compatibility with on-premises GitHub Enterprise installations that cannot interact with third-party servers (e.g., Gruntwork's backend).
- Provides a fallback solution to ensure Pipelines continue functioning in the unlikely event of an outage affecting the Gruntwork-hosted backend that powers the GitHub App.

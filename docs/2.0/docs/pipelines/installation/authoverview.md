# Authenticating Gruntwork Pipelines

Gruntwork Pipelines needs to authenticate with GitHub for various reasons, including:
* Downloading Gruntwork code (e.g. the pipelines binary, Terraform modules, etc.) from the `gruntwork-io` GitHub organization.
* Interacting with your repositories, e.g.:
  * Creating pull requests
  * Commenting on pull requests
  * (via Account Factory) Creating new repositories
  * (via Account Factory) Updating repository settings, e.g. enforcing branch protection

Gruntwork provides two mechanisms to achieve this authentication: a [GitHub App](/2.0/docs/pipelines/installation/viagithubapp.md) and a strategy of using CI Users (aka [Machine Users](/2.0/docs/pipelines/installation/viamachineusers.md)) for generating/installing personal access tokens for pipelines to use.

Broadly the two approaches achieve the same result and core pipelines functionality will work with either mechanism.  There are, however, some features and benefits only available with authenticating using the GitHub app and as such it is our recommended approach. As we roll out new features to pipelines we endeavor to ensure they are available to both authentication mechanisms. However, we do anticipate that the list of features that are GitHub App exclusive will grow over time.

In summary:

**Reasons to use the GitHub App**:
* _Dramatically_ streamlined setup
* Access to more features and functionality
* Improved day to day user experience
* Less maintenance overhead (no need to install, maintain and rotate powerful tokens)

**Reasons to use Machine Users**
* You need to work with GitHub on-prem Enterprise and your on-premise install doesn't allow interacting with third party servers (e.g. Gruntwork's backend)
* You want a fallback solution to ensure that Pipelines can continue to function even if the Gruntwork-hosted backend that powers the GitHub App goes down
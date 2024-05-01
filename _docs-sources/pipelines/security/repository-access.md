# Repository Access

Gruntwork recommends that you grant permissions to GitHub repositories by defining three [GitHub Teams](https://docs.github.com/en/organizations/organizing-members-into-teams/about-teams), which should map to three separate personas in your organization. Each team and its permissions are designed to apply the [_principle of least privilege_](https://en.wikipedia.org/wiki/Principle_of_least_privilege) to each individual (or machine user) in your organization for them to be able to perform changes to your infrastructure.

- The `infrastructure-administrators` team is for engineers who likely work on the IaC codebase daily, but _do_ have administrative AWS permissions.
- The `infrastructure-collaborators` team is for engineers who work on the IaC codebase daily but _do not_ have administrative permissions in AWS.
- The `ci-code-read-only` team is meant for engineers and a single machine user who can read relevant `infrastructure-live` and `infrastructure-modules` (a repository where you can define custom Terraform modules for your organization) repositories.

:::tip
This is only a recommendation, however. You must assess the needs of your organization and ensure that access is set up in a way that is secure and appropriate for your organization.
:::

## How to use these teams

### Infrastructure Administrators

These are the engineers who should be well versed in AWS best practices and knowledgeable about IAC. They will have the ability to approve and merge changes to the `infrastructure-live-root` and the `infrastructure-live-access-control` repository, and as such, have permissions to vend new AWS accounts.

### Infrastructure Collaborators

These are the engineers who work on the IaC codebase daily but do not have administrative permissions in AWS. They will optionally have the ability to propose changes to the `infrastructure-live-root` and the `infrastructure-live-access-control` repository, but will not have the ability to vend new AWS accounts.

### CI Code Read-Only

This team is meant for engineers and a single machine user who can read relevant `infrastructure-live` and `infrastructure-modules` repositories. This team should not have the ability to propose changes to the `infrastructure-live-root` and the `infrastructure-live-access-control` repository.

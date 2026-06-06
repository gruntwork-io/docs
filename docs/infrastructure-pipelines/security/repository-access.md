# Repository Access

:::info Newer Version Available
This documentation pertains to an old version of Gruntwork Pipelines which used the `infrastructure-pipelines` repository. [Click here](../../pipelines/overview/) to view documentation for the most recent version.
:::

Gruntwork Pipelines grants permissions by defining three [GitHub Teams](https://docs.github.com/en/organizations/organizing-members-into-teams/about-teams), which should map to three separate personas in your organization. Each team and its permissions are designed to apply the [_principle of least privilege_](https://en.wikipedia.org/wiki/Principle_of_least_privilege) to each individual (or machine user) in your organization for them to be able to perform changes to your infrastructure.

The `infrastructure-collaborators` team is for engineers who work on the IaC codebase daily but _do not_ have administrative permissions in AWS. Similarly, the `infrastructure-administrators` team is for engineers who likely work on the IaC codebase daily, but _do_ have administrative AWS permissions. Finally, the `ci-code-read-only` team is meant for a single machine user who can read your `infrastructure-live` and `infrastructure-modules` (a repository where you can define custom Terraform modules for your organization) repositories.

The diagram below visually illustrates the above teams:

![Gruntwork Pipelines Permissions](/img/pipelines/security/github_teams.png)


<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "7ba6851031c12f4cd3112cc577895d88"
}
##DOCS-SOURCER-END -->

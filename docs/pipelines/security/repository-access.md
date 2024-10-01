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

If you are an organization that does not require that collaborators have the ability to propose changes to critical infrastructure in `infrastructure-live-root`, you should not provide the team write access to the `infrastructure-live-root` repository. They will still be able to use the permissions granted via `infrastructure-live-access-control` to make updates to workloads in a separate repository.

e.g. If you have a team that is responsible for managing a service running in ECS, you can have a central platform team provision the relevant ECS cluster, service, etc within the `infrastructure-live-root` repository, then grant a separate `example-ecs-service` repository the ability to push newly built images to ECR and update the ECS service task definition via the `infrastructure-live-access-control` repository.

If you are an organization that does not require that collaborators have the ability to propose changes to access control in `infrastructure-live-access-control`, you should not provide the team write access to the `infrastructure-live-access-control` repository. They will still be able to use the permissions granted via `infrastructure-live-access-control` to make updates to workloads in a separate repository.

e.g. If you have that same team mentioned above find that they need the ability to upload new assets to an S3 bucket as part of their deployment procedure for their service, they can submit a ticket to a central platform team to update the `infrastructure-live-access-control` repository to grant them the necessary permissions to upload assets to S3 within their workflows.

:::tip
While it does require a certain degree of trust to grant limited access to allow engineers to propose updates to these repositories, it is important to remember the trade-off between the risk granting too much access and the risk of [security fatigue](https://www.nist.gov/news-events/news/2016/10/security-fatigue-can-cause-computer-users-feel-hopeless-and-act-recklessly).

Ensure that you have processes in place that make sense for your organization.
:::

### CI Code Read-Only

This team is meant for engineers and a single machine user who can read relevant `infrastructure-live` and `infrastructure-modules` repositories. This team should not have the ability to propose changes to the `infrastructure-live-root` and the `infrastructure-live-access-control` repository.


<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "2629db6b6d1bd8579ea58140ffc0239d"
}
##DOCS-SOURCER-END -->

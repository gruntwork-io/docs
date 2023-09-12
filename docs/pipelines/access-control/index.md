# Access control

Gruntwork Pipelines grants permissions by defining three [GitHub Teams](https://docs.github.com/en/organizations/organizing-members-into-teams/about-teams), which should map to three separate personas in your organization. Each team and its permissions are designed to grant the _least possible permissions_ to each individual (or machine user) in your organization for them to be able to perform changes to your infrastructure.

### GitHub Team: infrastructure-administrators

The `infrastructure-administrators` team is for engineers who likely work on the IaC codebase daily, and have administrative AWS permissions. These users will also have permission to both read and write Pipelines configuration files, and the GitHub Actions Workflow files that are used to trigger Pipelines.

### GitHub Team: infrastructure-collaborators

The `infrastructure-collaborators` team is for engineers who work on the IaC codebase daily but who _do not_ have administrative permissions in AWS. The users will also have permission to read Pipelines configurations files, but not to write (or modify) them.

### Github Team: ci-code-read-only

 The `ci-code-read-only` team is meant for a single machine user that can read your `infrastructure-live` and `infrastructure-modules` (a repository where you can define custom OpenTF (Terraform) modules for your organization) repos.

### Visualizing all three teams

The diagram below visually illustrates the above teams:

![Gruntwork Pipelines Permissions](/img/pipelines/how-it-works/pipelines_security.png)


<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "cc2156ba0900f36e4c1829ebc0ac5f31"
}
##DOCS-SOURCER-END -->

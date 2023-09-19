# Production Use

In the [Hello World Tutorial](../hello-world), we got Pipelines up and running for the first time. In this tutorial, we make it production-ready.

## Branch protection rules

As you recall, Pipelines separates code (IaC) and deployment into two different git repositories. The `infrastructure-pipelines` repository holds both the deployment code and the AWS account access, and assigns write privileges only to a select group of admins. The `infrastructure-live` repository holds the infrastructure-as-code that will be deployed.

In both cases, it's important to think carefully about the conditions your organization needs to meet to feel comfortable that a change has been sufficiently reviewed and vetted. GitHub branch protection gives us one essential way to enforce those conditions.

### Branch protection on infrastructure-live

For the `infrastructure-live` repository, the goal of branch protection is to TODO. To achieve that goal, we recommend:

TODO

### Branch protection on infrastructure-pipelines

For the `infrastructure-pipelines` repository, the goal of branch protection is to TODO. To achieve that goal, we recommend:

TODO

## GitHub Personal Access Tokens (PATs)

In the Hello World tutorial, we recommended you create PATs with a broad range of access. For production use, we need to narrow those PATs down to the minimum permissions necessary. In that spirit, here are the specific permissions we recommend for each PAT:

TODO


<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "cec07a315fcbaa433b5784b69cc1a27c"
}
##DOCS-SOURCER-END -->

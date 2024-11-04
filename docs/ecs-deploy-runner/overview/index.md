# ECS Deploy Runner

:::info Newer Version Available
This documentation pertains to an old version of Gruntwork Pipelines which used the ECS Deploy Runner. [Click here](../../pipelines/overview/) to view documentation for the most recent version.
:::

Gruntwork Pipelines is a framework that enables you to use your preferred CI tool to
securely run an end-to-end pipeline for infrastructure code ([Terraform](https://www.terraform.io/)) and
app code ([Docker](https://www.docker.com/) or [Packer](https://www.packer.io/)). Rather than replace your existing CI/CD provider, Gruntwork Pipelines is designed to enhance the security
of your existing tool.

Without Gruntwork Pipelines, CI/CD tools require admin level credentials to any AWS account where you deploy infrastructure.
This makes it trivial for anyone with access to your CI/CD system to access AWS credentials with permissions
greater than they might otherwise need.
Gruntwork Pipelines allows a highly restricted set of permissions to be supplied to the CI/CD tool while
infrastructure related permissions reside safely within your own AWS account. This reduces the exposure of your
high value AWS secrets.


<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "bc5145c93f72617664cc0a3cc1a575e2"
}
##DOCS-SOURCER-END -->

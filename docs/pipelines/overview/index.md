# What is Gruntwork Pipelines?

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
  "hash": "c09f5ea69815887ce56f6f794386e05e"
}
##DOCS-SOURCER-END -->

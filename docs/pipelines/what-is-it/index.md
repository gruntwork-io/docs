# Overview

Gruntwork Pipelines is a framework that enables you to use your preferred CI tool to
securely run an end-to-end pipeline for infrastructure code (Terraform) and
app code (Docker or Packer). Rather than replace your existing CI/CD provider, Gruntwork Pipelines is designed to enhance the security
of your existing tool.

Because applying arbitrary terraform requires full access to your AWS environment,
your CI/CD tool would require admin level credentials to any AWS account where you deploy infrastructure.
This makes it trivial for anyone with access to your CI/CD system (usually a long list) to access AWS credentials with permissions
greater than they might otherwise need.
Gruntwork Pipelines allows a highly restricted set of permissions to be supplied to the CI/CD tool while
infrastructure related permissions reside within your own AWS account. This reduces the exposure of your
high value AWS secrets.

## Features

- Set up a secure Terraform or Terragrunt Pipeline based on best practices
- Run deployments using EC2 or Fargate on ECS
- Build Docker or Packer images
- Stream output logs to CloudWatch





<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "bffaecc0b030fb17314f04c66c25ffab"
}
##DOCS-SOURCER-END -->

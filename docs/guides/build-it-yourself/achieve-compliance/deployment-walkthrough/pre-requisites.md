---
pagination_label: Deployment Walkthrough
---

# Pre-requisites

The [Production-grade Design](../production-grade-design/intro.md) section describes in detail the Terraform resources to use and the approach to take for
each recommendation, but we've already done that grunt work! This section documents how to achieve compliance using the Infrastructure as Code modules from Gruntwork.

This walkthrough has the following pre-requisites:

## Gruntwork Infrastructure as Code Library

This guide uses code from the [Gruntwork Infrastructure as Code Library](https://gruntwork.io/infrastructure-as-code-library/), as it
implements most of the production-grade design for you out of the box.

## Gruntwork Compliance for CIS AWS Foundations Benchmark

This guide also uses code from the [Gruntwork CIS AWS
Foundations Benchmark repository](https://gruntwork.io/achieve-compliance), which contains the necessary configurations to achieve compliance.

:::info

You must be a <span className="js-subscribe-cta">Gruntwork Compliance subscriber</span> to access the Gruntwork
Infrastructure as Code Library and the CIS AWS Foundations Benchmark modules.

:::

## How to configure a production-grade AWS account structure

Review the [production-grade AWS account structure guide](https://gruntwork.io/guides/foundations/how-to-configure-production-grade-aws-account-structure/) to familiarize yourself with many of the concepts that this walkthrough depends on.

## Terraform

This guide uses [Terraform](https://www.terraform.io/) to define and manage all the infrastructure as code. If
you’re not familiar with Terraform, check out
[A Comprehensive Guide to Terraform](https://blog.gruntwork.io/a-comprehensive-guide-to-terraform-b3d32832baca),
[A Crash Course on Terraform](https://training.gruntwork.io/p/terraform).

## Terragrunt

This guide uses [Terragrunt](https://terragrunt.gruntwork.io/) to configure the infrastructure as code. To get familiar
with Terragrunt, explore the [features](https://terragrunt.gruntwork.io/docs/#features), read the [guides](https://terragrunt.gruntwork.io/docs/getting-started/quick-start/),
or dive into the [documentation](https://terragrunt.gruntwork.io/docs/).

## Keybase (optional)

As part of this guide, you will create IAM users, including, optionally, credentials for those IAM users. If you
choose to create credentials, those credentials will be encrypted with a PGP key. You could provide the PGP keys
manually, but a more manageable option may be to have your team members to sign up for [Keybase](https://keybase.io),
create PGP keys for themselves, and then you can provide their Keybase usernames, and the PGP keys will be retrieved
automatically.


<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "cfc6e23713c964098ba9f49dbe2a448f"
}
##DOCS-SOURCER-END -->



# Compatibility with OpenTofu and Terraform

All code in the Gruntwork IaC Library is compatible with:

- All versions of [OpenTofu](https://opentofu.org/)
- HashiCorp Terraform versions up to and including v1.5.7

## Reason for the split

For additional context, refer to the blog post [The Future of Terraform Must Be Open](https://blog.gruntwork.io/the-future-of-terraform-must-be-open-ab0b9ba65bca).

## What's special about HashiCorp Terraform v1.5.7?

Version 1.5.7 is the final open source release of HashiCorp Terraform, licensed under the MPLv2 open-source license. Versions up to and including v1.5.7 remain MPLv2 licensed and thus can continue to be used with Gruntwork.

## What if I want to use a version of Terraform above v1.5.7?

Gruntwork advises all customers to adopt [OpenTofu](https://opentofu.org/) as a "drop-in" replacement for HashiCorp Terraform. We will prioritize development with OpenTofu releases, test for compatibility, and provide full support for any issues related to our modules and OpenTofu.

## As a user of the Gruntwork IaC Library, do I need to make changes?

No immediate changes are necessary. You can continue using any version of HashiCorp Terraform up to and including v1.5.7.

When ready to upgrade your Terraform binary, replace HashiCorp Terraform with [OpenTofu](https://opentofu.org/).

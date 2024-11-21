# Compatibility with OpenTofu and Terraform

All code in Gruntwork Library is compatible with:

- All versions of [OpenTofu](https://opentofu.org/)
- HashiCorp Terraform versions v1.5.7 and below

## Why the split?

See our blog post [The Future of Terraform Must Be Open](https://blog.gruntwork.io/the-future-of-terraform-must-be-open-ab0b9ba65bca) for details.

## What's special about HashiCorp Terraform v1.5.7?

This is the last version of HashiCorp Terraform that is licensed under the MPLv2 open source license. Any version of Terraform at or below v1.5.7 remains licensed under the MPLv2 license and will continue to work as it always has.

## What if I want to use a version of Terraform above v1.5.7?

Going forward, we recommend that all Gruntwork customers adopt [OpenTofu](https://opentofu.org/) as a "drop-in" replacement for HashiCorp Terraform. We will be developing against OpenTofu releases, testing for compatibility with OpenTofu, and offering full support for any issues you experience with our modules and OpenTofu.

## As a user of Gruntwork Library, do I need to change anything?

No. You can continue using any version of HashiCorp Terraform up to and including v1.5.7.

When you wish to upgrade your Terraform binary, you should replace HashiCorp Terraform with [OpenTofu](https://opentofu.org/).

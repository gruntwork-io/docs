# docs.gruntwork.io static website

This is the Terraform code to create an S3 bucket and CloudFront distribution to host the docs.gruntwork.io static website.

**Note**: The domain name for this static website is managed in the Phoenix DevOps account!

## Quick start

To deploy changes:

1. Make sure [Terraform](https://www.terraform.io/) is installed.
1. Configure the secrets specified at the top of `variables.tf` as environment variables.
1. Run `terraform init`.
1. Run `terraform plan` to see the changes you're about to apply.
1. If the plan looks good, run `terraform apply`.

---
sidebar_label: Update the Account Baseline modules
---

# Step 3: Update the Account Baseline modules

Next, you will need to update the account baseline (landing zone) modules to the version compatible
with v1.5.0 of the CIS AWS Foundations Benchmark. 

We strongly recommend upgrading straight to at least [v0.42.9](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.42.9), instead of each minor version incrementally.

If you are using Patcher, then it will upgrade to the latest available version.

This guide assumes you are using at least [v0.40.0](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.40.0) of the CIS Service Catalog repo, which was released in August 2022.

The account baseline modules had one breaking change between versions v0.40.0 and v0.42.9. We must manually run
the migration steps before updating the module versions.

- [v0.42.0](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.42.0): Added support for new AWS region (me-central-1 UAE) to multiregion modules.

## Step 3.1 Add `me-central-1` to your `providers.tf`

Add the following to your providers.tf for terraform:

```hcl title=infrastructure-live/root/_global/account-baseline/terragrunt.hcl
provider "aws" {
  region = "me-central-1"
  alias  = "me_central_1"

  # Skip credential validation and account ID retrieval for disabled or restricted regions
  skip_credentials_validation = contains(coalesce(var.opt_in_regions, []), "me-central-1") ? false : true
  skip_requesting_account_id  = contains(coalesce(var.opt_in_regions, []), "me-central-1") ? false : true
  skip_get_ec2_platforms      = contains(coalesce(var.opt_in_regions, []), "af-south-1") ? false : true
}
```

## Step 3.2 Pass the provider in the `providers` map

Then, make sure to pass through the provider in the providers map for the module call. For example:

```hcl title=infrastructure-live/root/_global/account-baseline/terragrunt.hcl
module "root_baseline" {
  source = "git::git@github.com:gruntwork-io/terraform-aws-cis-service-catalog.git//modules/landingzone/account-baseline-root?ref=v1.0.8"

  # You MUST create a provider block for EVERY AWS region (see providers.tf) and pass all those providers in here via
  # this providers map. However, you should use var.opt_in_regions to tell Terraform to only use and authenticate to
  # regions that are enabled in your AWS account.
  providers = {
    aws                = aws.default
    aws.af_south_1     = aws.af_south_1
    aws.ap_east_1      = aws.ap_east_1
    aws.ap_northeast_1 = aws.ap_northeast_1
    aws.ap_northeast_2 = aws.ap_northeast_2
    aws.ap_northeast_3 = aws.ap_northeast_3
    aws.ap_south_1     = aws.ap_south_1
    aws.ap_southeast_1 = aws.ap_southeast_1
    aws.ap_southeast_2 = aws.ap_southeast_2
    aws.ap_southeast_3 = aws.ap_southeast_3
    aws.ca_central_1   = aws.ca_central_1
    aws.cn_north_1     = aws.cn_north_1
    aws.cn_northwest_1 = aws.cn_northwest_1
    aws.eu_central_1   = aws.eu_central_1
    aws.eu_north_1     = aws.eu_north_1
    aws.eu_south_1     = aws.eu_south_1
    aws.eu_west_1      = aws.eu_west_1
    aws.eu_west_2      = aws.eu_west_2
    aws.eu_west_3      = aws.eu_west_3
    aws.me_central_1   = aws.me_central_1
    aws.me_south_1     = aws.me_south_1
    aws.sa_east_1      = aws.sa_east_1
    aws.us_east_1      = aws.us_east_1
    aws.us_east_2      = aws.us_east_2
    aws.us_gov_east_1  = aws.us_gov_east_1
    aws.us_gov_west_1  = aws.us_gov_west_1
    aws.us_west_1      = aws.us_west_1
    aws.us_west_2      = aws.us_west_2
  }

  # ... other args omitted for brevity ...
}
```

@@ FIX ME - the titles on the code snippets are wrong

## Next step

:::caution

We strongly recommeded that you verify the changes that have been made before executing Terraform/Terragrunt `apply`

:::

If you have successfully completed steps 3.1 and 3.2, then you should now move to [step 4](deployment-walkthrough/step-4-verify-the-code-changes.md) in order to verify the changes that have been made.


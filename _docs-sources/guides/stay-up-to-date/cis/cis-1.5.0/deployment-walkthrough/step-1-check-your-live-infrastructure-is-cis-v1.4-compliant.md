---
sidebar_label: Check your live infrastructure is CIS AWS v1.4 compliant
---

# Step 1: Check your live infrastructure is CIS AWS v1.4 compliant

The later steps in this guide assume that you are upgrading from CIS AWS Foundations Benchmark v1.4 to v1.5.

Before you update to CIS AWS Foundations Benchmark v1.5, we strongly recommend that you confirm that your live
infrastructure is compliant with the CIS AWS Foundations Benchmark v1.4.

If you do not have existing tooling in place to confirm this, then we suggest that you run the
[Steampipe CIS v1.4.0](https://hub.steampipe.io/mods/turbot/aws_compliance/controls/benchmark.cis_v140) check against
your infrastructure.

In the final step in this guide, we suggest you run Steampipe to verify that your infrastructure is CIS AWS Foundations
Benchmark v1.5 compliant.

## 1.1 Download and install Steampipe

Homebrew is the recommended way to install Steampipe for Mac. Instructions for different OS versions can be found at
https://steampipe.io/downloads.

```
brew tap turbot/tap
brew install steampipe
```

Next install the AWS plugin with Steampipe:

```
steampipe plugin install aws
```

## 1.2 Configure Steampipe to analyze all regions

The file `~/.steampipe/config/aws.spc`, that is created by Steampipe, needs to be updated to analyze all regions,
by adding `regions = ["*"]`. Otherwise, multi-regions resouces, like AWS Config, IAM Access Analyzer will fail in the check:

```hcl
connection "aws" {
  plugin = "aws"

  # You may connect to one or more regions. If `regions` is not specified,
  # Steampipe will use a single default region using the same resolution
  # order as the AWS CLI:
  #  1. The `AWS_DEFAULT_REGION` or `AWS_REGION` environment variable
  #  2. The region specified in the active profile (`AWS_PROFILE` or default)
  regions = ["*"] # <- Update this line

  # ... other existing config
}
```



## 1.3 Clone the Steampipe AWS Compliance Mod

The [AWS Compliance Mod](https://hub.steampipe.io/mods/turbot/aws_compliance#aws-compliance-mod) includes compliance
checks for CIS AWS Foundations Benchmark v1.4 and v1.5.

Clone:

```
git clone https://github.com/turbot/steampipe-mod-aws-compliance.git
cd steampipe-mod-aws-compliance
```

## 1.4 Run the CIS v1.4.0 compliance check

Before running, an IAM credential report needs to be generated:

```
aws iam generate-credential-report
```

Run the check while authenticated to the AWS account you want to verify:

```
steampipe check aws_compliance.benchmark.cis_v140
```

Example:

```
aws-vault exec dev -- aws iam generate-credential-report
aws-vault exec dev -- steampipe check aws_compliance.benchmark.cis_v140
```

### In case not all checks pass

:::caution

If you have failing checks, then there are manual steps necessary to your infrastructure achieve CIS compliance.

:::

After deploying a CIS Reference Architecture, there are steps that unfortunately can't be automated. See the [Manual steps](/guides/build-it-yourself/achieve-compliance/deployment-walkthrough/manual-steps) page, with step-by-step instructions
to achieve complience.


:::note

If you Reference Architecture was deployed before February 9th 2023, there are two extra steps that need to be followed:

:::

#### Enable `ap-northeast-3` at your `multi_region_common.hcl`

Add `ap-northeast-3` to the `opt_in_regions` local variable in `multi_region_common.hcl`.

```hcl title=multi_region_common.hcl
# ----------------------------------------------------------------------------------------------------------------
# MULTIREGION CONVENIENCE LOCALS
# The following locals are used for constructing multi region provider configurations for the underlying module.
# ----------------------------------------------------------------------------------------------------------------
locals {
  # Creates resources in the specified regions. The best practice is to enable multiregion modules in all enabled
  # regions in your AWS account. To get the list of regions enabled in your AWS account, you can use the AWS CLI: aws
  # ec2 describe-regions.
  opt_in_regions = [
    ...
    "ap-northeast-3"
  ]

  # ... other vars omitted for brevity ...
```

There is a new region `me-central-1`, that you will need to add in the `multi_region_common.hcl` after doing the version updates.

### Enable AWS Organizations metrics filter

If the `4.15` recommendation is also failing, it's because the filter is still not created in the account. So in the
files `_envcommon/landingzone/account-baseline-app/account-baseline-app-base.hcl` and `security/_global/account-baseline/terragrunt.hcl`,
Add this a variable:

```hcl
inputs = {
  # ... other variables above

  cloudtrail_benchmark_alarm_enable_organizations_filters = true
}
```

Run `terragrunt apply` in each account to create the new metric filter.

If the check is still not working, the release [v0.44.1](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.44.1)
of the CIS Service Catalog contains a fix for the filter match Steampipe's query. In the next steps you will update
the versions of CIS Service Catalog (and some other services) to the latest, so it will be fixed.

## Next steps

If you've confirmed that your live infrastructure is compliant with the CIS AWS Foundations Benchmark v1.4 then you're
ready to move to [step 2](step-2-update-references-to-the-gruntwork-infrastructure-as-code-library.md) and update your
references to the Gruntwork Infrastructure as Code Library.

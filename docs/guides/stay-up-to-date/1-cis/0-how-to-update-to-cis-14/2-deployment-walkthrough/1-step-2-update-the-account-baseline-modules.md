---
sidebar_label: Update the Account Baseline modules
---

# Step 2: Update the Account Baseline modules

Next, you will need to update the account baseline (landing zone) modules to the version compatible
with v1.4.0 of the CIS AWS Foundations Benchmark. We strongly recommend upgrading straight to at least v0.27.0,
instead of each minor version incrementally. This saves a lot of time due to the performance enhancements in
recent versions of the account baseline modules and you can still complete the required migration steps before
running Terraform/Terragrunt `apply`.

This guide assumes you are using at least v0.22.0 of the CIS Service Catalog repo.

The account baseline modules had three breaking changes between versions v0.22.0 and v0.27.0. We must manually run
these migration steps before updating the module versions.

- [v0.23.0](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.23.0): Refactored the
    SecurityHub module to remove a Python script that managed invitations between the AWS accounts. It’s necessary to run a
    state migration to manage the invitations with Terraform.

- [v0.24.0](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.24.0): This release introduces MFA Delete. You will need to follow the migration guide to ensure all S3 buckets are properly secured. Note: It is unlikely you will need to perform this step on the AWS root account as they typically don’t contain S3 buckets. Please ensure you migrate all other AWS accounts.

- [v0.25.0](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.25.0): Update the codebase
    to a new multi-region approach. In [v0.51.0](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.51.0) of
    `terraform-aws-security`, we refactored how we build multi-region modules—that
    is, those modules that deploy resources across every single AWS region, such as `aws-config-multi-region`—to no longer
    create nested provider blocks, and instead, have users pass in providers via the providers map.

Additionally, earlier versions of the account baseline modules did not set the following variables, so please ensure
that they exist. Here is [an example](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/blob/v0.27.0/examples/for-production/infrastructure-live/logs/_global/account-baseline/terragrunt.hcl#L281) of what you might set the values to for the prod account.

- `var.config_central_account_id`
- `var.security_hub_associate_to_master_account_id`
- `var.config_opt_in_regions`
- `var.guardduty_opt_in_regions`
- `var.kms_cmk_opt_in_regions`
- `var.iam_access_analyzer_opt_in_regions`
- `var.ebs_opt_in_regions`
- `var.security_hub_opt_in_regions`
- `var.macie_opt_in_regions`

Once you have completed the above migration steps, it is time to update each baseline module to at least version [v0.27.0](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.27.0) and run Terraform/Terragrunt apply. Typically this is done using the `source` parameter:

```hcl title=infrastructure-live/root/_global/account-baseline/terragrunt.hcl
git::git@github.com:gruntwork-io/terraform-aws-cis-service-catalog.git//modules/landingzone/account-baseline-root?ref=v0.27.0
```

Now execute Terraform/Terragrunt `apply`. It should take approximately ~30 minutes to apply the account baseline
modules. If you encounter any issues then please check out the [Known Issues](./2-step-3-manual-steps.md#known-issues) section.

:::info

Be sure to do this for each AWS account and account baseline module.

:::

In addition to the above breaking changes, you’ll need to configure the account baseline modules to include the newly
created module for [Amazon Macie](https://aws.amazon.com/macie/). Amazon Macie satisfies the new 2.1.4 benchmark recommendation that requires all data
in Amazon S3 be discovered, classified and secured. We have created a dedicated
[`macie` module](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/tree/master/modules/security/macie)
in our CIS service catalog.

:::info

Manual steps required! After updating the account baseline modules as described below, make sure you perform the manual steps
outlined in the [Configure Amazon Macie (recommendation 2.1.4)](./2-step-3-manual-steps.md#configure-amazon-macie-recommendation-214) section.

:::

To configure account baseline modules to include Amazon Macie, add the following configuration to the respective account
baseline module configurations:

```hcl title=infrastructure-live/root/_global/account-baseline/terragrunt.hcl
inputs {
  # ... previous inputs ...

  # Configures Amazon Macie
  create_macie_bucket      = true
  macie_bucket_name        = "<your-macie-bucket-name>"
  macie_create_kms_key     = true
  macie_kms_key_name       = "<your-macie-kms-key-name>"
  macie_kms_key_users      = ["arn:aws:iam::${local.accounts[local.account_name]}:root"]
  macie_opt_in_regions     = local.opt_in_regions

  # The variable below for Amazon Macie needs to be manually maintained. Please ensure you change the defaults.
  macie_buckets_to_analyze = {
    "us-east-1": ["<FILL_IN_BUCKET_1_NAME>", "<FILL_IN_BUCKET_2_NAME>"],
    "<another-region>": ["<FILL_IN_BUCKET_3_NAME>", "<FILL_IN_BUCKET_4_NAME>"]
  }
}
```

```hcl title=infrastructure-live/security/_global/account-baseline/terragrunt.hcl
inputs {
  # ... previous inputs ...

  # Configures Amazon Macie
  create_macie_bucket      = true
  macie_bucket_name        = "<your-macie-bucket-name>"
  macie_create_kms_key     = true
  macie_kms_key_name       = "<your-macie-kms-key-name>"
  macie_kms_key_users      = ["arn:aws:iam::${local.accounts[local.account_name]}:root"]
  macie_opt_in_regions     = local.opt_in_regions
  macie_administrator_account_id = local.accounts.root

  # The variable below for Amazon Macie needs to be manually maintained. Please ensure you change the defaults.
  macie_buckets_to_analyze = {
    "us-east-1": ["<FILL_IN_BUCKET_1_NAME>", "<FILL_IN_BUCKET_2_NAME>"],
    "<another-region>": ["<FILL_IN_BUCKET_3_NAME>", "<FILL_IN_BUCKET_4_NAME>"]
  }
}
```

All the other child accounts (logs, stage, prod, etc) need the same configuration change as the security account above. Ensure you make that change in all the child accounts.


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Local File Copier","hash":"decb328f25528e87d8fc07b097ac194f"}
##DOCS-SOURCER-END -->

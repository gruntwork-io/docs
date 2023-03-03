---
sidebar_label: Update the Account Baseline modules
---

# Step 3: Update the Account Baseline modules

Next, you will need to update the account baseline (Landing Zone) modules to the version compatible
with v1.5.0 of the CIS AWS Foundations Benchmark.

This guide assumes you are using at least
[v0.40.0](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.40.0)
of the CIS Service Catalog repo, which was released in August 2022.

We strongly recommend upgrading straight to at least [v0.42.9](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.42.9),
instead of each minor version incrementally.

If you are using Patcher, then it will upgrade to the latest available version automatically.


The account baseline modules had one breaking change between versions v0.40.0 and v0.42.9. We must manually run
the migration steps before updating the module versions.

- [v0.42.0](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.42.0): Added support for new AWS region (me-central-1 UAE) to multiregion modules.

## 3.1 Add `me-central-1` to your `multi_region_common.hcl`

For Terragrunt, add `me-central-1` to the `all_aws_regions` local variable in `multi_region_common.hcl`.

```hcl title=multi_region_common.hcl
# ----------------------------------------------------------------------------------------------------------------
# MULTIREGION CONVENIENCE LOCALS
# The following locals are used for constructing multi region provider configurations for the underlying module.
# ----------------------------------------------------------------------------------------------------------------
locals {
  # A list of all AWS regions
  all_aws_regions = [
    ...
    "me-central-1"
  ]

  # ... other vars omitted for brevity ...
```

For Terraform, follow the migration guide in [the migration guide of the release v0.42.0](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.42.0).

## Next step

If you have successfully completed step 3.1 then you should now move to [step 4](step-4-verify-the-code-changes)
in order to verify the changes that have been made. We strongly recommend that you verify the changes that have been
made _before_ executing `terraform/terragrunt apply`.



<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "1df1b78e9d68f5ff116c2faab5b27126"
}
##DOCS-SOURCER-END -->

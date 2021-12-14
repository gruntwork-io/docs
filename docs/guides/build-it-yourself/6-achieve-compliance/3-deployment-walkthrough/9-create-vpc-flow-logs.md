# Create VPC flow logs

The Benchmark recommends enabling [VPC Flow Logs](https://docs.aws.amazon.com/vpc/latest/userguide/flow-logs.html)
for all VPCs in all regions. You can use the
[`vpc` service](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/blob/master/modules/networking/vpc)
in the AWS CIS Service Catalog to create your VPCs. This service is configured for CIS compliance, and as such has VPC flow
logs enabled. See the examples below:

```hcl title=infrastructure-live/root/us-east-1/prod/networking/vpc/terragrunt.hcl
# ---------------------------------------------------------------------------------------------------------------------
# MODULE PARAMETERS
# These are the variables we have to pass in to use the module specified in the terragrunt configuration above
# ---------------------------------------------------------------------------------------------------------------------
inputs = {
  vpc_name         = "app"
  num_nat_gateways = 1
  cidr_block       = local.cidr_block
  kms_key_user_iam_arns = [
    "arn:aws:iam::${local.common_vars.locals.accounts[local.account_name]}:root",
  ]
  eks_cluster_names    = ["${local.name_prefix}-${local.account_name}"]
  tag_for_use_with_eks = true

  allow_administrative_remote_access_cidrs_public_subnets = merge(
    {
      for cidr in local.common_vars.locals.ip_allow_list
      : index(local.common_vars.locals.ip_allow_list, cidr) => cidr
    },
    { length(local.common_vars.locals.ip_allow_list) = local.cidr_block }
  )
}
```

In here you’ll still need to reference the `locals` configuration, and ensure that you’re setting the right `source` to the module, so add this to your `terragrunt.hcl` file too:

```hcl
# Terragrunt will copy the Terraform configurations specified by the source parameter, along with any files in the
# working directory, into a temporary folder, and execute your Terraform commands in that folder. If you're iterating
# locally, you can use --terragrunt-source /path/to/local/checkout/of/module to override the source parameter to a
# local check out of the module for faster iteration.
terraform {
  # We're using a local file path here just so our automated tests run against the absolute latest code. However, when
  # using these modules in your code, you should use a Git URL with a ref attribute that pins you to a specific version:
  # source = "git::git@github.com:gruntwork-io/terraform-aws-cis-service-catalog.git//modules/networking/vpc?ref=v0.20.0"
  source = "${get_parent_terragrunt_dir()}/../../..//modules/networking/vpc"
}

# Include all settings from the root terragrunt.hcl file
include {
  path = find_in_parent_folders()
}

# ---------------------------------------------------------------------------------------------------------------------
# Locals are named constants that are reusable within the configuration.
# ---------------------------------------------------------------------------------------------------------------------
locals {
  # Automatically load common variables shared across all accounts
  common_vars = read_terragrunt_config(find_in_parent_folders("common.hcl"))

  # Extract the name prefix for easy access
  name_prefix = local.common_vars.locals.name_prefix

  # Automatically load account-level variables
  account_vars = read_terragrunt_config(find_in_parent_folders("account.hcl"))

  # Extract the account_name for easy access
  account_name = local.account_vars.locals.account_name

  # Automatically load region-level variables
  region_vars = read_terragrunt_config(find_in_parent_folders("region.hcl"))

  # Extract the region for easy access
  aws_region = local.region_vars.locals.aws_region

  cidr_block = local.common_vars.locals.app_vpc_cidrs[local.account_name]
}
```

To limit the number of flow logs, you may want to use the
[`cloud-nuke defaults-aws`](https://github.com/gruntwork-io/cloud-nuke) command. It will remove the default VPC from
all regions in an account, saving you the hassle of creating flow logs in each default VPC.

## Maintaining compliance by following Monitoring best practices

The Monitoring section of the Benchmark centers on a collection of
[CloudWatch Logs Metric
Filters](https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/MonitoringLogData.html). Gruntwork has simplified this section to a single module: the
[`cloudwatch-logs-metric -filters` wrapper module](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/blob/master/modules/cloudwatch-logs-metric-filters/README.adoc). It will create and configure all the CloudWatch Logs metric filters necessary for
compliance with the Benchmark. Note that when you deploy the CIS account baseline modules, the CloudWatch Logs metric
filters will be created and configured automatically, so that you don’t have to do anything special to enable the metric filters on the
deployed CloudTrail configuration.

Note that you must have a subscriber on the SNS topic to be compliant. Refer to [Subscribe to SNS topic](#subscribe_sns) for details on how to
setup a subscriber to the SNS topics that are created.

## Maintaining compliance by following Networking best practices

To ensure all the networking recommendations are satisfied, use the
[`vpc`](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/tree/master/modules/networking/vpc) (and/or
[`vpc-mgmt`](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/tree/master/modules/networking/vpc-mgmt))
service from Gruntwork’s AWS CIS Service Catalog to create all your VPCs. These services are specifically configured for
CIS compliance, and as such they don’t allow security groups to access ports 22 or 3389 from the world. In addition,
our architecture has a least-privileges-based routing configuration by default.

To meet the 5.1 recommendation, you’ll need to provide values for the `allow_administrative_remote_access_*` variables
when creating VPCs. These variables are used to create appropriate Network ACL Rules. For example, you might create a
VPC using the `vpc` service from `terraform-aws-cis-service-catalog`:

```bash
infrastructure-live
└── root
    └── us-east-1
        └── prod
            └─ networking
                └─ vpc
                    └─ terragrunt.hcl
```

```hcl title=infrastructure-modules/networking/vpc/myvpc/main.tf
terraform { # We're using a local file path here just so our automated tests run against the absolute latest code. However, when
  # using these modules in your code, you should use a Git URL with a ref attribute that pins you to a specific version:
  # source = "git::git@github.com:gruntwork-io/terraform-aws-cis-service-catalog.git//modules/networking/vpc-mgmt?ref=v0.20.0"
  source = "${get_parent_terragrunt_dir()}/../../..//modules/networking/vpc-mgmt"
}
```

```hcl
inputs = {
  vpc_name         = "mgmt"
  num_nat_gateways = 1
  cidr_block       = local.cidr_block
  kms_key_user_iam_arns = [
    "arn:aws:iam::${local.common_vars.locals.accounts[local.account_name]}:root",
  ]

  # Next, pass values for the allow_administrative_remote_access_* variables, thus creating the NACL rules under the hood
  allow_administrative_remote_access_cidrs_private_app_subnets         = { all_app_vpc_cidrs  = module.vpc.vpc_cidr_block }
  allow_administrative_remote_access_cidrs_private_persistence_subnets = { all_app_vpc_cidrs  = module.vpc.vpc_cidr_block }

  allow_administrative_remote_access_cidrs_public_subnets = merge(
    {
      for cidr in local.common_vars.locals.ip_allow_list
      : index(local.common_vars.locals.ip_allow_list, cidr) => cidr
    },
    { length(local.common_vars.locals.ip_allow_list) = local.cidr_block }
  )
}
```

Refer to the [terraform-aws-cis-service-catalog](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/tree/master/examples/for-learning-and-testing/networking/vpc/terraform)
repo for a more comprehensive example.

Finally, run the [`cloud-nuke defaults-aws`](https://github.com/gruntwork-io/cloud-nuke) command to remove all
default security groups from all VPCs in all regions.


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Local File Copier","hash":"986c851c9a5a21bf2d5ae669d55b60d5"}
##DOCS-SOURCER-END -->

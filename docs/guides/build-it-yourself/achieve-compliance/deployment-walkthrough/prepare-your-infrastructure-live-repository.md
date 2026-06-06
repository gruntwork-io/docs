---
sidebar_label: Prepare your infrastructure-live repository
---

# Prepare your infrastructure-live repository

:::info Terragrunt not required

This guide uses [Terragrunt](https://github.com/gruntwork-io/terragrunt) and its associated file and folder
structure to deploy Terraform modules. Please note that **Terragrunt is NOT required for using Terraform modules from
the Gruntwork Infrastructure as Code Library.**

:::

Now we’re going to make some HCL files that store variables to be used across your modules. _You won’t be able to fill
everything out just yet._ Your AWS account IDs will be generated after applying the `account-baseline-root` to the root
account. At that point you can update these files. Create them now to have them ready to use.

For example, assuming `us-east-1` is your default region, your directory structure would look like the following, with
`_global` and `<region>` directories in each account directory:

```bash
infrastructure-live
  └ common.hcl
  └ accounts.json
  └ terragrunt.hcl
  └ dev
  └ logs
  └ stage
  └ security
  └ shared
  └ prod
    └ _global
      └ region.hcl
    └ us-east-1
      └ region.hcl
```

The Terraform modules in the [Service Catalog](https://github.com/gruntwork-io/terraform-aws-service-catalog/)
do not define some blocks that are required for Terraform to operate (e.g., the `provider` and `terraform`
state backend blocks). This is to allow the modules to be flexibly used in different contexts.
We’ll define a root `terragrunt.hcl` that injects these these required blocks.

Create a `terragrunt.hcl` at the root of your infrastructure-live repo and insert the following contents. As you can
see, it references `common`, `account`, and `region` HCL files which we’ll create shortly.

```hcl title=infrastructure-live/terragrunt.hcl
# -----------------------------------------------------------------------------
# TERRAGRUNT CONFIGURATION
# -----------------------------------------------------------------------------

locals {
  common_vars  = read_terragrunt_config("${get_terragrunt_dir()}/common.hcl")
  account_vars = read_terragrunt_config(find_in_parent_folders("account.hcl"))
  region_vars  = read_terragrunt_config(find_in_parent_folders("region.hcl"))

  name_prefix    = local.common_vars.locals.name_prefix
  account_name   = local.account_vars.locals.account_name
  account_id     = local.account_vars.locals.account_id
  default_region = local.common_vars.locals.default_region
  aws_region     = local.region_vars["aws_region"]
}

# -----------------------------------------------------------------------------
# GENERATED PROVIDER BLOCK
# -----------------------------------------------------------------------------

generate "provider" {
  path      = "provider.tf"
  if_exists = "overwrite_terragrunt"
  contents  = <<EOF
provider "aws" {
  region = "${local.aws_region}"
  version = ">= 3.13.0"
  # Only these AWS Account IDs may be operated on by this template
  allowed_account_ids = ["${local.account_id}"]
}
EOF
}

# -----------------------------------------------------------------------------
# GENERATED REMOTE STATE BLOCK
# -----------------------------------------------------------------------------

remote_state {
  backend = "s3"
  generate = {
    path      = "backend.tf"
    if_exists = "overwrite_terragrunt"
  }
  config = {
    encrypt        = true
    bucket         = "${local.name_prefix}-${local.account_name}-${local.aws_region}-terraform-state"
    key            = "${path_relative_to_include()}/terraform.tfstate"
    region         = local.default_region
    dynamodb_table = "terraform-locks"
  }
}

# -----------------------------------------------------------------------------
# GLOBAL PARAMETERS
# -----------------------------------------------------------------------------

inputs = {
  # Set commonly used inputs globally to keep child terragrunt.hcl files DRY
  aws_account_id = local.account_id
  aws_region     = local.aws_region
  name_prefix    = local.name_prefix
}
```

Also create a `common.hcl` file at the root of your `infrastructure-live` repo, with the following contents.

```hcl title=infrastructure-live/common.hcl
locals {
  # TODO: Enter a unique name prefix to set for all resources created in your accounts, e.g., your org name.
  name_prefix = ""
  # TODO: Enter the default AWS region, the same as where the terraform state S3 bucket is currently provisioned.
  default_region = ""

  # TODO: Fill these in after applying the account-baseline-root to the root account.
  config_s3_bucket_name      = ""
  cloudtrail_s3_bucket_name  = ""
  cloudtrail_kms_key_arn     = ""

  # TODO: An accounts map to conveniently store all account IDs.
  # Centrally define all the AWS account IDs. We use JSON so that it can be readily parsed outside of Terraform.
  accounts = jsondecode(file("accounts.json"))
}
```

This file references an `accounts.json`, which you should also create at the root of the repo. _You will fill out
the account IDs after applying the account-baseline-root to the root account._

```json title=infrastructure-live/accounts.json
{
  "dev": "",
  "logs": "",
  "prod": "",
  "security": "",
  "shared": "",
  "stage": ""
}
```

In each account folder (e.g., `infrastructure-live/dev`, `infrastructure-live/shared`, etc.), add a file named
`account.hcl` with the following contents. _Leave `account_id` blank until after the `account-baseline-root` has been
applied to the root account._

```hcl
locals {
  # TODO: Update with the actual information of each account
  # The user friendly name of the AWS account. Usually matches the folder name.
  account_name = ""
  # The 12 digit ID number of your AWS account.
  account_id = ""
}
```

Now in each `infrastructure-live/<account_name>/_global/` folder, create a `region.hcl` file.

```hcl
# Modules in the account _global folder don't live in any specific AWS region, but you still have to send the API calls
# to _some_ AWS region, so here we use the default region for those API calls.
locals {
  aws_region = read_terragrunt_config(find_in_parent_folders("common.hcl")).locals.default_region
}
```

Do the same in each region folder (e.g., `infrastructure-live/dev/us-east-1/`). This `region.hcl` file is a bit different.

```hcl
locals {
# TODO: Enter the region to use for all resources in this subfolder.
  aws_region = ""
}
```


<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "dd0d0202eab6dc1196f9f21fed82cb93"
}
##DOCS-SOURCER-END -->

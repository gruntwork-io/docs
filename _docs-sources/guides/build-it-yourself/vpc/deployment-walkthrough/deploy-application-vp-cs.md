# Deploy application VPCs

Now that you have your management VPC(s) deployed, the next step is to deploy application VPCs to run all of your
services, data stores, and production infrastructure. The process is very similar to deploying the management VPC,
except this time, you’ll be using the [`vpc-app`](https://github.com/gruntwork-io/module-vpc/tree/master/modules/vpc-app)
module from the Gruntwork Infrastructure as Code Library.

:::note

You must be a <span className="js-subscribe-cta">Gruntwork subscriber</span> to access `module-vpc`.

:::

## Create a wrapper module

To deploy the `vpc-app` module, create a wrapper module called `vpc-app` in your `infrastructure-modules` repo:

    infrastructure-modules
      └ networking
        └ vpc-mgmt
        └ vpc-app
          └ main.tf
          └ outputs.tf
          └ variables.tf

Inside of `main.tf`, configure your AWS provider and Terraform settings:

```hcl title="infrastructure-modules/networking/vpc-app/main.tf"
provider "aws" {
  # The AWS region in which all resources will be created
  region = var.aws_region

  # Require a 2.x version of the AWS provider
  version = "~> 2.6"

  # Only these AWS Account IDs may be operated on by this template
  allowed_account_ids = [var.aws_account_id]
}

terraform {
  # The configuration for this backend will be filled in by Terragrunt or via a backend.hcl file. See
  # https://www.terraform.io/docs/backends/config.html#partial-configuration
  backend "s3" {}

  # Only allow this Terraform version. Note that if you upgrade to a newer version, Terraform won't allow you to use an
  # older version, so when you upgrade, you should upgrade everyone on your team and your CI servers all at once.
  required_version = "= 0.12.6"
}
```

Next, use the `vpc-app` module from the Gruntwork Infrastructure as Code Library, making sure to replace the `<VERSION>` placeholder
with the latest version from the [releases page](https://github.com/gruntwork-io/module-vpc/releases):

```hcl title="infrastructure-modules/networking/vpc-app/main.tf"
module "vpc" {
  # Make sure to replace <VERSION> in this URL with the latest module-vpc release
  source = "git@github.com:gruntwork-io/module-vpc.git//modules/vpc-app?ref=<VERSION>"

  vpc_name         = var.vpc_name
  aws_region       = var.aws_region
  cidr_block       = var.cidr_block
  num_nat_gateways = var.num_nat_gateways
}
```

:::note

All of the parameters should be exposed as input variables in `variables.tf`; see this
[variables.tf](https://github.com/gruntwork-io/infrastructure-modules-multi-account-acme/blob/master/networking/vpc-app/variables.tf)
file for reference. This will allow you to set those variables to different values in different environments or AWS
accounts.

:::

You’ll also want to configure the NACLs for this VPC using the `vpc-app-network-acls` module from the Gruntwork
Infrastructure as Code Library:

```hcl title="infrastructure-modules/networking/vpc-app/main.tf"
module "vpc_network_acls" {
  source = "git@github.com:gruntwork-io/module-vpc.git//modules/vpc-app-network-acls?ref=<VERSION>"

  vpc_id      = module.vpc.vpc_id
  vpc_name    = module.vpc.vpc_name
  vpc_ready   = module.vpc.vpc_ready
  num_subnets = module.vpc.num_availability_zones

  public_subnet_ids              = module.vpc.public_subnet_ids
  private_app_subnet_ids         = module.vpc.private_app_subnet_ids
  private_persistence_subnet_ids = module.vpc.private_persistence_subnet_ids

  public_subnet_cidr_blocks              = module.vpc.public_subnet_cidr_blocks
  private_app_subnet_cidr_blocks         = module.vpc.private_app_subnet_cidr_blocks
  private_persistence_subnet_cidr_blocks = module.vpc.private_persistence_subnet_cidr_blocks
}
```

If you wish to peer this VPC to your management VPC, you first need to get all the management VPC details, such as the
VPC ID and CIDR block. Instead of hard-coding these, you can retrieve them using a data source such as
[`aws_vpc`](https://www.terraform.io/docs/providers/aws/d/vpc.html) or, to read the data straight from the Terraform state
of the management VPC, you can use the
[`terraform_remote_state`](https://www.terraform.io/docs/providers/terraform/d/remote_state.html) data source:

```hcl title="infrastructure-modules/networking/vpc-app/main.tf"
data "terraform_remote_state" "mgmt_vpc" {
  backend = "s3"

  config {
    region = var.terraform_state_aws_region
    bucket = var.terraform_state_s3_bucket
    key    = "${var.aws_region}/mgmt/vpc/terraform.tfstate"
  }
}
```

You can then use the [`vpc-peering`](https://github.com/gruntwork-io/module-vpc/tree/master/modules/vpc-peering) module to
create a VPC peering connection and all the necessary route table entries between the application and management VPCs:

```hcl title="infrastructure-modules/networking/vpc-app/main.tf"
module "mgmt_vpc_peering_connection" {
  source = "git@github.com:gruntwork-io/module-vpc.git//modules/vpc-peering?ref=v0.6.0"

  # Assume the first listed AWS Account Id is the one that should own the peering connection
  aws_account_id = var.aws_account_id

  origin_vpc_id              = data.terraform_remote_state.mgmt_vpc.outputs.vpc_id
  origin_vpc_name            = data.terraform_remote_state.mgmt_vpc.outputs.vpc_name
  origin_vpc_cidr_block      = data.terraform_remote_state.mgmt_vpc.outputs.vpc_cidr_block
  origin_vpc_route_table_ids = concat(
    data.terraform_remote_state.mgmt_vpc.outputs.private_subnet_route_table_ids,
    [data.terraform_remote_state.mgmt_vpc.outputs.public_subnet_route_table_id]
  )

  # We should be able to compute these numbers automatically, but can't due to a Terraform bug:
  # https://github.com/hashicorp/terraform/issues/3888. Therefore, we make some assumptions: there is one
  # route table per availability zone in private subnets and just one route table in public subnets.
  num_origin_vpc_route_tables = module.vpc.num_availability_zones + 1

  destination_vpc_id              = module.vpc.vpc_id
  destination_vpc_name            = module.vpc.vpc_name
  destination_vpc_cidr_block      = module.vpc.vpc_cidr_block
  destination_vpc_route_table_ids = concat(
    [module.vpc.public_subnet_route_table_id],
    module.vpc.private_app_subnet_route_table_ids,
    module.vpc.private_persistence_route_table_ids,
  )

  # We should be able to compute these numbers automatically, but can't due to a Terraform bug:
  # https://github.com/hashicorp/terraform/issues/3888. Therefore, we make some assumptions: there is one
  # route table per availability zone in private subnets and just one route table in public subnets.
  num_destination_vpc_route_tables = (module.vpc.num_availability_zones * 2) + 1
}
```

You’ll also need to update the NACLs to allow access from the management VPC:

```hcl title="infrastructure-modules/networking/vpc-app/main.tf"
module "vpc_network_acls" {
  source = "git@github.com:gruntwork-io/module-vpc.git//modules/vpc-app-network-acls?ref=<VERSION>"

  # ... (other params omitted) ...

  allow_access_from_mgmt_vpc = true
  mgmt_vpc_cidr_block        = data.terraform_remote_state.mgmt_vpc.vpc_cidr_block
}
```

Finally, expose all of the `vpc-app` module outputs as outputs of your `vpc-app` wrapper module. There are a large
number of outputs, so see this
[outputs.tf](https://github.com/gruntwork-io/infrastructure-modules-multi-account-acme/blob/master/networking/vpc-app/outputs.tf)
file for reference.

## Test your wrapper module

At this point, you’ll want to test your code. See [Manual tests for Terraform code](/iac/usage/using-the-library#testing-terraform-only) for instructions.

## Merge and release your wrapper module

Once the module is working the way you want, submit a pull request, get your changes merged into the `master` branch,
and create a new versioned release by using a Git tag. For example, to create a `v0.4.0` release:

```bash
git tag -a "v0.4.0" -m "Created vpc-app module"
git push --follow-tags
```

## Configure the wrapper module for each environment

In each account where you want to deploy an application VPC, you will need to:

1.  **Prepare the module.** Create a `terragrunt.hcl` file in `infrastructure-live` under the file path
    `<ACCOUNT>/<REGION>/<ENVIRONMENT>/networking/vpc-app`. For example, if you are deploying this VPC in your
    "production" account, in the `us-east-2` region, and this is your "prod" environment, the file path would look like
    this:

        infrastructure-live
          └ production
            └ us-east-2
              └ prod
                └ networking
                  └ vpc-app
                    └ terragrunt.hcl

    Point the `source` URL in your `terragrunt.hcl` file to your `vpc-app` wrapper module in the `infrastructure-modules`
    repo, setting the `ref` param to the version you released earlier:

    ```hcl title="infrastructure-live/production/us-east-2/prod/networking/vpc-app/terragrunt.hcl"
    terraform {
      source = "git@github.com/<YOUR_ORG>/infrastructure-modules.git//networking/vpc-app?ref=v0.4.0"
    }
    ```

2.  **Set the variables for the VPC in that environment.** Namely, set a unique VPC name and CIDR block for each VPC, and
    set the number of gateways based on your availability needs in that environment (typically, 1 NAT Gateway for
    pre-production environments and 2-3 NAT Gateways for production environments). You can set these values in the
    `inputs = { ... }` block of `terragrunt.hcl`. Example:

    ```hcl title="infrastructure-live/production/us-east-2/prod/networking/vpc-app/terragrunt.hcl"
    inputs = {
      aws_region       = "us-east-2"
      aws_account_id   = "111122223333"
      vpc_name         = "app-prod"
      cidr_block       = "10.10.0.0/16"
      num_nat_gateways = 3
    }
    ```

3.  **Configure the Terraform backend.**:

    ```hcl title="infrastructure-live/production/us-east-2/prod/networking/vpc-app/terragrunt.hcl"
    include {
      path = find_in_parent_folders()
    }
    ```

## Deploy the wrapper module for each environment

Deploy the VPC by running `terragrunt apply`:

```bash
cd infrastructure-live/production/us-east-2/prod/networking/vpc-app
terragrunt apply
```

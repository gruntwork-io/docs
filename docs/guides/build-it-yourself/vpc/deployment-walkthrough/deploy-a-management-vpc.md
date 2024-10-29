# Deploy a management VPC

The first step is to deploy a management VPC for DevOps tooling, such as a CI server or a bastion host. To do this, you
can use the [`vpc-mgmt`](https://github.com/gruntwork-io/module-vpc/tree/master/modules/vpc-mgmt) module from the
Gruntwork Infrastructure as Code Library.

:::note

You must be a <span className="js-subscribe-cta">Gruntwork subscriber</span> to access `module-vpc`.

:::

This module assumes you do not run any data stores in the management VPC, so it solely contains two tiers of subnets,
public and private-app. If you will be deploying data stores in the management VPC (e.g., a relational database for
SonarQube), then use [`vpc-app`](https://github.com/gruntwork-io/module-vpc/tree/master/modules/vpc-app) instead, which has
a third private-persistence subnet tier.

## Create a wrapper module

To deploy the `vpc-mgmt` module, create a _wrapper module_ called `vpc-mgmt` in your `infrastructure-modules` repo:

    infrastructure-modules
      └ networking
        └ vpc-mgmt
          └ main.tf
          └ outputs.tf
          └ variables.tf

Inside of `main.tf`, configure your AWS provider and Terraform settings:

```hcl title="infrastructure-modules/networking/vpc-mgmt/main.tf"
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

Next, use the `vpc-mgmt` module from the Gruntwork Infrastructure as Code Library, making sure to replace the `<VERSION>` placeholder
with the latest version from the [releases page](https://github.com/gruntwork-io/module-vpc/releases):

```hcl title="infrastructure-modules/networking/vpc-mgmt/main.tf"
module "vpc" {
  # Make sure to replace <VERSION> in this URL with the latest module-vpc release
  source = "git@github.com:gruntwork-io/module-vpc.git//modules/vpc-mgmt?ref=<VERSION>"

  vpc_name         = var.vpc_name
  aws_region       = var.aws_region
  cidr_block       = var.cidr_block
  num_nat_gateways = var.num_nat_gateways
}
```

:::note

All of the parameters should be exposed as input variables in `variables.tf`; see this
[variables.tf](https://github.com/gruntwork-io/infrastructure-modules-multi-account-acme/blob/master/networking/vpc-mgmt/variables.tf)
file for reference. This will allow you to set those variables to different values in different environments or AWS
accounts.

:::

You’ll also want to configure the NACLs for this VPC using the `vpc-mgmt-network-acls` module from the Gruntwork
Infrastructure as Code Library:

```hcl title="infrastructure-modules/networking/vpc-mgmt/main.tf"
module "vpc_network_acls" {
  # Make sure to replace <VERSION> in this URL with the latest module-vpc release
  source = "git@github.com:gruntwork-io/module-vpc.git//modules/vpc-mgmt-network-acls?ref=<VERSION>"

  vpc_id      = module.vpc.vpc_id
  vpc_name    = module.vpc.vpc_name
  vpc_ready   = module.vpc.vpc_ready
  num_subnets = module.vpc.num_availability_zones

  public_subnet_ids  = module.vpc.public_subnet_ids
  private_subnet_ids = module.vpc.private_subnet_ids

  public_subnet_cidr_blocks  = module.vpc.public_subnet_cidr_blocks
  private_subnet_cidr_blocks = module.vpc.private_subnet_cidr_blocks
}
```

Finally, expose all of the `vpc-mgmt` module outputs as outputs of your `vpc-mgmt` wrapper module. There are a large
number of outputs, so see this
[outputs.tf](https://github.com/gruntwork-io/infrastructure-modules-multi-account-acme/blob/master/networking/vpc-mgmt/outputs.tf)
file for reference.

## Test your wrapper module

At this point, you’ll want to test your code. See [Manual tests for Terraform code](/library/usage/using-the-library#testing-terraform-only)
for instructions.

## Merge and release your wrapper module

Once the module is working the way you want, submit a pull request, get your changes merged into the `master` branch,
and create a new versioned release by using a Git tag. For example, to create a `v0.3.0` release:

```bash
git tag -a "v0.3.0" -m "Created vpc-mgmt module"
git push --follow-tags
```

## Pick the deployment environments

The next step is to deploy your wrapper `vpc-mgmt` module. You can either deploy it in one AWS account or multiple:

<div className="dlist">

#### One management VPC

You could deploy a single management VPC and then peer it to all of your application VPCs. This is the simplest
approach, but using the same management VPC for pre-production and production environments carries some risk: first,
most companies are more lax with security for pre-production, but if an attacker can leverage that to get access to this
single management VPC, they will also have access to prod; second, having this single management VPC makes it more
likely that someone on your team will accidentally affect production while they think they are working on
pre-production (e.g., delete a database table in the wrong environment!).

#### Multiple management VPCs

An alternative is to run multiple management VPCs: typically, you have one that is peered to all of your
pre-production environments and one that is peered to all your production environments; alternatively, you could have
one management VPC for each of your environments. This way, you can keep production and non-production environments
completely separate, reducing the risk from both external attackers and mistakes made by internal employees. The
drawback to this approach is that you have more infrastructure to manage: more VPCs, more peering connections, more
route table entries, more bastion hosts, and more credentials.

</div>

## Configure the wrapper module for each environment

:::info

This guide will use [Terragrunt](https://github.com/gruntwork-io/terragrunt) and its associated file and folder
structure to deploy Terraform modules. Please note that **Terragrunt is NOT required for using Terraform modules from
the Gruntwork Infrastructure as Code Library.**

:::

In each account where you want to deploy a management VPC, you will need to:

1.  **Prepare the module.** Create a `terragrunt.hcl` file in `infrastructure-live` under the file path
    `<ACCOUNT>/<REGION>/<ENVIRONMENT>/networking/vpc-mgmt`. For example, if you are deploying this VPC in your
    "production" account, in the `us-east-2` region, and this is your "prod" environment, the file path would look like
    this:

        infrastructure-live
          └ production
            └ us-east-2
              └ prod
                └ networking
                  └ vpc-mgmt
                    └ terragrunt.hcl

    Point the `source` URL in your `terragrunt.hcl` file to your `vpc-mgmt` wrapper module in the `infrastructure-modules`
    repo, setting the `ref` param to the version you released earlier:

    ```hcl title="infrastructure-live/production/us-east-2/prod/networking/vpc-mgmt/terragrunt.hcl"
    terraform {
      source = "git@github.com/<YOUR_ORG>/infrastructure-modules.git//networking/vpc-mgmt?ref=v0.3.0"
    }
    ```

2.  **Set the variables for the VPC in that environment.** Namely, set a unique VPC name and CIDR block for each VPC, and
    set the number of gateways based on your availability needs in that environment (typically, 1 NAT Gateway for
    pre-production environments and 2-3 NAT Gateways for production environments). You can set these values in the
    `inputs = { ... }` block of `terragrunt.hcl`. Example:

    ```hcl title="infrastructure-live/production/us-east-2/prod/networking/vpc-mgmt/terragrunt.hcl
    inputs = {
      aws_region       = "us-east-2"
      aws_account_id   = "111122223333"
      vpc_name         = "mgmt-prod"
      cidr_block       = "10.0.0.0/16"
      num_nat_gateways = 3
    }
    ```

3.  **Configure the Terraform backend.** Pull in the [backend](https://www.terraform.io/docs/backends/) configuration from a
    root `terragrunt.hcl` file that you `include` in each child `terragrunt.hcl`:

    ```hcl title="infrastructure-live/production/us-east-2/prod/networking/vpc-mgmt/terragrunt.hcl"
    include {
      path = find_in_parent_folders()
    }
    ```

## Deploy the wrapper module for each environment

Deploy the VPC by running `terragrunt apply`:

```bash
cd infrastructure-live/production/us-east-2/prod/networking/vpc-mgmt
terragrunt apply
```


<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "845f5b2421d130f5441f226c5a9ee3a9"
}
##DOCS-SOURCER-END -->

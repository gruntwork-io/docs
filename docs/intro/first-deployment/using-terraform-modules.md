# Prepare Your Module

This section will show you how to use Terraform modules from the Gruntwork Infrastructure as Code Library. As an illustrative example,
we’ll deploy the `vpc-app` Terraform module from [terraform-aws-vpc](https://github.com/gruntwork-io/terraform-aws-vpc).

:::caution

You must be a <span class="js-subscribe-cta">Gruntwork subscriber</span> to access `terraform-aws-vpc`.

:::

You can use this module to deploy a production-grade VPC on AWS. For full background information on VPCs, check
out [How to deploy a production-grade VPC on AWS](/docs/guides/build-it-yourself/vpc/).

## Create a wrapper module

The Terraform modules in the Gruntwork Infrastructure as Code Library are intentionally designed to be unopinionated, so they do not
configure `provider` or `backend` settings. Moreover, you will often use multiple modules from the Infrastructure as Code Library,
rather than just one at a time. Therefore, the canonical way to consume a Terraform module from the Gruntwork
Infrastructure as Code Library is to create a _wrapper module_ in one of your own Git repos.

Let’s assume you have a repo called `infrastructure-modules` and create a `vpc-app` wrapper module in it:

    infrastructure-modules
      └ networking
        └ vpc-app
          └ main.tf
          └ outputs.tf
          └ variables.tf

## Configure your providers

Inside of `main.tf`, configure whatever Terraform providers you’re using. Since the `vpc-app` module you’re using in
this guide is an AWS module, you’ll need to configure the AWS provider:

```hcl title=infrastructure-modules/networking/vpc-app/main.tf
provider "aws" {
  # The AWS region in which all resources will be created
  region = var.aws_region

  # Require a 2.x version of the AWS provider
  version = "~> 2.6"

  # Only these AWS Account IDs may be operated on by this template
  allowed_account_ids = [var.aws_account_id]
}
```

This configures the AWS provider as follows:

<div className="dlist">

#### Use a specific AWS region

The AWS region is configured via the `aws_region` input variable (you’ll declare this shortly). This allows you to
deploy this module in multiple regions.

#### Pin the AWS provider version

The code above ensures that you always get AWS provider version `2.x` and won’t accidentally get version `3.x` in the
future, which would be backwards incompatible. We recommend pinning the versions for all providers you’re using.

#### Pin AWS account IDs

The code above will only allow you to run it against the AWS account with ID passed in via the `aws_account_id` input
variable (you’ll declare this shortly). This is an extra safety measure to ensure you don’t accidentally authenticate
to the wrong AWS account while deploying this code—e.g., so you don’t accidentally deploy changes intended for
staging to production (for more info on working with multiple AWS accounts, see
[How to Configure a Production Grade AWS Account Structure](/docs/guides/build-it-yourself/landing-zone/)).

</div>

Let’s add the corresponding input variables in `variables.tf`:

```hcl title=infrastructure-modules/networking/vpc-app/variables.tf
variable "aws_region" {
  description = "The AWS region in which all resources will be created"
  type        = string
}

variable "aws_account_id" {
  description = "The ID of the AWS Account in which to create resources."
  type        = string
}
```

## Configure Terraform

Next, configure Terraform itself in `main.tf`:

```hcl title=infrastructure-modules/networking/vpc-app/main.tf
terraform {
  # Partial configuration for the backend: https://www.terraform.io/docs/backends/config.html#partial-configuration
  backend "s3" {}

  # Only allow this Terraform version. Note that if you upgrade to a newer version, Terraform won't allow you to use an
  # older version, so when you upgrade, you should upgrade everyone on your team and your CI servers all at once.
  required_version = "= 0.12.6"
}
```

This configures Terraform as follows:

<div className="dlist">

#### Configure a backend

The code above configures a _backend_, which is a shared location where Terraform state can be stored and accessed by
your team. You can use any of the [supported backends](https://www.terraform.io/docs/backends/types/index.html) (the
example above uses S3, which is a good choice for AWS users). See
[How to manage Terraform state](https://blog.gruntwork.io/how-to-manage-terraform-state-28f5697e68fa) for more info.

#### Partial configuration

The backend uses a _[partial configuration](https://www.terraform.io/docs/backends/config.html#partial-configuration)_,
which means most of the backend configuration (e.g., which S3 bucket and path to use) will be specified from outside
of the code. You’ll see an example of this soon.

#### Pin the Terraform version

The code above will ONLY allow you to run it with a specific Terraform version. This is a safety measure to ensure
you don’t accidentally pick up a new version of Terraform until you’re ready. This is important because (a) Terraform
is a pre 1.0.0 tool, so even patch version number bumps (e.g., `0.12.6` → `0.12.7`) are sometimes backwards
incompatible or buggy and (b) once you’ve upgraded to a newer version, Terraform will no longer allow you to deploy
that code with any older version. For example, if a single person on your team upgrades to `0.12.7` and runs `apply`,
then you’ll no longer be able to use the state file with `0.12.6`, and you’ll be forced to upgrade everyone on your
team and all your CI servers to `0.12.7`. It’s best to do this explicitly, rather than accidentally, so we recommend
pinning Terraform versions.

</div>

## Use the modules from the Gruntwork Infrastructure as Code Library

Now you can pull in the Terraform modules you want from the Gruntwork Infrastructure as Code Library as follows:

```hcl title=infrastructure-modules/networking/vpc-app/main.tf
module "vpc" {
  # Make sure to replace <VERSION> in this URL with the latest terraform-aws-vpc release
  source = "git@github.com:gruntwork-io/terraform-aws-vpc.git//modules/vpc-app?ref=<VERSION>"

  aws_region       = var.aws_region
  vpc_name         = var.vpc_name
  cidr_block       = var.cidr_block
  num_nat_gateways = var.num_nat_gateways
}
```

This code does the following:

<div className="dlist">

#### Terraform module support

This code pulls in a module using Terraform’s native `module` functionality. For background info, see
[How to create reusable infrastructure with Terraform modules](https://blog.gruntwork.io/how-to-create-reusable-infrastructure-with-terraform-modules-25526d65f73d).

#### SSH Git URL

The `source` URL in the code above uses a Git URL with SSH authentication (see
[module sources](https://www.terraform.io/docs/modules/sources.html) for all the types of `source` URLs you can use).
If you have established your account and linked your GitHub ID according to the instruction in [Accessing the Dev Portal](/docs/intro/dev-portal/create-account), this will allow you to access private repos in the Gruntwork
Infrastructure as Code Library without having to hard-code a password in your Terraform code.

#### Versioned URL

Note the `?ref=<VERSION>` at the end of the `source` URL. This parameter allows you to pull in a specific version of
each module so that you don’t accidentally pull in (potentially backwards incompatible code) in the future. You
should replace `<VERSION>` with the latest version from the releases page of the repo you’re using (e.g., here’s
[the releases page for terraform-aws-vpc](https://github.com/gruntwork-io/terraform-aws-vpc/releases)).

#### Module arguments

Below the `source` URL, you’ll need to pass in the module-specific arguments. You can find all the required and
optional variables defined in `vars.tf` (old name) or `variables.tf` (new name) of the module (e.g.,
here’s [the variables.tf for vpc-app](https://github.com/gruntwork-io/terraform-aws-vpc/blob/master/modules/vpc-app/vars.tf)).
The code above sets these to input variables (which you’ll define shortly) so that you can use different values in
different environments.

</div>

Let’s add the new input variables in `variables.tf`:

```hcl title=infrastructure-modules/networking/vpc-app/variables.tf
variable "vpc_name" {
  description = "Name of the VPC. Examples include 'prod', 'dev', 'mgmt', etc."
  type        = string
}

variable "cidr_block" {
  description = "The IP address range of the VPC in CIDR notation. A prefix of /16 is recommended. Do not use a prefix higher than /27. Example: '10.100.0.0/16'."
  type        = string
}

variable "num_nat_gateways" {
  description = "The number of NAT Gateways to launch for this VPC. For production VPCs, multiple NAT Gateways are recommended."
  type        = number
}
```

You may also want to add useful output variables in `outputs.tf`:

```hcl title=infrastructure-modules/networking/vpc-app/outputs.tf
output "vpc_name" {
  description = "The VPC name"
  value       = module.vpc.vpc_name
}

output "vpc_id" {
  description = "The VPC ID"
  value       = module.vpc.vpc_id
}

output "vpc_cidr_block" {
  description = "The VPC CIDR block"
  value       = module.vpc.vpc_cidr_block
}

output "public_subnet_cidr_blocks" {
  description = "The CIDR blocks of the public subnets"
  value       = module.vpc.public_subnet_cidr_blocks
}

output "private_app_subnet_cidr_blocks" {
  description = "The CIDR blocks of the private app subnets"
  value       = module.vpc.private_app_subnet_cidr_blocks
}

output "private_persistence_subnet_cidr_blocks" {
  description = "The CIDR blocks of the private persistence subnets"
  value       = module.vpc.private_persistence_subnet_cidr_blocks
}

output "public_subnet_ids" {
  description = "The IDs of the public subnets"
  value       = module.vpc.public_subnet_ids
}

output "private_app_subnet_ids" {
  description = "The IDs of the private app subnets"
  value       = module.vpc.private_app_subnet_ids
}

output "private_persistence_subnet_ids" {
  description = "The IDs of the private persistence subnets"
  value       = module.vpc.private_persistence_subnet_ids
}
```


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Local File Copier","hash":"6421545b7e056decc53c0fa6cd23e401"}
##DOCS-SOURCER-END -->

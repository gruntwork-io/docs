# Defining an envcommon module

Now that you have an understanding of [what envcommon is](index.md), you can develop your own envcommon module.

By default, all envcommon modules should be placed in a directory named `_envcommon`. Beyond that, it is up to you as a developer to determine how to structure the code. Gruntwork recommends structuring your envcommon directory by creating directories for each resource category (e.g., storage, networking) then using a name for the Terragrunt file that represents the resource(s) it will create.

For example, if you are defining an envcommon module for a AWS VPC in which you will deploy applications, you might put it in a directory named `networking` and a file named `vpc-app.hcl`, resulting in `_envcommon/networking/vpc-app.hcl`.

Next, we'll fine the envcommon module. It's important to remember that a Terragrunt module is structured the same as an Terragrunt file. The only difference is that this module defines default variable values and locals that can be used in any environment.

## The Terraform block

```hcl title=_envcommon/networking/vpc-app.hcl
terraform {
  source = "${local.source_base_url}?ref=v0.47.1"
}
```

## Locals

```hcl title=_envcommon/networking/vpc-app.hcl
locals {
    source_base_url = "git::ssh://git@github.com/gruntwork-io/terraform-aws-service-catalog.git//modules/networking/vpc"

    account_name = local.account_vars.locals.account_name
    region = "us-east-1"
}
```

## Specifying variable values

```hcl title=_envcommon/networking/vpc-app.hcl
inputs = {
    // cidr_block is a required input but note we are excluding it!
    vpc_name                                  = local.account_name
    aws_region                                = local.region
    num_nat_gateways                          = 1
}
```

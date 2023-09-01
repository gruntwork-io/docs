# Defining module defaults

Now that you have an understanding of [what module defaults are](index.md), you can develop your own defaults module.

All of your defaults modules should be placed in a directory named `_module_defaults`. Beyond that, it is up to you as a developer to determine how to structure the code. Gruntwork recommends structuring your module defaults directory by creating directories for each resource category (e.g., storage, networking) then using a name for the Terragrunt file that represents the resource(s) it will create.

For example, if you are defining a defaults module for an AWS VPC in which you will deploy applications, you might put it in a directory named `networking` and a file named `vpc-app.hcl`, resulting in `_module_defaults/networking/vpc-app.hcl`.

Next, we’ll define the defaults module. It’s important to remember that a Terragrunt module is structured the same as a Terragrunt file. The only difference is that this module defines default variable values and locals that can be used in any environment.

## The Terraform block

First, define a `terraform` block. This allows you to specify the source URL for the terraform module you are using. Gruntwork recommends using a `local` block to define the source URL. This allows you to define the source URL for the module once, in your defaults module, then expose that variable to any module that leverages it. After the source URL, we specify the module version.

```hcl title=_module_defaults/networking/vpc-app.hcl
terraform {
  source = "${local.source_base_url}?ref=v0.104.19"
}
```

## Locals

As with all Terragrunt modules, you can specify a `locals` block in a defaults module. Locals allow you to assign an expression to a value, such as setting a common region name or dynamically reading values from configuration files. The example below shows how you can read account-specific information from another terragrunt file, then use that information as a local.

```hcl title=_module_defaults/networking/vpc-app.hcl
locals {
    source_base_url = "git::ssh://git@github.com/gruntwork-io/terraform-aws-service-catalog.git//modules/networking/vpc"

    account_vars = read_terragrunt_config(find_in_parent_folders("account.hcl"))
    account_name = local.account_vars.locals.account_name
}
```

## Specifying variable values

Finally, you can define inputs. This is where the module defaults pattern really starts to demonstrate value by keeping your code DRY.

In the example block below, we’ve set default values for the `vpc_name` and `num_nat_gateways` variables. A quick inspection of the [`vpc-app`](../../../reference/modules/terraform-aws-vpc/vpc-app/) module shows us that we’re only missing one additional required variable — `cidr_block`. This means that consumers of our defaults module only need to specify a value for one input variable, a 66% reduction! You could even expand this example to always use the same CIDR block, allowing consumers to override it should they require a different block.

```hcl title=_module_defaults/networking/vpc-app.hcl
inputs = {
    // cidr_block is a required input but note we are excluding it!
    vpc_name                                  = local.account_name
    num_nat_gateways                          = 1
}
```

Our example is relatively straightforward — our module only has three required variables, but there are actually 79 more optional variables. As you expand your usage to supply values to more optional values, the amount of code you don’t have to write increases significantly.

## Wrapping up

Now that you know how to develop an defaults module, let’s dive in to how you can use one to deploy resources to a specific environment.


<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "47787b1bf1d264280a47675fb4b4cce1"
}
##DOCS-SOURCER-END -->

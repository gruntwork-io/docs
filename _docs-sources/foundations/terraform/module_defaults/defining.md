# Defining Module Defaults

Now that you have an understanding of [what module defaults are](index.md), you can develop your own Module Defaults module.

By default, all Module Defaults modules should be placed in a directory named `module_defaults`. Beyond that, it is up to you as a developer to determine how to structure the code. Gruntwork recommends structuring your Module Defaults directory by creating directories for each resource category (e.g., storage, networking) then using a name for the Terragrunt file that represents the resource(s) it will create.

For example, if you are defining an Module Defaults module for a AWS VPC in which you will deploy applications, you might put it in a directory named `networking` and a file named `vpc-app.hcl`, resulting in `module_defaults/networking/vpc-app.hcl`.

Next, we'll fine the Module Defaults module. It's important to remember that a Terragrunt module is structured the same as an Terragrunt file. The only difference is that this module defines default variable values and locals that can be used in any environment.

## The Terraform block

First, define a `terraform` block. This allows you to specify the source URL for the terraform module you are using. Gruntwork recommends using a `local` block to define the source url. This allows you to define the source url for the module once, in Module Defaults, then expose that variable up to any module that leverages this Module Defaults module. After the source url, we specify a version of the module.

```hcl title=module_defaults/networking/vpc-app.hcl
terraform {
  source = "${local.source_base_url}?ref=v0.104.19"
}
```

## Locals

As with all Terragrunt modules, you can specify a `locals` block in an Module Defaults module. Locals allows you to assign an expression to a value, such as setting a common region name or dynamically reading values from configuration files. In the example below, we show how you can read account specific information from another terragrunt file, then use that information as a local.

```hcl title=module_defaults/networking/vpc-app.hcl
locals {
    source_base_url = "git::ssh://git@github.com/gruntwork-io/terraform-aws-service-catalog.git//modules/networking/vpc"

    account_vars = read_terragrunt_config(find_in_parent_folders("account.hcl"))
    account_name = local.account_vars.locals.account_name
}
```

## Specifying variable values

Finally, you can define inputs. This is where the Module Defaults pattern really starts to demonstrate value by keeping your code DRY.

In the example block below, we've set default values for the `vpc_name` and `num_nat_gateways` variables. A quick inspection of the [`vpc-app`](../../../reference/modules/terraform-aws-vpc/vpc-app/) module shows us that we're only missing one additional required variable — `cidr_block`. This means that consumers of our Module Defaults module only need to specify a value for one input variable, a 66% reduction! You could even expand this example to always use the same CIDR block, allowing the users to override it should they require a different block.

```hcl title=module_defaults/networking/vpc-app.hcl
inputs = {
    // cidr_block is a required input but note we are excluding it!
    vpc_name                                  = local.account_name
    num_nat_gateways                          = 1
}
```
Our example is relatively straight forward — our module only has three required variables, but there are actually 79 more optional variables. As you expand your usage to supply values to more optional values, the amount of code you don't have to write increases significantly.

## Wrapping up

Now that you know how to develop an Module Defaults module, let's dive in to how you can use one to deploy resources to a specific environment.

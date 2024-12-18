# Tutorial: Module Defaults

## Defining module defaults

Now that you understand [what module defaults are](/2.0/docs/library/concepts/module-defaults), you can develop your own defaults module.  

Begin by placing all default modules in a `_module_defaults` directory. Beyond that, the structure of the code is up to you as a developer. Gruntwork recommends organizing the module defaults directory by creating subdirectories for each resource category (e.g., storage, networking) and naming the Terragrunt files to represent the resource(s) they configure. 

For example, if you define a defaults module for an AWS VPC where applications will be deployed, consider placing it in a directory named ‘networking’ and naming the file ‘vpc-app.hcl’. This structure results in _module_defaults/networking/vpc-app.hcl.

Next, we’ll define the defaults module. It is important to note that a Terragrunt module follows the same structure as a standard Terragrunt file. The defaults module defines default variable values and locals that can be reused in any environment.  

### The Terraform block

First, define a `terraform` block. This block allows you to specify the source URL for the Terraform module you are using. Gruntwork recommends using a `local` block to define the source URL. This approach lets you define the module’s source URL once in your defaults module and expose it as a variable to any module that references it. After defining the source URL, specify the desired module version.  

```hcl title=_module_defaults/networking/vpc-app.hcl
terraform {
  source = "${local.source_base_url}?ref=v0.104.19"
}
```

### Locals

As with all Terragrunt modules, you can define a `locals` block in a defaults module. Locals allow you to assign expressions to values, such as setting a common region name or dynamically reading values from configuration files. The example below demonstrates how to read account-specific information from another Terragrunt file and use that information as a local.  

```hcl title=_module_defaults/networking/vpc-app.hcl
locals {
    source_base_url = "git::ssh://git@github.com/gruntwork-io/terraform-aws-service-catalog.git//modules/networking/vpc"

    account_vars = read_terragrunt_config(find_in_parent_folders("account.hcl"))
    account_name = local.account_vars.locals.account_name
}
```

### Specifying variable values

Finally, you can define inputs, where the module defaults pattern demonstrates its value by keeping your code DRY.

In the example block below, we set default values for the `vpc_name` and `num_nat_gateways` variables. A quick inspection of the [`vpc-app`](/reference/modules/terraform-aws-vpc/vpc-app/) module reveals that only one additional required variable — `cidr_block` — remains unspecified. As a result, consumers of the defaults module need to provide just one input variable, achieving a 66% reduction in required inputs. You can build on this example by setting a default CIDR block while giving consumers the option to override it with a different value if needed.


```hcl title=_module_defaults/networking/vpc-app.hcl
inputs = {
    // cidr_block is a required input but note we are excluding it!
    vpc_name                                  = local.account_name
    num_nat_gateways                          = 1
}
```

Our example is relatively straightforward — the module only has three required variables but includes 79 additional optional variables. As you expand your usage to supply values for more of these optional variables, the amount of code you avoid writing increases significantly.  

### Wrapping up

Now that you understand how to develop a defaults module, let’s explore how you can use one to deploy resources to a specific environment.  

## Using Module Defaults

### Infrastructure units

An infrastructure unit is the Gruntwork term for deploying an infrastructure-as-code module in a single environment. For example, deploying the [`vpc-app`](/reference/modules/terraform-aws-vpc/vpc-app/) module in your development AWS account constitutes a single infrastructure unit.  

In this section, we’ll outline the approach Gruntwork uses for leveraging defaults modules as infrastructure units. When you purchase a DevOps Foundation, the generated repository containing your infrastructure-as-code is automatically configured to use this approach.  

### The Terraform block

Gruntwork recommends that infrastructure unit definitions include a `terraform` block and the `terraform` block defined in the underlying defaults module. By doing so, users can change module versions granularly across environments, avoiding a global change that impacts all environments simultaneously.

To ensure consistency with the defaults module, reference the `source_base_url` value from the defaults module `include` block (explained in the next section) and specify the desired release version after `ref`. In the example below, we reference the `base_source_url` from the defaults module and override the version to `v0.47.0`.  

```hcl title=/dev/us-east-1/dev/networking/vpc/terragrunt.hcl
terraform {
  source = "${include.Module Defaults.locals.source_base_url}?ref=v0.104.19"
}
```

### Including the module defaults module

Including a defaults module requires using an [`include`](https://terragrunt.gruntwork.io/docs/features/keep-your-terragrunt-architecture-dry/#using-exposed-includes-to-override-common-configurations) block. This approach allows you to use or override any default values and reference `locals` from the defaults module.  

For example, the `include` block below references a defaults module located in `_module_defaults/networking/vpc-app.hcl`. To enable referencing the `locals` block within the defaults module, you must set `expose = true` in the `include` block.  

```hcl title=/dev/us-east-1/dev/networking/vpc/terragrunt.hcl
include "Module Defaults" {
  path = "${dirname(find_in_parent_folders())}/_module_defaults/networking/vpc-app.hcl"
  # We want to reference the variables from the included config in this configuration, so we expose it.
  expose = true
}
```

Note that we’re using the built-in Terragrunt function [`find_in_parent_folders()`](https://terragrunt.gruntwork.io/docs/reference/built-in-functions/#find_in_parent_folders) to locate the root directory of the repository, then specifying the path to the Module Defaults module relative to that root.  

### Specifying dependencies

[Dependencies](https://terragrunt.gruntwork.io/docs/reference/config-blocks-and-attributes/#dependency) are a Terragrunt concept that allow you to specify infrastructure units that must be applied before the current one. Dependencies work regardless of the source of the underlying module. This means that infrastructure units using a defaults module can reference dependencies in the same way as those that do not.  

For example, suppose you need to add a `dependency` block specifying that a KMS key defined in the parent directory of the VPC must exist before applying the current infrastructure unit.  

```hcl title=/dev/us-east-1/dev/networking/kms/terragrunt.hcl
dependency "kms" {
    config_path = "../kms"
}
```

### Using locals

Like Dependencies, [Locals](https://terragrunt.gruntwork.io/docs/features/locals/) are a Terragrunt concept that allow you to bind a name to an expression. Locals are particularly useful when using the module defaults pattern to set environment-specific values, such as CIDR blocks, resource name prefixes, and more.  

Continuing with our `vpc-app` example, we can specify the CIDR block using a local.  

```hcl title=/dev/us-east-1/dev/networking/vpc/terragrunt.hcl
locals {
  cidr_block = "10.0.0.0/16"
}
```

### Overriding inputs

Inputs allow you to pass in values to the underlying module specified in the `include` block. This is where the module defaults pattern shows it convenience and helps to keep your code clean and DRY.

Inputs defined in an `inputs` block override the default values set in the underlying module. This setup enables module consumers to minimize the code they must provide while customizing the module as required.  

Continuing with the `vpc-app` example, imagine the Terraform module requires 20 input variables, but only two of those variables need to be set differently across your environments.  

Without module defaults, consumers would need to specify all 20 input variables each time they used the module, increasing the likelihood of errors or incorrect values.  

With module defaults, you can predefine reasonable default values for all variables, allowing module consumers to override only the environment-specific values. This approach reduces the amount of code needed, promotes code reuse, and minimizes errors. For example, if your organization mandates that all VPCs include at least three private and public subnets, you can define those defaults in the module. Consumers can then override only the `cidr_block` input variable for their specific environment.  

In our `vpc-app` example, we override the CIDR block for an environment-specific VPC by specifying the `cidr_block` input variable in the `inputs` block and providing the value defined in the `locals` block.  

```hcl title=/dev/us-east-1/dev/networking/vpc/terragrunt.hcl
inputs = {
  cidr_block = local.cidr_block
}
```

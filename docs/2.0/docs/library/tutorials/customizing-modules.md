# Customizing Modules

We strive to keep the Infrastructure as Code Library flexible and generic enough to address common use cases. However, there may be scenarios where you need to customize a module to meet a specific requirement or comply with a company policy restricting pulling code from external sources. In these cases, you can fork the code to your organization or submit a pull request to add the desired functionality.

## Creating a Wrapper Module

Suppose you need to extend a Gruntwork module, set default variable values, or control which variables and outputs are exposed. In that case, we recommend creating a wrapper module in your Git repositories.

For example, if you were creating a wrapper module for an AWS Lambda function, your repository structure might look like this:

```
infrastructure-catalog
    └ lambda
        └ main.tf
        └ outputs.tf
        └ variables.tf
```

### Defining the wrapper module


:::note

Ensure you include all desired variables from the underlying module in your wrapper module. This establishes the interface for consumers of the module.

In `main.tf`, configure the module block to reference the Gruntwork module, set any default values, and pass through variable values.


```hcl title=main.tf
module "lambda" {
  source = "git::git@github.com:gruntwork-io/terraform-aws-lambda.git//modules/lambda?ref=v0.21.9"
  name        = var.name
  runtime     = var.lambda_runtime
  source_path = var.lambda_source_path
  handler     = var.lambda_handler
  timeout     = var.time_out
  memory_size = var.memory_size
  run_in_vpc  = false # Your own default - cannot be overridden
}
```

### Variables

Define the variables available to consumers of your module. You can choose to make certain variables optional. In this example, default values are set for the `time_out` and `memory_size` variables.

```hcl title=variables.tf
variable "name" {
  description = "The name used to namespace all the resources, including the API Gateway and Lambda functions."
  type        = string
}

variable "lambda_runtime" {
  type        = string
  description = "The runtime of the Lambda. Options include go, python, ruby, etc."
}

variable "lambda_source_path" {
  type        = string
  description = "The path to the directory containing the source to be deployed to lambda"
}

variable "lambda_handler" {
  type        = string
  description = "The name of the handler function that will be called as the entrypoint of the lambda"
}

variable "time_out" {
  type        = number
  description = "A number, in seconds, before the Lambda function will automatically terminate"
  default     = 30 # Default value for all of your consumers
}

variable "memory_size" {
  type        = number
  description = "The amount, in MB, of memory to allocate to the Lambda function"
  default     = 128 # Default value for all of your consumers
}
```

### Outputs

Finally, define the outputs that will be available from your wrapper module. You can choose to expose all outputs from the Gruntwork module or a subset of them. In this example, we define two outputs — the Lambda function ARN and the invoke ARN.


```hcl title=outputs.tf
output "function_arn" {
  description = "The Amazon Resource Name (ARN) of the Lambda function."
  value       = module.lambda.function_arn
}

output "function_invoke_arn" {
  description = "The Amazon Resource Name (ARN) of the Lambda function."
  value       = module.lambda.invoke_arn
}
```

## Submitting PRs

If you believe your change will benefit the entire Gruntwork community using the module, you can [create a pull request](https://help.github.com/articles/creating-a-pull-request/) with your changes. Refer to [contributing](/2.0/docs/library/guides/contributing) for more details.

## Forking

The [Gruntwork Terms of Service](https://gruntwork.io/terms/) allow you to fork code from the Gruntwork Infrastructure as Code Library into your own repositories. You may need to fork code for two reasons: to customize Gruntwork modules for your organization’s needs or to comply with policies that require all source code to reside in an internal GitHub Enterprise or BitBucket server. If your changes are specific to your organization, we encourage you to [contribute them back to the upstream Gruntwork repository](/2.0/docs/library/guides/contributing) whenever possible. This section outlines how to fork the code when required.

:::caution

We recommend using code directly from the `gruntwork-io` GitHub organization whenever possible to avoid the [increased overhead of managing a fork](#drawbacks-to-forking). If your organization bans all external sources, follow the instructions below.

:::note

The definition of an _Authorized User_ in the Gruntwork Terms of Service does NOT change if you fork the code. For example, if you create internal forks and provide access to 50 users, the Gruntwork License requires payment for 50 Authorized Users.

:::danger

Suppose the user who created a fork of a private repository (such as the IaC Library modules in your Gruntwork subscription) loses access to the source repository. In that case, the fork will be permanently deleted. This deletion can happen, for example, when a user is removed from your team in the Gruntwork Developer Portal. Be cautious when creating forks of Gruntwork modules. We recommend creating pull requests to merge changes upstream or using a machine user to own forks, ensuring it remains part of your team.

:::

### Forking the code

To fork code from the Gruntwork Infrastructure as Code Library:

1. Copy each Gruntwork repository into your private repositories.
2. Copy all versioned releases for each repository (see the `/releases` page for each repo).
3. Copy pre-built binaries for repositories that contain them (e.g., `ssh-grunt`).
4. Search each repository for cross-references to other Gruntwork repos. Most repositories are standalone, but some Terraform and Go code is shared across repositories. Update Terraform source URLs and Go import statements from `github.com/gruntwork-io` to your private Git repository URLs.

We recommend automating this process and running it on a regular schedule. The Gruntwork Infrastructure as Code Library is [continuously updated](/guides/stay-up-to-date/), so you’ll need to pull in updates regularly to remain current.

:::info

For enterprise users, Gruntwork offers the [Repo Copier](https://github.com/gruntwork-io/repo-copier), a purpose-built tool to automate these steps.

:::

### Using forked code

Using forked code is similar to the process outlined in [Deploying your first Gruntwork Module](/2.0/docs/library/tutorials/deploying-your-first-gruntwork-module), with the following adjustments:

1. Update the `source` URLs in your Terraform modules to point to your private Git repositories instead of the `gruntwork-io` GitHub organization.
2. Update the `--repo` parameter of `gruntwork-install` to use your private Git repositories instead of the `gruntwork-io` GitHub organization.

### Drawbacks to forking

While the Gruntwork Terms of Service permits forking, there are some significant drawbacks:

- Forking requires substantial upfront effort to copy repositories, releases, pre-compiled binaries, and update internal links.
- Maintaining forks involves additional work to pull in updates regularly and resolve merge conflicts.
- Forking can isolate your team from the Gruntwork community, reducing opportunities to participate in discussions, issues, and pull requests and limiting the value you derive from the broader community.

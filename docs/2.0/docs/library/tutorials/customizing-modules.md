# Customizing Modules

We strive to keep the Infrastructure as Code Library flexible and generic enough to serve common use cases, however there may be instances where you need to customize a module to your specific use case, or to ensure compliance with a company policy that does not allow you to pull code from an external source. In these cases, you may either fork the code to your own organization or create a pull request that implements the desired functionality.

## Creating a wrapper module

In some instances, you may need to extend a Gruntwork module, set default values for variables, or manage what variables and outputs are available. In these cases, we recommend creating a wrapper module in one of your own Git repos.


For example, if you were creating a wrapper module for an AWS Lambda function, your repository would have a file structure like the following:
```
infrastructure-catalog
    └ lambda
        └ main.tf
        └ outputs.tf
        └ variables.tf
```

### Defining the wrapper module


:::note

Be sure to include all of the desired variables available from the module in your wrapper module. This defines the interface of the module for your consumers.

:::

In `main.tf` you would configure the module block referencing the Gruntwork module, set any default values, and pass through any variable values.

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

Next, define the variables that are available to the consumers of your module, you may elect to make some variables optional. In this example, we've decided to set defaults value for the `time_out` and `memory_size` variables.

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

Finally, define the outputs that will be available from your wrapper module. You may elect to define all of the outputs from the Gruntwork module, or a subset of outputs. In this example, we've defined two outputs — the Lambda function ARN and invoke ARN.

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

If you believe your change will be useful to the entire Gruntwork community that is using the module, you can [create a pull request](https://help.github.com/articles/creating-a-pull-request/) with your changes. Refer to [contributing](/2.0/docs/library/guides/contributing) for more information.


## Forking

The [Gruntwork Terms of Service](https://gruntwork.io/terms/) give you permissions to fork the code from the Gruntwork Infrastructure as Code Library into your own repos. There are two scenarios where you might need to fork code — to make changes to the Gruntwork codebase to suit your organization’s needs or to comply with a policy that requires all source code to be pulled from an internal GitHub Enterprise or BitBucket server. If your change is specific to your organization, we encourage you to [contribute your changes back to the upstream Gruntwork repository](/2.0/docs/library/guides/contributing) when possible. This section walks you through what you need to do to fork the code if your company requires all source code to be pulled from an internal GitHub Enterprise or BitBucket serve.

:::caution

Whenever possible, we strongly recommend that you use code directly from the `gruntwork-io` GitHub org and avoid forking due to the [increased overhead of managing the fork](#drawbacks-to-forking). If your company completely bans all outside sources, then follow the instructions below.

:::

:::note

The definition of an _Authorized User_ from the Gruntwork Terms of Service does NOT change if you fork the code. That is, if you create internal forks and give 50 users access to those internal forks, then the Gruntwork License requires that you pay for 50 Authorized Users.

:::

:::danger

Forks of private repositories (such as IaC library modules included in the Gruntwork subscription) will be permanently deleted if the user who created the fork loses access to the source repository. For instance, this can happen when a user is removed from your team in the Gruntwork Developer Portal. Take caution when creating forks of any Gruntwork modules. We recommend creating pull requests to merge your changes upstream and avoid the need to maintain your fork, or creating a machine user to own any forks which will never be removed from your team.

:::

### Forking the code

To fork the code in the Gruntwork Infrastructure as Code Library:

1.  Copy each Gruntwork repo into your private repositories.
2.  Copy all the versioned releases of reach repo (see the `/releases` page for each repo).
3.  For repos that contain pre-built binaries (such as `ssh-grunt` mentioned earlier), copy those binaries.
4.  Within each repo, search for any cross-references to other Gruntwork repos. Most of the repos are standalone, but some of the Terraform and Go code is shared across repos. You’ll need to update Terraform source URLs and Go import statements from `github.com/gruntwork-io` to your private Git repo URLs.

We recommend automating this entire process and running it on a regular schedule. The Gruntwork Infrastructure as Code Library is [updated continuously](/guides/stay-up-to-date/), so you’ll want to pull in these updates regularly to stay up to date.

:::info

For enterprise users, Gruntwork offers the [Repo Copier](https://github.com/gruntwork-io/repo-copier), a purpose built tool that includes functionality to complete all of these steps.

:::

### Using forked code

Once you’ve forked the code, using it is very similar to what is outlined in [Deploying your first Gruntwork Module](/2.0/docs/library/tutorials/deploying-your-first-gruntwork-module), except for the following differences:

1.  Point the `source` URLs of your Terraform modules to your own Git repos, rather than the `gruntwork-io` GitHub org.
2.  Point the `--repo` parameter of `gruntwork-install` to your own Git repos, rather than the `gruntwork-io` GitHub org.

### Drawbacks to forking

While forking is allowed under the Gruntwork Terms of Services, there are some downsides:

- You have to do a lot of work up-front to copy the repos, releases, and pre-compiled binaries and update internal links.
- You have to do more work to run this process on a regular basis and deal with merge conflicts.
- If your team isn’t directly using the Gruntwork GitHub repos on a regular basis, then you’re less likely to participate in issues and pull requests, meaning you won’t be benefiting as much from the Gruntwork community.

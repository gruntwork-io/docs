---
sidebar_label: Using Our Modules
---

# Using Gruntwork Terraform Modules

This section will show you how to use Terraform modules from the Gruntwork Infrastructure as Code Library. As an illustrative example,
we’ll deploy the `vpc-app` Terraform module from [module-vpc](https://github.com/gruntwork-io/module-vpc).

:::note

You must be a <span class="js-subscribe-cta">Gruntwork subscriber</span> to access `module-vpc`.

:::

You can use this module to deploy a production-grade VPC on AWS. For full background information on VPCs, check
out [our guide for deploying a production-grade VPC](/guides/build-it-yourself/vpc/index.md).

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

```hcl title="infrastructure-modules/networking/vpc-app/main.tf"
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

<div class="dlist">

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
staging to production (for more info on working with multiple AWS accounts, see our
[Landing Zone guide](/guides/build-it-yourself/landing-zone/index.md)).

</div>

Let’s add the corresponding input variables in `variables.tf`:

```hcl title="infrastructure-modules/networking/vpc-app/variables.tf"
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

```hcl title="infrastructure-modules/networking/vpc-app/main.tf"
terraform {
  # Partial configuration for the backend: https://www.terraform.io/docs/backends/config.html#partial-configuration
  backend "s3" {}

  # Only allow this Terraform version. Note that if you upgrade to a newer version, Terraform won't allow you to use an
  # older version, so when you upgrade, you should upgrade everyone on your team and your CI servers all at once.
  required_version = "= 0.12.6"
}
```

This configures Terraform as follows:

<div class="dlist">

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

```hcl title="infrastructure-modules/networking/vpc-app/main.tf"
module "vpc" {
  # Make sure to replace <VERSION> in this URL with the latest module-vpc release
  source = "git@github.com:gruntwork-io/module-vpc.git//modules/vpc-app?ref=<VERSION>"

  aws_region       = var.aws_region
  vpc_name         = var.vpc_name
  cidr_block       = var.cidr_block
  num_nat_gateways = var.num_nat_gateways
}
```

This code does the following:

<div class="dlist">

#### Terraform module support

This code pulls in a module using Terraform’s native `module` functionality. For background info, see
[How to create reusable infrastructure with Terraform modules](https://blog.gruntwork.io/how-to-create-reusable-infrastructure-with-terraform-modules-25526d65f73d).

#### SSH Git URL

The `source` URL in the code above uses a Git URL with SSH authentication (see
[module sources](https://www.terraform.io/docs/modules/sources.html) for all the types of `source` URLs you can use).
If you followed the [SSH key instructions](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent) when [linking your GitHub ID](/intro/dev-portal/link-github-id.md), this will allow you to access private repos in the Gruntwork
Infrastructure as Code Library without having to hard-code a password in your Terraform code.

#### Versioned URL

Note the `?ref=<VERSION>` at the end of the `source` URL. This parameter allows you to pull in a specific version of
each module so that you don’t accidentally pull in (potentially backwards incompatible code) in the future. You
should replace `<VERSION>` with the latest version from the releases page of the repo you’re using (e.g., here’s
[the releases page for module-vpc](https://github.com/gruntwork-io/module-vpc/releases)).

#### Module arguments

Below the `source` URL, you’ll need to pass in the module-specific arguments. You can find all the required and
optional variables defined in `vars.tf` (old name) or `variables.tf` (new name) of the module (e.g.,
here’s [the variables.tf for vpc-app](https://github.com/gruntwork-io/module-vpc/blob/master/modules/vpc-app/vars.tf)).
The code above sets these to input variables (which you’ll define shortly) so that you can use different values in
different environments.

</div>

Let’s add the new input variables in `variables.tf`:

```hcl title="infrastructure-modules/networking/vpc-app/variables.tf"
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

```hcl title="infrastructure-modules/networking/vpc-app/outputs.tf"
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

## Manual tests for Terraform code

Now that the code is written, you may want to test it manually. We recommend testing in a _sandbox environment_ where
you can deploy infrastructure without affecting any other environments (especially production!). For example, if you’re
using AWS, this should be a separate AWS account.

The easiest way to test is to create a `testing/terraform.tfvars` file:

    infrastructure-modules
      └ networking
        └ vpc-app
          └ main.tf
          └ outputs.tf
          └ variables.tf
          └ testing
            └ terraform.tfvars

Inside this file, you can set all the variables for your module to test-friendly values:

```hcl title="infrastructure-modules/networking/vpc-app/testing/terraform.tfvars"
aws_region       = "us-east-2"
aws_account_id   = "555566667777"
vpc_name         = "example-vpc"
cidr_block       = "10.0.0.0/16"
num_nat_gateways = 1
```

You should also add a `testing/backend.hcl` file:

    infrastructure-modules
      └ networking
        └ vpc-app
          └ main.tf
          └ outputs.tf
          └ variables.tf
          └ testing
            └ terraform.tfvars
            └ backend.hcl

In this file, you can configure test-friendly settings for your backend. For example, if you’re using the S3 backend,
you can specify:

```hcl title="infrastructure-modules/networking/vpc-app/testing/backend.hcl"
bucket = "<YOUR-BUCKET-FOR-TESTING>"
key    = "manual-testing/<YOUR-NAME>/terraform.tfstate"
region = "us-east-2"
```

You can now test manually by authenticating to your sandbox environment (see
[A Comprehensive Guide to Authenticating to AWS on the Command Line](https://blog.gruntwork.io/a-comprehensive-guide-to-authenticating-to-aws-on-the-command-line-63656a686799))
and running:

```bash
cd infrastructure-modules/networking/vpc-app/testing
terraform init -backend-config=backend.hcl ../
terraform apply ../
```

When you’re done testing, clean up by running:

```bash
terraform destroy ../
```

## Automated tests for Terraform code

You may also want to create automated tests for your module. Automated tests for infrastructure code will spin up and
tear down a lot of infrastructure, so we recommend a separate _testing environment_ (e.g. yet another AWS account) for
running automated tests—separate even from the sandboxes you use for manual testing. You can run a tool like
[cloud-nuke](https://github.com/gruntwork-io/cloud-nuke) on a schedule to periodically clean up left-over resources in
your testing environment (e.g., delete all resources that are older than 24h).

The only way to build confidence that your infrastructure code works as you expect is to deploy it into a real AWS
account. That means you’ll primarily be writing _integration tests_ that:

1.  Run `terraform apply` to deploy your module
2.  Perform a bunch of validations that the deployed infrastructure works as expected
3.  Run `terraform destroy` at the end to clean up

In short, you’re automating the steps you took to manually test your module!

You can make it easier to write tests of this format by leveraging [Terratest](https://github.com/gruntwork-io/terratest/),
an open source Go library that contains helpers for testing many types of infrastructure code, including Terraform,
Packer, and Docker.

You can define tests for your `vpc-app` module in a `vpc_app_test.go` file in a `test` folder:

    infrastructure-modules
      └ networking
        └ vpc-app
          └ main.tf
          └ outputs.tf
          └ variables.tf
          └ testing
            └ terraform.tfvars
            └ backend.hcl
      └ test
        └ vpc_app_test.go

Check out the [Terratest install instructions](https://github.com/gruntwork-io/terratest/#quickstart) for how to
configure your environment for Go and install Terratest.

Next, write some test code in `vpc_app_test.go` that looks like this:

```go title="infrastructure-modules/test/vpc_app_test.go"
package test

import (
        "testing"

        "fmt"
        "github.com/gruntwork-io/terratest/modules/random"
        "github.com/gruntwork-io/terratest/modules/terraform"
)

func TestVpcApp(t *testing.T) {
        // Run this test in parallel with all the others
        t.Parallel()

        // Unique ID to namespace resources
        uniqueId := random.UniqueId()
        // Generate a unique name for each VPC so tests running in parallel don't clash
        vpcName := fmt.Sprintf("test-vpc-%s", uniqueId)
        // Generate a unique key in the S3 bucket for the Terraform state
        backendS3Key := fmt.Sprintf("vpc-app-test/%s/terraform.tfstate", uniqueId)

        terraformOptions := &terraform.Options {
                // Where the Terraform code is located
                TerraformDir: "../networking/vpc-app",

                // Variables to pass to the Terraform code
                Vars: map[string]interface{}{
                        "aws_region":       "us-east-2",
                        "aws_account_id":   "111122223333", // ID of testing account
                        "vpc_name":         vpcName,
                        "cidr_block":       "10.0.0.0/16",
                        "num_nat_gateways": 1,
                },

                // Backend configuration to pass to the Terraform code
                BackendConfig: map[string]interface{}{
                        "bucket":   "<YOUR-S3-BUCKET>", // bucket in testing account
                        "region":   "us-east-2", // region of bucket in testing account
                        "key":      backendS3Key,
                },
        }

        // Run 'terraform destroy' at the end of the test to clean up
        defer terraform.Destroy(t, terraformOptions)

        // Run 'terraform init' and 'terraform apply' to deploy the module
        terraform.InitAndApply(t, terraformOptions)
}
```

The test code above implements a minimal test that does the following:

<div class="dlist">

#### Configure variables

This is similar to the `testing/terraform.tfvars` used in manual testing.

#### Configure the backend

This is similar to the `testing-backend.hcl` used in manual testing.

#### Namespace resources

The code uses ‘random.UniqueId()\` to generate unique identifiers for all the resources in this test. This allows
multiple tests to run in parallel (e.g., on your computer, your teammates’ computers, CI servers) without running
into conflicts (e.g., without conflicts over resources that require unique names, such as VPCs).

#### Defer Terraform destroy

The test code uses `defer` to schedule `terraform.Destroy` to run at the end of the test, whether or not the test
passes.

#### Run Terraform init and apply

The test runs `terraform init` and `terraform apply` on the module. If this hits any errors, the test will fail.

</div>

This is a minimal test that just makes sure your module can deploy and undeploy successfully. This is a great start,
and will catch a surprising number of bugs, but for production-grade code, you’ll probably want more validation logic.
Check out the real [module-vpc tests](https://github.com/gruntwork-io/module-vpc/tree/master/test) to see how we validate
VPCs by, for example, launching EC2 instances in various subnets and making sure that connections between some subnets
work, and others are blocked, based on the networking settings in that VPC.

To run the test, authenticate to your testing environment and do the following:

```bash
cd infrastructure-modules/test
go test -v -timeout 45m
```

Note the use of the `-timeout 45m` argument with `go test`. By default, Go imposes a time limit of 10 minutes for
tests, after which it forcibly kills the test run, causing the tests to not only fail, but even preventing the cleanup
code (i.e., `terraform destroy`) from running. This VPC test should take closer to ten minutes, but whenever running a
Go test that deploys real infrastructure, it’s safer to set an extra long timeout to avoid the test being killed part
way through and leaving all sorts of infrastructure still running.

For a lot more information on writing automated tests for Terraform code, see:

1.  [Terratest documentation](https://github.com/gruntwork-io/terratest/), especially the many examples and corresponding
    tests in the `examples` and `test` folders, respectively, and the
    [testing best practices](https://github.com/gruntwork-io/terratest/#testing-best-practices) section.

2.  _[Terraform: Up & Running](https://www.terraformupandrunning.com)_, 2nd edition, has an entire chapter dedicated to
    automated testing for Terraform code, including unit tests, integration tests, end-to-end tests, dependency injection,
    running tests in parallel, test stages, and more.

## Deploying Terraform code

Now that your module has been thoroughly tested, you can deploy it to your real environments (e.g., staging and
production). There are many ways to deploy Terraform modules, so in this guide, we’ll focus on just two:

1.  [Deploy using plain Terraform](#deploy-using-plain-terraform)
2.  [Deploy using Terragrunt](#deploy-using-terragrunt)

### Deploy using plain Terraform

One option is to deploy all of your environments using plain-old-Terraform. The approach is nearly identical to the
way you did manual testing; let’s walk through it for the staging environment.

First, create a `staging/terraform.tfvars` file:

    infrastructure-modules
      └ networking
        └ vpc-app
          └ main.tf
          └ outputs.tf
          └ variables.tf
          └ testing
            └ terraform.tfvars
            └ backend.hcl
          └ staging
            └ terraform.tfvars
      └ test
        └ vpc_app_test.go

Inside the file, set the variables for this module to values appropriate for this environment:

```hcl title="infrastructure-modules/networking/vpc-app/staging/terraform.tfvars"
aws_region       = "us-east-2"
aws_account_id   = "888888888888"
vpc_name         = "staging-vpc"
cidr_block       = "10.10.0.0/16"
num_nat_gateways = 1
```

Next, create a `staging/backend.hcl` file:

    infrastructure-modules
      └ networking
        └ vpc-app
          └ main.tf
          └ outputs.tf
          └ variables.tf
          └ testing
            └ terraform.tfvars
            └ backend.hcl
          └ staging
            └ terraform.tfvars
            └ backend.hcl
      └ test
        └ vpc_app_test.go

Inside this file, configure the backend for staging:

```hcl title="infrastructure-modules/networking/vpc-app/staging/backend.hcl"
bucket         = "<YOUR-BUCKET-FOR-STAGING>"
key            = "networking/vpc-app/terraform.tfstate"
region         = "us-east-2"
encrypt        = true
dynamodb_table = "<DYNAMODB-TABLE-FOR-STAGING>"
```

And now you can deploy to the staging environment as follows:

```bash
cd infrastructure-modules/networking/vpc-app/staging
terraform init -backend-config=backend.hcl ../
terraform apply ../
```

To deploy to other environments, create analogous `.tfvars` and `.hcl` files (e.g., `production/terraform.tfvars` and
`production/backend.hcl`) and run `terraform init` and `terraform apply` with those files.

#### Benefits of this approach

- No external tooling required.
- Analogous to how you run manual and automated tests.
- Quick feedback cycle.
- Completely free and open source.

#### Drawbacks to this approach

- You’re always deploying "latest" from a branch. No versioning or easy rollback.
- Lots of command-line arguments to pass. Easy to make mistakes. Most teams end up creating hacky wrapper scripts.
- Lots of backend configuration to copy for each module. Manually setting a unique `key` for each module is repetitive
  and error prone.
- From a quick glance at the code, it’s not clear what accounts, environments, or regions you deploy to. Figuring this
  out requires digging through many folders.

### Deploy using Terragrunt

Another option is to use [Terragrunt](https://github.com/gruntwork-io/terragrunt), an open source wrapper for Terraform
that helps alleviate some of the drawbacks mentioned in the previous approach.

The first step with Terragrunt is to version your code. You can do this by creating Git tags in
`infrastructure-modules`:

```bash
cd infrastructure-modules
git tag -a "v0.0.1" -m "Created vpc-app module"
git push --follow-tags
```

This will allow you to deploy different versions of your module in different environments (e.g., `v0.0.1` in prod and
`v0.0.2` in stage) and rollback to previous versions if necessary. With Terragrunt, we recommend defining your live
environments in a separate repo called `infrastructure-live` that uses a folder structure with the following format:

    infrastructure-live
      └ <account>
        └ terragrunt.hcl
        └ _global
        └ <region>
          └ _global
          └ <environment>
            └ <resource>
              └ terragrunt.hcl

Where:

<div class="dlist">

#### &lt;account>

At the top level, you have accounts (e.g., an AWS account).

#### &lt;region>

Within each account, there will be one or more regions (e.g., in AWS, `us-east-1`, `eu-west-1`, etc). There may also
be a `_global` folder that defines resources that are available across all the regions in this account, such as
IAM users and DNS settings. Each account also has a root `terragrunt.hcl` file that defines common Terraform settings
that apply to the entire account, such as what backend to use to store Terraform state.

#### &lt;environment>

Within each region, there will be one or more environments, such as dev, stage, prod, mgmt, etc. There may also be a
`_global` folder that defines resources that are available across all the environments in this region.

#### &lt;resource>

Within each environment, you use Terraform modules to deploy one or more resources, such as servers, databases load
balancers, and so on. Each module is configured via a `terragrunt.hcl` file.

</div>

For example, if you were using AWS, with separate accounts for staging and production (see
[our Landing Zone guide](/guides/build-it-yourself/landing-zone/index.md)),
and you wanted to deploy the `vpc-app` module in the `us-east-2` region in
each of these accounts, the folder structure would look like this:

    infrastructure-live
      └ staging
        └ terragrunt.hcl
        └ us-east-2
          └ stage
             └ networking
               └ vpc-app
                 └ terragrunt.hcl
      └ production
        └ terragrunt.hcl
        └ us-east-2
          └ prod
            └ networking
              └ vpc-app
                └ terragrunt.hcl

Environments within accounts

In the folder structure above, it may seem redundant to have an environment, such as `stage`, within an account, such
as `staging`. However, in real-world usage, it’s common to have multiple environments within a single account. For
example, within the `staging` account, you may have not just a `stage` environment, which contains the VPC and some
applications, but also a `mgmt` environment, which contains a separate VPC for running DevOps tooling (e.g., an OpenVPN
server).

The `terragrunt.hcl` in the root of each account defines the backend settings for that account (including special
helpers to automatically set the `key` value). Here’s an example of what `staging/terragrunt.hcl` might look
like:

```hcl title="infrastructure-live/staging/terragrunt.hcl"
remote_state {
  backend = "s3"
  config = {
    # Set defaults for all the backend settings for this environment
    bucket         = "<YOUR-BUCKET-FOR-STAGING>"
    region         = "us-east-2"
    encrypt        = true
    dynamodb_table = "<DYNAMODB-TABLE-FOR-STAGING>"

    # Automatically set the key parameter to the relative path between this root terragrunt.hcl file and the child
    # terragrunt.hcl file (e.g., for vpc-app, it'll end up us-east-2/stage/networking/vpc-app/terraform.tfstate).
    key = "${path_relative_to_include()}/terraform.tfstate"
  }
}
```

The `terragrunt.hcl` for each child module within an account specifies what module to deploy—including the version to
use—and sets the variables to values appropriate for that environment. Here’s an example of what
`staging/us-east-2/stage/vpc-app/terragrunt.hcl` might look like:

```hcl title="infrastructure-live/staging/us-east-2/stage/vpc-app/terragrunt.hcl"
 Deploy the vpc-app module at a specific version (via the ref=xxx param)
terraform {
  source = "git@github.com:<ORG>/infrastructure-modules.git//networking/vpc-app?ref=v0.0.1"
}

 Set the variables for the vpc-app module in this environment
inputs = {
  aws_region       = "us-east-2"
  aws_account_id   = "888888888888"
  vpc_name         = "staging-vpc"
  cidr_block       = "10.10.0.0/16"
  num_nat_gateways = 1
}

 Automatically include settings from the root terragrunt.hcl in this account
include {
  path = find_in_parent_folders()
}
```

To deploy `vpc-app` in staging, you do the following:

```bash
cd infrastructure-live/staging/us-east-2/stage/vpc-app
terragrunt apply
```

When you run this command, Terragrunt will:

1.  Checkout the `infrastructure-modules` repo at version `v0.0.1` into a scratch directory.

2.  Run `terraform init` in the scratch directory, configuring the backend to the values in the root `terragrunt.hcl`.

3.  Run `terraform apply` in the scratch directory, configuring the variables to the values in the `inputs = { ... }`
    block.

You can deploy the production environment by creating an analogous
`infrastructure-live/production/us-east-2/prod/vpc-app/terragrunt.hcl` file and running `terragrunt apply` in
`infrastructure-live/production/us-east-2/prod/vpc-app/`. If you have multiple modules and you want to deploy all of
them, you can use `terragrunt apply-all`. For example, to deploy _everything_ in the production account, you would
do the following:

```bash
cd infrastructure-live/production
terragrunt apply-all
```

#### Benefits of this approach

- All your code is versioned. You can deploy different versions in different environments, and roll back to older
  versions if necessary.
- Backend configuration is DRY. No more copy/pasting values, no more manually setting `key` for each module.
- CLI arguments are DRY. No need for long commands or extra wrapper scripts.
- The full structure of all accounts, environments, and regions is visible at a glance in the `infrastructure-live`
  repo.
- Completely free and open source.
- Deploy multiple modules using `apply-all`.

#### Drawbacks to this approach

- You have to install, learn, and manage a new tool / abstraction layer.
- The scratch directory can make debugging/troubleshooting tricky.

## Updating

Now that you have your Terraform module deployed, you can pull in updates as follows:

1.  Subscribe to the monthly [Gruntwork Newsletter](https://blog.gruntwork.io/tagged/gruntwork-newsletter) to be notified
    of all updates to the Gruntwork Infrastructure as Code Library. Alternatively, you can "watch" repos in GitHub that you’re
    interested in.

2.  When you find an update you’d like for a specific module, update any code using that module in
    `infrastructure-modules` to the new version number. For example, if you were using `module-vpc` at `v0.7.2` and you
    wanted to update to `v0.7.3`, you would change from:

    ```hcl
    module "vpc" {
      source = "git@github.com:gruntwork-io/module-vpc.git//modules/vpc-app?ref=v0.7.2"
      # ...
    }
    ```

    to:

    ```hcl
    module "vpc" {
      source = "git@github.com:gruntwork-io/module-vpc.git//modules/vpc-app?ref=v0.7.3"
      # ...
    }
    ```

3.  Pay close attention to the release notes for any additional instructions. In particular, if the MINOR version number
    was increased (e.g., `v0.6.0` → `v0.7.0`), that implies a backwards incompatible change, and the release notes will
    explain what you need to do (e.g., you might have to add, remove, or change arguments you pass to the module).

4.  Tests your changes locally. You do this using the same process outlined in [Manual tests for Terraform code](#manual-tests-for-terraform-code) and
    [Automated tests for Terraform code](#automated-tests-for-terraform-code).

5.  Deploy your changes to each environment. You do this using the same process outlined in [Deploying Terraform code](#deploy-terraform).


<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "51856e814c4a4bc50bdbcab6b0aaf2ce"
}
##DOCS-SOURCER-END -->

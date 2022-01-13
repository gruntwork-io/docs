# Deploy Your Module

Now that your module has been thoroughly tested, you can deploy it to your real environments (e.g., staging and
production). There are many ways to deploy Terraform modules, so in this guide, we’ll focus on using Terraform or Terragrunt.

## Deploy using plain Terraform

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

```hcl title=infrastructure-modules/networking/vpc-app/staging/terraform.tfvars
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

```hcl title=infrastructure-modules/networking/vpc-app/staging/backend.hcl
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

**Benefits of this approach**

- No external tooling required.
- Analogous to how you run manual and automated tests.
- Quick feedback cycle.
- Completely free and open source.

**Drawbacks to this approach**

- You’re always deploying "latest" from a branch. No versioning or easy rollback.
- Lots of command-line arguments to pass. Easy to make mistakes. Most teams end up creating hacky wrapper scripts.
- Lots of backend configuration to copy for each module. Manually setting a unique `key` for each module is repetitive
  and error prone.
- From a quick glance at the code, it’s not clear what accounts, environments, or regions you deploy to. Figuring this
  out requires digging through many folders.

## Deploy using Terragrunt

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

<div className="dlist">

#### `<account>`

A the top level, you have accounts (e.g., an AWS account).

#### `<region>`

Within each account, there will be one or more regions (e.g., in AWS, `us-east-1`, `eu-west-1`, etc). There may also
be a `_global` folder that defines resources that are available across all the regions in this account, such as
IAM users and DNS settings. Each account also has a root `terragrunt.hcl` file that defines common Terraform settings
that apply to the entire account, such as what backend to use to store Terraform state.

#### `<environment>`

Within each region, there will be one or more environments, such as dev, stage, prod, mgmt, etc. There may also be a
`_global` folder that defines resources that are available across all the environments in this region.

#### `<resource>`

Within each environment, you use Terraform modules to deploy one or more resources, such as servers, databases load
balancers, and so on. Each module is configured via a `terragrunt.hcl` file.

</div>

For example, if you were using AWS, with separate accounts for staging and production (see
[How to Configure a Production Grade AWS Account Structure](/docs/guides/build-it-yourself/landing-zone/)),
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

```hcl title=infrastructure-live/staging/terragrunt.hcl
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

```hcl title=infrastructure-live/staging/us-east-2/stage/vpc-app/terragrunt.hcl
# Deploy the vpc-app module at a specific version (via the ref=xxx param)
terraform {
  source = "git@github.com:<ORG>/infrastructure-modules.git//networking/vpc-app?ref=v0.0.1"
}

# Set the variables for the vpc-app module in this environment
inputs = {
  aws_region       = "us-east-2"
  aws_account_id   = "888888888888"
  vpc_name         = "staging-vpc"
  cidr_block       = "10.10.0.0/16"
  num_nat_gateways = 1
}

# Automatically include settings from the root terragrunt.hcl in this account
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

**Benefits of this approach**

- All your code is versioned. You can deploy different versions in different environments, and roll back to older
  versions if necessary.
- Backend configuration is DRY. No more copy/pasting values, no more manually setting `key` for each module.
- CLI arguments are DRY. No need for long commands or extra wrapper scripts.
- The full structure of all accounts, environments, and regions is visible at a glance in the `infrastructure-live`
  repo.
- Completely free and open source.
- Deploy multiple modules using `apply-all`.

**Drawbacks to this approach**

- You have to install, learn, and manage a new tool / abstraction layer.
- The scratch directory can make debugging/troubleshooting tricky.

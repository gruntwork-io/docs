---
title: "Upgrading your Reference Architecture Deployment to Terraform 0.12.x and Terragrunt 0.19.x"
date: 2019-08-06
tags: ["terraform", "terragrunt"]
---

This guide walks you through the steps you should take when upgrading your Reference Architecture deployment to
Terraform 0.12.x and Terragrunt 0.19.x.

## Background

Terraform 0.12 (referred to as TF12) was released in May, 2019, and it included a few major changes:

1. More strict rules around what can go in a `.tfvars` file. In particular, any variable defined in a `.tfvars` file
   that does not match a corresponding `variable` definition in your `.tf` files produces an error.
1. A shift from HCL to HCL2 as the main syntax. This included support for first-class expressions (i.e., using variables
   and functions without having to wrap everything in `${...}`).
1. Math behave differently. In particular, many functions that previously returned ints now return floats.
1. Bools behave differently, where they are no longer auto type casted to ints.
1. Some official providers have changed their syntax. For example, the `terraform_remote_state` data source now requires
   an `outputs` attribute to index into the outputs exported by the state.

To be compatible with Terraform 0.12 changes, Terragrunt 0.19 (referred to as TG19) was released. Before version 0.19.0,
Terragrunt had you define its configuration in a `terragrunt = { ... }` variable in a `terraform.tfvars` file, but due
to item (1) this no longer works with Terraform 0.12 and newer.

To support this:

1. Terragrunt now defines and uses its own configuration file format: `terragrunt.hcl`. As a result of this, all the
   attributes and blocks that used to be defined under the `terragrunt` input in the `terraform.tfvars` file is now
   defined at the top level.
1. The `terragrunt.hcl` file:
    - Uses HCL2 syntax.
    - Is now more strict about the difference between blocks and attributes.
    - Supports all Terraform built-in functions in its config file.
    - Defines inputs to modules are using a new attribute (`inputs`).

This means that both the modules and the live config need to be updated in order to support TF12.


## Migration Guide

The following sections outline the steps you need to take in order to migrate from Terraform <= 0.11.X and Terragrunt <=
v0.18.x to Terraform 0.12.x and newer and Terragrunt 0.19.x and newer:

1. [Upgrade modules for compatibility with Terraform 0.12.x](#upgrade-modules-for-compatibility-with-terraform-012x)
1. [Upgrade live config for compatibility with Terragrunt
   0.19.x](#upgrade-live-config-for-compatibility-with-terragrunt-019x)


### Upgrade modules for compatibility with Terraform 0.12.x

Terraform 0.12.x introduces many syntactic updates to make working with the language better, such as [first-class
expressions, `for` and `for_each`, a more powerful type system, better error messages, and
more](https://www.hashicorp.com/blog/announcing-terraform-0-12). However, there a few backwards incompatible changes
that prevent using your TF11 and older modules directly with TF12. For the safest and robust upgrade path, we recommend
going through the process of updating all your modules to use the new HCL2 syntax using the `terraform 0.12upgrade` tool
that ships with TF12.

Before starting, read through the [Terraform 0.12 upgrade guide](https://www.terraform.io/upgrade-guides/0-12.html) so
you can learn about the types of changes you’ll have to make. Familiarity of the changes help with detecting errors and
gotchas that the upgrade tool occassionally misses.

Here is the rough process:

1. [Install and setup Terraform 0.12](#install-and-setup-terraform-0-12)
1. [Upgrade each module for 0.12 compatibility](#upgrade-each-module-for-0-12-compatibility)

#### Install and setup Terraform 0.12

To use Terraform 0.12, you will need to have the binary available on your machine. However, you don't want to blindly
replace your existing `terraform` binary to the newer version, because that would mean you wouldn't be able to use the
0.11 binary for your old code when you need to make a change to the existing infrastructure.

Here are two ways for you to support having 0.11 and 0.12 simultaneously on your machine:

- [Using homebrew to manage multiple terraform versions](#using-homebrew-to-manage-multiple-terraform-versions)
- [Using tfenv to manage multiple terraform versions](#using-tfenv-to-manage-multiple-terraform-versions)
- [Manually managing multiple terraform versions](#manually-managing-multiple-terraform-versions)

##### Using homebrew to manage multiple terraform versions

If you are on a Mac, you have the option of managing multiple terraform versions using homebrew. You can follow the
instructions published in our blog post [Installing Multiple Versions of Terraform with
Homebrew](https://blog.gruntwork.io/installing-multiple-versions-of-terraform-with-homebrew-899f6d124ff9) to setup
Homebrew to manage multiple versions of terraform, which you can then use `brew switch` to switch between them.

##### Using tfenv to manage multiple terraform versions

If you are on any Unix based system, you have the option of relying on [tfenv](https://github.com/tfutils/tfenv).
`tfenv` is a tool inspired by `rbenv` to provide a CLI for managing multiple versions of terraform. Once you have it
installed, `tfenv` will manage the binaries in your home directory and create symlinks that allow it to invoke the
currently selected Terraform version.

For example, here is an example of using `tfenv` to install and manage both TF11 and TF12:

First, you need to install the versions that you wish to use:

```bash
tfenv install 0.11.14
tfenv install 0.12.6
```

Once the versions are installed, you can switch between the two using the `use` command:

```bash
tfenv use 0.11.14
terraform version
# Terraform v0.11.14
tfenv use 0.12.6
terraform version
# Terraform v0.12.6
```

Note that it can get confusing which version of terraform is currently in use, especially if you frequently switch
between the two. `tfenv` tracks the current version in a file available in `$TFENV_ROOT/version`. You can take advantage
of this fact to setup your shell prompt to display the currently selected Terraform version.

##### Manually managing multiple terraform versions

If you are on a non-Unix based machine (such that you can't use `tfenv`), or if you have restrictions on software that
can be installed on your machine, then your only option is to manage the Terraform versions manually. In this method,
you download each version of Terraform under a different alias (e.g `terraform0.12` for TF12 and `terraform0.11` for
TF11), and then have it available in a common folder that you can track and find. Then, whenever you need to use a
particular version, you copy the binary of the version you want to use into a location available in your `PATH` under
the name `terraform`.

For example, on a Unix based machine, you can store all the Terraform binaries in the folder `$HOME/.terraform`:

```
.terraform
├── 0.11.14
│   └── terraform0.11
└── 0.12.6
    └── terraform0.12
```

Then, everytime you want to switch versions, you can copy the binary to `/usr/local/bin`:

```bash
cp ~/.terraform/0.11.14/terraform0.11 /usr/local/bin/terraform
terraform version
# Terraform v0.11.14
cp ~/.terraform/0.12.6/terraform0.12 /usr/local/bin/terraform
terraform version
# Terraform v0.12.6
```

You can find the available binaries for each terraform version [here](https://releases.hashicorp.com/terraform/).

#### Upgrade each module for 0.12 compatibility

To upgrade each of your modules to HCL2 syntax, you can run the `terraform 0.12upgrade` command using version 0.12.x of
the `terraform` binary. You will need to do the following for each of your Terraform modules (e.g in your
`infrastructure-modules` repo). To make the commands concrete, the rest of this step by step guide will assume you are
updating a module in `infrastructure-modules/networking/vpc-app` (such as [this
one](https://github.com/gruntwork-io/infrastructure-modules-multi-account-acme/tree/3158e4ebe83156f3917f8d168a6985678e30acfa/networking/vpc-app)):

**NOTE**: We recommend updating and testing one module at a time, starting with the modules that are at the root of your
dependency graph. Terraform 0.12 is not able to read the state of Terraform 0.11, so you will need to start with the
root of your dependencies before you can move on to the modules that depend on it. **Always test in an environment where
it is very easy to "start over", such as a sandbox or dev environment!**

1. Go into the folder with the Terraform module: `cd infrastructure-modules/networking/vpc-app`
1. Search your code for any references to Gruntwork modules. Update each module to the version number specified in the
   right-most column of the [Gruntwork module compatibility
   table](https://docs.gruntwork.io/reference/version-compatibility/) (or newer). For example,
   our example `infrastructure-modules/networking/vpc-app` [makes use of
   module-vpc](https://github.com/gruntwork-io/infrastructure-modules-multi-account-acme/blob/3158e4ebe83156f3917f8d168a6985678e30acfa/networking/vpc-app/main.tf#L38),
   which you’ll want to upgrade to `v0.6.0` (or newer).
1. Make sure to check the release notes for the module to see any other changes you need to make. E.g., Here are [the
   release notes for module-vpc, v0.6.0](https://github.com/gruntwork-io/module-vpc/releases/tag/v0.6.0).
1. If you have a `required_version` constraint in your code (e.g like [this one in the
   example](https://github.com/gruntwork-io/infrastructure-modules-multi-account-acme/blob/3158e4ebe83156f3917f8d168a6985678e30acfa/networking/vpc-app/main.tf#L28)),
   for the time being, remove it so the Terraform auto-upgrade step doesn’t complain. We’ll bring it back later.
1. Run `terraform init -backend=false`.
1. Run `terraform 0.12upgrade`.
1. Delete or edit the generated `versions.tf` file. We recommend specifying a strict `required_version` constraint in
   your Terraform code: e.g., `required_version = "= 0.12.4"`.
1. There are a few gotchas you have to handle manually. Here are the list of changes and mistakes the upgrade tool has
   made which we detected in the process of upgrading our modules:
    - Duplicated comment blocks. Sometimes, the upgrade tool will duplicate comment blocks in the middle of the code.
      This was most common when there is a comment on a resource attribute.
    - Reorganized comment blocks. The tool sometimes moves the comment block somewhere you don't expect. This is
      especially problematic for comments within blocks (e.g., in the middle of a vars = { … }) block.
    - `bool` no longer converts to `1` and `0` automatically. If you had the pattern of doing `count = bool`, this no
      longer works. You have to explicitly add a conditional: `count = bool ? 1 : 0`.
    - In tf11 and under, sometimes you had to do `attr = ["${list}"]` when passing in a `list` to an attribute. In tf12,
      this will no longer automatically flatten the list for you. Instead, you need to change to `attr = list`.
    - `map` requires all the values to have the same type, and `list` requires all the elements to have the same type.
      So `map(any)` does not mean you can mix types (e.g `{ x = "foo", bar = 1 }`), but rather “any type as
      long as that type is consistent for all values”. If you have a need for map with any value, use `any` by itself.
      Same with `list`.
    - Object type requires all keys to be present. You can not have optional attributes when using the `object` type.
    - Math works differently. In particular, before division returned ints but now they return floats. You have to use
      `floor` to get the same behavior. E.g if you had `(5 / 2)` before, you now need to do `floor(5/2)`.

1. (Optional) Go through any variable declarations and add appropriate [type
   constraints](https://www.terraform.io/docs/configuration/types.html). We recommend adding explicit type constraints
   on your variables. They not only make your code more robust to typos, type inference bugs, and type ambiguities, but
   also act as good documentation as well.
1. If you have terratest workflows for your modules, upgrade terratest to v0.16.x (or newer). You can see all available
   terratest versions, including detailed migration guides for each version in [the releases
   page](https://github.com/gruntwork-io/terratest/releases).
1. Push your changes to a branch so that you can test it in your pre-prod environments (We will come back to this later
   in the guide, when we upgrade the live config to TG19).


### Upgrade live config for compatibility with Terragrunt 0.19.x

Terragrunt 0.19.x introduces a new file format for the live config. This format has many advantages, including
supporting all built in functions available to Terraform. However, this means that you will need to convert all your
terragrunt `terraform.tfvars` files to the new syntax.

Here is the rough process:

1. [Install and setup Terragrunt 0.19](#install-and-setup-terragrunt-0-19)
1. [Migrate terraform.tfvars to terragrunt.hcl](#migrate-terraform-tfvars-to-terragrunt-hcl)
1. [Switch common tfvars files to use yaml](#switch-common-tfvars-files-to-use-yaml)

#### Install and setup Terragrunt 0.19

You will also need to setup the Terragrunt 0.19 binary in a [similar fashion to setting up Terraform
0.12](#install-and-setup-terraform-0-12). You can use the same instructions available for managing Terraform 0.12 as for
managing Terragrunt 0.19, except for `tfenv` which only supports Terraform

- [Using homebrew to manage multiple terragrunt versions](#using-homebrew-to-manage-multiple-terraform-versions)
- [Manually managing multiple terragrunt versions](#manually-managing-multiple-terragrunt-versions)

##### Using homebrew to manage multiple terragrunt versions

Like `terraform`, you can use Homebrew to manage multiple `terraform` versions, using the same method described above in
[Using homebrew to manage multiple terraform versions](#using-homebrew-to-manage-multiple-terraform-versions). To use
the method for terragrunt, replace the references for `terraform` with `terragrunt`. For example, in the first step when
searching for the homebrew commit that introduces the Terragrunt version for `0.18.7`, you would run:

```
$ git log master -- Formula/terragrunt.rb
```

instead of the equivalent one for Terraform.

##### Manually managing multiple terragrunt versions

Like `terraform`, you can use the method described above in [Manually managing multiple terraform
versions](#manually-managing-multiple-terraform-versions) to manage multiple versions of Terragrunt.

You can find the available binaries for each terragrunt version
[here](https://github.com/gruntwork-io/terragrunt/releases).


#### Migrate terraform.tfvars to terragrunt.hcl

Once you have terragrunt 0.19 available on your machine, you will need to migrate your `terraform.tfvars` files to
`terragrunt.hcl` files before you can start to use the new version. You will need to follow the steps outlined in the
[Terragrunt 0.19.x migration
guide](https://github.com/gruntwork-io/terragrunt/blob/master/_docs/migration_guides/upgrading_to_terragrunt_0.19.x.md)
for each of your live config (e.g in your `infrastructure-live` repo).

You should do this in parallel with each module upgrade. For example, if you were upgrading the module
`infrastructure-modules/networking/vpc-app`, you should upgrade the live config that deploys that module to a pre-prod
environment to test the changes you are making to that module (e.g
[`infrastructure-live/dev/us-east-1/dev/vpc`](https://github.com/gruntwork-io/infrastructure-live-multi-account-acme/tree/dd6dce7f737f8c1bd32466b69e905b2bdd25db80/dev/us-east-1/dev/vpc)).
The rough process should be:

1. Upgrade the module to TF12 syntax following the steps [listed above](#upgrade-each-module-for-0-12-compatibility).
1. Push the changes to a branch for testing.
1. Update the live config for a pre-prod environment that deploys the module.
1. Update the `ref` tag to the module in the live config to point to the branch cut in step 2.
1. Run `terragrunt plan` to verify the changes. Carefully review to make sure there are no disruptive changes. If you
   had been keeping the modules up to date with Gruntwork releases, there should be minimal to 0 changes to the
   underlying resources.
1. Once you are satisfied with the changes, run `terragrunt apply` to deploy the changes.
1. Run smoke tests on your infrastructure to verify that the changes applied cleanly.
1. Once you are satisfied with the deployment, open a PR, review, merge the changes, and issue a new release for the
   changes in `infrastructure-modules`.
1. Update the `ref` tag in your live config to point to the released version of `infrastructure-modules` in the pre-prod
   environment. Then, open a PR, review, and merge the changes.

After this, you have the option of either propagating the changes across all your environments, or moving on to the next
module before promoting the changes. Depending on your infrastructure setup, you may prefer one approach over the other:

- Immediately promoting the changes ensure there is minimal drift between your environments. This means that you can
  quickly test changes in your pre-prod environments to deal with issues in your prod environment.
- Immediately promoting the changes can drive towards immediately upgrading the rest of the modules, as opposed to
  delaying the problem.
- Delaying promotion ensures that you can deal with problems in your existing infrastructure on a stable foundation.
- Delaying promotion allows you to minimize disruption from environments being in a mixed version state, that might
  prevent you from addressing issues in downstream modules.


#### Switch common tfvars files to use yaml

Terragrunt supports ingesting common `tfvars` files to pass global variables to your terraform modules through the use
of [`required_var_files` and `optional_var_files` in the
config](https://github.com/gruntwork-io/terragrunt#required-and-optional-var-files). However, using `tfvars` files to
set variables that are not available in your modules is now deprecated, and will become [an error starting with Terraform
0.13.x](https://github.com/hashicorp/terraform/issues/19424#issuecomment-472186386). As such, some configurations may
start to get a loud warning that they are setting variables that are not configured in the underlying modules.

Terragrunt works around this limitation through the use of environment variables to pass in the inputs. This means that
input variables defined in the `inputs` attribute of a `terragrunt.hcl` config are not restricted by this limitation.
Additionally, Terragrunt 0.19 and newer support all built in functions of Terraform in the config. You can combine these
two features to still make use of common variables.

If you have `tfvars` files that set variables that are not defined in all modules that use them, you can follow the
following steps to workaround the new warnings in TF12:

- Replace all common `tfvars` files to `yaml` syntax. For example, if you had a file `account.tfvars` with the content:
  ```hcl
  aws_account_id             = 1111111111
  terraform_state_s3_bucket  = "acme-multi-account-dev-terraform-state"
  terraform_state_aws_region = "us-east-1"
  ```
  you should replace this with a file `account.yaml` with the content:
  ```yaml
  aws_account_id: 1111111111
  terraform_state_s3_bucket: "acme-multi-account-dev-terraform-state"
  terraform_state_aws_region: "us-east-1"
  ```

- At the root of your repo, create yaml file named `empty.yaml`. This is used to inject an empty object when the common
  yaml vars files can not be found in the directory tree. It should have the content:
  ```yaml
  {}
  ```

- Remove references to the `tfvars` files in the root `terragrunt.hcl` config.
- Source and merge in the common vars into the `inputs` attribute of the root `terragrunt.hcl` config. For example, if
  you had an `account.yaml` file that needed to be passed in to your modules:
  ```
  inputs = merge(
    yamldecode(
      file("${get_terragrunt_dir()}/${find_in_parent_folders("account.yaml", "${path_relative_from_include()}/empty.yaml")}"),
    ),
    {
      # additional vars
    },
  )
  ```

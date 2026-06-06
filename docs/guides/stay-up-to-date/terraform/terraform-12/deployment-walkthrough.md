# Deployment Walkthrough

The following sections outline the steps you need to take in order to migrate from Terraform &lt;= 0.11.X and Terragrunt &lt;=
v0.18.x to Terraform 0.12.x and newer and Terragrunt 0.19.x and newer:

1. [Upgrade modules for compatibility with Terraform 0.12.x](#upgrade-modules-for-compatibility-with-terraform-012x)
1. [Upgrade live config for compatibility with Terragrunt
   0.19.x](#upgrade-live-config-for-compatibility-with-terragrunt-019x)

## <a id="upgrade-modules-for-compatibility-with-terraform-012x"></a>Upgrade modules for compatibility with Terraform 0.12.x

Terraform 0.12.x introduces many syntactic updates to make working with the language better, such as first-class
expressions, `for` and `for_each`, a more powerful type system, better error messages, [and
more](https://www.hashicorp.com/blog/announcing-terraform-0-12). However, there a few backwards incompatible changes
that prevent using your TF11 and older modules directly with TF12. For the safest and robust upgrade path, we recommend
going through the process of updating all your modules to use the new HCL2 syntax using the `terraform 0.12upgrade` tool
that ships with TF12.

Before starting, read through the [Terraform 0.12 upgrade guide](https://www.terraform.io/upgrade-guides/0-12.html) so
you can learn about the types of changes you’ll have to make. Familiarity of the changes help with detecting errors and
gotchas that the upgrade tool occasionally misses.

Here is the rough process:

1. [Install and setup Terraform 0.12](#install-and-setup-terraform-012)
1. [Upgrade each module for 0.12 compatibility](#upgrade-each-module-for-012-compatibility)

### Install and setup Terraform 0.12

To use Terraform 0.12, you will need to have the binary available on your machine. However, you don't want to blindly
replace your existing `terraform` binary to the newer version, because that would mean you wouldn't be able to use the
0.11 binary for your old code when you need to make a change to the existing infrastructure.

Here are two ways for you to support having 0.11 and 0.12 simultaneously on your machine:

- [Using homebrew to manage multiple terraform versions](#using-homebrew-to-manage-multiple-terraform-versions)
- [Using mise to manage multiple terraform versions](#using-mise-to-manage-multiple-terraform-versions)
- [Manually managing multiple terraform versions](#manually-managing-multiple-terraform-versions)

#### <a id="using-homebrew-to-manage-multiple-terraform-versions"></a>Using homebrew to manage multiple terraform versions

If you are on a Mac, you have the option of managing multiple terraform versions using homebrew. You can follow the
instructions published in our blog post [Installing Multiple Versions of Terraform with
Homebrew](https://blog.gruntwork.io/installing-multiple-versions-of-terraform-with-homebrew-899f6d124ff9) to setup
Homebrew to manage multiple versions of terraform, which you can then use `brew switch` to switch between them.

#### <a id="using-mise-to-manage-multiple-terraform-versions"></a>Using mise to manage multiple terraform versions

If you are on any Unix based system, you have the option of relying on [mise](https://github.com/jdx/mise).
`mise` is a tool used to provide a CLI for managing multiple versions of terraform (and many other software packages). Once you have it
installed, `mise` will manage the binaries in your home directory and create symlinks that allow it to invoke the
currently selected Terraform version.

For example, here is an example of using `mise` to install and manage both TF11 and TF12:

First, you need to install the versions that you wish to use:

```bash
$ mise install terraform@0.11.14
$ mise install terraform@0.12.6
```

Once the versions are installed, you can switch between the two using the `use` command:

```bash
$ mise use terraform@0.11.14
$ terraform version
# Terraform v0.11.14

$ mise use terraform@0.12.6
$ terraform version
# Terraform v0.12.6
```

#### <a name="manually-managing-multiple-terraform-versions"></a>Manually managing multiple terraform versions

If you are on a non-Unix based machine (such that you can't use `mise`), or if you have restrictions on software that
can be installed on your machine, then your only option is to manage the Terraform versions manually. In this method,
you download each version of Terraform under a different alias (e.g `terraform0.12` for TF12 and `terraform0.11` for
TF11), and then have it available in a common folder that you can track and find. Then, whenever you need to use a
particular version, you copy the binary of the version you want to use into a location available in your `PATH` under
the name `terraform`.

For example, on a Unix based machine, you can store all the Terraform binaries in the folder `$HOME/.terraform`:

```bash
.terraform
├── 0.11.14
│   └── terraform0.11
└── 0.12.6
    └── terraform0.12
```

Then, every time you want to switch versions, you can copy the binary to `/usr/local/bin`:

```bash
cp ~/.terraform/0.11.14/terraform0.11 /usr/local/bin/terraform
terraform version
# Terraform v0.11.14
cp ~/.terraform/0.12.6/terraform0.12 /usr/local/bin/terraform
terraform version
# Terraform v0.12.6
```

You can find the available binaries for each terraform version [here](https://releases.hashicorp.com/terraform/).

### Upgrade each module for 0.12 compatibility

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
   table](version-compatibility-table.md) (or newer). For example,
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
     especially problematic for comments within blocks (e.g., in the middle of a vars = \{ … \}) block.
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
1. Test the changes locally using `--terragrunt-source` (see the docs on [working
   locally](https://github.com/gruntwork-io/terragrunt#working-locally)). Note that you will need to upgrade the
   corresponding live config to [Terragrunt 0.19.x first](#upgrade-live-config-for-compatibility-with-terragrunt-019x).
1. Once you are satisfied with the changes, create a branch, push to the repository, open a PR, merge, and release.

## <a name="upgrade-live-config-for-compatibility-with-terragrunt-019x"></a>Upgrade live config for compatibility with Terragrunt 0.19.x

Terragrunt 0.19.x introduces a new file format for the live config. This format has many advantages, including
supporting all built in functions available to Terraform. However, this means that you will need to convert all your
terragrunt `terraform.tfvars` files to the new syntax.

Here is the rough process:

1. [Install and setup Terragrunt 0.19](#install-and-setup-terragrunt-019)
1. [Migrate terraform.tfvars to terragrunt.hcl](#migrate-terraformtfvars-to-terragrunthcl)
1. [Switch common tfvars files to use yaml](#switch-common-tfvars-files-to-use-yaml)

### Install and setup Terragrunt 0.19

You will also need to setup the Terragrunt 0.19 binary in a [similar fashion to setting up Terraform
0.12](#install-and-setup-terraform-012). You can use the same instructions available for managing Terraform 0.12 as for
managing Terragrunt 0.19.

- [Using homebrew to manage multiple terragrunt versions](#using-homebrew-to-manage-multiple-terraform-versions)
- [Using mise to manage multiple terragrunt versions](#using-mise-to-manage-multiple-terragrunt-versions)
- [Manually managing multiple terragrunt versions](#manually-managing-multiple-terragrunt-versions)

#### <a name="using-homebrew-to-manage-multiple-terraform-versions"></a>Using homebrew to manage multiple terragrunt versions

Like `terraform`, you can use Homebrew to manage multiple `terragrunt` versions, using the same method described above in
[Using homebrew to manage multiple terraform versions](#using-homebrew-to-manage-multiple-terraform-versions). To use
the method for terragrunt, replace the references for `terraform` with `terragrunt`. For example, in the first step when
searching for the homebrew commit that introduces the Terragrunt version for `0.18.7`, you would run:

```
$ git log master -- Formula/terragrunt.rb
```

instead of the equivalent one for Terraform.

#### <a id="using-mise-to-manage-multiple-terragrunt-versions"></a>Using mise to manage multiple terragrunt versions

As with Homebrew, you can also use `mise` to manage multiple `terragrunt` versions, using the same method described above in
[Using mise to manage multiple terraform versions](#using-mise-to-manage-multiple-terraform-versions). To use
the method for Terragrunt, replace the references for `terraform` with `terragrunt`.

For example, to install and use `terragrunt` version `0.18.7`, you would run:
```
mise install terragrunt@0.18.7
mise use terragrunt@0.18.7
```

#### <a name="manually-managing-multiple-terragrunt-versions"></a>Manually managing multiple terragrunt versions

Like `terraform`, you can use the method described above in [Manually managing multiple terraform
versions](#manually-managing-multiple-terraform-versions) to manage multiple versions of Terragrunt.

You can find the available binaries for each terragrunt version
[here](https://github.com/gruntwork-io/terragrunt/releases).

### Migrate terraform.tfvars to terragrunt.hcl

Once you have terragrunt 0.19 available on your machine, you will need to migrate your `terraform.tfvars` files to
`terragrunt.hcl` files before you can start to use the new version. You will need to follow the steps outlined in the
[Terragrunt 0.19.x migration
guide](https://github.com/gruntwork-io/terragrunt/blob/master/docs/_docs/06_migration_guides/upgrading_to_terragrunt_0.19.x.md)
for each of your live config (e.g in your `infrastructure-live` repo).

You should do this in parallel with each module upgrade. For example, if you were upgrading the module
`infrastructure-modules/networking/vpc-app`, you should upgrade the live config that deploys that module to a pre-prod
environment to test the changes you are making to that module (e.g
[`infrastructure-live/dev/us-east-1/dev/vpc`](https://github.com/gruntwork-io/infrastructure-live-multi-account-acme/tree/dd6dce7f737f8c1bd32466b69e905b2bdd25db80/dev/us-east-1/dev/vpc)).
The rough process should be:

1. Upgrade the module to TF12 syntax following the steps [listed above](#upgrade-each-module-for-012-compatibility).
1. Update the live config for a pre-prod environment that deploys the module.
1. Run `terragrunt plan` to verify the changes. Use `--terragrunt-source` so you can point to the updated module (see
   the docs on [working locally](https://github.com/gruntwork-io/terragrunt#working-locally)). Carefully review to make
   sure there are no disruptive changes. If you had been keeping the modules up to date with Gruntwork releases, there
   should be minimal to 0 changes to the underlying resources.
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

### Switch common tfvars files to use yaml

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
  ```hcl
  inputs = merge(
    yamldecode(
      file("${get_terragrunt_dir()}/${find_in_parent_folders("account.yaml", "${path_relative_from_include()}/empty.yaml")}"),
    ),
    {
      # additional vars
    },
  )
  ```

## Acme change sets

We applied the above procedure to our Acme Reference Architecture repos. You can see the pull requests for each repo
here:

- [infrastructure-live-multi-account-acme](https://github.com/gruntwork-io/infrastructure-live-multi-account-acme/pull/21)
- [infrastructure-modules-multi-account-acme](https://github.com/gruntwork-io/infrastructure-modules-multi-account-acme/pull/23)
- [infrastructure-live-acme](https://github.com/gruntwork-io/infrastructure-live-acme/pull/18)
- [infrastructure-modules-acme](https://github.com/gruntwork-io/infrastructure-modules-acme/pull/23)

## Known issues

- When upgrading `iam-groups`, you may run into an error where you will not be able to `plan`, `apply`, or `destroy` the
  resources. You will get an error message similar to below:

  ```bash
  Error: Invalid count argument
      on .terraform/modules/iam_groups/modules/iam-groups/main.tf line 230, in resource "aws_iam_group" "cross_account_access_groups":
      230:   count = length(data.template_file.cross_account_group_names.*.rendered)
  ```

  This is due to a bug in terraform where it does not realize that the data source can be calculated at `plan` time. You
  can read more about the issue on [the bug ticket here](https://github.com/hashicorp/terraform/issues/21450).
  This issue is fixed in `module-security`
  [v0.18.1](https://github.com/gruntwork-io/module-security/releases/tag/v0.18.1). If you encounter this issue, upgrade
  `module-security` to `v0.18.1`. Note that `v0.18.0` has a backwards incompatible change and will require code changes
  if you are upgrading from a version less than `v0.18.0`. You can see the necessary changes you need to make in [the
  release notes](https://github.com/gruntwork-io/module-security/releases/tag/v0.18.0).

- When upgrading `iam-groups` to `v0.18.1` from a version older than `v0.17.0`, you may run into an issue different from
  the previous one where you will not be able to run `plan`, `apply`, or `destroy`. The error message in this case will
  look similar to below:

  ```bash
  ...

  Error: Unsupported attribute
    on .terraform/modules/iam_groups/modules/iam-groups/outputs.tf line 38, in output "ssh_grunt_sudo_users_group_arns":
    38:   value = [for _, group in aws_iam_group.ssh_iam_sudo_users : group.arn]

  This value does not have any attributes.

  ...
  ```

  This is due to a bug in terraform where it can not properly handle the migration of state representation from a single
  resource to a resource using `for_each`. You can read more about the issue on [the bug ticket
  here](https://github.com/hashicorp/terraform/issues/22375). To resolve this, you need to do state surgery to update
  the representation. This will be done by first removing the original resource from the state, and then importing it.

  To resolve this issue, follow the following steps:

1. Make sure the module code is updated to `module-security` v0.18.1 and you are using terraform with version at
   least 0.12.6.
1. Run `terragrunt state list` to show all the state resources. You should see something like below:

   ```bash
   data.aws_caller_identity.current
   module.iam_groups.aws_iam_group.billing
   module.iam_groups.aws_iam_group.developers
   module.iam_groups.aws_iam_group.full_access
   module.iam_groups.aws_iam_group.iam_user_self_mgmt
   module.iam_groups.aws_iam_group.read_only
   module.iam_groups.aws_iam_group.ssh_iam_sudo_users
   module.iam_groups.aws_iam_group.ssh_iam_users
   module.iam_groups.aws_iam_group.use_existing_iam_roles
   module.iam_groups.aws_iam_group_policy.billing
   module.iam_groups.aws_iam_group_policy.developers
   module.iam_groups.aws_iam_group_policy.developers_personal_s3_bucket
   module.iam_groups.aws_iam_group_policy.full_access
   module.iam_groups.aws_iam_group_policy.read_only
   module.iam_groups.aws_iam_group_policy.use_existing_iam_roles
   module.iam_groups.aws_iam_group_policy_attachment.billing_iam_user_self_mgmt
   module.iam_groups.aws_iam_group_policy_attachment.developers_iam_user_self_mgmt
   module.iam_groups.aws_iam_group_policy_attachment.full_access_iam_user_self_mgmt
   module.iam_groups.aws_iam_group_policy_attachment.iam_user_self_mgmt
   module.iam_groups.aws_iam_group_policy_attachment.read_only_iam_user_self_mgmt
   module.iam_groups.aws_iam_policy.iam_user_self_mgmt
   module.iam_groups.module.iam_policies.data.aws_iam_policy_document.allow_access_from_other_accounts
   module.iam_groups.module.iam_policies.data.aws_iam_policy_document.billing
   module.iam_groups.module.iam_policies.data.aws_iam_policy_document.developers
   module.iam_groups.module.iam_policies.data.aws_iam_policy_document.developers_s3_bucket
   module.iam_groups.module.iam_policies.data.aws_iam_policy_document.full_access
   module.iam_groups.module.iam_policies.data.aws_iam_policy_document.houston_cli_permissions
   module.iam_groups.module.iam_policies.data.aws_iam_policy_document.iam_user_self_mgmt
   module.iam_groups.module.iam_policies.data.aws_iam_policy_document.read_only
   module.iam_groups.module.iam_policies.data.aws_iam_policy_document.ssh_grunt_houston_permissions
   module.iam_groups.module.iam_policies.data.aws_iam_policy_document.ssh_grunt_permissions
   module.iam_groups.module.iam_policies.data.aws_iam_policy_document.use_existing_iam_roles
   ```

   The two objects to look for in particular are:

   ```bash
   module.iam_groups.aws_iam_group.ssh_iam_sudo_users
   module.iam_groups.aws_iam_group.ssh_iam_users
   ```

   If you have those entries, then this method should resolve the problem for you.

1. Inspect the state for one of the problem resources. Run `terragrunt state show module.iam_groups.aws_iam_group.ssh_iam_sudo_users`. This should look like below:

   ```hcl
   # module.iam_groups.aws_iam_group.ssh_iam_sudo_users:
   resource "aws_iam_group" "ssh_iam_sudo_users" {
       arn       = "arn:aws:iam::0000000000:group/ssh-grunt-sudo-users"
       id        = "ssh-grunt-sudo-users"
       name      = "ssh-grunt-sudo-users"
       path      = "/"
       unique_id = "00000000000000"
   }
   ```

   Note the value of the `id` field, as we will need it later.

1. Remove the state object so that it can be reconstructed in the new format. This operation doesn’t delete the
   object, but does remove it from the state so that terraform loses track of it. Don’t worry: we will restore it in
   step 4. The command to do this is: `terragrunt state rm module.iam_groups.aws_iam_group.ssh_iam_sudo_users`.

1. Import the object into the state as the new format. Run the following command, replacing `ID_OF_IAM_GROUP` with
   the `id` field you recorded in step 2: `terragrunt import "module.iam_groups.aws_iam_group.ssh_iam_sudo_users[\"ID_OF_IAM_GROUP\"]" ID_OF_IAM_GROUP`

1. Repeat steps 2-4 for `module.iam_groups.aws_iam_group.ssh_iam_users`.

At the end of this, you should be able to run `terragrunt plan` cleanly.


<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "9ccf2005b8561195476d33d189d1d44e"
}
##DOCS-SOURCER-END -->

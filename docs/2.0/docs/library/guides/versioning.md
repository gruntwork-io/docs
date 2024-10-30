import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Using Versioned Modules

Gruntwork versions the IaC library using [Semantic Versioning](https://semver.org/) (SemVer). Since much of the Gruntwork IaC Library is still pre-1.0.0, most of the Gruntwork IaC Library uses 0.MINOR.PATCH version numbers. With 0.MINOR.PATCH, the rules are a bit different, where we increment the:

- MINOR version when we make backward incompatible API changes, and
- PATCH version when we add backward compatible functionality or bug fixes

For modules that have submodules (e.g., terraform-aws-server/modules/single-server), not every release contains changes to every module. While using the latest available version is recommended, the version that most recently contains changes for a module can be found in each submodule’s reference in the [Library Reference](/2.0/reference/library).

![Submodules show the last version in which they were modified](/img/iac/stay-up-to-date/versioning/module_release_tag_versions.png)

We release new module versions using GitHub releases, refer to the release notes in the GitHub repository release page for a list of changes and migration guides (when necessary).

## Example: Reference a version

<Tabs groupId="tool-choice">
<TabItem value="Terraform" label="Terraform" default>

The git tag created by the release can then be referenced in the source argument for a module block sourcing from a git URL.

For example, below is a module block referencing version `0.15.4` of the `single-server` submodule from the `terraform-aws-server` module.
```hcl
module "my_instance" {
  source = "git::git@github.com:gruntwork-io/terraform-aws-server.git//modules/single-server?ref=v0.15.4"

  name = "my_instance"
  ami = "ami-123456"
  instance_type = "t2.medium"
  keypair_name = "my-keypair"
  user_data = "${var.user_data}"

  vpc_id = "${var.vpc_id}"
  subnet_id = "${var.subnet_id}"
}
```

</TabItem>
<TabItem value="Terragrunt" label="Terragrunt">

The git tag created by the release can then be referenced in the `source` argument for the `terraform` block in a `terragrunt.hcl` file.

For example, below is a module block referencing version `0.15.4` of the `single-server` submodule from the `terraform-aws-server` module.

```hcl
terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-server.git//modules/single-server?ref=v0.15.4"
}

generate "provider" {
  path = "provider.tf"
  if_exists = "overwrite_terragrunt"
  contents = <<EOF
provider "aws" {
  region = "us-west-2"
}
EOF
}

inputs = {
  name = "my_instance"
  ami = "ami-99999999999999999"
  instance_type = "t2.medium"
  keypair_name = ""
  vpc_id = "vpc-1234567890123456"
  subnet_id = "subnet-23456789012345678"
  attach_eip = false
}
```

</TabItem>
<TabItem value="Terragrunt with _envcommon" label="_envcommon (Terragrunt)">

When following the `_envcommon` pattern, there are two places that reference the git tag created by the release.

First, locate the file in which you are referencing the module in your `_envcommon` directory. Then, reference the git tag in the `source` argument for the `terraform` block in the file.

For example, if you were referencing the `single-server` module, your file path might look like the following:
```hcl title=_envcommon/services/single_ec2_instance.hcl
terraform {
  source = "${local.source_base_url}?ref=v0.15.4"
}

locals {
  source_base_url = "git::git@github.com:gruntwork-io/terraform-aws-server.git//modules/single-server"
}
```

Then, reference the git tag in the `source` argument for the `terraform` block in the `terragrunt.hcl` environment and region specific files that reference the file in the `_envcommon` directory. For example, if you were using this module to create a single EC2 instance in your development environment in the us-west-2 region of AWS, your file path would be `/dev/us-west-2/services/single_ec2_instance/terragrunt.hcl`.

```hcl title=/dev/us-west-2/services/single_ec2_instance/terragrunt.hcl
terraform {
  source = "${include.envcommon.locals.source_base_url}?ref=v0.15.4"
}

include "root" {
  path = find_in_parent_folders()
}

include "envcommon" {
  path = "${dirname(find_in_parent_folders())}/_envcommon/services/single_ec2_instance.hcl"
  merge_strategy = "deep"
  expose = true
}

inputs = {
  name = "my_instance"
  ami = "ami-99999999999999999"
  instance_type = "t2.medium"
  keypair_name = ""
  vpc_id = "vpc-1234567890123456"
  subnet_id = "subnet-23456789012345678"
  attach_eip = false
}
```

</TabItem>
</Tabs>

Once you start using versioned modules, it’s important to keep the modules up to date. Refer to the [Updating Modules](./updating-modules) guide to learn more.
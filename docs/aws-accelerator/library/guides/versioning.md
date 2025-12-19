import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Using Versioned Modules

Gruntwork versions the Infrastructure as Code (IaC) Library using [Semantic Versioning](https://semver.org/) (SemVer). Since much of the Gruntwork IaC Library remains pre-1.0.0, most version numbers follow the format `0.MINOR.PATCH`. For `0.MINOR.PATCH`, the versioning rules are as follows:

- The **MINOR** version is incremented when we introduce backward incompatible API changes.
- The **PATCH** version is incremented when we add backward compatible functionality or bug fixes.

For modules that include submodules (e.g., `terraform-aws-server/modules/single-server`), not every release will contain changes for all submodules. While we recommend using the latest version, you can identify the most recent version with modifications to a specific submodule in the [Library Reference](https://library.gruntwork.io).

![Submodules show the last version in which they were modified](/img/iac/stay-up-to-date/versioning/module_release_tag_versions.png)

We release new module versions through GitHub releases. Refer to the release notes in the corresponding GitHub repository’s release page for a detailed list of changes, including migration guides when applicable.

## Example: Reference a version

<Tabs groupId="tool-choice">
<TabItem value="Terraform" label="Terraform" default>

The git tag created by a release can be referenced in the `source` argument of a module block when sourcing from a git URL.

For example, the module block below references version `0.15.4` of the `single-server` submodule within the `terraform-aws-server` module:

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

The git tag created by a release can be referenced in the `source` argument of the `terraform` block within a `terragrunt.hcl` file.

For example, the following module block references version `0.15.4` of the `single-server` submodule from the `terraform-aws-server` module:

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

When following the `_envcommon` pattern, there are two places where the git tag created by a release is referenced.

First, identify the file in the `_envcommon` directory where the module is being referenced. Then, specify the git tag in the `source` argument of the `terraform` block within that file.

For example, if you are referencing the `single-server` module, the file path might look like this:

```hcl title=_envcommon/services/single_ec2_instance.hcl
terraform {
  source = "${local.source_base_url}?ref=v0.15.4"
}

locals {
  source_base_url = "git::git@github.com:gruntwork-io/terraform-aws-server.git//modules/single-server"
}
```

Next, specify the git tag in the `source` argument for the `terraform` block within the `terragrunt.hcl` files that are specific to an environment and region, which reference the file in the `_envcommon` directory. For example, if you are using this module to create a single EC2 instance in your development environment in the `us-west-2` AWS region, the file path would look like this:
`/dev/us-west-2/services/single_ec2_instance/terragrunt.hcl`

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

Once you start using versioned modules, it’s important to keep the modules up to date. Refer to the [Updating Modules](/docs/aws-accelerator/library/guides/updating-modules) guide to learn more.

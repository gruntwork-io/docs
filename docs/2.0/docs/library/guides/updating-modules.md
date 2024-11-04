import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Updating Versioned Modules

Updating a module or service requires changing the tagged version in the `source` attribute of the module block. For backwards compatible changes, this is as simple as incrementing the version number. For backwards incompatible changes, refer to the release notes for a migration guide in each module's Github repository release page.

We recommend updating module versions in your development environment first, followed by staging, then production, to ensure that the update and any required changes are well understood.

## Example: Update a version

<Tabs groupId="tool-choice">
<TabItem value="Terraform" label="Terraform" default>

Below is a module block referencing version `0.15.3` of the `single-server` submodule from the `terraform-aws-server` module.

To update to version `0.15.4`, you update the value to the right of `ref=` in the source attribute. Since the version number denotes that this update is backwards compatible, it should not require any other changes.

```hcl
module "my_instance" {
  # Old
  # source = "git::git@github.com:gruntwork-io/terraform-aws-server.git//modules/single-server?ref=v0.15.3"
  # New
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

After making the change, run `terraform plan`, inspect the output to ensure it looks as you expect, then run `terraform apply`.
</TabItem>
<TabItem value="Terragrunt" label="Terragrunt">

Below is a module block referencing version `0.15.3` of the `single-server` submodule from the `terraform-aws-server` module.

To update to version `0.15.4`, you update the value to the right of `ref=` in the source attribute. Since the version number denotes that this update is backwards compatible, it should not require any other changes.

```hcl
terraform {
  # Old
  # source = "github.com:gruntwork-io/terraform-aws-server.git//modules/single-server?ref=v0.15.3"
  # New
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

After making the change, run `terragrunt plan`, inspect the output to ensure it looks as you expect, then run `terragrunt apply`.

</TabItem>
<TabItem value="Terragrunt with _envcommon" label="_envcommon (Terragrunt)">

When following the `_envcommon` pattern, there are two places that reference the git tag created by the release — the `.hcl` file with the reference to the module in the `_envcommon` directory and the environment and region specific references to the _envcommon file.

Below is an example using the `_envcommon` pattern to reference version `0.15.3` of the `single-server` submodule from the `terraform-aws-server` module. To update to version `0.15.4`, you update the value to the right of `ref=` in the source attribute. Since the version number denotes that this update is backwards compatible, it should not require any other changes.

```hcl title=_envcommon/services/single_ec2_instance.hcl
terraform {
  # Old
  # source = "${local.source_base_url}?ref=v0.15.3"
  # New
  source = "${local.source_base_url}?ref=v0.15.4"
}

locals {
  source_base_url = "git::git@github.com:gruntwork-io/terraform-aws-server.git//modules/single-server"
}
```

```hcl title=/<your-environment>/<your-region>/services/single_ec2_instance/terragrunt.hcl
terraform {
  # Old
  # source = "${include.envcommon.locals.source_base_url}?ref=v0.15.3"
  # New
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

After making the change, run `terragrunt plan`, inspect the output to ensure it looks as you expect, then run `terragrunt apply`.

</TabItem>
</Tabs>

## Patcher

Keeping track of all references to modules and services is a complicated, error prone task. To solve this problem, Gruntwork developed [Patcher](/2.0/docs/patcher/concepts/), which shows the version of a module you are using, the latest version available, and the changelog for the module.
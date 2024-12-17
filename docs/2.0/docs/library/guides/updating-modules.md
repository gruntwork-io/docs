import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Updating Versioned Modules

To update a module or service, modify the tagged version in the `source` attribute of the module block. For backwards-compatible changes, this involves incrementing the version number. For backwards-incompatible changes, review the release notes in the module's GitHub repository release page for migration guidance.

We recommend updating module versions in your development environment first, followed by staging, and then production. This approach ensures the update and any necessary changes are fully tested and understood.

## Example: Update a version

<Tabs groupId="tool-choice">
<TabItem value="Terraform" label="Terraform" default>

Below is a module block referencing version `0.15.3` of the `single-server` submodule from the `terraform-aws-server` module.

To update to version `0.15.4`, change the value to the right of `ref=` in the `source` attribute. Since the version number indicates a backwards-compatible update, no additional changes should be required.

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
After making the change, run `terraform plan`, review the output to confirm it matches your expectations, then execute `terraform apply`.

</TabItem>
<TabItem value="Terragrunt" label="Terragrunt">

Below is a module block referencing version `0.15.3` of the `single-server` submodule from the `terraform-aws-server` module.

To update to version `0.15.4`, modify the value to the right of `ref=` in the `source` attribute. Since the version number indicates a backwards-compatible update, no additional changes should be required.

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

After making the change, run `terragrunt plan`, review the output to confirm it matches your expectations, then execute `terragrunt apply`.

</TabItem>

</Tabs>

## Patcher

Keeping track of all references to modules and services is complex and prone to errors. To simplify this process, Gruntwork developed [Patcher](/2.0/docs/patcher/concepts/). Patcher displays the version of a module currently in use, the latest available version, and the corresponding changelog, enabling efficient and accurate updates.


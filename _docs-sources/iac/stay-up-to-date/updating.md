# Updating

Updating a module or service requires updating the tagged version in the `source` attribute of a module block.

For backwards compatible changes, this is as simple as incrementing the version number. For backwards incompatible changes, refer to the release notes for a migration guide.

We recommend updating module versions in your development environment first, followed by staging, then production, to ensure that the update and any required changes are well understood.

## Example: Update a version

For example, below is a module block referencing version `0.15.3` of the `single-server` submodule from the `terraform-aws-server` module.

To update to version v0.15.4, you update the value to the right of `ref=` in the source attribute. Since the version number denotes that this update is backwards compatible, it should not require any other changes.

```tf
module "my_instance" {
  # OLD
  # source = "git::git@github.com:gruntwork-io/terraform-aws-server.git//modules/single-server?ref=v0.15.3"
  # New
  source = "git::git@github.com:gruntwork-io/terraform-aws-server.git//modules/single-server?ref=v0.15.4" <- updated ref

  name = "my_instance"
  ami = "ami-123456"
  instance_type = "t2.medium"
  keypair_name = "my-keypair"
  user_data = "${var.user_data}"

  vpc_id = "${var.vpc_id}"
  subnet_id = "${var.subnet_id}"
}
```

## Patcher

Keeping track of all references to modules and services is a complicated, error prone task. It's easy to miss a version or even be completely unaware that a downstream service is referencing a module. To solve this problem, Gruntwork developed [Patcher](https://docs.gruntwork.io/guides/stay-up-to-date/patcher), which shows the version of a module you are using, the latest version available, and the changelog for the module. If you're interested in trying out Patcher, please reach out to sales@gruntwork.io!


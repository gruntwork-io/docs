# Updating

Updating a module or service requires changing the tagged version in the `source` attribute of the module block. For backwards compatible changes, this is as simple as incrementing the version number. For backwards incompatible changes, refer to the release notes for a migration guide in each module's Github repository release page.

We recommend updating module versions in your development environment first, followed by staging, then production, to ensure that the update and any required changes are well understood.

## Example: Update a version

Below is a module block referencing version `0.15.3` of the `single-server` submodule from the `terraform-aws-server` module.

To update to version `0.15.4`, you update the value to the right of `ref=` in the source attribute. Since the version number denotes that this update is backwards compatible, it should not require any other changes.

```tf
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

## Patcher

Keeping track of all references to modules and services is a complicated, error prone task. To solve this problem, Gruntwork developed [Patcher](https://gruntwork.io/patcher), which shows the version of a module you are using, the latest version available, and the changelog for the module. If you're interested in trying out Patcher, [request early access](https://gruntwork.io/early-access)!



<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "2cb9cb3b954654b024bf8cb4a1faeac3"
}
##DOCS-SOURCER-END -->

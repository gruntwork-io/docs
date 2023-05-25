# Versioning

Gruntwork versions the IaC library using [Semantic Versioning](https://semver.org/) (SemVer). Since much of the Gruntwork IaC Library is still pre-1.0.0, most of the Gruntwork IaC Library uses 0.MINOR.PATCH version numbers. With 0.MINOR.PATCH, the rules are a bit different, where we increment the:

- MINOR version when we make backward incompatible API changes, and
- PATCH version when we add backward compatible functionality or bug fixes

For modules that have submodules (e.g., terraform-aws-server/modules/single-server), not every release contains changes to every module. While using the latest available version is recommended, the version that most recently contains changes for a module can be found in each submodule's reference in the [Library Reference](../reference/index.md).

We release new module versions using GitHub releases, refer to the release notes in the GitHub repository release page for a list of changes and migration guides (when necessary).

## Example: Reference a version

The git tag created by the release can then be referenced in the source argument for a module block sourcing from a git URL.

For example, below is a module block referencing version `0.15.4` of the `single-server` submodule from the `terraform-aws-server` module.
```tf
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

## What's next

Once you start using versioned modules, it's important to keep the modules up to date. Refer to the [Updating](./updating.md) guide to learn more.

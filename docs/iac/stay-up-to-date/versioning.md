# Versioning

Gruntwork versions the IaC library using [Semantic Versioning](https://semver.org/) (SemVer).
- Major version are used when making backwards incompatible changes.
- Minor version are used when adding new variables or a new feature.
- Patch versions are used for backward compatible bug fixes.

For modules that have submodules (e.g., terraform-aws-server/modules/single-server), not every release contains changes to every module. While using the latest available version is recommended, the version that most recently contains changes for a module can be found in each submodules reference in the [Library Reference](../reference/index.md).

New module versions are released by creating a release on Github.  When a new version is created, refer to the release notes for a list of changes and migration guides (when necessary).

## Reference a version

The git tag created by the release can then be referenced in the source argument for a module block sourcing from a git URL. For backwards compatible changes, updating is as simple as changing the tag version after `ref` in the source argument. For backwards incompatible releases, refer to the release notes for the migration guide.

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


<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "45f9da9e940c4729c914430d9677d4c5"
}
##DOCS-SOURCER-END -->

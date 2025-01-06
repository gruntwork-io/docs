
# Gruntwork release 2017-04

<p style={{marginTop: "-25px"}}><small><a href="/guides">Guides</a> / <a href="/guides/stay-up-to-date">Update Guides</a> / <a href="/guides/stay-up-to-date/releases">Releases</a> / 2017-04</small></p>

This page is lists all the updates to the [Gruntwork Infrastructure as Code
Library](https://gruntwork.io/infrastructure-as-code-library/) that were released in 2017-04. For instructions
on how to use these updates in your code, check out the [updating
documentation](/library/stay-up-to-date/updating).

Here are the repos that were updated:

- [terraform-aws-ci](#terraform-aws-ci)
- [terraform-aws-data-storage](#terraform-aws-data-storage)
- [terraform-aws-monitoring](#terraform-aws-monitoring)
- [terraform-aws-security](#terraform-aws-security)
- [terraform-aws-static-assets](#terraform-aws-static-assets)


## terraform-aws-ci


### [v0.3.12](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.3.12)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/24/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.3.12">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - The `publish-ami` script in the `aws-helpers` module now accepts an argument for `--markdown-title-text` so that the output markdown file may include an optional customized title.

</div>


### [v0.3.11](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.3.11)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/23/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.3.11">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - NEW MODULE: We&apos;ve added a new module [publish-ami](https://github.com/gruntwork-io/module-ci/tree/e0cbe8ee0a7c6b60a6ff59d6cc198082e7baa5c5/modules/aws-helpers) that will copy the given AMI to the desired AWS regions (or all AWS regions) and make it public. 

  We added this module because Gruntwork will soon be releasing open source modules for Vault, Nomad, and Consul and we needed a way to make AMIs built by those modules globally available and usable by anyone.

</div>


### [v0.3.10](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.3.10)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/11/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.3.10">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - UPDATE: `build-go-binaries` now defaults to `CGO_ENABLED=0` to build completely static binaries that do not depend on a specific implementation of C. This was requested because an Alpine Linux user (using the musl C library) could not run one of our binaries. Note that a `--cgo-enabled` option has been added that defaults to `false` but can be set to `true` to revert to the original behavior.

</div>


### [v0.3.9](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.3.9)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/6/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.3.9">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - UPDATE: HashiCorp changed the GitHub Packer repo from github.com/mitchellh/packer to github.com/hashicorp/packer. Because our `curl` commands didn&apos;t handle a redirect, this caused some of our scripts to fail. This update fixes that issue.

</div>



## terraform-aws-data-storage


### [v0.2.5](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.2.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/27/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.2.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  POTENTIAL DOWNTIME

https://github.com/gruntwork-io/module-data-storage/pull/20: Fix a bug where the RDS and Aurora module would exit with an error if you set `storage_encrypted` to false. 

**Note**: that if you update to this new version of `module-data-storage` and run `apply`, it will undeploy your old DB and deploy a new one to replace it. That&apos;s because fixing this bug required renaming the DB resources, which Terraform sees as a delete + create. 

To avoid this, you will need to use the `terraform state mv` command. 

**Aurora**

If you do not have encryption enabled:

```
terraform state mv module.database.aws_rds_cluster.cluster module.database.aws_rds_cluster.cluster_without_encryption
```

If you have encryption enabled:

```
terraform state mv module.database.aws_rds_cluster.cluster module.database.aws_rds_cluster.cluster_with_encryption
```

**RDS**

If you do not have encryption enabled:

```
terraform state mv module.database.aws_db_instance.primary module.database.aws_db_instance.primary_without_encryption
terraform state mv module.database.aws_db_instance.replicas module.database.aws_db_instance. replicas_without_encryption
```

If you have encryption enabled:

```
terraform state mv module.database.aws_db_instance.primary module.database.aws_db_instance.primary_with_encryption
terraform state mv module.database.aws_db_instance.replicas module.database.aws_db_instance. replicas_with_encryption
```

</div>


### [v0.2.4](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.2.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/1/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.2.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/module-data-storage/pull/18: The lambda snapshot functions now all expose the ID of the lambda IAM role via the output variable `lambda_iam_role_id`.

</div>


### [v0.2.3](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.2.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/1/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.2.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/module-data-storage/pull/17: Fix a bug in the `lambda-copy-shared-rds-snapshot` module where it didn&apos;t properly handle `DBSnapshotNotFound` errors.

</div>


### [v0.2.2](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.2.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/1/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.2.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/module-data-storage/pull/16: The `copy-rds-shared-snapshot` module now allows you to specify a KMS key via the optional `kms_key_id` parameter. If specified, this key will be used to encrypt the RDS snapshot copy.

</div>



## terraform-aws-monitoring


### [v0.4.3](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.4.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/24/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.4.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/module-aws-monitoring/pull/25, https://github.com/gruntwork-io/module-aws-monitoring/pull/26: Added a new module called [sns-to-slack](https://github.com/gruntwork-io/module-aws-monitoring/tree/master/modules/alarms/sns-to-slack) that makes it easy to send CloudWatch Alarms to Slack.

</div>



## terraform-aws-security


### [v0.4.16](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.4.16)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/28/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.4.16">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/module-security/pull/31: Enable CGO to fix the `ssh-iam` build so that the `user.Current()` method works. Only build `ssh-iam` for Linux.

</div>


### [v0.4.15](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.4.15)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/27/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.4.15">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/module-security/pull/30: Build the `ssh-iam` binary with Go 1.8.1.

</div>


### [v0.4.14](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.4.14)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/27/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.4.14">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - NEW MODULE: We&apos;ve added a module, [iam-user-password-policy](https://github.com/gruntwork-io/module-security/tree/master/modules/iam-user-password-policy) that makes it easy to use Terragrunt to create a password policy for your IAM Users.

</div>


### [v0.4.13](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.4.13)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/26/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.4.13">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/module-security/pull/27: Try to fix the `ssh-iam` build by upgrading to Go 1.8.

</div>


### [v0.4.12](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.4.12)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/26/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.4.12">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/module-security/pull/26: Ensure that `ssh-iam` always exits successfully when called from the `AuthorizedKeysCommand`, logs everything to `stderr`, and sends `stderr` to `syslog`.

</div>


### [v0.4.11](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.4.11)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/25/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.4.11">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/module-security/pull/24: Fix a bug in the auto-update module that would cause it to show an interactive prompt during install. This could cause automated builds to hang forever.

</div>


### [v0.4.10](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.4.10)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/2/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.4.10">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/module-security/pull/23: Add support for cross-account CloudTrail.

</div>


### [v0.4.9](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.4.9)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/1/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.4.9">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/module-security/pull/22: In the `kms-master-key` module, KMS key users now get the `CreateGrant` permission. This makes it possible to share RDS snapshots encrypted with this KMS key with another AWS account.

</div>



## terraform-aws-static-assets


### [v0.0.1](https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.0.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/4/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.0.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  First release!

</div>

<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "releases",
  "hash": "7a405c0b917fd420e437d110098181dc"
}
##DOCS-SOURCER-END -->

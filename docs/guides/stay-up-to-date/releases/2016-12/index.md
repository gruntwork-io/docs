
# Gruntwork release 2016-12

<p style={{marginTop: "-25px"}}><small><a href="/guides">Guides</a> / <a href="/guides/stay-up-to-date">Update Guides</a> / <a href="/guides/stay-up-to-date/releases">Releases</a> / 2016-12</small></p>

This page is lists all the updates to the [Gruntwork Infrastructure as Code
Library](https://gruntwork.io/infrastructure-as-code-library/) that were released in 2016-12. For instructions
on how to use these updates in your code, check out the [updating
documentation](/library/stay-up-to-date/updating).

Here are the repos that were updated:

- [boilerplate](#boilerplate)
- [terraform-aws-ci](#terraform-aws-ci)
- [terraform-aws-data-storage](#terraform-aws-data-storage)
- [terraform-aws-ecs](#terraform-aws-ecs)
- [terraform-aws-monitoring](#terraform-aws-monitoring)
- [terraform-aws-security](#terraform-aws-security)
- [terraform-aws-server](#terraform-aws-server)


## boilerplate


### [v0.2.0](https://github.com/gruntwork-io/boilerplate/releases/tag/v0.2.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/20/2016 | <a href="https://github.com/gruntwork-io/boilerplate/releases/tag/v0.2.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - We&apos;ve updated our CI build job to use Go 1.7.3. Before, we were using Go 1.6.x, which apparently [does not work with the latest version of OS X](https://golang.org/doc/go1.7#ports). 


</div>



## terraform-aws-ci


### [v0.3.1](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.3.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/21/2016 | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.3.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - Introduce a new module `circleci-helpers` meant to help some of the specific shortcomings of CircleCI. The first two scripts include:
  - `install-go-version` to install a specific version of Go, which is helpful since the default in CircleCI is 1.6.4.
  - `place-repo-in-gopath` to place the git repo in the `$GOPATH`, which is helpful because, by default, the repo is outside the `$GOPATH`, which breaks some Go tooling.


</div>


### [v0.3.0](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.3.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/21/2016 | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.3.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - Move `git-rebase` from `gruntwork-module-circleci-helpers` to new `git-helpers` modules. This is to help indicate that this script is not CircleCI-specific.


</div>


### [v0.2.2](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.2.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/21/2016 | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.2.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - Fix an issue where `terraform-update-variable` would fail because it was not executing the `git` repo directory.


</div>


### [v0.2.1](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.2.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/21/2016 | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.2.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - Add `git-rebase` to `gruntwork-module-circleci-helpers`. This is useful if you want to merge one git branch into another.


</div>


### [v0.2.0](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.2.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/20/2016 | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.2.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - The `configure-environment-for-gruntwork-module` script now installs Go 1.7.3 by default. CircleCi has Go 1.6.x installed, but binaries built with that version of Go [do not work on the latest version of OS X](https://golang.org/doc/go1.7#ports), so we have to upgrade. You can control the version of Go using the `--go-version` option. 


</div>


### [v0.1.0](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.1.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/19/2016 | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.1.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - BREAKING CHANGE, `terraform-deploy`: this script has been removed. You should use [Terragrunt](https://github.com/gruntwork-io/terragrunt) instead.
- BREAKING CHANGE, `build-docker-image`: this script will now look for the specified image/tag already in your Docker registry and if it exists, it will NOT replace it. In part, this is because want our artifacts to be immutable. In part, this makes it easy to use this script and automatically “promote” the same artifact from one environment to another (e.g. stage to prod). 
- ENHANCEMENT, `terraform-update-variable: this script now accepts`--git-url`and`--git-checkout-path` parameters to check out a Git repo before making the Terraform changes.
- MINOR CHANGE, `build-docker-image`: the `--output-properties-file` parameter is now optional.


</div>



## terraform-aws-data-storage


### [v0.1.3](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.1.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/15/2016 | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.1.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - The `rds` and `aurora` modules now provide `db_name` outputs that contain the name of the (logical) DB


</div>


### [v0.1.2](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.1.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/15/2016 | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.1.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - The `rds` and `aurora` modules now each take in an optional parameter called `db_name`. If you set that parameter to a non-empty string, when creating the RDS instances, it will also create a logical database with that given name.


</div>


### [v0.1.1](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.1.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/8/2016 | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.1.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - The aurora module now exposes a `reader_endpoint` output variable


</div>



## terraform-aws-ecs


### [v0.3.2](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.3.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/14/2016 | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.3.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - The `ecs-service` module now exposes a `use_auto_scaling` parameter that you should set to true when using auto scaling to determine how many instances of that service to run.


</div>



## terraform-aws-monitoring


### [v0.4.0](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.4.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/28/2016 | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.4.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - BREAKING CHANGE: The `elb-access-logs` module has renamed variables and outputs. It is now been replaced by the `load-balancer-access-logs`.
- NEW MODULE: The `load-balancer-access-logs` module replaces the `elb-access-logs` module and now officially supports both the Application Load Balancer (ALB) and Classic Load Balancer (ELB). It adds documentation for adding both the ALB and ELB, and the option to add archiving to the logs after a certain number of days.


</div>



## terraform-aws-security


### [v0.4.0](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.4.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/17/2016 | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.4.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  This release updates the `cloudtrail` module to support archiving of logs. 

Previously, you could either store logs in S3 (for $0.023 per GB) or delete them. Now, you can choose to archive [CloudTrail](https://aws.amazon.com/cloudtrail/) logs to AWS Glacier after a certain number of days, where you&apos;ll pay just $0.004 per GB.
- ENHANCEMENT: The `cloudtrail` module now exposes a new var, `num_days_after_which_archive_log_data`. If set to `0`, archiving is disabled. Otherwise, log files are automatically archived after the specified number of days.

This change is fully backwards-compatible in terms of the vars and outputs, but it makes use of features new to Terraform v0.8 such as conditionals, and therefore requires that you upgrade to Terraform v0.8.1  or higher before using. For that reason we have indicated in the version release that this is a &quot;breaking&quot; change.


</div>


### [v0.3.0](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.3.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/13/2016 | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.3.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  This release adds two new features to the `iam-groups` module:
- ENHANCEMENT: `iam-groups` now exposes the Terraform variable `should_require_mfa`. If true, an IAM User must use multi-factor authentication (MFA) to access any AWS services, with the exception of a very limited set of permissions the IAM User needs to initialize her MFA Device and reset her password.
- ENHANCEMENT: `iam-groups` now adds the IAM Group `developers` by default (though it&apos;s still optional). Some teams will add all IAM Users to the `full-access` IAM Group. But for those teams that wish to create an IAM User whose permissions go beyond `read-only` but below `full-access`, the `developers` IAM Group offers such an option. 
  
  You can customize which set of AWS Services IAM Users in `developers` will receive full access to through the `iam_group_developers_permitted_services` Terraform variable. In addition, the `developers` IAM Group grants IAM Users access to a personal S3 Bucket.


</div>



## terraform-aws-server


### [v0.1.3](https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.1.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/9/2016 | <a href="https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.1.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - Fix a bug where `mount-ebs-volume` was not detected the &quot;VolumeInUse&quot; error correctly due to an overflow error with bash exit codes.


</div>


### [v0.1.2](https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.1.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/9/2016 | <a href="https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.1.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - Fix bug in `mount-ebs-volume` where, if the EBS volume was already mounted, it would try to call a `string_contains` function that didn&apos;t exist, and the whole script would exit with an error.


</div>




<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "releases",
  "hash": "7954686585e9d7d825844cf92d9b648e"
}
##DOCS-SOURCER-END -->

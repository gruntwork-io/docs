
# Gruntwork release 2018-05

<p style={{marginTop: "-25px"}}><small><a href="/guides">Guides</a> / <a href="/guides/stay-up-to-date">Update Guides</a> / <a href="/guides/stay-up-to-date/releases">Releases</a> / 2018-05</small></p>

This page is lists all the updates to the [Gruntwork Infrastructure as Code
Library](https://gruntwork.io/infrastructure-as-code-library/) that were released in 2018-05. For instructions
on how to use these updates in your code, check out the [updating
documentation](/library/stay-up-to-date/updating).

Here are the repos that were updated:

- [gruntwork](#gruntwork)
- [terraform-aws-asg](#terraform-aws-asg)
- [terraform-aws-ci](#terraform-aws-ci)
- [terraform-aws-data-storage](#terraform-aws-data-storage)
- [terraform-aws-ecs](#terraform-aws-ecs)
- [terraform-aws-lambda](#terraform-aws-lambda)
- [terraform-aws-load-balancer](#terraform-aws-load-balancer)
- [terraform-aws-sam](#terraform-aws-sam)
- [terraform-aws-security](#terraform-aws-security)


## gruntwork


### [v0.0.19](https://github.com/gruntwork-io/gruntwork/releases/tag/v0.0.19)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/16/2018 | <a href="https://github.com/gruntwork-io/gruntwork/releases/tag/v0.0.19">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/gruntwork/pull/27: Create AWS accounts sequentially as that seems to now be a requirement of AWS Organizations.

</div>


### [v0.0.18](https://github.com/gruntwork-io/gruntwork/releases/tag/v0.0.18)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/9/2018 | <a href="https://github.com/gruntwork-io/gruntwork/releases/tag/v0.0.18">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/gruntwork/pull/24: Exit with an error if an account name cannot be found.

</div>



## terraform-aws-asg


### [v0.6.11](https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.6.11)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/31/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.6.11">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/module-asg/pull/34: Fix an intermittent bug in `asg-rolling-deploy` that would cause the error `argument --tag-value: expected one argument`.

</div>


### [v0.6.10](https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.6.10)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/9/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.6.10">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  The following changes were made to the `server-group` module:

- IMPROVEMENT: Fixed an issue where an Auto Scaling Group&apos;s `DesiredInstances` property was left at 0 after the `rolling_deployment.py` script failed to reach a passing health check before timing out. (#29)
- IMPROVEMENT: Expose `var.deployment_health_check_max_retries` and `var.deployment_health_check_retry_interval_in_seconds` so that Terraform code that calls the `server-group` module can control how long the `rolling_deployment.py` will run before timing out. (#29)
- IMPROVEMENT: Updated to latest version of Boto to address transient AWS issues. (#29)
- IMPROVEMENT: Expose `var.additional_security_group_ids` to add arbitrary Security Groups to the Launch Configuration created.

</div>



## terraform-aws-ci


### [v0.10.0](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.10.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/25/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.10.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/module-ci/pull/60: The `git-add-commit-push` script no longer defaults the branch name to `$CIRCLE_BRANCH`. Instead, it uses `git` to look up the name of the currently checked-out branch in `pwd`. In most cases this will produce the exact same effect as before and no code changes will be required. Note that you can always use the `--branch-name` argument to override the default branch name in `git-add-commit-push`.

</div>


### [v0.9.0](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.9.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/24/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.9.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/module-ci/pull/58: 

BACKWARDS INCOMPATIBLE CHANGES

* `git-add-commit-push` has been moved from the `gruntwork-module-circleci-helpers` module to the `git-helpers` module.
* `terraform-update-variable` now depends on `git-helpers` being installed, as it uses `git-add-commit-push` under the hood to be able to more reliably commit and push changes.

</div>


### [v0.8.0](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.8.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/16/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.8.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/module-ci/pull/56: 

BACKWARDS INCOMPATIBLE CHANGE. 

All the pre-commit hooks that were in `modules/pre-commit` are now in their own open source repo: https://github.com/gruntwork-io/pre-commit. Please update your `.pre-commit-config.yml` files to point to the new repo and its version numbers.

</div>



## terraform-aws-data-storage


### [v0.6.6](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.6.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/21/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.6.6">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/module-data-storage/pull/48: The `rds` module now exposes a `publicly_accessible` parameter that you can set to true to make the DB accessible from the public Internet (NOT recommended for most use cases).

</div>


### [v0.6.5](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.6.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/17/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.6.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/module-data-storage/pull/47: In the `aurora` module, you can now use the `db_instance_parameter_group_name` param to set the parameter group for instances separately from the parameter group for the entire cluster (which can be set via the `db_cluster_parameter_group_name` param).

</div>


### [v0.6.4](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.6.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/4/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.6.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/module-data-storage/pull/46: Explicitly set the `minor_version_upgrade` setting on `rds` read replicas so they use the same setting as the primary.

</div>


### [v0.6.3](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.6.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/2/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.6.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/module-data-storage/pull/44: Explicitly disable snapshots for replicas so you can successfully destroy them without hitting errors.

</div>



## terraform-aws-ecs


### [v0.6.6](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.6.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/14/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.6.6">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

</div>


### [v0.6.5](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.6.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/8/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.6.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

</div>



## terraform-aws-lambda


### [v0.2.2](https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.2.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/27/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.2.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/package-lambda/pull/13, https://github.com/gruntwork-io/package-lambda/pull/14: We&apos;ve added a new `keep-warm` module that can be used to invoke your Lambda functions on a scheduled basis, and with a configurable concurrency level, keeping those functions warm to avoid the cold start overhead.

</div>



## terraform-aws-load-balancer


### [v0.9.0](https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.9.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/24/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.9.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
```bash
terragrunt state mv module.&lt;module&gt;.aws_lb.nlb module.&lt;module&gt;.aws_lb.nlb_&lt;num&gt;_az
```

Replace `&lt;module&gt;` with the name of your module and `&lt;num&gt;` with the amount of subnet mappings you provided. See an [example](https://github.com/gruntwork-io/module-load-balancer/tree/master/examples/nlb-with-subnet-mappings) for more details.

</div>



## terraform-aws-sam


### [v0.1.5](https://github.com/gruntwork-io/terraform-aws-sam/releases/tag/v0.1.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/8/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-sam/releases/tag/v0.1.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

</div>


### [v0.1.4](https://github.com/gruntwork-io/terraform-aws-sam/releases/tag/v0.1.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/8/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-sam/releases/tag/v0.1.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

</div>


### [v0.1.3](https://github.com/gruntwork-io/terraform-aws-sam/releases/tag/v0.1.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/7/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-sam/releases/tag/v0.1.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - fix a bug where all HTTP verbs were not being handled properly
- fix a bug where multiple HTTP verbs defined on the same endpoint were not being processed sucessfully

</div>



## terraform-aws-security


### [v0.10.0](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.10.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/30/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.10.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/module-security/pull/93:

BACKWARDS INCOMPATIBLE CHANGE

* The `cross-account-iam-roles` module now sets a default max expiration of 12 hours for IAM Roles intended for human users (e.g., `allow-read-only-access-from-other-accounts`) and a default max expiration of 1 hour for IAM Roles intended for machine users (e.g., `allow-auto-deploy-access-from-other-accounts`). Both of these expiration values are configurable via the new input variables `max_session_duration_human_users` and `max_session_duration_machine_users`.

* The `aws-auth` script now accepts optional `--mfa-duration-seconds` and `--role-duration-seconds` parameters that specify the session expiration for the creds you get back when authenticating with an MFA token or assuming an IAM role, respectively. The default for both of these has been set to 12 hours to be more human-friendly.

</div>


### [v0.9.0](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.9.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/28/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.9.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/module-security/pull/92:

BACKWARDS INCOMPATIBLE CHANGES

1. The `auto-update`, `ntp`, `fail2ban`, and `ip-lockdown` modules now all use [bash-commons](https://github.com/gruntwork-io/bash-commons) under the hood. That means you must install `bash-commons` *before* installing any of those other modules.

1. The `auto-update` and `ntp` modules now support Amazon Linux 2. We will add Amazon Linux 2 support for `fail2ban` and `ip-lockdown` modules in the future.

</div>

<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "releases",
  "hash": "0cac4ef8efefab7906ebda4b9f348d1f"
}
##DOCS-SOURCER-END -->

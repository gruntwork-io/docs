
# Gruntwork release 2017-05

<p style={{marginTop: "-25px"}}><small><a href="/guides">Guides</a> / <a href="/guides/stay-up-to-date">Update Guides</a> / <a href="/guides/stay-up-to-date/releases">Releases</a> / 2017-05</small></p>

This page is lists all the updates to the [Gruntwork Infrastructure as Code
Library](https://gruntwork.io/infrastructure-as-code-library/) that were released in 2017-05. For instructions
on how to use these updates in your code, check out the [updating
documentation](/library/stay-up-to-date/updating).

Here are the repos that were updated:

- [sample-app-frontend-acme](#sample-app-frontend-acme)
- [terraform-aws-ci](#terraform-aws-ci)
- [terraform-aws-data-storage](#terraform-aws-data-storage)
- [terraform-aws-monitoring](#terraform-aws-monitoring)
- [terraform-aws-security](#terraform-aws-security)
- [terraform-aws-server](#terraform-aws-server)


## sample-app-frontend-acme


### [release-v0.0.1](https://github.com/gruntwork-io/sample-app-frontend-acme/releases/tag/release-v0.0.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/31/2017 | <a href="https://github.com/gruntwork-io/sample-app-frontend-acme/releases/tag/release-v0.0.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  (no release notes found)

</div>



## terraform-aws-ci


### [v0.3.16](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.3.16)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/27/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.3.16">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - UPDATE: The `build-packer-artifact` script now accepts zero or more arguments of the form `--var key=value` so that key-val pairs can be passed as variables to a Packer build. (#36, #37)

</div>


### [v0.3.15](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.3.15)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/19/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.3.15">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - UPDATE: The `git-add-commit-push` command now does a `git pull` before it does a `git push`. In addition, the `git push` command now has configurable behavior for [push.default](https://git-scm.com/docs/git-config#git-config-pushdefault) and now defaults to `simple` instead of `matching`. (#32)

</div>


### [v0.3.14](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.3.14)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/18/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.3.14">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/module-ci/pull/34: The `build-docker-image` script will now pass any args the script isn’t explicitly expecting (e.g. `--docker-image-name`) directly to the `docker build` command.

</div>


### [v0.3.13](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.3.13)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/7/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.3.13">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/module-ci/pull/30: The `build-docker-image` and `build-packer-artifact` scripts now allow you to customize the key in the output properties file.

</div>



## terraform-aws-data-storage


### [v0.2.6](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.2.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/3/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.2.6">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/module-data-storage/pull/21: The RDS module now exposes a `license_model` parameter that you can use to set the license model for your DB. This is required for some of the DBs supported by RDS, such as SQL Server and Oracle.

</div>



## terraform-aws-monitoring


### [v0.4.5](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.4.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/30/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.4.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/module-aws-monitoring/pull/30: Fix a bug in the `alb-target-group-alarms` where there was a typo in the `comparison_operator` of the `tg_low_healthy_host_count` alarm. 

</div>


### [v0.4.4](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.4.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/9/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.4.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/module-aws-monitoring/pull/28: The scripts in this repo should now work on CentOS / RHEL.

</div>



## terraform-aws-security


### [v0.5.0](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.5.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/24/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.5.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

</div>


### [v0.4.20](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.4.20)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/8/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.4.20">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/module-security/pull/25: We&apos;ve added a new module called [fail2ban](https://github.com/gruntwork-io/module-security/tree/master/modules/fail2ban) that you can use to install fail2ban on your servers and automatically have it ban malicious looking traffic (e.g. someone hammering SSH). The module includes integration with CloudWatch, so you can trigger CloudWatch alarms any time someone is banned.

</div>


### [v0.4.19](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.4.19)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/7/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.4.19">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/module-security/pull/34: The `cross-account-iam-roles` module can now create an auto deploy IAM role that allows a CI server (e.g. Jenkins) in another AWS account assume the role to do automated deployments in the current AWS account.

</div>


### [v0.4.18](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.4.18)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/6/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.4.18">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/module-security/pull/33: The `iam-groups` module now creates an IAM group that grants access to all external AWS accounts in `var.iam_groups_for_cross_account_access`. 

</div>


### [v0.4.17](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.4.17)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/3/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.4.17">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/module-security/pull/32: The `aws-cli-mfa` script can now also assume an IAM role for you. This is particularly useful if you have multiple AWS accounts and want to authenticate to account A with MFA and then assume a role in account B. Now you can do it all with a one-liner!

</div>



## terraform-aws-server


### [v0.1.8](https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.1.8)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/27/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.1.8">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - UPDATE: Updated `module-server` to use the non-deprecated property `role` instead of the deprecated `roles` as part of the `aws_iam_instance_profile` resource. (#11)

</div>

<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "releases",
  "hash": "2ad5b23ca84ab2d60b5418ec8500e30c"
}
##DOCS-SOURCER-END -->

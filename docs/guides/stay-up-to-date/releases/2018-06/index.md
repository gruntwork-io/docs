
# Gruntwork release 2018-06

<p style={{marginTop: "-25px"}}><small><a href="/guides">Guides</a> / <a href="/guides/stay-up-to-date">Update Guides</a> / <a href="/guides/stay-up-to-date/releases">Releases</a> / 2018-06</small></p>

This page is lists all the updates to the [Gruntwork Infrastructure as Code 
Library](https://gruntwork.io/infrastructure-as-code-library/) that were released in 2018-06. For instructions 
on how to use these updates in your code, check out the [updating 
documentation](/guides/working-with-code/using-modules#updating).

Here are the repos that were updated:

- [terraform-aws-asg](#terraform-aws-asg)
- [terraform-aws-ci](#terraform-aws-ci)
- [terraform-aws-ecs](#terraform-aws-ecs)
- [terraform-aws-elk](#terraform-aws-elk)
- [terraform-aws-openvpn](#terraform-aws-openvpn)
- [terraform-aws-security](#terraform-aws-security)
- [terraform-aws-server](#terraform-aws-server)
- [terraform-aws-vpc](#terraform-aws-vpc)


## terraform-aws-asg


### [v0.6.13](https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.6.13)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/16/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.6.13">Release notes</a></small>
</p>

https://github.com/gruntwork-io/module-asg/pull/38: Fix a bug where the `server-group` module would hit an error trying to create an IAM Policy for EBS volumes when the `size` param was set to 0.


### [v0.6.12](https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.6.12)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/5/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.6.12">Release notes</a></small>
</p>

https://github.com/gruntwork-io/module-asg/pull/33: You can now specify a `kms_key_id` parameter for the `server-group` module to enable EBS Volume encryption with your own Customer Master Key (CMK). This will also automatically create an IAM Policy that gives the server access to that CMK.



## terraform-aws-ci


### [v0.12.0](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.12.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/20/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.12.0">Release notes</a></small>
</p>

https://github.com/gruntwork-io/module-ci/pull/66: The `terraform-update-variable` script used to require setting `--skip-git "true"`, which is a non-idiomatic way to do flags in bash, and the parsing for it could fail silently. The script has now been updated so you just specify `--skip-git` to disable Git, without any need to say "true". Note that if you were using the `--skip-git` param before, this is a backwards incompatible change!


### [v0.11.0](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.11.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/19/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.11.0">Release notes</a></small>
</p>

https://github.com/gruntwork-io/module-ci/pull/62: The `git-add-commit-push` script will now detect "Updates were rejected because the remote contains work that you do not have locally" errors and automatically `git pull --rebase` and `git push` in a retry loop (up to a max number of retries). This allows the script to work properly even if someone else happened to push some code to the same branch at the exact same time.



## terraform-aws-ecs


### [v0.6.7](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.6.7)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/6/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.6.7">Release notes</a></small>
</p>

https://github.com/gruntwork-io/module-ecs/pull/70: You can now optionally customize the ALB Target Group name in `ecs-service-with-alb` using the `alb_target_group_name` parameter.



## terraform-aws-elk


### [v0.0.3](https://github.com/gruntwork-io/terraform-aws-elk/releases/tag/v0.0.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/10/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-elk/releases/tag/v0.0.3">Release notes</a></small>
</p>

This pre-release introduces both Logstash as well as Kibana modules along with rudimentary examples of how they can be deployed in an Auto Scaling Group in AWS.

PRs: #14 and #15 

This is another pre-release as these modules are still very green and require additional features, such as SSL, to be implemented.



## terraform-aws-openvpn


### [v0.7.0](https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.7.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/28/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.7.0">Release notes</a></small>
</p>

https://github.com/gruntwork-io/package-openvpn/pull/47, https://github.com/gruntwork-io/package-openvpn/commit/4a5d1447880e0d8a67f1be1d929c24db7953ee0a:

1. Fix a bug with how the `init-openvpn` script configures the PKI backup cron job. This is an important fix, so we recommend upgrading.

1. Default `iops` to 0 in the `openvpn-server` module. This is to work around a [Terraform bug](https://github.com/terraform-providers/terraform-provider-aws/issues/4002).


### [v0.6.1](https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.6.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/21/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.6.1">Release notes</a></small>
</p>




### [v0.6.0](https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.6.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/19/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.6.0">Release notes</a></small>
</p>

https://github.com/gruntwork-io/package-openvpn/pull/45: The `supervisor` install has been moved from the `run-process-requests` and `run-process-revokes` scripts to the `install-openvpn` script where it belongs. You'll need to build a new OpenVPN AMI to take advantage of this change.



## terraform-aws-security


### [v0.13.1](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.13.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/29/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.13.1">Release notes</a></small>
</p>

https://github.com/gruntwork-io/module-security/pull/101: Update `ssh-grunt` to use the same data structures as Houston.


### [v0.13.0](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.13.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/26/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.13.0">Release notes</a></small>
</p>

https://github.com/gruntwork-io/module-security/pull/99


This release includes MAJOR changes to `ssh-iam` that are backwards incompatible. These changes make it possible to add powerful new features to `ssh-iam` (more on that soon!), but if you're an existing user of `ssh-iam`, you will need to read these instructions carefully and do some work to upgrade without losing SSH access!


1. `ssh-iam` has been renamed to `ssh-grunt`. This is because we are updating it to support Identity Providers (IdPs) other than just IAM!

1. The `ssh-iam-selinux-policy` module has been renamed to `ssh-grunt-selinux-policy`.



### [v0.12.0](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.12.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/26/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.12.0">Release notes</a></small>
</p>

https://github.com/gruntwork-io/module-security/pull/97:

BACKWARDS INCOMPATIBLE CHANGE

The `saml-iam-roles` module now sets a default max expiration of 12 hours for IAM Roles intended for human users (e.g., `allow-read-only-access-from-saml`) and a default max expiration of 1 hour for IAM Roles intended for machine users (e.g., `allow-auto-deploy-access-from-saml`). Both of these expiration values are configurable via the new input variables `max_session_duration_human_users` and `max_session_duration_machine_users`.


### [v0.11.0](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.11.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/21/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.11.0">Release notes</a></small>
</p>

https://github.com/gruntwork-io/module-security/pull/96: Setting `should_require_mfa` to `false` in the `iam-policies` module should now work correctly, allowing you to disable the MFA requirement. This module is used under the hood in the `iam-groups`, `cross-account-iam-roles`, and `saml-iam-roles` modules, so upgrade those modules if you need this fix.



## terraform-aws-server


### [v0.5.0](https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.5.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/18/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.5.0">Release notes</a></small>
</p>

https://github.com/gruntwork-io/module-server/pull/30: The `mount-ebs-volume` script now supports `NVMe` block devices used by the new C5, C5d, M5, and i3.metal instances.



## terraform-aws-vpc


### [v0.5.1](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.5.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/14/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.5.1">Release notes</a></small>
</p>






<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "releases",
  "hash": "2c2ced85fa595e1696e7bf5482237e8f"
}
##DOCS-SOURCER-END -->

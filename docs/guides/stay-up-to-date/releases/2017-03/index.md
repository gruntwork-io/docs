
# Gruntwork release 2017-03

<p style={{marginTop: "-25px"}}><small><a href="/guides">Guides</a> / <a href="/guides/stay-up-to-date">Update Guides</a> / <a href="/guides/stay-up-to-date/releases">Releases</a> / 2017-03</small></p>

This page is lists all the updates to the [Gruntwork Infrastructure as Code
Library](https://gruntwork.io/infrastructure-as-code-library/) that were released in 2017-03. For instructions
on how to use these updates in your code, check out the [updating
documentation](/library/stay-up-to-date/updating).

Here are the repos that were updated:

- [boilerplate](#boilerplate)
- [terraform-aws-ci](#terraform-aws-ci)
- [terraform-aws-data-storage](#terraform-aws-data-storage)
- [terraform-aws-ecs](#terraform-aws-ecs)
- [terraform-aws-load-balancer](#terraform-aws-load-balancer)
- [terraform-aws-monitoring](#terraform-aws-monitoring)
- [terraform-aws-security](#terraform-aws-security)
- [terraform-aws-server](#terraform-aws-server)
- [terraform-aws-utilities](#terraform-aws-utilities)
- [terraform-aws-vpc](#terraform-aws-vpc)


## boilerplate


### [v0.2.9](https://github.com/gruntwork-io/boilerplate/releases/tag/v0.2.9)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/9/2017 | <a href="https://github.com/gruntwork-io/boilerplate/releases/tag/v0.2.9">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/boilerplate/pull/32: Add support for an `env` helper that allows you to look up environment variables in your boilerplate templates.

</div>


### [v0.2.8](https://github.com/gruntwork-io/boilerplate/releases/tag/v0.2.8)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/8/2017 | <a href="https://github.com/gruntwork-io/boilerplate/releases/tag/v0.2.8">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/boilerplate/pull/31: The `shell` helper and `hooks` now allow you to specify environment variables to pass to your scripts.

</div>



## terraform-aws-ci


### [v0.3.8](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.3.8)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/17/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.3.8">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/module-ci/pull/23: Fix a bug with the `terraform-update-variable` script where it would exit with a confusing error message if no `--git-url` parameter was included.

</div>


### [v0.3.7](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.3.7)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/3/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.3.7">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/module-ci/pull/22: The `scheduled-lambda-job` module now makes running in a VPC optional. It exposes a new input variable called `run_in_vpc` which, if set to true, will give the lambda function access to a VPC you specify via the `vpc_id` and `subnet_ids` input variables. However, by default, it&apos;s set to false, and you can omit `vpc_id` and `subnet_ids`. 

This is useful for lambda functions that use the AWS APIs and don&apos;t need direct access to a VPC anyway. Moreover, a recent [bug in Terraform](https://github.com/hashicorp/terraform/issues/10272) causes issues when you try to delete a lambda function that was deployed into a VPC.

</div>



## terraform-aws-data-storage


### [v0.2.1](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.2.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/31/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.2.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/module-data-storage/pull/15: You can now specify a custom KMS key to use to encrypt RDS or Aurora instances.

</div>


### [v0.2.0](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.2.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/8/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.2.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/module-data-storage/pull/14: To allow the bastion host to talk to RDS or Aurora, you now have to explicitly set the `allow_connections_from_bastion_host` input variable to true. Before, we only exposed the `bastion_host_security_group_id` input variable, but if you fed dynamic data into that variable (e.g. from a `terraform_remote_state` data source), you&apos;d get an error. This is now fixed.

</div>


### [v0.1.5](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.1.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/6/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.1.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/module-data-storage/pull/13: The aurora module no longer specifies availability zones when creating an Aurora cluster. This is a workaround for a [strange issue](https://forums.aws.amazon.com/thread.jspa?messageID=771183&amp;#771183) where you get the error along the lines of &quot;Availability zone ‘us-east-1c’ is unavailable in this region, please choose another zone set.&quot;

</div>


### [v0.1.4](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.1.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/3/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.1.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/module-data-storage/pull/12: We&apos;ve added four new modules:

1. [lambda-create-snapshot](https://github.com/gruntwork-io/module-data-storage/tree/master/modules/lambda-create-snapshot): A lambda function that runs on a scheduled basis to take snapshots of an RDS DB. Useful if the once-nightly snapshots aren&apos;t enough and, even more importantly, this is the first step if you want to backup your snapshots to another AWS account.

1. [lambda-share-snapshot](https://github.com/gruntwork-io/module-data-storage/tree/master/modules/lambda-share-snapshot): A lambda function that can share an RDS snapshot with another AWS account. This is the second step in backing up your snapshots to another AWS account.

1. [lambda-copy-snapshot](https://github.com/gruntwork-io/module-data-storage/tree/master/modules/lambda-copy-shared-snapshot): A lambda function that runs on a scheduled basis to make a local copies of RDS snapshots shared from an external AWS account. This is the third step and it needs to run in the AWS account you&apos;re using to backup your snapshots.

1. [lambda-cleanup-snapshots](https://github.com/gruntwork-io/module-data-storage/tree/master/modules/lambda-cleanup-snapshots): A lambda function that runs on a scheduled basis to delete old RDS snapshots. You configure it with a maximum number of snapshots to keep, and once that number is exceeded, it deletes the oldest snapshots. This is useful to keep the number of snapshots from step 1 and 3 above from getting out of hand.

</div>



## terraform-aws-ecs


### [v0.4.4](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.4.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/9/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.4.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/module-ecs/pull/30: You can now set the `tenancy` parameter on the ecs-cluster module if you need to use dedicated instances.

</div>


### [v0.4.3](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.4.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/1/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.4.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/module-ecs/pull/29: Added a new script called `roll-out-ecs-cluster-update.py` that you can use to automatically roll out new versions of your ECS cluster AMI with zero-downtime. Check out [How do you make changes to the EC2 Instances in the cluster?](https://github.com/gruntwork-io/module-ecs/tree/master/modules/ecs-cluster#how-do-you-make-changes-to-the-ec2-instances-in-the-cluster) for instructions.


</div>



## terraform-aws-load-balancer


### [v0.4.0](https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.4.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/29/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.4.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/module-load-balancer/pull/12: The `allow_inbound_from_cidr_blocks` input variable in `module-alb` is now a list so you can specify multiple CIDR blocks.

</div>


### [v0.3.0](https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.3.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/9/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.3.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/module-load-balancer/pull/9

BREAKING CHANGE

Two bug fixes:

1. Due to a [Terraform bug](https://github.com/hashicorp/terraform/issues/12549) with `merge` and `zipmap`, some of the listener outputs were simply disappearing. For example, if your ALB had only HTTP listeners, the outputs for the HTTPS listeners would disappear, as would the aggregate listener that contained both HTTP and HTTPS listeners. Since we have other modules that depend on these outputs, this made the ALB unusable.

    As a result, the `listener_arns` and `https_listener_arns` outputs have been removed. The available outputs are now `http_listener_arns`, `https_listener_non_acm_cert_arns`, `https_listener_acm_cert_arns`.

1. There was a bug in the previous release that caused an error to show up any time you tried to use an ACM cert. This has now been fixed.

</div>


### [v0.2.1](https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.2.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/8/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.2.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/module-load-balancer/pull/8: To add an HTTPS listener, the ALB module originally had you pass in the `https_listener_ports_and_ssl_certs` input variable, which was a map of HTTPS ports to the ARNs of TLS certs (e.g. `443 = &quot;arn:aws:acm:us-east-1:123456789012:certificate/12345678&quot;`. The module now exposes a new input variable called `https_listener_ports_and_acm_ssl_certs` which is a more user-friendly map of HTTPS ports to the domain name of a TLS cert issues by the [AWS Certificate Manager](https://aws.amazon.com/certificate-manager/) (e.g. `443 = *.foo.com`). 

</div>



## terraform-aws-monitoring


### [v0.4.2](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.4.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/5/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.4.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/module-aws-monitoring/pull/24: The route 53 health checks module now supports an `enabled` parameter that you can use to disable or enable it. This is useful if you want to use the module inside another module and enable or disable it conditionally.

</div>



## terraform-aws-security


### [v0.4.8](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.4.8)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/28/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.4.8">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/module-security/pull/21: Fix a copy/paste bug in the `iam-groups` module where disabling the billing group would also disable the full-access group.

</div>


### [v0.4.7](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.4.7)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/24/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.4.7">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/module-security/pull/20: Fix a bug in the `aws-cli-mfa` script where it didn&apos;t properly clear the previous session token before fetching a new one.

</div>


### [v0.4.6](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.4.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/23/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.4.6">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/module-security/pull/19: We&apos;ve added a new script called `aws-cli-mfa` that makes it much easier to use the AWS CLI with MFA enabled. The script can fetch temporary STS credentials and set them as environment variables in a single command. Check out [the docs](https://github.com/gruntwork-io/module-security/tree/master/modules/aws-cli-mfa) for usage instructions.

</div>


### [v0.4.5](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.4.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/19/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.4.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - ENHANCEMENT: The [tls-cert-private](https://github.com/gruntwork-io/module-security/tree/master/modules/tls-cert-private) module can now generate a TLS certificate that is valid for multiple domain names.

</div>


### [v0.4.4](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.4.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/2/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.4.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/module-security/pull/16: `ssh-iam` now supports cross-account access. This allows you to SSH to servers running in one AWS account (e.g. `stage` or `prod`) using your IAM credentials from a different AWS account (e.g. `users`). Check out the [multiple AWS accounts docs](https://github.com/gruntwork-io/module-security/tree/master/modules/ssh-iam#multiple-aws-accounts) for more info.


</div>


### [v0.4.3](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.4.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/1/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.4.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - NEW MODULE: We are pleased to introduce the [os-hardening](https://github.com/gruntwork-io/module-security/tree/master/modules/os-hardening) module! 
  
  This module is our first step in providing a path to using a hardened OS Image based on the [Center for Internet Security Benchmarks](https://benchmarks.cisecurity.org/). These Benchmarks are freely downloadable and specific to a technology, which makes them straightforward to reference.
  
  At present, we support only a hardened OS for Amazon Linux, though we are open to adding support for additional OS&apos;s if customers request it. The primary OS hardening implemented in this release is the ability to create multiple disk partitions on the root volume in a Packer build, and mount each disk partition to a file system path with unique mount options. 
  
  For example, we can now mount `/tmp` to its own disk partition so that a runaway program that fills up all of `/tmp` will not affect disk space available on other paths like `/var/log` where logs are stored. In addition, we can mount `/tmp` with the `nosuid`, `nodev`, and `noexec` options, which say that no file in `/tmp` should be allowed to assume the permissions of its file owner (a security risk), no external devices (like a block device) can be attached to `/tmp` and no files in `/tmp` can be executed, respectively.


</div>


### [v0.4.2](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.4.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/1/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.4.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/module-security/pull/15: Added support for easy cross-account access. You can now define all your IAM users in one AWS account (e.g. a `users` account), give those IAM users access to specific IAM roles in your other AWS accounts (e.g. a `stage` or `prod` account), and they will be able to switch accounts in the AWS console with just a few clicks. 

To use this, you need to configure the new `iam_groups_for_cross_account_access` input variable in the [iam-groups module](https://github.com/gruntwork-io/module-security/tree/master/modules/iam-groups) in your `users` account and deploy the new [cross-account-iam-roles module](https://github.com/gruntwork-io/module-security/tree/master/modules/cross-account-iam-roles) in the `stage` and `prod` accounts.


</div>



## terraform-aws-server


### [v0.1.7](https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.1.7)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/17/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.1.7">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - BUG FIX: The `mount-ebs-volume` script in the `persistent-ebs-volume` module now correctly formats a volume with xfs. Previously, it worked only for ext4.

</div>


### [v0.1.6](https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.1.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/9/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.1.6">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - ENHANCEMENT: The [persistent-ebs-module](https://github.com/gruntwork-io/module-server/tree/master/modules/persistent-ebs-volume) script now supports a parameter that specifies file system mounting options, and explicitly supports creating file systems of type XFS.
   
   Previously, you could pass in alternative file systems to this script, but since even blank EBS Volume are formatted as `ext4` by default, the script would not attempt to format the EBS Volume with the new file system type. That is now fixed.

</div>


### [v0.1.5](https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.1.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/7/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.1.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/module-server/pull/7: `module-server` now allows you to control its tenancy settings via the `tenancy` parameter. This is useful if you need to be HIPAA compliant and must use dedicated tenancy for your servers.

</div>



## terraform-aws-utilities


### [v0.0.1](https://github.com/gruntwork-io/terraform-aws-utilities/releases/tag/v0.0.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/7/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-utilities/releases/tag/v0.0.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/package-terraform-utilities/pull/1: First release! We&apos;ve created an intermediate-variable module.

</div>



## terraform-aws-vpc


### [v0.1.4](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.1.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/7/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.1.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/module-vpc/pull/18: You can now use the `tenancy` parameter to control the [tenancy](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/dedicated-instance.html) of the VPCs created by the `vpc-app` and `vpc-mgmt` modules.

</div>

<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "releases",
  "hash": "215f988d6eb9b603cede19f0d3234d74"
}
##DOCS-SOURCER-END -->

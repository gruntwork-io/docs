
# Gruntwork release 2017-08

<p style={{marginTop: "-25px"}}><small><a href="/guides">Guides</a> / <a href="/guides/stay-up-to-date">Update Guides</a> / <a href="/guides/stay-up-to-date/releases">Releases</a> / 2017-08</small></p>

This page is lists all the updates to the [Gruntwork Infrastructure as Code
Library](https://gruntwork.io/infrastructure-as-code-library/) that were released in 2017-08. For instructions
on how to use these updates in your code, check out the [updating
documentation](/library/stay-up-to-date/updating).

Here are the repos that were updated:

- [boilerplate](#boilerplate)
- [terraform-aws-asg](#terraform-aws-asg)
- [terraform-aws-data-storage](#terraform-aws-data-storage)
- [terraform-aws-ecs](#terraform-aws-ecs)
- [terraform-aws-load-balancer](#terraform-aws-load-balancer)
- [terraform-aws-mongodb](#terraform-aws-mongodb)
- [terraform-aws-monitoring](#terraform-aws-monitoring)
- [terraform-aws-openvpn](#terraform-aws-openvpn)
- [terraform-aws-security](#terraform-aws-security)
- [terraform-aws-server](#terraform-aws-server)
- [terraform-aws-vpc](#terraform-aws-vpc)


## boilerplate


### [v0.2.17](https://github.com/gruntwork-io/boilerplate/releases/tag/v0.2.17)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/20/2017 | <a href="https://github.com/gruntwork-io/boilerplate/releases/tag/v0.2.17">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/boilerplate/pull/40: boilerplate should now check types *after* rendering variables, which allows you to use interpolations in non-string variables without getting a type error.

</div>


### [v0.2.16](https://github.com/gruntwork-io/boilerplate/releases/tag/v0.2.16)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/13/2017 | <a href="https://github.com/gruntwork-io/boilerplate/releases/tag/v0.2.16">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/boilerplate/pull/39: You can now use nested maps and nested lists in boilerplate variables.

</div>



## terraform-aws-asg


### [v0.5.0](https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.5.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/15/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.5.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/module-asg/pull/9: The `server-group` module now applies the tags you pass in via `custom_tags` to all resources that support tags: the security group, the ENIs, and the EBS volumes. Note that this is a backwards incompatible change, as the `custom_tags` parameter is now a plain map rather than a list of maps. 

</div>


### [v0.4.0](https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.4.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/15/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.4.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/module-asg/pull/8: Added a new `server-group` module that you can use to run a fixed-size cluster of servers that can automatically attach EBS Volumes and ENIs, do zero-downtime rolling deployment, and automatically replace failed servers. Check out the [server-group module docs](https://github.com/gruntwork-io/module-asg/tree/master/modules/server-group) for more details.

</div>



## terraform-aws-data-storage


### [v0.2.10](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.2.10)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/28/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.2.10">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - BUG FIX: Release v0.2.9 had a bug where `var.snapshot_identifier` did not work for Aurora instances that used encryption. That is now fixed.

</div>


### [v0.2.9](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.2.9)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/26/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.2.9">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - UPDATE/#24: Previously, it was not possible to launch an Aurora cluster from a snapshot. The `aurora` module now accepts a new var, `snapshot_identifier`, which is the Snapshot ID from which you&apos;d like to launch a new Aurora cluster. 

NOTE: This release a has a bug! Please use [v0.2.10](https://github.com/gruntwork-io/module-data-storage/releases/tag/v0.2.10) instead.

</div>



## terraform-aws-ecs


### [v0.6.0](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.6.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/10/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.6.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - NEW FEATURE/BREAKING CHANGE: The `ecs-service-with-alb` module now supports host-based routing! In addition, we used this opportunity to simplify the interface to the module. The major change is that you now specify ALB Listener Rules using Terraform code in the same Terraform file that calls the `ecs-service-with-alb` module, giving users total flexibility on routing rules. (#37)

NOTE: This release also updates the ECS Cluster module so that it [no longer adds a rule to the ALB Security Group](https://github.com/gruntwork-io/module-ecs/pull/37/files#diff-d72db0b293516646f6d2af03f815cde2L149) to allow outbound traffic from the ALB to the ECS Cluster. That&apos;s because, as of [v0.6.0 of the ALB Module](https://github.com/gruntwork-io/module-load-balancer/releases/tag/v0.6.0), the ALB now enables all outbound traffic by default. 

Therefore, be sure to also upgrade to [v0.6.0 or higher of module alb](https://github.com/gruntwork-io/module-load-balancer/releases) when using this release!

</div>



## terraform-aws-load-balancer


### [v0.6.1](https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.6.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/9/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.6.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - UPDATE: The `alb` module adds a new output value, `listener_arns`, that merges the maps in the output values `http_listener_arns`, `https_listener_non_acm_cert_arns `, and `https_listener_acm_cert_arns ` (#17).

</div>


### [v0.6.0](https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.6.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/8/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.6.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - BREAKING CHANGE: The module `alb` now opens all outbound ports by default. You can preserve the previous default behavior of opening no outbound ports by default by explicitly setting `var.allow_all_outbound = false` when calling this module. Although the previous default was slightly more secure, several users didn&apos;t realize the additional steps they needed to take to correctly use the ALB, so we feel this new default behavior is a better balance between security and convenience. (#16)

_**Additional Background**_

_Previously, when you created an ALB, by default, its Security Group blocked all outbound traffic. When you added an ALB to an ECS Cluster, the ECS Cluster module updated the ALB&apos;s Security Group to allow outbound traffic only to the specific ECS Cluster being created._

_But this proved to be confusing to people and didn&apos;t give us much security benefit anyway, so with this release, we change the default behavior of the ALB module to allow all outbound connections by default. At the same time, we [updated the ECS Cluster module](https://github.com/gruntwork-io/module-ecs/releases/tag/v0.6.0) to no longer modify the ALB&apos;s Security Group to allow outbound connections from the ALB to the ECS Cluster since the ALB now allows all outbound traffic by default._

_Therefore, if you use this release or higher with an ECS Cluster, be sure to use [v0.6.0](https://github.com/gruntwork-io/module-ecs/releases/tag/v0.6.0) or higher of that module as well!_

</div>



## terraform-aws-mongodb


### [v0.2.3](https://github.com/gruntwork-io/terraform-aws-mongodb/releases/tag/v0.2.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/10/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-mongodb/releases/tag/v0.2.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

</div>



## terraform-aws-monitoring


### [v0.5.0](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.5.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/8/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.5.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - BREAKING CHANGE: Due to a recent Amazon API change, the `load-balancer-logs` module no longer worked correctly. This release fixes that, however if you upgrade simply by bumping the version, Terraform will prompt you to destroy and re-create your existing S3 Bucket, which will destroy all existing logs! To avoid this, use `terraform state mv &lt;SOURCE&gt; &lt;DESTINATION&gt;` *before* running `terraform apply` with this module version.

For example:

```bash
terraform state mv module.alb_access_logs_bucket.aws_s3_bucket.access_logs_with_logs_archived module.alb_access_logs_bucket.aws_s3_bucket.access_logs_with_logs_archived_and_deleted
```

You can run `terraform plan` before the above to know the new destination to move the source to. Also, ensure that you don&apos;t change any variables that&apos;ll force a new ALB creation.

For assistance, please contact Gruntwork support. (#33)

</div>



## terraform-aws-openvpn


### [v0.3.0](https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.3.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/31/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.3.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  This release fixes an issue where previous versions of OpenVPN did not setup permissions correctly for the `openvpn-server-Users` IAM Group. Now, a user with zero privileges in an AWS account can get all the permissions they need to create an OpenVPN user profile solely by their IAM User account being a member of the `openvpn-server-Users` IAM Group. (#18)

**Upgrade Instructions:**
- Add the variables `aws_region` and `aws_account_id` when calling the openvpn-server module in your Terraform code.
- Run `terragrunt apply` to upgrade.

</div>


### [v0.2.3](https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.2.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/20/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.2.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/package-openvpn/pull/17

Fix several issues:

1. Fix the apt repo URL for installing OpenVPN. It&apos;s not clear what happened to the old URL, but when you ran `install-openvpn`, you would get the error `404  Not Found [IP: 104.20.194.50 80]`.
1. The `push route` configuration in `server.conf` had a syntactic issue where the word `route` was outside of double quotes.
1. Reduce logging verbosity for OpenVPN to production levels.

</div>



## terraform-aws-security


### [v0.5.4](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.5.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/28/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.5.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - UPDATE: The `os-hardening` module is now updated to support Terraform 0.10.x.

</div>



## terraform-aws-server


### [v0.1.12](https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.1.12)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/14/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.1.12">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/module-server/pull/16: Remove unnecessary `depends_on` clause from the single-server module. This clause caused a `reference: aws_instance.instance` error for some users.

</div>


### [v0.1.11](https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.1.11)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/13/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.1.11">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/module-server/pull/15: The single-server module now exposes parameters to configure the size and type of the root volume.

</div>


### [v0.1.10](https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.1.10)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/8/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.1.10">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/module-server/pull/14: 

* Added a new `attach-eni` script which can be used to attach an ENI to an EC2 Instance. 
* Updated the `mount-ebs-volume` script so it can automatically find an attach an EBS Volume that has the same tag as the EC2 Instance. This is handy when you create EBS Volumes and Instances in matching &quot;pairs.&quot;

</div>



## terraform-aws-vpc


### [v0.3.0](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.3.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/20/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.3.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/module-vpc/pull/27, https://github.com/gruntwork-io/module-vpc/pull/28. 

THIS IS A BACKWARDS INCOMPATIBLE RELEASE. READ ON FOR INSTRUCTIONS.

This release fixes two bugs:

1. AWS now has 6 or more Availability Zones (AZs) in some regions (e.g., us-east-1) and the spacing between CIDR blocks that `vpc-app` and `vpc-mgmt` were using is no longer sufficient. To avoid these CIDR blocks from overlapping, we have increased the spacing from 5 to 10. If you are already using `vpc-app` or `vpc-mgmt` and want to preserve the CIDR blocks you were using before (highly recommended!), you must set the new input variable `subnet_spacing` to `5`. Otherwise, Terraform will try to delete all your subnets and create new ones with the new CIDR blocks.

1. Release v0.2.1 of module-vpc made specifying the `num_availability_zones` parameter optional. Unfortunately, due to a bug, if you omitted this parameter, instead of creating subnets in every available AZ, the `vpc-app` and `vpc-mgmt` modules only created subnets in a single AZ. This has now been fixed.

</div>


### [v0.2.2](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.2.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/20/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.2.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  **UPDATE: DO NOT USE THIS RELEASE. IT CONTAINS A BAD BUG. SEE #27 FOR DETAILS.**

https://github.com/gruntwork-io/module-vpc/pull/26: Fix a bug where the `num_availability_zones` output variable would report the wrong value (-1) if you didn&apos;t set the optional `num_availability_zones` input variable.

</div>


### [v0.2.1](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.2.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/8/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.2.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  **UPDATE: DO NOT USE THIS RELEASE. IT CONTAINS A BAD BUG. SEE #27 FOR DETAILS.**

- UPDATE: The modules `vpc-app` and `vpc-mgmt` now make `var.num_availability_zones` optional. If it&apos;s non-empty, the created VPC will only use the specified number of Availability Zones, not *all* Availability Zones. Otherwise, the VPC will be created to use all Availability Zones. As an example, `us-east-1` now has 6 Availability Zones, but users may wish to utilize just 3 of them. This release if fully backwards-compatible. (#22)

</div>


### [v0.2.0](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.2.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/1/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.2.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

</div>


### [v0.1.9](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.1.9)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/1/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.1.9">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

</div>

<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "releases",
  "hash": "598bdd162188a79cc9417659ba968dbc"
}
##DOCS-SOURCER-END -->

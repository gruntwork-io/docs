
# Gruntwork release 2018-01

<p style={{marginTop: "-25px"}}><small><a href="/guides">Guides</a> / <a href="/guides/stay-up-to-date">Update Guides</a> / <a href="/guides/stay-up-to-date/releases">Releases</a> / 2018-01</small></p>

This page is lists all the updates to the [Gruntwork Infrastructure as Code
Library](https://gruntwork.io/infrastructure-as-code-library/) that were released in 2018-01. For instructions
on how to use these updates in your code, check out the [updating
documentation](/library/stay-up-to-date/updating).

Here are the repos that were updated:

- [gruntwork](#gruntwork)
- [terraform-aws-asg](#terraform-aws-asg)
- [terraform-aws-ci](#terraform-aws-ci)
- [terraform-aws-data-storage](#terraform-aws-data-storage)
- [terraform-aws-ecs](#terraform-aws-ecs)
- [terraform-aws-lambda](#terraform-aws-lambda)
- [terraform-aws-monitoring](#terraform-aws-monitoring)
- [terraform-aws-openvpn](#terraform-aws-openvpn)
- [terraform-aws-sam](#terraform-aws-sam)
- [terraform-aws-security](#terraform-aws-security)
- [terraform-aws-server](#terraform-aws-server)
- [terraform-aws-static-assets](#terraform-aws-static-assets)
- [terraform-aws-vpc](#terraform-aws-vpc)


## gruntwork


### [v0.0.16](https://github.com/gruntwork-io/gruntwork/releases/tag/v0.0.16)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/18/2018 | <a href="https://github.com/gruntwork-io/gruntwork/releases/tag/v0.0.16">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/gruntwork/pull/21: `gruntwork` now checks that you&apos;re logged in as an IAM user and not a root user.

</div>


### [v0.0.15](https://github.com/gruntwork-io/gruntwork/releases/tag/v0.0.15)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/17/2018 | <a href="https://github.com/gruntwork-io/gruntwork/releases/tag/v0.0.15">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/gruntwork/pull/19: Check that the account you&apos;re logged into is the root of your AWS Organization, as that&apos;s the only account that can create child accounts.

</div>



## terraform-aws-asg


### [v0.6.6](https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.6.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/8/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.6.6">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Support for Terraform 11

</div>


### [v0.6.5](https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.6.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/6/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.6.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - **ENHANCEMENT: module/server-group.** Optionally allow users to specify their own list of names to be used when creating DNS records. Optionally create an Elastic IP Address for each Elastic Network Interface so that servers in the Server Group are accessible via the public Internet. This is especially handy for automated tests, but most production deployments should reside within the private VPC only. (#18, #19, #20, #21)

</div>



## terraform-aws-ci


### [v0.6.0](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.6.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/8/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.6.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Support for Terraform 11

</div>



## terraform-aws-data-storage


### [v0.5.1](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.5.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/24/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.5.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/module-data-storage/pull/35: The `aurora` module now exposes a `db_cluster_parameter_group_name` parameter you can use to set a custom parameter group name.

</div>


### [v0.5.0](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.5.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/13/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.5.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

</div>



## terraform-aws-ecs


### [v0.6.1](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.6.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/24/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.6.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * #49: The `roll-out-ecs-cluster-update.py` script will now display better error messages if it can&apos;t find your ECS cluster for some reason (e.g., you specified the wrong region).

* #50: The package now supports [placement_strategy](https://www.terraform.io/docs/providers/aws/r/ecs_service.html#placement_strategy-1) and [placement_constraints](https://www.terraform.io/docs/providers/aws/r/ecs_service.html#placement_constraints-1)

* This package is now compatible with Terraform 11

</div>



## terraform-aws-lambda


### [v0.2.0](https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.2.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/13/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.2.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

</div>



## terraform-aws-monitoring


### [v0.9.0](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.9.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/25/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.9.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

</div>


### [v0.8.2](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.8.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/4/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.8.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/module-aws-monitoring/pull/41: The `ecs-service-alarms` module now exposes `ecs_service_high_memory_utilization_treat_missing_data` and `ecs_service_high_cpu_utilization_treat_missing_data` input variables that you can use to configure what the alarms should do if no data is being emitted (default is `missing`). 

</div>



## terraform-aws-openvpn


### [v0.5.2](https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.5.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/25/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.5.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/package-openvpn/pull/36: The root volume IOPS is now also configurable for `io1` volume types.

</div>


### [v0.5.1](https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.5.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/24/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.5.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/package-openvpn/pull/35: The root volume size and type of the `openvpn-server` module are now configurable.

</div>



## terraform-aws-sam


### [v0.0.2](https://github.com/gruntwork-io/terraform-aws-sam/releases/tag/v0.0.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/16/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-sam/releases/tag/v0.0.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

</div>



## terraform-aws-security


### [v0.7.0](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.7.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/12/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.7.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

</div>



## terraform-aws-server


### [v0.3.0](https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.3.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/12/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.3.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

</div>



## terraform-aws-static-assets


### [v0.2.0](https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.2.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/7/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.2.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/package-static-assets/pull/4: The `cloudfront` module now enables gzip compression by default. This is a backwards incompatible change, so if for some reason you don&apos;t want to enable gzip compression, you&apos;ll need to set `compress = false`. 

</div>



## terraform-aws-vpc


### [v0.4.1](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.4.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/25/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.4.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/module-vpc/pull/37: You can now set different tags for each of the different types of subnets (public subnets, private app subnets, etc).

</div>


### [v0.4.0](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.4.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/11/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.4.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  bump tests and circleci config for terraform 11 testing
add support for num_nat_gateways=0
add new tests for num_nat_gateways=0

</div>

<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "releases",
  "hash": "799b8117ca65eace0bddf8aee56e747f"
}
##DOCS-SOURCER-END -->

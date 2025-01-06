
# Gruntwork release 2017-07

<p style={{marginTop: "-25px"}}><small><a href="/guides">Guides</a> / <a href="/guides/stay-up-to-date">Update Guides</a> / <a href="/guides/stay-up-to-date/releases">Releases</a> / 2017-07</small></p>

This page is lists all the updates to the [Gruntwork Infrastructure as Code
Library](https://gruntwork.io/infrastructure-as-code-library/) that were released in 2017-07. For instructions
on how to use these updates in your code, check out the [updating
documentation](/library/stay-up-to-date/updating).

Here are the repos that were updated:

- [boilerplate](#boilerplate)
- [terraform-aws-asg](#terraform-aws-asg)
- [terraform-aws-ci](#terraform-aws-ci)
- [terraform-aws-data-storage](#terraform-aws-data-storage)
- [terraform-aws-ecs](#terraform-aws-ecs)
- [terraform-aws-lambda](#terraform-aws-lambda)
- [terraform-aws-load-balancer](#terraform-aws-load-balancer)
- [terraform-aws-messaging](#terraform-aws-messaging)
- [terraform-aws-mongodb](#terraform-aws-mongodb)
- [terraform-aws-monitoring](#terraform-aws-monitoring)
- [terraform-aws-security](#terraform-aws-security)
- [terraform-aws-server](#terraform-aws-server)
- [terraform-aws-vpc](#terraform-aws-vpc)


## boilerplate


### [v0.2.15](https://github.com/gruntwork-io/boilerplate/releases/tag/v0.2.15)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/17/2017 | <a href="https://github.com/gruntwork-io/boilerplate/releases/tag/v0.2.15">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/boilerplate/pull/38: You can now conditionally enable or disable dependencies using the `skip` attribute.

</div>


### [v0.2.14](https://github.com/gruntwork-io/boilerplate/releases/tag/v0.2.14)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/14/2017 | <a href="https://github.com/gruntwork-io/boilerplate/releases/tag/v0.2.14">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/boilerplate/pull/37: For map variables, render the key in addition to the value.

</div>


### [v0.2.13](https://github.com/gruntwork-io/boilerplate/releases/tag/v0.2.13)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/14/2017 | <a href="https://github.com/gruntwork-io/boilerplate/releases/tag/v0.2.13">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/boilerplate/pull/36: Fix reference lookup so it works with dependencies.

</div>


### [v0.2.12](https://github.com/gruntwork-io/boilerplate/releases/tag/v0.2.12)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/13/2017 | <a href="https://github.com/gruntwork-io/boilerplate/releases/tag/v0.2.12">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/boilerplate/pull/35: Add support for variable references

</div>


### [v0.2.11](https://github.com/gruntwork-io/boilerplate/releases/tag/v0.2.11)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/13/2017 | <a href="https://github.com/gruntwork-io/boilerplate/releases/tag/v0.2.11">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/boilerplate/pull/34: You can now use Go templating syntax in variable values.

</div>


### [v0.2.10](https://github.com/gruntwork-io/boilerplate/releases/tag/v0.2.10)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/13/2017 | <a href="https://github.com/gruntwork-io/boilerplate/releases/tag/v0.2.10">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/boilerplate/pull/33: You can now use interpolations in the `template-folder` and `output-folder` params of dependencies.

</div>



## terraform-aws-asg


### [v0.3.0](https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.3.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/14/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.3.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/module-asg/pull/7: You can now set custom tags on your EC2 Instances using the new `custom_tags` parameter in the `asg-rolling-deploy` module. Please note that this release will only work with Terraform 0.9.6 and above!

</div>



## terraform-aws-ci


### [v0.3.21](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.3.21)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/26/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.3.21">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

</div>


### [v0.3.20](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.3.20)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/13/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.3.20">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/module-ci/pull/41: Fix log message in `git-add-commit-push`.

</div>



## terraform-aws-data-storage


### [v0.2.8](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.2.8)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/25/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.2.8">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - ENHANCEMENT/#23: The `aurora` and `rds` modules now support a new var, `var.custom_tags`, that allows the user to add arbitrary AWS tags to the RDS Instance and its Security Group.

</div>


### [v0.2.7](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.2.7)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/3/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.2.7">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/module-data-storage/pull/22: You can now enable IAM authentication for Aurora by using the `iam_database_authentication_enabled` parameter.

</div>



## terraform-aws-ecs


### [v0.5.4](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.5.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/23/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.5.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - ENHANCEMENT/#36: On module `ecs-cluster`, users can now optionally specify `var.custom_tags_security_group` and `var. custom_tags_ec2_instances ` to assign a set of custom tags to the Security Group and EC2 Instances, respectively, created as part of an ECS Cluster.

</div>


### [v0.5.3](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.5.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/19/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.5.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/module-ecs/pull/33: Added a new script called `run-ecs-task` that will run a Task in ECS, wait for the Task to exit, and exit with the same exit code as the Task. This is a handy way to run one-off Tasks (e.g., apply a schema migration) in an ECS cluster as part of an automated process (e.g., automated deployment).

</div>


### [v0.5.2](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.5.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/15/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.5.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Expose the `volume_size` and `volume_type` properties for the ECS Instance

</div>


### [v0.5.1](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.5.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/14/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.5.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/module-ecs/pull/34: 

* Fix the AWS `get-login` command we use in the `ecs-scripts` module so it works with the latest versions of Docker.
* Add support for using the GitLab Docker registry.

</div>



## terraform-aws-lambda


### [v0.1.0](https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.1.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/20/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.1.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/package-lambda/pull/6: BACKWARDS INCOMPATIBLE CHANGE. We&apos;ve renamed the `source_dir` parameter to `source_path` to better reflect that the variable may point to a directory *or* a single zip file.

</div>


### [v0.0.4](https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.0.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/19/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.0.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/package-lambda/pull/4, https://github.com/gruntwork-io/package-lambda/pull/5: You can now pass your own zip file directly to the lambda module rather than having it create the zip file for you by setting the `skip_zip` param to `true`.

</div>



## terraform-aws-load-balancer


### [v0.5.1](https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.5.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/25/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.5.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - ENHANCEMENT/#15: Users can now specify a custom set of tags that will be applied to the AWS Security Group and the ALB via `var.custom_tags`.

</div>



## terraform-aws-messaging


### [v0.0.2](https://github.com/gruntwork-io/terraform-aws-messaging/releases/tag/v0.0.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/12/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-messaging/releases/tag/v0.0.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/package-messaging/pull/5: fix a bug when no publishers or subscribers are provided for the policy

</div>


### [v0.0.1](https://github.com/gruntwork-io/terraform-aws-messaging/releases/tag/v0.0.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/2/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-messaging/releases/tag/v0.0.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Initial release of package-messaging

</div>



## terraform-aws-mongodb


### [v0.2.2](https://github.com/gruntwork-io/terraform-aws-mongodb/releases/tag/v0.2.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/31/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-mongodb/releases/tag/v0.2.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

</div>



## terraform-aws-monitoring


### [v0.4.7](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.4.7)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/25/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.4.7">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - ENHANCEMENT: The [load-balancer-access-logs module](https://github.com/gruntwork-io/module-aws-monitoring/tree/master/modules/logs/load-balancer-access-logs) now supports adding custom tags to the S3 Bucket it creates via `var.tags`.

</div>



## terraform-aws-security


### [v0.5.3](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.5.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/26/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.5.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - ENHANCEMENT/#42: The `cloudtrail` and `kms-master-key` modules now have a `var.tags` that allows you to assign custom AWS tags to the resources created by these modules that support tagging in AWS.

</div>


### [v0.5.2](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.5.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/14/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.5.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - ENHANCEMENT/#41: The `iam-groups` modules now lets you optionally add an IAM Group specially for granting the permissions necessary for automated deployment.
- BUG FIX/#40: IAM Users with the &quot;self-management&quot; IAM Policy can now delete an SSH Key they&apos;ve uploaded.

</div>



## terraform-aws-server


### [v0.1.9](https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.1.9)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/21/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.1.9">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - ENHANCEMENT/#12: The `single-server` module now accepts an optional `tags` parameter that will add the given tags to the EC2 Instance and Security Group created by that module.

</div>



## terraform-aws-vpc


### [v0.1.8](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.1.8)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/26/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.1.8">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  fix an issue with duplicate rule numbers in the nacls

</div>


### [v0.1.7](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.1.7)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/26/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.1.7">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - ENHANCEMENT/#19: Many of the VPC modules now accept a `var.tags` that will set a custom set of AWS tags on the AWS resources that support tagging.

</div>


### [v0.1.6](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.1.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/25/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.1.6">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  add additional rules necessary to make ntp work in the private subnets

</div>


### [v0.1.5](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.1.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/25/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.1.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  add outbound ntp support on the network acls for the private subnets

</div>

<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "releases",
  "hash": "5e4091a05621f0dede762db7212f68b2"
}
##DOCS-SOURCER-END -->

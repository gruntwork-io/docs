
# Gruntwork release 2017-01

<p style={{marginTop: "-25px"}}><small><a href="/guides">Guides</a> / <a href="/guides/stay-up-to-date">Update Guides</a> / <a href="/guides/stay-up-to-date/releases">Releases</a> / 2017-01</small></p>

This page is lists all the updates to the [Gruntwork Infrastructure as Code
Library](https://gruntwork.io/infrastructure-as-code-library/) that were released in 2017-01. For instructions
on how to use these updates in your code, check out the [updating
documentation](/library/stay-up-to-date/updating).

Here are the repos that were updated:

- [boilerplate](#boilerplate)
- [terraform-aws-cache](#terraform-aws-cache)
- [terraform-aws-ci](#terraform-aws-ci)
- [terraform-aws-ecs](#terraform-aws-ecs)
- [terraform-aws-load-balancer](#terraform-aws-load-balancer)
- [terraform-aws-monitoring](#terraform-aws-monitoring)
- [terraform-aws-server](#terraform-aws-server)
- [terraform-aws-vpc](#terraform-aws-vpc)


## boilerplate


### [v0.2.6](https://github.com/gruntwork-io/boilerplate/releases/tag/v0.2.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/18/2017 | <a href="https://github.com/gruntwork-io/boilerplate/releases/tag/v0.2.6">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - Boilerplate will now correctly run `before` hooks _before_ processing any dependencies.


</div>


### [v0.2.5](https://github.com/gruntwork-io/boilerplate/releases/tag/v0.2.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/17/2017 | <a href="https://github.com/gruntwork-io/boilerplate/releases/tag/v0.2.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - Boilerplate now allows you to define `hooks` in `boilerplate.yml` that can be used to execute arbitrary shell commands.


</div>


### [v0.2.4](https://github.com/gruntwork-io/boilerplate/releases/tag/v0.2.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/14/2017 | <a href="https://github.com/gruntwork-io/boilerplate/releases/tag/v0.2.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - Boilerplate now has `templateFolder` and `outputFolder` helpers which return the paths of the `--template-folder` and `--output-folder` settings. These are useful for building relative filepaths.


</div>


### [v0.2.3](https://github.com/gruntwork-io/boilerplate/releases/tag/v0.2.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/11/2017 | <a href="https://github.com/gruntwork-io/boilerplate/releases/tag/v0.2.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - The `shell` helper will now properly display the stderr for the command you are executing


</div>


### [v0.2.2](https://github.com/gruntwork-io/boilerplate/releases/tag/v0.2.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/11/2017 | <a href="https://github.com/gruntwork-io/boilerplate/releases/tag/v0.2.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - When you call the `shell CMD` helper from a file X, `CMD` will be executed in the same folder as X. This makes it easier to use relative paths.


</div>


### [v0.2.1](https://github.com/gruntwork-io/boilerplate/releases/tag/v0.2.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/10/2017 | <a href="https://github.com/gruntwork-io/boilerplate/releases/tag/v0.2.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - Boilerplate now supports a `shell` helper that can execute arbitrary shell commands and render their stdout into the template.


</div>



## terraform-aws-cache


### [v0.3.0](https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v0.3.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/19/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v0.3.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - BREAKING CHANGE: AWS made a backwards-incompatible change to their API where, if the [snapshot_retention_limit](https://www.terraform.io/docs/providers/aws/r/elasticache_replication_group.html#snapshot_retention_limit) property of the `aws_elasticache_replication_group` Terraform resource is set to `0`, you must not pass the [snapshot_window](https://www.terraform.io/docs/providers/aws/r/elasticache_replication_group.html#snapshot_window) property. Previously, the snapshot_window property was simply ignored if not needed.
  
  Note that if you update to this new version of the redis module, it will delete your original ElastiCache cluster and replace it with a new one. Therefore, it&apos;s essential that you have all your data backed up and can take a downtime before you do the upgrade.
  
  Alternatively, it&apos;s possible to update without downtime by using `terraform state` commands. If you&apos;d like assistance with this contact support@gruntwork.io.


</div>



## terraform-aws-ci


### [v0.3.4](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.3.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/27/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.3.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - The `scheduled-lambda-job` module now exposes a `source_code_hash` parameter that works nicely with the [archive_file](https://www.terraform.io/docs/providers/archive/d/archive_file.html) data source in Terraform to automatically zip up your lambda jobs.


</div>


### [v0.3.3](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.3.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/26/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.3.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - You can now pass a map of environment variables to the scheduled-lambda-job module using the `environment_variables` parameter.


</div>


### [v0.3.2](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.3.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/7/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.3.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - The `build-go-binaries` script now supports a `--parallelism` flag which defaults to 32.


</div>



## terraform-aws-ecs


### [v0.4.1](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.4.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/25/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.4.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - ENHANCEMENT: Per #27, the `ecs-cluster` module now accepts the optional parameters `var.alb_security_group_ids` and `var.num_alb_security_group_ids`. 
  
  Whereas previously, an ALB was connected to an ECS Cluster by passing the ECS Cluster&apos;s Security Group ID to the `alb` module (located in the the [Load Balancer Package](https://github.com/gruntwork-io/module-load-balancer)), now the `alb` module is unaware of an ECS Cluster or Auto Scaling Group connected to it, and that responsibility has been shifted to the `ecs-cluster` module.


</div>


### [v0.4.0](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.4.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/19/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.4.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - BREAKING CHANGE: The module `ecs-service-with-alb` replaces the variable previously named `ecs_task_definition` with a variable named `ecs_task_container_definitions` to more accurately reflect what this variable actually represents. This is the sole breaking change in this release.


</div>


### [v0.3.5](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.3.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/19/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.3.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - ENHANCEMENT: The `ecs-service-with-alb` module now outputs `target_group_name`.


</div>


### [v0.3.4](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.3.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/17/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.3.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  BUG FIX: Previously, the `ecs-service-with-alb` may not have correctly matched the Listener Rule configurations specified in `var.alb_listener_rule_configs` to the ALB Listener ARNs `var.alb_listener_arns`. This release fixes that issue and adds a test to validate it.

Note that we are seeing intermittent test failures with the ALB that indicate a small (e.g. 1 - 2 seconds) period of downtime takes place when deploying a new version of a Docker image as part of an ECS Service. We [previously reported](https://forums.aws.amazon.com/thread.jspa?threadID=238679) these issues to AWS and they issued several fixes as a result. So we will remain on watch for this important nuance of using the ALB.


</div>


### [v0.3.3](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.3.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/13/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.3.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - NEW MODULE: `ecs-service-with-alb` is now available! To use it, first create your ECS Cluster with the `ecs-cluster` module. Then create an ALB to be shared among potentially many ECS Services using the [alb module](https://github.com/gruntwork-io/module-load-balancer/tree/master/modules/alb) (contained in a separate repo because the ALB can also be used by an Auto Scaling Group. Then create an instance of the `ecs-service-with-alb`.


</div>



## terraform-aws-load-balancer


### [v0.2.0](https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.2.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/30/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.2.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - &quot;DISRUPTIVE&quot; CHANGE: Previously, the `alb` module was rather opinionated about how it would name the ALB. It assumed you wanted the ALB name to be of the form `&lt;var.alb_name&gt;-&lt;var.environment_name&gt;`. But this proved to be unnecessarily opinionated, so this update changes the ALB name to be exactly the value of the `var.alb_name`. 
  
  Note that the `alb` module API did not change and this is therefore not a &quot;breaking&quot; change, however Terraform will attempt to destroy and re-create your ALB, making this a &quot;disruptive&quot; change. To avoid such disruption, consider using `terraform state` commands. Due to the relative newsness (1 - 2 weeks), only a handful of Gruntwork customers are currently using the `alb` module. Therefore, we did not create documentation on migrating from the previous ALB version.
  
  As always, contact us at support@gruntwork.io if you&apos;d like help migrating this!


</div>


### [v0.1.0](https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.1.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/25/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.1.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - BREAKING CHANGE: Previously the ALB depended on a previously existing ECS Cluster or Auto Scaling Group by exposing the parameters `var.ecs_cluster_security_group_ids` and `var.auto_scaling_group_security_group_ids`. But this dependency was problematic for reasons explained in #5. Now, the ALB depends on no external resources, and any resource like an ECS Cluster that wants to use the ALB can implement its own &quot;hook&quot; into the ALB by reading the new output `alb_security_group_id`. 


</div>


### [v0.0.1](https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.0.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/13/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.0.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Initial release!


</div>



## terraform-aws-monitoring


### [v0.4.1](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.4.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/19/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.4.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - NEW: A new module `alb-alarms` has been added. This module adds a set of CloudWatch alarms on an [Application Load Balancer (ALB)](http://docs.aws.amazon.com/elasticloadbalancing/latest/application/introduction.html).
- NEW: A new module `alb-target-group-alarms` has been added. This module adds a set of CloudWatch alarms on an [ALB Target Group](http://docs.aws.amazon.com/elasticloadbalancing/latest/application/load-balancer-target-groups.html). This group is the preferred way to monitor the resources created by the Gruntwork Module [ecs-service-with-alb](https://github.com/gruntwork-io/module-ecs/tree/master/modules/ecs-service-with-alb).
- NEW: A new stub `ecs-service-with-alb-alarms` was added to direct users seeking CloudWatch alarms for the Gruntwork Module `ecs-service-with-alb` to the `alb-target-group-alarms` module.


</div>



## terraform-aws-server


### [v0.1.4](https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.1.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/4/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.1.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - ENHANCEMENT: `module-server` now outputs `private_ip` so users can get the private IP address of the EC2 Instance.


</div>



## terraform-aws-vpc


### [v0.1.3](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.1.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/26/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.1.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - The `vpc-app-network-acls` module now allows you to choose if you want to allow access to your VPC from the mgmt VPC using a new input variable called `allow_access_from_mgmt_vpc`. It defaults to true for backwards compatibility, but if you set it to false, you can now omit the `mgmt_vpc_cidr_block` parameter.


</div>

<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "releases",
  "hash": "9e39d57dcb4ef119a886183ca0b6e71e"
}
##DOCS-SOURCER-END -->

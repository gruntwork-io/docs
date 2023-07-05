
# Gruntwork release 2016-07

<p style={{marginTop: "-25px"}}><small><a href="/guides">Guides</a> / <a href="/guides/stay-up-to-date">Update Guides</a> / <a href="/guides/stay-up-to-date/releases">Releases</a> / 2016-07</small></p>

This page is lists all the updates to the [Gruntwork Infrastructure as Code
Library](https://gruntwork.io/infrastructure-as-code-library/) that were released in 2016-07. For instructions
on how to use these updates in your code, check out the [updating
documentation](/library/stay-up-to-date/updating).

Here are the repos that were updated:

- [boilerplate](#boilerplate)
- [terraform-aws-asg](#terraform-aws-asg)
- [terraform-aws-cache](#terraform-aws-cache)
- [terraform-aws-ci](#terraform-aws-ci)
- [terraform-aws-data-storage](#terraform-aws-data-storage)
- [terraform-aws-ecs](#terraform-aws-ecs)
- [terraform-aws-monitoring](#terraform-aws-monitoring)
- [terraform-aws-security](#terraform-aws-security)
- [terraform-aws-server](#terraform-aws-server)
- [terraform-aws-vpc](#terraform-aws-vpc)


## boilerplate


### [v0.0.2](https://github.com/gruntwork-io/boilerplate/releases/tag/v0.0.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/1/2016 | <a href="https://github.com/gruntwork-io/boilerplate/releases/tag/v0.0.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - A few fixes for the README


</div>


### [v0.0.1](https://github.com/gruntwork-io/boilerplate/releases/tag/v0.0.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/1/2016 | <a href="https://github.com/gruntwork-io/boilerplate/releases/tag/v0.0.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  First release!


</div>



## terraform-aws-asg


### [v0.0.3](https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.0.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/26/2016 | <a href="https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.0.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - Add Gruntwork license


</div>


### [v0.0.2](https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.0.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/24/2016 | <a href="https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.0.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - Publish public documentation to module-asg-public after each release


</div>


### [v0.0.1](https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.0.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/12/2016 | <a href="https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.0.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  First release in this repo!


</div>



## terraform-aws-cache


### [v0.0.1](https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v0.0.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/30/2016 | <a href="https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v0.0.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - First release in this repo!


</div>



## terraform-aws-ci


### [v0.0.17](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.0.17)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/26/2016 | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.0.17">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - Add Gruntwork license


</div>


### [v0.0.16](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.0.16)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/24/2016 | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.0.16">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - The build for this repo now generates docs from a clean checkout to ensure that none of the output from the earlier parts of the Circle CI build (e.g. compiled binaries, local test files, etc) are included in the generated docs.


</div>


### [v0.0.15](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.0.15)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/24/2016 | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.0.15">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - Output docs-generator binaries to a different folder during the build so they don&apos;t get pushed to the module-ci-public repo


</div>


### [v0.0.14](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.0.14)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/22/2016 | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.0.14">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - Add a new `docs-generator` module that can generate public documentation for a private GitHub repo


</div>


### [v0.0.13](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.0.13)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/12/2016 | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.0.13">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - Add new `build-helpers` module with `build-docker-image` and `build-packer-artifact` scripts.
- Add new `terraform-helpers` module with `terraform-deploy` and `terraform-update-variable` scripts.


</div>


### [v0.0.12](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.0.12)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/12/2016 | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.0.12">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - Fix bug in `configure-environment-for-gruntwork-module` where it would not handle multiple `--go-src-path` parameters correctly.


</div>


### [v0.0.11](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.0.11)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/1/2016 | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.0.11">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Several fixes to the `git-add-commit-push` script:
- When checking if there is something to commit, also check if this is a new, unstated path.
- Make the exit code for “nothing to commit” configurable using the `--no-commit-exit-code` flag. The default is 0.


</div>



## terraform-aws-data-storage


### [v0.0.7](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.0.7)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/29/2016 | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.0.7">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - Migrate elasticache code to module-cache


</div>


### [v0.0.6](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.0.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/26/2016 | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.0.6">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - Add Gruntwork license


</div>


### [v0.0.5](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.0.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/24/2016 | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.0.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - Publish public documentation to module-data-storage-public after each release


</div>



## terraform-aws-ecs


### [v0.1.6](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.1.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/26/2016 | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.1.6">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - Add Gruntwork license


</div>


### [v0.1.5](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.1.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/24/2016 | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.1.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - Publish public documentation to module-ecs-public after each release


</div>


### [v0.1.4](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.1.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/14/2016 | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.1.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - BREAKING CHANGE: `ecs-service` params are renamed to more cleanly separate ELB resources from non-ELB resources by namespacing vars as either `elb_` or not.
- Rolls back #16 since this can be put in clients&apos; infrastructure-modules repo instead.


</div>


### [v0.1.3](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.1.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/14/2016 | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.1.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - `ecs-cluster`: The ECS Node IAM Role now has limited permissions to discover information about its environment. This is useful when bootstrapping a distributed cluster in ECS.


</div>


### [v0.1.2](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.1.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/14/2016 | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.1.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - Bug Fix: `ecs-service`: Previously, this module created an IAM Role for the ECS Service only when an ELB was in use. When we tried to create an ECS Service without an ELB, this was exposed as a bug and is now fixed.


</div>


### [v0.1.1](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.1.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/13/2016 | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.1.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - Bug Fix: `configure-ecs-instance` script claimed to append to the existing `crontab` but actually overwrote it. Now fixed!


</div>


### [v0.1.0](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.1.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/4/2016 | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.1.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - `ecs-service`: BREAKING CHANGE. The `name` property has been renamed to `service_name`.
- `ecs-service`: BREAKING CHANGE. The `associate_with_elb` property has been renamed to `is_associated_with_elb` to better indicate this property accepts boolean values.
- `ecs-service`: BREAKING CHANGE. The `ecs_cluster_vpc_name` property has been added so that the ECS Service&apos;s IAM Role is named uniquely per the environment in which it&apos;s deployed.
- Tests updated to use latest gruntwork-installer.


</div>


### [v0.0.7](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.0.7)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/3/2016 | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.0.7">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - `ecs-cluster` and `ecs-servce` now output `ecs_cluster_arn` instead of `ecs_cluster_id`. This was done to improve clarity about what this var represents.


</div>



## terraform-aws-monitoring


### [v0.0.8](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.0.8)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/26/2016 | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.0.8">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - Add Gruntwork license


</div>


### [v0.0.7](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.0.7)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/24/2016 | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.0.7">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - Generate public documentation into module-aws-monitoring-public on each release


</div>



## terraform-aws-security


### [v0.0.1](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.0.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/26/2016 | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.0.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - First release!


</div>



## terraform-aws-server


### [v0.0.5](https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.0.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/26/2016 | <a href="https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.0.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - Add Gruntwork license


</div>


### [v0.0.4](https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.0.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/24/2016 | <a href="https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.0.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - Generate public documentation for this repo on each release


</div>


### [v0.0.3](https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.0.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/12/2016 | <a href="https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.0.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Add two new modules: 
- `persistent-ebs-volume`: Scripts for mounting and unmounting EBS Volumes on your EC2 Instances for Volumes that need to persist between redeploys of the Instance.
- `route53-helpers`: Scripts for working with Amazon&apos;s DNS Service, Route 53, including a script to add a DNS A record pointing to the instance&apos;s IP address.


</div>



## terraform-aws-vpc


### [v0.0.8](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.0.8)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/26/2016 | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.0.8">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - Add Gruntwork license


</div>


### [v0.0.7](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.0.7)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/24/2016 | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.0.7">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - Publish public documentation to module-vpc-public for each release


</div>


### [v0.0.6](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.0.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/8/2016 | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.0.6">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - Add a new vpc-peering-external module for setting up Routes and Network ACLs for VPC Peering Connections with 3rd parties.


</div>


### [v0.0.5](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.0.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/7/2016 | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.0.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - Fix a bug in the Network ACLs where they would only allow connections between subnets of the same type (e.g. two private app subnets) on ports &gt;= 1024. Now all ports should work.
- Remove extraneous outbound Network ACLs in the private app subnets, since the Network ACLs for those subnets allow all outbound access.
- The VPC modules now have a new output called `vpc_ready` and the Network ACL modules now require a new input called `vpc_ready`. You should feed the former into the latter. This is used to work around a Terraform or AWS timing bug related to creating ACLs at the same time as the VPC and its gateways. See https://github.com/hashicorp/terraform/issues/7527 for details.


</div>




<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "releases",
  "hash": "f855b9c9144542df56cc81d2566bb3d1"
}
##DOCS-SOURCER-END -->

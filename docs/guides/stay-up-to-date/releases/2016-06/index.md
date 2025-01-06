
# Gruntwork release 2016-06

<p style={{marginTop: "-25px"}}><small><a href="/guides">Guides</a> / <a href="/guides/stay-up-to-date">Update Guides</a> / <a href="/guides/stay-up-to-date/releases">Releases</a> / 2016-06</small></p>

This page is lists all the updates to the [Gruntwork Infrastructure as Code
Library](https://gruntwork.io/infrastructure-as-code-library/) that were released in 2016-06. For instructions
on how to use these updates in your code, check out the [updating
documentation](/library/stay-up-to-date/updating).

Here are the repos that were updated:

- [gruntkms](#gruntkms)
- [terraform-aws-ci](#terraform-aws-ci)
- [terraform-aws-data-storage](#terraform-aws-data-storage)
- [terraform-aws-ecs](#terraform-aws-ecs)
- [terraform-aws-monitoring](#terraform-aws-monitoring)
- [terraform-aws-server](#terraform-aws-server)
- [terraform-aws-vpc](#terraform-aws-vpc)


## gruntkms


### [v0.0.3](https://github.com/gruntwork-io/gruntkms/releases/tag/v0.0.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/29/2016 | <a href="https://github.com/gruntwork-io/gruntkms/releases/tag/v0.0.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - Fix a bug where the `decrypt` command did not properly report AWS error messages and would fail silently.


</div>


### [v0.0.2](https://github.com/gruntwork-io/gruntkms/releases/tag/v0.0.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/29/2016 | <a href="https://github.com/gruntwork-io/gruntkms/releases/tag/v0.0.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - Statically link the `gruntkms` binaries


</div>


### [v0.0.1](https://github.com/gruntwork-io/gruntkms/releases/tag/v0.0.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/20/2016 | <a href="https://github.com/gruntwork-io/gruntkms/releases/tag/v0.0.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - First release


</div>



## terraform-aws-ci


### [v0.0.10](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.0.10)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/20/2016 | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.0.10">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - Fix a bug in `upload-github-release-assets` where the default values for repo name and owner name, read from Circle CI env vars, were backwards.


</div>


### [v0.0.9](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.0.9)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/20/2016 | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.0.9">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - Add more logging and error checking to `upload-github-release-assets`


</div>


### [v0.0.8](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.0.8)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/20/2016 | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.0.8">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - Use GitHub release tag API to retrieve id of the release in `upload-github-release-assets`


</div>


### [v0.0.7](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.0.7)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/20/2016 | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.0.7">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - Fix flag parsing in `build-go-binaries`: it now correctly looks for `--ld-flags` instead of `--ld_flags`.


</div>


### [v0.0.6](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.0.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/13/2016 | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.0.6">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - Fix a bug in the `git-add-commit-push`. It now does `git config` before `add` or `commit`.


</div>


### [v0.0.5](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.0.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/13/2016 | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.0.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Add 3 new helpers to the `gruntwork-module-circleci-helpers` module: 
- `build-go-binaries`: automatically build binaries for Go apps.
- `git-add-commit-push`: automatically add, commit, and push changes to Git.
- `upload-github-release-assets`: automatically upload assets to a GitHub release.


</div>


### [v0.0.4](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.0.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/12/2016 | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.0.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - Fix a bug in `run-go-tests` with `glide novendor` and newlines.


</div>


### [v0.0.3](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.0.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/12/2016 | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.0.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - The `--path` parameter in `run-go-tests` is now optional and defaults to the current working directory.


</div>


### [v0.0.2](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.0.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/12/2016 | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.0.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - Add a new `--packages` parameter to `run-go-tests` that allows you to specify which packages to test separate from the `--path` parameter, which is now just for setting the working directory. The default `--packages` value is the output of running `glide novendor` in `--path`.


</div>


### [v0.0.0](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.0.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/12/2016 | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.0.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  This release is used solely for automated testing of the `upload-github-release-assets` script. Do not use this for anything in production!


</div>


### [v0.0.1](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.0.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/7/2016 | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.0.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - First release in this standalone repo!


</div>



## terraform-aws-data-storage


### [v0.0.4](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.0.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/22/2016 | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.0.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - All data stores now support a `bastion_host_security_group_id` parameter that can be used to allow the bastion host (or more likely, you using the bastion host via SSH tunneling) to connect to the data store. For security reasons, the default for the `bastion_host_security_group_id` parameter is empty string, which means it&apos;s disabled.


</div>


### [v0.0.3](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.0.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/16/2016 | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.0.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  `redis` module now treats auto-failover as optional. This is useful if you wish to launch a stage redis but reduce cost by launching just a single node.


</div>


### [v0.0.2](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.0.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/14/2016 | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.0.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - `redis`module now accepts a `bastion_host_security_group_id` so it can accept connections specifically from the Bastion Host, not just a CIDR range.


</div>


### [v0.0.1](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.0.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/10/2016 | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.0.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Initial release!


</div>



## terraform-aws-ecs


### [v0.0.6](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.0.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/1/2016 | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.0.6">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - For `ecs-cluster` and `ecs-server` modules, terraform output values containing a value like `iam_role_name` now output a human-friendly name, not a globally unique string ID as before.
- Due to [Terraform Bug #3888](https://github.com/hashicorp/terraform/issues/3888), a bug was introduced in an earlier release when using the `ecs-cluster` module from a terraform template that is in turn called by another terraform template. This release fixes that bug by adding an explicit var `allow_ssh` to indicate whether SSH from a specific security group will be allowed. This is redundant but resolves the issue until the Terraform bug is resolved.


</div>


### [v0.0.5](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.0.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/30/2016 | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.0.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - Module `ecs-cluster` now outputs the more standardized names of `ecs_instance_iam_role_arn` and `ecs_instance_iam_role_name`.


</div>


### [v0.0.4](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.0.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/29/2016 | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.0.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - Module `ecs-service` now outputs the ECS Service ARN value
- Minor bug fixes around how the ECR region is handled


</div>


### [v0.0.3](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.0.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/22/2016 | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.0.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - Fix bug where the ecs-service module did not work properly if you did not associate it with an ELB


</div>


### [v0.0.2](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.0.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/21/2016 | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.0.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - The `allow_ssh_from_security_group_id` variable on the ecs-cluster module is now required. The module also now handles an empty string value correctly for that variable, so you can set it to an empty string to disallow SSH connections.
- Added a discussion of how to handle updates to ECS cluster instances to the [ecs-cluster README](https://github.com/gruntwork-io/module-ecs/tree/master/modules/ecs-cluster#how-do-you-make-changes-to-the-ec2-instances-in-the-cluster).


</div>


### [v0.0.1](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.0.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/8/2016 | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.0.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  First release in this repo!


</div>



## terraform-aws-monitoring


### [v0.0.6](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.0.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/30/2016 | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.0.6">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - The `run-cloudwatch-logs-agent.sh` now supports 3 parameters: `--vpc-name`, `--log-group-name`, and `--log-stream-name`.


</div>


### [v0.0.5](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.0.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/28/2016 | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.0.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - The `route53-health-check` module now enforces that the CloudWatch Alarm and SNS Topic for the Route 53 Health Check are both in `us-east-1`, as that&apos;s the only place where Route 53 sends CloudWatch metrics.


</div>


### [v0.0.4](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.0.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/27/2016 | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.0.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - Don&apos;t trigger alarms when ELB request latency switches to `INSUFFICIENT_DATA` state, as that indicates no requests are going through the ELB, which might not be an error condition, and if it is, should be caught by the `elb_low_request_count` alarm instead.
- Only create the `elb_low_request_count` alarm if `var.elb_low_request_count_threshold` is greater than 0.


</div>


### [v0.0.3](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.0.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/27/2016 | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.0.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - All alarm names are now parameterized using the relevant resource name (e.g. ELB alarms include the ELB name in their own name) so that you do not have name conflicts if you use the same alarm more than once.
- Added alarms for RDS. See `modules/alarms/rds-alarms`.
- Added alarms for ECS. See `modules/alarms/ecs-cluster-alarms` and `modules/alarms/ecs-service-alarms`.


</div>


### [v0.0.2](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.0.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/24/2016 | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.0.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - The `install-cloudwatch-logs-agent.sh` script now properly configures the AWS region on Amazon Linux too


</div>


### [v0.0.1](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.0.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/17/2016 | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.0.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - First release in this repo!


</div>



## terraform-aws-server


### [v0.0.2](https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.0.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/7/2016 | <a href="https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.0.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - Rename `standalone-server` module to `single-server`


</div>


### [v0.0.1](https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.0.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/7/2016 | <a href="https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.0.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - First release in this new standalone repo!


</div>



## terraform-aws-vpc


### [v0.0.4](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.0.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/24/2016 | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.0.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - Fix bug where VPC templates defined a route both inline to `aws_route_table` terraform resource and externally as an `aws_route`. Now all routes are defined as an `aws_route`, so that Terraform will behave correctly.


</div>


### [v0.0.3](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.0.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/17/2016 | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.0.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - Fix bug where private subnets could not make calls to the public Internet.
- Remove the `nat_gateway_ips` and `num_nat_gateway_ips` parameters from the network-acl modules.


</div>


### [v0.0.2](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.0.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/10/2016 | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.0.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - Add modules for configuring Network ACLs to control network communication between subnets: `vpc-app-network-acls`, `vpc-mgmt-network-acls`, `network-acl-outbound`, `network-acl-inbound`.


</div>


### [v0.0.1](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.0.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/8/2016 | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.0.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  First release in this repo!


</div>

<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "releases",
  "hash": "d5ffc4ecfe26ace369cf269a90b06d43"
}
##DOCS-SOURCER-END -->

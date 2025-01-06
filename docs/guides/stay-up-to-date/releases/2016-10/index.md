
# Gruntwork release 2016-10

<p style={{marginTop: "-25px"}}><small><a href="/guides">Guides</a> / <a href="/guides/stay-up-to-date">Update Guides</a> / <a href="/guides/stay-up-to-date/releases">Releases</a> / 2016-10</small></p>

This page is lists all the updates to the [Gruntwork Infrastructure as Code
Library](https://gruntwork.io/infrastructure-as-code-library/) that were released in 2016-10. For instructions
on how to use these updates in your code, check out the [updating
documentation](/library/stay-up-to-date/updating).

Here are the repos that were updated:

- [boilerplate](#boilerplate)
- [terraform-aws-ci](#terraform-aws-ci)
- [terraform-aws-ecs](#terraform-aws-ecs)
- [terraform-aws-vpc](#terraform-aws-vpc)


## boilerplate


### [v0.1.1](https://github.com/gruntwork-io/boilerplate/releases/tag/v0.1.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/31/2016 | <a href="https://github.com/gruntwork-io/boilerplate/releases/tag/v0.1.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - Fix a bug where `boilerplate` would exit with an error if you tried to pass lists and maps to dependencies.


</div>



## terraform-aws-ci


### [v0.0.24](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.0.24)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/18/2016 | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.0.24">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - Fix a bug in `configure-environment-for-gruntwork-module` that was causing it to fail to install the latest version of Terraform (`0.7.7`).


</div>



## terraform-aws-ecs


### [v0.3.1](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.3.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/31/2016 | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.3.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - The `ecs-service` module now automatically creates an IAM Role and IAM Policies that make it easier to use ECS auto scaling. See [How do you scale an ECS Service?](https://github.com/gruntwork-io/module-ecs/tree/master/modules/ecs-service#how-do-you-scale-an-ecs-service) and the [docker-service-with-autoscaling example](https://github.com/gruntwork-io/module-ecs/tree/master/examples/docker-service-with-autoscaling) for details.


</div>


### [v0.3.0](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.3.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/30/2016 | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.3.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - The `ecs-service` module now supports [canary deployment](http://martinfowler.com/bliki/CanaryRelease.html)! To use it, set the `canary_task_arn`  and `desired_number_of_canary_tasks_to_run` parameters. See [How do I do a canary deployment?](https://github.com/gruntwork-io/module-ecs/tree/master/modules/ecs-service#how-do-i-do-a-canary-deployment) and the [docker-service-with-canary-deployment example](https://github.com/gruntwork-io/module-ecs/tree/master/examples/docker-service-with-canary-deployment) for details.
- The `ecs-service` module&apos;s `service_with_elb_arn` and `service_without_elb_arn` output variables have been removed. Instead, use the `service_arn` and `canary_service_arn` outputs.


</div>



## terraform-aws-vpc


### [v0.1.2](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.1.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/3/2016 | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.1.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - Fix a bug so that `propagating_vgws` parameters are now correctly handled as lists.


</div>

<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "releases",
  "hash": "58d348eff14daa26fd8491c2cd8428dd"
}
##DOCS-SOURCER-END -->


# Gruntwork release 2018-09

<p style={{marginTop: "-25px"}}><small><a href="/guides">Guides</a> / <a href="/guides/stay-up-to-date">Update Guides</a> / <a href="/guides/stay-up-to-date/releases">Releases</a> / 2018-09</small></p>

This page is lists all the updates to the [Gruntwork Infrastructure as Code
Library](https://gruntwork.io/infrastructure-as-code-library/) that were released in 2018-09. For instructions
on how to use these updates in your code, check out the [updating
documentation](/library/stay-up-to-date/updating).

Here are the repos that were updated:

- [terraform-aws-asg](#terraform-aws-asg)
- [terraform-aws-ci](#terraform-aws-ci)
- [terraform-aws-data-storage](#terraform-aws-data-storage)
- [terraform-aws-ecs](#terraform-aws-ecs)
- [terraform-aws-lambda](#terraform-aws-lambda)
- [terraform-aws-load-balancer](#terraform-aws-load-balancer)
- [terraform-aws-messaging](#terraform-aws-messaging)
- [terraform-aws-sam](#terraform-aws-sam)


## terraform-aws-asg


### [v0.6.17](https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.6.17)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/27/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.6.17">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

</div>


### [v0.6.16](https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.6.16)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/26/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.6.16">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

</div>



## terraform-aws-ci


### [v0.13.2](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.13.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/18/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.13.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

</div>



## terraform-aws-data-storage


### [v0.6.8](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.6.8)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/20/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.6.8">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

</div>



## terraform-aws-ecs


### [v0.8.5](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.8.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/30/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.8.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/module-ecs/pull/92: You can now configure volumes for the `ecs-service` module using the new `volumes` parameter.

</div>


### [v0.8.4](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.8.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/20/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.8.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/module-ecs/pull/91: The `ecs-service-with-discovery` module now outputs the security group ID via the output variable `ecs_task_security_group_id`.

</div>



## terraform-aws-lambda


### [v0.2.3](https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.2.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/24/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.2.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/package-lambda/pull/21: Add a new parameter called `wait_for` to the `lambda` module. All the resources in the module will not be created until `wait_for` is resolved, which allows you to execute other steps (e.g., create zip file) before this module runs. This is a workaround for the lack of `depends_on` for modules in Terraform. 

</div>



## terraform-aws-load-balancer


### [v0.12.0](https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.12.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/18/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.12.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - `https_listener_ports_and_acm_ssl_certs_num` to specify the length of `https_listener_ports_and_acm_ssl_certs`
- `https_listener_ports_and_ssl_certs_num` to specify the length of `https_listener_ports_and_ssl_certs`

This helps bypass the Terraform bug where the contents of those variables depend on dynamic resources hashicorp/terraform#11482.

This release is **BACKWARD INCOMPATIBLE** with previous releases only if you were using SSL certs. To upgrade you&apos;ll need to specify the newly added variables and run `terraform apply`.

</div>


### [v0.11.1](https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.11.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/7/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.11.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

</div>



## terraform-aws-messaging


### [v0.1.1](https://github.com/gruntwork-io/terraform-aws-messaging/releases/tag/v0.1.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/6/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-messaging/releases/tag/v0.1.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

</div>



## terraform-aws-sam


### [v0.1.7](https://github.com/gruntwork-io/terraform-aws-sam/releases/tag/v0.1.7)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/27/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-sam/releases/tag/v0.1.7">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  This release introduces the ability to pass environment variables along to lambdas while testing locally using AWS SAM CLI

</div>


### [v0.1.6](https://github.com/gruntwork-io/terraform-aws-sam/releases/tag/v0.1.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/25/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-sam/releases/tag/v0.1.6">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

</div>

<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "releases",
  "hash": "a9a6d4224a6609eee5ffe81c02725c27"
}
##DOCS-SOURCER-END -->


# Gruntwork release 2018-09

<p style={{marginTop: "-25px"}}><small><a href="/guides">Guides</a> / <a href="/guides/stay-up-to-date">Update Guides</a> / <a href="/guides/stay-up-to-date/releases">Releases</a> / 2018-09</small></p>

This page is lists all the updates to the [Gruntwork Infrastructure as Code 
Library](https://gruntwork.io/infrastructure-as-code-library/) that were released in 2018-09. For instructions 
on how to use these updates in your code, check out the [updating 
documentation](/guides/working-with-code/using-modules#updating).

Here are the repos that were updated:

- [terraform-aws-asg](#terraform-aws-asg)
- [terraform-aws-ci](#terraform-aws-ci)
- [terraform-aws-data-storage](#terraform-aws-data-storage)
- [terraform-aws-ecs](#terraform-aws-ecs)
- [terraform-aws-elk](#terraform-aws-elk)
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
  <small>Published: 9/19/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.6.8">Release notes</a></small>
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



## terraform-aws-elk


### [v0.2.5](https://github.com/gruntwork-io/terraform-aws-elk/releases/tag/v0.2.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/27/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-elk/releases/tag/v0.2.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
Also added proper plumbing for `allow_ssh_from_security_group_ids` to be specified in the `elastalert` module and then be passed all the way through to the underlying `elastalert-security-group-rules` module

</div>


### [v0.2.4](https://github.com/gruntwork-io/terraform-aws-elk/releases/tag/v0.2.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/25/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-elk/releases/tag/v0.2.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

</div>


### [v0.2.3](https://github.com/gruntwork-io/terraform-aws-elk/releases/tag/v0.2.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/25/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-elk/releases/tag/v0.2.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

</div>


### [v0.2.2](https://github.com/gruntwork-io/terraform-aws-elk/releases/tag/v0.2.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/24/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-elk/releases/tag/v0.2.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Resolved #46 with PR #49. We were missing an equals sign. There was some inconsistent behavior with some customers reporting issues as a result while other tests running and passing without issue.

</div>


### [v0.2.1](https://github.com/gruntwork-io/terraform-aws-elk/releases/tag/v0.2.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/24/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-elk/releases/tag/v0.2.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Resolved issue: #47 with PR: #48.

All other cluster outputs (elastalert, elasticsearch, kibana) have an iam_role_id output but logstash-cluster was missing this variable:

```Hcl
output "iam_role_id" {
  value = "${module.logstash_cluster.iam_role_id}"
}
```

This variable is useful for adding ssh-grunt IAM policies to this ASG. Thank you to @Merlz for pointing out the oversight.

</div>


### [v0.2.0](https://github.com/gruntwork-io/terraform-aws-elk/releases/tag/v0.2.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/19/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-elk/releases/tag/v0.2.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  This release includes some major changes:

1. Adds support for alerting on patterns with [Elastalert](https://github.com/Yelp/elastalert) 
1. Replaces the usage of an NLB with an ALB instead
1. Adds an auto discovery script to the Filebeat deployment to bypass the need for a load balancer between the application server and Logstash cluster.

Here's why we removed the NLB:

* The NLB can't [route back requests to the same node that initiated the request](https://forums.aws.amazon.com/thread.jspa?threadID=265344).
* An internal NLB in a private subnet can't be accessed from a peered VPC. In a production environment (especially the one deployed with our reference architecture), this makes it impossible to access the NLB.

This release is backwards incompatible with previous releases. To upgrade you need to follow the following steps:

1. Remove your use of the `nlb` module and replace with an `alb`. See example here: https://github.com/gruntwork-io/package-elk/blob/master/examples/elk-multi-cluster/main.tf#L436
1. Replace your use of the `load-balancer-target-group` module with `load-balancer-alb-target-group`. See example of using the new module https://github.com/gruntwork-io/package-elk/blob/master/examples/elk-multi-cluster/main.tf#L71
1. Finally update the various `target_group_arns` arguments passed to the cluster modules. https://github.com/gruntwork-io/package-elk/blob/master/examples/elk-multi-cluster/main.tf#L40
1. If you're using SSL with the ALB, you'll need to take note of the upgrade notes here: https://github.com/gruntwork-io/module-load-balancer/releases/tag/v0.12.0

</div>


### [v0.1.1](https://github.com/gruntwork-io/terraform-aws-elk/releases/tag/v0.1.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/4/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-elk/releases/tag/v0.1.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
Going forward, the ALB will be our "front facing" load balancer that will be how users access apps like Kibana. The ultimate goal will be to remove the NLB entirely rather than having to run both kinds of load balancers. We should be able to achieve this goal with #43 

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

This release is **BACKWARD INCOMPATIBLE** with previous releases only if you were using SSL certs. To upgrade you'll need to specify the newly added variables and run `terraform apply`.

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
  "hash": "ad6819ab1c971b67df9c3e24674e0409"
}
##DOCS-SOURCER-END -->

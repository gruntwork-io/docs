
# Gruntwork release 2018-03

<p style={{marginTop: "-25px"}}><small><a href="/guides">Guides</a> / <a href="/guides/stay-up-to-date">Update Guides</a> / <a href="/guides/stay-up-to-date/releases">Releases</a> / 2018-03</small></p>

This page is lists all the updates to the [Gruntwork Infrastructure as Code
Library](https://gruntwork.io/infrastructure-as-code-library/) that were released in 2018-03. For instructions
on how to use these updates in your code, check out the [updating
documentation](/library/stay-up-to-date/updating).

Here are the repos that were updated:

- [gruntwork](#gruntwork)
- [terraform-aws-asg](#terraform-aws-asg)
- [terraform-aws-cache](#terraform-aws-cache)
- [terraform-aws-data-storage](#terraform-aws-data-storage)
- [terraform-aws-ecs](#terraform-aws-ecs)
- [terraform-aws-lambda](#terraform-aws-lambda)
- [terraform-aws-load-balancer](#terraform-aws-load-balancer)
- [terraform-aws-monitoring](#terraform-aws-monitoring)
- [terraform-aws-sam](#terraform-aws-sam)
- [terraform-aws-security](#terraform-aws-security)
- [terraform-aws-server](#terraform-aws-server)
- [terraform-aws-static-assets](#terraform-aws-static-assets)
- [terraform-aws-utilities](#terraform-aws-utilities)


## gruntwork


### [v0.0.17](https://github.com/gruntwork-io/gruntwork/releases/tag/v0.0.17)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/27/2018 | <a href="https://github.com/gruntwork-io/gruntwork/releases/tag/v0.0.17">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/gruntwork/pull/23: You can now use spaces in zip codes when buying domain names.

</div>



## terraform-aws-asg


### [v0.6.9](https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.6.9)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/1/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.6.9">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/module-asg/pull/25: Fix multiline python commands so they work on Windows.

</div>


### [v0.6.8](https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.6.8)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/1/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.6.8">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/module-asg/pull/24: Update to latest `package-terraform-utilities` to fix a bug where the `join-path` module doesn’t work with newer versions of Python.

</div>


### [v0.6.7](https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.6.7)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/1/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.6.7">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/module-asg/pull/23: Fix rolling deployment script path on Windows.

</div>



## terraform-aws-cache


### [v0.3.4](https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v0.3.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/13/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v0.3.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

</div>



## terraform-aws-data-storage


### [v0.6.0](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.6.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/19/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.6.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  **BACKWARDS INCOMPATIBLE RELEASE**

Replaces `bastion_host_security_group_id` with `allow_connections_from_security_groups` array to allow specifying more than one security group. This change is backward incompatible and you need to include `bastion_host_security_group_id` in the `allow_connections_from_security_groups` array to get this to work

</div>


### [v0.5.2](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.5.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/7/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.5.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/module-data-storage/pull/36: If you wish to make your Aurora database accessible from the public Internet, you can now set the `publicly_accessible` flag to true (WARNING: NOT RECOMMENDED FOR PRODUCTION USAGE!!). The default is false, which means the database is only accessible from within the VPC, which is much more secure.

</div>



## terraform-aws-ecs


### [v0.6.4](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.6.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/20/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.6.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/module-ecs/pull/58: You can now use spot instances with your ECS cluster by setting the `cluster_instance_spot_price` parameter to the maximum bid price you want to use on the EC2 Spot Market!

**NOTE**: due to a bug in Terraform, if you update an existing cluster with a spot price, you might see an error like this when you run `apply`:

```
* module.ecs_cluster.aws_launch_configuration.ecs: aws_launch_configuration.ecs: diffs didn&apos;t match during apply. This is a bug with Terraform and should be reported as a GitHub Issue.
```

Running `apply` a second time seems to complete without errors.

</div>


### [v0.6.3](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.6.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/6/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.6.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_definition_parameters.html#network_mode 

</div>



## terraform-aws-lambda


### [v0.2.1](https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.2.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/1/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.2.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/package-lambda/pull/11: Add new `lambda-edge` module that can be used to deploy Lambda@Edge functions with Terraform.

</div>



## terraform-aws-load-balancer


### [v0.7.2](https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.7.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/16/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.7.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/module-load-balancer/pull/25: Fix a bug so the `ssl_policy` parameter introduced in the previous release works with both ACM TLS certs and non-ACM TLS certs.

</div>


### [v0.7.1](https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.7.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/12/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.7.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/module-load-balancer/pull/24: You can now configure the SSL policy for the ALB using the `ssl_policy` variable.

</div>



## terraform-aws-monitoring


### [v0.9.1](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.9.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/26/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.9.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/module-aws-monitoring/pull/47: Fix `run-cloudwatch-logs-agent.sh` so for Amazon Linux and CentOS so instead of sending `/var/log/auth.log`, which doesn&apos;t exist, it sends `/var/log/secure` to CloudWatch Logs. 

</div>



## terraform-aws-sam


### [v0.1.2](https://github.com/gruntwork-io/terraform-aws-sam/releases/tag/v0.1.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/23/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-sam/releases/tag/v0.1.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

</div>


### [v0.1.1](https://github.com/gruntwork-io/terraform-aws-sam/releases/tag/v0.1.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/22/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-sam/releases/tag/v0.1.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Multiple stage deployments were causing a Terraform error

</div>


### [v0.1.0](https://github.com/gruntwork-io/terraform-aws-sam/releases/tag/v0.1.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/21/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-sam/releases/tag/v0.1.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Refactor the auto-generated code by creating the `aws_api_gateway_rest_api` resource external to the modules in order allow additional resources to be added via Terraform. Additionally,  split the auto-generated code into two separate modules to allow for deployment of multiple api gateway stages separately from the definition of the resources.


THIS VERSION IS NOT BACKWARDS COMPATIBLE AND ANY CODE REFERENCING AUTO-GENERATED MODULES WILL NEED TO BE UPDATED.

</div>



## terraform-aws-security


### [v0.8.0](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.8.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/14/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.8.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

</div>


### [v0.7.3](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.7.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/1/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.7.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/module-security/pull/75: The `auto-update`, `fail2ban`, and `ntp` modules now all support CentOS.

</div>


### [v0.7.2](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.7.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/1/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.7.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/module-security/pull/74: Add a new module called `ssh-iam-selinux-policy`. If you are using `ssh-iam` on CentOS, you should install this module so that SELinux doesn&apos;t prevent `ssh-iam` from working!

</div>



## terraform-aws-server


### [v0.4.2](https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.4.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/12/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.4.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

</div>



## terraform-aws-static-assets


### [v0.3.2](https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.3.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/28/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.3.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

</div>


### [v0.3.1](https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.3.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/14/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.3.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/package-static-assets/pull/9: You can now configure CORS for the S3 bucket using the new `cors_rule` parameter in the `s3-static-website` module. 

</div>


### [v0.3.0](https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.3.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/14/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.3.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/package-static-assets/pull/7: 

BACKWARDS INCOMPATIBLE CHANGE

The `s3-static-website` module now enables server-side encryption by default. The encryption settings can be configured by a new input variable called `server_side_encryption_configuration`. If you&apos;d like to disable server-side encryption, set `server_side_encryption_configuration = []`.

</div>



## terraform-aws-utilities


### [v0.0.3](https://github.com/gruntwork-io/terraform-aws-utilities/releases/tag/v0.0.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/1/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-utilities/releases/tag/v0.0.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/package-terraform-utilities/pull/4: Fix `print` call in the `operating-system` module so it works with newer versions of Python.

</div>


### [v0.0.2](https://github.com/gruntwork-io/terraform-aws-utilities/releases/tag/v0.0.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/1/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-utilities/releases/tag/v0.0.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/package-terraform-utilities/pull/3: Added two new modules:

1. `operating-system`: This can be used to detect the operating system on which Terraform is currently running.

1. `join-path`: This can be used to join multiple path parts (folders, files) into a single path, using the proper separator for the current OS.

The primary use case is so we can format paths properly on Windows vs Linux.

</div>

<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "releases",
  "hash": "470ebfc490c789dfad8631a6939bb7c0"
}
##DOCS-SOURCER-END -->

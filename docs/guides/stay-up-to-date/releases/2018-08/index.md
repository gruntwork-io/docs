
# Gruntwork release 2018-08

<p style={{marginTop: "-25px"}}><small><a href="/guides">Guides</a> / <a href="/guides/stay-up-to-date">Update Guides</a> / <a href="/guides/stay-up-to-date/releases">Releases</a> / 2018-08</small></p>

This page is lists all the updates to the [Gruntwork Infrastructure as Code
Library](https://gruntwork.io/infrastructure-as-code-library/) that were released in 2018-08. For instructions
on how to use these updates in your code, check out the [updating
documentation](/library/stay-up-to-date/updating).

Here are the repos that were updated:

- [boilerplate](#boilerplate)
- [terraform-aws-ci](#terraform-aws-ci)
- [terraform-aws-data-storage](#terraform-aws-data-storage)
- [terraform-aws-ecs](#terraform-aws-ecs)
- [terraform-aws-load-balancer](#terraform-aws-load-balancer)
- [terraform-aws-security](#terraform-aws-security)


## boilerplate


### [v0.2.23](https://github.com/gruntwork-io/boilerplate/releases/tag/v0.2.23)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/1/2018 | <a href="https://github.com/gruntwork-io/boilerplate/releases/tag/v0.2.23">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/boilerplate/pull/46: The `--disable-shell` and `--disable-hooks` should now work with dependencies too.

</div>



## terraform-aws-ci


### [v0.13.1](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.13.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/28/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.13.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/module-ci/pull/75: The `git-add-commit-push` script will now retry on &quot;cannot lock ref&quot; errors that seem to come up if two `git push` calls happen simultaneously.

</div>


### [v0.13.0](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.13.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/24/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.13.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
**Note:** If you update to this version, you may experience issues resulting from now using the latest versions of Packer, Terraform and Terragrunt. You can always specify `--packer-version`, `--terraform-version` or `--terragrunt-version` parameters to pin to older versions until you are ready to migrate.

</div>


### [v0.12.2](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.12.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/7/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.12.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
Special thanks to @natefaerber for the contribution!

</div>


### [v0.12.1](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.12.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/3/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.12.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/module-ci/pull/70: You can now set the `--git-user-email` and `--git-user-name` params in `terraform-update-variable` to specify the email and username for the git commit.

</div>



## terraform-aws-data-storage


### [v0.6.7](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.6.7)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/10/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.6.7">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

</div>



## terraform-aws-ecs


### [v0.8.3](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.8.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/30/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.8.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/module-ecs/pull/88: You can now configure volumes for the `ecs-service-with-alb` module using the new `volumes` parameter.

</div>


### [v0.8.2](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.8.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/28/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.8.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/module-ecs/pull/83: Added a new `ecs-daemon-service` module that you can use to deploy exactly one task on each active container instance that meets all of the task placement constraints specified in your cluster.


</div>


### [v0.8.1](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.8.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/27/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.8.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/module-ecs/pull/86: The `ecs-fargate` module now outputs the IAM Role ID and name via the `fargate_task_execution_iam_role_id` and `fargate_task_execution_iam_role_name` output variables, respectively.

</div>


### [v0.8.0](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.8.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/15/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.8.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/module-ecs/pull/75: Add module `ecs-with-service-discovery`

This module allows you to deploy an ECS Service with Service discovery in AWS, taking care of registering the discovery service with the ECS service, configuring the network and making a the necessary Route 53 alias for public hostnames. 

There are many advantages of using ECS Service Discovery instead of reaching your container through a Load Balancer, for example:

* Direct communication with the container run by your service
* Lower latency, if using AWS internal network and private namespace 
* You can do service-to-service authentication
* Not having a Load Balancer also means fewer resources to manage
* You can configure a Health Check and associate it with all records within a namespace
* You can make a logical group of services under one namespace

Currently our module supports public or private hostnames, examples are provided for both scenarios, and tasks with the awsvpc network mode. Host and bridge network modes will be supported on future updates.

</div>


### [v0.7.1](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.7.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/14/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.7.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/module-ecs/pull/80: Fix the `cidr_blocks` parameter in the `ecs-fargate` module to properly handle lists of CIDR blocks.

</div>


### [v0.7.0](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.7.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/8/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.7.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
Originally, we developed the `ecs-service` module first. Then AWS announced the ALB and we realized that we needed to make some improvements to the interface in order to support the ALB and arbitrary ECS Task Definitions. Thanks to @bendavies, the `ecs-service` module now enjoys those same benefits.

Unfortunately, this does constitute a breaking change for the `ecs-service` module. 

</div>



## terraform-aws-load-balancer


### [v0.11.0](https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.11.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/23/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.11.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
**Important:** If you are using `var.allow_inbound_from_security_group_ids` you will now **need** to set `var.allow_inbound_from_security_group_ids_num` because the default is `0`. If your code was already working correctly with the old approach, there is no reason why you can&apos;t just set `var.allow_inbound_from_security_group_ids_num` to be `length(var.allow_inbound_from_security_group_ids)`. 

The only reason for changing the behavior in the module is to address the issue when someone has dynamic resources in the `var.allow_inbound_from_security_group_ids` array (For example, you specify an array with exactly one thing in it, the security group id that is an _output_ variable from another module).


</div>


### [v0.10.0](https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.10.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/6/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.10.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - #36: The ALB no longer sets a default value for the TLS/SSL policy, which is used to determine which TLS versions will be accepted when a client attempts to create an HTTPS connection to the ALB. 

    This change forces the user to think carefully about which TLS versions they want to support, which involves balancing better security with broader compatibility. Note that the previous default value was `ELBSecurityPolicy-2015-05`, which was outdated. For additional info, see the [Amazon Docs]( https://docs.aws.amazon.com/elasticloadbalancing/latest/application/create-https-listener.html#describe-ssl-policies).

   Special thanks to @natefaerber for the submission!

</div>



## terraform-aws-security


### [v0.15.1](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.15.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/14/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.15.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/module-security/pull/108: The `iam_user_self_mgmt` policy in the `iam-policies` module now includes the `iam:DeleteVirtualMFADevice` permission, which seems to be required now to add an MFA device, but is also useful for deleting one.

</div>


### [v0.15.0](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.15.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/11/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.15.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/module-security/pull/107: 


This PR contains a BACKWARDS INCOMPATIBLE CHANGE to the `iam-policies` module. Instead of a `should_require_mfa` parameter, it now takes in two parameters:

1. `trust_policy_should_require_mfa`: Set to true to require MFA in Trust Policies. You should typically set this to true to make sure your IAM Roles can only be assumed by users with an MFA token.
1. `iam_policy_should_require_mfa`: Set to true to require MFA in all other IAM Policies. You should typically set this to false on IAM Roles, as the MFA requirement is already handled by `trust_policy_should_require_mfa`, and it turns out that requiring MFA in both places doesn&apos;t work with `aws sts assume-role`. However, you should set this to true on other IAM policies that don&apos;t involve IAM Roles (e.g., in IAM Group policies).


Per the above, the `cross-account-iam-policy` module now sets `trust_policy_should_require_mfa` based on the specified `should_require_mfa` input and always sets `iam_policy_should_require_mfa` to false.


Fix a bug in the `aws-auth` script so that you can now assume an IAM role _and_ use MFA _and_ set a longer expiration time (longer than the 1h default) all in one command. 

</div>

<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "releases",
  "hash": "77a6179d7409622b770039d146c5aa73"
}
##DOCS-SOURCER-END -->

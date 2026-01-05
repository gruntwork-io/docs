
# Gruntwork release 2019-06

<p style={{marginTop: "-25px"}}><small><a href="/guides">Guides</a> / <a href="/guides/stay-up-to-date">Update Guides</a> / <a href="/guides/stay-up-to-date/releases">Releases</a> / 2019-06</small></p>

This page is lists all the updates to the [Gruntwork Infrastructure as Code
Library](https://gruntwork.io/infrastructure-as-code-library/) that were released in 2019-06. For instructions
on how to use these updates in your code, check out the [updating
documentation](/library/stay-up-to-date/updating).

Here are the repos that were updated:

- [terraform-aws-asg](#terraform-aws-asg)
- [terraform-aws-cache](#terraform-aws-cache)
- [terraform-aws-ci](#terraform-aws-ci)
- [terraform-aws-data-storage](#terraform-aws-data-storage)
- [terraform-aws-ecs](#terraform-aws-ecs)
- [terraform-aws-eks](#terraform-aws-eks)
- [terraform-aws-lambda](#terraform-aws-lambda)
- [terraform-aws-load-balancer](#terraform-aws-load-balancer)
- [terraform-aws-messaging](#terraform-aws-messaging)
- [terraform-aws-monitoring](#terraform-aws-monitoring)
- [terraform-aws-openvpn](#terraform-aws-openvpn)
- [terraform-aws-sam](#terraform-aws-sam)
- [terraform-aws-security](#terraform-aws-security)
- [terraform-aws-server](#terraform-aws-server)
- [terraform-aws-utilities](#terraform-aws-utilities)
- [terraform-aws-vpc](#terraform-aws-vpc)
- [terraform-kubernetes-helm](#terraform-kubernetes-helm)


## terraform-aws-asg


### [v0.7.1](https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.7.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/20/2019 | Modules affected: server-group | <a href="https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.7.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fix bug where `var.enable_elastic_ips` was not properly used in the conditional logic to control Route 53 records in `modules/server-group`. This led to syntax errors when you had the right inputs to enable the resource.



</div>


### [v0.7.0](https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.7.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/11/2019 | Modules affected: server-group, asg-rolling-deploy | <a href="https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.7.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

**All the modules are now terraform 0.12.0 compatible**. Note that this means the modules are **no longer compatible with terraform 0.11 and under**. Starting this release, you must use terraform 0.12.0 or greater to use this module.



</div>



## terraform-aws-cache


### [v0.6.1](https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v0.6.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/24/2019 | Modules affected: redis | <a href="https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v0.6.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- `redis`


This release fixes a bug where the module errors on the output if you set both `replication_group_size` and `cluster_modes` input variables in the `redis` module.


- https://github.com/gruntwork-io/module-cache/pull/33

</div>


### [v0.6.0](https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v0.6.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/11/2019 | Modules affected: redis, memcached | <a href="https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v0.6.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- `redis` [**BACKWARDS INCOMPATIBLE**]
- `memcached` [**BACKWARDS INCOMPATIBLE**]


**All the modules are now terraform 0.12.0 compatible**. Note that this means the modules are **no longer compatible with terraform 0.11 and under**. Starting this release, you must use terraform 0.12.0 or greater to use this module.

All the module variables have been updated to use concrete types based on the new type system introduced in terraform 0.12.0. You can learn more about the types in [the official documentation](https://www.terraform.io/docs/configuration/types.html).

Note that as part of this, we switched to using `null` to indicate unset values when passing them through to resources. If you were previously using a 0 value (`&quot;&quot;` for strings and `0` for numbers), review the module `variables.tf` file to double check if the 0 value has been converted to a `null`.


- https://github.com/gruntwork-io/module-cache/pull/31

</div>



## terraform-aws-ci


### [v0.14.0](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.14.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/22/2019 | Modules affected: jenkins-server, iam-policies, ec2-backup | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.14.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

**All the modules are now terraform 0.12.0 compatible**. Note that this means the modules are **no longer compatible with terraform 0.11 and under**. Starting this release, you must use terraform 0.12.0 or greater to use this module.

All the module variables have been updated to use concrete types based on the new type system introduced in terraform 0.12.0. You can learn more about the types in [the official documentation](https://www.terraform.io/docs/configuration/types.html).

Note that as part of this, we switched to using `null` to indicate unset values when passing them through to resources. If you were previously using a 0 value (`&quot;&quot;` for strings and `0` for numbers), review the module `variables.tf` file to double check if the 0 value has been converted to a `null`.



</div>


### [v0.13.16](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.13.16)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/18/2019 | Modules affected: jenkins-server | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.13.16">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Add a variable for `aws_alb_target_group.health_check.matcher` to the `jenkins-server` module.



</div>


### [v0.13.15](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.13.15)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/4/2019 | Modules affected: install-jenkins, jenkins-server | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.13.15">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- Use latest jenkins version, because the package repo is throttling super old version
- Update CODEOWNERS
- Fix test summary and use different port
- jenkins-server: allow additional target group to be specified
- bug: fix duplicate description attribute in jenkins module



</div>



## terraform-aws-data-storage


### [v0.9.0](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.9.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/17/2019 | Modules affected: rds, lambda-share-snapshot, lambda-create-snapshot, lambda-copy-shared-snapshot | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.9.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

**All the modules are now terraform 0.12.0 compatible**. Note that this means the modules are **no longer compatible with terraform 0.11 and under**. Starting this release, you must use terraform 0.12.0 or greater to use this module.

All the module variables have been updated to use concrete types based on the new type system introduced in terraform 0.12.0. You can learn more about the types in [the official documentation](https://www.terraform.io/docs/configuration/types.html).

Note that as part of this, we switched to using `null` to indicate unset values when passing them through to resources. If you were previously using a 0 value (`&quot;&quot;` for strings and `0` for numbers), review the module `variables.tf` file to double check if the 0 value has been converted to a `null`.



</div>


### [v0.8.9](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.8.9)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/14/2019 | Modules affected: rds | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.8.9">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- When `allow_connections_from_cidr_blocks` is empty, do not create the `allow_connections_from_cidr_blocks` security rule.


</div>



## terraform-aws-ecs


### [v0.14.0](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.14.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/21/2019 | Modules affected: ecs-service, ecs-service-with-discovery, ecs-service-with-alb, ecs-fargate | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.14.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

**All the modules are now terraform 0.12.0 compatible**. Note that this means the modules are **no longer compatible with terraform 0.11 and under**. Starting this release, you must use terraform 0.12.0 or greater to use this module.

All the module variables have been updated to use concrete types based on the new type system introduced in terraform 0.12.0. You can learn more about the types in [the official documentation](https://www.terraform.io/docs/configuration/types.html).

Note that as part of this, we switched to using `null` to indicate unset values when passing them through to resources. If you were previously using a 0 value (`&quot;&quot;` for strings and `0` for numbers), review the module `variables.tf` file to double check if the 0 value has been converted to a `null`.



</div>


### [v0.13.5](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.13.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/13/2019 | Modules affected: ecs-cluster, ecs-service, ecs-service-with-discovery, ecs-service-with-alb | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.13.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

This release introduces the ability to extend the AWS principals that can assume the ECS task role. For each module that provisions an ECS task, there is a new variable `additional_task_assume_role_policy_principals` that allows you to extend the list of allowed principals.


</div>



## terraform-aws-eks


### [v0.5.5](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.5.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/20/2019 | Modules affected: eks-k8s-role-mapping | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.5.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fix bug where IAM to RBAC mapping did not work with capital letters in the entity name. This caused login issues because the script would naively use the IAM role / user name as the Kubernetes username, which were invalid when they contained upper case letters.
- Documentation updates and fixes.



</div>



## terraform-aws-lambda


### [v0.6.0](https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.6.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/14/2019 | Modules affected: scheduled-lambda-job, lambda, lambda-edge, keep-warm | <a href="https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.6.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

**All the modules are now terraform 0.12.0 compatible**. Note that this means the modules are **no longer compatible with terraform 0.11 and under**. Starting this release, you must use terraform 0.12.0 or greater to use this module.

All the module variables have been updated to use concrete types based on the new type system introduced in terraform 0.12.0. You can learn more about the types in [the official documentation](https://www.terraform.io/docs/configuration/types.html).

Note that as part of this, we switched to using `null` to indicate unset values when passing them through to resources. If you were previously using a 0 value (`&quot;&quot;` for strings and `0` for numbers), review the module `variables.tf` file to double check if the 0 value has been converted to a `null`.



</div>



## terraform-aws-load-balancer


### [v0.14.1](https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.14.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/20/2019 | Modules affected: nlb | <a href="https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.14.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
* `nlb`


Fixes a bug that arises when using terraform &gt;=0.12.2 with the `nlb` module. Specifically, the `access_logs` subblock requires a valid `bucket` and `prefix` to be specified if the block is included, regardless of `enabled` flag. This release fixes it so that you can still pass in a `null` or empty `bucket` and `prefix` even if the access logs are disabled.


* https://github.com/gruntwork-io/module-load-balancer/pull/60

</div>


### [v0.14.0](https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.14.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/11/2019 | Modules affected: alb, nlb, acm-tls-certificate | <a href="https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.14.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
* `alb` [**BACKWARDS INCOMPATIBLE**]
* `nlb` [**BACKWARDS INCOMPATIBLE**]
* `acm-tls-certificate` [**BACKWARDS INCOMPATIBLE**]


**All the modules are now terraform 0.12.0 compatible**. Note that this means the modules are **no longer compatible with terraform 0.11 and under**. Starting this release, you must use terraform 0.12.0 or greater to use this module.

All the module variables have been updated to use concrete types based on the new type system introduced in terraform 0.12.0. You can learn more about the types in [the official documentation](https://www.terraform.io/docs/configuration/types.html).

Note that as part of this, we switched to using `null` to indicate unset values when passing them through to resources. If you were previously using a 0 value (`&quot;&quot;` for strings and `0` for numbers), review the module `variables.tf` file to double check if the 0 value has been converted to a `null`.


* https://github.com/gruntwork-io/module-load-balancer/pull/58

</div>



## terraform-aws-messaging


### [v0.3.0](https://github.com/gruntwork-io/terraform-aws-messaging/releases/tag/v0.3.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/13/2019 | Modules affected: kinesis, sns, sqs | <a href="https://github.com/gruntwork-io/terraform-aws-messaging/releases/tag/v0.3.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
* `kinesis` **[BACKWARDS INCOMPATIBLE]**
* `sns` **[BACKWARDS INCOMPATIBLE]**
* `sqs` **[BACKWARDS INCOMPATIBLE]**


**All the modules are now terraform 0.12.0 compatible**. Note that this means the modules are **no longer compatible with terraform 0.11 and under**. Starting this release, you must use terraform 0.12.0 or greater to use this module.

All the module variables have been updated to use concrete types based on the new type system introduced in terraform 0.12.0. You can learn more about the types in [the official documentation](https://www.terraform.io/docs/configuration/types.html).

Note that as part of this, we switched to using `null` to indicate unset values when passing them through to resources. If you were previously using a 0 value (`&quot;&quot;` for strings and `0` for numbers), review the module `variables.tf` file to double check if the 0 value has been converted to a `null`.


* https://github.com/gruntwork-io/package-messaging/pull/22

</div>



## terraform-aws-monitoring


### [v0.13.2](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.13.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/27/2019 | Modules affected: cloudwatch-dashboard-metric-widget | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.13.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fix `type` constraint on the `metrics` variable of the `cloudwatch-dashboard-metric-widget` module to allow non-string types in the inner list, including map values.



</div>


### [v0.13.1](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.13.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/24/2019 | Modules affected: logs/cloudwatch-log-aggregation-scripts | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.13.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- This release verifies compatibility of various module scripts in the repo with Ubuntu 18.04. Prior to this version, all modules except for `logs/cloudwatch-log-aggregation-scripts` worked with Ubuntu 18.04. This release fixes the `logs/cloudwatch-log-aggregation-scripts` module to also be compatible with Ubuntu 18.04.



</div>


### [v0.13.0](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.13.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/21/2019 | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.13.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

**All the modules are now terraform 0.12.0 compatible**. Note that this means the modules are **no longer compatible with terraform 0.11 and under**. Starting this release, you must use terraform 0.12.0 or greater to use this module.

All the module variables have been updated to use concrete types based on the new type system introduced in terraform 0.12.0. You can learn more about the types in [the official documentation](https://www.terraform.io/docs/configuration/types.html).

Note that as part of this, we switched to using `null` to indicate unset values when passing them through to resources. If you were previously using a 0 value (`&quot;&quot;` for strings and `0` for numbers), review the module `variables.tf` file to double check if the 0 value has been converted to a `null`.



</div>


### [v0.12.7](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.12.7)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/20/2019 | Modules affected: alarms | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.12.7">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- #95: Fix default statistic for asg-memory-alarms



</div>


### [v0.12.6](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.12.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/11/2019 | Modules affected: alarms/sqs-alarms | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.12.6">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
* `alarms/sqs-alarms`


* Fix the `period` setting for the SQS alarm to use a minimum of 5 minutes rather than 1 minute, as SQS metrics are only collected once every 5 minutes, so trying to alert more often doesn&apos;t work.


Thanks to @bendavies for the PR!


* https://github.com/gruntwork-io/module-aws-monitoring/pull/92

</div>



## terraform-aws-openvpn


### [v0.9.2](https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.9.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/26/2019 | Modules affected: init-openvpn | <a href="https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.9.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Populate DNS server from proper location on Ubuntu 18.04. This should fix DNS resolution on client machines.


</div>


### [v0.9.1](https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.9.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/20/2019 | Modules affected: openvpn-server | <a href="https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.9.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fix bug where the IAM role for the openvpn server did not have a lifecycle config for `create_before_destroy`, leading to issues when trying to do a rolling update.



</div>


### [v0.9.0](https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.9.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/18/2019 | Modules affected: openvpn-server | <a href="https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.9.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

**All the modules are now terraform 0.12.0 compatible**. Note that this means the modules are **no longer compatible with terraform 0.11 and under**. Starting this release, you must use terraform 0.12.0 or greater to use this module.

All the module variables have been updated to use concrete types based on the new type system introduced in terraform 0.12.0. You can learn more about the types in [the official documentation](https://www.terraform.io/docs/configuration/types.html).

Note that as part of this, we switched to using `null` to indicate unset values when passing them through to resources. If you were previously using a 0 value (`&quot;&quot;` for strings and `0` for numbers), review the module `variables.tf` file to double check if the 0 value has been converted to a `null`.



</div>


### [v0.8.2](https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.8.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/18/2019 | Modules affected: openvpn-server | <a href="https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.8.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

This release introduces the ability to set an expiration lifecycle on the objects in the S3 backup bucket for the `openvpn-server` module. To enable expiration, set the `enable_backup_bucket_noncurrent_version_expiration` input variable to `true`. You can configure the days to expiration using the input variable `backup_bucket_noncurrent_version_expiration_days` (defaults to `30`).



</div>


### [v0.8.1](https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.8.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/17/2019 | Modules affected: install-openvpn | <a href="https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.8.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- `install-openvpn` has been updated to support ubuntu 18.04.



</div>



## terraform-aws-sam


### [v0.2.0](https://github.com/gruntwork-io/terraform-aws-sam/releases/tag/v0.2.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/25/2019 | Modules affected: gruntsam, api-gateway-account-settings | <a href="https://github.com/gruntwork-io/terraform-aws-sam/releases/tag/v0.2.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

**All the modules are now terraform 0.12.0 compatible**. Note that this means the modules are **no longer compatible with terraform 0.11 and under**. Starting this release, you must use terraform 0.12.0 or greater to use this module. For `gruntsam`, this means the generated code is only compatible with terraform 0.12.


All the module variables have been updated to use concrete types based on the new type system introduced in terraform 0.12.0. You can learn more about the types in [the official documentation](https://www.terraform.io/docs/configuration/types.html).

Note that as part of this, we switched to using `null` to indicate unset values when passing them through to resources. If you were previously using a 0 value (`&quot;&quot;` for strings and `0` for numbers), review the module `vars.tf` file to double check if the 0 value has been converted to a `null`.



</div>



## terraform-aws-security


### [v0.17.1](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.17.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/26/2019 | Modules affected: ssh-grunt | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.17.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fix a bug where the crontab configured by `ssh-grunt install` was missing the `--force-user-deletion` flag.


</div>


### [v0.17.0](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.17.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/24/2019 | Modules affected: ssm-healthchecks-iam-permissions, saml-iam-roles, os-hardening, kms-master-key | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.17.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

**All the modules are now terraform 0.12.0 compatible**. Note that this means the modules are **no longer compatible with terraform 0.11 and under**. Starting this release, you must use terraform 0.12.0 or greater to use this module.

All the module variables have been updated to use concrete types based on the new type system introduced in terraform 0.12.0. You can learn more about the types in [the official documentation](https://www.terraform.io/docs/configuration/types.html).

Note that as part of this, we switched to using `null` to indicate unset values when passing them through to resources. If you were previously using a 0 value (`&quot;&quot;` for strings and `0` for numbers), review the module `variables.tf` file to double check if the 0 value has been converted to a `null`.



</div>


### [v0.16.6](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.16.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/21/2019 | Modules affected: ssm-healthchecks-iam-permissions | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.16.6">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

This release introduces a new module `ssm-healthchecks-iam-permissions` which provides IAM policies that you can attach to instance profiles that grants the EC2 instance the requisite permissions to run SSM healthchecks, which are enabled by default on many base AWS AMIs such as Ubuntu.



</div>


### [v0.16.5](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.16.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/14/2019 | Modules affected: kms-master-key | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.16.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Allow cross account usage for CMK keys by granting the requisite IAM permissions to allow an external account to grant access to the KMS key to IAM entities within that account. You can use the new `cmk_external_user_iam_arns` input variable to specify which accounts should have this capability.


</div>



## terraform-aws-server


### [v0.7.0](https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.7.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/11/2019 | Modules affected: single-server | <a href="https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.7.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

**All the modules are now terraform 0.12.0 compatible**. Note that this means the modules are **no longer compatible with terraform 0.11 and under**. Starting this release, you must use terraform 0.12.0 or greater to use this module.

All the module variables have been updated to use concrete types based on the new type system introduced in terraform 0.12.0. You can learn more about the types in [the official documentation](https://www.terraform.io/docs/configuration/types.html).

Note that as part of this, we switched to using `null` to indicate unset values when passing them through to resources. If you were previously using a 0 value (`&quot;&quot;` for strings and `0` for numbers), review the module `variables.tf` file to double check if the 0 value has been converted to a `null`.




</div>


### [v0.6.2](https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.6.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/6/2019 | Modules affected: attach-eni | <a href="https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.6.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

The `attach-eni` script is now compatible with Ubuntu 18.04.



</div>



## terraform-aws-utilities


### [v0.1.1](https://github.com/gruntwork-io/terraform-aws-utilities/releases/tag/v0.1.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/13/2019 | <a href="https://github.com/gruntwork-io/terraform-aws-utilities/releases/tag/v0.1.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- `prepare-pex-environment`


This fixes a bug that was introduced in upgrading to terraform 0.12, where `prepare-pex-environment` always returned the python3 version of the pex.


- https://github.com/gruntwork-io/package-terraform-utilities/pull/18

</div>


### [v0.1.0](https://github.com/gruntwork-io/terraform-aws-utilities/releases/tag/v0.1.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/6/2019 | <a href="https://github.com/gruntwork-io/terraform-aws-utilities/releases/tag/v0.1.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- `intermediate-variable` [**REMOVED**]
- `list-remove` [**BREAKING**]
- `join-path` [**BREAKING**]
- `operating-system` [**BREAKING**]
- `prepare-pex-environment` [**BREAKING**]
- `require-executable` [**BREAKING**]
- `run-pex-as-data-source` [**BREAKING**]
- `run-pex-as-resource` [**BREAKING**]


**All the modules are now terraform 0.12.0 compatible**. Note that this means the modules are **no longer compatible with terraform 0.11 and under**. Starting this release, you must use terraform 0.12.0 or greater to use this module.

All the module variables have been updated to use concrete types based on the new type system introduced in terraform 0.12.0. You can learn more about the types in [the official documentation](https://www.terraform.io/docs/configuration/types.html).

Note that as part of this, we switched to using `null` to indicate unset values when passing them through to resources. If you were previously using a 0 value (`&quot;&quot;` for strings and `0` for numbers), review the module `variables.tf` file to double check if the 0 value has been converted to a `null`.

Additionally, we have deprecated and removed the `intermediate-variable` module in this release. This module has been superseded by [terraform local values](https://www.terraform.io/docs/configuration/locals.html). To upgrade, switch usage of `intermediate-variable` with `locals`.


- https://github.com/gruntwork-io/package-terraform-utilities/pull/17

</div>



## terraform-aws-vpc


### [v0.6.0](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.6.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/11/2019 | Modules affected: vpc-peering, vpc-peering-external, vpc-mgmt, vpc-mgmt-network-acls | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.6.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

**All the modules are now terraform 0.12.0 compatible**. Note that this means the modules are **no longer compatible with terraform 0.11 and under**. Starting this release, you must use terraform 0.12.0 or greater to use this module.

All the module variables have been updated to use concrete types based on the new type system introduced in terraform 0.12.0. You can learn more about the types in [the official documentation](https://www.terraform.io/docs/configuration/types.html).

Note that as part of this, we switched to using `null` to indicate unset values when passing them through to resources. If you were previously using a 0 value (`&quot;&quot;` for strings and `0` for numbers), review the module `variables.tf` file to double check if the 0 value has been converted to a `null`.




</div>


### [v0.5.8](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.5.8)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/7/2019 | Modules affected: vpc-mgmt, vpc-app | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.5.8">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- `var.custom_tags` now propagate to EIP resources created in the VPCs.


</div>



## terraform-kubernetes-helm


### [v0.5.0](https://github.com/gruntwork-io/terraform-kubernetes-helm/releases/tag/v0.5.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/11/2019 | Modules affected: k8s-tiller, k8s-tiller-tls-certs, k8s-service-account, k8s-namespace | <a href="https://github.com/gruntwork-io/terraform-kubernetes-helm/releases/tag/v0.5.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

**All the modules are now terraform 0.12.0 compatible**. Note that this means the modules are **no longer compatible with terraform 0.11 and under**. Starting this release, you must use terraform 0.12.0 or greater to use this module.

All the module variables have been updated to use concrete types based on the new type system introduced in terraform 0.12.0. You can learn more about the types in [the official documentation](https://www.terraform.io/docs/configuration/types.html).

Note that as part of this, we switched to using `null` to indicate unset values when passing them through to resources. If you were previously using a 0 value (`&quot;&quot;` for strings and `0` for numbers), review the module `variables.tf` file to double check if the 0 value has been converted to a `null`.

**Note:** there is one major interface change due to the upgrade. For the TLS modules, we no longer cannot pass through the subject info of the TLS cert as an inline block due to type issues. The main issue here is with the street_address attribute, which is of type `list(string)`. To support the types, the `street_address` must be provided as newline delimited `string`, which will be later converted to `list(string)`.




</div>

<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "releases",
  "hash": "1ba766a7b475b61671d571e57201838a"
}
##DOCS-SOURCER-END -->

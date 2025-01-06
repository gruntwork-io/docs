
# Gruntwork release 2019-11

<p style={{marginTop: "-25px"}}><small><a href="/guides">Guides</a> / <a href="/guides/stay-up-to-date">Update Guides</a> / <a href="/guides/stay-up-to-date/releases">Releases</a> / 2019-11</small></p>

This page is lists all the updates to the [Gruntwork Infrastructure as Code
Library](https://gruntwork.io/infrastructure-as-code-library/) that were released in 2019-11. For instructions
on how to use these updates in your code, check out the [updating
documentation](/library/stay-up-to-date/updating).

Here are the repos that were updated:

- [terraform-aws-cache](#terraform-aws-cache)
- [terraform-aws-cis-service-catalog](#terraform-aws-cis-service-catalog)
- [terraform-aws-data-storage](#terraform-aws-data-storage)
- [terraform-aws-ecs](#terraform-aws-ecs)
- [terraform-aws-eks](#terraform-aws-eks)
- [terraform-aws-lambda](#terraform-aws-lambda)
- [terraform-aws-load-balancer](#terraform-aws-load-balancer)
- [terraform-aws-vpc](#terraform-aws-vpc)


## terraform-aws-cache


### [v0.9.0](https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v0.9.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/27/2019 | Modules affected: redis | <a href="https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v0.9.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- `redis` **[BREAKING CHANGES]**


- Simplify permutations In the `redis` module. As the resource names change within the module, this is a backwards incompatible change.


This release is backwards incompatible and to update an existing Redis cluster, use `terraform state mv &lt;old_address&gt; &lt;new_address&gt;` to ensure that your cluster isn&apos;t deleted when you run `terraform apply`.

Depending on your configuration, your current resource name is one of
- `redis_with_snapshotting_without_auth_token_without_cluster_mode`
- `redis_with_snapshotting_without_auth_token_with_cluster_mode`
- `redis_with_snapshotting_with_auth_token_without_cluster_mode`
- `redis_with_snapshotting_with_auth_token_with_cluster_mode`
- `redis_without_snapshotting_without_auth_token_without_cluster_mode`
- `redis_without_snapshotting_without_auth_token_with_cluster_mode`
- `redis_without_snapshotting_with_auth_token_without_cluster_mode`
- `redis_without_snapshotting_with_auth_token_with_cluster_mode`

To find out which one it is, run `terraform state list`. 

For example, if your current resource name is `module.redis.aws_elasticache_replication_group.redis_without_snapshotting_without_auth_token_with_cluster_mode[0]`, you can migrate the resource by running: 

```bash
terraform state mv &quot;module.redis.aws_elasticache_replication_group.redis_without_snapshotting_without_auth_token_with_cluster_mode[0]&quot; module.redis.aws_elasticache_replication_group.redis
```
Note that you will have to use the quotes around the indexed resource to avoid `terraform` error `no matches found: module.redis....`


* Thanks to @brianbordini for the PR!


- #40 


</div>


### [v0.8.0](https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v0.8.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/7/2019 | Modules affected: redis, memcached | <a href="https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v0.8.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- In the `memcached` and `redis` modules, we removed the `bastion_host_security_group_id` variable and added an `allow_connections_from_security_groups` variable, so you can now pass in a list of security group IDs that can connect to your cache, rather than just one. 


</div>



## terraform-aws-cis-service-catalog


### [v0.0.3: Initial release of wrapper modules](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.0.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/21/2019 | Modules affected: iam-password-policy, cloudwatch-logs-metric-filters, saml-iam-roles, iam-groups | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.0.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

This is the initial release of wrapper modules for v1.2.0 of the AWS Foundations Benchmark. 



</div>



## terraform-aws-data-storage


### [v0.10.3](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.10.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/22/2019 | Modules affected: rds, lambda-create-snapshot, aurora | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.10.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- The `aurora` module now supports custom names for db subnets and security groups.
- Updated the README format as per the new design for the Service Catalog.
- Skip creating final snapshots in aurora tests and examples.
- Test improvements: Copy examples to separate directories for better isolation.




</div>



## terraform-aws-ecs


### [v0.16.2](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.16.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/22/2019 | Modules affected: ecs-service | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.16.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fixed a bug where ECS Auto Scaling was only working for &quot;scale out&quot; but not &quot;scale in.&quot;



</div>


### [v0.16.1](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.16.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/4/2019 | Modules affected: ecs-service | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.16.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fix bug where ECS service IAM role outputs were incorrectly conditional on `var.is_associated_with_elb`, ignoring the condition about `awsvpc` (which is accounted for in `local.need_ecs_iam_role_for_elb`)
- `ecs-service` now outputs `service_app_autoscaling_target_resource_id` which can be used for creating auto scaling policies.




</div>



## terraform-aws-eks


### [v0.10.0](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.10.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/22/2019 | Modules affected: eks-alb-ingress-controller | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.10.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- `eks-alb-ingress-controller` **[BACKWARDS INCOMPATIBLE]**


- `eks-alb-ingress-controller`:
  - Update Helm chart version: 0.1.6 -&gt; 0.1.11
  - Add support for setting Pod priorityClass
  - Add support for enabling and configuring livenessProbe
  - Add support for enabling and configuring readinessProbe
  - Rename `resource_name_prefix` to `eks_cluster_name`


`eks-alb-ingress-controller`:
- Rename `resource_name_prefix` to `eks_cluster_name`
- If you are currently setting `enable_aws_api_debug_logs`, update its value to `bool` instead of `string`


Special thanks to @alanbrent for the contribution!


- https://github.com/gruntwork-io/terraform-aws-eks/pull/87
- https://github.com/gruntwork-io/terraform-aws-eks/pull/88


</div>



## terraform-aws-lambda


### [v0.7.0](https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.7.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/12/2019 | Modules affected: lambda, lambda-edge | <a href="https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.7.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

This consolidates the lambda resources in `modules/lambda` and `modules/lambda-edge`, taking advantage of the TF12 features that allow it. This allows for better maintainability of the modules.



</div>



## terraform-aws-load-balancer


### [v0.16.0](https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.16.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/12/2019 | Modules affected: alb | <a href="https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.16.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
* `alb` [**BREAKING CHANGES**]


The two ALB resources used to switch on access logs have now been merged down to one resource. This improves maintainability of the module. As a result of this consolidation, the following feature drift has been resolved on the ALB resource for the no logs flavor:

- `idle_timeout` was only defined on alb with logs
- `additional_security_group_ids` was only being used on alb with logs


This renames the `aws_alb` resources as a part of consolidating the two versions down to one. As such, you will need to move the resources in the state file in order to avoid downtime.

NOTE: If you are using `terragrunt`, the `state mv` calls should be done using `terragrunt` instead of `terraform`.

If you had `var.enable_alb_access_logs = true`:
```
 export MODULE_ADDRESS=module.alb # This should be the address of the module block used to call `alb`
terraform state mv &quot;$MODULE_ADDRESS.aws_alb.alb_with_logs[0]&quot; &quot;$MODULE_ADDRESS.aws_alb.alb&quot;
```

Otherwise:
``` 
export MODULE_ADDRESS=module.alb # This should be the address of the module block used to call `alb`
terraform state mv &quot;$MODULE_ADDRESS.aws_alb.alb_without_logs[0]&quot; &quot;$MODULE_ADDRESS.aws_alb.alb&quot;
```


* https://github.com/gruntwork-io/module-load-balancer/pull/66

</div>



## terraform-aws-vpc


### [v0.7.7](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.7.7)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/28/2019 | Modules affected: vpc-mgmt, vpc-app | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.7.7">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- You can now filter which Availability Zones (AZs) are used by the `vpc-app` and `vpc-mgmt` modules using the new input variables `availability_zone_blacklisted_names`, `availability_zone_blacklisted_ids`, and `availability_zone_state`. 


</div>

<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "releases",
  "hash": "25ff034c5c740707508537111e380ad5"
}
##DOCS-SOURCER-END -->

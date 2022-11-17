
# Gruntwork release 2019-11

<p style={{marginTop: "-25px"}}><small><a href="/guides">Guides</a> / <a href="/guides/stay-up-to-date">Update Guides</a> / <a href="/guides/stay-up-to-date/releases">Releases</a> / 2019-11</small></p>

This page is lists all the updates to the [Gruntwork Infrastructure as Code 
Library](https://gruntwork.io/infrastructure-as-code-library/) that were released in 2019-11. For instructions 
on how to use these updates in your code, check out the [updating 
documentation](/guides/working-with-code/using-modules#updating).

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


- `redis` **[BREAKING CHANGES]**


- Simplify permutations In the `redis` module. As the resource names change within the module, this is a backwards incompatible change.


This release is backwards incompatible and to update an existing Redis cluster, use `terraform state mv <old_address> <new_address>` to ensure that your cluster isn't deleted when you run `terraform apply`.

Depending on your configuration, your current resource name is one of


### [v0.8.0](https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v0.8.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/7/2019 | Modules affected: redis, memcached | <a href="https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v0.8.0">Release notes</a></small>
</p>



- In the `memcached` and `redis` modules, we removed the `bastion_host_security_group_id` variable and added an `allow_connections_from_security_groups` variable, so you can now pass in a list of security group IDs that can connect to your cache, rather than just one. 




## terraform-aws-cis-service-catalog


### [v0.0.3: Initial release of wrapper modules](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.0.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/21/2019 | Modules affected: iam-password-policy, cloudwatch-logs-metric-filters, saml-iam-roles, iam-groups | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.0.3">Release notes</a></small>
</p>



This is the initial release of wrapper modules for v1.2.0 of the AWS Foundations Benchmark. 





## terraform-aws-data-storage


### [v0.10.3](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.10.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/22/2019 | Modules affected: rds, lambda-create-snapshot, aurora | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.10.3">Release notes</a></small>
</p>



- The `aurora` module now supports custom names for db subnets and security groups.
- Updated the README format as per the new design for the Service Catalog.
- Skip creating final snapshots in aurora tests and examples.
- Test improvements: Copy examples to separate directories for better isolation.






## terraform-aws-ecs


### [v0.16.2](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.16.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/22/2019 | Modules affected: ecs-service | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.16.2">Release notes</a></small>
</p>



- Fixed a bug where ECS Auto Scaling was only working for "scale out" but not "scale in."




### [v0.16.1](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.16.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/4/2019 | Modules affected: ecs-service | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.16.1">Release notes</a></small>
</p>



- Fix bug where ECS service IAM role outputs were incorrectly conditional on `var.is_associated_with_elb`, ignoring the condition about `awsvpc` (which is accounted for in `local.need_ecs_iam_role_for_elb`)
- `ecs-service` now outputs `service_app_autoscaling_target_resource_id` which can be used for creating auto scaling policies.






## terraform-aws-eks


### [v0.10.0](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.10.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/22/2019 | Modules affected: eks-alb-ingress-controller | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.10.0">Release notes</a></small>
</p>


- `eks-alb-ingress-controller` **[BACKWARDS INCOMPATIBLE]**


- `eks-alb-ingress-controller`:
  - Update Helm chart version: 0.1.6 -> 0.1.11
  - Add support for setting Pod priorityClass
  - Add support for enabling and configuring livenessProbe
  - Add support for enabling and configuring readinessProbe
  - Rename `resource_name_prefix` to `eks_cluster_name`



## terraform-aws-lambda


### [v0.7.0](https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.7.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/12/2019 | Modules affected: lambda, lambda-edge | <a href="https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.7.0">Release notes</a></small>
</p>



This consolidates the lambda resources in `modules/lambda` and `modules/lambda-edge`, taking advantage of the TF12 features that allow it. This allows for better maintainability of the modules.





## terraform-aws-load-balancer


### [v0.16.0](https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.16.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/12/2019 | Modules affected: alb | <a href="https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.16.0">Release notes</a></small>
</p>


* `alb` [**BREAKING CHANGES**]


The two ALB resources used to switch on access logs have now been merged down to one resource. This improves maintainability of the module. As a result of this consolidation, the following feature drift has been resolved on the ALB resource for the no logs flavor:

- `idle_timeout` was only defined on alb with logs
- `additional_security_group_ids` was only being used on alb with logs





## terraform-aws-vpc


### [v0.7.7](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.7.7)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/28/2019 | Modules affected: vpc-mgmt, vpc-app | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.7.7">Release notes</a></small>
</p>



- You can now filter which Availability Zones (AZs) are used by the `vpc-app` and `vpc-mgmt` modules using the new input variables `availability_zone_blacklisted_names`, `availability_zone_blacklisted_ids`, and `availability_zone_state`. 





<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "releases",
  "hash": "90216dc0174b844241f01204606fe6b8"
}
##DOCS-SOURCER-END -->

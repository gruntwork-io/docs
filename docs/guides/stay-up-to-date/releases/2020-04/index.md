
# Gruntwork release 2020-04

<p style={{marginTop: "-25px"}}><small><a href="/guides">Guides</a> / <a href="/guides/stay-up-to-date">Update Guides</a> / <a href="/guides/stay-up-to-date/releases">Releases</a> / 2020-04</small></p>

This page is lists all the updates to the [Gruntwork Infrastructure as Code 
Library](https://gruntwork.io/infrastructure-as-code-library/) that were released in 2020-04. For instructions 
on how to use these updates in your code, check out the [updating 
documentation](/guides/working-with-code/using-modules#updating).

Here are the repos that were updated:

- [terraform-aws-ci](#terraform-aws-ci)
- [terraform-aws-ecs](#terraform-aws-ecs)
- [terraform-aws-eks](#terraform-aws-eks)
- [terraform-aws-lambda](#terraform-aws-lambda)
- [terraform-aws-load-balancer](#terraform-aws-load-balancer)
- [terraform-aws-messaging](#terraform-aws-messaging)
- [terraform-aws-monitoring](#terraform-aws-monitoring)
- [terraform-aws-openvpn](#terraform-aws-openvpn)
- [terraform-aws-security](#terraform-aws-security)
- [terraform-aws-server](#terraform-aws-server)
- [terraform-aws-static-assets](#terraform-aws-static-assets)
- [terraform-aws-utilities](#terraform-aws-utilities)
- [terraform-aws-vpc](#terraform-aws-vpc)


## terraform-aws-ci


### [v0.18.6](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.18.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/17/2020 | Modules affected: ecs-deploy-runner, infrastructure-deploy-script | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.18.6">Release notes</a></small>
</p>



- `Dockerfile` for `infrastructure-deploy-script` now includes bitbucket.org in `known_hosts` list.
- Fix bug where `v0.18.5` was incompatible with previous versions of `infrastructure-deployer`.




### [v0.18.5](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.18.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/8/2020 | Modules affected: infrastructure-deployer, infrastructure-deploy-script, ecs-deploy-runner | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.18.5">Release notes</a></small>
</p>



The ECS Deploy Runner stack now supports passing in a limited selection of command arguments to the underlying terraform/terragrunt commands.




## terraform-aws-ecs


### [v0.19.0](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.19.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/10/2020 | Modules affected: ecs-service | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.19.0">Release notes</a></small>
</p>



This release adds support for specifying multiple target groups with the ECS service, allowing you to link multiple ALBs and NLBs with your service. See the new [docker-service-with-alb-and-nlb](https://github.com/gruntwork-io/module-ecs/tree/master/examples/docker-service-with-alb-and-nlb) example for an example of how to associate multiple ALB/NLBs with the service.

**Note that this is a backwards incompatible change. Review the migration guide below for how to migrate to this version without downtime.**




## terraform-aws-eks


### [v0.19.6](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.19.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/11/2020 | Modules affected: eks-cluster-managed-workers | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.19.6">Release notes</a></small>
</p>


You can now disable module calls to `eks-cluster-managed-workers` by setting `create_resources = false`. This allows you to implement conditional logic to turn on or off a module block in your terraform module.




### [v0.19.5](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.19.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/10/2020 | Modules affected: eks-k8s-cluster-autoscaler | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.19.5">Release notes</a></small>
</p>



You can now specify the docker repository to use for sourcing the cluster-autoscaler. Recent versions of the cluster-autoscaler is now region sensitive and you must pull from the corresponding repository.

EU: eu.gcr.io/k8s-artifacts-prod/autoscaling/cluster-autoscaler
US: us.gcr.io/k8s-artifacts-prod/autoscaling/cluster-autoscaler
APAC: asia.gcr.io/k8s-artifacts-prod/autoscaling/cluster-autoscaler

NOTE: This release will cause a redeploy of the `cluster-autoscaler`, but since it is a stateless application, there is no risk of loss of data or functionality during the transition.



### [v0.19.4](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.19.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/10/2020 | Modules affected: eks-cluster-workers | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.19.4">Release notes</a></small>
</p>



Fix `eks-cluster-workers` to use properly use `var.custom_tags_security_group` to allow custom tags for SG.




### [v0.19.3](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.19.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/8/2020 | Modules affected: eks-cluster-control-plane | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.19.3">Release notes</a></small>
</p>



When upgrading from Kubernetes version 1.13 to 1.15, the `coredns` containers get updated to the latest version. In the newer versions of `coredns`, the configuration has a backwards incompatible change that was previously unhandled in the upgrade scripts. This release fixes that issue such that it will reformat the configuration to match expectations of later `coredns` versions.




### [v0.19.2](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.19.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/6/2020 | Modules affected: eks-k8s-cluster-autoscaler-iam-policy | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.19.2">Release notes</a></small>
</p>



The outputs for `eks-k8s-cluster-autoscaler-iam-policy` are now computed in a manner that is more robust to loss of credentials during an `apply`.





## terraform-aws-lambda


### [v0.7.7](https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.7.7)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/29/2020 | Modules affected: lambda, lambda-edge | <a href="https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.7.7">Release notes</a></small>
</p>



Both `lambda` and `lambda-edge` now support setting `reserved_concurrent_executions` on the underlying Lambda function.



### [v0.7.6](https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.7.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/27/2020 | Modules affected: scheduled-lambda-job, lambda, lambda-edge | <a href="https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.7.6">Release notes</a></small>
</p>



- The `lambda-edge` module will now apply tags passed to it via the `tags` input variable to its IAM role.
- The `lambda` module will now apply tags passed to it via the `tags` input variable to its IAM role and Security Group.
- The `scheduled-lambda-job` module now exposes a new `tags` input variable which can be used to apply tags to the CloudWatch Event Rule it creates. This module now also outputs the Event Rule ARN and schedule via the output variables `event_rule_arn` and `event_rule_schedule`, respectively.




## terraform-aws-load-balancer


### [v0.20.0](https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.20.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/20/2020 | Modules affected: acm-tls-certificate | <a href="https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.20.0">Release notes</a></small>
</p>


This release introduces improvements to the module, including the ability to look up Route53 public zones by name when a hosted_zone_id is not supplied. 

This release also introduces 3 new optional variables to assist with keeping your config dry: 

- `global_tags` - tags that will be applied to all certificates 
- `default_verify_certificate` - set to true to verify all your certificates 
- `default_create_verification_record` - set to true to create the necessary DNS records for certificate verification

See [the vars.tf file](https://github.com/gruntwork-io/module-load-balancer/blob/2a2387a76e8094991d435972825e4585967a21b8/modules/acm-tls-certificate/vars.tf) for more information


### [v0.19.1](https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.19.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/2/2020 | Modules affected: alb | <a href="https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.19.1">Release notes</a></small>
</p>



Add support for the new `drop_invalid_header_fields` option in the `aws_lb` resource.




## terraform-aws-messaging


### [v0.3.2](https://github.com/gruntwork-io/terraform-aws-messaging/releases/tag/v0.3.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/9/2020 | Modules affected: sns | <a href="https://github.com/gruntwork-io/terraform-aws-messaging/releases/tag/v0.3.2">Release notes</a></small>
</p>



You can now add tags to the SNS topic created by the `sns` module.





## terraform-aws-monitoring


### [v0.20.0](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.20.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/28/2020 | Modules affected: metrics/cloudwatch-dashboard | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.20.0">Release notes</a></small>
</p>



The `cloudwatch-dashboard` module now supports managing multiple dashboards in one module.



### [v0.19.4](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.19.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/24/2020 | Modules affected: alarms | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.19.4">Release notes</a></small>
</p>



- Added datapoints_to_alarm variable to ecs-service-alarms module:  Addresses the module 'ecs-service-alarms' didn't pass through customizations to the variable 'datapoints_to_alarm'.




### [v0.19.3](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.19.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/16/2020 | Modules affected: alarms | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.19.3">Release notes</a></small>
</p>



In the `sns-to-slack` module, resources can now be optionally created using the `create_resources` boolean variable. Set the variable to false to have the module create no resources. This weird parameter exists solely because Terraform does not support conditional modules. Therefore, this is a hack to allow you to conditionally decide if the Lambda function and other resources should be created or not.




### [v0.19.2](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.19.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/9/2020 | Modules affected: alarms | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.19.2">Release notes</a></small>
</p>



- Fix a bug in the `alb-alarms` module where for "low" thresholds (e.g., low request count) it was using `GreaterThanThreshold` instead of `LessThanThreshold`.



### [v0.19.1](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.19.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/2/2020 | Modules affected: alarms | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.19.1">Release notes</a></small>
</p>



- Fix a bug in the `rds_disk_space_available` alarm where it would be enabled, incorrectly, for Aurora instances.




## terraform-aws-openvpn


### [v0.9.12](https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.9.12)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/3/2020 | Modules affected: openvpn-server | <a href="https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.9.12">Release notes</a></small>
</p>



This release fixes a bug in which if the Elastic IP associated with the OpenVPN Server was deleted, Terraform would throw an invalid index error.

Thanks to @syndbg for the contribution!





## terraform-aws-security


### [v0.28.7](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.28.7)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/28/2020 | Modules affected: ssh-grunt, kms-master-key, kms-master-key-multi-region, guardduty-multi-region | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.28.7">Release notes</a></small>
</p>



- `ssh-grunt` sync every 5 minutes by default rather than every 30 minutes.

- The `cloudtrail` and `kms-master-key` modules now accept a `dependencies` variable. This can be used to create a dependency between this module and resources created outside of this module.  For example, you might need to create a dependency between the `cloudtrail` module and an IAM user created using the `iam-user` module because you want to name the user in the KMS key policy. 

```
dependencies = values(module.iam_users.user_arns)
```



### [v0.28.6](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.28.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/16/2020 | Modules affected: ssh-grunt | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.28.6">Release notes</a></small>
</p>



The behavior of `ssh-grunt` has changed with regards to its handling of duplicate users. Previously, if multiple IAM users resulted in the same clean OS username (e.g. `ben` and `ben@gruntwork.io` both result in `ben` for the OS username), `ssh-grunt` would exit with an error. This had the unfortunate side effect of requiring the administrator to log in as the default user to diagnose the issue.

The behavior has changed such that processing will now continue for all other IAM users. If a duplicate occurs, neither wins (in the example above, neither `ben` nor `ben@gruntwork.io` would win), but any additional users will still sync.




### [v0.28.5](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.28.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/14/2020 | Modules affected: kms-master-key | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.28.5">Release notes</a></small>
</p>



- Fix dynamic statement creation in `kms-master-key` so that the optional released in v0.28.3 work properly.



### [v0.28.4](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.28.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/9/2020 | Modules affected: kms-master-key, kms-master-key-multi-region, account-baseline-security, account-baseline-app | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.28.4">Release notes</a></small>
</p>



- You can now grant Service Principals (e.g., "s3.amazonaws.com") access to your KMS CMKs by setting the `cmk_service_principals` parameter and specifying the actions those Service Principals will be allowed to do via a new `service_principal_actions` input variable.



### [v0.28.3](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.28.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/7/2020 | Modules affected: kms-master-key | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.28.3">Release notes</a></small>
</p>



- All the parameters passed to the `customer_master_keys` variable of the `kms-master-key` module are now optional instead of required. The module will now only add IAM policy statements for the parameters that are actually set.



### [v0.28.2 ](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.28.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/3/2020 | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.28.2">Release notes</a></small>
</p>



This fixes our automation process so that binaries will be attached to releases.




### [v0.28.1](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.28.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/3/2020 | Modules affected: aws-config, cloudtrail | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.28.1">Release notes</a></small>
</p>



Since AWS provider 2.0, setting `num_days_after_which_delete_log_data = 0` no longer works and leads to a provider schema error. This meant that there was no way to configure S3 buckets to never delete data. Starting with this release, you can now prevent deletion of data in S3 for `aws-config` and `cloudtrail` by setting the respective variables to `null`.




### [v0.28.0](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.28.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/1/2020 | Modules affected: iam-policies, iam-groups, account-baseline-security, account-baseline-root | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.28.0">Release notes</a></small>
</p>



- Account baseline modules now support managing KMS Customer Master Keys.
- You can now specify multiple IAM roles for managing cross account access IAM groups.




## terraform-aws-server


### [v0.8.2](https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.8.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/9/2020 | Modules affected: single-server | <a href="https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.8.2">Release notes</a></small>
</p>



- The `single-server` module now applies the tags passed in via the `tags` input variable to the EIP and IAM Role resources it creates.




## terraform-aws-static-assets


### [v0.6.3](https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.6.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/13/2020 | Modules affected: s3-cloudfront | <a href="https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.6.3">Release notes</a></small>
</p>



- You can now control the suffix appended to the access logs S3 bucket using the new optional input variable `access_logs_bucket_suffix`.




## terraform-aws-utilities


### [v0.1.7](https://github.com/gruntwork-io/terraform-aws-utilities/releases/tag/v0.1.7)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/30/2020 | Modules affected: operating-system | <a href="https://github.com/gruntwork-io/terraform-aws-utilities/releases/tag/v0.1.7">Release notes</a></small>
</p>



- Fully rely  on Python to determine the path separator. This is an internal refactor to make the code cleaner and safer and should have no impact on external behavior.





## terraform-aws-vpc


### [v0.8.6](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.8.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/8/2020 | Modules affected: vpc-interface-endpoint | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.8.6">Release notes</a></small>
</p>


- `vpc-interface-endpoint`


This new module allows to create a VPC Interface Endpoint to connect services within your VPC without needing to create NAT Gateways neither private gateway. Previously, only VPC Gateway Endpoints (S3 and DynamoDB) were permitted.


- https://github.com/gruntwork-io/module-vpc/pull/97






<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "releases",
  "hash": "eb44c8a7e7be2c5773796b1e71af558a"
}
##DOCS-SOURCER-END -->

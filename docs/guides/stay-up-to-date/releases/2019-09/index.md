
# Gruntwork release 2019-09

<p style={{marginTop: "-25px"}}><small><a href="/guides">Guides</a> / <a href="/guides/stay-up-to-date">Update Guides</a> / <a href="/guides/stay-up-to-date/releases">Releases</a> / 2019-09</small></p>

This page is lists all the updates to the [Gruntwork Infrastructure as Code
Library](https://gruntwork.io/infrastructure-as-code-library/) that were released in 2019-09. For instructions
on how to use these updates in your code, check out the [updating
documentation](/library/stay-up-to-date/updating).

Here are the repos that were updated:

- [gruntwork](#gruntwork)
- [terraform-aws-cis-service-catalog](#terraform-aws-cis-service-catalog)
- [terraform-aws-data-storage](#terraform-aws-data-storage)
- [terraform-aws-ecs](#terraform-aws-ecs)
- [terraform-aws-eks](#terraform-aws-eks)
- [terraform-aws-load-balancer](#terraform-aws-load-balancer)
- [terraform-aws-monitoring](#terraform-aws-monitoring)
- [terraform-aws-openvpn](#terraform-aws-openvpn)
- [terraform-aws-security](#terraform-aws-security)
- [terraform-aws-static-assets](#terraform-aws-static-assets)
- [terraform-aws-utilities](#terraform-aws-utilities)
- [terraform-aws-vpc](#terraform-aws-vpc)


## gruntwork


### [v0.1.1](https://github.com/gruntwork-io/gruntwork/releases/tag/v0.1.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/24/2019 | <a href="https://github.com/gruntwork-io/gruntwork/releases/tag/v0.1.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/gruntwork/pull/54: Update list of GitHub IDs.

</div>



## terraform-aws-cis-service-catalog


### [Adds the cloudwatch-logs-metric-filters wrapper module](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.0.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/25/2019 | Modules affected: cloudwatch-logs-metric-filters | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.0.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- This release adds a wrapper module for the [`cloudwatch-logs-metric-filters&apos; module](https://github.com/gruntwork-io/module-aws-monitoring/blob/master/modules/logs/cloudwatch-logs-metric-filters/README.md). The wrapper creates metric filters as required by the CIS Foundations Benchmark.



</div>


### [v0.0.1](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.0.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/13/2019 | Modules affected: generate-aws-config | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.0.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

This release ships the tool [`generate-aws-config`](https://github.com/gruntwork-io/cis-compliance-aws/tree/master/modules/generate-aws-config) which can be used to generate a Terraform module that will provision and configure [AWS Config](https://aws.amazon.com/config/) on all enabled regions for the account.



</div>



## terraform-aws-data-storage


### [v0.10.0](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.10.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/16/2019 | Modules affected: rds | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.10.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- The `rds` module now supports storage auto scaling by allowing you to set a new optional input variable called `max_allocated_storage`. To make this work, we have also changed the default storage type from `standard` (i.e., magnetic) to `gp2` (i.e., SSD). This is a **backwards incompatible** change; if you were using magnetic storage and wish to keep using it, you can override the default storage type by using the `storage_type` input variable.


</div>


### [v0.9.3](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.9.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/12/2019 | Modules affected: aurora | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.9.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Add support for Aurora Global Clusters and include an example.


</div>


### [v0.9.2](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.9.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/11/2019 | Modules affected: aurora | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.9.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Added the `cluster_resource_id` output to the Aurora module.
- Fix for Broken Nightly Builds.



</div>



## terraform-aws-ecs


### [v0.14.4](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.14.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/22/2019 | Modules affected: ecs-deploy | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.14.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fix a bug in the `run-ecs-task` script where it was not forcing the `aws` CLI output to be JSON, so the script would fail if a user had overridden the default on their systems to have text output. 



</div>


### [v0.14.3](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.14.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/18/2019 | Modules affected: ecs-service-with-alb | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.14.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Switch the `ecs-service-with-alb` module from using `template_file` data sources to `local` variables for intermediate variables. This fixes an issue where `terraform plan` was incorrectly reporting ECS services being recreated.




</div>


### [v0.14.2](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.14.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/9/2019 | Modules affected: ecs-fargate | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.14.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- The `ecs-fargate` module has been updated to only enable ecs deployment check when desired tasks &gt; 0. This allows you to set `desired_tasks` to 0 to scale down your service.
- The `ecs-fargate` module has been updated to add task definition ARN as an output, under the name `aws_ecs_task_definition_arn`.


</div>



## terraform-aws-eks


### [v0.8.2](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.8.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/20/2019 | Modules affected: eks-cluster-control-plane | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.8.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fix a bug in the `upgrade_cluster` script used in the `eks-cluster-control-plane` module where the script incorrectly redeployed the plugins when using a region other than `us-west-2`, even though the versions were already up to date.



</div>


### [v0.8.1](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.8.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/17/2019 | Modules affected: eks-cloudwatch-container-logs, eks-cluster-control-plane | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.8.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Docs improvements.
- Improves module stability. Specifically, IAM resources now have a 30 second wait to avoid propagation errors.



</div>


### [v0.8.0](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.8.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/17/2019 | Modules affected: eks-iam-role-assume-role-policy-for-service-account, eks-cluster-workers, eks-cluster-control-plane | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.8.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

`eks-cluster-control-plane` now sets up the [IAM Roles for Service Accounts](https://aws.amazon.com/blogs/opensource/introducing-fine-grained-iam-roles-service-accounts/) feature by provisioning an OpenID Connect Provider that can be used by EKS to exchange Kubernetes Service Account Tokens for IAM credentials. As a part of this, we also released the [eks-iam-role-assume-role-policy-for-service-account module](https://github.com/gruntwork-io/terraform-aws-eks/tree/master/modules/eks-iam-role-assume-role-policy-for-service-account), which can be used to construct the IAM policy to allow Service Accounts to assume the IAM Role. Refer to [the updated README](https://github.com/gruntwork-io/terraform-aws-eks/tree/master/modules/eks-cluster-control-plane#how-do-i-associate-iam-roles-to-the-pods) for more information.



</div>


### [v0.7.1](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.7.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/17/2019 | Modules affected: eks-cluster-control-plane | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.7.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- The cluster upgrade script that runs to update the Kubernetes plugins installed in the EKS cluster now only updates the components when the versions mismatch.
- The cluster upgrade script can now be turned off by setting the `use_upgrade_cluster_script` input variable to `false`.



</div>


### [v0.7.0](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.7.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/11/2019 | Modules affected: eks-cluster-control-plane | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.7.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

`eks-cluster-control-plane` module now supports upgrading Kubernetes components to the expected version for the Kubernetes version deployed on EKS. This is handled using a python script that is run everytime the kubernetes version is updated on the cluster. The deployed versions of each component follows what is described in [the official upgrade guide](https://docs.aws.amazon.com/eks/latest/userguide/update-cluster.html)

Additionally, this release includes a few code formatting and example updates that do not affect the underlying modules.


</div>



## terraform-aws-load-balancer


### [v0.15.0](https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.15.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/20/2019 | Modules affected: nlb | <a href="https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.15.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
* `nlb` [**REMOVED**]


* The `nlb` module has been deprecated and removed. When https://github.com/gruntwork-io/module-load-balancer/issues/61 was fixed, the `nlb` module reduced to being a thin wrapper over the `aws_lb` resource and thus it no longer made sense to maintain the module. Instead, users of the module should update to using the `aws_lb` resource directly.


Refer to the provided [migration guide](https://github.com/gruntwork-io/module-load-balancer/tree/v0.15.0/_docs/migration_guides/nlb_to_0.15.0) for information on how to replace your usage of the `nlb` module with the `aws_lb` resource, including migrating the state to avoid downtime.


* https://github.com/gruntwork-io/module-load-balancer/pull/65

</div>


### [v0.14.2](https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.14.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/10/2019 | Modules affected: alb | <a href="https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.14.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
* `alb`


* Update how the `alb` module calculates the ALB ARN to use `locals` instead of a `template_file`. The `template_file` seemed to interfere with how Terraform calculated the `plan`, so if were upgrading from Terraform 0.11, this lead to a `plan` output that incorrectly reported that your listeners would be recreated (which could lead to downtime). With this new version, the listeners should be modified in place, without any downtime.


* https://github.com/gruntwork-io/module-load-balancer/pull/64

</div>



## terraform-aws-monitoring


### [Bump Terraform dependency to 0.12.6 for cloudwatch-logs-metrics-filters](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.14.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/25/2019 | Modules affected: cloudwatch-logs-metric-filters | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.14.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- The `cloudwatch-logs-metric-filters` module uses syntax that wasn&apos;t available prior to Terraform version `0.12.6`. This version is now required by the module.



</div>


### [Add cloudwatch-logs-metric-filters module](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.13.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/24/2019 | Modules affected: logs/cloudwatch-logs-metric-filters, examples/cloudwatch-to-slack | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.13.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- This release adds the `cloudwatch-logs-metric-filters` module. The module accepts a map of filter objects and creates a metric filter with associated metric alarm. Use this module to monitor a CloudWatch Logs group for a particular pattern and be notified via SNS when the pattern is matched.
- The update also bumps the sns-to-slack example to use an ubuntu18 server



</div>



## terraform-aws-openvpn


### [v0.9.6](https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.9.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/20/2019 | Modules affected: install-openvpn | <a href="https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.9.6">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fix bug where the `install-openvpn` script was ignoring all command-line args passed to it!
- Add [documentation on how to connect to multiple VPN servers at the same time](https://github.com/gruntwork-io/package-openvpn#connecting-to-multiple-vpns).


</div>


### [v0.9.5](https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.9.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/3/2019 | Modules affected: install-openvpn | <a href="https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.9.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fix a bug where command-line arguments were not being passed to the `install-openvpn` script.


</div>



## terraform-aws-security


### [v0.19.2: Fix perpetual diff problem in cloudtrail module](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.19.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/26/2019 | Modules affected: cloudtrail | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.19.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- We recently [added CloudWatch Logs support](https://github.com/gruntwork-io/module-security/releases/tag/v0.18.4) to this module. A regression was introduced that causes a perpetual diff on the cloudtrail resource. This release fixes the perpetual diff.



</div>


### [v0.19.1](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.19.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/19/2019 | Modules affected: iam-policies | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.19.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Add state machine permissions to `read_only` policy in `iam-policies` module.


</div>


### [v0.19.0: Updates to aws-config, iam-groups modules](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.19.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/13/2019 | Modules affected: aws-config, iam-groups | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.19.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- A new variable, `sns_topic_already_exists`, is now required for the `aws-config` module. This addresses an issue with using `sns_topic_arn`. If the SNS topic was created in Terraform and the ARN was passed in via interpolation, the module would crash because Terraform can&apos;t resolve the count at plan time. We work around this limitation by instead using a boolean value which can be hard coded to `true` or `false` and thus does not hit this limitation.
- Updated the IAM role in `aws-config` to account for a policy change made by AWS.
- Updated the `iam-admin` group test to use a unique name to avoid conflicts


</div>


### [v0.18.6: Updates to IAM, Cloudtrail modules](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.18.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/10/2019 | Modules affected: iam-policies, iam-groups, custom-iam-group, cloudtrail | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.18.6">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  


- Added some new policies to the `iam-policies` module: an &quot;IAM admin&quot; policy that permits `iam:*` (with MFA) but nothing else, and a new &quot;require MFA&quot; policy. It denies access to all actions except MFA self-management unless an MFA device is already enabled. You can attach this policy to users, groups, or roles alongside other policies that do not have an MFA condition of their own to ensure that an MFA device is be required for any of the combined actions to be allowed. For example, the AWS managed policies do not have an MFA condition, but if you attach this alongside them, MFA will be required.
- Updated `iam-groups` to optionally create an `iam-admin` group that uses the policy mentioned above, and also optionally a `support` group with access to interact with AWS support (and nothing else).
- Added new `custom-iam-group` module. This module can create a new IAM group and attach a set of policies by ARN or name. It can also ensure that the entire group requires MFA by attaching the &quot;require MFA&quot; policy mentioned above.
- Updated the `cloudtrail` module to optionally have separate names for the CloudWatch Logs Group and IAM role. Previously, the name of the role was based on the log group name.



</div>



## terraform-aws-static-assets


### [v0.5.4](https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.5.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/17/2019 | Modules affected: s3-cloudfront | <a href="https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.5.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- The `s3-cloudfront` module now supports specifying multiple origin groups, which allows you to specify one or more S3 buckets to use as failovers in case the primary one fails. You can specify the failover buckets using the new input variables `failover_buckets` and `failover_bucket_website_endpoints`. 


</div>



## terraform-aws-utilities


### [v0.1.3](https://github.com/gruntwork-io/terraform-aws-utilities/releases/tag/v0.1.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/16/2019 | <a href="https://github.com/gruntwork-io/terraform-aws-utilities/releases/tag/v0.1.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- `run-pex-as-resource`
- `run-pex-as-data-source`


The `run-pex-as-resource` and `run-pex-as-data-source` modules now exposes a variable (`enabled`) that can be used to conditionally decide whether or not to execute the pex resource. This is helpful when you want to support disabling script execution in your modules.


- https://github.com/gruntwork-io/package-terraform-utilities/pull/20

</div>


### [v0.1.2](https://github.com/gruntwork-io/terraform-aws-utilities/releases/tag/v0.1.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/10/2019 | <a href="https://github.com/gruntwork-io/terraform-aws-utilities/releases/tag/v0.1.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- `run-pex-as-resource`


The `run-pex-as-resource` module now exposes the `null_resource` triggers and the execution environment variable settings so that you can override them.


- https://github.com/gruntwork-io/package-terraform-utilities/pull/19

</div>



## terraform-aws-vpc


### [v0.7.4](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.7.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/11/2019 | Modules affected: vpc-mgmt | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.7.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- The `vpc-mgmt` module now adds a `Name` tag to its NAT Gateway(s) and allows you to specify custom tags via the optional `nat_gateway_custom_tags` input variable.



</div>

<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "releases",
  "hash": "6aa8e201037ec812f20bfe8a8b603087"
}
##DOCS-SOURCER-END -->

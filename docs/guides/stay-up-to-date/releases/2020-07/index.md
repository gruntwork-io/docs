
# Gruntwork release 2020-07

<p style={{marginTop: "-25px"}}><small><a href="/guides">Guides</a> / <a href="/guides/stay-up-to-date">Update Guides</a> / <a href="/guides/stay-up-to-date/releases">Releases</a> / 2020-07</small></p>

This page is lists all the updates to the [Gruntwork Infrastructure as Code
Library](https://gruntwork.io/infrastructure-as-code-library/) that were released in 2020-07. For instructions
on how to use these updates in your code, check out the [updating
documentation](/library/stay-up-to-date/updating).

Here are the repos that were updated:

- [gruntwork](#gruntwork)
- [terraform-aws-asg](#terraform-aws-asg)
- [terraform-aws-ci](#terraform-aws-ci)
- [terraform-aws-cis-service-catalog](#terraform-aws-cis-service-catalog)
- [terraform-aws-data-storage](#terraform-aws-data-storage)
- [terraform-aws-ecs](#terraform-aws-ecs)
- [terraform-aws-eks](#terraform-aws-eks)
- [terraform-aws-load-balancer](#terraform-aws-load-balancer)
- [terraform-aws-monitoring](#terraform-aws-monitoring)
- [terraform-aws-openvpn](#terraform-aws-openvpn)
- [terraform-aws-sam](#terraform-aws-sam)
- [terraform-aws-security](#terraform-aws-security)
- [terraform-aws-server](#terraform-aws-server)
- [terraform-aws-static-assets](#terraform-aws-static-assets)
- [terraform-aws-utilities](#terraform-aws-utilities)
- [terraform-aws-vpc](#terraform-aws-vpc)


## gruntwork


### [v0.1.4](https://github.com/gruntwork-io/gruntwork/releases/tag/v0.1.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/1/2020 | <a href="https://github.com/gruntwork-io/gruntwork/releases/tag/v0.1.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

</div>



## terraform-aws-asg


### [v0.9.1](https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.9.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/8/2020 | Modules affected: asg-rolling-deploy | <a href="https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.9.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

Fix bug where `asg-rolling-deploy` errors out on the `aws_autoscaling_group` resource in AWS provider versions &gt;v2.63.0.



</div>



## terraform-aws-ci


### [v0.25.0](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.25.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/31/2020 | Modules affected: ecs-deploy-runner, infrastructure-deployer | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.25.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

The `ecs-deploy-runner` can now be provisioned with an EC2 worker pool to use as reserved workers to speed up the initial boot sequence for the ECS deploy runner tasks.


</div>


### [v0.24.4](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.24.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/31/2020 | Modules affected: install-jenkins | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.24.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Update `install-jenkins` to  use the new Linux Repository signing keys, as the old ones expired.



</div>


### [v0.24.3](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.24.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/30/2020 | Modules affected: ecs-deploy-runner-standard-configuration, ecs-deploy-runner, infrastructure-deploy-script | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.24.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

The `infrastructure-deploy-script` now supports passing in `-var-file` to `terraform` and `terragrunt`.



</div>


### [v0.24.2](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.24.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/22/2020 | Modules affected: ecs-deploy-runner | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.24.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
Add the ability to set custom tags on all the resources managed by the `ecs-deploy-runner` module.





</div>


### [v0.24.1](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.24.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/21/2020 | Modules affected: ecs-deploy-runner-standard-configuration | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.24.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

You can now disable specific containers in the standard configuration by setting the corresponding configuration option to `null`.



</div>


### [v0.24.0](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.24.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/20/2020 | Modules affected: ecs-deploy-runner-standard-configuration, ecs-deploy-runner, infrastructure-deployer, infrastructure-deploy-script | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.24.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

This release enhances the `ecs-deploy-runner` and `infrastructure-deployer` CLI to support deploying generic infrastructure code beyond just `terraform` and `terragrunt` modules. Prior to this release, the `ecs-deploy-runner` and `infrastructure-deployer` CLI only supported invoking the `infrastructure-deploy-script`. With this release, you can install and invoke arbitrary scripts in the deploy runner container.

The following is a summary of the feature enhancements included in this release:

- Invoke predefined list of scripts, not just `infrastructure-deploy-script`. Enforced in container using a custom entrypoint script.
- Ability to directly access secrets manager entries in the ECS tasks (as opposed to implicitly with environment variable injection)
- Module for a standard configuration that includes four containers for separation of concerns and least privileges: `docker-image-builder`, `ami-builder`, `terraform-planner`, and `terraform-applier`.
- Custom `kaniko` container for building docker images in ECS Fargate with support for pushing to ECR.
- `build-packer-artifact` and `terraform-update-variable` supports injecting SSH key via secrets manager.
- `terraform-update-variable` supports appending additional text to the commit message via the `--skip-ci-flag` option.
- `terraform-update-variable` supports updating multiple name value pairs.
- `infrastructure-deploy-script` now checks what refs are allowed to run `apply`.


</div>


### [v0.23.4](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.23.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/14/2020 | Modules affected: ecs-deploy-runner, infrastructure-deploy-script, infrastructure-deployer | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.23.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

You can now set the `backend-config` option on the `init` call in the `ecs-deploy-runner` by passing in `--backend-config` to the `infrastructure-deployer` CLI.



</div>


### [v0.23.3](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.23.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/13/2020 | Modules affected: infrastructure-deploy-script, infrastructure-deployer | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.23.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

`infrastructure-deployer` and `infrastructure-deploy-script` now supports deploying the repo root path using `&quot;&quot;` for `--deploy-path`. This is now the default for `--deploy-path` when it is omitted from the CLI args.


</div>


### [v0.23.2](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.23.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/6/2020 | Modules affected: iam-policies | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.23.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

The `iam-policies` modules will now output the policy JSON even when the policy is not created.



</div>


### [v0.23.1](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.23.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/1/2020 | Modules affected: ecs-deploy-runner | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.23.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

Fix bug where `command-args` was not flowing properly from the lambda function to the deploy script.



</div>



## terraform-aws-cis-service-catalog


### [v0.5.0](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.5.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/30/2020 | Modules affected: cross-account-iam-roles, iam-groups, saml-iam-roles | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.5.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

This release bumps the module-security package version in the `iam-groups` module to get:
- `logs` groups.
- `sts:TagSession` support.


</div>



## terraform-aws-data-storage


### [v0.15.0](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.15.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/21/2020 | Modules affected: aurora | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.15.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Remove an unused `is_primary` parameter from the `aurora` module. If you were passing this parameter to the module, please remove it. This is an API change only; there should be no change in behavior.






</div>


### [v0.14.1](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.14.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/10/2020 | Modules affected: redshift | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.14.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- add redshift support




</div>


### [v0.14.0](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.14.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/8/2020 | Modules affected: aurora | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.14.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- The `aurora` module now sets `aurora-mysql` (MySQL 5.7-compatible) instead of `aurora` (MySQL 5.6-compatible) as the default engine. Also, updated variable descriptions and example code to better show how to run a global Aurora cluster. You can (and in most cases, probably already are!) override the default via the `engine` parameter.
- The `aurora` module no longer ignores the `password` param when `snapshot_identifier` is set. This allows you to restore from a snapshot by setting `snapshot_identifier` to a value and `password` to `null` and then later to change the `password` by updating that param.
- Fix a bug in the `aurora` module where it did not allow `allow_connections_from_cidr_blocks` to be set to an empty list.



</div>



## terraform-aws-ecs


### [v0.20.10](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.20.10)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/31/2020 | Modules affected: ecs-cluster | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.20.10">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

You can now conditionally shut off the `ecs-cluster` module using the `create_resources` input flag. You can also provide a base64 user data parameter for cloud-init configurations.



</div>


### [v0.20.9](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.20.9)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/31/2020 | Modules affected: ecs-cluster, ecs-daemon-service, ecs-service | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.20.9">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Constrain aws provider version to 2.x.
- Add ECS capacity provider functionality to ECS clusters.



</div>


### [v0.20.8](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.20.8)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/18/2020 | Modules affected: ecs-service | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.20.8">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

You can now set the permissions boundary for the ECS service IAM role for ELBs.



</div>


### [v0.20.7](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.20.7)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/14/2020 | Modules affected: ecs-daemon-service | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.20.7">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

You can now set the permission boundary on the IAM roles created in the `ecs-daemon-service` module.



</div>


### [v0.20.6](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.20.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/13/2020 | Modules affected: ecs-cluster | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.20.6">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

The `roll-out-ecs-cluster-update.py` script will now directly detach the old instances from ASG in a rollout to ensure the old ones get removed.



</div>


### [v0.20.5](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.20.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/9/2020 | Modules affected: ecs-cluster | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.20.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

Fix bug where `ecs-cluster` errors out on the `aws_autoscaling_group` resource in AWS provider versions &gt;v2.63.0.



</div>


### [v0.20.4](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.20.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/2/2020 | Modules affected: ecs-cluster | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.20.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- The `ecs-cluster` module now supports [block device encryption](https://www.terraform.io/docs/providers/aws/r/launch_configuration.html#encrypted) using the new `cluster_instance_root_volume_encrypted` input variable. 





</div>



## terraform-aws-eks


### [v0.21.0](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.21.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/22/2020 | Modules affected: eks-cluster-control-plane | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.21.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

The upgrade scripts for `eks-cluster-control-plane` now support upgrading to Kubernetes 1.17. Note that in the process, the AWS VPC CNI version was also updated for ALL kubernetes versions to match expectations with AWS. This means that the CNI controller will be automatically updated when migrating to this version. This should not cause any issue for your cluster, but you may experience some network connectivity issues on new pods as the switch over is happening.



</div>


### [v0.20.4](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.20.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/8/2020 | Modules affected: eks-cluster-workers | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.20.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

Fix bug where `eks-cluster-workers` errors out on the `aws_autoscaling_group` resource in AWS provider versions &gt;v2.63.0.



</div>



## terraform-aws-load-balancer


### [v0.20.2](https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.20.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/17/2020 | Modules affected: lb-listener-rules | <a href="https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.20.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Add Load Balancer Listener Rules module, which is an alternative to creating [lb_listener_rule](https://www.terraform.io/docs/providers/aws/r/lb_listener_rule.html) resources directly in Terraform, which can be convenient, for example, when configuring listener rules in a [Terragrunt configuration](https://terragrunt.gruntwork.io/).





</div>



## terraform-aws-monitoring


### [v0.22.1](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.22.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/30/2020 | Modules affected: alarms/route53-health-check-alarms | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.22.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fix `alarm_configs` type.




</div>


### [v0.22.0](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.22.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/28/2020 | Modules affected: metrics/cloudwatch-memory-disk-metrics-scripts, alarms/route53-health-check-alarms | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.22.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Add unzip to  needed for Amazon Linux 2
- Allow route53-health-check-alarms to create multiple resources

</div>



## terraform-aws-openvpn


### [v0.10.0](https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.10.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/29/2020 | Modules affected: openvpn-server | <a href="https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.10.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

This release updates the `var.subnet_id` variable to a list, `var.subnet_ids`, to permit the ASG to use more than one subnet.


</div>



## terraform-aws-sam


### [v0.2.1](https://github.com/gruntwork-io/terraform-aws-sam/releases/tag/v0.2.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/4/2020 | Modules affected: gruntsam, gruntsam | <a href="https://github.com/gruntwork-io/terraform-aws-sam/releases/tag/v0.2.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fixed a bug where `gruntsam` could generate `aws_api_gateway_method_response` resources in a different order each time you ran it, leading to spurious diffs in version control.
- Fixed a bug where `gruntsam` would silently ignore errors in launching AWS SAM Local.




- Fixed a bug where `gruntsam` could generate `aws_api_gateway_method_response` resources in a different order each time you ran it, leading to spurious diffs in version control.
- Fixed a bug where `gruntsam` would silently ignore errors in launching AWS SAM Local.



</div>



## terraform-aws-security


### [v0.34.2](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.34.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/31/2020 | Modules affected: account-baseline-app, account-baseline-root, account-baseline-security, cross-account-iam-roles | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.34.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

This release adds a role with permissions only to access support, as required by the CIS AWS Foundations Benchmark. Previously, this permission was available in `iam-groups`, but not as an IAM role.



</div>


### [v0.34.1](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.34.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/21/2020 | Modules affected: account-baseline-app, account-baseline-root, account-baseline-security, aws-config | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.34.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Add missing AWS service access principal to `account-baseline-root`. This should get rid of a spurious diff in the `plan`.
- Removed the `aws_organizations_organization` data source from `account-baseline-root`, as on the very first `apply`, the AWS organization may not exist yet!
- Fixed several typos and copy paste errors in the [Landing Zone Deployment Guide](https://github.com/gruntwork-io/module-security/blob/d6863f8af5fb52ce4602c0c208ea4785f0de57d6/_docs/LANDING_ZONE_DEPLOY_GUIDE.md).
- Allow enabling, disabling, and naming all IAM groups in `account-baseline-security`. The module now exposes `should_create_iam_group_xxx` and `iam_group_name_xxx` input parameters for every group `xxx` we support (e.g., `full-access`, `read-only`, `billing`, etc).
- Converted `AWSConfigSNSPublishPolicy` in the `aws-config` module from a standalone IAM policy to an inline policy. This avoids name conflicts in case you deploy this more than once. Be aware that when you `apply` this module (or any of the `account-baseline-xxx` modules that use it under the hood), it is expected that it will delete the standalone policy and recreate it as an inline policy. 




</div>


### [v0.34.0](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.34.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/20/2020 | Modules affected: account-baseline-root, account-baseline-app, account-baseline-security, aws-config-multi-region | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.34.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- Updated `account-baseline-root` to allow you to turn off AWS Config and CloudTrail entirely. This is necessary 
  if you want to aggregate AWS Config and CloudTrail data in a child account (e.g., a dedicated logs account), but
  that child account doesn&apos;t initially exist and doesn&apos;t contain S3 buckets / KMS CMKs when you first run `apply`.
  Now you can run `apply` initially with AWS Config and CloudTrail disabled, create all the child accounts, apply a
  security baseline to each child account (including creating the necessary S3 buckets and KMS CMKs), turn AWS Config
  and CloudTrail back on in the root account, and run `apply` again. Also, fixed a bug where this module will now
  use the KMS key specified via the `cloudtrail_kms_key_arn` input parameter rather than creating its own KMS master 
  key for encrypting CloudTrail data. See the Deployment Guide for the recommended configuration if deploying from 
  scratch. See the Migration Guide if you&apos;re updating an existing deployment.

- Updated `account-baseline-app` so that, depending on the settings you pass in, it can either store AWS Config and
  CloudTrail data locally (e.g., if this is a dedicated account for aggregating logs) or send that data to a separate
  account (e.g., if this is an app account such a dev, stage, or prod). See the Deployment Guide for the recommended
  configuration if deploying from scratch. See the Migration Guide if you&apos;re updating an existing deployment.

- Updated `account-baseline-security` to allow configuring it to send AWS Config and CloudTrail data to an external
  account (e.g., a separate logs account). Also, fixed a bug where it wasn&apos;t setting the `config_linked_accounts`
  parameter correctly, which made AWS Config data not work correctly if trying to use the security account itself for
  aggregation.  See the Deployment Guide for the recommended configuration if deploying from scratch. See the Migration 
  Guide if you&apos;re updating an existing deployment.

- Updated all `account-baseline-xxx` modules to, by default, send CloudTrail data not only to an S3 bucket (e.g., for 
  aggregation in a logs account) but also CloudWatch Logs in the current account (for easy debugging).

- Updated the `aws-config-multi-region`, `aws-organizations-config-rules`, and `cloudtrail` modules with a 
  `create_resources` parameter you can set to `false` to disable the module entirely. This is a stopgap until Terraform
  0.13 is generally available with support for using `count` and `for_each` on `module`.


</div>


### [v0.33.2](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.33.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/17/2020 | Modules affected: iam-policies | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.33.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

Adds the `sts:TagSession` permission to the `allow_access_to_other_accounts` IAM policy. This will allow [session tags](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_session-tags.html). As an example, this is used with the [&quot;Configure AWS Credentials&quot; GitHub action](https://github.com/marketplace/actions/configure-aws-credentials-action-for-github-actions).




</div>


### [v0.33.1](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.33.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/17/2020 | Modules affected: account-baseline-security, kms-master-key-multi-region | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.33.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fix a syntactic error in `account-baseline-security` that prevented the module from working. Also, fix some test failures that obscured this.




</div>


### [v0.33.0](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.33.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/16/2020 | Modules affected: account-baseline-app, account-baseline-security, aws-auth, kms-master-key | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.33.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

When creating a CMK using the `kms-master-key` module, you can now provide IAM conditions for the key users. Previously, the module only accepted a list of users, and did not accept any conditions.


</div>


### [v0.32.5](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.32.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/4/2020 | Modules affected: account-baseline-app, account-baseline-root, account-baseline-security, cross-account-iam-roles | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.32.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Added a new `logs` IAM policy, IAM group, and IAM role that grants access to logs in CloudTrail, AWS Config, and CloudWatch.





</div>


### [v0.32.4](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.32.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/3/2020 | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.32.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fix `ssh_key` param in one of the examples so that tests will pass. No modules were changed.






</div>



## terraform-aws-server


### [v0.8.4](https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.8.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/30/2020 | Modules affected: ec2-backup | <a href="https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.8.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- **[NEW MODULE]**:  EC2 backup. This module makes it easy to deploy a data lifecycle manager that automatically creates snapshots of your EBS volumes at configurable intervals.






</div>



## terraform-aws-static-assets


### [v0.6.5](https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.6.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/7/2020 | Modules affected: s3-cloudfront, s3-static-website | <a href="https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.6.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- `s3-cloudfront`
- `s3-static-website`



- Accept new variables base_domain_name and base_domain_name_tags to lookup the relevant hosted zone so that hosted_zone_id need not be provided.
-  Patch default variable for hosted_zone_ids to be `null`.


- https://github.com/gruntwork-io/package-static-assets/pull/46
- https://github.com/gruntwork-io/package-static-assets/pull/47




</div>


### [v0.6.4](https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.6.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/7/2020 | Modules affected: s3-cloudfront, s3-static-website | <a href="https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.6.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- Accept new variables `base_domain_name` and `base_domain_name_tags` to lookup the relevant hosted zone so that` hosted_zone_id` need not be provided.



</div>



## terraform-aws-utilities


### [v0.2.1](https://github.com/gruntwork-io/terraform-aws-utilities/releases/tag/v0.2.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/17/2020 | Modules affected: instance-type | <a href="https://github.com/gruntwork-io/terraform-aws-utilities/releases/tag/v0.2.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Added a new `instance-type` module that can tell you which of a list of instance types are available in all AZs in the current AWS region.






</div>



## terraform-aws-vpc


### [v0.9.2](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.9.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/29/2020 | Modules affected: vpc-mgmt | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.9.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

`vpc-mgmt` now accepts the `create_resources` variable to determine whether or not to create resources. This will be useful until TF 0.13 release support for `count` on module blocks, at which point the `create_resources` functionality will be removed from all Gruntwork modules.




</div>


### [v0.9.1](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.9.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/27/2020 | Modules affected: vpc-app, vpc-mgmt | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.9.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

This release adds subnet ARNs to the outputs for `vpc-app` and `vpc-mgmt`.




</div>


### [v0.9.0](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.9.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/13/2020 | Modules affected: vpc-app, vpc-mgmt | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.9.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Switch the `vpc-app` and `vpc-mgmt` modules from using the deprecated `blacklisted_names` and `blacklisted_zone_ids` parameters to the new `exclude_names` and `exclude_zone_ids` parameters.


</div>


### [v0.8.12](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.8.12)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/2/2020 | Modules affected: vpc-interface-endpoint | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.8.12">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

add glue support to vpc-interface-endpoint


</div>


### [v0.8.11](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.8.11)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/1/2020 | Modules affected: vpc-app | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.8.11">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- You can now disable VPC endpoints in the `vpc-app` module by setting the `create_vpc_endpoints` variable to `false`.



</div>

<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "releases",
  "hash": "c11060e9734e1414ce3d641f3107bb93"
}
##DOCS-SOURCER-END -->

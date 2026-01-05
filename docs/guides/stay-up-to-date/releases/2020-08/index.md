
# Gruntwork release 2020-08

<p style={{marginTop: "-25px"}}><small><a href="/guides">Guides</a> / <a href="/guides/stay-up-to-date">Update Guides</a> / <a href="/guides/stay-up-to-date/releases">Releases</a> / 2020-08</small></p>

This page is lists all the updates to the [Gruntwork Infrastructure as Code
Library](https://gruntwork.io/infrastructure-as-code-library/) that were released in 2020-08. For instructions
on how to use these updates in your code, check out the [updating
documentation](/library/stay-up-to-date/updating).

Here are the repos that were updated:

- [aws-sample-app](#aws-sample-app)
- [boilerplate](#boilerplate)
- [gruntwork](#gruntwork)
- [infrastructure-live-acme](#infrastructure-live-acme)
- [infrastructure-modules-acme](#infrastructure-modules-acme)
- [terraform-aws-asg](#terraform-aws-asg)
- [terraform-aws-cache](#terraform-aws-cache)
- [terraform-aws-ci](#terraform-aws-ci)
- [terraform-aws-cis-service-catalog](#terraform-aws-cis-service-catalog)
- [terraform-aws-ecs](#terraform-aws-ecs)
- [terraform-aws-eks](#terraform-aws-eks)
- [terraform-aws-load-balancer](#terraform-aws-load-balancer)
- [terraform-aws-openvpn](#terraform-aws-openvpn)
- [terraform-aws-security](#terraform-aws-security)
- [terraform-aws-server](#terraform-aws-server)
- [terraform-aws-service-catalog](#terraform-aws-service-catalog)
- [terraform-aws-vpc](#terraform-aws-vpc)


## aws-sample-app


### [v0.0.2](https://github.com/gruntwork-io/aws-sample-app/releases/tag/v0.0.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/25/2020 | <a href="https://github.com/gruntwork-io/aws-sample-app/releases/tag/v0.0.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/aws-sample-app/pull/12: Update how DB secrets are handled, as it seems AWS Secrets Manager has changed its default format.

</div>



## boilerplate


### [v0.3.0](https://github.com/gruntwork-io/boilerplate/releases/tag/v0.3.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/31/2020 | <a href="https://github.com/gruntwork-io/boilerplate/releases/tag/v0.3.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/boilerplate/pull/59 : We now support remote template sources. Note that this includes a configuration change from `template-folder` to `template-url` in `dependencies`, as well as renaming the CLI arg.

</div>



## gruntwork


### [v0.1.5](https://github.com/gruntwork-io/gruntwork/releases/tag/v0.1.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/1/2020 | <a href="https://github.com/gruntwork-io/gruntwork/releases/tag/v0.1.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/gruntwork/pull/61: Fix a bug in how we looked up the security account ID.

</div>



## infrastructure-live-acme


### [v0.0.1-08112020](https://github.com/gruntwork-io/infrastructure-live-acme/releases/tag/v0.0.1-08112020)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/12/2020 | <a href="https://github.com/gruntwork-io/infrastructure-live-acme/releases/tag/v0.0.1-08112020">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Since this repo is solely used for examples/demonstrations, and NOT meant for direct production use, we simply publish all changes at v0.0.1, with a date marker for when it was published.

Updates in this version:
- Support for `nvme-cli`
- Bumping to `t3.micro`
- Bumping to latest `module-ci` for jenkins-server
- Bug fixes with helm
- Bug fixes in tls-scripts
- Compatibility update with latest terragrunt version
- Updating default kubernetes version to 1.16
- Update EKS modules to use helm 3.

</div>



## infrastructure-modules-acme


### [v0.0.1-08112020](https://github.com/gruntwork-io/infrastructure-modules-acme/releases/tag/v0.0.1-08112020)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/12/2020 | <a href="https://github.com/gruntwork-io/infrastructure-modules-acme/releases/tag/v0.0.1-08112020">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Since this repo is solely used for examples/demonstrations, and NOT meant for direct production use, we simply publish all changes at v0.0.1, with a date marker for when it was published.

Updates in this version:
- Support for `nvme-cli`
- Bumping to `t3.micro`
- Bumping to latest `module-ci` for jenkins-server
- Bug fixes with helm
- Bug fixes in tls-scripts
- Compatibility update with latest terragrunt version
- Updating default kubernetes version to 1.16
- Update EKS modules to use helm 3.

</div>



## terraform-aws-asg


### [v0.10.0](https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.10.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/20/2020 | Modules affected: asg-rolling-deploy | <a href="https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.10.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

The `availability_zones` input has been dropped from the `asg-rolling-deploy` module, which is only used in EC2-Classic mode. To control availability zones, use the `vpc_subnet_ids` input variable instead.



</div>


### [v0.9.2](https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.9.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/18/2020 | Modules affected: asg-rolling-deploy | <a href="https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.9.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

Adds the `arn` of the ASG as an output.




</div>



## terraform-aws-cache


### [v0.9.4](https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v0.9.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/14/2020 | Modules affected: redis | <a href="https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v0.9.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fix the default parameter-group setting value when using clustered mode.



</div>



## terraform-aws-ci


### [v0.27.3](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.27.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/31/2020 | Modules affected: build-helpers/build-packer-artifact | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.27.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

`build-packer-artifact` now supports a new `--idempotent` flag. When set as `true` (e.g. `--idempotent true`), the `build-packer-artifact` script will search your AWS account for an AMI that matches the template, and if it exists, will not attempt to build a new AMI. This is useful for preserving the integrity of AMI versions in CI/CD workflows.

See [the updated docs](https://github.com/gruntwork-io/module-ci/tree/master/modules/build-helpers#idempotent-packer-templates) for more information.




</div>


### [v0.27.2](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.27.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/21/2020 | Modules affected: install-jenkins | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.27.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Update `install-jenkins` to the latest Jenkins version (`2.235.5`), switch to `https` URLs for the APT sources, and add `DEBIAN_FRONTEND=noninteractive` to all `apt-get` calls to ensure the installs don&apos;t show interactive prompts.



</div>


### [v0.27.1](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.27.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/20/2020 | Modules affected: ecs-deploy-runner-standard-configuration, ecs-deploy-runner, infrastructure-deployer | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.27.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

You can now query the available containers and scripts in the `ecs-deploy-runner` using the `--describe-containers` command. Refer to [the updated documentation](https://github.com/gruntwork-io/module-ci/blob/master/modules/infrastructure-deployer/core-concepts.md#how-do-i-invoke-the-ecs-deploy-runner) for more info.

Note that to use the new feature, you will need to update both `ecs-deploy-runner` and `infrastructure-deployer` to the new version.



</div>


### [v0.27.0](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.27.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/18/2020 | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.27.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

Starting this release, tests are run against v3.x series of the AWS provider. Note that this release is backwards compatible with v2.x of the AWS provider. However, there is no guarantee that backwards compatibility with v2.x of the AWS provider will be maintained going forward.



</div>


### [v0.26.0](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.26.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/4/2020 | Modules affected: ecs-deploy-runner-standard-configuration, ecs-deploy-runner | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.26.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

This release allows users to include environment variables in the ECS deploy-runner containers. To include an environment variable, use the `environment_vars` field of the `container_images` variable in the `ecs-deploy-runner` and `ecs-deploy-runner-standard-configuration` modules.


</div>


### [v0.25.1](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.25.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/1/2020 | Modules affected: ecs-deploy-runner | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.25.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

`ecs-deploy-runner` now returns the ECS cluster EC2 worker pool IAM role and ASG name.



</div>



## terraform-aws-cis-service-catalog


### [v0.7.0](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.7.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/31/2020 | Modules affected: cloudtrail, cross-account-iam-roles | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.7.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

The `cross-account-iam-roles` module has been updated to include a support role, which is required for compliance with the Benchmark.

The `cloudtrail` module has been updated to work with AWS provider v3.


</div>


### [v0.6.0](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.6.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/31/2020 | Modules affected: aws-securityhub, cloudtrail | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.6.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

Starting this release, tests are run against v3.x series of the AWS provider. Note that this release is backwards compatible with v2.x of the AWS provider. However, there is no guarantee that backwards compatibility with v2.x of the AWS provider will be maintained going forward.



</div>


### [v0.5.1](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.5.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/18/2020 | Modules affected: custom-iam-entity | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.5.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

`custom-iam-entity` module now supports updating the max session duration of the IAM role.



</div>



## terraform-aws-ecs


### [v0.21.2](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.21.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/28/2020 | Modules affected: ecs-cluster | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.21.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

Set a `default_capacity_provider_strategy` when providing capacity providers for the ECS cluster.



</div>


### [v0.21.1](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.21.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/24/2020 | Modules affected: ecs-cluster | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.21.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

Add prefix to the ECS capacity providers to support ECS cluster names that begin with `ecs` or `aws`. Note that upgrading to this release will recreate the capacity providers, but will not cause downtime to your services or ECS cluster.



</div>


### [v0.21.0](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.21.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/17/2020 | Modules affected: ecs-cluster, ecs-service | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.21.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

*Update: when doing this upgrade, we accidentally missed updating the `ecs-daemon-service` module, so it&apos;s still pinned to AWS Provider 2.x. If you&apos;re using that module, please update to release [v0.22.0](https://github.com/gruntwork-io/module-ecs/releases/tag/v0.22.0) instead.*

Starting this release, tests are run against v3.x series of the AWS provider. Note that this release is backwards compatible with v2.x of the AWS provider. However, there is no guarantee that backwards compatibility with v2.x of the AWS provider will be maintained going forward.



</div>


### [v0.20.12](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.20.12)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/6/2020 | Modules affected: ecs-service | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.20.12">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

This release implements a workaround to an issue that can occur when the AWS API rejects updates made to ECS tasks of the same family that occur too closely together in time. This is sometimes encountered when attempting to update both the regular and canary task definitions simultaneously. 









</div>


### [v0.20.11](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.20.11)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/3/2020 | Modules affected: ecs-scripts | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.20.11">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fix issue an issue with how the `ecs-scripts` module could exit with an error when editing `crontab`. Fix a number of ShellCheck warnings.





</div>



## terraform-aws-eks


### [v0.22.0](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.22.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/20/2020 | Modules affected: eks-cluster-control-plane, eks-cluster-workers, eks-k8s-cluster-autoscaler | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.22.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

The EKS cluster control plane upgrade script now uses the right image tags for the core components. Additionally, this release drops support for k8s `1.13` and `1.14` in the upgrade script.


</div>


### [v0.21.2](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.21.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/13/2020 | Modules affected: eks-cluster-control-plane | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.21.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

Fix bug where the control plane upgrade scripts fail on python3.


</div>


### [v0.21.1](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.21.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/12/2020 | Modules affected: eks-cluster-managed-workers | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.21.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

`eks-cluster-managed-workers` will now ignore changes to `desired_size` after the initial deployment, to be compatible with the cluster autoscaler.



</div>



## terraform-aws-load-balancer


### [v0.20.4](https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.20.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/20/2020 | Modules affected: lb-listener-rules | <a href="https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.20.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- The `lb-listener-rules` module now lets you use HTTP headers in conditions via the `http_headers` param.



</div>


### [v0.20.3](https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.20.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/18/2020 | Modules affected: alb | <a href="https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.20.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

The [`arn_suffix`](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lb#arn_suffix) attribute is now available as an output from the `alb` module.




</div>



## terraform-aws-openvpn


### [v0.11.0](https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.11.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/12/2020 | Modules affected: openvpn-admin, openvpn-server | <a href="https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.11.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

Use python to manage sleeps to delay resource creation for IAM propagation. This means that you must have python installed on your machine to use this module.



</div>



## terraform-aws-security


### [v0.36.3](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.36.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/25/2020 | Modules affected: aws-auth | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.36.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

Resolve `shellcheck` issues in `aws-auth`.



</div>


### [v0.36.2](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.36.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/25/2020 | Modules affected: account-baseline-app, account-baseline-security | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.36.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

You can now set the max session duration for human and machine cross account IAM roles managed in the `account-baseline` modules using the `max_session_duration_human_users` and `max_session_duration_machine_users` input vars.



</div>


### [v0.36.1](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.36.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/22/2020 | Modules affected: kms-grant-multi-region, account-baseline-app, account-baseline-security, kms-master-key-multi-region | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.36.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

This release introduces a new module `kms-grant-multi-region` that allows you to manage KMS grants for KMS keys across multiple regions.



</div>


### [v0.36.0](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.36.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/21/2020 | Modules affected: account-baseline-app, account-baseline-root, account-baseline-security, aws-config-bucket | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.36.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

**This release contains backwards incompatible changes. Make sure to follow the instructions in the migration guide below!**

* Refactored the `account-baseline-xxx` modules to work around several chicken-and-egg problems related to AWS Config / CloudTrail. The initial deployment, as well as adding subsequent child accounts, can now be done in a single `apply` per account, rather than the previous process, which required lots of back-and-forth and multiple `apply` calls. Here&apos;s an overview of the changes:

    * Add first-class support for marking one of the child accounts as a &quot;logs account&quot; that should be used for aggregating AWS Config and CloudTrail data from all accounts. The `account-baseline-root` module can now automatically create the logs account, authenticate to it, create an S3 bucket for AWS Config and an S3 bucket and KMS CMK for CloudTrail in that account, and then configure the root account to send all AWS Config and CloudTrail data to those S3 buckets. In the past, you had to disable AWS Config and CloudTrail on the very initial deployment, as the logs account did not exist, but with this release, you can leave it enabled, run `apply` once, 
    and everything will &quot;just work.&quot;

    * Switch from org-level AWS Config Rules to account-level AWS Config Rules. The Rules are exactly the same, but are now managed within each account, rather than solely at the root account. This is slightly less convenient / secure, but it works around a major chicken-and-egg problem when creating new child accounts. Org-level rules require every single child account to have a Config Recorder or deployment fails, so in the past, you had to initially disable Config Rules whenever you added a new child account, then create a Config Recorder in that account, and then re-enable the Rules. This process has now been reduced to a single `apply` per account.

* Updated the `cloudtrail` module to: 
    * Use the `kms-master-key` module to create and manage the KMS CMK rather than custom code. This makes the code more DRY and maintainable.
    * Properly support sharing a KMS CMK across multiple accounts. In the past, the `cloudtrail` module didn&apos;t have this ability and the `account-baseline-xxx` modules were backfilling the missing permissions, but now it&apos;s all consolidated into the `cloudtrail` module.

* Extracted the S3 bucket creation logic from the `aws-config` module into an `aws-config-bucket` module so it can be reused elsewhere (namely, in `account-baseline-root`).

* Extracted the S3 bucket and KMS CMK creation logic from the `cloudtrail` module into an `cloudtrail-bucket` module so it can be reused elsewhere (namely, in `account-baseline-root`).

* The `aws-config` and `aws-config-multi-region` modules now expose a new, required `aggregate_config_data_in_external_account` parameter that must be set to `true` if you&apos;re aggregating AWS Config data in an external account (i.e., if setting the `central_account_id` param). This redundant parameter is unfortunately necessary to work around a Terraform limitation.

* Fixed a bug in the `aws-config` module where it was not setting `s3_key_prefix` on `aws_config_delivery_channel`.

* Renamed the `aws-organization-config-rules` module to `aws-config-rules`, as it now supports creating other org-level rules (the default) or account-level rules (if you set `create_account_rules` to `true`).

* Updated the `kms-master-key` module with support for passing in a list of ARNs via `cmk_read_only_user_iam_arns` that will get read-only access. That is, they will only be able to decrypt data using the KMS CMK, but not the ability to encrypt data or manage the CMK in any other way.

* Refactored the `aws-organizations` output variables to so that (a) they always show the data after child accounts have been created, rather than before and (b) they depend on the child account resources so you can build dependency chains that wait for the child accounts to be created.




</div>


### [v0.35.0](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.35.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/17/2020 | Modules affected: aws-config-multi-region, guardduty-multi-region, kms-master-key-multi-region | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.35.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

Starting this release, tests are run against v3.x series of the AWS provider. Note that this release is backwards compatible with v2.x of the AWS provider. However, there is no guarantee that backwards compatibility with v2.x of the AWS provider will be maintained going forward.



</div>


### [v0.34.5](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.34.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/17/2020 | Modules affected: aws-config, aws-organizations, cloudtrail, custom-iam-entity | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.34.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- There appears to be a [Terraform bug](https://github.com/gruntwork-io/module-security/issues/312) where, when you run `destroy`, you can get errors about (valid) references to resources that use `count` or `for_each` (e.g., `foo.bar[0]`). This release has a workaround for this issue, so hopefully, `destroy` works correctly now.






</div>


### [v0.34.4](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.34.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/13/2020 | Modules affected: iam-policies | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.34.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

This release adds read only permissions to the `read_only` IAM policy for the [Performance Insights](https://aws.amazon.com/rds/performance-insights/) service.



</div>


### [v0.34.3](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.34.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/12/2020 | Modules affected: cloudtrail | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.34.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  


Allows an empty list of users and admins in cloudtrail-created KMS keys. Previously, the `kms_key_user_iam_arns` and `kms_key_administrator_iam_arns` variables were required. They are now optional and default to an empty list. If they are left as empty, then `allow_cloudtrail_access_with_iam` must be `true`.



</div>



## terraform-aws-server


### [v0.8.5](https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.8.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/1/2020 | Modules affected: ec2-backup, single-server | <a href="https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.8.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

This release includes a fix for the `ec2-backup` module, making its tag configurations more flexible. It also fixes a few links in the `module-server` documentation.








</div>



## terraform-aws-service-catalog


### [v0.0.5](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.0.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/25/2020 | Modules affected: openvpn-server, ecs-service, ecs-cluster, account-baseline-app | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.0.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

**Updates to `ecs-service` and `ecs-cluster`**
This release introduces a number of bug fixes for the `ecs-service` and `ecs-cluster` modules. For details, see #158 and #163.

**Updates to `openvpn`**

</div>


### [v0.0.4](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.0.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/19/2020 | Modules affected: mgmt/bastion-host, mgmt/openvpn-server, mgmt/ecs-deploy-runner, mgmt/jenkins | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.0.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

All packer templates now support using a custom KMS CMK for encrypting the snapshot and root volume.



</div>


### [v0.0.3](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.0.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/19/2020 | Modules affected: networking, tls-scripts, base, landingzone | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.0.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Updates the ec2-baseline to use the latest version of module-security
- Updates each of the `account-baseline-*` modules to use the latest version of module-security
- Updates `openvpn-server` to use the latest version of `package-openvpn`
- Adds the `tls-scripts` module






</div>


### [v0.0.2](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.0.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/17/2020 | Modules affected: networking/vpc-mgmt, data-stores/memcached, base/ec2-baseline | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.0.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

New Modules:

- `networking/vpc-mgmt`: A module for creating a management VPC with 2 subnet tiers (public and private).
- `data-stores/memcached`: A module for creating ElastiCache with Memcached.

Bug fixes:

- Fix bug where `cloud_init_parts` could not be set to an empty list in `ec2-baseline`.
- Fix docs for aurora module.



</div>


### [v0.0.1](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.0.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/10/2020 | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.0.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  This is the initial release of the Gruntwork AWS Service Catalog! This release contains the following service modules:

Data stores: (`data-stores`)
- `aurora`
- `ecr-repos`
- `rds`
- `redis`

Landing Zone (`landingzone`)
- `account-baseline-app`
- `account-baseline-root`
- `account-baseline-security`

Infrastructure Management (`mgmt`)
- `bastion-host`
- `openvpn-server`
- `jenkins`
- `ecs-deploy-runner`

Networking (`networking`)
- `alb`
- `route53`
- `sns-topics`
- `vpc`

Service Management (`services`)
- `ecs-cluster`
- `ecs-service`
- `eks-cluster`
- `eks-core-services`
- `k8s-namespace`
- `k8s-service`
- `public-static-website`

</div>



## terraform-aws-vpc


### [v0.9.3](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.9.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/25/2020 | Modules affected: vpc-peering-external, vpc-flow-logs | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.9.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

This release introduces two changes:

1. In the `vpc-peering-external` module, it&apos;s now possible to disable the network ACL DENY rules by setting `enable_blanket_deny=false`. This can be useful when you need to add your own ACLs and you&apos;re bumping up against the 20 rule limit.
1. As outlined in the [Terraform AWS provider v3 upgrade guide](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/guides/version-3-upgrade#resource-aws_cloudwatch_log_group), CloudWatch Logs group ARNs no longer include the `:*` at the end, which caused a problem in the `vpc-flow-logs` module. This is now resolved.






</div>

<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "releases",
  "hash": "6f6ec1e4dd4b935dacc84e3cb0180eb2"
}
##DOCS-SOURCER-END -->


# Gruntwork release 2022-06

<p style={{marginTop: "-25px"}}><small><a href="/guides">Guides</a> / <a href="/guides/stay-up-to-date">Update Guides</a> / <a href="/guides/stay-up-to-date/releases">Releases</a> / 2022-06</small></p>

This page is lists all the updates to the [Gruntwork Infrastructure as Code
Library](https://gruntwork.io/infrastructure-as-code-library/) that were released in 2022-06. For instructions
on how to use these updates in your code, check out the [updating
documentation](/library/stay-up-to-date/updating).

Here are the repos that were updated:

- [boilerplate](#boilerplate)
- [repo-copier](#repo-copier)
- [terraform-aws-asg](#terraform-aws-asg)
- [terraform-aws-ci](#terraform-aws-ci)
- [terraform-aws-ci-steampipe](#terraform-aws-ci-steampipe)
- [terraform-aws-cis-service-catalog](#terraform-aws-cis-service-catalog)
- [terraform-aws-data-storage](#terraform-aws-data-storage)
- [terraform-aws-ecs](#terraform-aws-ecs)
- [terraform-aws-eks](#terraform-aws-eks)
- [terraform-aws-lambda](#terraform-aws-lambda)
- [terraform-aws-load-balancer](#terraform-aws-load-balancer)
- [terraform-aws-monitoring](#terraform-aws-monitoring)
- [terraform-aws-openvpn](#terraform-aws-openvpn)
- [terraform-aws-security](#terraform-aws-security)
- [terraform-aws-server](#terraform-aws-server)
- [terraform-aws-service-catalog](#terraform-aws-service-catalog)
- [terraform-aws-static-assets](#terraform-aws-static-assets)
- [terraform-aws-utilities](#terraform-aws-utilities)
- [terraform-aws-vpc](#terraform-aws-vpc)


## boilerplate


### [v0.4.4](https://github.com/gruntwork-io/boilerplate/releases/tag/v0.4.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/8/2022 | <a href="https://github.com/gruntwork-io/boilerplate/releases/tag/v0.4.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

   https://github.com/gruntwork-io/boilerplate/pull/109: Upgraded various dependencies to the latest version.

</div>



## repo-copier


### [v0.1.0](https://github.com/gruntwork-io/repo-copier/releases/tag/v0.1.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/2/2022 | <a href="https://github.com/gruntwork-io/repo-copier/releases/tag/v0.1.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  **This is a backward incompatible releaese**

Starting this release, the following repos are no longer being copied. All of these repos were put on hold as of February 2022 and are no longer being maintained by Gruntwork.

If you wish to include any of these repos, please fork and build a new version of the repo-copier with the repos you need uncommented.

- `gruntwork-io/terraform-aws-influx`
- `gruntwork-io/terraform-aws-zookeeper`
- `gruntwork-io/terraform-aws-kafka`
- `gruntwork-io/terraform-aws-elk`
- `gruntwork-io/infrastructure-live-acme`
- `gruntwork-io/infrastructure-modules-acme`
- `gruntwork-io/sample-app-frontend-acme`
- `gruntwork-io/cis-infrastructure-modules-acme`
- `gruntwork-io/cis-infrastructure-live-acme`
- `gruntwork-io/sample-app-backend-acme`
- `gruntwork-io/infrastructure-modules-multi-account-acme`
- `gruntwork-io/infrastructure-live-multi-account-acme`
- `gruntwork-io/sample-app-backend-multi-account-acme`
- `gruntwork-io/sample-app-frontend-multi-account-acme`
- `gruntwork-io/terraform-aws-sam`
- `gruntwork-io/terraform-aws-couchbase`
- `gruntwork-io/terraform-helm-gke-exts`
- `gruntwork-io/terraform-google-static-assets`
- `gruntwork-io/terraform-google-load-balancer`
- `gruntwork-io/terraform-google-influx`
- `gruntwork-io/terraform-google-sql`
- `gruntwork-io/terraform-google-security`
- `gruntwork-io/terraform-google-ci`
- `gruntwork-io/terraform-google-gke`
- `gruntwork-io/terraform-google-network`
- `hashicorp/terraform-aws-vault`
- `hashicorp/terraform-aws-consul`
- `hashicorp/terraform-aws-nomad`
- `hashicorp/terraform-google-vault`
- `hashicorp/terraform-google-consul`
- `hashicorp/terraform-google-nomad`

https://github.com/gruntwork-io/repo-copier/pull/118


</div>



## terraform-aws-asg


### [v0.19.0](https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.19.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/21/2022 | Modules affected: asg-instance-refresh, asg-rolling-deploy, server-group | <a href="https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.19.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- **Unlock AWS provider v4. Require minimum 3.75.1.** This update includes a few tests that make sure upgrading to this module from the last release is easy. However, you may need to bump your AWS provider version. See the migration guide notes below for more.


</div>


### [v0.18.1](https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.18.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/13/2022 | Modules affected: asg-rolling-deploy | <a href="https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.18.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Added `max_instance_lifetime` var to `asg-rolling-deploy` module



</div>


### [v0.18.0](https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.18.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/6/2022 | Modules affected: asg-rolling-deploy, server-group | <a href="https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.18.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Updated examples to be compatible with `terraform-provider-aws` v4.
- Updated tests to include additional cases and OSes.
- Support for python2 has been dropped. All modules that depend on python now require python 3, and calls out to `python3` directly. Most users should not be impacted by this change, as almost all operating systems ship with `python3` now.


</div>



## terraform-aws-ci


### [v0.50.0](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.50.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/27/2022 | Modules affected: ecs-deploy-runner, infrastructure-deployer | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.50.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Updated the Fargate platform version to default to `1.4.0` instead of `1.3.0`.
- Fixed bug where very short ECS tasks oftentimes end up with no streaming logs despite the logs showing up in CloudWatch. We have identified this to be a race condition between retrieving log events and the first logs to show up from the ECS task. This is addressed by adding a short delay between the ECS task starting, and the `infrastructure-deployer` CLI reading log events.



</div>


### [v0.49.1](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.49.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/9/2022 | Modules affected: ecs-deploy-runner-standard-configuration, infrastructure-deploy-script | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.49.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Added the ability to `ecs-deploy-runner` to init and update submodules in the infra live repo.



</div>


### [v0.49.0](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.49.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/6/2022 | Modules affected: jenkins-server | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.49.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Updated dependency `terraform-aws-asg` from `v0.13.0` to `v0.18.0` in `jenkins-server` module.


</div>


### [v0.48.4](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.48.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/6/2022 | Modules affected: test/upgrades | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.48.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Updated upgrade testing framework to run `apply -refresh-only` to avoid terraform output changes causing resource counting to fail.




</div>


### [v0.48.3](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.48.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/3/2022 | Modules affected: test/upgrades | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.48.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Made the repo name configurable in upgrade testing framework.




</div>


### [v0.48.2](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.48.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/1/2022 | Modules affected: ecs-deploy-runner, infrastructure-deploy-script | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.48.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Added a new go package for upgrade tests.
- Added the ability to install multiple terraform versions into the `deploy-runner` docker container by using the build arg `additional_terraform_versions`. Example: `--build-arg additional_terraform_versions=0.12.31,0.15.1`
- Fixed bug where SSH key without trailing `\n` was being rejected by `ssh-add` when attempting to load into the deploy runner.



</div>



## terraform-aws-ci-steampipe


### [v0.3.0](https://github.com/gruntwork-io/terraform-aws-ci-steampipe/releases/tag/v0.3.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/30/2022 | Modules affected: steampipe-runner, ecs-deploy-runner-with-steampipe-runner | <a href="https://github.com/gruntwork-io/terraform-aws-ci-steampipe/releases/tag/v0.3.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- `steampipe-runner` [**BACKWARD INCOMPATIBLE**]
- `ecs-deploy-runner-with-steampipe-runner` [**BACKWARD INCOMPATIBLE**]

Updated the following dependencies:

- `terraform-aws-ci`: `v0.41.0` =&gt; `v0.50.0`
- `terraform-aws-service-catalog`: `v0.85.0` =&gt; `v0.92.0`
- `terraform-aws-security`: `v0.62.3` =&gt; `v0.65.6`
- `steampipe`: `v0.13.6` =&gt; `v0.15.0`



This release updates the default version of `steampipe` that is installed into the docker container. If you wish to keep the old version of `steampipe` for stability reasons, you can pass in the arg `--build-arg steampipe_version=v0.13.6` when building the docker container.


This release is functionally equivalent and backward compatible with the previous release, but we are marking this as backward incompatible out of caution due to the platform version change in ECS for the ECS Deploy Runner. We recommend rebuilding containers and updating the`infrastructure-deployer` tool to `terraform-aws-ci` version `v0.50.0` when rolling out the update.

</div>



## terraform-aws-cis-service-catalog


### [v0.35.3](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.35.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/30/2022 | Modules affected: landingzone/account-baseline-root, landingzone/account-baseline-security, landingzone/account-baseline-app, observability/cloudtrail | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.35.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fixed bug where CloudWatch could not access the SNS Topic for the log metric filters when they are encrypted with KMS.




</div>


### [v0.35.2](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.35.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/30/2022 | Modules affected: landingzone/account-baseline-app, landingzone/account-baseline-security, security/aws-securityhub | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.35.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Added a new option `enable_cis_check` (`security_hub_enable_cis_check` in `landingzone` modules) which can be used to disable the CIS standards check in AWS SecurityHub. These are enabled by default to preserve current behavior. DIsabling them is useful if you are using another tool to run the checks, such as Steampipe.





</div>


### [v0.35.1](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.35.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/28/2022 | Modules affected: security/cleanup-expired-certs, networking/vpc-app-network-acls, networking/vpc-mgmt-network-acls, observability/cloudwatch-logs-metric-filters | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.35.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Updated dependencies:
    - `terraform-aws-lambda`: `v0.16.0` =&gt; `v0.19.3`
    - `terraform-aws-vpc`: `v0.21.1` =&gt; `v0.22.1`
    - `terraform-aws-monitoring`: `v0.33.3` =&gt; `v0.34.1`
    - `terraform-aws-security`: `v0.64.1` =&gt; `v0.65.6`
    - `terraform-aws-service-catalog`: `v0.86.1` =&gt; `v0.90.7`
- Updated examples and test dependencies:
    - `terraform-aws-utilities`: `v0.6.0` =&gt; `v0.9.0`
    - `terraform`: `1.1.4` =&gt; `1.2.3`
    - `terragrunt`: `v0.36.0` =&gt; `v0.38.1`
    - Various go dependencies.

NOTE: Many dependencies were updated across backward incompatible versions, but all the backward incompatibilities have been confirmed not to affect the modules in this repo.



</div>



## terraform-aws-data-storage


### [v0.23.5](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.23.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/17/2022 | Modules affected: backup-vault, backup-plan, rds | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.23.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Updated `backup-plan` to attach S3 backup and restore policies to the Vault.
- Added the ability to specify custom access policies for the Backup Vault. This is useful for configuring cross account access.



</div>



## terraform-aws-ecs


### [v0.33.2](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.33.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/13/2022 | Modules affected: ecs-service | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.33.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Added variable `listener_rule_ids` to make sure that external listeners are created before ECS service








</div>



## terraform-aws-eks


### [v0.52.0](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.52.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/27/2022 | Modules affected: eks-cluster-workers, eks-cloudwatch-agent | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.52.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- Added the ability to restrict IMDS on self managed workers. Additionally, the launch template is now updated to restrict the service to require tokens by default (IMDS v2).


</div>


### [v0.51.6](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.51.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/17/2022 | Modules affected: eks-cluster-control-plane | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.51.6">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Added better support for Windows to the `local-exec` calls in the `eks-cluster-control-plane` module.




</div>


### [v0.51.5](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.51.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/7/2022 | Modules affected: eks-cluster-managed-workers | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.51.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Added the ability to mirror the tags applied to Managed Node Groups to the underlying ASGs. Note that this feature depends on an assumption that there is only one ASG per MNG to work around an issue with Terraform `for_each` and `count`. If your environment has more than one ASG mapped to the MNG, then it is recommended to call the `aws_autoscaling_group_tag` resource outside the `eks-cluster-managed-workers` module.



</div>



## terraform-aws-lambda


### [v0.19.3](https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.19.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/16/2022 | Modules affected: run-lambda-entrypoint | <a href="https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.19.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Updated `run-lambda-entrypoint` to support wrapping the entrypoint call in the Runtime Interface Emulator for local testing. Note that you only need to use this feature if you are using a distroless container image for the Lambda function.




</div>


### [v0.19.2](https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.19.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/10/2022 | Modules affected: lambda | <a href="https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.19.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  





</div>


### [v0.19.1](https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.19.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/1/2022 | Modules affected: run-lambda-entrypoint | <a href="https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.19.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
Updated release pipeline to build and publish `run-lambda-entrypoint`.



</div>



## terraform-aws-load-balancer


### [v0.28.3: Additional secondary certificates for ALB](https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.28.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/27/2022 | Modules affected: alb | <a href="https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.28.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Added support for attaching additional secondary certificates to the ALB listeners.




</div>



## terraform-aws-monitoring


### [v0.34.1](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.34.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/21/2022 | Modules affected: logs/log-filter-to-slack | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.34.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- **Unlock AWS Provider v4. Require minimum 3.75.1.** In https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.34.0, we missed a spot! This updates `logs/log-filter-to-slack` module with the same minimum version of 3.75.1, with no upper limit. See the [previous release notes](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.34.0) for details.





</div>


### [v0.34.0](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.34.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/20/2022 | Modules affected: alarms, logs, metrics | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.34.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Small fix for `TestRdsAlarms` test.
- **Unlock AWS provider v4. Require minimum 3.75.1.** This update includes a few tests that make sure upgrading to this module from the last release is easy. However, you may need to bump your AWS provider version. See the migration guide notes below for more.




</div>


### [v0.33.5](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.33.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/14/2022 | Modules affected: logs/load-balancer-access-logs | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.33.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- Updated dependency `terraform-aws-security` from `v0.65.2` to `v0.65.5`.
- Exposed the ability to hook to the access logs S3 Bucket being fully configured in the `logs/load-balancer-access-logs` module. This is useful for ensuring the S3 Bucket configuration is set up to support linking to AWS ELB.




</div>


### [v0.33.4](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.33.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/1/2022 | Modules affected: logs | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.33.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Data source update: use aws_subnets over aws_subnet_ids
- Update terraform-aws-security/private-s3-bucket to v0.65.2



</div>



## terraform-aws-openvpn


### [v0.24.1](https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.24.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/2/2022 | Modules affected: openvpn-server | <a href="https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.24.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Bump target terraform to 1.2
- Allow specifying a prefix for the openvpn server backup bucket server logs



</div>



## terraform-aws-security


### [v0.65.6](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.65.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/15/2022 | Modules affected: kms-cmk-replica, private-s3-bucket | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.65.6">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Removed hard-coded AWS Partitions from ARNs. Now the partition is dynamically computed based on the configured provider.



</div>


### [v0.65.5](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.65.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/14/2022 | Modules affected: private-s3-bucket | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.65.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Add option to enable delete_marker_replication in the replication config



</div>


### [v0.65.4](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.65.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/8/2022 | Modules affected: private-s3-bucket | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.65.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Added a new output to `private-s3-bucket` that can be used to chain resources to the bucket being fully configured without using module `depends_on` (which has quirks that can lead to perpetual diffs). The primary use case would be when you are configuring an object upload in the same module that is creating the bucket, you would want to make sure all the configuration options are set on the bucket before uploading the first object.





</div>


### [v0.65.3](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.65.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/6/2022 | Modules affected: aws-config, cloudtrail, cross-account-iam-roles, private-s3-bucket | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.65.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Added `.` to all permissions boundary variable descriptions
- Addressed deprecation warning for `object_lock_configuration` on private s3 bucket.
- Added `object_lock_configuration` to the lifecycle `ignore_changes` to avoid perpetual diff.



</div>



## terraform-aws-server


### [v0.14.6](https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.14.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/27/2022 | Modules affected: single-server | <a href="https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.14.6">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Added `host_id` var to `aws_instance` resource that will allow it to be created on a dedicated EC2 host.





</div>


### [v0.14.5](https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.14.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/22/2022 | Modules affected: single-server | <a href="https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.14.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Feature: add `get_password_data` parameter



</div>



## terraform-aws-service-catalog


### [v0.93.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.93.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/30/2022 | Modules affected: base/ec2-baseline, services/ec2-instance, services/k8s-service, mgmt/bastion-host | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.93.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Added support for deploying `k8s-service` in [headless mode](https://kubernetes.io/docs/concepts/services-networking/service/#headless-services).
- Updated `default` user-data scripts to prefix the filename with `_` so that it is run first.


</div>


### [v0.92.1](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.92.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/29/2022 | Modules affected: landingzone/account-baseline-app, landingzone/account-baseline-security | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.92.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Added support for making GuardDuty optional in `account-baseline` modules via the `enable_guardduty` variable. This is useful when setting up org level GuardDuty access.


</div>


### [v0.92.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.92.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/29/2022 | Modules affected: mgmt/ecs-deploy-runner, base/ec2-baseline, mgmt/jenkins, mgmt/bastion-host | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.92.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Added support for binding additional TLS/ACM certificates to an ALB, via the new `additional_ssl_certs_for_ports` input variable.
- Updated dependencies:
    - `terraform-aws-lambda`: `v0.19.2` to `v0.19.3`
    - `terraform-aws-security`: `v0.65.5` to `v0.65.6`
    - `terraform-aws-data-storage`: `v0.23.4` to `v0.23.5`
    - `terraform-aws-utilities`: `v0.8.0` to `v0.9.0`
    - `terraform-aws-monitoring`: `v0.33.5` to `v0.34.1`
    - `terraform-aws-vpc`: `v0.21.1` to `v0.22.1`
    - `terraform-aws-ci`: `v0.49.1` to `v0.50.0`
    - `terraform-aws-server`: `v0.14.4` to `v0.14.6`
    - `terraform-aws-load-balancer`: `v0.28.2` to `v0.28.3`
    - `helm-kubernetes-services`: `v0.2.12` to `v0.2.13`


</div>


### [v0.91.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.91.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/28/2022 | Modules affected: services/eks-cluster, services/eks-workers, services/eks-core-services, services/k8s-service | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.91.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Added the ability to restrict IMDS on EKS workers (self managed and managed node groups). Additionally, the launch template is now updated to restrict the service to require tokens by default (IMDS v2).


</div>


### [v0.90.8](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.90.8)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/27/2022 | Modules affected: services, data-stores | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.90.8">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fix variable description typos
- Add `var.preferred_backup_window` to aurora module 



</div>


### [v0.90.7](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.90.7)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/23/2022 | Modules affected: services/public-static-website | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.90.7">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Updated `public-static-website` to support restricting access to S3 Bucket to only CloudFront. This will make the S3 Bucket private instead of public. Note that this is only supported if the private bucket is deployed in `us-east-1`.




</div>


### [v0.90.6](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.90.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/23/2022 | Modules affected: landingzone/account-baseline-root, landingzone/account-baseline-app, landingzone/account-baseline-security | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.90.6">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Exposed the ability to add service principals to the Cloudtrail key.



</div>


### [v0.90.5](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.90.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/21/2022 | Modules affected: mgmt/jenkins, services/eks-core-services, services/k8s-service | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.90.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Locked version of `helm` provider to `&lt; 2.6.0` to work around an issue with the client authentication token. Refer to https://github.com/gruntwork-io/knowledge-base/discussions/478 for more information.
- Updated the default version of tools installed in `jenkins`:
    - Terraform: `v1.2.2` =&gt; `v1.2.3`
    - Terragrunt: `v0.37.1` =&gt; `v0.37.4`
- Updated test dependencies.




</div>


### [v0.90.4](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.90.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/17/2022 | Modules affected: services/ecs-cluster, services/ecs-service, services/eks-cluster, services/public-static-website | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.90.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Exposed EKS Add-ons Variables
- Update various dependencies:
    - `terraform-aws-ecs`: `v0.33.1` to `v0.33.2`
    - `terraform-aws-static-assets`: `v0.15.3` to `v0.15.5`
    - `terraform-aws-lambda`: `v0.19.1` to `v0.19.2`



</div>


### [v0.90.3](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.90.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/16/2022 | Modules affected: services, networking | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.90.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Prefix base_domain_name references with var so that docs.gruntwork.io properly renders it.
- Exposed variables to specify a custom s3 bucket for alb logs.



</div>


### [v0.90.2](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.90.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/16/2022 | Modules affected: networking/vpc, services/eks-cluster, services/eks-core-services, services/eks-workers | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.90.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Updated dependency `terraform-aws-eks` from `v0.51.4` to `v0.51.5`
- Exposed the ability to mirror tags on Managed Node Groups to the associated Auto Scaling Group.



</div>


### [v0.90.1](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.90.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/15/2022 | Modules affected: mgmt/bastion-host, mgmt/openvpn-server, mgmt/jenkins, mgmt/tailscale-subnet-router | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.90.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Updated `eks-workers` and `eks-cluster` to support log aggregation of server system logs (`syslog` and `auth` logs). This is different from the log aggregation managed by `fluent-bit`, which ships container level logs. To enable, set `enable_cloudwatch_log_aggregation = true` in the `eks-workers` module call (or `enable_worker_cloudwatch_log_aggregation` in `eks-cluster`).
- All packer templates have been updated to require `amazon` plugin version at least `1.0.6`.




</div>


### [v0.90.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.90.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/15/2022 | Modules affected: services/public-static-website, mgmt/jenkins, services/asg-service, base/ec2-baseline | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.90.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fixed bug where `alb` module may sometimes fail deploys due to race conditions in the S3 bucket.
- Updated the default version of Tailscale that is installed from `v1.24.0` to `v1.26.0`. This is a backward compatible version update, and is compatible with older client versions of Tailscale.
- Exposed the ability to configure security response headers in the CloudFront distribution for the `public-static-website` module.
- Exposed the ability to link Lambda@Edge functions with the CloudFront distribution.
- Updated URL in documentation for AWS Load Balancer Controller Ingress Annotations.
- Updated dependencies:
    - `terraform-aws-messaging`: `v0.8.1` to `v0.8.2`
    - `terraform-aws-monitoring`: `v0.33.3` to `v0.33.5`
    - `terraform-aws-asg`: `v0.17.6` to `v0.18.1`
    - `terraform-aws-ci`: `v0.48.1` to `v0.49.1`
    - `terraform-aws-security`: `v0.65.4` to `v0.65.5`



</div>


### [v0.89.4](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.89.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/14/2022 | Modules affected: base/ec2-baseline, data-stores/rds, data-stores/s3-bucket, landingzone/account-baseline-app | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.89.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Updated dependency `terraform-aws-security` from `v0.64.1` to `v0.65.2`




</div>


### [v0.89.3](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.89.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/7/2022 | Modules affected: services/public-static-website | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.89.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Exposed parameter in `public-static-websites` to prevent perpetual diff in older AWS Accounts.
- Exposed `forward_headers` parameter in `public-static-websites`.




</div>


### [v0.89.2](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.89.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/7/2022 | Modules affected: services/ec2-instance, services/ecs-cluster, services/eks-workers, services/public-static-website | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.89.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Updated documentation for VPC filter in `ec2-instance.pkr.hcl` packer template.
- Added support for specifying the AWS Organizations and AWS Organizations Unit access for AMI access in all packer templates.
- Updated dependency `terraform-aws-static-assets` from `v0.15.1` to `v0.15.2`



</div>


### [v0.89.1](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.89.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/7/2022 | Modules affected: services/ecs-cluster, services/public-static-website, mgmt/openvpn-server, data-stores/ecr-repos | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.89.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Added the ability to configure the IMDS settings for EC2 Instances used as ECS workers in the `ecs-cluster` module.
- Exposed the ability to configure minimum protocol version for viewer certificates in the public-static-website module.
- Exposed the `artifact_config` variable in the `ecs-deploy-runner` module.
- Added `ecr:ListImages` to the list of IAM Permissions for read access in `ecr-repos`
- Exposed the `cors_rule` variable in the `public-static-website` module
- Updated dependencies:
    - `terraform-aws-openvpn`: `v0.23.1` to `v0.24.1`
    - `terraform-aws-static-assets`: `v0.14.1` to `v0.15.1`



</div>


### [v0.89.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.89.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/2/2022 | Modules affected: services/ecs-service, mgmt/jenkins, services/public-static-website, base/ec2-baseline | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.89.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Updated module dependencies:
    - `terraform-aws-lambda`: `0.18.4` =&gt; `v0.19.1`
    - `terraform-aws-data-storage`: `v0.23.3` =&gt; `v0.23.4`
    - `terraform-aws-eks`: `v0.51.2` =&gt; `v0.51.4`
    - `terraform-aws-ci`: `v0.47.10` =&gt; `v0.48.1`
    - `terraform-aws-server`: `v0.14.2` =&gt; `v0.14.4`
    - `terraform-aws-ecs`:  `v0.32.1` =&gt; `v0.33.1`
    - (example only) `terraform-aws-utilities`: `v0.7.0` =&gt; `v0.8.0`
- Updated the default version of tools installed in Jenkins:
    - `terragrunt` to `v0.37.1`
    - `terraform` to `v1.2.2`
    - `packer` to `v1.8.1`
    - `helm` to `v3.9.0`
- Updated various test dependencies.
- Added support for configuring error responses in Cloudfront for the `public-static-website` module. This also defaults to serving `404` error responses from a root document `404.html`, and `500` responses from a root document `500.html`.


</div>



## terraform-aws-static-assets


### [v0.15.5](https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.15.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/16/2022 | Modules affected: s3-static-website | <a href="https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.15.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

Added a new output to indicate the S3 Bucket is fully configured. This is useful for ensuring the Bucket is ready to link to CloudFront prior to setting up the CloudFront Distribution.





</div>


### [v0.15.4](https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.15.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/16/2022 | Modules affected: s3-static-website | <a href="https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.15.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fixed an outdated reference in a variable description.
- In the `s3-static-website` module, we fixed a bug in how `routing_rule` is parsed.




</div>


### [v0.15.3](https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.15.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/14/2022 | Modules affected: s3-cloudfront | <a href="https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.15.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Exposed  the `response_headers_policy_id` attribute of the `aws_cloudfront_distribution` resource so that one could attach a custom response header policy to the CloudFront Distribution.




</div>


### [v0.15.2](https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.15.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/7/2022 | Modules affected: s3-cloudfront, s3-static-website | <a href="https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.15.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fixed bug where the S3 bucket configuration flip flopped due to missing lifecycle ignore rules.




</div>


### [v0.15.1](https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.15.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/2/2022 | Modules affected: s3-cloudfront, s3-static-website | <a href="https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.15.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

Updated dependency `terraform-aws-security` to `v0.65.2`.




</div>



## terraform-aws-utilities


### [v0.9.0](https://github.com/gruntwork-io/terraform-aws-utilities/releases/tag/v0.9.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/20/2022 | Modules affected: instance-type, request-quota-increase | <a href="https://github.com/gruntwork-io/terraform-aws-utilities/releases/tag/v0.9.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Updated the CircleCI config (internal to this repo only).
- **Unlocked AWS provider v4. Require minimum 3.75.1.** This update includes a few upgrade tests that make sure upgrading to this module from the last release is easy. However, you may need to bump your AWS provider version. See the migration guide notes below for more.


</div>



## terraform-aws-vpc


### [v0.22.1](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.22.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/21/2022 | Modules affected: vpc-app, vpc-mgmt | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.22.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Removed `aws_region` variable requirement. Now the region is derived from the provider configuration.




</div>


### [v0.22.0](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.22.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/20/2022 | Modules affected: network-acl-inbound, network-acl-outbound, vpc-app-network-acls, vpc-app | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.22.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Internal updates (PR template and patches)
- **Unlocked AWS provider v4, requiring minimum 3.75.1.** This update includes a few tests that make sure upgrading to this module from the last release is easy. However, you may need to bump your AWS provider version. See the migration guide notes below for more.


</div>

<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "releases",
  "hash": "a788fd224eed2288c149422a32e241cd"
}
##DOCS-SOURCER-END -->

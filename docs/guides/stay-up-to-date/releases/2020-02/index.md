
# Gruntwork release 2020-02

<p style={{marginTop: "-25px"}}><small><a href="/guides">Guides</a> / <a href="/guides/stay-up-to-date">Update Guides</a> / <a href="/guides/stay-up-to-date/releases">Releases</a> / 2020-02</small></p>

This page is lists all the updates to the [Gruntwork Infrastructure as Code
Library](https://gruntwork.io/infrastructure-as-code-library/) that were released in 2020-02. For instructions
on how to use these updates in your code, check out the [updating
documentation](/library/stay-up-to-date/updating).

Here are the repos that were updated:

- [gruntwork](#gruntwork)
- [terraform-aws-asg](#terraform-aws-asg)
- [terraform-aws-cache](#terraform-aws-cache)
- [terraform-aws-ci](#terraform-aws-ci)
- [terraform-aws-cis-service-catalog](#terraform-aws-cis-service-catalog)
- [terraform-aws-data-storage](#terraform-aws-data-storage)
- [terraform-aws-ecs](#terraform-aws-ecs)
- [terraform-aws-eks](#terraform-aws-eks)
- [terraform-aws-lambda](#terraform-aws-lambda)
- [terraform-aws-load-balancer](#terraform-aws-load-balancer)
- [terraform-aws-mongodb](#terraform-aws-mongodb)
- [terraform-aws-monitoring](#terraform-aws-monitoring)
- [terraform-aws-security](#terraform-aws-security)
- [terraform-aws-vpc](#terraform-aws-vpc)


## gruntwork


### [v0.1.2](https://github.com/gruntwork-io/gruntwork/releases/tag/v0.1.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/28/2020 | <a href="https://github.com/gruntwork-io/gruntwork/releases/tag/v0.1.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

</div>



## terraform-aws-asg


### [v0.8.5](https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.8.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/26/2020 | Modules affected: **No changes to underlying modules** | <a href="https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.8.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Update CircleCi Packer from 1.3.3 to 1.5.4 

The Packer template used to generate machine images now uses the `clean_resource_name` function when generating the artifact&apos;s image name (changed from `clean_ami_name`). Note that the `clean_ami_name` function was deprecated in Packer&apos;s [1.5.0 release](https://github.com/hashicorp/packer/blob/master/CHANGELOG.md#150-december-18-2019).



</div>


### [v0.8.4](https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.8.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/20/2020 | Modules affected: server-group | <a href="https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.8.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- The `server-group` module now exposes a new `user_data_base64` parameter that you can use to pass in Base64-encoded data (e.g., gzipped cloud-init script).



</div>



## terraform-aws-cache


### [v0.9.1](https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v0.9.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/28/2020 | Modules affected: redis | <a href="https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v0.9.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Add count to `var.allow_connections_from_cidr_blocks`.


</div>



## terraform-aws-ci


### [v0.18.1](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.18.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/20/2020 | Modules affected: jenkins-server | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.18.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- You can now configure the health check max retries and time between retries for Jenkins using the new input variables `deployment_health_check_max_retries` and `deployment_health_check_retry_interval_in_seconds`, respectively. Changed the default settings to be ten minutes worth of retries instead of one hour.



</div>


### [v0.18.0](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.18.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/20/2020 | Modules affected: jenkins-server | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.18.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

Made several updates to the `jenkins-server` module:

- Expose a new `user_data_base64` input variable that allows you to pass in Base64-encoded User Data (e.g., such as a gzipped cloud-init script).
- Fixed deprecation warnings with the ALB listener rules.
- Updated the version of the `alb` module used under the hood. This new version no longer sets the `Environment` tag on the load balancer. Therefore, the `jenkins-server` module no longer takes an `environment_name` variable as an input variable, so if you&apos;re upgrading, you&apos;ll need to remove this variable. 



</div>


### [v0.17.0](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.17.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/18/2020 | Modules affected: infrastructure-deploy-script, ecs-deploy-runner, ecs-deploy-runner-invoke-iam-policy, infrastructure-deployer | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.17.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

This release introduces the ECS Deploy Runner stack, a collection of CLI utilities, modules, and scripts that can be used for implementing a secure Terraform / Terragrunt CI/CD pipeline. Refer to [the overview documentation](https://github.com/gruntwork-io/module-ci/blob/master/README-Terraform-Terragrunt-Pipeline.adoc) for more details. The following is a summary of the components:

- `infrastructure-deploy-script`: A python script that can be used to run `terraform` or `terragrunt` on a module stored in a git repository.
- `ecs-deploy-runner`: A terraform module to manage the ECS Deploy Runner stack. This module contains a `Dockerfile` for a docker container with the `infrastructure-deploy-script` and deploys an ECS task definition to run the container on ECS Fargate with an AWS Lambda function that exposes a minimal interface to invoke the deployment task.
- `ecs-deploy-runner-invoke-iam-policy`: A terraform module to manage an IAM policy that grants the minimal permissions necessary to invoke the ECS Deploy Runner Invoker Lambda function.
- `infrastructure-deployer`: A CLI utility to invoke and stream the logs of a deployment running in the ECS Deploy Runner stack.

This release also adds a new script to the `terraform-helpers` module, `git-updated-folders`, which can be used to get a list of all the folders that were updated between two git refs (branch, tag, or SHA).



</div>


### [v0.16.6: Remove -t flag from go get](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.16.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/4/2020 | Modules affected: gruntwork-module-circleci-helpers | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.16.6">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

When running with `-t`, `go get` will pull versions of packages that might
be needed for testing but not for the functionality of the dependency
that uses it. This can break our tests when those versions have
incompatibilities.



</div>



## terraform-aws-cis-service-catalog


### [v0.4.0](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.4.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/4/2020 | Modules affected: aws-securityhub, aws-config | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.4.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

`aws-config` has been migrated to `module-security` as the module `aws-config-multi-region`. If you were using the `aws-config` module before, replace with the URL to `module-security`. See the migration guide for more details.

As a result of this change, both `aws-config-multi-region` and `aws-securityhub` has been enhanced with a new input variable `opt_in_regions` which allows you to restrict what regions AWS Config and SecurityHub are enabled in.


</div>



## terraform-aws-data-storage


### [v0.12.3](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.12.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/28/2020 | Modules affected: rds | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.12.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Make `var.allow_connections_from_cidr_blocks` optional.


</div>


### [v0.12.2](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.12.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/26/2020 | Modules affected: rds, aurora | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.12.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Add the ability to enable [Performance Insights](https://aws.amazon.com/rds/performance-insights/) in the `rds` module.
- Add `copy_tags_to_snapshot` support to the `rds` module.
- Add `copy_tags_to_snapshot` support to the `aurora` module.


</div>


### [v0.12.1](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.12.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/19/2020 | Modules affected: rds | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.12.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Add the ability to enable `deletion_protection` in the `rds` module.


</div>


### [v0.12.0](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.12.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/7/2020 | Modules affected: rds, aurora | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.12.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Allow specifying the Certificate Authority (CA) bundle to use in the `aurora` module via the `ca_cert_identifier` input variable.
- Update the `ca_cert_identifier` input variable in the `rds` module to set the default to `null` instead of hard-coding it to `rds-ca-2019`. This means this module (and the `aurora` module) will now use whatever default is set by the underlying RDS resources in the AWS provider. This is why this release is marked as backwards incompatible.


</div>


### [v0.11.5](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.11.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/6/2020 | Modules affected: aurora | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.11.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- You can now configure backtracking (in-place, destructive rollback to a previous point-in-time) on Aurora clusters using the `backtrack_window` variable. 


</div>



## terraform-aws-ecs


### [v0.17.3](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.17.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/20/2020 | Modules affected: ecs-service | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.17.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

Add `logs:CreateLogGroup` to the IAM permissions for the ECS task execution role. This is necessary for ECS to create a new log group if the configured log group does not already exist.



</div>


### [v0.17.2](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.17.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/19/2020 | Modules affected: ecs-service | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.17.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

The `ecs-service` module now exposes `task_role_permissions_boundary_arn` and `task_execution_role_permissions_boundary_arn` input parameters that can be used to set permission boundaries on the IAM roles created by this module.



</div>



## terraform-aws-eks


### [v0.15.1](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.15.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/22/2020 | Modules affected: eks-cluster-control-plane | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.15.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

The `clean_up_cluster_resources` script now cleans up residual security groups from the ALB ingress controller.



</div>


### [v0.15.0](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.15.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/7/2020 | Modules affected: eks-k8s-external-dns, eks-k8s-cluster-autoscaler, eks-cloudwatch-container-logs, eks-alb-ingress-controller | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.15.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

The IAM Role for Service Accounts (IRSA) input variables for the application modules (`eks-k8s-external-dns`, `eks-k8s-cluster-autoscaler`, `eks-cloudwatch-container-logs`, and `eks-alb-ingress-controller`) are now required. Previously, we defaulted `use_iam_role_for_service_accounts` to true, but this meant that you needed to provide two required variables `eks_openid_connect_provider_arn` and `eks_openid_connect_provider_url`. However, these had defaults of empty string and do not cause an error in the terraform config, which means that you would have a successful deployment even if they weren&apos;t set. This can be confusing because each of these services will silently fail since they will not have access to the AWS resources they need to manage. Starting this release the IRSA input variables have been consolidated to a single required variable `iam_role_for_service_accounts_config`.



</div>



## terraform-aws-lambda


### [v0.7.3](https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.7.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/26/2020 | Modules affected: lambda | <a href="https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.7.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

You can now set the permissions boundary on the IAM role created for the lambda function.



</div>


### [v0.7.2](https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.7.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/26/2020 | Modules affected: lambda-edge, keep-warm | <a href="https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.7.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Bump all examples and modules to use nodejs12.x as the runtime, as 6.x and 8.x have been deprecated.



</div>



## terraform-aws-load-balancer


### [v0.17.0](https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.17.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/19/2020 | Modules affected: alb | <a href="https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.17.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- The `alb` module no longer exposes an `environment_name` input variable. This variable was solely used to set an `Environment` tag on the load balancer. To upgrade to this version, you will need to remove the `environment_name` parameter from your code. If you wish to maintain the tag for backwards compatibility, set it in the `custom_tags` parameter as follows:

    ```hcl
    custom_tags = &#x7B;
      Environment = &quot;whatever value you were setting for environment_name before&quot;
    &#x7D; 
    ```




</div>


### [v0.16.4: Fixes index issue in alb outputs](https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.16.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/4/2020 | Modules affected: alb | <a href="https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.16.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
* `alb`


This release fixes a bug in `outputs.tf` when removing a port from a listener. The call to `zipmap()` was not taking in to account removed ports, resulting in an error. We now use `slice()` to match the remaining ports to the ARNs.




</div>



## terraform-aws-mongodb


### [v0.4.1](https://github.com/gruntwork-io/terraform-aws-mongodb/releases/tag/v0.4.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/26/2020 | <a href="https://github.com/gruntwork-io/terraform-aws-mongodb/releases/tag/v0.4.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- We now use the Ubuntu 18.04 base AMI for the test server
- Fixed several broken links
- Updates to CODEOWNERS
- Officially deprecated this repo



</div>



## terraform-aws-monitoring


### [v0.18.3](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.18.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/27/2020 | Modules affected: metrics/cloudwatch-custom-metrics-iam-policy, logs/cloudwatch-log-aggregation-iam-policy | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.18.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Added a `create_resources` input variable to `cloudwatch-custom-metrics-iam-policy` so you can turn the module on and off (this is a workaround for Terraform not supporting `count` in `module`). 
- The `cloudwatch-custom-metrics-iam-policy` and `cloudwatch-log-aggregation-iam-policy` modules now output the JSON for the policies they create. This allows you to set `create_resources = false` to not create the standalone IAM policies and instead, add the JSON from those policies to an IAM entity of your choice (e.g., an IAM role).



</div>


### [v0.18.2](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.18.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/23/2020 | Modules affected: logs/cloudwatch-log-aggregation-scripts | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.18.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fix bug in the `run-cloudwatch-logs-agent.sh` where the first argument passed to `--extra-log-files` was being skipped. 


</div>


### [v0.18.1](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.18.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/21/2020 | Modules affected: logs/cloudwatch-log-aggregation-scripts | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.18.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Correct the docs and usage instructions for the `cloudwatch-log-aggregation-scripts` module to correctly indicate that `--log-group-name` is required.



</div>


### [v0.18.0](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.18.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/20/2020 | Modules affected: metrics/cloudwatch-memory-disk-metrics-scripts | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.18.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

The `cloudwatch-memory-disk-metrics` module now creates and sets up a new OS user `cwmonitoring` to run the monitoring scripts as. Previously this was using the user who was calling `gruntwork-install`, which is typically the default user for the cloud (e.g `ubuntu` for ubuntu and `ec2-user` for Amazon Linux). You can control which user to use by setting the module parameter `cron-user`.


</div>


### [v0.17.0](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.17.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/20/2020 | Modules affected: alarms | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.17.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- All the modules under `alarms` now expose a `create_resources` parameter that you can set to `false` to disable the module so it creates no resources. This is a workaround for Terraform not supporting `count` or `for_each` on `module`. Note that this change is backwards incompatible solely because the `route53-health-check-alarms` module already exposed an identical `enabled` parameter, but for consistency with all our other modules and repos, we&apos;ve renamed it to `create_resources`. If you were using this `enabled` parameter on the `route53-health-check-alarms` module, please rename it to `create_resources` now.



</div>


### [v0.16.0](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.16.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/20/2020 | Modules affected: logs/cloudwatch-log-aggregation | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.16.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- The `run-cloudwatch-logs-agent.sh` no longer takes in a `--vpc-name` parameter, which was only used to set a log group name if `--log-group-name` was not passed in. The `--log-group-name` is now required, which is simpler and makes the intent clearer. If you wish to preserve backwards compatibility with the log group name you were using before, set `--log-group-name` to `$&#x7B;vpc_name&#x7D;-ec2-syslog`. 



</div>



## terraform-aws-security


### [v0.25.1](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.25.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/21/2020 | Modules affected: fail2ban | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.25.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

This release fixes a regression in the `fail2ban` module that prevented it from starting up on Amazon Linux 2.



</div>


### [v0.25.0](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.25.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/20/2020 | Modules affected: codegen/generator, iam-users, iam-groups, aws-config-multi-region | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.25.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

This release introduces security baseline modules for AWS Landing Zone with examples of how to configure accounts including setting up AWS Config, AWS CloudTrail, Amazon Guard Duty, IAM users, IAM groups, IAM password policies, and more.

The following additional fixes are also included in this release:
- The codegen generator go library has been updated to use `name_prefix` instead of `name`.
- `aws-config-multi-region` has been updated to use `name_prefix` instead of `name`.


</div>


### [v0.24.1: Fix GuardDuty notification permissions](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.24.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/16/2020 | Modules affected: guardduty, guardduty-multi-region | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.24.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
Previously, CloudWatch did not have the necessary permissions to deliver notifications to SNS. This release sets permissions correctly, and also fixes the associated GuardDuty test.



</div>


### [v0.24.0](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.24.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/3/2020 | Modules affected: kms-master-key | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.24.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- The `kms-master-key` module now exposes a `customer_master_key_spec` variable that allows you to specify whether the key contains a symmetric key or an asymmetric key pair and the encryption algorithms or signing algorithms that the key supports. The module now also grants `kms:GetPublicKey` permissions, which is why this release was marked as &quot;backwards incompatible.&quot;


</div>



## terraform-aws-vpc


### [v0.8.3: Support for ICMP NACL rules](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.8.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/26/2020 | Modules affected: network-acl-outbound, network-acl-inbound | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.8.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
This release adds the `icmp_type` and `icmp_code` variables to the network ACL modules, allowing you to specify ICMP rules.




</div>


### [v0.8.2](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.8.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/26/2020 | Modules affected: vpc-mgmt, vpc-app, _docs, vpc-flow-logs | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.8.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Use route table associations for VPC endpoints

Issue #49 reported a number of errors when reducing `num_availability_zones`. Using the latest version of Terraform I was only able to reproduce one of them related to the VPC endpoint.

```
Error updating VPC Endpoint: InvalidRouteTableId.NotFound
```

This update changes the endpoint route table associates to the [`aws_vpc_endpoint_route_table_association` resource](https://www.terraform.io/docs/providers/aws/r/vpc_endpoint_route_table_association.html), which handles the removal correctly.

- Allow not to create any resource on vpc-flow-logs

Now it&apos;s possible to fully deactivate the `vpc-flow-logs` module passing the variable `create_resources = false`



</div>

<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "releases",
  "hash": "998593ae654be49c14bcea91347ae9b2"
}
##DOCS-SOURCER-END -->


# Gruntwork release 2020-09

<p style={{marginTop: "-25px"}}><small><a href="/guides">Guides</a> / <a href="/guides/stay-up-to-date">Update Guides</a> / <a href="/guides/stay-up-to-date/releases">Releases</a> / 2020-09</small></p>

This page is lists all the updates to the [Gruntwork Infrastructure as Code
Library](https://gruntwork.io/infrastructure-as-code-library/) that were released in 2020-09. For instructions
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
- [terraform-aws-messaging](#terraform-aws-messaging)
- [terraform-aws-monitoring](#terraform-aws-monitoring)
- [terraform-aws-openvpn](#terraform-aws-openvpn)
- [terraform-aws-sam](#terraform-aws-sam)
- [terraform-aws-security](#terraform-aws-security)
- [terraform-aws-server](#terraform-aws-server)
- [terraform-aws-service-catalog](#terraform-aws-service-catalog)
- [terraform-aws-utilities](#terraform-aws-utilities)
- [terraform-aws-vpc](#terraform-aws-vpc)


## terraform-aws-asg


### [v0.11.0](https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.11.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/18/2020 | Modules affected: asg-rolling-deploy, server-group | <a href="https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.11.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- **Terraform 0.13 upgrade**: We have verified that this repo is compatible with Terraform `0.13.x`! 
    - From this release onward, we will only be running tests with Terraform `0.13.x` against this repo, so we recommend updating to `0.13.x` soon! 
    - To give you more time to upgrade, for the time being, all modules will still support Terraform 0.12.26 and above, as that version has several features in it (`required_providers` with `source` URLs) that make it more forwards compatible with `0.13.x`. 
    - Once all Gruntwork repos have been upgrade to work with `0.13.x`, we will publish a migration guide with a version compatibility table and announce it all via the Gruntwork Newsletter.




</div>



## terraform-aws-cache


### [v0.10.1](https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v0.10.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/29/2020 | Modules affected: redis | <a href="https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v0.10.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- You can now restore a Redis cluster from a snapshot using the new `snapshot_name` or `snapshot_arn` input variables.





</div>


### [v0.10.0](https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v0.10.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/28/2020 | Modules affected: (none) | <a href="https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v0.10.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

-  **Terraform 0.13 upgrade**: We have verified that this repo is compatible with Terraform `0.13.x`! 
    - From this release onward, we will only be running tests with Terraform `0.13.x` against this repo, so we recommend updating to `0.13.x` soon! 
    - To give you more time to upgrade, for the time being, all modules will still support Terraform 0.12.26 and above, as that version has several features in it (`required_providers` with `source` URLs) that make it more forwards compatible with `0.13.x`. 
    - Once all Gruntwork repos have been upgrade to work with `0.13.x`, we will publish a migration guide with a version compatibility table and announce it all via the Gruntwork Newsletter. 



</div>



## terraform-aws-ci


### [v0.28.5](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.28.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/30/2020 | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.28.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
This is a maintenance release that exports some test helper functions for the ecs-deploy-runner as a new package under `test/edrhelpers`. This allows the helpers to be used by other projects.





</div>


### [v0.28.4](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.28.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/25/2020 | Modules affected: infrastructure-deploy-script | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.28.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

`infrastructure-deploy-script` now supports running the `refresh` command.



</div>


### [v0.28.3](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.28.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/21/2020 | Modules affected: kubernetes-circleci-helpers | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.28.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Allow non-zero patch versions of Kubernetes (e.g., `1.17.12` vs `1.17.0`) in `setup-minikube`
- Fix bug where existing script was not compatible with newer minikube versions (&gt;`1.0.0`)
- Updated default Kubernetes and minikube versions (`1.17.12` and `1.11.0`).



</div>


### [v0.28.2](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.28.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/14/2020 | Modules affected: ecs-deploy-runner-standard-configuration, ecs-deploy-runner | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.28.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

Adds a new flag, `--idempotent`, to the [`build-docker-image` tool](https://github.com/gruntwork-io/module-ci/blob/6af8f6928af612b04c816ac84016d2b7fd689067/modules/ecs-deploy-runner/docker/kaniko/build_docker_image.go) in the Kaniko image of the ecs-deploy-runner. Invoking the build-docker-image tool with the flag will cause it to check for the existence of an image before building and pushing.

Also adds an optional `route53_tags` to the Jenkins example code, making the example more portable and less specific to Gruntwork&apos;s testing processes.



</div>


### [v0.28.1](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.28.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/3/2020 | Modules affected: ecs-deploy-runner-standard-configuration | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.28.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

This release fixes a major regression bug identified in the previous release (`v0.28.0`), where omitting `allowed_repos_regex` for the `ami_builder` in the `ecs-deploy-runner-standard-configuration` module would inadvertently allow building from any repo.



</div>


### [v0.28.0](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.28.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/2/2020 | Modules affected: ecs-deploy-runner-standard-configuration | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.28.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

You can now specify repo restrictions as regex using `allowed_repos_regex` and `infrastructure_live_repositories_regex` input variables.


</div>



## terraform-aws-data-storage


### [v0.16.1](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.16.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/29/2020 | Modules affected: aurora, rds | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.16.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

Add `lifecycle` block to ignore changes to `snapshot_identifier` so that restored DB clusters won&apos;t get destroyed during updates.



</div>


### [v0.16.0](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.16.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/28/2020 | Modules affected: (none) | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.16.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

-  **Terraform 0.13 upgrade**: We have verified that this repo is compatible with Terraform `0.13.x`! 
    - From this release onward, we will only be running tests with Terraform `0.13.x` against this repo, so we recommend updating to `0.13.x` soon! 
    - To give you more time to upgrade, for the time being, all modules will still support Terraform 0.12.26 and above, as that version has several features in it (`required_providers` with `source` URLs) that make it more forwards compatible with `0.13.x`. 
    - Once all Gruntwork repos have been upgrade to work with `0.13.x`, we will publish a migration guide with a version compatibility table and announce it all via the Gruntwork Newsletter. 






</div>



## terraform-aws-ecs


### [v0.23.0](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.23.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/28/2020 | Modules affected: (none) | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.23.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- **Terraform 0.13 upgrade**: We have verified that this repo is compatible with Terraform `0.13.x`! 
    - From this release onward, we will only be running tests with Terraform `0.13.x` against this repo, so we recommend updating to `0.13.x` soon! 
    - To give you more time to upgrade, for the time being, all modules will still support Terraform 0.12.26 and above, as that version has several features in it (`required_providers` with `source` URLs) that make it more forwards compatible with `0.13.x`. 
    - Once all Gruntwork repos have been upgrade to work with `0.13.x`, we will publish a migration guide with a version compatibility table and announce it all via the Gruntwork Newsletter.





</div>


### [v0.22.0](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.22.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/28/2020 | Modules affected: ecs-daemon-service | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.22.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- When updating this repo to work with AWS Provider 3.x in [v0.21.0](https://github.com/gruntwork-io/module-ecs/releases/tag/v0.21.0), we missed a `required_provider` constraint in the `ecs-daemon-service` module, so it was still pinned to AWS Provider 2.x. This release fixes that.






</div>


### [v0.21.6](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.21.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/28/2020 | Modules affected: ecs-cluster | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.21.6">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Update comment and readme for to reflect current `roll-out-ecs-cluster-update.py` functionality.


</div>


### [v0.21.5](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.21.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/23/2020 | Modules affected: ecs-deploy-check-binaries | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.21.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

Fix bug in the deployment check scripts that made it incompatible with `awsvpc` networking mode on EC2 based ECS clusters.



</div>


### [v0.21.4](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.21.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/16/2020 | Modules affected: ecs-daemon-service | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.21.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- You can now specify the launch type for the `ecs-daemon-service` module via the new `launch_type` input variable.



</div>


### [v0.21.3](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.21.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/1/2020 | Modules affected: ecs-cluster | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.21.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- You can now use the `cluster_asg_metrics_enabled` variable to specify the metrics to collect for the ASG deployed via the `ecs-cluster` module.



</div>



## terraform-aws-eks


### [v0.23.4](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.23.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/29/2020 | Modules affected: eks-cluster-control-plane | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.23.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

Bump the `executable-dependency` module version so that the `kubergrunt` binary that is downloaded properly has `744` permissions.


</div>


### [v0.23.3](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.23.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/26/2020 | Modules affected: eks-aws-auth-merger | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.23.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

You can now optionally turn off the `eks-aws-auth-merger` module using the `create_resources` variable.


</div>


### [v0.23.2](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.23.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/18/2020 | Modules affected: eks-cluster-workers | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.23.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

The `eks-cluster-workers` module will now gracefully handle situations where the IAM role is externally deleted.



</div>


### [v0.23.1](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.23.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/16/2020 | Modules affected: eks-cluster-control-plane, eks-alb-ingress-controller, eks-cloudwatch-container-logs, eks-k8s-cluster-autoscaler | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.23.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

You can now adjust the namespace where the core services are deployed into (`eks-cluster-control-plane`, `eks-alb-ingress-controller`, `eks-cloudwatch-container-logs`, `eks-k8s-cluster-autoscaler`).




</div>


### [v0.23.0](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.23.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/12/2020 | Modules affected: eks-aws-auth-merger, eks-k8s-role-mapping | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.23.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

This release introduces the `eks-aws-auth-merger`, which is an alternative to `eks-k8s-role-mapping` for managing IAM role to RBAC group mappings. This module uses the `aws-auth-merger` tool to watch for `ConfigMaps` in a specified namespace, and merge them together into the `aws-auth` `ConfigMap` at runtime. You can learn more about it in [the module docs](https://github.com/gruntwork-io/terraform-aws-eks/tree/master/modules/eks-aws-auth-merger).



</div>


### [v0.22.2](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.22.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/9/2020 | Modules affected: eks-cluster-workers | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.22.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

The `eks-cluster-wokers` module can now be configured to take in the external dependencies as variables instead of looking the info up dynamically.



</div>


### [v0.22.1](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.22.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/1/2020 | Modules affected: eks-k8s-external-dns, eks-cluster-control-plane | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.22.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

Starting this release we will no longer use `kubergrunt` to get the OIDC provider thumbprint, and instead rely on terraform native functionality.



</div>



## terraform-aws-lambda


### [v0.9.1](https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.9.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/24/2020 | Modules affected: lambda | <a href="https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.9.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- You can now set the new `source_code_hash` input variable to the hash of the zip file you upload to S3 as a way to allow the `lambda`  module to know when that Zip file has changed, and therefore, when the Lambda function needs to be redeployed.



</div>


### [v0.9.0](https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.9.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/18/2020 | Modules affected: keep-warm, lambda-edge, lambda, scheduled-lambda-job | <a href="https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.9.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- **Terraform 0.13 upgrade**: We have verified that this repo is compatible with Terraform `0.13.x`! 
    - From this release onward, we will only be running tests with Terraform `0.13.x` against this repo, so we recommend updating to `0.13.x` soon! 
    - To give you more time to upgrade, for the time being, all modules will still support Terraform 0.12.26 and above, as that version has several features in it (`required_providers` with `source` URLs) that make it more forwards compatible with `0.13.x`. 
    - Once all Gruntwork repos have been upgrade to work with `0.13.x`, we will publish a migration guide with a version compatibility table and announce it all via the Gruntwork Newsletter.







</div>



## terraform-aws-messaging


### [v0.4.0](https://github.com/gruntwork-io/terraform-aws-messaging/releases/tag/v0.4.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/28/2020 | Modules affected: (none) | <a href="https://github.com/gruntwork-io/terraform-aws-messaging/releases/tag/v0.4.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

-  **Terraform 0.13 upgrade**: We have verified that this repo is compatible with Terraform `0.13.x`! 
    - From this release onward, we will only be running tests with Terraform `0.13.x` against this repo, so we recommend updating to `0.13.x` soon! 
    - To give you more time to upgrade, for the time being, all modules will still support Terraform 0.12.26 and above, as that version has several features in it (`required_providers` with `source` URLs) that make it more forwards compatible with `0.13.x`. 
    - Once all Gruntwork repos have been upgrade to work with `0.13.x`, we will publish a migration guide with a version compatibility table and announce it all via the Gruntwork Newsletter. 






</div>


### [v0.3.5](https://github.com/gruntwork-io/terraform-aws-messaging/releases/tag/v0.3.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/15/2020 | Modules affected: sns | <a href="https://github.com/gruntwork-io/terraform-aws-messaging/releases/tag/v0.3.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- You can now allow AWS Services (e.g., `events.amazonaws.com`) permissions to write to your SNS topic using the new `allow_publish_services` input variable.
- Fix a bug where the `topic_policy` output variable used to only return default policy of the SNS topic. It will now return the full topic policy as created by the `sns` module.




</div>



## terraform-aws-monitoring


### [v0.23.1](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.23.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/28/2020 | Modules affected: metrics/cloudwatch-memory-disk-metrics-scripts | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.23.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

This updates `install-cloudwatch-monitoring-scripts.sh` to set cache removal on reboot so that any cached info about the instances are reset on every boot.




</div>


### [v0.23.0](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.23.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/28/2020 | Modules affected: (none) | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.23.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

-  **Terraform 0.13 upgrade**: We have verified that this repo is compatible with Terraform `0.13.x`! 
    - From this release onward, we will only be running tests with Terraform `0.13.x` against this repo, so we recommend updating to `0.13.x` soon! 
    - To give you more time to upgrade, for the time being, all modules will still support Terraform 0.12.26 and above, as that version has several features in it (`required_providers` with `source` URLs) that make it more forwards compatible with `0.13.x`. 
    - Once all Gruntwork repos have been upgrade to work with `0.13.x`, we will publish a migration guide with a version compatibility table and announce it all via the Gruntwork Newsletter. 





</div>


### [v0.22.2](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.22.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/8/2020 | Modules affected: logs/load-balancer-access-logs | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.22.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

-  You can now enable server-side encryption for the S3 bucket used to store load balancer access logs using the new `s3_bucket_encryption` input variable. Note that ALBs and CLBs already encrypt the access logs by default, so this is mainly useful to (a) make sure the bucket reflects this and (b) if you want to enable encryption for NLB access logs. 



</div>



## terraform-aws-openvpn


### [v0.12.0](https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.12.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/28/2020 | Modules affected: openvpn-admin, openvpn-server | <a href="https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.12.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- **Terraform 0.13 upgrade**: We have verified that this repo is compatible with Terraform `0.13.x`! 
    - From this release onward, we will only be running tests with Terraform `0.13.x` against this repo, so we recommend updating to `0.13.x` soon! 
    - To give you more time to upgrade, for the time being, all modules will still support Terraform 0.12.26 and above, as that version has several features in it (`required_providers` with `source` URLs) that make it more forwards compatible with `0.13.x`. 
    - Once all Gruntwork repos have been upgrade to work with `0.13.x`, we will publish a migration guide with a version compatibility table and announce it all via the Gruntwork Newsletter.





</div>


### [v0.11.1](https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.11.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/1/2020 | Modules affected: openvpn-server | <a href="https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.11.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- We now enable server-side encryption by default for the backup S3 bucket. We were enabling encryption whenever uploading data to the bucket already, so this is merely an extra layer of defense to make it harder to ever mess that up.
- Add explicit rules to deny any possible public access for the backup S3 bucket. The bucket was already private by default, so this is also an extra layer of defense to make it harder to mess things up.





</div>



## terraform-aws-sam


### [v0.2.3](https://github.com/gruntwork-io/terraform-aws-sam/releases/tag/v0.2.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/30/2020 | Modules affected: gruntsam | <a href="https://github.com/gruntwork-io/terraform-aws-sam/releases/tag/v0.2.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- `gruntsam` now supports  `OPTIONS` requests.



</div>


### [v0.2.2](https://github.com/gruntwork-io/terraform-aws-sam/releases/tag/v0.2.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/6/2020 | Modules affected: gruntsam | <a href="https://github.com/gruntwork-io/terraform-aws-sam/releases/tag/v0.2.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- You can now set stage variables using the new `stage_variables` input variable.
- You can now customize the lambda permission statement ID using the new `xxx_lambda_permission_statement_id` input variable. This is useful to avoid name conflicts.
- You can now set a qualifier on the lambda permission using the new `xxx_lambda_qualifier` input variable.



</div>



## terraform-aws-security


### [v0.38.4](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.38.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/29/2020 | Modules affected: account-baseline-app, account-baseline-root, account-baseline-security, private-s3-bucket | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.38.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- You can now specify tags to apply to CloudTrail and IAM Role resources created by the `account-baseline-xxx` modules using the new input variables `cloudtrail_tags` and `iam_role_tags`, respectively.
- Fix a minor typo in a comment in `private-s3-bucket`.





</div>


### [v0.38.3](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.38.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/25/2020 | Modules affected: fail2ban | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.38.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

Fix bug where `fail2ban` cloudwatch configuration script used the incorrect command for restarting `fail2ban` on Amazon Linux 1.



</div>


### [v0.38.2](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.38.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/24/2020 | Modules affected: account-baseline-app, account-baseline-root, account-baseline-security | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.38.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- The `account-baseline-xxx` modules now allow you to configure the IAM password policy settings of allowing users to change their own password and whether password expiration requires an admin reset using the new input variables `iam_password_policy_allow_users_to_change_password` and `iam_password_policy_hard_expiry`, respectively. Both default to `true`, as before.



</div>


### [v0.38.1](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.38.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/23/2020 | Modules affected: kms-grant-multi-region, account-baseline-app, account-baseline-security, kms-master-key-multi-region | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.38.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

This release updates the `AWSConfigRole`  managed policy in the `aws-config` and `aws-config-multi-region` modules to the new `AWS_ConfigRole` managed policy due to a deprecation notice from AWS. There are also several updates to stabilize tests and improve the docs.



</div>


### [v0.38.0](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.38.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/21/2020 | Modules affected: account-baseline-root, account-baseline-security, cloudtrail-bucket, cloudtrail | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.38.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

This is a cleanup release that removes several unused variables and fixes a few other small issues.

To update to this release, ensure that your configuration does not set any of the following variables (all of which were unused in the module anyway, likely leftover from previous refactoring):

- `var.enable_cloudtrail` in the `cloudtrail-bucket` module
- `var.name_prefix` in the `ssm-healthchecks-iam-permissions` module
- `cloudtrail_external_aws_account_ids_with_write_access` in the `account-baseline-root` module




</div>


### [v0.37.1](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.37.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/21/2020 | Modules affected: fail2ban | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.37.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

The `configure-fail2ban-cloudwatch.sh` script will now restart `fail2ban` after configuring the cloudwatch metrics actions.



</div>


### [v0.37.0](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.37.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/21/2020 | Modules affected: (none) | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.37.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- **Terraform 0.13 upgrade**: We have verified that this repo is compatible with Terraform `0.13.x`! 
    - From this release onward, we will only be running tests with Terraform `0.13.x` against this repo, so we recommend updating to `0.13.x` soon! 
    - To give you more time to upgrade, for the time being, all modules will still support Terraform 0.12.26 and above, as that version has several features in it (`required_providers` with `source` URLs) that make it more forwards compatible with `0.13.x`. 
    - Once all Gruntwork repos have been upgrade to work with `0.13.x`, we will publish a migration guide with a version compatibility table and announce it all via the Gruntwork Newsletter.






</div>


### [v0.36.11](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.36.11)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/16/2020 | Modules affected: private-s3-bucket | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.36.11">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Added a new `private-s3-bucket` module that can be used to an Amazon S3 bucket that enforces best practices for private access:
    - No public access: all public access is completely blocked.
    - Encryption at rest: server-side encryption is enabled, optionally with a custom KMS key.
    - Encryption in transit: the bucket can only be accessed over TLS.





</div>


### [v0.36.10](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.36.10)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/11/2020 | Modules affected: iam-policies | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.36.10">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

Adds `eks:Describe*` and `eks:List*` permissions to the Read Only IAM policy.



</div>


### [v0.36.9](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.36.9)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/10/2020 | Modules affected: cloudtrail-bucket | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.36.9">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
This release removes the CloudTrail S3 bucket policy from the `aws_s3_bucket `resources. The policy is already attached via a separate `aws_s3_bucket_policy` resource, hence the attachment in the `aws_s3_bucket` was redundant.

Note that you have to double apply this change for terraform to sort it self out. On the first apply, Terraform will remove the bucket policy since it was removed from `aws_s3_bucket`. On the next apply, Terraform will re-add the bucket policy since it realizes that `aws_s3_bucket_policy` now generates a diff.




</div>


### [v0.36.8](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.36.8)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/8/2020 | Modules affected: iam-policies | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.36.8">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

Adds the `rds:Download*` permission to the Read Only policy in the `iam-policies` module.



</div>


### [v0.36.7](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.36.7)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/8/2020 | Modules affected: aws-config-rules | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.36.7">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

Fix a bug in the outputs for `aws-config-rules` introduced by `v0.36.0`.



</div>


### [v0.36.6](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.36.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/4/2020 | Modules affected: ssm-healthchecks-iam-permissions | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.36.6">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

Fixes the ARN for the `AmazonSSMManagedInstanceCore` managed policy, which was previously incorrect.



</div>


### [v0.36.5](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.36.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/3/2020 | Modules affected: aws-auth | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.36.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

Fix regression bug in `aws-auth` where the command broke for MFA token session retrieval without role assume.



</div>


### [v0.36.4](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.36.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/1/2020 | Modules affected: ssm-healthchecks-iam-permissions | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.36.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

replace ssm role with new best practice


</div>



## terraform-aws-server


### [v0.9.0](https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.9.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/18/2020 | Modules affected: ec2-backup, single-server | <a href="https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.9.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- **Terraform 0.13 upgrade**: We have verified that this repo is compatible with Terraform `0.13.x`! 
    - From this release onward, we will only be running tests with Terraform `0.13.x` against this repo, so we recommend updating to `0.13.x` soon! 
    - To give you more time to upgrade, for the time being, all modules will still support Terraform 0.12.26 and above, as that version has several features in it (`required_providers` with `source` URLs) that make it more forwards compatible with `0.13.x`. 
    - Once all Gruntwork repos have been upgrade to work with `0.13.x`, we will publish a migration guide with a version compatibility table and announce it all via the Gruntwork Newsletter.






</div>



## terraform-aws-service-catalog


### [v0.3.3](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.3.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/30/2020 | Modules affected: mgmt, services | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.3.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Update all Packer templates to ensure that they explicitly request a public IP address. Otherwise, if that setting is not enabled by default in a VPC, the Packer build would fail.





</div>


### [v0.3.2](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.3.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/30/2020 | Modules affected: data-stores | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.3.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

Updated underlying module dependencies:

* `gruntwork-io/module-data-storage` to v0.16.1
* `gruntwork-io/module-cache` to v0.10.1






</div>


### [v0.3.1](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.3.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/29/2020 | Modules affected: mgmt/openvpn-server | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.3.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

You can now configure the `--search-domain` option on the OpenVPN server. Note that this includes a change to the user-data script even if no variable inputs are changed, but it will not take down the OpenVPN server on deploy (0-downtime). It is not necessary to rotate the server unless you want to take advantage of the new search domain option.



</div>


### [v0.3.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.3.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/29/2020 | Modules affected: mgmt/openvpn-server, mgmt/bastion-host, mgmt/ecs-deploy-runner, mgmt/jenkins | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.3.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Update user data scripts to invoke EC2 baseline with `cwmonitoring` user included in `ip-lockdown`. Note that this will require rotating the servers. Refer to the migration guide for guidelines on how to rotate the servers for each module.

- Updated underlying module dependencies:
    - `gruntwork-io/terragrunt` to v0.25.1
    - `gruntwork-io/terraform-aws-eks` to v0.23.2
    - `gruntwork-io/module-security` to v0.38.3
    - `gruntwork-io/module-ecs` to v0.23.0
    - `gruntwork-io/terratest` to v0.30.3
    - `gruntwork-io/terraform-aws-vpc` to v0.10.1
    - `gruntwork-io/module-ci` to v0.28.4
    - `gruntwork-io/terraform-aws-eks` to v0.23.3
    - `gruntwork-io/module-cache` to v0.10.0
    - `gruntwork-io/module-data-storage` to v0.16.0
    - `gruntwork-io/package-openvpn` to v0.12.0
    - `gruntwork-io/terraform-aws-monitoring` to v0.23.1



</div>


### [v0.2.8](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.2.8)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/25/2020 | Modules affected: services/k8s-service | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.2.8">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fix bug where the `configmaps_as_env_vars` and `secrets_as_env_vars` variables of `k8s-service` module was the incorrect type.
- Fix bug where the default value of `ingress_path` was incorrectly locked to `/`, and  not any subpath.




</div>


### [v0.2.7](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.2.7)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/24/2020 | Modules affected: base/ec2-baseline, mgmt/openvpn-server, networking/vpc, networking/vpc-mgmt | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.2.7">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- The `openvpn-server` module will now properly initialize the EC2 baseline scripts, which handle initializing server hardening scripts like `fail2ban`, `ip-lockdown`, and `ssh-grunt`.
- The `openvpn-server` now properly handles VPC peering routes.
- The `vpc` module now exposes `num_availability_zones`.
- The `vpc` module now sets up nACL routes for peers when peering is configured.




</div>


### [v0.2.6](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.2.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/21/2020 | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.2.6">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

Reverts the minikube version change introduced in v0.2.5.


</div>


### [v0.2.5](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.2.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/21/2020 | Modules affected: base, data-stores, landingzone, mgmt | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.2.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

Updated the following underlying module dependencies:

- gruntwork-io/terratest to v0.30.0
- gruntwork-io/terraform-aws-vpc to v0.10.0
- gruntwork-io/module-server to v0.9.0
- kubernetes/minikube to v1.13.1
- gruntwork-io/kubergrunt to v0.6.0
- gruntwork-io/module-ci to v0.28.3
- gruntwork-io/module-security to v0.37.1
- gruntwork-io/module-asg to v0.11.0
- helm/helm to v3.3.3






</div>


### [v0.2.4](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.2.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/16/2020 | Modules affected: base, networking, services, data-stores | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.2.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

Updated the following underlying module dependencies:
- `gruntwork-io/bash-commons` to v0.1.3
- `gruntwork-io/terraform-aws-eks` to v0.23.0
- `gruntwork-io/module-security` to v0.36.10
- `gruntwork-io/module-ci` to v0.28.2
- `gruntwork-io/module-ecs` to v0.21.4

Updated documentation and tests:
- Fix bug in running tests for `tls-scripts`
- Add note private endpoints in variable description for `endpoint_public_access`



</div>


### [v0.2.3](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.2.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/9/2020 | Modules affected: base, data-stores, mgmt, networking | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.2.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Renamed underlying modules to the current names. Specifically:
        - `module-aws-monitoring` is now `terraform-aws-monitoring`
        - `module-openvpn` is now `package-openvpn`

- All modules have been adapted for AWS provider v3 compatibility.



</div>


### [v0.2.2](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.2.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/9/2020 | Modules affected: base, data-stores, landingzone, mgmt | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.2.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

This release contains the following updates:
- References to module-security have been bumped to v0.36.8
- A fix for the asg-service when calling ec2-baseline from a particular branch instead of a tag.




</div>


### [v0.2.1](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.2.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/8/2020 | Modules affected: landingzone/account-access | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.2.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Added new `gruntwork-access` module customers can use to grant Gruntwork access to their AWS accounts for the purposes of (a) deploying a Reference Architecture or (b) troubleshooting.
- Added an example of how to use the `gruntwork-access` module with Terragrunt and `account-baseline-root` to create all child accounts for the Reference Architecture and grant Gruntwork access to them in a single `apply`.






</div>


### [v0.2.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.2.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/4/2020 | Modules affected: mgmt, services | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.2.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
This release catches a few dependencies up to the latest version.


</div>


### [v0.1.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.1.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/4/2020 | Modules affected: networking, services, data-stores, landingzone | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.1.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

This release catches up dependencies using the new RenovateBot functionality (see `renovate.json` in the repo root).


</div>



## terraform-aws-utilities


### [v0.3.1](https://github.com/gruntwork-io/terraform-aws-utilities/releases/tag/v0.3.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/28/2020 | Modules affected: executable-dependency | <a href="https://github.com/gruntwork-io/terraform-aws-utilities/releases/tag/v0.3.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

Fix OS permissions that are set on the downloaded binary from the `executable-dependency` module.




</div>


### [v0.3.0](https://github.com/gruntwork-io/terraform-aws-utilities/releases/tag/v0.3.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/17/2020 | Modules affected: executable-dependency, instance-type, join-path, list-remove | <a href="https://github.com/gruntwork-io/terraform-aws-utilities/releases/tag/v0.3.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- **Terraform 0.13 upgrade**: We have verified that this repo is compatible with Terraform `0.13.x`! 
    - From this release onward, we will only be running tests with Terraform `0.13.x` against this repo, so we recommend updating to `0.13.x` soon! 
    - To give you more time to upgrade, for the time being, all modules will still support Terraform 0.12.26 and above, as that version has several features in it (`required_providers` with `source` URLs) that make it more forwards compatible with `0.13.x`. 
   - Once all Gruntwork repos have been upgrade to work with `0.13.x`, we will publish a migration guide with a version compatibility table and announce it all via the Gruntwork Newsletter.
- The `run-pex-as-resource` module no longer supports running code on `destroy`. See the migration guide below for more details.



</div>



## terraform-aws-vpc


### [v0.10.2](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.10.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/29/2020 | Modules affected: vpc-app, vpc-mgmt | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.10.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Add DynamoDB VPC endpoints to the `vpc-mgmt` module. We already had these endpoints in `vpc-app`, but somehow must&apos;ve forgotten to add them to `vpc-mgmt`. 
- Propagate the tags from the `custom_tags` input variable in `vpc-app` and `vpc-mgmt` to all VPC endpoints. This ensures more consistent tagging for all resources created by these modules.






</div>


### [v0.10.1](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.10.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/24/2020 | Modules affected: vpc-app, vpc-mgmt | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.10.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

The VPC modules now gracefully handles `num_availability_zones` values that are greater than the number of AZs in the region.




</div>


### [v0.10.0](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.10.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/18/2020 | Modules affected: network-acl-inbound, network-acl-outbound, vpc-app-network-acls, vpc-app | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.10.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- **Terraform 0.13 upgrade**: We have verified that this repo is compatible with Terraform `0.13.x`! 
    - From this release onward, we will only be running tests with Terraform `0.13.x` against this repo, so we recommend updating to `0.13.x` soon! 
    - To give you more time to upgrade, for the time being, all modules will still support Terraform 0.12.26 and above, as that version has several features in it (`required_providers` with `source` URLs) that make it more forwards compatible with `0.13.x`. 
    - Once all Gruntwork repos have been upgrade to work with `0.13.x`, we will publish a migration guide with a version compatibility table and announce it all via the Gruntwork Newsletter.






</div>


### [v0.9.4](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.9.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/1/2020 | Modules affected: vpc-flow-logs | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.9.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

This is a minor update that fixes a perpetual diff in the `vpc-flow-logs` module caused by the new AWS provider v3 chopping the `:*` off the CloudWatch Logs Group ARN.




</div>

<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "releases",
  "hash": "87d485445beef099b1e35c40ea2ceadf"
}
##DOCS-SOURCER-END -->

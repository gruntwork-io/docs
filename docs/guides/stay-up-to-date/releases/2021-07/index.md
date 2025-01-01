
# Gruntwork release 2021-07

<p style={{marginTop: "-25px"}}><small><a href="/guides">Guides</a> / <a href="/guides/stay-up-to-date">Update Guides</a> / <a href="/guides/stay-up-to-date/releases">Releases</a> / 2021-07</small></p>

This page is lists all the updates to the [Gruntwork Infrastructure as Code
Library](https://gruntwork.io/infrastructure-as-code-library/) that were released in 2021-07. For instructions
on how to use these updates in your code, check out the [updating
documentation](/library/stay-up-to-date/updating).

Here are the repos that were updated:

- [terraform-aws-asg](#terraform-aws-asg)
- [terraform-aws-cache](#terraform-aws-cache)
- [terraform-aws-ci](#terraform-aws-ci)
- [terraform-aws-cis-service-catalog](#terraform-aws-cis-service-catalog)
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
- [terraform-aws-service-catalog](#terraform-aws-service-catalog)
- [terraform-aws-static-assets](#terraform-aws-static-assets)
- [terraform-aws-utilities](#terraform-aws-utilities)
- [terraform-aws-vpc](#terraform-aws-vpc)


## terraform-aws-asg


### [v0.15.0](https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.15.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/23/2021 | Modules affected: asg-rolling-deploy, server-group | <a href="https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.15.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- **Terraform 1.0 upgrade**: We have verified that this repo is compatible with Terraform `1.0.x`! 
    - From this release onward, we will only be running tests with Terraform `1.0.x` against this repo, so we recommend updating to `1.0.x` soon! 
    - To give you more time to upgrade, for the time being, all modules will still support Terraform `0.12.26` and above, as that version has several features in it (`required_providers` with `source` URLs) that make it more forwards compatible with `1.0.x`. 
    - Once all Gruntwork repos have been upgrade to work with `1.0.x`, we will publish a migration guide with a version compatibility table and announce it all via the Gruntwork Newsletter.




</div>


### [v0.14.3](https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.14.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/9/2021 | <a href="https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.14.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Add Terraform validation test that will scan the entire repo for Terraform modules and run `terraform init` and `terraform validate` on each.
- Replace `gofmt` with `goimports`




</div>



## terraform-aws-cache


### [v0.16.0](https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v0.16.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/26/2021 | Modules affected: memcached, redis | <a href="https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v0.16.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  


- **Terraform 1.0 upgrade**: We have verified that this repo is compatible with Terraform `1.0.x`! 
    - From this release onward, we will only be running tests with Terraform `1.0.x` against this repo, so we recommend updating to `1.0.x` soon! 
    - To give you more time to upgrade, for the time being, all modules will still support Terraform `0.15.1` and above, as that version has several features in it (`required_providers` with `source` URLs) that make it more forwards compatible with `1.0.x`. 
    - Once all Gruntwork repos have been upgrade to work with `1.0.x`, we will publish a migration guide with a version compatibility table and announce it all via the Gruntwork Newsletter.




</div>


### [v0.15.1](https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v0.15.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/14/2021 | <a href="https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v0.15.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Add Terraform Validate test
- Replace `gofmt` with `goimports`




</div>



## terraform-aws-ci


### [v0.38.1](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.38.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/28/2021 | Modules affected: ecs-deploy-runner | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.38.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Gracefully handle error messages for starting the deploy runner task




</div>


### [v0.38.0](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.38.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/27/2021 | Modules affected: ec2-backup, ecs-deploy-runner-invoke-iam-policy, ecs-deploy-runner-standard-configuration, ecs-deploy-runner | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.38.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- **Terraform 1.0 upgrade**: We have verified that this repo is compatible with Terraform `1.0.x`! 
    - From this release onward, we will only be running tests with Terraform `1.0.x` against this repo, so we recommend updating to `1.0.x` soon! 
    - To give you more time to upgrade, for the time being, all modules will still support Terraform `0.15.1` and above, as that version has several features in it (`required_providers` with `source` URLs) that make it more forwards compatible with `1.0.x`. 
    - Once all Gruntwork repos have been upgrade to work with `1.0.x`, we will publish a migration guide with a version compatibility table and announce it all via the Gruntwork Newsletter.





</div>


### [v0.37.8](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.37.8)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/22/2021 | Modules affected: ecs-deploy-runner | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.37.8">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Updated default `terraform-aws-ci` version tag used in `deploy-runner` image to use `0.37.2`.



</div>


### [v0.37.7](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.37.7)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/16/2021 | Modules affected: monorepo-helpers, infrastructure-deploy-script | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.37.7">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

Added a new module `monorepo-helpers` that contains scripts that help with adapting CI/CD pipelines for infrastructure code to monorepo setups. These scripts can be used to setup pipelines that only run tests on the infrastructure modules that changed (as opposed to always running all tests on every change). Refer to [the module docs](https://github.com/gruntwork-io/terraform-aws-ci/tree/master/modules/monorepo-helpers) for more info.




</div>


### [v0.37.6](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.37.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/15/2021 | Modules affected: infrastructure-deploy-script, ecs-deploy-runner | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.37.6">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - `infrastructure-deploy-script`
- `ecs-deploy-runner`


- We updated a small comment for better language.
- We made a minor addition to the CODEOWNERS file.
- We bumped some versions so that the ecs-deploy-runner Dockerfile installs newer packages.


- https://github.com/gruntwork-io/terraform-aws-ci/pull/320
- https://github.com/gruntwork-io/terraform-aws-ci/pull/322
- https://github.com/gruntwork-io/terraform-aws-ci/pull/316




</div>


### [v0.37.5](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.37.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/13/2021 | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.37.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Replace `gofmt` with `goimports` in the pre-commit configuration. 





</div>


### [v0.37.4](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.37.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/8/2021 | Modules affected: terraform-helpers | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.37.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

You can now filter in or out deleted folders when calling `git-updated-folders`. This can be used to implement destroy workflows in your pipelines. Refer to [the updated documentation](https://github.com/gruntwork-io/terraform-aws-ci/tree/master/modules/terraform-helpers#deleted-folders) for more information about this feature.



</div>


### [v0.37.3](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.37.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/6/2021 | Modules affected: jenkins-server | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.37.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- You can now enable deletion protection for the ALB that is created for the Jenkins server. 



</div>



## terraform-aws-cis-service-catalog


### [v0.24.0](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.24.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/19/2021 | Modules affected: landingzone/account-baseline-app, landingzone/account-baseline-root, landingzone/account-baseline-security, networking/vpc | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.24.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- We have changed an upstream module that creates S3 buckets to require MFA when performing delete operations. From this release, only the bucket owner that is logged in as AWS root account can enable MFA Delete feature and perform DELETE actions on S3 buckets. This is a more secure default and the one recommended by the CIS AWS Foundations v1.4 benchmark. This is a backwards incompatible change, so please see the migration guide below. This applies to the `cloudtrail`, `aws-config-multi-region` and account baseline modules.
- Dependency updates
  - Update dependency gruntwork-io/terraform-aws-security to v0.50.0
  - Update dependency gruntwork-io/terraform-aws-service-catalog to v0.50.0


</div>


### [v0.23.6](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.23.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/15/2021 | Modules affected: landingzone, security | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.23.6">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Added ability to control password policy variables that CIS has no preference on
- Added validation logic to ensure minimum password length can not be set below 14



</div>


### [v0.23.5](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.23.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/14/2021 | Modules affected: networking | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.23.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fix bug where VPC module did not plumb through the variables for configuring NACL rules for peering.



</div>


### [v0.23.4](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.23.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/13/2021 | Modules affected: observability, landingzone, networking | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.23.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Remove parallelism limit for go tests
- Update CODEOWNERS
- Update dependency gruntwork-io/terraform-aws-monitoring to v0.29.2
- Update dependency gruntwork-io/terraform-aws-service-catalog to v0.44.7
- Replace gofmt with goimports in the pre-commit configuration.




- https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/pull/173
- https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/pull/177
- https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/pull/178
- https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/pull/174
- https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/pull/180



</div>



## terraform-aws-data-storage


### [v0.21.0](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.21.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/27/2021 | Modules affected: aurora, efs, lambda-cleanup-snapshots, lambda-copy-shared-snapshot | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.21.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- **Terraform 1.0 upgrade**: We have verified that this repo is compatible with Terraform `1.0.x`! 
    - From this release onward, we will only be running tests with Terraform `1.0.x` against this repo, so we recommend updating to `1.0.x` soon! 
    - To give you more time to upgrade, for the time being, all modules will still support Terraform `0.15.1` and above, as that version has several features in it (`required_providers` with `source` URLs) that make it more forwards compatible with `1.0.x`. 
    - Once all Gruntwork repos have been upgrade to work with `1.0.x`, we will publish a migration guide with a version compatibility table and announce it all via the Gruntwork Newsletter.




</div>


### [v0.20.5](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.20.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/22/2021 | Modules affected: aurora | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.20.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- You can now allow major version upgrades on the `aurora` module by setting the new `allow_major_version_upgrade` input variable.



</div>


### [v0.20.4](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.20.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/16/2021 | Modules affected: rds | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.20.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

Added ability to set `backup_retention_period` on RDS read replicas via the `replica_backup_retention_period` input variable.




</div>


### [v0.20.3](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.20.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/9/2021 | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.20.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Replace `go fmt` in the pre-commit configuration file with `goimports`





</div>


### [v0.20.2](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.20.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/6/2021 | Modules affected: rds | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.20.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

The `apply_immediately` flag now propagates to the replica instances for the `rds` module. Previously it was only being set on the leader instance.



</div>



## terraform-aws-ecs


### [v0.30.1](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.30.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/26/2021 | Modules affected: ecs-cluster | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.30.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Added ability to configure `associate_public_ip_address` in the Launch Configuration used to manage the ASG for the ECS cluster.



</div>


### [v0.30.0](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.30.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/26/2021 | Modules affected: ecs-cluster, ecs-daemon-service, ecs-service | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.30.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  


- **Terraform 1.0 upgrade**: We have verified that this repo is compatible with Terraform `1.0.x`! 
    - From this release onward, we will only be running tests with Terraform `1.0.x` against this repo, so we recommend updating to `1.0.x` soon! 
    - To give you more time to upgrade, for the time being, all modules will still support Terraform `0.15.1` and above, as that version has several features in it (`required_providers` with `source` URLs) that make it more forwards compatible with `1.0.x`. 
    - Once all Gruntwork repos have been upgrade to work with `1.0.x`, we will publish a migration guide with a version compatibility table and announce it all via the Gruntwork Newsletter.



</div>


### [v0.29.3](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.29.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/15/2021 | Modules affected: ecs-service | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.29.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- A minor update to the CODEOWNERS file.
- We made `load_balancing_algorithm_type` configurable.


</div>


### [v0.29.2](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.29.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/13/2021 | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.29.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Add terraform validate test
- Replace `gofmt` with `goimports`


</div>



## terraform-aws-eks


### [v0.44.0](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.44.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/27/2021 | Modules affected: eks-cluster-control-plane, eks-k8s-cluster-autoscaler | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.44.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- The default Kubernetes version deployed by the control plane module has been updated to `1.21`. If you wish to maintain backward compatibility with your existing setup, you will want to configure the `kubernetes_version` parameter to the version of Kubernetes you are currently using. Note that `1.21` requires kubergrunt version `0.7.3` and above.
- The default cluster-autoscaler version has been updated to `1.21`. If you wish to maintain backward compatibility with your existing setup, you will want to configure the `cluster_autoscaler_version` input variable.



</div>


### [v0.43.0](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.43.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/27/2021 | Modules affected: eks-aws-auth-merger, eks-k8s-role-mapping, eks-cluster-control-plane, eks-alb-ingress-controller-iam-policy | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.43.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Updated `eks-aws-auth-merger` and `eks-k8s-role-mapping` modules to use kubernetes terraform provider version 2.x. You must update your provider configuration to be compatible with version 2.x. Refer to [the official upgrade guide](https://registry.terraform.io/providers/hashicorp/kubernetes/latest/docs/guides/v2-upgrade-guide) for more information.
- **Terraform 1.0 upgrade**: We have verified that this repo is compatible with Terraform `1.0.x`! 
    - From this release onward, we will only be running tests with Terraform `1.0.x` against this repo, so we recommend updating to `1.0.x` soon! 
    - To give you more time to upgrade, for the time being, all modules will still support Terraform `0.15.1` and above, as that version has several features in it (`required_providers` with `source` URLs) that make it more forwards compatible with `1.0.x`. 
    - Once all Gruntwork repos have been upgrade to work with `1.0.x`, we will publish a migration guide with a version compatibility table and announce it all via the Gruntwork Newsletter.




</div>


### [v0.42.3](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.42.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/27/2021 | Modules affected: eks-k8s-cluster-autoscaler | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.42.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Added new variable `pod_resources` which can be used to control the resource allocation for the `cluster-autoscaler`.



</div>


### [v0.42.2](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.42.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/19/2021 | Modules affected: eks-cluster-managed-workers, eks-cluster-workers | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.42.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Added ability to pass in an IAM role ARN directly to avoid depending on a data source in the workers modules, which can be a source of perpetual diffs.




</div>


### [v0.42.1](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.42.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/12/2021 | Modules affected: eks-aws-auth-merger | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.42.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fix RBAC permissions for `aws-auth-merger` so that it can create a new `aws-auth` ConfigMap when it doesn&apos;t exist.



</div>


### [v0.42.0](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.42.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/9/2021 | Modules affected: eks-cluster-workers | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.42.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

Fix undocumented variable `multi_instance_overrides` so you can also set `weighted_capacity`. Also add field to documentation.

Note that this introduces a format change - if you were using `multi_instance_overrides` before, you will need to update your code to use the new format. If you had:

```hcl
  autoscaling_group_configurations = &#x7B;
    asg = &#x7B;
      use_multi_instances_policy = true
      spot_allocation_strategy   = &quot;capacity-optimized&quot;
      multi_instance_overrides   = [&quot;t3.micro&quot;, &quot;t2.micro&quot;]

      # other fields omitted for brevity
    &#x7D;
  &#x7D;
```

Update the `multi_instance_overrides` field to:

```hcl
  autoscaling_group_configurations = &#x7B;
    asg = &#x7B;
      use_multi_instances_policy = true
      spot_allocation_strategy   = &quot;capacity-optimized&quot;
      multi_instance_overrides   = [&#x7B; instance_type = &quot;t3.micro&quot; &#x7D;, &#x7B; instance_type = &quot;t2.micro&quot; &#x7D;]

      # other fields omitted for brevity
    &#x7D;
  &#x7D;
```



</div>


### [v0.41.1](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.41.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/8/2021 | Modules affected: eks-cluster-control-plane, eks-container-logs | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.41.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Add ability to update the aws-for-fluent-bit version that is installed (`var.aws_for_fluent_bit_version`)



</div>



## terraform-aws-lambda


### [v0.13.0](https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.13.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/23/2021 | Modules affected: api-gateway-account-settings, api-gateway-proxy, keep-warm, lambda-edge | <a href="https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.13.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- **Terraform 1.0 upgrade**: We have verified that this repo is compatible with Terraform `1.0.x`! 
    - From this release onward, we will only be running tests with Terraform `1.0.x` against this repo, so we recommend updating to `1.0.x` soon! 
    - To give you more time to upgrade, for the time being, all modules will still support Terraform `0.15.1` and above, as that version has several features in it (`required_providers` with `source` URLs) that make it more forwards compatible with `1.0.x`. 
    - Once all Gruntwork repos have been upgrade to work with `1.0.x`, we will publish a migration guide with a version compatibility table and announce it all via the Gruntwork Newsletter.




</div>


### [v0.12.0](https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.12.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/22/2021 | Modules affected: api-gateway-account-settings, api-gateway-proxy-methods, api-gateway-proxy, lambda | <a href="https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.12.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

Added new modules for configuring API Gateway:

- `api-gateway-account-settings`: This module is a straight port from [the terraform-aws-sam repo](https://github.com/gruntwork-io/terraform-aws-sam/tree/master/modules/api-gateway-account-settings).
- `api-gateway-proxy`: This module can be used to deploy API Gateway to proxy all requests to lambda functions without having to define each method. This module supports basic path based routing for configuring multiple lambda functions under a single API Gateway.
- `api-gateway-proxy-methods`: This is a helper module to setup proxy methods to a lambda function on API Gateway.

Refer to the [module docs](https://github.com/gruntwork-io/terraform-aws-lambda/tree/master/modules/api-gateway-proxy) and [examples](https://github.com/gruntwork-io/terraform-aws-lambda/tree/master/examples/lambda-service) for more information on these new modules.



</div>


### [v0.11.2](https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.11.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/9/2021 | <a href="https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.11.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- Add Terraform validation test that will scan the entire repo for Terraform modules and run terraform init and terraform validate on each.
- Replace `go fmt` in the pre-commit configuration file with `goimports`




</div>



## terraform-aws-load-balancer


### [v0.27.0](https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.27.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/23/2021 | Modules affected: acm-tls-certificate, alb, lb-listener-rules | <a href="https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.27.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- **Terraform 1.0 upgrade**: We have verified that this repo is compatible with Terraform `1.0.x`! 
    - From this release onward, we will only be running tests with Terraform `1.0.x` against this repo, so we recommend updating to `1.0.x` soon! 
    - To give you more time to upgrade, for the time being, all modules will still support Terraform `0.12.26` and above, as that version has several features in it (`required_providers` with `source` URLs) that make it more forwards compatible with `1.0.x`. 
    - Once all Gruntwork repos have been upgrade to work with `1.0.x`, we will publish a migration guide with a version compatibility table and announce it all via the Gruntwork Newsletter.





</div>


### [v0.26.3](https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.26.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/13/2021 | Modules affected: acm-tls-certificate | <a href="https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.26.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fix a bug that was introduced in `v0.26.2`, where the domain validation options filter was case sensitive, when the domain names are not.



</div>


### [v0.26.2](https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.26.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/13/2021 | Modules affected: acm-tls-certificate | <a href="https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.26.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fix timeout bug when `acm-tls-certificates` with Subject Alternative Names are created with verification records.



</div>


### [v0.26.1](https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.26.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/9/2021 | <a href="https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.26.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- Add Terraform validation test that will scan the entire repo for Terraform modules and run terraform init and terraform validate on each.
- Replace `go fmt` in the pre-commit configuration file with `goimports`





</div>



## terraform-aws-messaging


### [v0.7.1](https://github.com/gruntwork-io/terraform-aws-messaging/releases/tag/v0.7.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/29/2021 | Modules affected: kinesis | <a href="https://github.com/gruntwork-io/terraform-aws-messaging/releases/tag/v0.7.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- You can now configure consumer deletion in the `kinesis` module using the new `enforce_consumer_deletion` input variable.



</div>


### [v0.7.0](https://github.com/gruntwork-io/terraform-aws-messaging/releases/tag/v0.7.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/26/2021 | Modules affected: kinesis, sns, sqs | <a href="https://github.com/gruntwork-io/terraform-aws-messaging/releases/tag/v0.7.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- **Terraform 1.0 upgrade**: We have verified that this repo is compatible with Terraform `1.0.x`! 
    - From this release onward, we will only be running tests with Terraform `1.0.x` against this repo, so we recommend updating to `1.0.x` soon! 
    - To give you more time to upgrade, for the time being, all modules will still support Terraform `0.15.1` and above, as that version has several features in it (`required_providers` with `source` URLs) that make it more forwards compatible with `1.0.x`. 
    - Once all Gruntwork repos have been upgrade to work with `1.0.x`, we will publish a migration guide with a version compatibility table and announce it all via the Gruntwork Newsletter.



</div>


### [v0.6.2](https://github.com/gruntwork-io/terraform-aws-messaging/releases/tag/v0.6.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/22/2021 | Modules affected: sqs | <a href="https://github.com/gruntwork-io/terraform-aws-messaging/releases/tag/v0.6.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- You can now configure deduplication and FIFO throughput limits on the `sqs` module using the new `deduplication_scope` and `fifo_throughput_limit` input variables, respectively.



</div>


### [v0.6.1](https://github.com/gruntwork-io/terraform-aws-messaging/releases/tag/v0.6.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/9/2021 | <a href="https://github.com/gruntwork-io/terraform-aws-messaging/releases/tag/v0.6.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- Add Terraform validation test that will scan the entire repo for Terraform modules and run terraform init and terraform validate on each.
- Replace `go fmt` in the pre-commit configuration file with `goimports`




</div>



## terraform-aws-monitoring


### [v0.30.0](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.30.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/26/2021 | Modules affected: alarms, logs, metrics | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.30.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- **Terraform 1.0 upgrade**: We have verified that this repo is compatible with Terraform `1.0.x`! 
    - From this release onward, we will only be running tests with Terraform `1.0.x` against this repo, so we recommend updating to `1.0.x` soon! 
    - To give you more time to upgrade, for the time being, all modules will still support Terraform `0.15.1` and above, as that version has several features in it (`required_providers` with `source` URLs) that make it more forwards compatible with `1.0.x`. 
    - Once all Gruntwork repos have been upgrade to work with `1.0.x`, we will publish a migration guide with a version compatibility table and announce it all via the Gruntwork Newsletter.



</div>


### [v0.29.3](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.29.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/14/2021 | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.29.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Replace `gofmt` with `goimports`


</div>


### [v0.29.2](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.29.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/1/2021 | Modules affected: alarms/elasticache-redis-alarms | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.29.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- The `elasticache-redis-alarms` module now supports several additional alarms:
    - Engine CPU usage: now on by default.
    - Cluster swap usage: now on by default.
    - Cluster memory usage: only enabled if you set `monitor_database_memory_usage_percentage` to `true`.
    - Connection count: only enabled if you set `monitor_curr_connections` to `true`.
    - Replication lag: only enabled if you set `monitor_replication_lag` to `true`.



</div>



## terraform-aws-openvpn


### [v0.16.0](https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.16.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/26/2021 | Modules affected: openvpn-server | <a href="https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.16.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- **Terraform 1.0 upgrade**: We have verified that this repo is compatible with Terraform `1.0.x`! 
    - From this release onward, we will only be running tests with Terraform `1.0.x` against this repo, so we recommend updating to `1.0.x` soon! 
    - To give you more time to upgrade, for the time being, all modules will still support Terraform `0.15.1` and above, as that version has several features in it (`required_providers` with `source` URLs) that make it more forwards compatible with `1.0.x`. 
    - Once all Gruntwork repos have been upgrade to work with `1.0.x`, we will publish a migration guide with a version compatibility table and announce it all via the Gruntwork Newsletter.



</div>


### [v0.15.3](https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.15.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/9/2021 | Modules affected: openvpn-admin | <a href="https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.15.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- Add Terraform validation test that will scan the entire repo for Terraform modules and run terraform init and terraform validate on each.
- Replace `go fmt` in the pre-commit configuration file with `goimports`





</div>



## terraform-aws-sam


### [v0.6.0](https://github.com/gruntwork-io/terraform-aws-sam/releases/tag/v0.6.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/28/2021 | Modules affected: api-gateway-account-settings | <a href="https://github.com/gruntwork-io/terraform-aws-sam/releases/tag/v0.6.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- **Terraform 1.0 upgrade**: We have verified that this repo is compatible with Terraform `1.0.x`! 
    - From this release onward, we will only be running tests with Terraform `1.0.x` against this repo, so we recommend updating to `1.0.x` soon! 
    - To give you more time to upgrade, for the time being, all modules will still support Terraform `0.15.1` and above, as that version has several features in it (`required_providers` with `source` URLs) that make it more forwards compatible with `1.0.x`. 
    - Once all Gruntwork repos have been upgrade to work with `1.0.x`, we will publish a migration guide with a version compatibility table and announce it all via the Gruntwork Newsletter.





</div>


### [v0.5.1](https://github.com/gruntwork-io/terraform-aws-sam/releases/tag/v0.5.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/13/2021 | Modules affected: gruntsam | <a href="https://github.com/gruntwork-io/terraform-aws-sam/releases/tag/v0.5.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Add Terraform Validate test
- Replace `gofmt` with `goimports`



</div>



## terraform-aws-security


### [v0.53.2](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.53.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/29/2021 | Modules affected: cloudtrail, private-s3-bucket | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.53.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Add Cloudtrail tags to the Cloudwatch Log Group
- Improve docs for MFA Delete (private-s3-bucket)


</div>


### [v0.53.1](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.53.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/26/2021 | Modules affected: aws-config-bucket, aws-config-multi-region, aws-config, cloudtrail-bucket | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.53.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Set MFA Delete to false by default. This release reverts [v0.50.0](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.50.0). There is a manual step required to enable MFA Delete in the S3 bucket, so it is not possible to create a bucket with `mfa_delete = true` by default. Read more about it at the [`private-s3-bucket` README](https://github.com/gruntwork-io/terraform-aws-security/blob/master/modules/private-s3-bucket/README.md#how-do-you-enable-mfa-delete).



</div>


### [v0.53.0](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.53.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/23/2021 | Modules affected: aws-config-bucket, aws-config-multi-region, aws-config-rules, aws-config | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.53.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- **Terraform 1.0 upgrade**: We have verified that this repo is compatible with Terraform `1.0.x`! 
    - From this release onward, we will only be running tests with Terraform `1.0.x` against this repo, so we recommend updating to `1.0.x` soon! 
    - To give you more time to upgrade, for the time being, all modules will still support Terraform `0.12.26` and above, as that version has several features in it (`required_providers` with `source` URLs) that make it more forwards compatible with `1.0.x`. 
    - Once all Gruntwork repos have been upgrade to work with `1.0.x`, we will publish a migration guide with a version compatibility table and announce it all via the Gruntwork Newsletter.





</div>


### [v0.52.0](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.52.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/23/2021 | Modules affected: custom-iam-entity, aws-config-multi-region, ebs-encryption-multi-region, guardduty-multi-region | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.52.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- We have removed the `opt_out_regions` input variable from all the `multi-region` modules (e.g., `aws-config-multi-region`). This should have been done in [v0.51.0](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.51.0), but was accidentally missed. If you were setting this variable before, please remove it from your code, and instead, exclude those regions from `opt_in_regions` (which is now a required parameter).
- We have updated the examples to not include `ap-northeast-3` in `opt_in_regions`. This is a brand new AWS region and many services, such as AWS Config, are not yet fully supported in that region. We recommend excluding it from your `opt_in_regions` variables too, as otherwise, you may get a number of confusing errors.
- Update `custom-iam-entity` with a backward compatibility fix for the changes in https://github.com/gruntwork-io/terraform-aws-security/pull/502. This allows you to update to this version without making any changes in your code.






</div>


### [v0.51.0](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.51.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/14/2021 | Modules affected: codegen/generator, aws-config-multi-region, ebs-encryption-multi-region, guard-duty-multi-region | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.51.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- We have refactored all our multi-region modules (the ones that have `-multi-region` in the name) to no longer create nested `provider` blocks. Instead, providers must be passed in now via the `providers` map. This reduces the number of providers that Terraform must instantiate, making the multi-region modules much faster and more stable to use. It also gives you full control over how to authenticate to your various AWS accounts. However, **this is a backwards incompatible change**, so make sure to [read the migration guide below](#migration-guide-for-multi-region-modules).
- To update the multi-region modules, we updated the Golang `generator` code too. It no longer creates nested `provider` blocks or the `local.all_regions` variable and no longer supports a `SeedRegion` param. However, it does support new params to configure Terraform and AWS provider version constraints. **These changes are also backwards incompatible**, so make sure to [read the migration guide below](#migration-guide-for-the-golang-generator-code).
- We&apos;ve fixed small bugs in the `aws-config`, `aws-config-bucket`, and `kms-master-key` modules so they no longer create `data` sources when `create_resources` is set to `false`.


</div>


### [v0.50.1](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.50.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/9/2021 | Modules affected: ssh-grunt | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.50.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Replace `go fmt` in the pre-commit configuration with `goimports`





</div>


### [v0.50.0](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.50.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/1/2021 | Modules affected: aws-config-bucket, aws-config-multi-region, aws-config, cloudtrail-bucket | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.50.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Set `mfa_delete = true` for S3 buckets **[BACKWARDS INCOMPATIBLE]**
For the `private-s3-bucket` module, and all modules that depend on it (e.g., `aws-config-bucket`, `cloudtrail-bucket`), we have changed the default for MFA delete to be enabled. This is a more secure default and the one recommended by the CIS AWS Foundations v1.4 benchmark. This is a backwards incompatible change, so please see the migration guide below.


</div>



## terraform-aws-server


### [v0.13.0](https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.13.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/23/2021 | Modules affected: ec2-backup, single-server | <a href="https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.13.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- **Terraform 1.0 upgrade**: We have verified that this repo is compatible with Terraform `1.0.x`! 
    - From this release onward, we will only be running tests with Terraform `1.0.x` against this repo, so we recommend updating to `1.0.x` soon! 
    - To give you more time to upgrade, for the time being, all modules will still support Terraform `0.12.26` and above, as that version has several features in it (`required_providers` with `source` URLs) that make it more forwards compatible with `1.0.x`. 
    - Once all Gruntwork repos have been upgrade to work with `1.0.x`, we will publish a migration guide with a version compatibility table and announce it all via the Gruntwork Newsletter.




</div>


### [v0.12.4](https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.12.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/22/2021 | Modules affected: single-server | <a href="https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.12.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Added ability to set `secondary_private_ips` variable.



</div>


### [v0.12.3](https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.12.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/14/2021 | <a href="https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.12.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Add Terraform validate test
- Replace `gofmt` with `goimports`


</div>



## terraform-aws-service-catalog


### [v0.54.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.54.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/28/2021 | Modules affected: services/eks-cluster, services/eks-core-services, services/k8s-service, services | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.54.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  


- Updated modules to use kubernetes terraform provider version 2.x. You must update your provider configuration to be compatible with version 2.x. Refer to [the official upgrade guide](https://registry.terraform.io/providers/hashicorp/kubernetes/latest/docs/guides/v2-upgrade-guide) for more information.
    - For terraform, update your `kubernetes` provider block.
    - For terragrunt, update your `generate` block to support `kubernetes` provider 2.x.
- **Update dependency versions**: We have updated the versions of a number of dependencies in this repo. Most of these are related to our on-going Terraform 1.0 upgrade. We still have a few more modules to go, so we recommend waiting a little longer, and waiting for our official announcement and upgrade guide before upgrading to 1.0. Here are the versions that have been updated in this release:
    - Update dependency gruntwork-io/terraform-aws-ci to v0.38.0
    - Update dependency gruntwork-io/terraform-aws-data-storage to v0.21.0
    - Update dependency gruntwork-io/terraform-aws-monitoring to v0.30.0
    - Update dependency gruntwork-io/terraform-aws-eks to v0.43.0





</div>


### [v0.53.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.53.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/27/2021 | Modules affected: networking, services, mgmt, data-stores | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.53.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- **Update `account-baseline-xxx` modules to new multi-region approach**. In [v0.51.0](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.51.0) of `terraform-aws-security`, we refactored how we build multi-region modules—that is, those modules that deploy resources across every single AWS region, such as `aws-config-multi-region`—to no longer create nested `provider` blocks, and instead, have users pass in providers via the `providers` map. In this release, we have updated the `account-baseline-xxx` modules (e.g., `account-baseline-root`) to use this new release of `terraform-aws-security` and to use the same behavior with providers. This reduces the number of providers that Terraform must instantiate, making the `account-baseline-xxx` modules _much_ faster and more stable to use. It also gives you full control over how to authenticate to your various AWS accounts. However, this is a backwards incompatible change, so [make sure to read the migration guide below](#migration-guide).

- **Update dependency versions**: We have updated the versions of a number of dependencies in this repo. Most of these are related to our on-going Terraform 1.0 upgrade. We still have a few more modules to go, so we recommend waiting a little longer, and waiting for our official announcement and upgrade guide before upgrading to 1.0. Here are the versions that have been updated in this release:
    - Update dependency `gruntwork-io/terraform-aws-messaging` to `v0.7.0`
    - Update dependency `gruntwork-io/terraform-aws-lambda` to `v0.13.0`
    - Update dependency `gruntwork-io/kubergrunt` to `v0.7.3`
    - Update dependency `gruntwork-io/terratest` to `v0.37.1`
    - Update dependency `gruntwork-io/terraform-aws-ci` to `v0.37.8`
    - Update dependency `gruntwork-io/terraform-aws-data-storage` to `v0.20.5`
    - Update dependency `gruntwork-io/terraform-aws-asg` to `v0.15.0`
    - Update dependency `gruntwork-io/terraform-aws-vpc` to `v0.17.0`
    - Update dependency `gruntwork-io/terraform-aws-server` to `v0.13.0`
    - Update dependency `gruntwork-io/terraform-aws-load-balancer` to `v0.27.0`
    - Update dependency `gruntwork-io/terraform-aws-cache` to `v0.16.0`
    - Update dependency `gruntwork-io/terraform-aws-ecs` to `v0.30.1`
    - Update dependency `gruntwork-io/terraform-aws-static-assets` to `v0.11.0`
    - Update dependency `gruntwork-io/terraform-aws-openvpn` to `v0.16.0`
    - Update dependency `gruntwork-io/terraform-aws-server` to `v0.12.3`
    - Update dependency `gruntwork-io/terraform-aws-monitoring` to `v0.29.3`
    - Update dependency `gruntwork-io/terraform-aws-ci` to `v0.37.7`



</div>


### [v0.52.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.52.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/22/2021 | Modules affected: networking/vpc, networking, mgmt | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.52.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Update dependency gruntwork-io/terragrunt to v0.31.1
- Update dependency gruntwork-io/terraform-aws-vpc to v0.16.0. This is a **backward incompatible** update. Refer to [the underlying release note](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.16.0) for more information on the update.



</div>


### [v0.51.4](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.51.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/20/2021 | Modules affected: services, data-stores, networking, mgmt | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.51.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Update dependency gruntwork-io/terraform-aws-eks to v0.42.2
- Updated docs and comments for a few variables in `eks-cluster` and `route53`.
- All packer templates have been updated to take in an `availability_zone` variable, which can be used to specify which AZ to use when spinning up the build instance. This is useful to avoid problematic AZs that do not have standard instance types available.



</div>


### [v0.51.3](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.51.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/16/2021 | Modules affected: services, data-stores | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.51.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Added ability to configure `replica_backup_retention_period`. This can be used to enable automated backups of RDS read replica instances.
- Update dependency gruntwork-io/terraform-kubernetes-namespace to v0.3.1
- Update dependency gruntwork-io/terraform-aws-cache to v0.15.1
- Update dependency gruntwork-io/terraform-aws-data-storage to v0.20.4



</div>


### [v0.51.2](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.51.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/16/2021 | Modules affected: services/ecs-service | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.51.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

Exposes the ability to pass through volumes (including EFS volumes) to the wrapped ecs-service module.




</div>


### [v0.51.1](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.51.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/15/2021 | Modules affected: services, data-stores | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.51.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- We made it easier to pass in EC2 instance type for the ECS packer template.
- We lightly refactored test_helpers.go, so that changes to test_helpers.go doesn&apos;t trigger so many full-suite test runs in the future.
- In the modules/data-stores/elasticsearch, we added support for custom endpoints.



</div>


### [v0.51.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.51.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/14/2021 | Modules affected: networking/route53 | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.51.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

Added ability to associate multiple VPCs to private route 53 hosted zone. This is a backward incompatible change. Refer to the migration guide below for how to update to this version.


</div>


### [v0.50.8](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.50.8)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/14/2021 | Modules affected: services, networking, mgmt, base | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.50.8">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fix bug where `eks-cluster` errors out when trying to lookup IAM role for Managed Node Groups or Self Managed Workers after having none.
- `route53` module now supports creating NS records for creating delegated public hosted zones.
- Update dependency gruntwork-io/terraform-aws-lambda to v0.11.2
- Update dependency gruntwork-io/terraform-aws-messaging to v0.6.1
- Update dependency gruntwork-io/terraform-aws-openvpn to v0.15.3
- Update dependency gruntwork-io/terraform-aws-static-assets to v0.10.1
- Update dependency gruntwork-io/terraform-aws-monitoring to v0.29.2
- Update dependency gruntwork-io/terraform-aws-security to v0.50.1
- Update dependency gruntwork-io/terraform-aws-load-balancer to v0.26.3



</div>


### [v0.50.7](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.50.7)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/13/2021 | Modules affected: networking, services | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.50.7">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Update dependency gruntwork-io/terraform-aws-eks to v0.42.1. With this change, you can now configure self managed workers to use multiple instance types for a single pool (using the newly exposed `multi_instances_overrides` attribute).



</div>


### [v0.50.6](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.50.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/13/2021 | Modules affected: services, base, mgmt, data-stores | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.50.6">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Update dependency gruntwork-io/terraform-aws-asg to v0.14.3
- Update dependency gruntwork-io/terraform-aws-server to v0.12.2
- Update dependency gruntwork-io/terraform-aws-data-storage to v0.20.3
- Update dependency gruntwork-io/kubergrunt to v0.7.2
- Update dependency gruntwork-io/terratest to v0.36.5
- Update dependency gruntwork-io/terraform-aws-vpc to v0.15.6
- Update dependency gruntwork-io/terraform-aws-ci to v0.37.5
- Replace `gofmt` with `goimports`



</div>


### [v0.50.5](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.50.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/13/2021 | Modules affected: services/k8s-service | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.50.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- `k8s-service` now exposes a way to configure side car containers.


</div>


### [v0.50.4](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.50.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/13/2021 | Modules affected: mgmt/jenkins | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.50.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Jenkins server AMI now contains aws-auth




</div>


### [v0.50.3](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.50.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/9/2021 | Modules affected: services/eks-cluster, services/eks-workers | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.50.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

You can now attach custom security group rules to the EKS worker pool managed by `eks-cluster` and `eks-workers`. For `eks-workers` module, use the new `custom_ingress_security_group_rules` and `custom_egress_security_group_rules` input variables. For `eks-cluster`, use the new `custom_worker_ingress_security_group_rules` and `custom_worker_egress_security_group_rules` input variables.



</div>


### [v0.50.2](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.50.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/9/2021 | Modules affected: landingzone/iam-users-and-groups | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.50.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Add new module for managing IAM Users and Groups only in Landing Zone. Refer to [the module docs](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/modules/landingzone/iam-users-and-groups) for more information on when you might want to use this over the same feature in `account-baseline-security`.




</div>


### [v0.50.1](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.50.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/9/2021 | Modules affected: networking, services, base, mgmt | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.50.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fix bug in `services/ec2-instance` where `ip-lockdown` referenced a non-existant user.
- Expose `root_volume_size` configuration option for `services/ec2-instance`
- Fix bug where the build permissions were not being attached to the Jenkins IAM role.
- Fix various typos in docs and comments



</div>


### [v0.50.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.50.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/7/2021 | Modules affected: data-stores/s3, landingzone/account-baseline-app, landingzone/account-baseline-root, landingzone/account-baseline-security | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.50.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Add docs on why we are not using module count/for_each for the `eks-worker` modules
- Add docs on the IAM roles and `aws-auth` for `eks-workers`
- Update dependency gruntwork-io/terraform-aws-security to v0.50.0 **[BACKWARDS INCOMPATIBLE]**



</div>



## terraform-aws-static-assets


### [v0.11.0](https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.11.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/26/2021 | Modules affected: s3-cloudfront, s3-static-website | <a href="https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.11.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  


- **Terraform 1.0 upgrade**: We have verified that this repo is compatible with Terraform `1.0.x`! 
    - From this release onward, we will only be running tests with Terraform `1.0.x` against this repo, so we recommend updating to `1.0.x` soon! 
    - To give you more time to upgrade, for the time being, all modules will still support Terraform `0.15.1` and above, as that version has several features in it (`required_providers` with `source` URLs) that make it more forwards compatible with `1.0.x`. 
    - Once all Gruntwork repos have been upgrade to work with `1.0.x`, we will publish a migration guide with a version compatibility table and announce it all via the Gruntwork Newsletter.




</div>


### [v0.10.1](https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.10.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/9/2021 | <a href="https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.10.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Add Terraform validation test that will scan the entire repo for Terraform modules and run terraform init and terraform validate on each.
- Replace `go fmt` in the pre-commit configuration with `goimports`





</div>



## terraform-aws-utilities


### [v0.6.0](https://github.com/gruntwork-io/terraform-aws-utilities/releases/tag/v0.6.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/23/2021 | Modules affected: executable-dependency, instance-type, join-path, list-remove | <a href="https://github.com/gruntwork-io/terraform-aws-utilities/releases/tag/v0.6.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- **Terraform 1.0 upgrade**: We have verified that this repo is compatible with Terraform `1.0.x`! 
    - From this release onward, we will only be running tests with Terraform `1.0.x` against this repo, so we recommend updating to `1.0.x` soon! 
    - To give you more time to upgrade, for the time being, all modules will still support Terraform `0.12.26` and above, as that version has several features in it (`required_providers` with `source` URLs) that make it more forwards compatible with `1.0.x`. 
    - Once all Gruntwork repos have been upgrade to work with `1.0.x`, we will publish a migration guide with a version compatibility table and announce it all via the Gruntwork Newsletter.




</div>


### [v0.5.1](https://github.com/gruntwork-io/terraform-aws-utilities/releases/tag/v0.5.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/9/2021 | <a href="https://github.com/gruntwork-io/terraform-aws-utilities/releases/tag/v0.5.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
Replace `gofmt` with `goimports`




</div>



## terraform-aws-vpc


### [v0.17.0](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.17.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/23/2021 | Modules affected: network-acl-inbound, network-acl-outbound, vpc-app-network-acls, vpc-app | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.17.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- **Terraform 1.0 upgrade**: We have verified that this repo is compatible with Terraform `1.0.x`! 
    - From this release onward, we will only be running tests with Terraform `1.0.x` against this repo, so we recommend updating to `1.0.x` soon! 
    - To give you more time to upgrade, for the time being, all modules will still support Terraform `0.12.26` and above, as that version has several features in it (`required_providers` with `source` URLs) that make it more forwards compatible with `1.0.x`. 
    - Once all Gruntwork repos have been upgrade to work with `1.0.x`, we will publish a migration guide with a version compatibility table and announce it all via the Gruntwork Newsletter.




</div>


### [v0.16.0](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.16.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/20/2021 | Modules affected: vpc-app | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.16.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

Fixed bug with configuring default NACLs, where default NACLs were applied and configured even when `apply_default_nacl_rules` was `false`. Now the default NACLs are only touched and updated if `apply_default_nacl_rules` is `true`.

**NOTE**: This change is backward compatible, but marked as backward incompatible for informational purposes. When updating to this version with `apply_default_nacl_rules = false` (the default), the resource `aws_default_network_acl.default` will be destroyed. This resource is a special resource in Terraform, where destroying the resource **has no effect on AWS**. The default NACL will remain intact in AWS, with the last rule that was applied to it.



</div>


### [v0.15.7](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.15.7)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/19/2021 | Modules affected: vpc-app, vpc-peering-cross-accounts-requester | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.15.7">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Added the ability to specify availability zones to use for the subnets directly to `vpc-app` module.
- Added the ability to configure timeouts on route resources.
- Minor internal changes to `vpc-app` implementation which will have no effect on existing infrastructure.



</div>


### [v0.15.6](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.15.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/13/2021 | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.15.6">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Add Terraform validate test
- Replace `gofmt` with `goimports`




</div>

<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "releases",
  "hash": "c8d77a20b07c089e4d99783b3ae2422e"
}
##DOCS-SOURCER-END -->

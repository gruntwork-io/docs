
# Gruntwork release 2021-04

<p style={{marginTop: "-25px"}}><small><a href="/guides">Guides</a> / <a href="/guides/stay-up-to-date">Update Guides</a> / <a href="/guides/stay-up-to-date/releases">Releases</a> / 2021-04</small></p>

This page is lists all the updates to the [Gruntwork Infrastructure as Code
Library](https://gruntwork.io/infrastructure-as-code-library/) that were released in 2021-04. For instructions
on how to use these updates in your code, check out the [updating
documentation](/library/stay-up-to-date/updating).

Here are the repos that were updated:

- [gruntwork](#gruntwork)
- [terraform-aws-architecture-catalog](#terraform-aws-architecture-catalog)
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


## gruntwork


### [v0.2.1](https://github.com/gruntwork-io/gruntwork/releases/tag/v0.2.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/22/2021 | <a href="https://github.com/gruntwork-io/gruntwork/releases/tag/v0.2.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  This release adds the `--region` flag when working with VCS secrets. Refer to the _Setting up the tokens in AWS Secrets Manager_ section for details.

</div>



## terraform-aws-architecture-catalog


### [v0.0.6](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v0.0.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/27/2021 | <a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v0.0.6">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  This release adds a tool for generating example reference architectures for use in [the for-production examples in terraform-aws-service-catalog](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/examples/for-production/infrastructure-live).

In addition, there are many other bug fixes and updates, including:
- Fixes for renovatebot
- Docs updates
- Fixes for the ASG sample app
- Updates to the Circle CI config

</div>


### [v0.0.5](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v0.0.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/16/2021 | <a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v0.0.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- **Terraform 0.14 upgrade**: We have verified that this repo is compatible with Terraform `0.14.x`! 
    - From this release onward, we will only be running tests with Terraform `0.14.x` against this repo, so we recommend updating to `0.14.x` soon! 
    - To give you more time to upgrade, for the time being, all modules will still support Terraform `0.12.26` and above, as that version has several features in it (`required_providers` with `source` URLs) that make it more forwards compatible with `0.14.x`. 
    - Once all Gruntwork repos have been upgrade to work with `0.14.x`, we will publish a migration guide with a version compatibility table and announce it all via the Gruntwork Newsletter.
- Many other bug fixes and improvements, including:
    - Bump to latest Service Catalog version
    - Enable encryption by default in a few places where it wasn&apos;t enabled already
    - A number of CI / CD and Jenkins fixes
    - Switch to `main` branch from `master`
    - Update internal references to the new repo naming scheme
    - Many documentation improvements
    - A few test fixes


- https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/166
- https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/167
- https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/168
- https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/170
- https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/171
- https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/172
- https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/173
- https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/174
- https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/175
- https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/176
- https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/177
- https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/178
- https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/179
- https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/182
- https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/183
- https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/184
- https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/185
- https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/186
- https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/187
- https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/188
- https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/189
- https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/190
- https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/193
- https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/194
- https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/195
- https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/197

</div>


### [v0.0.4](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v0.0.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/2/2021 | <a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v0.0.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
Multitude of updates and fixes, including latest version of the service catalog, container image building for the deploy runner, app CI/CD, improved Jenkins Support, Elasticsearch blueprint, EKS bug fixes, and more.



</div>



## terraform-aws-asg


### [v0.14.0](https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.14.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/28/2021 | Modules affected: asg-rolling-deploy, server-group | <a href="https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.14.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- **Terraform 0.15 upgrade**: We have verified that this repo is compatible with Terraform `0.15.x`! 
    - From this release onward, we will only be running tests with Terraform `0.15.x` against this repo, so we recommend updating to `0.15.x` soon! 
    - To give you more time to upgrade, for the time being, all modules will still support Terraform `0.12.26` and above, as that version has several features in it (`required_providers` with `source` URLs) that make it more forwards compatible with `0.15.x`. 
    - Once all Gruntwork repos have been upgrade to work with `0.15.x`, we will publish a migration guide with a version compatibility table and announce it all via the Gruntwork Newsletter.





</div>


### [v0.13.0](https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.13.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/12/2021 | Modules affected: server-group | <a href="https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.13.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- This release enable encryption by default for the root volume of instances in the ASG.


</div>



## terraform-aws-cache


### [v0.15.0](https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v0.15.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/28/2021 | Modules affected: memcached, redis | <a href="https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v0.15.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- **Terraform 0.15 upgrade**: We have verified that this repo is compatible with Terraform `0.15.x`! 
    - From this release onward, we will only be running tests with Terraform `0.15.x` against this repo, so we recommend updating to `0.15.x` soon! 
    - To give you more time to upgrade, for the time being, all modules will still support Terraform `0.12.26` and above, as that version has several features in it (`required_providers` with `source` URLs) that make it more forwards compatible with `0.15.x`. 
    - Once all Gruntwork repos have been upgrade to work with `0.15.x`, we will publish a migration guide with a version compatibility table and announce it all via the Gruntwork Newsletter.





</div>


### [v0.14.0](https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v0.14.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/12/2021 | Modules affected: redis | <a href="https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v0.14.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- This release updates redis clusters to enable encryption by default for data in transit and at rest. Refer to the [Migration guide](#migration-guide).


</div>



## terraform-aws-ci


### [v0.33.3](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.33.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/27/2021 | Modules affected: jenkins-server | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.33.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Bump to latest version of `terraform-aws-asg` to fully support terraform 0.14.



</div>


### [v0.33.2](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.33.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/19/2021 | Modules affected: gruntwork-module-circleci-helpers | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.33.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

Fix regression bug where we no longer can download golang from the old location due to a 403.



</div>


### [v0.33.1: Upgrade ecs runner terraform to 0.13.6](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.33.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/14/2021 | Modules affected: ecs-deploy-runner | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.33.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Upgraded the deploy runner to terraform 0.13.6


</div>


### [v0.33.0](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.33.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/13/2021 | Modules affected: jenkins-server | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.33.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

This releases enable encryption by default for the Jenkins EBS volume. Previously, the EBS volume was not encrypted by default. Unless you want to destroy to recreate your Jenkins data EBS volume, you  MUST follow the migration guide below.


</div>


### [v0.32.0](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.32.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/9/2021 | Modules affected: ec2-backup, ecs-deploy-runner-invoke-iam-policy, ecs-deploy-runner-standard-configuration, ecs-deploy-runner | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.32.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- **Terraform 0.14 upgrade**: We have verified that this repo is compatible with Terraform `0.14.x`! 
    - From this release onward, we will only be running tests with Terraform `0.14.x` against this repo, so we recommend updating to `0.14.x` soon! 
    - To give you more time to upgrade, for the time being, all modules will still support Terraform `0.12.26` and above, as that version has several features in it (`required_providers` with `source` URLs) that make it more forwards compatible with `0.14.x`. 
    - Once all Gruntwork repos have been upgrade to work with `0.14.x`, we will publish a migration guide with a version compatibility table and announce it all via the Gruntwork Newsletter.





</div>



## terraform-aws-cis-service-catalog


### [v0.17.0](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.17.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/26/2021 | Modules affected: aws-securityhub | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.17.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Use account&apos;s name as key for for_each instead of account_id in SecurityHub **[BACKWARDS INCOMPATIBLE]**


</div>


### [v0.16.1](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.16.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/21/2021 | Modules affected: cleanup-expired-certs, aws-config-multi-region, cloudtrail, cross-account-iam-roles | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.16.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
Update the versions of the following underlying modules:
- `terraform-aws-lambda` to v0.10.1
- `terraform-aws-security` to v0.46.7
- `terraform-aws-service-catalog` to v0.35.0


</div>


### [v0.16.0](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.16.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/13/2021 | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.16.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- **Terraform 0.14 upgrade**: We have verified that this repo is compatible with Terraform `0.14.x`! 
    - From this release onward, we will only be running tests with Terraform `0.14.x` against this repo, so we recommend updating to `0.14.x` soon! 
    - To give you more time to upgrade, for the time being, all modules will still support Terraform `0.12.26` and above, as that version has several features in it (`required_providers` with `source` URLs) that make it more forwards compatible with `0.14.x`. 
    - Once all Gruntwork repos have been upgrade to work with `0.14.x`, we will publish a migration guide with a version compatibility table and announce it all via the Gruntwork Newsletter.






</div>


### [v0.15.0](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.15.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/13/2021 | Modules affected: aws-config-multi-region, cloudtrail, iam-groups | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.15.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Made some verifications for AWS Config required + add a comment with which CIS recommendation that belongs
- Add outputs from the Benchmark filters to the Cloudtrail module
- Add variable `kms_key_already_exists` for Cloudtrail module, there was an error where the `var.kms_key_arn != null` was invalid due `kms_key_arn` being an output from another module. The same variable exists in terraform-aws-security.
-  Add comments to IAM Groups around which recommendation belongs the hard-coded value



</div>


### [v0.14.0](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.14.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/8/2021 | Modules affected: aws-config-multi-region, cleanup-expired-certs, cloudtrail, cloudwatch-logs-metric-filters | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.14.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
This release updates versions of several underlying modules, including several backwards incompatible upgrades. Please see the Migration guide section for manual steps necessary to perform the upgrade.

:warning: This is a **backwards incompatible upgrade**. Please follow the instructions in the linked Release Notes pages to upgrade! If you are upgrading across multiple backwards incompatible versions (e.g., `v0.3.0` to `v0.6.0`), you MUST check the release notes for every release in between too! :warning:




</div>



## terraform-aws-data-storage


### [v0.20.0](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.20.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/28/2021 | Modules affected: lambda-create-snapshot, aurora, efs, lambda-cleanup-snapshots | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.20.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- **Terraform 0.15 upgrade**: We have verified that this repo is compatible with Terraform `0.15.x`! 
    - From this release onward, we will only be running tests with Terraform `0.15.x` against this repo, so we recommend updating to `0.15.x` soon! 
    - To give you more time to upgrade, for the time being, all modules will still support Terraform `0.12.26` and above, as that version has several features in it (`required_providers` with `source` URLs) that make it more forwards compatible with `0.15.x`. 
    - Once all Gruntwork repos have been upgrade to work with `0.15.x`, we will publish a migration guide with a version compatibility table and announce it all via the Gruntwork Newsletter.





</div>


### [v0.19.0](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.19.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/15/2021 | Modules affected: aurora, efs, rds, redshift | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.19.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Encryption is now enabled by default for `aurora`, `efs`, `rds`, and `redshift`.


</div>



## terraform-aws-ecs


### [v0.28.2](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.28.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/22/2021 | Modules affected: ecs-service | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.28.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- You can now enable Amazon ECS Exec for your Tasks by setting the new `enable_execute_command` input variable to `true`.
- Fixed a couple &quot;interpolation only&quot; warnings.



</div>


### [v0.28.1](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.28.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/13/2021 | Modules affected: ecs-service | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.28.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fixes an &quot;interpolation-only expressions&quot; deprecation warning in `ecs-service`.



</div>


### [v0.28.0](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.28.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/13/2021 | Modules affected: ecs-cluster, ecs-daemon-service, ecs-service | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.28.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- **Terraform 0.14 upgrade**: We have verified that this repo is compatible with Terraform `0.14.x`! 
    - From this release onward, we will only be running tests with Terraform `0.14.x` against this repo, so we recommend updating to `0.14.x` soon! 
    - To give you more time to upgrade, for the time being, all modules will still support Terraform `0.12.26` and above, as that version has several features in it (`required_providers` with `source` URLs) that make it more forwards compatible with `0.14.x`. 
    - Once all Gruntwork repos have been upgrade to work with `0.14.x`, we will publish a migration guide with a version compatibility table and announce it all via the Gruntwork Newsletter.





</div>


### [v0.27.1](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.27.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/13/2021 | Modules affected: ecs-service | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.27.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fix health check and timeout settings for the target groups created by `ecs-service`. Depending on the protocol you&apos;re using (e.g., TCP, UDP, TLS, etc), only certain values are permitted. The AWS docs are unclear on this, but we&apos;ve done our best to implement the required rules.



</div>


### [v0.27.0](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.27.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/1/2021 | Modules affected: ecs-daemon-service, ecs-service | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.27.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

Remove `var.environment_name` from `ecs-service` and `ecs-daemon-service`. This was only used to name the IAM resources created within the modules, but was confusingly named. The functionality of the variable has been replaced with the following three, targeted variables:

- `var.custom_iam_role_name_prefix` for the IAM role used by the ECS tasks.
- `var.custom_task_execution_name_prefix` for the IAM role used by ECS to spawn the tasks.
- `var.custom_ecs_service_role_name` for the IAM role used by the ECS service to access load balancers.

Refer to the migration guide to avoid recreating the IAM roles when updating to this release.



</div>



## terraform-aws-eks


### [v0.37.0](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.37.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/28/2021 | Modules affected: eks-alb-ingress-controller-iam-policy, eks-alb-ingress-controller, eks-aws-auth-merger, eks-cluster-control-plane | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.37.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- **Terraform 0.15 upgrade**: We have verified that this repo is compatible with Terraform `0.15.x`! 
    - From this release onward, we will only be running tests with Terraform `0.15.x` against this repo, so we recommend updating to `0.15.x` soon! 
    - To give you more time to upgrade, for the time being, all modules will still support Terraform `0.12.26` and above, as that version has several features in it (`required_providers` with `source` URLs) that make it more forwards compatible with `0.15.x`. 
    - Once all Gruntwork repos have been upgrade to work with `0.15.x`, we will publish a migration guide with a version compatibility table and announce it all via the Gruntwork Newsletter.





</div>


### [v0.36.1](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.36.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/27/2021 | Modules affected: eks-iam-role-assume-role-policy-for-service-account, eks-k8s-external-dns | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.36.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Remove unused local variables in `eks-iam-role-assume-role-policy-for-service-account`
- Fix bug where affinity was not properly configured for `external-dns`



</div>


### [v0.36.0](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.36.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/15/2021 | Modules affected: eks-alb-ingress-controller-iam-policy, eks-alb-ingress-controller, eks-aws-auth-merger, eks-cluster-control-plane | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.36.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- **Terraform 0.14 upgrade**: We have verified that this repo is compatible with Terraform `0.14.x`! 
    - From this release onward, we will only be running tests with Terraform `0.14.x` against this repo, so we recommend updating to `0.14.x` soon! 
    - To give you more time to upgrade, for the time being, all modules will still support Terraform `0.12.26` and above, as that version has several features in it (`required_providers` with `source` URLs) that make it more forwards compatible with `0.14.x`. 
    - Once all Gruntwork repos have been upgrade to work with `0.14.x`, we will publish a migration guide with a version compatibility table and announce it all via the Gruntwork Newsletter.
- Note that Terraform 0.14 seems to have exposed EKS authentication expiry issues more than previous versions, so when upgrading to this version, we recommend following the migration guide below.


</div>


### [v0.35.2](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.35.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/12/2021 | Modules affected: eks-container-logs | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.35.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- You can now configure additional outputs for `fluent-bit` using the `extra_outputs` input variable.



</div>


### [v0.35.1](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.35.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/8/2021 | Modules affected: eks-alb-ingress-controller, eks-container-logs | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.35.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Bump default helm chart versions of essential services to latest versions:
- Bump default version of AWS Load Balancer Controller to `v2.1.3` (was `v2.0.1`)
- Bump test dependency version to pull in security patches.


</div>


### [v0.35.0](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.35.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/1/2021 | Modules affected: eks-cluster-control-plane | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.35.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- The naming logic of the default Fargate execution IAM role has been modified to support longer cluster names. You can now directly set the IAM role name using the new `custom_fargate_iam_role_name` input variable. Note that the default name has also been shortened, using the suffix `-fargate-role` instead of `-default-fargate-execution-role`. To avoid recreating the IAM role, you can set `var.custom_fargate_iam_role_name` to `CLUSTER_NAME-default-fargate-execution-role`.
- Update documentation to use the new repository names in cross references.




</div>



## terraform-aws-lambda


### [v0.11.0](https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.11.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/28/2021 | Modules affected: keep-warm, lambda-edge, lambda, scheduled-lambda-job | <a href="https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.11.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- **Terraform 0.15 upgrade**: We have verified that this repo is compatible with Terraform `0.15.x`! 
    - From this release onward, we will only be running tests with Terraform `0.15.x` against this repo, so we recommend updating to `0.15.x` soon! 
    - To give you more time to upgrade, for the time being, all modules will still support Terraform `0.12.26` and above, as that version has several features in it (`required_providers` with `source` URLs) that make it more forwards compatible with `0.15.x`. 
    - Once all Gruntwork repos have been upgrade to work with `0.15.x`, we will publish a migration guide with a version compatibility table and announce it all via the Gruntwork Newsletter.





</div>


### [v0.10.1](https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.10.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/16/2021 | Modules affected: keep-warm, lambda-edge, lambda | <a href="https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.10.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- You can now use Docker images with the `lambda` module by specifying the new input variables `image_uri`, `entry_point`, `command`, and `working_directory`.
- We renamed all our repos to use HashiCorp&apos;s naming convention (`terraform-&lt;cloud&gt;-&lt;name&gt;`, e.g., `terraform-aws-vpc`), so we went through each repo and updated all the internal references. This should not affect functionality.



</div>



## terraform-aws-load-balancer


### [v0.26.0](https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.26.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/28/2021 | Modules affected: acm-tls-certificate, alb, lb-listener-rules | <a href="https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.26.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- **Terraform 0.15 upgrade**: We have verified that this repo is compatible with Terraform `0.15.x`! 
    - From this release onward, we will only be running tests with Terraform `0.15.x` against this repo, so we recommend updating to `0.15.x` soon! 
    - To give you more time to upgrade, for the time being, all modules will still support Terraform `0.12.26` and above, as that version has several features in it (`required_providers` with `source` URLs) that make it more forwards compatible with `0.15.x`. 
    - Once all Gruntwork repos have been upgrade to work with `0.15.x`, we will publish a migration guide with a version compatibility table and announce it all via the Gruntwork Newsletter.





</div>


### [v0.25.0](https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.25.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/26/2021 | Modules affected: acm-tls-certificate, alb | <a href="https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.25.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Enhance docs for ACM cert with mismatching zone
- Add alb_name length validation. The `alb_name` variable will now only accept strings that are a maximum of 32 characters in length. This is a requirement imposed by the AWS API - so catching these issues on the client side prevents runtime errors. However, since [native Terraform variable validation](https://www.hashicorp.com/blog/custom-variable-validation-in-terraform-0-13) was released in `v0.13.0`, you will need to use at least Terraform `v0.13.0` (or greater) going forward once you begin using this release.



</div>


### [v0.24.0](https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.24.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/8/2021 | Modules affected: acm-tls-certificate | <a href="https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.24.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- [Enhance documentation to clarify](https://github.com/gruntwork-io/terraform-aws-load-balancer/blob/2d2e15a6a56a9f298716bb74eea687b6905895ed/modules/acm-tls-certificate/README.md#requesting-a-certificate-for-a-domain-that-doesnt-match-its-hosted-zone-name) that if you are requesting a certificate for domain `X` but attaching it to a hosted zone whose name does not exactly match `X`, then you must specify `hosted_zone_id` in your acm tls certificate input map within `var.acm_tls_certificates`.
- Extend documentation with [explanation of the programmatic DNS validation process](https://github.com/gruntwork-io/terraform-aws-load-balancer/blob/2d2e15a6a56a9f298716bb74eea687b6905895ed/modules/acm-tls-certificate/README.md#understanding-how-acm-certificates-are-programmatically-requested-and-verified).
- Modify internal filtering login breaking breaking tests.



</div>



## terraform-aws-messaging


### [v0.6.0](https://github.com/gruntwork-io/terraform-aws-messaging/releases/tag/v0.6.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/28/2021 | Modules affected: kinesis, sns, sqs | <a href="https://github.com/gruntwork-io/terraform-aws-messaging/releases/tag/v0.6.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- **Terraform 0.15 upgrade**: We have verified that this repo is compatible with Terraform `0.15.x`! 
    - From this release onward, we will only be running tests with Terraform `0.15.x` against this repo, so we recommend updating to `0.15.x` soon! 
    - To give you more time to upgrade, for the time being, all modules will still support Terraform `0.12.26` and above, as that version has several features in it (`required_providers` with `source` URLs) that make it more forwards compatible with `0.15.x`. 
    - Once all Gruntwork repos have been upgrade to work with `0.15.x`, we will publish a migration guide with a version compatibility table and announce it all via the Gruntwork Newsletter.





</div>



## terraform-aws-monitoring


### [v0.26.1](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.26.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/2/2021 | Modules affected: alarms | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.26.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- You can now configure custom auth settings for the nested `provider` block within the `route53-health-check-alarms` module using the new input variables `provider_role_arn`, `provider_external_id`, `provider_session_name`, `provider_profile`, and `provider_shared_credentials_file`.



</div>



## terraform-aws-openvpn


### [v0.15.0](https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.15.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/28/2021 | Modules affected: openvpn-server | <a href="https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.15.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- **Terraform 0.15 upgrade**: We have verified that this repo is compatible with Terraform `0.15.x`! 
    - From this release onward, we will only be running tests with Terraform `0.15.x` against this repo, so we recommend updating to `0.15.x` soon! 
    - To give you more time to upgrade, for the time being, all modules will still support Terraform `0.12.26` and above, as that version has several features in it (`required_providers` with `source` URLs) that make it more forwards compatible with `0.15.x`. 
    - Once all Gruntwork repos have been upgrade to work with `0.15.x`, we will publish a migration guide with a version compatibility table and announce it all via the Gruntwork Newsletter.





</div>


### [v0.14.2](https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.14.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/15/2021 | Modules affected: openvpn-admin | <a href="https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.14.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

Update the version of dependencies used in `openvpn-admin`.




</div>


### [v0.14.1](https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.14.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/13/2021 | Modules affected: openvpn-admin | <a href="https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.14.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

You can now customize the `mssfix` value used in the openvpn config that is downloaded by `openvpn-admin` by using the `--mssfix` flag. Additionally, the `openvpn-admin` command will automatically identify the optimal `mssfix` value to use for the client machine when omitted.



</div>


### [v0.14.0](https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.14.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/9/2021 | Modules affected: openvpn-server | <a href="https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.14.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  


- **Terraform 0.14 upgrade**: We have verified that this repo is compatible with Terraform `0.14.x`! 
    - From this release onward, we will only be running tests with Terraform `0.14.x` against this repo, so we recommend updating to `0.14.x` soon! 
    - To give you more time to upgrade, for the time being, all modules will still support Terraform `0.12.26` and above, as that version has several features in it (`required_providers` with `source` URLs) that make it more forwards compatible with `0.14.x`. 
    - Once all Gruntwork repos have been upgrade to work with `0.14.x`, we will publish a migration guide with a version compatibility table and announce it all via the Gruntwork Newsletter.
- Add `gox` to the test&apos;s README.md
- Add note for partial Ubuntu20 support 




</div>



## terraform-aws-sam


### [v0.4.0](https://github.com/gruntwork-io/terraform-aws-sam/releases/tag/v0.4.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/9/2021 | Modules affected: api-gateway-account-settings, gruntsam | <a href="https://github.com/gruntwork-io/terraform-aws-sam/releases/tag/v0.4.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- **Terraform 0.14 upgrade**: We have verified that this repo is compatible with Terraform `0.14.x`! 
    - From this release onward, we will only be running tests with Terraform `0.14.x` against this repo, so we recommend updating to `0.14.x` soon! 
    - To give you more time to upgrade, for the time being, all modules will still support Terraform `0.12.26` and above, as that version has several features in it (`required_providers` with `source` URLs) that make it more forwards compatible with `0.14.x`. 
    - Once all Gruntwork repos have been upgrade to work with `0.14.x`, we will publish a migration guide with a version compatibility table and announce it all via the Gruntwork Newsletter.



</div>



## terraform-aws-security


### [v0.48.1](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.48.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/30/2021 | Modules affected: account-baseline-root | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.48.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Use created Organization ID as default for `var.cloudtrail_organization_id`. Now the `account-baseline-root` module can set up Cloudtrail both at the _root-account_ level and _organization-wide_ level.


</div>


### [v0.48.0](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.48.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/29/2021 | Modules affected: account-baseline-app, account-baseline-root, account-baseline-security, aws-config-bucket | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.48.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- **Terraform 0.15 upgrade**: We have verified that this repo is compatible with Terraform `0.15.x`! 
    - From this release onward, we will only be running tests with Terraform `0.15.x` against this repo, so we recommend updating to `0.15.x` soon! 
    - To give you more time to upgrade, for the time being, all modules will still support Terraform `0.12.26` and above, as that version has several features in it (`required_providers` with `source` URLs) that make it more forwards compatible with `0.15.x`. 
    - Once all Gruntwork repos have been upgrade to work with `0.15.x`, we will publish a migration guide with a version compatibility table and announce it all via the Gruntwork Newsletter.





</div>


### [v0.47.0](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.47.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/27/2021 | Modules affected: auto-update, ntp, ssm-healthchecks-iam-permissions, tls-cert-private | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.47.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

Starting this release, all the modules have been updated to test with Ubuntu 20.04. As a result of this, support for Ubuntu 16.04 has been dropped.



</div>


### [v0.46.8](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.46.8)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/26/2021 | Modules affected: account-baseline-security | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.46.8">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- Adding module-level flags to allow enabling or disabling of `aws-config`, `iam-groups`, `iam-cross-account-roles` modules


</div>


### [v0.46.7](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.46.7)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/20/2021 | Modules affected: iam-user-password-policy, iam-users | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.46.7">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- You can now attach IAM policies (AWS managed, customer managed, and inline policies) directly to user in the `iam-users` module. Previously you were only able to attach IAM groups to the created users. Refer to the updated [variable description](https://github.com/gruntwork-io/terraform-aws-security/blob/891445d690de8f244a05e1ded69c95930c920fc7/modules/iam-users/variables.tf#L15) for more details.
- `iam-users` module is now robust to changes in the Access Key.



</div>


### [v0.46.6](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.46.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/14/2021 | Modules affected: iam-policies | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.46.6">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

The `dev_permitted_services` variable in the `iam-policies` module now allows fine-grained permissions. For example, this setting:

```
dev_permitted_services = [
    &quot;sns&quot;,
    &quot;s3:PutObject&quot;
]
```

grants `sns:*` and `s3:PutObject` permissions.

This change is backward compatible, but you will notice a new `sid` for the policy to reflect the change in functionality.



</div>


### [v0.46.5](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.46.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/13/2021 | Modules affected: iam-user-password-policy | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.46.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fixes the empty tuple errors when setting `var.create_resources` to `false` in the `iam-user-password-policy` module.





</div>


### [v0.46.4](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.46.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/2/2021 | Modules affected: iam-policies | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.46.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Adds Glue actions to the ReadOnlyAccess IAM policy 



</div>


### [v0.46.3](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.46.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/1/2021 | Modules affected: account-baseline-root | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.46.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- You can now enable access logging for the CloudTrail S3 bucket in `account-baseline-root` using the new `enable_cloudtrail_s3_server_access_logging` input variable.



</div>



## terraform-aws-server


### [v0.12.0](https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.12.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/28/2021 | Modules affected: ec2-backup, single-server | <a href="https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.12.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- **Terraform 0.15 upgrade**: We have verified that this repo is compatible with Terraform `0.15.x`! 
    - From this release onward, we will only be running tests with Terraform `0.15.x` against this repo, so we recommend updating to `0.15.x` soon! 
    - To give you more time to upgrade, for the time being, all modules will still support Terraform `0.12.26` and above, as that version has several features in it (`required_providers` with `source` URLs) that make it more forwards compatible with `0.15.x`. 
    - Once all Gruntwork repos have been upgrade to work with `0.15.x`, we will publish a migration guide with a version compatibility table and announce it all via the Gruntwork Newsletter.





</div>



## terraform-aws-service-catalog


### [v0.35.3](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.35.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/30/2021 | Modules affected: services, base, mgmt, networking | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.35.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- Updated dependencies for:
   - gruntwork-io/terraform-aws-asg to v0.14.0
   - gruntwork-io/terraform-aws-server to v0.12.0
   - gruntwork-io/terraform-aws-vpc to v0.15.0
   - gruntwork-io/terratest to v0.34.2
   - gruntwork-io/kubergrunt to v0.6.14
   - gruntwork-io/terragrunt to v0.29.1

- Use created Organization ID as default for `var.cloudtrail_organization_id`. Now the `account-baseline-root` module can set up Cloudtrail both at the _root-account_ level and _organization-wide_ level.




</div>


### [v0.35.2](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.35.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/26/2021 | Modules affected: services, landingzone, networking, base | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.35.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- Fixed the following bugs in `asg-service`:
   - The CloudWatch alarm variables `enable_cloudwatch_alarms` and `alarms_sns_topic_arn` are now properly recognized. Previously these variables were ignored and no alarms for the ASG were being configured.
   - You can now configure the name of the Target Group using the `target_group_name` in the object passed to the `server_ports` input. This is useful when migrating an existing target group into the service catalog module.
- Adding module-level flags to allow enabling or disabling of `aws-config`, `iam-groups`, `iam-cross-account-roles` modules. The default value of the `enable_*` flags is set to true, so using or calling these modules is not expected to change.
- Add variable validation to `alb_name` to guard against the limit of 32 characters for ALB names
- Fix bug in `ec2-baseline` where it incorrectly detected that `dpkg` was not available.
- Add sensible defaults for `ssh_grunt_iam_group` and `ssh_grunt_iam_group_sudo` to the `bastion-host` and `jenkins` modules.
- You can now configure a `PodDisruptionBudget` for your Kubernetes service deployed with the `k8s-service` module using the `min_number_of_pods_available` input variable.




</div>


### [v0.35.1](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.35.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/21/2021 | Modules affected: networking/alb | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.35.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- The `ssl_policy` on the ALB is now configurable.



</div>


### [v0.35.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.35.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/20/2021 | Modules affected: services/eks-core-services | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.35.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- You can now selectively disable the services that are deployed with `eks-core-services` using the new enable variables: `var.enable_fluent_bit`, `var.enable_alb_ingress_controller`, `var.enable_external_dns`, and `var.enable_cluster_autoscaler`. **NOTE**: This feature depends on Terraform 0.13.0 and above. If you are using Terraform 0.12, you must first upgrade to Terraform 0.13 to take advantage of this.




</div>


### [v0.34.2](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.34.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/19/2021 | Modules affected: services/eks-core-services | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.34.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- You can now control annotations and labels for the autoscaler service in `eks-core-services` using the new input variables `cluster_autoscaler_pod_annotations` and `cluster_autoscaler_pod_labels`, respectively.



</div>


### [v0.34.1](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.34.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/16/2021 | Modules affected: networking/route53 | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.34.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fix a bug in the output variables of the `route53` module that, depending on the inputs you passed in, could lead to an &quot;Inconsistent conditional result types&quot; error.






</div>


### [v0.34.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.34.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/15/2021 | Modules affected: mgmt/ecs-deploy-runner, mgmt/jenkins, mgmt/openvpn-server, services/eks-cluster | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.34.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Update a few more dependencies to work with Terraform 0.14, including:
    - Update dependency gruntwork-io/terraform-aws-eks to v0.36.0. **This is a breaking change.** See the migration guide below.
    - Update dependency gruntwork-io/terraform-aws-openvpn to v0.14.1
    - Update dependency gruntwork-io/terraform-aws-ci to v0.33.1
    - Update dependency gruntwork-io/terraform-aws-ecs to v0.28.1
    - Update dependency gruntwork-io/terraform-kubernetes-namespace to v0.2.0


</div>


### [v0.33.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.33.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/15/2021 | Modules affected: networking | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.33.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

Allows wildcard domains to be passed in the `subject_alternative_names`, making it easier to request a single ACM certificate that protects both the apex domain (`example.com`) AND the first level of subdomains (`*.example.com`). To achieve this, request `example.com` in the key of your `var.public_zones` map and pass `*.example.com` in the `subject_alternative_names` list for the same entry: 

```
public_zones = &#x7B;
       &quot;example.com&quot; = &#x7B;
           comment = &quot;You can add arbitrary text here&quot;
           tags = &#x7B;
              Foo = &quot;bar&quot;
           &#x7D;
           force_destroy = true
           subject_alternative_names = [&quot;*.example.com&quot;]
           created_outside_terraform = true
           base_domain_name_tags = &#x7B;
               original = true
           &#x7D;
       &#x7D;
  &#x7D;
```

**NOTE**: Starting this release, it is no longer possible to disable the creation of ACM certificates on the domains that are managed by the module. We introduced back the ability to disable ACM certificate creation in [v0.44.5](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.44.5). It is advised to upgrade to at least that version if you want to avoid managing ACM certificates in this module.


</div>


### [v0.32.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.32.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/15/2021 | Modules affected: data-stores/elasticsearch, mgmt/jenkins-server, mgmt/bastion-host, services/eks-cluster | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.32.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Encryption is now enabled by default for Elasticsearch 
- Encryption is now by default for the Jenkins EBS volume.
- All Packer templates now enable encryption by default for the root volume of the image.
- The `sns-topics` module now accepts a `kms_master_key_id` and a list of `allow_publish_services` that allow the given AWS services to publish to the SNS topic.



</div>


### [v0.31.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.31.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/14/2021 | Modules affected: base, data-stores, landingzone, mgmt | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.31.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- **Terraform 0.14 upgrade**: We have verified that this repo is compatible with Terraform `0.14.x`! 
    - From this release onward, we will only be running tests with Terraform `0.14.x` against this repo, so we recommend updating to `0.14.x` soon! 
    - To give you more time to upgrade, for the time being, all modules will still support Terraform `0.12.26` and above, as that version has several features in it (`required_providers` with `source` URLs) that make it more forwards compatible with `0.14.x`. 
    - Once all Gruntwork repos have been upgrade to work with `0.14.x`, we will publish a migration guide with a version compatibility table and announce it all via the Gruntwork Newsletter.





</div>


### [v0.30.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.30.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/14/2021 | Modules affected: mgmt/jenkins, mgmt/openvpn-server, data-stores, services | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.30.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- All modules that were exporting CloudWatch dashboard metric widgets now also expose all the widgets in a single list output `all_metric_widgets`. This makes it easier to construct dashboards for specific services.
- The `jenkins` module will now force https protocol for the ALB. Previously, the jenkins ALB was accessible under both http (port 80) and https (port 443). Now the ALB will automatically redirect to https when accessed under http.
- The default version of Jenkins installed with the `jenkins-server` packer template is now `2.277.2` (previously `2.263.4`). The default version of Terraform installed with the `jenkins-server` packer template is now `0.13.6` (previously `0.12.21`). 
- The domain settings for `openvpn-server` now allow you to specify a custom domain.
- `account-baseline-app` now has a number of conditional variables that can be used to enable/disable the creation of resources.
- `account-baseline-app` now has the option to automatically deploy the `iam-access-analyzer-multi-region` module inline with the other account baselines. Note: this is disabled by default.
adds a number of conditional variables to the App Account Baseline in order to override the creation of resources with their CIS-compatible variants.
-  Update dependency gruntwork-io/terraform-aws-eks to v0.35.2. You can now configure additional output streams for `fluent-bit` on the `eks-core-services` module.
- Update dependency gruntwork-io/gruntwork-installer to v0.0.36
- Update dependency gruntwork-io/kubergrunt to v0.6.12


</div>


### [v0.29.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.29.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/9/2021 | Modules affected: services/eks-cluster, services, mgmt, networking | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.29.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Update dependency gruntwork-io/terraform-aws-eks to v0.35.1 (was `v0.33.1`). **This is a backward incompatible change.** This update renames the default Fargate Execution IAM role that gets created by the `eks-cluster-control-plane` module. To avoid recreating the IAM role, you need to configure `custom_default_fargate_iam_role_name` to be `&lt;CLUSTER_NAME&gt;-default-fargate-execution-role`.
- Update dependency gruntwork-io/terragrunt to v0.28.19



</div>


### [v0.28.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.28.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/8/2021 | Modules affected: services/ecs-cluster, services, base, data-stores | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.28.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Several bug fixes in the `ecs-cluster` module:
    - Remove unused variables (`allow_requests_from_public_alb`, `include_internal_alb`, `enable_cloudwatch_alarms`). If you were configuring these, you will need to remove them from your module call.
    - `enable_ecs_cloudwatch_alarms`, `enable_cloudwatch_metrics`, and `enable_cloudwatch_log_aggregation` now default to `true` like all the other modules in the Service Catalog. Set to `false` if you were using the default values.
    - Remove redundant cloudwatch logs aggregation IAM policy attachment.

- Update dependency gruntwork-io/terraform-aws-monitoring to v0.26.1
- Add ability to specify the encryption configuration for the images in the ECR repo
- Update dependency gruntwork-io/kubergrunt to v0.6.11
- Update dependency gruntwork-io/terraform-aws-security to v0.46.4
- Update dependency gruntwork-io/terratest to v0.32.21



</div>


### [v0.27.3](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.27.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/7/2021 | Modules affected: landingzone | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.27.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Add comment about why we are setting domain TTL so low
- Port of `account-baseline-root` fixes from `terraform-aws-security` (v0.45.6 and v0.46.2)




</div>


### [v0.27.2](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.27.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/6/2021 | Modules affected: services/eks-cluster, data-stores/elasticsearch | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.27.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Expose ability to configure TTL of domains in `k8s-service` module.
- Exposes `eks_kubeconfig` output in the `eks-cluster` module from underlying `eks-cluster-control-plane` module.
- Allows disabling EBS volumes in Elasticsearch domains, thus permitting the use of instance types with optimized instance storage such as `i3` instances.



</div>


### [v0.27.1](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.27.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/6/2021 | Modules affected: services/ecs-service, services/asg-service, networking, landingzone/account-baseline-root | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.27.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Update dependency gruntwork-io/terraform-aws-static-assets to v0.8.0 (was v0.7.1)
- Update dependency gruntwork-io/terraform-aws-load-balancer to v0.23.0 (was v0.22.0)
-  Add Access Analyzer to `var.organizations_aws_service_access_principals`



</div>


### [v0.27.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.27.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/1/2021 | Modules affected: services/ecs-service, services, mgmt | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.27.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Update dependency gruntwork-io/gruntwork-installer to v0.0.35
- Update dependency gruntwork-io/terraform-aws-ci to v0.31.1 (was v0.30.0)
- Update dependency gruntwork-io/terraform-aws-ecs to v0.27.0 (was v0.26.0)



</div>


### [v0.26.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.26.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/1/2021 | Modules affected: data-stores/redis, services/ecs-service, mgmt, base | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.26.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Address various inconsistencies in the `ecs-service` module:
    - Cleaned up health check related parameters to distinguish between those config for the Route 53 health check and those for the ALB.
    - Remove unused IAM role (`aws_iam_role.ecs_task_execution_role`)
    - Expose custom IAM role name prefixes.
    - Adjust required variables: `ecs_cluster_name` is now required, since it results in errors when set to `null` and `ecs_node_port_mappings`, which is only used in special circumstances, now defaults to `null`.

- Update dependency gruntwork-io/terraform-aws-cache to v0.13.0 (previously v0.11.0)
- Update dependency gruntwork-io/terraform-aws-security to v0.46.0 (previously v0.45.1)
- Update dependency gruntwork-io/terratest to v0.32.18 (previously v0.32.10)
- Update dependency gruntwork-io/terraform-aws-ecs to v0.25.3 (previously v0.25.1)
- Update dependency gruntwork-io/terragrunt to v0.28.18 (previously v0.28.16)
- Update dependency gruntwork-io/terraform-aws-server to v0.11.0 (previously v0.10.1)
- Update dependency gruntwork-io/terraform-aws-eks to v0.33.1 (previously v0.32.4)
- Update dependency gruntwork-io/terraform-aws-asg to v0.12.1 (previously v0.11.2)
- Update dependency gruntwork-io/terraform-aws-data-storage to v0.18.1 (previously v0.17.3)
- Update dependency gruntwork-io/terraform-aws-vpc to v0.14.4 (previously v0.13.1)



</div>


### [v0.15.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.15.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/13/2021 | Modules affected: services/eks-cluster, services/k8s-namespace, mgmt, networking | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.15.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Update dependency gruntwork-io/terraform-aws-eks v0.29.1 =&gt; v0.31.1 Release notes:
    - [v0.29.2](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.29.2)
    - [v0.30.0](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.30.0)
    - [v0.31.0](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.31.0)
    - [v0.31.1](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.31.1)
- Updated from `terraform-kubernetes-helm` to `terraform-kubernetes-namespace` for managing Namespaces.
- Add Healthcheck variables and parameter passing to ecs-service for ELB.



</div>



## terraform-aws-static-assets


### [v0.9.1](https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.9.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/28/2021 | Modules affected: s3-cloudfront | <a href="https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.9.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- You can now configure the SSL protocol and origin protocol policy for CloudFront when it access the S3 bucket using the `bucket_origin_config_protocol_policy` and `bucket_origin_config_ssl_protocols` variables.



</div>


### [v0.9.0](https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.9.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/28/2021 | Modules affected: s3-cloudfront, s3-static-website | <a href="https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.9.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- **Terraform 0.15 upgrade**: We have verified that this repo is compatible with Terraform `0.15.x`! 
    - From this release onward, we will only be running tests with Terraform `0.15.x` against this repo, so we recommend updating to `0.15.x` soon! 
    - To give you more time to upgrade, for the time being, all modules will still support Terraform `0.12.26` and above, as that version has several features in it (`required_providers` with `source` URLs) that make it more forwards compatible with `0.15.x`. 
    - Once all Gruntwork repos have been upgrade to work with `0.15.x`, we will publish a migration guide with a version compatibility table and announce it all via the Gruntwork Newsletter.





</div>


### [v0.8.1](https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.8.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/27/2021 | Modules affected: s3-cloudfront, s3-static-website | <a href="https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.8.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- You can now specify lifecycle rules for the S3 bucket using the new `lifecycle_rules` input variable.
- You can now automatically generate a random suffix for the S3 bucket name by setting the `add_random_id_name_suffix` input variable to `true`. This is helpful in ensuring that your S3 bucket name is globally unique.



</div>



## terraform-aws-utilities


### [v0.5.0](https://github.com/gruntwork-io/terraform-aws-utilities/releases/tag/v0.5.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/28/2021 | Modules affected: executable-dependency, instance-type, join-path, list-remove | <a href="https://github.com/gruntwork-io/terraform-aws-utilities/releases/tag/v0.5.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- **Terraform 0.15 upgrade**: We have verified that this repo is compatible with Terraform `0.15.x`! 
    - From this release onward, we will only be running tests with Terraform `0.15.x` against this repo, so we recommend updating to `0.15.x` soon! 
    - To give you more time to upgrade, for the time being, all modules will still support Terraform `0.12.26` and above, as that version has several features in it (`required_providers` with `source` URLs) that make it more forwards compatible with `0.15.x`. 
    - Once all Gruntwork repos have been upgrade to work with `0.15.x`, we will publish a migration guide with a version compatibility table and announce it all via the Gruntwork Newsletter.





</div>



## terraform-aws-vpc


### [v0.15.0](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.15.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/28/2021 | Modules affected: vpc-flow-logs, network-acl-inbound, network-acl-outbound, vpc-app-network-acls | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.15.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- **Terraform 0.15 upgrade**: We have verified that this repo is compatible with Terraform `0.15.x`! 
    - From this release onward, we will only be running tests with Terraform `0.15.x` against this repo, so we recommend updating to `0.15.x` soon! 
    - To give you more time to upgrade, for the time being, all modules will still support Terraform `0.12.26` and above, as that version has several features in it (`required_providers` with `source` URLs) that make it more forwards compatible with `0.15.x`. 
    - Once all Gruntwork repos have been upgrade to work with `0.15.x`, we will publish a migration guide with a version compatibility table and announce it all via the Gruntwork Newsletter.





</div>

<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "releases",
  "hash": "a0218784b7820fe21d80cc35e51b07ca"
}
##DOCS-SOURCER-END -->

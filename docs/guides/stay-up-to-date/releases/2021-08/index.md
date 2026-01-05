
# Gruntwork release 2021-08

<p style={{marginTop: "-25px"}}><small><a href="/guides">Guides</a> / <a href="/guides/stay-up-to-date">Update Guides</a> / <a href="/guides/stay-up-to-date/releases">Releases</a> / 2021-08</small></p>

This page is lists all the updates to the [Gruntwork Infrastructure as Code
Library](https://gruntwork.io/infrastructure-as-code-library/) that were released in 2021-08. For instructions
on how to use these updates in your code, check out the [updating
documentation](/library/stay-up-to-date/updating).

Here are the repos that were updated:

- [gruntwork](#gruntwork)
- [repo-copier](#repo-copier)
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
- [terraform-aws-security](#terraform-aws-security)
- [terraform-aws-server](#terraform-aws-server)
- [terraform-aws-service-catalog](#terraform-aws-service-catalog)
- [terraform-aws-static-assets](#terraform-aws-static-assets)
- [terraform-aws-vpc](#terraform-aws-vpc)


## gruntwork


### [v0.2.4](https://github.com/gruntwork-io/gruntwork/releases/tag/v0.2.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/25/2021 | <a href="https://github.com/gruntwork-io/gruntwork/releases/tag/v0.2.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Added support for passing in extra parameters for DNS configuration to the `dns register` subcommand. Some international domains require additional configuration.

</div>


### [v0.2.3](https://github.com/gruntwork-io/gruntwork/releases/tag/v0.2.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/20/2021 | <a href="https://github.com/gruntwork-io/gruntwork/releases/tag/v0.2.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Starting this release, we will publish binaries for `darwin/arm64` (Apple Silicon) architecture.

</div>



## repo-copier


### [v0.0.17](https://github.com/gruntwork-io/repo-copier/releases/tag/v0.0.17)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/19/2021 | <a href="https://github.com/gruntwork-io/repo-copier/releases/tag/v0.0.17">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  This release contains updates to the formatting of any `go` code, and an update to documentation on how to run and configure automated tests with the trial license. 
- Replaced `gofmt` with `goimports`. 
- Updated documentation to detail how to update trial licenses


</div>



## terraform-aws-architecture-catalog


### [v0.0.18](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v0.0.18)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/19/2021 | <a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v0.0.18">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  (no release notes found)

</div>


### [v0.0.17](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v0.0.17)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/19/2021 | <a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v0.0.17">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  (no release notes found)

</div>


### [v0.0.16](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v0.0.16)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/19/2021 | <a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v0.0.16">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  (no release notes found)

</div>



## terraform-aws-asg


### [v0.15.1](https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.15.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/17/2021 | Modules affected: server-group | <a href="https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.15.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Removed references to deprecated `template` provider and replaced with official replacements.



</div>



## terraform-aws-cache


### [v0.16.1](https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v0.16.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/17/2021 | Modules affected: memcached, redis | <a href="https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v0.16.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Removed references to deprecated `template` provider




</div>



## terraform-aws-ci


### [v0.38.9](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.38.9)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/24/2021 | Modules affected: ecs-deploy-runner-standard-configuration, infrastructure-deploy-script | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.38.9">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- You can now pass through `terragrunt-log-level` as `command-args` in EDR to `infrastructure-deploy-script`



</div>


### [v0.38.8](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.38.8)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/20/2021 | Modules affected: ecs-deploy-runner | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.38.8">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Bump to latest kubergrunt version in `ecs-deploy-runner` container.





</div>


### [v0.38.7](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.38.7)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/20/2021 | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.38.7">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Updates edrhelpers test assertion with a new expected string value. No functional impact for users.





</div>


### [v0.38.6](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.38.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/20/2021 | Modules affected: ecs-deploy-runner | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.38.6">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

Updates the ecs-deploy-runner `Dockerfile` to use the correct version of `terraform-aws-ci` with updated and fixed build scripts.




</div>


### [v0.38.5](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.38.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/18/2021 | Modules affected: ecs-deploy-runner-standard-configuration, infrastructure-deploy-script | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.38.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- `ecs-deploy-runner-standard-configuration`
- `infrastructure-deploy-script`


- Support `destroy` in the CI / CD pipeline. The `ecs-deploy-runner-standard-configuration` has been updated to support running `destroy`, `plan -destroy`, and `apply -destroy`. The `infrastructure-deploy-script` has been updated to run destroy operations under certain protections:
  - It validates that the destroy request is only for a path/module that has indeed been deleted in the latest version of the repo for which the script is called.
  - It makes sure that the destroy ref (commit/tag/branch) is indeed in the ancestry path of the main branch.



- https://github.com/gruntwork-io/terraform-aws-ci/pull/327




</div>


### [v0.38.4](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.38.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/17/2021 | Modules affected: build-helpers, ecs-deploy-runner | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.38.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

`build-packer-artifact` now supports HCL Packer templates. The ecs-deploy-runner `Dockerfile` has been updated to include [`hcl2json`](https://github.com/tmccombs/hcl2json) which is needed by the updated `build-packer-artifact`.




</div>


### [v0.38.3](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.38.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/13/2021 | Modules affected: ecs-deploy-runner | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.38.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- ECS Deploy Runner now defaults to installing packer 1.7.4 and `terraform-aws-ci` version `0.38.2`




</div>


### [v0.38.2](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.38.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/9/2021 | Modules affected: build-helpers | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.38.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Updated `build-packer-artifact` to be compatible with provider download specifications from packer 1.7. The script will now call `packer init` if the target template is non-json and the underlying packer version supports `init`.



</div>



## terraform-aws-cis-service-catalog


### [v0.27.0](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.27.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/27/2021 | Modules affected: landingzone, observability | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.27.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- This release reverts [v0.24.0](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.24.0), updating MFA Delete = false for S3 Buckets.


</div>


### [v0.26.3](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.26.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/27/2021 | Modules affected: networking, observability, security, landingzone | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.26.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Update dependency gruntwork-io/terraform-aws-vpc to v0.17.3
- Update dependency gruntwork-io/terraform-aws-security to v0.54.0
- Update dependency gruntwork-io/terraform-aws-service-catalog to v0.59.4



</div>


### [v0.26.2](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.26.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/24/2021 | Modules affected: landingzone, security | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.26.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

Integrates Macie into the Landing Zone modules. This release also makes the `buckets_to_analyze` variable optional and defaults it to empty. When `buckets_to_analyze` has no entry for a particular region, the resource `aws_macie2_classification_job` will not be created in that region.




</div>


### [v0.26.1](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.26.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/23/2021 | Modules affected: landingzone, networking, observability, security | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.26.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- **macie: Add support for multi-account setup**. Add two additional resources to the macie module: `aws_macie2_member` and `aws_macie2_invitation_accepter`, whereby adding support for the multi-account setup. The multi-account setup functions in a similar way to Security Hub: administrator account will have a number of `aws_macie2_member` created in it (in each enabled region), one for each member account. This is controlled by the `external_member_accounts` variable. Member accounts will each have a `aws_macie2_invitation_accepter` resource created in them (in each enabled region). This is controlled by the `administrator_account_id` variable.

- This release also updates a number of dependencies:
  - `gruntwork-io/terraform-aws-security` to `v0.53.7`
  - `gruntwork-io/terraform-aws-lambda` to `v0.13.3`
  - `gruntwork-io/terraform-aws-vpc` to `v0.17.2`
  - `gruntwork-io/terraform-aws-monitoring` to `v0.30.1`
  - `gruntwork-io/terraform-aws-service-catalog` to `v0.58.5`

- This release also updates the `for-production` examples for architecture catalog `v0.0.18`


</div>


### [v0.26.0](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.26.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/11/2021 | Modules affected: landingzone, networking, observability, security | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.26.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- **Terraform 1.0 upgrade**: We have verified that this repo is compatible with Terraform `1.0.x`! 
    - From this release onward, we will only be running tests with Terraform `1.0.x` against this repo, so we recommend updating to `1.0.x` soon! 
    - To give you more time to upgrade, for the time being, all modules will still support Terraform `0.15.1` and above, as that version has several features in it (`required_providers` with `source` URLs) that make it more forwards compatible with `1.0.x`. 
    - Once all Gruntwork repos have been upgrade to work with `1.0.x`, we will publish a migration guide with a version compatibility table and announce it all via the Gruntwork Newsletter.




</div>


### [v0.25.1](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.25.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/11/2021 | Modules affected: landingzone, networking, security, observability | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.25.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
Add a module for deploying and configuring Amazon Macie.

This release also configures the RenovateBot not to update this repo itself, as well as updates the following dependencies:
- `gruntwork-io/terraform-aws-vpc` to `v0.17.1`
- `gruntwork-io/terraform-aws-security` to `v0.53.4`
- `gruntwork-io/terraform-aws-lambda` to `v0.13.2`
- `gruntwork-io/terraform-aws-service-catalog` to `v0.56.1`


</div>


### [v0.25.0](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.25.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/5/2021 | Modules affected: security, networking, observability, landingzone | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.25.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  


- **Update the codebase to new multi-region approach**. In [v0.51.0](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.51.0) of `terraform-aws-security`, we refactored how we build multi-region modules—that is, those modules that deploy resources across every single AWS region, such as `aws-config-multi-region`—to no longer create nested `provider` blocks, and instead, have users pass in providers via the `providers` map. In this release, we have updated the modules in this repo to use this new release of `terraform-aws-security` and to use the same behavior with providers. This reduces the number of providers that Terraform must instantiate, making the modules _much_ faster and more stable to use. It also gives you full control over how to authenticate to your various AWS accounts. However, this is a backwards incompatible change, so [make sure to read the migration guide below](#migration-guide).

- **Update dependency versions**: We have updated the versions of a number of dependencies in this repo. Here are the versions that have been updated in this release:
    - Update dependency `gruntwork-io/terraform-aws-utilities` to `v0.6.0`
    - Update dependency `gruntwork-io/terraform-aws-lambda` to `v0.13.0`
    - Update dependency `gruntwork-io/terraform-aws-vpc` to `v0.17.0`
    - Update dependency `gruntwork-io/terraform-aws-monitoring` to `v0.30.0`
    - Update dependency `gruntwork-io/terraform-aws-security` to `v0.53.2`
    - Update dependency `gruntwork-io/terraform-aws-service-catalog` to `v0.55.1`



</div>


### [v0.24.1](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.24.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/3/2021 | Modules affected: networking/vpc | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.24.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Override renovate.json ignorePaths so that it won&apos;t ignore examples or tests
- vpc: Expose default security group ID in outputs



</div>



## terraform-aws-data-storage


### [v0.21.1](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.21.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/18/2021 | Modules affected: aurora, lambda-cleanup-snapshots, lambda-copy-shared-snapshot, lambda-create-snapshot | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.21.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Removed references to `template` provider and replaced with official alternatives.



</div>



## terraform-aws-ecs


### [v0.31.0](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.31.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/30/2021 | Modules affected: ecs-service | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.31.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Added support for [`protocol_version`](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lb_target_group#protocol_version) in the ECS service target group.
- **Note:** the AWS provider for this release has been updated from `2.0` to `3.27`, making the release backward incompatible. Refer to the [Terraform AWS Provider Version 3 Upgrade Guide](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/guides/version-3-upgrade).



</div>


### [v0.30.4](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.30.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/25/2021 | Modules affected: ecs-service | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.30.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Updated to expose `proxy_configuration` subblock for the `aws_ecs_task_definition` resource to support App Mesh.



</div>


### [v0.30.3](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.30.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/18/2021 | Modules affected: ecs-service | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.30.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Removed references to the deprecated `template` provider and replaced with official recommendation.





</div>


### [v0.30.2](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.30.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/11/2021 | Modules affected: ecs-service | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.30.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- You can now enable the ECS &quot;circuit breaker&quot; feature via the new `deployment_circuit_breaker` input variable.



</div>



## terraform-aws-eks


### [v0.44.6](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.44.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/25/2021 | Modules affected: eks-cluster-control-plane | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.44.6">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Updated the `kubergrunt` version that gets automatically installed to `v0.7.9`



</div>


### [v0.44.5](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.44.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/20/2021 | Modules affected: eks-cluster-control-plane | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.44.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Bump default kubergrunt download URL to the latest version





</div>


### [v0.44.4](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.44.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/19/2021 | Modules affected: eks-container-logs | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.44.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Exposed `extraFilters` helm chart input value with the `extra_filters` var in the `eks-container-logs` module.



</div>


### [v0.44.3](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.44.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/13/2021 | Modules affected: eks-k8s-cluster-autoscaler-iam-policy | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.44.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Updated Cluster Autoscaler IAM permissions to allow describing launch templates



</div>


### [v0.44.2](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.44.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/13/2021 | Modules affected: eks-cluster-control-plane, eks-cluster-workers-cross-access, eks-k8s-external-dns | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.44.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Removed usage of the deprecated `template` provider and replaced them with HashiCorp recommended replacements.




</div>


### [v0.44.1](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.44.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/13/2021 | Modules affected: eks-aws-auth-merger, eks-cluster-control-plane | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.44.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Upgraded dependencies of `aws-auth-merger`.
- Updated examples to use packer 1.7 with HCL2.
- Bumped reference `kubergrunt` version to `0.7.4`.




</div>



## terraform-aws-lambda


### [v0.13.3](https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.13.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/18/2021 | Modules affected: lambda-edge | <a href="https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.13.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Add a `required_providers` block to the `lambda-edge` module so you can pass in a custom provider and not get warnings in Terraform 0.15 and above.



</div>


### [v0.13.2](https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.13.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/11/2021 | Modules affected: lambda | <a href="https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.13.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- You can now have the `lambda` module use an existing IAM role, rather than creating a new one, by passing in the IAM role&apos;s ARN via the new `existing_role_arn` input variable.



</div>


### [v0.13.1](https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.13.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/9/2021 | Modules affected: lambda-edge, lambda | <a href="https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.13.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Removed usage of the `template` provider which is now deprecated.



</div>



## terraform-aws-load-balancer


### [v0.27.1](https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.27.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/17/2021 | <a href="https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.27.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Examples have been updated to not use the deprecated `template` provider. No changes to modules.



</div>



## terraform-aws-messaging


### [v0.7.2](https://github.com/gruntwork-io/terraform-aws-messaging/releases/tag/v0.7.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/10/2021 | Modules affected: sqs | <a href="https://github.com/gruntwork-io/terraform-aws-messaging/releases/tag/v0.7.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Removed references to the deprecated `template` provider



</div>



## terraform-aws-monitoring


### [v0.30.2](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.30.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/30/2021 | Modules affected: alarms/elasticache-redis-alarms | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.30.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fix copy/paste error in the `curr_connections` and `replication-lag` alarm names in `elasticache-redis-alarms`. 
- Several fixes to stabilize automated tests in this repo.



</div>


### [v0.30.1](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.30.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/19/2021 | Modules affected: alarms | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.30.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Removed references to deprecated `template` provider and replaced with official Hashicorp alternatives.



</div>



## terraform-aws-openvpn


### [v0.16.1](https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.16.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/17/2021 | <a href="https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.16.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Removed references to deprecated `template` provider in examples (no changes to underlying modules).




</div>



## terraform-aws-security


### [v0.54.0](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.54.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/24/2021 | Modules affected: aws-config-bucket, aws-config-multi-region, aws-config, cloudtrail-bucket | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.54.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Remove variable `enable_lifecycle_rules` (introduced at [v0.53.1](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.53.1)) from Config and Cloudtrail buckets
  This variable was only being used when `mfa_delete=true`, to reduce complexity we removed it and `mfa_delete` is being used as a toggle for the Lifecycle rules.


</div>


### [v0.53.7](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.53.7)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/19/2021 | Modules affected: private-s3-bucket | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.53.7">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Added a new boolean flag, `var.enable_sse`, that dictates whether or not to enable SSE on S3 buckets.




</div>


### [v0.53.6](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.53.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/19/2021 | Modules affected: aws-config | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.53.6">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- You can now control if the `aws-config` module tries to attach IAM policies to the IAM role using the new `should_attach_sns_policy` input variable.



</div>


### [v0.53.5](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.53.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/17/2021 | Modules affected: custom-iam-entity, os-hardening | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.53.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Removed references to the deprecated `template` provider and replaced with official recommendations.



</div>


### [v0.53.4](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.53.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/11/2021 | Modules affected: cloudtrail-bucket, cloudtrail, aws-config-multi-region, aws-config | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.53.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Clarifies optional direct usage of cloudtrail-bucket module
- Explains how to configure the cloudtrail bucket to exist outside of the management account
- Updates the aws-config module aggregator functionality to work with the `aws_region` data source and module `depends_on`. For details, see https://github.com/gruntwork-io/terraform-aws-security/pull/509.



</div>


### [v0.53.3](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.53.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/10/2021 | Modules affected: aws-config-multi-region, aws-config | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.53.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Introduced `enable_all_regions_for_config_aggregator` which can be used to configure whether AWS should set the config aggregator to all regions regardless of `opt_in_regions`.




</div>



## terraform-aws-server


### [v0.13.3](https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.13.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/18/2021 | Modules affected: single-server | <a href="https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.13.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Added variable for passing a map of tags to set on the root volume.



</div>


### [v0.13.2](https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.13.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/10/2021 | <a href="https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.13.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Removed references to deprecated `template` provider




</div>


### [v0.13.1](https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.13.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/3/2021 | Modules affected: single-server | <a href="https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.13.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- You can now configure the `single-server` module to point the Route 53 DNS record at the private IP of the EIP rather than the public IP by setting the new `dns_uses_private_ip` variable to `true`.



</div>



## terraform-aws-service-catalog


### [v0.59.4](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.59.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/26/2021 | Modules affected: services | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.59.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Update ecs-service module with newly added inputs to configure App Mesh behavior



</div>


### [v0.59.3](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.59.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/25/2021 | Modules affected: landingzone/account-baseline-security | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.59.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

Optionally create service-linked roles for security account using `var.service_linked_roles`.



</div>


### [v0.59.2](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.59.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/25/2021 | Modules affected: services | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.59.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Updated `eks-workers` module to allow specifying per Managed Node Group (MNG) `--kublet-extra-args`. You can now configure `eks_kubelet_extra_args` on each MNG group to override the extra args that should be passed to the underlying kubelet process. You can also configure different user data boot scripts for each worker by setting the `cloud_init_parts` field on the MNG configuration.





</div>


### [v0.59.1](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.59.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/24/2021 | Modules affected: services | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.59.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Updated `eks-workers` module to allow specifying per ASG `--kublet-extra-args`. You can now configure `eks_kubelet_extra_args` on each ASG group to override the extra args that should be passed to the underlying kubelet process. You can also configure different user data boot scripts for each worker by setting the `cloud_init_parts` field on the ASG configuration.



</div>


### [v0.59.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.59.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/24/2021 | Modules affected: data-stores, landingzone, networking | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.59.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Set MFA Delete to false by default on S3 buckets **[BACKWARDS INCOMPATIBLE]**
- Adding `apply_default_nacl_rules` to the VPC module


</div>


### [v0.58.5](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.58.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/20/2021 | Modules affected: data-stores/s3-bucket, mgmt | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.58.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Add a new boolean flag, `var.enable_sse`, that dictates whether or not to enable SSE on S3 buckets.
- Update dependency gruntwork-io/terraform-aws-ci to v0.38.6



</div>


### [v0.58.4](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.58.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/20/2021 | Modules affected: mgmt, networking, services, base | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.58.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- Added ability to configure additional filters on `fluent-bit` in `eks-core-services` module
- Update dependency gruntwork-io/kubergrunt to v0.7.6
- Update dependency gruntwork-io/terraform-aws-eks to v0.44.4
- Update dependency gruntwork-io/terraform-aws-ci to v0.38.5
- Update dependency gruntwork-io/terraform-aws-server to v0.13.3
- Update dependency gruntwork-io/terraform-aws-monitoring to v0.30.1
- Update dependency gruntwork-io/terraform-aws-data-storage to v0.21.1
- Update dependency gruntwork-io/terraform-aws-openvpn to v0.16.1
- Update dependency gruntwork-io/terraform-aws-asg to v0.15.1
- Update dependency gruntwork-io/terraform-aws-cache to v0.16.1
- Update dependency gruntwork-io/terraform-aws-load-balancer to v0.27.1
- Update dependency gruntwork-io/terraform-aws-ecs to v0.30.3
- Update dependency gruntwork-io/terraform-aws-messaging to v0.7.2
- Update dependency gruntwork-io/terraform-aws-vpc to v0.17.2




</div>


### [v0.58.3](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.58.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/19/2021 | Modules affected: data-stores | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.58.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

-  Add support for passing CORS Rules via `var.cors_rules`



</div>


### [v0.58.2](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.58.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/19/2021 | Modules affected: services/ec2-instance | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.58.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- When you set `dns_zone_is_private` to `true`, the `ec2-instance` module will now associate the private IP of the instance with the Route 53 private zone.



</div>


### [v0.58.1](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.58.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/19/2021 | Modules affected: mgmt, base, services | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.58.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Allow the Elastic IP to not be created in the ec2-instance module.
- The following dependencies were updated to:
  - Update dependency gruntwork-io/terragrunt to v0.31.5
  - Update dependency gruntwork-io/terraform-aws-server to v0.13.2
  - Update dependency gruntwork-io/terraform-aws-lambda to v0.13.3
  - Update dependency gruntwork-io/terraform-aws-ci to v0.38.4
  - Update dependency gruntwork-io/gruntwork-installer to v0.0.37






</div>


### [v0.58.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.58.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/17/2021 | Modules affected: services | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.58.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Added the ability to track external Fargate Profile executor IAM roles in the aws-auth configmap
- Fixed bug where managed node groups could not be updated post deployment due to an error message about MIME format.
- Fixed bug where using managed node groups sometimes caused an error with IAM roles for self managed ASGs.
- Fixed bug where baseline IAM policies for various services were not being attached to managed node groups.


</div>


### [v0.57.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.57.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/16/2021 | Modules affected: networking, services | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.57.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- The default Kubernetes version deployed by the `eks-cluster` module has been updated to `1.21`. If you wish to maintain backward compatibility with your existing setup, you will want to configure the `kubernetes_version` parameter to the version of Kubernetes you are currently using. Note that `1.21` requires kubergrunt version `0.7.3` and above.
- The default Kubernetes version used by the EKS worker packer template has been updated to `1.21`. If you wish to maintain backward compatibility with your existing setup, you will want to configured the `kubernetes_version` packer parameter to the version of Kubernetes you are currently using.
- The default cluster-autoscaler version has been updated to `1.21` in the `eks-core-services` module. If you wish to maintain backward compatibility with your existing setup, you will want to configure the `cluster_autoscaler_version` input variable.





</div>


### [v0.56.2](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.56.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/12/2021 | Modules affected: services | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.56.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Added support for configuring Horizontal Pod Autoscaler (via the `horizontal_pod_autoscaler` input variable) and overriding chart inputs (via the `override_chart_inputs` input variable).



</div>


### [v0.56.1](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.56.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/11/2021 | Modules affected: services | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.56.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Exposed `additional_security_group_ids` in `ec2-instance` module




</div>


### [v0.56.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.56.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/10/2021 | Modules affected: base, services/ecs-cluster, services/eks-workers, mgmt/ecs-deploy-runner | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.56.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- **[BACKWARD INCOMPATIBLE]** This release updates all the Packer templates to HCL2. See [the Getting started guide from HashiCorp](https://www.packer.io/guides/hcl) for details on HCL2.
- Template data sources have been moved to `local` values to avoid dependency issues.
- The for-production examples have been updated.
- The test finder logic has been moved to the terraform-aws-ci repo.



</div>


### [v0.55.3](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.55.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/9/2021 | Modules affected: mgmt, services | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.55.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

-  Increase default max resources for ecs-deploy-runner
-  wrap with trimspace to we dont keep changing userdata, This changes fixes a perpetual diff that could occur on the `userdata` field.



</div>


### [v0.55.2](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.55.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/6/2021 | Modules affected: mgmt | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.55.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Expose variable from inner module to bastion host





</div>


### [v0.55.1](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.55.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/4/2021 | Modules affected: mgmt | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.55.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- install gruntkms in jenkins



</div>


### [v0.55.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.55.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/3/2021 | Modules affected: services, mgmt, networking, base | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.55.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- **Terraform 1.0 upgrade**: We have verified that this repo is compatible with Terraform `1.0.x`! 
    - From this release onward, we will only be running tests with Terraform `1.0.x` against this repo, so we recommend updating to `1.0.x` soon! 
    - To give you more time to upgrade, for the time being, all modules will still support Terraform `0.15.1` and above, as that version has several features in it (`required_providers` with `source` URLs) that make it more forwards compatible with `1.0.x`. 
    - Once all Gruntwork repos have been upgrade to work with `1.0.x`, we will publish a migration guide with a version compatibility table and announce it all via the Gruntwork Newsletter.

- Fixed a bug in the `ec2-instance` service module that prevented customization of the EBS volumes.

- The following dependencies were updated to:
    - Update dependency gruntwork-io/terratest to v0.37.2
    - Update dependency gruntwork-io/terraform-kubernetes-namespace to v0.4.0
    - Update dependency gruntwork-io/terraform-aws-utilities to v0.6.0
    - Update dependency gruntwork-io/terraform-aws-ci to v0.38.1
    - Update dependency gruntwork-io/aws-sample-app to v0.0.4
    - Update dependency gruntwork-io/terragrunt to v0.31.2
    - Update dependency gruntwork-io/terraform-aws-messaging to v0.7.1




</div>



## terraform-aws-static-assets


### [v0.12.0](https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.12.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/24/2021 | Modules affected: s3-cloudfront | <a href="https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.12.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

Updated the `s3-cloudfront` module to create the S3 bucket for access logs using the `private-s3-bucket` module under the hood. This adds several extra layers of protection for the access logs bucket, including blocking all public access, enabling encryption at rest, and requiring encryption in transit. This is a backwards incompatible change, so see the migration guide for upgrade instructions.




</div>



## terraform-aws-vpc


### [v0.17.3](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.17.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/25/2021 | Modules affected: vpc-interface-endpoint | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.17.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

-  Add VPC Interface Endpoint for Redshift Data API Service



</div>


### [v0.17.2](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.17.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/20/2021 | Modules affected: vpc-interface-endpoint | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.17.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- The `vpc-interface-endpoint` module can now automatically create a security group that allows HTTPS ingress to the endpoints from your VPC if you set `create_https_security_group` to `true`.



</div>


### [v0.17.1](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.17.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/10/2021 | Modules affected: vpc-interface-endpoint, vpc-app, vpc-mgmt | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.17.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Added support for EBS and Lambda interface endpoints.
- Removed usage of the deprecated `template` provider.



</div>

<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "releases",
  "hash": "925f016a02210616194dbf32717a33dc"
}
##DOCS-SOURCER-END -->

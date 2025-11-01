
# Gruntwork release 2025-08

<p style={{marginTop: "-25px"}}><small><a href="/guides">Guides</a> / <a href="/guides/stay-up-to-date">Update Guides</a> / <a href="/guides/stay-up-to-date/releases">Releases</a> / 2025-08</small></p>

This page is lists all the updates to the [Gruntwork Infrastructure as Code
Library](https://gruntwork.io/infrastructure-as-code-library/) that were released in 2025-08. For instructions
on how to use these updates in your code, check out the [updating
documentation](/library/stay-up-to-date/updating).

Here are the repos that were updated:

- [boilerplate](#boilerplate)
- [patcher-cli](#patcher-cli)
- [pipelines-cli](#pipelines-cli)
- [pipelines-workflows](#pipelines-workflows)
- [repo-copier](#repo-copier)
- [terraform-aws-architecture-catalog](#terraform-aws-architecture-catalog)
- [terraform-aws-asg](#terraform-aws-asg)
- [terraform-aws-control-tower](#terraform-aws-control-tower)
- [terraform-aws-data-storage](#terraform-aws-data-storage)
- [terraform-aws-ecs](#terraform-aws-ecs)
- [terraform-aws-eks](#terraform-aws-eks)
- [terraform-aws-load-balancer](#terraform-aws-load-balancer)
- [terraform-aws-messaging](#terraform-aws-messaging)
- [terraform-aws-monitoring](#terraform-aws-monitoring)
- [terraform-aws-security](#terraform-aws-security)
- [terraform-aws-server](#terraform-aws-server)
- [terraform-aws-service-catalog](#terraform-aws-service-catalog)
- [terraform-aws-vpc](#terraform-aws-vpc)


## boilerplate


### [v0.9.0](https://github.com/gruntwork-io/boilerplate/releases/tag/v0.9.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/4/2025 | <a href="https://github.com/gruntwork-io/boilerplate/releases/tag/v0.9.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
Renamed flags:

  * `--disable-hooks` has been renamed to `--no-hooks`
  * `--disable-shell` has been renamed to `--no-shell`


To migrate to the new release:

*  Replace the `--disable-hooks` flag with `--no-hooks` in your scripts or configurations.
* Replace the `--disable-shell` flag with `--no-shell` in your scripts or configurations.
* Review the new confirmation prompts for shell and hook executions, as they will require user input.

* feat: Added confirmation for shell and hooks execution in format `y/a/n` by @denis256 in https://github.com/gruntwork-io/boilerplate/pull/231
* feat: Renamed `--disable-hooks` to `--no-hooks` by @denis256 in https://github.com/gruntwork-io/boilerplate/pull/231
* feat: Renamed `--disable-shell` to `--no-shell` by @denis256 in https://github.com/gruntwork-io/boilerplate/pull/231
* chore: Dependabot rules have been updated to group dependencies together by @denis256 in https://github.com/gruntwork-io/boilerplate/pull/231

**Full Changelog**: https://github.com/gruntwork-io/boilerplate/compare/v0.8.1...v0.9.0

</div>



## patcher-cli


### [v0.15.2](https://github.com/gruntwork-io/patcher-cli/releases/tag/v0.15.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/25/2025 | <a href="https://github.com/gruntwork-io/patcher-cli/releases/tag/v0.15.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Release duplicated from https://github.com/gruntwork-io/patcher/releases/tag/v0.15.2

</div>


### [v0.15.1](https://github.com/gruntwork-io/patcher-cli/releases/tag/v0.15.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/1/2025 | <a href="https://github.com/gruntwork-io/patcher-cli/releases/tag/v0.15.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Release duplicated from https://github.com/gruntwork-io/patcher/releases/tag/v0.15.1

</div>



## pipelines-cli


### [v0.39.6](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.39.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/13/2025 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.39.6">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
The [Pipelines Ignore List](https://docs.gruntwork.io/2.0/reference/pipelines/ignore-list) now supports excluding Terragrunt units from runs in addition to ignoring changes to them in Git. This change was made to assist customers using the ignore list to ignore Terragrunt units that could not successfully run due to a lack of authentication configuration, etc. in Pipelines.

* Pin gitlab v1 for tests by @Resonance1584 in https://github.com/gruntwork-io/pipelines/pull/446
* chore: Backporting ignore filter on execute by @yhakbar in https://github.com/gruntwork-io/pipelines/pull/445


**Full Changelog**: https://github.com/gruntwork-io/pipelines/compare/v0.39.5...v0.39.6


</div>


### [v0.39.5](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.39.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/12/2025 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.39.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
Fixes a bug where the version pin introduced in Pipelines v0.39.4 did not allow for patch versions of Terragrunt v0.84. The version semver check has been loosened to support patch versions as well.

* fix: Fixing max TG version check by @yhakbar in https://github.com/gruntwork-io/pipelines/pull/443


**Full Changelog**: https://github.com/gruntwork-io/pipelines/compare/v0.39.4...v0.39.5


</div>


### [v0.39.4](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.39.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/6/2025 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.39.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
This release introduces a maximum supported Terragrunt version of `v0.84` for the `v0.39` line of Pipelines.

The `v0.40` line of Pipelines will support versions of Terragrunt &gt;= `v0.85`.

* chore: Adding max version pin by @yhakbar in https://github.com/gruntwork-io/pipelines/pull/440


**Full Changelog**: https://github.com/gruntwork-io/pipelines/compare/v0.39.3...v0.39.4


</div>


### [v0.39.3](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.39.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/4/2025 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.39.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Includes additional debug logging to help troubleshoot sporadic preflight failures in a self-hosted GitLab environment.

**Full Changelog**: https://github.com/gruntwork-io/pipelines/compare/v0.39.2...v0.39.3


</div>



## pipelines-workflows


### [v3.9.5](https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v3.9.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/13/2025 | <a href="https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v3.9.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
This pulls in:

1. A bug fix for correct handling of patch versions of Terragrunt version v0.84, allowing patch versions (e.g. `v0.84.1`).
2. An improvement of the [Pipelines Ignore List](https://docs.gruntwork.io/2.0/reference/pipelines/ignore-list), which now supports excluding Terragrunt units during Execution in addition to ignoring Git changes during Orchestration.

* chore: Bumping Pipelines CLI version to `v0.39.6` by @yhakbar in https://github.com/gruntwork-io/pipelines-workflows/pull/145


**Full Changelog**: https://github.com/gruntwork-io/pipelines-workflows/compare/v3...v3.9.5

</div>


### [v3.9.4](https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v3.9.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/6/2025 | <a href="https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v3.9.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
This release introduces a maximum supported Terragrunt version of `v0.84` for the `v3` line of Pipelines Workflows.

The `v4` line of Pipelines Workflows will support versions of Terragrunt &gt;= `v0.85`.

* chore: Bumping Pipelines CLI version to `v0.39.4` by @yhakbar in https://github.com/gruntwork-io/pipelines-workflows/pull/144


**Full Changelog**: https://github.com/gruntwork-io/pipelines-workflows/compare/v3...v3.9.4

</div>



## repo-copier


### [v0.6.5](https://github.com/gruntwork-io/repo-copier/releases/tag/v0.6.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/29/2025 | <a href="https://github.com/gruntwork-io/repo-copier/releases/tag/v0.6.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * chore: tag validation against working tree by @denis256 in https://github.com/gruntwork-io/repo-copier/pull/294


**Full Changelog**: https://github.com/gruntwork-io/repo-copier/compare/v0.6.4...v0.6.5

</div>


### [v0.6.4](https://github.com/gruntwork-io/repo-copier/releases/tag/v0.6.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/27/2025 | <a href="https://github.com/gruntwork-io/repo-copier/releases/tag/v0.6.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * chore: referenced tags validation by @denis256 in https://github.com/gruntwork-io/repo-copier/pull/293


**Full Changelog**: https://github.com/gruntwork-io/repo-copier/compare/v0.6.3...v0.6.4

</div>


### [v0.6.3](https://github.com/gruntwork-io/repo-copier/releases/tag/v0.6.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/15/2025 | <a href="https://github.com/gruntwork-io/repo-copier/releases/tag/v0.6.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * chore: dependabot config for merging dependencies by @denis256 in https://github.com/gruntwork-io/repo-copier/pull/291
* chore: correct spelling errors by @denis256 in https://github.com/gruntwork-io/repo-copier/pull/292


**Full Changelog**: https://github.com/gruntwork-io/repo-copier/compare/v0.6.2...v0.6.3

</div>



## terraform-aws-architecture-catalog


### [v3.1.2](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v3.1.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/26/2025 | <a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v3.1.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  &gt; [!IMPORTANT]
&gt; This release **contains breaking changes** to the architecture catalog and should have been tagged in v4.0.0 release. The changes in this release have now been re-released with v4.0.0

* LIB-2545 Update root-pipelines-apply-role and root-pipelines-plan-role (templates/gruntwork-landing-zone/_envcommon/landingzone) with permissions required by new [control-tower-multi-account-factory-async](https://github.com/gruntwork-io/terraform-aws-control-tower/tree/b5880dc867eb2ead34401f5bc4497830c3ddf49b/modules/landingzone/control-tower-multi-account-factory-async) module.
* Updated single-account-baseline template to optionally include a pipelines HCL environment config for the new account.
* Deprecates remaining Pipelines v2 templates infra-live-root, infra-live-github-base &amp; devops-foundations-infrastructure-live-delegated
* Bump Terragrunt and OpenTofu versions in boilerplate and mise.toml
* DEV-1024
  * devops-foundations-infrastructure-live-root template to use combine gruntwork-landing-zone template and blueprint components for pipelines artifacts to support code reuse across GitHub and GitLab.
  * devops-foundations-infrastructure-live-access-control template to support code reuse across GitHub and GitLab.
  * single-account-baseline template to support code reuse across GitHub and GitLab.

**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-architecture-catalog/compare/v3.1.1...v3.1.2

</div>



## terraform-aws-asg


### [v1.0.2](https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v1.0.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/1/2025 | Modules affected: server-group | <a href="https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v1.0.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- modules/server_group: Ensure var.custom_tags are applied to EC2 instances





</div>



## terraform-aws-control-tower


### [v1.0.1](https://github.com/gruntwork-io/terraform-aws-control-tower/releases/tag/v1.0.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/28/2025 | Modules affected: landingzone | <a href="https://github.com/gruntwork-io/terraform-aws-control-tower/releases/tag/v1.0.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- `landingzone/control-tower-multi-account-factory-async`: allow portfolio region to be specified via var.portfolio_region or inherit from AWS_REGION env var





</div>


### [v1.0.0](https://github.com/gruntwork-io/terraform-aws-control-tower/releases/tag/v1.0.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/26/2025 | <a href="https://github.com/gruntwork-io/terraform-aws-control-tower/releases/tag/v1.0.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - No changes with this release, moving to v1.x.x SemVer standard


This release marks a significant milestone for the module 🎉 
We are officially adopting the [Semantic Versioning (SemVer)](https://semver.org/) standard, starting with version v1.0.0. Prior to this release, version tags only incremented patch and minor numbers. Moving forward, all releases should fully comply with the SemVer specification, providing clearer expectations for users regarding changes, compatibility, and upgrade paths.

With the v1.0.0 release, the library module is considered stable. This means that all subsequent changes in the v1.x.x series will be backward-compatible unless a new major version (v2.0.0) is released.

Version numbers will now follow the format `MAJOR.MINOR.PATCH`
- `MAJOR`: Incremented for breaking changes or incompatible API changes.
- `MINOR`: Incremented for new, backward-compatible features.
- `PATCH`: Incremented for backward-compatible bug fixes.

Users can now rely on the v1.x.x series to remain backward-compatible. Breaking changes should only occur in a future v2.0.0 release.

Each release will include detailed notes indicating whether changes are breaking, additive, or bug fixes, as per SemVer guidelines.


</div>


### [v0.8.8](https://github.com/gruntwork-io/terraform-aws-control-tower/releases/tag/v0.8.8)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/26/2025 | Modules affected: modules/landingzone | <a href="https://github.com/gruntwork-io/terraform-aws-control-tower/releases/tag/v0.8.8">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- New modules `control-tower-account-factory-async`, `control-tower-multi-account-factory-async` and `control-tower-provisioned-product-artifact-updater`
  - The standard synchronous approach to provisioning or updating AWS accounts via Control Tower can lead to lengthy OpenTofu/Terraform runs, especially when Control Tower APIs are slow or when updating a large number of accounts. More importantly, certain types of &quot;drift&quot; caused by Control Tower changes are difficult to reconcile using OpenTofu/Terraform alone.
  - These new module implement an asynchronous approach by deploying infrastructure (EventBridge, SQS, Lambda, and AWS Step Functions) that monitors for certain API calls. When relevant API calls are made (`UpdateProvisioningArtifact` and `UpgradeProduct`), the Lambda is triggered to complete the update process independently of OpenTofu/Terraform.





</div>



## terraform-aws-data-storage


### [v0.41.0](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.41.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/15/2025 | Modules affected: lambda-cleanup-snapshots, lambda-create-snapshot, lambda-share-snapshot, backup-vault | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.41.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- fix: update MySQL version and add missing Lambda module outputs
- Air Gapped Vault Support
- Revert &quot;feat: add password_wo option to RDS module&quot;



</div>


### [v0.40.7](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.40.7)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/7/2025 | Modules affected: redshift, rds, aurora | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.40.7">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Add maintance_track_name to redshift module.
- fix(rds): support use of aws_partition selection for RDS
- Fix Redshift cluster creation error by updating deprecated instance type
- feat(aurora): add delete_automated_backups parameter support
- feat: add password_wo option to RDS module



</div>



## terraform-aws-ecs


### [v1.1.0](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v1.1.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/26/2025 | Modules affected: ecs-cluster, ecs-daemon-service, ecs-service, ecs-task-scheduler | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v1.1.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Updated IAM service roles to remove overly restrictive `aws:SourceAccount` condition from the ECS service role
  - This resolves `sts:AssumeRole` errors that previously prevented the ECS scheduler from performing essential tasks like deregistering targets, which caused deployment failures and services to remain in a &quot;draining&quot; state. 





</div>



## terraform-aws-eks


### [v1.4.0](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v1.4.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/29/2025 | Modules affected: eks-aws-auth-merger, eks-cluster-control-plane | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v1.4.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Update examples to use AL2023
- Bump `kubergrunt` version to [v0.18.1](https://github.com/gruntwork-io/kubergrunt/releases/tag/v0.18.1)
- Bump `eks-aws-auth-merger` to use Go `1.24.0`



</div>


### [v1.3.0](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v1.3.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/27/2025 | Modules affected: eks-cluster-workers | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v1.3.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Add documentation for karpenter to eks auto migration
- Add support for secondary storage drives



</div>


### [v1.2.0](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v1.2.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/13/2025 | Modules affected: eks-k8s-cluster-autoscaler | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v1.2.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Update default Helm Chart release version from `9.21.0` to `9.46.6` for the `cluster-autoscaler`.



</div>



## terraform-aws-load-balancer


### [v1.0.2](https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v1.0.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/13/2025 | Modules affected: lb-listener-rules | <a href="https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v1.0.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fix Typo on LB Listener Rules related to `authentication_request_extra_params`



</div>



## terraform-aws-messaging


### [v1.0.2](https://github.com/gruntwork-io/terraform-aws-messaging/releases/tag/v1.0.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/17/2025 | <a href="https://github.com/gruntwork-io/terraform-aws-messaging/releases/tag/v1.0.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * feat: Update AWS provider constraints to support v6.0+ by @james03160927 in https://github.com/gruntwork-io/terraform-aws-messaging/pull/183


**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-messaging/compare/v1.0.1...v1.0.2

</div>



## terraform-aws-monitoring


### [v1.0.2](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v1.0.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/27/2025 | Modules affected: agents, alarms | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v1.0.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- agents: Add network metrics monitoring via CloudWatch Agent ethtool plugin
- alarms: Update python version from `python3.9` to `python3.12`



</div>



## terraform-aws-security


### [v1.0.3](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v1.0.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/7/2025 | Modules affected: cloudtrail | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v1.0.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- cloudtrail-bucket: Added proper parameterization for cloudtrail module.



</div>


### [v1.0.2](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v1.0.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/5/2025 | Modules affected: cloudtrail-bucket | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v1.0.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- cloudtrail-bucket: Enable custom archiving storage class via var.archive_storage_class



</div>



## terraform-aws-server


### [v1.0.2](https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v1.0.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/14/2025 | Modules affected: single-server | <a href="https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v1.0.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Doc redirects fixed.
- feat: add support for custom KMS key for root volume encryption


</div>



## terraform-aws-service-catalog


### [v0.127.9](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.127.9)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/28/2025 | Modules affected: services, networking | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.127.9">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- services/ec2-instance: propagate `root_volume_kms_key_id` to ec2-instance module
- networking/sns-topics: update to use python3.12 (from 3.9)





</div>


### [v0.127.8](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.127.8)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/19/2025 | Modules affected: networking | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.127.8">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Added Private Hosted Zone (PHZ) records.


</div>


### [v0.127.7](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.127.7)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/15/2025 | Modules affected: services | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.127.7">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Bump lb-listener-rules to fix typo in load-balancer-repo



</div>



## terraform-aws-vpc


### [v0.28.7](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.28.7)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/12/2025 | Modules affected: network-firewall | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.28.7">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Added outputs `network_firewall_id` and `network_firewall_arn` to `network-firewall` module.



</div>

<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "releases",
  "hash": "3b60ef3bbe7a800cb2983917e6debab9"
}
##DOCS-SOURCER-END -->


# Gruntwork release 2025-05

<p style={{marginTop: "-25px"}}><small><a href="/guides">Guides</a> / <a href="/guides/stay-up-to-date">Update Guides</a> / <a href="/guides/stay-up-to-date/releases">Releases</a> / 2025-05</small></p>

This page is lists all the updates to the [Gruntwork Infrastructure as Code
Library](https://gruntwork.io/infrastructure-as-code-library/) that were released in 2025-05. For instructions
on how to use these updates in your code, check out the [updating
documentation](/library/stay-up-to-date/updating).

Here are the repos that were updated:

- [patcher-cli](#patcher-cli)
- [pipelines-actions](#pipelines-actions)
- [pipelines-cli](#pipelines-cli)
- [pipelines-workflows](#pipelines-workflows)
- [terraform-aws-architecture-catalog](#terraform-aws-architecture-catalog)
- [terraform-aws-asg](#terraform-aws-asg)
- [terraform-aws-cache](#terraform-aws-cache)
- [terraform-aws-data-storage](#terraform-aws-data-storage)
- [terraform-aws-ecs](#terraform-aws-ecs)
- [terraform-aws-eks](#terraform-aws-eks)
- [terraform-aws-lambda](#terraform-aws-lambda)
- [terraform-aws-load-balancer](#terraform-aws-load-balancer)
- [terraform-aws-monitoring](#terraform-aws-monitoring)
- [terraform-aws-security](#terraform-aws-security)
- [terraform-aws-server](#terraform-aws-server)
- [terraform-aws-service-catalog](#terraform-aws-service-catalog)
- [terraform-aws-static-assets](#terraform-aws-static-assets)


## patcher-cli


### [v0.15.0](https://github.com/gruntwork-io/patcher-cli/releases/tag/v0.15.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/28/2025 | <a href="https://github.com/gruntwork-io/patcher-cli/releases/tag/v0.15.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Release duplicated from https://github.com/gruntwork-io/patcher/releases/tag/v0.15.0

</div>


### [v0.14.2](https://github.com/gruntwork-io/patcher-cli/releases/tag/v0.14.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/23/2025 | <a href="https://github.com/gruntwork-io/patcher-cli/releases/tag/v0.14.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Release duplicated from https://github.com/gruntwork-io/patcher/releases/tag/v0.14.2

</div>


### [v0.14.1](https://github.com/gruntwork-io/patcher-cli/releases/tag/v0.14.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/1/2025 | <a href="https://github.com/gruntwork-io/patcher-cli/releases/tag/v0.14.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Release duplicated from https://github.com/gruntwork-io/patcher/releases/tag/v0.14.1

</div>



## pipelines-actions


### [v3.6.4](https://github.com/gruntwork-io/pipelines-actions/releases/tag/v3.6.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/8/2025 | <a href="https://github.com/gruntwork-io/pipelines-actions/releases/tag/v3.6.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Automatically pass correct root config file to architecture catalog for account provisioning by @oredavids in https://github.com/gruntwork-io/pipelines-actions/pull/123


**Full Changelog**: https://github.com/gruntwork-io/pipelines-actions/compare/v3.6.3...v3.6.4

</div>


### [v3.6.3](https://github.com/gruntwork-io/pipelines-actions/releases/tag/v3.6.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/2/2025 | <a href="https://github.com/gruntwork-io/pipelines-actions/releases/tag/v3.6.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Fix source ref bug on deploy branch rebase by @oredavids in https://github.com/gruntwork-io/pipelines-actions/pull/122


**Full Changelog**: https://github.com/gruntwork-io/pipelines-actions/compare/v3.6.2...v3.6.3

</div>



## pipelines-cli


### [v0.39.0](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.39.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/16/2025 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.39.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Fix e2e example env. Add debug logs to mise by @Resonance1584 in https://github.com/gruntwork-io/pipelines/pull/371
* Fix mise unit test flake by @Resonance1584 in https://github.com/gruntwork-io/pipelines/pull/373
* Add PIPELINES_FEATURE_MODULE_CHANGE_ON_UNIT_FILE by @Resonance1584 in https://github.com/gruntwork-io/pipelines/pull/372
* Fix new unit should not trigger module changed by @Resonance1584 in https://github.com/gruntwork-io/pipelines/pull/374
* Add PIPELINES_IGNORE_FILTER env var by @Resonance1584 in https://github.com/gruntwork-io/pipelines/pull/375
* Add feature values to telemetry in orchestrate by @Resonance1584 in https://github.com/gruntwork-io/pipelines/pull/376
* DEV-760 Add PIPELINES_FEATURE_CONSOLIDATE_ALL_EXCLUDE_EXTERNAL_DEPENDENCIES by @Resonance1584 in https://github.com/gruntwork-io/pipelines/pull/377
* Switch ignore list separator to comma(,) by @Resonance1584 in https://github.com/gruntwork-io/pipelines/pull/378
* Skip ModuleDeleted consolidation for jobs with stack paths by @oredavids in https://github.com/gruntwork-io/pipelines/pull/381
* Move ignore filter to config and rename to ignore list by @Resonance1584 in https://github.com/gruntwork-io/pipelines/pull/382


**Full Changelog**: https://github.com/gruntwork-io/pipelines/compare/v0.38.2...v0.39.0


</div>



## pipelines-workflows


### [v3.9.0](https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v3.9.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/20/2025 | <a href="https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v3.9.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

This release of Pipelines supports three new opt-in feature flags to improve the way we detect infra changes and execute Terragrunt in your repository. These features can be enabled by setting the following env vars to `&quot;true&quot;` in your Pipelines configuration. We expect to enable these behaviors by default in a future major version of Pipelines.

- `PIPELINES_FEATURE_EXPERIMENT_AGGRESSIVE_CONSOLIDATION`
Enabling this feature will cause more changes to be consolidated into a single run-all.

- `PIPELINES_FEATURE_EXPERIMENT_COLOCATED_FILE_UNIT_CHANGE_DETECTION` 
Enables changes to files colocated with a Terragrunt Unit (`terragrunt.hcl`) to be detected as a ModuleChanged job.

- `PIPELINES_FEATURE_EXPERIMENT_MINIMIZE_BLAST_RADIUS`
Enables Terragrunt [queue-strict-include](https://terragrunt.gruntwork.io/docs/reference/cli-options/#queue-strict-include) and [queue-exclude-external](https://terragrunt.gruntwork.io/docs/reference/cli-options/#queue-exclude-external) by default.

You can read more detail about each of these feature flags [here](https://docs.gruntwork.io/2.0/reference/pipelines/feature-flags).

Added support for excluding files and directories from Pipelines runs. The ignore list can be added to your Pipelines config. Read more about the ignore list [here](https://docs.gruntwork.io/2.0/reference/pipelines/ignore-list).

</div>


### [v3.8.3](https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v3.8.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/8/2025 | <a href="https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v3.8.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Use actions with root terragrunt file updates by @oredavids in https://github.com/gruntwork-io/pipelines-workflows/pull/123


**Full Changelog**: https://github.com/gruntwork-io/pipelines-workflows/compare/v3.8.2...v3.8.3

</div>


### [v3.8.2](https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v3.8.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/5/2025 | <a href="https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v3.8.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Bump to actions 3.6.3 which includes a bugfix in how we calculate commit hashes for orchestrate

 **Full Changelog**: https://github.com/gruntwork-io/pipelines-workflows/compare/v3...v3.8.2

</div>



## terraform-aws-architecture-catalog


### [v3.0.1](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v3.0.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/28/2025 | <a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v3.0.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
* Adds the `cloudtrail` module and modifies the `cross-account-iam-roles` vars to address CIS findings IAM.18, S3.22 and S3.23


- Added `cloudtrail` module and modifies the `cross-account-iam-roles` in:
    - templates/devops-foundations-infrastructure-live-root/management/_global
    - templates/single-account-baseline/&#x7B;&#x7B; .AccountName &#x7D;&#x7D;/_global


No direct migration required. This change will result in a new role being created for AWSSupportAccess (IAM.18) and the `cloudtrail` module will deploy for S3 logging (S3.22 and S3.23). Change should be non-impacting. 

</div>


### [v3.0.0](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v3.0.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/8/2025 | <a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v3.0.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Replace deprecated root terragrunt.hcl usage by @oredavids in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1144
* Delete all legacy templates by @oredavids in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1146


- **Major cleanup update**: Removed all legacy reference-architecture and devops foundations templates.
- Updated devops foundations templates listed below to use root.hcl configuration file as their default to align with Terragrunt best practice:
  -  `devops-foundations-infrastructure-live-access-control`
  - `devops-foundations-infrastructure-live-access-control-accounts`
  - `devops-foundations-infrastructure-live-delegated`
  - `devops-foundations-infrastructure-live-delegated-v3`


- Use previous versions if you wish to keep using the deleted templates.
- Set `RootTerragruntFileName` as &quot;terragrunt.hcl&quot; to retain previous behaviour on devops foundations templates

**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-architecture-catalog/compare/v2.13.0...v3.0.0

</div>



## terraform-aws-asg


### [v1.0.0](https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v1.0.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/8/2025 | <a href="https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v1.0.0">Release notes</a></small>
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


### [v0.21.20](https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.21.20)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/8/2025 | Modules affected: No | <a href="https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.21.20">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Bump golang.org/x/net from 0.36.0 to 0.38.0 in /test




</div>



## terraform-aws-cache


### [v1.0.0](https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v1.0.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/8/2025 | <a href="https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v1.0.0">Release notes</a></small>
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


### [v0.23.1](https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v0.23.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/8/2025 | Modules affected: valkey | <a href="https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v0.23.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- modules/valkey: Sync Valkey engine-log configuration variables
- Bump golang.org/x/net to 0.38.0 in /test



</div>



## terraform-aws-data-storage


### [v0.40.6](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.40.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/1/2025 | Modules affected: rds-replicas, aurora, rds-proxy | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.40.6">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Add a time_sleep to the destruction of the db subnet group
- Remove aurora serverless v1 as it&apos;s officially deprecated, fix serverless v2 test
- Fix TestLambdaRdsSnapshotDisable unit test failure
- Bump golang.org/x/net from 0.33.0 to 0.36.0 in /test
- Bump golang.org/x/net from 0.36.0 to 0.38.0 in /test
- Improve the documentation for rds-proxy module
- add cluster level insights



</div>



## terraform-aws-ecs


### [v1.0.0](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v1.0.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/8/2025 | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v1.0.0">Release notes</a></small>
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


### [v0.38.10](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.38.10)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/8/2025 | Modules affected: No | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.38.10">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Bump golang.org/x/net from 0.36.0 to 0.38.0 in /test





</div>



## terraform-aws-eks


### [v1.0.2](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v1.0.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/14/2025 | Modules affected: eks-alb-ingress-controller-iam-policy | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v1.0.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Update AWS LB Controller Module IAM Permissions to include `elasticloadbalancing:SetRulePriorities` to address 403 errors. 



</div>


### [v1.0.1](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v1.0.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/8/2025 | Modules affected: eks-k8s-karpenter | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v1.0.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Update Karpenter Chart Mapping `postInstallHook` to map to correct Helm chart configuration value.



</div>


### [v1.0.0](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v1.0.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/3/2025 | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v1.0.0">Release notes</a></small>
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


### [v0.79.0](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.79.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/3/2025 | Modules affected: eks-k8s-karpenter | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.79.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Use `name_prefix` instead of name for Karpenter AWS CloudWatch Event Rule resources to avoid name length errors when using de-provisioning queues.
    - NOTE: `aws_cloudwatch_event_rule` resources created for Karpenter de-provisioning queues will be recreated with this change as moving from `name` -&gt; `name_prefix` is a destructive action for the resource.



</div>


### [v0.78.1](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.78.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/3/2025 | Modules affected: eks-aws-auth-merger | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.78.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Bump golang.org/x/net from 0.36.0 to 0.38.0 in /modules/eks-aws-auth-merger/aws-auth-merger
- Bump golang.org/x/net from 0.36.0 to 0.38.0 in /test



</div>



## terraform-aws-lambda


### [v1.1.0](https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v1.1.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/1/2025 | Modules affected: keep-warm, lambda-edge | <a href="https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v1.1.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Bump golang.org/x/net from 0.34.0 to 0.36.0 in /test
- Bump axios from 1.7.4 to 1.8.2 in /examples/lambda-sam/javascript
- Update Nodejs runtime from 18.x to 22.x



</div>



## terraform-aws-load-balancer


### [v1.0.0](https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v1.0.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/8/2025 | <a href="https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v1.0.0">Release notes</a></small>
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


### [v0.30.5](https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.30.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/6/2025 | Modules affected: alb | <a href="https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.30.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Bump golang.org/x/net from 0.33.0 to 0.36.0 in /test
- Bump golang.org/x/net from 0.36.0 to 0.38.0 in /test
- Expose SG Egress CIDR Blocks via a new variable allow_outbound_to_cidr_blocks



</div>



## terraform-aws-monitoring


### [v1.0.0](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v1.0.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/1/2025 | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v1.0.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Bump golang.org/x/net from 0.33.0 to 0.36.0 in /test
- Bump golang.org/x/net from 0.36.0 to 0.38.0 in /test





</div>



## terraform-aws-security


### [v1.0.0](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v1.0.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/6/2025 | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v1.0.0">Release notes</a></small>
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



## terraform-aws-server


### [v1.0.0](https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v1.0.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/8/2025 | <a href="https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v1.0.0">Release notes</a></small>
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


### [v0.16.3](https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.16.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/8/2025 | Modules affected: No | <a href="https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.16.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Bump golang.org/x/net from 0.36.0 to 0.38.0 in /test





</div>



## terraform-aws-service-catalog


### [v0.127.1](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.127.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/20/2025 | Modules affected: modules/networking/vpc, modules/services/eks-argocd, modules/services/eks-cluster, modules/services/eks-core-services | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.127.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Bump `terraform-aws-eks` to v1.0.2
    - Update Karpenter Chart Mapping `postInstallHook` to map to correct Helm chart configuration value.
    - Update AWS LB Controller Module IAM Permissions to include `elasticloadbalancing:SetRulePriorities` to address 403 errors.


</div>


### [v0.127.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.127.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/18/2025 | Modules affected: modules/networking/vpc, modules/services/eks-argocd, modules/services/eks-cluster, modules/services/eks-eks-core-services | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.127.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Bump `terraform-aws-eks` to [v0.79.0](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.79.0)
    - Expose new variable `karpenter_deprovisioning_queue_name` in `services/eks-karpenter` module. 
    - **NOTE:** This version of `terraform-aws-eks` uses the `name_prefix` attribute instead of the `name` attribute for Karpenter AWS CloudWatch Event Rule resources to avoid name length errors when using de-provisioning queues. The `aws_cloudwatch_event_rule` resources that are created for Karpenter de-provisioning queues will be recreated with this change as moving from `name` -&gt; `name_prefix` is a destructive action for the resource. Please see the underlying [EKS Library module release](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.79.0) for details of the change


</div>


### [v0.126.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.126.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/15/2025 | Modules affected: mgmt, networking, services | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.126.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- Add Default Support for EKS 1.32
- Bump `terraform-aws-eks` library module to version from `v0.77.0` -&gt; `v0.78.0`


Default EKS version is 1.32 with this release! Please see the links below for full details of the EKS 1.32 release including new features and any API changes.

[Official AWS EKS 1.32 Announcement](https://aws.amazon.com/about-aws/whats-new/2025/01/amazon-eks-eks-distro-kubernetes-version-1-32/)
[Kubernetes 1.32 Announcement](https://kubernetes.io/blog/2024/12/11/kubernetes-v1-32-release/)
[Kubernetes 1.32 Release Notes](https://github.com/kubernetes/kubernetes/blob/master/CHANGELOG/CHANGELOG-1.32.md)
[terraform-aws-eks v0.78.0](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.78.0)



</div>


### [v0.125.5](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.125.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/6/2025 | Modules affected: networking | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.125.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Updated modules/networking/alb to expose the allowed outbound CIDRs via a new variable allow_outbound_to_cidr_blocks


</div>


### [v0.125.4](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.125.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/6/2025 | Modules affected: data-stores | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.125.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Updated modules/data-stores/s3-bucket to expose the var transition_default_minimum_object_size


</div>


### [v0.125.3](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.125.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/2/2025 | Modules affected: services | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.125.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- services/lambda: update to latest version of modules


</div>


### [v0.125.2](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.125.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/1/2025 | Modules affected: services/asg-service | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.125.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Bump golang.org/x/net from 0.36.0 to 0.38.0 in /test
- add param for asg name



</div>



## terraform-aws-static-assets


### [v1.0.1](https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v1.0.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/20/2025 | Modules affected: cloudfront | <a href="https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v1.0.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- [SME-3123] fix origin_access_identity path for s3_origin_config



</div>


### [v1.0.0](https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v1.0.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/8/2025 | <a href="https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v1.0.0">Release notes</a></small>
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

<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "releases",
  "hash": "e9bc244866c1a8f71d30e04e38daedc1"
}
##DOCS-SOURCER-END -->

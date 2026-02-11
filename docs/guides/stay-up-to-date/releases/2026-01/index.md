
# Gruntwork release 2026-01

<p style={{marginTop: "-25px"}}><small><a href="/guides">Guides</a> / <a href="/guides/stay-up-to-date">Update Guides</a> / <a href="/guides/stay-up-to-date/releases">Releases</a> / 2026-01</small></p>

This page is lists all the updates to the [Gruntwork Infrastructure as Code
Library](https://gruntwork.io/infrastructure-as-code-library/) that were released in 2026-01. For instructions
on how to use these updates in your code, check out the [updating
documentation](/library/stay-up-to-date/updating).

Here are the repos that were updated:

- [boilerplate](#boilerplate)
- [patcher-cli](#patcher-cli)
- [pipelines-cli](#pipelines-cli)
- [pipelines-credentials](#pipelines-credentials)
- [pipelines-workflows](#pipelines-workflows)
- [repo-copier](#repo-copier)
- [terraform-aws-architecture-catalog](#terraform-aws-architecture-catalog)
- [terraform-aws-ci](#terraform-aws-ci)
- [terraform-aws-control-tower](#terraform-aws-control-tower)
- [terraform-aws-data-storage](#terraform-aws-data-storage)
- [terraform-aws-eks](#terraform-aws-eks)
- [terraform-aws-lambda](#terraform-aws-lambda)
- [terraform-aws-messaging](#terraform-aws-messaging)
- [terraform-aws-monitoring](#terraform-aws-monitoring)
- [terraform-aws-openvpn](#terraform-aws-openvpn)
- [terraform-aws-security](#terraform-aws-security)
- [terraform-aws-server](#terraform-aws-server)
- [terraform-aws-service-catalog](#terraform-aws-service-catalog)
- [terraform-aws-utilities](#terraform-aws-utilities)
- [terraform-aws-vpc](#terraform-aws-vpc)


## boilerplate


### [v0.11.1](https://github.com/gruntwork-io/boilerplate/releases/tag/v0.11.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/26/2026 | <a href="https://github.com/gruntwork-io/boilerplate/releases/tag/v0.11.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Upgrade deploy and test_signing resource clases to m4 by @Resonance1584 in https://github.com/gruntwork-io/boilerplate/pull/265


**Full Changelog**: https://github.com/gruntwork-io/boilerplate/compare/v0.11.0...v0.11.1

</div>


### [v0.11.0](https://github.com/gruntwork-io/boilerplate/releases/tag/v0.11.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/26/2026 | <a href="https://github.com/gruntwork-io/boilerplate/releases/tag/v0.11.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
Use release [v0.11.1](https://github.com/gruntwork-io/boilerplate/releases/tag/v0.11.1) instead which fixes the deploy pipeline to create release assets.


ProcessTemplate and ProcessTemplateWithContext now take variables.Dependency as a pointer.

* Bump actions/upload-artifact from 4 to 5 by @dependabot[bot] in https://github.com/gruntwork-io/boilerplate/pull/249
* Bump jdx/mise-action from 2 to 3 by @dependabot[bot] in https://github.com/gruntwork-io/boilerplate/pull/248
* docs: mention mise as an installation method by @counterposition in https://github.com/gruntwork-io/boilerplate/pull/252
* chore: use committed lint config with weekly upstream sync by @Resonance1584 in https://github.com/gruntwork-io/boilerplate/pull/262
* fix: address gocritic hugeParam and rangeValCopy lint errors by @Resonance1584 in https://github.com/gruntwork-io/boilerplate/pull/261
* Upgrade dependencies by @Resonance1584 in https://github.com/gruntwork-io/boilerplate/pull/263

* @counterposition made their first contribution in https://github.com/gruntwork-io/boilerplate/pull/252

**Full Changelog**: https://github.com/gruntwork-io/boilerplate/compare/v0.10.1...v0.11.0

</div>



## patcher-cli


### [v0.17.2](https://github.com/gruntwork-io/patcher-cli/releases/tag/v0.17.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/13/2026 | <a href="https://github.com/gruntwork-io/patcher-cli/releases/tag/v0.17.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Release duplicated from https://github.com/gruntwork-io/patcher/releases/tag/v0.17.2

</div>


### [v0.17.1](https://github.com/gruntwork-io/patcher-cli/releases/tag/v0.17.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/13/2026 | <a href="https://github.com/gruntwork-io/patcher-cli/releases/tag/v0.17.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Release duplicated from https://github.com/gruntwork-io/patcher/releases/tag/v0.17.1

</div>



## pipelines-cli


### [v0.45.0](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.45.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/26/2026 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.45.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * PF-135 Add support for custom images in child jobs by @Resonance1584 in https://github.com/gruntwork-io/pipelines/pull/515
* Switch circleci deploy to m4 by @Resonance1584 in https://github.com/gruntwork-io/pipelines/pull/517


**Full Changelog**: https://github.com/gruntwork-io/pipelines/compare/v0.44.0...v0.45.0


</div>


### [v0.44.0](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.44.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/21/2026 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.44.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Fix concurrent map write panic in tests by @Resonance1584 in https://github.com/gruntwork-io/pipelines/pull/507
* Add support for import count in comment by @Resonance1584 in https://github.com/gruntwork-io/pipelines/pull/505
* fix: Upping retry count for finding comments by @yhakbar in https://github.com/gruntwork-io/pipelines/pull/510
* chore: Bumping next version of Terragrunt to `v0.97.1` by @yhakbar in https://github.com/gruntwork-io/pipelines/pull/508
* Revert &quot;fix: Upping retry count for finding comments&quot; by @yhakbar in https://github.com/gruntwork-io/pipelines/pull/511
* Fix IgnoreUnitsWithoutEnvironment for deleted units by @Resonance1584 in https://github.com/gruntwork-io/pipelines/pull/513
* Fix IgnoreList not respected for stack modifications by @Resonance1584 in https://github.com/gruntwork-io/pipelines/pull/514
* feat: Adding support for `gcp_oidc` block by @yhakbar in https://github.com/gruntwork-io/pipelines/pull/509


**Full Changelog**: https://github.com/gruntwork-io/pipelines/compare/v0.43.0...v0.44.0


</div>


### [v0.44.0-alpha1](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.44.0-alpha1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/21/2026 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.44.0-alpha1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Alpha release


**Full Changelog**: https://github.com/gruntwork-io/pipelines/compare/v0.43.0...v0.44.0-alpha1


</div>


### [v0.43.0](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.43.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/6/2026 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.43.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Add GH API Rate Limit Usage information to telemetry by @ZachGoldberg in https://github.com/gruntwork-io/pipelines/pull/412
* LIB-4111 Add native support for mise.toml tf versions in units by @Resonance1584 in https://github.com/gruntwork-io/pipelines/pull/506


**Full Changelog**: https://github.com/gruntwork-io/pipelines/compare/v0.42.0...v0.43.0


</div>



## pipelines-credentials


### [v1.1.0](https://github.com/gruntwork-io/pipelines-credentials/releases/tag/v1.1.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/21/2026 | <a href="https://github.com/gruntwork-io/pipelines-credentials/releases/tag/v1.1.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Retry on TypeError and other network related errors by @Resonance1584 in https://github.com/gruntwork-io/pipelines-credentials/pull/15


**Full Changelog**: https://github.com/gruntwork-io/pipelines-credentials/compare/v1.0.4...v1.1.0

</div>



## pipelines-workflows


### [v4.5.0](https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v4.5.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/26/2026 | <a href="https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v4.5.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
This is a parity release to keep GitLab and GitHub pipelines binaries in sync. There are no expected changes to GitHub functionality.

* Pipelines CLI v0.45.0 by @Resonance1584 in https://github.com/gruntwork-io/pipelines-workflows/pull/182


**Full Changelog**: https://github.com/gruntwork-io/pipelines-workflows/compare/v4...v4.5.0

</div>


### [v4.4.0](https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v4.4.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/21/2026 | <a href="https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v4.4.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- Added retries to pipelines-credentials when network errors occur
- Added support for import count in the Pipelines plan summary comment
- Fixed a bug where modifications to stack files were not ignored by pipelines ignore_list
- Fixed a bug where `PIPELINES_FEATURE_EXPERIMENT_IGNORE_UNITS_WITHOUT_ENVIRONMENT` was not ignoring unit deletions.

**Full Changelog**: https://github.com/gruntwork-io/pipelines-workflows/compare/v4...v4.4.0

</div>


### [v4.3.0](https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v4.3.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/7/2026 | <a href="https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v4.3.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- Added new experiment flag `PIPELINES_FEATURE_EXPERIMENT_USE_MISE_EXEC_TG_WRAPPER` to allow individual units to specify the OpenTofu/Terraform version to use. See the full docs [here](https://docs.gruntwork.io/2.0/reference/pipelines/feature-flags#pipelines_feature_experiment_use_mise_exec_tg_wrapper)

- Fixed a bug where the default branch name for drift detection PRs was not set when running via cron

**Full Changelog**: https://github.com/gruntwork-io/pipelines-workflows/compare/v4...v4.3.0

</div>



## repo-copier


### [v0.7.1](https://github.com/gruntwork-io/repo-copier/releases/tag/v0.7.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/15/2026 | <a href="https://github.com/gruntwork-io/repo-copier/releases/tag/v0.7.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * chore: add missing repos, include preview to machine learning by @odgrim in https://github.com/gruntwork-io/repo-copier/pull/300


**Full Changelog**: https://github.com/gruntwork-io/repo-copier/compare/v0.7.0...v0.7.1

</div>



## terraform-aws-architecture-catalog


### [v4.2.0](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v4.2.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/22/2026 | <a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v4.2.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Upgrades all usage of terraform-aws-control-tower to v1.2.0 which brings in support for AWS Provider v6.x.


**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-architecture-catalog/compare/v4.1.1...v4.2.0

</div>



## terraform-aws-ci


### [v1.1.0](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v1.1.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/30/2026 | Modules affected: ecs-deploy-runner | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v1.1.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Update terraform-aws-ecs to support AWS Provider v6





</div>


### [v1.0.2](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v1.0.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/22/2026 | Modules affected: install-jenkins | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v1.0.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Update Jenkins GPG key for January 21, 2026 LTS release





</div>


### [v1.0.1](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v1.0.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/21/2026 | Modules affected: gruntwork-module-circleci-helpers | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v1.0.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- Feat: Improve ci helper usability



</div>


### [v1.0.0](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v1.0.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/20/2026 | Modules affected: ec2-backup, ecs-deploy-runner-invoke-iam-policy, ecs-deploy-runner, gruntwork-module-circleci-helpers | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v1.0.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Update Dependencies and AWS Provider
* Add OpenTofu support to installer scripts
* Update AMI tests and examples to ubuntu 24.04
* Dropped support for legacy Ubuntu releases



- `ec2-backup`
- `ecs-deploy-runner-invoke-iam-policy`
- `ecs-deploy-runner`
- `gruntwork-module-circleci-helpers`
- `iam-policies`
- `infrastructure-deploy-script`
- `install-jenkins`
- `jenkins-server`
- `monorepo-helpers`



This release marks a significant milestone for the module 🎉 
We are officially adopting the [Semantic Versioning (SemVer)](https://semver.org/) standard, starting with version v1.0.0. Prior to this release, version tags only incremented patch and minor numbers. Moving forward, all releases should fully comply with the SemVer specification, providing clearer expectations for users regarding changes, compatibility, and upgrade paths.

With the v1.0.0 release, the library module is considered stable. This means that all subsequent changes in the v1.x.x series will be backward-compatible unless a new major version (v2.0.0) is released.

Version numbers will now follow the format `MAJOR.MINOR.PATCH`
- `MAJOR`: Incremented for breaking changes or incompatible API changes.
- `MINOR`: Incremented for new, backward-compatible features.
- `PATCH`: Incremented for backward-compatible bug fixes.

Users can now rely on the v1.x.x series to remain backward-compatible. Breaking changes should only occur in a future v2.0.0 release.

Each release will include detailed notes indicating whether changes are breaking, additive, or bug fixes, as per SemVer guidelines.

* @odgrim made their first contribution in https://github.com/gruntwork-io/terraform-aws-ci/pull/823

**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-ci/compare/v0.59.11...v1.0.0

</div>



## terraform-aws-control-tower


### [v1.3.0](https://github.com/gruntwork-io/terraform-aws-control-tower/releases/tag/v1.3.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/22/2026 | Modules affected: landingzone | <a href="https://github.com/gruntwork-io/terraform-aws-control-tower/releases/tag/v1.3.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- `landingzone/control-tower-multi-account-factory-async`: Account factory drift detection filtering options
  - No filtering: all accounts are updated using set concurrency
  - Filter to managed accounts only: managed accounts (filtered by tag) are updated using set concurrency; all untagged accounts are ignored
  - Filter with priority mode: Managed accounts (filtered by tag) are updated first using desired concurrency; all untagged accounts are updated after managed accounts using lower concurrency (1)






</div>


### [v1.2.0](https://github.com/gruntwork-io/terraform-aws-control-tower/releases/tag/v1.2.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/16/2026 | Modules affected: aws-sso/sso-groups, aws-sso/sso-permission-sets, landingzone/control-tower-app-account-baseline, landingzone/control-tower-execution-role | <a href="https://github.com/gruntwork-io/terraform-aws-control-tower/releases/tag/v1.2.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Update AWS provider lock to 6.x (&lt; 7.0.0)





</div>



## terraform-aws-data-storage


### [v0.45.0](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.45.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/18/2026 | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.45.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * fix(org-backup-policy): Use var.name for vault name to fix destroy error by @james00012 in https://github.com/gruntwork-io/terraform-aws-data-storage/pull/542
* fix(redshift): Handle missing resources in outputs during partial apply failures by @james00012 in https://github.com/gruntwork-io/terraform-aws-data-storage/pull/543
* feat(rds): Add IPv6 CIDR block support for dual-stack networking by @james00012 in https://github.com/gruntwork-io/terraform-aws-data-storage/pull/545
* chore(lambda): upgrade Python runtime from 3.9 to 3.12 by @ryehowell in https://github.com/gruntwork-io/terraform-aws-data-storage/pull/546
* feat: Add IPv6 CIDR block support and fix rds-proxy egress plan diff by @james00012 in https://github.com/gruntwork-io/terraform-aws-data-storage/pull/551

* @ryehowell made their first contribution in https://github.com/gruntwork-io/terraform-aws-data-storage/pull/546

**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-data-storage/compare/v0.44.0...v0.45.0

</div>



## terraform-aws-eks


### [v3.4.0](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v3.4.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/25/2026 | Modules affected: eks-cluster-control-plane | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v3.4.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
The `eks-cluster-control-plane` module now supports providing an existing IAM roles for the cluster and an existing EKS Cluster security group instead of always creating new ones:
- New variable: `cluster_iam_role_arn` - Optionally provide an existing IAM role for the EKS cluster
- New variable: `cluster_security_group_id` - Optionally provide an existing security group for the cluster control plane

Both variables default to null, maintaining existing behavior where resources are created automatically.

&gt; [!WARNING]
&gt; #### State Migration
&gt; This release includes a `moved.tf` file that handles automatic state migration for existing users. 
&gt; When upgrading:
&gt; - No manual intervention required - Terraform will automatically migrate resource addresses
&gt; - No cluster recreation for existing deployments
&gt; - Resources are migrated from non-indexed to indexed addresses (e.g., aws_iam_role.eks → aws_iam_role.eks[0])
&gt; #### IAM Role Immutability
&gt; The `cluster_iam_role_arn` can ONLY be set during initial cluster creation. Changing the IAM role on an existing cluster will DESTROY and RECREATE the cluster (destructive operation). This is an AWS API constraint - IAM roles are immutable after cluster creation. Use this variable only for new clusters or when you specifically intend to recreate an existing cluster.
&gt;
&gt; The `cluster_security_group_id` can be updated in-place without cluster recreation via the AWS UpdateClusterConfig API.






</div>


### [v3.3.0](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v3.3.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/12/2026 | Modules affected: eks-container-logs | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v3.3.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Update `eks-container-logs` to use `terraform-aws-monitoring` v1.3.0 for full support of AWS Provider v6.x
- Add new variables `volumes` and `volume_mounts` to `eks-container-logs` that provides more flexibility by allowing users to mount multiple volumes for fluent-bit ingestion
- Test and example fixes




</div>



## terraform-aws-lambda


### [v1.3.0](https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v1.3.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/8/2026 | Modules affected: api-gateway-account-settings, api-gateway-proxy, keep-warm, lambda | <a href="https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v1.3.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- feat: Update AWS provider constraints to support v6.0+




</div>



## terraform-aws-messaging


### [v1.0.3](https://github.com/gruntwork-io/terraform-aws-messaging/releases/tag/v1.0.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/15/2026 | Modules affected: msk, sns, kinesis-firehose | <a href="https://github.com/gruntwork-io/terraform-aws-messaging/releases/tag/v1.0.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- fix: Update Kafka versions to AWS MSK supported versions
- fix: Change delivery_policy variable type from any to string
- fix: Add enable_client_unauthenticated variable and multi-auth documentation
- fix: Make kinesis_source_configuration optional in kinesis-firehose module



</div>



## terraform-aws-monitoring


### [v1.3.1](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v1.3.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/30/2026 | Modules affected: logs | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v1.3.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Update terraform-aws-security to support AWS Provider v6





</div>



## terraform-aws-openvpn


### [v0.27.12](https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.27.12)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/27/2026 | Modules affected: openvpn-server | <a href="https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.27.12">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Added KMS key support for EBS root volume encryption



</div>



## terraform-aws-security


### [v1.3.0](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v1.3.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/22/2026 | Modules affected: auto-update, aws-config-bucket, aws-config-multi-region, aws-config-rules | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v1.3.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  This release marks the v6 provider upgrade as well as the inclusion of several new regions AWS has added over the last few months.



</div>



## terraform-aws-server


### [v1.0.4](https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v1.0.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/20/2026 | Modules affected: attach-eni, ec2-backup, single-server | <a href="https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v1.0.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Update providers to v6

Special thanks to the following users for their contribution!

- @odgrim



</div>



## terraform-aws-service-catalog


### [v0.149.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.149.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/23/2026 | Modules affected: data-stores | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.149.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Add IPv6 support for RDS and Aurora modules



</div>


### [v0.148.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.148.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/21/2026 | Modules affected: networking/sns-topics | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.148.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Upgrade `terraform-aws-messaging` to `v1.0.3` to support AWS provider v6.x
- Expose the following variables in the `networking/sns-topics` module:
    - `message_retention_period`
    - `content_based_deduplication`
    - `enable_fifo`
    - `http_failure_feedback_role_arn`
    - `http_success_feedback_role_arn`
    - `delivery_policy`
    - `tags`



</div>


### [v0.147.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.147.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/20/2026 | Modules affected: mgmt/jenkins, networking/vpc, services/eks-argocd, services/eks-cluster | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.147.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- `mgmt/jenkins`
- `networking/vpc`
- `services/eks-argocd`
- `services/eks-cluster`
- `services/eks-core-services`
- `services/eks-karpenter`
- `services/eks-workers`
- `services/helm-service`
- `services/k8s-service`


- Add Default Support for EKS 1.33
- Drop support for Amazon Linux 2 (AL2) EKS Worker Nodes
- Bump `terraform-aws-eks` library module from `v2.1.1` → `v3.1.2`

Default EKS version is 1.33 with this release! Please see the links below for full details of the EKS 1.33 release including new features and any API changes.

&gt; [!IMPORTANT]
&gt; **Amazon Linux 2 (AL2) Support Dropped**
&gt; 
&gt; EKS 1.33 will not provide pre-built optimized Amazon Linux 2 (AL2) Amazon Machine Images (AMIs). If you are currently using AL2-based worker nodes, you will need to migrate to Amazon Linux 2023 (AL2023) before upgrading to EKS 1.33.
&gt;
&gt; **See the [AL2 to AL2023 Migration Guide](https://github.com/gruntwork-io/terraform-aws-service-catalog/blob/master/modules/services/eks-workers/AL2-TO-AL2023-MIGRATION.md) for detailed migration instructions.**

[Official AWS EKS 1.33 Announcement](https://aws.amazon.com/about-aws/whats-new/2025/05/amazon-eks-distro-kubernetes-version-1-33/)
[Amazon EKS Distro Docs](https://distro.eks.amazonaws.com/)
[Kubernetes 1.33 Announcement](https://kubernetes.io/blog/2025/04/23/kubernetes-v1-33-release/)
[Kubernetes 1.33 Release Notes](https://github.com/kubernetes/kubernetes/blob/master/CHANGELOG/CHANGELOG-1.33.md)


- https://github.com/gruntwork-io/terraform-aws-service-catalog/pull/2303
- https://github.com/gruntwork-io/terraform-aws-eks/pull/767


</div>


### [v0.146.3](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.146.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/16/2026 | Modules affected: data-stores/rds | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.146.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Expose additional variables for `data-stores/rds` module:
    - `high_read_latency_treat_missing_data`
    - `high_write_latency_treat_missing_data`



</div>


### [v0.146.2](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.146.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/12/2026 | Modules affected: services/ecs-cluster | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.146.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Expose `custom_iam_role_name` for ECS Cluster in `services/ecs-cluster` module



</div>


### [v0.146.1](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.146.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/12/2026 | Modules affected: data-stores/aurora, data-stores/elasticsearch, services/eks-cluster | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.146.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Remove Aurora Serverless v1 test
- Add gp3 throughput variable to `elasticsearch` module
- Add the ability to configure CloudWatch alarms for the EKS worker ASGs



</div>


### [v0.146.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.146.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/6/2026 | Modules affected: modules/data-stores/aurora, modules/data-stores/rds, modules/data-stores/rds-replica, modules/data-stores/memcached | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.146.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Upgrade `terraform-aws-data-storage` and `terraform-aws-cache` modules
    - Upgrade `terraform-aws-data-storage` from v0.38.1-v0.41.1 → v0.44.0
    - Upgrade `terraform-aws-cache` from v0.22.8 → v1.0.4
    - Open AWS Provider to `&lt; 7.0.0`
- Add the option to set additional security groups to the ALB module



</div>



## terraform-aws-utilities


### [v1.0.0](https://github.com/gruntwork-io/terraform-aws-utilities/releases/tag/v1.0.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/15/2026 | Modules affected: instance-type, request-quota-increase | <a href="https://github.com/gruntwork-io/terraform-aws-utilities/releases/tag/v1.0.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- LIB-3910: Update provider to V6
- LIB-3490: Update AMIs and packages



</div>



## terraform-aws-vpc


### [v0.28.10](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.28.10)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/13/2026 | Modules affected: vpc-flow-logs | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.28.10">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Upgraded module reference


</div>

<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "releases",
  "hash": "8ec19defc385537f8256763068694db2"
}
##DOCS-SOURCER-END -->

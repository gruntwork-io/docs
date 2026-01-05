
# Gruntwork release 2025-10

<p style={{marginTop: "-25px"}}><small><a href="/guides">Guides</a> / <a href="/guides/stay-up-to-date">Update Guides</a> / <a href="/guides/stay-up-to-date/releases">Releases</a> / 2025-10</small></p>

This page is lists all the updates to the [Gruntwork Infrastructure as Code
Library](https://gruntwork.io/infrastructure-as-code-library/) that were released in 2025-10. For instructions
on how to use these updates in your code, check out the [updating
documentation](/library/stay-up-to-date/updating).

Here are the repos that were updated:

- [boilerplate](#boilerplate)
- [pipelines-actions](#pipelines-actions)
- [pipelines-cli](#pipelines-cli)
- [pipelines-workflows](#pipelines-workflows)
- [terraform-aws-architecture-catalog](#terraform-aws-architecture-catalog)
- [terraform-aws-data-storage](#terraform-aws-data-storage)
- [terraform-aws-ecs](#terraform-aws-ecs)
- [terraform-aws-eks](#terraform-aws-eks)
- [terraform-aws-monitoring](#terraform-aws-monitoring)
- [terraform-aws-security](#terraform-aws-security)
- [terraform-aws-service-catalog](#terraform-aws-service-catalog)
- [terraform-aws-vpc](#terraform-aws-vpc)


## boilerplate


### [v0.10.1](https://github.com/gruntwork-io/boilerplate/releases/tag/v0.10.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/2/2025 | <a href="https://github.com/gruntwork-io/boilerplate/releases/tag/v0.10.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

Added GitHub Actions workflows to start the migration of this project to GitHub Actions from CircleCI.

Added linting configurations to match what [Terragrunt](https://github.com/gruntwork-io/terragrunt) uses, and that also involved cleaning up some tests, and some small refactors throughout the codebase.

* chore: Adding GitHub Actions Workflows by @yhakbar in https://github.com/gruntwork-io/boilerplate/pull/245


**Full Changelog**: https://github.com/gruntwork-io/boilerplate/compare/v0.10.0...v0.10.1

</div>



## pipelines-actions


### [v4.1.1](https://github.com/gruntwork-io/pipelines-actions/releases/tag/v4.1.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/27/2025 | <a href="https://github.com/gruntwork-io/pipelines-actions/releases/tag/v4.1.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Remove logs forwarding variable to fix logs parsing bug by @oredavids in https://github.com/gruntwork-io/pipelines-actions/pull/146


**Full Changelog**: https://github.com/gruntwork-io/pipelines-actions/compare/v4.1.0...v4.1.1

</div>


### [v4.1.0](https://github.com/gruntwork-io/pipelines-actions/releases/tag/v4.1.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/22/2025 | <a href="https://github.com/gruntwork-io/pipelines-actions/releases/tag/v4.1.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Update preflight action to drop unused arg in pipelines binary by @oredavids in https://github.com/gruntwork-io/pipelines-actions/pull/145


**Full Changelog**: https://github.com/gruntwork-io/pipelines-actions/compare/v4.0.0...v4.1.0

</div>


### [v4.0.0](https://github.com/gruntwork-io/pipelines-actions/releases/tag/v4.0.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/8/2025 | <a href="https://github.com/gruntwork-io/pipelines-actions/releases/tag/v4.0.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Replace pipelines-status and preflights with binary logic by @oredavids in https://github.com/gruntwork-io/pipelines-actions/pull/124
* fix: Addressing misnamed step status by @yhakbar in https://github.com/gruntwork-io/pipelines-actions/pull/130
* Use pipelines account-factory&apos;s create-account cli command by @oredavids in https://github.com/gruntwork-io/pipelines-actions/pull/128
* Use pipelines template-baselines by @Resonance1584 in https://github.com/gruntwork-io/pipelines-actions/pull/132
* Use pipelines binary for core-account baselines by @oredavids in https://github.com/gruntwork-io/pipelines-actions/pull/131
* Use pipelines propose-baseline-infra-change by @Resonance1584 in https://github.com/gruntwork-io/pipelines-actions/pull/133
* Use pipelines auth for baselining child accounts by @oredavids in https://github.com/gruntwork-io/pipelines-actions/pull/134
* Set the version of mise to be installed by @oredavids in https://github.com/gruntwork-io/pipelines-actions/pull/136
* fix: Using modern env vars instead of legacy `TERRAGRUNT_` environment variables by @yhakbar in https://github.com/gruntwork-io/pipelines-actions/pull/129
* Support status-update in baselining by @Resonance1584 in https://github.com/gruntwork-io/pipelines-actions/pull/137
* Drift Detection 2.0 Scripts by @Resonance1584 in https://github.com/gruntwork-io/pipelines-actions/pull/138
* chore: Bumping `mise` version to `2025.10.0` by @yhakbar in https://github.com/gruntwork-io/pipelines-actions/pull/141
* Use pipelines binary for delegated repo setup by @oredavids in https://github.com/gruntwork-io/pipelines-actions/pull/140
* Update usage of delegated repository command to correctly report successful runs by @oredavids in https://github.com/gruntwork-io/pipelines-actions/pull/142
* Remove pipelines-bootstrap action by @oredavids in https://github.com/gruntwork-io/pipelines-actions/pull/143


**Full Changelog**: https://github.com/gruntwork-io/pipelines-actions/compare/v3.6.4...v4.0.0

</div>



## pipelines-cli


### [v0.40.3](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.40.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/30/2025 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.40.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Add support for repository_dispatch event type by @Resonance1584 in https://github.com/gruntwork-io/pipelines/pull/494
* Make log less noisy by @Resonance1584 in https://github.com/gruntwork-io/pipelines/pull/493


**Full Changelog**: https://github.com/gruntwork-io/pipelines/compare/v0.40.2...v0.40.3


</div>


### [v0.40.2](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.40.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/23/2025 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.40.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Implement GitLab branch protection by @oredavids in https://github.com/gruntwork-io/pipelines/pull/491
* Add token preflights for GitLab by @oredavids in https://github.com/gruntwork-io/pipelines/pull/492


**Full Changelog**: https://github.com/gruntwork-io/pipelines/compare/v0.40.1...v0.40.2


</div>


### [v0.40.1](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.40.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/21/2025 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.40.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

Pipelines will now always use `--queue-include-units-reading` instead of `--units-that-include`. 

Previously, Pipelines would only use the former flag for `FileChanged` events for the sake of providing greater backwards compatibility, but the minimum supported version of Terragrunt in Pipelines now supports `--units-that-include`, and this is no longer necessary.

By making this change, Pipelines now behaves more in-line with customer expectations, as customers expect that a file with an `.hcl` extension read via an HCL function like `read_terragrunt_config()` should still result in inclusion into the run queue.

* feat: Use `--queue-include-units-reading` instead of `--units-that-include` by @yhakbar in https://github.com/gruntwork-io/pipelines/pull/489


**Full Changelog**: https://github.com/gruntwork-io/pipelines/compare/v0.40.0...v0.40.1


</div>


### [v0.40.0](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.40.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/8/2025 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.40.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * fix: Adding `TG_NO_STACK_GENERATE` by @yhakbar in https://github.com/gruntwork-io/pipelines/pull/383
* Fix flake with env ordering by @Resonance1584 in https://github.com/gruntwork-io/pipelines/pull/386
* DEV-851: GitHub scm artifact provider implementation by @ZachGoldberg in https://github.com/gruntwork-io/pipelines/pull/345
* Reenable integration tests by @Resonance1584 in https://github.com/gruntwork-io/pipelines/pull/379
* Update pipelines status init for GitHub by @oredavids in https://github.com/gruntwork-io/pipelines/pull/384
* Fix test missing mock by @Resonance1584 in https://github.com/gruntwork-io/pipelines/pull/387
* Update status update to use drift detection summary prefix when appropriate by @oredavids in https://github.com/gruntwork-io/pipelines/pull/388
* Update status-update commands to use separate tokens for read and write operations by @oredavids in https://github.com/gruntwork-io/pipelines/pull/389
* Update status-update to accommodate unique artifact name requirement in GitHub by @oredavids in https://github.com/gruntwork-io/pipelines/pull/392
* Remove legacy telemetry events by @Resonance1584 in https://github.com/gruntwork-io/pipelines/pull/385
* Add pipelines scm create-change-request-comment by @Resonance1584 in https://github.com/gruntwork-io/pipelines/pull/390
* Get correct commit SHA for github pull requests by @oredavids in https://github.com/gruntwork-io/pipelines/pull/394
* 2025 05 29 auto header by @Resonance1584 in https://github.com/gruntwork-io/pipelines/pull/393
* Fix GitHub comments for whitespace changes to modules  by @oredavids in https://github.com/gruntwork-io/pipelines/pull/395
* Get pipelines job logs URL for GitHub by @oredavids in https://github.com/gruntwork-io/pipelines/pull/396
* Relax job name check by @oredavids in https://github.com/gruntwork-io/pipelines/pull/397
* Add accountrequests package with GetAccountRequest function [cursor/claude] by @Resonance1584 in https://github.com/gruntwork-io/pipelines/pull/399
* Update logsURL tests to use pipelines-workflows repo by @oredavids in https://github.com/gruntwork-io/pipelines/pull/402
* Bump golang to 1.24 by @Resonance1584 in https://github.com/gruntwork-io/pipelines/pull/401
* 2025 06 09 update dependencies by @Resonance1584 in https://github.com/gruntwork-io/pipelines/pull/403
* feat: Ensuring forwards compatibility by bootstrapping by default by @yhakbar in https://github.com/gruntwork-io/pipelines/pull/405
* Add boilerplate as a library by @Resonance1584 in https://github.com/gruntwork-io/pipelines/pull/404
* Validate-token-permissions-in-binary by @oredavids in https://github.com/gruntwork-io/pipelines/pull/407
* Use commit SHA from environment for preflight by @oredavids in https://github.com/gruntwork-io/pipelines/pull/410
* Add init from arch catalog by @Resonance1584 in https://github.com/gruntwork-io/pipelines/pull/409
* DEV-946 - Account Factory e2e test part 1 - account provisioning by @ZachGoldberg in https://github.com/gruntwork-io/pipelines/pull/398
* feat: Remove usage of legacy flags by @yhakbar in https://github.com/gruntwork-io/pipelines/pull/406
* Surface GitHub comment token issues gracefully by @oredavids in https://github.com/gruntwork-io/pipelines/pull/414
* fix: Replace usage of `run-all` with `run --all` by @yhakbar in https://github.com/gruntwork-io/pipelines/pull/415
* Add account-factory template-baselines by @Resonance1584 in https://github.com/gruntwork-io/pipelines/pull/408
* fix: Reducing usage of legacy env vars by @yhakbar in https://github.com/gruntwork-io/pipelines/pull/418
* Implement account-factory&apos;s create-account command by @oredavids in https://github.com/gruntwork-io/pipelines/pull/416
* fix: Avoid throwing error when change request doesn&apos;t exist by @yhakbar in https://github.com/gruntwork-io/pipelines/pull/419
* Fix accounts.yml formatting by @Resonance1584 in https://github.com/gruntwork-io/pipelines/pull/420
* Fix TG_QUEUE_STRICT_INCLUDE should only be added when queue-include-d… by @Resonance1584 in https://github.com/gruntwork-io/pipelines/pull/421
* Create `pipelines account-factory baseline-core` cli command by @oredavids in https://github.com/gruntwork-io/pipelines/pull/422
* Add propose-baseline-infra-change by @Resonance1584 in https://github.com/gruntwork-io/pipelines/pull/423
* Extend terragrunt-credentials command to support role chaining by @oredavids in https://github.com/gruntwork-io/pipelines/pull/424
* Add extra details to an error message by @ZachGoldberg in https://github.com/gruntwork-io/pipelines/pull/427
* Add E2E tests for account baseline job by @oredavids in https://github.com/gruntwork-io/pipelines/pull/426
* Support account baselining in status-update by @Resonance1584 in https://github.com/gruntwork-io/pipelines/pull/429
* Update template baselines to use HCL environment config for repos with valid HCL configuration by @oredavids in https://github.com/gruntwork-io/pipelines/pull/430
* Generate gitlab yaml by @Resonance1584 in https://github.com/gruntwork-io/pipelines/pull/432
* Add nil fixes by @odgrim in https://github.com/gruntwork-io/pipelines/pull/431
* Add e2e tests for gitlab account factory by @oredavids in https://github.com/gruntwork-io/pipelines/pull/433
* feat: Expand ignore filter to support execute by @yhakbar in https://github.com/gruntwork-io/pipelines/pull/442
* Fix VPC arg casing by @Resonance1584 in https://github.com/gruntwork-io/pipelines/pull/444
* Force fetch deploy branch, log merge-base info by @Resonance1584 in https://github.com/gruntwork-io/pipelines/pull/447
* Use gitlab e2e1 in accountfactory test by @Resonance1584 in https://github.com/gruntwork-io/pipelines/pull/448
* Add EXPERIMENT_DISABLE_PREFLIGHT_AHEAD_OF_DEPLOY_BRANCH by @Resonance1584 in https://github.com/gruntwork-io/pipelines/pull/456
* Drift detection 2.0 by @Resonance1584 in https://github.com/gruntwork-io/pipelines/pull/449
* Add GitHub Drift Detection e2e test by @Resonance1584 in https://github.com/gruntwork-io/pipelines/pull/451
* Support stacks in drift-detection by @Resonance1584 in https://github.com/gruntwork-io/pipelines/pull/453
* Add retry to occasionally failing oidc request by @Resonance1584 in https://github.com/gruntwork-io/pipelines/pull/460
* DEV-1051 Refine Drift PR Comment by @Resonance1584 in https://github.com/gruntwork-io/pipelines/pull/458
* Move force update to earlier in preflight so it always runs by @Resonance1584 in https://github.com/gruntwork-io/pipelines/pull/459
* feat: Adding support for guessed Pipelines auth configurations by @yhakbar in https://github.com/gruntwork-io/pipelines/pull/466
* fix: Revert temporary workflow pin by @yhakbar in https://github.com/gruntwork-io/pipelines/pull/469
* feat: Moving `TG_AUTH_PROVIDER_CMD` environment variable set into the Pipelines binary by @yhakbar in https://github.com/gruntwork-io/pipelines/pull/465
* feat: Adding `custom` `authentication` block by @yhakbar in https://github.com/gruntwork-io/pipelines/pull/467
* Add provision-delegated-repository &amp; template-access-control-account commands by @oredavids in https://github.com/gruntwork-io/pipelines/pull/457
* Remove bash control chars from drift detection error excerpt by @Resonance1584 in https://github.com/gruntwork-io/pipelines/pull/462
* fix: `configInternal` --&gt; `config` by @yhakbar in https://github.com/gruntwork-io/pipelines/pull/471
* feat: Adding `azure_oidc` support by @yhakbar in https://github.com/gruntwork-io/pipelines/pull/468
* fix: Run custom auth in Pipelines by @yhakbar in https://github.com/gruntwork-io/pipelines/pull/470
* fix: Fixing some tests by @yhakbar in https://github.com/gruntwork-io/pipelines/pull/475
* fix: Fixing `TestInitializeInfraLiveFromArchCatalog` by @yhakbar in https://github.com/gruntwork-io/pipelines/pull/476
* fix: More invasive implementation of supporting authless behavior by @yhakbar in https://github.com/gruntwork-io/pipelines/pull/474
* feat: Remove requirement for auth by @yhakbar in https://github.com/gruntwork-io/pipelines/pull/473
* fix: Cleanup from no-auth PRs by @yhakbar in https://github.com/gruntwork-io/pipelines/pull/479
* Per unit drift detection commands for GitHub by @Resonance1584 in https://github.com/gruntwork-io/pipelines/pull/464
* Add unlock unit command by @Resonance1584 in https://github.com/gruntwork-io/pipelines/pull/478
* Setup Delegated repository for GitLab Enterprise Account factory  by @oredavids in https://github.com/gruntwork-io/pipelines/pull/477
* Update status finalize action to check for setup-delegated-repo step when required by @oredavids in https://github.com/gruntwork-io/pipelines/pull/482
* Add retries to tofu provider download by @Resonance1584 in https://github.com/gruntwork-io/pipelines/pull/483
* Fix skipped tests with nexttgversion by @Resonance1584 in https://github.com/gruntwork-io/pipelines/pull/480
* Add unlock-all by @Resonance1584 in https://github.com/gruntwork-io/pipelines/pull/481
* Update github account factory tests to use arch-catalog main branch(Pipelines-bootstrap removal) by @oredavids in https://github.com/gruntwork-io/pipelines/pull/484
* DEV-1099 Rename Module to Unit [AI Written] by @Resonance1584 in https://github.com/gruntwork-io/pipelines/pull/485
* Reference main version of github pipelines actions and workflows in account factory e2e tests by @oredavids in https://github.com/gruntwork-io/pipelines/pull/486

* @odgrim made their first contribution in https://github.com/gruntwork-io/pipelines/pull/431

**Full Changelog**: https://github.com/gruntwork-io/pipelines/compare/v0.39.0...v0.40.0


</div>



## pipelines-workflows


### [v4.0.2](https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v4.0.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/30/2025 | <a href="https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v4.0.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - Fixed unknown event type when `repository_dispatch` is used
- Reduced log noise during authentication

* Pipelines CLI v0.40.3 by @Resonance1584 in https://github.com/gruntwork-io/pipelines-workflows/pull/167


**Full Changelog**: https://github.com/gruntwork-io/pipelines-workflows/compare/v4...v4.0.2

</div>


### [v4.0.1](https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v4.0.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/27/2025 | <a href="https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v4.0.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Use updated actions with fix for logs parsing by @oredavids in https://github.com/gruntwork-io/pipelines-workflows/pull/166


**Full Changelog**: https://github.com/gruntwork-io/pipelines-workflows/compare/v4...v4.0.1

</div>


### [v4.0.0](https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v4.0.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/23/2025 | <a href="https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v4.0.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Pipelines v4 is nearly a full rewrite of the pipelines implementation within GitHub.  Prior to v4 the bulk of the &quot;glue&quot; logic to stitch together various components of the workflow was written in bash. In v4 we&apos;ve replaced the majority of the bash code with golang code which is both faster, more maintainable and has significantly improved test coverage.  v4 also includes a handful of new features:

Pipelines v3 has maximum Terragrunt version of 0.84.  Pipelines v4 removes this restriction and will support all Terragrunt versions from `0.86.3` through to 1.0+.

As of this release we are promoting HCL to the default configuration language for Pipelines.  This release includes additions to the pipelines HCL configuration specification that bring it up to full feature parity with YML, and we intend to build forwards using only HCL.  As a result, the YML configuration for Pipelines is now deprecated and will be removed in a future release.

Pipelines will now request a custom log format from Terragrunt (via `TG_LOG_CUSTOM_FORMAT`) and then parse the resulting output into different streams, and present each Unit&apos;s output independently and deinterlaced in the pipelines comment engine.

Pipelines v4 includes support for Azure OIDC and state storage.  New configuration options are now available in [HCL configuration](https://docs.gruntwork.io/2.0/reference/pipelines/configurations-as-code/api#azure_oidc-block-attributes) for Azure.

Pipelines v4 includes a rewrite of several components of the commenting engine which should result in less time spent calculating and  posting PR comments.

Pipelines v4 includes [a more expressive syntax](https://docs.gruntwork.io/2.0/docs/pipelines/guides/running-drift-detection#drift-detection-filter) for filters when triggering drift detection.

The following [feature flags](https://docs.gruntwork.io/2.0/reference/pipelines/feature-flags) are now all *enabled* by default:

* PIPELINES_FEATURE_EXPERIMENT_AGGRESSIVE_CONSOLIDATION
* PIPELINES_FEATURE_EXPERIMENT_COLOCATED_FILE_UNIT_CHANGE_DETECTION
* PIPELINES_FEATURE_EXPERIMENT_MINIMIZE_BLAST_RADIUS


Pipelines will now always use `--queue-include-units-reading` instead of `--units-that-include`. 

Previously, Pipelines would only use the former flag for `FileChanged` events for the sake of providing greater backwards compatibility, but the minimum supported version of Terragrunt in Pipelines now supports `--units-that-include`, and this is no longer necessary.

By making this change, Pipelines now behaves more in-line with customer expectations, as customers expect that a file with an `.hcl` extension read via an HCL function like `read_terragrunt_config()` should still result in inclusion into the run queue.

Pipelines v4 now refers to leaf folders with a `terragrunt.hcl` file as `units`.  Prior versions used the term `module`.  This change aligns Pipelines&apos; terminology with Terragrunt&apos;s.


Please see a full migration guide at https://docs.gruntwork.io/2.0/docs/pipelines/previous-versions/upgrading-github-v3-to-v4


* Use updated actions for comments by @oredavids in https://github.com/gruntwork-io/pipelines-workflows/pull/125
* Use updated preflight action that uses logic in binary by @oredavids in https://github.com/gruntwork-io/pipelines-workflows/pull/127
* Pass cli, actions, and credentials versions as inputs by @Resonance1584 in https://github.com/gruntwork-io/pipelines-workflows/pull/126
* Fix pipelines comment token used in pipelines-root.yml preflight call by @oredavids in https://github.com/gruntwork-io/pipelines-workflows/pull/131
* fix: Addressing misnamed step status by @yhakbar in https://github.com/gruntwork-io/pipelines-workflows/pull/134
* Use provision-account action that uses binary&apos;s create account by @oredavids in https://github.com/gruntwork-io/pipelines-workflows/pull/132
* fix: Using modern env vars instead of legacy `TERRAGRUNT_` environment variables by @yhakbar in https://github.com/gruntwork-io/pipelines-workflows/pull/133
* Use baseline-core action that uses the pipelines binary by @oredavids in https://github.com/gruntwork-io/pipelines-workflows/pull/136
* Use pipelines propose-baseline-infra-change by @Resonance1584 in https://github.com/gruntwork-io/pipelines-workflows/pull/137
* Use pipelines binary&apos;s auth for child account baselining  by @oredavids in https://github.com/gruntwork-io/pipelines-workflows/pull/138
* 2025 07 04 fix commenting by @Resonance1584 in https://github.com/gruntwork-io/pipelines-workflows/pull/139
* Support status-update in baselining by @Resonance1584 in https://github.com/gruntwork-io/pipelines-workflows/pull/143
* Pipelines CLI v0.40.0-rc17 by @Resonance1584 in https://github.com/gruntwork-io/pipelines-workflows/pull/146
* Drift Detection 2.0 Workflow by @Resonance1584 in https://github.com/gruntwork-io/pipelines-workflows/pull/147
* DEV-1010 Per unit drift detection by @Resonance1584 in https://github.com/gruntwork-io/pipelines-workflows/pull/152
* chore: Remove requirement for tokens by @yhakbar in https://github.com/gruntwork-io/pipelines-workflows/pull/153
* chore: Bumping `mise` version to `2025.10.0` by @yhakbar in https://github.com/gruntwork-io/pipelines-workflows/pull/154
* Revert &quot;chore: Bumping `mise` version to `2025.10.0`&quot; by @yhakbar in https://github.com/gruntwork-io/pipelines-workflows/pull/155
* chore: Bumping `mise` version to `2025.10.0` by @yhakbar in https://github.com/gruntwork-io/pipelines-workflows/pull/156
* Use pipelines binary for delegated repo setup by @oredavids in https://github.com/gruntwork-io/pipelines-workflows/pull/151
* Use updated actions to correctly report delegated repo job status by @oredavids in https://github.com/gruntwork-io/pipelines-workflows/pull/157
* Use pipelines binary unlock commands by @Resonance1584 in https://github.com/gruntwork-io/pipelines-workflows/pull/158
* Remove pipelines-bootstrap action by @oredavids in https://github.com/gruntwork-io/pipelines-workflows/pull/159
* Fix invalid output by @Resonance1584 in https://github.com/gruntwork-io/pipelines-workflows/pull/160
* 2025 10 08 v4.0.0 rc1 by @Resonance1584 in https://github.com/gruntwork-io/pipelines-workflows/pull/162
* fix: Adding concatenation of command and args back by @yhakbar in https://github.com/gruntwork-io/pipelines-workflows/pull/163
* chore: Bumping Pipelines CLI version to `v0.40.1` by @yhakbar in https://github.com/gruntwork-io/pipelines-workflows/pull/164
* Use updated preflight action and binary by @oredavids in https://github.com/gruntwork-io/pipelines-workflows/pull/165


**Full Changelog**: https://github.com/gruntwork-io/pipelines-workflows/compare/v3.9.0...v4.0.0

</div>



## terraform-aws-architecture-catalog


### [v4.0.1](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v4.0.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/10/2025 | <a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v4.0.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Use v2 of GitLab pipelines workflows as default by @oredavids in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1174
* Update infra-live-root template&apos;s readme by @oredavids in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1175


**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-architecture-catalog/compare/v4.0.0...v4.0.1

</div>


### [v4.0.0](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v4.0.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/8/2025 | <a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v4.0.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Update single-account-baseline template to use Pipelines HCL config on demand by @oredavids in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1154
* feat: Bump OpenTofu to 1.10 by @yhakbar in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1152
* Ore/dev-1024-extend-account-factory-templates-for-gitlab by @oredavids in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1155
* Rename mise.toml to .mise.toml by @Resonance1584 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1156
* Bump terragrunt version by @Resonance1584 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1157
* Deprecate v2 templates by @oredavids in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1160
* [LIB-2545] expand apply/plan roles to work with control-tower-account-factory-async by @gcagle3 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1161
* add states:ValidateStateMachineDefinition to plan role by @gcagle3 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1162
* Extend delegated-account-factory templates for GitLab by @oredavids in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1159
* Fix PR 1145 bug got cloudtrail logs and inadvertently deleted code by @oredavids in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1166
* fix: Adding `.terragrunt-stack` to `.gitignore` files by @yhakbar in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1167
* Fix account name processing bug in access-control-account template by @oredavids in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1168
* Update unlock and drift detection workflows by @Resonance1584 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1170
* Fix unlocks in access control / delegated repos by @Resonance1584 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1169
* Update stale root terragrunt references by @oredavids in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1171
* Remove PipelinesPassed by @Resonance1584 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1172
* Update vended architecture catalog version to v4.0.0 by @Resonance1584 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1173

Updated `devops-foundations-infrastructure-live-root`, `devops-foundations-infrastructure-live-access-control`, `devops-foundations-infrastructure-live-delegated`, `devops-foundations-infrastructure-modules` &amp; `single-account-baseline` templates to support usage in GitLab environments. Supporting components have been moved into `blueprints` folder for a single source of truth.

Templates now uses the following new variables
- `SCMProvider`: to specify the platform. Options: &quot;GitLab&quot; or &quot;GitHub&quot;
- `SCMProviderGroup`: replaces &quot;GithubOrg&quot;
- `SCMProviderRepo`: replaces &quot;InfraLiveRepoName&quot;


**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-architecture-catalog/compare/v3.1.1...v4.0.0

</div>



## terraform-aws-data-storage


### [v0.41.1](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.41.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/2/2025 | Modules affected: rds, aurora | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.41.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- docs: Add PostgreSQL major version upgrade documentation
- fix: Create an implicit dependency on the RDS resource
- feat(aurora): Add database_insights_mode option to aurora module



</div>



## terraform-aws-ecs


### [v1.2.0](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v1.2.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/2/2025 | Modules affected: ecs-task-definition, ecs-task-scheduler | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v1.2.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- ecs-task-definition: New module that deploys an ECS Task Definition stand-alone (without a service)
- ecs-task-scheduler: Fix a bug where the var ecs_target_network_configuration did not have a type definition 




</div>



## terraform-aws-eks


### [v3.1.1](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v3.1.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/14/2025 | Modules affected: eks-k8s-karpenter | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v3.1.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Expose `resources` configuration on Karpenter Helm Chart values.



</div>


### [v2.1.1](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v2.1.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/6/2025 | Modules affected: eks-k8s-external-dns | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v2.1.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Add Support for Bitnami external-dns image repository (bitnami -&gt; bitnamilegacy). Default image repository is now set as `bitnamilegacy/external-dns`.



</div>


### [v1.5.1](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v1.5.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/6/2025 | Modules affected: eks-k8s-external-dns | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v1.5.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Add Support for Bitnami external-dns image repository (bitnami -&gt; bitnamilegacy). Default image repository is now set as `bitnamilegacy/external-dns`.



</div>


### [v3.1.0](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v3.1.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/1/2025 | Modules affected: eks-k8s-external-dns | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v3.1.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Add Support for Bitnami external-dns image repository (bitnami -&gt; bitnamilegacy). Default image repository is now set as `bitnamilegacy/external-dns`.



</div>



## terraform-aws-monitoring


### [v1.2.0](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v1.2.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/24/2025 | Modules affected: alarms | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v1.2.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- alarms/sns-to-slack: new option var.enable_advanced_formatting to enable CloudWatchNotification formatting for sns-to-slack




</div>


### [v1.1.0](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v1.1.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/3/2025 | Modules affected: alarms | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v1.1.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- `alarms/asg-disk-alarms`: Fixed ASG disk alarm showing &apos;Insufficient Data&apos; due to dimensions mismatch



</div>



## terraform-aws-security


### [v1.1.0](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v1.1.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/10/2025 | Modules affected: aws-config-multi-region, ebs-encryption-multi-region, guardduty-multi-region, iam-access-analyzer-multi-region | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v1.1.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Adding region ap-southeast-4 as an optional region for use by GuardDuty



</div>



## terraform-aws-service-catalog


### [v0.140.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.140.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/31/2025 | Modules affected: modules/networking/vpc, modules/services/eks-argocd, modules/services/eks-cluster, modules/services/eks-core-services | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.140.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Bump `terraform-aws-eks` to `v2.0.0`
- Update default Karpenter to `v1.6.2`



</div>


### [v0.130.7](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.130.7)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/30/2025 | Modules affected: services/eks-workers | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.130.7">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

Add Support for AL2023 EKS Worker AMI&apos;s. New configurations have been added to `autoscaling_group_configurations` and `managed_node_group_configurations` to support both AL2 and AL2023 AMI Types. Users on an AMI Type other than AL2 will need to proactively set the corresponding `autoscaling_group_configurations.asg_ami_type` and/or managed_node_group_configurations.ami_type` to ensure the correct user data script is used during initialization of the worker node(s). See [here](https://github.com/gruntwork-io/terraform-aws-service-catalog/blob/v0.130.7/modules/services/eks-workers/user_data.tf#L49-L57) for current supported AMI Type configurations.

The following attributes and variables have were added: 
- `autoscaling_group_configurations.asg_ami_type`
- `autoscaling_group_configurations.asg_instance_user_data_base64`
- `managed_node_group_configurations.ami_type`
- `managed_node_group_configurations.user_data_base64`
- `asg_default_ami_type`
- `asg_default_instance_user_data_base64`
- `node_group_default_ami_type`
- `node_group_default_user_data_base64`
- `managed_node_group_create_security_group`

**NOTE**: The new `*ami_type` variables and attributes are defaulted to `AL2_x86_64` to maintain previous default configurations. These will need to be updated to `AL2023_*` configurations for AL2023 AMI types. An example would be `AL2023_x86_64_STANDARD`.  See [here](https://github.com/gruntwork-io/terraform-aws-service-catalog/blob/v0.130.7/modules/services/eks-workers/user_data.tf#L49-L57) for current supported AMI Type configurations. 



</div>


### [v0.130.6](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.130.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/30/2025 | Modules affected: services, data-stores, networking | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.130.6">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- `services/ecs-fargate-cluster`: Add standardized output names to ecs-fargate-cluster module
- `data-stores/aurora`: Expose cluster-level Performance Insights and Database Insights parameters in Aurora module
- `networking/sns-topics`: new option `var.enable_advanced_formatting` to enable CloudWatchNotification formatting for sns-to-slack





</div>


### [v0.130.5](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.130.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/16/2025 | Modules affected: services/eks-core-services | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.130.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Add new variable `cluster_autoscaler_container_extra_args` to `services/eks-core-services` module for providing additional container args to the cluster autoscaler. 



</div>


### [v0.130.4](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.130.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/10/2025 | Modules affected: modules/networking/vpc, modules/services/eks-argocd, modules/services/eks-cluster, modules/services/eks-core-services | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.130.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Bump `terraform-aws-eks` library module to [v1.5.1](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v1.5.1)
    - Backport release to address upstream [Bitnami Catalog Changes](https://github.com/bitnami/charts/issues/35164)
    - Expose new variable in `services/eks-core-services` module for configuring `external-dns` image repository. New variable `external_dns_image_repository` created with default value set to `bitnamilegacy/external-dns`



</div>


### [v0.130.3](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.130.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/9/2025 | Modules affected: modules/networking/vpc, modules/services/ec2-instance, modules/services/eks-argocd, modules/services/eks-cluster | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.130.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Add support for additional `fstype` configurations to `services/ec2-instance` module. Add/Expose the following variables to the `services/ec2-instance` module:
    - `instance_device`
    - `instance_mount_path`
    - `instance_fstype`
- Bump `terraform-aws-eks` library module to [v1.5.0](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v1.5.0)
    - Add support for Node Repair Config for EKS Managed Node Groups.



</div>


### [v0.130.2](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.130.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/9/2025 | Modules affected: modules/networking/vpc, modules/services/eks-argocd, modules/services/eks-cluster, modules/services/eks-core-services | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.130.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Bump `terraform-aws-eks` library module to [v1.4.0](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v1.4.0)
- Bump default `kubergrunt` version to [v0.18.1](https://github.com/gruntwork-io/kubergrunt/releases/tag/v0.18.1).
- Add EKS Worker AL2023 Packer Template.


</div>


### [v0.130.1](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.130.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/7/2025 | Modules affected: modules/networking/vpc, modules/services/eks-argocd, modules/services/eks-cluster, modules/services/eks-core-services | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.130.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Bump `terraform-aws-eks` library module to [v1.3.0](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v1.3.0)
- Expose new variables `asg_default_extra_block_device_mappings` and `autoscaling_group_configurations.extra_block_device_mappings` in `services/eks-workers` and `services/eks-cluster` modules.


</div>


### [v0.130.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.130.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/7/2025 | Modules affected: modules/networking/vpc, modules/services/eks-argocd, modules/services/eks-cluster, modules/services/eks-core-services | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.130.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Bump `terraform-aws-eks` library module to [v1.2.0](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v1.2.0)
- Set default `cluster_autoscaler_chart_version` to `9.46.6` in `eks-core-services` module.


</div>


### [v0.129.3](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.129.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/7/2025 | Modules affected: modules/networking/vpc, modules/services/eks-argocd, modules/services/eks-cluster, modules/services/eks-core-services | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.129.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Bump `terraform-aws-eks` library module to [v1.1.1](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v1.1.1)


</div>


### [v0.129.2](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.129.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/3/2025 | Modules affected: modules/networking/vpc, modules/services/eks-argocd, modules/services/eks-cluster, modules/services/eks-core-services | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.129.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Bump `terraform-aws-eks` library module to [v1.1.0](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v1.1.0)


</div>


### [v0.129.1](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.129.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/2/2025 | Modules affected: data-stores | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.129.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fix `monitoring_role_name` reference in RDS module. Previously `monitoring_role_name` was being set by `monitoring_role_arn` and is now mapped correctly. 



</div>



## terraform-aws-vpc


### [v0.28.8](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.28.8)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/31/2025 | Modules affected: vpc-interface-endpoint | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.28.8">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Added ability to provision secretsmanager-fips vpc endpoint
- Added ability to have rds fips endpoint



</div>

<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "releases",
  "hash": "611953e375c563ab852e36cea11fcd3e"
}
##DOCS-SOURCER-END -->

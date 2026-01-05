
# Gruntwork release 2025-02

<p style={{marginTop: "-25px"}}><small><a href="/guides">Guides</a> / <a href="/guides/stay-up-to-date">Update Guides</a> / <a href="/guides/stay-up-to-date/releases">Releases</a> / 2025-02</small></p>

This page is lists all the updates to the [Gruntwork Infrastructure as Code
Library](https://gruntwork.io/infrastructure-as-code-library/) that were released in 2025-02. For instructions
on how to use these updates in your code, check out the [updating
documentation](/library/stay-up-to-date/updating).

Here are the repos that were updated:

- [patcher-cli](#patcher-cli)
- [pipelines-actions](#pipelines-actions)
- [pipelines-cli](#pipelines-cli)
- [pipelines-workflows](#pipelines-workflows)
- [repo-copier](#repo-copier)
- [terraform-aws-architecture-catalog](#terraform-aws-architecture-catalog)
- [terraform-aws-ci](#terraform-aws-ci)
- [terraform-aws-cis-service-catalog](#terraform-aws-cis-service-catalog)
- [terraform-aws-control-tower](#terraform-aws-control-tower)
- [terraform-aws-data-storage](#terraform-aws-data-storage)
- [terraform-aws-ecs](#terraform-aws-ecs)
- [terraform-aws-eks](#terraform-aws-eks)
- [terraform-aws-monitoring](#terraform-aws-monitoring)
- [terraform-aws-security](#terraform-aws-security)
- [terraform-aws-service-catalog](#terraform-aws-service-catalog)
- [terraform-aws-static-assets](#terraform-aws-static-assets)
- [terraform-aws-vpc](#terraform-aws-vpc)


## patcher-cli


### [v0.13.0](https://github.com/gruntwork-io/patcher-cli/releases/tag/v0.13.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/25/2025 | <a href="https://github.com/gruntwork-io/patcher-cli/releases/tag/v0.13.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Release duplicated from https://github.com/gruntwork-io/patcher/releases/tag/v0.13.0

</div>



## pipelines-actions


### [v3.4.1](https://github.com/gruntwork-io/pipelines-actions/releases/tag/v3.4.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/18/2025 | <a href="https://github.com/gruntwork-io/pipelines-actions/releases/tag/v3.4.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * fix: Correct custom binary check by @yhakbar in https://github.com/gruntwork-io/pipelines-actions/pull/111


**Full Changelog**: https://github.com/gruntwork-io/pipelines-actions/compare/v3.4.0...v3.4.1

</div>


### [v3.4.0](https://github.com/gruntwork-io/pipelines-actions/releases/tag/v3.4.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/10/2025 | <a href="https://github.com/gruntwork-io/pipelines-actions/releases/tag/v3.4.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Support a custom URL for downloading the binary by @ZachGoldberg in https://github.com/gruntwork-io/pipelines-actions/pull/104


**Full Changelog**: https://github.com/gruntwork-io/pipelines-actions/compare/v3.3.1...v3.4.0

</div>



## pipelines-cli


### [v0.36.1](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.36.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/25/2025 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.36.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Ignore gitlab-ci file in FileChanged detector by @oredavids in https://github.com/gruntwork-io/pipelines/pull/329


**Full Changelog**: https://github.com/gruntwork-io/pipelines/compare/v0.36.0...v0.36.1


</div>


### [v0.36.0](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.36.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/25/2025 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.36.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Increase parallel in circle by @ZachGoldberg in https://github.com/gruntwork-io/pipelines/pull/323
* Upgrade golang to 1.23.6. Use gotestsum in circleci to provide test overviews. by @Resonance1584 in https://github.com/gruntwork-io/pipelines/pull/321
* Fix comment content by @Resonance1584 in https://github.com/gruntwork-io/pipelines/pull/316
* Add workflow and actions versions to gitlab telemetry by @oredavids in https://github.com/gruntwork-io/pipelines/pull/324
* Prevent status update error on direct push to deploy branch by @oredavids in https://github.com/gruntwork-io/pipelines/pull/325
* Fix .terraform.lock.hcl changes should not trigger HCLChanged by @Resonance1584 in https://github.com/gruntwork-io/pipelines/pull/327
* Fix log message arguments by @Resonance1584 in https://github.com/gruntwork-io/pipelines/pull/326
* Run accounts added infrachange type in isolation by @oredavids in https://github.com/gruntwork-io/pipelines/pull/328


**Full Changelog**: https://github.com/gruntwork-io/pipelines/compare/v0.35.5...v0.36.0


</div>


### [v0.35.5](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.35.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/13/2025 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.35.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
This release makes further efforts to ensure that pipelines functions correctly with older versions of terragrunt, selectively enabling new capabilities as newer TG versions are used.

* Ensure uniqueness of e2e s3 bucket&apos;s state by @oredavids in https://github.com/gruntwork-io/pipelines/pull/319
* Continue working on TG backwards compatibility by @ZachGoldberg in https://github.com/gruntwork-io/pipelines/pull/322


**Full Changelog**: https://github.com/gruntwork-io/pipelines/compare/v0.35.4...v0.35.5


</div>


### [v0.35.4](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.35.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/13/2025 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.35.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
Bring the minimum safe TG version back down to v0.59.7

* Fix semver check by @Resonance1584 in https://github.com/gruntwork-io/pipelines/pull/318
* Make pipelines not barf with older TG by @ZachGoldberg in https://github.com/gruntwork-io/pipelines/pull/320

**Full Changelog**: https://github.com/gruntwork-io/pipelines/compare/v0.35.3...v0.35.4


</div>


### [v0.35.3](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.35.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/12/2025 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.35.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Add e2e tests for config&apos;s env variables by @oredavids in https://github.com/gruntwork-io/pipelines/pull/315
* Fix for pipelines failures on consolidated runs due to missing exclude flags by @ZachGoldberg in https://github.com/gruntwork-io/pipelines/pull/317


**Full Changelog**: https://github.com/gruntwork-io/pipelines/compare/v0.35.2...v0.35.3


</div>


### [v0.35.2](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.35.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/12/2025 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.35.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Use deploy branch from config during execute by @Resonance1584 in https://github.com/gruntwork-io/pipelines/pull/312
* Fix race condition when multiple jobs share a working directory by @Resonance1584 in https://github.com/gruntwork-io/pipelines/pull/314
* Support env HCL config by @oredavids in https://github.com/gruntwork-io/pipelines/pull/311


**Full Changelog**: https://github.com/gruntwork-io/pipelines/compare/v0.35.1...v0.35.2


</div>


### [v0.35.1](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.35.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/11/2025 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.35.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * fix: don&apos;t prefix envs from legacy config by @ZachGoldberg in https://github.com/gruntwork-io/pipelines/pull/313


**Full Changelog**: https://github.com/gruntwork-io/pipelines/compare/v0.35.0...v0.35.1


</div>


### [v0.35.0](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.35.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/10/2025 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.35.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * New Pipelines E2E Testing Framework
  * Verify Pipelines Status by @Resonance1584 in https://github.com/gruntwork-io/pipelines/pull/268
  * Check pipelines status after apply by @oredavids in https://github.com/gruntwork-io/pipelines/pull/271
  * DEV-684: Spike Pipelines e2e by @ZachGoldberg in https://github.com/gruntwork-io/pipelines/pull/264
  * DEV-704 Run E2E tests in CircleCI by @Resonance1584 in https://github.com/gruntwork-io/pipelines/pull/270
  * Make it a little easier to run e2e locally by @ZachGoldberg in https://github.com/gruntwork-io/pipelines/pull/273
* Pipelines GitLab support (Alpha)
  * DEV-701 Add GitLab MergeChangeRequest by @Resonance1584 in https://github.com/gruntwork-io/pipelines/pull/275
  * Implement GitLab Create/Change/List Comment by @ZachGoldberg in https://github.com/gruntwork-io/pipelines/pull/276
  * chore: add settings to make tests work in vscode by @ZachGoldberg in https://github.com/gruntwork-io/pipelines/pull/279
  * DEV-703 Add GitLab Pipelines Status by @Resonance1584 in https://github.com/gruntwork-io/pipelines/pull/277
  * Turn on e2e for gitlab by @ZachGoldberg in https://github.com/gruntwork-io/pipelines/pull/274
  * DEV-726 - Cleanup logs in gitlab comments by @ZachGoldberg in https://github.com/gruntwork-io/pipelines/pull/289
  * DEV-739 - Ensure mise is run in pipelines by @ZachGoldberg in https://github.com/gruntwork-io/pipelines/pull/305
  * Update test setup by @oredavids in https://github.com/gruntwork-io/pipelines/pull/307
  * Add tf-binary support to hcl config by @oredavids in https://github.com/gruntwork-io/pipelines/pull/308
  * Use tf binary config in terragrunt execute by @oredavids in https://github.com/gruntwork-io/pipelines/pull/310
  * Add preflight command by @Resonance1584 in https://github.com/gruntwork-io/pipelines/pull/306
* New Features 
  * feat: Integrate `--terragrunt-queue-include-units-reading` into Pipelines by @yhakbar in https://github.com/gruntwork-io/pipelines/pull/256
* Misc
  * Bump golang.org/x/crypto from 0.28.0 to 0.31.0 by @dependabot in https://github.com/gruntwork-io/pipelines/pull/296
  * Update 2 deps by @ZachGoldberg in https://github.com/gruntwork-io/pipelines/pull/298
  * Cleanup status update code by @Resonance1584 in https://github.com/gruntwork-io/pipelines/pull/293
  * test fix: push 405 retrying into the provider for gitlab by @ZachGoldberg in https://github.com/gruntwork-io/pipelines/pull/299
  * Add status update init plumbing test by @Resonance1584 in https://github.com/gruntwork-io/pipelines/pull/302
  * Add update and finalize tests by @Resonance1584 in https://github.com/gruntwork-io/pipelines/pull/303
  * DEV-733 (take 2, after lewis&apos;s refactors) by @ZachGoldberg in https://github.com/gruntwork-io/pipelines/pull/300
  * DEV-735 - Take 2 based on updated main by @ZachGoldberg in https://github.com/gruntwork-io/pipelines/pull/301
  * DEV-738 Add error handling for execute by @Resonance1584 in https://github.com/gruntwork-io/pipelines/pull/304

**Full Changelog**: https://github.com/gruntwork-io/pipelines/compare/v0.34.0...v0.35.0


</div>



## pipelines-workflows


### [v3.7.6](https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v3.7.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/25/2025 | <a href="https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v3.7.6">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
* Updated orchestrate logic so changes in `.terraform.hcl.lock` do not generate HCLChanged events
* Updated orchestrate logic so FileChanged events are not emitted for changes in `accounts.yml` during AccountsAdded workflow runs.

* Bump CLI to v0.36.0 by @ZachGoldberg in https://github.com/gruntwork-io/pipelines-workflows/pull/111


**Full Changelog**: https://github.com/gruntwork-io/pipelines-workflows/compare/v3...v3.7.6

</div>


### [v3.7.5](https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v3.7.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/21/2025 | <a href="https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v3.7.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * DEV-786 - Allow org_repo_admin fetch to fail on orchestrate by @ZachGoldberg in https://github.com/gruntwork-io/pipelines-workflows/pull/109

**Full Changelog**: https://github.com/gruntwork-io/pipelines-workflows/compare/v3...v3.7.5

</div>


### [v3.7.4](https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v3.7.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/18/2025 | <a href="https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v3.7.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
Fixes a bug that caused a crash during account vending, https://github.com/gruntwork-io/pipelines-actions/issues/110

* bump cli version by @ZachGoldberg in https://github.com/gruntwork-io/pipelines-workflows/pull/106


**Full Changelog**: https://github.com/gruntwork-io/pipelines-workflows/compare/v3.7.3...v3.7.4

</div>


### [v3.7.3](https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v3.7.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/13/2025 | <a href="https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v3.7.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
This version of pipelines reverts the real minimum version requirement for Terragrunt back to 0.59.7 (which has been the minimum going back to the 2.x line of releases).

Absolute Minimum Terragrunt Version Supported
* 0.59.7

Recommended Minimum Terragrunt Version
* 0.68.13 - This version contains additional flags required to enhance pipelines logging and support for [File Dependencies](https://docs.gruntwork.io/2.0/docs/pipelines/guides/file-dependencies)


* bump cli version by @ZachGoldberg in https://github.com/gruntwork-io/pipelines-workflows/pull/106


**Full Changelog**: https://github.com/gruntwork-io/pipelines-workflows/compare/v3.7.2...v3.7.3

</div>


### [v3.7.2](https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v3.7.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/12/2025 | <a href="https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v3.7.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Pull in a bugfix from pipelines cli by @ZachGoldberg in https://github.com/gruntwork-io/pipelines-workflows/pull/105


**Full Changelog**: https://github.com/gruntwork-io/pipelines-workflows/compare/v3...v3.7.2

</div>


### [v3.7.1](https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v3.7.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/11/2025 | <a href="https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v3.7.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
Fixes a bug was introduced in pipelines [v0.32.0](https://github.com/gruntwork-io/pipelines/releases/tag/v0.32.0) that made it such that `enable-terragrunt-provider-cache` and `env` blocks would not propagate correctly to the terragrunt execution environment.

* chore: Use binary v0.35.1 to fix env loading by @ZachGoldberg in https://github.com/gruntwork-io/pipelines-workflows/pull/104


**Full Changelog**: https://github.com/gruntwork-io/pipelines-workflows/compare/v3...v3.7.1

</div>


### [v3.7.0](https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v3.7.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/10/2025 | <a href="https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v3.7.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- Gruntwork Pipelines can now run plan/apply automatically based on dependent-file changes
  - Users have requested the ability to trigger pipelines based on dependencies, such as yaml and json data files. Up until now the recommendation had been to make a white-space change in relevant Terragrunt files. This is an awkward workflow and one that&apos;s prone to error.
  - With this release, Pipelines will now detect changes in data files and emit `FileChanged` events, which then trigger pipelines runs that invoke terragrunt with the [`--queue-include-units-reading`](https://terragrunt.gruntwork.io/docs/reference/cli-options/#terragrunt-queue-include-units-reading) flag. You can also use the [`mark_as_read`](https://terragrunt.gruntwork.io/docs/reference/built-in-functions/#mark_as_read) function to track files that are read by OpenTofu code or bash scripts.
  - More information and examples for this feature will be published to docs.gruntwork.io in the coming days following this release.

* Bump to CLI v0.35.0 by @ZachGoldberg in https://github.com/gruntwork-io/pipelines-workflows/pull/103

**Full Changelog**: https://github.com/gruntwork-io/pipelines-workflows/compare/v3...v3.7.0

- The minimum supported version of Terragrunt was increased to [v0.72.1](https://github.com/gruntwork-io/terragrunt/releases/tag/v0.72.1) in v3.7.0. This was not an intentional change, and there will shortly be a patch version to the 3.7.x branch that reverts the need for newer versions of Terragrunt.

- Use v3.7.3+ to regain full compatibility with Terragrunt going back to 0.59.7

</div>


### [v3.6.1](https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v3.6.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/10/2025 | <a href="https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v3.6.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Fix reference to actions versions in non-root workflows

**Full Changelog**: https://github.com/gruntwork-io/pipelines-workflows/compare/v3.6.0...v3.6.1

</div>


### [v3.6.0](https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v3.6.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/10/2025 | <a href="https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v3.6.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * feat: allow passing in a custom binary by @ZachGoldberg in https://github.com/gruntwork-io/pipelines-workflows/pull/99


**Full Changelog**: https://github.com/gruntwork-io/pipelines-workflows/compare/v3.5.1...v3.6.0

</div>



## repo-copier


### [v0.5.5](https://github.com/gruntwork-io/repo-copier/releases/tag/v0.5.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/25/2025 | <a href="https://github.com/gruntwork-io/repo-copier/releases/tag/v0.5.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * feat: Fixing resolving working dir by @levkohimins in https://github.com/gruntwork-io/repo-copier/pull/267
* chore: Replace tfenv and tgswitch with mise by @arsci in https://github.com/gruntwork-io/repo-copier/pull/263
* chore(deps): set fixed version for golang.org/x/tools/cmd/goimports@v0.24.0
* chore(deps): bump golang.org/x/net from 0.24.0 to 0.33.0 by @dependabot in https://github.com/gruntwork-io/repo-copier/pull/275



**Full Changelog**: https://github.com/gruntwork-io/repo-copier/compare/v0.5.4...v0.5.5

</div>



## terraform-aws-architecture-catalog


### [v2.12.4](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.12.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/27/2025 | <a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.12.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * correct formatting by @ThisGuyCodes in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1132


**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-architecture-catalog/compare/v2.12.3...v2.12.4

</div>


### [v2.12.3](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.12.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/27/2025 | <a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.12.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Gitlab single account setup rename by @ZachGoldberg in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1136
* feat: add github single account setup by @ZachGoldberg in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1135


**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-architecture-catalog/compare/v2.12.2...v2.12.3

</div>


### [v2.12.2](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.12.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/27/2025 | <a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.12.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * GitLab version of Gruntwork Pipelines bootstrap template  by @ZachGoldberg in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1134


**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-architecture-catalog/compare/v2.12.1...v2.12.2

</div>


### [v2.12.1](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.12.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/25/2025 | <a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.12.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Updated templates/devops-foundations-infrastructure-live-root to use terraform-aws-security v0.75.10

**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-architecture-catalog/compare/v2.12.0..v2.12.1

</div>



## terraform-aws-ci


### [v0.59.9](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.59.9)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/24/2025 | Modules affected: ecs-deploy-runner | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.59.9">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- feat: Added `ecs-deploy-runner` to execute package upgrades before installation in containerized environments, improving stability and security.
- chore: Fixed failing tests for Packer image builds and destroy scenarios.




</div>


### [v0.59.8](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.59.8)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/18/2025 | Modules affected: ecs-deploy-runner, infrastructure-deploy-script, infrastructure-deployer, monorepo-helpers | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.59.8">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- build(deps): Updated github.com/gruntwork-io/terragrunt to v0.72.0
- build(deps): Updated golang.org/x/net to v0.33.0
- docs: Change links from the marketing site to the docs site




</div>



## terraform-aws-cis-service-catalog


### [v0.56.1](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.56.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/22/2025 | Modules affected: security, landingzone | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.56.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- `macie` module: added Upgrade Flag and Proper AWS Provider Version Restriction
- `landingzone/*` modules: Exposed additional variables



</div>


### [v0.56.0](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.56.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/20/2025 | Modules affected: data-stores, landingzone, networking, observability | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.56.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- LIB-120: Enable Terrascan [BREAKING CHANGES]
- Fix test failures in security modules


</div>


### [v0.55.3](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.55.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/19/2025 | Modules affected: data-stores | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.55.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - Add timeout variables to data-stores/rds module



</div>


### [v0.55.2](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.55.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/14/2025 | Modules affected: data-stores | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.55.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- bubble up storage params from data-stores/rds



</div>


### [v0.55.1](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.55.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/13/2025 | Modules affected: security | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.55.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Removed upper limit for AWS provider version.



</div>



## terraform-aws-control-tower


### [v0.8.6](https://github.com/gruntwork-io/terraform-aws-control-tower/releases/tag/v0.8.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/25/2025 | Modules affected: landingzone | <a href="https://github.com/gruntwork-io/terraform-aws-control-tower/releases/tag/v0.8.6">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Update terraform-aws-security to v0.75.10





</div>



## terraform-aws-data-storage


### [v0.40.5](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.40.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/12/2025 | Modules affected: efs, lambda-create-snapshot, rds-proxy, rds-replicas | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.40.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- rds-proxy: Configured rds_proxy_user IAM policy to be created conditionally
- efs / lambda-create-snapshot: Documentation update (no functional change)
- rds-replicas: Added a time_sleep for the destruction of the db subnet group.



</div>


### [v0.40.4](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.40.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/5/2025 | Modules affected: rds | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.40.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Use ARN instead of identifier for RDS module for primary instance identifier


</div>



## terraform-aws-ecs


### [v0.38.6](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.38.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/19/2025 | Modules affected: ecs-cluster | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.38.6">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Add `cluster_default_instance_warmup` var to `ecs-cluster`





</div>


### [v0.38.5](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.38.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/10/2025 | Modules affected: ecs-service | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.38.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Update documentation.



</div>



## terraform-aws-eks


### [v0.73.2](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.73.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/16/2025 | Modules affected: eks-alb-ingress-controller-iam-policy | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.73.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- **Bugfix**: fix trailing comma in json policy for `eks-alb-ingress-controller-iam-policy`.



</div>


### [v0.73.1](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.73.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/16/2025 | Modules affected: eks-scripts | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.73.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Add support for AWS local zones in `map-ec2-tags-to-node-labels`.



</div>


### [v0.73.0](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.73.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/16/2025 | Modules affected: eks-container-logs | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.73.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Update `eks-container-logs` to Support 0.1.34
- Exposed additional configuration via new variables: 
    - `aws_for_fluent_bit_chart_name`
    - `aws_for_fluent_bit_release_name`
    - `aws_for_fluent_bit_chart_namespace`
    - `aws_for_fluent_bit_image_pull_policy`
    - `rbac_psp_enabled`
    - `extra_service`
    - `kinesis_streams_configuration`
    - `s3_configuration`
    - `opensearch_configuration`
    - `additional_outputs`
    - `service_account_create`
    - `service_account_annotations`
    - `service_account_name`
    - `update_strategy_type`
    - `node_selector`
    - `pod_annotations`
- Fixed mappings that were broken between `variables` -&gt; `helm chart`. 
- **LIST OF BREAKING CHANGES**
    - `eks-container-logs` now requires Terraform version `&gt;= 1.3.0` to support the `optional` type constraint.
    - `aws_elasticsearch_configuration` variable object is reconfigured to align with the Helm Chart values to simplify usage.
        - `endpoint` object, `use_aws_auth`, `use_tls` attributes were removed from the `aws_elasticsearch_configuration` object and now aligns with the Helm chart configuration. Please see the new `variables.tf` file and update accordingly.
    - `cloudwatch_configuration.log_group_name` changed to `cloudwatch_configuration.logGroupName`
    - `cloudwatch_configuration.log_stream_prefix` changed to `cloudwatch_configuration.logStreamPrefix`
    - `firehose_configuration.delivery_stream_name` changed to `firehose_configuration.deliveryStream`
    - `kinesis_configuration.stream_name` changed to `kinesis_configuration.stream`


</div>


### [v0.72.5](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.72.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/14/2025 | Modules affected: eks-aws-auth-merger | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.72.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fix Doc redirects



</div>


### [v0.72.4](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.72.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/12/2025 | Modules affected: eks-alb-ingress-controller-iam-policy | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.72.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

-  Update README.adoc
- Add more policy to accommodate a aws-load-balancer-controller update



</div>



## terraform-aws-monitoring


### [v0.36.29](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.36.29)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/10/2025 | Modules affected: agents | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.36.29">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Update documentation.



</div>



## terraform-aws-security


### [v0.75.10](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.75.10)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/20/2025 | Modules affected: aws-config-bucket, aws-config-multi-region | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.75.10">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Updated aws-config-multi-region to fix tests and sync codegen templates





</div>


### [v0.75.9](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.75.9)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/14/2025 | Modules affected: fail2ban | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.75.9">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Enable fail2ban support for Amazon Linux 2023





</div>


### [v0.75.8](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.75.8)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/12/2025 | Modules affected: gitlab-pipelines-iam-role, gitlab-pipelines-openid-connect-provider | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.75.8">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- `gitlab-pipelines-iam-role` **(NEW)**
- `gitlab-pipelines-openid-connect-provider` **(NEW)**



- Added Gitlab Pipelines IAM and OIDC provider modules



- https://github.com/gruntwork-io/terraform-aws-security/pull/851


</div>


### [v0.75.7](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.75.7)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/10/2025 | Modules affected: auto-update, aws-config-multi-region, aws-config-rules, aws-config | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.75.7">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Update documentation (no functional changes).



</div>



## terraform-aws-service-catalog


### [v0.118.19](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.118.19)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/20/2025 | Modules affected: base, data-stores, landingzone, mgmt | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.118.19">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Update terraform-aws-security version to v0.75.10





</div>


### [v0.118.18](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.118.18)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/19/2025 | Modules affected: data-stores | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.118.18">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- add timeout parameters to data-stores/rds



</div>


### [v0.118.17](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.118.17)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/14/2025 | Modules affected: base | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.118.17">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- base/ec2-baseline: Update terraform-aws-security module for improved AL2023 support


</div>


### [v0.118.16](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.118.16)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/14/2025 | Modules affected: base, data-stores | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.118.16">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- Doc redirects fixed.
- bubble up storage parameters from data-storage/rds





</div>


### [v0.118.15](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.118.15)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/7/2025 | Modules affected: services | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.118.15">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Allowed defining extra CNAMEs/aliases to CloudFront distribution


</div>


### [v0.118.14](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.118.14)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/7/2025 | Modules affected: data-stores, mgmt | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.118.14">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Added replication filter support for ECR Repos.
- Added Tailscale Module V2 that supports Exit Node Configuration and all Tailscale flags.


</div>



## terraform-aws-static-assets


### [v0.20.2](https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.20.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/13/2025 | Modules affected: s3-static-website | <a href="https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.20.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Changed hardcoded arns to partitions



</div>


### [v0.20.1](https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.20.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/12/2025 | Modules affected: cloudfront, s3-static-website | <a href="https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.20.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Added gRPC configuration and vpc origin for CFront Distribution
- Added Cloudfront + APIGW example
- Changed static block to dynamic blocks
- Doc redirects fixed.
- Fixed OAC apply bug



</div>



## terraform-aws-vpc


### [v0.28.3](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.28.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/21/2025 | Modules affected: vpc-app | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.28.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Added option to pass DHCP option set id



</div>


### [v0.28.2](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.28.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/6/2025 | Modules affected: vpc-app | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.28.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- SME-2583: Added default names to S3/DynamoDB endpoints created in vpc-app


</div>

<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "releases",
  "hash": "18b6630414155ef6bf84e60c5e2870dc"
}
##DOCS-SOURCER-END -->

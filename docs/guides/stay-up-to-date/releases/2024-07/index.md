
# Gruntwork release 2024-07

<p style={{marginTop: "-25px"}}><small><a href="/guides">Guides</a> / <a href="/guides/stay-up-to-date">Update Guides</a> / <a href="/guides/stay-up-to-date/releases">Releases</a> / 2024-07</small></p>

This page is lists all the updates to the [Gruntwork Infrastructure as Code
Library](https://gruntwork.io/infrastructure-as-code-library/) that were released in 2024-07. For instructions
on how to use these updates in your code, check out the [updating
documentation](/library/stay-up-to-date/updating).

Here are the repos that were updated:

- [patcher-cli](#patcher-cli)
- [pipelines-actions](#pipelines-actions)
- [pipelines-cli](#pipelines-cli)
- [pipelines-workflows](#pipelines-workflows)
- [terraform-aws-architecture-catalog](#terraform-aws-architecture-catalog)
- [terraform-aws-cis-service-catalog](#terraform-aws-cis-service-catalog)
- [terraform-aws-control-tower](#terraform-aws-control-tower)
- [terraform-aws-data-storage](#terraform-aws-data-storage)
- [terraform-aws-ecs](#terraform-aws-ecs)
- [terraform-aws-eks](#terraform-aws-eks)
- [terraform-aws-monitoring](#terraform-aws-monitoring)
- [terraform-aws-service-catalog](#terraform-aws-service-catalog)
- [terrapatch-cli](#terrapatch-cli)


## patcher-cli


### [v0.9.0](https://github.com/gruntwork-io/patcher-cli/releases/tag/v0.9.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/2/2024 | <a href="https://github.com/gruntwork-io/patcher-cli/releases/tag/v0.9.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  This is the next major release of Patcher, which has features designed to support the next version of our promotion workflows.


⭐  Patcher now supports publishing the results of an upgrade as a GitHub Pull Request. ⭐ 


The `update` command now supports three additional flags:

* `--publish`: Publish the changes to the remote Git repository and open a pull request.
* `--pr-branch`: The branch to create.
* `--pr-title`: The pull request&apos;s title.

You can publish the result of an upgrade like this:

```sh
patcher update --non-interactive --update-strategy next-breaking --publish --pr-title &quot;Update Dependencies&quot; --pr-branch &quot;patcher-update-deps&quot;
```

Patcher will perform the upgrade as usual, check out a new Git branch, commit the changes, push them to GitHub, and open a pull request.

The following environment variables must be configured when using the `--publish` flag:

* `GIT_AUTHOR_NAME`: The Git Author Name. e.g: `Patcher CI`.
* `GIT_AUTHOR_EMAIL`: The Git Author Email. e.g: `patcher@gruntwork.io`.
 
**Note:** You can only use the publish features when using the `update` command in non-interactive mode.


Patcher now supports Upgrade Plan and Spec files, which make upgrades more deterministic. Previously, a new dependency version could be released while Patcher was upgrading separate accounts (e.g., &apos; dev` and `stage`). Patcher would correctly promote the change to the next environment, e.g., dev -&gt; stage, but it didn&apos;t guarantee the exact version was used.

Here is an overview of each type.

An upgrade plan contains detailed information on all discovered dependencies, their current versions, and available updates. It also contains information about matched files and patterns used for discovery. When you use an upgrade plan with the `update` command, Patcher will skip resolving dependencies and use the metadata encoded in the plan. You can write an upgrade plan to a file by using the `report` command with the `--output-flag` flag:

```sh
patcher report --output-plan plan.json
cat plan.json | jq &quot;.&quot;
```

**Note**: We’ve omitted the contents for brevity.

While an upgrade plan comprehensively represents the current state and all possible updates, an upgrade spec is a simplified, target-orientated representation of the desired end state after an upgrade. It is used to promote consistent upgrades across different environments, even if dependency usages are located in different files.

Here’s the contents of an example spec file:

```json
&#x7B;
  &quot;IncludeDirPattern&quot;: &quot;&#x7B;*dev*&#x7D;/**&quot;,
  &quot;ExcludeDirPattern&quot;: &quot;&quot;,
  &quot;Dependencies&quot;: [
    &#x7B;
      &quot;ID&quot;: &quot;gruntwork-io/terraform-aws-cis-service-catalog/landingzone/account-baseline-app&quot;,
      &quot;Org&quot;: &quot;gruntwork-io&quot;,
      &quot;Repo&quot;: &quot;terraform-aws-cis-service-catalog&quot;,
      &quot;Module&quot;: &quot;landingzone/account-baseline-app&quot;,
      &quot;Constraints&quot;: null,
      &quot;TargetSafeVersion&quot;: null,
      &quot;TargetBreakingVersion&quot;: &quot;0.41.0&quot;
    &#x7D;,
    &#x7B;
      &quot;ID&quot;: &quot;gruntwork-io/terraform-aws-cis-service-catalog/networking/vpc&quot;,
      &quot;Org&quot;: &quot;gruntwork-io&quot;,
      &quot;Repo&quot;: &quot;terraform-aws-cis-service-catalog&quot;,
      &quot;Module&quot;: &quot;networking/vpc&quot;,
      &quot;Constraints&quot;: null,
      &quot;TargetSafeVersion&quot;: null,
      &quot;TargetBreakingVersion&quot;: &quot;0.41.0&quot;
    &#x7D;
  ]
&#x7D;
```

The `report` command has been changed to now show the upgrade spec by default.


The `report` command can now include or exclude directories used for discovery using double-star glob patterns. This feature can generate a report of outdated dependencies for select accounts. For example you might have a number of &quot;dev&quot; accounts in your `infrastructure-live` directory e.g: `team-alpha-dev-account` and `team-beta-dev-account`. Use the discovery filters to generate a report with dev accounts only:

```sh
patcher report --include-dirs &quot;*-dev-*/**&quot; test/fixtures/report/infrastructure-live-cis-large | jq &quot;.&quot;
```

Or generate a report on standalone accounts only.  e.g: `logs`, `security`, and `shared`:

```sh
patcher report --exclude-dirs &quot;&#x7B;_*,*-dev-*,*-stage-*,*-prod-*&#x7D;/**&quot; | jq &quot;.&quot;
```


Previously, the `apply` command was the only command that supported a dry-run mode when testing patches. Patcher can now simulate all operations when running the `update` command in non-interactive mode, which makes it especially useful for validating CI test workflows.

You can invoke the dry run mode by specifying the `--dry-run` flag:

```sh
patcher update --non-interactive --update-strategy next-breaking --dry-run
```


* Add the ability to include or exclude report command dependencies.
* Add support for outputting plan and spec files.
* Add support for publishing pull requests using the `update` command.
* Add support for a global dry-run mode to simulate operations.
* Change the `report` command to output upgrade specifications.
* Bump upstream dependencies.

**Full Changelog**: https://github.com/gruntwork-io/patcher-cli/compare/v0.8.4...v0.9.0


</div>



## pipelines-actions


### [v1.9.0](https://github.com/gruntwork-io/pipelines-actions/releases/tag/v1.9.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/26/2024 | <a href="https://github.com/gruntwork-io/pipelines-actions/releases/tag/v1.9.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * fix: read tf versions from config by @gruntwork-ci in https://github.com/gruntwork-io/pipelines-actions/pull/50
* fix: shell default expansion by @ZachGoldberg in https://github.com/gruntwork-io/pipelines-actions/pull/53
* feat: pass through new params for customizing delegated repos by @ZachGoldberg in https://github.com/gruntwork-io/pipelines-actions/pull/52
* Chore: more flexible mise config read regex by @ZachGoldberg in https://github.com/gruntwork-io/pipelines-actions/pull/51
* DEV-427 - Support for force unlock workflow by @ZachGoldberg in https://github.com/gruntwork-io/pipelines-actions/pull/54
* Add comment when infrastructures changes are not detected by @oredavids in https://github.com/gruntwork-io/pipelines-actions/pull/56
* DEV-159: Fix idempotency in creating access control PRs by @ZachGoldberg in https://github.com/gruntwork-io/pipelines-actions/pull/59
* Dev-441 fix empty bootstrap by @odgrim in https://github.com/gruntwork-io/pipelines-actions/pull/58
* Add extra logging if SKIP_TERRAGRUNT is set by @ZachGoldberg in https://github.com/gruntwork-io/pipelines-actions/pull/60
* DEV-129: Add additional pipelines preflight checks by @ZachGoldberg in https://github.com/gruntwork-io/pipelines-actions/pull/57

* @odgrim made their first contribution in https://github.com/gruntwork-io/pipelines-actions/pull/58

**Full Changelog**: https://github.com/gruntwork-io/pipelines-actions/compare/v1.8.0...v1.9.0

</div>


### [v1.8.0](https://github.com/gruntwork-io/pipelines-actions/releases/tag/v1.8.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/16/2024 | <a href="https://github.com/gruntwork-io/pipelines-actions/releases/tag/v1.8.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * New catalog tags value passthrough for account factory by @ZachGoldberg in https://github.com/gruntwork-io/pipelines-actions/pull/48
* feat: Using updated `pipelines config repository` instead of `pipelines config pipelines` by @yhakbar in https://github.com/gruntwork-io/pipelines-actions/pull/49


**Full Changelog**: https://github.com/gruntwork-io/pipelines-actions/compare/v1.7.1...v1.8.0

</div>


### [v1.7.1](https://github.com/gruntwork-io/pipelines-actions/releases/tag/v1.7.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/16/2024 | <a href="https://github.com/gruntwork-io/pipelines-actions/releases/tag/v1.7.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Bugfix - Default arch_catalog_repo_url had a typo.

**Full Changelog**: https://github.com/gruntwork-io/pipelines-actions/compare/v1.7.0...v1.7.1

</div>


### [v1.7.0](https://github.com/gruntwork-io/pipelines-actions/releases/tag/v1.7.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/15/2024 | <a href="https://github.com/gruntwork-io/pipelines-actions/releases/tag/v1.7.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Fixes for provisioning delegated repositories.
* Removal of unnecessary `Plan Summary` section on comments for applies.

**Full Changelog**: https://github.com/gruntwork-io/pipelines-actions/compare/v1.6.1...v1.7.0

</div>


### [v1.6.1](https://github.com/gruntwork-io/pipelines-actions/releases/tag/v1.6.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/10/2024 | <a href="https://github.com/gruntwork-io/pipelines-actions/releases/tag/v1.6.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * New flag to disable provisioning accounts by @ZachGoldberg in https://github.com/gruntwork-io/pipelines-actions/pull/40
* Use github event name to determine pipelines event type by @oredavids in https://github.com/gruntwork-io/pipelines-actions/pull/38
* fix: Hide `.` working directory by @yhakbar in https://github.com/gruntwork-io/pipelines-actions/pull/42


**Full Changelog**: https://github.com/gruntwork-io/pipelines-actions/compare/v1.6.0...v1.6.1

</div>


### [v1.6.0](https://github.com/gruntwork-io/pipelines-actions/releases/tag/v1.6.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/9/2024 | <a href="https://github.com/gruntwork-io/pipelines-actions/releases/tag/v1.6.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Update bootstrap action to use binary for deploy branch config by @oredavids in https://github.com/gruntwork-io/pipelines-actions/pull/36
* DEV-376: Pass through VPC inputs for baseline customization by @ZachGoldberg in https://github.com/gruntwork-io/pipelines-actions/pull/41
* fix: Adding default for `tf_binary` by @yhakbar in https://github.com/gruntwork-io/pipelines-actions/pull/39


**Full Changelog**: https://github.com/gruntwork-io/pipelines-actions/compare/v1.5.0...v1.6.0

</div>


### [v1.5.0](https://github.com/gruntwork-io/pipelines-actions/releases/tag/v1.5.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/8/2024 | <a href="https://github.com/gruntwork-io/pipelines-actions/releases/tag/v1.5.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
This version of pipelines-actions introduces a new architecture for how we manage state for updating comments with the results of plans/applies.  The prior architecture included a central mutex to &quot;lock&quot; a state file to ensure that state was consistent across multiple parallel-jobs. The issue with the mutex is locking and unlocking was slow, and with many jobs in parallel (20+) could introduce severe delays to overall pipelines runs.  The updated architecture uploads a distinct artifact per job, which then gets aggregated when updating the comment.  This removes the need for any central locking and results in a ~20s speedup for small pipelines runs, and a dramatic speedup for large jobs.

* Remove the Mutex around posting comments, replace with alternative synchronization strategy by @ZachGoldberg in https://github.com/gruntwork-io/pipelines-actions/pull/24
* fix: dev-364: use deploy branch name everywhere by @ZachGoldberg in https://github.com/gruntwork-io/pipelines-actions/pull/34
* Fix: Don&apos;t break if we don&apos;t have a valid merged pr url by @ZachGoldberg in https://github.com/gruntwork-io/pipelines-actions/pull/35
* fix: Set default deploy branch name to `main` when not defined by @yhakbar in https://github.com/gruntwork-io/pipelines-actions/pull/37


**Full Changelog**: https://github.com/gruntwork-io/pipelines-actions/compare/v1.4.0...v1.5.0

</div>


### [v1.4.0](https://github.com/gruntwork-io/pipelines-actions/releases/tag/v1.4.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/2/2024 | <a href="https://github.com/gruntwork-io/pipelines-actions/releases/tag/v1.4.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * feat: plumb through arch catalog configs by @ZachGoldberg in https://github.com/gruntwork-io/pipelines-actions/pull/28
* Extract Pipelines install logic into composite action by @oredavids in https://github.com/gruntwork-io/pipelines-actions/pull/29
* feat: move gruntwork context to pipelines root from baseline child account by @ZachGoldberg in https://github.com/gruntwork-io/pipelines-actions/pull/30
* feat: add pr outputs for delegated repo vending step by @ZachGoldberg in https://github.com/gruntwork-io/pipelines-actions/pull/31
* Use the default GH_TOKEN for posting step-summary after account provisioning instead of infra root to align with how we do other comments (DEV-356) by @ZachGoldberg in https://github.com/gruntwork-io/pipelines-actions/pull/32
* Custom Action Stubs by @ZachGoldberg in https://github.com/gruntwork-io/pipelines-actions/pull/33


**Full Changelog**: https://github.com/gruntwork-io/pipelines-actions/compare/v1.3.4...v1.4.0

</div>



## pipelines-cli


### [v0.23.1](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.23.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/31/2024 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.23.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Fix accidental stdout output by @Resonance1584 in https://github.com/gruntwork-io/pipelines/pull/220


**Full Changelog**: https://github.com/gruntwork-io/pipelines/compare/v0.23.0...v0.23.1


</div>


### [v0.23.0](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.23.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/31/2024 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.23.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * feat: Resolve Configurations Lazily by @yhakbar in https://github.com/gruntwork-io/pipelines/pull/213
* feat: Adding latest check by @yhakbar in https://github.com/gruntwork-io/pipelines/pull/217
* feat: Adding Linting by @yhakbar in https://github.com/gruntwork-io/pipelines/pull/219
* fix: Addressing #213 Review Feedback by @yhakbar in https://github.com/gruntwork-io/pipelines/pull/218
* DEV-227 Add segment SDK telemetry by @Resonance1584 in https://github.com/gruntwork-io/pipelines/pull/216


**Full Changelog**: https://github.com/gruntwork-io/pipelines/compare/v0.22.0...v0.23.0


</div>


### [v0.22.0](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.22.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/24/2024 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.22.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * fix: Check to see if parent terragrunt.hcl is at the root of the repository by @yhakbar in https://github.com/gruntwork-io/pipelines/pull/209
* DEV-421 - feat: Expand Automated Configuration Tests by @yhakbar in https://github.com/gruntwork-io/pipelines/pull/211
* feat: Hide annotations when they&apos;re empty by @yhakbar in https://github.com/gruntwork-io/pipelines/pull/212
* chore: Cleaning up helpers updates by @yhakbar in https://github.com/gruntwork-io/pipelines/pull/214
* Add sleep when rate limited on github search endpoint by @Resonance1584 in https://github.com/gruntwork-io/pipelines/pull/215


**Full Changelog**: https://github.com/gruntwork-io/pipelines/compare/v0.21.2...v0.22.0


</div>


### [v0.21.2](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.21.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/23/2024 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.21.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * feat: Enable Terragrunt debug mode when debug checkbox is set in GHA by @yhakbar in https://github.com/gruntwork-io/pipelines/pull/208


**Full Changelog**: https://github.com/gruntwork-io/pipelines/compare/v0.21.1...v0.21.2


</div>


### [v0.21.1](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.21.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/19/2024 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.21.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Log tweaks to improve readability @Resonance1584 in https://github.com/gruntwork-io/pipelines/pull/207


**Full Changelog**: https://github.com/gruntwork-io/pipelines/compare/v0.21.0...v0.21.1


</div>


### [v0.21.0](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.21.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/18/2024 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.21.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
The `aws_accounts` block has now become a nested configuration in the new `aws` block. The intention behind this change is to provide a more generic location for storage of AWS configurations.

While this is a breaking change, it is not currently in use by any customers in production.

* feat: Nest `accounts` into `aws` block by @yhakbar in https://github.com/gruntwork-io/pipelines/pull/206


**Full Changelog**: https://github.com/gruntwork-io/pipelines/compare/v0.20.0...v0.21.0


</div>


### [v0.20.0](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.20.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/16/2024 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.20.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * feat: Renaming `pipelines` configuration block to `repository` by @yhakbar in https://github.com/gruntwork-io/pipelines/pull/205


**Full Changelog**: https://github.com/gruntwork-io/pipelines/compare/v0.19.3...v0.20.0


</div>


### [v0.19.3](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.19.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/16/2024 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.19.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Reduce log noise by @Resonance1584 in https://github.com/gruntwork-io/pipelines/pull/204


**Full Changelog**: https://github.com/gruntwork-io/pipelines/compare/v0.19.2...v0.19.3


</div>


### [v0.19.2](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.19.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/16/2024 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.19.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * DEV-410 Make logs human readable, add github actions log grouping by @Resonance1584 in https://github.com/gruntwork-io/pipelines/pull/203


**Full Changelog**: https://github.com/gruntwork-io/pipelines/compare/v0.19.1...v0.19.2


</div>


### [v0.19.1](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.19.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/16/2024 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.19.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * fix: Correcting default attributes for the authentication block by @yhakbar in https://github.com/gruntwork-io/pipelines/pull/202


**Full Changelog**: https://github.com/gruntwork-io/pipelines/compare/v0.19.0...v0.19.1


</div>


### [v0.19.0](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.19.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/16/2024 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.19.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * feat: Renaming `plan_iam_role` and `apply_iam_role` to `plan_iam_role_arn` and `apply_iam_role_arn` respectively by @yhakbar in https://github.com/gruntwork-io/pipelines/pull/201


**Full Changelog**: https://github.com/gruntwork-io/pipelines/compare/v0.18.0...v0.19.0


</div>


### [v0.18.0](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.18.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/16/2024 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.18.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  The telemetry disclosure has been removed when running in CI. This warning was a valuable disclosure for some folks, but cluttered the logs and users didn&apos;t find it valuable to have the disclosure continuously emitted.

Addressing usage feedback, the following has changed in Pipelines HCL configurations:
- The `authentication_profile` block has been removed. Authentication configurations must now always be directly defined where authentication is specified.
- The `plan_iam_role` and `apply_iam_role` attributes now utilize fully qualified ARNs instead of just the role name.


* DEV-411 Remove telemetry log when running in CI by @Resonance1584 in https://github.com/gruntwork-io/pipelines/pull/199
* fix: Remediating drift from spec by @yhakbar in https://github.com/gruntwork-io/pipelines/pull/200


**Full Changelog**: https://github.com/gruntwork-io/pipelines/compare/v0.17.9...v0.18.0


</div>


### [v0.17.9](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.17.9)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/12/2024 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.17.9">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * fix: Adjusting build releases so that more information is communicated to `pipelines-cli` from this repo by @yhakbar in https://github.com/gruntwork-io/pipelines/pull/196


**Full Changelog**: https://github.com/gruntwork-io/pipelines/compare/v0.17.8...v0.17.9


</div>


### [v0.17.9-alpha](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.17.9-alpha)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/12/2024 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.17.9-alpha">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * fix: Adjusting build releases so that more information is communicated to `pipelines-cli` from this repo by @yhakbar in https://github.com/gruntwork-io/pipelines/pull/196


**Full Changelog**: https://github.com/gruntwork-io/pipelines/compare/v0.17.8...v0.17.9-alpha


</div>


### [v0.17.8](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.17.8)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/12/2024 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.17.8">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Release duplicated from https://github.com/gruntwork-io/pipelines/releases/tag/v0.17.8

</div>


### [v0.17.7](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.17.7)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/11/2024 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.17.7">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Release duplicated from https://github.com/gruntwork-io/pipelines/releases/tag/v0.17.7

</div>


### [v0.17.6-alpha](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.17.6-alpha)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/11/2024 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.17.6-alpha">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Release duplicated from https://github.com/gruntwork-io/pipelines/releases/tag/v0.17.6-alpha

</div>


### [v0.17.6](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.17.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/11/2024 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.17.6">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Release duplicated from https://github.com/gruntwork-io/pipelines/releases/tag/v0.17.6

</div>


### [v0.17.5](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.17.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/10/2024 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.17.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Release duplicated from https://github.com/gruntwork-io/pipelines/releases/tag/v0.17.5

</div>


### [v0.17.4](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.17.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/10/2024 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.17.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Release duplicated from https://github.com/gruntwork-io/pipelines/releases/tag/v0.17.4

</div>


### [v0.17.3](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.17.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/10/2024 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.17.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Release duplicated from https://github.com/gruntwork-io/pipelines/releases/tag/v0.17.3

</div>


### [v0.17.2](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.17.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/10/2024 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.17.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Release duplicated from https://github.com/gruntwork-io/pipelines/releases/tag/v0.17.2

</div>


### [v0.17.1](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.17.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/10/2024 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.17.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Release duplicated from https://github.com/gruntwork-io/pipelines/releases/tag/v0.17.1

</div>


### [v0.17.0](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.17.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/9/2024 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.17.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Release duplicated from https://github.com/gruntwork-io/pipelines/releases/tag/v0.17.0

</div>


### [v0.16.1](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.16.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/9/2024 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.16.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Release duplicated from https://github.com/gruntwork-io/pipelines/releases/tag/v0.16.1

</div>


### [v0.16.0](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.16.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/8/2024 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.16.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Release duplicated from https://github.com/gruntwork-io/pipelines/releases/tag/v0.16.0

</div>


### [v0.15.1-alpha2](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.15.1-alpha2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/3/2024 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.15.1-alpha2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Release duplicated from https://github.com/gruntwork-io/pipelines/releases/tag/v0.15.1-alpha2

</div>


### [v0.15.1-alpha](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.15.1-alpha)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/3/2024 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.15.1-alpha">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Release duplicated from https://github.com/gruntwork-io/pipelines/releases/tag/v0.15.1-alpha

</div>


### [v0.15.1](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.15.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/3/2024 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.15.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Release duplicated from https://github.com/gruntwork-io/pipelines/releases/tag/v0.15.1

</div>


### [v0.15.0](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.15.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/3/2024 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.15.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Release duplicated from https://github.com/gruntwork-io/pipelines/releases/tag/v0.15.0

</div>


### [v0.14.0](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.14.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/2/2024 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.14.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Release duplicated from https://github.com/gruntwork-io/pipelines/releases/tag/v0.14.0

</div>



## pipelines-workflows


### [v2](https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/2/2024 | <a href="https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  This is a floating release tracking the latest release with major version `2`.

</div>


### [v2.5.0](https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v2.5.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/30/2024 | <a href="https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v2.5.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * DEV-427 - Unlock State Workflow by @ZachGoldberg in https://github.com/gruntwork-io/pipelines-workflows/pull/64
* chore: Bumping `pipelines` to `v0.21.2` by @yhakbar in https://github.com/gruntwork-io/pipelines-workflows/pull/65
* DEV-129: Add additional pipelines preflight checks by @ZachGoldberg in https://github.com/gruntwork-io/pipelines-workflows/pull/67
* Fix action reference in account bootstrap job&apos;s name by @oredavids in https://github.com/gruntwork-io/pipelines-workflows/pull/70
* Bump to version v1.9.0 of pipelines-actions which brings in complementary changes for the above new features (unlocking and preflight) as well as a handful of bug fixes - https://github.com/gruntwork-io/pipelines-actions/releases/tag/v1.9.0

**Full Changelog**: https://github.com/gruntwork-io/pipelines-workflows/compare/v2...v2.5.0

</div>


### [v2.4.0](https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v2.4.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/19/2024 | <a href="https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v2.4.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  This pulls in a change to Pipelines HCL Configuration as Code system to segment the `aws_accounts` block into an `accounts` block nested as the `aws` block.

While this is a breaking change, it is not in use by any customers at the moment, and should be safe to use without modification.

* chore: Bumping `pipelines` and `pipelines-actions` versions by @yhakbar in https://github.com/gruntwork-io/pipelines-workflows/pull/63


**Full Changelog**: https://github.com/gruntwork-io/pipelines-workflows/compare/v2.3.3...v2.4.0

</div>


### [v2.3.3](https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v2.3.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/16/2024 | <a href="https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v2.3.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
This pulls in a rename of the `pipelines` HCL configuration block for Pipelines to `repository` via updates to the `pipelines-cli`.

In addition, it pulls in changes to `pipelines-actions` which result in a new `CATALOG_TAGS` value being used during repository vending. This allows for central management of AWS cost allocation tags for delegated repositories.

Some plumbing changes have been done in addition to improve the configurability of the `TF_BINARY` configuration, making it easier to decide whether you want to use OpenTofu or Terraform.

* feat: Bumping `pipelines-cli` to `v0.20.0` and `pipelines-actions` to `v1.8.0` by @yhakbar in https://github.com/gruntwork-io/pipelines-workflows/pull/62


**Full Changelog**: https://github.com/gruntwork-io/pipelines-workflows/compare/v2...v2.3.3

</div>


### [v2.3.2](https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v2.3.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/16/2024 | <a href="https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v2.3.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
* Include bugfix version of pipelines actions https://github.com/gruntwork-io/pipelines-actions/releases/tag/v1.7.1

**Full Changelog**: https://github.com/gruntwork-io/pipelines-workflows/compare/v2...v2.3.2

</div>


### [v2.3.1](https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v2.3.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/16/2024 | <a href="https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v2.3.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * chore: Bumping `pipelines-cli` to `v0.19.1` by @yhakbar in https://github.com/gruntwork-io/pipelines-workflows/pull/61


**Full Changelog**: https://github.com/gruntwork-io/pipelines-workflows/compare/v2.3.0...v2.3.1

</div>


### [v2.3.0](https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v2.3.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/16/2024 | <a href="https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v2.3.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * feat: Adding `pipelines.yml` workflow by @yhakbar in https://github.com/gruntwork-io/pipelines-workflows/pull/51
* chore: Bumping `pipelines-cli` to `v0.19.0` by @yhakbar in https://github.com/gruntwork-io/pipelines-workflows/pull/60
* chore: Bumping `pipelines-actions` to `v1.7.0` by @yhakbar in https://github.com/gruntwork-io/pipelines-workflows/pull/59


**Full Changelog**: https://github.com/gruntwork-io/pipelines-workflows/compare/v2.2.1...v2.3.0

</div>


### [v2.2.1](https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v2.2.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/8/2024 | <a href="https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v2.2.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Bump to version [v1.5.0 of pipelines actions](https://github.com/gruntwork-io/pipelines-actions/releases/tag/v1.5.0) which includes an updated commenting strategy that should be much faster for all users.
* Fix delegated workflow&apos;s bootstrap reference by @oredavids in https://github.com/gruntwork-io/pipelines-workflows/pull/48

* @oredavids made their first contribution in https://github.com/gruntwork-io/pipelines-workflows/pull/48

**Full Changelog**: https://github.com/gruntwork-io/pipelines-workflows/compare/v2...v2.2.0

</div>


### [v2.1.0](https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v2.1.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/3/2024 | <a href="https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v2.1.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
Take special note of the changes in https://github.com/gruntwork-io/pipelines-workflows/pull/45. It introduces significant changes to how Pipelines workflows operate, and should be evaluated carefully when considering an upgrade to this release.

In particular, https://github.com/gruntwork-io/pipelines-workflows/pull/45 changes the behavior of the EnvCommonChanged job. Pipelines Orchestrate will no longer emit a single job for each AWS account, looking for relevant updates to an _envcommon file that has changed. Instead, a single job will be emitted from the root of the repository that will look for changes throughout the repository. This change leverages the new capabilities released as of [v2.0.0](https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v2.0.0) where Terragrunt will dynamically assume the correct role in a given directory through integration with Pipelines.

* fix: Adjusting delegated workflow so that it uses dynamic authentication too by @yhakbar in https://github.com/gruntwork-io/pipelines-workflows/pull/44
* feat: Bumping Pipelines CLI to `v0.15.1` by @yhakbar in https://github.com/gruntwork-io/pipelines-workflows/pull/45
* chore: Pin actions version by @yhakbar in https://github.com/gruntwork-io/pipelines-workflows/pull/46


**Full Changelog**: https://github.com/gruntwork-io/pipelines-workflows/compare/v1.6.0...v2.1.0

</div>


### [v2.0.0](https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v2.0.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/2/2024 | <a href="https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v2.0.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
This release introduces the concept of &quot;hooks&quot; in `pipelines-root.yml` as a mechanism to customize the account factory workflows.  The intention is that consumers will fork `pipelines-workflows`, add a step to checkout their own actions repository (or their own fork of `pipelines-actions`), and then change the &quot;uses&quot; block in the pre/post steps to point to their customized workflows.  

We&apos;re actively trying to balance providing a highly extensible mechanism for users to adapt pipelines to their needs, whilst also maintaining upgrade-ability down the line. We hope that by encouraging customizations to live in separate actions that future updates to `pipelines-root.yml` will not cause significant merge conflicts, and that updates to `pipelines-actions` can continue to be pulled in via a version bump, even in a highly customized environment.


This release includes a breaking change requiring that a minimum version of `v0.59.5` for Terragrunt is used in CI.

This is due to the fact that Pipelines now integrates with the newly available [dynamic authentication capabilities in Terragrunt](https://github.com/gruntwork-io/terragrunt/releases/tag/v0.59.5).

For most, this entails making an update to the `.mise.toml` file in the root of the repository where Pipelines runs.

While this is the minimum version required, take note of the bug fix introduced in [v0.59.7](https://github.com/gruntwork-io/terragrunt/releases/tag/v0.59.7). If you are using the `get_aws_account_id` function in your Terragrunt configurations, you are advised to upgrade to this version to incorporate that bug fix.

For Pipelines users that allowlist specific actions, version 2.0 includes the following new actions
* ./pipelines-actions/.github/custom-actions/pre-provision-new-account
* ./pipelines-actions/.github/custom-actions/post-provision-new-account
* ./pipelines-actions/.github/custom-actions/pre-baseline-core-accounts
* ./pipelines-actions/.github/custom-actions/post-baseline-core-accounts
* ./pipelines-actions/.github/custom-actions/pre-baseline-child-account
* ./pipelines-actions/.github/custom-actions/post-baseline-child-account
* ./pipelines-actions/.github/custom-actions/post-create-delegated-repo


* Use pipelines auth for terragrunt execute by @Resonance1584 in https://github.com/gruntwork-io/pipelines-workflows/pull/37
* chore: add bootstrap to root, make bootstrap step id consistent by @ZachGoldberg in https://github.com/gruntwork-io/pipelines-workflows/pull/41
* Fix missed rename by @Resonance1584 in https://github.com/gruntwork-io/pipelines-workflows/pull/42
* Customization Hooks by @ZachGoldberg in https://github.com/gruntwork-io/pipelines-workflows/pull/40
* fix: Moving yml configurations for custom actions to an `action.yml` nested under the action name by @yhakbar in https://github.com/gruntwork-io/pipelines-workflows/pull/43

**Full Changelog**: https://github.com/gruntwork-io/pipelines-workflows/compare/v1...v2.0.0

</div>



## terraform-aws-architecture-catalog


### [v2.10.0](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.10.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/26/2024 | <a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.10.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * DEV-427 - Unlock workflows for Pipelines by @ZachGoldberg in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1112
* feat: Removing kebabcase usage by @yhakbar in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1114


**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-architecture-catalog/compare/v2.9.1...v2.10.0

</div>


### [v2.9.1](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.9.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/19/2024 | <a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.9.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * chore: add new config values to pipelines docs by @ZachGoldberg in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1111
* fix: Adjusting `config.yml` per user feedback by @yhakbar in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1113


**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-architecture-catalog/compare/v2.9.0...v2.9.1

</div>


### [v2.9.0](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.9.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/17/2024 | <a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.9.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Support Customizing Vended PIPELINES_READ_TOKEN and Workflow Locations by @ZachGoldberg in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1110


**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-architecture-catalog/compare/v2.8.0...v2.9.0

</div>


### [v2.8.0](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.8.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/17/2024 | <a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.8.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Catalog template defaults by @ZachGoldberg in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1108
* feat: allow importing tags from a central catalog by @ZachGoldberg in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1105


**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-architecture-catalog/compare/v2.7.0...v2.8.0

</div>


### [v2.7.0](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.7.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/16/2024 | <a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.7.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * chore: bump base TG versions by @ZachGoldberg in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1106
* Fix: Use template variables for delegated repo mise.toml files by @ZachGoldberg in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1107


**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-architecture-catalog/compare/v2.6.1...v2.7.0

</div>


### [v2.6.1](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.6.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/13/2024 | <a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.6.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * feat: pass through the correct environment variable by @ZachGoldberg in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1103
* DEV-389 - Allow passing full URLs for module repos by @ZachGoldberg in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1104


**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-architecture-catalog/compare/v2.6.0...v2.6.1

</div>


### [v2.6.0](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.6.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/12/2024 | <a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.6.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * fix: add permission to describe vpcs since its in the default delegated template by @ZachGoldberg in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1102
* fix: add source to delegated roles by @ZachGoldberg in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1101
* Update updated version of the pipelines workflows by @oredavids in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1097


**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-architecture-catalog/compare/v2.5.0...v2.6.0

</div>


### [v2.5.0](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.5.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/11/2024 | <a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.5.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * chore: Bumping terragrunt version in infra-live-root template by @yhakbar in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1095
* Update ACCOUNT-VENDING.md by @ZachGoldberg in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1064
* feat: Removing unused `workflow_dispatch` event sources from `pipelines.yml` files by @yhakbar in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1096
* feat: add environment for enterprise customers by @ZachGoldberg in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1098
* add region to default config by @ZachGoldberg in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1099


**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-architecture-catalog/compare/v2.4.0...v2.5.0

</div>


### [v2.4.0](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.4.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/2/2024 | <a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.4.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * fix: Bumping TG and OpenTofu versions by @yhakbar in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1094


**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-architecture-catalog/compare/v2.3.7...v2.4.0

</div>



## terraform-aws-cis-service-catalog


### [v0.52.1](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.52.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/16/2024 | Modules affected: data-stores/rds | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.52.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- Bump rds module


</div>



## terraform-aws-control-tower


### [v0.7.10](https://github.com/gruntwork-io/terraform-aws-control-tower/releases/tag/v0.7.10)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/31/2024 | Modules affected: landingzone | <a href="https://github.com/gruntwork-io/terraform-aws-control-tower/releases/tag/v0.7.10">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Add module to create Landing Zone via IaC





</div>


### [v0.7.9](https://github.com/gruntwork-io/terraform-aws-control-tower/releases/tag/v0.7.9)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/30/2024 | Modules affected: landingzone | <a href="https://github.com/gruntwork-io/terraform-aws-control-tower/releases/tag/v0.7.9">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - force quote account_id as it no longer is coming out as a string. This fixes account vends where account_id&apos;s start with a 0



</div>


### [v0.7.8](https://github.com/gruntwork-io/terraform-aws-control-tower/releases/tag/v0.7.8)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/15/2024 | Modules affected: landingzone | <a href="https://github.com/gruntwork-io/terraform-aws-control-tower/releases/tag/v0.7.8">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- feat: Propagate `guardduty_findings_kms_key_service_principals`



</div>


### [v0.7.7](https://github.com/gruntwork-io/terraform-aws-control-tower/releases/tag/v0.7.7)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/12/2024 | Modules affected: aws-sso | <a href="https://github.com/gruntwork-io/terraform-aws-control-tower/releases/tag/v0.7.7">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Doc only change- fix sso docs, add 2 examples



</div>



## terraform-aws-data-storage


### [v0.38.0](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.38.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/1/2024 | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.38.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * SME-788 - delete note that we don&apos;t support Redshift Serverless by @odgrim in https://github.com/gruntwork-io/terraform-aws-data-storage/pull/479
* Enhance multiple auth block on RDS Proxy by @james03160927 in https://github.com/gruntwork-io/terraform-aws-data-storage/pull/480

* @odgrim made their first contribution in https://github.com/gruntwork-io/terraform-aws-data-storage/pull/479

**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-data-storage/compare/v0.37.3...v0.38.0

</div>



## terraform-aws-ecs


### [v0.38.1](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.38.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/23/2024 | Modules affected: ecs-daemon-service, ecs-service, ecs-cluster | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.38.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Added support for `managed_draining` variable recently added to the `aws_ecs_capacity_provider` resource
- Cleanup of terrascan and dependabot 



</div>



## terraform-aws-eks


### [v0.67.8](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.67.8)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/24/2024 | Modules affected: eks-k8s-karpenter, eks-cluster-managed-workers | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.67.8">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Bump AWS Provider Min Version for Karpenter Module
- Allow configuring the ami source






</div>


### [v0.67.7](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.67.7)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/15/2024 | Modules affected: eks-cluster-control-plane, eks-container-logs | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.67.7">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Update VPC CNI example to use EKS Addons
- Bump up base monitoring module on eks-container-logs



</div>



## terraform-aws-monitoring


### [v0.36.21](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.36.21)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/8/2024 | Modules affected: logs | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.36.21">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- Added missing PutRetentionPolicy



</div>



## terraform-aws-service-catalog


### [v0.112.19](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.112.19)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/23/2024 | Modules affected: data-stores | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.112.19">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- data-stores/rds: fix module variable optional attrs for backwards compatibility with Terraform &lt; 1.2





</div>


### [v0.112.18](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.112.18)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/15/2024 | Modules affected: services/ecs-service | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.112.18">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- `ecs-service`: Update _lb_listener_rules_ module fix a missing _authenticate_cognito_ attribute 



</div>


### [v0.112.17](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.112.17)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/12/2024 | Modules affected: data-stores/ecr-repos | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.112.17">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- ECR cross account access ecr:ListTagsForResource



</div>


### [v0.112.16](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.112.16)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/9/2024 | Modules affected: landingzone | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.112.16">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - feat: Propagate `kms_key_service_principals`




</div>


### [v0.112.15](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.112.15)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/3/2024 | Modules affected: data-stores | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.112.15">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- SME-1100 Fix RDS and Aurora managed pw functionality



</div>



## terrapatch-cli


### [v0.1.6](https://github.com/gruntwork-io/terrapatch-cli/releases/tag/v0.1.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/2/2024 | <a href="https://github.com/gruntwork-io/terrapatch-cli/releases/tag/v0.1.6">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Bumped internal dependencies and fixed CI workflows


</div>




<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "releases",
  "hash": "fbce45517e35521b3826ff74bdec1a28"
}
##DOCS-SOURCER-END -->

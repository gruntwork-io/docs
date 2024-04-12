
# Gruntwork release 2024-03

<p style={{marginTop: "-25px"}}><small><a href="/guides">Guides</a> / <a href="/guides/stay-up-to-date">Update Guides</a> / <a href="/guides/stay-up-to-date/releases">Releases</a> / 2024-03</small></p>

This page is lists all the updates to the [Gruntwork Infrastructure as Code
Library](https://gruntwork.io/infrastructure-as-code-library/) that were released in 2024-03. For instructions
on how to use these updates in your code, check out the [updating
documentation](/library/stay-up-to-date/updating).

Here are the repos that were updated:

- [boilerplate](#boilerplate)
- [patcher-cli](#patcher-cli)
- [pipelines-cli](#pipelines-cli)
- [repo-copier](#repo-copier)
- [terraform-aws-architecture-catalog](#terraform-aws-architecture-catalog)
- [terraform-aws-asg](#terraform-aws-asg)
- [terraform-aws-cache](#terraform-aws-cache)
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


## boilerplate


### [v0.5.13](https://github.com/gruntwork-io/boilerplate/releases/tag/v0.5.13)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/27/2024 | <a href="https://github.com/gruntwork-io/boilerplate/releases/tag/v0.5.13">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Usage of new Apple binary signing tool by @denis256 in https://github.com/gruntwork-io/boilerplate/pull/175
* Improved binary/text file identification by @denis256 in https://github.com/gruntwork-io/boilerplate/pull/176


**Full Changelog**: https://github.com/gruntwork-io/boilerplate/compare/v0.5.12...v0.5.13

</div>


### [v0.5.12](https://github.com/gruntwork-io/boilerplate/releases/tag/v0.5.12)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/8/2024 | <a href="https://github.com/gruntwork-io/boilerplate/releases/tag/v0.5.12">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Improved text file identification to handle json files by @denis256 in https://github.com/gruntwork-io/boilerplate/pull/169


**Full Changelog**: https://github.com/gruntwork-io/boilerplate/compare/v0.5.11...v0.5.12

</div>


### [v0.5.11](https://github.com/gruntwork-io/boilerplate/releases/tag/v0.5.11)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/5/2024 | <a href="https://github.com/gruntwork-io/boilerplate/releases/tag/v0.5.11">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Add OpenTofu module examples for blog posts by @brikis98 in https://github.com/gruntwork-io/boilerplate/pull/163
* Add announcement blog post to README by @brikis98 in https://github.com/gruntwork-io/boilerplate/pull/165
* Boilerplate windows support by @denis256 in https://github.com/gruntwork-io/boilerplate/pull/164


**Full Changelog**: https://github.com/gruntwork-io/boilerplate/compare/v0.5.10...v0.5.11

</div>



## patcher-cli


### [v0.5.2](https://github.com/gruntwork-io/patcher-cli/releases/tag/v0.5.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/6/2024 | <a href="https://github.com/gruntwork-io/patcher-cli/releases/tag/v0.5.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
This release includes the following improvements:

*  Bumped terragrunt Go module to `v0.55.11` in order to work around some bugs.

</div>


### [v0.5.1](https://github.com/gruntwork-io/patcher-cli/releases/tag/v0.5.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/1/2024 | <a href="https://github.com/gruntwork-io/patcher-cli/releases/tag/v0.5.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
This release includes the following improvements:
- The `--target` flag now accepts a version parameter to pin versions e.g: `patcher update --target some/module/name@v0.1.0`.
  -  you can also supply constraints. e.g: `patcher update --target some/module/name@^v0.1.0`
- The `report` command now only works non-interactively.
- Fixed a bug where Patcher would occasionally fail to discover and apply patches.
- Numerous security fixes from upstream libraries (docker, containerd, buildkit and xcrypto)

</div>



## pipelines-cli


### [v0.6.2](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.6.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/26/2024 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.6.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Release duplicated from https://github.com/gruntwork-io/pipelines/releases/tag/v0.6.2

</div>


### [v0.6.1](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.6.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/26/2024 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.6.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Release duplicated from https://github.com/gruntwork-io/pipelines/releases/tag/v0.6.1

</div>


### [v0.6.1-alpha](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.6.1-alpha)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/19/2024 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.6.1-alpha">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Release duplicated from https://github.com/gruntwork-io/pipelines/releases/tag/v0.6.1-alpha

</div>


### [v0.6.0-alpha](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.6.0-alpha)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/19/2024 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.6.0-alpha">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Release duplicated from https://github.com/gruntwork-io/pipelines/releases/tag/v0.6.0-alpha

</div>


### [v0.5.8](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.5.8)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/1/2024 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.5.8">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Release duplicated from https://github.com/gruntwork-io/pipelines/releases/tag/v0.5.8

</div>


### [v0.5.7](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.5.7)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/1/2024 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.5.7">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Release duplicated from https://github.com/gruntwork-io/pipelines/releases/tag/v0.5.7

</div>



## repo-copier


### [v0.5.4](https://github.com/gruntwork-io/repo-copier/releases/tag/v0.5.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/14/2024 | <a href="https://github.com/gruntwork-io/repo-copier/releases/tag/v0.5.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
* Fix reverting commits  by @levkohimins in https://github.com/gruntwork-io/repo-copier/pull/260

**Full Changelog**: https://github.com/gruntwork-io/repo-copier/compare/v0.5.3...v0.5.4


During the first and subsequent incremental copying, `repo-copier`, reverts its previous _&quot;Resolve references&quot;_ commit and then creates a new merge commit, with updates from the `gruntwork` repository (original), with commit name _&quot;Merge branch &apos;main&apos; of ....&quot;_.
The issue was that `repo-copier` reverted not only _&quot;Resolve references&quot;_, but also its own _&quot;Merge branch &apos;main&apos; of ....&quot;_ made in the previous copy, in other words, it rolled back the updates made in the previous copy.
The logic is that commits that exist in the copied repository and are not in the original repository are considered third-party. Since the merge commit itself _&quot;Merge branch &apos;main&apos; of ....&quot;_ is a commit with a new hash about which nothing is known in the original repository, it was considered third-party, and therefore was reverted. 
The fix is that during the comparison we need to take into account not only the hash of the commit itself, but also if it is a merge commit, retrieve the hash of the commit that was merged with. Thus, when `repo-copier` tries to determine whether the _&quot;Merge branch &apos;main&apos; of ....&quot;_ commit is ours or foreign, it also compares its parent hashes,  then it determines that the parent hash belongs to original repository commit, so this is our commit (changes) and it doesn&apos;t need to be reverted.


While this fix will ensure that subsequent updates work correctly, unfortunately `repo-copier` is not able to undo those incorrect reverts made when was running `repo-copier` with that issue. Therefore, in cases of using `v0.5.3` release, after switching to this release, customers need to overwrite all repositories once, to do this, you need to run `repo-copier` with the `--force-overwrite` flag.




</div>



## terraform-aws-architecture-catalog


### [v2.0.12](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.0.12)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/28/2024 | <a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.0.12">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Removed `RequestingTeamName` input variable from `devops-foundations-infrastructure-live` template by @oredavids in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1037


**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-architecture-catalog/compare/v2.0.11...v2.0.12

</div>


### [v2.0.11](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.0.11)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/26/2024 | <a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.0.11">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
This release introduces a couple changes that significantly alter how the architecture catalog works with respect to the templates for vended accounts.

1. The account vending process now supports delegated `infrastructure-live` repositories. These are repositories that are granted limited control over a subset of the total AWS accounts managed within a central `infrastructure-live` repository. These delegated repositories currently include the following:
  a. SDLC repositories: These are repositories that control the Software Delivery Lifecycle (dev/stage/prod) for particular teams. The baselines for the relevant accounts are still managed within the main `infrastructure-live` repository, but the application workloads can now be managed by `infrastructure-live-&lt;TEAM NAME&gt;` repositories that only have control over their particular workloads.
  b. Sandbox repositories: These are repositories that are vended by the main `infrastructure-live` repository and are the same as the SDLC repositories with the exception that they only have one account.
2. IAM roles used for CI within `infrastructure-pipelines` have been renamed to better reflect the limits of their capabilities and to introduce a new set of roles that are assumed exclusively by `infrastructure-pipelines` when configuration updates are made in delegated repos.
3. A new set of IAM roles called `pipelines-pre-auth` roles have been added as a control mechanism for authorizing requests made to the `infrastructure-pipelines` repository from `infrastructure-live` repositories. This is done by the controls documented [here](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/tree/main/templates/infra-pipelines-base#confirming-calling-repo).
4. Automatically looking up Control Tower provisioning artifact ID instead of requiring it to be passed as input. 
5. Added check to ensure that `infrastructure-live` repos do not dispatch workflows to `infrastructure-pipelines` if they are behind `main` to ensure the integrity of `pipelines-execute` actions.


1. Added retries for intermittent errors that can be encountered when using Control Tower modules for provisioning Macie resources.
2. Increased default timeout for Control Tower.
3. Added retries for state locks to ensure that concurrent attempts to make the same state update wait instead of immediately failing.
4. Added logic to ensure that state resources are provisioned prior to attempts to make updates in new accounts.

* Adding `dependabot.yml` file to all `.github` directories in this repo, which will help keep github actions up to date. by @yhakbar in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/964
* Multi Account Vending Workflows by @arsci in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/927
* Pulling in updates from live implementation by @yhakbar in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/973
* Pulling in updates from live implementation by @yhakbar in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/974
* Post template instantiation updates by @yhakbar in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/975
* Making VPC optional in account baselining for team accounts by @yhakbar in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/976
* Adding `VPCCreated` input to template in addition to the component by @yhakbar in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/977
* Upgrading pipelines CLI to `v0.5.1` for new live team repos by @yhakbar in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/979
* Granting `write` permissions to `pull-requests` in pipelines.yml by @yhakbar in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/981
* Adding `region.hcl` file to `baseline-resources` to ensure the file shows up when vended for team repos by @yhakbar in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/980
* Renaming `AwsRegion` to `DefaultRegion` in `baseline-resources` by @yhakbar in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/982
* Pulling in updates by @yhakbar in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/983
* Fixing `pipelines-pre-auth-role` template output by @yhakbar in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/984
* Fixing org used in source for `terraform-aws-security` by @yhakbar in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/985
* Bumping all references of `terraform-aws-security` to `v0.70.2` by @yhakbar in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/986
* Adding `-R` check to get requesting pr number by @yhakbar in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/987
* Update control tower version used in single account factory by @oredavids in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/988
* Updating DevOps Foundations by @yhakbar in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/989
* Adding `VpcModuleVersion` input to `terraform-aws-control-tower` `boilerplate-single-account-baseline` template usage by @yhakbar in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/991
* Add team roles to infra-live&apos;s envcommon by @oredavids in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/990
* Fix variable reference by @oredavids in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/992
* Bumping pipelines-dispatch to `4.0.6` by @yhakbar in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/993
* Bumping boilerplate version to `v0.5.10` by @yhakbar in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/995
* Removing transit gateway logic from SDLC account vending by @yhakbar in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/996
* Pulling in updates to add account deletion logic by @yhakbar in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/997
* Use updated versions of pipelines, terragrunt and terraform by @oredavids in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/999
* Bumping `terraform-aws-control-tower` module version to `v0.4.4` in all references by @yhakbar in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1001
* Adding catalog config by @yhakbar in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1002
* Update workflows to support configurable account-baselines by @oredavids in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1004
* Adding account level overrides for opt-ins by @yhakbar in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1005
* Pulling in fixes for ControlTower by @yhakbar in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1007
* Update request-quotas envcommon config by @oredavids in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1008
* Bump control tower module version by @oredavids in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1009
* Remove terraform block from account-baseline envcommon config by @oredavids in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1006
* Fix vpc-app-lookup usage by @brikis98 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1010
* Fixing `create_vpc` default logic by @yhakbar in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1011
* Add Patcher promotion workflows - pt 1 by @infraredgirl in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1013
* Add Patcher standalone workflow by @infraredgirl in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1015
* Add remaining Patcher workflows and README by @infraredgirl in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1017
* Adding updates to better align with CIS requirements by @yhakbar in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1019
* Update account vending docs by @oredavids in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1012
* Bumping all references to `terraform-aws-control-tower` modules to `v0.6.2` by @yhakbar in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1021
* Remove infraredgirl from CODEOWNERS by @infraredgirl in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1022
* Adjusting state bucket permissions by @yhakbar in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1023
* Adjusting more state bucket permissions by @yhakbar in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1024
* Fixing `terragrunt.hcl` files in management roles by @yhakbar in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1025
* Fix logs and security should not have state_bucket by @Resonance1584 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1026
* Bumping all references to `terraform-aws-control-tower` modules to `v0.6.3` by @yhakbar in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1027
* Fix logs account should use state_bucket_pattern by @Resonance1584 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1028
* Bump control tower modules version by @Resonance1584 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1029
* Ignoring docs in the standalone Patcher workflow by @yhakbar in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1030
* Escaping the backticks in the patcher workflow by using single quotes instead of double-quotes by @yhakbar in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1031
* Pulling in documentation for pre-auth by @yhakbar in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1034
* Fixing source url patterns by @yhakbar in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1032
* Removing state bucket pattern from the `_envcommon` folder as part of the `macie_buckets_to_analyze`, as it is not a valid bucket name, and that causes issues on vending by @yhakbar in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1035
* Setting `RepoBaseUrl` to `github.com/gruntwork-io` by default, as some customers won&apos;t be using repo copier by @yhakbar in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1036
* DEV-95 Add configurable catalog repositories by @Resonance1584 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1033
* Making Enterprise Functionality a Feature Flag by @yhakbar in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1020

* @Resonance1584 made their first contribution in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1026

**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-architecture-catalog/compare/v1.3.3...v2.0.11

</div>


### [v2.0.10-beta](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.0.10-beta)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/18/2024 | <a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.0.10-beta">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Removing state bucket pattern from the `_envcommon` folder as part of the `macie_buckets_to_analyze`, as it is not a valid bucket name, and that causes issues on vending by @yhakbar in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1035


**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-architecture-catalog/compare/v2.0.9-beta...v2.0.10-beta

</div>


### [v2.0.9-beta](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.0.9-beta)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/15/2024 | <a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.0.9-beta">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Fixing source url patterns by @yhakbar in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1032


**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-architecture-catalog/compare/v2.0.8-beta...v2.0.9-beta

</div>


### [v2.0.8-beta](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.0.8-beta)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/15/2024 | <a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.0.8-beta">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Pulling in documentation for pre-auth by @yhakbar in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1034


**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-architecture-catalog/compare/v2.0.7-alpha...v2.0.8-beta

</div>


### [v2.0.7-alpha](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.0.7-alpha)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/15/2024 | <a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.0.7-alpha">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Fix logs account should use state_bucket_pattern by @Resonance1584 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1028
* Bump control tower modules version by @Resonance1584 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1029
* Ignoring docs in the standalone Patcher workflow by @yhakbar in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1030
* Escaping the backticks in the patcher workflow by using single quotes instead of double-quotes by @yhakbar in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1031


**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-architecture-catalog/compare/v2.0.6-alpha...v2.0.7-alpha

</div>


### [v2.0.6-alpha](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.0.6-alpha)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/14/2024 | <a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.0.6-alpha">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Fix logs and security should not have state_bucket by @Resonance1584 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1026
* Bumping all references to `terraform-aws-control-tower` modules to `v0.6.3` by @yhakbar in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1027

* @Resonance1584 made their first contribution in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1026

**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-architecture-catalog/compare/v2.0.5-alpha...v2.0.6-alpha

</div>


### [v2.0.5-alpha](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.0.5-alpha)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/13/2024 | <a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.0.5-alpha">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Fixing `terragrunt.hcl` files in management roles by @yhakbar in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1025

**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-architecture-catalog/compare/v2.0.4-alpha...v2.0.5-alpha

</div>


### [v2.0.4-alpha](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.0.4-alpha)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/12/2024 | <a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.0.4-alpha">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
* Adjusting state bucket permissions by @yhakbar in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1023

**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-architecture-catalog/compare/v2.0.3-alpha...v2.0.4-alpha

</div>


### [v2.0.3-alpha](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.0.3-alpha)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/11/2024 | <a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.0.3-alpha">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Add Patcher standalone workflow by @infraredgirl in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1015
* Add remaining Patcher workflows and README by @infraredgirl in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1017
* Adding updates to better align with CIS requirements by @yhakbar in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1019
* Update account vending docs by @oredavids in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1012
* Bumping all references to `terraform-aws-control-tower` modules to `v0.6.2` by @yhakbar in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1021


**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-architecture-catalog/compare/v2.0.2-alpha...v2.0.3-alpha

</div>


### [v2.0.2-alpha](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.0.2-alpha)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/5/2024 | <a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.0.2-alpha">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Fixing `create_vpc` default logic by @yhakbar in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1011
* Add Patcher promotion workflows - pt 1 by @infraredgirl in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1013


**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-architecture-catalog/compare/v2.0.1-alpha...v2.0.2-alpha

</div>


### [v2.0.1-alpha](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.0.1-alpha)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/4/2024 | <a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.0.1-alpha">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Fix vpc-app-lookup usage by @brikis98 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1010


**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-architecture-catalog/compare/v2.0.0-beta...v2.0.1-beta

</div>



## terraform-aws-asg


### [v0.21.13](https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.21.13)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/23/2024 | Modules affected: server-group | <a href="https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.21.13">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- `server-group`


- `server-group`: Add option to configure self-assume for IAM Role


- https://github.com/gruntwork-io/terraform-aws-asg/pull/209


</div>



## terraform-aws-cache


### [v0.22.2](https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v0.22.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/26/2024 | <a href="https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v0.22.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Fix upgrade-tests (CI Module) - [CORE-1384] by @arsci in https://github.com/gruntwork-io/terraform-aws-cache/pull/136
* [skip-ci] Update CODEOWNERS by @ellisonc in https://github.com/gruntwork-io/terraform-aws-cache/pull/137
* Add Terrascan to CI - CORE-1371 by @arsci in https://github.com/gruntwork-io/terraform-aws-cache/pull/138
* Update README insturction for Redis Module for Cluster Disabled mode by @hongil0316 in https://github.com/gruntwork-io/terraform-aws-cache/pull/142
* allow defining group externally by @hongil0316 in https://github.com/gruntwork-io/terraform-aws-cache/pull/143

* @ellisonc made their first contribution in https://github.com/gruntwork-io/terraform-aws-cache/pull/137

**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-cache/compare/v0.22.1...v0.22.2

</div>



## terraform-aws-ci


### [v0.53.4](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.53.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/26/2024 | Modules affected: jenkins-server | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.53.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Add flag to Jenkins server module to allow IAM role self assume


</div>


### [v0.53.3](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.53.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/22/2024 | Modules affected: sign-binary-helpers | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.53.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Switch to maintained bearer/gon MacOS signer version


</div>


### [v0.53.2](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.53.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/21/2024 | Modules affected: sign-binary-helpers | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.53.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Updated gon version to 0.2.5


</div>



## terraform-aws-cis-service-catalog


### [v0.50.1](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.50.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/12/2024 | Modules affected: networking/vpc | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.50.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- `networking/vpc`


- `networking/vpc`: add support for configuring ACLs and rules for transit subnets


- https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/pull/595


</div>


### [v0.50.0](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.50.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/3/2024 | Modules affected: networking | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.50.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Enhancement vpc customization features



</div>


### [v0.49.3](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.49.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/1/2024 | Modules affected: networking | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.49.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- exposed blackhole_network_interface_private_ips



</div>



## terraform-aws-control-tower


### [v0.7.2](https://github.com/gruntwork-io/terraform-aws-control-tower/releases/tag/v0.7.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/26/2024 | Modules affected: control-tower-app-account-baseline | <a href="https://github.com/gruntwork-io/terraform-aws-control-tower/releases/tag/v0.7.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- `control-tower-app-account-baseline`


- DEV-140 Propagate GuardDuty Inputs


- https://github.com/gruntwork-io/terraform-aws-control-tower/pull/74

</div>


### [v0.7.1](https://github.com/gruntwork-io/terraform-aws-control-tower/releases/tag/v0.7.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/25/2024 | Modules affected: landingzone/control-tower-app-account-baseline, landingzone/control-tower-security-account-baseline | <a href="https://github.com/gruntwork-io/terraform-aws-control-tower/releases/tag/v0.7.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- `landingzone/control-tower-app-account-baseline`
- `landingzone/control-tower-security-account-baseline`


- DEV-140 Propagate GuardDuty Inputs


- https://github.com/gruntwork-io/terraform-aws-control-tower/pull/73

</div>


### [v0.7.0](https://github.com/gruntwork-io/terraform-aws-control-tower/releases/tag/v0.7.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/14/2024 | <a href="https://github.com/gruntwork-io/terraform-aws-control-tower/releases/tag/v0.7.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- `landingzone/boilerplate-single-account-baseline`


- Adjusted the `state_bucket` local to be a `state_bucket_pattern` instead with a wildcard for the region.


- https://github.com/gruntwork-io/terraform-aws-control-tower/pull/69




</div>


### [v0.6.5](https://github.com/gruntwork-io/terraform-aws-control-tower/releases/tag/v0.6.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/14/2024 | <a href="https://github.com/gruntwork-io/terraform-aws-control-tower/releases/tag/v0.6.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Adjusting the `state_bucket` local to be a `state_bucket_pattern` instead with a wildcard for the region. by @yhakbar in https://github.com/gruntwork-io/terraform-aws-control-tower/pull/69


**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-control-tower/compare/v0.6.4...v0.6.5

</div>


### [v0.6.4](https://github.com/gruntwork-io/terraform-aws-control-tower/releases/tag/v0.6.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/14/2024 | Modules affected: landingzone/control-tower-account-factory | <a href="https://github.com/gruntwork-io/terraform-aws-control-tower/releases/tag/v0.6.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- `landingzone/control-tower-account-factory`


- Added docs to address `ResourceInUseException` issue that can be encountered with Service Catalog


- https://github.com/gruntwork-io/terraform-aws-control-tower/pull/70


</div>


### [v0.6.3](https://github.com/gruntwork-io/terraform-aws-control-tower/releases/tag/v0.6.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/14/2024 | Modules affected: landingzone/control-tower-app-account-baseline, landingzone/control-tower-security-account-baseline | <a href="https://github.com/gruntwork-io/terraform-aws-control-tower/releases/tag/v0.6.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- `landingzone/control-tower-app-account-baseline`
- `landingzone/control-tower-security-account-baseline`


- Added requisite Config rule to ensure that the `revoke_unused_iam_credentials` works


- https://github.com/gruntwork-io/terraform-aws-control-tower/pull/71



</div>


### [v0.6.2](https://github.com/gruntwork-io/terraform-aws-control-tower/releases/tag/v0.6.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/8/2024 | Modules affected: landingzone | <a href="https://github.com/gruntwork-io/terraform-aws-control-tower/releases/tag/v0.6.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- `landingzone`


- Added `revoke_unused_iam_credentials` module to baselines


- https://github.com/gruntwork-io/terraform-aws-control-tower/pull/68


</div>


### [v0.6.1](https://github.com/gruntwork-io/terraform-aws-control-tower/releases/tag/v0.6.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/6/2024 | Modules affected: landingzone | <a href="https://github.com/gruntwork-io/terraform-aws-control-tower/releases/tag/v0.6.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- `landingzone`


- Bumped `account-baseline-security` module to `v0.110.1`


- https://github.com/gruntwork-io/terraform-aws-control-tower/pull/67


</div>


### [v0.6.0](https://github.com/gruntwork-io/terraform-aws-control-tower/releases/tag/v0.6.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/4/2024 | Modules affected: landingzone/control-tower-account-factory, landingzone/control-tower-multi-account-factory | <a href="https://github.com/gruntwork-io/terraform-aws-control-tower/releases/tag/v0.6.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- `landingzone/control-tower-account-factory`
- `landingzone/control-tower-multi-account-factory`


Added new `discover_ous_recursively` variable that allows organizational units (OUs) to be discovered recursively from the organization root. Prior to this update, OUs had to be defined in a flat structure to be supported by these modules, as the [organizations_organizational_units](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/data-sources/organizations_organizational_units) data source only supports listing organizations in a flat OU structure.

To support this change, the discovery of OUs was moved from the `landingzone/control-tower-account-factory` to the `landingzone/control-tower-multi-account-factory` to reduce the number of times that OUs are queried. As a consequence, a breaking change was introduced to require an `ous` variable to be passed into the `landingzone/control-tower-account-factory`.

This requirement may be removed in a future release (see https://github.com/gruntwork-io/terraform-aws-control-tower/pull/66), but it will be required in order to use the module as is (to lookup an organization by name alone, without the corresponding ID).


If you are currently using `landingzone/control-tower-account-factory` via `landingzone/control-tower-multi-account-factory`, no changes are necessary to support this update.

The breaking change is transparently integrated into the `landingzone/control-tower-multi-account-factory` module. If you are using the `landingzone/control-tower-account-factory` directly, a list of OUs will have to be provided directly.

How to do so can be found by following the usage [here](https://github.com/gruntwork-io/terraform-aws-control-tower/blob/main/modules/landingzone/control-tower-multi-account-factory/main.tf#L33).


- https://github.com/gruntwork-io/terraform-aws-control-tower/pull/65

</div>


### [v0.5.5](https://github.com/gruntwork-io/terraform-aws-control-tower/releases/tag/v0.5.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/1/2024 | Modules affected: landingzone/control-tower-app-account-baseline, landingzone/control-tower-security-account-baseline | <a href="https://github.com/gruntwork-io/terraform-aws-control-tower/releases/tag/v0.5.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- `landingzone/control-tower-app-account-baseline`
- `landingzone/control-tower-security-account-baseline`


- Add ability specify additional GuardDuty findings S3 bucket policies


- https://github.com/gruntwork-io/terraform-aws-control-tower/pull/64


</div>



## terraform-aws-data-storage


### [v0.34](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.34)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/21/2024 | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.34">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * feat: support rds proxy security group modification by @colwynlegitscript in https://github.com/gruntwork-io/terraform-aws-data-storage/pull/457
* feat: rds proxy support for db secret kms key decryption by @colwynlegitscript in https://github.com/gruntwork-io/terraform-aws-data-storage/pull/458

* @colwynlegitscript made their first contribution in https://github.com/gruntwork-io/terraform-aws-data-storage/pull/457

**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-data-storage/compare/v0.33...v0.34

</div>


### [v0.33](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.33)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/20/2024 | Modules affected: rds, rds-proxy, org-backup-policy, efs | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.33">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * rds
* rds-proxy
* org-backup-policy
* efs
* redshift

* refactor(rds): remove unused local variables by @hongil0316 in https://github.com/gruntwork-io/terraform-aws-data-storage/pull/415
* Add support for provisioning RDS Custom instances by @arengifo-lbx in https://github.com/gruntwork-io/terraform-aws-data-storage/pull/409
* Support aurora for RDX proxy module by @hongil0316 in https://github.com/gruntwork-io/terraform-aws-data-storage/pull/414
* Add support for Aurora in DMS resource by @hongil0316 in https://github.com/gruntwork-io/terraform-aws-data-storage/pull/416
* Add a test script to create default subnet group for testing purpose by @hongil0316 in https://github.com/gruntwork-io/terraform-aws-data-storage/pull/420
* Implement an example module that demonstrate using same KMS key cross-region replica by @hongil0316 in https://github.com/gruntwork-io/terraform-aws-data-storage/pull/421
* Fix remaining unit tests to use the test db subnet group by @hongil0316 in https://github.com/gruntwork-io/terraform-aws-data-storage/pull/423
* Upgrade golang version by @hongil0316 in https://github.com/gruntwork-io/terraform-aws-data-storage/pull/429
* Support blue/green deployment for RDS by @hongil0316 in https://github.com/gruntwork-io/terraform-aws-data-storage/pull/427
* Rdx proxy unit test fix by @hongil0316 in https://github.com/gruntwork-io/terraform-aws-data-storage/pull/426
* Update maria DB version to supported version for testing by @hongil0316 in https://github.com/gruntwork-io/terraform-aws-data-storage/pull/436
* Update &amp; Improve the instruction for deployment for RDS by @hongil0316 in https://github.com/gruntwork-io/terraform-aws-data-storage/pull/438
* honor lock setting backup vault by @hongil0316 in https://github.com/gruntwork-io/terraform-aws-data-storage/pull/435
* Fixing Redshift Unit Test - Create Subnet Group for Redshift Example Module by @hongil0316 in https://github.com/gruntwork-io/terraform-aws-data-storage/pull/434
* Create Test Parameter Group for Testing by @hongil0316 in https://github.com/gruntwork-io/terraform-aws-data-storage/pull/433
* Instruction for standby deployment for RDS module by @hongil0316 in https://github.com/gruntwork-io/terraform-aws-data-storage/pull/439
* wait for backup vault ot be successfully created by @hongil0316 in https://github.com/gruntwork-io/terraform-aws-data-storage/pull/441
* Change test db parameter group name to contain gruntwork-test prefix to configure cloud-nuke from skipping by @hongil0316 in https://github.com/gruntwork-io/terraform-aws-data-storage/pull/442
* Implement org-level backup policy module by @hongil0316 in https://github.com/gruntwork-io/terraform-aws-data-storage/pull/444
* Disable us-west regions from unit testing due to quota issue by @hongil0316 in https://github.com/gruntwork-io/terraform-aws-data-storage/pull/447
* fixing RdsProxy unit test - retry when proses exiit 1 but unexpected error by @hongil0316 in https://github.com/gruntwork-io/terraform-aws-data-storage/pull/451
* Add gruntwork-test prefix to use proper db parameter group by @hongil0316 in https://github.com/gruntwork-io/terraform-aws-data-storage/pull/450
* Efs enhancement by @hongil0316 in https://github.com/gruntwork-io/terraform-aws-data-storage/pull/460
* Redshift with snapshot by @hongil0316 in https://github.com/gruntwork-io/terraform-aws-data-storage/pull/459

* @arengifo-lbx made their first contribution in https://github.com/gruntwork-io/terraform-aws-data-storage/pull/409

**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-data-storage/compare/v0.32...v0.33

</div>



## terraform-aws-ecs


### [v0.35.16](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.35.16)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/15/2024 | Modules affected: ecs-service | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.35.16">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * ecs-service

* Add support for SRV records + simple service_discovery module for easier testing by @hongil0316 in https://github.com/gruntwork-io/terraform-aws-ecs/pull/421
* add firelens example by @hongil0316 in https://github.com/gruntwork-io/terraform-aws-ecs/pull/424
* Test for simple example by @hongil0316 in https://github.com/gruntwork-io/terraform-aws-ecs/pull/426
* add instance refresh by @hongil0316 in https://github.com/gruntwork-io/terraform-aws-ecs/pull/431


**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-ecs/compare/v0.35.15...v0.35.16

</div>



## terraform-aws-eks


### [v0.66.0](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.66.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/12/2024 | Modules affected: eks-k8s-karpenter | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.66.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- **[BACKWARD INCOMPATIBLE]** Upgrade `eks-k8s-karpenter` modules to support Karpenter `v0.32.7`



</div>


### [v0.65.7](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.65.7)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/12/2024 | Modules affected: eks-alb-ingress-controller | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.65.7">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Allow setting defaults_tags for alb-ingress-controller



</div>


### [v0.65.6](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.65.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/5/2024 | Modules affected: eks-cluster-control-plane, eks-k8s-karpenter | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.65.6">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Bugifx: Update Karpenter variable type from bool to string
- Bugfix: Remove SG cleanup for eks control plane


</div>



## terraform-aws-monitoring


### [v0.36.16](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.36.16)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/21/2024 | Modules affected: logs | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.36.16">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Address syslog module failures with Amazon Linux 2023


</div>


### [v0.36.15](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.36.15)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/12/2024 | Modules affected: alarms | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.36.15">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- route53-health-check-alarms: fix bug with CALCULATED, CLOUDWATCH_METRIC, and RECOVERY_CONTROL




</div>


### [v0.36.14](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.36.14)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/1/2024 | Modules affected: agents | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.36.14">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- cloudwatch-agent: fix config bug to support Ubuntu 22.04




</div>



## terraform-aws-security


### [v0.71.5](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.71.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/25/2024 | Modules affected: guardduty-bucket, guardduty-multi-region, guardduty | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.71.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- `guardduty-bucket`
- `guardduty-multi-region`
- `guardduty`


- SME-223 Pre-create GuardDuty findings prefix


- https://github.com/gruntwork-io/terraform-aws-security/pull/816

</div>


### [v0.71.4](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.71.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/21/2024 | Modules affected: auto-update, fail2ban | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.71.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Add AL2023 support to auto-update module (dnf), remove AL2023 support from fail2ban


</div>


### [v0.71.3](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.71.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/6/2024 | Modules affected: guardduty-bucket | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.71.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- `guardduty-bucket`


- Passed through `force_destroy` to GuardDuty bucket configuration


- https://github.com/gruntwork-io/terraform-aws-security/pull/811


</div>


### [v0.71.2](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.71.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/1/2024 | Modules affected: guardduty, guardduty-bucket | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.71.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Revert Pin Terraform version transitive for SNS topic in guardduty
- Allow additional bucket policies for GuardDuty findings S3 bucket


</div>



## terraform-aws-service-catalog


### [v0.111.3](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.111.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/27/2024 | Modules affected: services | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.111.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- services/lambda: expose architecture variable for aws lambda functions



</div>


### [v0.111.2](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.111.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/26/2024 | Modules affected: account-baseline-app | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.111.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- `account-baseline-app`


- Added `guardduty_admin_account_id` input to the `account-baseline-app` module


- https://github.com/gruntwork-io/terraform-aws-service-catalog/pull/2064

</div>


### [v0.111.1](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.111.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/25/2024 | Modules affected: landingzone/account-baseline-app, landingzone/account-baseline-root, landingzone/account-baseline-security | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.111.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- `landingzone/account-baseline-app`
- `landingzone/account-baseline-root`
- `landingzone/account-baseline-security`


- SME-219 Propagate GuardDuty inputs


- https://github.com/gruntwork-io/terraform-aws-service-catalog/pull/2062

</div>


### [v0.111.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.111.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/22/2024 | Modules affected: networking, services/eks-* | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.111.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- **BACKWARD INCOMPATIBLE CHANGES!!** 
    - Updated terraform-aws-eks to v0.66.0
    - Updated `eks-karpenter` default version to `v0.32.7` which has significant API changes (breaking changes)
    - Please review the following upgrade guides prior to updating to this version of the Service Catalog!! 
        - [Gruntwork Karpenter Upgrade Guide](https://github.com/gruntwork-io/terraform-aws-eks/blob/master/modules/eks-k8s-karpenter/karpenter-upgrade-guide.md)
        - [Official Karpenter Docs Upgrade Guide](https://karpenter.sh/v0.32/upgrading/upgrade-guide/)
        - [Official Karpenter v1beta1 Migration Guide](https://karpenter.sh/v0.32/upgrading/v1beta1-migration/) 



</div>


### [v0.110.5](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.110.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/15/2024 | Modules affected: services/lambda | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.110.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- `services/lambda`


- Expose `treat_missing_data` variable for lambda-alarms 


Special thanks to the following users for their contribution!

- @joshiste


- https://github.com/gruntwork-io/terraform-aws-service-catalog/pull/2040


</div>


### [v0.110.4](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.110.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/13/2024 | Modules affected: services | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.110.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Add detailed monitoring option (var) to modules/services/ec2-instance





</div>


### [v0.110.3](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.110.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/13/2024 | Modules affected: mgmt, networking, services | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.110.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Update terraform-aws-eks to v0.65.7
    - Expose Karpenter instance profile arn output
    - Expose input.* and extraInputs for Fluent Bit
    - Expose alb-ingress-controller IAM Role Arn
    - Bugfix: Update Karpenter variable type from bool to string
    - Bugfix: Remove SG cleanup for eks control plane
    - Allow setting defaults_tags for alb-ingress-controller



</div>


### [v0.110.2](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.110.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/7/2024 | Modules affected: services/ec2-instance, networking/vpc | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.110.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Add input variable for root volume encryption
- Ability to configure VPC transit subnet ACLs


</div>


### [v0.110.1](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.110.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/6/2024 | Modules affected: landingzone | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.110.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- `landingzone`


- Bumped `guardduty-bucket` to `v0.71.3`


- https://github.com/gruntwork-io/terraform-aws-service-catalog/pull/2050

</div>


### [v0.110.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.110.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/3/2024 | Modules affected: networking | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.110.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- consistency for variable type and validation



</div>


### [v0.109.7](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.109.7)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/3/2024 | Modules affected: networking | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.109.7">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- added natgw private IP customization
- Enhancement_vpc_customization_features



</div>


### [v0.109.6](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.109.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/1/2024 | Modules affected: landingzone | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.109.6">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- Ability to add additional bucket policy statements to GuardDuty findings bucket


</div>



## terraform-aws-static-assets


### [v0.18.2](https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.18.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/19/2024 | Modules affected: s3-cloudfront | <a href="https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.18.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- s3-cloudfront: allow setting a custom cache_policy_id for default_cache_behaviour





</div>



## terraform-aws-vpc


### [v0.26.22](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.26.22)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/7/2024 | Modules affected: vpc-app-network-acls | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.26.22">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- `vpc-app-network-acls`


- Add transit subnet ACLs


- https://github.com/gruntwork-io/terraform-aws-vpc/pull/385


</div>


### [v0.26.21](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.26.21)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/4/2024 | Modules affected: vpc-app-lookup | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.26.21">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- carried over subnet tier naming from `vpc-app` module to `vpc-app-lookup` module



</div>


### [v0.26.20](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.26.20)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/2/2024 | Modules affected: vpc-app | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.26.20">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- enhancement\custom subnet naming
- Enhancement/VPC Endpoints for Transit subnets
- Enhancement/Boolean to disable the default route table routes



</div>


### [v0.26.19](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.26.19)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/1/2024 | Modules affected: vpc-app | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.26.19">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- enhancement/natgw assigned private IP address



</div>




<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "releases",
  "hash": "d6edb71e6f66c0cbaa07185c9d946843"
}
##DOCS-SOURCER-END -->

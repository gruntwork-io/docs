
# Gruntwork release 2024-04

<p style={{marginTop: "-25px"}}><small><a href="/guides">Guides</a> / <a href="/guides/stay-up-to-date">Update Guides</a> / <a href="/guides/stay-up-to-date/releases">Releases</a> / 2024-04</small></p>

This page is lists all the updates to the [Gruntwork Infrastructure as Code
Library](https://gruntwork.io/infrastructure-as-code-library/) that were released in 2024-04. For instructions
on how to use these updates in your code, check out the [updating
documentation](/library/stay-up-to-date/updating).

Here are the repos that were updated:

- [boilerplate](#boilerplate)
- [patcher-cli](#patcher-cli)
- [pipelines-cli](#pipelines-cli)
- [pipelines-workflows](#pipelines-workflows)
- [terraform-aws-architecture-catalog](#terraform-aws-architecture-catalog)
- [terraform-aws-asg](#terraform-aws-asg)
- [terraform-aws-cache](#terraform-aws-cache)
- [terraform-aws-ci](#terraform-aws-ci)
- [terraform-aws-cis-service-catalog](#terraform-aws-cis-service-catalog)
- [terraform-aws-control-tower](#terraform-aws-control-tower)
- [terraform-aws-data-storage](#terraform-aws-data-storage)
- [terraform-aws-ecs](#terraform-aws-ecs)
- [terraform-aws-eks](#terraform-aws-eks)
- [terraform-aws-lambda](#terraform-aws-lambda)
- [terraform-aws-load-balancer](#terraform-aws-load-balancer)
- [terraform-aws-monitoring](#terraform-aws-monitoring)
- [terraform-aws-openvpn](#terraform-aws-openvpn)
- [terraform-aws-security](#terraform-aws-security)
- [terraform-aws-server](#terraform-aws-server)
- [terraform-aws-service-catalog](#terraform-aws-service-catalog)
- [terraform-aws-static-assets](#terraform-aws-static-assets)
- [terraform-aws-utilities](#terraform-aws-utilities)
- [terraform-aws-vpc](#terraform-aws-vpc)
- [terrapatch-cli](#terrapatch-cli)


## boilerplate


### [v0.5.15](https://github.com/gruntwork-io/boilerplate/releases/tag/v0.5.15)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/24/2024 | <a href="https://github.com/gruntwork-io/boilerplate/releases/tag/v0.5.15">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Replaced tfenv with mise

**Full Changelog**: https://github.com/gruntwork-io/boilerplate/compare/v0.5.14...v0.5.15

</div>


### [v0.5.14](https://github.com/gruntwork-io/boilerplate/releases/tag/v0.5.14)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/23/2024 | <a href="https://github.com/gruntwork-io/boilerplate/releases/tag/v0.5.14">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * go-getter update to 1.7.4 by @denis256 in https://github.com/gruntwork-io/boilerplate/pull/178


**Full Changelog**: https://github.com/gruntwork-io/boilerplate/compare/v0.5.13...v0.5.14

</div>



## patcher-cli


### [v0.5.3](https://github.com/gruntwork-io/patcher-cli/releases/tag/v0.5.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/10/2024 | <a href="https://github.com/gruntwork-io/patcher-cli/releases/tag/v0.5.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
This release includes the following improvements:

* Upstream security updates and fixes.
* Performance improvements
* Fix bug when a dependency is already up to date in non-interactive mode (https://github.com/gruntwork-io/patcher-cli/issues/17)

</div>



## pipelines-cli


### [v0.9.3](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.9.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/23/2024 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.9.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Release duplicated from https://github.com/gruntwork-io/pipelines/releases/tag/v0.9.3

</div>


### [v0.9.2](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.9.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/23/2024 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.9.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Release duplicated from https://github.com/gruntwork-io/pipelines/releases/tag/v0.9.2

</div>


### [v0.9.1](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.9.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/23/2024 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.9.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Release duplicated from https://github.com/gruntwork-io/pipelines/releases/tag/v0.9.1

</div>


### [v0.9.0](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.9.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/23/2024 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.9.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Release duplicated from https://github.com/gruntwork-io/pipelines/releases/tag/v0.9.0

</div>


### [v0.8.0](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.8.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/19/2024 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.8.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Release duplicated from https://github.com/gruntwork-io/pipelines/releases/tag/v0.8.0

</div>


### [v0.7.0-alpha](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.7.0-alpha)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/9/2024 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.7.0-alpha">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Release duplicated from https://github.com/gruntwork-io/pipelines/releases/tag/v0.7.0-alpha

</div>


### [v0.7.0](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.7.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/16/2024 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.7.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Release duplicated from https://github.com/gruntwork-io/pipelines/releases/tag/v0.7.0

</div>


### [v0.6.3](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.6.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/4/2024 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.6.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Release duplicated from https://github.com/gruntwork-io/pipelines/releases/tag/v0.6.3

</div>



## pipelines-workflows


### [v0.0.5](https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v0.0.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/30/2024 | <a href="https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v0.0.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Version dump dependencies by @ZachGoldberg in https://github.com/gruntwork-io/pipelines-workflows/pull/3
* chore(deps): bump gruntwork-io/pipelines-provision-account-action from 0.0.3 to 0.0.4 by @dependabot in https://github.com/gruntwork-io/pipelines-workflows/pull/4
* AWS Execute Improvement by @ZachGoldberg in https://github.com/gruntwork-io/pipelines-workflows/pull/5

* @dependabot made their first contribution in https://github.com/gruntwork-io/pipelines-workflows/pull/4

**Full Changelog**: https://github.com/gruntwork-io/pipelines-workflows/compare/v0.0.4...v0.0.5

</div>


### [v0.0.4](https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v0.0.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/26/2024 | <a href="https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v0.0.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Bump versions of downstream actions

**Full Changelog**: https://github.com/gruntwork-io/pipelines-workflows/compare/v0.0.3...v0.0.4

</div>


### [v0.0.3](https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v0.0.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/26/2024 | <a href="https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v0.0.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * bump version of pipelines-aws-execute 

**Full Changelog**: https://github.com/gruntwork-io/pipelines-workflows/compare/v0.0.2...v0.0.3

</div>


### [v0.0.2](https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v0.0.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/26/2024 | <a href="https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v0.0.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Move pipelines CLI version into the workflow by @ZachGoldberg in https://github.com/gruntwork-io/pipelines-workflows/pull/1
* chore: Updating README.md by @yhakbar in https://github.com/gruntwork-io/pipelines-workflows/pull/2

* @ZachGoldberg made their first contribution in https://github.com/gruntwork-io/pipelines-workflows/pull/1
* @yhakbar made their first contribution in https://github.com/gruntwork-io/pipelines-workflows/pull/2

**Full Changelog**: https://github.com/gruntwork-io/pipelines-workflows/compare/v0.0.1...v0.0.2

</div>


### [v0.0.1](https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v0.0.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/26/2024 | <a href="https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v0.0.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  **Full Changelog**: https://github.com/gruntwork-io/pipelines-workflows/commits/v0.0.1

</div>



## terraform-aws-architecture-catalog


### [v2.1.8](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.1.8)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/29/2024 | <a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.1.8">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Bump TG Version of infra-live-root by @gruntwork-ci in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1063
* chore: Adding aws cli to `.mise.toml` by @yhakbar in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1062


**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-architecture-catalog/compare/v2.1.7...v2.1.8

</div>


### [v2.1.7](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.1.7)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/26/2024 | <a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.1.7">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * chore: update references to pipelines workflow files to public org by @ZachGoldberg in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1061


**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-architecture-catalog/compare/v2.1.6...v2.1.7

</div>


### [v2.1.6](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.1.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/25/2024 | <a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.1.6">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * chore: Adding README.md to `infrastructure-live-access-control` by @yhakbar in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1059
* chore: Adding more pipelines v3 documentation by @yhakbar in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1060


**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-architecture-catalog/compare/v2.1.5...v2.1.6

</div>


### [v2.1.5](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.1.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/19/2024 | <a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.1.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * fix: Adding `default-aws-region` to `devops-foundations-infrastrcutre-live-delegated-v3` by @yhakbar in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1058


**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-architecture-catalog/compare/v2.1.4...v2.1.5

</div>


### [v2.1.4](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.1.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/18/2024 | <a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.1.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * chore: Updating tf branding to reference OpenTofu by @yhakbar in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1054
* fix: Fixing token for `devops-foundations-infrastructure-live-access-control` template by @yhakbar in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1055
* fix: Adjusting `devops-foundations-infrastructure-live-access-control` `.gruntwork/config.yml` by @yhakbar in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1056


**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-architecture-catalog/compare/v2.1.3...v2.1.4

</div>


### [v2.1.3](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.1.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/18/2024 | <a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.1.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * fix: Bumping default versions of modules in the single account baseline by @yhakbar in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1053


**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-architecture-catalog/compare/v2.1.2...v2.1.3

</div>


### [v2.1.2](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.1.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/18/2024 | <a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.1.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * chore: Bumped arch catalog in config.yml in root template by @yhakbar in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1052
* fix: Adjusting `central-pipelines-plan` trust policy in `devops-foundations-infrastructure-live-root` template by @yhakbar in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1051
* fix: Escaping github workflow in template by @yhakbar in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1050
* fix: Fixing OU for Pre-prod selection in account factory inputs by @yhakbar in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1049


**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-architecture-catalog/compare/v2.1.1...v2.1.2

</div>


### [v2.1.1](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.1.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/18/2024 | <a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.1.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * feat: Adding `pipelines.yml` file to `devops-foundations-infrastructure-live-root` template by @yhakbar in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1048


**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-architecture-catalog/compare/v2.1.0...v2.1.1

</div>


### [v2.1.0](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.1.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/17/2024 | <a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.1.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * feat: Adding infra-live-root template by @yhakbar in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1047

Note that as part of this release, the `github-openid-connect-provider` service template has been pinned in the `devops-foundations-infrastructure-live` template:
https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1047/files#diff-396c4a4bb9c638ba47824719da3f958faecde74274c4fb98e34bb5d520b249b1

The reason this has been done is to ensure backwards compatibility for customers using the service template. 

Instructions for consciously migrating to the latest version of the module `github-openid-connect-provider` can be found here:
https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1047/files#diff-cdbe3386d835e64ce6cc00c03c8584038f59784d20473653ae1bd9f3d83eeda9R2-R8

**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-architecture-catalog/compare/v2.0.18...v2.1.0

</div>


### [v2.0.18](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.0.18)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/16/2024 | <a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.0.18">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * fix: Renaming token to `PIPELINES_READ_TOKEN` in `pipelines-delegated` by @yhakbar in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1046
* Removing `.gitignore` entry for `.terraform.lock.hcl` file by @yhakbar in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1003


**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-architecture-catalog/compare/v2.0.17...v2.0.18

</div>


### [v2.0.17](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.0.17)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/15/2024 | <a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.0.17">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * fix: Adjusting delegated v3 settings by @yhakbar in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1045


**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-architecture-catalog/compare/v2.0.16...v2.0.17

</div>


### [v2.0.16](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.0.16)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/12/2024 | <a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.0.16">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Templating bugfix by @ZachGoldberg in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1042
* fix: Adding `central-pipelines` roles to `single-account-baseline` by @yhakbar in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1044
* feat: Added access control templates by @yhakbar in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1043

* @ZachGoldberg made their first contribution in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1042

**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-architecture-catalog/compare/v2.0.15...v2.0.16

</div>


### [v2.0.15](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.0.15)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/10/2024 | <a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.0.15">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * feat: Adding v3 delegated live template by @yhakbar in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1041


**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-architecture-catalog/compare/v2.0.14...v2.0.15

</div>


### [v2.0.14](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.0.14)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/10/2024 | <a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.0.14">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * infra-live-root: rm requesting team by @iangrunt in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1040


**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-architecture-catalog/compare/v2.0.13...v2.0.14

</div>


### [v2.0.13](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.0.13)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/5/2024 | <a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.0.13">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Create v3 single account baseline by @oredavids in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1038


**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-architecture-catalog/compare/v2.0.12...v2.0.13

</div>



## terraform-aws-asg


### [v0.21.14](https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.21.14)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/2/2024 | Modules affected: server-group | <a href="https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.21.14">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- `server-group`


- Expose `max_session_duration` for server-group vended role


- https://github.com/gruntwork-io/terraform-aws-asg/pull/211



</div>


### [v0.21.15](https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.21.15)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/5/2024 | Modules affected: asg-rolling-deploy | <a href="https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.21.15">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- asg-rolling-deploy: support autoscaling lifecycle hook





</div>



## terraform-aws-cache


### [v0.22.5](https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v0.22.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/24/2024 | Modules affected: elastic-cache, redis | <a href="https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v0.22.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- enable logs and minor upgrade toggle
- [skip-ci] Update CODEOWNERS
- add parameter group to Redis module
- LIB-93: Replace tfenv and tgswitch with mise





</div>


### [v0.22.4](https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v0.22.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/8/2024 | Modules affected: elastic-cache, memcached | <a href="https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v0.22.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- `elastic-cache`
- `memcached`

* enable logs and minor upgrade toggle by @hongil0316 in https://github.com/gruntwork-io/terraform-aws-cache/pull/146


**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-cache/compare/v0.22.3...v0.22.4

</div>


### [v0.22.3](https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v0.22.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/4/2024 | Modules affected: elastic-cache, memcached | <a href="https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v0.22.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- `elastic-cache`
- `memcached`


- Support encryption in transit for memcache clusters


Special thanks to the following users for their contribution!

- @bl-robinson


- https://github.com/gruntwork-io/terraform-aws-cache/pull/145


</div>



## terraform-aws-ci


### [v0.56.0](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.56.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/29/2024 | Modules affected: ecs-deploy-runner, infrastructure-deploy-script, monorepo-helpers | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.56.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Upgrade to Python 3.12


</div>


### [v0.55.1](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.55.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/24/2024 | Modules affected: gruntwork-module-circleci-helpers | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.55.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fix: CI helper module install script




</div>


### [v0.55.0](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.55.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/17/2024 | Modules affected: ecs-deploy-runner, infrastructure-deploy-script | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.55.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Removed tfenv and tgswitch and replaced with mise in EDR




</div>


### [v0.53.3](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.54.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/16/2024 | Modules affected: ecs-deploy-runner | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.54.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fix Go sum for entrypoint



</div>


### [v0.54.2](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.54.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/15/2024 | Modules affected: gruntwork-module-circleci-helpers | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.54.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Added architecture flag option to configure-environment-for-gruntwork-module mise install




</div>


### [v0.54.1](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.54.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/15/2024 | Modules affected: jenkins-server | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.54.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Added flag to skip rolling deployment option for Jenkins server



</div>


### [v0.54.0](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.54.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/8/2024 | Modules affected: gruntwork-module-circleci-helpers | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.54.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- [BREAKING CHANGE] Replace tfenv and tgswitch with mise in `gruntwork-module-circleci-helpers`




</div>


### [v0.53.5](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.53.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/3/2024 | Modules affected: jenkins-server | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.53.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- `jenkins-server`


- Expose max session duration for Jenkins server-group vended role


- https://github.com/gruntwork-io/terraform-aws-ci/pull/588


</div>



## terraform-aws-cis-service-catalog


### [v0.51.0](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.51.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/22/2024 | Modules affected: security | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.51.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Add SNS verification
- Update our multi-region code generators to use [Boilerplate](https://github.com/gruntwork-io/boilerplate).




</div>



## terraform-aws-control-tower


### [v0.7.3](https://github.com/gruntwork-io/terraform-aws-control-tower/releases/tag/v0.7.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/22/2024 | Modules affected: landingzone/control-tower-account-tagger, landingzone/control-tower-account-factory, landingzone/control-tower-multi-account-factory | <a href="https://github.com/gruntwork-io/terraform-aws-control-tower/releases/tag/v0.7.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- Added `control-tower-account-tagger` module that allows for tagging of accounts post-vend.
- Updated `control-tower-account-factory` to integrate with new `control-tower-account-tagger`, propagating the `tags` input.
- Updated `control-tower-multi-account-factory` to read in optional configurations in account request files for `tags`, and to pass those into the new inputs in `control-tower-account-factory`.


</div>



## terraform-aws-data-storage


### [v0.36.0](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.36.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/23/2024 | Modules affected: dms, rds, rds-proxy, backup-vault | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.36.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Implement a new module DMS
- Add Terrascan to CI - CORE-1371
- Add support for custom_paramter_group
- refactor(rds): remove unused local variables
- Add support for provisioning RDS Custom instances
- Support aurora for RDX proxy module
- Add support for Aurora in DMS resource
- Add a test script to create default subnet group for testing purpose
- Implement an example module that demonstrate using same KMS key cross-region replica
- Fix remaining unit tests to use the test db subnet group
- Upgrade golang version
- Support blue/green deployment for RDS
- Rdx proxy unit test fix
- Update maria DB version to supported version for testing
- Update &amp; Improve the instruction for deployment for RDS
- honor lock setting backup vault
- Fixing Redshift Unit Test - Create Subnet Group for Redshift Example Module
- Create Test Parameter Group for Testing
- Instruction for standby deployment for RDS module
- wait for backup vault ot be successfully created
- Change test db parameter group name to contain gruntwork-test prefix to configure cloud-nuke from skipping
- Implement org-level backup policy module
- Disable us-west regions from unit testing due to quota issue
- fixing RdsProxy unit test - retry when proses exiit 1 but unexpected error
- Add gruntwork-test prefix to use proper db parameter group
- Efs enhancement
- Redshift with snapshot
- feat: support rds proxy security group modification
- feat: rds proxy support for db secret kms key decryption
- Adding Unit Test for Redshift Snapshot Feature
- Adding Unit Test for RDS Bastion Host
- aurora: ensure existing clusters can be updated to global clusters
- Enable replica instance type parametrization.
- Upgrade to db.t3.small to fix a failing test
- Rds pass in tags
- LIB-81: Replace tfenv and tgswitch with mise



</div>


### [v0.35.0](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.35.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/5/2024 | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.35.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Adding Unit Test for Redshift Snapshot Feature by @hongil0316 in https://github.com/gruntwork-io/terraform-aws-data-storage/pull/462
* Adding Unit Test for RDS Bastion Host by @hongil0316 in https://github.com/gruntwork-io/terraform-aws-data-storage/pull/461
* aurora: ensure existing clusters can be updated to global clusters by @iangrunt in https://github.com/gruntwork-io/terraform-aws-data-storage/pull/463

* @iangrunt made their first contribution in https://github.com/gruntwork-io/terraform-aws-data-storage/pull/463

**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-data-storage/compare/v0.34...v0.35.0

</div>



## terraform-aws-ecs


### [v0.36.0](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.36.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/4/2024 | Modules affected: ecs-service | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.36.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Added cloudwatch-based deployment circuit breaker feature to `ecs-service` module.
- Updated minimum version for `hashicorp/aws` to 5.1.0, changes are backward compatible.




</div>



## terraform-aws-eks


### [v0.67.2](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.67.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/24/2024 | Modules affected: eks-aws-auth-merger, eks-k8s-karpenter | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.67.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Update dependency in `aws-auth-merger`
- Test Update `TestEKSClusterWithKarpenterReactionOnEC2Event`
- Fix Karpenter interruption configuration




</div>


### [v0.67.1](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.67.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/11/2024 | Modules affected: eks-k8s-external-dns | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.67.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Add option to override the image registry for external-dns



</div>


### [v0.67.0](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.67.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/11/2024 | Modules affected: eks-aws-auth-merger, eks-cluster-control-plane, eks-ebs-csi-driver, eks-k8s-cluster-autoscaler | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.67.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
Default EKS version is 1.29 with this release! Please see the links below for full details of the EKS 1.29 release including new features and any API changes.

[Official AWS EKS 1.29 Announcement](https://aws.amazon.com/blogs/containers/amazon-eks-now-supports-kubernetes-version-1-29/)
[Kubernetes 1.29 Announcement](https://kubernetes.io/blog/2023/12/13/kubernetes-v1-29-release/)
[Kubernetes 1.29 Release Notes](https://github.com/kubernetes/kubernetes/blob/master/CHANGELOG/CHANGELOG-1.29.md)



</div>


### [v0.66.2](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.66.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/11/2024 | Modules affected: eks-k8s-cluster-autoscaler | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.66.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Test Updates: TestEKSClusterManagedWorkersWithAutoscaler
- Bigfix: Fix CAS Policy Logic



</div>


### [v0.66.1](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.66.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/5/2024 | Modules affected: eks-aws-auth-merger, eks-k8s-cluster-autoscaler-iam-policy, eks-k8s-cluster-autoscaler | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.66.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Update Cluster Autoscaler policy to support managed node groups.
- Bump google.golang.org/protobuf from 1.26.0 to 1.33.0 in /modules/eks-aws-auth-merger/aws-auth-merger




</div>



## terraform-aws-lambda


### [v0.21.19](https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.21.19)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/23/2024 | Modules affected: lambda-http-api-gateway | <a href="https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.21.19">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fix python 3.7 no longer supported error
- Support $default Route in API Gateway
- LIB-87: Replace tfenv and tgswitch with mise





</div>



## terraform-aws-load-balancer


### [v0.29.23](https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.29.23)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/23/2024 | <a href="https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.29.23">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- LIB-86: Replace tfenv and tgswitch with mise





</div>



## terraform-aws-monitoring


### [v0.36.18](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.36.18)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/23/2024 | Modules affected: agents, logs | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.36.18">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Remove EOL Amazon Linux 1 References
- Remove old unused references to Ubuntu 14.04 AMIs
- LIB-89: Replace tfenv and tgswitch with mise





</div>


### [v0.36.17](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.36.17)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/2/2024 | Modules affected: agents | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.36.17">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- AL2023 Support for cloudwatch-agent module




</div>



## terraform-aws-openvpn


### [v0.27.5](https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.27.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/23/2024 | <a href="https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.27.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- LIB-90: Replace tfenv and tgswitch with mise





</div>



## terraform-aws-security


### [v0.73.2](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.73.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/24/2024 | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.73.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Replace tfenv and tgswitch with mise




</div>


### [v0.73.1](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.73.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/22/2024 | Modules affected: aws-config-multi-region | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.73.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- `aws-config-multi-region`


- Variable `recording_mode` passed through to `aws-config` module from `aws-config-multi-region` module.


Special thanks to the following users for their contribution!

- @kunal2791


- https://github.com/gruntwork-io/terraform-aws-security/pull/827


</div>


### [v0.73.0](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.73.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/17/2024 | Modules affected: aws-config, github-actions-iam-role, github-actions-openid-connect-provider | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.73.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- `aws-config`
- `github-actions-iam-role`
- `github-actions-openid-connect-provider`


- Improved GitHub OIDC documentation
- Test Bugfixes in `aws-config`


:warning:

This release includes a breaking change. A variable in the `github-actions-openid-connect-provider` module (the map `allowed_sources`) has been replaced with the list `allowed_organizations` to better reflect the purpose of the input.

If you had the following configuration:

```hcl
allowed_sources = &#x7B;
    &quot;acme/repo&quot;: [&quot;main&quot;]
&#x7D;
```

Rewrite your configurations to look like the following:

```hcl
allowed_organizations = [&quot;acme&quot;]
```

Note that this does not result in any loss in security, as the only component of the `allowed_sources` map that was being read was the organizations. This just better documents what is being used.



- https://github.com/gruntwork-io/terraform-aws-security/pull/826

</div>


### [v0.72.1](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.72.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/15/2024 | Modules affected: auto-update, fail2ban, ntp, ssh-grunt | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.72.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Remove EOL Amazon Linux 1 References
- Add support for recording_mode_override feature to `aws_config`



</div>


### [v0.72.0](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.72.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/9/2024 | Modules affected: aws-config-multi-region, ebs-encryption-multi-region, guardduty-multi-region, iam-access-analyzer-multi-region | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.72.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

This release updates our multi-region code generators to use [Boilerplate](https://github.com/gruntwork-io/boilerplate).




</div>


### [v0.71.6](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.71.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/3/2024 | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.71.6">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Add AL2023 NTP Example
- AL2023 Support for ssh-grunt module



</div>



## terraform-aws-server


### [v0.15.16](https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.15.16)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/24/2024 | <a href="https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.15.16">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- LIB-92: Replace tfenv and tgswitch with mise



</div>


### [v0.15.15](https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.15.15)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/19/2024 | Modules affected: single-server | <a href="https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.15.15">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- update example ebs size to fix tests





</div>


### [v0.15.14](https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.15.14)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/18/2024 | Modules affected: single-server | <a href="https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.15.14">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Remove Amazon Linux 1 examples and tests
- Support AL2023 in attach-eni example
- Add support for root_volume_iops in single-server module
- Making the security group creation conditional for single-server module
- Add custom egress rules with CIDR blocks to single-server module



</div>



## terraform-aws-service-catalog


### [v0.112.2](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.112.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/22/2024 | Modules affected: data-stores | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.112.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- Add description variable for RDS parameter group


</div>


### [v0.112.1](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.112.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/22/2024 | Modules affected: landingzone/account-baseline-security | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.112.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- Propagated `recording_mode` up from `aws-config-multi-region`. 



</div>


### [v0.112.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.112.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/21/2024 | Modules affected: mgmt, networking, services | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.112.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

Default EKS version is 1.29 with this release! Please see the links below for full details of the EKS 1.29 release including new features and any API changes.

[Official AWS EKS 1.29 Announcement](https://aws.amazon.com/blogs/containers/amazon-eks-now-supports-kubernetes-version-1-29/)
[Kubernetes 1.29 Announcement](https://kubernetes.io/blog/2023/12/13/kubernetes-v1-29-release/)
[Kubernetes 1.29 Release Notes](https://github.com/kubernetes/kubernetes/blob/master/CHANGELOG/CHANGELOG-1.29.md)
[terraform-aws-eks Release v0.67.0](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.67.0)



</div>


### [v0.111.8](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.111.8)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/13/2024 | Modules affected: services | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.111.8">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Add option to override the image registry for external-dns



</div>


### [v0.111.7](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.111.7)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/12/2024 | Modules affected: data-stores | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.111.7">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Updated modules/data-stores/rds to expose ca_cert_identifier variable



</div>


### [v0.111.6](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.111.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/10/2024 | Modules affected: data-stores | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.111.6">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Update redis module to enable logs and minor upgrade toggle





</div>


### [v0.111.5](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.111.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/6/2024 | Modules affected: data-stores, networking, services | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.111.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- aurora: expose global_cluster_identifier
- aurora: expose replication_source_identifier
- Bump terraform-aws-eks to v0.66.1
- Bugfix: Update Cluster Autoscaler policy to support managed node groups.



</div>


### [v0.111.4](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.111.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/3/2024 | Modules affected: mgmt/jenkins | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.111.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- Expose Jenkins vended IAM role self assume and max session duration


</div>



## terraform-aws-static-assets


### [v0.18.3](https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.18.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/23/2024 | <a href="https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.18.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- LIB-85: Replace tfenv and tgswitch with mise




</div>



## terraform-aws-utilities


### [v0.10.1](https://github.com/gruntwork-io/terraform-aws-utilities/releases/tag/v0.10.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/24/2024 | <a href="https://github.com/gruntwork-io/terraform-aws-utilities/releases/tag/v0.10.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Remove infraredgirl from CODEOWNERS
- LIB-79: Replace tfenv/tgswitch with mise





</div>



## terraform-aws-vpc


### [v0.26.24](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.26.24)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/24/2024 | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.26.24">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- LIB-95: Replace tfenv and tgswitch with mise



</div>


### [v0.26.23](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.26.23)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/10/2024 | Modules affected: vpc-interface-endpoint | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.26.23">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- feat(interface-endpoint): add vpc-lattice support



</div>



## terrapatch-cli


### [v0.1.4](https://github.com/gruntwork-io/terrapatch-cli/releases/tag/v0.1.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/22/2024 | <a href="https://github.com/gruntwork-io/terrapatch-cli/releases/tag/v0.1.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
* Bump golang.org/x/net from 0.7.0 to 0.17.0
* Bump google.golang.org/grpc from 1.53.0 to 1.56.3
* Bump dependencies and Go to 1.21
* Refactor docs
* Bump golang.org/x/crypto from 0.14.0 to 0.17.0
* Bump google.golang.org/protobuf from 1.30.0 to 1.33.0
* Bump golang.org/x/net from 0.17.0 to 0.23.0
* Use new Apple signing tool

</div>




<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "releases",
  "hash": "b44ec71f293d81bc47600053ec5ef6ab"
}
##DOCS-SOURCER-END -->

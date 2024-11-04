
# Gruntwork release 2024-05

<p style={{marginTop: "-25px"}}><small><a href="/guides">Guides</a> / <a href="/guides/stay-up-to-date">Update Guides</a> / <a href="/guides/stay-up-to-date/releases">Releases</a> / 2024-05</small></p>

This page is lists all the updates to the [Gruntwork Infrastructure as Code
Library](https://gruntwork.io/infrastructure-as-code-library/) that were released in 2024-05. For instructions
on how to use these updates in your code, check out the [updating
documentation](/library/stay-up-to-date/updating).

Here are the repos that were updated:

- [boilerplate](#boilerplate)
- [patcher-cli](#patcher-cli)
- [pipelines-cli](#pipelines-cli)
- [terraform-aws-architecture-catalog](#terraform-aws-architecture-catalog)
- [terraform-aws-cache](#terraform-aws-cache)
- [terraform-aws-cis-service-catalog](#terraform-aws-cis-service-catalog)
- [terraform-aws-control-tower](#terraform-aws-control-tower)
- [terraform-aws-data-storage](#terraform-aws-data-storage)
- [terraform-aws-ecs](#terraform-aws-ecs)
- [terraform-aws-eks](#terraform-aws-eks)
- [terraform-aws-openvpn](#terraform-aws-openvpn)
- [terraform-aws-security](#terraform-aws-security)
- [terraform-aws-service-catalog](#terraform-aws-service-catalog)
- [terrapatch-cli](#terrapatch-cli)


## boilerplate


### [v0.5.16](https://github.com/gruntwork-io/boilerplate/releases/tag/v0.5.16)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/29/2024 | <a href="https://github.com/gruntwork-io/boilerplate/releases/tag/v0.5.16">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Fixed CircleCI build by @denis256 in https://github.com/gruntwork-io/boilerplate/pull/182
* Add `--disable-dependency-prompt` flag by @jasonyoung-pearl in https://github.com/gruntwork-io/boilerplate/pull/181

* @jasonyoung-pearl made their first contribution in https://github.com/gruntwork-io/boilerplate/pull/181

**Full Changelog**: https://github.com/gruntwork-io/boilerplate/compare/v0.5.15...v0.5.16

</div>



## patcher-cli


### [v0.8.0](https://github.com/gruntwork-io/patcher-cli/releases/tag/v0.8.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/13/2024 | <a href="https://github.com/gruntwork-io/patcher-cli/releases/tag/v0.8.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * We now use a faster logging library that supports colored output in the terminal. You can disable this behavior using the `--no-color` flag.
* Progress information is more responsive when using the interactive mode.
* Improved performance for dependency discovery and resolution.

**Full Changelog**: https://github.com/gruntwork-io/patcher-cli/compare/v0.7.0...v0.8.0

</div>


### [v0.7.0](https://github.com/gruntwork-io/patcher-cli/releases/tag/v0.7.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/10/2024 | <a href="https://github.com/gruntwork-io/patcher-cli/releases/tag/v0.7.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * We now preserve Terragrunt sources that contain variable interpolation syntax (see below). 

Previously, when Patcher updated a Terragrunt source argument that contained variable interpolation syntax, it would expand the whole string. For example:

```
terraform &#x7B;
  source = &quot;$&#x7B;include.envcommon.locals.source_base_url&#x7D;?ref=v0.90.2&quot;
&#x7D;
```

became:

```
terraform &#x7B;
  source = &quot;git::git@github.com:gruntwork-io/terraform-aws-service-catalog.git//modules/networking/vpc?ref=v0.90.8&quot;
&#x7D;
```

Now Patcher will try to preserve any variable interpolation syntax where possible:

```
terraform &#x7B;
  source = &quot;$&#x7B;include.envcommon.locals.source_base_url&#x7D;?ref=v0.90.8&quot;
&#x7D;
```

**Full Changelog**: https://github.com/gruntwork-io/patcher-cli/compare/v0.6.0...v0.7.0

</div>


### [v0.6.0](https://github.com/gruntwork-io/patcher-cli/releases/tag/v0.6.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/9/2024 | <a href="https://github.com/gruntwork-io/patcher-cli/releases/tag/v0.6.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  This is Patcher&apos;s next major release, featuring many performance, security, and bug-related fixes under the hood. Please give it a test drive and let us know your feedback.

* All dependencies are now sorted consistently in tables, and the Yaml output
* Non-interactive upgrade performance has been improved
* Patcher should now start faster in interactive mode
* Security fixes have been applied for upstream libraries, including Docker
* Fixed several version update bugs
* Fixed broken engine tests

</div>



## pipelines-cli


### [v0.10.0-alpha](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.10.0-alpha)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/31/2024 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.10.0-alpha">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Release duplicated from https://github.com/gruntwork-io/pipelines/releases/tag/v0.10.0-alpha

</div>


### [v0.10.0](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.10.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/31/2024 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.10.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Release duplicated from https://github.com/gruntwork-io/pipelines/releases/tag/v0.10.0

</div>


### [v0.9.11](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.9.11)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/28/2024 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.9.11">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Release duplicated from https://github.com/gruntwork-io/pipelines/releases/tag/v0.9.11

</div>


### [v0.9.10](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.9.10)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/23/2024 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.9.10">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Release duplicated from https://github.com/gruntwork-io/pipelines/releases/tag/v0.9.10

</div>


### [v0.9.9](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.9.9)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/22/2024 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.9.9">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Release duplicated from https://github.com/gruntwork-io/pipelines/releases/tag/v0.9.9

</div>


### [v0.9.8](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.9.8)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/13/2024 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.9.8">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Release duplicated from https://github.com/gruntwork-io/pipelines/releases/tag/v0.9.8

</div>


### [v0.9.7](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.9.7)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/7/2024 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.9.7">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Release duplicated from https://github.com/gruntwork-io/pipelines/releases/tag/v0.9.7

</div>


### [v0.9.6](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.9.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/7/2024 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.9.6">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Release duplicated from https://github.com/gruntwork-io/pipelines/releases/tag/v0.9.6

</div>


### [v0.9.5](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.9.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/7/2024 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.9.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Release duplicated from https://github.com/gruntwork-io/pipelines/releases/tag/v0.9.5

</div>


### [v0.9.4](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.9.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/3/2024 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.9.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Release duplicated from https://github.com/gruntwork-io/pipelines/releases/tag/v0.9.4

</div>



## terraform-aws-architecture-catalog


### [v2.3.2](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.3.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/31/2024 | <a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.3.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * feat: Adding parallelism restriction by @yhakbar in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1086


**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-architecture-catalog/compare/v2.3.1...v2.3.2

</div>


### [v2.3.1](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.3.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/31/2024 | <a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.3.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * feat: Adding CIS compliance common findings docs by @yhakbar in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1087


**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-architecture-catalog/compare/v2.3.0...v2.3.1

</div>


### [v2.3.0](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.3.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/28/2024 | <a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.3.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Remove terraform block from envcommon in access-control template by @oredavids in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1083
* Add IAM password policy module to the management account by @oredavids in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1084
* feat: Adding permission set to access AWS Support by @yhakbar in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1085


**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-architecture-catalog/compare/v2.2.9...v2.3.0

</div>


### [v2.2.9](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.2.9)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/14/2024 | <a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.2.9">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Add activation notice to billing SSO groups by @oredavids in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1082
* Adjusting account vending language in the README by @yhakbar in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1080
* chore: Updating versions by @yhakbar in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1079


**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-architecture-catalog/compare/v2.2.8...v2.2.9

</div>


### [v2.2.8](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.2.8)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/13/2024 | <a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.2.8">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * LIB-82: Replace tfenv and tgswitch with mise by @arsci in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1069
* chore: Adding CIS documentation by @yhakbar in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1081


**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-architecture-catalog/compare/v2.2.7...v2.2.8

</div>


### [v2.2.7](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.2.7)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/10/2024 | <a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.2.7">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Allow numbers in new account names by @ZachGoldberg in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1078


**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-architecture-catalog/compare/v2.2.6...v2.2.7

</div>


### [v2.2.6](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.2.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/9/2024 | <a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.2.6">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * fix: Updating `account-factory.yml` workflow secret by @yhakbar in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1077


**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-architecture-catalog/compare/v2.2.5...v2.2.6

</div>


### [v2.2.5](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.2.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/8/2024 | <a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.2.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Add terraform blocks to root pipeline roles by @oredavids in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1076


**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-architecture-catalog/compare/v2.2.4...v2.2.5

</div>


### [v2.2.4](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.2.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/8/2024 | <a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.2.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Update account-vending section by @oredavids in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1072
* fix: Pinning `arch-catalog-version` in `.gruntwork/config.yml` to `v2.2.4` by @yhakbar in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1075


**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-architecture-catalog/compare/v2.2.3...v2.2.4

</div>


### [v2.2.3](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.2.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/8/2024 | <a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.2.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * fix: Removing central-pipelines roles from `single-account-baseline` by @yhakbar in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1074


**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-architecture-catalog/compare/v2.2.2...v2.2.3

</div>


### [v2.2.2](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.2.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/8/2024 | <a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.2.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * fix: Removing control-tower module install in account-factory by @yhakbar in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1073


**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-architecture-catalog/compare/v2.2.1...v2.2.2

</div>


### [v2.2.1](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.2.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/6/2024 | <a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.2.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * chore: Updating SSO group docs by @yhakbar in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1071


**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-architecture-catalog/compare/v2.2.0...v2.2.1

</div>


### [v2.2.0](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.2.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/6/2024 | <a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.2.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * chore: Pinning `pipelines-workflows` to `v1` wherever it&apos;s used by @yhakbar in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1070


**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-architecture-catalog/compare/v2.1.9...v2.2.0

</div>


### [v2.1.9](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.1.9)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/1/2024 | <a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.1.9">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Update account-factory.yml by @ZachGoldberg in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1066
* Update account-factory.yml by @zachctocoach in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1065
* chore: Renaming `central-pipelines` roles to `root-pipelines` roles by @yhakbar in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1067
* chore: Bumping arch catalog in `.gruntwork/config.yml` for `devops-foundations-infrastructure-live-root` by @yhakbar in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1068

* @zachctocoach made their first contribution in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1065

**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-architecture-catalog/compare/v2.1.8...v2.1.9

</div>



## terraform-aws-cache


### [v0.22.6](https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v0.22.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/3/2024 | <a href="https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v0.22.6">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Fix incorrect usage of variables by @hongil0316 in https://github.com/gruntwork-io/terraform-aws-cache/pull/151


**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-cache/compare/v0.22.5...v0.22.6

</div>



## terraform-aws-cis-service-catalog


### [v0.51.1](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.51.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/27/2024 | Modules affected: data-stores | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.51.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- LIB-88: Replace tfenv with mise
- Support for manage_master_user_password in RDS


</div>



## terraform-aws-control-tower


### [v0.7.5](https://github.com/gruntwork-io/terraform-aws-control-tower/releases/tag/v0.7.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/10/2024 | Modules affected: landingzone/control-tower-account-tagger | <a href="https://github.com/gruntwork-io/terraform-aws-control-tower/releases/tag/v0.7.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- fix: Fixing small typo in tagger docs
- feat(tagger): add test for empty tag value


</div>


### [v0.7.4](https://github.com/gruntwork-io/terraform-aws-control-tower/releases/tag/v0.7.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/10/2024 | Modules affected: landingzone/control-tower-account-tagger | <a href="https://github.com/gruntwork-io/terraform-aws-control-tower/releases/tag/v0.7.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- fix: #77 - Updating type of variable of `account_id`


</div>



## terraform-aws-data-storage


### [v0.37.0](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.37.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/16/2024 | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.37.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Add output for RDS master password secret ARN by @br3ndonland in https://github.com/gruntwork-io/terraform-aws-data-storage/pull/470

* @br3ndonland made their first contribution in https://github.com/gruntwork-io/terraform-aws-data-storage/pull/470

**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-data-storage/compare/v0.36.0...v0.37.0

</div>



## terraform-aws-ecs


### [v0.36.1](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.36.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/28/2024 | Modules affected: ecs-cluster, ecs-service | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.36.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Move example module to the examples directory
- Update ECS instance refresh parameters
- New Test Framework for ECS Module
- Replace `tfenv` and `tgswitch` with `mise`, test stability
- Added parameter to support proxy_protocol_v2 on target groups



</div>



## terraform-aws-eks


### [v0.67.5](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.67.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/22/2024 | Modules affected: eks-k8s-cluster-autoscaler | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.67.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Update cluster autoscaler module to support existing IAM Role.


</div>


### [v0.67.4](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.67.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/11/2024 | Modules affected: eks-k8s-cluster-autoscaler-iam-policy, eks-k8s-cluster-autoscaler | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.67.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Replace tfenv and tgswitch with mise
- Fix test TestEKSClusterAutoscaler
- CAS Regression BugFix for MNG Data Source



</div>


### [v0.67.3](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.67.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/2/2024 | Modules affected: eks-cluster-workers | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.67.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Add instance maintenance policy support for eks-cluster-workers



</div>



## terraform-aws-openvpn


### [v0.27.6](https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.27.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/20/2024 | Modules affected: openvpn-admin | <a href="https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.27.6">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fixed request certificates



</div>



## terraform-aws-security


### [v0.74.0](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.74.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/21/2024 | Modules affected: aws-config, cloudtrail, aws-config-multi-region, ebs-encryption-multi-region | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.74.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- Added support for the `eu-central-2` AWS region to our multi-region modules.
- Changed our `codegen` package to generate multi-region examples now.
- Added support for AWS Config Recording Group Configurations.
- Added documentation to clarify a CloudTrail org trail issue.


</div>



## terraform-aws-service-catalog


### [v0.112.12](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.112.12)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/27/2024 | Modules affected: data-stores | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.112.12">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- add manage_master_user_password for aurora module


</div>


### [v0.112.11](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.112.11)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/21/2024 | Modules affected: data-stores | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.112.11">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Support for manage_master_user_password in RDS


</div>


### [v0.112.10](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.112.10)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/16/2024 | Modules affected: services/eks-cluster | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.112.10">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- [services/eks-cluster] Expose additional variables for eks module



</div>


### [v0.112.9](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.112.9)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/15/2024 | Modules affected: services/asg-service | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.112.9">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- IMDSv2 support for asg module



</div>


### [v0.112.8](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.112.8)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/14/2024 | Modules affected: landingzone/account-baseline-app | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.112.8">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- fix: Adding `recording_mode` to the main.tf passed to `aws-config-multi-region` from the `account-baseline-app



</div>


### [v0.112.7](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.112.7)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/14/2024 | Modules affected: landingzone/account-baseline-app | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.112.7">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- Propagate variable `recording_mode` from `aws-config-multi-region` to `account-baseline-app`.
- Updated Terraform to `1.5.7` in CircleCI configuration



</div>


### [v0.112.6](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.112.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/13/2024 | Modules affected: data-stores, services | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.112.6">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Allow master username, password, and db_name nullable
- Fix CI build by explicitly setting version numbers
- Add the Allow All Outbound variable from the Single-server module



</div>


### [v0.112.5](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.112.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/7/2024 | Modules affected: data-stores, mgmt | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.112.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Update data-stores/memcached and data-stores/redis versions to fix variable usage
- Update mgmt/ecs-deploy-runner to support python 3.12





</div>


### [v0.112.4](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.112.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/4/2024 | Modules affected: services | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.112.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Upgrade lambda service to support python 3.12 runtime (removes deprecated python 3.7 runtime)





</div>


### [v0.112.3](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.112.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/1/2024 | Modules affected: services/lambda | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.112.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- LIB-77: Replace tfenv and tgswitch with mise
- Expose ephemeral_storage from terraform-aws-lambda module



</div>



## terrapatch-cli


### [v0.1.5](https://github.com/gruntwork-io/terrapatch-cli/releases/tag/v0.1.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/9/2024 | <a href="https://github.com/gruntwork-io/terrapatch-cli/releases/tag/v0.1.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Bumped internal dependencies


</div>




<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "releases",
  "hash": "832cfa078d26303268d4be6a6a9c18c3"
}
##DOCS-SOURCER-END -->


# Gruntwork release 2023-10

<p style={{marginTop: "-25px"}}><small><a href="/guides">Guides</a> / <a href="/guides/stay-up-to-date">Update Guides</a> / <a href="/guides/stay-up-to-date/releases">Releases</a> / 2023-10</small></p>

This page is lists all the updates to the [Gruntwork Infrastructure as Code
Library](https://gruntwork.io/infrastructure-as-code-library/) that were released in 2023-10. For instructions
on how to use these updates in your code, check out the [updating
documentation](/library/stay-up-to-date/updating).

Here are the repos that were updated:

- [patcher-cli](#patcher-cli)
- [pipelines-cli](#pipelines-cli)
- [repo-copier](#repo-copier)
- [terraform-aws-architecture-catalog](#terraform-aws-architecture-catalog)
- [terraform-aws-asg](#terraform-aws-asg)
- [terraform-aws-cache](#terraform-aws-cache)
- [terraform-aws-ci](#terraform-aws-ci)
- [terraform-aws-control-tower](#terraform-aws-control-tower)
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
- [terraform-aws-utilities](#terraform-aws-utilities)
- [terraform-aws-vpc](#terraform-aws-vpc)


## patcher-cli


### [v0.5.0](https://github.com/gruntwork-io/patcher-cli/releases/tag/v0.5.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/27/2023 | <a href="https://github.com/gruntwork-io/patcher-cli/releases/tag/v0.5.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  This is the next major release of Patcher with a reworked interactive terminal user interface (TUI), improved documentation and many minor improvements.


Patcher includes a revised interactive mode. The interactive mode can be used to update dependencies individually.


* Patcher now applies patches in the interactive mode
* Documentation improvements
* Fixed several version update bugs
* Fixed broken engine tests


</div>



## pipelines-cli


### [v0.2.0](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.2.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/26/2023 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.2.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Release duplicated from https://github.com/gruntwork-io/pipelines/releases/tag/v0.2.0

</div>



## repo-copier


### [v0.4.1](https://github.com/gruntwork-io/repo-copier/releases/tag/v0.4.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/24/2023 | <a href="https://github.com/gruntwork-io/repo-copier/releases/tag/v0.4.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Show warning when copying a large number of releases in https://github.com/gruntwork-io/repo-copier/pull/232

**Full Changelog**: https://github.com/gruntwork-io/repo-copier/compare/v0.4.0...v0.4.1

</div>


### [v0.4.0](https://github.com/gruntwork-io/repo-copier/releases/tag/v0.4.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/23/2023 | <a href="https://github.com/gruntwork-io/repo-copier/releases/tag/v0.4.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Checking supported git version in https://github.com/gruntwork-io/repo-copier/pull/229
* Copy only the tags and the default branch, by default in https://github.com/gruntwork-io/repo-copier/pull/230
* Support incrementally copying for `--dry-run` mode in https://github.com/gruntwork-io/repo-copier/pull/231


**Full Changelog**: https://github.com/gruntwork-io/repo-copier/compare/v0.3.13...v0.4.0

</div>


### [v0.3.13](https://github.com/gruntwork-io/repo-copier/releases/tag/v0.3.13)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/13/2023 | <a href="https://github.com/gruntwork-io/repo-copier/releases/tag/v0.3.13">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Fix `nil` pointer dereference by @levkohimins in https://github.com/gruntwork-io/repo-copier/pull/228


**Full Changelog**: https://github.com/gruntwork-io/repo-copier/compare/v0.3.12...v0.3.13

</div>


### [v0.3.12](https://github.com/gruntwork-io/repo-copier/releases/tag/v0.3.12)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/11/2023 | <a href="https://github.com/gruntwork-io/repo-copier/releases/tag/v0.3.12">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Fix GitLab release creation error `release already exists` by @levkohimins in https://github.com/gruntwork-io/repo-copier/pull/225


**Full Changelog**: https://github.com/gruntwork-io/repo-copier/compare/v0.3.11...v0.3.12

</div>


### [v0.3.11](https://github.com/gruntwork-io/repo-copier/releases/tag/v0.3.11)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/10/2023 | <a href="https://github.com/gruntwork-io/repo-copier/releases/tag/v0.3.11">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Fix nil pointer error with combination `--copy-release` and `--dry-run` by @levkohimins in https://github.com/gruntwork-io/repo-copier/pull/221


**Full Changelog**: https://github.com/gruntwork-io/repo-copier/compare/v0.3.10...v0.3.11

</div>


### [v0.3.10](https://github.com/gruntwork-io/repo-copier/releases/tag/v0.3.10)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/9/2023 | <a href="https://github.com/gruntwork-io/repo-copier/releases/tag/v0.3.10">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Add support for replacing Git/SSH URLs with HTTPS URLs for all repos (not only copied) by @levkohimins in https://github.com/gruntwork-io/repo-copier/pull/219


**Full Changelog**: https://github.com/gruntwork-io/repo-copier/compare/v0.3.9...v0.3.10

</div>


### [v0.3.9](https://github.com/gruntwork-io/repo-copier/releases/tag/v0.3.9)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/3/2023 | <a href="https://github.com/gruntwork-io/repo-copier/releases/tag/v0.3.9">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Add check for nil while creating GitHub release by @levkohimins in https://github.com/gruntwork-io/repo-copier/pull/216


**Full Changelog**: https://github.com/gruntwork-io/repo-copier/compare/v0.3.8...v0.3.9

</div>



## terraform-aws-architecture-catalog


### [v1.0.6](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v1.0.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/31/2023 | <a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v1.0.6">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * [CORE-1377] Add example module usage to infrastructure-modules template by @ellisonc in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/895


**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-architecture-catalog/compare/v1.0.5...v1.0.6

</div>


### [v1.0.5](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v1.0.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/27/2023 | <a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v1.0.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Refactor pipelines into two templates by @oredavids in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/892
* Fix config input reference by @oredavids in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/894


**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-architecture-catalog/compare/v1.0.4...v1.0.5

</div>


### [v1.0.4](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v1.0.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/26/2023 | <a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v1.0.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * merge edr migration with single account pipelines workflow by @ellisonc in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/893


**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-architecture-catalog/compare/v1.0.3...v1.0.4

</div>


### [v1.0.3](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v1.0.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/25/2023 | <a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v1.0.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * remove email from standalone pipeline by @ellisonc in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/891


**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-architecture-catalog/compare/v1.0.2...v1.0.3

</div>


### [v1.0.2](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v1.0.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/25/2023 | <a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v1.0.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * update pipelines dispatch version by @MoonMoon1919 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/889
* Feature/gruntcon single account pipelines by @ellisonc in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/890


**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-architecture-catalog/compare/v1.0.1...v1.0.2

</div>


### [v1.0.1](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v1.0.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/24/2023 | <a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v1.0.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Remove Max from CODEOWNERS by @MoonMoon1919 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/888
* feat(CORE-1372): Add Pipelines policy update role templates by @MoonMoon1919 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/884


**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-architecture-catalog/compare/v1.0.0...v1.0.1

</div>


### [v1.0.0](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v1.0.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/19/2023 | <a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v1.0.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
Initial release of devops-foundations templates

* [skip ci] Remove Zack from CODEOWNERS by @zackproser in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/834
* Updating service catalog from v0.104.9 to v0.104.15 by @pete0emerson in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/835
* [skip ci] Removing former Grunts by @eak12913 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/836
* update codegen versions by @ellisonc in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/842
* update codeowners by @MoonMoon1919 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/881
* Devops foundations by @ellisonc in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/887


**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-architecture-catalog/compare/v0.0.37...v1.0.0

</div>



## terraform-aws-asg


### [v0.21.11](https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.21.11)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/12/2023 | Modules affected: asg-instance-refresh, asg-rolling-deploy, server-group | <a href="https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.21.11">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Revert Pin Terraform version - [CORE-1297]


</div>


### [v0.21.10](https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.21.10)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/4/2023 | Modules affected: asg-instance-refresh, asg-rolling-deploy, server-group | <a href="https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.21.10">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Pin Terraform version - [CORE-1297]


</div>



## terraform-aws-cache


### [v0.22.1](https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v0.22.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/12/2023 | Modules affected: elastic-cache, memcached, redis, redis_copy_snapshot | <a href="https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v0.22.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Revert Pin Terraform version - [CORE-1297]


</div>


### [v0.22.0](https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v0.22.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/4/2023 | Modules affected: elastic-cache, memcached, redis, redis_copy_snapshot | <a href="https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v0.22.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- AWS provider support for v5
- Pin Terraform version - [CORE-1297]





</div>



## terraform-aws-ci


### [v0.52.19](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.52.19)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/19/2023 | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.52.19">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- bump tf ver



</div>


### [v0.52.18](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.52.18)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/13/2023 | Modules affected: ecs-deploy-runner, infrastructure-deployer, test/upgrades | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.52.18">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Updates repo structure to match rename and update to use terratest v0.44.1
- Updates tests to reflect repo name change `module-ci` -&gt; `terraform-aws-ci`



</div>


### [v0.52.17](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.52.17)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/12/2023 | Modules affected: ec2-backup, ecs-deploy-runner-invoke-iam-policy, ecs-deploy-runner-standard-configuration, ecs-deploy-runner | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.52.17">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Revert Pin Terraform version - [CORE-1297]



</div>


### [v0.52.16](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.52.16)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/11/2023 | Modules affected: ec2-backup, ecs-deploy-runner-invoke-iam-policy, ecs-deploy-runner-standard-configuration, ecs-deploy-runner | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.52.16">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Pin Terraform version - [CORE-1297]



</div>



## terraform-aws-control-tower


### [v0.0.22](https://github.com/gruntwork-io/terraform-aws-control-tower/releases/tag/v0.0.22)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/20/2023 | <a href="https://github.com/gruntwork-io/terraform-aws-control-tower/releases/tag/v0.0.22">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Add team name to single account factory
- Add template for pipelines policy update role
- Separate read and write roles for policy update in child accounts




</div>


### [v0.0.21](https://github.com/gruntwork-io/terraform-aws-control-tower/releases/tag/v0.0.21)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/16/2023 | Modules affected: Single | <a href="https://github.com/gruntwork-io/terraform-aws-control-tower/releases/tag/v0.0.21">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Add template for read only role for pipelines




</div>


### [v0.0.20](https://github.com/gruntwork-io/terraform-aws-control-tower/releases/tag/v0.0.20)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/12/2023 | <a href="https://github.com/gruntwork-io/terraform-aws-control-tower/releases/tag/v0.0.20">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Add default tags override files to Landing Zone templates





</div>


### [v0.0.19](https://github.com/gruntwork-io/terraform-aws-control-tower/releases/tag/v0.0.19)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/12/2023 | Modules affected: aws-sso, landingzone | <a href="https://github.com/gruntwork-io/terraform-aws-control-tower/releases/tag/v0.0.19">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Revert Pin Terraform version - [CORE-1297]


</div>


### [v0.0.18](https://github.com/gruntwork-io/terraform-aws-control-tower/releases/tag/v0.0.18)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/5/2023 | <a href="https://github.com/gruntwork-io/terraform-aws-control-tower/releases/tag/v0.0.18">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * chore(CORE-1303): Add frontmatter to readme by @MoonMoon1919 in https://github.com/gruntwork-io/terraform-aws-control-tower/pull/20
* Pin Terraform version - [CORE-1297] by @arsci in https://github.com/gruntwork-io/terraform-aws-control-tower/pull/22
* chore(CORE-1303): Touch-up readme and add license by @MoonMoon1919 in https://github.com/gruntwork-io/terraform-aws-control-tower/pull/23

* @arsci made their first contribution in https://github.com/gruntwork-io/terraform-aws-control-tower/pull/22

**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-control-tower/compare/v0.0.17...v0.0.18

</div>


### [v0.0.17](https://github.com/gruntwork-io/terraform-aws-control-tower/releases/tag/v0.0.17)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/4/2023 | <a href="https://github.com/gruntwork-io/terraform-aws-control-tower/releases/tag/v0.0.17">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Update boilerplate descriptions to highlight that versions should come from terraform-aws-control-tower by @MoonMoon1919 in https://github.com/gruntwork-io/terraform-aws-control-tower/pull/19
* fix typo in single account baseline state bucket by @MoonMoon1919 in https://github.com/gruntwork-io/terraform-aws-control-tower/pull/21


**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-control-tower/compare/v0.0.16...v0.0.17

</div>



## terraform-aws-data-storage


### [v0.31.4](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.31.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/12/2023 | Modules affected: rds, aurora, backup-plan, backup-vault | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.31.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- feat(rds): force db_name=&quot;&quot; for sqlserver
- Revert Pin Terraform version - [CORE-1297]



</div>


### [v0.31.3](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.31.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/10/2023 | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.31.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Modules affected
* rds

* feat(rds): force db_name=&quot;&quot; for sqlserver by @gclough in https://github.com/gruntwork-io/terraform-aws-data-storage/pull/403

**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-data-storage/compare/v0.31.2...v0.31.3

</div>


### [v0.31.2](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.31.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/4/2023 | Modules affected: aurora, redshift, backup-plan, backup-vault | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.31.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- feat(aurora): output for master password secret arn
- Support availability_zone_relocation_enabled variable in Redshift module
- Change the code owner of data storage from Pete to James
- Pin Terraform version - [CORE-1297]



</div>



## terraform-aws-ecs


### [v0.35.12](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.35.12)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/12/2023 | Modules affected: ecs-cluster, ecs-daemon-service, ecs-service | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.35.12">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Revert Pin Terraform version - [CORE-1297]


</div>


### [v0.35.11](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.35.11)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/11/2023 | Modules affected: ecs-cluster, ecs-daemon-service, ecs-service | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.35.11">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- [PATCHER-263] Migrate terraform-aws-ecs patches to new Patcher format
- [PATCHER-263] fix: Move config.yaml to correct folder
- Remove bash-commons from patches
- Pin Terraform version - [CORE-1297]




</div>



## terraform-aws-eks


### [v0.64.4](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.64.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/24/2023 | Modules affected: eks-aws-auth-merger | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.64.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Bump gopkg.in/yaml.v3 from 3.0.0-20210107192922-496545a6307b to 3.0.0 in /modules/eks-aws-auth-merger/aws-auth-merger
- Bump golang.org/x/net from 0.7.0 to 0.17.0 in /modules/eks-aws-auth-merger/aws-auth-merger



</div>


### [v0.64.3](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.64.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/12/2023 | Modules affected: eks-alb-ingress-controller-iam-policy, eks-alb-ingress-controller, eks-aws-auth-merger, eks-cloudwatch-agent | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.64.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Revert Pin Terraform version - [CORE-1297]


</div>


### [v0.64.2](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.64.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/11/2023 | Modules affected: eks-alb-ingress-controller-iam-policy, eks-alb-ingress-controller, eks-aws-auth-merger, eks-cloudwatch-agent | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.64.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Pin Terraform version - [CORE-1297]



</div>


### [v0.64.1](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.64.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/11/2023 | Modules affected: eks-container-logs | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.64.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fix extra_filters value applied configuration to `aws-for-fluent-bit` Helm chart
- Expose additionalFilters helm config as new module variable `additional_filters`



</div>


### [v0.64.0](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.64.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/10/2023 | Modules affected: eks-k8s-karpenter, eks-cluster-control-plane, eks-ebs-csi-driver | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.64.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Enable Karpenter Interruption based on EC2 events
- Add Support for EBS CSI Driver via new module `eks-ebs-csi-driver`



</div>



## terraform-aws-lambda


### [v0.21.15](https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.21.15)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/12/2023 | Modules affected: api-gateway-account-settings, api-gateway-proxy, keep-warm, lambda-edge-log-group | <a href="https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.21.15">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Revert Pin Terraform version - [CORE-1297]



</div>


### [v0.21.14](https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.21.14)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/4/2023 | Modules affected: api-gateway-account-settings, api-gateway-proxy, keep-warm, lambda-edge-log-group | <a href="https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.21.14">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Pin Terraform version - [CORE-1297]



</div>



## terraform-aws-load-balancer


### [v0.29.18](https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.29.18)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/25/2023 | Modules affected: acm-tls-certificate | <a href="https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.29.18">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Updated AWS provider lock to &gt;= 4.3.1 &lt; 6.0.0


</div>


### [v0.29.17](https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.29.17)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/23/2023 | Modules affected: acm-tls-certificate, alb | <a href="https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.29.17">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Added `ip_address_type` to `alb` module to allow use of dualstack loadbalancer
- Updated `acm-tls-certificate` to use key_algorithm so it can set from outside


</div>


### [v0.29.16](https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.29.16)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/12/2023 | Modules affected: acm-tls-certificate, alb, lb-listener-rules | <a href="https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.29.16">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Revert Pin Terraform version - [CORE-1297]



</div>


### [v0.29.15](https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.29.15)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/11/2023 | Modules affected: acm-tls-certificate | <a href="https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.29.15">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- acm-tls-certificate: included certificate renewal/expiration information




</div>


### [v0.29.14](https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.29.14)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/4/2023 | Modules affected: acm-tls-certificate, alb, lb-listener-rules | <a href="https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.29.14">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Pin Terraform version - [CORE-1297]



</div>



## terraform-aws-messaging


### [v0.12.4](https://github.com/gruntwork-io/terraform-aws-messaging/releases/tag/v0.12.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/12/2023 | Modules affected: kinesis-firehose, kinesis, msk, sns-sqs-connection | <a href="https://github.com/gruntwork-io/terraform-aws-messaging/releases/tag/v0.12.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Revert Pin Terraform version - [CORE-1297]


</div>


### [v0.12.3](https://github.com/gruntwork-io/terraform-aws-messaging/releases/tag/v0.12.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/4/2023 | <a href="https://github.com/gruntwork-io/terraform-aws-messaging/releases/tag/v0.12.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Support delivery policy for sns topic by @pras111gw in https://github.com/gruntwork-io/terraform-aws-messaging/pull/95
* Fix allow_inbound_cidr security group bug by @hongil0316 in https://github.com/gruntwork-io/terraform-aws-messaging/pull/97
* Prevent making security group when allow_connections_cidr is empty by @hongil0316 in https://github.com/gruntwork-io/terraform-aws-messaging/pull/99
* Pin Terraform version - [CORE-1297] in https://github.com/gruntwork-io/terraform-aws-messaging/pull/139


**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-messaging/compare/v0.12.2...v0.12.3

</div>



## terraform-aws-monitoring


### [v0.36.8](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.36.8)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/31/2023 | Modules affected: alarms | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.36.8">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Add health check ID output - CORE-1405



</div>


### [v0.36.7](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.36.7)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/25/2023 | Modules affected: alarms/route53-health-check-alarms/main.tf | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.36.7">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- `alarms/route53-health-check-alarms/main.tf`


- Fix bug in `route53-health-check-alarms` when combining `provider_shared_credentials_file` and `provider_shared_credentials_files`.





- https://github.com/gruntwork-io/terraform-aws-monitoring/pull/314




</div>


### [v0.36.6](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.36.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/12/2023 | Modules affected: alarms, logs, metrics | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.36.6">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Revert Pin Terraform version - [CORE-1297]



</div>


### [v0.36.5](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.36.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/4/2023 | Modules affected: alarms, logs, metrics | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.36.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Pin Terraform version - [CORE-1297]


</div>



## terraform-aws-openvpn


### [v0.27.2](https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.27.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/12/2023 | Modules affected: openvpn-server | <a href="https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.27.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Revert Pin Terraform version - [CORE-1297]



</div>


### [v0.27.1](https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.27.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/4/2023 | Modules affected: openvpn-server | <a href="https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.27.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Pin Terraform version - [CORE-1297]




</div>



## terraform-aws-security


### [v0.69.3](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.69.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/16/2023 | Modules affected: github-actions-iam-role | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.69.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Add outputs for OIDC provider attributes in `github-actions-iam-role`




</div>


### [v0.69.2](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.69.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/12/2023 | Modules affected: aws-config-bucket, aws-config-multi-region, aws-config-rules, aws-config | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.69.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Revert Pin Terraform version - [CORE-1297]





</div>


### [v0.69.1](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.69.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/11/2023 | Modules affected: aws-config-bucket, aws-config-multi-region, aws-config-rules, aws-config | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.69.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- [PATCHER-262] Migrate terraform-aws-security patches to new Patcher format
- Remove bash-commons from patches
- Pin Terraform version - [CORE-1297]



</div>



## terraform-aws-server


### [v0.15.12](https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.15.12)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/30/2023 | Modules affected: single-server | <a href="https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.15.12">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Update minimum version for AWS Provider and replace deprecated &apos;vpc&apos; var with &apos;domain&apos;




</div>


### [v0.15.11](https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.15.11)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/16/2023 | Modules affected: single-server | <a href="https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.15.11">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fixed backwards-compatibility bug for AWS provider &lt; 5.0
- Fixed upgrade-tests




</div>


### [v0.15.10](https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.15.10)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/12/2023 | Modules affected: ec2-backup, single-server | <a href="https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.15.10">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Revert Pin Terraform version - [CORE-1297]


</div>


### [v0.15.9](https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.15.9)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/4/2023 | Modules affected: single-server, ec2-backup | <a href="https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.15.9">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- feature/add root_volume_encrypted variable to single server
- Fix/update terratest version
- Pin Terraform version - [CORE-1297]



</div>



## terraform-aws-service-catalog


### [v0.107.2](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.107.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/31/2023 | Modules affected: networking, services | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.107.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Upgrade example to use ubuntu 22.04
- Update `terraform-aws-eks` to `v0.64.1`



</div>


### [v0.107.1](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.107.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/28/2023 | Modules affected: networking, services | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.107.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Update `terraform-aws-eks` to v0.64.0
- Expose additional `eks-karpenter` module configurations for deprovisioning queue capabilities
- Expose additional `eks-cluster` module configurations for EBS CSI Driver support





</div>


### [v0.107.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.107.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/27/2023 | Modules affected: landingzone, services, networking | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.107.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Improve variable labeling to distinguish required and optional vars easily
- Add new Argo CD module `eks-argocd`
- Version bump `terraform-aws-eks` module to `v0.63.0`



</div>


### [v0.106.1](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.106.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/6/2023 | Modules affected: services | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.106.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- ecs-cluster: updated to expose source ami filters as user-definable vars




</div>



## terraform-aws-static-assets


### [v0.17.4](https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.17.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/12/2023 | Modules affected: s3-cloudfront, s3-static-website | <a href="https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.17.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Revert Pin Terraform version - [CORE-1297]


</div>


### [v0.17.3](https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.17.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/11/2023 | Modules affected: s3-cloudfront, s3-static-website | <a href="https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.17.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Pin Terraform version - [CORE-1297]



</div>



## terraform-aws-utilities


### [v0.9.6](https://github.com/gruntwork-io/terraform-aws-utilities/releases/tag/v0.9.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/12/2023 | Modules affected: executable-dependency, instance-type, join-path, list-remove | <a href="https://github.com/gruntwork-io/terraform-aws-utilities/releases/tag/v0.9.6">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Revert Pin Terraform version - [CORE-1297]


</div>


### [v0.9.5](https://github.com/gruntwork-io/terraform-aws-utilities/releases/tag/v0.9.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/3/2023 | Modules affected: executable-dependency, instance-type, join-path, list-remove | <a href="https://github.com/gruntwork-io/terraform-aws-utilities/releases/tag/v0.9.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- update codeowners
- Pin Terraform version - [CORE-1297]




</div>



## terraform-aws-vpc


### [v0.26.8](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.26.8)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/12/2023 | Modules affected: network-acl-inbound, network-acl-outbound, transit-gateway-attachment, transit-gateway-peering-attachment-accepter | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.26.8">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Revert Pin Terraform version - [CORE-1297]





</div>


### [v0.26.7](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.26.7)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/4/2023 | Modules affected: network-acl-inbound, network-acl-outbound, transit-gateway-attachment, transit-gateway-peering-attachment-accepter | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.26.7">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Pin Terraform version - [CORE-1297]


</div>

<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "releases",
  "hash": "1bdff6e4633a347f216b6aa59c9ec587"
}
##DOCS-SOURCER-END -->


# Gruntwork release 2023-08

<p style={{marginTop: "-25px"}}><small><a href="/guides">Guides</a> / <a href="/guides/stay-up-to-date">Update Guides</a> / <a href="/guides/stay-up-to-date/releases">Releases</a> / 2023-08</small></p>

This page is lists all the updates to the [Gruntwork Infrastructure as Code
Library](https://gruntwork.io/infrastructure-as-code-library/) that were released in 2023-08. For instructions
on how to use these updates in your code, check out the [updating
documentation](/library/stay-up-to-date/updating).

Here are the repos that were updated:

- [patcher-cli](#patcher-cli)
- [pipelines-cli](#pipelines-cli)
- [repo-copier](#repo-copier)
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
- [terraform-aws-messaging](#terraform-aws-messaging)
- [terraform-aws-monitoring](#terraform-aws-monitoring)
- [terraform-aws-openvpn](#terraform-aws-openvpn)
- [terraform-aws-security](#terraform-aws-security)
- [terraform-aws-server](#terraform-aws-server)
- [terraform-aws-service-catalog](#terraform-aws-service-catalog)
- [terraform-aws-static-assets](#terraform-aws-static-assets)
- [terraform-aws-utilities](#terraform-aws-utilities)
- [terraform-aws-vpc](#terraform-aws-vpc)
- [terrapatch-cli](#terrapatch-cli)


## patcher-cli


### [v0.4.3](https://github.com/gruntwork-io/patcher-cli/releases/tag/v0.4.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/11/2023 | <a href="https://github.com/gruntwork-io/patcher-cli/releases/tag/v0.4.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
This release includes the following improvements:
- First class support for third party module is available in interactive and non-interactive modes
  - Third party modules including your own modules are now automatically updated based on the semver version number
  - Any changes to the semver major version number are treated as breaking changes
  - Changes in the semver minor and patch numbers are treated as safe changes


</div>



## pipelines-cli


### [v0.1.5](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.1.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/30/2023 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.1.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Release duplicated from https://github.com/gruntwork-io/pipelines/releases/tag/v0.1.5

</div>


### [v0.1.4](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.1.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/29/2023 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.1.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Release duplicated from https://github.com/gruntwork-io/pipelines/releases/tag/v0.1.4

</div>


### [v0.1.3](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.1.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/29/2023 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.1.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Release duplicated from https://github.com/gruntwork-io/pipelines/releases/tag/v0.1.3

</div>


### [v0.1.2](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.1.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/23/2023 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.1.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Release duplicated from https://github.com/gruntwork-io/pipelines/releases/tag/v0.1.2

</div>


### [v0.1.1](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.1.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/22/2023 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.1.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Release duplicated from https://github.com/gruntwork-io/pipelines/releases/tag/v0.1.1

</div>


### [v0.1.0](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.1.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/17/2023 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.1.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Release duplicated from https://github.com/gruntwork-io/pipelines/releases/tag/v0.1.0

</div>



## repo-copier


### [v0.3.7](https://github.com/gruntwork-io/repo-copier/releases/tag/v0.3.7)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/29/2023 | <a href="https://github.com/gruntwork-io/repo-copier/releases/tag/v0.3.7">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Disable GitLab checks files to detect LFS pointers on push by @levkohimins in https://github.com/gruntwork-io/repo-copier/pull/206


**Full Changelog**: https://github.com/gruntwork-io/repo-copier/compare/v0.3.6...v0.3.7

</div>


### [v0.3.6](https://github.com/gruntwork-io/repo-copier/releases/tag/v0.3.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/28/2023 | <a href="https://github.com/gruntwork-io/repo-copier/releases/tag/v0.3.6">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
* Added pipeline sample for Azure DevOps. #199 #201 


**Full Changelog**: https://github.com/gruntwork-io/repo-copier/compare/v0.3.5...v0.3.6

</div>


### [v0.3.5](https://github.com/gruntwork-io/repo-copier/releases/tag/v0.3.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/1/2023 | <a href="https://github.com/gruntwork-io/repo-copier/releases/tag/v0.3.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
* Disable certificate verification for the `schannel` SSL backend if the `--insecure` flag is specified. #196 


**Full Changelog**: https://github.com/gruntwork-io/repo-copier/compare/v0.3.4...v0.3.5

</div>



## terraform-aws-asg


### [v0.21.9](https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.21.9)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/22/2023 | Modules affected: asg-instance-refresh, asg-rolling-deploy, server-group | <a href="https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.21.9">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Set Terraform AWS Provider &lt; v6.0.0


</div>



## terraform-aws-cache


### [v0.21.0 - ](https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v0.21.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/25/2023 | <a href="https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v0.21.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * [skip ci] Remove Zack from CODEOWNERS by @zackproser in https://github.com/gruntwork-io/terraform-aws-cache/pull/131
* [skip ci] Removing former Grunts by @eak12913 in https://github.com/gruntwork-io/terraform-aws-cache/pull/132
* AWS provider support for v5 by @hongil0316 in https://github.com/gruntwork-io/terraform-aws-cache/pull/133

* Removed `cluster_mode` variable from the redis module as it&apos;s no longer supported in aws provider version &gt;5.0.0. You should use `num_shards` and `replicas_per_shard` variables instead.

**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-cache/compare/v0.20.2...v0.21.0

</div>



## terraform-aws-ci


### [v0.52.13](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.52.13)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/30/2023 | Modules affected: ec2-backup, ecs-deploy-runner-invoke-iam-policy, ecs-deploy-runner, iam-policies | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.52.13">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Set Terraform AWS Provider &lt; v6.0.0
- ecs deploy runner standard configuration additional allowed options



</div>


### [v0.52.12](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.52.12)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/25/2023 | Modules affected: ecs-deploy-runner | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.52.12">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- update default kubergrunt version




</div>


### [v0.52.11](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.52.11)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/10/2023 | Modules affected: ecs-deploy-runner | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.52.11">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fix ECS deploy runner docker builds: default to a more recent version of the module ci helpers



</div>



## terraform-aws-cis-service-catalog


### [v0.47.9](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.47.9)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/18/2023 | Modules affected: data-stores, landingzone, networking, observability | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.47.9">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Update Docker Image with TF 1.5
- Updated change logs entries to v0.47.9



</div>



## terraform-aws-control-tower


### [v0.0.15](https://github.com/gruntwork-io/terraform-aws-control-tower/releases/tag/v0.0.15)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/23/2023 | <a href="https://github.com/gruntwork-io/terraform-aws-control-tower/releases/tag/v0.0.15">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * CORE-1037 Security Account Baselines by @ellisonc in https://github.com/gruntwork-io/terraform-aws-control-tower/pull/16


**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-control-tower/compare/v0.0.14...v0.0.15

</div>


### [v0.0.14](https://github.com/gruntwork-io/terraform-aws-control-tower/releases/tag/v0.0.14)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/11/2023 | <a href="https://github.com/gruntwork-io/terraform-aws-control-tower/releases/tag/v0.0.14">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Add parallelism block to terraform block in account baseline by @MoonMoon1919 in https://github.com/gruntwork-io/terraform-aws-control-tower/pull/15

* @MoonMoon1919 made their first contribution in https://github.com/gruntwork-io/terraform-aws-control-tower/pull/15

**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-control-tower/compare/v0.0.13...v0.0.14

</div>


### [v0.0.13](https://github.com/gruntwork-io/terraform-aws-control-tower/releases/tag/v0.0.13)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/11/2023 | <a href="https://github.com/gruntwork-io/terraform-aws-control-tower/releases/tag/v0.0.13">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * add service quota for network acl by @ellisonc in https://github.com/gruntwork-io/terraform-aws-control-tower/pull/14


**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-control-tower/compare/v0.0.12...v0.0.13

</div>


### [v0.0.12](https://github.com/gruntwork-io/terraform-aws-control-tower/releases/tag/v0.0.12)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/11/2023 | <a href="https://github.com/gruntwork-io/terraform-aws-control-tower/releases/tag/v0.0.12">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * provide a cidr block in default vpc module by @ellisonc in https://github.com/gruntwork-io/terraform-aws-control-tower/pull/13


**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-control-tower/compare/v0.0.11...v0.0.12

</div>


### [v0.0.11](https://github.com/gruntwork-io/terraform-aws-control-tower/releases/tag/v0.0.11)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/11/2023 | <a href="https://github.com/gruntwork-io/terraform-aws-control-tower/releases/tag/v0.0.11">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * add region.hcl file by @ellisonc in https://github.com/gruntwork-io/terraform-aws-control-tower/pull/12


**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-control-tower/compare/v0.0.10...v0.0.11

</div>


### [v0.0.10](https://github.com/gruntwork-io/terraform-aws-control-tower/releases/tag/v0.0.10)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/11/2023 | <a href="https://github.com/gruntwork-io/terraform-aws-control-tower/releases/tag/v0.0.10">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * fix other modules by @ellisonc in https://github.com/gruntwork-io/terraform-aws-control-tower/pull/11


**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-control-tower/compare/v0.0.9...v0.0.10

</div>


### [v0.0.9](https://github.com/gruntwork-io/terraform-aws-control-tower/releases/tag/v0.0.9)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/10/2023 | <a href="https://github.com/gruntwork-io/terraform-aws-control-tower/releases/tag/v0.0.9">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Add VPC template to account baselines and account-request templates by @ellisonc in https://github.com/gruntwork-io/terraform-aws-control-tower/pull/10

* @ellisonc made their first contribution in https://github.com/gruntwork-io/terraform-aws-control-tower/pull/10

**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-control-tower/compare/v0.0.8...v0.0.9

</div>


### [v0.0.8](https://github.com/gruntwork-io/terraform-aws-control-tower/releases/tag/v0.0.8)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/9/2023 | <a href="https://github.com/gruntwork-io/terraform-aws-control-tower/releases/tag/v0.0.8">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Add auto-generation notice and rename some template variables by @oredavids in https://github.com/gruntwork-io/terraform-aws-control-tower/pull/9


**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-control-tower/compare/v0.0.7...v0.0.8

</div>


### [v0.0.7](https://github.com/gruntwork-io/terraform-aws-control-tower/releases/tag/v0.0.7)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/9/2023 | <a href="https://github.com/gruntwork-io/terraform-aws-control-tower/releases/tag/v0.0.7">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Update the factory template with additional info by @oredavids in https://github.com/gruntwork-io/terraform-aws-control-tower/pull/8


**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-control-tower/compare/v0.0.6...v0.0.7

</div>


### [v0.0.6](https://github.com/gruntwork-io/terraform-aws-control-tower/releases/tag/v0.0.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/8/2023 | <a href="https://github.com/gruntwork-io/terraform-aws-control-tower/releases/tag/v0.0.6">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Add github-oidc module to account baseline template by @oredavids in https://github.com/gruntwork-io/terraform-aws-control-tower/pull/7


**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-control-tower/compare/v0.0.5...v0.0.6

</div>


### [v0.0.5](https://github.com/gruntwork-io/terraform-aws-control-tower/releases/tag/v0.0.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/3/2023 | <a href="https://github.com/gruntwork-io/terraform-aws-control-tower/releases/tag/v0.0.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Fix ternary logic for unspecified accounts.yml variable by @oredavids in https://github.com/gruntwork-io/terraform-aws-control-tower/pull/6


**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-control-tower/compare/v0.0.4...v0.0.5

</div>


### [v0.0.4](https://github.com/gruntwork-io/terraform-aws-control-tower/releases/tag/v0.0.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/3/2023 | <a href="https://github.com/gruntwork-io/terraform-aws-control-tower/releases/tag/v0.0.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * [CORE-1111] Fix accounts.yaml bugs by @oredavids in https://github.com/gruntwork-io/terraform-aws-control-tower/pull/5


**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-control-tower/compare/v0.0.3...v0.0.4

</div>


### [v0.0.3](https://github.com/gruntwork-io/terraform-aws-control-tower/releases/tag/v0.0.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/2/2023 | <a href="https://github.com/gruntwork-io/terraform-aws-control-tower/releases/tag/v0.0.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * [CORE-1111] Split factory and baseline templates by @oredavids in https://github.com/gruntwork-io/terraform-aws-control-tower/pull/4


**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-control-tower/compare/v0.0.2...v0.0.3

</div>



## terraform-aws-data-storage


### [v0.30.0](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.30.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/25/2023 | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.30.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Feature/expose apply inmediately variable by @umm0n in https://github.com/gruntwork-io/terraform-aws-data-storage/pull/384
* AWS provider support for v5 by @hongil0316 in https://github.com/gruntwork-io/terraform-aws-data-storage/pull/387

* @umm0n made their first contribution in https://github.com/gruntwork-io/terraform-aws-data-storage/pull/384

**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-data-storage/compare/v0.29.2...v0.30.0

</div>


### [v0.29.2](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.29.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/16/2023 | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.29.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Fix ability to use custom subnet group name with RDS module. by @undergroundwebdesigns in https://github.com/gruntwork-io/terraform-aws-data-storage/pull/380
* Fix RDS subnet group bug by @hongil0316 in https://github.com/gruntwork-io/terraform-aws-data-storage/pull/385

* @undergroundwebdesigns made their first contribution in https://github.com/gruntwork-io/terraform-aws-data-storage/pull/380

**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-data-storage/compare/v0.29.1...v0.29.2

</div>


### [v0.29.1](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.29.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/9/2023 | Modules affected: rds-replicas, rds, aurora | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.29.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Test connection + simplify TestAuroraWithCrossRegionReplica test
- Support restore_to_point_in_time for RDS
- Documentation for Cross Region RDS failover + Custom Identifiers for Read Replica
- Introduce a new variable for storage_type in Aurora module
- Introduce a new variable to set network_type




</div>



## terraform-aws-ecs


### [v0.35.10](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.35.10)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/28/2023 | Modules affected: ecs-cluster, ecs-daemon-service, ecs-service | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.35.10">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Feature - Support for aws provider v5



</div>



## terraform-aws-eks


### [v0.62.0](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.62.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/31/2023 | Modules affected: eks-alb-ingress-controller-iam-policy, eks-alb-ingress-controller, eks-aws-auth-merger, eks-cloudwatch-agent | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.62.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Add AWS Provider V5 Support!
- Update Gruntwork modules dependencies to latest versions to support AWS Provider V5.



</div>


### [v0.61.1](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.61.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/31/2023 | Modules affected: eks-container-logs | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.61.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Expose additional helm chart configs for eks-container-logs



</div>


### [v0.61.0](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.61.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/3/2023 | Modules affected: eks-cluster-control-plane, eks-k8s-cluster-autoscaler, eks-container-logs | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.61.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Add configurable default filter options for aws-for-fluent-bit
- Expose EKS add-ons advanced configuration attribute
- Updated AWS provider version constraints to &gt;= v4.47.0


</div>



## terraform-aws-lambda


### [v0.21.13](https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.21.13)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/22/2023 | Modules affected: api-gateway-account-settings, api-gateway-proxy, keep-warm, lambda-edge-log-group | <a href="https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.21.13">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Set Terraform AWS Provider &lt; v6.0.0


</div>



## terraform-aws-load-balancer


### [v0.29.11](https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.29.11)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/21/2023 | Modules affected: acm-tls-certificate, alb, lb-listener-rules | <a href="https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.29.11">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Feature - AWS Provider updates for v5.x



</div>



## terraform-aws-messaging


### [v0.12.2](https://github.com/gruntwork-io/terraform-aws-messaging/releases/tag/v0.12.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/22/2023 | <a href="https://github.com/gruntwork-io/terraform-aws-messaging/releases/tag/v0.12.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Set Terraform AWS Provider &lt; v6.0.0

**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-messaging/compare/v0.12.1...v0.12.2

</div>



## terraform-aws-monitoring


### [v0.36.3](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.36.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/22/2023 | Modules affected: alarms, logs, metrics | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.36.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- [skip ci] Removing former Grunts
- CircleCi: job separation for improved test logic
- Bump requests from 2.25.1 to 2.31.0 in /examples/lambda-alarms/python
- Update to fix flaky tests
- Feature - AWS Provider v5.0.0 support 



</div>



## terraform-aws-openvpn


### [v0.26.5](https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.26.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/22/2023 | Modules affected: openvpn-server | <a href="https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.26.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fixed setting properties for root disk
- Set Terraform AWS Provider &lt; v6.0.0





</div>



## terraform-aws-security


### [v0.69.0](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.69.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/24/2023 | Modules affected: cross-account-iam-roles, custom-iam-entity, github-actions-iam-role, iam-groups | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.69.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- Update GHA IAM Role module


</div>


### [v0.68.6](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.68.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/18/2023 | Modules affected: custom-iam-entity, secrets-manager-resource-policies | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.68.6">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Removing former Grunts
- Updated change log entries to v0.68.6



</div>



## terraform-aws-server


### [v0.15.6](https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.15.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/23/2023 | Modules affected: ec2-backup, single-server | <a href="https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.15.6">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Updated to support AWS Provider v5 





</div>



## terraform-aws-service-catalog


### [v0.104.19](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.104.19)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/29/2023 | Modules affected: networking | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.104.19">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Pass through inputs for custom flow logs S3 bucket location



</div>


### [v0.104.18](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.104.18)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/24/2023 | Modules affected: services/eks-cluster, services/k8s-service | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.104.18">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Expose `cluster_network_config_ip_family` and `cluster_network_config_service_ipv4_cidr` variables in the EKS module
- Expose additional helm chart values for annotations.



</div>


### [v0.104.17](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.104.17)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/18/2023 | Modules affected: services, data-stores, mgmt, networking | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.104.17">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Add output for eks-cluster: eks_cluster_endpoint
- Update change log entries to v0.104.17



</div>



## terraform-aws-static-assets


### [v0.17.2](https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.17.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/22/2023 | Modules affected: s3-cloudfront, s3-static-website | <a href="https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.17.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Set Terraform AWS Provider &lt; v6.0.0


</div>



## terraform-aws-utilities


### [v0.9.4](https://github.com/gruntwork-io/terraform-aws-utilities/releases/tag/v0.9.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/21/2023 | Modules affected: instance-type, request-quota-increase | <a href="https://github.com/gruntwork-io/terraform-aws-utilities/releases/tag/v0.9.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Feature - AWS provider support for v5



</div>


### [v0.9.3](https://github.com/gruntwork-io/terraform-aws-utilities/releases/tag/v0.9.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/18/2023 | Modules affected: request-quota-increase | <a href="https://github.com/gruntwork-io/terraform-aws-utilities/releases/tag/v0.9.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Remove Zack from CODEOWNERS
- Updated change log entries to v0.9.3




</div>



## terraform-aws-vpc


### [v0.26.5](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.26.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/26/2023 | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.26.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Bugfix - updated utilities pinned version to 0.9.4



</div>


### [v0.26.4](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.26.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/21/2023 | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.26.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Resolved flaky vpc endpoint tests by reducing the quantity of VPC endpoint tests in the example to just be in `vpc-app` and `vpc-app-with-endpoint`



</div>


### [v0.26.3](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.26.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/18/2023 | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.26.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Converted LogF to Log function in tests



</div>


### [v0.26.2](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.26.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/18/2023 | Modules affected: _docs, transit-gateway-attachment, transit-gateway-peering-attachment-accepter, transit-gateway-peering-attachment | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.26.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- feature: Implementation of Transit Gateway modules



</div>


### [v0.26.1](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.26.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/10/2023 | Modules affected: vpc-flow-logs | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.26.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- fix: don&apos;t coalesce flow log options if create_resources is false
- Fix #335 



</div>



## terrapatch-cli


### [v0.1.3](https://github.com/gruntwork-io/terrapatch-cli/releases/tag/v0.1.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/16/2023 | <a href="https://github.com/gruntwork-io/terrapatch-cli/releases/tag/v0.1.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Release duplicated from https://github.com/gruntwork-io/terrapatch/releases/tag/v0.1.3

</div>


### [v0.1.2](https://github.com/gruntwork-io/terrapatch-cli/releases/tag/v0.1.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/11/2023 | <a href="https://github.com/gruntwork-io/terrapatch-cli/releases/tag/v0.1.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Release duplicated from https://github.com/gruntwork-io/terrapatch/releases/tag/v0.1.2

</div>

<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "releases",
  "hash": "e87f89da902a1e90c9d5382f4e084476"
}
##DOCS-SOURCER-END -->

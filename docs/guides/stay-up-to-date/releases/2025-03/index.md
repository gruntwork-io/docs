
# Gruntwork release 2025-03

<p style={{marginTop: "-25px"}}><small><a href="/guides">Guides</a> / <a href="/guides/stay-up-to-date">Update Guides</a> / <a href="/guides/stay-up-to-date/releases">Releases</a> / 2025-03</small></p>

This page is lists all the updates to the [Gruntwork Infrastructure as Code
Library](https://gruntwork.io/infrastructure-as-code-library/) that were released in 2025-03. For instructions
on how to use these updates in your code, check out the [updating
documentation](/library/stay-up-to-date/updating).

Here are the repos that were updated:

- [pipelines-actions](#pipelines-actions)
- [pipelines-cli](#pipelines-cli)
- [pipelines-workflows](#pipelines-workflows)
- [terraform-aws-architecture-catalog](#terraform-aws-architecture-catalog)
- [terraform-aws-ci](#terraform-aws-ci)
- [terraform-aws-ci-steampipe](#terraform-aws-ci-steampipe)
- [terraform-aws-cis-service-catalog](#terraform-aws-cis-service-catalog)
- [terraform-aws-ecs](#terraform-aws-ecs)
- [terraform-aws-eks](#terraform-aws-eks)
- [terraform-aws-security](#terraform-aws-security)
- [terraform-aws-service-catalog](#terraform-aws-service-catalog)
- [terraform-aws-static-assets](#terraform-aws-static-assets)
- [terraform-aws-vpc](#terraform-aws-vpc)
- [terrapatch-cli](#terrapatch-cli)


## pipelines-actions


### [v3.4.3](https://github.com/gruntwork-io/pipelines-actions/releases/tag/v3.4.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/6/2025 | <a href="https://github.com/gruntwork-io/pipelines-actions/releases/tag/v3.4.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * fix: don&apos;t explode if one of the json files is invalid during comment artifact aggregation by @ZachGoldberg in https://github.com/gruntwork-io/pipelines-actions/pull/114


**Full Changelog**: https://github.com/gruntwork-io/pipelines-actions/compare/v3.4.2...v3.4.3

</div>


### [v3.4.2](https://github.com/gruntwork-io/pipelines-actions/releases/tag/v3.4.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/6/2025 | <a href="https://github.com/gruntwork-io/pipelines-actions/releases/tag/v3.4.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Plumb stderr from pipelines execute into the comment when pipelines execute fails by @ZachGoldberg in https://github.com/gruntwork-io/pipelines-actions/pull/113


**Full Changelog**: https://github.com/gruntwork-io/pipelines-actions/compare/v3.4.1...v3.4.2

</div>



## pipelines-cli


### [v0.36.6](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.36.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/21/2025 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.36.6">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * When codebases have both pipelines config-as-code (HCL) and `config.yml` configs, we now prefer the HCL configs for `deploy_branch_name` and `tf_binary` 
* Pipelines no longer crashes if `config.yml` is missing when run in GitHub with _only_ HCL based configuration.

* DEV-841: Prefer HCL configs in github legacy config parsing when present by @ZachGoldberg in https://github.com/gruntwork-io/pipelines/pull/343


**Full Changelog**: https://github.com/gruntwork-io/pipelines/compare/v0.36.5...v0.36.6


</div>


### [v0.36.5](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.36.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/17/2025 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.36.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Bump golang.org/x/net from 0.33.0 to 0.36.0 by @dependabot in https://github.com/gruntwork-io/pipelines/pull/339
* fix: Addressing `gopls` findings by @yhakbar in https://github.com/gruntwork-io/pipelines/pull/340
* DEV-822 Fix download artifacts should not attempt to download non-existant files by @Resonance1584 in https://github.com/gruntwork-io/pipelines/pull/338
* Remove stage names from e2e tests by @Resonance1584 in https://github.com/gruntwork-io/pipelines/pull/341
* Make preflight comments collapsible and link to logs by @oredavids in https://github.com/gruntwork-io/pipelines/pull/342


**Full Changelog**: https://github.com/gruntwork-io/pipelines/compare/v0.36.4...v0.36.5


</div>


### [v0.36.4](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.36.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/12/2025 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.36.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Add GitLab log grouping by @Resonance1584 in https://github.com/gruntwork-io/pipelines/pull/336
* Remove log noise. Make errors red in gitlab by @Resonance1584 in https://github.com/gruntwork-io/pipelines/pull/337
* Fix merge commits preflight check error by @oredavids in https://github.com/gruntwork-io/pipelines/pull/334
* Add comment length checks by @oredavids in https://github.com/gruntwork-io/pipelines/pull/335


**Full Changelog**: https://github.com/gruntwork-io/pipelines/compare/v0.36.3...v0.36.4


</div>


### [v0.36.3](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.36.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/7/2025 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.36.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Add a skipped test demonstrating DEV-813 by @ZachGoldberg in https://github.com/gruntwork-io/pipelines/pull/332
* DEV-814: Check origin main for latest-main terragruntexecute validation by @ZachGoldberg in https://github.com/gruntwork-io/pipelines/pull/333


**Full Changelog**: https://github.com/gruntwork-io/pipelines/compare/v0.36.2...v0.36.3


</div>


### [v0.36.2](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.36.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/4/2025 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.36.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * more flexible toml parsing by @ZachGoldberg in https://github.com/gruntwork-io/pipelines/pull/330


**Full Changelog**: https://github.com/gruntwork-io/pipelines/compare/v0.36.1...v0.36.2


</div>



## pipelines-workflows


### [v3.7.9](https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v3.7.9)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/6/2025 | <a href="https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v3.7.9">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
This release changes the behavior of pipelines comment generation to ignore any comment artifacts that, for whatever reason, contain invalid json. Previously such invalid artifacts would cause the comment generation to fail entirely, now instead it continues and emits a warning.

* bump actions to 3.4.3 by @ZachGoldberg in https://github.com/gruntwork-io/pipelines-workflows/pull/113


**Full Changelog**: https://github.com/gruntwork-io/pipelines-workflows/compare/v3...v3.7.9

</div>


### [v3.7.8](https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v3.7.8)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/6/2025 | <a href="https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v3.7.8">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
If `pipelines-execute` exits with non-zero return code we now forward stderr to the comment.

* Bump to actions 3.4.2 by @ZachGoldberg in https://github.com/gruntwork-io/pipelines-workflows/pull/112


**Full Changelog**: https://github.com/gruntwork-io/pipelines-workflows/compare/v3...v3.7.8

</div>


### [v3.7.7](https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v3.7.7)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/4/2025 | <a href="https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v3.7.7">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
* Increase to pipelines cli v0.36.2 which includes updates to TOML parsing to avoid warnings/errors in logs for more sophisticated mise toml configurations

**Full Changelog**: https://github.com/gruntwork-io/pipelines-workflows/compare/v3...v3.7.7

</div>



## terraform-aws-architecture-catalog


### [v2.12.10](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.12.10)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/13/2025 | <a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.12.10">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Use newer OIDC provider API by @ZachGoldberg in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1141


**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-architecture-catalog/compare/v2.12.9...v2.12.10

</div>


### [v2.12.9](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.12.9)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/13/2025 | <a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.12.9">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Use components hosted in gitlab for gitlab workflows by @oredavids in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1140


**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-architecture-catalog/compare/v2.12.8...v2.12.9

</div>


### [v2.12.8](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.12.8)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/13/2025 | <a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.12.8">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Bugfix in recently released gitlab templates

**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-architecture-catalog/compare/v2.12.7...v2.12.8

</div>


### [v2.12.7](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.12.7)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/13/2025 | <a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.12.7">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * New Template: Pipelines-Independent Gruntwork Landing Zone by @ZachGoldberg in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1137


**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-architecture-catalog/compare/v2.12.6...v2.12.7

</div>


### [v2.12.6](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.12.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/7/2025 | <a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.12.6">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * chore: add elasticache to default pipelines gitlab roles by @ZachGoldberg in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1139


**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-architecture-catalog/compare/v2.12.5...v2.12.6

</div>


### [v2.12.5](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.12.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/6/2025 | <a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.12.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Reduce confusion in yaml file by removing double colin by @ZachGoldberg in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1138


**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-architecture-catalog/compare/v2.12.4...v2.12.5

</div>



## terraform-aws-ci


### [v0.60.0](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.60.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/3/2025 | Modules affected: ecs-deploy-runner, infrastructure-deployer | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.60.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- SME-1851: Upgrade to aws-sdk-go-v2


</div>



## terraform-aws-ci-steampipe


### [v0.3.5](https://github.com/gruntwork-io/terraform-aws-ci-steampipe/releases/tag/v0.3.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/13/2025 | <a href="https://github.com/gruntwork-io/terraform-aws-ci-steampipe/releases/tag/v0.3.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- fix: Refactor contexts
- chore: Add Terrascan to CI - CORE-1371
- chore: LIB-83: Replace tfenv and tgswitch with mise
- chore: Bump golang.org/x/net from 0.28.0 to 0.33.0 in /test
- chore: Bump golang.org/x/net from 0.33.0 to 0.36.0 in /test


</div>



## terraform-aws-cis-service-catalog


### [v0.57.0](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.57.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/3/2025 | Modules affected: networking | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.57.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Enforced no ingress\egress rules in VPC&apos;s default SG


</div>



## terraform-aws-ecs


### [v0.38.9](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.38.9)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/24/2025 | Modules affected: ecs-cluster | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.38.9">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Added new vars that allows user to specify egress CIDR, protocol, and from/to port range for ecs-cluster security group egress





</div>


### [v0.38.8](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.38.8)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/17/2025 | Modules affected: ecs-cluster | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.38.8">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- tests: Bump golang.org/x/net from 0.33.0 to 0.36.0
- `ecs-cluster`: support `update_default_version`




</div>


### [v0.38.7](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.38.7)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/7/2025 | Modules affected: ecs-service, ecs-daemon-service | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.38.7">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- ecs-service: Adding feature that picks up an existing Task Definition
- ecs-service and ecs-daemon-service: Add availability_zone_rebalancing parameter to ECS service resources



</div>



## terraform-aws-eks


### [v0.76.1](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.76.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/27/2025 | Modules affected: tests | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.76.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Bump golang.org/x/crypto from 0.21.0 to 0.31.0 in /test


</div>


### [v0.76.0](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.76.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/19/2025 | Modules affected: eks-aws-auth-merger | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.76.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Bump golang.org/x/net from 0.23.0 to 0.36.0 in /modules/eks-aws-auth-merger/aws-auth-merger
- Bump `aws-auth-merger` from Go 1.18 to 1.23


</div>


### [v0.75.0](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.75.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/13/2025 | Modules affected: eks-cluster-control-plane | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.75.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Add Support For EKS Auto Mode



</div>


### [v0.74.2](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.74.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/10/2025 | Modules affected: eks-cluster-control-plane | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.74.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Add support prefix lists for the EKS API security group.



</div>


### [v0.74.1](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.74.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/10/2025 | Modules affected: eks-alb-ingress-controller | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.74.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fix ALB ingress controller pod scheduling



</div>


### [v0.74.0](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.74.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/4/2025 | Modules affected: eks-cluster-control-plane | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.74.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Updated EKS Security Group name to address potential issue with Security Group name collisions with other modules.
    - New variable added `security_group_name` for the ability to provide a name for the Security Group.



</div>



## terraform-aws-security


### [v0.75.15](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.75.15)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/31/2025 | Modules affected: gitlab-pipelines-openid-connect-provider | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.75.15">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- `gitlab-pipelines-openid-connect-provider`




- Add configurable GitLab URL for self-hosted GitLab instances



- https://github.com/gruntwork-io/terraform-aws-security/pull/878




</div>


### [v0.75.14](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.75.14)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/21/2025 | Modules affected: custom-iam-entity | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.75.14">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Added new var `iam_role_path` that allows user to specify the IAM Role Path.



</div>


### [v0.75.13](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.75.13)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/13/2025 | Modules affected: auto-update | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.75.13">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Set dnf-automatic.txt to security updates



</div>


### [v0.75.12](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.75.12)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/13/2025 | Modules affected: fail2ban | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.75.12">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Update Amazon Linux 2023 documentation
- Update go modules used by tests (no functional change)




</div>


### [v0.75.11](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.75.11)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/6/2025 | Modules affected: github-actions-openid-connect-provider, gitlab-pipelines-openid-connect-provider | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.75.11">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- `github-actions-openid-connect-provider`
- `gitlab-pipelines-openid-connect-provider`


- Feature: Add &quot;audiences&quot; input to gitlab and github oidc provider modules
- Chore: Use new configtests account for automated tests



- https://github.com/gruntwork-io/terraform-aws-security/pull/870
- https://github.com/gruntwork-io/terraform-aws-security/pull/867



</div>



## terraform-aws-service-catalog


### [v0.121.1](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.121.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/26/2025 | Modules affected: services/eks-workers | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.121.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Add variable `asg_worker_enable_cloudwatch_alarms` to enable/disable CloudWatch alarms for EKS Self-Managed Workers Auto-Scaling Groups (ASG).



</div>


### [v0.121.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.121.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/19/2025 | Modules affected: networking, services | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.121.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- Changed source module version `modules/eks-cluster-control-plane` from `v0.73.2` to `v0.74.0`.



</div>


### [v0.120.1](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.120.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/19/2025 | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.120.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Bump golang.org/x/net from 0.33.0 to 0.36.0 in /test


</div>


### [v0.120.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.120.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/18/2025 | Modules affected: networking, services | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.120.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Changed source module version modules/eks-cluster-control-plane from v0.72.2 to v0.73.2.



</div>


### [v0.119.2](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.119.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/17/2025 | Modules affected: services | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.119.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- `services/ecs-service`: Update version for terraform-aws-ecs module used to v0.38.7



</div>


### [v0.119.1](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.119.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/7/2025 | Modules affected: data-stores | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.119.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Added dynamic partition to `modules\data-stores\s3-bucket`.


</div>


### [v0.119.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.119.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/6/2025 | Modules affected: base, services | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.119.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Added EBS volumes controls in ASGs.
- Set required Terraform version to `&gt;= 1.3.0`.
- Added dynamic `block_device_mappings` configuration to `modules/services/asg-service/main.tf` to enable customizable EBS volume attachments. Examples have been updated to reflect this new capability.
- Changed the value of `gzip` from `true` to `false` in `modules/base/ec2-baseline/main.tf`. This resolves an issue where EC2 service couldn&apos;t decode user data because it was both base64-encoded and gzipped. Removing gzip compression allows EC2 to properly process the user data.
- Added `update_default_version = true` to `aws_launch_template` in `modules/services/asg-service/main.tf` to automatically set the default version to the latest when the template is updated.
- Modified var.custom_user_data_override handling in modules/services/asg-service/main.tf to accept inline text instead of a file path. This change enables direct string input in the resource, passing File content via `file()` function and template rendering via `templatefile()` function with variable substitution.



</div>


### [v0.118.22](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.118.22)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/6/2025 | Modules affected: services | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.118.22">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Add input to pass existing ecs task execution role



</div>


### [v0.118.21](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.118.21)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/4/2025 | Modules affected: networking, services | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.118.21">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Bump `terraform-aws-eks version` to v0.72.3


</div>


### [v0.118.20](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.118.20)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/4/2025 | Modules affected: networking, services | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.118.20">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Bump `terraform-aws-eks version` to v0.72.3


</div>



## terraform-aws-static-assets


### [v0.20.3](https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.20.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/4/2025 | Modules affected: cloudfront | <a href="https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.20.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Added support of logging V2 for Cloudfront



</div>



## terraform-aws-vpc


### [v0.28.4](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.28.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/24/2025 | Modules affected: vpc-interface-endpoint | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.28.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Bump golang.org/x/net from 0.33.0 to 0.36.0 in /test
- Added ElastiCache Endpoint


</div>



## terrapatch-cli


### [v0.2.2](https://github.com/gruntwork-io/terrapatch-cli/releases/tag/v0.2.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/13/2025 | <a href="https://github.com/gruntwork-io/terrapatch-cli/releases/tag/v0.2.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Release duplicated from https://github.com/gruntwork-io/terrapatch/releases/tag/v0.2.2

</div>

<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "releases",
  "hash": "cb6188b60e4153c8ebc88bce6f85065a"
}
##DOCS-SOURCER-END -->

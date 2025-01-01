
# Gruntwork release 2024-06

<p style={{marginTop: "-25px"}}><small><a href="/guides">Guides</a> / <a href="/guides/stay-up-to-date">Update Guides</a> / <a href="/guides/stay-up-to-date/releases">Releases</a> / 2024-06</small></p>

This page is lists all the updates to the [Gruntwork Infrastructure as Code
Library](https://gruntwork.io/infrastructure-as-code-library/) that were released in 2024-06. For instructions
on how to use these updates in your code, check out the [updating
documentation](/library/stay-up-to-date/updating).

Here are the repos that were updated:

- [patcher-cli](#patcher-cli)
- [pipelines-actions](#pipelines-actions)
- [pipelines-cli](#pipelines-cli)
- [pipelines-workflows](#pipelines-workflows)
- [terraform-aws-architecture-catalog](#terraform-aws-architecture-catalog)
- [terraform-aws-ci](#terraform-aws-ci)
- [terraform-aws-cis-service-catalog](#terraform-aws-cis-service-catalog)
- [terraform-aws-control-tower](#terraform-aws-control-tower)
- [terraform-aws-data-storage](#terraform-aws-data-storage)
- [terraform-aws-ecs](#terraform-aws-ecs)
- [terraform-aws-eks](#terraform-aws-eks)
- [terraform-aws-lambda](#terraform-aws-lambda)
- [terraform-aws-load-balancer](#terraform-aws-load-balancer)
- [terraform-aws-monitoring](#terraform-aws-monitoring)
- [terraform-aws-server](#terraform-aws-server)
- [terraform-aws-service-catalog](#terraform-aws-service-catalog)


## patcher-cli


### [v0.8.4](https://github.com/gruntwork-io/patcher-cli/releases/tag/v0.8.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/18/2024 | <a href="https://github.com/gruntwork-io/patcher-cli/releases/tag/v0.8.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Patcher now supports multiple working directories when using the `update` and `report` commands. e.g: `patcher update dev stage`

**Full Changelog**: https://github.com/gruntwork-io/patcher-cli/compare/v0.8.3...v0.8.4

</div>


### [v0.8.3](https://github.com/gruntwork-io/patcher-cli/releases/tag/v0.8.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/12/2024 | <a href="https://github.com/gruntwork-io/patcher-cli/releases/tag/v0.8.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Fixed a workaround in our CI pipelines when using macOS M1 instances.

**Full Changelog**: https://github.com/gruntwork-io/patcher-cli/compare/v0.8.2...v0.8.3

</div>


### [v0.8.2](https://github.com/gruntwork-io/patcher-cli/releases/tag/v0.8.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/12/2024 | <a href="https://github.com/gruntwork-io/patcher-cli/releases/tag/v0.8.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Changed the exit code from 1 to 0, when no dependencies are available to update
* Further security updates.

**Full Changelog**: https://github.com/gruntwork-io/patcher-cli/compare/v0.8.1...v0.8.2

</div>


### [v0.8.1](https://github.com/gruntwork-io/patcher-cli/releases/tag/v0.8.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/11/2024 | <a href="https://github.com/gruntwork-io/patcher-cli/releases/tag/v0.8.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * You can now specify multiple `--target` flags when using the `update` command non-interactively.

**Full Changelog**: https://github.com/gruntwork-io/patcher-cli/compare/v0.8.0...v0.8.1

</div>



## pipelines-actions


### [v1.3.4](https://github.com/gruntwork-io/pipelines-actions/releases/tag/v1.3.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/24/2024 | <a href="https://github.com/gruntwork-io/pipelines-actions/releases/tag/v1.3.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Bump default terragrunt to v0.59.5 by @Resonance1584 in https://github.com/gruntwork-io/pipelines-actions/pull/25


**Full Changelog**: https://github.com/gruntwork-io/pipelines-actions/compare/v1.3.3...v1.3.4

</div>


### [v1.3.3](https://github.com/gruntwork-io/pipelines-actions/releases/tag/v1.3.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/14/2024 | <a href="https://github.com/gruntwork-io/pipelines-actions/releases/tag/v1.3.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Cleanup redundant mgmt auth by @Resonance1584 in https://github.com/gruntwork-io/pipelines-actions/pull/22
* feat: Migrating unnecssary configs out by @yhakbar in https://github.com/gruntwork-io/pipelines-actions/pull/21


**Full Changelog**: https://github.com/gruntwork-io/pipelines-actions/compare/v1.3.2...v1.3.3

</div>


### [v1.3.2](https://github.com/gruntwork-io/pipelines-actions/releases/tag/v1.3.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/12/2024 | <a href="https://github.com/gruntwork-io/pipelines-actions/releases/tag/v1.3.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * fix: Only show summary for plans by @yhakbar in https://github.com/gruntwork-io/pipelines-actions/pull/20


**Full Changelog**: https://github.com/gruntwork-io/pipelines-actions/compare/v1.3.1...v1.4.0

</div>


### [v1.3.1](https://github.com/gruntwork-io/pipelines-actions/releases/tag/v1.3.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/4/2024 | <a href="https://github.com/gruntwork-io/pipelines-actions/releases/tag/v1.3.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Use pipelines_jobs output by @Resonance1584 in https://github.com/gruntwork-io/pipelines-actions/pull/16


**Full Changelog**: https://github.com/gruntwork-io/pipelines-actions/compare/v1.3.0...v1.3.1

</div>



## pipelines-cli


### [v0.13.2](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.13.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/24/2024 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.13.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Release duplicated from https://github.com/gruntwork-io/pipelines/releases/tag/v0.13.2

</div>


### [v0.13.1](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.13.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/24/2024 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.13.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Release duplicated from https://github.com/gruntwork-io/pipelines/releases/tag/v0.13.1

</div>


### [v0.13.0](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.13.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/24/2024 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.13.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Release duplicated from https://github.com/gruntwork-io/pipelines/releases/tag/v0.13.0

</div>


### [v0.12.1](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.12.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/20/2024 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.12.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Release duplicated from https://github.com/gruntwork-io/pipelines/releases/tag/v0.12.1

</div>


### [v0.11.2](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.11.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/12/2024 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.11.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Release duplicated from https://github.com/gruntwork-io/pipelines/releases/tag/v0.11.2

</div>


### [v0.11.0](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.11.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/10/2024 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.11.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Release duplicated from https://github.com/gruntwork-io/pipelines/releases/tag/v0.11.0

</div>


### [v0.10.1](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.10.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/4/2024 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.10.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Release duplicated from https://github.com/gruntwork-io/pipelines/releases/tag/v0.10.1

</div>



## pipelines-workflows


### [v1.5.0](https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v1.5.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/17/2024 | <a href="https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v1.5.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Remove out of date comment by @Resonance1584 in https://github.com/gruntwork-io/pipelines-workflows/pull/35
* chore: Bump `pipelines-actions` to `v1.3.3` by @yhakbar in https://github.com/gruntwork-io/pipelines-workflows/pull/36

As of this release, the `gruntwork-installer-version` and `boilerplate-version` versions are no longer configurable in the `.gruntwork/config.yml` in `infrastructure-live` repositories.

They are now configurable as environment variables directly in the workflows instead, as the average customer has no need to configure them on a per-infrastructure-live repository basis.

No action needs to be taken to adopt this change. Just take note that the configurations in `.gruntwork/config.yml` will be ignored if present.

**Full Changelog**: https://github.com/gruntwork-io/pipelines-workflows/compare/v1...v1.5.0

</div>


### [v1.4.0](https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v1.4.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/13/2024 | <a href="https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v1.4.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Add runner as input by @Resonance1584 in https://github.com/gruntwork-io/pipelines-workflows/pull/34
* chore: Bump `pipelines-actions` to `1.3.2` by @yhakbar in https://github.com/gruntwork-io/pipelines-workflows/pull/33
* feat: Migrating unnecessary configs out of `.gruntwork/config.yml` by @yhakbar in https://github.com/gruntwork-io/pipelines-workflows/pull/32


**Full Changelog**: https://github.com/gruntwork-io/pipelines-workflows/compare/v1...v1.4.0

</div>


### [v1.3.2](https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v1.3.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/4/2024 | <a href="https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v1.3.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Bump pipelines to 0.10.1 actions to 1.3.1 by @Resonance1584 in https://github.com/gruntwork-io/pipelines-workflows/pull/31


**Full Changelog**: https://github.com/gruntwork-io/pipelines-workflows/compare/v1...v1.3.2

</div>


### [v1.3.1](https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v1.3.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/3/2024 | <a href="https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v1.3.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Upgrade pipelines-cli and actions to use tfplan output by @Resonance1584 in https://github.com/gruntwork-io/pipelines-workflows/pull/30


**Full Changelog**: https://github.com/gruntwork-io/pipelines-workflows/compare/v1...v1.3.1

</div>



## terraform-aws-architecture-catalog


### [v2.3.7](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.3.7)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/28/2024 | <a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.3.7">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Hide IPAM in default DF configurations by @ZachGoldberg in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1093


**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-architecture-catalog/compare/v2.3.6...v2.3.7

</div>


### [v2.3.6](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.3.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/17/2024 | <a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.3.6">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * chore: Removing unnecessary configs from gruntwork config by @yhakbar in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1092


**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-architecture-catalog/compare/v2.3.5...v2.3.6

</div>


### [v2.3.5](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.3.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/14/2024 | <a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.3.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * fix: correct source to `sso-groups` module by @bendavies in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1091

* @bendavies made their first contribution in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1091

**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-architecture-catalog/compare/v2.3.4...v2.3.5

</div>


### [v2.3.4](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.3.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/7/2024 | <a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.3.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * fix: Adding extra `root-pipelines` permissions by @yhakbar in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1090


**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-architecture-catalog/compare/v2.3.3...v2.3.4

</div>


### [v2.3.3](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.3.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/4/2024 | <a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.3.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * chore: add docs for tf-binary by @ZachGoldberg in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1089


**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-architecture-catalog/compare/v2.3.2...v2.3.3

</div>



## terraform-aws-ci


### [v0.57.3](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.57.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/20/2024 | Modules affected: ecs-deploy-runner | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.57.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Bump google.golang.org/grpc from 1.51.0 to 1.56.3 in /test/upgrade-tester
- Bump golang.org/x/net from 0.19.0 to 0.23.0 in /modules/ecs-deploy-runner/entrypoint
- Bump github.com/docker/docker from 23.0.6+incompatible to 24.0.9+incompatible in /modules/ecs-deploy-runner/docker/kaniko
- Bump github.com/hashicorp/go-getter from 1.7.1 to 1.7.4 in /test
- Bump google.golang.org/protobuf from 1.31.0 to 1.33.0 in /test/upgrade-tester
- Fix: Bump EDR pin




</div>


### [v0.57.2](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.57.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/17/2024 | Modules affected: gruntwork-module-circleci-helpers | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.57.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fix: gox install



</div>


### [v0.57.1](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.57.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/14/2024 | Modules affected: ecs-deploy-runner | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.57.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- SME-932: Fix deploy runner


</div>


### [v0.57.0](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.57.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/6/2024 | Modules affected: gruntwork-module-circleci-helpers, sign-binary-helpers | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.57.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- fix: Fixing `gon` for use in ARM machines by building `gon` from source


</div>



## terraform-aws-cis-service-catalog


### [v0.52.0](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.52.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/26/2024 | Modules affected: security/aws-securityhub | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.52.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- Expose missing configuration options for Security Hub. The values default to [provider defaults](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/securityhub_account#argument-reference).
- Update min. provider constraints to match the Security Hub features.


</div>


### [v0.51.2](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.51.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/22/2024 | Modules affected: networking/vpc | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.51.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- Propagate missing variables and outputs from underlying vpc module
- Fix R53 zone and MySQL version in tests


</div>



## terraform-aws-control-tower


### [v0.7.6](https://github.com/gruntwork-io/terraform-aws-control-tower/releases/tag/v0.7.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/5/2024 | Modules affected: landingzone/control-tower-multi-account-factory, landingzone/control-tower-controls, landingzone/organizational-units | <a href="https://github.com/gruntwork-io/terraform-aws-control-tower/releases/tag/v0.7.6">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- `landingzone/control-tower-multi-account-factory`
- `landingzone/control-tower-controls` **[NEW]**
- `landingzone/organizational-units` **[NEW]**


- Move OU discovery in `landingzone/control-tower-multi-account-factory` to a separate `organizational-units` module
- New `control-tower-controls` module for deploying AWS Control Tower Controls via Terraform.
- Add `ou_arn` to OU discovery script so it&apos;s equal to Terraform data source output


The release is backward compatible, but the release moves the data source `list_ous_recursively` within `landingzone/control-tower-multi-account-factory` to a separate module. Upgrading to this module version will not change any actual resources, but `destroy` and `create` operations for the data source will appear.


- https://github.com/gruntwork-io/terraform-aws-control-tower/pull/83


</div>



## terraform-aws-data-storage


### [v0.37.3](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.37.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/18/2024 | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.37.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Docs Grammar Fix in RDS Proxy



</div>


### [v0.37.2](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.37.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/18/2024 | Modules affected: rds-proxy | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.37.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fix headings in `rds-proxy` docs



</div>


### [v0.37.1](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.37.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/6/2024 | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.37.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Add support for multi auth blocks by @hongil0316 in https://github.com/gruntwork-io/terraform-aws-data-storage/pull/471
* Added resource_id as an output parameter by @adegroff in https://github.com/gruntwork-io/terraform-aws-data-storage/pull/472

* @adegroff made their first contribution in https://github.com/gruntwork-io/terraform-aws-data-storage/pull/472

**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-data-storage/compare/v0.37.0...v0.37.1

</div>



## terraform-aws-ecs


### [v0.38.0](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.38.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/26/2024 | Modules affected: ecs-cluster, ecs-daemon-service, ecs-service, ecs-task-scheduler | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.38.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- `ecs-cluster`
- `ecs-daemon-service`
- `ecs-service`
- `ecs-task-scheduler`


- Add current account condition to IAM roles as [recommended by AWS](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task-iam-roles.html#create_task_iam_policy_and_role).


- https://github.com/gruntwork-io/terraform-aws-ecs/pull/444


</div>


### [v0.37.0](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.37.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/7/2024 | Modules affected: ecs-service, ecs-daemon-service, ecs-deploy-check-binaries, ecs-task-scheduler | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.37.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- `ecs-service` **[BACKWARD INCOMPATIBLE]**
- `ecs-daemon-service` **[BACKWARD INCOMPATIBLE]**
- `ecs-deploy-check-binaries` **[REMOVED]**
- `ecs-task-scheduler`


Remove the `ecs-check-deploy-binaries` module in favour of `wait_for_steady_state` -parameter. This means that the custom Python script is no longer used for checking deployment results as the `wait_for_steady_state` -parameter covers the use cases for the removed custom scripts.



Remove the following module inputs:

- `enable_ecs_deployment_check`
- `deployment_check_timeout_seconds`
- `deployment_check_loglevel`

Default value for `wait_for_steady_state` has been changed to `true` and a new input `service_create_update_timeout` was introduced with a default value of `20m`. Adjust those values to suit your use case.  


- https://github.com/gruntwork-io/terraform-aws-ecs/pull/439


</div>



## terraform-aws-eks


### [v0.67.6](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.67.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/26/2024 | Modules affected: eks-cluster-control-plane, eks-container-logs | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.67.6">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Test fix: TestEKSClusterManagedWorkersWithPrefixDelegation
- Export cluster service_ipv4_cidr as terraform output
- Mask sensitive helm values in `eks-container-logs`



</div>



## terraform-aws-lambda


### [v0.23.0](https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.23.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/25/2024 | Modules affected: lambda-edge-multi-region-log-groups | <a href="https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.23.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

This release updates our multi-region code generators to use [Boilerplate](https://github.com/gruntwork-io/boilerplate).


</div>


### [v0.22.0](https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.22.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/20/2024 | Modules affected: lambda-edge-log-group, lambda-edge-multi-region-log-groups, lambda-edge, lambda-http-api-gateway | <a href="https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.22.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Support for skip_destroy flag in CloudWatch log groups
- Lambda secretmanager example
- create function url of given lambda function
- LIB-108: Enable terrascan, test fixes


</div>



## terraform-aws-load-balancer


### [v0.29.25](https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.29.25)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/17/2024 | Modules affected: alb | <a href="https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.29.25">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- Add support for plain http redirects


</div>


### [v0.29.24](https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.29.24)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/3/2024 | Modules affected: lb-listener-rules | <a href="https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.29.24">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Add missing `authenticate_cognito` attribute for rules that have listener ARNs directly provided



</div>



## terraform-aws-monitoring


### [v0.36.20](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.36.20)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/28/2024 | Modules affected: alarms | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.36.20">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- fix[rds-alarms]: RDS/Aurora Replication Metrics



</div>


### [v0.36.19](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.36.19)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/25/2024 | Modules affected: alarms | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.36.19">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Bump requests from 2.31.0 to 2.32.0 in /examples/lambda-alarms/python
- fix[rds-alarms]: Fix Aurora Replication Metric



</div>



## terraform-aws-server


### [v0.16.0](https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.16.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/20/2024 | Modules affected: single-server | <a href="https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.16.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- LIB-107: Enable terrascan, update single-server default variables


</div>



## terraform-aws-service-catalog


### [v0.112.14](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.112.14)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/19/2024 | Modules affected: networking/vpc | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.112.14">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Propagate missing variables and ouputs from underlying vpc-app module.



</div>


### [v0.112.13](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.112.13)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/18/2024 | Modules affected: base, data-stores, landingzone, mgmt | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.112.13">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- New r53 zone id
- SME-910: Set required terraform version for iam-policies module



</div>

<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "releases",
  "hash": "92ff1a0fbde6481d157c31627735e941"
}
##DOCS-SOURCER-END -->

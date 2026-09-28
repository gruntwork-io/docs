
# Gruntwork release 2026-08

<p style={{marginTop: "-25px"}}><small><a href="/guides">Guides</a> / <a href="/guides/stay-up-to-date">Update Guides</a> / <a href="/guides/stay-up-to-date/releases">Releases</a> / 2026-08</small></p>

This page lists all the updates to the [Gruntwork Infrastructure as Code Library](https://gruntwork.io/infrastructure-as-code-library/) that were released in 2026-08.
For instructions on how to use these updates in your code, check out the [updating documentation](/library/stay-up-to-date/updating).

Here are the repos that were updated:

- [pipelines-actions](#pipelines-actions)
- [pipelines-cli](#pipelines-cli)
- [pipelines-workflows](#pipelines-workflows)
- [terraform-aws-architecture-catalog](#terraform-aws-architecture-catalog)
- [terraform-aws-asg](#terraform-aws-asg)
- [terraform-aws-cis-service-catalog](#terraform-aws-cis-service-catalog)
- [terraform-aws-control-tower](#terraform-aws-control-tower)
- [terraform-aws-monitoring](#terraform-aws-monitoring)
- [terraform-aws-security](#terraform-aws-security)
- [terraform-aws-service-catalog](#terraform-aws-service-catalog)


## pipelines-actions


### [v4.12.0](https://github.com/gruntwork-io/pipelines-actions/releases/tag/v4.12.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/18/2026 | <a href="https://github.com/gruntwork-io/pipelines-actions/releases/tag/v4.12.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Add PIPELINES_GRUNTWORK_READ_TOKEN to hooks by @Resonance1584 in https://github.com/gruntwork-io/pipelines-actions/pull/170


**Full Changelog**: https://github.com/gruntwork-io/pipelines-actions/compare/v4.11.2...v4.12.0

</div>



## pipelines-cli


### [v0.60.0](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.60.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/30/2026 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.60.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Details on user-facing changes will be documented in the release notes for:
- https://github.com/gruntwork-io/pipelines-workflows
- https://gitlab.com/gruntwork-io/pipelines-workflows

</div>


### [v0.59.0](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.59.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/20/2026 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.59.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Details on user-facing changes will be documented in the release notes for:
- https://github.com/gruntwork-io/pipelines-workflows
- https://gitlab.com/gruntwork-io/pipelines-workflows

</div>


### [v0.58.1](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.58.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/14/2026 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.58.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Details on user-facing changes will be documented in the release notes for:
- https://github.com/gruntwork-io/pipelines-workflows
- https://gitlab.com/gruntwork-io/pipelines-workflows

</div>



## pipelines-workflows


### [v4.25.0](https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v4.25.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/31/2026 | <a href="https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v4.25.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

Failed units now show their Terragrunt error inline in the PR comment. Error output is kept ahead of successful-plan logs when the comment has to be trimmed to fit GitHub&apos;s comment character limit.



**Full Changelog**: https://github.com/gruntwork-io/pipelines-workflows/compare/v4.24.0...v4.25.0

</div>


### [v4.24.0](https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v4.24.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/21/2026 | <a href="https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v4.24.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

Added a Pipelines command to execute Gruntwork developed hooks. This feature will be used in an upcoming release when Gruntwork developed hooks become available.

**Full Changelog**: https://github.com/gruntwork-io/pipelines-workflows/compare/v4.23.1...v4.24.0

</div>


### [v4.23.1](https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v4.23.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/14/2026 | <a href="https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v4.23.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Hooks: Writing `pass` to `PIPELINES_HOOK_OUT_RESULT_FILE` no longer logs a warning


- Optimized config loading performance on large estates, resolving a hang on very large configuration sets
- Removed an unnecessary telemetry intialization during terragrunt discovery, which also impacted very large estates


**Full Changelog**: https://github.com/gruntwork-io/pipelines-workflows/compare/v4.23.0...v4.23.1

</div>



## terraform-aws-architecture-catalog


### [v6.1.4](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v6.1.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/5/2026 | <a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v6.1.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * version bumps for CIS and controltower by @x-nightwing in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1218


**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-architecture-catalog/compare/v6.1.3...v6.1.4

</div>


### [v6.1.3](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v6.1.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/4/2026 | <a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v6.1.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Fix: Update include in service quotas to have a name by @odgrim in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1181
* LIB-4203 updating pipelines plan role with eks read only perms by @x-nightwing in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1217


**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-architecture-catalog/compare/v6.1.2...v6.1.3

</div>



## terraform-aws-asg


### [v2.0.0](https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v2.0.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/17/2026 | Modules affected: asg-rolling-deploy | <a href="https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v2.0.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Dropped external Python desired-capacity lookup from asg-rolling-deploy


</div>



## terraform-aws-cis-service-catalog


### [v1.3.0](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v1.3.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/6/2026 | Modules affected: networking, data-stores, security | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v1.3.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- fix: harden cloud-nuke cleanup CI and bump to v0.50.0
- LIB-5081 changes to bump ref terraform-aws-vpc v0.28.13
- Scope cloud-nuke cleanup to repo resource types (v0.51.0)
- Bump cloud-nuke cleanup to v0.52.0 (parallel scan)
- chore(data-stores): bump efs to terraform-aws-data-storage v1.2.0
- increase timeout from 10m to 20m for security hub subscriptions
- fixing codegen timeout values
- LIB-5382: Support VPC Flow Logs delivery to S3 in networking/vpc



</div>


### [v1.2.4](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v1.2.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/5/2026 | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v1.2.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * fixing codegen timeout values by @x-nightwing in https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/pull/660


**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/compare/v1.2.3...v1.2.4

</div>


### [v1.2.3](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v1.2.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/4/2026 | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v1.2.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Scope cloud-nuke cleanup to repo resource types (v0.51.0) by @james00012 in https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/pull/654
* Bump cloud-nuke cleanup to v0.52.0 (parallel scan) by @james00012 in https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/pull/655
* chore(data-stores): bump efs to terraform-aws-data-storage v1.2.0 by @james00012 in https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/pull/656
* increase timeout from 10m to 20m for security hub subscriptions by @odgrim in https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/pull/657


**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/compare/v1.2.2...v1.2.3

</div>



## terraform-aws-control-tower


### [v2.1.1](https://github.com/gruntwork-io/terraform-aws-control-tower/releases/tag/v2.1.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/5/2026 | <a href="https://github.com/gruntwork-io/terraform-aws-control-tower/releases/tag/v2.1.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * bumping cis service catalog to 1.2.4 by @x-nightwing in https://github.com/gruntwork-io/terraform-aws-control-tower/pull/136


**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-control-tower/compare/v2.1.0...v2.1.1

</div>



## terraform-aws-monitoring


### [v1.4.0](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v1.4.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/13/2026 | Modules affected: logs | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v1.4.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- custom lifecycle rules enabled
- test/ci fixes



</div>



## terraform-aws-security


### [v1.7.1](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v1.7.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/31/2026 | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v1.7.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * chore: migrate security terratests to Terratest v2 beta by @james00012 in https://github.com/gruntwork-io/terraform-aws-security/pull/925
* LIB-5530 permissions_boundary variable wiring to outer wrapper by @x-nightwing in https://github.com/gruntwork-io/terraform-aws-security/pull/926


**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-security/compare/v1.7.0...v1.7.1

</div>


### [v1.7.0](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v1.7.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/1/2026 | Modules affected: private-s3-bucket | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v1.7.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- private-s3-bucket: adds feature allowing create objects (files and folders) in the bucket
- CI test fixes




</div>



## terraform-aws-service-catalog


### [v2.15.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v2.15.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/10/2026 | Modules affected: - data-stores | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v2.15.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- data-stores/s3-bucket: adds `var.objects`, a map from object key to that object&apos;s settings, so files and folders can be created in the primary bucket alongside it. Objects inherit the bucket&apos;s encryption, versioning, and object lock configuration. Defaults to an empty map, so existing users see no change.
- data-stores/s3-bucket: adds the `object_keys`, `object_etags`, and `object_version_ids` outputs.
- data-stores/s3-bucket: bumps `terraform-aws-security` to v1.7.0.




</div>


### [v2.14.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v2.14.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/6/2026 | Modules affected: networking | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v2.14.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- LIB-5382: VPC flow log outputs + bump terraform-aws-vpc to v0.29.0 (fixes vpc-mgmt vpc_arn)



</div>


### [v2.13.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v2.13.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/5/2026 | Modules affected: data-stores, networking, services | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v2.13.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- data-stores: Update terraform-aws-security to v1.5.0
- networking and services modules: Update terraform-aws-load-balancer to v1.3.2 and terraform-aws-vpc to v0.29.0





</div>

<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "releases",
  "hash": "3b80120046ef1f3aafa73ec52ff044d3"
}
##DOCS-SOURCER-END -->

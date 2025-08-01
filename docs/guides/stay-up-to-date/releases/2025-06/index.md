
# Gruntwork release 2025-06

<p style={{marginTop: "-25px"}}><small><a href="/guides">Guides</a> / <a href="/guides/stay-up-to-date">Update Guides</a> / <a href="/guides/stay-up-to-date/releases">Releases</a> / 2025-06</small></p>

This page is lists all the updates to the [Gruntwork Infrastructure as Code
Library](https://gruntwork.io/infrastructure-as-code-library/) that were released in 2025-06. For instructions
on how to use these updates in your code, check out the [updating
documentation](/library/stay-up-to-date/updating).

Here are the repos that were updated:

- [boilerplate](#boilerplate)
- [pipelines-cli](#pipelines-cli)
- [pipelines-workflows](#pipelines-workflows)
- [repo-copier](#repo-copier)
- [terraform-aws-asg](#terraform-aws-asg)
- [terraform-aws-cache](#terraform-aws-cache)
- [terraform-aws-ci](#terraform-aws-ci)
- [terraform-aws-eks](#terraform-aws-eks)
- [terraform-aws-messaging](#terraform-aws-messaging)
- [terraform-aws-monitoring](#terraform-aws-monitoring)
- [terraform-aws-service-catalog](#terraform-aws-service-catalog)
- [terraform-aws-utilities](#terraform-aws-utilities)


## boilerplate


### [v0.6.3](https://github.com/gruntwork-io/boilerplate/releases/tag/v0.6.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/13/2025 | <a href="https://github.com/gruntwork-io/boilerplate/releases/tag/v0.6.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Bump golang.org/x/net from 0.33.0 to 0.38.0 by @dependabot in https://github.com/gruntwork-io/boilerplate/pull/222
* Remove log that may include secrets in https urls by @Resonance1584 in https://github.com/gruntwork-io/boilerplate/pull/223


**Full Changelog**: https://github.com/gruntwork-io/boilerplate/compare/v0.6.2...v0.6.3

</div>


### [v0.6.2](https://github.com/gruntwork-io/boilerplate/releases/tag/v0.6.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/10/2025 | <a href="https://github.com/gruntwork-io/boilerplate/releases/tag/v0.6.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Add top-level hooks declaration in hooks examples by @oredavids in https://github.com/gruntwork-io/boilerplate/pull/209
* go 1.24.4 by @Resonance1584 in https://github.com/gruntwork-io/boilerplate/pull/221

* @oredavids made their first contribution in https://github.com/gruntwork-io/boilerplate/pull/209

**Full Changelog**: https://github.com/gruntwork-io/boilerplate/compare/v0.6.1...v0.6.2

</div>



## pipelines-cli


### [v0.39.1](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.39.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/26/2025 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.39.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  **Full Changelog**: https://github.com/gruntwork-io/pipelines/compare/v0.39.0...v0.39.1


</div>


### [v0.36.0-ratelimitpatch](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.36.0-ratelimitpatch)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/17/2025 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.36.0-ratelimitpatch">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  **Full Changelog**: https://github.com/gruntwork-io/pipelines/compare/v0.35.6-rc2...v0.36.0-ratelimitpatch


</div>



## pipelines-workflows


### [v3.9.1](https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v3.9.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/26/2025 | <a href="https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v3.9.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

Fixed a regression in Account Factory when baselining new accounts with PIPELINES_FEATURE_EXPERIMENT_MINIMIZE_BLAST_RADIUS enabled.

**Full Changelog**: https://github.com/gruntwork-io/pipelines-workflows/compare/v3.9.0...v3.9.1

</div>



## repo-copier


### [v0.6.0](https://github.com/gruntwork-io/repo-copier/releases/tag/v0.6.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/18/2025 | <a href="https://github.com/gruntwork-io/repo-copier/releases/tag/v0.6.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Bitbucket test doc update by @lev-ok in https://github.com/gruntwork-io/repo-copier/pull/276
* Update required Azure token permission for integration test by @lev-ok in https://github.com/gruntwork-io/repo-copier/pull/277
* chore: Offboarding Levko by @yhakbar in https://github.com/gruntwork-io/repo-copier/pull/281
* feat: Add pre-push script hook functionality by @odgrim in https://github.com/gruntwork-io/repo-copier/pull/282


**Full Changelog**: https://github.com/gruntwork-io/repo-copier/compare/v0.5.5...v0.6.0

* Bitbucket test doc update by @lev-ok in https://github.com/gruntwork-io/repo-copier/pull/276
* Update required Azure token permission for integration test by @lev-ok in https://github.com/gruntwork-io/repo-copier/pull/277
* chore: Offboarding Levko by @yhakbar in https://github.com/gruntwork-io/repo-copier/pull/281
* feat: Add pre-push script hook functionality by @odgrim in https://github.com/gruntwork-io/repo-copier/pull/282
* Fix integration tests by @Resonance1584 in https://github.com/gruntwork-io/repo-copier/pull/286

* @yhakbar made their first contribution in https://github.com/gruntwork-io/repo-copier/pull/281
* @odgrim made their first contribution in https://github.com/gruntwork-io/repo-copier/pull/282
* @Resonance1584 made their first contribution in https://github.com/gruntwork-io/repo-copier/pull/286

**Full Changelog**: https://github.com/gruntwork-io/repo-copier/compare/v0.5.5...v0.6.0

</div>



## terraform-aws-asg


### [v1.0.1](https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v1.0.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/27/2025 | Modules affected: asg-rolling-deploy | <a href="https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v1.0.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- asg-rolling-deploy: allow desired_capacity to be set to null





</div>



## terraform-aws-cache


### [v1.0.1](https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v1.0.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/5/2025 | Modules affected: redis, valkey | <a href="https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v1.0.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Add dependency to the elasticache repl group to the autoscaling policy


</div>



## terraform-aws-ci


### [v0.60.1](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.60.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/20/2025 | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.60.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Bump github.com/go-jose/go-jose/v4 from 4.0.3 to 4.0.5 in /test in the go_modules group across 1 directory
- Remove test directory from build



</div>



## terraform-aws-eks


### [v1.1.1](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v1.1.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/28/2025 | Modules affected: eks-alb-ingress-controller-iam-policy | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v1.1.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Update ALB Ingress Controller IAM Policy template to use `aws_partition` to configure additional policy statements with the AWS Partition.



</div>


### [v1.1.0](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v1.1.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/17/2025 | Modules affected: eks-cluster-control-plane | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v1.1.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Bump `terraform-aws-utilities` to `v0.10.7`



</div>


### [v1.0.3](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v1.0.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/12/2025 | Modules affected: eks-cluster-control-plane | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v1.0.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Set `interactiveMode` for the generated kuneconfig.



</div>



## terraform-aws-messaging


### [v1.0.0](https://github.com/gruntwork-io/terraform-aws-messaging/releases/tag/v1.0.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/19/2025 | <a href="https://github.com/gruntwork-io/terraform-aws-messaging/releases/tag/v1.0.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - No changes with this release, moving to v1.x.x SemVer standard


This release marks a significant milestone for the module 🎉 
We are officially adopting the [Semantic Versioning (SemVer)](https://semver.org/) standard, starting with version v1.0.0. Prior to this release, version tags only incremented patch and minor numbers. Moving forward, all releases should fully comply with the SemVer specification, providing clearer expectations for users regarding changes, compatibility, and upgrade paths.

With the v1.0.0 release, the library module is considered stable. This means that all subsequent changes in the v1.x.x series will be backward-compatible unless a new major version (v2.0.0) is released.

Version numbers will now follow the format `MAJOR.MINOR.PATCH`
- `MAJOR`: Incremented for breaking changes or incompatible API changes.
- `MINOR`: Incremented for new, backward-compatible features.
- `PATCH`: Incremented for backward-compatible bug fixes.

Users can now rely on the v1.x.x series to remain backward-compatible. Breaking changes should only occur in a future v2.0.0 release.

Each release will include detailed notes indicating whether changes are breaking, additive, or bug fixes, as per SemVer guidelines.


</div>


### [v0.13.1](https://github.com/gruntwork-io/terraform-aws-messaging/releases/tag/v0.13.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/15/2025 | Modules affected: msk | <a href="https://github.com/gruntwork-io/terraform-aws-messaging/releases/tag/v0.13.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- SME-2366: Updated SG name
- Bump golang.org/x/net from 0.33.0 to 0.36.0 in /test
- Bump golang.org/x/net from 0.36.0 to 0.38.0 in /test
- Create a new example module for MSK express broker
- Increase instance size for flaky test failure
- Fix the failing MSK severless test



</div>



## terraform-aws-monitoring


### [v1.0.1](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v1.0.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/23/2025 | Modules affected: alarms/elasticache-redis-alarms, alarms/elasticache-memcached-alarms | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v1.0.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- examples update: 
  - Bump requests from 2.32.0 to 2.32.4 in /examples/lambda-alarms/python
  - Update examples/cloudwatch-dashboard to use Ubuntu 22.04
- alarms/elasticache-redis-alarms and alarms/elasticache-memcached-alarms: Make it possible to configure missing data per alarm for elasticache rather than using a shared treat_missing_data variable




</div>



## terraform-aws-service-catalog


### [v0.127.3](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.127.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/27/2025 | Modules affected: base/ec2-baseline | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.127.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- base/ec2-baseline: improve compatibility with Ubuntu 24/25 and Amazon Linux 2023



</div>


### [v0.127.2](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.127.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/10/2025 | Modules affected: data-stores | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.127.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- data-stores/s3-bucket: Updated modules/data-stores/s3-bucket to use module v1.0.0 and set transition_default_minimum_object_size for s3_bucket_logs and s3_bucket_replica.



</div>



## terraform-aws-utilities


### [v0.10.7](https://github.com/gruntwork-io/terraform-aws-utilities/releases/tag/v0.10.7)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/5/2025 | Modules affected: require-executable | <a href="https://github.com/gruntwork-io/terraform-aws-utilities/releases/tag/v0.10.7">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Uptick version pin of hashicorp/external to latest



</div>

<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "releases",
  "hash": "522aa0bdae5b6ea312d5b32d0b4c25a7"
}
##DOCS-SOURCER-END -->

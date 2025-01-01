
# Gruntwork release 2023-03

<p style={{marginTop: "-25px"}}><small><a href="/guides">Guides</a> / <a href="/guides/stay-up-to-date">Update Guides</a> / <a href="/guides/stay-up-to-date/releases">Releases</a> / 2023-03</small></p>

This page is lists all the updates to the [Gruntwork Infrastructure as Code
Library](https://gruntwork.io/infrastructure-as-code-library/) that were released in 2023-03. For instructions
on how to use these updates in your code, check out the [updating
documentation](/library/stay-up-to-date/updating).

Here are the repos that were updated:

- [aws-sample-app](#aws-sample-app)
- [gruntwork](#gruntwork)
- [patcher-cli](#patcher-cli)
- [terraform-aws-architecture-catalog](#terraform-aws-architecture-catalog)
- [terraform-aws-cache](#terraform-aws-cache)
- [terraform-aws-ci](#terraform-aws-ci)
- [terraform-aws-cis-service-catalog](#terraform-aws-cis-service-catalog)
- [terraform-aws-ecs](#terraform-aws-ecs)
- [terraform-aws-eks](#terraform-aws-eks)
- [terraform-aws-lambda](#terraform-aws-lambda)
- [terraform-aws-messaging](#terraform-aws-messaging)
- [terraform-aws-monitoring](#terraform-aws-monitoring)
- [terraform-aws-security](#terraform-aws-security)
- [terraform-aws-service-catalog](#terraform-aws-service-catalog)
- [terraform-aws-static-assets](#terraform-aws-static-assets)
- [terraform-aws-utilities](#terraform-aws-utilities)
- [terraform-aws-vpc](#terraform-aws-vpc)


## aws-sample-app


### [v0.0.7](https://github.com/gruntwork-io/aws-sample-app/releases/tag/v0.0.7)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/21/2023 | <a href="https://github.com/gruntwork-io/aws-sample-app/releases/tag/v0.0.7">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Bump json5 by @dependabot in https://github.com/gruntwork-io/aws-sample-app/pull/59
* Bump decode-uri-component from 0.2.0 to 0.2.2 by @dependabot in https://github.com/gruntwork-io/aws-sample-app/pull/55
* bump flyway version by @ellisonc in https://github.com/gruntwork-io/aws-sample-app/pull/62


**Full Changelog**: https://github.com/gruntwork-io/aws-sample-app/compare/v0.0.6...v0.0.7

</div>



## gruntwork


### [v0.4.13](https://github.com/gruntwork-io/gruntwork/releases/tag/v0.4.13)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/18/2023 | <a href="https://github.com/gruntwork-io/gruntwork/releases/tag/v0.4.13">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Improve event tracking interface. Instrument events by @zackproser in https://github.com/gruntwork-io/gruntwork/pull/153


**Full Changelog**: https://github.com/gruntwork-io/gruntwork/compare/v0.4.12...v0.4.13

</div>


### [v0.4.12](https://github.com/gruntwork-io/gruntwork/releases/tag/v0.4.12)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/17/2023 | <a href="https://github.com/gruntwork-io/gruntwork/releases/tag/v0.4.12">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Use master branch of boilerplate  by @zackproser in https://github.com/gruntwork-io/gruntwork/pull/149
* Provide a better explanation for PGP key input by @hongil0316 in https://github.com/gruntwork-io/gruntwork/pull/150
* Implement `gruntwork inspect pipelines` command by @zackproser in https://github.com/gruntwork-io/gruntwork/pull/152


**Full Changelog**: https://github.com/gruntwork-io/gruntwork/compare/v0.4.11...v0.4.12

</div>



## patcher-cli


### [v0.1.2](https://github.com/gruntwork-io/patcher-cli/releases/tag/v0.1.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/21/2023 | <a href="https://github.com/gruntwork-io/patcher-cli/releases/tag/v0.1.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
Fixed a bug where Terragrunt files without the `source` attribute caused Patcher to crash.

</div>


### [v0.1.1](https://github.com/gruntwork-io/patcher-cli/releases/tag/v0.1.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/20/2023 | <a href="https://github.com/gruntwork-io/patcher-cli/releases/tag/v0.1.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
This release adds functionality to pins the allowed versions number range for each module in the CIS upgrade plan. This is to ensure the prerequisites for the CIS v1.4 to v1.5 upgrade are met. If the version of the module you are currently using is outside the allowed range Patcher will output a warning and skip that module.

| Gruntwork Repo | Minimum Version | Maximum Version |
| :--- | :---: | :---: |
| terraform-aws-cis-service-catalog | 0.40.1 | 0.43.0 |
| terraform-aws-service-catalog | 0.95.0 | 0.101.0 |
| terraform-aws-security | 0.65.9 | 0.67.2 |


[CIS 1.5.0 Update Guide - Step 2: Update references to the Gruntwork Infrastructure as Code Library](https://docs.gruntwork.io/guides/stay-up-to-date/cis/cis-1.5.0/deployment-walkthrough/step-2-update-references-to-the-gruntwork-infrastructure-as-code-library)

</div>



## terraform-aws-architecture-catalog


### [v0.0.33](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v0.0.33)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/31/2023 | <a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v0.0.33">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Update default branch references (backward compatible) by @rhoboat in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/791
* Changed default reserved_concurrent_executions from 1 to -1 by @pete0emerson in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/793
* Remove unnecessary Git SSH Key references by @yorinasub17 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/795
* Residual reference to ssh key needs to be removed by @yorinasub17 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/796
* Only schedule cluster-autoscaler on Fargate for non-fargate EKS by @yorinasub17 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/797
* Update the GitLab instructions to assume the env vars are not setup by @yorinasub17 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/799
* Update CODEOWNERS by @yorinasub17 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/800
* Include the kubernetes metadata filters in the Fargate Pods logs by @yorinasub17 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/794
* Make changes to deprecate set-output command in Github action by @hongil0316 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/802
* Update Docs for CIS v1.5 by @robmorgan in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/803
* Use BuildKit pattern for passing secrets by @hongil0316 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/804
* Update k8s by @ellisonc in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/806
* Add new AWS regions by @ellisonc in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/808
* Update default version for aws ci version and kubergrunt version by @ellisonc in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/810
* update version of client authentication k8s api by @ellisonc in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/811
* swap to the buildkit version of docker by @ellisonc in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/812
* [CORE-326] Improve documentation about MFA requirements for new accounts by @pete0emerson in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/814
* Enable ap-northeast-3 by @marinalimeira in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/816
* Update deep link to CIS manual steps to upgrade version by @bethadele in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/813
* Enable the Organizations Filter for all accounts by @marinalimeira in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/820
* Update templates/infrastructure-live/docs/01 to help customer confusion by @iangrunt in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/819
* Core 310 launch templates by @ellisonc in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/821
* bump node size for eks by @ellisonc in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/822
* bump the flyway version for postgres 14 by @ellisonc in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/823
* chore: increment sample app backend image version for EKS by @MoonMoon1919 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/824
* [skip ci] Refactor contexts by @eak12913 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/826
* chore(CORE-656): Update git ref used to build files to plan/apply against by @MoonMoon1919 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/825

* @ellisonc made their first contribution in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/806
* @bethadele made their first contribution in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/813
* @MoonMoon1919 made their first contribution in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/824
* @eak12913 made their first contribution in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/826

**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-architecture-catalog/compare/v0.0.32...v0.0.33

</div>



## terraform-aws-cache


### [v0.19.1](https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v0.19.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/24/2023 | Modules affected: redis, **Full Changelog**: https://github.com/gruntwork-io/terraform-aws-cache/compare/v0.19.0...v0.19.1 | <a href="https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v0.19.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * fix: inverse check prevented user group attachment by @cbowlby-bt in https://github.com/gruntwork-io/terraform-aws-cache/pull/97

* redis

**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-cache/compare/v0.19.0...v0.19.1

</div>


### [v0.19.0](https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v0.19.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/22/2023 | Modules affected: memcached, redis | <a href="https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v0.19.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * memcached
* redis

* Simplify the example for memcache module.  by @hongil0316 in https://github.com/gruntwork-io/terraform-aws-cache/pull/95
* Simplify the example for redis module by @hongil0316 in https://github.com/gruntwork-io/terraform-aws-cache/pull/96
* feat: Enable RBAC group id for replication groups/clusters by @cbowlby-bt in https://github.com/gruntwork-io/terraform-aws-cache/pull/94

* @hongil0316 made their first contribution in https://github.com/gruntwork-io/terraform-aws-cache/pull/95
* @cbowlby-bt made their first contribution in https://github.com/gruntwork-io/terraform-aws-cache/pull/94

**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-cache/compare/v0.18.3...v0.19.0

</div>


### [v0.18.3](https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v0.18.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/8/2023 | Modules affected: redis | <a href="https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v0.18.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Updated default parameter group to support Redis 7.





</div>



## terraform-aws-ci


### [v0.51.3 - updated default kubergrunt version in ecs-deploy-runner dockerfile](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.51.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/25/2023 | Modules affected: ecs-deploy-runner | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.51.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
Update kubergrunt version to latest stable





</div>


### [v0.51.2](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.51.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/24/2023 | Modules affected: sign-binary-helpers, ecs-deploy-runner | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.51.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- **[BACKWARDS INCOMPATIBLE]** Updating Github SSH Host Key correctly



</div>



## terraform-aws-cis-service-catalog


### [v0.44.2](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.44.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/24/2023 | Modules affected: data-stores, landingzone, networking, observability | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.44.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- [PATCHER-102] Update Change Logs to v0.44.1
- Updating to terraform-aws-ci v0.51.2 and tf-aws-service-catalog v0.102.3



</div>


### [v0.44.1](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.44.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/3/2023 | Modules affected: observability/cloudwatch-logs-metric-filters | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.44.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Update terragrunt version in `tflint` patch
- Update Organizations metric filter to match Steampipe query



</div>



## terraform-aws-ecs


### [v0.35.1](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.35.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/20/2023 | Modules affected: ecs-deploy-check-binaries | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.35.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Update compatibility for Python 3.8-3.11




</div>



## terraform-aws-eks


### [v0.57.0](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.57.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/31/2023 | Modules affected: eks-aws-auth-merger, eks-cluster-managed-workers, eks-cluster-workers, eks-cluster-control-plane | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.57.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

Bump golang.org/x/text from 0.3.6 to 0.3.8 in /modules/eks-aws-auth-merger/aws-auth-merger
[skip ci] Refactor contexts
Feature/k8s 125 - added support for k8s 1.25 and removed deprecated 1.21


</div>


### [v0.56.4](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.56.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/24/2023 | Modules affected: eks-container-logs | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.56.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - Expose extraParsers variable in eks-container-logs



</div>



## terraform-aws-lambda


### [v0.21.7](https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.21.7)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/6/2023 | Modules affected: lambda-http-api-gateway | <a href="https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.21.7">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- refactor lambda s3 tests
- examples: remove deprecated argument skip_get_ec2_platforms from AWS …
- Change link type
- Added support of custom request authorizer to &apos;lambda-http-api-gateway&apos;



</div>



## terraform-aws-messaging


### [SNS - Support http delivery policy and minor bug fixes](https://github.com/gruntwork-io/terraform-aws-messaging/releases/tag/v0.10.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/17/2023 | Modules affected: sns, msk | <a href="https://github.com/gruntwork-io/terraform-aws-messaging/releases/tag/v0.10.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Support delivery policy for sns topic
- Fix allow_inbound_cidr security group bug
- Prevent making security group when allow_connections_cidr is empty
- Create a unit test for sqs lambda connection
- SNS - Added http feedback role arn support - https://github.com/gruntwork-i…



</div>


### [v0.10.0](https://github.com/gruntwork-io/terraform-aws-messaging/releases/tag/v0.10.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/3/2023 | Modules affected: msk | <a href="https://github.com/gruntwork-io/terraform-aws-messaging/releases/tag/v0.10.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fix test failures
- Rename variables to ensure consistency



</div>



## terraform-aws-monitoring


### [v0.35.9](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.35.9)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/17/2023 | Modules affected: logs | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.35.9">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fixes bug when forming policies of LB logs bucket, and allows setting multiple bucket policy statements on module `load-balancer-access-logs`



</div>



## terraform-aws-security


### [v0.67.6](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.67.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/29/2023 | Modules affected: cloudtrail, aws-config | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.67.6">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- CloudTrail: insight_selector capability added
- Updated CentOS AMI filter in tests
- AWS Config: Use encryption by default for SNS topic created by config



</div>


### [v0.67.5](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.67.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/21/2023 | Modules affected: cloudtrail-bucket, cloudtrail | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.67.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Add bucket_key_enabled option for cloudtrail bucket kms key




</div>


### [v0.67.4](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.67.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/21/2023 | Modules affected: private-s3-bucket | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.67.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Disable creation of ACLs on buckets that don&apos;t support it




</div>


### [v0.67.3](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.67.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/7/2023 | Modules affected: iam-policies, kms-cmk-replica, custom-iam-entity, secrets-manager-resource-policies | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.67.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Improve documentation about MFA requirements for new accounts
- Fix missing grants for replica key
- Examples: remove deprecated argument skip_get_ec2_platforms from AWS provider examples
- Add Changelogs for modules used by CIS
- Fix variable description for documentation


</div>



## terraform-aws-service-catalog


### [v0.102.7](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.102.7)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/30/2023 | Modules affected: services | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.102.7">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Refactor CircleCI contexts
- [ecs-service]: Fix missing variable values for alb stickyness



</div>


### [v0.102.6](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.102.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/28/2023 | Modules affected: mgmt | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.102.6">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Allow for dynamic use of imdsv2 or imdsv2 in user-data script for OpenVPN




</div>


### [v0.102.5](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.102.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/27/2023 | Modules affected: networking/route53 | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.102.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- `networking/route53`


- Add AWS-specific alias config to route53 for creating DNS records


- https://github.com/gruntwork-io/terraform-aws-service-catalog/pull/1829



</div>


### [v0.102.4](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.102.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/27/2023 | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.102.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Add Packer build to docker-packer-builder example - CORE-596
- Gruntwork pipelines documentation improvements - CORE-597,CORE-599


</div>


### [v0.102.3](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.102.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/24/2023 | Modules affected: mgmt | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.102.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- CORE-523 tf planner example
- Updated to terraform-aws-ci v0.51.2 to address Github SSH Host Key replacement






</div>


### [v0.102.2](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.102.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/22/2023 | Modules affected: landingzone | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.102.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Add bucket_key_enabled var in account-baseline-app module


</div>


### [v0.102.1](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.102.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/21/2023 | Modules affected: data-stores, landingzone | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.102.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Added `bucket_key` variables `data-stores` to pass to upstream module - https://github.com/gruntwork-io/terraform-aws-security/pull/734
- Added variable `cloudtrail_additional_bucket_policy_statements` to `landingzone/account-baseline-root`, which is passed as to internal `cloudtrail` module




</div>



## terraform-aws-static-assets


### [v0.16.1](https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.16.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/9/2023 | Modules affected: s3-static-website | <a href="https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.16.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Allows overriding the name used for the S3 buckets in module `s3-static-website`.






</div>



## terraform-aws-utilities


### [v0.9.1](https://github.com/gruntwork-io/terraform-aws-utilities/releases/tag/v0.9.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/6/2023 | Modules affected: request-quota-increase, require-executable | <a href="https://github.com/gruntwork-io/terraform-aws-utilities/releases/tag/v0.9.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Use latest upgrade test code.
- Use origin/HEAD as Base Ref for upgrade testing.
- Update CODEOWNERS
- Add Changelogs for modules used by CIS
- Pin Hashicorp external provider to v2.2.3


Special thanks to the following users for their contribution!




</div>



## terraform-aws-vpc


### [v0.22.6](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.22.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/10/2023 | Modules affected: vpc-interface-endpoint | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.22.6">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
For the module `vpc-interface-endpoint`, when `create_https_security_group = true`, a new security group allowing
ingress from 443 is created.


</div>


### [v0.22.5](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.22.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/3/2023 | Modules affected: vpc-app-network-acls, vpc-mgmt, vpc-app | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.22.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fix error when disabling IGW creation
- Fix typo and update to https URL for image



</div>

<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "releases",
  "hash": "b4a4c78dcae302364b15a8234e3bcbe5"
}
##DOCS-SOURCER-END -->

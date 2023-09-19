
# Gruntwork release 2023-04

<p style={{marginTop: "-25px"}}><small><a href="/guides">Guides</a> / <a href="/guides/stay-up-to-date">Update Guides</a> / <a href="/guides/stay-up-to-date/releases">Releases</a> / 2023-04</small></p>

This page is lists all the updates to the [Gruntwork Infrastructure as Code
Library](https://gruntwork.io/infrastructure-as-code-library/) that were released in 2023-04. For instructions
on how to use these updates in your code, check out the [updating
documentation](/library/stay-up-to-date/updating).

Here are the repos that were updated:

- [aws-sample-app](#aws-sample-app)
- [gruntwork](#gruntwork)
- [patcher-cli](#patcher-cli)
- [repo-copier](#repo-copier)
- [terraform-aws-architecture-catalog](#terraform-aws-architecture-catalog)
- [terraform-aws-asg](#terraform-aws-asg)
- [terraform-aws-cache](#terraform-aws-cache)
- [terraform-aws-ci](#terraform-aws-ci)
- [terraform-aws-cis-service-catalog](#terraform-aws-cis-service-catalog)
- [terraform-aws-data-storage](#terraform-aws-data-storage)
- [terraform-aws-ecs](#terraform-aws-ecs)
- [terraform-aws-eks](#terraform-aws-eks)
- [terraform-aws-lambda](#terraform-aws-lambda)
- [terraform-aws-load-balancer](#terraform-aws-load-balancer)
- [terraform-aws-messaging](#terraform-aws-messaging)
- [terraform-aws-monitoring](#terraform-aws-monitoring)
- [terraform-aws-openvpn](#terraform-aws-openvpn)
- [terraform-aws-security](#terraform-aws-security)
- [terraform-aws-service-catalog](#terraform-aws-service-catalog)
- [terraform-aws-static-assets](#terraform-aws-static-assets)
- [terraform-aws-vpc](#terraform-aws-vpc)


## aws-sample-app


### [v0.1.0](https://github.com/gruntwork-io/aws-sample-app/releases/tag/v0.1.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/28/2023 | <a href="https://github.com/gruntwork-io/aws-sample-app/releases/tag/v0.1.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * chore: increment flyway in packer test by @MoonMoon1919 in https://github.com/gruntwork-io/aws-sample-app/pull/63
* [skip ci] Refactor contexts by @eak12913 in https://github.com/gruntwork-io/aws-sample-app/pull/64
* Migrate AWS Sample App Docker Compose files and instuctions to Docker Compose V2 by @zackproser in https://github.com/gruntwork-io/aws-sample-app/pull/67 **[BACKWARD INCOMPATIBLE]**

The Docker Compose YAML files in this repository have been patched to be compatible with Docker Compose V2, since Docker Compose V1 [will be deprecated as of June 2023.](https://docs.docker.com/compose/) As part of migrating to Docker Compose V2, you MUST stop using the V1 `docker-compose` command (note the hyphen between `docker` and `compose`) and instead [install the Docker Compose plugin separately](https://docs.docker.com/compose/install/linux/). 

The new signature for Docker Compose is `docker compose &lt;command&gt;` (Not the absence of a hyphen between `docker` and `compose`).  

**Full Changelog**: https://github.com/gruntwork-io/aws-sample-app/compare/v0.0.7...v0.1.0

</div>



## gruntwork


### [v0.4.17](https://github.com/gruntwork-io/gruntwork/releases/tag/v0.4.17)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/18/2023 | <a href="https://github.com/gruntwork-io/gruntwork/releases/tag/v0.4.17">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Implement `gruntwork examples pipelines` experimental command by @zackproser in https://github.com/gruntwork-io/gruntwork/pull/158


**Full Changelog**: https://github.com/gruntwork-io/gruntwork/compare/v0.4.16...v0.4.17

</div>


### [v0.4.16](https://github.com/gruntwork-io/gruntwork/releases/tag/v0.4.16)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/7/2023 | <a href="https://github.com/gruntwork-io/gruntwork/releases/tag/v0.4.16">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * bug: install deps during deploy step in CI by @MoonMoon1919 in https://github.com/gruntwork-io/gruntwork/pull/157
* Chore: Enable Telemetry by default by @MoonMoon1919 in https://github.com/gruntwork-io/gruntwork/pull/159


**Full Changelog**: https://github.com/gruntwork-io/gruntwork/compare/v0.4.15...v0.4.16

</div>


### [v0.4.15](https://github.com/gruntwork-io/gruntwork/releases/tag/v0.4.15)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/3/2023 | <a href="https://github.com/gruntwork-io/gruntwork/releases/tag/v0.4.15">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * bug: add missing ldflag to build by @MoonMoon1919 in https://github.com/gruntwork-io/gruntwork/pull/156


**Full Changelog**: https://github.com/gruntwork-io/gruntwork/compare/v0.4.13...v0.4.15

</div>



## patcher-cli


### [v0.2.2](https://github.com/gruntwork-io/patcher-cli/releases/tag/v0.2.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/28/2023 | <a href="https://github.com/gruntwork-io/patcher-cli/releases/tag/v0.2.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - Remove limitation of Patcher only scanning modules where the source is from `gruntwork-io`.
- Add new context variable `PATCHER_IS_CIS_CUSTOMER`, so CIS patches can be skipped for non-CIS customers
- Performance enhancements: extract dependencies in parallel.

</div>


### [v0.2.0](https://github.com/gruntwork-io/patcher-cli/releases/tag/v0.2.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/4/2023 | <a href="https://github.com/gruntwork-io/patcher-cli/releases/tag/v0.2.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- This release adds the `patcher report` command that checks which Gruntwork maintained modules you are using, whether there are newer versions available for those modules, and lets you view the change log for those modules.
- This release also introduces a new and improved UI
- Note: this version does not support `patcher upgrade cis`, if you are a CIS customer looking to upgrade then you should use Patcher `v0.1.2`


</div>



## repo-copier


### [v0.2.3](https://github.com/gruntwork-io/repo-copier/releases/tag/v0.2.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/27/2023 | <a href="https://github.com/gruntwork-io/repo-copier/releases/tag/v0.2.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Fix getting commits from empty repos by @levkoburburas in https://github.com/gruntwork-io/repo-copier/pull/169


**Full Changelog**: https://github.com/gruntwork-io/repo-copier/compare/v0.2.2...v0.2.3

</div>


### [v0.2.2](https://github.com/gruntwork-io/repo-copier/releases/tag/v0.2.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/17/2023 | <a href="https://github.com/gruntwork-io/repo-copier/releases/tag/v0.2.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Fix updating references in `pre-commit` configs by @levkoburburas in https://github.com/gruntwork-io/repo-copier/pull/164
* Copy only private repositories by @levkoburburas in https://github.com/gruntwork-io/repo-copier/pull/155
* Fix `--refs-integrity` on incremental copy by @levkoburburas in https://github.com/gruntwork-io/repo-copier/pull/161
* Copy releases by @levkoburburas in https://github.com/gruntwork-io/repo-copier/pull/158



**Full Changelog**: https://github.com/gruntwork-io/repo-copier/compare/v0.2.1...v0.2.2

</div>



## terraform-aws-architecture-catalog


### [v0.0.35](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v0.0.35)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/27/2023 | <a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v0.0.35">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Bring deps up to date by @MoonMoon1919 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/828
* chore: Update to latest service catalog and cis service catalog versions by @MoonMoon1919 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/829


**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-architecture-catalog/compare/v0.0.34...v0.0.35

</div>


### [v0.0.34](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v0.0.34)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/11/2023 | <a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v0.0.34">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Increase default container memory for ecs-deploy-runner to 8GB by @MoonMoon1919 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/827


**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-architecture-catalog/compare/v0.0.33...v0.0.34

</div>



## terraform-aws-asg


### [v0.21.5](https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.21.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/26/2023 | Modules affected: server-group | <a href="https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.21.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Added `existing_iam_role_name` variable to allow a pre-existing role instead of creating a new role for each server-group instance.



</div>


### [v0.21.4](https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.21.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/25/2023 | Modules affected: server-group | <a href="https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.21.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Allow Changing Role Name Prefixes



</div>


### [v0.21.3](https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.21.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/24/2023 | Modules affected: server-group | <a href="https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.21.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Add &apos;Depends On&apos; for the `rolling_deployment`



</div>


### [v0.21.2](https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.21.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/10/2023 | Modules affected: server-group, asg-rolling-deploy | <a href="https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.21.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- server-group: Make aws_region optional
- asg-rolling-deploy: add support for static ASG names



</div>



## terraform-aws-cache


### [v0.19.3](https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v0.19.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/12/2023 | Modules affected: memcached, redis, elastic-cache | <a href="https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v0.19.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Simplify the example for memcache module. 
- Simplify the example for redis module
- Enable RBAC group id for replication groups/clusters
- Fix inverse check prevented user group attachment
- Explicitly set aws_elasticache_replication_group depends on aws_elast…
- Remove deleted variables from the upgrade tests.
- Create a new variable to configure log_delivery_configuration
- Refactor elastic cache
- Enhance default user group handling



</div>


### [v0.19.2](https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v0.19.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/7/2023 | Modules affected: redis | <a href="https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v0.19.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * [skip ci] Refactor contexts by @eak12913 in https://github.com/gruntwork-io/terraform-aws-cache/pull/98
* Explicitly set aws_elasticache_replication_group depends on aws_elast… by @hongil0316 in https://github.com/gruntwork-io/terraform-aws-cache/pull/102

* redis

* @eak12913 made their first contribution in https://github.com/gruntwork-io/terraform-aws-cache/pull/98

**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-cache/compare/v0.19.1...v0.19.2

</div>



## terraform-aws-ci


### [v0.51.8](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.51.8)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/26/2023 | Modules affected: monorepo-helpers | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.51.8">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fix default value for --target-ref flag



</div>


### [v0.51.7](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.51.7)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/26/2023 | Modules affected: monorepo-helpers | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.51.7">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Implement target_ref flag and plumb through commands





</div>


### [v0.51.6](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.51.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/6/2023 | Modules affected: install-jenkins, jenkins-server | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.51.6">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Add `drop_invalid_header_fields` parameter to `jenkins-server`



</div>


### [v0.51.5](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.51.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/5/2023 | Modules affected: infrastructure-deploy-script | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.51.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Include error when DeployError is thrown in infrastructure-deploy-script





</div>


### [v0.51.4](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.51.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/4/2023 | Modules affected: ecs-deploy-runner, gruntwork-module-circleci-helpers | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.51.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Add usage of tgswitch to install terragrunt in ECS Deploy Runner
- Docker images building documentation update
- CICD contexts update



</div>



## terraform-aws-cis-service-catalog


### [v0.46.0](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.46.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/27/2023 | Modules affected: observability/cloudtrail | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.46.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Update terraform-aws-security version for `observability/cloudtrail` module to v0.68.1, which fixes S3 ACL issues for new buckets




</div>


### [v0.45.1](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.45.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/27/2023 | Modules affected: None | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.45.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Pass the new `--target-ref` flag with a value of `origin/master`. This is required as `terraform-aws-cis-service-catalog` uses the master branch as its default, but the monorepo helper `find-tf-monorepo-tests` defaults to using `origin/main` for the `target-ref` which caused an error in this repository. 



</div>


### [v0.45.0](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.45.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/25/2023 | Modules affected: security | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.45.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Explicitly set bucket ownership and ACL for Macie S3 bucket 



</div>


### [v0.44.3](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.44.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/17/2023 | Modules affected: data-stores | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.44.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Add missing variable for SNS topic ARNs to provision RDS Cloudwatch alarms
- Refactor CI contexts
- Ignore CHANGELOG.md file when comparing generated modules
- Update for-production examples for architecture catalog 
- Remove Patcher references at renovate config



</div>



## terraform-aws-data-storage


### [v0.27.0](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.27.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/20/2023 | Modules affected: lambda-cleanup-snapshots, lambda-copy-shared-snapshot, lambda-create-snapshot, lambda-share-snapshot | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.27.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - lambda-cleanup-snapshots
- lambda-copy-shared-snapshot
- lambda-create-snapshot
- lambda-share-snapshot
- aurora
- rds
- redshift

* Create a new variable for outbound CIDR allowed list for Redshift module by @hongil0316 in https://github.com/gruntwork-io/terraform-aws-data-storage/pull/288
* Update the documentation to share RDS snapshot with another account by @hongil0316 in https://github.com/gruntwork-io/terraform-aws-data-storage/pull/292
* fix(rds): update deprecated argument by @bt-macole in https://github.com/gruntwork-io/terraform-aws-data-storage/pull/296
* Create a fully working example module to create/share/copy RDS snapshot with external account by @hongil0316 in https://github.com/gruntwork-io/terraform-aws-data-storage/pull/299
* Implement support for storage_throughput variable by @hongil0316 in https://github.com/gruntwork-io/terraform-aws-data-storage/pull/300
* Set allocated_storage of replicas the same as the primary instance by @hongil0316 in https://github.com/gruntwork-io/terraform-aws-data-storage/pull/301
* [skip ci] Refactor contexts by @eak12913 in https://github.com/gruntwork-io/terraform-aws-data-storage/pull/304
* Upgrade lambda runtime to python 3.9 by @gcagle3 in https://github.com/gruntwork-io/terraform-aws-data-storage/pull/303
* Patcher-127 add change logs by @techpink in https://github.com/gruntwork-io/terraform-aws-data-storage/pull/306
* Add `elastic_ip` variable by @lagerfeuer in https://github.com/gruntwork-io/terraform-aws-data-storage/pull/308
* Add custom tags to enhanced_monitoring_rule aws_iam_role. by @hongil0316 in https://github.com/gruntwork-io/terraform-aws-data-storage/pull/309
* Add a new variable for performance_insights_retention_period in aurora module by @hongil0316 in https://github.com/gruntwork-io/terraform-aws-data-storage/pull/310
* Remove custom dependencies variable by @hongil0316 in https://github.com/gruntwork-io/terraform-aws-data-storage/pull/311

* @bt-macole made their first contribution in https://github.com/gruntwork-io/terraform-aws-data-storage/pull/296
* @eak12913 made their first contribution in https://github.com/gruntwork-io/terraform-aws-data-storage/pull/304
* @gcagle3 made their first contribution in https://github.com/gruntwork-io/terraform-aws-data-storage/pull/303
* @techpink made their first contribution in https://github.com/gruntwork-io/terraform-aws-data-storage/pull/306
* @lagerfeuer made their first contribution in https://github.com/gruntwork-io/terraform-aws-data-storage/pull/308

**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-data-storage/compare/v0.26.0...v0.27.0

</div>



## terraform-aws-ecs


### [v0.35.2](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.35.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/25/2023 | Modules affected: ecs-cluster, ecs-service | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.35.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Explicitly cast `--timeout` as integer, to avoid TypeError between float and str in `roll-out-ecs-cluster-update` script
- Expose ability to set ephemeral_storage on `ecs-service` module




</div>



## terraform-aws-eks


### [v0.58.2](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.58.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/20/2023 | Modules affected: eks-container-logs | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.58.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - Update default eks-container-logs module helm chart version to 0.1.23



</div>


### [v0.58.1](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.58.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/20/2023 | Modules affected: eks-cluster-control-plane | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.58.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - Expose kubernetes_network_config configuration on EKS control plane module


</div>


### [v0.58.0](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.58.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/15/2023 | Modules affected: eks-k8s-karpenter | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.58.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - `eks-k8s-karpenter` -&gt; New Module Added 🎉 

- New module `eks-k8s-karpenter` was added! This new module adds [Karpenter](https://karpenter.sh/) as an available feature. Note: this is a backwards compatible change, but bumping the minor version to signify the new functionality that is now available. 

- https://github.com/gruntwork-io/terraform-aws-eks/pull/497



</div>


### [v0.57.3](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.57.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/15/2023 | Modules affected: eks-aws-auth-merger | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.57.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - `eks-aws-auth-merger`

- Dependency update: Bump golang.org/x/net from 0.0.0-20211209124913-491a49abca63 to 0.7.0 in /modules/eks-aws-auth-merger/aws-auth-merger

- https://github.com/gruntwork-io/terraform-aws-eks/pull/504


</div>


### [v0.57.2](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.57.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/15/2023 | Modules affected: eks-aws-auth-merger | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.57.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - `eks-aws-auth-merger`


- Dependency update: Bump golang.org/x/crypto from 0.0.0-20211202192323-5770296d904e to 0.1.0 in /modules/eks-aws-auth-merger/aws-auth-merger

- https://github.com/gruntwork-io/terraform-aws-eks/pull/505


</div>


### [v0.57.1](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.57.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/15/2023 | Modules affected: tests | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.57.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- Kubernetes has removed policy/v1beta1 in 1.25 PodDisruptionBudget. Updates to the nginx deployment sample.


</div>



## terraform-aws-lambda


### [v0.21.8](https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.21.8)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/7/2023 | Modules affected: lambda-edge, lambda | <a href="https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.21.8">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Added optional properties for security group replacement.  This can improve deletion speed in some cases.




</div>



## terraform-aws-load-balancer


### [v0.29.6](https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.29.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/25/2023 | Modules affected: alb | <a href="https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.29.6">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Add enable_waf_fail_open variable to alb



</div>


### [v0.29.5](https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.29.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/24/2023 | <a href="https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.29.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

-  chore(CORE-842): Update load-balancer-access-logs version to latest (in order to fix an issues with S3 ACL creation)




</div>


### [v0.29.4](https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.29.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/11/2023 | Modules affected: lb-listener-rules, alb | <a href="https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.29.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Add missing descriptions for LB-listener-rules + fix outputs
- Add xff-header variables to ALB module



</div>



## terraform-aws-messaging


### [v0.11.0](https://github.com/gruntwork-io/terraform-aws-messaging/releases/tag/v0.11.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/7/2023 | <a href="https://github.com/gruntwork-io/terraform-aws-messaging/releases/tag/v0.11.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Support delivery policy for sns topic by @pras111gw in https://github.com/gruntwork-io/terraform-aws-messaging/pull/95
* Fix allow_inbound_cidr security group bug by @hongil0316 in https://github.com/gruntwork-io/terraform-aws-messaging/pull/97
* Prevent making security group when allow_connections_cidr is empty by @hongil0316 in https://github.com/gruntwork-io/terraform-aws-messaging/pull/99
* Create a unit test for sqs lambda connection by @hongil0316 in https://github.com/gruntwork-io/terraform-aws-messaging/pull/101
* SNS - Added http feedback role arn support - https://github.com/gruntwork-i… by @pras111gw in https://github.com/gruntwork-io/terraform-aws-messaging/pull/103
* Custom dlq configuration by @hongil0316 in https://github.com/gruntwork-io/terraform-aws-messaging/pull/104
* [skip ci] Refactor contexts by @eak12913 in https://github.com/gruntwork-io/terraform-aws-messaging/pull/105
* Adding filter_policy variable to sns-sqs-connection module. by @hongil0316 in https://github.com/gruntwork-io/terraform-aws-messaging/pull/107
* Create a new variable sqs_managed_sse_enabled in sqs module by @hongil0316 in https://github.com/gruntwork-io/terraform-aws-messaging/pull/108
* Simplify the example module for sns-sqs-connectiona and create a unit test by @hongil0316 in https://github.com/gruntwork-io/terraform-aws-messaging/pull/106
* Create a new variable for defining stream_mode for kinesis data stream by @hongil0316 in https://github.com/gruntwork-io/terraform-aws-messaging/pull/110
* Set encryption_type to KMS by default for Kinesis Data stream by @hongil0316 in https://github.com/gruntwork-io/terraform-aws-messaging/pull/111
* Increase aws provider version to 4.0.0 by @hongil0316 in https://github.com/gruntwork-io/terraform-aws-messaging/pull/109
* Create new variables for opening ports for JMX and Node by @hongil0316 in https://github.com/gruntwork-io/terraform-aws-messaging/pull/112

* @pras111gw made their first contribution in https://github.com/gruntwork-io/terraform-aws-messaging/pull/95
* @hongil0316 made their first contribution in https://github.com/gruntwork-io/terraform-aws-messaging/pull/97

**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-messaging/compare/v0.10.0...v0.10.2

</div>



## terraform-aws-monitoring


### [v0.36.0](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.36.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/21/2023 | Modules affected: logs/load-balancer-access-logs | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.36.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Explicitly set bucket ownership and ACL for load balancer access logs S3 bucket




</div>



## terraform-aws-openvpn


### [v0.26.0](https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.26.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/21/2023 | Modules affected: openvpn-server | <a href="https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.26.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Update openvpn-server module to explicitly set the ACL to `private` and object ownership to `BucketOwnerPreferred` on the backups bucket




</div>



## terraform-aws-security


### [v0.68.1](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.68.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/27/2023 | Modules affected: ntp | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.68.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Update chrony startup command




</div>


### [v0.68.0](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.68.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/25/2023 | Modules affected: aws-config-bucket, cloudtrail-bucket, private-s3-bucket | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.68.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Make ACL required to combat bucket AccessControlListNotSupported errors





</div>


### [v0.67.10](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.67.10)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/25/2023 | Modules affected: cross-account-iam-roles, iam-groups, iam-policies, ssh-grunt | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.67.10">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Remove references to Gruntwork Houston





</div>


### [v0.67.9](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.67.9)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/20/2023 | Modules affected: aws-config-bucket, cloudtrail-bucket, cloudtrail, private-s3-bucket | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.67.9">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fix S3 ACLs test failures






</div>


### [v0.67.8](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.67.8)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/11/2023 | Modules affected: ssh-grunt | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.67.8">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Increment installed version of go to 1.18.6 in CI




</div>


### [v0.67.7](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.67.7)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/5/2023 | Modules affected: os-hardening, ssh-grunt | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.67.7">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Update OS hardening logic
- Increase root volume size to fix ssh-grunt tests
- Remove billing policy that breaks tests
- Update to golang 1.18



</div>



## terraform-aws-service-catalog


### [v0.104.1](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.104.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/28/2023 | Modules affected: mgmt, base, services | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.104.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Add tests for Gruntwork Pipelines examples
- Update CICD pipeline image to cimg/python:v3.11.2
- Update Helm to v3.11.2
- Update terraform-aws-utilities to v0.9.1
- Update terraform cloudinit provider to v2.3.2
- Update to Packer to v1.8.6
- Update terraform helm provider to &lt; 2.9.1
- Update lambda example test docker image to public.ecr.aws/lambda/python:v3.10





</div>


### [v0.104.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.104.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/27/2023 | Modules affected: data-stores/aurora, data-stores/backup-plan, data-stores/backup-vault, data-stores/lambda-cleanup-snapshots | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.104.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Update `terraform-aws-data-storage` to v0.26.0
  - Upgrade the AWS provider version to 4.22.0
  - Convert Security Group Rules for Aurora to use `for_each`
  - Added support for custom final snapshot for Aurora
  - Added boundary policy in creation of enhancement monitoring IAM role for RDS
- Fixed the `find-all-tests-to-run` script
- Updated the for-production examples for architecture catalog 
- Updated Tailscale README


</div>


### [v0.103.2](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.103.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/27/2023 | Modules affected: services | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.103.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Updates fluentbit modules to eks-container-logs v0.58.2. This fixes a compatibility issue for Kubernetes 1.25 due to an older version of the `aws-for-fluent-bit` Helm chart referencing `PodSecurityPolicy` in `policy/v1beta1`.






</div>


### [v0.103.1](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.103.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/27/2023 | Modules affected: mgmt, services, data-stores | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.103.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Update kubergrunt version to latest in SC
- Bump s3-bucket module ref



</div>


### [v0.103.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.103.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/26/2023 | Modules affected: mgmt, networking, services | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.103.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Updates to latest versions of modules that were impacted by S3 ACL issues



</div>


### [v0.102.16](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.102.16)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/25/2023 | Modules affected: mgmt, networking, services | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.102.16">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Update EKS module to release v0.57.0 which supports Kubernetes 1.25
- Prevent CIS RDS Patch to switch for non-CIS subscribers





</div>


### [v0.102.15](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.102.15)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/20/2023 | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.102.15">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Pipelines example (`for-learning-testing/gruntwork-pipelines`): Refactor GitHub PAT secret management to simplify deployment. 






</div>


### [v0.102.14](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.102.14)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/20/2023 | Modules affected: data-stores | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.102.14">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Support aurora severless v2
- Update data stores examples to latest version of terraform-aws-security




</div>


### [v0.102.13](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.102.13)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/19/2023 | Modules affected: mgmt | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.102.13">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Add ability to optionally pass Tailscale tags in to tailscale subnet router which will be advertised to allow for tag based ACLs






</div>


### [v0.102.12](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.102.12)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/18/2023 | Modules affected: networking, services | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.102.12">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Update terraform github.com/gruntwork-io/terraform-aws-eks to v0.56.4



</div>


### [v0.102.11](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.102.11)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/12/2023 | Modules affected: data-stores/s3-bucket | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.102.11">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  


</div>


### [v0.102.10](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.102.10)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/6/2023 | Modules affected: services | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.102.10">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- [CORE-669] Update version for k8s-namespace. Add networking permissions to helm&apos;s services-access role.




</div>


### [v0.102.9](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.102.9)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/6/2023 | Modules affected: mgmt, services, data-stores, base | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.102.9">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- allow overriding bucket name for public website service
- [CORE-522] Expose s3 bucket&apos;s versioning config
- Extended tag support for a few data-stores related modules
- chore(deps): update terraform github.com/gruntwork-io/terraform-aws-monitoring to v0.35.8
- chore(deps): update gh orb to v2.2.0
- chore(deps): update module github.com/mattn/go-zglob to v0.0.4
- chore(deps): update module github.com/stretchr/testify to v1.8.2



</div>


### [v0.102.8](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.102.8)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/4/2023 | Modules affected: data-stores, mgmt, networking, services | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.102.8">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Update for-production examples from architecture catalog 
- Patcher 121, Patcher-122 change log updates
- Remove Patcher references at renovate config
- Add lookup for ebs_volume size in ec2-server module aws_ebs_volume resource




</div>



## terraform-aws-static-assets


### [V0.17.0](https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.17.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/25/2023 | Modules affected: s3-static-website, s3-cloudfront | <a href="https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.17.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  


- Upgrade lambda runtime to python 3.9 in cloudfront-s3-public example
- Update modules for S3 ACL changes



</div>



## terraform-aws-vpc


### [v0.23.0](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.23.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/21/2023 | Modules affected: vpc-flow-logs | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.23.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Update `vpc-flow-logs` module to explicitly set ACL to private and object ownership to BucketOwnerPreferred on the S3 bucket for vpc flow logs.





</div>


### [v0.22.8](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.22.8)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/17/2023 | Modules affected: vpc-app | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.22.8">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- vpc-app: Add output for default route table



</div>


### [v0.22.7](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.22.7)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/11/2023 | Modules affected: vpc-app | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.22.7">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Add var for IPAM pool id



</div>




<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "releases",
  "hash": "c1dd4076f6a9378655e2e3811c3d8a15"
}
##DOCS-SOURCER-END -->

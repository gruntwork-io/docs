
# Gruntwork release 2023-05

<p style={{marginTop: "-25px"}}><small><a href="/guides">Guides</a> / <a href="/guides/stay-up-to-date">Update Guides</a> / <a href="/guides/stay-up-to-date/releases">Releases</a> / 2023-05</small></p>

This page is lists all the updates to the [Gruntwork Infrastructure as Code
Library](https://gruntwork.io/infrastructure-as-code-library/) that were released in 2023-05. For instructions
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
- [terraform-aws-openvpn](#terraform-aws-openvpn)
- [terraform-aws-security](#terraform-aws-security)
- [terraform-aws-server](#terraform-aws-server)
- [terraform-aws-service-catalog](#terraform-aws-service-catalog)
- [terraform-aws-vpc](#terraform-aws-vpc)


## aws-sample-app


### [v0.1.1](https://github.com/gruntwork-io/aws-sample-app/releases/tag/v0.1.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/2/2023 | <a href="https://github.com/gruntwork-io/aws-sample-app/releases/tag/v0.1.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Bump cookiejar from 2.1.2 to 2.1.4 by @dependabot in https://github.com/gruntwork-io/aws-sample-app/pull/60
* Bump express from 4.17.1 to 4.17.3 by @dependabot in https://github.com/gruntwork-io/aws-sample-app/pull/57
* Replace all instances of docker-compose with &quot;docker compose&quot; by @zackproser in https://github.com/gruntwork-io/aws-sample-app/pull/68


**Full Changelog**: https://github.com/gruntwork-io/aws-sample-app/compare/v0.1.0...v0.1.1

</div>



## gruntwork


### [v0.4.19](https://github.com/gruntwork-io/gruntwork/releases/tag/v0.4.19)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/9/2023 | <a href="https://github.com/gruntwork-io/gruntwork/releases/tag/v0.4.19">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Fix minor telemetry bug by @ellisonc in https://github.com/gruntwork-io/gruntwork/pull/165

**Full Changelog**: https://github.com/gruntwork-io/gruntwork/compare/v0.4.18...v0.4.19

</div>


### [v0.4.18](https://github.com/gruntwork-io/gruntwork/releases/tag/v0.4.18)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/3/2023 | <a href="https://github.com/gruntwork-io/gruntwork/releases/tag/v0.4.18">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Hardcode automated example deployment to us-east-1 by @zackproser in https://github.com/gruntwork-io/gruntwork/pull/163


**Full Changelog**: https://github.com/gruntwork-io/gruntwork/compare/v0.4.17...v0.4.18

</div>



## patcher-cli


### [v0.3.1](https://github.com/gruntwork-io/patcher-cli/releases/tag/v0.3.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/30/2023 | <a href="https://github.com/gruntwork-io/patcher-cli/releases/tag/v0.3.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
This release includes the following changes.

  - `patcher update`
  - User selects the module dependencies to be updated
  - Supports bumping to the next safe version
  - Outputs YAML to `stdout` detailing the updates that were applied

  - `patcher update --non-interactive`
  - Updates all module dependencies in the current folder (and child folders) according to the specified update strategy
  -  Outputs YAML to `stdout` detailing the updates that were applied
  -  Outputs YAML to `stdout` listing all the `README-TO-COMPLETE-UPDATE.md` files that were created (`--update-strategy next-breaking` only)
  -  `--no-color` flag for better output handling in CI pipelines
 

- This version only supports updating each selected dependency to either the highest version **before** the next closest breaking change or the latest version of the dependency, whichever is encountered first.

- Setting `--update-strategy next-safe` (default)` will update all dependencies to either the highest version **before** the next closest breaking change or the latest version of the dependency, whichever is encountered first.
- Setting `--update-strategy next-breaking` will update all dependencies to either the the next closest breaking change or the latest version of the dependency, whichever is encountered first.
  - This may result in an update that requires manual intervention. 
  - If a dependency is updated to a breaking change, a `README-TO-COMPLETE-UPDATE.md` containing an extract of the relevant release note is written to the folder containing the dependency



</div>


### [v0.2.3](https://github.com/gruntwork-io/patcher-cli/releases/tag/v0.2.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/2/2023 | <a href="https://github.com/gruntwork-io/patcher-cli/releases/tag/v0.2.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
Updated the views to have a responsive height. 

</div>



## repo-copier


### [v0.2.4](https://github.com/gruntwork-io/repo-copier/releases/tag/v0.2.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/1/2023 | <a href="https://github.com/gruntwork-io/repo-copier/releases/tag/v0.2.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * feat: Add a CLI flag to disable secret scanning push protection by @levkoburburas in https://github.com/gruntwork-io/repo-copier/pull/171


**Full Changelog**: https://github.com/gruntwork-io/repo-copier/compare/v0.2.3...v0.2.4

</div>



## terraform-aws-architecture-catalog


### [v0.0.36](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v0.0.36)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/5/2023 | <a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v0.0.36">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Update service catalog, ci, security, cis dependencies by @MoonMoon1919 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/830


**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-architecture-catalog/compare/v0.0.35...v0.0.36

</div>



## terraform-aws-asg


### [v0.21.7](https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.21.7)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/31/2023 | Modules affected: asg-instance-refresh, asg-rolling-deploy, server-group | <a href="https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.21.7">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Pin AWS provider &lt;v5.0.0



</div>


### [v0.21.6](https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.21.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/9/2023 | Modules affected: server-group | <a href="https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.21.6">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Adds support for Launch Template tag specifications on `server-group` module through the variable `tag_specifications`.




</div>



## terraform-aws-cache


### [v0.20.1](https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v0.20.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/31/2023 | Modules affected: redis | <a href="https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v0.20.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Pin AWS provider &lt;v5.0.0




</div>


### [v0.20.0](https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v0.20.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/11/2023 | Modules affected: redis, elastic-cache, memcached, redis_copy_snapshot | <a href="https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v0.20.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * redis
* elastic-cache
* memcached
* redis_copy_snapshot

* Support deploying a single node redis instance by @hongil0316 in https://github.com/gruntwork-io/terraform-aws-cache/pull/107
* Remove custom default value for optional variables by @hongil0316 in https://github.com/gruntwork-io/terraform-aws-cache/pull/110
* Improve documentation  by @hongil0316 in https://github.com/gruntwork-io/terraform-aws-cache/pull/116
* Remove irrelevant tests and improve the current set of tests by @hongil0316 in https://github.com/gruntwork-io/terraform-aws-cache/pull/113
* Add inofmration how to choose redis vs. memcached by @hongil0316 in https://github.com/gruntwork-io/terraform-aws-cache/pull/118
* Implement auto-scaling feature for Redis replication group by @hongil0316 in https://github.com/gruntwork-io/terraform-aws-cache/pull/120
* Upgrade version by @hongil0316 in https://github.com/gruntwork-io/terraform-aws-cache/pull/123
* Implement a bastion host example module to connect to Redis cluster + modify tests for checking connection via bastion host by @hongil0316 in https://github.com/gruntwork-io/terraform-aws-cache/pull/124
* Implement a new module to copy snapshot to external s3 bucket by @hongil0316 in https://github.com/gruntwork-io/terraform-aws-cache/pull/121


**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-cache/compare/v0.19.3...v0.20.0

</div>



## terraform-aws-ci


### [v0.52.2](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.52.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/30/2023 | Modules affected: ecs-deploy-runner, jenkins-server | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.52.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Bump kubegrunt to v0.11.2
- Fix: Jenkins ebs volume mapping var





</div>


### [v0.52.1](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.52.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/16/2023 | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.52.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Bump kubegrunt to v0.11.2 by @zackproser in https://github.com/gruntwork-io/terraform-aws-ci/pull/535


**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-ci/compare/v0.52.0...v0.52.1

</div>


### [v0.52.0](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.52.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/16/2023 | Modules affected: ecs-deploy-runner, monorepo-helpers | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.52.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- ecs-deploy-runner dependencies update and vulnerabilities reduction
- Fixed `monorepo-helpers` tests


</div>



## terraform-aws-cis-service-catalog


### [v0.47.2](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.47.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/18/2023 | Modules affected: data-stores | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.47.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Add missing variables for various cloudwatch alarms.



</div>


### [v0.47.1](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.47.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/18/2023 | Modules affected: data-stores | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.47.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Update for-production examples for architecture catalog v0.0.36
- Add variable for copying RDS tags to snapshot



</div>


### [v0.47.0](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.47.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/5/2023 | Modules affected: observability, security | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.47.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Update terraform-aws-security version for `observability/aws-config-multi-region` module to v0.68.2, which fixes S3 ACL issues for new buckets




</div>



## terraform-aws-data-storage


### [v0.27.1](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.27.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/31/2023 | Modules affected: rds-proxy, aurora, rds, redshift | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.27.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Implement a new module for RDS proxy
- Correct default values for min &amp; max capacity for aurora serverless

- Fix improper usage of depends_on variables on example modules
- Fix the unit tests for MariaDB RDS
- Skip taking final snapshot for RDS instance
- Remove custom default values for variables
- Remove parameter_group_name from rds-proxy example module
- Modify ADOC to Markdown for Redshift README doc
- Increase the terraform aws provider version to 4.61.0
- Add a new feature to deploy Redshift serverless in Redshift module.
- Consolidate multiple README pages into a single markdown file for RDS module
- Make necessary changes to address recently failing tests.
- Support password management with secrets manager in Aurora
- Convert Aurora README format to markdwon from ADOC
- Pin AWS provider &lt;v5.0.0


Special thanks to the following users for their contribution!





</div>



## terraform-aws-ecs


### [v0.35.4](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.35.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/12/2023 | Modules affected: ecs-cluster | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.35.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- `ecs-cluster`: update validation logic for `cluster_instance_request_spot_instances`



</div>


### [v0.35.3](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.35.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/5/2023 | Modules affected: ecs-deploy-check-binaries | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.35.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Updated PEX for Python 3.11 Compatibility


</div>



## terraform-aws-eks


### [v0.58.3](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.58.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/4/2023 | Modules affected: eks-cluster-managed-workers | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.58.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Update README.md - remove out of date information about AWS managed node groups






</div>



## terraform-aws-lambda


### [v0.21.9](https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.21.9)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/9/2023 | Modules affected: api-gateway-proxy | <a href="https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.21.9">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Adds two variables to the module `api-gateway-proxy`: `create_rest_api_policy`, which attaches a basic REST API policy to API Gateway, and `override_rest_api_policy`, for passing an external policy, if necessary.



</div>



## terraform-aws-load-balancer


### [v0.29.7](https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.29.7)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/31/2023 | Modules affected: acm-tls-certificate, alb, lb-listener-rules | <a href="https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.29.7">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Pin AWS provider &lt;v5.0.0






</div>



## terraform-aws-messaging


### [v0.12.1](https://github.com/gruntwork-io/terraform-aws-messaging/releases/tag/v0.12.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/1/2023 | <a href="https://github.com/gruntwork-io/terraform-aws-messaging/releases/tag/v0.12.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Pin AWS provider &lt;v5.0.0

**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-messaging/compare/v0.12.0...v0.12.1

</div>


### [v0.12.0](https://github.com/gruntwork-io/terraform-aws-messaging/releases/tag/v0.12.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/21/2023 | <a href="https://github.com/gruntwork-io/terraform-aws-messaging/releases/tag/v0.12.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Kinesis doc improvement. by @hongil0316 in https://github.com/gruntwork-io/terraform-aws-messaging/pull/114
* Kinesis test improvements by @hongil0316 in https://github.com/gruntwork-io/terraform-aws-messaging/pull/115
* Use large resource class for running tests in circleCi by @hongil0316 in https://github.com/gruntwork-io/terraform-aws-messaging/pull/125
* Make changes to run TestKinesisWithCustomKey in regions where dedicated-test-key KMS key is available by @hongil0316 in https://github.com/gruntwork-io/terraform-aws-messaging/pull/121
* Update/Organize information on MSK module + replace deprecate variable. by @hongil0316 in https://github.com/gruntwork-io/terraform-aws-messaging/pull/118
* Implement a new module for Kinesis Firehose Delivery stream. by @hongil0316 in https://github.com/gruntwork-io/terraform-aws-messaging/pull/127
* Remove idempotent check from TestKafkaClusterWithIAM test by @hongil0316 in https://github.com/gruntwork-io/terraform-aws-messaging/pull/129
* Make changes to upgrade MSKWithIAMAuth to run in specific regions by @hongil0316 in https://github.com/gruntwork-io/terraform-aws-messaging/pull/130
* Add a new feature to enable serverless msk deployment by @hongil0316 in https://github.com/gruntwork-io/terraform-aws-messaging/pull/123
* Support tiered storage for MSK module by @hongil0316 in https://github.com/gruntwork-io/terraform-aws-messaging/pull/124
* Stop using deprecated variable `ebs_volume_size`. by @hongil0316 in https://github.com/gruntwork-io/terraform-aws-messaging/pull/132
* Simplify TestKafkaClusterWithIAM Unit Test by @hongil0316 in https://github.com/gruntwork-io/terraform-aws-messaging/pull/131


**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-messaging/compare/v0.10.2...v0.12.0

</div>



## terraform-aws-openvpn


### [v0.26.2](https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.26.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/16/2023 | Modules affected: backup-openvpn-pki, openvpn-admin, start-openvpn-admin | <a href="https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.26.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Added a new CLI flag `--run-on-pki-update` for _openvpn-admin_ app.
- Updated [examples](https://github.com/gruntwork-io/terraform-aws-openvpn/tree/main/examples). Configured PKI backup after successful certificate request/revocation.
- Switched from `s3 cp` to `s3 sync` (incremental backup) in the _backup-openvpn-pki_ module.




</div>


### [v0.26.1](https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.26.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/11/2023 | Modules affected: openvpn-admin | <a href="https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.26.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
Fixed the user certificate request with pattern name similar to the already added




</div>



## terraform-aws-security


### [v0.68.3](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.68.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/26/2023 | Modules affected: private-s3-bucket | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.68.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Add permission boundary to private-s3-bucket iam roles



</div>


### [v0.68.2](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.68.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/2/2023 | Modules affected: guardduty | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.68.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- feat: Guardduty module updated to include ability to specifically exclude detector creation.



</div>



## terraform-aws-server


### [v0.15.4](https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.15.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/17/2023 | Modules affected: attach-eni, single-server | <a href="https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.15.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Add CentOS test case to eni and ebs examples
- Feature added to `single-server` module to expose metadata-options 


</div>



## terraform-aws-service-catalog


### [v0.104.8](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.104.8)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/30/2023 | Modules affected: mgmt | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.104.8">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Bump requests from 2.25.1 to 2.31.0 in /examples/for-learning-and-testing/services/lambda/python
- Bump jenkins module version





</div>


### [v0.104.7](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.104.7)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/19/2023 | Modules affected: services | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.104.7">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Feature: update ec2-instance to expose metadata-options variables




</div>


### [v0.104.6](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.104.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/17/2023 | Modules affected: mgmt | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.104.6">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Bump terraform-aws-ci/modules/ecs-deploy-runner to v0.52.1



</div>


### [v0.104.5](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.104.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/15/2023 | Modules affected: data-stores, networking | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.104.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Exposes variables for configuring VPC flow logs export destination on module `networking/vpc`.
- Exposes variable to monitor memory on the alarms of module `data-stores/redis`.



</div>


### [v0.104.4](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.104.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/12/2023 | Modules affected: mgmt, landingzone, data-stores | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.104.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- Exposes `allow_major_version_upgrade` variable on module `data-stores/rds`
- Expose variables for configuring volume on bastion-host
- Chore: increment all references to terraform-aws-security to 0.68.2






</div>


### [v0.104.3](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.104.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/11/2023 | Modules affected: services | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.104.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Allows ARNs of variable `secrets_manager_arns` to be provided incomplete and completed by data source in module `ecs-service`.




</div>


### [v0.104.2](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.104.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/1/2023 | Modules affected: data-stores | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.104.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fix: Explicitly set ownership defaults for s3-bucket





</div>



## terraform-aws-vpc


### [v0.23.1](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.23.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/31/2023 | Modules affected: vpc-peering-cross-accounts-accepter, vpc-peering-cross-accounts-requester, vpc-peering | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.23.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Pin AWS provider &lt;v5.0.0





</div>

<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "releases",
  "hash": "0a810d2ec73ffd46299b685e758c9a63"
}
##DOCS-SOURCER-END -->

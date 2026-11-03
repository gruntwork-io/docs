
# Gruntwork release 2026-10

<p style={{marginTop: "-25px"}}><small><a href="/guides">Guides</a> / <a href="/guides/stay-up-to-date">Update Guides</a> / <a href="/guides/stay-up-to-date/releases">Releases</a> / 2026-10</small></p>

This page lists all the updates to the [Gruntwork Infrastructure as Code Library](https://gruntwork.io/infrastructure-as-code-library/) that were released in 2026-10.
For instructions on how to use these updates in your code, check out the [updating documentation](/library/stay-up-to-date/updating).

Here are the repos that were updated:

- [boilerplate](#boilerplate)
- [pipelines-actions](#pipelines-actions)
- [pipelines-cli](#pipelines-cli)
- [pipelines-workflows](#pipelines-workflows)
- [terraform-aws-architecture-catalog](#terraform-aws-architecture-catalog)
- [terraform-aws-cache](#terraform-aws-cache)
- [terraform-aws-control-tower](#terraform-aws-control-tower)
- [terraform-aws-lambda](#terraform-aws-lambda)
- [terraform-aws-messaging](#terraform-aws-messaging)
- [terraform-aws-monitoring](#terraform-aws-monitoring)
- [terraform-aws-security](#terraform-aws-security)
- [terraform-aws-service-catalog](#terraform-aws-service-catalog)
- [terraform-aws-static-assets](#terraform-aws-static-assets)


## boilerplate


### [v0.17.0](https://github.com/gruntwork-io/boilerplate/releases/tag/v0.17.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/14/2026 | <a href="https://github.com/gruntwork-io/boilerplate/releases/tag/v0.17.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * build(deps): bump actions/cache from 5 to 6 by @dependabot[bot] in https://github.com/gruntwork-io/boilerplate/pull/315
* build(deps): bump actions/checkout from 6 to 7 by @dependabot[bot] in https://github.com/gruntwork-io/boilerplate/pull/314
* build(deps): bump golang.org/x/net from 0.49.0 to 0.55.0 by @dependabot[bot] in https://github.com/gruntwork-io/boilerplate/pull/316
* build(deps): bump mikepenz/action-junit-report from 5 to 6 by @dependabot[bot] in https://github.com/gruntwork-io/boilerplate/pull/250
* build(deps): bump golang.org/x/crypto from 0.51.0 to 0.52.0 by @dependabot[bot] in https://github.com/gruntwork-io/boilerplate/pull/317
* docs: Update Discord invite link by @denis256 in https://github.com/gruntwork-io/boilerplate/pull/319
* build(deps): bump the go-dependencies group across 1 directory with 9 updates by @dependabot[bot] in https://github.com/gruntwork-io/boilerplate/pull/312
* build(deps): bump google.golang.org/grpc from 1.80.0 to 1.82.1 by @dependabot[bot] in https://github.com/gruntwork-io/boilerplate/pull/318
* fix: repair test compilation broken by dependency bumps by @odgrim in https://github.com/gruntwork-io/boilerplate/pull/327
* build(deps): bump the go-dependencies group across 1 directory with 5 updates by @dependabot[bot] in https://github.com/gruntwork-io/boilerplate/pull/325
* build: disable cgo so the linux/amd64 binary is statically linked by @odgrim in https://github.com/gruntwork-io/boilerplate/pull/326
* fix: mark the extension-less IsTextFile fixture as binary by @x-nightwing in https://github.com/gruntwork-io/boilerplate/pull/332
* fix: render dependency output-folder with render-time vars in warm re… by @x-nightwing in https://github.com/gruntwork-io/boilerplate/pull/333

* @x-nightwing made their first contribution in https://github.com/gruntwork-io/boilerplate/pull/332

**Full Changelog**: https://github.com/gruntwork-io/boilerplate/compare/v0.16.0...v0.17.0

</div>



## pipelines-actions


### [v4.16.1](https://github.com/gruntwork-io/pipelines-actions/releases/tag/v4.16.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/23/2026 | <a href="https://github.com/gruntwork-io/pipelines-actions/releases/tag/v4.16.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * chore: Bumping `mise` to `2026.10.18` and the action to `v5.2.2` by @yhakbar in https://github.com/gruntwork-io/pipelines-actions/pull/177


**Full Changelog**: https://github.com/gruntwork-io/pipelines-actions/compare/v4.16.0...v4.16.1

</div>


### [v4.16.0](https://github.com/gruntwork-io/pipelines-actions/releases/tag/v4.16.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/22/2026 | <a href="https://github.com/gruntwork-io/pipelines-actions/releases/tag/v4.16.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Add retries to git clones by @Resonance1584 in https://github.com/gruntwork-io/pipelines-actions/pull/176


**Full Changelog**: https://github.com/gruntwork-io/pipelines-actions/compare/v4.15.0...v4.16.0

</div>


### [v4.15.0](https://github.com/gruntwork-io/pipelines-actions/releases/tag/v4.15.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/7/2026 | <a href="https://github.com/gruntwork-io/pipelines-actions/releases/tag/v4.15.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Add pipelines-hooks-error by @Resonance1584 in https://github.com/gruntwork-io/pipelines-actions/pull/174


**Full Changelog**: https://github.com/gruntwork-io/pipelines-actions/compare/v4.14.0...v4.15.0

</div>


### [v4.14.0](https://github.com/gruntwork-io/pipelines-actions/releases/tag/v4.14.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/5/2026 | <a href="https://github.com/gruntwork-io/pipelines-actions/releases/tag/v4.14.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * PF-201 check if experimental flag commit_as_token_owner is set, looku… by @x-nightwing in https://github.com/gruntwork-io/pipelines-actions/pull/173

* @x-nightwing made their first contribution in https://github.com/gruntwork-io/pipelines-actions/pull/173

**Full Changelog**: https://github.com/gruntwork-io/pipelines-actions/compare/v4.13.0...v4.14.0

</div>


### [v4.13.0](https://github.com/gruntwork-io/pipelines-actions/releases/tag/v4.13.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/5/2026 | <a href="https://github.com/gruntwork-io/pipelines-actions/releases/tag/v4.13.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Upload orchestrate warnings file by @Resonance1584 in https://github.com/gruntwork-io/pipelines-actions/pull/172


**Full Changelog**: https://github.com/gruntwork-io/pipelines-actions/compare/v4.12.1...v4.13.0

</div>



## pipelines-cli


### [v0.70.0](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.70.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/22/2026 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.70.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Details on user-facing changes will be documented in the release notes for:
- https://github.com/gruntwork-io/pipelines-workflows
- https://gitlab.com/gruntwork-io/pipelines-workflows

</div>


### [v0.69.1](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.69.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/8/2026 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.69.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Details on user-facing changes will be documented in the release notes for:
- https://github.com/gruntwork-io/pipelines-workflows
- https://gitlab.com/gruntwork-io/pipelines-workflows

</div>


### [v0.69.0](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.69.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/7/2026 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.69.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Details on user-facing changes will be documented in the release notes for:
- https://github.com/gruntwork-io/pipelines-workflows
- https://gitlab.com/gruntwork-io/pipelines-workflows

</div>


### [v0.68.1](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.68.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/5/2026 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.68.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Details on user-facing changes will be documented in the release notes for:
- https://github.com/gruntwork-io/pipelines-workflows
- https://gitlab.com/gruntwork-io/pipelines-workflows

</div>



## pipelines-workflows


### [v4.32.1](https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v4.32.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/23/2026 | <a href="https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v4.32.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
Pipelines now installs mise 2026.10.18, with `jdx/mise-action` v5.2.2. We recommend upgrading.

Starting in 2026.10.17, mise no longer trusts the eight eMudhra intermediate CA certificates whose private keys were compromised. Anyone holding those keys can issue certificates that older mise versions accept, so we recommend upgrading. See [jdx/mise#14781](https://github.com/jdx/mise/pull/14781).

* chore: Bumping `mise` to `2026.10.18` and the action to `v5.2.2` by @yhakbar in https://github.com/gruntwork-io/pipelines-workflows/pull/263


**Full Changelog**: https://github.com/gruntwork-io/pipelines-workflows/compare/v4.32.0...v4.32.1

</div>


### [v4.32.0](https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v4.32.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/22/2026 | <a href="https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v4.32.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

   ## What&apos;s Changed


Status comment updates now patch only the current job&apos;s section instead of downloading every job&apos;s artifacts, which cuts API calls on large runs.

 ### :bug: Retries on rate limits

 Git operations retry on transient failures, including HTTP 429 rate limits.


**Full Changelog**: https://github.com/gruntwork-io/pipelines-workflows/compare/v4.31.0...v4.32.0

</div>


### [v4.31.0](https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v4.31.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/15/2026 | <a href="https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v4.31.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

The default Pipelines CLI version is now v0.69.1, which adds [error hooks](https://docs.gruntwork.io/2.0/docs/pipelines/guides/hooks/hook-types#error-hooks): hooks that run when a `plan` or `apply` fails with an error that matches one of their `on_errors` patterns.


Each unit in `PIPELINES_HOOK_IN_UNITS_JSON_FILE` now includes the `result`, `reason`, and `cause` from the Terragrunt run report, and error hooks receive the failed Terragrunt output in `PIPELINES_HOOK_IN_ERRORS_FILE`. See the [Hooks API](https://docs.gruntwork.io/2.0/reference/pipelines/hooks-api).


When a Terragrunt run fails, the Pipelines logs and comment now show a short excerpt of the relevant error output.

**Full Changelog**: https://github.com/gruntwork-io/pipelines-workflows/compare/v4.30.0...v4.31.0


</div>


### [v4.30.0](https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v4.30.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/6/2026 | <a href="https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v4.30.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

The Pipelines Hook API now supports writing output to `PIPELINES_HOOK_OUT_ERROR_SUMMARY_FILE` and `PIPELINES_HOOK_OUT_ERROR_COMMENT_FILE`, which are read when a hook exits non-zero. If a hook exits non-zero without writing either file, the comment shows the first 500 characters of its stderr.


Added a new feature flag, `PIPELINES_FEATURE_EXPERIMENT_COMMIT_AS_TOKEN_OWNER`, which changes the commit author to match the owner of the token used to push commits, e.g., when creating drift detection commits.


Orchestrate will now create a warning when a unit matches multiple environment filters, and fail if a unit in multiple environments is being modified.


Cloud authentication has been rewritten to read only the configuration it needs, which speeds up repositories with large Pipelines configurations. This will have a negligible impact on small repositories, but for large repositories that cannot enable `TG_NO_DISCOVERY_AUTH_PROVIDER_CMD` this will have a significant impact on consolidated plans and applies. We highly recommend enabling [`TG_NO_DISCOVERY_AUTH_PROVIDER_CMD`](https://docs.terragrunt.com/troubleshooting/performance/#skipping-auth-during-discovery) where possible.


Fixed a bug causing stale artifact caches to be read on persistent runners.

**Full Changelog**: https://github.com/gruntwork-io/pipelines-workflows/compare/v4.29.0...v4.30.0

</div>



## terraform-aws-architecture-catalog


### [v6.2.3](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v6.2.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/22/2026 | <a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v6.2.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Grant management apply role EC2 access for default VPC hardening by @Resonance1584 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1234


**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-architecture-catalog/compare/v6.2.2...v6.2.3

</div>


### [v6.2.2](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v6.2.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/20/2026 | <a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v6.2.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Upgrade terraform-aws-security to v1.9.0 by @Resonance1584 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1231
* Fix pipelines CLI is required for reading enterprise config by @Resonance1584 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1232


**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-architecture-catalog/compare/v6.2.1...v6.2.2

</div>


### [v6.2.1](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v6.2.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/19/2026 | <a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v6.2.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Fix accounts with numeric prefixes must use bracket notation by @Resonance1584 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1230


**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-architecture-catalog/compare/v6.2.0...v6.2.1

</div>


### [v6.2.0](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v6.2.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/2/2026 | <a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v6.2.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * fix: Use partition aware ARNs by @yhakbar in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1221
* fix: Supporting GovCloud Landing Zone by @yhakbar in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1222
* feat: Setting up account partitions by @yhakbar in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1223
* fix: Setting Pipelines environment region from the default region by @yhakbar in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1225
* feat: Adding commercial twin account template by @yhakbar in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1226
* feat: Single account baseline partition-aware by @yhakbar in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1227
* feat: Adding `vend-govcloud-account` Runbook by @yhakbar in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1228


**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-architecture-catalog/compare/v6.1.6...v6.2.0

</div>



## terraform-aws-cache


### [v2.0.0](https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v2.0.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/12/2026 | Modules affected: elastic-cache, memcached, redis, redis_copy_snapshot | <a href="https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v2.0.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Update AWS provider version constraint to support v6
- feat(elastic-cache): Add Event Notifications for ElastiCache cluster
- fix(ci): disable mise legacy version file parsing
- Fix elasticache_user_group engine case deprecation warning
- feat: add gw: namespaced tagging and scheduled cloud-nuke cleanup
- feat(ci): optimize CI to run only relevant tests based on PR changes
- chore: bump cloud-nuke to v0.49.0
- chore: run cloud-nuke cleanup across all regions
- fix: harden cloud-nuke cleanup CI and bump to v0.50.0
- Scope cloud-nuke cleanup to repo resource types (v0.51.0)
- Bump cloud-nuke cleanup to v0.52.0 (parallel scan)
- chore: migrate cache terratests to Terratest v2 beta
- valkey: add auth_token_update_strategy passthrough
- valkey: create one security group rule per CIDR block



</div>



## terraform-aws-control-tower


### [v2.1.4](https://github.com/gruntwork-io/terraform-aws-control-tower/releases/tag/v2.1.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/1/2026 | Modules affected: landingzone | <a href="https://github.com/gruntwork-io/terraform-aws-control-tower/releases/tag/v2.1.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- fix: Get organization region by partition
- fix: Ensure that governed home regions go first


</div>



## terraform-aws-lambda


### [v1.5.0](https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v1.5.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/25/2026 | Modules affected: keep-warm, lambda-edge, lambda | <a href="https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v1.5.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Lambda runtime updates (`modules/keep-warm`, `modules/lambda-edge` and `modules/lambda` updated to NodeJs 24)
- Test stability improvements






</div>



## terraform-aws-messaging


### [v1.1.0](https://github.com/gruntwork-io/terraform-aws-messaging/releases/tag/v1.1.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/6/2026 | Modules affected: sns-sqs-connection, amazon-mq, sns, sqs-lambda-connection | <a href="https://github.com/gruntwork-io/terraform-aws-messaging/releases/tag/v1.1.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- feat: Make queue policy optional in sns-sqs-connection module
- fix: Disable mise legacy version file parsing in CI
- feat: Add Amazon MQ module supporting ActiveMQ and RabbitMQ
- feat: Add configurable egress and data replication mode to Amazon MQ module
- feat: Add missing AWS features to SNS and SQS modules
- feat: Run only relevant tests based on changed modules/examples
- feat: add gw: namespaced tagging and scheduled cloud-nuke cleanup
- chore: bump cloud-nuke to v0.49.0
- chore: run cloud-nuke cleanup across all regions
- fix: harden cloud-nuke cleanup CI and bump to v0.50.0
- Scope cloud-nuke cleanup to repo resource types (v0.51.0)
- Bump cloud-nuke cleanup to v0.52.0 (parallel scan)
- Migrate messaging terratests to Terratest v2 beta


</div>



## terraform-aws-monitoring


### [v1.4.1](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v1.4.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/17/2026 | Modules affected: alarms | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v1.4.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Export CloudWatch alarm names and ARNs from alarm modules
- Test updates





</div>



## terraform-aws-security


### [v1.9.0](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v1.9.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/15/2026 | Modules affected: aws-config-bucket, aws-config-multi-region, aws-config, cloudtrail-bucket | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v1.9.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Exposed S3 lifecycle min object size; fix ssh-grunt apt and Ubuntu fail2ban CloudWatch




</div>


### [v1.8.0](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v1.8.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/8/2026 | Modules affected: github-actions-iam-role, gitlab-pipelines-iam-role, saml-iam-roles, ssh-grunt | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v1.8.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Migrate security tests to Terratest v2 beta
- `permissions_boundary` variable wiring to outer wrapper
- GitHub actions iam role allow trusting tag pushes





</div>



## terraform-aws-service-catalog


### [v2.21.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v2.21.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/15/2026 | Modules affected: mgmt | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v2.21.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- fixed `tailscale-subnet-router-v2`: use --flag=value and add extra_routes





</div>


### [v2.20.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v2.20.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/13/2026 | Modules affected: base, data-stores, landingzone, mgmt | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v2.20.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Upgrade all usage of terraform-aws-security to v1.8.0





</div>


### [v2.19.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v2.19.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/12/2026 | Modules affected: - services | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v2.19.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- services/public-static-website: adds `use_cloudfront_standard_logging_v2` to send CloudFront access logs with [standard logging (v2)](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/standard-logging.html), so the access logs bucket trusts the `delivery.logs.amazonaws.com` service instead of the CloudFront log delivery AWS account, with ACLs disabled. Adds `cloudfront_access_logs_output_format` to set the log file format. Both default to the current behavior, so existing users see no change. To switch an existing deployment, see the [s3-cloudfront README](https://github.com/gruntwork-io/terraform-aws-static-assets/tree/v1.3.0/modules/s3-cloudfront#switching-an-existing-deployment-to-standard-logging-v2).
- services/public-static-website: bumps `terraform-aws-static-assets` to [v1.3.0](https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v1.3.0).





</div>


### [v2.18.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v2.18.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/9/2026 | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v2.18.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * issue-1745 ECR Repository replica has no policy attached by @x-nightwing in https://github.com/gruntwork-io/terraform-aws-service-catalog/pull/2422


**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-service-catalog/compare/v2.17.0...v2.18.0

</div>


### [v2.17.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v2.17.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/5/2026 | Modules affected: services, base, data-stores, mgmt | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v2.17.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- fix(eks-workers): unpin terraform-aws-eks from the AL2023 Packer template
- chore: migrate service-catalog terratests to Terratest v2 beta
- fix(ci): resolve upgrade test base ref by field name and fail loudly when empty
- Update terraform-aws-monitoring
- feat(aurora): expose per-instance monitoring_interval
- feat(aurora): expose storage_type so clusters can use I/O-Optimized (LIB-5560)
- Bump aurora to data-storage v1.3.1 and expose Serverless v2 auto pause input
- fix(vpc): let VPC peering plan on a first apply by sizing routes from subnet tiers
- Expose database_insights_mode in modules/data-stores/rds



</div>



## terraform-aws-static-assets


### [v1.3.0](https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v1.3.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/12/2026 | Modules affected: - s3-cloudfront | <a href="https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v1.3.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- `s3-cloudfront`: add opt-in CloudFront [standard logging (v2)](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/standard-logging.html) with `use_cloudfront_standard_logging_v2`. The access logs bucket trusts the `delivery.logs.amazonaws.com` service instead of the CloudFront log delivery account, and ACLs are disabled. `access_logs_output_format` sets the log file format. Defaults are unchanged. To switch an existing deployment, see [the module README](https://github.com/gruntwork-io/terraform-aws-static-assets/tree/v1.3.0/modules/s3-cloudfront#switching-an-existing-deployment-to-standard-logging-v2).
- Add the `cloudfront-s3-private-standard-logging` example.
- Tag example resources with `gw:` namespaced tags and clean up test resources on a schedule with cloud-nuke.
- Migrate tests to Terratest v2 beta.




</div>

<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "releases",
  "hash": "fb28292981f7bb6b77c7f697e32d1c6f"
}
##DOCS-SOURCER-END -->


# Gruntwork release 2022-07

<p style={{marginTop: "-25px"}}><small><a href="/guides">Guides</a> / <a href="/guides/stay-up-to-date">Update Guides</a> / <a href="/guides/stay-up-to-date/releases">Releases</a> / 2022-07</small></p>

This page is lists all the updates to the [Gruntwork Infrastructure as Code
Library](https://gruntwork.io/infrastructure-as-code-library/) that were released in 2022-07. For instructions
on how to use these updates in your code, check out the [updating
documentation](/library/stay-up-to-date/updating).

Here are the repos that were updated:

- [boilerplate](#boilerplate)
- [terraform-aws-asg](#terraform-aws-asg)
- [terraform-aws-ci](#terraform-aws-ci)
- [terraform-aws-ci-steampipe](#terraform-aws-ci-steampipe)
- [terraform-aws-cis-service-catalog](#terraform-aws-cis-service-catalog)
- [terraform-aws-data-storage](#terraform-aws-data-storage)
- [terraform-aws-lambda](#terraform-aws-lambda)
- [terraform-aws-monitoring](#terraform-aws-monitoring)
- [terraform-aws-security](#terraform-aws-security)
- [terraform-aws-server](#terraform-aws-server)
- [terraform-aws-service-catalog](#terraform-aws-service-catalog)
- [terraform-aws-static-assets](#terraform-aws-static-assets)
- [terraform-aws-vpc](#terraform-aws-vpc)


## boilerplate


### [v0.5.2](https://github.com/gruntwork-io/boilerplate/releases/tag/v0.5.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/19/2022 | <a href="https://github.com/gruntwork-io/boilerplate/releases/tag/v0.5.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - Fixed bug where the variable definitions passed in the CLI did not have the highest precedence, being overwritten by the variable definitions on the Dependency.

- https://github.com/gruntwork-io/boilerplate/pull/119

</div>


### [v0.5.1](https://github.com/gruntwork-io/boilerplate/releases/tag/v0.5.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/18/2022 | <a href="https://github.com/gruntwork-io/boilerplate/releases/tag/v0.5.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - Fixed bug where the `default` and `reference` fields were no longer being rendered on direct `variables` definitions set on `dependencies`.

- https://github.com/gruntwork-io/boilerplate/pull/118


</div>


### [v0.5.0](https://github.com/gruntwork-io/boilerplate/releases/tag/v0.5.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/11/2022 | <a href="https://github.com/gruntwork-io/boilerplate/releases/tag/v0.5.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - Fixed bug where boilerplate preferred the variable defaults defined in the `variables`field of the `dependency` object over the var file values, unlike what was implied by the documentation.


This release has two intentional behavior changes:

- `boilerplate` will now prefer values specified in `var_files` on the `dependency` over the `default` value of `variables`.
- `boilerplate` will no longer ask for variables specified on `dependency` in interactive mode.
- `boilerplate` no longer supports bare variable definitions on `dependency` config (that is, you must specify a `default` or `reference` when adding a variable to the `variables` list on a `dependency` config.

If you were relying on either of these behaviors, please file a GitHub issue with your use case so we can discuss alternatives.


- https://github.com/gruntwork-io/boilerplate/pull/113


</div>



## terraform-aws-asg


### [v0.19.1](https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.19.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/11/2022 | Modules affected: server-group | <a href="https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.19.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fixes attachment of security groups in the `server-group` module when using both the option to create ENIs and externally attaching additional security groups.


</div>



## terraform-aws-ci


### [v0.50.4](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.50.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/13/2022 | Modules affected: ecs-deploy-runner | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.50.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Updated `ecs-deploy-runner` to support tagging of multiple images




</div>


### [v0.50.3](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.50.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/6/2022 | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.50.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fixed bug in upgrade testing module find and replace where it matched modules with the same prefix.




</div>


### [v0.50.2](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.50.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/6/2022 | Modules affected: ecs-deploy-runner-standard-configuration, ecs-deploy-runner | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.50.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Added option `--no-push` to `docker-image-builder` to perform only building of container images and avoid pushing to registry.



</div>


### [v0.50.1](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.50.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/5/2022 | Modules affected: ecs-deploy-runner | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.50.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Updated refs for `terraform-aws-ci` in Dockerfiles for `ecs-deploy-runner`.
- Added patch testing on PRs within the upgrade test runner.






</div>



## terraform-aws-ci-steampipe


### [v0.3.3](https://github.com/gruntwork-io/terraform-aws-ci-steampipe/releases/tag/v0.3.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/18/2022 | Modules affected: steampipe-runner | <a href="https://github.com/gruntwork-io/terraform-aws-ci-steampipe/releases/tag/v0.3.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- `steampipe-runner`

- Updated default version of `steampipe` to latest patch release: `v0.15.0` =&gt; `v0.15.3`

https://github.com/gruntwork-io/terraform-aws-ci-steampipe/pull/30

</div>


### [v0.3.2](https://github.com/gruntwork-io/terraform-aws-ci-steampipe/releases/tag/v0.3.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/15/2022 | Modules affected: steampipe-runner, ecs-deploy-runner-steampipe-standard-configuration | <a href="https://github.com/gruntwork-io/terraform-aws-ci-steampipe/releases/tag/v0.3.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- `steampipe-runner`
- `ecs-deploy-runner-steampipe-standard-configuration`

- Added new option `--ensure-iam-credential-report` which will ensure that a completed credential report is available for Steampipe to query.

https://github.com/gruntwork-io/terraform-aws-ci-steampipe/pull/29

</div>


### [v0.3.1](https://github.com/gruntwork-io/terraform-aws-ci-steampipe/releases/tag/v0.3.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/6/2022 | Modules affected: steampipe-runner, ecs-deploy-runner-with-steampipe-runner, ecs-deploy-runner-steampipe-standard-configuration | <a href="https://github.com/gruntwork-io/terraform-aws-ci-steampipe/releases/tag/v0.3.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- `steampipe-runner`
- `ecs-deploy-runner-with-steampipe-runner`
- `ecs-deploy-runner-steampipe-standard-configuration`

- Updated the underlying go dependency versions of the `run-steampipe-mod-check` trigger command for the `steampipe-runner`.
- Fixed bug where `--publish-to-securityhub` did not work due to security token failures when running in the ECS Deploy Runner.
- Added new option `--report-global-to-region` which allows publishing global findings (e.g., issues with IAM) to Security Hub in the specified region.

https://github.com/gruntwork-io/terraform-aws-ci-steampipe/pull/28

</div>



## terraform-aws-cis-service-catalog


### [v0.38.2](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.38.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/28/2022 | Modules affected: observability/cloudwatch-logs-metric-filters, observability/aws-config-multi-region, landingzone/account-baseline-app, landingzone/account-baseline-root | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.38.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Updated dependencies:
    - `terraform-aws-monitoring`: `v0.35.1` to `v0.35.2`
    - `terraform-aws-service-catalog`: `v0.93.0` to `v0.93.1`
    - `terraform-aws-lambda`: `v0.20.0` to `v0.20.1`
    - Lambda python runtime: `3.7` to `3.9`
- Updated test dependencies.





</div>


### [v0.38.1](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.38.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/27/2022 | Modules affected: landingzone/account-baseline-app, landingzone/account-baseline-root, landingzone/account-baseline-security, observability/aws-config-multi-region | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.38.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Exposed flag `enable_root_account_mfa_rule` for AWS Config to allow disabling the root user MFA AWS Config rule. This should only be turned off for AWS partitions that do not support a root user (e.g., GovCloud).



</div>


### [v0.38.0](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.38.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/27/2022 | Modules affected: security/aws-securityhub, landingzone/account-baseline-app, landingzone/account-baseline-security, landingzone/account-baseline-root | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.38.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Updated hardcoded ARNs to lookup AWS partition information to support deployment into alternative partitions such as GovCloud.
- Update dependencies:
    - `terraform-aws-service-catalog`: `v0.90.7` =&gt; `v0.93.0`
    - `terraform-aws-security`: `v0.64.7` =&gt; `v0.65.8`
    - Test Golang dependencies
    - CLI Golang dependencies for `codegen` library



</div>


### [v0.37.1](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.37.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/21/2022 | Modules affected: landingzone/account-baseline-app, landingzone/account-baseline-root, landingzone/account-baseline-security, observability/cloudtrail | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.37.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Exposed the ability to configure cross account SNS Topic access. You can use the new `cloudtrail_benchmark_alarm_external_aws_account_ids_with_publish_access` and `cloudtrail_benchmark_alarm_external_iam_entities_with_list_subscription_access` input variables to configure cross account access for various scenarios.





</div>


### [v0.37.0](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.37.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/15/2022 | Modules affected: observability/cloudwatch-logs-metric-filters, observability/cloudtrail, landingzone/account-baseline-app, landingzone/account-baseline-security | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.37.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Updated `cloudtrail` to configure object level data logging for ALL S3 buckets, not just the CloudTrail bucket. Previously the compliance requirement 3.10 and 3.11 was misinterpreted to mean only the CloudTrail bucket when in reality all S3 buckets in the account required to be monitored.
- Exposed the `additional_data_logging_resources` input variable in the `account-baseline` modules to configure additional data logging resources on the CloudTrail instance.
- Added the ability to configure AWS Organizations metric filters in child accounts. While these are not strictly necessary, configuring them may be useful for satisfying various automated checks for CIS.
- Fixed bug where the CloudTrail metric filter SNS topics were not being encrypted with the CloudTrail KMS Key as originally intended.


</div>


### [v0.36.1](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.36.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/13/2022 | Modules affected: landingzone/account-baseline-app, landingzone/account-baseline-root, landingzone/account-baseline-security, observability/cloudtrail | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.36.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Added the ability to configure a subscription to the SNS Topic for CloudTrail CIS benchmark alarms that sends the alerts to a Slack Channel.



</div>


### [v0.36.0](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.36.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/11/2022 | Modules affected: landingzone/account-baseline-root, landingzone/account-baseline-security, landingzone/account-baseline-app, security/cleanup-expired-certs | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.36.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Updated the AWS Config Aggregator to force to aggregating all regions. This is due to the CIS control 3.5 that requires AWS Config be enabled in all regions, so it makes sense to always require aggregating all regions.
- Updated dependencies:
    - `terraform-aws-lambda`: `v0.19.3` to `v0.20.0`
    - `terraform-aws-security`: `v0.65.6` to `v0.65.7`



</div>


### [v0.35.7](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.35.7)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/7/2022 | Modules affected: networking/vpc-mgmt, networking/vpc-mgmt-network-acls, networking/vpc, networking/vpc-app-network-acls | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.35.7">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fixed a CIS Compliance misinterpretation for control 5.1 (VPC NACLs). Control 5.1 states `Ensure no Network ACLs allow ingress from `0.0.0.0/0` to remote server administration ports`, which was originally interpreted to mean that there should be no network ACL that effectively allows ingress from `0.0.0.0/0` on admin ports, but the popular interpretation is that there should be no network ACL rule that allows ingress from `0.0.0.0/0`, even if a higher priority rule explicitly denies access. As such, starting this release, the network ACL rules are adjusted to ensure that no rule allows ingress from `0.0.0.0/0` in all rules configured.




</div>


### [v0.35.6](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.35.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/7/2022 | Modules affected: landingzone/account-baseline-root, landingzone/account-baseline-security, landingzone/account-baseline-app, security/aws-securityhub | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.35.6">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Added the ability to configure an aggregator region to roll up the findings to in Security Hub. Note that only administrator accounts can designate an aggregator region.


</div>


### [v0.35.5](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.35.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/5/2022 | Modules affected: networking/vpc, networking/vpc-mgmt | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.35.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Added the ability to disable private SSH and RDP access at the NACL level, using the new `enable_administrative_remote_access_private_subnets_from_self` (for mgmt VPC), `enable_administrative_remote_access_private_app_subnets_from_self` and `enable_administrative_remote_access_private_persistence_subnets_from_self` (for app VPC) variables.
- Added the ability to configure the remote administrative ports for the NACLs from the VPC layer using the new `remote_administrative_ports` variable.



</div>


### [v0.35.4](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.35.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/1/2022 | Modules affected: landingzone/account-baseline-security | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.35.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Exposed the ability to configure `max_password_age` and password `hard_expiry` for the IAM Password Policy from `account-baseline-security`.


</div>



## terraform-aws-data-storage


### [v0.24.2](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.24.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/21/2022 | Modules affected: aurora | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.24.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fixed bug where `aurora` module could not be configured with a `restore_to_time` setting due to mutual exclusivity.



</div>


### [v0.24.1](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.24.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/19/2022 | Modules affected: rds | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.24.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Added the ability to configure the character sets for the RDS Database for Oracle and MSSQL types.




</div>


### [v0.24.0](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.24.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/5/2022 | Modules affected: aurora, backup-plan, backup-vault, efs | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.24.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- **Unlock AWS provider v4. Require minimum 3.75.1.** This update includes a few tests that make sure upgrading to this module from the last release is easy. However, you may need to bump your AWS provider version. See the migration guide notes below for more.
    - Fixed a perpetual diff problem in `examples/rds-mysql-with-cross-region-replica`. If you&apos;ve used this example, you&apos;ve probably already noticed this in your own code when re-running apply. We&apos;ve updated the example to include the `var.storage_encrypted` setting in all example code that references the `modules/rds` module.
    - Uncovered an undocumented (as of this release) backward incompatibility in the AWS Provider v4 upgrade from v3.75. We&apos;ve handled this within the `modules/rds` logic so you don&apos;t have to update your code.


</div>



## terraform-aws-lambda


### [v0.20.2](https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.20.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/28/2022 | Modules affected: run-lambda-entrypoint | <a href="https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.20.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Added the ability to configure multiple secrets manager entries for container based Lambda functions in the `run-lambda-entrypoint` command.




</div>


### [v0.20.1](https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.20.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/18/2022 | Modules affected: lambda | <a href="https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.20.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Add patch that automates upgrading from `v0.16.x` to `v0.17.0`.
- Adds `tracing_config` variable
- Update `aws_arn data` call to use data partition



</div>


### [v0.20.0](https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.20.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/7/2022 | Modules affected: api-gateway-account-settings, api-gateway-proxy-methods, api-gateway-proxy, keep-warm | <a href="https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.20.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- **Unlock AWS provider v4. Require minimum 3.75.1.** This update includes a few tests that make sure upgrading to this module from the last release is easy. However, you may need to bump your AWS provider version. See the migration guide notes below for more info.
- Internal updates:
    - Updated code owners
    - Added upgrade testing
    - Patches added: 
		    - `v0.15.0`
		    - `v0.16.0`
		    - `v0.14.0`


</div>



## terraform-aws-monitoring


### [v0.35.2](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.35.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/27/2022 | Modules affected: alarms | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.35.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  


- Add variable to configure how to treat missing data for Memcached and Redis alarms



</div>


### [v0.35.1](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.35.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/21/2022 | Modules affected: logs/cloudwatch-logs-metric-filters | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.35.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Added the ability to configure the SNS Topic with cross account access for publish and list subscriptions.




</div>


### [v0.35.0](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.35.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/12/2022 | Modules affected: alarms/sns-to-slack | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.35.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Updated `sns-to-slack` module to require passing through the Slack webhook URL using AWS Secrets Manager instead of directly as module variables. This is to treat the webhook URL more like a Secret as recommended by Slack.


</div>



## terraform-aws-security


### [v0.65.8](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.65.8)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/11/2022 | Modules affected: ssh-grunt | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.65.8">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Updated Go dependencies of `ssh-grunt` and `codegen` utilities. There are no updates to the functionality of the CLI tools.




</div>


### [v0.65.7](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.65.7)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/7/2022 | Modules affected: aws-config-multi-region, aws-config | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.65.7">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Added partial support for deploying AWS Config in previously unsupported region `ap-northeast-3`.




</div>



## terraform-aws-server


### [v0.14.8](https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.14.8)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/21/2022 | Modules affected: ec2-backup | <a href="https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.14.8">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Replaces hardcoded IAM arn with a data source, for compatibility with multiple partitions



</div>


### [v0.14.7](https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.14.7)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/15/2022 | Modules affected: single-server | <a href="https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.14.7">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fixes bug where IAM roles that were created through the AWS console could not be passed to the `single-server` module because of duplicate instance profile. Allows disabling the creation of instance profile internally inside the module.




</div>



## terraform-aws-service-catalog


### [v0.94.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.94.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/28/2022 | Modules affected: landingzone/account-baseline-app, landingzone/account-baseline-root, landingzone/account-baseline-security | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.94.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

-  **Unlock AWS provider v4. Require minimum 3.75.1 just for Landing Zone modules.** This update includes a few tests that make sure upgrading to this module from the last release is easy. However, you may need to bump your AWS provider version. See the migration guide notes below for more info.



</div>


### [v0.93.2](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.93.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/28/2022 | Modules affected: base/ec2-baseline, services/ec2-instance, mgmt/jenkins, mgmt/bastion-host | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.93.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  


- Exposed the ability to specify tags on `ecs-cluster` resources.
- Updated ARN references to dynamically look up the AWS partition information to support alternative partitions.
- Updated dependencies:
    - `terraform-aws-security`: `v0.65.6` =&gt; `v0.65.8`
    - Default version of `terraform` in `jenkins`: `v1.2.3` =&gt; `v1.2.4`
- Updated test dependencies.



</div>


### [v0.93.1](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.93.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/27/2022 | Modules affected: data-stores/aurora, data-stores/rds, data-stores/ecr-repos, mgmt/tailscale-subnet-router | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.93.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Added documentation for a hidden parameter `lifecycle_policy_rules` for ECR Repos.
- Added documentation for a hidden parameter `taints` for Managed Node Groups.
- Added support for specifying a custom security group name for RDS and ECS Services.
- Added support for configuring performance insights on Aurora.
- Updated dependencies:
    - `terraform-aws-asg`
    - `terraform-aws-lambda`
    - `terraform-aws-data-storage`
    - `terraform-aws-vpc`
    - `terraform-aws-ci` 



</div>



## terraform-aws-static-assets


### [v0.15.7](https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.15.7)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/26/2022 | Modules affected: s3-cloudfront, s3-static-website | <a href="https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.15.7">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Added support for associating CloudFront functions with the CloudFront distribution managed with the `s3-cloudfront` module.
- Updated the website S3 bucket with additional security configurations when operating in private bucket mode:
    - The bucket will now configure [blocking of public access](https://aws.amazon.com/s3/features/block-public-access/) for the objects.
    - The bucket will now enforce encryption of data in transit (only accessible over TLS).




</div>


### [v0.15.6](https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.15.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/25/2022 | Modules affected: s3-cloudfront | <a href="https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.15.6">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Adds `cloudfront_distribution_domain_name` as output var



</div>



## terraform-aws-vpc


### [v0.22.3](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.22.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/7/2022 | Modules affected: network-acl-inbound, network-acl-outbound, port-range-calculator, vpc-app-network-acls | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.22.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Added a new input variable `exclude_ports_from_inbound_all` that can be used to exclude a list of ports from the inbound global CIDR rules in the network acl modules. This is useful for adhering to certain compliance standards like CIS that explicitly deny any allow rule for administrative ports.




</div>


### [v0.22.2](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.22.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/7/2022 | Modules affected: vpc-flow-logs | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.22.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Removed the `log:CreateLogGroup` permissions from the VPC Flow Logs. This was unnecessary as the Log Groups are managed in Terraform, and in fact can lead to a race condition where the Log Group gets recreated after deletion.




</div>

<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "releases",
  "hash": "51992003b22e42963e7a70d0935954e8"
}
##DOCS-SOURCER-END -->


# Gruntwork release 2022-08

<p style={{marginTop: "-25px"}}><small><a href="/guides">Guides</a> / <a href="/guides/stay-up-to-date">Update Guides</a> / <a href="/guides/stay-up-to-date/releases">Releases</a> / 2022-08</small></p>

This page is lists all the updates to the [Gruntwork Infrastructure as Code 
Library](https://gruntwork.io/infrastructure-as-code-library/) that were released in 2022-08. For instructions 
on how to use these updates in your code, check out the [updating 
documentation](/guides/working-with-code/using-modules#updating).

Here are the repos that were updated:

- [gruntkms](#gruntkms)
- [gruntwork](#gruntwork)
- [terraform-aws-architecture-catalog](#terraform-aws-architecture-catalog)
- [terraform-aws-cache](#terraform-aws-cache)
- [terraform-aws-ci](#terraform-aws-ci)
- [terraform-aws-ci-steampipe](#terraform-aws-ci-steampipe)
- [terraform-aws-cis-service-catalog](#terraform-aws-cis-service-catalog)
- [terraform-aws-ecs](#terraform-aws-ecs)
- [terraform-aws-eks](#terraform-aws-eks)
- [terraform-aws-lambda](#terraform-aws-lambda)
- [terraform-aws-load-balancer](#terraform-aws-load-balancer)
- [terraform-aws-messaging](#terraform-aws-messaging)
- [terraform-aws-monitoring](#terraform-aws-monitoring)
- [terraform-aws-openvpn](#terraform-aws-openvpn)
- [terraform-aws-server](#terraform-aws-server)
- [terraform-aws-service-catalog](#terraform-aws-service-catalog)
- [terraform-aws-static-assets](#terraform-aws-static-assets)


## gruntkms


### [v0.0.11](https://github.com/gruntwork-io/gruntkms/releases/tag/v0.0.11)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/2/2022 | <a href="https://github.com/gruntwork-io/gruntkms/releases/tag/v0.0.11">Release notes</a></small>
</p>


- Updated decryption routine to decrypt multiple ciphertexts in the input concurrently to improve performance.


Special thanks to @rubysolo for their contribution.


https://github.com/gruntwork-io/gruntkms/pull/36




## gruntwork


### [v0.3.10](https://github.com/gruntwork-io/gruntwork/releases/tag/v0.3.10)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/24/2022 | <a href="https://github.com/gruntwork-io/gruntwork/releases/tag/v0.3.10">Release notes</a></small>
</p>

Fix a bug causing the git ref used to fetch the boilerplate template for the form wizard to be out of date.


### [v0.3.9](https://github.com/gruntwork-io/gruntwork/releases/tag/v0.3.9)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/22/2022 | <a href="https://github.com/gruntwork-io/gruntwork/releases/tag/v0.3.9">Release notes</a></small>
</p>

This release adds two new commands: 
* `gruntwork vault login` - quickly log into any account defined in your [aws-vault](https://github.com/99designs/aws-vault) account profiles 
* `gruntwork vault exec` - quickly execute an arbitrary command against any account defined in your aws-vault account profiles 

These commands are intended to be used in conjunction with the `gruntwork vault generate` command, for scaffolding aws-vault account profiles from your infrastructure-live repository. 


### [v0.3.8](https://github.com/gruntwork-io/gruntwork/releases/tag/v0.3.8)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/17/2022 | <a href="https://github.com/gruntwork-io/gruntwork/releases/tag/v0.3.8">Release notes</a></small>
</p>

This release adds a new command `gruntwork vault generate` that assists you in generating valid [aws-vault](https://github.com/99designs/aws-vault) account profiles for your Ref Arch AWS accounts, to ease login and executing commands.



## terraform-aws-architecture-catalog


### [v0.0.32](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v0.0.32)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/4/2022 | <a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v0.0.32">Release notes</a></small>
</p>

* Updates terraform-aws-cis-service-catalog ref to latest version by @yorinasub17 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/784
* Fix Jenkins dockerfile and jenkinsfile config to properly auth by @yorinasub17 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/768
* Bump dependency versions by @yorinasub17 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/789


**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-architecture-catalog/compare/v0.0.31...v0.0.32


### [v0.0.31](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v0.0.31)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/2/2022 | <a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v0.0.31">Release notes</a></small>
</p>

* Only check versioning tools locally by @yorinasub17 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/657
* Fix release lock logic by @yorinasub17 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/658
* Remove unused InfraLiveURLType by @zackproser in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/663
* Return all Route53 hosted zone errors after verification by @zackproser in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/662
* Implement lock status report command by @zackproser in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/656
* Implement preflight to sanity check all fields for completion by @zackproser in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/661
* Tweak preflight check so it works on aws hardware by @yorinasub17 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/665
* Allow different env var for preflight check GH token by @yorinasub17 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/664
* Add skip ci message in state machine commit by @yorinasub17 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/673
* Cleanup workflow files post deploy by @yorinasub17 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/676



## terraform-aws-cache


### [v0.18.1](https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v0.18.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/2/2022 | <a href="https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v0.18.1">Release notes</a></small>
</p>


(none)



- No functional changes were introduced in this release!
- Updated incorrect go package reference.





### [v0.18.0](https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v0.18.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/2/2022 | Modules affected: memcached, redis | <a href="https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v0.18.0">Release notes</a></small>
</p>



- Some housekeeping updates.
- **Unlock AWS provider v4. Require minimum 3.75.1.** This update includes a few tests that make sure upgrading to this module from the last release is easy. However, you may need to bump your AWS provider version. See the migration guide notes below for more.




## terraform-aws-ci


### [v0.50.7](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.50.7)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/12/2022 | Modules affected: terraform-helpers | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.50.7">Release notes</a></small>
</p>



- Updated `terraform-update-variable` to make the formatting step optional, allowing you to run it without `terraform` being available in the `PATH`.





### [v0.50.6](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.50.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/3/2022 | Modules affected: ecs-deploy-runner-standard-configuration, ecs-deploy-runner | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.50.6">Release notes</a></small>
</p>



- Added support in `build-docker-image` ECS Deploy Runner script for injecting docker buildkit compatible secrets into Kaniko builds via the `--env-secret` parameter.





### [v0.50.5](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.50.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/2/2022 | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.50.5">Release notes</a></small>
</p>



- Improvements to upgrade testing







## terraform-aws-ci-steampipe


### [v0.3.4](https://github.com/gruntwork-io/terraform-aws-ci-steampipe/releases/tag/v0.3.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/4/2022 | Modules affected: ecs-deploy-runner-with-steampipe, steampipe-runner | <a href="https://github.com/gruntwork-io/terraform-aws-ci-steampipe/releases/tag/v0.3.4">Release notes</a></small>
</p>


- `ecs-deploy-runner-with-steampipe`
- `steampipe-runner`

- Updated dependencies:
    - `terraform-aws-service-catalog`: `v0.92.0` => `v0.95.0`
    - `terraform-aws-security`: `v0.65.6` => `v0.65.8`
    - Various test dependencies.

https://github.com/gruntwork-io/terraform-aws-ci-steampipe/pull/31



## terraform-aws-cis-service-catalog


### [v0.41.0](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.41.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/11/2022 | Modules affected: landingzone/account-baseline-app, landingzone/account-baseline-root, landingzone/account-baseline-security, networking/vpc-mgmt | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.41.0">Release notes</a></small>
</p>



- Updated for-production examples for Reference Architecture
- Updated dependencies:
    - `terraform-aws-service-catalog`: `v0.95.0` to `v0.96.1`
- **Unlocked AWS provider v4. Require minimum 3.75.1.**
    - In [v0.39.0](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.39.0), we missed several module updates in the underlying `terraform-aws-service-catalog` dependency of this repo. 
    - That has been remedied in [gruntwork-io/terraform-aws-service-catalog@v0.96.1 (release)](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.96.1). 
    - Now we've updated all references in `terraform-aws-cis-service-catalog` to point to the latest, AWS Provider v4 unlocked, version of `terraform-aws-service-catalog`. 
    - No configuration changes are required by you. Please see the migration guide below.


### [v0.40.1](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.40.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/4/2022 | Modules affected: landingzone/account-baseline-app, landingzone/account-baseline-root, landingzone/account-baseline-security, networking/vpc-mgmt | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.40.1">Release notes</a></small>
</p>



- Update dependencies:
    - `terraform-aws-service-catalog`: `v0.94.0` to `v0.95.0`
    - `terraform-aws-monitoring`: `v0.35.2` to `v0.35.3`
    - Various test dependencies





### [v0.40.0](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.40.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/3/2022 | Modules affected: landingzone/account-baseline-app, landingzone/account-baseline-root, landingzone/account-baseline-security, security/aws-securityhub | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.40.0">Release notes</a></small>
</p>



- Renamed variable `associate_to_master_account_id` to `associate_to_admin_account_id` in `aws-securityhub` module to align with latest AWS documentation.



### [v0.39.0](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.39.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/2/2022 | Modules affected: landingzone/account-baseline-app, landingzone/account-baseline-root, landingzone/account-baseline-security, networking/vpc | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.39.0">Release notes</a></small>
</p>



- **Unlock AWS provider v4. Require minimum 3.75.1.** This update includes a few tests that make sure upgrading to this module from the last release is easy. However, you may need to bump your AWS provider version. See the migration guide notes below for more info.




## terraform-aws-ecs


### [v0.34.1](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.34.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/18/2022 | Modules affected: ecs-cluster | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.34.1">Release notes</a></small>
</p>



- Updated `ecs-cluster` module to use the `aws_ecs_cluster_capacity_providers` to avoid the need for a python script on destroy.





### [v0.34.0](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.34.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/4/2022 | Modules affected: ecs-cluster, ecs-daemon-service, ecs-service | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.34.0">Release notes</a></small>
</p>



- Internal housekeeping changes
  - Added patch for `v0.32.0`
  - Added patch for `v0.33.0`
  - Updated code owners
  - Added patch for `v0.31.0`
- **Unlock AWS provider v4. Require minimum 3.75.1.** This update includes a few tests that make sure upgrading to this module from the last release is easy. However, you may need to bump your AWS provider version. See the migration guide notes below for more.




## terraform-aws-eks


### [v0.53.0](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.53.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/8/2022 | Modules affected: eks-alb-ingress-controller, eks-alb-ingress-controller-iam-policy, eks-aws-auth-merger, eks-cloudwatch-agent | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.53.0">Release notes</a></small>
</p>



- Housekeeping fixes:
  - Fixed Helm link in `alb-ingress-controller` `README`
  - Fixed contributing docs link
  - Updated code owners
- **Unlock AWS provider v4. Require minimum 3.75.1.** This update includes a few tests that make sure upgrading to this module from the last release is easy. However, you may need to bump your AWS provider version. See the migration guide notes below for more.




## terraform-aws-lambda


### [v0.20.3](https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.20.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/3/2022 | Modules affected: run-lambda-entrypoint | <a href="https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.20.3">Release notes</a></small>
</p>



- Updated `run-lambda-entrypoint` CLI to support loading Secrets Manager entries by name instead of ARN. You can now pass a Secrets Manager name to the `_ARN` environment variables that the entrypoint CLI supports.






## terraform-aws-load-balancer


### [v0.29.1](https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.29.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/2/2022 | <a href="https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.29.1">Release notes</a></small>
</p>


- No functional changes were introduced with this release!
- Updated incorrect go package reference.







### [v0.29.0](https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.29.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/1/2022 | Modules affected: alb, acm-tls-certificate, lb-listener-rules | <a href="https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.29.0">Release notes</a></small>
</p>


- **Unlock AWS provider v4. Require minimum 3.75.1.** This update includes a few tests that make sure upgrading to this module from the last release is easy. However, you may need to bump your AWS provider version. See the migration guide notes below for more.




## terraform-aws-messaging


### [v0.9.1](https://github.com/gruntwork-io/terraform-aws-messaging/releases/tag/v0.9.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/2/2022 | <a href="https://github.com/gruntwork-io/terraform-aws-messaging/releases/tag/v0.9.1">Release notes</a></small>
</p>


- No functional changes were introduced in this release!
- Updated incorrect go package reference.




### [v0.9.0](https://github.com/gruntwork-io/terraform-aws-messaging/releases/tag/v0.9.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/1/2022 | Modules affected: kinesis, msk, sns-sqs-connection, sns | <a href="https://github.com/gruntwork-io/terraform-aws-messaging/releases/tag/v0.9.0">Release notes</a></small>
</p>



- **Unlock AWS provider v4. Require minimum 3.75.1.** This update includes a few tests that make sure upgrading to this module from the last release is easy. However, you may need to bump your AWS provider version. See the migration guide notes below for more.




## terraform-aws-monitoring


### [v0.35.5](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.35.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/26/2022 | Modules affected: logs | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.35.5">Release notes</a></small>
</p>



- `modules/logs` updated to only install logrotate from source if the RPM isn't already installed




### [v0.35.4](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.35.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/18/2022 | Modules affected: alarms/alb-alarms, alarms/alb-target-group-alarms, alarms/asg-cpu-alarms, alarms/asg-disk-alarms | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.35.4">Release notes</a></small>
</p>



- Updated all alarms module to expose `treat_missing_data` as a configurable parameter.






### [v0.35.3](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.35.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/4/2022 | Modules affected: All | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.35.3">Release notes</a></small>
</p>



- Renamed legacy `vars.tf` files to `variables.tf`.







## terraform-aws-openvpn


### [v0.24.3](https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.24.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/10/2022 | Modules affected: openvpn-admin | <a href="https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.24.3">Release notes</a></small>
</p>



- Update dependencies of `openvpn-admin` utility to support usage with AWS SSO.






### [v0.24.2](https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.24.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/8/2022 | <a href="https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.24.2">Release notes</a></small>
</p>



- Add retroactive patches for backward incompatible versions `v0.20.0` to `v0.24.0`







## terraform-aws-server


### [v0.15.1](https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.15.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/2/2022 | <a href="https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.15.1">Release notes</a></small>
</p>


- No functional changes were introduced in this release!
- Updated incorrect go package reference





### [v0.15.0](https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.15.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/1/2022 | Modules affected: ec2-backup, single-server | <a href="https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.15.0">Release notes</a></small>
</p>



- **Unlock AWS provider v4. Require minimum 3.75.1.** This update includes a few tests that make sure upgrading to this module from the last release is easy. However, you may need to bump your AWS provider version. See the migration guide notes below for more.




## terraform-aws-service-catalog


### [v0.96.2](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.96.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/19/2022 | Modules affected: services/k8s-service, landingzone/account-baseline-root, mgmt/terraform-aws-openvpn, mgmt/jenkins | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.96.2">Release notes</a></small>
</p>



- Exposed the `cleanup_on_fail` parameter in `k8s-service` module's `helm_release` resource.
- Updated `landingzone/account-baseline-root` to expose `advanced_event_selectors` for Cloudtrail as `cloudtrail_advanced_event_selectors`.
- Updated `rds` module to make the `option_group_name` parameter configurable.
- Updated `jenkins` to allow configuring without a Route53 entry.
- Updated dependencies:
    - `terraform-aws-openvpn`: `v0.24.1` to `v0.24.3`




### [v0.96.1](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.96.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/11/2022 | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.96.1">Release notes</a></small>
</p>



- **Unlock AWS Provider v4. Require minimum 3.75.1.** In https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.96.0, we missed a few spots. This release updates the above modules with the same minimum version of 3.75.1, with no upper limit. These updates arose from bumping the following underlying library modules:
  - `terraform-aws-server`
  - `terraform-aws-load-balancer`
  - `terraform-aws-cache`
  - `terraform-aws-messaging`
 
Special thanks to @lorelei-rupp-imprivata for catching this issue!



### [v0.96.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.96.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/9/2022 | Modules affected: services, base, data-stores, landingzone | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.96.0">Release notes</a></small>
</p>



- Module dependency updates, to unlock Terraform AWS Provider v4:
  - Update Terraform github.com/gruntwork-io/terraform-aws-eks to v0.53.0
  - Update Terraform github.com/gruntwork-io/terraform-aws-ecs to v0.34.0
- **Unlock AWS provider v4. Require minimum 3.75.1.** This update includes a few tests that make sure upgrading to this module from the last release is easy. However, you may need to bump your AWS provider version. See the migration guide notes below for more.



### [v0.95.1](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.95.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/5/2022 | Modules affected: base/ec2-baseline, services/ec2-instance, mgmt/jenkins, mgmt/bastion-host | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.95.1">Release notes</a></small>
</p>



- Exposed the ability to set AWS Tags on the resources managed by the `ecs-deploy-runner` module.
- Updated dependencies:
    - `terraform-aws-monitoring`: `v0.35.2` to `v0.35.3`
    - Updated test dependencies.
- Updated `for-production` example to the latest iteration of the Reference Architecture.




### [v0.95.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.95.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/4/2022 | Modules affected: networking/sns-topics, base/ec2-baseline, services/ec2-instance, mgmt/jenkins | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.95.0">Release notes</a></small>
</p>



- Updated dependencies:
    - `terraform-aws-ci`: `v0.50.3` to `v0.50.6`
    - `terraform-aws-monitoring`: `v0.34.1` to `v0.35.2`
- Updated `sns-topics` module to require passing through the Slack webhook URL using AWS Secrets Manager instead of directly as module variables. This is to treat the webhook URL more like a Secret as recommended by Slack.



### [v0.94.2](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.94.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/3/2022 | Modules affected: data-stores/aurora, data-stores/rds, landingzone/account-baseline-app, landingzone/account-baseline-root | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.94.2">Release notes</a></small>
</p>



- Updated dependency `terraform-aws-data-storage` from `v0.24.0` to `v0.24.2`
- Exposed new parameters to pass through permission boundaries to IAM Roles managed by the `account-baseline` modules.




### [v0.94.1](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.94.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/2/2022 | Modules affected: data-stores/aurora, services/public-static-website | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.94.1">Release notes</a></small>
</p>



- Updated `aurora` module to output the generated security group ID.
- Updated the website S3 bucket created in the `public-static-website` module with additional security configurations when operating in private bucket mode. The following changes are backward compatible with existing websites.
    - The bucket will now configure [blocking of public access](https://aws.amazon.com/s3/features/block-public-access/) for the objects.
    - The bucket will now enforce encryption of data in transit (only accessible over TLS).
- Added support for configuring [CloudFront Functions](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/cloudfront-functions.html), a more performant and lightweight alternative to Lambda@Edge, with static websites.
- Added support for implementing [default directory indexing](https://aws.amazon.com/blogs/compute/implementing-default-directory-indexes-in-amazon-s3-backed-amazon-cloudfront-origins-using-lambdaedge/) for private S3 bucket backed static websites.
- Added instructions to README on how to perform a blue-green deployment of Aurora.




## terraform-aws-static-assets


### [v0.15.8](https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.15.8)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/16/2022 | Modules affected: s3-cloudfront | <a href="https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.15.8">Release notes</a></small>
</p>



- Add support for s3 buckets with v4 Auth






<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "releases",
  "hash": "8bedc818ae9804c4c8b6b714518eea05"
}
##DOCS-SOURCER-END -->

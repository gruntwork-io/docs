
# Gruntwork release 2022-04

<p style={{marginTop: "-25px"}}><small><a href="/guides">Guides</a> / <a href="/guides/stay-up-to-date">Update Guides</a> / <a href="/guides/stay-up-to-date/releases">Releases</a> / 2022-04</small></p>

This page is lists all the updates to the [Gruntwork Infrastructure as Code 
Library](https://gruntwork.io/infrastructure-as-code-library/) that were released in 2022-04. For instructions 
on how to use these updates in your code, check out the [updating 
documentation](/guides/working-with-code/using-modules#updating).

Here are the repos that were updated:

- [terraform-aws-architecture-catalog](#terraform-aws-architecture-catalog)
- [terraform-aws-asg](#terraform-aws-asg)
- [terraform-aws-ci](#terraform-aws-ci)
- [terraform-aws-ci-steampipe](#terraform-aws-ci-steampipe)
- [terraform-aws-data-storage](#terraform-aws-data-storage)
- [terraform-aws-eks](#terraform-aws-eks)
- [terraform-aws-lambda](#terraform-aws-lambda)
- [terraform-aws-load-balancer](#terraform-aws-load-balancer)
- [terraform-aws-monitoring](#terraform-aws-monitoring)
- [terraform-aws-openvpn](#terraform-aws-openvpn)
- [terraform-aws-security](#terraform-aws-security)
- [terraform-aws-service-catalog](#terraform-aws-service-catalog)
- [terraform-aws-static-assets](#terraform-aws-static-assets)
- [terraform-aws-vpc](#terraform-aws-vpc)


## terraform-aws-architecture-catalog


### [v0.0.30](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v0.0.30)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/28/2022 | <a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v0.0.30">Release notes</a></small>
</p>

* Support authing without aws-vault on AWS hardware by @yorinasub17 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/645
* Bump go-commons and urfave/cli by @yorinasub17 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/652
* Save state machine state to git on error by @yorinasub17 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/650
* Remove the repo_token at the end of a deployment by @yorinasub17 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/653
* Lock by repo by @yorinasub17 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/651
* Update deploy-infra.sh by @yorinasub17 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/654
* Docs: Fix broken links in Service Catalog docs and standardize names and conventions by @iangrunt in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/649


**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-architecture-catalog/compare/v0.0.29...v0.0.30


### [v0.0.29](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v0.0.29)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/21/2022 | <a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v0.0.29">Release notes</a></small>
</p>

* Take into account submitted quotas by @yorinasub17 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/590
* Make sure to encrypt sns topic with CMK to allow CloudWatch to publish alarms by @yorinasub17 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/591
* Run go mod tidy to ensure go.sum is correct for linux by @yorinasub17 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/592
* Make sure account_id is included in account-baseline-security by @yorinasub17 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/595
* 12.5 rolled off available RDS versions list so bump to latest by @yorinasub17 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/597
* 14.1 is too new and our sample app doesn't support it by @yorinasub17 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/598
* Implement preflight check for GitHub PAT validity by @zackproser in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/596
* Implement preflight check for repo URLs validity by @zackproser in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/600
* Update deprecated circleci images to latest by @yorinasub17 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/601
* Fix bug where fargate logs are not being shipped from EKS by @yorinasub17 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/602



## terraform-aws-asg


### [v0.17.6](https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.17.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/21/2022 | <a href="https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.17.6">Release notes</a></small>
</p>



- Example `server-group/without-load-balancer` updated to replace deprecated data source `aws_subnet_ids` with `aws_subnets`.






### [v0.17.5](https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.17.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/19/2022 | Modules affected: server-group | <a href="https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.17.5">Release notes</a></small>
</p>



- Adds compatibility with running on various AWS partitions (e.g. GovCloud and other private partitions)





## terraform-aws-ci


### [v0.47.9](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.47.9)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/26/2022 | Modules affected: sign-binary-helpers, infrastructure-deployer | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.47.9">Release notes</a></small>
</p>



- Introduced new module `sign-binary-helpers` that can sign executable files for MacOS and Windows.
- Added new option `--no-wait` to `infrastructure-deployer` CLI. When passed in, it will instruct the `infrastructure-deployer` not to wait for the ECS task to finish and immediately exit without error.




### [v0.47.8](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.47.8)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/22/2022 | Modules affected: infrastructure-deployer | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.47.8">Release notes</a></small>
</p>



- Fixed regression where the logs from `infrastructure-deployer` became very chatty after `v0.47.7`.





### [v0.47.7](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.47.7)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/22/2022 | Modules affected: infrastructure-deployer | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.47.7">Release notes</a></small>
</p>



- Updated `infrastructure-deployer` CLI to handle intermittent network connectivity errors when looking up the ECS task with retry logic.






### [v0.47.6](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.47.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/19/2022 | Modules affected: install-jenkins | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.47.6">Release notes</a></small>
</p>



- Fixed bug where the systemd file was unchanged for Jenkins, so all configurations were overwritten at boot time. Now we create a `systemd` override file so Jenkins uses the updated config setup at install time.




### [v0.47.5](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.47.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/19/2022 | Modules affected: ecs-deploy-runner-invoke-iam-policy, ecs-deploy-runner, iam-policies | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.47.5">Release notes</a></small>
</p>



- Updated all places where ARNs are hardcoded to be partition-aware




### [v0.47.4](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.47.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/18/2022 | Modules affected: ecs-deploy-runner | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.47.4">Release notes</a></small>
</p>



- Updated `ecs-deploy-runner` to support repositories that has dockerfiles on the root of the repository






### [v0.47.3](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.47.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/16/2022 | Modules affected: infrastructure-deployer | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.47.3">Release notes</a></small>
</p>



- Added retry logic in retrieving metadata of ECS tasks.





## terraform-aws-ci-steampipe


### [v0.1.0](https://github.com/gruntwork-io/terraform-aws-ci-steampipe/releases/tag/v0.1.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/21/2022 | Modules affected: ecs-deploy-runner-steampipe-standard-configuration, ecs-deploy-runner-with-steampipe-runner, steampipe-runner | <a href="https://github.com/gruntwork-io/terraform-aws-ci-steampipe/releases/tag/v0.1.0">Release notes</a></small>
</p>



Initial release of *Steampipe Runner for Gruntwork Pipelines*. This repo contains modules to configure Gruntwork Pipelines to continuously run Steampipe mod checks against an AWS account. Refer to the READMEs of the various modules for more information.



## terraform-aws-data-storage


### [v0.23.3](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.23.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/13/2022 | Modules affected: aurora | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.23.3">Release notes</a></small>
</p>



- Exposed `restore_to_time` parameter for point in time restore.






## terraform-aws-eks


### [v0.51.3](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.51.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/24/2022 | Modules affected: eks-k8s-cluster-autoscaler | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.51.3">Release notes</a></small>
</p>



- Fix issue with autoscaler priority expander `ConfigMap` not rendered properly



### [v0.51.2](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.51.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/24/2022 | Modules affected: eks-k8s-external-dns | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.51.2">Release notes</a></small>
</p>



- Exposed advanced `external-dns` parameters to tweak syncing behavior. These parameters are useful for avoiding the Route 53 API limits. Refer to [the new README section](https://github.com/gruntwork-io/terraform-aws-eks/tree/master/modules/eks-k8s-external-dns#how-do-i-address-throttling-with-the-route-53-api) for more details.






### [v0.51.1](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.51.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/22/2022 | Modules affected: eks-iam-role-assume-role-policy-for-service-account | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.51.1">Release notes</a></small>
</p>



- Exposed the condition operator for service account selection as a configurable parameter in `eks-iam-role-assume-role-policy-for-service-account`.






### [v0.51.0](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.51.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/20/2022 | Modules affected: eks-cluster-control-plane, eks-container-logs, eks-k8s-cluster-autoscaler, eks-k8s-external-dns | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.51.0">Release notes</a></small>
</p>


The default version of Kubernetes installed by the module has been updated to 1.22. As a result of this, the default version of addons were updated to support installation into 1.22. Specifically:

- `cluster-autoscaler`: The default app version and chart version has been updated to `1.22.6` and `9.17.0`.
- `aws-load-balancer-controller`: The default app version and chart version has been updated to `2.4.1` and `1.4.1`.
- `external-dns`: The chart version has been updated to 6.2.4
- `aws-for-fluent-bit`: The chart version has been updated to 0.1.15



### [v0.50.4](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.50.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/6/2022 | Modules affected: eks-cluster-control-plane, eks-cluster-managed-workers | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.50.4">Release notes</a></small>
</p>



- If provided, apply IAM permission boundaries to default fargate role in `eks-cluster-control-plane`
- Add ability to specify IAM permission boundaries to EKS worker role in `eks-cluster-managed-workers`





## terraform-aws-lambda


### [v0.18.5](https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.18.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/28/2022 | Modules affected: lambda | <a href="https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.18.5">Release notes</a></small>
</p>



- Updated dynamic block logic to fix perpetual changes shown in plan when using `image_uri`




### [v0.18.4](https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.18.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/14/2022 | Modules affected: lambda | <a href="https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.18.4">Release notes</a></small>
</p>



- Adds optional `security_group_description` input var




### [v.0.18.3](https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.18.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/8/2022 | Modules affected: lambda-edge, lambda | <a href="https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.18.3">Release notes</a></small>
</p>


- Adds compatibility with running on various AWS partitions (e.g. GovCloud and other private partitions)





## terraform-aws-load-balancer


### [v0.28.2](https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.28.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/8/2022 | Modules affected: lb-listener-rules | <a href="https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.28.2">Release notes</a></small>
</p>


Added the ability to use the OIDC Authentication feature of the AWS Loadbalancer, described in [Authenticate users using an Application Load Balancer](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/listener-authenticate-users.html).
Because it always needs an action afterwards, the configuration is part of the forward, redirect and fixed_response listener rules.





## terraform-aws-monitoring


### [v0.33.3](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.33.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/15/2022 | Modules affected: logs/log-filter-to-slack | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.33.3">Release notes</a></small>
</p>


- Added new module for configuring a CloudWatch Log Group Subscription Filter that can stream filtered log entries to Slack.




### [v0.33.2](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.33.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/12/2022 | Modules affected: alarms | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.33.2">Release notes</a></small>
</p>



- Adds low_cpu_credit_balance explicitly for t2 instance classes




### [v0.33.1](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.33.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/8/2022 | Modules affected: alarms, logs | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.33.1">Release notes</a></small>
</p>



- Updated documentation with timeout examples for long-running tests
- New Feature: `logs` and `alarms` modules are partition aware (Commercial AWS, AWS Gov Cloud, etc)





## terraform-aws-openvpn


### [v0.23.1](https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.23.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/17/2022 | Modules affected: openvpn-server | <a href="https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.23.1">Release notes</a></small>
</p>



- Updated `openvpn-server` to support running in various AWS partitions (e.g. GovCloud and other private partitions).






## terraform-aws-security


### [v0.64.1](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.64.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/26/2022 | Modules affected: github-actions-iam-role | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.64.1">Release notes</a></small>
</p>



- Exposed the ability to configure the condition operator for GitHub Actions IAM role. This allows you to construct an IAM role that can be assumed by any repo in a particular org.






### [v0.64.0](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.64.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/20/2022 | Modules affected: aws-config-multi-region, aws-config, cloudtrail, cross-account-iam-roles | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.64.0">Release notes</a></small>
</p>



- The tests in this repository have been updated for more stability.
- [**BACKWARD INCOMPATIBLE**] Updated to use managed IAM policies instead of inline policies for all IAM roles. Managed IAM policies are more friendly for compliance checkers and is generally recommended by AWS as best practice.

Note that this is **a backward incompatible change**: a naive update to this version will cause the IAM policies to shuffle, which will result in a temporary downtime of IAM permissions. If you wish to avoid this, you can set the new `var.use_managed_iam_policies` to `false`.





## terraform-aws-service-catalog


### [v0.85.10](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.85.10)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/24/2022 | Modules affected: mgmt/ecs-deploy-runner, mgmt/jenkins, mgmt/tailscale-subnet-router, mgmt/openvpn-server | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.85.10">Release notes</a></small>
</p>



- Added the ability to configure tags on the openvpn server module.
- Exposed variable `auto_minor_version_upgrade` in `aurora` module.
- Updated dependencies:
    - `gruntwork-io/terraform-aws-ci`:  `v0.47.2` => `v0.47.8`
    - `gruntwork-io/terraform-aws-asg`: `v0.17.4` => `v0.17.6`
    - `gruntwork-io/terraform-aws-data-storage`: `v0.23.1` => `v0.23.3`
    - `gruntwork-io/terraform-aws-load-balancer`: `v0.28.0` => `v0.28.2`
    - `gruntwork-io/terraform-aws-lambda`: `v0.18.2` => `v0.18.4`


### [v0.85.9](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.85.9)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/21/2022 | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.85.9">Release notes</a></small>
</p>



- Updated `for-production` examples to the latest version of the Gruntwork Reference Architecture.






### [v0.85.8](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.85.8)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/21/2022 | Modules affected: services/lambda, services/eks-core-services | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.85.8">Release notes</a></small>
</p>



- Exposed output for the CloudWatch Log Group name in lambda service.
- Exposed the ability to configure the Cluster Autoscaler log verbosity




### [v0.85.7](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.85.7)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/21/2022 | Modules affected: services/eks-core-services | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.85.7">Release notes</a></small>
</p>



- Added the ability to optionally create k8s `PriorityClass` resources in `eks-core-services`.




### [v0.85.6](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.85.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/19/2022 | Modules affected: services/lambda | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.85.6">Release notes</a></small>
</p>



- Exposed `additional_security_group_ids` which can be used to attach additional security groups to the lambda function when using VPC.




### [v0.85.5](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.85.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/13/2022 | Modules affected: data-stores/rds, data-stores/aurora | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.85.5">Release notes</a></small>
</p>



- Added ability to bind a domain to database endpoints.






### [v0.85.4](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.85.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/11/2022 | Modules affected: mgmt/tailscale-subnet-router, services/k8s-service | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.85.4">Release notes</a></small>
</p>



- Fixed link to `install-tailscale.sh` script in documentation.
- Added the ability to expose multiple container ports in a Kubernetes service.





### [v0.85.3](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.85.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/8/2022 | Modules affected: services/eks-workers | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.85.3">Release notes</a></small>
</p>


- EKS Workers: Added inline comments for the max pods logic in the user-data script






## terraform-aws-static-assets


### [v0.14.1](https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.14.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/15/2022 | Modules affected: s3-static-website | <a href="https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.14.1">Release notes</a></small>
</p>



- Fixes ACL creation error when enforcing S3 bucket ownership




### [v0.14.0](https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.14.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/7/2022 | Modules affected: s3-static-website, s3-cloudfront | <a href="https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.14.0">Release notes</a></small>
</p>


Changed to add Terraform AWS 4.x provider support:
- `s3-static-website` **[BACKWARD INCOMPATIBLE]**

Version changes only:
- `s3-cloudfront`


Changes to support Terraform AWS 4.x provider in the `s3-static-website` module.




## terraform-aws-vpc


### [v0.21.1](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.21.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/17/2022 | Modules affected: vpc-app | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.21.1">Release notes</a></small>
</p>



- Allow a customer setting custom tags on all kind of route tables (public, private and private persistance)






<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "releases",
  "hash": "9617d73509e79ef375a331c1e5392cf4"
}
##DOCS-SOURCER-END -->

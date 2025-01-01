
# Gruntwork release 2022-04

<p style={{marginTop: "-25px"}}><small><a href="/guides">Guides</a> / <a href="/guides/stay-up-to-date">Update Guides</a> / <a href="/guides/stay-up-to-date/releases">Releases</a> / 2022-04</small></p>

This page is lists all the updates to the [Gruntwork Infrastructure as Code
Library](https://gruntwork.io/infrastructure-as-code-library/) that were released in 2022-04. For instructions
on how to use these updates in your code, check out the [updating
documentation](/library/stay-up-to-date/updating).

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

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Support authing without aws-vault on AWS hardware by @yorinasub17 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/645
* Bump go-commons and urfave/cli by @yorinasub17 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/652
* Save state machine state to git on error by @yorinasub17 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/650
* Remove the repo_token at the end of a deployment by @yorinasub17 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/653
* Lock by repo by @yorinasub17 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/651
* Update deploy-infra.sh by @yorinasub17 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/654
* Docs: Fix broken links in Service Catalog docs and standardize names and conventions by @iangrunt in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/649


**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-architecture-catalog/compare/v0.0.29...v0.0.30

</div>


### [v0.0.29](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v0.0.29)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/21/2022 | <a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v0.0.29">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Take into account submitted quotas by @yorinasub17 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/590
* Make sure to encrypt sns topic with CMK to allow CloudWatch to publish alarms by @yorinasub17 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/591
* Run go mod tidy to ensure go.sum is correct for linux by @yorinasub17 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/592
* Make sure account_id is included in account-baseline-security by @yorinasub17 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/595
* 12.5 rolled off available RDS versions list so bump to latest by @yorinasub17 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/597
* 14.1 is too new and our sample app doesn&apos;t support it by @yorinasub17 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/598
* Implement preflight check for GitHub PAT validity by @zackproser in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/596
* Implement preflight check for repo URLs validity by @zackproser in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/600
* Update deprecated circleci images to latest by @yorinasub17 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/601
* Fix bug where fargate logs are not being shipped from EKS by @yorinasub17 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/602
* Trim token scopes returned by GitHub API by @zackproser in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/603
* Flow through fix for NACL rules numbering by @zackproser in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/604
* Reflect changes from docs site by @yorinasub17 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/611
* Merge in base kms keys into shared services keys by @yorinasub17 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/614
* Rename jenkins vars to include Mgmt to avoid conflating by @yorinasub17 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/615
* Use correct GitHub PAT ARN for scope testing by @zackproser in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/619
* Adjust resource classes by @yorinasub17 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/610
* Fix generate code when there is no state machine by @yorinasub17 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/616
* Swap Ref Arch docs 03 and 04 position per customer feedback by @zackproser in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/633
* Update CI base images to ubuntu:20.04 by @zackproser in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/632
* Update quick start to point to knowledge base by @brikis98 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/617
* Write machine user&apos;s public SSH key to infra live by @zackproser in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/634
* Always write Admin IAM user credentials to a password file committed to VCS by @zackproser in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/636
* Harmonize QUICK_START footer with service catalog by @zackproser in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/640
* Use InfraLiveRepoURL in favor of get_git_origin_url. Deprecate latter by @zackproser in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/641
* Update QUICK_START.md to reference ADMIN_IAM_USER_PASSWORDS by @rhoboat in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/637
* Docs: Fix broken links in Service Catalog docs and standardize names and conventions  by @iangrunt in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/648

* @iangrunt made their first contribution in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/648

**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-architecture-catalog/compare/v0.0.28...v0.0.29

</div>



## terraform-aws-asg


### [v0.17.6](https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.17.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/21/2022 | <a href="https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.17.6">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Example `server-group/without-load-balancer` updated to replace deprecated data source `aws_subnet_ids` with `aws_subnets`.





</div>


### [v0.17.5](https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.17.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/19/2022 | Modules affected: server-group | <a href="https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.17.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Adds compatibility with running on various AWS partitions (e.g. GovCloud and other private partitions)



</div>



## terraform-aws-ci


### [v0.47.9](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.47.9)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/26/2022 | Modules affected: sign-binary-helpers, infrastructure-deployer | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.47.9">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Introduced new module `sign-binary-helpers` that can sign executable files for MacOS and Windows.
- Added new option `--no-wait` to `infrastructure-deployer` CLI. When passed in, it will instruct the `infrastructure-deployer` not to wait for the ECS task to finish and immediately exit without error.



</div>


### [v0.47.8](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.47.8)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/22/2022 | Modules affected: infrastructure-deployer | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.47.8">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fixed regression where the logs from `infrastructure-deployer` became very chatty after `v0.47.7`.




</div>


### [v0.47.7](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.47.7)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/22/2022 | Modules affected: infrastructure-deployer | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.47.7">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Updated `infrastructure-deployer` CLI to handle intermittent network connectivity errors when looking up the ECS task with retry logic.





</div>


### [v0.47.6](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.47.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/19/2022 | Modules affected: install-jenkins | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.47.6">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fixed bug where the systemd file was unchanged for Jenkins, so all configurations were overwritten at boot time. Now we create a `systemd` override file so Jenkins uses the updated config setup at install time.



</div>


### [v0.47.5](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.47.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/19/2022 | Modules affected: ecs-deploy-runner-invoke-iam-policy, ecs-deploy-runner, iam-policies | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.47.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Updated all places where ARNs are hardcoded to be partition-aware



</div>


### [v0.47.4](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.47.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/18/2022 | Modules affected: ecs-deploy-runner | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.47.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Updated `ecs-deploy-runner` to support repositories that has dockerfiles on the root of the repository





</div>


### [v0.47.3](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.47.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/16/2022 | Modules affected: infrastructure-deployer | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.47.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Added retry logic in retrieving metadata of ECS tasks.



</div>



## terraform-aws-ci-steampipe


### [v0.1.0](https://github.com/gruntwork-io/terraform-aws-ci-steampipe/releases/tag/v0.1.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/21/2022 | Modules affected: ecs-deploy-runner-steampipe-standard-configuration, ecs-deploy-runner-with-steampipe-runner, steampipe-runner | <a href="https://github.com/gruntwork-io/terraform-aws-ci-steampipe/releases/tag/v0.1.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

Initial release of *Steampipe Runner for Gruntwork Pipelines*. This repo contains modules to configure Gruntwork Pipelines to continuously run Steampipe mod checks against an AWS account. Refer to the READMEs of the various modules for more information.

</div>



## terraform-aws-data-storage


### [v0.23.3](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.23.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/13/2022 | Modules affected: aurora | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.23.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Exposed `restore_to_time` parameter for point in time restore.




</div>



## terraform-aws-eks


### [v0.51.3](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.51.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/24/2022 | Modules affected: eks-k8s-cluster-autoscaler | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.51.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fix issue with autoscaler priority expander `ConfigMap` not rendered properly


</div>


### [v0.51.2](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.51.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/24/2022 | Modules affected: eks-k8s-external-dns | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.51.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Exposed advanced `external-dns` parameters to tweak syncing behavior. These parameters are useful for avoiding the Route 53 API limits. Refer to [the new README section](https://github.com/gruntwork-io/terraform-aws-eks/tree/master/modules/eks-k8s-external-dns#how-do-i-address-throttling-with-the-route-53-api) for more details.





</div>


### [v0.51.1](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.51.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/22/2022 | Modules affected: eks-iam-role-assume-role-policy-for-service-account | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.51.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Exposed the condition operator for service account selection as a configurable parameter in `eks-iam-role-assume-role-policy-for-service-account`.





</div>


### [v0.51.0](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.51.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/20/2022 | Modules affected: eks-cluster-control-plane, eks-container-logs, eks-k8s-cluster-autoscaler, eks-k8s-external-dns | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.51.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
The default version of Kubernetes installed by the module has been updated to 1.22. As a result of this, the default version of addons were updated to support installation into 1.22. Specifically:

- `cluster-autoscaler`: The default app version and chart version has been updated to `1.22.6` and `9.17.0`.
- `aws-load-balancer-controller`: The default app version and chart version has been updated to `2.4.1` and `1.4.1`.
- `external-dns`: The chart version has been updated to 6.2.4
- `aws-for-fluent-bit`: The chart version has been updated to 0.1.15


</div>


### [v0.50.4](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.50.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/6/2022 | Modules affected: eks-cluster-control-plane, eks-cluster-managed-workers | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.50.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- If provided, apply IAM permission boundaries to default fargate role in `eks-cluster-control-plane`
- Add ability to specify IAM permission boundaries to EKS worker role in `eks-cluster-managed-workers`



</div>



## terraform-aws-lambda


### [v0.18.5](https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.18.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/28/2022 | Modules affected: lambda | <a href="https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.18.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Updated dynamic block logic to fix perpetual changes shown in plan when using `image_uri`



</div>


### [v0.18.4](https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.18.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/14/2022 | Modules affected: lambda | <a href="https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.18.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Adds optional `security_group_description` input var



</div>


### [v.0.18.3](https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.18.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/8/2022 | Modules affected: lambda-edge, lambda | <a href="https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.18.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- Adds compatibility with running on various AWS partitions (e.g. GovCloud and other private partitions)



</div>



## terraform-aws-load-balancer


### [v0.28.2](https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.28.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/8/2022 | Modules affected: lb-listener-rules | <a href="https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.28.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
Added the ability to use the OIDC Authentication feature of the AWS Loadbalancer, described in [Authenticate users using an Application Load Balancer](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/listener-authenticate-users.html).
Because it always needs an action afterwards, the configuration is part of the forward, redirect and fixed_response listener rules.



</div>



## terraform-aws-monitoring


### [v0.33.3](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.33.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/15/2022 | Modules affected: logs/log-filter-to-slack | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.33.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- Added new module for configuring a CloudWatch Log Group Subscription Filter that can stream filtered log entries to Slack.



</div>


### [v0.33.2](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.33.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/12/2022 | Modules affected: alarms | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.33.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Adds low_cpu_credit_balance explicitly for t2 instance classes



</div>


### [v0.33.1](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.33.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/8/2022 | Modules affected: alarms, logs | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.33.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Updated documentation with timeout examples for long-running tests
- New Feature: `logs` and `alarms` modules are partition aware (Commercial AWS, AWS Gov Cloud, etc)



</div>



## terraform-aws-openvpn


### [v0.23.1](https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.23.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/17/2022 | Modules affected: openvpn-server | <a href="https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.23.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Updated `openvpn-server` to support running in various AWS partitions (e.g. GovCloud and other private partitions).




</div>



## terraform-aws-security


### [v0.64.1](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.64.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/26/2022 | Modules affected: github-actions-iam-role | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.64.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Exposed the ability to configure the condition operator for GitHub Actions IAM role. This allows you to construct an IAM role that can be assumed by any repo in a particular org.





</div>


### [v0.64.0](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.64.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/20/2022 | Modules affected: aws-config-multi-region, aws-config, cloudtrail, cross-account-iam-roles | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.64.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- The tests in this repository have been updated for more stability.
- [**BACKWARD INCOMPATIBLE**] Updated to use managed IAM policies instead of inline policies for all IAM roles. Managed IAM policies are more friendly for compliance checkers and is generally recommended by AWS as best practice.

Note that this is **a backward incompatible change**: a naive update to this version will cause the IAM policies to shuffle, which will result in a temporary downtime of IAM permissions. If you wish to avoid this, you can set the new `var.use_managed_iam_policies` to `false`.



</div>



## terraform-aws-service-catalog


### [v0.85.10](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.85.10)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/24/2022 | Modules affected: mgmt/ecs-deploy-runner, mgmt/jenkins, mgmt/tailscale-subnet-router, mgmt/openvpn-server | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.85.10">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Added the ability to configure tags on the openvpn server module.
- Exposed variable `auto_minor_version_upgrade` in `aurora` module.
- Updated dependencies:
    - `gruntwork-io/terraform-aws-ci`:  `v0.47.2` =&gt; `v0.47.8`
    - `gruntwork-io/terraform-aws-asg`: `v0.17.4` =&gt; `v0.17.6`
    - `gruntwork-io/terraform-aws-data-storage`: `v0.23.1` =&gt; `v0.23.3`
    - `gruntwork-io/terraform-aws-load-balancer`: `v0.28.0` =&gt; `v0.28.2`
    - `gruntwork-io/terraform-aws-lambda`: `v0.18.2` =&gt; `v0.18.4`
    - Default version of `helm` installed on Jenkins server: `v3.8.0` =&gt; `v3.8.2`    



</div>


### [v0.85.9](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.85.9)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/21/2022 | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.85.9">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Updated `for-production` examples to the latest version of the Gruntwork Reference Architecture.





</div>


### [v0.85.8](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.85.8)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/21/2022 | Modules affected: services/lambda, services/eks-core-services | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.85.8">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Exposed output for the CloudWatch Log Group name in lambda service.
- Exposed the ability to configure the Cluster Autoscaler log verbosity



</div>


### [v0.85.7](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.85.7)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/21/2022 | Modules affected: services/eks-core-services | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.85.7">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Added the ability to optionally create k8s `PriorityClass` resources in `eks-core-services`.



</div>


### [v0.85.6](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.85.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/19/2022 | Modules affected: services/lambda | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.85.6">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Exposed `additional_security_group_ids` which can be used to attach additional security groups to the lambda function when using VPC.



</div>


### [v0.85.5](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.85.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/13/2022 | Modules affected: data-stores/rds, data-stores/aurora | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.85.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Added ability to bind a domain to database endpoints.





</div>


### [v0.85.4](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.85.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/11/2022 | Modules affected: mgmt/tailscale-subnet-router, services/k8s-service | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.85.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fixed link to `install-tailscale.sh` script in documentation.
- Added the ability to expose multiple container ports in a Kubernetes service.




</div>


### [v0.85.3](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.85.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/8/2022 | Modules affected: services/eks-workers | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.85.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- EKS Workers: Added inline comments for the max pods logic in the user-data script




</div>



## terraform-aws-static-assets


### [v0.14.1](https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.14.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/15/2022 | Modules affected: s3-static-website | <a href="https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.14.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fixes ACL creation error when enforcing S3 bucket ownership



</div>


### [v0.14.0](https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.14.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/7/2022 | Modules affected: s3-static-website, s3-cloudfront | <a href="https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.14.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
Changed to add Terraform AWS 4.x provider support:
- `s3-static-website` **[BACKWARD INCOMPATIBLE]**

Version changes only:
- `s3-cloudfront`


Changes to support Terraform AWS 4.x provider in the `s3-static-website` module.

This release updates the `s3-static-website` module and other modules in this repo (`s3-cloudfront` and examples) that use `s3-static-website`. 


If not using `routing_rules`/`routing_rule`, point your module source to this release (`v0.14.0`), run `terraform init -upgrade`, and run `terraform apply`.

When you run `terraform apply` there should be no destroyed or recreated resources. You will see newly created resources and sometimes in-place modifications.

- Rename your usage of `routing_rules` to `routing_rule`.
- Convert your JSON to hcl using [json2hcl](https://github.com/kvz/json2hcl), or manually.
- Convert the resulting keys from CamelCase to snake_case.
- See the [variable definition](https://github.com/gruntwork-io/terraform-aws-static-assets/blob/e83a538195cb39a3280837146b928f4199014c33/modules/s3-static-website/variables.tf#L62-L114) for full details.

For example, you are currently passing in a JSON string such as:
```hcl
routing_rules = &lt;&lt;EOF
[&#x7B;
    &quot;Condition&quot;: &#x7B;
        &quot;KeyPrefixEquals&quot;: &quot;docs/&quot;
    &#x7D;,
    &quot;Redirect&quot;: &#x7B;
        &quot;ReplaceKeyPrefixWith&quot;: &quot;documents/&quot;
    &#x7D;
&#x7D;]
EOF
```

You may be able to use [json2hcl](https://github.com/kvz/json2hcl) to convert this into a map. Then you should also convert the CamelCase to snake_case.
```bash
$ echo &apos;&#x7B;
    &quot;Condition&quot;: &#x7B;
        &quot;KeyPrefixEquals&quot;: &quot;docs/&quot;
    &#x7D;,
    &quot;Redirect&quot;: &#x7B;
        &quot;ReplaceKeyPrefixWith&quot;: &quot;documents/&quot;
    &#x7D;
&#x7D;&apos; | json2hcl

&quot;Condition&quot; = &#x7B;
  &quot;KeyPrefixEquals&quot; = &quot;docs/&quot;
&#x7D;

&quot;Redirect&quot; = &#x7B;
  &quot;ReplaceKeyPrefixWith&quot; = &quot;documents/&quot;
&#x7D;
```

Finally:
```hcl
routing_rule = &#x7B;
  condition = &#x7B;
    key_prefix_equals = &quot;docs/&quot;
  &#x7D;
  redirect = &#x7B;
    replace_key_prefix_with = &quot;documents/&quot;
  &#x7D;
&#x7D;
```

Please note: The AWS provider only supports one (1) rule in the `routing_rule`.

Alas we had no choice but to drop support for the AWS Provider 3.x style of `routing_rules` for an S3 bucket&apos;s website configuration. The AWS Provider 4.x style is called `routing_rule` and has a different format. Previously you could pass in a JSON string which would get interpreted by the provider. Now, you must pass in a map to this `s3-static-website` module, which will appropriately funnel values from that map into the block format expected by the provider. See the [variable definition](https://github.com/gruntwork-io/terraform-aws-static-assets/blob/135ce97b6334248bf12a393ccf36c662504674ea/modules/s3-static-website/variables.tf#L62-L114) for more.


If you are not using routing rules, you have no backward incompatibilities with this upgrade. In this case, it is a **functionally backward compatible upgrade**, verified with partially automated upgrade testing. Upgrade testing was done to ensure that running init/plan/apply on pre-existing resources created by `s3-static-website` will not run into issues when you upgrade to this version of the module. 

 - Besides `routing_rules`, no other configuration changes are needed for users of `s3-static-website` module. We handled the remaining provider upgrade changes within the module itself, so that your module configuration can remain the same.
 - We have verified there is no need to run `terraform import` as suggested in the [Hashicorp upgrade guide](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/guides/version-4-upgrade).
 - However, you do need to bump the provider when upgrading. Read on.


Modules calling `s3-static-website` and `s3-cloudfront` have to bump the provider to at least 3.75.0 (`&gt;= 3.75.0`). You will need to rerun `apply` to add the new S3 bucket resources created by the AWS 4.x provider. Note that because `s3-static-website` and `s3-cloudfront` now require a minimum AWS provider version of `3.75.0`, you will need to run `terraform init` with `-upgrade` to pull the new provider version. See [HashiCorp&apos;s guide on upgrading providers](https://www.terraform.io/language/files/dependency-lock#new-version-of-an-existing-provider) for more details. 


- [Bump dependency terraform-aws-security to v0.63.1](https://github.com/gruntwork-io/terraform-aws-static-assets/pull/94)
- [Fix custom bucket policy and add tests](https://github.com/gruntwork-io/terraform-aws-static-assets/pull/96)

</div>



## terraform-aws-vpc


### [v0.21.1](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.21.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/17/2022 | Modules affected: vpc-app | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.21.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Allow a customer setting custom tags on all kind of route tables (public, private and private persistance)



</div>

<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "releases",
  "hash": "180fffd39171e9e527df19493c07ffea"
}
##DOCS-SOURCER-END -->


# Gruntwork release 2022-01

<p style={{marginTop: "-25px"}}><small><a href="/guides">Guides</a> / <a href="/guides/stay-up-to-date">Update Guides</a> / <a href="/guides/stay-up-to-date/releases">Releases</a> / 2022-01</small></p>

This page is lists all the updates to the [Gruntwork Infrastructure as Code
Library](https://gruntwork.io/infrastructure-as-code-library/) that were released in 2022-01. For instructions
on how to use these updates in your code, check out the [updating
documentation](/library/stay-up-to-date/updating).

Here are the repos that were updated:

- [repo-copier](#repo-copier)
- [terraform-aws-architecture-catalog](#terraform-aws-architecture-catalog)
- [terraform-aws-asg](#terraform-aws-asg)
- [terraform-aws-ci](#terraform-aws-ci)
- [terraform-aws-cis-service-catalog](#terraform-aws-cis-service-catalog)
- [terraform-aws-data-storage](#terraform-aws-data-storage)
- [terraform-aws-eks](#terraform-aws-eks)
- [terraform-aws-lambda](#terraform-aws-lambda)
- [terraform-aws-monitoring](#terraform-aws-monitoring)
- [terraform-aws-openvpn](#terraform-aws-openvpn)
- [terraform-aws-security](#terraform-aws-security)
- [terraform-aws-server](#terraform-aws-server)
- [terraform-aws-service-catalog](#terraform-aws-service-catalog)
- [terraform-aws-vpc](#terraform-aws-vpc)


## repo-copier


### [v0.0.24](https://github.com/gruntwork-io/repo-copier/releases/tag/v0.0.24)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/12/2022 | <a href="https://github.com/gruntwork-io/repo-copier/releases/tag/v0.0.24">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/repo-copier/pull/112: 

* You can now have `repo-copier` append a suffix to the name of each copied repo using the new `--repo-name-suffix` parameter. This is useful to ensure each repo name is unique and doesn&apos;t conflict with any repos you already have.
* Improve error handling on GitLab repos to make it clearer you must specify a group in the URL, not a repo or user.

</div>



## terraform-aws-architecture-catalog


### [v0.0.26](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v0.0.26)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/18/2022 | <a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v0.0.26">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  What&apos;s Changed
====================
- f73b8cb Documentation for tfenv and upgrading terraform. (#555)

</div>


### [v0.0.25](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v0.0.25)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/13/2022 | <a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v0.0.25">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Fix a bug in the destroy logic for CI / CD by @rhoboat in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/484
* Use commit SHA instead of short ref for the plan stage by @yorinasub17 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/486
* Guard against bad Alpha2 country codes in CACertFields by @zackproser in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/490
* Retrofit aws-vault profile generation by @zackproser in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/487
* Removing Marina and Rob from CODEOWNERS by @marinalimeira in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/492
* Fix role name in the docs for CIS deployments by @bwhaley in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/497
* Prevent deploy command running from wrong branch by @zackproser in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/485
* Fixes targets for EDR on the security account by @bwhaley in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/496
* Implement preflight check: machine user joined Org by @zackproser in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/498
* Undeploy docs that do not depend on app cluster type. by @rhoboat in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/426
* Bugfixes for latest deployment by @yorinasub17 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/505
* Update python circleci docker image to nextgen by @yorinasub17 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/506
* Update QUICK_START.md by @bwhaley in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/509
* Allow generating code as part of parseform command by @yorinasub17 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/510
* Add GitHub PR &amp; Issue Templates by @robmorgan in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/493
* Add ed25519 and ecdsa ssh key to known hosts for testing by @yorinasub17 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/512
* Clarify docs in 06-adding-a-new-account.md by @rhoboat in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/515
* [FEATURE BRANCH] Multiple include based DRY Terragrunt by @yorinasub17 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/438
* Reduce comment footprint of child by @yorinasub17 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/520
* Update dependency gruntwork-io/terraform-aws-service-catalog to v0.67.0 by @renovate in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/449
* Bugfix: Update refdir for examples by @yorinasub17 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/523
* Run go mod tidy in refarch-example-generator by @yorinasub17 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/522
* Update deploy-infra.sh by @bwhaley in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/511
* Update dependency gruntwork-io/terraform-aws-cis-service-catalog to v0.27.9 by @renovate in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/452
* Update dependency gruntwork-io/terraform-aws-security to v0.55.4 by @renovate in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/451
* Update dependency gruntwork-io/terraform-aws-ci to v0.39.6 by @renovate in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/450
* Add extended commentary on how the pipeline works with envcommon by @yorinasub17 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/529
* Remove Renovate config file by @marinalimeira in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/531
* Configure allow_ssh_from_security_group_ids in eks cluster module by @yorinasub17 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/526
* Give EDR permissions to manage itself by @yorinasub17 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/530
* Fix to handle data files in _envcommon folder by @yorinasub17 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/532
* Fix bug where envcommon detector doesn&apos;t handle nochange well by @yorinasub17 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/533
* Fix the infrastructure live repo URL to use https when using gitlab or github actions for CI by @yorinasub17 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/534
* macie2:Describe* is necessary for CIS by @yorinasub17 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/544
* Enable cloudwatch logs exports and deletion protection by @zackproser in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/548
* Avoid ECR repo name collisions during tests by @bwhaley in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/547
* Access logging on the Terraform state bucket by @bwhaley in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/546
* [skip ci] Update codeowners to reflect current owners by @yorinasub17 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/550
* Replace &apos;renovate.json&apos; with &apos;patcher&apos; in comments by @infraredgirl in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/549
* Combine renovate bot updates by @yorinasub17 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/551
* Plumb through custom VCS endpoints for GitLab by @bwhaley in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/462
* More renovatebot PRs by @yorinasub17 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/552
* Bump CIS service catalog to latest version by @yorinasub17 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/554

---

**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-architecture-catalog/compare/v0.0.24...v0.0.25

</div>



## terraform-aws-asg


### [v0.16.1](https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.16.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/26/2022 | Modules affected: [**NEW**] | <a href="https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.16.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- Adds support for  ASG [instance_refresh](https://docs.aws.amazon.com/autoscaling/ec2/userguide/asg-instance-refresh.html) to provide rolling deploys (i.e., replace N% of the ASG at a time), with health checks and a warm-up period


</div>



## terraform-aws-ci


### [v0.41.1](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.41.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/19/2022 | Modules affected: ecs-deploy-runner | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.41.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

Added `permissions_boundary` to `ecs-deploy-runner` ECS Task IAM role and ECS Task Execution IAM role.
- This variable is optional, and therefore backwards compatible. It will allow adding an additional layer of permissions restrictions and scope for the IAM role it applies to. 





</div>


### [v0.41.0](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.41.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/14/2022 | Modules affected: ecs-deploy-runner, gruntwork-module-circleci-helpers | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.41.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- `ecs-deploy-runner`
- `gruntwork-module-circleci-helpers` **[BACKWARD INCOMPATIBLE]**


- [ecs-deploy-runner] tfenv is now included in the ECS Deploy Runner for managing terraform versions.
    - This release updates the ECS Deploy Runner Dockerfile to include the installation of [`tfenv`](https://github.com/tfutils/tfenv). This means your CI/CD pipeline will be able to use multiple versions of terraform for the same repo, which makes upgrades easier! Read more about this feature in the [core-concepts docs](https://github.com/gruntwork-io/terraform-aws-ci/blob/v0.41.0/modules/ecs-deploy-runner/core-concepts.md#how-do-i-use-the-deploy-runner-with-multiple-terraform-versions).
    - This also necessitated a change to `gruntwork-module-circieci-helpers` module in the script `configure-environment-for-gruntwork-module`, which configures the CI build environment for typical Gruntwork modules. It now installs `tfenv` and includes a new configuration option `--tfenv-version`, which is enabled by default. If also configured to install `terraform`, this script will use `tfenv` to install and manage that `terraform` version. Because this change is backard incompatible, please see the migration guide below.


Most users will not be affected by the change to `configure-environment-for-gruntwork-module`. If you do not need terraform installed in your environment you would pass in `--terraform-version NONE`, and now you also must pass in `--tfenv-version NONE`. If you don&apos;t pass in `--tfenv-version NONE`, it will install the latest version of `tfenv`. Note: if you want to install terraform without tfenv, you would only set `--tfenv-version NONE`, and it will still install terraform as usual.


- https://github.com/gruntwork-io/terraform-aws-ci/pull/386
- https://github.com/gruntwork-io/terraform-aws-ci/pull/387

</div>


### [v0.40.2](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.40.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/14/2022 | Modules affected: ecs-deploy-runner | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.40.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Exposed the ability to configure reserved concurrent execution for ECS Deploy Runner invoker lambda.



</div>


### [v0.40.1](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.40.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/12/2022 | Modules affected: ecs-deploy-runner-standard-configuration, ecs-deploy-runner | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.40.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Updated `ecs-deploy-runner` to handle options without arguments by adding allowed options in list `allowed_options_without_args`





</div>



## terraform-aws-cis-service-catalog


### [v0.29.0](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.29.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/13/2022 | Modules affected: landingzone/account-baseline-app, landingzone/account-baseline-root, landingzone/account-baseline-security, security/aws-securityhub | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.29.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

Updated dependency `gruntwork-io/terraform-aws-service-catalog` to `v0.70.1`. As a part of this change, support for `ap-southeast-3` (Jakarta) region was added to the multi region modules. **This is a backward incompatible change - refer to the migration guide for more details.**


</div>


### [v0.28.1](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.28.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/11/2022 | Modules affected: security/revoke-unused-iam-credentials, security/cleanup-expired-certs | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.28.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Updated `cleanup-expired-certs` to configure reserved concurrent executions to 1
- Added a new module (`security/revoke-unused-iam-credentials`) that will automatically revoke unused IAM credentials



</div>



## terraform-aws-data-storage


### [v0.22.5](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.22.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/31/2022 | Modules affected: redshift | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.22.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Added `enhanced_vpc_routing` and `logging` options to `redshift` module.



</div>



## terraform-aws-eks


### [v0.47.2](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.47.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/26/2022 | Modules affected: eks-cluster-control-plane | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.47.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Updated control plane module to provision the required KMS permission to the CMK policy when using envelope encryption.



</div>


### [v0.47.1](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.47.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/26/2022 | Modules affected: eks-cluster-control-plane | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.47.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Bump `kubergrunt` to v0.8.0


</div>


### [v0.47.0](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.47.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/24/2022 | Modules affected: eks-cluster-control-plane, eks-cluster-workers | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.47.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Updated `aws` provider version constraints to ensure Terraform doesn&apos;t use one with a bug around launch templates.
- Added support for configuring prefix delegation mode on AWS VPC CNI. Prefix delegation mode increases the number of secondary IPs that can be provisioned to an EC2 instance, greatly expanding the number of Pods that can be scheduled on a node. Refer to [the updated documentation](https://github.com/gruntwork-io/terraform-aws-eks/tree/master/modules/eks-cluster-control-plane#how-do-i-increase-the-number-of-pods-for-my-worker-nodes) for more details.

Note that this change is functionally backward compatible, but due to complexities around Kubernetes versioning, some of the settings may not be available across all Kubernetes versions, and therefore this release is marked as backward incompatible out of caution. If you run into errors, or have issues with the AWS VPC CNI as a result of upgrading to this release, you can disable the prefix delegation management in the module by setting `var.use_vpc_cni_customize_script` input variable to `false`.



</div>


### [v0.46.10](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.46.10)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/11/2022 | Modules affected: eks-cluster-workers | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.46.10">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Update codeowners to reflect current owners
- Enable detailed monitoring control for ASG EC2s. A new variable `asg_enable_detailed_monitoring` allows you to configure whether or not detailed monitoring is enabled on the EC2 instances that comprise the EKS cluster workers auto scaling group. 





</div>


### [v0.46.9](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.46.9)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/7/2022 | Modules affected: eks-cluster-workers | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.46.9">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fixed bug where using name prefix breaks the iam role name output on `eks-cluster-workers` module.




</div>



## terraform-aws-lambda


### [v0.16.0](https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.16.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/26/2022 | Modules affected: keep-warm, lambda-edge, lambda, api-gateway-account-settings | <a href="https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.16.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Updated to manage CloudWatch Log Group for the lambda function in Terraform. This enables you to configure various settings, like KMS encryption keys for encrypted log events, and retention periods. This change is **backward incompatible**: refer to the migration guide down below for more details.



</div>


### [v0.15.0](https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.15.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/24/2022 | Modules affected: api-gateway-account-settings, keep-warm, lambda-edge, lambda | <a href="https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.15.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Updated to use managed IAM policies instead of inline policies for all IAM roles. Managed IAM policies are more friendly for compliance checkers and is generally recommended by AWS as best practice.

Note that this is **a backward incompatible change**: a naive update to this version will cause the IAM policies to shuffle, which will result in a temporary downtime of IAM permissions. If you wish to avoid this, you can set the new `var.use_managed_iam_policies` to `false`.



</div>



## terraform-aws-monitoring


### [v0.30.5](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.30.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/7/2022 | Modules affected: logs/load-balancer-access-logs | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.30.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Exposed the ability to configure s3 server access logging for the ELB/ALB access logs bucket




</div>


### [v0.30.4](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.30.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/6/2022 | Modules affected: metrics, alarms | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.30.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- `cloudwatch-custom-metrics-iam-policy`: Added comment explaining why &quot;ec2:DescribeTags&quot; is needed
- Updated `sns-to-slack` module to use python 3.7 instead of 2.7.



</div>



## terraform-aws-openvpn


### [v0.19.1](https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.19.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/14/2022 | Modules affected: openvpn-admin | <a href="https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.19.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- openvpn-admin: Fixes a bug that was causing `openvpn-admin` to return the instance&apos;s private IPv4 address. `openvpn-admin` now correctly returns the instance&apos;s public IPv4 address.





</div>


### [v0.19.0](https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.19.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/7/2022 | Modules affected: backup-openvpn-pki, install-openvpn, openvpn-server, start-openvpn-admin | <a href="https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.19.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Require IMDSv2 in aws_launch_configuration. This release allows you to configure the AWS Instance Metadata Service&apos;s (IMDS) state (enabled or disabled) and which versions of this endpoint to allow the use of via Terraform and these new variables: 
- `var.enable_imds`
- `var.use_imdsv1`

In addition, `var.use_imdsv1` defaults to `false` to enforce use of the preferred IMDSv2 endpoint. If you don&apos;t need to also use IMDSv1, we recommend leaving this variable set to `false`, and updating your `start-openvpn-admin` script to this release tag. 

Note that if you: 
1. are upgrading to this tag 
1. intend to use only IMDSv2 going forward
1. keep `var.use_imdsv1` set to `false`
then you **must update your `start-openvpn-admin` script to tag v0.19.0 in order to deploy a functioning openvpn server.**

 If you need to continue using IMDS version 1, you can set `var.use_imdsv1` to `true`. 



</div>


### [v0.18.0](https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.18.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/6/2022 | Modules affected: init-openvpn | <a href="https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.18.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

Updated to generate DSA-like Diffie-Hellman parameters (uses weak prime). The weaker prime is much less computationally intensive and can be generated quickly, without sacrificing on the secure nature of the parameters. If you wish to maintain the old behavior with strong primes, you can pass in the `--gen-strong-prime` option to the call to `init-openvpn`.



</div>


### [v0.17.1](https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.17.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/4/2022 | Modules affected: openvpn-admin, openvpn-server | <a href="https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.17.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Added ability to configure access logging for the OpenVPN backup bucket
- Added ability to make IAM Groups for certificate management permissions optional
- Various updates to documentation



</div>



## terraform-aws-security


### [v0.60.0](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.60.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/31/2022 | Modules affected: aws-config-multi-region | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.60.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Removed inline provider that was errorneously added in.



</div>


### [v0.59.0](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.59.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/24/2022 | Modules affected: aws-config-multi-region, aws-config | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.59.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Updated the `kms_key_arn` input variable for AWS Config to be regional for each SNS topic. Previously, it only allowed specifying a single KMS Key, but that was not correct for SNS topics, which are regional resources.


</div>


### [v0.58.2](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.58.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/24/2022 | Modules affected: aws-config-bucket, aws-config-multi-region, aws-config, cloudtrail-bucket | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.58.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Exposed the ability to configure access logging and replication settings on AWS Config and AWS Cloudtrail buckets in the respective modules.




</div>


### [v0.58.1](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.58.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/12/2022 | Modules affected: aws-config-multi-region, aws-config, cloudtrail-bucket, custom-iam-entity | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.58.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Updated to use the `aws_partition` data source to lookup the partition when constructing ARNs. This allows the modules to be compatible with alternative AWS partitions like GovCloud and China.



</div>


### [v0.58.0](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.58.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/11/2022 | Modules affected: kms-cmk-replica, kms-master-key-multi-region, kms-master-key | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.58.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
**NOTE: This release is functionally backward compatible, but requires an updated aws provider version to work (&gt;= 3.64.0). For most users, this won&apos;t be an issue and Terraform will automatically update to the required provider version, but if you have wrapper modules that depend on an older aws provider version, you will need to update your wrapper module to be compatible with the newer provider before you can bump to this version.**


- Added support for replicating a key cross region. Refer to [the updated documentation](https://github.com/gruntwork-io/terraform-aws-security/blob/master/modules/kms-master-key-multi-region/core-concepts.md#what-is-the-difference-between-creating-one-key-in-all-regions-and-creating-a-single-all-region-key) of `kms-master-key-multi-region` for more information.





</div>


### [v0.57.3](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.57.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/11/2022 | Modules affected: aws-config-multi-region, aws-config | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.57.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Added the ability to configure snapshot delivery frequency in aws config module.




</div>


### [v0.57.2](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.57.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/11/2022 | Modules affected: private-s3-bucket, ssh-grunt, github-actions-iam-role | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.57.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Minor tweaks to enhance functionality around object locking
- Updating dependencies:
  - github.com/urfave/cli to v1.22.5
  - github.com/go-errors/errors to v1.4.1
  - circleci/python Docker tag to v3.10.1
  - golang Docker tag to v1.17
  - github.com/sirupsen/logrus to v1.8.1
  - github.com/stretchr/testify to v1.7.0
  - github.com/gruntwork-io/go-commons to v0.10.0
  - github.com/aws/aws-sdk-go to v1.42.31






</div>


### [v0.57.1](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.57.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/4/2022 | Modules affected: cross-account-iam-roles, custom-iam-entity, github-actions-iam-role | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.57.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Added support for configuring IAM roles that allow access to GitHub Actions with OpenID Connect. Refer to the documentation for [github-actions-iam-role](https://github.com/gruntwork-io/terraform-aws-security/tree/master/modules/github-actions-iam-role) for more info.
- Added support to `allow-auto-deploy-access-from-other-accounts` to be assumed by GitHub Actions. This is configured using the new `allow_auto_deploy_from_github_actions` input variable on the `cross-account-iam-roles` module.
- Added support for arbitrary configurations of the Assume Role policy on IAM roles created with `custom-iam-entity`. This is configured using the new `assume_role_iam_policy_json` input variable.



</div>



## terraform-aws-server


### [v0.13.9](https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.13.9)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/19/2022 | Modules affected: single-server | <a href="https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.13.9">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Exposed ability to control associating a public IP address to the server in `single-server` module, regardless of what is configured by default on the subnet.





</div>


### [v0.13.8](https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.13.8)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/11/2022 | Modules affected: single-server | <a href="https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.13.8">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Updated to allow associating domain with EC2 instance even without EIP




</div>



## terraform-aws-service-catalog


### [v0.72.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.72.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/31/2022 | Modules affected: services/eks-core-services | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.72.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Added EKS Container Insights metrics collection to EKS Core Services.


</div>


### [v0.71.1](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.71.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/26/2022 | Modules affected: base, data-stores, landingzone, mgmt | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.71.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Updated dependency `gruntwork-io/terraform-aws-security` to version `0.59.0`




</div>


### [v0.71.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.71.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/25/2022 | Modules affected: mgmt/bastion-host, mgmt/jenkins, mgmt/openvpn-server, mgmt/ecs-deploy-runner | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.71.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Added the ability to manage the CloudWatch Log Group for EC2 log aggregation in Terraform. Now `base/ec2-baseline` (and all modules that depend on it) will create and manage the CloudWatch Log Group before the server is launched by default. This allows you to configure options such as KMS key based encryption and log event retention periods on the Log Group. Note that this is a **backward incompatible** change. Refer to the migration guide below for more information.
- Updated dependencies:
    - `gruntwork-io/terraform-aws-ci` to v0.41.0
    - `gruntwork-io/terraform-aws-security` to v0.58.1 (for server scripts installed with `base/ec2-baseline`)
- Update `for-production` example with latest version of CI scripts.


</div>


### [v0.70.2](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.70.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/14/2022 | Modules affected: networking, services, base, mgmt | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.70.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
Update various dependencies.

- Update Terraform github.com/gruntwork-io/terraform-aws-vpc to v0.18.7
- Update Terraform github.com/gruntwork-io/terraform-aws-eks to v0.46.10
- Update Terraform github.com/gruntwork-io/terraform-aws-server to v0.13.8
- Update Terraform github.com/gruntwork-io/terraform-aws-security to v0.58.0
- Update for-production examples for architecture catalog v0.0.25
- Update Terraform github.com/gruntwork-io/terraform-aws-ci to v0.40.2
- Bump terraform-aws-openvpn to v0.19.1




</div>


### [v0.70.1](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.70.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/11/2022 | Modules affected: tls-scripts, services, mgmt, base | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.70.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Added the ability to provide static list of thumbprints for better security posture when configuring an OIDC provider for GitHub Actions.
- Update various dependencies:
    - `gruntwork-io/terraform-aws-asg` to v0.16.0
    - `github.com/gruntwork-io/terraform-aws-monitoring` to v0.30.5
    - `gruntwork-io/terraform-aws-eks` to v0.46.9
    - `gruntwork-io/terraform-aws-openvpn` to v0.18.0
    - `gruntwork-io/helm-kubernetes-services` to v0.2.10




</div>


### [v0.70.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.70.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/6/2022 | Modules affected: landingzone, mgmt/ecs-deploy-runner, data-stores, base | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.70.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Updated snapshot retention for redis to 15 days.
- Updated dependency `gruntwork-io/terraform-aws-security` to v0.57.1 to add support for `ap-southeast-3` region to multi region modules.



</div>


### [v0.69.1](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.69.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/6/2022 | Modules affected: services, mgmt, data-stores, networking | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.69.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Added the ability to configure encryption on the FluentBit CloudWatch Log Group
- Updated various dependencies:
    - `gruntwork-io/terratest` to v0.38.8
    - `gruntwork-io/kubergrunt` to v0.7.11
    - `gruntwork-io/terraform-aws-lambda` to v0.14.3
    - `gruntwork-io/terraform-aws-data-storage` to v0.22.4
    - `gruntwork-io/terraform-aws-eks` to v0.46.8
    - `gruntwork-io/terraform-aws-ecs` to v0.31.8
    - `gruntwork-io/terraform-aws-vpc` to v0.18.6
    - `gruntwork-io/terraform-aws-ecs` to v0.31.8
    - `gruntwork-io/terraform-aws-openvpn` to v0.17.1
    - `hashicorp/terraform-provider-kubernetes` to allow any 2.x version that is not 2.6.0.




</div>


### [v0.69.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.69.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/4/2022 | Modules affected: services/k8s-service, mgmt, services | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.69.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Added the ability to configure and manage the cloudwatch log group for ECS service, via the new `create_cloudwatch_log_group`, `cloudwatch_log_group_name`, `cloudwatch_log_group_retention`, and `cloudwatch_log_group_kms_key_id` input variables.
- Updated dependencies:
    - `gruntwork-io/terragrunt` to v0.35.16
    - `gruntwork-io/terraform-aws-ci` to v0.40.0
    - Helm chart `k8s-service` to v0.2.9


</div>


### [v0.68.8](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.68.8)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/4/2022 | Modules affected: data-stores | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.68.8">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Add `reader_endpoint` output to Aurora module



</div>



## terraform-aws-vpc


### [v0.18.8](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.18.8)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/31/2022 | Modules affected: vpc-app | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.18.8">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- Now the creation of the Internet Gateway is optional. We can have public subnets and still disable the IGW by setting the variable `enable_igw` to `false` (it&apos;s `true` by default). This fixes #150.



</div>


### [v0.18.7](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.18.7)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/11/2022 | Modules affected: vpc-app, vpc-peering-cross-accounts-accepter | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.18.7">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Configure Patcher for CircleCI
- Add timeouts to route table and routes

Now there are three variables (shown below) that control [timeouts](https://www.terraform.io/language/resources/syntax#operation-timeouts) for the Route Table creation.
```
route_table_creation_timeout
route_table_update_timeout
route_table_deletion_timeout
```






</div>

<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "releases",
  "hash": "97cc9f34c98fb60f812c6e7427763d82"
}
##DOCS-SOURCER-END -->

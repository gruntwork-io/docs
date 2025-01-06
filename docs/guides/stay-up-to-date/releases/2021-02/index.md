
# Gruntwork release 2021-02

<p style={{marginTop: "-25px"}}><small><a href="/guides">Guides</a> / <a href="/guides/stay-up-to-date">Update Guides</a> / <a href="/guides/stay-up-to-date/releases">Releases</a> / 2021-02</small></p>

This page is lists all the updates to the [Gruntwork Infrastructure as Code
Library](https://gruntwork.io/infrastructure-as-code-library/) that were released in 2021-02. For instructions
on how to use these updates in your code, check out the [updating
documentation](/library/stay-up-to-date/updating).

Here are the repos that were updated:

- [aws-sample-app](#aws-sample-app)
- [infrastructure-modules-multi-account-acme](#infrastructure-modules-multi-account-acme)
- [repo-copier](#repo-copier)
- [terraform-aws-cache](#terraform-aws-cache)
- [terraform-aws-ci](#terraform-aws-ci)
- [terraform-aws-data-storage](#terraform-aws-data-storage)
- [terraform-aws-ecs](#terraform-aws-ecs)
- [terraform-aws-eks](#terraform-aws-eks)
- [terraform-aws-load-balancer](#terraform-aws-load-balancer)
- [terraform-aws-messaging](#terraform-aws-messaging)
- [terraform-aws-security](#terraform-aws-security)
- [terraform-aws-server](#terraform-aws-server)
- [terraform-aws-service-catalog](#terraform-aws-service-catalog)
- [terraform-aws-utilities](#terraform-aws-utilities)
- [terraform-aws-vpc](#terraform-aws-vpc)


## aws-sample-app


### [v0.0.3](https://github.com/gruntwork-io/aws-sample-app/releases/tag/v0.0.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/9/2021 | <a href="https://github.com/gruntwork-io/aws-sample-app/releases/tag/v0.0.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

</div>



## infrastructure-modules-multi-account-acme


### [v0.0.1-2021-02-04](https://github.com/gruntwork-io/infrastructure-modules-multi-account-acme/releases/tag/v0.0.1-2021-02-04)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/4/2021 | <a href="https://github.com/gruntwork-io/infrastructure-modules-multi-account-acme/releases/tag/v0.0.1-2021-02-04">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Since this repo is solely used for examples/demonstrations, and NOT meant for direct production use, we simply publish all changes at v0.0.1, with a date marker for when it was published.


Updated all module versions to the latest. Most of these were backwards compatible changes, except for the EKS / Helm updates, as we have switched to Helm provider v2.  Refer to the Migration Guide down below for details.


Most modules solely require a version number bump. The one exception is that if you&apos;re using EKS and Helm, Helm provider version 2 has come out, and some minor code changes are required to use it. See the [`terraform-aws-eks` v0.32.0 release notes](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.32.0) for instructions.


* https://github.com/gruntwork-io/infrastructure-modules-multi-account-acme/pull/51

</div>



## repo-copier


### [v0.0.11](https://github.com/gruntwork-io/repo-copier/releases/tag/v0.0.11)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/16/2021 | <a href="https://github.com/gruntwork-io/repo-copier/releases/tag/v0.0.11">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/repo-copier/pull/73: Remove unnecessary API requests, speeding up incremental update.

https://github.com/gruntwork-io/repo-copier/pull/75: Add support for copying from multiple GitHub orgs. Gruntwork owned/maintained repos from the `hashicorp` org will now be copied by default when using the `github` connector.

</div>


### [v0.0.10](https://github.com/gruntwork-io/repo-copier/releases/tag/v0.0.10)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/10/2021 | <a href="https://github.com/gruntwork-io/repo-copier/releases/tag/v0.0.10">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/repo-copier/pull/69: Handle fatal and non-fatal errors separately.

https://github.com/gruntwork-io/repo-copier/pull/70: Add support for incremental updates, so you can run `repo-copier` in a cron job. Also, added support for `--force-overwrite` to force overwriting existing contents.

https://github.com/gruntwork-io/repo-copier/pull/71: Add more unit tests.

</div>


### [v0.0.9](https://github.com/gruntwork-io/repo-copier/releases/tag/v0.0.9)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/5/2021 | <a href="https://github.com/gruntwork-io/repo-copier/releases/tag/v0.0.9">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/repo-copier/pull/67: Add support for custom context paths, port numbers, and other URL tweaks in BitBucket.

</div>


### [v0.0.8](https://github.com/gruntwork-io/repo-copier/releases/tag/v0.0.8)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/4/2021 | <a href="https://github.com/gruntwork-io/repo-copier/releases/tag/v0.0.8">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/repo-copier/pull/64: Fix bug with how assets were packaged that caused an error when running `repo-copier`.

https://github.com/gruntwork-io/repo-copier/pull/60: Add support for a GitHub connector, which allows you to copy code directly from GitHub, so you don&apos;t need S3 as an intermediary.

https://github.com/gruntwork-io/repo-copier/pull/65: Add support for specifying proxies for each connector via `--proxy-url` params.

</div>



## terraform-aws-cache


### [v0.12.0](https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v0.12.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/26/2021 | Modules affected: redis | <a href="https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v0.12.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- AWS ElastiCache, and the Terraform AWS provider, have changed how reader endpoints work ([context](https://aws.amazon.com/about-aws/whats-new/2019/06/amazon-elasticache-launches-reader-endpoint-for-redis/)), which broke the `read_endpoints` output variable in the `redis` module. In this release, we&apos;ve fixed this issue, and updated to use the new terminology and type from AWS / Terraform: the output variable is now called `reader_endpoint` and is a single value instead of a list. 


</div>


### [v0.11.0](https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v0.11.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/9/2021 | Modules affected: redis | <a href="https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v0.11.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Several months ago, AWS made a backward-incompatible change related to the Elasticache Replication Group Multi-AZ behavior, introducing a new [`MultiAZEnabled` toggle](https://awsapichanges.info/archive/changes/db86f9-elasticache.html#CreateReplicationGroup). This means that, the last several months, if you deployed Redis with with `enable_automatic_failover` set to `true`, but did not have this `MultiAZEnabled` flag—which wasn&apos;t exposed in Terraform&apos;s AWS provider—Redis would be deployed into only a single AZ. This issue was fixed in [AWS provider 3.26](https://github.com/hashicorp/terraform-provider-aws/pull/17320), and in this release, we now expose a new `enable_multi_az` variable in the `redis` module so that you can configure this property. This is a backwards incompatible change, so please see the migration guide below.


</div>



## terraform-aws-ci


### [v0.29.14](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.29.14)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/26/2021 | Modules affected: ecs-deploy-runner | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.29.14">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fix tag handling for ref in kaniko - build-docker-image



</div>


### [v0.29.13](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.29.13)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/25/2021 | Modules affected: ecs-deploy-runner | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.29.13">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

The default version of tools installed in the deploy runner has been updated:

- Kaniko: `v1.5.1`
- Kubergrunt: `v0.6.10`
- Kubectl: `v1.19.1`




</div>


### [v0.29.12](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.29.12)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/24/2021 | Modules affected: jenkins-server | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.29.12">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- You can now configure IOPS for the Jenkins EBS volume by setting the new `ebs_volume_iops`  input parameter. Note that you&apos;ll also need to set the `ebs_volume_type` input parameter (which existed before) to `io1`.





</div>


### [v0.29.11](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.29.11)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/11/2021 | Modules affected: ecs-deploy-runner | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.29.11">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Use correct version of `terraform-aws-ci` in Dockerfile for the `deploy-runner`.



</div>


### [v0.29.10](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.29.10)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/8/2021 | Modules affected: ecs-deploy-runner-standard-configuration, ecs-deploy-runner, gruntwork-module-circleci-helpers | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.29.10">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fixes a bug in the arg checker for ecs-deploy-runner
- The EDR Dockerfile now installs `kubectl` so that it may be used with `kubergrunt` and EKS.




</div>


### [v0.29.9](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.29.9)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/5/2021 | Modules affected: ecs-deploy-runner, aws-helpers, build-helpers, check-url | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.29.9">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- We recently renamed most of our repos to follow the Terraform Registry convention of `terraform-&lt;cloud&gt;-&lt;name&gt;` (e.g., `terraform-aws-vpc`. In this release, we&apos;ve updated all cross-references and links from the old names to the new names. There should be no change in behavior, and GitHub redirects old names to new names anyway, but using the up-to-date names will help reduce confusion.
- Update the default `Dockerfile` in `ecs-deploy-runner` to use Kubergrunt `v0.6.9`.





</div>



## terraform-aws-data-storage


### [v0.17.3](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.17.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/8/2021 | Modules affected: rds | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.17.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Adds support for different primary/replica storage types in RDS. 



</div>



## terraform-aws-ecs


### [v0.25.2](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.25.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/26/2021 | Modules affected: ecs-cluster | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.25.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Exposes the `enable_monitoring` option to allow enabling/disabling of [detailed monitoring](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-cloudwatch-new.html) for EC2 instances in ECS clusters.



</div>


### [v0.25.1](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.25.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/23/2021 | Modules affected: ecs-service | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.25.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fix bug where the `ecs-service` module produces `Error: Inconsistent conditional result types` on the IAM role.




</div>


### [v0.25.0](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.25.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/4/2021 | Modules affected: ecs-service | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.25.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

This release removes the `service_autoscaling_iam_role_arn` output from the `ecs-service` module. This output should have been removed in the v0.24.0 release, but it was mistakenly left in place. 


</div>



## terraform-aws-eks


### [v0.33.0](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.33.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/25/2021 | Modules affected: eks-cluster-control-plane, eks-k8s-cluster-autoscaler | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.33.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

Bump default k8s version to 1.19. If you wish to use Kubernetes version 1.19 with EKS, you must update `kubergrunt` to version `0.6.10` or newer. Note that If you were using the default (that is, you were not passing in `kubernetes_version`), you will need to explicitly pass in `kubernetes_version = &quot;1.18&quot;` to avoid inadvertently upgrading the EKS cluster.



</div>


### [v0.32.4](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.32.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/12/2021 | Modules affected: eks-cluster-workers, eks-cluster-control-plane | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.32.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fix bug where workers module requires `eks_control_plane_security_group_id` when `create_resources` is false
- Add support for stringing dependencies to the Control Plane service fargate profile




</div>


### [v0.32.3](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.32.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/11/2021 | Modules affected: eks-k8s-cluster-autoscaler-iam-policy, eks-k8s-cluster-autoscaler | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.32.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fix bug where the labels used to schedule the `eks-k8s-cluster-autoscaler` on fargate was incorrect.
- Allow deploying `eks-k8s-cluster-autoscaler` without any ASGs.



</div>



## terraform-aws-load-balancer


### [v0.21.1](https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.21.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/15/2021 | Modules affected: alb | <a href="https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.21.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- You can now configure the ACM cert statuses and types the `alb` module will search for using the new `acm_cert_statuses` and `acm_cert_types` input variables. This allows you to use the `alb` module with both AWS-issued and imported ACM certs.





</div>



## terraform-aws-messaging


### [v0.4.3](https://github.com/gruntwork-io/terraform-aws-messaging/releases/tag/v0.4.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/15/2021 | Modules affected: sns | <a href="https://github.com/gruntwork-io/terraform-aws-messaging/releases/tag/v0.4.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- You can now configure a custom KMS CMK to use with the `sns` module using the new `kms_master_key_id` input variable.





</div>



## terraform-aws-security


### [v0.45.0](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.45.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/23/2021 | Modules affected: ssh-grunt, account-baseline-app, account-baseline-security, aws-config-multi-region | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.45.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- The documentation for `ssh-grunt` has been updated to suggest using `apt-get purge` instead of `apt-get remove` when removing `ec2-instance-connect`.
- Corrected two bugs related to AWS Config, one of which causes a *backwards incompatible** change in the account-baseline-app and account-baseline-security modules.
1. Fixes `opt_in_regions` to work correctly when aggregating AWS config in multiple accounts. 
1. **Backwards incompatible:** updates account-baseline-app and account-baseline-security to send notifications to the SNS topic in the Logs account. This was the intended configuration but a bug caused the topics to always be created _in each region of each account_. This bug has been corrected.


</div>


### [v0.44.10](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.44.10)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/1/2021 | Modules affected: account-baseline-root, auto-update, aws-auth, aws-config-bucket | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.44.10">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- We recently renamed most of our repos to follow the Terraform Registry convention of `terraform-&lt;cloud&gt;-&lt;name&gt;` (e.g., `terraform-aws-vpc`. In this release, we&apos;ve updated all cross-references and links from the old names to the new names. There should be no change in behavior, and GitHub redirects old names to new names anyway, but using the up-to-date names will help reduce confusion.





</div>



## terraform-aws-server


### [v0.10.2](https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.10.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/24/2021 | Modules affected: single-server | <a href="https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.10.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- You can now force the `single-server` module to detach IAM policies from the IAM role on delete by setting the new input variable `force_detach_policies` to `true`. If you attach policies to the IAM role using the `aws_iam_policy_attachment` resource and you are modifying the role name or path, the `force_detach_policies` argument must be set to `true` and applied _before_ attempting the operation, otherwise you will encounter a `DeleteConflict` error. The `aws_iam_role_policy_attachment` resource (recommended) does not have this requirement.



</div>



## terraform-aws-service-catalog


### [v0.20.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.20.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/25/2021 | Modules affected: services/eks-cluster, services/ecs-fargate-cluster, services/ecs-service, mgmt | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.20.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- The default kubernetes version deployed by `eks-cluster` is now `1.19`. If you were using the default before (that is, you were not setting `kubernetes_version` explicitly in your variables), you will need to set it to `1.17` to avoid a cluster upgrade. Note that to use `1.19`, you will need to update your `kubergrunt` installation to at least [v0.6.10](https://github.com/gruntwork-io/kubergrunt/releases/tag/v0.6.10).
- Fixed typo in README for landingzone/gruntwork-access
- Update dependency gruntwork-io/terratest to v0.32.8
- Update dependency gruntwork-io/terragrunt to v0.28.7
- You can now launch a Fargate based ECS cluster using the `ecs-fargate-cluster` module.
- You can now launch a VPC network based ECS service by configuring the `network_configuration` and `network_mode` parameters. This allows you to successfully deploy your ECS service on Fargate.



</div>


### [v0.19.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.19.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/23/2021 | Modules affected: landingzone, base, data-stores, mgmt | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.19.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fixes issue with AWS Config SNS topics
- Update dependency gruntwork-io/terraform-aws-security to v0.45.0
- Update dependency gruntwork-io/terraform-aws-ecs to v0.25.1
- Expose custom_tags for public_static_website
- Bump k8s-service module to helm 2.x provider


</div>


### [v0.18.12](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.18.12)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/23/2021 | Modules affected: services, networking | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.18.12">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Bump AWS provider version for ACM
- Fix destroy ordering of resources for `eks-cluster`. NOTE: updating the `eks-cluster` module will reveal a destroy of the `null_resource.delete_autocreated_aws_auth` resource. This is expected, and is safe to roll out without downtime. Similarly, there will be an update to the `aws-auth` ConfigMap to remove an extraneous label that is no longer necessary.



</div>


### [v0.18.11](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.18.11)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/22/2021 | Modules affected: services/ecs-cluster | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.18.11">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

Fixes a bug in the `ecs-cluster` module to allow SSH from CIDR blocks to work correctly.




</div>


### [v0.18.10](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.18.10)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/22/2021 | Modules affected: networking | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.18.10">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Do better parallelism control in bastion host testing
- Fix malformed required_providers block in VPC module



</div>


### [v0.18.9](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.18.9)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/22/2021 | Modules affected: data-stores | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.18.9">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- You can now set custom tags for the `rds` module.



</div>


### [v0.18.8](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.18.8)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/18/2021 | Modules affected: data-stores, mgmt | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.18.8">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fix RDS port docs to not mislead about default port.
- `bastion-host` module can now be deployed with no domain



</div>


### [v0.18.7](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.18.7)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/17/2021 | Modules affected: services | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.18.7">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Expose labels and annotations for kubernetes namespaces



</div>


### [v0.18.6](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.18.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/16/2021 | Modules affected: services | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.18.6">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Expose tagging capabilities for the EKS cluster control plane



</div>


### [v0.18.5](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.18.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/16/2021 | Modules affected: networking, services, data-stores | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.18.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Allow specifying disallow list of availability zones for EKS
- Expose `deletion_protection` parameter for Aurora


</div>


### [v0.18.4](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.18.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/12/2021 | Modules affected: mgmt/jenkins | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.18.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Adds the ability to grant KMS key permissions for the Jenkins IAM role using the `var.ebs_kms_key_arn` and `var.ebs_kms_key_arn_is_alias` variables.



</div>


### [v0.18.3](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.18.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/11/2021 | Modules affected: mgmt, services | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.18.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Update default terragrunt version installed in jenkins to `v0.28.3`.
- Fix labels for scheduling EKS core services on fargate



</div>


### [v0.18.2](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.18.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/10/2021 | Modules affected: services/k8s-service | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.18.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- You can now configure tmpfs volumes in your kubernetes services using the `scratch_paths` input variable.




</div>


### [v0.18.1](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.18.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/9/2021 | Modules affected: data-stores, mgmt, networking, base | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.18.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Update dependency gruntwork-io/terraform-aws-data-storage to v0.17.3
- Update dependency gruntwork-io/terraform-aws-ci to v0.29.10
- Update dependency gruntwork-io/terraform-aws-vpc to v0.13.1
- The `ec2-baseline` module will now remove the `ec2-instance-connect` package if `ssh-grunt` is enabled. For more information on why this is, [see here](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.44.9).



</div>


### [v0.18.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.18.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/8/2021 | Modules affected: services/ecs-service, services/ecs-cluster | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.18.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Update dependency `gruntwork-io/terraform-aws-ecs` `v0.24.1` =&gt; `v0.25.0` ([release notes](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.25.0)). As a part of this change, the output `service_autoscaling_iam_role_arn` was removed from the `ecs-service` module.



</div>


### [v0.17.2](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.17.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/1/2021 | Modules affected: networking, mgmt, services, base | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.17.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  All nested module dependencies have been updated to the latest upstream versions. We&apos;ve also resolved warnings related to deprecated variable interpolation syntax.


- Updated dependency gruntwork-io/terraform-aws-vpc to v0.13.0
- Updated dependency gruntwork-io/gruntwork-installer to v0.0.32
- Updated dependency gruntwork-io/terraform-aws-monitoring to v0.24.1
- Updated dependency gruntwork-io/terraform-aws-server to v0.10.1
- Updated dependency gruntwork-io/terraform-aws-openvpn to v0.13.1
- Updated dependency gruntwork-io/terraform-aws-data-storage to v0.17.2
- Updated dependency gruntwork-io/terraform-aws-cache to v0.10.2
- Updated dependency gruntwork-io/terraform-aws-asg to v0.11.2
- Updated dependency gruntwork-io/terraform-aws-ecs to v0.24.1
- Updated dependency gruntwork-io/terratest to v0.32.1
- Updated dependency gruntwork-io/terraform-aws-security to v0.44.10
- Updated dependency gruntwork-io/terraform-aws-ci to v0.29.8
- Updated dependency gruntwork-io/gruntkms to v0.0.9
- Updated dependency gruntwork-io/terragrunt to v0.27.4
- Updated dependency gruntwork-io/terraform-aws-eks to v0.32.2




</div>



## terraform-aws-utilities


### [v0.4.0](https://github.com/gruntwork-io/terraform-aws-utilities/releases/tag/v0.4.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/23/2021 | Modules affected: executable-dependency, instance-type, join-path, list-remove | <a href="https://github.com/gruntwork-io/terraform-aws-utilities/releases/tag/v0.4.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  



- **Terraform 0.14 upgrade**: We have verified that this repo is compatible with Terraform `0.14.x`! 
    - From this release onward, we will only be running tests with Terraform `0.14.x` against this repo, so we recommend updating to `0.14.x` soon! 
    - To give you more time to upgrade, for the time being, all modules will still support Terraform `0.12.26` and above, as that version has several features in it (`required_providers` with `source` URLs) that make it more forwards compatible with `0.14.x`. 
    - Once all Gruntwork repos have been upgrade to work with `0.14.x`, we will publish a migration guide with a version compatibility table and announce it all via the Gruntwork Newsletter.
- Remove docker key from machine config
- Add placeholder.tf for TFC/TFE/PMR
- Lock PIP&apos;s version to be smaller than 21.0





</div>



## terraform-aws-vpc


### [v0.13.1](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.13.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/8/2021 | Modules affected: vpc-app | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.13.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- You can now get the ID of the default security group in the VPC using the `default_security_group_id` output variable.



</div>

<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "releases",
  "hash": "8c553ecbc6cd1f025967ba1f4b322c73"
}
##DOCS-SOURCER-END -->

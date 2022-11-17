
# Gruntwork release 2021-09

<p style={{marginTop: "-25px"}}><small><a href="/guides">Guides</a> / <a href="/guides/stay-up-to-date">Update Guides</a> / <a href="/guides/stay-up-to-date/releases">Releases</a> / 2021-09</small></p>

This page is lists all the updates to the [Gruntwork Infrastructure as Code 
Library](https://gruntwork.io/infrastructure-as-code-library/) that were released in 2021-09. For instructions 
on how to use these updates in your code, check out the [updating 
documentation](/guides/working-with-code/using-modules#updating).

Here are the repos that were updated:

- [boilerplate](#boilerplate)
- [repo-copier](#repo-copier)
- [terraform-aws-architecture-catalog](#terraform-aws-architecture-catalog)
- [terraform-aws-ci](#terraform-aws-ci)
- [terraform-aws-cis-service-catalog](#terraform-aws-cis-service-catalog)
- [terraform-aws-data-storage](#terraform-aws-data-storage)
- [terraform-aws-ecs](#terraform-aws-ecs)
- [terraform-aws-eks](#terraform-aws-eks)
- [terraform-aws-security](#terraform-aws-security)
- [terraform-aws-server](#terraform-aws-server)
- [terraform-aws-service-catalog](#terraform-aws-service-catalog)
- [terraform-aws-static-assets](#terraform-aws-static-assets)
- [terraform-aws-vpc](#terraform-aws-vpc)


## boilerplate


### [v0.3.8: Bugfix not_path on skip, and introduce pathExists helper](https://github.com/gruntwork-io/boilerplate/releases/tag/v0.3.8)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/30/2021 | <a href="https://github.com/gruntwork-io/boilerplate/releases/tag/v0.3.8">Release notes</a></small>
</p>

https://github.com/gruntwork-io/boilerplate/pull/79: Fixed bug where `not_path` on `skip` directive did not work correctly.

https://github.com/gruntwork-io/boilerplate/pull/80: Added helper function `pathExists` that returns whether the given path exists on the filesystem.


### [v0.3.7: Support for not_path in skip](https://github.com/gruntwork-io/boilerplate/releases/tag/v0.3.7)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/21/2021 | <a href="https://github.com/gruntwork-io/boilerplate/releases/tag/v0.3.7">Release notes</a></small>
</p>

https://github.com/gruntwork-io/boilerplate/pull/77: Implemented support for `not_path` configuration for `skip` directive. You can now specify which files should be kept when the `skip` condition is true. All files that do NOT match the `not_path` configuration will be skipped.



## repo-copier


### [v0.0.18](https://github.com/gruntwork-io/repo-copier/releases/tag/v0.0.18)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/22/2021 | <a href="https://github.com/gruntwork-io/repo-copier/releases/tag/v0.0.18">Release notes</a></small>
</p>

https://github.com/gruntwork-io/repo-copier/pull/94, https://github.com/gruntwork-io/repo-copier/pull/95: `repo-copier` can now copy code to GitLab.com!



## terraform-aws-architecture-catalog


### [v0.0.22](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v0.0.22)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/24/2021 | <a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v0.0.22">Release notes</a></small>
</p>

- [`e7a64ef`](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/commit/e7a64effc0d88a92d6edfb92f3d247365703be4c) - Updates to Service Catalog v0.62.0. (https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/428)


### [v0.0.21](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v0.0.21)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/23/2021 | <a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v0.0.21">Release notes</a></small>
</p>

- [`95524fc`](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/commit/95524fc44b1973fcc03b19c1739bd3a8534f5db3) Fix destroy docs https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/443
- [`728697a`](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/commit/728697ab6dc16240c40a58a8d30bebf38ea33c99) Update authentication docs to use the new flow (#441)
- [`678379e`](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/commit/678379e44065bfdbad2f6aa575656e9dc431fb25) Add cross link to auth docs from the QUICK_START.md file (#445)
- [`feea017`](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/commit/feea01788a577e9c1bbb2119d7fe488c59bc8239) Unique macie bucket name per account (#446)
- [`fb22e15`](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/commit/fb22e153975bab59050d9c1d62d96d8234a39160) Adds support for GitHub Actions in the infra CI/CD pipeline (#440)



### [v0.0.20](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v0.0.20)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/17/2021 | <a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v0.0.20">Release notes</a></small>
</p>

- 160205a Add Macie related variables to LZ examples (#434)
- ac439fb Handle hyphenated account names (#437)
- f908638 Fixes for linux server as bastion host (#432)
- c89ed90 Make sure the AMI can be built from local machine (#433)
- 7f54f97 Fixed ASG default key pair name (#431)
- 127628b Add username/password credential in jenkins (#429)
- e666a0e Update README.md with better instructions on usage. (#427)
- fe40bed Update dependency gruntwork-io/terraform-aws-service-catalog to v0.60.1 (#422)


### [v0.0.19](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v0.0.19)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/10/2021 | <a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v0.0.19">Release notes</a></small>
</p>

* 4d0bf1e Support the destroy pipeline in a ref arch. (#368)
* 0435aba Add instructions for update examples script (#424)
* 5aefc41 Handle no db deployments (#401)
* dd52c03 Bump terraform-aws-security to latest (#417)
* 38b2851 Update dependency hashicorp/terraform to v1.0.6 (#309)
* ddd59c6 Update dependency gruntwork-io/terratest to v0.37.7 (#341)
* e9eca8d Update dependency gruntwork-io/terragrunt to v0.31.8 (#329)
* 66354ca Update dependency cli/cli to v1.14.0 (#349)
* eb145ac Update dependency gruntwork-io/terraform-aws-utilities to v0.6.0 (#357)
* bce3b6e Update dependency gruntwork-io/terraform-aws-cis-service-catalog to v0.27.0 (#397)



## terraform-aws-ci


### [v0.38.13](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.38.13)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/29/2021 | Modules affected: install-jenkins | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.38.13">Release notes</a></small>
</p>



- Updates Java version to 11 in the Jenkins installation script.




### [v0.38.12](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.38.12)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/27/2021 | Modules affected: ecs-deploy-runner-standard-configuration, ecs-deploy-runner, infrastructure-deploy-script, infrastructure-deployer | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.38.12">Release notes</a></small>
</p>



- Exposed ability to store `stdout` and `stderr` from ECS Deploy Runner runs in S3 to programmatically interact with command outputs. Refer to [the updated docs](https://github.com/gruntwork-io/terraform-aws-ci/blob/master/modules/ecs-deploy-runner/core-concepts.md#how-do-i-access-the-stdout-and-stderr-output-from-the-underlying-scripts) for more info.




### [v0.38.11](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.38.11)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/27/2021 | Modules affected: jenkins-server | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.38.11">Release notes</a></small>
</p>



- Updated the `jenkins-server` module to propagate custom tags to more resources




### [v0.38.10](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.38.10)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/10/2021 | Modules affected: ecs-deploy-runner-standard-configuration | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.38.10">Release notes</a></small>
</p>



Allows passing optional custom hardcoded options and args for the docker image builder using new `var.docker_image_builder_hardcoded_options` and `var. docker_image_builder_hardcoded_args`.





## terraform-aws-cis-service-catalog


### [v0.27.5](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.27.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/30/2021 | Modules affected: observability, security | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.27.5">Release notes</a></small>
</p>



- Adjusts the minimum version of the Terraform AWS provider in the `aws-securityhub` module.
- Updates dependency `gruntwork-io/terraform-aws-security` to `v0.55.3`.





### [v0.27.4](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.27.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/29/2021 | Modules affected: networking, landingzone | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.27.4">Release notes</a></small>
</p>



- Updated dependency gruntwork-io/terraform-aws-vpc to v0.17.5
- Updated dependency gruntwork-io/terraform-aws-service-catalog to v0.62.0
- Updated for-production examples for architecture catalog v0.0.22
- Updated dependency gruntwork-io/terraform-aws-service-catalog to v0.62.1
- Added service-linked roles for security account in account-baseline-security




### [v0.27.3](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.27.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/15/2021 | Modules affected: landingzone, networking, observability, security | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.27.3">Release notes</a></small>
</p>


This release introduces changes in variables of `account-baseline-root`:
* Pass `cloudtrail_kms_key_arn` to base module
* Make `cloudtrail_should_create_s3_bucket` and `config_should_create_s3_bucket` configurable


This release also updates versions of the following dependencies:
- `gruntwork-io/terraform-aws-security` to `v0.55.1`
- `gruntwork-io/terraform-aws-service-catalog` to `v0.61.1`



### [v0.27.2](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.27.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/13/2021 | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.27.2">Release notes</a></small>
</p>


- Update for-production examples for architecture catalog v0.0.19 (#238, #239)



- https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/pull/238
- https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/pull/239





### [v0.27.1](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.27.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/3/2021 | Modules affected: observability, landingzone, networking, security | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.27.1">Release notes</a></small>
</p>



This release enables passing additional data logging resources to the `cloudtrail` module, via the new `additional_data_logging_resources` variable. 

This release also updates all the README badges to point to the `v1.4.0` of the CIS Benchmark. It also updates the versions of the following dependencies:
- `gruntwork-io/terraform-aws-monitoring` to `v0.30.2`
- `gruntwork-io/terraform-aws-security` to `v0.55.0`
- `gruntwork-io/terraform-aws-vpc` to `v0.17.4`





## terraform-aws-data-storage


### [v0.22.0](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.22.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/23/2021 | Modules affected: lambda-copy-shared-snapshot | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.22.0">Release notes</a></small>
</p>



- Enhanced global cluster example to show how to create a cross region replica
- **BACKWARD INCOMPATIBLE** Removes unused `rds_db_arn` variable from the `lambda-copy-shared-snapshot` module. 




## terraform-aws-ecs


### [v0.31.5](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.31.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/29/2021 | Modules affected: ecs-cluster, ecs-service, ecs-daemon-service | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.31.5">Release notes</a></small>
</p>



- Exposed ability to configure tags on `ecs-daemon-service`
- Exposed ability to customize the IAM role name of the ECS cluster
- Exposed ability to configure permissions boundary on `ecs-cluster` instance IAM role




### [v0.31.4](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.31.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/28/2021 | Modules affected: ecs-service | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.31.4">Release notes</a></small>
</p>



- Exposed ability to configure tags on the ELB Target Group in the `ecs-service` module (via the variable `lb_target_group_tags`).




### [v0.31.3](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.31.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/23/2021 | Modules affected: ecs-service | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.31.3">Release notes</a></small>
</p>



- Exposed service discovery ARN as one of the outputs.




### [v0.31.2](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.31.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/15/2021 | Modules affected: ecs-scripts | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.31.2">Release notes</a></small>
</p>



- Updated `configure-ecs-instance` script to handle setting arbitrary ECS configurations. You can now set arbitrary configuration values using the `--custom-config` option.






### [v0.31.1](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.31.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/14/2021 | Modules affected: ecs-scripts | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.31.1">Release notes</a></small>
</p>



- The `configure-ecs-instance` script no longer calls `docker login` for ECS, as the ECS Agent does that automatically nowadays. Also, updated the script to make `--docker-auth-type` optional and the `--ecr-aws-region` is now a no-op. Both params still work, so this is a backwards compatible release, but you may want to remove them both if you are using ECR. 






## terraform-aws-eks


### [v0.45.0](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.45.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/7/2021 | Modules affected: eks-alb-ingress-controller, eks-alb-ingress-controller-iam-policy, eks-container-logs | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.45.0">Release notes</a></small>
</p>

(no description found in release notes)


### [v0.44.8](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.44.8)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/7/2021 | Modules affected: eks-container-logs, eks-fargate-container-logs | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.44.8">Release notes</a></small>
</p>



- Added new module (`eks-fargate-container-logs`) for setting up log aggregation to AWS resources (CloudWatch Logs, Kinesis, or Elasticsearch) for Fargate pods.





### [v0.44.7](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.44.7)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/6/2021 | Modules affected: eks-k8s-cluster-autoscaler | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.44.7">Release notes</a></small>
</p>



- You can now set the `expanderPriorities` and `priorityConfigMapAnnotations` properties of the cluster-auto-scaler Helm chart using the new `expander_priorities` and `priority_config_map_annotations` input variables, respectively. These settings are useful when If `scaling_strategy` is set to `priority`.






## terraform-aws-security


### [v0.55.3](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.55.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/28/2021 | Modules affected: aws-auth | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.55.3">Release notes</a></small>
</p>



- Exposed ability to set `role-session-name` for the assume role session created by `aws-auth`.





### [v0.55.2](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.55.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/28/2021 | Modules affected: private-s3-bucket | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.55.2">Release notes</a></small>
</p>



- Adds a `depends_on` between the bucket object ownership and the policy in `private-s3-bucket`. This resolves an issue where we expected an implicit dependency between the resources (formed by a resource reference) but there was none, resulting in `conflicting conditional operation` errors.





### [v0.55.1](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.55.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/14/2021 | Modules affected: aws-auth, private-s3-bucket, iam-users, custom-iam-entity | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.55.1">Release notes</a></small>
</p>



-  MFA Delete Script improvements (PR #539)
- Improves mfa-delete script instructions (PR #541)
- Documentation on how to delete users created by the iam-users module (PR #543)
- Adds the ability to input JSON-formatted IAM policies with custom-iam-entity and iam-users (PR #538)





### [v0.55.0](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.55.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/3/2021 | Modules affected: cloudtrail, private-s3-bucket | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.55.0">Release notes</a></small>
</p>


This release adds the capability for the `cloudtrail`  module to handle multiple data logging resources. For this purpose, a new variable `data_logging_resources` has been added to the `cloudtrail` module, which has replaced variables `data_logging_resource_type` and `data_logging_resource_values`. See migration guide for instructions on how to migrate to using the new variable.

This release also adds a script to enable MFA Delete for the `private-s3-bucket` module. 




## terraform-aws-server


### [v0.13.4](https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.13.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/15/2021 | Modules affected: disable-instance-metadata, persistent-ebs-volume, route53-helpers, single-server | <a href="https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.13.4">Release notes</a></small>
</p>



-  Migrate `route53-helpers` example to IMDSv2 and introduce `disable-instance-metadata` module. The `route53-helpers` example now demonstrates how to correctly use AWS Instance Metadata Service version 2, which is specifically hardened against several attack vectors, and therefore preferred over version 1. 
- **[NEW MODULE]** In addition, these changes introduce the new `disable-instance-metadata` module that contains a convenience script you can use to disable future calls to the Instance Metadata Service once your instance has retrieved all the information it requires.








## terraform-aws-service-catalog


### [v0.62.1](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.62.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/26/2021 | Modules affected: services/eks-core-services, services/ecs-service | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.62.1">Release notes</a></small>
</p>



- Makes `load_balancing_algorithm_type` configurable in the `ecs-service` module.
- Updates for-production examples for architecture catalog v0.0.21
- Adds README for the `ecs-deploy-runner` module.
- Optional retention period for fluent-bit CloudWatch log group.



### [v0.62.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.62.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/18/2021 | Modules affected: services/eks-core-services, mgmt, networking | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.62.0">Release notes</a></small>
</p>



- Update dependency hashicorp/terraform to v1.0.7
- Update dependency gruntwork-io/terraform-aws-eks to v0.45.0
- Bump k8s-servce helm chart version to v0.2.6




### [v0.61.2](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.61.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/17/2021 | Modules affected: networking, data-stores | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.61.2">Release notes</a></small>
</p>



- Update dependency gruntwork-io/terraform-aws-vpc to v0.17.5
- Extend Elasticsearch to support Multi AZ & Master Accounts
- Expose `security_group_tags` for App  VPCs.




### [v0.61.1](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.61.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/14/2021 | Modules affected: mgmt/ecs-deploy-runner | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.61.1">Release notes</a></small>
</p>



- In the ecs-deploy-runner, we now pass through docker image builder hardcoded options and args. See the [release notes in terraform-aws-ci](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.38.10)




### [v0.61.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.61.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/14/2021 | Modules affected: services/ecs-cluster | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.61.0">Release notes</a></small>
</p>


- Replaced ECS cluster autoscaling machinery from CPU based to Capacity Provider based autoscaling. Capacity provider based autoscaling is a more superior form of ECS cluster autoscaling that bases decisions on ECS task scheduling and cluster availability. Refer to the [AWS blog post on ECS cluster autoscaling](https://aws.amazon.com/blogs/containers/deep-dive-on-amazon-ecs-cluster-auto-scaling/) for more information on how this works. **This is a backward incompatible change. Refer to the migration guide for information on how to adapt your ECS cluster to this new form of autoscaling.**



### [v0.60.2](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.60.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/13/2021 | Modules affected: services/ecs-service, networking/vpc | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.60.2">Release notes</a></small>
</p>

- Networking/VPC: Fix VPC peering when subnet tiers are disabled (#943)
- Services/ECS-Service: Remove unused force_destroy variable (#944)
- Services/ECS-Service: Add enable_execute_command variable (#946)
- Update for-production examples for architecture catalog v0.0.19 (#947)



### [v0.60.1](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.60.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/9/2021 | Modules affected: mgmt, services | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.60.1">Release notes</a></small>
</p>



- All packer templates now support configuring `region_kms_key_ids` for encrypting multi region AMIs.




### [v0.60.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.60.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/8/2021 | Modules affected: services/eks-core-services, mgmt/ecs-deploy-runner, services, mgmt | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.60.0">Release notes</a></small>
</p>



- [**BREAKING**] Updated `eks-core-services` to configure `fluent-bit` for log aggregation for Fargate pods.
- [**BREAKING**] Updated `ecs-deploy-runner` to properly support multi-region kms grants. In [v0.51.0](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.51.0) of `terraform-aws-security`, we refactored how we build multi-region modules—that is, those modules that deploy resources across every single AWS region, such as `kms-grants-multi-region`—to no longer create nested `provider` blocks, and instead, have users pass in providers via the `providers` map. In this release, we have updated the `ecs-deploy-runner` module to use the latest version of `terraform-aws-security` for the managing kms grants. This reduces the number of providers that Terraform must instantiate, making the `ecs-deploy-runner` module _much_ faster and more stable to use. It also gives you full control over how to authenticate to your various AWS accounts. However, this is a backward incompatible change, so [make sure to read the migration guide below](#migration-guide).
- Updated `k8s-service` module to expose the `target-type` parameter on the `Ingress` resource.
- Updated `openvpn` and `eks-worker` packer templates to expose `region_kms_key_ids` variable for encrypting multi region images.
- Update various dependencies:
    - Update dependency gruntwork-io/terratest to v0.37.7
    - Update dependency gruntwork-io/kubergrunt to v0.7.9
    - Update dependency gruntwork-io/terraform-aws-ci to v0.38.9



## terraform-aws-static-assets


### [v0.12.1](https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.12.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/8/2021 | Modules affected: s3-cloudfront | <a href="https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.12.1">Release notes</a></small>
</p>



- You can now disable access logging in the `s3-cloudfront` module using the new `disable_logging` input variable. This is useful in regions where CloudFront access logging isn't supported.





## terraform-aws-vpc


### [v0.17.5](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.17.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/15/2021 | Modules affected: vpc-app | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.17.5">Release notes</a></small>
</p>



- Add custom tags for Security Groups in VPC-App





### [v0.17.4](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.17.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/3/2021 | Modules affected: vpc-interface-endpoint | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.17.4">Release notes</a></small>
</p>



- Add support for EFS interface endpoints to the `vpc-interface-endpoint` module.






<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "releases",
  "hash": "18f2477a14a9ce985347044c8273066b"
}
##DOCS-SOURCER-END -->

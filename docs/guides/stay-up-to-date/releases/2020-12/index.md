
# Gruntwork release 2020-12

<p style={{marginTop: "-25px"}}><small><a href="/guides">Guides</a> / <a href="/guides/stay-up-to-date">Update Guides</a> / <a href="/guides/stay-up-to-date/releases">Releases</a> / 2020-12</small></p>

This page is lists all the updates to the [Gruntwork Infrastructure as Code 
Library](https://gruntwork.io/infrastructure-as-code-library/) that were released in 2020-12. For instructions 
on how to use these updates in your code, check out the [updating 
documentation](/guides/working-with-code/using-modules#updating).

Here are the repos that were updated:

- [boilerplate](#boilerplate)
- [infrastructure-modules-multi-account-acme](#infrastructure-modules-multi-account-acme)
- [terraform-aws-architecture-catalog](#terraform-aws-architecture-catalog)
- [terraform-aws-ci](#terraform-aws-ci)
- [terraform-aws-cis-service-catalog](#terraform-aws-cis-service-catalog)
- [terraform-aws-data-storage](#terraform-aws-data-storage)
- [terraform-aws-ecs](#terraform-aws-ecs)
- [terraform-aws-eks](#terraform-aws-eks)
- [terraform-aws-monitoring](#terraform-aws-monitoring)
- [terraform-aws-openvpn](#terraform-aws-openvpn)
- [terraform-aws-security](#terraform-aws-security)
- [terraform-aws-server](#terraform-aws-server)
- [terraform-aws-service-catalog](#terraform-aws-service-catalog)
- [terraform-aws-vpc](#terraform-aws-vpc)
- [terraform-aws-zookeeper](#terraform-aws-zookeeper)
- [terraform-kubernetes-helm](#terraform-kubernetes-helm)


## boilerplate


### [v0.3.6: var_files for dependencies](https://github.com/gruntwork-io/boilerplate/releases/tag/v0.3.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/8/2020 | <a href="https://github.com/gruntwork-io/boilerplate/releases/tag/v0.3.6">Release notes</a></small>
</p>

https://github.com/gruntwork-io/boilerplate/pull/73: You can now specify `var_files` to render dependencies with.

https://github.com/gruntwork-io/boilerplate/pull/74: You can now marshal the `BoilerplateConfig` struct to YAML.


### [v0.3.6-alpha.1](https://github.com/gruntwork-io/boilerplate/releases/tag/v0.3.6-alpha.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/7/2020 | <a href="https://github.com/gruntwork-io/boilerplate/releases/tag/v0.3.6-alpha.1">Release notes</a></small>
</p>

DO NOT USE: integration testing release


### [v0.3.5: jsonnet support](https://github.com/gruntwork-io/boilerplate/releases/tag/v0.3.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/2/2020 | <a href="https://github.com/gruntwork-io/boilerplate/releases/tag/v0.3.5">Release notes</a></small>
</p>

https://github.com/gruntwork-io/boilerplate/pull/72: We now support rendering jsonnet files as an alternative to go templating. See [the updated README](https://github.com/gruntwork-io/boilerplate#alternative-template-engines-experimental) for more details.



## infrastructure-modules-multi-account-acme


### [v0.0.1-20201218: Terraform 0.13 Compatibility](https://github.com/gruntwork-io/infrastructure-modules-multi-account-acme/releases/tag/v0.0.1-20201218)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/18/2020 | <a href="https://github.com/gruntwork-io/infrastructure-modules-multi-account-acme/releases/tag/v0.0.1-20201218">Release notes</a></small>
</p>

Since this repo is solely used for examples/demonstrations, and NOT meant for direct production use, we simply publish all changes at v0.0.1, with a date marker for when it was published.


Module versions have been updated for compatibility with Terraform 0.13. Additionally, the required versions in all modules have been updated to reflect usage with 0.13.

Several backwards incompatible changes were pulled in as a result. Refer to the Migration Guide down below for details on state changes (if any) that need to be applied.


Most modules do not require any changes to apply the Terraform 0.13 compatibility versions, and to update to Terraform 0.13. Below are the list of modules that require state migrations, or include expected destroyed resources. Any module that is not listed do not require any state migration to apply cleanly.




## terraform-aws-architecture-catalog


### [v0.0.1](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v0.0.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/18/2020 | <a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v0.0.1">Release notes</a></small>
</p>

Initial release of the architecture catalog!



## terraform-aws-ci


### [v0.29.5](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.29.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/17/2020 | Modules affected: ecs-deploy-runner, build-helpers | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.29.5">Release notes</a></small>
</p>



- `build-helpers`: A bug has been fixed in `build-packer-artifact` where multiple filters were not producing the desired result.
- `ecs-deploy-runner`: The `Dockerfile` for the `ecs-deploy-runner` Docker image has been updated to use the new `build-packer-artifact` script. The image also now install Terraform 0.13.5 and newer versions of Terragrunt and Kubergrunt by default.






### [v0.29.4](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.29.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/10/2020 | Modules affected: build-helpers | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.29.4">Release notes</a></small>
</p>



This release fixes a bug in `build-packer-artifact` script, where the `--idempotency` flag did not properly handle images with multiple tags.




### [v0.29.3](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.29.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/10/2020 | Modules affected: ecs-deploy-runner | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.29.3">Release notes</a></small>
</p>



- The default version of tools installed in the `ecs-deploy-runner` docker containers have been updated: `module_ci_version` is now `v0.29.2`, and `kaniko` is now `v1.3.0`.





## terraform-aws-cis-service-catalog


### [v0.9.2](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.9.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/17/2020 | Modules affected: cloudtrail | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.9.2">Release notes</a></small>
</p>



Configures data event logging for cloudtrail buckets, as per the 3.10 and 3.11 requirements of CIS AWS Foundations Benchmark.







### [v0.9.1](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.9.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/15/2020 | Modules affected: cleanup-expired-certs, cloudtrail, cloudwatch-logs-metric-filters | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.9.1">Release notes</a></small>
</p>



- Adds a new module `cleanup-expired-certs` to ensure that all expired SSL/TLS certificates stored in AWS IAM are removed as per the 1.19 requirement of the CIS AWS Foundations Benchmark.
- Add metric filter and alarm for AWS Organizations changes, as per the 4.15 requirement of CIS AWS Foundations Benchmark.






## terraform-aws-data-storage


### [v0.17.1](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.17.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/8/2020 | Modules affected: aurora, rds | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.17.1">Release notes</a></small>
</p>



- You can now tell the `rds` and `aurora` modules to ignore changes to the `master_password` parameter by setting the new `ignore_password_changes` input variable to `true`. This is useful when managing the password outside of Terraform, such as with auto-rotating passwords in AWS Secrets Manager.





## terraform-aws-ecs


### [v0.23.3](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.23.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/15/2020 | Modules affected: ecs-cluster | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.23.3">Release notes</a></small>
</p>



You can now enable container insights on the ECS cluster deployed with the `ecs-cluster` module.




### [v0.23.2](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.23.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/4/2020 | Modules affected: ecs-cluster | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.23.2">Release notes</a></small>
</p>



- You  can now configure the `ecs-cluster` to create one capacity provider and one ASG per AZ / subnet by setting the `multi_az_capacity_provider` input variable to true.





## terraform-aws-eks


### [v0.31.2](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.31.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/19/2020 | Modules affected: eks-cluster-managed-workers, eks-cluster-workers, eks-cluster-control-plane | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.31.2">Release notes</a></small>
</p>



- You can now configure the EKS control plane with additional security groups that are managed outside the module. (NOTE: You will need to recreate the EKS cluster to append additional security groups to the control plane).
- Fix a bug where certain cases can cause list indexing errors.
- Various updates to the documentation




### [v0.31.1](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.31.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/16/2020 | Modules affected: eks-cluster-control-plane | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.31.1">Release notes</a></small>
</p>


- This release is a minor bugfix to use the latest kubergrunt (v0.6.8) required dependency.



### [v0.31.0](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.31.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/15/2020 | Modules affected: eks-cluster-control-plane, eks-cluster-workers | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.31.0">Release notes</a></small>
</p>



Various instance parameters are now overrideable in the `autoscaling_group_configurations`. Refer to the updated [variable definition](https://github.com/gruntwork-io/terraform-aws-eks/blob/5d829c98ef2bd8b50db2de49ac831118bfb09a8d/modules/eks-cluster-workers/variables.tf#L15) for more details on which attributes are available to override.




### [v0.30.0](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.30.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/14/2020 | Modules affected: eks-cluster-control-plane, eks-alb-ingress-controller, All | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.30.0">Release notes</a></small>
</p>

* `eks-cluster-control-plane` [**BACKWARD INCOMPATIBLE**]
* `eks-alb-ingress-controller` [**BACKWARD INCOMPATIBLE**]
* All other modules (backward compatible changes)

**This module includes backward incompatible changes. Please refer to the migration guide.**

**Terraform 0.13 upgrade**: We have verified that this repo is compatible with Terraform 0.13.x!
- From this release onward, we will be running tests against this repo with Terraform 0.13.x only, so we recommend that you upgrade your local Terraform to 0.13.x soon!
- To give you more time to upgrade, for the time being, all modules still support Terraform 0.12.26 and above, as that version has several features in it (required_providers with source URLs) that make it more forward compatible with 0.13.x.
- Once all Gruntwork module repos have been updated to work with 0.13.x, we will publish a migration guide with a version compatibility table and announce it all via the Gruntwork Newsletter.


### [v0.29.2](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.29.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/14/2020 | Modules affected: eks-cluster-managed-workers | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.29.2">Release notes</a></small>
</p>



- You can now set the `capacity_type` on the Managed Node Groups created with `eks-cluster-managed-workers`




### [v0.29.1](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.29.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/1/2020 | Modules affected: eks-alb-ingress-controller, eks-k8s-cluster-autoscaler, eks-k8s-external-dns, eks-cluster-managed-workers | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.29.1">Release notes</a></small>
</p>



- The type of `pod_tolerations` input var was incorrect for `eks-alb-ingress-controller`, `eks-k8s-cluster-autoscaler`, `eks-k8s-external-dns`.
- `eks-cluster-managed-workers` now supports specifying launch templates.





## terraform-aws-monitoring


### [v0.24.0](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.24.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/1/2020 | Modules affected: logs/load-balancer-access-logs | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.24.0">Release notes</a></small>
</p>

**This release contains backwards incompatible changes. Make sure to follow the instructions in the migration guide below!**

The `load-balancer-access-logs` module has been refactored to use the `private-s3-bucket` module under the hood to configure the access logging S3 bucket.






## terraform-aws-openvpn


### [v0.13.0](https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.13.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/3/2020 | Modules affected: openvpn-server | <a href="https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.13.0">Release notes</a></small>
</p>


**This release contains backwards incompatible changes. Make sure to follow the instructions in the migration guide below!**

The `openvpn-server` module has been refactored to use the `private-s3-bucket` module under the hood to configure the S3 bucket.





## terraform-aws-security


### [v0.44.6](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.44.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/18/2020 | Modules affected: account-baseline-root, account-baseline-security, iam-access-analyzer-multi-region | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.44.6">Release notes</a></small>
</p>



As part of upgrading module to align with [CIS 1.3.0](https://www.cisecurity.org/benchmark/amazon_web_services/) compliance, as is recommended, the IAM Access Analyzer needs to be enabled across all used AWS regions. 

In this release:
* We've added a new module wrapper `iam-access-analyzer-multi-region` for the IAM Access Analyzer service for multiple AWS regions and a related example.
* We've updated `account-baseline-root` and `account-baseline-security` and their respective code examples to showcase using the new module. 

The `iam-access-analyzer-multi-region` has been added, but is disabled at the level of the _Landing Zone_ product (`account-baseline-*` modules) for backward compatibility. To enable the use of this feature, users will need to `enable_iam_access_analyzer` to `true` in the `variables.tf` for each of these modules or examples.



### [v0.44.5](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.44.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/16/2020 | Modules affected: cloudtrail | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.44.5">Release notes</a></small>
</p>



This release adds support for configuring [data event logging](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/logging-data-events-with-cloudtrail.html) for cloudtrail buckets. Data event logging is configured using the newly introduced variables: `data_logging_enabled`, `data_logging_read_write_type`, `data_logging_include_management_events`, `data_logging_resource_type` and `data_logging_resource_values`. For detailed instructions see the [descriptions of these variables](https://github.com/gruntwork-io/module-security/blob/master/modules/cloudtrail/variables.tf#L158).





### [v0.44.4](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.44.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/15/2020 | Modules affected: account-baseline-app, account-baseline-root, account-baseline-security, cloudtrail-bucket | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.44.4">Release notes</a></small>
</p>


This fixes a bug that was introduced in `v0.44.3`, where the `cloudtrail` module now needed `kms:DescribeKey` access to the KMS key, which was not provided by default. This release reverts back to the behavior in `v0.44.2`, unless you enable the following flags:

- `allow_kms_describe_key_to_external_aws_accounts = true`
- `kms_key_arn_is_alias = true`

You can now attach `kms:DescribeKey` permissions to IAM entities on CMKs managed with `kms-master-key` by setting `cmk_describe_only_user_iam_arns`.




### [v0.44.3](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.44.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/10/2020 | Modules affected: cloudtrail | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.44.3">Release notes</a></small>
</p>



This fixes a perpetual diff issue with `cloudtrail` module when `kms_key_arn` is a loose KMS ID (e.g., KMS Alias).




### [v0.44.2](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.44.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/10/2020 | Modules affected: kms-grant-multi-region | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.44.2">Release notes</a></small>
</p>



`kms-grant-multi-region` now supports using aliases for KMS Key IDs.




### [v0.44.1](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.44.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/3/2020 | Modules affected: private-s3-bucket | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.44.1">Release notes</a></small>
</p>



- You can now configure the bucket ownership settings using the new `bucket_ownership` input variable in `private-s3-bucket`.







## terraform-aws-server


### [v0.9.4](https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.9.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/16/2020 | Modules affected: single-server | <a href="https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.9.4">Release notes</a></small>
</p>



- Replace `template_file` usage with `locals` to avoid data source dependency graphs.






## terraform-aws-service-catalog


### [v0.15.1](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.15.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/18/2020 | Modules affected: services, mgmt, networking, base | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.15.1">Release notes</a></small>
</p>



- The `ecs-service` module accepts a new optional variable, `secrets_access`, which can be used to automatically create an IAM policy with `GetSecretValue` permission on the given secrets. 
- Update dependency `gruntwork-io/module-ci` to v0.29.5 ([release notes](https://togithub.com/gruntwork-io/module-ci/releases/tag/v0.29.5))
- Update dependency `gruntwork-io/terraform-aws-vpc` to v0.12.4 ([release notes](https://togithub.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.12.4))
- Update dependency `gruntwork-io/module-server` to v0.9.4 ([release notes](https://togithub.com/gruntwork-io/module-server/releases/tag/v0.9.4))
- Update dependency `gruntwork-io/module-security` to ([v0.44.5](https://togithub.com/gruntwork-io/module-security/releases/tag/v0.44.5))
- Update dependency `gruntwork-io/module-ecs` to ([v0.23.3](https://togithub.com/gruntwork-io/module-ecs/releases/tag/v0.23.3))
- Update dependency `gruntwork-io/terratest` to ([v0.31.2](https://togithub.com/gruntwork-io/terratest/releases/tag/v0.31.2))



### [v0.14.1](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.14.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/15/2020 | Modules affected: base, data-stores, landingzone, mgmt | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.14.1">Release notes</a></small>
</p>



- Update dependency `gruntwork-io/module-security`: `v0.44.3` => `v0.44.4` (Release notes: [v0.44.4](https://github.com/gruntwork-io/module-security/releases/tag/v0.44.4)).






### [v0.14.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.14.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/14/2020 | Modules affected: base, data-stores, landingzone, mgmt/openvpn-server | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.14.0">Release notes</a></small>
</p>



- Update dependency `gruntwork-io/module-security`: `v0.44.2` => `v0.44.3` (Release notes: [v0.44.3](https://github.com/gruntwork-io/module-security/releases/tag/v0.44.3)).
- Update dependency `gruntwork-io/terraform-aws-vpc`: `v0.12.2` => `v0.12.3` (Release notes: [v0.12.3](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.12.3)).
- Update dependency `gruntwork-io/module-ci`: `v0.29.3` => `v0.29.4` (Release notes: [v0.29.4](https://github.com/gruntwork-io/module-ci/releases/tag/v0.29.4)).
- Update dependency `gruntwork-io/terratest`: `v0.30.23` => `v0.31.1` (Release notes: [v0.30.24](https://github.com/gruntwork-io/terratest/releases/tag/v0.30.24), [v0.30.25](https://github.com/gruntwork-io/terratest/releases/tag/v0.30.25), [v0.30.26](https://github.com/gruntwork-io/terratest/releases/tag/v0.30.26), [v0.30.27](https://github.com/gruntwork-io/terratest/releases/tag/v0.30.27), [v0.31.0](https://github.com/gruntwork-io/terratest/releases/tag/v0.31.0), [v0.31.1](https://github.com/gruntwork-io/terratest/releases/tag/v0.31.1)).
- Update dependency `gruntwork-io/terraform-aws-eks`: `v0.29.0` => `v0.29.1` (Release notes: [v0.29.1](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.29.1)).
- Update dependency `gruntwork-io/kubergrunt`: => `v0.6.7` (Release notes: [v0.6.7](https://github.com/gruntwork-io/kubergrunt/releases/tag/v0.6.7)).
- Update dependency `gruntwork-io/terraform-aws-monitoring`: `v0.23.4` => `v0.24.0` (Release notes: [v0.24.0](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.24.0)). **NOTE: This includes a backwards incompatible change that affects the `k8s-service` and `alb` modules. Please read [the migration guide](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.24.0) in the terraform-aws-monitoring module release notes for more details!**
- Update dependency `gruntwork-io/module-ecs: `v0.23.0` => `v0.23.2` (Release notes: [v0.23.1](https://github.com/gruntwork-io/module-ecs/releases/tag/v0.23.1), [v0.23.2](https://github.com/gruntwork-io/module-ecs/releases/tag/v0.23.2)).


### [v0.13.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.13.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/10/2020 | Modules affected: networking/vpc-mgmt, networking/vpc, data-stores, base | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.13.0">Release notes</a></small>
</p>



- Update dependency `gruntwork-io/module-data-storage`: `v0.16.3` => `v0.17.1` (Release notes: [v0.17.0](https://github.com/gruntwork-io/module-data-storage/releases/tag/v0.17.0) ; [v0.17.1](https://github.com/gruntwork-io/module-data-storage/releases/tag/v0.17.1)).
- Update dependency `gruntwork-io/terraform-aws-vpc`: `v0.11.0` => `v0.12.2` (Release notes: [v0.12.0](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.12.0) ; [v0.12.1](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.12.1) ; [v0.12.2](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.12.2)). **NOTE: This includes a backwards incompatible change. Please read [the migration guide](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.12.0) in the `terraform-aws-vpc` module release notes for more details!**
- Update dependency `gruntwork-io/module-security`: `v0.44.1` => `v0.44.2` ([release notes](https://github.com/gruntwork-io/module-security/releases/tag/v0.44.2)).
- Address a silent failure in KMS grant dependencies in the account baseline modules.




### [v0.12.1](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.12.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/4/2020 | Modules affected: data-stores | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.12.1">Release notes</a></small>
</p>



- Exposed SSE algorithm settings in `s3-bucket`: `bucket_sse_algorithm` and `replica_sse_algorithm`.







### [v0.12.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.12.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/4/2020 | Modules affected: mgmt, data-stores, base, landingzone | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.12.0">Release notes</a></small>
</p>



- Update dependency `gruntwork-io/terragrunt` to v0.26.7
- Access permissions for the access log and replica buckets in `s3-bucket` are now controlled via the separate input variables `access_logging_bucket_policy_statements` and `replica_bucket_policy_statements` instead. **This is a backwards incompatible change. See Migration Guide below.**
- Expose bucket ownership settings in `s3-bucket` via the `bucket_ownership`, `access_logging_bucket_ownership`, and `replica_bucket_ownership` input variables.



### [v0.11.2](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.11.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/1/2020 | Modules affected: data-stores, networking | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.11.2">Release notes</a></small>
</p>



- Expose the redis parameter group name from the underlying module (input variable `parameter_group_name`).
- Expose `engine_version` for Aurora.
- Expose `enable_deletion_protection` for RDS modules.





## terraform-aws-vpc


### [v0.12.4](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.12.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/17/2020 | Modules affected: vpc-app-network-acls | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.12.4">Release notes</a></small>
</p>



- Fix a bug where `vpc-app-network-acls` would not work correctly if some of the subnet tiers in the VPC were disabled. 






### [v0.12.3](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.12.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/10/2020 | Modules affected: vpc-app | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.12.3">Release notes</a></small>
</p>



- The `vpc-app` module now allows you to configure the ingress and egress rules for the default Security Group and NACL using the new `default_security_group_ingress_rules`, `default_security_group_egress_rules`, `default_nacl_ingress_rules`, and `default_nacl_egress_rules` input variables. You can also control tags on these resources using the existing `custom_tags` input variable.




### [v0.12.2](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.12.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/10/2020 | Modules affected: vpc-flow-logs | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.12.2">Release notes</a></small>
</p>



- Fix a bug in how the `vpc-flow-logs` module looked up the KMS key when `create_resources` was set to `false`. 







### [v0.12.1](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.12.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/9/2020 | Modules affected: vpc-app, vpc-mgmt, vpc-mgmt-network-acls | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.12.1">Release notes</a></small>
</p>



- The `vpc-app` module now allows you to disable any of the three tiers of subnets (public, private-app, private-persistence) by setting the new input variables `create_public_subnets`, `create_private_app_subnets`, or `create_private_persistence_subnets` to `false`. This is convenient, for example, if you want to create a VPC with no public subnets because you get all public Internet access through some other mechanism (e.g., Direct Connect, VPC peering, etc). 
- **IMPORTANT NOTE: as of this release, `vpc-mgmt` is now deprecated**: The main difference between `vpc-mgmt` and `vpc-app` was that `vpc-app` had three tiers of subnets (public, private-app, private-persistence) and `vpc-mgmt` had two (public, private). As of 
this release, since `vpc-app` allows you to disable any of the subnet tiers, it can now support 1, 2, or 3 tiers of subnets, as needed. Therefore, we recommend using `vpc-app` for all your VPCs in the future. If you're already using `vpc-mgmt`, we will continue to maintain it for a little while longer, but please be aware that, in a future release, once we feel the new functionality in `vpc-app` is fully baked, we will remove `vpc-mgmt` entirely.
 






### [v0.12.0](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.12.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/3/2020 | Modules affected: vpc-flow-logs | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.12.0">Release notes</a></small>
</p>


**This release contains backwards incompatible changes. Make sure to follow the instructions in the migration guide below!**

The `vpc-flow-logs` module has been refactored to use the `private-s3-bucket` module under the hood to configure the S3 bucket.





## terraform-aws-zookeeper


### [v0.8.0](https://github.com/gruntwork-io/terraform-aws-zookeeper/releases/tag/v0.8.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/2/2020 | Modules affected: exhibitor-shared-config, zookeeper-cluster | <a href="https://github.com/gruntwork-io/terraform-aws-zookeeper/releases/tag/v0.8.0">Release notes</a></small>
</p>

**This release contains backwards incompatible changes. Make sure to follow the instructions in the migration guide below!**

The `exhibitor-shared-config` module has been refactored to use the `private-s3-bucket` module under the hood to configure the S3 bucket.





## terraform-kubernetes-helm


### [v0.6.2](https://github.com/gruntwork-io/terraform-kubernetes-helm/releases/tag/v0.6.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/15/2020 | <a href="https://github.com/gruntwork-io/terraform-kubernetes-helm/releases/tag/v0.6.2">Release notes</a></small>
</p>

(no description found in release notes)




<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "releases",
  "hash": "317c148fba1ba9792d55a49082031f1b"
}
##DOCS-SOURCER-END -->

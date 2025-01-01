
# Gruntwork release 2021-05

<p style={{marginTop: "-25px"}}><small><a href="/guides">Guides</a> / <a href="/guides/stay-up-to-date">Update Guides</a> / <a href="/guides/stay-up-to-date/releases">Releases</a> / 2021-05</small></p>

This page is lists all the updates to the [Gruntwork Infrastructure as Code
Library](https://gruntwork.io/infrastructure-as-code-library/) that were released in 2021-05. For instructions
on how to use these updates in your code, check out the [updating
documentation](/library/stay-up-to-date/updating).

Here are the repos that were updated:

- [aws-sample-app](#aws-sample-app)
- [gruntkms](#gruntkms)
- [infrastructure-live-multi-account-acme](#infrastructure-live-multi-account-acme)
- [terraform-aws-architecture-catalog](#terraform-aws-architecture-catalog)
- [terraform-aws-asg](#terraform-aws-asg)
- [terraform-aws-ci](#terraform-aws-ci)
- [terraform-aws-cis-service-catalog](#terraform-aws-cis-service-catalog)
- [terraform-aws-ecs](#terraform-aws-ecs)
- [terraform-aws-eks](#terraform-aws-eks)
- [terraform-aws-lambda](#terraform-aws-lambda)
- [terraform-aws-monitoring](#terraform-aws-monitoring)
- [terraform-aws-openvpn](#terraform-aws-openvpn)
- [terraform-aws-sam](#terraform-aws-sam)
- [terraform-aws-security](#terraform-aws-security)
- [terraform-aws-server](#terraform-aws-server)
- [terraform-aws-service-catalog](#terraform-aws-service-catalog)
- [terraform-aws-static-assets](#terraform-aws-static-assets)
- [terraform-aws-vpc](#terraform-aws-vpc)


## aws-sample-app


### [v0.0.4](https://github.com/gruntwork-io/aws-sample-app/releases/tag/v0.0.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/25/2021 | <a href="https://github.com/gruntwork-io/aws-sample-app/releases/tag/v0.0.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/aws-sample-app/pull/26: Fix bug where the node config was not loaded correctly for running migrations.

</div>



## gruntkms


### [v0.0.10](https://github.com/gruntwork-io/gruntkms/releases/tag/v0.0.10)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/27/2021 | <a href="https://github.com/gruntwork-io/gruntkms/releases/tag/v0.0.10">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/gruntkms/pull/30: We now publish binaries for Mac / ARM.

</div>



## infrastructure-live-multi-account-acme


### [v0.0.1-20210527](https://github.com/gruntwork-io/infrastructure-live-multi-account-acme/releases/tag/v0.0.1-20210527)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/27/2021 | <a href="https://github.com/gruntwork-io/infrastructure-live-multi-account-acme/releases/tag/v0.0.1-20210527">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  **NOTE: This repo will soon be archived in favor of the updated examples included in https://github.com/gruntwork-io/terraform-aws-service-catalog/for-production.**

Since this repo is solely used for examples/demonstrations, and NOT meant for direct production use, we simply publish all changes at v0.0.1, with a date marker for when it was published.


* Updated all the Terragrunt configurations (`terragrunt.hcl` files) to point their sources at the [AWS Service Catalog](http://github.com/gruntwork-io/terraform-aws-service-catalog/). This means they are no longer pointing to modules in the [`infrastructure-modules-multi-account-acme`](https://github.com/gruntwork-io/infrastructure-live-multi-account-acme) repo.
* Bumped module versions to latest versions providing compatibility with Terraform 0.14.x. See https://gruntwork.io/guides/upgrades/how-to-update-to-terraform-14/ for more details.
* Added migration guides for individual services. These are meant to be used along with the [Reference Architecture 2.0 Migration Guide](https://gruntwork.io/guides/upgrades/how-to-update-your-ref-arch/).
* `refarch-folder-structure.zip` is included as an asset, which contains the folder structure, terragrunt configuration files, yaml files, and scripts required for smoothly upgrading from Reference Architecture 1.0 to 2.0. It is provided as a convenience so that you can copy the relevant files to your own `infrastructure-live` repository, as part of your migration process.

</div>



## terraform-aws-architecture-catalog


### [v0.0.7](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v0.0.7)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/28/2021 | <a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v0.0.7">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - **Terraform 0.15 upgrade**: We have verified that this repo is compatible with Terraform `0.15.x`! 
    - From this release onward, we will only be running tests with Terraform `0.15.x` against this repo, so we recommend updating to `0.15.x` soon! 
    - To give you more time to upgrade, for the time being, all modules will still support Terraform `0.12.26` and above, as that version has several features in it (`required_providers` with `source` URLs) that make it more forwards compatible with `0.15.x`. 
    - Once all Gruntwork repos have been upgrade to work with `0.15.x`, we will publish a migration guide with a version compatibility table and announce it all via the Gruntwork Newsletter.

</div>



## terraform-aws-asg


### [v0.14.1](https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.14.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/7/2021 | Modules affected: asg-rolling-deploy | <a href="https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.14.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- You can now configure the deletion timeout for the ASG in the `asg-rolling-deploy` module using the new `deletion_timeout` input variable.



</div>



## terraform-aws-ci


### [v0.36.0](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.36.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/27/2021 | Modules affected: ec2-backup, ecs-deploy-runner-invoke-iam-policy, ecs-deploy-runner-standard-configuration, ecs-deploy-runner | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.36.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- **Terraform 0.15 upgrade**: We have verified that this repo is compatible with Terraform `0.15.x`! 
    - From this release onward, we will only be running tests with Terraform `0.15.x` against this repo, so we recommend updating to `0.15.x` soon! 
    - To give you more time to upgrade, for the time being, all modules will still support Terraform `0.12.26` and above, as that version has several features in it (`required_providers` with `source` URLs) that make it more forwards compatible with `0.15.x`. 
    - Once all Gruntwork repos have been upgrade to work with `0.15.x`, we will publish a migration guide with a version compatibility table and announce it all via the Gruntwork Newsletter.
- Note that as part of the Terraform 0.15 upgrade, we&apos;ve updated the `Dockerfile` for the `ecs-deploy-runner` to install Terraform 0.15.1 and Terragrunt v0.29.0 by default. **This is a backwards incompatible change**. See the migration guide below for upgrade instructions.


</div>


### [v0.35.1](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.35.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/13/2021 | Modules affected: ecs-deploy-runner | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.35.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

This release bumps the versions of Terraform, Terragrunt, and this repo within the ecs-deploy-runner Docker image.



</div>


### [v0.35.0](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.35.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/13/2021 | Modules affected: ecs-deploy-runner-standard-configuration, ecs-deploy-runner, build-helpers, terraform-helpers | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.35.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Add HTTPS auth support in `build-packer-artifact` for accessing private git repos over HTTPS.
- Add HTTPS auth support in `terraform-update-variable` for accessing private git repos over HTTPS.
- Bump the version of kubergrunt and tools from `terraform-aws-ci` used in ecs-deploy-runner Docker containers.


</div>


### [v0.34.0](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.34.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/12/2021 | Modules affected: ecs-deploy-runner, infrastructure-deploy-script, ecs-deploy-runner-standard-configuration | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.34.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

`infrastructure-deploy-script` and ECS Deploy Runner now has support for private repo authentication over HTTPS for terraform. Refer to the updated [documentation](https://github.com/gruntwork-io/terraform-aws-ci/blob/master/modules/ecs-deploy-runner/core-concepts.md#using-https-based-git-urls) for more information. Note that you must update `ecs-deploy-runner` and `ecs-deploy-runner-standard-configuration` to this version to take advantage of the new feature.



</div>



## terraform-aws-cis-service-catalog


### [v0.20.0](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.20.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/27/2021 | Modules affected: aws-config-multi-region, aws-securityhub, cleanup-expired-certs, cloudtrail | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.20.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- **Terraform 0.15 upgrade**: We have verified that this repo is compatible with Terraform `0.15.x`! 
    - From this release onward, we will only be running tests with Terraform `0.15.x` against this repo, so we recommend updating to `0.15.x` soon! 
    - To give you more time to upgrade, for the time being, all modules will still support Terraform `0.12.26` and above, as that version has several features in it (`required_providers` with `source` URLs) that make it more forwards compatible with `0.15.x`. 
    - Once all Gruntwork repos have been upgrade to work with `0.15.x`, we will publish a migration guide with a version compatibility table and announce it all via the Gruntwork Newsletter.





</div>


### [v0.19.1](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.19.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/25/2021 | Modules affected: aws-config-multi-region, cloudtrail, cross-account-iam-roles, custom-iam-entity | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.19.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
Update the underlying versions of the following modules:
- terraform-aws-security to v0.48.3
- terraform-aws-lambda to v0.11.1
- terraform-aws-vpc to v0.15.3
- terraform-aws-monitoring to v0.27.0
- terraform-aws-service-catalog to v0.36.4




</div>


### [v0.19.0](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.19.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/17/2021 | Modules affected: landingzone | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.19.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Update example `landingzone` READMEs to mention parallelism when running applying with `terraform apply` (see [here](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/blob/a5b42067f853bb6bc8657ba4772c76bbbc418f45/examples/for-learning-and-testing/landingzone/account-baseline-app/README.md) &amp; [here](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/blob/a5b42067f853bb6bc8657ba4772c76bbbc418f45/examples/for-learning-and-testing/landingzone/account-baseline-security/README.md))
- Update `account-baseline-security` and `account-baseline-app` to expose and name the variables consistently across submodules


</div>


### [v0.18.2](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.18.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/11/2021 | Modules affected: networking, landingzone | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.18.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Update the underlying versions of the following modules:

- terraform-aws-vpc to v0.15.2
- terraform-aws-service-catalog to v0.35.5



</div>


### [v0.18.1](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.18.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/11/2021 | Modules affected: landingzone | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.18.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Set default values for `cleanup-expired-certs` module when called from `landingzone/account-baseline-security`:
   - `var.schedule_expression`
   - `var.report_cloudwatch_metric_name`
   -  `var.report_cloudwatch_metric_namespace`
- Disable **non-CIS** AWS Config S3 bucket creation for `landingzone/account-baseline-security` 





</div>


### [v0.18.0](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.18.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/11/2021 | Modules affected: landingzone, networking, aws-config-multi-region, cloudtrail | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.18.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Added the benchmark alarm outputs to the `account-baseline-app` module and example.
- Added a `security_hub_accounts` output to the `account-baseline-app` module and example.
- Added `var.security_hub_external_member_accounts` to the `account-baseline-app` module.
- `var.config_central_account_id` now defaults to an empty string in the `account-baseline-app` module.
- Added `var.security_hub_external_member_accounts` to the `account-baseline-app` example.
- Added `var.config_linked_accounts`, `var.cloudtrail_kms_key_administrator_iam_arns` and `var.cloudtrail_kms_key_user_iam_arns` to the `account-baseline-app` module and example.
- Added `var.service_linked_roles` to the `account-baseline-app` module.
- Removed `var.kms_customer_master_keys` from the `account-baseline-app` example. **Note:** It is still supported by the module.
- Minor documentation improvements.





</div>


### [v0.17.2](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.17.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/3/2021 | Modules affected: networking, aws-securityhub, cleanup-expired-certs, aws-config-multi-region | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.17.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
Update the version of the following underlying modules:
- terraform-aws-vpc to v0.15.0
- terraform-aws-utilities to v0.5.0
- terraform-aws-lambda to v0.11.0
- terraform-aws-security to v0.48.1
- terraform-aws-service-catalog to v0.35.3



</div>


### [v0.17.1](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.17.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/3/2021 | Modules affected: landingzone/account-baseline-app, landingzone/account-baseline-security, cleanup-expired-certs, cloudtrail | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.17.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
This release adds new Landing Zone services `account-baseline-app` and `account-baseline-security`.

It also adds new variables to the `cloudtrail` service: `kms_key_arn_is_alias` and `allow_kms_describe_key_to_external_aws_accounts`.






</div>



## terraform-aws-ecs


### [v0.29.0](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.29.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/17/2021 | Modules affected: ecs-cluster, ecs-daemon-service, ecs-service | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.29.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- **Terraform 0.15 upgrade**: We have verified that this repo is compatible with Terraform `0.15.x`! 
    - From this release onward, we will only be running tests with Terraform `0.15.x` against this repo, so we recommend updating to `0.15.x` soon! 
    - To give you more time to upgrade, for the time being, all modules will still support Terraform `0.12.26` and above, as that version has several features in it (`required_providers` with `source` URLs) that make it more forwards compatible with `0.15.x`. 
    - Once all Gruntwork repos have been upgrade to work with `0.15.x`, we will publish a migration guide with a version compatibility table and announce it all via the Gruntwork Newsletter.
- As part of the upgrade to Terraform 0.15, we had to work around two bugs on `destroy`. These required backwards incompatible changes. **Make sure to follow the instructions in the migration guide below.**
- You can now tell the `ecs-service` and `ecs-daemon-service` modules to wait for steady state by setting the new `wait_for_steady_state` input variable to `true`.


</div>


### [v0.28.3](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.28.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/10/2021 | Modules affected: ecs-deploy | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.28.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

The `run-ecs-task` command now supports overriding the task definition command. This is useful to run one off commands using the same task definition as your ECS service. Refer to [the command docs](https://github.com/gruntwork-io/terraform-aws-ecs/tree/master/modules/ecs-deploy#override-the-container-command) for more info.



</div>



## terraform-aws-eks


### [v0.40.0](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.40.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/28/2021 | Modules affected: eks-cluster-control-plane, eks-k8s-cluster-autoscaler | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.40.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- The default Kubernetes version deployed by the control plane module has been updated to `1.20`. If you wish to maintain backward compatibility with your existing setup, you will want to configure the `kubernetes_version` parameter to the version of Kubernetes you are currently using. Note that `1.20` requires `kubergrunt` version `0.7.0` and above.
- The default cluster-autoscaler version has been updated to `1.20`. If you wish to maintain backward compatibility with your existing setup, you will want to configure the `cluster_autoscaler_version` input variable.



</div>


### [v0.39.2](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.39.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/28/2021 | Modules affected: eks-k8s-external-dns | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.39.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Expose ability to override pod labels for `external-dns`




</div>


### [v0.39.1](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.39.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/27/2021 | Modules affected: eks-cluster-control-plane | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.39.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Expose the managed cluster security group ID in the output `eks_cluster_managed_security_group_id`.




</div>


### [v0.39.0](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.39.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/26/2021 | Modules affected: eks-k8s-cluster-autoscaler, eks-cluster-control-plane | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.39.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Update `var.kubergrunt_download_url` to latest kubergrunt version (`v0.6.16`)
- Bump to latest maintained cluster autoscaler version. Note that this requires a redeployment. Review the migration guide below for more info.



</div>


### [v0.38.0](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.38.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/7/2021 | Modules affected: eks-cluster-workers, eks-scripts | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.38.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Expose ability to filter tags by prefix in `map-ec2-tags-to-node-labels`. You can read more about this feature in [the README](https://github.com/gruntwork-io/terraform-aws-eks/tree/master/modules/eks-scripts#prefix).
- The `eks-cluster-workers` module now relies on launch templates instead of launch configuration to manage the Auto Scaling Group. This means that you can now take advantage of advanced features like multi instances policy for mixed workload ASGs. (This is a **backward incompatible** change. Please read the migration guide below for more info!)


</div>


### [v0.37.2](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.37.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/4/2021 | Modules affected: eks-alb-ingress-controller, eks-cluster-control-plane, eks-cluster-managed-workers, eks-cluster-workers | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.37.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

You can now specify the AWS partition (using the `aws_partition` input variable) for the hard coded IAM ARNs used in the modules. This allows you to deploy these resources in alternative partitions, such as GovCloud.



</div>


### [v0.37.1](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.37.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/4/2021 | Modules affected: eks-k8s-external-dns | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.37.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

You can now customize the helm release name and the service account annotations in the `eks-k8s-external-dns` module using the input variables `release_name` and `service_account_annotations`.



</div>



## terraform-aws-lambda


### [v0.11.1](https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.11.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/20/2021 | Modules affected: lambda | <a href="https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.11.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Remove unused module variable
  - `source_code_hash` was not being used anywhere





</div>



## terraform-aws-monitoring


### [v0.27.0](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.27.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/25/2021 | Modules affected: alarms, logs, metrics | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.27.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- **Terraform 0.15 upgrade**: We have verified that this repo is compatible with Terraform `0.15.x`! 
    - From this release onward, we will only be running tests with Terraform `0.15.x` against this repo, so we recommend updating to `0.15.x` soon! 
    - To give you more time to upgrade, for the time being, all modules will still support Terraform `0.12.26` and above, as that version has several features in it (`required_providers` with `source` URLs) that make it more forwards compatible with `0.15.x`. 
    - Once all Gruntwork repos have been upgrade to work with `0.15.x`, we will publish a migration guide with a version compatibility table and announce it all via the Gruntwork Newsletter.





</div>


### [v0.26.2](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.26.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/14/2021 | Modules affected: alarms | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.26.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Create an alarm for lambdas
  This module can be used to create CloudWatch alarms that go off if the Lambda function breaches an associated metric. See the [supported metrics docs](https://docs.aws.amazon.com/lambda/latest/dg/monitoring-metrics.html) for available metrics. By default we use the `Errors` metric which is the number of invocations that result in a function error and set to alert as soon as there is an error. Function errors include exceptions thrown by your code and exceptions thrown by the Lambda runtime.






</div>



## terraform-aws-openvpn


### [v0.15.2](https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.15.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/4/2021 | Modules affected: openvpn-admin | <a href="https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.15.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

The search algorithm for finding the optimal mssfix value when `--mssfix` is omitted to `openvpn-admin` has been optimized.



</div>


### [v0.15.1](https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.15.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/4/2021 | Modules affected: openvpn-admin | <a href="https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.15.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

You can now specify the host used for conducting the ping test to identify the optimal MTU for the system using the `--host-for-mssfix` input parameter to `openvpn-admin`. As a part of this, the default domain used for the ping test has been switched to `1.1.1.1`.



</div>



## terraform-aws-sam


### [v0.5.0](https://github.com/gruntwork-io/terraform-aws-sam/releases/tag/v0.5.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/25/2021 | Modules affected: api-gateway-account-settings, gruntsam | <a href="https://github.com/gruntwork-io/terraform-aws-sam/releases/tag/v0.5.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- **Terraform 0.15 upgrade**: We have verified that this repo is compatible with Terraform `0.15.x`! 
    - From this release onward, we will only be running tests with Terraform `0.15.x` against this repo, so we recommend updating to `0.15.x` soon! 
    - To give you more time to upgrade, for the time being, all modules will still support Terraform `0.12.26` and above, as that version has several features in it (`required_providers` with `source` URLs) that make it more forwards compatible with `0.15.x`. 
    - Once all Gruntwork repos have been upgrade to work with `0.15.x`, we will publish a migration guide with a version compatibility table and announce it all via the Gruntwork Newsletter.





</div>



## terraform-aws-security


### [v0.49.0](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.49.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/28/2021 | Modules affected: account-baseline-app, account-baseline-root, account-baseline-security | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.49.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

All of the `account-baseline-*` modules have been moved to [the service catalog](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/modules/landingzone). See the migration guide below.



</div>


### [v0.48.5](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.48.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/27/2021 | Modules affected: aws-config-multi-region, aws-config | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.48.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- You can now explicitly set the current AWS account ID in the `aws-config` module via the new `current_account_id` input variable. This helps work around rare issues with the `aws_caller_identity` data source returns the wrong value.
- The `aws-config-multi-region` module already had a `current_account_id` input variable, but now it will also pass through to the `aws-config` module under the hood.



</div>


### [v0.48.4](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.48.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/26/2021 | Modules affected: private-s3-bucket, aws-config | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.48.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fix a bug in the `private-s3-bucket` module where the lookup for the `expired_object_delete_marker` parameter had an extra space in it. 
- Fix a bug in the `aws-config` module where it would try to create an IAM role policy to manage the SNS topic, even if you disabled the SNS topic.



</div>


### [v0.48.3](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.48.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/21/2021 | Modules affected: private-s3-bucket | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.48.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Add `required_providers` block with `aws` provider to the `private-s3-bucket` module. This makes it possible to use the module across multiple regions without getting warnings with Terraform 0.15.





</div>


### [v0.48.2](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.48.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/14/2021 | Modules affected: custom-iam-entity, aws-config-rules | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.48.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Create `null_resource` for AWS Config Rules only if region enabled globally
- Update descriptions for `custom-iam-entity` 
- Update Readme for `ssh-grunt` to point to right place in the `core-concepts.md` document



</div>



## terraform-aws-server


### [v0.12.1](https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.12.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/6/2021 | Modules affected: single-server | <a href="https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.12.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- The `single-server` module now outputs the AMI ID via a new `ami` output variable.



</div>



## terraform-aws-service-catalog


### [v0.39.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.39.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/28/2021 | Modules affected: landingzone/account-baseline-app, landingzone/account-baseline-root, landingzone/account-baseline-security | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.39.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

The `account-baseline-app`, `account-baseline-security`, and `account-baseline-root` modules have been updated to match the versions in `terraform-aws-security`. The `account-baseline-app` and `account-baseline-root` modules are backward compatible. See the migration guide below to update `account-baseline-security`.


</div>


### [v0.38.1](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.38.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/28/2021 | Modules affected: data-stores | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.38.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Update the `aurora` module to mark the password parameter as `sensitive` and the non-password parameters as `nonsensitive`. This is required for the module to work with Terraform 0.15, and was missed in the previous release.





</div>


### [v0.38.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.38.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/28/2021 | Modules affected: base, data-stores, landingzone, mgmt | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.38.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- **Terraform 0.15 upgrade**: We have verified that this repo is compatible with Terraform `0.15.x`! 
    - From this release onward, we will only be running tests with Terraform `0.15.x` against this repo, so we recommend updating to `0.15.x` soon! 
    - To give you more time to upgrade, for the time being, all modules will still support Terraform `0.12.26` and above, as that version has several features in it (`required_providers` with `source` URLs) that make it more forwards compatible with `0.15.x`. 
    - Once all Gruntwork repos have been upgrade to work with `0.15.x`, we will publish a migration guide with a version compatibility table and announce it all via the Gruntwork Newsletter.
- As part of the 0.15 upgrade, bump dependency versions:
    - terraform-aws-security: v0.48.2 -&gt; v0.48.3
    - terraform-aws-data-storage: v0.18.1 -&gt; v0.20.0
    - terraform-aws-messaging: v0.5.0 -&gt; v0.6.0
    - terraform-aws-eks: v0.36.0 -&gt; v0.37.0
    - terraform-aws-static-assets: v0.8.0 -&gt; v0.9.0
- Due to how Terraform handles sensitive data in Terraform 0.15, we were forced to use the `sensitive` and `nonsensitive` params in the `rds` module, which means **this module now requires Terraform 0.15 and above to use**. All the other modules require `0.12.26` or `0.13.0` and above.





</div>


### [v0.37.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.37.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/27/2021 | Modules affected: services/ecs-cluster, services/ecs-service, mgmt, data-stores | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.37.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Update dependency gruntwork-io/terraform-aws-ecs to v0.29.0 (NOTE: This is **backward incompatible** - Please see [the migration guide included with release v0.29.0 of gruntwork-io/terraform-aws-ecs](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.29.0)).
- Update for-production examples
-  Add security_group_id output to RDS module



</div>


### [v0.36.5](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.36.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/27/2021 | Modules affected: services, mgmt, base, data-stores | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.36.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- You can now enable storage autoscaling in the `rds` module using the new `max_allocated_storage` input variable.
- Update dependency gruntwork-io/terraform-kubernetes-namespace to v0.3.0.
- Update dependency gruntwork-io/terragrunt to v0.29.6.
- Update dependency gruntwork-io/terraform-aws-monitoring to v0.27.0.



</div>


### [v0.36.4](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.36.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/24/2021 | Modules affected: networking, services | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.36.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Add Lambda README
- Make route53 ACM certificate validation optional. It is now possible to request ACM certificates without having DNS verification records created for them or having them pass AWS&apos;s programmatic validation process. You can request certs that will not require verification by setting the variables: 

  * `create_verification_record`
  * `verify_certificate` 

  to `false`




</div>


### [v0.36.3](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.36.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/21/2021 | Modules affected: services, landingzone, base, data-stores | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.36.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- New Service: Lambda
- [BUG FIX] Account Baseline Root: Search logs account by email
- Update dependency gruntwork-io/terraform-aws-security to v0.48.2




</div>


### [v0.36.2](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.36.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/14/2021 | Modules affected: mgmt, services | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.36.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Update dependency helm/helm to v3.5.4 in jenkins.
- `k8s-service` module now supports configuring Ingress grouping. Refer to the [documentation](https://github.com/gruntwork-io/terraform-aws-service-catalog/blob/master/modules/services/k8s-service/core-concepts.md#ingress-groups) for more information.



</div>


### [v0.36.1](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.36.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/14/2021 | Modules affected: networking, mgmt, services, base | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.36.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Update dependency gruntwork-io/terraform-aws-vpc to v0.15.2
- Update dependency gruntwork-io/kubergrunt to v0.6.16
- Update dependency gruntwork-io/terraform-aws-asg to v0.14.1
- Update dependency gruntwork-io/terraform-aws-server to v0.12.1
- Update dependency gruntwork-io/terraform-aws-openvpn to v0.15.2
- Exposes alternate SSH interfaces in all packer templates



</div>


### [v0.36.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.36.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/13/2021 | Modules affected: mgmt/ecs-deploy-runner | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.36.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Update dependency gruntwork-io/terraform-aws-ci to v0.35.0. As a result of this, the `ecs-deploy-runner` now supports authenticating to git repositories over HTTPS.


</div>


### [v0.35.5](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.35.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/10/2021 | Modules affected: networking, base, services | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.35.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- `networking`
- `base`
- `services`


- Update dependency gruntwork-io/terraform-aws-vpc to v0.15.1
- `vpc` module now supports configuring direct client IP access to the private app tier on privileged ports (&lt; 1024). This is necessary for configuring access to apps in the private app tier with an NLB in the public access tier.
- Update `for-production/` examples to the latest versions of the modules.
- Make `worker_name_prefix` configurable (for EKS workers), so that old versions of the reference architecture can upgrade to the service catalog version of the ref arch without having to recreate resources in the `eks-workers` module. Also correct the descriptions for ami/ami_filters, which were slightly misleading.


- https://github.com/gruntwork-io/terraform-aws-service-catalog/pull/648
- https://github.com/gruntwork-io/terraform-aws-service-catalog/pull/476
- https://github.com/gruntwork-io/terraform-aws-service-catalog/pull/662



</div>


### [v0.35.4](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.35.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/4/2021 | Modules affected: base, data-stores, landingzone, mgmt | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.35.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- Update dependency gruntwork-io/terraform-aws-security to v0.48.1
- Update dependency gruntwork-io/terragrunt to v0.29.2
- Update dependency gruntwork-io/kubergrunt to v0.6.15
- `kubernetes_role_binding` resources for full-access and read-only access have been added to the `k8s-namespace` module.



</div>



## terraform-aws-static-assets


### [v0.10.0](https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.10.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/3/2021 | Modules affected: s3-static-website | <a href="https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.10.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Updated the `s3-static-website` module to create the S3 bucket for access logs using the `private-s3-bucket` module under the hood. This adds several extra layers of protection for the access logs bucket, including blocking all public access, enabling encryption at rest, and requiring encryption in transit. This is a backwards incompatible change, so see the migration guide for upgrade instructions.


</div>



## terraform-aws-vpc


### [v0.15.4](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.15.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/27/2021 | Modules affected: vpc-flow-logs | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.15.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

`vpc-flow-logs`: Expose `log_format` variable



</div>


### [v0.15.3](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.15.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/17/2021 | Modules affected: vpc-peering-cross-accounts-accepter, vpc-peering-cross-accounts-requester, network-acl-inbound, network-acl-outbound | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.15.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Added new modules for doing VPC peering across two AWS accounts that you own: use `vpc-peering-cross-accounts-requester` to send a peering request and `vpc-peering-cross-accounts-accepter` to accept it. See [`vpc-peering-cross-accounts`](https://github.com/gruntwork-io/terraform-aws-vpc/tree/master/examples/vpc-peering-cross-accounts) for example usage.
- Rename deprecated patterns: rename all `vars.tf` files to `variables.tf`. There should be no impact on behavior.






</div>


### [v0.15.2](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.15.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/6/2021 | Modules affected: vpc-app | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.15.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Add `enable_default_security_group` to enable destroy the default security group





</div>


### [v0.15.1](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.15.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/4/2021 | Modules affected: vpc-app-network-acls | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.15.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

Add support for exposing client access directly in the nacls for the private app tier for NLB access. You can learn more about this feature in [the updated README](https://github.com/gruntwork-io/terraform-aws-vpc/tree/master/modules/vpc-app-network-acls#how-do-i-configure-the-network-acls-for-public-elb-access).



</div>

<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "releases",
  "hash": "951db9908c818da1a733953bf83a2488"
}
##DOCS-SOURCER-END -->

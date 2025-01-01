
# Gruntwork release 2020-11

<p style={{marginTop: "-25px"}}><small><a href="/guides">Guides</a> / <a href="/guides/stay-up-to-date">Update Guides</a> / <a href="/guides/stay-up-to-date/releases">Releases</a> / 2020-11</small></p>

This page is lists all the updates to the [Gruntwork Infrastructure as Code
Library](https://gruntwork.io/infrastructure-as-code-library/) that were released in 2020-11. For instructions
on how to use these updates in your code, check out the [updating
documentation](/library/stay-up-to-date/updating).

Here are the repos that were updated:

- [boilerplate](#boilerplate)
- [infrastructure-modules-multi-account-acme](#infrastructure-modules-multi-account-acme)
- [terraform-aws-ci](#terraform-aws-ci)
- [terraform-aws-data-storage](#terraform-aws-data-storage)
- [terraform-aws-ecs](#terraform-aws-ecs)
- [terraform-aws-eks](#terraform-aws-eks)
- [terraform-aws-lambda](#terraform-aws-lambda)
- [terraform-aws-messaging](#terraform-aws-messaging)
- [terraform-aws-monitoring](#terraform-aws-monitoring)
- [terraform-aws-openvpn](#terraform-aws-openvpn)
- [terraform-aws-security](#terraform-aws-security)
- [terraform-aws-server](#terraform-aws-server)
- [terraform-aws-service-catalog](#terraform-aws-service-catalog)
- [terraform-aws-static-assets](#terraform-aws-static-assets)
- [terraform-aws-vpc](#terraform-aws-vpc)


## boilerplate


### [v0.3.4: skip_files for conditionally skipping files](https://github.com/gruntwork-io/boilerplate/releases/tag/v0.3.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/16/2020 | <a href="https://github.com/gruntwork-io/boilerplate/releases/tag/v0.3.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/boilerplate/pull/71: This release introduces `skip_files` in the configuration, which can be used to conditionally skip files in the template folder. Refer to [the relevant section in the README](https://github.com/gruntwork-io/boilerplate#skip-files) for more info.

</div>


### [v0.3.3: Add `toYaml` function](https://github.com/gruntwork-io/boilerplate/releases/tag/v0.3.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/4/2020 | <a href="https://github.com/gruntwork-io/boilerplate/releases/tag/v0.3.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  This release adds a new helper function called `toYaml` that will render a given input variable to a YAML string. This is similar to the `toJson` sprig function.

</div>



## infrastructure-modules-multi-account-acme


### [v0.0.1-20201125](https://github.com/gruntwork-io/infrastructure-modules-multi-account-acme/releases/tag/v0.0.1-20201125)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/25/2020 | <a href="https://github.com/gruntwork-io/infrastructure-modules-multi-account-acme/releases/tag/v0.0.1-20201125">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Since this repo is solely used for examples/demonstrations, and NOT meant for direct production use, we simply publish all changes at v0.0.1, with a date marker for when it was published.


The EKS modules have been updated to `v0.28.0`, which removes dependency on the helm 2 chart repository which has now been retired. **This includes a backwards incompatible change for `eks-core-services`**. To update to this version, the easiest approach would be to redeploy the services in `eks-core-services` by running a `terragrunt destroy` and then a `terragrunt apply` on that module. Note that this is a safe operation given that all the services in `eks-core-services` is stateless.

</div>



## terraform-aws-ci


### [v0.29.2](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.29.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/20/2020 | Modules affected: ecs-deploy-runner | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.29.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

The default version of tools used in the Docker image for the ECS Deploy Runner has been updated to the latest versions.



</div>



## terraform-aws-data-storage


### [v0.17.0](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.17.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/23/2020 | Modules affected: efs | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.17.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- The `efs` module now allows you to grant root access to the EFS volume using the `root_access_arns` field in the `efs_access_points` input variable. This is a backwards incompatible update, so please see the migration guide for instructions.


</div>


### [v0.16.3](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.16.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/5/2020 | Modules affected: redshift | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.16.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- You can now configure IAM roles for the `redshift` module to use via the new `iam_roles` input variable.






</div>



## terraform-aws-ecs


### [v0.23.1](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.23.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/24/2020 | Modules affected: ecs-service | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.23.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- You can now configure the permissions boundary for the auto scaling IAM role for in `ecs-service` using the new `autoscaling_role_permissions_boundary_arn` input variable.



</div>



## terraform-aws-eks


### [v0.29.0](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.29.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/19/2020 | Modules affected: eks-cluster-workers, eks-cluster-control-plane | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.29.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- This release updates `eks-cluster-workers` to allow you to specify different instance types for each ASG specified in `var.autoscaling_group_configurations`. As part of this change, `var.autoscaling_group_configurations` was converted from an `object` type with concrete attributes to an `any` to allow for optionality in the attributes. Now you only need to specify `subnet_ids` as opposed to the whole object, with the missing values being sourced from the variables prefixed with `asg_default`. Refer to the updated variable documentation for more details.

- The cleanup routine for EKS control plane will now cull Security Groups created by the AWS Load Balancer Controller.


</div>


### [v0.28.0](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.28.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/17/2020 | Modules affected: eks-alb-ingress-controller, eks-alb-ingress-controller-iam-policy | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.28.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
This release updates the `eks-alb-ingress-controller` to use the new chart location following the deprecation of the `incubator` and `stable` helm chart repository. In the process, the underlying controller has been upgraded to v2. Please refer to the migration guide below for information on updating to this release.


</div>


### [v0.27.2](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.27.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/3/2020 | Modules affected: eks-container-logs | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.27.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fix a bug in the `eks-container-logs` where Elasticsearch output was being enabled by default. This also fixes a bug where the boolean encoding in the helm chart values were incorrect.
- Expose the ability to configure `pod_resources` for the DaemonSet in `eks-container-logs`.




</div>



## terraform-aws-lambda


### [v0.9.4](https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.9.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/24/2020 | Modules affected: lambda | <a href="https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.9.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- You can now configure a custom assume role policy for the IAM role in the `lambda` module using the new `assume_role_policy` input variable. This is useful in a few special cases when the default assume role policy won&apos;t work, such as using Lambda functions to rotate secrets in AWS Secrets Manager.





</div>


### [v0.9.3](https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.9.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/5/2020 | Modules affected: lambda | <a href="https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.9.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- The `lambda` module now allows you to mount an EFS file system in your Lambda functions using the new `mount_to_file_system`, `file_system_access_point_arn`, and `file_system_mount_path` variables. See [this example](https://github.com/gruntwork-io/package-lambda/tree/master/examples/lambda-vpc) for sample usage.



</div>



## terraform-aws-messaging


### [v0.4.1](https://github.com/gruntwork-io/terraform-aws-messaging/releases/tag/v0.4.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/16/2020 | Modules affected: kinesis | <a href="https://github.com/gruntwork-io/terraform-aws-messaging/releases/tag/v0.4.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- You can now specify custom tags to apply to the Kinesis stream using the new `tags` input variable.






</div>



## terraform-aws-monitoring


### [v0.23.4](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.23.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/13/2020 | Modules affected: alarms | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.23.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Only create the RDS high replica lag alarm in the `rds-alarms` module if there is at least one replica (`num_rds_instance_ids` is greater than 0).



</div>


### [v0.23.3](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.23.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/6/2020 | Modules affected: alarms | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.23.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- The `rds-alarms` module will now only create the replication error alarm if there is more than one RDS instance (that is, if there are actual replicas to alert about!).



</div>



## terraform-aws-openvpn


### [v0.12.1](https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.12.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/18/2020 | Modules affected: init-openvpn, install-openvpn, openvpn-admin | <a href="https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.12.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- With this release `package-openvpn` now supports Ubuntu 20.04. 
- For more context, Ubuntu 20.04 is more secure against some risk vulnerabilities that were identified in [this issue](https://github.com/gruntwork-io/package-openvpn/issues/89): 
   - [CVE-2018-1000035 - patched in 20.04](https://people.canonical.com/~ubuntu-security/cve/2018/CVE-2018-1000035.html)
       - A ZIP exploit of password-protected archives
   - [CVE-2018-12327 - 20.04 is not affected](https://people.canonical.com/~ubuntu-security/cve/2018/CVE-2018-12327.html)
       - Code execution or elevation of privilege via NTP command line stack-based buffer overflow
   - [CVE-2019-7306  - 20.04 is not affected](https://people.canonical.com/~ubuntu-security/cve/2019/CVE-2019-7306.html)
       - Byobu Apport uploads .screenrc with diagnostics
- We&apos;re using `easy-rsa v2.x` on Ubuntu 20.04 - allows for continuity between the Ubuntu 16.04, 18.04, or 20.04 implementations of `package-openvpn`. There&apos;s an issue raised to follow up on this and upgrade to using `easy-rsa v3.x` 
- By adding support for Ubuntu 20.04, we&apos;re ensuring:
    - this package can work on the latest LTS distro and has been tested with it
    - users can use a more secure implementation of openVPN
    - users can reuse the `/examples/packer/build.json` to build an AMI with Ubuntu 20.04.
- Docs have also been updated to allow future OS support contributions, and to make it clearer to users how to get started with the `openvpn-host` terraform example



</div>



## terraform-aws-security


### [v0.44.0](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.44.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/25/2020 | Modules affected: cloudtrail-bucket, cloudtrail | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.44.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
**This release contains backwards incompatible changes. Make sure to follow the instructions in the migration guide below!**
- The `cloudtrail-bucket` module has been refactored to use the `private-s3-bucket` module under the hood to configure the S3 bucket.



</div>


### [v0.43.0](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.43.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/25/2020 | Modules affected: aws-config-bucket, aws-config, aws-config-multi-region, account-baseline-root | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.43.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
__This release contains backwards incompatible changes. Make sure to follow the instructions in the migration guide below!__

- The `aws-config-bucket` module has been refactored to use the `private-s3-bucket` module under the hood to configure the S3 bucket.



</div>


### [v0.42.0](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.42.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/24/2020 | Modules affected: ebs-encryption-multi-region, ebs-encryption | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.42.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
This release fixes two issues with the `ebs-encryption` modules:

1. Previously, the `aws_ebs_encryption_default_kms_key` output of  a list of strings, but the only possibility was a list of 0 or 1 elements. It now outputs a string instead.
1. A typo in the `aws_ebs_encryption_default_kms_key` output resulted in the wrong value. The output now exposes the intended value, which is the KMS key ARN of the default key.

If you were previously using this output as a list, update your code to instead expect a string value. Also be aware that the module now provides the actual key ARN correctly.






</div>


### [v0.41.3](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.41.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/16/2020 | Modules affected: secrets-manager-resource-policies | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.41.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
New module: `secrets-manager-resource-policies`. This module manages the [resource-based policies](https://docs.aws.amazon.com/secretsmanager/latest/userguide/auth-and-access_resource-based-policies.html) that can be associated with AWS Secrets Manager secrets. You can use the module to manage read only and full access to secrets by specifying any user, role, or root ARN to the `iam_entities_with_read_access` and `iam_entities_with_full_access` variables, respectively. You can also construct a custom policy using the [`aws_iam_policy_document` data source](https://www.terraform.io/docs/providers/aws/d/iam_policy_document.html) and providing it via the `policy_statement_json` variable.



</div>


### [v0.41.2](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.41.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/12/2020 | Modules affected: cloudtrail | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.41.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- You can now configure how many days to retain CloudWatch logs in the `cloudtrail` module using the new `num_days_to_retain_cloudwatch_logs` input variable.



</div>


### [v0.41.1](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.41.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/9/2020 | Modules affected: account-baseline-security | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.41.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

Fix bug where the default value for `ebs_kms_key_name` must be `&quot;&quot;`, not `null` for the `account-baseline-security` module.



</div>


### [v0.41.0](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.41.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/6/2020 | Modules affected: aws-config-multi-region, account-baseline-root, account-baseline-app, account-baseline-security | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.41.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- The `aws-organizations` and `account-baseline-root` modules now output `organization_root_id`.

- The `aws-config-multi-region` module can now configure default AWS Config rules (those defined by the `aws-config-rules` module) in every region AWS Config is enabled. This behavior is controlled using the new `enable_config_rules` input variable (NOTE: defaults to `true`).

- The `aws-config-rules` module can now separately apply rules related to global resources such as IAM using the new `enable_global_resource_rules` variable. As a result, the account baseline modules have been updated to manage the config rules in `aws-config-multi-region` as opposed to separately calling the `aws-config-rules` module, so that the config rules are applied in every supported by AWS Config. As a result, the resource addresses for the config rules have changed. Refer to the migration guide for information on how to upgrade to this version.

- Additional parameters for managing `aws-config-rules` are now exposed in the account baseline modules. The following configuration parameters are now exposed in each account baseline module:

    - `encrypted_volumes_kms_id`
    - `rds_storage_encrypted_kms_id`


</div>


### [v0.40.2](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.40.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/4/2020 | Modules affected: private-s3-bucket, account-baseline-app, account-baseline-root, account-baseline-security | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.40.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

This release adds a new module, `ebs-encryption`, which allows you to control whether EC2 Elastic Block Storage volumes are encrypted by default. The corresponding `ebs-encryption-multi-region` module will do the same, but for multiple regions in parallel. The `account-baseline-*` modules have been updated to use these modules to enable EBS encryption by default. For usage details, refer to [the example](https://github.com/gruntwork-io/module-security/blob/master/examples/ebs-encryption-multi-region/README.md).




</div>



## terraform-aws-server


### [v0.9.3](https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.9.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/6/2020 | Modules affected: single-server | <a href="https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.9.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- You can now specify a custom private IP address for your EC2 instance using the new `private_ip` input parameter in the `single-server` module.



</div>


### [v0.9.2](https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.9.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/5/2020 | Modules affected: attach-eni | <a href="https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.9.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fixed CentOS `attach-eni` bug depending on the CentOS version and AWS instance type.





</div>



## terraform-aws-service-catalog


### [v0.11.1](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.11.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/30/2020 | Modules affected: services/eks-cluster, data-stores/aurora, data-stores/rds | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.11.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- EKS cluster now supports the aws-auth-merger functionality introduced in [terraform-aws-eks v0.23.0](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.23.0).
- Sets default values for the ssh-grunt group name in the ECS cluster
- Updates Aurora &amp; RDS modules to restore-from-snapshot using the snapshot&apos;s identifier



</div>


### [v0.11.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.11.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/25/2020 | Modules affected: networking/vpc, networking/vpc-mgmt, mgmt, data-stores/aurora | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.11.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Update dependency `gruntwork-io/terraform-aws-vpc`: `v0.10.0` =&gt; `v0.11.0` ([release notes](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.11.0)). **NOTE: This includes a backwards incompatible change for `networking/vpc` module if you had `create_dns_forwarder = true`**. Refer to [the migration guide](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.11.0) from the underlying module for more information.
- Update dependency `gruntwork-io/module-ci`: `v0.29.1` =&gt; `v0.29.2` ([release notes](https://github.com/gruntwork-io/module-ci/releases/tag/v0.29.2)).
- The `aurora` module can now read its DB config (e.g. username, password, port, engine, and database name) from a JSON object in an AWS Secrets Manager secret, similar to what was already available for the RDS module.



</div>


### [v0.10.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.10.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/24/2020 | Modules affected: services/terraform-aws-eks, networking, base, data-stores | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.10.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Update dependency `gruntwork-io/terraform-aws-eks`: `v0.28.0` =&gt; `v0.29.0` ([release notes](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.29.0)). Note that this will require code changes to the input variables. Refer to [the migration guide](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.29.0) from the underlying module for more information.
- The outputs of the default EBS encryption in the`account-baseline-app` landingzone module have changed. See the [`v0.42.0` `module-security` release notes](https://github.com/gruntwork-io/module-security/releases/tag/v0.42.0) for details.




</div>


### [v0.9.3](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.9.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/23/2020 | Modules affected: mgmt/openvpn-server | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.9.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Updates dependency gruntwork-io/terragrunt to v0.26.4
- Update dependency gruntwork-io/package-openvpn to v0.12.1
- Sets default ssh-grunt group name to match [the values in module-security](https://github.com/gruntwork-io/module-security/blob/master/modules/iam-groups/variables.tf#L123).



</div>


### [v0.9.2](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.9.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/18/2020 | Modules affected: mgmt/ecs-deploy-runner | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.9.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
Adds two new optional variables to the `ecs-deploy-runner` service:

- `shared_secrets_enabled`: a boolean indicating whether or not shared secrets are to be used
- `shared_secrets_kms_cmk_arn`: the ARN of a KMS key from another account used to encrypt shared secrets

The use case is to allow a single, central account, such as the shared-services account, to create AWS Secrets Manager secrets, encrypt them with a KMS CMK, and allow delegated accounts access to decrypt those secrets. If `shared_secrets_enabled=true`, then `shared_secrets_kms_cmk_arn` must be provided. The module will grant `Decrypt` and `DescribeKey` permissions to each of the ECS deploy runner containers as well as to the ECS task execution role.




</div>


### [v0.9.1](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.9.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/18/2020 | Modules affected: services/ecs-cluster | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.9.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

In Terraform &gt;= v0.13.4, `depends_on` must refer to the resource object rather than any attributes on that resource. For example, this:

```
depends_on = [module.ecs_cluster.aws_autoscaling_group.ecs]
```

needs to look like this:

```
depends_on = [module.ecs_cluster.aws_autoscaling_group]
```

This released updates the `ecs-cluster` module accordingly.



</div>


### [v0.9.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.9.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/17/2020 | Modules affected: services/eks-core-services, services/eks-cluster, base/ec2-baseline, data-stores | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.9.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Update dependency `gruntwork-io/module-security`: `v0.41.2` =&gt; `v0.41.3` ([release notes](https://github.com/gruntwork-io/module-security/releases/tag/v0.41.3))
- Update dependency `gruntwork-io/package-static-assets`: `v0.7.0` =&gt; `v0.7.1` ([release notes](https://github.com/gruntwork-io/package-static-assets/releases/tag/v0.7.1))
- Update default version of `terragrunt` installed in jenkins from `v0.26.2` to `v0.26.3`.
- Update dependency `gruntwork-io/terraform-aws-eks`: `v0.27.2` =&gt; `v0.28.0` ([release notes](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.28.0)). Note that this will redeploy the AWS ALB ingress controller, upgrading to v2 pods. The v2 ingress controller is backwards compatible with existing ingress resources, and this will not cause your ALBs to shuffle (no downtime to your apps).



</div>


### [v0.8.1](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.8.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/13/2020 | Modules affected: mgmt, base, data-stores, networking | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.8.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Update the default version of helm installed in Jenkins to `v3.4.1`.
- Update dependency `gruntwork-io/terraform-aws-monitoring`: `v0.23.3` =&gt;  `v0.23.4` ([release notes](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.23.4))
- Update dependency `gruntwork-io/module-security`: `v0.41.1` =&gt; `v0.41.2` ([release notes](https://github.com/gruntwork-io/module-security/releases/tag/v0.41.2))
- Expose `ecs_task_execution_role_arn` for the ECS deploy runner as an output.



</div>


### [v0.8.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.8.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/11/2020 | Modules affected: services/eks-core-services, networking, services/eks-cluster, services/k8s-service | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.8.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- Update `terraform-aws-eks`: `v0.26.0` =&gt; `v0.27.2` (Release notes: [v0.26.1](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.26.1) ; [v0.27.0](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.27.0) ; [v0.27.1](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.27.1) ; [v0.27.2](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.27.2)). NOTE: This includes a backwards incompatible change for the `eks-core-services` module. Refer to the migration guide below for more info.


</div>


### [v0.7.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.7.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/10/2020 | Modules affected: mgmt, base, data-stores, landingzone | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.7.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Update the default version of `helm` and `packer` that is installed in jenkins (`v3.4.0` for helm and `v1.6.5` for packer).
- Update `module-security` version: `v0.40.1` =&gt; `v0.41.1` (Release notes: [v0.40.2](https://github.com/gruntwork-io/module-security/releases/tag/v0.40.2) ; [v0.41.0](https://github.com/gruntwork-io/module-security/releases/tag/v0.41.0) ; [v0.41.1](https://github.com/gruntwork-io/module-security/releases/tag/v0.41.1)). NOTE: This includes a backwards incompatible change for the account-baseline modules. Refer to the migration guide below for more info.



</div>


### [v0.6.2](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.6.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/10/2020 | Modules affected: base, data-stores, mgmt, networking | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.6.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- You can now configure `ecs-service` to deploy the service on Fargate, using either `launch_type` or `capacity_provider_strategy`.
- The default version of `terragrunt` installed in jenkins is upgraded: `v0.25.5` =&gt; `v0.26.2`
- `terraform-aws-monitoring` was upgraded: `v0.23.1` =&gt; `v0.23.3` ([v0.23.2 release notes](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.23.2) ; [v0.23.3 release notes](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.23.3))
- `module-ci` was upgraded: `v0.29.0` =&gt; `v0.29.1` ([release notes](https://github.com/gruntwork-io/module-ci/releases/tag/v0.29.1))
- `module-server` was upgraded: `v0.9.1` =&gt; `v0.9.3` ([v0.9.2 release notes](https://github.com/gruntwork-io/module-server/releases/tag/v0.9.2) ; [v0.9.3 release notes](https://github.com/gruntwork-io/module-server/releases/tag/v0.9.3))


</div>


### [v0.6.1](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.6.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/9/2020 | Modules affected: base, data-stores, landingzone, mgmt | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.6.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- `module-security` has been updated: `v0.40.0` =&gt; `v0.40.1` ([release notes](https://github.com/gruntwork-io/module-security/releases/tag/v0.40.1))
- `module-data-storage` has been updated: `v0.16.2` =&gt; `v0.16.3` ([release notes](https://github.com/gruntwork-io/module-data-storage/releases/tag/v0.16.3))
- The pyenv `.python-version` file was removed from this repo. This was causing problems when invoking modules that used python, as it ended up in the directory tree of the module call.
- Exposes the `iam_database_authentication_enabled` input variable for `aurora` and `rds` modules.



</div>


### [v0.6.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.6.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/4/2020 | Modules affected: services/k8s-service, data-stores/s3-bucket, data-stores/elasticsearch, mgmt/jenkins | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.6.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- `create_route53_entry` has been removed from `k8s-service`. The variable is now computed based on `domain_name`. *This is a backwards incompatible change: to update, remove the `create_route53_entry` input var from your module call*.
- Add a new service module for configuring a private S3 bucket.
- Expose the cluster domain name as a module output for the AWS managed Elasticsearch cluster.
- Bump the default version for the `kubergrunt` binary to `v0.6.4`.
- Various bug fixes to the examples in this repo.




</div>



## terraform-aws-static-assets


### [v0.7.1](https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.7.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/17/2020 | Modules affected: s3-cloudfront | <a href="https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.7.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- You can now get the ARN of the CloudFront distribution using the new `cloudfront_distribution_arn` output variable.



</div>



## terraform-aws-vpc


### [v0.11.0](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.11.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/23/2020 | Modules affected: vpc-dns-forwarder | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.11.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

This release updates the default names set for the VPC DNS resolvers. The names are now `DESTINATION_VPC_NAME-from-ORIGIN_VPC_NAME-in` for the inbound resolver and `ORIGIN_VPC_NAME-to-DESTINATION_VPC_NAME-out` for the outbound resolver. You can override these names using the `destination_vpc_resolver_name` and `origin_vpc_resolver_name` input variables.


</div>

<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "releases",
  "hash": "14ae50ac8dd4721e06b2a18569c4e014"
}
##DOCS-SOURCER-END -->

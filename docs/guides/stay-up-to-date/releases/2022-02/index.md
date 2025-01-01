
# Gruntwork release 2022-02

<p style={{marginTop: "-25px"}}><small><a href="/guides">Guides</a> / <a href="/guides/stay-up-to-date">Update Guides</a> / <a href="/guides/stay-up-to-date/releases">Releases</a> / 2022-02</small></p>

This page is lists all the updates to the [Gruntwork Infrastructure as Code
Library](https://gruntwork.io/infrastructure-as-code-library/) that were released in 2022-02. For instructions
on how to use these updates in your code, check out the [updating
documentation](/library/stay-up-to-date/updating).

Here are the repos that were updated:

- [boilerplate](#boilerplate)
- [repo-copier](#repo-copier)
- [terraform-aws-architecture-catalog](#terraform-aws-architecture-catalog)
- [terraform-aws-asg](#terraform-aws-asg)
- [terraform-aws-cache](#terraform-aws-cache)
- [terraform-aws-ci](#terraform-aws-ci)
- [terraform-aws-cis-service-catalog](#terraform-aws-cis-service-catalog)
- [terraform-aws-data-storage](#terraform-aws-data-storage)
- [terraform-aws-ecs](#terraform-aws-ecs)
- [terraform-aws-eks](#terraform-aws-eks)
- [terraform-aws-lambda](#terraform-aws-lambda)
- [terraform-aws-load-balancer](#terraform-aws-load-balancer)
- [terraform-aws-messaging](#terraform-aws-messaging)
- [terraform-aws-monitoring](#terraform-aws-monitoring)
- [terraform-aws-openvpn](#terraform-aws-openvpn)
- [terraform-aws-security](#terraform-aws-security)
- [terraform-aws-server](#terraform-aws-server)
- [terraform-aws-service-catalog](#terraform-aws-service-catalog)
- [terraform-aws-static-assets](#terraform-aws-static-assets)
- [terraform-aws-utilities](#terraform-aws-utilities)
- [terraform-aws-vpc](#terraform-aws-vpc)


## boilerplate


### [v0.4.0](https://github.com/gruntwork-io/boilerplate/releases/tag/v0.4.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/25/2022 | <a href="https://github.com/gruntwork-io/boilerplate/releases/tag/v0.4.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/boilerplate/pull/87: Updated `templateFolder` and `outputFolder` helper functions to return absolute paths instead of relative. This makes the resulting path behave as expected when they are set from relative paths in the CLI (e.g., `boilerplate --template-url ./template/foo --output-folder ./out`).


For almost all use cases of these functions, this should be functionally equivalent to the previous version. However, if you are reliant on the path being relative (e.g., if you are outputting the function output directly in a template), this change in behavior could break your existing templates as the absolute path will now be output.

</div>



## repo-copier


### [v0.0.25](https://github.com/gruntwork-io/repo-copier/releases/tag/v0.0.25)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/23/2022 | <a href="https://github.com/gruntwork-io/repo-copier/releases/tag/v0.0.25">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/repo-copier/pull/114: Support publishing `darwin/arm64` and `linux/arm64` binaries.

</div>



## terraform-aws-architecture-catalog


### [v0.0.27](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v0.0.27)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/21/2022 | <a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v0.0.27">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  **Terraform 1.1 upgrade**: We have verified that this repo is compatible with Terraform `1.1.x`! 
  - From this release onward, we will only be running tests with Terraform `1.1.x` against this repo, so we recommend updating to `1.1.x` soon! 
  - We have also updated the minimum required version of Terraform to `1.0.0`. While our repos might continue to be compatible with pre-1.0.0 version of Terraform, we are no longer making any guarantees of that.
  - Once all Gruntwork repos have been upgraded to work with `1.1.x`, we will publish a migration guide with a version compatibility table and announce it all via the Gruntwork Newsletter.

https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/574

</div>



## terraform-aws-asg


### [v0.17.1](https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.17.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/17/2022 | Modules affected: asg-instance-refresh, asg-rolling-deploy, server-group | <a href="https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.17.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Restricted provider version to &lt; 4.0 due to breaking changes in new provider



</div>


### [v0.17.0](https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.17.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/16/2022 | Modules affected: asg-instance-refresh, asg-rolling-deploy, server-group | <a href="https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.17.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
-  **Terraform 1.1 upgrade**: We have verified that this repo is compatible with Terraform `1.1.x`! 
    - From this release onward, we will only be running tests with Terraform `1.1.x` against this repo, so we recommend updating to `1.1.x` soon! 
    - We have also updated the minimum required version of Terraform to `1.0.0`. While our repos might continue to be compatible with pre-1.0.0 version of Terraform, we are no longer making any guarantees of that.
    - Once all Gruntwork repos have been upgraded to work with `1.1.x`, we will publish a migration guide with a version compatibility table and announce it all via the Gruntwork Newsletter.

-  This release also includes the following changes:
    - Rename vars.tf to more canonical variables.tf
    - Convert inline to managed policies.



</div>



## terraform-aws-cache


### [v0.17.0](https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v0.17.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/21/2022 | Modules affected: memcached, redis | <a href="https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v0.17.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

**Terraform 1.1 upgrade**: We have verified that this repo is compatible with Terraform `1.1.x`! 
  - From this release onward, we will only be running tests with Terraform `1.1.x` against this repo, so we recommend updating to `1.1.x` soon! 
  - We have also updated the minimum required version of Terraform to `1.0.0`. While our repos might continue to be compatible with pre-1.0.0 version of Terraform, we are no longer making any guarantees of that.
  - Once all Gruntwork repos have been upgraded to work with `1.1.x`, we will publish a migration guide with a version compatibility table and announce it all via the Gruntwork Newsletter.


</div>


### [v0.16.2](https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v0.16.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/17/2022 | Modules affected: memcached, redis | <a href="https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v0.16.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Housekeeping: Updated CODEOWNERS, Added GitHub PR &amp; Issue Templates, and whitespace changes.
- Restricted provider version to &lt; 4.0 due to breaking changes in new provider





</div>



## terraform-aws-ci


### [v0.45.1](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.45.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/24/2022 | Modules affected: ecs-deploy-runner | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.45.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Exposed the ability to configure IAM permissions boundary for the invoker lambda IAM role.



</div>


### [v0.45.0](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.45.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/22/2022 | Modules affected: ecs-deploy-runner | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.45.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Updated to use `name_prefix` instead of `name` for outbound security group of ECS Deploy Runner to support deploying multiple instances of `ecs-deploy-runner` in a single VPC.

</div>


### [v0.44.0](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.44.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/21/2022 | Modules affected: ec2-backup, ecs-deploy-runner-invoke-iam-policy, ecs-deploy-runner-standard-configuration, ecs-deploy-runner | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.44.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  **Terraform 1.1 upgrade**: We have verified that this repo is compatible with Terraform `1.1.x`! 
  - From this release onward, we will only be running tests with Terraform `1.1.x` against this repo, so we recommend updating to `1.1.x` soon! 
  - We have also updated the minimum required version of Terraform to `1.0.0`. While our repos might continue to be compatible with pre-1.0.0 version of Terraform, we are no longer making any guarantees of that.
  - Once all Gruntwork repos have been upgraded to work with `1.1.x`, we will publish a migration guide with a version compatibility table and announce it all via the Gruntwork Newsletter.




</div>


### [v0.43.1](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.43.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/17/2022 | Modules affected: ec2-backup, ecs-deploy-runner-invoke-iam-policy, ecs-deploy-runner-standard-configuration, ecs-deploy-runner | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.43.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Restricted provider version to &lt; 4.0 due to breaking changes in new provider





</div>


### [v0.43.0](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.43.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/11/2022 | Modules affected: ecs-deploy-runner | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.43.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Updated Lambda module version and exposed CloudWatch Log Group settings



</div>


### [v0.42.0](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.42.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/10/2022 | Modules affected: ecs-deploy-runner, ec2-backup, jenkins-server, infrastructure-deploy-script | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.42.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Improved error message for destroy ref not based on default branch in the `infrastructure-deploy-script`
- Updated to use managed IAM policies instead of inline policies for all IAM roles. Managed IAM policies are more friendly for compliance checkers and is generally recommended by AWS as best practice.
- Updated the `deploy-runner` docker container to use a non-root user to follow security best practices.


</div>



## terraform-aws-cis-service-catalog


### [v0.32.4](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.32.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/28/2022 | Modules affected: landingzone/account-baseline-root | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.32.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Flow through `reserved_concurrent_executions` in `account-baseline-root` for the `cleanup-expired-certs` module.





</div>


### [v0.32.3](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.32.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/25/2022 | Modules affected: landingzone/account-baseline-security | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.32.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Flow through `reserved_concurrent_executions` in `account-baseline-security` for the `cleanup-expired-certs` module.





</div>


### [v0.32.2](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.32.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/25/2022 | Modules affected: landingzone | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.32.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Flow the `reserved_concurrent_executions` var through  `account-baseline-app`.





</div>


### [v0.32.1](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.32.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/25/2022 | Modules affected: security/cleanup-expired-certs | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.32.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Exposed the ability to configure `reserved_concurrent_executions` on the `cleanup-expired-certs` lambda function.





</div>


### [v0.32.0](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.32.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/23/2022 | Modules affected: landingzone/account-baseline-app, landingzone/account-baseline-root, landingzone/account-baseline-security, observability/aws-config-multi-region | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.32.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Updated dependency `terraform-aws-service-catalog` to `v0.78.1`
- Exposed AWS Config encryption parameters.



</div>


### [v0.31.1](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.31.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/22/2022 | Modules affected: security/iam-password-policy | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.31.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
Introduce `iam_password_policy_hard_expiry` input variable to control password policy hard expiry, as the previously hard-coded `true` is too strict for most use cases. Hard expiry requires an administrator to reset the password, which greatly degrades the UX of IAM users accessing the AWS console. This also increases the risk of account lock out (e.g., if you have no administrators in the account).

Default value is still `true`.


</div>


### [v0.31.0](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.31.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/21/2022 | Modules affected: landingzone, networking, observability, security | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.31.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

**Terraform 1.1 upgrade**: We have verified that this repo is compatible with Terraform `1.1.x`! 
  - From this release onward, we will only be running tests with Terraform `1.1.x` against this repo, so we recommend updating to `1.1.x` soon! 
  - We have also updated the minimum required version of Terraform to `1.0.0`. While our repos might continue to be compatible with pre-1.0.0 version of Terraform, we are no longer making any guarantees of that.
  - Once all Gruntwork repos have been upgraded to work with `1.1.x`, we will publish a migration guide with a version compatibility table and announce it all via the Gruntwork Newsletter.



</div>


### [v0.30.4](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.30.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/21/2022 | Modules affected: landingzone, observability | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.30.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Allow configuration of CloudTrail CloudWatch log group retention period. Default to 14 days instead of the previous 0 days.



</div>


### [v0.30.3](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.30.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/17/2022 | Modules affected: landingzone, networking, observability, security | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.30.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Restricted provider version to &lt; 4.0 due to breaking changes in new provider




</div>


### [v0.30.2](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.30.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/8/2022 | Modules affected: networking/vpc-app-network-acls | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.30.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Add support for custom outbound NACLs from private app networks



</div>


### [v0.30.1](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.30.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/4/2022 | Modules affected: landingzone/account-baseline-root, observability/cloudtrail | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.30.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Updated to expose the organization trail configuration parameters for CloudTrail in `account-baseline-root`.



</div>


### [v0.30.0](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.30.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/3/2022 | Modules affected: security/cleanup-expired-certs | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.30.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Updated `cleanup-expired-certs` module to use managed IAM policies instead of inline policies for all IAM roles. Managed IAM policies are more friendly for compliance checkers and is generally recommended by AWS as best practice.
- Updated `cleanup-expired-certs` module to manage CloudWatch Log Group for the lambda function in Terraform. This enables you to configure various settings, like KMS encryption keys for encrypted log events, and retention periods.



</div>



## terraform-aws-data-storage


### [v0.23.1](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.23.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/22/2022 | Modules affected: efs | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.23.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Added option to enable open access via mount targets to EFS volumes.



</div>


### [v0.23.0](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.23.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/21/2022 | Modules affected: aurora, backup-plan, backup-vault, efs | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.23.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
**Terraform 1.1 upgrade**: We have verified that this repo is compatible with Terraform `1.1.x`! 
  - From this release onward, we will only be running tests with Terraform `1.1.x` against this repo, so we recommend updating to `1.1.x` soon! 
  - We have also updated the minimum required version of Terraform to `1.0.0`. While our repos might continue to be compatible with pre-1.0.0 version of Terraform, we are no longer making any guarantees of that.
  - Once all Gruntwork repos have been upgraded to work with `1.1.x`, we will publish a migration guide with a version compatibility table and announce it all via the Gruntwork Newsletter.



</div>


### [v0.22.6](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.22.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/17/2022 | Modules affected: aurora, backup-plan, backup-vault, efs | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.22.6">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Updated provider versioning to restrict to `&lt; 4.0`. AWS Provider 4.x series introduced a number of backward incompatible changes and these modules haven&apos;t been updated to work with them yet.
- Exposed the ability to configure copy-on-write cloning for Aurora DB cluster.



</div>



## terraform-aws-ecs


### [v0.32.0](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.32.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/21/2022 | Modules affected: ecs-cluster, ecs-daemon-service, ecs-service | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.32.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
**Terraform 1.1 upgrade**: We have verified that this repo is compatible with Terraform `1.1.x`! 
  - From this release onward, we will only be running tests with Terraform `1.1.x` against this repo, so we recommend updating to `1.1.x` soon! 
  - We have also updated the minimum required version of Terraform to `1.0.0`. While our repos might continue to be compatible with pre-1.0.0 version of Terraform, we are no longer making any guarantees of that.
  - Once all Gruntwork repos have been upgraded to work with `1.1.x`, we will publish a migration guide with a version compatibility table and announce it all via the Gruntwork Newsletter.





</div>


### [v0.31.10](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.31.10)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/17/2022 | Modules affected: ecs-cluster, ecs-daemon-service, ecs-service | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.31.10">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Tweak CircleCI config to make more consistent with rest of repos
- Restricted provider version to &lt; 4.0 due to breaking changes in new provider




</div>


### [v0.31.9](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.31.9)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/5/2022 | Modules affected: ecs-cluster, ecs-daemon-service, ecs-service | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.31.9">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

-  Rename vars.tf to more canonical variables.tf
-  Fixed bug when the autoscale policy was deleted when changing the capacity provider



</div>



## terraform-aws-eks


### [v0.49.1](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.49.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/23/2022 | Modules affected: eks-cluster-workers | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.49.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fixed bug in `eks-cluster-workers` module where IAM role conditional can sometimes lead to terraform error.




</div>


### [v0.49.0](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.49.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/21/2022 | Modules affected: eks-cluster-control-plane, eks-cluster-workers, eks-container-logs, eks-fargate-container-logs | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.49.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

-  **Terraform 1.1 upgrade**: We have verified that this repo is compatible with Terraform `1.1.x`! 
    - From this release onward, we will only be running tests with Terraform `1.1.x` against this repo, so we recommend updating to `1.1.x` soon! 
    - We have also updated the minimum required version of Terraform to `1.0.0`. While our repos might continue to be compatible with pre-1.0.0 version of Terraform, we are no longer making any guarantees of that.
    - Once all Gruntwork repos have been upgraded to work with `1.1.x`, we will publish a migration guide with a version compatibility table and announce it all via the Gruntwork Newsletter.

-  This release also includes the following changes:
    - Convert to use managed IAM policies. Note that this is a backward incompatible change: a naive update to this version will cause the IAM policies to shuffle, which will result in a temporary downtime of IAM permissions. If you wish to avoid this, you can set the new `var.use_managed_iam_policies` to `false`.
    - Stabilize tests by accounting for tee errors
    - Add missing steps in the blue green deployment instructions


</div>


### [v0.48.1](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.48.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/17/2022 | Modules affected: eks-alb-ingress-controller-iam-policy, eks-alb-ingress-controller, eks-aws-auth-merger, eks-cloudwatch-agent | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.48.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Tweaked CircleCI config to make more consistent with other repos
- Restricted provider version to &lt; 4.0 due to breaking changes in new provider



</div>


### [v0.48.0](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.48.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/3/2022 | Modules affected: eks-cluster-control-plane | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.48.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Added the ability to manage the control plane logging CloudWatch Log Group. Now you can configure encryption and retention settings on the Log Group that is used for storing control plane logs.



</div>


### [v0.47.3](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.47.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/1/2022 | Modules affected: eks-cloudwatch-agent, eks-container-logs | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.47.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Added the ability to configure the container image repository used to source the container insights images





</div>



## terraform-aws-lambda


### [v0.18.0](https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.18.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/25/2022 | Modules affected: lambda-edge | <a href="https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.18.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fixed the CloudWatch log group name for `lambda@edge` to sync with what is created by `lambda@edge`. Previously the CloudWatch Log Group name was incorrect, causing `lambda@edge` to create a new, separate log group instead of the one configured for it in the module.


</div>


### [v0.17.2](https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.17.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/25/2022 | Modules affected: lambda-edge, lambda | <a href="https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.17.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Add support to disable source code updates beyond initial creation 



</div>


### [v0.17.1](https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.17.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/17/2022 | Modules affected: api-gateway-account-settings, api-gateway-proxy, keep-warm, lambda-edge | <a href="https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.17.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Restricted provider version to &lt; 4.0 due to breaking changes in new provider



</div>


### [v0.17.0](https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.17.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/16/2022 | Modules affected: api-gateway-account-settings, keep-warm, lambda-edge, lambda | <a href="https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.17.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  


-  **Terraform 1.1 upgrade**: We have verified that this repo is compatible with Terraform `1.1.x`! 
    - From this release onward, we will only be running tests with Terraform `1.1.x` against this repo, so we recommend updating to `1.1.x` soon! 
    - We have also updated the minimum required version of Terraform to `1.0.0`. While our repos might continue to be compatible with pre-1.0.0 version of Terraform, we are no longer making any guarantees of that.
    - Once all Gruntwork repos have been upgraded to work with `1.1.x`, we will publish a migration guide with a version compatibility table and announce it all via the Gruntwork Newsletter.

-  This release also includes the following changes:
    - Rename `vars.tf` to more canonical `variables.tf`
    - Improve description for `use_managed_iam_policies` variable



</div>



## terraform-aws-load-balancer


### [v0.28.0](https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.28.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/21/2022 | Modules affected: acm-tls-certificate, alb, lb-listener-rules | <a href="https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.28.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  **Terraform 1.1 upgrade**: We have verified that this repo is compatible with Terraform `1.1.x`! 
  - From this release onward, we will only be running tests with Terraform `1.1.x` against this repo, so we recommend updating to `1.1.x` soon! 
  - We have also updated the minimum required version of Terraform to `1.0.0`. While our repos might continue to be compatible with pre-1.0.0 version of Terraform, we are no longer making any guarantees of that.
  - Once all Gruntwork repos have been upgraded to work with `1.1.x`, we will publish a migration guide with a version compatibility table and announce it all via the Gruntwork Newsletter.



</div>


### [v0.27.4](https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.27.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/17/2022 | Modules affected: acm-tls-certificate, alb, lb-listener-rules | <a href="https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.27.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Restricted provider version to &lt; 4.0 due to breaking changes in new provider




</div>


### [v0.27.3](https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.27.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/3/2022 | Modules affected: acm-tls-certificate | <a href="https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.27.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fixed a regression bug introduced with v0.27.2 where domain lookup by name should only be done if domain is not in lookup table




</div>


### [v0.27.2](https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.27.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/3/2022 | Modules affected: acm-tls-certificate | <a href="https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.27.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fixed bug where hosted zone data source look ups causes the domains to be recreated on minor updates to the route 53 hosted zone. You can now work around this problem by using the new `domain_hosted_zone_ids` input map. Refer to the PR description in https://github.com/gruntwork-io/terraform-aws-load-balancer/pull/133 for more information on this.





</div>



## terraform-aws-messaging


### [v0.8.1](https://github.com/gruntwork-io/terraform-aws-messaging/releases/tag/v0.8.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/23/2022 | Modules affected: sqs-lambda-connection | <a href="https://github.com/gruntwork-io/terraform-aws-messaging/releases/tag/v0.8.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Added a new module to use SQS as a trigger for Lambda. Please refer to the [examples](https://github.com/gruntwork-io/terraform-aws-messaging/tree/master/examples/sqs-lambda-connection) folder to check how to use it.



</div>


### [v0.8.0](https://github.com/gruntwork-io/terraform-aws-messaging/releases/tag/v0.8.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/21/2022 | Modules affected: sns, kinesis, sns-sqs-connection, sqs | <a href="https://github.com/gruntwork-io/terraform-aws-messaging/releases/tag/v0.8.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
**Terraform 1.1 upgrade**: We have verified that this repo is compatible with Terraform `1.1.x`! 
  - From this release onward, we will only be running tests with Terraform `1.1.x` against this repo, so we recommend updating to `1.1.x` soon! 
  - We have also updated the minimum required version of Terraform to `1.0.0`. While our repos might continue to be compatible with pre-1.0.0 version of Terraform, we are no longer making any guarantees of that.
  - Once all Gruntwork repos have been upgraded to work with `1.1.x`, we will publish a migration guide with a version compatibility table and announce it all via the Gruntwork Newsletter.


</div>


### [v0.7.4](https://github.com/gruntwork-io/terraform-aws-messaging/releases/tag/v0.7.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/17/2022 | Modules affected: kinesis, sns, sqs, sns-sqs-connection | <a href="https://github.com/gruntwork-io/terraform-aws-messaging/releases/tag/v0.7.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Renamed vars.tf to more canonical variables.tf
- Small fixes in preparation for Terraform 1.1 upgrade
- Renamed sns-sqs-connection vars.tf to more canonical variables.tf
- Restricted provider version to &lt; 4.0 due to breaking changes in new provider



</div>


### [v0.7.3](https://github.com/gruntwork-io/terraform-aws-messaging/releases/tag/v0.7.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/9/2022 | Modules affected: sns-sqs-connection | <a href="https://github.com/gruntwork-io/terraform-aws-messaging/releases/tag/v0.7.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Add module for connecting SNS to SQS. This is a new module and we can create a connection among a SNS topic and a SQS queue. More information can be found in [the module documentation](https://github.com/gruntwork-io/terraform-aws-messaging/tree/master/modules/sns-sqs-connection).



</div>



## terraform-aws-monitoring


### [v0.31.0](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.31.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/20/2022 | Modules affected: alarms, logs, metrics | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.31.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
**Terraform 1.1 upgrade**: We have verified that this repo is compatible with Terraform `1.1.x`! 
  - From this release onward, we will only be running tests with Terraform `1.1.x` against this repo, so we recommend updating to `1.1.x` soon! 
  - We have also updated the minimum required version of Terraform to `1.0.0`. While our repos might continue to be compatible with pre-1.0.0 version of Terraform, we are no longer making any guarantees of that.
  - Once all Gruntwork repos have been upgraded to work with `1.1.x`, we will publish a migration guide with a version compatibility table and announce it all via the Gruntwork Newsletter.



</div>


### [v0.30.9](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.30.9)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/17/2022 | Modules affected: alarms, logs, metrics | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.30.9">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Remove space at the end of line in CircleCI config
- Restricted provider version to &lt; 4.0 due to breaking changes in new provider




</div>


### [v0.30.8](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.30.8)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/10/2022 | Modules affected: agents | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.30.8">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Install CloudWatch Script: Fixed architecture logic error to only log error if architecture is unexpected. 


</div>


### [v0.30.7](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.30.7)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/9/2022 | Modules affected: alarms, agents | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.30.7">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Rename vars.tf to more canonical variables.tf
- Install CloudWatch Script: Whether you&apos;re using amd64 or am64, the cloudwatch agent download script will download the architecture-specific agent.



</div>


### [v0.30.6](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.30.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/3/2022 | Modules affected: logs/load-balancer-access-logs | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.30.6">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Updated to expose object locking settings for load balancer access logs bucket and S3 server access logging bucket.



</div>



## terraform-aws-openvpn


### [v0.22.0](https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.22.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/23/2022 | Modules affected: openvpn-server | <a href="https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.22.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Enable ebs optimization by default . This release introduces a new `ebs_optimized` variable that defaults to `true`. 

Note that, for the vast majority of instance types, there is no additional charge for enabling EBS optimization, however for certain previous generation instances there will be an additional cost to have EBS optimization enabled. See the [EC2 pricing page](https://aws.amazon.com/ec2/pricing/on-demand/#EBS-Optimized_Instances) and the [previous generation pricing page](https://aws.amazon.com/ec2/previous-generation/) for more details. 

Note that this is a **backward incompatible change:** a naive update to this version will cause the EC2 instances to shuffle, which will result in temporary downtime of your VPN service. If you wish to avoid this, you can set the new `var.ebs_optimized` to `false`. 






</div>


### [v0.21.0](https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.21.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/21/2022 | Modules affected: openvpn-server | <a href="https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.21.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  **Terraform 1.1 upgrade**: We have verified that this repo is compatible with Terraform `1.1.x`! 
  - From this release onward, we will only be running tests with Terraform `1.1.x` against this repo, so we recommend updating to `1.1.x` soon! 
  - We have also updated the minimum required version of Terraform to `1.0.0`. While our repos might continue to be compatible with pre-1.0.0 version of Terraform, we are no longer making any guarantees of that.
  - Once all Gruntwork repos have been upgraded to work with `1.1.x`, we will publish a migration guide with a version compatibility table and announce it all via the Gruntwork Newsletter.




</div>


### [v0.20.0](https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.20.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/17/2022 | Modules affected: openvpn-server | <a href="https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.20.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Restricted provider version to &lt; 4.0 due to breaking changes in new provider
- Cost savings: Make sure KMS keys created are deleted within 7 days, not the default 30 days!
- [**BACKWARD INCOMPATIBLE**] Updated to use managed IAM policies instead of inline policies for all IAM roles. Managed IAM policies are more friendly for compliance checkers and is generally recommended by AWS as best practice.

Note that this is **a backward incompatible change**: a naive update to this version will cause the IAM policies to shuffle, which will result in a temporary downtime of IAM permissions. If you wish to avoid this, you can set the new `var.use_managed_iam_policies` to `false`.



</div>



## terraform-aws-security


### [v0.62.2](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.62.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/25/2022 | Modules affected: cloudtrail-bucket, cloudtrail | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.62.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Exposed the ability to extend the CloudTrail S3 bucket policy with additional statements using the new `additional_bucket_policy_statements` input variable.




</div>


### [v0.62.1](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.62.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/22/2022 | Modules affected: aws-config-multi-region, aws-config | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.62.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Rearranged encryption settings for SNS and S3 in `aws-config` to support independently configuring each. You can now configure the KMS key used for the s3 bucket using `var.s3_bucket_kms_key_arn` and the SNS topic using `var.sns_topic_kms_key_arn`. For `aws-config-multi-region`, the latter is configured using `var.sns_topic_kms_key_region_map`, as the KMS key needs to reside in the same region as the SNS topic.





</div>


### [v0.62.0](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.62.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/21/2022 | Modules affected: aws-config-bucket, aws-config-multi-region, aws-config-rules, aws-config | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.62.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  **Terraform 1.1 upgrade**: We have verified that this repo is compatible with Terraform `1.1.x`! 
  - From this release onward, we will only be running tests with Terraform `1.1.x` against this repo, so we recommend updating to `1.1.x` soon! 
  - We have also updated the minimum required version of Terraform to `1.0.0`. While our repos might continue to be compatible with pre-1.0.0 version of Terraform, we are no longer making any guarantees of that.
  - Once all Gruntwork repos have been upgraded to work with `1.1.x`, we will publish a migration guide with a version compatibility table and announce it all via the Gruntwork Newsletter.



</div>


### [v0.61.1](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.61.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/17/2022 | Modules affected: aws-config-multi-region, aws-config-bucket, aws-config-rules, aws-config | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.61.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Expand the kms_key_arn input variable docs to clarify the relation with SNS topics
- Restricted provider version to &lt; 4.0 due to breaking changes in new provider






</div>


### [v0.61.0](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.61.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/8/2022 | Modules affected: aws-config-multi-region | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.61.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Updated `aws-config-multi-region` module to use explicit default provider pattern.



</div>


### [v0.60.3](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.60.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/8/2022 | Modules affected: custom-iam-entity, cross-account-iam-roles | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.60.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Added optional permission boundaries var for custom entity IAM Role
- Fixed bug where iam role policy was dropped for auto deploy cross account IAM role when only github actions access was configured.



</div>


### [v0.60.2](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.60.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/7/2022 | Modules affected: cross-account-iam-roles | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.60.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fixed bug where the auto deploy IAM role was not created when only the github actions access was configured. Now you can configure the auto deploy IAM role with only setting the github actions input variable.





</div>


### [v0.60.1](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.60.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/7/2022 | Modules affected: private-s3-bucket | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.60.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Updated `private-s3-bucket` module to expose a way to create and manage a replication IAM role for replicating an existing S3 bucket to the new bucket.





</div>



## terraform-aws-server


### [v0.14.1](https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.14.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/21/2022 | Modules affected: single-server | <a href="https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.14.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fixes `invalid index` error that happens occasionally on `terraform destroy` due to missing resource.



</div>


### [v0.14.0](https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.14.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/20/2022 | Modules affected: ec2-backup, single-server | <a href="https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.14.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

**Terraform 1.1 upgrade**: We have verified that this repo is compatible with Terraform `1.1.x`! 
  - From this release onward, we will only be running tests with Terraform `1.1.x` against this repo, so we recommend updating to `1.1.x` soon! 
  - We have also updated the minimum required version of Terraform to `1.0.0`. While our repos might continue to be compatible with pre-1.0.0 version of Terraform, we are no longer making any guarantees of that.
  - Once all Gruntwork repos have been upgraded to work with `1.1.x`, we will publish a migration guide with a version compatibility table and announce it all via the Gruntwork Newsletter.



</div>


### [v0.13.10](https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.13.10)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/17/2022 | Modules affected: single-server, ec2-backup | <a href="https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.13.10">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Updated tests README
- Renamed vars.tf to more canonical variables.tf
- Added test stages to route53 helpers test
- Restricted provider version to &lt; 4.0 due to breaking changes in new provider



</div>



## terraform-aws-service-catalog


### [v0.80.3](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.80.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/25/2022 | Modules affected: mgmt/bastion-host, mgmt/openvpn-server, mgmt/jenkins, mgmt/ecs-deploy-runner | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.80.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Exposed backward compatibility feature flags for managed IAM policies in all affected modules from `v0.80.0`




</div>


### [v0.80.2](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.80.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/25/2022 | Modules affected: data-stores/redis | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.80.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Exposed the ability to restore a `redis` DB from backup using the new `snapshot_name` or `snapshot_arn` input variable.




</div>


### [v0.80.1](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.80.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/25/2022 | Modules affected: networking/route53, networking/alb, services/asg-service, services/ecs-service | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.80.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Updated dependency `terraform-aws-load-balancer` to `v0.27.3`
- Fixed bug in `route53` module where minor changes to the hosted zone like updating tags inadvertently causes the records for ACM verification to be recreated, causing outages in the ACM certificate. Now minor updates to the hosted zone no longer cause changes to the records.




</div>


### [v0.80.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.80.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/24/2022 | Modules affected: base/ec2-baseline, services/ec2-instance, services/k8s-service, mgmt/bastion-host | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.80.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- Some of our modules have been updated to use managed IAM policies instead of inline policies for all IAM roles. Managed IAM policies are more friendly for compliance checkers and is generally recommended by AWS as best practice.

Note that this is **a backward incompatible change**: a naive update to this version will cause the IAM policies to shuffle, which will result in a temporary downtime of IAM permissions. If you wish to avoid this, you can set the new `var.use_managed_iam_policies` to `false`.

**IMPORTANT**: Not all affected modules had the `var.use_managed_iam_policies` variable exposed in this release. All modules that did not originally expose this backward compatibility feature flag now has it in version [0.80.3](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.80.3).





</div>


### [v0.79.1](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.79.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/24/2022 | Modules affected: services/asg-service, services/ecs-service | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.79.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Exposed optional provider configuration options for route53 health check module.



</div>


### [v0.79.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.79.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/24/2022 | Modules affected: services/eks-cluster, services/eks-workers, services/eks-core-services, mgmt/ecs-deploy-runner | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.79.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Bump dependency `terraform-aws-eks` to `v0.49.1`
- Bump dependency `terraform-aws-ci` to `v0.45.0`. In the process, expose the ability to configure the CloudWatch Log Group for the invoker lambda function in `ecs-deploy-runner`.
- Exposed ability to directly specify max pods allowed per instance group ASG/NodeGroup in `eks-workers` and `eks-cluster` modules.


</div>


### [v0.78.1](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.78.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/22/2022 | Modules affected: landingzone | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.78.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Exposed the ability to configure KMS keys for encrypting the S3 bucket and SNS topic used by AWS Config.




</div>


### [v0.78.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.78.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/22/2022 | Modules affected: landingzone/account-baseline-app, landingzone/account-baseline-security, landingzone/account-baseline-root, base/ec2-baseline | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.78.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Updated dependency `terraform-aws-security` to v0.62.1



</div>


### [v0.77.1](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.77.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/22/2022 | Modules affected: services | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.77.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Added the ability to attach a CloudWatch log filtered subscription to `eks-core-services` for the CloudWatch Log Group used by `fluent-bit`.



</div>


### [v0.77.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.77.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/21/2022 | Modules affected: data-stores, landingzone, mgmt, networking | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.77.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  **Terraform 1.1 upgrade**: We have verified that this repo is compatible with Terraform `1.1.x`! 
  - From this release onward, we will only be running tests with Terraform `1.1.x` against this repo, so we recommend updating to `1.1.x` soon! 
  - We have also updated the minimum required version of Terraform to `1.0.0`. While our repos might continue to be compatible with pre-1.0.0 version of Terraform, we are no longer making any guarantees of that.
  - Once all Gruntwork repos have been upgraded to work with `1.1.x`, we will publish a migration guide with a version compatibility table and announce it all via the Gruntwork Newsletter.

This release also include minor documentation fixes and updates to README files.

</div>


### [v0.76.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.76.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/17/2022 | Modules affected: landingzone/account-baseline-security | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.76.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

Updated password policy hard expiry to default to `false`, as `true` is too strict for most use cases.

Hard expiry requires an administrator to reset the password, which greatly degrades the UX of IAM users accessing the AWS console when combined with the default password expiry period of 30 days. This degraded UX, combined with the risk of account lock out (e.g., if you have no administrators in the account), makes the hard expiry flag a difficult flag to enable for most use cases, and thus we have decided to roll back to defaulting to `false`.



</div>


### [v0.75.4](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.75.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/17/2022 | Modules affected: landingzone | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.75.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Exposed the ability to set a custom Cloudtrail trail name.




</div>


### [v0.75.3](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.75.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/16/2022 | Modules affected: landingzone | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.75.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fixed cross account IAM role bug with github actions auto deploy role where `allow_auto_deploy_access_from_other_accounts` needed to be set to configure `allow_auto_deploy_from_github_actions_for_sources`.




</div>


### [v0.75.2](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.75.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/15/2022 | Modules affected: landingzone | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.75.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Updated `account-baseline-root` to not create ssh grunt IAM groups by default, since the root account is not meant to run any servers in there.
- Fixed bug where ssh grunt related sign in urls were being outputted as IAM role arns for an unrelated cross account IAM role in account-baseline module outputs.



</div>


### [v0.75.1](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.75.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/15/2022 | Modules affected: mgmt, networking, landingzone, services | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.75.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Updated default version of `terraform-aws-openvpn` used in AMI for openvpn server.
- Updated default `k8s-service` helm chart version to latest
- Converted modules readme files into markdown
- Restricted provider version to &lt; 4.0 due to breaking changes in new provider





</div>


### [v0.75.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.75.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/8/2022 | Modules affected: services/eks-cluster, services/eks-workers, services/eks-core-services, services/k8s-service | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.75.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Updated dependency `gruntwork-io/terraform-aws-eks` to v0.48.0
- Exposed new EKS features from underlying module:
    - Configuring the app image container repository and version tag of `aws-for-fluent-bit` and `cloudwatch-agent` in core services.
    - Configuring the CloudWatch Log Group for the control plane. This is a **backward incompatible** change - refer to the migration guide below for more info.



</div>


### [v0.74.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.74.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/7/2022 | Modules affected: services/eks-cluster, services/eks-workers, services/eks-core-services, services/k8s-service | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.74.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Updated `eks-workers` and `eks-clusters` modules to support deploying an EKS cluster with workers in Prefix Delegation network mode of `aws-vpc-cni`. Prefix Delegation mode allows allocating secondary IPs in blocks of 16 addresses, greatly increasing the limit of available IPs for Pods in the EKS workers. **IMPORTANT** Starting this version, EKS clusters managed with `eks-clusters` and `eks-workers` modules default to Prefix Delegation mode - if you wish to avoid this switch, refer to the migration guide for information on how to keep the old model of network management.
- Upgrade dependency `gruntwork-io/terraform-aws-eks` to v0.47.2



</div>


### [v0.73.2](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.73.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/4/2022 | Modules affected: landingzone | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.73.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Updated to allow configuring GitHub Actions assume role access to the auto deploy cross account role in the baseline modules.




</div>


### [v0.73.1](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.73.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/3/2022 | Modules affected: services/eks-cluster, services/eks-core-services, networking/vpc, networking/vpc-mgmt | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.73.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Updated default EKS disallowed availability zones list to include a new AZ for `ca-central-1` that doesn&apos;t support EKS Fargate
- Updated dependency `terraform-aws-vpc` to v0.18.12
- Exposed the following new functionality in the `vpc` module:
    - Added support for making Internet Gateway creation optional.
    - Added support for configuring routes to Virtual Private Gateways in each of the subnet tiers.
    - Added support for configuring custom outbound NACL rules for the private app subnet tier. 





</div>


### [v0.73.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.73.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/3/2022 | Modules affected: networking/vpc, networking/vpc-mgmt | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.73.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Exposed the ability to configure kms key `deletion_window_in_days` for VPC flow logs.
- Exposed the ability to configure ICMP access through the NACLs.



</div>


### [v0.72.1](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.72.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/3/2022 | Modules affected: networking/vpc | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.72.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fixed a bug where setting up the VPC peering connection in the `vpc` module can lead to to count errors on certain inputs.




</div>



## terraform-aws-static-assets


### [v0.13.0](https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.13.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/20/2022 | Modules affected: s3-cloudfront, s3-static-website | <a href="https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.13.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

**Terraform 1.1 upgrade**: We have verified that this repo is compatible with Terraform `1.1.x`! 
  - From this release onward, we will only be running tests with Terraform `1.1.x` against this repo, so we recommend updating to `1.1.x` soon! 
  - We have also updated the minimum required version of Terraform to `1.0.0`. While our repos might continue to be compatible with pre-1.0.0 version of Terraform, we are no longer making any guarantees of that.
  - Once all Gruntwork repos have been upgraded to work with `1.1.x`, we will publish a migration guide with a version compatibility table and announce it all via the Gruntwork Newsletter.



</div>


### [v0.12.3](https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.12.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/17/2022 | Modules affected: s3-cloudfront, s3-static-website | <a href="https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.12.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Add GitHub PR &amp; Issue Templates
- Add gruntwork-io/maintenance-tier-3-orion to CODEOWNERS
- Restricted provider version to &lt; 4.0 due to breaking changes in new provider




</div>



## terraform-aws-utilities


### [v0.7.0](https://github.com/gruntwork-io/terraform-aws-utilities/releases/tag/v0.7.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/21/2022 | Modules affected: executable-dependency, instance-type, join-path, list-remove | <a href="https://github.com/gruntwork-io/terraform-aws-utilities/releases/tag/v0.7.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  **Terraform 1.1 upgrade**: We have verified that this repo is compatible with Terraform `1.1.x`! 
  - From this release onward, we will only be running tests with Terraform `1.1.x` against this repo, so we recommend updating to `1.1.x` soon! 
  - We have also updated the minimum required version of Terraform to `1.0.0`. While our repos might continue to be compatible with pre-1.0.0 version of Terraform, we are no longer making any guarantees of that.
  - Once all Gruntwork repos have been upgraded to work with `1.1.x`, we will publish a migration guide with a version compatibility table and announce it all via the Gruntwork Newsletter.




</div>


### [v0.6.1](https://github.com/gruntwork-io/terraform-aws-utilities/releases/tag/v0.6.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/17/2022 | <a href="https://github.com/gruntwork-io/terraform-aws-utilities/releases/tag/v0.6.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Modernized circleci implementation to help our tests pass again.
- Restricted provider version to &lt; 4.0 due to breaking changes in new provider



</div>



## terraform-aws-vpc


### [v0.20.1](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.20.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/23/2022 | Modules affected: vpc-flow-logs | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.20.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Add `iam_role_permissions_boundary` variable to the `vpc-flow-logs` module #253



</div>


### [v0.20.0](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.20.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/21/2022 | Modules affected: network-acl-inbound, network-acl-outbound, vpc-app-network-acls, vpc-app | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.20.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  **Terraform 1.1 upgrade**: We have verified that this repo is compatible with Terraform `1.1.x`! 
  - From this release onward, we will only be running tests with Terraform `1.1.x` against this repo, so we recommend updating to `1.1.x` soon! 
  - We have also updated the minimum required version of Terraform to `1.0.0`. While our repos might continue to be compatible with pre-1.0.0 version of Terraform, we are no longer making any guarantees of that.
  - Once all Gruntwork repos have been upgraded to work with `1.1.x`, we will publish a migration guide with a version compatibility table and announce it all via the Gruntwork Newsletter.


</div>


### [v0.19.0](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.19.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/17/2022 | Modules affected: vpc-flow-logs, network-acl-inbound, network-acl-outbound, vpc-app-network-acls | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.19.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Restricted provider version to &lt; 4.0 due to breaking changes in new provider.
- Updated to use managed IAM policies instead of inline policies for all IAM roles. Managed IAM policies are more friendly for compliance checkers and is generally recommended by AWS as best practice.

Note that this is **a backward incompatible change**: a naive update to this version will cause the IAM policies to shuffle, which will result in a temporary downtime of IAM permissions. If you wish to avoid this, you can set the new `var.use_managed_iam_policies` to `false`.


</div>


### [v0.18.12](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.18.12)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/3/2022 | Modules affected: vpc-app-network-acls | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.18.12">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Implemented support for custom outbound NACLs to private app networks



</div>


### [v0.18.11: Updated to expose deletion_window_in_days](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.18.11)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/2/2022 | Modules affected: vpc-flow-logs | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.18.11">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Updated to expose `deletion_window_in_days` for the KMS key that is created to encrypt the VPC flow logs.




</div>


### [v0.18.10](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.18.10)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/1/2022 | Modules affected: vpc-app-network-acls | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.18.10">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

Exposed `icmp_type` and `icmp_code` in `var.private_app_allow_inbound_ports_from_cidr` so that ICMP can be enabled.


</div>


### [v0.18.9](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.18.9)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/1/2022 | Modules affected: vpc-app | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.18.9">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Exposed the ability to specify propagating virtual gateway routes for public route table (via the `public_propagating_vgws` variable).



</div>

<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "releases",
  "hash": "813b41e9d6a3ac18ccf97173ddd115c1"
}
##DOCS-SOURCER-END -->

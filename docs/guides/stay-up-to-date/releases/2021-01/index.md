
# Gruntwork release 2021-01

<p style={{marginTop: "-25px"}}><small><a href="/guides">Guides</a> / <a href="/guides/stay-up-to-date">Update Guides</a> / <a href="/guides/stay-up-to-date/releases">Releases</a> / 2021-01</small></p>

This page is lists all the updates to the [Gruntwork Infrastructure as Code
Library](https://gruntwork.io/infrastructure-as-code-library/) that were released in 2021-01. For instructions
on how to use these updates in your code, check out the [updating
documentation](/library/stay-up-to-date/updating).

Here are the repos that were updated:

- [gruntkms](#gruntkms)
- [repo-copier](#repo-copier)
- [terraform-aws-architecture-catalog](#terraform-aws-architecture-catalog)
- [terraform-aws-asg](#terraform-aws-asg)
- [terraform-aws-cache](#terraform-aws-cache)
- [terraform-aws-ci](#terraform-aws-ci)
- [terraform-aws-cis-service-catalog](#terraform-aws-cis-service-catalog)
- [terraform-aws-data-storage](#terraform-aws-data-storage)
- [terraform-aws-ecs](#terraform-aws-ecs)
- [terraform-aws-eks](#terraform-aws-eks)
- [terraform-aws-messaging](#terraform-aws-messaging)
- [terraform-aws-monitoring](#terraform-aws-monitoring)
- [terraform-aws-openvpn](#terraform-aws-openvpn)
- [terraform-aws-security](#terraform-aws-security)
- [terraform-aws-server](#terraform-aws-server)
- [terraform-aws-service-catalog](#terraform-aws-service-catalog)
- [terraform-aws-utilities](#terraform-aws-utilities)
- [terraform-aws-vpc](#terraform-aws-vpc)


## gruntkms


### [v0.0.9](https://github.com/gruntwork-io/gruntkms/releases/tag/v0.0.9)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/25/2021 | <a href="https://github.com/gruntwork-io/gruntkms/releases/tag/v0.0.9">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/gruntkms/pull/27: Updated the version of the AWS Go SDK used in `gruntkms` to pull in the latest features, such as better support for AWS SSO in AWS CLI v2.

</div>



## repo-copier


### [v0.0.7](https://github.com/gruntwork-io/repo-copier/releases/tag/v0.0.7)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/29/2021 | <a href="https://github.com/gruntwork-io/repo-copier/releases/tag/v0.0.7">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/repo-copier/pull/59: Fix one more bug with updating cross-references.

</div>


### [v0.0.6](https://github.com/gruntwork-io/repo-copier/releases/tag/v0.0.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/29/2021 | <a href="https://github.com/gruntwork-io/repo-copier/releases/tag/v0.0.6">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/repo-copier/pull/57: Add unit tests and fix a URL updating bug.

</div>


### [v0.0.5](https://github.com/gruntwork-io/repo-copier/releases/tag/v0.0.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/27/2021 | <a href="https://github.com/gruntwork-io/repo-copier/releases/tag/v0.0.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/repo-copier/pull/53: Fix bugs in handling single quotes when updating internal cross-references.

https://github.com/gruntwork-io/repo-copier/pull/54: Update the logic to replace all links by default and output a report at the end of links that were replaced, but the underlying repo was not copied.

https://github.com/gruntwork-io/repo-copier/pull/55: We now only build amd64 binaries, as Go no longer supports 386 binaries for all platforms.

</div>


### [v0.0.4](https://github.com/gruntwork-io/repo-copier/releases/tag/v0.0.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/21/2021 | <a href="https://github.com/gruntwork-io/repo-copier/releases/tag/v0.0.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/repo-copier/pull/51: Run all Git operations concurrently to speed things up even more.

</div>


### [v0.0.3](https://github.com/gruntwork-io/repo-copier/releases/tag/v0.0.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/21/2021 | <a href="https://github.com/gruntwork-io/repo-copier/releases/tag/v0.0.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/repo-copier/pull/48: Handle renamed repos; copy all tags by default; small performance tweaks.

</div>


### [v0.0.2](https://github.com/gruntwork-io/repo-copier/releases/tag/v0.0.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/19/2021 | <a href="https://github.com/gruntwork-io/repo-copier/releases/tag/v0.0.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/repo-copier/pull/43: Add `--report` functionality.
https://github.com/gruntwork-io/repo-copier/pull/45: Optimize Go module processing.

</div>


### [v0.0.1](https://github.com/gruntwork-io/repo-copier/releases/tag/v0.0.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/16/2021 | <a href="https://github.com/gruntwork-io/repo-copier/releases/tag/v0.0.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  First release!

</div>



## terraform-aws-architecture-catalog


### [v0.0.2](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v0.0.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/7/2021 | <a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v0.0.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fixes GitLab repo configuration 
- Adds blueprint for RDS




</div>



## terraform-aws-asg


### [v0.11.2](https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.11.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/28/2021 | Modules affected: asg-rolling-deploy, server-group | <a href="https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.11.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- We recently renamed most of our repos to follow the Terraform Registry convention of `terraform-&lt;cloud&gt;-&lt;name&gt;` (e.g., `terraform-aws-vpc`. In this release, we&apos;ve updated all cross-references and links from the old names to the new names. There should be no change in behavior, and GitHub redirects old names to new names anyway, but using the up-to-date names will help reduce confusion.





</div>


### [v0.11.1](https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.11.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/13/2021 | Modules affected: server-group | <a href="https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.11.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Custom tags you pass to the `server-group` module via the `custom_tags` input variable will now be applied to the IAM role too.



</div>



## terraform-aws-cache


### [v0.10.2](https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v0.10.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/29/2021 | Modules affected: None | <a href="https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v0.10.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- We recently renamed most of our repos to follow the Terraform Registry convention of `terraform-&lt;cloud&gt;-&lt;name&gt;` (e.g., `terraform-aws-vpc`. In this release, we&apos;ve updated all cross-references and links from the old names to the new names. There should be no change in behavior, and GitHub redirects old names to new names anyway, but using the up-to-date names will help reduce confusion.






</div>



## terraform-aws-ci


### [v0.29.8](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.29.8)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/27/2021 | Modules affected: ecs-deploy-runner | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.29.8">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fix an interpolation-only expression so we no longer get a deprecation warning from Terraform.



</div>


### [v0.29.7](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.29.7)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/26/2021 | Modules affected: jenkins-server | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.29.7">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

Fix bug in `jenkins-server` where it errors out when `snapshot_id` is not provided.




</div>


### [v0.29.6](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.29.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/4/2021 | Modules affected: ecs-deploy-runner | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.29.6">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

Fixes a bug in the `ecs-deploy-runner` module where the IAM permissions to grant access to the `repository_credentials_secrets_manager_arn` Secrets Manager entry to the ECS task execution role was not being configured.



</div>



## terraform-aws-cis-service-catalog


### [v0.10.0](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.10.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/21/2021 | Modules affected: vpc-app-network-acls, vpc-mgmt-network-acls | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.10.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Refactor the NACL modules to allow specifying different CIDR blocks per subnet tier for allowing remote admin (e.g., SSH/RDP) access. This is important as the IP addresses you see in public subnets will be different than those in private subnets. **This was a backwards incompatible change, so make sure to read the migration guide below.**


</div>


### [v0.9.3](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.9.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/18/2021 | Modules affected: vpc-app-network-acls, vpc-mgmt-network-acls | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.9.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- The two new modules `vpc-app-network-acls` and `vpc-mgmt-network-acls` were made on top of the existing modules from `terraform-aws-vpc`. They ensure that no Network ACLs allow ingress from 0.0.0.0/0 to remote server administration ports, as per the 5.1 requirement of CIS AWS Foundations Benchmark.

We are publishing soon a migration guide from CIS 1.2.0 to 1.3.0!




</div>



## terraform-aws-data-storage


### [v0.17.2](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.17.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/29/2021 | Modules affected: aurora, efs, lambda-create-snapshot, rds | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.17.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- We recently renamed most of our repos to follow the Terraform Registry convention of `terraform-&lt;cloud&gt;-&lt;name&gt;` (e.g., `terraform-aws-vpc`. In this release, we&apos;ve updated all cross-references and links from the old names to the new names. There should be no change in behavior, and GitHub redirects old names to new names anyway, but using the up-to-date names will help reduce confusion.





</div>



## terraform-aws-ecs


### [v0.24.1](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.24.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/29/2021 | Modules affected: ecs-cluster, ecs-daemon-service, ecs-deploy, ecs-fargate | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.24.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- We recently renamed most of our repos to follow the Terraform Registry convention of `terraform-&lt;cloud&gt;-&lt;name&gt;` (e.g., `terraform-aws-vpc`. In this release, we&apos;ve updated all cross-references and links from the old names to the new names. There should be no change in behavior, and GitHub redirects old names to new names anyway, but using the up-to-date names will help reduce confusion.





</div>


### [v0.24.0](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.24.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/27/2021 | Modules affected: ecs-service | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.24.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  


- This release replaces the [legacy custom IAM role for ECS Auto Scaling](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs-legacy-iam-roles.html) (This page now returns a 302 redirect. The original page remains [archived here](https://web.archive.org/web/20200923075721/https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs-legacy-iam-roles.html).) with a [service-linked role](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/using-service-linked-roles.html) that is managed by AWS. 


</div>


### [v0.23.4](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.23.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/19/2021 | Modules affected: ecs-service, ecs-cluster | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.23.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- We added parameters to supply existing IAM roles for the `ecs-service` module. These will be used in place of creating a new role: `existing_ecs_task_role_name` and `existing_ecs_task_execution_role_name`.
- Small documentation corrections.




</div>



## terraform-aws-eks


### [v0.32.2](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.32.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/29/2021 | Modules affected: eks-cluster-control-plane, eks-cluster-managed-workers | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.32.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- You can now turn off the default Fargate IAM Role created by the `eks-cluster-control-plane` module using the `create_default_fargate_iam_role` input variable.
- You can now selectively control which Node Groups use the `instance_types` attribute on the Node Group or on the Launch Template by setting the `instance_types` attribute to `null`.
- You can now hard code the open ID connect provider thumbprint in the `eks-cluster-control-plane` module. This is useful if you are in an airgapped environment that requires HTTP requests to route through a proxy.



</div>


### [v0.32.1](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.32.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/21/2021 | Modules affected: eks-cluster-control-plane, eks-aws-auth-merger | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.32.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- The `aws-auth-merger` app now uses an informer for watching the config maps, making it more robust to connectivity issues and API refresh problems.




</div>


### [v0.32.0](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.32.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/12/2021 | Modules affected: eks-alb-ingress-controller, eks-container-logs, eks-k8s-cluster-autoscaler, eks-k8s-external-dns | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.32.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

The core services modules are now compatible with helm provider 2.x. Note that support for helm provider 1.x is dropped. You will need to update your provider blocks to ensure they pull in the 2.x series of the provider in order to update to this release.


</div>


### [v0.31.3](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.31.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/6/2021 | Modules affected: eks-cluster-control-plane | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.31.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- This release is a minor bugfix to use the latest kubergrunt ([v0.6.9](https://github.com/gruntwork-io/kubergrunt/releases/tag/v0.6.9)) required dependency.




</div>



## terraform-aws-messaging


### [v0.4.2](https://github.com/gruntwork-io/terraform-aws-messaging/releases/tag/v0.4.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/28/2021 | Modules affected: sqs | <a href="https://github.com/gruntwork-io/terraform-aws-messaging/releases/tag/v0.4.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- You can now set custom tags for the dead letter queue using the new `custom_dlq_tags` input variable.



</div>



## terraform-aws-monitoring


### [v0.24.1](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.24.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/29/2021 | Modules affected: alarms, logs, metrics | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.24.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- We recently renamed most of our repos to follow the Terraform Registry convention of `terraform-&lt;cloud&gt;-&lt;name&gt;` (e.g., `terraform-aws-vpc`. In this release, we&apos;ve updated all cross-references and links from the old names to the new names. There should be no change in behavior, and GitHub redirects old names to new names anyway, but using the up-to-date names will help reduce confusion.





</div>



## terraform-aws-openvpn


### [v0.13.1](https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.13.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/29/2021 | Modules affected: init-openvpn, backup-openvpn-pki, install-openvpn, openvpn-admin | <a href="https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.13.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- We have added support for Ubuntu 20.04 in testing and dropped support for Ubuntu 16.04
- We recently renamed most of our repos to follow the Terraform Registry convention of `terraform-&lt;cloud&gt;-&lt;name&gt;` (e.g., `terraform-aws-vpc`. In this release, we&apos;ve updated all cross-references and links from the old names to the new names. There should be no change in behavior, and GitHub redirects old names to new names anyway, but using the up-to-date names will help reduce confusion.







</div>



## terraform-aws-security


### [v0.44.9](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.44.9)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/28/2021 | Modules affected: ssh-grunt | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.44.9">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Warn user and error out if ec2-instance-connect is installed






</div>


### [v0.44.8](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.44.8)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/27/2021 | Modules affected: private-s3-bucket | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.44.8">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  


- Adds a new input to the `private-s3-bucket` module to configure [CORS](https://docs.aws.amazon.com/AmazonS3/latest/dev/cors.html).



</div>


### [v0.44.7](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.44.7)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/19/2021 | Modules affected: auto-update, aws-config-rules, aws-config, aws-organizations | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.44.7">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fixes broken links on the website&apos;s repo browser by using root-relative links for README &amp; LICENSE file references.


</div>



## terraform-aws-server


### [v0.10.1](https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.10.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/29/2021 | Modules affected: attach-eni, ec2-backup, persistent-ebs-volume, route53-helpers | <a href="https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.10.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  







</div>


### [v0.10.0](https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.10.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/8/2021 | Modules affected: attach-eni | <a href="https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.10.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- All the modules now support Ubuntu 20.04. Note that starting this release, support for Ubuntu 16.04 is dropped.
- Fix a bug with CentOS 7.9 that prevented the public IP from being restored when attaching a new ENI to the instance.

NOTE: Starting this release, the `attach-eni` module no longer works with Ubuntu 16.04. Please upgrade to Ubuntu 18.04 or 20.04.



</div>



## terraform-aws-service-catalog


### [v0.17.1](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.17.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/28/2021 | Modules affected: base, data-stores, landingzone, mgmt | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.17.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- We recently renamed most of our repos to follow the Terraform Registry convention of `terraform-&lt;cloud&gt;-&lt;name&gt;` (e.g., `terraform-aws-vpc`. In this release, we&apos;ve updated all cross-references and links from the old names to the new names. There should be no change in behavior, and GitHub redirects old names to new names anyway, but using the up-to-date names will help reduce confusion.






</div>


### [v0.17.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.17.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/27/2021 | Modules affected: data-stores/elasticsearch, mgmt/ecs-deploy-runner, mgmt/jenkins, services/ecs-cluster | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.17.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- You can now configure the update timeout for the `elasticsearch` module using the new `update_timeout` input variable. The default timeout has been increased from 60m to 90m, as we were seeing some intermittent timeouts on creation.
- Bumped the `terraform-aws-ci` version number in the `mgmt` modules. This is mainly to pick up a fix for the `jenkins` module related to the default `snapshot_id` value.
- Removed a `depends_on` clause from the `ecs-cluster` module which was causing recent Terraform versions to exit with an error. This `depends_on` wasn&apos;t necessary in the first place.
- Updated the `eks-core-services` module to the 2.x version of the Helm provider. This is a backwards incompatible change. See the migration guide below.
- Updated the `required_version` constraint on the `k8s-namepsace` to `&gt;= 0.12.26`. This was missed during the Terraform 0.13 upgrade.


</div>


### [v0.16.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.16.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/20/2021 | Modules affected: mgmt, networking, services/eks-cluster, services/eks-core-services | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.16.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Updates gruntwork-io/module-ci to v0.29.6
- Updates gruntwork-io/kubergrunt to v0.6.9
- Update gruntwork-io/terraform-kubernetes-namespace to v0.1.1
- Adds primary_host output for rds
- Introduces ability to add custom IAM policies to the asg-service module.
- Updates gruntwork-io/module-asg to v0.11.1
- Updates gruntwork-io/terratest to v0.31.4
- Updates gruntwork-io/module-ecs to v0.23.4
- Updates gruntwork-io/terragrunt to v0.27.1
- Removes unused variable from memcached
- Updates gruntwork-io/module-security to v0.44.7
- Updates gruntwork-io/terraform-aws-eks to v0.32.0. This update is **backwards incompatible**. Please refer to [the terraform-aws-eks release notes](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.32.0) for more information.
- Updates gruntwork-io/module-server to v0.10.0. 




</div>


### [v0.15.4](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.15.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/6/2021 | Modules affected: landingzone | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.15.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- Updated the `landingzone/account-baseline-root` &amp; `landingzone/account-baseline-security` modules to include the new `iam-access-analyzer` module in order to be compliant with CIS 1.3.0. The additional `iam-access-analyzer` module is disabled by default to aid consistency and backwards compatibility between versions of the `landingzone`. 
- Updated the related examples to showcase how the `landingzone` module could use the `iam-access-analyzer` module. To enable the use of this feature, users will need to set `enable_iam_access_analyzer` to true in the variables.tf for each of these modules or examples.
- Once all our libraries are upgraded and tested to be compatible with CIS 1.3.0 we’ll publish a migration guide to help you update.



</div>


### [v0.15.3](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.15.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/5/2021 | Modules affected: networking | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.15.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Updated the `vpc` service to expose several optional parameters available in the underlying `vpc-app` module that were not exposed before:
    - `custom_tags`, `vpc_custom_tags`, `public_subnet_custom_tags`, `private_app_subnet_custom_tags`, `private_persistence_subnet_custom_tags`, and `nat_gateway_custom_tags` for setting custom tags on the various resources in the VPC.
    - `create_public_subnets`, `create_private_app_subnets`, and `create_private_persistence_subnets` for enabling / disabling the various subnet tiers in the VPC.
    - `default_security_group_ingress_rules`, `default_security_group_egress_rules`, `default_nacl_ingress_rules`, `default_nacl_egress_rules` for configuring the default ingress and egress rules for the Default Security Group and Default Network ACL.





</div>


### [v0.15.2](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.15.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/4/2021 | Modules affected: services/public-static-website | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.15.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

You can now pass in the `hosted_zone_id` directly as opposed to looking it up via domain names when configuring route 53 records in the `public-static-website` module.



</div>



## terraform-aws-utilities


### [v0.3.2](https://github.com/gruntwork-io/terraform-aws-utilities/releases/tag/v0.3.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/12/2021 | Modules affected: request-quota-increase | <a href="https://github.com/gruntwork-io/terraform-aws-utilities/releases/tag/v0.3.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- CircleCI improvements: Fix CircleCI Contexts and switch from Dep to Go Modules
- **[NEW MODULE]** Request quota increase for an AWS resource 


</div>



## terraform-aws-vpc


### [v0.13.0](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.13.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/29/2021 | Modules affected: vpc-app | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.13.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

In [v0.12.3](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.12.3), we added support for managing the [default network ACL](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/default_network_acl). However, we also associated the default NACL with the subnets in the VPC. This caused a perpetual diff problem for users that manage the network ACLs separately, such as when using the `vpc-app-network-acls` module. 

In this release, we have updated the behavior to not explicitly apply the default network ACL by default. 


</div>


### [v0.12.5](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.12.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/29/2021 | Modules affected: network-acl-inbound, vpc-app, vpc-dns-forwarder-rules, vpc-flow-logs | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.12.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- We recently renamed most of our repos to follow the Terraform Registry convention of `terraform-&lt;cloud&gt;-&lt;name&gt;` (e.g., `terraform-aws-vpc`. In this release, we&apos;ve updated all cross-references and links from the old names to the new names. There should be no change in behavior, and GitHub redirects old names to new names anyway, but using the up-to-date names will help reduce confusion.






</div>

<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "releases",
  "hash": "419b9ae35e6a20d32c5ffdaa2dbfb5f7"
}
##DOCS-SOURCER-END -->

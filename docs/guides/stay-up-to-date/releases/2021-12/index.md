
# Gruntwork release 2021-12

<p style={{marginTop: "-25px"}}><small><a href="/guides">Guides</a> / <a href="/guides/stay-up-to-date">Update Guides</a> / <a href="/guides/stay-up-to-date/releases">Releases</a> / 2021-12</small></p>

This page is lists all the updates to the [Gruntwork Infrastructure as Code
Library](https://gruntwork.io/infrastructure-as-code-library/) that were released in 2021-12. For instructions
on how to use these updates in your code, check out the [updating
documentation](/library/stay-up-to-date/updating).

Here are the repos that were updated:

- [gruntwork](#gruntwork)
- [repo-copier](#repo-copier)
- [terraform-aws-asg](#terraform-aws-asg)
- [terraform-aws-ci](#terraform-aws-ci)
- [terraform-aws-cis-service-catalog](#terraform-aws-cis-service-catalog)
- [terraform-aws-data-storage](#terraform-aws-data-storage)
- [terraform-aws-ecs](#terraform-aws-ecs)
- [terraform-aws-eks](#terraform-aws-eks)
- [terraform-aws-lambda](#terraform-aws-lambda)
- [terraform-aws-security](#terraform-aws-security)
- [terraform-aws-service-catalog](#terraform-aws-service-catalog)
- [terraform-aws-vpc](#terraform-aws-vpc)


## gruntwork


### [v0.2.5](https://github.com/gruntwork-io/gruntwork/releases/tag/v0.2.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/2/2021 | <a href="https://github.com/gruntwork-io/gruntwork/releases/tag/v0.2.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Added support for ensuring the service quota limits are set to a sufficiently high enough value in the new accounts to support deployment of the Reference Architecture.

</div>



## repo-copier


### [v0.0.23](https://github.com/gruntwork-io/repo-copier/releases/tag/v0.0.23)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/17/2021 | <a href="https://github.com/gruntwork-io/repo-copier/releases/tag/v0.0.23">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/repo-copier/pull/111: 

* Fix &quot;no commit found for SHA&quot; error that would come up in certain cases when copying repos.
* The default behavior of `--force-overwrite` is now to overwrite Git history in the existing repo instead of deleting the repo entirely and recreating it. If you wish to delete and recreate, you now also need to pass `--force-recreate`.

</div>


### [v0.0.22](https://github.com/gruntwork-io/repo-copier/releases/tag/v0.0.22)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/9/2021 | <a href="https://github.com/gruntwork-io/repo-copier/releases/tag/v0.0.22">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/repo-copier/pull/108: Remove `--copy-deps` flag, as it had performance issues and bugs, and with little-to-no usage, wasn&apos;t worth fixing.

</div>



## terraform-aws-asg


### [v0.16.0](https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.16.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/17/2021 | Modules affected: asg-rolling-deploy | <a href="https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.16.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- We&apos;ve updated the version of the boto library used in the `asg-rolling-deploy` module from 1.7.10 to 1.20.24 to fix a compatibility issue with python 3.10 (while still maintaining backwards compatibility with older python 3.7+ releases). However, this new version of boto **DOES NOT WORK WITH PYTHON 2**. Python 2 was sunsetted on January 1, 2020, so hopefully, you&apos;ve already migrated off of it, but if you haven&apos;t, you will now need to to use this version of the `asg-rolling-deploy` module.





</div>



## terraform-aws-ci


### [v0.40.0](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.40.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/10/2021 | Modules affected: kubernetes-circleci-helpers | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.40.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fixed bug where `setup-minikube` script sometimes ended up with an interactive prompt.
- Updated `setup-minikube` to install the version `v1.24.0` by default.
- Updated `setup-minikube` to require at least minikube version `v1.10.0`. **If you are relying on an older minikube version, update your usage to match the newer version prior to upgrading the script**.




</div>


### [v0.39.7](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.39.7)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/1/2021 | Modules affected: ec2-backup | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.39.7">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Updated ec2-backup runtime to nodejs14.x



</div>



## terraform-aws-cis-service-catalog


### [v0.28.0](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.28.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/17/2021 | Modules affected: networking/vpc, networking/vpc-mgmt, landingzone | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.28.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Updated dependency `gruntwork-io/terraform-aws-vpc` to v0.18.6
- Updated dependency `gruntwork-io/terraform-aws-service-catalog` to v0.65.4
- Fixed CIS non-compliance of the default NACL created for the VPC.


</div>



## terraform-aws-data-storage


### [v0.22.4](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.22.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/14/2021 | Modules affected: aurora | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.22.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Added support for restoring an Aurora cluster using a Point-in-Time restore. Refer to the variable documentation for `restore_source_cluster_identifier` for more details.



</div>


### [v0.22.3](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.22.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/13/2021 | Modules affected: aurora | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.22.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

Fixed a bug where major version upgrades were broken for Postgres Aurora clusters.



</div>


### [v0.22.2](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.22.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/8/2021 | Modules affected: backup-plan, backup-vault, rds | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.22.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Added support for managing AWS Backup service.
- Exposed ability to attach additional security groups to the RDS instance





</div>



## terraform-aws-ecs


### [v0.31.8](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.31.8)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/17/2021 | Modules affected: ecs-service | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.31.8">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Added the ability to configure the `runtime_platform` block, extending support for Graviton2/Operating system family.



</div>



## terraform-aws-eks


### [v0.46.8](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.46.8)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/16/2021 | Modules affected: eks-k8s-cluster-autoscaler | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.46.8">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Exposed the ability to set `priorityClassName` on k8s cluster-autoscaler (via the `pod_priority_class_name` input variable).



</div>


### [v0.46.7](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.46.7)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/15/2021 | Modules affected: eks-cloudwatch-agent | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.46.7">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- New module to setup and manage [CloudWatch Container Insights](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/ContainerInsights.html) on EKS cluster. Refer to the docs for the new [eks-cloudwatch-agent module](https://github.com/gruntwork-io/terraform-aws-eks/tree/master/modules/eks-cloudwatch-agent) for more information.



</div>


### [v0.46.6](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.46.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/8/2021 | Modules affected: eks-k8s-cluster-autoscaler, eks-cluster-managed-workers | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.46.6">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Upgraded helm chart version for `cluster-autoscaler` to include updated permissions.
- Exposed the ability to set `force_update_version` on the managed node group in the `eks-cluster-managed-workers` module.




</div>



## terraform-aws-lambda


### [v0.14.3](https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.14.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/8/2021 | Modules affected: lambda | <a href="https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.14.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Exposed the ability to set custom tags and name on the IAM role created for the Lambda function.




</div>


### [v0.14.2](https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.14.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/3/2021 | Modules affected: lambda | <a href="https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.14.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Added the ability to attach additional security groups to the lambda function (using the new input variable `additional_security_group_ids`).



</div>



## terraform-aws-security


### [v0.57.0](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.57.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/17/2021 | Modules affected: aws-config-multi-region, ebs-encryption-multi-region, guardduty-multi-region, iam-access-analyzer-multi-region | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.57.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

Added support for new AWS region (`ap-southeast-3` Jakarta) to multiregion modules. As a result, you will need to add this region to your list of region providers.

Add the following to your `providers.tf` for terraform:

```hcl

provider &quot;aws&quot; &#x7B;
  region = &quot;ap-southeast-3&quot;
  alias  = &quot;ap_southeast_3&quot;

  # Skip credential validation and account ID retrieval for disabled or restricted regions
  skip_credentials_validation = contains(coalesce(var.opt_in_regions, []), &quot;ap-southeast-3&quot;) ? false : true
  skip_requesting_account_id  = contains(coalesce(var.opt_in_regions, []), &quot;ap-southeast-3&quot;) ? false : true
&#x7D;
```

For terragrunt, add `ap-southeast-3` to the `all_aws_regions` local variable.




</div>


### [v0.56.0](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.56.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/16/2021 | Modules affected: private-s3-bucket, iam-access-analyzer-multi-region, iam-users | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.56.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Updated management of S3 bucket replication configuration to use the `aws_s3_bucket_replication_configuration` resource so that users can have more control over the replication configuration.
- Fixes to documentation and examples.




</div>



## terraform-aws-service-catalog


### [v0.68.7](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.68.7)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/17/2021 | Modules affected: landingzone | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.68.7">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Added the ability to configure an OpenID Connect Provider for GitHub Actions to use to authenticate to AWS in LandingZone (`account-baseline-app` and `account-baseline-security`).



</div>


### [v0.68.6](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.68.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/15/2021 | Modules affected: networking | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.68.6">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Updated `terraform-aws-vpc` to v0.18.5 and exposed ability to disable binding of default NACLs with subnets.




</div>


### [v0.68.5](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.68.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/14/2021 | Modules affected: services, networking | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.68.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Updated dependency `terraform-aws-vpc` version to 0.18.4




</div>


### [v0.68.4](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.68.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/10/2021 | Modules affected: data-stores | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.68.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Added the ability to configure ECR lifecycle polices



</div>


### [v0.68.3](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.68.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/10/2021 | Modules affected: mgmt, services, data-stores | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.68.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fixed bug where `allow_ssh_from_cidr` was hardcoded to `true` in `openvpn-server` module. This will now be set to `false` if the `allow_ssh_from_cidr_list` list is empty.
- Added `iam_role_id` and `iam_role_name` outputs to `ec2-instance` module
- Added the ability to configure S3 lifecycle rules to the `private-s3-bucket` module.
- Added the ability to configure cross region replication in the `ecr-repos` module.



</div>


### [v0.68.2](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.68.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/7/2021 | Modules affected: data-stores | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.68.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Remove renovate.json
- Add `bucket_kms_key_arn` variable for SSE-KMS in `s3-bucket` module



</div>


### [v0.68.1](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.68.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/2/2021 | Modules affected: services | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.68.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Exposed the ID of the common security group created for Managed Node Groups in the `eks-cluster` and `eks-workers` module.



</div>


### [v0.68.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.68.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/2/2021 | Modules affected: services/eks-cluster, services/eks-workers | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.68.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Exposed ability to specify additional security groups for the EKS cluster workers (using the new input var `additional_security_groups_for_workers`). As a part of this change, the input var `additional_security_groups` on `eks-cluster` module has been renamed to `additional_security_groups_for_control_plane`.



</div>



## terraform-aws-vpc


### [v0.18.6](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.18.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/17/2021 | Modules affected: vpc-peering-cross-accounts-requester | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.18.6">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Updated to add the ability to configure `allow_remote_vpc_dns_resolution` on the VPC peering requester



</div>


### [v0.18.5](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.18.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/15/2021 | Modules affected: vpc-app, vpc-mgmt | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.18.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Added the ability to manage the default NACLs, but restrict association of subnets so that the subnets can be associated with a different NACL.




</div>


### [v0.18.4](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.18.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/13/2021 | Modules affected: vpc-app, vpc-mgmt | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.18.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Updated `vpc-app` module `count` calls to be more robust to changes.
- Updated `vpc-mgmt` module to allow you to manage the default Route Table, Security Group, and Network ACLs.



</div>


### [v0.18.3](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.18.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/7/2021 | Modules affected: vpc-app | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.18.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- `vpc-app`: Add explicit Default Route Table tag





</div>


### [v0.18.2](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.18.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/6/2021 | Modules affected: vpc-interface-endpoint | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.18.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- `vpc-interface-endpoint`: Fix typos in service names



</div>


### [v0.18.1](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.18.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/1/2021 | Modules affected: vpc-app | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.18.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Support multiple route tables for the public subnets



</div>

<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "releases",
  "hash": "6850031e4061bf8595b069fae31eb60c"
}
##DOCS-SOURCER-END -->

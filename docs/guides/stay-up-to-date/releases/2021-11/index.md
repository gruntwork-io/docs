
# Gruntwork release 2021-11

<p style={{marginTop: "-25px"}}><small><a href="/guides">Guides</a> / <a href="/guides/stay-up-to-date">Update Guides</a> / <a href="/guides/stay-up-to-date/releases">Releases</a> / 2021-11</small></p>

This page is lists all the updates to the [Gruntwork Infrastructure as Code
Library](https://gruntwork.io/infrastructure-as-code-library/) that were released in 2021-11. For instructions
on how to use these updates in your code, check out the [updating
documentation](/library/stay-up-to-date/updating).

Here are the repos that were updated:

- [repo-copier](#repo-copier)
- [terraform-aws-ci](#terraform-aws-ci)
- [terraform-aws-cis-service-catalog](#terraform-aws-cis-service-catalog)
- [terraform-aws-data-storage](#terraform-aws-data-storage)
- [terraform-aws-eks](#terraform-aws-eks)
- [terraform-aws-monitoring](#terraform-aws-monitoring)
- [terraform-aws-openvpn](#terraform-aws-openvpn)
- [terraform-aws-server](#terraform-aws-server)
- [terraform-aws-service-catalog](#terraform-aws-service-catalog)
- [terraform-aws-vpc](#terraform-aws-vpc)


## repo-copier


### [v0.0.21](https://github.com/gruntwork-io/repo-copier/releases/tag/v0.0.21)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/10/2021 | <a href="https://github.com/gruntwork-io/repo-copier/releases/tag/v0.0.21">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/repo-copier/pull/101: Fix the build so that binaries are published with each release. The last couple releases are missing binaries, but we should have them with this release.

</div>


### [v0.0.20](https://github.com/gruntwork-io/repo-copier/releases/tag/v0.0.20)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/9/2021 | <a href="https://github.com/gruntwork-io/repo-copier/releases/tag/v0.0.20">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/repo-copier/pull/99: Fix a bug with concurrent map writes. Add check for OS file descriptor limits.

</div>



## terraform-aws-ci


### [v0.39.6](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.39.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/22/2021 | Modules affected: terraform-helpers, infrastructure-deploy-script | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.39.6">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fixed minor style issues in `git-updated-files`
- Fixed quoting in one of the error messages in `infrastructure-deploy-script`



</div>


### [v0.39.5](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.39.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/18/2021 | Modules affected: terraform-helpers | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.39.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Introduced a new script `git-updated-files` which will return the list of files that were modified between two refs, with filter functionality.



</div>


### [v0.39.4](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.39.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/17/2021 | Modules affected: terraform-helpers, ecs-deploy-runner-standard-configuration, ecs-deploy-runner, infrastructure-deploy-script | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.39.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fixed bug where `terraform-update-variable` included output from terraform wrappers like `tfenv`.
- Added support for passing through `--terragrunt-modules-that-include`



</div>


### [v0.39.3](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.39.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/1/2021 | Modules affected: infrastructure-deploy-script, ecs-deploy-runner | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.39.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fixed bug where branch refs passed as `ref` to `infrastructure-deploy-script` was not being handled correctly.
- Bumped default `module_ci_tag` in ECS Deploy Runner docker files to this release tag.



</div>



## terraform-aws-cis-service-catalog


### [v0.27.9](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.27.9)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/3/2021 | Modules affected: security, landingzone, networking | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.27.9">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
Updates versions of underlying dependencies:
- `gruntwork-io/terraform-aws-lambda` to `v0.14.1`
- `gruntwork-io/terraform-aws-service-catalog` to `v0.65.0`
- `gruntwork-io/terraform-aws-vpc` to `v0.17.8`




</div>



## terraform-aws-data-storage


### [v0.22.1](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.22.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/2/2021 | Modules affected: rds | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.22.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

Added `delete_automated_backups` variable and respective handling to rds module.




</div>



## terraform-aws-eks


### [v0.46.5](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.46.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/24/2021 | Modules affected: eks-cluster-control-plane | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.46.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Added the ability to control control access to the private VPC endpoint for kubernetes API access. Refer to [the updated documentation](https://github.com/gruntwork-io/terraform-aws-eks/blob/master/modules/eks-cluster-control-plane/README.md#api-access-and-networking) for more details.



</div>


### [v0.46.4](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.46.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/13/2021 | Modules affected: eks-cluster-managed-workers | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.46.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

Added support to AWS Managed Node Groups to pass in taints. This adds the variable to the `node_group_configurations` and defaults to empty list.



</div>


### [v0.46.3](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.46.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/11/2021 | Modules affected: eks-fargate-container-logs | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.46.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fixed bug where the value for `auto_create_group` for the CloudWatch configuration of EKS FireLens is no longer a valid value on new EKS clusters.




</div>



## terraform-aws-monitoring


### [v0.30.3](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.30.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/17/2021 | Modules affected: agents | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.30.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Swapped `jq` for `gojq` to support arm64/aarch64 architecture.



</div>



## terraform-aws-openvpn


### [v0.17.0](https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.17.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/4/2021 | Modules affected: openvpn-server, start-openvpn-admin, openvpn-admin | <a href="https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.17.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Update CODEOWNERS
- Use Gruntwork SQS module for issue and revoke queues **[BACKWARD INCOMPATIBLE].** 
- Update openvpn-host module user-data script to use AWS Instance Metadata Service Version 2 (IMDSv2)
- Upgrade openvpn-admin Golang binary to use AWS Instance Metadata Service Version 2 (IMDSv2)


</div>



## terraform-aws-server


### [v0.13.7](https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.13.7)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/5/2021 | Modules affected: persistent-ebs-volume | <a href="https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.13.7">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Migrate unmount-ebs-volume script to use IMDSv2. These changes are fully backward compatible.






</div>



## terraform-aws-service-catalog


### [v0.67.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.67.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/30/2021 | Modules affected: services/eks-cluster, services, networking, base | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.67.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Updated dependency gruntwork-io/terraform-aws-eks to v0.46.5. Note that this change includes a backward incompatible update. Refer to the migration guide below for more information.
- Updated dependency gruntwork-io/terraform-aws-vpc to v0.18.0
- Updated dependency gruntwork-io/gruntwork-installer to v0.0.38
- Updated dependency gruntwork-io/terraform-aws-monitoring to v0.30.3
- Updated dependency gruntwork-io/terragrunt to v0.35.12
- Exposed `additional_security_groups` from terraform-aws-eks control-plane



</div>


### [v0.66.1](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.66.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/18/2021 | Modules affected: mgmt | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.66.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Update dependency gruntwork-io/terraform-aws-ci to v0.39.5



</div>


### [v0.66.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.66.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/18/2021 | Modules affected: services/ecs-service, services/ecs-fargate-cluster | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.66.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Exposed name of ECS Fargate cluster as an output for dependency chaining.
- Updated `ecs-service` to accept dynamic security group rules for `awsvpc` network config. You can now have the module create and manage a Security Group for your service, instead of externally providing one. **Note that as a result of this, the type of the input variable `network_configuration` has changed. Refer to the migration guide for more info.**



</div>


### [v0.65.7](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.65.7)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/16/2021 | Modules affected: services | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.65.7">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fixed bug where the ALB access logs S3 bucket used a hard coded prefix instead of the configurable parameter.



</div>


### [v0.65.6](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.65.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/16/2021 | Modules affected: data-stores | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.65.6">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- RDS: Added support for  &quot;backup_window&quot; variable to specify when backups should run



</div>


### [v0.65.5](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.65.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/12/2021 | Modules affected: mgmt, networking, services, data-stores | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.65.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  



- Adds the ability to enable/disable endpoints.
-  Add support for apex records in the `route53` module
- Expose `wait` and `wait_timeout` inputs for k8s-service module
- Update dependency gruntwork-io/terraform-aws-ci to v0.39.3
- Update dependency gruntwork-io/terraform-aws-eks to v0.46.2
- Update dependency gruntwork-io/terragrunt to v0.35.7
- Update dependency gruntwork-io/terraform-aws-data-storage to v0.22.1
- Update dependency gruntwork-io/terragrunt to v0.35.10
- Update dependency gruntwork-io/terratest to v0.38.4
- Update dependency gruntwork-io/terraform-aws-server to v0.13.7
- Update dependency gruntwork-io/terraform-aws-openvpn to v0.17.0 
  - **NOTE: this update will delete and recreate the SQS queues used by the `openvpn-admin` utility when requesting and revoking certificates. VPN functionality is not affected. Please see the migration guide for [v0.17.0](https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.17.0).**
- Update dependency hashicorp/terraform to v1.0.10




</div>


### [v0.65.4](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.65.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/9/2021 | Modules affected: services/public-static-website | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.65.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- The `public-static-website` module now passes through [`geo_restriction_type`](https://github.com/gruntwork-io/terraform-aws-service-catalog/blob/6f50f26d68e5ea6bd65f5794e7ba789555f5b173/modules/services/public-static-website/variables.tf#L92) and [`geo_locations_list`](https://github.com/gruntwork-io/terraform-aws-service-catalog/blob/6f50f26d68e5ea6bd65f5794e7ba789555f5b173/modules/services/public-static-website/variables.tf#L98) variables to the underlying module.
- 



</div>


### [v0.65.3](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.65.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/9/2021 | Modules affected: services, mgmt, networking | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.65.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fix a bug in the `route53` module in how it was reading the `zone_id` parameter.
- You can now configure the `ecs-cluster` module to use a public IP using the new `cluster_instance_associate_public_ip_address` input variable.
- Update dependency gruntwork-io/aws-sample-app to v0.0.5.



</div>


### [v0.65.2](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.65.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/4/2021 | Modules affected: services/k8s-service | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.65.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Updated `ingress_group` input to support setting `priority = null`, so that you can have ingress resources with no group order. This is useful in situations where you have dynamic environments where the priority doesn&apos;t matter, as you can only have one ingress per group order.



</div>


### [v0.65.1](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.65.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/3/2021 | Modules affected: mgmt, base, networking, services | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.65.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

Changes in this release:
- The variable `autoscaler_skip_nodes_with_local_storage` was added to the `eks-core-services` service
- Subnet related outputs were added to the `vpc` service

This release also updates versions of underlying dependencies:
- `gruntwork-io/terraform-aws-ci` to `v0.39.2`
- `gruntwork-io/bash-commons` to `v0.1.9`
- `gruntwork-io/terraform-aws-eks` to `v0.46.1`
- `hashicorp/packer` to `v1.7.8`
- `gruntwork-io/terragrunt` to `v0.35.5`




</div>



## terraform-aws-vpc


### [v0.18.0](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.18.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/17/2021 | Modules affected: vpc-app-network-acls, vpc-app, vpc-mgmt-network-acls, vpc-mgmt | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.18.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Updated description of NACLs.
- **[BACKWARD INCOMPATIBLE]**: The `vpc-app` module now requires Terraform version &gt;= 0.13.7. This was previously mentioned in the comment but the code had not been updated.
- Added many new VPC interface endpoints. See #225 for details. Thanks to @schniber for this contribution!





</div>


### [v0.17.9](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.17.9)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/4/2021 | Modules affected: vpc-app | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.17.9">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

`vpc-app`: Add S3 and DynamoDB endpoints to outputs



</div>


### [v0.17.8](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.17.8)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/2/2021 | Modules affected: vpc-app | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.17.8">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- `vpc-app`: Add outputs containing all subnet information



</div>

<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "releases",
  "hash": "66be96e8168a42812f9fec3a68da0715"
}
##DOCS-SOURCER-END -->

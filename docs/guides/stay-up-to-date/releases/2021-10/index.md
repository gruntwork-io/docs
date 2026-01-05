
# Gruntwork release 2021-10

<p style={{marginTop: "-25px"}}><small><a href="/guides">Guides</a> / <a href="/guides/stay-up-to-date">Update Guides</a> / <a href="/guides/stay-up-to-date/releases">Releases</a> / 2021-10</small></p>

This page is lists all the updates to the [Gruntwork Infrastructure as Code
Library](https://gruntwork.io/infrastructure-as-code-library/) that were released in 2021-10. For instructions
on how to use these updates in your code, check out the [updating
documentation](/library/stay-up-to-date/updating).

Here are the repos that were updated:

- [aws-sample-app](#aws-sample-app)
- [boilerplate](#boilerplate)
- [repo-copier](#repo-copier)
- [terraform-aws-architecture-catalog](#terraform-aws-architecture-catalog)
- [terraform-aws-ci](#terraform-aws-ci)
- [terraform-aws-cis-service-catalog](#terraform-aws-cis-service-catalog)
- [terraform-aws-ecs](#terraform-aws-ecs)
- [terraform-aws-eks](#terraform-aws-eks)
- [terraform-aws-lambda](#terraform-aws-lambda)
- [terraform-aws-openvpn](#terraform-aws-openvpn)
- [terraform-aws-security](#terraform-aws-security)
- [terraform-aws-server](#terraform-aws-server)
- [terraform-aws-service-catalog](#terraform-aws-service-catalog)
- [terraform-aws-static-assets](#terraform-aws-static-assets)
- [terraform-aws-vpc](#terraform-aws-vpc)


## aws-sample-app


### [v0.0.5](https://github.com/gruntwork-io/aws-sample-app/releases/tag/v0.0.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/26/2021 | <a href="https://github.com/gruntwork-io/aws-sample-app/releases/tag/v0.0.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/aws-sample-app/pull/31: Switch packer template to HCL from JSON.

</div>



## boilerplate


### [v0.3.9](https://github.com/gruntwork-io/boilerplate/releases/tag/v0.3.9)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/12/2021 | <a href="https://github.com/gruntwork-io/boilerplate/releases/tag/v0.3.9">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/boilerplate/pull/81: Fixed bug where boilerplate did not render the `path` and `not_path` attribute of `skip_files` and `engines` as templates.

</div>



## repo-copier


### [v0.0.19](https://github.com/gruntwork-io/repo-copier/releases/tag/v0.0.19)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/7/2021 | <a href="https://github.com/gruntwork-io/repo-copier/releases/tag/v0.0.19">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/repo-copier/pull/96: `repo-copier` now supports GitHub.com and GitHub Enterprise as destinations!

</div>



## terraform-aws-architecture-catalog


### [v0.0.24](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v0.0.24)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/20/2021 | <a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v0.0.24">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * d2d9b6f Always populate the shared account domain name. (#478)
* 96ed089 Limit multi az to avoid us-east-1e. (#474)
* 88c12b3 Check for hcl2json (#473)
* 81697fc Render the right IAM role in the auth docs (#460)
* ad945b9 Make sure the versions tags used for building container locally matches rendered script (#466)
* fb3aaad Avoid rebuilding AMI if building locally (#472)
* 9976e47 Add check for packer version. (#471)
* f3c249e Various fixes for deploying Macie (#459)

</div>


### [v0.0.23](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v0.0.23)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/1/2021 | <a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v0.0.23">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Fixes the for-production examples to include all the CI server variations.

</div>



## terraform-aws-ci


### [v0.39.2](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.39.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/22/2021 | Modules affected: ecs-deploy-runner | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.39.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Bumped underlying `kaniko` image version to `1.7.0`




</div>


### [v0.39.1](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.39.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/20/2021 | Modules affected: build-helpers | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.39.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Exposed ability to set the version of `packer` that gets installed by `build-packer-artifact` when it is not available.



</div>


### [v0.39.0](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.39.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/12/2021 | Modules affected: ecs-deploy-runner | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.39.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

Bumped the default versions of various tools in ECS Deploy Runner. The following versions were updated:

- Terraform: `0.15.5` =&gt; `1.0.8`
- Terragrunt: `v0.31.5` =&gt; `v0.34.3`
- Kubergrunt: `v0.7.7` =&gt; `v0.7.10`
- `terraform-aws-ci`: `v0.38.4` =&gt; `v0.38.14`

If you wish to keep the old version, pass in the respective variables as build args when building the container. E.g., to revert to the older terraform version, pass in `--build-arg &apos;terraform_version=0.15.5` to the `docker build` command.



</div>


### [v0.38.14](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.38.14)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/7/2021 | Modules affected: ecs-deploy-runner | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.38.14">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  


- Bumped default `kaniko` version installed to `v1.5.2`





</div>



## terraform-aws-cis-service-catalog


### [v0.27.8](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.27.8)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/13/2021 | Modules affected: networking, landingzone | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.27.8">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- chore(deps): update dependency gruntwork-io/terraform-aws-service-catalog to v0.63.1
- chore(deps): update dependency gruntwork-io/terraform-aws-vpc to v0.17.7




</div>


### [v0.27.7](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.27.7)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/11/2021 | Modules affected: observability, security, networking | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.27.7">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- `vpc`: Makes Flow Logs CloudWatch IAM role and log group name configurable
- Updates dependency `gruntwork-io/terraform-aws-security` to `v0.55.4`




</div>


### [v0.27.6](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.27.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/6/2021 | Modules affected: landingzone, networking, security | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.27.6">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

Introduces two improvements to the `vpc` module:
- NACLs creation will no longer be attempted for the subnets that are not created
- Subnet CIDR blocks are now configurable

This release also updates the following dependency version:
- `gruntwork-io/terraform-aws-service-catalog` to `v0.62.4`



</div>



## terraform-aws-ecs


### [v0.31.7](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.31.7)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/19/2021 | Modules affected: ecs-daemon-service, ecs-service | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.31.7">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Exposed ability to configure `deployment_controller` on ECS services.



</div>


### [v0.31.6](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.31.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/12/2021 | Modules affected: ecs-service, ecs-cluster | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.31.6">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Updated `roll-out-ecs-cluster-update.py` script to increase the max size of the ASG if there is not enough capacity to replace all the nodes.
- Various updates to docs and tests.



</div>



## terraform-aws-eks


### [v0.46.2](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.46.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/29/2021 | Modules affected: eks-alb-ingress-controller-iam-policy, eks-alb-ingress-controller | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.46.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Updated to the latest chart and app versions (`v1.3.2` and `v2.3.0`) of AWS LB Controller.
    - Note that this release is marked as backward compatible despite the underlying version bump being marked as backward incompatible. This is because the backward incompatibilities are addressed in the module. No change is necessary to your configuration of Services and Ingress resources when updating to this version.
    - Updating to this version will trigger a redeployment of the AWS LB Controller Pod. This is a backward compatible change given the stateless and periodic nature of the service. There is no downtime to your ALBs and NLBs while the controller Pods are being redeployed.






</div>


### [v0.46.1](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.46.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/25/2021 | Modules affected: eks-scripts | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.46.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Updated `map_ec2_tags_to_node_labels.py` to use IMDSv2




</div>


### [v0.46.0](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.46.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/19/2021 | Modules affected: eks-cluster-workers | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.46.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Refactored resource naming to use `name_prefix` instead of `name` to support create before destroy lifecycle rules.


</div>


### [v0.45.2](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.45.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/18/2021 | Modules affected: eks-cluster-control-plane | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.45.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Expose `permissions_boundary` field for cluster IAM role



</div>


### [v0.45.1](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.45.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/11/2021 | Modules affected: eks-cluster-control-plane | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.45.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Updated the `kubergrunt` version that gets installed to latest.




</div>



## terraform-aws-lambda


### [v0.14.1](https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.14.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/19/2021 | <a href="https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.14.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fix security group preventing lambda-vpc example from working. Update known issues






</div>


### [v0.14.0](https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.14.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/16/2021 | Modules affected: lambda-edge, lambda, keep-warm | <a href="https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.14.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Updated cross dependencies in examples to latest version
- Fix outdated docs on setting up cloudfront with lambda edge
- Clarify that newer than nodejs10.x and python3.7 are supported
- Upgrade to python runtime 3.9
- Fix minor typos
- Fix line break in middle of paragraph
- Fix typo: lamda -&gt; lambda **[BACKWARD INCOMPATIBLE].** 

This release fixes a typo in the aws_iam_role_policy resource, changing the name from &quot;network_interfaces_for_lamda&quot; to &quot;network_interfaces_for_lambda&quot;. This is a backward incompatible change, requiring re-creation of the aws_iam_role_policy.

However, the downtime incurred by this operation should be so brief as to be negligible, because the policy will be removed and immediately added back at apply time.

If you wish to avoid this brief downtime, you can use the terraform state mv operation to move your aws_iam_role_policy resource&apos;s state via the following command:

`terraform state mv aws_iam_role_policy.network_interfaces_for_lamda aws_iam_role_policy.network_interfaces_for_lambda`






</div>



## terraform-aws-openvpn


### [v0.16.3](https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.16.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/8/2021 | <a href="https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.16.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Migrate openvpn-host example to IMDSv2. This is a backward compatible change that uses AWS EC2 Instance Metadata Service Version 2 for enhanced security. 












</div>


### [v0.16.2](https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.16.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/8/2021 | <a href="https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.16.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

With this release, we are improving the documentation around how to best use this module for development and learning purposes, and how to use it for production environments. The aim is to make it easier to onboard new users and maintainers of this repo. 





</div>



## terraform-aws-security


### [v0.55.4](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.55.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/8/2021 | Modules affected: iam-users | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.55.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- The `iam-users` module can now store the access keys for an IAM user in AWS Secrets Manager (if you set `store_access_keys_in_secrets_mgr` to `true`) in addition to encrypting the access keys with PGP. This is primarily useful for machine users, where you want the access keys stored somewhere multiple team members can access them (whereas with PGP, typically only one person has the private key).



</div>



## terraform-aws-server


### [v0.13.6](https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.13.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/14/2021 | Modules affected: attach-eni, persistent-ebs-volume, require-instance-metadata-service-version | <a href="https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.13.6">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Migrate example: persistent-ebs-volume to IMDSv2. These changes update the `user-data.sh` script and the example itself to use Instance Metadata Service (IMDS) Version 2, which is specially hardened against several attack attack vectors.
- **[New Module]** `require-instance-metadata-version`. This module allows you to require use of a particular version of the Instance Metadata Service. See the module for more details and usage instructions.






</div>


### [v0.13.5](https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.13.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/8/2021 | Modules affected: single-server | <a href="https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.13.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Added ability to bring your own IAM role to single-server. There is now a new input variable `create_iam_role` (default `true`), and when it is `false`, the module will lookup the IAM role using the `iam_role_name` variable instead of creating a new one.




</div>



## terraform-aws-service-catalog


### [v0.65.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.65.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/25/2021 | Modules affected: services/eks-cluster, services/eks-workers, services, networking | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.65.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Exposed feature flags to shut off `kubergrunt` features when deploying an EKS cluster with the `eks-cluster` module.
- Exposed ability to set `terminationGracePeriodSeconds` on pods deployed with the `k8s-service` module.
- Updated dependency gruntwork-io/terraform-aws-eks to v0.46.0 - this is **a backward incompatible update**! A naive update will replace your self managed worker pool. Refer to the migration guide below for more information.


</div>


### [v0.64.1](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.64.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/21/2021 | Modules affected: services | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.64.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Update dependency gruntwork-io/terraform-aws-static-assets to v0.12.2
- Update kubernetes provider version to workaround bug


</div>


### [v0.64.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.64.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/19/2021 | Modules affected: landingzone/account-baseline-app, landingzone/account-baseline-security, landingzone/account-baseline-root, services/lambda | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.64.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Exposed the ability to set custom tags on Jenkins.
- Updated `ecs-cluster` to allow disallowing certain Availability Zones for the worker pool.
- Updated variable description for container definitions in `ecs-service` to be more accurate with what is expected 
- Bumped the following dependencies to latest:
    - Update dependency gruntwork-io/terratest to v0.38.2
    - Update dependency helm/helm to v3.7.1
    - Update dependency gruntwork-io/terraform-aws-server to v0.13.6
    - Update dependency gruntwork-io/terraform-aws-data-storage to v0.22.0
    - Update dependency gruntwork-io/bash-commons to v0.1.8
    - Update dependency gruntwork-io/kubergrunt to v0.7.10
    - Update dependency gruntwork-io/terraform-aws-openvpn to v0.16.3
    - Update dependency gruntwork-io/terraform-aws-ci to v0.39.0
    - Update dependency hashicorp/terraform to v1.0.9
    - Update dependency hashicorp/packer to v1.7.7
    - Update dependency gruntwork-io/terraform-aws-ecs to v0.31.7
    - Update dependency gruntwork-io/terragrunt to v0.35.4
    - Update dependency gruntwork-io/terraform-aws-security to v0.55.4
    - Update dependency gruntwork-io/terraform-aws-lambda to v0.14.1


</div>


### [v0.63.4](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.63.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/19/2021 | Modules affected: services/eks-cluster, services/eks-workers | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.63.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fixed source of perpetual diff in eks-cluster module
- Exposed `permissions_boundary` field on IAM roles for EKS cluster
- Exposed `tag` field on Security Groups for EKS workers



</div>


### [v0.63.3](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.63.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/14/2021 | Modules affected: landingzone/account-baseline-root | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.63.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Switches the python-based `sleep` `null_resource` to use the native `time_sleep` resource to wait for account creation.




</div>


### [v0.63.2](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.63.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/14/2021 | Modules affected: services/eks-cluster, services/eks-workers | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.63.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Exposed the ability to pass arbitrary args to `bootstrap.sh` script on EKS worker nodes.



</div>


### [v0.63.1](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.63.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/13/2021 | Modules affected: base, data-stores, mgmt, networking | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.63.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Updates dependency gruntwork-io/terraform-aws-monitoring to v0.30.2
- Updates dependency gruntwork-io/terraform-aws-vpc to v0.17.7



</div>


### [v0.63.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.63.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/11/2021 | Modules affected: services/public-static-website, services/ecs-service | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.63.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Update dependency gruntwork-io/terraform-aws-ecs to v0.31.5
- Update dependency gruntwork-io/terraform-aws-static-assets to v0.12.1. NOTE: This release is backward incompatible. Please refer to the [migration guide](https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.12.0) from the underlying module for more info.



</div>


### [v0.62.6](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.62.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/8/2021 | Modules affected: networking | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.62.6">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Added the ability to modify the VPC flowlogs CloudWatch IAM role and name of the CloudWatch Log Group.



</div>


### [v0.62.5](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.62.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/8/2021 | Modules affected: networking/route53 | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.62.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Added ability to manage non-alias subdomain records on public zones in the `route53` module. Use the newly added `subdomains` field on the `public_zones` input variable to configure the records.



</div>


### [v0.62.4](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.62.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/6/2021 | Modules affected: networking | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.62.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Exposed ability to manually configure the CIDR blocks for the subnets on the VPC.



</div>


### [v0.62.3](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.62.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/5/2021 | Modules affected: base, data-stores, landingzone, mgmt | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.62.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Bump terraform-aws-security to v0.53.7




</div>


### [v0.62.2](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.62.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/1/2021 | Modules affected: services/public-static-website | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.62.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Pass through `routing_rules` and `viewer_protocol_policy` through to the underlying modules in the public-static-website service.



</div>



## terraform-aws-static-assets


### [v0.12.2](https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.12.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/19/2021 | Modules affected: s3-cloudfront | <a href="https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.12.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Update CODEOWNERS
- Enhance public s3-cloudfront example to include lambda@edge
- Add option to use trusted key groups



</div>



## terraform-aws-vpc


### [v0.17.7](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.17.7)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/12/2021 | Modules affected: vpc-interface-endpoint | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.17.7">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Bugfix, EFS endpoint does not support creating a SecurityGroup
- Support for ECS telemetry endpoint added



</div>


### [v0.17.6](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.17.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/12/2021 | Modules affected: vpc-app, vpc-interface-endpoint | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.17.6">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Adds `policy` variable for the VPC Gateway Endpoint resources
- Adds SES Interface Endpoint
- Updates CODEOWNERS


</div>

<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "releases",
  "hash": "45b64eebeaf7bc49ff38ab31db6ba500"
}
##DOCS-SOURCER-END -->


# Gruntwork release 2025-07

<p style={{marginTop: "-25px"}}><small><a href="/guides">Guides</a> / <a href="/guides/stay-up-to-date">Update Guides</a> / <a href="/guides/stay-up-to-date/releases">Releases</a> / 2025-07</small></p>

This page is lists all the updates to the [Gruntwork Infrastructure as Code
Library](https://gruntwork.io/infrastructure-as-code-library/) that were released in 2025-07. For instructions
on how to use these updates in your code, check out the [updating
documentation](/library/stay-up-to-date/updating).

Here are the repos that were updated:

- [boilerplate](#boilerplate)
- [pipelines-actions](#pipelines-actions)
- [pipelines-workflows](#pipelines-workflows)
- [repo-copier](#repo-copier)
- [terraform-aws-architecture-catalog](#terraform-aws-architecture-catalog)
- [terraform-aws-cis-service-catalog](#terraform-aws-cis-service-catalog)
- [terraform-aws-control-tower](#terraform-aws-control-tower)
- [terraform-aws-load-balancer](#terraform-aws-load-balancer)
- [terraform-aws-messaging](#terraform-aws-messaging)
- [terraform-aws-security](#terraform-aws-security)
- [terraform-aws-server](#terraform-aws-server)
- [terraform-aws-service-catalog](#terraform-aws-service-catalog)
- [terraform-aws-static-assets](#terraform-aws-static-assets)
- [terraform-aws-vpc](#terraform-aws-vpc)


## boilerplate


### [v0.8.1](https://github.com/gruntwork-io/boilerplate/releases/tag/v0.8.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/24/2025 | <a href="https://github.com/gruntwork-io/boilerplate/releases/tag/v0.8.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * fix: processing dependency variable and render for_each_reference value by @tiviuray in https://github.com/gruntwork-io/boilerplate/pull/230

* @tiviuray made their first contribution in https://github.com/gruntwork-io/boilerplate/pull/230

**Full Changelog**: https://github.com/gruntwork-io/boilerplate/compare/v0.8.0...v0.8.1

</div>


### [v0.8.0](https://github.com/gruntwork-io/boilerplate/releases/tag/v0.8.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/23/2025 | <a href="https://github.com/gruntwork-io/boilerplate/releases/tag/v0.8.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * State management helpers by @dee-kryvenko in https://github.com/gruntwork-io/boilerplate/pull/227

* @dee-kryvenko made their first contribution in https://github.com/gruntwork-io/boilerplate/pull/227

**Full Changelog**: https://github.com/gruntwork-io/boilerplate/compare/v0.6.4...v0.8.0

</div>


### [v0.7.0](https://github.com/gruntwork-io/boilerplate/releases/tag/v0.7.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/23/2025 | <a href="https://github.com/gruntwork-io/boilerplate/releases/tag/v0.7.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Bump golang.org/x/oauth2 from 0.23.0 to 0.27.0 by @dependabot[bot] in https://github.com/gruntwork-io/boilerplate/pull/229
* feat: add fromYaml to template helpers. by @pseudomorph in https://github.com/gruntwork-io/boilerplate/pull/228

* @pseudomorph made their first contribution in https://github.com/gruntwork-io/boilerplate/pull/228

**Full Changelog**: https://github.com/gruntwork-io/boilerplate/compare/v0.6.3...v0.7.0

</div>


### [v0.6.4](https://github.com/gruntwork-io/boilerplate/releases/tag/v0.6.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/23/2025 | <a href="https://github.com/gruntwork-io/boilerplate/releases/tag/v0.6.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  This release was replaced with v0.7.0 as it contained a change that is not backwards compatible

</div>



## pipelines-actions


### [v3.6.5](https://github.com/gruntwork-io/pipelines-actions/releases/tag/v3.6.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/7/2025 | <a href="https://github.com/gruntwork-io/pipelines-actions/releases/tag/v3.6.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  **Full Changelog**: https://github.com/gruntwork-io/pipelines-actions/compare/v3.6.4...v3.6.5

</div>



## pipelines-workflows


### [v3.9.3](https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v3.9.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/8/2025 | <a href="https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v3.9.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Pin-mise-version-in-unlock by @oredavids in https://github.com/gruntwork-io/pipelines-workflows/pull/142


**Full Changelog**: https://github.com/gruntwork-io/pipelines-workflows/compare/v3.9.2...v3.9.3

</div>


### [v3.9.2](https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v3.9.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/7/2025 | <a href="https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v3.9.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Fix mise install by pinning mise version by @Resonance1584 in https://github.com/gruntwork-io/pipelines-workflows/pull/141


**Full Changelog**: https://github.com/gruntwork-io/pipelines-workflows/compare/v3.9.1...v3.9.2

</div>



## repo-copier


### [v0.6.2](https://github.com/gruntwork-io/repo-copier/releases/tag/v0.6.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/17/2025 | <a href="https://github.com/gruntwork-io/repo-copier/releases/tag/v0.6.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

A build failure during `v0.6.0` and `v0.6.1` broke the release binaries.

The build process has been repaired, resulting in this release fixing this release.

* fix: Fix missing generated rice-box.go by @Resonance1584 in https://github.com/gruntwork-io/repo-copier/pull/290


**Full Changelog**: https://github.com/gruntwork-io/repo-copier/compare/v0.6.1...v0.6.2

</div>


### [v0.6.1](https://github.com/gruntwork-io/repo-copier/releases/tag/v0.6.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/9/2025 | <a href="https://github.com/gruntwork-io/repo-copier/releases/tag/v0.6.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Fix missing error message on bad requests by @Resonance1584 in https://github.com/gruntwork-io/repo-copier/pull/287


**Full Changelog**: https://github.com/gruntwork-io/repo-copier/compare/v0.6.0...v0.6.1

</div>



## terraform-aws-architecture-catalog


### [v3.1.1](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v3.1.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/25/2025 | <a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v3.1.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * DEV-979 Update catalog tags implementation to use a local file cache by @ZachGoldberg in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1149


**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-architecture-catalog/compare/v3.1.0...v3.1.1

</div>


### [v3.1.0](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v3.1.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/23/2025 | <a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v3.1.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Add additional boilerplate variables for infra-live-root to enable tests to pass in necessary overrides by @ZachGoldberg in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1147
* Fix empty defaults should not be null by @Resonance1584 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1148
* Pass refs by @Resonance1584 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1150
* Fix find_in_parent_folders needs template arg by @Resonance1584 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1151
* Fix gitlab tg version and apply role by @Resonance1584 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1153


**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-architecture-catalog/compare/v3.0.1...v3.1.0

</div>



## terraform-aws-cis-service-catalog


### [v0.58.3](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.58.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/9/2025 | Modules affected: modules/security/cleanup-expired-certs | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.58.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- chore: Bump `cleanup-expired-certs` python version to `python3.13`



</div>



## terraform-aws-control-tower


### [v0.8.7](https://github.com/gruntwork-io/terraform-aws-control-tower/releases/tag/v0.8.7)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/16/2025 | Modules affected: landingzone/control-tower-app-account-baseline, landingzone/control-tower-security-account-baseline, landingzone/control-tower-landing-zone | <a href="https://github.com/gruntwork-io/terraform-aws-control-tower/releases/tag/v0.8.7">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  


</div>



## terraform-aws-load-balancer


### [v1.0.1](https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v1.0.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/9/2025 | Modules affected: alb | <a href="https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v1.0.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- modules/alb: support IPv6 ingress/egress security group rules





</div>



## terraform-aws-messaging


### [v1.0.1](https://github.com/gruntwork-io/terraform-aws-messaging/releases/tag/v1.0.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/15/2025 | Modules affected: msk | <a href="https://github.com/gruntwork-io/terraform-aws-messaging/releases/tag/v1.0.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- add privatelink (multi vpc connection) support



</div>



## terraform-aws-security


### [v1.0.1](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v1.0.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/3/2025 | Modules affected: fail2ban | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v1.0.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- modules/fail2ban: Changed AWS CLI installation for better support by Ubuntu 24.04+



</div>



## terraform-aws-server


### [v1.0.1](https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v1.0.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/3/2025 | Modules affected: persistent-ebs-volume | <a href="https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v1.0.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- modules/persistent-ebs-volume: Updated to work with newer nvme utility (improved AL2023 compatitiblity)
- tests: Removed Ubuntu 18.04 and added Ubuntu 24.04 to automated compatibility tests






</div>



## terraform-aws-service-catalog


### [v0.127.6](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.127.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/25/2025 | Modules affected: services/eks-cluster | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.127.6">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
&gt; [!IMPORTANT]  
&gt; **EKS Users**: A bug was introduced into the service catalog with the [v0.121.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.121.0) release. This was due to a variable not being exposed in the service catalog that was added into the `terraform-aws-eks` library module with version [v0.74.0](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.74.0). The new variable must be set to the existing EKS Cluster Security Group Name to avoid a destructive recreation of the Security Group which will fail during an update requiring state manipulation to recover. When updating to this version, you must set the new variable `eks_cluster_security_group_name` to the existing EKS Cluster Security Group Name to avoid this issue. This change is being back-ported as a patch to every minor version release since `v0.121.0` to ensure an upgrade path is available since the bug was introduced.

- Expose new variable `eks_cluster_security_group_name` to allow the EKS Control Plane Security Group name to be overridden.






</div>


### [v0.126.3](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.126.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/11/2025 | Modules affected: data-stores/ecr-repos | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.126.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Add support for IAM Roles for the `users_or_roles_to_allow_deny_all_else` input



</div>


### [v0.126.2](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.126.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/9/2025 | Modules affected: base, data-stores, landingzone, mgmt | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.126.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

Updated the following modules to use terraform-aws-security v1.0.1 and terraform-aws-server v1.0.1 which provides better support for AL2023 and Ubuntu 24.04+:
  - modules/base/ec2-baseline
  - modules/data-stores/rds-replica
  - modules/data-stores/rds
  - modules/data-stores/s3-bucket
  - modules/landingzone/account-baseline-app
  - modules/landingzone/account-baseline-root
  - modules/landingzone/account-baseline-security
  - modules/langinzone/iam-users-and-groups
  - modules/mgmt/bastion-host
  - modules/mgmt/ecs-deploy-runner
  - modules/mgmt/jenkins
  - modules/mgmt/openvpn-server
  - modules/services/ec2-instance
  - modules/services/ec2-instance






</div>


### [v0.126.1](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.126.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/4/2025 | Modules affected: services/eks-cluster | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.126.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
&gt; **This is a backport patch release.**  
&gt; This release backports a bug fix to ensure users on older minor versions can safely upgrade without encountering the previously introduced issue. This release is part of a coordinated set of backport patches, each targeting a specific minor version since the bug was introduced. The goal is to provide a safe, direct upgrade path for users on any affected minor version, without requiring an immediate jump to the latest release. No other changes are included in this patch beyond the critical fix described below.
&gt; **If you are upgrading from any version since `v0.121.0`, please read the instructions below carefully.**


- `services/eks-cluster`


&gt; [!IMPORTANT]  
&gt; **EKS Users:** A bug was introduced in the service catalog with the [v0.121.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.121.0) release. This was due to a variable not being exposed in the service catalog that was added into the `terraform-aws-eks` library module with version [v0.74.0](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.74.0).  
&gt;  
&gt; **Impact:** The new variable must be set to the existing EKS Cluster Security Group Name to avoid a destructive recreation of the Security Group, which will fail during an update and require state manipulation to recover.
&gt;  
&gt; **Action Required:** When updating to this version, you must set the new variable `eks_cluster_security_group_name` to the existing EKS Cluster Security Group Name to avoid this issue.


- Exposed new variable `eks_cluster_security_group_name` to allow the EKS Control Plane Security Group name to be overridden.


- [Pull Request #2256](https://github.com/gruntwork-io/terraform-aws-service-catalog/pull/2256)

**If you have questions or need help with the upgrade, please open an issue or a support ticket.**

</div>


### [v0.125.6](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.125.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/4/2025 | Modules affected: services/eks-cluster | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.125.6">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
&gt; **This is a backport patch release.**  
&gt; This release backports a bug fix to ensure users on older minor versions can safely upgrade without encountering the previously introduced issue. This release is part of a coordinated set of backport patches, each targeting a specific minor version since the bug was introduced. The goal is to provide a safe, direct upgrade path for users on any affected minor version, without requiring an immediate jump to the latest release. No other changes are included in this patch beyond the critical fix described below.
&gt; **If you are upgrading from any version since `v0.121.0`, please read the instructions below carefully.**


- `services/eks-cluster`


&gt; [!IMPORTANT]  
&gt; **EKS Users:** A bug was introduced in the service catalog with the [v0.121.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.121.0) release. This was due to a variable not being exposed in the service catalog that was added into the `terraform-aws-eks` library module with version [v0.74.0](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.74.0).  
&gt;  
&gt; **Impact:** The new variable must be set to the existing EKS Cluster Security Group Name to avoid a destructive recreation of the Security Group, which will fail during an update and require state manipulation to recover.
&gt;  
&gt; **Action Required:** When updating to this version, you must set the new variable `eks_cluster_security_group_name` to the existing EKS Cluster Security Group Name to avoid this issue.


- Exposed new variable `eks_cluster_security_group_name` to allow the EKS Control Plane Security Group name to be overridden.


- [Pull Request #2256](https://github.com/gruntwork-io/terraform-aws-service-catalog/pull/2256)

**If you have questions or need help with the upgrade, please open an issue or a support ticket.**

</div>


### [v0.124.1](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.124.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/4/2025 | Modules affected: services/eks-cluster | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.124.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
&gt; **This is a backport patch release.**  
&gt; This release backports a bug fix to ensure users on older minor versions can safely upgrade without encountering the previously introduced issue. This release is part of a coordinated set of backport patches, each targeting a specific minor version since the bug was introduced. The goal is to provide a safe, direct upgrade path for users on any affected minor version, without requiring an immediate jump to the latest release. No other changes are included in this patch beyond the critical fix described below.
&gt; **If you are upgrading from any version since `v0.121.0`, please read the instructions below carefully.**


- `services/eks-cluster`


&gt; [!IMPORTANT]  
&gt; **EKS Users:** A bug was introduced in the service catalog with the [v0.121.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.121.0) release. This was due to a variable not being exposed in the service catalog that was added into the `terraform-aws-eks` library module with version [v0.74.0](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.74.0).  
&gt;  
&gt; **Impact:** The new variable must be set to the existing EKS Cluster Security Group Name to avoid a destructive recreation of the Security Group, which will fail during an update and require state manipulation to recover.
&gt;  
&gt; **Action Required:** When updating to this version, you must set the new variable `eks_cluster_security_group_name` to the existing EKS Cluster Security Group Name to avoid this issue.


- Exposed new variable `eks_cluster_security_group_name` to allow the EKS Control Plane Security Group name to be overridden.


- [Pull Request #2256](https://github.com/gruntwork-io/terraform-aws-service-catalog/pull/2256)

**If you have questions or need help with the upgrade, please open an issue or a support ticket.**

</div>


### [v0.123.1](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.123.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/4/2025 | Modules affected: services/eks-cluster | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.123.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
&gt; **This is a backport patch release.**  
&gt; This release backports a bug fix to ensure users on older minor versions can safely upgrade without encountering the previously introduced issue. This release is part of a coordinated set of backport patches, each targeting a specific minor version since the bug was introduced. The goal is to provide a safe, direct upgrade path for users on any affected minor version, without requiring an immediate jump to the latest release. No other changes are included in this patch beyond the critical fix described below.
&gt; **If you are upgrading from any version since `v0.121.0`, please read the instructions below carefully.**


- `services/eks-cluster`


&gt; [!IMPORTANT]  
&gt; **EKS Users:** A bug was introduced in the service catalog with the [v0.121.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.121.0) release. This was due to a variable not being exposed in the service catalog that was added into the `terraform-aws-eks` library module with version [v0.74.0](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.74.0).  
&gt;  
&gt; **Impact:** The new variable must be set to the existing EKS Cluster Security Group Name to avoid a destructive recreation of the Security Group, which will fail during an update and require state manipulation to recover.
&gt;  
&gt; **Action Required:** When updating to this version, you must set the new variable `eks_cluster_security_group_name` to the existing EKS Cluster Security Group Name to avoid this issue.


- Exposed new variable `eks_cluster_security_group_name` to allow the EKS Control Plane Security Group name to be overridden.


- [Pull Request #2256](https://github.com/gruntwork-io/terraform-aws-service-catalog/pull/2256)

**If you have questions or need help with the upgrade, please open an issue or a support ticket.**

</div>


### [v0.122.1](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.122.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/4/2025 | Modules affected: services/eks-cluster | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.122.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
&gt; **This is a backport patch release.**  
&gt; This release backports a bug fix to ensure users on older minor versions can safely upgrade without encountering the previously introduced issue. This release is part of a coordinated set of backport patches, each targeting a specific minor version since the bug was introduced. The goal is to provide a safe, direct upgrade path for users on any affected minor version, without requiring an immediate jump to the latest release. No other changes are included in this patch beyond the critical fix described below.
&gt; **If you are upgrading from any version since `v0.121.0`, please read the instructions below carefully.**


- `services/eks-cluster`


&gt; [!IMPORTANT]  
&gt; **EKS Users:** A bug was introduced in the service catalog with the [v0.121.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.121.0) release. This was due to a variable not being exposed in the service catalog that was added into the `terraform-aws-eks` library module with version [v0.74.0](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.74.0).  
&gt;  
&gt; **Impact:** The new variable must be set to the existing EKS Cluster Security Group Name to avoid a destructive recreation of the Security Group, which will fail during an update and require state manipulation to recover.
&gt;  
&gt; **Action Required:** When updating to this version, you must set the new variable `eks_cluster_security_group_name` to the existing EKS Cluster Security Group Name to avoid this issue.


- Exposed new variable `eks_cluster_security_group_name` to allow the EKS Control Plane Security Group name to be overridden.


- [Pull Request #2256](https://github.com/gruntwork-io/terraform-aws-service-catalog/pull/2256)

**If you have questions or need help with the upgrade, please open an issue or a support ticket.**

</div>


### [v0.127.5](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.127.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/3/2025 | Modules affected: services/eks-cluster | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.127.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
&gt; [!IMPORTANT]  
&gt; **EKS Users**: A bug was introduced into the service catalog with the [v0.121.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.121.0) release. This was due to a variable not being exposed in the service catalog that was added into the `terraform-aws-eks` library module with version [v0.74.0](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.74.0). The new variable must be set to the existing EKS Cluster Security Group Name to avoid a destructive recreation of the Security Group which will fail during an update requiring state manipulation to recover. When updating to this version, you must set the new variable `eks_cluster_security_group_name` to the existing EKS Cluster Security Group Name to avoid this issue. This change is being back-ported as a patch to every minor version release since `v0.121.0` to ensure an upgrade path is available since the bug was introduced.

- Expose new variable `eks_cluster_security_group_name` to allow the EKS Control Plane Security Group name to be overridden.






</div>


### [v0.121.4](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.121.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/3/2025 | Modules affected: services/eks-cluster | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.121.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
&gt; **This is a backport patch release.**  
&gt; This release backports a bug fix to ensure users on older minor versions can safely upgrade without encountering the previously introduced issue. This release is part of a coordinated set of backport patches, each targeting a specific minor version since the bug was introduced. The goal is to provide a safe, direct upgrade path for users on any affected minor version, without requiring an immediate jump to the latest release. No other changes are included in this patch beyond the critical fix described below.
&gt; **If you are upgrading from any version since `v0.121.0`, please read the instructions below carefully.**


- `services/eks-cluster`


&gt; [!IMPORTANT]  
&gt; **EKS Users:** A bug was introduced in the service catalog with the [v0.121.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.121.0) release. This was due to a variable not being exposed in the service catalog that was added into the `terraform-aws-eks` library module with version [v0.74.0](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.74.0).  
&gt;  
&gt; **Impact:** The new variable must be set to the existing EKS Cluster Security Group Name to avoid a destructive recreation of the Security Group, which will fail during an update and require state manipulation to recover.
&gt;  
&gt; **Action Required:** When updating to this version, you must set the new variable `eks_cluster_security_group_name` to the existing EKS Cluster Security Group Name to avoid this issue.


- Exposed new variable `eks_cluster_security_group_name` to allow the EKS Control Plane Security Group name to be overridden.


- [Pull Request #2256](https://github.com/gruntwork-io/terraform-aws-service-catalog/pull/2256)

**If you have questions or need help with the upgrade, please open an issue or a support ticket.**

</div>


### [v0.127.4](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.127.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/1/2025 | Modules affected: services | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.127.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- services/asg-service: Updated to use latest modules and specifically pulls in new functionality that allows desired_capacity to be set to null




</div>



## terraform-aws-static-assets


### [v1.1.1](https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v1.1.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/17/2025 | Modules affected: cloudfront | <a href="https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v1.1.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- fix: use correct attribute for realtime_log_config_arn
- fix: correct strict_transport_security variable reference



</div>


### [v1.1.0](https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v1.1.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/14/2025 | Modules affected: cloudfront | <a href="https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v1.1.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Bump golang.org/x/net from 0.36.0 to 0.38.0 in /test
- Update `default_cache_behavior.preload` type from string to bool



</div>



## terraform-aws-vpc


### [v0.28.6](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.28.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/3/2025 | Modules affected: transit-gateway | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.28.6">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- SME-3222: Added Security Group Referencing Support



</div>

<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "releases",
  "hash": "89c4fc6f7c105b5a73c290ca120fdfb0"
}
##DOCS-SOURCER-END -->

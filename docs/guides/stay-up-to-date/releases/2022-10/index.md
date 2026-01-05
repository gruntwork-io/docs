
# Gruntwork release 2022-10

<p style={{marginTop: "-25px"}}><small><a href="/guides">Guides</a> / <a href="/guides/stay-up-to-date">Update Guides</a> / <a href="/guides/stay-up-to-date/releases">Releases</a> / 2022-10</small></p>

This page is lists all the updates to the [Gruntwork Infrastructure as Code
Library](https://gruntwork.io/infrastructure-as-code-library/) that were released in 2022-10. For instructions
on how to use these updates in your code, check out the [updating
documentation](/library/stay-up-to-date/updating).

Here are the repos that were updated:

- [boilerplate](#boilerplate)
- [gruntwork](#gruntwork)
- [terraform-aws-cache](#terraform-aws-cache)
- [terraform-aws-ci](#terraform-aws-ci)
- [terraform-aws-cis-service-catalog](#terraform-aws-cis-service-catalog)
- [terraform-aws-eks](#terraform-aws-eks)
- [terraform-aws-lambda](#terraform-aws-lambda)
- [terraform-aws-load-balancer](#terraform-aws-load-balancer)
- [terraform-aws-security](#terraform-aws-security)
- [terraform-aws-service-catalog](#terraform-aws-service-catalog)


## boilerplate


### [v0.5.3](https://github.com/gruntwork-io/boilerplate/releases/tag/v0.5.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/28/2022 | <a href="https://github.com/gruntwork-io/boilerplate/releases/tag/v0.5.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Update CODEOWNERS by @yorinasub17 in https://github.com/gruntwork-io/boilerplate/pull/123
* Attempt to provide more helpful error message when git URL may be misspelled by @yorinasub17 in https://github.com/gruntwork-io/boilerplate/pull/121
* Introduce validations and variable order by @zackproser in https://github.com/gruntwork-io/boilerplate/pull/124


**Full Changelog**: https://github.com/gruntwork-io/boilerplate/compare/v0.5.2...v0.5.3

</div>



## gruntwork


### [v0.4.11](https://github.com/gruntwork-io/gruntwork/releases/tag/v0.4.11)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/25/2022 | <a href="https://github.com/gruntwork-io/gruntwork/releases/tag/v0.4.11">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Remove jenkins from the wizard by @pete0emerson in https://github.com/gruntwork-io/gruntwork/pull/146
* Ensure single account per environment when creating aws accounts by @hongil0316 in https://github.com/gruntwork-io/gruntwork/pull/147
* Remove ASG possibility from refarch by @pete0emerson in https://github.com/gruntwork-io/gruntwork/pull/148

**Full Changelog**: https://github.com/gruntwork-io/gruntwork/compare/v0.3.11...v0.4.11

</div>


### [v0.3.11](https://github.com/gruntwork-io/gruntwork/releases/tag/v0.3.11)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/13/2022 | <a href="https://github.com/gruntwork-io/gruntwork/releases/tag/v0.3.11">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Remove Jenkins from the wizard.

</div>



## terraform-aws-cache


### [v0.18.2](https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v0.18.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/26/2022 | Modules affected: redis, memcached | <a href="https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v0.18.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Update default branch references (backward compatible)
- [skip ci] Update CODEOWNERS
- Add tags to memcache module.



</div>



## terraform-aws-ci


### [v0.50.9](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.50.9)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/25/2022 | Modules affected: build-helpers | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.50.9">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Updated `build-packer-artifact` to run `packer` in the root of cloned git repository





</div>


### [v0.50.8](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.50.8)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/13/2022 | Modules affected: aws-helpers, build-helpers, circleci-helpers, ec2-backup | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.50.8">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- `aws-helpers`
- `build-helpers`
- `circleci-helpers`
- `ec2-backup`
- `git-helpers`
- `gruntwork-module-circleci-helpers`
- `infrastructure-deploy-script`
- `infrastructure-deployer`
- `install-jenkins`
- `jenkins-server`
- `kubernetes-circleci-helpers`
- `monorepo-helpers`
- `terraform-helpers`
- `ecs-deploy-runner`


- Update default branch references (backward compatible) (https://github.com/gruntwork-io/terraform-aws-ci/pull/479)
- Organize upgrade tests better. (https://github.com/gruntwork-io/terraform-aws-ci/pull/480)
- Update additional refs to main (https://github.com/gruntwork-io/terraform-aws-ci/pull/482)
- Update CODEOWNERS (https://github.com/gruntwork-io/terraform-aws-ci/pull/485)
- Fix the issue where --skip-fmt didn&apos;t actually do anything. (https://github.com/gruntwork-io/terraform-aws-ci/pull/487)

</div>



## terraform-aws-cis-service-catalog


### [v0.41.2](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.41.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/28/2022 | Modules affected: data-stores/rds | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.41.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- [CIS v1.5] New RDS compliant module


</div>


### [v0.41.1](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.41.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/21/2022 | Modules affected: data-stores/efs, landingzone/account-baseline-app, landingzone/account-baseline-root, landingzone/account-baseline-security | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.41.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Add EU team to CODEOWNERS
- Fix missing variable reference organizations_default_tags in account-baseline-root
- [CIS v1.5] Update comment about Security Hub module being in CIS AWS benchmark
- [CIS v1.5] New EFS module wrapper



</div>



## terraform-aws-eks


### [v0.55.0](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.55.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/21/2022 | Modules affected: eks-fargate-container-logs | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.55.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- Add option to append Kubernetes Metadata to Fargate logs. The input variable `include_kubernetes_metadata` defaults to `true`, making this a backward incompatible change.


</div>


### [v0.54.0](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.54.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/18/2022 | Modules affected: eks-cluster-control-plane, eks-k8s-cluster-autoscaler, eks-alb-ingress-controller, eks-aws-auth-merger | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.54.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
The default version of Kubernetes installed by the module has been updated to 1.23. As a result of this, the default version of addons were updated to support installation into 1.23. Specifically:

- `cluster-autoscaler`: The default app version and chart version have been updated to `1.23.0` and `9.21.0`.
- `eks-alb-ingress-controller`: The default app version and chart version have been updated to `2.4.3` and `1.4.4`.

Due to the Cluster Autoscaler version bump, additional IAM Permissions have been added to `eks-k8s-cluster-autoscaler-iam-policy`:

```
        &quot;ec2:DescribeImages&quot;,
        &quot;ec2:GetInstanceTypesFromInstanceRequirements&quot;,
        &quot;eks:DescribeNodegroup&quot;
```


</div>


### [v0.53.2](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.53.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/6/2022 | Modules affected: eks-k8s-cluster-autoscaler | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.53.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Updated Cluster Autoscaler to add optional Permission Boundary for the autoscaler IAM role



</div>



## terraform-aws-lambda


### [v0.21.0](https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.21.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/21/2022 | Modules affected: lambda-edge-log-group, lambda-edge-multi-region-log-groups, lambda-edge | <a href="https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.21.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

-  [BACKWARDS INCOMPATIBLE] Fixes log groups being created outside of terraform control.




</div>



## terraform-aws-load-balancer


### [v0.29.2](https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.29.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/12/2022 | Modules affected: alb | <a href="https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.29.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Add enable_http2 flag support for ALBs



</div>



## terraform-aws-security


### [v0.65.9](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.65.9)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/25/2022 | Modules affected: private-s3-bucket, _deprecated, auto-update, aws-auth | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.65.9">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Add backend=false flag to terraform init script
- Fix no-session flags in docs
- Add skip_get_ec2_platforms
- Use new upgrade test code.
- Update default branch to origin/HEAD
- Update default branch references (backward compatible)
- Add ability to override the regions to render in multiregion generator
- Bump docker image from patch to v0.0.6
- Apply `tags` also to role `cloudtrail_iam_role` created by cloudtrail module



</div>



## terraform-aws-service-catalog


### [v0.96.7](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.96.7)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/31/2022 | Modules affected: base | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.96.7">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Use yum on yum-based systems



</div>


### [v0.96.6](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.96.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/26/2022 | Modules affected: data-stores | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.96.6">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Add security_group_id to output of Redis module



</div>


### [v0.96.5](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.96.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/26/2022 | Modules affected: mgmt, services | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.96.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Update CODEOWNERS
- Include how to use service catalog without for-production example
- Update all aws subnet lookups to only filter on default for AZ
- Bump test packages
- Add clarifying docs on how to use HPA
- allow openvpn ec2 root_volume_size to be specified from infra-live



</div>


### [v0.96.4](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.96.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/21/2022 | Modules affected: networking, data-stores | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.96.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- `var.aws_region` has been deprecated in the `networking/vpc` (formerly `vpc-app`) module.
- Added the `var.auto_minor_version_upgrade` parameter to the `data-stores/rds` module.




</div>


### [v0.96.3](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.96.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/5/2022 | Modules affected: mgmt, tls-scripts, base, data-stores | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.96.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Expose `treat_missing_data` params across most modules that include CloudWatch alarms so that you can configure how the alarms should behave when data is missing.
- Expose `preferred_maintenance_window` variable in `aurora` module
- Update Terraform github.com/gruntwork-io/terraform-aws-ci to v0.50.7
- Update Terraform github.com/gruntwork-io/terraform-aws-monitoring to v0.35.4
- Update Terraform github.com/gruntwork-io/terraform-aws-ecs to v0.34.1



</div>

<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "releases",
  "hash": "0d229c908973917f4f1455e8f60fb534"
}
##DOCS-SOURCER-END -->

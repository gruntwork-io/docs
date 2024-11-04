
# Gruntwork release 2023-06

<p style={{marginTop: "-25px"}}><small><a href="/guides">Guides</a> / <a href="/guides/stay-up-to-date">Update Guides</a> / <a href="/guides/stay-up-to-date/releases">Releases</a> / 2023-06</small></p>

This page is lists all the updates to the [Gruntwork Infrastructure as Code
Library](https://gruntwork.io/infrastructure-as-code-library/) that were released in 2023-06. For instructions
on how to use these updates in your code, check out the [updating
documentation](/library/stay-up-to-date/updating).

Here are the repos that were updated:

- [boilerplate](#boilerplate)
- [patcher-cli](#patcher-cli)
- [repo-copier](#repo-copier)
- [terraform-aws-architecture-catalog](#terraform-aws-architecture-catalog)
- [terraform-aws-cache](#terraform-aws-cache)
- [terraform-aws-ci](#terraform-aws-ci)
- [terraform-aws-cis-service-catalog](#terraform-aws-cis-service-catalog)
- [terraform-aws-data-storage](#terraform-aws-data-storage)
- [terraform-aws-ecs](#terraform-aws-ecs)
- [terraform-aws-eks](#terraform-aws-eks)
- [terraform-aws-lambda](#terraform-aws-lambda)
- [terraform-aws-load-balancer](#terraform-aws-load-balancer)
- [terraform-aws-monitoring](#terraform-aws-monitoring)
- [terraform-aws-openvpn](#terraform-aws-openvpn)
- [terraform-aws-security](#terraform-aws-security)
- [terraform-aws-server](#terraform-aws-server)
- [terraform-aws-service-catalog](#terraform-aws-service-catalog)
- [terraform-aws-static-assets](#terraform-aws-static-assets)
- [terraform-aws-utilities](#terraform-aws-utilities)
- [terraform-aws-vpc](#terraform-aws-vpc)


## boilerplate


### [v0.5.4](https://github.com/gruntwork-io/boilerplate/releases/tag/v0.5.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/29/2023 | <a href="https://github.com/gruntwork-io/boilerplate/releases/tag/v0.5.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Fix vpc-app default number of NAT Gateways by @arsci in https://github.com/gruntwork-io/boilerplate/pull/130
* [skip ci] Refactor contexts by @eak12913 in https://github.com/gruntwork-io/boilerplate/pull/132
* [skip ci] Remove Zack from CODEOWNERS by @zackproser in https://github.com/gruntwork-io/boilerplate/pull/135
* Add for_each by @brikis98 in https://github.com/gruntwork-io/boilerplate/pull/134

* @arsci made their first contribution in https://github.com/gruntwork-io/boilerplate/pull/130

**Full Changelog**: https://github.com/gruntwork-io/boilerplate/compare/v0.5.3...v0.5.4

</div>



## patcher-cli


### [v0.3.4](https://github.com/gruntwork-io/patcher-cli/releases/tag/v0.3.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/28/2023 | <a href="https://github.com/gruntwork-io/patcher-cli/releases/tag/v0.3.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  This release contains minor bug fixes.

</div>


### [v0.3.3](https://github.com/gruntwork-io/patcher-cli/releases/tag/v0.3.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/21/2023 | <a href="https://github.com/gruntwork-io/patcher-cli/releases/tag/v0.3.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
This release includes the following improvements.

  - Support has been added for updating using the [&quot;next breaking&quot; update strategy](https://github.com/gruntwork-io/patcher-cli#next-breaking-update-strategy)
  - [Minor improvements to the display of third party modules](https://github.com/gruntwork-io/patcher-cli#support-for-third-party-modules)
    - Patcher can show if all the dependencies for a third-party module are fully up to date
    - Patcher supports limited updates to the next highest &quot;safe&quot; version, this is only safe if the third-party module follows good semantic versioning practices
    - Patcher shows a `?` and the message &quot;Patcher can not determine an update plan for this dependency.&quot;, if the dependencies on a third-party module are not up to date and cannot be update to a &quot;safe&quot; version

  - Support has been added for limiting updates to a single module dependency by setting `--target=&lt;module_source&gt;`
    - For example: `patcher  update --non-interactive --target=gruntwork-io/terraform-aws-service-catalog/networking/route53` will limit Patcher to only updating usages of the `route53` module
 

</div>



## repo-copier


### [v0.2.5](https://github.com/gruntwork-io/repo-copier/releases/tag/v0.2.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/8/2023 | <a href="https://github.com/gruntwork-io/repo-copier/releases/tag/v0.2.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * feat: updated `--copy-releases` flag to copy limited number of the releases by @levkoburburas in https://github.com/gruntwork-io/repo-copier/pull/175


**Full Changelog**: https://github.com/gruntwork-io/repo-copier/compare/v0.2.4...v0.2.5

</div>



## terraform-aws-architecture-catalog


### [v0.0.37](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v0.0.37)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/1/2023 | <a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v0.0.37">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Bump service-catalog refs to v0.104.4 by @zackproser in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/831
* Bump service catalog ref to v0.104.6 by @zackproser in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/832
* Bump service catalog to v0.104.9 by @zackproser in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/833


**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-architecture-catalog/compare/v0.0.36...v0.0.37

</div>



## terraform-aws-cache


### [v0.20.2](https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v0.20.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/7/2023 | <a href="https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v0.20.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
None


- Fix non-compliant HTML in README


- https://github.com/gruntwork-io/terraform-aws-cache/pull/130



</div>



## terraform-aws-ci


### [v0.52.5](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.52.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/29/2023 | Modules affected: install-jenkins | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.52.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Updated Jenkins version to 2.387.2 LTS
- Updated key used to sign Jenkins RPM releases



</div>


### [v0.52.4](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.52.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/27/2023 | Modules affected: git-helpers, terraform-helpers | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.52.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Add optional author flag to `terraform-update-variable` and `git-add-commit-push`.





</div>


### [v0.52.3](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.52.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/1/2023 | Modules affected: ec2-backup, ecs-deploy-runner-invoke-iam-policy, ecs-deploy-runner, iam-policies | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.52.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Specify version range for AWS provider in multiple modules




</div>



## terraform-aws-cis-service-catalog


### [v0.47.6](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.47.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/30/2023 | Modules affected: security/aws-securityhub | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.47.6">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Limited  AWS provider&apos;s version in AWS Security Hub&apos;s module due to [a bug released in v4.64.0](https://github.com/hashicorp/terraform-provider-aws/issues/30980).



</div>


### [v0.47.5](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.47.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/20/2023 | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.47.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Updated golang libraries from `codegen` and `test`





</div>


### [v0.47.4](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.47.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/16/2023 | Modules affected: landingzone, security/aws-securityhub | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.47.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Update Security Hub module to support CIS v1.4.0. Now CIS v1.2.0 and CIS v1.4.0 are enabled by default. [Refer to AWS docs regarding the differences in SecurityHub for between both standards](https://docs.aws.amazon.com/securityhub/latest/userguide/cis-aws-foundations-benchmark.html).




</div>


### [v0.47.3](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.47.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/5/2023 | Modules affected: data-stores, landingzone, networking, observability | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.47.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Pin AWS provider &lt;v5.0.0




</div>



## terraform-aws-data-storage


### [v0.29.0](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.29.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/27/2023 | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.29.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Use default subnet groups for aurora unit tests by @hongil0316 in https://github.com/gruntwork-io/terraform-aws-data-storage/pull/354
* Support DB Subnet Group for Cross Region Replica by @hongil0316 in https://github.com/gruntwork-io/terraform-aws-data-storage/pull/360
* Support Multi-AZ in RDS read-replica by @hongil0316 in https://github.com/gruntwork-io/terraform-aws-data-storage/pull/359
* Add more variables to control backup &amp; maintenance for RDS read replica by @hongil0316 in https://github.com/gruntwork-io/terraform-aws-data-storage/pull/361
* [skip ci] Update CODEOWNERS by @pete0emerson in https://github.com/gruntwork-io/terraform-aws-data-storage/pull/363

* @pete0emerson made their first contribution in https://github.com/gruntwork-io/terraform-aws-data-storage/pull/363

**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-data-storage/compare/v0.27.3...v0.28.1

</div>


### [v0.28.0](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.28.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/14/2023 | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.28.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Test connection to MySQL driver after RDS deployment in UnitTest by @hongil0316 in https://github.com/gruntwork-io/terraform-aws-data-storage/pull/339
* Refactor RDS replica into a separate module by @hongil0316 in https://github.com/gruntwork-io/terraform-aws-data-storage/pull/330
* Test connection to RDS modules for all engine types by @hongil0316 in https://github.com/gruntwork-io/terraform-aws-data-storage/pull/343
* Stop using unsupported postgres DB engine and remove unit test checking specific version by @hongil0316 in https://github.com/gruntwork-io/terraform-aws-data-storage/pull/347
* ci: add pre-commit hooks for file and line endings by @bt-macole in https://github.com/gruntwork-io/terraform-aws-data-storage/pull/348
* Run tests in multiple regions + small bug fix by @hongil0316 in https://github.com/gruntwork-io/terraform-aws-data-storage/pull/345
* running pre-commit and fixing formats by @hongil0316 in https://github.com/gruntwork-io/terraform-aws-data-storage/pull/349
* Use default DB subnet groups for RDS unit tests by @hongil0316 in https://github.com/gruntwork-io/terraform-aws-data-storage/pull/351
* Fix unit test for TestRdsMySqlWithCrossRegionReplica by @hongil0316 in https://github.com/gruntwork-io/terraform-aws-data-storage/pull/353


**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-data-storage/compare/v0.27.2...v0.27.3

</div>


### [v0.27.2](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.27.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/1/2023 | Modules affected: rds, aurora, backup-plan, backup-vault | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.27.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Support password management with secrets manager in RDS
- Fix/pin provider







</div>



## terraform-aws-ecs


### [v0.35.8](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.35.8)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/27/2023 | Modules affected: ecs-cluster | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.35.8">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Added logic to the `ecs-cluster` module allowing additional EBS block device mapping to be optional





</div>


### [v0.35.7](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.35.7)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/19/2023 | Modules affected: ecs-service | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.35.7">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Added ecs-cluster test using spot instances
- ecs-service: Changed default `launch_type` for API compatibility




</div>


### [v0.35.6](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.35.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/2/2023 | Modules affected: ecs-cluster | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.35.6">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- 387 Add support for max lifetime for ec2 instances in ecs-cluster



</div>


### [v0.35.5](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.35.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/1/2023 | Modules affected: ecs-cluster, ecs-daemon-service, ecs-service | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.35.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Pin AWS provider &lt;v5.0.0 to prevent breaking changes from disrupting functionality






</div>



## terraform-aws-eks


### [v0.59.2](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.59.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/29/2023 | Modules affected: eks-k8s-karpenter | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.59.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Expose Karpenter Helm chart value configs



</div>


### [v0.59.1](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.59.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/16/2023 | Modules affected: eks-alb-ingress-controller-iam-policy | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.59.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Add new policy statement for AddTags for latest policy requirements.



</div>


### [v0.59.0](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.59.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/2/2023 | Modules affected: eks-aws-auth-merger, eks-cluster-control-plane, eks-k8s-cluster-autoscaler | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.59.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

Feature/k8s 126 - add support for k8s 1.26

Note: EKS 1.26 requires kubergrunt v0.11.3 and above



</div>


### [v0.58.4](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.58.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/1/2023 | Modules affected: eks-cluster-workers, eks-alb-ingress-controller-iam-policy, eks-alb-ingress-controller, eks-aws-auth-merger | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.58.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Add variable: `asg_default_instance_root_volume_name` 
- Guard against pulling v5 AWS provider


</div>



## terraform-aws-lambda


### [v0.21.12](https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.21.12)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/16/2023 | Modules affected: lambda | <a href="https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.21.12">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Add ephemeral_storage to AWS lambda resource



</div>


### [v0.21.11](https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.21.11)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/15/2023 | Modules affected: keep-warm | <a href="https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.21.11">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Update nodejs



</div>


### [v0.21.10](https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.21.10)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/1/2023 | Modules affected: api-gateway-account-settings, api-gateway-proxy, keep-warm, lambda-edge-log-group | <a href="https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.21.10">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Pin AWS provider to less than V5




</div>



## terraform-aws-load-balancer


### [v0.29.8](https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.29.8)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/30/2023 | Modules affected: alb | <a href="https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.29.8">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Add optional alb redirect as default rule


</div>



## terraform-aws-monitoring


### [v0.36.1](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.36.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/1/2023 | Modules affected: alarms, logs, metrics | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.36.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Pin AWS provider &lt;v5.0.0 to prevent breaking changes from disrupting functionality.



</div>



## terraform-aws-openvpn


### [v0.26.3](https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.26.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/1/2023 | Modules affected: openvpn-server | <a href="https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.26.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Pin provider &lt; v5.0.0





</div>



## terraform-aws-security


### [v0.68.5](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.68.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/28/2023 | Modules affected: private-s3-bucket | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.68.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  


- Fixed null bucket_ownership of S3 bucket





</div>


### [v0.68.4](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.68.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/19/2023 | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.68.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Update golang libraries from `codegen`.






</div>



## terraform-aws-server


### [v0.15.5](https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.15.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/1/2023 | Modules affected: ec2-backup, single-server | <a href="https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.15.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Guard against AWS provider V5 to prevent breaking changes from disrupting functionality






</div>



## terraform-aws-service-catalog


### [v0.104.14](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.104.14)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/29/2023 | Modules affected: networking, services | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.104.14">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Update terraform-aws-eks to v0.59.2
- Expose Karpenter Helm chart value configs 



</div>


### [v0.104.13](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.104.13)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/28/2023 | Modules affected: data-stores, landingzone, services, mgmt | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.104.13">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Added a new RDS replica module 
- Added optional `additional_bucket_policy_statements` configuration for CloudTrail in `account-baseline-app`
- eks-workers: bump gruntwork-installer default
- Added support for k8s 1.26
- bump terraform-aws-cache to v0.20.2



</div>


### [v0.104.12](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.104.12)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/16/2023 | Modules affected: services, data-stores | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.104.12">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Chore: Add frontmatter for Karpenter service
- Update examples/for-learning-and-testing/services/ec2-instance with new Packer instructions
- Increase version to latest for RDS module
- Expose the platform_runtime in the ecs-service module



</div>


### [v0.104.11](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.104.11)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/7/2023 | Modules affected: networking, services | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.104.11">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Support for EKS Karpenter has been added. The `services/eks-karpenter` module adds support for [Karpenter](https://karpenter.sh/).
- Bump `terraform-aws-eks` to  [v0.58.0](https://togithub.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.58.0)


</div>


### [v0.104.10](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.104.10)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/5/2023 | Modules affected: data-stores | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.104.10">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Bump RDS module version



</div>


### [v0.104.9](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.104.9)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/1/2023 | Modules affected: base, data-stores, landingzone, mgmt | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.104.9">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Pin AWS provider &lt;v5.0.0





</div>



## terraform-aws-static-assets


### [v0.17.1](https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.17.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/1/2023 | Modules affected: s3-static-website, s3-cloudfront | <a href="https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.17.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Update documentation for supported aws provider version
- Pin AWS provider &lt;v5.0.0




</div>



## terraform-aws-utilities


### [v0.9.2](https://github.com/gruntwork-io/terraform-aws-utilities/releases/tag/v0.9.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/1/2023 | Modules affected: request-quota-increase, instance-type | <a href="https://github.com/gruntwork-io/terraform-aws-utilities/releases/tag/v0.9.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Refactor contexts
- Update pex example for Python compatibility
- Update CHANGELOG.md
- Update for python3.11 compatibility
- Restrict provider version to &gt;=3.75.1 and &lt;5.0.0 in modules.





</div>



## terraform-aws-vpc


### [v0.23.2](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.23.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/30/2023 | Modules affected: vpc-flow-logs | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.23.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Remove Zack from CODEOWNERS
- Add max_aggregation_interval to vpc_flow_logs



</div>




<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "releases",
  "hash": "f89d1040196925c21b2fc592f53a8057"
}
##DOCS-SOURCER-END -->

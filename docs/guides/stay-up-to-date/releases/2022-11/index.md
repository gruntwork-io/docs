
# Gruntwork release 2022-11

<p style={{marginTop: "-25px"}}><small><a href="/guides">Guides</a> / <a href="/guides/stay-up-to-date">Update Guides</a> / <a href="/guides/stay-up-to-date/releases">Releases</a> / 2022-11</small></p>

This page is lists all the updates to the [Gruntwork Infrastructure as Code
Library](https://gruntwork.io/infrastructure-as-code-library/) that were released in 2022-11. For instructions
on how to use these updates in your code, check out the [updating
documentation](/library/stay-up-to-date/updating).

Here are the repos that were updated:

- [aws-sample-app](#aws-sample-app)
- [terraform-aws-ci](#terraform-aws-ci)
- [terraform-aws-cis-service-catalog](#terraform-aws-cis-service-catalog)
- [terraform-aws-ecs](#terraform-aws-ecs)
- [terraform-aws-eks](#terraform-aws-eks)
- [terraform-aws-lambda](#terraform-aws-lambda)
- [terraform-aws-security](#terraform-aws-security)
- [terraform-aws-server](#terraform-aws-server)
- [terraform-aws-service-catalog](#terraform-aws-service-catalog)
- [terraform-aws-static-assets](#terraform-aws-static-assets)


## aws-sample-app


### [v0.0.6](https://github.com/gruntwork-io/aws-sample-app/releases/tag/v0.0.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/21/2022 | <a href="https://github.com/gruntwork-io/aws-sample-app/releases/tag/v0.0.6">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Fix unit tests by @yorinasub17 in https://github.com/gruntwork-io/aws-sample-app/pull/33
* Bump redis from 3.0.2 to 3.1.1 by @dependabot in https://github.com/gruntwork-io/aws-sample-app/pull/27
* Add GitHub PR &amp; Issue Templates by @robmorgan in https://github.com/gruntwork-io/aws-sample-app/pull/32
* [skip ci] Update codeowners to reflect current owners by @yorinasub17 in https://github.com/gruntwork-io/aws-sample-app/pull/35
* Update deprecated circleci images to latest by @yorinasub17 in https://github.com/gruntwork-io/aws-sample-app/pull/36
* Data source: use aws_subnets over aws_subnet_ids by @rhoboat in https://github.com/gruntwork-io/aws-sample-app/pull/39
* Update PR Template by @rhoboat in https://github.com/gruntwork-io/aws-sample-app/pull/41
* Update PR Template by @rhoboat in https://github.com/gruntwork-io/aws-sample-app/pull/40
* Update CODEOWNERS by @yorinasub17 in https://github.com/gruntwork-io/aws-sample-app/pull/49
* Bump engine.io and socket.io by @dependabot in https://github.com/gruntwork-io/aws-sample-app/pull/47
* Bump @azure/ms-rest-nodeauth from 2.0.2 to 3.1.1 by @dependabot in https://github.com/gruntwork-io/aws-sample-app/pull/45
* Bump yargs-parser from 16.1.0 to 18.1.3 by @dependabot in https://github.com/gruntwork-io/aws-sample-app/pull/46
* Bump jsdom and jest by @dependabot in https://github.com/gruntwork-io/aws-sample-app/pull/50
* Bump axios from 0.19.2 to 0.21.4 by @dependabot in https://github.com/gruntwork-io/aws-sample-app/pull/48
* Bump json-schema and jsprim by @dependabot in https://github.com/gruntwork-io/aws-sample-app/pull/51
* Use BuildKit pattern for passing secrets by @hongil0316 in https://github.com/gruntwork-io/aws-sample-app/pull/53

* @rhoboat made their first contribution in https://github.com/gruntwork-io/aws-sample-app/pull/39
* @hongil0316 made their first contribution in https://github.com/gruntwork-io/aws-sample-app/pull/53

**Full Changelog**: https://github.com/gruntwork-io/aws-sample-app/compare/v0.0.5...v0.0.6

</div>



## terraform-aws-ci


### [v0.50.11](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.50.11)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/10/2022 | Modules affected: aws-helpers, build-helpers, check-url, circleci-helpers | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.50.11">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Update Centos 7 image used in examples
- Replace &apos;local readonly&apos; with &apos;local -r&apos; in bash scripts



</div>


### [v0.50.10](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.50.10)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/4/2022 | Modules affected: build-helpers | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.50.10">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Improved error handling during cloning of git repositories in `build-packer-artifact`






</div>



## terraform-aws-cis-service-catalog


### [v0.42.0](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.42.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/24/2022 | Modules affected: data-stores/rds, landingzone/account-baseline-app, landingzone/account-baseline-root, landingzone/account-baseline-security | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.42.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Update References to CIS v1.5
- Added support for new AWS region (`me-central-1` UAE) to multiregion modules
- Updated `terraform-aws-security` versions to `v0.66.0`
- Updated `terraform-aws-service-catalog` versions to `v0.98.0`
- Use BuildKit pattern for passing secrets
- Make changes to deprecate set-output command in Github action
- Update dependencies to the latest versions.





</div>



## terraform-aws-ecs


### [v0.34.2](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.34.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/11/2022 | Modules affected: ecs-deploy, ecs-service, ecs-task-scheduler | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.34.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

-  Support ECS Task Scheduling
- Update default branch references (backward compatible)
- Bump docker image from patch to v0.0.6
- Update CODEOWNERS



</div>



## terraform-aws-eks


### [v0.55.2](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.55.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/23/2022 | Modules affected: eks-scripts | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.55.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Install Python libraries as part of install process in `eks-scripts`


</div>


### [v0.55.1](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.55.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/11/2022 | Modules affected: eks-cluster-control-plane | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.55.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fix prefix delegation environment variable


</div>



## terraform-aws-lambda


### [v0.21.2](https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.21.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/21/2022 | Modules affected: lambda | <a href="https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.21.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- Updates the Lambda function resource dependency tree to wait until the policy with the necessary permissions is attached to the IAM role before the function is created.


</div>


### [v0.21.1](https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.21.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/11/2022 | Modules affected: lambda | <a href="https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.21.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Adds a fix through the variable `enable_eni_cleanup` for an intermittent bug where the security group could not be destroyed due to lingering ENIs when the Lambda Function is running in a VPC.




</div>



## terraform-aws-security


### [v0.67.0](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.67.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/29/2022 | Modules affected: ntp | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.67.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- Switching NTP to chrony and configuring


</div>


### [v0.66.0](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.66.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/17/2022 | Modules affected: codegen/generator, aws-config-multi-region, ebs-encryption-multi-region, guardduty-multi-region | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.66.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- Added support for new AWS region (`me-central-1` UAE) to multi-region modules. As a result, you will need to add this region to your list of region providers.
- Changed the `codegen` behavior to use the new Gruntwork Supported AWS Regions whitelist.




</div>


### [v0.65.10](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.65.10)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/4/2022 | Modules affected: iam-users | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.65.10">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Updated IAM user login profiles to include lifecycle rules for importing login profiles without password information

Note: Previously, importing aws_iam_user_login_profiles would trigger a password reset and IAM resource recreation. Now, the password and PGP fields will be ignored when importing.



</div>



## terraform-aws-server


### [v0.15.3](https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.15.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/28/2022 | Modules affected: attach-eni, persistent-ebs-volume | <a href="https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.15.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Converted Packer examples from json to hcl




</div>


### [v0.15.2](https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.15.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/23/2022 | Modules affected: single-server | <a href="https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.15.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Added `user_data_replace_on_change` var to allow for enabling or disabling the EC2 auto-replace when a change is made to user-data



</div>



## terraform-aws-service-catalog


### [v0.99.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.99.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/24/2022 | Modules affected: services/k8s-service, services/eks-cluster, services/eks-core-services, services/eks-workers | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.99.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Add subPath processing for ConfigMaps and Secrets
- Update `terraform-aws-eks` to `v0.55.2` - fix Python dependency issue with new AWS EKS optimized AMIs
- Add patch for CIS RDS module



</div>


### [v0.98.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.98.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/22/2022 | Modules affected: base/ec2-baseline, data-stores/rds, data-stores/s3-bucket, landingzone/account-baseline-app | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.98.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Added support for new AWS region (`me-central-1` UAE) to multiregion modules.
- Updated `terraform-aws-security` versions to `v0.66.0`.
- Use BuildKit pattern for passing secrets.



</div>


### [v0.97.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.97.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/16/2022 | Modules affected: services/eks-cluster, services/eks-workers, services/eks-core-services, services/k8s-service | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.97.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Added support for Kubernetes 1.23.
- Bump `helm-kubernetes-services` to `v0.2.16`.
- Make changes to deprecate set-output command in Github action.
- Bump `github.com/gruntwork-io/terraform-aws-security` to `v0.65.10`.
- Allow configuring EKS worker `instance_root_volume_name`.
 


</div>


### [v0.96.9](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.96.9)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/4/2022 | Modules affected: services/helm-service | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.96.9">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- New Helm chart wrapper module that allows you to deploy arbitrary Helm charts using Terraform.


</div>


### [v0.96.8](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.96.8)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/1/2022 | Modules affected: networking | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.96.8">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Allow public subnets in VPCs to auto-assign public IPs, if desired



</div>



## terraform-aws-static-assets


### [v0.15.9](https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.15.9)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/11/2022 | Modules affected: s3-cloudfront | <a href="https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.15.9">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Add optional ordered_cache_behavior to modules/s3-cloudfront



</div>

<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "releases",
  "hash": "e4881a9c09186d88c722af36b231c17b"
}
##DOCS-SOURCER-END -->

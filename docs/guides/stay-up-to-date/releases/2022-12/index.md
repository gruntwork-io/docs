
# Gruntwork release 2022-12

<p style={{marginTop: "-25px"}}><small><a href="/guides">Guides</a> / <a href="/guides/stay-up-to-date">Update Guides</a> / <a href="/guides/stay-up-to-date/releases">Releases</a> / 2022-12</small></p>

This page is lists all the updates to the [Gruntwork Infrastructure as Code
Library](https://gruntwork.io/infrastructure-as-code-library/) that were released in 2022-12. For instructions
on how to use these updates in your code, check out the [updating
documentation](/library/stay-up-to-date/updating).

Here are the repos that were updated:

- [repo-copier](#repo-copier)
- [terraform-aws-ci](#terraform-aws-ci)
- [terraform-aws-cis-service-catalog](#terraform-aws-cis-service-catalog)
- [terraform-aws-lambda](#terraform-aws-lambda)
- [terraform-aws-load-balancer](#terraform-aws-load-balancer)
- [terraform-aws-security](#terraform-aws-security)
- [terraform-aws-service-catalog](#terraform-aws-service-catalog)
- [terraform-aws-vpc](#terraform-aws-vpc)


## repo-copier


### [v0.1.1](https://github.com/gruntwork-io/repo-copier/releases/tag/v0.1.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/1/2022 | <a href="https://github.com/gruntwork-io/repo-copier/releases/tag/v0.1.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
* Create CODEOWNERS by @rhoboat in https://github.com/gruntwork-io/repo-copier/pull/120
* Use terratest_log_parser to summarize test results in circleci by @yorinasub17 in https://github.com/gruntwork-io/repo-copier/pull/119
* Update CODEOWNERS by @yorinasub17 in https://github.com/gruntwork-io/repo-copier/pull/121
* Use BuildKit pattern for passing secrets by @hongil0316 in https://github.com/gruntwork-io/repo-copier/pull/122
* Update Golang version. Fix tests. by @levkoburburas in https://github.com/gruntwork-io/repo-copier/pull/126
* Fix stack overflow error by @levkoburburas in https://github.com/gruntwork-io/repo-copier/pull/127
* Configure visibility for repositories by @levkoburburas in https://github.com/gruntwork-io/repo-copier/pull/130
* Fix stack overflow error (merge to master) by @levkoburburas in https://github.com/gruntwork-io/repo-copier/pull/129
* Configure visibility for repositories, additional option &quot;internal&quot; by @levkoburburas in https://github.com/gruntwork-io/repo-copier/pull/132
* Add --repo-name-prefix option by @edgeb1-roche in https://github.com/gruntwork-io/repo-copier/pull/128
* Fix build failure by @levkoburburas in https://github.com/gruntwork-io/repo-copier/pull/136

**Full Changelog**: https://github.com/gruntwork-io/repo-copier/compare/v0.1.0...v0.1.1

</div>



## terraform-aws-ci


### [v0.50.12](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.50.12)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/1/2022 | Modules affected: ecs-deploy-runner, gruntwork-module-circleci-helpers | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.50.12">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Use BuildKit pattern for passing secrets in the CircleCI build **[BACKWARD INCOMPATIBLE]**
- Fix intermittent test failure
- Use main branch in deploy-runner docker image
- Fix installing `gox` in Go 1.17 and newer





</div>



## terraform-aws-cis-service-catalog


### [v0.42.5](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.42.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/14/2022 | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.42.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Move the generated `.tflint.hcl` by the `tflint` patch to be at the root level, instead of at the module directory level.



</div>


### [v0.42.4](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.42.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/14/2022 | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.42.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fix tflint patch to add block for including the parent TG config


</div>


### [v0.42.3](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.42.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/14/2022 | Modules affected: N.A. | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.42.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- Add patch for tflint hook setup for CIS RefArch users






</div>


### [v0.42.2](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.42.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/9/2022 | Modules affected: tflint-ruleset-aws-cis | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.42.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fix project&apos;s name on goreleaser. Also added docs for the CIDR block rule.



</div>


### [v0.42.1](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.42.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/9/2022 | Modules affected: tflint-ruleset-aws-cis | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.42.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- New golang module: `tflint-ruleset-aws-cis`. It will be used to validate CIDR blocks.



</div>



## terraform-aws-lambda


### [v0.21.4](https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.21.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/15/2022 | Modules affected: lambda-edge, lambda | <a href="https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.21.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fixes perpetual diff issue on `terragrunt plan` when using relative paths for the Lambda function&apos;s source path, and adds the option to configure the files to exclude when zipping the Lambda&apos;s code



</div>


### [v0.21.3](https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.21.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/2/2022 | Modules affected: lambda | <a href="https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.21.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fixes permissions for Lambda&apos;s ENI management when running in VPC.



</div>



## terraform-aws-load-balancer


### [v0.29.3](https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.29.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/1/2022 | Modules affected: alb | <a href="https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.29.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Deprecate `vpc_id` variable



</div>



## terraform-aws-security


### [v0.67.1](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.67.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/14/2022 | Modules affected: ntp, private-s3-bucket | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.67.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- `ntp`
- `private-s3-bucket`


- Add explanation of why Chrony in a module called NTP
- Adding bucket_key_enabled option to S3 module


Special thanks to the following user for their contribution!

- @nniehoff



- https://github.com/gruntwork-io/terraform-aws-security/pull/733
- https://github.com/gruntwork-io/terraform-aws-security/pull/734



</div>



## terraform-aws-service-catalog


### [v0.99.2](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.99.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/16/2022 | Modules affected: mgmt | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.99.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- Update the CIS RDS Patch to include state migrations
- IMDSv1 passthru variable for ASG launch configurations



</div>


### [v0.99.1](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.99.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/8/2022 | Modules affected: services/eks-workers | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.99.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Add `Name` tag (cluster name) for managed EKS workers



</div>



## terraform-aws-vpc


### [v0.22.4](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.22.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/9/2022 | Modules affected: vpc-flow-logs | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.22.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Updating terraform-aws-security to latest version: When the flow-logs module was instantiate, and an S3 bucket was created, a warning about a deprecated attribute was thrown. Updating the version of the upstream code.
```
│ Warning: Argument is deprecated
│ 
│   with module.vpc_flow_log.module.s3_bucket.aws_s3_bucket.bucket,
│   on .terraform/modules/vpc_flow_log.s3_bucket/modules/private-s3-bucket/main.tf line 19, in resource &quot;aws_s3_bucket&quot; &quot;bucket&quot;:
│   19: resource &quot;aws_s3_bucket&quot; &quot;bucket&quot; &#x7B;
│ 
│ Use the top-level parameter object_lock_enabled and the
│ aws_s3_bucket_object_lock_configuration resource instead
```



</div>

<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "releases",
  "hash": "bdb34f6b52b71c49121027e42bb086f8"
}
##DOCS-SOURCER-END -->

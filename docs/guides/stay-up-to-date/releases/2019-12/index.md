
# Gruntwork release 2019-12

<p style={{marginTop: "-25px"}}><small><a href="/guides">Guides</a> / <a href="/guides/stay-up-to-date">Update Guides</a> / <a href="/guides/stay-up-to-date/releases">Releases</a> / 2019-12</small></p>

This page is lists all the updates to the [Gruntwork Infrastructure as Code
Library](https://gruntwork.io/infrastructure-as-code-library/) that were released in 2019-12. For instructions
on how to use these updates in your code, check out the [updating
documentation](/library/stay-up-to-date/updating).

Here are the repos that were updated:

- [boilerplate](#boilerplate)
- [infrastructure-live-acme](#infrastructure-live-acme)
- [infrastructure-live-multi-account-acme](#infrastructure-live-multi-account-acme)
- [infrastructure-modules-acme](#infrastructure-modules-acme)
- [infrastructure-modules-multi-account-acme](#infrastructure-modules-multi-account-acme)
- [terraform-aws-ci](#terraform-aws-ci)
- [terraform-aws-cis-service-catalog](#terraform-aws-cis-service-catalog)
- [terraform-aws-data-storage](#terraform-aws-data-storage)
- [terraform-aws-eks](#terraform-aws-eks)
- [terraform-aws-lambda](#terraform-aws-lambda)
- [terraform-aws-load-balancer](#terraform-aws-load-balancer)
- [terraform-aws-messaging](#terraform-aws-messaging)
- [terraform-aws-monitoring](#terraform-aws-monitoring)
- [terraform-aws-security](#terraform-aws-security)
- [terraform-aws-server](#terraform-aws-server)
- [terraform-aws-static-assets](#terraform-aws-static-assets)
- [terraform-aws-utilities](#terraform-aws-utilities)
- [terraform-aws-vpc](#terraform-aws-vpc)


## boilerplate


### [v0.2.26](https://github.com/gruntwork-io/boilerplate/releases/tag/v0.2.26)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/17/2019 | <a href="https://github.com/gruntwork-io/boilerplate/releases/tag/v0.2.26">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/boilerplate/pull/54: Introduce `include`, a helper function that will render another file through the templating engine and output the contents.

</div>



## infrastructure-live-acme


### [v0.0.1](https://github.com/gruntwork-io/infrastructure-live-acme/releases/tag/v0.0.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/11/2019 | <a href="https://github.com/gruntwork-io/infrastructure-live-acme/releases/tag/v0.0.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  (no release notes found)

</div>



## infrastructure-live-multi-account-acme


### [v0.0.1](https://github.com/gruntwork-io/infrastructure-live-multi-account-acme/releases/tag/v0.0.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/11/2019 | <a href="https://github.com/gruntwork-io/infrastructure-live-multi-account-acme/releases/tag/v0.0.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  (no release notes found)

</div>



## infrastructure-modules-acme


### [v0.0.1](https://github.com/gruntwork-io/infrastructure-modules-acme/releases/tag/v0.0.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/17/2019 | <a href="https://github.com/gruntwork-io/infrastructure-modules-acme/releases/tag/v0.0.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Since this repo is solely used for examples/demonstrations, and NOT meant for direct production use, we simply publish all changes at v0.0.1.

</div>



## infrastructure-modules-multi-account-acme


### [v0.0.1](https://github.com/gruntwork-io/infrastructure-modules-multi-account-acme/releases/tag/v0.0.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/17/2019 | <a href="https://github.com/gruntwork-io/infrastructure-modules-multi-account-acme/releases/tag/v0.0.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Since this repo is solely used for examples/demonstrations, and NOT meant for direct production use, we simply publish all changes at v0.0.1.

</div>



## terraform-aws-ci


### [v0.16.2](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.16.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/14/2019 | Modules affected: ec2-backup | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.16.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Updated the `ec2-backup` module to run on NodeJS 12 instead of 8, as version 8 is going EOL in February, 2020.


</div>


### [v0.16.1](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.16.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/12/2019 | Modules affected: terraform-helpers | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.16.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

This release fixes two bugs with `terraform-update-variable`:

- Fixes bug where errors with running `terraform fmt` caused the tfvars file to be cleared out.
- Fixes bug where string matching for the variable name was too relaxed, causing it to ignore prefixes. E.g `tag` would match both `tag` and `canary_tag`.




</div>



## terraform-aws-cis-service-catalog


### [v0.3.0](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.3.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/20/2019 | Modules affected: cloudtrail, cloudwatch-logs-metric-filters, aws-securityhub | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.3.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  


</div>


### [v0.2.2](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.2.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/18/2019 | Modules affected: custom-iam-entity | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.2.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

`custom-iam-entity` module now supports creating policies to grant full access to arbitrary services that may not have AWS managed policies.



</div>


### [v0.2.1](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.2.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/18/2019 | Modules affected: custom-iam-entity | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.2.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

Bump module-security `custom-iam-entity` to latest version to pull in fix for newer versions of terraform.



</div>


### [v0.2.0](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.2.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/17/2019 | Modules affected: iam-password-policy | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.2.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

`iam-password-policy` module no longer embeds the provider configuration, similar to the other modules in this repository. This allows users to better customize the provider setup.


</div>


### [v0.1.1](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.1.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/17/2019 | Modules affected: cloudtrail, generate-aws-config, aws-config | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.1.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

This release includes the following bug fixes:
- Address `terraform` deprecation warnings in the `aws-config` module caused by referring to providers as strings.
- Fix bug where `cloudtrail` module can fail as it attempts to create the access logging bucket even when `s3_bucket_already_exists` is set to `true`.



</div>


### [v0.1.0](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.1.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/5/2019 | Modules affected: generate-aws-config, aws-config | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.1.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

Starting this release, the `generate-aws-config` should no longer be used to manage your AWS Config configurations. Instead, use the newly introduced `aws-config` terraform module, which will properly handle the enabled regions without relying on code generation. This module is a version of the generated module from `generate-aws-config` with the ability to disable module calls for regions that are opted out.



</div>



## terraform-aws-data-storage


### [v0.11.1](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.11.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/11/2019 | Modules affected: lambda-cleanup-snapshots | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.11.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

Fix bug where the clean up snapshots Lambda function did not get the right permissions due to a misconfiguration of the `DescribeDBClusterSnapshots` IAM policy.



</div>


### [v0.11.0](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.11.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/4/2019 | Modules affected: aurora | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.11.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- The `aurora` module now configures cluster instances with (a) `create_before_destroy = true`, to ensure new instances are created before old ones are removed and (b) `ignore_changes = [engine_version]`, to ensure updates to `engine_version` will [flow from the aws_rds_cluster](https://github.com/terraform-providers/terraform-provider-aws/issues/9401).



</div>



## terraform-aws-eks


### [v0.11.1](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.11.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/16/2019 | Modules affected: eks-alb-ingress-controller | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.11.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

You can now provide lifecycle hooks to the `eks-alb-ingress-controller` module to execute arbitrary code on destroy of the module.



</div>


### [v0.11.0](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.11.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/4/2019 | Modules affected: eks-vpc-tags | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.11.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

The VPC subnet tags generated for EKS by `eks-vpc-tags` now supports multiple EKS clusters.


</div>



## terraform-aws-lambda


### [v0.7.1](https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.7.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/6/2019 | Modules affected: lambda, lambda-edge | <a href="https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.7.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- You can now add tags to your Lambda functions using the new `tags` input variable on the `lambda` and `lambda-edge` modules.


</div>



## terraform-aws-load-balancer


### [v0.16.2](https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.16.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/9/2019 | Modules affected: acm-tls-certificate | <a href="https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.16.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
* `acm-tls-certificate`


* This release makes the ACM certificate validation creation optional in `acm-tls-certificate`.


Special thanks to @scottclk for the contribution!


* https://github.com/gruntwork-io/module-load-balancer/pull/70

</div>


### [v0.16.1](https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.16.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/2/2019 | Modules affected: acm-tls-certificate | <a href="https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.16.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
* `acm-tls-certificate`


* This release makes Route53 verification record creation optional in `acm-tls-certificate`.


Special thanks to @scottclk for the contribution!


* #68 

</div>



## terraform-aws-messaging


### [v0.3.1](https://github.com/gruntwork-io/terraform-aws-messaging/releases/tag/v0.3.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/19/2019 | Modules affected: sns | <a href="https://github.com/gruntwork-io/terraform-aws-messaging/releases/tag/v0.3.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Adds a `create_resources` boolean flag, which works similarly as setting `count` to 1 or 0, which is necessary as terraform does not yet support this feature for modules.



</div>



## terraform-aws-monitoring


### [v0.15.0](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.15.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/20/2019 | Modules affected: logs/cloudwatch-logs-metric-filters | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.15.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

The `cloudwatch-logs-metric-filters` module no longer configures an aws provider, and thus no longer needs the `aws_region` input variable. This also means that you will need to configure your provider outside of the module, which in turn allows you to customize the provider to your needs.



</div>



## terraform-aws-security


### [v0.22.0](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.22.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/20/2019 | Modules affected: cloudtrail, ssh-grunt, aws-organizations, aws-organizations-config-rules | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.22.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

This release includes:

- Fixes to documentation and variable descriptions
- Remove the unneeded `aws_region` variable in the `cloudtrail` module. This variable was not used in the module, so you can safely omit it from the module parameters.



</div>


### [v0.21.4](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.21.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/18/2019 | Modules affected: custom-iam-entity | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.21.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

`custom-iam-entity` module now supports creating policies to grant full access to arbitrary services that may not have AWS managed policies.



</div>


### [v0.21.3](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.21.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/17/2019 | Modules affected: cloudtrail | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.21.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

The `cloudtrail` module will no longer attempt to create the server access logging S3 bucket if `s3_bucket_already_exists` is set to `true`, even if `enable_s3_server_access_logging` is `true`.



</div>


### [v0.21.2](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.21.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/13/2019 | Modules affected: aws-organizations-config-rules | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.21.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- `aws-organizations-config-rules` **[NEW]**



- New `aws-organizations-config-rules` module allows you to configure a best-practices set of AWS Organization level managed config rules



- https://github.com/gruntwork-io/module-security/pull/196


</div>


### [v0.21.1](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.21.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/11/2019 | Modules affected: aws-organizations | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.21.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- `aws-organizations` **[NEW]**


- New AWS Organizations module allows you to create and manage your AWS Organization and child AWS accounts as code.


- https://github.com/gruntwork-io/module-security/pull/194


</div>


### [v0.21.0](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.21.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/5/2019 | Modules affected: aws-config | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.21.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

`aws-config` module now supports conditional logic to turn off all resources in the module. When you set the `create_resources` input variable to `false`, no resources will be created by the module. This is useful to conditionally turn off the module call in your code.

Additionally, this fixes a bug where the AWS provider was being configured within the `aws-config` module. This makes the module less flexible for use since you can&apos;t override the provider configuration. As a result, the `aws-config` module no longer needs the `aws_region` parameter to be passed in.


</div>



## terraform-aws-server


### [v0.7.6: Introduce variable to enable detailed monitoring](https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.7.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/17/2019 | Modules affected: single-server | <a href="https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.7.6">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- The `single-server` module accepts a new variable, `monitoring` which determines whether the instance has [detailed monitoring](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-cloudwatch-new.html) enabled. Note that enabling detailed monitoring results in additional costs. See the [CloudWatch Pricing page](https://aws.amazon.com/cloudwatch/pricing/) for details.



</div>



## terraform-aws-static-assets


### [v0.5.7](https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.5.7)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/18/2019 | Modules affected: s3-cloudfront | <a href="https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.5.7">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- `s3-cloudfront`


- Use new input variable `wait_for_deployment` to tell Terraform whether it should wait for Cloudfront to finish deploying the distribution. If `true`, the module will wait for the distribution status to change from `InProgress` to `Deployed`. Setting this to `false` will skip the process. 


* Thank you to @danakim for the PR!


- https://github.com/gruntwork-io/package-static-assets/pull/36



</div>


### [v0.5.6](https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.5.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/11/2019 | Modules affected: s3-cloudfront | <a href="https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.5.6">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Due to a change in AWS, the `s3-cloudfront` module was not able to send CloudFront access logs to the S3 bucket. This has now been fixed by updating the policy on that S3 bucket. Note that due to a Terraform or AWS bug, you need to set `use_cloudfront_arn_for_bucket_policy` to `true` in old AWS accounts and `use_cloudfront_arn_for_bucket_policy` to `false` in old accounts, or you&apos;ll get a perpetual diff from the `plan` output. 



</div>



## terraform-aws-utilities


### [v0.1.5](https://github.com/gruntwork-io/terraform-aws-utilities/releases/tag/v0.1.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/19/2019 | <a href="https://github.com/gruntwork-io/terraform-aws-utilities/releases/tag/v0.1.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- `run-pex-as-resource`


`run-pex-as-resource` now supports configuring a `destroy` provisioner that runs the pex on destroy of the resource.


- https://github.com/gruntwork-io/package-terraform-utilities/pull/22

</div>


### [v0.1.4](https://github.com/gruntwork-io/terraform-aws-utilities/releases/tag/v0.1.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/5/2019 | <a href="https://github.com/gruntwork-io/terraform-aws-utilities/releases/tag/v0.1.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- `enabled-aws-regions` [**NEW**]


This release introduces the `enabled-aws-regions` module, which returns all enabled regions for an account. This is useful for designing modules that need to enable a specific resource or module on all regions of the account.


- https://github.com/gruntwork-io/package-terraform-utilities/pull/21

</div>



## terraform-aws-vpc


### [v0.7.8](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.7.8)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/14/2019 | Modules affected: vpc-mgmt, vpc-app | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.7.8">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

This release introduces the ability to tag just the VPC, but not any of the other resources in the module using the `vpc_custom_tags` input variable.



</div>

<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "releases",
  "hash": "435f1ee7adb617da0545056e48aa5676"
}
##DOCS-SOURCER-END -->

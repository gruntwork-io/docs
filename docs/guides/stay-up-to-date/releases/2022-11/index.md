
# Gruntwork release 2022-11

<p style={{marginTop: "-25px"}}><small><a href="/guides">Guides</a> / <a href="/guides/stay-up-to-date">Update Guides</a> / <a href="/guides/stay-up-to-date/releases">Releases</a> / 2022-11</small></p>

This page is lists all the updates to the [Gruntwork Infrastructure as Code 
Library](https://gruntwork.io/infrastructure-as-code-library/) that were released in 2022-11. For instructions 
on how to use these updates in your code, check out the [updating 
documentation](/guides/working-with-code/using-modules#updating).

Here are the repos that were updated:

- [terraform-aws-ci](#terraform-aws-ci)
- [terraform-aws-ecs](#terraform-aws-ecs)
- [terraform-aws-eks](#terraform-aws-eks)
- [terraform-aws-lambda](#terraform-aws-lambda)
- [terraform-aws-security](#terraform-aws-security)
- [terraform-aws-service-catalog](#terraform-aws-service-catalog)
- [terraform-aws-static-assets](#terraform-aws-static-assets)


## terraform-aws-ci


### [v0.50.11](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.50.11)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/10/2022 | Modules affected: aws-helpers, build-helpers, check-url, circleci-helpers | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.50.11">Release notes</a></small>
</p>



- Update Centos 7 image used in examples
- Replace 'local readonly' with 'local -r' in bash scripts




### [v0.50.10](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.50.10)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/4/2022 | Modules affected: build-helpers | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.50.10">Release notes</a></small>
</p>



- Improved error handling during cloning of git repositories in `build-packer-artifact`








## terraform-aws-ecs


### [v0.34.2](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.34.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/11/2022 | Modules affected: ecs-deploy, ecs-service, ecs-task-scheduler | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.34.2">Release notes</a></small>
</p>



-  Support ECS Task Scheduling
- Update default branch references (backward compatible)
- Bump docker image from patch to v0.0.6
- Update CODEOWNERS





## terraform-aws-eks


### [v0.55.1](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.55.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/11/2022 | Modules affected: eks-cluster-control-plane | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.55.1">Release notes</a></small>
</p>



- Fix prefix delegation environment variable




## terraform-aws-lambda


### [v0.21.1](https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.21.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/11/2022 | Modules affected: lambda | <a href="https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.21.1">Release notes</a></small>
</p>



- Adds a fix through the variable `enable_eni_cleanup` for an intermittent bug where the security group could not be destroyed due to lingering ENIs when the Lambda Function is running in a VPC.






## terraform-aws-security


### [v0.66.0](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.66.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/17/2022 | Modules affected: codegen/generator, aws-config-multi-region, ebs-encryption-multi-region, guardduty-multi-region | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.66.0">Release notes</a></small>
</p>


- Added support for new AWS region (`me-central-1` UAE) to multi-region modules. As a result, you will need to add this region to your list of region providers.
- Changed the `codegen` behavior to use the new Gruntwork Supported AWS Regions whitelist.





### [v0.65.10](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.65.10)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/4/2022 | Modules affected: iam-users | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.65.10">Release notes</a></small>
</p>



- Updated IAM user login profiles to include lifecycle rules for importing login profiles without password information

Note: Previously, importing aws_iam_user_login_profiles would trigger a password reset and IAM resource recreation. Now, the password and PGP fields will be ignored when importing.





## terraform-aws-service-catalog


### [v0.97.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.97.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/16/2022 | Modules affected: services/eks-cluster, services/eks-workers, services/eks-core-services, services/k8s-service | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.97.0">Release notes</a></small>
</p>



- Added support for Kubernetes 1.23.
- Bump `helm-kubernetes-services` to `v0.2.16`.
- Make changes to deprecate set-output command in Github action.
- Bump `github.com/gruntwork-io/terraform-aws-security` to `v0.65.10`.
- Allow configuring EKS worker `instance_root_volume_name`.
 



### [v0.96.9](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.96.9)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/4/2022 | Modules affected: services/helm-service | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.96.9">Release notes</a></small>
</p>



- New Helm chart wrapper module that allows you to deploy arbitrary Helm charts using Terraform.



### [v0.96.8](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.96.8)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/1/2022 | Modules affected: networking | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.96.8">Release notes</a></small>
</p>



- Allow public subnets in VPCs to auto-assign public IPs, if desired





## terraform-aws-static-assets


### [v0.15.9](https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.15.9)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/11/2022 | Modules affected: s3-cloudfront | <a href="https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.15.9">Release notes</a></small>
</p>



- Add optional ordered_cache_behavior to modules/s3-cloudfront






<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "releases",
  "hash": "71a32e7cb4a898195cebd7be78c321ec"
}
##DOCS-SOURCER-END -->

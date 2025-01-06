
# Gruntwork release 2022-05

<p style={{marginTop: "-25px"}}><small><a href="/guides">Guides</a> / <a href="/guides/stay-up-to-date">Update Guides</a> / <a href="/guides/stay-up-to-date/releases">Releases</a> / 2022-05</small></p>

This page is lists all the updates to the [Gruntwork Infrastructure as Code
Library](https://gruntwork.io/infrastructure-as-code-library/) that were released in 2022-05. For instructions
on how to use these updates in your code, check out the [updating
documentation](/library/stay-up-to-date/updating).

Here are the repos that were updated:

- [gruntwork](#gruntwork)
- [repo-copier](#repo-copier)
- [terraform-aws-ci](#terraform-aws-ci)
- [terraform-aws-ci-steampipe](#terraform-aws-ci-steampipe)
- [terraform-aws-cis-service-catalog](#terraform-aws-cis-service-catalog)
- [terraform-aws-data-storage](#terraform-aws-data-storage)
- [terraform-aws-ecs](#terraform-aws-ecs)
- [terraform-aws-eks](#terraform-aws-eks)
- [terraform-aws-lambda](#terraform-aws-lambda)
- [terraform-aws-messaging](#terraform-aws-messaging)
- [terraform-aws-openvpn](#terraform-aws-openvpn)
- [terraform-aws-security](#terraform-aws-security)
- [terraform-aws-server](#terraform-aws-server)
- [terraform-aws-service-catalog](#terraform-aws-service-catalog)
- [terraform-aws-static-assets](#terraform-aws-static-assets)
- [terraform-aws-utilities](#terraform-aws-utilities)


## gruntwork


### [v0.3.7](https://github.com/gruntwork-io/gruntwork/releases/tag/v0.3.7)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/17/2022 | <a href="https://github.com/gruntwork-io/gruntwork/releases/tag/v0.3.7">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Fix a bug in the `gruntwork wizard` command where declining the AWS account grants wizard would lead to a nil pointer dereference. 

</div>


### [v0.3.6](https://github.com/gruntwork-io/gruntwork/releases/tag/v0.3.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/13/2022 | <a href="https://github.com/gruntwork-io/gruntwork/releases/tag/v0.3.6">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Update the `gruntwork wizard` command to reuse as many questions as possible. Specifically, the wizard will now:

- Only ask for the `region` once.
- Only ask for the VCS platform once.
- Only ask for the repo name instead of the URL.
- Allow user to abort to before grant operation, and then reuse the account information to resume granting.

</div>


### [v0.3.5](https://github.com/gruntwork-io/gruntwork/releases/tag/v0.3.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/13/2022 | <a href="https://github.com/gruntwork-io/gruntwork/releases/tag/v0.3.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Update the gruntwork wizard experience with improved interactivity, better explanations for variables, and many miscellaneous bug fixes to improve the process of using the wizard to prepare for a Reference Architecture deployment. 

</div>


### [v0.3.4](https://github.com/gruntwork-io/gruntwork/releases/tag/v0.3.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/10/2022 | <a href="https://github.com/gruntwork-io/gruntwork/releases/tag/v0.3.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Fix bug where the IAM policy for granting Gruntwork access was malformed JSON.

</div>


### [v0.3.3](https://github.com/gruntwork-io/gruntwork/releases/tag/v0.3.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/10/2022 | <a href="https://github.com/gruntwork-io/gruntwork/releases/tag/v0.3.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  This release updates the `boilerplate` references for the special branch we&apos;re using for the updated Gruntwork wizard experience



</div>


### [v0.3.2](https://github.com/gruntwork-io/gruntwork/releases/tag/v0.3.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/9/2022 | <a href="https://github.com/gruntwork-io/gruntwork/releases/tag/v0.3.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  This release fixed the following bugs in the form filling process:
- Broken reference field for `VCSPATSecretsManagerARN`
- Account IDs were being interpreted as numbers, failing validation checks.
- `UsingCISCompliance` was being rendered incorrectly in the form.

</div>


### [v0.3.1](https://github.com/gruntwork-io/gruntwork/releases/tag/v0.3.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/9/2022 | <a href="https://github.com/gruntwork-io/gruntwork/releases/tag/v0.3.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  This release adds a new command, `gruntwork form fill`, can assist you in filling in your `reference-architecture-form.yml` when preparing for a Reference Architecture deployment.  The same functionality has also been added to the `gruntwork wizard` experience, as an optional step to complete when preparing for a deployment.

</div>


### [v0.3.0](https://github.com/gruntwork-io/gruntwork/releases/tag/v0.3.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/3/2022 | <a href="https://github.com/gruntwork-io/gruntwork/releases/tag/v0.3.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/gruntwork/pull/88: Gruntwork is now handling Reference Architecture deploys from Gruntwork Pipelines internally. This means that we are now transitioning to an IAM role being the one assuming the Gruntwork admin role rather than users, and thus it will not be possible to guard the IAM role with MFA.

Note that IAM users in the Gruntwork AWS Account are required to have MFA to assume roles.

</div>



## repo-copier


### [v0.0.26](https://github.com/gruntwork-io/repo-copier/releases/tag/v0.0.26)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/23/2022 | <a href="https://github.com/gruntwork-io/repo-copier/releases/tag/v0.0.26">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

</div>



## terraform-aws-ci


### [v0.48.1](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.48.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/26/2022 | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.48.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
Minor update, all related to testing module upgrades to make our builds more stable across Gruntwork&apos;s IaC library.

- Remove dead code from upgrade test.
- Update PR Template
- Make upgrade module testing function public.


</div>


### [v0.48.0](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.48.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/24/2022 | Modules affected: ec2-backup, ecs-deploy-runner-invoke-iam-policy, ecs-deploy-runner, iam-policies | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.48.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Remove dep tests and config. This just removes some old tests that are no longer needed.
- **Unlock AWS provider v4. Require minimum 3.75.1.** This update includes a few tests that make sure upgrading to this module from the last release is easy. However, you may need to bump your AWS provider version. See the migration guide notes below for more.


</div>


### [v0.47.11](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.47.11)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/17/2022 | Modules affected: infrastructure-deployer | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.47.11">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Moved `--no-wait` check to before waiting for ECS task to start. Now when you pass in `--no-wait`, the `infrastructure-deployer` will immediately exit after invoking the lambda function.
- Updated examples to be compatible with AWS Provider v4.




</div>


### [v0.47.10](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.47.10)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/3/2022 | Modules affected: sign-binary-helpers, ecs-deploy-runner-standard-configuration, ecs-deploy-runner | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.47.10">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Updated `sign-binary` utility to pass sensitive files through `stdin`.
- Updated the `docker-image-builder` component of ECS Deploy Runner to support assuming IAM roles for cross account docker image builds.





</div>



## terraform-aws-ci-steampipe


### [v0.2.0](https://github.com/gruntwork-io/terraform-aws-ci-steampipe/releases/tag/v0.2.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/9/2022 | Modules affected: steampipe-runner | <a href="https://github.com/gruntwork-io/terraform-aws-ci-steampipe/releases/tag/v0.2.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

Updated the default version of Steampipe that is installed in the `steampipe-runner` container to `v0.13.6`.

</div>



## terraform-aws-cis-service-catalog


### [v0.35.0](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.35.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/10/2022 | Modules affected: landingzone/account-baseline-app, landingzone/account-baseline-root, landingzone/account-baseline-security, networking/vpc | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.35.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- Updated `vpc`, `vpc-mgmt` modules to support tagging of route tables.
    - If you&apos;d like to configure tagging, set `public_route_table_custom_tags`, `private_app_route_table_custom_tags`, and `private_persistence_route_table_custom_tags`.
- These dependencies were updated:
    - `terraform-aws-service-catalog` `v0.85.2` =&gt; `v0.86.1`.
        - [`v0.86.0`](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.86.0) requires minimum AWS provider version 3.75.0 for several modules.
    - `terraform-aws-vpc` `v0.20.4` =&gt; `v0.21.1`.
        - [`v0.21.0`](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.21.0) requires minimum AWS provider version 3.75.0 for `vpc-flow-logs`.
    - `terraform-aws-monitoring` to `v0.33.3`.
        - [`v0.33.0`](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.33.0) requires minimum AWS provider version 3.75.0 for `logs/load-balancer-access-logs`.
    - `terraform-aws-security` to `v0.64.1`.
        - [`v0.64.0`](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.64.0) introduces managed IAM policies.
        - [`v0.63.0`](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.63.0) requires minimum AWS provider version 3.75.0 for several modules.
- Exposed backward compatibility flags in LZ modules.



</div>



## terraform-aws-data-storage


### [v0.23.4](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.23.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/13/2022 | Modules affected: lambda-share-snapshot | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.23.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Updated ARNs to be partition-aware
- Updated examples to use aws_subnets over aws_subnet_ids




</div>



## terraform-aws-ecs


### [v0.33.1](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.33.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/23/2022 | Modules affected: ecs-cluster | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.33.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Added the ability to configure `http_put_response_hop_limit` on the metadata configuration.



</div>


### [v0.33.0](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.33.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/19/2022 | Modules affected: ecs-cluster, ecs-daemon-service, ecs-deploy-check-binaries, ecs-service | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.33.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Support for `python2.7` has been dropped from the modules where `python` was being used. You must have `python3.5` or greater installed on the operator machine (where `terraform` is being called), and the `python3` executable must be available on your `PATH`.




</div>



## terraform-aws-eks


### [v0.51.4](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.51.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/19/2022 | Modules affected: eks-aws-auth-merger | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.51.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Updated package dependencies of `eks-aws-auth-merger`.



</div>



## terraform-aws-lambda


### [v0.19.0](https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.19.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/23/2022 | Modules affected: lambda-http-api-gateway, run-lambda-entrypoint, api-gateway-proxy | <a href="https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.19.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Added a new module (`lambda-http-api-gateway`) for configuring an AWS HTTP (V2) API Gateway hooked up to different Lambda functions. Unlike `api-gateway-proxy`, this allows you to configure various HTTP requests to invoke different lambda functions (e.g., `GET` request on `/hello` can invoke the `foo` lambda function, while `POST` request on `/hello` can invoke the `bar` lambda function. Refer to [the module documentation](https://github.com/gruntwork-io/terraform-aws-lambda/tree/master/modules/lambda-http-api-gateway) for more information.
- Added a new module (`run-lambda-entrypoint`) that can be used as an entrypoint for container image based Lambda function to expose AWS Secrets Manager secrets as environment variables to the Lambda function. This is useful if you don&apos;t want to leak the Secrets Manager entries into the Lambda function metadata which most traditional integrations will do as they rely on standard Lambda settings like Environment Variables. Refer to [the module documentation](https://github.com/gruntwork-io/terraform-aws-lambda/tree/master/modules/run-lambda-entrypoint) for more information.



</div>



## terraform-aws-messaging


### [v0.8.2](https://github.com/gruntwork-io/terraform-aws-messaging/releases/tag/v0.8.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/31/2022 | Modules affected: msk | <a href="https://github.com/gruntwork-io/terraform-aws-messaging/releases/tag/v0.8.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- New `msk` module for managing Amazon Managed Streaming for Apache Kafka (Amazon MSK)
- Fix typo in documentation
- Update versions of tools in circleci
- Update PR Template


</div>



## terraform-aws-openvpn


### [v0.24.0](https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.24.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/24/2022 | Modules affected: openvpn-server | <a href="https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.24.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- Added a comment indicating that OpenVPN works with both imdsv1 and imdsv2
- **Unlock AWS provider v4. Require minimum 3.75.1.** This update includes a few tests that make sure upgrading to this module from the last release is easy. However, you may need to bump your AWS provider version. See the migration guide notes below for more.


</div>



## terraform-aws-security


### [v0.65.2](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.65.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/25/2022 | Modules affected: aws-config-multi-region, aws-config, cloudtrail, cross-account-iam-roles | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.65.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Updated modules that creates IAM roles to expose the ability to set permission boundaries.



</div>


### [v0.65.1](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.65.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/23/2022 | Modules affected: private-s3-bucket | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.65.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- **Ignore changes to various S3 configuration**: A bug was introduced in our `v0.63.0` release of this repo. When upgrading the `private-s3-bucket` module, a race condition in the plan could leave your S3 bucket in a state where configurations were actually removed. The plan would show in-place updates, but depending on execution order and completion of the AWS API calls, the update to remove the configuration could happen last, thereby removing the configuration on the bucket. While not ideal, you could work around this issue by running `apply` a second time, picking up the discrepancy and adding the configurations back to the bucket, but this update makes it so you don&apos;t have to run `apply` a second time. When upgrading your modules, including making them AWS Provider v4 compatible, we recommend using this `v0.65.1` version. See the PR and associated issue for more details.



</div>


### [v0.65.0](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.65.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/20/2022 | Modules affected: aws-config-bucket, aws-config-multi-region, aws-config-rules, aws-config | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.65.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
The modules list above makes it look like a scary update; however, this should be a no-op upgrade for you. Details below!


</div>



## terraform-aws-server


### [v0.14.4](https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.14.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/19/2022 | Modules affected: ec2-backup, single-server | <a href="https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.14.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Exposed the ability to configure `permissions_boundary` on each of the IAM roles created by the modules.



</div>


### [v0.14.3](https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.14.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/13/2022 | Modules affected: attach-eni | <a href="https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.14.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fixes default route conflict when attaching multiple ENIs on Ubuntu


</div>



## terraform-aws-service-catalog


### [v0.88.2](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.88.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/31/2022 | Modules affected: data-stores | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.88.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Check in simplified pull request template
- Ignore .github folder in pre-commit checks
- Pass variables through for s3 object lock



</div>


### [v0.88.1](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.88.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/23/2022 | Modules affected: services/ecs-service, data-stores/rds | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.88.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Added documentation of lb_listener authenticate_oidc options
- Support enhanced monitoring in the rds module in service catalog



</div>


### [v0.88.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.88.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/18/2022 | Modules affected: mgmt/tailscale-subnet-router | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.88.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Updated Tailscale Subnet Router to not accept DNS. Tailscale recommends having AWS handle DNS configurations on EC2.


</div>


### [v0.87.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.87.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/13/2022 | Modules affected: services/eks-cluster, services/eks-workers, services/eks-core-services, services/k8s-service | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.87.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Added support for Kubernetes 1.22.
- Fixed bug in multi region provider configuration which lead to extended periods of hanging. We recommend reviewing the `providers.tf` and `terragrunt.hcl` in our examples to get the latest version which sets the `skip_get_ec2_platforms = false` for opted out regions.
- Update examples to reflect latest best practices.



</div>


### [v0.86.2](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.86.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/4/2022 | Modules affected: networking/route53 | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.86.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Added ability to create multiple subdomain records of different types for public zones in the `route53` module.




</div>


### [v0.86.1](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.86.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/3/2022 | Modules affected: networking/vpc | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.86.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Exposed route table tagging variables in `vpc` module.



</div>


### [v0.86.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.86.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/3/2022 | Modules affected: networking/vpc, networking/vpc-mgmt, networking/alb, networking/sns-topics | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.86.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Exposed underlying `lb_target_group_tags` input in `ecs-service` module.
- Updated various dependencies:
    - `terraform-aws-vpc` to `v0.21.1`
    - `terraform-aws-ci` to `v0.47.10`
    - `terraform-aws-security` to `v0.64.1`
    - `terraform-aws-openvpn` to `v0.23.1`
    - `terraform-aws-monitoring` to `v0.33.3`
    - `terraform-aws-static-assets` to `v0.14.1`
- Updated examples to use `aws_subnets` data source over the deprecated `aws_subnet_ids` data source.


</div>


### [v0.85.11](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.85.11)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/3/2022 | Modules affected: mgmt/tailscale-subnet-router | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.85.11">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Updated tailscale packer template to support configuring the tailscale version.
- Updated core testing libraries (no impact on modules).




</div>



## terraform-aws-static-assets


### [v0.15.0](https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.15.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/24/2022 | Modules affected: s3-cloudfront, s3-static-website | <a href="https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.15.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- **Unlock AWS provider v4. Require minimum 3.75.1.** This update includes a few tests that make sure upgrading to this module from the last release is easy. However, you may need to bump your AWS provider version. See the migration guide notes below for more.
- Update to remove some upgrade test settings particular to testing the provider lock removal, which no longer apply going forward.


</div>



## terraform-aws-utilities


### [v0.8.0](https://github.com/gruntwork-io/terraform-aws-utilities/releases/tag/v0.8.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/6/2022 | Modules affected: executable-dependency, operating-system, prepare-pex-environment, require-executable | <a href="https://github.com/gruntwork-io/terraform-aws-utilities/releases/tag/v0.8.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

Support for python2 has been dropped. All modules that depend on python now require python 3, and calls out to `python3` directly. Most users should not be impacted by this change, as almost all operating systems ship with `python3` now.


</div>

<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "releases",
  "hash": "7ce8162d02e774c4d2521de76644e354"
}
##DOCS-SOURCER-END -->

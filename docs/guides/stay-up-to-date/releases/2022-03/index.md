
# Gruntwork release 2022-03

<p style={{marginTop: "-25px"}}><small><a href="/guides">Guides</a> / <a href="/guides/stay-up-to-date">Update Guides</a> / <a href="/guides/stay-up-to-date/releases">Releases</a> / 2022-03</small></p>

This page is lists all the updates to the [Gruntwork Infrastructure as Code 
Library](https://gruntwork.io/infrastructure-as-code-library/) that were released in 2022-03. For instructions 
on how to use these updates in your code, check out the [updating 
documentation](/guides/working-with-code/using-modules#updating).

Here are the repos that were updated:

- [boilerplate](#boilerplate)
- [terraform-aws-architecture-catalog](#terraform-aws-architecture-catalog)
- [terraform-aws-asg](#terraform-aws-asg)
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
- [terraform-aws-vpc](#terraform-aws-vpc)


## boilerplate


### [v0.4.3](https://github.com/gruntwork-io/boilerplate/releases/tag/v0.4.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/4/2022 | <a href="https://github.com/gruntwork-io/boilerplate/releases/tag/v0.4.3">Release notes</a></small>
</p>

https://github.com/gruntwork-io/boilerplate/pull/98: Implemented the ability to enforce boilerplate version when processing a template. You can now specify a version constraint in your boilerplate templates using the `required_version` config.

E.g.:

```
required_version: "~> 0.4.3"
```


### [v0.4.3-alpha.1](https://github.com/gruntwork-io/boilerplate/releases/tag/v0.4.3-alpha.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/4/2022 | <a href="https://github.com/gruntwork-io/boilerplate/releases/tag/v0.4.3-alpha.1">Release notes</a></small>
</p>

Integration testing of https://github.com/gruntwork-io/boilerplate/pull/94


### [v0.4.2](https://github.com/gruntwork-io/boilerplate/releases/tag/v0.4.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/1/2022 | <a href="https://github.com/gruntwork-io/boilerplate/releases/tag/v0.4.2">Release notes</a></small>
</p>

https://github.com/gruntwork-io/boilerplate/pull/95: Bump version of `sprig` to `3.2.1`. You can now use all new functions that were introduced since `2.22.0`, such as `htpasswd`.


### [v0.4.1](https://github.com/gruntwork-io/boilerplate/releases/tag/v0.4.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/1/2022 | <a href="https://github.com/gruntwork-io/boilerplate/releases/tag/v0.4.1">Release notes</a></small>
</p>

https://github.com/gruntwork-io/boilerplate/pull/92: Fixed bug where boilerplate continuously attempts to render templates defined in variable `default` value. This prevented rendering values that targeted go templates, like GitHub Actions.



## terraform-aws-architecture-catalog


### [v0.0.28](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v0.0.28)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/5/2022 | <a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v0.0.28">Release notes</a></small>
</p>

* Implement preflight check for operator CIS connectivity by @zackproser in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/573
* Extend preflight quota requests to cover Lambda by @zackproser in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/578
* Update to include both types of infra live URLs by @yorinasub17 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/580
* Implement dependency check for cloud-nuke by @zackproser in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/576
* Allow global CIDR for VPN access in CIS by @yorinasub17 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/585
* enabled_cloudwatch_logs_exports is dependent on engine type by @yorinasub17 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/584
* Bump to using the latest version of the service catalogs by @yorinasub17 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/587


**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-architecture-catalog/compare/v0.0.27...v0.0.28



## terraform-aws-asg


### [v0.17.4](https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.17.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/22/2022 | Modules affected: asg-instance-refresh | <a href="https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.17.4">Release notes</a></small>
</p>



- Add support for attaching a launch template to asg with instance refresh





### [v0.17.3](https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.17.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/15/2022 | Modules affected: server-group | <a href="https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.17.3">Release notes</a></small>
</p>



- Converted usage of deprecated `tags` attribute to `tag` blocks. This change is backward compatible for your resources.
- Upgraded version of `boto3` embedded in the `server-group` module for rolling deployment script.




### [v0.17.2](https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.17.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/1/2022 | Modules affected: server-group | <a href="https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.17.2">Release notes</a></small>
</p>



- Allows attaching permission boundaries to the role attached to the server's group role.





## terraform-aws-ci


### [v0.47.2](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.47.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/16/2022 | Modules affected: ecs-deploy-runner | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.47.2">Release notes</a></small>
</p>



- Fixed bug where there is a race condition between log group creation and ECS task creation for the `ecs-deploy-runner`.





### [v0.47.1](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.47.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/11/2022 | Modules affected: infrastructure-deploy-script, monorepo-helpers | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.47.1">Release notes</a></small>
</p>



- Exposed ability to install `infrastructure-deploy-script` and `monorepo-helpers` without `sudo`.






### [v0.47.0](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.47.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/10/2022 | Modules affected: ecs-deploy-runner | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.47.0">Release notes</a></small>
</p>



- Exposed the ability to configure the CloudWatch Log Group used by the ECS task launched with `ecs-deploy-runner`.




### [v0.46.1](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.46.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/9/2022 | Modules affected: infrastructure-deploy-script | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.46.1">Release notes</a></small>
</p>



- Fixed bug where `infrastructure-deploy-script` help text did not include overview docs.






### [v0.46.0](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.46.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/9/2022 | Modules affected: kubernetes-circleci-helpers | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.46.0">Release notes</a></small>
</p>



- Updated `setup-minikube` to be compatible with Ubuntu 20.04, instead of the deprecated Ubuntu 16.04 image.



### [v0.45.4](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.45.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/8/2022 | Modules affected: ecs-deploy-runner | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.45.4">Release notes</a></small>
</p>



- Exposed the lambda function name of the invoker as an output for `ecs-deploy-runner` module.





### [v0.45.3](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.45.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/4/2022 | Modules affected: ecs-deploy-runner | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.45.3">Release notes</a></small>
</p>



- Synced versions of tags in `Dockerfile` for ECS Deploy Runner. The versions of installed software are backward compatible.






### [v0.45.2](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.45.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/4/2022 | Modules affected: ecs-deploy-runner-standard-configuration, gruntwork-module-circleci-helpers | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.45.2">Release notes</a></small>
</p>



- Updated the `ecs-deploy-runner-standard-configuration` module to not define a `required_providers` block, since it doesn't have any provider resources.
- Updated the standard configuration of `ecs-deploy-runner` to allow calling `--help` without option args on scripts within EDR
- Added the ability to pass through additional flags to go test command when using `run-go-tests`






## terraform-aws-cis-service-catalog


### [v0.34.0](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.34.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/25/2022 | Modules affected: networking/vpc, networking/vpc-mgmt, landingzone/account-baseline-root, landingzone/account-baseline-security | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.34.0">Release notes</a></small>
</p>



- Updated dependency `gruntwork-io/terraform-aws-service-catalog` to v0.85.2.




### [v0.33.2](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.33.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/17/2022 | Modules affected: networking/vpc-mgmt-network-acls, networking/vpc-app-network-acls | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.33.2">Release notes</a></small>
</p>



- Fixed bug where the rule numbers were not all relative to the new `var.initial_nacl_rule_number` input variable.




### [v0.33.1](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.33.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/17/2022 | Modules affected: networking/vpc, networking/vpc-mgmt, networking/vpc-app-network-acls, networking/vpc-mgmt-network-acls | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.33.1">Release notes</a></small>
</p>



- Updated the `vpc-mgmt-network-acls` and `vpc-app-network-acls` modules to expose the ability to configure the initial rule number used for the rules. This allows a user to set a sufficiently high number to provide more head room for inserting higher priority rules.





### [v0.33.0](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.33.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/15/2022 | Modules affected: landingzone/account-baseline-root, landingzone/account-baseline-security, landingzone/account-baseline-app, security/macie | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.33.0">Release notes</a></small>
</p>



Updated the `macie` module to allow configuring and managing the Macie CloudWatch Log Group within Terraform. This allows a user to configure encryption settings for the Log Group or retention settings.




### [v0.32.5](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.32.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/14/2022 | Modules affected: landingzone/account-baseline-root | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.32.5">Release notes</a></small>
</p>



- Updated `account-baseline-root` module to allow to use external accounts as the administrator account for `macie` and `securityhub`.





## terraform-aws-data-storage


### [v0.23.2](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.23.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/17/2022 | Modules affected: rds | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.23.2">Release notes</a></small>
</p>



- Update versions of tools in circleci
- Add support for Oracle parameter groups in the RDS module.








## terraform-aws-ecs


### [v0.32.1](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.32.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/15/2022 | Modules affected: ecs-cluster, ecs-scripts | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.32.1">Release notes</a></small>
</p>



- Exposed configuration parameters for restricting IMDS endpoints on EC2 instances in ECS cluster. Refer to the new `enable_imds` and `use_imdsv1` input parameters for more information.





## terraform-aws-eks


### [v0.50.3](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.50.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/31/2022 | Modules affected: eks-cluster-control-plane | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.50.3">Release notes</a></small>
</p>



- Fix `kubergrunt` arguments when syncing core components




### [v0.50.2](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.50.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/23/2022 | Modules affected: eks-cluster-control-plane | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.50.2">Release notes</a></small>
</p>


- `eks-cluster-control-plane`


- Add support for managing EKS add-ons. Note that customized VPC CNI configurations (e.g., enabling prefix delegation) is not fully supported with add-ons as the automated add-on lifecycles could potentially undo the configuration changes. As such, it is not recommended to use EKS add-ons if you wish to use the VPC CNI customization features.

- Update deprecated circleci images to latest


- https://github.com/gruntwork-io/terraform-aws-eks/pull/420


### [v0.50.1](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.50.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/8/2022 | Modules affected: eks-cluster-workers | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.50.1">Release notes</a></small>
</p>



- Exposed ability to configure EBS IOPS and Throughput parameters for self managed ASG workers.




### [v0.50.0](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.50.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/7/2022 | Modules affected: eks-cluster-workers | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.50.0">Release notes</a></small>
</p>



- Exposed the ability to configure detailed monitoring per ASG, instead of only on all ASGs. This change is only backward incompatible if you were using the `asg_enable_detailed_monitoring` input variable - refer to the migration guide down below for more info.




## terraform-aws-lambda


### [v0.18.2](https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.18.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/8/2022 | Modules affected: scheduled-lambda-job | <a href="https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.18.2">Release notes</a></small>
</p>



- Exposed the ability to specify input json for `scheduled-lambda-job` when periodically invoking lambda function.





### [v0.18.1](https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.18.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/7/2022 | Modules affected: lambda-edge, lambda | <a href="https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.18.1">Release notes</a></small>
</p>


- The modules for Lambda and Lambda Edge functions can now have optional CloudWatch logs subscription  





## terraform-aws-load-balancer


### [v0.28.1](https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.28.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/18/2022 | Modules affected: acm-tls-certificate, alb | <a href="https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.28.1">Release notes</a></small>
</p>



- Exposed the ability to set a custom ALB log prefix for ALB logs.





## terraform-aws-monitoring


### [v0.33.0](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.33.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/24/2022 | Modules affected: alarms, logs/load-balancer-access-logs | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.33.0">Release notes</a></small>
</p>


- A few things were cleaned up and updated.
- The `logs/load-balancer-access-logs` module has been updated to support the recently changed `private-s3-bucket` module in `terraform-aws-security`, which now supports the Terraform AWS 4.x provider.



### [v0.32.1](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.32.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/11/2022 | Modules affected: alarms | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.32.1">Release notes</a></small>
</p>



- Added metric dimensions for ec2-disk-alarms




### [v0.32.0](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.32.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/3/2022 | Modules affected: alarms/asg-disk-alarms, alarms/ec2-disk-alarms | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.32.0">Release notes</a></small>
</p>


Fixed bug where disk alarms for ASG and EC2 were using an incorrect metric dimension to filter the metrics.



### [v0.31.1](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.31.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/1/2022 | Modules affected: alarms | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.31.1">Release notes</a></small>
</p>



- Added `InstanceType` optional var to ec2-memory-alarms





## terraform-aws-openvpn


### [v0.23.0](https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.23.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/24/2022 | Modules affected: openvpn-server | <a href="https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.23.0">Release notes</a></small>
</p>


The `openvpn-server` module has been updated to support the recently changed `private-s3-bucket` module in `terraform-aws-security`, which now supports the Terraform AWS 4.x provider.




## terraform-aws-security


### [v0.63.1](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.63.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/25/2022 | Modules affected: cloudtrail-bucket, cloudtrail, kms-master-key | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.63.1">Release notes</a></small>
</p>



- Exposed the ability to specify additional service principals that should be granted for CloudTrail key. This is useful for granting access to additional services for different needs, such as to CloudWatch for setting up log metric filters correctly.




### [v0.63.0](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.63.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/24/2022 | Modules affected: private-s3-bucket, aws-config-bucket, aws-config-multi-region, aws-config-rules | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.63.0">Release notes</a></small>
</p>


Changes to support Terraform AWS 4.x provider in the `private-S3-bucket` module.

This release updates the `private-s3-bucket` module and other modules in this repo that use `private-s3-bucket`. 



### [v0.62.5](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.62.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/21/2022 | Modules affected: secrets-manager-resource-policies | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.62.5">Release notes</a></small>
</p>



- Added `secretsmanager:DescribeSecret` and `secretsmanager:GetResourcePolicy` to read-only permissions.




### [v0.62.4](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.62.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/14/2022 | Modules affected: kms-master-key-multi-region | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.62.4">Release notes</a></small>
</p>



- Fixed bug where setting `replica_regions = ["*"]` in a conditional did not have the intended effect.





### [v0.62.3](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.62.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/4/2022 | Modules affected: custom-iam-entity, cloudtrail | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.62.3">Release notes</a></small>
</p>



- Added the ability to set custom conditions on assume role for `custom-iam-entity` via the new `assume_role_custom_conditions` input variable.
- Exposed the ability to configure `advanced_event_selectors` in `cloudtrail` module via the new `advanced_event_selectors` input variable.







## terraform-aws-server


### [v0.14.2](https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.14.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/11/2022 | Modules affected: single-server | <a href="https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.14.2">Release notes</a></small>
</p>



- Allow to add specific seperate tags for SG, IAM or EIP  





## terraform-aws-service-catalog


### [v0.85.2](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.85.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/25/2022 | Modules affected: mgmt/tailscale-subnet-router | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.85.2">Release notes</a></small>
</p>



- Added a new module to deploy Tailscale Subnet Routers in a VPC. Refer to the [module documentation](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/modules/mgmt/tailscale-subnet-router) for more information.




### [v0.85.1](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.85.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/24/2022 | Modules affected: services/lambda, data-stores/ecr-repos | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.85.1">Release notes</a></small>
</p>



- Exposed the ability to bind custom iam policies to the lambda service IAM role
- Added the ability to configure ECR repo to grant access to create lambda functions externally





### [v0.85.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.85.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/17/2022 | Modules affected: mgmt/ecs-deploy-runner, base/ec2-baseline, data-stores/rds, data-stores/aurora | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.85.0">Release notes</a></small>
</p>



- Updated `ecs-deploy-runner` to manage the CloudWatch Log Group associated with ECS Tasks in Terraform and exposed the variables to configure it.
- Updated dependencies
    - `terraform-aws-monitoring` to `v0.32.1`
    - `terraform-aws-ecs` to `v0.32.1`
    - `terraform-aws-security` to `v0.62.4`
    - `terraform-aws-ci` to `v0.47.2`




### [v0.84.4](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.84.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/15/2022 | Modules affected: data-stores/redis, base/ec2-baseline, services/ec2-instance, services/k8s-service | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.84.4">Release notes</a></small>
</p>



- Exposed the 'auth_token' parameter in `redis` module to allow configuring password protected redis instances.
- Update dependency `terraform-aws-server` to `v0.14.2`




### [v0.84.3](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.84.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/11/2022 | Modules affected: mgmt/ecs-deploy-runner | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.84.3">Release notes</a></small>
</p>



- Exposed ability to set up periodic background job to invoke `ecs-deploy-runner`. This can be used to run various tasks on a periodic basis in the background, such as running `terragrunt run-all plan` on a regular basis to detect infrastructure drift.




### [v0.84.2](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.84.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/10/2022 | Modules affected: services/lambda | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.84.2">Release notes</a></small>
</p>



- Exposed the `set_source_code_hash` parameter in the `services/lambda` module.




### [v0.84.1](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.84.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/9/2022 | Modules affected: landingzone/account-baseline-root, services/eks-cluster, services/eks-workers | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.84.1">Release notes</a></small>
</p>



- Exposed the ability to link GitHub Actions to the root account via the `account-baseline-root` module.
- Exposed the ability to configure EBS IOPS and THROUGHPUT parameters for EKS self managed ASG workers.




### [v0.84.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.84.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/9/2022 | Modules affected: services/lambda, mgmt/openvpn-server, services/eks-workers, services/eks-cluster | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.84.0">Release notes</a></small>
</p>



- Exposed ability to configure CloudWatch subscriptions for `services/lambda`.
- Enabled detailed monitoring for EKS Managed Node Group and self managed ASG instances. You can configure this using the new parameters to configure it. 
- Update various dependencies:
    - `terraform-aws-lambda` to `v0.18.2`
    - `terraform-aws-eks` to `v0.50.1`
    - `terraform-aws-openvpn` to `v0.22.0`
    - `terraform-aws-ci` to `v0.45.4`
- Updated versions of tools installed in the jenkins server by default


### [v0.83.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.83.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/5/2022 | Modules affected: mgmt/bastion-host, services/ec2-instance, base/ec2-baseline, mgmt/ecs-deploy-runner | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.83.0">Release notes</a></small>
</p>



- Exposed ability to set `ebs_optimized` on `bastion-host` and `ec2-instance` module. This new variable defaults to `true`.
- Exposed additional parameters for restoring an Aurora RDS Database from a snapshot (`restore_type` and `copy_tags_to_snapshot`).
- Added the ability to extend the ECS Deploy Runner with additional container images via the new `additional_container_images` input variable.
- Fixed bug where `elb_target_group_deregistration_delay` was not being passed through in `ecs-service` module.
- Updated various dependencies:
    - `terraform-aws-security` to `v0.62.3`
    - `terraform-aws-ci` to `v0.45.3`
    - `terraform-aws-asg` to `v0.17.2`


### [v0.82.1](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.82.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/4/2022 | Modules affected: networking/vpc-mgmt | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.82.1">Release notes</a></small>
</p>



- Exposed `iam_role_permissions_boundary` to `vpc-mgmt` module.




### [v0.82.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.82.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/3/2022 | Modules affected: networking/vpc, networking/vpc-mgmt | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.82.0">Release notes</a></small>
</p>



- Exposed the ability to configure permission boundaries on the IAM role for VPC flow logs via the `iam_role_permissions_boundary` input parameter.
- Updated dependency `terraform-aws-vpc` to `v0.20.1`.



### [v0.81.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.81.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/3/2022 | Modules affected: mgmt/jenkins, base/ec2-baseline, data-stores/aurora, data-stores/elasticsearch | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.81.0">Release notes</a></small>
</p>



- Updated dependency `terraform-aws-monitoring` to v0.32.0
- Fixed bug in ASG and EC2 disk alarms where the metric dimensions were incompatible with the CloudWatch Agent.
- Exposed the ability to configure Performance Insights for an RDS database using the new `performance_insights_enabled` input variable.





## terraform-aws-static-assets


### [v0.13.2](https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.13.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/29/2022 | <a href="https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.13.2">Release notes</a></small>
</p>



- Fix example `cloudfront-s3-private-with-custom-bucket-policy`




### [v0.13.1](https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.13.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/23/2022 | Modules affected: s3-static-website | <a href="https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.13.1">Release notes</a></small>
</p>



- Adds ability to override S3 bucket ownership and bucket policy





## terraform-aws-vpc


### [v0.21.0](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.21.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/24/2022 | Modules affected: vpc-flow-logs | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.21.0">Release notes</a></small>
</p>


- `vpc-flow-logs` **[Functionally Backward Compatible]**


The `vpc-flow-logs` module has been updated to support the recently changed `private-s3-bucket` module in `terraform-aws-security`, which now supports the Terraform AWS 4.x provider.


Point your module source to this release (`v0.21.0`), run `terraform init -upgrade`, and run `terraform apply`.

When you run `terraform apply` there should be no destroyed or recreated resources. You will see newly created resources and sometimes in-place modifications.


### [v0.20.4](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.20.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/17/2022 | Modules affected: vpc-app-network-acls, vpc-mgmt-network-acls | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.20.4">Release notes</a></small>
</p>



- Fixed bug where the rule numbers were not all relative to the new  `initial_nacl_rule_number` input variable.





### [v0.20.3](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.20.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/17/2022 | Modules affected: vpc-flow-logs, vpc-app-network-acls, vpc-mgmt-network-acls | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.20.3">Release notes</a></small>
</p>



- Updated type table documentation for the `additional_s3_bucket_policy_statements` input variable.
- Updated the `vpc-mgmt-network-acls` and `vpc-app-network-acls` modules to expose the ability to configure the initial rule number used for the rules. This allows a user to set a sufficiently high number to provide more head room for inserting higher priority rules.





### [v0.20.2](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.20.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/4/2022 | Modules affected: vpc-flow-logs | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.20.2">Release notes</a></small>
</p>



- Added the ability to configure additional bucket policies on the VPC flow logs bucket using the new `additional_s3_bucket_policy_statements` input variable.








<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "releases",
  "hash": "52142a15e3833d7e34f487ed078cb343"
}
##DOCS-SOURCER-END -->

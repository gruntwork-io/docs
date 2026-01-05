
# Gruntwork release 2022-03

<p style={{marginTop: "-25px"}}><small><a href="/guides">Guides</a> / <a href="/guides/stay-up-to-date">Update Guides</a> / <a href="/guides/stay-up-to-date/releases">Releases</a> / 2022-03</small></p>

This page is lists all the updates to the [Gruntwork Infrastructure as Code
Library](https://gruntwork.io/infrastructure-as-code-library/) that were released in 2022-03. For instructions
on how to use these updates in your code, check out the [updating
documentation](/library/stay-up-to-date/updating).

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

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/boilerplate/pull/98: Implemented the ability to enforce boilerplate version when processing a template. You can now specify a version constraint in your boilerplate templates using the `required_version` config.

E.g.:

```
required_version: &quot;~&gt; 0.4.3&quot;
```

</div>


### [v0.4.3-alpha.1](https://github.com/gruntwork-io/boilerplate/releases/tag/v0.4.3-alpha.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/4/2022 | <a href="https://github.com/gruntwork-io/boilerplate/releases/tag/v0.4.3-alpha.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Integration testing of https://github.com/gruntwork-io/boilerplate/pull/94

</div>


### [v0.4.2](https://github.com/gruntwork-io/boilerplate/releases/tag/v0.4.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/1/2022 | <a href="https://github.com/gruntwork-io/boilerplate/releases/tag/v0.4.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/boilerplate/pull/95: Bump version of `sprig` to `3.2.1`. You can now use all new functions that were introduced since `2.22.0`, such as `htpasswd`.

</div>


### [v0.4.1](https://github.com/gruntwork-io/boilerplate/releases/tag/v0.4.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/1/2022 | <a href="https://github.com/gruntwork-io/boilerplate/releases/tag/v0.4.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/boilerplate/pull/92: Fixed bug where boilerplate continuously attempts to render templates defined in variable `default` value. This prevented rendering values that targeted go templates, like GitHub Actions.

</div>



## terraform-aws-architecture-catalog


### [v0.0.28](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v0.0.28)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/5/2022 | <a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v0.0.28">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Implement preflight check for operator CIS connectivity by @zackproser in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/573
* Extend preflight quota requests to cover Lambda by @zackproser in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/578
* Update to include both types of infra live URLs by @yorinasub17 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/580
* Implement dependency check for cloud-nuke by @zackproser in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/576
* Allow global CIDR for VPN access in CIS by @yorinasub17 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/585
* enabled_cloudwatch_logs_exports is dependent on engine type by @yorinasub17 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/584
* Bump to using the latest version of the service catalogs by @yorinasub17 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/587


**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-architecture-catalog/compare/v0.0.27...v0.0.28

</div>



## terraform-aws-asg


### [v0.17.4](https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.17.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/22/2022 | Modules affected: asg-instance-refresh | <a href="https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.17.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Add support for attaching a launch template to asg with instance refresh




</div>


### [v0.17.3](https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.17.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/15/2022 | Modules affected: server-group | <a href="https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.17.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Converted usage of deprecated `tags` attribute to `tag` blocks. This change is backward compatible for your resources.
- Upgraded version of `boto3` embedded in the `server-group` module for rolling deployment script.



</div>


### [v0.17.2](https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.17.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/1/2022 | Modules affected: server-group | <a href="https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.17.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Allows attaching permission boundaries to the role attached to the server&apos;s group role.



</div>



## terraform-aws-ci


### [v0.47.2](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.47.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/16/2022 | Modules affected: ecs-deploy-runner | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.47.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fixed bug where there is a race condition between log group creation and ECS task creation for the `ecs-deploy-runner`.




</div>


### [v0.47.1](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.47.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/11/2022 | Modules affected: infrastructure-deploy-script, monorepo-helpers | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.47.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Exposed ability to install `infrastructure-deploy-script` and `monorepo-helpers` without `sudo`.





</div>


### [v0.47.0](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.47.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/10/2022 | Modules affected: ecs-deploy-runner | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.47.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Exposed the ability to configure the CloudWatch Log Group used by the ECS task launched with `ecs-deploy-runner`.



</div>


### [v0.46.1](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.46.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/9/2022 | Modules affected: infrastructure-deploy-script | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.46.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fixed bug where `infrastructure-deploy-script` help text did not include overview docs.





</div>


### [v0.46.0](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.46.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/9/2022 | Modules affected: kubernetes-circleci-helpers | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.46.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Updated `setup-minikube` to be compatible with Ubuntu 20.04, instead of the deprecated Ubuntu 16.04 image.


</div>


### [v0.45.4](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.45.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/8/2022 | Modules affected: ecs-deploy-runner | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.45.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Exposed the lambda function name of the invoker as an output for `ecs-deploy-runner` module.




</div>


### [v0.45.3](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.45.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/4/2022 | Modules affected: ecs-deploy-runner | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.45.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Synced versions of tags in `Dockerfile` for ECS Deploy Runner. The versions of installed software are backward compatible.





</div>


### [v0.45.2](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.45.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/4/2022 | Modules affected: ecs-deploy-runner-standard-configuration, gruntwork-module-circleci-helpers | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.45.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Updated the `ecs-deploy-runner-standard-configuration` module to not define a `required_providers` block, since it doesn&apos;t have any provider resources.
- Updated the standard configuration of `ecs-deploy-runner` to allow calling `--help` without option args on scripts within EDR
- Added the ability to pass through additional flags to go test command when using `run-go-tests`




</div>



## terraform-aws-cis-service-catalog


### [v0.34.0](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.34.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/25/2022 | Modules affected: networking/vpc, networking/vpc-mgmt, landingzone/account-baseline-root, landingzone/account-baseline-security | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.34.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Updated dependency `gruntwork-io/terraform-aws-service-catalog` to v0.85.2.



</div>


### [v0.33.2](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.33.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/17/2022 | Modules affected: networking/vpc-mgmt-network-acls, networking/vpc-app-network-acls | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.33.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fixed bug where the rule numbers were not all relative to the new `var.initial_nacl_rule_number` input variable.



</div>


### [v0.33.1](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.33.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/17/2022 | Modules affected: networking/vpc, networking/vpc-mgmt, networking/vpc-app-network-acls, networking/vpc-mgmt-network-acls | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.33.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Updated the `vpc-mgmt-network-acls` and `vpc-app-network-acls` modules to expose the ability to configure the initial rule number used for the rules. This allows a user to set a sufficiently high number to provide more head room for inserting higher priority rules.




</div>


### [v0.33.0](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.33.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/15/2022 | Modules affected: landingzone/account-baseline-root, landingzone/account-baseline-security, landingzone/account-baseline-app, security/macie | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.33.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

Updated the `macie` module to allow configuring and managing the Macie CloudWatch Log Group within Terraform. This allows a user to configure encryption settings for the Log Group or retention settings.



</div>


### [v0.32.5](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.32.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/14/2022 | Modules affected: landingzone/account-baseline-root | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.32.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Updated `account-baseline-root` module to allow to use external accounts as the administrator account for `macie` and `securityhub`.



</div>



## terraform-aws-data-storage


### [v0.23.2](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.23.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/17/2022 | Modules affected: rds | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.23.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Update versions of tools in circleci
- Add support for Oracle parameter groups in the RDS module.






</div>



## terraform-aws-ecs


### [v0.32.1](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.32.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/15/2022 | Modules affected: ecs-cluster, ecs-scripts | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.32.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Exposed configuration parameters for restricting IMDS endpoints on EC2 instances in ECS cluster. Refer to the new `enable_imds` and `use_imdsv1` input parameters for more information.



</div>



## terraform-aws-eks


### [v0.50.3](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.50.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/31/2022 | Modules affected: eks-cluster-control-plane | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.50.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fix `kubergrunt` arguments when syncing core components



</div>


### [v0.50.2](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.50.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/23/2022 | Modules affected: eks-cluster-control-plane | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.50.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- `eks-cluster-control-plane`


- Add support for managing EKS add-ons. Note that customized VPC CNI configurations (e.g., enabling prefix delegation) is not fully supported with add-ons as the automated add-on lifecycles could potentially undo the configuration changes. As such, it is not recommended to use EKS add-ons if you wish to use the VPC CNI customization features.

- Update deprecated circleci images to latest


- https://github.com/gruntwork-io/terraform-aws-eks/pull/420
- https://github.com/gruntwork-io/terraform-aws-eks/pull/414


</div>


### [v0.50.1](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.50.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/8/2022 | Modules affected: eks-cluster-workers | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.50.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Exposed ability to configure EBS IOPS and Throughput parameters for self managed ASG workers.



</div>


### [v0.50.0](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.50.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/7/2022 | Modules affected: eks-cluster-workers | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.50.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Exposed the ability to configure detailed monitoring per ASG, instead of only on all ASGs. This change is only backward incompatible if you were using the `asg_enable_detailed_monitoring` input variable - refer to the migration guide down below for more info.


</div>



## terraform-aws-lambda


### [v0.18.2](https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.18.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/8/2022 | Modules affected: scheduled-lambda-job | <a href="https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.18.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Exposed the ability to specify input json for `scheduled-lambda-job` when periodically invoking lambda function.




</div>


### [v0.18.1](https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.18.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/7/2022 | Modules affected: lambda-edge, lambda | <a href="https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.18.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- The modules for Lambda and Lambda Edge functions can now have optional CloudWatch logs subscription  



</div>



## terraform-aws-load-balancer


### [v0.28.1](https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.28.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/18/2022 | Modules affected: acm-tls-certificate, alb | <a href="https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.28.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Exposed the ability to set a custom ALB log prefix for ALB logs.



</div>



## terraform-aws-monitoring


### [v0.33.0](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.33.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/24/2022 | Modules affected: alarms, logs/load-balancer-access-logs | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.33.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- A few things were cleaned up and updated.
- The `logs/load-balancer-access-logs` module has been updated to support the recently changed `private-s3-bucket` module in `terraform-aws-security`, which now supports the Terraform AWS 4.x provider.


</div>


### [v0.32.1](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.32.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/11/2022 | Modules affected: alarms | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.32.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Added metric dimensions for ec2-disk-alarms



</div>


### [v0.32.0](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.32.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/3/2022 | Modules affected: alarms/asg-disk-alarms, alarms/ec2-disk-alarms | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.32.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
Fixed bug where disk alarms for ASG and EC2 were using an incorrect metric dimension to filter the metrics.


</div>


### [v0.31.1](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.31.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/1/2022 | Modules affected: alarms | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.31.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Added `InstanceType` optional var to ec2-memory-alarms



</div>



## terraform-aws-openvpn


### [v0.23.0](https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.23.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/24/2022 | Modules affected: openvpn-server | <a href="https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.23.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
The `openvpn-server` module has been updated to support the recently changed `private-s3-bucket` module in `terraform-aws-security`, which now supports the Terraform AWS 4.x provider.


</div>



## terraform-aws-security


### [v0.63.1](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.63.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/25/2022 | Modules affected: cloudtrail-bucket, cloudtrail, kms-master-key | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.63.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Exposed the ability to specify additional service principals that should be granted for CloudTrail key. This is useful for granting access to additional services for different needs, such as to CloudWatch for setting up log metric filters correctly.



</div>


### [v0.63.0](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.63.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/24/2022 | Modules affected: private-s3-bucket, aws-config-bucket, aws-config-multi-region, aws-config-rules | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.63.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
Changes to support Terraform AWS 4.x provider in the `private-S3-bucket` module.

This release updates the `private-s3-bucket` module and other modules in this repo that use `private-s3-bucket`. 


</div>


### [v0.62.5](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.62.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/21/2022 | Modules affected: secrets-manager-resource-policies | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.62.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Added `secretsmanager:DescribeSecret` and `secretsmanager:GetResourcePolicy` to read-only permissions.



</div>


### [v0.62.4](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.62.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/14/2022 | Modules affected: kms-master-key-multi-region | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.62.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fixed bug where setting `replica_regions = [&quot;*&quot;]` in a conditional did not have the intended effect.




</div>


### [v0.62.3](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.62.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/4/2022 | Modules affected: custom-iam-entity, cloudtrail | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.62.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Added the ability to set custom conditions on assume role for `custom-iam-entity` via the new `assume_role_custom_conditions` input variable.
- Exposed the ability to configure `advanced_event_selectors` in `cloudtrail` module via the new `advanced_event_selectors` input variable.





</div>



## terraform-aws-server


### [v0.14.2](https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.14.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/11/2022 | Modules affected: single-server | <a href="https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.14.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Allow to add specific seperate tags for SG, IAM or EIP  



</div>



## terraform-aws-service-catalog


### [v0.85.2](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.85.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/25/2022 | Modules affected: mgmt/tailscale-subnet-router | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.85.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Added a new module to deploy Tailscale Subnet Routers in a VPC. Refer to the [module documentation](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/modules/mgmt/tailscale-subnet-router) for more information.



</div>


### [v0.85.1](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.85.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/24/2022 | Modules affected: services/lambda, data-stores/ecr-repos | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.85.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Exposed the ability to bind custom iam policies to the lambda service IAM role
- Added the ability to configure ECR repo to grant access to create lambda functions externally




</div>


### [v0.85.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.85.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/17/2022 | Modules affected: mgmt/ecs-deploy-runner, base/ec2-baseline, data-stores/rds, data-stores/aurora | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.85.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Updated `ecs-deploy-runner` to manage the CloudWatch Log Group associated with ECS Tasks in Terraform and exposed the variables to configure it.
- Updated dependencies
    - `terraform-aws-monitoring` to `v0.32.1`
    - `terraform-aws-ecs` to `v0.32.1`
    - `terraform-aws-security` to `v0.62.4`
    - `terraform-aws-ci` to `v0.47.2`



</div>


### [v0.84.4](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.84.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/15/2022 | Modules affected: data-stores/redis, base/ec2-baseline, services/ec2-instance, services/k8s-service | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.84.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Exposed the &apos;auth_token&apos; parameter in `redis` module to allow configuring password protected redis instances.
- Update dependency `terraform-aws-server` to `v0.14.2`



</div>


### [v0.84.3](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.84.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/11/2022 | Modules affected: mgmt/ecs-deploy-runner | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.84.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Exposed ability to set up periodic background job to invoke `ecs-deploy-runner`. This can be used to run various tasks on a periodic basis in the background, such as running `terragrunt run-all plan` on a regular basis to detect infrastructure drift.



</div>


### [v0.84.2](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.84.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/10/2022 | Modules affected: services/lambda | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.84.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Exposed the `set_source_code_hash` parameter in the `services/lambda` module.



</div>


### [v0.84.1](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.84.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/9/2022 | Modules affected: landingzone/account-baseline-root, services/eks-cluster, services/eks-workers | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.84.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Exposed the ability to link GitHub Actions to the root account via the `account-baseline-root` module.
- Exposed the ability to configure EBS IOPS and THROUGHPUT parameters for EKS self managed ASG workers.



</div>


### [v0.84.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.84.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/9/2022 | Modules affected: services/lambda, mgmt/openvpn-server, services/eks-workers, services/eks-cluster | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.84.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Exposed ability to configure CloudWatch subscriptions for `services/lambda`.
- Enabled detailed monitoring for EKS Managed Node Group and self managed ASG instances. You can configure this using the new parameters to configure it. 
- Update various dependencies:
    - `terraform-aws-lambda` to `v0.18.2`
    - `terraform-aws-eks` to `v0.50.1`
    - `terraform-aws-openvpn` to `v0.22.0`
    - `terraform-aws-ci` to `v0.45.4`
- Updated versions of tools installed in the jenkins server by default
    - `helm` to `v3.8.0`
    - `terraform` to `v1.1.7`
    - `packer` to `v1.8.0`
    - `terragrunt` to `v0.36.3`
- Minor simplification of a `local` variable in `account-baseline-root`
- Updated miscellaneous dependencies used in Terratest (no impact to modules)



</div>


### [v0.83.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.83.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/5/2022 | Modules affected: mgmt/bastion-host, services/ec2-instance, base/ec2-baseline, mgmt/ecs-deploy-runner | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.83.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Exposed ability to set `ebs_optimized` on `bastion-host` and `ec2-instance` module. This new variable defaults to `true`.
- Exposed additional parameters for restoring an Aurora RDS Database from a snapshot (`restore_type` and `copy_tags_to_snapshot`).
- Added the ability to extend the ECS Deploy Runner with additional container images via the new `additional_container_images` input variable.
- Fixed bug where `elb_target_group_deregistration_delay` was not being passed through in `ecs-service` module.
- Updated various dependencies:
    - `terraform-aws-security` to `v0.62.3`
    - `terraform-aws-ci` to `v0.45.3`
    - `terraform-aws-asg` to `v0.17.2`
    - `terraform-aws-cache` to `v0.17.0`
    - `terraform-aws-data-storage` to `v0.23.1`
    - `terraform-aws-ecs` to `v0.32.0`
    - `terraform-aws-messaging` to `v0.8.1`
    - `terraform-aws-load-balancer` to `v0.28.0`
    - `terraform-aws-server` to `v0.14.1`
    - `terraform-aws-monitoring` to `v0.32.0`
    - `terraform-aws-static-assets` to `v0.13.0`
    - `terraform-aws-vpc` to `v0.20.2`
    - `terraform-kubernetes-namespace` to `v0.5.0`
    - `terraform-aws-utilities` to `v0.7.0`


</div>


### [v0.82.1](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.82.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/4/2022 | Modules affected: networking/vpc-mgmt | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.82.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Exposed `iam_role_permissions_boundary` to `vpc-mgmt` module.



</div>


### [v0.82.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.82.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/3/2022 | Modules affected: networking/vpc, networking/vpc-mgmt | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.82.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Exposed the ability to configure permission boundaries on the IAM role for VPC flow logs via the `iam_role_permissions_boundary` input parameter.
- Updated dependency `terraform-aws-vpc` to `v0.20.1`.


</div>


### [v0.81.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.81.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/3/2022 | Modules affected: mgmt/jenkins, base/ec2-baseline, data-stores/aurora, data-stores/elasticsearch | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.81.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Updated dependency `terraform-aws-monitoring` to v0.32.0
- Fixed bug in ASG and EC2 disk alarms where the metric dimensions were incompatible with the CloudWatch Agent.
- Exposed the ability to configure Performance Insights for an RDS database using the new `performance_insights_enabled` input variable.



</div>



## terraform-aws-static-assets


### [v0.13.2](https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.13.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/29/2022 | <a href="https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.13.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fix example `cloudfront-s3-private-with-custom-bucket-policy`



</div>


### [v0.13.1](https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.13.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/23/2022 | Modules affected: s3-static-website | <a href="https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.13.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Adds ability to override S3 bucket ownership and bucket policy



</div>



## terraform-aws-vpc


### [v0.21.0](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.21.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/24/2022 | Modules affected: vpc-flow-logs | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.21.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- `vpc-flow-logs` **[Functionally Backward Compatible]**


The `vpc-flow-logs` module has been updated to support the recently changed `private-s3-bucket` module in `terraform-aws-security`, which now supports the Terraform AWS 4.x provider.


Point your module source to this release (`v0.21.0`), run `terraform init -upgrade`, and run `terraform apply`.

When you run `terraform apply` there should be no destroyed or recreated resources. You will see newly created resources and sometimes in-place modifications.


This is a **functionally backward compatible upgrade**, verified with partially automated upgrade testing. Upgrade testing was done to ensure that running init/plan/apply on previously deployed modules will not run into issues when you upgrade to this version of the modules. 

- No configuration changes are required.
- The AWS provider version must be bumped to at least `3.75.0`.

You can bump the provider by running `terraform init` with the `-upgrade` flag, as in `terraform init -upgrade`. See [HashiCorp&apos;s guide on upgrading providers](https://www.terraform.io/language/files/dependency-lock#new-version-of-an-existing-provider) for more details.


- https://github.com/gruntwork-io/terraform-aws-vpc/pull/264




</div>


### [v0.20.4](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.20.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/17/2022 | Modules affected: vpc-app-network-acls, vpc-mgmt-network-acls | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.20.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fixed bug where the rule numbers were not all relative to the new  `initial_nacl_rule_number` input variable.




</div>


### [v0.20.3](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.20.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/17/2022 | Modules affected: vpc-flow-logs, vpc-app-network-acls, vpc-mgmt-network-acls | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.20.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Updated type table documentation for the `additional_s3_bucket_policy_statements` input variable.
- Updated the `vpc-mgmt-network-acls` and `vpc-app-network-acls` modules to expose the ability to configure the initial rule number used for the rules. This allows a user to set a sufficiently high number to provide more head room for inserting higher priority rules.




</div>


### [v0.20.2](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.20.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/4/2022 | Modules affected: vpc-flow-logs | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.20.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Added the ability to configure additional bucket policies on the VPC flow logs bucket using the new `additional_s3_bucket_policy_statements` input variable.





</div>

<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "releases",
  "hash": "93cc9a8809e6228236083491eab4656c"
}
##DOCS-SOURCER-END -->

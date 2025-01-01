
# Gruntwork release 2019-07

<p style={{marginTop: "-25px"}}><small><a href="/guides">Guides</a> / <a href="/guides/stay-up-to-date">Update Guides</a> / <a href="/guides/stay-up-to-date/releases">Releases</a> / 2019-07</small></p>

This page is lists all the updates to the [Gruntwork Infrastructure as Code
Library](https://gruntwork.io/infrastructure-as-code-library/) that were released in 2019-07. For instructions
on how to use these updates in your code, check out the [updating
documentation](/library/stay-up-to-date/updating).

Here are the repos that were updated:

- [boilerplate](#boilerplate)
- [terraform-aws-asg](#terraform-aws-asg)
- [terraform-aws-beanstalk](#terraform-aws-beanstalk)
- [terraform-aws-ci](#terraform-aws-ci)
- [terraform-aws-data-storage](#terraform-aws-data-storage)
- [terraform-aws-ecs](#terraform-aws-ecs)
- [terraform-aws-eks](#terraform-aws-eks)
- [terraform-aws-mongodb](#terraform-aws-mongodb)
- [terraform-aws-monitoring](#terraform-aws-monitoring)
- [terraform-aws-openvpn](#terraform-aws-openvpn)
- [terraform-aws-security](#terraform-aws-security)
- [terraform-aws-server](#terraform-aws-server)
- [terraform-aws-static-assets](#terraform-aws-static-assets)
- [terraform-aws-vpc](#terraform-aws-vpc)
- [terraform-kubernetes-helm](#terraform-kubernetes-helm)


## boilerplate


### [v0.2.25](https://github.com/gruntwork-io/boilerplate/releases/tag/v0.2.25)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/8/2019 | <a href="https://github.com/gruntwork-io/boilerplate/releases/tag/v0.2.25">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/boilerplate/pull/52 and https://github.com/gruntwork-io/boilerplate/pull/53: Apply `README.md` updates for `v0.2.24`.

</div>



## terraform-aws-asg


### [v0.8.1](https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.8.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/11/2019 | Modules affected: server-group | <a href="https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.8.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- There is a timing bug with IAM role and instance profile creation that causes the initial `terraform apply` to fail for code using the `server-group` module. This release addresses that by adding a sleep to wait for IAM resource propagation after creation.



</div>


### [v0.8.0](https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.8.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/2/2019 | Modules affected: server-group, asg-rolling-deploy | <a href="https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.8.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

All the module variables have been updated to use concrete types based on the new type system introduced in terraform 0.12.0. You can learn more about the types in [the official documentation](https://www.terraform.io/docs/configuration/types.html).

Note that as part of this, we switched to using `null` to indicate unset values when passing them through to resources. If you were previously using a 0 value (`&quot;&quot;` for strings and `0` for numbers), review the module `variables.tf` file to double check if the 0 value has been converted to a `null`.



</div>



## terraform-aws-beanstalk


### [v0.1.0](https://github.com/gruntwork-io/terraform-aws-beanstalk/releases/tag/v0.1.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/3/2019 | Modules affected: app-version, configuration-deployer, elasticbeanstalk-application, elasticbeanstalk-environment | <a href="https://github.com/gruntwork-io/terraform-aws-beanstalk/releases/tag/v0.1.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

**All the modules are now terraform 0.12.0 compatible**. Note that this means the modules are **no longer compatible with terraform 0.11 and under**. Starting this release, you must use terraform 0.12.0 or greater to use this module.

All the module variables have been updated to use concrete types based on the new type system introduced in terraform 0.12.0. You can learn more about the types in [the official documentation](https://www.terraform.io/docs/configuration/types.html).

Note that as part of this, we switched to using `null` to indicate unset values when passing them through to resources. If you were previously using a 0 value (`&quot;&quot;` for strings and `0` for numbers), review the module `variables.tf` file to double check if the 0 value has been converted to a `null`.



</div>



## terraform-aws-ci


### [v0.15.0](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.15.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/27/2019 | Modules affected: terraform-helpers | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.15.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

This release updates `terraform-helpers/terraform-update-variable` for better terraform 0.12 and terragrunt 0.19 compatibility. Here are the changes:

- The vars file that it searches for by default is now `terragrunt.hcl` instead of `terraform.tfvars`.
- The vars file argument is now `--vars-path`, as opposed to `--tfvars-file`.
- The quoting rules have changed to support more complex types. Now, instead of auto injecting quotes, it will inject the value literally. E.g if you pass in `terraform-update-variable --name &quot;foo&quot; --value &quot;9&quot;`, this will inject the string `foo = 9` instead of `foo = &quot;9&quot;`. If you want the old behavior, you will need to pass in the value quoted: `terraform-update-variable --name &quot;foo&quot; --value &quot;\&quot;9\&quot;&quot;`
- The resulting file will now be passed through `terraform fmt` so that it is formatted.


</div>


### [v0.14.2](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.14.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/27/2019 | Modules affected: jenkins-server | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.14.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

Fixes a bug where `var.allow_incoming_http_from_security_group_ids` was not creating the required security group rules due to a regression from upgrading module-load-balancer/alb, which required explicitly specifying the number of security group IDs being passed in.



</div>


### [v0.14.1](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.14.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/11/2019 | Modules affected: kubernetes-circleci-helpers, jenkins-server | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.14.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- This release fixes a regression in the `setup-minikube` script in the `kubernetes-circleci-helpers` module, caused by the removal of the specific docker version we depended on from the ubuntu apt caches.
- The `install-jenkins` module is now verified to work with Ubuntu 18.04.
- The `jenkins-server` module is now using `v0.8.1` of `module-asg/modules/server-group`, which includes a fix for IAM timing issues.



</div>



## terraform-aws-data-storage


### [v0.9.1](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.9.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/25/2019 | Modules affected: rds | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.9.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- If the `allow_connections_from_cidr_blocks` argument of the `rds` module is empty, no security group rule will be created at all now. This makes CIDR based rules completely optional.



</div>



## terraform-aws-ecs


### [v0.14.1](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.14.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/18/2019 | Modules affected: ecs-fargate | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.14.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fixes a bug where the `health_check_timeout` variable was not used for setting the timeout to LB target group health check.


</div>



## terraform-aws-eks


### [v0.6.0](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.6.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/1/2019 | Modules affected: eks-vpc-tags, eks-k8s-role-mapping, eks-k8s-external-dns, eks-k8s-external-dns-iam-policy | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.6.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

**All the modules are now terraform 0.12.0 compatible**. Note that this means the modules are **no longer compatible with terraform 0.11 and under**. Starting this release, you must use terraform 0.12.0 or greater to use this module.

All the module variables have been updated to use concrete types based on the new type system introduced in terraform 0.12.0. You can learn more about the types in [the official documentation](https://www.terraform.io/docs/configuration/types.html).

Note that as part of this, we switched to using `null` to indicate unset values when passing them through to resources. If you were previously using a 0 value (`&quot;&quot;` for strings and `0` for numbers), review the module `variables.tf` file to double check if the 0 value has been converted to a `null`.



</div>



## terraform-aws-mongodb


### [v0.4.0](https://github.com/gruntwork-io/terraform-aws-mongodb/releases/tag/v0.4.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/2/2019 | Modules affected: mongodb-cluster, mongodb-backup | <a href="https://github.com/gruntwork-io/terraform-aws-mongodb/releases/tag/v0.4.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

**All the modules are now terraform 0.12.0 compatible**. Note that this means the modules are **no longer compatible with terraform 0.11 and under**. Starting this release, you must use terraform 0.12.0 or greater to use this module.

All the module variables have been updated to use concrete types based on the new type system introduced in terraform 0.12.0. You can learn more about the types in [the official documentation](https://www.terraform.io/docs/configuration/types.html).

Note that as part of this, we switched to using `null` to indicate unset values when passing them through to resources. If you were previously using a 0 value (`&quot;&quot;` for strings and `0` for numbers), review the module `vars.tf` file to double check if the 0 value has been converted to a `null`.



</div>



## terraform-aws-monitoring


### [v0.13.3](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.13.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/9/2019 | Modules affected: alarms/elasticsearch-alarms | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.13.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- You can now disable yellow cluster status alarms for Elasticsearch by setting `var.disable_status_yellow_alarm` to `true`.


</div>


### [v0.12.8](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.12.8)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/9/2019 | Modules affected: alarms/elasticsearch-alarms | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.12.8">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- You can now disable yellow cluster status alarms for Elasticsearch by setting `var.disable_status_yellow_alarm` to `true`.


</div>



## terraform-aws-openvpn


### [v0.9.3](https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.9.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/26/2019 | Modules affected: openvpn-server | <a href="https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.9.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Make GP2 the default root volume type to match what is created in the console 



</div>



## terraform-aws-security


### [v0.17.2](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.17.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/6/2019 | Modules affected: **No changes to underlying modules.** | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.17.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

Starting this release, all the modules are tested and verified to work with Ubuntu 18.04.



</div>



## terraform-aws-server


### [v0.7.2](https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.7.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/11/2019 | Modules affected: persistent-ebs-volume | <a href="https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.7.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fix `mount-ebs-volume` so it works properly on Amazon Linux.


</div>


### [v0.7.1](https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.7.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/3/2019 | <a href="https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.7.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

Starting this release, all the scripts are now tested and verified to work with Ubuntu 18.04. No change has been made to the scripts themselves.



</div>



## terraform-aws-static-assets


### [v0.5.2](https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.5.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/24/2019 | Modules affected: s3-cloudfront | <a href="https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.5.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Add support for Lambda @ Edge by allowing you to associate lambda functions to the cloudfront distribution. This can be done by passing in the new `var.default_lambda_associations` list.



</div>


### [v0.5.1](https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.5.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/17/2019 | Modules affected: s3-cloudfront | <a href="https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.5.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fixes a bug where the IAM certs were not being properly used in `s3-cloudfront`.
- Fixes a perpetual diff caused when specifying both IAM or ACM certs and default certs.



</div>


### [v0.4.4](https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.4.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/12/2019 | Modules affected: s3-cloudfront | <a href="https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.4.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

* `s3-cloudfront`


* The `s3-cloudfront` module now supports the use of an Origin Group for the ability to failover automatically in the event your primary bucket is not accessible


* #22 

</div>


### [v0.5.0](https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.5.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/8/2019 | <a href="https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.5.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  **Modules affected**

s3-static-website [**BACKWARDS INCOMPATIBLE**]
s3-cloud front [**BACKWARDS INCOMPATIBLE**]

**Description**
**All the modules are now terraform 0.12.0 compatible**. Note that this means the modules are **no longer compatible with terraform 0.11 and under**. Starting this release, you must use terraform 0.12.0 or greater to use this module.

All the module variables have been updated to use concrete types based on the new type system introduced in terraform 0.12.0. You can learn more about the types in [the official documentation](https://www.terraform.io/docs/configuration/types.html).

Note that as part of this, we switched to using `null` to indicate unset values when passing them through to resources. If you were previously using a 0 value (`&quot;&quot;` for strings and `0` for numbers), review the module `variables.tf` file to double check if the 0 value has been converted to a `null`.

**Related links**

</div>



## terraform-aws-vpc


### [v0.6.1](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.6.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/22/2019 | Modules affected: vpc-mgmt, vpc-app | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.6.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fix a bug where the `availability_zones` outputs of `vpc-app` and `vpc-mgmt` had an extra layer of nesting, so you ended up with a list of lists, rather than a single, flat list.


</div>



## terraform-kubernetes-helm


### [v0.5.1](https://github.com/gruntwork-io/terraform-kubernetes-helm/releases/tag/v0.5.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/26/2019 | Modules affected: **No changes to underlying modules** | <a href="https://github.com/gruntwork-io/terraform-kubernetes-helm/releases/tag/v0.5.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Improve testing: test latest version of `kubergrunt` and update `setup-minikube` script for CI.
- Fix typo in root example where the helm client TLS public certificate was not being returned.



</div>

<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "releases",
  "hash": "7af3b48b01a1434647d260dab548eca9"
}
##DOCS-SOURCER-END -->

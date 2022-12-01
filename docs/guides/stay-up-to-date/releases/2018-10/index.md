
# Gruntwork release 2018-10

<p style={{marginTop: "-25px"}}><small><a href="/guides">Guides</a> / <a href="/guides/stay-up-to-date">Update Guides</a> / <a href="/guides/stay-up-to-date/releases">Releases</a> / 2018-10</small></p>

This page is lists all the updates to the [Gruntwork Infrastructure as Code 
Library](https://gruntwork.io/infrastructure-as-code-library/) that were released in 2018-10. For instructions 
on how to use these updates in your code, check out the [updating 
documentation](/guides/working-with-code/using-modules#updating).

Here are the repos that were updated:

- [gruntwork](#gruntwork)
- [terraform-aws-asg](#terraform-aws-asg)
- [terraform-aws-ci](#terraform-aws-ci)
- [terraform-aws-data-storage](#terraform-aws-data-storage)
- [terraform-aws-ecs](#terraform-aws-ecs)
- [terraform-aws-elk](#terraform-aws-elk)
- [terraform-aws-kafka](#terraform-aws-kafka)
- [terraform-aws-lambda](#terraform-aws-lambda)
- [terraform-aws-monitoring](#terraform-aws-monitoring)
- [terraform-aws-openvpn](#terraform-aws-openvpn)
- [terraform-aws-security](#terraform-aws-security)
- [terraform-aws-zookeeper](#terraform-aws-zookeeper)


## gruntwork


### [v0.0.23](https://github.com/gruntwork-io/gruntwork/releases/tag/v0.0.23)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/13/2018 | <a href="https://github.com/gruntwork-io/gruntwork/releases/tag/v0.0.23">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/gruntwork/pull/33: Fixes https://github.com/gruntwork-io/gruntwork/issues/18 where member level org users could not go through the github grant workflow due to not being included to the created team as a maintainer in the initial step.

This also adds additional logging that shows you which github user you are authenticated as.

</div>


### [v0.0.22](https://github.com/gruntwork-io/gruntwork/releases/tag/v0.0.22)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/12/2018 | <a href="https://github.com/gruntwork-io/gruntwork/releases/tag/v0.0.22">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/gruntwork/pull/32: This PR updates the IAM role the gruntwork CLI creates in each of the customer's AWS accounts so that it can be assumed not only from Gruntwork's master account (so we can deploy the Ref Arch), but also so it can be assumed from the customer's own security account (or, in a single-account deployment, that same account). The reason to add this is that we now deploy the Reference Architecture by launching an EC2 Instance in the customer's security account and letting it do the deployment. This includes assuming an IAM Role to get access to each of the customer's other accounts.

</div>



## terraform-aws-asg


### [v0.6.19](https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.6.19)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/27/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.6.19">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
Here's an example of how to first launch Module A and then launch Module B:

```hcl
module "a" {
  # Be sure to update to the latest version of this module
  source = "git::git@github.com:gruntwork-io/module-asg.git//modules/server-group?ref=v0.6.19"
  ...
}

module "b" {
  source = "git::git@github.com:gruntwork-io/module-asg.git//modules/server-group?ref=v0.6.19"

  # It's important that you use the "rolling_deployment_done" output of module A, not just any output
  wait_for = "${module.a.rolling_deployment_done}"
  ...
}
```

</div>


### [v0.6.18](https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.6.18)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/16/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.6.18">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/module-asg/pull/46, https://github.com/gruntwork-io/module-asg/pull/47: Fix the `asg-rolling-deploy` module so the script it uses within works with either Python 2 or Python 3.

</div>



## terraform-aws-ci


### [v0.13.3](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.13.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/18/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.13.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/module-ci/pull/77: Update the `git-add-commit-push` script to check there are files staged for commit before trying to commit.

</div>



## terraform-aws-data-storage


### [v0.7.0](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.7.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/15/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.7.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/module-data-storage/pull/54: 



Changes to the `lambda-cleanup-snapshots`, `lambda-copy-shared-snapshot`, `lambda-create-snapshot`, and `lambda-share-snapshot` modules: 

1. They now all use [package-lambda](https://github.com/gruntwork-io/package-lambda/) under the hood instead of the older lambda code that used to live in `module-ci`. The new version renames some resources and changes the name of the CloudWatch events/targets to be a bit shorter to help avoid exceeding the max length allowed by AWS.

1. They now expose optional `lambda_namespace` and `schedule_namespace` parameters that you can use to specify a custom namespace for the lambda function and scheduling resources, respectively. You can use this to completely customize all the names of resources created by these modules.

1. The `aws_region` data source no longer uses the `current` parameter, which is deprecated.

If you're already using these lambda modules and update, all the old lambda functions and schedule resources will be deleted and new ones created to replace them. Since these are just scheduled background jobs, this should not cause any problems, but just be aware that there will be lots of "delete and recreate" in your Terraform plan.


Changes to the `rds` module:

1. Added a `depends_on` clause for the `aws_subnet_group` resource so that `terraform destroy` happens in the right order and doesn't intermittently hit errors.

</div>



## terraform-aws-ecs


### [v0.10.0](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.10.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/29/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.10.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/module-ecs/pull/82 : ECS deployment checker

__This is a backwards incompatible change. See below for information on how to upgrade.__


When deploying containers to the ECS service resources in terraform, the built in resources will return a successful status code on apply as soon as the container has been scheduled for deployment. However, this only checks if the container is scheduled to run and not necessarily if the container is actually running on the service. This means that the new container you requested may not actually be up and running when the terraform apply finishes. Worse, there may be an error in the container that you may not detect until a manual verification process after the deployment.


All of the `ecs-service` modules in `module-ecs` will now run a separate binary as part of the deployment to verify the container is actually running before completing the apply. This binary will wait for up to 10 minutes (configurable via the `deployment_check_timeout_seconds` input parameter) before timing out the check and returning the last 5 events on the ECS services, helping you debug potential deployment failures during the `terraform apply`. In addition, if you setup an ALB or NLB with the service, the binary will check the ALB/NLB to verify the container is passing the healthcheck before exiting.


The binary will automatically be triggered with each deploy when you update to `module-ecs` v0.10.0. This binary requires a working python install to run (supports versions 2.7, 3.5, 3.6, and 3.7). If this is undesirable or if you do not have a working python install, you can get the old behavior by setting `enable_ecs_deployment_check` to `false` on the module inputs.

</div>


### [v0.9.0](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.9.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/19/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.9.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/module-ecs/pull/94 : `ecs-service-with-discovery` now supports extending the ECS task with additional IAM roles and security groups.

This is a backwards incompatible change for the `ecs-service-with-discovery` module. Specifically:

- ECS task will now need a IAM role to be attached, so when applying to the new version, a new role will be created and when attaching, will replace the existing task resource.
- The module has a new required input variable `environment_name` used to distinguish the different IAM roles for each environment.

</div>



## terraform-aws-elk


### [v0.2.7](https://github.com/gruntwork-io/terraform-aws-elk/releases/tag/v0.2.7)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/1/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-elk/releases/tag/v0.2.7">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
Also renamed vars.tf -&gt; variables.tf

</div>


### [v0.2.6](https://github.com/gruntwork-io/terraform-aws-elk/releases/tag/v0.2.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/1/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-elk/releases/tag/v0.2.6">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - #58 This release addresses issue: #57. `kibana-cluster` will now create egress rules for the security group that it creates.
- Stabilized the ELK tests.
- Added better documentation/clarified examples with our AMI and example code READMEs

</div>



## terraform-aws-kafka


### [v0.4.2](https://github.com/gruntwork-io/terraform-aws-kafka/releases/tag/v0.4.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/18/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-kafka/releases/tag/v0.4.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/package-kafka/pull/38:

The `run-kafka` script now exposes new parameters to configure a number of security settings:

* Configure which SSL protocols and ciphers are supported with `--ssl-protocols`, `--ssl-client-auth`, `--ssl-cipher-suites`, and `--ssl-secure-random-implementation`.
* Enable SASL authentication using `--enable-sasl`, `--sasl-mechanisms`, `--sasl-inter-broker-protocol`, and `--sasl-jaas-config-path`.
* Enable ACLs using `--enable-acl`, `--acl-authorizer-class-name`, and `--acl-allow-everyone-if-no-acl-found`.

https://github.com/gruntwork-io/package-kafka/pull/41:

The Kafka Connect, Schema Registry, and REST Proxy modules now all allow you to configure a key store to use for validating SSL connections:

* The `xxx-install.sh` script for each module now supports `--kafka-key-store-dir-src` and `--kafka-key-store-dir-dst` params to install the key stores.
* The `xxx-run.sh` script for each module now supports `--kafka-client-key-store-path` and `--kafka-client-key-store-password` to configure the service to use a key store.

https://github.com/gruntwork-io/package-kafka/pull/42: 

The `run-kafka` script now allows you to configure the ZooKeeper chroot and enable JMX:

* Configure ZooKeeper chroot using `--zookeeper-chroot`.
* Enable JMX using `--enable-jmx`, `--jmx-port`, and `--jmx-opts`.

</div>



## terraform-aws-lambda


### [v0.3.0](https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.3.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/15/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.3.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/package-lambda/pull/22: 

BACKWARDS INCOMPATIBLE CHANGE

The `scheduled-lambda-job` module now namespaces all of its resources with the format `"${var.lambda_function_name}-scheduled"` instead of `"${var.lambda_function_name}-scheduled-lambda-job"`. This makes names shorter and less likely to exceed AWS name length limits. If you `apply` this new version, your CloudWatch events, targets, and permissions will be destroyed and recreated, which is typically harmless. If you wish to override the namespacing behavior, you now set a new input variable called `namespace`. 

</div>



## terraform-aws-monitoring


### [v0.10.0](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.10.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/16/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.10.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/module-aws-monitoring/pull/54: Fix the alarm name used by the `asg-disk-alarms` module to include the file system and mount path. This ensures that if you create multiple alarms for multiple disks on the same auto scaling groups, they each get a unique name, rather than overwriting each other. 

</div>


### [v0.9.3](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.9.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/8/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.9.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/module-aws-monitoring/pull/51: Fix a bug where the `load-balancer-access-logs` module would always show a diff for the S3 bucket lifecycle settings when you ran `plan`, even though nothing changed.

</div>


### [v0.9.2](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.9.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/8/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.9.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/module-aws-monitoring/pull/50: The `cloudwatch-log-aggregation-scripts`, `cloudwatch-memory-disk-metrics-scripts`, and `syslog` modules now support Amazon Linux 2.

</div>



## terraform-aws-openvpn


### [v0.8.0](https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.8.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/9/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.8.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/package-openvpn/pull/53: 

**BACKWARDS INCOMPATIBLE CHANGE**

`package-openvpn` now uses [bash-commons](https://github.com/gruntwork-io/bash-commons/) under the hood. The behavior is identical, but you must now install `bash-commons` *before* installing any of the `package-openvpn` modules. For example, in your OpenVPN packer template, you should add `bash-commons` as one of the very first items:

```json
gruntwork-install --module-name 'bash-commons' --repo 'https://github.com/gruntwork-io/bash-commons' --tag 'v0.0.6'
```

</div>



## terraform-aws-security


### [v0.15.3](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.15.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/30/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.15.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - #115: Fix test failures caused by #114 

- #116: Update the `os-hardening` module to the latest Gruntwork best practices and dependencies

- #117: Update bash scripts in several modules to use https://github.com/gruntwork-io/bash-commons instead of reinventing the wheel.

A special thanks to @jeckhart for contributing all of these PRs!


</div>


### [v0.15.2](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.15.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/8/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.15.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/module-security/pull/111: Fix a bug where the `cloudtrail` module would always show a diff for the S3 bucket lifecycle settings when you ran `plan`, even though nothing changed.

</div>



## terraform-aws-zookeeper


### [v0.4.8](https://github.com/gruntwork-io/terraform-aws-zookeeper/releases/tag/v0.4.8)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/18/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-zookeeper/releases/tag/v0.4.8">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/package-zookeeper/pull/31, https://github.com/gruntwork-io/package-zookeeper/pull/32: Update to `module-asg` version `v0.6.18` so that the rolling deploy script works with either Python 2 or 3. Upgrade Oracle JDK installer to version `8u192-b12`. 

</div>




<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "releases",
  "hash": "a0fdc730782cfaf0cdc5cee68157b086"
}
##DOCS-SOURCER-END -->


# Gruntwork release 2018-12

<p style={{marginTop: "-25px"}}><small><a href="/guides">Guides</a> / <a href="/guides/stay-up-to-date">Update Guides</a> / <a href="/guides/stay-up-to-date/releases">Releases</a> / 2018-12</small></p>

This page is lists all the updates to the [Gruntwork Infrastructure as Code
Library](https://gruntwork.io/infrastructure-as-code-library/) that were released in 2018-12. For instructions
on how to use these updates in your code, check out the [updating
documentation](/library/stay-up-to-date/updating).

Here are the repos that were updated:

- [package-k8s](#package-k8s)
- [terraform-aws-asg](#terraform-aws-asg)
- [terraform-aws-beanstalk](#terraform-aws-beanstalk)
- [terraform-aws-ci](#terraform-aws-ci)
- [terraform-aws-data-storage](#terraform-aws-data-storage)
- [terraform-aws-ecs](#terraform-aws-ecs)
- [terraform-aws-lambda](#terraform-aws-lambda)
- [terraform-aws-messaging](#terraform-aws-messaging)
- [terraform-aws-mongodb](#terraform-aws-mongodb)
- [terraform-aws-monitoring](#terraform-aws-monitoring)
- [terraform-aws-security](#terraform-aws-security)
- [terraform-aws-server](#terraform-aws-server)


## package-k8s


### [v0.1.3](https://github.com/gruntwork-io/package-k8s/releases/tag/v0.1.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/21/2018 | Modules affected: kubergrunt | <a href="https://github.com/gruntwork-io/package-k8s/releases/tag/v0.1.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- `kubergrunt`


This release introduces a major feature of performing a rolling update on your EKS cluster. Specifically, this introduces the subcommand `kubergrunt eks deploy` which can be used to rollout launch configuration changes in your EKS cluster. This command should be run after a `terraform apply` has been made to update the launch configuration of the underlying ASG.

The command will then:
- double the capacity of the specified ASG so that new instances will launch using the updated configuration
- drain all the existing nodes in your cluster
- detach and terminate the original nodes in your cluster, completing the roll out.


- This release is not intended to be used in production, as core features of a production grade infrastructure are still missing. This is currently intended to be used for development and learning purposes so that you can plan out a migration to Gruntwork modules for managing EKS.


- https://github.com/gruntwork-io/package-k8s/pull/31

</div>


### [v0.1.2](https://github.com/gruntwork-io/package-k8s/releases/tag/v0.1.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/21/2018 | Modules affected: eks-k8s-role-mapping, eks-cluster-control-plane | <a href="https://github.com/gruntwork-io/package-k8s/releases/tag/v0.1.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- `eks-k8s-role-mapping`
- `eks-cluster-control-plane`


- This release fixes a bug in `eks-k8s-role-mapping` with Windows, where using python2.7 caused the data source to crash.
- `eks-cluster-control-plane` now includes a new variable `kubernetes_version` to specify the platform version to use on the cluster.
- Starting this release, this repository will include the following regions in the tests:
```
eu-central-1
ap-southeast-1
ap-southeast-2
ap-northeast-1
```


- This release is not intended to be used in production, as core features of a production grade infrastructure are still missing. This is currently intended to be used for development and learning purposes so that you can plan out a migration to Gruntwork modules for managing EKS.


- https://github.com/gruntwork-io/package-k8s/pull/41
- https://github.com/gruntwork-io/package-k8s/pull/42

</div>


### [v0.1.1](https://github.com/gruntwork-io/package-k8s/releases/tag/v0.1.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/19/2018 | Modules affected: eks-k8s-role-mapping, kubergrunt | <a href="https://github.com/gruntwork-io/package-k8s/releases/tag/v0.1.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  This release supports Windows Powershell.


- `eks-k8s-role-mapping`
- `kubergrunt`


- `eks-k8s-role-mapping` is now tested and verified for Windows Powershell compatibility.
- `kubergrunt eks configure` will now create a new kubeconfig file if it does not exist


- This release is not intended to be used in production, as core features of a production grade infrastructure are still missing. This is currently intended to be used for development and learning purposes so that you can plan out a migration to Gruntwork modules for managing EKS.


- https://github.com/gruntwork-io/package-k8s/pull/37

</div>


### [v0.1.1-1](https://github.com/gruntwork-io/package-k8s/releases/tag/v0.1.1-1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/19/2018 | <a href="https://github.com/gruntwork-io/package-k8s/releases/tag/v0.1.1-1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  There are no changes to modules in this release. This release is a test of the circleci config

</div>


### [v0.1.0](https://github.com/gruntwork-io/package-k8s/releases/tag/v0.1.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/1/2018 | Modules affected: eks-k8s-role-mapping, kubergrunt, k8s-scripts, install-aws-iam-authenticator | <a href="https://github.com/gruntwork-io/package-k8s/releases/tag/v0.1.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- `eks-k8s-role-mapping`
- `kubergrunt` **[New]** 
- `k8s-scripts` **[Breaking Change]** 
- `install-aws-iam-authenticator` **[Breaking Change]** 


- `eks-k8s-role-mapping` scripts are no longer baked into the PEX binary and instead loaded via the `PYTHONPATH`.
- **New**: This release introduces `kubergrunt`, an encompassing tool that supports the configuration and management of a Kubernetes cluster. This command replaces both `eks-configure-kubectl` and `aws-iam-authenticator` by embedding the functionalities of those commands under different subcommands in `kubergrunt`. By doing so, we cut out the dependency on the awscli and `aws-iam-authenticator`, and so you only need to install this tool.
- **Breaking Change**: `k8s-scripts` has been completely rewritten. As a result, `eks-configure-kubectl` is no longer provided as a stand alone script. Instead, it has been embedded into the new `kubergrunt` CLI tool.
- **Breaking Change**: `aws-iam-authenticator` will no longer be provided as a part of this repo. You can use `kubergrunt` instead, or install directly from the links in [the official AWS documentation](https://docs.aws.amazon.com/eks/latest/userguide/configure-kubectl.html).


To upgrade to this version, install `kubergrunt` by following [the installation instructions](https://github.com/gruntwork-io/package-k8s/tree/master/modules/kubergrunt).



- This release is not intended to be used in production, as core features of a production grade infrastructure are still missing. This is currently intended to be used for development and learning purposes so that you can plan out a migration to Gruntwork modules for managing EKS.
- This release is not tested with windows. Please file any bugs/issues you run into on [the issue tracker](https://github.com/gruntwork-io/package-k8s/issues).


- https://github.com/gruntwork-io/package-k8s/pull/29
- https://github.com/gruntwork-io/package-k8s/pull/30

</div>



## terraform-aws-asg


### [v0.6.22](https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.6.22)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/20/2018 | Modules affected: server-group | <a href="https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.6.22">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
* `server-group`


* Fix a bug where you&apos;d get an error if you passed more than one CIDR block into the `allow_ssh_from_cidr_blocks` parameter.


* https://github.com/gruntwork-io/module-asg/pull/54

</div>


### [v0.6.21](https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.6.21)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/18/2018 | Modules affected: server-group | <a href="https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.6.21">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
* `server-group`


* Fix an issue where destroying a `server-group` would cause the error `Resource &apos;data.template_file.rolling_deployment&apos; does not have attribute &apos;rendered&apos; for variable &apos;data.template_file.rolling_deployment.rendered&apos;`.


* https://github.com/gruntwork-io/module-asg/pull/52

</div>


### [v0.6.20](https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.6.20)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/11/2018 | Modules affected: server-group | <a href="https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.6.20">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
* `server-group`


* The `ebs_volumes` parameter in the `server-group` module now allows you to specify `snapshot_id` to force an EBS volume to restore from a snapshot rather than loading one from scratch.


* https://github.com/gruntwork-io/module-asg/pull/49

</div>



## terraform-aws-beanstalk


### [v0.0.4](https://github.com/gruntwork-io/terraform-aws-beanstalk/releases/tag/v0.0.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/17/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-beanstalk/releases/tag/v0.0.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
Added extra retry logic to application_deployer

</div>


### [v0.0.3](https://github.com/gruntwork-io/terraform-aws-beanstalk/releases/tag/v0.0.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/14/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-beanstalk/releases/tag/v0.0.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Added the zipped boto3 library for use in the current python scripts. This will be replaced later by pex rather than relying on the zip files and python path munging.

</div>


### [v0.0.2](https://github.com/gruntwork-io/terraform-aws-beanstalk/releases/tag/v0.0.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/14/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-beanstalk/releases/tag/v0.0.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
This is needed because:
1. It is cleaner to package up the implementation behind a module
1. It&apos;s not possible to refer to the actual python script with a relative path based of of `path.module` so we actually need this code to be wrapped

Secondarily - change the bucket_id input to be a bucket_name input in the application version deployer. This will make it easier to use the module when something else is creating a bucket or if the bucket already exists as it will in the Houston self service template.

</div>


### [v0.0.1](https://github.com/gruntwork-io/terraform-aws-beanstalk/releases/tag/v0.0.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/6/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-beanstalk/releases/tag/v0.0.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  This is a pre-release the introduces package-beanstalk: A series of modules to get apps up and running in elastic beanstalk.

The main modules are:
* `elasticbeanstalk-application`: A module for creating an Elastic Beanstalk application
* `elasticbeanstalk-environment`: A module for setting up the Elastic Beanstalk environment

The supporting modules are:
* `app-version`: A module that contains scripts that help upload release artifacts to Beanstalk as well as to deploy them
* `configuration-deployer`: A script to help apply configuration templates to the Elastic Beanstalk deployed application
* `iam-policies`: A Terraform module to configure IAM permissions used by Elastic Beanstalk.

See the main README for more information.

</div>



## terraform-aws-ci


### [v0.13.6](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.13.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/11/2018 | Modules affected: jenkins-server | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.13.6">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
* `jenkins-server`


* The `jenkins-server` module now exposes a `ebs_volume_snapshot_id` param to allow you to restore from an EBS snapshot.


* https://github.com/gruntwork-io/module-ci/pull/81

</div>


### [v0.13.5](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.13.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/6/2018 | Modules affected: jenkins-server | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.13.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
* `jenkins-server`


* The `jenkins-server` module now exposes all the health check params via new parameters `jenkins_protocol`, `jenkins_deregistration_delay`, `health_check_interval`, `health_check_healthy_threshold`, `health_check_unhealthy_threshold`, and `health_check_timeout`. You can tweak these settings in case your Jenkins instance takes a long time to boot up.


* https://github.com/gruntwork-io/module-ci/pull/80

</div>



## terraform-aws-data-storage


### [v0.8.4](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.8.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/13/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.8.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
 * `rds`


Postgres 10 on RDS uses a slightly different format for the default parameter group names. This resolves issue #55 where using the `rds` module to create a Postgres 10 database would throw an error. This release also splits the RDS example into multiple examples for a variety of supported database engines.


* #55 
* #66

</div>


### [v0.8.3](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.8.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/11/2018 | Modules affected: lambda-cleanup-snapshots, lambda-copy-shared-snapshot, lambda-create-snapshot, lambda-share-snapshot | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.8.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
* `lambda-cleanup-snapshots`
* `lambda-copy-shared-snapshot`
* `lambda-create-snapshot`
* `lambda-share-snapshot`


* All of the snapshot management modules have been upgraded to package-lambda v0.5.0. This resolves the perpetual diff in the `terraform plan` for the lambda functions.


* https://github.com/gruntwork-io/module-data-storage/pull/68

</div>


### [v0.8.2](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.8.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/6/2018 | Modules affected: lambda-cleanup-snapshots, lambda-copy-shared-snapshot, lambda-create-snapshot, lambda-share-snapshot | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.8.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
* `lambda-cleanup-snapshots`
* `lambda-copy-shared-snapshot`
* `lambda-create-snapshot`
* `lambda-share-snapshot`


* All of the snapshot management modules have been upgraded to package-lambda v0.4.0. This resolves the perpetual diff in the `terraform plan` for IAM roles and policies. There is still a perpetual diff in the lambda functions.


* https://github.com/gruntwork-io/module-data-storage/pull/67

</div>



## terraform-aws-ecs


### [v0.10.3](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.10.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/8/2018 | Modules affected: ecs-cluster | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.10.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- `ecs-cluster`


- `roll-out-ecs-cluster-update.py` now supports python3.


- https://github.com/gruntwork-io/module-ecs/pull/102

</div>



## terraform-aws-lambda


### [v0.5.0](https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.5.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/10/2018 | Modules affected: lambda, lambda_edge | <a href="https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.5.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- `lambda` **[Breaking Change]** 
- `lambda_edge` **[Breaking Change]** 


- **Breaking Change**: the `lambda` and `lambda_edge` modules no longer export the zip file to the `source_dir`, but rather to the module path under the name `$&#x7B;var.name&#x7D;-lambda.zip`. This is customizable using the `zip_output_path`. You can set this to variable to `$&#x7B;var.source_dir&#x7D;/lambda.zip` to get the old behavior.
- This release fixes a bug where you could end up with a perpetual diff in the terraform plan, caused by zipping up the previous runs&apos; archive file.


- https://github.com/gruntwork-io/package-lambda/pull/28

</div>


### [v0.4.0](https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.4.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/6/2018 | Modules affected: lambda | <a href="https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.4.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- `lambda` **[Breaking Change]** 


- **Breaking Change**: the `lambda` module removes the `wait_for` variable as it was not working as intended due to a limitation in terraform&apos;s use of `depends_on` with data sources. Additionally, the implementation of `wait_for` introduced a perpetual diff issue where the `plan` would always detect a change. The removal of `wait_for` fixes that.


To upgrade to this version, remove the `wait_for` input parameter in all calls to the `lambda` module.


- https://github.com/gruntwork-io/package-lambda/pull/27

</div>



## terraform-aws-messaging


### [v0.1.3](https://github.com/gruntwork-io/terraform-aws-messaging/releases/tag/v0.1.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/20/2018 | Modules affected: sqs | <a href="https://github.com/gruntwork-io/terraform-aws-messaging/releases/tag/v0.1.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
* `sqs`


The `sqs` module now exposes several new input parameters:

* `apply_ip_queue_policy`: Should the ip access policy be attached to the queue?
* `kms_master_key_id`: The ID of a KMS master key to use for encryption.
* `kms_data_key_reuse_period_seconds`: The length of time for which Amazon SQS can reuse a data key to encrypt or decrypt messages before calling AWS KMS again.


* https://github.com/gruntwork-io/package-messaging/pull/11
* https://github.com/gruntwork-io/package-messaging/pull/12

</div>


### [v0.1.2](https://github.com/gruntwork-io/terraform-aws-messaging/releases/tag/v0.1.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/19/2018 | Modules affected: sqs | <a href="https://github.com/gruntwork-io/terraform-aws-messaging/releases/tag/v0.1.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
* `sqs`


* Adds support to passing tags that will be applied to the resources


* https://github.com/gruntwork-io/package-messaging/pull/10

</div>



## terraform-aws-mongodb


### [v0.3.0](https://github.com/gruntwork-io/terraform-aws-mongodb/releases/tag/v0.3.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/11/2018 | Modules affected: install-mongodb | <a href="https://github.com/gruntwork-io/terraform-aws-mongodb/releases/tag/v0.3.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
* `install-mongodb` **[Breaking Change]**


* `install-mongodb` no longer tries to upgrade `pip`, as this causes issues with `pip` disappearing from the `PATH`. We recommend removing `pip` upgrade steps from your Packer templates too.


* https://github.com/gruntwork-io/package-mongodb/pull/27: 

</div>



## terraform-aws-monitoring


### [v0.10.2](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.10.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/17/2018 | Modules affected: cloudwatch-dashboard-metric-widget, cloudwatch-dashboard-text-widget | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.10.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- `cloudwatch-dashboard-metric-widget`
- `cloudwatch-dashboard-text-widget`


- `cloudwatch-dashboard-metric-widget`: The variables `x_axis` and `y_axis` are no longer compulsory, you can now omit them to achieve a fluid layout by leaving the CloudWatch dashboard UI to automatically position your widgets
- `cloudwatch-dashboard-text-widget`: The variables `x_axis` and `y_axis` are no longer compulsory, you can now omit them to achieve a fluid layout by leaving the CloudWatch dashboard UI to automatically position your widgets


To upgrade to this version, simply bump the value of the `ref` parameter on your Terraform module `source` argument to `v0.10.2`


- https://github.com/gruntwork-io/module-aws-monitoring/pull/58
- https://github.com/gruntwork-io/module-aws-monitoring/commit/2a040b6e24928b820899f49bca6e34a676d8a673

</div>


### [v0.10.1](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.10.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/4/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.10.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

</div>



## terraform-aws-security


### [v0.15.6](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.15.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/11/2018 | Modules affected: cloudtrail | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.15.6">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
* `cloudtrail`


* The `cloudtrail` module now grants key administrators the `kms:Tag*` and `kms:Untag*` permissions.


* https://github.com/gruntwork-io/module-security/pull/124

</div>



## terraform-aws-server


### [v0.5.2](https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.5.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/6/2018 | Modules affected: persistent-ebs-volume | <a href="https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.5.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
* `persistent-ebs-volume`


* Fix a bug with how the `mount-ebs-volume` script checked if a volume was already formatted.


* https://github.com/gruntwork-io/module-server/pull/37

</div>


### [v0.5.1](https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.5.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/3/2018 | Modules affected: persistent-ebs-volume | <a href="https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.5.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
* `persistent-ebs-volume`


* Fix `volume_ids: readonly variable` bug that would show up on Ubuntu 18.04 for `mount-ebs-volume`. 
* Fix bug with missing `is_nvme` function in `unmount-ebs-volume`.
* Clean up bash syntax in both scripts.


* https://github.com/gruntwork-io/module-server/issues/35

</div>




<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "releases",
  "hash": "c3406b2cc0c663c28b79e9329d78f766"
}
##DOCS-SOURCER-END -->

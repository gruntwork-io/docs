
# Gruntwork release 2020-05

<p style={{marginTop: "-25px"}}><small><a href="/guides">Guides</a> / <a href="/guides/stay-up-to-date">Update Guides</a> / <a href="/guides/stay-up-to-date/releases">Releases</a> / 2020-05</small></p>

This page is lists all the updates to the [Gruntwork Infrastructure as Code
Library](https://gruntwork.io/infrastructure-as-code-library/) that were released in 2020-05. For instructions
on how to use these updates in your code, check out the [updating
documentation](/library/stay-up-to-date/updating).

Here are the repos that were updated:

- [aws-sample-app](#aws-sample-app)
- [gruntwork](#gruntwork)
- [terraform-aws-asg](#terraform-aws-asg)
- [terraform-aws-ci](#terraform-aws-ci)
- [terraform-aws-cis-service-catalog](#terraform-aws-cis-service-catalog)
- [terraform-aws-data-storage](#terraform-aws-data-storage)
- [terraform-aws-ecs](#terraform-aws-ecs)
- [terraform-aws-eks](#terraform-aws-eks)
- [terraform-aws-lambda](#terraform-aws-lambda)
- [terraform-aws-load-balancer](#terraform-aws-load-balancer)
- [terraform-aws-monitoring](#terraform-aws-monitoring)
- [terraform-aws-security](#terraform-aws-security)
- [terraform-aws-utilities](#terraform-aws-utilities)
- [terraform-aws-vpc](#terraform-aws-vpc)


## aws-sample-app


### [v0.0.1](https://github.com/gruntwork-io/aws-sample-app/releases/tag/v0.0.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/26/2020 | <a href="https://github.com/gruntwork-io/aws-sample-app/releases/tag/v0.0.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  First release!

</div>



## gruntwork


### [v0.1.3](https://github.com/gruntwork-io/gruntwork/releases/tag/v0.1.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/6/2020 | <a href="https://github.com/gruntwork-io/gruntwork/releases/tag/v0.1.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/gruntwork/pull/59: Add more Gruntwork GitHub IDs.

</div>



## terraform-aws-asg


### [v0.8.7](https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.8.7)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/15/2020 | Modules affected: server-group | <a href="https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.8.7">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- You can now enable encryption for the root block device by using the `root_block_device_encrypted` input variable.



</div>



## terraform-aws-ci


### [v0.22.1](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.22.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/29/2020 | Modules affected: ecs-deploy-runner | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.22.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

`ecs-deploy-runner` now outputs the security group used by the ECS task so that you can append additional rules to it.



</div>


### [v0.22.0](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.22.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/28/2020 | Modules affected: jenkins-server | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.22.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

This release bumps the version of [the ALB module](https://github.com/gruntwork-io/module-load-balancer/tree/master/modules/alb) used by Jenkins to `v0.20.1` to fix an issue related to outputs from the ALB module.

**Migration guide**
The `jenkins-server` module no longer takes the `aws_account_id` variable. To update to this release, do not pass the variable as an input.




</div>


### [v0.21.0](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.21.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/27/2020 | Modules affected: infrastructure-deployer, ecs-deploy-runner | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.21.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

The `infrastructure-deployer` now supports selecting the container to run in a multi container deployment for the `ecs-deploy-runner`. Note that this version of the `infrastructure-deployer` is only compatible with an `ecs-deploy-runner` that is deployed with this version.




</div>


### [v0.20.2](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.20.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/26/2020 | Modules affected: ecs-deploy-runner, infrastructure-deploy-script | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.20.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

The `infrastructure-deploy-script` now supports running `destroy`. Note that the threat model of running `destroy` in the CI/CD pipeline is not well thought out and is not recommended. Instead, directly call the ECS task to run destroy using privileged credentials.



</div>


### [v0.20.1](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.20.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/15/2020 | Modules affected: build-helpers | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.20.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

`build-packer-artifact` now supports building a packer template from a git repository. See [the updated docs](https://github.com/gruntwork-io/module-ci/tree/master/modules/build-helpers#remote-packer-templates) for more info.



</div>


### [v0.20.0](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.20.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/15/2020 | Modules affected: ecs-deploy-runner | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.20.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
`ecs-deploy-runner` now supports specifying multiple container images, and choosing a container image based on a user defined name. This allows you to configure and use different Docker containers for different purposes of your infrastructure pipeline.




</div>


### [v0.19.0](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.19.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/7/2020 | Modules affected: infrastructure-deployer, infrastructure-deploy-script, install-jenkins | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.19.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- The CLI arg for setting the log level in `infrastructure-deployer` and `infrastructure-deploy-script` has been renamed to `--log-level` instead of `--loglevel`.

- The `infrastructure-deploy-script` no longer supports passing in the private SSH key via CLI args. You must pass it in with the environment variable `DEPLOY_SCRIPT_SSH_PRIVATE_KEY`.

- `install-jenkins` will automatically disable jenkins so that it won&apos;t start on boot. This ensures that jenkins will not be started unless it has been successfully configured with `run-jenkins`. To get the previous behavior, pass in `--module-param &quot;run-on-boot=true&quot;`.



</div>



## terraform-aws-cis-service-catalog


### [v0.4.1](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.4.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/8/2020 | Modules affected: aws-securityhub | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.4.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

`aws-securityhub` no longer depends on python to get enabled regions, and instead uses a terraform native data source.



</div>



## terraform-aws-data-storage


### [v0.12.17](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.12.17)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/28/2020 | Modules affected: aurora | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.12.17">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- You can now enable cross-region replication for Aurora by setting `source_region` and `replication_source_identifier` to the region and ARN, respectively, of a primary Aurora DB.




</div>


### [v0.12.16](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.12.16)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/26/2020 | Modules affected: aurora | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.12.16">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Allow changing the auto minor version upgrade behavior



</div>


### [v0.12.15](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.12.15)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/18/2020 | Modules affected: efs | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.12.15">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Bugfix for EFS: create mount targets in correct security group



</div>


### [v0.12.14](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.12.14)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/14/2020 | Modules affected: efs | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.12.14">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

This release adds a new module for [Amazon Elastic Filesystem (EFS)](https://aws.amazon.com/efs/).


</div>


### [v0.12.13](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.12.13)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/5/2020 | Modules affected: aurora | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.12.13">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- You can now pass in an optional list of IAM roles to attach to the Aurora cluster using the new `cluster_iam_roles` input variable.


</div>


### [v0.12.12](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.12.12)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/1/2020 | Modules affected: rds, aurora | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.12.12">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

You can now provide an existing DB subnet group to use with the RDS clusters instead of creating a new one.



</div>



## terraform-aws-ecs


### [v0.19.1](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.19.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/9/2020 | Modules affected: ecs-service | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.19.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

You can now configure the platform version of ECS Fargate using the `platform_version` variable.



</div>



## terraform-aws-eks


### [v0.20.0](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.20.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/29/2020 | Modules affected: eks-cluster-workers, eks-cluster-control-plane, eks-k8s-role-mapping | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.20.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

This release introduces first class support for using [the EKS cluster security group](https://docs.aws.amazon.com/eks/latest/userguide/sec-group-reqs.html#cluster-sg) with self managed workers:

- The `eks-cluster-control-plane` module now outputs the cluster security group ID so that you can extend it with additional rules.

- The `eks-cluster-workers` module now appends the cluster security group to the node instead of rolling out its own group by default. Note that it still creates its own group to make it easier to append rules that are only specific to the self-managed workers.

This release also fixes a bug with the `eks-k8s-role-mapping` module, where previously it did not support including the Fargate execution role. If you don&apos;t include the Fargate execution role in the mapping, terraform may delete the configuration rules that enable Fargate to communicate with the Kubernetes API as workers.




</div>


### [v0.19.9](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.19.9)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/28/2020 | Modules affected: eks-k8s-role-mapping | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.19.9">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

`eks-k8s-role-mapping` is now a pure terraform module and no longer uses python to assist in generating the role mapping. Note that this will cause a drift in the configuration state due to some of the attributes being reorganized, but the configuration is semantically equivalent (thus the roll out is backwards compatible).




</div>


### [v0.19.8](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.19.8)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/16/2020 | Modules affected: eks-cluster-workers | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.19.8">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

You can now specify the `max_instance_lifetime` on the autoscaling group created with `eks-cluster-workers`.


</div>


### [v0.19.7](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.19.7)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/8/2020 | Modules affected: eks-cluster-control-plane | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.19.7">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

`eks-cluster-control-plane` module will now automatically download and install `kubergrunt` if it is not available in the target system. This behavior can be disabled by setting the input variable `auto_install_kubergrunt` to `false`.

This release also includes several documentation fixes to READMEs of various modules.



</div>



## terraform-aws-lambda


### [v0.8.0](https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.8.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/7/2020 | Modules affected: lambda | <a href="https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.8.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

The `lambda` module is now more robust to partial failures in the module. Previously you could end up in a state where you couldn&apos;t `apply` or `destroy` the module if it only partially applied the resources due to output errors. This release addresses that by changing the output logic.

Note that previously this module output `null` for all the outputs when `create_resources` was `false`. However, with this release the output is converted to `&quot;&quot;`. If you depended on behavior of `null` outputs, you will need to adjust your code to convert `null` checks to `&quot;&quot;`.


</div>



## terraform-aws-load-balancer


### [v0.20.1](https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.20.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/20/2020 | Modules affected: alb | <a href="https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.20.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- ALB outputs have been adjusted to use `for` syntax as opposed to `zipmap` for the listener port =&gt; cert ARN mapping. This was due to [an obscure Terraform bug](https://github.com/hashicorp/terraform/pull/24083) that is not yet fixed/released.



</div>



## terraform-aws-monitoring


### [v0.21.2](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.21.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/29/2020 | Modules affected: alarms | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.21.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Added alarms for Replica Lag and Replication Errors.



</div>


### [v0.21.1](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.21.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/19/2020 | Modules affected: alarms | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.21.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Update README.md (fixes minor typo)
- Add RDS storage alarms for Aurora engine type



</div>


### [v0.21.0](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.21.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/4/2020 | Modules affected: metrics, logs | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.21.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- The `install.sh` scripts for the `cloudwatch-log-aggregation-scripts`, `syslog`, and `cloudwatch-memory-disk-metrics-scripts` modules were unnecessarily using `eval` to execute scripts used in the install steps. This led to unexpected behavior, such as `--module-param` arguments being shell expanded. We&apos;ve removed the calls to `eval` and replaced with a straight call to the underlying scripts. 

_This release is marked as backwards incompatible, but this only applies if you were (intentionally or otherwise) relying on the `eval` behavior (which is not likely or recommended!)._



</div>



## terraform-aws-security


### [v0.32.0](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.32.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/26/2020 | Modules affected: account-baseline-app, account-baseline-security, kms-master-key-multi-region, kms-master-key | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.32.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

`kms-master-key` now supports configuring service principal permissions with conditions. As part of this change, the way CloudTrail is setup in the Landing Zone modules have been updated to better support the multiaccount configuration. Refer to [the updated docs on multiaccount CloudTrail](https://github.com/gruntwork-io/module-security/blob/master/modules/cloudtrail/core-concepts.md#multi-account-cloudtrail-setup) for more information.



</div>


### [v0.31.0](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.31.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/21/2020 | Modules affected: cloudtrail, account-baseline-app, account-baseline-root, account-baseline-security | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.31.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

The `cloudtrail` module now supports reusing an existing KMS key in your account, as opposed to creating a new one. To use an existing key, set the `kms_key_already_exists` variable to `true` and provide the ARN of the key to the variable `kms_key_arn`.

Note that as part of this change, the `aws_account_id` variable was removed from the module and it will now look up the account ID based on the configured authentication credentials of the provider. Remove the variable in your module block to have a backwards compatible deployment.



</div>


### [v0.30.0](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.30.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/19/2020 | Modules affected: iam-policies, account-baseline-root | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.30.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- The `iam-policies` module now allows sts:TagSession for the automation users
- In v0.29.0, we updated `account-baseline-app` and `account-baseline-security` to allow for centralizing Config output in a single bucket. In this release, we take the same approach with `account-baseline-root`. It now supports using config bucket in security account. 

**Migration guide**
To centralize logs in S3, use [the same migration guide as in v0.29.0](https://github.com/gruntwork-io/module-security/releases/tag/v0.29.0).

To keep logs in the existing S3 bucket and make no change, set `should_create_s3_bucket=true`.



</div>


### [v0.29.1: Add EKS cluster permissions to read only IAM policy](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.29.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/7/2020 | Modules affected: iam-policies | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.29.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
This release grants permissions to describe/list EKS clusters to the read-only policy.




</div>


### [v0.29.0: Refactor of AWS Config](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.29.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/4/2020 | Modules affected: aws-config, aws-config-multi-region, account-baseline-security, account-baseline-root | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.29.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

The `aws-config` module has been refactored to better support multi-region, multi-account configurations. Previously, running the `aws-config-multi-region` would create an S3 bucket, an IAM role, and an SNS topic in each region. When run in multiple accounts, such as when using the Gruntwork reference architecture, each account would have the aforementioned resources within each region. This configuration was impractical to use since Config would be publishing data to dozens of buckets and topics, making it difficult to monitor and triage.

With this release, the `aws-config-multi-region` module has been modified as follows:

1. Only one IAM role is created. The AWS Config configuration recorder in each region assumes this role.
1. One S3 bucket is created in the same region as the `global_recorder_region`. The AWS Config configuration recorder in each region can this bucket.
1. One SNS topic is created per region. According to the AWS documentation, the topic must exist in the same region as the configuration recorder.
1. An aggregator resource is created to capture Config data from all regions to the `global_recorder_region`. The aggregated view in the AWS console interface will show results from all regions.

In addition, the `account-baseline-*` modules can now be configured in the following way:

1. The `account-baseline-security` module can be configured as the “central” account in which to aggregate all other accounts. 
1. The `account-baseline-app` module can be configured to use the central/security account. 

In this configuration, the central account will be configured with an S3 Bucket in the same region as the `global_recorder_region` and an SNS topic will be created in each region. Any account configured with `account-baseline-app` can publish to the S3 bucket in the central account, and to send SNS notifications to the topic in the corresponding region of the central account. In addition, all configuration recorders across all accounts will be aggregated to the `global_recorder_region` of the central account.

**Migration guide**

First, remove the now-unused regional AWS Config buckets from the terraform state so that the data remains intact. If you don&apos;t need the data, you can remove the buckets after removing them from the Terraform state. If you&apos;re using `bash`, the following loop should do the trick

```bash
for region in eu_north_1 eu_west_3 ap_southeast_2 ap_southeast_1 eu_west_1 us_east_2 sa_east_1 ap_northeast_2 ca_central_1 ap_south_1 eu_central_1 ap_northeast_1 us_east_1 eu_west_2 us_west_2 us_west_1; do
    terraform state rm &quot;module.config.module.aws_config_$&#x7B;region&#x7D;.aws_s3_bucket.config_bucket[0]&quot;
done
```

Find additional migration instructions below for the modules affected by this change.

For `aws-config`:

* `s3_bucket_name` remains a required variable.
* If `should_create_s3_bucket=true` (the default), an S3 bucket will be created. If it is `false`, AWS Config will be configured to use an existing bucket with the name provided by `s3_bucket_name`. 
* `sns_topic_name` is now optional. If `sns_topic_name` is provided, an SNS topic will be created. If `sns_topic_arn` is provided, AWS Config will be configured to use that topic.
* If `should_create_iam_role` is true (the default), an IAM role will be created with the default name of `AWSConfigRole`. 

For `aws-config-multi-region`:
* `global_recorder_region` is no longer required. The default is now `us-east-1`.
* The `name_prefix` variable has been removed.
* `s3_bucket_name` is now required. In addition, if `should_create_s3_bucket=true` (the default), an S3 bucket will be created in the same region as `global_recorder_region`. If `should_create_s3_bucket=false`, the configuration recorder will be configured to use an existing bucket with the name provided by `s3_bucket_name`.
* If a list of account IDs is provided in the `linked_accounts` variable, the S3 bucket and SNS topic policies will be configured to allow write access from those accounts.
* If an account ID is provided in the `central_account_id` variable, AWS Config will be configured to publish to the S3 bucket and SNS topic in that account.
* If `kms_key_arn` is provided, the S3 bucket and SNS topic will be encrypted with the provided key. If `kms_key_arn` is left as null, the S3 bucket will be encrypted with the default `aws/s3` key, and the SNS topic will not be encrypted.

For `account-baseline-security`:

* If a list of account IDs is provided in `config_linked_accounts`, those accounts will be granted access to the S3 bucket and SNS topic in the security account.
* If the `config_s3_bucket_name` variable is provided, the S3 bucket will be created with that name. If no name is provided, the bucket will have the default name of `$&#x7B;var.name_prefix&#x7D;-config`.


For `account-baseline-app`:

* The `config_central_account_id` variable should be configured with the ID of the account that contains the S3 bucket and SNS topic. This will typically be the account that is configured with `account-baseline-security`. 

* If the `config_s3_bucket_name` variable is provided, AWS Config will be configured to use that name (but the bucket will not be created within the account). If no name is provided, AWS Config will be configured to use a default name of `$&#x7B;var.name_prefix&#x7D;-config`. This bucket must already exist and should have appropriate permissions to allow access from this account. To set up permissions, provide this account ID in the `config_linked_accounts` of the `account-baseline-security` modules.




</div>



## terraform-aws-utilities


### [v0.2.0](https://github.com/gruntwork-io/terraform-aws-utilities/releases/tag/v0.2.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/8/2020 | Modules affected: enabled-aws-regions | <a href="https://github.com/gruntwork-io/terraform-aws-utilities/releases/tag/v0.2.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

`enabled-aws-regions` has been removed as there is now [a new data source in the `aws` provider that has the same functionality](https://www.terraform.io/docs/providers/aws/d/regions.html). Replace usage of the module with the `aws_regions` data source



</div>


### [v0.1.8](https://github.com/gruntwork-io/terraform-aws-utilities/releases/tag/v0.1.8)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/7/2020 | Modules affected: executable-dependency | <a href="https://github.com/gruntwork-io/terraform-aws-utilities/releases/tag/v0.1.8">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Added a new module called `executable-dependency` that can be used to install an executable if it&apos;s not installed already. This is useful if your Terraform code depends on external dependencies, such as `terraform-aws-eks`, which depends on `kubergrunt`.



</div>



## terraform-aws-vpc


### [v0.8.8](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.8.8)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/29/2020 | Modules affected: vpc-peering | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.8.8">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

The `vpc-peering` module can now optionally create resources using the `create_resources` variable. This weird parameter exists solely because Terraform does not support conditional modules. Therefore, this is a hack to allow you to conditionally decide if the VPC Peering function and other resources should be created or not.



</div>


### [v0.8.7](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.8.7)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/14/2020 | Modules affected: vpc-app | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.8.7">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- This fixes a bug with `vpc-app`. Previously the dynamodb endpoint routes mistakenly referenced the S3 endpoint. 

Special thanks to @jdhornsby for the fix!




</div>

<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "releases",
  "hash": "fddce19327eb058806bc50b77116ae64"
}
##DOCS-SOURCER-END -->

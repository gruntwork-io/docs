
# Gruntwork release 2020-03

<p style={{marginTop: "-25px"}}><small><a href="/guides">Guides</a> / <a href="/guides/stay-up-to-date">Update Guides</a> / <a href="/guides/stay-up-to-date/releases">Releases</a> / 2020-03</small></p>

This page is lists all the updates to the [Gruntwork Infrastructure as Code
Library](https://gruntwork.io/infrastructure-as-code-library/) that were released in 2020-03. For instructions
on how to use these updates in your code, check out the [updating
documentation](/library/stay-up-to-date/updating).

Here are the repos that were updated:

- [terraform-aws-asg](#terraform-aws-asg)
- [terraform-aws-cache](#terraform-aws-cache)
- [terraform-aws-ci](#terraform-aws-ci)
- [terraform-aws-data-storage](#terraform-aws-data-storage)
- [terraform-aws-ecs](#terraform-aws-ecs)
- [terraform-aws-eks](#terraform-aws-eks)
- [terraform-aws-lambda](#terraform-aws-lambda)
- [terraform-aws-load-balancer](#terraform-aws-load-balancer)
- [terraform-aws-monitoring](#terraform-aws-monitoring)
- [terraform-aws-openvpn](#terraform-aws-openvpn)
- [terraform-aws-security](#terraform-aws-security)
- [terraform-aws-server](#terraform-aws-server)
- [terraform-aws-static-assets](#terraform-aws-static-assets)
- [terraform-aws-vpc](#terraform-aws-vpc)


## terraform-aws-asg


### [v0.8.6](https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.8.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/12/2020 | Modules affected: server-group | <a href="https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.8.6">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- You can now configure the CloudWatch metrics to enable for the ASGs in the `server-group` module via the new `enabled_metrics` input variable.


</div>



## terraform-aws-cache


### [v0.9.2](https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v0.9.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/26/2020 | Modules affected: redis | <a href="https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v0.9.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- You can now specify a custom KMS key to encrypt data at rest in `redis` using the new `kms_key_id` input variable.


</div>



## terraform-aws-ci


### [v0.18.4](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.18.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/11/2020 | Modules affected: terraform-helpers | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.18.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

This release updates the `terraform-update-variables` script to run terraform in the same folder as the updated vars file so that it can take advantage of version rules set with `tfenv`.


</div>


### [v0.18.3](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.18.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/11/2020 | Modules affected: infrastructure-deployer | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.18.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

This release fixes a bug in the `infrastructure-deployer` CLI where it did not handle task start failures correctly.



</div>


### [v0.18.2](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.18.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/6/2020 | Modules affected: terraform-helpers | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.18.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

Add support for Mac OSX to the `git-updated-folders` script.



</div>



## terraform-aws-data-storage


### [v0.12.11](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.12.11)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/24/2020 | Modules affected: rds | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.12.11">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- You can now configure the read replicas with separate settings from the primary. In particular, you can use the new `parameter_group_name_for_read_replicas` input variable to set a separate parameter group for read replicas and `allow_connections_from_security_groups_to_read_replicas` and `allow_connections_from_cidr_blocks_to_read_replicas` to configure a separate security group for read replicas. 


</div>


### [v0.12.10](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.12.10)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/16/2020 | Modules affected: rds | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.12.10">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- The `rds` module now allows you to enable IAM authentication for your database.


</div>


### [v0.12.9](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.12.9)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/13/2020 | Modules affected: lambda-share-snapshot, lambda-create-snapshot, lambda-copy-shared-snapshot, lambda-cleanup-snapshots | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.12.9">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

Each of the manual scheduled snapshot Lambda function modules now expose an input variable `create_resources` to allow conditionally turning them off.



</div>


### [v0.12.8](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.12.8)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/13/2020 | Modules affected: aurora | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.12.8">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Solve #86: Add maintenance window for Aurora Cluster Instances. 



</div>


### [v0.12.7](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.12.7)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/7/2020 | Modules affected: lambda-create-snapshot | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.12.7">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

Fix log message for lambda function in `lambda-create-snapshot` to show what cloudwatch metric was updated.



</div>


### [v0.12.6](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.12.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/6/2020 | Modules affected: lambda-create-snapshot, lambda-cleanup-snapshots | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.12.6">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

`lambda-create-snapshot` and `lambda-cleanup-snapshots` now support namespacing snapshots so that you can differentiate between snapshots created with different schedules. Take a look at the [lambda-rds-snapshot-multiple-schedules example](https://github.com/gruntwork-io/module-data-storage/tree/master/examples/lambda-rds-snapshot-multiple-schedules) for an example of how to use this feature to manage daily and weekly snapshots.



</div>


### [v0.12.5](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.12.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/4/2020 | Modules affected: lambda-share-snapshot, lambda-create-snapshot, lambda-copy-shared-snapshot, lambda-cleanup-snapshots | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.12.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

The lambda functions for snapshot management have been upgraded to the python3.7 runtime. Note that although the lambda functions need to be redeployed, it will not affect your snapshots or existing RDS instances.



</div>


### [v0.12.4](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.12.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/3/2020 | Modules affected: lambda-create-snapshot | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.12.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

This release fixes a bug where the lambda function for creating a snapshot needed the ability to invoke itself for retry logic.



</div>



## terraform-aws-ecs


### [v0.18.0](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.18.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/19/2020 | Modules affected: ecs-cluster | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.18.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

This release introduces two new list variables: `allow_ssh_from_cidr_blocks` and `allow_ssh_from_security_group_ids`. Use these lists to configure more flexible SSH access. 

In addition, we have removed the `num_alb_security_group_ids` variable since the GitHub issue that it previously referenced has since been fixed.

Finally, this also migrates from dep to Go Modules.


</div>



## terraform-aws-eks


### [v0.19.1](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.19.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/29/2020 | Modules affected: eks-cluster-control-plane | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.19.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

The EKS cluster creation timeout is now 60 minutes.



</div>


### [v0.19.0](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.19.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/28/2020 | Modules affected: eks-cluster-control-plane | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.19.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

This release includes an internal implementation change for the fargate profiles to simplify the authentication mechanism when migrating the control plane services to Fargate. Note that if you were using `schedule_control_plane_services_on_fargate = true`, you will now need to use the `kubergrunt` version `0.5.12` or greater.



</div>


### [v0.18.0](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.18.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/26/2020 | Modules affected: eks-cluster-control-plane | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.18.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

This release removes the `fargate_only` flag on `eks-cluster-control-plane` module and replaces it with the more descriptive and accurate `schedule_control_plane_services_on_fargate`. Additionally, the module no longer configures the Fargate Profile to span all of the `default` and `kube-system` Namespaces. Instead, the fargate profile only targets the control plane services, specifically `coredns`.

Rationale: `fargate_only` implies that the cluster can only be used with Fargate but that is not true as you can attach self managed or managed worker nodes to the cluster and create a new Namespace to run non-fargate workloads. Additionally, the previous flag made it impossible to run pods that were in the `kube-system` namespace on anything other than Fargate. This change was implemented to promote better flexibility on the cluster.

Refer to the migration guide for information on preserving the same semantics for existing clusters that have `fargate_only` set to `true`.



</div>


### [v0.17.2](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.17.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/25/2020 | Modules affected: eks-k8s-cluster-autoscaler | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.17.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

Fix bug where the cluster autoscaler in IRSA mode was unable to get the necessary IAM permissions to access the ASG.



</div>


### [v0.17.1](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.17.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/24/2020 | Modules affected: eks-cluster-workers | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.17.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

`eks-cluster-workers` now supports the `create_resources` parameter, which when `false`, will turn off all the resources in the module.



</div>


### [v0.17.0](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.17.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/20/2020 | Modules affected: eks-cluster-control-plane | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.17.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

This release adds support for Kubernetes `1.15` and drops support for `1.12`.

If you are using Kubernetes version `1.12`, upgrade to at least `1.13` prior to updating the module. **NOTE**: AWS will be auto upgrading all EKS clusters running `1.12` on **May 11th, 2020**.



</div>


### [v0.16.1](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.16.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/19/2020 | Modules affected: eks-k8s-external-dns, eks-k8s-cluster-autoscaler, eks-cloudwatch-container-logs, eks-alb-ingress-controller | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.16.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

Fix an issue with the helm provider where the `stable` helm repository does not refresh correctly in certain circumstances.



</div>


### [v0.16.0](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.16.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/19/2020 | Modules affected: eks-k8s-external-dns, eks-k8s-cluster-autoscaler, eks-cloudwatch-container-logs, eks-alb-ingress-controller | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.16.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

This release introduces Helm v3 compatibility for the EKS administrative application modules, `eks-k8s-external-dns`, `eks-k8s-cluster-autoscaler`, `eks-cloudwatch-container-logs`, and `eks-alb-ingress-controller`. The major difference between this release and previous releases is that we no longer are creating the `ServiceAccounts` in terraform and instead rely on the Helm charts to create the `ServiceAccounts`. Refer to the Migration Guide for information on how to migrate to this version.



</div>


### [v0.15.5](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.15.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/18/2020 | Modules affected: eks-cluster-workers | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.15.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

You can now use `cloud-init` for boot scripts for self-managed workers by providing it as `user_data_base64`.



</div>


### [v0.15.4](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.15.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/12/2020 | Modules affected: eks-cluster-workers | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.15.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

`eks-cluster-workers` now supports attaching secondary security groups in addition to the one created internally. This is useful to break cyclic dependencies between modules when setting up ELBs.



</div>


### [v0.15.3](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.15.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/11/2020 | Modules affected: eks-cluster-control-plane | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.15.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

This release introduces support for setting encryption configurations on your EKS cluster to implement envelope encryption of Secrets. Refer to the official AWS [technical blog post](https://aws.amazon.com/blogs/containers/using-eks-encryption-provider-support-for-defense-in-depth/) for more information.

**NOTE: This is only available for new EKS clusters. If you would like this on your cluster, you must relaunch your cluster to enable this.**



</div>


### [v0.15.2](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.15.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/4/2020 | Modules affected: eks-cloudwatch-container-logs | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.15.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

The `eks-cloudwatch-container-logs` module now deploys a newer version of the fluentd container that supports IRSA.



</div>



## terraform-aws-lambda


### [v0.7.5](https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.7.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/29/2020 | Modules affected: lambda-edge | <a href="https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.7.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

You can now specify a permissions boundary on the IAM role created for `lambda-edge`.



</div>


### [v0.7.4](https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.7.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/12/2020 | Modules affected: scheduled-lambda-job, lambda | <a href="https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.7.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

The `lambda` and `scheduled-lambda-job` modules now support conditionally turning off resources in the module using the `create_resources` input parameter.



</div>



## terraform-aws-load-balancer


### [v0.19.0](https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.19.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/31/2020 | Modules affected: acm-tls-certificate | <a href="https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.19.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  


This release adds support for requesting, and automatically verifying, multiple certificates via the ACM module.



</div>


### [v0.18.1](https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.18.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/10/2020 | Modules affected: acm-tls-certificate | <a href="https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.18.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fix deprecation warning with `destroy` provisioner.



</div>


### [v0.18.0](https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.18.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/2/2020 | Modules affected: alb | <a href="https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.18.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- This release removes two unneeded input variables: `aws_account_id` and `aws_region`. Because these variables are unused, they can be safely removed.



</div>



## terraform-aws-monitoring


### [v0.19.0](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.19.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/2/2020 | Modules affected: logs/load-balancer-access-logs | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.19.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

This release removes two unused variables: `aws_account_id` and `aws_region`. Both of these variables are unused by the logs/load-balancer-access-logs module, and therefore can be safely removed.


</div>



## terraform-aws-openvpn


### [v0.9.11](https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.9.11)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/23/2020 | Modules affected: openvpn-server | <a href="https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.9.11">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

The `openvpn-server` module now accepts base64-encoded user data in the `user_data_base64` variable. This is in addition to standard, plaintext user data in the `user_data` variable.



</div>


### [v0.9.10](https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.9.10)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/6/2020 | Modules affected: openvpn-server | <a href="https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.9.10">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

You can now restrict the CIDR blocks that are allowed to access the OpenVPN port with the variable `allow_vpn_from_cidr_list`.



</div>



## terraform-aws-security


### [v0.27.2](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.27.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/31/2020 | Modules affected: kms-master-key-multi-region | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.27.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

This release introduces a new module `kms-master-key-multi-region`, which can be used to manage KMS CMKs across all enabled regions of an account.



</div>


### [v0.27.1](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.27.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/19/2020 | Modules affected: auto-update, ntp, tls-cert-private | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.27.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
* `auto-update`
* `ntp`
* `tls-cert-private`


* Fix a bug where some of our install scripts were missing `DEBIAN_FRONTEND=noninteractive` on the `apt-get update` calls. As a result, certain updates (such as `tzdata`) would occasionally try to request an interactive prompt, which would freeze or break Packer or Docker builds.


* https://github.com/gruntwork-io/module-security/commit/bfe0f571548d04d05d23442a68e5834493d9db59

</div>


### [v0.27.0](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.27.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/16/2020 | Modules affected: kms-master-key | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.27.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

This release introduces support for managing more than one KMS Customer Master Key (CMK) using the `kms-master-key` module.



</div>


### [v0.26.1: Allow read-only users to filter CloudWatch by resource groups](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.26.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/6/2020 | Modules affected: iam-policies | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.26.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  



</div>


### [v0.26.0](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.26.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/6/2020 | Modules affected: iam-groups | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.26.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

This release updates the iam-groups module to use `for_each` instead of `count`.  By using `for_each`, the groups are less affected by changes in the input list `var.iam_groups_for_cross_account_access`. 

See [this blog post](https://blog.gruntwork.io/terraform-tips-tricks-loops-if-statements-and-gotchas-f739bbae55f9) for more info on the differences between `for_each` and `count`.




</div>



## terraform-aws-server


### [v0.8.1: Expose base64-encoded user data](https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.8.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/9/2020 | Modules affected: single-server | <a href="https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.8.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

This release exposes the [`user_data_base64`](https://www.terraform.io/docs/providers/aws/d/instance.html#user_data_base64) attribute when launching a server. We&apos;ve also added [an example of using base64 user data with cloud-init](https://github.com/gruntwork-io/module-server/blob/master/examples/bastion-host/main.tf#L49).



</div>


### [v0.8.0](https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.8.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/3/2020 | Modules affected: single-server | <a href="https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.8.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- The `single-server` module now allows you to add custom security group IDs to using the `additional_security_group_ids` input variable.
- The parameters that control SSH access in the `single-server` module have been refactored:
    - The `allow_ssh_from_cidr` and `allow_ssh_from_security_group` parameters have been removed. Terraform used to be much more picky about what you can reference in `count` parameters, but versions 0.12 and above allow data sources, and even looking up lengths on resources, so these redundant parameters are no longer necessary.
    - `allow_ssh_from_security_group_id` has been renamed to `allow_ssh_from_security_group_ids` and is now a list of security group IDs (instead of just one) from which SSH access will be allowed.
    - `allow_rdp_from_cidr_list`: A new input variable that is a list of CIDR blocks from which RDP access will be allowed.
    - `allow_rdp_from_security_group_ids`: A new input variable that is a list of security group IDs from which RDP access will be allowed.
- The `source_ami_filter` we were using to find the latest CentOS AMI in Packer templates started to pick up the wrong AMI, probably due to some change in the AWS Marketplace. We&apos;ve updated our filter to fix this as described below.


</div>



## terraform-aws-static-assets


### [v0.6.2](https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.6.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/25/2020 | Modules affected: s3-static-website, s3-cloudfront | <a href="https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.6.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

Resolve source of perpetual diff when using the cloudfront default certificate



</div>


### [v0.6.1](https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.6.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/19/2020 | Modules affected: s3-static-website | <a href="https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.6.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

Fix a bug in `s3-static-website` module with versions of terraform &gt;0.12.11, where the output calculation fails with an error.



</div>


### [v0.6.0](https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.6.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/16/2020 | Modules affected: s3-cloudfront | <a href="https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.6.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Instead of supporting solely 404 and 500 error responses, now that we have Terraform 0.12, the `s3-cloudfront` module can now take in a dynamic list of error responses using the new `error_responses` input parameter, which allows you to specify custom error responses for any 4xx and 5xx error.


</div>



## terraform-aws-vpc


### [v0.8.5: Outbound NACLs between private subnets](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.8.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/27/2020 | Modules affected: vpc-app-network-acls | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.8.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

This change allows all outbound traffic from private subnets to other private subnets and similarly all outbound traffic from the persistent subnets to the other persistent subnets. Previously, only TCP traffic was permitted.

Thanks to @scottclk for this contribution.



</div>


### [v0.8.4: More control over subnet spacing](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.8.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/3/2020 | Modules affected: vpc-mgmt, vpc-app | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.8.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

Previously, users had limited control over the spacing between subnets across AZs. The private and persistence subnets shared the same variable and an automatic calculation was used to assign an address space to the persistence subnets.

With this release, we introduce two optional variables to the `vpc-app` module: `private_subnet_spacing` and `persistence_subnet_spacing`. If either of these are provided, that value will be used as the `netnum` argument to [`cidrsubnet`](https://www.terraform.io/docs/configuration/functions/cidrsubnet.html). Otherwise, the usual `subnet_spacing` variable and its automatic calculation will still apply.

Additionally, `vpc-mgmt` is now more customizable with the introduction of the `private_subnet_bits` variable.

Thanks to @mmiranda for his contribution, and to @marinalimeira for her suggestions!



</div>

<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "releases",
  "hash": "ab4929597fd101f5d27c597f097f1326"
}
##DOCS-SOURCER-END -->


# Gruntwork release 2019-10

<p style={{marginTop: "-25px"}}><small><a href="/guides">Guides</a> / <a href="/guides/stay-up-to-date">Update Guides</a> / <a href="/guides/stay-up-to-date/releases">Releases</a> / 2019-10</small></p>

This page is lists all the updates to the [Gruntwork Infrastructure as Code
Library](https://gruntwork.io/infrastructure-as-code-library/) that were released in 2019-10. For instructions
on how to use these updates in your code, check out the [updating
documentation](/library/stay-up-to-date/updating).

Here are the repos that were updated:

- [terraform-aws-cache](#terraform-aws-cache)
- [terraform-aws-ci](#terraform-aws-ci)
- [terraform-aws-data-storage](#terraform-aws-data-storage)
- [terraform-aws-ecs](#terraform-aws-ecs)
- [terraform-aws-eks](#terraform-aws-eks)
- [terraform-aws-monitoring](#terraform-aws-monitoring)
- [terraform-aws-openvpn](#terraform-aws-openvpn)
- [terraform-aws-security](#terraform-aws-security)
- [terraform-aws-server](#terraform-aws-server)
- [terraform-aws-static-assets](#terraform-aws-static-assets)
- [terraform-aws-vpc](#terraform-aws-vpc)
- [terraform-kubernetes-helm](#terraform-kubernetes-helm)


## terraform-aws-cache


### [v0.7.1](https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v0.7.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/31/2019 | Modules affected: redis | <a href="https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v0.7.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Allow custom names for subnet and security group


</div>


### [v0.7.0](https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v0.7.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/29/2019 | Modules affected: redis, memcached | <a href="https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v0.7.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- The `memcached` version now sets the default version to `1.5.16`. We were using `1.4.24` before, but that&apos;s no longer supported. If you wish to use a different version, use the `memcached_version` input variable.
- The `redis` module now sets the default version to `5.0.5`. We were using `2.8.24` before, but that&apos;s now quite out of date. If you wish to use a different version, use the `redis_version` input variable.



</div>



## terraform-aws-ci


### [v0.16.0](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.16.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/17/2019 | Modules affected: gruntwork-module-circleci-helpers, circleci-helpers | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.16.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

The go environment setup scripts have been updated with go modules support. As a part of this, `glide` is no longer supported. Note that you will need to update the flags to continue use with `dep`. Refer to the migration guide below for more details.


</div>



## terraform-aws-data-storage


### [v0.10.2](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.10.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/17/2019 | Modules affected: aurora | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.10.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

Fix bug where `apply_immediately` was ignored for cluster instances in the `aurora` module.



</div>


### [v0.10.1](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.10.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/10/2019 | Modules affected: rds | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.10.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- The `rds` module now allows you to export various logs to CloudWatch depending on the database engine.



</div>



## terraform-aws-ecs


### [v0.16.0](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.16.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/31/2019 | Modules affected: ecs-cluster, ecs-service, ecs-service-with-discovery, ecs-service-with-alb | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.16.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
This release consolidates `ecs-service-with-alb`, `ecs-service-with-discovery`, `ecs-service`, and `ecs-fargate` into one module. As a part of this, features that were only available in one of the flavors are now available in all flavors. Users of the old modules will see the following feature enhancements:

- You can now set up an App AutoScaling Target in all flavors, which will allow you to configure AutoScaling Policies on the ECS Service. Previously this was not available in `ecs-service`.
- You can now fully setup the `awsvpc` network mode in all flavors. Specifically, the subnets and security groups of the ECS task are now configurable. Previously this was only available on `ecs-fargate` and `ecs-service-with-discovery`.
- You can now setup a canary deployment in all flavors. Previously this was only available on `ecs-service` and `ecs-service-with-alb`.
- You can now attach volumes on your ECS tasks in all flavors. Previously this was not available in `ecs-service-with-discovery`.



</div>


### [v0.15.2](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.15.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/26/2019 | Modules affected: ecs-fargate | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.15.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

`ecs-fargate` now supports ECS Service Discovery.


</div>


### [v0.15.1](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.15.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/2/2019 | Modules affected: ecs-service-with-alb | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.15.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

Add support for slow start to `ecs-service-with-alb`. You can set a delay in seconds (using input variable `alb_slow_start`) that controls how long the load balancer should wait before starting to send requests to the targets.


</div>


### [v0.15.0](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.15.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/1/2019 | Modules affected: ecs-cluster | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.15.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

EC2 based ECS clusters will now use `gp2` as the root volume. If you would like the old behavior (e.g to avoid a redeploy), you can set `cluster_instance_root_volume_type` to `standard`.



</div>



## terraform-aws-eks


### [v0.9.8](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.9.8)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/31/2019 | Modules affected: eks-cluster-workers | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.9.8">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

You can now set enable detailed metrics gathering for the ASGs using the new `var.enabled_metrics` variable on the `eks-cluster-workers` module.


</div>


### [v0.9.7](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.9.7)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/24/2019 | Modules affected: eks-k8s-cluster-autoscaler, eks-k8s-cluster-autoscaler-iam-policy, eks-cluster-workers | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.9.7">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

This release introduces support for [Kubernetes cluster-autoscaler](https://github.com/kubernetes/autoscaler/tree/master/cluster-autoscaler), a Kubernetes application that manages autoscaling for your EKS cluster workers. This can be used to automatically scale up or down your worker pools based on demand from Pods.

Check out [the updated README](https://github.com/gruntwork-io/terraform-aws-eks/tree/master/modules/eks-cluster-workers#how-do-i-enable-cluster-auto-scaling) for instructions on how to setup the cluster autoscaler for your worker pools.


</div>


### [v0.9.6](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.9.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/18/2019 | Modules affected: eks-k8s-role-mapping, eks-cluster-control-plane | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.9.6">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

References to `package-terraform-utilities` have been switched to using HTTPS based URLs for the `source` property from SSH based.



</div>


### [v0.9.5](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.9.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/17/2019 | Modules affected: eks-k8s-external-dns | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.9.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- You can now enable istio gateway support on the `external-dns` app deployed with the `eks-k8s-external-dns` module.



</div>


### [v0.9.4](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.9.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/17/2019 | Modules affected: eks-cluster-control-plane, eks-alb-ingress-controller | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.9.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fix a bug with the `eks-alb-ingress-controller` module where you could end up with a perpetual diff in the plan.
- Fix a regression bug with `eks-cluster-control-plane` where it returned the information on the EKS cluster before the API came up (as checked by `null_resource.wait_for_api`). This could lead to issues in your terraform code if you were chaining an API request immediately following the creation of the EKS cluster.



</div>


### [v0.9.3](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.9.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/16/2019 | Modules affected: eks-cluster-workers | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.9.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Add ability to include suffix in the resource name



</div>


### [v0.9.2](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.9.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/11/2019 | Modules affected: eks-cloudwatch-container-logs | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.9.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

This fixes a bug with `eks-cloudwatch-container-logs`, where `fluentd` was redeployed on every `apply`.



</div>


### [v0.9.1](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.9.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/9/2019 | Modules affected: eks-cluster-control-plane | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.9.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

This release exposes the ability to tag the EKS cluster using the `custom_tags_eks_cluster` input variable on `eks-cluster-control-plane`. Note that you will need to be using AWS provider version `&gt;=2.31.0`.



</div>


### [v0.9.0](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.9.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/9/2019 | Modules affected: eks-vpc-tags, eks-cluster-workers | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.9.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

Add support for multiple ASGs in `eks-cluster-workers` so that you can manage one ASG per AZ. This is necessary for the [cluster-autoscaler](https://github.com/kubernetes/autoscaler/tree/master/cluster-autoscaler) to work.


</div>



## terraform-aws-monitoring


### [v0.14.3](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.14.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/29/2019 | Modules affected: alarms/asg-disk-alarms | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.14.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- The `asg-disk-alarms` module now allows you to configure how to handle the `INSUFFICIENT_DATA` state via the `treat_missing_data` input variable.


</div>


### [v0.14.2](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.14.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/26/2019 | Modules affected: alarms/elasticsearch-alarms | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.14.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

This release updates the `elasticsearch-alarms` module to include all AWS recommended alarms, as documented at https://docs.aws.amazon.com/elasticsearch-service/latest/developerguide/cloudwatch-alarms.html

The additional alarms are monitoring these metrics:

- ClusterIndexWritesBlocked
- Nodes
- MasterCPUUtilization + MasterJVMMemoryPressure (only relevant for clusters using master nodes)
- KMSKeyError + KMSKeyInaccessible (only relevant if using data encryption)

The alarms are defaulted to use the values that AWS recommend.


</div>


### [v0.14.1](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.14.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/17/2019 | Modules affected: load-balancer-access-logs | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.14.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

-  allow bucket policy override in module load-balancer-access-logs


</div>



## terraform-aws-openvpn


### [v0.9.7](https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.9.7)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/18/2019 | Modules affected: openvpn-server | <a href="https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.9.7">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

The EIP resource in `openvpn-server` is now optional. You can set the `enable_eip` flag to `false` to prevent the module from provisioning an EIP.


</div>



## terraform-aws-security


### [v0.20.2: Updates for compatibility with TF >= 0.12.10](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.20.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/24/2019 | Modules affected: custom-iam-entity, cloudtrail | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.20.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- This release fixes an issue that was introduced in Terraform version 0.12.11 in which indexed references to null resources cause an error. The issue is described in detail in hashicorp/terraform#23140. The change is backwards compatible with earlier revisions of TF 0.12.



</div>


### [v0.20.1: Bump Go version for ssh-grunt](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.20.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/23/2019 | Modules affected: ssh-grunt | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.20.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- This  release bumps the version of Go used with ssh-grunt from 1.11 to 1.13.3 to address an issue with long delays under certain (mysterious) conditions. This build was tested successfully as `v0.20.1-alpha.1`.



</div>


### [v0.20.0: custom-iam-entity and support for tags](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.20.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/14/2019 | Modules affected: custom-iam-group, custom-iam-entity, saml-iam-roles, cross-account-iam-roles | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.20.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- The recently-created `custom-iam-group` module has been renamed to `custom-iam-entity`. The new module has support for creating roles in addition to groups.
- The `saml-iam-roles` and `cross-account-iam-roles` modules now support tags. Use a map of tags to create tagged roles. For example:
```
    tags = &#x7B;
        Department = &quot;IT&quot;
        Environment = &quot;Production&quot;
    &#x7D;
```


</div>


### [v0.19.3: iam-admin for SAML and cross-account roles](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.19.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/2/2019 | Modules affected: saml-iam-roles, cross-account-iam-roles | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.19.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- In [`v0.18.6`](https://github.com/gruntwork-io/module-security/releases/tag/v0.18.6), we introduced the `iam-admin` policy for IAM groups. The policy allows administration of IAM without full administrator privileges. This update extends the iam-admin to work with SAML and cross-account roles for users that do not use IAM groups.



</div>



## terraform-aws-server


### [v0.7.5](https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.7.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/23/2019 | Modules affected: attach-eni | <a href="https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.7.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

Fix regression bug introduced in `v0.7.4` with `attach-eni`, where some error messages were being swallowed in the script.



</div>


### [v0.7.4](https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.7.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/18/2019 | Modules affected: attach-eni | <a href="https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.7.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

The `attach-eni` script now supports Amazon Linux 2. This release also fixes a bug that prevented the script from working with CentOS 7.



</div>



## terraform-aws-static-assets


### [v0.5.5](https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.5.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/1/2019 | Modules affected: s3-static-website | <a href="https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.5.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Allow use of cloudfront s3 user for s3 origin access via `cloudfront_origin_access_identity_s3_canonical_user_id` variable.



</div>



## terraform-aws-vpc


### [v0.7.6](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.7.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/14/2019 | Modules affected: vpc-mgmt-network-acls | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.7.6">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

NACLs setup using `vpc-mgmt-network-acls` for the mgmt VPC will now allow outbound UDP 53 from the private subnets.



</div>


### [v0.7.5](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.7.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/3/2019 | Modules affected: vpc-peering | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.7.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- The `vpc-peering` module now exposes an `auto_accept` variable that allows you to specify if it auto-accepts peering connections or not.


</div>



## terraform-kubernetes-helm


### [v0.6.1](https://github.com/gruntwork-io/terraform-kubernetes-helm/releases/tag/v0.6.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/23/2019 | Modules affected: k8s-tiller | <a href="https://github.com/gruntwork-io/terraform-kubernetes-helm/releases/tag/v0.6.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

Fix regression bug from `v0.6.0`, where kubergrunt expects base64 encoded data, but we decode the data before passing it through.



</div>


### [v0.6.0](https://github.com/gruntwork-io/terraform-kubernetes-helm/releases/tag/v0.6.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/22/2019 | Modules affected: k8s-tiller | <a href="https://github.com/gruntwork-io/terraform-kubernetes-helm/releases/tag/v0.6.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

The `local-exec` calls for `k8s-tiller` have been updated to be compatible with Windows. Note that this requires Powershell.



</div>


### [v0.5.3](https://github.com/gruntwork-io/terraform-kubernetes-helm/releases/tag/v0.5.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/21/2019 | Modules affected: k8s-service-account, k8s-namespace, k8s-namespace-roles | <a href="https://github.com/gruntwork-io/terraform-kubernetes-helm/releases/tag/v0.5.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

Fixes a regression bug introduced in `k8s-namespace` and `k8s-namespace-roles` with the behavior of `create_resources`. Starting with terraform `v0.12.11`, referencing resource index 0 of those that were not created with `count = 0` is an error where as before it was `null`. This means that we need to add a conditional for referencing those resources to only index into it when `count &gt; 0`.

This release also adds the `create_resources` parameter to `k8s-service-account`.



</div>


### [v0.5.2](https://github.com/gruntwork-io/terraform-kubernetes-helm/releases/tag/v0.5.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/9/2019 | Modules affected: k8s-tiller | <a href="https://github.com/gruntwork-io/terraform-kubernetes-helm/releases/tag/v0.5.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

Listening on localhost is now optional. To disable localhost listening, set the `tiller_listen_localhost` input variable to `false`.



</div>

<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "releases",
  "hash": "826798562dc2306da21c248b4c3705d7"
}
##DOCS-SOURCER-END -->


# Gruntwork release 2019-02

<p style={{marginTop: "-25px"}}><small><a href="/guides">Guides</a> / <a href="/guides/stay-up-to-date">Update Guides</a> / <a href="/guides/stay-up-to-date/releases">Releases</a> / 2019-02</small></p>

This page is lists all the updates to the [Gruntwork Infrastructure as Code
Library](https://gruntwork.io/infrastructure-as-code-library/) that were released in 2019-02. For instructions
on how to use these updates in your code, check out the [updating
documentation](/library/stay-up-to-date/updating).

Here are the repos that were updated:

- [gruntkms](#gruntkms)
- [terraform-aws-asg](#terraform-aws-asg)
- [terraform-aws-ci](#terraform-aws-ci)
- [terraform-aws-ecs](#terraform-aws-ecs)
- [terraform-aws-lambda](#terraform-aws-lambda)
- [terraform-aws-load-balancer](#terraform-aws-load-balancer)
- [terraform-aws-monitoring](#terraform-aws-monitoring)
- [terraform-aws-sam](#terraform-aws-sam)
- [terraform-aws-security](#terraform-aws-security)
- [terraform-aws-server](#terraform-aws-server)
- [terraform-aws-static-assets](#terraform-aws-static-assets)
- [terraform-kubernetes-helm](#terraform-kubernetes-helm)


## gruntkms


### [v0.0.8](https://github.com/gruntwork-io/gruntkms/releases/tag/v0.0.8)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/14/2019 | <a href="https://github.com/gruntwork-io/gruntkms/releases/tag/v0.0.8">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/gruntkms/pull/19: `gruntkms` will now write errors to `stderr` instead of `stdout`.

</div>



## terraform-aws-asg


### [v0.6.25](https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.6.25)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/21/2019 | Modules affected: server-group | <a href="https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.6.25">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fixes https://github.com/gruntwork-io/module-asg/issues/63, where ALB/ELB health checks were being skipped in the rolling deployment script for the server-group module when using python3.


</div>



## terraform-aws-ci


### [v0.13.9](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.13.9)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/24/2019 | Modules affected: terraform-helpers | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.13.9">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
* `terraform-helpers`


* The `update-terraform-variable` script now uses pipes (`|`) instead of slashes (`/`) in a `sed` call so that you don&apos;t get errors if the `--value` parameter contains a slash.


* https://github.com/gruntwork-io/module-ci/pull/88

</div>



## terraform-aws-ecs


### [v0.11.5](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.11.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/20/2019 | Modules affected: ecs-cluster | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.11.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
* `ecs-cluster`


* Fix bug in `roll-out-ecs-cluster-update.py` where it wouldn&apos;t do the proper rollout for clusters bigger than 10 instances. 


* #118 

</div>


### [v0.11.4](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.11.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/20/2019 | Modules affected: ecs-cluster | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.11.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
* `ecs-cluster`


* The `ecs-cluster` module now exposes setting its launch configuration using the output: `ecs_cluster_launch_configuration_id`. This allows subscribing to changes in the launch configuration to automatically rollout cluster changes


* https://github.com/gruntwork-io/module-ecs/pull/119

</div>



## terraform-aws-lambda


### [v0.5.1](https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.5.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/20/2019 | Modules affected: lambda | <a href="https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.5.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- `lambda`


- This release introduces support for [lambda layers](https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html) in the lambda functions created by the `lambda` module.


@josh-taylor for the contribution


- https://github.com/gruntwork-io/package-lambda/pull/30

</div>



## terraform-aws-load-balancer


### [v0.13.1](https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.13.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/22/2019 | Modules affected: alb | <a href="https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.13.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
* `alb`


* You can now attach additional security groups to your load balancer using the `additional_security_group_ids` input parameter.


* https://github.com/gruntwork-io/module-load-balancer/pull/48

</div>



## terraform-aws-monitoring


### [v0.12.0](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.12.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/7/2019 | Modules affected: alb-alarms | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.12.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fix errors in the new connection count and low request count alarms to remove the &quot;client-tls-negotiation-error&quot; portion that was accidentally copy/pasted into them.



</div>


### [v0.11.1](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.11.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/4/2019 | Modules affected: alarms/alb-alarms, alarms/alb-target-group-alarms, alarms/rds-alarms | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.11.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- The alarms in `alb-alarms`, `alb-target-group-alarms`, and `rds-alarms` now support directly setting the `datapoints_to_alarm` setting. You can read more about `datapoints_to_alarm` in [the official AWS documentation](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html).

Special thanks to @ksemaev for these contributions.



</div>



## terraform-aws-sam


### [v0.1.10](https://github.com/gruntwork-io/terraform-aws-sam/releases/tag/v0.1.10)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/20/2019 | Modules affected: gruntsam | <a href="https://github.com/gruntwork-io/terraform-aws-sam/releases/tag/v0.1.10">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- This release adds support for lambda Layers in the `gruntsam` utility. Refer to [the README](https://github.com/gruntwork-io/package-sam/tree/master/modules/gruntsam) for more information.


</div>



## terraform-aws-security


### [v0.16.0](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.16.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/18/2019 | Modules affected: fail2ban, os-hardening | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.16.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Update the `fail2ban` module so it works properly on Amazon Linux 2. We&apos;ve also updated how we install it on Ubuntu (using `pip` to install `aws` instead of `apt`) and changed the jail files a bit to take advantage of fail2ban interpolation
- Update the `ami-builder` in `os-hardening` to support a new `parallel_build` param that lets you control whether the builds run in parallel. It&apos;s set to true `true` by default, as before, but you may need to disable it for use with nvme.
- Call `udevadm settle` in the `partition-volume` script to ensure all symlinks are in place before going on to subsequent steps (e.g., formatting).




</div>


### [v0.15.8](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.15.8)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/11/2019 | Modules affected: iam-groups | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.15.8">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- `iam-groups` module now creates an additional IAM group that has the `iam-user-self-mgmt` IAM policy already attached to make it easier to associate the rules of that policy to an IAM user via the group.



</div>



## terraform-aws-server


### [v0.6.1](https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.6.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/20/2019 | Modules affected: persistent-ebs-volume | <a href="https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.6.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
* `persistent-ebs-volume`


This release introduces automated tests for the nvme features of the `mount-ebs-volume` and `unmount-ebs-volume` scripts. Refer to the new section in the module documentation for how to use the scripts with nvme block devices: [How do you use this on Nitro based instances?](https://github.com/gruntwork-io/module-server/tree/master/modules/persistent-ebs-volume#how-do-you-use-this-on-nitro-based-instances-with-nvme-block-devices)


* https://github.com/gruntwork-io/module-server/pull/44

</div>



## terraform-aws-static-assets


### [v0.4.1](https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.4.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/12/2019 | Modules affected: s3-cloudfront | <a href="https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.4.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
* `s3-cloudfront`


* You can now customize the response codes CloudFormation sends for 404 and 500 errors using the new input parameters `error_404_response_code` and `error_500_response_code`, respectively.


* https://github.com/gruntwork-io/package-static-assets/pull/17

</div>



## terraform-kubernetes-helm


### [v0.2.3](https://github.com/gruntwork-io/terraform-kubernetes-helm/releases/tag/v0.2.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/6/2019 | Modules affected: k8s-service-account, k8s-namespace-roles | <a href="https://github.com/gruntwork-io/terraform-kubernetes-helm/releases/tag/v0.2.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- This release adds another set of permissions to the `rbac_tiller_resource_access` role that allows Tiller to manage `PodDisruptionBudgets`.
- In the `k8s-tiller-minikube` example, sometimes the Tiller `undeploy` fails because it removes the service account role before `undeploy`, stripping the Tiller pod of its ability to nuke itself. This fixes that by adding a `depends_on` to the service account output so that we delete the role binding when all resources referencing the service acocunt is deleted.





</div>


### [v0.2.2](https://github.com/gruntwork-io/terraform-kubernetes-helm/releases/tag/v0.2.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/5/2019 | Modules affected: k8s-namespace, k8s-namespace-roles | <a href="https://github.com/gruntwork-io/terraform-kubernetes-helm/releases/tag/v0.2.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- We broke out the role creation pieces of `k8s-namespace` into its own submodule, `k8s-namespace-roles`. This allows you to create the same roles on a preexisting namespace (e.g `default` or `kube-system`).



</div>


### [v0.2.1](https://github.com/gruntwork-io/terraform-kubernetes-helm/releases/tag/v0.2.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/5/2019 | Modules affected: k8s-namespace | <a href="https://github.com/gruntwork-io/terraform-kubernetes-helm/releases/tag/v0.2.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

This introduces an example terraform module that deploys Tiller using `kubergrunt`. This example shows how to setup a `Namespace` and `ServiceAccount` for Tiller as well. See [the example quickstart guide](https://github.com/gruntwork-io/terraform-kubernetes-helm/tree/master/examples/k8s-tiller-minikube) for an example of how you can combine the modules in this repo with `kubergrunt` to deploy a best practices Tiller instance.

Other changes:

- `k8s-namespace` now exports additional roles: `namespace-tiller-metadata-access` for minimal permissions to Tiller to be able to manage its `Secrets` and `namespace-tiller-resource-access` for minimal permissions to deploy resources from helm charts into a target namespace.



</div>


### [v0.2.0](https://github.com/gruntwork-io/terraform-kubernetes-helm/releases/tag/v0.2.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/2/2019 | Modules affected: k8s-namespace, k8s-service-account | <a href="https://github.com/gruntwork-io/terraform-kubernetes-helm/releases/tag/v0.2.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- `k8s-namespace` and `k8s-service-account` now implement the input variable `dependencies` that can be used to specify module dependencies.
- `k8s-service-account` now also requires RBAC role namespaces to be included when binding rbac roles. This is to allow binding roles that are not in the same namespace as the created `ServiceAccount`. As a result, the `rbac_roles` input variable is now a list of maps containing the keys `name` and `namespace`.



</div>

<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "releases",
  "hash": "0dc60fd6512b08d377a8de0246917122"
}
##DOCS-SOURCER-END -->

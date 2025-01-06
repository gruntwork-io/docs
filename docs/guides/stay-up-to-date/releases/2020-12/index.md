
# Gruntwork release 2020-12

<p style={{marginTop: "-25px"}}><small><a href="/guides">Guides</a> / <a href="/guides/stay-up-to-date">Update Guides</a> / <a href="/guides/stay-up-to-date/releases">Releases</a> / 2020-12</small></p>

This page is lists all the updates to the [Gruntwork Infrastructure as Code
Library](https://gruntwork.io/infrastructure-as-code-library/) that were released in 2020-12. For instructions
on how to use these updates in your code, check out the [updating
documentation](/library/stay-up-to-date/updating).

Here are the repos that were updated:

- [boilerplate](#boilerplate)
- [infrastructure-modules-multi-account-acme](#infrastructure-modules-multi-account-acme)
- [terraform-aws-architecture-catalog](#terraform-aws-architecture-catalog)
- [terraform-aws-ci](#terraform-aws-ci)
- [terraform-aws-cis-service-catalog](#terraform-aws-cis-service-catalog)
- [terraform-aws-data-storage](#terraform-aws-data-storage)
- [terraform-aws-ecs](#terraform-aws-ecs)
- [terraform-aws-eks](#terraform-aws-eks)
- [terraform-aws-monitoring](#terraform-aws-monitoring)
- [terraform-aws-openvpn](#terraform-aws-openvpn)
- [terraform-aws-security](#terraform-aws-security)
- [terraform-aws-server](#terraform-aws-server)
- [terraform-aws-service-catalog](#terraform-aws-service-catalog)
- [terraform-aws-vpc](#terraform-aws-vpc)
- [terraform-kubernetes-helm](#terraform-kubernetes-helm)


## boilerplate


### [v0.3.6: var_files for dependencies](https://github.com/gruntwork-io/boilerplate/releases/tag/v0.3.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/8/2020 | <a href="https://github.com/gruntwork-io/boilerplate/releases/tag/v0.3.6">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/boilerplate/pull/73: You can now specify `var_files` to render dependencies with.

https://github.com/gruntwork-io/boilerplate/pull/74: You can now marshal the `BoilerplateConfig` struct to YAML.

</div>


### [v0.3.6-alpha.1](https://github.com/gruntwork-io/boilerplate/releases/tag/v0.3.6-alpha.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/7/2020 | <a href="https://github.com/gruntwork-io/boilerplate/releases/tag/v0.3.6-alpha.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  DO NOT USE: integration testing release

</div>


### [v0.3.5: jsonnet support](https://github.com/gruntwork-io/boilerplate/releases/tag/v0.3.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/2/2020 | <a href="https://github.com/gruntwork-io/boilerplate/releases/tag/v0.3.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/boilerplate/pull/72: We now support rendering jsonnet files as an alternative to go templating. See [the updated README](https://github.com/gruntwork-io/boilerplate#alternative-template-engines-experimental) for more details.

</div>



## infrastructure-modules-multi-account-acme


### [v0.0.1-20201218: Terraform 0.13 Compatibility](https://github.com/gruntwork-io/infrastructure-modules-multi-account-acme/releases/tag/v0.0.1-20201218)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/18/2020 | <a href="https://github.com/gruntwork-io/infrastructure-modules-multi-account-acme/releases/tag/v0.0.1-20201218">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Since this repo is solely used for examples/demonstrations, and NOT meant for direct production use, we simply publish all changes at v0.0.1, with a date marker for when it was published.


Module versions have been updated for compatibility with Terraform 0.13. Additionally, the required versions in all modules have been updated to reflect usage with 0.13.

Several backwards incompatible changes were pulled in as a result. Refer to the Migration Guide down below for details on state changes (if any) that need to be applied.


Most modules do not require any changes to apply the Terraform 0.13 compatibility versions, and to update to Terraform 0.13. Below are the list of modules that require state migrations, or include expected destroyed resources. Any module that is not listed do not require any state migration to apply cleanly.


The `cloudtrail` module has several internal changes to how the S3 bucket is managed. You will need to perform state migrations to avoid recreating the bucket. Refer to the [upgrade guide](https://github.com/gruntwork-io/infrastructure-modules-multi-account-acme/blob/master/security/cloudtrail/migration_guides/upgrading_from_0_36_to_0_44.md) for detailed instructions on updating to this release.


The `eks-cluster` module has several changes to avoid using external information in destroy provisioners. As a result a simple version bump will lead to various terraform errors due to incompatibility with the state. Refer to the [upgrade guide](https://github.com/gruntwork-io/infrastructure-modules-multi-account-acme/blob/master/services/eks-cluster/migration_guides/upgrading_from_0_28_to_0_44.md) for detailed instructions on how to resolve those errors.


The `k8s-service` module includes a change to how the ALB Access Log S3 bucket is managed. You will need to perform state migrations to avoid recreating the bucket. Refer to the [upgrade guide](https://github.com/gruntwork-io/infrastructure-modules-multi-account-acme/blob/master/services/k8s-service/migration_guides/upgrading_to_terraform13.md) for detailed instructions on updating to this release.


The `k8s-namespace` module includes a rename for one of the RBAC roles that are included with the Namespace. Refer to the [upgrade guide](https://github.com/gruntwork-io/infrastructure-modules-multi-account-acme/blob/master/services/k8s-namespace/migration_guides/upgrading_to_terraform13.md) for more information on the specifics of the rename, and how to avoid losing access in your services that depend on those roles.


The `rds` module includes a few changes to the CloudWatch alarms that are provisioned. Specifically, the replica related alarms are now only created if there are Read Replicas being deployed (previously we always created these alarms). You may see these alarms destroyed when you update to this release. These alarm deletions are expected and safe to perform for clusters that do not have any Read Replicas.


The `alb` module includes a change to how the ALB Access Log S3 bucket is managed. You will need to perform state migrations to avoid recreating the bucket. Refer to the [upgrade guide](https://github.com/gruntwork-io/infrastructure-modules-multi-account-acme/blob/master/networking/alb/migration_guides/upgrading_from_0_20_to_0_21.md) for detailed instructions on updating to this release.

</div>



## terraform-aws-architecture-catalog


### [v0.0.1](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v0.0.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/18/2020 | <a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v0.0.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Initial release of the architecture catalog!

</div>



## terraform-aws-ci


### [v0.29.5](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.29.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/17/2020 | Modules affected: ecs-deploy-runner, build-helpers | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.29.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- `build-helpers`: A bug has been fixed in `build-packer-artifact` where multiple filters were not producing the desired result.
- `ecs-deploy-runner`: The `Dockerfile` for the `ecs-deploy-runner` Docker image has been updated to use the new `build-packer-artifact` script. The image also now install Terraform 0.13.5 and newer versions of Terragrunt and Kubergrunt by default.





</div>


### [v0.29.4](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.29.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/10/2020 | Modules affected: build-helpers | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.29.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

This release fixes a bug in `build-packer-artifact` script, where the `--idempotency` flag did not properly handle images with multiple tags.



</div>


### [v0.29.3](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.29.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/10/2020 | Modules affected: ecs-deploy-runner | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.29.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- The default version of tools installed in the `ecs-deploy-runner` docker containers have been updated: `module_ci_version` is now `v0.29.2`, and `kaniko` is now `v1.3.0`.



</div>



## terraform-aws-cis-service-catalog


### [v0.9.2](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.9.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/17/2020 | Modules affected: cloudtrail | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.9.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

Configures data event logging for cloudtrail buckets, as per the 3.10 and 3.11 requirements of CIS AWS Foundations Benchmark.






</div>


### [v0.9.1](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.9.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/15/2020 | Modules affected: cleanup-expired-certs, cloudtrail, cloudwatch-logs-metric-filters | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.9.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Adds a new module `cleanup-expired-certs` to ensure that all expired SSL/TLS certificates stored in AWS IAM are removed as per the 1.19 requirement of the CIS AWS Foundations Benchmark.
- Add metric filter and alarm for AWS Organizations changes, as per the 4.15 requirement of CIS AWS Foundations Benchmark.




</div>



## terraform-aws-data-storage


### [v0.17.1](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.17.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/8/2020 | Modules affected: aurora, rds | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.17.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- You can now tell the `rds` and `aurora` modules to ignore changes to the `master_password` parameter by setting the new `ignore_password_changes` input variable to `true`. This is useful when managing the password outside of Terraform, such as with auto-rotating passwords in AWS Secrets Manager.



</div>



## terraform-aws-ecs


### [v0.23.3](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.23.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/15/2020 | Modules affected: ecs-cluster | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.23.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

You can now enable container insights on the ECS cluster deployed with the `ecs-cluster` module.



</div>


### [v0.23.2](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.23.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/4/2020 | Modules affected: ecs-cluster | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.23.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- You  can now configure the `ecs-cluster` to create one capacity provider and one ASG per AZ / subnet by setting the `multi_az_capacity_provider` input variable to true.



</div>



## terraform-aws-eks


### [v0.31.2](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.31.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/19/2020 | Modules affected: eks-cluster-managed-workers, eks-cluster-workers, eks-cluster-control-plane | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.31.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- You can now configure the EKS control plane with additional security groups that are managed outside the module. (NOTE: You will need to recreate the EKS cluster to append additional security groups to the control plane).
- Fix a bug where certain cases can cause list indexing errors.
- Various updates to the documentation



</div>


### [v0.31.1](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.31.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/16/2020 | Modules affected: eks-cluster-control-plane | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.31.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- This release is a minor bugfix to use the latest kubergrunt (v0.6.8) required dependency.


</div>


### [v0.31.0](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.31.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/15/2020 | Modules affected: eks-cluster-control-plane, eks-cluster-workers | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.31.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

Various instance parameters are now overrideable in the `autoscaling_group_configurations`. Refer to the updated [variable definition](https://github.com/gruntwork-io/terraform-aws-eks/blob/5d829c98ef2bd8b50db2de49ac831118bfb09a8d/modules/eks-cluster-workers/variables.tf#L15) for more details on which attributes are available to override.



</div>


### [v0.30.0](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.30.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/14/2020 | Modules affected: eks-cluster-control-plane, eks-alb-ingress-controller, All | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.30.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * `eks-cluster-control-plane` [**BACKWARD INCOMPATIBLE**]
* `eks-alb-ingress-controller` [**BACKWARD INCOMPATIBLE**]
* All other modules (backward compatible changes)

**This module includes backward incompatible changes. Please refer to the migration guide.**

**Terraform 0.13 upgrade**: We have verified that this repo is compatible with Terraform 0.13.x!
- From this release onward, we will be running tests against this repo with Terraform 0.13.x only, so we recommend that you upgrade your local Terraform to 0.13.x soon!
- To give you more time to upgrade, for the time being, all modules still support Terraform 0.12.26 and above, as that version has several features in it (required_providers with source URLs) that make it more forward compatible with 0.13.x.
- Once all Gruntwork module repos have been updated to work with 0.13.x, we will publish a migration guide with a version compatibility table and announce it all via the Gruntwork Newsletter.


Remove references to the following variables from the module block if you have them set.


We can no longer dynamically configure destroy provisioners starting with Terraform 0.13. As a result, we had to remove the ability to dynamically configure the destroy provisioners on the Helm Release in `eks-alb-ingress-controller`. If you have a need for destroy hooks (such as culling all the Ingress resources prior to destroying the controller), consider using a tool like [terragrunt](https://terragrunt.gruntwork.io) or forking the module to implement it directly.

- **var.destroy_lifecycle_environment**
- **var.destroy_lifecycle_command**



We no longer allow `kubergrunt_install_dir` to be configurable. Kubergrunt is primarily used for helping us clean up leftover resources, which are otherwise not cleaned up, when running terraform destroy to destroy the EKS cluster and any other related resources, using this module. Because Terraform &gt;= `0.13.0` can no longer reference any variables in destroy provisioners, we must hardcode kubergrunt&apos;s `install_dir` so that this module can reliably call it from a known location to clean up leftover resources.

- **var.kubergrunt_install_dir** 

- These steps assume you have a running EKS cluster that was deployed using an earlier version of terraform-aws-eks and using terraform `0.12.x`. The following steps have been verified using terraform `0.12.26`, so if you have an older version of terraform, you may run into some unforeseen issues. You may first want to upgrade your terraform to at least `0.12.26` (but still not `0.13.x`) before proceeding.
- :tada: Terraform `0.12.29` handles the changes to state much better than previous versions of `0.12`. This means you can probably skip steps 5-7 below!
- If you&apos;re using a version of `terraform-aws-eks` older than `v0.29.x`, you should address all backward-incompatible changes from your current version to `v0.29.x`. That means going through every `v0.X.0` release.
- Make particular note of changes in `v0.28.0`: if you&apos;re using a version older than this, you can follow the instructions in the [release notes for v0.28.0](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.28.0) to ensure your Load Balancer resources are compatible with AWS Load Balancer Controller version 2. Otherwise, you may end up with Load Balancer resources, such as Security Groups, left behind when destroying the EKS cluster using the current (`v0.30.0`) version.

1. **Make sure your state files are up to date.** Before making changes to upgrade the module code, make sure your state is in sync with the current version of the code by running `terraform apply`.
1. **Upgrade.** Update the module blocks referencing `terraform-aws-eks` to version `v0.30.0`.
1. **Update providers.** Run `terraform init`. This will update the providers and make no changes to your state.
1. **Run plan to see errors.** Run `terraform plan`. If you see errors for provider configuration, the next steps help you fix these issues. If you do not see errors, **skip to step 8**.
    First, some background on how state changes. We&apos;ve removed `data` and `null_resources` in this release, so in order to upgrade, you also need to remove these resources from state. It is safe to remove these resources because `null_resource`s are virtual resources in terraform with no cloud resources backing them. In the next step, we&apos;ve offered an example of the `state rm` command you need to run, but the prefix for each state address may be different for you. The prefix of each address is the module label you assigned to the block for the `eks-cluster-control-plane` module. So if you had:
    ```hcl
    module &quot;eks_cluster&quot; &#x7B;
      source = &quot;git::git@github.com:gruntwork-io/terraform-aws-eks.git//modules/eks-cluster-control-plane?ref=v0.29.1&quot;
      ...
    &#x7D;
    ````
    the prefix will be `module.eks_cluster`. If you had labeled the module block as `my_cluster` (e.g., `module &quot;my_cluster&quot; &#x7B;&#x7D;`), the prefix will be `module.my_cluster`. Reliable ways to figure out the full address:
    - Use `terraform state list`.
    - Look at the errors you get from running `terraform plan`.
1. **Dry-run state changes.** The following is an example of the state change you&apos;ll have to make. Run it in `-dry-run` mode first, and use `-backup`. Look at the list of modules it will remove and compare to the errors in the previous step. As we remove these resources, the errors will go away.
    ```bash
    # Replace the following MODULE_PREFIX with the prefix that you identified in the previous step.
    MODULE_PREFIX=&apos;module.eks_cluster&apos;
    terraform state rm -dry-run -backup=tfstate.backup \
      &quot;$MODULE_PREFIX&quot;.null_resource.cleanup_eks_cluster_resources_script_hook \
      &quot;$MODULE_PREFIX&quot;.module.cleanup_eks_cluster_resources.null_resource.run_pex \
      &quot;$MODULE_PREFIX&quot;.module.cleanup_eks_cluster_resources.module.pex_env \
      &quot;$MODULE_PREFIX&quot;.module.cleanup_eks_cluster_resources.module.pex_env.module.os \
      &quot;$MODULE_PREFIX&quot;.module.cleanup_eks_cluster_resources.module.pex_env.module.pex_module_path.module.os \
      &quot;$MODULE_PREFIX&quot;.module.cleanup_eks_cluster_resources.module.pex_env.module.python2_pex_path.module.os \
      &quot;$MODULE_PREFIX&quot;.module.cleanup_eks_cluster_resources.module.pex_env.module.python3_pex_path.module.os \
      &quot;$MODULE_PREFIX&quot;.null_resource.local_kubectl
    ```
 1. **State change.** Once all the resources to be removed match the errors you saw, you are ready to run the command without the `-dry-run` flag to remove those resources from state.
 1. **Re-run `terraform plan`.** You should no longer see those errors. You should not see any changes to add or destroy. You may see some resources that will be updated in place depending on your configuration.
 1. **Run `terraform apply`** to apply any changes and save everything to state. Even if you don&apos;t see changes, run `apply` anyway.

From this point onward, you should be able to make changes to the module as normal.

When you want to destroy the EKS cluster, you can run `terraform destroy`, which should not only destroy the resources created by the module, but also it should remove extraneous resources that otherwise wouldn&apos;t get cleaned up, such as Security Groups managed by AWS, and CoreDNS changes.

Note: At this point terraform 0.14.x has been released, but be aware that these modules have not been tested with it.

These steps assume you&apos;ve upgraded the modules separately using terraform 0.12.x, preferably 0.12.26 or later, as described in the previous step.

1. Upgrade your local terraform to `0.13.x`. We&apos;ve tested with `0.13.4`, but later versions should work.
1. Run `terraform plan`.
1. If there are any minor changes, go ahead and run `terraform apply`.
- Note: If in any of the previous commands you get a provider-related error, you may need to run `terraform init` first.

From this point onward, you should be all good to continue using terraform 0.13.x.

We made big changes to how we clean up leftover resources when running `terraform destroy` in these modules. While most of the time things will work smoothly, there is a known case with an issue:

If you start with a running cluster using the old version (prior to this release) of the modules, that you created with terraform 0.12.x, then upgrade to the new module and terraform 0.13.x as we describe above, and then try to destroy, this destruction step might not go as planned. If you&apos;re spinning up and down a lot of EKS clusters programmatically, it can be a headache to try to resolve errors and timeouts during destroy. Therefore, for these situations, we recommend switching to the new modules along with terraform 0.13.x exclusively once you&apos;re ready to do so. Destroying a cluster that was deployed using this version of the modules applied with terraform 0.13.x works much more smoothly.

We&apos;ve documented specific known issues regarding the destroy below.

The destroy step depends on Kubergrunt version ~0.6.7. Normally if you use the `eks-cluster-control-plane` module with default values for `var.auto_install_kubergrunt` and `var.use_kubergrunt_verification`, the right version of kubergrunt will be installed during `terraform plan`. If you change these values to avoid that install, or if you have installed an older version of kubergrunt, you will get an error when running `terraform destroy` that advises you to install it. For installation instructions, [look here](https://github.com/gruntwork-io/kubergrunt/blob/master/README.md#installation).

- If you have deployed the AWS Load balancer Ingress Controller (previously called AWS ALB Ingress Controller), you need to undeploy it before destroying the EKS cluster. If the Ingress Controller is still up while the EKS cluster is being destroyed, the clean up routine can deadlock with the controller because the resources being destroyed will be recreated by the controller. The destroy process will eventually time out. For example, if you are destroying an EKS cluster with supporting services (as in these examples: [Fargate](https://github.com/gruntwork-io/terraform-aws-eks/tree/master/examples/eks-fargate-cluster-with-supporting-services), [Managed Workers](https://github.com/gruntwork-io/terraform-aws-eks/tree/master/examples/eks-cluster-with-supporting-services)), you will need to first destroy `nginx-service`, then `core-services`, then `eks-cluster`.
- Deleting Fargate profiles in AWS can take longer than anticipated. This can result in timeout errors during the destroy process. If you run into this issue, be advised that you may have to re-run `terraform destroy` a few times before it is able to proceed.
- If you end up needing to re-run `terraform destroy` multiple times because of timeouts, be advised that you may still have to clean up Security Groups and the VPC associated with your cluster manually in the AWS Console UI. This is because the cleanup process that we run in kubergrunt will not re-run on the next `terraform destroy` call if the parent resource (the EKS cluster) is already destroyed. The unfortunate consequence is that any VPC you intended to delete will not be cleaned up because the Security Group remains. Since VPCs incur expenses, please make sure to clean up the leftover Security Group and VPC.

* https://github.com/gruntwork-io/terraform-aws-eks/pull/224


</div>


### [v0.29.2](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.29.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/14/2020 | Modules affected: eks-cluster-managed-workers | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.29.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- You can now set the `capacity_type` on the Managed Node Groups created with `eks-cluster-managed-workers`



</div>


### [v0.29.1](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.29.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/1/2020 | Modules affected: eks-alb-ingress-controller, eks-k8s-cluster-autoscaler, eks-k8s-external-dns, eks-cluster-managed-workers | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.29.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- The type of `pod_tolerations` input var was incorrect for `eks-alb-ingress-controller`, `eks-k8s-cluster-autoscaler`, `eks-k8s-external-dns`.
- `eks-cluster-managed-workers` now supports specifying launch templates.



</div>



## terraform-aws-monitoring


### [v0.24.0](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.24.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/1/2020 | Modules affected: logs/load-balancer-access-logs | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.24.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  **This release contains backwards incompatible changes. Make sure to follow the instructions in the migration guide below!**

The `load-balancer-access-logs` module has been refactored to use the `private-s3-bucket` module under the hood to configure the access logging S3 bucket.




</div>



## terraform-aws-openvpn


### [v0.13.0](https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.13.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/3/2020 | Modules affected: openvpn-server | <a href="https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.13.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
**This release contains backwards incompatible changes. Make sure to follow the instructions in the migration guide below!**

The `openvpn-server` module has been refactored to use the `private-s3-bucket` module under the hood to configure the S3 bucket.



</div>



## terraform-aws-security


### [v0.44.6](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.44.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/18/2020 | Modules affected: account-baseline-root, account-baseline-security, iam-access-analyzer-multi-region | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.44.6">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

As part of upgrading module to align with [CIS 1.3.0](https://www.cisecurity.org/benchmark/amazon_web_services/) compliance, as is recommended, the IAM Access Analyzer needs to be enabled across all used AWS regions. 

In this release:
* We&apos;ve added a new module wrapper `iam-access-analyzer-multi-region` for the IAM Access Analyzer service for multiple AWS regions and a related example.
* We&apos;ve updated `account-baseline-root` and `account-baseline-security` and their respective code examples to showcase using the new module. 

The `iam-access-analyzer-multi-region` has been added, but is disabled at the level of the _Landing Zone_ product (`account-baseline-*` modules) for backward compatibility. To enable the use of this feature, users will need to `enable_iam_access_analyzer` to `true` in the `variables.tf` for each of these modules or examples.





</div>


### [v0.44.5](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.44.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/16/2020 | Modules affected: cloudtrail | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.44.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

This release adds support for configuring [data event logging](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/logging-data-events-with-cloudtrail.html) for cloudtrail buckets. Data event logging is configured using the newly introduced variables: `data_logging_enabled`, `data_logging_read_write_type`, `data_logging_include_management_events`, `data_logging_resource_type` and `data_logging_resource_values`. For detailed instructions see the [descriptions of these variables](https://github.com/gruntwork-io/module-security/blob/master/modules/cloudtrail/variables.tf#L158).




</div>


### [v0.44.4](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.44.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/15/2020 | Modules affected: account-baseline-app, account-baseline-root, account-baseline-security, cloudtrail-bucket | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.44.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
This fixes a bug that was introduced in `v0.44.3`, where the `cloudtrail` module now needed `kms:DescribeKey` access to the KMS key, which was not provided by default. This release reverts back to the behavior in `v0.44.2`, unless you enable the following flags:

- `allow_kms_describe_key_to_external_aws_accounts = true`
- `kms_key_arn_is_alias = true`

You can now attach `kms:DescribeKey` permissions to IAM entities on CMKs managed with `kms-master-key` by setting `cmk_describe_only_user_iam_arns`.



</div>


### [v0.44.3](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.44.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/10/2020 | Modules affected: cloudtrail | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.44.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

This fixes a perpetual diff issue with `cloudtrail` module when `kms_key_arn` is a loose KMS ID (e.g., KMS Alias).



</div>


### [v0.44.2](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.44.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/10/2020 | Modules affected: kms-grant-multi-region | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.44.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

`kms-grant-multi-region` now supports using aliases for KMS Key IDs.



</div>


### [v0.44.1](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.44.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/3/2020 | Modules affected: private-s3-bucket | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.44.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- You can now configure the bucket ownership settings using the new `bucket_ownership` input variable in `private-s3-bucket`.





</div>



## terraform-aws-server


### [v0.9.4](https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.9.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/16/2020 | Modules affected: single-server | <a href="https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.9.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Replace `template_file` usage with `locals` to avoid data source dependency graphs.




</div>



## terraform-aws-service-catalog


### [v0.15.1](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.15.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/18/2020 | Modules affected: services, mgmt, networking, base | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.15.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- The `ecs-service` module accepts a new optional variable, `secrets_access`, which can be used to automatically create an IAM policy with `GetSecretValue` permission on the given secrets. 
- Update dependency `gruntwork-io/module-ci` to v0.29.5 ([release notes](https://togithub.com/gruntwork-io/module-ci/releases/tag/v0.29.5))
- Update dependency `gruntwork-io/terraform-aws-vpc` to v0.12.4 ([release notes](https://togithub.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.12.4))
- Update dependency `gruntwork-io/module-server` to v0.9.4 ([release notes](https://togithub.com/gruntwork-io/module-server/releases/tag/v0.9.4))
- Update dependency `gruntwork-io/module-security` to ([v0.44.5](https://togithub.com/gruntwork-io/module-security/releases/tag/v0.44.5))
- Update dependency `gruntwork-io/module-ecs` to ([v0.23.3](https://togithub.com/gruntwork-io/module-ecs/releases/tag/v0.23.3))
- Update dependency `gruntwork-io/terratest` to ([v0.31.2](https://togithub.com/gruntwork-io/terratest/releases/tag/v0.31.2))





</div>


### [v0.14.1](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.14.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/15/2020 | Modules affected: base, data-stores, landingzone, mgmt | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.14.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Update dependency `gruntwork-io/module-security`: `v0.44.3` =&gt; `v0.44.4` (Release notes: [v0.44.4](https://github.com/gruntwork-io/module-security/releases/tag/v0.44.4)).





</div>


### [v0.14.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.14.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/14/2020 | Modules affected: base, data-stores, landingzone, mgmt/openvpn-server | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.14.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Update dependency `gruntwork-io/module-security`: `v0.44.2` =&gt; `v0.44.3` (Release notes: [v0.44.3](https://github.com/gruntwork-io/module-security/releases/tag/v0.44.3)).
- Update dependency `gruntwork-io/terraform-aws-vpc`: `v0.12.2` =&gt; `v0.12.3` (Release notes: [v0.12.3](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.12.3)).
- Update dependency `gruntwork-io/module-ci`: `v0.29.3` =&gt; `v0.29.4` (Release notes: [v0.29.4](https://github.com/gruntwork-io/module-ci/releases/tag/v0.29.4)).
- Update dependency `gruntwork-io/terratest`: `v0.30.23` =&gt; `v0.31.1` (Release notes: [v0.30.24](https://github.com/gruntwork-io/terratest/releases/tag/v0.30.24), [v0.30.25](https://github.com/gruntwork-io/terratest/releases/tag/v0.30.25), [v0.30.26](https://github.com/gruntwork-io/terratest/releases/tag/v0.30.26), [v0.30.27](https://github.com/gruntwork-io/terratest/releases/tag/v0.30.27), [v0.31.0](https://github.com/gruntwork-io/terratest/releases/tag/v0.31.0), [v0.31.1](https://github.com/gruntwork-io/terratest/releases/tag/v0.31.1)).
- Update dependency `gruntwork-io/terraform-aws-eks`: `v0.29.0` =&gt; `v0.29.1` (Release notes: [v0.29.1](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.29.1)).
- Update dependency `gruntwork-io/kubergrunt`: =&gt; `v0.6.7` (Release notes: [v0.6.7](https://github.com/gruntwork-io/kubergrunt/releases/tag/v0.6.7)).
- Update dependency `gruntwork-io/terraform-aws-monitoring`: `v0.23.4` =&gt; `v0.24.0` (Release notes: [v0.24.0](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.24.0)). **NOTE: This includes a backwards incompatible change that affects the `k8s-service` and `alb` modules. Please read [the migration guide](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.24.0) in the terraform-aws-monitoring module release notes for more details!**
- Update dependency `gruntwork-io/module-ecs: `v0.23.0` =&gt; `v0.23.2` (Release notes: [v0.23.1](https://github.com/gruntwork-io/module-ecs/releases/tag/v0.23.1), [v0.23.2](https://github.com/gruntwork-io/module-ecs/releases/tag/v0.23.2)).

- Update dependency `gruntwork-io/package-openvpn`: `v0.12.1` =&gt; `v0.13.0` (Release notes: [v0.13.0](https://github.com/gruntwork-io/package-openvpn/releases/tag/v0.13.0)). **NOTE: This includes a backwards incompatible change that affects the `openvpn-server` module. Please read [the migration guide](https://github.com/gruntwork-io/package-openvpn/releases/tag/v0.13.0) in the package-openvpn module release notes for more details!**




</div>


### [v0.13.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.13.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/10/2020 | Modules affected: networking/vpc-mgmt, networking/vpc, data-stores, base | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.13.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Update dependency `gruntwork-io/module-data-storage`: `v0.16.3` =&gt; `v0.17.1` (Release notes: [v0.17.0](https://github.com/gruntwork-io/module-data-storage/releases/tag/v0.17.0) ; [v0.17.1](https://github.com/gruntwork-io/module-data-storage/releases/tag/v0.17.1)).
- Update dependency `gruntwork-io/terraform-aws-vpc`: `v0.11.0` =&gt; `v0.12.2` (Release notes: [v0.12.0](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.12.0) ; [v0.12.1](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.12.1) ; [v0.12.2](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.12.2)). **NOTE: This includes a backwards incompatible change. Please read [the migration guide](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.12.0) in the `terraform-aws-vpc` module release notes for more details!**
- Update dependency `gruntwork-io/module-security`: `v0.44.1` =&gt; `v0.44.2` ([release notes](https://github.com/gruntwork-io/module-security/releases/tag/v0.44.2)).
- Address a silent failure in KMS grant dependencies in the account baseline modules.



</div>


### [v0.12.1](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.12.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/4/2020 | Modules affected: data-stores | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.12.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Exposed SSE algorithm settings in `s3-bucket`: `bucket_sse_algorithm` and `replica_sse_algorithm`.






</div>


### [v0.12.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.12.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/4/2020 | Modules affected: mgmt, data-stores, base, landingzone | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.12.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Update dependency `gruntwork-io/terragrunt` to v0.26.7
- Access permissions for the access log and replica buckets in `s3-bucket` are now controlled via the separate input variables `access_logging_bucket_policy_statements` and `replica_bucket_policy_statements` instead. **This is a backwards incompatible change. See Migration Guide below.**
- Expose bucket ownership settings in `s3-bucket` via the `bucket_ownership`, `access_logging_bucket_ownership`, and `replica_bucket_ownership` input variables.


</div>


### [v0.11.2](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.11.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/1/2020 | Modules affected: data-stores, networking | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.11.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Expose the redis parameter group name from the underlying module (input variable `parameter_group_name`).
- Expose `engine_version` for Aurora.
- Expose `enable_deletion_protection` for RDS modules.



</div>



## terraform-aws-vpc


### [v0.12.4](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.12.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/17/2020 | Modules affected: vpc-app-network-acls | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.12.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fix a bug where `vpc-app-network-acls` would not work correctly if some of the subnet tiers in the VPC were disabled. 





</div>


### [v0.12.3](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.12.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/10/2020 | Modules affected: vpc-app | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.12.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- The `vpc-app` module now allows you to configure the ingress and egress rules for the default Security Group and NACL using the new `default_security_group_ingress_rules`, `default_security_group_egress_rules`, `default_nacl_ingress_rules`, and `default_nacl_egress_rules` input variables. You can also control tags on these resources using the existing `custom_tags` input variable.



</div>


### [v0.12.2](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.12.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/10/2020 | Modules affected: vpc-flow-logs | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.12.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fix a bug in how the `vpc-flow-logs` module looked up the KMS key when `create_resources` was set to `false`. 






</div>


### [v0.12.1](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.12.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/9/2020 | Modules affected: vpc-app, vpc-mgmt, vpc-mgmt-network-acls | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.12.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- The `vpc-app` module now allows you to disable any of the three tiers of subnets (public, private-app, private-persistence) by setting the new input variables `create_public_subnets`, `create_private_app_subnets`, or `create_private_persistence_subnets` to `false`. This is convenient, for example, if you want to create a VPC with no public subnets because you get all public Internet access through some other mechanism (e.g., Direct Connect, VPC peering, etc). 
- **IMPORTANT NOTE: as of this release, `vpc-mgmt` is now deprecated**: The main difference between `vpc-mgmt` and `vpc-app` was that `vpc-app` had three tiers of subnets (public, private-app, private-persistence) and `vpc-mgmt` had two (public, private). As of 
this release, since `vpc-app` allows you to disable any of the subnet tiers, it can now support 1, 2, or 3 tiers of subnets, as needed. Therefore, we recommend using `vpc-app` for all your VPCs in the future. If you&apos;re already using `vpc-mgmt`, we will continue to maintain it for a little while longer, but please be aware that, in a future release, once we feel the new functionality in `vpc-app` is fully baked, we will remove `vpc-mgmt` entirely.
 





</div>


### [v0.12.0](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.12.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/3/2020 | Modules affected: vpc-flow-logs | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.12.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
**This release contains backwards incompatible changes. Make sure to follow the instructions in the migration guide below!**

The `vpc-flow-logs` module has been refactored to use the `private-s3-bucket` module under the hood to configure the S3 bucket.



</div>



## terraform-kubernetes-helm


### [v0.6.2](https://github.com/gruntwork-io/terraform-kubernetes-helm/releases/tag/v0.6.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/15/2020 | <a href="https://github.com/gruntwork-io/terraform-kubernetes-helm/releases/tag/v0.6.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  (no description found in release notes)

</div>

<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "releases",
  "hash": "cd59b27ac77961e216d55d63cebbdb0a"
}
##DOCS-SOURCER-END -->

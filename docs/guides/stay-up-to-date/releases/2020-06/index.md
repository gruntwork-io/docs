
# Gruntwork release 2020-06

<p style={{marginTop: "-25px"}}><small><a href="/guides">Guides</a> / <a href="/guides/stay-up-to-date">Update Guides</a> / <a href="/guides/stay-up-to-date/releases">Releases</a> / 2020-06</small></p>

This page is lists all the updates to the [Gruntwork Infrastructure as Code
Library](https://gruntwork.io/infrastructure-as-code-library/) that were released in 2020-06. For instructions
on how to use these updates in your code, check out the [updating
documentation](/library/stay-up-to-date/updating).

Here are the repos that were updated:

- [infrastructure-live-multi-account-acme](#infrastructure-live-multi-account-acme)
- [infrastructure-modules-multi-account-acme](#infrastructure-modules-multi-account-acme)
- [terraform-aws-asg](#terraform-aws-asg)
- [terraform-aws-cache](#terraform-aws-cache)
- [terraform-aws-ci](#terraform-aws-ci)
- [terraform-aws-data-storage](#terraform-aws-data-storage)
- [terraform-aws-ecs](#terraform-aws-ecs)
- [terraform-aws-eks](#terraform-aws-eks)
- [terraform-aws-lambda](#terraform-aws-lambda)
- [terraform-aws-messaging](#terraform-aws-messaging)
- [terraform-aws-security](#terraform-aws-security)
- [terraform-aws-server](#terraform-aws-server)
- [terraform-aws-vpc](#terraform-aws-vpc)


## infrastructure-live-multi-account-acme


### [v0.0.1-06112020](https://github.com/gruntwork-io/infrastructure-live-multi-account-acme/releases/tag/v0.0.1-06112020)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/12/2020 | <a href="https://github.com/gruntwork-io/infrastructure-live-multi-account-acme/releases/tag/v0.0.1-06112020">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Since this repo is solely used for examples/demonstrations, and NOT meant for direct production use, we simply publish all changes at v0.0.1, with a date marker for when it was published.

Updates in this version:

- Update EKS modules to latest version.
- Update k8s-service to use helm v3
- Update k8s-service to use latest chart versions.

Refer to the migration guide in [infrastructure-modules-multi-account-acme](https://github.com/gruntwork-io/infrastructure-modules-multi-account-acme/releases/v0.0.1-06112020) for instructions on how to update existing reference architectures.

</div>


### [v0.0.1-06082020](https://github.com/gruntwork-io/infrastructure-live-multi-account-acme/releases/tag/v0.0.1-06082020)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/8/2020 | <a href="https://github.com/gruntwork-io/infrastructure-live-multi-account-acme/releases/tag/v0.0.1-06082020">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Since this repo is solely used for examples/demonstrations, and NOT meant for direct production use, we simply publish all changes at v0.0.1, with a date marker for when it was published.

Updates in this version:

- Fix compatibility issues with latest terragrunt
- Bump instances to `t3` class

</div>



## infrastructure-modules-multi-account-acme


### [v0.0.1-06112020](https://github.com/gruntwork-io/infrastructure-modules-multi-account-acme/releases/tag/v0.0.1-06112020)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/12/2020 | <a href="https://github.com/gruntwork-io/infrastructure-modules-multi-account-acme/releases/tag/v0.0.1-06112020">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Since this repo is solely used for examples/demonstrations, and NOT meant for direct production use, we simply publish all changes at v0.0.1, with a date marker for when it was published.

Updates in this version:

- Update EKS modules to latest version.
- Update k8s-service to use helm v3
- Update k8s-service to use latest chart versions.

If you would like to take an existing Reference Architecture and update to this version, see the guide below.


**IMPORTANT: This has been updated to allow upgrades post deprecation of helm v2 repository.**

If you are running an EKS flavored Reference Architecture deployed prior to this release (all Reference Architectures before 06/11/2020), you can follow the guides in the following order to update your EKS cluster to this version.

This upgrade moves you to Kubernetes 1.16, the Gruntwork `terraform-aws-eks` module to v0.20.1, and Helm 3. You will first update the cluster itself, then the core services, and finally, your own services that run in the cluster.

**NOTE: You must fully roll out the changes at each bullet point prior to moving on to the next step, unless stated otherwise.**

1. Update your EKS cluster to run Kubernetes version 1.14 ([instructions](https://github.com/gruntwork-io/terraform-aws-eks/blob/master/modules/eks-cluster-control-plane/README.md#how-do-i-upgrade-the-kubernetes-version-of-the-cluster)). Note that you must update the module versions to upgrade beyond 1.14, so if you want to upgrade to 1.15 and 1.16, wait until the end of the guide.
1. Upgrade Gruntwork library modules `eks-cluster-control-plane` and `eks-cluster-workers` in the `eks-cluster` service module to version `v0.9.8` ([instructions](https://github.com/gruntwork-io/infrastructure-modules-multi-account-acme/blob/master/services/eks-cluster/migration_guides/upgrading_from_0_8_to_0_9.md)).
1. Update `eks-clusters` service module ([instructions](https://github.com/gruntwork-io/infrastructure-modules-multi-account-acme/blob/master/services/eks-cluster/migration_guides/upgrading_from_0_9_to_0_20.md)).
1. At this point, you can repeat the steps in step (1) to upgrade the Kubernetes version to 1.15 and 1.16.
1. Upgrade `k8s-service` service module to use Helm v3 ([instructions](https://github.com/gruntwork-io/infrastructure-modules-multi-account-acme/blob/master/services/k8s-service/migration_guides/upgrading_to_helm3.md)). **This must be rolled out to ALL your services before you can move on to the next step.**
1. Update `k8s-service` to use chart version `0.1.0` ([instructions](https://github.com/gruntwork-io/infrastructure-modules-multi-account-acme/blob/master/services/k8s-service/migration_guides/upgrading_to_0.1.0_chart_version.md)).
1. Update `eks-core-services` service module ([instructions](https://github.com/gruntwork-io/infrastructure-modules-multi-account-acme/blob/yori-bump-eks/services/eks-core-services/migration_guides/upgrading_from_0_8_to_0_20.md)).
1. Update `k8s-namespace-with-tiller` module to remove references to Tiller ([instructions](https://github.com/gruntwork-io/infrastructure-modules-multi-account-acme/blob/master/services/k8s-namespace/migration_guides/upgrading_from_helm2_k8s-namespace-with-tiller.md)).

</div>


### [v0.0.1-06082020](https://github.com/gruntwork-io/infrastructure-modules-multi-account-acme/releases/tag/v0.0.1-06082020)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/8/2020 | <a href="https://github.com/gruntwork-io/infrastructure-modules-multi-account-acme/releases/tag/v0.0.1-06082020">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Since this repo is solely used for examples/demonstrations, and NOT meant for direct production use, we simply publish all changes at v0.0.1, with a date marker for when it was published.

Updates in this version:
- Support for `nvme-cli`
- Bumping to `t3.micro`
- Bumping to latest `module-ci` for jenkins-server
- Bug fixes with helm
- Bug fixes in tls-scripts
- Compatibility update with latest terragrunt version
- Updating default kubernetes version to 1.14

</div>



## terraform-aws-asg


### [v0.9.0](https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.9.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/17/2020 | Modules affected: asg-rolling-deploy | <a href="https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.9.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
The variable `aws_region` was removed from the module, it&apos;s value will be retrieved from the region on the provider. When updating to this new version, make sure to remove the `aws_region` parameter to the module.


</div>


### [v0.8.8](https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.8.8)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/14/2020 | Modules affected: asg-rolling-deploy | <a href="https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.8.8">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- You can now configure the `asg-rolling-deploy` module to NOT use ELB health checks during a deploy by setting the `use_elb_health_checks` variable to `false`. This is useful for testing connectivity before health check endpoints are available.



</div>



## terraform-aws-cache


### [v0.9.3](https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v0.9.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/25/2020 | Modules affected: memcached | <a href="https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v0.9.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Updated the `memcached` module to support passing an empty list of allowed CIDR blocks.




</div>



## terraform-aws-ci


### [v0.23.0](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.23.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/24/2020 | Modules affected: git-helpers, terraform-helpers | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.23.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

`terraform-update-variable` now supports commiting updates to a separate branch. Note that as part of this change, the `--skip-git` option has been updated to take in the value as opposed to being a bare option. If you were using the `--skip-git` flag previously, you will now need to pass in `--skip-git true`.



</div>


### [v0.22.2](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.22.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/2/2020 | Modules affected: ecs-deploy-runner | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.22.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Added ecs_task_iam_role_arn as output on ecs-deploy-runner module



</div>



## terraform-aws-data-storage


### [v0.13.0](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.13.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/22/2020 | Modules affected: rds, aurora | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.13.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- `rds` **[BREAKING CHANGES]**
- `aurora` **[BREAKING CHANGES]**


- The `rds` and `aurora` modules have been updated to remove redundant/duplicate resources by taking advantage of Terraform 0.12 syntax (i.e., `for_each`, `null` defaults, and `dynamic` blocks). This greatly simplifies the code and makes it more maintainable, but because many resources were renamed, this is a **backwards incompatible change**, so make sure to follow the migration guide below when upgrading!


All input and output variables are the same, so you will not need to do any code changes. There are no changes in functionality either, so there shouldn&apos;t be anything new to `apply` (i.e., when you finish the migration, the `plan` migration should show no changes). The only thing that changed in this upgrade is that several resources were renamed in the Terraform code, so you&apos;ll need to update your Terraform state so it knows about these new names. You do this using the [state mv](https://www.terraform.io/docs/commands/state/mv.html) command (**Note**: If you&apos;re using Terragrunt, replace `terraform` with `terragrunt` in all the commands in this migration guide):

```bash
terraform state mv OLD_ADDRESS NEW_ADDRESS
```

Where `OLD_ADDRESS` is the [resource address](https://www.terraform.io/docs/internals/resource-addressing.html) with the old resource name and `NEW_ADDRESS` is the resource address with the new name. The easiest way to get the old and new address is to upgrade to the new version of this module and run `terraform plan`. When you do so, you&apos;ll see output like this:

```
$ terraform plan

[...]

  # module.aurora_serverless.aws_rds_cluster.cluster will be created
  + resource &quot;aws_rds_cluster&quot; &quot;cluster&quot; &#x7B;
      + apply_immediately                   = false
      + arn                                 = (known after apply)
      + availability_zones                  = (known after apply)
      + backup_retention_period             = 21
      + cluster_identifier                  = &quot;aurora-serverless-example&quot;
      + cluster_identifier_prefix           = (known after apply)
      + cluster_members                     = (known after apply)

[...]

  # module.aurora_serverless.aws_rds_cluster.cluster_with_encryption_serverless[0] will be destroyed
  - resource &quot;aws_rds_cluster&quot; &quot;cluster_with_encryption_serverless&quot; &#x7B;
      - apply_immediately                   = false -&gt; null
      - arn                                 = &quot;arn:aws:rds:us-east-1:087285199408:cluster:aurora-serverless-example&quot; -&gt; null
      - availability_zones                  = [
          - &quot;us-east-1a&quot;,
          - &quot;us-east-1b&quot;,
          - &quot;us-east-1e&quot;,
        ] -&gt; null
      - backtrack_window                    = 0 -&gt; null
      - backup_retention_period             = 21 -&gt; null
      - cluster_identifier                  = &quot;aurora-serverless-example&quot; -&gt; null
```

The lines that show you resources being removed (with a `-` in front of them) show the old addresses in a comment above the resource:

```
  # module.aurora_serverless.aws_rds_cluster.cluster_with_encryption_serverless[0] will be destroyed
  - resource &quot;aws_rds_cluster&quot; &quot;cluster_with_encryption_serverless&quot; &#x7B;
```

And the lines that show the very same resources being added (with a `+` in front of them) show the new addresses in a comment above the resource:

```
  # module.aurora_serverless.aws_rds_cluster.cluster will be created
  + resource &quot;aws_rds_cluster&quot; &quot;cluster&quot; &#x7B;
```

You&apos;ll want to run `terraform state mv` (or `terragrunt state mv`) on each pair of these resources:

```
terraform state mv \
  module.aurora_serverless.aws_rds_cluster.cluster_with_encryption_serverless[0] \
  module.aurora_serverless.aws_rds_cluster.cluster
```

Here are the renames that have happened:

| Old resource name                                          | New resource name          |
|------------------------------------------------------------|----------------------------|
| `aws_rds_cluster.cluster_with_encryption_global_primary`   | `aws_rds_cluster.cluster`  |
| `aws_rds_cluster.cluster_with_encryption_global_secondary` | `aws_rds_cluster.cluster`  |
| `aws_rds_cluster.cluster_with_encryption_serverless`       | `aws_rds_cluster.cluster`  |
| `aws_rds_cluster.cluster_with_encryption_provisioned`      | `aws_rds_cluster.cluster`  |
| `aws_rds_cluster.cluster_without_encryption`               | `aws_rds_cluster.cluster`  |
| `aws_db_instance.primary_with_encryption`                  | `aws_db_instance.primary`  |
| `aws_db_instance.primary_without_encryption`               | `aws_db_instance.primary`  |
| `aws_db_instance.replicas_with_encryption`                 | `aws_db_instance.replicas` |
| `aws_db_instance.replicas_without_encryption`              | `aws_db_instance.replicas` |

When you&apos;ve run `terraform state mv` on all the pairs of resources, you know you&apos;ve done it correctly if you can run `terraform plan` and see no changes:

```
$ terraform plan

[...]


------------------------------------------------------------------------

No changes. Infrastructure is up-to-date.
```



- https://github.com/gruntwork-io/module-data-storage/pull/151
- https://github.com/gruntwork-io/module-data-storage/pull/150



</div>


### [v0.12.21](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.12.21)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/17/2020 | Modules affected: aurora | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.12.21">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Improved the Aurora documentation and added a dedicated Aurora Serverless example. This release also adds support for specifying a `scaling_configuration_timeout_action` when using the `aurora` module in `serverless` mode.





</div>


### [v0.12.20](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.12.20)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/17/2020 | Modules affected: efs | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.12.20">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- The `efs` module can now create EFS access points and corresponding IAM policies for you. Use the `efs_access_points` input variable to specify what access points you want and configure the user settings, root directory, read-only access, and read-write access for each one.



</div>


### [v0.12.19](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.12.19)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/14/2020 | Modules affected: rds | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.12.19">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- The `rds` module now supports cross-region replication! You can enable it by setting the `replicate_source_db` input variable to the ARN of a primary DB that should be replicated. See [rds-mysql-with-cross-region-replica](https://github.com/gruntwork-io/module-data-storage/tree/master/examples/rds-mysql-with-cross-region-replica) for a working example.
- Added `primary_address` and `read_replica_addresses` outputs to the `rds` module. 
- Added docs on [how to avoid state drift when using auto minor version upgrades](https://github.com/gruntwork-io/module-data-storage/blob/master/modules/rds/core-concepts.md#minor-version-upgrades) with the `rds` module.






</div>


### [v0.12.18](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.12.18)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/4/2020 | Modules affected: rds | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.12.18">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fix issue where restoring from snapshot wasn&apos;t setting `master_password`



</div>



## terraform-aws-ecs


### [v0.20.3](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.20.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/30/2020 | Modules affected: ecs-service | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.20.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- The `ecs-service` module now allows you to mount EFS Volumes in your ECS Tasks (including Fargate tasks) using the new `efs_volumes` input variable. See also the [efs module](https://github.com/gruntwork-io/module-data-storage/tree/master/modules/efs) for creating EFS volumes.



</div>


### [v0.20.2](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.20.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/17/2020 | Modules affected: ecs-cluster | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.20.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- The `ecs-cluster` module now attaches the `ecs:UpdateContainerInstancesState` permission to the ECS Cluster&apos;s IAM role. This is required for automated ECS instance draining (e.g., when receiving a spot instance termination notice).



</div>


### [v0.20.1](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.20.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/8/2020 | Modules affected: ecs-cluster | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.20.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Add new module output `ecs_instance_iam_role_id` which contains the ID of the `aws_iam_role` mapped to ecs instances.






</div>


### [v0.20.0](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.20.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/5/2020 | Modules affected: ecs-service | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.20.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

You can now bind different containers and ports to each target group created for the ECS service. This can be used to expose multiple containers or ports to existing ALBs or NLBs.



</div>



## terraform-aws-eks


### [v0.20.3](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.20.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/17/2020 | Modules affected: eks-k8s-external-dns, eks-alb-ingress-controller | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.20.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

`eks-k8s-external-dns` is now using a more up to date Helm chart to deploy `external-dns`. Additionally, you can now configure the logging format between `text` and `json`.

`eks-alb-ingress-controller` now supports selecting a different container version of the ingress controller. This can be used to deploy the v2 alpha image with shared ALB support.



</div>


### [v0.20.2](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.20.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/11/2020 | Modules affected: eks-cluster-control-plane | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.20.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

The control plane Python PEX binaries now support long path names on Windows. Previously the scripts were causing errors when attempting to unpack the dependent libraries.


</div>


### [v0.20.1](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.20.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/2/2020 | Modules affected: eks-cloudwatch-container-logs, eks-cluster-control-plane | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.20.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

The cluster upgrade script now supports updating to Kubernetes version 1.16. The `eks-cloudwatch-container-logs` is also now compatible with Kubernetes version 1.16.


</div>



## terraform-aws-lambda


### [v0.8.1](https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.8.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/1/2020 | Modules affected: lambda-edge, lambda | <a href="https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.8.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

The `lambda` and `lambda-edge` modules now support configuring the dead letter queue for subscribing to errors from the functions.



</div>



## terraform-aws-messaging


### [v0.3.4](https://github.com/gruntwork-io/terraform-aws-messaging/releases/tag/v0.3.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/22/2020 | Modules affected: sqs | <a href="https://github.com/gruntwork-io/terraform-aws-messaging/releases/tag/v0.3.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

The `sqs` module can now be turned off by setting `create_resources = true`. When this option is passed in, the module will disable all the resources, effectively simulating a conditional.




</div>


### [v0.3.3](https://github.com/gruntwork-io/terraform-aws-messaging/releases/tag/v0.3.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/3/2020 | Modules affected: sns | <a href="https://github.com/gruntwork-io/terraform-aws-messaging/releases/tag/v0.3.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- The `sns` module will now allow display names to be up to 100 characters.



</div>



## terraform-aws-security


### [v0.32.3](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.32.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/16/2020 | Modules affected: account-baseline-security | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.32.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

As [outlined in the AWS docs](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/create-kms-key-policy-for-cloudtrail.html#create-kms-key-policy-for-cloudtrail-encrypt), the key policy in the security account should allow trail/* so that all trails in external accounts can use the key for encryption (but not decryption). Without this, running the account baseline in a sub account results in InsufficientEncryptionPolicyException.




</div>


### [v0.32.2](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.32.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/14/2020 | Modules affected: iam-users | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.32.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- The `iam-users` module can now associate a public SSH key with each IAM user using the `ssh_public_key` parameter.



</div>


### [v0.32.1](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.32.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/2/2020 | Modules affected: account-baseline-app, account-baseline-security, kms-master-key-multi-region, cloudtrail | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.32.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

This minor release includes a number of documentation changes and renamed files.

- `vars.tf` has been renamed to `variables.tf` throughout the repository
- The suggestion to set the `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` has been dropped since most users now use `aws-auth` or `aws-vault`
- Added documentation on using 1Password with `aws-auth`




</div>



## terraform-aws-server


### [v0.8.3](https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.8.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/26/2020 | Modules affected: single-server | <a href="https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.8.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Added `iam_role_name` and `iam_role_arn` outputs to the `single-server` module.
- Updated the repo README to the new format.



</div>



## terraform-aws-vpc


### [v0.8.10](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.8.10)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/26/2020 | Modules affected: vpc-dns-forwarder-rules, vpc-dns-forwarder, vpc-flow-logs | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.8.10">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

This release adds the ability to create `tags` with the modules mentioned above.




</div>


### [v0.8.9](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.8.9)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/14/2020 | Modules affected: vpc-interface-endpoint | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.8.9">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- The `vpc-interface-endpoint` module now supports endpoints for SSM, SSM Messages, and EC2 Messages.



</div>




<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "releases",
  "hash": "cbcf8bdec27f52357d591682df49cd22"
}
##DOCS-SOURCER-END -->

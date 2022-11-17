
# Gruntwork release 2020-06

<p style={{marginTop: "-25px"}}><small><a href="/guides">Guides</a> / <a href="/guides/stay-up-to-date">Update Guides</a> / <a href="/guides/stay-up-to-date/releases">Releases</a> / 2020-06</small></p>

This page is lists all the updates to the [Gruntwork Infrastructure as Code 
Library](https://gruntwork.io/infrastructure-as-code-library/) that were released in 2020-06. For instructions 
on how to use these updates in your code, check out the [updating 
documentation](/guides/working-with-code/using-modules#updating).

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

Since this repo is solely used for examples/demonstrations, and NOT meant for direct production use, we simply publish all changes at v0.0.1, with a date marker for when it was published.

Updates in this version:

- Update EKS modules to latest version.
- Update k8s-service to use helm v3
- Update k8s-service to use latest chart versions.

Refer to the migration guide in [infrastructure-modules-multi-account-acme](https://github.com/gruntwork-io/infrastructure-modules-multi-account-acme/releases/v0.0.1-06112020) for instructions on how to update existing reference architectures.


### [v0.0.1-06082020](https://github.com/gruntwork-io/infrastructure-live-multi-account-acme/releases/tag/v0.0.1-06082020)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/8/2020 | <a href="https://github.com/gruntwork-io/infrastructure-live-multi-account-acme/releases/tag/v0.0.1-06082020">Release notes</a></small>
</p>

Since this repo is solely used for examples/demonstrations, and NOT meant for direct production use, we simply publish all changes at v0.0.1, with a date marker for when it was published.

Updates in this version:

- Fix compatibility issues with latest terragrunt
- Bump instances to `t3` class



## infrastructure-modules-multi-account-acme


### [v0.0.1-06112020](https://github.com/gruntwork-io/infrastructure-modules-multi-account-acme/releases/tag/v0.0.1-06112020)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/12/2020 | <a href="https://github.com/gruntwork-io/infrastructure-modules-multi-account-acme/releases/tag/v0.0.1-06112020">Release notes</a></small>
</p>

Since this repo is solely used for examples/demonstrations, and NOT meant for direct production use, we simply publish all changes at v0.0.1, with a date marker for when it was published.

Updates in this version:

- Update EKS modules to latest version.
- Update k8s-service to use helm v3
- Update k8s-service to use latest chart versions.

If you would like to take an existing Reference Architecture and update to this version, see the guide below.



### [v0.0.1-06082020](https://github.com/gruntwork-io/infrastructure-modules-multi-account-acme/releases/tag/v0.0.1-06082020)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/8/2020 | <a href="https://github.com/gruntwork-io/infrastructure-modules-multi-account-acme/releases/tag/v0.0.1-06082020">Release notes</a></small>
</p>

Since this repo is solely used for examples/demonstrations, and NOT meant for direct production use, we simply publish all changes at v0.0.1, with a date marker for when it was published.

Updates in this version:
- Support for `nvme-cli`
- Bumping to `t3.micro`
- Bumping to latest `module-ci` for jenkins-server
- Bug fixes with helm
- Bug fixes in tls-scripts
- Compatibility update with latest terragrunt version
- Updating default kubernetes version to 1.14



## terraform-aws-asg


### [v0.9.0](https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.9.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/17/2020 | Modules affected: asg-rolling-deploy | <a href="https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.9.0">Release notes</a></small>
</p>


The variable `aws_region` was removed from the module, it's value will be retrieved from the region on the provider. When updating to this new version, make sure to remove the `aws_region` parameter to the module.



### [v0.8.8](https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.8.8)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/14/2020 | Modules affected: asg-rolling-deploy | <a href="https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.8.8">Release notes</a></small>
</p>



- You can now configure the `asg-rolling-deploy` module to NOT use ELB health checks during a deploy by setting the `use_elb_health_checks` variable to `false`. This is useful for testing connectivity before health check endpoints are available.





## terraform-aws-cache


### [v0.9.3](https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v0.9.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/25/2020 | Modules affected: memcached | <a href="https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v0.9.3">Release notes</a></small>
</p>



- Updated the `memcached` module to support passing an empty list of allowed CIDR blocks.






## terraform-aws-ci


### [v0.23.0](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.23.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/24/2020 | Modules affected: git-helpers, terraform-helpers | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.23.0">Release notes</a></small>
</p>



`terraform-update-variable` now supports commiting updates to a separate branch. Note that as part of this change, the `--skip-git` option has been updated to take in the value as opposed to being a bare option. If you were using the `--skip-git` flag previously, you will now need to pass in `--skip-git true`.




### [v0.22.2](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.22.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/2/2020 | Modules affected: ecs-deploy-runner | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.22.2">Release notes</a></small>
</p>



- Added ecs_task_iam_role_arn as output on ecs-deploy-runner module





## terraform-aws-data-storage


### [v0.13.0](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.13.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/22/2020 | Modules affected: rds, aurora | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.13.0">Release notes</a></small>
</p>


- `rds` **[BREAKING CHANGES]**
- `aurora` **[BREAKING CHANGES]**


- The `rds` and `aurora` modules have been updated to remove redundant/duplicate resources by taking advantage of Terraform 0.12 syntax (i.e., `for_each`, `null` defaults, and `dynamic` blocks). This greatly simplifies the code and makes it more maintainable, but because many resources were renamed, this is a **backwards incompatible change**, so make sure to follow the migration guide below when upgrading!


All input and output variables are the same, so you will not need to do any code changes. There are no changes in functionality either, so there shouldn't be anything new to `apply` (i.e., when you finish the migration, the `plan` migration should show no changes). The only thing that changed in this upgrade is that several resources were renamed in the Terraform code, so you'll need to update your Terraform state so it knows about these new names. You do this using the [state mv](https://www.terraform.io/docs/commands/state/mv.html) command (**Note**: If you're using Terragrunt, replace `terraform` with `terragrunt` in all the commands in this migration guide):



### [v0.12.21](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.12.21)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/17/2020 | Modules affected: aurora | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.12.21">Release notes</a></small>
</p>



- Improved the Aurora documentation and added a dedicated Aurora Serverless example. This release also adds support for specifying a `scaling_configuration_timeout_action` when using the `aurora` module in `serverless` mode.






### [v0.12.20](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.12.20)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/17/2020 | Modules affected: efs | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.12.20">Release notes</a></small>
</p>



- The `efs` module can now create EFS access points and corresponding IAM policies for you. Use the `efs_access_points` input variable to specify what access points you want and configure the user settings, root directory, read-only access, and read-write access for each one.




### [v0.12.19](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.12.19)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/14/2020 | Modules affected: rds | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.12.19">Release notes</a></small>
</p>



- The `rds` module now supports cross-region replication! You can enable it by setting the `replicate_source_db` input variable to the ARN of a primary DB that should be replicated. See [rds-mysql-with-cross-region-replica](https://github.com/gruntwork-io/module-data-storage/tree/master/examples/rds-mysql-with-cross-region-replica) for a working example.
- Added `primary_address` and `read_replica_addresses` outputs to the `rds` module. 
- Added docs on [how to avoid state drift when using auto minor version upgrades](https://github.com/gruntwork-io/module-data-storage/blob/master/modules/rds/core-concepts.md#minor-version-upgrades) with the `rds` module.







### [v0.12.18](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.12.18)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/4/2020 | Modules affected: rds | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.12.18">Release notes</a></small>
</p>



- Fix issue where restoring from snapshot wasn't setting `master_password`





## terraform-aws-ecs


### [v0.20.3](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.20.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/30/2020 | Modules affected: ecs-service | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.20.3">Release notes</a></small>
</p>



- The `ecs-service` module now allows you to mount EFS Volumes in your ECS Tasks (including Fargate tasks) using the new `efs_volumes` input variable. See also the [efs module](https://github.com/gruntwork-io/module-data-storage/tree/master/modules/efs) for creating EFS volumes.




### [v0.20.2](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.20.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/17/2020 | Modules affected: ecs-cluster | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.20.2">Release notes</a></small>
</p>



- The `ecs-cluster` module now attaches the `ecs:UpdateContainerInstancesState` permission to the ECS Cluster's IAM role. This is required for automated ECS instance draining (e.g., when receiving a spot instance termination notice).




### [v0.20.1](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.20.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/8/2020 | Modules affected: ecs-cluster | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.20.1">Release notes</a></small>
</p>



- Add new module output `ecs_instance_iam_role_id` which contains the ID of the `aws_iam_role` mapped to ecs instances.







### [v0.20.0](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.20.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/5/2020 | Modules affected: ecs-service | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.20.0">Release notes</a></small>
</p>



You can now bind different containers and ports to each target group created for the ECS service. This can be used to expose multiple containers or ports to existing ALBs or NLBs.





## terraform-aws-eks


### [v0.20.3](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.20.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/17/2020 | Modules affected: eks-k8s-external-dns, eks-alb-ingress-controller | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.20.3">Release notes</a></small>
</p>



`eks-k8s-external-dns` is now using a more up to date Helm chart to deploy `external-dns`. Additionally, you can now configure the logging format between `text` and `json`.

`eks-alb-ingress-controller` now supports selecting a different container version of the ingress controller. This can be used to deploy the v2 alpha image with shared ALB support.




### [v0.20.2](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.20.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/11/2020 | Modules affected: eks-cluster-control-plane | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.20.2">Release notes</a></small>
</p>



The control plane Python PEX binaries now support long path names on Windows. Previously the scripts were causing errors when attempting to unpack the dependent libraries.



### [v0.20.1](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.20.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/2/2020 | Modules affected: eks-cloudwatch-container-logs, eks-cluster-control-plane | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.20.1">Release notes</a></small>
</p>



The cluster upgrade script now supports updating to Kubernetes version 1.16. The `eks-cloudwatch-container-logs` is also now compatible with Kubernetes version 1.16.




## terraform-aws-lambda


### [v0.8.1](https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.8.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/1/2020 | Modules affected: lambda-edge, lambda | <a href="https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.8.1">Release notes</a></small>
</p>



The `lambda` and `lambda-edge` modules now support configuring the dead letter queue for subscribing to errors from the functions.





## terraform-aws-messaging


### [v0.3.4](https://github.com/gruntwork-io/terraform-aws-messaging/releases/tag/v0.3.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/22/2020 | Modules affected: sqs | <a href="https://github.com/gruntwork-io/terraform-aws-messaging/releases/tag/v0.3.4">Release notes</a></small>
</p>



The `sqs` module can now be turned off by setting `create_resources = true`. When this option is passed in, the module will disable all the resources, effectively simulating a conditional.





### [v0.3.3](https://github.com/gruntwork-io/terraform-aws-messaging/releases/tag/v0.3.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/3/2020 | Modules affected: sns | <a href="https://github.com/gruntwork-io/terraform-aws-messaging/releases/tag/v0.3.3">Release notes</a></small>
</p>



- The `sns` module will now allow display names to be up to 100 characters.





## terraform-aws-security


### [v0.32.3](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.32.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/16/2020 | Modules affected: account-baseline-security | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.32.3">Release notes</a></small>
</p>



As [outlined in the AWS docs](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/create-kms-key-policy-for-cloudtrail.html#create-kms-key-policy-for-cloudtrail-encrypt), the key policy in the security account should allow trail/* so that all trails in external accounts can use the key for encryption (but not decryption). Without this, running the account baseline in a sub account results in InsufficientEncryptionPolicyException.





### [v0.32.2](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.32.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/14/2020 | Modules affected: iam-users | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.32.2">Release notes</a></small>
</p>



- The `iam-users` module can now associate a public SSH key with each IAM user using the `ssh_public_key` parameter.




### [v0.32.1](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.32.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/2/2020 | Modules affected: account-baseline-app, account-baseline-security, kms-master-key-multi-region, cloudtrail | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.32.1">Release notes</a></small>
</p>



This minor release includes a number of documentation changes and renamed files.

- `vars.tf` has been renamed to `variables.tf` throughout the repository
- The suggestion to set the `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` has been dropped since most users now use `aws-auth` or `aws-vault`
- Added documentation on using 1Password with `aws-auth`






## terraform-aws-server


### [v0.8.3](https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.8.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/26/2020 | Modules affected: single-server | <a href="https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.8.3">Release notes</a></small>
</p>



- Added `iam_role_name` and `iam_role_arn` outputs to the `single-server` module.
- Updated the repo README to the new format.





## terraform-aws-vpc


### [v0.8.10](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.8.10)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/26/2020 | Modules affected: vpc-dns-forwarder-rules, vpc-dns-forwarder, vpc-flow-logs | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.8.10">Release notes</a></small>
</p>



This release adds the ability to create `tags` with the modules mentioned above.





### [v0.8.9](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.8.9)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/14/2020 | Modules affected: vpc-interface-endpoint | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.8.9">Release notes</a></small>
</p>



- The `vpc-interface-endpoint` module now supports endpoints for SSM, SSM Messages, and EC2 Messages.






<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "releases",
  "hash": "2cd766dd23e2403e2331b57680a64abb"
}
##DOCS-SOURCER-END -->

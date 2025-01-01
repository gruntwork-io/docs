
# Gruntwork release 2020-10

<p style={{marginTop: "-25px"}}><small><a href="/guides">Guides</a> / <a href="/guides/stay-up-to-date">Update Guides</a> / <a href="/guides/stay-up-to-date/releases">Releases</a> / 2020-10</small></p>

This page is lists all the updates to the [Gruntwork Infrastructure as Code
Library](https://gruntwork.io/infrastructure-as-code-library/) that were released in 2020-10. For instructions
on how to use these updates in your code, check out the [updating
documentation](/library/stay-up-to-date/updating).

Here are the repos that were updated:

- [boilerplate](#boilerplate)
- [infrastructure-live-multi-account-acme](#infrastructure-live-multi-account-acme)
- [infrastructure-modules-multi-account-acme](#infrastructure-modules-multi-account-acme)
- [terraform-aws-beanstalk](#terraform-aws-beanstalk)
- [terraform-aws-ci](#terraform-aws-ci)
- [terraform-aws-cis-service-catalog](#terraform-aws-cis-service-catalog)
- [terraform-aws-data-storage](#terraform-aws-data-storage)
- [terraform-aws-eks](#terraform-aws-eks)
- [terraform-aws-lambda](#terraform-aws-lambda)
- [terraform-aws-load-balancer](#terraform-aws-load-balancer)
- [terraform-aws-monitoring](#terraform-aws-monitoring)
- [terraform-aws-sam](#terraform-aws-sam)
- [terraform-aws-security](#terraform-aws-security)
- [terraform-aws-server](#terraform-aws-server)
- [terraform-aws-service-catalog](#terraform-aws-service-catalog)
- [terraform-aws-static-assets](#terraform-aws-static-assets)


## boilerplate


### [v0.3.2: Support rendering variable inputs to json](https://github.com/gruntwork-io/boilerplate/releases/tag/v0.3.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/30/2020 | <a href="https://github.com/gruntwork-io/boilerplate/releases/tag/v0.3.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  This release fixes an issue with using [`toJson` and related sprig functions](https://masterminds.github.io/sprig/) within Boilerplate templates. It&apos;s now possible to read variable inputs from Boilerplate YML files and render those to JSON.

See [related PR](https://github.com/gruntwork-io/boilerplate/pull/67).

</div>


### [v0.3.1: Add partials feature](https://github.com/gruntwork-io/boilerplate/releases/tag/v0.3.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/26/2020 | <a href="https://github.com/gruntwork-io/boilerplate/releases/tag/v0.3.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Adds the new [`partials` feature](https://github.com/gruntwork-io/boilerplate#partials) for better template reuse.

</div>



## infrastructure-live-multi-account-acme


### [v0.0.1-20201021](https://github.com/gruntwork-io/infrastructure-live-multi-account-acme/releases/tag/v0.0.1-20201021)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/21/2020 | <a href="https://github.com/gruntwork-io/infrastructure-live-multi-account-acme/releases/tag/v0.0.1-20201021">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Since this repo is solely used for examples/demonstrations, and NOT meant for direct production use, we simply publish all changes at v0.0.1, with a date marker for when it was published.

**NOTE: we switched the date format for releases to `v0.0.1-YYYYMMDD`. Previously, this was `v0.0.1-MMDDYYYY.`**


All the modules have been updated to be compatible with:

- Ubuntu 18.04
- Packer 1.6
- AWS Provider v3

In the process, the following module versions have been updated. Refer to the release notes of the corresponding repos for a description of the full changes.

Refer to the migration guide in [infrastructure-modules-multi-account-acme](https://github.com/gruntwork-io/infrastructure-modules-multi-account-acme/releases/tag/v0.0.1-20201021) for instructions on how to update existing reference architectures.

</div>



## infrastructure-modules-multi-account-acme


### [v0.0.1-20201021](https://github.com/gruntwork-io/infrastructure-modules-multi-account-acme/releases/tag/v0.0.1-20201021)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/21/2020 | <a href="https://github.com/gruntwork-io/infrastructure-modules-multi-account-acme/releases/tag/v0.0.1-20201021">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Since this repo is solely used for examples/demonstrations, and NOT meant for direct production use, we simply publish all changes at v0.0.1, with a date marker for when it was published.

**NOTE: we switched the date format for releases to `v0.0.1-YYYYMMDD`. Previously, this was `v0.0.1-MMDDYYYY.`**


All the modules have been updated to be compatible with:

- Ubuntu 18.04
- Packer 1.6
- AWS Provider v3

In the process, the following module versions have been updated. Refer to the release notes of the corresponding repos for a description of the full changes.


- `module-security`: `v0.22.0` =&gt; `v0.36.8` [Release notes](https://github.com/gruntwork-io/module-security/releases?after=v0.36.9)
- `module-aws-monitoring`: `v0.13.2` =&gt; `v0.22.2` [Release notes](https://github.com/gruntwork-io/terraform-aws-monitoring/releases?after=v0.23.0)
- `module-ci`: `v0.19.0` =&gt; `v0.28.1` [Release notes](https://github.com/gruntwork-io/module-ci/releases?after=v0.28.2)
- `module-vpc`: `v0.7.8` =&gt; `v0.9.4` [Release notes](https://github.com/gruntwork-io/terraform-aws-vpc/releases?after=v0.10.0)
- `module-load-balancer`: `v0.14.1` =&gt; `v0.20.4` [Release notes](https://github.com/gruntwork-io/module-load-balancer/releases?after=v0.21.0)
- `package-openvpn`: `v0.9.10` =&gt; `v0.11.1` [Release notes](https://github.com/gruntwork-io/package-openvpn/releases?after=v0.12.0)


- `module-cache`: `v0.6.1` =&gt; `v0.9.4` [Release notes](https://github.com/gruntwork-io/module-cache/releases?after=v0.10.0)
- `module-data-storage`: `v0.9.0` =&gt; `v0.15.0` [Release notes](https://github.com/gruntwork-io/module-data-storage/releases?after=v0.16.0)
- `package-zookeeper`: `v0.6.6` =&gt; `v0.6.9` [Release notes](https://github.com/gruntwork-io/package-zookeeper/releases?after=v0.7.0)
- `package-kafka`: `v0.6.0` =&gt; `v0.6.3` [Release notes](https://github.com/gruntwork-io/package-kafka/releases?after=v0.7.0)
- `package-elk`: `v0.4.0` =&gt; `v0.6.0` [Release notes](https://github.com/gruntwork-io/package-elk/releases?after=v0.7.0)
- `package-messaging`: `v0.3.0` =&gt; `v0.3.4` [Release notes](https://github.com/gruntwork-io/package-messaging/releases?after=v0.4.0)


- `package-lambda`: `v0.6.0` =&gt; `v0.8.1` [Release notes](https://github.com/gruntwork-io/package-lambda/releases?after=v0.9.0)
- `module-ecs`: `v0.16.0` =&gt; `v0.22.0` [Release notes](https://github.com/gruntwork-io/module-ecs/releases?after=v0.23.0)
- `terraform-aws-eks`: `v0.20.1` =&gt; `v0.22.1` [Release notes](https://github.com/gruntwork-io/terraform-aws-eks/releases?after=v0.23.0)
- `module-asg`: `v0.8.0` =&gt; `v0.10.0` [Release notes](https://github.com/gruntwork-io/module-asg/releases?after=v0.11.0)



You can follow the following guide to update each component to the newer versions offered in this refresh:

- **cloudtrail** : Update the module to the new version (`v0.36.8`), apply the state transitions, and change the KMS key configuration so that the logs are encrypted using a key in the `security` account ([instructions](https://github.com/gruntwork-io/infrastructure-modules-multi-account-acme/blob/v0.0.1-20201021/security/cloudtrail/migration_guides/upgrading_from_0_22_to_0_36.md)).

- **kms-master-key** : Update the module to the new version (`v0.36.8`) and apply the state transitions ([instructions](https://github.com/gruntwork-io/infrastructure-modules-multi-account-acme/blob/v0.0.1-20201021/security/kms-master-key/migration_guides/upgrading_from_0_22_to_0_36.md)).

- **iam-groups** : Update the module to the new version (`v0.36.8`) and apply the state transitions ([instructions](https://github.com/gruntwork-io/infrastructure-modules-multi-account-acme/blob/v0.0.1-20201021/security/iam-groups/migration_guides/upgrading_from_0_22_to_0_36.md))

- **iam-cross-account** : Update to the module to the new version (`v0.36.8`). This update does not require any state transitions if you apply the necessary code changes. Refer to [this commit](https://github.com/gruntwork-io/infrastructure-modules-multi-account-acme/commit/33cb0846311d336b61e896fed9cefe5fee9435eb) for a reference of the requisite updates.

- **iam-user-password-policy** : Update the module to the new version (`v0.36.8`). This update does not require any state transitions if you apply the necessary code changes. Refer to [this commit](https://github.com/gruntwork-io/infrastructure-modules-multi-account-acme/commit/34ba40b204fe6b245304a0dec298dd4e852072aa) for a reference of the requisite updates.

- **openvpn-server** : Update the module to the new version (`v0.11.1`) and switch the AMI to use Ubuntu 18.04. ([instructions](https://github.com/gruntwork-io/infrastructure-modules-multi-account-acme/blob/v0.0.1-20201021/mgmt/openvpn-server/migration_guides/upgrading_from_0_9_to_0_11.md))

- **jenkins** : Update the module to the new version (`v0.28.1`) and switch the AMI to use Ubuntu 18.04. ([instructions](https://github.com/gruntwork-io/infrastructure-modules-multi-account-acme/blob/v0.0.1-20201021/mgmt/jenkins/migration_guides/upgrading_from_0_19_to_0_28.md))

- **vpc-app and vpc-mgmt** : Update to the new version (`v0.9.4`). This update does not require any state transitions if you apply the necessary code changes. Refer to [this commit](https://github.com/gruntwork-io/infrastructure-modules-multi-account-acme/commit/275e815045fda7975a49b5a4b04b8bd83775d9e7) for a reference of the requisite updates.

- **alb** : Update to the new version (`v0.20.4`). This update requires a state change. See [the migration guide in the underlying module](https://github.com/gruntwork-io/module-load-balancer/releases/tag/v0.16.0) for instructions on how to update the state. Refer to [this commit](https://github.com/gruntwork-io/infrastructure-modules-multi-account-acme/commit/dbbf1ad2cd770e77c69ab125a0faac4339384006) for a reference of the requisite updates to the code.

- **sns-topics** : Update to the new version (`v0.3.4`). This update is backwards compatible.

- **cloudwatch-dashboard** : Update to the new version (`v0.22.2`). This update does not require any state transitions if you apply the necessary code changes. Refer to [this commit](https://github.com/gruntwork-io/infrastructure-modules-multi-account-acme/commit/6422e741a95093599dc6d9194a7efeb57a257392) for a reference of the requisite updates.

- **lambda** : Update to the new version (`v0.8.1`) and apply the state transitions. ([instructions](https://github.com/gruntwork-io/infrastructure-modules-multi-account-acme/blob/v0.0.1-20201021/lambda/migration_guides/upgrading_from_0_6_to_0_8.md)).

- **rds** : Update to the new version (`v0.15.0`) and apply the state transitions. ([instructions](https://github.com/gruntwork-io/infrastructure-modules-multi-account-acme/blob/v0.0.1-20201021/data-stores/rds/migration_guides/upgrading_from_0_9_to_0_15.md))

- **redis** : Update to the new version (`v0.9.4`) and apply the state transitions. ([instructions](https://github.com/gruntwork-io/infrastructure-modules-multi-account-acme/blob/v0.0.1-20201021/data-stores/redis/migration_guides/upgrading_from_0_6_to_0_9.md))

- **zookeeper and kafka** : Update to the respective new versions and switch the AMIs to use Ubuntu 18.04. Note that the module will automatically perform a rolling update for both services when you `apply` with the new AMI. Refer to [this commit](https://github.com/gruntwork-io/infrastructure-modules-multi-account-acme/commit/c5bafae83fe6ebfc2cf9b91df8a31ffa6d5925d1) for a reference of the requisite updates. **Make sure to update zookeeper before updating kafka**.

- **elk-single-cluster and elk-multi-cluster** : Update to the new version (`v0.6.0`) and switch the AMIs to use Ubuntu 18.04. Note that the module will automatically perform a rolling update for all the services. **Be aware that the default ELK versions within each module have changed**: if it is not desirable to update Elasticsearch versions, make sure to specify the specific ES version in the packer templates. Refer to [this commit](https://github.com/gruntwork-io/infrastructure-modules-multi-account-acme/commit/c1abd43a4dfe2835da397fe07cd3d6e97381cc13) for a reference of the requisite updates.

- **ecs-cluster** : Update to the new version (`v0.22.0`) and switch the AMI to use Ubuntu 18.04. ([instructions](https://github.com/gruntwork-io/infrastructure-modules-multi-account-acme/blob/v0.0.1-20201021/services/ecs-cluster/migration_guides/upgrading_from_0_16_to_0_22.md))

- **ecs-service-with-alb** : Update to the new version (`v0.22.0`) and apply the state transitions. ([instructions](https://github.com/gruntwork-io/infrastructure-modules-multi-account-acme/blob/v0.0.1-20201021/services/ecs-service-with-alb/migration_guides/upgrading_from_0_16_to_0_22.md))

- **EKS modules** : Update to the new version (`v0.22.1`). This update does not require any state transitions if you apply the necessary code changes. Refer to [this commit](https://github.com/gruntwork-io/infrastructure-modules-multi-account-acme/commit/43394f96d8bac9840f3f7476e7adec7359bd3a82) for a reference of the requisite updates.

- **static-website** : Update to the new version (`v0.6.5`). This update does not require any state transitions if you apply the necessary code changes. Refer to [this commit](https://github.com/gruntwork-io/infrastructure-modules-multi-account-acme/commit/6343fef96ba271e602f11be736ab1b1ed352dda1) for a reference of the requisite updates.

- **asg-service** : Update to the new version (`v0.10.0`). This update does not require any state transitions if you apply the necessary code changes. Refer to [this commit](https://github.com/gruntwork-io/infrastructure-modules-multi-account-acme/commit/30e6625392879a8d2c6f120c0205ef2badc01549) for a reference of the requisite updates.


</div>



## terraform-aws-beanstalk


### [v0.1.1](https://github.com/gruntwork-io/terraform-aws-beanstalk/releases/tag/v0.1.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/12/2020 | Modules affected: elasticbeanstalk-environment | <a href="https://github.com/gruntwork-io/terraform-aws-beanstalk/releases/tag/v0.1.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- You can now specify the load balancer type to use in the `elasticbeanstalk-environment` module by using the new `load_balancer_type` input variable.


</div>



## terraform-aws-ci


### [v0.29.1](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.29.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/28/2020 | Modules affected: ecs-deploy-runner | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.29.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

You can now configure the ECS deploy runner with repository credentials for pulling down the images using the new `repository_credentials_secrets_manager_arn` input var.



</div>


### [v0.29.0](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.29.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/2/2020 | Modules affected: (none) | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.29.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- **Terraform 0.13 upgrade**: We have verified that this repo is compatible with Terraform `0.13.x`! 
    - From this release onward, we will only be running tests with Terraform `0.13.x` against this repo, so we recommend updating to `0.13.x` soon! 
    - To give you more time to upgrade, for the time being, all modules will still support Terraform 0.12.26 and above, as that version has several features in it (`required_providers` with `source` URLs) that make it more forwards compatible with `0.13.x`. 
    - Once all Gruntwork repos have been upgrade to work with `0.13.x`, we will publish a migration guide with a version compatibility table and announce it all via the Gruntwork Newsletter.





</div>



## terraform-aws-cis-service-catalog


### [v0.9.0](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.9.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/27/2020 | Modules affected: aws-securityhub | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.9.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- **Terraform 0.13 upgrade**: We have verified that this repo is compatible with Terraform `0.13.x`! 
    - From this release onward, we will only be running tests with Terraform `0.13.x` against this repo, so we recommend updating to `0.13.x` soon! 
    - To give you more time to upgrade, for the time being, all modules will still support Terraform 0.12.26 and above, as that version has several features in it (`required_providers` with `source` URLs) that make it more forwards compatible with `0.13.x`. 
    - Once all Gruntwork repos have been upgrade to work with `0.13.x`, we will publish a migration guide with a version compatibility table and announce it all via the Gruntwork Newsletter.
- The `aws-securityhub` module will no longer automatically clean up associations with master accounts when you run `destroy`. See the migration guide below for upgrade instructions.



</div>


### [v0.8.1](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.8.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/22/2020 | Modules affected: custom-iam-entity | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.8.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

Updates the `custom-iam-entity` module to use the latest version in `module-security` which improves the MFA experience for custom IAM roles. See [the release notes for module-security v0.39.1](https://github.com/gruntwork-io/module-security/releases/tag/v0.39.1).





</div>


### [v0.8.0](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.8.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/20/2020 | Modules affected: aws-securityhub | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.8.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Switch from using a Python script to associate new member accounts in AWS Security Hub to using the new `aws_securityhub_member` resource. See the migration guide below for upgrade instructions.



</div>


### [v0.7.1](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.7.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/15/2020 | Modules affected: cloudtrail | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.7.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

Expose ability to specify an existing KMS key for encrypting cloudtrail logs.



</div>



## terraform-aws-data-storage


### [v0.16.2](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.16.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/16/2020 | Modules affected: aurora | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.16.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- You can now enable the HTTP endpoint for the Data API on Aurora Serverless using the new &apos;enable_http_endpoint&apos; input variable.



</div>



## terraform-aws-eks


### [v0.27.1](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.27.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/30/2020 | Modules affected: eks-cluster-workers | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.27.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

Gracefully handle `use_existing_cluster_config = false` and `use_cluster_security_group = true`.



</div>


### [v0.27.0](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.27.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/28/2020 | Modules affected: eks-cluster-control-plane, eks-cloudwatch-container-logs, eks-container-logs, eks-aws-auth-merger | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.27.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- The `fluentd` based log shipping module (`eks-cloudwatch-container-logs`) has been deprecated and replaced by a new module based on `fluent-bit`. This supports additional targets such as Firehose and Kinesis in addition to Cloudwatch, while also being more efficient in terms of underlying resource usage. Refer to the migration guide for information on how to update.

- The default Kubernetes version used by the module has been updated to 1.18. Note that you will `kubergrunt` [v0.6.3](https://github.com/gruntwork-io/kubergrunt/releases/tag/v0.6.3) or newer if you wish to upgrade your existing EKS clusters to Kubernetes version 1.18.


</div>


### [v0.26.1](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.26.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/27/2020 | Modules affected: eks-k8s-external-dns | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.26.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- You can now configure the `triggerLoopOnEvent` setting on the `external-dns` service.
- Update the documentation surrounding retrieving authentication tokens for EKS.



</div>


### [v0.26.0](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.26.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/20/2020 | Modules affected: eks-cluster-control-plane | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.26.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

The automatic upgrade cluster feature now uses `kubergrunt eks sync-core-components` instead of an embedded script. This allows you to independently upgrade to newer EKS cluster versions as they are released without updating the module version.

If you were relying on the automatic update script to sync the core components prior to this release, you will need to ensure that you have `kubergrunt` installed (minimum version [v0.6.2](https://github.com/gruntwork-io/kubergrunt/releases/tag/v0.6.2)) to continue using it.




</div>


### [v0.25.0](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.25.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/2/2020 | Modules affected: eks-k8s-cluster-autoscaler | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.25.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

Switch to using the new location for the `cluster-autoscaler` helm chart so that the module continues to work after the `stable` and `incubator` repos are decommissioned in November.

**NOTE**: This will redeploy the `cluster-autoscaler` pods, but all the data and variables are backwards compatible. We have marked this release as backwards incompatible due to the resulting downtime in the scaling functionality, but effectively, there will be no change to your cluster by redeploying the component (no downtime to your apps or EKS cluster).



</div>


### [v0.24.0](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.24.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/1/2020 | Modules affected: eks-cluster-control-plane, eks-cluster-workers | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.24.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

The following variables and outputs have been renamed:

**eks-cluster-control-plane**

- [variable] `vpc_master_subnet_ids` =&gt; `vpc_control_plane_subnet_ids`
- [output] `eks_master_security_group_id` =&gt; `eks_control_plane_security_group_id`
- [output] `eks_master_iam_role_arn` =&gt; `eks_control_plane_iam_role_arn`
- [output] `eks_master_iam_role_name` =&gt; `eks_control_plane_iam_role_name`

**eks-cluster-workers**

- [variable] `eks_master_security_group_id` =&gt; `eks_control_plane_security_group_id`

All other functionality is preserved. To update to this version, replace usage of the old variable and output names to the new ones.



</div>



## terraform-aws-lambda


### [v0.9.2](https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.9.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/15/2020 | Modules affected: lambda | <a href="https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.9.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

This release adds the option to create an outbound &quot;allow all&quot; rule in the Lambda security group that will allow it to communicate with external services. To enable this, set `should_create_outbound_rule=true` when calling the `lambda` module. Defaults to false.






</div>



## terraform-aws-load-balancer


### [v0.21.0](https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.21.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/15/2020 | Modules affected: acm-tls-certificate, alb, lb-listener-rules | <a href="https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.21.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

-  **Terraform 0.13 upgrade**: We have verified that this repo is compatible with Terraform `0.13.x`! 
    - From this release onward, we will only be running tests with Terraform `0.13.x` against this repo, so we recommend updating to `0.13.x` soon! 
    - To give you more time to upgrade, for the time being, all modules will still support Terraform 0.12.26 and above, as that version has several features in it (`required_providers` with `source` URLs) that make it more forwards compatible with `0.13.x`. 
    - Once all Gruntwork repos have been upgrade to work with `0.13.x`, we will publish a migration guide with a version compatibility table and announce it all via the Gruntwork Newsletter. 





</div>



## terraform-aws-monitoring


### [v0.23.2](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.23.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/27/2020 | Modules affected: alarms | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.23.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fix a bug in the `alb-target-group-alarms` module, switching the module to use `&quot;Seconds&quot;` instead of `&quot;Count&quot;` as the proper unit for the `TargetResponseTime` alarm. 



</div>



## terraform-aws-sam


### [v0.3.1](https://github.com/gruntwork-io/terraform-aws-sam/releases/tag/v0.3.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/7/2020 | Modules affected: gruntsam | <a href="https://github.com/gruntwork-io/terraform-aws-sam/releases/tag/v0.3.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Added the `create_before_destroy = true` lifecycle setting to the `aws_api_gateway_deployment` resource to work around intermittent &quot;BadRequestException: Active stages pointing to this deployment must be moved or deleted&quot; errors.



</div>


### [v0.3.0](https://github.com/gruntwork-io/terraform-aws-sam/releases/tag/v0.3.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/2/2020 | Modules affected: api-gateway-account-settings, gruntsam | <a href="https://github.com/gruntwork-io/terraform-aws-sam/releases/tag/v0.3.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- **Terraform 0.13 upgrade**: We have verified that this repo is compatible with Terraform `0.13.x`! 
    - From this release onward, we will only be running tests with Terraform `0.13.x` against this repo, so we recommend updating to `0.13.x` soon! 
    - To give you more time to upgrade, for the time being, all modules will still support Terraform 0.12.26 and above, as that version has several features in it (`required_providers` with `source` URLs) that make it more forwards compatible with `0.13.x`. 
    - Once all Gruntwork repos have been upgrade to work with `0.13.x`, we will publish a migration guide with a version compatibility table and announce it all via the Gruntwork Newsletter.





</div>



## terraform-aws-security


### [v0.40.1](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.40.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/29/2020 | Modules affected: private-s3-bucket | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.40.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- In `private-s3-bucket`, the server side encryption algorithm is now configurable through the newly exposed `sse_algorithm` variable



</div>


### [v0.40.0](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.40.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/26/2020 | Modules affected: cloudtrail-bucket, cloudtrail, account-baseline-app, account-baseline-root | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.40.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
__This release contains backwards incompatible changes. Make sure to follow the instructions in the migration guide below!__

- The `cloudtrail-bucket` module has been refactored to use the `private-s3-bucket` module under the hood to configure the cloudtrail S3 bucket.
- The `cloudtrail-bucket` module will now configure the bucket to default to encrypting objects with the newly created KMS key, or the provided KMS key if it already exists.


</div>


### [v0.39.2](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.39.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/22/2020 | Modules affected: private-s3-bucket | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.39.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fix invocations of `for_each` to default to empty list instead of `null`. This bug in the `private-s3-bucket` module that made it impossible to configure bucket replication.


</div>


### [v0.39.1](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.39.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/21/2020 | Modules affected: private-s3-bucket, custom-iam-entity | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.39.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- In `private-s3-bucket`, the bucket ACL is now configurable through the newly exposed `acl` variable.
- In `custom-iam-entity`, previously, IAM roles and groups were treated the same with regards to MFA. With this release, for roles, we no longer attach the `require_mfa_policy` from the `iam-policies` module. Instead, we apply MFA to the trust policy. This change allows for sessions longer than 1 hour in duration (which are otherwise imposed due to role chaining limitations).





</div>


### [v0.39.0](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.39.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/14/2020 | Modules affected: account-baseline-root | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.39.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fix a bug where `account-baseline-root` did not work correctly if none of the accounts in `child_accounts` had `is_logs_account` set to `true`. 


</div>



## terraform-aws-server


### [v0.9.1](https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.9.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/19/2020 | Modules affected: single-server | <a href="https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.9.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- You can now specify the principals that will be allowed to assume the IAM role created by the `single-server` module. This can be useful, for example, to override the default from `[&quot;ec2.amazonaws.com&quot;]` to `[&quot;ec2.amazonaws.com.cn&quot;]` when using the AWS China region.



</div>



## terraform-aws-service-catalog


### [v0.5.2](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.5.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/27/2020 | Modules affected: base, data-stores, landingzone, mgmt | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.5.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Bump all underlying module version numbers and require Terraform `0.12.26` _or above_, which means you can now use the Service Catalog with Terraform `0.13.x` as well! The only exception are the Kubernetes / EKS services, as the underlying modules do not support Terraform `0.13.x` yet; we are working on that now and will do a new release when that&apos;s ready.






</div>


### [v0.5.1](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.5.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/23/2020 | Modules affected: data-stores/aurora | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.5.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
This release exposes the `cluster_resource_id` attribute as an output from the aurora module.





</div>


### [v0.5.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.5.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/22/2020 | Modules affected: networking/route53, networking/alb, networking/vpc, services/eks-cluster | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.5.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
This release adds the following features to the catalog:

- The route53 module now outputs the generated TLS cert ARNs
- The alb module now allows you to pass an existing S3 bucket for ALB access logs. This is useful for sending ALB logs to a central log account
- For EKS, you can now provide a list of CIDR ranges or security groups that are permitted to access the private EKS API endpoint.

We&apos;ve also caught up to the latest release of the [module-security](https://github.com/gruntwork-io/module-security/) and [terraform-aws-eks](https://github.com/gruntwork-io/terraform-aws-eks) repositories.


**Migration guide for eks-cluster**
This release bumps the `terraform-aws-eks` module up to the latest version, including some backwards incompatible changes. Please review the release notes in the following order:

- [v0.24.0](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.24.0) - renames several variables in `eks-cluster-control-plan` and `eks-cluster-workers`
- [v0.25.0](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.25.0) - moves the location of the `eks-cluster-autoscaler` helm chart with a brief downtime in autoscaling activity (no other changes needed)
- [v0.26.0](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.26.0) - changes the behavior of the automatic cluster upgrade functionality. Now requires `kubergrunt` &gt;= `v0.6.2`.




</div>


### [v0.4.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.4.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/20/2020 | Modules affected: data-stores/rds, services/package-static-assets, mgmt/bastion-host, base/ec2-baseline | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.4.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - Incorporates latest releases from across the library
- For `account-baseline-root`: Fixes a bug where `account-baseline-root` did not work correctly if none of the accounts in `child_accounts` had `is_logs_account` set to `true`. 


</div>


### [v0.3.4](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.3.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/16/2020 | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.3.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
This release updates the following modules to the latest releases of their respective downstream modules:

- `networking/vpc`
- `networking/vpc-mgmt`
- `services/eks-cluster`
- `services/eks-core-services`
- `services/k8s-service`
- `mgmt/ecs-deploy-runner`
- `mgmt/jenkins`
- `mgmt/openvpn-server`
- `landingzone/account-baseline-*`
- `base/ec2-baseline`
- `data-stores/rds`






</div>



## terraform-aws-static-assets


### [v0.7.0](https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.7.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/16/2020 | Modules affected: (none) | <a href="https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.7.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- **Terraform 0.13 upgrade**: We have verified that this repo is compatible with Terraform `0.13.x`! 
    - From this release onward, we will only be running tests with Terraform `0.13.x` against this repo, so we recommend updating to `0.13.x` soon! 
    - To give you more time to upgrade, for the time being, all modules will still support Terraform 0.12.26 and above, as that version has several features in it (`required_providers` with `source` URLs) that make it more forwards compatible with `0.13.x`. 
    - Once all Gruntwork repos have been upgrade to work with `0.13.x`, we will publish a migration guide with a version compatibility table and announce it all via the Gruntwork Newsletter.





</div>

<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "releases",
  "hash": "fa989da779cb98e94ebe45fb83c2452c"
}
##DOCS-SOURCER-END -->

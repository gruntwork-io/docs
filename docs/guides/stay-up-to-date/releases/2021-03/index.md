
# Gruntwork release 2021-03

<p style={{marginTop: "-25px"}}><small><a href="/guides">Guides</a> / <a href="/guides/stay-up-to-date">Update Guides</a> / <a href="/guides/stay-up-to-date/releases">Releases</a> / 2021-03</small></p>

This page is lists all the updates to the [Gruntwork Infrastructure as Code
Library](https://gruntwork.io/infrastructure-as-code-library/) that were released in 2021-03. For instructions
on how to use these updates in your code, check out the [updating
documentation](/library/stay-up-to-date/updating).

Here are the repos that were updated:

- [gruntwork](#gruntwork)
- [repo-copier](#repo-copier)
- [terraform-aws-architecture-catalog](#terraform-aws-architecture-catalog)
- [terraform-aws-asg](#terraform-aws-asg)
- [terraform-aws-cache](#terraform-aws-cache)
- [terraform-aws-ci](#terraform-aws-ci)
- [terraform-aws-cis-service-catalog](#terraform-aws-cis-service-catalog)
- [terraform-aws-data-storage](#terraform-aws-data-storage)
- [terraform-aws-ecs](#terraform-aws-ecs)
- [terraform-aws-eks](#terraform-aws-eks)
- [terraform-aws-lambda](#terraform-aws-lambda)
- [terraform-aws-load-balancer](#terraform-aws-load-balancer)
- [terraform-aws-messaging](#terraform-aws-messaging)
- [terraform-aws-monitoring](#terraform-aws-monitoring)
- [terraform-aws-security](#terraform-aws-security)
- [terraform-aws-server](#terraform-aws-server)
- [terraform-aws-service-catalog](#terraform-aws-service-catalog)
- [terraform-aws-static-assets](#terraform-aws-static-assets)
- [terraform-aws-vpc](#terraform-aws-vpc)


## gruntwork


### [v0.2.0](https://github.com/gruntwork-io/gruntwork/releases/tag/v0.2.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/12/2021 | <a href="https://github.com/gruntwork-io/gruntwork/releases/tag/v0.2.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  This is a major update to the CLI that is oriented around the functionality of the Landing Zone Reference Architecture. Major changes include:

- Drop support for GCP
- Drop support for creating TLS certs
- Drop support for creating GitHub repos (this is now handled in the gruntwork-clients org)
- Adds support for creating secrets for the VCS tokens

Also undergoes a sort of rebranding of a &quot;generic gruntwork CLI tool&quot; to being specific to the ref arch. The README is updated with all the details.

</div>



## repo-copier


### [v0.0.16](https://github.com/gruntwork-io/repo-copier/releases/tag/v0.0.16)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/29/2021 | <a href="https://github.com/gruntwork-io/repo-copier/releases/tag/v0.0.16">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/repo-copier/pull/89: Added a new `--max-stack-bytes` parameter to configure the maximum amount of memory that can be used by a single goroutine stack, and set the default to 2GB (instead of 1GB). The Git library we use under the hood can use a lot of memory for very large repos, so this can be used to increase the max memory available to avoid stack overflow / OOM errors.

</div>


### [v0.0.15](https://github.com/gruntwork-io/repo-copier/releases/tag/v0.0.15)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/25/2021 | <a href="https://github.com/gruntwork-io/repo-copier/releases/tag/v0.0.15">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/repo-copier/pull/88: Fix a bug where the `--disable-pull-request-protection` and `--disable-fast-forward-protection` arguments didn&apos;t work properly if BitBucket was configured with a custom context path.

</div>


### [v0.0.14](https://github.com/gruntwork-io/repo-copier/releases/tag/v0.0.14)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/23/2021 | <a href="https://github.com/gruntwork-io/repo-copier/releases/tag/v0.0.14">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/repo-copier/pull/87: You can now optionally have `repo-copier` disable branch protection and rewrite protection by passing the `--disable-pull-request-protection` and/or `--disable-fast-forward-protection` flags, respectively.

</div>


### [v0.0.13](https://github.com/gruntwork-io/repo-copier/releases/tag/v0.0.13)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/18/2021 | <a href="https://github.com/gruntwork-io/repo-copier/releases/tag/v0.0.13">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/repo-copier/pull/76: 

* `repo-copier` will now convert pull requests and issues into Markdown files that get copied to the destination.
* Added release date for each release in `CHANGELOG.md`.
* Added ability to copy branches.

</div>


### [v0.0.12](https://github.com/gruntwork-io/repo-copier/releases/tag/v0.0.12)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/9/2021 | <a href="https://github.com/gruntwork-io/repo-copier/releases/tag/v0.0.12">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/repo-copier/pull/82: Explicitly set the name and email when creating tags to avoid confusing errors if those values are not defined in `.gitconfig`.

</div>



## terraform-aws-architecture-catalog


### [v0.0.3](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v0.0.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/1/2021 | <a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v0.0.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Adds command for setting up TLS for the sample app
- Initial implementation of the deployer command
- Unit test for aws-vault based authentication
- Hook up generate ec2 key pairs to state machine
- Add memcached
- Add command to create db secrets
- Make genedrsecrets operation idempotent
- Make secrets manager entry get a unique name
- VCS secrets should be in shared account, not security
- Add deploy logs baseline to the statemachine
- Fix typo in comment
- Add placeholder.tf for TFC/TFE/PMR
- Shared account baseline
- Fixes for generating db config
- Generate vault config in a loop
- Update .gitignore
- Use new key ID when rekeying
- Add missing stages to README
- Fix rekeysecrets test issue
- Deploy shared secrets policy and Build EDR containers stages
- Update placeholder docs to make more sense in this repo
- Use same secret key when generating vars as secret gen
- Add DeployEDR stage
- Add helper command to trigger aws-vault exec and fix bug with MFA prompt
- Fix unhandled error in edrsecrets
- Add step to query for and upload VCS/GitHub PAT
- Trim any ALB names over 32 characters
- Add pipeline stages for generating db and sample app secrets
- Assert the required binaries exist before running deploy
- Make sure to set RDSEngineVersion
- Handle terraform version strings &lt;0.13
- Find and call build scripts
- Improve comment on aws.GetAuthEnvVars
- Support custom default branches for ECS deploy runner
- Reverse the github pat logic
- Fix bug where we invoke the root folder template, not blueprint
- Update dbconfig.go to not include `@` symbol in pw
- Split DeployEDR stage to DeployAllBaseline and DeployEDR
- DeployAll stage
- Refarch-deployer sanity checker: account access and route53 domains
- Create function for getting all accounts from a form
- Add IP allow list to refarch-deployer
- Backend domain name depends on the app server cluster type
- Fix comment to be consistent with what is checking
- Add ASG service blueprint
- Add better error messages for concurrent deploy functions
- Show struct fields when debug printing parsed form
- Post-deploy checks
- Pre-flight check vault config
- Add EKS templates and blueprint
- Fix EKS testing
- Bump service catalog version and take advantage of scratch paths
- Preflight checks: duplicate aws certs
- Adds Jenkins blueprint
- Small improvement to deployment speed
- Disjoint App VPC CIDR
- Fix wrong var name in eks-cluster module
- Bump service catalog version
- Fix EKS and Aurora
- Implement fixes for Jenkinsfile
- Fix sample app linkage to memcached



</div>



## terraform-aws-asg


### [v0.12.1](https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.12.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/8/2021 | Modules affected: server-group | <a href="https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.12.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Replace usage of `null_data_source` with `locals` to resolve deprecation warning.




</div>


### [v0.12.0](https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.12.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/5/2021 | Modules affected: asg-rolling-deploy, server-group | <a href="https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.12.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- **Terraform 0.14 upgrade**: We have verified that this repo is compatible with Terraform `0.14.x`! 
    - From this release onward, we will only be running tests with Terraform `0.14.x` against this repo, so we recommend updating to `0.14.x` soon! 
    - To give you more time to upgrade, for the time being, all modules will still support Terraform `0.12.26` and above, as that version has several features in it (`required_providers` with `source` URLs) that make it more forwards compatible with `0.14.x`. 
    - Once all Gruntwork repos have been upgrade to work with `0.14.x`, we will publish a migration guide with a version compatibility table and announce it all via the Gruntwork Newsletter.






</div>



## terraform-aws-cache


### [v0.13.0](https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v0.13.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/18/2021 | Modules affected: memcached, redis | <a href="https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v0.13.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

**Terraform 0.14 upgrade:** We have verified that this repo is compatible with Terraform 0.14.x!

From this release onward, this repo will be running tests with Terraform 0.14.x, so **we recommend updating to 0.14.x soon**!
**All modules still support Terraform 0.12.26** and above (by using features like `required_providers` and `source` URLs).

Once all Gruntwork repositories have been updated to support Terraform 0.14.x, a newsletter announcement will be published via the Gruntwork Newsletter &amp; a migration guide will be published on our website.





</div>



## terraform-aws-ci


### [v0.31.1](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.31.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/30/2021 | Modules affected: ecs-deploy-runner, infrastructure-deployer | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.31.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fixes a bug in the `ecs-deploy-runner` fargate runtime where it did not support running scripts with no args.




</div>


### [v0.31.0](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.31.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/12/2021 | Modules affected: gruntwork-module-circleci-helpers | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.31.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- `build-go-binaries` now supports building arbitrary os and architecture combinations with the new `--osarch` flag.
- `build-go-binaries` now defaults to building the following binaries: `darwin/amd64`, `darwin/arm64`, `linux/amd64`, `linux/386`, `linux/arm64`, `windows/amd64`, `windows/386`. Note that this release drops building `darwin/386` binaries. If you need those binaries built, you must explicitly pass it in to `--osarch`.





</div>


### [v0.30.0](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.30.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/8/2021 | Modules affected: ecs-deploy-runner, ecs-deploy-runner-standard-configuration, infrastructure-deployer | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.30.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- You can now build docker images against a specific commit SHA in the ECS Deploy Runner using the `--sha` argument to `build-docker-image` script.
- Prior to this release all scripts in ECS Deploy Runner had automatically allowed the `--help` option. Starting this release, this behavior has been corrected. If you wish to continue to allow `--help` to your scripts, add it to `allowed_options` in the script configuration.



</div>



## terraform-aws-cis-service-catalog


### [v0.13.0](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.13.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/29/2021 | Modules affected: aws-config-multi-region, networking/vpc, networking/vpc-mgmt | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.13.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- Flow logs are now always created in modules `vpc` and `vpc-mgmt`. To achieve this, these two modules no longer expose the variable `create_flow_logs`. 

- Exposed more necessary properties and removed variables allowing configuration for the CIS version of `aws-config-multi-region` module:
   - added `config_name`, `should_create_sns_topic`, `sns_topic_name`, `kms_key_arn` to `main.tf`
   - removed `enable_root_account_mfa_rule` from `variables.tf`



</div>


### [v0.12.0](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.12.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/25/2021 | Modules affected: networking/vpc, networking/vpc-mgmt, networking/vpc-app-network-acls, networking/vpc-mgmt-network-acls | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.12.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

This release adds new modules for VPC and Management VPC, and integrates them with existing Network ACL modules, thus creating AWS CIS-compliant VPC modules. 

Note that this release moves the `vpc-app-network-acls` and `vpc-mgmt-network-acls` modules under the `networking` folder. When updating to this version, make sure to update the module path as well.





</div>


### [v0.11.4](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.11.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/19/2021 | Modules affected: cloudwatch-logs-metric-filters, cloudtrail | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.11.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

Cloudtrail SNS topics can now be encrypted via the new `benchmark_alarm_sns_topic_kms_master_key_id` variable.


</div>


### [v0.11.2](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.11.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/11/2021 | Modules affected: aws-config-multi-region | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.11.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- New module: `aws-config-multi-region`. This module has the IAM password policy checks for CIS.


</div>


### [v0.11.1](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.11.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/11/2021 | Modules affected: iam-password-policy | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.11.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Update IAM password policy to CIS v1.3. Some password restrictions no longer apply. 



</div>


### [v0.11.0](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.11.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/9/2021 | Modules affected: aws-securityhub, cleanup-expired-certs, cloudtrail, cloudwatch-logs-metric-filters | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.11.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
This release updates versions of several underlying modules, including several backwards incompatible upgrades. Please see the  Migration guide section for manual steps necessary to perform the upgrade.

Other changes in this release:
- Documentation Improvements
- Internal test fixes
- `required_version` and `required_providers` added to all terraform modules
- Added script to disassociate from Security Hub
- Added Renovate bot 



</div>



## terraform-aws-data-storage


### [v0.18.1](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.18.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/23/2021 | Modules affected: redshift | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.18.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Set `ignore_changes` on the `snapshot_identifier` param in the `redshift` module so that you can properly restore Redshift clusters from snapshots.



</div>


### [v0.18.0](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.18.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/18/2021 | Modules affected: aurora, efs, lambda-cleanup-snapshots, lambda-copy-shared-snapshot | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.18.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
**Terraform 0.14 upgrade:** We have verified that this repo is compatible with Terraform 0.14.x!

From this release onward, this repo will be running tests with Terraform 0.14.x, so **we recommend updating to 0.14.x soon**!

**All modules still support Terraform 0.12.26** and above (by using features like `required_providers` and `source` URLs)

Once all Gruntwork repositories have been updated to support Terraform 0.14.x, a newsletter announcement will be published via the Gruntwork Newsletter &amp; a migration guide will be published on our website





</div>


### [v0.17.4](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.17.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/2/2021 | Modules affected: redshift | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.17.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

Allow restoring snapshots from different AWS accounts using the news `snapshot_cluster_identifier` and `snapshot_owner_account` variables.



</div>



## terraform-aws-ecs


### [v0.26.1](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.26.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/30/2021 | Modules affected: ecs-service | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.26.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fix a bug where the `aws_ecs_task_definition` for the canary task was not setting the `execution_role_arn` param.



</div>


### [v0.26.0](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.26.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/30/2021 | Modules affected: ecs-daemon-service, ecs-service | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.26.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fix the `volumes` param in the `ecs-service` and `ecs-daemon-service` modules so that volumes can be updated safely, support optional params, and support the `docker_volume_configuration`. This is a breaking change, so make sure to see the Migration Guide below for how to upgrade. 



</div>


### [v0.25.3](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.25.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/1/2021 | Modules affected: ecs-service | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.25.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Now allows for a custom prefix for the ECS task IAM role name in the `custom_iam_role_name_prefix` variable.
- Fixes a typo in the name of the ECS task execution policy (`task-excution-policy` =&gt; `task-execution-policy`). Note that this change will cause the policy to be recreated, but will not cause downtime for any ECS service.




</div>



## terraform-aws-eks


### [v0.34.0](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.34.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/31/2021 | Modules affected: eks-k8s-cluster-autoscaler, eks-k8s-external-dns, eks-k8s-cluster-autoscaler-iam-policy | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.34.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- You can now customize the `external-dns` service to directly configure the list of sources it watches for using the `sources` input variable. Note that as a part of this change, the `enable_istio` flag has been removed.
- You can now configure the `external-dns` service to only watch for resources in a specific namespace using the `endpoints_namespace` input variable.
- You can now grant the `cluster-autoscaler` service to query and manipulate any ASGs with the tag `k8s.io/cluster-autoscaler/CLUSTER_NAME` instead of the set of ASGs that were passed in. This IAM permission is applied when `cluster_autoscaler_absolute_arns = false`.
- You can now configure the `eks-k8s-cluster-autoscaler` module to create a Fargate Profile but use an existing Fargate execution role that is created in the same terraform configuration. Previously this led to an error due to `count` values not being available at `plan` time. 


</div>


### [v0.33.1](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.33.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/24/2021 | Modules affected: eks-alb-ingress-controller, eks-cluster-workers | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.33.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- You can now force detach policies on destroy for the IAM role created with self managed workers through the `eks-cluster-workers` module.



</div>



## terraform-aws-lambda


### [v0.10.0](https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.10.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/12/2021 | Modules affected: keep-warm, lambda-edge, lambda, scheduled-lambda-job | <a href="https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.10.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- **Terraform 0.14 upgrade**: We have verified that this repo is compatible with Terraform `0.14.x`! 
    - From this release onward, we will only be running tests with Terraform `0.14.x` against this repo, so we recommend updating to `0.14.x` soon! 
    - To give you more time to upgrade, for the time being, all modules will still support Terraform `0.12.26` and above, as that version has several features in it (`required_providers` with `source` URLs) that make it more forwards compatible with `0.14.x`. 
    - Once all Gruntwork repos have been upgraded to work with `0.14.x`, we will publish a migration guide with a version compatibility table and announce it all via the Gruntwork Newsletter.





</div>



## terraform-aws-load-balancer


### [v0.23.0](https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.23.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/31/2021 | Modules affected: lb-listener-rules, acm-tls-certificate, alb, nlb | <a href="https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.23.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fix bug where the `listener_arns` attribute was ignored on each rules map in the `lb-listener-rules` module.
- Update all repo cross references to the current name.


</div>


### [v0.22.0](https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.22.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/12/2021 | Modules affected: acm-tls-certificate, alb, lb-listener-rules | <a href="https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.22.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- **Terraform 0.14 upgrade**: We have verified that this repo is compatible with Terraform `0.14.x`! 
    - From this release onward, we will only be running tests with Terraform `0.14.x` against this repo, so we recommend updating to `0.14.x` soon! 
    - To give you more time to upgrade, for the time being, all modules will still support Terraform `0.12.26` and above, as that version has several features in it (`required_providers` with `source` URLs) that make it more forwards compatible with `0.14.x`. 
    - Once all Gruntwork repos have been upgraded to work with `0.14.x`, we will publish a migration guide with a version compatibility table and announce it all via the Gruntwork Newsletter.





</div>



## terraform-aws-messaging


### [v0.5.0](https://github.com/gruntwork-io/terraform-aws-messaging/releases/tag/v0.5.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/18/2021 | Modules affected: kinesis, sns, sqs | <a href="https://github.com/gruntwork-io/terraform-aws-messaging/releases/tag/v0.5.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
**Terraform 0.14 upgrade:** We have verified that this repo is compatible with Terraform 0.14.x!

From this release onward, this repo will be running tests with Terraform 0.14.x, so **we recommend updating to 0.14.x soon**!

**All modules still support Terraform 0.12.26** and above (by using features like `required_providers` and `source` URLs).

Once all Gruntwork repositories have been updated to support Terraform 0.14.x, a newsletter announcement will be published via the Gruntwork Newsletter &amp; a migration guide will be published on our website.





</div>


### [v0.4.4](https://github.com/gruntwork-io/terraform-aws-messaging/releases/tag/v0.4.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/9/2021 | Modules affected: sns | <a href="https://github.com/gruntwork-io/terraform-aws-messaging/releases/tag/v0.4.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fix a bug where the `sns` module would show errors with output variable access when `create_resources` was set to `false`.



</div>



## terraform-aws-monitoring


### [v0.26.0](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.26.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/29/2021 | Modules affected: agents/cloudwatch-agent | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.26.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- All the modules except for `logs/cloudwatch-log-aggregation-scripts` have been tested for compatibility with Ubuntu 20.04. If you wish to use the log aggregation scripts on Ubuntu 20.04, migrate to the new Unified CloudWatch Agent using the `agents/cloudwatch-agent` module.

- This release introduces a new module (`agents/cloudwatch-agent`) for installing and configuring the Unified CloudWatch Agent which can be used for sending both metrics and logs to CloudWatch. This module replaces the `logs/cloudwatch-log-aggregation-scripts` and `metrics/cloudwatch-memory-disk-metrics-scripts` module, as the single agent is able to fulfill both purposes.



</div>


### [v0.25.0](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.25.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/18/2021 | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.25.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
Releasing a new minor version for this repo to mark **forward-only compatibility** with Terraform 0.14.x!

From release `v0.24.2`, this repo will be running tests with Terraform 0.14.x, so **we recommend updating to 0.14.x soon**!
**All modules still support Terraform 0.12.26** and above (by using features like `required_providers` and `source` URLs).

Once all Gruntwork repositories have been updated to support Terraform 0.14.x, a newsletter announcement will be published via the Gruntwork Newsletter &amp; a migration guide will be published on our website.

For more details, please refer to the release notes from Terraform 0.14 [release](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.24.2)


</div>


### [v0.24.2](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.24.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/18/2021 | Modules affected: alarms, logs, logs/cloudwatch-logs-metric-filters, metrics | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.24.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- **Terraform 0.14 upgrade:** We have verified that this repo is compatible with Terraform 0.14.x!

    From this release onward, this repo will be running tests with Terraform 0.14.x, so **we recommend updating to 0.14.x soon**!

    **All modules still support Terraform 0.12.26** and above (by using features like `required_providers` and `source` URLs).

    Once all Gruntwork repositories have been updated to support Terraform 0.14.x, a newsletter announcement will be published via the Gruntwork Newsletter &amp; a migration guide will be published on our website.

- SNS topics can now be encrypted in `cloudwatch-logs-metric-filters` by providing a `sns_topic_kms_master_key_id` variable.


</div>



## terraform-aws-security


### [v0.46.2](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.46.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/30/2021 | Modules affected: account-baseline-root | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.46.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fixes an issue in account-baseline-root introduced in v0.45.6 when creating an organization. The module will now `sleep` for enough time to allow the Organization and child accounts be created.




</div>


### [v0.46.1](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.46.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/30/2021 | Modules affected: iam-policies, iam-groups, cross-acount-iam-roles, account-baseline-root | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.46.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Update the read-only policy in the `iam-policies` module to the latest permissions for Amazon Elasticsearch. Note that this will also affect the modules that rely on `iam-policies`, including `iam-groups` and `cross-account-iam-roles`.
- Fix a typo in the `account-baseline-root` README.



</div>


### [v0.46.0](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.46.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/29/2021 | Modules affected: account-baseline-app, account-baseline-root, account-baseline-security, aws-config-bucket | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.46.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  


- **Terraform 0.14 upgrade**: We have verified that this repo is compatible with Terraform `0.14.x`! 
    - From this release onward, we will only be running tests with Terraform `0.14.x` against this repo, so we recommend updating to `0.14.x` soon! 
    - To give you more time to upgrade, for the time being, all modules will still support Terraform `0.12.26` and above, as that version has several features in it (`required_providers` with `source` URLs) that make it more forwards compatible with `0.14.x`. 
    - Once all Gruntwork repos have been upgrade to work with `0.14.x`, we will publish a migration guide with a version compatibility table and announce it all via the Gruntwork Newsletter.




</div>


### [v0.45.8](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.45.8)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/26/2021 | Modules affected: iam-policies, iam-groups, cross-account-iam-roles, account-baseline-root | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.45.8">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Update the billing IAM policy to use the AWS-managed billing policy under the hood (so it&apos;s always up to date), but still layer the MFA requirement on top. This will also affect the modules that use this policy under the hood, including the billing IAM group in the `iam-groups` module and the billing IAM role in the `cross-account-iam-roles` module.
- - **NOTE: Using `account-baseline-root` with this release results in insufficient permissions on the CloudTrail S3 bucket. Use [v0.48.1](https://github.com/gruntwork-io/terraform-aws-security/releases/v0.48.1) or later instead.** The `cloudtrail-bucket`, `cloudtrail`, and `account-baseline-root` modules now all expose a new `cloudtrail_organization_id` input variable that you can use to configure an organization-wide CloudTrail.


</div>


### [v0.45.7](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.45.7)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/24/2021 | Modules affected: iam-user-password-policy | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.45.7">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

-  Add `create_resources` variable to `iam-user-password-policy` module



</div>


### [v0.45.6](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.45.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/24/2021 | Modules affected: account-baseline-root | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.45.6">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

This release fixes a bug in the `account-baseline-root` module in which certain changes to the child account configuration would result in permissions errors.



</div>


### [v0.45.5](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.45.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/23/2021 | Modules affected: account-baseline-root, aws-organizations, cloudtrail, aws-config | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.45.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fix conditional formatting at `account-baseline-root` and `aws-organizations`.
- Improve Cloudtrail test:  fix swaped `assert.Equal` parameters.
- Pin Cloudtrail to AWS provider 3 to standardize behavior.
- Do not call `data` when `create_resources = false` in the aws-config module.


</div>


### [v0.45.4](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.45.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/10/2021 | Modules affected: guardduty-multi-region, guardduty | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.45.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Exposed the ability to encrypt the SNS topic in the Guard Duty modules with a KMS CMK.





</div>


### [v0.45.3](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.45.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/8/2021 | Modules affected: account-baseline-app, account-baseline-root, account-baseline-security, cloudtrail | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.45.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- **NOTE: The Organizations Trail functionality in this release contains a bug related to insufficient S3 permissions. Use [v0.48.1](https://github.com/gruntwork-io/terraform-aws-security/releases/v0.48.1) or later instead.** Capability to create an Organization Trail when using the account-baseline modules. To use an Organization Trail, set `cloudtrail_is_organization_trail=true` in `account-baseline-root`, then set `enable_cloudtrail=false` in `account-baseline-security` and `account-baseline-app` since the Organization Trail in the root account will automatically set up trails for the member accounts. Note that CloudTrail logs will still be sent to the bucket in the logs account.

</div>


### [v0.45.2](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.45.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/3/2021 | Modules affected: cross-account-iam-roles, iam-groups | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.45.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- The modules `iam-groups` and `cross-account-iam-roles` can be disabled via `var.create_resources`.




</div>


### [v0.45.1](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.45.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/2/2021 | Modules affected: aws-config-multi-region, ebs-encryption-multi-region, guardduty-multi-region, iam-access-analyzer-multi-region | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.45.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fix bug where `ap-northeast-3` was recently promoted to a full region, but is not yet supported by terraform.



</div>



## terraform-aws-server


### [v0.11.0](https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.11.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/5/2021 | Modules affected: ec2-backup, single-server | <a href="https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.11.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- **Terraform 0.14 upgrade**: We have verified that this repo is compatible with Terraform `0.14.x`! 
    - From this release onward, we will only be running tests with Terraform `0.14.x` against this repo, so we recommend updating to `0.14.x` soon! 
    - To give you more time to upgrade, for the time being, all modules will still support Terraform `0.12.26` and above, as that version has several features in it (`required_providers` with `source` URLs) that make it more forwards compatible with `0.14.x`. 
    - Once all Gruntwork repos have been upgrade to work with `0.14.x`, we will publish a migration guide with a version compatibility table and announce it all via the Gruntwork Newsletter.



</div>



## terraform-aws-service-catalog


### [v0.25.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.25.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/25/2021 | Modules affected: networking/vpc-mgmt | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.25.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

A few of the variables in the `vpc-mgmt` module had default values configured and were thus optional, when they should have been required. This release removes these defaults values thus making the variables required. In the unlikely case that you previously relied on these defaults, you will have to make changes to explicitly supply values for these variables.

Variables affected: `aws_region`, `vpc_name`, `cidr_block`, `num_nat_gateways`.



</div>


### [v0.24.2](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.24.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/24/2021 | Modules affected: mgmt, services | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.24.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Packer templates have been updated to accept an `instance_type` variable. The value of that variable will be used to determine the EC2 instance type used by the Packer builder. This is to work around issues where the default type, `t3.micro`, is unavailable in some regions/AZs.




</div>


### [v0.24.1](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.24.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/24/2021 | Modules affected: mgmt/jenkins, networking/vpc-mgmt | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.24.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Update dependency gruntwork-io/terragrunt to v0.28.16
- Update dependency gruntwork-io/terraform-aws-vpc to 0.14.4 in the `vpc-mgmt` module



</div>


### [v0.24.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.24.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/24/2021 | Modules affected: data-stores | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.24.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- The `s3-bucket` now sets the `access_logging_bucket` param to `null` by default. This makes it easier to use the module with Terragrunt. This is a backwards incompatible change because, if you don&apos;t set `access_logging_bucket` any more, this module will no longer create an access logging bucket by default.





</div>


### [v0.23.3](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.23.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/24/2021 | Modules affected: data-stores | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.23.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- You can now set tags in the `s3-bucket` service using the new `tags` input variable.





</div>


### [v0.23.2](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.23.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/22/2021 | Modules affected: networking | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.23.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Expose a number of missing fields in the `alb` service that you can now optionally configure:
    - `allow_all_outbound`
    - `idle_timeout`
    - `drop_invalid_header_fields`
    - `custom_tags`
    - `default_action_content_type`
    - `default_action_body`
    - `default_action_status_code`
    - `acm_cert_statuses`
    - `acm_cert_types`





</div>


### [v0.23.1](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.23.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/18/2021 | Modules affected: networking/vpc, networking/vpc-mgmt | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.23.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- `vpc` and `vpc-mgmt` now expose the `vpc_ready` output parameter




</div>


### [v0.23.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.23.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/16/2021 | Modules affected: data-stores/redis, networking/alb, networking/vpc, networking/vpc-mgmt | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.23.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Update dependency gruntwork-io/terraform-aws-cache to v0.11.0. Several months ago, AWS made a backward-incompatible change related to the Elasticache Replication Group Multi-AZ behavior, introducing a new `MultiAZEnabled` toggle. This means that, the last several months, if you deployed Redis with with `enable_automatic_failover` set to true, but did not have this `MultiAZEnabled` flag—which wasn&apos;t exposed in Terraform&apos;s AWS provider—Redis would be deployed into only a single AZ. This issue was fixed in AWS provider 3.26, and in this release, we now expose a new `enable_multi_az` variable in the redis module so that you can configure this property. This change is **backwards incompatible**: you must pass in `enable_multi_az`. To avoid a rebuild of your cluster, you can set it to `null`.
- Creation of network ACLs is now optional in both `vpc` and `vpc-mgmt` services.
- Update dependency gruntwork-io/terraform-aws-load-balancer to v0.22.0
- Update default version of  gruntwork-io/terragrunt installed on CI servers to v0.28.11



</div>


### [v0.22.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.22.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/12/2021 | Modules affected: mgmt/jenkins | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.22.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- The default version of Jenkins that gets installed by the `jenkins` module has been updated to the latest LTS release (`2.235.5` =&gt; `2.263.4`). The version update contains **backwards incompatible** changes within Jenkins. Refer to the upgrade guides for [2.249.x](https://www.jenkins.io/doc/upgrade-guide/2.249/) and [2.263.x](https://www.jenkins.io/doc/upgrade-guide/2.263/) to make sure your build jobs are compatible before rotating your servers.



</div>


### [v0.21.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.21.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/10/2021 | Modules affected: networking/alb | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.21.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

You can now configure multiple domain names to route to the ALB. This is useful if you want to use host based routing for your services. 

**Note that this is a backwards incompatible change**: as a part of this change, the input variable `domain_name` has been converted to a list and renamed to `domain_names`. Similarly, the output `alb_dns_name` has been converted to a list and renamed to `alb_dns_names`. You will need to update your configuration to use the new variable and outputs.




</div>


### [v0.20.6](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.20.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/9/2021 | Modules affected: data-stores/aurora, landingzone | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.20.6">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- The Aurora module now exposes the ability to export Aurora DB cluster logs to CloudWatch Logs via the `enabled_cloudwatch_logs_exports` variable.
- The account-baseline-root module now supports CloudTrail Organization trails. See the complete description in the [`v0.45.3` release](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.45.3) of the `terraform-aws-security` repo.




</div>


### [v0.20.5](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.20.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/8/2021 | Modules affected: services, mgmt | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.20.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Support empty list for secrets_access in ecs-service
- Output aws-auth-merger namespace name
- Update dependency gruntwork-io/terraform-aws-ci to v0.30.0



</div>


### [v0.20.4](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.20.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/5/2021 | Modules affected: services | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.20.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Use usable_fargate_subnet_ids for aws-auth-merger fargate profile



</div>


### [v0.20.3](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.20.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/4/2021 | Modules affected: landingzone | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.20.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Update `terraform-aws-security` in the `account-baseline-root` to v0.45.2




</div>


### [v0.20.2](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.20.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/2/2021 | Modules affected: base, data-stores, landingzone, mgmt | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.20.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- Update dependency gruntwork-io/terraform-aws-security to [v0.45.1](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.45.1) (fix for `ap-northeast-3` in multi region modules)



</div>


### [v0.20.1](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.20.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/1/2021 | Modules affected: services, data-stores, landingzone | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.20.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Allow creating `bastion-host` with no domain name.
- Allow specifying custom tags with RDS and Aurora.
- Allow specifying custom database parameters for RDS and Aurora.
- Add ability to manage service linked role for elasticsearch in the module
- Disable &apos;data&apos; when not using config or cloudtrail in `account-baseline-root`
- Add ability to configure encryption at rest and custom tags on elasticsearch




</div>



## terraform-aws-static-assets


### [v0.8.0](https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.8.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/18/2021 | Modules affected: s3-static-website,  | <a href="https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.8.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
**Terraform 0.14 upgrade:** We have verified that this repo is compatible with Terraform 0.14.x!

From this release onward, this repo will be running tests with Terraform 0.14.x, so **we recommend updating to 0.14.x soon**!
**All modules still support Terraform 0.12.26** and above (by using features like `required_providers` and `source` URLs).

Once all Gruntwork repositories have been updated to support Terraform 0.14.x, a newsletter announcement will be published via the Gruntwork Newsletter &amp; a migration guide will be published on our website.





</div>



## terraform-aws-vpc


### [v0.14.4](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.14.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/24/2021 | Modules affected: vpc-mgmt-network-acls | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.14.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

If `create_resources` was set to `false` in the `vpc-mgmt-network-acls` module, the module would break due to attempting to index empty lists. This release fixes that bug.



</div>


### [v0.14.3](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.14.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/17/2021 | Modules affected: vpc-app | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.14.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

* Older versions of Terraform could not use lists with ternary syntax, so we had to use `split` and `join` to work around it. This should not be a problem in current Terraform versions, so we&apos;ve removed the workaround in this release. There should be no change in behavior, other than, as a nice side effect, `plan` output should work better now for NAT Gateways.





</div>


### [v0.14.2](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.14.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/16/2021 | Modules affected: vpc-mgmt-network-acls | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.14.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

Support for optional resource creation via the `create_resources` parameter was added to `vpc-mgmt-network-acls`.





</div>


### [v0.14.1](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.14.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/15/2021 | Modules affected: network-acl-inbound, network-acl-outbound, vpc-app-network-acls | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.14.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Support for optional resource creation via the `create_resources` parameter was added to the following modules: `network-acl-inbound`,
`network-acl-outbound`, `vpc-app-network-acls`


</div>


### [v0.14.0](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.14.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/5/2021 | Modules affected: network-acl-inbound, network-acl-outbound, vpc-app-network-acls, vpc-app | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.14.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- **Terraform 0.14 upgrade**: We have verified that this repo is compatible with Terraform `0.14.x`! 
    - From this release onward, we will only be running tests with Terraform `0.14.x` against this repo, so we recommend updating to `0.14.x` soon! 
    - To give you more time to upgrade, for the time being, all modules will still support Terraform `0.12.26` and above, as that version has several features in it (`required_providers` with `source` URLs) that make it more forwards compatible with `0.14.x`. 
    - Once all Gruntwork repos have been upgrade to work with `0.14.x`, we will publish a migration guide with a version compatibility table and announce it all via the Gruntwork Newsletter.




</div>

<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "releases",
  "hash": "edcdb2bf999840b8102e0fedf3200150"
}
##DOCS-SOURCER-END -->

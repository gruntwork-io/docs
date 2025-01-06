
# Gruntwork release 2021-06

<p style={{marginTop: "-25px"}}><small><a href="/guides">Guides</a> / <a href="/guides/stay-up-to-date">Update Guides</a> / <a href="/guides/stay-up-to-date/releases">Releases</a> / 2021-06</small></p>

This page is lists all the updates to the [Gruntwork Infrastructure as Code
Library](https://gruntwork.io/infrastructure-as-code-library/) that were released in 2021-06. For instructions
on how to use these updates in your code, check out the [updating
documentation](/library/stay-up-to-date/updating).

Here are the repos that were updated:

- [gruntwork](#gruntwork)
- [terraform-aws-architecture-catalog](#terraform-aws-architecture-catalog)
- [terraform-aws-asg](#terraform-aws-asg)
- [terraform-aws-ci](#terraform-aws-ci)
- [terraform-aws-cis-service-catalog](#terraform-aws-cis-service-catalog)
- [terraform-aws-data-storage](#terraform-aws-data-storage)
- [terraform-aws-ecs](#terraform-aws-ecs)
- [terraform-aws-eks](#terraform-aws-eks)
- [terraform-aws-monitoring](#terraform-aws-monitoring)
- [terraform-aws-security](#terraform-aws-security)
- [terraform-aws-server](#terraform-aws-server)
- [terraform-aws-service-catalog](#terraform-aws-service-catalog)
- [terraform-aws-vpc](#terraform-aws-vpc)


## gruntwork


### [v0.2.2](https://github.com/gruntwork-io/gruntwork/releases/tag/v0.2.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/12/2021 | <a href="https://github.com/gruntwork-io/gruntwork/releases/tag/v0.2.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  This release adds the `gruntwork aws reset-password` command to allow resetting the password of an IAM user. See #72 for the relevant code.

</div>



## terraform-aws-architecture-catalog


### [v0.0.15](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v0.0.15)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/24/2021 | <a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v0.0.15">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Correctly populates the arguments when generating examples.

* #343


</div>


### [v0.0.14](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v0.0.14)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/24/2021 | <a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v0.0.14">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Fixes path to the CIS service catalog when generating examples.

* #342


</div>


### [v0.0.13](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v0.0.13)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/24/2021 | <a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v0.0.13">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Another fix for generating for-production examples.

* #340  


</div>


### [v0.0.12](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v0.0.12)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/23/2021 | <a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v0.0.12">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Attempts to fix issues with generating the for-production examples.

* #338 


</div>


### [v0.0.11](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v0.0.11)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/23/2021 | <a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v0.0.11">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Fixes another issue with test failures in the `refarch-deployer` unit tests.

* #335


</div>


### [v0.0.10](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v0.0.10)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/22/2021 | <a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v0.0.10">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Fixes an issue with testing when on a tag ref vs a branch.

* #330 


</div>


### [v0.0.9](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v0.0.9)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/22/2021 | <a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v0.0.9">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Bumps terraform-aws-service-catalog, terraform-aws-security, terragrunt, and gruntwork-installer to the latest versions.
* Adds CI build step to generate for-production examples in the service catalogs
* Fixes the source URL in the CIS service catalog for-production examples

* #328 
* #205 
* #255 
* #310 
* #297 
* #327 
* #322
* #295 

</div>


### [v0.0.8](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v0.0.8)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/15/2021 | <a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v0.0.8">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- Hand off text generated now as part of the repo root, in QUICK_START.md.
- Bunch of other updates!


- #300
- #301 
- #302 
- #304 
- #305 
- #306 
- #307 
- #298 
- #316 
- #318 
- #317 
- #319 
- #320 
- #196 


</div>



## terraform-aws-asg


### [v0.14.2](https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.14.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/14/2021 | Modules affected: server-group | <a href="https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.14.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fix bug where the IAM permissions were not being attached before the ASG was created




</div>



## terraform-aws-ci


### [v0.37.2](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.37.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/17/2021 | Modules affected: infrastructure-deployer | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.37.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- `infrastructure-deployer` now supports AWS SSO and `~/.aws/config`.
- Fix typos in various docs.



</div>


### [v0.37.1](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.37.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/11/2021 | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.37.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Add toggles for backup routines in Jenkins example



</div>


### [v0.37.0](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.37.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/8/2021 | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.37.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

The `jenkins` module now supports Ubuntu 20.04. Note that starting this release, support for Ubuntu 16.04 is dropped.



</div>



## terraform-aws-cis-service-catalog


### [v0.23.3](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.23.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/30/2021 | Modules affected: landingzone | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.23.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Remove unused code from SecurityHub codegen and fix run_tests
- Expose missing bucket variables for Account Baseline Root



</div>


### [v0.23.2](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.23.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/28/2021 | Modules affected: observability, security, landingzone, networking | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.23.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Add Terraform Validate test
- Update for-production examples for architecture catalog v0.0.15
- Update underlying dependencies
  - gruntwork-io/terraform-aws-security to v0.49.4
  - gruntwork-io/terraform-aws-service-catalog to v0.44.5




</div>


### [v0.23.1](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.23.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/21/2021 | Modules affected: observability, security, landingzone, networking | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.23.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
Update underlying dependencies:
- gruntwork-io/terraform-aws-monitoring to v0.29.1
- gruntwork-io/terraform-aws-security to v0.49.3
- gruntwork-io/terraform-aws-service-catalog to v0.44.0
- gruntwork-io/terraform-aws-vpc to v0.15.5


</div>


### [v0.23.0](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.23.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/18/2021 | Modules affected: security/aws-securityhub | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.23.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Introduce `aws_securityhub_invite_accepter` **[BACKWARDS INCOMPATIBLE]**
- Port run_test functionality from terraform-aws-service-catalog


</div>


### [v0.22.2](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.22.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/17/2021 | Modules affected: landingzone, security, observability, networking | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.22.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Adds a locking mechanism to Securityhub tests, to prevent a race condition that happened during concurrent runs of these tests. 
- Adds `for-production` examples.
- Updates variable description for the Security Hub&apos;s email.
- Cleans up unused variables in `account-baseline-root`.
- Updates log filters to meet CIS 1.4 recommendations.
- Updates version references from v1.3 to v1.4 throughout the codebase.




</div>


### [v0.22.1](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.22.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/14/2021 | Modules affected: landingzone, observability, security, networking | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.22.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fixes in a bug in the password policies where all credentials would get expired after 90 days, and not just unused ones. It also amends the 90 days period to 45 days, to comply with the new 1.4 version of the CIS AWS Benchmark.
- Updates dependencies:
   - gruntwork-io/terraform-aws-security to v0.49.2
   - gruntwork-io/terraform-aws-service-catalog to v0.42.0




</div>


### [v0.22.0](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.22.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/11/2021 | Modules affected: aws-config-multi-region, aws-securityhub, cleanup-expired-certs, cloudtrail | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.22.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  


</div>


### [v0.21.0](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.21.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/7/2021 | Modules affected: networking, aws-config-multi-region, cloudtrail, cross-account-iam-roles | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.21.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
Update the underlying versions of the following modules
- gruntwork-io/terraform-aws-vpc to v0.15.4
- gruntwork-io/terraform-aws-security to v0.49.1
- gruntwork-io/terraform-aws-service-catalog to v0.41.0

The `terraform-aws-service-catalog` update contains **backwards incompatible changes**. Please go through the migration guides associated with all the major version [releases of `terraform-aws-service-catalog`](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases) between v0.37.0 and v0.41.0 and make any necessary changes in your code.




</div>


### [v0.20.1](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.20.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/3/2021 | Modules affected: iam-groups, landingzone/account-baseline-root | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.20.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

This release adds a new Landing Zone service: Account Baseline Root.

It also removes the `iam_group_name_cross_account_access_all` variable.





</div>



## terraform-aws-data-storage


### [v0.20.1](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.20.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/17/2021 | Modules affected: rds | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.20.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- You can now configure timeouts in the `rds` module using the new `creating_timeout`, `updating_timeout`, and `deleting_timeout` input variables.



</div>



## terraform-aws-ecs


### [v0.29.1](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.29.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/2/2021 | Modules affected: ecs-service | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.29.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fix a bug in the `ecs-service` module where it was failing to create the Assume Role Policy in some cases where it needed to.





</div>



## terraform-aws-eks


### [v0.41.0](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.41.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/5/2021 | Modules affected: eks-cluster-managed-workers, eks-cluster-workers | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.41.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Make default configurations for Managed Node Groups more ergonomical by separating out single object into separate variables. This makes it easy to override a subset of the values (as you do not need to define the full object).
- Provide ability to assist Managed Node Group `for_each` call when the `node_group_configurations` variable depends on a resource (e.g., if you are creating the launch templates in the same module). This can be done by statically defining the node group names using the `node_group_names` variable.
- Fix bug where the remote access subblock is included when using launch templates.
- Expose ability to customize the IAM role name. This is useful when the module is called multiple times.
- Expose ability to use an externally managed IAM role for the EKS workers. This is useful when the module is called multiple times.


</div>


### [v0.40.1](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.40.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/3/2021 | Modules affected: eks-cluster-control-plane | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.40.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Add support for skipping individual components during cluster upgrades. Note that you will need `kubergrunt` version `v0.7.1` and above to take advantage of the skip feature.



</div>



## terraform-aws-monitoring


### [v0.29.1](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.29.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/17/2021 | Modules affected: agents/cloudwatch-agent | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.29.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- You can now disable metrics reporting using the new `--disable-cpu-metrics`, `--disable-mem-metrics`, and `--disable-disk-metrics` args of the `configure-cloudwatch-agent.sh` script.



</div>


### [v0.29.0](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.29.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/17/2021 | Modules affected: alarms, agents/cloudwatch-agent | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.29.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- The CloudWatch Agent is now configured to report disk usage percent and memory usage percent metrics.
- The EC2 and ASG alarms have been adjusted to be consistent `cloudwatch-agent`. This means that the new alarms are not compatible with the old `cloudwatch-memory-disk-metrics-scripts`. If you wish to retain the old compatibility, you can set the namespace and metric name to the old values. See below migration guide for more info.


</div>


### [v0.28.1](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.28.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/15/2021 | Modules affected: agents/cloudwatch-agent | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.28.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fix wrong error message in `configure-cloudwatch-agent.sh`



</div>


### [v0.28.0](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.28.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/15/2021 | Modules affected: logs/cloudwatch-log-aggregation-scripts, metrics/cloudwatch-memory-disk-metrics-scripts, agents/cloudwatch-agent | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.28.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fix bug in `agents/cloudwatch-agent` module where the metrics were not being reported under the `InstanceId` dimension.
- The `logs/cloudwatch-log-aggregation-scripts` and `metrics/cloudwatch-memory-disk-metrics-scripts` modules have been removed, as they are now functionally replaced by `agents/cloudwatch-agent`. Refer to the following pages for migration information:
    - [cloudwatch-memory-disk-metrics-scripts](https://github.com/gruntwork-io/terraform-aws-monitoring/tree/master/modules/metrics/_deprecated/cloudwatch-memory-disk-metrics-scripts)
    - [cloudwatch-log-aggregation-scripts](https://github.com/gruntwork-io/terraform-aws-monitoring/tree/master/modules/logs/_deprecated/cloudwatch-log-aggregation-scripts)



</div>



## terraform-aws-security


### [v0.49.4](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.49.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/22/2021 | Modules affected: custom-iam-entity | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.49.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- You can now attach inline custom IAM policies on the IAM group/role managed by `custom-iam-entity`.



</div>


### [v0.49.3](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.49.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/16/2021 | Modules affected: private-s3-bucket | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.49.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

Setting `sse_algorithm` to `null` will now disable encryption on S3 buckets.



</div>


### [v0.49.2](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.49.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/14/2021 | Modules affected: aws-config-multi-region, aws-config-rules | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.49.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

Adds a new AWS Config rule for checking unused credentials. Introduces two new variables `enable_iam_user_unused_credentials_check` and `iam_user_max_credential_usage_age` in both `aws-config-rules` and `aws-config-multi-region` modules.




</div>


### [v0.49.1](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.49.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/4/2021 | Modules affected: custom-iam-entity | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.49.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

Adds a new feature to the `custom-iam-entity` module to make it easier to create an IAM group that only has permissions to assume one or more IAM roles. See [`iam_group_assume_role_arns`](https://github.com/gruntwork-io/terraform-aws-security/blob/master/modules/custom-iam-entity/variables.tf#L37) for more information.




</div>



## terraform-aws-server


### [v0.12.2](https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.12.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/14/2021 | Modules affected: persistent-ebs-volume, attach-eni | <a href="https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.12.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fix error message when describing vols by tag
- Add retry logic when pulling new interface ID in `attach-eni` script.
- Add sleep at end of `attach-eni` script to give kernel a chance to boot up the newly configured interface.



</div>



## terraform-aws-service-catalog


### [v0.44.7](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.44.7)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/30/2021 | Modules affected: services | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.44.7">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fix bug where `eks-cluster` required both worker types.




</div>


### [v0.44.6](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.44.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/28/2021 | Modules affected: services | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.44.6">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- k8s-service: add support for custom resources



</div>


### [v0.44.5](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.44.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/25/2021 | Modules affected: networking | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.44.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- You can now avoid creating the default ACM certificate in the `route53` module by setting `provision_certificates` on the input parameter.




</div>


### [v0.44.4](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.44.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/25/2021 | Modules affected: landingzone | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.44.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Expose several new variables in the Landing Zone modules (`account-baseline-app`, `account-baseline-root`, `account-baseline-security`) for configuring CloudTrail:
    - `is_multi_region_trail`
    - `cloudtrail_enable_key_rotation`
    - `cloudtrail_num_days_to_retain_cloudwatch_logs`
    - `cloudtrail_data_logging_enabled`
    - `cloudtrail_data_logging_read_write_type`
    - `cloudtrail_data_logging_include_management_events`
    - `cloudtrail_data_logging_resource_type`
    - `cloudtrail_data_logging_resource_values`
 



</div>


### [v0.44.3](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.44.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/24/2021 | Modules affected: services/ec2-instance, mgmt | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.44.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
* `services/ec2-instance` [**NEW**]
* `mgmt`


* Update dependency gruntwork-io/terragrunt to v0.31.0
* Update dependency gruntwork-io/terraform-aws-ci to v0.37.2
* Update for-production examples for architecture catalog v0.0.13
* Implement services/ec2-instance


 #714
 #716
 #753
 #579


</div>


### [v0.44.2](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.44.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/21/2021 | Modules affected: networking/vpc | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.44.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- You can now expose the type of traffic to capture in VPC flow logs in the `vpc` module using the new `traffic_type` input variable.






</div>


### [v0.44.1](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.44.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/21/2021 | Modules affected: networking/vpc | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.44.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- You can now get the ID of the default security group from the `vpc` module using the new `default_security_group_id` output variable.
- Updated the `for-production` examples to the latest.




</div>


### [v0.44.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.44.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/18/2021 | Modules affected: base/ec2-baseline, data-stores/aurora, data-stores/elasticsearch, data-stores/memcached | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.44.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Jenkins module backup function is now converted to use AWS Data Lifecycle Manager instead of a custom lambda function. If you wish to continue to use the lambda based backup function, you can set `backup_using_lambda = true`.
- The dashboard widgets and alarms for EC2 and ASG based modules have been updated to work with the new CloudWatch agent instead of `cloudwatch-memory-disk-metrics`. To ensure compatibility, make sure to rebuild your server AMIs to align with this version.



</div>


### [v0.43.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.43.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/16/2021 | Modules affected: base/ec2-baseline, data-stores/aurora, data-stores/elasticsearch, data-stores/memcached | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.43.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- **[BACKWARDS INCOMPATIBLE]** Updates dependency gruntwork-io/terraform-aws-monitoring to v0.28.0. As a result of this, server metrics are now shipped via the `cloudwatch-agent` instead of the `cloudwatch-memory-disk-metrics` script. Note that the metric namespaces have changed from `System/Linux` to `CWAgent` as a result of this change. You may need to update dashboards or consumers of these metrics accordingly.
- CloudWatch Logs group names are now configurable for ECS cluster
- Updated the `for-production/infrastructure-live` examples with many bug fixes and updates.
- Setting `sse_algorithm` to null will now disable encryption on S3 buckets.


</div>


### [v0.42.1](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.42.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/15/2021 | Modules affected: base | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.42.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Update dependency gruntwork-io/bash-commons to v0.1.7
- [ec2-baseline] Make sure each log file managed by `cloudwatch-agent` goes to separate streams




</div>


### [v0.42.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.42.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/11/2021 | Modules affected: services/eks-cluster, services/eks-workers, mgmt, networking | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.42.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Update all `kubergrunt` and `terraform-aws-eks` references to `v0.7.1` and `v0.41.0`
- Create a new module `eks-workers` that lets you manage EKS worker groups (self-managed ASGs and Manged Node Groups) separately from the EKS cluster.
- Add support for deploying Managed Node Groups

**IMPORTANT: This is a backward incompatible release. A naive update will redeploy all worker nodes and cause downtime. Refer to the migration guide below for strategies to avoid the downtime.**


</div>


### [v0.41.4](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.41.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/10/2021 | Modules affected: mgmt, services | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.41.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Update dependency hashicorp/terraform to v0.15.5
- Update dependency hashicorp/packer to v1.7.2
- Updates for-production examples
- Use standardized naming of packer templates
- Allow setting Cluster Autoscaler version in `eks-core-services`



</div>


### [v0.41.3](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.41.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/8/2021 | Modules affected: mgmt, services | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.41.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Update dependency helm/helm to v3.6.0
- Update dependency gruntwork-io/gruntkms to v0.0.10
- Update dependency gruntwork-io/terragrunt to v0.29.10
- Update dependency gruntwork-io/terraform-aws-ecs to v0.29.1




</div>


### [v0.41.2](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.41.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/8/2021 | Modules affected: data-stores, networking, services, mgmt | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.41.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Update dependency gruntwork-io/terraform-aws-cache to v0.15.0
- Update dependency gruntwork-io/terraform-aws-vpc to v0.15.4
- Update dependency gruntwork-io/terraform-aws-static-assets to v0.10.0
- Update dependency gruntwork-io/terraform-aws-ci to v0.37.0
- Update dependency gruntwork-io/terraform-aws-lambda to v0.11.1
- Update dependency gruntwork-io/terraform-aws-security to v0.49.1
- Update dependency gruntwork-io/terratest to v0.35.3



</div>


### [v0.41.1](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.41.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/7/2021 | Modules affected: base, networking, services | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.41.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Update dependency gruntwork-io/bash-commons to v0.1.4
- Update dependency gruntwork-io/terraform-aws-load-balancer to v0.26.0




</div>


### [v0.41.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.41.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/4/2021 | Modules affected: base, mgmt | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.41.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- AMIs updated to use Ubuntu 20.04 as base



</div>


### [v0.40.5](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.40.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/4/2021 | Modules affected: services | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.40.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- You can now override the sources of the `external-dns` app in `eks-core-services`



</div>


### [v0.40.4](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.40.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/4/2021 | Modules affected: networking/vpc | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.40.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- You can now configure the subnet spacing / sizing in the `vpc` module using the new input variables `subnet_spacing`, `private_subnet_spacing`, `persistence_subnet_spacing`, `public_subnet_bits`, `private_subnet_bits`, and `persistence_subnet_bits`.



</div>


### [v0.40.3](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.40.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/3/2021 | Modules affected: data-stores/redis | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.40.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

Adds support for tags to the redis module.




</div>


### [v0.40.2](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.40.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/2/2021 | Modules affected: networking/vpc | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.40.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fix a bug in the `vpc` module where, if you disabled a subnet tier, it would still try to create NACLs for that subnet tier. You can now also independently control whether the NACLs for each subnet tier will be created using the new `create_public_subnet_nacls`, `create_private_app_subnet_nacls`, and `create_private_persistence_subnet_nacls` input variables. Finally, you can also control if the default security group is created using the new `enable_default_security_group` input variable.



</div>


### [v0.40.1](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.40.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/2/2021 | Modules affected: data-stores/ecr-repos, data-stores/rds | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.40.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- You can now configure whether image tags are mutable or not in the `ecr-repos` module using the new `image_tag_mutability` field in the `repositories` input variable.
- Fix a bug in the `rds` module where it would create a new KMS key, but wasn&apos;t actually using it, and was using the default RDS key instead. The API has changed now: to create and use a custom KMS key, set `create_custom_kms_key` to `true`; to use an existing KMS key, set `create_custom_kms_key` to `false` and pass in the KMS key to use via `kms_key_arn`. If `create_custom_kms_key` is `false` and you don&apos;t pass in a custom KMS key, the module will use the default RDS key.



</div>


### [v0.40.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.40.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/1/2021 | Modules affected: account-baseline-root | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.40.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Remove dependency between Cloudtrail and Config their respective buckets, and rename the `cloudtrail_s3_bucket_already_exists` variable.


</div>



## terraform-aws-vpc


### [v0.15.5](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.15.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/21/2021 | Modules affected: vpc-flow-logs | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.15.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Update the `vpc-flow-logs` module to add the necessary IAM permissions to allow the VPC flow logs service to write to the S3 bucket.






</div>

<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "releases",
  "hash": "a866c4d243f0eeacc6cce1867c7bfab7"
}
##DOCS-SOURCER-END -->

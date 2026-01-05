
# Gruntwork release 2023-02

<p style={{marginTop: "-25px"}}><small><a href="/guides">Guides</a> / <a href="/guides/stay-up-to-date">Update Guides</a> / <a href="/guides/stay-up-to-date/releases">Releases</a> / 2023-02</small></p>

This page is lists all the updates to the [Gruntwork Infrastructure as Code
Library](https://gruntwork.io/infrastructure-as-code-library/) that were released in 2023-02. For instructions
on how to use these updates in your code, check out the [updating
documentation](/library/stay-up-to-date/updating).

Here are the repos that were updated:

- [patcher-cli](#patcher-cli)
- [repo-copier](#repo-copier)
- [terraform-aws-asg](#terraform-aws-asg)
- [terraform-aws-ci](#terraform-aws-ci)
- [terraform-aws-cis-service-catalog](#terraform-aws-cis-service-catalog)
- [terraform-aws-data-storage](#terraform-aws-data-storage)
- [terraform-aws-eks](#terraform-aws-eks)
- [terraform-aws-monitoring](#terraform-aws-monitoring)
- [terraform-aws-service-catalog](#terraform-aws-service-catalog)
- [terraform-aws-static-assets](#terraform-aws-static-assets)


## patcher-cli


### [v0.1.0](https://github.com/gruntwork-io/patcher-cli/releases/tag/v0.1.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/22/2023 | <a href="https://github.com/gruntwork-io/patcher-cli/releases/tag/v0.1.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  (no release notes found)

</div>



## repo-copier


### [v0.2.1](https://github.com/gruntwork-io/repo-copier/releases/tag/v0.2.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/8/2023 | <a href="https://github.com/gruntwork-io/repo-copier/releases/tag/v0.2.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Get rid of sensitive data from git history by @brikis98 
* Fix displaying the correct version in the CLI `--version` by @levkoburburas in https://github.com/gruntwork-io/repo-copier/pull/145
* Bug fix in `--dry-run` mode. Fix copying non-Golang repository on Windows OS by @levkoburburas in https://github.com/gruntwork-io/repo-copier/pull/149


**Full Changelog**: https://github.com/gruntwork-io/repo-copier/compare/v0.2.0...v0.2.1

</div>



## terraform-aws-asg


### [v0.21.1](https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.21.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/24/2023 | Modules affected: asg-instance-refresh | <a href="https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.21.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Updates asg-instance-refresh examples to use Launch Templates instead of Launch Configurations




</div>


### [v0.21.0](https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.21.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/16/2023 | Modules affected: asg-rolling-deploy | <a href="https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.21.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Simplify required vars in asg-rolling-deploy



</div>


### [v0.20.0](https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.20.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/7/2023 | Modules affected: server-group, asg-instance-refresh, asg-rolling-deploy | <a href="https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.20.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- Updates to Launch Template. Deprecate Launch Config
- Updated asg-rolling-deploy to use Launch Templates
- Deprecate launch configs in asg-instance-refresh



</div>



## terraform-aws-ci


### [v0.51.1](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.51.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/14/2023 | Modules affected: ec2-backup, ecs-deploy-runner, jenkins-server | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.51.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Updates jenkins, ec2-backup, and the ecs-deploy-runner to use launch templates rather than the deprecated launch configurations



</div>



## terraform-aws-cis-service-catalog


### [v0.44.0](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.44.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/27/2023 | Modules affected: landingzone, networking | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.44.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Updated launch configurations to launch templates



</div>


### [v0.43.0](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.43.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/27/2023 | Modules affected: data-stores, landingzone, networking, observability | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.43.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

-  Fix changelog linter issues
- [examples] Remove deprecated argument `skip_get_ec2_platforms` from AWS …
- Remove rules from default Security Group at VPC module.



</div>


### [v0.42.9](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.42.9)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/16/2023 | Modules affected: security, data-stores, landingzone, networking | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.42.9">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Modules: remove references to Gruntwork Houston
- Add Changelogs for each module
- Add period to the RDS error message



</div>


### [v0.42.8](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.42.8)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/1/2023 | Modules affected: data-stores | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.42.8">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Updated version of the RDS module from the Service Catalog to v0.100.1.



</div>



## terraform-aws-data-storage


### [v0.26.0](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.26.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/27/2023 | Modules affected: lambda-cleanup-snapshots, lambda-copy-shared-snapshot, lambda-create-snapshot, lambda-share-snapshot | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.26.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - lambda-cleanup-snapshots
- lambda-copy-shared-snapshot
- lambda-create-snapshot
- lambda-share-snapshot
- aurora
- rds
- redshift
- backup-plan
- backup-vault

* Upgrade the aws provider version to 4.22.0 for all lambda functions by @hongil0316 in https://github.com/gruntwork-io/terraform-aws-data-storage/pull/289
* Increase the aws provider version of RDS and aurora modules to &gt;= 4.22.0 by @hongil0316 in https://github.com/gruntwork-io/terraform-aws-data-storage/pull/287
* Upgrade the aws provider version to 4.22.0 for redshift by @hongil0316 in https://github.com/gruntwork-io/terraform-aws-data-storage/pull/291
* Upgrade the aws provider version to 4.22.0 for backup vault and policy by @hongil0316 in https://github.com/gruntwork-io/terraform-aws-data-storage/pull/290

In this release, we have updated the aws provider version from 3.x.x to 4.22.0, which involves a major upgrade from aws provider. From testing, we didn&apos;t find any changes needed on the storage modules themselves but it might require changes on other interacting components due to the major provider version upgrade. Please test before using the newest release version. 


**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-data-storage/compare/v0.24.4...v0.26.0

</div>


### [v0.25.0](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.25.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/24/2023 | Modules affected: rds, efs, aurora | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.25.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- `rds`
- `efs`
- `aurora` **[BACKWARDS INCOMPATIBLE]**

* Updated tests to use default subnets per AZ to prevent test failures in certain scenarios by @hongil0316 in https://github.com/gruntwork-io/terraform-aws-data-storage/pull/281
* Convert Security Group Rules to for_each by @scottclk in https://github.com/gruntwork-io/terraform-aws-data-storage/pull/282
* Create a variable for custom final snapshot for Aurora. by @hongil0316 in https://github.com/gruntwork-io/terraform-aws-data-storage/pull/283
* Update the AWS provider version of EFS module to 4.42 by @hongil0316 in https://github.com/gruntwork-io/terraform-aws-data-storage/pull/285
* Add ` boundary policy in creation of enhancement monitoring iam role by @saisumanth443 in https://github.com/gruntwork-io/terraform-aws-data-storage/pull/286

* @saisumanth443 made their first contribution in https://github.com/gruntwork-io/terraform-aws-data-storage/pull/286

**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-data-storage/compare/v0.24.3...v0.25.0



Use the terraform state mv [command](https://www.terraform.io/docs/commands/state/mv.html) on any Terraform state files you have, changing your `aws_security_group_rule` indexes from numbers to the source security groups&apos; IDs.

Let&apos;s assume you have 3 entries in `var.allow_connections_from_security_groups` defined in your terraform inputs, 
```
module.database.aws_security_group_rule.allow_connections_from_security_group[0]
module.database.aws_security_group_rule.allow_connections_from_security_group[1]
module.database.aws_security_group_rule.allow_connections_from_security_group[2]
```

To prepare your Terraform state to be compatible with this release, you need to change the numerical index of each group to the ID of that group itself:
```
terraform state mv &apos;module.database.aws_security_group_rule.allow_connections_from_security_group[0]&apos; &apos;module.database.aws_security_group_rule.allow_connections_from_security_group[&quot;sg-123abc&quot;]&apos;

terraform state mv &apos;module.database.aws_security_group_rule.allow_connections_from_security_group[1]&apos; &apos;module.database.aws_security_group_rule.allow_connections_from_security_group[&quot;sg-456def&quot;]&apos;
... 
```

</div>


### [v0.24.3](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.24.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/17/2023 | Modules affected: aurora, backup-vault, redshift | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.24.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - aurora
- backup-vault
- redshift

* Use latest upgrade test code. by @rhoboat in https://github.com/gruntwork-io/terraform-aws-data-storage/pull/270
* Update default branch references (backward compatible) by @rhoboat in https://github.com/gruntwork-io/terraform-aws-data-storage/pull/269
* Update CODEOWNERS by @yorinasub17 in https://github.com/gruntwork-io/terraform-aws-data-storage/pull/272
* Add support for configuring the timeouts for the DB modules. by @hongil0316 in https://github.com/gruntwork-io/terraform-aws-data-storage/pull/279
* Fix backup policy for backup vault by @hongil0316 in https://github.com/gruntwork-io/terraform-aws-data-storage/pull/277
* adding serverless v2 enchancement issue #266 by @bob-rohan in https://github.com/gruntwork-io/terraform-aws-data-storage/pull/280

* @hongil0316 made their first contribution in https://github.com/gruntwork-io/terraform-aws-data-storage/pull/279
* @bob-rohan made their first contribution in https://github.com/gruntwork-io/terraform-aws-data-storage/pull/280

**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-data-storage/compare/v0.24.2...v0.24.3

</div>



## terraform-aws-eks


### [v0.56.3](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.56.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/7/2023 | Modules affected: eks-container-logs | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.56.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Expose Helm Chart `additionalInputs` value.




</div>



## terraform-aws-monitoring


### [v0.35.8](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.35.8)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/8/2023 | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.35.8">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
Migrated the example in examples/asg-alarms to use a launch template instead of a launch configuration.


</div>



## terraform-aws-service-catalog


### [v0.102.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.102.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/23/2023 | Modules affected: landingzone, data-stores, mgmt, networking | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.102.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- remove deprecated argument skip_get_ec2_platforms from AWS …
- remove references to Gruntwork Houston
- Update version of CIS Service Catalog in the RDS patch
- Add Changelogs for modules used by CIS
- Update to correct gruntwork-installer branch name
- Create example: single account Gruntwork Pipelines configuration
- [CORE-308] upgrade from launch configurations to launch templates




</div>


### [v0.101.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.101.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/13/2023 | Modules affected: services/public-static-website, data-stores | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.101.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Add dependency between S3 bucket and access logs bucket
- Fix duplicate S3 website routing rules and support multiple routing rules


</div>


### [v0.100.6](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.100.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/10/2023 | Modules affected: services | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.100.6">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Added new &apos;cloudwatch_log_group_tags&apos; variable to `ecs-service` module
- Exposes `secondary_private_ips` variable in `ec2-instance` module




</div>


### [v0.100.5](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.100.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/10/2023 | Modules affected: services | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.100.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Exposes variable to disable cloudfront logs on `public_static_website` module.



</div>


### [v0.100.4](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.100.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/9/2023 | Modules affected: networking, services | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.100.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- Bump `terraform-aws-eks` to `v0.56.3` - expose additional inputs for fluentbit in core services
- Upgrade `helm-kubernetes-services` to `v0.2.18`





</div>


### [v0.100.3](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.100.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/2/2023 | Modules affected: networking, services | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.100.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Adds conditional logic for writing ExecCredential api version to support backward compatibility with `terraform-aws-eks` v0.56.1 and above with EKS clusters 1.23 and below.


</div>


### [v0.100.2](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.100.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/1/2023 | Modules affected: services | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.100.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Expose `web_acl_id` in public-static-website module



</div>



## terraform-aws-static-assets


### [v0.16.0](https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.16.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/10/2023 | Modules affected: s3-static-website | <a href="https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.16.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fixes duplicate routing rules applied when using `routing_rule` input for the `s3-static-website` module
- Adds `routing_rules` input for the `s3-static-website` module. This enables having empty String values in routing rules



</div>

<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "releases",
  "hash": "bd82a2241d0ca7e23899e37b7e8d606b"
}
##DOCS-SOURCER-END -->


# Gruntwork release 2025-11

<p style={{marginTop: "-25px"}}><small><a href="/guides">Guides</a> / <a href="/guides/stay-up-to-date">Update Guides</a> / <a href="/guides/stay-up-to-date/releases">Releases</a> / 2025-11</small></p>

This page is lists all the updates to the [Gruntwork Infrastructure as Code
Library](https://gruntwork.io/infrastructure-as-code-library/) that were released in 2025-11. For instructions
on how to use these updates in your code, check out the [updating
documentation](/library/stay-up-to-date/updating).

Here are the repos that were updated:

- [pipelines-actions](#pipelines-actions)
- [pipelines-cli](#pipelines-cli)
- [pipelines-workflows](#pipelines-workflows)
- [terraform-aws-architecture-catalog](#terraform-aws-architecture-catalog)
- [terraform-aws-cache](#terraform-aws-cache)
- [terraform-aws-control-tower](#terraform-aws-control-tower)
- [terraform-aws-data-storage](#terraform-aws-data-storage)
- [terraform-aws-eks](#terraform-aws-eks)
- [terraform-aws-lambda](#terraform-aws-lambda)
- [terraform-aws-service-catalog](#terraform-aws-service-catalog)
- [terraform-aws-static-assets](#terraform-aws-static-assets)
- [terraform-aws-vpc](#terraform-aws-vpc)


## pipelines-actions


### [v4.1.2](https://github.com/gruntwork-io/pipelines-actions/releases/tag/v4.1.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/13/2025 | <a href="https://github.com/gruntwork-io/pipelines-actions/releases/tag/v4.1.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * [Bug Fix] Use dedicated child account baseline command by @oredavids in https://github.com/gruntwork-io/pipelines-actions/pull/147


**Full Changelog**: https://github.com/gruntwork-io/pipelines-actions/compare/v4.1.1...v4.1.2

</div>



## pipelines-cli


### [v0.40.7](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.40.7)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/26/2025 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.40.7">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Fix gitlab runner tag parsing by @Resonance1584 in https://github.com/gruntwork-io/pipelines/pull/502


**Full Changelog**: https://github.com/gruntwork-io/pipelines/compare/v0.40.6...v0.40.7


</div>


### [v0.40.6](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.40.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/14/2025 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.40.6">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Enable consolidated deletes in tests by @Resonance1584 in https://github.com/gruntwork-io/pipelines/pull/499
* DEV-1201 Fix retry failed jobs in github flaking by @Resonance1584 in https://github.com/gruntwork-io/pipelines/pull/500


**Full Changelog**: https://github.com/gruntwork-io/pipelines/compare/v0.40.5...v0.40.6


</div>


### [v0.40.5](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.40.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/10/2025 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.40.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

To mitigate a bug related to the OpenTofu/Terraform `-destroy` flag being set before Terragrunt flags when used with `run --all plan -destroy`, the flag is explicitly moved to the end of the argument list with an `--` separator if detected. 

This is an interim fix, with more nuanced flag ordering planned for the future.


* fix: Moving `-destroy` to the end of the args list by @yhakbar in https://github.com/gruntwork-io/pipelines/pull/497


**Full Changelog**: https://github.com/gruntwork-io/pipelines/compare/v0.40.4...v0.40.5


</div>


### [v0.40.4](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.40.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/4/2025 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.40.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Bump xcode version by @Resonance1584 in https://github.com/gruntwork-io/pipelines/pull/495
* DD fixes. New TG version. by @Resonance1584 in https://github.com/gruntwork-io/pipelines/pull/496


**Full Changelog**: https://github.com/gruntwork-io/pipelines/compare/v0.40.3...v0.40.4


</div>



## pipelines-workflows


### [v4.0.7](https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v4.0.7)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/27/2025 | <a href="https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v4.0.7">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
Parity release to keep Pipelines CLI version in sync. No impacts to GitHub functionality.

* Pipelines CLI v0.40.7 by @Resonance1584 in https://github.com/gruntwork-io/pipelines-workflows/pull/174


**Full Changelog**: https://github.com/gruntwork-io/pipelines-workflows/compare/v4...v4.0.7

</div>


### [v4.0.6](https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v4.0.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/14/2025 | <a href="https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v4.0.6">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- Fixed a race condition affecting the status check when retrying failed jobs
- Fixed drift-detection PR_CREATE_TOKEN fallback token

**Full Changelog**: https://github.com/gruntwork-io/pipelines-workflows/compare/v4...v4.0.6

</div>


### [v4.0.5](https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v4.0.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/13/2025 | <a href="https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v4.0.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
* Fix child account baseline auth bug by @oredavids in https://github.com/gruntwork-io/pipelines-workflows/pull/172


**Full Changelog**: https://github.com/gruntwork-io/pipelines-workflows/compare/v4.0.4...v4.0.5

</div>


### [v4.0.4](https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v4.0.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/10/2025 | <a href="https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v4.0.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

To mitigate a bug related to the OpenTofu/Terraform `-destroy` flag being set before Terragrunt flags when used with `run --all plan -destroy`, the flag is explicitly moved to the end of the argument list with an `--` separator if detected. 

This is an interim fix, with more nuanced flag ordering planned for the future.

* chore: Bumping Pipelines CLI version to `v0.40.5` by @yhakbar in https://github.com/gruntwork-io/pipelines-workflows/pull/171

**Full Changelog**: https://github.com/gruntwork-io/pipelines-workflows/compare/v4...v4.0.4

</div>


### [v4.0.3](https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v4.0.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/5/2025 | <a href="https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v4.0.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- Allow Drift Detection to run on branches other than the deploy branch
- Remove ahead of main check from preflight when workflow is manually dispatched
- Allow alpha and beta Terragrunt releases to be used (minimum version check no longer applies)

**Full Changelog**: https://github.com/gruntwork-io/pipelines-workflows/compare/v4...v4.0.3

</div>



## terraform-aws-architecture-catalog


### [v4.1.1](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v4.1.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/26/2025 | <a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v4.1.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * circleci: remove deploy job by @gcagle3 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1178
* multi_region_common.hcl: add eu-central-2 by @gcagle3 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1179


**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-architecture-catalog/compare/v4.1.0...v4.1.1

</div>


### [v4.1.0](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v4.1.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/19/2025 | <a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v4.1.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Upgraded usage of terraform-aws-control-tower modules to v1.1.0


**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-architecture-catalog/compare/v4.0.2...v4.1.0

</div>


### [v4.0.2](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v4.0.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/6/2025 | <a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v4.0.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * chore: Upgrading default Terragrunt version in templates to `0.93.1` by @yhakbar in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1176


**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-architecture-catalog/compare/v4.0.1...v4.0.2

</div>



## terraform-aws-cache


### [v1.0.3](https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v1.0.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/11/2025 | <a href="https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v1.0.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * feat(elastic-cache): Add Event Notifications for ElastiCache cluster by @Zoltowska in https://github.com/gruntwork-io/terraform-aws-cache/pull/173

* @Zoltowska made their first contribution in https://github.com/gruntwork-io/terraform-aws-cache/pull/173

**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-cache/compare/v1.0.2...v1.0.3

</div>


### [v1.0.2](https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v1.0.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/3/2025 | <a href="https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v1.0.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Update AWS provider version constraint to support v6 by @james00012 in https://github.com/gruntwork-io/terraform-aws-cache/pull/171


**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-cache/compare/v1.0.1...v1.0.2

</div>



## terraform-aws-control-tower


### [v1.1.0](https://github.com/gruntwork-io/terraform-aws-control-tower/releases/tag/v1.1.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/13/2025 | Modules affected: landingzone | <a href="https://github.com/gruntwork-io/terraform-aws-control-tower/releases/tag/v1.1.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- `landingzone/control-tower-account-factory` and `landingzone/control-tower-account-factory-async` modules now support using OU paths; with this change, you can specify either a simple OU name (e.g., &apos;Prod&apos;) or a path separated by forward slashes (e.g., &apos;Workloads/Prod&apos;).






</div>



## terraform-aws-data-storage


### [v0.42.0](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.42.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/19/2025 | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.42.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Add Aurora Serverless V2 auto-pause and backup schedule timezone support by @james00012 in https://github.com/gruntwork-io/terraform-aws-data-storage/pull/536
* fix: Update db_name constraints and add proper validation by @james00012 in https://github.com/gruntwork-io/terraform-aws-data-storage/pull/534
* feat(aurora) Add cluster_monitoring_interval option by @cornet in https://github.com/gruntwork-io/terraform-aws-data-storage/pull/537
* docs: Fix broken links and improve documentation consistency by @james00012 in https://github.com/gruntwork-io/terraform-aws-data-storage/pull/527


**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-data-storage/compare/v0.41.1...v0.42.0

</div>



## terraform-aws-eks


### [v3.1.2](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v3.1.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/19/2025 | Modules affected: eks-k8s-karpenter | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v3.1.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- LIB-3801: Allow additional policies attachment for karpenter node role



</div>



## terraform-aws-lambda


### [v1.2.0](https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v1.2.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/4/2025 | <a href="https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v1.2.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Bump golang.org/x/net from 0.36.0 to 0.38.0 in /test by @dependabot[bot] in https://github.com/gruntwork-io/terraform-aws-lambda/pull/273
* Bump requests from 2.32.0 to 2.32.4 in /examples/lambda-build/python by @dependabot[bot] in https://github.com/gruntwork-io/terraform-aws-lambda/pull/274
* Bump urllib3 from 1.26.19 to 2.5.0 in /examples/lambda-build/python by @dependabot[bot] in https://github.com/gruntwork-io/terraform-aws-lambda/pull/275
* fix: conditionalize lambda iam role trust by @bt-macole in https://github.com/gruntwork-io/terraform-aws-lambda/pull/277
* feat: Add AWS Lambda SnapStart support by @james00012 in https://github.com/gruntwork-io/terraform-aws-lambda/pull/279

* @bt-macole made their first contribution in https://github.com/gruntwork-io/terraform-aws-lambda/pull/277

**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-lambda/compare/v1.1.0...v1.2.0

</div>



## terraform-aws-service-catalog


### [v0.142.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.142.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/20/2025 | Modules affected: networking | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.142.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Update VPC and Route53 modules to support AWS Provider v6.x


</div>


### [v0.141.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.141.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/10/2025 | Modules affected: modules/networking/vpc, modules/services/eks-argocd, modules/services/eks-cluster, modules/services/eks-core-services | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.141.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Bump `terraform-aws-eks` to `v2.1.1`




</div>



## terraform-aws-static-assets


### [v1.1.2](https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v1.1.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/5/2025 | Modules affected: s3-cloudfront | <a href="https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v1.1.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Added Optional Name Suffix for Origin Access Control Resource



</div>



## terraform-aws-vpc


### [v0.28.9](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.28.9)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/25/2025 | Modules affected: network-acl-inbound, network-acl-outbound, route, transit-gateway-attachment | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.28.9">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- VPC v1: AWS Provider Version Bump. Enabled usage of AWS Provider v6.x.x.



</div>

<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "releases",
  "hash": "dcca12190eaf0e4e9fa134da2ae660a7"
}
##DOCS-SOURCER-END -->

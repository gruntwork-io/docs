
# Gruntwork release 2023-07

<p style={{marginTop: "-25px"}}><small><a href="/guides">Guides</a> / <a href="/guides/stay-up-to-date">Update Guides</a> / <a href="/guides/stay-up-to-date/releases">Releases</a> / 2023-07</small></p>

This page is lists all the updates to the [Gruntwork Infrastructure as Code
Library](https://gruntwork.io/infrastructure-as-code-library/) that were released in 2023-07. For instructions
on how to use these updates in your code, check out the [updating
documentation](/library/stay-up-to-date/updating).

Here are the repos that were updated:

- [patcher-cli](#patcher-cli)
- [repo-copier](#repo-copier)
- [terraform-aws-asg](#terraform-aws-asg)
- [terraform-aws-ci](#terraform-aws-ci)
- [terraform-aws-cis-service-catalog](#terraform-aws-cis-service-catalog)
- [terraform-aws-control-tower](#terraform-aws-control-tower)
- [terraform-aws-ecs](#terraform-aws-ecs)
- [terraform-aws-eks](#terraform-aws-eks)
- [terraform-aws-load-balancer](#terraform-aws-load-balancer)
- [terraform-aws-monitoring](#terraform-aws-monitoring)
- [terraform-aws-openvpn](#terraform-aws-openvpn)
- [terraform-aws-service-catalog](#terraform-aws-service-catalog)
- [terraform-aws-vpc](#terraform-aws-vpc)


## patcher-cli


### [v0.4.2](https://github.com/gruntwork-io/patcher-cli/releases/tag/v0.4.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/25/2023 | <a href="https://github.com/gruntwork-io/patcher-cli/releases/tag/v0.4.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
This release includes the following improvements:
- A non-interactive mode was added to the `report` command
  - The command outputs the list of dependencies in JSON format
```
patcher report --non-interactive --skip-container-runtime
```


</div>


### [v0.4.1](https://github.com/gruntwork-io/patcher-cli/releases/tag/v0.4.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/24/2023 | <a href="https://github.com/gruntwork-io/patcher-cli/releases/tag/v0.4.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
This release includes the following improvements:
- This release contains a fix for [Patcher silently skipping dependencies when there are parsing errors in Terragrunt configurations](https://github.com/gruntwork-io/patcher-cli/issues/8)
- Non-interactive `update` command
  - Support for automatically applying patches
  - **Important**: Patcher applies patches using a Docker sandbox by default, to run Patcher in a CI pipeline you should add the `--skip-container-runtime` flag
```
patcher update --non-interactive --skip-container-runtime --update-strategy=next-breaking --no-color
```
- Interactive `update` command
  - This version does not support applying patches in interactive mode
  - **Important**: to run Patcher without Docker you should add the `--skip-container-runtime` flag
```
patcher update --skip-container-runtime
```

</div>


### [v0.4.0](https://github.com/gruntwork-io/patcher-cli/releases/tag/v0.4.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/12/2023 | <a href="https://github.com/gruntwork-io/patcher-cli/releases/tag/v0.4.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  This release contains the following changes:
- Improvements to the error handling:
  -  The `--loglevel debug` parameter must be used in order to see enhanced log information, using the `GRUNTWORK_DEBUG` environment variable to see stack traces, is no longer supported
  - Panics are displayed with a generic error message
  - Most panic stack traces are now sent to Sentry, if telemetry is enabled
 - Two additional command `apply` and `generate` have been added, these commands are part of the patch authoring workflow
   - These commands will change and are not intended for customer use in this release

</div>



## repo-copier


### [v0.3.4](https://github.com/gruntwork-io/repo-copier/releases/tag/v0.3.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/28/2023 | <a href="https://github.com/gruntwork-io/repo-copier/releases/tag/v0.3.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
* Fixed &quot;filename too long&quot; error when running on Windows OS. #195 
* Added valuable links in the top of copied README files. #195
* Added a new CLI flag, `--insecure` for `bitbucket` and `azure` connectors to solve &quot;SSL certificate problem: self signed certificate in certificate chain&quot; error. #195 


**Full Changelog**: https://github.com/gruntwork-io/repo-copier/compare/v0.3.3...v0.3.4

</div>


### [v0.3.3](https://github.com/gruntwork-io/repo-copier/releases/tag/v0.3.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/24/2023 | <a href="https://github.com/gruntwork-io/repo-copier/releases/tag/v0.3.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Added new CLI flag `--use-git-global-config` to allow `repo-copier` to use specific user/system git configuration. https://github.com/gruntwork-io/repo-copier/pull/189



**Full Changelog**: https://github.com/gruntwork-io/repo-copier/compare/v0.3.2...v0.3.3

</div>


### [v0.3.2](https://github.com/gruntwork-io/repo-copier/releases/tag/v0.3.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/18/2023 | <a href="https://github.com/gruntwork-io/repo-copier/releases/tag/v0.3.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Fixed `azure` URL validation to respect underscores in the organization (collection) name. https://github.com/gruntwork-io/repo-copier/pull/184



**Full Changelog**: https://github.com/gruntwork-io/repo-copier/compare/v0.3.1...v0.3.2

</div>


### [v0.3.1](https://github.com/gruntwork-io/repo-copier/releases/tag/v0.3.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/18/2023 | <a href="https://github.com/gruntwork-io/repo-copier/releases/tag/v0.3.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Added support for Azure DevOps Server in `azure` connector in https://github.com/gruntwork-io/repo-copier/pull/182
* Added a notification to `README` files if a connector does not support copy releases in https://github.com/gruntwork-io/repo-copier/pull/182



**Full Changelog**: https://github.com/gruntwork-io/repo-copier/compare/v0.3.0...v0.3.1

</div>


### [v0.3.0](https://github.com/gruntwork-io/repo-copier/releases/tag/v0.3.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/12/2023 | <a href="https://github.com/gruntwork-io/repo-copier/releases/tag/v0.3.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Added Azure DevOps support by in https://github.com/gruntwork-io/repo-copier/pull/177
* [`--repo-visibility`](https://github.com/gruntwork-io/repo-copier/tree/v0.3.0#--repo-visibility) flag is backwards incompatible. Starting with this version, the flag does not have a static default value, instead the visibility value is taken from the original GitHub Gruntwork repository.



**Full Changelog**: https://github.com/gruntwork-io/repo-copier/compare/v0.2.5...v0.3.0

</div>



## terraform-aws-asg


### [v0.21.8](https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.21.8)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/7/2023 | Modules affected: server-group | <a href="https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.21.8">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Documentation improvements
- Updated `server-group` to support &quot;standard&quot;, &quot;gp2&quot;, &quot;gp3&quot;, &quot;io1&quot;, &quot;io2&quot;, &quot;sc1&quot;, and &quot;st1&quot; root volume types.


</div>



## terraform-aws-ci


### [v0.52.10](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.52.10)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/21/2023 | Modules affected: jenkins-server | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.52.10">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Add option to disable imdsv1 for jenkins-server. By default both imdsv1 and imdsv2 will be enabled.





</div>


### [v0.52.9](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.52.9)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/20/2023 | Modules affected: ecs-deploy-runner | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.52.9">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- updated terragrunt to v0.48.4




</div>


### [v0.52.8](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.52.8)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/18/2023 | Modules affected: ecs-deploy-runner-standard-configuration | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.52.8">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- Add `-detailed-exitcode` as a default allowed option




</div>


### [v0.52.7](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.52.7)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/14/2023 | Modules affected: ecs-deploy-runner | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.52.7">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Bump Kubergrunt


</div>


### [v0.52.6](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.52.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/4/2023 | Modules affected: ecs-deploy-runner | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.52.6">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Updated terraform-aws-lambda version used in `ecs-deploy-runner`


</div>



## terraform-aws-cis-service-catalog


### [v0.47.8](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.47.8)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/14/2023 | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.47.8">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Bump Kubergrunt


</div>


### [v0.47.7](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.47.7)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/6/2023 | Modules affected: security/aws-securityhub | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.47.7">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fix CIS v1.4 standard&apos;s arn in GovCloud regions.



</div>



## terraform-aws-control-tower


### [v0.0.2](https://github.com/gruntwork-io/terraform-aws-control-tower/releases/tag/v0.0.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/25/2023 | <a href="https://github.com/gruntwork-io/terraform-aws-control-tower/releases/tag/v0.0.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * [CORE-1111] Use top-level account requests folder by @oredavids in https://github.com/gruntwork-io/terraform-aws-control-tower/pull/2


**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-control-tower/compare/v0.0.1...v0.0.2

</div>


### [v0.0.1](https://github.com/gruntwork-io/terraform-aws-control-tower/releases/tag/v0.0.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/25/2023 | <a href="https://github.com/gruntwork-io/terraform-aws-control-tower/releases/tag/v0.0.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Add control tower modules and templates for account creation by @oredavids in https://github.com/gruntwork-io/terraform-aws-control-tower/pull/1

* @oredavids made their first contribution in https://github.com/gruntwork-io/terraform-aws-control-tower/pull/1

**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-control-tower/commits/v0.0.1

</div>



## terraform-aws-ecs


### [v0.35.9](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.35.9)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/21/2023 | Modules affected: ecs-service | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.35.9">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- `ecs-service` update to use `ordered_placement_strategy`


</div>



## terraform-aws-eks


### [v0.60.0](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.60.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/25/2023 | Modules affected: eks-aws-auth-merger, eks-cluster-control-plane, eks-k8s-cluster-autoscaler | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.60.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

Add support for EKS 1.27
Remove deprecated eks version 1.22


</div>


### [v0.59.4](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.59.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/19/2023 | Modules affected: eks-k8s-role-mapping | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.59.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Add support for AWS SSO role mapping



</div>


### [v0.59.3](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.59.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/14/2023 | Modules affected: eks-k8s-cluster-autoscaler, eks-cluster-control-plane | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.59.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Update CODEOWNERS file
- gcr.io has been deprecated in favor of registry.k8s.io
- Bump terraform-aws-utilities to [v0.9.1](https://github.com/gruntwork-io/terraform-aws-utilities/releases/tag/v0.9.1)



</div>



## terraform-aws-load-balancer


### [v0.29.10](https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.29.10)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/28/2023 | Modules affected: acm-tls-certificate | <a href="https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.29.10">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Expose key_algorithm variable on `aws_acm_certificate` resource.




</div>


### [v0.29.9](https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.29.9)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/28/2023 | Modules affected: acm-tls-certificate | <a href="https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.29.9">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- Fixes update of `subject_alternative_names` in module `acm-tls-certificate`.



</div>



## terraform-aws-monitoring


### [v0.36.2](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.36.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/14/2023 | Modules affected: alarms | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.36.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- route53-health-check-alarms: update provider syntax to implement `shared_credentials_files`




</div>



## terraform-aws-openvpn


### [v0.26.4](https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.26.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/20/2023 | Modules affected: openvpn-server | <a href="https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.26.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fixed property setting (e.g. `root_volume_size`) for root disk. #240 





</div>



## terraform-aws-service-catalog


### [v0.104.16](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.104.16)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/19/2023 | Modules affected: mgmt, networking, services | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.104.16">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Upgrade the `ecs-deploy-runner` module version
- Upgrade `terraform-aws-eks` to v0.59.3



</div>


### [v0.104.15](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.104.15)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/6/2023 | Modules affected: networking | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.104.15">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Add max_aggregation_interval and retention_in_days to vpc modules



</div>



## terraform-aws-vpc


### [v0.26.0](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.26.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/27/2023 | Modules affected: _docs, vpc-app, vpc-peering-cross-accounts-accepter, vpc-peering-cross-accounts-requester | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.26.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Added IPv6 dual stack capabilities to the vpc-app module for the VPC and public subnets
- Fixes #247 
- Fixes #330 



</div>


### [v0.25.0](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.25.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/19/2023 | Modules affected: vpc-app, vpc-mgmt | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.25.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Added IPv6 dual stack capabilities to the vpc-app module for the VPC and public subnets
- Enhancement add zachreborn codeowners
- Fixes #320 



</div>


### [v0.24.0](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.24.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/18/2023 | Modules affected: vpc-peering-cross-accounts-accepter, vpc-peering | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.24.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Added CircleCI automated test parallelism
- Removing former Grunts
- Fixes #322 



</div>


### [v0.23.3](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.23.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/7/2023 | Modules affected: vpc-flow-logs | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.23.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Feature/flow log custom s3 destination #319 
- Improved CI tests by updating all ec2 instances to t3a.nano
- Improved CI tests for VPC Flow logs by testing more configuration options



</div>




<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "releases",
  "hash": "4827202207a738576aefac9c3efb2eba"
}
##DOCS-SOURCER-END -->

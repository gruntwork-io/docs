
# Gruntwork release 2024-11

<p style={{marginTop: "-25px"}}><small><a href="/guides">Guides</a> / <a href="/guides/stay-up-to-date">Update Guides</a> / <a href="/guides/stay-up-to-date/releases">Releases</a> / 2024-11</small></p>

This page is lists all the updates to the [Gruntwork Infrastructure as Code
Library](https://gruntwork.io/infrastructure-as-code-library/) that were released in 2024-11. For instructions
on how to use these updates in your code, check out the [updating
documentation](/library/stay-up-to-date/updating).

Here are the repos that were updated:

- [patcher-cli](#patcher-cli)
- [pipelines-actions](#pipelines-actions)
- [pipelines-cli](#pipelines-cli)
- [pipelines-credentials](#pipelines-credentials)
- [pipelines-workflows](#pipelines-workflows)
- [terraform-aws-architecture-catalog](#terraform-aws-architecture-catalog)
- [terraform-aws-asg](#terraform-aws-asg)
- [terraform-aws-cache](#terraform-aws-cache)
- [terraform-aws-ci](#terraform-aws-ci)
- [terraform-aws-data-storage](#terraform-aws-data-storage)
- [terraform-aws-eks](#terraform-aws-eks)
- [terraform-aws-lambda](#terraform-aws-lambda)
- [terraform-aws-security](#terraform-aws-security)
- [terraform-aws-service-catalog](#terraform-aws-service-catalog)
- [terraform-aws-vpc](#terraform-aws-vpc)
- [terrapatch-cli](#terrapatch-cli)


## patcher-cli


### [v0.10.0](https://github.com/gruntwork-io/patcher-cli/releases/tag/v0.10.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/20/2024 | <a href="https://github.com/gruntwork-io/patcher-cli/releases/tag/v0.10.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

* Add support for a GITHUB_PUBLISH_TOKEN that can be used to separate &apos;patcher update&apos; permission sets by @ceschae in https://github.com/gruntwork-io/patcher/pull/854


* Bump go.opentelemetry.io/otel from 1.30.0 to 1.31.0 by @dependabot in https://github.com/gruntwork-io/patcher/pull/832
* Bump go.opentelemetry.io/otel/sdk from 1.28.0 to 1.31.0 by @dependabot in https://github.com/gruntwork-io/patcher/pull/831
* Bump github.com/gruntwork-io/terratest from 0.47.1 to 0.47.2 by @dependabot in https://github.com/gruntwork-io/patcher/pull/830
* Bump github.com/urfave/cli/v2 from 2.27.4 to 2.27.5 by @dependabot in https://github.com/gruntwork-io/patcher/pull/829
* Bump github.com/getsentry/sentry-go/otel from 0.22.0 to 0.29.1 by @dependabot in https://github.com/gruntwork-io/patcher/pull/834
* Bump github.com/bmatcuk/doublestar/v4 from 4.6.0 to 4.7.1 by @dependabot in https://github.com/gruntwork-io/patcher/pull/835
* Bump github.com/charmbracelet/bubbletea from 1.1.1 to 1.1.2 by @dependabot in https://github.com/gruntwork-io/patcher/pull/840
* Bump github.com/charmbracelet/lipgloss from 0.13.0 to 0.13.1 by @dependabot in https://github.com/gruntwork-io/patcher/pull/841
* fix flaky test, bump cloudwatch-dashboard to v0.36.26 by @ceschae in https://github.com/gruntwork-io/patcher/pull/844
* Bump github.com/charmbracelet/lipgloss from 0.13.1 to 1.0.0 by @dependabot in https://github.com/gruntwork-io/patcher/pull/843
* Bump go.opentelemetry.io/otel from 1.31.0 to 1.32.0 by @dependabot in https://github.com/gruntwork-io/patcher/pull/845
* Bump github.com/charmbracelet/bubbletea from 1.1.2 to 1.2.1 by @dependabot in https://github.com/gruntwork-io/patcher/pull/847
* Bump go.opentelemetry.io/otel/sdk from 1.31.0 to 1.32.0 by @dependabot in https://github.com/gruntwork-io/patcher/pull/848
* Bump github.com/hashicorp/hcl/v2 from 2.22.0 to 2.23.0 by @dependabot in https://github.com/gruntwork-io/patcher/pull/850
* Bump github.com/charmbracelet/bubbletea from 1.2.1 to 1.2.2 by @dependabot in https://github.com/gruntwork-io/patcher/pull/851
* Bump golang.org/x/oauth2 from 0.23.0 to 0.24.0 by @dependabot in https://github.com/gruntwork-io/patcher/pull/852


**Full Changelog**: https://github.com/gruntwork-io/patcher/compare/v0.9.5...v0.10.0

</div>



## pipelines-actions


### [v3.1.2](https://github.com/gruntwork-io/pipelines-actions/releases/tag/v3.1.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/15/2024 | <a href="https://github.com/gruntwork-io/pipelines-actions/releases/tag/v3.1.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Fix wrong key used for arch-catalog-repo-url by @Resonance1584 in https://github.com/gruntwork-io/pipelines-actions/pull/88
* Fix bad header by @Resonance1584 in https://github.com/gruntwork-io/pipelines-actions/pull/89
* Pin version of mise by @ZachGoldberg in https://github.com/gruntwork-io/pipelines-actions/pull/85
* Update account factory check by @oredavids in https://github.com/gruntwork-io/pipelines-actions/pull/91


**Full Changelog**: https://github.com/gruntwork-io/pipelines-actions/compare/v3.1.1...v3.1.2

</div>



## pipelines-cli


### [v0.31.2](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.31.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/14/2024 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.31.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * send jobTime if its available by @ZachGoldberg in https://github.com/gruntwork-io/pipelines/pull/255


**Full Changelog**: https://github.com/gruntwork-io/pipelines/compare/v0.31.1...v0.31.2


</div>


### [v0.31.1](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.31.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/13/2024 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.31.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Fix missing bool by @Resonance1584 in https://github.com/gruntwork-io/pipelines/pull/253
* fix: start counting time at beginning of main() to avoid losses due t… by @ZachGoldberg in https://github.com/gruntwork-io/pipelines/pull/254


**Full Changelog**: https://github.com/gruntwork-io/pipelines/compare/v0.31.0...v0.31.1


</div>


### [v0.dev633](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.dev633)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/26/2024 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.dev633">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Internal testing release


</div>



## pipelines-credentials


### [v1.0.4](https://github.com/gruntwork-io/pipelines-credentials/releases/tag/v1.0.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/12/2024 | <a href="https://github.com/gruntwork-io/pipelines-credentials/releases/tag/v1.0.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Trim fallback token by @Resonance1584 in https://github.com/gruntwork-io/pipelines-credentials/pull/8


**Full Changelog**: https://github.com/gruntwork-io/pipelines-credentials/compare/v1...v1.0.4

</div>



## pipelines-workflows


### [v3.2.1](https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v3.2.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/15/2024 | <a href="https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v3.2.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Update pipelines-actions version by @oredavids in https://github.com/gruntwork-io/pipelines-workflows/pull/97


**Full Changelog**: https://github.com/gruntwork-io/pipelines-workflows/compare/v3...v3.2.1

</div>


### [v3.2.0](https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v3.2.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/14/2024 | <a href="https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v3.2.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Record a job start time at the beginning of jobs by @ZachGoldberg in https://github.com/gruntwork-io/pipelines-workflows/pull/95


**Full Changelog**: https://github.com/gruntwork-io/pipelines-workflows/compare/v3...v3.2.0

</div>



## terraform-aws-architecture-catalog


### [v2.11.6](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.11.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/22/2024 | <a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.11.6">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * feat: Add missing vpc values to pipelines config by @Resonance1584 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1127
* fix: Add default config for tg provider cache by @ZachGoldberg in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1130
* chore: hclfmt the new bootstrap by @odgrim in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1121

**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-architecture-catalog/compare/v2.11.5...v2.11.6

</div>



## terraform-aws-asg


### [v0.21.17](https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.21.17)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/15/2024 | Modules affected: asg-rolling-deploy | <a href="https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.21.17">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- modules/asg-rolling-deploy: add mixed instances policy support for asg



</div>



## terraform-aws-cache


### [v0.23.0](https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v0.23.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/2/2024 | Modules affected: elastic-cache, redis, valkey | <a href="https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v0.23.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- fix: create security group rule per cidr block
- Add support for Valkey



</div>



## terraform-aws-ci


### [v0.59.2](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.59.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/19/2024 | Modules affected: ecs-deploy-runner, infrastructure-deployer | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.59.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fixed broken CircleCI files
- Terragrunt dependencies update
- Bump github.com/sirupsen/logrus from 1.9.0 to 1.9.3 in /modules/ecs-deploy-runner/entrypoint
- Bump github.com/gruntwork-io/terratest from 0.47.0 to 0.47.2 in /test/edrhelpers
- Bump github.com/gruntwork-io/terratest from 0.47.0 to 0.47.2 in /test/upgrade-tester
- Bump github.com/aws/aws-sdk-go-v2 from 1.18.0 to 1.32.3 in /modules/ecs-deploy-runner/docker/kaniko
- Bump github.com/aws/aws-sdk-go-v2/service/sts from 1.19.0 to 1.32.4 in /modules/ecs-deploy-runner/docker/kaniko
- Bump github.com/urfave/cli/v2 from 2.25.3 to 2.27.5 in /modules/ecs-deploy-runner/entrypoint


</div>



## terraform-aws-data-storage


### [v0.40.0](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.40.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/20/2024 | Modules affected: aurora | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.40.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Add Read Replica Auto Scaling Feature


</div>



## terraform-aws-eks


### [v0.72.0](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.72.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/4/2024 | Modules affected: eks-cluster-control-plane | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.72.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fix Typo in Variable Name
    - [**Breaking Change**] Updated variable `access_entry_poilcy_associations` name to `access_entry_policy_associations` in `eks-cluster-control-plane` module.


</div>



## terraform-aws-lambda


### [v1.0.2](https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v1.0.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/6/2024 | Modules affected: lambda-edge | <a href="https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v1.0.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- feat(lambda-edge): add optional advanced logging config variable
- Add support for env variable for lambda edge module
- Bump express in lambda example



</div>



## terraform-aws-security


### [v0.74.5](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.74.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/12/2024 | Modules affected: private-s3-bucket | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.74.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Add optional &apos;ignore_changes&apos; lifecycle block to s3 bucket policy.



</div>



## terraform-aws-service-catalog


### [v0.118.1](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.118.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/15/2024 | Modules affected: services | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.118.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- services/ecs-service: Updated terraform-aws-ecs to v0.38.3 and added pid_mode variable



</div>


### [v0.118.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.118.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/7/2024 | Modules affected: networking | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.118.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Updates alb `ssl_policy` to `ELBSecurityPolicy-TLS13-1-2-2021-06`. This removes support for TLS 1.0 and 1.1.
- Documents a breaking change from v0.115.5 (see Migration guide below)



</div>


### [v0.117.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.117.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/5/2024 | Modules affected: networking, services/eks-cluster | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.117.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fix Typo in `services/eks-cluster` variable Name
    - [**Breaking Change**] Updated variable `access_entry_poilcy_associations` name to `access_entry_policy_associations` in `services/eks-cluster` module.
    - Updated `terraform-aws-eks` to [v0.72.0](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.72.0) which contains the updated variable name that had a typo.




</div>



## terraform-aws-vpc


### [v0.27.0](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.27.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/8/2024 | Modules affected: vpc-app, network-acl-inbound, network-acl-outbound, route | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.27.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- Added Network Firewall module (beta)
- Increased Terraform Required Version to v1.3
- Added secondary EIP assignment for NAT GWs.
- Fixed README header for vpc-app module




</div>


### [v0.26.27](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.26.27)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/7/2024 | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.26.27">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Fix README header for vpc-app module by @jasonyoung-pearl in https://github.com/gruntwork-io/terraform-aws-vpc/pull/404
* Added secondary EIP assignment for NAT GWs. by @kkrav3ts in https://github.com/gruntwork-io/terraform-aws-vpc/pull/407

* @jasonyoung-pearl made their first contribution in https://github.com/gruntwork-io/terraform-aws-vpc/pull/404
* @kkrav3ts made their first contribution in https://github.com/gruntwork-io/terraform-aws-vpc/pull/407

**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-vpc/compare/v0.26.26...v0.26.27

</div>



## terrapatch-cli


### [v0.2.0](https://github.com/gruntwork-io/terrapatch-cli/releases/tag/v0.2.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 11/22/2024 | <a href="https://github.com/gruntwork-io/terrapatch-cli/releases/tag/v0.2.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Release duplicated from https://github.com/gruntwork-io/terrapatch/releases/tag/v0.2.0

</div>

<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "releases",
  "hash": "20813cbf7621adade8fd435ad5a27b7c"
}
##DOCS-SOURCER-END -->

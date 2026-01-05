
# Gruntwork release 2024-12

<p style={{marginTop: "-25px"}}><small><a href="/guides">Guides</a> / <a href="/guides/stay-up-to-date">Update Guides</a> / <a href="/guides/stay-up-to-date/releases">Releases</a> / 2024-12</small></p>

This page is lists all the updates to the [Gruntwork Infrastructure as Code
Library](https://gruntwork.io/infrastructure-as-code-library/) that were released in 2024-12. For instructions
on how to use these updates in your code, check out the [updating
documentation](/library/stay-up-to-date/updating).

Here are the repos that were updated:

- [boilerplate](#boilerplate)
- [patcher-cli](#patcher-cli)
- [pipelines-actions](#pipelines-actions)
- [pipelines-cli](#pipelines-cli)
- [pipelines-workflows](#pipelines-workflows)
- [terraform-aws-architecture-catalog](#terraform-aws-architecture-catalog)
- [terraform-aws-asg](#terraform-aws-asg)
- [terraform-aws-ci](#terraform-aws-ci)
- [terraform-aws-data-storage](#terraform-aws-data-storage)
- [terraform-aws-eks](#terraform-aws-eks)
- [terraform-aws-load-balancer](#terraform-aws-load-balancer)
- [terraform-aws-monitoring](#terraform-aws-monitoring)
- [terraform-aws-security](#terraform-aws-security)
- [terraform-aws-service-catalog](#terraform-aws-service-catalog)
- [terraform-aws-static-assets](#terraform-aws-static-assets)
- [terraform-aws-vpc](#terraform-aws-vpc)


## boilerplate


### [v0.6.0](https://github.com/gruntwork-io/boilerplate/releases/tag/v0.6.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/11/2024 | <a href="https://github.com/gruntwork-io/boilerplate/releases/tag/v0.6.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- Added support for manual inputs other than strings or enums. The command line will now prompt the user for input for `int`, `float`, `bool`, `list`, and `map` variable types.
- Fixed manual input using `&lt;no value&gt;` if a default does not exist. User will be prompted again instead.
- Changed the visual appearance of the manual input to closer match the example.



This change will cause users to be prompted for more types of variables, and may find that they are required to populate Default values in more situations. If you have been relying on a variable that will now require manual input, but you want to use the Default, you will need to add the `--non-interactive` flag to prevent the prompt.

**Full Changelog**: https://github.com/gruntwork-io/boilerplate/compare/v0.5.19...v0.6.0

</div>



## patcher-cli


### [v0.11.1](https://github.com/gruntwork-io/patcher-cli/releases/tag/v0.11.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/17/2024 | <a href="https://github.com/gruntwork-io/patcher-cli/releases/tag/v0.11.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Bump github.com/getsentry/sentry-go/otel from 0.29.1 to 0.30.0 by @dependabot in https://github.com/gruntwork-io/patcher/pull/866
* upgrade golang.org/x/crypto to v0.31.0 by @ceschae in https://github.com/gruntwork-io/patcher/pull/867

Release duplicated from https://github.com/gruntwork-io/patcher/releases/tag/v0.11.1

</div>


### [v0.11.0](https://github.com/gruntwork-io/patcher-cli/releases/tag/v0.11.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/6/2024 | <a href="https://github.com/gruntwork-io/patcher-cli/releases/tag/v0.11.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

* move `--non-interactive` to just `patcher update` by @ceschae in https://github.com/gruntwork-io/patcher/pull/864


* Bump github.com/charmbracelet/bubbletea from 1.2.2 to 1.2.3 by @dependabot in https://github.com/gruntwork-io/patcher/pull/861
* Bump github.com/stretchr/testify from 1.9.0 to 1.10.0 by @dependabot in https://github.com/gruntwork-io/patcher/pull/860
* Bump github.com/Masterminds/semver/v3 from 3.3.0 to 3.3.1 by @dependabot in https://github.com/gruntwork-io/patcher/pull/859
* Bump github.com/zclconf/go-cty from 1.15.0 to 1.15.1 by @dependabot in https://github.com/gruntwork-io/patcher/pull/862
* Bump github.com/charmbracelet/bubbletea from 1.2.3 to 1.2.4 by @dependabot in https://github.com/gruntwork-io/patcher/pull/863


**Full Changelog**: https://github.com/gruntwork-io/patcher/compare/v0.10.0...v0.11.0

(Release duplicated from https://github.com/gruntwork-io/patcher/releases/tag/v0.11.0)

</div>



## pipelines-actions


### [v3.3.0](https://github.com/gruntwork-io/pipelines-actions/releases/tag/v3.3.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/19/2024 | <a href="https://github.com/gruntwork-io/pipelines-actions/releases/tag/v3.3.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Propegate disable_macie/security_hub/guardduty to accounts.yml  by @ZachGoldberg in https://github.com/gruntwork-io/pipelines-actions/pull/105


**Full Changelog**: https://github.com/gruntwork-io/pipelines-actions/compare/v3.2.0...v3.2.1

</div>


### [v3.2.0](https://github.com/gruntwork-io/pipelines-actions/releases/tag/v3.2.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/4/2024 | <a href="https://github.com/gruntwork-io/pipelines-actions/releases/tag/v3.2.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * DEV-633 - Use pipelines cli to drive config logic by @ZachGoldberg in https://github.com/gruntwork-io/pipelines-actions/pull/92

**Full Changelog**: https://github.com/gruntwork-io/pipelines-actions/compare/v3.1.2...v3.2.0

</div>



## pipelines-cli


### [v0.34.0](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.34.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/9/2024 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.34.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Add granted instructions to readme by @Resonance1584 in https://github.com/gruntwork-io/pipelines/pull/266
* Add scm merge request by @oredavids in https://github.com/gruntwork-io/pipelines/pull/265
* Implement get change request for commit by @Resonance1584 in https://github.com/gruntwork-io/pipelines/pull/267


**Full Changelog**: https://github.com/gruntwork-io/pipelines/compare/v0.33.0...v0.34.0


</div>


### [v0.33.0](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.33.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/5/2024 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.33.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * GitLab stubs by @Resonance1584 in https://github.com/gruntwork-io/pipelines/pull/263
* Cleanup old integration test secrets by @Resonance1584 in https://github.com/gruntwork-io/pipelines/pull/252
* Remove unused stdout from orchestrate. Use structured output instead by @Resonance1584 in https://github.com/gruntwork-io/pipelines/pull/260
* Remove external binary versions from telemetry by @Resonance1584 in https://github.com/gruntwork-io/pipelines/pull/258
* Dont trigger HCLChanged when its a config file by @Resonance1584 in https://github.com/gruntwork-io/pipelines/pull/262


**Full Changelog**: https://github.com/gruntwork-io/pipelines/compare/v0.32.0...v0.33.0


</div>


### [v0.32.0](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.32.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/4/2024 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.32.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * DEV-663 - Implement reading config.yml in the binary instead of fragile bash code by @ZachGoldberg in https://github.com/gruntwork-io/pipelines/pull/257

**Full Changelog**: https://github.com/gruntwork-io/pipelines/compare/v0.31.2...v0.32.0


</div>


### [v0.27.0-patch1](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.27.0-patch1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/11/2024 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.27.0-patch1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
Fix invalid session names generated when a pull request has been created by a GitHub App. This fix was backported from v0.29.0. When a GitHub App creates a pull request the author name contains `[bot]`. The `[` and `]` characters are invalid when used in an AWS session name. This change removes the `[bot]` suffix from the author name used in the session name.


</div>



## pipelines-workflows


### [v3.5.0](https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v3.5.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/19/2024 | <a href="https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v3.5.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
This release contains an update to account factory to forward the boolean values `disable_macie` `disable_security_hub` and `disable_guardduty` from the new account request files to the `accounts.yml` file.  This allows terragrunt units in infra-live to more easily access these three per-account configuration options and adjust their inputs appropriately.

Namely, in `terraform-aws-architecture-catalog`  `v2.12.0` we update the functionality of the `logs` account to read these values and disable the `macie` and `security_hub` modules, which prevents invites from being sent to accounts that don&apos;t have those features enabled.  This isn&apos;t strictlty required, as previously the invites were sent and never accepted, but this reduces the number of resources provisioned and makes the real world infrastructure better match the intent of the IaC.  

Bump to pipelines-actions v3.3.0

**Full Changelog**: https://github.com/gruntwork-io/pipelines-workflows/compare/v3...v3.5.0

</div>


### [v3.4.0](https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v3.4.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/9/2024 | <a href="https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v3.4.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- Fixed a bug where changes to [Pipelines Configurations as Code](https://docs.gruntwork.io/2.0/reference/pipelines/configurations-as-code/) would trigger pipelines plan / apply to be run. These operations were no-ops as no infrastructure was changed, but were unnecessarily using github action minutes.
- Improved startup time for PipelinesCLI by removing terragrunt/tofu/terraform version checks when not running execute. This improves overall pipelines run time.

</div>


### [v3.3.0](https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v3.3.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/4/2024 | <a href="https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v3.3.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
Pipelines uses a concept of &quot;Gruntwork Context&quot; which is basically a large bundle of runtime context and pipelines configuration.  Generating this context was several hundred lines of bash which included both simple read-and-store logic as well as sophisticated business logic. That code hard to test and a source of many bugs. This release includes a new implementation of all of that logic built into our pipelines binary (written in GoLang), which allows us to unit test the behavior and drive performance improvements over time. 

Customers will likely not notice any chance with this release other than maybe 1-2 faster runs in some cases, and ideally fewer corner-case bugs based on less commonly used configurations.

* DEV-663: Bump version of actions that uses binary for reading config by @ZachGoldberg in https://github.com/gruntwork-io/pipelines-workflows/pull/100


**Full Changelog**: https://github.com/gruntwork-io/pipelines-workflows/compare/v3...v3.3.0

</div>



## terraform-aws-architecture-catalog


### [v2.12.0](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.12.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/19/2024 | <a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.12.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * feat: disable macie and security_hub based on accounts.yml config by @ZachGoldberg in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1131


**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-architecture-catalog/compare/v2.11.6...v2.11.7

</div>



## terraform-aws-asg


### [v0.21.18](https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.21.18)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/13/2024 | Modules affected: server-group | <a href="https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.21.18">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- AWS ASG Scaling parameters Update



</div>



## terraform-aws-ci


### [v0.59.4](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.59.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/16/2024 | Modules affected: infrastructure-deployer | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.59.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Bump github.com/fatih/color from 1.13.0 to 1.18.0 in /modules/infrastructure-deployer



</div>


### [v0.59.3](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.59.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/12/2024 | Modules affected: ecs-deploy-runner, infrastructure-deployer | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.59.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- build(deps): Bump github.com/urfave/cli/v2 from 2.27.4 to 2.27.5 in /modules/ecs-deploy-runner/docker/kaniko
- build(deps): Bump github.com/urfave/cli/v2 from 2.10.3 to 2.27.5 in /modules/infrastructure-deployer
- build(deps): Bump github.com/aws/aws-sdk-go-v2 from 1.32.4 to 1.32.6 in /modules/ecs-deploy-runner/docker/kaniko


</div>



## terraform-aws-data-storage


### [v0.40.2](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.40.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/21/2024 | Modules affected: aurora | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.40.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Add Aurora Cluster and Instance level tagging



</div>


### [v0.40.1](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.40.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/18/2024 | Modules affected: aurora | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.40.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Address dependabot, fix terraform variable validation error message



</div>



## terraform-aws-eks


### [v0.72.3](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.72.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/20/2024 | Modules affected: eks-k8s-karpenter | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.72.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Add optional future config values to allow for easier migration 



</div>


### [v0.72.2](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.72.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/13/2024 | Modules affected: eks-cluster-control-plane | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.72.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fix Duplicate Access Entries for Cluster Creator
- Add support for upgrade policy
  - [**Breaking Change**] This is a breaking change. Upgrading to this version requires upgrading the AWS Terraform Provider to &gt;= 5.61.0. This version of the AWS Provider is the minimum version that supports the upgrade_policy configuration block.



</div>


### [v0.72.1](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.72.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/5/2024 | Modules affected: eks-alb-ingress-controller-iam-policy, eks-alb-ingress-controller, eks-aws-auth-merger, eks-cloudwatch-agent | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.72.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Expose tags for all supported resources with associated variables. 



</div>



## terraform-aws-load-balancer


### [v0.30.1](https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.30.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/18/2024 | <a href="https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.30.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Address dependabot updates in tests





</div>


### [v0.30.0](https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.30.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/18/2024 | Modules affected: alb | <a href="https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.30.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Added Default Action Definition for each Protocol:Port Combination



</div>



## terraform-aws-monitoring


### [v0.36.27](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.36.27)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/13/2024 | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.36.27">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Address dependabot alerts





</div>



## terraform-aws-security


### [v0.75.0](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.75.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/16/2024 | Modules affected: aws-config | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.75.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- modules/aws-config: add use_global_record_region to provide flexibility in recording_group behavior




</div>


### [v0.74.6](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.74.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/11/2024 | Modules affected: private-s3-bucket | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.74.6">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Added example of SSM with SOPS.
- Added a simpler way to provide a bucket policy from file.


</div>



## terraform-aws-service-catalog


### [v0.118.7](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.118.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/23/2024 | Modules affected: landingzone | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.118.6">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- modules/landingzone: Add an optional child_accounts_yaml var to root account baseline
- tests: Bump golang.org/x/crypto from 0.27.0 to 0.31.0



</div>


### [v0.118.5](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.118.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/19/2024 | Modules affected: networking | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.118.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- `networking`


- Change public_apex_record default alias field from null to empty map


Special thanks to the following users for their contribution!

- @tmyhres


- https://github.com/gruntwork-io/terraform-aws-service-catalog/pull/2187



</div>


### [v0.118.4](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.118.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/11/2024 | Modules affected: landingzone | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.118.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Add support for `insight_selector` where cloudtrail used



</div>


### [v0.118.3](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.118.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/10/2024 | Modules affected: services | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.118.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- services/ecs-cluster: update terraform-aws-monitoring version





</div>


### [v0.118.2](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.118.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/6/2024 | Modules affected: data-stores, networking, services | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.118.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Add pass through variables for too_many_db_connections and high_cp…u_utilization alarm settings
- Add patch for eu-central-2 support for a few modules
- Update terraform-aws-eks to [v0.72.1](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.72.1)
    - Expose Resource Tags For All Supported EKS Resources 




</div>



## terraform-aws-static-assets


### [v0.19.1](https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.19.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/18/2024 | <a href="https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.19.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Address dependabot alerts



</div>


### [v0.19.0](https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.19.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/2/2024 | Modules affected: cloudfront | <a href="https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.19.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- Added Custom Origins for Cloudfront
- Split &quot;monolithic&quot; test package into several parallel test steps.

New Terraform module implements a CloudFront Distribution that supports custom origins and serves as an extensible foundation for a generic CloudFront module compatible with all origin types. The module incorporates 90%+ feature coverage and utilizes current attributes and structures, avoiding deprecated elements.


</div>



## terraform-aws-vpc


### [v0.28.1](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.28.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/18/2024 | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.28.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Address dependabot




</div>


### [v0.28.0](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.28.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/2/2024 | Modules affected: network-firewall, vpc-app-network-acls | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.28.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- Added allow_private_persistence_internet_access flag to control NACL behavior.
- Split a big set of tests into smaller subsets.


</div>

<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "releases",
  "hash": "04352463150f35ee8dfa81e7262cac00"
}
##DOCS-SOURCER-END -->

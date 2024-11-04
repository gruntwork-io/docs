
# Gruntwork release 2024-01

<p style={{marginTop: "-25px"}}><small><a href="/guides">Guides</a> / <a href="/guides/stay-up-to-date">Update Guides</a> / <a href="/guides/stay-up-to-date/releases">Releases</a> / 2024-01</small></p>

This page is lists all the updates to the [Gruntwork Infrastructure as Code
Library](https://gruntwork.io/infrastructure-as-code-library/) that were released in 2024-01. For instructions
on how to use these updates in your code, check out the [updating
documentation](/library/stay-up-to-date/updating).

Here are the repos that were updated:

- [boilerplate](#boilerplate)
- [pipelines-cli](#pipelines-cli)
- [repo-copier](#repo-copier)
- [terraform-aws-architecture-catalog](#terraform-aws-architecture-catalog)
- [terraform-aws-asg](#terraform-aws-asg)
- [terraform-aws-cis-service-catalog](#terraform-aws-cis-service-catalog)
- [terraform-aws-control-tower](#terraform-aws-control-tower)
- [terraform-aws-ecs](#terraform-aws-ecs)
- [terraform-aws-eks](#terraform-aws-eks)
- [terraform-aws-lambda](#terraform-aws-lambda)
- [terraform-aws-load-balancer](#terraform-aws-load-balancer)
- [terraform-aws-messaging](#terraform-aws-messaging)
- [terraform-aws-monitoring](#terraform-aws-monitoring)
- [terraform-aws-security](#terraform-aws-security)
- [terraform-aws-service-catalog](#terraform-aws-service-catalog)
- [terraform-aws-vpc](#terraform-aws-vpc)


## boilerplate


### [v0.5.9](https://github.com/gruntwork-io/boilerplate/releases/tag/v0.5.9)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/26/2024 | <a href="https://github.com/gruntwork-io/boilerplate/releases/tag/v0.5.9">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Add support for &apos;dir&apos; param in hooks. Fix bug with var parsing. by @brikis98 in https://github.com/gruntwork-io/boilerplate/pull/153


**Full Changelog**: https://github.com/gruntwork-io/boilerplate/compare/v0.5.8...v0.5.9

</div>



## pipelines-cli


### [v0.5.1](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.5.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/18/2024 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.5.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Release duplicated from https://github.com/gruntwork-io/pipelines/releases/tag/v0.5.1

</div>


### [v0.5.0](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.5.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/16/2024 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.5.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Release duplicated from https://github.com/gruntwork-io/pipelines/releases/tag/v0.5.0

</div>


### [v0.4.0](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.4.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/9/2024 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.4.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Release duplicated from https://github.com/gruntwork-io/pipelines/releases/tag/v0.4.0

</div>


### [v0.3.0](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.3.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/9/2024 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.3.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Release duplicated from https://github.com/gruntwork-io/pipelines/releases/tag/v0.3.0

</div>



## repo-copier


### [v0.4.4](https://github.com/gruntwork-io/repo-copier/releases/tag/v0.4.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/23/2024 | <a href="https://github.com/gruntwork-io/repo-copier/releases/tag/v0.4.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Prevent repo path from being converted to lower case. by @levkohimins in https://github.com/gruntwork-io/repo-copier/pull/248

**Full Changelog**: https://github.com/gruntwork-io/repo-copier/compare/v0.4.3...v0.4.4

</div>



## terraform-aws-architecture-catalog


### [v2.0.0-alpha](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.0.0-alpha)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/24/2024 | <a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.0.0-alpha">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

This release introduces a couple changes that significantly alter how the architecture catalog works with respect to the templates for vended accounts.

1. The account vending process now supports delegated `infrastructure-live` repositories. These are repositories that are granted limited control over a subset of the total AWS accounts managed within a central `infrastructure-live` repository. These delegated repositories currently include the following:
  a. SDLC repositories: These are repositories that control the Software Delivery Lifecycle (dev/stage/prod) for particular teams. The baselines for the relevant accounts are still managed within the main `infrastructure-live` repository, but the application workloads can now be managed by `infrastructure-live-&lt;TEAM NAME&gt;` repositories that only have control over their particular workloads.
  b. Sandbox repositories: These are repositories that are vended by the main `infrastructure-live` repository and are the same as the SDLC repositories with the exception that they only have one account.
2. IAM roles used for CI within `infrastructure-pipelines` have been renamed to better reflect the limits of their capabilities and to introduce a new set of roles that are assumed exclusively by `infrastructure-pipelines` when configuration updates are made in delegated repos.
3. A new set of IAM roles called `pipelines-pre-auth` roles have been added as a control mechanism for authorizing requests made to the `infrastructure-pipelines` repository from `infrastructure-live` repositories. This is done by the controls documented [here](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/tree/main/templates/infra-pipelines-base#confirming-calling-repo).
4. Automatically looking up Control Tower provisioning artifact ID instead of requiring it to be passed as input. 
5. Added check to ensure that `infrastructure-live` repos do not dispatch workflows to `infrastructure-pipelines` if they are behind `main` to ensure the integrity of `pipelines-execute` actions.


1. Added retries for intermittent errors that can be encountered when using Control Tower modules for provisioning Macie resources.
2. Increased default timeout for Control Tower.
3. Added retries for state locks to ensure that concurrent attempts to make the same state update wait instead of immediately failing.
4. Added logic to ensure that state resources are provisioned prior to attempts to make updates in new accounts.

**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-architecture-catalog/compare/v1.3.3...v2.0.0

</div>


### [v1.3.3](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v1.3.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/11/2024 | <a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v1.3.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Updating `pipelines-execute` version to `2.1.1` by @yhakbar in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/961


**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-architecture-catalog/compare/v1.3.2...v1.3.3

</div>


### [v1.3.2](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v1.3.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/11/2024 | <a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v1.3.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Setting up three-tier tagging solution for infra-live-central by @yhakbar in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/945
* Adding pre-apply init to avoid race condition with multiple simultaneous state resource creations by @yhakbar in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/960


**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-architecture-catalog/compare/v1.3.1...v1.3.2

</div>



## terraform-aws-asg


### [v0.21.12](https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.21.12)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/22/2024 | Modules affected: server-group | <a href="https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.21.12">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Updates the `server-group` module to make `block_device_mapping` optional (you can toggle disable with the var enable_block_device_mappings)




</div>



## terraform-aws-cis-service-catalog


### [v0.48.3](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.48.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/31/2024 | Modules affected: networking | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.48.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Feature - exposing the secondary_cidr_blocks argument



</div>



## terraform-aws-control-tower


### [v0.4.2](https://github.com/gruntwork-io/terraform-aws-control-tower/releases/tag/v0.4.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/26/2024 | <a href="https://github.com/gruntwork-io/terraform-aws-control-tower/releases/tag/v0.4.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- `boilerplate-single-account-baseline`


- Fixed `pipelines-pre-auth-role` dependency in `single-account-baseline`


- https://github.com/gruntwork-io/terraform-aws-control-tower/pull/54

</div>


### [v0.4.1](https://github.com/gruntwork-io/terraform-aws-control-tower/releases/tag/v0.4.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/26/2024 | <a href="https://github.com/gruntwork-io/terraform-aws-control-tower/releases/tag/v0.4.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- `boilerplate-single-account-baseline`


- Added VPC skip flag in single account baselining.


- https://github.com/gruntwork-io/terraform-aws-control-tower/pull/53

</div>


### [v0.4.0](https://github.com/gruntwork-io/terraform-aws-control-tower/releases/tag/v0.4.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/16/2024 | <a href="https://github.com/gruntwork-io/terraform-aws-control-tower/releases/tag/v0.4.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
Updates the single account baseline template by:
- Renaming pipelines permissions
- Adds permissions for accounts vended into team-infra-live repos
- Adds pipelines pre-auth role


- https://github.com/gruntwork-io/terraform-aws-control-tower/pull/51


Ensure that the`envcommon` files listed below are available in the infrastructure-live repo where a new account will be vended into:

1. _envcommon/landingzone/central-pipelines-apply-role.hcl
2. _envcommon/landingzone/central-pipelines-plan-role.hcl
3. _envcommon/landingzone/github-actions-openid-connect-provider.hcl
4. _envcommon/landingzone/pipelines-policy-apply-update-role.hcl
5. _envcommon/landingzone/pipelines-policy-plan-update-role.hcl
6. _envcommon/landingzone/pipelines-pre-auth-plan-role.hcl
7. _envcommon/landingzone/team-pipelines-apply-role.hcl (**If vending SDLC accounts**)
8. _envcommon/landingzone/team-pipelines-plan-role.hcl (**If vending SDLC accounts**)



</div>


### [v0.3.1](https://github.com/gruntwork-io/terraform-aws-control-tower/releases/tag/v0.3.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/11/2024 | Modules affected: landingzone | <a href="https://github.com/gruntwork-io/terraform-aws-control-tower/releases/tag/v0.3.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- `landingzone`


- Mitigating Terraform optimization bug when `accounts.yml` is homogeneous.



</div>



## terraform-aws-ecs


### [v0.35.14](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.35.14)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/24/2024 | Modules affected: ecs-cluster | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.35.14">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- ecs-cluster: Updated default EBS storage type to gp3 for cluster nodes



</div>



## terraform-aws-eks


### [v0.65.5](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.65.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/20/2024 | Modules affected: eks-alb-ingress-controller-iam-policy, eks-alb-ingress-controller, eks-aws-auth-merger | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.65.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fix ingress controller policy to allow non-default partitions (govcloud)
- Bump upgrade-tests (CI Module) - [CORE-1384]
- Bump golang.org/x/crypto from 0.14.0 to 0.17.0 in /modules/eks-aws-auth-merger/aws-auth-merger



</div>


### [v0.65.4](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.65.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/12/2024 | Modules affected: eks-container-logs | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.65.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Expose `input.*` and `extraInputs`




</div>


### [v0.65.3](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.65.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/9/2024 | Modules affected: eks-k8s-karpenter | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.65.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Expose Karpenter instance profile arn output



</div>



## terraform-aws-lambda


### [v0.21.18](https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.21.18)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/31/2024 | Modules affected: api-gateway-proxy | <a href="https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.21.18">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Add ability to set security policy for API Gateway Domain Name


</div>


### [v0.21.17](https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.21.17)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/23/2024 | Modules affected: api-gateway-proxy, lambda, lambda-http-api-gateway | <a href="https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.21.17">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- lambda-http-api-gateway: Add support for authorization_type
- examples/lambda-build: updated build dependencies



</div>



## terraform-aws-load-balancer


### [v0.29.21](https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.29.21)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/2/2024 | Modules affected: alb | <a href="https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.29.21">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- alb: expose `desync_mitigation_mode` variable so it can be set and changed as-needed




</div>



## terraform-aws-messaging


### [v0.12.5](https://github.com/gruntwork-io/terraform-aws-messaging/releases/tag/v0.12.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/11/2024 | <a href="https://github.com/gruntwork-io/terraform-aws-messaging/releases/tag/v0.12.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Fix upgrade-tests (CI Module) - [CORE-1384] by @arsci in https://github.com/gruntwork-io/terraform-aws-messaging/pull/141
* [skip-ci] Update CODEOWNERS by @ellisonc in https://github.com/gruntwork-io/terraform-aws-messaging/pull/143
* Add Terrascan to CI - CORE-1371 by @arsci in https://github.com/gruntwork-io/terraform-aws-messaging/pull/144
* feat(sns): add fifo topic support by @bt-macole in https://github.com/gruntwork-io/terraform-aws-messaging/pull/147

* @ellisonc made their first contribution in https://github.com/gruntwork-io/terraform-aws-messaging/pull/143
* @bt-macole made their first contribution in https://github.com/gruntwork-io/terraform-aws-messaging/pull/147

**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-messaging/compare/v0.12.4...v0.12.5

</div>



## terraform-aws-monitoring


### [v0.36.11](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.36.11)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/10/2024 | Modules affected: logs | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.36.11">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- load-balancer-access-logs: Use service principal for new regions created since 2022





</div>



## terraform-aws-security


### [v0.70.2](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.70.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/18/2024 | Modules affected: github-actions-iam-role | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.70.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- `github-actions-iam-role`


- Set condition to `repo:$&#x7B;repo&#x7D;:*` instead of `repo:$&#x7B;repo&#x7D;:ref:refs/heads/*` when branch is `*` to ensure that PR branches are able to assume the OIDC role as well.


- https://github.com/gruntwork-io/terraform-aws-security/pull/802


</div>


### [v0.70.1](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.70.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/12/2024 | Modules affected: github-actions-iam-role | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.70.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- `github-actions-iam-role`


- Add flag to github_actions_openid_connect_provider outputs to allow the create var to be set to false again


Special thanks to the following users for their contribution!

- @bl-robinson


- https://github.com/gruntwork-io/terraform-aws-security/pull/801

</div>


### [v0.70.0](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.70.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/10/2024 | Modules affected: aws-config-multi-region, ebs-encryption-multi-region, guardduty-multi-region, iam-access-analyzer-multi-region | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.70.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- `aws-config-multi-region`
- `ebs-encryption-multi-region`
- `guardduty-multi-region`
- `iam-access-analyzer-multi-region`
- `kms-grant-multi-region`
- `kms-master-key-multi-region`
- `aws-config`
- `github-actions-iam-role`
- `github-actions-openid-connect-provider` (**New**)




- Fix upgrade-tests (CI Module)
- Update CODEOWNERS
- Add Terrascan to CI
- Add CMK policy to aws config module
- Extract GitHub OIDC provider resource into separate module


- https://github.com/gruntwork-io/terraform-aws-security/pull/792
- https://github.com/gruntwork-io/terraform-aws-security/pull/793
- https://github.com/gruntwork-io/terraform-aws-security/pull/794
- https://github.com/gruntwork-io/terraform-aws-security/pull/796
- https://github.com/gruntwork-io/terraform-aws-security/pull/799



</div>



## terraform-aws-service-catalog


### [v0.108.4](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.108.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/31/2024 | Modules affected: networking | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.108.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Enhancement/vpc_secondary_cidr_blocks



</div>


### [v0.108.3](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.108.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/26/2024 | Modules affected: services | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.108.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- ecs-cluster: Expose delete on termination for EBS volumes via var `cluster_instance_ebs_delete_on_termination`





</div>


### [v0.108.2](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.108.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/19/2024 | Modules affected: data-stores/aurora | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.108.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Expose `ca_cert_identifier` to enable certificate rotation



</div>


### [v0.108.1](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.108.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/18/2024 | Modules affected: data-stores/ecr-repos | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.108.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Add support for explicit deny rules for ECR repos.



</div>


### [v0.108.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.108.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/15/2024 | Modules affected: mgmt, networking, services | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.108.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Add Support for EKS 1.28



</div>



## terraform-aws-vpc


### [v0.26.17](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.26.17)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/31/2024 | Modules affected: vpc-app | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.26.17">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Feature - VPC Secondary CIDR Blocks



</div>


### [v0.26.16](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.26.16)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/11/2024 | Modules affected: vpc-app-lookup, vpc-app | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.26.16">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- `vpc-app-lookup`
- `vpc-app`



- Updating `private_persistence_subnet_arn` to `private_persistence_subnet_arns` as it&apos;s a list of ARNs. Note that to preserve backwards compatibility, `private_persistence_subnet_arn` has been deprecated instead of being removed.
- Fixing Amazon Linux AMI lookup


- https://github.com/gruntwork-io/terraform-aws-vpc/pull/371
- https://github.com/gruntwork-io/terraform-aws-vpc/pull/375



</div>




<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "releases",
  "hash": "9e0bf82e4386d0918bdd7d68e47951fe"
}
##DOCS-SOURCER-END -->

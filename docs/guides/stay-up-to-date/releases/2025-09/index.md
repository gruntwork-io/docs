
# Gruntwork release 2025-09

<p style={{marginTop: "-25px"}}><small><a href="/guides">Guides</a> / <a href="/guides/stay-up-to-date">Update Guides</a> / <a href="/guides/stay-up-to-date/releases">Releases</a> / 2025-09</small></p>

This page is lists all the updates to the [Gruntwork Infrastructure as Code
Library](https://gruntwork.io/infrastructure-as-code-library/) that were released in 2025-09. For instructions
on how to use these updates in your code, check out the [updating
documentation](/library/stay-up-to-date/updating).

Here are the repos that were updated:

- [boilerplate](#boilerplate)
- [patcher-cli](#patcher-cli)
- [terraform-aws-control-tower](#terraform-aws-control-tower)
- [terraform-aws-eks](#terraform-aws-eks)
- [terraform-aws-load-balancer](#terraform-aws-load-balancer)
- [terraform-aws-security](#terraform-aws-security)
- [terraform-aws-server](#terraform-aws-server)
- [terraform-aws-service-catalog](#terraform-aws-service-catalog)


## boilerplate


### [v0.10.0](https://github.com/gruntwork-io/boilerplate/releases/tag/v0.10.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/4/2025 | <a href="https://github.com/gruntwork-io/boilerplate/releases/tag/v0.10.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
Numerous breaking changes have taken place through the integration of fixes related to findings of `golangci-lint`, which is now integrated into the codebase.

Public structs that previously had fields that did not obey standard Golang practices for casing have been updated to consistently follow best practices.

e.g.

```go
// The command-line options for the boilerplate app
type BoilerplateOptions struct &#x7B;
	TemplateUrl string
	TemplateFolder string
	OutputFolder            string
	NonInteractive          bool
	Vars                    map[string]interface&#x7B;&#x7D;
	OnMissingKey            MissingKeyAction
	OnMissingConfig         MissingConfigAction
	NoHooks                 bool
	NoShell                 bool
	DisableDependencyPrompt bool
	ExecuteAllShellCommands bool
	ShellCommandAnswers map[string]bool
&#x7D;
```

Is now:

```go
// BoilerplateOptions represents the command-line options for the boilerplate app
type BoilerplateOptions struct &#x7B;
	Vars                    map[string]any
	ShellCommandAnswers     map[string]bool
	TemplateURL             string
	TemplateFolder          string
	OutputFolder            string
	OnMissingKey            MissingKeyAction
	OnMissingConfig         MissingConfigAction
	NonInteractive          bool
	NoHooks                 bool
	NoShell                 bool
	DisableDependencyPrompt bool
	ExecuteAllShellCommands bool
&#x7D;
```

Renaming `TemplateUrl` to `TemplateURL` follows the Golang best practice of using all caps for initialisms, and the `golangci-lint` linter will enforce this practice going forward for all variables. Note that this change also resulted in the shuffling of some struct fields to obey the best practice recommended by the `fieldalignment` linter in `govet`, which minimizes the size of structs by properly aligning the field values to reduce padding.

Finally, variables available in templates with improper casing like `TemplateUrl` have been updated to `TemplateURL` to continue this pattern of obeying best practices, but `TemplateUrl` is backwards compatible for the foreseeable future. We may decide to announce deprecation and removal at a later date.

These breaking changes should only require action on your end if you rely on Boilerplate as a Golang library, not as a standalone binary.

* fix: Fix nested map conversion in ConvertType by @pseudomorph in https://github.com/gruntwork-io/boilerplate/pull/238
* fix: Fix int - str conversion. by @pseudomorph in https://github.com/gruntwork-io/boilerplate/pull/236
* docs: Document dynamic file naming (Advanced use cases) [LIB-3473] by @devin-ai-integration[bot] in https://github.com/gruntwork-io/boilerplate/pull/244
* chore: Adding quality controls by @yhakbar in https://github.com/gruntwork-io/boilerplate/pull/240

* @devin-ai-integration[bot] made their first contribution in https://github.com/gruntwork-io/boilerplate/pull/244

**Full Changelog**: https://github.com/gruntwork-io/boilerplate/compare/v0.9.0...v0.10.0

</div>



## patcher-cli


### [v0.16.0](https://github.com/gruntwork-io/patcher-cli/releases/tag/v0.16.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/15/2025 | <a href="https://github.com/gruntwork-io/patcher-cli/releases/tag/v0.16.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Release duplicated from https://github.com/gruntwork-io/patcher/releases/tag/v0.16.0

</div>


### [v0.15.3-alpha5](https://github.com/gruntwork-io/patcher-cli/releases/tag/v0.15.3-alpha5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/13/2025 | <a href="https://github.com/gruntwork-io/patcher-cli/releases/tag/v0.15.3-alpha5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Release duplicated from https://github.com/gruntwork-io/patcher/releases/tag/v0.15.3-alpha5

</div>


### [v0.15.3-alpha4](https://github.com/gruntwork-io/patcher-cli/releases/tag/v0.15.3-alpha4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/12/2025 | <a href="https://github.com/gruntwork-io/patcher-cli/releases/tag/v0.15.3-alpha4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Release duplicated from https://github.com/gruntwork-io/patcher/releases/tag/v0.15.3-alpha4

</div>


### [v0.15.3-alpha3](https://github.com/gruntwork-io/patcher-cli/releases/tag/v0.15.3-alpha3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/12/2025 | <a href="https://github.com/gruntwork-io/patcher-cli/releases/tag/v0.15.3-alpha3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Release duplicated from https://github.com/gruntwork-io/patcher/releases/tag/v0.15.3-alpha3

</div>


### [v0.15.3-alpha2](https://github.com/gruntwork-io/patcher-cli/releases/tag/v0.15.3-alpha2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/12/2025 | <a href="https://github.com/gruntwork-io/patcher-cli/releases/tag/v0.15.3-alpha2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Release duplicated from https://github.com/gruntwork-io/patcher/releases/tag/v0.15.3-alpha2

</div>


### [v0.15.3-alpha](https://github.com/gruntwork-io/patcher-cli/releases/tag/v0.15.3-alpha)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/12/2025 | <a href="https://github.com/gruntwork-io/patcher-cli/releases/tag/v0.15.3-alpha">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Release duplicated from https://github.com/gruntwork-io/patcher/releases/tag/v0.15.3-alpha

</div>



## terraform-aws-control-tower


### [v1.0.3](https://github.com/gruntwork-io/terraform-aws-control-tower/releases/tag/v1.0.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/25/2025 | Modules affected: landingzone | <a href="https://github.com/gruntwork-io/terraform-aws-control-tower/releases/tag/v1.0.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- landingzone/control-tower-provisioned-product-artifact-updater: Update permissions used by worker lambda that were preventing Account Factory updates from completing





</div>


### [v1.0.2](https://github.com/gruntwork-io/terraform-aws-control-tower/releases/tag/v1.0.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/10/2025 | Modules affected: landingzone | <a href="https://github.com/gruntwork-io/terraform-aws-control-tower/releases/tag/v1.0.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- landingzone/control-tower-provisioned-product-artifact-updater
  - Fixes permissions from testing
  - Adds an account lookup so that updates to a provisioned product will be skipped if the corresponding account is not active






</div>



## terraform-aws-eks


### [v3.0.0](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v3.0.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/29/2025 | Modules affected: eks-aws-auth-merger, eks-cloudwatch-agent, eks-cluster-control-plane, eks-cluster-managed-workers | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v3.0.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

Default EKS version is 1.33 with this release! Please see the links below for full details of the EKS 1.33 release including new features and any API changes.

&gt; [!WARNING]
&gt; EKS 1.33 will not provide pre-built optimized Amazon Linux 2 (AL2) Amazon Machine Images (AMIs). Support for AL2 has been dropped.

[Official AWS EKS 1.33 Announcement](https://aws.amazon.com/about-aws/whats-new/2025/05/amazon-eks-distro-kubernetes-version-1-33/)
[Amazon EKS Distro Docs](https://distro.eks.amazonaws.com/)
[Kubernetes 1.33 Announcement](https://kubernetes.io/blog/2025/04/23/kubernetes-v1-33-release/)
[Kubernetes 1.33 Release Notes](https://github.com/kubernetes/kubernetes/blob/master/CHANGELOG/CHANGELOG-1.33.md)




</div>


### [v2.1.0](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v2.1.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/18/2025 | Modules affected: eks-scripts, eks-aws-auth-merger | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v2.1.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Update python packages in `eks-scripts` module.
- Update go packages in `eks-aws-auth-merger` module.


</div>


### [v2.0.0](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v2.0.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/18/2025 | Modules affected: eks-k8s-karpenter | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v2.0.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - eks-k8s-karpenter


- Upgrade default Karpenter version to `1.6.2`

- https://github.com/gruntwork-io/terraform-aws-eks/pull/777
- https://github.com/gruntwork-io/terraform-aws-eks/pull/773

&gt;[!WARNING]
&gt; Backwards Incompatible Changes for Karpenter Users on versions `&lt; 1.0`

This release sets the default version of Karpenter to `1.6.2` and also updates the associated resources required for Karpenter version `&gt; 1.0`. Please see the [Karpenter Upgrade Guide](https://github.com/gruntwork-io/terraform-aws-eks/blob/master/modules/eks-k8s-karpenter/karpenter-upgrade-guide.md) that is contained in the module docs. Please read the official [Karpenter V1 Migration Guide](https://karpenter.sh/v1.0/upgrading/v1-migration/) prior to upgrading to mitigate an issues prior to upgrading. 

</div>


### [v1.5.0](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v1.5.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/9/2025 | Modules affected: eks-cluster-managed-workers | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v1.5.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Add support for EKS auto repair




</div>



## terraform-aws-load-balancer


### [v1.0.3](https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v1.0.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/26/2025 | Modules affected: alb | <a href="https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v1.0.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Added HSTS support to `modules/alb` (specifically in the lb_listener resource) via new var: `routing_http_response_strict_transport_security_header_value`





</div>



## terraform-aws-security


### [v1.0.5](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v1.0.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/17/2025 | Modules affected: private-s3-bucket | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v1.0.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- private-s3-bucket: A bug was introduced in v1.0.4 that results in a failure due to the inability to lookup the bucket region. This release fixes the bug and the bucket region is correctly included in the output now.
- Release includes several test and example fixes that do not impact functionality





</div>


### [v1.0.4](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v1.0.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/10/2025 | Modules affected: private-s3-bucket | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v1.0.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- private-s3-bucket: Expose S3 bucket region


&gt; ## :warning: NOTE
&gt; A [bug](https://github.com/gruntwork-io/terraform-aws-security/issues/895) was found in this release what will prevent an OpenTofu/Terraform plan/apply from running. We recommend skipping this release and jumping straight to [v1.0.5](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v1.0.5) where this bug has been resolved. 




</div>



## terraform-aws-server


### [v1.0.3](https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v1.0.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/19/2025 | Modules affected: persistent-ebs-volume | <a href="https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v1.0.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Improve mount and unmount scripts to work via UUID



</div>



## terraform-aws-service-catalog


### [v0.129.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.129.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/26/2025 | Modules affected: networking, services | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.129.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Updated usage of terraform-aws-load-balancer to v1.0.3 (latest release) for `networking/route53`, `services/asg-service`, and `networking/alb`
- Added HSTS support to `networking/alb` via new var `routing_http_response_strict_transport_security_header_value`




</div>


### [v0.128.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.128.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/25/2025 | Modules affected: landingzone, services, networking, base | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.128.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- feat: add configurable S3 storage class for CloudTrail log archiving
- Pass create namespace parameter in helm module
- Bump eks library module to v1.0.3
- feat: Add configurable disk monitoring variables to ec2-baseline module


</div>

<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "releases",
  "hash": "c95b86c9684c9c564a46b7967b9c3d98"
}
##DOCS-SOURCER-END -->

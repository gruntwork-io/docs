
# Gruntwork release 2026-05

<p style={{marginTop: "-25px"}}><small><a href="/guides">Guides</a> / <a href="/guides/stay-up-to-date">Update Guides</a> / <a href="/guides/stay-up-to-date/releases">Releases</a> / 2026-05</small></p>

This page lists all the updates to the [Gruntwork Infrastructure as Code Library](https://gruntwork.io/infrastructure-as-code-library/) that were released in 2026-05.
For instructions on how to use these updates in your code, check out the [updating documentation](/library/stay-up-to-date/updating).

Here are the repos that were updated:

- [boilerplate](#boilerplate)
- [pipelines-actions](#pipelines-actions)
- [pipelines-cli](#pipelines-cli)
- [pipelines-workflows](#pipelines-workflows)
- [repo-copier](#repo-copier)
- [terraform-aws-cis-service-catalog](#terraform-aws-cis-service-catalog)
- [terraform-aws-data-storage](#terraform-aws-data-storage)
- [terraform-aws-eks](#terraform-aws-eks)
- [terraform-aws-load-balancer](#terraform-aws-load-balancer)
- [terraform-aws-service-catalog](#terraform-aws-service-catalog)
- [terraform-aws-vpc](#terraform-aws-vpc)


## boilerplate


### [v0.16.0](https://github.com/gruntwork-io/boilerplate/releases/tag/v0.16.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/13/2026 | <a href="https://github.com/gruntwork-io/boilerplate/releases/tag/v0.16.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * build(deps): bump actions/download-artifact from 5 to 8 by @dependabot[bot] in https://github.com/gruntwork-io/boilerplate/pull/297
* build(deps): bump jdx/mise-action from 3 to 4 by @dependabot[bot] in https://github.com/gruntwork-io/boilerplate/pull/298
* build(deps): bump actions/checkout from 5 to 6 by @dependabot[bot] in https://github.com/gruntwork-io/boilerplate/pull/299
* build(deps): bump actions/upload-artifact from 5 to 7 by @dependabot[bot] in https://github.com/gruntwork-io/boilerplate/pull/300
* build(deps): bump astro from 5.17.2 to 5.18.1 in /docs by @dependabot[bot] in https://github.com/gruntwork-io/boilerplate/pull/302
* build(deps): bump google.golang.org/grpc from 1.78.0 to 1.79.3 by @dependabot[bot] in https://github.com/gruntwork-io/boilerplate/pull/290
* build(deps): bump github.com/buger/jsonparser from 1.1.1 to 1.1.2 by @dependabot[bot] in https://github.com/gruntwork-io/boilerplate/pull/291
* build(deps): bump github.com/aws/aws-sdk-go-v2/service/s3 from 1.95.1 to 1.97.3 by @dependabot[bot] in https://github.com/gruntwork-io/boilerplate/pull/306
* build(deps): bump go.opentelemetry.io/otel/sdk from 1.39.0 to 1.43.0 by @dependabot[bot] in https://github.com/gruntwork-io/boilerplate/pull/307
* build(deps): bump github.com/go-jose/go-jose/v4 from 4.1.3 to 4.1.4 by @dependabot[bot] in https://github.com/gruntwork-io/boilerplate/pull/304
* fix: Support external log control by @yhakbar in https://github.com/gruntwork-io/boilerplate/pull/311
* feat: input file mapping by @odgrim in https://github.com/gruntwork-io/boilerplate/pull/313

* @odgrim made their first contribution in https://github.com/gruntwork-io/boilerplate/pull/313

**Full Changelog**: https://github.com/gruntwork-io/boilerplate/compare/v0.15.0...v0.16.0

</div>



## pipelines-actions


### [v4.10.0](https://github.com/gruntwork-io/pipelines-actions/releases/tag/v4.10.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/21/2026 | <a href="https://github.com/gruntwork-io/pipelines-actions/releases/tag/v4.10.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Fixes #162, adds architecture detection when pulling pipelines cli by @odgrim in https://github.com/gruntwork-io/pipelines-actions/pull/163


**Full Changelog**: https://github.com/gruntwork-io/pipelines-actions/compare/v4.9.0...v4.10.0

</div>


### [v4.9.0](https://github.com/gruntwork-io/pipelines-actions/releases/tag/v4.9.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/15/2026 | <a href="https://github.com/gruntwork-io/pipelines-actions/releases/tag/v4.9.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Add preflight warnings to status-update init. Upload preflight output as an artifact by @Resonance1584 in https://github.com/gruntwork-io/pipelines-actions/pull/161


**Full Changelog**: https://github.com/gruntwork-io/pipelines-actions/compare/v4.8.0...v4.9.0

</div>



## pipelines-cli


### [v0.54.1](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.54.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/29/2026 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.54.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Details on user-facing changes will be documented in the release notes for:
- https://github.com/gruntwork-io/pipelines-workflows
- https://gitlab.com/gruntwork-io/pipelines-workflows

</div>


### [v0.54.0](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.54.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/15/2026 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.54.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Details on user-facing changes will be documented in the release notes for:
- https://github.com/gruntwork-io/pipelines-workflows
- https://gitlab.com/gruntwork-io/pipelines-workflows

</div>


### [v0.53.3](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.53.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/4/2026 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.53.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Add hook model stub by @Resonance1584 in https://github.com/gruntwork-io/pipelines/pull/573
* fix: Tighten plan summary output formatting by @oredavids in https://github.com/gruntwork-io/pipelines/pull/578


**Full Changelog**: https://github.com/gruntwork-io/pipelines/compare/v0.53.2...v0.53.3


</div>


### [v0.53.2](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.53.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/1/2026 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.53.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Add after_hook HCL by @Resonance1584 in https://github.com/gruntwork-io/pipelines/pull/572
* fix: Fixing stack generate regression by @yhakbar in https://github.com/gruntwork-io/pipelines/pull/574


**Full Changelog**: https://github.com/gruntwork-io/pipelines/compare/v0.53.1...v0.53.2


</div>



## pipelines-workflows


### [v4.18.0](https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v4.18.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/21/2026 | <a href="https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v4.18.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

The pipelines installer now checks RUNNER_ARCH to determine the binary to fetch.

* Adds ARM support for runners by @odgrim in https://github.com/gruntwork-io/pipelines-workflows/pull/221


**Full Changelog**: https://github.com/gruntwork-io/pipelines-workflows/compare/v4...v4.18.0

</div>


### [v4.17.0](https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v4.17.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/19/2026 | <a href="https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v4.17.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

When using [Fallback Tokens](https://docs.gruntwork.io/2.0/docs/pipelines/installation/viagithubapp#fallback), the preflight check will now add a warning to the PR comment if the tokens are set but are invalid. These checks will not block Pipelines from continuing to run when authenticating via the app.

* Add warnings when fallback tokens are expired by @Resonance1584 in https://github.com/gruntwork-io/pipelines-workflows/pull/220


**Full Changelog**: https://github.com/gruntwork-io/pipelines-workflows/compare/v4...v4.17.0

</div>


### [v4.16.3](https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v4.16.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/5/2026 | <a href="https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v4.16.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

The output-counts portion of `Plan Summary` (introduced in [v4.16.1](https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v4.16.1)) now renders as a parenthetical sub-summary, making it easier to scan when a plan changes both resources and outputs.

Before:

`Plan Summary: 6 to add, 0 to change, 0 to destroy, 5 outputs to add, 0 outputs to change, 0 outputs to destroy`

After:

`Plan Summary: 6 to add, 0 to change, 0 to destroy (5 outputs to add, 0 to change, 0 to destroy)`

* chore: Bumping Pipelines to v0.53.3 by @oredavids in https://github.com/gruntwork-io/pipelines-workflows/pull/217


**Full Changelog**: https://github.com/gruntwork-io/pipelines-workflows/compare/v4.16.2...v4.16.3

</div>


### [v4.16.2](https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v4.16.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/1/2026 | <a href="https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v4.16.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

A bug in the initial implementation of stack generation consolidation introduced in [v4.15.1](https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v4.15.1) has been fixed.

Previously, Pipelines would only generate only the stacks that were strictly impacted my Git diffs without recursively generating all stacks generated by top-level stacks as well. This was a regression from the existing behavior prior to consolidation, and has been fixed.

* chore: Bumping Pipelines to `v0.53.2` by @yhakbar in https://github.com/gruntwork-io/pipelines-workflows/pull/216


**Full Changelog**: https://github.com/gruntwork-io/pipelines-workflows/compare/v4...v4.16.2

</div>



## repo-copier


### [v0.8.0](https://github.com/gruntwork-io/repo-copier/releases/tag/v0.8.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/5/2026 | <a href="https://github.com/gruntwork-io/repo-copier/releases/tag/v0.8.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

The new `--publish-to-registry` flag has been added to support automatically publishing to the [GitLab OpenTofu/Terraform Module Registry](https://docs.gitlab.com/user/packages/terraform_module_registry/) when repository releases are copied into GitLab projects.

Thanks to @gpetras for contributing this feature.



Multiple sources of technical debt were paid off, including addressing linting findings from `golangci-lint`, upgrading the AWS SDK dependency to v2, upgrading the toolchain used to build repo-copier to Golang 1.26, and removal of unnecessary dependencies.

These changes shouldn&apos;t result in any significant user-visible changes. 

* feat: Add `--publish-to-registry` option for GitLab by @yhakbar in https://github.com/gruntwork-io/repo-copier/pull/311
* fix: Addressing `golangci-lint` findings by @yhakbar in https://github.com/gruntwork-io/repo-copier/pull/310
* fix: Upgrading AWS SDK by @yhakbar in https://github.com/gruntwork-io/repo-copier/pull/308
* chore: Go 1.26 upgrade by @denis256 in https://github.com/gruntwork-io/repo-copier/pull/302
* chore: pin Go and golangci-lint via mise.toml by @yhakbar in https://github.com/gruntwork-io/repo-copier/pull/307
* chore: Removing dependency on `go-commons` by @yhakbar in https://github.com/gruntwork-io/repo-copier/pull/309


**Full Changelog**: https://github.com/gruntwork-io/repo-copier/compare/v0.7.1...v0.8.0

</div>



## terraform-aws-cis-service-catalog


### [v1.2.2](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v1.2.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/13/2026 | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v1.2.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * fix: harden cloud-nuke cleanup CI and bump to v0.50.0 by @james00012 in https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/pull/652
* LIB-5081 changes to bump ref terraform-aws-vpc v0.28.13 by @x-nightwing in https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/pull/653

* @x-nightwing made their first contribution in https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/pull/653

**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/compare/v1.2.1...v1.2.2

</div>



## terraform-aws-data-storage


### [v1.1.0](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v1.1.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/15/2026 | Modules affected: - rds, - rds-proxy, - rds-replicas | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v1.1.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- `rds`
- `rds-proxy`
- `rds-replicas`



- **rds / rds-proxy / rds-replicas**: Replace the legacy `aws_security_group_rule` with one `aws_vpc_security_group_ingress_rule` / `aws_vpc_security_group_egress_rule` per CIDR to eliminate the AWS provider create-time race ([hashicorp/terraform-provider-aws#38526](https://github.com/hashicorp/terraform-provider-aws/issues/38526)) that surfaced as ``waiting for Security Group Rule create: couldn&apos;t find resource`` on first apply (#591). Module inputs and outputs are unchanged. AWS-side end state is identical (same SG, same rules); only the Terraform state representation changed.

  **Upgrade.** State migration is required because the resource addresses changed. See [UPGRADING.md](https://github.com/gruntwork-io/terraform-aws-data-storage/blob/v1.1.0/UPGRADING.md) for the full guide. Recommended path is `patcher upgrade` — the repo ships Patcher migrations under `.patcher/patches/staged/&#x7B;rds,rds-proxy,rds-replicas&#x7D;/` that `terraform import` the existing AWS rules under their new addresses, producing no destroy/create plan diff. Without Patcher, `terraform plan` will show a destroy and recreate for each rule; apply in a maintenance window since each rule is briefly removed before recreation.

  **Behavior note — list ordering.** The new resources use `count = length(var.…)` keyed on `count.index`, so reordering items in `allow_connections_from_*_cidr_blocks` (or `allow_outbound_*`) on a future change will recreate those rule resources, briefly dropping each rule during apply. Treat these lists as ordered. Adding/removing entries at the tail is fine.


- https://github.com/gruntwork-io/terraform-aws-data-storage/pull/591
- https://github.com/hashicorp/terraform-provider-aws/issues/38526

</div>



## terraform-aws-eks


### [v4.6.0](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v4.6.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/1/2026 | Modules affected: eks-aws-auth-merger, eks-cluster-control-plane, eks-ebs-csi-driver, eks-k8s-cluster-autoscaler | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v4.6.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

Default EKS version is 1.35 with this release! Please see the links below for full details of the EKS 1.35 release including new features and any API changes.

**Kubernetes 1.35 (&quot;Timbernetes&quot;) highlights:**
- In-Place Pod Resource Updates graduated to GA — CPU/memory adjustments without pod restarts
- Image Volumes graduated to stable — OCI images mountable as read-only volumes
- PreferSameNode Traffic Distribution graduated to stable
- cgroup v1 support removed — kubelet refuses to start on cgroup v1 by default
- containerd 1.x reaches EOL — 1.35 is the last release supporting it
- IPVS mode in kube-proxy deprecated; migration to nftables encouraged

[Official AWS EKS 1.35 Announcement](https://aws.amazon.com/about-aws/whats-new/2026/01/amazon-eks-distro-kubernetes-version-1-35/)
[Amazon EKS Distro Docs](https://distro.eks.amazonaws.com/)
[Kubernetes 1.35 Announcement](https://kubernetes.io/blog/2025/12/17/kubernetes-v1-35-release/)
[Kubernetes 1.35 Release Notes](https://github.com/kubernetes/kubernetes/blob/master/CHANGELOG/CHANGELOG-1.35.md)


</div>



## terraform-aws-load-balancer


### [v1.3.1](https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v1.3.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/22/2026 | <a href="https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v1.3.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Add test coverage for lb-https-listener-rules example (no functional module changes)




</div>


### [v1.3.0](https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v1.3.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/22/2026 | Modules affected: lb-listener-rules | <a href="https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v1.3.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Add support for jwt_validation in the lb listener rules
- Test and tagging improvements



</div>



## terraform-aws-service-catalog


### [v2.9.1](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v2.9.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/26/2026 | Modules affected: data-stores | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v2.9.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- data-stores/aurora: expose cluster_monitoring_interval and enable_global_write_forwarding
- Test fixes: restore shared KMS key and add cloud-nuke exclusion




</div>


### [v2.9.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v2.9.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/21/2026 | Modules affected: - mgmt/cost-management, - data-stores/aurora, - data-stores/ecr-repos, - data-stores/rds | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v2.9.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- `mgmt/cost-management`
- `data-stores/aurora`
- `data-stores/ecr-repos`
- `data-stores/rds`


- **feat: add `mgmt/cost-management` service catalog module** (#2381). Bundles AWS Budgets (list-driven; default daily + monthly preserves dogfood behavior) and AWS Cost Anomaly Detection. CAD requires the `aws.us_east_1` aliased provider.
- **feat(aurora): support pre-existing DB parameter groups** (#2387). Adds `db_cluster_custom_parameter_group_name` and `db_instance_custom_parameter_group_name` to `data-stores/aurora` so callers can attach a parameter group they manage outside the module. Mutually exclusive with the existing `db_*_custom_parameter_group` object inputs.
- **feat: expose `force_delete` option for ECR repositories module** (#2384). Adds a per-repo `force_delete` option and a matching `default_force_delete` module variable (defaults to `false` to preserve existing behavior) in `data-stores/ecr-repos`.
- **feat(rds): expose Blue/Green deployment toggle** (#2389). Adds `enable_blue_green_update` to `data-stores/rds`, wired through to the underlying data-storage RDS module. Partially resolves [LIB-5105](https://linear.app/gruntwork/issue/LIB-5105/add-bluegreen-deployment-support-for-aurora-and-rds-modules); Aurora coverage is deferred pending upstream Terraform AWS provider support.


Thanks to @ryehowell for contributions to this release.


- https://github.com/gruntwork-io/terraform-aws-service-catalog/pull/2381
- https://github.com/gruntwork-io/terraform-aws-service-catalog/pull/2387
- https://github.com/gruntwork-io/terraform-aws-service-catalog/pull/2384
- https://github.com/gruntwork-io/terraform-aws-service-catalog/pull/2389


</div>


### [v2.8.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v2.8.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/15/2026 | Modules affected: networking/vpc, services/eks-argocd, services/eks-cluster, services/eks-core-services | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v2.8.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- `networking/vpc`
- `services/eks-argocd`
- `services/eks-cluster`
- `services/eks-core-services`
- `services/eks-karpenter`
- `services/eks-workers`
- `services/helm-service`
- `services/k8s-service`


- Add Default Support for EKS 1.35
- Bump `cluster-autoscaler` to `v1.35.0`
- Bump `terraform-aws-eks` library module from `v4.5.0` → `v4.6.0`

Default EKS version is 1.35 with this release! Please see the links below for full details of the EKS 1.35 release including new features and any API changes.

**Kubernetes 1.35 (&quot;Timbernetes&quot;) highlights:**
- In-Place Pod Resource Updates graduated to GA — CPU/memory adjustments without pod restarts
- Image Volumes graduated to stable — OCI images mountable as read-only volumes
- PreferSameNode Traffic Distribution graduated to stable
- cgroup v1 support removed — kubelet refuses to start on cgroup v1 by default
- containerd 1.x reaches EOL — 1.35 is the last release supporting it
- IPVS mode in kube-proxy deprecated; migration to nftables encouraged

&gt; [!NOTE]
&gt; `.circleci/config.yml` `K8S_VERSION` and `modules/mgmt/jenkins/install.sh` `DEFAULT_KUBECTL_VERSION` are intentionally left at v1.33.x — these install minikube/kubectl in CI/Jenkins and lag EKS support windows.


No breaking changes. The default EKS version has been updated to `1.35`. Users pinning a specific version via the `kubernetes_version` variable are unaffected.

[Official AWS EKS 1.35 Announcement](https://aws.amazon.com/about-aws/whats-new/2026/01/amazon-eks-distro-kubernetes-version-1-35/)
[Amazon EKS Distro Docs](https://distro.eks.amazonaws.com/)
[Kubernetes 1.35 Announcement](https://kubernetes.io/blog/2025/12/17/kubernetes-v1-35-release/)
[Kubernetes 1.35 Release Notes](https://github.com/kubernetes/kubernetes/blob/master/CHANGELOG/CHANGELOG-1.35.md)


- https://github.com/gruntwork-io/terraform-aws-service-catalog/pull/2377
- https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v4.6.0

</div>


### [v2.7.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v2.7.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/15/2026 | Modules affected: networking/vpc, networking/vpc-mgmt, services/eks-cluster | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v2.7.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Harden cloud-nuke cleanup CI and bump to `v0.50.0`
- Bump `terraform-aws-vpc` to `v0.28.13` and expose new outputs on `networking/vpc` and `networking/vpc-mgmt`
- Expose `eks_cluster_certificate_authority` output on `services/eks-cluster`



</div>


### [v2.6.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v2.6.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/12/2026 | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v2.6.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * fix: harden cloud-nuke cleanup CI and bump to v0.50.0 by @james00012 in https://github.com/gruntwork-io/terraform-aws-service-catalog/pull/2374
* Bump/terraform aws vpc v0.28.13 by @x-nightwing in https://github.com/gruntwork-io/terraform-aws-service-catalog/pull/2380

* @x-nightwing made their first contribution in https://github.com/gruntwork-io/terraform-aws-service-catalog/pull/2380

**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-service-catalog/compare/v2.5.0...v2.6.0

</div>



## terraform-aws-vpc


### [v0.28.14](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.28.14)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/13/2026 | Modules affected: vpc-mgmt | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.28.14">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- `vpc_mgmnt` Added output `vpc_arn`



</div>

<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "releases",
  "hash": "1ccbed46666e7429b65ad43f4f4eda95"
}
##DOCS-SOURCER-END -->

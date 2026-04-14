
# Gruntwork release 2026-03

<p style={{marginTop: "-25px"}}><small><a href="/guides">Guides</a> / <a href="/guides/stay-up-to-date">Update Guides</a> / <a href="/guides/stay-up-to-date/releases">Releases</a> / 2026-03</small></p>

This page is lists all the updates to the [Gruntwork Infrastructure as Code
Library](https://gruntwork.io/infrastructure-as-code-library/) that were released in 2026-03. For instructions
on how to use these updates in your code, check out the [updating
documentation](/library/stay-up-to-date/updating).

Here are the repos that were updated:

- [boilerplate](#boilerplate)
- [pipelines-cli](#pipelines-cli)
- [pipelines-credentials](#pipelines-credentials)
- [pipelines-workflows](#pipelines-workflows)
- [terraform-aws-cache](#terraform-aws-cache)
- [terraform-aws-eks](#terraform-aws-eks)
- [terraform-aws-load-balancer](#terraform-aws-load-balancer)
- [terraform-aws-security](#terraform-aws-security)
- [terraform-aws-service-catalog](#terraform-aws-service-catalog)


## boilerplate


### [v0.15.0](https://github.com/gruntwork-io/boilerplate/releases/tag/v0.15.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/23/2026 | <a href="https://github.com/gruntwork-io/boilerplate/releases/tag/v0.15.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

Added support for recursive dependencies to the manifest to ensure that nested and ancestor dependencies are properly processed and resolved. Additional testing has also been included to verify this behavior.

Note that although this isn&apos;t a breaking change, this does require an update to the [manifest](https://boilerplate.gruntwork.io/advanced/manifest/) schema, and as such you&apos;ll want to ensure that your manifest parsing isn&apos;t impacted. Due to the fact that a field has only been added, this risk is minimal if you use a modern YAML/JSON parser.

* fix: Handling ancestor dependencies by @yhakbar in https://github.com/gruntwork-io/boilerplate/pull/294


**Full Changelog**: https://github.com/gruntwork-io/boilerplate/compare/v0.14.0...v0.15.0

</div>


### [v0.14.0](https://github.com/gruntwork-io/boilerplate/releases/tag/v0.14.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/20/2026 | <a href="https://github.com/gruntwork-io/boilerplate/releases/tag/v0.14.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

Dependencies in templates now generate concurrently by default, with the option to run sequentially or with different concurrency limits using the `--parallelism` flag.

This will be a breaking change for any templates that relied on dependencies generating in the exact order in which they are defined in templates (e.g. if multiple dependencies generate the same file, expecting later dependencies to overwrite earlier ones).

For more information read the [`for_each` documentation](https://boilerplate.gruntwork.io/configuration/dependencies/#for_each).


* feat: Generate dependencies concurrently by @yhakbar in https://github.com/gruntwork-io/boilerplate/pull/283
* chore: Bump peter-evans/create-pull-request from 7 to 8 by @dependabot[bot] in https://github.com/gruntwork-io/boilerplate/pull/266
* chore: Bump actions/upload-artifact from 5 to 6 by @dependabot[bot] in https://github.com/gruntwork-io/boilerplate/pull/259
* chore: Bump actions/cache from 4 to 5 by @dependabot[bot] in https://github.com/gruntwork-io/boilerplate/pull/258
* chore: Bump actions/checkout from 5 to 6 by @dependabot[bot] in https://github.com/gruntwork-io/boilerplate/pull/254


**Full Changelog**: https://github.com/gruntwork-io/boilerplate/compare/v0.13.0...v0.14.0

</div>


### [v0.13.0](https://github.com/gruntwork-io/boilerplate/releases/tag/v0.13.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/20/2026 | <a href="https://github.com/gruntwork-io/boilerplate/releases/tag/v0.13.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

Boilerplate can now produce a manifest file that records every file generated during a run, along with SHA256 checksums. Enable it with the new --manifest flag:

```bash
boilerplate \
    --template-url ./templates/service \
    --output-folder ./output \
    --non-interactive \
    --manifest
```

This creates a boilerplate-manifest.yaml in the output directory containing:

- File inventory — every generated file with its relative path and sha256: checksum
- Source checksum — a checksum of the template source (git commit SHA or directory hash)
- Variables &amp; dependencies — the resolved variable values and dependency tree used during the run
- Schema version — a URL pointing to a published https://boilerplate.gruntwork.io/schemas/manifest/v1/schema.json for easy validation

The manifest format is auto-detected from the file extension: `.json` produces JSON, everything else produces YAML. To write to a custom path, use `--manifest-file`:

```bash
boilerplate \
    --template-url ./templates/service \
    --output-folder ./output \
    --non-interactive \
    --manifest-file ./reports/manifest.json
```

This is useful for auditing which files came from a template, drift detection by comparing checksums after the fact, and CI/CD pipelines that need to programmatically consume the list of generated files in downstream steps.

See https://boilerplate.gruntwork.io/advanced/manifest/ for details.


The validation package is now exported directly, so consumers of Boilerplate as a library can import validation instead of relying on the re-export through the variables package.


- Added a docs homepage, Windows support page, and terminology page
- Fixed miscellaneous docs bugs


- Removed CircleCI configuration
- Fixed tests to avoid relying on the current branch existing in the remote

* feat: Adding manifest by @yhakbar in https://github.com/gruntwork-io/boilerplate/pull/285
* docs: Docs homepage, add Windows support and terminology pages by @josh-padnick in https://github.com/gruntwork-io/boilerplate/pull/278
* docs: Fixing docs bugs by @yhakbar in https://github.com/gruntwork-io/boilerplate/pull/286
* chore: Remove CircleCI by @josh-padnick in https://github.com/gruntwork-io/boilerplate/pull/279
* chore: Exporting `validation` by @yhakbar in https://github.com/gruntwork-io/boilerplate/pull/287
* chore: Avoid relying on the current branch existing in remote for tests by @yhakbar in https://github.com/gruntwork-io/boilerplate/pull/288


**Full Changelog**: https://github.com/gruntwork-io/boilerplate/compare/v0.12.1...v0.13.0

</div>



## pipelines-cli


### [v0.48.1](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.48.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/25/2026 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.48.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * DEV-1406 Add TG stack directories to excludes by @Resonance1584 in https://github.com/gruntwork-io/pipelines/pull/540
* DEV-1385 Fix comment CTA should use per platform terminology by @Resonance1584 in https://github.com/gruntwork-io/pipelines/pull/539


**Full Changelog**: https://github.com/gruntwork-io/pipelines/compare/v0.48.0...v0.48.1


</div>


### [v0.48.0](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.48.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/4/2026 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.48.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Add table-name arg to unlock all by @Resonance1584 in https://github.com/gruntwork-io/pipelines/pull/535
* Add stack blocks to inventory scan by @Resonance1584 in https://github.com/gruntwork-io/pipelines/pull/533
* chore: Bumping Terragrunt to RC3 by @yhakbar in https://github.com/gruntwork-io/pipelines/pull/536
* Fix panic by @Resonance1584 in https://github.com/gruntwork-io/pipelines/pull/537
* Increase build timeout by @Resonance1584 in https://github.com/gruntwork-io/pipelines/pull/538


**Full Changelog**: https://github.com/gruntwork-io/pipelines/compare/v0.47.0...v0.48.0


</div>



## pipelines-credentials


### [v1.3.0](https://github.com/gruntwork-io/pipelines-credentials/releases/tag/v1.3.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/6/2026 | <a href="https://github.com/gruntwork-io/pipelines-credentials/releases/tag/v1.3.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Fix retry bug. Add test suite by @Resonance1584 in https://github.com/gruntwork-io/pipelines-credentials/pull/19
* Handle free tier limits by @Resonance1584 in https://github.com/gruntwork-io/pipelines-credentials/pull/21


**Full Changelog**: https://github.com/gruntwork-io/pipelines-credentials/compare/v1.2.1...v1.3.0

</div>


### [v1.2.1](https://github.com/gruntwork-io/pipelines-credentials/releases/tag/v1.2.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/3/2026 | <a href="https://github.com/gruntwork-io/pipelines-credentials/releases/tag/v1.2.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Add more retry conditions by @Resonance1584 in https://github.com/gruntwork-io/pipelines-credentials/pull/18


**Full Changelog**: https://github.com/gruntwork-io/pipelines-credentials/compare/v1.2.0...v1.2.1

</div>



## pipelines-workflows


### [v4.10.1](https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v4.10.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/25/2026 | <a href="https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v4.10.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
:bug: Terragrunt stack directories are now excluded from Terragrunt discovery if they are ignored by the Pipelines ignore list or `PIPELINES_FEATURE_EXPERIMENT_IGNORE_UNITS_WITHOUT_ENVIRONMENT`. This affects the startup of Terragrunt during the Plan/Apply, but does not affect stack generation.

:bug: Fixed the text at the bottom of Plan comments to correctly say pull request instead of merge request.

* Pipelines CLI v0.48.1 by @Resonance1584 in https://github.com/gruntwork-io/pipelines-workflows/pull/197


**Full Changelog**: https://github.com/gruntwork-io/pipelines-workflows/compare/v4...v4.10.1

</div>


### [v4.10.0](https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v4.10.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/11/2026 | <a href="https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v4.10.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
:bug: Fixed a panic in Account Factory when account creation fails
:bug: Fixed some retry cases in pipelines-credentials not retrying
:nut_and_bolt: Added graceful handling of free tier limits
:nut_and_bolt: Internal telemetry updates

* pipelines-credentials v1.2.1 by @Resonance1584 in https://github.com/gruntwork-io/pipelines-workflows/pull/194
* Handle free tier limits by @Resonance1584 in https://github.com/gruntwork-io/pipelines-workflows/pull/196


**Full Changelog**: https://github.com/gruntwork-io/pipelines-workflows/compare/v4.9.0...v4.10.0

</div>



## terraform-aws-cache


### [v1.0.5](https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v1.0.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/30/2026 | <a href="https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v1.0.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * fix(ci): disable mise legacy version file parsing by @james00012 in https://github.com/gruntwork-io/terraform-aws-cache/pull/174
* Fix elasticache_user_group engine case deprecation warning by @james00012 in https://github.com/gruntwork-io/terraform-aws-cache/pull/176
* feat: add gw: namespaced tagging and scheduled cloud-nuke cleanup by @james00012 in https://github.com/gruntwork-io/terraform-aws-cache/pull/177


**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-cache/compare/v1.0.4...v1.0.5

</div>



## terraform-aws-eks


### [v4.3.0](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v4.3.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/26/2026 | Modules affected: eks-alb-ingress-controller | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v4.3.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Add `extra_args` support to `eks-alb-ingress-controller` for feature gates.



</div>


### [v4.2.0](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v4.2.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/17/2026 | Modules affected: eks-alb-ingress-controller-iam-policy | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v4.2.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Update ALB (LB) Ingress Controller IAM Policy to support `v2.11.0` and `v2.13.0`.



</div>



## terraform-aws-load-balancer


### [v1.2.1](https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v1.2.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/10/2026 | Modules affected: acm-tls-certificate | <a href="https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v1.2.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Added export attribute support to the options block in the acm-tls-certificate module, enabling users to create exportable ACM certificates




</div>


### [v1.2.0](https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v1.2.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/10/2026 | Modules affected: acm-tls-certificate | <a href="https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v1.2.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- Added `certificate_transparency_logging_preference` (as part of var.acm_tls_certificates) to `modules/acm-tls-certificate`





</div>



## terraform-aws-security


### [v1.4.0](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v1.4.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/12/2026 | Modules affected: account-alternate-contact, s3-account-public-access-block, s3-tls-enforcement-scp | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v1.4.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- New modules to support CIS AWS Foundations Benchmark v3.0.0




</div>



## terraform-aws-service-catalog


### [v2.2.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v2.2.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/30/2026 | Modules affected: networking/vpc, services/eks-argocd, services/eks-cluster, services/eks-core-services | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v2.2.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Expose `exclude_ports_from_inbound_all` in VPC module
- Add `gw:` namespaced tagging and scheduled cloud-nuke cleanup
- Bump `terraform-aws-eks` to `v4.3.0` (from `v4.0.0`), pulling in changes from `v4.1.0`, `v4.2.0`, and `v4.3.0`:
  - **v4.1.0**: Add `attach_default_iam_policies` toggle to `eks-cluster-managed-workers` to optionally skip attaching default IAM policies to the Managed Node Group IAM role
  - **v4.2.0**: Update ALB Ingress Controller IAM policy to support AWS Load Balancer Controller `v2.11.0` and `v2.13.0`
  - **v4.3.0**: Add `extra_args` support to `eks-alb-ingress-controller` for passing feature gates and other controller flags
- Add `managed_node_group_attach_default_iam_policies` variable to `eks-workers` — set to `false` when using an existing IAM role that already has the required policies (`AmazonEKSWorkerNodePolicy`, `AmazonEKS_CNI_Policy`, `AmazonEC2ContainerRegistryReadOnly`) attached
- Add `alb_ingress_controller_extra_args` variable to `eks-core-services` — pass additional arguments to the AWS Load Balancer Controller, e.g. feature gates like `--feature-gates=NLBGatewayAPI=true,ALBGatewayAPI=true`
- Add `extra_args` passthrough for ALB ingress controller



</div>


### [v2.1.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v2.1.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/11/2026 | Modules affected: networking, services | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v2.1.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Updated terraform-aws-load-balancer to v1.2.1 across all module references
- networking/route53:
  - Add support for the ACM certificate export option, allowing users to create exportable certificates by setting export = &quot;ENABLED&quot; on their public zones or service discovery namespaces
  - Bump the AWS provider minimum version to &gt;= 6.4.0 as required by the export option
- Test CI updates






</div>


### [v2.0.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v2.0.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 3/4/2026 | Modules affected: networking/vpc, services/eks-argocd, services/eks-cluster, services/eks-core-services | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v2.0.0">Release notes</a></small>
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


- Bump `terraform-aws-eks` to `v4.0.0`
- Remove the `kubergrunt` dependency completely from the service catalog, as it has been removed from `terraform-aws-eks` in `v4.0.0`
- Replace all `kubergrunt` EKS token fetching with `aws eks get-token` CLI
- Remove all kubergrunt-related variables from modules and examples
- Remove kubergrunt installation from CI, Jenkins AMI builds, and test helpers
- Update documentation to remove kubergrunt references

&gt; [!WARNING]
&gt; #### Breaking Changes
&gt; - All `kubergrunt`-related variables have been removed. If you are currently passing any of the removed variables listed below, you must remove them from your Terraform configurations.
&gt; - EKS token fetching now always uses `aws eks get-token`. Ensure the AWS CLI is available in your environment.
&gt; - VPC CNI customization via `kubergrunt` is no longer supported. Use [EKS managed add-ons](https://docs.aws.amazon.com/eks/latest/userguide/eks-add-ons.html) with the `enable_eks_addons` variable instead.
&gt; - Core component syncing via `kubergrunt` upgrade scripts is no longer supported. Use EKS managed add-ons instead.
&gt; 
&gt; **Removed variables from `eks-cluster` module:**
&gt; - `use_kubergrunt_verification`
&gt; - `kubergrunt_download_url`
&gt; - `use_kubergrunt_sync_components` (previously `use_upgrade_cluster_script`)
&gt; - `upgrade_cluster_script_wait_for_rollout`
&gt; - `upgrade_cluster_script_skip_coredns`
&gt; - `upgrade_cluster_script_skip_kube_proxy`
&gt; - `upgrade_cluster_script_skip_vpc_cni`
&gt; - `use_vpc_cni_customize_script`
&gt; - `vpc_cni_enable_prefix_delegation`
&gt; - `vpc_cni_warm_ip_target`
&gt; - `vpc_cni_minimum_ip_target`
&gt; 
&gt; **Removed variables from `eks-cluster`, `eks-core-services`, `eks-workers`, and example modules:**
&gt; - `use_kubergrunt_to_fetch_token`


- https://github.com/gruntwork-io/terraform-aws-service-catalog/pull/2353
- https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v4.0.0


</div>

<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "releases",
  "hash": "161fe8d4812d1c2fc86f31bdbfa6ccf8"
}
##DOCS-SOURCER-END -->

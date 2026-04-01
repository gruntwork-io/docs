
# Gruntwork release 2026-02

<p style={{marginTop: "-25px"}}><small><a href="/guides">Guides</a> / <a href="/guides/stay-up-to-date">Update Guides</a> / <a href="/guides/stay-up-to-date/releases">Releases</a> / 2026-02</small></p>

This page is lists all the updates to the [Gruntwork Infrastructure as Code
Library](https://gruntwork.io/infrastructure-as-code-library/) that were released in 2026-02. For instructions
on how to use these updates in your code, check out the [updating
documentation](/library/stay-up-to-date/updating).

Here are the repos that were updated:

- [boilerplate](#boilerplate)
- [patcher-cli](#patcher-cli)
- [pipelines-actions](#pipelines-actions)
- [pipelines-cli](#pipelines-cli)
- [pipelines-credentials](#pipelines-credentials)
- [pipelines-workflows](#pipelines-workflows)
- [terraform-aws-architecture-catalog](#terraform-aws-architecture-catalog)
- [terraform-aws-ci](#terraform-aws-ci)
- [terraform-aws-cis-service-catalog](#terraform-aws-cis-service-catalog)
- [terraform-aws-control-tower](#terraform-aws-control-tower)
- [terraform-aws-data-storage](#terraform-aws-data-storage)
- [terraform-aws-ecs](#terraform-aws-ecs)
- [terraform-aws-eks](#terraform-aws-eks)
- [terraform-aws-openvpn](#terraform-aws-openvpn)
- [terraform-aws-security](#terraform-aws-security)
- [terraform-aws-service-catalog](#terraform-aws-service-catalog)
- [terraform-aws-static-assets](#terraform-aws-static-assets)
- [terraform-aws-vpc](#terraform-aws-vpc)


## boilerplate


### [v0.12.1](https://github.com/gruntwork-io/boilerplate/releases/tag/v0.12.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/24/2026 | <a href="https://github.com/gruntwork-io/boilerplate/releases/tag/v0.12.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * fix: re-export CustomValidationRule and expose validation arguments by @josh-padnick in https://github.com/gruntwork-io/boilerplate/pull/281


**Full Changelog**: https://github.com/gruntwork-io/boilerplate/compare/v0.12.0...v0.12.1

</div>


### [v0.12.0](https://github.com/gruntwork-io/boilerplate/releases/tag/v0.12.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/23/2026 | <a href="https://github.com/gruntwork-io/boilerplate/releases/tag/v0.12.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

Variables with default values no longer prompt users for interactive input unless using the new `confirm` attribute.

```yaml
variables:
  - name: AppName
    type: string
    default: &quot;my-app&quot;
    confirm: true  # User will be prompted, with &quot;my-app&quot; as the default

  - name: ContainerName
    type: string
    default: &quot;container&quot;
    # No confirm — silently uses the computed default
```

This ensures that dynamically determined values for variables won&apos;t cause errors during interactive generation and reduces the number of prompts users encounter while generating from a template interactively.


The `length` validation now uses the functional form `length(min, max)` instead of the previous `length-min-max` form.

All validations with parameters will use this functional form going forward.



The validation type `regex(pattern)` is now supported to validate variable values against regex patterns.

e.g.

```yaml
- name: SlugName
  type: string
  description: URL-friendly project slug
  validations:
    - required
    - length(3, 30)
    - regex(&quot;^[a-z0-9-]+$&quot;)
```



Releases now support JavaScript runtimes through compiled WASM build targets.



Boilerplate now has a dedicated website at https://boilerplate.gruntwork.io to document the behavior of Boilerplate.


* feat: Add regex(pattern) validation type by @josh-padnick in https://github.com/gruntwork-io/boilerplate/pull/272
* feat: Adding WASM build target by @yhakbar in https://github.com/gruntwork-io/boilerplate/pull/277
* feat: Avoiding prompt for defaults in non-interactive mode unless users ask for it by @yhakbar in https://github.com/gruntwork-io/boilerplate/pull/280
* fix: Fix flaky TestExamplesShell by isolating parallel sub-test output directories by @josh-padnick in https://github.com/gruntwork-io/boilerplate/pull/274
* docs: Add boilerplate docs site by @josh-padnick in https://github.com/gruntwork-io/boilerplate/pull/273
* chore: update to Go 1.26 by @denis256 in https://github.com/gruntwork-io/boilerplate/pull/271

**Full Changelog**: https://github.com/gruntwork-io/boilerplate/compare/v0.11.1...v0.12.0

</div>


### [v0.12.0-alpha3](https://github.com/gruntwork-io/boilerplate/releases/tag/v0.12.0-alpha3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/23/2026 | <a href="https://github.com/gruntwork-io/boilerplate/releases/tag/v0.12.0-alpha3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
Testing out new WASM build process with brotli compression supported.


**Full Changelog**: https://github.com/gruntwork-io/boilerplate/compare/v0.12.0-alpha2...v0.12.0-alpha3

</div>


### [v0.12.0-alpha2](https://github.com/gruntwork-io/boilerplate/releases/tag/v0.12.0-alpha2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/23/2026 | <a href="https://github.com/gruntwork-io/boilerplate/releases/tag/v0.12.0-alpha2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
Testing out new WASM build process with brotli compression supported.

**Full Changelog**: https://github.com/gruntwork-io/boilerplate/compare/v0.12.0-alpha1...v0.12.0-alpha2

</div>


### [v0.12.0-alpha1](https://github.com/gruntwork-io/boilerplate/releases/tag/v0.12.0-alpha1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/20/2026 | <a href="https://github.com/gruntwork-io/boilerplate/releases/tag/v0.12.0-alpha1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
Testing out new WASM build process

* chore: update to Go 1.26 by @denis256 in https://github.com/gruntwork-io/boilerplate/pull/271
* Fix flaky TestExamplesShell by isolating parallel sub-test output directories by @josh-padnick in https://github.com/gruntwork-io/boilerplate/pull/274
* Add regex(pattern) validation type by @josh-padnick in https://github.com/gruntwork-io/boilerplate/pull/272
* Add boilerplate docs site by @josh-padnick in https://github.com/gruntwork-io/boilerplate/pull/273


**Full Changelog**: https://github.com/gruntwork-io/boilerplate/compare/v0.11.1...v0.12.0-alpha1

</div>



## patcher-cli


### [v0.17.3](https://github.com/gruntwork-io/patcher-cli/releases/tag/v0.17.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/13/2026 | <a href="https://github.com/gruntwork-io/patcher-cli/releases/tag/v0.17.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Release duplicated from https://github.com/gruntwork-io/patcher/releases/tag/v0.17.3

</div>



## pipelines-actions


### [v4.4.0](https://github.com/gruntwork-io/pipelines-actions/releases/tag/v4.4.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/26/2026 | <a href="https://github.com/gruntwork-io/pipelines-actions/releases/tag/v4.4.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Pass through report file path by @Resonance1584 in https://github.com/gruntwork-io/pipelines-actions/pull/152


**Full Changelog**: https://github.com/gruntwork-io/pipelines-actions/compare/v4.3.0...v4.4.0

</div>


### [v4.3.0](https://github.com/gruntwork-io/pipelines-actions/releases/tag/v4.3.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/12/2026 | <a href="https://github.com/gruntwork-io/pipelines-actions/releases/tag/v4.3.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Add inventory report by @Resonance1584 in https://github.com/gruntwork-io/pipelines-actions/pull/151


**Full Changelog**: https://github.com/gruntwork-io/pipelines-actions/compare/v4.2.1...v4.3.0

</div>


### [v4.2.1](https://github.com/gruntwork-io/pipelines-actions/releases/tag/v4.2.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/6/2026 | <a href="https://github.com/gruntwork-io/pipelines-actions/releases/tag/v4.2.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Fix comment update step should not succeed if artifact not uploaded by @Resonance1584 in https://github.com/gruntwork-io/pipelines-actions/pull/150


**Full Changelog**: https://github.com/gruntwork-io/pipelines-actions/compare/v4.2.0...v4.2.1

</div>


### [v4.2.0](https://github.com/gruntwork-io/pipelines-actions/releases/tag/v4.2.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/3/2026 | <a href="https://github.com/gruntwork-io/pipelines-actions/releases/tag/v4.2.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * chore: Cleaning up usage of `AUTH_PROVIDER_CMD` by @yhakbar in https://github.com/gruntwork-io/pipelines-actions/pull/144
* Upgrade actions/checkout to v6. Pin action versions by @Resonance1584 in https://github.com/gruntwork-io/pipelines-actions/pull/149


**Full Changelog**: https://github.com/gruntwork-io/pipelines-actions/compare/v4.1.3...v4.2.0

</div>



## pipelines-cli


### [v0.47.0](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.47.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/26/2026 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.47.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Fix cleanup scripts, add dry-run by @Resonance1584 in https://github.com/gruntwork-io/pipelines/pull/529
* DEV-1292 Add usage command by @Resonance1584 in https://github.com/gruntwork-io/pipelines/pull/531


**Full Changelog**: https://github.com/gruntwork-io/pipelines/compare/v0.46.2...v0.47.0


</div>


### [v0.46.2](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.46.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/23/2026 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.46.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * fix: Fix scan should identify units ignored by no environment by @Resonance1584 in https://github.com/gruntwork-io/pipelines/pull/526
* fix: Fix timestamp format (zod serverside cant handle offsets) by @Resonance1584 in https://github.com/gruntwork-io/pipelines/pull/527
* fix: Make plan file path optional (not set if terragrunt failed) by @Resonance1584 in https://github.com/gruntwork-io/pipelines/pull/528
* fix: Fix inventory scan handling legacy config by @Resonance1584 in https://github.com/gruntwork-io/pipelines/pull/525
* fix: Fixing authless and custom authentication in GitHub, as we currently get errors trying to guess the aud by @yhakbar in https://github.com/gruntwork-io/pipelines/pull/532


**Full Changelog**: https://github.com/gruntwork-io/pipelines/compare/v0.46.1...v0.46.2


</div>


### [v0.46.1](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.46.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/12/2026 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.46.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Golang 1.26.0 by @Resonance1584 in https://github.com/gruntwork-io/pipelines/pull/524


**Full Changelog**: https://github.com/gruntwork-io/pipelines/compare/v0.46.0...v0.46.1


</div>


### [v0.46.0](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.46.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/12/2026 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.46.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * DEV-1289 Add inventory report command by @Resonance1584 in https://github.com/gruntwork-io/pipelines/pull/512


**Full Changelog**: https://github.com/gruntwork-io/pipelines/compare/v0.45.3...v0.46.0


</div>


### [v0.45.3](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.45.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/6/2026 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.45.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Add retries to create comment. Allow update comment to fail after 1 retry by @Resonance1584 in https://github.com/gruntwork-io/pipelines/pull/523


**Full Changelog**: https://github.com/gruntwork-io/pipelines/compare/v0.45.2...v0.45.3


</div>


### [v0.45.2](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.45.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/6/2026 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.45.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Fix gitlab missing pagination and context by @Resonance1584 in https://github.com/gruntwork-io/pipelines/pull/522


**Full Changelog**: https://github.com/gruntwork-io/pipelines/compare/v0.45.1...v0.45.2


</div>


### [v0.45.1](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.45.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/6/2026 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.45.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Upgrade golang and dependencies by @Resonance1584 in https://github.com/gruntwork-io/pipelines/pull/516
* Upgrade GitLab dependency by @Resonance1584 in https://github.com/gruntwork-io/pipelines/pull/518
* Upgrade github dependency by @Resonance1584 in https://github.com/gruntwork-io/pipelines/pull/519
* Handle race in gitlab EnableBranchProtection by @Resonance1584 in https://github.com/gruntwork-io/pipelines/pull/520
* Fix missing step artifacts caused by unpaginated jobs query by @Resonance1584 in https://github.com/gruntwork-io/pipelines/pull/521


**Full Changelog**: https://github.com/gruntwork-io/pipelines/compare/v0.45.0...v0.45.1


</div>



## pipelines-credentials


### [v1.2.0](https://github.com/gruntwork-io/pipelines-credentials/releases/tag/v1.2.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/3/2026 | <a href="https://github.com/gruntwork-io/pipelines-credentials/releases/tag/v1.2.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Add socket disconnected to retry reasons by @Resonance1584 in https://github.com/gruntwork-io/pipelines-credentials/pull/16
* Upgrade actions/github-script to v8 and pin version by @Resonance1584 in https://github.com/gruntwork-io/pipelines-credentials/pull/17


**Full Changelog**: https://github.com/gruntwork-io/pipelines-credentials/compare/v1.1.0...v1.2.0

</div>



## pipelines-workflows


### [v4.9.0](https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v4.9.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/27/2026 | <a href="https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v4.9.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
:nut_and_bolt: This release contains some internal reworks around how we collect and process Terragrunt output during plan/apply, as well as adding the Terragrunt [Run Report](https://terragrunt.gruntwork.io/docs/features/run-report/) to Job artifacts for future use. There is additional internal Gruntwork telemetry around deploys being added, but we expect no user facing impact from this release.


**Full Changelog**: https://github.com/gruntwork-io/pipelines-workflows/compare/v4...v4.9.0

</div>


### [v4.8.0](https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v4.8.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/23/2026 | <a href="https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v4.8.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * feat: Add self vars for self hosted pipelines actions and pipelines-credentials by @odgrim in https://github.com/gruntwork-io/pipelines-workflows/pull/189
* chore: Bumping Pipelines CLI from `v0.46.1` to `v0.46.2` by @yhakbar in https://github.com/gruntwork-io/pipelines-workflows/pull/191

* @odgrim made their first contribution in https://github.com/gruntwork-io/pipelines-workflows/pull/189

**Full Changelog**: https://github.com/gruntwork-io/pipelines-workflows/compare/v4.7.0...v4.8.0

</div>


### [v4.7.0](https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v4.7.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/12/2026 | <a href="https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v4.7.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

Upgraded pipelines CLI to use go 1.26.0 to address CVE-2025-68121


Updates to Gruntwork internal telemetry

* Add inventory report by @Resonance1584 in https://github.com/gruntwork-io/pipelines-workflows/pull/187
* Pipelines CLI v0.46.1 by @Resonance1584 in https://github.com/gruntwork-io/pipelines-workflows/pull/188


**Full Changelog**: https://github.com/gruntwork-io/pipelines-workflows/compare/v4...v4.7.0

</div>


### [v4.6.1](https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v4.6.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/6/2026 | <a href="https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v4.6.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

* Fix missing step artifacts caused by unpaginated jobs query by @Resonance1584 in https://github.com/gruntwork-io/pipelines-workflows/pull/185
* Pipelines CLI v0.45.3 by @Resonance1584 in https://github.com/gruntwork-io/pipelines-workflows/pull/186


**Full Changelog**: https://github.com/gruntwork-io/pipelines-workflows/compare/v4...v4.6.1

</div>


### [v4.6.0](https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v4.6.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/3/2026 | <a href="https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v4.6.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

Updated all third party actions to use [SHA Pinning](https://github.blog/changelog/2025-08-15-github-actions-policy-now-supports-blocking-and-sha-pinning-actions/#enforce-sha-pinning). Customers that require SHA pinning in their organization should now be able to use Pipelines workflows with this security setting enabled.


Updated third party actions, some of which require actions/runner v2.327.1 or higher for node24 support. This should have no effect on the default runner. If you are using self-hosted runners and have disabled automatic updates, ensure your actions/runner is at this version or newer. See [Runner software updates on self-hosted runners](https://docs.github.com/en/actions/reference/runners/self-hosted-runners#runner-software-updates-on-self-hosted-runners) for more information.


* Fix pipelines-credentials not using PIPELINES_CREDENTIALS_REF by @Resonance1584 in https://github.com/gruntwork-io/pipelines-workflows/pull/183
* Pin actions versions by @Resonance1584 in https://github.com/gruntwork-io/pipelines-workflows/pull/184

**Full Changelog**: https://github.com/gruntwork-io/pipelines-workflows/compare/v4...v4.6.0

</div>



## terraform-aws-architecture-catalog


### [v4.3.2](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v4.3.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/12/2026 | <a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v4.3.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Add default vpc module params by @Resonance1584 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1185


**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-architecture-catalog/compare/v4.3.1...v4.3.2

</div>


### [v4.3.1](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v4.3.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/11/2026 | <a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v4.3.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Update control tower and security modules in boilerplate template

**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-architecture-catalog/compare/v4.3.0...v4.3.1

</div>


### [v4.3.0](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v4.3.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/11/2026 | <a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v4.3.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Full support for AWS Provider v6.x
* Module version updates include:
  * terraform-aws-control-tower v1.4.1
  * terraform-aws-security v1.3.0
  * terraform-aws-service-catalog v1.3.0
  * terraform-aws-lambda v1.3.0
  * terraform-aws-cis-service-catalog v1.0.0
  * terraform-aws-utilities v1.0.0

**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-architecture-catalog/compare/v4.2.1...v4.3.0

</div>


### [v4.2.1](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v4.2.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/6/2026 | <a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v4.2.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Updated terraform-aws-cis-service-catalog to v1.0.0
* Updated terraform-aws-service-catalog to v1.0.0
* Added Support for New AWS Regions



**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-architecture-catalog/compare/v4.2.0...v4.2.1

</div>



## terraform-aws-ci


### [v1.3.0](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v1.3.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/12/2026 | Modules affected: ecs-deploy-runner, infrastructure-deployer | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v1.3.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Updated to Go 1.26 to address newly discovered CVEs



</div>


### [v1.2.1](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v1.2.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/3/2026 | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v1.2.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

-  fix: save placeholder applyResults when patch runs in upgrade tester




</div>


### [v1.2.0](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v1.2.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/2/2026 | Modules affected: build-helpers, ec2-backup, ecs-deploy-runner, jenkins-server | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v1.2.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Additional module updates for AWS Provider v6 support





</div>



## terraform-aws-cis-service-catalog


### [v1.0.0](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v1.0.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/3/2026 | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v1.0.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - No changes with this release (from v0.59.0), moving to v1.x.x SemVer standard


This release marks a significant milestone for the module 🎉 
We are officially adopting the [Semantic Versioning (SemVer)](https://semver.org/) standard, starting with version v1.0.0. Prior to this release, version tags only incremented patch and minor numbers. Moving forward, all releases should fully comply with the SemVer specification, providing clearer expectations for users regarding changes, compatibility, and upgrade paths.

With the v1.0.0 release, the library module is considered stable. This means that all subsequent changes in the v1.x.x series will be backward-compatible unless a new major version (v2.0.0) is released.

Version numbers will now follow the format `MAJOR.MINOR.PATCH`
- `MAJOR`: Incremented for breaking changes or incompatible API changes.
- `MINOR`: Incremented for new, backward-compatible features.
- `PATCH`: Incremented for backward-compatible bug fixes.

Users can now rely on the v1.x.x series to remain backward-compatible. Breaking changes should only occur in a future v2.0.0 release.

Each release will include detailed notes indicating whether changes are breaking, additive, or bug fixes, as per SemVer guidelines.


</div>


### [v0.59.0](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.59.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/3/2026 | Modules affected: data-stores, landingzone, networking, observability | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.59.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Update modules to support AWS Provider v6.x
- Added full support for 10 new regions (ap-east-2, ap-south-2, ap-southeast-4/5/6/7, ca-west-1, eu-south-2, il-central-1, mx-central-1)






</div>



## terraform-aws-control-tower


### [v1.4.1](https://github.com/gruntwork-io/terraform-aws-control-tower/releases/tag/v1.4.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/5/2026 | Modules affected: landingzone | <a href="https://github.com/gruntwork-io/terraform-aws-control-tower/releases/tag/v1.4.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- make handle to update name of provisioned product for existing accounts



</div>


### [v1.4.0](https://github.com/gruntwork-io/terraform-aws-control-tower/releases/tag/v1.4.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/4/2026 | Modules affected: landingzone | <a href="https://github.com/gruntwork-io/terraform-aws-control-tower/releases/tag/v1.4.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Update modules to support AWS Provider v6.x




</div>


### [v1.3.1](https://github.com/gruntwork-io/terraform-aws-control-tower/releases/tag/v1.3.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/4/2026 | Modules affected: landingzone | <a href="https://github.com/gruntwork-io/terraform-aws-control-tower/releases/tag/v1.3.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Feat: Add missing regions to account baselines



</div>



## terraform-aws-data-storage


### [v0.47.0](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.47.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/28/2026 | Modules affected: opensearch, - redshift, - aurora, - rds | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.47.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- `opensearch` **(NEW)**
- `redshift`
- `aurora`
- `rds`
- `rds-proxy`
- `rds-replicas`
- `lambda-create-snapshot` **(DEPRECATED)**
- `lambda-share-snapshot` **(DEPRECATED)**
- `lambda-copy-shared-snapshot` **(DEPRECATED)**
- `lambda-cleanup-snapshots` **(DEPRECATED)**



- **OpenSearch**: Added `opensearch` module supporting VPC/public endpoints, fine-grained access control, SAML/Cognito auth, auto-tune, GP3 storage, warm/cold storage tiers, multi-AZ standby, and off-peak maintenance windows (#570)


The following Lambda-based snapshot modules are now **deprecated** in favor of AWS Backup&apos;s native capabilities. Use [backup-plan](/modules/backup-plan) and [backup-vault](/modules/backup-vault) instead. See the [backup-rds-cross-account example](/examples/backup-rds-cross-account) for a full end-to-end replacement.

- `lambda-create-snapshot` → Backup plan with cron schedule
- `lambda-share-snapshot` → `copy_action` in backup plan rule
- `lambda-copy-shared-snapshot` → `copy_action` with automatic KMS re-encryption
- `lambda-cleanup-snapshots` → `lifecycle &#x7B; delete_after &#x7D;` on source and destination


- **Redshift**: Add option to manage master password with AWS Secrets Manager (`manage_master_password`), fix snapshot schedule variable, mark `master_password` as sensitive, fix `apply_immediately` type (#565)
- **RDS**: Add `dedicated_log_volume`, `engine_lifecycle_support` for Extended Support control, update storage/instance type guidance (gp3, Graviton4) (#571)
- **Aurora**: Add `engine_lifecycle_support`, `network_type` (dual-stack IPv4/IPv6), `enable_global_write_forwarding`, `enable_local_write_forwarding`, update Serverless v2 scaling limits (min 0 / max 256 ACUs) (#571)
- **RDS Proxy**: Add `debug_logging`, `custom_tags`, `allow_connections_from_security_groups`, add SQLSERVER to `engine_family` (#571)
- **RDS Replicas**: Update storage type and Performance Insights deprecation guidance (#571)
- Add cross-account RDS backup example with end-to-end test (#569)


- Update deprecated `dms.t2.micro` to `dms.t3.micro` in DMS examples (#568)
- Fix CI: use `gh api` instead of `gh release list` for fetching latest tag (#572)
- Expand upgrade test coverage to all modules (#564)


- https://github.com/gruntwork-io/terraform-aws-data-storage/pull/571
- https://github.com/gruntwork-io/terraform-aws-data-storage/pull/570
- https://github.com/gruntwork-io/terraform-aws-data-storage/pull/569
- https://github.com/gruntwork-io/terraform-aws-data-storage/pull/568
- https://github.com/gruntwork-io/terraform-aws-data-storage/pull/565
- https://github.com/gruntwork-io/terraform-aws-data-storage/pull/564
- https://github.com/gruntwork-io/terraform-aws-data-storage/pull/572

</div>


### [v0.46.1](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.46.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/12/2026 | Modules affected: backup-plan | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.46.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- dd ability to add selection tags optionally to backup-plan



</div>


### [v0.46.0](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.46.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/10/2026 | Modules affected: redshift, rds-proxy | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.46.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Replace deprecated snapshot_copy block with standalone resource
- Wait for RDS Proxy target health before connection tests
- Update DB subnet group script to refresh stale subnets
- Add missing DB subnet group config to TestRdsPostgresWithCloudWatchLogs
- Consolidate test infrastructure setup and fix test failures
- Run only affected tests to reduce CI cost and time



</div>



## terraform-aws-ecs


### [v1.4.2](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v1.4.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/27/2026 | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v1.4.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- test fix: build AMI on tagged commits using GetCurrentGitRef to resolve branch name or tag in detached HEAD state




</div>


### [v1.4.1](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v1.4.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/26/2026 | Modules affected: ecs-cluster | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v1.4.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- ecs-cluster: fix ECS container instance registration by defaulting IMDS hop limit to 2
- Test fixes




</div>


### [v1.4.0](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v1.4.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/23/2026 | Modules affected: ecs-daemon-service, ecs-cluster, ecs-task-scheduler | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v1.4.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Add Mixed Instances Policy with Spot support for ECS Cluster ASG
- Bug/484 ecs task scheduler fix name usage
- Test fixes





</div>



## terraform-aws-eks


### [v4.1.0](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v4.1.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/11/2026 | Modules affected: eks-cluster-managed-workers | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v4.1.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- add toggle to attach policies optionally to role used for control plane



</div>


### [v4.0.0](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v4.0.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/6/2026 | Modules affected: eks-cluster-control-plane, eks-cluster-managed-workers, eks-cluster-workers | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v4.0.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

This release removes the `kubergrunt` dependency from the EKS module, simplifying cluster management by leveraging native AWS EKS capabilities and [EKS Managed add-ons](https://docs.aws.amazon.com/eks/latest/userguide/eks-add-ons.html).


</div>



## terraform-aws-openvpn


### [v0.28.0](https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.28.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/2/2026 | Modules affected: openvpn-server | <a href="https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.28.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fixing ldflags path for upgrade tests
- Update modules to support AWS Provider v6





</div>



## terraform-aws-security


### [v1.3.1](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v1.3.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/27/2026 | Modules affected: cloudtrail-bucket | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v1.3.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- cloudtrail-bucket: fix inconsistent conditional result type errors in var.additional_bucket_policy_statements conditional fallback





</div>



## terraform-aws-service-catalog


### [v1.3.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v1.3.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/11/2026 | Modules affected: data-stores | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v1.3.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- feat[s3-bucket]: Support AWS Provider V6



</div>


### [v1.2.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v1.2.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/9/2026 | Modules affected: services/public-static-website | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v1.2.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Bump `terraterraform-aws-static-assets` to `v1.2.0` for improved compatibility with AWS Provider v6.x




</div>


### [v1.1.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v1.1.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/8/2026 | Modules affected: networking/vpc, services/eks-argocd, services/eks-cluster, services/eks-core-services | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v1.1.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Bump `terraform-aws-eks` to `v3.4.0`
-  Add support for using an existing IAM role and security group for the EKS cluster control plane via new variables `cluster_iam_role_arn` and `cluster_security_group_id`

&gt; [!WARNING]
&gt; #### IAM Role Immutability
&gt; The `cluster_iam_role_arn` can ONLY be set during initial cluster creation. Changing the IAM role on an existing cluster will DESTROY and RECREATE the cluster (destructive operation). This is an AWS API constraint - IAM roles are immutable after cluster creation. Use this variable only for new clusters or when you specifically intend to recreate an existing cluster.
&gt;
&gt; The `cluster_security_group_id` can be updated in-place without cluster recreation via the AWS UpdateClusterConfig API.
 



</div>


### [v1.0.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v1.0.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/2/2026 | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v1.0.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - No changes with this release (from v0.150.0), moving to v1.x.x SemVer standard


This release marks a significant milestone for the module 🎉 
We are officially adopting the [Semantic Versioning (SemVer)](https://semver.org/) standard, starting with version v1.0.0. Prior to this release, version tags only incremented patch and minor numbers. Moving forward, all releases should fully comply with the SemVer specification, providing clearer expectations for users regarding changes, compatibility, and upgrade paths.

With the v1.0.0 release, the library module is considered stable. This means that all subsequent changes in the v1.x.x series will be backward-compatible unless a new major version (v2.0.0) is released.

Version numbers will now follow the format `MAJOR.MINOR.PATCH`
- `MAJOR`: Incremented for breaking changes or incompatible API changes.
- `MINOR`: Incremented for new, backward-compatible features.
- `PATCH`: Incremented for backward-compatible bug fixes.

Users can now rely on the v1.x.x series to remain backward-compatible. Breaking changes should only occur in a future v2.0.0 release.

Each release will include detailed notes indicating whether changes are breaking, additive, or bug fixes, as per SemVer guidelines.


</div>


### [v0.150.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.150.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/2/2026 | Modules affected: networking, services, base, data-stores | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.150.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Update modules for AWS provider v6 support
- Bugfix: ecs services missing elb slow start
- Add disable_api_termination variable to ec2-instance module




</div>



## terraform-aws-static-assets


### [v1.2.0](https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v1.2.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/9/2026 | Modules affected: s3-cloudfront, s3-static-website | <a href="https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v1.2.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Update modules for compatibility with AWS provider v6.x




</div>



## terraform-aws-vpc


### [v0.28.11](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.28.11)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/6/2026 | Modules affected: vpc-app | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.28.11">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- LIB-4192 Fixing ldflags path for upgrade tests
- feat: add vpc_arn to outputs



</div>

<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "releases",
  "hash": "da337893f2bdf84e5a02df9878392921"
}
##DOCS-SOURCER-END -->

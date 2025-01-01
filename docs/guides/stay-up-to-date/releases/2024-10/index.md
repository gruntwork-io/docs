
# Gruntwork release 2024-10

<p style={{marginTop: "-25px"}}><small><a href="/guides">Guides</a> / <a href="/guides/stay-up-to-date">Update Guides</a> / <a href="/guides/stay-up-to-date/releases">Releases</a> / 2024-10</small></p>

This page is lists all the updates to the [Gruntwork Infrastructure as Code
Library](https://gruntwork.io/infrastructure-as-code-library/) that were released in 2024-10. For instructions
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
- [terraform-aws-cache](#terraform-aws-cache)
- [terraform-aws-ci](#terraform-aws-ci)
- [terraform-aws-cis-service-catalog](#terraform-aws-cis-service-catalog)
- [terraform-aws-data-storage](#terraform-aws-data-storage)
- [terraform-aws-ecs](#terraform-aws-ecs)
- [terraform-aws-eks](#terraform-aws-eks)
- [terraform-aws-lambda](#terraform-aws-lambda)
- [terraform-aws-load-balancer](#terraform-aws-load-balancer)
- [terraform-aws-monitoring](#terraform-aws-monitoring)
- [terraform-aws-security](#terraform-aws-security)
- [terraform-aws-service-catalog](#terraform-aws-service-catalog)
- [terraform-aws-vpc](#terraform-aws-vpc)
- [terrapatch-cli](#terrapatch-cli)


## boilerplate


### [v0.5.19](https://github.com/gruntwork-io/boilerplate/releases/tag/v0.5.19)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/15/2024 | <a href="https://github.com/gruntwork-io/boilerplate/releases/tag/v0.5.19">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * fix: Updating CODEOWNERS by @yhakbar in https://github.com/gruntwork-io/boilerplate/pull/198
* fix: Moving to `main` by @yhakbar in https://github.com/gruntwork-io/boilerplate/pull/197
* chore: Updating dependencies by @yhakbar in https://github.com/gruntwork-io/boilerplate/pull/199


**Full Changelog**: https://github.com/gruntwork-io/boilerplate/compare/v0.5.18...v0.5.19

</div>



## patcher-cli


### [v0.9.5](https://github.com/gruntwork-io/patcher-cli/releases/tag/v0.9.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/8/2024 | <a href="https://github.com/gruntwork-io/patcher-cli/releases/tag/v0.9.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
note: there was a bug in v0.9.4, it wouldn&apos;t build. this should fix it!


* parse .git suffix of a repo optionally by @ceschae in https://github.com/gruntwork-io/patcher/pull/827
* update patcher to go 1.22 by @ceschae in https://github.com/gruntwork-io/patcher/pull/828

* Bump github.com/docker/docker from 27.0.1+incompatible to 27.1.1+incompatible by @dependabot in https://github.com/gruntwork-io/patcher/pull/800
* update versions of dependencies used in circleci config by @ceschae in https://github.com/gruntwork-io/patcher/pull/802
* Create dependabot.yml by @ceschae in https://github.com/gruntwork-io/patcher/pull/803
* Bump github.com/getsentry/sentry-go from 0.22.0 to 0.29.0 by @dependabot in https://github.com/gruntwork-io/patcher/pull/806
* Bump github.com/charmbracelet/glamour from 0.6.0 to 0.8.0 by @dependabot in https://github.com/gruntwork-io/patcher/pull/807
* Bump github.com/sethvargo/go-githubactions from 1.2.0 to 1.3.0 by @dependabot in https://github.com/gruntwork-io/patcher/pull/808
* Bump github.com/docker/docker from 27.1.1+incompatible to 27.2.1+incompatible by @dependabot in https://github.com/gruntwork-io/patcher/pull/804
* Bump github.com/urfave/cli/v2 from 2.26.0 to 2.27.4 by @dependabot in https://github.com/gruntwork-io/patcher/pull/813
* Bump github.com/charmbracelet/bubbles from 0.16.1 to 0.20.0 by @dependabot in https://github.com/gruntwork-io/patcher/pull/811
* Bump github.com/gruntwork-io/terratest from 0.46.16 to 0.47.1 by @dependabot in https://github.com/gruntwork-io/patcher/pull/810
* Bump github.com/zclconf/go-cty from 1.14.1 to 1.15.0 by @dependabot in https://github.com/gruntwork-io/patcher/pull/809
* Bump github.com/docker/cli from 27.0.1+incompatible to 27.3.1+incompatible by @dependabot in https://github.com/gruntwork-io/patcher/pull/815
* Bump github.com/Masterminds/semver/v3 from 3.2.1 to 3.3.0 by @dependabot in https://github.com/gruntwork-io/patcher/pull/816
* Bump github.com/hashicorp/hcl/v2 from 2.19.1 to 2.22.0 by @dependabot in https://github.com/gruntwork-io/patcher/pull/817
* Bump go.opentelemetry.io/otel from 1.28.0 to 1.30.0 by @dependabot in https://github.com/gruntwork-io/patcher/pull/818
* Bump github.com/gosimple/slug from 1.13.1 to 1.14.0 by @dependabot in https://github.com/gruntwork-io/patcher/pull/821
* Bump github.com/docker/docker from 27.2.1+incompatible to 27.3.1+incompatible by @dependabot in https://github.com/gruntwork-io/patcher/pull/822
* Bump github.com/charmbracelet/bubbletea from 1.1.0 to 1.1.1 by @dependabot in https://github.com/gruntwork-io/patcher/pull/823
* Bump golang.org/x/oauth2 from 0.21.0 to 0.23.0 by @dependabot in https://github.com/gruntwork-io/patcher/pull/824


**Full Changelog**: https://github.com/gruntwork-io/patcher/compare/v0.9.3...v0.9.5

</div>



## pipelines-actions


### [v3.1.1](https://github.com/gruntwork-io/pipelines-actions/releases/tag/v3.1.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/25/2024 | <a href="https://github.com/gruntwork-io/pipelines-actions/releases/tag/v3.1.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Fix delegated repositories dont have full config by @Resonance1584 in https://github.com/gruntwork-io/pipelines-actions/pull/87


**Full Changelog**: https://github.com/gruntwork-io/pipelines-actions/compare/v3.1.0...v3.1.1

</div>


### [v3.1.0](https://github.com/gruntwork-io/pipelines-actions/releases/tag/v3.1.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/25/2024 | <a href="https://github.com/gruntwork-io/pipelines-actions/releases/tag/v3.1.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Handle acronyms in step name by @Resonance1584 in https://github.com/gruntwork-io/pipelines-actions/pull/81
* DEV-570 Fix bootstrap does not correctly check for missing configuration keys by @Resonance1584 in https://github.com/gruntwork-io/pipelines-actions/pull/83
* Fix not all cases split on capitals correctly by @Resonance1584 in https://github.com/gruntwork-io/pipelines-actions/pull/84
* Enable pipelines auth caching by @Resonance1584 in https://github.com/gruntwork-io/pipelines-actions/pull/86


**Full Changelog**: https://github.com/gruntwork-io/pipelines-actions/compare/v3.0.3...v3.1.0

</div>


### [v3.0.3](https://github.com/gruntwork-io/pipelines-actions/releases/tag/v3.0.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/9/2024 | <a href="https://github.com/gruntwork-io/pipelines-actions/releases/tag/v3.0.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Fix version output included in tf logs by @Resonance1584 in https://github.com/gruntwork-io/pipelines-actions/pull/78
* Fix URL templating for action status output by @Resonance1584 in https://github.com/gruntwork-io/pipelines-actions/pull/79
* fix: Moving `logs_url` reference higher up by @yhakbar in https://github.com/gruntwork-io/pipelines-actions/pull/80


**Full Changelog**: https://github.com/gruntwork-io/pipelines-actions/compare/v3.0.2...v3.0.3

</div>


### [v3.0.2](https://github.com/gruntwork-io/pipelines-actions/releases/tag/v3.0.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/8/2024 | <a href="https://github.com/gruntwork-io/pipelines-actions/releases/tag/v3.0.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * fix: Hide the `CatalogTags` variable when it is empty rather than set… by @yhakbar in https://github.com/gruntwork-io/pipelines-actions/pull/77


**Full Changelog**: https://github.com/gruntwork-io/pipelines-actions/compare/v3.0.1...v3.0.2

</div>


### [v3.0.1](https://github.com/gruntwork-io/pipelines-actions/releases/tag/v3.0.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/8/2024 | <a href="https://github.com/gruntwork-io/pipelines-actions/releases/tag/v3.0.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Fix invalid token passed to gh cli by @Resonance1584 in https://github.com/gruntwork-io/pipelines-actions/pull/76


**Full Changelog**: https://github.com/gruntwork-io/pipelines-actions/compare/v3.0.0...v3.0.1

</div>


### [v3.0.0](https://github.com/gruntwork-io/pipelines-actions/releases/tag/v3.0.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/8/2024 | <a href="https://github.com/gruntwork-io/pipelines-actions/releases/tag/v3.0.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Pipelines V3 GitHub App Support by @ZachGoldberg in https://github.com/gruntwork-io/pipelines-actions/pull/72


**Full Changelog**: https://github.com/gruntwork-io/pipelines-actions/compare/v1.12.1...v3.0.0

</div>



## pipelines-cli


### [v0.31.0](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.31.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/25/2024 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.31.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * DEV-537 Trigger pipelines plan/apply for included hcl files by @Resonance1584 in https://github.com/gruntwork-io/pipelines/pull/251


**Full Changelog**: https://github.com/gruntwork-io/pipelines/compare/v0.30.0...v0.31.0


</div>


### [v0.30.0](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.30.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/25/2024 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.30.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Improve auth speed by @Resonance1584 in https://github.com/gruntwork-io/pipelines/pull/238


**Full Changelog**: https://github.com/gruntwork-io/pipelines/compare/v0.29.2...v0.30.0


</div>


### [v0.29.2](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.29.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/17/2024 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.29.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Upgrade to go 1.23.2. Upgrade all libraries. by @Resonance1584 in https://github.com/gruntwork-io/pipelines/pull/250


**Full Changelog**: https://github.com/gruntwork-io/pipelines/compare/v0.29.1...v0.29.2


</div>


### [v0.29.1](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.29.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/10/2024 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.29.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Fix unmarshal error getting default branch name by @Resonance1584 in https://github.com/gruntwork-io/pipelines/pull/249


**Full Changelog**: https://github.com/gruntwork-io/pipelines/compare/v0.29.0...v0.29.1


</div>


### [v0.29.0](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.29.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/8/2024 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.29.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * GitHubApp Compatibility by @Resonance1584 in https://github.com/gruntwork-io/pipelines/pull/241


**Full Changelog**: https://github.com/gruntwork-io/pipelines/compare/v0.28.5...v0.29.0


</div>


### [v0.29.0-r16](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.29.0-r16)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/3/2024 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.29.0-r16">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Internal use only


</div>


### [v0.28.5](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.28.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/4/2024 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.28.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * DEV-554 Fix telemetry breaking auth during delete by @Resonance1584 in https://github.com/gruntwork-io/pipelines/pull/248


**Full Changelog**: https://github.com/gruntwork-io/pipelines/compare/v0.28.4...v0.28.5


</div>


### [v0.28.4](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.28.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/3/2024 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.28.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * feat: Support Terragrunt `v0.67` by @yhakbar in https://github.com/gruntwork-io/pipelines/pull/245
* Fix delete module cant chdir for terragrunt version check by @Resonance1584 in https://github.com/gruntwork-io/pipelines/pull/247


**Full Changelog**: https://github.com/gruntwork-io/pipelines/compare/v0.28.3...v0.28.4


</div>



## pipelines-credentials


### [v1.0.3](https://github.com/gruntwork-io/pipelines-credentials/releases/tag/v1.0.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/9/2024 | <a href="https://github.com/gruntwork-io/pipelines-credentials/releases/tag/v1.0.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * feat: Adding retry to login by @yhakbar in https://github.com/gruntwork-io/pipelines-credentials/pull/7


**Full Changelog**: https://github.com/gruntwork-io/pipelines-credentials/compare/v1...v1.0.3

</div>


### [v1.0.2](https://github.com/gruntwork-io/pipelines-credentials/releases/tag/v1.0.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/8/2024 | <a href="https://github.com/gruntwork-io/pipelines-credentials/releases/tag/v1.0.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Rename Grunty to Gruntwork.io by @Resonance1584 in https://github.com/gruntwork-io/pipelines-credentials/pull/6


**Full Changelog**: https://github.com/gruntwork-io/pipelines-credentials/compare/v1...v1.0.2

</div>


### [v1.0.1](https://github.com/gruntwork-io/pipelines-credentials/releases/tag/v1.0.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/1/2024 | <a href="https://github.com/gruntwork-io/pipelines-credentials/releases/tag/v1.0.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Fix error message ReferenceError by @Resonance1584 in https://github.com/gruntwork-io/pipelines-credentials/pull/5

* @Resonance1584 made their first contribution in https://github.com/gruntwork-io/pipelines-credentials/pull/5

**Full Changelog**: https://github.com/gruntwork-io/pipelines-credentials/compare/v1...v1.0.1

</div>



## pipelines-workflows


### [v3](https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/8/2024 | <a href="https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  This is a floating release tracking the latest `v3.y.z` release.

</div>


### [v3.1.0](https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v3.1.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/31/2024 | <a href="https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v3.1.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Pipelines CLI v0.31.0 by @Resonance1584 in https://github.com/gruntwork-io/pipelines-workflows/pull/93

If your `terragrunt.hcl` files use `include &#x7B;&#x7D;` blocks to bring in data from other HCL files, pipelines will now detect if those hcl files are changed and trigger a HCL Changed event which will run a `run-all plan` with `--terragrunt-modules-that-include` argument pointed to the changed HCL file. This is currently limited to only work with the `include` block, we plan to address other methods of nesting configuration such as `read_terragrunt_config` in a later release.

- Bootstrap will now correctly detect missing configuration values in `.gruntwork/config.yml`. Previously empty values would be passed through which caused issues with templating new accounts.
- AWS credentials are now cached which significantly reduces the number of calls made to AWS APIs during a run-all


**Full Changelog**: https://github.com/gruntwork-io/pipelines-workflows/compare/v3...v3.1.0

</div>


### [v3.0.5](https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v3.0.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/10/2024 | <a href="https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v3.0.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Pipelines CLI v0.29.1 by @Resonance1584 in https://github.com/gruntwork-io/pipelines-workflows/pull/91


**Full Changelog**: https://github.com/gruntwork-io/pipelines-workflows/compare/v3.0.4...v3.0.5

</div>


### [v3.0.4](https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v3.0.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/9/2024 | <a href="https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v3.0.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * fix: Bumping up `pipelines-actions` to `v3.0.3` by @yhakbar in https://github.com/gruntwork-io/pipelines-workflows/pull/90


**Full Changelog**: https://github.com/gruntwork-io/pipelines-workflows/compare/v3...v3.0.4

</div>


### [v3.0.3](https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v3.0.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/8/2024 | <a href="https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v3.0.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- feat: Bump `pipelines-actions` to `v3.0.2`.

**Full Changelog**: https://github.com/gruntwork-io/pipelines-workflows/compare/v3.0.2...v3.0.3

</div>


### [v3.0.2](https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v3.0.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/8/2024 | <a href="https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v3.0.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Pipelines actions v3.0.1 by @Resonance1584 in https://github.com/gruntwork-io/pipelines-workflows/pull/89


**Full Changelog**: https://github.com/gruntwork-io/pipelines-workflows/compare/v3...v3.0.2

</div>


### [v3.0.1](https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v3.0.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/8/2024 | <a href="https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v3.0.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Fix syntax error due to bad character by @Resonance1584 in https://github.com/gruntwork-io/pipelines-workflows/pull/88


**Full Changelog**: https://github.com/gruntwork-io/pipelines-workflows/compare/v3...v3.0.1

</div>


### [v3.0.0](https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v3.0.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/8/2024 | <a href="https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v3.0.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
Pipelines version 3 introduces several new features which include a number of breaking changes.  The migration guide below should take less than 5 minutes for most teams to complete, but please do make sure to follow it closely.  We&apos;re providing a checklist here to help teams ensure that steps are not skipped.

- [ ] Install and configure the Gruntwork.io GitHub App
  - [ ] (Alternative) Add `actions:read` permission to PIPELINES_READ_TOKEN
  - [ ] (Alternative) (Enterprise Only) Add PR_CREATE_TOKEN to delegated repository workflows
- [ ] Update to Terragrunt v0.67.16 or later 
- [ ] (If necessary) Add new actions to GitHub Organization allow list settings
- [ ] (Enterprise Only) Install and activate Drift Detection

&lt;details&gt;
&lt;summary&gt;&lt;h2&gt;Install and configure the Gruntwork.io GitHub App&lt;/h2&gt;&lt;/summary&gt;

Pipelines now uses the Gruntwork.io GitHub App for workflow permissions, which simplifies permission management. Follow the [GitHub App Installation Instructions](https://docs.gruntwork.io/foundations/github-app/setup) to install the Gruntwork.io GitHub App and add your `infrastructure-live-root` repository to your account.

Using the Gruntwork.io GitHub App is recommended and provides full feature support for pipelines workflows. Alternatively, if you do not wish to install the Gruntwork.io GitHub App you can modify your existing workflows to continue using GitHub secrets, although some features will not be available. Read more about App only features [here](https://docs.gruntwork.io/foundations/github-app/availability#app-only-features).
&lt;details&gt;
&lt;summary&gt;&lt;h3&gt;Alternative steps&lt;/h3&gt;&lt;/summary&gt;

1. Add `actions: read` permissions

Customers explicitly list permissions that Gruntwork Pipelines workflows has by default in the pipelines workflow files in `.github/workflows` inside their infrastructure repositories.  Pipelines v3 now requires `actions: read` permissions in order to introspect its own runs and provide more helpful logging capabilities.

Customers should make the one-line change to add the `actions: read` permission in the following files &lt;b&gt;in every repository that uses Gruntwork pipelines&lt;/b&gt; (including root, access control and delegated repos).  Note, most repositories will have only 1 or two of these workflow files, in which case update what is present and don&apos;t worry about the others.

* `.github/workflows/pipelines.yml`
* `.github/workflows/pipelines-drift-detection.yml`
* `.github/workflows/pipelines-root.yml`
* `.github/workflows/pipelines-unlock.yml`

```yml
permissions:
  id-token: write
  contents: write
  pull-requests: write
```
```yml
permissions:
  id-token: write
  contents: write
  pull-requests: write
  actions: read
```

2. (Enterprise only) Add PR_CREATE_TOKEN to delegated repository workflows.

Delegated repositories that are not using the Gruntwork.io GitHub App will need to add  `PR_CREATE_TOKEN: $&#x7B;&#x7B; github.token &#x7D;&#x7D;` to the secrets in their workflow files:

```yml
secrets:
  PIPELINES_READ_TOKEN: $&#x7B;&#x7B; secrets.PIPELINES_READ_TOKEN &#x7D;&#x7D;
```
```yml
secrets:
  PIPELINES_READ_TOKEN: $&#x7B;&#x7B; secrets.PIPELINES_READ_TOKEN &#x7D;&#x7D;
  PR_CREATE_TOKEN: $&#x7B;&#x7B; github.token &#x7D;&#x7D;
```

&lt;/details&gt;

&lt;/details&gt;
&lt;details&gt;
&lt;summary&gt;&lt;h2&gt;Update to Terragrunt v0.67.16&lt;/h2&gt;&lt;/summary&gt;

The latest pipelines works best with the latest version of Terragrunt.  Recent versions of Terragrunt have much improved logging, performance and correctness improvements in `run-all` scenarios with pipelines.
&lt;/details&gt;
&lt;details&gt;
&lt;summary&gt;&lt;h2&gt;Allowlist Actions&lt;/h2&gt;&lt;/summary&gt;
&lt;i&gt;This is only for customers who only allow GitHub actions to run if they are on an &lt;a href=&quot;https://docs.github.com/en/organizations/managing-organization-settings/disabling-or-limiting-github-actions-for-your-organization#allowing-select-actions-and-reusable-workflows-to-run&quot;&gt;explicit allowlist&lt;/a&gt;&lt;/i&gt;

&lt;h3&gt;New actions to add&lt;/h3&gt;

* `gruntwork-io/pipelines-credentials`
* `gruntwork-io/pipelines-actions/.github/actions/pipelines-drift-detection-consolidate-jobs`
* `gruntwork-io/pipelines-actions/.github/actions/pipelines-drift-detection-determine-units`
* `gruntwork-io/pipelines-actions/.github/actions/pipelines-drift-detection-determine-drift`
* `gruntwork-io/pipelines-actions/.github/actions/pipelines-new-pr-action`
* `gruntwork-io/pipelines-actions/.github/actions/pipelines-get-job-logs-url`
&lt;/details&gt;
&lt;details&gt;
&lt;summary&gt;&lt;h2&gt;(Enterprise Only) Install and activate Drift Detection&lt;/h2&gt;&lt;/summary&gt;
Pipelines Drift Detection can be installed in your repositories by adding a new workflow file:

1. Create a new file at `.github/workflows/pipelines-drift-detection.yml`
2. Add the following content to the file

```yml
name: Pipelines Drift Detection
run-name: &quot;[GWP]: Pipelines Drift Detection&quot;
on:
  # Uncomment to enable scheduled Drift Detection
  # schedule:
  #  - cron: &apos;15 12 * * 1&apos;
  workflow_dispatch:
    inputs:
      path:
        description: (Optional) Path to filter units e.g. &quot;./management/*&quot;
        type: string
      branch-name:
        description: (Optional) branch name to open Drift Detection PRs with
        default: drift-detection
        type: string
permissions:
  id-token: write

jobs:
  GruntworkPipelines:
    uses: gruntwork-io/pipelines-workflows/.github/workflows/pipelines-drift-detection.yml@v3
    with:
      path: $&#x7B;&#x7B; inputs.path &#x7D;&#x7D;
      branch-name: $&#x7B;&#x7B; inputs.branch-name &#x7D;&#x7D;
```

&lt;/details&gt;

- [Pipelines as a GitHub App](https://docs.gruntwork.io/foundations/github-app/)
- [Pipelines Drift Detection](https://docs.gruntwork.io/pipelines/maintain/drift-detection) (Enterprise Only)
- Improved Account Factory Bootstrap Customization Hooks
- Pipelines Log Link Improvements
- [new config options](https://docs.gruntwork.io/pipelines/overview/configurations) in `config.yaml`
  - `consolidate-added-or-changed`: allows the pipeline to run as a single parallelized terragrunt instance such that dependencies are respected for deletions
  - `consolidate-deleted`: Enable conslidating ModuleDeleted jobs with `run-all`
  - `enable-terragrunt-provider-cache`: uses the new terragrunt provider cache so that you don&apos;t fetch the same 500 meg aws provider binary 20 times


</div>



## terraform-aws-architecture-catalog


### [v2.11.5](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.11.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/9/2024 | <a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.11.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * fix: Adjusting templates for pipelines.yml by @yhakbar in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1126


**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-architecture-catalog/compare/v2.11.4...v2.11.5

</div>


### [v2.11.4](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.11.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/9/2024 | <a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.11.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * DEV-560: Set default `infra-modules-release-version` to `main` by @yhakbar in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1125


**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-architecture-catalog/compare/v2.11.3...v2.11.4

</div>


### [v2.11.3](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.11.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/9/2024 | <a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.11.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Dependent job for merge checks by @ThisGuyCodes in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1120

* @ThisGuyCodes made their first contribution in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1120

**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-architecture-catalog/compare/v2.11.2...v2.11.3

</div>


### [v2.11.2](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.11.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/8/2024 | <a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.11.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Fix tag for default delegated repo workflow by @Resonance1584 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1124


**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-architecture-catalog/compare/v2.11.1...v2.11.2

</div>


### [v2.11.1](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.11.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/8/2024 | <a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.11.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * fix: Fixing drift detection workflow template by @yhakbar in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1123


**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-architecture-catalog/compare/v2.11.0...v2.11.1

</div>


### [v2.11.0](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.11.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/8/2024 | <a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v2.11.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * feat: sample custom envvars in gruntwork config by @ZachGoldberg in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1116
* feat: update unlock with new flags by @ZachGoldberg in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1115
* Update CODEOWNERS by @arsci in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1117
* Fix goimports install in CI by @Resonance1584 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1122
* Pipelines v3 by @Resonance1584 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/1119


**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-architecture-catalog/compare/v2.10.0...v2.11.0

</div>



## terraform-aws-cache


### [v0.22.9](https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v0.22.9)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/8/2024 | Modules affected: redis | <a href="https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v0.22.9">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Add dependency to redis auto scaling



</div>



## terraform-aws-ci


### [v0.59.1](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.59.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/31/2024 | Modules affected: ecs-deploy-runner | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.59.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Introduce `additional_apk_adds` build argument to enable specifying extra packages downstream without the need for a derived image
- Bump `github.com/gruntwork-io/terratest` from 0.47.0 to 0.47.2 in /test




</div>


### [v0.59.0](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.59.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/9/2024 | Modules affected: infrastructure-deployer | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.59.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Bump github.com/gruntwork-io/terratest from 0.44.1 to 0.47.0
- Update `gruntwork-cli` to use `go-commons`.
- Update `github.com/urfave/cli` to `github.com/urfave/cli/v2` in `infrastructure-deployer`
    - **NOTE**: some interface signatures have changed in `infrastructure-deployer` with this release. These are internal changes to the application that should not effect external consumption. 



</div>



## terraform-aws-cis-service-catalog


### [v0.53.0](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.53.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/17/2024 | Modules affected: networking | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.53.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
When customers want to update/add NACL rules using modules/networking/vpc, they face the following error:

    Error: NetworkAclEntryAlreadyExists: EC2 Network ACL (acl-0d8dd4609b298bccd) Rule (egress: false)(7) already exists

which is raised due to [Simple Resource Creation](https://github.com/hashicorp/terraform/blob/main/docs/destroying.md) (create-before-destroy) and NACL rules need to follow destroy-before-create behavior.

In order to fix this issue, we modified `rule_incrementer` logic so that it is no longer connected to the index of the specific rule in the list of rules and no longer uses starting rule number. Instead, rule_incrementer is based on MD5 value of the IP-port-proto combination and belongs to rule number range `1-16300` for `Allow` rules and `16301-32700` for `Deny` rules.



</div>


### [v0.52.2](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.52.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/14/2024 | Modules affected: networking | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.52.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Update CODEOWNERS
- Add policy for the VPC Gateway Endpoint resources on Mgmt VPC



</div>



## terraform-aws-data-storage


### [v0.39.0](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.39.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/17/2024 | Modules affected: rds, redshift | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.39.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

Added Cloudwatch log destination in addition to S3. Logging details can be found on [Database audit logging](https://docs.aws.amazon.com/redshift/latest/mgmt/db-auditing.html). This version adds new Terraform resource `aws_redshift_logging` that controls audit logging configuration and replaces `logging` attribute group of `aws_redshift_cluster` resource.


</div>



## terraform-aws-ecs


### [v0.38.3](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.38.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/9/2024 | Modules affected: ecs-service | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.38.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Adding a role for  `aws ecs exec`
- Allow http healtcheck on tcp protocol
- Add ecs_task_definition_pid_mode variable for replica ECS service
- Test improvements/fixes



</div>



## terraform-aws-eks


### [v0.71.0](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.71.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/21/2024 | Modules affected: eks-cluster-control-plane | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.71.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- **NOTE**: The changes below have a typo in the variable name `access_entry_poilcy_associations`. If upgrading to use Access Entry support, please skip this version and use the next version [v0.72.0](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.72.0) which has the typo fix included in the release.
- [**Breaking Change**] Add Support for EKS Access Entries
    - Expose [access_config](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/eks_cluster#access_config) configuration block on `eks-cluster-control-plane` module.
    - **NOTE**: This is a breaking change. Upgrading to this version requires upgrading the AWS Terraform Provider to `&gt;= 5.33.0`. This version of the AWS Provider is the minimum version that supports the `access_config` configuration block.
    - Add `access_entries` and `access_entry_poilcy_associations` variables to support adding EKS Access Entries.
    - Add `access_config_authentication_mode` and `bootstrap_cluster_creator_admin_permissions` variables to support changing the Authentication mode of an EKS cluster. 
    - **NOTE**: Please see the [AWS EKS Documentation for Access Entires](https://docs.aws.amazon.com/eks/latest/userguide/access-entries.html) for full details. Considerations should be made prior to changing the Authentication mode for a cluster. 
        - E.g. Changing from the default Authentication mode `CONFIG_MAP` to either `API` or `API_AND_CONFIG_MAP` is a one-way operation and cannot be reverted. 



</div>


### [v0.70.2](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.70.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/4/2024 | Modules affected: eks-k8s-cluster-autoscaler-iam-policy | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.70.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Add `autoscaling:DescribeScalingActivities` permission to Cluster Autoscaler policy.



</div>



## terraform-aws-lambda


### [v1.0.1](https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v1.0.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/15/2024 | Modules affected: lambda | <a href="https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v1.0.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- add example of using aws sam
- add optional Lambda Advanced Logging Configuration variable
- address dependabot alerts in `lambda-service` example



</div>



## terraform-aws-load-balancer


### [v0.29.26](https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.29.26)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/30/2024 | Modules affected: alb | <a href="https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.29.26">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- TODO: Address dependabot alerts
- TODO: Update CODEOWNERS
- TODO: Added Missing Default Action for ALB&apos;s HTTP(S) Listeners.

This PR does NOT introduce any changes that are not backwards compatible or require resources redeployment.



</div>



## terraform-aws-monitoring


### [v0.36.26](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.36.26)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/31/2024 | Modules affected: agents | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.36.26">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Fix precommit
- agents/cloudwatch-agent: Bumps jqgo due to CVE




</div>



## terraform-aws-security


### [v0.74.4](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.74.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/29/2024 | Modules affected: private-s3-bucket | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.74.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- private-s3-bucket: support newer_noncurrent_versions



</div>



## terraform-aws-service-catalog


### [v0.116.1](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.116.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/30/2024 | Modules affected: data-stores | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.116.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- data-stores/s3-bucket: support newer_noncurrent_versions



</div>


### [v0.116.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.116.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/30/2024 | Modules affected: networking, landingzone, services, services/eks-cluster | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.116.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Add route53 alias default to null since it&apos;s optional
- Expose SNS topic name variable for CloudTrail
- **NOTE**: The changes below have a typo in the variable name `access_entry_poilcy_associations`. If upgrading to use EKS Access Entry support, please skip this version and use the next version [v0.117.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.117.0) which has the typo fix included in the release.
    - Add Support for EKS Access Entries 
        - **NOTE**: this is a breaking change due to new AWS Provider minimum version requirements. Please see the Migration Guide below for details.



</div>


### [v0.115.6](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.115.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/25/2024 | Modules affected: services | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.115.6">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- services/ecs-cluster: update ecs-cluster to v0.38.3


</div>


### [v0.115.5](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.115.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/24/2024 | Modules affected: base, data-stores, landingzone, mgmt | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.115.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- LIB-112: Enabled terrascan, address dependabot alerts.
- SME-1960: Exposed http_default_action in service catalog ALB.





</div>


### [v0.115.4](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.115.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/10/2024 | Modules affected: networking | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.115.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Add policy for the VPC Gateway Endpoint resources on Mgmt VPC



</div>


### [v0.115.3](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.115.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/2/2024 | Modules affected: data-stores | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.115.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- data-stores/rds: add variable for security group description



</div>



## terraform-aws-vpc


### [v0.26.26](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.26.26)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/9/2024 | Modules affected: vpc-mgmt | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.26.26">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Add policy for the VPC Gateway Endpoint resources on Mgmt VPC



</div>



## terrapatch-cli


### [v0.1.7](https://github.com/gruntwork-io/terrapatch-cli/releases/tag/v0.1.7)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/29/2024 | <a href="https://github.com/gruntwork-io/terrapatch-cli/releases/tag/v0.1.7">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Release duplicated from https://github.com/gruntwork-io/terrapatch/releases/tag/v0.1.7

</div>

<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "releases",
  "hash": "f6d9c4326abd1de6f840b0a0d7489c50"
}
##DOCS-SOURCER-END -->

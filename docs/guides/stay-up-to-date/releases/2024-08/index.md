
# Gruntwork release 2024-08

<p style={{marginTop: "-25px"}}><small><a href="/guides">Guides</a> / <a href="/guides/stay-up-to-date">Update Guides</a> / <a href="/guides/stay-up-to-date/releases">Releases</a> / 2024-08</small></p>

This page is lists all the updates to the [Gruntwork Infrastructure as Code
Library](https://gruntwork.io/infrastructure-as-code-library/) that were released in 2024-08. For instructions
on how to use these updates in your code, check out the [updating
documentation](/library/stay-up-to-date/updating).

Here are the repos that were updated:

- [boilerplate](#boilerplate)
- [patcher-cli](#patcher-cli)
- [pipelines-cli](#pipelines-cli)
- [terraform-aws-asg](#terraform-aws-asg)
- [terraform-aws-cache](#terraform-aws-cache)
- [terraform-aws-ci](#terraform-aws-ci)
- [terraform-aws-ecs](#terraform-aws-ecs)
- [terraform-aws-eks](#terraform-aws-eks)
- [terraform-aws-monitoring](#terraform-aws-monitoring)
- [terraform-aws-openvpn](#terraform-aws-openvpn)
- [terraform-aws-security](#terraform-aws-security)
- [terraform-aws-service-catalog](#terraform-aws-service-catalog)
- [terraform-aws-static-assets](#terraform-aws-static-assets)
- [terraform-aws-utilities](#terraform-aws-utilities)


## boilerplate


### [v0.5.17](https://github.com/gruntwork-io/boilerplate/releases/tag/v0.5.17)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/16/2024 | <a href="https://github.com/gruntwork-io/boilerplate/releases/tag/v0.5.17">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - Bump google.golang.org/grpc from 1.38.0 to 1.56.3 in https://github.com/gruntwork-io/boilerplate/pull/149
- Bump golang.org/x/crypto from 0.0.0-20220427172511-eb4f295cb31f to 0.17.0 in https://github.com/gruntwork-io/boilerplate/pull/150
- Bump github.com/hashicorp/go-getter from 1.7.4 to 1.7.5 in https://github.com/gruntwork-io/boilerplate/pull/186
- Bump golang.org/x/net from 0.17.0 to 0.23.0 in https://github.com/gruntwork-io/boilerplate/pull/187
- Bump google.golang.org/protobuf from 1.30.0 to 1.33.0 in https://github.com/gruntwork-io/boilerplate/pull/188


**Full Changelog**: https://github.com/gruntwork-io/boilerplate/compare/v0.5.16...v0.5.17

</div>



## patcher-cli


### [v0.9.3](https://github.com/gruntwork-io/patcher-cli/releases/tag/v0.9.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/23/2024 | <a href="https://github.com/gruntwork-io/patcher-cli/releases/tag/v0.9.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * don&apos;t add changes to spec files to created PRs during `patcher update` by @ceschae

</div>


### [v0.9.2](https://github.com/gruntwork-io/patcher-cli/releases/tag/v0.9.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/23/2024 | <a href="https://github.com/gruntwork-io/patcher-cli/releases/tag/v0.9.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
* bring patcher&apos;s terragrunt import up to version 0.66.2 by @ceschae 

</div>


### [v0.9.1](https://github.com/gruntwork-io/patcher-cli/releases/tag/v0.9.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/22/2024 | <a href="https://github.com/gruntwork-io/patcher-cli/releases/tag/v0.9.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * chore: bump github.com/docker/docker from 24.0.9+incompatible to 25.0.6+incompatible by @dependabot 
* chore: bump cloudwatch-dashboard expected version in patcher go tests by @ceschae
* bug: check correct field when parsing github error response for already existing PR for patcher update by @ceschae 

* @ceschae made their first contribution 

</div>



## pipelines-cli


### [v0.29.0-rc2](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.29.0-rc2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/29/2024 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.29.0-rc2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Internal use only


</div>


### [v0.29.0-rc1](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.29.0-rc1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/27/2024 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.29.0-rc1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  


</div>


### [v0.28.1](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.28.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/22/2024 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.28.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Fall back to owner name for create change request by @Resonance1584 in https://github.com/gruntwork-io/pipelines/pull/234


**Full Changelog**: https://github.com/gruntwork-io/pipelines/compare/v0.28.0...v0.28.1


</div>


### [v0.28.0](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.28.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/14/2024 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.28.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * feat: Add drift-detected and composite events by @oredavids in https://github.com/gruntwork-io/pipelines/pull/236
* fix: Fix drift detection on unchanged units by @Resonance1584 in https://github.com/gruntwork-io/pipelines/pull/239
* fix: Use `--terragrunt-strict-include` for destroys by @yhakbar in https://github.com/gruntwork-io/pipelines/pull/240


**Full Changelog**: https://github.com/gruntwork-io/pipelines/compare/v0.27.2...v0.28.0


</div>


### [v0.28.0-rc6](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.28.0-rc6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/14/2024 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.28.0-rc6">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Internal use only


</div>


### [v0.28.0-rc5](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.28.0-rc5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/9/2024 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.28.0-rc5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Internal use only


</div>


### [v0.28.0-rc4](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.28.0-rc4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/9/2024 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.28.0-rc4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Internal use only


</div>


### [v0.28.0-rc3](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.28.0-rc3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/8/2024 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.28.0-rc3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Internal use only


</div>


### [v0.28.0-rc2](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.28.0-rc2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/8/2024 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.28.0-rc2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Internal use only


</div>


### [v0.28.0-rc1](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.28.0-rc1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/8/2024 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.28.0-rc1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Internal use only


</div>


### [v0.27.2](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.27.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/7/2024 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.27.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * fix: Fixing TG validation logic by @yhakbar in https://github.com/gruntwork-io/pipelines/pull/237


**Full Changelog**: https://github.com/gruntwork-io/pipelines/compare/v0.27.1...v0.27.2


</div>


### [v0.27.1](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.27.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/7/2024 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.27.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * fix: Addressing #230 review feedback by @yhakbar in https://github.com/gruntwork-io/pipelines/pull/235


**Full Changelog**: https://github.com/gruntwork-io/pipelines/compare/v0.27.0...v0.27.1


</div>


### [v0.27.0](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.27.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/7/2024 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.27.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
This adds two new configurations to Pipelines configurability in order to control the consolidation of added/changed and deleted files:


- `consolidate-added-or-changed`: Maps to `repository.consolidate_added_or_changed`
- `consolidate-deleted`: Maps to `repository.consolidate_deleted`


```hcl
repository &#x7B;
    consolidate_added_or_changed = true
    consolidate_deleted = false
&#x7D;
```


By default, Pipelines will consolidate added/changed jobs into as few jobs as possible. Using either `consolidate-added-or-changed` or `consolidate_added_or_changed`, this can be disabled.

On the otherhand, Pipelines _will not_ consolidate deleted jobs by default. Using either `consolidate-deleted` or `consolidate_deleted`, this enable this.

The reason for this difference is that it is generally safer to default to consolidating added/changed files, but not consolidating deleted files.
* feat: Configurable Consolidation of ModuleDelete Jobs by @yhakbar in https://github.com/gruntwork-io/pipelines/pull/230


**Full Changelog**: https://github.com/gruntwork-io/pipelines/compare/v0.26.1...v0.27.0


</div>


### [v0.26.2-rc1](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.26.2-rc1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/6/2024 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.26.2-rc1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Internal use only


</div>


### [v0.26.1](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.26.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/6/2024 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.26.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Fix propose-change-request permission check doesn&apos;t work in CI by @Resonance1584 in https://github.com/gruntwork-io/pipelines/pull/233


**Full Changelog**: https://github.com/gruntwork-io/pipelines/compare/v0.26.0...v0.26.1


</div>


### [v0.26.0](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.26.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/6/2024 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.26.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * feat: Adding `session-duration` configurability to legacy config by @yhakbar in https://github.com/gruntwork-io/pipelines/pull/226
* Add tfplan detect-drift by @Resonance1584 in https://github.com/gruntwork-io/pipelines/pull/225
* Fix missed errcheck by @Resonance1584 in https://github.com/gruntwork-io/pipelines/pull/232
* Add --terragrunt-non-interactive to plan commands by @Resonance1584 in https://github.com/gruntwork-io/pipelines/pull/231


**Full Changelog**: https://github.com/gruntwork-io/pipelines/compare/v0.25.0...v0.26.0


</div>


### [v0.26.0-rc4](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.26.0-rc4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/6/2024 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.26.0-rc4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Internal use only


</div>


### [v0.26.0-rc3](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.26.0-rc3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/5/2024 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.26.0-rc3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Internal use only


</div>


### [v0.26.0-rc2](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.26.0-rc2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/5/2024 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.26.0-rc2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Internal use only


</div>


### [v0.26.0-rc1](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.26.0-rc1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/5/2024 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.26.0-rc1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Internal use only


</div>


### [v0.25.0](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.25.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/5/2024 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.25.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * feat: Increasing consolidation for safe change types by @yhakbar in https://github.com/gruntwork-io/pipelines/pull/223
* Try find workflow file in multiple ways by @Resonance1584 in https://github.com/gruntwork-io/pipelines/pull/222
* chore: Adding `CODEOWNERS` file by @yhakbar in https://github.com/gruntwork-io/pipelines/pull/224
* Default session duration to 3600 by @Resonance1584 in https://github.com/gruntwork-io/pipelines/pull/228


**Full Changelog**: https://github.com/gruntwork-io/pipelines/compare/v0.24.0...v0.25.0


</div>


### [v0.24.0](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.24.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/1/2024 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.24.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * DEV-442 Add disk backed caching for session name by @Resonance1584 in https://github.com/gruntwork-io/pipelines/pull/221


**Full Changelog**: https://github.com/gruntwork-io/pipelines/compare/v0.23.1...v0.24.0


</div>


### [v0.24.0-rc2](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.24.0-rc2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/1/2024 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.24.0-rc2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * DEV-442 Add disk backed caching for session name by @Resonance1584 in https://github.com/gruntwork-io/pipelines/pull/221


**Full Changelog**: https://github.com/gruntwork-io/pipelines/compare/v0.23.1...v0.24.0-rc2


</div>


### [v0.24.0-rc1](https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.24.0-rc1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/1/2024 | <a href="https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.24.0-rc1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Internal use only


</div>



## terraform-aws-asg


### [v0.21.16](https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.21.16)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/6/2024 | Modules affected: server-group | <a href="https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.21.16">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Replace tfenv and tgswitch with mise
- Fix tests
- LIB-127: Enable terrascan





</div>



## terraform-aws-cache


### [v0.22.7](https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v0.22.7)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/13/2024 | Modules affected: redis | <a href="https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v0.22.7">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Upgrade default redis version from 5.0.5 to 5.0.6





</div>



## terraform-aws-ci


### [v0.58.0](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.58.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/27/2024 | Modules affected: install-jenkins, ecs-deploy-runner, ec2-backup, jenkins-server | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.58.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- Dependencies bump
- Replace Centos EOL references
- Enable terrascan
- Upgrade Go to  version `1.21.1`
- Added Github release helpers


</div>



## terraform-aws-ecs


### [v0.38.2](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.38.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/11/2024 | Modules affected: ecs-cluster | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.38.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- Add new script using ASG instance refresh to roll out changes to cluster nodes


</div>



## terraform-aws-eks


### [v0.68.0](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.68.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/23/2024 | Modules affected: eks-cluster-control-plane, eks-ebs-csi-driver | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.68.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- [**Breaking Change**]  Remove deprecated attribute `resolve_conflicts` from `aws_eks_addon` resources in `examples`, `eks-cluster-control-plane`, and `eks-ebs-csi-driver`.
    - Variables effected: `eks_addons`, `ebs_csi_driver_addon_config`
- Add new attribute `resolve_conflicts_on_create` for `aws_eks_addon` resources in `examples`, `eks-cluster-control-plane`, and `eks-ebs-csi-driver`.
- Add new attribute `resolve_conflicts_on_update` for `aws_eks_addon` resources in `examples`, `eks-cluster-control-plane`, and `eks-ebs-csi-driver`.



</div>


### [v0.67.12](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.67.12)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/23/2024 | Modules affected: eks-cluster-workers | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.67.12">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Add support for enabling tags in instance metadata



</div>


### [v0.67.11](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.67.11)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/12/2024 | Modules affected: eks-cluster-control-plane | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.67.11">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Add Support for Windows Managed Node Groups



</div>


### [v0.67.10](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.67.10)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/10/2024 | Modules affected: eks-k8s-cluster-autoscaler | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.67.10">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

-  Add EKS Pod Identity module
- Improve stability for  `TestEKSMixedWorkersDNS` 
- Improve stability for `TestEKSFargateClusterIRSA`



</div>


### [v0.67.9](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.67.9)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/8/2024 | Modules affected: eks-cluster-managed-workers | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.67.9">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- SME-1350, fix broken validation error_message because it&apos;s not a sentence



</div>



## terraform-aws-monitoring


### [v0.36.23](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.36.23)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/30/2024 | Modules affected: agents, logs | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.36.23">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- Replace Centos EOL references
- Update CODEOWNERS
- `agents/cloudwatch-agent`: check IMDS Version on instance for compatibility with v1 and v2



</div>


### [v0.36.22](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.36.22)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/13/2024 | Modules affected: logs | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.36.22">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Updated logs/syslog to check if logrotate is installed and install it if missing for Ubuntu 





</div>



## terraform-aws-openvpn


### [v0.27.7](https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.27.7)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/14/2024 | <a href="https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.27.7">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Add var to encrypt ebs volume on openvpn-server module by @dlewis152 in https://github.com/gruntwork-io/terraform-aws-openvpn/pull/267

**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-openvpn/compare/v0.27.6...v0.27.7

</div>



## terraform-aws-security


### [v0.74.1](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.74.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/5/2024 | Modules affected: aws-config-multi-region, aws-config | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.74.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Added support to excluded resource types from config recorder



</div>



## terraform-aws-service-catalog


### [v0.114.2](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.114.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/30/2024 | Modules affected: services | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.114.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- services/ecs-cluster  add curl check for AL2023 and RHEL9 compatibility





</div>


### [v0.114.1](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.114.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/28/2024 | Modules affected: services | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.114.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- services/ecs-cluster: Added new variable source_ami_block_device_type for specifying the block device type (gp2, gp3)




</div>


### [v0.114.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.114.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/15/2024 | Modules affected: networking/vpc, services/eks-argocd, services/eks-cluster, services/eks-core-services | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.114.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
Upgrade EKS modules to latest release version v0.67.11, including the following changes since v0.67.0:
- Update terraform-aws-eks to v0.67.11
- Expose `instance_maintenance_policy`  on EKS Self Managed Workers `services/eks-workers`
- Expose additional configuration variables on EKS Cluster Autoscaler in `services/eks-core-services`
- Expose `fluent_bit_sensitive_values`  variable on EKS Container Logs in `services/eks-core-services`
- Expose `ami_source` variable for EKS Managed Workers in `services/eks-workers`


</div>


### [v0.113.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.113.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/8/2024 | Modules affected: services/ecs-service, services/ecs-cluster | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.113.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- `services/ecs-service`
- `services/ecs-cluster`


Upgrade ECS modules to latest release version `v0.38.1`, including the following changes since `v0.35.14`:

- Add current account condition to IAM roles
- Add support for ECS cluster managed draining
- Replace custom python script for deployment checking with `wait_for_steady_state`
- Add CloudWatch deployment circuit breaker
- Minimum AWS provider version v5.1.0
- Added parameter to support `proxy_protocol_v2` on target groups


- https://github.com/gruntwork-io/terraform-aws-service-catalog/pull/2107
- https://github.com/gruntwork-io/terraform-aws-service-catalog/pull/2126



The custom `ecs-check-deploy-binaries` Python script was removed  in favour of `wait_for_steady_state` -parameter.

The following input variables were removed:

- `enable_ecs_deployment_check`
- `deployment_check_timeout_seconds`
- `deployment_check_loglevel`

Remove any references to those inputs in your configuration.

New input `wait_for_steady_state` was introduced to wait for the service to reach a steady state on deployment. The default value is `true`. The time to wait for the service to reach steady state can be adjusted with a new input `service_create_update_timeout`, default is `20m`.

Minimum AWS Provider version is now `v5.1.0`.

IAM roles created by the module add a current account condition to IAM roles as [recommended by AWS](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task-iam-roles.html#create_task_iam_policy_and_role).


Minimum AWS Provider version is now `v5.1.0`

IAM roles created by the module add a current account condition to IAM roles as [recommended by AWS](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task-iam-roles.html#create_task_iam_policy_and_role).

</div>


### [v0.112.20](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.112.20)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/8/2024 | Modules affected: data-stores | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.112.20">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Add ability to use existing s3 bucket for access logs



</div>



## terraform-aws-static-assets


### [v0.18.4](https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.18.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/22/2024 | Modules affected: s3-cloudfront | <a href="https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.18.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- `s3-cloudfront`


- Add support for `default_origin_request_policy_id`


Special thanks to the following users for their contribution!

- @risantoni 


- https://github.com/gruntwork-io/terraform-aws-static-assets/pull/161
- https://github.com/gruntwork-io/terraform-aws-static-assets/pull/164
- https://github.com/gruntwork-io/terraform-aws-static-assets/pull/163


</div>



## terraform-aws-utilities


### [v0.10.4](https://github.com/gruntwork-io/terraform-aws-utilities/releases/tag/v0.10.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/12/2024 | Modules affected: patcher-test | <a href="https://github.com/gruntwork-io/terraform-aws-utilities/releases/tag/v0.10.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- `patcher-test` - Added a sample input to demonstrate patching


This is another no-op release (similar to 0.10.3) with no functional module changes.  The purpose of the release is exclusively for demonstrating patcher.



- https://github.com/gruntwork-io/terraform-aws-utilities/pull/102



</div>


### [v0.10.3](https://github.com/gruntwork-io/terraform-aws-utilities/releases/tag/v0.10.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/12/2024 | <a href="https://github.com/gruntwork-io/terraform-aws-utilities/releases/tag/v0.10.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
(None)


This is a no-op release to include a patcher config change, no module code was changed.

- https://github.com/gruntwork-io/terraform-aws-utilities/pull/101


* Further Patcher Testing by @ZachGoldberg in https://github.com/gruntwork-io/terraform-aws-utilities/pull/101


**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-utilities/compare/v0.10.2...v0.10.3

</div>


### [v0.10.2](https://github.com/gruntwork-io/terraform-aws-utilities/releases/tag/v0.10.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/8/2024 | Modules affected: patcher-test | <a href="https://github.com/gruntwork-io/terraform-aws-utilities/releases/tag/v0.10.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- `patcher-test`



- A sample no-op module to demonstrate patcher breaking change support



- https://github.com/gruntwork-io/terraform-aws-utilities/pull/100



</div>




<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "releases",
  "hash": "e0cfef8e55ce12a996a9ab0f12dc1d98"
}
##DOCS-SOURCER-END -->

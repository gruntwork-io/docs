
# Gruntwork release 2022-08

<p style={{marginTop: "-25px"}}><small><a href="/guides">Guides</a> / <a href="/guides/stay-up-to-date">Update Guides</a> / <a href="/guides/stay-up-to-date/releases">Releases</a> / 2022-08</small></p>

This page is lists all the updates to the [Gruntwork Infrastructure as Code
Library](https://gruntwork.io/infrastructure-as-code-library/) that were released in 2022-08. For instructions
on how to use these updates in your code, check out the [updating
documentation](/library/stay-up-to-date/updating).

Here are the repos that were updated:

- [gruntkms](#gruntkms)
- [gruntwork](#gruntwork)
- [terraform-aws-architecture-catalog](#terraform-aws-architecture-catalog)
- [terraform-aws-cache](#terraform-aws-cache)
- [terraform-aws-ci](#terraform-aws-ci)
- [terraform-aws-ci-steampipe](#terraform-aws-ci-steampipe)
- [terraform-aws-cis-service-catalog](#terraform-aws-cis-service-catalog)
- [terraform-aws-ecs](#terraform-aws-ecs)
- [terraform-aws-eks](#terraform-aws-eks)
- [terraform-aws-lambda](#terraform-aws-lambda)
- [terraform-aws-load-balancer](#terraform-aws-load-balancer)
- [terraform-aws-messaging](#terraform-aws-messaging)
- [terraform-aws-monitoring](#terraform-aws-monitoring)
- [terraform-aws-openvpn](#terraform-aws-openvpn)
- [terraform-aws-server](#terraform-aws-server)
- [terraform-aws-service-catalog](#terraform-aws-service-catalog)
- [terraform-aws-static-assets](#terraform-aws-static-assets)


## gruntkms


### [v0.0.11](https://github.com/gruntwork-io/gruntkms/releases/tag/v0.0.11)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/2/2022 | <a href="https://github.com/gruntwork-io/gruntkms/releases/tag/v0.0.11">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- Updated decryption routine to decrypt multiple ciphertexts in the input concurrently to improve performance.


Special thanks to @rubysolo for their contribution.


https://github.com/gruntwork-io/gruntkms/pull/36


</div>



## gruntwork


### [v0.3.10](https://github.com/gruntwork-io/gruntwork/releases/tag/v0.3.10)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/24/2022 | <a href="https://github.com/gruntwork-io/gruntwork/releases/tag/v0.3.10">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Fix a bug causing the git ref used to fetch the boilerplate template for the form wizard to be out of date.

</div>


### [v0.3.9](https://github.com/gruntwork-io/gruntwork/releases/tag/v0.3.9)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/22/2022 | <a href="https://github.com/gruntwork-io/gruntwork/releases/tag/v0.3.9">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  This release adds two new commands: 
* `gruntwork vault login` - quickly log into any account defined in your [aws-vault](https://github.com/99designs/aws-vault) account profiles 
* `gruntwork vault exec` - quickly execute an arbitrary command against any account defined in your aws-vault account profiles 

These commands are intended to be used in conjunction with the `gruntwork vault generate` command, for scaffolding aws-vault account profiles from your infrastructure-live repository. 

</div>


### [v0.3.8](https://github.com/gruntwork-io/gruntwork/releases/tag/v0.3.8)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/17/2022 | <a href="https://github.com/gruntwork-io/gruntwork/releases/tag/v0.3.8">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  This release adds a new command `gruntwork vault generate` that assists you in generating valid [aws-vault](https://github.com/99designs/aws-vault) account profiles for your Ref Arch AWS accounts, to ease login and executing commands.

</div>



## terraform-aws-architecture-catalog


### [v0.0.32](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v0.0.32)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/4/2022 | <a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v0.0.32">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Updates terraform-aws-cis-service-catalog ref to latest version by @yorinasub17 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/784
* Fix Jenkins dockerfile and jenkinsfile config to properly auth by @yorinasub17 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/768
* Bump dependency versions by @yorinasub17 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/789


**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-architecture-catalog/compare/v0.0.31...v0.0.32

</div>


### [v0.0.31](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v0.0.31)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/2/2022 | <a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v0.0.31">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  * Only check versioning tools locally by @yorinasub17 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/657
* Fix release lock logic by @yorinasub17 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/658
* Remove unused InfraLiveURLType by @zackproser in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/663
* Return all Route53 hosted zone errors after verification by @zackproser in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/662
* Implement lock status report command by @zackproser in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/656
* Implement preflight to sanity check all fields for completion by @zackproser in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/661
* Tweak preflight check so it works on aws hardware by @yorinasub17 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/665
* Allow different env var for preflight check GH token by @yorinasub17 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/664
* Add skip ci message in state machine commit by @yorinasub17 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/673
* Cleanup workflow files post deploy by @yorinasub17 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/676
* Use the standard ECS Deploy Runner in the Gruntwork customer access account to build the docker images by @yorinasub17 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/672
* Bump go to 1.17 by @yorinasub17 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/680
* Update state machine paths to match current environment by @yorinasub17 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/674
* Pass no-color flag if running in cloud by @yorinasub17 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/671
* Set duration to one hour by @yorinasub17 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/677
* Extract oneHour time duration to a constant by @yorinasub17 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/681
* Add ability to publish preflight check results as GitHub check run annotations by @yorinasub17 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/682
* Cleanup check errors by @yorinasub17 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/684
* Fix refarch-example-generator to use latest go-commons and urfave/cli/v2 by @yorinasub17 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/685
* Send deployment finished email by @yorinasub17 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/686
* Cleanup more preflight checks by @yorinasub17 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/687
* Commit code after generating by @yorinasub17 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/692
* New error: PrimaryRegion and secret ARN region don&apos;t match by @zackproser in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/694
* If on AWS hardware, hardcode the mssfix value to use by @yorinasub17 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/693
* Add skip_get_ec2_platforms by @yorinasub17 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/700
* Add a link to the deployer infra documentation by @yorinasub17 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/701
* Implement preflight check for empty strings in IP address lists by @zackproser in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/698
* Make sure to change state machine commit message based on run error by @yorinasub17 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/704
* Do an upsert for preflight check reporting by @yorinasub17 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/706
* Use workflow dispatch to mark preflight check as done by @yorinasub17 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/707
* Add Preflight ensuring customers get correct CIS access by @zackproser in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/708
* Remove unused var create_route53_entry by @yorinasub17 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/709
* Consolidate redundant logic into preflight check by @zackproser in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/711
* Should be build.pkr.hcl, not build.json by @yorinasub17 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/715
* Fix bug where the wrong repo was linked to ami build scripts by @yorinasub17 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/716
* Make sure to set desired_capacity when min_size is adjusted by @yorinasub17 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/717
* Return all preflight errors instead of err directly by @yorinasub17 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/718
* Grant GW Ref Arch deployer&apos;s CIDR access to shared VPC mgmt by @zackproser in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/719
* Enhance preflight access errors with remediation info by @zackproser in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/721
* Update PR Template by @rhoboat in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/722
* Catch CACertFields whose length exceeds 40 by @zackproser in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/734
* Use lower to normalize the account_name by @yorinasub17 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/736
* Fix ci script testing by @yorinasub17 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/738
* One more place that needs lowercasing by @yorinasub17 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/742
* Clarify that there are multiple OpenVPN instances by @zackproser in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/744
* Implement preflight check for GitLab PAT validity by @zackproser in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/735
* Make cidr loop consistent by @yorinasub17 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/746
* Bump versions of various dependencies by @yorinasub17 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/749
* Truncate redis name by @yorinasub17 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/751
* Implement preflight check for duplicate account IDs by @zackproser in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/748
* Better support alternative default branch on new platform by @yorinasub17 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/757
* Another place checking for non-main branch by @yorinasub17 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/758
* Implement preflight tests by @zackproser in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/756
* Change the verifyGitHubTokenScopes to have additional check on parent token by @hongil0316 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/750
* When enabling mgmt VPC bastions for jenkins, we need to explicitly flip the include vars by @yorinasub17 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/764
* Bump terraform-aws-cis-service-catalog to latest version by @yorinasub17 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/765
* Use go template comment syntax when commenting for template by @yorinasub17 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/766
* Excise refarch-deployer from arch-catalog by @zackproser in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/763
* Fix helm provider issue by @yorinasub17 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/767
* Update codeowners by @rhoboat in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/760
* Bump redis version to 6 by @yorinasub17 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/772
* Include events permissions when including DB by @yorinasub17 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/773
* Make sure to create SNS topic in every account and encrypt the topic by @yorinasub17 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/774
* QUICK_START.md: Fix deploy apps link in CIS RefArch by @iangrunt in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/770
* Update versions of dependencies by @yorinasub17 in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/781

* @hongil0316 made their first contribution in https://github.com/gruntwork-io/terraform-aws-architecture-catalog/pull/750

**Full Changelog**: https://github.com/gruntwork-io/terraform-aws-architecture-catalog/compare/v0.0.30...v0.0.31

</div>



## terraform-aws-cache


### [v0.18.1](https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v0.18.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/2/2022 | <a href="https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v0.18.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
(none)



- No functional changes were introduced in this release!
- Updated incorrect go package reference.



- https://github.com/gruntwork-io/terraform-aws-cache/pull/84




</div>


### [v0.18.0](https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v0.18.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/2/2022 | Modules affected: memcached, redis | <a href="https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v0.18.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Some housekeeping updates.
- **Unlock AWS provider v4. Require minimum 3.75.1.** This update includes a few tests that make sure upgrading to this module from the last release is easy. However, you may need to bump your AWS provider version. See the migration guide notes below for more.


</div>



## terraform-aws-ci


### [v0.50.7](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.50.7)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/12/2022 | Modules affected: terraform-helpers | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.50.7">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Updated `terraform-update-variable` to make the formatting step optional, allowing you to run it without `terraform` being available in the `PATH`.




</div>


### [v0.50.6](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.50.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/3/2022 | Modules affected: ecs-deploy-runner-standard-configuration, ecs-deploy-runner | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.50.6">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Added support in `build-docker-image` ECS Deploy Runner script for injecting docker buildkit compatible secrets into Kaniko builds via the `--env-secret` parameter.




</div>


### [v0.50.5](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.50.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/2/2022 | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.50.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Improvements to upgrade testing





</div>



## terraform-aws-ci-steampipe


### [v0.3.4](https://github.com/gruntwork-io/terraform-aws-ci-steampipe/releases/tag/v0.3.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/4/2022 | Modules affected: ecs-deploy-runner-with-steampipe, steampipe-runner | <a href="https://github.com/gruntwork-io/terraform-aws-ci-steampipe/releases/tag/v0.3.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- `ecs-deploy-runner-with-steampipe`
- `steampipe-runner`

- Updated dependencies:
    - `terraform-aws-service-catalog`: `v0.92.0` =&gt; `v0.95.0`
    - `terraform-aws-security`: `v0.65.6` =&gt; `v0.65.8`
    - Various test dependencies.

https://github.com/gruntwork-io/terraform-aws-ci-steampipe/pull/31

</div>



## terraform-aws-cis-service-catalog


### [v0.41.0](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.41.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/11/2022 | Modules affected: landingzone/account-baseline-app, landingzone/account-baseline-root, landingzone/account-baseline-security, networking/vpc-mgmt | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.41.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Updated for-production examples for Reference Architecture
- Updated dependencies:
    - `terraform-aws-service-catalog`: `v0.95.0` to `v0.96.1`
- **Unlocked AWS provider v4. Require minimum 3.75.1.**
    - In [v0.39.0](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.39.0), we missed several module updates in the underlying `terraform-aws-service-catalog` dependency of this repo. 
    - That has been remedied in [gruntwork-io/terraform-aws-service-catalog@v0.96.1 (release)](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.96.1). 
    - Now we&apos;ve updated all references in `terraform-aws-cis-service-catalog` to point to the latest, AWS Provider v4 unlocked, version of `terraform-aws-service-catalog`. 
    - No configuration changes are required by you. Please see the migration guide below.


</div>


### [v0.40.1](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.40.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/4/2022 | Modules affected: landingzone/account-baseline-app, landingzone/account-baseline-root, landingzone/account-baseline-security, networking/vpc-mgmt | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.40.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Update dependencies:
    - `terraform-aws-service-catalog`: `v0.94.0` to `v0.95.0`
    - `terraform-aws-monitoring`: `v0.35.2` to `v0.35.3`
    - Various test dependencies




</div>


### [v0.40.0](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.40.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/3/2022 | Modules affected: landingzone/account-baseline-app, landingzone/account-baseline-root, landingzone/account-baseline-security, security/aws-securityhub | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.40.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Renamed variable `associate_to_master_account_id` to `associate_to_admin_account_id` in `aws-securityhub` module to align with latest AWS documentation.


</div>


### [v0.39.0](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.39.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/2/2022 | Modules affected: landingzone/account-baseline-app, landingzone/account-baseline-root, landingzone/account-baseline-security, networking/vpc | <a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.39.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- **Unlock AWS provider v4. Require minimum 3.75.1.** This update includes a few tests that make sure upgrading to this module from the last release is easy. However, you may need to bump your AWS provider version. See the migration guide notes below for more info.


</div>



## terraform-aws-ecs


### [v0.34.1](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.34.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/18/2022 | Modules affected: ecs-cluster | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.34.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Updated `ecs-cluster` module to use the `aws_ecs_cluster_capacity_providers` to avoid the need for a python script on destroy.




</div>


### [v0.34.0](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.34.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/4/2022 | Modules affected: ecs-cluster, ecs-daemon-service, ecs-service | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.34.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Internal housekeeping changes
  - Added patch for `v0.32.0`
  - Added patch for `v0.33.0`
  - Updated code owners
  - Added patch for `v0.31.0`
- **Unlock AWS provider v4. Require minimum 3.75.1.** This update includes a few tests that make sure upgrading to this module from the last release is easy. However, you may need to bump your AWS provider version. See the migration guide notes below for more.


</div>



## terraform-aws-eks


### [v0.53.0](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.53.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/8/2022 | Modules affected: eks-alb-ingress-controller, eks-alb-ingress-controller-iam-policy, eks-aws-auth-merger, eks-cloudwatch-agent | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.53.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Housekeeping fixes:
  - Fixed Helm link in `alb-ingress-controller` `README`
  - Fixed contributing docs link
  - Updated code owners
- **Unlock AWS provider v4. Require minimum 3.75.1.** This update includes a few tests that make sure upgrading to this module from the last release is easy. However, you may need to bump your AWS provider version. See the migration guide notes below for more.


</div>



## terraform-aws-lambda


### [v0.20.3](https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.20.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/3/2022 | Modules affected: run-lambda-entrypoint | <a href="https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.20.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Updated `run-lambda-entrypoint` CLI to support loading Secrets Manager entries by name instead of ARN. You can now pass a Secrets Manager name to the `_ARN` environment variables that the entrypoint CLI supports.




</div>



## terraform-aws-load-balancer


### [v0.29.1](https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.29.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/2/2022 | <a href="https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.29.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- No functional changes were introduced with this release!
- Updated incorrect go package reference.






</div>


### [v0.29.0](https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.29.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/1/2022 | Modules affected: alb, acm-tls-certificate, lb-listener-rules | <a href="https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.29.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- **Unlock AWS provider v4. Require minimum 3.75.1.** This update includes a few tests that make sure upgrading to this module from the last release is easy. However, you may need to bump your AWS provider version. See the migration guide notes below for more.


</div>



## terraform-aws-messaging


### [v0.9.1](https://github.com/gruntwork-io/terraform-aws-messaging/releases/tag/v0.9.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/2/2022 | <a href="https://github.com/gruntwork-io/terraform-aws-messaging/releases/tag/v0.9.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- No functional changes were introduced in this release!
- Updated incorrect go package reference.



</div>


### [v0.9.0](https://github.com/gruntwork-io/terraform-aws-messaging/releases/tag/v0.9.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/1/2022 | Modules affected: kinesis, msk, sns-sqs-connection, sns | <a href="https://github.com/gruntwork-io/terraform-aws-messaging/releases/tag/v0.9.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- **Unlock AWS provider v4. Require minimum 3.75.1.** This update includes a few tests that make sure upgrading to this module from the last release is easy. However, you may need to bump your AWS provider version. See the migration guide notes below for more.


</div>



## terraform-aws-monitoring


### [v0.35.5](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.35.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/26/2022 | Modules affected: logs | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.35.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- `modules/logs` updated to only install logrotate from source if the RPM isn&apos;t already installed



</div>


### [v0.35.4](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.35.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/18/2022 | Modules affected: alarms/alb-alarms, alarms/alb-target-group-alarms, alarms/asg-cpu-alarms, alarms/asg-disk-alarms | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.35.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Updated all alarms module to expose `treat_missing_data` as a configurable parameter.





</div>


### [v0.35.3](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.35.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/4/2022 | Modules affected: All | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.35.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Renamed legacy `vars.tf` files to `variables.tf`.





</div>



## terraform-aws-openvpn


### [v0.24.3](https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.24.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/10/2022 | Modules affected: openvpn-admin | <a href="https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.24.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Update dependencies of `openvpn-admin` utility to support usage with AWS SSO.





</div>


### [v0.24.2](https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.24.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/8/2022 | <a href="https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.24.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Add retroactive patches for backward incompatible versions `v0.20.0` to `v0.24.0`





</div>



## terraform-aws-server


### [v0.15.1](https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.15.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/2/2022 | <a href="https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.15.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
- No functional changes were introduced in this release!
- Updated incorrect go package reference




</div>


### [v0.15.0](https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.15.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/1/2022 | Modules affected: ec2-backup, single-server | <a href="https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.15.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- **Unlock AWS provider v4. Require minimum 3.75.1.** This update includes a few tests that make sure upgrading to this module from the last release is easy. However, you may need to bump your AWS provider version. See the migration guide notes below for more.


</div>



## terraform-aws-service-catalog


### [v0.96.2](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.96.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/19/2022 | Modules affected: services/k8s-service, landingzone/account-baseline-root, mgmt/terraform-aws-openvpn, mgmt/jenkins | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.96.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Exposed the `cleanup_on_fail` parameter in `k8s-service` module&apos;s `helm_release` resource.
- Updated `landingzone/account-baseline-root` to expose `advanced_event_selectors` for Cloudtrail as `cloudtrail_advanced_event_selectors`.
- Updated `rds` module to make the `option_group_name` parameter configurable.
- Updated `jenkins` to allow configuring without a Route53 entry.
- Updated dependencies:
    - `terraform-aws-openvpn`: `v0.24.1` to `v0.24.3`



</div>


### [v0.96.1](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.96.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/11/2022 | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.96.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- **Unlock AWS Provider v4. Require minimum 3.75.1.** In https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.96.0, we missed a few spots. This release updates the above modules with the same minimum version of 3.75.1, with no upper limit. These updates arose from bumping the following underlying library modules:
  - `terraform-aws-server`
  - `terraform-aws-load-balancer`
  - `terraform-aws-cache`
  - `terraform-aws-messaging`
 
Special thanks to @lorelei-rupp-imprivata for catching this issue!



</div>


### [v0.96.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.96.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/9/2022 | Modules affected: services, base, data-stores, landingzone | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.96.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Module dependency updates, to unlock Terraform AWS Provider v4:
  - Update Terraform github.com/gruntwork-io/terraform-aws-eks to v0.53.0
  - Update Terraform github.com/gruntwork-io/terraform-aws-ecs to v0.34.0
- **Unlock AWS provider v4. Require minimum 3.75.1.** This update includes a few tests that make sure upgrading to this module from the last release is easy. However, you may need to bump your AWS provider version. See the migration guide notes below for more.


</div>


### [v0.95.1](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.95.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/5/2022 | Modules affected: base/ec2-baseline, services/ec2-instance, mgmt/jenkins, mgmt/bastion-host | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.95.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Exposed the ability to set AWS Tags on the resources managed by the `ecs-deploy-runner` module.
- Updated dependencies:
    - `terraform-aws-monitoring`: `v0.35.2` to `v0.35.3`
    - Updated test dependencies.
- Updated `for-production` example to the latest iteration of the Reference Architecture.



</div>


### [v0.95.0](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.95.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/4/2022 | Modules affected: networking/sns-topics, base/ec2-baseline, services/ec2-instance, mgmt/jenkins | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.95.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Updated dependencies:
    - `terraform-aws-ci`: `v0.50.3` to `v0.50.6`
    - `terraform-aws-monitoring`: `v0.34.1` to `v0.35.2`
- Updated `sns-topics` module to require passing through the Slack webhook URL using AWS Secrets Manager instead of directly as module variables. This is to treat the webhook URL more like a Secret as recommended by Slack.


</div>


### [v0.94.2](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.94.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/3/2022 | Modules affected: data-stores/aurora, data-stores/rds, landingzone/account-baseline-app, landingzone/account-baseline-root | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.94.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Updated dependency `terraform-aws-data-storage` from `v0.24.0` to `v0.24.2`
- Exposed new parameters to pass through permission boundaries to IAM Roles managed by the `account-baseline` modules.



</div>


### [v0.94.1](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.94.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/2/2022 | Modules affected: data-stores/aurora, services/public-static-website | <a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.94.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Updated `aurora` module to output the generated security group ID.
- Updated the website S3 bucket created in the `public-static-website` module with additional security configurations when operating in private bucket mode. The following changes are backward compatible with existing websites.
    - The bucket will now configure [blocking of public access](https://aws.amazon.com/s3/features/block-public-access/) for the objects.
    - The bucket will now enforce encryption of data in transit (only accessible over TLS).
- Added support for configuring [CloudFront Functions](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/cloudfront-functions.html), a more performant and lightweight alternative to Lambda@Edge, with static websites.
- Added support for implementing [default directory indexing](https://aws.amazon.com/blogs/compute/implementing-default-directory-indexes-in-amazon-s3-backed-amazon-cloudfront-origins-using-lambdaedge/) for private S3 bucket backed static websites.
- Added instructions to README on how to perform a blue-green deployment of Aurora.




</div>



## terraform-aws-static-assets


### [v0.15.8](https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.15.8)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 8/16/2022 | Modules affected: s3-cloudfront | <a href="https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.15.8">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

- Add support for s3 buckets with v4 Auth



</div>

<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "releases",
  "hash": "fc6c96c24f3b3ce483fb9d11801fae95"
}
##DOCS-SOURCER-END -->

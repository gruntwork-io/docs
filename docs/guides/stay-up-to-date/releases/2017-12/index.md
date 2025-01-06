
# Gruntwork release 2017-12

<p style={{marginTop: "-25px"}}><small><a href="/guides">Guides</a> / <a href="/guides/stay-up-to-date">Update Guides</a> / <a href="/guides/stay-up-to-date/releases">Releases</a> / 2017-12</small></p>

This page is lists all the updates to the [Gruntwork Infrastructure as Code
Library](https://gruntwork.io/infrastructure-as-code-library/) that were released in 2017-12. For instructions
on how to use these updates in your code, check out the [updating
documentation](/library/stay-up-to-date/updating).

Here are the repos that were updated:

- [gruntwork](#gruntwork)
- [terraform-aws-asg](#terraform-aws-asg)
- [terraform-aws-ci](#terraform-aws-ci)
- [terraform-aws-data-storage](#terraform-aws-data-storage)
- [terraform-aws-monitoring](#terraform-aws-monitoring)
- [terraform-aws-openvpn](#terraform-aws-openvpn)
- [terraform-aws-sam](#terraform-aws-sam)
- [terraform-aws-server](#terraform-aws-server)


## gruntwork


### [v0.0.14](https://github.com/gruntwork-io/gruntwork/releases/tag/v0.0.14)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/22/2017 | <a href="https://github.com/gruntwork-io/gruntwork/releases/tag/v0.0.14">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  v0.0.14: The `wizard` now properly requests TLS certs with wildcard domain names.

</div>


### [v0.0.13](https://github.com/gruntwork-io/gruntwork/releases/tag/v0.0.13)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/18/2017 | <a href="https://github.com/gruntwork-io/gruntwork/releases/tag/v0.0.13">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/gruntwork/pull/14: Improve error handling and documentation around AWS Organizations.

</div>


### [v0.0.12](https://github.com/gruntwork-io/gruntwork/releases/tag/v0.0.12)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/9/2017 | <a href="https://github.com/gruntwork-io/gruntwork/releases/tag/v0.0.12">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/gruntwork/pull/12: You can now set the account name to `__current__` to have the `gruntwork` CLI make changes in the current AWS account rather than a child account.

</div>


### [v0.0.11](https://github.com/gruntwork-io/gruntwork/releases/tag/v0.0.11)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/7/2017 | <a href="https://github.com/gruntwork-io/gruntwork/releases/tag/v0.0.11">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/gruntwork/pull/11: The `gruntwork` CLI will now use DNS validation when possible for TLS certs from ACM, so validation is completely automatic, and does not require clicking links in your email.

</div>


### [v0.0.10](https://github.com/gruntwork-io/gruntwork/releases/tag/v0.0.10)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/6/2017 | <a href="https://github.com/gruntwork-io/gruntwork/releases/tag/v0.0.10">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/gruntwork/pull/10: Remove validation for state when registering domain names.

</div>


### [v0.0.9](https://github.com/gruntwork-io/gruntwork/releases/tag/v0.0.9)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/4/2017 | <a href="https://github.com/gruntwork-io/gruntwork/releases/tag/v0.0.9">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/gruntwork/pull/9: Add support for domains registered outside of AWS.

</div>



## terraform-aws-asg


### [v0.6.4](https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.6.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/18/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.6.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - **ENHANCEMENT: module/server-group.** Add the option of assigning a Route 53 DNS Record to each ENI attached to an EC2 Instance in the Server Group. This provides an effective way of addressing ENIs via DNS instead of via their static IP address. (#15)

</div>



## terraform-aws-ci


### [v0.5.1](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.5.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/8/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.5.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/module-ci/pull/46: Add a pre-commit hook for use with [pre-commit](http://pre-commit.com/) for running `terraform fmt`. For usage instructions, check out [pre-commit module documentation](https://github.com/gruntwork-io/module-ci/tree/master/modules/precommit-hooks).

</div>



## terraform-aws-data-storage


### [v0.4.1](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.4.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/19/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.4.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/module-data-storage/pull/31: Fix the default param group name for SQL server, which uses a different format than all the other DBs.

</div>



## terraform-aws-monitoring


### [v0.8.1](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.8.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/14/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.8.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/module-aws-monitoring/pull/39, https://github.com/gruntwork-io/module-aws-monitoring/pull/40: The `ecs-cluster-alarms` module now exposes `ecs_cluster_high_memory_utilization_treat_missing_data` and `ecs_cluster_high_cpu_utilization_treat_missing_data` input variables you can use to configure what the alarms should do if no data is being emitted (default is `missing`). Also, fix a bug in `configure-syslog` that would cause `yum update` to hang, waiting for user input.

</div>


### [v0.8.0](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.8.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/13/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.8.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/module-aws-monitoring/pull/38: Fig `logrotate` settings to use `copytruncate` (so files are rotated properly even if a process maintains the old file handle) and `maxsize` instead of `size` (as `size` conflicts with `daily`). To use `maxsize`, we also had to install a newer version of `logrotate` on Amazon Linux distros, which, by default, run a version that&apos;s more than 7 years old. 

</div>



## terraform-aws-openvpn


### [v0.5.0](https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.5.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/8/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.5.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  BACKWARDS INCOMPATIBLE CHANGES

* Update package to default the certificate revocation list (crl) expiration to 10 years
* fix an issue with intermittent test failures
* migrate to dep from glide
* migrate to Circle CI 2.0
* add backup-openvpn-pki module
* backup pki on an hourly basis via cron
* update docs

When upgrading to this version, it is important to make sure you install the new `backup-openvpn-pki` module in your packer templates. For an example, please see the packer example in the `examples` folder.

We also suggest explicitly providing values for the `--request-url` parameter to the `run-process-requests` script and the `--revoke-url` parameter to the `run-process-revokes` script. For a working example, see the `user-data.sh` script from the `openvpn-host` example.

</div>



## terraform-aws-sam


### [v0.0.1](https://github.com/gruntwork-io/terraform-aws-sam/releases/tag/v0.0.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/22/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-sam/releases/tag/v0.0.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  initial release

</div>



## terraform-aws-server


### [v0.2.2](https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.2.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 12/3/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.2.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/module-server/pull/22: You can now configure the `source_dest_check` param on the `single-server` module.

</div>

<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "releases",
  "hash": "dfc7cbfb80f106f8b3e789b5defde871"
}
##DOCS-SOURCER-END -->

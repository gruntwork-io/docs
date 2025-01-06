
# Gruntwork release 2017-10

<p style={{marginTop: "-25px"}}><small><a href="/guides">Guides</a> / <a href="/guides/stay-up-to-date">Update Guides</a> / <a href="/guides/stay-up-to-date/releases">Releases</a> / 2017-10</small></p>

This page is lists all the updates to the [Gruntwork Infrastructure as Code
Library](https://gruntwork.io/infrastructure-as-code-library/) that were released in 2017-10. For instructions
on how to use these updates in your code, check out the [updating
documentation](/library/stay-up-to-date/updating).

Here are the repos that were updated:

- [boilerplate](#boilerplate)
- [gruntkms](#gruntkms)
- [terraform-aws-asg](#terraform-aws-asg)
- [terraform-aws-data-storage](#terraform-aws-data-storage)
- [terraform-aws-lambda](#terraform-aws-lambda)
- [terraform-aws-monitoring](#terraform-aws-monitoring)
- [terraform-aws-openvpn](#terraform-aws-openvpn)
- [terraform-aws-server](#terraform-aws-server)


## boilerplate


### [v0.2.22](https://github.com/gruntwork-io/boilerplate/releases/tag/v0.2.22)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/24/2017 | <a href="https://github.com/gruntwork-io/boilerplate/releases/tag/v0.2.22">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/boilerplate/pull/45: You can now use the `--disable-hooks` and `--disable-shell` arguments to disable hooks and shell commands, respectively. This is useful if you want to disable all “side effects” and solely have boilerplate generate code.

</div>


### [v0.2.21](https://github.com/gruntwork-io/boilerplate/releases/tag/v0.2.21)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/21/2017 | <a href="https://github.com/gruntwork-io/boilerplate/releases/tag/v0.2.21">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/boilerplate/pull/44: Add support for JSON maps/lists as a more reliable way to get typed values in the `default` field.

</div>


### [v0.2.20](https://github.com/gruntwork-io/boilerplate/releases/tag/v0.2.20)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/20/2017 | <a href="https://github.com/gruntwork-io/boilerplate/releases/tag/v0.2.20">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/boilerplate/pull/43: Boilerplate is now more lenient with whitespace when parsing lists/maps.

</div>


### [v0.2.19](https://github.com/gruntwork-io/boilerplate/releases/tag/v0.2.19)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/20/2017 | <a href="https://github.com/gruntwork-io/boilerplate/releases/tag/v0.2.19">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/boilerplate/pull/42: You can now define a `skip` parameter in `hooks` to conditionally enable/disable hooks.

</div>


### [v0.2.18](https://github.com/gruntwork-io/boilerplate/releases/tag/v0.2.18)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/20/2017 | <a href="https://github.com/gruntwork-io/boilerplate/releases/tag/v0.2.18">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/boilerplate/pull/41: boilerplate can now parse maps that have colon values in the key.

</div>



## gruntkms


### [v0.0.6](https://github.com/gruntwork-io/gruntkms/releases/tag/v0.0.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/23/2017 | <a href="https://github.com/gruntwork-io/gruntkms/releases/tag/v0.0.6">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/gruntkms/pull/6: You can now tell gruntkms to assume an IAM role using the `--role-arn` parameter.

</div>



## terraform-aws-asg


### [v0.6.3](https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.6.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/8/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.6.3">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/module-asg/pull/13: Update module-server version. Add DescribeSubnets permission. Fix concurrency issues.

</div>


### [v0.6.2](https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.6.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/2/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.6.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/module-asg/pull/12: Clean up the tmp folder for boto3 before trying to extract into it again. 

</div>



## terraform-aws-data-storage


### [v0.3.0](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.3.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/4/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.3.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

</div>



## terraform-aws-lambda


### [v0.1.1](https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.1.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/10/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.1.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/package-lambda/pull/7: Fix lambda module outputs.

</div>



## terraform-aws-monitoring


### [v0.7.0](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.7.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/15/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.7.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/module-aws-monitoring/pull/37: Fix a bug in the `run-cloudwatch-logs-agent.sh` script so that it gives each log file a unique log stream name.

</div>


### [v0.6.0](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.6.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/7/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.6.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/module-aws-monitoring/pull/36:

BACKWARDS INCOMPATIBLE CHANGE

The `asg-xxx-alarms` modules now allow you to create alarms for a list of ASGs, rather than just one. This is necessary to use the alarms with, for example, the [server-group](https://github.com/gruntwork-io/module-asg/tree/master/modules/server-group) module. To support this, instead of taking in a single `asg_name` parameter, these modules now take in two parameters:

* `asg_names`: A list of ASG names.
* `num_asg_names`: The number of ASG names in `asg_names`. We should be able to compute this automatically, but can&apos;t due to a Terraform limitation (https://github.com/hashicorp/terraform/issues/4149).

</div>



## terraform-aws-openvpn


### [v0.4.0](https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.4.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/12/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.4.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/package-openvpn/pull/21

BACKWARDS INCOMPATIBLE CHANGE

package-openvpn now has better support for multi-account setups. That is, if your IAM users are defined in one account, such as a security account, and your OpenVPN server(s) are deployed in other accounts, such as dev, stage, prod accounts, users in the security account will now able to assume IAM roles in the dev, stage, and prod accounts to request or revoke OpenVPN certs.

This change is backwards compatible from a code perspective, but it changes the name of your SQS queues and their permissions, so you will need to redeploy your OpenVPN server to pick up the changes:

1. Build a new OpenVPN AMI with this version of the `install-openvpn` module.
1. Deploy the new AMI with this version of the `openvpn-server` module. 

</div>


### [v0.3.1](https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.3.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/3/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.3.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  move logging to syslog, rather than to a separate file. This will allow log aggregation to CloudWatch and will prevent the volume from filling up

</div>



## terraform-aws-server


### [v0.2.1](https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.2.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 10/8/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.2.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/module-server/pull/20: Fix a bug with the `attach-eni` script where it would incorrectly handle network interface names on Ubuntu on non-t2 instance types (e.g., m4.large). Also, the script should now be idempotent.

</div>

<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "releases",
  "hash": "80d28b43c5e0b55e99acbcd064b90697"
}
##DOCS-SOURCER-END -->

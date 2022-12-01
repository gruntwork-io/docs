
# Gruntwork release 2017-09

<p style={{marginTop: "-25px"}}><small><a href="/guides">Guides</a> / <a href="/guides/stay-up-to-date">Update Guides</a> / <a href="/guides/stay-up-to-date/releases">Releases</a> / 2017-09</small></p>

This page is lists all the updates to the [Gruntwork Infrastructure as Code 
Library](https://gruntwork.io/infrastructure-as-code-library/) that were released in 2017-09. For instructions 
on how to use these updates in your code, check out the [updating 
documentation](/guides/working-with-code/using-modules#updating).

Here are the repos that were updated:

- [terraform-aws-asg](#terraform-aws-asg)
- [terraform-aws-kafka](#terraform-aws-kafka)
- [terraform-aws-monitoring](#terraform-aws-monitoring)
- [terraform-aws-security](#terraform-aws-security)
- [terraform-aws-server](#terraform-aws-server)
- [terraform-aws-static-assets](#terraform-aws-static-assets)
- [terraform-aws-zookeeper](#terraform-aws-zookeeper)


## terraform-aws-asg


### [v0.6.1](https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.6.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/30/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.6.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/module-asg/pull/11: Fix the Python script used by the asg-rolling-deploy module so it properly checks the `tmp` folder to decide whether to extract the boto3 library.

</div>


### [v0.6.0](https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.6.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/29/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.6.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/module-asg/pull/10: The `server-group` module now assigns EBS permissions based on the `ServerGroupName` tag instead of the `Name` tag, as the latter is too brittle. This change is backwards incompatible, so we're bumping the patch version number, but unless you are doing something weird and overriding `ServerGroupName` (very unlikely!), you shouldn't have to do anything to make this work with your code.

</div>



## terraform-aws-kafka


### [v0.0.7](https://github.com/gruntwork-io/terraform-aws-kafka/releases/tag/v0.0.7)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/29/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-kafka/releases/tag/v0.0.7">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/package-kafka/pull/7: Update to the new module-asg and package-zookeeper, with the server-group module fix that uses the `ServerGroupName` tag instead of the `Name` tag to assign EBS volume permissions, which should make things less brittle.

</div>


### [v0.0.6](https://github.com/gruntwork-io/terraform-aws-kafka/releases/tag/v0.0.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/26/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-kafka/releases/tag/v0.0.6">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/package-kafka/pull/6: You can now run Kafka on Ubuntu! The major change is actually not in package-kafka itself, but in the updated `attach-eni` script that now supports Ubuntu as of [v0.2.0](https://github.com/gruntwork-io/module-server/releases/tag/v0.2.0). See the [kafka-ami](https://github.com/gruntwork-io/package-kafka/tree/master/examples/kafka-ami) example for working sample code.

</div>



## terraform-aws-monitoring


### [v0.5.2](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.5.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/21/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.5.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

   #35: Fix a bug where we were using `high_read_latency_threshold` instead of `high_write_latency_threshold` on the `rds_high_write_latency` aws_cloudwatch_metric_alarm.

</div>


### [v0.5.1](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.5.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/15/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.5.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  - BUG FIX/#34: The Target Group alarm `tg_high_http_code_target_4xx_count` was previously using variables meant for `tg_high_http_code_target_5xx_count`. This has now been fixed.

</div>



## terraform-aws-security


### [v0.6.2](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.6.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/24/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.6.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/module-security/pull/47: ssh-iam should no longer error out when syncing users that changed IAM groups.

</div>


### [v0.6.1](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.6.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/12/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.6.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/module-security/pull/46: Add module to install and configure NTP.

</div>


### [v0.6.0](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.6.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/7/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.6.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/module-security/pull/45

BACKWARDS INCOMPATIBLE CHANGE

The `iam_groups_for_cross_account_access` input parameter of the `iam-groups` module is now a list of maps rather than a map. This keeps the order of groups more constant when you add groups, rather than trying to delete and recreate all the old groups (note that if you remove a group, the order will still change, which is an unfortunate Terraform limitation: https://github.com/hashicorp/terraform/issues/14275). 

To use the new version of the `iam-groups` module, instead of specifying a map:

```hcl
iam_groups_for_cross_account_access  = {
  "stage-full-access": "arn:aws:iam::123445678910:role/mgmt-full-access",
  "prod-read-only-access": "arn:aws:iam::9876543210:role/prod-read-only-access"
}
```

You need to specify a list of maps:

```hcl
iam_groups_for_cross_account_access = [
  {
    group_name   = "stage-full-access"
    iam_role_arn = "arn:aws:iam::123445678910:role/mgmt-full-access"
  },
  {
    group_name   = "prod-read-only-access"
    iam_role_arn = "arn:aws:iam::9876543210:role/prod-read-only-access"
  }
]
```

</div>



## terraform-aws-server


### [v0.2.0](https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.2.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/25/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.2.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/module-server/pull/18: The `attach-eni` script will now automatically configure route tables on Debian servers. This should allow ENIs to work "automagically" just like they do on Amazon Linux. This release is backwards compatible from an API perspective, but we've bumped the minor version number to indicate that it's a fairly large change in terms of behavior.

</div>


### [v0.1.13](https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.1.13)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/11/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.1.13">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/module-server/pull/17: The `single-server` module now exposes `security_group_name` and `iam_group_name` parameters that let you customize the security group and IAM group names, respectively. The default uses the `name` input as before, so this is a backwards compatible change.

</div>



## terraform-aws-static-assets


### [v0.1.0](https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.1.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/20/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.1.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  BACKWARDS INCOMPATIBLE CHANGE

https://github.com/gruntwork-io/package-static-assets/pull/3: The `s3-cloudfront` module now allows you to use multiple domain names with your CloudFront distribution. To support this, the following parameters have been renamed:

* Input: `create_route53_entry` -&gt; `create_route53_entries` 
* Input: `domain_name` -&gt; `domain_names` and is now a list
* Output: `cloudfront_domain_name` -&gt; `cloudfront_domain_names` and is now a list



</div>



## terraform-aws-zookeeper


### [v0.0.7](https://github.com/gruntwork-io/terraform-aws-zookeeper/releases/tag/v0.0.7)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/29/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-zookeeper/releases/tag/v0.0.7">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/package-zookeeper/pull/7: Update to the new module-asg, with the server-group module fix that uses the `ServerGroupName` tag instead of the `Name` tag to assign EBS volume permissions, which should make things less brittle.

</div>


### [v0.0.6](https://github.com/gruntwork-io/terraform-aws-zookeeper/releases/tag/v0.0.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/26/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-zookeeper/releases/tag/v0.0.6">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/package-zookeeper/pull/6: You can now run ZooKeeper on Ubuntu! The major change is actually not in package-zookeeper itself, but in the updated `attach-eni` script that now supports Ubuntu as of [v0.2.0](https://github.com/gruntwork-io/module-server/releases/tag/v0.2.0). See the [zookeeper-ami example](https://github.com/gruntwork-io/package-zookeeper/tree/master/examples/zookeeper-ami) for working sample code.

</div>




<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "releases",
  "hash": "427fd0260ae9bd9d9a4374f1a64ef548"
}
##DOCS-SOURCER-END -->

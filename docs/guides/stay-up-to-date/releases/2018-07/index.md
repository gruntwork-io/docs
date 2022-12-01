
# Gruntwork release 2018-07

<p style={{marginTop: "-25px"}}><small><a href="/guides">Guides</a> / <a href="/guides/stay-up-to-date">Update Guides</a> / <a href="/guides/stay-up-to-date/releases">Releases</a> / 2018-07</small></p>

This page is lists all the updates to the [Gruntwork Infrastructure as Code 
Library](https://gruntwork.io/infrastructure-as-code-library/) that were released in 2018-07. For instructions 
on how to use these updates in your code, check out the [updating 
documentation](/guides/working-with-code/using-modules#updating).

Here are the repos that were updated:

- [gruntwork](#gruntwork)
- [terraform-aws-asg](#terraform-aws-asg)
- [terraform-aws-elk](#terraform-aws-elk)
- [terraform-aws-openvpn](#terraform-aws-openvpn)
- [terraform-aws-security](#terraform-aws-security)
- [terraform-aws-zookeeper](#terraform-aws-zookeeper)


## gruntwork


### [v0.0.21](https://github.com/gruntwork-io/gruntwork/releases/tag/v0.0.21)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/13/2018 | <a href="https://github.com/gruntwork-io/gruntwork/releases/tag/v0.0.21">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/gruntwork/pull/29: Update list of Gruntwork GitHub usernames.

</div>


### [v0.0.20](https://github.com/gruntwork-io/gruntwork/releases/tag/v0.0.20)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/3/2018 | <a href="https://github.com/gruntwork-io/gruntwork/releases/tag/v0.0.20">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/gruntwork/pull/28: Increase default max session duration.

</div>



## terraform-aws-asg


### [v0.6.15](https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.6.15)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/19/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.6.15">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/module-asg/pull/41: Remove `depends_on` workaround in `asg-rolling-deploy`. This should now show the proper value for your ASG `desired_capacity` during `plan`.

</div>


### [v0.6.14](https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.6.14)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/18/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.6.14">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/module-asg/pull/40: You can now specify custom termination policies in the `asg-rolling-deploy` module using the new `termination_policies` input variable.

</div>



## terraform-aws-elk


### [v0.0.8](https://github.com/gruntwork-io/terraform-aws-elk/releases/tag/v0.0.8)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/30/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-elk/releases/tag/v0.0.8">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
Documentation is still a work-in-progress. There will be a follow-up PR for that shortly. 

</div>


### [v0.0.7](https://github.com/gruntwork-io/terraform-aws-elk/releases/tag/v0.0.7)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/27/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-elk/releases/tag/v0.0.7">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

</div>


### [v0.0.6](https://github.com/gruntwork-io/terraform-aws-elk/releases/tag/v0.0.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/23/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-elk/releases/tag/v0.0.6">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

</div>


### [v0.0.5](https://github.com/gruntwork-io/terraform-aws-elk/releases/tag/v0.0.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/23/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-elk/releases/tag/v0.0.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

</div>


### [v0.0.4](https://github.com/gruntwork-io/terraform-aws-elk/releases/tag/v0.0.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/2/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-elk/releases/tag/v0.0.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  This pre-release introduces support for forwarding Cloudwatch and Cloudtrail (S3) logs to Logstash. 

PRs #25 #29 

</div>



## terraform-aws-openvpn


### [v0.7.1](https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.7.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/2/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.7.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

</div>



## terraform-aws-security


### [v0.14.0](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.14.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/5/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.14.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/module-security/pull/103: 

1. `ssh-grunt` now signs all requests to Houston with its AWS credentials. This is a backwards incompatible change: all `ssh-grunt houston xxx` commands now all take in a required `--houston-region` param (AWS region where Houston is deployed) and an optional `--iam-role` param (IAM role to assume when signing the request).

1. Update the `iam-policies` and `cross-account-iam-roles` modules to create the IAM permissions EC2 Instances will need to make (signed) requests to Houston.

</div>



## terraform-aws-zookeeper


### [v0.4.5](https://github.com/gruntwork-io/terraform-aws-zookeeper/releases/tag/v0.4.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 7/19/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-zookeeper/releases/tag/v0.4.5">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

</div>




<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "releases",
  "hash": "c6824372a5349d68cd78b41bc7c677a7"
}
##DOCS-SOURCER-END -->

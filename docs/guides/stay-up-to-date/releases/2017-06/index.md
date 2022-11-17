
# Gruntwork release 2017-06

<p style={{marginTop: "-25px"}}><small><a href="/guides">Guides</a> / <a href="/guides/stay-up-to-date">Update Guides</a> / <a href="/guides/stay-up-to-date/releases">Releases</a> / 2017-06</small></p>

This page is lists all the updates to the [Gruntwork Infrastructure as Code 
Library](https://gruntwork.io/infrastructure-as-code-library/) that were released in 2017-06. For instructions 
on how to use these updates in your code, check out the [updating 
documentation](/guides/working-with-code/using-modules#updating).

Here are the repos that were updated:

- [terraform-aws-asg](#terraform-aws-asg)
- [terraform-aws-ci](#terraform-aws-ci)
- [terraform-aws-ecs](#terraform-aws-ecs)
- [terraform-aws-lambda](#terraform-aws-lambda)
- [terraform-aws-load-balancer](#terraform-aws-load-balancer)
- [terraform-aws-mongodb](#terraform-aws-mongodb)
- [terraform-aws-monitoring](#terraform-aws-monitoring)
- [terraform-aws-openvpn](#terraform-aws-openvpn)
- [terraform-aws-security](#terraform-aws-security)


## terraform-aws-asg


### [v0.2.1](https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.2.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/19/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.2.1">Release notes</a></small>
</p>

https://github.com/gruntwork-io/module-asg/pull/6: Allow `module-asg` to be used with Terraform 0.9.



## terraform-aws-ci


### [v0.3.19](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.3.19)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/28/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.3.19">Release notes</a></small>
</p>

https://github.com/gruntwork-io/module-ci/pull/40: Fix the default Glide version number


### [v0.3.18](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.3.18)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/27/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.3.18">Release notes</a></small>
</p>

- fix a bug with `--glide-version` parameter
- bump default versions of installed packages 


### [v0.3.17](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.3.17)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/22/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.3.17">Release notes</a></small>
</p>

- #38: Update the `publish-ami` bash script to support an argument `--markdown-description-text` that allows adding arbitrary description text to the markdown text that's output as part of the AMIs that are found.



## terraform-aws-ecs


### [v0.5.0](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.5.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/13/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.5.0">Release notes</a></small>
</p>

https://github.com/gruntwork-io/module-ecs/pull/32: The `ecs-service-with-alb` module now allows you to map the same ALB port to multiple paths in your ECS service. Note that supporting this required BACKWARDS INCOMPATIBLE changes: 

* The `alb_listener_rule_configs` parameter is now a list instead of a map. Each entry in the list should be of the format `<port>:<priority>:<path>`. For example, `80:100:/foo/*`.
* The `num_alb_listener_rule_configs` parameter has been removed. It is no longer necessary.
* Note that you must be on Terraform 0.9.x to use this new code!



## terraform-aws-lambda


### [v0.0.3](https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.0.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/14/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.0.3">Release notes</a></small>
</p>

https://github.com/gruntwork-io/package-lambda/pull/3: You can now use the `lambda` module with a deployment package that is stored in S3.


### [v0.0.2](https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.0.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/8/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.0.2">Release notes</a></small>
</p>

https://github.com/gruntwork-io/package-lambda/pull/2: Remove var.zip_dir and conditional from lambda module. That means the module should work with Terraform 0.7 now.


### [v0.0.1](https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.0.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/1/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.0.1">Release notes</a></small>
</p>

https://github.com/gruntwork-io/package-lambda/pull/1: First release!



## terraform-aws-load-balancer


### [v0.5.0](https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.5.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/28/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.5.0">Release notes</a></small>
</p>

https://github.com/gruntwork-io/module-load-balancer/pull/13, https://github.com/gruntwork-io/module-load-balancer/pull/14: 

BACKWARDS INCOMPATIBLE CHANGE

The `alb` module now allows you to limit access to the ALB via security groups using a new parameter named `allow_inbound_from_security_group_ids`. 

Please note that this is a backwards incompatible release:

* Terraform 0.9 or greater is now required.
* The `num_xxx` parameters have been removed, so you should no longer pass them in: `num_http_listener_ports`, `num_https_listener_ports`, `num_https_listener_ports_and_acm_ssl_certs`.



## terraform-aws-mongodb


### [v0.2.1](https://github.com/gruntwork-io/terraform-aws-mongodb/releases/tag/v0.2.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/30/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-mongodb/releases/tag/v0.2.1">Release notes</a></small>
</p>

https://github.com/gruntwork-io/package-mongodb/pull/14: Refactored the `generate_security_config` function in `run-mongodb` to be easier to understand.


### [v0.2.0](https://github.com/gruntwork-io/terraform-aws-mongodb/releases/tag/v0.2.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/30/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-mongodb/releases/tag/v0.2.0">Release notes</a></small>
</p>

https://github.com/gruntwork-io/package-mongodb/pull/13: We had to bring back the `num_allow_mongodb_access_from_security_group_ids` parameter, as `var.allow_mongodb_access_from_security_group_ids` may contain dynamic data (e.g. security group IDs) that cannot be used in the `count` parameter.


### [v0.0.1](https://github.com/gruntwork-io/terraform-aws-mongodb/releases/tag/v0.0.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/29/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-mongodb/releases/tag/v0.0.1">Release notes</a></small>
</p>

First release!



## terraform-aws-monitoring


### [v0.4.6](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.4.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/13/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.4.6">Release notes</a></small>
</p>





## terraform-aws-openvpn


### [v0.2.2](https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.2.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/28/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.2.2">Release notes</a></small>
</p>

- fix an issue where the name of the ethernet interface changes between instance types in aws


### [v0.2.1](https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.2.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/27/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.2.1">Release notes</a></small>
</p>

- fix issue with restoring pki from s3
- fix issue with [logrus](https://github.com/sirupsen/logrus) renaming their package to all lowercase
- fix issue with glide not restoring transient packages in test


### [v0.2.0](https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.2.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/23/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.2.0">Release notes</a></small>
</p>

https://github.com/gruntwork-io/package-openvpn/pull/10: Remove a bunch of unused variables from the `openvpn-server` module that were accidentally left over from a refactor. 


### [v0.0.1](https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.0.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/15/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.0.1">Release notes</a></small>
</p>

Initial release of the OpenVPN package



## terraform-aws-security


### [v0.5.1](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.5.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 6/13/2017 | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.5.1">Release notes</a></small>
</p>

https://github.com/gruntwork-io/module-security/pull/37, https://github.com/gruntwork-io/module-security/pull/38: Update how pip is used in the `fail2ban` module so it can be installed on top of Amazon ECS optimized Linux.




<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "releases",
  "hash": "324ebc51c53ae6f7c12fe5ba1027d992"
}
##DOCS-SOURCER-END -->


# Gruntwork release 2018-04

<p style={{marginTop: "-25px"}}><small><a href="/guides">Guides</a> / <a href="/guides/stay-up-to-date">Update Guides</a> / <a href="/guides/stay-up-to-date/releases">Releases</a> / 2018-04</small></p>

This page is lists all the updates to the [Gruntwork Infrastructure as Code
Library](https://gruntwork.io/infrastructure-as-code-library/) that were released in 2018-04. For instructions
on how to use these updates in your code, check out the [updating
documentation](/library/stay-up-to-date/updating).

Here are the repos that were updated:

- [terraform-aws-cache](#terraform-aws-cache)
- [terraform-aws-ci](#terraform-aws-ci)
- [terraform-aws-data-storage](#terraform-aws-data-storage)
- [terraform-aws-load-balancer](#terraform-aws-load-balancer)
- [terraform-aws-openvpn](#terraform-aws-openvpn)
- [terraform-aws-security](#terraform-aws-security)
- [terraform-aws-vpc](#terraform-aws-vpc)


## terraform-aws-cache


### [v0.4.1](https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v0.4.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/17/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v0.4.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

</div>


### [v0.4.0](https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v0.4.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/3/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v0.4.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  **BACKWARDS INCOMPATIBLE RELEASE**


* redis_with_snapshotting_without_auth_token
* redis_with_snapshotting_with_auth_token
* redis_without_snapshotting_without_auth_token
* redis_without_snapshotting_with_auth_token

To update your existing Redis cluster ensure you use `terragrunt state mv &lt;old_address&gt; &lt;new_address&gt;` to ensure that your cluster isn&apos;t deleted when you run `terraform apply`

For example:

To update a Redis cluster that was deployed using the `redis_without_snapshotting` resource to one of the new resources, you&apos;ll simply run:

```
terragrunt state mv module.redis.aws_elasticache_replication_group.redis_without_snapshotting module.redis.aws_elasticache_replication_group.redis_without_snapshotting_without_auth_token
```

</div>



## terraform-aws-ci


### [v0.7.2](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.7.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/29/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.7.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/module-ci/pull/55: Update the ALB version used in the `jenkins-server` module to v0.8.1 to pick up the fixes listed here: https://github.com/gruntwork-io/module-load-balancer/releases/tag/v0.8.1.

</div>



## terraform-aws-data-storage


### [v0.6.2](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.6.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/28/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.6.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/module-data-storage/pull/40, https://github.com/gruntwork-io/module-data-storage/pull/41: The `aurora` module now exposes two new input variables:

* `monitoring_role_arn`: specify an IAM role to associate with the Aurora DB.
* `monitoring_interval`: enable enhanced monitoring. Note that enhanced monitoring requires IAM permissions. If you don&apos;t specify `monitoring_role_arn` yourself, the `aurora` module will add the appropriate permissions automatically. If you do specify a custom `monitoring_role_arn`, make sure it has the IAM permissions required for enhanced monitoring.

This release also fixes a bug in v0.6.1 where the `monitoring_role_arn` param was not properly used in the `rds` module.

</div>


### [v0.6.1](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.6.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/25/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.6.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/module-data-storage/pull/39: The `rds` module now exposes two new input variables:

* `monitoring_role_arn`: specify an IAM role to associate with the RDS DB.
* `monitoring_interval`: enable enhanced monitoring. Note that enhanced monitoring requires IAM permissions. If you don&apos;t specify `monitoring_role_arn` yourself, the `rds` module will add the appropriate permissions automatically. If you do specify a custom `monitoring_role_arn`, make sure it has the IAM permissions required for enhanced monitoring.


</div>



## terraform-aws-load-balancer


### [v0.8.1](https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.8.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/30/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.8.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/module-load-balancer/pull/30, https://github.com/gruntwork-io/module-load-balancer/pull/31, https://github.com/gruntwork-io/module-load-balancer/pull/32: Fix several bugs with `count` in the `alb` module that would crop up if `allow_inbound_from_cidr_blocks` or `allow_inbound_from_security_group_ids` were empty.

</div>


### [v0.8.0](https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.8.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/3/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.8.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  

</div>



## terraform-aws-openvpn


### [v0.5.4](https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.5.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/19/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.5.4">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  Fix an issue where the `pip` upgrade was breaking the `aws-cli` install process

</div>



## terraform-aws-security


### [v0.8.2](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.8.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/27/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.8.2">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  
The main motivation for locking down EC2 metadata is as follows:

1. EC2 metadata gives you the credentials you need to assume any IAM role associated with the EC2 instance, and thereby, get all the permissions available in that IAM role.
1. Locking down the metadata to, for example, only the root user, makes sure that if a hacker breaks into your server with a privileged user, they cannot get the full power of the IAM role.

</div>


### [v0.8.1](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.8.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/17/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.8.1">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/module-security/pull/80: The `aws-auth` script now exposes the expiration time in the `AWS_SESSION_EXPIRATION` environment variable.

</div>



## terraform-aws-vpc


### [v0.5.0](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.5.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/27/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.5.0">Release notes</a></small>
</p>

<div style={{"overflow":"hidden","textOverflow":"ellipsis","display":"-webkit-box","WebkitLineClamp":10,"lineClamp":10,"WebkitBoxOrient":"vertical"}}>

  https://github.com/gruntwork-io/module-vpc/pull/41, https://github.com/gruntwork-io/module-vpc/pull/42: 

* The `vpc-mgmt-network-acls` module now allows all inbound and outbound traffic within the private subnet and between the public and private subnet. Before, all inbound traffic was allowed, but outbound traffic was limited solely to TCP.

* The `vpc-app-network-acls` module now allows all inbound and outbound traffic from/to the mgmt VPC. Before, all inbound traffic was allowed, but outbound traffic was limited solely TCP.

</div>

<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "releases",
  "hash": "9047b53c50ab470755b96d9e9b6edcc5"
}
##DOCS-SOURCER-END -->


# Gruntwork release 2018-04

<p style={{marginTop: "-25px"}}><small><a href="/guides">Guides</a> / <a href="/guides/stay-up-to-date">Update Guides</a> / <a href="/guides/stay-up-to-date/releases">Releases</a> / 2018-04</small></p>

This page is lists all the updates to the [Gruntwork Infrastructure as Code 
Library](https://gruntwork.io/infrastructure-as-code-library/) that were released in 2018-04. For instructions 
on how to use these updates in your code, check out the [updating 
documentation](/guides/working-with-code/using-modules#updating).

Here are the repos that were updated:

- [terraform-aws-cache](#terraform-aws-cache)
- [terraform-aws-ci](#terraform-aws-ci)
- [terraform-aws-data-storage](#terraform-aws-data-storage)
- [terraform-aws-kafka](#terraform-aws-kafka)
- [terraform-aws-load-balancer](#terraform-aws-load-balancer)
- [terraform-aws-openvpn](#terraform-aws-openvpn)
- [terraform-aws-security](#terraform-aws-security)
- [terraform-aws-vpc](#terraform-aws-vpc)
- [terraform-aws-zookeeper](#terraform-aws-zookeeper)


## terraform-aws-cache


### [v0.4.1](https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v0.4.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/17/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v0.4.1">Release notes</a></small>
</p>




### [v0.4.0](https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v0.4.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/3/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v0.4.0">Release notes</a></small>
</p>

**BACKWARDS INCOMPATIBLE RELEASE**


* redis_with_snapshotting_without_auth_token
* redis_with_snapshotting_with_auth_token
* redis_without_snapshotting_without_auth_token
* redis_without_snapshotting_with_auth_token

To update your existing Redis cluster ensure you use `terragrunt state mv <old_address> <new_address>` to ensure that your cluster isn't deleted when you run `terraform apply`




## terraform-aws-ci


### [v0.7.2](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.7.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/29/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.7.2">Release notes</a></small>
</p>

https://github.com/gruntwork-io/module-ci/pull/55: Update the ALB version used in the `jenkins-server` module to v0.8.1 to pick up the fixes listed here: https://github.com/gruntwork-io/module-load-balancer/releases/tag/v0.8.1.



## terraform-aws-data-storage


### [v0.6.2](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.6.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/28/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.6.2">Release notes</a></small>
</p>

https://github.com/gruntwork-io/module-data-storage/pull/40, https://github.com/gruntwork-io/module-data-storage/pull/41: The `aurora` module now exposes two new input variables:

* `monitoring_role_arn`: specify an IAM role to associate with the Aurora DB.
* `monitoring_interval`: enable enhanced monitoring. Note that enhanced monitoring requires IAM permissions. If you don't specify `monitoring_role_arn` yourself, the `aurora` module will add the appropriate permissions automatically. If you do specify a custom `monitoring_role_arn`, make sure it has the IAM permissions required for enhanced monitoring.

This release also fixes a bug in v0.6.1 where the `monitoring_role_arn` param was not properly used in the `rds` module.


### [v0.6.1](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.6.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/25/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.6.1">Release notes</a></small>
</p>

https://github.com/gruntwork-io/module-data-storage/pull/39: The `rds` module now exposes two new input variables:

* `monitoring_role_arn`: specify an IAM role to associate with the RDS DB.
* `monitoring_interval`: enable enhanced monitoring. Note that enhanced monitoring requires IAM permissions. If you don't specify `monitoring_role_arn` yourself, the `rds` module will add the appropriate permissions automatically. If you do specify a custom `monitoring_role_arn`, make sure it has the IAM permissions required for enhanced monitoring.




## terraform-aws-kafka


### [v0.3.1](https://github.com/gruntwork-io/terraform-aws-kafka/releases/tag/v0.3.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/10/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-kafka/releases/tag/v0.3.1">Release notes</a></small>
</p>

- #31: Fix an issue where `aws.sh` in `bash-commons` did not correctly handle the case where only private IP addresses are in use on an EC2 Instance.

Please note that this is a **pre-release**. See [v0.3.0](https://github.com/gruntwork-io/package-kafka/releases/tag/v0.3.0) for an explanation.


### [v0.3.0](https://github.com/gruntwork-io/terraform-aws-kafka/releases/tag/v0.3.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/9/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-kafka/releases/tag/v0.3.0">Release notes</a></small>
</p>


- Kafka v1.0.0 is now supported.
- Kafka download is now verified using a GPG Key published by Apache
- Update Kafka to work with CentOS.
- You can now assign DNS names to the ENIs used by Kafka, and optionally make ENIs public (though we strongly advise keeping ENIs private for all production deployments)
- We now bundle the running of [kafka-health-check](https://github.com/andreas-schroeder/kafka-health-check) directly with `run-kafka`. This is because a  more sophisticated health check tool is needed by Kafka in order for Kafka to accurately report its health status to the Elastic Load Balancer. Unfortunately, this required a backwards-incompatible change to the `run-kafka` interface.
- The configuration files are now easier to customize by using a "variable substitution" paradigm (See the [run-kafka config README](https://github.com/gruntwork-io/package-kafka/tree/master/modules/run-kafka/config) for additional details).
- We've introduced a `bash-commons` module that consolidates all the common bash functions we use into a single module. This makes all bash scripts shorter and gives us higher-quality more reusable bash functions. Just be sure to `gruntwork-install` the `bash-commons` module! See below for details.
- For developers of this module, we introduced a number of improved patterns for building and testing the module including running the Kafka cluster in Docker and being able to selectively disable some stages of the automated tests from running (e.g. don't rebuild the AMI every time, just reuse the previous AMI).




## terraform-aws-load-balancer


### [v0.8.1](https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.8.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/30/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.8.1">Release notes</a></small>
</p>

https://github.com/gruntwork-io/module-load-balancer/pull/30, https://github.com/gruntwork-io/module-load-balancer/pull/31, https://github.com/gruntwork-io/module-load-balancer/pull/32: Fix several bugs with `count` in the `alb` module that would crop up if `allow_inbound_from_cidr_blocks` or `allow_inbound_from_security_group_ids` were empty.


### [v0.8.0](https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.8.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/3/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.8.0">Release notes</a></small>
</p>





## terraform-aws-openvpn


### [v0.5.4](https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.5.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/19/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.5.4">Release notes</a></small>
</p>

Fix an issue where the `pip` upgrade was breaking the `aws-cli` install process



## terraform-aws-security


### [v0.8.2](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.8.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/27/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.8.2">Release notes</a></small>
</p>


The main motivation for locking down EC2 metadata is as follows:

1. EC2 metadata gives you the credentials you need to assume any IAM role associated with the EC2 instance, and thereby, get all the permissions available in that IAM role.
1. Locking down the metadata to, for example, only the root user, makes sure that if a hacker breaks into your server with a privileged user, they cannot get the full power of the IAM role.


### [v0.8.1](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.8.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/17/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.8.1">Release notes</a></small>
</p>

https://github.com/gruntwork-io/module-security/pull/80: The `aws-auth` script now exposes the expiration time in the `AWS_SESSION_EXPIRATION` environment variable.


### [TEST RELEASE](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.8.1-test)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/16/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.8.1-test">Release notes</a></small>
</p>

This release is for testing purposes ONLY. This is NOT a production release. The only intention here is to test the deployment portion of the CircleCI 2.0 migration



## terraform-aws-vpc


### [v0.5.0](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.5.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/27/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.5.0">Release notes</a></small>
</p>

https://github.com/gruntwork-io/module-vpc/pull/41, https://github.com/gruntwork-io/module-vpc/pull/42: 

* The `vpc-mgmt-network-acls` module now allows all inbound and outbound traffic within the private subnet and between the public and private subnet. Before, all inbound traffic was allowed, but outbound traffic was limited solely to TCP.

* The `vpc-app-network-acls` module now allows all inbound and outbound traffic from/to the mgmt VPC. Before, all inbound traffic was allowed, but outbound traffic was limited solely TCP.



## terraform-aws-zookeeper


### [v0.4.3](https://github.com/gruntwork-io/terraform-aws-zookeeper/releases/tag/v0.4.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/26/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-zookeeper/releases/tag/v0.4.3">Release notes</a></small>
</p>

- #25: Update to Zookeeper v3.4.12. Check the file integrity of downloaded Zookeeper file. Switch the download URL used by Zookeeper to one more likely to retain historical versions.


### [v0.4.2](https://github.com/gruntwork-io/terraform-aws-zookeeper/releases/tag/v0.4.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 4/23/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-zookeeper/releases/tag/v0.4.2">Release notes</a></small>
</p>

- #24: Oracle released Java 1.8u171 and 1.8u172, and disabled java 1.8u161 in the process. This release fixes the issue so that installing Oracle JDK8 by `yum` works once again.




<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "releases",
  "hash": "474c39fb24c4327306d34abfc1ee2d15"
}
##DOCS-SOURCER-END -->

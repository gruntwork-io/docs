
# Gruntwork release 2018-02

<p style={{marginTop: "-25px"}}><small><a href="/guides">Guides</a> / <a href="/guides/stay-up-to-date">Update Guides</a> / <a href="/guides/stay-up-to-date/releases">Releases</a> / 2018-02</small></p>

This page is lists all the updates to the [Gruntwork Infrastructure as Code 
Library](https://gruntwork.io/infrastructure-as-code-library/) that were released in 2018-02. For instructions 
on how to use these updates in your code, check out the [updating 
documentation](/guides/working-with-code/using-modules#updating).

Here are the repos that were updated:

- [terraform-aws-cache](#terraform-aws-cache)
- [terraform-aws-ci](#terraform-aws-ci)
- [terraform-aws-ecs](#terraform-aws-ecs)
- [terraform-aws-messaging](#terraform-aws-messaging)
- [terraform-aws-openvpn](#terraform-aws-openvpn)
- [terraform-aws-sam](#terraform-aws-sam)
- [terraform-aws-security](#terraform-aws-security)
- [terraform-aws-server](#terraform-aws-server)


## terraform-aws-cache


### [v0.3.3](https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v0.3.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/27/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v0.3.3">Release notes</a></small>
</p>

https://github.com/gruntwork-io/module-cache/pull/17: You can now enable encryption at rest and in transit for Redis using the new parameters `enable_at_rest_encryption` and `enable_transit_encryption`. Note that if you already have Redis deployed without encryption, you cannot enable encryption for it; you must create a new Redis cluster that has encryption enabled and migrate to that.



## terraform-aws-ci


### [v0.7.1](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.7.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/22/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.7.1">Release notes</a></small>
</p>

https://github.com/gruntwork-io/module-ci/pull/53: The `install-jenkins` module now supports CentOS.


### [v0.7.0](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.7.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/20/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.7.0">Release notes</a></small>
</p>

https://github.com/gruntwork-io/module-ci/pull/52: 

Warning: this release contains BACKWARDS INCOMPATIBLE CHANGES to `scheduled-lambda-job`.

* Add new modules for running Jenkins: `jenkins-server` and `install-jenkins`.
* Add a module for running a Lambda function on a scheduled basis to take snapshots of your servers: `ec2-backup`.
* Delete the `scheduled-lambda-job` module. Please migrate to [package-lambda](https://github.com/gruntwork-io/package-lambda) instead. You can create the Lambda functions with the [lambda module](https://github.com/gruntwork-io/package-lambda/tree/master/modules/lambda) and run them on a scheduled basis using the [scheduled-lambda-job module](https://github.com/gruntwork-io/package-lambda/tree/master/modules/scheduled-lambda-job) in that repo.
* Update this repo to use CircleCI 2.0 with the machine executor.
* Add a new `--circle-ci-2-machine-executor` flag to `configure-environment-for-gruntwork-module` so you can use the script with CircleCI 2.0's machine executor.
* Add an example for how to create "unit tests" for modules that run locally and relatively quickly using Docker and Docker Compose. See `jenkins_test.go`.



## terraform-aws-ecs


### [v0.6.2](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.6.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/20/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.6.2">Release notes</a></small>
</p>

https://github.com/gruntwork-io/module-ecs/pull/54: You can now configure a health check grace period for your ECS services using the new `health_check_grace_period_seconds` parameter! Also, we've added another `depends_on` clause for the ALB Target Group in the `ecs-service-with-alb` module, which should help work around https://github.com/hashicorp/terraform/issues/12634.



## terraform-aws-messaging


### [v0.1.0](https://github.com/gruntwork-io/terraform-aws-messaging/releases/tag/v0.1.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/6/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-messaging/releases/tag/v0.1.0">Release notes</a></small>
</p>





## terraform-aws-openvpn


### [v0.5.3](https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.5.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/27/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.5.3">Release notes</a></small>
</p>





## terraform-aws-sam


### [v0.0.3](https://github.com/gruntwork-io/terraform-aws-sam/releases/tag/v0.0.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/14/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-sam/releases/tag/v0.0.3">Release notes</a></small>
</p>

remove the terraform block from the generated terraform module



## terraform-aws-security


### [v0.7.1](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.7.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/22/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.7.1">Release notes</a></small>
</p>

https://github.com/gruntwork-io/module-security/pull/73: Use a more reliable way to look up the path to the `ssh-iam` binary during the install process.



## terraform-aws-server


### [v0.4.1](https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.4.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/23/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.4.1">Release notes</a></small>
</p>




### [v0.4.0](https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.4.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 2/22/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.4.0">Release notes</a></small>
</p>

https://github.com/gruntwork-io/module-server/pull/26:

Note, this release contains BACKWARDS INCOMPATIBLE CHANGES to the `single-server` module. Read on for more info

1. The `persistent-ebs-volume` module now supports CentOS.

1. Fixed a number of minor bugs in the `persistent-ebs-volume` module. All AWS API calls in `mount-ebs-volume` are now done with retries, as there are transient reasons why they might fail (e.g., IAM permissions taking a while to propagate). Fix a syntax error in `unmount-ebs-volume`.

1. The `aws_security_group` in now uses `name_prefix` instead of `name` and sets `create_before_destroy` to `true`. This should fix the `DependencyViolation: resource sg-XXX has a dependent object` error described in https://github.com/terraform-providers/terraform-provider-aws/issues/1671. However, this will result in the Security Group being renamed and therefore, recreated. To update to this new version of `single-server`, which is used in the bastion host, OpenVPN server, Jenkins, and elsewhere, you'll need to:
    1. Find all resources that depend on this security group and remove that dependency. It is OK to do this in the AWS UI.




<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "releases",
  "hash": "b8cda582e58f961c2f487f94e7b3c6e5"
}
##DOCS-SOURCER-END -->


# Gruntwork release 2018-05

<p style={{marginTop: "-25px"}}><small><a href="/guides">Guides</a> / <a href="/guides/stay-up-to-date">Update Guides</a> / <a href="/guides/stay-up-to-date/releases">Releases</a> / 2018-05</small></p>

This page is lists all the updates to the [Gruntwork Infrastructure as Code 
Library](https://gruntwork.io/infrastructure-as-code-library/) that were released in 2018-05. For instructions 
on how to use these updates in your code, check out the [updating 
documentation](/guides/working-with-code/using-modules#updating).

Here are the repos that were updated:

- [gruntwork](#gruntwork)
- [terraform-aws-asg](#terraform-aws-asg)
- [terraform-aws-ci](#terraform-aws-ci)
- [terraform-aws-data-storage](#terraform-aws-data-storage)
- [terraform-aws-ecs](#terraform-aws-ecs)
- [terraform-aws-elk](#terraform-aws-elk)
- [terraform-aws-kafka](#terraform-aws-kafka)
- [terraform-aws-lambda](#terraform-aws-lambda)
- [terraform-aws-load-balancer](#terraform-aws-load-balancer)
- [terraform-aws-sam](#terraform-aws-sam)
- [terraform-aws-security](#terraform-aws-security)
- [terraform-aws-zookeeper](#terraform-aws-zookeeper)


## gruntwork


### [v0.0.19](https://github.com/gruntwork-io/gruntwork/releases/tag/v0.0.19)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/16/2018 | <a href="https://github.com/gruntwork-io/gruntwork/releases/tag/v0.0.19">Release notes</a></small>
</p>

https://github.com/gruntwork-io/gruntwork/pull/27: Create AWS accounts sequentially as that seems to now be a requirement of AWS Organizations.


### [v0.0.18](https://github.com/gruntwork-io/gruntwork/releases/tag/v0.0.18)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/9/2018 | <a href="https://github.com/gruntwork-io/gruntwork/releases/tag/v0.0.18">Release notes</a></small>
</p>

https://github.com/gruntwork-io/gruntwork/pull/24: Exit with an error if an account name cannot be found.



## terraform-aws-asg


### [v0.6.11](https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.6.11)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/31/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.6.11">Release notes</a></small>
</p>

https://github.com/gruntwork-io/module-asg/pull/34: Fix an intermittent bug in `asg-rolling-deploy` that would cause the error `argument --tag-value: expected one argument`.


### [v0.6.10](https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.6.10)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/9/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.6.10">Release notes</a></small>
</p>

The following changes were made to the `server-group` module:

- IMPROVEMENT: Fixed an issue where an Auto Scaling Group's `DesiredInstances` property was left at 0 after the `rolling_deployment.py` script failed to reach a passing health check before timing out. (#29)
- IMPROVEMENT: Expose `var.deployment_health_check_max_retries` and `var.deployment_health_check_retry_interval_in_seconds` so that Terraform code that calls the `server-group` module can control how long the `rolling_deployment.py` will run before timing out. (#29)
- IMPROVEMENT: Updated to latest version of Boto to address transient AWS issues. (#29)
- IMPROVEMENT: Expose `var.additional_security_group_ids` to add arbitrary Security Groups to the Launch Configuration created.



## terraform-aws-ci


### [v0.10.0](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.10.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/25/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.10.0">Release notes</a></small>
</p>

https://github.com/gruntwork-io/module-ci/pull/60: The `git-add-commit-push` script no longer defaults the branch name to `$CIRCLE_BRANCH`. Instead, it uses `git` to look up the name of the currently checked-out branch in `pwd`. In most cases this will produce the exact same effect as before and no code changes will be required. Note that you can always use the `--branch-name` argument to override the default branch name in `git-add-commit-push`.


### [v0.9.0](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.9.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/24/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.9.0">Release notes</a></small>
</p>

https://github.com/gruntwork-io/module-ci/pull/58: 

BACKWARDS INCOMPATIBLE CHANGES

* `git-add-commit-push` has been moved from the `gruntwork-module-circleci-helpers` module to the `git-helpers` module.
* `terraform-update-variable` now depends on `git-helpers` being installed, as it uses `git-add-commit-push` under the hood to be able to more reliably commit and push changes.


### [v0.8.0](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.8.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/16/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.8.0">Release notes</a></small>
</p>

https://github.com/gruntwork-io/module-ci/pull/56: 

BACKWARDS INCOMPATIBLE CHANGE. 

All the pre-commit hooks that were in `modules/pre-commit` are now in their own open source repo: https://github.com/gruntwork-io/pre-commit. Please update your `.pre-commit-config.yml` files to point to the new repo and its version numbers.



## terraform-aws-data-storage


### [v0.6.6](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.6.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/21/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.6.6">Release notes</a></small>
</p>

https://github.com/gruntwork-io/module-data-storage/pull/48: The `rds` module now exposes a `publicly_accessible` parameter that you can set to true to make the DB accessible from the public Internet (NOT recommended for most use cases).


### [v0.6.5](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.6.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/17/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.6.5">Release notes</a></small>
</p>

https://github.com/gruntwork-io/module-data-storage/pull/47: In the `aurora` module, you can now use the `db_instance_parameter_group_name` param to set the parameter group for instances separately from the parameter group for the entire cluster (which can be set via the `db_cluster_parameter_group_name` param).


### [v0.6.4](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.6.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/4/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.6.4">Release notes</a></small>
</p>

https://github.com/gruntwork-io/module-data-storage/pull/46: Explicitly set the `minor_version_upgrade` setting on `rds` read replicas so they use the same setting as the primary.


### [v0.6.3](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.6.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/2/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.6.3">Release notes</a></small>
</p>

https://github.com/gruntwork-io/module-data-storage/pull/44: Explicitly disable snapshots for replicas so you can successfully destroy them without hitting errors.



## terraform-aws-ecs


### [v0.6.6](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.6.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/14/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.6.6">Release notes</a></small>
</p>




### [v0.6.5](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.6.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/8/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.6.5">Release notes</a></small>
</p>





## terraform-aws-elk


### [v0.0.2](https://github.com/gruntwork-io/terraform-aws-elk/releases/tag/v0.0.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/30/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-elk/releases/tag/v0.0.2">Release notes</a></small>
</p>

This pre-release introduces the `elasticsearch-cluster` module which makes it easy to deploy an autoscaling group of  [Elasticsearch](https://www.elastic.co/products/elasticsearch) nodes in AWS.

Support added with merge of #15 

Marking this as a pre-release given that we're introducing `elasticsearch-cluster` mostly so that other modules (namely: Logstash and Kibana) can begin integrating and using our own elasticsearch module. More features and enhancements will be added.


### [v0.0.1](https://github.com/gruntwork-io/terraform-aws-elk/releases/tag/v0.0.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/18/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-elk/releases/tag/v0.0.1">Release notes</a></small>
</p>





## terraform-aws-kafka


### [v0.4.0](https://github.com/gruntwork-io/terraform-aws-kafka/releases/tag/v0.4.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/9/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-kafka/releases/tag/v0.4.0">Release notes</a></small>
</p>

This release features a stable implementation of Kafka and all the Confluent Tools, and we consider this code production-ready. We are still marking this as a pre-release because we've discovered an unusual edge case with Zookeeper. 

In particular, when Zookeeper is colocated with multiple other services and re-deployed one server at a time, one of the Zookeeper nodes will remain in the Ensemble, but fail to sync all the znodes (key/value pairs). As a result, when Kafka looks up information about a broker from the out-of-sync node, it receives the error "znode not found" and fails to start correctly. We have not seen any evidence that this issue affects a standalone Zookeeper cluster.


See "Backwards-Incompatible Changes" in [release v0.3.0](https://github.com/gruntwork-io/package-kafka/releases/tag/v0.3.0) for important background on the `EXTERNAL`, `INTERNAL`, and `HEALTHCHECK` Kafka listeners.


The changes in this release from v0.3.1 include the following:




## terraform-aws-lambda


### [v0.2.2](https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.2.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/27/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.2.2">Release notes</a></small>
</p>

https://github.com/gruntwork-io/package-lambda/pull/13, https://github.com/gruntwork-io/package-lambda/pull/14: We've added a new `keep-warm` module that can be used to invoke your Lambda functions on a scheduled basis, and with a configurable concurrency level, keeping those functions warm to avoid the cold start overhead.



## terraform-aws-load-balancer


### [v0.9.0](https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.9.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/24/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.9.0">Release notes</a></small>
</p>


```bash
terragrunt state mv module.<module>.aws_lb.nlb module.<module>.aws_lb.nlb_<num>_az
```

Replace `<module>` with the name of your module and `<num>` with the amount of subnet mappings you provided. See an [example](https://github.com/gruntwork-io/module-load-balancer/tree/master/examples/nlb-with-subnet-mappings) for more details.



## terraform-aws-sam


### [v0.1.5](https://github.com/gruntwork-io/terraform-aws-sam/releases/tag/v0.1.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/8/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-sam/releases/tag/v0.1.5">Release notes</a></small>
</p>




### [v0.1.4](https://github.com/gruntwork-io/terraform-aws-sam/releases/tag/v0.1.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/8/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-sam/releases/tag/v0.1.4">Release notes</a></small>
</p>




### [v0.1.3](https://github.com/gruntwork-io/terraform-aws-sam/releases/tag/v0.1.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/7/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-sam/releases/tag/v0.1.3">Release notes</a></small>
</p>

- fix a bug where all HTTP verbs were not being handled properly
- fix a bug where multiple HTTP verbs defined on the same endpoint were not being processed sucessfully



## terraform-aws-security


### [v0.10.0](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.10.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/30/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.10.0">Release notes</a></small>
</p>

https://github.com/gruntwork-io/module-security/pull/93:

BACKWARDS INCOMPATIBLE CHANGE

* The `cross-account-iam-roles` module now sets a default max expiration of 12 hours for IAM Roles intended for human users (e.g., `allow-read-only-access-from-other-accounts`) and a default max expiration of 1 hour for IAM Roles intended for machine users (e.g., `allow-auto-deploy-access-from-other-accounts`). Both of these expiration values are configurable via the new input variables `max_session_duration_human_users` and `max_session_duration_machine_users`.

* The `aws-auth` script now accepts optional `--mfa-duration-seconds` and `--role-duration-seconds` parameters that specify the session expiration for the creds you get back when authenticating with an MFA token or assuming an IAM role, respectively. The default for both of these has been set to 12 hours to be more human-friendly.


### [v0.9.0](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.9.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/28/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.9.0">Release notes</a></small>
</p>

https://github.com/gruntwork-io/module-security/pull/92:

BACKWARDS INCOMPATIBLE CHANGES

1. The `auto-update`, `ntp`, `fail2ban`, and `ip-lockdown` modules now all use [bash-commons](https://github.com/gruntwork-io/bash-commons) under the hood. That means you must install `bash-commons` *before* installing any of those other modules.

1. The `auto-update` and `ntp` modules now support Amazon Linux 2. We will add Amazon Linux 2 support for `fail2ban` and `ip-lockdown` modules in the future.



## terraform-aws-zookeeper


### [v0.4.4](https://github.com/gruntwork-io/terraform-aws-zookeeper/releases/tag/v0.4.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 5/9/2018 | <a href="https://github.com/gruntwork-io/terraform-aws-zookeeper/releases/tag/v0.4.4">Release notes</a></small>
</p>

- IMPROVEMENT: Update to [server-group module v0.6.10](https://github.com/gruntwork-io/module-asg/releases/tag/v0.6.10)




<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "releases",
  "hash": "59f59a58b3c52ebee42aa83c8c218d7d"
}
##DOCS-SOURCER-END -->

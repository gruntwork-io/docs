
# Gruntwork release 2016-09

<p style={{marginTop: "-25px"}}><small><a href="/guides">Guides</a> / <a href="/guides/stay-up-to-date">Update Guides</a> / <a href="/guides/stay-up-to-date/releases">Releases</a> / 2016-09</small></p>

This page is lists all the updates to the [Gruntwork Infrastructure as Code 
Library](https://gruntwork.io/infrastructure-as-code-library/) that were released in 2016-09. For instructions 
on how to use these updates in your code, check out the [updating 
documentation](/guides/working-with-code/using-modules#updating).

Here are the repos that were updated:

- [boilerplate](#boilerplate)
- [terraform-aws-asg](#terraform-aws-asg)
- [terraform-aws-cache](#terraform-aws-cache)
- [terraform-aws-ci](#terraform-aws-ci)
- [terraform-aws-data-storage](#terraform-aws-data-storage)
- [terraform-aws-ecs](#terraform-aws-ecs)
- [terraform-aws-monitoring](#terraform-aws-monitoring)
- [terraform-aws-security](#terraform-aws-security)
- [terraform-aws-server](#terraform-aws-server)
- [terraform-aws-vpc](#terraform-aws-vpc)


## boilerplate


### [v0.1.0](https://github.com/gruntwork-io/boilerplate/releases/tag/v0.1.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/20/2016 | <a href="https://github.com/gruntwork-io/boilerplate/releases/tag/v0.1.0">Release notes</a></small>
</p>

BACKWARDS INCOMPATIBLE CHANGES
- Boilerplate now supports types for variables. Each variable in the `boilerplate.yml` file can define a `type` field set to string, int, float, bool, list, map, or enum (enum variables can also include a list of `options`). This allows for some basic error checking of the variable values and, even more importantly, allows you to use the corresponding Go template syntax for those types. For example, if-statements work as you would expect with booleans (no more having to check `if eq .Foo "true"`), you can loop over lists and maps using the `range` keyword, and you can do basic arithmetic on ints and floats.
- The `prompt` field in `boilerplate.yml` has been renamed to `description`.



### [v0.0.10](https://github.com/gruntwork-io/boilerplate/releases/tag/v0.0.10)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/16/2016 | <a href="https://github.com/gruntwork-io/boilerplate/releases/tag/v0.0.10">Release notes</a></small>
</p>

- `boilerplate` now has a `--missing-config-action` flag that controls its behavior when run against a template folder that doesn't have a `boilerplate.yml` file. The default behavior is now to exit with an error.



### [v0.0.9](https://github.com/gruntwork-io/boilerplate/releases/tag/v0.0.9)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/16/2016 | <a href="https://github.com/gruntwork-io/boilerplate/releases/tag/v0.0.9">Release notes</a></small>
</p>

- You can now use Go template syntax and boilerplate values in the names of files and folders.



### [v0.0.8](https://github.com/gruntwork-io/boilerplate/releases/tag/v0.0.8)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/16/2016 | <a href="https://github.com/gruntwork-io/boilerplate/releases/tag/v0.0.8">Release notes</a></small>
</p>

- Boilerplate now has a nicer, clearer UI when it prompts for variable values.



### [v0.0.7](https://github.com/gruntwork-io/boilerplate/releases/tag/v0.0.7)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/16/2016 | <a href="https://github.com/gruntwork-io/boilerplate/releases/tag/v0.0.7">Release notes</a></small>
</p>

- Templates can now use several arithmetic helpers: `plus`, `minus`, `times`, `divide`, and `mod`.
- There is also a new `slice START END INCREMENT` helper that returns an array from `START` to `END`, incrementing by `INCREMENT`. This is useful if you need to do a quick loop over a fixed set of numbers in your templates.



### [v0.0.6](https://github.com/gruntwork-io/boilerplate/releases/tag/v0.0.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/2/2016 | <a href="https://github.com/gruntwork-io/boilerplate/releases/tag/v0.0.6">Release notes</a></small>
</p>

- Add support for specifying a list of dependencies in `boilerplate.yml`. Each dependency is another `boilerplate` template, which allows you to chain templates together so that you can create more complicated templates out of simpler pieces. 




## terraform-aws-asg


### [v0.1.0](https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.1.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/1/2016 | <a href="https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.1.0">Release notes</a></small>
</p>

BREAKING CHANGE: We have updated this module to support [Terraform 0.7](https://www.hashicorp.com/blog/terraform-0-7.html) features. 
- In both `modules/asg-rolling-deploy-dynamic` and `modules/asg-rolling-deploy-static`, the input variables `vpc_subnet_ids`, `load_balancers`, and `availability_zones` are now lists.




## terraform-aws-cache


### [v0.2.0](https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v0.2.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/12/2016 | <a href="https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v0.2.0">Release notes</a></small>
</p>

- BREAKING CHANGE: We switched the redis module's implementation from CloudFormation over to Terraform now that Terraform supports Redis replication groups. Note that if you update to this new version of the redis module, **it will delete you original ElastiCache cluster and replace it with a new one**. Therefore, it's essential that you have all your data backed up and can take a downtime before you do the upgrade.
- Fix bugs in the outputs of both the memcached and redis module. It turns out that the Terraform (and in many cases, CloudFormation)  outputs are either missing or broken (see https://github.com/hashicorp/terraform/issues/8794 and https://github.com/hashicorp/terraform/issues/8788). We've added hacky workarounds that should do the trick for now, but we will be watching the progress of those bugs closely in the hope of getting a more reliable solution.



### [v0.1.3](https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v0.1.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/9/2016 | <a href="https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v0.1.3">Release notes</a></small>
</p>

- Snapshots can now properly be disabled for the redis module by setting the `snapshot_retention_limit` parameter to 0.
- In the redis module, the `parameter_group_name` variable is now optional.



### [v0.1.2](https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v0.1.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/9/2016 | <a href="https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v0.1.2">Release notes</a></small>
</p>

- The redis module now properly handles boolean values for the input variable `enable_automatic_failover`. 



### [v0.1.1](https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v0.1.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/9/2016 | <a href="https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v0.1.1">Release notes</a></small>
</p>

- The redis module would error out if the input variable `name` contained a hyphen or dash. This should now be fixed. Note, however, that Terraform 0.7.x had some bugs with CloudFormation (which we use under the hood to create the redis replication group) that have been fixed as of Terraform 0.7.3, so you _must_ use Terraform 0.7.3 to use the redis module!



### [v0.1.0](https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v0.1.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/1/2016 | <a href="https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v0.1.0">Release notes</a></small>
</p>

BREAKING CHANGE: We have updated this module to support [Terraform 0.7](https://www.hashicorp.com/blog/terraform-0-7.html) features. 

Changes in `modules/redis`:
- The input variables `subnet_ids` and `allow_connections_from_cidr_blocks` are now lists.
- The output variable `read_endpoints` is now a list.

Changes in `modules/memcached`:
- The input variables `subnet_ids` and `allow_connections_from_cidr_blocks` are now lists.
- The output variable `cache_addresses` is now a list.




## terraform-aws-ci


### [v0.0.23](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.0.23)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/14/2016 | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.0.23">Release notes</a></small>
</p>

- The `build-packer-artifact` script no longer checks for AWS environment variables. This check was unnecessary, since Packer does it itself. Moreover, the script is often used on an EC2 Instance where credentials are available via an IAM role rather than environment variables.



### [v0.0.22](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.0.22)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/10/2016 | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.0.22">Release notes</a></small>
</p>

- Added a new `scheduled-lambda-job` module that can be used to run AWS Lambda on a periodic basis. This is useful for background jobs, such as taking snapshots of servers.
- BUGFIX: The `configure-environment-for-gruntwork-module` now properly overwrites previous installs of Terraform, Packer, and Glide and doesn't get stuck asking for a user prompt.



### [v0.0.21](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.0.21)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/2/2016 | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.0.21">Release notes</a></small>
</p>

- `git-add-commit-push` now uses `git status --porcelain` to determine if there are changes to commit.



### [v0.0.20](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.0.20)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/2/2016 | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.0.20">Release notes</a></small>
</p>

- Fix a bug in the `git-add-commit-push` where it would incorrectly identify unstaged changes.



### [v0.0.19](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.0.19)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/1/2016 | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.0.19">Release notes</a></small>
</p>

- Fix a bug in `docs-generator` where it did not copy binary files, such as images, correctly




## terraform-aws-data-storage


### [v0.1.0](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.1.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/1/2016 | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.1.0">Release notes</a></small>
</p>

BREAKING CHANGE: We have updated this module to support [Terraform 0.7](https://www.hashicorp.com/blog/terraform-0-7.html) features. 

`modules/aurora` changes: 
- No longer takes an `availability_zones` input variable.
- Input variables `subnet_ids` and `allow_connections_from_cidr_blocks` are now both lists.
- Output variables `instance_endpoints` and `instance_ids` are now both lists.

`modules/rds` changes:
- Input variables `subnet_ids` and `allow_connections_from_cidr_blocks` are now both lists.
- Output variables `read_replica_endpoints` and `read_replica_ids` are now both lists.



## terraform-aws-ecs


### [v0.2.0](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.2.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/1/2016 | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.2.0">Release notes</a></small>
</p>

BREAKING CHANGE: We have updated this module to support [Terraform 0.7](https://www.hashicorp.com/blog/terraform-0-7.html) features. 

In `modules/ecs-cluster`:
- Input variable `vpc_subnet_ids` is now a list.




## terraform-aws-monitoring


### [v0.3.1](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.3.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/14/2016 | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.3.1">Release notes</a></small>
</p>

- In the elasticsearch-alarms module, we've increased the default `low_cpu_credit_balance_period` value to 15 minutes. That metric is reported only roughly once every 5 minutes, and with the original setting, if the metric took too long, the alarm would keep flipping between OK and INSUFFICIENT_DATA. This new value should fix that issue.



### [v0.3.0](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.3.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/13/2016 | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.3.0">Release notes</a></small>
</p>

Two changes to the elasticsearch-alarms module:
- The `account_id` param has been renamed to `aws_account_id`
- The default threshold for the low disk space alarm is now 1024 instead of 100



### [v0.2.3](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.2.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/13/2016 | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.2.3">Release notes</a></small>
</p>

- Add a new elasticsearch-alarms module that trigger alarms for an Elasticsearch cluster when CPU usage or heap usage gets too high, storage space gets too low, or the cluster goes into yellow or red status



### [v0.2.2](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.2.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/12/2016 | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.2.2">Release notes</a></small>
</p>

- Added two new modules that provide CloudWatch alarms for ElastiCache: elasticache-redis-alarms and elasticache-memcached-alarms



### [v0.2.1](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.2.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/11/2016 | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.2.1">Release notes</a></small>
</p>

- The rds-alarms module now accepts an `is_aurora` parameter. Set it to true if you're using the module with Aurora so that the module doesn't create unnecessary disk space alarms (since Aurora automatically expands available disk space)



### [v0.2.0](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.2.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/11/2016 | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.2.0">Release notes</a></small>
</p>

- BREAKING CHANGE: The input variables for the`rds-alarms` module have changed from a single `rds_instance_id` to a list called `rds_instance_ids`, plus a second variable called `num_rds_instance_ids` that specifies the length of `rds_instance_ids`. This allows you to add alarms to an RDS instance and all of its replicas.



### [v0.1.4](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.1.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/10/2016 | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.1.4">Release notes</a></small>
</p>

- Fix a bug in the ec2-disk-alarms module where it wouldn't allow you to create multiple alarms for the same EC2 Instance. The module now gives a unique name to each alarm so that you can have an alarm for multiple volumes on the same instance.



### [v0.1.3](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.1.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/10/2016 | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.1.3">Release notes</a></small>
</p>

- The `run-cloudwatch-logs-agent.sh` script now supports a new parameter called `--extra-log-file`, which allows you to specify custom log files to send to CloudWatch (in addition to syslog, which is sent by default). For example, you can easily add the nginx error log by specifying `--extra-log-file kern=/var/log/kern.log`.



### [v0.1.2](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.1.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/3/2016 | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.1.2">Release notes</a></small>
</p>

- Add CloudWatch Logs support for CentOS 7



### [v0.1.1](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.1.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/2/2016 | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.1.1">Release notes</a></small>
</p>

- Fix how the ELB access logs module sets the S3 bucket policy so that you don't get a diff every time you run `terraform plan`



### [v0.1.0](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.1.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/1/2016 | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.1.0">Release notes</a></small>
</p>

BREAKING CHANGE: We have updated this module to support [Terraform 0.7](https://www.hashicorp.com/blog/terraform-0-7.html) features. 
- All input variables named `alarm_sns_topic_arns` and `instance_ids` are now lists.




## terraform-aws-security


### [v0.2.0](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.2.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/29/2016 | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.2.0">Release notes</a></small>
</p>

- BREAKING CHANGE: We updated the `kms-master-key` module with a few changes:
  - Previously, terraform would unnecessarily update the Key Policy on every `terraform apply`. This didn't break anything, but it confusingly reported 1 resource as being modified when in fact nothing was changed. This has now been fixed using the new [data.aws_iam_policy_document](https://www.terraform.io/docs/providers/aws/d/iam_policy_document.html).
  - The var `key_root_user_iam_arns` has been replaced with  `var.allow_manage_key_permissions_with_iam` (accepts true/false) to better reflect the significance of setting this value. Note that the var `aws_account_id` is also now required.
  - The vars `key_administrator_iam_arns` and `key_user_iam_arns` have been renamed to `cmk_administrator_iam_arns` and `cmk_user_iam_arns` to more accurately reflect that these vars grant access to a Customer Master Key (CMK).
  - There is a new required input variable called `aws_account_id`.



### [v0.1.2](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.1.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/27/2016 | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.1.2">Release notes</a></small>
</p>

- We've added a new module, `iam-groups` that configures a best-practices set of IAM Groups and corresponding IAM Policies (permissions) you can use to better manage the security of your AWS account.



### [v0.1.1](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.1.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/12/2016 | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.1.1">Release notes</a></small>
</p>

- On boot, `ssh-iam` now waits 90 seconds before executing to try to give other services (e.g. the EC2 metadata service) a chance to start. This should hopefully ensure that `ssh-iam` doesn't hit any errors when it configures SSH access on boot and you don't have to wait for the next cron job to run (by default, they run every 30m) before SSH access works.



### [v0.1.0](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.1.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/2/2016 | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.1.0">Release notes</a></small>
</p>

BREAKING CHANGE: We have updated this module to support [Terraform 0.7](https://www.hashicorp.com/blog/terraform-0-7.html) features. 
- In `modules/kms-master-key`, the input variables `key_administrator_iam_arns`, `key_user_iam_arns`, and `key_root_user_iam_arns` are now all lists.



### [v0.0.4](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.0.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/1/2016 | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.0.4">Release notes</a></small>
</p>

- This release contains no new features. It just updates the version of the `docs-generator` we use to fix how the docs are created in https://github.com/gruntwork-io/module-security-public.




## terraform-aws-server


### [v0.1.1](https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.1.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/10/2016 | <a href="https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.1.1">Release notes</a></small>
</p>

- The single-server module now allows you to enable/disable CIDR-based SSH access by setting the input variable `allow_ssh_from_cidr` to `true` or `false` (for backwards compatibility, the default value is `true`).
- The single-server module now allows you to enable/disable security group-based SSH access by setting the input variable `allow_ssh_from_security_group` to `true` or `false` (for backwards compatibility, the default value is `false`) and setting `allow_ssh_from_security_group_id` to the ID of the security group.



### [v0.1.0](https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.1.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/2/2016 | <a href="https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.1.0">Release notes</a></small>
</p>

BREAKING CHANGE: We have updated this module to support [Terraform 0.7](https://www.hashicorp.com/blog/terraform-0-7.html) features. 
- In `modules/single-server`, the input variable `allow_ssh_from_cidr_list` is now a list.




## terraform-aws-vpc


### [v0.1.1](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.1.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 9/29/2016 | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.1.1">Release notes</a></small>
</p>

- The vpc-app and vpc-mgmt modules now allow you to pass in the IDs of virtual gateways to propagate into route tables. This is useful for propagating VPN routes. Use `private_propagating_vgws` and `persistence_propagating_vgws` in vpc-app and `private_propagating_vgws` in vpc-mgmt.





<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "releases",
  "hash": "918868012d5550302b21c9ae6a90f128"
}
##DOCS-SOURCER-END -->

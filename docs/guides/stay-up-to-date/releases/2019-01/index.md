
# Gruntwork release 2019-01

<p style={{marginTop: "-25px"}}><small><a href="/guides">Guides</a> / <a href="/guides/stay-up-to-date">Update Guides</a> / <a href="/guides/stay-up-to-date/releases">Releases</a> / 2019-01</small></p>

This page is lists all the updates to the [Gruntwork Infrastructure as Code 
Library](https://gruntwork.io/infrastructure-as-code-library/) that were released in 2019-01. For instructions 
on how to use these updates in your code, check out the [updating 
documentation](/guides/working-with-code/using-modules#updating).

Here are the repos that were updated:

- [package-k8s](#package-k-8-s)
- [terraform-aws-asg](#terraform-aws-asg)
- [terraform-aws-cache](#terraform-aws-cache)
- [terraform-aws-ci](#terraform-aws-ci)
- [terraform-aws-data-storage](#terraform-aws-data-storage)
- [terraform-aws-ecs](#terraform-aws-ecs)
- [terraform-aws-eks](#terraform-aws-eks)
- [terraform-aws-kafka](#terraform-aws-kafka)
- [terraform-aws-load-balancer](#terraform-aws-load-balancer)
- [terraform-aws-monitoring](#terraform-aws-monitoring)
- [terraform-aws-sam](#terraform-aws-sam)
- [terraform-aws-security](#terraform-aws-security)
- [terraform-aws-server](#terraform-aws-server)
- [terraform-aws-utilities](#terraform-aws-utilities)
- [terraform-aws-vpc](#terraform-aws-vpc)
- [terraform-aws-zookeeper](#terraform-aws-zookeeper)
- [terraform-kubernetes-helm](#terraform-kubernetes-helm)


## package-k8s


### [v0.1.4](https://github.com/gruntwork-io/package-k8s/releases/tag/v0.1.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/9/2019 | Modules affected: eks-cluster-control-plane | <a href="https://github.com/gruntwork-io/package-k8s/releases/tag/v0.1.4">Release notes</a></small>
</p>


- `eks-cluster-control-plane`


- When provisioning an EKS cluster, we will now wait for the API endpoint to come up before marking the resource as created. This addresses an eventual consistency issue where chaining eks cluster resources to kubernetes resources could sometimes fail because terraform marks a resource as complete before the API comes up and is responsive. Note that this requires installation of `kubergrunt`. You can get back to the older behavior by setting `use_kubergrunt_verification` to `false` in the module parameters.


- This release is not intended to be used in production, as core features of a production grade infrastructure are still missing. This is currently intended to be used for development and learning purposes so that you can plan out a migration to Gruntwork modules for managing EKS.





## terraform-aws-asg


### [v0.6.24](https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.6.24)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/26/2019 | Modules affected: asg-rolling-deploy | <a href="https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.6.24">Release notes</a></small>
</p>


* `asg-rolling-deploy`


* The `asg-rolling-deploy` module now allows you to configure enhanced monitoring on the instances via the `enabled_metrics` variable.


* https://github.com/gruntwork-io/module-asg/pull/59
* https://github.com/gruntwork-io/module-asg/pull/61


### [v0.6.23](https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.6.23)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/21/2019 | Modules affected: server-group | <a href="https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.6.23">Release notes</a></small>
</p>


* `server-group`


* The `server-group` module now allows you to configure IOPS for your EBS volumes by specifying the `iops` attribute for each EBS volume you configure via the `ebs_volumes` parameter.


* https://github.com/gruntwork-io/module-asg/pull/57
* https://github.com/gruntwork-io/module-asg/pull/58



## terraform-aws-cache


### [v0.5.0](https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v0.5.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/17/2019 | Modules affected: redis | <a href="https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v0.5.0">Release notes</a></small>
</p>


- `redis` (BACKWARDS INCOMPATIBLE)


- `redis`: Adds 4 new `aws_replication_group` permutations to the Redis module, to workaround the inability to use interpolations in `ignore_changes` field in a `lifecycle` block (hashicorp/terraform#3116) which will have been the ideal solution to ignoring the `number_cache_cluster` field when in `cluster_mode` to prevent `terraform plan` diffs due to cluster resizing.


This release is backwards incompatible and to update an existing Redis cluster, use `terragrunt state mv <old_address> <new_address>` to ensure that your cluster isn't deleted when you run `terraform apply`.

For example, to migrate a cluster mode Redis cluster deployed via the `aws_elasticache_replication_group.redis_with_snapshotting_without_auth_token` resource, you'd simply run:



## terraform-aws-ci


### [v0.13.8](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.13.8)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/14/2019 | Modules affected: install-jenkins | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.13.8">Release notes</a></small>
</p>


* `install-jenkins`


* You can now use the `--java-args` flag to configure additional JVM args for Jenkins.


* https://github.com/gruntwork-io/module-ci/pull/83


### [v0.13.7](https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.13.7)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/7/2019 | Modules affected: git-helpers | <a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.13.7">Release notes</a></small>
</p>


* `git-helpers`


* The `git-add-commit-push` script will now retry on the "failed to update ref" error, which seems to come up occasionally.


* https://github.com/gruntwork-io/module-ci/pull/82



## terraform-aws-data-storage


### [v0.8.7](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.8.7)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/30/2019 | Modules affected: rds | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.8.7">Release notes</a></small>
</p>


* `rds`


* The RDS module now lets you set the option group name and monitoring IAM Role path with two new optional variables, `option_group_name` and `monitoring_role_arn_path`, respectively.


* https://github.com/gruntwork-io/module-data-storage/pull/71


### [v0.8.6](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.8.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/28/2019 | Modules affected: aurora | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.8.6">Release notes</a></small>
</p>


* `aurora`


* The `aurora` module now exposes the `skip_final_snapshot` parameter to allow you to skip a final snapshot when deleting a database.


* https://github.com/gruntwork-io/module-data-storage/pull/75


### [v0.8.5](https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.8.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/3/2019 | Modules affected: aurora | <a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.8.5">Release notes</a></small>
</p>


* `aurora`


* You can now configure the `aurora` module to export logs to CloudWatch using the new `enabled_cloudwatch_logs_exports` input parameter.


* https://github.com/gruntwork-io/module-data-storage/pull/69



## terraform-aws-ecs


### [v0.11.3](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.11.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/23/2019 | Modules affected: ecs-daemon-service | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.11.3">Release notes</a></small>
</p>


* `ecs-daemon-service`


* The ecs-daemon-service module now exposes setting `pid_mode` via a new variable: `ecs_task_definition_pid_mode` . This allow setting the process namespace to use for the containers in the task. The valid values are `host` and `task`. The default value is `task` and the terraform provider will not accept an empty string value without error.


* https://github.com/gruntwork-io/module-ecs/pull/113


### [v0.11.2](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.11.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/16/2019 | Modules affected: ecs-daemon-service | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.11.2">Release notes</a></small>
</p>


* `ecs-daemon-service`


* The `ecs-daemon-service` module now exposes a `deployment_minimum_healthy_percent` parameter you can use to set the lower limit (as a percentage of the service's desiredCount) of the number of running tasks that must remain running and healthy in a service during a deployment.


* https://github.com/gruntwork-io/module-ecs/pull/111


### [v0.11.1](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.11.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/16/2019 | Modules affected: ecs-service-with-discovery | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.11.1">Release notes</a></small>
</p>


* `ecs-service-with-discovery`


* The `ecs-service-with-discovery` now includes a new `domain_name` output variable that will be set to the fully-qualified domain name configured for the module (if any).


* https://github.com/gruntwork-io/module-ecs/pull/110


### [v0.11.0](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.11.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/10/2019 | Modules affected: ecs-service-with-discovery | <a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.11.0">Release notes</a></small>
</p>


* `ecs-service-with-discovery` **[Breaking Change]**


* The `ecs-service-with-discovery` module now sets the default family name for the ECS Task Definition to `${var.service_name}` rather than `"${var.service_name}-task-definition"` to be consistent with the other ECS modules. If you wish to retain the old naming convention, you can now explicitly set the family name using the new `task_definition_family_name` parameter.


* https://github.com/gruntwork-io/module-ecs/pull/108
* https://github.com/gruntwork-io/module-ecs/pull/109



## terraform-aws-eks


### [v0.1.4](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.1.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/14/2019 | Modules affected: eks-cluster-control-plane, eks-cluster-workers, eks-k8s-role-mapping, eks-vpc-tags | <a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.1.4">Release notes</a></small>
</p>


- `eks-cluster-control-plane`
- `eks-cluster-workers`
- `eks-k8s-role-mapping`
- `eks-vpc-tags`


This is a compatible release of `terraform-aws-eks` with [`package-k8s` v0.1.4](https://github.com/gruntwork-io/package-k8s/releases/tag/v0.1.4).



## terraform-aws-kafka


### [v0.5.0](https://github.com/gruntwork-io/terraform-aws-kafka/releases/tag/v0.5.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/23/2019 | Modules affected: confluent-tools-cluster, confluent-tools-security-group-rules, kafka-cluster, kafka-security-group-rules | <a href="https://github.com/gruntwork-io/terraform-aws-kafka/releases/tag/v0.5.0">Release notes</a></small>
</p>

 ### Modules affected

* `confluent-tools-cluster`
* `confluent-tools-security-group-rules`
* `kafka-cluster`
* `kafka-security-group-rules`


*  Upgrade ZooKeeper dependency to v0.5.0 with improved health checking
*  Add support for num_xxx variables for Security Groups


### [v0.4.4](https://github.com/gruntwork-io/terraform-aws-kafka/releases/tag/v0.4.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/9/2019 | Modules affected: server-group, kafka-cluster, run-kafka, confluent-tools-cluster | <a href="https://github.com/gruntwork-io/terraform-aws-kafka/releases/tag/v0.4.4">Release notes</a></small>
</p>


* `server-group`
* `kafka-cluster`
* `run-kafka`
* `confluent-tools-cluster`

* `test`


* This release includes big improvements in testing. Tests are upgraded to `terratest v0.13.20` and tests are now test executed using 3 different Linux distributions: `Ubuntu`, `AmazonLinux` and `CentOS`. 



## terraform-aws-load-balancer


### [v0.13.0](https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.13.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/31/2019 | <a href="https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.13.0">Release notes</a></small>
</p>


* `alb` **[BREAKING CHANGE]**


* The ALB requires all listeners to have a "default action" that defines what to do for a request that doesn't match any listener rule. In the past, the only supported action was to forward requests to a target group, so we used to forward to an empty "black hole" target group, resulting in a 503. The ALB now supports fixed responses, so we've updated the default action of the `alb` module to return a blank 404 page, which is a more appropriate status code. 


For most teams, the new 404 behavior is better, so no code changes will be necessary. However, if you wish to override this 404 behavior, you have two options:

1. You can override the default fixed response via the `default_action_content_type`, `default_action_body`, `default_action_status_code` parameters.



## terraform-aws-monitoring


### [v0.11.0](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.11.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/31/2019 | Modules affected: cloudwatch-dashboard-metric-widget, cloudwatch-dashboard | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.11.0">Release notes</a></small>
</p>


- `cloudwatch-dashboard-metric-widget` (BACKWARDS INCOMPATIBLE)
- `cloudwatch-dashboard`


- `cloudwatch-dashboard-metric-widget`: Changes the `stacked` variable type from a `string` to a `bool`
- `cloudwatch-dashboard`: Updates replacement algorithm for creating valid json from Terraform `json_encode` output


This release is backwards incompatible and to update an existing metric widget, simply remove the surrounding quotes on the boolean value supplied.


### [v0.10.3](https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.10.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/22/2019 | Modules affected: alarms/alb-target-group-alarms | <a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.10.3">Release notes</a></small>
</p>


- `alarms/alb-target-group-alarms`


- Fixes a bug where the wrong variable was used for treating missing data on the high request count alarm.


- https://github.com/gruntwork-io/module-aws-monitoring/pull/59



## terraform-aws-sam


### [v0.1.9](https://github.com/gruntwork-io/terraform-aws-sam/releases/tag/v0.1.9)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/30/2019 | Modules affected: gruntsam | <a href="https://github.com/gruntwork-io/terraform-aws-sam/releases/tag/v0.1.9">Release notes</a></small>
</p>



- Fix https://github.com/gruntwork-io/package-sam/issues/25: Add `depends_on` to daisy chain resources that frequently encounter `ConflictException`.




### [v0.1.8](https://github.com/gruntwork-io/terraform-aws-sam/releases/tag/v0.1.8)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/24/2019 | <a href="https://github.com/gruntwork-io/terraform-aws-sam/releases/tag/v0.1.8">Release notes</a></small>
</p>





## terraform-aws-security


### [v0.15.7](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.15.7)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/21/2019 | Modules affected: fail2ban | <a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.15.7">Release notes</a></small>
</p>


* `fail2ban`


* Add `DEBIAN_FRONTEND=noninteractive` to calls to `apt-get` so that the install doesn't hang during automated builds. Use `systemctl` instead of `update-rc.d` to boot `fail2ban` on Ubuntu.


* https://github.com/gruntwork-io/module-security/pull/125



## terraform-aws-server


### [v0.6.0](https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.6.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/23/2019 | Modules affected: persistent-ebs-volume | <a href="https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.6.0">Release notes</a></small>
</p>


* `persistent-ebs-volume` **[BREAKING CHANGE]**


* `mount-ebs-volume` now uses the UUID instead of the device name to mount volumes. With some OS and volume configurations, the device name can change after a reboot, so using the UUID ensures that the volume is always identified the same way.


* https://github.com/gruntwork-io/module-server/pull/41


### [v0.5.4](https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.5.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/9/2019 | Modules affected: persistent-ebs-volume | <a href="https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.5.4">Release notes</a></small>
</p>


* `persistent-ebs-volume`


* The `mount-ebs-volume` script will now retry correctly if an EBS volume exists but is attached to a different EC2 instance. This is useful to ensure the script retries while an old instance shuts down and releases the volume.


* https://github.com/gruntwork-io/module-server/pull/38


### [v0.5.3](https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.5.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/8/2019 | <a href="https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.5.3">Release notes</a></small>
</p>

`single-server`

Some users may have requirements for tighter security group rules on instances, but the single-server module currently has a hard coded rule to allow all outbound traffic.

What we changed:
* Added an allow_all_outbound_traffic variable to the single-server module and implemented it so the allow_outbound_all security group rule can be toggled on/off by end-users.
* The variable defaults to true so existing users will be unaffected.




## terraform-aws-utilities


### [v0.0.6](https://github.com/gruntwork-io/terraform-aws-utilities/releases/tag/v0.0.6)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/9/2019 | Modules affected: **[NEW]**, **[NEW]** | <a href="https://github.com/gruntwork-io/terraform-aws-utilities/releases/tag/v0.0.6">Release notes</a></small>
</p>


- **[NEW]** `run-pex-as-data-source`
- **[NEW]** `run-pex-as-resource`


This release introduces modules that support running python PEX files in Terraform in a way such that the scripts themselves do not need to be embedded in the pex. See [the documentation](https://github.com/gruntwork-io/package-terraform-utilities/blob/master/modules/prepare-pex-environment/README.md#what-is-pex) to learn more about pex.

- `run-pex-as-data-source` can be used to run python pex files as an external data source.
- `run-pex-as-resource` can be used to run python pex files as a local-exec provisioner on a null_resource.



### [v0.0.5](https://github.com/gruntwork-io/terraform-aws-utilities/releases/tag/v0.0.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/9/2019 | Modules affected: require-executable | <a href="https://github.com/gruntwork-io/terraform-aws-utilities/releases/tag/v0.0.5">Release notes</a></small>
</p>


- `require-executable`


- Allows the `require-executable` module to ignore empty lists and strings on the input so that the check can be conditional.


- https://github.com/gruntwork-io/package-terraform-utilities/pull/10


### [v0.0.4](https://github.com/gruntwork-io/terraform-aws-utilities/releases/tag/v0.0.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/8/2019 | Modules affected: **[NEW]** | <a href="https://github.com/gruntwork-io/terraform-aws-utilities/releases/tag/v0.0.4">Release notes</a></small>
</p>


- **[NEW]** `require-executable`


- Introduces a new module `require-executable` that can be used to ensure particular executables is available in the `PATH`, with a customizable error message when it is not found.


- https://github.com/gruntwork-io/package-terraform-utilities/pull/8



## terraform-aws-vpc


### [v0.5.5](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.5.5)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/29/2019 | Modules affected: vpc-app, vpc-mgmt | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.5.5">Release notes</a></small>
</p>


* `vpc-app`
* `vpc-mgmt`


* Increased the `timeouts` on `create` on the `aws_route` resources to 5 minutes to work around [a Terraform bug](https://github.com/terraform-providers/terraform-provider-aws/issues/338).


* https://github.com/gruntwork-io/module-vpc/pull/50
* https://github.com/terraform-providers/terraform-provider-aws/issues/338


### [v0.5.4](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.5.4)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/14/2019 | Modules affected: vpc-app-network-acls | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.5.4">Release notes</a></small>
</p>


* `vpc-app-network-acls`


* The Network ACLs now allow outbound DNS (UDP, port 53) traffic, by default. Most services need DNS, so it seems like a bug to not have exposed this properly before. Note that internal AWS DNS seems to work without this, but for other DNS systems, such as the one used by Kubernetes, this is an important fix.


* https://github.com/gruntwork-io/module-vpc/pull/47




### [v0.5.3](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.5.3)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/9/2019 | Modules affected: vpc-app | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.5.3">Release notes</a></small>
</p>


* `vpc-app`


* You can now get the NAT Gateway IDs from the `vpc-app` module using the new `nat_gateway_ids` output attribute.


* https://github.com/gruntwork-io/module-vpc/pull/48


### [v0.5.2](https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.5.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/4/2019 | Modules affected: vpc-app | <a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.5.2">Release notes</a></small>
</p>


* `vpc-app`


* You can now create Elastic IP Addresses (EIPs) for your NAT Gateways outside of the `vpc-app` module and tell the module to use those EIPs by setting the `use_custom_nat_eips` parameter to `true` and passing in the list of EIP allocation IDs using the `custom_nat_eips` parameter.


* https://github.com/gruntwork-io/module-vpc/pull/46



## terraform-aws-zookeeper


### [v0.5.2](https://github.com/gruntwork-io/terraform-aws-zookeeper/releases/tag/v0.5.2)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/29/2019 | Modules affected: zookeeper-cluster, zookeeper-security-group-rules | <a href="https://github.com/gruntwork-io/terraform-aws-zookeeper/releases/tag/v0.5.2">Release notes</a></small>
</p>


* `zookeeper-cluster`
* `zookeeper-security-group-rules`


* Fix a misconfiguration of the `count` parameter for Security Group rules on inbound CIDR blocks that would lead to errors with duplicate Security Group rules being created.


* https://github.com/gruntwork-io/package-zookeeper/pull/39


### [v0.5.1](https://github.com/gruntwork-io/terraform-aws-zookeeper/releases/tag/v0.5.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/29/2019 | Modules affected: run-health-checker | <a href="https://github.com/gruntwork-io/terraform-aws-zookeeper/releases/tag/v0.5.1">Release notes</a></small>
</p>


* `run-health-checker`


* The `run-health-checker` module will now properly pass healthchecks for single-node ZooKeeper clusters running in "standalone" mode (e.g., in pre-prod environments).


* https://github.com/gruntwork-io/package-zookeeper/pull/38


### [v0.5.0](https://github.com/gruntwork-io/terraform-aws-zookeeper/releases/tag/v0.5.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/17/2019 | Modules affected: run-health-checker, zookeeper-cluster, install-oracle-jdk, zookeeper-security-group-rules | <a href="https://github.com/gruntwork-io/terraform-aws-zookeeper/releases/tag/v0.5.0">Release notes</a></small>
</p>

 ### Modules affected

* `run-health-checker` (new)
* `zookeeper-cluster`
* `install-oracle-jdk`
* `zookeeper-security-group-rules`


*  Improved ZooKeeper health checking by not only monitoring availability of the ZK client port, but actually checking the cluster status of the node with a `stat` command using a custom `health-checker` script target. 
*  Upgrade Oracle JDK installer to `8u202`.



## terraform-kubernetes-helm


### [v0.1.0](https://github.com/gruntwork-io/terraform-kubernetes-helm/releases/tag/v0.1.0)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/18/2019 | Modules affected: k8s-namespace, k8s-service-account | <a href="https://github.com/gruntwork-io/terraform-kubernetes-helm/releases/tag/v0.1.0">Release notes</a></small>
</p>


- `k8s-namespace` [**BACKWARDS INCOMPATIBLE**] 
- `k8s-service-account` [**BACKWARDS INCOMPATIBLE**] 


- The RBAC roles and RBAC role bindings are now managed using the kubernetes provider as opposed to kubectl.


This is a backwards incompatible change. Specifically, the modules no longer need to specify a `kubectl_config_context_name` and `kubectl_config_path`. Additionally, we now require the number of rbac roles to be passed in as a variable to work around a terraform limitation with looping interpolated lists.



### [v0.0.1](https://github.com/gruntwork-io/terraform-kubernetes-helm/releases/tag/v0.0.1)

<p style={{marginTop: "-20px", marginBottom: "10px"}}>
  <small>Published: 1/14/2019 | Modules affected: k8s-namespace, k8s-service-account | <a href="https://github.com/gruntwork-io/terraform-kubernetes-helm/releases/tag/v0.0.1">Release notes</a></small>
</p>


- `k8s-namespace`
- `k8s-service-account`


- Introduces `k8s-namespace` terraform module, which will create a namespace and RBAC roles for admin access and read only access restricted to the namespace.
- Introduces `k8s-service-account` terraform module, which will create a service account. This module also supports binding RBAC roles to the service account.




<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "releases",
  "hash": "dad4fb1e3a98c03d28f396bbfd11271c"
}
##DOCS-SOURCER-END -->

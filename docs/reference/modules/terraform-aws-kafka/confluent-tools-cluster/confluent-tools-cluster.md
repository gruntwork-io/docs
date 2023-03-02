---
title: "Confluent Tools Cluster"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Kafka" version="0.11.0" />

# Confluent Tools Cluster

<a href="https://github.com/gruntwork-io/terraform-aws-kafka/tree/master/modules/confluent-tools-cluster" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-kafka/releases?q=" className="link-button" title="Release notes for only the service catalog versions which impacted this service.">Release Notes</a>

This folder contains a Terraform module for running a cluster of [Confluent](https://www.confluent.io/) tools such as
[Schema Registry](https://docs.confluent.io/current/schema-registry/docs/index.html) and [REST Proxy](https://docs.confluent.io/current/kafka-rest/docs/index.html). Under the hood, the cluster is powered by the [server-group
module](https://github.com/gruntwork-io/terraform-aws-asg/tree/master/modules/server-group), so it supports attaching ENIs and
EBS Volumes, zero-downtime rolling deployment, and auto-recovery of failed nodes.

## Quick start

*   See the [root README](https://github.com/gruntwork-io/terraform-aws-kafka/tree/master/README.md) for instructions on using Terraform modules.
*   See the [kafka-zookeeper-confluent-oss-colocated-clusters example](https://github.com/gruntwork-io/terraform-aws-kafka/tree/master/examples/kafka-zookeeper-confluent-oss-colocated-cluster) for sample usage in a non-production environment.
*   See the [kafka-zookeeper-confluent-oss-standalone-clusters example](https://github.com/gruntwork-io/terraform-aws-kafka/tree/master/examples/kafka-zookeeper-confluent-oss-standalone-clusters) for sample usage in a production environment.
*   See [vars.tf](https://github.com/gruntwork-io/terraform-aws-kafka/tree/master/modules/confluent-tools-cluster/vars.tf) for all the variables you can set on this module.
*   See [Connecting to the Confluent Tools](#connecting-to-the-confluent-tools) for instructions on interacting with the
    open source Confluent tools.

## Key considerations for using this module

Here are the key things to take into account when using this module:

*   [Confluent Open Source AMI](#confluent-open-source-ami)
*   [User Data](#user-data)
*   [Kafka](#kafka)
*   [ZooKeeper](#zookeeper)
*   [Hardware](#hardware)
*   [EBS Volumes](#ebs-volumes)
*   [Health checks](#health-checks)
*   [Rolling deployments](#rolling-deployments)
*   [Data backup](#data-backup)

### Confluent Open Source AMI

You specify the AMI to run in the cluster using the `ami_id` input variable. We recommend creating a
[Packer](https://www.packer.io/) template to define the AMI with the following modules installed:

*   [install-open-jdk](https://github.com/gruntwork-io/terraform-aws-zookeeper/tree/master/modules/install-open-jdk):
    Install OpenJDK. Note that this module is part of
    [terraform-aws-zookeeper](https://github.com/gruntwork-io/terraform-aws-zookeeper).

*   [install-supervisord](https://github.com/gruntwork-io/terraform-aws-zookeeper/tree/master/modules/install-supervisord):
    Install Supervisord as a process manager. Note that this module is part of
    [terraform-aws-zookeeper](https://github.com/gruntwork-io/terraform-aws-zookeeper).

*   [install-confluent-tools](https://github.com/gruntwork-io/terraform-aws-kafka/tree/master/modules/install-confluent-tools): Install Confluent Tools like Schema Registry and REST Proxy
    directly from the Confluent `apt` or `yum` repos.

*   [run-schema-registry](https://github.com/gruntwork-io/terraform-aws-kafka/tree/master/modules/run-schema-registry): A script used to configure and start Confluent Schema Registry.

*   [run-kafka-rest](https://github.com/gruntwork-io/terraform-aws-kafka/tree/master/modules/run-kafka-rest): A script used to configure and start Confluent REST Proxy.

*   [run-kafka-connect](https://github.com/gruntwork-io/terraform-aws-kafka/tree/master/modules/run-kafka-connect): A script used to configure and start a Kafka Connect worker.

*   [run-health-checker](https://github.com/gruntwork-io/terraform-aws-kafka/tree/master/modules/run-health-checker): A script used to configure and start [health-checker](https://github.com/gruntwork-io/health-checker), a tool that enables more sophisticated health checks.

See the [confluent-oss-ami example](https://github.com/gruntwork-io/terraform-aws-kafka/tree/master/examples/confluent-oss-ami) for working sample code.

### User Data

When your servers are booting, you need to tell them to start Schema Registry, REST Proxy, and health-checker. The easiest
way to do that is to specify a [User Data script](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/user-data.html#user-data-api-cli) via the `user_data` input variable
that runs the [run-schema-registry](https://github.com/gruntwork-io/terraform-aws-kafka/tree/master/modules/run-schema-registry), [run-kafka-rest](https://github.com/gruntwork-io/terraform-aws-kafka/tree/master/modules/run-kafka-rest), and [run-health-checker](https://github.com/gruntwork-io/terraform-aws-kafka/tree/master/modules/run-health-checker) scripts. See [confluent-tools-cluster-user-data.sh](https://github.com/gruntwork-io/terraform-aws-kafka/tree/master/examples/kafka-zookeeper-confluent-oss-standalone-clusters/user-data/confluent-tools-cluster-user-data.sh) for an example.

### Kafka

[REST Proxy](https://docs.confluent.io/current/kafka-rest/docs/index.html) exposes a RESTful API on top of Kafka, and
[Schema Registry](https://docs.confluent.io/current/schema-registry/docs/index.html) stores schemas for data stored in
Kafka. Therefore, these services both depend on Kafka to work. The easiest way to run Kafka is with the [kafka-cluster](https://github.com/gruntwork-io/terraform-aws-kafka/tree/master/modules/kafka-cluster) modoule. Check out the [kafka-zookeeper-confluent-oss-standalone-clusters example](https://github.com/gruntwork-io/terraform-aws-kafka/tree/master/examples/kafka-zookeeper-confluent-oss-standalone-clusters) for how to run Kafka, ZooKeeper, and the Confluent
tools in separate clusters and the [kafka-zookeeper-confluent-oss-colocated-cluster example](https://github.com/gruntwork-io/terraform-aws-kafka/tree/master/examples/kafka-zookeeper-confluent-oss-colocated-cluster) for how to run all services co-located in the same
cluster.

### ZooKeeper

REST Proxy and Schema Registery depend on Kafka, and Kafka depends on [ZooKeeper](https://zookeeper.apache.org/) to work.
The easiest way to run ZooKeeper is with [terraform-aws-zookeeper](https://github.com/gruntwork-io/terraform-aws-zookeeper). Check out
the [kafka-zookeeper-standalone-clusters example](https://github.com/gruntwork-io/terraform-aws-kafka/tree/master/examples/kafka-zookeeper-standalone-clusters) for how to run Kafka and
ZooKeeper in separate clusters and the [kafka-zookeeper-colocated-confluent-oss-cluster
example](https://github.com/gruntwork-io/terraform-aws-kafka/tree/master/examples/kafka-zookeeper-confluent-oss-colocated-cluster) for how to run Kafka and ZooKeeper co-located in the same
cluster.

### Hardware

#### Schema Registry

Schema Registry hardware requirements are relatively light. Based on the [official Schema Registry hardware recommendations](https://docs.confluent.io/current/schema-registry/docs/deployment.html#hardware):

*   **Memory:** 1 GB of memory should be more than sufficient, assuming a reasonable number of schemas.
*   **CPU:** Schema Registry requires minimal CPU.
*   **Disk:** Because all data is stored in Kafka and only log4j logging uses the disk, Schema Registry requires minimal
    disk performance.
*   **Network:** Standard networking is sufficient.

Based on the above, for a production cluster, at least a `t2.small` is required, but because Schema Registry will likely
be co-located with other tools such as REST Proxy, more likely a `t2.medium` would be ideal.

#### REST Proxy

The number and type of servers you need for REST Proxy depend on the usage patterns you anticipate. For example, if REST
Proxy will be used mostly for administrative actions, you can allocate just 1GB per EC2 Instance (in addition to whatever
else is running on that EC2 Instance). But if REST Proxy is also serving consumers, you'll need to do some basic math
around how many consumers you expect and the average amount of memory buffer to be used per consumer.

Because hardware requirements depend on your particular business needs, we cannot make a specific recommendation. For
all the details, see the [official REST Proxy hardware recommendations](https://docs.confluent.io/current/kafka-rest/docs/deployment.html#hardware)

### EBS Volumes

Neither Schema Registry nor REST Proxy write to the local disk (EBS Volume) for core operations. Rather, all state is
stored in Kafka. Therefore, we make no special accommodations for a "sticky" EBS Volume or high performance.

### Health checks

We strongly recommend associating an [Elastic Load Balancer
(ELB)](https://aws.amazon.com/elasticloadbalancing/classicloadbalancer/) with your Confluent Tools cluster and configuring
it to perform TCP health checks on the Schema Registry port (8081 by default) and REST Proxy port (8082 by default). But
the ELB only supports health checks againt a single port, so we wrote [health-checker](https://github.com/gruntwork-io/health-checker)
to expose a simple HTTP web server that will check one or more TCP ports. This way a single ELB Health Check can in fact
check that both Schema Registry and REST Proxy are running.

The `confluent-tools-cluster` module allows you to associate an ELB with the Confluent Toosl cluster, using the ELB's
health checks to perform [zero-downtime deployments](#rolling-deployments) (i.e., ensuring the previous node is passing
health checks before deploying the next one) and to detect when a server is down and needs to be automatically replaced.

You may optionally connect to either REST Proxy or Schema Registery via the ELB, but keep in mind that an ELB's underlying
IP addresses may change from time to time, and that the ELB isn't aware of which of the Schema Registry or REST Proxy
nodes is serving as the master. Therefore, we prefer that your Schema Registry and REST Proxy clients be configured to
attempt a connection at multiple endpoints, in which case your client can declare the static DNS names of the Confluent
Tool servers. But if your client only supports a single endpoint, you should use the ELB, so that the ELB will only route
requests to healthy nodes.

Check out the [kafka-zookeeper-confluent-oss-standalone-clusters](https://github.com/gruntwork-io/terraform-aws-kafka/tree/master/examples/kafka-zookeeper-confluent-oss-standalone-clusters)
example for working sample code that includes an ELB.

### Rolling deployments

To deploy updates to the Confluent Tools cluster, such as rolling out a new version of the AMI, you need to do the following:

1.  Shut down one of the Confluent Tools servers.
2.  Deploy the new code on a new server.
3.  Wait for the new code to come up successfully and start passing health checks.
4.  Repeat the process with the remaining servers.

This module can do this process for you automatically by using the [server-group
module's](https://github.com/gruntwork-io/terraform-aws-asg/tree/master/modules/server-group) support for [zero-downtime
rolling deployment](https://github.com/gruntwork-io/terraform-aws-asg/tree/master/modules/server-group#how-does-rolling-deployment-work).

### Data backup

Because Schema Registry and REST Proxy store all data in Kafka itself, no backup strategy is needed beyond what's already
in place for Kafka.

## Connecting to The Confluent Tools

Once you've used this module to deploy the Confluent tools, you'll want to connect to them via their RESTful APIs. This
means you can simply use `curl` or search for more sophisticated clients in your desired proramming language that may
feature a more intuitive interface and more intelligence around retries and error handling.

Because these services may be listening for inbound requests over HTTPS, the preferred way to to address the services is
by their DNS names as specified in `var.dns_names` or `var.dns_name_common_portion`.

Note that these DNS names will resolve to the *static* IP address of an Elastic Network Interface (ENI), not the *emphemeral*
IP address assigned to an EC2 Instance at boot. That means that you can rely on the DNS names you select as not changing
often, if ever.

## TLS/SSL and Security

All tools in the Confluent Stack -- Kafka, Kafka Connect, Schema Registry, REST Proxy -- support HTTPS connections so
that you can transmit data in motion with encryption. But the interconnections between these tools can be confusing.
Here is a general guide to what kind of security settings are possible for each tool, as well as whether this Gruntwork
modules support a given security feature:

*   Kafka
    *   Accept inbound connections from clients over SSL/TLS (supported)
    *   Communicate between Kafka brokers over SSL/TLS (supported)
    *   Authenticate users using SSL or SASL (not yet supported)
    *   Limit access to Kafka using SASL or ACLs (not yet supported)

*   Schema Registry
    *   Accept inbound connections from clients over SSL/TLS (supported)
    *   Connect to Kafka brokers via SSL/TLS (supported)
    *   Authenticate to Kafka via SSL/SASL (not yet supported)

*   REST Proxy
    *   Accept inbound connections from clients over SSL/TLS (supported)
    *   Connect to Kafka brokers via SSL/TLS (supported)
    *   Connect to Schema Registry via SSL/TLS (supported)
    *   Authenticate to Kafka via SSL/SASL (not yet supported)

*   Kafka Connect
    *   Accept inbound connections from clients over SSL/TLS (supported)
    *   Connect to Kafka brokers via SSL/TLS (supported)
    *   Authenticate with SSL/SASL (not yet supported)
    *   Limit access using ACLs (not yet supported)
    *   Authenticate to Kafka via SSL/SASL (not yet supported)

In general, we try to enable the ability to connect to any service via SSL/TLS, but we do not yet support authentication
and authorization. If it becomes apparent these features are in high demand, we will happily add them!

Note that you must generate TLS/SSL certificates separately for the Kafka and Confluent Tools clusters as described
in the [kafka-ami](https://github.com/gruntwork-io/terraform-aws-kafka/tree/master/examples/kafka-ami/README.md) and [confluent-oss-ami](https://github.com/gruntwork-io/terraform-aws-kafka/tree/master/examples/confluent-oss-ami/README.md) READMEs,
respectively.

## Sample Usage

<ModuleUsage>

```hcl title="main.tf"

# ---------------------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S CONFLUENT-TOOLS-CLUSTER MODULE
# ---------------------------------------------------------------------------------------------------------------------

module "confluent-tools-cluster" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-kafka.git//modules/confluent-tools-cluster?ref=v0.11.0"

  # ---------------------------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ---------------------------------------------------------------------------------------------------------------------

  # A list of CIDR-formatted IP address ranges that will be allowed to connect to
  # Schema Registry and REST Proxy.
  allowed_inbound_cidr_blocks = <INPUT REQUIRED>

  # A list of security group IDs that will be allowed to connect to the Confluent
  # tools cluster (Schema Registry and REST Proxy)
  allowed_inbound_security_group_ids = <INPUT REQUIRED>

  # The ID of the AMI to run in this cluster. Should be an AMI that has the
  # Confluent Tools installed by the install-confluent-tool module.
  ami_id = <INPUT REQUIRED>

  # The AWS region to deploy into.
  aws_region = <INPUT REQUIRED>

  # The name of the Confluent Tools cluster (e.g. confluent-tools-stage). This
  # variable is used to namespace all resources created by this module.
  cluster_name = <INPUT REQUIRED>

  # The number of brokers to have in the cluster.
  cluster_size = <INPUT REQUIRED>

  # The ID of the Security Group associated with the ELB that fronts the Confluent
  # Tools cluster.
  confluent_tools_elb_security_group_id = <INPUT REQUIRED>

  # The type of EC2 Instances to run for each node in the cluster (e.g. t2.micro).
  instance_type = <INPUT REQUIRED>

  # The number of security group IDs in var.allowed_inbound_security_group_ids. We
  # should be able to compute this automatically, but due to a Terraform limitation,
  # we can't:
  # https://github.com/hashicorp/terraform/issues/14677#issuecomment-302772685
  num_allowed_inbound_security_group_ids = <INPUT REQUIRED>

  # The subnet IDs into which the EC2 Instances should be deployed. You should
  # typically pass in one subnet ID per node in the cluster_size variable. We
  # strongly recommend that you run the Confluent tools in private subnets.
  subnet_ids = <INPUT REQUIRED>

  # A User Data script to execute while the server is booting. We remmend passing in
  # a bash script that executes the run-kafka-rest and run-schema-registry scripts,
  # which should have been installed in the AMI with gruntwork-install.
  user_data = <INPUT REQUIRED>

  # The ID of the VPC in which to deploy the cluster
  vpc_id = <INPUT REQUIRED>

  # ---------------------------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ---------------------------------------------------------------------------------------------------------------------

  # A list of Security Group IDs that should be added to the Auto Scaling Group's
  # Launch Configuration used to launch the Confluent Tools cluster EC2 Instances.
  additional_security_group_ids = []

  # A list of CIDR-formatted IP address ranges from which the EC2 Instances will
  # allow SSH connections
  allowed_ssh_cidr_blocks = []

  # A list of security group IDs from which the EC2 Instances will allow SSH
  # connections
  allowed_ssh_security_group_ids = []

  # If set to true, associate a public IP address with each EC2 Instance in the
  # cluster. We strongly recommend against making these nodes publicly accessible.
  associate_public_ip_address = false

  # Set to true to attach an Elastic Network Interface (ENI) to each server. This is
  # an IP address that will remain static, even if the underlying servers are
  # replaced.
  attach_eni = false

  # Custom tags to apply to the Confluent Tools nodes and all related resources
  # (i.e., security groups, EBS Volumes, ENIs).
  custom_tags = {}

  # How many servers to deploy at a time during a rolling deployment. For example,
  # if you have 10 servers and set this variable to 2, then the deployment will a)
  # undeploy 2 servers, b) deploy 2 replacement servers, c) repeat the process for
  # the next 2 servers.
  deployment_batch_size = 1

  # The common portion of the DNS name to assign to each ENI in the Confluent Tools
  # server group. For example, if confluent.acme.com, this module will create DNS
  # records 0.confluent.acme.com, 1.confluent.acme.com, etc. Note that this value
  # must be a valid record name for the Route 53 Hosted Zone ID specified in
  # var.route53_hosted_zone_id.
  dns_name_common_portion = null

  # A list of DNS names to assign to the ENIs in the Confluent Tools server group.
  # Make sure the list has n entries, where n = var.cluster_size. If this var is
  # specified, it will override var.dns_name_common_portion. Example: [0.acme.com,
  # 1.acme.com, 2.acme.com]. Note that the list entries must be valid records for
  # the Route 53 Hosted Zone ID specified in var.route53_hosted_zone_id.
  dns_names = []

  # The TTL (Time to Live) to apply to any DNS records created by this module.
  dns_ttl = 300

  # A list of Elastic Load Balancer (ELB) names to associate with the Confluent
  # Tools nodes. We recommend using an ELB for health checks. If you're using an
  # Application Load Balancer (ALB), use var.target_group_arns instead.
  elb_names = []

  # Enable detailed CloudWatch monitoring for the servers. This gives you more
  # granularity with your CloudWatch metrics, but also costs more money.
  enable_detailed_monitoring = false

  # If true, create an Elastic IP Address for each ENI and associate it with the
  # ENI.
  enable_elastic_ips = false

  # A list of metrics the ASG should enable for monitoring all instances in a group.
  # The allowed values are GroupMinSize, GroupMaxSize, GroupDesiredCapacity,
  # GroupInServiceInstances, GroupPendingInstances, GroupStandbyInstances,
  # GroupTerminatingInstances, GroupTotalInstances.
  enabled_metrics = []

  # Time, in seconds, after instance comes into service before checking health.
  health_check_grace_period = 300

  # Controls how health checking is done. Must be one of EC2 or ELB.
  health_check_type = "EC2"

  # The port number on which health-checker
  # (https://github.com/gruntwork-io/health-checker) accepts inbound HTTP
  # connections. This is the port the ELB Health Check will actually use. Specify
  # null to disable this Security Group rule.
  health_checker_listener_port = 5500

  # The port numbers that will be open on the server cluster from the given
  # var.allowed_inbound_cidr_blocks or var.allowed_inbound_security_group_ids.
  # Expects a list of maps, where each map has the keys 'port' and 'description',
  # which correspond to the port to be opened and the description to be added to the
  # Security Group Rule, respectively.
  ports = [{"description":"Confluent Schema Registry","port":8081},{"description":"Confluent REST Proxy","port":8082},{"description":"Kafka Connect worker","port":8083}]

  # Whether the root volume should be destroyed on instance termination.
  root_volume_delete_on_termination = true

  # If true, the launched EC2 instance will be EBS-optimized.
  root_volume_ebs_optimized = false

  # The size, in GB, of the root EBS volume.
  root_volume_size = 50

  # The type of volume. Must be one of: standard, gp2, or io1.
  root_volume_type = "gp2"

  # The ID of the Route53 Hosted Zone in which we will create the DNS records
  # specified by var.dns_names. Must be non-empty if var.dns_name_common_portion or
  # var.dns_names is non-empty.
  route53_hosted_zone_id = null

  # The log level to use with the rolling deploy script. It can be useful to set
  # this to DEBUG when troubleshooting the script.
  script_log_level = "INFO"

  # If set to true, skip the health check, and start a rolling deployment without
  # waiting for the server group to be in a healthy state. This is primarily useful
  # if the server group is in a broken state and you want to force a deployment
  # anyway.
  skip_health_check = false

  # If set to true, skip the rolling deployment, and destroy all the servers
  # immediately. You should typically NOT enable this in prod, as it will cause
  # downtime! The main use case for this flag is to make testing and cleanup easier.
  # It can also be handy in case the rolling deployment code has a bug.
  skip_rolling_deploy = false

  # The name of an EC2 Key Pair that can be used to SSH to the EC2 Instances in this
  # cluster. Set to an empty string to not associate a Key Pair.
  ssh_key_name = null

  # The port used for SSH connections
  ssh_port = 22

  # A list of target group ARNs of Application Load Balanacer (ALB) targets to
  # associate with the Confluent Tools nodes. We recommend using an ELB for health
  # checks. If you're using a Elastic Load Balancer (AKA ELB Classic), use
  # var.elb_names instead.
  target_group_arns = []

  # The tenancy of the instance. Must be one of: default or dedicated.
  tenancy = "default"

  # A maximum duration that Terraform should wait for ASG instances to be healthy
  # before timing out. Setting this to '0' causes Terraform to skip all Capacity
  # Waiting behavior.
  wait_for_capacity_timeout = "10m"

}

```

</ModuleUsage>




## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Required

<HclListItem name="allowed_inbound_cidr_blocks" requirement="required" type="list(string)">
<HclListItemDescription>

A list of CIDR-formatted IP address ranges that will be allowed to connect to Schema Registry and REST Proxy.

</HclListItemDescription>
</HclListItem>

<HclListItem name="allowed_inbound_security_group_ids" requirement="required" type="list(string)">
<HclListItemDescription>

A list of security group IDs that will be allowed to connect to the Confluent tools cluster (Schema Registry and REST Proxy)

</HclListItemDescription>
</HclListItem>

<HclListItem name="ami_id" requirement="required" type="string">
<HclListItemDescription>

The ID of the AMI to run in this cluster. Should be an AMI that has the Confluent Tools installed by the install-confluent-tool module.

</HclListItemDescription>
</HclListItem>

<HclListItem name="aws_region" requirement="required" type="string">
<HclListItemDescription>

The AWS region to deploy into.

</HclListItemDescription>
</HclListItem>

<HclListItem name="cluster_name" requirement="required" type="string">
<HclListItemDescription>

The name of the Confluent Tools cluster (e.g. confluent-tools-stage). This variable is used to namespace all resources created by this module.

</HclListItemDescription>
</HclListItem>

<HclListItem name="cluster_size" requirement="required" type="number">
<HclListItemDescription>

The number of brokers to have in the cluster.

</HclListItemDescription>
</HclListItem>

<HclListItem name="confluent_tools_elb_security_group_id" requirement="required" type="string">
<HclListItemDescription>

The ID of the Security Group associated with the ELB that fronts the Confluent Tools cluster.

</HclListItemDescription>
</HclListItem>

<HclListItem name="instance_type" requirement="required" type="string">
<HclListItemDescription>

The type of EC2 Instances to run for each node in the cluster (e.g. t2.micro).

</HclListItemDescription>
</HclListItem>

<HclListItem name="num_allowed_inbound_security_group_ids" requirement="required" type="number">
<HclListItemDescription>

The number of security group IDs in <a href="#allowed_inbound_security_group_ids"><code>allowed_inbound_security_group_ids</code></a>. We should be able to compute this automatically, but due to a Terraform limitation, we can't: https://github.com/hashicorp/terraform/issues/14677#issuecomment-302772685

</HclListItemDescription>
</HclListItem>

<HclListItem name="subnet_ids" requirement="required" type="list(string)">
<HclListItemDescription>

The subnet IDs into which the EC2 Instances should be deployed. You should typically pass in one subnet ID per node in the cluster_size variable. We strongly recommend that you run the Confluent tools in private subnets.

</HclListItemDescription>
</HclListItem>

<HclListItem name="user_data" requirement="required" type="string">
<HclListItemDescription>

A User Data script to execute while the server is booting. We remmend passing in a bash script that executes the run-kafka-rest and run-schema-registry scripts, which should have been installed in the AMI with gruntwork-install.

</HclListItemDescription>
</HclListItem>

<HclListItem name="vpc_id" requirement="required" type="string">
<HclListItemDescription>

The ID of the VPC in which to deploy the cluster

</HclListItemDescription>
</HclListItem>

### Optional

<HclListItem name="additional_security_group_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of Security Group IDs that should be added to the Auto Scaling Group's Launch Configuration used to launch the Confluent Tools cluster EC2 Instances.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="allowed_ssh_cidr_blocks" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of CIDR-formatted IP address ranges from which the EC2 Instances will allow SSH connections

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="allowed_ssh_security_group_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of security group IDs from which the EC2 Instances will allow SSH connections

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="associate_public_ip_address" requirement="optional" type="bool">
<HclListItemDescription>

If set to true, associate a public IP address with each EC2 Instance in the cluster. We strongly recommend against making these nodes publicly accessible.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="attach_eni" requirement="optional" type="bool">
<HclListItemDescription>

Set to true to attach an Elastic Network Interface (ENI) to each server. This is an IP address that will remain static, even if the underlying servers are replaced.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="custom_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

Custom tags to apply to the Confluent Tools nodes and all related resources (i.e., security groups, EBS Volumes, ENIs).

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="deployment_batch_size" requirement="optional" type="number">
<HclListItemDescription>

How many servers to deploy at a time during a rolling deployment. For example, if you have 10 servers and set this variable to 2, then the deployment will a) undeploy 2 servers, b) deploy 2 replacement servers, c) repeat the process for the next 2 servers.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="1"/>
</HclListItem>

<HclListItem name="dns_name_common_portion" requirement="optional" type="string">
<HclListItemDescription>

The common portion of the DNS name to assign to each ENI in the Confluent Tools server group. For example, if confluent.acme.com, this module will create DNS records 0.confluent.acme.com, 1.confluent.acme.com, etc. Note that this value must be a valid record name for the Route 53 Hosted Zone ID specified in <a href="#route53_hosted_zone_id"><code>route53_hosted_zone_id</code></a>.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="dns_names" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of DNS names to assign to the ENIs in the Confluent Tools server group. Make sure the list has n entries, where n = <a href="#cluster_size"><code>cluster_size</code></a>. If this var is specified, it will override <a href="#dns_name_common_portion"><code>dns_name_common_portion</code></a>. Example: [0.acme.com, 1.acme.com, 2.acme.com]. Note that the list entries must be valid records for the Route 53 Hosted Zone ID specified in <a href="#route53_hosted_zone_id"><code>route53_hosted_zone_id</code></a>.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="dns_ttl" requirement="optional" type="number">
<HclListItemDescription>

The TTL (Time to Live) to apply to any DNS records created by this module.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="300"/>
</HclListItem>

<HclListItem name="elb_names" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of Elastic Load Balancer (ELB) names to associate with the Confluent Tools nodes. We recommend using an ELB for health checks. If you're using an Application Load Balancer (ALB), use <a href="#target_group_arns"><code>target_group_arns</code></a> instead.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="enable_detailed_monitoring" requirement="optional" type="bool">
<HclListItemDescription>

Enable detailed CloudWatch monitoring for the servers. This gives you more granularity with your CloudWatch metrics, but also costs more money.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="enable_elastic_ips" requirement="optional" type="bool">
<HclListItemDescription>

If true, create an Elastic IP Address for each ENI and associate it with the ENI.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="enabled_metrics" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of metrics the ASG should enable for monitoring all instances in a group. The allowed values are GroupMinSize, GroupMaxSize, GroupDesiredCapacity, GroupInServiceInstances, GroupPendingInstances, GroupStandbyInstances, GroupTerminatingInstances, GroupTotalInstances.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
<HclGeneralListItem title="Examples">
<details>
  <summary>Example</summary>


```hcl
   enabled_metrics = [
      "GroupDesiredCapacity",
      "GroupInServiceInstances",
      "GroupMaxSize",
      "GroupMinSize",
      "GroupPendingInstances",
      "GroupStandbyInstances",
      "GroupTerminatingInstances",
      "GroupTotalInstances"
    ]

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="health_check_grace_period" requirement="optional" type="number">
<HclListItemDescription>

Time, in seconds, after instance comes into service before checking health.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="300"/>
</HclListItem>

<HclListItem name="health_check_type" requirement="optional" type="string">
<HclListItemDescription>

Controls how health checking is done. Must be one of EC2 or ELB.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;EC2&quot;"/>
</HclListItem>

<HclListItem name="health_checker_listener_port" requirement="optional" type="number">
<HclListItemDescription>

The port number on which health-checker (https://github.com/gruntwork-io/health-checker) accepts inbound HTTP connections. This is the port the ELB Health Check will actually use. Specify null to disable this Security Group rule.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="5500"/>
</HclListItem>

<HclListItem name="ports" requirement="optional" type="list(object(…))">
<HclListItemDescription>

The port numbers that will be open on the server cluster from the given <a href="#allowed_inbound_cidr_blocks"><code>allowed_inbound_cidr_blocks</code></a> or <a href="#allowed_inbound_security_group_ids"><code>allowed_inbound_security_group_ids</code></a>. Expects a list of maps, where each map has the keys 'port' and 'description', which correspond to the port to be opened and the description to be added to the Security Group Rule, respectively.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
list(object({
    port        = number
    description = string
  }))
```

</HclListItemTypeDetails>
<HclListItemDefaultValue>

```hcl
[
  {
    description = "Confluent Schema Registry",
    port = 8081
  },
  {
    description = "Confluent REST Proxy",
    port = 8082
  },
  {
    description = "Kafka Connect worker",
    port = 8083
  }
]
```

</HclListItemDefaultValue>
</HclListItem>

<HclListItem name="root_volume_delete_on_termination" requirement="optional" type="bool">
<HclListItemDescription>

Whether the root volume should be destroyed on instance termination.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="root_volume_ebs_optimized" requirement="optional" type="bool">
<HclListItemDescription>

If true, the launched EC2 instance will be EBS-optimized.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="root_volume_size" requirement="optional" type="number">
<HclListItemDescription>

The size, in GB, of the root EBS volume.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="50"/>
</HclListItem>

<HclListItem name="root_volume_type" requirement="optional" type="string">
<HclListItemDescription>

The type of volume. Must be one of: standard, gp2, or io1.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;gp2&quot;"/>
</HclListItem>

<HclListItem name="route53_hosted_zone_id" requirement="optional" type="string">
<HclListItemDescription>

The ID of the Route53 Hosted Zone in which we will create the DNS records specified by <a href="#dns_names"><code>dns_names</code></a>. Must be non-empty if <a href="#dns_name_common_portion"><code>dns_name_common_portion</code></a> or <a href="#dns_names"><code>dns_names</code></a> is non-empty.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="script_log_level" requirement="optional" type="string">
<HclListItemDescription>

The log level to use with the rolling deploy script. It can be useful to set this to DEBUG when troubleshooting the script.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;INFO&quot;"/>
</HclListItem>

<HclListItem name="skip_health_check" requirement="optional" type="bool">
<HclListItemDescription>

If set to true, skip the health check, and start a rolling deployment without waiting for the server group to be in a healthy state. This is primarily useful if the server group is in a broken state and you want to force a deployment anyway.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="skip_rolling_deploy" requirement="optional" type="bool">
<HclListItemDescription>

If set to true, skip the rolling deployment, and destroy all the servers immediately. You should typically NOT enable this in prod, as it will cause downtime! The main use case for this flag is to make testing and cleanup easier. It can also be handy in case the rolling deployment code has a bug.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="ssh_key_name" requirement="optional" type="string">
<HclListItemDescription>

The name of an EC2 Key Pair that can be used to SSH to the EC2 Instances in this cluster. Set to an empty string to not associate a Key Pair.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="ssh_port" requirement="optional" type="number">
<HclListItemDescription>

The port used for SSH connections

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="22"/>
</HclListItem>

<HclListItem name="target_group_arns" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of target group ARNs of Application Load Balanacer (ALB) targets to associate with the Confluent Tools nodes. We recommend using an ELB for health checks. If you're using a Elastic Load Balancer (AKA ELB Classic), use <a href="#elb_names"><code>elb_names</code></a> instead.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="tenancy" requirement="optional" type="string">
<HclListItemDescription>

The tenancy of the instance. Must be one of: default or dedicated.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;default&quot;"/>
</HclListItem>

<HclListItem name="wait_for_capacity_timeout" requirement="optional" type="string">
<HclListItemDescription>

A maximum duration that Terraform should wait for ASG instances to be healthy before timing out. Setting this to '0' causes Terraform to skip all Capacity Waiting behavior.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;10m&quot;"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="asg_names">
</HclListItem>

<HclListItem name="cluster_size">
</HclListItem>

<HclListItem name="dns_names">
</HclListItem>

<HclListItem name="ebs_volume_ids">
</HclListItem>

<HclListItem name="eni_elastic_ips">
</HclListItem>

<HclListItem name="eni_private_ips">
</HclListItem>

<HclListItem name="iam_role_arn">
</HclListItem>

<HclListItem name="iam_role_id">
</HclListItem>

<HclListItem name="security_group_id">
</HclListItem>

</TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-kafka/tree/master/modules/confluent-tools-cluster/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-kafka/tree/master/modules/confluent-tools-cluster/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-kafka/tree/master/modules/confluent-tools-cluster/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "f770b5efcb93768548d9b6cf23a73373"
}
##DOCS-SOURCER-END -->

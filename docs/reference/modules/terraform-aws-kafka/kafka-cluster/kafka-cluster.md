---
title: "Kafka Cluster"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem} from '../../../../../src/components/HclListItem.tsx';

<a href="https://github.com/gruntwork-io/terraform-aws-kafka/tree/master/modules%2Fkafka-cluster" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-kafka/releases?q=" className="link-button" title="Release notes for only the service catalog versions which impacted this service.">Release Notes</a>

# Kafka Cluster

This folder contains a Terraform module for running a cluster of [Apache Kafka](https://kafka.apache.org/) brokers.
Under the hood, the cluster is powered by the [server-group
module](https://github.com/gruntwork-io/terraform-aws-asg/tree/master/modules/server-group), so it supports attaching ENIs and
EBS Volumes, zero-downtime rolling deployment, and auto-recovery of failed nodes.

## Quick start

*   See the [root README](https://github.com/gruntwork-io/terraform-aws-kafka/tree/master/README.md) for instructions on using Terraform modules.
*   See the [kafka-zookeeper-standalone-clusters example](https://github.com/gruntwork-io/terraform-aws-kafka/tree/master/examples/kafka-zookeeper-standalone-clusters) for sample usage.
*   See [vars.tf](https://github.com/gruntwork-io/terraform-aws-kafka/tree/master/vars.tf) for all the variables you can set on this module.
*   See [Connecting to Kafka brokers](#connecting-to-kafka-brokers) for instructions on reading / writing to Kafka.

## Key considerations for using this module

Here are the key things to take into account when using this module:

*   [Kafka AMI](#kafka-ami)
*   [User Data](#user-data)
*   [ZooKeeper](#zookeeper)
*   [Hardware](#hardware)
*   [Logs and EBS Volumes](#logs-and-ebs-volumes)
*   [Health checks](#health-checks)
*   [Rolling deployments](#rolling-deployments)
*   [Data backup](#data-backup)

### Kafka AMI

You specify the AMI to run in the cluster using the `ami_id` input variable. We recommend creating a
[Packer](https://www.packer.io/) template to define the AMI with the following modules installed:

*   [install-open-jdk](https://github.com/gruntwork-io/terraform-aws-zookeeper/tree/master/modules/install-open-jdk):
    Install OpenJDK. Note that this module is part of
    [terraform-aws-zookeeper](https://github.com/gruntwork-io/terraform-aws-zookeeper).

*   [install-supervisord](https://github.com/gruntwork-io/terraform-aws-zookeeper/tree/master/modules/install-supervisord):
    Install Supervisord as a process manager. Note that this module is part of
    [terraform-aws-zookeeper](https://github.com/gruntwork-io/terraform-aws-zookeeper).

*   [install-kafka](https://github.com/gruntwork-io/terraform-aws-kafka/tree/master/modules/install-kafka): Install Kafka.

*   [run-kafka](https://github.com/gruntwork-io/terraform-aws-kafka/tree/master/modules/run-kafka): A script used to configure and start Kafka.

See the [kafka-ami example](https://github.com/gruntwork-io/terraform-aws-kafka/tree/master/examples/kafka-ami) for working sample code.

### User Data

When your servers are booting, you need to tell them to start Kafka. The easiest way to do that is to specify a [User
Data script](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/user-data.html#user-data-api-cli) via the `user_data`
input variable that runs the [run-kafka script](https://github.com/gruntwork-io/terraform-aws-kafka/tree/master/modules/run-kafka). See
[kafka-user-data.sh](https://github.com/gruntwork-io/terraform-aws-kafka/tree/master/examples/kafka-zookeeper-standalone-clusters/user-data/kafka-user-data.sh) for an example.

### ZooKeeper

Kafka depends on [ZooKeeper](https://zookeeper.apache.org/) to work. The easiest way to run ZooKeeper is with
[terraform-aws-zookeeper](https://github.com/gruntwork-io/terraform-aws-zookeeper). Check out the
[kafka-zookeeper-standalone-clusters example](https://github.com/gruntwork-io/terraform-aws-kafka/tree/master/examples/kafka-zookeeper-standalone-clusters) for how to run Kafka and
ZooKeeper in separate clusters and the [kafka-zookeeper-confluent-oss-colocated-cluster
example](https://github.com/gruntwork-io/terraform-aws-kafka/tree/master/examples/kafka-zookeeper-confluent-oss-colocated-cluster) for how to run Kafka and ZooKeeper co-located in the same
cluster.

### Hardware

The number and type of servers you need for Kafka depends on your use case and the amount of data you expect to
process. Here are a few basic rules of thumb:

1.  Every write to Kafka gets persisted to Kafka's log on disk, so hard drive performance is important. Check out
    [Logs and EBS Volumes](#logs-and-ebs-volumes) for more info.

2.  Most writes to Kafka are initially buffered in memory by the OS. Therefore, you need sufficient memory to buffer
    active readers and writers. You can do a back-of-the-envelope estimate: e.g., if you want to be able to buffer for
    30 seconds, then you need at least `write_throughput * 30`, where `write_throughput` is how many MB/s you expect
    to be written to your Kafka cluster. Using 32GB+ machines for Kafka brokers is common.

3.  Kafka is not particularly CPU intensive, so getting machines with more cores is typically more efficient than
    machines with higher clock speeds. Note that enabling SSL for Kafka brokers significantly increases CPU usage.

4.  In general `r3.xlarge` or `m4.2xlarge` are a good choice for Kafka brokers.

For more info, see:

*   [Kafka Production Deployment](http://docs.confluent.io/current/kafka/deployment.html)
*   [Kafka Reference Architecture](https://www.cloudera.com/content/dam/www/marketing/resources/datasheets/kafka-reference-architecture.pdf.landing.html)
*   [Design and Deployment Considerations for Deploying Apache Kafka on AWS](https://www.confluent.io/blog/design-and-deployment-considerations-for-deploying-apache-kafka-on-aws/)

### Logs and EBS Volumes

Every write to a Kafka broker is persisted to disk in Kafka's *log*. We recommend using a separate [EBS
Volume](https://aws.amazon.com/ebs/) to store these logs. This ensures the hard drive used for transaction logs does
not have to contend with any other disk operations, which can improve Kafka performance. Moreover, if a Kafka broker
is replaced (e.g., during a deployment or after a crash), it can reattach the same EBS Volume and catch up on whatever
data it missed much faster than if it has to start from scratch (see [Design and Deployment Considerations for
Deploying Apache Kafka on AWS](https://www.confluent.io/blog/design-and-deployment-considerations-for-deploying-apache-kafka-on-aws/)).

This module creates an EBS Volume for each Kafka server and gives each (server, EBS Volume) a matching
`ebs-volume-0` tag. You can use the [persistent-ebs-volume
module](https://github.com/gruntwork-io/terraform-aws-server/tree/master/modules/persistent-ebs-volume) in the [User
Data](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/user-data.html#user-data-api-cli) of each server to find an
EBS Volume with a matching `ebs-volume-0` tag and attach it to the server during boot. That way, if a server goes down
and is replaced, its replacement reattaches the same EBS Volume.

See [kafka-user-data.sh](https://github.com/gruntwork-io/terraform-aws-kafka/tree/master/examples/kafka-zookeeper-standalone-clusters/user-data/kafka-user-data.sh) for an example.

### Health checks

We strongly recommend associating an [Elastic Load Balancer
(ELB)](https://aws.amazon.com/elasticloadbalancing/classicloadbalancer/) with your Kafka cluster and configuring it
to perform TCP health checks on the Kafka broker port (9092 by default). The `kafka-cluster` module allows you
to associate an ELB with Kafka, using the ELB's health checks to perform [zero-downtime
deployments](#rolling-deployments) (i.e., ensuring the previous node is passing health checks before deploying the next
one) and to detect when a server is down and needs to be automatically replaced.

Note that we do NOT recommend connecting to Kafka via the ELB. That's because Kafka clients need to connect to specific
brokers, depending on which topics and partitions they are using, whereas an ELB will randomly round-robin requests
across all brokers.

Check out the [kafka-zookeeper-standalone-clusters](https://github.com/gruntwork-io/terraform-aws-kafka/tree/master/examples/kafka-zookeeper-standalone-clusters) example for working
sample code that includes an ELB.

### Rolling deployments

To deploy updates to a Kafka cluster, such as rolling out a new version of the AMI, you need to do the following:

1.  Shut down a Kafka broker on one server.
2.  Deploy the new code on the same server.
3.  Wait for the new code to come up successfully and start passing health checks.
4.  Repeat the process with the remaining servers.

This module can do this process for you automatically by using the [server-group
module's](https://github.com/gruntwork-io/terraform-aws-asg/tree/master/modules/server-group) support for [zero-downtime
rolling deployment](https://github.com/gruntwork-io/terraform-aws-asg/tree/master/modules/server-group#how-does-rolling-deployment-work).

### Data backup

Kafka's primary mechanism for backing up data is the replication within the cluster. Typically, the only backup you
may do beyond that is to create a Kafka consumer that dumps all data into a permanent, reliable store such as S3. This
functionality is NOT included with this module.

## Connecting to Kafka brokers

Once you've used this module to deploy the Kafka brokers, you'll want to connect to them from Kafka clients (e.g.,
Kafka consumers and producers in your apps) to read and write data. To do this, you typically need to configure the
`bootstrap.servers` property for your Kafka client with the IP addresses of a few of your Kafka brokers (you don't
need all the IPs, as the rest will be discovered automatically via ZooKeeper):

```bash
--bootstrap.servers=10.0.0.4:9092,10.0.0.5:9092,10.0.0.6:9092
```

There are two main ways to get the IP addresses of your Kafka brokers:

1.  [Find Kafka brokers by tag](#find-kafka-brokers-by-tag)
2.  [Find Kafka brokers using ENIs](#find-kafka-brokers-using-enis)

### Find Kafka brokers by tag

Each Kafka broker deployed using this module will have a tag called `ServerGroupName` with the value set to the
`var.name` parameter you pass in. You can automatically discover all the servers with this tag and get their IP
addresses using either the [AWS CLI](https://aws.amazon.com/cli/) or [AWS SDK](https://aws.amazon.com/tools/).

Here's an example using the AWS CLI:

```bash
aws ec2 describe-instances \
  --region <REGION> \
  --filters \
    "Name=instance-state-name,Values=running" \
    "Name=tag:ServerGroupName,Values=<KAFKA_CLUSTER_NAME>"
```

In the command above, you'll need to replace `<REGION>` with your AWS region (e.g., `us-east-1`) and
`<KAFKA_CLUSTER_NAME>` with the name of your Kafka cluster (i.e., the `var.name` parameter you passed to this module).

The returned data will contain the information about all the Kafka brokers, including their private IP addresses.
Extract these IPs, add the Kafka port to each one (default `9092`), and put them into a comma-separated list:

```bash
--bootstrap.servers=10.0.0.4:9092,10.0.0.5:9092,10.0.0.6:9092
```

### Find Kafka brokers using ENIs

An alternative option is to attach an [Elastic Network Interface
(ENI)](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-eni.html) to each Kafka broker so that it has a static
IP address. You can enable ENIs using the `attach_eni` parameter:

```hcl
module "kafka_brokers" {
  source = "git::git@github.com:gruntwork-io/terraform-aws-kafka.git//modules/kafka-cluster?ref=v0.0.5"

  cluster_name = "example-kafka-brokers"
  attach_eni   = true
  
  # (other params omitted)
}
```

With ENIs enabled, this module will output the list of private IPs for your brokers in the `private_ips` output
variable. Attach the port number (default `9092`) to each of these IPs and pass them on to your Kafka clients:

```hcl
bootstrap_servers = "${formatlist("%s:9092", module.kafka_brokers.private_ips)}"
```

The main downside of using ENIs is if you decide to change the size of your Kafka cluster, and therefore the number of
ENIs, then Kafka clients that have the old list of ENIs won't be updated until you re-deploy them with a
`terraform apply`. If you increased the size of your cluster, then those older clients may not have access to all the
available ENIs, which is typically not a problem, since they are only used for bootstrapping, and you only need a few
anyway. However, if you decreased the size of your cluster, then those older clients may be trying to connect to ENIs
that are no longer valid.




## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Required

<HclListItem name="cluster_name" requirement="required" type="string">
<HclListItemDescription>

The name of the Kafka cluster (e.g. kafka-stage). This variable is used to namespace all resources created by this module.

</HclListItemDescription>
</HclListItem>

<HclListItem name="ami_id" requirement="required" type="string">
<HclListItemDescription>

The ID of the AMI to run in this cluster. Should be an AMI that has Kafka installed by the install-kafka module.

</HclListItemDescription>
</HclListItem>

<HclListItem name="instance_type" requirement="required" type="string">
<HclListItemDescription>

The type of EC2 Instances to run for each node in the cluster (e.g. t2.micro).

</HclListItemDescription>
</HclListItem>

<HclListItem name="aws_region" requirement="required" type="string">
<HclListItemDescription>

The AWS region to deploy into.

</HclListItemDescription>
</HclListItem>

<HclListItem name="vpc_id" requirement="required" type="string">
<HclListItemDescription>

The ID of the VPC in which to deploy the cluster

</HclListItemDescription>
</HclListItem>

<HclListItem name="subnet_ids" requirement="required" type="list(string)">
<HclListItemDescription>

The subnet IDs into which the EC2 Instances should be deployed. You should typically pass in one subnet ID per node in the cluster_size variable. We strongly recommend that you run Kafka in private subnets.

</HclListItemDescription>
</HclListItem>

<HclListItem name="allowed_inbound_cidr_blocks" requirement="required" type="list(string)">
<HclListItemDescription>

A list of CIDR-formatted IP address ranges that will be allowed to connect to the Kafka brokers

</HclListItemDescription>
</HclListItem>

<HclListItem name="allowed_inbound_security_group_ids" requirement="required" type="list(string)">
<HclListItemDescription>

A list of security group IDs that will be allowed to connect to the Kafka brokers

</HclListItemDescription>
</HclListItem>

<HclListItem name="num_allowed_inbound_security_group_ids" requirement="required" type="number">
<HclListItemDescription>

The number of security group IDs in <a href="#allowed_inbound_security_group_ids"><code>allowed_inbound_security_group_ids</code></a>. We should be able to compute this automatically, but due to a Terraform limitation, we can't: https://github.com/hashicorp/terraform/issues/14677#issuecomment-302772685

</HclListItemDescription>
</HclListItem>

<HclListItem name="user_data" requirement="required" type="string">
<HclListItemDescription>

A User Data script to execute while the server is booting. We remmend passing in a bash script that executes the run-kafka script, which should have been installed in the AMI by the install-kafka module.

</HclListItemDescription>
</HclListItem>

<HclListItem name="cluster_size" requirement="required" type="number">
<HclListItemDescription>

The number of brokers to have in the cluster.

</HclListItemDescription>
</HclListItem>

### Optional

<HclListItem name="attach_eni" requirement="optional" type="bool">
<HclListItemDescription>

Set to true to attach an Elastic Network Interface (ENI) to each server. This is an IP address that will remain static, even if the underlying servers are replaced.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="ssh_key_name" requirement="optional" type="string">
<HclListItemDescription>

The name of an EC2 Key Pair that can be used to SSH to the EC2 Instances in this cluster. Set to an empty string to not associate a Key Pair.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
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

If set to true, associate a public IP address with each EC2 Instance in the cluster. We strongly recommend against making Kafka nodes publicly accessible.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="tenancy" requirement="optional" type="string">
<HclListItemDescription>

The tenancy of the instance. Must be one of: default or dedicated.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;default&quot;"/>
</HclListItem>

<HclListItem name="root_volume_ebs_optimized" requirement="optional" type="bool">
<HclListItemDescription>

If true, the launched EC2 instance will be EBS-optimized.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="root_volume_type" requirement="optional" type="string">
<HclListItemDescription>

The type of volume. Must be one of: standard, gp2, or io1.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;gp2&quot;"/>
</HclListItem>

<HclListItem name="root_volume_size" requirement="optional" type="number">
<HclListItemDescription>

The size, in GB, of the root EBS volume.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="50"/>
</HclListItem>

<HclListItem name="root_volume_delete_on_termination" requirement="optional" type="bool">
<HclListItemDescription>

Whether the root volume should be destroyed on instance termination.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="ebs_volumes" requirement="optional" type="list(object(…))">
<HclListItemDescription>

A list that defines the EBS Volumes to create for each server. Each item in the list should be a map that contains the keys 'type' (one of standard, gp2, or io1), 'size' (in GB), and 'encrypted' (true or false). We recommend attaching an EBS Volume to Kafka to use for Kafka logs.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
list(object({
    type      = string
    size      = number
    encrypted = bool
  }))
```

</HclListItemTypeDetails>
<HclListItemDefaultValue>

```hcl
[
  {
    encrypted = true,
    size = 50,
    type = "gp2"
  }
]
```

</HclListItemDefaultValue>
</HclListItem>

<HclListItem name="target_group_arns" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of target group ARNs of Application Load Balanacer (ALB) targets to associate with the Kafka brokers. We recommend using an ELB for health checks. If you're using a Elastic Load Balancer (AKA ELB Classic), use <a href="#elb_names"><code>elb_names</code></a> instead.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="elb_names" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of Elastic Load Balancer (ELB) names to associate with the Kafka brokers. We recommend using an ELB for health checks. If you're using an Application Load Balancer (ALB), use <a href="#target_group_arns"><code>target_group_arns</code></a> instead.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="wait_for_capacity_timeout" requirement="optional" type="string">
<HclListItemDescription>

A maximum duration that Terraform should wait for ASG instances to be healthy before timing out. Setting this to '0' causes Terraform to skip all Capacity Waiting behavior.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;10m&quot;"/>
</HclListItem>

<HclListItem name="health_check_type" requirement="optional" type="string">
<HclListItemDescription>

Controls how health checking is done. Must be one of EC2 or ELB.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;EC2&quot;"/>
</HclListItem>

<HclListItem name="health_check_grace_period" requirement="optional" type="number">
<HclListItemDescription>

Time, in seconds, after instance comes into service before checking health.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="300"/>
</HclListItem>

<HclListItem name="custom_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

Custom tags to apply to the Kafka nodes and all related resources (i.e., security groups, EBS Volumes, ENIs).

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="broker_port" requirement="optional" type="number">
<HclListItemDescription>

The port the Kafka brokers should listen on

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="9092"/>
</HclListItem>

<HclListItem name="kafka_connect_port" requirement="optional" type="number">
<HclListItemDescription>

The port the Kafka Connect Worker should listen on. Set to 0 to disable this Security Group Rule.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="8083"/>
</HclListItem>

<HclListItem name="ssh_port" requirement="optional" type="number">
<HclListItemDescription>

The port used for SSH connections

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="22"/>
</HclListItem>

<HclListItem name="script_log_level" requirement="optional" type="string">
<HclListItemDescription>

The log level to use with the rolling deploy script. It can be useful to set this to DEBUG when troubleshooting the script.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;INFO&quot;"/>
</HclListItem>

<HclListItem name="skip_rolling_deploy" requirement="optional" type="bool">
<HclListItemDescription>

If set to true, skip the rolling deployment, and destroy all the servers immediately. You should typically NOT enable this in prod, as it will cause downtime! The main use case for this flag is to make testing and cleanup easier. It can also be handy in case the rolling deployment code has a bug.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="skip_health_check" requirement="optional" type="bool">
<HclListItemDescription>

If set to true, skip the health check, and start a rolling deployment without waiting for the server group to be in a healthy state. This is primarily useful if the server group is in a broken state and you want to force a deployment anyway.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="deployment_batch_size" requirement="optional" type="number">
<HclListItemDescription>

How many servers to deploy at a time during a rolling deployment. For example, if you have 10 servers and set this variable to 2, then the deployment will a) undeploy 2 servers, b) deploy 2 replacement servers, c) repeat the process for the next 2 servers.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="1"/>
</HclListItem>

<HclListItem name="enable_detailed_monitoring" requirement="optional" type="bool">
<HclListItemDescription>

Enable detailed CloudWatch monitoring for the servers. This gives you more granularity with your CloudWatch metrics, but also costs more money.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="route53_hosted_zone_id" requirement="optional" type="string">
<HclListItemDescription>

The ID of the Route53 Hosted Zone in which we will create the DNS records specified by <a href="#dns_names"><code>dns_names</code></a>. Must be non-empty if <a href="#dns_name_common_portion"><code>dns_name_common_portion</code></a> or <a href="#dns_names"><code>dns_names</code></a> is non-empty.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="dns_ttl" requirement="optional" type="number">
<HclListItemDescription>

The TTL (Time to Live) to apply to any DNS records created by this module.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="300"/>
</HclListItem>

<HclListItem name="dns_names" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of DNS names to assign to the ENIs in the Confluent Tools server group. Make sure the list has n entries, where n = <a href="#cluster_size"><code>cluster_size</code></a>. If this var is specified, it will override <a href="#dns_name_common_portion"><code>dns_name_common_portion</code></a>. Example: [0.acme.com, 1.acme.com, 2.acme.com]. Note that the list entries must be valid records for the Route 53 Hosted Zone ID specified in <a href="#route53_hosted_zone_id"><code>route53_hosted_zone_id</code></a>.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="dns_name_common_portion" requirement="optional" type="string">
<HclListItemDescription>

The common portion of the DNS name to assign to each ENI in the Confluent Tools server group. For example, if confluent.acme.com, this module will create DNS records 0.confluent.acme.com, 1.confluent.acme.com, etc. Note that this value must be a valid record name for the Route 53 Hosted Zone ID specified in <a href="#route53_hosted_zone_id"><code>route53_hosted_zone_id</code></a>.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="enable_elastic_ips" requirement="optional" type="bool">
<HclListItemDescription>

If true, create an Elastic IP Address for each ENI and associate it with the ENI.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="additional_security_group_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of Security Group IDs that should be added to the Auto Scaling Group's Launch Configuration used to launch the Kafka cluster EC2 Instances.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="wait_for" requirement="optional" type="string">
<HclListItemDescription>

By passing a value to this variable, you can effectively tell this module to wait to deploy until the given variable's value is resolved, which is a way to require that this module depend on some other module. Note that the actual value of this variable doesn't matter.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;&quot;"/>
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

   Example:
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

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="asg_names">
</HclListItem>

<HclListItem name="cluster_size">
</HclListItem>

<HclListItem name="iam_role_arn">
</HclListItem>

<HclListItem name="iam_role_id">
</HclListItem>

<HclListItem name="security_group_id">
</HclListItem>

<HclListItem name="eni_private_ips">
</HclListItem>

<HclListItem name="eni_elastic_ips">
</HclListItem>

<HclListItem name="ebs_volume_ids">
</HclListItem>

<HclListItem name="rolling_deployment_done">
</HclListItem>

</TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-kafka/tree/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-kafka/tree/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-kafka/tree/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "a72840c0820e9f567faf89230db2fa53"
}
##DOCS-SOURCER-END -->

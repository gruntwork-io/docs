---
title: "ZooKeeper Cluster"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';

<a href="https://github.com/gruntwork-io/terraform-aws-zookeeper/tree/main/modules/zookeeper-cluster" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-zookeeper/releases?q=" className="link-button" title="Release notes for only the service catalog versions which impacted this service.">Release Notes</a>

# ZooKeeper Cluster

This folder contains a Terraform module for running a cluster of [Apache ZooKeeper](https://zookeeper.apache.org/)
nodes. Under the hood, the cluster is powered by the [server-group
module](https://github.com/gruntwork-io/terraform-aws-asg/tree/main/modules/server-group), so it supports attaching ENIs and
EBS Volumes, zero-downtime rolling deployment, and auto-recovery of failed nodes. This module assumes that you are
deploying an AMI that has both ZooKeeper and [Exhibitor](https://github.com/soabase/exhibitor/) installed.

## Quick start

*   See the [root README](https://github.com/gruntwork-io/terraform-aws-zookeeper/tree/main/README.md) for instructions on using Terraform modules.
*   See the [zookeeper-cluster example](https://github.com/gruntwork-io/terraform-aws-zookeeper/tree/main/examples/zookeeper-cluster) for sample usage.
*   See [vars.tf](https://github.com/gruntwork-io/terraform-aws-zookeeper/tree/main/modules/zookeeper-cluster/vars.tf) for all the variables you can set on this module.

## Key considerations for using this module

Here are the key things to take into account when using this module:

*   [ZooKeeper AMI](#zookeeper-ami)
*   [User Data](#user-data)
*   [Cluster size](#cluster-size)
*   [Health checks](#health-checks)
*   [Rolling deployments](#rolling-deployments)
*   [Static IPs and ENIs](#static-ips-and-enis)
*   [Transaction logs and EBS Volumes](#transaction-logs-and-ebs-volumes)
*   [Exhibitor](#exhibitor)
*   [Data backup](#data-backup)

### ZooKeeper AMI

You specify the AMI to run in the cluster using the `ami_id` input variable. We recommend creating a
[Packer](https://www.packer.io/) template to define the AMI with the following modules installed:

*   [install-oracle-jdk](https://github.com/gruntwork-io/terraform-aws-zookeeper/tree/main/modules/install-oracle-jdk): Install the Oracle JDK.
*   [install-supervisord](https://github.com/gruntwork-io/terraform-aws-zookeeper/tree/main/modules/install-supervisord): Install Supervisord as a process manager.
*   [install-zookeeper](https://github.com/gruntwork-io/terraform-aws-zookeeper/tree/main/modules/install-zookeeper): Install ZooKeeper.
*   [install-exhibitor](https://github.com/gruntwork-io/terraform-aws-zookeeper/tree/main/modules/install-exhibitor): Install Exhibitor.
*   [run-exhibitor](https://github.com/gruntwork-io/terraform-aws-zookeeper/tree/main/modules/run-exhibitor): Start Exhibitor, which, in turn, will start ZooKeeper.

See the [zookeeper-ami example](https://github.com/gruntwork-io/terraform-aws-zookeeper/tree/main/examples/zookeeper-ami) for working sample code.

### User Data

When your servers are booting, you need to tell them to start Exhibitor (which, in turn, will start ZooKeeper). The
easiest way to do that is to specify a [User Data
script](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/user-data.html#user-data-api-cli) via the `user_data` input
variable that runs the [run-exhibitor script](https://github.com/gruntwork-io/terraform-aws-zookeeper/tree/main/modules/run-exhibitor). See
[user-data.sh](https://github.com/gruntwork-io/terraform-aws-zookeeper/tree/main/examples/zookeeper-cluster/user-data/user-data.sh) for an example.

### Cluster size

Although you can run ZooKeeper on just a single server, in production, we *strongly* recommend running multiple
ZooKeeper servers in a cluster (called an *ensemble*) so that:

1.  ZooKeeper replicates your data to all servers in the ensemble, so if one server dies, you don't lose any data, and
    the other servers can continue serving requests.
2.  Since the data is replicated across all the servers, any of the ZooKeeper nodes can respond to a read request, so
    you can scale to more read traffic by increasing the size of the cluster.

Note that ZooKeeper achieves consensus by using a majority vote, which has three implications:

1.  Your cluster must have an odd number of servers to make it possible to achieve a majority.
2.  A ZooKeeper cluster can continue to operate as long as a majority of the servers are operational. That means a
    cluster with `n` nodes can tolerate `(n - 1) / 2` failed servers. So a 1-node cluster cannot tolerate any
    failed servers, a 3-node cluster can tolerate 1 failed server, a 5-node cluster can tolerate 2 failed servers, and
    a 7-node cluster can tolerate 3 failed servers.
3.  Larger clusters actually make writes *slower*, since you have to wait on more servers to respond to the vote. Most
    use cases are much more read-heavy than write-heavy, so this is typically a good trade-off. In practice, because
    writes get more expensive as the cluster grows, it's unusual to see a ZooKeeper cluster with more than 7 servers.

Putting all of this together, we recommend that in production, you always use a 3, 5, or 7 node cluster depending on
your availability and scalability requirements.

### Health checks

We strongly recommend associating an [Elastic Load Balancer
(ELB)](https://aws.amazon.com/elasticloadbalancing/classicloadbalancer/) with your ZooKeeper cluster and configuring it
to perform TCP health checks on the ZooKeeper client port (2181 by default). The `zookeeper-cluster` module allows you
to associate an ELB with ZooKeeper, using the ELB's health checks to perform [zero-downtime
deployments](#rolling-deployments) (i.e., ensuring the previous node is passing health checks before deploying the next
one) and to detect when a server is down and needs to be automatically replaced.

Note that we do NOT recommend connecting to the ZooKeeper cluster via the ELB. That's because you access the ELB via
its domain name, and most ZooKeeper clients (including Kafka) cache DNS entries forever. So if the underlying IPs
stored in DNS for the ELB change (which could happen at any time!), the ZooKeeper clients own't find out about it until
after a restart. You should always connect directly to the ZooKeeper nodes themselves via their [static IP
addresses](#static-ips-and-enis).

Check out the [zookeeper-cluster example](https://github.com/gruntwork-io/terraform-aws-zookeeper/tree/main/examples/zookeeper-cluster) for working sample code that includes an ELB.

### Rolling deployments

To deploy updates to a ZooKeeper cluster, such as rolling out a new version of the AMI, you need to do the following:

1.  Shut down ZooKeeper on one server.
2.  Deploy the new code on the same server.
3.  Wait for the new code to come up successfully and start passing health checks.
4.  Repeat the process with the remaining servers.

This module can do this process for you automatically by using the [server-group
module's](https://github.com/gruntwork-io/terraform-aws-asg/tree/main/modules/server-group) support for [zero-downtime
rolling deployment](https://github.com/gruntwork-io/terraform-aws-asg/tree/main/modules/server-group#how-does-rolling-deployment-work).

### Static IPs and ENIs

To connect to ZooKeeper, either from other ZooKeeper servers, or from ZooKeeper clients such as Kafka, you need to
provide the list of IP addresses for your ZooKeeper servers. Most ZooKeeper clients read this list of IPs during boot
and never update it after. That means you need a static list of IP addresses for your ZooKeeper nodes.

This is a problem in a dynamic cloud environment, where any of the ZooKeeper nodes could be replaced (either due to an
outage or deployment) with a different server, with a different IP address, at any time. Using DNS doesn't help, as
most ZooKeeper clients (including Kafka!) cache DNS results forever, so if the underlying IPs stored in the DNS record
change, those clients won't find out about it until they are restarted.

Our solution is to use [Elastic Network Interface
(ENIs)](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-eni.html). An ENI is a static IP address that you can
attach to any server. This module creates an ENI for each ZooKeeper server and gives each (server, ENI) a matching
`eni-0` tag. You can use the [attach-eni
script](https://github.com/gruntwork-io/terraform-aws-server/tree/main/modules/attach-eni) in the [User
Data](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/user-data.html#user-data-api-cli) of each server to find an
ENI with a matching `eni-0` tag and attach it to the server during boot. That way, if a server goes down and is
replaced, its replacement reattaches the same ENI and gets the same IP address.

See [user-data.sh](https://github.com/gruntwork-io/terraform-aws-zookeeper/tree/main/examples/zookeeper-cluster/user-data/user-data.sh) for an example.

### Transaction logs and EBS Volumes

Every write to a ZooKeeper server is immediately persisted to disk for durability in ZooKeeper's *transaction log*.
We recommend using a separate [EBS Volume](https://aws.amazon.com/ebs/) to store these transaction logs. This ensures
the hard drive used for transaction logs does not have to contend with any other disk operations, which can
significantly [improve ZooKeeper
performance](https://zookeeper.apache.org/doc/r3.3.2/zookeeperAdmin.html#sc_advancedConfiguration).

This module creates an EBS Volume for each ZooKeeper server and gives each (server, EBS Volume) a matching
`ebs-volume-0` tag. You can use the [persistent-ebs-volume
module](https://github.com/gruntwork-io/terraform-aws-server/tree/main/modules/persistent-ebs-volume) in the [User
Data](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/user-data.html#user-data-api-cli) of each server to find an
EBS Volume with a matching `ebs-volume-0` tag and attach it to the server during boot. That way, if a server goes down
and is replaced, its replacement reattaches the same EBS Volume.

See [user-data.sh](https://github.com/gruntwork-io/terraform-aws-zookeeper/tree/main/examples/zookeeper-cluster/user-data/user-data.sh) for an example.

### Exhibitor

This module assumes that you are running an AMI with [Exhibitor](https://github.com/soabase/exhibitor/) installed.
Exhibitor performs several functions, including acting as a process supervisor for ZooKeeper and cleaning up old
transaction logs. ZooKeeper also exposes a UI you can use to see what's stored in and manage your ZooKeeper cluster.
By default, this UI is available at port 8080 of every ZooKeeper server. We also expose Exhibitor at port 80 via the
ELB used for [health checks](#health-checks) in the [zookeeper-cluster example](https://github.com/gruntwork-io/terraform-aws-zookeeper/tree/main/examples/zookeeper-cluster).

### Data backup

ZooKeeper's primary mechanism for backing up data is the replication within the cluster, since every node has a copy
of all the data. It is rare to backup data beyond that, as the type of data typically stored in ZooKeeper is ephemeral
in nature (e.g., the leader of a cluster), and it's unusual for older data to be of any use.

That said, if you need more backup, you can do so from the Exhibitor UI, which offers [Backup/Restore
functionality](https://github.com/soabase/exhibitor/wiki/Restore-UI) that allows you to index the ZooKeeper transaction
log and backup and restore specific transactions.




## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Required

<HclListItem name="allowed_client_port_inbound_cidr_blocks" requirement="required" type="list(string)">
<HclListItemDescription>

A list of CIDR-formatted IP address ranges that will be allowed to connect to <a href="#client_port"><code>client_port</code></a>

</HclListItemDescription>
</HclListItem>

<HclListItem name="allowed_client_port_inbound_security_group_ids" requirement="required" type="list(string)">
<HclListItemDescription>

A list of security group IDs that will be allowed to connect to <a href="#client_port"><code>client_port</code></a>

</HclListItemDescription>
</HclListItem>

<HclListItem name="allowed_exhibitor_port_inbound_cidr_blocks" requirement="required" type="list(string)">
<HclListItemDescription>

A list of CIDR-formatted IP address ranges that will be allowed to connect to <a href="#exhibitor_port"><code>exhibitor_port</code></a>

</HclListItemDescription>
</HclListItem>

<HclListItem name="allowed_exhibitor_port_inbound_security_group_ids" requirement="required" type="list(string)">
<HclListItemDescription>

A list of security group IDs that will be allowed to connect to <a href="#exhibitor_port"><code>exhibitor_port</code></a>

</HclListItemDescription>
</HclListItem>

<HclListItem name="allowed_health_check_port_inbound_cidr_blocks" requirement="required" type="list(string)">
<HclListItemDescription>

A list of CIDR-formatted IP address ranges that will be allowed to connect to <a href="#health_check_port"><code>health_check_port</code></a>

</HclListItemDescription>
</HclListItem>

<HclListItem name="allowed_health_check_port_inbound_security_group_ids" requirement="required" type="list(string)">
<HclListItemDescription>

A list of security group IDs that will be allowed to connect to <a href="#health_check_port"><code>health_check_port</code></a>

</HclListItemDescription>
</HclListItem>

<HclListItem name="ami_id" requirement="required" type="string">
<HclListItemDescription>

The ID of the AMI to run in this cluster. Should be an AMI that has ZooKeeper and Exhibitor installed by the install-zookeeper and install-exhibitor modules.

</HclListItemDescription>
</HclListItem>

<HclListItem name="aws_region" requirement="required" type="string">
<HclListItemDescription>

The AWS region to deploy into.

</HclListItemDescription>
</HclListItem>

<HclListItem name="cluster_name" requirement="required" type="string">
<HclListItemDescription>

The name of the ZooKeeper cluster (e.g. zookeeper-stage). This variable is used to namespace all resources created by this module.

</HclListItemDescription>
</HclListItem>

<HclListItem name="cluster_size" requirement="required" type="number">
<HclListItemDescription>

The number of nodes to have in the cluster. This MUST be set to an odd number! We strongly recommend setting this to 3, 5, or 7 for production usage.

</HclListItemDescription>
</HclListItem>

<HclListItem name="instance_type" requirement="required" type="string">
<HclListItemDescription>

The type of EC2 Instances to run for each node in the cluster (e.g. t2.micro).

</HclListItemDescription>
</HclListItem>

<HclListItem name="num_allowed_client_port_inbound_security_group_ids" requirement="required" type="number">
<HclListItemDescription>

The number of security group IDs in <a href="#allowed_client_port_inbound_security_group_ids"><code>allowed_client_port_inbound_security_group_ids</code></a>. We should be able to compute this automatically, but due to a Terraform limitation, we can't: https://github.com/hashicorp/terraform/issues/14677#issuecomment-302772685

</HclListItemDescription>
</HclListItem>

<HclListItem name="num_allowed_exhibitor_port_inbound_security_group_ids" requirement="required" type="number">
<HclListItemDescription>

The number of security group IDs in <a href="#allowed_exhibitor_port_inbound_security_group_ids"><code>allowed_exhibitor_port_inbound_security_group_ids</code></a>. We should be able to compute this automatically, but due to a Terraform limitation, we can't: https://github.com/hashicorp/terraform/issues/14677#issuecomment-302772685

</HclListItemDescription>
</HclListItem>

<HclListItem name="num_allowed_health_check_port_inbound_security_group_ids" requirement="required" type="number">
<HclListItemDescription>

The number of security group IDs in <a href="#allowed_health_check_port_inbound_security_group_ids"><code>allowed_health_check_port_inbound_security_group_ids</code></a>. We should be able to compute this automatically, but due to a Terraform limitation, we can't: https://github.com/hashicorp/terraform/issues/14677#issuecomment-302772685

</HclListItemDescription>
</HclListItem>

<HclListItem name="shared_config_s3_bucket_name" requirement="required" type="string">
<HclListItemDescription>

The name of the S3 bucket to create and use for storing the shared config for the ZooKeeper cluster.

</HclListItemDescription>
</HclListItem>

<HclListItem name="subnet_ids" requirement="required" type="list(string)">
<HclListItemDescription>

The subnet IDs into which the EC2 Instances should be deployed. You should typically pass in one subnet ID per node in the cluster_size variable. We strongly recommend that you run ZooKeeper in private subnets.

</HclListItemDescription>
</HclListItem>

<HclListItem name="user_data" requirement="required" type="string">
<HclListItemDescription>

A User Data script to execute while the server is booting. We remmend passing in a bash script that executes the run-exhibitor script, which should have been installed in the AMI by the install-exhibitor module.

</HclListItemDescription>
</HclListItem>

<HclListItem name="vpc_id" requirement="required" type="string">
<HclListItemDescription>

The ID of the VPC in which to deploy the cluster

</HclListItemDescription>
</HclListItem>

### Optional

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

If set to true, associate a public IP address with each EC2 Instance in the cluster. We strongly recommend against making ZooKeeper nodes publicly accessible.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="client_port" requirement="optional" type="number">
<HclListItemDescription>

The port clients use to connect to ZooKeeper

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="2181"/>
</HclListItem>

<HclListItem name="connect_port" requirement="optional" type="number">
<HclListItemDescription>

The port ZooKeeper nodes use to connect to other ZooKeeper nodes

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="2888"/>
</HclListItem>

<HclListItem name="custom_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

Custom tags to apply to the ZooKeeper nodes and all related resources (i.e., security groups, EBS Volumes, ENIs).

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="deployment_batch_size" requirement="optional" type="number">
<HclListItemDescription>

How many servers to deploy at a time during a rolling deployment. For example, if you have 10 servers and set this variable to 2, then the deployment will a) undeploy 2 servers, b) deploy 2 replacement servers, c) repeat the process for the next 2 servers. For ZooKeeper in production, we STRONGLY recommend keeping this at 1.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="1"/>
</HclListItem>

<HclListItem name="deployment_health_check_max_retries" requirement="optional" type="number">
<HclListItemDescription>

The maximum number of times to retry the Load Balancer's Health Check before giving up on the rolling deployment. After this number is hit, the Python script will cease checking the failed EC2 Instance deployment but continue with other EC2 Instance deployments.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="360"/>
</HclListItem>

<HclListItem name="dns_name_common_portion" requirement="optional">
<HclListItemDescription>

The common portion of the DNS name to assign to each ENI in the zookeeper server group. For example, if confluent.acme.com, this module will create DNS records 0.confluent.acme.com, 1.confluent.acme.com, etc. Note that this value must be a valid record name for the Route 53 Hosted Zone ID specified in <a href="#route53_hosted_zone_id"><code>route53_hosted_zone_id</code></a>.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;&quot;"/>
</HclListItem>

<HclListItem name="dns_names" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of DNS names to assign to the ENIs in the zookeeper server group. Make sure the list has n entries, where n = <a href="#cluster_size"><code>cluster_size</code></a>. If this var is specified, it will override <a href="#dns_name_common_portion"><code>dns_name_common_portion</code></a>. Example: [0.acme.com, 1.acme.com, 2.acme.com]. Note that the list entries must be valid records for the Route 53 Hosted Zone ID specified in <a href="#route53_hosted_zone_id"><code>route53_hosted_zone_id</code></a>.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="dns_ttl" requirement="optional">
<HclListItemDescription>

The TTL (Time to Live) to apply to any DNS records created by this module.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="300"/>
</HclListItem>

<HclListItem name="ebs_volumes" requirement="optional" type="list(object(…))">
<HclListItemDescription>

A list that defines the EBS Volumes to create for each server. Each item in the list should be a map that contains the keys 'type' (one of standard, gp2, or io1), 'size' (in GB), and 'encrypted' (true or false). We recommend attaching an EBS Volume to ZooKeeper to use for transaction logs.

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
  },
  {
    encrypted = true,
    size = 50,
    type = "gp2"
  }
]
```

</HclListItemDefaultValue>
</HclListItem>

<HclListItem name="elb_names" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of Elastic Load Balancer (ELB) names to associate with the ZooKeeper nodes. We recommend using an ALB or ELB for health checks. If you're using an Application Load Balancer (ALB), use <a href="#target_group_arns"><code>target_group_arns</code></a> instead.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="elections_port" requirement="optional" type="number">
<HclListItemDescription>

The port ZooKeeper nodes use to connect to other ZooKeeper nodes during leader elections

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="3888"/>
</HclListItem>

<HclListItem name="enable_detailed_monitoring" requirement="optional" type="bool">
<HclListItemDescription>

Enable detailed CloudWatch monitoring for the servers. This gives you more granularity with your CloudWatch metrics, but also costs more money.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="enable_elastic_ips" requirement="optional">
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

<HclListItem name="exhibitor_port" requirement="optional" type="number">
<HclListItemDescription>

The port Exhibitor uses for its Control Panel UI

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="8080"/>
</HclListItem>

<HclListItem name="force_destroy_shared_config_s3_bucket" requirement="optional" type="bool">
<HclListItemDescription>

If you set this to true, when you run terraform destroy, this tells Terraform to delete all the objects in the S3 bucket used for shared config storage. You should NOT set this to true in production! This property is only here so automated tests can clean up after themselves.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="health_check_grace_period" requirement="optional" type="number">
<HclListItemDescription>

Time, in seconds, after instance comes into service before checking health. For CentOS servers, we have observed slower overall boot time and recommend a value of 600.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="300"/>
</HclListItem>

<HclListItem name="health_check_port" requirement="optional" type="number">
<HclListItemDescription>

The port Health Check uses for incoming requests

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="5000"/>
</HclListItem>

<HclListItem name="health_check_type" requirement="optional" type="string">
<HclListItemDescription>

Controls how health checking is done. Must be one of EC2 or ELB.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;EC2&quot;"/>
</HclListItem>

<HclListItem name="root_block_device_encrypted" requirement="optional" type="bool">
<HclListItemDescription>

Whether the root volume should be encrypted.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
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
<HclListItemDefaultValue defaultValue="&quot;standard&quot;"/>
</HclListItem>

<HclListItem name="route53_hosted_zone_id" requirement="optional">
<HclListItemDescription>

The ID of the Route53 Hosted Zone in which we will create the DNS records specified by <a href="#dns_names"><code>dns_names</code></a>. Must be non-empty if <a href="#dns_name_common_portion"><code>dns_name_common_portion</code></a> or <a href="#dns_names"><code>dns_names</code></a> is non-empty.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;&quot;"/>
</HclListItem>

<HclListItem name="script_log_level" requirement="optional" type="string">
<HclListItemDescription>

The log level to use with the rolling deploy script. It can be useful to set this to DEBUG when troubleshooting the script.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;INFO&quot;"/>
</HclListItem>

<HclListItem name="shared_config_s3_bucket_kms_key_arn" requirement="optional" type="string">
<HclListItemDescription>

The Amazon Resource Name (ARN) of the KMS Key that will be used to encrypt/decrypt shared config files in the S3 bucket. The default value of null will use the managed aws/s3 key.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
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

A list of target group ARNs of Application Load Balanacer (ALB) targets to associate with ZooKeeper nodes. We recommend using an ALB or ELB for health checks. If you're using a Elastic Load Balancer (AKA ELB Classic), use <a href="#elb_names"><code>elb_names</code></a> instead.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="tenancy" requirement="optional" type="string">
<HclListItemDescription>

The tenancy of the instance. Must be one of: default or dedicated.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;default&quot;"/>
</HclListItem>

<HclListItem name="wait_for" requirement="optional" type="string">
<HclListItemDescription>

By passing a value to this variable, you can effectively tell this module to wait to deploy until the given variable's value is resolved, which is a way to require that this module depend on some other module. Note that the actual value of this variable doesn't matter.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;&quot;"/>
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

<HclListItem name="ebs_volume_ids">
</HclListItem>

<HclListItem name="iam_role_arn">
</HclListItem>

<HclListItem name="iam_role_id">
</HclListItem>

<HclListItem name="private_ips">
</HclListItem>

<HclListItem name="rolling_deployment_done">
<HclListItemDescription>

Other modules can depend on this variable to ensure those modules only deploy after this module is done deploying. Note that the actual value of this output can be ignored.

</HclListItemDescription>
</HclListItem>

<HclListItem name="security_group_id">
</HclListItem>

<HclListItem name="shared_config_s3_bucket_arn">
</HclListItem>

</TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-zookeeper/tree/modules/zookeeper-cluster/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-zookeeper/tree/modules/zookeeper-cluster/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-zookeeper/tree/modules/zookeeper-cluster/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "6dc5d623684bc965f5fd0714543fa2f9"
}
##DOCS-SOURCER-END -->

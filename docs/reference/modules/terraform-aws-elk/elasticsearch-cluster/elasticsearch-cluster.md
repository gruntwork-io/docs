---
title: "Elasticsearch Cluster"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem} from '../../../../../src/components/HclListItem.tsx';

<a href="https://github.com/gruntwork-io/terraform-aws-elk/tree/master/modules%2Felasticsearch-cluster" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-elk/releases?q=" className="link-button" title="Release notes for only the service catalog versions which impacted this service.">Release Notes</a>

# Elasticsearch Cluster

This folder contains a [Terraform](https://www.terraform.io/) module to deploy an [Elasticsearch](https://www.elastic.co/products/elasticsearch) cluster in [AWS](https://aws.amazon.com/) on top of an Auto Scaling Group.
The idea is to create an [Amazon Machine Image (AMI)](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AMIs.html)
that has Elasticsearch installed using the [install-elasticsearch](https://github.com/gruntwork-io/terraform-aws-elk/tree/master/modules/install-elasticsearch) module.

In a non-production setting, you can install Elasticsearch tools such as [Kibana](https://www.elastic.co/products/kibana)
and [ElastAlert](https://github.com/Yelp/elastalert) on the same AMI. In a production setting, Elasticsearch should
be the sole service running on each Elasticsearch node.

## How do you connect to the Elasticsearch cluster?

### Connecting to Elasticsearch via Official Elasticsearch Clients

The preferred way to connect to Elasticsearch is to use one of the [official Elasticsearch clients](https://www.elastic.co/guide/en/elasticsearch/client/index.html). All official Elasticsearch clients are designed to
discover multiple Elasticsearch nodes and distribute reuqests across the various nodes.

Therefore, using a Load Balancer to talk to Elasticsearch APIs (e.g., via an SDK) is NOT recommended, so you will need
to get the IPs of the individual nodes and connect to them directly. Since those nodes run in an Auto Scaling Group (ASG)
where servers can be added/replaced/removed at any time, you can't get their IP addresses from Terraform. Instead, you'll
need to look up the IPs using the AWS APIs.

The easiest way to do that is to use the AWS SDK to look up the servers using EC2 Tags. Each server deployed by
the `elasticsearch-cluster` module has its `Name` and `aws:autoscaling:groupName` tag set to the value you pass in via the
`cluster_name` parameter. You can also specify custom tags via the `tags` parameter. You can use the AWS SDK to find
the IPs of all servers with those tags.

For example, using the [AWS CLI](https://aws.amazon.com/cli/), you can get the IPs for servers in `us-east-1` with
the tag `Name=elasticsearch-example` as follows:

```bash
aws ec2 describe-instances \
    --region "us-east-1" \
    --filter \
      "Name=tag:Name,Values=elasticsearch-example" \
      "Name=instance-state-name,Values=running"
```

This will return a bunch of JSON that contains the IPs of the servers. You can then use the [Elasticsearch client](https://www.elastic.co/guide/en/elasticsearch/client/index.html) for your programming language to connect
to these IPs.

### Connecting via the REST API

Elasticsearch exposes a RESTful API that you can directly access using `curl` or any other programming language feature
that makes HTTP requests.

## What's included in this module?

This module creates the following:

*   [Auto Scaling Group](#auto-scaling-group)
*   [Load Balancer](#load-balancer)
*   [Security Group](#security-group)
*   [IAM Role and Permissions](#iam-role-and-permissions)

### What's Not Included

*   [EBS Volumes](#ebs-volumes)

### Auto Scaling Group

This module runs Elasticsearch on top of an [Auto Scaling Group (ASG)](https://aws.amazon.com/autoscaling/). Typically,
you should run the ASG with multiple Instances spread across multiple [Availability
Zones](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-regions-availability-zones.html). Each of the EC2
Instances should be running an AMI that has Elasticsearch and optional Elasticsearch tools installed via the
[install-elasticsearch](https://github.com/gruntwork-io/terraform-aws-elk/tree/master/modules/install-elasticsearch), [install-elastalert](https://github.com/gruntwork-io/terraform-aws-elk/tree/master/modules/install-elastalert), [install-kibana](https://github.com/gruntwork-io/terraform-aws-elk/tree/master/modules/install-kibana), and [install-logstash](https://github.com/gruntwork-io/terraform-aws-elk/tree/master/modules/install-logstash) scripts. You pass in the ID of the AMI to
run using the `ami_id` input parameter.

### Load Balancer

We use a [Network Load Balancer](https://docs.aws.amazon.com/elasticloadbalancing/latest/network/introduction.html) (1)
so that we can perform ongoing health checks on each Elasticsearch node, and (2) so that Kibana can be accessed via a
single endpoint which will forward to a live Kibana endpoint at random.

Note that we do not need a Load Balancer to distribute traffic to Elasticsearch because all the  [official
Elasticsearch clients](https://www.elastic.co/guide/en/elasticsearch/client/index.html) are designed to discover all
Elasticsearch nodes and distribute requests across the cluster. Using a Load Balancer for this reason would duplicate
functionality Elasticsearch clients already give us.

### Security Group

Each EC2 Instance in the ASG has a Security Group that allows minimal connectivity:

*   All outbound requests
*   Inbound SSH access from the CIDR blocks and security groups you specify

The ID of the security group is exported as an output variable, which you can use with the [elasticsearch-security-group-rules](https://github.com/gruntwork-io/terraform-aws-elk/tree/master/modules/elasticsearch-security-group-rules), [elastalert-security-group-rules](https://github.com/gruntwork-io/terraform-aws-elk/tree/master/modules/elastalert-security-group-rules),
[kibana-security-group-rules](https://github.com/gruntwork-io/terraform-aws-elk/tree/master/modules/kibana-security-group-rules), and [logstash-security-group-rules](https://github.com/gruntwork-io/terraform-aws-elk/tree/master/modules/logstash-security-group-rules)  modules to open up all the ports necessary for Elasticsearch and the respective
Elasticsearch tools.

Check out the [Security section](#security) for more details.

### IAM Role and Permissions

Each EC2 Instance in the ASG has an [IAM Role](http://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles.html) attached.
The IAM Role ARN and ID are exported as output variables if you need to add additional permissions.

### EBS Volumes

Note that we do not use [EBS Volumes](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/EBSVolumes.html), which are
AWS's ultra-low-latency network-attached storage. Instead, per [Elasticsearch docs on AWS Best Practices](https://www.elastic.co/guide/en/elasticsearch/plugins/current/cloud-aws-best-practices.html), we exclusively use [Instance
Stores](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/InstanceStorage.html).

Instance Stores have the major disadvantage that they do not survive the termination of an EC2 Instance. That is, when
an EC2 Instance dies, all the data on an Instance Store dies with it and is unrecoverable. But Elasticsearch already has
built in support for [replica shards](https://www.elastic.co/guide/en/elasticsearch/guide/current/replica-shards.html),
so we already have redundancy available to us if an EC2 Instance should fail.

This enables us to take advantage of the benefits of Instance Stores, which are that they are significantly faster
because I/O traffic is now all local. By contrast, I/O traffic with EBS Volumes must traverse the (admittedly ultra low-
latency) network and are therefore much slower.

## How do you roll out updates?

If you want to deploy a new version of Elasticsearch across the cluster, the best way to do that is to:

1.  Rolling deploy:
    1.  Build a new AMI.
    2.  Set the `ami_id` parameter to the ID of the new AMI.
    3.  Run `terraform apply`.
    4.  Because the [elasticsearch-cluster module](https://github.com/gruntwork-io/terraform-aws-elk/tree/master/modules/elasticsearch-cluster) uses the Gruntwork [server-group](https://github.com/gruntwork-io/terraform-aws-asg/tree/main/modules/server-group) modules under the hood, running
        `terraform apply` will automatically perform a zero-downtime rolling deployment. Specifically, one EC2 Instance at a time will be terminated, a new EC2 Instance will spawn in its place, and only once the new EC2 Instance passes the Load
        Balancer Health Checks will the next EC2 Instance be rolled out.

        Note that there will be a brief period of time during which EC2 Instances based on both the old `ami_id` and
        new `ami_id` will be running. [Rolling upgrades docs](https://www.elastic.co/guide/en/elasticsearch/reference/current/rolling-upgrades.html)
        suggest that this is acceptable for Elasticsearch version 5.6 and greater.

        TODO: Add support for automatically disabling shard allocation and performing a synced flush on an Elasticsearch
        node prior to terminating it ([docs](https://www.elastic.co/guide/en/elasticsearch/reference/current/rolling-upgrades.html)).

2.  New cluster:
    1.  Build a new AMI.
    2.  Create a totally new ASG using the `elasticsearch-cluster` module with the `ami_id` set to the new AMI, but all
        other parameters the same as the old cluster.
    3.  Wait for all the nodes in the new ASG to join the cluster and catch up on replication.
    4.  Remove each of the nodes from the old cluster.
    5.  Remove the old ASG by removing that `elasticsearch-cluster` module from your code.

## Security

Here are some of the main security considerations to keep in mind when using this module:

1.  [Encryption in transit](#encryption-in-transit)
2.  [Encryption at rest](#encryption-at-rest)
3.  [Dedicated instances](#dedicated-instances)
4.  [Security groups](#security-groups)
5.  [SSH access](#ssh-access)

### Encryption in transit

Elasticsearch can encrypt all of its network traffic. TODO: Should we recommend using X-Pack (official solution, but
paid), an Nginx Reverse Proxy, a custom Elasticsearch plugin, or something else?

### Encryption at rest

#### EC2 Instance Storage

The EC2 Instances in the cluster store their data in an [EC2 Instance Store](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/InstanceStorage.html), which does not have native suport for
encryption (unlike [EBS Volume Encryption](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/EBSEncryption.html)).

TODO: Should we implement encryption at rest uising the technique described at https://aws.amazon.com/blogs/security/how-to-protect-data-at-rest-with-amazon-ec2-instance-store-encryption/?

#### Elasticsearch Keystore

Some Elasticsearch settings may contain secrets and should be encrypted. You can use the [Elasticsearch Keystore](https://www.elastic.co/guide/en/elasticsearch/reference/current/secure-settings.html) for such settings. The
`elasticsearch.keystore` is created automatically upon boot of each node, and is available for use as described in the
docs.

### Dedicated instances

If you wish to use dedicated instances, you can set the `tenancy` parameter to `"dedicated"` in this module.

### Security groups

This module attaches a security group to each EC2 Instance that allows inbound requests as follows:

*   **SSH**: For the SSH port (default: 22), you can use the `allowed_ssh_cidr_blocks` parameter to control the list of\
    [CIDR blocks](https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing) that will be allowed access. You can use
    the `allowed_inbound_ssh_security_group_ids` parameter to control the list of source Security Groups that will be
    allowed access.

    The ID of the security group is exported as an output variable, which you can use with the [elasticsearch-security-group-rules](https://github.com/gruntwork-io/terraform-aws-elk/tree/master/modules/elasticsearch-security-group-rules), [elastalert-security-group-rules](https://github.com/gruntwork-io/terraform-aws-elk/tree/master/modules/elastalert-security-group-rules),
    [kibana-security-group-rules](https://github.com/gruntwork-io/terraform-aws-elk/tree/master/modules/kibana-security-group-rules), and [logstash-security-group-rules](https://github.com/gruntwork-io/terraform-aws-elk/tree/master/modules/logstash-security-group-rules)  modules to open up all the ports necessary for Elasticsearch and the respective
    Elasticsearch tools.

### SSH access

You can associate an [EC2 Key Pair](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-key-pairs.html) with each
of the EC2 Instances in this cluster by specifying the Key Pair's name in the `ssh_key_name` variable. If you don't
want to associate a Key Pair with these servers, set `ssh_key_name` to an empty string.




## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Required

<HclListItem name="aws_region" requirement="required" type="string">
<HclListItemDescription>

The AWS region in which all resources will be created

</HclListItemDescription>
</HclListItem>

<HclListItem name="vpc_id" requirement="required" type="string">
<HclListItemDescription>

The id of the vpc into which we will deploy Elasticsearch

</HclListItemDescription>
</HclListItem>

<HclListItem name="subnet_ids" requirement="required" type="list(string)">
<HclListItemDescription>

The ids of the subnets 

</HclListItemDescription>
</HclListItem>

<HclListItem name="ami_id" requirement="required" type="string">
<HclListItemDescription>

The AMI id of our custom AMI with Elasticsearch installed

</HclListItemDescription>
</HclListItem>

<HclListItem name="elasticsearch_cluster_name" requirement="required" type="string">
<HclListItemDescription>

The name you want to give to this Elasticsearch cluster

</HclListItemDescription>
</HclListItem>

<HclListItem name="instance_type" requirement="required" type="string">
<HclListItemDescription>

The instance type for each of the cluster members. eg: t2.micro

</HclListItemDescription>
</HclListItem>

<HclListItem name="cluster_size" requirement="required" type="number">
<HclListItemDescription>

The number of nodes this cluster should have

</HclListItemDescription>
</HclListItem>

### Optional

<HclListItem name="alowable_ssh_cidr_blocks" requirement="optional" type="list(string)">
<HclListItemDescription>

The CIDR blocks from which SSH connections will be allowed

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="allowed_cidr_blocks" requirement="optional" type="list(string)">
<HclListItemDescription>

The CIDR blocks from which we can connect to nodes of this cluster

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="allowed_ssh_security_group_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of security group IDs from which the EC2 Instances will allow SSH connections

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="allow_api_from_security_group_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The IDs of security groups from which ES API connections will be allowed. If you update this variable, make sure to update <a href="#num_api_security_group_ids"><code>num_api_security_group_ids</code></a> too!

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="num_api_security_group_ids" requirement="optional" type="number">
<HclListItemDescription>

The number of security group IDs in <a href="#allow_api_from_security_group_ids"><code>allow_api_from_security_group_ids</code></a>. We should be able to compute this automatically, but due to a Terraform limitation, if there are any dynamic resources in <a href="#allow_api_from_security_group_ids"><code>allow_api_from_security_group_ids</code></a>, then we won't be able to: https://github.com/hashicorp/terraform/pull/11482

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="0"/>
</HclListItem>

<HclListItem name="allow_node_discovery_from_security_group_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The IDs of security groups from which ES API connections will be allowed. If you update this variable, make sure to update <a href="#num_node_discovery_security_group_ids"><code>num_node_discovery_security_group_ids</code></a> too!

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="num_node_discovery_security_group_ids" requirement="optional" type="number">
<HclListItemDescription>

The number of security group IDs in <a href="#allow_node_discovery_from_security_group_ids"><code>allow_node_discovery_from_security_group_ids</code></a>. We should be able to compute this automatically, but due to a Terraform limitation, if there are any dynamic resources in <a href="#allow_node_discovery_from_security_group_ids"><code>allow_node_discovery_from_security_group_ids</code></a>, then we won't be able to: https://github.com/hashicorp/terraform/pull/11482

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="0"/>
</HclListItem>

<HclListItem name="target_group_arns" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of target group ARNs to associate with the Elasticsearch cluster.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="skip_rolling_deploy" requirement="optional" type="bool">
<HclListItemDescription>

If set to true, skip the rolling deployment, and destroy all the servers immediately. You should typically NOT enable this in prod, as it will cause downtime! The main use case for this flag is to make testing and cleanup easier. It can also be handy in case the rolling deployment code has a bug.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="num_enis_per_node" requirement="optional" type="number">
<HclListItemDescription>

The number of ENIs each node in this cluster should have.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="1"/>
</HclListItem>

<HclListItem name="key_name" requirement="optional" type="string">
<HclListItemDescription>

The name of the Amazon EC2 Key Pair you wish to use for accessing this instance. See https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-key-pairs.html?icmpid=docs_ec2_console#having-ec2-create-your-key-pair

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="user_data" requirement="optional" type="string">
<HclListItemDescription>

The User Data script to run on each server when it is booting.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="api_port" requirement="optional" type="number">
<HclListItemDescription>

This is the port that is used to access elasticsearch for user queries

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="9200"/>
</HclListItem>

<HclListItem name="backup_bucket_arn" requirement="optional" type="string">
<HclListItemDescription>

A list of Amazon S3 bucket ARNs to grant the Elasticsearch instances access to

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;*&quot;"/>
</HclListItem>

<HclListItem name="node_discovery_port" requirement="optional" type="number">
<HclListItemDescription>

This is the port that is used internally by elasticsearch for cluster node discovery

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="9300"/>
</HclListItem>

<HclListItem name="tags" requirement="optional" type="map(string)">
<HclListItemDescription>

A map of key value pairs that represent custom tags to propagate to the resources that correspond to this ElasticSearch cluster.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
<HclGeneralListItem title="Examples">
<details>
  <summary>Example</summary>


```hcl

   Example:
  
   default = {
     foo = "bar"
   }

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="ebs_volumes" requirement="optional" type="list(object(…))">
<HclListItemDescription>

A list that defines the EBS Volumes to create for each server. Each item in the list should be a map that contains the keys 'type' (one of standard, gp2, or io1), 'size' (in GB), and 'encrypted' (true or false). Each EBS Volume and server pair will get matching tags with a name of the format ebs-volume-xxx, where xxx is the index of the EBS Volume (e.g., ebs-volume-0, ebs-volume-1, etc). These tags can be used by each server to find and mount its EBS Volume(s).

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
<HclListItemDefaultValue defaultValue="[]"/>
<HclGeneralListItem title="Examples">
<details>
  <summary>Example</summary>


```hcl

   Example:
   default = [
     {
       type      = "standard"
       size      = 100
       encrypted = false
     },
     {
       type      = "gp2"
       size      = 300
       encrypted = true
     }
   ]

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="ebs_optimized" requirement="optional" type="bool">
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

Whether the volume should be destroyed on instance termination.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="eni_private_ips">
</HclListItem>

<HclListItem name="eni_elastic_ips">
</HclListItem>

<HclListItem name="server_asg_names">
</HclListItem>

<HclListItem name="security_group_id">
</HclListItem>

<HclListItem name="iam_role_id">
</HclListItem>

</TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-elk/tree/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-elk/tree/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-elk/tree/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "9af51cbd186e3a583f0a583a153eaefb"
}
##DOCS-SOURCER-END -->

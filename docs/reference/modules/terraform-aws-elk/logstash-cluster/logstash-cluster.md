---
title: "Logstash Cluster"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';

<a href="https://github.com/gruntwork-io/terraform-aws-elk/tree/master/modules%2Flogstash-cluster" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-elk/releases?q=" className="link-button" title="Release notes for only the service catalog versions which impacted this service.">Release Notes</a>

# Logstash Cluster

This folder contains a [Terraform](https://www.terraform.io/) module to deploy an [Logstash](https://www.elastic.co/products/logstash) cluster in [AWS](https://aws.amazon.com/) on top of an Auto Scaling Group.
The idea is to create an [Amazon Machine Image (AMI)](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AMIs.html)
that has Logstash installed using the [install-logstash](https://github.com/gruntwork-io/terraform-aws-elk/tree/master/modules/install-logstash) modules.

## What's included in this module?

This module creates the following:

*   [Auto Scaling Group](#auto-scaling-group)
*   [Load Balancer](#load-balancer)
*   [Security Group](#security-group)

### Auto Scaling Group

This module runs Logstash on top of an [Auto Scaling Group (ASG)](https://aws.amazon.com/autoscaling/). Typically,
you should run the ASG with multiple Instances spread across multiple [Availability
Zones](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-regions-availability-zones.html). Each of the EC2
Instances should be running an AMI that has Logstash installed via the [install-logstash](https://github.com/gruntwork-io/terraform-aws-elk/tree/master/modules/install-logstash) script.
You pass in the ID of the AMI to run using the `ami_id` input parameter.

### Load Balancer

We use a [Network Load Balancer](https://docs.aws.amazon.com/elasticloadbalancing/latest/network/introduction.html) (1)
so that we can perform ongoing health checks on each Logstash node, and (2) so that Filebeat can access the Logstash cluster
via a single endpoint which will forward to a live Kibana endpoint at random.

### Security Group

Each EC2 Instance in the ASG has a Security Group that allows minimal connectivity:

*   All outbound requests
*   Inbound SSH access from the CIDR blocks and security groups you specify

The ID of the security group is exported as an output variable, which you can use with the [logstash-security-group-rules](https://github.com/gruntwork-io/terraform-aws-elk/tree/master/modules/logstash-security-group-rules) module to open up all the ports necessary for Logstash.

Check out the [Security section](#security) for more details.

## How do you roll out updates?

If you want to deploy a new version of Logstash across the cluster, the best way to do that is to:

1.  Rolling deploy:
    1.  Build a new AMI.
    2.  Set the `ami_id` parameter to the ID of the new AMI.
    3.  Run `terraform apply`.
    4.  Because the [logstash-cluster module](https://github.com/gruntwork-io/terraform-aws-elk/tree/master/modules/logstash-cluster) uses the Gruntwork [server-group](https://github.com/gruntwork-io/terraform-aws-asg/tree/main/modules/server-group) modules under the hood, running
        `terraform apply` will automatically perform a zero-downtime rolling deployment. Specifically, one EC2 Instance at a time will be terminated, a new EC2 Instance will spawn in its place, and only once the new EC2 Instance passes the Load
        Balancer Health Checks will the next EC2 Instance be rolled out.

        Note that there will be a brief period of time during which EC2 Instances based on both the old `ami_id` and
        new `ami_id` will be running.

2.  New cluster:
    1.  Build a new AMI.
    2.  Create a totally new ASG using the `logstash-cluster` module with the `ami_id` set to the new AMI, but all
        other parameters the same as the old cluster.
    3.  Wait for all the nodes in the new ASG to join the cluster and catch up on replication.
    4.  Remove each of the nodes from the old cluster.
    5.  Remove the old ASG by removing that `logstash-cluster` module from your code.

## Security

Here are some of the main security considerations to keep in mind when using this module:

1.  [Security groups](#security-groups)
2.  [SSH access](#ssh-access)

### Security groups

This module attaches a security group to each EC2 Instance that allows inbound requests as follows:

*   **SSH**: For the SSH port (default: 22), you can use the `allowed_ssh_cidr_blocks` parameter to control the list of\
    [CIDR blocks](https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing) that will be allowed access. You can use
    the `allowed_inbound_ssh_security_group_ids` parameter to control the list of source Security Groups that will be
    allowed access.

    The ID of the security group is exported as an output variable, which you can use with the [logstash-security-group-rules](https://github.com/gruntwork-io/terraform-aws-elk/tree/master/modules/logstash-security-group-rules) modules to open up all the ports necessary for Logstash and the respective.

### SSH access

You can associate an [EC2 Key Pair](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-key-pairs.html) with each
of the EC2 Instances in this cluster by specifying the Key Pair's name in the `ssh_key_name` variable. If you don't
want to associate a Key Pair with these servers, set `ssh_key_name` to an empty string.




## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Required

<HclListItem name="ami_id" requirement="required" type="string">
<HclListItemDescription>

The ID of the AMI to run in this cluster.

</HclListItemDescription>
</HclListItem>

<HclListItem name="aws_region" requirement="required" type="string">
<HclListItemDescription>

The AWS region the cluster will be deployed in.

</HclListItemDescription>
</HclListItem>

<HclListItem name="cluster_name" requirement="required" type="string">
<HclListItemDescription>

The name of the Logstash cluster (e.g. logstash-stage). This variable is used to namespace all resources created by this module.

</HclListItemDescription>
</HclListItem>

<HclListItem name="instance_type" requirement="required" type="string">
<HclListItemDescription>

The type of EC2 Instances to run for each node in the cluster (e.g. t2.micro).

</HclListItemDescription>
</HclListItem>

<HclListItem name="lb_target_group_arns" requirement="required" type="list(string)">
<HclListItemDescription>

The ALB taget groups with which to associate instances in this server group

</HclListItemDescription>
</HclListItem>

<HclListItem name="size" requirement="required" type="number">
<HclListItemDescription>

The number of nodes to have in the Logstash cluster.

</HclListItemDescription>
</HclListItem>

<HclListItem name="subnet_ids" requirement="required" type="list(string)">
<HclListItemDescription>

The subnet IDs into which the EC2 Instances should be deployed.

</HclListItemDescription>
</HclListItem>

<HclListItem name="user_data" requirement="required" type="string">
<HclListItemDescription>

A User Data script to execute while the server is booting.

</HclListItemDescription>
</HclListItem>

<HclListItem name="vpc_id" requirement="required" type="string">
<HclListItemDescription>

The ID of the VPC in which to deploy the Logstash cluster

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

If set to true, associate a public IP address with each EC2 Instance in the cluster.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="beats_port_cidr_blocks" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of IP address ranges in CIDR format from which access to the Filebeat port will be allowed

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="beats_port_security_groups" requirement="optional" type="list(string)">
<HclListItemDescription>

The list of Security Group IDs from which to allow connections to the beats_port. If you update this variable, make sure to update <a href="#num_beats_port_security_groups"><code>num_beats_port_security_groups</code></a> too!

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="collectd_port" requirement="optional" type="number">
<HclListItemDescription>

The port on which CollectD will communicate with the Logstash cluster

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="8080"/>
</HclListItem>

<HclListItem name="collectd_port_cidr_blocks" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of IP address ranges in CIDR format from which access to the Collectd port will be allowed

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="collectd_port_security_groups" requirement="optional" type="list(string)">
<HclListItemDescription>

The list of Security Group IDs from which to allow connections to the collectd_port. If you update this variable, make sure to update <a href="#num_collectd_port_security_groups"><code>num_collectd_port_security_groups</code></a> too!

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="ebs_optimized" requirement="optional" type="bool">
<HclListItemDescription>

If true, the launched EC2 instance will be EBS-optimized.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
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

<HclListItem name="filebeat_port" requirement="optional" type="number">
<HclListItemDescription>

The port on which Filebeat will communicate with the Logstash cluster

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="5044"/>
</HclListItem>

<HclListItem name="health_check_grace_period" requirement="optional" type="number">
<HclListItemDescription>

Time, in seconds, after instance comes into service before checking health.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="600"/>
</HclListItem>

<HclListItem name="health_check_type" requirement="optional" type="string">
<HclListItemDescription>

The type of health check to use. Must be one of: EC2 or ELB. If you associate any load balancers with this server group via <a href="#elb_names"><code>elb_names</code></a> or <a href="#alb_target_group_arns"><code>alb_target_group_arns</code></a>, you should typically set this parameter to ELB.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;EC2&quot;"/>
</HclListItem>

<HclListItem name="num_beats_port_security_groups" requirement="optional" type="number">
<HclListItemDescription>

The number of security group IDs in <a href="#beats_port_security_groups"><code>beats_port_security_groups</code></a>. We should be able to compute this automatically, but due to a Terraform limitation, if there are any dynamic resources in <a href="#beats_port_security_groups"><code>beats_port_security_groups</code></a>, then we won't be able to: https://github.com/hashicorp/terraform/pull/11482

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="0"/>
</HclListItem>

<HclListItem name="num_collectd_port_security_groups" requirement="optional" type="number">
<HclListItemDescription>

The number of security group IDs in <a href="#collectd_port_security_groups"><code>collectd_port_security_groups</code></a>. We should be able to compute this automatically, but due to a Terraform limitation, if there are any dynamic resources in <a href="#collectd_port_security_groups"><code>collectd_port_security_groups</code></a>, then we won't be able to: https://github.com/hashicorp/terraform/pull/11482

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="0"/>
</HclListItem>

<HclListItem name="root_volume_delete_on_termination" requirement="optional" type="bool">
<HclListItemDescription>

Whether the volume should be destroyed on instance termination.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
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

<HclListItem name="tags" requirement="optional" type="map(string)">
<HclListItemDescription>

A map of key value pairs that represent custom tags to propagate to the resources that correspond to this logstash cluster.

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

<HclListItem name="wait_for_capacity_timeout" requirement="optional" type="string">
<HclListItemDescription>

A maximum duration that Terraform should wait for ASG instances to be healthy before timing out. Setting this to '0' causes Terraform to skip all Capacity Waiting behavior.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;10m&quot;"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="iam_role_id">
</HclListItem>

<HclListItem name="security_group_id">
</HclListItem>

<HclListItem name="server_asg_names">
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
  "hash": "e7e9d3a79f368a82fb23509f07931d85"
}
##DOCS-SOURCER-END -->

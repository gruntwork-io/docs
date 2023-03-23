---
title: "TODO TODO TODO ABOVE HERE NEEDS TO CHECKED/IMPLEMENTED"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="ELK AWS Module" version="0.11.1" lastModifiedVersion="0.11.0"/>

# TODO TODO TODO ABOVE HERE NEEDS TO CHECKED/IMPLEMENTED

<a href="https://github.com/gruntwork-io/terraform-aws-elk/tree/master/modules/kibana-cluster" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-elk/releases/tag/v0.11.0" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

### Security groups

This module attaches a security group to each EC2 Instance that allows inbound requests as follows:

*   **SSH**: For the SSH port (default: 22), you can use the `allowed_ssh_cidr_blocks` parameter to control the list of\
    [CIDR blocks](https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing) that will be allowed access. You can use
    the `allowed_inbound_ssh_security_group_ids` parameter to control the list of source Security Groups that will be
    allowed access.

    The ID of the security group is exported as an output variable, which you can use with the [kibana-security-group-rules](https://github.com/gruntwork-io/terraform-aws-elk/tree/master/modules/kibana-security-group-rules),
    [elasticsearch-security-group-rules](https://github.com/gruntwork-io/terraform-aws-elk/tree/master/modules/elasticsearch-security-group-rules), [elastalert-security-group-rules](https://github.com/gruntwork-io/terraform-aws-elk/tree/master/modules/elastalert-security-group-rules),
    and [logstash-security-group-rules](https://github.com/gruntwork-io/terraform-aws-elk/tree/master/modules/logstash-security-group-rules) modules to open up all the ports necessary for Kibana and the respective
    Elasticsearch tools.

### SSH access

You can associate an [EC2 Key Pair](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-key-pairs.html) with each
of the EC2 Instances in this cluster by specifying the Key Pair's name in the `ssh_key_name` variable. If you don't
want to associate a Key Pair with these servers, set `ssh_key_name` to an empty string.

## How do you connect to the Kibana cluster?

### Using a load balancer

If you deploy the Kibana cluster with a load balancer in front of it see: [ELK multi-cluster](https://github.com/gruntwork-io/terraform-aws-elk/tree/master/examples/elk-multi-cluster/README.md) Example
Then you can use the load balancer's DNS along with the `kibana_ui_port` that you specified in the `variables.tf` to form a URL like: `http://loadbalancer_dns:kibana_ui_port/`
For example, your URL will likely look something like: `http://kibanaexample-lb-77641507.us-east-1.elb.amazonaws.com:5601/`

### Using the AWS Console UI

Without a load balancer to act as a single entry point, you will have to manually choose one of the IP addresses from the EC2 Instances
that were deployed as part of the Auto Scaling Group. You can find the IP addresses of each EC2 Instance that was deployed as part of the Kibana cluster deployment by locating
those instances in the [AWS Console's Instance view](https://console.aws.amazon.com/ec2/).  Accessing the Kibana UI would require that
the IP address you use is either public, or accessible from your local network. The URL would look something like: `http://the.ip.address:kibana_ui_port/`

## How do you roll out updates?

If you want to deploy a new version of Kibana across the cluster, the best way to do that is to:

1.  Rolling deploy:
    1.  Build a new AMI.
    2.  Set the `ami_id` parameter to the ID of the new AMI.
    3.  Run `terraform apply`.
    4.  Because the [kibana-cluster module](https://github.com/gruntwork-io/terraform-aws-elk/tree/master/modules/kibana-cluster) uses the Gruntwork [asg-rolling-deploy](https://github.com/gruntwork-io/terraform-aws-asg/tree/main/modules/asg-rolling-deploy) module under the hood, running
        `terraform apply` will automatically perform a zero-downtime rolling deployment. Specifically, new EC2 Instances will spawned, and only once the new EC2 Instances pass the Load
        Balancer Health Checks will the existing Instances be terminated.

        Note that there will be a brief period of time during which EC2 Instances based on both the old `ami_id` and
        new `ami_id` will be running. [Rolling upgrades docs](https://www.elastic.co/guide/en/elasticsearch/reference/current/rolling-upgrades.html)
        suggest that this is acceptable for Elasticsearch version 5.6 and greater.

2.  New cluster:
    1.  Build a new AMI.
    2.  Create a totally new ASG using the `kibana-cluster` module with the `ami_id` set to the new AMI, but all
        other parameters the same as the old cluster.
    3.  Wait for all the nodes in the new ASG to start up and pass health checks.
    4.  Remove each of the nodes from the old cluster.
    5.  Remove the old ASG by removing that `kibana-cluster` module from your code.

## Security

Here are some of the main security considerations to keep in mind when using this module:

1.  [Encryption in transit](#encryption-in-transit)
2.  [Encryption at rest](#encryption-at-rest)
3.  [Dedicated instances](#dedicated-instances)
4.  [Security groups](#security-groups)
5.  [SSH access](#ssh-access)

### Encryption in transit

Kibana can encrypt all of its network traffic. TODO: Should we recommend using X-Pack (official solution, but
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

## Sample Usage

<ModuleUsage>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S KIBANA-CLUSTER MODULE
# ------------------------------------------------------------------------------------------------------

module "kibana_cluster" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-elk.git//modules/kibana-cluster?ref=v0.11.1"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The ID of the AMI to run in this cluster.
  ami_id = <INPUT REQUIRED>

  # The name of the kibana cluster (e.g. kibana-stage). This variable is used to
  # namespace all resources created by this module.
  cluster_name = <INPUT REQUIRED>

  # The type of EC2 Instances to run for each node in the cluster (e.g. t2.micro).
  instance_type = <INPUT REQUIRED>

  # The maximum number of nodes to have in the kibana cluster.
  max_size = <INPUT REQUIRED>

  # The minimum number of nodes to have in the kibana cluster.
  min_size = <INPUT REQUIRED>

  # The subnet IDs into which the EC2 Instances should be deployed.
  subnet_ids = <INPUT REQUIRED>

  # A User Data script to execute while the server is booting.
  user_data = <INPUT REQUIRED>

  # The ID of the VPC in which to deploy the kibana cluster
  vpc_id = <INPUT REQUIRED>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # A list of IP address ranges in CIDR format from which SSH access will be
  # permitted. Attempts to access SSH from all other IP addresses will be blocked.
  allow_ssh_from_cidr_blocks = []

  # The IDs of security groups from which SSH connections will be allowed. If you
  # update this variable, make sure to update var.num_ssh_security_group_ids too!
  allow_ssh_from_security_group_ids = []

  # A list of IP address ranges in CIDR format from which access to the UI will be
  # permitted. Attempts to access the UI from all other IP addresses will be
  # blocked.
  allow_ui_from_cidr_blocks = []

  # The IDs of security groups from which access to the UI will be permitted. If you
  # update this variable, make sure to update var.num_ui_security_group_ids too!
  allow_ui_from_security_group_ids = []

  # If set to true, associate a public IP address with each EC2 Instance in the
  # cluster.
  associate_public_ip_address = false

  # The desired number of EC2 Instances to run in the ASG initially. Note that auto
  # scaling policies may change this value. If you're using auto scaling policies to
  # dynamically resize the cluster, you should actually leave this value as null.
  desired_capacity = null

  # Path in which to create the IAM instance profile.
  instance_profile_path = "/"

  # This is the port that is used to access kibana UI
  kibana_ui_port = 5601

  # Wait for this number of EC2 Instances to show up healthy in the load balancer on
  # creation.
  min_elb_capacity = 0

  # The number of security group IDs in var.allow_ssh_from_security_group_ids. We
  # should be able to compute this automatically, but due to a Terraform limitation,
  # if there are any dynamic resources in var.allow_ssh_from_security_group_ids,
  # then we won't be able to: https://github.com/hashicorp/terraform/pull/11482
  num_ssh_security_group_ids = 0

  # The number of security group IDs in var.allow_ui_from_security_group_ids. We
  # should be able to compute this automatically, but due to a Terraform limitation,
  # if there are any dynamic resources in var.allow_ui_from_security_group_ids, then
  # we won't be able to: https://github.com/hashicorp/terraform/pull/11482
  num_ui_security_group_ids = 0

  # The name of an EC2 Key Pair that can be used to SSH to the EC2 Instances in this
  # cluster. Set to an empty string to not associate a Key Pair.
  ssh_key_name = null

  # The port used for SSH connections
  ssh_port = 22

  # List fo extra tag blocks added to the autoscaling group configuration. Each
  # element in the list is a map containing keys 'key', 'value', and
  # 'propagate_at_launch' mapped to the respective values.
  tags = []

  # A list of target group ARNs to associate with the Kibana cluster.
  target_group_arns = []

  # A maximum duration that Terraform should wait for the EC2 Instances to be
  # healthy before timing out.
  wait_for_capacity_timeout = "10m"

}

```

</ModuleUsage>




## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Required

<HclListItem name="ami_id" requirement="required" type="string">
<HclListItemDescription>

The ID of the AMI to run in this cluster.

</HclListItemDescription>
</HclListItem>

<HclListItem name="cluster_name" requirement="required" type="string">
<HclListItemDescription>

The name of the kibana cluster (e.g. kibana-stage). This variable is used to namespace all resources created by this module.

</HclListItemDescription>
</HclListItem>

<HclListItem name="instance_type" requirement="required" type="string">
<HclListItemDescription>

The type of EC2 Instances to run for each node in the cluster (e.g. t2.micro).

</HclListItemDescription>
</HclListItem>

<HclListItem name="max_size" requirement="required" type="number">
<HclListItemDescription>

The maximum number of nodes to have in the kibana cluster.

</HclListItemDescription>
</HclListItem>

<HclListItem name="min_size" requirement="required" type="number">
<HclListItemDescription>

The minimum number of nodes to have in the kibana cluster.

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

The ID of the VPC in which to deploy the kibana cluster

</HclListItemDescription>
</HclListItem>

### Optional

<HclListItem name="allow_ssh_from_cidr_blocks" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of IP address ranges in CIDR format from which SSH access will be permitted. Attempts to access SSH from all other IP addresses will be blocked.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="allow_ssh_from_security_group_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The IDs of security groups from which SSH connections will be allowed. If you update this variable, make sure to update <a href="#num_ssh_security_group_ids"><code>num_ssh_security_group_ids</code></a> too!

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="allow_ui_from_cidr_blocks" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of IP address ranges in CIDR format from which access to the UI will be permitted. Attempts to access the UI from all other IP addresses will be blocked.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="allow_ui_from_security_group_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The IDs of security groups from which access to the UI will be permitted. If you update this variable, make sure to update <a href="#num_ui_security_group_ids"><code>num_ui_security_group_ids</code></a> too!

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="associate_public_ip_address" requirement="optional" type="bool">
<HclListItemDescription>

If set to true, associate a public IP address with each EC2 Instance in the cluster.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="desired_capacity" requirement="optional" type="number">
<HclListItemDescription>

The desired number of EC2 Instances to run in the ASG initially. Note that auto scaling policies may change this value. If you're using auto scaling policies to dynamically resize the cluster, you should actually leave this value as null.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="instance_profile_path" requirement="optional" type="string">
<HclListItemDescription>

Path in which to create the IAM instance profile.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;/&quot;"/>
</HclListItem>

<HclListItem name="kibana_ui_port" requirement="optional" type="number">
<HclListItemDescription>

This is the port that is used to access kibana UI

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="5601"/>
</HclListItem>

<HclListItem name="min_elb_capacity" requirement="optional" type="number">
<HclListItemDescription>

Wait for this number of EC2 Instances to show up healthy in the load balancer on creation.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="0"/>
</HclListItem>

<HclListItem name="num_ssh_security_group_ids" requirement="optional" type="number">
<HclListItemDescription>

The number of security group IDs in <a href="#allow_ssh_from_security_group_ids"><code>allow_ssh_from_security_group_ids</code></a>. We should be able to compute this automatically, but due to a Terraform limitation, if there are any dynamic resources in <a href="#allow_ssh_from_security_group_ids"><code>allow_ssh_from_security_group_ids</code></a>, then we won't be able to: https://github.com/hashicorp/terraform/pull/11482

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="0"/>
</HclListItem>

<HclListItem name="num_ui_security_group_ids" requirement="optional" type="number">
<HclListItemDescription>

The number of security group IDs in <a href="#allow_ui_from_security_group_ids"><code>allow_ui_from_security_group_ids</code></a>. We should be able to compute this automatically, but due to a Terraform limitation, if there are any dynamic resources in <a href="#allow_ui_from_security_group_ids"><code>allow_ui_from_security_group_ids</code></a>, then we won't be able to: https://github.com/hashicorp/terraform/pull/11482

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="0"/>
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

<HclListItem name="tags" requirement="optional" type="list(object(…))">
<HclListItemDescription>

List fo extra tag blocks added to the autoscaling group configuration. Each element in the list is a map containing keys 'key', 'value', and 'propagate_at_launch' mapped to the respective values.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
list(object({
    key                 = string
    value               = string
    propagate_at_launch = bool
  }))
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="[]"/>
<HclGeneralListItem title="Examples">
<details>
  <summary>Example</summary>


```hcl
   default = [
     {
       key                 = "foo"
       value               = "bar"
       propagate_at_launch = true
     }
   ]

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="target_group_arns" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of target group ARNs to associate with the Kibana cluster.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="wait_for_capacity_timeout" requirement="optional" type="string">
<HclListItemDescription>

A maximum duration that Terraform should wait for the EC2 Instances to be healthy before timing out.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;10m&quot;"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="iam_role_arn">
</HclListItem>

<HclListItem name="iam_role_id">
</HclListItem>

<HclListItem name="kibana_asg_name">
</HclListItem>

<HclListItem name="kibana_launch_config_name">
</HclListItem>

<HclListItem name="kibana_security_group_id">
</HclListItem>

</TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-elk/tree/master/modules/kibana-cluster/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-elk/tree/master/modules/kibana-cluster/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-elk/tree/master/modules/kibana-cluster/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "73e1941bbb4c35cc82173350fa186840"
}
##DOCS-SOURCER-END -->

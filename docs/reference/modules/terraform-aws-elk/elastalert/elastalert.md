---
title: "ElastAlert"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="ELK AWS Module" version="0.11.1" lastModifiedVersion="0.11.0"/>

# ElastAlert

<a href="https://github.com/gruntwork-io/terraform-aws-elk/tree/master/modules/elastalert" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-elk/releases/tag/v0.11.0" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This folder contains a [Terraform](https://www.terraform.io/) module to deploy [ElastAlert](https://github.com/Yelp/elastalert)
on top of an Auto Scaling Group of exactly one EC2 instance.

The idea is to create an [Amazon Machine Image (AMI)](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AMIs.html)
that has ElastAlert installed using the [install-elastalert](https://github.com/gruntwork-io/terraform-aws-elk/tree/master/modules/install-elastalert) module.

## Sample Usage

<ModuleUsage>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S ELASTALERT MODULE
# ------------------------------------------------------------------------------------------------------

module "elastalert" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-elk.git//modules/elastalert?ref=v0.11.1"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The ID of the AMI to run in this cluster.
  ami_id = <INPUT REQUIRED>

  # The type of EC2 Instances to run for each node in the cluster (e.g. t2.micro).
  instance_type = <INPUT REQUIRED>

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
  # permitted. Attempts to access the bastion host from all other IP addresses will
  # be blocked.
  allow_ssh_from_cidr_blocks = []

  # The IDs of security groups from which SSH connections will be allowed. If you
  # update this variable, make sure to update var.num_ssh_security_group_ids too!
  allow_ssh_from_security_group_ids = []

  # If set to true, associate a public IP address with each EC2 Instance in the
  # cluster.
  associate_public_ip_address = false

  # Path in which to create the IAM instance profile.
  instance_profile_path = "/"

  # Wait for this number of EC2 Instances to show up healthy in the load balancer on
  # creation.
  min_elb_capacity = 0

  # The module's name that will be used to prefix various AWS resource names.
  name_prefix = "elastalert-"

  # The number of security group IDs in var.allow_ssh_from_security_group_ids. We
  # should be able to compute this automatically, but due to a Terraform limitation,
  # if there are any dynamic resources in var.allow_ssh_from_security_group_ids,
  # then we won't be able to: https://github.com/hashicorp/terraform/pull/11482
  num_ssh_security_group_ids = 0

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

<HclListItem name="instance_type" requirement="required" type="string">
<HclListItemDescription>

The type of EC2 Instances to run for each node in the cluster (e.g. t2.micro).

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

A list of IP address ranges in CIDR format from which SSH access will be permitted. Attempts to access the bastion host from all other IP addresses will be blocked.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="allow_ssh_from_security_group_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The IDs of security groups from which SSH connections will be allowed. If you update this variable, make sure to update <a href="#num_ssh_security_group_ids"><code>num_ssh_security_group_ids</code></a> too!

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="associate_public_ip_address" requirement="optional" type="bool">
<HclListItemDescription>

If set to true, associate a public IP address with each EC2 Instance in the cluster.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="instance_profile_path" requirement="optional" type="string">
<HclListItemDescription>

Path in which to create the IAM instance profile.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;/&quot;"/>
</HclListItem>

<HclListItem name="min_elb_capacity" requirement="optional" type="number">
<HclListItemDescription>

Wait for this number of EC2 Instances to show up healthy in the load balancer on creation.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="0"/>
</HclListItem>

<HclListItem name="name_prefix" requirement="optional" type="string">
<HclListItemDescription>

The module's name that will be used to prefix various AWS resource names.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;elastalert-&quot;"/>
</HclListItem>

<HclListItem name="num_ssh_security_group_ids" requirement="optional" type="number">
<HclListItemDescription>

The number of security group IDs in <a href="#allow_ssh_from_security_group_ids"><code>allow_ssh_from_security_group_ids</code></a>. We should be able to compute this automatically, but due to a Terraform limitation, if there are any dynamic resources in <a href="#allow_ssh_from_security_group_ids"><code>allow_ssh_from_security_group_ids</code></a>, then we won't be able to: https://github.com/hashicorp/terraform/pull/11482

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

<HclListItem name="elastalert_asg_name">
</HclListItem>

<HclListItem name="elastalert_security_group_id">
</HclListItem>

<HclListItem name="iam_role_arn">
</HclListItem>

<HclListItem name="iam_role_id">
</HclListItem>

</TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-elk/tree/master/modules/elastalert/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-elk/tree/master/modules/elastalert/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-elk/tree/master/modules/elastalert/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "07bf847b76d976d1d9daf5779b29eb54"
}
##DOCS-SOURCER-END -->

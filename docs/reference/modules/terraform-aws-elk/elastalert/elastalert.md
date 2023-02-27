---
title: "ElastAlert"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';

<a href="https://github.com/gruntwork-io/terraform-aws-elk/tree/master/modules/elastalert" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-elk/releases?q=" className="link-button" title="Release notes for only the service catalog versions which impacted this service.">Release Notes</a>

# ElastAlert

This folder contains a [Terraform](https://www.terraform.io/) module to deploy [ElastAlert](https://github.com/Yelp/elastalert)
on top of an Auto Scaling Group of exactly one EC2 instance.

The idea is to create an [Amazon Machine Image (AMI)](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AMIs.html)
that has ElastAlert installed using the [install-elastalert](https://github.com/gruntwork-io/terraform-aws-elk/tree/master/modules/install-elastalert) module.




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
    "https://github.com/gruntwork-io/terraform-aws-elk/tree/modules/elastalert/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-elk/tree/modules/elastalert/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-elk/tree/modules/elastalert/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "b98ef5ad1bf4adc4e3a4a86f402c6ec2"
}
##DOCS-SOURCER-END -->

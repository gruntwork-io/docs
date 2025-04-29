---
title: "VPC-App Network ACLs Terraform Module"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="VPC Modules" version="0.28.5" lastModifiedVersion="0.28.0"/>

# VPC-App Network ACLs Terraform Module

<a href="https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.28.5/modules/vpc-app-network-acls" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.28.0" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This Terraform Module adds a default set of [Network
ACLs](http://docs.aws.amazon.com/AmazonVPC/latest/UserGuide/VPC_ACLs.html) to a VPC created using the
[vpc-app](https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.28.5/modules/vpc-app) module. The ACLs enforce the following security settings (based on [A Reference VPC
Architecture](https://www.whaletech.co/2014/10/02/reference-vpc-architecture.html)):

*   **Public subnet**: Allow all requests.
*   **Private app subnet**: Allow all requests to/from the public subnets, private persistence subnets, and the Mgmt VPC.
    Allow all outbound TCP requests plus return traffic from any IP for those TCP requests on [ephemeral
    ports](http://docs.aws.amazon.com/AmazonVPC/latest/UserGuide/VPC_ACLs.html#VPC_ACLs_Ephemeral_Ports).
*   **Private persistence subnet**: Allow all requests to/from the private app subnets and the Mgmt VPC.
*   **Transit subnet**: Allow all requests. AWS recommends you [should allow all traffic to pass through it](https://docs.aws.amazon.com/vpc/latest/tgw/tgw-nacls.html#nacl-best-practices).

## What's a VPC?

A [VPC](https://aws.amazon.com/vpc/) or Virtual Private Cloud is a logically isolated section of your AWS cloud. Each
VPC defines a virtual network within which you run your AWS resources, as well as rules for what can go in and out of
that network. This includes subnets, route tables that tell those subnets how to route inbound and outbound traffic,
security groups, access controls lists for the network (NACLs), and any other network components such as VPN connections.

## What's a Network ACL?

[Network ACLs](http://docs.aws.amazon.com/AmazonVPC/latest/UserGuide/VPC_ACLs.html) provide an extra layer of network
security, similar to a [security group](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-network-security.html).
Whereas a security group controls what inbound and outbound traffic is allowed for a specific resource (e.g. a single
EC2 instance), a network ACL controls what inbound and outbound traffic is allowed for an entire subnet.

## How do I configure the Network ACLs for public ELB access?

The recommended configuration for public Elastic Load Balancers is to deploy the public facing ELB (Application Load
Balancer/ALB or Network Load Balancer/NLB) in the public subnet tier, and the applications in the private app subnet
tier. For the most part, the Network ACLs configured in this module should be sufficient for exposing access to the
private services through the public ELB.

However, for NLBs, the default network ACLs in the module would restrict access to the private services routed from the
NLB if the application is listening on a privileged port (port numbers less than 1024, e.g. HTTP port 80). This is
because unlike ALBs, NLBs do not do address translation, and thus the VPC firewalls end up seeing the client IP address
instead of the NLB IP address. This triggers the firewall rules in the network ACLs that will block access to the
private service in the private app subnet, as the traffic will not appear to come from the public subnet tier.

To ensure the NLB traffic can make it to the private service, you must expose access to the privileged port from the
client IP address in the network ACL rules. To do this, you can use the `private_app_allow_inbound_ports_from_cidr`
input variable. For example, to allow access to a service listening on port 443 (HTTPS):

```
module "network_acls" {
  # other arguments omitted for brevity

  private_app_allow_inbound_ports_from_cidr = {
    AllowAnyPublicHTTP = {
      client_cidr_block = "0.0.0.0/0"
      protocol          = "tcp"
      from_port         = 443
      to_port           = 443
      icmp_type         = null
      icmp_code         = null      

      # We pick rule number 99 to ensure it has the highest priority.
      rule_number = 99
    }
  }
}
```

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S VPC-APP-NETWORK-ACLS MODULE
# ------------------------------------------------------------------------------------------------------

module "vpc_app_network_acls" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-vpc.git//modules/vpc-app-network-acls?ref=v0.28.5"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The number of each type of subnet (public, private, private persistence)
  # created in this VPC. Typically, this is equal to the number of availability
  # zones in the current region. We should be able to compute this
  # automatically, but due to a Terraform bug, we can't:
  # https://github.com/hashicorp/terraform/issues/3888
  num_subnets = <number>

  # A list of CIDR blocks used by the private app subnets in the VPC
  private_app_subnet_cidr_blocks = <list(string)>

  # A list of IDs of the private app subnets in the VPC
  private_app_subnet_ids = <list(string)>

  # A list of CIDR blocks used by the private persistence subnets in the VPC
  private_persistence_subnet_cidr_blocks = <list(string)>

  # A list of IDs of the private persistence subnets in the VPC
  private_persistence_subnet_ids = <list(string)>

  # A list of CIDR blocks used by the public subnets in the VPC
  public_subnet_cidr_blocks = <list(string)>

  # A list of IDs of the public subnets in the VPC
  public_subnet_ids = <list(string)>

  # The id of the VPC
  vpc_id = <string>

  # The name of the VPC (e.g. stage, prod)
  vpc_name = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # If set to true, the network ACLs will allow incoming requests from the Mgmt
  # VPC CIDR block defined in var.mgmt_vpc_cidr_block.
  allow_access_from_mgmt_vpc = false

  # Should NACL for the private persistence subnet be allowed outbound access to
  # the internet?
  allow_private_persistence_internet_access = false

  # The base number to append to var.initial_nacl_rule_number for the first
  # transit rule in private and persistence rules created by this module. All
  # transit rules will be inserted after this number. This base number provides
  # a safeguard to ensure that the transit rules do not overwrite any existing
  # NACL rules in private and persistence subnets. Note that the transit subnet
  # ACL rules start normally with var.initial_nacl_rule_number.
  base_transit_nacl_rule_number = 1000

  # If set to false, this module will NOT create the NACLs for the private app
  # subnet tier.
  create_private_app_subnet_nacls = true

  # If set to false, this module will NOT create the NACLs for the private
  # persistence subnet tier.
  create_private_persistence_subnet_nacls = true

  # If set to false, this module will NOT create the NACLs for the public subnet
  # tier. This is useful for VPCs that only need private subnets.
  create_public_subnet_nacls = true

  # If you set this variable to false, this module will not create any
  # resources. This is used as a workaround because Terraform does not allow you
  # to use the 'count' parameter on modules. By using this parameter, you can
  # optionally create or not create the resources within this module.
  create_resources = true

  # If set to false, this module will NOT create the NACLs for the transit
  # subnet tier.
  create_transit_subnet_nacls = false

  # A map of tags to apply to the Network ACLs created by this module. The key
  # is the tag name and the value is the tag value. Note that the tag 'Name' is
  # automatically added by this module but may be optionally overwritten by this
  # variable.
  custom_tags = {}

  # The list of ports to exclude from the inbound allow all rules. This is
  # useful for adhering to certain compliance standards like CIS that explicitly
  # deny any allow rule for administrative ports.
  exclude_ports_from_inbound_all = []

  # The number to use for the first rule that is created by this module. All
  # rules in this module will be inserted after this number. This is useful to
  # provide additional head room for your NACL rules that should take precedence
  # over the initial rule.
  initial_nacl_rule_number = 100

  # The CIDR block of the Mgmt VPC. All subnets will allow connections from this
  # CIDR block. Only used if var.allow_access_from_mgmt_vpc is set to true.
  mgmt_vpc_cidr_block = null

  # Set to false to prevent the private app subnet from allowing traffic from
  # the transit subnet. Only used if create_transit_subnet_nacls is set to true.
  private_app_allow_inbound_from_transit_network = true

  # A map of unique names to client IP CIDR block and inbound ports that should
  # be exposed in the private app subnet tier nACLs. This is useful when
  # exposing your service on a privileged port with an NLB, where the address
  # isn't translated.
  private_app_allow_inbound_ports_from_cidr = {}

  # A map of unique names to destination IP CIDR block and outbound ports that
  # should be allowed in the private app subnet tier nACLs. This is useful when
  # allowing your VPC specific outbound communication to defined CIDR
  # blocks(known networks)
  private_app_allow_outbound_ports_to_destination_cidr = {}

  # Set to false to prevent the private persistence subnet from allowing traffic
  # from the transit subnet. Only used if create_transit_subnet_nacls is set to
  # true.
  private_persistence_allow_inbound_from_transit_network = true

  # A list of CIDR blocks used by the transit subnets in the VPC. Required if
  # create_transit_subnet_nacls is set to true.
  transit_subnet_cidr_blocks = []

  # A list of IDs of the transit subnets in the VPC. Required if
  # create_transit_subnet_nacls is set to true.
  transit_subnet_ids = []

  # Use this variable to ensure the Network ACL does not get created until the
  # VPC is ready. This can help to work around a Terraform or AWS issue where
  # trying to create certain resources, such as Network ACLs, before the VPC's
  # Gateway and NATs are ready, leads to a huge variety of eventual consistency
  # bugs. You should typically point this variable at the vpc_ready output from
  # the Gruntwork VPCs.
  vpc_ready = null

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S VPC-APP-NETWORK-ACLS MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-vpc.git//modules/vpc-app-network-acls?ref=v0.28.5"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The number of each type of subnet (public, private, private persistence)
  # created in this VPC. Typically, this is equal to the number of availability
  # zones in the current region. We should be able to compute this
  # automatically, but due to a Terraform bug, we can't:
  # https://github.com/hashicorp/terraform/issues/3888
  num_subnets = <number>

  # A list of CIDR blocks used by the private app subnets in the VPC
  private_app_subnet_cidr_blocks = <list(string)>

  # A list of IDs of the private app subnets in the VPC
  private_app_subnet_ids = <list(string)>

  # A list of CIDR blocks used by the private persistence subnets in the VPC
  private_persistence_subnet_cidr_blocks = <list(string)>

  # A list of IDs of the private persistence subnets in the VPC
  private_persistence_subnet_ids = <list(string)>

  # A list of CIDR blocks used by the public subnets in the VPC
  public_subnet_cidr_blocks = <list(string)>

  # A list of IDs of the public subnets in the VPC
  public_subnet_ids = <list(string)>

  # The id of the VPC
  vpc_id = <string>

  # The name of the VPC (e.g. stage, prod)
  vpc_name = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # If set to true, the network ACLs will allow incoming requests from the Mgmt
  # VPC CIDR block defined in var.mgmt_vpc_cidr_block.
  allow_access_from_mgmt_vpc = false

  # Should NACL for the private persistence subnet be allowed outbound access to
  # the internet?
  allow_private_persistence_internet_access = false

  # The base number to append to var.initial_nacl_rule_number for the first
  # transit rule in private and persistence rules created by this module. All
  # transit rules will be inserted after this number. This base number provides
  # a safeguard to ensure that the transit rules do not overwrite any existing
  # NACL rules in private and persistence subnets. Note that the transit subnet
  # ACL rules start normally with var.initial_nacl_rule_number.
  base_transit_nacl_rule_number = 1000

  # If set to false, this module will NOT create the NACLs for the private app
  # subnet tier.
  create_private_app_subnet_nacls = true

  # If set to false, this module will NOT create the NACLs for the private
  # persistence subnet tier.
  create_private_persistence_subnet_nacls = true

  # If set to false, this module will NOT create the NACLs for the public subnet
  # tier. This is useful for VPCs that only need private subnets.
  create_public_subnet_nacls = true

  # If you set this variable to false, this module will not create any
  # resources. This is used as a workaround because Terraform does not allow you
  # to use the 'count' parameter on modules. By using this parameter, you can
  # optionally create or not create the resources within this module.
  create_resources = true

  # If set to false, this module will NOT create the NACLs for the transit
  # subnet tier.
  create_transit_subnet_nacls = false

  # A map of tags to apply to the Network ACLs created by this module. The key
  # is the tag name and the value is the tag value. Note that the tag 'Name' is
  # automatically added by this module but may be optionally overwritten by this
  # variable.
  custom_tags = {}

  # The list of ports to exclude from the inbound allow all rules. This is
  # useful for adhering to certain compliance standards like CIS that explicitly
  # deny any allow rule for administrative ports.
  exclude_ports_from_inbound_all = []

  # The number to use for the first rule that is created by this module. All
  # rules in this module will be inserted after this number. This is useful to
  # provide additional head room for your NACL rules that should take precedence
  # over the initial rule.
  initial_nacl_rule_number = 100

  # The CIDR block of the Mgmt VPC. All subnets will allow connections from this
  # CIDR block. Only used if var.allow_access_from_mgmt_vpc is set to true.
  mgmt_vpc_cidr_block = null

  # Set to false to prevent the private app subnet from allowing traffic from
  # the transit subnet. Only used if create_transit_subnet_nacls is set to true.
  private_app_allow_inbound_from_transit_network = true

  # A map of unique names to client IP CIDR block and inbound ports that should
  # be exposed in the private app subnet tier nACLs. This is useful when
  # exposing your service on a privileged port with an NLB, where the address
  # isn't translated.
  private_app_allow_inbound_ports_from_cidr = {}

  # A map of unique names to destination IP CIDR block and outbound ports that
  # should be allowed in the private app subnet tier nACLs. This is useful when
  # allowing your VPC specific outbound communication to defined CIDR
  # blocks(known networks)
  private_app_allow_outbound_ports_to_destination_cidr = {}

  # Set to false to prevent the private persistence subnet from allowing traffic
  # from the transit subnet. Only used if create_transit_subnet_nacls is set to
  # true.
  private_persistence_allow_inbound_from_transit_network = true

  # A list of CIDR blocks used by the transit subnets in the VPC. Required if
  # create_transit_subnet_nacls is set to true.
  transit_subnet_cidr_blocks = []

  # A list of IDs of the transit subnets in the VPC. Required if
  # create_transit_subnet_nacls is set to true.
  transit_subnet_ids = []

  # Use this variable to ensure the Network ACL does not get created until the
  # VPC is ready. This can help to work around a Terraform or AWS issue where
  # trying to create certain resources, such as Network ACLs, before the VPC's
  # Gateway and NATs are ready, leads to a huge variety of eventual consistency
  # bugs. You should typically point this variable at the vpc_ready output from
  # the Gruntwork VPCs.
  vpc_ready = null

}


```

</TabItem>
</Tabs>




## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Required

<HclListItem name="num_subnets" requirement="required" type="number">
<HclListItemDescription>

The number of each type of subnet (public, private, private persistence) created in this VPC. Typically, this is equal to the number of availability zones in the current region. We should be able to compute this automatically, but due to a Terraform bug, we can't: https://github.com/hashicorp/terraform/issues/3888

</HclListItemDescription>
</HclListItem>

<HclListItem name="private_app_subnet_cidr_blocks" requirement="required" type="list(string)">
<HclListItemDescription>

A list of CIDR blocks used by the private app subnets in the VPC

</HclListItemDescription>
</HclListItem>

<HclListItem name="private_app_subnet_ids" requirement="required" type="list(string)">
<HclListItemDescription>

A list of IDs of the private app subnets in the VPC

</HclListItemDescription>
</HclListItem>

<HclListItem name="private_persistence_subnet_cidr_blocks" requirement="required" type="list(string)">
<HclListItemDescription>

A list of CIDR blocks used by the private persistence subnets in the VPC

</HclListItemDescription>
</HclListItem>

<HclListItem name="private_persistence_subnet_ids" requirement="required" type="list(string)">
<HclListItemDescription>

A list of IDs of the private persistence subnets in the VPC

</HclListItemDescription>
</HclListItem>

<HclListItem name="public_subnet_cidr_blocks" requirement="required" type="list(string)">
<HclListItemDescription>

A list of CIDR blocks used by the public subnets in the VPC

</HclListItemDescription>
</HclListItem>

<HclListItem name="public_subnet_ids" requirement="required" type="list(string)">
<HclListItemDescription>

A list of IDs of the public subnets in the VPC

</HclListItemDescription>
</HclListItem>

<HclListItem name="vpc_id" requirement="required" type="string">
<HclListItemDescription>

The id of the VPC

</HclListItemDescription>
</HclListItem>

<HclListItem name="vpc_name" requirement="required" type="string">
<HclListItemDescription>

The name of the VPC (e.g. stage, prod)

</HclListItemDescription>
</HclListItem>

### Optional

<HclListItem name="allow_access_from_mgmt_vpc" requirement="optional" type="bool">
<HclListItemDescription>

If set to true, the network ACLs will allow incoming requests from the Mgmt VPC CIDR block defined in <a href="#mgmt_vpc_cidr_block"><code>mgmt_vpc_cidr_block</code></a>.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="allow_private_persistence_internet_access" requirement="optional" type="bool">
<HclListItemDescription>

Should NACL for the private persistence subnet be allowed outbound access to the internet?

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="base_transit_nacl_rule_number" requirement="optional" type="number">
<HclListItemDescription>

The base number to append to <a href="#initial_nacl_rule_number"><code>initial_nacl_rule_number</code></a> for the first transit rule in private and persistence rules created by this module. All transit rules will be inserted after this number. This base number provides a safeguard to ensure that the transit rules do not overwrite any existing NACL rules in private and persistence subnets. Note that the transit subnet ACL rules start normally with <a href="#initial_nacl_rule_number"><code>initial_nacl_rule_number</code></a>.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="1000"/>
</HclListItem>

<HclListItem name="create_private_app_subnet_nacls" requirement="optional" type="bool">
<HclListItemDescription>

If set to false, this module will NOT create the NACLs for the private app subnet tier.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="create_private_persistence_subnet_nacls" requirement="optional" type="bool">
<HclListItemDescription>

If set to false, this module will NOT create the NACLs for the private persistence subnet tier.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="create_public_subnet_nacls" requirement="optional" type="bool">
<HclListItemDescription>

If set to false, this module will NOT create the NACLs for the public subnet tier. This is useful for VPCs that only need private subnets.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="create_resources" requirement="optional" type="bool">
<HclListItemDescription>

If you set this variable to false, this module will not create any resources. This is used as a workaround because Terraform does not allow you to use the 'count' parameter on modules. By using this parameter, you can optionally create or not create the resources within this module.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="create_transit_subnet_nacls" requirement="optional" type="bool">
<HclListItemDescription>

If set to false, this module will NOT create the NACLs for the transit subnet tier.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="custom_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

A map of tags to apply to the Network ACLs created by this module. The key is the tag name and the value is the tag value. Note that the tag 'Name' is automatically added by this module but may be optionally overwritten by this variable.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="exclude_ports_from_inbound_all" requirement="optional" type="list(number)">
<HclListItemDescription>

The list of ports to exclude from the inbound allow all rules. This is useful for adhering to certain compliance standards like CIS that explicitly deny any allow rule for administrative ports.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="initial_nacl_rule_number" requirement="optional" type="number">
<HclListItemDescription>

The number to use for the first rule that is created by this module. All rules in this module will be inserted after this number. This is useful to provide additional head room for your NACL rules that should take precedence over the initial rule.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="100"/>
</HclListItem>

<HclListItem name="mgmt_vpc_cidr_block" requirement="optional" type="string">
<HclListItemDescription>

The CIDR block of the Mgmt VPC. All subnets will allow connections from this CIDR block. Only used if <a href="#allow_access_from_mgmt_vpc"><code>allow_access_from_mgmt_vpc</code></a> is set to true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="private_app_allow_inbound_from_transit_network" requirement="optional" type="bool">
<HclListItemDescription>

Set to false to prevent the private app subnet from allowing traffic from the transit subnet. Only used if create_transit_subnet_nacls is set to true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="private_app_allow_inbound_ports_from_cidr" requirement="optional" type="map">
<HclListItemDescription>

A map of unique names to client IP CIDR block and inbound ports that should be exposed in the private app subnet tier nACLs. This is useful when exposing your service on a privileged port with an NLB, where the address isn't translated.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
<HclGeneralListItem title="More Details">
<details>


```hcl

       A rule number indicating priority. A lower number has precedence. Note that the default rules created by this
       module start with var.initial_nacl_rule_number.

```
</details>

<details>


```hcl

       Network protocol (tcp, udp, icmp, or all) to expose.

```
</details>

<details>


```hcl

       Range of ports to expose.

```
</details>

<details>


```hcl

       ICMP types to expose
       Required if specifying ICMP for the protocol

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="private_app_allow_outbound_ports_to_destination_cidr" requirement="optional" type="map">
<HclListItemDescription>

A map of unique names to destination IP CIDR block and outbound ports that should be allowed in the private app subnet tier nACLs. This is useful when allowing your VPC specific outbound communication to defined CIDR blocks(known networks)

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
<HclGeneralListItem title="More Details">
<details>


```hcl

       A rule number indicating priority. A lower number has precedence. Note that the default rules created by this
       module start with 100.

```
</details>

<details>


```hcl

       Network protocol (tcp, udp, icmp, or all) to expose.

```
</details>

<details>


```hcl

       Range of ports to expose.

```
</details>

<details>


```hcl

       ICMP types to expose
       Required if specifying ICMP for the protocol

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="private_persistence_allow_inbound_from_transit_network" requirement="optional" type="bool">
<HclListItemDescription>

Set to false to prevent the private persistence subnet from allowing traffic from the transit subnet. Only used if create_transit_subnet_nacls is set to true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="transit_subnet_cidr_blocks" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of CIDR blocks used by the transit subnets in the VPC. Required if create_transit_subnet_nacls is set to true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="transit_subnet_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of IDs of the transit subnets in the VPC. Required if create_transit_subnet_nacls is set to true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="vpc_ready" requirement="optional" type="string">
<HclListItemDescription>

Use this variable to ensure the Network ACL does not get created until the VPC is ready. This can help to work around a Terraform or AWS issue where trying to create certain resources, such as Network ACLs, before the VPC's Gateway and NATs are ready, leads to a huge variety of eventual consistency bugs. You should typically point this variable at the vpc_ready output from the Gruntwork VPCs.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="private_app_subnets_network_acl_id">
</HclListItem>

<HclListItem name="private_persistence_subnets_network_acl_id">
</HclListItem>

<HclListItem name="public_subnets_network_acl_id">
</HclListItem>

<HclListItem name="transit_subnets_network_acl_id">
</HclListItem>

</TabItem>
</Tabs>

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.28.5/modules/vpc-app-network-acls/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.28.5/modules/vpc-app-network-acls/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.28.5/modules/vpc-app-network-acls/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "ad08eb53465fb9229a2cf8e4f659df8a"
}
##DOCS-SOURCER-END -->

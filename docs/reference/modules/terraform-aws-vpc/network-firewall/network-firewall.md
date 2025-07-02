---
title: "Network Firewall Terraform Module - Beta"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="VPC Modules" version="0.28.6" lastModifiedVersion="0.28.0"/>

# Network Firewall Terraform Module - Beta

<a href="https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.28.6/modules/network-firewall" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.28.0" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This Terraform module deploys Network Firewall resources. It is a managed service that allows you to filter and monitor network traffic.
The module creates Network Firewall, Network Firewall Policy and Network Firewall Rule Group.

This is a BETA release.

## Planned Features

*   Custom actions are not implemented.
*   TLS inspection configuration is not implemented.
*   Network Firewall Resource Policy is not implemented.
*   Reference sets (reference to prefixes list) are not implemented.
*   Logging Configuration is not implemented.
*   Proper update operation for Rule Groups is not implemented (Automatic Rule Dissassoiation is not supported, currently requires redeployment).

## Limitations

### 1. Availability Zones Constraints

AWS Network Firewall deployment is not supported in certain Availability Zones (AZs). The official documentation lacks clear specification of supported AZs. For example, the [Configuring Network Firewall](https://docs.aws.amazon.com/network-firewall/latest/developerguide/vpc-config-subnets.html) page omits AZ limitations, while the [Troubleshooting](https://docs.aws.amazon.com/network-firewall/latest/developerguide/troubleshooting-general-issues.html#troubleshoot-unsupported-az) page acknowledges but provides no specific details about AZ limitations (as of October 2024).

AWS Technical Support has confirmed their internal service team's awareness of this limitation. They recommend attempting deployment in specific AZs to verify support. Based on empirical testing across 17 default-enabled regions, this constraint affects only the `use1-az3` availability zone in the `us-east-1` region. Note that opt-in regions were not included in this analysis.

## Usage

For usage examples, check out the [One VPC](https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.28.6/examples/vpc-app-with-network-firewall/) and [Multi-VPC](https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.28.6/examples/vpc-app-with-network-firewall-and-transit-gateway/) deployment.

## Deployment models for AWS Network Firewall

### Single VPC, One AZ

By default, any traffic from a source within a VPC destined to a target within the same VPC is covered by the local route and therefore directly routed. The enhancement allows you to configure more specific routes at a subnet route table level or replace target for the “local” destination with a middlebox such as firewall endpoint. The key use case is insertion of a middlebox between two subnets for inter-subnet traffic (east-west) inspection. For example, you can create routing rules to send all traffic from a subnet to a network firewall endpoint when the destination is a specific subnet.

![Single VPC](https://d2908q01vomqb2.cloudfront.net/5b384ce32d8cdef02bc3a139d4cac0a22bb029e8/2021/09/10/anfw-deploymentmodels-withRoutingEnhancements-figure1.png)

Credits [Deployment models for AWS Network Firewall with VPC routing enhancements](https://aws.amazon.com/blogs/networking-and-content-delivery/deployment-models-for-aws-network-firewall-with-vpc-routing-enhancements/)

### Single VPC, Multi-AZ

When you build highly available applications on AWS, you can partition your application to run across multiple AZs. At AWS, we have a principle of keeping AZ independence (AZI) which means all packet flows stay within the Availability Zone rather than crossing boundaries. Network traffic is kept local to the AZ. In such scenario, it is easy to maintain traffic symmetry.

![Single VPC](https://d2908q01vomqb2.cloudfront.net/5b384ce32d8cdef02bc3a139d4cac0a22bb029e8/2021/09/10/anfw-deploymentmodels-withRoutingEnhancements-figure2.png)

Credits [Deployment models for AWS Network Firewall with VPC routing enhancements](https://aws.amazon.com/blogs/networking-and-content-delivery/deployment-models-for-aws-network-firewall-with-vpc-routing-enhancements/)

### Multi-VPC, Multi-AZ (Combined East-West and North-South Inspection with Transit Gateway)

Use AWS Transit Gateway to centralize the East/West inspection between VPCs, while you have a NAT gateway in the
Inspection VPC for centralized egress and the North/South inspection.

East/West Traffic Inspection:

1.  Traffic from an instance in Spoke VPC A destined to another instance in Spoke VPC B (East/West traffic) is routed to the Transit Gateway.
2.  The Transit Gateway route table associated with the attachment sends all the traffic (0.0.0.0/0) to the Inspection VPC.
3.  The Inspection VPC TGW subnet route table sends all the traffic to the firewall endpoint. The allowed traffic is forwarded back to the TGW ENI.
4.  As per the Transit Gateway route table associated with the Inspection VPC, the traffic is sent to Spoke VPC B.
5.  Finally, in the TGW subnet route table of the Spoke VPC B, the traffic is sent to the destination – 10.2.1.10.

North/South Traffic Inspection:

1.  Traffic from an instance in Spoke VPC B destined to the internet (North/South traffic) is routed to the Transit Gateway.
2.  The Transit Gateway route table associated with the attachment sends all the traffic (0.0.0.0/0) to the Inspection VPC.
3.  The Inspection VPC TGW subnet route table sends all the traffic to the firewall endpoint, where it is transparently analyzed.
4.  Allowed traffic is sent to the NAT gateway as per the Firewall subnet route table.
5.  The private IP of the client is translated to the private IP of the NAT gateway, and in turn, translated to the public IP by the internet gateway.

It is recommended to use Transit Gateway appliance mode in the Inspection VPC Transit Gateway attachment to maintain flow symmetry.

![Multi VPC](/img/reference/modules/terraform-aws-vpc/network-firewall/network-firewall-tgw.png)

Credits [Inspection Deployment Models with AWS Network Firewall](https://d1.awsstatic.com/architecture-diagrams/ArchitectureDiagrams/inspection-deployment-models-with-AWS-network-firewall-ra.pdf)

## Requirements

| Name | Version |
|------|---------|
| <a name="requirement_terraform"></a> [terraform](#requirement_terraform) | &gt;= 1.3.0 |
| <a name="requirement_aws"></a> [aws](#requirement_aws) | &gt;= 4.5.0 |

## Providers

| Name | Version |
|------|---------|
| <a name="provider_aws"></a> [aws](#provider_aws) | 5.67.0 |

## Modules

No modules.

## Resources

| Name | Type |
|------|------|
| [aws_networkfirewall_firewall.firewall](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/networkfirewall_firewall) | resource |
| [aws_networkfirewall_firewall_policy.firewall](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/networkfirewall_firewall_policy) | resource |
| [aws_networkfirewall_rule_group.firewall](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/networkfirewall_rule_group) | resource |
| [aws_region.current](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/data-sources/region) | data source |

## Inputs

| Name | Description | Type | Default | Required |
|------|-------------|------|---------|:--------:|
| <a name="input_delete_protection"></a> [delete_protection](#input_delete_protection) | A flag indicating whether the firewall is protected against deletion. Use this setting to protect against accidentally deleting a firewall that is in use. | `bool` | `false` | no |
| <a name="input_encryption_configuration"></a> [encryption_configuration](#input_encryption_configuration) | Configuration block with encryption options for the firewall. Leave blank to use AWS managed KMS encryption. See variable definition for details. | `list(object({<br/>    # The ID of the customer managed key. If you're using a key managed by another account, then specify the key ARN.<br/>    # You can use any of the key identifiers that KMS supports, unless you're using a key that's managed by another account.<br/>    key_id = optional(string)<br/><br/>    # The type of AWS KMS key to use for encryption of your Network Firewall resources.<br/>    # Valid values: CUSTOMER_KMS, AWS_OWNED_KMS_KEY.<br/>    type = string<br/>  }))` | `[]` | no |
| <a name="input_firewall_policy_change_protection"></a> [firewall_policy_change_protection](#input_firewall_policy_change_protection) | A flag indicating whether the firewall is protected against a change to the firewall policy association. Use this setting to protect against accidentally modifying the firewall policy for a firewall that is in use. | `bool` | `false` | no |
| <a name="input_inspection_subnet_ids"></a> [inspection_subnet_ids](#input_inspection_subnet_ids) | n/a | `list(string)` | n/a | yes |
| <a name="input_managed_stateful_rule_groups_to_associate"></a> [managed_stateful_rule_groups_to_associate](#input_managed_stateful_rule_groups_to_associate) | A list of AWS Managed Rule Groups names to associate with the firewall policy. Example: \["AbusedLegitMalwareDomainsActionOrder"]. More: https://docs.aws.amazon.com/network-firewall/latest/developerguide/aws-managed-rule-groups-list.html | `list(string)` | `[]` | no |
| <a name="input_policy_stateful_engine_options_rule_order"></a> [policy_stateful_engine_options_rule_order](#input_policy_stateful_engine_options_rule_order) | Indicates how to manage the order of stateful rule evaluation for the policy. Default value: DEFAULT_ACTION_ORDER. Valid values: DEFAULT_ACTION_ORDER, STRICT_ORDER (recommended). | `string` | `"DEFAULT_ACTION_ORDER"` | no |
| <a name="input_rule_group_config"></a> [rule_group_config](#input_rule_group_config) | A map of rule group configurations to associate with the firewall policy. See variable definition for details | `map(object({<br/>    # Description of the rule group.<br/>    description = optional(string)<br/><br/>    # Type of the rule group.<br/>    # Valid values: STATEFUL or STATELESS.<br/>    type = string<br/><br/>    # Capacity units consumed by rule groups. Max: 30000.<br/>    # When 30000 is set, one firewall policy fits one rule group.<br/>    # When 5000 is set, one firewall policy fits six rule groups.<br/>    # More: https://docs.aws.amazon.com/network-firewall/latest/developerguide/firewall-policy-settings.html#firewall-policy-capacity<br/>    capacity = number<br/><br/>    # The stateful rule group rules specifications in Suricata file format, with one rule per line.<br/>    # Use this to import your existing Suricata compatible rule groups.<br/>    # Required unless rule_group is specified.<br/>    # Example: "example.rules"<br/>    rules = optional(string)<br/><br/>    # Defines rule groups.<br/>    rule_group = optional(object({<br/><br/>      # Defines additional settings available to use in the rules defined in the rule group.<br/>      # Valid only for STATEFUL rule groups.<br/>      rule_variables = optional(object({<br/><br/>        # Defines IP address information.<br/>        # Map key is a unique alphanumeric string to identify the ip_set.<br/>        # Map value is a set of IP addresses and address ranges, in CIDR notation.<br/>        ip_sets = optional(map(list(string)), {})<br/><br/>        # Defines port range information.<br/>        # Map key is an unique alphanumeric string to identify the port_set.<br/>        # Map value is a set of port ranges.<br/>        port_sets = optional(map(list(string)), {})<br/>      }))<br/><br/>      # Defines STATEFUL rule options for the rule group.<br/>      # Valid values: "DEFAULT_ACTION_ORDER", "STRICT_ORDER". Recommended value: "STRICT_ORDER".<br/>      # If STRICT_ORDER is specified, this rule group can only be referenced in firewall policies<br/>      # that also utilize STRICT_ORDER for the stateful engine. STRICT_ORDER can only be specified<br/>      # when using a rules_source of rules_string or stateful_rule.<br/>      # More: https://docs.aws.amazon.com/network-firewall/latest/developerguide/suricata-rule-evaluation-order.html<br/>      stateful_rule_options = optional(object({ rule_order = string }))<br/><br/>      # Defines the stateful or stateless rules for the rule group.<br/>      # Valid values: "rules_source_list", "stateful_rule" or "stateless_rules_and_custom_actions".<br/>      # Only one of valid values must be specified.<br/>      rules_source = object({<br/><br/>        # The fully qualified name of a local file or file in an S3 bucket that contains Suricata compatible intrusion<br/>        # preventions system (IPS) rules or the Suricata rules as a string. These rules contain stateful<br/>        # inspection criteria and the action to take for traffic that matches the criteria.<br/>        rules_string = optional(string)<br/><br/>        # Defines stateful inspection criteria for a domain list rule group.<br/>        rules_source_list = optional(object({<br/>          # Defines the type of domain list rule group.<br/>          # Valid values: "ALLOWLIST", "DENYLIST".<br/>          generated_rules_type = string<br/><br/>          # Defines the types of domain specifications that are provided in the targets argument.<br/>          # Valid values: "HTTP_HOST", "TLS_SNI".<br/>          target_types = list(string)<br/><br/>          # Defines the domains that you want to inspect for in your traffic flows.<br/>          targets = list(string)<br/>        }))<br/><br/>        # Defines stateful inspection criteria for 5-tuple rules to be used together in a rule group.<br/>        stateful_rule = optional(object({<br/><br/>          # Action to take with packets in a traffic flow when the flow matches the stateful rule criteria.<br/>          # For all actions, AWS Network Firewall performs the specified action and discontinues stateful inspection of the traffic flow.<br/>          # Valid values: "ALERT", "DROP", "PASS".<br/>          action = string<br/><br/>          # Stateful 5-tuple inspection criteria for the rule, used to inspect traffic flows.<br/>          # The destination IP address or address range to inspect for, in CIDR notation. To match with any address, specify ANY.<br/>          # The destination port to inspect for. To match with any address, specify ANY.<br/>          # The direction of traffic flow to inspect. Valid values: ANY or FORWARD.<br/>          # The protocol to inspect. Valid values: IP, TCP, UDP, ICMP, HTTP, FTP, TLS, SMB, DNS, DCERPC, SSH, SMTP, IMAP, MSN, KRB5, IKEV2, TFTP, NTP, DHCP.<br/>          # The source IP address or address range for, in CIDR notation. To match with any address, specify ANY.<br/>          # The source port to inspect for. To match with any address, specify ANY.<br/>          destination      = string<br/>          destination_port = string<br/>          direction        = string<br/>          protocol         = string<br/>          source           = string<br/>          source_port      = string<br/><br/>          # Define additional settings for a stateful rule.<br/>          # Map key is a keyword defined by open source detection systems like Snort or Suricata for stateful rule inspection.<br/>          # Snort General Rule Options: http://manual-snort-org.s3-website-us-east-1.amazonaws.com/node31.html<br/>          # Suricata Rule Options: https://docs.suricata.io/en/suricata-5.0.1/rules/intro.html#rule-options<br/>          # Map value is a set of strings for additional settings to use in stateful rule inspection.<br/>          # Example: {"sid" = ["1"]}<br/>          rule_options = map(list(string))<br/>        }))<br/><br/>        # Defines stateless inspection criteria for a stateless rule group.<br/>        stateless_rules_and_custom_actions = optional(object({<br/>          # Defines stateless rules for use in the stateless rule group.<br/>          # Map's key is a number that indicates the order in which to run this rule relative to all of the rules that are defined for a stateless rule group.<br/>          # AWS Network Firewall evaluates the rules in a rule group starting with the lowest priority setting.<br/>          stateless_rule = map(object({<br/><br/>            # Set of actions to take on a packet that matches one of the stateless rule definition's match_attributes.<br/>            # For every rule you must specify 1 standard action.<br/>            # Standard actions include: aws:pass, aws:drop, aws:forward_to_sfe.<br/>            actions = list(string)<br/><br/>            # Set of protocols to inspect for, specified using the protocol's assigned internet protocol number (IANA).<br/>            # If not specified, this matches with any protocol.<br/>            # More: https://www.pcmag.com/encyclopedia/term/ip-protocol-number<br/>            protocols = optional(list(number))<br/><br/>            # Defines set of destination IP addresses and address ranges to inspect for, in CIDR notation.<br/>            # If not specified, this matches with any destination address.<br/>            destination = optional(list(string), [])<br/><br/>            # Defines set of configuration blocks describing the destination ports to inspect for.<br/>            # If not specified, this matches with any destination port.<br/>            # from_port -- the lower limit of the port range. This must be less than or equal to the to_port.<br/>            # to_port -- the upper limit of the port range. This must be greater than or equal to the from_port.<br/>            destination_port = optional(list(object({<br/>              from_port = number<br/>              to_port   = optional(number)<br/>            })))<br/><br/>            # Defines set of configuration blocks describing the source IP address and address ranges to inspect for, in CIDR notation.<br/>            # If not specified, this matches with any source address.<br/>            source = optional(list(string))<br/><br/>            # Defines set of configuration blocks describing the source ports to inspect for.<br/>            # If not specified, this matches with any source port.<br/>            # from_port -- the lower limit of the port range. This must be less than or equal to the to_port.<br/>            # to_port -- the upper limit of the port range. This must be greater than or equal to the from_port.<br/>            source_port = optional(list(object({<br/>              from_port = number<br/>              to_port   = optional(number)<br/>            })))<br/><br/>            # Defines set of configuration blocks containing the TCP flags and masks to inspect for.<br/>            # If not specified, this matches with any settings.<br/>            # flags -- set of flags to look for in a packet. This setting can only specify values that are also specified in masks.<br/>            # Valid values: FIN, SYN, RST, PSH, ACK, URG, ECE, CWR.<br/>            # masks -- set of flags to consider in the inspection. To inspect all flags, leave this empty.<br/>            # Valid values: FIN, SYN, RST, PSH, ACK, URG, ECE, CWR.<br/>            tcp_flag = optional(list(object({<br/>              flags = list(string)<br/>              masks = optional(list(string))<br/>            })))<br/>          }))<br/>        }))<br/>      })<br/>    }))<br/>  }))` | `{}` | no |
| <a name="input_stateful_default_actions"></a> [stateful_default_actions](#input_stateful_default_actions) | Default stateful actions | `list(string)` | `[<br/>  "aws:alert_strict"<br/>]` | no |
| <a name="input_stateless_default_actions"></a> [stateless_default_actions](#input_stateless_default_actions) | Default stateless actions | `list(string)` | `[<br/>  "aws:forward_to_sfe"<br/>]` | no |
| <a name="input_stateless_fragment_default_actions"></a> [stateless_fragment_default_actions](#input_stateless_fragment_default_actions) | Default stateless actions for fragmented packets | `list(string)` | `[<br/>  "aws:forward_to_sfe"<br/>]` | no |
| <a name="input_subnet_change_protection"></a> [subnet_change_protection](#input_subnet_change_protection) | A flag indicating whether the firewall is protected against changes to the subnet associations. Use this setting to protect against accidentally modifying the subnet associations for a firewall that is in use. | `bool` | `false` | no |
| <a name="input_tags"></a> [tags](#input_tags) | A mapping of tags to assign to the resource. | `map(string)` | `{}` | no |
| <a name="input_vpc_id"></a> [vpc_id](#input_vpc_id) | Required parameters | `string` | n/a | yes |
| <a name="input_vpc_name"></a> [vpc_name](#input_vpc_name) | n/a | `string` | n/a | yes |

## Outputs

| Name | Description |
|------|-------------|
| <a name="output_network_firewall_endpoints"></a> [network_firewall_endpoints](#output_network_firewall_endpoints) | A map of AZs to Network Firewall Endpoint IDs used for routing establishment purposes. |

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S NETWORK-FIREWALL MODULE
# ------------------------------------------------------------------------------------------------------

module "network_firewall" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-vpc.git//modules/network-firewall?ref=v0.28.6"

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # A flag indicating whether the firewall is protected against deletion. Use
  # this setting to protect against accidentally deleting a firewall that is in
  # use.
  delete_protection = false

  # Configuration block with encryption options for the firewall. Leave blank to
  # use AWS managed KMS encryption. See variable definition for details.
  encryption_configuration = []

  # A flag indicating whether the firewall is protected against a change to the
  # firewall policy association. Use this setting to protect against
  # accidentally modifying the firewall policy for a firewall that is in use.
  firewall_policy_change_protection = false

  # A list of AWS Managed Rule Groups names to associate with the firewall
  # policy. Example: ["AbusedLegitMalwareDomainsActionOrder",
  # "ThreatSignaturesWebAttacksActionOrder"]. More:
  # https://docs.aws.amazon.com/network-firewall/latest/developerguide/aws-managed-rule-groups-list.html
  managed_stateful_rule_groups_to_associate = []

  # Indicates how to manage the order of stateful rule evaluation for the
  # policy. Default value: DEFAULT_ACTION_ORDER. Valid values:
  # DEFAULT_ACTION_ORDER, STRICT_ORDER (recommended).
  policy_stateful_engine_options_rule_order = "DEFAULT_ACTION_ORDER"

  # A map of rule group configurations to associate with the firewall policy.
  # See variable definition for details
  rule_group_config = {}

  # Default stateful actions
  stateful_default_actions = ["aws:alert_strict"]

  # Default stateless actions
  stateless_default_actions = ["aws:forward_to_sfe"]

  # Default stateless actions for fragmented packets
  stateless_fragment_default_actions = ["aws:forward_to_sfe"]

  # A flag indicating whether the firewall is protected against changes to the
  # subnet associations. Use this setting to protect against accidentally
  # modifying the subnet associations for a firewall that is in use.
  subnet_change_protection = false

  # A mapping of tags to assign to the resource.
  tags = {}

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S NETWORK-FIREWALL MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-vpc.git//modules/network-firewall?ref=v0.28.6"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # A flag indicating whether the firewall is protected against deletion. Use
  # this setting to protect against accidentally deleting a firewall that is in
  # use.
  delete_protection = false

  # Configuration block with encryption options for the firewall. Leave blank to
  # use AWS managed KMS encryption. See variable definition for details.
  encryption_configuration = []

  # A flag indicating whether the firewall is protected against a change to the
  # firewall policy association. Use this setting to protect against
  # accidentally modifying the firewall policy for a firewall that is in use.
  firewall_policy_change_protection = false

  # A list of AWS Managed Rule Groups names to associate with the firewall
  # policy. Example: ["AbusedLegitMalwareDomainsActionOrder",
  # "ThreatSignaturesWebAttacksActionOrder"]. More:
  # https://docs.aws.amazon.com/network-firewall/latest/developerguide/aws-managed-rule-groups-list.html
  managed_stateful_rule_groups_to_associate = []

  # Indicates how to manage the order of stateful rule evaluation for the
  # policy. Default value: DEFAULT_ACTION_ORDER. Valid values:
  # DEFAULT_ACTION_ORDER, STRICT_ORDER (recommended).
  policy_stateful_engine_options_rule_order = "DEFAULT_ACTION_ORDER"

  # A map of rule group configurations to associate with the firewall policy.
  # See variable definition for details
  rule_group_config = {}

  # Default stateful actions
  stateful_default_actions = ["aws:alert_strict"]

  # Default stateless actions
  stateless_default_actions = ["aws:forward_to_sfe"]

  # Default stateless actions for fragmented packets
  stateless_fragment_default_actions = ["aws:forward_to_sfe"]

  # A flag indicating whether the firewall is protected against changes to the
  # subnet associations. Use this setting to protect against accidentally
  # modifying the subnet associations for a firewall that is in use.
  subnet_change_protection = false

  # A mapping of tags to assign to the resource.
  tags = {}

}


```

</TabItem>
</Tabs>




## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Optional

<HclListItem name="delete_protection" requirement="optional" type="bool">
<HclListItemDescription>

A flag indicating whether the firewall is protected against deletion. Use this setting to protect against accidentally deleting a firewall that is in use.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="encryption_configuration" requirement="optional" type="list(object(…))">
<HclListItemDescription>

Configuration block with encryption options for the firewall. Leave blank to use AWS managed KMS encryption. See variable definition for details.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
list(object({
    # The ID of the customer managed key. If you're using a key managed by another account, then specify the key ARN.
    # You can use any of the key identifiers that KMS supports, unless you're using a key that's managed by another account.
    key_id = optional(string)

    # The type of AWS KMS key to use for encryption of your Network Firewall resources.
    # Valid values: CUSTOMER_KMS, AWS_OWNED_KMS_KEY.
    type = string
  }))
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="[]"/>
<HclGeneralListItem title="More Details">
<details>


```hcl

 Optional - Shared parameters

```
</details>

<details>


```hcl

     The type of AWS KMS key to use for encryption of your Network Firewall resources.
     Valid values: CUSTOMER_KMS, AWS_OWNED_KMS_KEY.

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="firewall_policy_change_protection" requirement="optional" type="bool">
<HclListItemDescription>

A flag indicating whether the firewall is protected against a change to the firewall policy association. Use this setting to protect against accidentally modifying the firewall policy for a firewall that is in use.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="managed_stateful_rule_groups_to_associate" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of AWS Managed Rule Groups names to associate with the firewall policy. Example: ['AbusedLegitMalwareDomainsActionOrder', 'ThreatSignaturesWebAttacksActionOrder']. More: https://docs.aws.amazon.com/network-firewall/latest/developerguide/aws-managed-rule-groups-list.html

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="policy_stateful_engine_options_rule_order" requirement="optional" type="string">
<HclListItemDescription>

Indicates how to manage the order of stateful rule evaluation for the policy. Default value: DEFAULT_ACTION_ORDER. Valid values: DEFAULT_ACTION_ORDER, STRICT_ORDER (recommended).

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;DEFAULT_ACTION_ORDER&quot;"/>
</HclListItem>

<HclListItem name="rule_group_config" requirement="optional" type="map(object(…))">
<HclListItemDescription>

A map of rule group configurations to associate with the firewall policy. See variable definition for details

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
map(object({
    # Description of the rule group.
    description = optional(string)

    # Type of the rule group.
    # Valid values: STATEFUL or STATELESS.
    type = string

    # Capacity units consumed by rule groups. Max: 30000.
    # When 30000 is set, one firewall policy fits one rule group.
    # When 5000 is set, one firewall policy fits six rule groups.
    # More: https://docs.aws.amazon.com/network-firewall/latest/developerguide/firewall-policy-settings.html#firewall-policy-capacity
    capacity = number

    # The stateful rule group rules specifications in Suricata file format, with one rule per line.
    # Use this to import your existing Suricata compatible rule groups.
    # Required unless rule_group is specified.
    # Example: "example.rules"
    rules = optional(string)

    # Defines rule groups.
    rule_group = optional(object({

      # Defines additional settings available to use in the rules defined in the rule group.
      # Valid only for STATEFUL rule groups.
      rule_variables = optional(object({

        # Defines IP address information.
        # Map key is a unique alphanumeric string to identify the ip_set.
        # Map value is a set of IP addresses and address ranges, in CIDR notation.
        ip_sets = optional(map(list(string)), {})

        # Defines port range information.
        # Map key is an unique alphanumeric string to identify the port_set.
        # Map value is a set of port ranges.
        port_sets = optional(map(list(string)), {})
      }))

      # Defines STATEFUL rule options for the rule group.
      # Valid values: "DEFAULT_ACTION_ORDER", "STRICT_ORDER". Recommended value: "STRICT_ORDER".
      # If STRICT_ORDER is specified, this rule group can only be referenced in firewall policies
      # that also utilize STRICT_ORDER for the stateful engine. STRICT_ORDER can only be specified
      # when using a rules_source of rules_string or stateful_rule.
      # More: https://docs.aws.amazon.com/network-firewall/latest/developerguide/suricata-rule-evaluation-order.html
      stateful_rule_options = optional(object({ rule_order = string }))

      # Defines the stateful or stateless rules for the rule group.
      # Valid values: "rules_source_list", "stateful_rule" or "stateless_rules_and_custom_actions".
      # Only one of valid values must be specified.
      rules_source = object({

        # The fully qualified name of a local file or file in an S3 bucket that contains Suricata compatible intrusion
        # preventions system (IPS) rules or the Suricata rules as a string. These rules contain stateful
        # inspection criteria and the action to take for traffic that matches the criteria.
        rules_string = optional(string)

        # Defines stateful inspection criteria for a domain list rule group.
        rules_source_list = optional(object({
          # Defines the type of domain list rule group.
          # Valid values: "ALLOWLIST", "DENYLIST".
          generated_rules_type = string

          # Defines the types of domain specifications that are provided in the targets argument.
          # Valid values: "HTTP_HOST", "TLS_SNI".
          target_types = list(string)

          # Defines the domains that you want to inspect for in your traffic flows.
          targets = list(string)
        }))

        # Defines stateful inspection criteria for 5-tuple rules to be used together in a rule group.
        stateful_rule = optional(map(object({

          # Action to take with packets in a traffic flow when the flow matches the stateful rule criteria.
          # For all actions, AWS Network Firewall performs the specified action and discontinues stateful inspection of the traffic flow.
          # Valid values: "ALERT", "DROP", "PASS".
          action = string

          # Stateful 5-tuple inspection criteria for the rule, used to inspect traffic flows.
          # The destination IP address or address range to inspect for, in CIDR notation. To match with any address, specify ANY.
          # The destination port to inspect for. To match with any address, specify ANY.
          # The direction of traffic flow to inspect. Valid values: ANY or FORWARD.
          # The protocol to inspect. Valid values: IP, TCP, UDP, ICMP, HTTP, FTP, TLS, SMB, DNS, DCERPC, SSH, SMTP, IMAP, MSN, KRB5, IKEV2, TFTP, NTP, DHCP.
          # The source IP address or address range for, in CIDR notation. To match with any address, specify ANY.
          # The source port to inspect for. To match with any address, specify ANY.
          destination      = string
          destination_port = string
          direction        = string
          protocol         = string
          source           = string
          source_port      = string

          # Define additional settings for a stateful rule.
          # Map key is a keyword defined by open source detection systems like Snort or Suricata for stateful rule inspection.
          # Snort General Rule Options: http://manual-snort-org.s3-website-us-east-1.amazonaws.com/node31.html
          # Suricata Rule Options: https://docs.suricata.io/en/suricata-5.0.1/rules/intro.html#rule-options
          # Map value is a set of strings for additional settings to use in stateful rule inspection.
          # Example: {"sid" = ["1"]}
          rule_options = map(list(string))
        })))

        # Defines stateless inspection criteria for a stateless rule group.
        stateless_rules_and_custom_actions = optional(object({
          # Defines stateless rules for use in the stateless rule group.
          # Map's key is a number that indicates the order in which to run this rule relative to all of the rules that are defined for a stateless rule group.
          # AWS Network Firewall evaluates the rules in a rule group starting with the lowest priority setting.
          stateless_rule = map(object({

            # Set of actions to take on a packet that matches one of the stateless rule definition's match_attributes.
            # For every rule you must specify 1 standard action.
            # Standard actions include: aws:pass, aws:drop, aws:forward_to_sfe.
            actions = list(string)

            # Set of protocols to inspect for, specified using the protocol's assigned internet protocol number (IANA).
            # If not specified, this matches with any protocol.
            # More: https://www.pcmag.com/encyclopedia/term/ip-protocol-number
            protocols = optional(list(number))

            # Defines set of destination IP addresses and address ranges to inspect for, in CIDR notation.
            # If not specified, this matches with any destination address.
            destination = optional(list(string), [])

            # Defines set of configuration blocks describing the destination ports to inspect for.
            # If not specified, this matches with any destination port.
            # from_port -- the lower limit of the port range. This must be less than or equal to the to_port.
            # to_port -- the upper limit of the port range. This must be greater than or equal to the from_port.
            destination_port = optional(list(object({
              from_port = number
              to_port   = optional(number)
            })))

            # Defines set of configuration blocks describing the source IP address and address ranges to inspect for, in CIDR notation.
            # If not specified, this matches with any source address.
            source = optional(list(string))

            # Defines set of configuration blocks describing the source ports to inspect for.
            # If not specified, this matches with any source port.
            # from_port -- the lower limit of the port range. This must be less than or equal to the to_port.
            # to_port -- the upper limit of the port range. This must be greater than or equal to the from_port.
            source_port = optional(list(object({
              from_port = number
              to_port   = optional(number)
            })))

            # Defines set of configuration blocks containing the TCP flags and masks to inspect for.
            # If not specified, this matches with any settings.
            # flags -- set of flags to look for in a packet. This setting can only specify values that are also specified in masks.
            # Valid values: FIN, SYN, RST, PSH, ACK, URG, ECE, CWR.
            # masks -- set of flags to consider in the inspection. To inspect all flags, leave this empty.
            # Valid values: FIN, SYN, RST, PSH, ACK, URG, ECE, CWR.
            tcp_flag = optional(list(object({
              flags = list(string)
              masks = optional(list(string))
            })))
          }))
        }))
      })
    }))
  }))
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="{}"/>
<HclGeneralListItem title="More Details">
<details>


```hcl

   Map's key is a unique alphanumeric string to identify the rule group configuration.
   Must have 1-128 characters. Valid characters: a-z, A-Z, 0-9 and - (hyphen).

```
</details>

<details>


```hcl

     Type of the rule group.
     Valid values: STATEFUL or STATELESS.

```
</details>

<details>


```hcl

     Capacity units consumed by rule groups. Max: 30000.
     When 30000 is set, one firewall policy fits one rule group.
     When 5000 is set, one firewall policy fits six rule groups.
     More: https://docs.aws.amazon.com/network-firewall/latest/developerguide/firewall-policy-settings.htmlfirewall-policy-capacity

```
</details>

<details>


```hcl

     The stateful rule group rules specifications in Suricata file format, with one rule per line.
     Use this to import your existing Suricata compatible rule groups.
     Required unless rule_group is specified.
     Example: "example.rules"

```
</details>

<details>


```hcl

     Defines rule groups.

```
</details>

<details>


```hcl

       Defines additional settings available to use in the rules defined in the rule group.
       Valid only for STATEFUL rule groups.

```
</details>

<details>


```hcl

         Defines IP address information.
         Map key is a unique alphanumeric string to identify the ip_set.
         Map value is a set of IP addresses and address ranges, in CIDR notation.

```
</details>

<details>


```hcl

         Defines port range information.
         Map key is an unique alphanumeric string to identify the port_set.
         Map value is a set of port ranges.

```
</details>

<details>


```hcl

       Defines STATEFUL rule options for the rule group.
       Valid values: "DEFAULT_ACTION_ORDER", "STRICT_ORDER". Recommended value: "STRICT_ORDER".
       If STRICT_ORDER is specified, this rule group can only be referenced in firewall policies
       that also utilize STRICT_ORDER for the stateful engine. STRICT_ORDER can only be specified
       when using a rules_source of rules_string or stateful_rule.
       More: https://docs.aws.amazon.com/network-firewall/latest/developerguide/suricata-rule-evaluation-order.html

```
</details>

<details>


```hcl

       Defines the stateful or stateless rules for the rule group.
       Valid values: "rules_source_list", "stateful_rule" or "stateless_rules_and_custom_actions".
       Only one of valid values must be specified.

```
</details>

<details>


```hcl

         The fully qualified name of a local file or file in an S3 bucket that contains Suricata compatible intrusion
         preventions system (IPS) rules or the Suricata rules as a string. These rules contain stateful
         inspection criteria and the action to take for traffic that matches the criteria.

```
</details>

<details>


```hcl

         Defines stateful inspection criteria for a domain list rule group.

```
</details>

<details>


```hcl

           Defines the types of domain specifications that are provided in the targets argument.
           Valid values: "HTTP_HOST", "TLS_SNI".

```
</details>

<details>


```hcl

           Defines the domains that you want to inspect for in your traffic flows.

```
</details>

<details>


```hcl

         Defines stateful inspection criteria for 5-tuple rules to be used together in a rule group.

```
</details>

<details>


```hcl

           Action to take with packets in a traffic flow when the flow matches the stateful rule criteria.
           For all actions, AWS Network Firewall performs the specified action and discontinues stateful inspection of the traffic flow.
           Valid values: "ALERT", "DROP", "PASS".

```
</details>

<details>


```hcl

           Stateful 5-tuple inspection criteria for the rule, used to inspect traffic flows.
           The destination IP address or address range to inspect for, in CIDR notation. To match with any address, specify ANY.
           The destination port to inspect for. To match with any address, specify ANY.
           The direction of traffic flow to inspect. Valid values: ANY or FORWARD.
           The protocol to inspect. Valid values: IP, TCP, UDP, ICMP, HTTP, FTP, TLS, SMB, DNS, DCERPC, SSH, SMTP, IMAP, MSN, KRB5, IKEV2, TFTP, NTP, DHCP.
           The source IP address or address range for, in CIDR notation. To match with any address, specify ANY.
           The source port to inspect for. To match with any address, specify ANY.

```
</details>

<details>


```hcl

           Define additional settings for a stateful rule.
           Map key is a keyword defined by open source detection systems like Snort or Suricata for stateful rule inspection.
           Snort General Rule Options: http://manual-snort-org.s3-website-us-east-1.amazonaws.com/node31.html
           Suricata Rule Options: https://docs.suricata.io/en/suricata-5.0.1/rules/intro.htmlrule-options
           Map value is a set of strings for additional settings to use in stateful rule inspection.
           Example: {"sid" = ["1"]}

```
</details>

<details>


```hcl

         Defines stateless inspection criteria for a stateless rule group.

```
</details>

<details>


```hcl

             Set of actions to take on a packet that matches one of the stateless rule definition's match_attributes.
             For every rule you must specify 1 standard action.
             Standard actions include: aws:pass, aws:drop, aws:forward_to_sfe.

```
</details>

<details>


```hcl

             Set of protocols to inspect for, specified using the protocol's assigned internet protocol number (IANA).
             If not specified, this matches with any protocol.
             More: https://www.pcmag.com/encyclopedia/term/ip-protocol-number

```
</details>

<details>


```hcl

             Defines set of destination IP addresses and address ranges to inspect for, in CIDR notation.
             If not specified, this matches with any destination address.

```
</details>

<details>


```hcl

             Defines set of configuration blocks describing the destination ports to inspect for.
             If not specified, this matches with any destination port.
             from_port -- the lower limit of the port range. This must be less than or equal to the to_port.
             to_port -- the upper limit of the port range. This must be greater than or equal to the from_port.

```
</details>

<details>


```hcl

             Defines set of configuration blocks describing the source IP address and address ranges to inspect for, in CIDR notation.
             If not specified, this matches with any source address.

```
</details>

<details>


```hcl

             Defines set of configuration blocks describing the source ports to inspect for.
             If not specified, this matches with any source port.
             from_port -- the lower limit of the port range. This must be less than or equal to the to_port.
             to_port -- the upper limit of the port range. This must be greater than or equal to the from_port.

```
</details>

<details>


```hcl

             Defines set of configuration blocks containing the TCP flags and masks to inspect for.
             If not specified, this matches with any settings.
             flags -- set of flags to look for in a packet. This setting can only specify values that are also specified in masks.
             Valid values: FIN, SYN, RST, PSH, ACK, URG, ECE, CWR.
             masks -- set of flags to consider in the inspection. To inspect all flags, leave this empty.
             Valid values: FIN, SYN, RST, PSH, ACK, URG, ECE, CWR.

```
</details>

<details>


```hcl

   Sample rule group configuration.

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="stateful_default_actions" requirement="optional" type="list(string)">
<HclListItemDescription>

Default stateful actions

</HclListItemDescription>
<HclListItemDefaultValue>

```hcl
[
  "aws:alert_strict"
]
```

</HclListItemDefaultValue>
</HclListItem>

<HclListItem name="stateless_default_actions" requirement="optional" type="list(string)">
<HclListItemDescription>

Default stateless actions

</HclListItemDescription>
<HclListItemDefaultValue>

```hcl
[
  "aws:forward_to_sfe"
]
```

</HclListItemDefaultValue>
</HclListItem>

<HclListItem name="stateless_fragment_default_actions" requirement="optional" type="list(string)">
<HclListItemDescription>

Default stateless actions for fragmented packets

</HclListItemDescription>
<HclListItemDefaultValue>

```hcl
[
  "aws:forward_to_sfe"
]
```

</HclListItemDefaultValue>
</HclListItem>

<HclListItem name="subnet_change_protection" requirement="optional" type="bool">
<HclListItemDescription>

A flag indicating whether the firewall is protected against changes to the subnet associations. Use this setting to protect against accidentally modifying the subnet associations for a firewall that is in use.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="tags" requirement="optional" type="map(string)">
<HclListItemDescription>

A mapping of tags to assign to the resource.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="network_firewall_endpoints">
<HclListItemDescription>

A map of AZs to Network Firewall Endpoint IDs used for routing establishment purposes.

</HclListItemDescription>
</HclListItem>

</TabItem>
</Tabs>

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.28.6/modules/network-firewall/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.28.6/modules/network-firewall/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.28.6/modules/network-firewall/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "eb6e474de1e823b3474491f28c340655"
}
##DOCS-SOURCER-END -->

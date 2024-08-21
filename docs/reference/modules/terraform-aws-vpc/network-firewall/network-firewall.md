---
title: "Network Firewall Terraform Module"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="VPC Modules" version="0.26.24" />

# Network Firewall Terraform Module

<a href="https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.26.24/modules/network-firewall" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases?q=network-firewall" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This Terraform module creates a Network Firewall resource. A network firewall is a managed service that allows you to filter and monitor network traffic. This module creates a Firewall Policy, Rule Group, and Firewall.

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S NETWORK-FIREWALL MODULE
# ------------------------------------------------------------------------------------------------------

module "network_firewall" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-vpc.git//modules/network-firewall?ref=v0.26.24"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # A friendly name of the firewall.
  name = <string>

  # A friendly name of the firewall policy.
  policy_name = <string>

  # A map of rule group configurations to associate with the firewall policy.
  rule_groups = <map(object(
    capacity    = number
    description = optional(string)
    name        = string
    type        = optional(string, "STATEFUL")
    stateful_rules = list(object(
      action      = string
      description = optional(string)
      header = object(
        destination      = string
        destination_port = string
        direction        = string
        protocol         = string
        source           = string
        source_port      = string
      )
      rule_option = object(
        keyword  = string
        settings = list(string)
      )
    ))
  ))>

  # The unique identifier of the subnet where the firewall should be created.
  subnet_id = <string>

  # The unique identifier of the VPC where the firewall should be created.
  vpc_id = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # A boolean flag indicating whether the firewall is protected from accidential
  # deletion. Default is false.
  delete_protection = false

  # A description of the firewall.
  description = null

  # Configuration block with encryption options for the firewall. Leave blank to
  # use AWS managed KMS encryption.
  encryption_configuration = []

  # A boolean flag indicating whether it is possible to change the associated
  # firewall policy. Default is false.
  firewall_policy_change_protection = false

  # The IP address type to use in the subnet mapping.
  ip_address_type = "IPV4"

  # A description of the firewall policy.
  policy_description = null

  # A set of stateful default actions to take on a packet if it doesn't match
  # any stateful rule.
  stateful_default_actions = ["aws:drop_established"]

  # A set of stateful engine options to configure the behavior of the stateful
  # rule engine.
  stateful_engine_options = {"rule_order":"DEFAULT_ACTION_ORDER","stream_exception_policy":"DROP"}

  # A set of stateless default actions to take on a packet if it doesn't match
  # any stateless rule.
  stateless_default_actions = ["aws:drop"]

  # A set of stateless default actions to take on a fragmented packet if it
  # doesn't match any stateless rule.
  stateless_fragment_default_actions = ["aws:drop"]

  # A boolean flag indicating whether it is possible to change the associated
  # subnet. Default is false.
  subnet_change_protection = false

  # A mapping of tags to assign to the resource.
  tags = {}

  # The ARN of the TLS inspection configuration to use in the firewall policy.
  tls_inspection_configuration_arn = null

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S NETWORK-FIREWALL MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-vpc.git//modules/network-firewall?ref=v0.26.24"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # A friendly name of the firewall.
  name = <string>

  # A friendly name of the firewall policy.
  policy_name = <string>

  # A map of rule group configurations to associate with the firewall policy.
  rule_groups = <map(object(
    capacity    = number
    description = optional(string)
    name        = string
    type        = optional(string, "STATEFUL")
    stateful_rules = list(object(
      action      = string
      description = optional(string)
      header = object(
        destination      = string
        destination_port = string
        direction        = string
        protocol         = string
        source           = string
        source_port      = string
      )
      rule_option = object(
        keyword  = string
        settings = list(string)
      )
    ))
  ))>

  # The unique identifier of the subnet where the firewall should be created.
  subnet_id = <string>

  # The unique identifier of the VPC where the firewall should be created.
  vpc_id = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # A boolean flag indicating whether the firewall is protected from accidential
  # deletion. Default is false.
  delete_protection = false

  # A description of the firewall.
  description = null

  # Configuration block with encryption options for the firewall. Leave blank to
  # use AWS managed KMS encryption.
  encryption_configuration = []

  # A boolean flag indicating whether it is possible to change the associated
  # firewall policy. Default is false.
  firewall_policy_change_protection = false

  # The IP address type to use in the subnet mapping.
  ip_address_type = "IPV4"

  # A description of the firewall policy.
  policy_description = null

  # A set of stateful default actions to take on a packet if it doesn't match
  # any stateful rule.
  stateful_default_actions = ["aws:drop_established"]

  # A set of stateful engine options to configure the behavior of the stateful
  # rule engine.
  stateful_engine_options = {"rule_order":"DEFAULT_ACTION_ORDER","stream_exception_policy":"DROP"}

  # A set of stateless default actions to take on a packet if it doesn't match
  # any stateless rule.
  stateless_default_actions = ["aws:drop"]

  # A set of stateless default actions to take on a fragmented packet if it
  # doesn't match any stateless rule.
  stateless_fragment_default_actions = ["aws:drop"]

  # A boolean flag indicating whether it is possible to change the associated
  # subnet. Default is false.
  subnet_change_protection = false

  # A mapping of tags to assign to the resource.
  tags = {}

  # The ARN of the TLS inspection configuration to use in the firewall policy.
  tls_inspection_configuration_arn = null

}


```

</TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.26.24/modules/network-firewall/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.26.24/modules/network-firewall/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.26.24/modules/network-firewall/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "7431d4e6b477de5dc993fcea04f4c548"
}
##DOCS-SOURCER-END -->

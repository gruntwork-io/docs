---
title: "Kibana Security Group Rules Module"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="ELK AWS Module" version="0.11.1" />

# Kibana Security Group Rules Module

<a href="https://github.com/gruntwork-io/terraform-aws-elk/tree/master/modules/kibana-security-group-rules" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-elk/releases?q=" className="link-button" title="Release notes for only the service catalog versions which impacted this service.">Release Notes</a>

This folder contains a [Terraform](https://www.terraform.io/) module that defines the Security Group rules used by a
[Kibana](https://www.elastic.co/products/kibana) cluster to control the traffic that is allowed to go in and out of the cluster.
These rules are defined in a separate module so that you can add them to any existing Security Group.

## Quick start

Let's say you want to deploy Kibana using the [kibana-cluster module](https://github.com/gruntwork-io/terraform-aws-elk/tree/master/modules/kibana-cluster):

```hcl
module "kibana_cluster" {
  # TODO: replace <VERSION> with the latest version from the releases page: https://github.com/gruntwork-io/terraform-aws-elk/releases
  source = "github.com/gruntwork-io/terraform-aws-elk//modules/kibana-cluster?ref=<VERSION>"

  # ... (other params omitted) ...
}
```

You can attach the Security Group rules to this cluster as follows:

```hcl
module "security_group_rules" {
  # TODO: replace <VERSION> with the latest version from the releases page: https://github.com/gruntwork-io/terraform-aws-elk/releases
  source = "github.com/gruntwork-io/terraform-aws-elk//modules/kibana-security-group-rules?ref=<VERSION>"

  security_group_id = module.kibana_cluster.security_group_id
  
  kibana_ui_port                    = 5601
  allow_ui_from_cidr_blocks         = ["0.0.0.0/0"]
  allow_ui_from_security_group_ids  = ["sg-abcd1234"]
  
  # ... (other params omitted) ...
}
```

Note the following parameters:

*   `source`: Use this parameter to specify the URL of this module. The double slash (`//`) is intentional
    and required. Terraform uses it to specify subfolders within a Git repo (see [module
    sources](https://www.terraform.io/docs/modules/sources.html)). The `ref` parameter specifies a specific Git tag in
    this repo. That way, instead of using the latest version of this module from the `master` branch, which
    will change every time you run Terraform, you're using a fixed version of the repo.

*   `security_group_id`: Use this parameter to specify the ID of the security group to which the rules in this module
    should be added.

You can find the other parameters in [variables.tf](https://github.com/gruntwork-io/terraform-aws-elk/tree/master/modules/kibana-security-group-rules/variables.tf).

Check out the [examples folder](https://github.com/gruntwork-io/terraform-aws-elk/tree/master/examples) for working sample code.

## Sample Usage

<ModuleUsage>

```hcl title="main.tf"

# ---------------------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S KIBANA-SECURITY-GROUP-RULES MODULE
# ---------------------------------------------------------------------------------------------------------------------

module "kibana-security-group-rules" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-elk.git//modules/kibana-security-group-rules?ref=v0.11.1"

  # ---------------------------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ---------------------------------------------------------------------------------------------------------------------

  # The ID of the Security Group to which all the rules should be attached.
  security_group_id = <INPUT REQUIRED>

  # ---------------------------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ---------------------------------------------------------------------------------------------------------------------

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

  # This is the port that is used to access the Kibana UI.
  kibana_ui_port = 5601

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

  # The port to use for SSH access.
  ssh_port = 22

}

```

</ModuleUsage>


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-elk/tree/master/modules/kibana-security-group-rules/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-elk/tree/master/modules/kibana-security-group-rules/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-elk/tree/master/modules/kibana-security-group-rules/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "730caebf3e857427be808f3c8c338910"
}
##DOCS-SOURCER-END -->

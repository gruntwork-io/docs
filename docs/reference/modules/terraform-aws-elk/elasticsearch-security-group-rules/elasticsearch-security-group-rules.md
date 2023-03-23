---
title: "Elasticsearch Security Group Rules Module"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="ELK AWS Module" version="0.11.1" lastModifiedVersion="0.11.0"/>

# Elasticsearch Security Group Rules Module

<a href="https://github.com/gruntwork-io/terraform-aws-elk/tree/master/modules/elasticsearch-security-group-rules" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-elk/releases/tag/v0.11.0" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This folder contains a [Terraform](https://www.terraform.io/) module that defines the Security Group rules used by a
[Elasticsearch](https://www.elastic.co/) cluster to control the traffic that is allowed to go in and out of the cluster.
These rules are defined in a separate module so that you can add them to any existing Security Group.

## Quick start

Let's say you want to deploy Elasticsearch using the [elasticsearch-cluster module](https://github.com/gruntwork-io/terraform-aws-elk/tree/master/modules/elasticsearch-cluster):

```hcl
module "elasticsearch_cluster" {
  # TODO: replace <VERSION> with the latest version from the releases page: https://github.com/gruntwork-io/terraform-aws-elk/releases
  source = "github.com/gruntwork-io/terraform-aws-elk//modules/elasticsearch-cluster?ref=<VERSION>"

  # ... (other params omitted) ...
}
```

You can attach the Security Group rules to this cluster as follows:

```hcl
module "security_group_rules" {
  # TODO: replace <VERSION> with the latest version from the releases page: https://github.com/gruntwork-io/terraform-aws-elk/releases
  source = "github.com/gruntwork-io/terraform-aws-elk//modules/elasticsearch-security-group-rules?ref=<VERSION>"

  security_group_id = module.elasticsearch_cluster.security_group_id
  
  rest_port_range_start     = 9200
  rest_port_range_end       = 9300
  rest_port_cidr_blocks     = ["0.0.0.0/0"]
  rest_port_security_groups = ["sg-abcd1234"]
  
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

*   `rest_port_range_start`, `rest_port_range_end`, `rest_port_cidr_blocks`, `rest_port_security_groups`: This shows an
    example of how to configure which ports you're using for various Elasticsearch functionality, such as the REST port
    range, and which IP address ranges and Security Groups are allowed to connect to that port. Check out the [HTTP Settings
    documentation](https://www.elastic.co/guide/en/elasticsearch/reference/6.8/modules-http.html) to understand what ports
    Elasticsearch uses.

You can find the other parameters in [variables.tf](https://github.com/gruntwork-io/terraform-aws-elk/tree/master/modules/elasticsearch-security-group-rules/variables.tf).

Check out the [examples folder](https://github.com/gruntwork-io/terraform-aws-elk/tree/master/examples) for working sample code.

## Sample Usage

<ModuleUsage>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S ELASTICSEARCH-SECURITY-GROUP-RULES MODULE
# ------------------------------------------------------------------------------------------------------

module "elasticsearch_security_group_rules" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-elk.git//modules/elasticsearch-security-group-rules?ref=v0.11.1"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The ID of the Security Group to which all the rules should be attached.
  security_group_id = <INPUT REQUIRED>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The IDs of security groups from which ES API connections will be allowed. If you
  # update this variable, make sure to update var.num_api_security_group_ids too!
  allow_api_from_security_group_ids = []

  # The IDs of security groups from which ES API connections will be allowed. If you
  # update this variable, make sure to update
  # var.num_node_discovery_security_group_ids too!
  allow_node_discovery_from_security_group_ids = []

  # The list of IP address ranges in CIDR notation from which to allow connections
  # to the rest_port.
  allowed_cidr_blocks = []

  # This is the port that is used to access elasticsearch for user queries
  api_port = 9200

  # This is the port that is used internally by elasticsearch for cluster node
  # discovery
  node_discovery_port = 9300

  # The number of security group IDs in var.allow_api_from_security_group_ids. We
  # should be able to compute this automatically, but due to a Terraform limitation,
  # if there are any dynamic resources in var.allow_api_from_security_group_ids,
  # then we won't be able to: https://github.com/hashicorp/terraform/pull/11482
  num_api_security_group_ids = 0

  # The number of security group IDs in
  # var.allow_node_discovery_from_security_group_ids. We should be able to compute
  # this automatically, but due to a Terraform limitation, if there are any dynamic
  # resources in var.allow_node_discovery_from_security_group_ids, then we won't be
  # able to: https://github.com/hashicorp/terraform/pull/11482
  num_node_discovery_security_group_ids = 0

}

```

</ModuleUsage>


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-elk/tree/master/modules/elasticsearch-security-group-rules/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-elk/tree/master/modules/elasticsearch-security-group-rules/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-elk/tree/master/modules/elasticsearch-security-group-rules/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "575e1e844449f5206b9468e957383c56"
}
##DOCS-SOURCER-END -->

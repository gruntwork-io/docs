---
title: "ElastAlert Security Group Rules Module"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="ELK AWS Module" version="0.11.1" />

# ElastAlert Security Group Rules Module

<a href="https://github.com/gruntwork-io/terraform-aws-elk/tree/master/modules/elastalert-security-group-rules" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-elk/releases?q=" className="link-button" title="Release notes for only the service catalog versions which impacted this service.">Release Notes</a>

This folder contains a [Terraform](https://www.terraform.io/) module that defines the Security Group rules used by
[ElastAlert](https://github.com/Yelp/elastalert) to control the traffic that is allowed to go in and out of the cluster.
These rules are defined in a separate module so that you can add them to any existing Security Group.

## Quick start

Let's say you want to deploy ElastAlert using the [elastalert module](https://github.com/gruntwork-io/terraform-aws-elk/tree/master/modules/elastalert):

```hcl
module "elastalert_cluster" {
  # TODO: replace <VERSION> with the latest version from the releases page: https://github.com/gruntwork-io/terraform-aws-elk/releases
  source = "github.com/gruntwork-io/terraform-aws-elk//modules/elastalert?ref=<VERSION>"

  # ... (other params omitted) ...
}
```

You can attach the Security Group rules to this cluster as follows:

```hcl
module "elastalert_security_group_rules" {
  # TODO: replace <VERSION> with the latest version from the releases page: https://github.com/gruntwork-io/terraform-aws-elk/releases
  source = "github.com/gruntwork-io/terraform-aws-elk//modules/elastalert-security-group-rules?ref=<VERSION>"

  security_group_id = module.elasticsearch_cluster.security_group_id
  
  allow_ssh_from_cidr_blocks   = ["0.0.0.0/0"]  
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

You can find the other parameters in [variables.tf](https://github.com/gruntwork-io/terraform-aws-elk/tree/master/modules/elastalert-security-group-rules/variables.tf).

Check out the [elk-multi-cluster example](https://github.com/gruntwork-io/terraform-aws-elk/tree/master/examples/elk-multi-cluster) for working sample code.

## Sample Usage

<ModuleUsage>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S ELASTALERT-SECURITY-GROUP-RULES MODULE
# ------------------------------------------------------------------------------------------------------

module "elastalert_security_group_rules" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-elk.git//modules/elastalert-security-group-rules?ref=v0.11.1"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The ID of the Security Group to which all the rules should be attached.
  security_group_id = <INPUT REQUIRED>

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

  # The number of security group IDs in var.allow_ssh_from_security_group_ids. We
  # should be able to compute this automatically, but due to a Terraform limitation,
  # if there are any dynamic resources in var.allow_ssh_from_security_group_ids,
  # then we won't be able to: https://github.com/hashicorp/terraform/pull/11482
  num_ssh_security_group_ids = 0

  # The port to use for SSH access.
  ssh_port = 22

}

```

</ModuleUsage>


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-elk/tree/master/modules/elastalert-security-group-rules/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-elk/tree/master/modules/elastalert-security-group-rules/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-elk/tree/master/modules/elastalert-security-group-rules/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "b404ed18854acfdd1a4ee02f0849d50a"
}
##DOCS-SOURCER-END -->

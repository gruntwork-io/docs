---
title: "Logstash Security Group Rules Module"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="ELK AWS Module" version="0.11.1" />

# Logstash Security Group Rules Module

<a href="https://github.com/gruntwork-io/terraform-aws-elk/tree/master/modules/logstash-security-group-rules" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-elk/releases?q=" className="link-button" title="Release notes for only the service catalog versions which impacted this service.">Release Notes</a>

This folder contains a [Terraform](https://www.terraform.io/) module that defines the Security Group rules used by a
[Logstash](https://www.elastic.co/products/logstash) cluster to control the traffic that is allowed to go in and out of the cluster.
These rules are defined in a separate module so that you can add them to any existing Security Group.

## Quick start

Let's say you want to deploy Logstash using the [logstash-cluster module](https://github.com/gruntwork-io/terraform-aws-elk/tree/master/modules/logstash-cluster):

```hcl
module "logstash_cluster" {
  # TODO: replace <VERSION> with the latest version from the releases page: https://github.com/gruntwork-io/terraform-aws-elk/releases
  source = "github.com/gruntwork-io/terraform-aws-elk//modules/logstash-cluster?ref=<VERSION>"

  # ... (other params omitted) ...
}
```

You can attach the Security Group rules to this cluster as follows:

```hcl
module "security_group_rules" {
  # TODO: replace <VERSION> with the latest version from the releases page: https://github.com/gruntwork-io/terraform-aws-elk/releases
  source = "github.com/gruntwork-io/terraform-aws-elk//modules/logstash-security-group-rules?ref=<VERSION>"

  security_group_id = module.logstash_cluster.security_group_id

  beats_port_cidr_blocks         = ["0.0.0.0/0"]
  beats_port_security_groups     = ["sg-abcd1234"]
  num_beats_port_security_groups = 1

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

*   `beats_port_cidr_blocks`, `beats_port_security_groups`, `num_beats_port_security_groups`: This shows an example of how to configure which IP address ranges and Security Groups are allowed to connect to the `beats` (e.g. `Filebeat`) port that port.

You can find the other parameters in [vars.tf](https://github.com/gruntwork-io/terraform-aws-elk/tree/master/modules/logstash-security-group-rules/vars.tf).

Check out the [examples folder](https://github.com/gruntwork-io/terraform-aws-elk/tree/master/examples) for working sample code.

## Sample Usage

<ModuleUsage>

```hcl title="main.tf"

# ---------------------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S LOGSTASH-SECURITY-GROUP-RULES MODULE
# ---------------------------------------------------------------------------------------------------------------------

module "logstash-security-group-rules" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-elk.git//modules/logstash-security-group-rules?ref=v0.11.1"

  # ---------------------------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ---------------------------------------------------------------------------------------------------------------------

  # The port to use for BEATS requests. E.g. Filebeat
  beats_port = <INPUT REQUIRED>

  # The port to use for CollectD requests.
  collectd_port = <INPUT REQUIRED>

  # The ID of the Security Group to which all the rules should be attached.
  security_group_id = <INPUT REQUIRED>

  # ---------------------------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ---------------------------------------------------------------------------------------------------------------------

  # The list of IP address ranges in CIDR notation from which to allow connections
  # to the beats_port.
  beats_port_cidr_blocks = []

  # The list of Security Group IDs from which to allow connections to the
  # beats_port. If you update this variable, make sure to update
  # var.num_beats_port_security_groups too!
  beats_port_security_groups = []

  # The list of IP address ranges in CIDR notation from which to allow connections
  # to the collectd_port.
  collectd_port_cidr_blocks = []

  # The list of Security Group IDs from which to allow connections to the
  # collectd_port. If you update this variable, make sure to update
  # var.num_collectd_port_security_groups too!
  collectd_port_security_groups = []

  # The number of security group IDs in var.beats_port_security_groups. We should be
  # able to compute this automatically, but due to a Terraform limitation, if there
  # are any dynamic resources in var.beats_port_security_groups, then we won't be
  # able to: https://github.com/hashicorp/terraform/pull/11482
  num_beats_port_security_groups = 0

  # The number of security group IDs in var.collectd_port_security_groups. We should
  # be able to compute this automatically, but due to a Terraform limitation, if
  # there are any dynamic resources in var.collectd_port_security_groups, then we
  # won't be able to: https://github.com/hashicorp/terraform/pull/11482
  num_collectd_port_security_groups = 0

}

```

</ModuleUsage>




## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Required

<HclListItem name="beats_port" requirement="required" type="number">
<HclListItemDescription>

The port to use for BEATS requests. E.g. Filebeat

</HclListItemDescription>
</HclListItem>

<HclListItem name="collectd_port" requirement="required" type="number">
<HclListItemDescription>

The port to use for CollectD requests.

</HclListItemDescription>
</HclListItem>

<HclListItem name="security_group_id" requirement="required" type="string">
<HclListItemDescription>

The ID of the Security Group to which all the rules should be attached.

</HclListItemDescription>
</HclListItem>

### Optional

<HclListItem name="beats_port_cidr_blocks" requirement="optional" type="list(string)">
<HclListItemDescription>

The list of IP address ranges in CIDR notation from which to allow connections to the beats_port.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="beats_port_security_groups" requirement="optional" type="list(string)">
<HclListItemDescription>

The list of Security Group IDs from which to allow connections to the beats_port. If you update this variable, make sure to update <a href="#num_beats_port_security_groups"><code>num_beats_port_security_groups</code></a> too!

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="collectd_port_cidr_blocks" requirement="optional" type="list(string)">
<HclListItemDescription>

The list of IP address ranges in CIDR notation from which to allow connections to the collectd_port.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="collectd_port_security_groups" requirement="optional" type="list(string)">
<HclListItemDescription>

The list of Security Group IDs from which to allow connections to the collectd_port. If you update this variable, make sure to update <a href="#num_collectd_port_security_groups"><code>num_collectd_port_security_groups</code></a> too!

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
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

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="beats_port">
</HclListItem>

</TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-elk/tree/master/modules/logstash-security-group-rules/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-elk/tree/master/modules/logstash-security-group-rules/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-elk/tree/master/modules/logstash-security-group-rules/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "65bf90310f14c4e15db11c929d3c6fdb"
}
##DOCS-SOURCER-END -->

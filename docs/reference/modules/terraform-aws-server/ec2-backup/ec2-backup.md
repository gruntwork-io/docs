---
title: "EC2 Backup Module"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';

<a href="https://github.com/gruntwork-io/terraform-aws-server/tree/main/modules%2Fec2-backup" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-server/releases?q=" className="link-button" title="Release notes for only the service catalog versions which impacted this service.">Release Notes</a>

# EC2 Backup Module

This module makes it easy to deploy a [data lifecycle manager policy](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/snapshot-lifecycle.html) that will automatically create snapshots of EBS volumes whose tags match the target you configure. This is ideal for managing automatic backups of your EC2 instances' EBS volumes.




## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Required

<HclListItem name="schedule_name" requirement="required" type="string">
<HclListItemDescription>

The name of the data lifecyle management schedule

</HclListItemDescription>
</HclListItem>

<HclListItem name="target_tags" requirement="required" type="map(string)">
<HclListItemDescription>

A map of tag keys and their values. Any EBS volumes tagged with any of these tags will be targeted for snapshots.

</HclListItemDescription>
</HclListItem>

### Optional

<HclListItem name="backup_enabled" requirement="optional" type="bool">
<HclListItemDescription>

Set to true to enable backups. Set to false to disable backups

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="copy_tags" requirement="optional" type="bool">
<HclListItemDescription>

Set this to true to have the tags present on the target volume at the time of backup to be copied to the resulting snapshot

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="dlm_role_name" requirement="optional" type="string">
<HclListItemDescription>

The name for the IAM role associated with the data lifecycle manager. If this variable is null, the default of dlm-lifecycle-role will be used

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="interval" requirement="optional" type="number">
<HclListItemDescription>

How often this lifecycle policy should be evaluated. Units for this value are defined in <a href="#interval_unit"><code>interval_unit</code></a>

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="24"/>
</HclListItem>

<HclListItem name="interval_unit" requirement="optional" type="string">
<HclListItemDescription>

The measurement of time to use for the schedule's interval. Note that currently this value must be HOURS, as this is the only supported interval unit

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;HOURS&quot;"/>
</HclListItem>

<HclListItem name="number_of_snapshots_to_retain" requirement="optional" type="number">
<HclListItemDescription>

How many snapshots to keep. Must be an integer between 1 and 1000

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="14"/>
</HclListItem>

<HclListItem name="role_permissions_boundary" requirement="optional" type="string">
<HclListItemDescription>

The ARN of the policy that is used to set the permissions boundary for the IAM role.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="tags_to_add" requirement="optional" type="map(string)">
<HclListItemDescription>

This tag will be added to the Snapshot taken by the data lifecycle manager

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="times" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of times in 24 hour clock format that sets when the lifecyle policy should be evaluated. Max of 1.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[
  &quot;23:45&quot;
]"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="dlm_lifecycle_policy_arn">
<HclListItemDescription>

The ARN of the data lifecycle manager policy

</HclListItemDescription>
</HclListItem>

<HclListItem name="dlm_lifecycle_role_arn">
<HclListItemDescription>

The ARN of the IAM role associated with the data lifecycle manager

</HclListItemDescription>
</HclListItem>

<HclListItem name="dlm_lifecycle_role_name">
<HclListItemDescription>

The name of the IAM role associated with the data lifecycle manager

</HclListItemDescription>
</HclListItem>

</TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-server/tree/modules%2Fec2-backup%2Freadme.md",
    "https://github.com/gruntwork-io/terraform-aws-server/tree/modules%2Fec2-backup%2Fvariables.tf",
    "https://github.com/gruntwork-io/terraform-aws-server/tree/modules%2Fec2-backup%2Foutputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "a433b44f0c56527547e3d09604299c1b"
}
##DOCS-SOURCER-END -->

---
title: "EFS Module"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Data Storage Modules" version="0.40.1" lastModifiedVersion="0.36.0"/>

# EFS Module

<a href="https://github.com/gruntwork-io/terraform-aws-data-storage/tree/v0.40.1/modules/efs" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.36.0" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This module creates an Amazon Elastic File System (EFS) file system that provides NFSv4-compatible storage that can be used with other AWS services, such as EC2 instances.

EFS is also supported in Kubernetes via the [EFS CSI driver](https://github.com/kubernetes-sigs/aws-efs-csi-driver). Among other features, it supports `ReadWriteMany` and `ReadOnlyMany` access modes in Kubernetes, allowing a volume to be attached to multiple pods (even across AZs) for failover/redundancy purposes. It also supports [encryption-in-transit](https://github.com/kubernetes-sigs/aws-efs-csi-driver#encryption-in-transit) for an additional layer of security.

## Features

*   Create a managed NFSv4-compliant file system

*   Supports encryption-at-rest and encryption-in-transit

*   Automatic failover to another availability zone

## Learn

Note

This repo is a part of [the Gruntwork Infrastructure as Code Library](https://gruntwork.io/infrastructure-as-code-library/), a collection of reusable, battle-tested, production ready infrastructure code. If you’ve never used the Infrastructure as Code Library before, make sure to read [How to use the Gruntwork Infrastructure as Code Library](https://gruntwork.io/guides/foundations/how-to-use-gruntwork-infrastructure-as-code-library/)!

### Core concepts

*   [EFS documentation](https://docs.aws.amazon.com/efs/latest/ug/index.html): Amazon’s docs for EFS that cover core concepts such as performance modes, throughput modes, mounting file systems, etc.

## Deploy

### Non-production deployment (quick start for learning)

If you just want to try this repo out for experimenting and learning, check out the following resources:

*   [examples folder](https://github.com/gruntwork-io/terraform-aws-data-storage/tree/v0.40.1/examples): The `examples` folder contains sample code optimized for learning, experimenting, and testing (but not production usage).

### Production deployment

If you want to deploy this repo in production, check out the following resources:

*   [efs module variables](https://github.com/gruntwork-io/terraform-aws-data-storage/tree/v0.40.1/modules/efs/variables.tf): Configuration variables available for the EFS module. At minimum, you should configure the `allow_connections_from_cidr_blocks` and `allow_connections_from_security_groups` values to only allow access from your private VPC(s). You may also want to enable `storage_encrypted` to encrypt data at-rest.

## Manage

### Day-to-day operations

*   [How to mount an EFS file system](https://docs.aws.amazon.com/efs/latest/ug/mounting-fs.html)

*   [How to configure backups](https://docs.aws.amazon.com/efs/latest/ug/efs-backup-solutions.html)

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S EFS MODULE
# ------------------------------------------------------------------------------------------------------

module "efs" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-data-storage.git//modules/efs?ref=v0.40.1"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The name used to namespace all resources created by these templates,
  # including the EFS file system. Must be unique for this region. May contain
  # only lowercase alphanumeric characters, hyphens, underscores, periods, and
  # spaces.
  name = <string>

  # A list of subnet ids where the file system should be deployed. In the
  # standard Gruntwork VPC setup, these should be the private persistence subnet
  # ids.
  subnet_ids = <list(string)>

  # The id of the VPC in which this file system should be deployed.
  vpc_id = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # (Optional) Allow access to the EFS file system via mount targets. If set to
  # true, any clients connecting to a mount target (i.e. from within the private
  # app subnet) will be allowed access.
  allow_access_via_mount_target = false

  # A list of CIDR-formatted IP address ranges that can connect to this file
  # system. Should typically be the CIDR blocks of the private app subnet in
  # this VPC plus the private subnet in the mgmt VPC.
  allow_connections_from_cidr_blocks = []

  # A list of Security Groups that can connect to this file system.
  allow_connections_from_security_groups = []

  # The description of the aws_efs_security_group that is created. Defaults to
  # 'Security group for the var.name file system' if not specified.
  aws_efs_security_group_description = null

  # The name of the aws_efs_security_group that is created. Defaults to var.name
  # if not specified.
  aws_efs_security_group_name = null

  # A map of custom tags to apply to the EFS file system and the Security Group
  # created for it. The key is the tag name and the value is the tag value.
  custom_tags = {}

  # (Optional) A list of EFS access points to be created and their settings.
  # This is a map where the keys are the access point names and the values are
  # objects that should have the fields described in
  # https://www.terraform.io/docs/providers/aws/r/efs_access_point.html.
  efs_access_points = {}

  # Enforce in-transit encryption for all clients connecting to this EFS file
  # system. If set to true, any clients connecting without in-transit encryption
  # will be denied via an IAM policy.
  enforce_in_transit_encryption = true

  # The ARN of a KMS key that should be used to encrypt data on disk. Only used
  # if var.storage_encrypted is true. If you leave this blank, the default EFS
  # KMS key for the account will be used.
  kms_key_arn = null

  # The file system performance mode. Can be either "generalPurpose" or "maxIO".
  # For more details:
  # https://docs.aws.amazon.com/efs/latest/ug/performance.html#performancemodes
  performance_mode = "generalPurpose"

  # Indicates whether replication overwrite protection is enabled
  protection_replication_overwrite = false

  # The throughput, measured in MiB/s, that you want to provision for the file
  # system. Only applicable with "throughput_mode" set to "provisioned".
  provisioned_throughput_in_mibps = null

  # Specifies whether the EFS file system is encrypted.
  storage_encrypted = true

  # Throughput mode for the file system. Valid values: "bursting",
  # "provisioned". When using "provisioned", also set
  # "provisioned_throughput_in_mibps".
  throughput_mode = "bursting"

  # If specified, files will be transitioned to the archive storage class after
  # the designated time. Requires `var.transition_to_ia`, `elastic` in
  # `var.throughput_mode` and `generalPurpose` in  `performance_mode`. Valid
  # values: AFTER_1_DAY, AFTER_7_DAYS, AFTER_14_DAYS, AFTER_30_DAYS,
  # AFTER_60_DAYS, AFTER_90_DAYS, AFTER_180_DAYS, AFTER_270_DAYS, or
  # AFTER_365_DAYS.
  transition_to_archive = null

  # If specified, files will be transitioned to the IA storage class after the
  # designated time. Valid values: AFTER_7_DAYS, AFTER_14_DAYS, AFTER_30_DAYS,
  # AFTER_60_DAYS, or AFTER_90_DAYS.
  transition_to_ia = null

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S EFS MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-data-storage.git//modules/efs?ref=v0.40.1"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The name used to namespace all resources created by these templates,
  # including the EFS file system. Must be unique for this region. May contain
  # only lowercase alphanumeric characters, hyphens, underscores, periods, and
  # spaces.
  name = <string>

  # A list of subnet ids where the file system should be deployed. In the
  # standard Gruntwork VPC setup, these should be the private persistence subnet
  # ids.
  subnet_ids = <list(string)>

  # The id of the VPC in which this file system should be deployed.
  vpc_id = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # (Optional) Allow access to the EFS file system via mount targets. If set to
  # true, any clients connecting to a mount target (i.e. from within the private
  # app subnet) will be allowed access.
  allow_access_via_mount_target = false

  # A list of CIDR-formatted IP address ranges that can connect to this file
  # system. Should typically be the CIDR blocks of the private app subnet in
  # this VPC plus the private subnet in the mgmt VPC.
  allow_connections_from_cidr_blocks = []

  # A list of Security Groups that can connect to this file system.
  allow_connections_from_security_groups = []

  # The description of the aws_efs_security_group that is created. Defaults to
  # 'Security group for the var.name file system' if not specified.
  aws_efs_security_group_description = null

  # The name of the aws_efs_security_group that is created. Defaults to var.name
  # if not specified.
  aws_efs_security_group_name = null

  # A map of custom tags to apply to the EFS file system and the Security Group
  # created for it. The key is the tag name and the value is the tag value.
  custom_tags = {}

  # (Optional) A list of EFS access points to be created and their settings.
  # This is a map where the keys are the access point names and the values are
  # objects that should have the fields described in
  # https://www.terraform.io/docs/providers/aws/r/efs_access_point.html.
  efs_access_points = {}

  # Enforce in-transit encryption for all clients connecting to this EFS file
  # system. If set to true, any clients connecting without in-transit encryption
  # will be denied via an IAM policy.
  enforce_in_transit_encryption = true

  # The ARN of a KMS key that should be used to encrypt data on disk. Only used
  # if var.storage_encrypted is true. If you leave this blank, the default EFS
  # KMS key for the account will be used.
  kms_key_arn = null

  # The file system performance mode. Can be either "generalPurpose" or "maxIO".
  # For more details:
  # https://docs.aws.amazon.com/efs/latest/ug/performance.html#performancemodes
  performance_mode = "generalPurpose"

  # Indicates whether replication overwrite protection is enabled
  protection_replication_overwrite = false

  # The throughput, measured in MiB/s, that you want to provision for the file
  # system. Only applicable with "throughput_mode" set to "provisioned".
  provisioned_throughput_in_mibps = null

  # Specifies whether the EFS file system is encrypted.
  storage_encrypted = true

  # Throughput mode for the file system. Valid values: "bursting",
  # "provisioned". When using "provisioned", also set
  # "provisioned_throughput_in_mibps".
  throughput_mode = "bursting"

  # If specified, files will be transitioned to the archive storage class after
  # the designated time. Requires `var.transition_to_ia`, `elastic` in
  # `var.throughput_mode` and `generalPurpose` in  `performance_mode`. Valid
  # values: AFTER_1_DAY, AFTER_7_DAYS, AFTER_14_DAYS, AFTER_30_DAYS,
  # AFTER_60_DAYS, AFTER_90_DAYS, AFTER_180_DAYS, AFTER_270_DAYS, or
  # AFTER_365_DAYS.
  transition_to_archive = null

  # If specified, files will be transitioned to the IA storage class after the
  # designated time. Valid values: AFTER_7_DAYS, AFTER_14_DAYS, AFTER_30_DAYS,
  # AFTER_60_DAYS, or AFTER_90_DAYS.
  transition_to_ia = null

}


```

</TabItem>
</Tabs>




## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Required

<HclListItem name="name" requirement="required" type="string">
<HclListItemDescription>

The name used to namespace all resources created by these templates, including the EFS file system. Must be unique for this region. May contain only lowercase alphanumeric characters, hyphens, underscores, periods, and spaces.

</HclListItemDescription>
</HclListItem>

<HclListItem name="subnet_ids" requirement="required" type="list(string)">
<HclListItemDescription>

A list of subnet ids where the file system should be deployed. In the standard Gruntwork VPC setup, these should be the private persistence subnet ids.

</HclListItemDescription>
</HclListItem>

<HclListItem name="vpc_id" requirement="required" type="string">
<HclListItemDescription>

The id of the VPC in which this file system should be deployed.

</HclListItemDescription>
</HclListItem>

### Optional

<HclListItem name="allow_access_via_mount_target" requirement="optional" type="bool">
<HclListItemDescription>

(Optional) Allow access to the EFS file system via mount targets. If set to true, any clients connecting to a mount target (i.e. from within the private app subnet) will be allowed access.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="allow_connections_from_cidr_blocks" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of CIDR-formatted IP address ranges that can connect to this file system. Should typically be the CIDR blocks of the private app subnet in this VPC plus the private subnet in the mgmt VPC.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="allow_connections_from_security_groups" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of Security Groups that can connect to this file system.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="aws_efs_security_group_description" requirement="optional" type="string">
<HclListItemDescription>

The description of the aws_efs_security_group that is created. Defaults to 'Security group for the <a href="#name"><code>name</code></a> file system' if not specified.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="aws_efs_security_group_name" requirement="optional" type="string">
<HclListItemDescription>

The name of the aws_efs_security_group that is created. Defaults to <a href="#name"><code>name</code></a> if not specified.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="custom_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

A map of custom tags to apply to the EFS file system and the Security Group created for it. The key is the tag name and the value is the tag value.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="efs_access_points" requirement="optional" type="map(object(…))">
<HclListItemDescription>

(Optional) A list of EFS access points to be created and their settings. This is a map where the keys are the access point names and the values are objects that should have the fields described in https://www.terraform.io/docs/providers/aws/r/efs_access_point.html.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
map(object({
    root_access_arns       = list(string)
    read_write_access_arns = list(string)
    read_only_access_arns  = list(string)
    posix_user = object({
      uid            = number
      gid            = number
      secondary_gids = list(number)
    })
    root_directory = object({
      path        = string
      owner_uid   = number
      owner_gid   = number
      permissions = number
    })
  }))
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="{}"/>
<HclGeneralListItem title="Examples">
<details>
  <summary>Example</summary>


```hcl
   efs_access_points = {
     jenkins = {
       root_access_arns = []
       read_write_access_arns = [
         "arn:aws:iam::123456789101:role/jenkins-iam-role",
       ]
       read_only_access_arns = []
       posix_user = {
         uid            = 1000
         gid            = 1000
         secondary_gids = []
       },
       root_directory = {
         path = "/jenkins"
         owner_uid   = 1000
         owner_gid   = 1000
         permissions = 755
       }
     }
   }

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="enforce_in_transit_encryption" requirement="optional" type="bool">
<HclListItemDescription>

Enforce in-transit encryption for all clients connecting to this EFS file system. If set to true, any clients connecting without in-transit encryption will be denied via an IAM policy.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="kms_key_arn" requirement="optional" type="string">
<HclListItemDescription>

The ARN of a KMS key that should be used to encrypt data on disk. Only used if <a href="#storage_encrypted"><code>storage_encrypted</code></a> is true. If you leave this blank, the default EFS KMS key for the account will be used.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="performance_mode" requirement="optional" type="string">
<HclListItemDescription>

The file system performance mode. Can be either 'generalPurpose' or 'maxIO'. For more details: https://docs.aws.amazon.com/efs/latest/ug/performance.html#performancemodes

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;generalPurpose&quot;"/>
</HclListItem>

<HclListItem name="protection_replication_overwrite" requirement="optional" type="bool">
<HclListItemDescription>

Indicates whether replication overwrite protection is enabled

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="provisioned_throughput_in_mibps" requirement="optional" type="number">
<HclListItemDescription>

The throughput, measured in MiB/s, that you want to provision for the file system. Only applicable with 'throughput_mode' set to 'provisioned'.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="storage_encrypted" requirement="optional" type="bool">
<HclListItemDescription>

Specifies whether the EFS file system is encrypted.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="throughput_mode" requirement="optional" type="string">
<HclListItemDescription>

Throughput mode for the file system. Valid values: 'bursting', 'provisioned'. When using 'provisioned', also set 'provisioned_throughput_in_mibps'.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;bursting&quot;"/>
</HclListItem>

<HclListItem name="transition_to_archive" requirement="optional" type="string">
<HclListItemDescription>

If specified, files will be transitioned to the archive storage class after the designated time. Requires `<a href="#transition_to_ia"><code>transition_to_ia</code></a>`, `elastic` in `<a href="#throughput_mode"><code>throughput_mode</code></a>` and `generalPurpose` in  `performance_mode`. Valid values: AFTER_1_DAY, AFTER_7_DAYS, AFTER_14_DAYS, AFTER_30_DAYS, AFTER_60_DAYS, AFTER_90_DAYS, AFTER_180_DAYS, AFTER_270_DAYS, or AFTER_365_DAYS.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="transition_to_ia" requirement="optional" type="string">
<HclListItemDescription>

If specified, files will be transitioned to the IA storage class after the designated time. Valid values: AFTER_7_DAYS, AFTER_14_DAYS, AFTER_30_DAYS, AFTER_60_DAYS, or AFTER_90_DAYS.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="access_point_ids">
<HclListItemDescription>

A map of EFS access point names to the IDs of the access point (e.g. fsap-52a643fb) for that name.

</HclListItemDescription>
</HclListItem>

<HclListItem name="arn">
<HclListItemDescription>

Amazon Resource Name of the file system.

</HclListItemDescription>
</HclListItem>

<HclListItem name="dns_name">
<HclListItemDescription>

The DNS name for the filesystem per documented convention: http://docs.aws.amazon.com/efs/latest/ug/mounting-fs-mount-cmd-dns-name.html

</HclListItemDescription>
</HclListItem>

<HclListItem name="id">
<HclListItemDescription>

The ID that identifies the file system (e.g. fs-ccfc0d65).

</HclListItemDescription>
</HclListItem>

<HclListItem name="mount_target_ids">
<HclListItemDescription>

The IDs of the mount targets (e.g. fsmt-f9a14450).

</HclListItemDescription>
</HclListItem>

<HclListItem name="security_group_id">
<HclListItemDescription>

The IDs of the security groups created for the file system.

</HclListItemDescription>
</HclListItem>

</TabItem>
</Tabs>

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-data-storage/tree/v0.40.1/modules/efs/readme.adoc",
    "https://github.com/gruntwork-io/terraform-aws-data-storage/tree/v0.40.1/modules/efs/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-data-storage/tree/v0.40.1/modules/efs/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "1b9f2a4784e05adcfba703b70efe87f0"
}
##DOCS-SOURCER-END -->

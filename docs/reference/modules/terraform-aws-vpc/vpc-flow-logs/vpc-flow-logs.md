---
title: "VPC Flow Logs Terraform Module"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="VPC Modules" version="0.28.10" lastModifiedVersion="0.28.10"/>

# VPC Flow Logs Terraform Module

<a href="https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.28.10/modules/vpc-flow-logs" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.28.10" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This Terraform Module creates a [VPC flow log](https://docs.aws.amazon.com/vpc/latest/userguide/flow-logs.html). The flow log will capture IP traffic information for a given VPC, subnet, or [Elastic Network Interface (ENI)](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-eni.html). Flow logs can be configured to capture all traffic, only traffic that is accepted, or only traffic that is rejected. The logs can be published to [Amazon CloudWatch Logs](https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/WhatIsCloudWatchLogs.html) or an S3 bucket.

## What are VPC Flow Logs?

VPC Flow Logs are a feature to help you understand, debug, and evaluate the network traffic in your VPCs. Flow logs will capture information such as the client IP address and port, the protocol,
whether traffic was accepted or rejected (e.g. due to a security group rule forbidding such traffic), and other
metadata about the request and response.

For example, consider the following flow log record:

```
2 318677964956 eni-0a4c0daa903d85a52 209.17.96.58 10.0.3.254 55428 139 6 1 44 1565031303 1565031350 REJECT OK
```

This shows a single rejected packet of 44 bytes from `209.17.96.58` port `55428` to `10.0.3.254` (an internal VPC address) port `139` (Windows SMB protocol) on interface `eni-0a4c0daa903d85a52`. The packet  was sent between `Monday, August 5, 2019 6:55:03 PM` and `Monday, August 5, 2019 6:55:50 PM`. For a complete description of the fields, refer to the [Flow Log Records documentation](https://docs.aws.amazon.com/vpc/latest/userguide/flow-logs.html#flow-log-records).

This particular flow log record was recorded from a newly created EC2 instance running Linux, and yet the packet is destined for port 139 using the Server Message Block (SMB) protocol, an antiquated file sharing protocol for Windows. Why would this occur? Because publicly routable IP addresses are continuously barraged by probes from malicious hosts seeking vulnerable systems to compromise. This is one reason why it is crucial to have a [battle-tested, production-grade network architecture](https://www.gruntwork.io/reference-architecture/) that limits [attack surface](https://en.wikipedia.org/wiki/Attack_surface) and enforces [segmentation](https://en.wikipedia.org/wiki/Network_segmentation).

VPC Flow Logs do not capture packet payloads. You can use [VPC Traffic Mirroring](https://aws.amazon.com/blogs/aws/new-vpc-traffic-mirroring/) if you wish to capture packets/payloads. Furthermore, flow logs do not capture all IP traffic. For a list of flow log limitations, consult the [AWS documentation](https://docs.aws.amazon.com/vpc/latest/userguide/flow-logs.html#flow-logs-limitations).

## How are VPC Flow Logs useful?

Flow Logs can help to define [least privilege permissions](https://en.wikipedia.org/wiki/Principle_of_least_privilege) for security group rules. They can also help to identify malicious network activity to prevent or respond to an attack. Flow logs are required by some information security standards, such as the CIS AWS Foundations Benchmark.

## Resources Created

*   **Flow Log:** A flow log attached to a VPC, subnet, or ENI
*   **CloudWatch Log Group:** If using the CloudWatch Logs destination for flow logs, we create a cloudwatch log group
*   **IAM Role and Policy for CloudWatch Logs:** The flow logs service [requires an IAM role with permission to publish to CloudWatch logs](https://docs.aws.amazon.com/vpc/latest/userguide/flow-logs-cwl.html)
*   **S3 Bucket:** If using S3 as the destination for flow logs, we create an S3 bucket with a [lifecycle policy](https://docs.aws.amazon.com/AmazonS3/latest/dev/object-lifecycle-mgmt.html) and [encryption using KMS](https://docs.aws.amazon.com/AmazonS3/latest/dev/UsingKMSEncryption.html)
*   **KMS Key:** If using S3, we create a KMS key, or allow you to pass in your own.

## How do I view Flow Logs?

The easiest way to use Flow Logs is to configure the CloudWatch Logs destination and use the web console. The [available fields](https://docs.aws.amazon.com/vpc/latest/userguide/flow-logs.html#flow-log-records) in a flow log record tell you information about IP traffic such as source and destination address and port, protocol, bytes and packets sent, whether the traffic was accepted or rejected, and more.

If you use an S3 destination, [flow log files](https://docs.aws.amazon.com/vpc/latest/userguide/flow-logs-s3.html#flow-logs-s3-path) are delivered in to the s3 bucket 5 minute intervals.

Flow log records are overwhelming for humans to review. You can use [Amazon Athena](https://docs.aws.amazon.com/athena/latest/ug/what-is.html) to [query VPC flow logs](https://docs.aws.amazon.com/athena/latest/ug/vpc-flow-logs.html) using SQL syntax. You can also use [Amazon GuardDuty](https://aws.amazon.com/guardduty/) to automatically evaluate flow logs.

## What is the difference between using Flow Logs with VPC, subnets, and ENIs?

The difference has to do with how many resources are sending flow logs.

*   If you create a flow log with `eni_id`, it will include the data for a single elastic network interface only
*   If you create a flow log with `subnet_id`, it will include the data for any network interface created within the given subnet
*   If you create a flow log with `vpc_id`, it will include the data for any network interface created within the given VPC

## Using KMS keys to encrypt flow logs

Flow logs can be encrypted using the [AWS Key Management Service (KMS)](https://aws.amazon.com/kms/). You can provide the ARN of an KMS key, or the module will create one if an ARN is not provided. If you choose to supply an existing key, you must ensure that the appropriate key policy is configured. Refer to the documentation for flow logs published to [CloudWatch Logs](https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/encrypt-log-data-kms.html) and to [S3](https://docs.aws.amazon.com/vpc/latest/userguide/flow-logs-s3.html#flow-logs-s3-cmk-policy) respectively as they differ slightly. See also the comments in the `kms_key_policy` resource.

## Module limitations

TODO: Publish flow logs to an S3 bucket or CloudWatch Logs group in another account

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S VPC-FLOW-LOGS MODULE
# ------------------------------------------------------------------------------------------------------

module "vpc_flow_logs" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-vpc.git//modules/vpc-flow-logs?ref=v0.28.10"

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Additional IAM policies to apply to the S3 bucket to store flow logs. You
  # can use this to grant read/write access beyond what is provided to the VPC.
  # This should be a map, where each key is a unique statement ID (SID), and
  # each value is an object that contains the parameters defined in the comment
  # below.
  additional_s3_bucket_policy_statements = null

  # The name to use for the flow log IAM role.
  cloudwatch_iam_role_name = null

  # The name to use for the CloudWatch Log group.
  cloudwatch_log_group_name = null

  # The number of days to retain logs in the log group. Valid values: 0, 1, 3,
  # 5, 7, 14, 30, 60, 90, 120, 150, 180, 365, 400, 545, 731, 1096, 1827, 2192,
  # 2557, 2922, 3288, and 3653.
  cloudwatch_log_retention = 731

  # If you set this variable to false, this module will not create any
  # resources. This is used as a workaround because Terraform does not allow you
  # to use the 'count' parameter on modules. By using this parameter, you can
  # optionally create or not create the resources within this module.
  create_resources = true

  # A map of custom tags to apply to any resources created which accept them.
  # The key is the tag name and the value is the tag value.
  custom_tags = {}

  # A map of options to apply to the destination. Valid keys are file_format,
  # hive_compatible_partitions, and per_hour_partition.
  destination_options = null

  # Boolean to determine whether to use a custom S3 bucket for the flow log
  # destination. If set to true, you must specify the s3_bucket variable.
  # Defaults to false.
  enable_custom_s3_destination = false

  # The id of an ENI. The flow log will be associated with a single elastic
  # network interface. Exactly one of vpc_id, subnet_id, or eni_id is required.
  eni_id = null

  # Boolean to determine whether flow logs should be deleted if the S3 bucket is
  # removed by terraform. Defaults to false.
  force_destroy_bucket = false

  # The ARN of the policy that is used to set the permissions boundary for the
  # IAM role.
  iam_role_permissions_boundary = null

  # The ARN of the Kinesis Firehose delivery stream to which to send the flow
  # log records.
  kinesis_firehose_arn = null

  # The ARN of a KMS key to use for encrypting VPC the flow log. A new KMS key
  # will be created if this is not supplied.
  kms_key_arn = null

  # The number of days to keep this KMS Key (a Customer Master Key) around after
  # it has been marked for deletion. Setting to null defaults to the provider
  # default, which is the maximum possible value (30 days).
  kms_key_deletion_window_in_days = null

  # The alias prefix to use for the KMS key. If not defined, no alias will be
  # created.
  kms_key_prefix = "alias/flow_logs_key_"

  # A list of IAM user ARNs with access to the KMS key used with the VPC flow
  # logs. Required if kms_key_arn is not defined.
  kms_key_users = null

  # The destination for the flow log. Valid values are cloud-watch-logs, s3, or
  # kinesis-data-firehose. Defaults to cloud-watch-logs.
  log_destination_type = "cloud-watch-logs"

  # The fields to include in the flow log record, in the order in which they
  # should appear. See
  # https://docs.aws.amazon.com/vpc/latest/userguide/flow-logs.html#flow-log-records
  # for more information including the list of allowed fields.
  log_format = null

  # The maximum interval of time during which a flow of packets is captured and
  # aggregated into a flow log record. Valid Values: 60 seconds (1 minute) or
  # 600 seconds (10 minutes)
  max_aggregation_interval = 600

  # (Optional) The S3 bucket arn to use for the flow log destination. If this is
  # not set, a new S3 bucket will be created. Defaults to null.
  s3_bucket = null

  # The name to use for the S3 bucket created along with the VPC flow log
  # resources.
  s3_bucket_name = null

  # For s3 log destinations, the number of days after which to expire
  # (permanently delete) flow logs. Defaults to 365.
  s3_expiration_transition = 365

  # For s3 log destinations, the number of days after which to transition the
  # flow log objects to glacier. Defaults to 180.
  s3_glacier_transition = 180

  # For s3 log destinations, the number of days after which to transition the
  # flow log objects to infrequent access. Defaults to 30.
  s3_infrequent_access_transition = 30

  # If log_destination_type is s3, optionally specify a subfolder for log
  # delivery.
  s3_subfolder = ""

  # The id of VPC subnet. The flow log will be associated with all network
  # interfaces in the subnet. Exactly one of vpc_id, subnet_id, or eni_id is
  # required.
  subnet_id = null

  # The type of traffic to capture in this VPC flow log. Valid values include
  # ACCEPT, REJECT, or ALL. Defaults to REJECT.
  traffic_type = "REJECT"

  # When true, all IAM policies will be managed as dedicated policies rather
  # than inline policies attached to the IAM roles. Dedicated managed policies
  # are friendlier to automated policy checkers, which may scan a single
  # resource for findings. As such, it is important to avoid inline policies
  # when targeting compliance with various security standards.
  use_managed_iam_policies = true

  # The id of a VPC. The flow log will be associated with all network interfaces
  # in the VPC. Exactly one of vpc_id, subnet_id, or eni_id is required.
  vpc_id = null

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S VPC-FLOW-LOGS MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-vpc.git//modules/vpc-flow-logs?ref=v0.28.10"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Additional IAM policies to apply to the S3 bucket to store flow logs. You
  # can use this to grant read/write access beyond what is provided to the VPC.
  # This should be a map, where each key is a unique statement ID (SID), and
  # each value is an object that contains the parameters defined in the comment
  # below.
  additional_s3_bucket_policy_statements = null

  # The name to use for the flow log IAM role.
  cloudwatch_iam_role_name = null

  # The name to use for the CloudWatch Log group.
  cloudwatch_log_group_name = null

  # The number of days to retain logs in the log group. Valid values: 0, 1, 3,
  # 5, 7, 14, 30, 60, 90, 120, 150, 180, 365, 400, 545, 731, 1096, 1827, 2192,
  # 2557, 2922, 3288, and 3653.
  cloudwatch_log_retention = 731

  # If you set this variable to false, this module will not create any
  # resources. This is used as a workaround because Terraform does not allow you
  # to use the 'count' parameter on modules. By using this parameter, you can
  # optionally create or not create the resources within this module.
  create_resources = true

  # A map of custom tags to apply to any resources created which accept them.
  # The key is the tag name and the value is the tag value.
  custom_tags = {}

  # A map of options to apply to the destination. Valid keys are file_format,
  # hive_compatible_partitions, and per_hour_partition.
  destination_options = null

  # Boolean to determine whether to use a custom S3 bucket for the flow log
  # destination. If set to true, you must specify the s3_bucket variable.
  # Defaults to false.
  enable_custom_s3_destination = false

  # The id of an ENI. The flow log will be associated with a single elastic
  # network interface. Exactly one of vpc_id, subnet_id, or eni_id is required.
  eni_id = null

  # Boolean to determine whether flow logs should be deleted if the S3 bucket is
  # removed by terraform. Defaults to false.
  force_destroy_bucket = false

  # The ARN of the policy that is used to set the permissions boundary for the
  # IAM role.
  iam_role_permissions_boundary = null

  # The ARN of the Kinesis Firehose delivery stream to which to send the flow
  # log records.
  kinesis_firehose_arn = null

  # The ARN of a KMS key to use for encrypting VPC the flow log. A new KMS key
  # will be created if this is not supplied.
  kms_key_arn = null

  # The number of days to keep this KMS Key (a Customer Master Key) around after
  # it has been marked for deletion. Setting to null defaults to the provider
  # default, which is the maximum possible value (30 days).
  kms_key_deletion_window_in_days = null

  # The alias prefix to use for the KMS key. If not defined, no alias will be
  # created.
  kms_key_prefix = "alias/flow_logs_key_"

  # A list of IAM user ARNs with access to the KMS key used with the VPC flow
  # logs. Required if kms_key_arn is not defined.
  kms_key_users = null

  # The destination for the flow log. Valid values are cloud-watch-logs, s3, or
  # kinesis-data-firehose. Defaults to cloud-watch-logs.
  log_destination_type = "cloud-watch-logs"

  # The fields to include in the flow log record, in the order in which they
  # should appear. See
  # https://docs.aws.amazon.com/vpc/latest/userguide/flow-logs.html#flow-log-records
  # for more information including the list of allowed fields.
  log_format = null

  # The maximum interval of time during which a flow of packets is captured and
  # aggregated into a flow log record. Valid Values: 60 seconds (1 minute) or
  # 600 seconds (10 minutes)
  max_aggregation_interval = 600

  # (Optional) The S3 bucket arn to use for the flow log destination. If this is
  # not set, a new S3 bucket will be created. Defaults to null.
  s3_bucket = null

  # The name to use for the S3 bucket created along with the VPC flow log
  # resources.
  s3_bucket_name = null

  # For s3 log destinations, the number of days after which to expire
  # (permanently delete) flow logs. Defaults to 365.
  s3_expiration_transition = 365

  # For s3 log destinations, the number of days after which to transition the
  # flow log objects to glacier. Defaults to 180.
  s3_glacier_transition = 180

  # For s3 log destinations, the number of days after which to transition the
  # flow log objects to infrequent access. Defaults to 30.
  s3_infrequent_access_transition = 30

  # If log_destination_type is s3, optionally specify a subfolder for log
  # delivery.
  s3_subfolder = ""

  # The id of VPC subnet. The flow log will be associated with all network
  # interfaces in the subnet. Exactly one of vpc_id, subnet_id, or eni_id is
  # required.
  subnet_id = null

  # The type of traffic to capture in this VPC flow log. Valid values include
  # ACCEPT, REJECT, or ALL. Defaults to REJECT.
  traffic_type = "REJECT"

  # When true, all IAM policies will be managed as dedicated policies rather
  # than inline policies attached to the IAM roles. Dedicated managed policies
  # are friendlier to automated policy checkers, which may scan a single
  # resource for findings. As such, it is important to avoid inline policies
  # when targeting compliance with various security standards.
  use_managed_iam_policies = true

  # The id of a VPC. The flow log will be associated with all network interfaces
  # in the VPC. Exactly one of vpc_id, subnet_id, or eni_id is required.
  vpc_id = null

}


```

</TabItem>
</Tabs>




## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Optional

<HclListItem name="additional_s3_bucket_policy_statements" requirement="optional" type="any">
<HclListItemDescription>

Additional IAM policies to apply to the S3 bucket to store flow logs. You can use this to grant read/write access beyond what is provided to the VPC. This should be a map, where each key is a unique statement ID (SID), and each value is an object that contains the parameters defined in the comment below.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
Any types represent complex values of variable type. For details, please consult `variables.tf` in the source repo.
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="null"/>
<HclGeneralListItem title="Examples">
<details>
  <summary>Example</summary>


```hcl
   {
      AllIamUsersReadAccess = {
        effect     = "Allow"
        actions    = ["s3:GetObject"]
        principals = {
          AWS = ["arn:aws:iam::111111111111:user/ann", "arn:aws:iam::111111111111:user/bob"]
        }
        condition = {
          SourceVPCCheck = {
            test = "StringEquals"
            variable = "aws:SourceVpc"
            values = ["vpc-abcd123"]
          }
        }
      }
   }

```
</details>

</HclGeneralListItem>
<HclGeneralListItem title="More Details">
<details>


```hcl

   See the 'statement' block in the aws_iam_policy_document data
   source for context: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/data-sources/iam_policy_document
  
   - effect           string            (optional): Either "Allow" or "Deny", to specify whether this statement allows
                                                    or denies the given actions.
   - actions          list(string)      (optional): A list of actions that this statement either allows or denies. For
                                                    example, ["s3:GetObject", "s3:PutObject"].
   - not_actions      list(string)      (optional): A list of actions that this statement does NOT apply to. Used to
                                                    apply a policy statement to all actions except those listed.
   - principals       map(list(string)) (optional): The principals to which this statement applies. The keys are the
                                                    principal type ("AWS", "Service", or "Federated") and the value is
                                                    a list of identifiers.
   - not_principals   map(list(string)) (optional): The principals to which this statement does NOT apply. The keys are
                                                    the principal type ("AWS", "Service", or "Federated") and the value
                                                    is a list of identifiers.
   - keys             list(string)      (optional): A list of keys within the bucket to which this policy applies. For
                                                    example, ["", "/*"] would apply to (a) the bucket itself and (b)
                                                   all keys within the bucket. The default is [""].
   - condition        map(object)       (optional): A nested configuration block (described below) that defines a
                                                    further, possibly-service-specific condition that constrains
                                                    whether this statement applies.
  
   condition is a map ndition to an object that can define the following properties:
  
   - test             string            (required): The name of the IAM condition operator to evaluate.
   - variable         string            (required): The name of a Context Variable to apply the condition to. Context
                                                    variables may either be standard AWS variables starting with aws:,
                                                    or service-specific variables prefixed with the service name.
   - values           list(string)      (required): The values to evaluate the condition against. If multiple values
                                                    are provided, the condition matches if at least one of them
                                                    applies. (That is, the tests are combined with the "OR" boolean
                                                    operation.)

```
</details>

<details>


```hcl

   Ideally, this would be a map(object({...})), but the Terraform object type constraint doesn't support optional
   parameters, whereas IAM policy statements have many optional params. And we can't even use map(any), as the
   Terraform map type constraint requires all values to have the same type ("shape"), but as each object in the map
   may specify different optional params, this won't work either. So, sadly, we are forced to fall back to "any."

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="cloudwatch_iam_role_name" requirement="optional" type="string">
<HclListItemDescription>

The name to use for the flow log IAM role.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="cloudwatch_log_group_name" requirement="optional" type="string">
<HclListItemDescription>

The name to use for the CloudWatch Log group.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="cloudwatch_log_retention" requirement="optional" type="number">
<HclListItemDescription>

The number of days to retain logs in the log group. Valid values: 0, 1, 3, 5, 7, 14, 30, 60, 90, 120, 150, 180, 365, 400, 545, 731, 1096, 1827, 2192, 2557, 2922, 3288, and 3653.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="731"/>
</HclListItem>

<HclListItem name="create_resources" requirement="optional" type="bool">
<HclListItemDescription>

If you set this variable to false, this module will not create any resources. This is used as a workaround because Terraform does not allow you to use the 'count' parameter on modules. By using this parameter, you can optionally create or not create the resources within this module.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="custom_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

A map of custom tags to apply to any resources created which accept them. The key is the tag name and the value is the tag value.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="destination_options" requirement="optional" type="map(string)">
<HclListItemDescription>

A map of options to apply to the destination. Valid keys are file_format, hive_compatible_partitions, and per_hour_partition.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="enable_custom_s3_destination" requirement="optional" type="bool">
<HclListItemDescription>

Boolean to determine whether to use a custom S3 bucket for the flow log destination. If set to true, you must specify the s3_bucket variable. Defaults to false.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="eni_id" requirement="optional" type="string">
<HclListItemDescription>

The id of an ENI. The flow log will be associated with a single elastic network interface. Exactly one of vpc_id, subnet_id, or eni_id is required.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="force_destroy_bucket" requirement="optional" type="bool">
<HclListItemDescription>

Boolean to determine whether flow logs should be deleted if the S3 bucket is removed by terraform. Defaults to false.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="iam_role_permissions_boundary" requirement="optional" type="string">
<HclListItemDescription>

The ARN of the policy that is used to set the permissions boundary for the IAM role.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="kinesis_firehose_arn" requirement="optional" type="string">
<HclListItemDescription>

The ARN of the Kinesis Firehose delivery stream to which to send the flow log records.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="kms_key_arn" requirement="optional" type="string">
<HclListItemDescription>

The ARN of a KMS key to use for encrypting VPC the flow log. A new KMS key will be created if this is not supplied.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="kms_key_deletion_window_in_days" requirement="optional" type="number">
<HclListItemDescription>

The number of days to keep this KMS Key (a Customer Master Key) around after it has been marked for deletion. Setting to null defaults to the provider default, which is the maximum possible value (30 days).

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="kms_key_prefix" requirement="optional" type="string">
<HclListItemDescription>

The alias prefix to use for the KMS key. If not defined, no alias will be created.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;alias/flow_logs_key_&quot;"/>
</HclListItem>

<HclListItem name="kms_key_users" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of IAM user ARNs with access to the KMS key used with the VPC flow logs. Required if kms_key_arn is not defined.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="log_destination_type" requirement="optional" type="string">
<HclListItemDescription>

The destination for the flow log. Valid values are cloud-watch-logs, s3, or kinesis-data-firehose. Defaults to cloud-watch-logs.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;cloud-watch-logs&quot;"/>
</HclListItem>

<HclListItem name="log_format" requirement="optional" type="string">
<HclListItemDescription>

The fields to include in the flow log record, in the order in which they should appear. See https://docs.aws.amazon.com/vpc/latest/userguide/flow-logs.html#flow-log-records for more information including the list of allowed fields.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="max_aggregation_interval" requirement="optional" type="number">
<HclListItemDescription>

The maximum interval of time during which a flow of packets is captured and aggregated into a flow log record. Valid Values: 60 seconds (1 minute) or 600 seconds (10 minutes)

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="600"/>
</HclListItem>

<HclListItem name="s3_bucket" requirement="optional" type="string">
<HclListItemDescription>

(Optional) The S3 bucket arn to use for the flow log destination. If this is not set, a new S3 bucket will be created. Defaults to null.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="s3_bucket_name" requirement="optional" type="string">
<HclListItemDescription>

The name to use for the S3 bucket created along with the VPC flow log resources.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="s3_expiration_transition" requirement="optional" type="number">
<HclListItemDescription>

For s3 log destinations, the number of days after which to expire (permanently delete) flow logs. Defaults to 365.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="365"/>
</HclListItem>

<HclListItem name="s3_glacier_transition" requirement="optional" type="number">
<HclListItemDescription>

For s3 log destinations, the number of days after which to transition the flow log objects to glacier. Defaults to 180.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="180"/>
</HclListItem>

<HclListItem name="s3_infrequent_access_transition" requirement="optional" type="number">
<HclListItemDescription>

For s3 log destinations, the number of days after which to transition the flow log objects to infrequent access. Defaults to 30.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="30"/>
</HclListItem>

<HclListItem name="s3_subfolder" requirement="optional" type="string">
<HclListItemDescription>

If log_destination_type is s3, optionally specify a subfolder for log delivery.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;&quot;"/>
</HclListItem>

<HclListItem name="subnet_id" requirement="optional" type="string">
<HclListItemDescription>

The id of VPC subnet. The flow log will be associated with all network interfaces in the subnet. Exactly one of vpc_id, subnet_id, or eni_id is required.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="traffic_type" requirement="optional" type="string">
<HclListItemDescription>

The type of traffic to capture in this VPC flow log. Valid values include ACCEPT, REJECT, or ALL. Defaults to REJECT.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;REJECT&quot;"/>
</HclListItem>

<HclListItem name="use_managed_iam_policies" requirement="optional" type="bool">
<HclListItemDescription>

When true, all IAM policies will be managed as dedicated policies rather than inline policies attached to the IAM roles. Dedicated managed policies are friendlier to automated policy checkers, which may scan a single resource for findings. As such, it is important to avoid inline policies when targeting compliance with various security standards.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="vpc_id" requirement="optional" type="string">
<HclListItemDescription>

The id of a VPC. The flow log will be associated with all network interfaces in the VPC. Exactly one of vpc_id, subnet_id, or eni_id is required.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="cloud_watch_kms_key_arn">
<HclListItemDescription>

The name of the KMS key used to encrypt flow logs

</HclListItemDescription>
</HclListItem>

<HclListItem name="cloud_watch_logs_group_arn">
<HclListItemDescription>

The ARN of the CloudWatch Logs group where flow logs are published.

</HclListItemDescription>
</HclListItem>

<HclListItem name="cloud_watch_logs_group_name">
<HclListItemDescription>

The name of the CloudWatch Logs group where flow logs are published.

</HclListItemDescription>
</HclListItem>

<HclListItem name="flow_log_id">
<HclListItemDescription>

The ID of the flow log

</HclListItemDescription>
</HclListItem>

<HclListItem name="s3_bucket_arn">
<HclListItemDescription>

The ARN of the S3 bucket where flow logs are published.

</HclListItemDescription>
</HclListItem>

<HclListItem name="s3_bucket_name">
<HclListItemDescription>

The name of the S3 bucket where flow logs are published.

</HclListItemDescription>
</HclListItem>

</TabItem>
</Tabs>

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.28.10/modules/vpc-flow-logs/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.28.10/modules/vpc-flow-logs/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.28.10/modules/vpc-flow-logs/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "383ddbf72f73a18288502757e3cad137"
}
##DOCS-SOURCER-END -->

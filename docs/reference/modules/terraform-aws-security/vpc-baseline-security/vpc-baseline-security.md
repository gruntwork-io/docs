---
title: "VPC Baseline Security"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Security Modules" version="1.3.0" />

# VPC Baseline Security

<a href="https://github.com/gruntwork-io/terraform-aws-security/tree/v1.3.0/modules/vpc-baseline-security" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-security/releases?q=vpc-baseline-security" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This Terraform Module applies baseline security controls to an [Amazon VPC](https://aws.amazon.com/vpc/), including restricting the default security group and enabling VPC flow logs. These controls satisfy [CIS AWS Foundations Benchmark v3.0.0 EC2.2](https://docs.aws.amazon.com/securityhub/latest/userguide/ec2-controls.html#ec2-2) (ensure the default security group restricts all traffic) and [EC2.6](https://docs.aws.amazon.com/securityhub/latest/userguide/ec2-controls.html#ec2-6) (ensure VPC flow logging is enabled in all VPCs).

## Features

*   Restrict the default security group to have no ingress or egress rules

*   Enable VPC flow logs to CloudWatch Logs

*   Create the required IAM role and CloudWatch log group for flow log delivery

*   Configurable flow log retention period and traffic type

*   Each control can be independently enabled or disabled

*   Supports conditional resource creation via the `create_resources` variable

## Learn

Note

This repo is a part of [the Gruntwork Infrastructure as Code Library](https://gruntwork.io/infrastructure-as-code-library/), a collection of reusable, battle-tested, production ready infrastructure code. If you’ve never used the Infrastructure as Code Library before, make sure to read [How to use the Gruntwork Infrastructure as Code Library](https://docs.gruntwork.io/library/overview/)!

### Core concepts

*   [Default Security Groups for Your VPC](https://docs.aws.amazon.com/vpc/latest/userguide/default-security-group.html)

*   [VPC Flow Logs](https://docs.aws.amazon.com/vpc/latest/userguide/flow-logs.html)

*   [CIS AWS Foundations Benchmark v3.0.0 - EC2.2](https://docs.aws.amazon.com/securityhub/latest/userguide/ec2-controls.html#ec2-2)

*   [CIS AWS Foundations Benchmark v3.0.0 - EC2.6](https://docs.aws.amazon.com/securityhub/latest/userguide/ec2-controls.html#ec2-6)

### Repo organization

*   [modules](https://github.com/gruntwork-io/terraform-aws-security/tree/v1.3.0/modules): the main implementation code for this repo, broken down into multiple standalone, orthogonal submodules.

*   [examples](https://github.com/gruntwork-io/terraform-aws-security/tree/v1.3.0/examples): This folder contains working examples of how to use the submodules.

*   [test](https://github.com/gruntwork-io/terraform-aws-security/tree/v1.3.0/test): Automated tests for the modules and examples.

## Deploy

### Non-production deployment (quick start for learning)

If you just want to try this module out, check out the following resources:

*   [examples/vpc-baseline-security](https://github.com/gruntwork-io/terraform-aws-security/tree/v1.3.0/examples/vpc-baseline-security): A sample configuration optimized for learning, experimenting, and testing (but not production usage).

### Production deployment

If you want to deploy this module in production, check out the following resources:

*   [How to configure a production-grade AWS account structure](https://docs.gruntwork.io/guides/build-it-yourself/landing-zone)

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S VPC-BASELINE-SECURITY MODULE
# ------------------------------------------------------------------------------------------------------

module "vpc_baseline_security" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-security.git//modules/vpc-baseline-security?ref=v1.3.0"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The ID of the VPC to apply baseline security controls to.
  vpc_id = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Set to false to have this module skip creating resources. This weird
  # parameter exists solely because Terraform does not support conditional
  # modules. Therefore, this is a hack to allow you to conditionally decide if
  # the resources in this module should be created or not.
  create_resources = true

  # When true, the default security group will be restricted to have no inbound
  # or outbound rules (CIS EC2.2).
  enable_default_sg_restriction = true

  # When true, VPC flow logs will be enabled and sent to CloudWatch Logs (CIS
  # EC2.6).
  enable_flow_logs = true

  # Number of days to retain VPC flow log data in CloudWatch Logs.
  flow_log_retention_in_days = 365

  # The type of traffic to capture in flow logs. Valid values: ACCEPT, REJECT,
  # ALL.
  flow_log_traffic_type = "ALL"

  # A prefix used for naming resources (CloudWatch log group, IAM role).
  name_prefix = "vpc-baseline"

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S VPC-BASELINE-SECURITY MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-security.git//modules/vpc-baseline-security?ref=v1.3.0"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The ID of the VPC to apply baseline security controls to.
  vpc_id = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Set to false to have this module skip creating resources. This weird
  # parameter exists solely because Terraform does not support conditional
  # modules. Therefore, this is a hack to allow you to conditionally decide if
  # the resources in this module should be created or not.
  create_resources = true

  # When true, the default security group will be restricted to have no inbound
  # or outbound rules (CIS EC2.2).
  enable_default_sg_restriction = true

  # When true, VPC flow logs will be enabled and sent to CloudWatch Logs (CIS
  # EC2.6).
  enable_flow_logs = true

  # Number of days to retain VPC flow log data in CloudWatch Logs.
  flow_log_retention_in_days = 365

  # The type of traffic to capture in flow logs. Valid values: ACCEPT, REJECT,
  # ALL.
  flow_log_traffic_type = "ALL"

  # A prefix used for naming resources (CloudWatch log group, IAM role).
  name_prefix = "vpc-baseline"

}


```

</TabItem>
</Tabs>




## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Required

<HclListItem name="vpc_id" requirement="required" type="string">
<HclListItemDescription>

The ID of the VPC to apply baseline security controls to.

</HclListItemDescription>
</HclListItem>

### Optional

<HclListItem name="create_resources" requirement="optional" type="bool">
<HclListItemDescription>

Set to false to have this module skip creating resources. This weird parameter exists solely because Terraform does not support conditional modules. Therefore, this is a hack to allow you to conditionally decide if the resources in this module should be created or not.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="enable_default_sg_restriction" requirement="optional" type="bool">
<HclListItemDescription>

When true, the default security group will be restricted to have no inbound or outbound rules (CIS EC2.2).

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="enable_flow_logs" requirement="optional" type="bool">
<HclListItemDescription>

When true, VPC flow logs will be enabled and sent to CloudWatch Logs (CIS EC2.6).

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="flow_log_retention_in_days" requirement="optional" type="number">
<HclListItemDescription>

Number of days to retain VPC flow log data in CloudWatch Logs.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="365"/>
</HclListItem>

<HclListItem name="flow_log_traffic_type" requirement="optional" type="string">
<HclListItemDescription>

The type of traffic to capture in flow logs. Valid values: ACCEPT, REJECT, ALL.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;ALL&quot;"/>
</HclListItem>

<HclListItem name="name_prefix" requirement="optional" type="string">
<HclListItemDescription>

A prefix used for naming resources (CloudWatch log group, IAM role).

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;vpc-baseline&quot;"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="default_security_group_id">
<HclListItemDescription>

The ID of the default security group that has been restricted.

</HclListItemDescription>
</HclListItem>

<HclListItem name="flow_log_cloudwatch_log_group_arn">
<HclListItemDescription>

The ARN of the CloudWatch log group for VPC flow logs.

</HclListItemDescription>
</HclListItem>

<HclListItem name="flow_log_iam_role_arn">
<HclListItemDescription>

The ARN of the IAM role used for VPC flow log delivery.

</HclListItemDescription>
</HclListItem>

<HclListItem name="flow_log_id">
<HclListItemDescription>

The ID of the VPC flow log.

</HclListItemDescription>
</HclListItem>

</TabItem>
</Tabs>

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-security/tree/v1.3.0/modules/vpc-baseline-security/readme.adoc",
    "https://github.com/gruntwork-io/terraform-aws-security/tree/v1.3.0/modules/vpc-baseline-security/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-security/tree/v1.3.0/modules/vpc-baseline-security/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "8483d1057e81cd1464fd1fcb09669d4f"
}
##DOCS-SOURCER-END -->

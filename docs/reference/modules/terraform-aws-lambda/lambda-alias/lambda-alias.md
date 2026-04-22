---
title: "Lambda Alias Module"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="AWS Lambda" version="1.3.0" />

# Lambda Alias Module

<a href="https://github.com/gruntwork-io/terraform-aws-lambda/tree/v1.3.0/modules/lambda-alias" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-lambda/releases?q=lambda-alias" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This module creates an [AWS Lambda alias](https://docs.aws.amazon.com/lambda/latest/dg/configuration-aliases.html) that points to a specific version of a Lambda function. An alias is a named pointer to a Lambda function version, allowing you to invoke a specific version using a stable endpoint without needing to know the underlying version number.

Aliases are useful for:

*   **Stable endpoints**: Invoke a function via an alias name (e.g., `live`, `staging`) rather than a version number.
*   **Traffic shifting**: Gradually shift traffic between two versions using weighted routing for canary or blue/green deployments.
*   **Function URLs and event source mappings**: Point triggers at an alias so you can update the underlying version without reconfiguring consumers.

## How do you do weighted traffic shifting?

You can use the `routing_config` variable to split traffic between two versions of a Lambda function. This is useful for canary deployments where you want to gradually shift traffic to a new version:

```hcl
module "lambda_alias" {
  source = "git::git@github.com:gruntwork-io/terraform-aws-lambda.git//modules/lambda-alias?ref=v1.0.0"

  name             = "live"
  function_name    = module.my_lambda_function.function_name
  function_version = "2"

  routing_config = {
    additional_version_weights = {
      "3" = 0.1  # Send 10% of traffic to version 3
    }
  }
}
```

In this example, 90% of traffic goes to version 2 (the primary version) and 10% goes to version 3. You can adjust the weight from `0.0` to `1.0` as you gain confidence in the new version.

## Background info

For more information on AWS Lambda, how it works, and how to configure your functions, check out the [lambda module
documentation](https://github.com/gruntwork-io/terraform-aws-lambda/tree/v1.3.0/modules/lambda).

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S LAMBDA-ALIAS MODULE
# ------------------------------------------------------------------------------------------------------

module "lambda_alias" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-lambda.git//modules/lambda-alias?ref=v1.3.0"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The Lambda function name or ARN to associate with the alias
  function_name = <string>

  # Lambda function version for which to create the alias
  function_version = <string>

  # Name for the alias
  name = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Description of the alias
  description = ""

  # Lambda alias routing configuration for weighted traffic shifting. Set
  # additional_version_weights to a map of version number to weight (0.0 - 1.0).
  routing_config = null

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S LAMBDA-ALIAS MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-lambda.git//modules/lambda-alias?ref=v1.3.0"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The Lambda function name or ARN to associate with the alias
  function_name = <string>

  # Lambda function version for which to create the alias
  function_version = <string>

  # Name for the alias
  name = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Description of the alias
  description = ""

  # Lambda alias routing configuration for weighted traffic shifting. Set
  # additional_version_weights to a map of version number to weight (0.0 - 1.0).
  routing_config = null

}


```

</TabItem>
</Tabs>




## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Required

<HclListItem name="function_name" requirement="required" type="string">
<HclListItemDescription>

The Lambda function name or ARN to associate with the alias

</HclListItemDescription>
</HclListItem>

<HclListItem name="function_version" requirement="required" type="string">
<HclListItemDescription>

Lambda function version for which to create the alias

</HclListItemDescription>
</HclListItem>

<HclListItem name="name" requirement="required" type="string">
<HclListItemDescription>

Name for the alias

</HclListItemDescription>
</HclListItem>

### Optional

<HclListItem name="description" requirement="optional" type="string">
<HclListItemDescription>

Description of the alias

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;&quot;"/>
</HclListItem>

<HclListItem name="routing_config" requirement="optional" type="object(…)">
<HclListItemDescription>

Lambda alias routing configuration for weighted traffic shifting. Set additional_version_weights to a map of version number to weight (0.0 - 1.0).

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
object({
    additional_version_weights = map(number)
  })
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="arn">
<HclListItemDescription>

The Amazon Resource Name (ARN) identifying the Lambda alias

</HclListItemDescription>
</HclListItem>

<HclListItem name="invoke_arn">
<HclListItemDescription>

The ARN to be used for invoking the Lambda function via the alias

</HclListItemDescription>
</HclListItem>

<HclListItem name="name">
<HclListItemDescription>

The name of the Lambda alias

</HclListItemDescription>
</HclListItem>

</TabItem>
</Tabs>

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-lambda/tree/v1.3.0/modules/lambda-alias/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-lambda/tree/v1.3.0/modules/lambda-alias/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-lambda/tree/v1.3.0/modules/lambda-alias/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "10be5d106a001576e6f15204f62ea135"
}
##DOCS-SOURCER-END -->

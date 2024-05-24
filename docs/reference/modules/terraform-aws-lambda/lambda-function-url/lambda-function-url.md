---
title: "Lambda Function URL Module"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="AWS Lambda" version="0.21.19" />

# Lambda Function URL Module

<a href="https://github.com/gruntwork-io/terraform-aws-lambda/tree/v0.21.19/modules/lambda-function-url" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-lambda/releases?q=lambda-function-url" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This module used to create a [AWS Lambda function URLs](https://docs.aws.amazon.com/lambda/latest/dg/lambda-urls.html) for existing Lambda function. A function URL is a dedicated HTTP(S) endpoint for a Lambda function.

When you create a function URL, Lambda automatically generates a unique URL endpoint for you. Once you create a function URL, its URL endpoint never changes. Function URLs are dual stack-enabled, supporting IPv4 and IPv6. After you configure a function URL for your function, you can invoke your function through its HTTP(S) endpoint via a web browser, curl, Postman, or any HTTP client.

Function URL endpoints have the following format:

```
https://<url-id>.lambda-url.<region>.on.aws
```

## Background info

For more information on AWS Lambda, how it works, and how to configure your functions, check out the [lambda module
documentation](https://github.com/gruntwork-io/terraform-aws-lambda/tree/v0.21.19/modules/lambda).

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S LAMBDA-FUNCTION-URL MODULE
# ------------------------------------------------------------------------------------------------------

module "lambda_function_url" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-lambda.git//modules/lambda-function-url?ref=v0.21.19"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Alias name of the lambda function
  alias = <string>

  # Authorization type for the generated function URL
  authorization_type = <string>

  # CORS configuration for the Lambda function URL
  cors_config = <object(
    allow_credentials = bool
    allow_origins     = list(string)
    allow_methods     = list(string)
    allow_headers     = list(string)
    expose_headers    = list(string)
    max_age           = number
  )>

  # The name of the Lambda function receiving a function URL
  lambda_function_name = <string>

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S LAMBDA-FUNCTION-URL MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-lambda.git//modules/lambda-function-url?ref=v0.21.19"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Alias name of the lambda function
  alias = <string>

  # Authorization type for the generated function URL
  authorization_type = <string>

  # CORS configuration for the Lambda function URL
  cors_config = <object(
    allow_credentials = bool
    allow_origins     = list(string)
    allow_methods     = list(string)
    allow_headers     = list(string)
    expose_headers    = list(string)
    max_age           = number
  )>

  # The name of the Lambda function receiving a function URL
  lambda_function_name = <string>

}


```

</TabItem>
</Tabs>




## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Required

<HclListItem name="alias" requirement="required" type="string">
<HclListItemDescription>

Alias name of the lambda function

</HclListItemDescription>
</HclListItem>

<HclListItem name="authorization_type" requirement="required" type="string">
<HclListItemDescription>

Authorization type for the generated function URL

</HclListItemDescription>
</HclListItem>

<HclListItem name="cors_config" requirement="required" type="object(…)">
<HclListItemDescription>

CORS configuration for the Lambda function URL

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
object({
    allow_credentials = bool
    allow_origins     = list(string)
    allow_methods     = list(string)
    allow_headers     = list(string)
    expose_headers    = list(string)
    max_age           = number
  })
```

</HclListItemTypeDetails>
</HclListItem>

<HclListItem name="lambda_function_name" requirement="required" type="string">
<HclListItemDescription>

The name of the Lambda function receiving a function URL

</HclListItemDescription>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="function_arn">
<HclListItemDescription>

The Amazon Resource Name (ARN) of the function.

</HclListItemDescription>
</HclListItem>

<HclListItem name="function_url">
<HclListItemDescription>

The HTTP URL endpoint for the function in the format https://&lt;url_id>.lambda-url.&lt;region>.on.aws/

</HclListItemDescription>
</HclListItem>

<HclListItem name="url_id">
<HclListItemDescription>

A generated ID for the endpoint.

</HclListItemDescription>
</HclListItem>

</TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-lambda/tree/v0.21.19/modules/lambda-function-url/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-lambda/tree/v0.21.19/modules/lambda-function-url/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-lambda/tree/v0.21.19/modules/lambda-function-url/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "7dafae7b8587c75cce94d2ec109cb754"
}
##DOCS-SOURCER-END -->

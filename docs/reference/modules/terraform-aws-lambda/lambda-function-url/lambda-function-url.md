---
title: "Lambda Function URL Module"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="AWS Lambda" version="1.3.0" lastModifiedVersion="1.3.0"/>

# Lambda Function URL Module

<a href="https://github.com/gruntwork-io/terraform-aws-lambda/tree/v1.3.0/modules/lambda-function-url" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v1.3.0" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This module is used to create an [AWS Lambda Function URL](https://docs.aws.amazon.com/lambda/latest/dg/lambda-urls.html) for an existing Lambda function, along with a [CloudFront Origin Access Control (OAC)](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-restricting-access-to-lambda.html) for securing access to the function URL via CloudFront.

A function URL is a dedicated HTTP(S) endpoint for a Lambda function. When you create a function URL, Lambda automatically generates a unique URL endpoint for you. Once you create a function URL, its URL endpoint never changes. Function URLs are dual stack-enabled, supporting IPv4 and IPv6. After you configure a function URL for your function, you can invoke your function through its HTTP(S) endpoint via a web browser, curl, Postman, or any HTTP client.

Function URL endpoints have the following format:

```
https://<url-id>.lambda-url.<region>.on.aws
```

## What authorization types are available?

The `authorization_type` variable controls how the function URL authenticates callers. There are two options:

*   **`AWS_IAM`**: Only authenticated IAM principals can invoke the function URL. Use this when you want to restrict access to specific IAM users or roles, or when fronting the function URL with CloudFront using OAC.
*   **`NONE`**: The function URL is publicly accessible. Anyone with the URL can invoke the function. If you use this, you may want to add a `aws_lambda_permission` resource to explicitly allow public access:

```hcl
resource "aws_lambda_permission" "allow_public_access" {
  statement_id           = "AllowPublicAccess"
  action                 = "lambda:InvokeFunctionUrl"
  function_name          = module.my_lambda_function.function_name
  qualifier              = aws_lambda_alias.my_alias.name
  principal              = "*"
  function_url_auth_type = "NONE"
}
```

## How do you configure CORS?

By default, no CORS configuration is applied to the function URL. To enable CORS, pass a `cors_config` object:

```hcl
module "lambda_function_url" {
  source = "git::git@github.com:gruntwork-io/terraform-aws-lambda.git//modules/lambda-function-url?ref=v1.0.0"

  lambda_function_name = module.my_lambda_function.function_name
  alias                = aws_lambda_alias.my_alias.name
  authorization_type   = "NONE"

  cors_config = {
    allow_origins     = ["https://example.com"]
    allow_methods     = ["GET", "POST"]
    allow_headers     = ["Content-Type", "Authorization"]
    expose_headers    = ["X-Custom-Header"]
    allow_credentials = true
    max_age           = 86400
  }

  # ... other required variables
}
```

Set `cors_config` to `null` (the default) to disable CORS entirely. All fields within `cors_config` are optional.

## How do you use this with CloudFront?

This module creates a CloudFront Origin Access Control (OAC) alongside the function URL. The OAC allows you to front the Lambda function URL with a CloudFront distribution, giving you:

*   A custom domain name for your Lambda function
*   CloudFront caching and edge locations
*   AWS WAF integration for additional security
*   Signed requests from CloudFront to your Lambda function

To use the OAC, create a CloudFront distribution that uses the function URL as an origin and references the OAC:

```hcl
module "lambda_function_url" {
  source = "git::git@github.com:gruntwork-io/terraform-aws-lambda.git//modules/lambda-function-url?ref=v1.0.0"

  lambda_function_name = module.my_lambda_function.function_name
  alias                = aws_lambda_alias.my_alias.name
  authorization_type   = "AWS_IAM"
  cloudfront_oac_name  = "my-lambda-oac"

  # ... other required variables
}

resource "aws_cloudfront_distribution" "lambda_distribution" {
  origin {
    domain_name              = replace(module.lambda_function_url.function_url, "/(^https://|/$)/", "")
    origin_id                = "lambda"
    origin_access_control_id = module.lambda_function_url.oac_id
    custom_origin_config {
      http_port              = 80
      https_port             = 443
      origin_protocol_policy = "https-only"
      origin_ssl_protocols   = ["TLSv1.2"]
    }
  }

  # ... other CloudFront configuration
}
```

When using CloudFront with OAC, set `authorization_type` to `"AWS_IAM"` so that only CloudFront (via signed requests) can invoke the function URL directly.

## Background info

For more information on AWS Lambda, how it works, and how to configure your functions, check out the [lambda module
documentation](https://github.com/gruntwork-io/terraform-aws-lambda/tree/v1.3.0/modules/lambda).

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S LAMBDA-FUNCTION-URL MODULE
# ------------------------------------------------------------------------------------------------------

module "lambda_function_url" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-lambda.git//modules/lambda-function-url?ref=v1.3.0"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Alias name of the lambda function
  alias = <string>

  # Autherisation type of genrating function url
  authorization_type = <string>

  # The AWS region in which all resources will be created
  aws_region = <string>

  # Name of the CloudFront Origin Access Control
  cloudfront_oac_name = <string>

  # The name of the iam role to be created
  iam_role_name = <string>

  # The name of the Lambda function. Used to generate function url
  lambda_function_name = <string>

  # Specifies which requests CloudFront signs. Specify always for the most
  # common use case. Allowed values: always, never, and no-override.
  oac_signing_behavior = <string>

  # Determines how CloudFront signs (authenticates) requests. The only valid
  # value is sigv4.
  oac_signing_protocol = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # CORS configuration for the Lambda function URL. When null, no CORS
  # configuration will be applied.
  cors_config = null

  # The type of origin that this Origin Access Control is for. Valid values are
  # lambda, mediapackagev2, mediastore, and s3
  oac_origin_type = "lambda"

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S LAMBDA-FUNCTION-URL MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-lambda.git//modules/lambda-function-url?ref=v1.3.0"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Alias name of the lambda function
  alias = <string>

  # Autherisation type of genrating function url
  authorization_type = <string>

  # The AWS region in which all resources will be created
  aws_region = <string>

  # Name of the CloudFront Origin Access Control
  cloudfront_oac_name = <string>

  # The name of the iam role to be created
  iam_role_name = <string>

  # The name of the Lambda function. Used to generate function url
  lambda_function_name = <string>

  # Specifies which requests CloudFront signs. Specify always for the most
  # common use case. Allowed values: always, never, and no-override.
  oac_signing_behavior = <string>

  # Determines how CloudFront signs (authenticates) requests. The only valid
  # value is sigv4.
  oac_signing_protocol = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # CORS configuration for the Lambda function URL. When null, no CORS
  # configuration will be applied.
  cors_config = null

  # The type of origin that this Origin Access Control is for. Valid values are
  # lambda, mediapackagev2, mediastore, and s3
  oac_origin_type = "lambda"

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

Autherisation type of genrating function url

</HclListItemDescription>
</HclListItem>

<HclListItem name="aws_region" requirement="required" type="string">
<HclListItemDescription>

The AWS region in which all resources will be created

</HclListItemDescription>
</HclListItem>

<HclListItem name="cloudfront_oac_name" requirement="required" type="string">
<HclListItemDescription>

Name of the CloudFront Origin Access Control

</HclListItemDescription>
</HclListItem>

<HclListItem name="iam_role_name" requirement="required" type="string">
<HclListItemDescription>

The name of the iam role to be created

</HclListItemDescription>
</HclListItem>

<HclListItem name="lambda_function_name" requirement="required" type="string">
<HclListItemDescription>

The name of the Lambda function. Used to generate function url

</HclListItemDescription>
</HclListItem>

<HclListItem name="oac_signing_behavior" requirement="required" type="string">
<HclListItemDescription>

Specifies which requests CloudFront signs. Specify always for the most common use case. Allowed values: always, never, and no-override.

</HclListItemDescription>
</HclListItem>

<HclListItem name="oac_signing_protocol" requirement="required" type="string">
<HclListItemDescription>

Determines how CloudFront signs (authenticates) requests. The only valid value is sigv4.

</HclListItemDescription>
</HclListItem>

### Optional

<HclListItem name="cors_config" requirement="optional" type="object(…)">
<HclListItemDescription>

CORS configuration for the Lambda function URL. When null, no CORS configuration will be applied.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
object({
    allow_credentials = optional(bool)
    allow_origins     = optional(list(string))
    allow_methods     = optional(list(string))
    allow_headers     = optional(list(string))
    expose_headers    = optional(list(string))
    max_age           = optional(number)
  })
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="oac_origin_type" requirement="optional" type="string">
<HclListItemDescription>

The type of origin that this Origin Access Control is for. Valid values are lambda, mediapackagev2, mediastore, and s3

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;lambda&quot;"/>
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

<HclListItem name="oac_id">
<HclListItemDescription>

The unique identifier of Origin Access Control

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
    "https://github.com/gruntwork-io/terraform-aws-lambda/tree/v1.3.0/modules/lambda-function-url/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-lambda/tree/v1.3.0/modules/lambda-function-url/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-lambda/tree/v1.3.0/modules/lambda-function-url/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "a0eb1d3874d965b4bcc9102b27b7aa2e"
}
##DOCS-SOURCER-END -->

---
title: "Lambda Function HTTP API Gateway"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="AWS Lambda" version="0.24.0" lastModifiedVersion="0.22.0"/>

<!-- Frontmatter
type: service
name: Lambda Function HTTP API Gateway
description: Deploy an HTTP API Gateway integrated with Lambda functions.
category: networking
cloud: aws
tags: ["lambda"]
license: gruntwork
built-with: terraform
-->

<a href="https://github.com/gruntwork-io/terraform-aws-lambda/tree/v0.24.0/modules/lambda-http-api-gateway" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.22.0" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

# Lambda Function HTTP API Gateway

## Overview

This module contains [Terraform](https://www.terraform.io) code to deploy [a HTTP (V2) API
Gateway](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api.html) to front Lambda functions so that
they can be invoked on HTTP calls.

![Serverless architecture](/img/reference/modules/terraform-aws-lambda/lambda-http-api-gateway/serverless-v2-architecture.png)

:::note

If you are looking for a simple proxy to route all requests to a Lambda function, refer to the
[api-gateway-proxy](https://github.com/gruntwork-io/terraform-aws-lambda/tree/v0.24.0/modules/api-gateway-proxy) module.

:::

## Features

*   Expose serverless applications using API Gateway.
*   Route different HTTP methods and paths to different Lambda functions.
*   Use request authorizers to protect routes

## Learn

:::note

This repo is a part of the [the Gruntwork Infrastructure as Code Library](https://gruntwork.io/infrastructure-as-code-library/),
a collection of reusable, battle-tested, production ready infrastructure code.
If you’ve never used the Gruntwork Modules before, make sure to read
[Using Gruntwork Terraform Modules](https://docs.gruntwork.io/guides/working-with-code/using-modules)!

:::

*   [What is Amazon API Gateway?](https://docs.aws.amazon.com/apigateway/latest/developerguide/welcome.html)
*   [What is the difference between HTTP API Gateway and REST API
    Gateway?](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-vs-rest.html)

## Deploy

### Non-production deployment (quick start for learning)

If you just want to try this repo out for experimenting and learning, check out the following resources:

*   [examples/lambda-http-api-gateway](https://github.com/gruntwork-io/terraform-aws-lambda/tree/v0.24.0/examples/lambda-http-api-gateway): This example contains sample code that uses
    this module to route two different requests to two different Lambda functions.

## Manage

### What is the syntax for the keys of the route_config input variable?

The `route_config` variable expects the keys to be HTTP API Gateway routes. Refer to the [official AWS
documentation](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-develop-routes.html) for more
information on route syntax that API Gateway expects.

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S LAMBDA-HTTP-API-GATEWAY MODULE
# ------------------------------------------------------------------------------------------------------

module "lambda_http_api_gateway" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-lambda.git//modules/lambda-http-api-gateway?ref=v0.24.0"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The name of the API Gateway. This will be used to namespace all resources
  # created by this module.
  name = <string>

  # Routing configurations for the API Gateway, encoded as a map from route to
  # lambda function configuration. The keys should be the routes to match (e.g.,
  # 'GET /pet').
  route_config = <any>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The ID (ARN, alias ARN, AWS ID) of a customer managed KMS Key to use for
  # encrypting log data. Only used if var.access_log_cloudwatch_log_group_name
  # is set.
  access_log_cloudwatch_log_group_kms_key_id = null

  # The name of the CloudWatch Log Group where API Gateway access logs should be
  # stored. When null, access logs will be disabled.
  access_log_cloudwatch_log_group_name = null

  # The number of days to retain log events in the log group. Refer to
  # https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudwatch_log_group#retention_in_days
  # for all the valid values. When null, the log events are retained forever.
  # Only used if var.access_log_cloudwatch_log_group_name is set.
  access_log_cloudwatch_log_group_retention_in_days = null

  # The ARN of the destination to deliver matching log events to. Kinesis stream
  # or Lambda function ARN. Only used if
  # var.access_log_cloudwatch_log_group_name is set.
  access_log_cloudwatch_log_group_subscription_destination_arn = null

  # The method used to distribute log data to the destination. Only applicable
  # when var.cloudwatch_log_group_subscription_destination_arn is a kinesis
  # stream. Valid values are `Random` and `ByLogStream`.
  access_log_cloudwatch_log_group_subscription_distribution = null

  # A valid CloudWatch Logs filter pattern for subscribing to a filtered stream
  # of log events. Only used if var.access_log_cloudwatch_log_group_name is set.
  access_log_cloudwatch_log_group_subscription_filter_pattern = ""

  # ARN of an IAM role that grants Amazon CloudWatch Logs permissions to deliver
  # ingested log events to the destination. Only applicable when
  # var.cloudwatch_log_group_subscription_destination_arn is a kinesis stream.
  access_log_cloudwatch_log_group_subscription_role_arn = null

  # Tags to apply on the CloudWatch Log Group, encoded as a map where the keys
  # are tag keys and values are tag values. Only used if
  # var.access_log_cloudwatch_log_group_name is set.
  access_log_cloudwatch_log_group_tags = null

  # The format of the access logs as they are logged by API Gateway. Refer to
  # https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-logging.html#apigateway-cloudwatch-log-formats
  # for how each format appears. When set to CUSTOM, the format specified in
  # var.custom_access_log_format will be used. Valid values are CLF, JSON, and
  # CUSTOM. Only used when var.access_log_cloudwatch_log_group_name is set.
  access_log_format_type = "JSON"

  # A map of tags to assign to the API.
  api_tags = {}

  # A version identifier for the API.
  api_version = null

  # The domain to use when looking up the ACM certificate. This is useful for
  # looking up wild card certificates that will match the given domain name.
  # When null (default), var.domain_name will be used to look up the
  # certificate.
  certificate_domain = null

  # The cross-origin resource sharing (CORS) configuration to apply to the API.
  cors_configuration = null

  # Set to true if you want a DNS record automatically created and pointed at
  # the API Gateway endpoint.
  create_route53_entry = false

  # A single line format of the access logs of data, as specified by selected
  # $context variables. Only used when var.access_log_format_type is CUSTOM.
  custom_access_log_format = null

  # The description of the API.
  description = null

  # The domain name to create a route 53 record for. This DNS record will point
  # to the API Gateway endpoint.
  domain_name = null

  # The ID of the Route 53 hosted zone into which the Route 53 DNS record should
  # be written.
  hosted_zone_id = null

  # Authorizers for the API Gateway, encoded as a map from authorizer name to
  # authorizer configuration. The keys should be the authorizer name.
  lambda_authorizers = {}

  # A map of tags to assign to the API Gateway stage.
  stage_tags = {}

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S LAMBDA-HTTP-API-GATEWAY MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-lambda.git//modules/lambda-http-api-gateway?ref=v0.24.0"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The name of the API Gateway. This will be used to namespace all resources
  # created by this module.
  name = <string>

  # Routing configurations for the API Gateway, encoded as a map from route to
  # lambda function configuration. The keys should be the routes to match (e.g.,
  # 'GET /pet').
  route_config = <any>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The ID (ARN, alias ARN, AWS ID) of a customer managed KMS Key to use for
  # encrypting log data. Only used if var.access_log_cloudwatch_log_group_name
  # is set.
  access_log_cloudwatch_log_group_kms_key_id = null

  # The name of the CloudWatch Log Group where API Gateway access logs should be
  # stored. When null, access logs will be disabled.
  access_log_cloudwatch_log_group_name = null

  # The number of days to retain log events in the log group. Refer to
  # https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudwatch_log_group#retention_in_days
  # for all the valid values. When null, the log events are retained forever.
  # Only used if var.access_log_cloudwatch_log_group_name is set.
  access_log_cloudwatch_log_group_retention_in_days = null

  # The ARN of the destination to deliver matching log events to. Kinesis stream
  # or Lambda function ARN. Only used if
  # var.access_log_cloudwatch_log_group_name is set.
  access_log_cloudwatch_log_group_subscription_destination_arn = null

  # The method used to distribute log data to the destination. Only applicable
  # when var.cloudwatch_log_group_subscription_destination_arn is a kinesis
  # stream. Valid values are `Random` and `ByLogStream`.
  access_log_cloudwatch_log_group_subscription_distribution = null

  # A valid CloudWatch Logs filter pattern for subscribing to a filtered stream
  # of log events. Only used if var.access_log_cloudwatch_log_group_name is set.
  access_log_cloudwatch_log_group_subscription_filter_pattern = ""

  # ARN of an IAM role that grants Amazon CloudWatch Logs permissions to deliver
  # ingested log events to the destination. Only applicable when
  # var.cloudwatch_log_group_subscription_destination_arn is a kinesis stream.
  access_log_cloudwatch_log_group_subscription_role_arn = null

  # Tags to apply on the CloudWatch Log Group, encoded as a map where the keys
  # are tag keys and values are tag values. Only used if
  # var.access_log_cloudwatch_log_group_name is set.
  access_log_cloudwatch_log_group_tags = null

  # The format of the access logs as they are logged by API Gateway. Refer to
  # https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-logging.html#apigateway-cloudwatch-log-formats
  # for how each format appears. When set to CUSTOM, the format specified in
  # var.custom_access_log_format will be used. Valid values are CLF, JSON, and
  # CUSTOM. Only used when var.access_log_cloudwatch_log_group_name is set.
  access_log_format_type = "JSON"

  # A map of tags to assign to the API.
  api_tags = {}

  # A version identifier for the API.
  api_version = null

  # The domain to use when looking up the ACM certificate. This is useful for
  # looking up wild card certificates that will match the given domain name.
  # When null (default), var.domain_name will be used to look up the
  # certificate.
  certificate_domain = null

  # The cross-origin resource sharing (CORS) configuration to apply to the API.
  cors_configuration = null

  # Set to true if you want a DNS record automatically created and pointed at
  # the API Gateway endpoint.
  create_route53_entry = false

  # A single line format of the access logs of data, as specified by selected
  # $context variables. Only used when var.access_log_format_type is CUSTOM.
  custom_access_log_format = null

  # The description of the API.
  description = null

  # The domain name to create a route 53 record for. This DNS record will point
  # to the API Gateway endpoint.
  domain_name = null

  # The ID of the Route 53 hosted zone into which the Route 53 DNS record should
  # be written.
  hosted_zone_id = null

  # Authorizers for the API Gateway, encoded as a map from authorizer name to
  # authorizer configuration. The keys should be the authorizer name.
  lambda_authorizers = {}

  # A map of tags to assign to the API Gateway stage.
  stage_tags = {}

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

The name of the API Gateway. This will be used to namespace all resources created by this module.

</HclListItemDescription>
</HclListItem>

<HclListItem name="route_config" requirement="required" type="any">
<HclListItemDescription>

Routing configurations for the API Gateway, encoded as a map from route to lambda function configuration. The keys should be the routes to match (e.g., 'GET /pet').

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
Any types represent complex values of variable type. For details, please consult `variables.tf` in the source repo.
```

</HclListItemTypeDetails>
<HclGeneralListItem title="More Details">
<details>


```hcl

   Ideally, we will use a more strict type here but since we want to support required and optional values, and since
   Terraform's type system only supports maps that have the same type for all values, we have to use the less useful
   `any` type.

```
</details>

<details>


```hcl

   The values support the following attributes:
  
   REQUIRED (must be provided for every entry):
   - lambda_function_arn     string   : ARN of the Lambda function that should be invoked for requests to this route.
  
   OPTIONAL:
   - description             string   : The description of the integration.
   - payload_format_version  string   : The format of the payload to use as specified by API Gateway. Defaults to 1.0.
   - timeout_milliseconds    number   : Custom timeout between 50 and 30,000 milliseconds for HTTP APIs. The default
                                        timeout is 30 seconds.
   - authorizer_name         string   : The name of the authorizer to use for this route. The name should match the
                                        name of an authorizer defined in var.lambda_authorizers.
   - authorization_type      string   : The type of authorization to use for this route. Valid values are NONE, JWT, and
                                        AWS_IAM and CUSTOM. Defaults to CUSTOM if authorizer_name is set otherwise NONE.
  
   Example:
   {
     "ANY /" = {
       lambda_function_arn = "default-function-arn"
     }
     "GET /pet" = {
       lambda_function_arn  = "pet-function-arn"
       timeout_milliseconds = 100
       authorizer_name      = lambda-authorizer
     }
   }

```
</details>

</HclGeneralListItem>
</HclListItem>

### Optional

<HclListItem name="access_log_cloudwatch_log_group_kms_key_id" requirement="optional" type="string">
<HclListItemDescription>

The ID (ARN, alias ARN, AWS ID) of a customer managed KMS Key to use for encrypting log data. Only used if <a href="#access_log_cloudwatch_log_group_name"><code>access_log_cloudwatch_log_group_name</code></a> is set.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="access_log_cloudwatch_log_group_name" requirement="optional" type="string">
<HclListItemDescription>

The name of the CloudWatch Log Group where API Gateway access logs should be stored. When null, access logs will be disabled.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="access_log_cloudwatch_log_group_retention_in_days" requirement="optional" type="number">
<HclListItemDescription>

The number of days to retain log events in the log group. Refer to https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudwatch_log_group#retention_in_days for all the valid values. When null, the log events are retained forever. Only used if <a href="#access_log_cloudwatch_log_group_name"><code>access_log_cloudwatch_log_group_name</code></a> is set.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="access_log_cloudwatch_log_group_subscription_destination_arn" requirement="optional" type="string">
<HclListItemDescription>

The ARN of the destination to deliver matching log events to. Kinesis stream or Lambda function ARN. Only used if <a href="#access_log_cloudwatch_log_group_name"><code>access_log_cloudwatch_log_group_name</code></a> is set.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="access_log_cloudwatch_log_group_subscription_distribution" requirement="optional" type="string">
<HclListItemDescription>

The method used to distribute log data to the destination. Only applicable when <a href="#cloudwatch_log_group_subscription_destination_arn"><code>cloudwatch_log_group_subscription_destination_arn</code></a> is a kinesis stream. Valid values are `Random` and `ByLogStream`.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="access_log_cloudwatch_log_group_subscription_filter_pattern" requirement="optional" type="string">
<HclListItemDescription>

A valid CloudWatch Logs filter pattern for subscribing to a filtered stream of log events. Only used if <a href="#access_log_cloudwatch_log_group_name"><code>access_log_cloudwatch_log_group_name</code></a> is set.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;&quot;"/>
</HclListItem>

<HclListItem name="access_log_cloudwatch_log_group_subscription_role_arn" requirement="optional" type="string">
<HclListItemDescription>

ARN of an IAM role that grants Amazon CloudWatch Logs permissions to deliver ingested log events to the destination. Only applicable when <a href="#cloudwatch_log_group_subscription_destination_arn"><code>cloudwatch_log_group_subscription_destination_arn</code></a> is a kinesis stream.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="access_log_cloudwatch_log_group_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

Tags to apply on the CloudWatch Log Group, encoded as a map where the keys are tag keys and values are tag values. Only used if <a href="#access_log_cloudwatch_log_group_name"><code>access_log_cloudwatch_log_group_name</code></a> is set.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="access_log_format_type" requirement="optional" type="string">
<HclListItemDescription>

The format of the access logs as they are logged by API Gateway. Refer to https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-logging.html#apigateway-cloudwatch-log-formats for how each format appears. When set to CUSTOM, the format specified in <a href="#custom_access_log_format"><code>custom_access_log_format</code></a> will be used. Valid values are CLF, JSON, and CUSTOM. Only used when <a href="#access_log_cloudwatch_log_group_name"><code>access_log_cloudwatch_log_group_name</code></a> is set.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;JSON&quot;"/>
</HclListItem>

<HclListItem name="api_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

A map of tags to assign to the API.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="api_version" requirement="optional" type="string">
<HclListItemDescription>

A version identifier for the API.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="certificate_domain" requirement="optional" type="string">
<HclListItemDescription>

The domain to use when looking up the ACM certificate. This is useful for looking up wild card certificates that will match the given domain name. When null (default), <a href="#domain_name"><code>domain_name</code></a> will be used to look up the certificate.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="cors_configuration" requirement="optional" type="any">
<HclListItemDescription>

The cross-origin resource sharing (CORS) configuration to apply to the API.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
Any types represent complex values of variable type. For details, please consult `variables.tf` in the source repo.
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="null"/>
<HclGeneralListItem title="More Details">
<details>


```hcl

   Ideally, we will use a more strict type here but since we want to support required and optional values, and since
   Terraform's type system only supports maps that have the same type for all values, we have to use the less useful
   `any` type.

```
</details>

<details>


```hcl

   The values support the following attributes:
   OPTIONAL (at least one must be set):
   - allow_credentials   bool          : Whether credentials are included in the CORS request.
   - allow_headers       list(string)  : The set of allowed HTTP headers in the CORS request.
   - allow_methods       list(string)  : The set of allowed HTTP methods in the CORS request.
   - allow_origins       list(string)  : The set of allowed origins in the CORS request.
   - expose_headers      list(string)  : The set of exposed HTTP headers in the CORS request.
   - max_age             number        : The number of seconds that the browser should cache preflight request results.
  
   Example:
   {
     allow_credentials = true
     allow_headers     = ["Authorization", "*"]
   }

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="create_route53_entry" requirement="optional" type="bool">
<HclListItemDescription>

Set to true if you want a DNS record automatically created and pointed at the API Gateway endpoint.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="custom_access_log_format" requirement="optional" type="string">
<HclListItemDescription>

A single line format of the access logs of data, as specified by selected $context variables. Only used when <a href="#access_log_format_type"><code>access_log_format_type</code></a> is CUSTOM.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="description" requirement="optional" type="string">
<HclListItemDescription>

The description of the API.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="domain_name" requirement="optional" type="string">
<HclListItemDescription>

The domain name to create a route 53 record for. This DNS record will point to the API Gateway endpoint.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="hosted_zone_id" requirement="optional" type="string">
<HclListItemDescription>

The ID of the Route 53 hosted zone into which the Route 53 DNS record should be written.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="lambda_authorizers" requirement="optional" type="map(any)">
<HclListItemDescription>

Authorizers for the API Gateway, encoded as a map from authorizer name to authorizer configuration. The keys should be the authorizer name.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
Any types represent complex values of variable type. For details, please consult `variables.tf` in the source repo.
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="{}"/>
<HclGeneralListItem title="Examples">
<details>
  <summary>Example</summary>


```hcl
   {
     "lambda-authorizer"                 = {
       authorizer_payload_format_version = "1.0"
       authorizer_uri                    = "lambda-authorizer-uri"
     }
   }

```
</details>

</HclGeneralListItem>
<HclGeneralListItem title="More Details">
<details>


```hcl

   The values support the following attributes:
  
   REQUIRED (must be provided for every entry):
   - authorizer_name   string   : The name of the authorizer Lambda function.

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="stage_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

A map of tags to assign to the API Gateway stage.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="api_endpoint">
<HclListItemDescription>

The URI of the API. The domain_name input, if create_route53_entry is set, will route to this endpoint.

</HclListItemDescription>
</HclListItem>

<HclListItem name="apigatewayv2_api_id">
<HclListItemDescription>

The ID of the API Gateway V2 API resource.

</HclListItemDescription>
</HclListItem>

<HclListItem name="apigatewayv2_default_stage_id">
<HclListItemDescription>

The ID of the default stage created for the API Gateway V2 API.

</HclListItemDescription>
</HclListItem>

<HclListItem name="apigatewayv2_integration_ids">
<HclListItemDescription>

A map from the route keys to the IDs of the corresponding API Gateway V2 Integration resource.

</HclListItemDescription>
</HclListItem>

<HclListItem name="apigatewayv2_route_ids">
<HclListItemDescription>

A map from the route keys to the IDs of the corresponding API Gateway V2 Route resource.

</HclListItemDescription>
</HclListItem>

</TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-lambda/tree/v0.24.0/modules/lambda-http-api-gateway/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-lambda/tree/v0.24.0/modules/lambda-http-api-gateway/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-lambda/tree/v0.24.0/modules/lambda-http-api-gateway/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "da4d62abb264bae92fa384d8287487fb"
}
##DOCS-SOURCER-END -->

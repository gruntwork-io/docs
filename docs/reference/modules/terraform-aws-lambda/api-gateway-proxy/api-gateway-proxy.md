---
title: "API Gateway Proxy Module"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="AWS Lambda" version="1.0.2" lastModifiedVersion="0.22.0"/>

# API Gateway Proxy Module

<a href="https://github.com/gruntwork-io/terraform-aws-lambda/tree/v1.0.2/modules/api-gateway-proxy" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.22.0" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This module creates an [API Gateway](https://aws.amazon.com/api-gateway/) that can be used to expose your serverless
applications running in [AWS Lambda](https://aws.amazon.com/lambda/).

This module configures API Gateway to proxy all requests to the underlying Lambda function with basic path-based routing
(but no control over HTTP method based routing, or other details). The Lambda function can contain any code that handles
the requests from API Gateway: e.g., you can use a full web framework like Express, or you can write a handler with your
own route handling logic, or whatever else you want.

This module does not provide a way to define individual routes, methods, etc in the API Gateway. If you need more
control over the API Gateway settings, consider using [the Serverless framework](https://www.serverless.com/). We
recommend using a framework like Serverless to avoid the verbose configuration of routing for API Gateway in Terraform.

![Serverless architecture](/img/reference/modules/terraform-aws-lambda/api-gateway-proxy/serverless-architecture.png)

:::note

If you are looking for a module to route different requests and methods to different Lambda functions, refer to the
[lambda-http-api-gateway](https://github.com/gruntwork-io/terraform-aws-lambda/tree/v1.0.2/modules/lambda-http-api-gateway) module.

:::

:::important

This module specifies `configuration_aliases`, requiring an `aws` provider configured for the `us-east-1`
region with the alias `us_east_1` to be provided.

:::

## Features

*   Expose serverless applications using API Gateway
*   Proxy all requests from the gateway to the underlying applications

## Learn

This repo is a part of [the Gruntwork Infrastructure as Code Library](https://gruntwork.io/infrastructure-as-code-library/),
a collection of reusable, battle-tested, production ready infrastructure code. If you've never used the Infrastructure as Code Library
before, make sure to read [How to use the Gruntwork Infrastructure as Code Library](https://gruntwork.io/guides/foundations/how-to-use-gruntwork-infrastructure-as-code-library/)!

### Core concepts

*   [What is API Gateway?](https://github.com/gruntwork-io/terraform-aws-lambda/tree/v1.0.2/modules/api-gateway-proxy/core-concepts.md#what-is-api-gateway)
*   [What is the difference between the different endpoint
    types?](https://github.com/gruntwork-io/terraform-aws-lambda/tree/v1.0.2/modules/api-gateway-proxy/core-concepts.md#what-is-the-difference-between-the-different-endpoint-types)
*   [API Gateway Documentation](https://docs.aws.amazon.com/apigateway/latest/developerguide/welcome.html): Amazon's docs
    on API Gateway covering core concepts such as security, monitoring, and invoking APIs.

### Repo organization

*   [modules](https://github.com/gruntwork-io/terraform-aws-lambda/tree/v1.0.2/modules): the main implementation code for this repo, broken down into multiple standalone, orthogonal submodules.
*   [examples](https://github.com/gruntwork-io/terraform-aws-lambda/tree/v1.0.2/examples): This folder contains working examples of how to use the submodules.
*   [test](https://github.com/gruntwork-io/terraform-aws-lambda/tree/v1.0.2/test): Automated tests for the modules and examples.

## Deploy

If you just want to try this repo out for experimenting and learning, check out the following resources:

*   [examples folder](https://github.com/gruntwork-io/terraform-aws-lambda/tree/v1.0.2/examples): The `examples` folder contains sample code optimized for learning, experimenting, and testing (but not production usage).

## Manage

### Day-to-day operations

*   [How do I expose AWS Lambda functions using API
    Gateway?](https://github.com/gruntwork-io/terraform-aws-lambda/tree/v1.0.2/modules/api-gateway-proxy/core-concepts.md#how-do-i-expose-aws-lambda-functions-using-api-gateway)
*   [Can I expose additional lambda functions in a decentralized
    manner?](https://github.com/gruntwork-io/terraform-aws-lambda/tree/v1.0.2/modules/api-gateway-proxy/core-concepts.md#can-i-expose-additional-lambda-functions-in-a-decentralized-manner)
*   [How do I pass in the us_east\_1 aws provider?](https://github.com/gruntwork-io/terraform-aws-lambda/tree/v1.0.2/modules/api-gateway-proxy/core-concepts.md#how-do-i-pass-in-the-us_east\_1-aws-provider)

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S API-GATEWAY-PROXY MODULE
# ------------------------------------------------------------------------------------------------------

module "api_gateway_proxy" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-lambda.git//modules/api-gateway-proxy?ref=v1.0.2"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Name of the API Gateway REST API.
  api_name = <string>

  # Map of path prefixes to lambda functions to invoke. Any request that hits
  # paths under the prefix will be routed to the lambda function. Note that this
  # only supports single levels for now (e.g., you can configure to route `foo`
  # and everything below that path like `foo/api/v1`, but you cannot configure
  # to route something like `api/foo/*`). Use empty string for the path prefix
  # if you wish to route all requests, including the root path, to the lambda
  # function. Refer to the example for more info.
  lambda_functions = <map(string)>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # List of binary media types supported by the REST API. The default only
  # supports UTF-8 encoded text payloads.
  api_binary_media_types = null

  # Description to set on the API Gateway REST API. If empty string, defaults to
  # 'REST API that proxies to lambda function LAMBDA_FUNCTION_NAME'. Set to null
  # if you wish to have an API with no description.
  api_description = ""

  # Configuration of the API endpoint for the API Gateway REST API. Defaults to
  # EDGE configuration. 
  api_endpoint_configuration = null

  # Source of the API key for requests. Valid values are HEADER (default) and
  # AUTHORIZER.
  api_key_source = null

  # Minimum response size to compress for the REST API. Must be a value between
  # -1 and 10485760 (10MB). Setting a value greater than -1 will enable
  # compression, -1 disables compression (default).
  api_minimum_compression_size = null

  # Map of HTTP methods (e.g., GET, POST, etc - * for all methods) to the API
  # settings to apply for that method. Refer to the terraform resource docs for
  # available settings:
  # https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/api_gateway_method_settings#settings.
  api_settings = {}

  # ARN of the ACM certificate you wish to use for the bound domain name. When
  # null, the module will look up an issued certificate that is bound to the
  # given domain name, unless var.certificate_domain is set.
  certificate_arn = null

  # The domain to use when looking up the ACM certificate. This is useful for
  # looking up wild card certificates that will match the given domain name.
  certificate_domain = null

  # Set to true to automatically create a Rest API policy if necessary, or use
  # `var.rest_api_policy` to pass an external policy. A Rest API policy is
  # necessary if using PRIVATE api_endpoint_configuration type.
  create_rest_api_policy = false

  # Map of tags (where the key is the tag key and the value is tag value) to
  # apply to the resources in this module.
  custom_tags = {}

  # Description to apply to the API Gateway deployment. This can be useful to
  # identify the API Gateway deployment managed by this module.
  deployment_description = null

  # An arbitrary identifier to assign to the API Gateway deployment. Updates to
  # this value will trigger a redeploy of the API Gateway, which is necessary
  # when any underlying configuration changes. This is the only way to trigger a
  # redeployment of an existing API Gateway if force_deployment = false.
  deployment_id = ""

  # Path segment that must be prepended to the path when accessing the API via
  # the given domain. If omitted, the API is exposed at the root of the given
  # domain.
  domain_base_path = null

  # Full domain (e.g., api.example.com) you wish to bind to the API Gateway
  # endpoint. Set to null if you do not wish to bind any domain name.
  domain_name = null

  # The Transport Layer Security (TLS) version + cipher suite for the API
  # Gateway DomainName. The valid values are TLS_1_0 and TLS_1_2.
  domain_name_security_policy = null

  # When true, enables the execute-api endpoint. Set to false if you wish for
  # clients to only access the API via the domain set on var.domain_name.
  enable_execute_api_endpoint = true

  # When true, route the root path (URL or URL/) to the lambda function
  # specified by root_lambda_function_name. This is useful when you want to
  # route just the home route to a specific lambda function when configuring
  # path based routing with var.lambda_functions. Conflicts with the catch all
  # lambda function, which is configured using the empty string key in
  # var.lambda_functions. Do not use this to configure a catch all lambda
  # function.
  enable_root_lambda_function = false

  # When true, force a deployment on every touch. Ideally we can cause a
  # deployment on the API Gateway only when a configuration changes, but
  # terraform does not give reliable mechanisms for triggering a redeployment
  # when any related resource changes. As such, we must either pessimistically
  # redeploy on every touch, or have user control it. You must use the
  # var.deployment_id input variable to trigger redeployments if this is false.
  # Note that setting this to true will, by nature, cause a perpetual diff on
  # the module.
  force_deployment = true

  # Domain name to use when looking up the Route 53 hosted zone to bind the API
  # Gateway domain to. Only used if hosted_zone_id is null.
  hosted_zone_domain_name = null

  # ID of the Route 53 zone where the domain should be configured. If null, this
  # module will lookup the hosted zone using the domain name, or the provided
  # parameters.
  hosted_zone_id = null

  # Tags to use when looking up the Route 53 hosted zone to bind the domain to.
  # Only used if hosted_zone_id is null.
  hosted_zone_tags = {}

  # Configuration for passing an external Rest API policy to be attached to API
  # Gateway, instead of the one created internally when setting
  # `var.rest_api_policy` to true. A Rest API policy is necessary if using
  # PRIVATE api_endpoint_configuration type.
  override_rest_api_policy = null

  # Name of the lambda function to invoke just for the root path (URL or URL/).
  # Only used if enable_root_lambda_function is true.
  root_lambda_function_name = null

  # Description to set on the stage managed by the stage_name variable.
  stage_description = null

  # Name of the stage to create with this API Gateway deployment.
  stage_name = "live"

  # Whether active tracing with X-ray is enabled.
  stage_xray_tracing_enabled = true

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S API-GATEWAY-PROXY MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-lambda.git//modules/api-gateway-proxy?ref=v1.0.2"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Name of the API Gateway REST API.
  api_name = <string>

  # Map of path prefixes to lambda functions to invoke. Any request that hits
  # paths under the prefix will be routed to the lambda function. Note that this
  # only supports single levels for now (e.g., you can configure to route `foo`
  # and everything below that path like `foo/api/v1`, but you cannot configure
  # to route something like `api/foo/*`). Use empty string for the path prefix
  # if you wish to route all requests, including the root path, to the lambda
  # function. Refer to the example for more info.
  lambda_functions = <map(string)>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # List of binary media types supported by the REST API. The default only
  # supports UTF-8 encoded text payloads.
  api_binary_media_types = null

  # Description to set on the API Gateway REST API. If empty string, defaults to
  # 'REST API that proxies to lambda function LAMBDA_FUNCTION_NAME'. Set to null
  # if you wish to have an API with no description.
  api_description = ""

  # Configuration of the API endpoint for the API Gateway REST API. Defaults to
  # EDGE configuration. 
  api_endpoint_configuration = null

  # Source of the API key for requests. Valid values are HEADER (default) and
  # AUTHORIZER.
  api_key_source = null

  # Minimum response size to compress for the REST API. Must be a value between
  # -1 and 10485760 (10MB). Setting a value greater than -1 will enable
  # compression, -1 disables compression (default).
  api_minimum_compression_size = null

  # Map of HTTP methods (e.g., GET, POST, etc - * for all methods) to the API
  # settings to apply for that method. Refer to the terraform resource docs for
  # available settings:
  # https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/api_gateway_method_settings#settings.
  api_settings = {}

  # ARN of the ACM certificate you wish to use for the bound domain name. When
  # null, the module will look up an issued certificate that is bound to the
  # given domain name, unless var.certificate_domain is set.
  certificate_arn = null

  # The domain to use when looking up the ACM certificate. This is useful for
  # looking up wild card certificates that will match the given domain name.
  certificate_domain = null

  # Set to true to automatically create a Rest API policy if necessary, or use
  # `var.rest_api_policy` to pass an external policy. A Rest API policy is
  # necessary if using PRIVATE api_endpoint_configuration type.
  create_rest_api_policy = false

  # Map of tags (where the key is the tag key and the value is tag value) to
  # apply to the resources in this module.
  custom_tags = {}

  # Description to apply to the API Gateway deployment. This can be useful to
  # identify the API Gateway deployment managed by this module.
  deployment_description = null

  # An arbitrary identifier to assign to the API Gateway deployment. Updates to
  # this value will trigger a redeploy of the API Gateway, which is necessary
  # when any underlying configuration changes. This is the only way to trigger a
  # redeployment of an existing API Gateway if force_deployment = false.
  deployment_id = ""

  # Path segment that must be prepended to the path when accessing the API via
  # the given domain. If omitted, the API is exposed at the root of the given
  # domain.
  domain_base_path = null

  # Full domain (e.g., api.example.com) you wish to bind to the API Gateway
  # endpoint. Set to null if you do not wish to bind any domain name.
  domain_name = null

  # The Transport Layer Security (TLS) version + cipher suite for the API
  # Gateway DomainName. The valid values are TLS_1_0 and TLS_1_2.
  domain_name_security_policy = null

  # When true, enables the execute-api endpoint. Set to false if you wish for
  # clients to only access the API via the domain set on var.domain_name.
  enable_execute_api_endpoint = true

  # When true, route the root path (URL or URL/) to the lambda function
  # specified by root_lambda_function_name. This is useful when you want to
  # route just the home route to a specific lambda function when configuring
  # path based routing with var.lambda_functions. Conflicts with the catch all
  # lambda function, which is configured using the empty string key in
  # var.lambda_functions. Do not use this to configure a catch all lambda
  # function.
  enable_root_lambda_function = false

  # When true, force a deployment on every touch. Ideally we can cause a
  # deployment on the API Gateway only when a configuration changes, but
  # terraform does not give reliable mechanisms for triggering a redeployment
  # when any related resource changes. As such, we must either pessimistically
  # redeploy on every touch, or have user control it. You must use the
  # var.deployment_id input variable to trigger redeployments if this is false.
  # Note that setting this to true will, by nature, cause a perpetual diff on
  # the module.
  force_deployment = true

  # Domain name to use when looking up the Route 53 hosted zone to bind the API
  # Gateway domain to. Only used if hosted_zone_id is null.
  hosted_zone_domain_name = null

  # ID of the Route 53 zone where the domain should be configured. If null, this
  # module will lookup the hosted zone using the domain name, or the provided
  # parameters.
  hosted_zone_id = null

  # Tags to use when looking up the Route 53 hosted zone to bind the domain to.
  # Only used if hosted_zone_id is null.
  hosted_zone_tags = {}

  # Configuration for passing an external Rest API policy to be attached to API
  # Gateway, instead of the one created internally when setting
  # `var.rest_api_policy` to true. A Rest API policy is necessary if using
  # PRIVATE api_endpoint_configuration type.
  override_rest_api_policy = null

  # Name of the lambda function to invoke just for the root path (URL or URL/).
  # Only used if enable_root_lambda_function is true.
  root_lambda_function_name = null

  # Description to set on the stage managed by the stage_name variable.
  stage_description = null

  # Name of the stage to create with this API Gateway deployment.
  stage_name = "live"

  # Whether active tracing with X-ray is enabled.
  stage_xray_tracing_enabled = true

}


```

</TabItem>
</Tabs>




## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Required

<HclListItem name="api_name" requirement="required" type="string">
<HclListItemDescription>

Name of the API Gateway REST API.

</HclListItemDescription>
</HclListItem>

<HclListItem name="lambda_functions" requirement="required" type="map(string)">
<HclListItemDescription>

Map of path prefixes to lambda functions to invoke. Any request that hits paths under the prefix will be routed to the lambda function. Note that this only supports single levels for now (e.g., you can configure to route `foo` and everything below that path like `foo/api/v1`, but you cannot configure to route something like `api/foo/*`). Use empty string for the path prefix if you wish to route all requests, including the root path, to the lambda function. Refer to the example for more info.

</HclListItemDescription>
</HclListItem>

### Optional

<HclListItem name="api_binary_media_types" requirement="optional" type="list(string)">
<HclListItemDescription>

List of binary media types supported by the REST API. The default only supports UTF-8 encoded text payloads.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="api_description" requirement="optional" type="string">
<HclListItemDescription>

Description to set on the API Gateway REST API. If empty string, defaults to 'REST API that proxies to lambda function LAMBDA_FUNCTION_NAME'. Set to null if you wish to have an API with no description.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;&quot;"/>
</HclListItem>

<HclListItem name="api_endpoint_configuration" requirement="optional" type="object(…)">
<HclListItemDescription>

Configuration of the API endpoint for the API Gateway REST API. Defaults to EDGE configuration. 

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
object({
    # The endpoint type. Must be one of EDGE, REGIONAL, or PRIVATE.
    # Type PRIVATE requires configuring a REST API policy, see var.create_rest_api policy for more details.
    type = string
    # Set of VPC Endpoint Identifiers to use when using a private endpoint.
    vpc_endpoint_ids = list(string)
  })
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="api_key_source" requirement="optional" type="string">
<HclListItemDescription>

Source of the API key for requests. Valid values are HEADER (default) and AUTHORIZER.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="api_minimum_compression_size" requirement="optional" type="number">
<HclListItemDescription>

Minimum response size to compress for the REST API. Must be a value between -1 and 10485760 (10MB). Setting a value greater than -1 will enable compression, -1 disables compression (default).

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="api_settings" requirement="optional" type="any">
<HclListItemDescription>

Map of HTTP methods (e.g., GET, POST, etc - * for all methods) to the API settings to apply for that method. Refer to the terraform resource docs for available settings: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/api_gateway_method_settings#settings.

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
     GET = {
       metrics_enabled = true
       logging_level   = "INFO"
     }
   }

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="certificate_arn" requirement="optional" type="string">
<HclListItemDescription>

ARN of the ACM certificate you wish to use for the bound domain name. When null, the module will look up an issued certificate that is bound to the given domain name, unless <a href="#certificate_domain"><code>certificate_domain</code></a> is set.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="certificate_domain" requirement="optional" type="string">
<HclListItemDescription>

The domain to use when looking up the ACM certificate. This is useful for looking up wild card certificates that will match the given domain name.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="create_rest_api_policy" requirement="optional" type="bool">
<HclListItemDescription>

Set to true to automatically create a Rest API policy if necessary, or use `<a href="#rest_api_policy"><code>rest_api_policy</code></a>` to pass an external policy. A Rest API policy is necessary if using PRIVATE api_endpoint_configuration type.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="custom_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

Map of tags (where the key is the tag key and the value is tag value) to apply to the resources in this module.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="deployment_description" requirement="optional" type="string">
<HclListItemDescription>

Description to apply to the API Gateway deployment. This can be useful to identify the API Gateway deployment managed by this module.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="deployment_id" requirement="optional" type="string">
<HclListItemDescription>

An arbitrary identifier to assign to the API Gateway deployment. Updates to this value will trigger a redeploy of the API Gateway, which is necessary when any underlying configuration changes. This is the only way to trigger a redeployment of an existing API Gateway if force_deployment = false.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;&quot;"/>
</HclListItem>

<HclListItem name="domain_base_path" requirement="optional" type="string">
<HclListItemDescription>

Path segment that must be prepended to the path when accessing the API via the given domain. If omitted, the API is exposed at the root of the given domain.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="domain_name" requirement="optional" type="string">
<HclListItemDescription>

Full domain (e.g., api.example.com) you wish to bind to the API Gateway endpoint. Set to null if you do not wish to bind any domain name.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="domain_name_security_policy" requirement="optional" type="string">
<HclListItemDescription>

The Transport Layer Security (TLS) version + cipher suite for the API Gateway DomainName. The valid values are TLS_1_0 and TLS_1_2.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="enable_execute_api_endpoint" requirement="optional" type="bool">
<HclListItemDescription>

When true, enables the execute-api endpoint. Set to false if you wish for clients to only access the API via the domain set on <a href="#domain_name"><code>domain_name</code></a>.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="enable_root_lambda_function" requirement="optional" type="bool">
<HclListItemDescription>

When true, route the root path (URL or URL/) to the lambda function specified by root_lambda_function_name. This is useful when you want to route just the home route to a specific lambda function when configuring path based routing with <a href="#lambda_functions"><code>lambda_functions</code></a>. Conflicts with the catch all lambda function, which is configured using the empty string key in <a href="#lambda_functions"><code>lambda_functions</code></a>. Do not use this to configure a catch all lambda function.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
<HclGeneralListItem title="More Details">
<details>


```hcl

   MAINTAINER'S NOTE: Ideally, we would add a validation block to ensure that this is not configured if the user has a
   catch all route (var.lambda_functions[""] is set), but the terraform variable validation expression does not support
   looking up other variables in the condition block at this time. So we don't configure variable validation here.

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="force_deployment" requirement="optional" type="bool">
<HclListItemDescription>

When true, force a deployment on every touch. Ideally we can cause a deployment on the API Gateway only when a configuration changes, but terraform does not give reliable mechanisms for triggering a redeployment when any related resource changes. As such, we must either pessimistically redeploy on every touch, or have user control it. You must use the <a href="#deployment_id"><code>deployment_id</code></a> input variable to trigger redeployments if this is false. Note that setting this to true will, by nature, cause a perpetual diff on the module.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="hosted_zone_domain_name" requirement="optional" type="string">
<HclListItemDescription>

Domain name to use when looking up the Route 53 hosted zone to bind the API Gateway domain to. Only used if hosted_zone_id is null.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="hosted_zone_id" requirement="optional" type="string">
<HclListItemDescription>

ID of the Route 53 zone where the domain should be configured. If null, this module will lookup the hosted zone using the domain name, or the provided parameters.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="hosted_zone_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

Tags to use when looking up the Route 53 hosted zone to bind the domain to. Only used if hosted_zone_id is null.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="override_rest_api_policy" requirement="optional" type="string">
<HclListItemDescription>

Configuration for passing an external Rest API policy to be attached to API Gateway, instead of the one created internally when setting `<a href="#rest_api_policy"><code>rest_api_policy</code></a>` to true. A Rest API policy is necessary if using PRIVATE api_endpoint_configuration type.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="root_lambda_function_name" requirement="optional" type="string">
<HclListItemDescription>

Name of the lambda function to invoke just for the root path (URL or URL/). Only used if enable_root_lambda_function is true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="stage_description" requirement="optional" type="string">
<HclListItemDescription>

Description to set on the stage managed by the stage_name variable.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="stage_name" requirement="optional" type="string">
<HclListItemDescription>

Name of the stage to create with this API Gateway deployment.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;live&quot;"/>
</HclListItem>

<HclListItem name="stage_xray_tracing_enabled" requirement="optional" type="bool">
<HclListItemDescription>

Whether active tracing with X-ray is enabled.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="deployment">
<HclListItemDescription>

The API Gateway deployment resource. Contains all the attributes returned by the terraform resource aws_api_gateway_deployment.

</HclListItemDescription>
</HclListItem>

<HclListItem name="rest_api">
<HclListItemDescription>

The API Gateway REST API resource. Contains all the attributes returned by the Terraform resource aws_api_gateway_rest_api.

</HclListItemDescription>
</HclListItem>

<HclListItem name="stage">
<HclListItemDescription>

The API Gateway stage resource. Contains all the attributes returned by the terraform resource aws_api_gateway_stage.

</HclListItemDescription>
</HclListItem>

<HclListItem name="url">
<HclListItemDescription>

The URL of the API Gateway that you can use to invoke it.

</HclListItemDescription>
</HclListItem>

</TabItem>
</Tabs>

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-lambda/tree/v1.0.2/modules/api-gateway-proxy/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-lambda/tree/v1.0.2/modules/api-gateway-proxy/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-lambda/tree/v1.0.2/modules/api-gateway-proxy/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "c5c50aa46f71ca5bbf917e236f903440"
}
##DOCS-SOURCER-END -->

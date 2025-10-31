---
title: "Interface VPC Endpoint"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="VPC Modules" version="0.28.8" lastModifiedVersion="0.28.8"/>

# Interface VPC Endpoint

<a href="https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.28.8/modules/vpc-interface-endpoint" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.28.8" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

By default, if code running within your VPCs makes API calls to AWS (e.g., to fetch data from S3 or trigger a Lambda function), those API calls leave the VPC, and are routed via the public Internet. This Terraform Module launches VPC endpoints that allow code running within your VPCs to privately connect to AWS services and APIs without the traffic leaving the VPC and without going over the public Internet. Although all API calls to AWS are encrypted with TLS, VPC endpoints give you one extra layer of security by keeping your API calls within the AWS network.

If your code only needs to talk to AWS APIs, and nothing else in the public Internet, VPC Endpoints remove the need for running an internet gateway, NAT device, or VPN connection. Under the hood, the VPC Endpoints created by this module are powered by [AWS PrivateLink](https://aws.amazon.com/privatelink/), which costs $0.01/hour and $0.01 per GB data processed - in comparison, NAT Gateway costs $0.045/hour and $0.45 per GB data processed.

## Using AWS service endpoints

Once you've created VPC endpoints using this module, this section describes how code running in your VPC can make use
of those endpoints.

### For all AWS services except STS

For almost all AWS Service endpoints, except STS (which is described in the next section), if you enable the endpoint
for it in this module, any resources you have running in the VPC will *automatically* start using that endpoint
immediately—so there's really nothing else you need to do!

For example, let's say you created the EC2 endpoint as follows:

```hcl
module "example" {
  source = "git::git@github.com:gruntwork-io/terraform-aws-vpc.git//modules/vpc-interface-endpoint?ref=v1.0.8"

  # Create the EC2 endpoint
  enable_ec2_endpoint = true

  vpc_id             = "<YOUR_VPC_ID>"
  subnet_ids         = ["<YOUR_SUBNET_IDS>"]
  security_group_ids = [aws_security_group.vpc_endpoint.id]
}

resource "aws_security_group" "vpc_endpoint" {
  vpc_id = module.vpc_app_example.vpc_id

  # Allow inbound HTTPS for AWS API calls
  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}
```

If you have an EC2 instance running in the subnets passed to `var.subnet_ids`, then any code on that EC2 instance that
uses the AWS SDK will now automatically use a private endpoint for taking to the EC2 API endpoint! For example, if you
were running in `eu-west-1` and you used the AWS CLI to make the following API call:

```bash
aws ec2 describe-instances \
  --region eu-west-1 \
  --debug
```

You would see in the log output something like:

```
POST
content-type:application/x-www-form-urlencoded; charset=utf-8
host:ec2.eu-west-1.amazonaws.com
```

You can see that the code is using a [regional
endpoint](https://docs.aws.amazon.com/general/latest/gr/rande.html#regional-endpoints) to talk to the EC2 service:
`ec2.eu-west-1.amazonaws.com`. You can use `dig` to get info about this endpoint:

```bash
dig +short ec2.eu-west-1.amazonaws.com
```

This should return private IPs from within your VPC. E.g., If your VPC used the CIDR block `10.0.0.0/16`, this might
return something like:

```
10.0.0.24
10.0.0.25
10.0.0.26
```

This tells you that, to talk to the EC2 service, your code is using a regional endpoint that is private to your VPC,
rather than routing out via the public Internet.

### Special behavior for the STS service

The behavior explained in the previous section applies to all AWS services *except* the Security Token Service (STS).
Per the [AWS docs](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_temp_enable-regions.html), for
backwards compatibility reasons, *all* AWS STS requests go to a single global endpoint at `https://sts.amazonaws.com`.
That means that, even if you create a private endpoint for STS, it won't get used unless you follow the steps below.

First, use this module to create the STS endpoint:

```hcl
module "example" {
  source = "git::git@github.com:gruntwork-io/terraform-aws-vpc.git//modules/vpc-interface-endpoint?ref=v1.0.8"

  # Create the STS endpoint
  enable_sts_endpoint = true

  vpc_id             = "<YOUR_VPC_ID>"
  subnet_ids         = ["<YOUR_SUBNET_IDS>"]
  security_group_ids = [aws_security_group.vpc_endpoint.id]
}

resource "aws_security_group" "vpc_endpoint" {
  vpc_id = module.vpc_app_example.vpc_id

  # Allow inbound HTTPS for AWS API calls
  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}
```

Next, any time you have code that needs to talk to STS—e.g., to assume an IAM role or use `get-caller-identity` to
look up its own identity—you need to configure that code to use a regional endpoint. You can do this using the
[`sts_regional_endpoints` configuration](https://docs.aws.amazon.com/credref/latest/refdocs/setting-global-sts_regional_endpoints.html).

You can either set this parameter in the AWS CLI config file at `~/.aws/config`:

```
sts_regional_endpoints = regional
```

Or you can set it as the environment variable `AWS_STS_REGIONAL_ENDPOINTS`:

```bash
export AWS_STS_REGIONAL_ENDPOINTS=regional
```

This should work for [most AWS SDK/CLI
tools](https://docs.aws.amazon.com/credref/latest/refdocs/setting-global-sts_regional_endpoints.html#setting-sts_regional_endpoints-sdk-compat).
Example:

```bash
aws sts get-caller-identity \
  --region eu-west-1 \
  --debug
```

Should show in the logs:

```
POST
content-type:application/x-www-form-urlencoded; charset=utf-8
host:sts.eu-west-1.amazonaws.com
```

Which confirms that a regional endpoint is being used, which should be routed to your private endpoint.

If your SDK does not support the `sts_regional_endpoints` parameter, you may have to set the region and endpoint
parameter in your code explicitly. Here's an example with the AWS Java SDK:

```java
EndpointConfiguration regionEndpointConfig = new EndpointConfiguration("https://sts.eu-west-1.amazonaws.com", "eu-west-1");
AWSSecurityTokenService stsRegionalClient = AWSSecurityTokenServiceClientBuilder.standard()
  .withCredentials(credentials)
  .withEndpointConfiguration(regionEndpointConfig)
  .build();
```

## What's the difference between a Gateway VPC Endpoint and an Interface Endpoint?

The `vpc-app` module automatically creates VPC Endpoints [for S3](https://aws.amazon.com/blogs/aws/new-vpc-endpoint-for-amazon-s3/) and [DynamoDB](https://aws.amazon.com/blogs/aws/new-vpc-endpoints-for-dynamodb/), as these use the older Gateway Endpoints service, which is free. Under the hood, Gateway Endpoints work by adding route table entries to your VPC.

For all other AWS APIs and services, you must use Interface Endpoints, which are powered by the newer [AWS PrivateLink](https://aws.amazon.com/privatelink/). Under the hood, these create an Elastic Network Interface (ENI) with a private IP address from one of your subnets. Please note that Interface Endpoints and AWS PrivateLink are NOT free: the [pricing for AWS PrivateLink](https://aws.amazon.com/privatelink/pricing/) is $0.01 per AZ per hour and $0.01 per GB data processed.

## Security Groups for VPC Endpoints

You need to specify a Security Group to control the traffic through the endpoint. AWS uses port 443 as default
for it's requests and if 443 is not allowed the requests will timeout and fail.

Not specifying a rule allows all traffic.

## Other VPC Core Concepts

Learn about [Other VPC Core Concepts](https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.28.8/modules//_docs/vpc-core-concepts.md) like subnets and NAT Gateways.

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S VPC-INTERFACE-ENDPOINT MODULE
# ------------------------------------------------------------------------------------------------------

module "vpc_interface_endpoint" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-vpc.git//modules/vpc-interface-endpoint?ref=v0.28.8"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # A list of IDs of the subnets for all endpoints. Each endpoint will create
  # one ENI (Elastic Network Interface) per subnet.
  subnet_ids = <list(string)>

  # The ID of the VPC for all modules
  vpc_id = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  access_analyzer_endpoint_policy = null

  # Set to false if you don't want to associate a private hosted zone with the
  # specified VPC for the Access Analyzer endpoint
  access_analyzer_endpoint_private_dns_enabled = true

  # The ID of one or more security groups to associate with the network
  # interface for the Access Analyzer endpoint. If none is provided, AWS will
  # associate the default security group for the VPC.
  access_analyzer_endpoint_security_group_ids = []

  # The IDs of subnets in which to create a network interface for the Access
  # Analyzer endpoint. Only a single subnet within an AZ is supported. When
  # defined, it overrides var.subnet_ids. For some regions, Access Analyzer
  # endpoint is not supported in all the AZs, so this variable helps to overcome
  # this issue.
  access_analyzer_endpoint_subnet_ids = []

  # Tags for the Access Analyzer endpoint
  access_analyzer_endpoint_tags = {}

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  acm_pca_endpoint_policy = null

  # Set to false if you don't want to associate a private hosted zone with the
  # specified VPC for the ACM PCA endpoint
  acm_pca_endpoint_private_dns_enabled = true

  # The ID of one or more security groups to associate with the network
  # interface for the ACM PCA endpoint. If none is provided, AWS will associate
  # the default security group for the VPC.
  acm_pca_endpoint_security_group_ids = []

  # The IDs of subnets in which to create a network interface for the ACM PCA
  # endpoint. Only a single subnet within an AZ is supported. When defined, it
  # overrides var.subnet_ids. For some regions, ACM PCA endpoint is not
  # supported in all the AZs, so this variable helps to overcome this issue.
  acm_pca_endpoint_subnet_ids = []

  # Tags for the ACM PCA endpoint
  acm_pca_endpoint_tags = {}

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  api_gateway_endpoint_policy = null

  # Set to false if you don't want to associate a private hosted zone with the
  # specified VPC for the API Gateway endpoint
  api_gateway_endpoint_private_dns_enabled = true

  # The ID of one or more security groups to associate with the network
  # interface for the API Gateway endpoint. If none is provided, AWS will
  # associate the default security group for the VPC.
  api_gateway_endpoint_security_group_ids = []

  # The IDs of subnets in which to create a network interface for the API
  # Gateway endpoint. Only a single subnet within an AZ is supported. If
  # omitted, only subnet_ids will be used.
  api_gateway_endpoint_subnet_ids = []

  # Tags for the API Gateway endpoint
  api_gateway_endpoint_tags = {}

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  appmesh_envoy_management_endpoint_policy = null

  # Set to false if you don't want to associate a private hosted zone with the
  # specified VPC for the AppMesh endpoint
  appmesh_envoy_management_endpoint_private_dns_enabled = true

  # The ID of one or more security groups to associate with the network
  # interface for the AppMesh endpoint. If none is provided, AWS will associate
  # the default security group for the VPC.
  appmesh_envoy_management_endpoint_security_group_ids = []

  # The IDs of subnets in which to create a network interface for the AppMesh
  # endpoint. Only a single subnet within an AZ is supported. When defined, it
  # overrides var.subnet_ids. For some regions, AppMesh endpoint is not
  # supported in all the AZs, so this variable helps to overcome this issue.
  appmesh_envoy_management_endpoint_subnet_ids = []

  # Tags for the AppMesh endpoint
  appmesh_envoy_management_endpoint_tags = {}

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  appstream_api_endpoint_policy = null

  # Set to false if you don't want to associate a private hosted zone with the
  # specified VPC for the AppStream API endpoint
  appstream_api_endpoint_private_dns_enabled = true

  # The ID of one or more security groups to associate with the network
  # interface for the AppStream API endpoint. If none is provided, AWS will
  # associate the default security group for the VPC.
  appstream_api_endpoint_security_group_ids = []

  # The IDs of subnets in which to create a network interface for the AppStream
  # API endpoint. Only a single subnet within an AZ is supported. When defined,
  # it overrides var.subnet_ids. For some regions, AppStream API endpoint is not
  # supported in all the AZs, so this variable helps to overcome this issue.
  appstream_api_endpoint_subnet_ids = []

  # Tags for the AppStream API endpoint
  appstream_api_endpoint_tags = {}

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  appstream_streaming_endpoint_policy = null

  # Set to false if you don't want to associate a private hosted zone with the
  # specified VPC for the AppStream STREAMING endpoint
  appstream_streaming_endpoint_private_dns_enabled = true

  # The ID of one or more security groups to associate with the network
  # interface for the AppStream STREAMING endpoint. If none is provided, AWS
  # will associate the default security group for the VPC.
  appstream_streaming_endpoint_security_group_ids = []

  # The IDs of subnets in which to create a network interface for the AppStream
  # STREAMING endpoint. Only a single subnet within an AZ is supported. When
  # defined, it overrides var.subnet_ids. For some regions, AppStream STREAMING
  # endpoint is not supported in all the AZs, so this variable helps to overcome
  # this issue.
  appstream_streaming_endpoint_subnet_ids = []

  # Tags for the AppStream STREAMING endpoint
  appstream_streaming_endpoint_tags = {}

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  athena_endpoint_policy = null

  # Set to false if you don't want to associate a private hosted zone with the
  # specified VPC for the Athena endpoint
  athena_endpoint_private_dns_enabled = true

  # The ID of one or more security groups to associate with the network
  # interface for the Athena endpoint. If none is provided, AWS will associate
  # the default security group for the VPC.
  athena_endpoint_security_group_ids = []

  # The IDs of subnets in which to create a network interface for the Athena
  # endpoint. Only a single subnet within an AZ is supported. When defined, it
  # overrides var.subnet_ids. For some regions, Athena endpoint is not supported
  # in all the AZs, so this variable helps to overcome this issue.
  athena_endpoint_subnet_ids = []

  # Tags for the Athena endpoint
  athena_endpoint_tags = {}

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  auto_scaling_plans_endpoint_policy = null

  # Set to false if you don't want to associate a private hosted zone with the
  # specified VPC for the Auto Scaling Plans endpoint
  auto_scaling_plans_endpoint_private_dns_enabled = true

  # The ID of one or more security groups to associate with the network
  # interface for the Auto Scaling Plans endpoint. If none is provided, AWS will
  # associate the default security group for the VPC.
  auto_scaling_plans_endpoint_security_group_ids = []

  # The IDs of subnets in which to create a network interface for the Auto
  # Scaling Plans endpoint. Only a single subnet within an AZ is supported. When
  # defined, it overrides var.subnet_ids. For some regions, Auto Scaling Plans
  # endpoint is not supported in all the AZs, so this variable helps to overcome
  # this issue.
  auto_scaling_plans_endpoint_subnet_ids = []

  # Tags for the Auto Scaling Plans endpoint
  auto_scaling_plans_endpoint_tags = {}

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  cloud_directory_endpoint_policy = null

  # Set to false if you don't want to associate a private hosted zone with the
  # specified VPC for the Cloud Directory endpoint
  cloud_directory_endpoint_private_dns_enabled = true

  # The ID of one or more security groups to associate with the network
  # interface for the Cloud Directory endpoint. If none is provided, AWS will
  # associate the default security group for the VPC.
  cloud_directory_endpoint_security_group_ids = []

  # The IDs of subnets in which to create a network interface for the Cloud
  # Directory endpoint. Only a single subnet within an AZ is supported. When
  # defined, it overrides var.subnet_ids. For some regions, Cloud Directory
  # endpoint is not supported in all the AZs, so this variable helps to overcome
  # this issue.
  cloud_directory_endpoint_subnet_ids = []

  # Tags for the Cloud Directory endpoint
  cloud_directory_endpoint_tags = {}

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  cloudformation_endpoint_policy = null

  # Set to false if you don't want to associate a private hosted zone with the
  # specified VPC for the Cloudformation endpoint
  cloudformation_endpoint_private_dns_enabled = true

  # The ID of one or more security groups to associate with the network
  # interface for the Cloudformation endpoint. If none is provided, AWS will
  # associate the default security group for the VPC.
  cloudformation_endpoint_security_group_ids = []

  # The IDs of subnets in which to create a network interface for the
  # theCloudformation endpoint. Only a single subnet within an AZ is supported.
  # If omitted, only subnet_ids will be used.
  cloudformation_endpoint_subnet_ids = []

  # Tags for the CloudFormation endpoint
  cloudformation_endpoint_tags = {}

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  cloudtrail_endpoint_policy = null

  # Set to false if you don't want to associate a private hosted zone with the
  # specified VPC for the CloudTrail endpoint
  cloudtrail_endpoint_private_dns_enabled = true

  # The ID of one or more security groups to associate with the network
  # interface for the CloudTrail endpoint. If none is provided, AWS will
  # associate the default security group for the VPC.
  cloudtrail_endpoint_security_group_ids = []

  # The IDs of subnets in which to create a network interface for the CloudTrail
  # endpoint. Only a single subnet within an AZ is supported. If omitted, only
  # subnet_ids will be used.
  cloudtrail_endpoint_subnet_ids = []

  # Tags for the CloudTrail endpoint
  cloudtrail_endpoint_tags = {}

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  cloudwatch_events_endpoint_policy = null

  # Set to false if you don't want to associate a private hosted zone with the
  # specified VPC for the CloudWatch Events endpoint
  cloudwatch_events_endpoint_private_dns_enabled = true

  # The ID of one or more security groups to associate with the network
  # interface for the CloudWatch Events endpoint. If none is provided, AWS will
  # associate the default security group for the VPC.
  cloudwatch_events_endpoint_security_group_ids = []

  # The IDs of subnets in which to create a network interface for the CloudWatch
  # Events endpoint. Only a single subnet within an AZ is supported. If omitted,
  # only subnet_ids will be used.
  cloudwatch_events_endpoint_subnet_ids = []

  # Tags for the CloudWatch Events endpoint
  cloudwatch_events_endpoint_tags = {}

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  cloudwatch_logs_endpoint_policy = null

  # Set to false if you don't want to associate a private hosted zone with the
  # specified VPC for the CloudWatch Logs endpoint
  cloudwatch_logs_endpoint_private_dns_enabled = true

  # The ID of one or more security groups to associate with the network
  # interface for the CloudWatch Logs endpoint. If none is provided, AWS will
  # associate the default security group for the VPC.
  cloudwatch_logs_endpoint_security_group_ids = []

  # The IDs of subnets in which to create a network interface for the CloudWatch
  # Logs endpoint. Only a single subnet within an AZ is supported. If omitted,
  # only subnet_ids will be used.
  cloudwatch_logs_endpoint_subnet_ids = []

  # Tags for the CloudWatch Logs endpoint
  cloudwatch_logs_endpoint_tags = {}

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  cloudwatch_monitoring_endpoint_policy = null

  # Set to false if you don't want to associate a private hosted zone with the
  # specified VPC for the CloudWatch Monitoring endpoint
  cloudwatch_monitoring_endpoint_private_dns_enabled = true

  # The ID of one or more security groups to associate with the network
  # interface for the CloudWatch Monitoring endpoint. If none is provided, AWS
  # will associate the default security group for the VPC.
  cloudwatch_monitoring_endpoint_security_group_ids = []

  # The IDs of subnets in which to create a network interface for the CloudWatch
  # Monitoring endpoint. Only a single subnet within an AZ is supported. If
  # omitted, only subnet_ids will be used.
  cloudwatch_monitoring_endpoint_subnet_ids = []

  # Tags for the CloudWatch Monitoring endpoint
  cloudwatch_monitoring_endpoint_tags = {}

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  codeartifact_api_endpoint_policy = null

  # Set to false if you don't want to associate a private hosted zone with the
  # specified VPC for the CodeArtifact API endpoint
  codeartifact_api_endpoint_private_dns_enabled = true

  # The ID of one or more security groups to associate with the network
  # interface for the Codeartifact API endpoint. If none is provided, AWS will
  # associate the default security group for the VPC.
  codeartifact_api_endpoint_security_group_ids = []

  # The IDs of subnets in which to create a network interface for the
  # Codeartifact API endpoint. Only a single subnet within an AZ is supported.
  # When defined, it overrides var.subnet_ids. For some regions, Codeartifact
  # API endpoint is not supported in all the AZs, so this variable helps to
  # overcome this issue.
  codeartifact_api_endpoint_subnet_ids = []

  # Tags for the CodeArtifact API endpoint
  codeartifact_api_endpoint_tags = {}

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  codeartifact_repositories_endpoint_policy = null

  # Set to false if you don't want to associate a private hosted zone with the
  # specified VPC for the Codeartifact repositories endpoint
  codeartifact_repositories_endpoint_private_dns_enabled = true

  # The ID of one or more security groups to associate with the network
  # interface for the Codeartifact repositories endpoint. If none is provided,
  # AWS will associate the default security group for the VPC.
  codeartifact_repositories_endpoint_security_group_ids = []

  # The IDs of subnets in which to create a network interface for the
  # Codeartifact repositories endpoint. Only a single subnet within an AZ is
  # supported. When defined, it overrides var.subnet_ids. For some regions,
  # Codeartifact repositories endpoint is not supported in all the AZs, so this
  # variable helps to overcome this issue.
  codeartifact_repositories_endpoint_subnet_ids = []

  # Tags for the CodeArtifact API endpoint
  codeartifact_repositories_endpoint_tags = {}

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  codebuild_endpoint_policy = null

  # Set to false if you don't want to associate a private hosted zone with the
  # specified VPC for the CodeBuild endpoint
  codebuild_endpoint_private_dns_enabled = true

  # The ID of one or more security groups to associate with the network
  # interface for the CodeBuild endpoint. If none is provided, AWS will
  # associate the default security group for the VPC.
  codebuild_endpoint_security_group_ids = []

  # The IDs of subnets in which to create a network interface for the CodeBuild
  # endpoint. Only a single subnet within an AZ is supported. When defined, it
  # overrides var.subnet_ids. For some regions, CodeBuild endpoint is not
  # supported in all the AZs, so this variable helps to overcome this issue.
  codebuild_endpoint_subnet_ids = []

  # Tags for the CodeBuild endpoint
  codebuild_endpoint_tags = {}

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  codecommit_endpoint_policy = null

  # Set to false if you don't want to associate a private hosted zone with the
  # specified VPC for the CodeCommit endpoint
  codecommit_endpoint_private_dns_enabled = true

  # The ID of one or more security groups to associate with the network
  # interface for the CodeCommit endpoint. If none is provided, AWS will
  # associate the default security group for the VPC.
  codecommit_endpoint_security_group_ids = []

  # The IDs of subnets in which to create a network interface for the CodeCommit
  # API endpoint. Only a single subnet within an AZ is supported. When defined,
  # it overrides var.subnet_ids. For some regions, CodeCommit endpoint is not
  # supported in all the AZs, so this variable helps to overcome this issue.
  codecommit_endpoint_subnet_ids = []

  # Tags for the CodeCommit endpoint
  codecommit_endpoint_tags = {}

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  codedeploy_commands_secure_endpoint_policy = null

  # Set to false if you don't want to associate a private hosted zone with the
  # specified VPC for the CodeDeploy Commands Secure endpoint
  codedeploy_commands_secure_endpoint_private_dns_enabled = true

  # The ID of one or more security groups to associate with the network
  # interface for the CodeDeploy Commands Secure endpoint. If none is provided,
  # AWS will associate the default security group for the VPC.
  codedeploy_commands_secure_endpoint_security_group_ids = []

  # The IDs of subnets in which to create a network interface for the CodeDeploy
  # Commands Secure endpoint. Only a single subnet within an AZ is supported.
  # When defined, it overrides var.subnet_ids. For some regions, CodeDeploy
  # Commands Secure endpoint is not supported in all the AZs, so this variable
  # helps to overcome this issue.
  codedeploy_commands_secure_endpoint_subnet_ids = []

  # Tags for the CodeDeploy Commands Secure endpoint
  codedeploy_commands_secure_endpoint_tags = {}

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  codedeploy_endpoint_policy = null

  # Set to false if you don't want to associate a private hosted zone with the
  # specified VPC for the CodeDeploy endpoint
  codedeploy_endpoint_private_dns_enabled = true

  # The ID of one or more security groups to associate with the network
  # interface for the CodeDeploy endpoint. If none is provided, AWS will
  # associate the default security group for the VPC.
  codedeploy_endpoint_security_group_ids = []

  # The IDs of subnets in which to create a network interface for the CodeDeploy
  # endpoint. Only a single subnet within an AZ is supported. When defined, it
  # overrides var.subnet_ids. For some regions, CodeDeploy endpoint is not
  # supported in all the AZs, so this variable helps to overcome this issue.
  codedeploy_endpoint_subnet_ids = []

  # Tags for the CodeDeploy endpoint
  codedeploy_endpoint_tags = {}

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  codepipeline_endpoint_policy = null

  # Set to false if you don't want to associate a private hosted zone with the
  # specified VPC for the CodePipeline endpoint
  codepipeline_endpoint_private_dns_enabled = true

  # The ID of one or more security groups to associate with the network
  # interface for the CodePipeline endpoint. If none is provided, AWS will
  # associate the default security group for the VPC.
  codepipeline_endpoint_security_group_ids = []

  # The IDs of subnets in which to create a network interface for the
  # CodePipeline endpoint. Only a single subnet within an AZ is supported. When
  # defined, it overrides var.subnet_ids. For some regions, CodePipeline
  # endpoint is not supported in all the AZs, so this variable helps to overcome
  # this issue.
  codepipeline_endpoint_subnet_ids = []

  # Tags for the CodePipeline endpoint
  codepipeline_endpoint_tags = {}

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  config_endpoint_policy = null

  # Set to false if you don't want to associate a private hosted zone with the
  # specified VPC for the config endpoint
  config_endpoint_private_dns_enabled = true

  # The ID of one or more security groups to associate with the network
  # interface for the config endpoint. If none is provided, AWS will associate
  # the default security group for the VPC.
  config_endpoint_security_group_ids = []

  # The IDs of subnets in which to create a network interface for the config
  # endpoint. Only a single subnet within an AZ is supported. If omitted, only
  # subnet_ids will be used.
  config_endpoint_subnet_ids = []

  # Tags for the Config endpoint
  config_endpoint_tags = {}

  # If true, creates a security group that allows ingress on port 443 and
  # applies it to all endpoints. Must set this to true or supply
  # security_group_ids.
  create_https_security_group = false

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  datasync_endpoint_policy = null

  # Set to false if you don't want to associate a private hosted zone with the
  # specified VPC for the Data Sync endpoint
  datasync_endpoint_private_dns_enabled = true

  # The ID of one or more security groups to associate with the network
  # interface for the Data Sync endpoint. If none is provided, AWS will
  # associate the default security group for the VPC.
  datasync_endpoint_security_group_ids = []

  # The IDs of subnets in which to create a network interface for the Data Sync
  # endpoint. Only a single subnet within an AZ is supported. When defined, it
  # overrides var.subnet_ids. For some regions, Data Sync endpoint is not
  # supported in all the AZs, so this variable helps to overcome this issue.
  datasync_endpoint_subnet_ids = []

  # Tags for the Data Sync endpoint
  datasync_endpoint_tags = {}

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  ebs_endpoint_policy = null

  # Set to false if you don't want to associate a private hosted zone with the
  # specified VPC for the EBS endpoint.
  ebs_endpoint_private_dns_enabled = true

  # The ID of one or more security groups to associate with the network
  # interface for the EBS endpoint. If none is provided, AWS will associate the
  # default security group for the VPC.
  ebs_endpoint_security_group_ids = []

  # The IDs of subnets in which to create a network interface for the EBS
  # endpoint. Only a single subnet within an AZ is supported. If omitted, only
  # subnet_ids will be used.
  ebs_endpoint_subnet_ids = []

  # Tags for the EBS endpoint
  ebs_endpoint_tags = {}

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  ec2_autoscaling_endpoint_policy = null

  # Set to false if you don't want to associate a private hosted zone with the
  # specified VPC for the EC2-Autoscaling endpoint
  ec2_autoscaling_endpoint_private_dns_enabled = true

  # The ID of one or more security groups to associate with the network
  # interface for the EC2-Autoscaling endpoint. If none is provided, AWS will
  # associate the default security group for the VPC.
  ec2_autoscaling_endpoint_security_group_ids = []

  # The IDs of subnets in which to create a network interface for the
  # EC2-Autoscaling endpoint. Only a single subnet within an AZ is supported.
  # When defined, it overrides var.subnet_ids. For some regions, EC2-Autoscaling
  # endpoint is not supported in all the AZs, so this variable helps to overcome
  # this issue.
  ec2_autoscaling_endpoint_subnet_ids = []

  # Tags for the CodeArtifact API endpoint
  ec2_autoscaling_endpoint_tags = {}

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  ec2_endpoint_policy = null

  # Set to false if you don't want to associate a private hosted zone with the
  # specified VPC for the EC2 endpoint
  ec2_endpoint_private_dns_enabled = true

  # The ID of one or more security groups to associate with the network
  # interface for the EC2 endpoint
  ec2_endpoint_security_group_ids = []

  # The IDs of subnets in which to create a network interface for the EC2
  # endpoint. Only a single subnet within an AZ is supported. If omitted, only
  # subnet_ids will be used.
  ec2_endpoint_subnet_ids = []

  # Tags for the EC2 endpoint
  ec2_endpoint_tags = {}

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  ec2messages_endpoint_policy = null

  # Set to false if you don't want to associate a private hosted zone with the
  # specified VPC for the EC2 Messages endpoint
  ec2messages_endpoint_private_dns_enabled = true

  # The ID of one or more security groups to associate with the network
  # interface for the EC2 Messages endpoint. If none is provided, AWS will
  # associate the default security group for the VPC.
  ec2messages_endpoint_security_group_ids = []

  # The IDs of subnets in which to create a network interface for the EC2
  # Messages endpoint. Only a single subnet within an AZ is supported. If
  # omitted, only subnet_ids will be used.
  ec2messages_endpoint_subnet_ids = []

  # Tags for the EC2 Messages endpoint
  ec2messages_endpoint_tags = {}

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  ecr_api_endpoint_policy = null

  # Set to false if you don't want to associate a private hosted zone with the
  # specified VPC for the ECR API endpoint
  ecr_api_endpoint_private_dns_enabled = true

  # The ID of one or more security groups to associate with the network
  # interface for the ECR API endpoint. If none is provided, AWS will associate
  # the default security group for the VPC.
  ecr_api_endpoint_security_group_ids = []

  # The IDs of subnets in which to create a network interface for the ECR api
  # endpoint. If omitted, only subnet_ids will be used.
  ecr_api_endpoint_subnet_ids = []

  # Tags for the ECR API endpoint
  ecr_api_endpoint_tags = {}

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  ecr_dkr_endpoint_policy = null

  # Set to false if you don't want to associate a private hosted zone with the
  # specified VPC for ECR DKR endpoint
  ecr_dkr_endpoint_private_dns_enabled = true

  # The ID of one or more security groups to associate with the network
  # interface for the ECR DKR endpoint. If none is provided, AWS will associate
  # the default security group for the VPC.
  ecr_dkr_endpoint_security_group_ids = []

  # The IDs of subnets in which to create a network interface for the ECR dkr
  # endpoint. If omitted, only subnet_ids will be used.
  ecr_dkr_endpoint_subnet_ids = []

  # Tags for the ECR DKR endpoint
  ecr_dkr_endpoint_tags = {}

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  ecs_agent_endpoint_policy = null

  # Set to false if you don't want to associate a private hosted zone with the
  # specified VPC for the ECS Agent endpoint
  ecs_agent_endpoint_private_dns_enabled = true

  # The ID of one or more security groups to associate with the network
  # interface for the ECS Agent endpoint. If none is provided, AWS will
  # associate the default security group for the VPC.
  ecs_agent_endpoint_security_group_ids = []

  # The IDs of subnets in which to create a network interface for the ECS Agent
  # endpoint. Only a single subnet within an AZ is supported. If omitted, only
  # subnet_ids will be used.
  ecs_agent_endpoint_subnet_ids = []

  # Tags for the ECS Agent endpoint
  ecs_agent_endpoint_tags = {}

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  ecs_endpoint_policy = null

  # Set to false if you don't want to associate a private hosted zone with the
  # specified VPC for the ECS endpoint
  ecs_endpoint_private_dns_enabled = true

  # The ID of one or more security groups to associate with the network
  # interface for the ECS endpoint. If none is provided, AWS will associate the
  # default security group for the VPC.
  ecs_endpoint_security_group_ids = []

  # The IDs of subnets in which to create a network interface for the ECS
  # endpoint. Only a single subnet within an AZ is supported. If omitted, only
  # subnet_ids will be used.
  ecs_endpoint_subnet_ids = []

  # Tags for the ECS endpoint
  ecs_endpoint_tags = {}

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  ecs_telemetry_endpoint_policy = null

  # Set to false if you don't want to associate a private hosted zone with the
  # specified VPC for the ECS Telemetry endpoint
  ecs_telemetry_endpoint_private_dns_enabled = true

  # The ID of one or more security groups to associate with the network
  # interface for the ECS Telemetry endpoint. If none is provided, AWS will
  # associate the default security group for the VPC.
  ecs_telemetry_endpoint_security_group_ids = []

  # The IDs of subnets in which to create a network interface for the ECS
  # Telemetry endpoint. Only a single subnet within an AZ is supported. If
  # omitted, only subnet_ids will be used.
  ecs_telemetry_endpoint_subnet_ids = []

  # Tags for the ECS Telemetry endpoint
  ecs_telemetry_endpoint_tags = {}

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  efs_endpoint_policy = null

  # Set to false if you don't want to associate a private hosted zone with the
  # specified VPC for the EFS endpoint.
  efs_endpoint_private_dns_enabled = true

  # The ID of one or more security groups to associate with the network
  # interface for the EFS endpoint. If none is provided, AWS will associate the
  # default security group for the VPC.
  efs_endpoint_security_group_ids = []

  # The IDs of subnets in which to create a network interface for the EFS
  # endpoint. Only a single subnet within an AZ is supported. If omitted, only
  # subnet_ids will be used.
  efs_endpoint_subnet_ids = []

  # Tags for the EFS endpoint
  efs_endpoint_tags = {}

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  elastic_inference_runtime_endpoint_policy = null

  # Set to false if you don't want to associate a private hosted zone with the
  # specified VPC for the Elastic Inference Runtime endpoint
  elastic_inference_runtime_endpoint_private_dns_enabled = true

  # The ID of one or more security groups to associate with the network
  # interface for the Elastic Inference Runtime endpoint. If none is provided,
  # AWS will associate the default security group for the VPC.
  elastic_inference_runtime_endpoint_security_group_ids = []

  # The IDs of subnets in which to create a network interface for the Elastic
  # Inference Runtime endpoint. Only a single subnet within an AZ is supported.
  # When defined, it overrides var.subnet_ids. For some regions, Elastic
  # Inference Runtime endpoint is not supported in all the AZs, so this variable
  # helps to overcome this issue.
  elastic_inference_runtime_endpoint_subnet_ids = []

  # Tags for the Elastic Inference Runtime endpoint
  elastic_inference_runtime_endpoint_tags = {}

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  elasticache_endpoint_policy = null

  # Set to false if you don't want to associate a private hosted zone with the
  # specified VPC for the ElastiCache endpoint.
  elasticache_endpoint_private_dns_enabled = true

  # The ID of one or more security groups to associate with the network
  # interface for the Elasticache endpoint. If none is provided, AWS will
  # associate the default security group for the VPC.
  elasticache_endpoint_security_group_ids = []

  # The IDs of subnets in which to create a network interface for the
  # Elasticache endpoint. Only a single subnet within an AZ is supported. If
  # omitted, only subnet_ids will be used.
  elasticache_endpoint_subnet_ids = []

  # Tags for the Elasticache endpoint
  elasticache_endpoint_tags = {}

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  elasticbeanstalk_endpoint_policy = null

  # Set to false if you don't want to associate a private hosted zone with the
  # specified VPC for the Elastic Beanstalk endpoint
  elasticbeanstalk_endpoint_private_dns_enabled = true

  # The ID of one or more security groups to associate with the network
  # interface for the Elastic Beanstalk endpoint. If none is provided, AWS will
  # associate the default security group for the VPC.
  elasticbeanstalk_endpoint_security_group_ids = []

  # The IDs of subnets in which to create a network interface for the Elastic
  # Beanstalk endpoint. Only a single subnet within an AZ is supported. When
  # defined, it overrides var.subnet_ids. For some regions, Elastic Beanstalk
  # endpoint is not supported in all the AZs, so this variable helps to overcome
  # this issue.
  elasticbeanstalk_endpoint_subnet_ids = []

  # Tags for the Elastic Beanstalk endpoint
  elasticbeanstalk_endpoint_tags = {}

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  elasticbeanstalk_health_endpoint_policy = null

  # Set to false if you don't want to associate a private hosted zone with the
  # specified VPC for the Elastic Beanstalk Health endpoint
  elasticbeanstalk_health_endpoint_private_dns_enabled = true

  # The ID of one or more security groups to associate with the network
  # interface for the Elastic Beanstalk Health endpoint. If none is provided,
  # AWS will associate the default security group for the VPC.
  elasticbeanstalk_health_endpoint_security_group_ids = []

  # The IDs of subnets in which to create a network interface for the Elastic
  # Beanstalk Health endpoint. Only a single subnet within an AZ is supported.
  # When defined, it overrides var.subnet_ids. For some regions, Elastic
  # Beanstalk Health endpoint is not supported in all the AZs, so this variable
  # helps to overcome this issue.
  elasticbeanstalk_health_endpoint_subnet_ids = []

  # Tags for the Elastic Beanstalk Health endpoint
  elasticbeanstalk_health_endpoint_tags = {}

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  elb_endpoint_policy = null

  # Set to false if you don't want to associate a private hosted zone with the
  # specified VPC for the Elastic Load Balancing endpoint
  elb_endpoint_private_dns_enabled = true

  # The ID of one or more security groups to associate with the network
  # interface for the Elastic Load Balancing endpoint. If none is provided, AWS
  # will associate the default security group for the VPC.
  elb_endpoint_security_group_ids = []

  # The IDs of subnets in which to create a network interface for the Elastic
  # Load Balancing endpoint. Only a single subnet within an AZ is supported. If
  # omitted, only subnet_ids will be used.
  elb_endpoint_subnet_ids = []

  # Tags for the Elastic Load Balancing endpoint
  elb_endpoint_tags = {}

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  emr_endpoint_policy = null

  # Set to false if you don't want to associate a private hosted zone with the
  # specified VPC for the EMR endpoint
  emr_endpoint_private_dns_enabled = true

  # The ID of one or more security groups to associate with the network
  # interface for the EMR endpoint. If none is provided, AWS will associate the
  # default security group for the VPC.
  emr_endpoint_security_group_ids = []

  # The IDs of subnets in which to create a network interface for the EMR
  # endpoint. Only a single subnet within an AZ is supported. When defined, it
  # overrides var.subnet_ids. For some regions, EMR endpoint is not supported in
  # all the AZs, so this variable helps to overcome this issue.
  emr_endpoint_subnet_ids = []

  # Tags for the EMR endpoint
  emr_endpoint_tags = {}

  # Set to true if you want to provision a Access Analyzer Endpoint within the
  # VPC
  enable_access_analyzer_endpoint = false

  # Set to true if you want to provision a ACM PCA Endpoint within the VPC
  enable_acm_pca_endpoint = false

  # Set to true if you want to provision an API Gateway within the VPC
  enable_api_gateway_endpoint = false

  # Set to true if you want to provision a AppMesh Endpoint within the VPC
  enable_appmesh_envoy_management_endpoint = false

  # Set to true if you want to provision a AppStream API Endpoint within the VPC
  enable_appstream_api_endpoint = false

  # Set to true if you want to provision a AppStream STREAMING Endpoint within
  # the VPC
  enable_appstream_streaming_endpoint = false

  # Set to true if you want to provision a Athena Endpoint within the VPC
  enable_athena_endpoint = false

  # Set to true if you want to provision a Auto Scaling Plans Endpoint within
  # the VPC
  enable_auto_scaling_plans_endpoint = false

  # Set to true if you want to provision a Cloud Directory Endpoint within the
  # VPC
  enable_cloud_directory_endpoint = false

  # Set to true if you want to provision a Cloudformation within the VPC
  enable_cloudformation_endpoint = false

  # Set to true if you want to provision a CloudTrail within the VPC
  enable_cloudtrail_endpoint = false

  # Set to true if you want to provision a CloudWatch Events within the VPC
  enable_cloudwatch_events_endpoint = false

  # Set to true if you want to provision a CloudWatch Logs within the VPC
  enable_cloudwatch_logs_endpoint = false

  # Set to true if you want to provision a Codeartifact API Endpoint within the
  # VPC
  enable_codeartifact_api_endpoint = false

  # Set to true if you want to provision a Codeartifact repositories Endpoint
  # within the VPC
  enable_codeartifact_repositories_endpoint = false

  # Set to true if you want to provision a CodeBuild Endpoint within the VPC
  enable_codebuild_endpoint = false

  # Set to true if you want to provision a CodeCommit Endpoint within the VPC
  enable_codecommit_endpoint = false

  # Set to true if you want to provision a CodeDeploy Commands Secure Endpoint
  # within the VPC
  enable_codedeploy_commands_secure_endpoint = false

  # Set to true if you want to provision a CodeDeploy Endpoint within the VPC
  enable_codedeploy_endpoint = false

  # Set to true if you want to provision a CodePipeline Endpoint within the VPC
  enable_codepipeline_endpoint = false

  # Set to true if you want to provision a config within the VPC
  enable_config_endpoint = false

  # Set to true if you want to provision a Data Sync Endpoint within the VPC
  enable_datasync_endpoint = false

  # Set to true if you want to provision a EBS endpoint within the VPC.
  enable_ebs_endpoint = false

  # Set to true if you want to provision a EC2-Autoscaling Endpoint within the
  # VPC
  enable_ec2_autoscaling_endpoint = false

  # Set to true if you want to provision an EC2 within the VPC
  enable_ec2_endpoint = false

  # Set to true if you want to provision an EC2 Messages endpoint within the VPC
  enable_ec2messages_endpoint = false

  # Set to true if you want to provision an ECR API within the VPC
  enable_ecr_api_endpoint = false

  # Set to true if you want to provision an ECR DKR within the VPC
  enable_ecr_dkr_endpoint = false

  # Set to true if you want to provision an ECS Agent within the VPC
  enable_ecs_agent_endpoint = false

  # Set to true if you want to provision an ECS within the VPC
  enable_ecs_endpoint = false

  # Set to true if you want to provision an ECS Agent within the VPC
  enable_ecs_telemetry_endpoint = false

  # Set to true if you want to provision a EFS endpoint within the VPC.
  enable_efs_endpoint = false

  # Set to true if you want to provision a Elastic Inference Runtime Endpoint
  # within the VPC
  enable_elastic_inference_runtime_endpoint = false

  # Set to true if you want to provision Elasticache endpoint within the VPC.
  enable_elasticache_endpoint = false

  # Set to true if you want to provision a Elastic Beanstalk Endpoint within the
  # VPC
  enable_elasticbeanstalk_endpoint = false

  # Set to true if you want to provision a Elastic Beanstalk Health Endpoint
  # within the VPC
  enable_elasticbeanstalk_health_endpoint = false

  # Set to true if you want to provision an Elastic Load Balancing within the
  # VPC
  enable_elb_endpoint = false

  # Set to true if you want to provision a EMR Endpoint within the VPC
  enable_emr_endpoint = false

  # Set to true if you want to provision a Git CodeCommit Endpoint within the
  # VPC
  enable_git_codecommit_endpoint = false

  # Set to true if you want to provision a Glue endpoint within the VPC.
  enable_glue_endpoint = false

  # Set to true if you want to provision a KINESIS Firehose Endpoint within the
  # VPC
  enable_kinesis_firehose_endpoint = false

  # Set to true if you want to provision a Kinesis Streams within the VPC
  enable_kinesis_streams_endpoint = false

  # Set to true if you want to provision a KMS within the VPC
  enable_kms_endpoint = false

  # Set to true if you want to provision a Lambda endpoint within the VPC.
  enable_lambda_endpoint = false

  # Set to true if you want to provision Pinpoint endpoint within the VPC.
  enable_pinpoint_endpoint = false

  # Set to true if you want to provision a QLDB Session Endpoint within the VPC
  enable_qldb_session_endpoint = false

  # Set to true if you want to provision a RDS Endpoint within the VPC
  enable_rds_endpoint = false

  # Set to true if you want to provision a RDS FIPSEndpoint within the VPC
  enable_rds_fips_endpoint = false

  # Set to true if you want to provision a Redshift within the VPC
  enable_redshift_data_endpoint = false

  # Set to true if you want to provision a Rekognition Endpoint within the VPC
  enable_rekognition_endpoint = false

  # Set to true if you want to provision a SageMaker API Endpoint within the VPC
  enable_sagemaker_api_endpoint = false

  # Set to true if you want to provision a SageMaker Runtime Endpoint within the
  # VPC
  enable_sagemaker_runtime_endpoint = false

  # Set to true if you want to provision a Secrets Manager within the VPC
  enable_secretsmanager_endpoint = false

  # Set to true if you want to provision a FIPS Secrets Manager within the VPC
  enable_secretsmanager_fips_endpoint = false

  # Set to true if you want to provision a Service Catalog Endpoint within the
  # VPC
  enable_servicecatalog_endpoint = false

  # Set to true if you want to provision a Simple Email Service within the VPC
  enable_ses_endpoint = false

  # Set to true if you want to provision a SMS Endpoint within the VPC
  enable_sms_endpoint = false

  # Set to true if you want to provision a SNS within the VPC
  enable_sns_endpoint = false

  # Set to true if you want to provision a SQS within the VPC
  enable_sqs_endpoint = false

  # Set to true if you want to provision an SSM endpoint within the VPC
  enable_ssm_endpoint = false

  # Set to true if you want to provision an SSM Messages endpoint within the VPC
  enable_ssmmessages_endpoint = false

  # Set to true if you want to provision a Step Function Endpoint within the VPC
  enable_states_endpoint = false

  # Set to true if you want to provision a Storage Gateway Endpoint within the
  # VPC
  enable_storagegateway_endpoint = false

  # Set to true if you want to provision a STS within the VPC
  enable_sts_endpoint = false

  # Set to true if you want to provision a Textract Endpoint within the VPC
  enable_textract_endpoint = false

  # Set to true if you want to provision a Transfer Endpoint within the VPC
  enable_transfer_endpoint = false

  # Set to true if you want to provision a Transfer Server Endpoint within the
  # VPC
  enable_transferserver_endpoint = false

  # Set to true if you want to provision a CloudWatch Monitoring within the VPC
  enable_vpc_cloudwatch_monitoring_endpoint = false

  # Set to true if you want to provision a VPC lattice endpoint within the VPC.
  enable_vpc_lattice_endpoint = false

  # Set to true if you want to provision a Workspaces Endpoint within the VPC
  enable_workspaces_endpoint = false

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  git_codecommit_endpoint_policy = null

  # Set to false if you don't want to associate a private hosted zone with the
  # specified VPC for the Git CodeCommit API endpoint
  git_codecommit_endpoint_private_dns_enabled = true

  # The ID of one or more security groups to associate with the network
  # interface for the Git CodeCommit endpoint. If none is provided, AWS will
  # associate the default security group for the VPC.
  git_codecommit_endpoint_security_group_ids = []

  # The IDs of subnets in which to create a network interface for the Git
  # CodeCommit API endpoint. Only a single subnet within an AZ is supported.
  # When defined, it overrides var.subnet_ids. For some regions, Git CodeCommit
  # endpoint is not supported in all the AZs, so this variable helps to overcome
  # this issue.
  git_codecommit_endpoint_subnet_ids = []

  # Tags for the Git CodeCommit endpoint
  git_codecommit_endpoint_tags = {}

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  glue_endpoint_policy = null

  # Set to false if you don't want to associate a private hosted zone with the
  # specified VPC for the Glue endpoint.
  glue_endpoint_private_dns_enabled = true

  # The ID of one or more security groups to associate with the network
  # interface for the glue endpoint. If none is provided, AWS will associate the
  # default security group for the VPC.
  glue_endpoint_security_group_ids = []

  # The IDs of subnets in which to create a network interface for the glue
  # endpoint. Only a single subnet within an AZ is supported. If omitted, only
  # subnet_ids will be used.
  glue_endpoint_subnet_ids = []

  # Tags for the Glue endpoint
  glue_endpoint_tags = {}

  # List of CIDR blocks where HTTPS ingress should be allowed from. Defaults to
  # the VPC's CIDR if left empty. Only used if create_https_security_group is
  # true.
  https_security_group_cidr_blocks = []

  # Name prefix to use on the created SG. A random string will be appended.
  https_security_group_name_prefix = "allow-https-"

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  kinesis_firehose_endpoint_policy = null

  # Set to false if you don't want to associate a private hosted zone with the
  # specified VPC for the KINESIS Firehose endpoint
  kinesis_firehose_endpoint_private_dns_enabled = true

  # The ID of one or more security groups to associate with the network
  # interface for the KINESIS Firehose endpoint. If none is provided, AWS will
  # associate the default security group for the VPC.
  kinesis_firehose_endpoint_security_group_ids = []

  # The IDs of subnets in which to create a network interface for the KINESIS
  # Firehose endpoint. Only a single subnet within an AZ is supported. When
  # defined, it overrides var.subnet_ids. For some regions, KINESIS Firehose
  # endpoint is not supported in all the AZs, so this variable helps to overcome
  # this issue.
  kinesis_firehose_endpoint_subnet_ids = []

  # Tags for the KINESIS Firehose endpoint
  kinesis_firehose_endpoint_tags = {}

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  kinesis_streams_endpoint_policy = null

  # Set to false if you don't want to associate a private hosted zone with the
  # specified VPC for the Kinesis Streams endpoint
  kinesis_streams_endpoint_private_dns_enabled = true

  # The ID of one or more security groups to associate with the network
  # interface for the Kinesis Streams endpoint. If none is provided, AWS will
  # associate the default security group for the VPC.
  kinesis_streams_endpoint_security_group_ids = []

  # The IDs of subnets in which to create a network interface for the Kinesis
  # Streams endpoint. Only a single subnet within an AZ is supported. If
  # omitted, only subnet_ids will be used.
  kinesis_streams_endpoint_subnet_ids = []

  # Tags for the Kinesis endpoint
  kinesis_streams_endpoint_tags = {}

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  kms_endpoint_policy = null

  # Set to false if you don't want to associate a private hosted zone with the
  # specified VPC for the KMS endpoint
  kms_endpoint_private_dns_enabled = true

  # The ID of one or more security groups to associate with the network
  # interface for the KMS endpoint. If none is provided, AWS will associate the
  # default security group for the VPC.
  kms_endpoint_security_group_ids = []

  # The IDs of subnets in which to create a network interface for the KMS
  # endpoint. Only a single subnet within an AZ is supported. If omitted, only
  # subnet_ids will be used.
  kms_endpoint_subnet_ids = []

  # Tags for the KMS endpoint
  kms_endpoint_tags = {}

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  lambda_endpoint_policy = null

  # Set to false if you don't want to associate a private hosted zone with the
  # specified VPC for the Lambda endpoint.
  lambda_endpoint_private_dns_enabled = true

  # The ID of one or more security groups to associate with the network
  # interface for the Lambda endpoint. If none is provided, AWS will associate
  # the default security group for the VPC.
  lambda_endpoint_security_group_ids = []

  # The IDs of subnets in which to create a network interface for the Lambda
  # endpoint. Only a single subnet within an AZ is supported. If omitted, only
  # subnet_ids will be used.
  lambda_endpoint_subnet_ids = []

  # Tags for the Lambda endpoint
  lambda_endpoint_tags = {}

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  pinpoint_endpoint_policy = null

  # Set to false if you don't want to associate a private hosted zone with the
  # specified VPC for the Pinpoint endpoint.
  pinpoint_endpoint_private_dns_enabled = true

  # The ID of one or more security groups to associate with the network
  # interface for the Pinpoint endpoint. If none is provided, AWS will associate
  # the default security group for the VPC.
  pinpoint_endpoint_security_group_ids = []

  # The IDs of subnets in which to create a network interface for the Pinpoint
  # endpoint. Only a single subnet within an AZ is supported. If omitted, only
  # subnet_ids will be used.
  pinpoint_endpoint_subnet_ids = []

  # Tags for the Pinpoint endpoint
  pinpoint_endpoint_tags = {}

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  qldb_session_endpoint_policy = null

  # Set to false if you don't want to associate a private hosted zone with the
  # specified VPC for the QLDB Session endpoint
  qldb_session_endpoint_private_dns_enabled = true

  # The ID of one or more security groups to associate with the network
  # interface for the QLDB Session endpoint. If none is provided, AWS will
  # associate the default security group for the VPC.
  qldb_session_endpoint_security_group_ids = []

  # The IDs of subnets in which to create a network interface for the QLDB
  # Session endpoint. Only a single subnet within an AZ is supported. When
  # defined, it overrides var.subnet_ids. For some regions, QLDB Session
  # endpoint is not supported in all the AZs, so this variable helps to overcome
  # this issue.
  qldb_session_endpoint_subnet_ids = []

  # Tags for the QLDB Session endpoint
  qldb_session_endpoint_tags = {}

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  rds_endpoint_policy = null

  # Set to false if you don't want to associate a private hosted zone with the
  # specified VPC for the RDS endpoint
  rds_endpoint_private_dns_enabled = true

  # The ID of one or more security groups to associate with the network
  # interface for the RDS endpoint. If none is provided, AWS will associate the
  # default security group for the VPC.
  rds_endpoint_security_group_ids = []

  # The IDs of subnets in which to create a network interface for the RDS
  # endpoint. Only a single subnet within an AZ is supported. When defined, it
  # overrides var.subnet_ids. For some regions, RDS endpoint is not supported in
  # all the AZs, so this variable helps to overcome this issue.
  rds_endpoint_subnet_ids = []

  # Tags for the RDS endpoint
  rds_endpoint_tags = {}

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  rds_fips_endpoint_policy = null

  # Set to false if you don't want to associate a private hosted zone with the
  # specified VPC for the RDS FIPS endpoint
  rds_fips_endpoint_private_dns_enabled = true

  # The ID of one or more security groups to associate with the network
  # interface for the RDS endpoint. If none is provided, AWS will associate the
  # default security group for the VPC.
  rds_fips_endpoint_security_group_ids = []

  # The IDs of subnets in which to create a network interface for the RDS
  # endpoint. Only a single subnet within an AZ is supported. When defined, it
  # overrides var.subnet_ids. For some regions, RDS endpoint is not supported in
  # all the AZs, so this variable helps to overcome this issue.
  rds_fips_endpoint_subnet_ids = []

  # Tags for the RDS FIPS endpoint
  rds_fips_endpoint_tags = {}

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  redshift_data_endpoint_policy = null

  # Set to false if you don't want to associate a private hosted zone with the
  # specified VPC for the Redshift endpoint
  redshift_data_endpoint_private_dns_enabled = true

  # The ID of one or more security groups to associate with the network
  # interface for the Redshift endpoint. If none is provided, AWS will associate
  # the default security group for the VPC.
  redshift_data_endpoint_security_group_ids = []

  # The IDs of subnets in which to create a network interface for the Redshift
  # endpoint. Only a single subnet within an AZ is supported. If omitted, only
  # subnet_ids will be used.
  redshift_data_endpoint_subnet_ids = []

  # Tags for the Redshift endpoint
  redshift_data_endpoint_tags = {}

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  rekognition_endpoint_policy = null

  # Set to false if you don't want to associate a private hosted zone with the
  # specified VPC for the Rekognition endpoint
  rekognition_endpoint_private_dns_enabled = true

  # The ID of one or more security groups to associate with the network
  # interface for the Rekognition endpoint. If none is provided, AWS will
  # associate the default security group for the VPC.
  rekognition_endpoint_security_group_ids = []

  # The IDs of subnets in which to create a network interface for the
  # Rekognition endpoint. Only a single subnet within an AZ is supported. When
  # defined, it overrides var.subnet_ids. For some regions, Rekognition endpoint
  # is not supported in all the AZs, so this variable helps to overcome this
  # issue.
  rekognition_endpoint_subnet_ids = []

  # Tags for the Rekognition endpoint
  rekognition_endpoint_tags = {}

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  sagemaker_api_endpoint_policy = null

  # Set to false if you don't want to associate a private hosted zone with the
  # specified VPC for the SageMaker API endpoint
  sagemaker_api_endpoint_private_dns_enabled = true

  # The ID of one or more security groups to associate with the network
  # interface for the SageMaker API endpoint. If none is provided, AWS will
  # associate the default security group for the VPC.
  sagemaker_api_endpoint_security_group_ids = []

  # The IDs of subnets in which to create a network interface for the SageMaker
  # API endpoint. Only a single subnet within an AZ is supported. When defined,
  # it overrides var.subnet_ids. For some regions, SageMaker API endpoint is not
  # supported in all the AZs, so this variable helps to overcome this issue.
  sagemaker_api_endpoint_subnet_ids = []

  # Tags for the SageMaker API endpoint
  sagemaker_api_endpoint_tags = {}

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  sagemaker_runtime_endpoint_policy = null

  # Set to false if you don't want to associate a private hosted zone with the
  # specified VPC for the SageMaker Runtime endpoint
  sagemaker_runtime_endpoint_private_dns_enabled = true

  # The ID of one or more security groups to associate with the network
  # interface for the SageMaker Runtime endpoint. If none is provided, AWS will
  # associate the default security group for the VPC.
  sagemaker_runtime_endpoint_security_group_ids = []

  # The IDs of subnets in which to create a network interface for the SageMaker
  # Runtime endpoint. Only a single subnet within an AZ is supported. When
  # defined, it overrides var.subnet_ids. For some regions, SageMaker Runtime
  # endpoint is not supported in all the AZs, so this variable helps to overcome
  # this issue.
  sagemaker_runtime_endpoint_subnet_ids = []

  # Tags for the SageMaker Runtime endpoint
  sagemaker_runtime_endpoint_tags = {}

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  secretsmanager_endpoint_policy = null

  # Set to false if you don't want to associate a private hosted zone with the
  # specified VPC for the Secrets Manager endpoint
  secretsmanager_endpoint_private_dns_enabled = true

  # The ID of one or more security groups to associate with the network
  # interface for the Secrets Manager endpoint. If none is provided, AWS will
  # associate the default security group for the VPC.
  secretsmanager_endpoint_security_group_ids = []

  # The IDs of subnets in which to create a network interface for the Secrets
  # Manager endpoint. Only a single subnet within an AZ is supported. If
  # omitted, only subnet_ids will be used.
  secretsmanager_endpoint_subnet_ids = []

  # Tags for the Secrets Manager endpoint
  secretsmanager_endpoint_tags = {}

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  secretsmanager_fips_endpoint_policy = null

  # Set to false if you don't want to associate a private hosted zone with the
  # specified VPC for the FIPS Secrets Manager endpoint
  secretsmanager_fips_endpoint_private_dns_enabled = true

  # The ID of one or more security groups to associate with the network
  # interface for the Secrets Manager endpoint. If none is provided, AWS will
  # associate the default security group for the VPC.
  secretsmanager_fips_endpoint_security_group_ids = []

  # The IDs of subnets in which to create a network interface for the  FIPS
  # Secrets Manager endpoint. Only a single subnet within an AZ is supported. If
  # omitted, only subnet_ids will be used.
  secretsmanager_fips_endpoint_subnet_ids = []

  # Tags for the FIPS Secrets Manager endpoint
  secretsmanager_fips_endpoint_tags = {}

  # A list of IDs of the security groups which will apply for all endpoints.
  # Must supply this or create_https_security_group = true.
  security_group_ids = []

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  servicecatalog_endpoint_policy = null

  # Set to false if you don't want to associate a private hosted zone with the
  # specified VPC for the Service Catalog endpoint
  servicecatalog_endpoint_private_dns_enabled = true

  # The ID of one or more security groups to associate with the network
  # interface for the Service Catalog endpoint. If none is provided, AWS will
  # associate the default security group for the VPC.
  servicecatalog_endpoint_security_group_ids = []

  # The IDs of subnets in which to create a network interface for the Service
  # Catalog endpoint. Only a single subnet within an AZ is supported. When
  # defined, it overrides var.subnet_ids. For some regions, Service Catalog
  # endpoint is not supported in all the AZs, so this variable helps to overcome
  # this issue.
  servicecatalog_endpoint_subnet_ids = []

  # Tags for the Service Catalog endpoint
  servicecatalog_endpoint_tags = {}

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  ses_endpoint_policy = null

  # Set to false if you don't want to associate a private hosted zone with the
  # specified VPC for the Simple Email Service endpoint
  ses_endpoint_private_dns_enabled = true

  # The ID of one or more security groups to associate with the network
  # interface for the Simple Email Service endpoint. If none is provided, AWS
  # will associate the default security group for the VPC.
  ses_endpoint_security_group_ids = []

  # The IDs of subnets in which to create a network interface for the Simple
  # Email Service endpoint. Only a single subnet within an AZ is supported. When
  # defined, it overrides var.subnet_ids. For some regions, SES is not supported
  # in all the AZs, so this variable helps to overcome this issue.
  ses_endpoint_subnet_ids = []

  # Tags for the Simple Email Service endpoint
  ses_endpoint_tags = {}

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  sms_endpoint_policy = null

  # Set to false if you don't want to associate a private hosted zone with the
  # specified VPC for the SMS endpoint
  sms_endpoint_private_dns_enabled = true

  # The ID of one or more security groups to associate with the network
  # interface for the SMS endpoint. If none is provided, AWS will associate the
  # default security group for the VPC.
  sms_endpoint_security_group_ids = []

  # The IDs of subnets in which to create a network interface for the SMS
  # endpoint. Only a single subnet within an AZ is supported. When defined, it
  # overrides var.subnet_ids. For some regions, SMS endpoint is not supported in
  # all the AZs, so this variable helps to overcome this issue.
  sms_endpoint_subnet_ids = []

  # Tags for the SMS endpoint
  sms_endpoint_tags = {}

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  sns_endpoint_policy = null

  # Set to false if you don't want to associate a private hosted zone with the
  # specified VPC for the SNS endpoint
  sns_endpoint_private_dns_enabled = true

  # The ID of one or more security groups to associate with the network
  # interface for the SNS endpoint. If none is provided, AWS will associate the
  # default security group for the VPC.
  sns_endpoint_security_group_ids = []

  # The IDs of subnets in which to create a network interface for the SNS
  # endpoint. Only a single subnet within an AZ is supported. If omitted, only
  # subnet_ids will be used.
  sns_endpoint_subnet_ids = []

  # Tags for the SNS endpoint
  sns_endpoint_tags = {}

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  sqs_endpoint_policy = null

  # Set to false if you don't want to associate a private hosted zone with the
  # specified VPC for the SQS endpoint
  sqs_endpoint_private_dns_enabled = true

  # The ID of one or more security groups to associate with the network
  # interface for the SQS endpoint. If none is provided, AWS will associate the
  # default security group for the VPC.
  sqs_endpoint_security_group_ids = []

  # The IDs of subnets in which to create a network interface for the SQS
  # endpoint. Only a single subnet within an AZ is supported. If omitted, only
  # subnet_ids will be used.
  sqs_endpoint_subnet_ids = []

  # Tags for the SQS endpoint
  sqs_endpoint_tags = {}

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  ssm_endpoint_policy = null

  # Set to false if you don't want to associate a private hosted zone with the
  # specified VPC for the SSM Endpoint endpoint
  ssm_endpoint_private_dns_enabled = true

  # The ID of one or more security groups to associate with the network
  # interface for the SSM Endpoint endpoint. If none is provided, AWS will
  # associate the default security group for the VPC.
  ssm_endpoint_security_group_ids = []

  # The IDs of subnets in which to create a network interface for the SSM
  # Endpoint endpoint. Only a single subnet within an AZ is supported. If
  # omitted, only subnet_ids will be used.
  ssm_endpoint_subnet_ids = []

  # Tags for the SSM Endpoint endpoint
  ssm_endpoint_tags = {}

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  ssmmessages_endpoint_policy = null

  # Set to false if you don't want to associate a private hosted zone with the
  # specified VPC for the SSM Messages endpoint
  ssmmessages_endpoint_private_dns_enabled = true

  # The ID of one or more security groups to associate with the network
  # interface for the SSM Messages endpoint. If none is provided, AWS will
  # associate the default security group for the VPC.
  ssmmessages_endpoint_security_group_ids = []

  # The IDs of subnets in which to create a network interface for the SSM
  # Messages endpoint. Only a single subnet within an AZ is supported. If
  # omitted, only subnet_ids will be used.
  ssmmessages_endpoint_subnet_ids = []

  # Tags for the SSM Messages endpoint
  ssmmessages_endpoint_tags = {}

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  states_endpoint_policy = null

  # Set to false if you don't want to associate a private hosted zone with the
  # specified VPC for the Step Function endpoint
  states_endpoint_private_dns_enabled = true

  # The ID of one or more security groups to associate with the network
  # interface for the Step Function endpoint. If none is provided, AWS will
  # associate the default security group for the VPC.
  states_endpoint_security_group_ids = []

  # The IDs of subnets in which to create a network interface for the Step
  # Function endpoint. Only a single subnet within an AZ is supported. When
  # defined, it overrides var.subnet_ids. For some regions, Step Function
  # endpoint is not supported in all the AZs, so this variable helps to overcome
  # this issue.
  states_endpoint_subnet_ids = []

  # Tags for the Step Function endpoint
  states_endpoint_tags = {}

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  storagegateway_endpoint_policy = null

  # Set to false if you don't want to associate a private hosted zone with the
  # specified VPC for the Storage Gateway endpoint
  storagegateway_endpoint_private_dns_enabled = true

  # The ID of one or more security groups to associate with the network
  # interface for the Storage Gateway endpoint. If none is provided, AWS will
  # associate the default security group for the VPC.
  storagegateway_endpoint_security_group_ids = []

  # The IDs of subnets in which to create a network interface for the Storage
  # Gateway endpoint. Only a single subnet within an AZ is supported. When
  # defined, it overrides var.subnet_ids. For some regions, Storage Gateway
  # endpoint is not supported in all the AZs, so this variable helps to overcome
  # this issue.
  storagegateway_endpoint_subnet_ids = []

  # Tags for the Storage Gateway endpoint
  storagegateway_endpoint_tags = {}

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  sts_endpoint_policy = null

  # Set to false if you don't want to associate a private hosted zone with the
  # specified VPC for the STS endpoint
  sts_endpoint_private_dns_enabled = true

  # The ID of one or more security groups to associate with the network
  # interface for the STS endpoint. If none is provided, AWS will associate the
  # default security group for the VPC.
  sts_endpoint_security_group_ids = []

  # The IDs of subnets in which to create a network interface for the STS
  # endpoint. Only a single subnet within an AZ is supported. If omitted, only
  # subnet_ids will be used.
  sts_endpoint_subnet_ids = []

  # Tags for the STS endpoint
  sts_endpoint_tags = {}

  # A map of tags to apply to all endpoints.
  tags = {}

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  textract_endpoint_policy = null

  # Set to false if you don't want to associate a private hosted zone with the
  # specified VPC for the Textract endpoint
  textract_endpoint_private_dns_enabled = true

  # The ID of one or more security groups to associate with the network
  # interface for the Textract endpoint. If none is provided, AWS will associate
  # the default security group for the VPC.
  textract_endpoint_security_group_ids = []

  # The IDs of subnets in which to create a network interface for the Textract
  # endpoint. Only a single subnet within an AZ is supported. When defined, it
  # overrides var.subnet_ids. For some regions, Textract endpoint is not
  # supported in all the AZs, so this variable helps to overcome this issue.
  textract_endpoint_subnet_ids = []

  # Tags for the Textract endpoint
  textract_endpoint_tags = {}

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  transfer_endpoint_policy = null

  # Set to false if you don't want to associate a private hosted zone with the
  # specified VPC for the Transfer endpoint
  transfer_endpoint_private_dns_enabled = true

  # The ID of one or more security groups to associate with the network
  # interface for the Transfer endpoint. If none is provided, AWS will associate
  # the default security group for the VPC.
  transfer_endpoint_security_group_ids = []

  # The IDs of subnets in which to create a network interface for the Transfer
  # endpoint. Only a single subnet within an AZ is supported. When defined, it
  # overrides var.subnet_ids. For some regions, Transfer endpoint is not
  # supported in all the AZs, so this variable helps to overcome this issue.
  transfer_endpoint_subnet_ids = []

  # Tags for the Transfer endpoint
  transfer_endpoint_tags = {}

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  transferserver_endpoint_policy = null

  # Set to false if you don't want to associate a private hosted zone with the
  # specified VPC for the Transfer Server endpoint
  transferserver_endpoint_private_dns_enabled = true

  # The ID of one or more security groups to associate with the network
  # interface for the Transfer Server endpoint. If none is provided, AWS will
  # associate the default security group for the VPC.
  transferserver_endpoint_security_group_ids = []

  # The IDs of subnets in which to create a network interface for the Transfer
  # Server endpoint. Only a single subnet within an AZ is supported. When
  # defined, it overrides var.subnet_ids. For some regions, Transfer Server
  # endpoint is not supported in all the AZs, so this variable helps to overcome
  # this issue.
  transferserver_endpoint_subnet_ids = []

  # Tags for the Transfer Server endpoint
  transferserver_endpoint_tags = {}

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  vpc_lattice_endpoint_policy = null

  # Set to false if you don't want to associate a private hosted zone with the
  # specified VPC for the VPC lattice endpoint.
  vpc_lattice_endpoint_private_dns_enabled = true

  # The ID of one or more security groups to associate with the network
  # interface for the VPC lattice endpoint. If none is provided, AWS will
  # associate the default security group for the VPC.
  vpc_lattice_endpoint_security_group_ids = []

  # The IDs of subnets in which to create a network interface for the VPC
  # lattice endpoint. Only a single subnet within an AZ is supported. If
  # omitted, only subnet_ids will be used.
  vpc_lattice_endpoint_subnet_ids = []

  # Tags for the VPC lattice endpoint
  vpc_lattice_endpoint_tags = {}

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  workspaces_endpoint_policy = null

  # Set to false if you don't want to associate a private hosted zone with the
  # specified VPC for the Workspaces endpoint
  workspaces_endpoint_private_dns_enabled = true

  # The ID of one or more security groups to associate with the network
  # interface for the Workspaces endpoint. If none is provided, AWS will
  # associate the default security group for the VPC.
  workspaces_endpoint_security_group_ids = []

  # The IDs of subnets in which to create a network interface for the Workspaces
  # endpoint. Only a single subnet within an AZ is supported. When defined, it
  # overrides var.subnet_ids. For some regions, Workspaces endpoint is not
  # supported in all the AZs, so this variable helps to overcome this issue.
  workspaces_endpoint_subnet_ids = []

  # Tags for the Workspaces endpoint
  workspaces_endpoint_tags = {}

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S VPC-INTERFACE-ENDPOINT MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-vpc.git//modules/vpc-interface-endpoint?ref=v0.28.8"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # A list of IDs of the subnets for all endpoints. Each endpoint will create
  # one ENI (Elastic Network Interface) per subnet.
  subnet_ids = <list(string)>

  # The ID of the VPC for all modules
  vpc_id = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  access_analyzer_endpoint_policy = null

  # Set to false if you don't want to associate a private hosted zone with the
  # specified VPC for the Access Analyzer endpoint
  access_analyzer_endpoint_private_dns_enabled = true

  # The ID of one or more security groups to associate with the network
  # interface for the Access Analyzer endpoint. If none is provided, AWS will
  # associate the default security group for the VPC.
  access_analyzer_endpoint_security_group_ids = []

  # The IDs of subnets in which to create a network interface for the Access
  # Analyzer endpoint. Only a single subnet within an AZ is supported. When
  # defined, it overrides var.subnet_ids. For some regions, Access Analyzer
  # endpoint is not supported in all the AZs, so this variable helps to overcome
  # this issue.
  access_analyzer_endpoint_subnet_ids = []

  # Tags for the Access Analyzer endpoint
  access_analyzer_endpoint_tags = {}

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  acm_pca_endpoint_policy = null

  # Set to false if you don't want to associate a private hosted zone with the
  # specified VPC for the ACM PCA endpoint
  acm_pca_endpoint_private_dns_enabled = true

  # The ID of one or more security groups to associate with the network
  # interface for the ACM PCA endpoint. If none is provided, AWS will associate
  # the default security group for the VPC.
  acm_pca_endpoint_security_group_ids = []

  # The IDs of subnets in which to create a network interface for the ACM PCA
  # endpoint. Only a single subnet within an AZ is supported. When defined, it
  # overrides var.subnet_ids. For some regions, ACM PCA endpoint is not
  # supported in all the AZs, so this variable helps to overcome this issue.
  acm_pca_endpoint_subnet_ids = []

  # Tags for the ACM PCA endpoint
  acm_pca_endpoint_tags = {}

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  api_gateway_endpoint_policy = null

  # Set to false if you don't want to associate a private hosted zone with the
  # specified VPC for the API Gateway endpoint
  api_gateway_endpoint_private_dns_enabled = true

  # The ID of one or more security groups to associate with the network
  # interface for the API Gateway endpoint. If none is provided, AWS will
  # associate the default security group for the VPC.
  api_gateway_endpoint_security_group_ids = []

  # The IDs of subnets in which to create a network interface for the API
  # Gateway endpoint. Only a single subnet within an AZ is supported. If
  # omitted, only subnet_ids will be used.
  api_gateway_endpoint_subnet_ids = []

  # Tags for the API Gateway endpoint
  api_gateway_endpoint_tags = {}

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  appmesh_envoy_management_endpoint_policy = null

  # Set to false if you don't want to associate a private hosted zone with the
  # specified VPC for the AppMesh endpoint
  appmesh_envoy_management_endpoint_private_dns_enabled = true

  # The ID of one or more security groups to associate with the network
  # interface for the AppMesh endpoint. If none is provided, AWS will associate
  # the default security group for the VPC.
  appmesh_envoy_management_endpoint_security_group_ids = []

  # The IDs of subnets in which to create a network interface for the AppMesh
  # endpoint. Only a single subnet within an AZ is supported. When defined, it
  # overrides var.subnet_ids. For some regions, AppMesh endpoint is not
  # supported in all the AZs, so this variable helps to overcome this issue.
  appmesh_envoy_management_endpoint_subnet_ids = []

  # Tags for the AppMesh endpoint
  appmesh_envoy_management_endpoint_tags = {}

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  appstream_api_endpoint_policy = null

  # Set to false if you don't want to associate a private hosted zone with the
  # specified VPC for the AppStream API endpoint
  appstream_api_endpoint_private_dns_enabled = true

  # The ID of one or more security groups to associate with the network
  # interface for the AppStream API endpoint. If none is provided, AWS will
  # associate the default security group for the VPC.
  appstream_api_endpoint_security_group_ids = []

  # The IDs of subnets in which to create a network interface for the AppStream
  # API endpoint. Only a single subnet within an AZ is supported. When defined,
  # it overrides var.subnet_ids. For some regions, AppStream API endpoint is not
  # supported in all the AZs, so this variable helps to overcome this issue.
  appstream_api_endpoint_subnet_ids = []

  # Tags for the AppStream API endpoint
  appstream_api_endpoint_tags = {}

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  appstream_streaming_endpoint_policy = null

  # Set to false if you don't want to associate a private hosted zone with the
  # specified VPC for the AppStream STREAMING endpoint
  appstream_streaming_endpoint_private_dns_enabled = true

  # The ID of one or more security groups to associate with the network
  # interface for the AppStream STREAMING endpoint. If none is provided, AWS
  # will associate the default security group for the VPC.
  appstream_streaming_endpoint_security_group_ids = []

  # The IDs of subnets in which to create a network interface for the AppStream
  # STREAMING endpoint. Only a single subnet within an AZ is supported. When
  # defined, it overrides var.subnet_ids. For some regions, AppStream STREAMING
  # endpoint is not supported in all the AZs, so this variable helps to overcome
  # this issue.
  appstream_streaming_endpoint_subnet_ids = []

  # Tags for the AppStream STREAMING endpoint
  appstream_streaming_endpoint_tags = {}

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  athena_endpoint_policy = null

  # Set to false if you don't want to associate a private hosted zone with the
  # specified VPC for the Athena endpoint
  athena_endpoint_private_dns_enabled = true

  # The ID of one or more security groups to associate with the network
  # interface for the Athena endpoint. If none is provided, AWS will associate
  # the default security group for the VPC.
  athena_endpoint_security_group_ids = []

  # The IDs of subnets in which to create a network interface for the Athena
  # endpoint. Only a single subnet within an AZ is supported. When defined, it
  # overrides var.subnet_ids. For some regions, Athena endpoint is not supported
  # in all the AZs, so this variable helps to overcome this issue.
  athena_endpoint_subnet_ids = []

  # Tags for the Athena endpoint
  athena_endpoint_tags = {}

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  auto_scaling_plans_endpoint_policy = null

  # Set to false if you don't want to associate a private hosted zone with the
  # specified VPC for the Auto Scaling Plans endpoint
  auto_scaling_plans_endpoint_private_dns_enabled = true

  # The ID of one or more security groups to associate with the network
  # interface for the Auto Scaling Plans endpoint. If none is provided, AWS will
  # associate the default security group for the VPC.
  auto_scaling_plans_endpoint_security_group_ids = []

  # The IDs of subnets in which to create a network interface for the Auto
  # Scaling Plans endpoint. Only a single subnet within an AZ is supported. When
  # defined, it overrides var.subnet_ids. For some regions, Auto Scaling Plans
  # endpoint is not supported in all the AZs, so this variable helps to overcome
  # this issue.
  auto_scaling_plans_endpoint_subnet_ids = []

  # Tags for the Auto Scaling Plans endpoint
  auto_scaling_plans_endpoint_tags = {}

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  cloud_directory_endpoint_policy = null

  # Set to false if you don't want to associate a private hosted zone with the
  # specified VPC for the Cloud Directory endpoint
  cloud_directory_endpoint_private_dns_enabled = true

  # The ID of one or more security groups to associate with the network
  # interface for the Cloud Directory endpoint. If none is provided, AWS will
  # associate the default security group for the VPC.
  cloud_directory_endpoint_security_group_ids = []

  # The IDs of subnets in which to create a network interface for the Cloud
  # Directory endpoint. Only a single subnet within an AZ is supported. When
  # defined, it overrides var.subnet_ids. For some regions, Cloud Directory
  # endpoint is not supported in all the AZs, so this variable helps to overcome
  # this issue.
  cloud_directory_endpoint_subnet_ids = []

  # Tags for the Cloud Directory endpoint
  cloud_directory_endpoint_tags = {}

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  cloudformation_endpoint_policy = null

  # Set to false if you don't want to associate a private hosted zone with the
  # specified VPC for the Cloudformation endpoint
  cloudformation_endpoint_private_dns_enabled = true

  # The ID of one or more security groups to associate with the network
  # interface for the Cloudformation endpoint. If none is provided, AWS will
  # associate the default security group for the VPC.
  cloudformation_endpoint_security_group_ids = []

  # The IDs of subnets in which to create a network interface for the
  # theCloudformation endpoint. Only a single subnet within an AZ is supported.
  # If omitted, only subnet_ids will be used.
  cloudformation_endpoint_subnet_ids = []

  # Tags for the CloudFormation endpoint
  cloudformation_endpoint_tags = {}

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  cloudtrail_endpoint_policy = null

  # Set to false if you don't want to associate a private hosted zone with the
  # specified VPC for the CloudTrail endpoint
  cloudtrail_endpoint_private_dns_enabled = true

  # The ID of one or more security groups to associate with the network
  # interface for the CloudTrail endpoint. If none is provided, AWS will
  # associate the default security group for the VPC.
  cloudtrail_endpoint_security_group_ids = []

  # The IDs of subnets in which to create a network interface for the CloudTrail
  # endpoint. Only a single subnet within an AZ is supported. If omitted, only
  # subnet_ids will be used.
  cloudtrail_endpoint_subnet_ids = []

  # Tags for the CloudTrail endpoint
  cloudtrail_endpoint_tags = {}

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  cloudwatch_events_endpoint_policy = null

  # Set to false if you don't want to associate a private hosted zone with the
  # specified VPC for the CloudWatch Events endpoint
  cloudwatch_events_endpoint_private_dns_enabled = true

  # The ID of one or more security groups to associate with the network
  # interface for the CloudWatch Events endpoint. If none is provided, AWS will
  # associate the default security group for the VPC.
  cloudwatch_events_endpoint_security_group_ids = []

  # The IDs of subnets in which to create a network interface for the CloudWatch
  # Events endpoint. Only a single subnet within an AZ is supported. If omitted,
  # only subnet_ids will be used.
  cloudwatch_events_endpoint_subnet_ids = []

  # Tags for the CloudWatch Events endpoint
  cloudwatch_events_endpoint_tags = {}

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  cloudwatch_logs_endpoint_policy = null

  # Set to false if you don't want to associate a private hosted zone with the
  # specified VPC for the CloudWatch Logs endpoint
  cloudwatch_logs_endpoint_private_dns_enabled = true

  # The ID of one or more security groups to associate with the network
  # interface for the CloudWatch Logs endpoint. If none is provided, AWS will
  # associate the default security group for the VPC.
  cloudwatch_logs_endpoint_security_group_ids = []

  # The IDs of subnets in which to create a network interface for the CloudWatch
  # Logs endpoint. Only a single subnet within an AZ is supported. If omitted,
  # only subnet_ids will be used.
  cloudwatch_logs_endpoint_subnet_ids = []

  # Tags for the CloudWatch Logs endpoint
  cloudwatch_logs_endpoint_tags = {}

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  cloudwatch_monitoring_endpoint_policy = null

  # Set to false if you don't want to associate a private hosted zone with the
  # specified VPC for the CloudWatch Monitoring endpoint
  cloudwatch_monitoring_endpoint_private_dns_enabled = true

  # The ID of one or more security groups to associate with the network
  # interface for the CloudWatch Monitoring endpoint. If none is provided, AWS
  # will associate the default security group for the VPC.
  cloudwatch_monitoring_endpoint_security_group_ids = []

  # The IDs of subnets in which to create a network interface for the CloudWatch
  # Monitoring endpoint. Only a single subnet within an AZ is supported. If
  # omitted, only subnet_ids will be used.
  cloudwatch_monitoring_endpoint_subnet_ids = []

  # Tags for the CloudWatch Monitoring endpoint
  cloudwatch_monitoring_endpoint_tags = {}

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  codeartifact_api_endpoint_policy = null

  # Set to false if you don't want to associate a private hosted zone with the
  # specified VPC for the CodeArtifact API endpoint
  codeartifact_api_endpoint_private_dns_enabled = true

  # The ID of one or more security groups to associate with the network
  # interface for the Codeartifact API endpoint. If none is provided, AWS will
  # associate the default security group for the VPC.
  codeartifact_api_endpoint_security_group_ids = []

  # The IDs of subnets in which to create a network interface for the
  # Codeartifact API endpoint. Only a single subnet within an AZ is supported.
  # When defined, it overrides var.subnet_ids. For some regions, Codeartifact
  # API endpoint is not supported in all the AZs, so this variable helps to
  # overcome this issue.
  codeartifact_api_endpoint_subnet_ids = []

  # Tags for the CodeArtifact API endpoint
  codeartifact_api_endpoint_tags = {}

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  codeartifact_repositories_endpoint_policy = null

  # Set to false if you don't want to associate a private hosted zone with the
  # specified VPC for the Codeartifact repositories endpoint
  codeartifact_repositories_endpoint_private_dns_enabled = true

  # The ID of one or more security groups to associate with the network
  # interface for the Codeartifact repositories endpoint. If none is provided,
  # AWS will associate the default security group for the VPC.
  codeartifact_repositories_endpoint_security_group_ids = []

  # The IDs of subnets in which to create a network interface for the
  # Codeartifact repositories endpoint. Only a single subnet within an AZ is
  # supported. When defined, it overrides var.subnet_ids. For some regions,
  # Codeartifact repositories endpoint is not supported in all the AZs, so this
  # variable helps to overcome this issue.
  codeartifact_repositories_endpoint_subnet_ids = []

  # Tags for the CodeArtifact API endpoint
  codeartifact_repositories_endpoint_tags = {}

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  codebuild_endpoint_policy = null

  # Set to false if you don't want to associate a private hosted zone with the
  # specified VPC for the CodeBuild endpoint
  codebuild_endpoint_private_dns_enabled = true

  # The ID of one or more security groups to associate with the network
  # interface for the CodeBuild endpoint. If none is provided, AWS will
  # associate the default security group for the VPC.
  codebuild_endpoint_security_group_ids = []

  # The IDs of subnets in which to create a network interface for the CodeBuild
  # endpoint. Only a single subnet within an AZ is supported. When defined, it
  # overrides var.subnet_ids. For some regions, CodeBuild endpoint is not
  # supported in all the AZs, so this variable helps to overcome this issue.
  codebuild_endpoint_subnet_ids = []

  # Tags for the CodeBuild endpoint
  codebuild_endpoint_tags = {}

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  codecommit_endpoint_policy = null

  # Set to false if you don't want to associate a private hosted zone with the
  # specified VPC for the CodeCommit endpoint
  codecommit_endpoint_private_dns_enabled = true

  # The ID of one or more security groups to associate with the network
  # interface for the CodeCommit endpoint. If none is provided, AWS will
  # associate the default security group for the VPC.
  codecommit_endpoint_security_group_ids = []

  # The IDs of subnets in which to create a network interface for the CodeCommit
  # API endpoint. Only a single subnet within an AZ is supported. When defined,
  # it overrides var.subnet_ids. For some regions, CodeCommit endpoint is not
  # supported in all the AZs, so this variable helps to overcome this issue.
  codecommit_endpoint_subnet_ids = []

  # Tags for the CodeCommit endpoint
  codecommit_endpoint_tags = {}

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  codedeploy_commands_secure_endpoint_policy = null

  # Set to false if you don't want to associate a private hosted zone with the
  # specified VPC for the CodeDeploy Commands Secure endpoint
  codedeploy_commands_secure_endpoint_private_dns_enabled = true

  # The ID of one or more security groups to associate with the network
  # interface for the CodeDeploy Commands Secure endpoint. If none is provided,
  # AWS will associate the default security group for the VPC.
  codedeploy_commands_secure_endpoint_security_group_ids = []

  # The IDs of subnets in which to create a network interface for the CodeDeploy
  # Commands Secure endpoint. Only a single subnet within an AZ is supported.
  # When defined, it overrides var.subnet_ids. For some regions, CodeDeploy
  # Commands Secure endpoint is not supported in all the AZs, so this variable
  # helps to overcome this issue.
  codedeploy_commands_secure_endpoint_subnet_ids = []

  # Tags for the CodeDeploy Commands Secure endpoint
  codedeploy_commands_secure_endpoint_tags = {}

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  codedeploy_endpoint_policy = null

  # Set to false if you don't want to associate a private hosted zone with the
  # specified VPC for the CodeDeploy endpoint
  codedeploy_endpoint_private_dns_enabled = true

  # The ID of one or more security groups to associate with the network
  # interface for the CodeDeploy endpoint. If none is provided, AWS will
  # associate the default security group for the VPC.
  codedeploy_endpoint_security_group_ids = []

  # The IDs of subnets in which to create a network interface for the CodeDeploy
  # endpoint. Only a single subnet within an AZ is supported. When defined, it
  # overrides var.subnet_ids. For some regions, CodeDeploy endpoint is not
  # supported in all the AZs, so this variable helps to overcome this issue.
  codedeploy_endpoint_subnet_ids = []

  # Tags for the CodeDeploy endpoint
  codedeploy_endpoint_tags = {}

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  codepipeline_endpoint_policy = null

  # Set to false if you don't want to associate a private hosted zone with the
  # specified VPC for the CodePipeline endpoint
  codepipeline_endpoint_private_dns_enabled = true

  # The ID of one or more security groups to associate with the network
  # interface for the CodePipeline endpoint. If none is provided, AWS will
  # associate the default security group for the VPC.
  codepipeline_endpoint_security_group_ids = []

  # The IDs of subnets in which to create a network interface for the
  # CodePipeline endpoint. Only a single subnet within an AZ is supported. When
  # defined, it overrides var.subnet_ids. For some regions, CodePipeline
  # endpoint is not supported in all the AZs, so this variable helps to overcome
  # this issue.
  codepipeline_endpoint_subnet_ids = []

  # Tags for the CodePipeline endpoint
  codepipeline_endpoint_tags = {}

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  config_endpoint_policy = null

  # Set to false if you don't want to associate a private hosted zone with the
  # specified VPC for the config endpoint
  config_endpoint_private_dns_enabled = true

  # The ID of one or more security groups to associate with the network
  # interface for the config endpoint. If none is provided, AWS will associate
  # the default security group for the VPC.
  config_endpoint_security_group_ids = []

  # The IDs of subnets in which to create a network interface for the config
  # endpoint. Only a single subnet within an AZ is supported. If omitted, only
  # subnet_ids will be used.
  config_endpoint_subnet_ids = []

  # Tags for the Config endpoint
  config_endpoint_tags = {}

  # If true, creates a security group that allows ingress on port 443 and
  # applies it to all endpoints. Must set this to true or supply
  # security_group_ids.
  create_https_security_group = false

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  datasync_endpoint_policy = null

  # Set to false if you don't want to associate a private hosted zone with the
  # specified VPC for the Data Sync endpoint
  datasync_endpoint_private_dns_enabled = true

  # The ID of one or more security groups to associate with the network
  # interface for the Data Sync endpoint. If none is provided, AWS will
  # associate the default security group for the VPC.
  datasync_endpoint_security_group_ids = []

  # The IDs of subnets in which to create a network interface for the Data Sync
  # endpoint. Only a single subnet within an AZ is supported. When defined, it
  # overrides var.subnet_ids. For some regions, Data Sync endpoint is not
  # supported in all the AZs, so this variable helps to overcome this issue.
  datasync_endpoint_subnet_ids = []

  # Tags for the Data Sync endpoint
  datasync_endpoint_tags = {}

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  ebs_endpoint_policy = null

  # Set to false if you don't want to associate a private hosted zone with the
  # specified VPC for the EBS endpoint.
  ebs_endpoint_private_dns_enabled = true

  # The ID of one or more security groups to associate with the network
  # interface for the EBS endpoint. If none is provided, AWS will associate the
  # default security group for the VPC.
  ebs_endpoint_security_group_ids = []

  # The IDs of subnets in which to create a network interface for the EBS
  # endpoint. Only a single subnet within an AZ is supported. If omitted, only
  # subnet_ids will be used.
  ebs_endpoint_subnet_ids = []

  # Tags for the EBS endpoint
  ebs_endpoint_tags = {}

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  ec2_autoscaling_endpoint_policy = null

  # Set to false if you don't want to associate a private hosted zone with the
  # specified VPC for the EC2-Autoscaling endpoint
  ec2_autoscaling_endpoint_private_dns_enabled = true

  # The ID of one or more security groups to associate with the network
  # interface for the EC2-Autoscaling endpoint. If none is provided, AWS will
  # associate the default security group for the VPC.
  ec2_autoscaling_endpoint_security_group_ids = []

  # The IDs of subnets in which to create a network interface for the
  # EC2-Autoscaling endpoint. Only a single subnet within an AZ is supported.
  # When defined, it overrides var.subnet_ids. For some regions, EC2-Autoscaling
  # endpoint is not supported in all the AZs, so this variable helps to overcome
  # this issue.
  ec2_autoscaling_endpoint_subnet_ids = []

  # Tags for the CodeArtifact API endpoint
  ec2_autoscaling_endpoint_tags = {}

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  ec2_endpoint_policy = null

  # Set to false if you don't want to associate a private hosted zone with the
  # specified VPC for the EC2 endpoint
  ec2_endpoint_private_dns_enabled = true

  # The ID of one or more security groups to associate with the network
  # interface for the EC2 endpoint
  ec2_endpoint_security_group_ids = []

  # The IDs of subnets in which to create a network interface for the EC2
  # endpoint. Only a single subnet within an AZ is supported. If omitted, only
  # subnet_ids will be used.
  ec2_endpoint_subnet_ids = []

  # Tags for the EC2 endpoint
  ec2_endpoint_tags = {}

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  ec2messages_endpoint_policy = null

  # Set to false if you don't want to associate a private hosted zone with the
  # specified VPC for the EC2 Messages endpoint
  ec2messages_endpoint_private_dns_enabled = true

  # The ID of one or more security groups to associate with the network
  # interface for the EC2 Messages endpoint. If none is provided, AWS will
  # associate the default security group for the VPC.
  ec2messages_endpoint_security_group_ids = []

  # The IDs of subnets in which to create a network interface for the EC2
  # Messages endpoint. Only a single subnet within an AZ is supported. If
  # omitted, only subnet_ids will be used.
  ec2messages_endpoint_subnet_ids = []

  # Tags for the EC2 Messages endpoint
  ec2messages_endpoint_tags = {}

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  ecr_api_endpoint_policy = null

  # Set to false if you don't want to associate a private hosted zone with the
  # specified VPC for the ECR API endpoint
  ecr_api_endpoint_private_dns_enabled = true

  # The ID of one or more security groups to associate with the network
  # interface for the ECR API endpoint. If none is provided, AWS will associate
  # the default security group for the VPC.
  ecr_api_endpoint_security_group_ids = []

  # The IDs of subnets in which to create a network interface for the ECR api
  # endpoint. If omitted, only subnet_ids will be used.
  ecr_api_endpoint_subnet_ids = []

  # Tags for the ECR API endpoint
  ecr_api_endpoint_tags = {}

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  ecr_dkr_endpoint_policy = null

  # Set to false if you don't want to associate a private hosted zone with the
  # specified VPC for ECR DKR endpoint
  ecr_dkr_endpoint_private_dns_enabled = true

  # The ID of one or more security groups to associate with the network
  # interface for the ECR DKR endpoint. If none is provided, AWS will associate
  # the default security group for the VPC.
  ecr_dkr_endpoint_security_group_ids = []

  # The IDs of subnets in which to create a network interface for the ECR dkr
  # endpoint. If omitted, only subnet_ids will be used.
  ecr_dkr_endpoint_subnet_ids = []

  # Tags for the ECR DKR endpoint
  ecr_dkr_endpoint_tags = {}

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  ecs_agent_endpoint_policy = null

  # Set to false if you don't want to associate a private hosted zone with the
  # specified VPC for the ECS Agent endpoint
  ecs_agent_endpoint_private_dns_enabled = true

  # The ID of one or more security groups to associate with the network
  # interface for the ECS Agent endpoint. If none is provided, AWS will
  # associate the default security group for the VPC.
  ecs_agent_endpoint_security_group_ids = []

  # The IDs of subnets in which to create a network interface for the ECS Agent
  # endpoint. Only a single subnet within an AZ is supported. If omitted, only
  # subnet_ids will be used.
  ecs_agent_endpoint_subnet_ids = []

  # Tags for the ECS Agent endpoint
  ecs_agent_endpoint_tags = {}

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  ecs_endpoint_policy = null

  # Set to false if you don't want to associate a private hosted zone with the
  # specified VPC for the ECS endpoint
  ecs_endpoint_private_dns_enabled = true

  # The ID of one or more security groups to associate with the network
  # interface for the ECS endpoint. If none is provided, AWS will associate the
  # default security group for the VPC.
  ecs_endpoint_security_group_ids = []

  # The IDs of subnets in which to create a network interface for the ECS
  # endpoint. Only a single subnet within an AZ is supported. If omitted, only
  # subnet_ids will be used.
  ecs_endpoint_subnet_ids = []

  # Tags for the ECS endpoint
  ecs_endpoint_tags = {}

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  ecs_telemetry_endpoint_policy = null

  # Set to false if you don't want to associate a private hosted zone with the
  # specified VPC for the ECS Telemetry endpoint
  ecs_telemetry_endpoint_private_dns_enabled = true

  # The ID of one or more security groups to associate with the network
  # interface for the ECS Telemetry endpoint. If none is provided, AWS will
  # associate the default security group for the VPC.
  ecs_telemetry_endpoint_security_group_ids = []

  # The IDs of subnets in which to create a network interface for the ECS
  # Telemetry endpoint. Only a single subnet within an AZ is supported. If
  # omitted, only subnet_ids will be used.
  ecs_telemetry_endpoint_subnet_ids = []

  # Tags for the ECS Telemetry endpoint
  ecs_telemetry_endpoint_tags = {}

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  efs_endpoint_policy = null

  # Set to false if you don't want to associate a private hosted zone with the
  # specified VPC for the EFS endpoint.
  efs_endpoint_private_dns_enabled = true

  # The ID of one or more security groups to associate with the network
  # interface for the EFS endpoint. If none is provided, AWS will associate the
  # default security group for the VPC.
  efs_endpoint_security_group_ids = []

  # The IDs of subnets in which to create a network interface for the EFS
  # endpoint. Only a single subnet within an AZ is supported. If omitted, only
  # subnet_ids will be used.
  efs_endpoint_subnet_ids = []

  # Tags for the EFS endpoint
  efs_endpoint_tags = {}

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  elastic_inference_runtime_endpoint_policy = null

  # Set to false if you don't want to associate a private hosted zone with the
  # specified VPC for the Elastic Inference Runtime endpoint
  elastic_inference_runtime_endpoint_private_dns_enabled = true

  # The ID of one or more security groups to associate with the network
  # interface for the Elastic Inference Runtime endpoint. If none is provided,
  # AWS will associate the default security group for the VPC.
  elastic_inference_runtime_endpoint_security_group_ids = []

  # The IDs of subnets in which to create a network interface for the Elastic
  # Inference Runtime endpoint. Only a single subnet within an AZ is supported.
  # When defined, it overrides var.subnet_ids. For some regions, Elastic
  # Inference Runtime endpoint is not supported in all the AZs, so this variable
  # helps to overcome this issue.
  elastic_inference_runtime_endpoint_subnet_ids = []

  # Tags for the Elastic Inference Runtime endpoint
  elastic_inference_runtime_endpoint_tags = {}

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  elasticache_endpoint_policy = null

  # Set to false if you don't want to associate a private hosted zone with the
  # specified VPC for the ElastiCache endpoint.
  elasticache_endpoint_private_dns_enabled = true

  # The ID of one or more security groups to associate with the network
  # interface for the Elasticache endpoint. If none is provided, AWS will
  # associate the default security group for the VPC.
  elasticache_endpoint_security_group_ids = []

  # The IDs of subnets in which to create a network interface for the
  # Elasticache endpoint. Only a single subnet within an AZ is supported. If
  # omitted, only subnet_ids will be used.
  elasticache_endpoint_subnet_ids = []

  # Tags for the Elasticache endpoint
  elasticache_endpoint_tags = {}

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  elasticbeanstalk_endpoint_policy = null

  # Set to false if you don't want to associate a private hosted zone with the
  # specified VPC for the Elastic Beanstalk endpoint
  elasticbeanstalk_endpoint_private_dns_enabled = true

  # The ID of one or more security groups to associate with the network
  # interface for the Elastic Beanstalk endpoint. If none is provided, AWS will
  # associate the default security group for the VPC.
  elasticbeanstalk_endpoint_security_group_ids = []

  # The IDs of subnets in which to create a network interface for the Elastic
  # Beanstalk endpoint. Only a single subnet within an AZ is supported. When
  # defined, it overrides var.subnet_ids. For some regions, Elastic Beanstalk
  # endpoint is not supported in all the AZs, so this variable helps to overcome
  # this issue.
  elasticbeanstalk_endpoint_subnet_ids = []

  # Tags for the Elastic Beanstalk endpoint
  elasticbeanstalk_endpoint_tags = {}

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  elasticbeanstalk_health_endpoint_policy = null

  # Set to false if you don't want to associate a private hosted zone with the
  # specified VPC for the Elastic Beanstalk Health endpoint
  elasticbeanstalk_health_endpoint_private_dns_enabled = true

  # The ID of one or more security groups to associate with the network
  # interface for the Elastic Beanstalk Health endpoint. If none is provided,
  # AWS will associate the default security group for the VPC.
  elasticbeanstalk_health_endpoint_security_group_ids = []

  # The IDs of subnets in which to create a network interface for the Elastic
  # Beanstalk Health endpoint. Only a single subnet within an AZ is supported.
  # When defined, it overrides var.subnet_ids. For some regions, Elastic
  # Beanstalk Health endpoint is not supported in all the AZs, so this variable
  # helps to overcome this issue.
  elasticbeanstalk_health_endpoint_subnet_ids = []

  # Tags for the Elastic Beanstalk Health endpoint
  elasticbeanstalk_health_endpoint_tags = {}

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  elb_endpoint_policy = null

  # Set to false if you don't want to associate a private hosted zone with the
  # specified VPC for the Elastic Load Balancing endpoint
  elb_endpoint_private_dns_enabled = true

  # The ID of one or more security groups to associate with the network
  # interface for the Elastic Load Balancing endpoint. If none is provided, AWS
  # will associate the default security group for the VPC.
  elb_endpoint_security_group_ids = []

  # The IDs of subnets in which to create a network interface for the Elastic
  # Load Balancing endpoint. Only a single subnet within an AZ is supported. If
  # omitted, only subnet_ids will be used.
  elb_endpoint_subnet_ids = []

  # Tags for the Elastic Load Balancing endpoint
  elb_endpoint_tags = {}

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  emr_endpoint_policy = null

  # Set to false if you don't want to associate a private hosted zone with the
  # specified VPC for the EMR endpoint
  emr_endpoint_private_dns_enabled = true

  # The ID of one or more security groups to associate with the network
  # interface for the EMR endpoint. If none is provided, AWS will associate the
  # default security group for the VPC.
  emr_endpoint_security_group_ids = []

  # The IDs of subnets in which to create a network interface for the EMR
  # endpoint. Only a single subnet within an AZ is supported. When defined, it
  # overrides var.subnet_ids. For some regions, EMR endpoint is not supported in
  # all the AZs, so this variable helps to overcome this issue.
  emr_endpoint_subnet_ids = []

  # Tags for the EMR endpoint
  emr_endpoint_tags = {}

  # Set to true if you want to provision a Access Analyzer Endpoint within the
  # VPC
  enable_access_analyzer_endpoint = false

  # Set to true if you want to provision a ACM PCA Endpoint within the VPC
  enable_acm_pca_endpoint = false

  # Set to true if you want to provision an API Gateway within the VPC
  enable_api_gateway_endpoint = false

  # Set to true if you want to provision a AppMesh Endpoint within the VPC
  enable_appmesh_envoy_management_endpoint = false

  # Set to true if you want to provision a AppStream API Endpoint within the VPC
  enable_appstream_api_endpoint = false

  # Set to true if you want to provision a AppStream STREAMING Endpoint within
  # the VPC
  enable_appstream_streaming_endpoint = false

  # Set to true if you want to provision a Athena Endpoint within the VPC
  enable_athena_endpoint = false

  # Set to true if you want to provision a Auto Scaling Plans Endpoint within
  # the VPC
  enable_auto_scaling_plans_endpoint = false

  # Set to true if you want to provision a Cloud Directory Endpoint within the
  # VPC
  enable_cloud_directory_endpoint = false

  # Set to true if you want to provision a Cloudformation within the VPC
  enable_cloudformation_endpoint = false

  # Set to true if you want to provision a CloudTrail within the VPC
  enable_cloudtrail_endpoint = false

  # Set to true if you want to provision a CloudWatch Events within the VPC
  enable_cloudwatch_events_endpoint = false

  # Set to true if you want to provision a CloudWatch Logs within the VPC
  enable_cloudwatch_logs_endpoint = false

  # Set to true if you want to provision a Codeartifact API Endpoint within the
  # VPC
  enable_codeartifact_api_endpoint = false

  # Set to true if you want to provision a Codeartifact repositories Endpoint
  # within the VPC
  enable_codeartifact_repositories_endpoint = false

  # Set to true if you want to provision a CodeBuild Endpoint within the VPC
  enable_codebuild_endpoint = false

  # Set to true if you want to provision a CodeCommit Endpoint within the VPC
  enable_codecommit_endpoint = false

  # Set to true if you want to provision a CodeDeploy Commands Secure Endpoint
  # within the VPC
  enable_codedeploy_commands_secure_endpoint = false

  # Set to true if you want to provision a CodeDeploy Endpoint within the VPC
  enable_codedeploy_endpoint = false

  # Set to true if you want to provision a CodePipeline Endpoint within the VPC
  enable_codepipeline_endpoint = false

  # Set to true if you want to provision a config within the VPC
  enable_config_endpoint = false

  # Set to true if you want to provision a Data Sync Endpoint within the VPC
  enable_datasync_endpoint = false

  # Set to true if you want to provision a EBS endpoint within the VPC.
  enable_ebs_endpoint = false

  # Set to true if you want to provision a EC2-Autoscaling Endpoint within the
  # VPC
  enable_ec2_autoscaling_endpoint = false

  # Set to true if you want to provision an EC2 within the VPC
  enable_ec2_endpoint = false

  # Set to true if you want to provision an EC2 Messages endpoint within the VPC
  enable_ec2messages_endpoint = false

  # Set to true if you want to provision an ECR API within the VPC
  enable_ecr_api_endpoint = false

  # Set to true if you want to provision an ECR DKR within the VPC
  enable_ecr_dkr_endpoint = false

  # Set to true if you want to provision an ECS Agent within the VPC
  enable_ecs_agent_endpoint = false

  # Set to true if you want to provision an ECS within the VPC
  enable_ecs_endpoint = false

  # Set to true if you want to provision an ECS Agent within the VPC
  enable_ecs_telemetry_endpoint = false

  # Set to true if you want to provision a EFS endpoint within the VPC.
  enable_efs_endpoint = false

  # Set to true if you want to provision a Elastic Inference Runtime Endpoint
  # within the VPC
  enable_elastic_inference_runtime_endpoint = false

  # Set to true if you want to provision Elasticache endpoint within the VPC.
  enable_elasticache_endpoint = false

  # Set to true if you want to provision a Elastic Beanstalk Endpoint within the
  # VPC
  enable_elasticbeanstalk_endpoint = false

  # Set to true if you want to provision a Elastic Beanstalk Health Endpoint
  # within the VPC
  enable_elasticbeanstalk_health_endpoint = false

  # Set to true if you want to provision an Elastic Load Balancing within the
  # VPC
  enable_elb_endpoint = false

  # Set to true if you want to provision a EMR Endpoint within the VPC
  enable_emr_endpoint = false

  # Set to true if you want to provision a Git CodeCommit Endpoint within the
  # VPC
  enable_git_codecommit_endpoint = false

  # Set to true if you want to provision a Glue endpoint within the VPC.
  enable_glue_endpoint = false

  # Set to true if you want to provision a KINESIS Firehose Endpoint within the
  # VPC
  enable_kinesis_firehose_endpoint = false

  # Set to true if you want to provision a Kinesis Streams within the VPC
  enable_kinesis_streams_endpoint = false

  # Set to true if you want to provision a KMS within the VPC
  enable_kms_endpoint = false

  # Set to true if you want to provision a Lambda endpoint within the VPC.
  enable_lambda_endpoint = false

  # Set to true if you want to provision Pinpoint endpoint within the VPC.
  enable_pinpoint_endpoint = false

  # Set to true if you want to provision a QLDB Session Endpoint within the VPC
  enable_qldb_session_endpoint = false

  # Set to true if you want to provision a RDS Endpoint within the VPC
  enable_rds_endpoint = false

  # Set to true if you want to provision a RDS FIPSEndpoint within the VPC
  enable_rds_fips_endpoint = false

  # Set to true if you want to provision a Redshift within the VPC
  enable_redshift_data_endpoint = false

  # Set to true if you want to provision a Rekognition Endpoint within the VPC
  enable_rekognition_endpoint = false

  # Set to true if you want to provision a SageMaker API Endpoint within the VPC
  enable_sagemaker_api_endpoint = false

  # Set to true if you want to provision a SageMaker Runtime Endpoint within the
  # VPC
  enable_sagemaker_runtime_endpoint = false

  # Set to true if you want to provision a Secrets Manager within the VPC
  enable_secretsmanager_endpoint = false

  # Set to true if you want to provision a FIPS Secrets Manager within the VPC
  enable_secretsmanager_fips_endpoint = false

  # Set to true if you want to provision a Service Catalog Endpoint within the
  # VPC
  enable_servicecatalog_endpoint = false

  # Set to true if you want to provision a Simple Email Service within the VPC
  enable_ses_endpoint = false

  # Set to true if you want to provision a SMS Endpoint within the VPC
  enable_sms_endpoint = false

  # Set to true if you want to provision a SNS within the VPC
  enable_sns_endpoint = false

  # Set to true if you want to provision a SQS within the VPC
  enable_sqs_endpoint = false

  # Set to true if you want to provision an SSM endpoint within the VPC
  enable_ssm_endpoint = false

  # Set to true if you want to provision an SSM Messages endpoint within the VPC
  enable_ssmmessages_endpoint = false

  # Set to true if you want to provision a Step Function Endpoint within the VPC
  enable_states_endpoint = false

  # Set to true if you want to provision a Storage Gateway Endpoint within the
  # VPC
  enable_storagegateway_endpoint = false

  # Set to true if you want to provision a STS within the VPC
  enable_sts_endpoint = false

  # Set to true if you want to provision a Textract Endpoint within the VPC
  enable_textract_endpoint = false

  # Set to true if you want to provision a Transfer Endpoint within the VPC
  enable_transfer_endpoint = false

  # Set to true if you want to provision a Transfer Server Endpoint within the
  # VPC
  enable_transferserver_endpoint = false

  # Set to true if you want to provision a CloudWatch Monitoring within the VPC
  enable_vpc_cloudwatch_monitoring_endpoint = false

  # Set to true if you want to provision a VPC lattice endpoint within the VPC.
  enable_vpc_lattice_endpoint = false

  # Set to true if you want to provision a Workspaces Endpoint within the VPC
  enable_workspaces_endpoint = false

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  git_codecommit_endpoint_policy = null

  # Set to false if you don't want to associate a private hosted zone with the
  # specified VPC for the Git CodeCommit API endpoint
  git_codecommit_endpoint_private_dns_enabled = true

  # The ID of one or more security groups to associate with the network
  # interface for the Git CodeCommit endpoint. If none is provided, AWS will
  # associate the default security group for the VPC.
  git_codecommit_endpoint_security_group_ids = []

  # The IDs of subnets in which to create a network interface for the Git
  # CodeCommit API endpoint. Only a single subnet within an AZ is supported.
  # When defined, it overrides var.subnet_ids. For some regions, Git CodeCommit
  # endpoint is not supported in all the AZs, so this variable helps to overcome
  # this issue.
  git_codecommit_endpoint_subnet_ids = []

  # Tags for the Git CodeCommit endpoint
  git_codecommit_endpoint_tags = {}

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  glue_endpoint_policy = null

  # Set to false if you don't want to associate a private hosted zone with the
  # specified VPC for the Glue endpoint.
  glue_endpoint_private_dns_enabled = true

  # The ID of one or more security groups to associate with the network
  # interface for the glue endpoint. If none is provided, AWS will associate the
  # default security group for the VPC.
  glue_endpoint_security_group_ids = []

  # The IDs of subnets in which to create a network interface for the glue
  # endpoint. Only a single subnet within an AZ is supported. If omitted, only
  # subnet_ids will be used.
  glue_endpoint_subnet_ids = []

  # Tags for the Glue endpoint
  glue_endpoint_tags = {}

  # List of CIDR blocks where HTTPS ingress should be allowed from. Defaults to
  # the VPC's CIDR if left empty. Only used if create_https_security_group is
  # true.
  https_security_group_cidr_blocks = []

  # Name prefix to use on the created SG. A random string will be appended.
  https_security_group_name_prefix = "allow-https-"

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  kinesis_firehose_endpoint_policy = null

  # Set to false if you don't want to associate a private hosted zone with the
  # specified VPC for the KINESIS Firehose endpoint
  kinesis_firehose_endpoint_private_dns_enabled = true

  # The ID of one or more security groups to associate with the network
  # interface for the KINESIS Firehose endpoint. If none is provided, AWS will
  # associate the default security group for the VPC.
  kinesis_firehose_endpoint_security_group_ids = []

  # The IDs of subnets in which to create a network interface for the KINESIS
  # Firehose endpoint. Only a single subnet within an AZ is supported. When
  # defined, it overrides var.subnet_ids. For some regions, KINESIS Firehose
  # endpoint is not supported in all the AZs, so this variable helps to overcome
  # this issue.
  kinesis_firehose_endpoint_subnet_ids = []

  # Tags for the KINESIS Firehose endpoint
  kinesis_firehose_endpoint_tags = {}

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  kinesis_streams_endpoint_policy = null

  # Set to false if you don't want to associate a private hosted zone with the
  # specified VPC for the Kinesis Streams endpoint
  kinesis_streams_endpoint_private_dns_enabled = true

  # The ID of one or more security groups to associate with the network
  # interface for the Kinesis Streams endpoint. If none is provided, AWS will
  # associate the default security group for the VPC.
  kinesis_streams_endpoint_security_group_ids = []

  # The IDs of subnets in which to create a network interface for the Kinesis
  # Streams endpoint. Only a single subnet within an AZ is supported. If
  # omitted, only subnet_ids will be used.
  kinesis_streams_endpoint_subnet_ids = []

  # Tags for the Kinesis endpoint
  kinesis_streams_endpoint_tags = {}

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  kms_endpoint_policy = null

  # Set to false if you don't want to associate a private hosted zone with the
  # specified VPC for the KMS endpoint
  kms_endpoint_private_dns_enabled = true

  # The ID of one or more security groups to associate with the network
  # interface for the KMS endpoint. If none is provided, AWS will associate the
  # default security group for the VPC.
  kms_endpoint_security_group_ids = []

  # The IDs of subnets in which to create a network interface for the KMS
  # endpoint. Only a single subnet within an AZ is supported. If omitted, only
  # subnet_ids will be used.
  kms_endpoint_subnet_ids = []

  # Tags for the KMS endpoint
  kms_endpoint_tags = {}

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  lambda_endpoint_policy = null

  # Set to false if you don't want to associate a private hosted zone with the
  # specified VPC for the Lambda endpoint.
  lambda_endpoint_private_dns_enabled = true

  # The ID of one or more security groups to associate with the network
  # interface for the Lambda endpoint. If none is provided, AWS will associate
  # the default security group for the VPC.
  lambda_endpoint_security_group_ids = []

  # The IDs of subnets in which to create a network interface for the Lambda
  # endpoint. Only a single subnet within an AZ is supported. If omitted, only
  # subnet_ids will be used.
  lambda_endpoint_subnet_ids = []

  # Tags for the Lambda endpoint
  lambda_endpoint_tags = {}

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  pinpoint_endpoint_policy = null

  # Set to false if you don't want to associate a private hosted zone with the
  # specified VPC for the Pinpoint endpoint.
  pinpoint_endpoint_private_dns_enabled = true

  # The ID of one or more security groups to associate with the network
  # interface for the Pinpoint endpoint. If none is provided, AWS will associate
  # the default security group for the VPC.
  pinpoint_endpoint_security_group_ids = []

  # The IDs of subnets in which to create a network interface for the Pinpoint
  # endpoint. Only a single subnet within an AZ is supported. If omitted, only
  # subnet_ids will be used.
  pinpoint_endpoint_subnet_ids = []

  # Tags for the Pinpoint endpoint
  pinpoint_endpoint_tags = {}

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  qldb_session_endpoint_policy = null

  # Set to false if you don't want to associate a private hosted zone with the
  # specified VPC for the QLDB Session endpoint
  qldb_session_endpoint_private_dns_enabled = true

  # The ID of one or more security groups to associate with the network
  # interface for the QLDB Session endpoint. If none is provided, AWS will
  # associate the default security group for the VPC.
  qldb_session_endpoint_security_group_ids = []

  # The IDs of subnets in which to create a network interface for the QLDB
  # Session endpoint. Only a single subnet within an AZ is supported. When
  # defined, it overrides var.subnet_ids. For some regions, QLDB Session
  # endpoint is not supported in all the AZs, so this variable helps to overcome
  # this issue.
  qldb_session_endpoint_subnet_ids = []

  # Tags for the QLDB Session endpoint
  qldb_session_endpoint_tags = {}

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  rds_endpoint_policy = null

  # Set to false if you don't want to associate a private hosted zone with the
  # specified VPC for the RDS endpoint
  rds_endpoint_private_dns_enabled = true

  # The ID of one or more security groups to associate with the network
  # interface for the RDS endpoint. If none is provided, AWS will associate the
  # default security group for the VPC.
  rds_endpoint_security_group_ids = []

  # The IDs of subnets in which to create a network interface for the RDS
  # endpoint. Only a single subnet within an AZ is supported. When defined, it
  # overrides var.subnet_ids. For some regions, RDS endpoint is not supported in
  # all the AZs, so this variable helps to overcome this issue.
  rds_endpoint_subnet_ids = []

  # Tags for the RDS endpoint
  rds_endpoint_tags = {}

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  rds_fips_endpoint_policy = null

  # Set to false if you don't want to associate a private hosted zone with the
  # specified VPC for the RDS FIPS endpoint
  rds_fips_endpoint_private_dns_enabled = true

  # The ID of one or more security groups to associate with the network
  # interface for the RDS endpoint. If none is provided, AWS will associate the
  # default security group for the VPC.
  rds_fips_endpoint_security_group_ids = []

  # The IDs of subnets in which to create a network interface for the RDS
  # endpoint. Only a single subnet within an AZ is supported. When defined, it
  # overrides var.subnet_ids. For some regions, RDS endpoint is not supported in
  # all the AZs, so this variable helps to overcome this issue.
  rds_fips_endpoint_subnet_ids = []

  # Tags for the RDS FIPS endpoint
  rds_fips_endpoint_tags = {}

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  redshift_data_endpoint_policy = null

  # Set to false if you don't want to associate a private hosted zone with the
  # specified VPC for the Redshift endpoint
  redshift_data_endpoint_private_dns_enabled = true

  # The ID of one or more security groups to associate with the network
  # interface for the Redshift endpoint. If none is provided, AWS will associate
  # the default security group for the VPC.
  redshift_data_endpoint_security_group_ids = []

  # The IDs of subnets in which to create a network interface for the Redshift
  # endpoint. Only a single subnet within an AZ is supported. If omitted, only
  # subnet_ids will be used.
  redshift_data_endpoint_subnet_ids = []

  # Tags for the Redshift endpoint
  redshift_data_endpoint_tags = {}

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  rekognition_endpoint_policy = null

  # Set to false if you don't want to associate a private hosted zone with the
  # specified VPC for the Rekognition endpoint
  rekognition_endpoint_private_dns_enabled = true

  # The ID of one or more security groups to associate with the network
  # interface for the Rekognition endpoint. If none is provided, AWS will
  # associate the default security group for the VPC.
  rekognition_endpoint_security_group_ids = []

  # The IDs of subnets in which to create a network interface for the
  # Rekognition endpoint. Only a single subnet within an AZ is supported. When
  # defined, it overrides var.subnet_ids. For some regions, Rekognition endpoint
  # is not supported in all the AZs, so this variable helps to overcome this
  # issue.
  rekognition_endpoint_subnet_ids = []

  # Tags for the Rekognition endpoint
  rekognition_endpoint_tags = {}

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  sagemaker_api_endpoint_policy = null

  # Set to false if you don't want to associate a private hosted zone with the
  # specified VPC for the SageMaker API endpoint
  sagemaker_api_endpoint_private_dns_enabled = true

  # The ID of one or more security groups to associate with the network
  # interface for the SageMaker API endpoint. If none is provided, AWS will
  # associate the default security group for the VPC.
  sagemaker_api_endpoint_security_group_ids = []

  # The IDs of subnets in which to create a network interface for the SageMaker
  # API endpoint. Only a single subnet within an AZ is supported. When defined,
  # it overrides var.subnet_ids. For some regions, SageMaker API endpoint is not
  # supported in all the AZs, so this variable helps to overcome this issue.
  sagemaker_api_endpoint_subnet_ids = []

  # Tags for the SageMaker API endpoint
  sagemaker_api_endpoint_tags = {}

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  sagemaker_runtime_endpoint_policy = null

  # Set to false if you don't want to associate a private hosted zone with the
  # specified VPC for the SageMaker Runtime endpoint
  sagemaker_runtime_endpoint_private_dns_enabled = true

  # The ID of one or more security groups to associate with the network
  # interface for the SageMaker Runtime endpoint. If none is provided, AWS will
  # associate the default security group for the VPC.
  sagemaker_runtime_endpoint_security_group_ids = []

  # The IDs of subnets in which to create a network interface for the SageMaker
  # Runtime endpoint. Only a single subnet within an AZ is supported. When
  # defined, it overrides var.subnet_ids. For some regions, SageMaker Runtime
  # endpoint is not supported in all the AZs, so this variable helps to overcome
  # this issue.
  sagemaker_runtime_endpoint_subnet_ids = []

  # Tags for the SageMaker Runtime endpoint
  sagemaker_runtime_endpoint_tags = {}

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  secretsmanager_endpoint_policy = null

  # Set to false if you don't want to associate a private hosted zone with the
  # specified VPC for the Secrets Manager endpoint
  secretsmanager_endpoint_private_dns_enabled = true

  # The ID of one or more security groups to associate with the network
  # interface for the Secrets Manager endpoint. If none is provided, AWS will
  # associate the default security group for the VPC.
  secretsmanager_endpoint_security_group_ids = []

  # The IDs of subnets in which to create a network interface for the Secrets
  # Manager endpoint. Only a single subnet within an AZ is supported. If
  # omitted, only subnet_ids will be used.
  secretsmanager_endpoint_subnet_ids = []

  # Tags for the Secrets Manager endpoint
  secretsmanager_endpoint_tags = {}

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  secretsmanager_fips_endpoint_policy = null

  # Set to false if you don't want to associate a private hosted zone with the
  # specified VPC for the FIPS Secrets Manager endpoint
  secretsmanager_fips_endpoint_private_dns_enabled = true

  # The ID of one or more security groups to associate with the network
  # interface for the Secrets Manager endpoint. If none is provided, AWS will
  # associate the default security group for the VPC.
  secretsmanager_fips_endpoint_security_group_ids = []

  # The IDs of subnets in which to create a network interface for the  FIPS
  # Secrets Manager endpoint. Only a single subnet within an AZ is supported. If
  # omitted, only subnet_ids will be used.
  secretsmanager_fips_endpoint_subnet_ids = []

  # Tags for the FIPS Secrets Manager endpoint
  secretsmanager_fips_endpoint_tags = {}

  # A list of IDs of the security groups which will apply for all endpoints.
  # Must supply this or create_https_security_group = true.
  security_group_ids = []

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  servicecatalog_endpoint_policy = null

  # Set to false if you don't want to associate a private hosted zone with the
  # specified VPC for the Service Catalog endpoint
  servicecatalog_endpoint_private_dns_enabled = true

  # The ID of one or more security groups to associate with the network
  # interface for the Service Catalog endpoint. If none is provided, AWS will
  # associate the default security group for the VPC.
  servicecatalog_endpoint_security_group_ids = []

  # The IDs of subnets in which to create a network interface for the Service
  # Catalog endpoint. Only a single subnet within an AZ is supported. When
  # defined, it overrides var.subnet_ids. For some regions, Service Catalog
  # endpoint is not supported in all the AZs, so this variable helps to overcome
  # this issue.
  servicecatalog_endpoint_subnet_ids = []

  # Tags for the Service Catalog endpoint
  servicecatalog_endpoint_tags = {}

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  ses_endpoint_policy = null

  # Set to false if you don't want to associate a private hosted zone with the
  # specified VPC for the Simple Email Service endpoint
  ses_endpoint_private_dns_enabled = true

  # The ID of one or more security groups to associate with the network
  # interface for the Simple Email Service endpoint. If none is provided, AWS
  # will associate the default security group for the VPC.
  ses_endpoint_security_group_ids = []

  # The IDs of subnets in which to create a network interface for the Simple
  # Email Service endpoint. Only a single subnet within an AZ is supported. When
  # defined, it overrides var.subnet_ids. For some regions, SES is not supported
  # in all the AZs, so this variable helps to overcome this issue.
  ses_endpoint_subnet_ids = []

  # Tags for the Simple Email Service endpoint
  ses_endpoint_tags = {}

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  sms_endpoint_policy = null

  # Set to false if you don't want to associate a private hosted zone with the
  # specified VPC for the SMS endpoint
  sms_endpoint_private_dns_enabled = true

  # The ID of one or more security groups to associate with the network
  # interface for the SMS endpoint. If none is provided, AWS will associate the
  # default security group for the VPC.
  sms_endpoint_security_group_ids = []

  # The IDs of subnets in which to create a network interface for the SMS
  # endpoint. Only a single subnet within an AZ is supported. When defined, it
  # overrides var.subnet_ids. For some regions, SMS endpoint is not supported in
  # all the AZs, so this variable helps to overcome this issue.
  sms_endpoint_subnet_ids = []

  # Tags for the SMS endpoint
  sms_endpoint_tags = {}

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  sns_endpoint_policy = null

  # Set to false if you don't want to associate a private hosted zone with the
  # specified VPC for the SNS endpoint
  sns_endpoint_private_dns_enabled = true

  # The ID of one or more security groups to associate with the network
  # interface for the SNS endpoint. If none is provided, AWS will associate the
  # default security group for the VPC.
  sns_endpoint_security_group_ids = []

  # The IDs of subnets in which to create a network interface for the SNS
  # endpoint. Only a single subnet within an AZ is supported. If omitted, only
  # subnet_ids will be used.
  sns_endpoint_subnet_ids = []

  # Tags for the SNS endpoint
  sns_endpoint_tags = {}

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  sqs_endpoint_policy = null

  # Set to false if you don't want to associate a private hosted zone with the
  # specified VPC for the SQS endpoint
  sqs_endpoint_private_dns_enabled = true

  # The ID of one or more security groups to associate with the network
  # interface for the SQS endpoint. If none is provided, AWS will associate the
  # default security group for the VPC.
  sqs_endpoint_security_group_ids = []

  # The IDs of subnets in which to create a network interface for the SQS
  # endpoint. Only a single subnet within an AZ is supported. If omitted, only
  # subnet_ids will be used.
  sqs_endpoint_subnet_ids = []

  # Tags for the SQS endpoint
  sqs_endpoint_tags = {}

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  ssm_endpoint_policy = null

  # Set to false if you don't want to associate a private hosted zone with the
  # specified VPC for the SSM Endpoint endpoint
  ssm_endpoint_private_dns_enabled = true

  # The ID of one or more security groups to associate with the network
  # interface for the SSM Endpoint endpoint. If none is provided, AWS will
  # associate the default security group for the VPC.
  ssm_endpoint_security_group_ids = []

  # The IDs of subnets in which to create a network interface for the SSM
  # Endpoint endpoint. Only a single subnet within an AZ is supported. If
  # omitted, only subnet_ids will be used.
  ssm_endpoint_subnet_ids = []

  # Tags for the SSM Endpoint endpoint
  ssm_endpoint_tags = {}

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  ssmmessages_endpoint_policy = null

  # Set to false if you don't want to associate a private hosted zone with the
  # specified VPC for the SSM Messages endpoint
  ssmmessages_endpoint_private_dns_enabled = true

  # The ID of one or more security groups to associate with the network
  # interface for the SSM Messages endpoint. If none is provided, AWS will
  # associate the default security group for the VPC.
  ssmmessages_endpoint_security_group_ids = []

  # The IDs of subnets in which to create a network interface for the SSM
  # Messages endpoint. Only a single subnet within an AZ is supported. If
  # omitted, only subnet_ids will be used.
  ssmmessages_endpoint_subnet_ids = []

  # Tags for the SSM Messages endpoint
  ssmmessages_endpoint_tags = {}

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  states_endpoint_policy = null

  # Set to false if you don't want to associate a private hosted zone with the
  # specified VPC for the Step Function endpoint
  states_endpoint_private_dns_enabled = true

  # The ID of one or more security groups to associate with the network
  # interface for the Step Function endpoint. If none is provided, AWS will
  # associate the default security group for the VPC.
  states_endpoint_security_group_ids = []

  # The IDs of subnets in which to create a network interface for the Step
  # Function endpoint. Only a single subnet within an AZ is supported. When
  # defined, it overrides var.subnet_ids. For some regions, Step Function
  # endpoint is not supported in all the AZs, so this variable helps to overcome
  # this issue.
  states_endpoint_subnet_ids = []

  # Tags for the Step Function endpoint
  states_endpoint_tags = {}

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  storagegateway_endpoint_policy = null

  # Set to false if you don't want to associate a private hosted zone with the
  # specified VPC for the Storage Gateway endpoint
  storagegateway_endpoint_private_dns_enabled = true

  # The ID of one or more security groups to associate with the network
  # interface for the Storage Gateway endpoint. If none is provided, AWS will
  # associate the default security group for the VPC.
  storagegateway_endpoint_security_group_ids = []

  # The IDs of subnets in which to create a network interface for the Storage
  # Gateway endpoint. Only a single subnet within an AZ is supported. When
  # defined, it overrides var.subnet_ids. For some regions, Storage Gateway
  # endpoint is not supported in all the AZs, so this variable helps to overcome
  # this issue.
  storagegateway_endpoint_subnet_ids = []

  # Tags for the Storage Gateway endpoint
  storagegateway_endpoint_tags = {}

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  sts_endpoint_policy = null

  # Set to false if you don't want to associate a private hosted zone with the
  # specified VPC for the STS endpoint
  sts_endpoint_private_dns_enabled = true

  # The ID of one or more security groups to associate with the network
  # interface for the STS endpoint. If none is provided, AWS will associate the
  # default security group for the VPC.
  sts_endpoint_security_group_ids = []

  # The IDs of subnets in which to create a network interface for the STS
  # endpoint. Only a single subnet within an AZ is supported. If omitted, only
  # subnet_ids will be used.
  sts_endpoint_subnet_ids = []

  # Tags for the STS endpoint
  sts_endpoint_tags = {}

  # A map of tags to apply to all endpoints.
  tags = {}

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  textract_endpoint_policy = null

  # Set to false if you don't want to associate a private hosted zone with the
  # specified VPC for the Textract endpoint
  textract_endpoint_private_dns_enabled = true

  # The ID of one or more security groups to associate with the network
  # interface for the Textract endpoint. If none is provided, AWS will associate
  # the default security group for the VPC.
  textract_endpoint_security_group_ids = []

  # The IDs of subnets in which to create a network interface for the Textract
  # endpoint. Only a single subnet within an AZ is supported. When defined, it
  # overrides var.subnet_ids. For some regions, Textract endpoint is not
  # supported in all the AZs, so this variable helps to overcome this issue.
  textract_endpoint_subnet_ids = []

  # Tags for the Textract endpoint
  textract_endpoint_tags = {}

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  transfer_endpoint_policy = null

  # Set to false if you don't want to associate a private hosted zone with the
  # specified VPC for the Transfer endpoint
  transfer_endpoint_private_dns_enabled = true

  # The ID of one or more security groups to associate with the network
  # interface for the Transfer endpoint. If none is provided, AWS will associate
  # the default security group for the VPC.
  transfer_endpoint_security_group_ids = []

  # The IDs of subnets in which to create a network interface for the Transfer
  # endpoint. Only a single subnet within an AZ is supported. When defined, it
  # overrides var.subnet_ids. For some regions, Transfer endpoint is not
  # supported in all the AZs, so this variable helps to overcome this issue.
  transfer_endpoint_subnet_ids = []

  # Tags for the Transfer endpoint
  transfer_endpoint_tags = {}

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  transferserver_endpoint_policy = null

  # Set to false if you don't want to associate a private hosted zone with the
  # specified VPC for the Transfer Server endpoint
  transferserver_endpoint_private_dns_enabled = true

  # The ID of one or more security groups to associate with the network
  # interface for the Transfer Server endpoint. If none is provided, AWS will
  # associate the default security group for the VPC.
  transferserver_endpoint_security_group_ids = []

  # The IDs of subnets in which to create a network interface for the Transfer
  # Server endpoint. Only a single subnet within an AZ is supported. When
  # defined, it overrides var.subnet_ids. For some regions, Transfer Server
  # endpoint is not supported in all the AZs, so this variable helps to overcome
  # this issue.
  transferserver_endpoint_subnet_ids = []

  # Tags for the Transfer Server endpoint
  transferserver_endpoint_tags = {}

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  vpc_lattice_endpoint_policy = null

  # Set to false if you don't want to associate a private hosted zone with the
  # specified VPC for the VPC lattice endpoint.
  vpc_lattice_endpoint_private_dns_enabled = true

  # The ID of one or more security groups to associate with the network
  # interface for the VPC lattice endpoint. If none is provided, AWS will
  # associate the default security group for the VPC.
  vpc_lattice_endpoint_security_group_ids = []

  # The IDs of subnets in which to create a network interface for the VPC
  # lattice endpoint. Only a single subnet within an AZ is supported. If
  # omitted, only subnet_ids will be used.
  vpc_lattice_endpoint_subnet_ids = []

  # Tags for the VPC lattice endpoint
  vpc_lattice_endpoint_tags = {}

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  workspaces_endpoint_policy = null

  # Set to false if you don't want to associate a private hosted zone with the
  # specified VPC for the Workspaces endpoint
  workspaces_endpoint_private_dns_enabled = true

  # The ID of one or more security groups to associate with the network
  # interface for the Workspaces endpoint. If none is provided, AWS will
  # associate the default security group for the VPC.
  workspaces_endpoint_security_group_ids = []

  # The IDs of subnets in which to create a network interface for the Workspaces
  # endpoint. Only a single subnet within an AZ is supported. When defined, it
  # overrides var.subnet_ids. For some regions, Workspaces endpoint is not
  # supported in all the AZs, so this variable helps to overcome this issue.
  workspaces_endpoint_subnet_ids = []

  # Tags for the Workspaces endpoint
  workspaces_endpoint_tags = {}

}


```

</TabItem>
</Tabs>




## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Required

<HclListItem name="subnet_ids" requirement="required" type="list(string)">
<HclListItemDescription>

A list of IDs of the subnets for all endpoints. Each endpoint will create one ENI (Elastic Network Interface) per subnet.

</HclListItemDescription>
</HclListItem>

<HclListItem name="vpc_id" requirement="required" type="string">
<HclListItemDescription>

The ID of the VPC for all modules

</HclListItemDescription>
</HclListItem>

### Optional

<HclListItem name="access_analyzer_endpoint_policy" requirement="optional" type="string">
<HclListItemDescription>

IAM policy to restrict what resources can call this endpoint. For example, you can add an IAM policy that allows EC2 instances to talk to this endpoint but no other types of resources. If not specified, all resources will be allowed to call this endpoint.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="access_analyzer_endpoint_private_dns_enabled" requirement="optional" type="bool">
<HclListItemDescription>

Set to false if you don't want to associate a private hosted zone with the specified VPC for the Access Analyzer endpoint

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="access_analyzer_endpoint_security_group_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The ID of one or more security groups to associate with the network interface for the Access Analyzer endpoint. If none is provided, AWS will associate the default security group for the VPC.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="access_analyzer_endpoint_subnet_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The IDs of subnets in which to create a network interface for the Access Analyzer endpoint. Only a single subnet within an AZ is supported. When defined, it overrides <a href="#subnet_ids"><code>subnet_ids</code></a>. For some regions, Access Analyzer endpoint is not supported in all the AZs, so this variable helps to overcome this issue.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="access_analyzer_endpoint_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

Tags for the Access Analyzer endpoint

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="acm_pca_endpoint_policy" requirement="optional" type="string">
<HclListItemDescription>

IAM policy to restrict what resources can call this endpoint. For example, you can add an IAM policy that allows EC2 instances to talk to this endpoint but no other types of resources. If not specified, all resources will be allowed to call this endpoint.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="acm_pca_endpoint_private_dns_enabled" requirement="optional" type="bool">
<HclListItemDescription>

Set to false if you don't want to associate a private hosted zone with the specified VPC for the ACM PCA endpoint

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="acm_pca_endpoint_security_group_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The ID of one or more security groups to associate with the network interface for the ACM PCA endpoint. If none is provided, AWS will associate the default security group for the VPC.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="acm_pca_endpoint_subnet_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The IDs of subnets in which to create a network interface for the ACM PCA endpoint. Only a single subnet within an AZ is supported. When defined, it overrides <a href="#subnet_ids"><code>subnet_ids</code></a>. For some regions, ACM PCA endpoint is not supported in all the AZs, so this variable helps to overcome this issue.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="acm_pca_endpoint_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

Tags for the ACM PCA endpoint

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="api_gateway_endpoint_policy" requirement="optional" type="string">
<HclListItemDescription>

IAM policy to restrict what resources can call this endpoint. For example, you can add an IAM policy that allows EC2 instances to talk to this endpoint but no other types of resources. If not specified, all resources will be allowed to call this endpoint.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="api_gateway_endpoint_private_dns_enabled" requirement="optional" type="bool">
<HclListItemDescription>

Set to false if you don't want to associate a private hosted zone with the specified VPC for the API Gateway endpoint

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="api_gateway_endpoint_security_group_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The ID of one or more security groups to associate with the network interface for the API Gateway endpoint. If none is provided, AWS will associate the default security group for the VPC.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="api_gateway_endpoint_subnet_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The IDs of subnets in which to create a network interface for the API Gateway endpoint. Only a single subnet within an AZ is supported. If omitted, only subnet_ids will be used.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="api_gateway_endpoint_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

Tags for the API Gateway endpoint

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="appmesh_envoy_management_endpoint_policy" requirement="optional" type="string">
<HclListItemDescription>

IAM policy to restrict what resources can call this endpoint. For example, you can add an IAM policy that allows EC2 instances to talk to this endpoint but no other types of resources. If not specified, all resources will be allowed to call this endpoint.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="appmesh_envoy_management_endpoint_private_dns_enabled" requirement="optional" type="bool">
<HclListItemDescription>

Set to false if you don't want to associate a private hosted zone with the specified VPC for the AppMesh endpoint

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="appmesh_envoy_management_endpoint_security_group_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The ID of one or more security groups to associate with the network interface for the AppMesh endpoint. If none is provided, AWS will associate the default security group for the VPC.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="appmesh_envoy_management_endpoint_subnet_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The IDs of subnets in which to create a network interface for the AppMesh endpoint. Only a single subnet within an AZ is supported. When defined, it overrides <a href="#subnet_ids"><code>subnet_ids</code></a>. For some regions, AppMesh endpoint is not supported in all the AZs, so this variable helps to overcome this issue.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="appmesh_envoy_management_endpoint_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

Tags for the AppMesh endpoint

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="appstream_api_endpoint_policy" requirement="optional" type="string">
<HclListItemDescription>

IAM policy to restrict what resources can call this endpoint. For example, you can add an IAM policy that allows EC2 instances to talk to this endpoint but no other types of resources. If not specified, all resources will be allowed to call this endpoint.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="appstream_api_endpoint_private_dns_enabled" requirement="optional" type="bool">
<HclListItemDescription>

Set to false if you don't want to associate a private hosted zone with the specified VPC for the AppStream API endpoint

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="appstream_api_endpoint_security_group_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The ID of one or more security groups to associate with the network interface for the AppStream API endpoint. If none is provided, AWS will associate the default security group for the VPC.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="appstream_api_endpoint_subnet_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The IDs of subnets in which to create a network interface for the AppStream API endpoint. Only a single subnet within an AZ is supported. When defined, it overrides <a href="#subnet_ids"><code>subnet_ids</code></a>. For some regions, AppStream API endpoint is not supported in all the AZs, so this variable helps to overcome this issue.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="appstream_api_endpoint_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

Tags for the AppStream API endpoint

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="appstream_streaming_endpoint_policy" requirement="optional" type="string">
<HclListItemDescription>

IAM policy to restrict what resources can call this endpoint. For example, you can add an IAM policy that allows EC2 instances to talk to this endpoint but no other types of resources. If not specified, all resources will be allowed to call this endpoint.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="appstream_streaming_endpoint_private_dns_enabled" requirement="optional" type="bool">
<HclListItemDescription>

Set to false if you don't want to associate a private hosted zone with the specified VPC for the AppStream STREAMING endpoint

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="appstream_streaming_endpoint_security_group_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The ID of one or more security groups to associate with the network interface for the AppStream STREAMING endpoint. If none is provided, AWS will associate the default security group for the VPC.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="appstream_streaming_endpoint_subnet_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The IDs of subnets in which to create a network interface for the AppStream STREAMING endpoint. Only a single subnet within an AZ is supported. When defined, it overrides <a href="#subnet_ids"><code>subnet_ids</code></a>. For some regions, AppStream STREAMING endpoint is not supported in all the AZs, so this variable helps to overcome this issue.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="appstream_streaming_endpoint_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

Tags for the AppStream STREAMING endpoint

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="athena_endpoint_policy" requirement="optional" type="string">
<HclListItemDescription>

IAM policy to restrict what resources can call this endpoint. For example, you can add an IAM policy that allows EC2 instances to talk to this endpoint but no other types of resources. If not specified, all resources will be allowed to call this endpoint.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="athena_endpoint_private_dns_enabled" requirement="optional" type="bool">
<HclListItemDescription>

Set to false if you don't want to associate a private hosted zone with the specified VPC for the Athena endpoint

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="athena_endpoint_security_group_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The ID of one or more security groups to associate with the network interface for the Athena endpoint. If none is provided, AWS will associate the default security group for the VPC.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="athena_endpoint_subnet_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The IDs of subnets in which to create a network interface for the Athena endpoint. Only a single subnet within an AZ is supported. When defined, it overrides <a href="#subnet_ids"><code>subnet_ids</code></a>. For some regions, Athena endpoint is not supported in all the AZs, so this variable helps to overcome this issue.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="athena_endpoint_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

Tags for the Athena endpoint

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="auto_scaling_plans_endpoint_policy" requirement="optional" type="string">
<HclListItemDescription>

IAM policy to restrict what resources can call this endpoint. For example, you can add an IAM policy that allows EC2 instances to talk to this endpoint but no other types of resources. If not specified, all resources will be allowed to call this endpoint.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="auto_scaling_plans_endpoint_private_dns_enabled" requirement="optional" type="bool">
<HclListItemDescription>

Set to false if you don't want to associate a private hosted zone with the specified VPC for the Auto Scaling Plans endpoint

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="auto_scaling_plans_endpoint_security_group_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The ID of one or more security groups to associate with the network interface for the Auto Scaling Plans endpoint. If none is provided, AWS will associate the default security group for the VPC.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="auto_scaling_plans_endpoint_subnet_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The IDs of subnets in which to create a network interface for the Auto Scaling Plans endpoint. Only a single subnet within an AZ is supported. When defined, it overrides <a href="#subnet_ids"><code>subnet_ids</code></a>. For some regions, Auto Scaling Plans endpoint is not supported in all the AZs, so this variable helps to overcome this issue.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="auto_scaling_plans_endpoint_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

Tags for the Auto Scaling Plans endpoint

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="cloud_directory_endpoint_policy" requirement="optional" type="string">
<HclListItemDescription>

IAM policy to restrict what resources can call this endpoint. For example, you can add an IAM policy that allows EC2 instances to talk to this endpoint but no other types of resources. If not specified, all resources will be allowed to call this endpoint.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="cloud_directory_endpoint_private_dns_enabled" requirement="optional" type="bool">
<HclListItemDescription>

Set to false if you don't want to associate a private hosted zone with the specified VPC for the Cloud Directory endpoint

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="cloud_directory_endpoint_security_group_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The ID of one or more security groups to associate with the network interface for the Cloud Directory endpoint. If none is provided, AWS will associate the default security group for the VPC.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="cloud_directory_endpoint_subnet_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The IDs of subnets in which to create a network interface for the Cloud Directory endpoint. Only a single subnet within an AZ is supported. When defined, it overrides <a href="#subnet_ids"><code>subnet_ids</code></a>. For some regions, Cloud Directory endpoint is not supported in all the AZs, so this variable helps to overcome this issue.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="cloud_directory_endpoint_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

Tags for the Cloud Directory endpoint

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="cloudformation_endpoint_policy" requirement="optional" type="string">
<HclListItemDescription>

IAM policy to restrict what resources can call this endpoint. For example, you can add an IAM policy that allows EC2 instances to talk to this endpoint but no other types of resources. If not specified, all resources will be allowed to call this endpoint.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="cloudformation_endpoint_private_dns_enabled" requirement="optional" type="bool">
<HclListItemDescription>

Set to false if you don't want to associate a private hosted zone with the specified VPC for the Cloudformation endpoint

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="cloudformation_endpoint_security_group_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The ID of one or more security groups to associate with the network interface for the Cloudformation endpoint. If none is provided, AWS will associate the default security group for the VPC.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="cloudformation_endpoint_subnet_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The IDs of subnets in which to create a network interface for the theCloudformation endpoint. Only a single subnet within an AZ is supported. If omitted, only subnet_ids will be used.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="cloudformation_endpoint_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

Tags for the CloudFormation endpoint

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="cloudtrail_endpoint_policy" requirement="optional" type="string">
<HclListItemDescription>

IAM policy to restrict what resources can call this endpoint. For example, you can add an IAM policy that allows EC2 instances to talk to this endpoint but no other types of resources. If not specified, all resources will be allowed to call this endpoint.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="cloudtrail_endpoint_private_dns_enabled" requirement="optional" type="bool">
<HclListItemDescription>

Set to false if you don't want to associate a private hosted zone with the specified VPC for the CloudTrail endpoint

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="cloudtrail_endpoint_security_group_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The ID of one or more security groups to associate with the network interface for the CloudTrail endpoint. If none is provided, AWS will associate the default security group for the VPC.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="cloudtrail_endpoint_subnet_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The IDs of subnets in which to create a network interface for the CloudTrail endpoint. Only a single subnet within an AZ is supported. If omitted, only subnet_ids will be used.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="cloudtrail_endpoint_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

Tags for the CloudTrail endpoint

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="cloudwatch_events_endpoint_policy" requirement="optional" type="string">
<HclListItemDescription>

IAM policy to restrict what resources can call this endpoint. For example, you can add an IAM policy that allows EC2 instances to talk to this endpoint but no other types of resources. If not specified, all resources will be allowed to call this endpoint.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="cloudwatch_events_endpoint_private_dns_enabled" requirement="optional" type="bool">
<HclListItemDescription>

Set to false if you don't want to associate a private hosted zone with the specified VPC for the CloudWatch Events endpoint

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="cloudwatch_events_endpoint_security_group_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The ID of one or more security groups to associate with the network interface for the CloudWatch Events endpoint. If none is provided, AWS will associate the default security group for the VPC.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="cloudwatch_events_endpoint_subnet_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The IDs of subnets in which to create a network interface for the CloudWatch Events endpoint. Only a single subnet within an AZ is supported. If omitted, only subnet_ids will be used.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="cloudwatch_events_endpoint_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

Tags for the CloudWatch Events endpoint

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="cloudwatch_logs_endpoint_policy" requirement="optional" type="string">
<HclListItemDescription>

IAM policy to restrict what resources can call this endpoint. For example, you can add an IAM policy that allows EC2 instances to talk to this endpoint but no other types of resources. If not specified, all resources will be allowed to call this endpoint.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="cloudwatch_logs_endpoint_private_dns_enabled" requirement="optional" type="bool">
<HclListItemDescription>

Set to false if you don't want to associate a private hosted zone with the specified VPC for the CloudWatch Logs endpoint

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="cloudwatch_logs_endpoint_security_group_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The ID of one or more security groups to associate with the network interface for the CloudWatch Logs endpoint. If none is provided, AWS will associate the default security group for the VPC.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="cloudwatch_logs_endpoint_subnet_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The IDs of subnets in which to create a network interface for the CloudWatch Logs endpoint. Only a single subnet within an AZ is supported. If omitted, only subnet_ids will be used.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="cloudwatch_logs_endpoint_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

Tags for the CloudWatch Logs endpoint

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="cloudwatch_monitoring_endpoint_policy" requirement="optional" type="string">
<HclListItemDescription>

IAM policy to restrict what resources can call this endpoint. For example, you can add an IAM policy that allows EC2 instances to talk to this endpoint but no other types of resources. If not specified, all resources will be allowed to call this endpoint.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="cloudwatch_monitoring_endpoint_private_dns_enabled" requirement="optional" type="bool">
<HclListItemDescription>

Set to false if you don't want to associate a private hosted zone with the specified VPC for the CloudWatch Monitoring endpoint

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="cloudwatch_monitoring_endpoint_security_group_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The ID of one or more security groups to associate with the network interface for the CloudWatch Monitoring endpoint. If none is provided, AWS will associate the default security group for the VPC.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="cloudwatch_monitoring_endpoint_subnet_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The IDs of subnets in which to create a network interface for the CloudWatch Monitoring endpoint. Only a single subnet within an AZ is supported. If omitted, only subnet_ids will be used.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="cloudwatch_monitoring_endpoint_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

Tags for the CloudWatch Monitoring endpoint

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="codeartifact_api_endpoint_policy" requirement="optional" type="string">
<HclListItemDescription>

IAM policy to restrict what resources can call this endpoint. For example, you can add an IAM policy that allows EC2 instances to talk to this endpoint but no other types of resources. If not specified, all resources will be allowed to call this endpoint.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="codeartifact_api_endpoint_private_dns_enabled" requirement="optional" type="bool">
<HclListItemDescription>

Set to false if you don't want to associate a private hosted zone with the specified VPC for the CodeArtifact API endpoint

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="codeartifact_api_endpoint_security_group_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The ID of one or more security groups to associate with the network interface for the Codeartifact API endpoint. If none is provided, AWS will associate the default security group for the VPC.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="codeartifact_api_endpoint_subnet_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The IDs of subnets in which to create a network interface for the Codeartifact API endpoint. Only a single subnet within an AZ is supported. When defined, it overrides <a href="#subnet_ids"><code>subnet_ids</code></a>. For some regions, Codeartifact API endpoint is not supported in all the AZs, so this variable helps to overcome this issue.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="codeartifact_api_endpoint_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

Tags for the CodeArtifact API endpoint

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="codeartifact_repositories_endpoint_policy" requirement="optional" type="string">
<HclListItemDescription>

IAM policy to restrict what resources can call this endpoint. For example, you can add an IAM policy that allows EC2 instances to talk to this endpoint but no other types of resources. If not specified, all resources will be allowed to call this endpoint.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="codeartifact_repositories_endpoint_private_dns_enabled" requirement="optional" type="bool">
<HclListItemDescription>

Set to false if you don't want to associate a private hosted zone with the specified VPC for the Codeartifact repositories endpoint

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="codeartifact_repositories_endpoint_security_group_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The ID of one or more security groups to associate with the network interface for the Codeartifact repositories endpoint. If none is provided, AWS will associate the default security group for the VPC.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="codeartifact_repositories_endpoint_subnet_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The IDs of subnets in which to create a network interface for the Codeartifact repositories endpoint. Only a single subnet within an AZ is supported. When defined, it overrides <a href="#subnet_ids"><code>subnet_ids</code></a>. For some regions, Codeartifact repositories endpoint is not supported in all the AZs, so this variable helps to overcome this issue.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="codeartifact_repositories_endpoint_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

Tags for the CodeArtifact API endpoint

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="codebuild_endpoint_policy" requirement="optional" type="string">
<HclListItemDescription>

IAM policy to restrict what resources can call this endpoint. For example, you can add an IAM policy that allows EC2 instances to talk to this endpoint but no other types of resources. If not specified, all resources will be allowed to call this endpoint.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="codebuild_endpoint_private_dns_enabled" requirement="optional" type="bool">
<HclListItemDescription>

Set to false if you don't want to associate a private hosted zone with the specified VPC for the CodeBuild endpoint

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="codebuild_endpoint_security_group_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The ID of one or more security groups to associate with the network interface for the CodeBuild endpoint. If none is provided, AWS will associate the default security group for the VPC.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="codebuild_endpoint_subnet_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The IDs of subnets in which to create a network interface for the CodeBuild endpoint. Only a single subnet within an AZ is supported. When defined, it overrides <a href="#subnet_ids"><code>subnet_ids</code></a>. For some regions, CodeBuild endpoint is not supported in all the AZs, so this variable helps to overcome this issue.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="codebuild_endpoint_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

Tags for the CodeBuild endpoint

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="codecommit_endpoint_policy" requirement="optional" type="string">
<HclListItemDescription>

IAM policy to restrict what resources can call this endpoint. For example, you can add an IAM policy that allows EC2 instances to talk to this endpoint but no other types of resources. If not specified, all resources will be allowed to call this endpoint.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="codecommit_endpoint_private_dns_enabled" requirement="optional" type="bool">
<HclListItemDescription>

Set to false if you don't want to associate a private hosted zone with the specified VPC for the CodeCommit endpoint

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="codecommit_endpoint_security_group_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The ID of one or more security groups to associate with the network interface for the CodeCommit endpoint. If none is provided, AWS will associate the default security group for the VPC.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="codecommit_endpoint_subnet_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The IDs of subnets in which to create a network interface for the CodeCommit API endpoint. Only a single subnet within an AZ is supported. When defined, it overrides <a href="#subnet_ids"><code>subnet_ids</code></a>. For some regions, CodeCommit endpoint is not supported in all the AZs, so this variable helps to overcome this issue.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="codecommit_endpoint_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

Tags for the CodeCommit endpoint

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="codedeploy_commands_secure_endpoint_policy" requirement="optional" type="string">
<HclListItemDescription>

IAM policy to restrict what resources can call this endpoint. For example, you can add an IAM policy that allows EC2 instances to talk to this endpoint but no other types of resources. If not specified, all resources will be allowed to call this endpoint.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="codedeploy_commands_secure_endpoint_private_dns_enabled" requirement="optional" type="bool">
<HclListItemDescription>

Set to false if you don't want to associate a private hosted zone with the specified VPC for the CodeDeploy Commands Secure endpoint

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="codedeploy_commands_secure_endpoint_security_group_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The ID of one or more security groups to associate with the network interface for the CodeDeploy Commands Secure endpoint. If none is provided, AWS will associate the default security group for the VPC.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="codedeploy_commands_secure_endpoint_subnet_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The IDs of subnets in which to create a network interface for the CodeDeploy Commands Secure endpoint. Only a single subnet within an AZ is supported. When defined, it overrides <a href="#subnet_ids"><code>subnet_ids</code></a>. For some regions, CodeDeploy Commands Secure endpoint is not supported in all the AZs, so this variable helps to overcome this issue.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="codedeploy_commands_secure_endpoint_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

Tags for the CodeDeploy Commands Secure endpoint

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="codedeploy_endpoint_policy" requirement="optional" type="string">
<HclListItemDescription>

IAM policy to restrict what resources can call this endpoint. For example, you can add an IAM policy that allows EC2 instances to talk to this endpoint but no other types of resources. If not specified, all resources will be allowed to call this endpoint.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="codedeploy_endpoint_private_dns_enabled" requirement="optional" type="bool">
<HclListItemDescription>

Set to false if you don't want to associate a private hosted zone with the specified VPC for the CodeDeploy endpoint

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="codedeploy_endpoint_security_group_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The ID of one or more security groups to associate with the network interface for the CodeDeploy endpoint. If none is provided, AWS will associate the default security group for the VPC.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="codedeploy_endpoint_subnet_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The IDs of subnets in which to create a network interface for the CodeDeploy endpoint. Only a single subnet within an AZ is supported. When defined, it overrides <a href="#subnet_ids"><code>subnet_ids</code></a>. For some regions, CodeDeploy endpoint is not supported in all the AZs, so this variable helps to overcome this issue.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="codedeploy_endpoint_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

Tags for the CodeDeploy endpoint

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="codepipeline_endpoint_policy" requirement="optional" type="string">
<HclListItemDescription>

IAM policy to restrict what resources can call this endpoint. For example, you can add an IAM policy that allows EC2 instances to talk to this endpoint but no other types of resources. If not specified, all resources will be allowed to call this endpoint.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="codepipeline_endpoint_private_dns_enabled" requirement="optional" type="bool">
<HclListItemDescription>

Set to false if you don't want to associate a private hosted zone with the specified VPC for the CodePipeline endpoint

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="codepipeline_endpoint_security_group_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The ID of one or more security groups to associate with the network interface for the CodePipeline endpoint. If none is provided, AWS will associate the default security group for the VPC.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="codepipeline_endpoint_subnet_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The IDs of subnets in which to create a network interface for the CodePipeline endpoint. Only a single subnet within an AZ is supported. When defined, it overrides <a href="#subnet_ids"><code>subnet_ids</code></a>. For some regions, CodePipeline endpoint is not supported in all the AZs, so this variable helps to overcome this issue.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="codepipeline_endpoint_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

Tags for the CodePipeline endpoint

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="config_endpoint_policy" requirement="optional" type="string">
<HclListItemDescription>

IAM policy to restrict what resources can call this endpoint. For example, you can add an IAM policy that allows EC2 instances to talk to this endpoint but no other types of resources. If not specified, all resources will be allowed to call this endpoint.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="config_endpoint_private_dns_enabled" requirement="optional" type="bool">
<HclListItemDescription>

Set to false if you don't want to associate a private hosted zone with the specified VPC for the config endpoint

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="config_endpoint_security_group_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The ID of one or more security groups to associate with the network interface for the config endpoint. If none is provided, AWS will associate the default security group for the VPC.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="config_endpoint_subnet_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The IDs of subnets in which to create a network interface for the config endpoint. Only a single subnet within an AZ is supported. If omitted, only subnet_ids will be used.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="config_endpoint_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

Tags for the Config endpoint

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="create_https_security_group" requirement="optional" type="bool">
<HclListItemDescription>

If true, creates a security group that allows ingress on port 443 and applies it to all endpoints. Must set this to true or supply security_group_ids.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="datasync_endpoint_policy" requirement="optional" type="string">
<HclListItemDescription>

IAM policy to restrict what resources can call this endpoint. For example, you can add an IAM policy that allows EC2 instances to talk to this endpoint but no other types of resources. If not specified, all resources will be allowed to call this endpoint.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="datasync_endpoint_private_dns_enabled" requirement="optional" type="bool">
<HclListItemDescription>

Set to false if you don't want to associate a private hosted zone with the specified VPC for the Data Sync endpoint

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="datasync_endpoint_security_group_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The ID of one or more security groups to associate with the network interface for the Data Sync endpoint. If none is provided, AWS will associate the default security group for the VPC.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="datasync_endpoint_subnet_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The IDs of subnets in which to create a network interface for the Data Sync endpoint. Only a single subnet within an AZ is supported. When defined, it overrides <a href="#subnet_ids"><code>subnet_ids</code></a>. For some regions, Data Sync endpoint is not supported in all the AZs, so this variable helps to overcome this issue.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="datasync_endpoint_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

Tags for the Data Sync endpoint

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="ebs_endpoint_policy" requirement="optional" type="string">
<HclListItemDescription>

IAM policy to restrict what resources can call this endpoint. For example, you can add an IAM policy that allows EC2 instances to talk to this endpoint but no other types of resources. If not specified, all resources will be allowed to call this endpoint.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="ebs_endpoint_private_dns_enabled" requirement="optional" type="bool">
<HclListItemDescription>

Set to false if you don't want to associate a private hosted zone with the specified VPC for the EBS endpoint.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="ebs_endpoint_security_group_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The ID of one or more security groups to associate with the network interface for the EBS endpoint. If none is provided, AWS will associate the default security group for the VPC.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="ebs_endpoint_subnet_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The IDs of subnets in which to create a network interface for the EBS endpoint. Only a single subnet within an AZ is supported. If omitted, only subnet_ids will be used.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="ebs_endpoint_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

Tags for the EBS endpoint

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="ec2_autoscaling_endpoint_policy" requirement="optional" type="string">
<HclListItemDescription>

IAM policy to restrict what resources can call this endpoint. For example, you can add an IAM policy that allows EC2 instances to talk to this endpoint but no other types of resources. If not specified, all resources will be allowed to call this endpoint.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="ec2_autoscaling_endpoint_private_dns_enabled" requirement="optional" type="bool">
<HclListItemDescription>

Set to false if you don't want to associate a private hosted zone with the specified VPC for the EC2-Autoscaling endpoint

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="ec2_autoscaling_endpoint_security_group_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The ID of one or more security groups to associate with the network interface for the EC2-Autoscaling endpoint. If none is provided, AWS will associate the default security group for the VPC.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="ec2_autoscaling_endpoint_subnet_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The IDs of subnets in which to create a network interface for the EC2-Autoscaling endpoint. Only a single subnet within an AZ is supported. When defined, it overrides <a href="#subnet_ids"><code>subnet_ids</code></a>. For some regions, EC2-Autoscaling endpoint is not supported in all the AZs, so this variable helps to overcome this issue.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="ec2_autoscaling_endpoint_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

Tags for the CodeArtifact API endpoint

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="ec2_endpoint_policy" requirement="optional" type="string">
<HclListItemDescription>

IAM policy to restrict what resources can call this endpoint. For example, you can add an IAM policy that allows EC2 instances to talk to this endpoint but no other types of resources. If not specified, all resources will be allowed to call this endpoint.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="ec2_endpoint_private_dns_enabled" requirement="optional" type="bool">
<HclListItemDescription>

Set to false if you don't want to associate a private hosted zone with the specified VPC for the EC2 endpoint

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="ec2_endpoint_security_group_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The ID of one or more security groups to associate with the network interface for the EC2 endpoint

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="ec2_endpoint_subnet_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The IDs of subnets in which to create a network interface for the EC2 endpoint. Only a single subnet within an AZ is supported. If omitted, only subnet_ids will be used.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="ec2_endpoint_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

Tags for the EC2 endpoint

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="ec2messages_endpoint_policy" requirement="optional" type="string">
<HclListItemDescription>

IAM policy to restrict what resources can call this endpoint. For example, you can add an IAM policy that allows EC2 instances to talk to this endpoint but no other types of resources. If not specified, all resources will be allowed to call this endpoint.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="ec2messages_endpoint_private_dns_enabled" requirement="optional" type="bool">
<HclListItemDescription>

Set to false if you don't want to associate a private hosted zone with the specified VPC for the EC2 Messages endpoint

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="ec2messages_endpoint_security_group_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The ID of one or more security groups to associate with the network interface for the EC2 Messages endpoint. If none is provided, AWS will associate the default security group for the VPC.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="ec2messages_endpoint_subnet_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The IDs of subnets in which to create a network interface for the EC2 Messages endpoint. Only a single subnet within an AZ is supported. If omitted, only subnet_ids will be used.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="ec2messages_endpoint_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

Tags for the EC2 Messages endpoint

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="ecr_api_endpoint_policy" requirement="optional" type="string">
<HclListItemDescription>

IAM policy to restrict what resources can call this endpoint. For example, you can add an IAM policy that allows EC2 instances to talk to this endpoint but no other types of resources. If not specified, all resources will be allowed to call this endpoint.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="ecr_api_endpoint_private_dns_enabled" requirement="optional" type="bool">
<HclListItemDescription>

Set to false if you don't want to associate a private hosted zone with the specified VPC for the ECR API endpoint

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="ecr_api_endpoint_security_group_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The ID of one or more security groups to associate with the network interface for the ECR API endpoint. If none is provided, AWS will associate the default security group for the VPC.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="ecr_api_endpoint_subnet_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The IDs of subnets in which to create a network interface for the ECR api endpoint. If omitted, only subnet_ids will be used.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="ecr_api_endpoint_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

Tags for the ECR API endpoint

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="ecr_dkr_endpoint_policy" requirement="optional" type="string">
<HclListItemDescription>

IAM policy to restrict what resources can call this endpoint. For example, you can add an IAM policy that allows EC2 instances to talk to this endpoint but no other types of resources. If not specified, all resources will be allowed to call this endpoint.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="ecr_dkr_endpoint_private_dns_enabled" requirement="optional" type="bool">
<HclListItemDescription>

Set to false if you don't want to associate a private hosted zone with the specified VPC for ECR DKR endpoint

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="ecr_dkr_endpoint_security_group_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The ID of one or more security groups to associate with the network interface for the ECR DKR endpoint. If none is provided, AWS will associate the default security group for the VPC.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="ecr_dkr_endpoint_subnet_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The IDs of subnets in which to create a network interface for the ECR dkr endpoint. If omitted, only subnet_ids will be used.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="ecr_dkr_endpoint_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

Tags for the ECR DKR endpoint

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="ecs_agent_endpoint_policy" requirement="optional" type="string">
<HclListItemDescription>

IAM policy to restrict what resources can call this endpoint. For example, you can add an IAM policy that allows EC2 instances to talk to this endpoint but no other types of resources. If not specified, all resources will be allowed to call this endpoint.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="ecs_agent_endpoint_private_dns_enabled" requirement="optional" type="bool">
<HclListItemDescription>

Set to false if you don't want to associate a private hosted zone with the specified VPC for the ECS Agent endpoint

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="ecs_agent_endpoint_security_group_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The ID of one or more security groups to associate with the network interface for the ECS Agent endpoint. If none is provided, AWS will associate the default security group for the VPC.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="ecs_agent_endpoint_subnet_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The IDs of subnets in which to create a network interface for the ECS Agent endpoint. Only a single subnet within an AZ is supported. If omitted, only subnet_ids will be used.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="ecs_agent_endpoint_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

Tags for the ECS Agent endpoint

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="ecs_endpoint_policy" requirement="optional" type="string">
<HclListItemDescription>

IAM policy to restrict what resources can call this endpoint. For example, you can add an IAM policy that allows EC2 instances to talk to this endpoint but no other types of resources. If not specified, all resources will be allowed to call this endpoint.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="ecs_endpoint_private_dns_enabled" requirement="optional" type="bool">
<HclListItemDescription>

Set to false if you don't want to associate a private hosted zone with the specified VPC for the ECS endpoint

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="ecs_endpoint_security_group_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The ID of one or more security groups to associate with the network interface for the ECS endpoint. If none is provided, AWS will associate the default security group for the VPC.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="ecs_endpoint_subnet_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The IDs of subnets in which to create a network interface for the ECS endpoint. Only a single subnet within an AZ is supported. If omitted, only subnet_ids will be used.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="ecs_endpoint_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

Tags for the ECS endpoint

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="ecs_telemetry_endpoint_policy" requirement="optional" type="string">
<HclListItemDescription>

IAM policy to restrict what resources can call this endpoint. For example, you can add an IAM policy that allows EC2 instances to talk to this endpoint but no other types of resources. If not specified, all resources will be allowed to call this endpoint.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="ecs_telemetry_endpoint_private_dns_enabled" requirement="optional" type="bool">
<HclListItemDescription>

Set to false if you don't want to associate a private hosted zone with the specified VPC for the ECS Telemetry endpoint

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="ecs_telemetry_endpoint_security_group_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The ID of one or more security groups to associate with the network interface for the ECS Telemetry endpoint. If none is provided, AWS will associate the default security group for the VPC.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="ecs_telemetry_endpoint_subnet_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The IDs of subnets in which to create a network interface for the ECS Telemetry endpoint. Only a single subnet within an AZ is supported. If omitted, only subnet_ids will be used.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="ecs_telemetry_endpoint_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

Tags for the ECS Telemetry endpoint

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="efs_endpoint_policy" requirement="optional" type="string">
<HclListItemDescription>

IAM policy to restrict what resources can call this endpoint. For example, you can add an IAM policy that allows EC2 instances to talk to this endpoint but no other types of resources. If not specified, all resources will be allowed to call this endpoint.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="efs_endpoint_private_dns_enabled" requirement="optional" type="bool">
<HclListItemDescription>

Set to false if you don't want to associate a private hosted zone with the specified VPC for the EFS endpoint.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="efs_endpoint_security_group_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The ID of one or more security groups to associate with the network interface for the EFS endpoint. If none is provided, AWS will associate the default security group for the VPC.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="efs_endpoint_subnet_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The IDs of subnets in which to create a network interface for the EFS endpoint. Only a single subnet within an AZ is supported. If omitted, only subnet_ids will be used.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="efs_endpoint_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

Tags for the EFS endpoint

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="elastic_inference_runtime_endpoint_policy" requirement="optional" type="string">
<HclListItemDescription>

IAM policy to restrict what resources can call this endpoint. For example, you can add an IAM policy that allows EC2 instances to talk to this endpoint but no other types of resources. If not specified, all resources will be allowed to call this endpoint.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="elastic_inference_runtime_endpoint_private_dns_enabled" requirement="optional" type="bool">
<HclListItemDescription>

Set to false if you don't want to associate a private hosted zone with the specified VPC for the Elastic Inference Runtime endpoint

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="elastic_inference_runtime_endpoint_security_group_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The ID of one or more security groups to associate with the network interface for the Elastic Inference Runtime endpoint. If none is provided, AWS will associate the default security group for the VPC.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="elastic_inference_runtime_endpoint_subnet_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The IDs of subnets in which to create a network interface for the Elastic Inference Runtime endpoint. Only a single subnet within an AZ is supported. When defined, it overrides <a href="#subnet_ids"><code>subnet_ids</code></a>. For some regions, Elastic Inference Runtime endpoint is not supported in all the AZs, so this variable helps to overcome this issue.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="elastic_inference_runtime_endpoint_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

Tags for the Elastic Inference Runtime endpoint

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="elasticache_endpoint_policy" requirement="optional" type="string">
<HclListItemDescription>

IAM policy to restrict what resources can call this endpoint. For example, you can add an IAM policy that allows EC2 instances to talk to this endpoint but no other types of resources. If not specified, all resources will be allowed to call this endpoint.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="elasticache_endpoint_private_dns_enabled" requirement="optional" type="bool">
<HclListItemDescription>

Set to false if you don't want to associate a private hosted zone with the specified VPC for the ElastiCache endpoint.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="elasticache_endpoint_security_group_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The ID of one or more security groups to associate with the network interface for the Elasticache endpoint. If none is provided, AWS will associate the default security group for the VPC.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="elasticache_endpoint_subnet_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The IDs of subnets in which to create a network interface for the Elasticache endpoint. Only a single subnet within an AZ is supported. If omitted, only subnet_ids will be used.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="elasticache_endpoint_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

Tags for the Elasticache endpoint

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="elasticbeanstalk_endpoint_policy" requirement="optional" type="string">
<HclListItemDescription>

IAM policy to restrict what resources can call this endpoint. For example, you can add an IAM policy that allows EC2 instances to talk to this endpoint but no other types of resources. If not specified, all resources will be allowed to call this endpoint.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="elasticbeanstalk_endpoint_private_dns_enabled" requirement="optional" type="bool">
<HclListItemDescription>

Set to false if you don't want to associate a private hosted zone with the specified VPC for the Elastic Beanstalk endpoint

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="elasticbeanstalk_endpoint_security_group_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The ID of one or more security groups to associate with the network interface for the Elastic Beanstalk endpoint. If none is provided, AWS will associate the default security group for the VPC.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="elasticbeanstalk_endpoint_subnet_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The IDs of subnets in which to create a network interface for the Elastic Beanstalk endpoint. Only a single subnet within an AZ is supported. When defined, it overrides <a href="#subnet_ids"><code>subnet_ids</code></a>. For some regions, Elastic Beanstalk endpoint is not supported in all the AZs, so this variable helps to overcome this issue.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="elasticbeanstalk_endpoint_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

Tags for the Elastic Beanstalk endpoint

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="elasticbeanstalk_health_endpoint_policy" requirement="optional" type="string">
<HclListItemDescription>

IAM policy to restrict what resources can call this endpoint. For example, you can add an IAM policy that allows EC2 instances to talk to this endpoint but no other types of resources. If not specified, all resources will be allowed to call this endpoint.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="elasticbeanstalk_health_endpoint_private_dns_enabled" requirement="optional" type="bool">
<HclListItemDescription>

Set to false if you don't want to associate a private hosted zone with the specified VPC for the Elastic Beanstalk Health endpoint

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="elasticbeanstalk_health_endpoint_security_group_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The ID of one or more security groups to associate with the network interface for the Elastic Beanstalk Health endpoint. If none is provided, AWS will associate the default security group for the VPC.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="elasticbeanstalk_health_endpoint_subnet_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The IDs of subnets in which to create a network interface for the Elastic Beanstalk Health endpoint. Only a single subnet within an AZ is supported. When defined, it overrides <a href="#subnet_ids"><code>subnet_ids</code></a>. For some regions, Elastic Beanstalk Health endpoint is not supported in all the AZs, so this variable helps to overcome this issue.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="elasticbeanstalk_health_endpoint_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

Tags for the Elastic Beanstalk Health endpoint

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="elb_endpoint_policy" requirement="optional" type="string">
<HclListItemDescription>

IAM policy to restrict what resources can call this endpoint. For example, you can add an IAM policy that allows EC2 instances to talk to this endpoint but no other types of resources. If not specified, all resources will be allowed to call this endpoint.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="elb_endpoint_private_dns_enabled" requirement="optional" type="bool">
<HclListItemDescription>

Set to false if you don't want to associate a private hosted zone with the specified VPC for the Elastic Load Balancing endpoint

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="elb_endpoint_security_group_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The ID of one or more security groups to associate with the network interface for the Elastic Load Balancing endpoint. If none is provided, AWS will associate the default security group for the VPC.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="elb_endpoint_subnet_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The IDs of subnets in which to create a network interface for the Elastic Load Balancing endpoint. Only a single subnet within an AZ is supported. If omitted, only subnet_ids will be used.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="elb_endpoint_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

Tags for the Elastic Load Balancing endpoint

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="emr_endpoint_policy" requirement="optional" type="string">
<HclListItemDescription>

IAM policy to restrict what resources can call this endpoint. For example, you can add an IAM policy that allows EC2 instances to talk to this endpoint but no other types of resources. If not specified, all resources will be allowed to call this endpoint.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="emr_endpoint_private_dns_enabled" requirement="optional" type="bool">
<HclListItemDescription>

Set to false if you don't want to associate a private hosted zone with the specified VPC for the EMR endpoint

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="emr_endpoint_security_group_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The ID of one or more security groups to associate with the network interface for the EMR endpoint. If none is provided, AWS will associate the default security group for the VPC.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="emr_endpoint_subnet_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The IDs of subnets in which to create a network interface for the EMR endpoint. Only a single subnet within an AZ is supported. When defined, it overrides <a href="#subnet_ids"><code>subnet_ids</code></a>. For some regions, EMR endpoint is not supported in all the AZs, so this variable helps to overcome this issue.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="emr_endpoint_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

Tags for the EMR endpoint

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="enable_access_analyzer_endpoint" requirement="optional" type="bool">
<HclListItemDescription>

Set to true if you want to provision a Access Analyzer Endpoint within the VPC

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="enable_acm_pca_endpoint" requirement="optional" type="bool">
<HclListItemDescription>

Set to true if you want to provision a ACM PCA Endpoint within the VPC

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="enable_api_gateway_endpoint" requirement="optional" type="bool">
<HclListItemDescription>

Set to true if you want to provision an API Gateway within the VPC

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="enable_appmesh_envoy_management_endpoint" requirement="optional" type="bool">
<HclListItemDescription>

Set to true if you want to provision a AppMesh Endpoint within the VPC

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="enable_appstream_api_endpoint" requirement="optional" type="bool">
<HclListItemDescription>

Set to true if you want to provision a AppStream API Endpoint within the VPC

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="enable_appstream_streaming_endpoint" requirement="optional" type="bool">
<HclListItemDescription>

Set to true if you want to provision a AppStream STREAMING Endpoint within the VPC

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="enable_athena_endpoint" requirement="optional" type="bool">
<HclListItemDescription>

Set to true if you want to provision a Athena Endpoint within the VPC

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="enable_auto_scaling_plans_endpoint" requirement="optional" type="bool">
<HclListItemDescription>

Set to true if you want to provision a Auto Scaling Plans Endpoint within the VPC

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="enable_cloud_directory_endpoint" requirement="optional" type="bool">
<HclListItemDescription>

Set to true if you want to provision a Cloud Directory Endpoint within the VPC

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="enable_cloudformation_endpoint" requirement="optional" type="bool">
<HclListItemDescription>

Set to true if you want to provision a Cloudformation within the VPC

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="enable_cloudtrail_endpoint" requirement="optional" type="bool">
<HclListItemDescription>

Set to true if you want to provision a CloudTrail within the VPC

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="enable_cloudwatch_events_endpoint" requirement="optional" type="bool">
<HclListItemDescription>

Set to true if you want to provision a CloudWatch Events within the VPC

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="enable_cloudwatch_logs_endpoint" requirement="optional" type="bool">
<HclListItemDescription>

Set to true if you want to provision a CloudWatch Logs within the VPC

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="enable_codeartifact_api_endpoint" requirement="optional" type="bool">
<HclListItemDescription>

Set to true if you want to provision a Codeartifact API Endpoint within the VPC

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="enable_codeartifact_repositories_endpoint" requirement="optional" type="bool">
<HclListItemDescription>

Set to true if you want to provision a Codeartifact repositories Endpoint within the VPC

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="enable_codebuild_endpoint" requirement="optional" type="bool">
<HclListItemDescription>

Set to true if you want to provision a CodeBuild Endpoint within the VPC

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="enable_codecommit_endpoint" requirement="optional" type="bool">
<HclListItemDescription>

Set to true if you want to provision a CodeCommit Endpoint within the VPC

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="enable_codedeploy_commands_secure_endpoint" requirement="optional" type="bool">
<HclListItemDescription>

Set to true if you want to provision a CodeDeploy Commands Secure Endpoint within the VPC

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="enable_codedeploy_endpoint" requirement="optional" type="bool">
<HclListItemDescription>

Set to true if you want to provision a CodeDeploy Endpoint within the VPC

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="enable_codepipeline_endpoint" requirement="optional" type="bool">
<HclListItemDescription>

Set to true if you want to provision a CodePipeline Endpoint within the VPC

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="enable_config_endpoint" requirement="optional" type="bool">
<HclListItemDescription>

Set to true if you want to provision a config within the VPC

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="enable_datasync_endpoint" requirement="optional" type="bool">
<HclListItemDescription>

Set to true if you want to provision a Data Sync Endpoint within the VPC

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="enable_ebs_endpoint" requirement="optional" type="bool">
<HclListItemDescription>

Set to true if you want to provision a EBS endpoint within the VPC.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="enable_ec2_autoscaling_endpoint" requirement="optional" type="bool">
<HclListItemDescription>

Set to true if you want to provision a EC2-Autoscaling Endpoint within the VPC

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="enable_ec2_endpoint" requirement="optional" type="bool">
<HclListItemDescription>

Set to true if you want to provision an EC2 within the VPC

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="enable_ec2messages_endpoint" requirement="optional" type="bool">
<HclListItemDescription>

Set to true if you want to provision an EC2 Messages endpoint within the VPC

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="enable_ecr_api_endpoint" requirement="optional" type="bool">
<HclListItemDescription>

Set to true if you want to provision an ECR API within the VPC

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="enable_ecr_dkr_endpoint" requirement="optional" type="bool">
<HclListItemDescription>

Set to true if you want to provision an ECR DKR within the VPC

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="enable_ecs_agent_endpoint" requirement="optional" type="bool">
<HclListItemDescription>

Set to true if you want to provision an ECS Agent within the VPC

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="enable_ecs_endpoint" requirement="optional" type="bool">
<HclListItemDescription>

Set to true if you want to provision an ECS within the VPC

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="enable_ecs_telemetry_endpoint" requirement="optional" type="bool">
<HclListItemDescription>

Set to true if you want to provision an ECS Agent within the VPC

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="enable_efs_endpoint" requirement="optional" type="bool">
<HclListItemDescription>

Set to true if you want to provision a EFS endpoint within the VPC.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="enable_elastic_inference_runtime_endpoint" requirement="optional" type="bool">
<HclListItemDescription>

Set to true if you want to provision a Elastic Inference Runtime Endpoint within the VPC

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="enable_elasticache_endpoint" requirement="optional" type="bool">
<HclListItemDescription>

Set to true if you want to provision Elasticache endpoint within the VPC.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="enable_elasticbeanstalk_endpoint" requirement="optional" type="bool">
<HclListItemDescription>

Set to true if you want to provision a Elastic Beanstalk Endpoint within the VPC

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="enable_elasticbeanstalk_health_endpoint" requirement="optional" type="bool">
<HclListItemDescription>

Set to true if you want to provision a Elastic Beanstalk Health Endpoint within the VPC

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="enable_elb_endpoint" requirement="optional" type="bool">
<HclListItemDescription>

Set to true if you want to provision an Elastic Load Balancing within the VPC

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="enable_emr_endpoint" requirement="optional" type="bool">
<HclListItemDescription>

Set to true if you want to provision a EMR Endpoint within the VPC

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="enable_git_codecommit_endpoint" requirement="optional" type="bool">
<HclListItemDescription>

Set to true if you want to provision a Git CodeCommit Endpoint within the VPC

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="enable_glue_endpoint" requirement="optional" type="bool">
<HclListItemDescription>

Set to true if you want to provision a Glue endpoint within the VPC.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="enable_kinesis_firehose_endpoint" requirement="optional" type="bool">
<HclListItemDescription>

Set to true if you want to provision a KINESIS Firehose Endpoint within the VPC

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="enable_kinesis_streams_endpoint" requirement="optional" type="bool">
<HclListItemDescription>

Set to true if you want to provision a Kinesis Streams within the VPC

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="enable_kms_endpoint" requirement="optional" type="bool">
<HclListItemDescription>

Set to true if you want to provision a KMS within the VPC

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="enable_lambda_endpoint" requirement="optional" type="bool">
<HclListItemDescription>

Set to true if you want to provision a Lambda endpoint within the VPC.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="enable_pinpoint_endpoint" requirement="optional" type="bool">
<HclListItemDescription>

Set to true if you want to provision Pinpoint endpoint within the VPC.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="enable_qldb_session_endpoint" requirement="optional" type="bool">
<HclListItemDescription>

Set to true if you want to provision a QLDB Session Endpoint within the VPC

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="enable_rds_endpoint" requirement="optional" type="bool">
<HclListItemDescription>

Set to true if you want to provision a RDS Endpoint within the VPC

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="enable_rds_fips_endpoint" requirement="optional" type="bool">
<HclListItemDescription>

Set to true if you want to provision a RDS FIPSEndpoint within the VPC

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="enable_redshift_data_endpoint" requirement="optional" type="bool">
<HclListItemDescription>

Set to true if you want to provision a Redshift within the VPC

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="enable_rekognition_endpoint" requirement="optional" type="bool">
<HclListItemDescription>

Set to true if you want to provision a Rekognition Endpoint within the VPC

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="enable_sagemaker_api_endpoint" requirement="optional" type="bool">
<HclListItemDescription>

Set to true if you want to provision a SageMaker API Endpoint within the VPC

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="enable_sagemaker_runtime_endpoint" requirement="optional" type="bool">
<HclListItemDescription>

Set to true if you want to provision a SageMaker Runtime Endpoint within the VPC

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="enable_secretsmanager_endpoint" requirement="optional" type="bool">
<HclListItemDescription>

Set to true if you want to provision a Secrets Manager within the VPC

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="enable_secretsmanager_fips_endpoint" requirement="optional" type="bool">
<HclListItemDescription>

Set to true if you want to provision a FIPS Secrets Manager within the VPC

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="enable_servicecatalog_endpoint" requirement="optional" type="bool">
<HclListItemDescription>

Set to true if you want to provision a Service Catalog Endpoint within the VPC

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="enable_ses_endpoint" requirement="optional" type="bool">
<HclListItemDescription>

Set to true if you want to provision a Simple Email Service within the VPC

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="enable_sms_endpoint" requirement="optional" type="bool">
<HclListItemDescription>

Set to true if you want to provision a SMS Endpoint within the VPC

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="enable_sns_endpoint" requirement="optional" type="bool">
<HclListItemDescription>

Set to true if you want to provision a SNS within the VPC

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="enable_sqs_endpoint" requirement="optional" type="bool">
<HclListItemDescription>

Set to true if you want to provision a SQS within the VPC

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="enable_ssm_endpoint" requirement="optional" type="bool">
<HclListItemDescription>

Set to true if you want to provision an SSM endpoint within the VPC

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="enable_ssmmessages_endpoint" requirement="optional" type="bool">
<HclListItemDescription>

Set to true if you want to provision an SSM Messages endpoint within the VPC

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="enable_states_endpoint" requirement="optional" type="bool">
<HclListItemDescription>

Set to true if you want to provision a Step Function Endpoint within the VPC

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="enable_storagegateway_endpoint" requirement="optional" type="bool">
<HclListItemDescription>

Set to true if you want to provision a Storage Gateway Endpoint within the VPC

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="enable_sts_endpoint" requirement="optional" type="bool">
<HclListItemDescription>

Set to true if you want to provision a STS within the VPC

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="enable_textract_endpoint" requirement="optional" type="bool">
<HclListItemDescription>

Set to true if you want to provision a Textract Endpoint within the VPC

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="enable_transfer_endpoint" requirement="optional" type="bool">
<HclListItemDescription>

Set to true if you want to provision a Transfer Endpoint within the VPC

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="enable_transferserver_endpoint" requirement="optional" type="bool">
<HclListItemDescription>

Set to true if you want to provision a Transfer Server Endpoint within the VPC

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="enable_vpc_cloudwatch_monitoring_endpoint" requirement="optional" type="bool">
<HclListItemDescription>

Set to true if you want to provision a CloudWatch Monitoring within the VPC

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="enable_vpc_lattice_endpoint" requirement="optional" type="bool">
<HclListItemDescription>

Set to true if you want to provision a VPC lattice endpoint within the VPC.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="enable_workspaces_endpoint" requirement="optional" type="bool">
<HclListItemDescription>

Set to true if you want to provision a Workspaces Endpoint within the VPC

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="git_codecommit_endpoint_policy" requirement="optional" type="string">
<HclListItemDescription>

IAM policy to restrict what resources can call this endpoint. For example, you can add an IAM policy that allows EC2 instances to talk to this endpoint but no other types of resources. If not specified, all resources will be allowed to call this endpoint.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="git_codecommit_endpoint_private_dns_enabled" requirement="optional" type="bool">
<HclListItemDescription>

Set to false if you don't want to associate a private hosted zone with the specified VPC for the Git CodeCommit API endpoint

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="git_codecommit_endpoint_security_group_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The ID of one or more security groups to associate with the network interface for the Git CodeCommit endpoint. If none is provided, AWS will associate the default security group for the VPC.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="git_codecommit_endpoint_subnet_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The IDs of subnets in which to create a network interface for the Git CodeCommit API endpoint. Only a single subnet within an AZ is supported. When defined, it overrides <a href="#subnet_ids"><code>subnet_ids</code></a>. For some regions, Git CodeCommit endpoint is not supported in all the AZs, so this variable helps to overcome this issue.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="git_codecommit_endpoint_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

Tags for the Git CodeCommit endpoint

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="glue_endpoint_policy" requirement="optional" type="string">
<HclListItemDescription>

IAM policy to restrict what resources can call this endpoint. For example, you can add an IAM policy that allows EC2 instances to talk to this endpoint but no other types of resources. If not specified, all resources will be allowed to call this endpoint.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="glue_endpoint_private_dns_enabled" requirement="optional" type="bool">
<HclListItemDescription>

Set to false if you don't want to associate a private hosted zone with the specified VPC for the Glue endpoint.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="glue_endpoint_security_group_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The ID of one or more security groups to associate with the network interface for the glue endpoint. If none is provided, AWS will associate the default security group for the VPC.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="glue_endpoint_subnet_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The IDs of subnets in which to create a network interface for the glue endpoint. Only a single subnet within an AZ is supported. If omitted, only subnet_ids will be used.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="glue_endpoint_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

Tags for the Glue endpoint

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="https_security_group_cidr_blocks" requirement="optional" type="list(string)">
<HclListItemDescription>

List of CIDR blocks where HTTPS ingress should be allowed from. Defaults to the VPC's CIDR if left empty. Only used if create_https_security_group is true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="https_security_group_name_prefix" requirement="optional" type="string">
<HclListItemDescription>

Name prefix to use on the created SG. A random string will be appended.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;allow-https-&quot;"/>
</HclListItem>

<HclListItem name="kinesis_firehose_endpoint_policy" requirement="optional" type="string">
<HclListItemDescription>

IAM policy to restrict what resources can call this endpoint. For example, you can add an IAM policy that allows EC2 instances to talk to this endpoint but no other types of resources. If not specified, all resources will be allowed to call this endpoint.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="kinesis_firehose_endpoint_private_dns_enabled" requirement="optional" type="bool">
<HclListItemDescription>

Set to false if you don't want to associate a private hosted zone with the specified VPC for the KINESIS Firehose endpoint

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="kinesis_firehose_endpoint_security_group_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The ID of one or more security groups to associate with the network interface for the KINESIS Firehose endpoint. If none is provided, AWS will associate the default security group for the VPC.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="kinesis_firehose_endpoint_subnet_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The IDs of subnets in which to create a network interface for the KINESIS Firehose endpoint. Only a single subnet within an AZ is supported. When defined, it overrides <a href="#subnet_ids"><code>subnet_ids</code></a>. For some regions, KINESIS Firehose endpoint is not supported in all the AZs, so this variable helps to overcome this issue.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="kinesis_firehose_endpoint_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

Tags for the KINESIS Firehose endpoint

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="kinesis_streams_endpoint_policy" requirement="optional" type="string">
<HclListItemDescription>

IAM policy to restrict what resources can call this endpoint. For example, you can add an IAM policy that allows EC2 instances to talk to this endpoint but no other types of resources. If not specified, all resources will be allowed to call this endpoint.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="kinesis_streams_endpoint_private_dns_enabled" requirement="optional" type="bool">
<HclListItemDescription>

Set to false if you don't want to associate a private hosted zone with the specified VPC for the Kinesis Streams endpoint

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="kinesis_streams_endpoint_security_group_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The ID of one or more security groups to associate with the network interface for the Kinesis Streams endpoint. If none is provided, AWS will associate the default security group for the VPC.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="kinesis_streams_endpoint_subnet_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The IDs of subnets in which to create a network interface for the Kinesis Streams endpoint. Only a single subnet within an AZ is supported. If omitted, only subnet_ids will be used.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="kinesis_streams_endpoint_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

Tags for the Kinesis endpoint

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="kms_endpoint_policy" requirement="optional" type="string">
<HclListItemDescription>

IAM policy to restrict what resources can call this endpoint. For example, you can add an IAM policy that allows EC2 instances to talk to this endpoint but no other types of resources. If not specified, all resources will be allowed to call this endpoint.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="kms_endpoint_private_dns_enabled" requirement="optional" type="bool">
<HclListItemDescription>

Set to false if you don't want to associate a private hosted zone with the specified VPC for the KMS endpoint

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="kms_endpoint_security_group_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The ID of one or more security groups to associate with the network interface for the KMS endpoint. If none is provided, AWS will associate the default security group for the VPC.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="kms_endpoint_subnet_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The IDs of subnets in which to create a network interface for the KMS endpoint. Only a single subnet within an AZ is supported. If omitted, only subnet_ids will be used.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="kms_endpoint_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

Tags for the KMS endpoint

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="lambda_endpoint_policy" requirement="optional" type="string">
<HclListItemDescription>

IAM policy to restrict what resources can call this endpoint. For example, you can add an IAM policy that allows EC2 instances to talk to this endpoint but no other types of resources. If not specified, all resources will be allowed to call this endpoint.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="lambda_endpoint_private_dns_enabled" requirement="optional" type="bool">
<HclListItemDescription>

Set to false if you don't want to associate a private hosted zone with the specified VPC for the Lambda endpoint.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="lambda_endpoint_security_group_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The ID of one or more security groups to associate with the network interface for the Lambda endpoint. If none is provided, AWS will associate the default security group for the VPC.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="lambda_endpoint_subnet_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The IDs of subnets in which to create a network interface for the Lambda endpoint. Only a single subnet within an AZ is supported. If omitted, only subnet_ids will be used.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="lambda_endpoint_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

Tags for the Lambda endpoint

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="pinpoint_endpoint_policy" requirement="optional" type="string">
<HclListItemDescription>

IAM policy to restrict what resources can call this endpoint. For example, you can add an IAM policy that allows EC2 instances to talk to this endpoint but no other types of resources. If not specified, all resources will be allowed to call this endpoint.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="pinpoint_endpoint_private_dns_enabled" requirement="optional" type="bool">
<HclListItemDescription>

Set to false if you don't want to associate a private hosted zone with the specified VPC for the Pinpoint endpoint.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="pinpoint_endpoint_security_group_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The ID of one or more security groups to associate with the network interface for the Pinpoint endpoint. If none is provided, AWS will associate the default security group for the VPC.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="pinpoint_endpoint_subnet_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The IDs of subnets in which to create a network interface for the Pinpoint endpoint. Only a single subnet within an AZ is supported. If omitted, only subnet_ids will be used.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="pinpoint_endpoint_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

Tags for the Pinpoint endpoint

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="qldb_session_endpoint_policy" requirement="optional" type="string">
<HclListItemDescription>

IAM policy to restrict what resources can call this endpoint. For example, you can add an IAM policy that allows EC2 instances to talk to this endpoint but no other types of resources. If not specified, all resources will be allowed to call this endpoint.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="qldb_session_endpoint_private_dns_enabled" requirement="optional" type="bool">
<HclListItemDescription>

Set to false if you don't want to associate a private hosted zone with the specified VPC for the QLDB Session endpoint

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="qldb_session_endpoint_security_group_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The ID of one or more security groups to associate with the network interface for the QLDB Session endpoint. If none is provided, AWS will associate the default security group for the VPC.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="qldb_session_endpoint_subnet_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The IDs of subnets in which to create a network interface for the QLDB Session endpoint. Only a single subnet within an AZ is supported. When defined, it overrides <a href="#subnet_ids"><code>subnet_ids</code></a>. For some regions, QLDB Session endpoint is not supported in all the AZs, so this variable helps to overcome this issue.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="qldb_session_endpoint_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

Tags for the QLDB Session endpoint

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="rds_endpoint_policy" requirement="optional" type="string">
<HclListItemDescription>

IAM policy to restrict what resources can call this endpoint. For example, you can add an IAM policy that allows EC2 instances to talk to this endpoint but no other types of resources. If not specified, all resources will be allowed to call this endpoint.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="rds_endpoint_private_dns_enabled" requirement="optional" type="bool">
<HclListItemDescription>

Set to false if you don't want to associate a private hosted zone with the specified VPC for the RDS endpoint

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="rds_endpoint_security_group_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The ID of one or more security groups to associate with the network interface for the RDS endpoint. If none is provided, AWS will associate the default security group for the VPC.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="rds_endpoint_subnet_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The IDs of subnets in which to create a network interface for the RDS endpoint. Only a single subnet within an AZ is supported. When defined, it overrides <a href="#subnet_ids"><code>subnet_ids</code></a>. For some regions, RDS endpoint is not supported in all the AZs, so this variable helps to overcome this issue.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="rds_endpoint_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

Tags for the RDS endpoint

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="rds_fips_endpoint_policy" requirement="optional" type="string">
<HclListItemDescription>

IAM policy to restrict what resources can call this endpoint. For example, you can add an IAM policy that allows EC2 instances to talk to this endpoint but no other types of resources. If not specified, all resources will be allowed to call this endpoint.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="rds_fips_endpoint_private_dns_enabled" requirement="optional" type="bool">
<HclListItemDescription>

Set to false if you don't want to associate a private hosted zone with the specified VPC for the RDS FIPS endpoint

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="rds_fips_endpoint_security_group_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The ID of one or more security groups to associate with the network interface for the RDS endpoint. If none is provided, AWS will associate the default security group for the VPC.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="rds_fips_endpoint_subnet_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The IDs of subnets in which to create a network interface for the RDS endpoint. Only a single subnet within an AZ is supported. When defined, it overrides <a href="#subnet_ids"><code>subnet_ids</code></a>. For some regions, RDS endpoint is not supported in all the AZs, so this variable helps to overcome this issue.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="rds_fips_endpoint_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

Tags for the RDS FIPS endpoint

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="redshift_data_endpoint_policy" requirement="optional" type="string">
<HclListItemDescription>

IAM policy to restrict what resources can call this endpoint. For example, you can add an IAM policy that allows EC2 instances to talk to this endpoint but no other types of resources. If not specified, all resources will be allowed to call this endpoint.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="redshift_data_endpoint_private_dns_enabled" requirement="optional" type="bool">
<HclListItemDescription>

Set to false if you don't want to associate a private hosted zone with the specified VPC for the Redshift endpoint

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="redshift_data_endpoint_security_group_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The ID of one or more security groups to associate with the network interface for the Redshift endpoint. If none is provided, AWS will associate the default security group for the VPC.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="redshift_data_endpoint_subnet_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The IDs of subnets in which to create a network interface for the Redshift endpoint. Only a single subnet within an AZ is supported. If omitted, only subnet_ids will be used.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="redshift_data_endpoint_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

Tags for the Redshift endpoint

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="rekognition_endpoint_policy" requirement="optional" type="string">
<HclListItemDescription>

IAM policy to restrict what resources can call this endpoint. For example, you can add an IAM policy that allows EC2 instances to talk to this endpoint but no other types of resources. If not specified, all resources will be allowed to call this endpoint.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="rekognition_endpoint_private_dns_enabled" requirement="optional" type="bool">
<HclListItemDescription>

Set to false if you don't want to associate a private hosted zone with the specified VPC for the Rekognition endpoint

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="rekognition_endpoint_security_group_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The ID of one or more security groups to associate with the network interface for the Rekognition endpoint. If none is provided, AWS will associate the default security group for the VPC.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="rekognition_endpoint_subnet_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The IDs of subnets in which to create a network interface for the Rekognition endpoint. Only a single subnet within an AZ is supported. When defined, it overrides <a href="#subnet_ids"><code>subnet_ids</code></a>. For some regions, Rekognition endpoint is not supported in all the AZs, so this variable helps to overcome this issue.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="rekognition_endpoint_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

Tags for the Rekognition endpoint

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="sagemaker_api_endpoint_policy" requirement="optional" type="string">
<HclListItemDescription>

IAM policy to restrict what resources can call this endpoint. For example, you can add an IAM policy that allows EC2 instances to talk to this endpoint but no other types of resources. If not specified, all resources will be allowed to call this endpoint.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="sagemaker_api_endpoint_private_dns_enabled" requirement="optional" type="bool">
<HclListItemDescription>

Set to false if you don't want to associate a private hosted zone with the specified VPC for the SageMaker API endpoint

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="sagemaker_api_endpoint_security_group_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The ID of one or more security groups to associate with the network interface for the SageMaker API endpoint. If none is provided, AWS will associate the default security group for the VPC.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="sagemaker_api_endpoint_subnet_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The IDs of subnets in which to create a network interface for the SageMaker API endpoint. Only a single subnet within an AZ is supported. When defined, it overrides <a href="#subnet_ids"><code>subnet_ids</code></a>. For some regions, SageMaker API endpoint is not supported in all the AZs, so this variable helps to overcome this issue.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="sagemaker_api_endpoint_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

Tags for the SageMaker API endpoint

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="sagemaker_runtime_endpoint_policy" requirement="optional" type="string">
<HclListItemDescription>

IAM policy to restrict what resources can call this endpoint. For example, you can add an IAM policy that allows EC2 instances to talk to this endpoint but no other types of resources. If not specified, all resources will be allowed to call this endpoint.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="sagemaker_runtime_endpoint_private_dns_enabled" requirement="optional" type="bool">
<HclListItemDescription>

Set to false if you don't want to associate a private hosted zone with the specified VPC for the SageMaker Runtime endpoint

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="sagemaker_runtime_endpoint_security_group_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The ID of one or more security groups to associate with the network interface for the SageMaker Runtime endpoint. If none is provided, AWS will associate the default security group for the VPC.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="sagemaker_runtime_endpoint_subnet_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The IDs of subnets in which to create a network interface for the SageMaker Runtime endpoint. Only a single subnet within an AZ is supported. When defined, it overrides <a href="#subnet_ids"><code>subnet_ids</code></a>. For some regions, SageMaker Runtime endpoint is not supported in all the AZs, so this variable helps to overcome this issue.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="sagemaker_runtime_endpoint_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

Tags for the SageMaker Runtime endpoint

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="secretsmanager_endpoint_policy" requirement="optional" type="string">
<HclListItemDescription>

IAM policy to restrict what resources can call this endpoint. For example, you can add an IAM policy that allows EC2 instances to talk to this endpoint but no other types of resources. If not specified, all resources will be allowed to call this endpoint.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="secretsmanager_endpoint_private_dns_enabled" requirement="optional" type="bool">
<HclListItemDescription>

Set to false if you don't want to associate a private hosted zone with the specified VPC for the Secrets Manager endpoint

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="secretsmanager_endpoint_security_group_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The ID of one or more security groups to associate with the network interface for the Secrets Manager endpoint. If none is provided, AWS will associate the default security group for the VPC.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="secretsmanager_endpoint_subnet_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The IDs of subnets in which to create a network interface for the Secrets Manager endpoint. Only a single subnet within an AZ is supported. If omitted, only subnet_ids will be used.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="secretsmanager_endpoint_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

Tags for the Secrets Manager endpoint

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="secretsmanager_fips_endpoint_policy" requirement="optional" type="string">
<HclListItemDescription>

IAM policy to restrict what resources can call this endpoint. For example, you can add an IAM policy that allows EC2 instances to talk to this endpoint but no other types of resources. If not specified, all resources will be allowed to call this endpoint.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="secretsmanager_fips_endpoint_private_dns_enabled" requirement="optional" type="bool">
<HclListItemDescription>

Set to false if you don't want to associate a private hosted zone with the specified VPC for the FIPS Secrets Manager endpoint

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="secretsmanager_fips_endpoint_security_group_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The ID of one or more security groups to associate with the network interface for the Secrets Manager endpoint. If none is provided, AWS will associate the default security group for the VPC.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="secretsmanager_fips_endpoint_subnet_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The IDs of subnets in which to create a network interface for the  FIPS Secrets Manager endpoint. Only a single subnet within an AZ is supported. If omitted, only subnet_ids will be used.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="secretsmanager_fips_endpoint_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

Tags for the FIPS Secrets Manager endpoint

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="security_group_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of IDs of the security groups which will apply for all endpoints. Must supply this or create_https_security_group = true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="servicecatalog_endpoint_policy" requirement="optional" type="string">
<HclListItemDescription>

IAM policy to restrict what resources can call this endpoint. For example, you can add an IAM policy that allows EC2 instances to talk to this endpoint but no other types of resources. If not specified, all resources will be allowed to call this endpoint.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="servicecatalog_endpoint_private_dns_enabled" requirement="optional" type="bool">
<HclListItemDescription>

Set to false if you don't want to associate a private hosted zone with the specified VPC for the Service Catalog endpoint

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="servicecatalog_endpoint_security_group_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The ID of one or more security groups to associate with the network interface for the Service Catalog endpoint. If none is provided, AWS will associate the default security group for the VPC.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="servicecatalog_endpoint_subnet_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The IDs of subnets in which to create a network interface for the Service Catalog endpoint. Only a single subnet within an AZ is supported. When defined, it overrides <a href="#subnet_ids"><code>subnet_ids</code></a>. For some regions, Service Catalog endpoint is not supported in all the AZs, so this variable helps to overcome this issue.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="servicecatalog_endpoint_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

Tags for the Service Catalog endpoint

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="ses_endpoint_policy" requirement="optional" type="string">
<HclListItemDescription>

IAM policy to restrict what resources can call this endpoint. For example, you can add an IAM policy that allows EC2 instances to talk to this endpoint but no other types of resources. If not specified, all resources will be allowed to call this endpoint.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="ses_endpoint_private_dns_enabled" requirement="optional" type="bool">
<HclListItemDescription>

Set to false if you don't want to associate a private hosted zone with the specified VPC for the Simple Email Service endpoint

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="ses_endpoint_security_group_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The ID of one or more security groups to associate with the network interface for the Simple Email Service endpoint. If none is provided, AWS will associate the default security group for the VPC.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="ses_endpoint_subnet_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The IDs of subnets in which to create a network interface for the Simple Email Service endpoint. Only a single subnet within an AZ is supported. When defined, it overrides <a href="#subnet_ids"><code>subnet_ids</code></a>. For some regions, SES is not supported in all the AZs, so this variable helps to overcome this issue.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="ses_endpoint_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

Tags for the Simple Email Service endpoint

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="sms_endpoint_policy" requirement="optional" type="string">
<HclListItemDescription>

IAM policy to restrict what resources can call this endpoint. For example, you can add an IAM policy that allows EC2 instances to talk to this endpoint but no other types of resources. If not specified, all resources will be allowed to call this endpoint.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="sms_endpoint_private_dns_enabled" requirement="optional" type="bool">
<HclListItemDescription>

Set to false if you don't want to associate a private hosted zone with the specified VPC for the SMS endpoint

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="sms_endpoint_security_group_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The ID of one or more security groups to associate with the network interface for the SMS endpoint. If none is provided, AWS will associate the default security group for the VPC.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="sms_endpoint_subnet_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The IDs of subnets in which to create a network interface for the SMS endpoint. Only a single subnet within an AZ is supported. When defined, it overrides <a href="#subnet_ids"><code>subnet_ids</code></a>. For some regions, SMS endpoint is not supported in all the AZs, so this variable helps to overcome this issue.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="sms_endpoint_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

Tags for the SMS endpoint

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="sns_endpoint_policy" requirement="optional" type="string">
<HclListItemDescription>

IAM policy to restrict what resources can call this endpoint. For example, you can add an IAM policy that allows EC2 instances to talk to this endpoint but no other types of resources. If not specified, all resources will be allowed to call this endpoint.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="sns_endpoint_private_dns_enabled" requirement="optional" type="bool">
<HclListItemDescription>

Set to false if you don't want to associate a private hosted zone with the specified VPC for the SNS endpoint

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="sns_endpoint_security_group_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The ID of one or more security groups to associate with the network interface for the SNS endpoint. If none is provided, AWS will associate the default security group for the VPC.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="sns_endpoint_subnet_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The IDs of subnets in which to create a network interface for the SNS endpoint. Only a single subnet within an AZ is supported. If omitted, only subnet_ids will be used.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="sns_endpoint_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

Tags for the SNS endpoint

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="sqs_endpoint_policy" requirement="optional" type="string">
<HclListItemDescription>

IAM policy to restrict what resources can call this endpoint. For example, you can add an IAM policy that allows EC2 instances to talk to this endpoint but no other types of resources. If not specified, all resources will be allowed to call this endpoint.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="sqs_endpoint_private_dns_enabled" requirement="optional" type="bool">
<HclListItemDescription>

Set to false if you don't want to associate a private hosted zone with the specified VPC for the SQS endpoint

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="sqs_endpoint_security_group_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The ID of one or more security groups to associate with the network interface for the SQS endpoint. If none is provided, AWS will associate the default security group for the VPC.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="sqs_endpoint_subnet_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The IDs of subnets in which to create a network interface for the SQS endpoint. Only a single subnet within an AZ is supported. If omitted, only subnet_ids will be used.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="sqs_endpoint_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

Tags for the SQS endpoint

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="ssm_endpoint_policy" requirement="optional" type="string">
<HclListItemDescription>

IAM policy to restrict what resources can call this endpoint. For example, you can add an IAM policy that allows EC2 instances to talk to this endpoint but no other types of resources. If not specified, all resources will be allowed to call this endpoint.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="ssm_endpoint_private_dns_enabled" requirement="optional" type="bool">
<HclListItemDescription>

Set to false if you don't want to associate a private hosted zone with the specified VPC for the SSM Endpoint endpoint

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="ssm_endpoint_security_group_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The ID of one or more security groups to associate with the network interface for the SSM Endpoint endpoint. If none is provided, AWS will associate the default security group for the VPC.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="ssm_endpoint_subnet_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The IDs of subnets in which to create a network interface for the SSM Endpoint endpoint. Only a single subnet within an AZ is supported. If omitted, only subnet_ids will be used.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="ssm_endpoint_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

Tags for the SSM Endpoint endpoint

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="ssmmessages_endpoint_policy" requirement="optional" type="string">
<HclListItemDescription>

IAM policy to restrict what resources can call this endpoint. For example, you can add an IAM policy that allows EC2 instances to talk to this endpoint but no other types of resources. If not specified, all resources will be allowed to call this endpoint.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="ssmmessages_endpoint_private_dns_enabled" requirement="optional" type="bool">
<HclListItemDescription>

Set to false if you don't want to associate a private hosted zone with the specified VPC for the SSM Messages endpoint

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="ssmmessages_endpoint_security_group_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The ID of one or more security groups to associate with the network interface for the SSM Messages endpoint. If none is provided, AWS will associate the default security group for the VPC.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="ssmmessages_endpoint_subnet_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The IDs of subnets in which to create a network interface for the SSM Messages endpoint. Only a single subnet within an AZ is supported. If omitted, only subnet_ids will be used.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="ssmmessages_endpoint_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

Tags for the SSM Messages endpoint

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="states_endpoint_policy" requirement="optional" type="string">
<HclListItemDescription>

IAM policy to restrict what resources can call this endpoint. For example, you can add an IAM policy that allows EC2 instances to talk to this endpoint but no other types of resources. If not specified, all resources will be allowed to call this endpoint.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="states_endpoint_private_dns_enabled" requirement="optional" type="bool">
<HclListItemDescription>

Set to false if you don't want to associate a private hosted zone with the specified VPC for the Step Function endpoint

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="states_endpoint_security_group_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The ID of one or more security groups to associate with the network interface for the Step Function endpoint. If none is provided, AWS will associate the default security group for the VPC.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="states_endpoint_subnet_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The IDs of subnets in which to create a network interface for the Step Function endpoint. Only a single subnet within an AZ is supported. When defined, it overrides <a href="#subnet_ids"><code>subnet_ids</code></a>. For some regions, Step Function endpoint is not supported in all the AZs, so this variable helps to overcome this issue.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="states_endpoint_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

Tags for the Step Function endpoint

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="storagegateway_endpoint_policy" requirement="optional" type="string">
<HclListItemDescription>

IAM policy to restrict what resources can call this endpoint. For example, you can add an IAM policy that allows EC2 instances to talk to this endpoint but no other types of resources. If not specified, all resources will be allowed to call this endpoint.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="storagegateway_endpoint_private_dns_enabled" requirement="optional" type="bool">
<HclListItemDescription>

Set to false if you don't want to associate a private hosted zone with the specified VPC for the Storage Gateway endpoint

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="storagegateway_endpoint_security_group_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The ID of one or more security groups to associate with the network interface for the Storage Gateway endpoint. If none is provided, AWS will associate the default security group for the VPC.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="storagegateway_endpoint_subnet_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The IDs of subnets in which to create a network interface for the Storage Gateway endpoint. Only a single subnet within an AZ is supported. When defined, it overrides <a href="#subnet_ids"><code>subnet_ids</code></a>. For some regions, Storage Gateway endpoint is not supported in all the AZs, so this variable helps to overcome this issue.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="storagegateway_endpoint_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

Tags for the Storage Gateway endpoint

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="sts_endpoint_policy" requirement="optional" type="string">
<HclListItemDescription>

IAM policy to restrict what resources can call this endpoint. For example, you can add an IAM policy that allows EC2 instances to talk to this endpoint but no other types of resources. If not specified, all resources will be allowed to call this endpoint.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="sts_endpoint_private_dns_enabled" requirement="optional" type="bool">
<HclListItemDescription>

Set to false if you don't want to associate a private hosted zone with the specified VPC for the STS endpoint

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="sts_endpoint_security_group_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The ID of one or more security groups to associate with the network interface for the STS endpoint. If none is provided, AWS will associate the default security group for the VPC.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="sts_endpoint_subnet_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The IDs of subnets in which to create a network interface for the STS endpoint. Only a single subnet within an AZ is supported. If omitted, only subnet_ids will be used.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="sts_endpoint_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

Tags for the STS endpoint

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="tags" requirement="optional" type="map(string)">
<HclListItemDescription>

A map of tags to apply to all endpoints.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="textract_endpoint_policy" requirement="optional" type="string">
<HclListItemDescription>

IAM policy to restrict what resources can call this endpoint. For example, you can add an IAM policy that allows EC2 instances to talk to this endpoint but no other types of resources. If not specified, all resources will be allowed to call this endpoint.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="textract_endpoint_private_dns_enabled" requirement="optional" type="bool">
<HclListItemDescription>

Set to false if you don't want to associate a private hosted zone with the specified VPC for the Textract endpoint

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="textract_endpoint_security_group_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The ID of one or more security groups to associate with the network interface for the Textract endpoint. If none is provided, AWS will associate the default security group for the VPC.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="textract_endpoint_subnet_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The IDs of subnets in which to create a network interface for the Textract endpoint. Only a single subnet within an AZ is supported. When defined, it overrides <a href="#subnet_ids"><code>subnet_ids</code></a>. For some regions, Textract endpoint is not supported in all the AZs, so this variable helps to overcome this issue.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="textract_endpoint_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

Tags for the Textract endpoint

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="transfer_endpoint_policy" requirement="optional" type="string">
<HclListItemDescription>

IAM policy to restrict what resources can call this endpoint. For example, you can add an IAM policy that allows EC2 instances to talk to this endpoint but no other types of resources. If not specified, all resources will be allowed to call this endpoint.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="transfer_endpoint_private_dns_enabled" requirement="optional" type="bool">
<HclListItemDescription>

Set to false if you don't want to associate a private hosted zone with the specified VPC for the Transfer endpoint

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="transfer_endpoint_security_group_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The ID of one or more security groups to associate with the network interface for the Transfer endpoint. If none is provided, AWS will associate the default security group for the VPC.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="transfer_endpoint_subnet_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The IDs of subnets in which to create a network interface for the Transfer endpoint. Only a single subnet within an AZ is supported. When defined, it overrides <a href="#subnet_ids"><code>subnet_ids</code></a>. For some regions, Transfer endpoint is not supported in all the AZs, so this variable helps to overcome this issue.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="transfer_endpoint_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

Tags for the Transfer endpoint

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="transferserver_endpoint_policy" requirement="optional" type="string">
<HclListItemDescription>

IAM policy to restrict what resources can call this endpoint. For example, you can add an IAM policy that allows EC2 instances to talk to this endpoint but no other types of resources. If not specified, all resources will be allowed to call this endpoint.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="transferserver_endpoint_private_dns_enabled" requirement="optional" type="bool">
<HclListItemDescription>

Set to false if you don't want to associate a private hosted zone with the specified VPC for the Transfer Server endpoint

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="transferserver_endpoint_security_group_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The ID of one or more security groups to associate with the network interface for the Transfer Server endpoint. If none is provided, AWS will associate the default security group for the VPC.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="transferserver_endpoint_subnet_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The IDs of subnets in which to create a network interface for the Transfer Server endpoint. Only a single subnet within an AZ is supported. When defined, it overrides <a href="#subnet_ids"><code>subnet_ids</code></a>. For some regions, Transfer Server endpoint is not supported in all the AZs, so this variable helps to overcome this issue.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="transferserver_endpoint_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

Tags for the Transfer Server endpoint

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="vpc_lattice_endpoint_policy" requirement="optional" type="string">
<HclListItemDescription>

IAM policy to restrict what resources can call this endpoint. For example, you can add an IAM policy that allows EC2 instances to talk to this endpoint but no other types of resources. If not specified, all resources will be allowed to call this endpoint.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="vpc_lattice_endpoint_private_dns_enabled" requirement="optional" type="bool">
<HclListItemDescription>

Set to false if you don't want to associate a private hosted zone with the specified VPC for the VPC lattice endpoint.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="vpc_lattice_endpoint_security_group_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The ID of one or more security groups to associate with the network interface for the VPC lattice endpoint. If none is provided, AWS will associate the default security group for the VPC.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="vpc_lattice_endpoint_subnet_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The IDs of subnets in which to create a network interface for the VPC lattice endpoint. Only a single subnet within an AZ is supported. If omitted, only subnet_ids will be used.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="vpc_lattice_endpoint_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

Tags for the VPC lattice endpoint

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="workspaces_endpoint_policy" requirement="optional" type="string">
<HclListItemDescription>

IAM policy to restrict what resources can call this endpoint. For example, you can add an IAM policy that allows EC2 instances to talk to this endpoint but no other types of resources. If not specified, all resources will be allowed to call this endpoint.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="workspaces_endpoint_private_dns_enabled" requirement="optional" type="bool">
<HclListItemDescription>

Set to false if you don't want to associate a private hosted zone with the specified VPC for the Workspaces endpoint

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="workspaces_endpoint_security_group_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The ID of one or more security groups to associate with the network interface for the Workspaces endpoint. If none is provided, AWS will associate the default security group for the VPC.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="workspaces_endpoint_subnet_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The IDs of subnets in which to create a network interface for the Workspaces endpoint. Only a single subnet within an AZ is supported. When defined, it overrides <a href="#subnet_ids"><code>subnet_ids</code></a>. For some regions, Workspaces endpoint is not supported in all the AZs, so this variable helps to overcome this issue.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="workspaces_endpoint_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

Tags for the Workspaces endpoint

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="access_analyzer_endpoint_id">
</HclListItem>

<HclListItem name="access_analyzer_endpoint_url">
<HclListItemDescription>

If you have private dns enabled, then your streaming calls would automatically go through the VPC Endpoint. Otherwise, you need to explicitly to use this endpoint.

</HclListItemDescription>
</HclListItem>

<HclListItem name="access_analyzer_network_interface_ids">
</HclListItem>

<HclListItem name="acm_pca_endpoint_id">
</HclListItem>

<HclListItem name="acm_pca_endpoint_url">
<HclListItemDescription>

If you have private dns enabled, then your streaming calls would automatically go through the VPC Endpoint. Otherwise, you need to explicitly to use this endpoint.

</HclListItemDescription>
</HclListItem>

<HclListItem name="acm_pca_network_interface_ids">
</HclListItem>

<HclListItem name="api_gateway_endpoint_id">
</HclListItem>

<HclListItem name="api_gateway_endpoint_url">
<HclListItemDescription>

If you have private dns enabled, then your API calls would automatically go through the VPC Endpoint. Otherwise, you need to explicitly to use this endpoint.

</HclListItemDescription>
</HclListItem>

<HclListItem name="api_gateway_network_interface_ids">
</HclListItem>

<HclListItem name="appmesh_envoy_management_endpoint_id">
</HclListItem>

<HclListItem name="appmesh_envoy_management_endpoint_url">
<HclListItemDescription>

If you have private dns enabled, then your API calls would automatically go through the VPC Endpoint. Otherwise, you need to explicitly to use this endpoint.

</HclListItemDescription>
</HclListItem>

<HclListItem name="appmesh_envoy_management_network_interface_ids">
</HclListItem>

<HclListItem name="appstream_api_endpoint_id">
</HclListItem>

<HclListItem name="appstream_api_endpoint_url">
<HclListItemDescription>

If you have private dns enabled, then your API calls would automatically go through the VPC Endpoint. Otherwise, you need to explicitly to use this endpoint.

</HclListItemDescription>
</HclListItem>

<HclListItem name="appstream_api_network_interface_ids">
</HclListItem>

<HclListItem name="appstream_streaming_endpoint_id">
</HclListItem>

<HclListItem name="appstream_streaming_endpoint_url">
<HclListItemDescription>

If you have private dns enabled, then your streaming calls would automatically go through the VPC Endpoint. Otherwise, you need to explicitly to use this endpoint.

</HclListItemDescription>
</HclListItem>

<HclListItem name="appstream_streaming_network_interface_ids">
</HclListItem>

<HclListItem name="athena_endpoint_id">
</HclListItem>

<HclListItem name="athena_endpoint_url">
<HclListItemDescription>

If you have private dns enabled, then your streaming calls would automatically go through the VPC Endpoint. Otherwise, you need to explicitly to use this endpoint.

</HclListItemDescription>
</HclListItem>

<HclListItem name="athena_network_interface_ids">
</HclListItem>

<HclListItem name="auto_scaling_plans_endpoint_id">
</HclListItem>

<HclListItem name="auto_scaling_plans_endpoint_url">
<HclListItemDescription>

If you have private dns enabled, then your streaming calls would automatically go through the VPC Endpoint. Otherwise, you need to explicitly to use this endpoint.

</HclListItemDescription>
</HclListItem>

<HclListItem name="auto_scaling_plans_network_interface_ids">
</HclListItem>

<HclListItem name="cloud_directory_endpoint_id">
</HclListItem>

<HclListItem name="cloud_directory_endpoint_url">
<HclListItemDescription>

If you have private dns enabled, then your streaming calls would automatically go through the VPC Endpoint. Otherwise, you need to explicitly to use this endpoint.

</HclListItemDescription>
</HclListItem>

<HclListItem name="cloud_directory_network_interface_ids">
</HclListItem>

<HclListItem name="cloudformation_endpoint_id">
</HclListItem>

<HclListItem name="cloudformation_endpoint_url">
<HclListItemDescription>

If you have private dns enabled, then your API calls would automatically go through the VPC Endpoint. Otherwise, you need to explicitly to use this endpoint.

</HclListItemDescription>
</HclListItem>

<HclListItem name="cloudformation_network_interface_ids">
</HclListItem>

<HclListItem name="cloudtrail_endpoint_id">
</HclListItem>

<HclListItem name="cloudtrail_endpoint_url">
<HclListItemDescription>

If you have private dns enabled, then your API calls would automatically go through the VPC Endpoint. Otherwise, you need to explicitly to use this endpoint.

</HclListItemDescription>
</HclListItem>

<HclListItem name="cloudtrail_network_interface_ids">
</HclListItem>

<HclListItem name="cloudwatch_events_endpoint_id">
</HclListItem>

<HclListItem name="cloudwatch_events_endpoint_url">
<HclListItemDescription>

If you have private dns enabled, then your API calls would automatically go through the VPC Endpoint. Otherwise, you need to explicitly to use this endpoint.

</HclListItemDescription>
</HclListItem>

<HclListItem name="cloudwatch_events_network_interface_ids">
</HclListItem>

<HclListItem name="cloudwatch_logs_endpoint_id">
</HclListItem>

<HclListItem name="cloudwatch_logs_endpoint_url">
<HclListItemDescription>

If you have private dns enabled, then your API calls would automatically go through the VPC Endpoint. Otherwise, you need to explicitly to use this endpoint.

</HclListItemDescription>
</HclListItem>

<HclListItem name="cloudwatch_logs_network_interface_ids">
</HclListItem>

<HclListItem name="cloudwatch_monitoring_endpoint_id">
</HclListItem>

<HclListItem name="cloudwatch_monitoring_endpoint_url">
<HclListItemDescription>

If you have private dns enabled, then your API calls would automatically go through the VPC Endpoint. Otherwise, you need to explicitly to use this endpoint.

</HclListItemDescription>
</HclListItem>

<HclListItem name="cloudwatch_monitoring_network_interface_ids">
</HclListItem>

<HclListItem name="codeartifact_api_endpoint_id">
</HclListItem>

<HclListItem name="codeartifact_api_endpoint_url">
<HclListItemDescription>

If you have private dns enabled, then your streaming calls would automatically go through the VPC Endpoint. Otherwise, you need to explicitly to use this endpoint.

</HclListItemDescription>
</HclListItem>

<HclListItem name="codeartifact_api_network_interface_ids">
</HclListItem>

<HclListItem name="codeartifact_repositories_endpoint_id">
</HclListItem>

<HclListItem name="codeartifact_repositories_endpoint_url">
<HclListItemDescription>

If you have private dns enabled, then your streaming calls would automatically go through the VPC Endpoint. Otherwise, you need to explicitly to use this endpoint.

</HclListItemDescription>
</HclListItem>

<HclListItem name="codeartifact_repositories_network_interface_ids">
</HclListItem>

<HclListItem name="codebuild_endpoint_id">
</HclListItem>

<HclListItem name="codebuild_endpoint_url">
<HclListItemDescription>

If you have private dns enabled, then your API calls would automatically go through the VPC Endpoint. Otherwise, you need to explicitly to use this endpoint.

</HclListItemDescription>
</HclListItem>

<HclListItem name="codebuild_network_interface_ids">
</HclListItem>

<HclListItem name="codecommit_endpoint_id">
</HclListItem>

<HclListItem name="codecommit_endpoint_url">
<HclListItemDescription>

If you have private dns enabled, then your API calls would automatically go through the VPC Endpoint. Otherwise, you need to explicitly to use this endpoint.

</HclListItemDescription>
</HclListItem>

<HclListItem name="codecommit_network_interface_ids">
</HclListItem>

<HclListItem name="codedeploy_commands_secure_endpoint_id">
</HclListItem>

<HclListItem name="codedeploy_commands_secure_endpoint_url">
<HclListItemDescription>

If you have private dns enabled, then your streaming calls would automatically go through the VPC Endpoint. Otherwise, you need to explicitly to use this endpoint.

</HclListItemDescription>
</HclListItem>

<HclListItem name="codedeploy_commands_secure_network_interface_ids">
</HclListItem>

<HclListItem name="codedeploy_endpoint_id">
</HclListItem>

<HclListItem name="codedeploy_endpoint_url">
<HclListItemDescription>

If you have private dns enabled, then your streaming calls would automatically go through the VPC Endpoint. Otherwise, you need to explicitly to use this endpoint.

</HclListItemDescription>
</HclListItem>

<HclListItem name="codedeploy_network_interface_ids">
</HclListItem>

<HclListItem name="codepipeline_endpoint_id">
</HclListItem>

<HclListItem name="codepipeline_endpoint_url">
<HclListItemDescription>

If you have private dns enabled, then your API calls would automatically go through the VPC Endpoint. Otherwise, you need to explicitly to use this endpoint.

</HclListItemDescription>
</HclListItem>

<HclListItem name="codepipeline_network_interface_ids">
</HclListItem>

<HclListItem name="config_endpoint_id">
</HclListItem>

<HclListItem name="config_endpoint_url">
<HclListItemDescription>

If you have private dns enabled, then your API calls would automatically go through the VPC Endpoint. Otherwise, you need to explicitly to use this endpoint.

</HclListItemDescription>
</HclListItem>

<HclListItem name="config_network_interface_ids">
</HclListItem>

<HclListItem name="datasync_endpoint_id">
</HclListItem>

<HclListItem name="datasync_endpoint_url">
<HclListItemDescription>

If you have private dns enabled, then your streaming calls would automatically go through the VPC Endpoint. Otherwise, you need to explicitly to use this endpoint.

</HclListItemDescription>
</HclListItem>

<HclListItem name="datasync_network_interface_ids">
</HclListItem>

<HclListItem name="ebs_endpoint_id">
</HclListItem>

<HclListItem name="ebs_endpoint_url">
<HclListItemDescription>

If you have private dns enabled, then your API calls would automatically go through the VPC Endpoint. Otherwise, you need to explicitly to use this endpoint.

</HclListItemDescription>
</HclListItem>

<HclListItem name="ebs_network_interface_ids">
</HclListItem>

<HclListItem name="ec2_autoscaling_endpoint_id">
</HclListItem>

<HclListItem name="ec2_autoscaling_endpoint_url">
<HclListItemDescription>

If you have private dns enabled, then your API calls would automatically go through the VPC Endpoint. Otherwise, you need to explicitly to use this endpoint.

</HclListItemDescription>
</HclListItem>

<HclListItem name="ec2_autoscaling_network_interface_ids">
</HclListItem>

<HclListItem name="ec2_endpoint_id">
</HclListItem>

<HclListItem name="ec2_endpoint_url">
<HclListItemDescription>

If you have private dns enabled, then your API calls would automatically go through the VPC Endpoint. Otherwise, you need to explicitly to use this endpoint. E.g. aws ec2 --endpoint-url https://vpce-008ec8becff9267dc-8qumgjia.ec2.us-east-1.vpce.amazonaws.com/ [...args]

</HclListItemDescription>
</HclListItem>

<HclListItem name="ec2_network_interface_ids">
</HclListItem>

<HclListItem name="ec2messages_endpoint_id">
</HclListItem>

<HclListItem name="ec2messages_endpoint_url">
<HclListItemDescription>

If you have private dns enabled, then your API calls would automatically go through the VPC Endpoint. Otherwise, you need to explicitly to use this endpoint.

</HclListItemDescription>
</HclListItem>

<HclListItem name="ec2messages_network_interface_ids">
</HclListItem>

<HclListItem name="ecr_api_endpoint_id">
</HclListItem>

<HclListItem name="ecr_api_endpoint_url">
<HclListItemDescription>

If you have private dns enabled, then your API calls would automatically go through the VPC Endpoint. Otherwise, you need to explicitly to use this endpoint.

</HclListItemDescription>
</HclListItem>

<HclListItem name="ecr_api_network_interface_ids">
</HclListItem>

<HclListItem name="ecr_dkr_endpoint_id">
</HclListItem>

<HclListItem name="ecr_dkr_endpoint_url">
<HclListItemDescription>

If you have private dns enabled, then your API calls would automatically go through the VPC Endpoint. Otherwise, you need to explicitly to use this endpoint.

</HclListItemDescription>
</HclListItem>

<HclListItem name="ecr_dkr_network_interface_ids">
</HclListItem>

<HclListItem name="ecs_agent_endpoint_id">
</HclListItem>

<HclListItem name="ecs_agent_endpoint_url">
<HclListItemDescription>

If you have private dns enabled, then your API calls would automatically go through the VPC Endpoint. Otherwise, you need to explicitly to use this endpoint.

</HclListItemDescription>
</HclListItem>

<HclListItem name="ecs_agent_network_interface_ids">
</HclListItem>

<HclListItem name="ecs_endpoint_id">
</HclListItem>

<HclListItem name="ecs_endpoint_url">
<HclListItemDescription>

If you have private dns enabled, then your API calls would automatically go through the VPC Endpoint. Otherwise, you need to explicitly to use this endpoint.

</HclListItemDescription>
</HclListItem>

<HclListItem name="ecs_network_interface_ids">
</HclListItem>

<HclListItem name="ecs_telemetry_endpoint_id">
</HclListItem>

<HclListItem name="ecs_telemetry_endpoint_url">
<HclListItemDescription>

If you have private dns enabled, then your API calls would automatically go through the VPC Endpoint. Otherwise, you need to explicitly to use this endpoint.

</HclListItemDescription>
</HclListItem>

<HclListItem name="ecs_telemetry_network_interface_ids">
</HclListItem>

<HclListItem name="efs_endpoint_id">
</HclListItem>

<HclListItem name="efs_endpoint_url">
<HclListItemDescription>

If you have private dns enabled, then your API calls would automatically go through the VPC Endpoint. Otherwise, you need to explicitly to use this endpoint.

</HclListItemDescription>
</HclListItem>

<HclListItem name="efs_network_interface_ids">
</HclListItem>

<HclListItem name="elastic_inference_runtime_endpoint_id">
</HclListItem>

<HclListItem name="elastic_inference_runtime_endpoint_url">
<HclListItemDescription>

If you have private dns enabled, then your streaming calls would automatically go through the VPC Endpoint. Otherwise, you need to explicitly to use this endpoint.

</HclListItemDescription>
</HclListItem>

<HclListItem name="elastic_inference_runtime_network_interface_ids">
</HclListItem>

<HclListItem name="elasticbeanstalk_endpoint_id">
</HclListItem>

<HclListItem name="elasticbeanstalk_endpoint_url">
<HclListItemDescription>

If you have private dns enabled, then your streaming calls would automatically go through the VPC Endpoint. Otherwise, you need to explicitly to use this endpoint.

</HclListItemDescription>
</HclListItem>

<HclListItem name="elasticbeanstalk_health_endpoint_id">
</HclListItem>

<HclListItem name="elasticbeanstalk_health_endpoint_url">
<HclListItemDescription>

If you have private dns enabled, then your streaming calls would automatically go through the VPC Endpoint. Otherwise, you need to explicitly to use this endpoint.

</HclListItemDescription>
</HclListItem>

<HclListItem name="elasticbeanstalk_health_network_interface_ids">
</HclListItem>

<HclListItem name="elasticbeanstalk_network_interface_ids">
</HclListItem>

<HclListItem name="elb_endpoint_id">
</HclListItem>

<HclListItem name="elb_endpoint_url">
<HclListItemDescription>

If you have private dns enabled, then your API calls would automatically go through the VPC Endpoint. Otherwise, you need to explicitly to use this endpoint.

</HclListItemDescription>
</HclListItem>

<HclListItem name="elb_network_interface_ids">
</HclListItem>

<HclListItem name="emr_endpoint_id">
</HclListItem>

<HclListItem name="emr_endpoint_url">
<HclListItemDescription>

If you have private dns enabled, then your streaming calls would automatically go through the VPC Endpoint. Otherwise, you need to explicitly to use this endpoint.

</HclListItemDescription>
</HclListItem>

<HclListItem name="emr_network_interface_ids">
</HclListItem>

<HclListItem name="git_codecommit_endpoint_id">
</HclListItem>

<HclListItem name="git_codecommit_endpoint_url">
<HclListItemDescription>

If you have private dns enabled, then your API calls would automatically go through the VPC Endpoint. Otherwise, you need to explicitly to use this endpoint.

</HclListItemDescription>
</HclListItem>

<HclListItem name="git_codecommit_network_interface_ids">
</HclListItem>

<HclListItem name="glue_endpoint_id">
</HclListItem>

<HclListItem name="glue_endpoint_url">
<HclListItemDescription>

If you have private dns enabled, then your API calls would automatically go through the VPC Endpoint. Otherwise, you need to explicitly to use this endpoint.

</HclListItemDescription>
</HclListItem>

<HclListItem name="glue_network_interface_ids">
</HclListItem>

<HclListItem name="https_security_group_id">
<HclListItemDescription>

If you allow the creation of the HTTPS security group, the id of the created group will be output here.

</HclListItemDescription>
</HclListItem>

<HclListItem name="kinesis_firehose_endpoint_id">
</HclListItem>

<HclListItem name="kinesis_firehose_endpoint_url">
<HclListItemDescription>

If you have private dns enabled, then your API calls would automatically go through the VPC Endpoint. Otherwise, you need to explicitly to use this endpoint.

</HclListItemDescription>
</HclListItem>

<HclListItem name="kinesis_firehose_network_interface_ids">
</HclListItem>

<HclListItem name="kinesis_streams_endpoint_id">
</HclListItem>

<HclListItem name="kinesis_streams_endpoint_url">
<HclListItemDescription>

If you have private dns enabled, then your API calls would automatically go through the VPC Endpoint. Otherwise, you need to explicitly to use this endpoint.

</HclListItemDescription>
</HclListItem>

<HclListItem name="kinesis_streams_network_interface_ids">
</HclListItem>

<HclListItem name="kms_endpoint_id">
</HclListItem>

<HclListItem name="kms_gateway_endpoint_url">
<HclListItemDescription>

If you have private dns enabled, then your API calls would automatically go through the VPC Endpoint. Otherwise, you need to explicitly to use this endpoint.

</HclListItemDescription>
</HclListItem>

<HclListItem name="kms_network_interface_ids">
</HclListItem>

<HclListItem name="lambda_endpoint_id">
</HclListItem>

<HclListItem name="lambda_endpoint_url">
<HclListItemDescription>

If you have private dns enabled, then your API calls would automatically go through the VPC Endpoint. Otherwise, you need to explicitly to use this endpoint.

</HclListItemDescription>
</HclListItem>

<HclListItem name="lambda_network_interface_ids">
</HclListItem>

<HclListItem name="pinpoint_endpoint_id">
</HclListItem>

<HclListItem name="pinpoint_endpoint_url">
<HclListItemDescription>

If you have private dns enabled, then your streaming calls would automatically go through the VPC Endpoint. Otherwise, you need to explicitly to use this endpoint.

</HclListItemDescription>
</HclListItem>

<HclListItem name="pinpoint_network_interface_ids">
</HclListItem>

<HclListItem name="qldb_session_endpoint_id">
</HclListItem>

<HclListItem name="qldb_session_endpoint_url">
<HclListItemDescription>

If you have private dns enabled, then your streaming calls would automatically go through the VPC Endpoint. Otherwise, you need to explicitly to use this endpoint.

</HclListItemDescription>
</HclListItem>

<HclListItem name="qldb_session_network_interface_ids">
</HclListItem>

<HclListItem name="rds_endpoint_id">
</HclListItem>

<HclListItem name="rds_endpoint_url">
<HclListItemDescription>

If you have private dns enabled, then your streaming calls would automatically go through the VPC Endpoint. Otherwise, you need to explicitly to use this endpoint.

</HclListItemDescription>
</HclListItem>

<HclListItem name="rds_fips_endpoint_id">
</HclListItem>

<HclListItem name="rds_fips_endpoint_url">
<HclListItemDescription>

If you have private dns enabled, then your streaming calls would automatically go through the VPC Endpoint. Otherwise, you need to explicitly to use this endpoint.

</HclListItemDescription>
</HclListItem>

<HclListItem name="rds_fips_network_interface_ids">
</HclListItem>

<HclListItem name="rds_network_interface_ids">
</HclListItem>

<HclListItem name="redshift_data_endpoint_id">
</HclListItem>

<HclListItem name="redshift_data_endpoint_url">
<HclListItemDescription>

If you have private dns enabled, then your API calls would automatically go through the VPC Endpoint. Otherwise, you need to explicitly to use this endpoint.

</HclListItemDescription>
</HclListItem>

<HclListItem name="redshift_data_network_interface_ids">
</HclListItem>

<HclListItem name="rekognition_endpoint_id">
</HclListItem>

<HclListItem name="rekognition_endpoint_url">
<HclListItemDescription>

If you have private dns enabled, then your streaming calls would automatically go through the VPC Endpoint. Otherwise, you need to explicitly to use this endpoint.

</HclListItemDescription>
</HclListItem>

<HclListItem name="rekognition_network_interface_ids">
</HclListItem>

<HclListItem name="sagemaker_api_endpoint_id">
</HclListItem>

<HclListItem name="sagemaker_api_endpoint_url">
<HclListItemDescription>

If you have private dns enabled, then your API calls would automatically go through the VPC Endpoint. Otherwise, you need to explicitly to use this endpoint.

</HclListItemDescription>
</HclListItem>

<HclListItem name="sagemaker_api_network_interface_ids">
</HclListItem>

<HclListItem name="sagemaker_runtime_endpoint_id">
</HclListItem>

<HclListItem name="sagemaker_runtime_endpoint_url">
<HclListItemDescription>

If you have private dns enabled, then your API calls would automatically go through the VPC Endpoint. Otherwise, you need to explicitly to use this endpoint.

</HclListItemDescription>
</HclListItem>

<HclListItem name="sagemaker_runtime_network_interface_ids">
</HclListItem>

<HclListItem name="secretsmanager_endpoint_id">
</HclListItem>

<HclListItem name="secretsmanager_endpoint_url">
<HclListItemDescription>

If you have private dns enabled, then your API calls would automatically go through the VPC Endpoint. Otherwise, you need to explicitly to use this endpoint.

</HclListItemDescription>
</HclListItem>

<HclListItem name="secretsmanager_fips_endpoint_id">
</HclListItem>

<HclListItem name="secretsmanager_fips_endpoint_url">
<HclListItemDescription>

If you have private dns enabled, then your API calls would automatically go through the VPC Endpoint. Otherwise, you need to explicitly to use this endpoint.

</HclListItemDescription>
</HclListItem>

<HclListItem name="secretsmanager_fips_network_interface_ids">
</HclListItem>

<HclListItem name="secretsmanager_network_interface_ids">
</HclListItem>

<HclListItem name="servicecatalog_endpoint_id">
</HclListItem>

<HclListItem name="servicecatalog_endpoint_url">
<HclListItemDescription>

If you have private dns enabled, then your API calls would automatically go through the VPC Endpoint. Otherwise, you need to explicitly to use this endpoint.

</HclListItemDescription>
</HclListItem>

<HclListItem name="servicecatalog_network_interface_ids">
</HclListItem>

<HclListItem name="sms_endpoint_id">
</HclListItem>

<HclListItem name="sms_endpoint_url">
<HclListItemDescription>

If you have private dns enabled, then your streaming calls would automatically go through the VPC Endpoint. Otherwise, you need to explicitly to use this endpoint.

</HclListItemDescription>
</HclListItem>

<HclListItem name="sms_network_interface_ids">
</HclListItem>

<HclListItem name="sns_endpoint_id">
</HclListItem>

<HclListItem name="sns_endpoint_url">
<HclListItemDescription>

If you have private dns enabled, then your API calls would automatically go through the VPC Endpoint. Otherwise, you need to explicitly to use this endpoint.

</HclListItemDescription>
</HclListItem>

<HclListItem name="sns_network_interface_ids">
</HclListItem>

<HclListItem name="sqs_endpoint_id">
</HclListItem>

<HclListItem name="sqs_endpoint_url">
<HclListItemDescription>

If you have private dns enabled, then your API calls would automatically go through the VPC Endpoint. Otherwise, you need to explicitly to use this endpoint.

</HclListItemDescription>
</HclListItem>

<HclListItem name="sqs_network_interface_ids">
</HclListItem>

<HclListItem name="ssm_endpoint_id">
</HclListItem>

<HclListItem name="ssm_endpoint_url">
<HclListItemDescription>

If you have private dns enabled, then your API calls would automatically go through the VPC Endpoint. Otherwise, you need to explicitly to use this endpoint.

</HclListItemDescription>
</HclListItem>

<HclListItem name="ssm_network_interface_ids">
</HclListItem>

<HclListItem name="ssmmessages_endpoint_id">
</HclListItem>

<HclListItem name="ssmmessages_endpoint_url">
<HclListItemDescription>

If you have private dns enabled, then your API calls would automatically go through the VPC Endpoint. Otherwise, you need to explicitly to use this endpoint.

</HclListItemDescription>
</HclListItem>

<HclListItem name="ssmmessages_network_interface_ids">
</HclListItem>

<HclListItem name="states_endpoint_id">
</HclListItem>

<HclListItem name="states_endpoint_url">
<HclListItemDescription>

If you have private dns enabled, then your streaming calls would automatically go through the VPC Endpoint. Otherwise, you need to explicitly to use this endpoint.

</HclListItemDescription>
</HclListItem>

<HclListItem name="states_network_interface_ids">
</HclListItem>

<HclListItem name="storagegateway_endpoint_id">
</HclListItem>

<HclListItem name="storagegateway_endpoint_url">
<HclListItemDescription>

If you have private dns enabled, then your API calls would automatically go through the VPC Endpoint. Otherwise, you need to explicitly to use this endpoint.

</HclListItemDescription>
</HclListItem>

<HclListItem name="storagegateway_network_interface_ids">
</HclListItem>

<HclListItem name="sts_endpoint_url">
<HclListItemDescription>

If you have private dns enabled, then your API calls would automatically go through the VPC Endpoint. Otherwise, you need to explicitly to use this endpoint.

</HclListItemDescription>
</HclListItem>

<HclListItem name="sts_streams_endpoint_id">
</HclListItem>

<HclListItem name="sts_streams_network_interface_ids">
</HclListItem>

<HclListItem name="textract_endpoint_id">
</HclListItem>

<HclListItem name="textract_endpoint_url">
<HclListItemDescription>

If you have private dns enabled, then your streaming calls would automatically go through the VPC Endpoint. Otherwise, you need to explicitly to use this endpoint.

</HclListItemDescription>
</HclListItem>

<HclListItem name="textract_network_interface_ids">
</HclListItem>

<HclListItem name="transfer_endpoint_id">
</HclListItem>

<HclListItem name="transfer_endpoint_url">
<HclListItemDescription>

If you have private dns enabled, then your API calls would automatically go through the VPC Endpoint. Otherwise, you need to explicitly to use this endpoint.

</HclListItemDescription>
</HclListItem>

<HclListItem name="transfer_network_interface_ids">
</HclListItem>

<HclListItem name="transferserver_endpoint_id">
</HclListItem>

<HclListItem name="transferserver_endpoint_url">
<HclListItemDescription>

If you have private dns enabled, then your API calls would automatically go through the VPC Endpoint. Otherwise, you need to explicitly to use this endpoint.

</HclListItemDescription>
</HclListItem>

<HclListItem name="transferserver_network_interface_ids">
</HclListItem>

<HclListItem name="workspaces_endpoint_id">
</HclListItem>

<HclListItem name="workspaces_endpoint_url">
<HclListItemDescription>

If you have private dns enabled, then your streaming calls would automatically go through the VPC Endpoint. Otherwise, you need to explicitly to use this endpoint.

</HclListItemDescription>
</HclListItem>

<HclListItem name="workspaces_network_interface_ids">
</HclListItem>

</TabItem>
</Tabs>

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.28.8/modules/vpc-interface-endpoint/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.28.8/modules/vpc-interface-endpoint/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.28.8/modules/vpc-interface-endpoint/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "cb332fff5901373f9044114a3dab72a0"
}
##DOCS-SOURCER-END -->

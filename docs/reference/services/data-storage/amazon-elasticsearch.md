---
type: "service"
name: "Amazon Elasticsearch"
description: "Deploy and manage Amazon Elasticsearch Service."
category: "nosql"
cloud: "aws"
tags: ["analytics","data"]
license: "gruntwork"
built-with: "terraform"
title: "Amazon Elasticsearch Service"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue } from '../../../../src/components/HclListItem.tsx';

<VersionBadge version="0.90.2" lastModifiedVersion="0.90.0"/>

# Amazon Elasticsearch Service


<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.90.2/modules/data-stores/elasticsearch" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases?q=data-stores%2Felasticsearch" className="link-button" title="Release notes for only the service catalog versions which impacted this service.">Release Notes</a>

## Overview

This service contains code to deploy an Amazon Elasticsearch Service cluster.
See the [Amazon Elasticsearch Service documentation](http://docs.aws.amazon.com/elasticsearch-service/latest/developerguide/what-is-amazon-elasticsearch-service.html)
and the [Getting Started](https://aws.amazon.com/elasticsearch-service/getting-started/) page for more information.

## Features

*   A fully-managed native Elasticsearch cluster in a VPC
*   A fully functional Kibana UI
*   VPC-based security
*   Zone awareness, i.e., deployment of Elasticsearch nodes across Availability Zones
*   Automatic nightly snapshots
*   CloudWatch Alarms for alerting when CPU, memory, and disk metrics exceed certain thresholds

## Learn

:::note

This repo is a part of the [Gruntwork Service Catalog](https://github.com/gruntwork-io/terraform-aws-service-catalog/),
a collection of reusable, battle-tested, production ready infrastructure code.
If you’ve never used the Service Catalog before, make sure to read
[How to use the Gruntwork Service Catalog](https://docs.gruntwork.io/reference/services/intro/overview)!

:::

*   [About Amazon Elasticsearch Service](https://aws.amazon.com/elasticsearch-service/)
*   [Features of Amazon ES](https://aws.amazon.com/elasticsearch-service/features/)
*   [Developer Guide](https://docs.aws.amazon.com/elasticsearch-service/latest/developerguide/what-is-amazon-elasticsearch-service.html):
    Contains the main documentation on how to use Amazon ES and answers questions such as "What is Amazon Elasticsearch
    Service?"
*   [Streaming CloudWatch monitoring logs to Amazon Elasticsearch Service](https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/CWL_ES_Stream.html)

## Deploy

### Non-production deployment (quick start for learning)

If you just want to try this repo out for experimenting and learning, check out the following resources:

*   [examples/for-learning-and-testing folder](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.90.2/examples/for-learning-and-testing): The
    `examples/for-learning-and-testing` folder contains standalone sample code optimized for learning, experimenting, and
    testing (but not direct production usage).

*   [AWS Free tier](https://aws.amazon.com/free/): Using Amazon ES on Amazon’s free tier is a great way to get started,
    but it has limited features and does not include encryption at rest, ultra warm data notes, or advanced security
    options such as fine-grained access control. The free tier does allow multiple availability zones, VPC-based access
    control, TLS-only requests, and node-to-node encryption.

### Production deployment

If you want to deploy this repo in production, check out the following resources:

*   [examples/for-production folder](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.90.2/examples/for-production): The `examples/for-production` folder contains sample code
    optimized for direct usage in production. This is code from the [Gruntwork Reference Architecture](https://gruntwork.io/reference-architecture/),
    and it shows you how we build an end-to-end, integrated tech stack on top of the Gruntwork Service Catalog.

*   [Amazon Elasticsearch Service pricing](https://aws.amazon.com/elasticsearch-service/pricing/)

## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Required

<HclListItem name="domain_name" requirement="required" type="string">
<HclListItemDescription>

The name of the Elasticsearch cluster. It must be unique to your account and region, start with a lowercase letter, contain between 3 and 28 characters, and contain only lowercase letters a-z, the numbers 0-9, and the hyphen (-).

</HclListItemDescription>
</HclListItem>

<HclListItem name="instance_count" requirement="required" type="number">
<HclListItemDescription>

The number of instances to deploy in the Elasticsearch cluster. This must be an even number if zone_awareness_enabled is true.

</HclListItemDescription>
</HclListItem>

<HclListItem name="instance_type" requirement="required" type="string">
<HclListItemDescription>

The instance type to use for Elasticsearch data nodes (e.g., t2.small.elasticsearch, or m4.large.elasticsearch). For supported instance types see https://docs.aws.amazon.com/elasticsearch-service/latest/developerguide/aes-supported-instance-types.html.

</HclListItemDescription>
</HclListItem>

<HclListItem name="volume_size" requirement="required" type="number">
<HclListItemDescription>

The size in GiB of the EBS volume for each node in the cluster (e.g. 10, or 512). For volume size limits see https://docs.aws.amazon.com/elasticsearch-service/latest/developerguide/aes-limits.html.

</HclListItemDescription>
</HclListItem>

<HclListItem name="volume_type" requirement="required" type="string">
<HclListItemDescription>

The type of EBS volumes to use in the cluster. Must be one of: standard, gp2, io1, sc1, or st1. For a comparison of EBS volume types, see https://docs.aws.amazon.com/AWSEC2/latest/WindowsGuide/ebs-volume-types.html.

</HclListItemDescription>
</HclListItem>

<HclListItem name="zone_awareness_enabled" requirement="required" type="bool">
<HclListItemDescription>

Whether to deploy the Elasticsearch nodes across two Availability Zones instead of one. Note that if you enable this, the instance_count MUST be an even number.

</HclListItemDescription>
</HclListItem>

### Optional

<HclListItem name="advanced_options" requirement="optional" type="map(any)">
<HclListItemDescription>

Key-value string pairs to specify advanced configuration options. Note that the values for these configuration options must be strings (wrapped in quotes).

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
Any types represent complex values of variable type. For details, please consult `variables.tf` in the source repo.
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="advanced_security_options" requirement="optional" type="bool">
<HclListItemDescription>

Enable fine grain access control

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="alarm_sns_topic_arns" requirement="optional" type="list(string)">
<HclListItemDescription>

ARNs of the SNS topics associated with the CloudWatch alarms for the Elasticsearch cluster.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="allow_connections_from_cidr_blocks" requirement="optional" type="set(string)">
<HclListItemDescription>

The list of network CIDR blocks to allow network access to Aurora from. One of <a href="#allow_connections_from_cidr_blocks"><code>allow_connections_from_cidr_blocks</code></a> or <a href="#allow_connections_from_security_groups"><code>allow_connections_from_security_groups</code></a> must be specified for the database to be reachable.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="allow_connections_from_security_groups" requirement="optional" type="set(string)">
<HclListItemDescription>

The list of IDs or Security Groups to allow network access to Aurora from. All security groups must either be in the VPC specified by <a href="#vpc_id"><code>vpc_id</code></a>, or a peered VPC with the VPC specified by <a href="#vpc_id"><code>vpc_id</code></a>. One of <a href="#allow_connections_from_cidr_blocks"><code>allow_connections_from_cidr_blocks</code></a> or <a href="#allow_connections_from_security_groups"><code>allow_connections_from_security_groups</code></a> must be specified for the database to be reachable.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="automated_snapshot_start_hour" requirement="optional" type="number">
<HclListItemDescription>

Hour during which the service takes an automated daily snapshot of the indices in the domain. This setting has no effect on Elasticsearch 5.3 and later.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="0"/>
</HclListItem>

<HclListItem name="availability_zone_count" requirement="optional" type="number">
<HclListItemDescription>

Number of Availability Zones for the domain to use with <a href="#zone_awareness_enabled"><code>zone_awareness_enabled</code></a>. Defaults to 2. Valid values: 2 or 3.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="2"/>
</HclListItem>

<HclListItem name="create_service_linked_role" requirement="optional" type="bool">
<HclListItemDescription>

Whether or not the Service Linked Role for Elasticsearch should be created within this module. Normally the service linked role is created automatically by AWS when creating the Elasticsearch domain in the web console, but API does not implement this logic. You can either have AWS automatically manage this by creating a domain manually in the console, or manage it in terraform using the landing zone modules or this variable.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="custom_endpoint" requirement="optional" type="string">
<HclListItemDescription>

Fully qualified domain for your custom endpoint.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="custom_endpoint_certificate_arn" requirement="optional" type="string">
<HclListItemDescription>

ACM certificate ARN for your custom endpoint.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="custom_endpoint_enabled" requirement="optional" type="bool">
<HclListItemDescription>

Whether to enable custom endpoint for the Elasticsearch domain.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="custom_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

A map of custom tags to apply to the ElasticSearch Domain. The key is the tag name and the value is the tag value.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="dedicated_master_count" requirement="optional" type="number">
<HclListItemDescription>

The number of dedicated master nodes to run. We recommend setting this to 3 for production deployments. Only used if <a href="#dedicated_master_enabled"><code>dedicated_master_enabled</code></a> is true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="dedicated_master_enabled" requirement="optional" type="bool">
<HclListItemDescription>

Whether to deploy separate nodes specifically for performing cluster management tasks (e.g. tracking number of nodes, monitoring health, replicating changes). This increases the stability of large clusters and is required for clusters with more than 10 nodes.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="dedicated_master_type" requirement="optional" type="string">
<HclListItemDescription>

The instance type for the dedicated master nodes. These nodes can use a different instance type than the rest of the cluster. Only used if <a href="#dedicated_master_enabled"><code>dedicated_master_enabled</code></a> is true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="ebs_enabled" requirement="optional" type="bool">
<HclListItemDescription>

Set to false to disable EBS volumes. This is useful for nodes that have optimized instance storage, like hosts running the i3 instance type.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="elasticsearch_version" requirement="optional" type="string">
<HclListItemDescription>

The version of Elasticsearch to deploy.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;7.7&quot;"/>
</HclListItem>

<HclListItem name="enable_cloudwatch_alarms" requirement="optional" type="bool">
<HclListItemDescription>

Set to true to enable several basic CloudWatch alarms around CPU usage, memory usage, and disk space usage. If set to true, make sure to specify SNS topics to send notifications to using <a href="#alarms_sns_topic_arns"><code>alarms_sns_topic_arns</code></a>.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="enable_encryption_at_rest" requirement="optional" type="bool">
<HclListItemDescription>

False by default because encryption at rest is not included in the free tier. When true, the Elasticsearch domain storage will be encrypted at rest using the KMS key described with <a href="#encryption_kms_key_id"><code>encryption_kms_key_id</code></a>. We strongly recommend configuring a custom KMS key instead of using the shared service key for a better security posture when configuring encryption at rest.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="enable_node_to_node_encryption" requirement="optional" type="bool">
<HclListItemDescription>

Whether to enable node-to-node encryption. 

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="encryption_kms_key_id" requirement="optional" type="string">
<HclListItemDescription>

The ID of the KMS key to use to encrypt the Elasticsearch domain storage. Only used if enable_encryption_at_rest. When null, uses the aws/es service KMS key.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="iam_principal_arns" requirement="optional" type="list(string)">
<HclListItemDescription>

The ARNS of the IAM users and roles to which to allow full access to the Elasticsearch cluster. Setting this to a restricted list is useful when using a public access cluster.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[
  &quot;*&quot;
]"/>
</HclListItem>

<HclListItem name="internal_user_database_enabled" requirement="optional" type="bool">
<HclListItemDescription>

Whether the internal user database is enabled. Enable this to use master accounts. Only used if advanced_security_options is set to true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="iops" requirement="optional" type="number">
<HclListItemDescription>

The baseline input/output (I/O) performance of EBS volumes attached to data nodes. Must be between 1000 and 4000. Applicable only if <a href="#volume_type"><code>volume_type</code></a> is io1.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="is_public" requirement="optional" type="bool">
<HclListItemDescription>

Whether the cluster is publicly accessible.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="master_user_arn" requirement="optional" type="string">
<HclListItemDescription>

ARN of the master user. Only used if advanced_security_options and internal_user_database_enabled are set to true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="master_user_name" requirement="optional" type="string">
<HclListItemDescription>

Master account user name. Only used if advanced_security_options and internal_user_database_enabled are set to true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="master_user_password" requirement="optional" type="string">
<HclListItemDescription>

Master account user password. Only used if advanced_security_options and internal_user_database_enabled are set to true. WARNING: this password will be stored in Terraform state.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="subnet_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

 List of VPC Subnet IDs for the Elasticsearch domain endpoints to be created in. If <a href="#zone_awareness_enabled"><code>zone_awareness_enabled</code></a> is true, the first 2 or 3 provided subnet ids are used, depending on <a href="#availability_zone_count"><code>availability_zone_count</code></a>. Otherwise only the first one is used.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="tls_security_policy" requirement="optional" type="string">
<HclListItemDescription>

The name of the TLS security policy that needs to be applied to the HTTPS endpoint. Valid values are Policy-Min-TLS-1-0-2019-07 and Policy-Min-TLS-1-2-2019-07. Terraform performs drift detection if this is configured.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;Policy-Min-TLS-1-2-2019-07&quot;"/>
</HclListItem>

<HclListItem name="update_timeout" requirement="optional" type="string">
<HclListItemDescription>

How long to wait for updates to the ES cluster before timing out and reporting an error.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;90m&quot;"/>
</HclListItem>

<HclListItem name="vpc_id" requirement="optional" type="string">
<HclListItemDescription>

The id of the VPC to deploy into. It must be in the same region as the Elasticsearch domain and its tenancy must be set to Default. If zone_awareness_enabled is false, the Elasticsearch cluster will have an endpoint in one subnet of the VPC; otherwise it will have endpoints in two subnets.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="cluster_arn">
<HclListItemDescription>

The ARN of the Elasticsearch cluster created by this module.

</HclListItemDescription>
</HclListItem>

<HclListItem name="cluster_domain_id">
<HclListItemDescription>

The domain ID of the Elasticsearch cluster created by this module.

</HclListItemDescription>
</HclListItem>

<HclListItem name="cluster_domain_name">
<HclListItemDescription>

The name of the Elasticsearch domain.

</HclListItemDescription>
</HclListItem>

<HclListItem name="cluster_endpoint">
<HclListItemDescription>

The endpoint of the Elasticsearch cluster created by this module.

</HclListItemDescription>
</HclListItem>

<HclListItem name="cluster_security_group_id">
<HclListItemDescription>

If the domain was created inside a VPC, the ID of the security group created by this module for securing the Elasticsearch cluster.

</HclListItemDescription>
</HclListItem>

<HclListItem name="kibana_endpoint">
<HclListItemDescription>

Domain-specific endpoint for Kibana without https scheme.

</HclListItemDescription>
</HclListItem>

</TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.90.2/modules%2Fdata-stores%2Felasticsearch%2FREADME.md",
    "https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.90.2/modules%2Fdata-stores%2Felasticsearch%2Fvariables.tf",
    "https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.90.2/modules%2Fdata-stores%2Felasticsearch%2Foutputs.tf"
  ],
  "sourcePlugin": "service-catalog-api",
  "hash": "0faebf650dd1c6b81724459903a6a5da"
}
##DOCS-SOURCER-END -->

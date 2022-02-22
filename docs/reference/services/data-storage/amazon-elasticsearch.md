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

<VersionBadge version="0.78.1"/>

# Amazon Elasticsearch Service


<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/modules/data-stores/elasticsearch" className="link-button">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases?q=data-stores/elasticsearch" className="link-button" title="Release notes for only the service catalog versions which impacted this service.">Filtered Release Notes</a>

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

*   [examples/for-learning-and-testing folder](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/examples/for-learning-and-testing): The
    `examples/for-learning-and-testing` folder contains standalone sample code optimized for learning, experimenting, and
    testing (but not direct production usage).

*   [AWS Free tier](https://aws.amazon.com/free/): Using Amazon ES on Amazon’s free tier is a great way to get started,
    but it has limited features and does not include encryption at rest, ultra warm data notes, or advanced security
    options such as fine-grained access control. The free tier does allow multiple availability zones, VPC-based access
    control, TLS-only requests, and node-to-node encryption.

### Production deployment

If you want to deploy this repo in production, check out the following resources:

*   [examples/for-production folder](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/examples/for-production): The `examples/for-production` folder contains sample code
    optimized for direct usage in production. This is code from the [Gruntwork Reference Architecture](https://gruntwork.io/reference-architecture/),
    and it shows you how we build an end-to-end, integrated tech stack on top of the Gruntwork Service Catalog.

*   [Amazon Elasticsearch Service pricing](https://aws.amazon.com/elasticsearch-service/pricing/)

## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

<a name="advanced_options" className="snap-top"></a>

* [**`advanced_options`**](#advanced_options) &mdash; Key-value string pairs to specify advanced configuration options. Note that the values for these configuration options must be strings (wrapped in quotes).

<a name="advanced_security_options" className="snap-top"></a>

* [**`advanced_security_options`**](#advanced_security_options) &mdash; Enable fine grain access control

<a name="alarm_sns_topic_arns" className="snap-top"></a>

* [**`alarm_sns_topic_arns`**](#alarm_sns_topic_arns) &mdash; ARNs of the SNS topics associated with the CloudWatch alarms for the Elasticsearch cluster.

<a name="allow_connections_from_cidr_blocks" className="snap-top"></a>

* [**`allow_connections_from_cidr_blocks`**](#allow_connections_from_cidr_blocks) &mdash; The list of network CIDR blocks to allow network access to Aurora from. One of [`allow_connections_from_cidr_blocks`](#allow_connections_from_cidr_blocks) or [`allow_connections_from_security_groups`](#allow_connections_from_security_groups) must be specified for the database to be reachable.

<a name="allow_connections_from_security_groups" className="snap-top"></a>

* [**`allow_connections_from_security_groups`**](#allow_connections_from_security_groups) &mdash; The list of IDs or Security Groups to allow network access to Aurora from. All security groups must either be in the VPC specified by [`vpc_id`](#vpc_id), or a peered VPC with the VPC specified by [`vpc_id`](#vpc_id). One of [`allow_connections_from_cidr_blocks`](#allow_connections_from_cidr_blocks) or [`allow_connections_from_security_groups`](#allow_connections_from_security_groups) must be specified for the database to be reachable.

<a name="automated_snapshot_start_hour" className="snap-top"></a>

* [**`automated_snapshot_start_hour`**](#automated_snapshot_start_hour) &mdash; Hour during which the service takes an automated daily snapshot of the indices in the domain. This setting has no effect on Elasticsearch 5.3 and later.

<a name="availability_zone_count" className="snap-top"></a>

* [**`availability_zone_count`**](#availability_zone_count) &mdash; Number of Availability Zones for the domain to use with [`zone_awareness_enabled`](#zone_awareness_enabled). Defaults to 2. Valid values: 2 or 3.

<a name="create_service_linked_role" className="snap-top"></a>

* [**`create_service_linked_role`**](#create_service_linked_role) &mdash; Whether or not the Service Linked Role for Elasticsearch should be created within this module. Normally the service linked role is created automatically by AWS when creating the Elasticsearch domain in the web console, but API does not implement this logic. You can either have AWS automatically manage this by creating a domain manually in the console, or manage it in terraform using the landing zone modules or this variable.

<a name="custom_endpoint" className="snap-top"></a>

* [**`custom_endpoint`**](#custom_endpoint) &mdash; Fully qualified domain for your custom endpoint.

<a name="custom_endpoint_certificate_arn" className="snap-top"></a>

* [**`custom_endpoint_certificate_arn`**](#custom_endpoint_certificate_arn) &mdash; ACM certificate ARN for your custom endpoint.

<a name="custom_endpoint_enabled" className="snap-top"></a>

* [**`custom_endpoint_enabled`**](#custom_endpoint_enabled) &mdash; Whether to enable custom endpoint for the Elasticsearch domain.

<a name="custom_tags" className="snap-top"></a>

* [**`custom_tags`**](#custom_tags) &mdash; A map of custom tags to apply to the ElasticSearch Domain. The key is the tag name and the value is the tag value.

<a name="dedicated_master_count" className="snap-top"></a>

* [**`dedicated_master_count`**](#dedicated_master_count) &mdash; The number of dedicated master nodes to run. We recommend setting this to 3 for production deployments. Only used if [`dedicated_master_enabled`](#dedicated_master_enabled) is true.

<a name="dedicated_master_enabled" className="snap-top"></a>

* [**`dedicated_master_enabled`**](#dedicated_master_enabled) &mdash; Whether to deploy separate nodes specifically for performing cluster management tasks (e.g. tracking number of nodes, monitoring health, replicating changes). This increases the stability of large clusters and is required for clusters with more than 10 nodes.

<a name="dedicated_master_type" className="snap-top"></a>

* [**`dedicated_master_type`**](#dedicated_master_type) &mdash; The instance type for the dedicated master nodes. These nodes can use a different instance type than the rest of the cluster. Only used if [`dedicated_master_enabled`](#dedicated_master_enabled) is true.

<a name="domain_name" className="snap-top"></a>

* [**`domain_name`**](#domain_name) &mdash; The name of the Elasticsearch cluster. It must be unique to your account and region, start with a lowercase letter, contain between 3 and 28 characters, and contain only lowercase letters a-z, the numbers 0-9, and the hyphen (-).

<a name="ebs_enabled" className="snap-top"></a>

* [**`ebs_enabled`**](#ebs_enabled) &mdash; Set to false to disable EBS volumes. This is useful for nodes that have optimized instance storage, like hosts running the i3 instance type.

<a name="elasticsearch_version" className="snap-top"></a>

* [**`elasticsearch_version`**](#elasticsearch_version) &mdash; The version of Elasticsearch to deploy.

<a name="enable_cloudwatch_alarms" className="snap-top"></a>

* [**`enable_cloudwatch_alarms`**](#enable_cloudwatch_alarms) &mdash; Set to true to enable several basic CloudWatch alarms around CPU usage, memory usage, and disk space usage. If set to true, make sure to specify SNS topics to send notifications to using [`alarms_sns_topic_arns`](#alarms_sns_topic_arns).

<a name="enable_encryption_at_rest" className="snap-top"></a>

* [**`enable_encryption_at_rest`**](#enable_encryption_at_rest) &mdash; False by default because encryption at rest is not included in the free tier. When true, the Elasticsearch domain storage will be encrypted at rest using the KMS key described with [`encryption_kms_key_id`](#encryption_kms_key_id). We strongly recommend configuring a custom KMS key instead of using the shared service key for a better security posture when configuring encryption at rest.

<a name="enable_node_to_node_encryption" className="snap-top"></a>

* [**`enable_node_to_node_encryption`**](#enable_node_to_node_encryption) &mdash; Whether to enable node-to-node encryption. 

<a name="encryption_kms_key_id" className="snap-top"></a>

* [**`encryption_kms_key_id`**](#encryption_kms_key_id) &mdash; The ID of the KMS key to use to encrypt the Elasticsearch domain storage. Only used if [`enable_encryption_at_rest`](#enable_encryption_at_rest). When null, uses the aws/es service KMS key.

<a name="iam_principal_arns" className="snap-top"></a>

* [**`iam_principal_arns`**](#iam_principal_arns) &mdash; The ARNS of the IAM users and roles to which to allow full access to the Elasticsearch cluster. Setting this to a restricted list is useful when using a public access cluster.

<a name="instance_count" className="snap-top"></a>

* [**`instance_count`**](#instance_count) &mdash; The number of instances to deploy in the Elasticsearch cluster. This must be an even number if [`zone_awareness_enabled`](#zone_awareness_enabled) is true.

<a name="instance_type" className="snap-top"></a>

* [**`instance_type`**](#instance_type) &mdash; The instance type to use for Elasticsearch data nodes (e.g., t2.small.elasticsearch, or m4.large.elasticsearch). For supported instance types see https://docs.aws.amazon.com/elasticsearch-service/latest/developerguide/aes-supported-instance-types.html.

<a name="internal_user_database_enabled" className="snap-top"></a>

* [**`internal_user_database_enabled`**](#internal_user_database_enabled) &mdash; Whether the internal user database is enabled. Enable this to use master accounts. Only used if [`advanced_security_options`](#advanced_security_options) is set to true.

<a name="iops" className="snap-top"></a>

* [**`iops`**](#iops) &mdash; The baseline input/output (I/O) performance of EBS volumes attached to data nodes. Must be between 1000 and 4000. Applicable only if [`volume_type`](#volume_type) is io1.

<a name="is_public" className="snap-top"></a>

* [**`is_public`**](#is_public) &mdash; Whether the cluster is publicly accessible.

<a name="master_user_arn" className="snap-top"></a>

* [**`master_user_arn`**](#master_user_arn) &mdash; ARN of the master user. Only used if [`advanced_security_options`](#advanced_security_options) and [`internal_user_database_enabled`](#internal_user_database_enabled) are set to true.

<a name="master_user_name" className="snap-top"></a>

* [**`master_user_name`**](#master_user_name) &mdash; Master account user name. Only used if [`advanced_security_options`](#advanced_security_options) and [`internal_user_database_enabled`](#internal_user_database_enabled) are set to true.

<a name="master_user_password" className="snap-top"></a>

* [**`master_user_password`**](#master_user_password) &mdash; Master account user password. Only used if [`advanced_security_options`](#advanced_security_options) and [`internal_user_database_enabled`](#internal_user_database_enabled) are set to true. WARNING: this password will be stored in Terraform state.

<a name="subnet_ids" className="snap-top"></a>

* [**`subnet_ids`**](#subnet_ids) &mdash;  List of VPC Subnet IDs for the Elasticsearch domain endpoints to be created in. If [`zone_awareness_enabled`](#zone_awareness_enabled) is true, the first 2 or 3 provided subnet ids are used, depending on [`availability_zone_count`](#availability_zone_count). Otherwise only the first one is used.

<a name="tls_security_policy" className="snap-top"></a>

* [**`tls_security_policy`**](#tls_security_policy) &mdash; The name of the TLS security policy that needs to be applied to the HTTPS endpoint. Valid values are Policy-Min-TLS-1-0-2019-07 and Policy-Min-TLS-1-2-2019-07. Terraform performs drift detection if this is configured.

<a name="update_timeout" className="snap-top"></a>

* [**`update_timeout`**](#update_timeout) &mdash; How long to wait for updates to the ES cluster before timing out and reporting an error.

<a name="volume_size" className="snap-top"></a>

* [**`volume_size`**](#volume_size) &mdash; The size in GiB of the EBS volume for each node in the cluster (e.g. 10, or 512). For volume size limits see https://docs.aws.amazon.com/elasticsearch-service/latest/developerguide/aes-limits.html.

<a name="volume_type" className="snap-top"></a>

* [**`volume_type`**](#volume_type) &mdash; The type of EBS volumes to use in the cluster. Must be one of: standard, gp2, io1, sc1, or st1. For a comparison of EBS volume types, see https://docs.aws.amazon.com/AWSEC2/latest/WindowsGuide/ebs-volume-types.html.

<a name="vpc_id" className="snap-top"></a>

* [**`vpc_id`**](#vpc_id) &mdash; The id of the VPC to deploy into. It must be in the same region as the Elasticsearch domain and its tenancy must be set to Default. If [`zone_awareness_enabled`](#zone_awareness_enabled) is false, the Elasticsearch cluster will have an endpoint in one subnet of the VPC; otherwise it will have endpoints in two subnets.

<a name="zone_awareness_enabled" className="snap-top"></a>

* [**`zone_awareness_enabled`**](#zone_awareness_enabled) &mdash; Whether to deploy the Elasticsearch nodes across two Availability Zones instead of one. Note that if you enable this, the [`instance_count`](#instance_count) MUST be an even number.

</TabItem>
<TabItem value="outputs" label="Outputs">

<a name="cluster_arn" className="snap-top"></a>

* [**`cluster_arn`**](#cluster_arn) &mdash; The ARN of the Elasticsearch cluster created by this module.

<a name="cluster_domain_id" className="snap-top"></a>

* [**`cluster_domain_id`**](#cluster_domain_id) &mdash; The domain ID of the Elasticsearch cluster created by this module.

<a name="cluster_domain_name" className="snap-top"></a>

* [**`cluster_domain_name`**](#cluster_domain_name) &mdash; The name of the Elasticsearch domain.

<a name="cluster_endpoint" className="snap-top"></a>

* [**`cluster_endpoint`**](#cluster_endpoint) &mdash; The endpoint of the Elasticsearch cluster created by this module.

<a name="cluster_security_group_id" className="snap-top"></a>

* [**`cluster_security_group_id`**](#cluster_security_group_id) &mdash; If the domain was created inside a VPC, the ID of the security group created by this module for securing the Elasticsearch cluster.

<a name="kibana_endpoint" className="snap-top"></a>

* [**`kibana_endpoint`**](#kibana_endpoint) &mdash; Domain-specific endpoint for Kibana without https scheme.

</TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"service-catalog-api","hash":"f386e96a65696527747ffd03c77226b8"}
##DOCS-SOURCER-END -->

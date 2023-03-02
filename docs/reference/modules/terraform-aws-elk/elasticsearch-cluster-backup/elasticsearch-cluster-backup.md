---
title: "Elasticsearch Cluster Backup"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="ELK AWS Module" version="0.11.1" />

# Elasticsearch Cluster Backup

<a href="https://github.com/gruntwork-io/terraform-aws-elk/tree/master/modules/elasticsearch-cluster-backup" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-elk/releases?q=" className="link-button" title="Release notes for only the service catalog versions which impacted this service.">Release Notes</a>

This folder contains a [Terraform](https://www.terraform.io/) module to take and backup snapshots of an [Elasticsearch](https://www.elastic.co/products/kibana) cluster to an S3 bucket. The module is a scheduled lambda function that calls the Elasticsearch API to perform snapshotting and backup related tasks documented [here](https://www.elastic.co/guide/en/elasticsearch/reference/current/modules-snapshots.html);

## Terminologies

*   **Snapshot**: A snapshot represents the current state of the indices in an Elasticsearch cluster. This is the information stored in a backup repository.
*   **Repository**: A repository is an Elasticsearch abstraction over a storage medium like a Shared File System, S3 Bucket, HDFS etc. It's used to identify where snapshot files are stored and doesn't contain any snapshots itself.

## Taking Backups

Cluster snapshots are incremental. The first snapshot is always a full dump of the cluster and subsequent ones are a delta between the current state of the cluster and the previous snapshot. Snapshots are typically contained in `.dat` files stored in the storage medium (in this case S3) the repository points to.

### CPU and Memory Usage

Snapshots are usually run on a single node which automatically co-ordinates with other nodes to ensure completenss of data. Backup of a cluster with a large volume of data will lead to high CPU and memory usage on the node performing the backup. This module makes backup requests to the cluster through the load balancer which routes the request to one of the nodes, during backup, if the selected node is unable to handle incoming requests the load balancer will direct the request to other nodes.

### Frequency of Backups

How often you make backups depends entirely on the size of your deployment and the importance of your data. Larger clusters with high volume usage will typically need to be backed up more frequently than low volume clusters because of the amount of data change between snapshots. It's a safe bet to start off running backups on a nightly schedule and then continually tweak the schedule based on the demands of your cluster.

### Backup Notification

The time it takes to backup a cluster is dependent on the volume of data. However, since the backup module is implemened as a Lambda function which has a maximum execution time of 5 minutes a separate notification Lambda is kicked off. A Cloudwatch metric is incremented any time the notification lambda confirms that a backup occured and an alarm connected to that metric notifies you where or not it was updated.

## Restoring Backups

Restoring snapshots is handled by the [elasticsearch-cluster-restore module](https://github.com/gruntwork-io/terraform-aws-elk/tree/master/modules/elasticsearch-cluster-restore).

## Sample Usage

<ModuleUsage>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S ELASTICSEARCH-CLUSTER-BACKUP MODULE
# ------------------------------------------------------------------------------------------------------

module "elasticsearch_cluster_backup" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-elk.git//modules/elasticsearch-cluster-backup?ref=v0.11.1"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # How often, in seconds, the backup lambda function is expected to run. You should
  # factor in the amount of time it takes to backup your cluster.
  alarm_period = <INPUT REQUIRED>

  # The ARN of SNS topics to notify if the CloudWatch alarm goes off because the
  # backup job failed.
  alarm_sns_topic_arns = <INPUT REQUIRED>

  # The S3 bucket that the specified repository will be associated with and where
  # all snapshots will be stored
  bucket = <INPUT REQUIRED>

  # The name for the CloudWatch Metric the AWS lambda backup function will increment
  # every time the job completes successfully.
  cloudwatch_metric_name = <INPUT REQUIRED>

  # The namespace for the CloudWatch Metric the AWS lambda backup function will
  # increment every time the job completes successfully.
  cloudwatch_metric_namespace = <INPUT REQUIRED>

  # The DNS to the Load Balancer in front of the Elasticsearch cluster
  elasticsearch_dns = <INPUT REQUIRED>

  # The name of the Lambda function. Used to namespace all resources created by this
  # module.
  name = <INPUT REQUIRED>

  # The AWS region (e.g us-east-1) where the backup S3 bucket exists.
  region = <INPUT REQUIRED>

  # The name of the repository that will be associated with the created snapshots
  repository = <INPUT REQUIRED>

  # An expression that defines the schedule for this lambda job. For example, cron(0
  # 20 * * ? *) or rate(5 minutes).
  schedule_expression = <INPUT REQUIRED>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The port on which the API requests will be made to the Elasticsearch cluster
  elasticsearch_port = 9200

  # The runtime to use for the Lambda function. Should be a Node.js runtime.
  lambda_runtime = "nodejs14.x"

  # Specifies the protocol to use when making the request to the Elasticsearch
  # cluster. Possible values are HTTP or HTTPS
  protocol = "http"

  # Set to true to give your Lambda function access to resources within a VPC.
  run_in_vpc = false

  # A list of subnet IDs the Lambda function should be able to access within your
  # VPC. Only used if var.run_in_vpc is true.
  subnet_ids = []

  # The ID of the VPC the Lambda function should be able to access. Only used if
  # var.run_in_vpc is true.
  vpc_id = null

}

```

</ModuleUsage>




## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Required

<HclListItem name="alarm_period" requirement="required" type="number">
<HclListItemDescription>

How often, in seconds, the backup lambda function is expected to run. You should factor in the amount of time it takes to backup your cluster.

</HclListItemDescription>
</HclListItem>

<HclListItem name="alarm_sns_topic_arns" requirement="required" type="list(string)">
<HclListItemDescription>

The ARN of SNS topics to notify if the CloudWatch alarm goes off because the backup job failed.

</HclListItemDescription>
</HclListItem>

<HclListItem name="bucket" requirement="required" type="string">
<HclListItemDescription>

The S3 bucket that the specified repository will be associated with and where all snapshots will be stored

</HclListItemDescription>
</HclListItem>

<HclListItem name="cloudwatch_metric_name" requirement="required" type="string">
<HclListItemDescription>

The name for the CloudWatch Metric the AWS lambda backup function will increment every time the job completes successfully.

</HclListItemDescription>
</HclListItem>

<HclListItem name="cloudwatch_metric_namespace" requirement="required" type="string">
<HclListItemDescription>

The namespace for the CloudWatch Metric the AWS lambda backup function will increment every time the job completes successfully.

</HclListItemDescription>
</HclListItem>

<HclListItem name="elasticsearch_dns" requirement="required" type="string">
<HclListItemDescription>

The DNS to the Load Balancer in front of the Elasticsearch cluster

</HclListItemDescription>
</HclListItem>

<HclListItem name="name" requirement="required" type="string">
<HclListItemDescription>

The name of the Lambda function. Used to namespace all resources created by this module.

</HclListItemDescription>
</HclListItem>

<HclListItem name="region" requirement="required" type="string">
<HclListItemDescription>

The AWS region (e.g us-east-1) where the backup S3 bucket exists.

</HclListItemDescription>
</HclListItem>

<HclListItem name="repository" requirement="required" type="string">
<HclListItemDescription>

The name of the repository that will be associated with the created snapshots

</HclListItemDescription>
</HclListItem>

<HclListItem name="schedule_expression" requirement="required" type="string">
<HclListItemDescription>

An expression that defines the schedule for this lambda job. For example, cron(0 20 * * ? *) or rate(5 minutes).

</HclListItemDescription>
</HclListItem>

### Optional

<HclListItem name="elasticsearch_port" requirement="optional" type="number">
<HclListItemDescription>

The port on which the API requests will be made to the Elasticsearch cluster

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="9200"/>
</HclListItem>

<HclListItem name="lambda_runtime" requirement="optional" type="string">
<HclListItemDescription>

The runtime to use for the Lambda function. Should be a Node.js runtime.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;nodejs14.x&quot;"/>
</HclListItem>

<HclListItem name="protocol" requirement="optional" type="string">
<HclListItemDescription>

Specifies the protocol to use when making the request to the Elasticsearch cluster. Possible values are HTTP or HTTPS

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;http&quot;"/>
</HclListItem>

<HclListItem name="run_in_vpc" requirement="optional" type="bool">
<HclListItemDescription>

Set to true to give your Lambda function access to resources within a VPC.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="subnet_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of subnet IDs the Lambda function should be able to access within your VPC. Only used if <a href="#run_in_vpc"><code>run_in_vpc</code></a> is true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="vpc_id" requirement="optional" type="string">
<HclListItemDescription>

The ID of the VPC the Lambda function should be able to access. Only used if <a href="#run_in_vpc"><code>run_in_vpc</code></a> is true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="lambda_arn">
</HclListItem>

<HclListItem name="lambda_name">
</HclListItem>

</TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-elk/tree/master/modules/elasticsearch-cluster-backup/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-elk/tree/master/modules/elasticsearch-cluster-backup/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-elk/tree/master/modules/elasticsearch-cluster-backup/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "7c475ddfc4246f96537ccbf23576298d"
}
##DOCS-SOURCER-END -->

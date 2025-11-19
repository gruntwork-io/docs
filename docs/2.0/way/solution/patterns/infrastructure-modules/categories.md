---
sidebar_position: 4
title: Categories
---

# Infrastructure Module Categories

Earlier, we [defined](../overview) patterns as _pre-built opinionated solutions to common infrastructure problems._ So what exactly are those common infrastructure problems? 

Based on years of experience, we've identified the following **categories** of infrastructure modules. Each category has one or more **subject matter expertise topics (SME topics)**. Each SME topic has one or more infrastructure modules.

For example, the Cloud foundations category has a networking SME topic, which for AWS has modules for VPC peering, VPC flow logs, transit gateway, and more.

Let's look at all the categories now.

## Cloud foundations

Cloud foundations includes everything you need to get your cloud provider (e.g. AWS, Azure) environment up and running. This includes account configuration, account baselines, networking configuration, and observability foundations.

SME topics for AWS include:

- Networking
  - Subnets, route tables, security groups, etc.
- Organizational baselines*
  - Service Control Policies, Backup Policies, IAM role definitions, etc.
- Account baselines*
  - Baseline security service configurations
- Organization observability
  - Alerts, Logs, Metrics

_*We're using AWS terms here, but there are GCP and Azure equivalents related to projects, subscriptions, etc._

## Running apps

Running apps refers to how you deploy and operate your applications. This covers container orchestration, serverless platforms, and traditional server-based apps.

SME topics include:

- K8s
- Amazon ECS
- Serverless
- Amazon EC2
- Secrets management
- App observability
- App CI/CD

## Storing data

Storing data is all about how you store and manage data. It includes relational databases, key-value stores, file storage, queues, streams, and data processing pipelines.

SME topics include:

- Relational databases (Amazon RDS, Amazon Aurora)
- Key-value store (Amazon ElastiCache)
- File storage (AWS S3, AWS Glacier)
- Queues & streams (Amazon Kinesis, Amazon SQS)
- Time-series databases (Tiger Data, InfluxDB)

_Examples: AWS RDS databases, Amazon S3 buckets, AWS DynamoDB tables, Amazon Kinesis streams_

## AI

AI includes any patterns needed to enable AI workloads and integrations. 

SME topics include:

- AI model access (Azure OpenAI, Amazon Bedrock)
- Data platform configuration (Databricks, Amazon Sagemaker)
- Data lakes (Snowflake, AWS Glue, Amazon Athena, Amazon RedShift)
- Vector databases (Pgvector, Pinecone, Amazon OpenSearch)

This covers AI model access, data platforms for AI, specialized compute resources, and AI observability.

## Other categories, SME topics, and modules

The above list is what we, Gruntwork, have encountered, but naturally your organization's needs will vary slightly.


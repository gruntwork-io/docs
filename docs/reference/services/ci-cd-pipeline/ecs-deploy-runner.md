---
title: ECS Deploy Runner
hide_title: true
type: service
name: ECS Deploy Runner
description: Use a CI/CD pipeline for deploying infrastructure code updates.
category: ci-cd
cloud: aws
tags: ["ci-cd", "pipelines", "ci", "cd"]
license: gruntwork
built-with: terraform, bash, packer
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../src/components/VersionBadge.tsx';

<VersionBadge version="0.76.0"/>

# ECS Deploy Runner

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/modules/mgmt/ecs-deploy-runner" className="link-button">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases?q=mgmt/ecs-deploy-runner" className="link-button" title="Release notes for only the service catalog versions which impacted this service.">Filtered Release Notes</a>




## Overview

This service deploys ECS Deploy Runner, the central component of [Gruntwork Pipelines](https://gruntwork.io/pipelines).

![Gruntwork Pipelines architecture](/img/modules/mgmt/ecs-deploy-runner/pipelines-architecture.png)

Gruntwork Pipelines is a code framework and approach that enables you to use your preferred CI tool to set up an
end-to-end pipeline for infrastructure code (Terraform) and app code packaged in multiple formats, including container
images (Docker) and Amazon Machine Images (AMIs built with Packer).

## Features

*   Set up a Terraform and Terragrunt pipeline based on best practices
*   Run deployments using Fargate or EC2 tasks on the ECS cluster
*   Configure the pipeline for building Packer and Docker images and for running `plan` and `apply` operations
*   Grant fine-grained permissions for running deployments with minimum necessary privileges
*   Stream output from the pipeline to CloudWatch Logs
*   Protect secrets needed by the pipeline using AWS Secrets Manager
*   Use KMS grants to allow the ECS task containers to access shared secrets and encrypted images between accounts
*   Easily upgrade Terraform versions with Terraform version management support

Under the hood, this is all implemented using Terraform modules from the Gruntwork
[terraform-aws-ci](https://github.com/gruntwork-io/terraform-aws-ci) repo.

## Learn

:::note

This repo is a part of the [Gruntwork Service Catalog](https://github.com/gruntwork-io/terraform-aws-service-catalog/),
a collection of reusable, battle-tested, production ready infrastructure code.
If you’ve never used the Service Catalog before, make sure to read
[How to use the Gruntwork Service Catalog](https://docs.gruntwork.io/reference/services/intro/overview)!

:::

### Core concepts

*   For a comprehensive guide to Gruntwork Pipelines, refer to
    [How to configure a production-grade CI-CD workflow for infrastructure code](https://docs.gruntwork.io/guides/build-it-yourself/pipelines/).
*   For an overview of how the various parts fit together to form the complete pipeline, refer to the
    [ECS Deploy Runner Core Concepts](https://github.com/gruntwork-io/terraform-aws-ci/blob/master/modules/ecs-deploy-runner/core-concepts.md#overview).
*   The rest of the docs within the
    [ecs-deploy-runner module in the terraform-aws-ci repository](https://github.com/gruntwork-io/terraform-aws-ci/blob/master/modules/ecs-deploy-runner/README.adoc)
    may also help with context.
*   The [ECS Deploy Runner standard configuration](https://github.com/gruntwork-io/terraform-aws-ci/blob/master/modules/ecs-deploy-runner-standard-configuration/README.md)
    is a shortcut for setting up the `ecs-deploy-runner` module in a manner consistent with Gruntwork recommendations.

## Deploy

### Non-production deployment (quick start for learning)

If you just want to try this repo out for experimenting and learning, check out the following resources:

*   [examples/for-learning-and-testing folder](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/examples/for-learning-and-testing): The
    `examples/for-learning-and-testing` folder contains standalone sample code optimized for learning, experimenting, and
    testing (but not direct production usage).

### Production deployment

If you want to deploy this repo in production, check out the following resources:

*   [shared account ecs-deploy-runner configuration in the for-production
    folder](/examples/for-production/infrastructure-live/shared/us-west-2/mgmt/ecs-deploy-runner/): The
    `examples/for-production` folder contains sample code optimized for direct usage in production. This is code from the
    [Gruntwork Reference Architecture](https://gruntwork.io/reference-architecture/), and it shows you how we build an
    end-to-end, integrated tech stack on top of the Gruntwork Service Catalog.

## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

<a name="ami_builder_config" className="snap-top"></a>

* [**`ami_builder_config`**](#ami_builder_config) &mdash; Configuration options for the ami-builder container of the ECS deploy runner stack. This container will be used for building AMIs in the CI/CD pipeline using packer. Set to `null` to disable this container.

<a name="cloudwatch_log_group_for_ec2_kms_key_id" className="snap-top"></a>

* [**`cloudwatch_log_group_for_ec2_kms_key_id`**](#cloudwatch_log_group_for_ec2_kms_key_id) &mdash; The ID (ARN, alias ARN, AWS ID) of a customer managed KMS Key to use for encrypting log data.

<a name="cloudwatch_log_group_for_ec2_retention_in_days" className="snap-top"></a>

* [**`cloudwatch_log_group_for_ec2_retention_in_days`**](#cloudwatch_log_group_for_ec2_retention_in_days) &mdash; The number of days to retain log events in the log group. Refer to [`https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudwatch_log_group#retention_in_days`](#https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudwatch_log_group#retention_in_days) for all the valid values. When null, the log events are retained forever.

<a name="cloudwatch_log_group_for_ec2_tags" className="snap-top"></a>

* [**`cloudwatch_log_group_for_ec2_tags`**](#cloudwatch_log_group_for_ec2_tags) &mdash; Tags to apply on the CloudWatch Log Group, encoded as a map where the keys are tag keys and values are tag values.

<a name="container_cpu" className="snap-top"></a>

* [**`container_cpu`**](#container_cpu) &mdash; The default CPU units for the instances that Fargate will spin up. The invoker allows users to override the CPU at run time, but this value will be used if the user provides no value for the CPU. Options here: [`https://docs.aws.amazon.com/AmazonECS/latest/developerguide/AWS_Fargate`](#https://docs.aws.amazon.com/AmazonECS/latest/developerguide/AWS_Fargate).html#fargate-tasks-size.

<a name="container_default_launch_type" className="snap-top"></a>

* [**`container_default_launch_type`**](#container_default_launch_type) &mdash; The default launch type of the ECS deploy runner workers. This launch type will be used if it is not overridden during invocation of the lambda function. Must be FARGATE or EC2.

<a name="container_max_cpu" className="snap-top"></a>

* [**`container_max_cpu`**](#container_max_cpu) &mdash; The maximum CPU units that is allowed to be specified by the user when invoking the deploy runner with the Lambda function.

<a name="container_max_memory" className="snap-top"></a>

* [**`container_max_memory`**](#container_max_memory) &mdash; The maximum memory units that is allowed to be specified by the user when invoking the deploy runner with the Lambda function.

<a name="container_memory" className="snap-top"></a>

* [**`container_memory`**](#container_memory) &mdash; The default memory units for the instances that Fargate will spin up. The invoker allows users to override the memory at run time, but this value will be used if the user provides no value for memory. Options here: [`https://docs.aws.amazon.com/AmazonECS/latest/developerguide/AWS_Fargate`](#https://docs.aws.amazon.com/AmazonECS/latest/developerguide/AWS_Fargate).html#fargate-tasks-size.

<a name="docker_image_builder_config" className="snap-top"></a>

* [**`docker_image_builder_config`**](#docker_image_builder_config) &mdash; Configuration options for the docker-image-builder container of the ECS deploy runner stack. This container will be used for building docker images in the CI/CD pipeline. Set to `null` to disable this container.

<a name="docker_image_builder_hardcoded_args" className="snap-top"></a>

* [**`docker_image_builder_hardcoded_args`**](#docker_image_builder_hardcoded_args) &mdash; Unlike [`hardcoded_options`](#hardcoded_options), this is used for hardcoded positional args and will always be passed in at the end of the args list.

<a name="docker_image_builder_hardcoded_options" className="snap-top"></a>

* [**`docker_image_builder_hardcoded_options`**](#docker_image_builder_hardcoded_options) &mdash; Which options and args to always pass in alongside the ones provided by the command. This is a map of option keys to args to pass in. Each arg in the list will be passed in as a separate option. This will be passed in first, before the args provided by the user in the event data.

<a name="ec2_worker_pool_configuration" className="snap-top"></a>

* [**`ec2_worker_pool_configuration`**](#ec2_worker_pool_configuration) &mdash; Worker configuration of a EC2 worker pool for the ECS cluster. An EC2 worker pool supports caching of Docker images, so your builds may run faster, whereas Fargate is serverless, so you have no persistent EC2 instances to manage and pay for. If null, no EC2 worker pool will be allocated and the deploy runner will be in Fargate only mode. Note that when this variable is set, this example module will automatically lookup and use the base ECS optimized AMI that AWS provides.

<a name="iam_groups" className="snap-top"></a>

* [**`iam_groups`**](#iam_groups) &mdash; List of AWS IAM groups that should be given access to invoke the deploy runner.

<a name="iam_roles" className="snap-top"></a>

* [**`iam_roles`**](#iam_roles) &mdash; List of AWS IAM roles that should be given access to invoke the deploy runner.

<a name="iam_users" className="snap-top"></a>

* [**`iam_users`**](#iam_users) &mdash; List of AWS IAM usernames that should be given access to invoke the deploy runner.

<a name="kms_grant_opt_in_regions" className="snap-top"></a>

* [**`kms_grant_opt_in_regions`**](#kms_grant_opt_in_regions) &mdash; Create multi-region resources in the specified regions. The best practice is to enable multi-region services in all enabled regions in your AWS account. This variable must NOT be set to null or empty. Otherwise, we won't know which regions to use and authenticate to, and may use some not enabled in your AWS account (e.g., GovCloud, China, etc). To get the list of regions enabled in your AWS account, you can use the AWS CLI: aws ec2 describe-regions.

<a name="name" className="snap-top"></a>

* [**`name`**](#name) &mdash; Name of this instance of the deploy runner stack. Used to namespace all resources.

<a name="private_subnet_ids" className="snap-top"></a>

* [**`private_subnet_ids`**](#private_subnet_ids) &mdash; List of IDs of private subnets that can be used for running the ECS task and Lambda function.

<a name="shared_secrets_enabled" className="snap-top"></a>

* [**`shared_secrets_enabled`**](#shared_secrets_enabled) &mdash; If true, this module will create grants for a given shared secrets KMS key. You must pass a value for [`shared_secrets_kms_cmk_arn`](#shared_secrets_kms_cmk_arn) if this is set to true. Defaults to false.

<a name="shared_secrets_kms_cmk_arn" className="snap-top"></a>

* [**`shared_secrets_kms_cmk_arn`**](#shared_secrets_kms_cmk_arn) &mdash; The ARN of the KMS CMK used for sharing AWS Secrets Manager secrets between accounts.

<a name="should_create_cloudwatch_log_group_for_ec2" className="snap-top"></a>

* [**`should_create_cloudwatch_log_group_for_ec2`**](#should_create_cloudwatch_log_group_for_ec2) &mdash; When true, precreate the CloudWatch Log Group to use for log aggregation from the EC2 instances. This is useful if you wish to customize the CloudWatch Log Group with various settings such as retention periods and KMS encryption. When false, the CloudWatch agent will automatically create a basic log group to use.

<a name="snapshot_encryption_kms_cmk_arns" className="snap-top"></a>

* [**`snapshot_encryption_kms_cmk_arns`**](#snapshot_encryption_kms_cmk_arns) &mdash; Map of names to ARNs of KMS CMKs that are used to encrypt snapshots (including AMIs). This module will create the necessary KMS key grants to allow the respective deploy containers access to utilize the keys for managing the encrypted snapshots. The keys are arbitrary names that are used to identify the key.

<a name="terraform_applier_config" className="snap-top"></a>

* [**`terraform_applier_config`**](#terraform_applier_config) &mdash; Configuration options for the terraform-applier container of the ECS deploy runner stack. This container will be used for running infrastructure deployment actions (including automated variable updates) in the CI/CD pipeline with Terraform / Terragrunt. Set to `null` to disable this container.

<a name="terraform_planner_config" className="snap-top"></a>

* [**`terraform_planner_config`**](#terraform_planner_config) &mdash; Configuration options for the terraform-planner container of the ECS deploy runner stack. This container will be used for running infrastructure plan (including validate) actions in the CI/CD pipeline with Terraform / Terragrunt. Set to `null` to disable this container.

<a name="vpc_id" className="snap-top"></a>

* [**`vpc_id`**](#vpc_id) &mdash; ID of the VPC where the ECS task and Lambda function should run.

</TabItem>
<TabItem value="outputs" label="Outputs">

<a name="cloudwatch_log_group_name" className="snap-top"></a>

* [**`cloudwatch_log_group_name`**](#cloudwatch_log_group_name) &mdash; Name of the CloudWatch Log Group used to store the log output from the Deploy Runner ECS task.

<a name="default_ecs_task_arn" className="snap-top"></a>

* [**`default_ecs_task_arn`**](#default_ecs_task_arn) &mdash; AWS ARN of the default ECS Task Definition. Can be used to trigger the ECS Task directly.

<a name="ecs_cluster_arn" className="snap-top"></a>

* [**`ecs_cluster_arn`**](#ecs_cluster_arn) &mdash; AWS ARN of the ECS Cluster that can be used to run the deploy runner task.

<a name="ecs_task_arns" className="snap-top"></a>

* [**`ecs_task_arns`**](#ecs_task_arns) &mdash; Map of AWS ARNs of the ECS Task Definition. There are four entries, one for each container in the standard config (docker-image-builder ; ami-builder ; terraform-planner ; terraform-applier).

<a name="ecs_task_execution_role_arn" className="snap-top"></a>

* [**`ecs_task_execution_role_arn`**](#ecs_task_execution_role_arn) &mdash; ECS Task execution role ARN

<a name="ecs_task_families" className="snap-top"></a>

* [**`ecs_task_families`**](#ecs_task_families) &mdash; Map of the families of the ECS Task Definition that is currently live. There are four entries, one for each container in the standard config (docker-image-builder ; ami-builder ; terraform-planner ; terraform-applier).

<a name="ecs_task_iam_roles" className="snap-top"></a>

* [**`ecs_task_iam_roles`**](#ecs_task_iam_roles) &mdash; Map of AWS ARNs and names of the IAM role that will be attached to the ECS task to grant it access to AWS resources. Each container will have its own IAM role. There are four entries, one for each container in the standard config (docker-image-builder ; ami-builder ; terraform-planner ; terraform-applier).

<a name="ecs_task_revisions" className="snap-top"></a>

* [**`ecs_task_revisions`**](#ecs_task_revisions) &mdash; Map of the current revision of the ECS Task Definition that is currently live. There are four entries, one for each container in the standard config (docker-image-builder ; ami-builder ; terraform-planner ; terraform-applier).

<a name="invoke_policy_arn" className="snap-top"></a>

* [**`invoke_policy_arn`**](#invoke_policy_arn) &mdash; The ARN of the IAM policy that allows access to the invoke the deploy runner.

<a name="invoker_function_arn" className="snap-top"></a>

* [**`invoker_function_arn`**](#invoker_function_arn) &mdash; AWS ARN of the invoker lambda function that can be used to invoke a deployment.

<a name="security_group_allow_all_outbound_id" className="snap-top"></a>

* [**`security_group_allow_all_outbound_id`**](#security_group_allow_all_outbound_id) &mdash; Security Group ID of the ECS task

</TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"service-catalog-api","hash":"826b4e8b39cd6f78a9859b39ded2a52e"}
##DOCS-SOURCER-END -->

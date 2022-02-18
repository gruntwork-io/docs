---
type: "service"
name: "Amazon ECS Fargate Cluster"
description: "Deploy an Amazon ECS Cluster optimized for Fargate only usage."
category: "docker-orchestration"
cloud: "aws"
tags: ["docker","orchestration","ecs","containers"]
license: "gruntwork"
built-with: "terraform"
title: "Amazon ECS Fargate Cluster"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../src/components/VersionBadge.tsx';

<VersionBadge version="0.76.0"/>

# Amazon ECS Fargate Cluster


<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/modules/services/ecs-fargate-cluster" className="link-button">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases?q=services/ecs-fargate-cluster" className="link-button" title="Release notes for only the service catalog versions which impacted this service.">Filtered Release Notes</a>

## Overview

This service contains [Terraform](https://www.terraform.io) code to deploy a production-grade ECS cluster for Fargate
usage only on [AWS](https://aws.amazon.com) using
[Elastic Container Service (ECS)](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/Welcome.html).

This service launches an ECS cluster on top of Fargate that is completely managed by AWS. If you wish to launch an ECS
cluster on top of an Auto Scaling Group, refer to the [ecs-cluster module](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/modules/services/ecs-cluster). Refer to the section
[EC2 vs Fargate Launch Types](https://github.com/gruntwork-io/terraform-aws-ecs/blob/master/core-concepts.md#ec2-vs-fargate-launch-types)
for more information on the differences between the two flavors.

![ECS architecture](/img/modules/services/ecs-fargate-cluster/ecs-architecture.png)

## Features

This Terraform Module launches an [EC2 Container Service Cluster](http://docs.aws.amazon.com/AmazonECS/latest/developerguide/ECS_clusters.html)
that you can use to run Docker containers on Fargate and Fargate Spot.

## Learn

:::note

This repo is a part of the [Gruntwork Service Catalog](https://github.com/gruntwork-io/terraform-aws-service-catalog/),
a collection of reusable, battle-tested, production ready infrastructure code.
If you’ve never used the Service Catalog before, make sure to read
[How to use the Gruntwork Service Catalog](https://docs.gruntwork.io/reference/services/intro/overview)!

:::

Under the hood, this is all implemented using Terraform modules from the Gruntwork
[terraform-aws-ecs](https://github.com/gruntwork-io/terraform-aws-ecs) repo. If you are a subscriber and don’t have
access to this repo, email <support@gruntwork.io>.

### Core concepts

To understand core concepts like what is ECS, and the different cluster types, see the documentation in the
[terraform-aws-ecs](https://github.com/gruntwork-io/terraform-aws-ecs) repo.

### Repo organization

*   [modules](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/modules): the main implementation code for this repo, broken down into multiple standalone, orthogonal submodules.
*   [examples](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/examples): This folder contains working examples of how to use the submodules.
*   [test](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/test): Automated tests for the modules and examples.

## Deploy

### Non-production deployment (quick start for learning)

If you just want to try this repo out for experimenting and learning, check out the following resources:

*   [examples/for-learning-and-testing folder](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/examples/for-learning-and-testing): The
    `examples/for-learning-and-testing` folder contains standalone sample code optimized for learning, experimenting, and
    testing (but not direct production usage).

### Production deployment

If you want to deploy this repo in production, check out the following resources:

*   [examples/for-production folder](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/examples/for-production): The `examples/for-production` folder contains sample code
    optimized for direct usage in production. This is code from the
    [Gruntwork Reference Architecture](https://gruntwork.io/reference-architecture), and it shows you how we build an
    end-to-end, integrated tech stack on top of the Gruntwork Service Catalog.

## Manage

For information on how to manage your ECS cluster, see the documentation in the
[terraform-aws-ecs](https://github.com/gruntwork-io/terraform-aws-ecs) repo.

## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

<a name="cluster_name" className="snap-top"></a>

* [**`cluster_name`**](#cluster_name) &mdash; The name of the ECS cluster

<a name="custom_tags" className="snap-top"></a>

* [**`custom_tags`**](#custom_tags) &mdash; A map of custom tags to apply to the ECS Cluster. The key is the tag name and the value is the tag value.

<a name="enable_container_insights" className="snap-top"></a>

* [**`enable_container_insights`**](#enable_container_insights) &mdash; Whether or not to enable container insights monitoring on the ECS cluster.

</TabItem>
<TabItem value="outputs" label="Outputs">

<a name="arn" className="snap-top"></a>

* [**`arn`**](#arn) &mdash; ARN of the ECS cluster that was created.

<a name="name" className="snap-top"></a>

* [**`name`**](#name) &mdash; The name of the ECS cluster.

</TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"service-catalog-api","hash":"667215bd97721c2de3a1d8fa7407308a"}
##DOCS-SOURCER-END -->

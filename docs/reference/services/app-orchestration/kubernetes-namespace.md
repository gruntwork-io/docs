---
type: "service"
name: "Kubernetes Namespace"
description: "Provision a best practices Kubernetes Namespace on any Kubernetes Cluster."
category: "docker-orchestration"
cloud: "aws"
tags: ["docker","orchestration","kubernetes","containers"]
license: "gruntwork"
built-with: "terraform"
title: "Kubernetes Namespace"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../src/components/VersionBadge.tsx';

<VersionBadge version="0.78.1" lastModifiedVersion="0.35.4"/>

# Kubernetes Namespace


<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/modules/services/k8s-namespace" className="link-button">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases?q=services%2Fk8s-namespace" className="link-button" title="Release notes for only the service catalog versions which impacted this service.">Release Notes</a>

## Overview

This service contains [Terraform](https://www.terraform.io) code to provision a best practices
[Kubernetes Namespace](https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/).

## Features

*   Target any Kubernetes cluster (e.g., EKS, GKE, minikube, etc)
*   Provision a set of default best practices RBAC roles for managing access to the Namespace
*   Optionally configure Fargate Profile to schedule all Pods on EKS Fargate

## Learn

:::note

This repo is a part of the [Gruntwork Service Catalog](https://github.com/gruntwork-io/terraform-aws-service-catalog/),
a collection of reusable, battle-tested, production ready infrastructure code.
If you’ve never used the Service Catalog before, make sure to read
[How to use the Gruntwork Service Catalog](https://docs.gruntwork.io/reference/services/intro/overview)!

:::

Under the hood, this is all implemented using Terraform modules from the Gruntwork
[terraform-kubernetes-namespace](https://github.com/gruntwork-io/terraform-kubernetes-namespace) repo. If you are a
subscriber and don’t have access to this repo, email <support@gruntwork.io>.

### Core concepts

*   [Official documentation on Namespace](https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/):
    learn about the basics of Kubernetes Namespaces including what they are, how to interact with Namespaces, how DNS
    works, and when to use Namespaces.

*   [Official documentation on RBAC](https://kubernetes.io/docs/reference/access-authn-authz/rbac/): learn about
    Kubernetes RBAC including what they are, what resources are involved, how they work, how to bind roles to users, and
    more.

*   [Amazon’s documentation on Fargate](https://docs.aws.amazon.com/eks/latest/userguide/fargate.html): learn about AWS
    EKS Fargate including what they are, how it works, limitations of Fargate, and more.

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

## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

<a name="annotations" className="snap-top"></a>

* [**`annotations`**](#annotations) &mdash; Map of string key default pairs that can be used to store arbitrary metadata on the namespace and roles. See the Kubernetes Reference for more info (https://kubernetes.io/docs/concepts/overview/working-with-objects/annotations/).

<a name="eks_cluster_name" className="snap-top"></a>

* [**`eks_cluster_name`**](#eks_cluster_name) &mdash; Name of the EKS cluster where the Namespace will be created. Required when [`schedule_pods_on_fargate`](#schedule_pods_on_fargate) is `true`.

<a name="full_access_rbac_entities" className="snap-top"></a>

* [**`full_access_rbac_entities`**](#full_access_rbac_entities) &mdash; The list of RBAC entities that should have full access to the Namespace.

<a name="labels" className="snap-top"></a>

* [**`labels`**](#labels) &mdash; Map of string key value pairs that can be used to organize and categorize the namespace and roles. See the Kubernetes Reference for more info (https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/).

<a name="name" className="snap-top"></a>

* [**`name`**](#name) &mdash; Name of the Namespace to create.

<a name="pod_execution_iam_role_arn" className="snap-top"></a>

* [**`pod_execution_iam_role_arn`**](#pod_execution_iam_role_arn) &mdash; ARN of IAM Role to use as the Pod execution role for Fargate. Required if [`schedule_pods_on_fargate`](#schedule_pods_on_fargate) is true.

<a name="read_only_access_rbac_entities" className="snap-top"></a>

* [**`read_only_access_rbac_entities`**](#read_only_access_rbac_entities) &mdash; The list of RBAC entities that should have read only access to the Namespace.

<a name="schedule_pods_on_fargate" className="snap-top"></a>

* [**`schedule_pods_on_fargate`**](#schedule_pods_on_fargate) &mdash; When true, will create a Fargate Profile that matches all Pods in the Namespace. This means that all Pods in the Namespace will be scheduled on Fargate. Note that this value is only used if [`kubeconfig_auth_type`](#kubeconfig_auth_type) is eks, as Fargate profiles can only be created against EKS clusters.

<a name="worker_vpc_subnet_ids" className="snap-top"></a>

* [**`worker_vpc_subnet_ids`**](#worker_vpc_subnet_ids) &mdash; The subnet IDs to use for EKS worker nodes. Used when provisioning Pods on to Fargate. At least 1 subnet is required if [`schedule_pods_on_fargate`](#schedule_pods_on_fargate) is true.

</TabItem>
<TabItem value="outputs" label="Outputs">

<a name="namespace_name" className="snap-top"></a>

* [**`namespace_name`**](#namespace_name) &mdash; The name of the created namespace.

<a name="namespace_rbac_access_all_role" className="snap-top"></a>

* [**`namespace_rbac_access_all_role`**](#namespace_rbac_access_all_role) &mdash; The name of the rbac role that grants admin level permissions on the namespace.

<a name="namespace_rbac_access_read_only_role" className="snap-top"></a>

* [**`namespace_rbac_access_read_only_role`**](#namespace_rbac_access_read_only_role) &mdash; The name of the rbac role that grants read only permissions on the namespace.

</TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"service-catalog-api","hash":"0ef36b92a18a099803af926bbf915726"}
##DOCS-SOURCER-END -->

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
import HclListItem from '../../../../src/components/HclListItem.tsx';

<VersionBadge version="0.85.0" lastModifiedVersion="0.83.0"/>

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

<br/>

### Required

<HclListItem name="name" requirement="required" description="Name of the Namespace to create." type="string"/>


<br/>


### Optional

<HclListItem name="annotations" requirement="optional" description="Map of string key default pairs that can be used to store arbitrary metadata on the namespace and roles. See the Kubernetes Reference for more info (https://kubernetes.io/docs/concepts/overview/working-with-objects/annotations/)." type="map" typeDetails="map(string)" defaultValue="{}"/>

<HclListItem name="eks_cluster_name" requirement="optional" description="Name of the EKS cluster where the Namespace will be created. Required when <a href=#schedule_pods_on_fargate><code>schedule_pods_on_fargate</code></a> is `true`." type="string" defaultValue="null"/>

<HclListItem name="full_access_rbac_entities" requirement="optional" description="The list of RBAC entities that should have full access to the Namespace." type="list" typeDetails="list(object({
    # The type of entity. One of User, Group, or ServiceAccount
    kind = string
    # The name of the entity (e.g., the username or group name, depending on kind).
    name = string
    # The namespace where the entity is located. Only used for ServiceAccount.
    namespace = string
  }))" defaultValue="[]"/>

<HclListItem name="labels" requirement="optional" description="Map of string key value pairs that can be used to organize and categorize the namespace and roles. See the Kubernetes Reference for more info (https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/)." type="map" typeDetails="map(string)" defaultValue="{}"/>

<HclListItem name="pod_execution_iam_role_arn" requirement="optional" description="ARN of IAM Role to use as the Pod execution role for Fargate. Required if <a href=#schedule_pods_on_fargate><code>schedule_pods_on_fargate</code></a> is true." type="string" defaultValue="null"/>

<HclListItem name="read_only_access_rbac_entities" requirement="optional" description="The list of RBAC entities that should have read only access to the Namespace." type="list" typeDetails="list(object({
    # The type of entity. One of User, Group, or ServiceAccount
    kind = string
    # The name of the entity (e.g., the username or group name, depending on kind).
    name = string
    # The namespace where the entity is located. Only used for ServiceAccount.
    namespace = string
  }))" defaultValue="[]"/>

<HclListItem name="schedule_pods_on_fargate" requirement="optional" description="When true, will create a Fargate Profile that matches all Pods in the Namespace. This means that all Pods in the Namespace will be scheduled on Fargate. Note that this value is only used if <a href=#kubeconfig_auth_type><code>kubeconfig_auth_type</code></a> is eks, as Fargate profiles can only be created against EKS clusters." type="bool" defaultValue="false"/>

<HclListItem name="worker_vpc_subnet_ids" requirement="optional" description="The subnet IDs to use for EKS worker nodes. Used when provisioning Pods on to Fargate. At least 1 subnet is required if <a href=#schedule_pods_on_fargate><code>schedule_pods_on_fargate</code></a> is true." type="list" typeDetails="list(string)" defaultValue="[]"/>

</TabItem>
<TabItem value="outputs" label="Outputs">

<br/>

<HclListItem name="namespace_name" requirement="required" description="The name of the created namespace."/>

<HclListItem name="namespace_rbac_access_all_role" requirement="required" description="The name of the rbac role that grants admin level permissions on the namespace."/>

<HclListItem name="namespace_rbac_access_read_only_role" requirement="required" description="The name of the rbac role that grants read only permissions on the namespace."/>

</TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"service-catalog-api","hash":"b8cb37deb1e31ad8b138371c83d9d5da"}
##DOCS-SOURCER-END -->

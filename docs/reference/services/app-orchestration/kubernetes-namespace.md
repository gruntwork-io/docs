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
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../src/components/HclListItem.tsx';

<VersionBadge version="0.104.14" lastModifiedVersion="0.102.10"/>

# Kubernetes Namespace

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/modules/services/k8s-namespace" className="link-button" title="View the source code for this service in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases?q=services%2Fk8s-namespace" className="link-button" title="Release notes for only versions which impacted this service.">Release Notes</a>

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

*   [modules](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/modules): the main implementation code for this repo, broken down into multiple standalone, orthogonal submodules.
*   [examples](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/examples): This folder contains working examples of how to use the submodules.
*   [test](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/test): Automated tests for the modules and examples.

## Deploy

### Non-production deployment (quick start for learning)

If you just want to try this repo out for experimenting and learning, check out the following resources:

*   [examples/for-learning-and-testing folder](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/examples/for-learning-and-testing): The
    `examples/for-learning-and-testing` folder contains standalone sample code optimized for learning, experimenting, and
    testing (but not direct production usage).

### Production deployment

If you want to deploy this repo in production, check out the following resources:

*   [examples/for-production folder](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/examples/for-production): The `examples/for-production` folder contains sample code
    optimized for direct usage in production. This is code from the
    [Gruntwork Reference Architecture](https://gruntwork.io/reference-architecture), and it shows you how we build an
    end-to-end, integrated tech stack on top of the Gruntwork Service Catalog.


## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S K8S-NAMESPACE MODULE
# ------------------------------------------------------------------------------------------------------

module "k_8_s_namespace" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-service-catalog.git//modules/k8s-namespace?ref=v0.104.14"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Name of the Namespace to create.
  name = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Map of string key default pairs that can be used to store arbitrary metadata
  # on the namespace and roles. See the Kubernetes Reference for more info
  # (https://kubernetes.io/docs/concepts/overview/working-with-objects/annotations/).
  annotations = {}

  # Name of the EKS cluster where the Namespace will be created. Required when
  # var.schedule_pods_on_fargate is `true`.
  eks_cluster_name = null

  # The list of RBAC entities that should have full access to the Namespace.
  full_access_rbac_entities = []

  # Map of string key value pairs that can be used to organize and categorize
  # the namespace and roles. See the Kubernetes Reference for more info
  # (https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/).
  labels = {}

  # ARN of IAM Role to use as the Pod execution role for Fargate. Required if
  # var.schedule_pods_on_fargate is true.
  pod_execution_iam_role_arn = null

  # The list of RBAC entities that should have read only access to the
  # Namespace.
  read_only_access_rbac_entities = []

  # When true, will create a Fargate Profile that matches all Pods in the
  # Namespace. This means that all Pods in the Namespace will be scheduled on
  # Fargate. Note that this value is only used if var.kubeconfig_auth_type is
  # eks, as Fargate profiles can only be created against EKS clusters.
  schedule_pods_on_fargate = false

  # The subnet IDs to use for EKS worker nodes. Used when provisioning Pods on
  # to Fargate. At least 1 subnet is required if var.schedule_pods_on_fargate is
  # true.
  worker_vpc_subnet_ids = []

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S K8S-NAMESPACE MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-service-catalog.git//modules/k8s-namespace?ref=v0.104.14"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Name of the Namespace to create.
  name = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Map of string key default pairs that can be used to store arbitrary metadata
  # on the namespace and roles. See the Kubernetes Reference for more info
  # (https://kubernetes.io/docs/concepts/overview/working-with-objects/annotations/).
  annotations = {}

  # Name of the EKS cluster where the Namespace will be created. Required when
  # var.schedule_pods_on_fargate is `true`.
  eks_cluster_name = null

  # The list of RBAC entities that should have full access to the Namespace.
  full_access_rbac_entities = []

  # Map of string key value pairs that can be used to organize and categorize
  # the namespace and roles. See the Kubernetes Reference for more info
  # (https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/).
  labels = {}

  # ARN of IAM Role to use as the Pod execution role for Fargate. Required if
  # var.schedule_pods_on_fargate is true.
  pod_execution_iam_role_arn = null

  # The list of RBAC entities that should have read only access to the
  # Namespace.
  read_only_access_rbac_entities = []

  # When true, will create a Fargate Profile that matches all Pods in the
  # Namespace. This means that all Pods in the Namespace will be scheduled on
  # Fargate. Note that this value is only used if var.kubeconfig_auth_type is
  # eks, as Fargate profiles can only be created against EKS clusters.
  schedule_pods_on_fargate = false

  # The subnet IDs to use for EKS worker nodes. Used when provisioning Pods on
  # to Fargate. At least 1 subnet is required if var.schedule_pods_on_fargate is
  # true.
  worker_vpc_subnet_ids = []

}


```

</TabItem>
</Tabs>



## Reference


<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Required

<HclListItem name="name" requirement="required" type="string">
<HclListItemDescription>

Name of the Namespace to create.

</HclListItemDescription>
</HclListItem>

### Optional

<HclListItem name="annotations" requirement="optional" type="map(string)">
<HclListItemDescription>

Map of string key default pairs that can be used to store arbitrary metadata on the namespace and roles. See the Kubernetes Reference for more info (https://kubernetes.io/docs/concepts/overview/working-with-objects/annotations/).

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="eks_cluster_name" requirement="optional" type="string">
<HclListItemDescription>

Name of the EKS cluster where the Namespace will be created. Required when <a href="#schedule_pods_on_fargate"><code>schedule_pods_on_fargate</code></a> is `true`.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="full_access_rbac_entities" requirement="optional" type="list(object(…))">
<HclListItemDescription>

The list of RBAC entities that should have full access to the Namespace.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
list(object({
    # The type of entity. One of User, Group, or ServiceAccount
    kind = string

    # The name of the entity (e.g., the username or group name, depending on kind).
    name = string

    # The namespace where the entity is located. Only used for ServiceAccount.
    namespace = string
  }))
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="[]"/>
<HclGeneralListItem title="More Details">
<details>


```hcl

     The name of the entity (e.g., the username or group name, depending on kind).

```
</details>

<details>


```hcl

     The namespace where the entity is located. Only used for ServiceAccount.

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="labels" requirement="optional" type="map(string)">
<HclListItemDescription>

Map of string key value pairs that can be used to organize and categorize the namespace and roles. See the Kubernetes Reference for more info (https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/).

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="pod_execution_iam_role_arn" requirement="optional" type="string">
<HclListItemDescription>

ARN of IAM Role to use as the Pod execution role for Fargate. Required if <a href="#schedule_pods_on_fargate"><code>schedule_pods_on_fargate</code></a> is true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="read_only_access_rbac_entities" requirement="optional" type="list(object(…))">
<HclListItemDescription>

The list of RBAC entities that should have read only access to the Namespace.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
list(object({
    # The type of entity. One of User, Group, or ServiceAccount
    kind = string

    # The name of the entity (e.g., the username or group name, depending on kind).
    name = string

    # The namespace where the entity is located. Only used for ServiceAccount.
    namespace = string
  }))
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="[]"/>
<HclGeneralListItem title="More Details">
<details>


```hcl

     The name of the entity (e.g., the username or group name, depending on kind).

```
</details>

<details>


```hcl

     The namespace where the entity is located. Only used for ServiceAccount.

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="schedule_pods_on_fargate" requirement="optional" type="bool">
<HclListItemDescription>

When true, will create a Fargate Profile that matches all Pods in the Namespace. This means that all Pods in the Namespace will be scheduled on Fargate. Note that this value is only used if <a href="#kubeconfig_auth_type"><code>kubeconfig_auth_type</code></a> is eks, as Fargate profiles can only be created against EKS clusters.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="worker_vpc_subnet_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The subnet IDs to use for EKS worker nodes. Used when provisioning Pods on to Fargate. At least 1 subnet is required if <a href="#schedule_pods_on_fargate"><code>schedule_pods_on_fargate</code></a> is true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="namespace_name">
<HclListItemDescription>

The name of the created namespace.

</HclListItemDescription>
</HclListItem>

<HclListItem name="namespace_rbac_access_all_role">
<HclListItemDescription>

The name of the rbac role that grants admin level permissions on the namespace.

</HclListItemDescription>
</HclListItem>

<HclListItem name="namespace_rbac_access_read_only_role">
<HclListItemDescription>

The name of the rbac role that grants read only permissions on the namespace.

</HclListItemDescription>
</HclListItem>

</TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/modules/services/k8s-namespace/README.md",
    "https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/modules/services/k8s-namespace/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/modules/services/k8s-namespace/outputs.tf"
  ],
  "sourcePlugin": "service-catalog-api",
  "hash": "233cf8f2915227934253e01e1db8fed0"
}
##DOCS-SOURCER-END -->

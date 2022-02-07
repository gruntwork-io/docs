---
title: Kubernetes Namespace
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from "../../../../src/components/VersionBadge.tsx"

<VersionBadge version="0.74.0"/>

# Kubernetes Namespace

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/modules/services/k8s-namespace" className="link-button">View Source</a>
<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases?q=services/k8s-namespace" className="link-button" title="Release notes for only the service catalog versions which impacted this service.">Filtered Release Notes</a>

Provision a best practices Kubernetes Namespace on any Kubernetes Cluster.

### Reference

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
{"sourcePlugin":"service-catalog-api","hash":"f5d4952c26f4d7e088205d3f4df4dd6d"}
##DOCS-SOURCER-END -->

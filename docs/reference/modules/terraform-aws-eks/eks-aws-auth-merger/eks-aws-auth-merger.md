---
title: "EKS AWS Auth Merger"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Amazon EKS" version="1.1.1" lastModifiedVersion="0.78.1"/>

# EKS AWS Auth Merger

<a href="https://github.com/gruntwork-io/terraform-aws-eks/tree/v1.1.1/modules/eks-aws-auth-merger" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.78.1" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This module contains a go CLI, docker container, and terraform module for deploying a Kubernetes controller for managing mappings between AWS IAM roles and users to RBAC groups in Kubernetes. The official way to manage the mapping is to add values in a single, central `ConfigMap`. This module allows you to break up the central `ConfigMap` across multiple, separate `ConfigMaps` each configuring a subset of the mappings you ultimately want to use, allowing you to update entries in the `ConfigMap` in isolated modules (e.g., when you add a new IAM role in a separate module from the EKS cluster). The `aws-auth-merger` watches for `aws-auth` compatible `ConfigMaps` that can be merged to manage the `aws-auth` authentication `ConfigMap` for EKS.

## Features

*   Break up the `aws-auth` Kubernetes `ConfigMap` across multiple objects.

*   Automatically merge new `ConfigMaps` as they are added and removed.

*   Track automatically generated `aws-auth` source `ConfigMaps` that are generated by EKS.

## Learn

Note

This repo is a part of [the Gruntwork Infrastructure as Code Library](https://gruntwork.io/infrastructure-as-code-library/), a collection of reusable, battle-tested, production ready infrastructure code. If you’ve never used the Infrastructure as Code Library before, make sure to read [How to use the Gruntwork Infrastructure as Code Library](https://docs.gruntwork.io/library/overview/)!

### Core concepts

*   *[What is Kubernetes RBAC?](https://github.com/gruntwork-io/terraform-aws-eks/tree/v1.1.1/modules/eks-k8s-role-mapping/README.md#what-is-kubernetes-role-based-access-control-rbac)*: overview of Kubernetes RBAC, the underlying system managing authentication and authorization in Kubernetes.

*   *[What is AWS IAM role?](https://github.com/gruntwork-io/terraform-aws-eks/tree/v1.1.1/modules/eks-k8s-role-mapping/README.md#what-is-aws-iam-role)*: overview of AWS IAM Roles, the underlying system managing authentication and authorization in AWS.

*   *[Managing users or IAM roles for your cluster](https://docs.aws.amazon.com/eks/latest/userguide/add-user-role.html)*: The official AWS docs on how the `aws-auth` Kubernetes `ConfigMap` works.

*   *[What is the aws-auth-merger?](https://github.com/gruntwork-io/terraform-aws-eks/tree/v1.1.1/modules/eks-aws-auth-merger/core-concepts.md#what-is-the-aws-auth-merger)*: overview of the `aws-auth-merger` and how it works to manage the `aws-auth` Kubernetes `ConfigMap`.

### Repo organization

*   [modules](https://github.com/gruntwork-io/terraform-aws-eks/tree/v1.1.1/modules): the main implementation code for this repo, broken down into multiple standalone, orthogonal submodules.

*   [examples](https://github.com/gruntwork-io/terraform-aws-eks/tree/v1.1.1/examples): This folder contains working examples of how to use the submodules.

*   [test](https://github.com/gruntwork-io/terraform-aws-eks/tree/v1.1.1/test): Automated tests for the modules and examples.

## Deploy

### Non-production deployment (quick start for learning)

If you just want to try this repo out for experimenting and learning, check out the following resources:

*   [examples folder](https://github.com/gruntwork-io/terraform-aws-eks/tree/v1.1.1/examples): The `examples` folder contains sample code optimized for learning, experimenting, and testing (but not production usage).

### Production deployment

If you want to deploy this repo in production, check out the following resources:

*   [How to deploy a production-grade Kubernetes cluster on AWS](https://docs.gruntwork.io/guides/build-it-yourself/kubernetes-cluster#deployment_walkthrough): A step-by-step guide for deploying a production-grade EKS cluster on AWS using the code in this repo.

**EKS Cluster**: Production-ready example code from the Reference Architecture: \* [app account configuration](https://github.com/gruntwork-io/terraform-aws-service-catalog/blob/main/examples/for-production/infrastructure-live/prod/us-west-2/prod/services/eks-cluster/terragrunt.hcl) \* [base configuration](https://github.com/gruntwork-io/terraform-aws-service-catalog/blob/main/examples/for-production/infrastructure-live/\_envcommon/services/eks-cluster.hcl)

## Manage

*   [How to deploy and use the aws-auth-merger](https://github.com/gruntwork-io/terraform-aws-eks/tree/v1.1.1/modules/eks-aws-auth-merger/core-concepts.md#how-do-i-use-the-aws-auth-merger)

*   [How to handle conflicts with automatic updates to the aws-auth ConfigMap by EKS](https://github.com/gruntwork-io/terraform-aws-eks/tree/v1.1.1/modules/eks-aws-auth-merger/core-concepts.md#how-do-i-handle-conflicts-with-automatic-updates-by-eks)

*   [How to restrict users to specific actions on the EKS cluster](https://github.com/gruntwork-io/terraform-aws-eks/tree/v1.1.1/modules/eks-k8s-role-mapping/README.md#restricting-specific-actions)

*   [How to restrict users to specific namespaces on the EKS cluster](https://github.com/gruntwork-io/terraform-aws-eks/tree/v1.1.1/modules/eks-k8s-role-mapping/README.md#restricting-by-namespace)

*   [How to authenticate kubectl to EKS](https://github.com/gruntwork-io/terraform-aws-eks/tree/v1.1.1/core-concepts.md#how-to-authenticate-kubectl)

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S EKS-AWS-AUTH-MERGER MODULE
# ------------------------------------------------------------------------------------------------------

module "eks_aws_auth_merger" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-eks.git//modules/eks-aws-auth-merger?ref=v1.1.1"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Location of the container image to use for the aws-auth-merger app.
  aws_auth_merger_image = <object(
    repo = string
    tag = string
  )>

  # Namespace to deploy the aws-auth-merger into. The app will watch for
  # ConfigMaps in this Namespace to merge into the aws-auth ConfigMap.
  namespace = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Labels to apply to ConfigMaps that are created automatically by the
  # aws-auth-merger when snapshotting the existing main ConfigMap. This must
  # match the label selector provided in configmap_label_selector.
  autocreate_labels = {}

  # A Kubernetes Label Selector for the Namespace to look for ConfigMaps that
  # should be merged into the main aws-auth ConfigMap.
  configmap_label_selector = ""

  # If true, create a Fargate Profile so that the aws-auth-merger app runs on
  # Fargate.
  create_fargate_profile = false

  # When true this will inform the module to create the Namespace.
  create_namespace = true

  # If you set this variable to false, this module will not create any
  # resources. This is used as a workaround because Terraform does not allow you
  # to use the 'count' parameter on modules. By using this parameter, you can
  # optionally create or not create the resources within this module.
  create_resources = true

  # Tags to apply to all AWS resources managed by this module.
  default_tags = {}

  # Key value pairs of strings to apply as annotations on the Deployment.
  deployment_annotations = {}

  # Key value pairs of strings to apply as labels on the Deployment.
  deployment_labels = {}

  # Name to apply to the Deployment for the aws-auth-merger app.
  deployment_name = "aws-auth-merger"

  # A map of custom tags to apply to the Fargate Profile if enabled. The key is
  # the tag name and the value is the tag value.
  eks_fargate_profile_tags = {}

  # Configuration options for the Fargate Profile. Only used if
  # create_fargate_profile is set to true.
  fargate_profile = null

  # Logging verbosity level. Must be one of (in order of most verbose to least):
  # trace, debug, info, warn, error, fatal, panic.
  log_level = "info"

  # Key value pairs of strings to apply as annotations on the Pod.
  pod_annotations = {}

  # Key value pairs of strings to apply as labels on the Pod.
  pod_labels = {}

  # Interval to poll the Namespace for aws-auth ConfigMaps to merge as a
  # duration string (e.g. 5m10s for 5 minutes 10 seconds).
  refresh_interval = "5m"

  # Key value pairs of strings to apply as annotations on the ServiceAccount.
  service_account_annotations = {}

  # Key value pairs of strings to apply as labels on the ServiceAccount.
  service_account_labels = {}

  # Name to apply to the ServiceAccount for the aws-auth-merger app.
  service_account_name = "aws-auth-merger"

  # Key value pairs of strings to apply as annotations on the RBAC Role for the
  # ServiceAccount.
  service_account_role_annotations = {}

  # Key value pairs of strings to apply as annotations on the RBAC Role Binding
  # for the ServiceAccount.
  service_account_role_binding_annotations = {}

  # Key value pairs of strings to apply as labels on the RBAC Role Binding for
  # the ServiceAccount.
  service_account_role_binding_labels = {}

  # Name to apply to the RBAC Role Binding for the ServiceAccount.
  service_account_role_binding_name = "aws-auth-merger"

  # Key value pairs of strings to apply as labels on the RBAC Role for the
  # ServiceAccount.
  service_account_role_labels = {}

  # Name to apply to the RBAC Role for the ServiceAccount.
  service_account_role_name = "aws-auth-merger"

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S EKS-AWS-AUTH-MERGER MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-eks.git//modules/eks-aws-auth-merger?ref=v1.1.1"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Location of the container image to use for the aws-auth-merger app.
  aws_auth_merger_image = <object(
    repo = string
    tag = string
  )>

  # Namespace to deploy the aws-auth-merger into. The app will watch for
  # ConfigMaps in this Namespace to merge into the aws-auth ConfigMap.
  namespace = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Labels to apply to ConfigMaps that are created automatically by the
  # aws-auth-merger when snapshotting the existing main ConfigMap. This must
  # match the label selector provided in configmap_label_selector.
  autocreate_labels = {}

  # A Kubernetes Label Selector for the Namespace to look for ConfigMaps that
  # should be merged into the main aws-auth ConfigMap.
  configmap_label_selector = ""

  # If true, create a Fargate Profile so that the aws-auth-merger app runs on
  # Fargate.
  create_fargate_profile = false

  # When true this will inform the module to create the Namespace.
  create_namespace = true

  # If you set this variable to false, this module will not create any
  # resources. This is used as a workaround because Terraform does not allow you
  # to use the 'count' parameter on modules. By using this parameter, you can
  # optionally create or not create the resources within this module.
  create_resources = true

  # Tags to apply to all AWS resources managed by this module.
  default_tags = {}

  # Key value pairs of strings to apply as annotations on the Deployment.
  deployment_annotations = {}

  # Key value pairs of strings to apply as labels on the Deployment.
  deployment_labels = {}

  # Name to apply to the Deployment for the aws-auth-merger app.
  deployment_name = "aws-auth-merger"

  # A map of custom tags to apply to the Fargate Profile if enabled. The key is
  # the tag name and the value is the tag value.
  eks_fargate_profile_tags = {}

  # Configuration options for the Fargate Profile. Only used if
  # create_fargate_profile is set to true.
  fargate_profile = null

  # Logging verbosity level. Must be one of (in order of most verbose to least):
  # trace, debug, info, warn, error, fatal, panic.
  log_level = "info"

  # Key value pairs of strings to apply as annotations on the Pod.
  pod_annotations = {}

  # Key value pairs of strings to apply as labels on the Pod.
  pod_labels = {}

  # Interval to poll the Namespace for aws-auth ConfigMaps to merge as a
  # duration string (e.g. 5m10s for 5 minutes 10 seconds).
  refresh_interval = "5m"

  # Key value pairs of strings to apply as annotations on the ServiceAccount.
  service_account_annotations = {}

  # Key value pairs of strings to apply as labels on the ServiceAccount.
  service_account_labels = {}

  # Name to apply to the ServiceAccount for the aws-auth-merger app.
  service_account_name = "aws-auth-merger"

  # Key value pairs of strings to apply as annotations on the RBAC Role for the
  # ServiceAccount.
  service_account_role_annotations = {}

  # Key value pairs of strings to apply as annotations on the RBAC Role Binding
  # for the ServiceAccount.
  service_account_role_binding_annotations = {}

  # Key value pairs of strings to apply as labels on the RBAC Role Binding for
  # the ServiceAccount.
  service_account_role_binding_labels = {}

  # Name to apply to the RBAC Role Binding for the ServiceAccount.
  service_account_role_binding_name = "aws-auth-merger"

  # Key value pairs of strings to apply as labels on the RBAC Role for the
  # ServiceAccount.
  service_account_role_labels = {}

  # Name to apply to the RBAC Role for the ServiceAccount.
  service_account_role_name = "aws-auth-merger"

}


```

</TabItem>
</Tabs>




## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Required

<HclListItem name="aws_auth_merger_image" requirement="required" type="object(…)">
<HclListItemDescription>

Location of the container image to use for the aws-auth-merger app.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
object({
    # Container image repository where the aws-auth-merger app container image lives
    repo = string
    # Tag of the aws-auth-merger container to deploy
    tag = string
  })
```

</HclListItemTypeDetails>
</HclListItem>

<HclListItem name="namespace" requirement="required" type="string">
<HclListItemDescription>

Namespace to deploy the aws-auth-merger into. The app will watch for ConfigMaps in this Namespace to merge into the aws-auth ConfigMap.

</HclListItemDescription>
</HclListItem>

### Optional

<HclListItem name="autocreate_labels" requirement="optional" type="map(string)">
<HclListItemDescription>

Labels to apply to ConfigMaps that are created automatically by the aws-auth-merger when snapshotting the existing main ConfigMap. This must match the label selector provided in configmap_label_selector.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="configmap_label_selector" requirement="optional" type="string">
<HclListItemDescription>

A Kubernetes Label Selector for the Namespace to look for ConfigMaps that should be merged into the main aws-auth ConfigMap.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;&quot;"/>
</HclListItem>

<HclListItem name="create_fargate_profile" requirement="optional" type="bool">
<HclListItemDescription>

If true, create a Fargate Profile so that the aws-auth-merger app runs on Fargate.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="create_namespace" requirement="optional" type="bool">
<HclListItemDescription>

When true this will inform the module to create the Namespace.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="create_resources" requirement="optional" type="bool">
<HclListItemDescription>

If you set this variable to false, this module will not create any resources. This is used as a workaround because Terraform does not allow you to use the 'count' parameter on modules. By using this parameter, you can optionally create or not create the resources within this module.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="default_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

Tags to apply to all AWS resources managed by this module.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="deployment_annotations" requirement="optional" type="map(string)">
<HclListItemDescription>

Key value pairs of strings to apply as annotations on the Deployment.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="deployment_labels" requirement="optional" type="map(string)">
<HclListItemDescription>

Key value pairs of strings to apply as labels on the Deployment.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="deployment_name" requirement="optional" type="string">
<HclListItemDescription>

Name to apply to the Deployment for the aws-auth-merger app.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;aws-auth-merger&quot;"/>
</HclListItem>

<HclListItem name="eks_fargate_profile_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

A map of custom tags to apply to the Fargate Profile if enabled. The key is the tag name and the value is the tag value.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="fargate_profile" requirement="optional" type="object(…)">
<HclListItemDescription>

Configuration options for the Fargate Profile. Only used if create_fargate_profile is set to true.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
object({
    # Name of the Fargate Profile (this must be unique per cluster).
    name = string

    # Name of the EKS cluster that the Fargate Profile belongs to.
    eks_cluster_name = string

    # List of VPC subnet IDs to use for the Pods.
    worker_subnet_ids = list(string)

    # ARN of an IAM role to use for the Pod execution. This role is primarily used to setup the container, like pulling
    # the container image, setting up volumes, mounting secrets, etc.
    pod_execution_role_arn = string
  })
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="null"/>
<HclGeneralListItem title="More Details">
<details>


```hcl

     Name of the EKS cluster that the Fargate Profile belongs to.

```
</details>

<details>


```hcl

     List of VPC subnet IDs to use for the Pods.

```
</details>

<details>


```hcl

     ARN of an IAM role to use for the Pod execution. This role is primarily used to setup the container, like pulling
     the container image, setting up volumes, mounting secrets, etc.

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="log_level" requirement="optional" type="string">
<HclListItemDescription>

Logging verbosity level. Must be one of (in order of most verbose to least): trace, debug, info, warn, error, fatal, panic.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;info&quot;"/>
</HclListItem>

<HclListItem name="pod_annotations" requirement="optional" type="map(string)">
<HclListItemDescription>

Key value pairs of strings to apply as annotations on the Pod.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="pod_labels" requirement="optional" type="map(string)">
<HclListItemDescription>

Key value pairs of strings to apply as labels on the Pod.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="refresh_interval" requirement="optional" type="string">
<HclListItemDescription>

Interval to poll the Namespace for aws-auth ConfigMaps to merge as a duration string (e.g. 5m10s for 5 minutes 10 seconds).

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;5m&quot;"/>
</HclListItem>

<HclListItem name="service_account_annotations" requirement="optional" type="map(string)">
<HclListItemDescription>

Key value pairs of strings to apply as annotations on the ServiceAccount.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="service_account_labels" requirement="optional" type="map(string)">
<HclListItemDescription>

Key value pairs of strings to apply as labels on the ServiceAccount.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="service_account_name" requirement="optional" type="string">
<HclListItemDescription>

Name to apply to the ServiceAccount for the aws-auth-merger app.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;aws-auth-merger&quot;"/>
</HclListItem>

<HclListItem name="service_account_role_annotations" requirement="optional" type="map(string)">
<HclListItemDescription>

Key value pairs of strings to apply as annotations on the RBAC Role for the ServiceAccount.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="service_account_role_binding_annotations" requirement="optional" type="map(string)">
<HclListItemDescription>

Key value pairs of strings to apply as annotations on the RBAC Role Binding for the ServiceAccount.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="service_account_role_binding_labels" requirement="optional" type="map(string)">
<HclListItemDescription>

Key value pairs of strings to apply as labels on the RBAC Role Binding for the ServiceAccount.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="service_account_role_binding_name" requirement="optional" type="string">
<HclListItemDescription>

Name to apply to the RBAC Role Binding for the ServiceAccount.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;aws-auth-merger&quot;"/>
</HclListItem>

<HclListItem name="service_account_role_labels" requirement="optional" type="map(string)">
<HclListItemDescription>

Key value pairs of strings to apply as labels on the RBAC Role for the ServiceAccount.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="service_account_role_name" requirement="optional" type="string">
<HclListItemDescription>

Name to apply to the RBAC Role for the ServiceAccount.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;aws-auth-merger&quot;"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="namespace">
<HclListItemDescription>

The name of the namespace that is used. If create_namespace is true, this output is only computed after the namespace is done creating.

</HclListItemDescription>
</HclListItem>

</TabItem>
</Tabs>

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-eks/tree/v1.1.1/modules/eks-aws-auth-merger/readme.adoc",
    "https://github.com/gruntwork-io/terraform-aws-eks/tree/v1.1.1/modules/eks-aws-auth-merger/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-eks/tree/v1.1.1/modules/eks-aws-auth-merger/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "53989034e360fc46f0aa02db708ea3ad"
}
##DOCS-SOURCER-END -->

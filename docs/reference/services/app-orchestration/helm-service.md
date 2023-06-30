---
type: "service"
name: "Helm Service"
description: "Deploy any Helm chart using Terraform"
cloud: "aws"
tags: ["helm","docker","orchestration","kubernetes","containers"]
license: "gruntwork"
built-with: "terraform, helm"
title: "Helm Service"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../src/components/HclListItem.tsx';

<VersionBadge version="0.104.14" lastModifiedVersion="0.100.0"/>

# Helm Service

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/modules/services/helm-service" className="link-button" title="View the source code for this service in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases?q=services%2Fhelm-service" className="link-button" title="Release notes for only versions which impacted this service.">Release Notes</a>

## Overview

This service contains [Terraform](https://www.terraform.io) code to deploy an arbitrary [Helm chart](https://helm.sh/) to
[Kubernetes](https://kubernetes.io/) following best practices.

This module is intended to deploy third-party applications already packaged as Helm Charts, such as those available in [bitnami](https://bitnami.com/stacks/helm). If you want to deploy your own application containers to Kubernetes, see the [`k8s-service`](/reference/services/app-orchestration/kubernetes-service) module.

![Kubernetes Service architecture](/img/reference/services/app-orchestration/k8s-service-architecture.png)

## Features

*   Deploy any Helm chart using Terraform
*   Managed with Helm

## Learn

:::note

This repo is a part of the [Gruntwork Service Catalog](https://github.com/gruntwork-io/terraform-aws-service-catalog/),
a collection of reusable, battle-tested, production ready infrastructure code.
If you’ve never used the Service Catalog before, make sure to read
[How to use the Gruntwork Service Catalog](https://docs.gruntwork.io/reference/services/intro/overview)!

:::

### Core concepts

*   [Kubernetes core concepts](https://docs.gruntwork.io/guides/build-it-yourself/kubernetes-cluster/core-concepts/what-is-kubernetes):
    learn about Kubernetes architecture (control plane, worker nodes), access control (authentication, authorization,
    resources (pods, controllers, services, config, secrets), and more.

*   [How do you run applications on Kubernetes?](https://github.com/gruntwork-io/helm-kubernetes-services/blob/master/core-concepts.md#how-do-you-run-applications-on-kubernetes)

*   [What is Helm?](https://github.com/gruntwork-io/helm-kubernetes-services/blob/master/core-concepts.md#what-is-helm)

*   *[Kubernetes in Action](https://www.manning.com/books/kubernetes-in-action)*: the best book we’ve found for getting up
    and running with Kubernetes.

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
# DEPLOY GRUNTWORK'S HELM-SERVICE MODULE
# ------------------------------------------------------------------------------------------------------

module "helm_service" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-service-catalog.git//modules/helm-service?ref=v0.104.14"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The name of the application (e.g. my-service-stage). Used for labeling
  # Kubernetes resources.
  application_name = <string>

  # Chart name to be installed. The chart name can be local path, a URL to a
  # chart, or the name of the chart if repository is specified. It is also
  # possible to use the <repository>/<chart> format here if you are running
  # Terraform on a system that the repository has been added to with helm repo
  # add but this is not recommended.
  helm_chart = <string>

  # Repository URL where to locate the requested chart.
  helm_repository = <string>

  # The Kubernetes Namespace to deploy the helm chart into.
  namespace = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Configuration for using the IAM role with Service Accounts feature to
  # provide permissions to the applications. This expects a map with two
  # properties: `openid_connect_provider_arn` and `openid_connect_provider_url`.
  # The `openid_connect_provider_arn` is the ARN of the OpenID Connect Provider
  # for EKS to retrieve IAM credentials, while `openid_connect_provider_url` is
  # the URL. Leave as an empty string if you do not wish to use IAM role with
  # Service Accounts.
  eks_iam_role_for_service_accounts_config = null

  # Map of values to pass to the Helm chart. Leave empty to use chart default
  # values.
  helm_chart_values = {}

  # Specify the exact chart version to install. If this is not specified, the
  # latest version is installed.
  helm_chart_version = null

  # An object defining the policy to attach to `iam_role_name` if the IAM role
  # is going to be created. Accepts a map of objects, where the map keys are
  # sids for IAM policy statements, and the object fields are the resources,
  # actions, and the effect ("Allow" or "Deny") of the statement. Ignored if
  # `iam_role_arn` is provided. Leave as null if you do not wish to use IAM role
  # with Service Accounts.
  iam_policy = null

  # Whether or not the IAM role passed in `iam_role_name` already exists. Set to
  # true if it exists, or false if it needs to be created. Defaults to false.
  iam_role_exists = false

  # The name of an IAM role that will be used by the pod to access the AWS API.
  # If `iam_role_exists` is set to false, this role will be created. Leave as an
  # empty string if you do not wish to use IAM role with Service Accounts.
  iam_role_name = ""

  # The name of a service account to create for use with the Pods. This service
  # account will be mapped to the IAM role defined in `var.iam_role_name` to
  # give the pod permissions to access the AWS API. Must be unique in this
  # namespace. Leave as an empty string if you do not wish to assign a Service
  # Account to the Pods.
  service_account_name = ""

  # Sleep for 30 seconds to allow Kubernetes time to remove associated AWS
  # resources.
  sleep_for_resource_culling = false

  # When true, wait until Pods are up and healthy or wait_timeout seconds before
  # exiting terraform.
  wait = true

  # Number of seconds to wait for Pods to become healthy before marking the
  # deployment as a failure.
  wait_timeout = 300

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S HELM-SERVICE MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-service-catalog.git//modules/helm-service?ref=v0.104.14"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The name of the application (e.g. my-service-stage). Used for labeling
  # Kubernetes resources.
  application_name = <string>

  # Chart name to be installed. The chart name can be local path, a URL to a
  # chart, or the name of the chart if repository is specified. It is also
  # possible to use the <repository>/<chart> format here if you are running
  # Terraform on a system that the repository has been added to with helm repo
  # add but this is not recommended.
  helm_chart = <string>

  # Repository URL where to locate the requested chart.
  helm_repository = <string>

  # The Kubernetes Namespace to deploy the helm chart into.
  namespace = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Configuration for using the IAM role with Service Accounts feature to
  # provide permissions to the applications. This expects a map with two
  # properties: `openid_connect_provider_arn` and `openid_connect_provider_url`.
  # The `openid_connect_provider_arn` is the ARN of the OpenID Connect Provider
  # for EKS to retrieve IAM credentials, while `openid_connect_provider_url` is
  # the URL. Leave as an empty string if you do not wish to use IAM role with
  # Service Accounts.
  eks_iam_role_for_service_accounts_config = null

  # Map of values to pass to the Helm chart. Leave empty to use chart default
  # values.
  helm_chart_values = {}

  # Specify the exact chart version to install. If this is not specified, the
  # latest version is installed.
  helm_chart_version = null

  # An object defining the policy to attach to `iam_role_name` if the IAM role
  # is going to be created. Accepts a map of objects, where the map keys are
  # sids for IAM policy statements, and the object fields are the resources,
  # actions, and the effect ("Allow" or "Deny") of the statement. Ignored if
  # `iam_role_arn` is provided. Leave as null if you do not wish to use IAM role
  # with Service Accounts.
  iam_policy = null

  # Whether or not the IAM role passed in `iam_role_name` already exists. Set to
  # true if it exists, or false if it needs to be created. Defaults to false.
  iam_role_exists = false

  # The name of an IAM role that will be used by the pod to access the AWS API.
  # If `iam_role_exists` is set to false, this role will be created. Leave as an
  # empty string if you do not wish to use IAM role with Service Accounts.
  iam_role_name = ""

  # The name of a service account to create for use with the Pods. This service
  # account will be mapped to the IAM role defined in `var.iam_role_name` to
  # give the pod permissions to access the AWS API. Must be unique in this
  # namespace. Leave as an empty string if you do not wish to assign a Service
  # Account to the Pods.
  service_account_name = ""

  # Sleep for 30 seconds to allow Kubernetes time to remove associated AWS
  # resources.
  sleep_for_resource_culling = false

  # When true, wait until Pods are up and healthy or wait_timeout seconds before
  # exiting terraform.
  wait = true

  # Number of seconds to wait for Pods to become healthy before marking the
  # deployment as a failure.
  wait_timeout = 300

}


```

</TabItem>
</Tabs>



## Reference


<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Required

<HclListItem name="application_name" requirement="required" type="string">
<HclListItemDescription>

The name of the application (e.g. my-service-stage). Used for labeling Kubernetes resources.

</HclListItemDescription>
</HclListItem>

<HclListItem name="helm_chart" requirement="required" type="string">
<HclListItemDescription>

Chart name to be installed. The chart name can be local path, a URL to a chart, or the name of the chart if repository is specified. It is also possible to use the &lt;repository>/&lt;chart> format here if you are running Terraform on a system that the repository has been added to with helm repo add but this is not recommended.

</HclListItemDescription>
</HclListItem>

<HclListItem name="helm_repository" requirement="required" type="string">
<HclListItemDescription>

Repository URL where to locate the requested chart.

</HclListItemDescription>
</HclListItem>

<HclListItem name="namespace" requirement="required" type="string">
<HclListItemDescription>

The Kubernetes Namespace to deploy the helm chart into.

</HclListItemDescription>
</HclListItem>

### Optional

<HclListItem name="eks_iam_role_for_service_accounts_config" requirement="optional" type="object(…)">
<HclListItemDescription>

Configuration for using the IAM role with Service Accounts feature to provide permissions to the applications. This expects a map with two properties: `openid_connect_provider_arn` and `openid_connect_provider_url`. The `openid_connect_provider_arn` is the ARN of the OpenID Connect Provider for EKS to retrieve IAM credentials, while `openid_connect_provider_url` is the URL. Leave as an empty string if you do not wish to use IAM role with Service Accounts.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
object({
    openid_connect_provider_arn = string
    openid_connect_provider_url = string
  })
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="helm_chart_values" requirement="optional" type="any">
<HclListItemDescription>

Map of values to pass to the Helm chart. Leave empty to use chart default values.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
Any types represent complex values of variable type. For details, please consult `variables.tf` in the source repo.
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="helm_chart_version" requirement="optional" type="string">
<HclListItemDescription>

Specify the exact chart version to install. If this is not specified, the latest version is installed.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="iam_policy" requirement="optional" type="map(object(…))">
<HclListItemDescription>

An object defining the policy to attach to `iam_role_name` if the IAM role is going to be created. Accepts a map of objects, where the map keys are sids for IAM policy statements, and the object fields are the resources, actions, and the effect ('Allow' or 'Deny') of the statement. Ignored if `iam_role_arn` is provided. Leave as null if you do not wish to use IAM role with Service Accounts.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
map(object({
    resources = list(string)
    actions   = list(string)
    effect    = string
  }))
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="null"/>
<HclGeneralListItem title="Examples">
<details>
  <summary>Example</summary>


```hcl
   iam_policy = {
     S3Access = {
       actions = ["s3:*"]
       resources = ["arn:aws:s3:::mybucket"]
       effect = "Allow"
     },
     SecretsManagerAccess = {
       actions = ["secretsmanager:GetSecretValue"],
       resources = ["arn:aws:secretsmanager:us-east-1:0123456789012:secret:mysecert"]
       effect = "Allow"
     }
   }

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="iam_role_exists" requirement="optional" type="bool">
<HclListItemDescription>

Whether or not the IAM role passed in `iam_role_name` already exists. Set to true if it exists, or false if it needs to be created. Defaults to false.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="iam_role_name" requirement="optional" type="string">
<HclListItemDescription>

The name of an IAM role that will be used by the pod to access the AWS API. If `iam_role_exists` is set to false, this role will be created. Leave as an empty string if you do not wish to use IAM role with Service Accounts.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;&quot;"/>
</HclListItem>

<HclListItem name="service_account_name" requirement="optional" type="string">
<HclListItemDescription>

The name of a service account to create for use with the Pods. This service account will be mapped to the IAM role defined in `<a href="#iam_role_name"><code>iam_role_name</code></a>` to give the pod permissions to access the AWS API. Must be unique in this namespace. Leave as an empty string if you do not wish to assign a Service Account to the Pods.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;&quot;"/>
</HclListItem>

<HclListItem name="sleep_for_resource_culling" requirement="optional" type="bool">
<HclListItemDescription>

Sleep for 30 seconds to allow Kubernetes time to remove associated AWS resources.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="wait" requirement="optional" type="bool">
<HclListItemDescription>

When true, wait until Pods are up and healthy or wait_timeout seconds before exiting terraform.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="wait_timeout" requirement="optional" type="number">
<HclListItemDescription>

Number of seconds to wait for Pods to become healthy before marking the deployment as a failure.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="300"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">



</TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/modules/services/helm-service/README.md",
    "https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/modules/services/helm-service/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/modules/services/helm-service/outputs.tf"
  ],
  "sourcePlugin": "service-catalog-api",
  "hash": "4a95ebd2a5e49ce03c49fb77523aa438"
}
##DOCS-SOURCER-END -->

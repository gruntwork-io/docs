---
title: "K8S External DNS Module"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Amazon EKS" version="3.1.1" lastModifiedVersion="2.1.1"/>

# K8S External DNS Module

<a href="https://github.com/gruntwork-io/terraform-aws-eks/tree/v3.1.1/modules/eks-k8s-external-dns" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v2.1.1" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This Terraform Module installs and configures [the external-dns
application](https://github.com/kubernetes-incubator/external-dns) on an EKS cluster, so that you can configure Route 53
Hosted Zones to point DNS records to [Ingress](https://kubernetes.io/docs/concepts/services-networking/ingress/)
endpoints.

This module uses the official [Kubernetes SIGs external-dns helm chart](https://github.com/kubernetes-sigs/external-dns/tree/master/charts/external-dns), with a set of best practices input.

## How does this work?

This module solves the problem of linking a known domain name to an `Ingress` endpoint managed with Kubernetes. It is
common to setup [name based virtual
hosting](https://kubernetes.io/docs/concepts/services-networking/ingress/#name-based-virtual-hosting) with `Ingress`
resources, allowing multiple domain names to route to different services on a single `Ingress` resource. For this to
work, you need to map the domain name to the `Ingress` endpoint, so that requests to that domain name end up at the
`Ingress` endpoint. Normally, you will need to manually create the DNS records yourself after the `Ingress` resource has
been created and provisioned. However, this can be cumbersome due to the asynchronous nature of Kubernetes operations.

For example, if you are using an `Ingress` controller that maps to actual physical loadbalancers in the cloud (e.g the
[ALB Ingress Controller deployed using the eks-alb-ingress-controller module](https://github.com/gruntwork-io/terraform-aws-eks/tree/v3.1.1/modules/eks-alb-ingress-controller)), the
endpoint may take several minutes before it is available. You will have to wait for that time, continuously polling the
`Ingress` resource until the underlying resource is provisioned and the endpoint is available before you can configure the
DNS setting.

The `external-dns` application automates this process by watching the `Ingress` resource for the endpoint to be
provisioned, and when it is, updating the hosted zone of the mapped hostnames with record sets that map to the `Ingress`
endpoint.

This is automatically handled when:

*   You set a hostname for any rule on the `Ingress` resource.
*   There exists a corresponding Hosted Zone that maps to the hostname set on the `Ingress` resource.

Note that the second condition implies that the Hosted Zones must already exist. This will not automatically register
public domains, or create private hosted zones for you.

## Prerequisites

### Helm setup

This module uses [`helm` v3](https://helm.sh/docs/) to deploy the controller to the Kubernetes cluster.

### IAM permissions

The container deployed in this module requires IAM permissions to manage Route 53 Hosted Zones. See [the
eks-k8s-external-dns-iam-policy module](https://github.com/gruntwork-io/terraform-aws-eks/tree/v3.1.1/modules/eks-k8s-external-dns-iam-policy) for more information.

## How do I restrict which Hosted Zones the app should manage?

If you have certain hosted zones that are considered protected and require more control over the DNS records, you can
restrict the application to only manage the Hosted Zones that you explicitly want it to. To specify the zones that the
app should manage, use the `route53_hosted_zone_id_filters` and `route53_hosted_zone_domain_filters` input variables.
The former specifies zones by ID, while the latter specifies zones by name.

For example, if you want the app to only manage hosted zones that end with the name `k8s.local`, you can set
`route53_hosted_zone_domain_filters = ["k8s.local"]` in your input variables. This means that the app will only create
records for any hostnames on `Ingress` resources that end with the domain `k8s.local`, and ignore all others, even if
there exists corresponding Route 53 Hosted Zones.

## How do I deploy the Pods to Fargate?

To deploy the Pods to Fargate, you can use the `create_fargate_profile` variable to `true` and specify the subnet IDs
for Fargate using `vpc_worker_subnet_ids`. Note that if you are using Fargate, you must rely on the IAM Roles for
Service Accounts (IRSA) feature to grant the necessary AWS IAM permissions to the Pod. This is configured using the
`use_iam_role_for_service_accounts`, `eks_openid_connect_provider_arn`, and `eks_openid_connect_provider_url` input
variables.

## How do I address throttling with the Route 53 API?

Route53 has a [5 API requests per second per account hard
quota](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/DNSLimitations.html#limits-api-requests-route-53).
If you have many EKS instances in an account with `external-dns`, you will easily hit these limits. If you find yourself
hitting these limits frequently, consider tweaking the parameters of `external-dns` to reduce the number of API calls it
makes.

The `external-dns` team recommends [the following
settings](https://github.com/kubernetes-sigs/external-dns/blob/6b3baec/docs/tutorials/aws.md#throttling) if you have more
than one `external-dns` instance in your account:

```hcl
trigger_loop_on_event = true
poll_interval         = "5m"
batch_change_size     = 4000
batch_change_interval = "10s"
zones_cache_duration  = "3h"
```

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S EKS-K8S-EXTERNAL-DNS MODULE
# ------------------------------------------------------------------------------------------------------

module "eks_k_8_s_external_dns" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-eks.git//modules/eks-k8s-external-dns?ref=v3.1.1"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The AWS region to deploy ALB resources into.
  aws_region = <string>

  # Configuration for using the IAM role with Service Accounts feature to
  # provide permissions to the helm charts. This expects a map with two
  # properties: `openid_connect_provider_arn` and `openid_connect_provider_url`.
  # The `openid_connect_provider_arn` is the ARN of the OpenID Connect Provider
  # for EKS to retrieve IAM credentials, while `openid_connect_provider_url` is
  # the URL. Set to null if you do not wish to use IAM role with Service
  # Accounts, or if you wish to provide an IAM role directly via
  # service_account_annotations.
  iam_role_for_service_accounts_config = <object(
    openid_connect_provider_arn = string
    openid_connect_provider_url = string
  )>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The AWS partition used for default AWS Resources.
  aws_partition = "aws"

  # Duration string (e.g. 1m) indicating the interval between making changes to
  # Route 53. When null, use the default defined in the chart (1s).
  batch_change_interval = null

  # The maximum number of changes that should be applied in a batch. When null,
  # use the default defined in the chart (1000).
  batch_change_size = null

  # When set to true, create a dedicated Fargate execution profile for the
  # external-dns service. Note that this is not necessary to deploy to Fargate.
  # For example, if you already have an execution profile for the kube-system
  # Namespace, you do not need another one.
  create_fargate_profile = false

  # Tags to apply to all AWS resources managed by this module.
  default_tags = {}

  # Create a dependency between the resources in this module to the interpolated
  # values in this list (and thus the source resources). In other words, the
  # resources in this module will now depend on the resources backing the values
  # in this list such that those resources need to be created before the
  # resources in this module, and the resources in this module need to be
  # destroyed before the resources in the list.
  dependencies = []

  # Used to name IAM roles for the service account. Recommended when
  # var.use_iam_role_for_service_accounts is true. Also used for creating the
  # Fargate profile when var.create_fargate_profile is true.
  eks_cluster_name = null

  # Limit sources of endpoints to a specific namespace (default: all
  # namespaces).
  endpoints_namespace = null

  # Name of the Helm chart for external-dns. This should usually be
  # 'external-dns' but may differ in the case of overriding the repository URL.
  external_dns_chart_name = "external-dns"

  # Helm chart repository URL to obtain the external-dns chart from. Uses the
  # official Kubernetes SIGs upstream chart by default.
  external_dns_chart_repository_url = "https://kubernetes-sigs.github.io/external-dns/"

  # The version of the helm chart to use. Note that this is different from the
  # app/container version. This now defaults to the Kubernetes SIGs chart
  # version.
  external_dns_chart_version = "1.15.0"

  # A map of custom tags to apply to the External DNS Fargate Profile IAM Role
  # if enabled. The key is the tag name and the value is the tag value.
  external_dns_fargate_profile_iam_role_tags = {}

  # A map of custom tags to apply to the External DNS Fargate Profile if
  # enabled. The key is the tag name and the value is the tag value.
  external_dns_fargate_profile_tags = {}

  # A map of custom tags to apply to the External DNS IAM Policies if enabled.
  # The key is the tag name and the value is the tag value.
  external_dns_iam_policy_tags = {}

  # A map of custom tags to apply to the External DNS IAM Role if enabled. The
  # key is the tag name and the value is the tag value.
  external_dns_iam_role_tags = {}

  # The container image registry to pull the images from.
  image_registry = null

  # The container image repository to pull the images from. This allows
  # overriding the default image repository for external-dns. When null, uses
  # the chart's default image repository.
  image_repository = null

  # Which format to output external-dns logs in (options: text, json)
  log_format = "text"

  # Which Kubernetes Namespace to deploy the chart into.
  namespace = "kube-system"

  # Annotations to apply to the Pod that is deployed, as key value pairs.
  pod_annotations = {}

  # ARN of IAM Role to use as the Pod execution role for Fargate. Set to null
  # (default) to create a new one. Only used when var.create_fargate_profile is
  # true.
  pod_execution_iam_role_arn = null

  # Labels to apply to the Pod that is deployed, as key value pairs.
  pod_labels = {}

  # Configure affinity rules for the Pod to control which nodes to schedule on.
  # Each item in the list should be a map with the keys `key`, `values`, and
  # `operator`, corresponding to the 3 properties of matchExpressions. Note that
  # all expressions must be satisfied to schedule on the node.
  pod_node_affinity = []

  # Configure tolerations rules to allow the Pod to schedule on nodes that have
  # been tainted. Each item in the list specifies a toleration rule.
  pod_tolerations = []

  # Duration string (e.g. 1m) indicating the polling interval for syncing the
  # domains. When null, use the default defined in the chart (1m).
  poll_interval = null

  # Name of helm release for external-dns. Useful when running 2 deployments for
  # custom configrations such as cross account access.
  release_name = "external-dns"

  # Only create records in hosted zones that match the provided domain names.
  # Empty list (default) means match all zones. Zones must satisfy all three
  # constraints (var.route53_hosted_zone_tag_filters,
  # var.route53_hosted_zone_id_filters, and
  # var.route53_hosted_zone_domain_filters).
  route53_hosted_zone_domain_filters = []

  # Only create records in hosted zones that match the provided IDs. Empty list
  # (default) means match all zones. Zones must satisfy all three constraints
  # (var.route53_hosted_zone_tag_filters, var.route53_hosted_zone_id_filters,
  # and var.route53_hosted_zone_domain_filters).
  route53_hosted_zone_id_filters = []

  # Only create records in hosted zones that match the provided tags. Each item
  # in the list should specify tag key and tag value as a map. Empty list
  # (default) means match all zones. Zones must satisfy all three constraints
  # (var.route53_hosted_zone_tag_filters, var.route53_hosted_zone_id_filters,
  # and var.route53_hosted_zone_domain_filters).
  route53_hosted_zone_tag_filters = []

  # Policy for how DNS records are sychronized between sources and providers
  # (options: sync, upsert-only ).
  route53_record_update_policy = "upsert-only"

  # Annotations to apply to the ServiceAccount created for the external-dns app,
  # formatted as key value pairs.
  service_account_annotations = {}

  # K8s resources type to be observed for new DNS entries by ExternalDNS.
  sources = ["ingress","service"]

  # When enabled, triggers external-dns run loop on create/update/delete events
  # (optional, in addition of regular interval)
  trigger_loop_on_event = false

  # A unique identifier used to identify this instance of external-dns. This is
  # used to tag the DNS TXT records to know which domains are owned by this
  # instance of external-dns, in case multiple external-dns services are
  # managing the same Hosted Zone.
  txt_owner_id = "default"

  # A list of the subnets into which the EKS Cluster's administrative pods will
  # be launched. These should usually be all private subnets and include one in
  # each AWS Availability Zone. Required when var.create_fargate_profile is
  # true.
  vpc_worker_subnet_ids = []

  # Duration string (e.g. 1m) indicating the amount of time the Hosted Zones are
  # cached. When null, use the default defined in the chart (0 - no caching).
  zones_cache_duration = null

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S EKS-K8S-EXTERNAL-DNS MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-eks.git//modules/eks-k8s-external-dns?ref=v3.1.1"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The AWS region to deploy ALB resources into.
  aws_region = <string>

  # Configuration for using the IAM role with Service Accounts feature to
  # provide permissions to the helm charts. This expects a map with two
  # properties: `openid_connect_provider_arn` and `openid_connect_provider_url`.
  # The `openid_connect_provider_arn` is the ARN of the OpenID Connect Provider
  # for EKS to retrieve IAM credentials, while `openid_connect_provider_url` is
  # the URL. Set to null if you do not wish to use IAM role with Service
  # Accounts, or if you wish to provide an IAM role directly via
  # service_account_annotations.
  iam_role_for_service_accounts_config = <object(
    openid_connect_provider_arn = string
    openid_connect_provider_url = string
  )>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The AWS partition used for default AWS Resources.
  aws_partition = "aws"

  # Duration string (e.g. 1m) indicating the interval between making changes to
  # Route 53. When null, use the default defined in the chart (1s).
  batch_change_interval = null

  # The maximum number of changes that should be applied in a batch. When null,
  # use the default defined in the chart (1000).
  batch_change_size = null

  # When set to true, create a dedicated Fargate execution profile for the
  # external-dns service. Note that this is not necessary to deploy to Fargate.
  # For example, if you already have an execution profile for the kube-system
  # Namespace, you do not need another one.
  create_fargate_profile = false

  # Tags to apply to all AWS resources managed by this module.
  default_tags = {}

  # Create a dependency between the resources in this module to the interpolated
  # values in this list (and thus the source resources). In other words, the
  # resources in this module will now depend on the resources backing the values
  # in this list such that those resources need to be created before the
  # resources in this module, and the resources in this module need to be
  # destroyed before the resources in the list.
  dependencies = []

  # Used to name IAM roles for the service account. Recommended when
  # var.use_iam_role_for_service_accounts is true. Also used for creating the
  # Fargate profile when var.create_fargate_profile is true.
  eks_cluster_name = null

  # Limit sources of endpoints to a specific namespace (default: all
  # namespaces).
  endpoints_namespace = null

  # Name of the Helm chart for external-dns. This should usually be
  # 'external-dns' but may differ in the case of overriding the repository URL.
  external_dns_chart_name = "external-dns"

  # Helm chart repository URL to obtain the external-dns chart from. Uses the
  # official Kubernetes SIGs upstream chart by default.
  external_dns_chart_repository_url = "https://kubernetes-sigs.github.io/external-dns/"

  # The version of the helm chart to use. Note that this is different from the
  # app/container version. This now defaults to the Kubernetes SIGs chart
  # version.
  external_dns_chart_version = "1.15.0"

  # A map of custom tags to apply to the External DNS Fargate Profile IAM Role
  # if enabled. The key is the tag name and the value is the tag value.
  external_dns_fargate_profile_iam_role_tags = {}

  # A map of custom tags to apply to the External DNS Fargate Profile if
  # enabled. The key is the tag name and the value is the tag value.
  external_dns_fargate_profile_tags = {}

  # A map of custom tags to apply to the External DNS IAM Policies if enabled.
  # The key is the tag name and the value is the tag value.
  external_dns_iam_policy_tags = {}

  # A map of custom tags to apply to the External DNS IAM Role if enabled. The
  # key is the tag name and the value is the tag value.
  external_dns_iam_role_tags = {}

  # The container image registry to pull the images from.
  image_registry = null

  # The container image repository to pull the images from. This allows
  # overriding the default image repository for external-dns. When null, uses
  # the chart's default image repository.
  image_repository = null

  # Which format to output external-dns logs in (options: text, json)
  log_format = "text"

  # Which Kubernetes Namespace to deploy the chart into.
  namespace = "kube-system"

  # Annotations to apply to the Pod that is deployed, as key value pairs.
  pod_annotations = {}

  # ARN of IAM Role to use as the Pod execution role for Fargate. Set to null
  # (default) to create a new one. Only used when var.create_fargate_profile is
  # true.
  pod_execution_iam_role_arn = null

  # Labels to apply to the Pod that is deployed, as key value pairs.
  pod_labels = {}

  # Configure affinity rules for the Pod to control which nodes to schedule on.
  # Each item in the list should be a map with the keys `key`, `values`, and
  # `operator`, corresponding to the 3 properties of matchExpressions. Note that
  # all expressions must be satisfied to schedule on the node.
  pod_node_affinity = []

  # Configure tolerations rules to allow the Pod to schedule on nodes that have
  # been tainted. Each item in the list specifies a toleration rule.
  pod_tolerations = []

  # Duration string (e.g. 1m) indicating the polling interval for syncing the
  # domains. When null, use the default defined in the chart (1m).
  poll_interval = null

  # Name of helm release for external-dns. Useful when running 2 deployments for
  # custom configrations such as cross account access.
  release_name = "external-dns"

  # Only create records in hosted zones that match the provided domain names.
  # Empty list (default) means match all zones. Zones must satisfy all three
  # constraints (var.route53_hosted_zone_tag_filters,
  # var.route53_hosted_zone_id_filters, and
  # var.route53_hosted_zone_domain_filters).
  route53_hosted_zone_domain_filters = []

  # Only create records in hosted zones that match the provided IDs. Empty list
  # (default) means match all zones. Zones must satisfy all three constraints
  # (var.route53_hosted_zone_tag_filters, var.route53_hosted_zone_id_filters,
  # and var.route53_hosted_zone_domain_filters).
  route53_hosted_zone_id_filters = []

  # Only create records in hosted zones that match the provided tags. Each item
  # in the list should specify tag key and tag value as a map. Empty list
  # (default) means match all zones. Zones must satisfy all three constraints
  # (var.route53_hosted_zone_tag_filters, var.route53_hosted_zone_id_filters,
  # and var.route53_hosted_zone_domain_filters).
  route53_hosted_zone_tag_filters = []

  # Policy for how DNS records are sychronized between sources and providers
  # (options: sync, upsert-only ).
  route53_record_update_policy = "upsert-only"

  # Annotations to apply to the ServiceAccount created for the external-dns app,
  # formatted as key value pairs.
  service_account_annotations = {}

  # K8s resources type to be observed for new DNS entries by ExternalDNS.
  sources = ["ingress","service"]

  # When enabled, triggers external-dns run loop on create/update/delete events
  # (optional, in addition of regular interval)
  trigger_loop_on_event = false

  # A unique identifier used to identify this instance of external-dns. This is
  # used to tag the DNS TXT records to know which domains are owned by this
  # instance of external-dns, in case multiple external-dns services are
  # managing the same Hosted Zone.
  txt_owner_id = "default"

  # A list of the subnets into which the EKS Cluster's administrative pods will
  # be launched. These should usually be all private subnets and include one in
  # each AWS Availability Zone. Required when var.create_fargate_profile is
  # true.
  vpc_worker_subnet_ids = []

  # Duration string (e.g. 1m) indicating the amount of time the Hosted Zones are
  # cached. When null, use the default defined in the chart (0 - no caching).
  zones_cache_duration = null

}


```

</TabItem>
</Tabs>

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-eks/tree/v3.1.1/modules/eks-k8s-external-dns/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-eks/tree/v3.1.1/modules/eks-k8s-external-dns/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-eks/tree/v3.1.1/modules/eks-k8s-external-dns/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "0094342b2f2601ac0c184041da089296"
}
##DOCS-SOURCER-END -->

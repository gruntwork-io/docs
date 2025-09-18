---
title: "ALB Ingress Controller Module"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Amazon EKS" version="2.0.0" lastModifiedVersion="1.1.1"/>

# ALB Ingress Controller Module

<a href="https://github.com/gruntwork-io/terraform-aws-eks/tree/v2.0.0/modules/eks-alb-ingress-controller" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v1.1.1" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This Terraform Module installs and configures the [AWS ALB Ingress
Controller](https://github.com/kubernetes-sigs/aws-alb-ingress-controller) on an EKS cluster, so that you can configure
an ALB using [Ingress](https://kubernetes.io/docs/concepts/services-networking/ingress/) resources.

This module uses the [community helm chart](https://github.com/aws/eks-charts), with a set of best practices input.

#### Note: v2

We're now supporting v2 of the AWS Load Balancer Ingress Controller. The AWS Load Balancer Ingress Controller v2 has many new features, and is considered backwards incompatible with the existing AWS resources it manages. Please note, that it can't coexist with the existing/older version, so you must fully undeploy the old version prior to updating. For the migration steps, please refer to the [relevant Release notes for this module](https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.28.0).

## How does this work?

This module solves the problem of integrating Kubernetes `Service` endpoints with an
[ALB](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/introduction.html). Out of the box Kubernetes
supports tying [a `Service` to an ELB or NLB using the `LoadBalancer`
type](https://kubernetes.io/docs/tasks/access-application-cluster/create-external-load-balancer/). However, the
`LoadBalancer` `Service` type does not support ALBs, and thus you can not implement complex routing rules based on
domain or paths.

Kubernetes uses `Ingress` resources to configure and implement "Layer 7" load balancers (where ALBs fit in the [OSI
model](https://en.wikipedia.org/wiki/OSI_model#Layer\_7:\_Application_Layer)). Kubernetes `Ingress` works by providing a
configuration framework to configure routing rules from a load balancer to `Services` within Kubernetes. For example,
suppose you wanted to provision a `Service` for your backend, fronted by a load balancer that routes any request made to
the path `/service` to the backend. To do so, in addition to creating your `Service`, you would create an `Ingress`
resource in Kubernetes that configures the routing rule:

```yaml
---
kind: Service
apiVersion: v1
metadata:
  name: backend
spec:
  selector:
    app: backend
  ports:
  - protocol: TCP
    port: 80
    targetPort: 80
---
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  name: service-ingress
spec:
  rules:
  - http:
      paths:
      - path: /service
        backend:
          serviceName: backend
          servicePort: 80
```

In the above configuration, we create a Cluster IP based `Service` (so that it is only available internally to the
Kubernetes cluster) that routes requests to port 80 to any `Pod` that maches the label `app=backend` on port 80. Then,
we configure an `Ingress` rule that routes any requests prefixed with `/service` to that `Service` endpoint on port 80.

The actual load balancer that is configured by the `Ingress` resource is defined by the particular [Ingress
Controller](https://kubernetes.io/docs/concepts/services-networking/ingress-controllers/) that you deploy onto your
Kubernetes cluster. Ingress Controllers are separate processes that run on your Kubernetes cluster that will watch for
`Ingress` resources and reflect them by provisioning or configuring load balancers. Depending on which controller you
use, the particular load balancer that is provisioned will be different. For example, if you use the [official nginx
controller](https://github.com/kubernetes/ingress-nginx/blob/e222b74/README.md), each `Ingress` resource translates into
an nginx `Pod` that implements the routing rules.

Note that each `Ingress` resource defines a separate load balancer. This means that each time you create a new `Ingress`
resource in Kubernetes, Kubernetes will provision a new load balancer configured with the rules defined by the `Ingress`
resource.

This module deploys the AWS ALB Ingress Controller, which will reflect each `Ingress` resource into an ALB resource
deployed into your AWS account.

## Prerequisites

### Helm setup

This module uses [`helm` v3](https://helm.sh/docs/) to deploy the controller to the Kubernetes cluster.

### ALB Target Type

The ALB Ingress Controller application can configure ALBs to send work either to Node IPs (`instance`) or Pod IPs (`ip`) as backend targets. This can be specified in the Ingress object using the [`alb.ingress.kubernetes.io/target-type`](https://kubernetes-sigs.github.io/aws-alb-ingress-controller/guide/ingress/annotation/#target-type). The default is `instance`.

When using the default `instance` target type, the `Services` intended to be consumed by the `Ingress` resource must be
provisioned using the `NodePort` type. This is not required when using the `ip` target type.

Note that the controller will take care of setting up the target groups on the provisioned ALB so that everything routes
correctly.

### Subnets

You can use the `alb.ingress.kubernetes.io/subnets` annotation on `Ingress` resources to specify which subnets the controller should configure the ALB for.

You can also omit the `alb.ingress.kubernetes.io/subnets` annotation, and the controller will [automatically discover subnets](https://kubernetes-sigs.github.io/aws-alb-ingress-controller/guide/controller/config/#subnet-auto-discovery) based on their tags. This method should work "out of the box", so long as you are using the [`eks-vpc-tags`](https://github.com/gruntwork-io/terraform-aws-eks/tree/v2.0.0/modules/eks-vpc-tags) module to tag your VPC subnets.

### Security Groups

As mentioned above under the [ALB Target Type](#alb-target-type) section, the default ALB target type uses node ports to connect to the
`Services`. As such if you have restricted security groups that prevent access to the provisioned ports on the worker
nodes, the ALBs will not be able to reach the `Services`.

To ensure the provisioned ALBs can access the node ports, we recommend using dedicated subnets for load balancing and
configuring your security groups so that resources provisioned in those subnets can access the node ports of the worker
nodes.

### IAM permissions

The container deployed in this module requires IAM permissions to manage ALB resources. See [the
eks-alb-ingress-controller-iam-policy module](https://github.com/gruntwork-io/terraform-aws-eks/tree/v2.0.0/modules/eks-alb-ingress-controller-iam-policy) for more information.

## Using the Ingress Controller

In order for the `Ingress` resources to properly map into an ALB, the `Ingress` resources created need to be annotated
to use the `alb` `Ingress` class. You can do this by adding the following annotation to your `Ingress` resources:

```yaml
annotations:
  kubernetes.io/ingress.class: alb
```

The ALB Ingress Controller supports a wide range of configuration options via annotations on the `Ingress` object, including setting up Cognito for
authentication. For example, you can add the annotation `alb.ingress.kubernetes.io/scheme: internet-facing` to provision
a public ALB. You can refer to the [official
documentation](https://kubernetes-sigs.github.io/aws-alb-ingress-controller/guide/ingress/annotation/) for the full
reference of configuration options supported by the controller.

## Getting the ALB endpoint

The ALB endpoint is recorded on the `Ingress` resource. You can use `kubectl` or the Kubernetes API to retrieve the
`Ingress` resource and view the endpoint for the ALB under the `Address` attribute.

For example, suppose you provisioned the following `Ingress` resource in the default namespace:

```yaml
---
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  name: service-ingress
  annotations:
    kubernetes.io/ingress.class: alb
spec:
  rules:
  - http:
      paths:
      - path: /service
        backend:
          serviceName: backend
          servicePort: 80
```

To get the ALB endpoint, call `kubectl` to describe the `Ingress` resource:

```
$ kubectl describe ing service-ingress
Name:                   service-ingress
Namespace:              default
Address:                QZVpvauzhSuRBRMfjAGnbgaCaLeANaoe.us-east-2.elb.amazonaws.com
Default backend:        default-http-backend:80 (10.2.1.28:8080)
Rules:
  Host                          Path      Backends
  ----                          ----      --------
                                /service  backend:80 (<none>)
Annotations:
Events:
  FirstSeen     LastSeen        Count   From                    SubObjectPath   Type            Reason  Message
  ---------     --------        -----   ----                    -------------   --------        ------  -------
  3m            3m              1       ingress-controller                      Normal          CREATE  Ingress service-ingress/backend
  3m            32s             3       ingress-controller                      Normal          UPDATE  Ingress service-ingress/backend
```

Note how the ALB endpoint is recorded under the `Address` column. You can hit that endpoint to access the service
externally.

## DNS records for the ALB

In order for the host based routing rules to work with the ALB, you need to configure your DNS records to point to the
ALB endpoint. This can be tricky if you are managing your DNS records externally, especially given the asynchronous
nature of the controller in provisioning the ALBs.

The AWS ALB Ingress Controller has first class support for
[external-dns](https://github.com/kubernetes-incubator/external-dns), a third party tool that configures external DNS
providers with domains to route to `Services` and `Ingresses` in Kubernetes. See our [eks-k8s-external-dns
module](https://github.com/gruntwork-io/terraform-aws-eks/tree/v2.0.0/modules/eks-k8s-external-dns) for more information on how to setup the tool.

## How do I deploy the Pods to Fargate?

To deploy the Pods to Fargate, you can use the `create_fargate_profile` variable to `true` and specify the subnet IDs
for Fargate using `vpc_worker_subnet_ids`. Note that if you are using Fargate, you must rely on the IAM Roles for
Service Accounts (IRSA) feature to grant the necessary AWS IAM permissions to the Pod. This is configured using the
`use_iam_role_for_service_accounts`, `eks_openid_connect_provider_arn`, and `eks_openid_connect_provider_url` input
variables.

## How does the ALB route to Fargate?

For Pods deployed to Fargate, you must specify the annotation

```
alb.ingress.kubernetes.io/target-type: ip
```

to the Ingress resource in order for the ALB to route properly. This is because Fargate does not have actual EC2
instances under the hood, and thus the ALB can not be configured to route by instance (the default configuration).

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S EKS-ALB-INGRESS-CONTROLLER MODULE
# ------------------------------------------------------------------------------------------------------

module "eks_alb_ingress_controller" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-eks.git//modules/eks-alb-ingress-controller?ref=v2.0.0"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The AWS region to deploy ALB resources into.
  aws_region = <string>

  # The ALB Ingress Controller application uses this to find resources (e.g.
  # subnets) to associate with ALBs. Additionally, AWS resources created by the
  # Ingress controller will be prefixed with this value.
  eks_cluster_name = <string>

  # Configuration for using the IAM role with Service Accounts feature to
  # provide permissions to the helm charts. This expects a map with two
  # properties: `openid_connect_provider_arn` and `openid_connect_provider_url`.
  # The `openid_connect_provider_arn` is the ARN of the OpenID Connect Provider
  # for EKS to retrieve IAM credentials, while `openid_connect_provider_url` is
  # the URL. Set to null if you do not wish to use IAM role with Service
  # Accounts.
  iam_role_for_service_accounts_config = <object(
    openid_connect_provider_arn = string
    openid_connect_provider_url = string
  )>

  # The ID of the VPC where the EKS cluster resides. Used for determining where
  # to deploy the ALB.
  vpc_id = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # ARN of IAM Role to assume to create and control ALB's. This is useful if
  # your VPC is shared from another account and needs to be created somewhere
  # else.
  alb_iam_role_arn = null

  # The AWS partition used for default AWS Resources.
  aws_partition = "aws"

  # The version of the aws-load-balancer-controller helmchart to use.
  chart_version = "1.4.6"

  # A map of custom tags to apply to the Controller IAM Policies if enabled. The
  # key is the tag name and the value is the tag value.
  controller_iam_policy_tags = {}

  # ARN of permissions boundary to apply to the controller IAM role - the IAM
  # role created for the Ingress Controller.
  controller_iam_role_permissions_boundary = null

  # A map of custom tags to apply to the Controller IAM Role if enabled. The key
  # is the tag name and the value is the tag value.
  controller_iam_role_tags = {}

  # When set to true, create a dedicated Fargate execution profile for the alb
  # ingress controller. Note that this is not necessary to deploy to Fargate.
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

  # Command to run before uninstalling the AWS ALB Ingress Controller during
  # `terraform destroy`. Since the ingress controller manages AWS resources, you
  # may want to remove Ingress objects from the cluster and give the application
  # enough time time to notice and remove the associated resources from AWS.
  destroy_lifecycle_command = "exit 0"

  # Environment variables that will be available when
  # var.destroy_lifecycle_command runs
  destroy_lifecycle_environment = {}

  # The repository of the docker image that should be deployed.
  docker_image_repo = "602401143452.dkr.ecr.us-west-2.amazonaws.com/amazon/aws-load-balancer-controller"

  # The tag of the docker image that should be deployed.
  docker_image_tag = "v2.4.5"

  # A map of custom tags to apply to the Controller Fargate Profile IAM
  # Execution Role if enabled. The key is the tag name and the value is the tag
  # value.
  eks_fargate_profile_execution_role_tags = {}

  # A map of custom tags to apply to the Controller Fargate Profile if enabled.
  # The key is the tag name and the value is the tag value.
  eks_fargate_profile_tags = {}

  # Enables restricted Security Group rules for the load balancers managed by
  # the controller. When this is true, the load balancer will restrict the
  # target group security group rules to only use the ports that it needs.
  enable_restricted_sg_rules = false

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

  # Number of replicas of the ingress controller Pod to deploy.
  pod_replica_count = 1

  # Configure tolerations rules to allow the Pod to schedule on nodes that have
  # been tainted. Each item in the list specifies a toleration rule.
  pod_tolerations = []

  # A list of the subnets into which the EKS Cluster's administrative pods will
  # be launched. These should usually be all private subnets and include one in
  # each AWS Availability Zone. Required when var.create_fargate_profile is
  # true.
  vpc_worker_subnet_ids = []

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S EKS-ALB-INGRESS-CONTROLLER MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-eks.git//modules/eks-alb-ingress-controller?ref=v2.0.0"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The AWS region to deploy ALB resources into.
  aws_region = <string>

  # The ALB Ingress Controller application uses this to find resources (e.g.
  # subnets) to associate with ALBs. Additionally, AWS resources created by the
  # Ingress controller will be prefixed with this value.
  eks_cluster_name = <string>

  # Configuration for using the IAM role with Service Accounts feature to
  # provide permissions to the helm charts. This expects a map with two
  # properties: `openid_connect_provider_arn` and `openid_connect_provider_url`.
  # The `openid_connect_provider_arn` is the ARN of the OpenID Connect Provider
  # for EKS to retrieve IAM credentials, while `openid_connect_provider_url` is
  # the URL. Set to null if you do not wish to use IAM role with Service
  # Accounts.
  iam_role_for_service_accounts_config = <object(
    openid_connect_provider_arn = string
    openid_connect_provider_url = string
  )>

  # The ID of the VPC where the EKS cluster resides. Used for determining where
  # to deploy the ALB.
  vpc_id = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # ARN of IAM Role to assume to create and control ALB's. This is useful if
  # your VPC is shared from another account and needs to be created somewhere
  # else.
  alb_iam_role_arn = null

  # The AWS partition used for default AWS Resources.
  aws_partition = "aws"

  # The version of the aws-load-balancer-controller helmchart to use.
  chart_version = "1.4.6"

  # A map of custom tags to apply to the Controller IAM Policies if enabled. The
  # key is the tag name and the value is the tag value.
  controller_iam_policy_tags = {}

  # ARN of permissions boundary to apply to the controller IAM role - the IAM
  # role created for the Ingress Controller.
  controller_iam_role_permissions_boundary = null

  # A map of custom tags to apply to the Controller IAM Role if enabled. The key
  # is the tag name and the value is the tag value.
  controller_iam_role_tags = {}

  # When set to true, create a dedicated Fargate execution profile for the alb
  # ingress controller. Note that this is not necessary to deploy to Fargate.
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

  # Command to run before uninstalling the AWS ALB Ingress Controller during
  # `terraform destroy`. Since the ingress controller manages AWS resources, you
  # may want to remove Ingress objects from the cluster and give the application
  # enough time time to notice and remove the associated resources from AWS.
  destroy_lifecycle_command = "exit 0"

  # Environment variables that will be available when
  # var.destroy_lifecycle_command runs
  destroy_lifecycle_environment = {}

  # The repository of the docker image that should be deployed.
  docker_image_repo = "602401143452.dkr.ecr.us-west-2.amazonaws.com/amazon/aws-load-balancer-controller"

  # The tag of the docker image that should be deployed.
  docker_image_tag = "v2.4.5"

  # A map of custom tags to apply to the Controller Fargate Profile IAM
  # Execution Role if enabled. The key is the tag name and the value is the tag
  # value.
  eks_fargate_profile_execution_role_tags = {}

  # A map of custom tags to apply to the Controller Fargate Profile if enabled.
  # The key is the tag name and the value is the tag value.
  eks_fargate_profile_tags = {}

  # Enables restricted Security Group rules for the load balancers managed by
  # the controller. When this is true, the load balancer will restrict the
  # target group security group rules to only use the ports that it needs.
  enable_restricted_sg_rules = false

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

  # Number of replicas of the ingress controller Pod to deploy.
  pod_replica_count = 1

  # Configure tolerations rules to allow the Pod to schedule on nodes that have
  # been tainted. Each item in the list specifies a toleration rule.
  pod_tolerations = []

  # A list of the subnets into which the EKS Cluster's administrative pods will
  # be launched. These should usually be all private subnets and include one in
  # each AWS Availability Zone. Required when var.create_fargate_profile is
  # true.
  vpc_worker_subnet_ids = []

}


```

</TabItem>
</Tabs>

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-eks/tree/v2.0.0/modules/eks-alb-ingress-controller/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-eks/tree/v2.0.0/modules/eks-alb-ingress-controller/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-eks/tree/v2.0.0/modules/eks-alb-ingress-controller/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "e4e1648cac2f58fc8cb98b8dbbb6440f"
}
##DOCS-SOURCER-END -->

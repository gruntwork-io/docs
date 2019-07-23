---
title: "Deploying a production-grade EKS cluster"
date: 2019-05-07
tags: ["aws", "eks", "docker"]
---

This guide walks you through how to use Gruntwork's private [terraform-aws-eks
Terraform Module](https://github.com/gruntwork-io/terraform-aws-eks) available to subscribers to provision a
production grade EKS cluster.

**NOTE: All the code in this guide use modules from Gruntwork's IaC Library. You must be a paying subscriber to have
access. See gruntwork.io for more info and feel free to reach out to us at info@gruntwork.io if you have questions.**


## Prerequisites

This guide depends on `Terraform` and `kubergrunt`. You can also optionally install `kubectl` if
you would like explore the newly provisioned cluster. You can find instructions on how to install each tool below:

- [Terraform](https://learn.hashicorp.com/terraform/getting-started/install.html)
- [kubergrunt](https://github.com/gruntwork-io/kubergrunt#installation), minimum version: `0.3.9`
- (Optional) [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/)

Before you begin, be sure to set up your AWS credentials as environment variables so that all the commands
below can authenticate to the AWS account where you wish to deploy this example. You can refer to our blog post series
on AWS authentication ([A Comprehensive Guide to Authenticating to AWS on the Command
Line](https://blog.gruntwork.io/a-comprehensive-guide-to-authenticating-to-aws-on-the-command-line-63656a686799)) for
more information.

Finally, before you begin, we recommend you familiarize yourself with EKS and Kubernetes. You can [refer to the module
documentation](https://github.com/gruntwork-io/terraform-aws-eks/#what-is-kubernetes) for an introduction. You can
also go to [the official AWS documentation](https://docs.aws.amazon.com/eks/latest/userguide/what-is-eks.html) for more
details on EKS, or [the official Kubernetes documentation](https://kubernetes.io/docs/home/) for more details on
Kubernetes.


## Workspace

To follow along with the code samples, create a new directory that you will use as your workspace. This guide will
assume all your code is in the folder `production-grade-eks`:

```bash
mkdir production-grade-eks
cd production-grade-eks
```


## Overview

Once all the tools are installed, we are ready to start deploying some infrastructure!

This guide will include relevant code snippets where necessary. The complete code examples for this guide are available
in the [EKS cluster basic
example](https://github.com/gruntwork-io/terraform-aws-eks/tree/master/examples/eks-cluster-basic) in
the `terraform-aws-eks` repository.

In order to setup our production grade EKS cluster, we need to:

1. [Create a VPC for the EKS cluster](#create-a-vpc-for-the-eks-cluster)
1. [Deploy the EKS control plane](#deploy-the-eks-control-plane)
1. [Deploy an ASG for our worker nodes](#deploy-an-asg-for-our-worker-nodes)
1. [Create ConfigMap to authorize workers](#create-configmap-to-authorize-workers)
1. [(Optional) Explore the cluster using kubectl](#optional-explore-the-cluster-using-kubectl)

Once the cluster is deployed, take a look at [Where to go from here](#where-to-go-from-here) for ideas on what to do
next.


## <a name="create-a-vpc-for-the-eks-cluster"></a>Create a VPC for the EKS cluster

EKS relies on [Amazon Virtual Private Cloud](https://aws.amazon.com/vpc/) to provide a network topology to manage
communication across the nodes. For this guide, we will use the [vpc-app module in the module-vpc
repo](https://github.com/gruntwork-io/module-vpc/tree/master/modules/vpc-app) to provision a best practices VPC to house
the EKS cluster.

This VPC will provision three subnet tiers:

- **Public Subnets**: Resources in these subnets are directly addressable from the Internet. We will use this to
  provision public-facing resources (typically just load balancers).
- **Private/App Subnets**: Resources in these subnets are NOT directly addressable from the Internet but they can make
  outbound connections to the Internet through a NAT Gateway. We will use this to provision the Control Plane and Worker
  Nodes.
- **Private/Persistence Subnets**: Resources in these subnets are neither directly addressable from the Internet nor
  able to make outbound Internet connections. While we will not use this for our guide, typically this tier holds
  databases, cache servers, and other stateful resources.

EKS also relies on special tags on the VPC to know which VPC resources to use for deploying infrastructure. For example,
EKS needs to know to use the public subnet for the load balancers associated with a `Service` resource. We can use the
[eks-vpc-tags module in
terraform-aws-eks](https://github.com/gruntwork-io/terraform-aws-eks/tree/master/modules/eks-vpc-tags) for this purpose.

The following Terraform code creates the VPC and tags them for use with a EKS cluster with the given name. We will
assume the cluster name is provided via an input variable, `var.eks_cluster_name`:

```hcl
module "vpc" {
  source = "git::git@github.com:gruntwork-io/module-vpc.git//modules/vpc-app?ref=v0.5.6"

  vpc_name   = "${var.eks_cluster_name}-vpc"
  aws_region = "us-east-1"

  # These tags are used by EKS to determine which AWS resources are associated
  # with the cluster. This information will ultimately be used by the
  # [amazon-vpc-cni-k8s plugin](https://github.com/aws/amazon-vpc-cni-k8s) to
  # allocate ip addresses from the VPC to the Kubernetes pods.

  custom_tags = "${module.vpc_tags.vpc_eks_tags}"
  public_subnet_custom_tags              = "${module.vpc_tags.vpc_public_subnet_eks_tags}"
  private_app_subnet_custom_tags         = "${module.vpc_tags.vpc_private_app_subnet_eks_tags}"
  private_persistence_subnet_custom_tags = "${module.vpc_tags.vpc_private_persistence_subnet_eks_tags}"

  # The IP address range of the VPC in CIDR notation. A prefix of /18 is
  # recommended. Do not use a prefix higher than /27.
  cidr_block = "10.0.0.0/18"

  # The number of NAT Gateways to launch for this VPC. For production VPCs, a
  # NAT Gateway should be placed in each Availability Zone (so likely 3 total),
  # whereas for non-prod VPCs, just one Availability Zone (and hence 1 NAT
  # Gateway) will suffice. Warning: You must have at least this number of Elastic
  # IP's to spare.  The default AWS limit is 5 per region, but you can request
  # more.
  num_nat_gateways = 1
}

module "vpc_tags" {
  source = "git::git@github.com:gruntwork-io/terraform-aws-eks.git//modules/eks-vpc-tags?ref=v0.5.3"

  eks_cluster_name = "${var.eks_cluster_name}"
}
```

To apply this code, create a new file in the workspace named `main.tf` and copy paste the above code. Make sure to
configure include configurations for the AWS provider and select the `us-east-1` region.

Be sure to define the input variable as well, in a different file `variables.tf`:

```hcl
# Insert into variables.tf
variable "eks_cluster_name" {}
```

Once all your code is available, run `terraform apply` in the directory to provision your VPC.


## <a name="deploy-the-eks-control-plane"></a>Deploy the EKS control plane

Once we have a VPC where we can launch our EKS cluster into, we are ready to provision the Control Plane. The Control
Plane contains the resources and endpoint to run and access the Kubernetes master components within your VPC. The
underlying resources are entirely managed by AWS. The Control Plane acts as the brain of your cluster, managing the
scheduling and lifecycle of your deployed units (called [Pods](https://kubernetes.io/docs/concepts/workloads/pods/pod/)
in Kubernetes).

In this guide, we will use [eks-cluster-control-plane module in the terraform-aws-eks
repo](https://github.com/gruntwork-io/terraform-aws-eks/tree/master/modules/eks-cluster-control-plane) to provision our
Control Plane. This module provisions all the necessary resources and dependencies to get your Control Plane up and
running, including IAM roles, security groups, and additional configurations.

The following Terraform code provisions our EKS cluster into the VPC we just created, with [control plane logging
enabled](https://docs.aws.amazon.com/eks/latest/userguide/control-plane-logs.html):

```hcl
module "eks_cluster" {
  source = "git::git@github.com:gruntwork-io/terraform-aws-eks.git//modules/eks-cluster-control-plane?ref=v0.5.3"

  cluster_name       = "${var.eks_cluster_name}"
  kubernetes_version = "1.12"

  vpc_id                = "${module.vpc.vpc_id}"
  vpc_master_subnet_ids = ["${module.vpc.public_subnet_ids}"]

  # We only enable the security audit logs here. You can also enable the
  # scheduler and controller logs by passing in "scheduler" and
  # "controllerManager" respectively.
  enabled_cluster_log_types = ["api", "audit", "authenticator"]
}
```

To apply this code, copy the snippet into the `main.tf` file and run `terraform apply`.


## <a name="deploy-an-asg-for-our-worker-nodes"></a>Deploy an ASG for our worker nodes

While the Control Plane is critical for your EKS cluster, it is not sufficient to run any workloads on your cluster.
You also need to provision worker nodes that will run your actual container workloads. The worker nodes connect to the
Control Plane to receive instructions on what `Pods` to schedule on the node.

Here, we will setup an ASG with a configurable number of nodes to manage our worker nodes for the EKS cluster. We will
use the [eks-cluster-workers module in the terraform-aws-eks
repo](https://github.com/gruntwork-io/terraform-aws-eks/tree/master/modules/eks-cluster-workers) to do this. Note that
you can spawn multiple groups by making additional calls to the module. Note that you will need to set a `name_prefix`
with a unique string on each additional group to avoid name collition.

The following Terraform code will provision an ASG using `t3.small` instances that run the [EKS optimized
AMI](https://docs.aws.amazon.com/eks/latest/userguide/eks-optimized-ami.html):

```hcl
data "aws_ami" "eks_ami" {
  filter {
    name   = "name"
    values = ["amazon-eks-node-1.12-v*"]
  }

  most_recent = true
  owners      = ["602401143452"] # Amazon EKS AMI Account ID
}

module "eks_workers" {
  source = "git::git@github.com:gruntwork-io/terraform-aws-eks.git//modules/eks-cluster-workers?ref=v0.5.3"

  cluster_name                 = "${module.eks_cluster.eks_cluster_name}"
  eks_master_security_group_id = "${module.eks_cluster.eks_master_security_group_id}"

  vpc_id                = "${module.vpc.vpc_id}"
  vpc_worker_subnet_ids = ["${module.vpc.public_subnet_ids}"]

  # Make the max size twice the min size to allow for rolling out updates to the
  # cluster without downtime. See
  # https://github.com/gruntwork-io/terraform-aws-eks/tree/master/modules/eks-cluster-workers#how-do-i-roll-out-an-update-to-the-instances
  cluster_min_size = "${var.worker_group_size}"
  cluster_max_size = "${var.worker_group_size * 2}"

  # We use a t3.small so that we have enough container slots to run the supporting services
  cluster_instance_type                        = "t3.small"
  cluster_instance_ami                         = "${data.aws_ami.eks_ami.id}"

  # EKS currently documents this required userdata for EKS worker nodes to
  # properly configure Kubernetes applications on the EC2 instance. See
  # https://docs.aws.amazon.com/eks/latest/userguide/launch-workers.html for more
  # info.
  cluster_instance_user_data = <<-USERDATA
  #!/bin/bash
  /etc/eks/bootstrap.sh \
    --apiserver-endpoint '${module.eks_cluster.eks_cluster_endpoint}' \
    --b64-cluster-ca '${module.eks_cluster.eks_cluster_certificate_authority}' \
    '${module.eks_cluster.eks_cluster_name}'
  USERDATA
}
```

To apply this code, copy the snippet into the `main.tf` file and run `terraform apply`. Don't forget to define the new
input variable as well, in `variables.tf`:

```hcl
variable "worker_group_size" {}
```


## <a name="create-configmap-to-authorize-workers"></a>Create ConfigMap to authorize workers

Note that it is not sufficient to deploy your worker nodes to successfully register them to the Control Plane. This is
because we have not authorized the worker nodes to access the Kubernetes Control Plane yet. Kubernetes employs a [Role
Based Access Control (RBAC)](https://kubernetes.io/docs/reference/access-authn-authz/rbac/) system to manage
authorizations on the API. This system grants permissions to do various activities on the cluster once a user or entity
has authenticated to the cluster.

In EKS, authentication to the Kubernetes API is handled using AWS IAM credentials. To access the Kubernetes API, you
attach your IAM credentials as the authorization bearer token. This is all managed using [AWS IAM authenticator
plugin](https://github.com/kubernetes-sigs/aws-iam-authenticator). You can read more about how all of this works in the
[plugin documentation](https://github.com/kubernetes-sigs/aws-iam-authenticator#how-does-it-work). For the purposes of
this guide, all you need to know is that you need to have IAM credentials to access our deployed cluster.

Given that, we need some way to map IAM entities to Kubernetes RBAC entities so that we can grant various permissions to
the authenticated users. For example, worker nodes need the `system:node` `ClusterRole` to function, so we need to bind
this role to the IAM Role of the nodes in our ASG. We can use the [eks-k8s-role-mapping module in
terraform-aws-eks](https://github.com/gruntwork-io/terraform-aws-eks/tree/master/modules/eks-k8s-role-mapping) to manage
this mapping. This module creates a Kubernetes [ConfigMap
resource](https://kubernetes.io/docs/tasks/configure-pod-container/configure-pod-configmap/) to configure the AWS IAM
Authenticator plugin to map the provided IAM entities to the specified RBAC groups so that permissions are bound to
those IAM entities.

However, before we apply this, we need to setup our Kubernetes connection so that Terraform can create the `ConfigMap`
on our cluster.

### Configuring the Kubernetes provider

The `eks-k8s-role-mapping` module uses the [kubernetes
provider](https://www.terraform.io/docs/providers/kubernetes/index.html) to manage the `ConfigMap` resource. In order to
run it, we need to make sure the provider connects to the EKS cluster we just deployed. However, Terraform [does not
allow us to configure providers using resources interpolations on the provider
block](https://github.com/hashicorp/terraform/issues/2430). This makes it difficult to depend provider configuration on
the clusters being provisioned. We can work around this limitation using data sources that interpolate the resources.
This is because provider blocks support data source interpolations, and data sources do not have the limitation that
they can not interpolate resources.

The following code interpolates the cluster resources as [`template_file` data
sources](https://www.terraform.io/docs/providers/template/d/file.html), and passes them to the `kubernetes` provider
block. Additionally, we use the [`aws_eks_cluster_auth` data
source](https://www.terraform.io/docs/providers/aws/d/eks_cluster_auth.html) to retrieve an authentication token
compatible with our cluster:

```hcl
provider "kubernetes" {
  load_config_file       = false
  host                   = "${data.template_file.kubernetes_cluster_endpoint.rendered}"
  cluster_ca_certificate = "${base64decode(data.template_file.kubernetes_cluster_ca.rendered)}"
  token                  = "${data.aws_eks_cluster_auth.kubernetes_token.token}"
}

data "template_file" "kubernetes_cluster_endpoint" {
  template = "${module.eks_cluster.eks_cluster_endpoint}"
}

data "template_file" "kubernetes_cluster_ca" {
  template = "${module.eks_cluster.eks_cluster_certificate_authority}"
}

data "aws_eks_cluster_auth" "kubernetes_token" {
  name = "${module.eks_cluster.eks_cluster_name}"
}
```

Include this in our `main.tf` file to setup the provider.

### Map worker to system:node RBAC role

Once our `kubernetes` provider configuration is setup, we are ready to provision our `ConfigMap` to bind the
`system:node` RBAC role to our worker node IAM roles:

```hcl
module "eks_k8s_role_mapping" {
  source = "git::git@github.com:gruntwork-io/terraform-aws-eks.git//modules/eks-k8s-role-mapping?ref=v0.5.3"

  eks_worker_iam_role_arns = ["${module.eks_workers.eks_worker_iam_role_arn}"]
}
```

Copy this to our `main.tf` file and run `terraform apply` to provision the `ConfigMap`.

### What about my IAM role/user?

You might be wondering if you need to map your own IAM role (or user, depending on how you authenticated to AWS) to a
RBAC role to access the cluster. EKS defaults to mapping the IAM entity that provisioned the cluster to the
`system:masters` group, granting you superuser permissions on the cluster. In fact, if you did not have this, you would
be unable to create the `ConfigMap` in the first place as there is a chicken and egg situation: you need to bind
permissions to yourself by creating the `ConfigMap`, but you have no permissions to create it in the first place!

This is why it is not necessary to explicitly grant our IAM entity permissions to access the EKS cluster. That said, it
is good practice to be explicit about the permissions you have granted. We recommend updating the previous block with
the following changes to explicitly state that you have admin access:

```hcl
module "eks_k8s_role_mapping" {
  source = "git::git@github.com:gruntwork-io/terraform-aws-eks.git//modules/eks-k8s-role-mapping?ref=v0.5.3"

  eks_worker_iam_role_arns = ["${module.eks_workers.eks_worker_iam_role_arn}"]

  iam_role_to_rbac_group_mappings = "${
    map(
      var.admin_iam_role_arn, list("system:masters"),
    )
  }"
}

variable "admin_iam_role_arn" {}
```

Note that we deliberately avoid using the [`aws_caller_identity` data
source](https://www.terraform.io/docs/providers/aws/d/caller_identity.html) to determine the authenticated user, because
this would cause Terraform to update the `ConfigMap` everytime a different IAM entity is used to apply the code.


## <a name="optional-explore-the-cluster-using-kubectl"></a>(Optional) Explore the cluster using kubectl

At this point, you should have a working EKS cluster that you can use to deploy your apps. You can use `kubectl` to
explore and create resources on the cluster. `kubectl` is the official command line interface that you can use to
interact with the cluster. You can learn more about the various features of `kubectl` from [the official
documentation](https://kubernetes.io/docs/reference/kubectl/overview/).

In order to use `kubectl`, we need to first set it up so that it can authenticate with our new EKS cluster. You can
learn more about how authentication works with EKS in our guide [How do I authenticate kubectl to the EKS
cluster?](https://github.com/gruntwork-io/terraform-aws-eks/blob/master/README.md#how-to-authenticate-kubectl). For now,
you can run the `kubergrunt eks configure` command to get up and running.

We need the ARN of the provisioned EKS cluster to use the command, so we will modify our terraform code to output this.
Create a new file `outputs.tf` and insert the following snippet:

```hcl
# In outputs.tf
output "eks_cluster_arn" {
  value       = "${module.eks_cluster.eks_cluster_arn}"
}
```

Make sure to run `terraform apply` so that the output is included in the Terraform state.

Once the output is available, we can extract the cluster ARN and use `kubergrunt eks configure`:

```bash
EKS_CLUSTER_ARN=$(terraform output eks_cluster_arn)
kubergrunt eks configure --eks-cluster-arn $EKS_CLUSTER_ARN
```

At the end of this command, your default kubeconfig file (located at `~/.kube/config`) will have a new context that
authenticates with EKS. This context will be set as the default so that subsequent `kubectl` calls will target your
deployed eks cluster.

You can now use `kubectl`. To verify your setup, run `kubectl get nodes` to see the list of worker nodes that are
registered to the cluster.


## <a name="summary"></a>Summary

Congratulations! You have successfully deployed a production grade EKS cluster using Gruntwork modules! In this guide
you learned:

- Deploy a production VPC configuration using the `vpc-app` module in `module-vpc`.
- Tag the VPC for use with EKS using the `eks-vpc-tags` module in `terraform-aws-eks`.
- Deploy a EKS control plane into the VPC using the `eks-cluster-control-plane` module in `terraform-aws-eks`.
- Deploy and register worker nodes to the EKS control plane using the `eks-cluster-workers` module in
  `terraform-aws-eks`.
- Bind permissions to the worker node IAM roles using the `eks-k8s-role-mapping` module in `terraform-aws-eks`.


## <a name="where-to-go-from-here"></a>Where to go from here

Now that you have a production grade EKS cluster, here are some ideas for next steps:

- [Deploy an app on the cluster using
  `kubectl`.](https://kubernetes.io/docs/tutorials/kubernetes-basics/deploy-app/deploy-intro/)
- [Deploy Tiller (Helm Server) and supporting services to enhance the cluster
  features.](https://github.com/gruntwork-io/terraform-aws-eks/tree/master/examples/eks-cluster-with-supporting-services#deploy-core-services)
- Try provisioning a Namespace with Tiller (Helm Server) to deploy your
  apps using the [modules in terraform-kubernetes-helm](https://github.com/gruntwork-io/terraform-kubernetes-helm).


## Troubleshooting

**When destroying `eks-cluster`, I get an error with destroying VPC related resources.**

EKS relies on the [`amazon-vpc-cni-k8s`](https://github.com/aws/amazon-vpc-cni-k8s) plugin to allocate IP addresses to
the pods in the Kubernetes cluster. This plugin works by allocating secondary ENI devices to the underlying worker
instances. Depending on timing, this plugin could interfere with destroying the cluster in this example. Specifically,
terraform could shutdown the instances before the VPC CNI pod had a chance to cull the ENI devices. These devices are
managed outside of terraform, so if they linger, it could interfere with destroying the VPC.

To workaround this limitation, you have to go into the console and delete the ENI associated with the VPC. Then,
retry the destroy call.

---
title: "EKS Cluster Control Plane Module"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Amazon EKS" version="0.75.0" lastModifiedVersion="0.75.0"/>

# EKS Cluster Control Plane Module

<a href="https://github.com/gruntwork-io/terraform-aws-eks/tree/v0.75.0/modules/eks-cluster-control-plane" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.75.0" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This Terraform Module launches an [Elastic Container Service for Kubernetes
Cluster](https://docs.aws.amazon.com/eks/latest/userguide/clusters.html).

This module is responsible for the EKS Control Plane in [the EKS cluster topology](#what-is-an-eks-cluster). You must
launch worker nodes in order to be able to schedule pods on your cluster. See the [eks-cluster-workers
module](https://github.com/gruntwork-io/terraform-aws-eks/tree/v0.75.0/modules/eks-cluster-workers) for managing EKS worker nodes.

## What is the EKS Control Plane?

The EKS Control Plane is a managed service entrirely managed by AWS. This contains the resources and endpoint to run and
access the [Kubernetes master components](https://kubernetes.io/docs/concepts/overview/components/#master-components).
The resources are deployed into your VPC so that they inherit the network rules you configure for your VPC.

Specifically, the control plane consists of:

*   [`etcd`](https://coreos.com/etcd/): A distributed key value store used by Kubernetes to hold the metadata and cluster
    state.
*   `kube-apiserver`: Web service that exposes the Kubernetes API. This is the main entrypoint for interacting with the
    Kubernetes cluster.
*   `kube-scheduler`: This component is responsible for watching for newly created Pods on the cluster, and scheduling
    them on to the available worker nodes.
*   `kube-controller-manager`: This component is responsible for executing the controller logic. Controllers are
    responsible for managing the Pods on the cluster. For example, you can use a
    [`Deployment`](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/) controller to ensure that a
    specified number of replicas of a Pod is running on the cluster.
*   `cloud-controller-manager`: This component is responsible for managing cloud components that Kubernetes will manage.
    This includes resources like the
    [`LoadBalancers`](https://kubernetes.io/docs/tasks/access-application-cluster/create-external-load-balancer/).

You can read more about the different components of EKS in [the project README](https://github.com/gruntwork-io/terraform-aws-eks/tree/v0.75.0/core-concepts.md#what-is-an-eks-cluster).

## What security group rules are created?

This module will create a security group for the EKS cluster master nodes to allow them to function as a Kubernetes
cluster. The rules are based on [the recommendations provided by
AWS](https://docs.aws.amazon.com/eks/latest/userguide/sec-group-reqs.html) for configuring an EKS cluster.

### <a name="how-to-extend-security-group"></a>How do you add additional security group rules?

To add additional security group rules to the EKS cluster master nodes, you can use the
[aws_security_group_rule](https://www.terraform.io/docs/providers/aws/r/security_group_rule.html) resource, and set its
`security_group_id` argument to the Terraform output of this module called `eks_control_plane_security_group_id`. For example, here is how you can allow the master nodes
in this cluster to allow incoming HTTPS requests on port 443 from an additional security group that is not the workers:

```hcl
module "eks_cluster" {
  # (arguments omitted)
}

resource "aws_security_group_rule" "allow_inbound_http_from_anywhere" {
  type      = "ingress"
  from_port = 443
  to_port   = 443
  protocol  = "tcp"

  security_group_id        = module.eks_cluster.eks_control_plane_security_group_id
  source_security_group_id = var.source_aws_security_group_id
}
```

## What IAM policies are attached to the EKS Cluster?

This module will create IAM roles for the EKS cluster master nodes with the minimum set of policies necessary
for the cluster to function as a Kubernetes cluster. The policies attached to the roles are the same as those documented
in [the AWS getting started guide for EKS](https://docs.aws.amazon.com/eks/latest/userguide/getting-started.html).

### How do you add additional IAM policies?

To add additional IAM policies to the EKS cluster master nodes, you can use the
[aws_iam_role_policy](https://www.terraform.io/docs/providers/aws/r/iam_role_policy.html) or
[aws_iam_policy_attachment](https://www.terraform.io/docs/providers/aws/r/iam_policy_attachment.html) resources, and set
the IAM role id to the Terraform output of this module called `eks_control_plane_iam_role_name` for the master nodes. For
example, here is how you can allow the master nodes in this cluster to access an S3 bucket:

```hcl
module "eks_cluster" {
  # (arguments omitted)
}

resource "aws_iam_role_policy" "access_s3_bucket" {
    name = "access_s3_bucket"
    role = module.eks_cluster.eks_control_plane_iam_role_name
    policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "",
      "Effect":"Allow",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::examplebucket/*"
    }
  ]
}
EOF
}
```

## How do I associate IAM roles to the Pods?

**NOTE: This configuration depends on [kubergrunt](https://github.com/gruntwork-io/kubergrunt), minimum version 0.5.3**

This module will set up the OpenID Connect Provider that can be used with the [IAM Roles for Service
Accounts](https://docs.aws.amazon.com/eks/latest/userguide/iam-roles-for-service-accounts.html) feature. When this
feature is enabled, you can exchange the Kubernetes Service Account Tokens for IAM role credentials using the
`sts:AssumeRoleWithWebIdentity` AWS API in the STS service.

To allow Kubernetes Service Accounts to assume the roles, you need to grant the proper assume role IAM policies to the
role that is being assumed. Specifically, you need to:

*   Allow the OpenID Connect Provider to assume the role.
*   Specify any conditions on assuming the role. You can restrict by:
    *   Service Accounts that can assume the role
    *   Which Namespaces have full access to assume the role (meaning, all Service Accounts in the Namespace can assume
        that role).

You can use the
[eks-iam-role-assume-role-policy-for-service-account module](https://github.com/gruntwork-io/terraform-aws-eks/tree/v0.75.0/modules/eks-iam-role-assume-role-policy-for-service-account) to
construct the policy using a more convenient interface. Refer to the module documentation for more info.

Once you have an IAM Role that can be assumed by the Kubernetes Service Account, you can configure your Pods to exchange
them for IAM role credentials. EKS will automatically configure the correct environment variables that the SDK expects
on the Pods when you annotate the associated Service Account with the role it should assume.

The following shows an example Kubernetes manifest that configures the Service Account to assume the IAM role `arn:aws:iam::123456789012:role/myrole`:

```
apiVersion: v1
kind: ServiceAccount
metadata:
  annotations:
    eks.amazonaws.com/role-arn: arn:aws:iam::123456789012:role/myrole
```

Note that the AWS SDK will automatically assume the role if you are using a compatible version. The following is a list
of the minimum SDK version for various platforms that support the `AWS_WEB_IDENTITY_TOKEN_FILE` environment variable
used by IRSA:

```
Java   1.11.623
Java2  2.7.36
Go     1.23.13
Python 1.9.220
Node   2.521.0
Ruby   2.11.345
PHP    3.110.7
.NET   3.3.580.0
```

## How do I SSH into the nodes?

By design, AWS does not allow you to SSH into the master nodes of an EKS cluster.

## API Access and Networking

By default this module enables both the Public Kubernetes API Endpoint and the Private Kubernetes API VPC Endpoint. The
public endpoint is used for network requests originating from outside the VPC, while requests originating from within
the VPC (including worker nodes) use the private VPC endpoint.

To restrict access to the public endpoint, you can use the `endpoint_public_access_cidrs` input variable. When set, only
requests originating from the list of CIDR blocks will be allowed access from outside the VPC.

To restrict access to the private VPC endpoint, you can use the `endpoint_private_access_cidrs` and
`endpoint_private_access_security_group_ids` input variables. When set, requests originating from within the VPC and from the
list of CIDRs/Security Group IDs will be allowed access.

Note that even if an IP is allowed access to the public endpoint via the `endpoint_public_access_cidrs` variable, if that IP originates from within the VPC of the EKS cluster, that request will not be allowed unless it is allowed to access the private endpoint. That is, setting `endpoint_public_access_cids = 0.0.0.0/0`, will not automatically allow access to the Kubernetes API from within the VPC. You must configure `endpoint_private_access_cidrs` or `endpoint_private_access_security_group_ids` to allow access to requests originating from within the VPC.

The public endpoint makes operations easier when configuring the EKS cluster control plane. However, for added security,
you can disable the public endpoint by setting the `endpoint_public_access` input variable to `false`.

## Control Plane Logging

EKS supports exporting various logs to CloudWatch. By default, none of the logging options are enabled by this module.
To enable logs, you can pass in the relevant type strings to the `enabled_cluster_log_types` input variable. For
example, to enable API server and audit logs, you can pass in the list `["api", "audit"]`. See [the official
documentation](https://docs.aws.amazon.com/eks/latest/userguide/control-plane-logs.html) for a list of available log
types.

## How do I configure encryption at rest for Secrets?

Kubernetes [Secrets](https://kubernetes.io/docs/concepts/configuration/secret/) are resources in the cluster designed to
store and manage sensitive information. These behave like
[ConfigMaps](https://kubernetes.io/docs/tasks/configure-pod-container/configure-pod-configmap/), but have a few extra
properties that enhance their security profile.

All EKS clusters encrypt Kubernetes Secrets at rest at the disk level using shared AWS managed KMS keys. Alternatively,
you can provide your own KMS Customer Master Key (CMK) to use for envelope encryption. In envelope encryption,
Kubernetes will use the provided CMK to encrypt the secret keys used to encrypt the Kubernetes Secrets. For each Secret,
Kubernetes will dynamically generate a new data encryption key (DEK) for the purposes of encrypting and decrypting the
secret. This key is then encrypted using the provided CMK before being stored in the cluster. In this way, you can
manage access to the Secret (indirectly by restricting access to the DEK) through the KMS permissions. For example, you
can disable all access to any Secrets in the EKS cluster by removing the permissions to encrypt/decrypt using the KMS
key in case of a breach.

To enable envelope encryption, provide the KMS key ARN you would like to use using the variable
`secret_envelope_encryption_kms_key_arn`. Note that if the KMS key belongs to another account, you will need to grant
access to manage permissions for the key to the account holding the EKS cluster. See [Allowing users in other accounts
to use a CMK](https://docs.aws.amazon.com/kms/latest/developerguide/key-policy-modifying-external-accounts.html) from
the official AWS docs for more information.

## How do I deploy Pods on Fargate?

[AWS Fargate](https://aws.amazon.com/fargate/) is an AWS managed infrastructure for running ECS Tasks and EKS Pods
without any worker nodes. With Fargate, your EKS Pods will automatically be assigned a node from a shared pool of VMs
that are fully managed by AWS. This means that you can focus entirely on the application you are deploying and not have
to worry about servers, clusters, and the underlying infrastructure as a whole.

To use Fargate with your EKS Pods, you need to create a Fargate Profile to select the Pods that you want to run. You can
use Namespaces and Labels to restrict which Pods of the EKS cluster will run on Fargate. This means that Pods that match
the specifications of the Fargate Profile will automatically be deployed to Fargate without any further configuration.

Some additional notes on using Fargate:

*   Fargate Profiles require a Pod Execution Role, which is an IAM role that will be assigned to the underlying
    `kubelet` of the Fargate instance. At a minimum, this role must be given enough permissions to pull the images
    used by the Pod. Note that **this role is NOT made available to the Pods!** Use [the IAM Role for Service Accounts
    (IRSA) feature of EKS](#how-do-i-associate-iam-roles-to-pods) to assign IAM roles for use by the Pods themselves.
*   If you set the input variable `schedule_control_plane_services_on_fargate` on this module, the module will
    automatically allocate a Fargate Profile that selects the core control plane services deployed in the `kube-system`
    Namespace (e.g., `core-dns`). This profile is highly selective and will most likely not match any other Pods in the
    cluster. To deploy additional Pods onto Fargate, you must manually create Fargate Profiles that select those Pods (use
    [the `aws_eks_fargate_profile` resource](https://www.terraform.io/docs/providers/aws/r/eks_fargate_profile.html) to
    provision Fargate Profiles with Terraform). The Pod Execution Role created by the module may be reused for other
    Fargate Profiles.
*   Fargate does not support DaemonSets. This means that you can't rely on the [eks-container-logs](https://github.com/gruntwork-io/terraform-aws-eks/tree/v0.75.0/modules/eks-container-logs)
    module to forward logs to CloudWatch. Instead, you need to manually configure a sidecar `fluentd` container that
    forwards the log entries to CloudWatch Logs. Refer to [this AWS blog
    post](https://aws.amazon.com/blogs/containers/how-to-capture-application-logs-when-using-amazon-eks-on-aws-fargate/)
    for documentation on how to setup `fluentd` with Fargate.

## How do I upgrade the Kubernetes Version of the cluster?

To upgrade the minor version of Kubernetes deployed on the EKS cluster, you need to update the `kubernetes_version`
input variable. **You must upgrade one minor version at a time**, as EKS does not support upgrading by more than one
minor version.

### Updating core components

When you upgrade the cluster, you can update the cluster core components with either Kubergrunt or
using [Amazon EKS add-ons](https://docs.aws.amazon.com/eks/latest/userguide/eks-add-ons.html). If `use_upgrade_cluster_script` is
set to `true` then `kubergrunt` is used to update the core components. If `enable_eks_addons` is set to `true`,
then EKS add-ons are used. If both are set to true, then `enable_eks_addons` takes precedence.

Note that customized VPC CNI configurations (e.g., enabling prefix delegation) is not fully supported with add-ons as the
automated add-on lifecycles could potentially undo the configuration changes. As such, it is not recommended to use EKS
add-ons if you wish to use the VPC CNI customization features.

#### Using Kubergrunt

When you bump minor versions, the module will automatically update the deployed Kubernetes components as described in
the [official upgrade guide](https://docs.aws.amazon.com/eks/latest/userguide/update-cluster.html). This is handled by
`kubergrunt` (**minimum version 0.6.2**) using the [eks
sync-core-components](https://github.com/gruntwork-io/kubergrunt#sync-core-components) command, which will look up the
deployed Kubernetes version and make the required `kubectl` calls to deploy the updated components.

#### Using EKS add-ons

If you have specified explicit `addon_version` in `eks_addons`, you must update the `addon_version` to match
the cluster version. All add-on version details can be found in [the official documentation](https://docs.aws.amazon.com/eks/latest/userguide/add-ons-configuration.html).
If you omit the `addon_version`, correct versions are automatically applied.

### Updating worker node AMIs

Note that you must update the nodes to use the corresponding `kubelet` version as well. This means that when you update
minor versions, you will also need to update the AMIs used by the worker nodes to match the version and rotate the
workers. For more information on rotating worker nodes, refer to [How do I roll out an update to the
instances?](https://github.com/gruntwork-io/terraform-aws-eks/tree/v0.75.0/modules/eks-cluster-workers/README.md#how-do-i-roll-out-an-update-to-the-instances) in the `eks-cluster-workers`
module README.

### Detailed upgrade steps

Here are detailed steps on how to update your cluster:

1.  Bump the `kubernetes_version` in the module variable to the next minor version in your module block for
    `eks-cluster-control-plane`.
2.  For self managed worker nodes (`eks-cluster-workers` module), build a new AMI for your worker nodes that depend on
    an EKS optimized AMI for the Kubernetes minor version. Update the `asg_default_instance_ami` variable to the new AMI in
    your module block for `eks-cluster-workers`.
3.  Apply the changes. This will update the Kubernetes version on the EKS control plane, and stage the updates for your
    workers. Note that your cluster will continue to function as Kubernetes supports worker nodes that are 1 minor
    version behind.
4.  Roll out the AMI update using `kubergrunt eks deploy`.

## How do I increase the number of Pods for my worker nodes?

By default, this module deploys an EKS cluster that uses the [AWS VPC CNI](https://github.com/aws/amazon-vpc-cni-k8s)
to manage internal networking for the cluster. This plugin works to source IP addresses from the assigned VPC of the
cluster to assign to each Pod within Kubernetes.

The AWS VPC CNI works by allocating secondary IP addresses and Elastic Network Interfaces to the worker nodes to assign
to the Pods that are scheduled on them. This means that there is a limit on the number of IP addresses that can be made
available to the Pods per node. You can look up the various limits per instance type in [the official AWS
documentation](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-eni.html#AvailableIpPerENI).

Unfortunately, these limits are typically significantly less than the available compute and memory resources that the
node has. This means that the worker nodes will often hit the IP address limit well before it reaches compute and memory
limits of the nodes, greatly reducing the Pod scheduling potential of your cluster.

To address this, you can use prefix delegation mode for managing the available IP addresses on your workers. In prefix
delegation mode, each ENI is assigned an IPv4 address prefix instead of an individual IP for each secondary address
slot. This means that for each individual IP address that was previously available, you now have up to 16 IP addresses
that the worker node can assign to the container, greatly increasing the number of IP addresses that each worker can
assign to the Pods.

To enable prefix delegation mode, set the `vpc_cni_enable_prefix_delegation` input variable to `true`.

Note that prefix delegation mode greatly increases the number of IP addresses that each worker node will keep in standby
for the Pods. This is because worker nodes can only allocate IP addresses in blocks of 16. This means that each worker
will consume a minimum of 16 IP addresses from the VPC, and potentially more depending on the number of Pods that are
scheduled (e.g., a worker with 17 Pods will consume 32 IP addresses - 2 prefixes of 16 IP addresses each).

You can tweak the allocation behavior by configuring the `vpc_cni_warm_ip_target` and `vpc_cni_minimum_ip_target`
variables.

The warm IP target indicates the target number of IP addresses each node should have available. For example, if you set
the warm IP target to 5, then the node will only preallocate the next prefix of 16 IP addresses when the current prefix
reaches 68.75% utilization (11 out of 16 used). On the other hand, if the warm IP target is set to 16 (the default),
then the next prefix will be allocated as soon as one Pod is scheduled on the current prefix.

The minimum IP target indicates the target number of IP addresses that should be available on each node during
initialization. For example, if you set this to 32, then each node will start with 2 prefixes being preallocated at
launch time. On the other hand, if the minimum IP target is 16 (the default), then each node starts with only 1 prefix.

You can learn more details about how prefix delegation mode works, and the behavior of warm IP target and minimum IP
target in [the official AWS blog
post](https://aws.amazon.com/blogs/containers/amazon-vpc-cni-increases-pods-per-node-limits/) about the feature.

## EKS Add-ons adoption and migration

This module supports the use of EKS add-ons to manage the core components of the EKS cluster. EKS add-ons are a set of
preconfigured Kubernetes resources that are deployed to the cluster to manage the core components. This includes
components like the `kube-proxy`, `core-dns`, and `aws-node` DaemonSets. The add-ons are managed by the EKS service and
are automatically updated when the cluster version is updated.

For more information on EKS add-ons, refer to the [official documentation](https://docs.aws.amazon.com/eks/latest/userguide/workloads-add-ons-available-eks.html).

To enable EKS add-ons, set the `enable_eks_addons` input variable to `true`. This will automatically deploy the add-ons
to the cluster when the cluster is created or updated.

**Important:** You should not modify the EKS-managed add-ons directly. To customize them, use the `configuration_values` input variables.
To get a full list of configuration options for each add-on, refer to the [official documentation](https://docs.aws.amazon.com/eks/latest/userguide/kubernetes-field-management.html).

Before the existence of EKS add-ons, the same functionality was provided by the `kubergrunt` tool or by manually
deploying the resources. If you have existing clusters that were created using the `kubergrunt` tool, we recommend
migrating to EKS add-ons to take advantage of the automatic updates and management provided by the EKS service.

### Migration Steps:

1.  **Enable EKS Add-ons:**
    *   Set `enable_eks_addons` to `true` in the `eks-cluster-control-plane` module block.

2.  **Match Existing Configurations:**
    *   Configure the `eks_addons` input variable to align with your existing core components.
        Specify the `addon_name`, `addon_version`, and `configuration_values`.
        Refer to the [official documentation](https://docs.aws.amazon.com/eks/latest/userguide/add-ons-configuration.html) for the correct versions.

3.  **Disable `kubergrunt` usage :**
    *   Disable the `kubergrunt` tool by setting `use_upgrade_cluster_script` to `false`. Alternatively,
        you can selectively disable services by setting any of the following variables to
        `false`: `upgrade_cluster_script_skip_coredns`, `upgrade_cluster_script_skip_kube_proxy`, `upgrade_cluster_script_skip_vpc_cni`.

## Troubleshooting

### AccessDenied when provisioning Services of LoadBalancer type

On brand new accounts, AWS needs to provision a new Service Linked Role for ELBs when an ELB is first provisioned. EKS
automatically creates the Service Linked Role if it doesn't exist, but it needs more permissions than is provided by
default. Since the permission is only needed as a one time thing, binding the necessary permissions would be a violation
of least privileges.

As such, this module does not bind the requisite permissions, and instead we recommend taking one of the following
approaches:

*   Create a one time wrapper module that appends the following IAM permissions to the control plane IAM role (the output
    `eks_master_iam_role_arn`), and deploy the EKS cluster with `LoadBalancer` service:

    ```
      ec2:DescribeAccountAttributes
      ec2:DescribeInternetGateways
    ```

*   Create an ELB using the AWS console, or the modules in [terraform-aws-load-balancer](https://github.com/gruntwork-io/terraform-aws-load-balancer/).

*   Create the service linked role using [the Landing Zone
    modules](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/main/modules/landingzone).

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S EKS-CLUSTER-CONTROL-PLANE MODULE
# ------------------------------------------------------------------------------------------------------

module "eks_cluster_control_plane" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-eks.git//modules/eks-cluster-control-plane?ref=v0.75.0"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The name of the EKS cluster (e.g. eks-prod). This is used to namespace all
  # the resources created by these templates.
  cluster_name = <string>

  # A list of CIDR blocks that should be allowed network access to the
  # Kubernetes public API endpoint. When null or empty, allow access from the
  # whole world (0.0.0.0/0). Note that this only restricts network reachability
  # to the API, and does not account for authentication to the API. Note also
  # that this only controls access to the public API endpoint, which is used for
  # network access from outside the VPC. If you want to control access to the
  # Kubernetes API from within the VPC, then you must use the
  # endpoint_private_access_cidrs and endpoint_private_access_security_group_ids
  # variables.
  endpoint_public_access_cidrs = <list(string)>

  # A list of the subnets into which the EKS Cluster's control plane nodes will
  # be launched. These should usually be all private subnets and include one in
  # each AWS Availability Zone.
  vpc_control_plane_subnet_ids = <list(string)>

  # The ID of the VPC in which the EKS Cluster's EC2 Instances will reside.
  vpc_id = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The authentication mode for the cluster. Valid values are CONFIG_MAP, API or
  # API_AND_CONFIG_MAP.
  access_config_authentication_mode = "CONFIG_MAP"

  # Map of EKS Access Entries to be created for the cluster.
  access_entries = {}

  # Map of EKS Access Entry Policy Associations to be created for the cluster.
  access_entry_policy_associations = {}

  # A list of additional security group IDs to attach to the control plane.
  additional_security_groups = []

  # Automatically download and install Kubergrunt if it isn't already installed
  # on this OS. Only used if var.use_kubergrunt_verification is true.
  auto_install_kubergrunt = true

  # The AWS partition used for default AWS Resources.
  aws_partition = "aws"

  # Whether or not to bootstrap an access entry with cluster admin permissions
  # for the cluster creator.
  bootstrap_cluster_creator_admin_permissions = true

  # Install default unmanaged add-ons, such as aws-cni, kube-proxy, and CoreDNS
  # during cluster creation. If false, you must manually install desired
  # add-ons. Changing this value will force a new cluster to be created.
  bootstrap_self_managed_addons = true

  # Specify the log class of the cloudwatch log group
  cloudwatch_log_group_class = "STANDARD"

  # The ID (ARN, alias ARN, AWS ID) of a customer managed KMS Key to use for
  # encrypting log data in the CloudWatch log group for EKS control plane logs.
  cloudwatch_log_group_kms_key_id = null

  # The number of days to retain log events in the CloudWatch log group for EKS
  # control plane logs. Refer to
  # https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudwatch_log_group#retention_in_days
  # for all the valid values. When null, the log events are retained forever.
  cloudwatch_log_group_retention_in_days = null

  # Tags to apply on the CloudWatch Log Group for EKS control plane logs,
  # encoded as a map where the keys are tag keys and values are tag values.
  cloudwatch_log_group_tags = null

  # ARN of permissions boundary to apply to the cluster IAM role - the IAM role
  # created for the EKS cluster as well as the default fargate IAM role.
  cluster_iam_role_permissions_boundary = null

  # The IP family used to assign Kubernetes pod and service addresses. Valid
  # values are ipv4 (default) and ipv6. You can only specify an IP family when
  # you create a cluster, changing this value will force a new cluster to be
  # created.
  cluster_network_config_ip_family = "ipv4"

  # The CIDR block to assign Kubernetes pod and service IP addresses from. If
  # you don't specify a block, Kubernetes assigns addresses from either the
  # 10.100.0.0/16 or 172.20.0.0/16 CIDR blocks. You can only specify a custom
  # CIDR block when you create a cluster, changing this value will force a new
  # cluster to be created.
  cluster_network_config_service_ipv4_cidr = null

  # Whether or not to automatically configure kubectl on the current operator
  # machine. To use this, you need a working python install with the AWS CLI
  # installed and configured.
  configure_kubectl = false

  # When set to true, this will inform the module to set up the OpenID Connect
  # Provider for use with the IAM Roles for Service Accounts feature of EKS.
  configure_openid_connect_provider = true

  # When true, IAM role will be created and attached to Fargate control plane
  # services. When true, requires that
  # schedule_control_plane_services_on_fargate variable should be set true.
  create_default_fargate_iam_role = true

  # The name to use for the default Fargate execution IAM role that is created
  # when create_default_fargate_iam_role is true. When null, defaults to
  # CLUSTER_NAME-fargate-role.
  custom_fargate_iam_role_name = null

  # A map of custom tags to apply to the EKS add-ons. The key is the tag name
  # and the value is the tag value.
  custom_tags_eks_addons = {}

  # A map of custom tags to apply to the EKS Cluster. The key is the tag name
  # and the value is the tag value.
  custom_tags_eks_cluster = {}

  # A map of custom tags to apply to the Security Group for this EKS Cluster.
  # The key is the tag name and the value is the tag value.
  custom_tags_security_group = {}

  # A map of default tags to apply to all supported resources in this module.
  # These tags will be merged with any other resource specific tags. The key is
  # the tag name and the value is the tag value.
  default_tags = {}

  # Configuraiton object for the EBS CSI Driver EKS AddOn
  ebs_csi_driver_addon_config = {}

  # A map of custom tags to apply to the EBS CSI Driver AddOn. The key is the
  # tag name and the value is the tag value.
  ebs_csi_driver_addon_tags = {}

  # A map of custom tags to apply to the IAM Policies created for the EBS CSI
  # Driver IAM Role if enabled. The key is the tag name and the value is the tag
  # value.
  ebs_csi_driver_iam_policy_tags = {}

  # A map of custom tags to apply to the EBS CSI Driver IAM Role if enabled. The
  # key is the tag name and the value is the tag value.
  ebs_csi_driver_iam_role_tags = {}

  # If using KMS encryption of EBS volumes, provide the KMS Key ARN to be used
  # for a policy attachment.
  ebs_csi_driver_kms_key_arn = null

  # The namespace for the EBS CSI Driver. This will almost always be the
  # kube-system namespace.
  ebs_csi_driver_namespace = "kube-system"

  # The Service Account name to be used with the EBS CSI Driver
  ebs_csi_driver_sa_name = "ebs-csi-controller-sa"

  # Map of EKS add-ons, where key is name of the add-on and value is a map of
  # add-on properties.
  eks_addons = {}

  # Configuration block with compute configuration for EKS Auto Mode.
  eks_auto_mode_compute_config = {"enabled":true,"node_pools":["general-purpose","system"]}

  # Whether or not to create an IAM Role for the EKS Worker Nodes when using EKS
  # Auto Mode. If using the built-in NodePools for EKS Auto Mode you must either
  # provide an IAM Role ARN for `eks_auto_mode_compute_config.node_role_arn` or
  # set this to true to automatically create one.
  eks_auto_mode_create_node_iam_role = true

  # Configuration block with elastic load balancing configuration for the
  # cluster.
  eks_auto_mode_elastic_load_balancing_config = {}

  # Whether or not to enable EKS Auto Mode.
  eks_auto_mode_enabled = false

  # Description of the EKS Auto Mode Node IAM Role.
  eks_auto_mode_iam_role_description = null

  # IAM Role Name to for the EKS Auto Mode Node IAM Role. If this is not set a
  # default name will be provided in the form of
  # `<var.cluster_name-eks-auto-mode-role>`
  eks_auto_mode_iam_role_name = null

  # The IAM Role Path for the EKS Auto Mode Node IAM Role.
  eks_auto_mode_iam_role_path = null

  # Permissions Boundary ARN to be used with the EKS Auto Mode Node IAM Role.
  eks_auto_mode_iam_role_permissions_boundary = null

  # A map of additional tags to be added to the EKS Auto Mode Node IAM Role.
  eks_auto_mode_iam_role_tags = {}

  # Whether or not to use `eks_auto_mode_iam_role_name` as a prefix for the EKS
  # Auto Mode Node IAM Role Name.
  eks_auto_mode_iam_role_use_name_prefix = true

  # Configuration block with storage configuration for EKS Auto Mode.
  eks_auto_mode_storage_config = {}

  # A map of custom tags to apply to the EKS Cluster Cluster Creator Access
  # Entry. The key is the tag name and the value is the tag value.
  eks_cluster_creator_access_entry_tags = {}

  # A map of custom tags to apply to the EKS Cluster IAM Role. The key is the
  # tag name and the value is the tag value.
  eks_cluster_iam_role_tags = {}

  # A map of custom tags to apply to the EKS Cluster OIDC Provider. The key is
  # the tag name and the value is the tag value.
  eks_cluster_oidc_tags = {}

  # A map of custom tags to apply to the Control Plane Services Fargate Profile
  # IAM Role for this EKS Cluster if enabled. The key is the tag name and the
  # value is the tag value.
  eks_fargate_profile_iam_role_tags = {}

  # A map of custom tags to apply to the Control Plane Services Fargate Profile
  # for this EKS Cluster if enabled. The key is the tag name and the value is
  # the tag value.
  eks_fargate_profile_tags = {}

  # When set to true, the module configures and install the EBS CSI Driver as an
  # EKS managed AddOn
  # (https://docs.aws.amazon.com/eks/latest/userguide/managing-ebs-csi.html). To
  # use this feature, `configure_openid_connect_provider` must be set to true
  # (the default value).
  enable_ebs_csi_driver = false

  # When set to true, the module configures EKS add-ons
  # (https://docs.aws.amazon.com/eks/latest/userguide/eks-add-ons.html)
  # specified with `eks_addons`. VPC CNI configurations with
  # `use_vpc_cni_customize_script` isn't fully supported with addons, as the
  # automated add-on lifecycles could potentially undo the configuration
  # changes.
  enable_eks_addons = false

  # A list of the desired control plane logging to enable. See
  # https://docs.aws.amazon.com/eks/latest/userguide/control-plane-logs.html for
  # the list of available logs.
  enabled_cluster_log_types = []

  # A list of CIDR blocks that should be allowed network access to the private
  # Kubernetes API endpoint. Note that worker nodes automatically get access to
  # the private endpoint, so this controls additional access. Note that this
  # only restricts network reachability to the API, and does not account for
  # authentication to the API. Note also that this only controls access to the
  # private API endpoint, which is used for network access from inside the VPC.
  # If you want to control access to the Kubernetes API from outside the VPC,
  # then you must use the endpoint_public_access_cidrs.
  endpoint_private_access_cidrs = []

  # A list of prefix lists that should be allowed network access to the private
  # Kubernetes API endpoint. Note that worker nodes automatically get access to
  # the private endpoint, so this controls additional access. Note that this
  # only restricts network reachability to the API, and does not account for
  # authentication to the API. Note also that this only controls access to the
  # private API endpoint, which is used for network access from inside the VPC.
  # If you want to control access to the Kubernetes API from outside the VPC,
  # then you must use the endpoint_public_access_cidrs.
  endpoint_private_access_prefix_lists = []

  # Same as endpoint_private_access_cidrs, but exposes access to the provided
  # list of security groups instead of CIDR blocks. The keys in the map are
  # unique user defined identifiers that can be used for resource tracking
  # purposes.
  endpoint_private_access_security_group_ids = {}

  # Whether or not to enable public API endpoints which allow access to the
  # Kubernetes API from outside of the VPC. Note that private access within the
  # VPC is always enabled.
  endpoint_public_access = true

  # Create a dependency between the control plane services Fargate Profile in
  # this module to the interpolated values in this list (and thus the source
  # resources). In other words, the resources in this module will now depend on
  # the resources backing the values in this list such that those resources need
  # to be created before the resources in this module, and the resources in this
  # module need to be destroyed before the resources in the list.
  fargate_profile_dependencies = []

  # Name of the kubectl config file context for accessing the EKS cluster.
  kubectl_config_context_name = ""

  # Path to the kubectl config file. Defaults to $HOME/.kube/config
  kubectl_config_path = ""

  # The URL from which to download Kubergrunt if it's not installed already.
  # Only used if var.use_kubergrunt_verification and var.auto_install_kubergrunt
  # are true.
  kubergrunt_download_url = "https://github.com/gruntwork-io/kubergrunt/releases/download/v0.16.0/kubergrunt"

  # Version of Kubernetes to use. Refer to EKS docs for list of available
  # versions
  # (https://docs.aws.amazon.com/eks/latest/userguide/platform-versions.html).
  kubernetes_version = "1.30"

  # The thumbprint to use for the OpenID Connect Provider. You can retrieve the
  # thumbprint by following the instructions in the AWS docs:
  # https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_providers_create_oidc_verify-thumbprint.html.
  # When set to null, this module will dynamically retrieve the thumbprint from
  # AWS. You should only set this if you have strict requirements around HTTP
  # access in your organization (e.g., you require an HTTP proxy).
  openid_connect_provider_thumbprint = null

  # When true, configures control plane services to run on Fargate so that the
  # cluster can run without worker nodes. When true, requires kubergrunt to be
  # available on the system.
  schedule_control_plane_services_on_fargate = false

  # ARN for KMS Key to use for envelope encryption of Kubernetes Secrets. By
  # default Secrets in EKS are encrypted at rest using shared AWS managed keys.
  # Setting this variable will configure Kubernetes to encrypt Secrets using
  # this KMS key. Can only be used on clusters created after 2020-03-05.
  secret_envelope_encryption_kms_key_arn = null

  # The name of the Security Group to create for the EKS Cluster.
  security_group_name = null

  # When true, precreate the CloudWatch Log Group to use for EKS control plane
  # logging. This is useful if you wish to customize the CloudWatch Log Group
  # with various settings such as retention periods and KMS encryption. When
  # false, EKS will automatically create a basic log group to use. Note that
  # logs are only streamed to this group if var.enabled_cluster_log_types is
  # true.
  should_create_cloudwatch_log_group = true

  # Support type to use for the cluster. If the cluster is set to EXTENDED, it
  # will enter extended support at the end of standard support. If the cluster
  # is set to STANDARD, it will be automatically upgraded at the end of standard
  # support. Valid values are EXTENDED, STANDARD
  support_type = null

  # When set to true, the sync-core-components command will skip updating
  # coredns. This variable is ignored if `use_upgrade_cluster_script` is false.
  upgrade_cluster_script_skip_coredns = false

  # When set to true, the sync-core-components command will skip updating
  # kube-proxy. This variable is ignored if `use_upgrade_cluster_script` is
  # false.
  upgrade_cluster_script_skip_kube_proxy = false

  # When set to true, the sync-core-components command will skip updating
  # aws-vpc-cni. This variable is ignored if `use_upgrade_cluster_script` is
  # false.
  upgrade_cluster_script_skip_vpc_cni = false

  # When set to true, the sync-core-components command will wait until the new
  # versions are rolled out in the cluster. This variable is ignored if
  # `use_upgrade_cluster_script` is false.
  upgrade_cluster_script_wait_for_rollout = true

  # When set to true, this will enable the kubergrunt eks cleanup-security-group
  # command using a local-exec provisioner. This script ensures that no known
  # residual resources managed by EKS is left behind after the cluster has been
  # deleted.
  use_cleanup_cluster_script = true

  # When set to true, this will enable kubergrunt verification to wait for the
  # Kubernetes API server to come up before completing. If false, reverts to a
  # 30 second timed wait instead.
  use_kubergrunt_verification = true

  # When true, all IAM policies will be managed as dedicated policies rather
  # than inline policies attached to the IAM roles. Dedicated managed policies
  # are friendlier to automated policy checkers, which may scan a single
  # resource for findings. As such, it is important to avoid inline policies
  # when targeting compliance with various security standards.
  use_managed_iam_policies = true

  # When set to true, this will enable the kubergrunt eks sync-core-components
  # command using a local-exec provisioner. This script ensures that the
  # Kubernetes core components are upgraded to a matching version everytime the
  # cluster's Kubernetes version is updated.
  use_upgrade_cluster_script = true

  # When set to true, this will enable management of the aws-vpc-cni
  # configuration options using kubergrunt running as a local-exec provisioner.
  # If you set this to false, the vpc_cni_* variables will be ignored.
  use_vpc_cni_customize_script = true

  # When true, enable prefix delegation mode for the AWS VPC CNI component of
  # the EKS cluster. In prefix delegation mode, each ENI will be allocated 16 IP
  # addresses (/28) instead of 1, allowing you to pack more Pods per node. Note
  # that by default, AWS VPC CNI will always preallocate 1 full prefix - this
  # means that you can potentially take up 32 IP addresses from the VPC network
  # space even if you only have 1 Pod on the node. You can tweak this behavior
  # by configuring the var.vpc_cni_warm_ip_target input variable.
  vpc_cni_enable_prefix_delegation = false

  # The minimum number of IP addresses (free and used) each node should start
  # with. When null, defaults to the aws-vpc-cni application setting (currently
  # 16 as of version 1.9.0). For example, if this is set to 25, every node will
  # allocate 2 prefixes (32 IP addresses). On the other hand, if this was set to
  # the default value, then each node will allocate only 1 prefix (16 IP
  # addresses).
  vpc_cni_minimum_ip_target = null

  # The number of free IP addresses each node should maintain. When null,
  # defaults to the aws-vpc-cni application setting (currently 16 as of version
  # 1.9.0). In prefix delegation mode, determines whether the node will
  # preallocate another full prefix. For example, if this is set to 5 and a node
  # is currently has 9 Pods scheduled, then the node will NOT preallocate a new
  # prefix block of 16 IP addresses. On the other hand, if this was set to the
  # default value, then the node will allocate a new block when the first pod is
  # scheduled.
  vpc_cni_warm_ip_target = null

  # A list of the subnets into which the EKS Cluster's administrative pods will
  # be launched. These should usually be all private subnets and include one in
  # each AWS Availability Zone. Required when
  # var.schedule_control_plane_services is true.
  vpc_worker_subnet_ids = []

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S EKS-CLUSTER-CONTROL-PLANE MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-eks.git//modules/eks-cluster-control-plane?ref=v0.75.0"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The name of the EKS cluster (e.g. eks-prod). This is used to namespace all
  # the resources created by these templates.
  cluster_name = <string>

  # A list of CIDR blocks that should be allowed network access to the
  # Kubernetes public API endpoint. When null or empty, allow access from the
  # whole world (0.0.0.0/0). Note that this only restricts network reachability
  # to the API, and does not account for authentication to the API. Note also
  # that this only controls access to the public API endpoint, which is used for
  # network access from outside the VPC. If you want to control access to the
  # Kubernetes API from within the VPC, then you must use the
  # endpoint_private_access_cidrs and endpoint_private_access_security_group_ids
  # variables.
  endpoint_public_access_cidrs = <list(string)>

  # A list of the subnets into which the EKS Cluster's control plane nodes will
  # be launched. These should usually be all private subnets and include one in
  # each AWS Availability Zone.
  vpc_control_plane_subnet_ids = <list(string)>

  # The ID of the VPC in which the EKS Cluster's EC2 Instances will reside.
  vpc_id = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The authentication mode for the cluster. Valid values are CONFIG_MAP, API or
  # API_AND_CONFIG_MAP.
  access_config_authentication_mode = "CONFIG_MAP"

  # Map of EKS Access Entries to be created for the cluster.
  access_entries = {}

  # Map of EKS Access Entry Policy Associations to be created for the cluster.
  access_entry_policy_associations = {}

  # A list of additional security group IDs to attach to the control plane.
  additional_security_groups = []

  # Automatically download and install Kubergrunt if it isn't already installed
  # on this OS. Only used if var.use_kubergrunt_verification is true.
  auto_install_kubergrunt = true

  # The AWS partition used for default AWS Resources.
  aws_partition = "aws"

  # Whether or not to bootstrap an access entry with cluster admin permissions
  # for the cluster creator.
  bootstrap_cluster_creator_admin_permissions = true

  # Install default unmanaged add-ons, such as aws-cni, kube-proxy, and CoreDNS
  # during cluster creation. If false, you must manually install desired
  # add-ons. Changing this value will force a new cluster to be created.
  bootstrap_self_managed_addons = true

  # Specify the log class of the cloudwatch log group
  cloudwatch_log_group_class = "STANDARD"

  # The ID (ARN, alias ARN, AWS ID) of a customer managed KMS Key to use for
  # encrypting log data in the CloudWatch log group for EKS control plane logs.
  cloudwatch_log_group_kms_key_id = null

  # The number of days to retain log events in the CloudWatch log group for EKS
  # control plane logs. Refer to
  # https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudwatch_log_group#retention_in_days
  # for all the valid values. When null, the log events are retained forever.
  cloudwatch_log_group_retention_in_days = null

  # Tags to apply on the CloudWatch Log Group for EKS control plane logs,
  # encoded as a map where the keys are tag keys and values are tag values.
  cloudwatch_log_group_tags = null

  # ARN of permissions boundary to apply to the cluster IAM role - the IAM role
  # created for the EKS cluster as well as the default fargate IAM role.
  cluster_iam_role_permissions_boundary = null

  # The IP family used to assign Kubernetes pod and service addresses. Valid
  # values are ipv4 (default) and ipv6. You can only specify an IP family when
  # you create a cluster, changing this value will force a new cluster to be
  # created.
  cluster_network_config_ip_family = "ipv4"

  # The CIDR block to assign Kubernetes pod and service IP addresses from. If
  # you don't specify a block, Kubernetes assigns addresses from either the
  # 10.100.0.0/16 or 172.20.0.0/16 CIDR blocks. You can only specify a custom
  # CIDR block when you create a cluster, changing this value will force a new
  # cluster to be created.
  cluster_network_config_service_ipv4_cidr = null

  # Whether or not to automatically configure kubectl on the current operator
  # machine. To use this, you need a working python install with the AWS CLI
  # installed and configured.
  configure_kubectl = false

  # When set to true, this will inform the module to set up the OpenID Connect
  # Provider for use with the IAM Roles for Service Accounts feature of EKS.
  configure_openid_connect_provider = true

  # When true, IAM role will be created and attached to Fargate control plane
  # services. When true, requires that
  # schedule_control_plane_services_on_fargate variable should be set true.
  create_default_fargate_iam_role = true

  # The name to use for the default Fargate execution IAM role that is created
  # when create_default_fargate_iam_role is true. When null, defaults to
  # CLUSTER_NAME-fargate-role.
  custom_fargate_iam_role_name = null

  # A map of custom tags to apply to the EKS add-ons. The key is the tag name
  # and the value is the tag value.
  custom_tags_eks_addons = {}

  # A map of custom tags to apply to the EKS Cluster. The key is the tag name
  # and the value is the tag value.
  custom_tags_eks_cluster = {}

  # A map of custom tags to apply to the Security Group for this EKS Cluster.
  # The key is the tag name and the value is the tag value.
  custom_tags_security_group = {}

  # A map of default tags to apply to all supported resources in this module.
  # These tags will be merged with any other resource specific tags. The key is
  # the tag name and the value is the tag value.
  default_tags = {}

  # Configuraiton object for the EBS CSI Driver EKS AddOn
  ebs_csi_driver_addon_config = {}

  # A map of custom tags to apply to the EBS CSI Driver AddOn. The key is the
  # tag name and the value is the tag value.
  ebs_csi_driver_addon_tags = {}

  # A map of custom tags to apply to the IAM Policies created for the EBS CSI
  # Driver IAM Role if enabled. The key is the tag name and the value is the tag
  # value.
  ebs_csi_driver_iam_policy_tags = {}

  # A map of custom tags to apply to the EBS CSI Driver IAM Role if enabled. The
  # key is the tag name and the value is the tag value.
  ebs_csi_driver_iam_role_tags = {}

  # If using KMS encryption of EBS volumes, provide the KMS Key ARN to be used
  # for a policy attachment.
  ebs_csi_driver_kms_key_arn = null

  # The namespace for the EBS CSI Driver. This will almost always be the
  # kube-system namespace.
  ebs_csi_driver_namespace = "kube-system"

  # The Service Account name to be used with the EBS CSI Driver
  ebs_csi_driver_sa_name = "ebs-csi-controller-sa"

  # Map of EKS add-ons, where key is name of the add-on and value is a map of
  # add-on properties.
  eks_addons = {}

  # Configuration block with compute configuration for EKS Auto Mode.
  eks_auto_mode_compute_config = {"enabled":true,"node_pools":["general-purpose","system"]}

  # Whether or not to create an IAM Role for the EKS Worker Nodes when using EKS
  # Auto Mode. If using the built-in NodePools for EKS Auto Mode you must either
  # provide an IAM Role ARN for `eks_auto_mode_compute_config.node_role_arn` or
  # set this to true to automatically create one.
  eks_auto_mode_create_node_iam_role = true

  # Configuration block with elastic load balancing configuration for the
  # cluster.
  eks_auto_mode_elastic_load_balancing_config = {}

  # Whether or not to enable EKS Auto Mode.
  eks_auto_mode_enabled = false

  # Description of the EKS Auto Mode Node IAM Role.
  eks_auto_mode_iam_role_description = null

  # IAM Role Name to for the EKS Auto Mode Node IAM Role. If this is not set a
  # default name will be provided in the form of
  # `<var.cluster_name-eks-auto-mode-role>`
  eks_auto_mode_iam_role_name = null

  # The IAM Role Path for the EKS Auto Mode Node IAM Role.
  eks_auto_mode_iam_role_path = null

  # Permissions Boundary ARN to be used with the EKS Auto Mode Node IAM Role.
  eks_auto_mode_iam_role_permissions_boundary = null

  # A map of additional tags to be added to the EKS Auto Mode Node IAM Role.
  eks_auto_mode_iam_role_tags = {}

  # Whether or not to use `eks_auto_mode_iam_role_name` as a prefix for the EKS
  # Auto Mode Node IAM Role Name.
  eks_auto_mode_iam_role_use_name_prefix = true

  # Configuration block with storage configuration for EKS Auto Mode.
  eks_auto_mode_storage_config = {}

  # A map of custom tags to apply to the EKS Cluster Cluster Creator Access
  # Entry. The key is the tag name and the value is the tag value.
  eks_cluster_creator_access_entry_tags = {}

  # A map of custom tags to apply to the EKS Cluster IAM Role. The key is the
  # tag name and the value is the tag value.
  eks_cluster_iam_role_tags = {}

  # A map of custom tags to apply to the EKS Cluster OIDC Provider. The key is
  # the tag name and the value is the tag value.
  eks_cluster_oidc_tags = {}

  # A map of custom tags to apply to the Control Plane Services Fargate Profile
  # IAM Role for this EKS Cluster if enabled. The key is the tag name and the
  # value is the tag value.
  eks_fargate_profile_iam_role_tags = {}

  # A map of custom tags to apply to the Control Plane Services Fargate Profile
  # for this EKS Cluster if enabled. The key is the tag name and the value is
  # the tag value.
  eks_fargate_profile_tags = {}

  # When set to true, the module configures and install the EBS CSI Driver as an
  # EKS managed AddOn
  # (https://docs.aws.amazon.com/eks/latest/userguide/managing-ebs-csi.html). To
  # use this feature, `configure_openid_connect_provider` must be set to true
  # (the default value).
  enable_ebs_csi_driver = false

  # When set to true, the module configures EKS add-ons
  # (https://docs.aws.amazon.com/eks/latest/userguide/eks-add-ons.html)
  # specified with `eks_addons`. VPC CNI configurations with
  # `use_vpc_cni_customize_script` isn't fully supported with addons, as the
  # automated add-on lifecycles could potentially undo the configuration
  # changes.
  enable_eks_addons = false

  # A list of the desired control plane logging to enable. See
  # https://docs.aws.amazon.com/eks/latest/userguide/control-plane-logs.html for
  # the list of available logs.
  enabled_cluster_log_types = []

  # A list of CIDR blocks that should be allowed network access to the private
  # Kubernetes API endpoint. Note that worker nodes automatically get access to
  # the private endpoint, so this controls additional access. Note that this
  # only restricts network reachability to the API, and does not account for
  # authentication to the API. Note also that this only controls access to the
  # private API endpoint, which is used for network access from inside the VPC.
  # If you want to control access to the Kubernetes API from outside the VPC,
  # then you must use the endpoint_public_access_cidrs.
  endpoint_private_access_cidrs = []

  # A list of prefix lists that should be allowed network access to the private
  # Kubernetes API endpoint. Note that worker nodes automatically get access to
  # the private endpoint, so this controls additional access. Note that this
  # only restricts network reachability to the API, and does not account for
  # authentication to the API. Note also that this only controls access to the
  # private API endpoint, which is used for network access from inside the VPC.
  # If you want to control access to the Kubernetes API from outside the VPC,
  # then you must use the endpoint_public_access_cidrs.
  endpoint_private_access_prefix_lists = []

  # Same as endpoint_private_access_cidrs, but exposes access to the provided
  # list of security groups instead of CIDR blocks. The keys in the map are
  # unique user defined identifiers that can be used for resource tracking
  # purposes.
  endpoint_private_access_security_group_ids = {}

  # Whether or not to enable public API endpoints which allow access to the
  # Kubernetes API from outside of the VPC. Note that private access within the
  # VPC is always enabled.
  endpoint_public_access = true

  # Create a dependency between the control plane services Fargate Profile in
  # this module to the interpolated values in this list (and thus the source
  # resources). In other words, the resources in this module will now depend on
  # the resources backing the values in this list such that those resources need
  # to be created before the resources in this module, and the resources in this
  # module need to be destroyed before the resources in the list.
  fargate_profile_dependencies = []

  # Name of the kubectl config file context for accessing the EKS cluster.
  kubectl_config_context_name = ""

  # Path to the kubectl config file. Defaults to $HOME/.kube/config
  kubectl_config_path = ""

  # The URL from which to download Kubergrunt if it's not installed already.
  # Only used if var.use_kubergrunt_verification and var.auto_install_kubergrunt
  # are true.
  kubergrunt_download_url = "https://github.com/gruntwork-io/kubergrunt/releases/download/v0.16.0/kubergrunt"

  # Version of Kubernetes to use. Refer to EKS docs for list of available
  # versions
  # (https://docs.aws.amazon.com/eks/latest/userguide/platform-versions.html).
  kubernetes_version = "1.30"

  # The thumbprint to use for the OpenID Connect Provider. You can retrieve the
  # thumbprint by following the instructions in the AWS docs:
  # https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_providers_create_oidc_verify-thumbprint.html.
  # When set to null, this module will dynamically retrieve the thumbprint from
  # AWS. You should only set this if you have strict requirements around HTTP
  # access in your organization (e.g., you require an HTTP proxy).
  openid_connect_provider_thumbprint = null

  # When true, configures control plane services to run on Fargate so that the
  # cluster can run without worker nodes. When true, requires kubergrunt to be
  # available on the system.
  schedule_control_plane_services_on_fargate = false

  # ARN for KMS Key to use for envelope encryption of Kubernetes Secrets. By
  # default Secrets in EKS are encrypted at rest using shared AWS managed keys.
  # Setting this variable will configure Kubernetes to encrypt Secrets using
  # this KMS key. Can only be used on clusters created after 2020-03-05.
  secret_envelope_encryption_kms_key_arn = null

  # The name of the Security Group to create for the EKS Cluster.
  security_group_name = null

  # When true, precreate the CloudWatch Log Group to use for EKS control plane
  # logging. This is useful if you wish to customize the CloudWatch Log Group
  # with various settings such as retention periods and KMS encryption. When
  # false, EKS will automatically create a basic log group to use. Note that
  # logs are only streamed to this group if var.enabled_cluster_log_types is
  # true.
  should_create_cloudwatch_log_group = true

  # Support type to use for the cluster. If the cluster is set to EXTENDED, it
  # will enter extended support at the end of standard support. If the cluster
  # is set to STANDARD, it will be automatically upgraded at the end of standard
  # support. Valid values are EXTENDED, STANDARD
  support_type = null

  # When set to true, the sync-core-components command will skip updating
  # coredns. This variable is ignored if `use_upgrade_cluster_script` is false.
  upgrade_cluster_script_skip_coredns = false

  # When set to true, the sync-core-components command will skip updating
  # kube-proxy. This variable is ignored if `use_upgrade_cluster_script` is
  # false.
  upgrade_cluster_script_skip_kube_proxy = false

  # When set to true, the sync-core-components command will skip updating
  # aws-vpc-cni. This variable is ignored if `use_upgrade_cluster_script` is
  # false.
  upgrade_cluster_script_skip_vpc_cni = false

  # When set to true, the sync-core-components command will wait until the new
  # versions are rolled out in the cluster. This variable is ignored if
  # `use_upgrade_cluster_script` is false.
  upgrade_cluster_script_wait_for_rollout = true

  # When set to true, this will enable the kubergrunt eks cleanup-security-group
  # command using a local-exec provisioner. This script ensures that no known
  # residual resources managed by EKS is left behind after the cluster has been
  # deleted.
  use_cleanup_cluster_script = true

  # When set to true, this will enable kubergrunt verification to wait for the
  # Kubernetes API server to come up before completing. If false, reverts to a
  # 30 second timed wait instead.
  use_kubergrunt_verification = true

  # When true, all IAM policies will be managed as dedicated policies rather
  # than inline policies attached to the IAM roles. Dedicated managed policies
  # are friendlier to automated policy checkers, which may scan a single
  # resource for findings. As such, it is important to avoid inline policies
  # when targeting compliance with various security standards.
  use_managed_iam_policies = true

  # When set to true, this will enable the kubergrunt eks sync-core-components
  # command using a local-exec provisioner. This script ensures that the
  # Kubernetes core components are upgraded to a matching version everytime the
  # cluster's Kubernetes version is updated.
  use_upgrade_cluster_script = true

  # When set to true, this will enable management of the aws-vpc-cni
  # configuration options using kubergrunt running as a local-exec provisioner.
  # If you set this to false, the vpc_cni_* variables will be ignored.
  use_vpc_cni_customize_script = true

  # When true, enable prefix delegation mode for the AWS VPC CNI component of
  # the EKS cluster. In prefix delegation mode, each ENI will be allocated 16 IP
  # addresses (/28) instead of 1, allowing you to pack more Pods per node. Note
  # that by default, AWS VPC CNI will always preallocate 1 full prefix - this
  # means that you can potentially take up 32 IP addresses from the VPC network
  # space even if you only have 1 Pod on the node. You can tweak this behavior
  # by configuring the var.vpc_cni_warm_ip_target input variable.
  vpc_cni_enable_prefix_delegation = false

  # The minimum number of IP addresses (free and used) each node should start
  # with. When null, defaults to the aws-vpc-cni application setting (currently
  # 16 as of version 1.9.0). For example, if this is set to 25, every node will
  # allocate 2 prefixes (32 IP addresses). On the other hand, if this was set to
  # the default value, then each node will allocate only 1 prefix (16 IP
  # addresses).
  vpc_cni_minimum_ip_target = null

  # The number of free IP addresses each node should maintain. When null,
  # defaults to the aws-vpc-cni application setting (currently 16 as of version
  # 1.9.0). In prefix delegation mode, determines whether the node will
  # preallocate another full prefix. For example, if this is set to 5 and a node
  # is currently has 9 Pods scheduled, then the node will NOT preallocate a new
  # prefix block of 16 IP addresses. On the other hand, if this was set to the
  # default value, then the node will allocate a new block when the first pod is
  # scheduled.
  vpc_cni_warm_ip_target = null

  # A list of the subnets into which the EKS Cluster's administrative pods will
  # be launched. These should usually be all private subnets and include one in
  # each AWS Availability Zone. Required when
  # var.schedule_control_plane_services is true.
  vpc_worker_subnet_ids = []

}


```

</TabItem>
</Tabs>




## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Required

<HclListItem name="cluster_name" requirement="required" type="string">
<HclListItemDescription>

The name of the EKS cluster (e.g. eks-prod). This is used to namespace all the resources created by these templates.

</HclListItemDescription>
</HclListItem>

<HclListItem name="endpoint_public_access_cidrs" requirement="required" type="list(string)">
<HclListItemDescription>

A list of CIDR blocks that should be allowed network access to the Kubernetes public API endpoint. When null or empty, allow access from the whole world (0.0.0.0/0). Note that this only restricts network reachability to the API, and does not account for authentication to the API. Note also that this only controls access to the public API endpoint, which is used for network access from outside the VPC. If you want to control access to the Kubernetes API from within the VPC, then you must use the endpoint_private_access_cidrs and endpoint_private_access_security_group_ids variables.

</HclListItemDescription>
</HclListItem>

<HclListItem name="vpc_control_plane_subnet_ids" requirement="required" type="list(string)">
<HclListItemDescription>

A list of the subnets into which the EKS Cluster's control plane nodes will be launched. These should usually be all private subnets and include one in each AWS Availability Zone.

</HclListItemDescription>
</HclListItem>

<HclListItem name="vpc_id" requirement="required" type="string">
<HclListItemDescription>

The ID of the VPC in which the EKS Cluster's EC2 Instances will reside.

</HclListItemDescription>
</HclListItem>

### Optional

<HclListItem name="access_config_authentication_mode" requirement="optional" type="string">
<HclListItemDescription>

The authentication mode for the cluster. Valid values are CONFIG_MAP, API or API_AND_CONFIG_MAP.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;CONFIG_MAP&quot;"/>
</HclListItem>

<HclListItem name="access_entries" requirement="optional" type="any">
<HclListItemDescription>

Map of EKS Access Entries to be created for the cluster.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
Any types represent complex values of variable type. For details, please consult `variables.tf` in the source repo.
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="{}"/>
<HclGeneralListItem title="Examples">
<details>
  <summary>Example</summary>


```hcl
   {
     namespace_admin = {
       principal_arn     = arn:aws:iam::123456789101:user/my-user
       type              = "STANDARD"
       kubernetes_groups = ["group-1", "group-2"]
     },
     cluster_admin = {
       principal_arn = arn:aws:iam::123456789101:role/my-role
       type          = "STANDARD"
     }
   }

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="access_entry_policy_associations" requirement="optional" type="any">
<HclListItemDescription>

Map of EKS Access Entry Policy Associations to be created for the cluster.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
Any types represent complex values of variable type. For details, please consult `variables.tf` in the source repo.
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="{}"/>
<HclGeneralListItem title="Examples">
<details>
  <summary>Example</summary>


```hcl
   {
     namespace_admin = {
       principal_arn = aws_iam_role.namespace_admin.arn
       policy_arn    = "arn:aws:eks::aws:cluster-access-policy/AmazonEKSAdminPolicy"
       type          = "namespace"
       namespaces    = ["default", "dev-namespace"]
     },
     cluster_admin = {
       principal_arn = aws_iam_role.cluster_admin.arn
       policy_arn    = "arn:aws:eks::aws:cluster-access-policy/AmazonEKSClusterAdminPolicy"
       type          = "cluster"
       namespaces    = []
   }

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="additional_security_groups" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of additional security group IDs to attach to the control plane.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="auto_install_kubergrunt" requirement="optional" type="bool">
<HclListItemDescription>

Automatically download and install Kubergrunt if it isn't already installed on this OS. Only used if <a href="#use_kubergrunt_verification"><code>use_kubergrunt_verification</code></a> is true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="aws_partition" requirement="optional" type="string">
<HclListItemDescription>

The AWS partition used for default AWS Resources.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;aws&quot;"/>
</HclListItem>

<HclListItem name="bootstrap_cluster_creator_admin_permissions" requirement="optional" type="bool">
<HclListItemDescription>

Whether or not to bootstrap an access entry with cluster admin permissions for the cluster creator.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="bootstrap_self_managed_addons" requirement="optional" type="bool">
<HclListItemDescription>

Install default unmanaged add-ons, such as aws-cni, kube-proxy, and CoreDNS during cluster creation. If false, you must manually install desired add-ons. Changing this value will force a new cluster to be created.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="cloudwatch_log_group_class" requirement="optional" type="string">
<HclListItemDescription>

Specify the log class of the cloudwatch log group

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;STANDARD&quot;"/>
</HclListItem>

<HclListItem name="cloudwatch_log_group_kms_key_id" requirement="optional" type="string">
<HclListItemDescription>

The ID (ARN, alias ARN, AWS ID) of a customer managed KMS Key to use for encrypting log data in the CloudWatch log group for EKS control plane logs.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="cloudwatch_log_group_retention_in_days" requirement="optional" type="number">
<HclListItemDescription>

The number of days to retain log events in the CloudWatch log group for EKS control plane logs. Refer to https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudwatch_log_group#retention_in_days for all the valid values. When null, the log events are retained forever.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="cloudwatch_log_group_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

Tags to apply on the CloudWatch Log Group for EKS control plane logs, encoded as a map where the keys are tag keys and values are tag values.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="cluster_iam_role_permissions_boundary" requirement="optional" type="string">
<HclListItemDescription>

ARN of permissions boundary to apply to the cluster IAM role - the IAM role created for the EKS cluster as well as the default fargate IAM role.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="cluster_network_config_ip_family" requirement="optional" type="string">
<HclListItemDescription>

The IP family used to assign Kubernetes pod and service addresses. Valid values are ipv4 (default) and ipv6. You can only specify an IP family when you create a cluster, changing this value will force a new cluster to be created.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;ipv4&quot;"/>
</HclListItem>

<HclListItem name="cluster_network_config_service_ipv4_cidr" requirement="optional" type="string">
<HclListItemDescription>

The CIDR block to assign Kubernetes pod and service IP addresses from. If you don't specify a block, Kubernetes assigns addresses from either the 10.100.0.0/16 or 172.20.0.0/16 CIDR blocks. You can only specify a custom CIDR block when you create a cluster, changing this value will force a new cluster to be created.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="configure_kubectl" requirement="optional" type="bool">
<HclListItemDescription>

Whether or not to automatically configure kubectl on the current operator machine. To use this, you need a working python install with the AWS CLI installed and configured.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="configure_openid_connect_provider" requirement="optional" type="bool">
<HclListItemDescription>

When set to true, this will inform the module to set up the OpenID Connect Provider for use with the IAM Roles for Service Accounts feature of EKS.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="create_default_fargate_iam_role" requirement="optional" type="bool">
<HclListItemDescription>

When true, IAM role will be created and attached to Fargate control plane services. When true, requires that schedule_control_plane_services_on_fargate variable should be set true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="custom_fargate_iam_role_name" requirement="optional" type="string">
<HclListItemDescription>

The name to use for the default Fargate execution IAM role that is created when create_default_fargate_iam_role is true. When null, defaults to CLUSTER_NAME-fargate-role.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="custom_tags_eks_addons" requirement="optional" type="map(string)">
<HclListItemDescription>

A map of custom tags to apply to the EKS add-ons. The key is the tag name and the value is the tag value.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="custom_tags_eks_cluster" requirement="optional" type="map(string)">
<HclListItemDescription>

A map of custom tags to apply to the EKS Cluster. The key is the tag name and the value is the tag value.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="custom_tags_security_group" requirement="optional" type="map(string)">
<HclListItemDescription>

A map of custom tags to apply to the Security Group for this EKS Cluster. The key is the tag name and the value is the tag value.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="default_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

A map of default tags to apply to all supported resources in this module. These tags will be merged with any other resource specific tags. The key is the tag name and the value is the tag value.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="ebs_csi_driver_addon_config" requirement="optional" type="any">
<HclListItemDescription>

Configuraiton object for the EBS CSI Driver EKS AddOn

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
Any types represent complex values of variable type. For details, please consult `variables.tf` in the source repo.
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="{}"/>
<HclGeneralListItem title="More Details">
<details>


```hcl

   EKS add-on advanced configuration via configuration_values must follow the configuration schema for the deployed version of the add-on. 
   See the following AWS Blog for more details on advanced configuration of EKS add-ons: https://aws.amazon.com/blogs/containers/amazon-eks-add-ons-advanced-configuration/
   Example:
   {
     addon_version               = "v1.14.0-eksbuild.1"
     configuration_values        = {}
     preserve                    = false
     resolve_conflicts_on_create = "OVERWRITE"
     resolve_conflicts_on_update = "NONE"
     service_account_role_arn    = "arn:aws:iam::123456789012:role/role-name"
   }

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="ebs_csi_driver_addon_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

A map of custom tags to apply to the EBS CSI Driver AddOn. The key is the tag name and the value is the tag value.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="ebs_csi_driver_iam_policy_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

A map of custom tags to apply to the IAM Policies created for the EBS CSI Driver IAM Role if enabled. The key is the tag name and the value is the tag value.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="ebs_csi_driver_iam_role_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

A map of custom tags to apply to the EBS CSI Driver IAM Role if enabled. The key is the tag name and the value is the tag value.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="ebs_csi_driver_kms_key_arn" requirement="optional" type="string">
<HclListItemDescription>

If using KMS encryption of EBS volumes, provide the KMS Key ARN to be used for a policy attachment.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="ebs_csi_driver_namespace" requirement="optional" type="string">
<HclListItemDescription>

The namespace for the EBS CSI Driver. This will almost always be the kube-system namespace.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;kube-system&quot;"/>
</HclListItem>

<HclListItem name="ebs_csi_driver_sa_name" requirement="optional" type="string">
<HclListItemDescription>

The Service Account name to be used with the EBS CSI Driver

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;ebs-csi-controller-sa&quot;"/>
</HclListItem>

<HclListItem name="eks_addons" requirement="optional" type="any">
<HclListItemDescription>

Map of EKS add-ons, where key is name of the add-on and value is a map of add-on properties.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
Any types represent complex values of variable type. For details, please consult `variables.tf` in the source repo.
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="{}"/>
<HclGeneralListItem title="More Details">
<details>


```hcl

   EKS add-on advanced configuration via configuration_values must follow the configuration schema for the deployed version of the add-on. 
   See the following AWS Blog for more details on advanced configuration of EKS add-ons: https://aws.amazon.com/blogs/containers/amazon-eks-add-ons-advanced-configuration/
   Example:
     eks_addons = {
       coredns    = {}
       kube-proxy = {}
       vpc-cni    = {
         addon_version        = "1.10.1-eksbuild.1"
         configuration_values = {
            ipvs      = {}
            mode      = "iptables"
            resources = {}
         }
         preserve                    = false
         resolve_conflicts_on_create = "OVERWRITE"
         resolve_conflicts_on_update = "NONE"
         service_account_role_arn    = "arn:aws:iam::123456789012:role/role-name"
       }
     }

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="eks_auto_mode_compute_config" requirement="optional" type="any">
<HclListItemDescription>

Configuration block with compute configuration for EKS Auto Mode.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
Any types represent complex values of variable type. For details, please consult `variables.tf` in the source repo.
```

</HclListItemTypeDetails>
<HclListItemDefaultValue>

```hcl
{
  enabled = true,
  node_pools = [
    "general-purpose",
    "system"
  ]
}
```

</HclListItemDefaultValue>
<HclGeneralListItem title="Examples">
<details>
  <summary>Example</summary>


```hcl
   {
      enabled: true
      node_pools: "general-purpose"
      node_role_arn: "arn:aws:eks::aws:role/MyEKSAccessModeWorkerRole"
   }

```
</details>

</HclGeneralListItem>
<HclGeneralListItem title="More Details">
<details>


```hcl

   We will default to use the default Node Pools provided by AWS

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="eks_auto_mode_create_node_iam_role" requirement="optional" type="bool">
<HclListItemDescription>

Whether or not to create an IAM Role for the EKS Worker Nodes when using EKS Auto Mode. If using the built-in NodePools for EKS Auto Mode you must either provide an IAM Role ARN for `eks_auto_mode_compute_config.node_role_arn` or set this to true to automatically create one.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="eks_auto_mode_elastic_load_balancing_config" requirement="optional" type="any">
<HclListItemDescription>

Configuration block with elastic load balancing configuration for the cluster.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
Any types represent complex values of variable type. For details, please consult `variables.tf` in the source repo.
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="eks_auto_mode_enabled" requirement="optional" type="bool">
<HclListItemDescription>

Whether or not to enable EKS Auto Mode.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="eks_auto_mode_iam_role_description" requirement="optional" type="string">
<HclListItemDescription>

Description of the EKS Auto Mode Node IAM Role.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="eks_auto_mode_iam_role_name" requirement="optional" type="string">
<HclListItemDescription>

IAM Role Name to for the EKS Auto Mode Node IAM Role. If this is not set a default name will be provided in the form of `&lt;<a href="#cluster_name"><code>cluster_name</code></a>-eks-auto-mode-role>`

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="eks_auto_mode_iam_role_path" requirement="optional" type="string">
<HclListItemDescription>

The IAM Role Path for the EKS Auto Mode Node IAM Role.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="eks_auto_mode_iam_role_permissions_boundary" requirement="optional" type="string">
<HclListItemDescription>

Permissions Boundary ARN to be used with the EKS Auto Mode Node IAM Role.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="eks_auto_mode_iam_role_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

A map of additional tags to be added to the EKS Auto Mode Node IAM Role.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="eks_auto_mode_iam_role_use_name_prefix" requirement="optional" type="bool">
<HclListItemDescription>

Whether or not to use `eks_auto_mode_iam_role_name` as a prefix for the EKS Auto Mode Node IAM Role Name.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="eks_auto_mode_storage_config" requirement="optional" type="any">
<HclListItemDescription>

Configuration block with storage configuration for EKS Auto Mode.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
Any types represent complex values of variable type. For details, please consult `variables.tf` in the source repo.
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="eks_cluster_creator_access_entry_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

A map of custom tags to apply to the EKS Cluster Cluster Creator Access Entry. The key is the tag name and the value is the tag value.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="eks_cluster_iam_role_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

A map of custom tags to apply to the EKS Cluster IAM Role. The key is the tag name and the value is the tag value.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="eks_cluster_oidc_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

A map of custom tags to apply to the EKS Cluster OIDC Provider. The key is the tag name and the value is the tag value.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="eks_fargate_profile_iam_role_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

A map of custom tags to apply to the Control Plane Services Fargate Profile IAM Role for this EKS Cluster if enabled. The key is the tag name and the value is the tag value.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="eks_fargate_profile_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

A map of custom tags to apply to the Control Plane Services Fargate Profile for this EKS Cluster if enabled. The key is the tag name and the value is the tag value.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="enable_ebs_csi_driver" requirement="optional" type="bool">
<HclListItemDescription>

When set to true, the module configures and install the EBS CSI Driver as an EKS managed AddOn (https://docs.aws.amazon.com/eks/latest/userguide/managing-ebs-csi.html). To use this feature, `configure_openid_connect_provider` must be set to true (the default value).

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="enable_eks_addons" requirement="optional" type="bool">
<HclListItemDescription>

When set to true, the module configures EKS add-ons (https://docs.aws.amazon.com/eks/latest/userguide/eks-add-ons.html) specified with `eks_addons`. VPC CNI configurations with `use_vpc_cni_customize_script` isn't fully supported with addons, as the automated add-on lifecycles could potentially undo the configuration changes.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="enabled_cluster_log_types" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of the desired control plane logging to enable. See https://docs.aws.amazon.com/eks/latest/userguide/control-plane-logs.html for the list of available logs.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="endpoint_private_access_cidrs" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of CIDR blocks that should be allowed network access to the private Kubernetes API endpoint. Note that worker nodes automatically get access to the private endpoint, so this controls additional access. Note that this only restricts network reachability to the API, and does not account for authentication to the API. Note also that this only controls access to the private API endpoint, which is used for network access from inside the VPC. If you want to control access to the Kubernetes API from outside the VPC, then you must use the endpoint_public_access_cidrs.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="endpoint_private_access_prefix_lists" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of prefix lists that should be allowed network access to the private Kubernetes API endpoint. Note that worker nodes automatically get access to the private endpoint, so this controls additional access. Note that this only restricts network reachability to the API, and does not account for authentication to the API. Note also that this only controls access to the private API endpoint, which is used for network access from inside the VPC. If you want to control access to the Kubernetes API from outside the VPC, then you must use the endpoint_public_access_cidrs.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="endpoint_private_access_security_group_ids" requirement="optional" type="map(string)">
<HclListItemDescription>

Same as endpoint_private_access_cidrs, but exposes access to the provided list of security groups instead of CIDR blocks. The keys in the map are unique user defined identifiers that can be used for resource tracking purposes.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="endpoint_public_access" requirement="optional" type="bool">
<HclListItemDescription>

Whether or not to enable public API endpoints which allow access to the Kubernetes API from outside of the VPC. Note that private access within the VPC is always enabled.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="fargate_profile_dependencies" requirement="optional" type="list(string)">
<HclListItemDescription>

Create a dependency between the control plane services Fargate Profile in this module to the interpolated values in this list (and thus the source resources). In other words, the resources in this module will now depend on the resources backing the values in this list such that those resources need to be created before the resources in this module, and the resources in this module need to be destroyed before the resources in the list.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="kubectl_config_context_name" requirement="optional" type="string">
<HclListItemDescription>

Name of the kubectl config file context for accessing the EKS cluster.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;&quot;"/>
</HclListItem>

<HclListItem name="kubectl_config_path" requirement="optional" type="string">
<HclListItemDescription>

Path to the kubectl config file. Defaults to $HOME/.kube/config

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;&quot;"/>
</HclListItem>

<HclListItem name="kubergrunt_download_url" requirement="optional" type="string">
<HclListItemDescription>

The URL from which to download Kubergrunt if it's not installed already. Only used if <a href="#use_kubergrunt_verification"><code>use_kubergrunt_verification</code></a> and <a href="#auto_install_kubergrunt"><code>auto_install_kubergrunt</code></a> are true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;https://github.com/gruntwork-io/kubergrunt/releases/download/v0.16.0/kubergrunt&quot;"/>
</HclListItem>

<HclListItem name="kubernetes_version" requirement="optional" type="string">
<HclListItemDescription>

Version of Kubernetes to use. Refer to EKS docs for list of available versions (https://docs.aws.amazon.com/eks/latest/userguide/platform-versions.html).

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;1.30&quot;"/>
</HclListItem>

<HclListItem name="openid_connect_provider_thumbprint" requirement="optional" type="string">
<HclListItemDescription>

The thumbprint to use for the OpenID Connect Provider. You can retrieve the thumbprint by following the instructions in the AWS docs: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_providers_create_oidc_verify-thumbprint.html. When set to null, this module will dynamically retrieve the thumbprint from AWS. You should only set this if you have strict requirements around HTTP access in your organization (e.g., you require an HTTP proxy).

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="schedule_control_plane_services_on_fargate" requirement="optional" type="bool">
<HclListItemDescription>

When true, configures control plane services to run on Fargate so that the cluster can run without worker nodes. When true, requires kubergrunt to be available on the system.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="secret_envelope_encryption_kms_key_arn" requirement="optional" type="string">
<HclListItemDescription>

ARN for KMS Key to use for envelope encryption of Kubernetes Secrets. By default Secrets in EKS are encrypted at rest using shared AWS managed keys. Setting this variable will configure Kubernetes to encrypt Secrets using this KMS key. Can only be used on clusters created after 2020-03-05.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="security_group_name" requirement="optional" type="string">
<HclListItemDescription>

The name of the Security Group to create for the EKS Cluster.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="should_create_cloudwatch_log_group" requirement="optional" type="bool">
<HclListItemDescription>

When true, precreate the CloudWatch Log Group to use for EKS control plane logging. This is useful if you wish to customize the CloudWatch Log Group with various settings such as retention periods and KMS encryption. When false, EKS will automatically create a basic log group to use. Note that logs are only streamed to this group if <a href="#enabled_cluster_log_types"><code>enabled_cluster_log_types</code></a> is true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="support_type" requirement="optional" type="string">
<HclListItemDescription>

Support type to use for the cluster. If the cluster is set to EXTENDED, it will enter extended support at the end of standard support. If the cluster is set to STANDARD, it will be automatically upgraded at the end of standard support. Valid values are EXTENDED, STANDARD

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="upgrade_cluster_script_skip_coredns" requirement="optional" type="bool">
<HclListItemDescription>

When set to true, the sync-core-components command will skip updating coredns. This variable is ignored if `use_upgrade_cluster_script` is false.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="upgrade_cluster_script_skip_kube_proxy" requirement="optional" type="bool">
<HclListItemDescription>

When set to true, the sync-core-components command will skip updating kube-proxy. This variable is ignored if `use_upgrade_cluster_script` is false.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="upgrade_cluster_script_skip_vpc_cni" requirement="optional" type="bool">
<HclListItemDescription>

When set to true, the sync-core-components command will skip updating aws-vpc-cni. This variable is ignored if `use_upgrade_cluster_script` is false.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="upgrade_cluster_script_wait_for_rollout" requirement="optional" type="bool">
<HclListItemDescription>

When set to true, the sync-core-components command will wait until the new versions are rolled out in the cluster. This variable is ignored if `use_upgrade_cluster_script` is false.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="use_cleanup_cluster_script" requirement="optional" type="bool">
<HclListItemDescription>

When set to true, this will enable the kubergrunt eks cleanup-security-group command using a local-exec provisioner. This script ensures that no known residual resources managed by EKS is left behind after the cluster has been deleted.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="use_kubergrunt_verification" requirement="optional" type="bool">
<HclListItemDescription>

When set to true, this will enable kubergrunt verification to wait for the Kubernetes API server to come up before completing. If false, reverts to a 30 second timed wait instead.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="use_managed_iam_policies" requirement="optional" type="bool">
<HclListItemDescription>

When true, all IAM policies will be managed as dedicated policies rather than inline policies attached to the IAM roles. Dedicated managed policies are friendlier to automated policy checkers, which may scan a single resource for findings. As such, it is important to avoid inline policies when targeting compliance with various security standards.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="use_upgrade_cluster_script" requirement="optional" type="bool">
<HclListItemDescription>

When set to true, this will enable the kubergrunt eks sync-core-components command using a local-exec provisioner. This script ensures that the Kubernetes core components are upgraded to a matching version everytime the cluster's Kubernetes version is updated.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="use_vpc_cni_customize_script" requirement="optional" type="bool">
<HclListItemDescription>

When set to true, this will enable management of the aws-vpc-cni configuration options using kubergrunt running as a local-exec provisioner. If you set this to false, the vpc_cni_* variables will be ignored.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="vpc_cni_enable_prefix_delegation" requirement="optional" type="bool">
<HclListItemDescription>

When true, enable prefix delegation mode for the AWS VPC CNI component of the EKS cluster. In prefix delegation mode, each ENI will be allocated 16 IP addresses (/28) instead of 1, allowing you to pack more Pods per node. Note that by default, AWS VPC CNI will always preallocate 1 full prefix - this means that you can potentially take up 32 IP addresses from the VPC network space even if you only have 1 Pod on the node. You can tweak this behavior by configuring the <a href="#vpc_cni_warm_ip_target"><code>vpc_cni_warm_ip_target</code></a> input variable.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="vpc_cni_minimum_ip_target" requirement="optional" type="number">
<HclListItemDescription>

The minimum number of IP addresses (free and used) each node should start with. When null, defaults to the aws-vpc-cni application setting (currently 16 as of version 1.9.0). For example, if this is set to 25, every node will allocate 2 prefixes (32 IP addresses). On the other hand, if this was set to the default value, then each node will allocate only 1 prefix (16 IP addresses).

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="vpc_cni_warm_ip_target" requirement="optional" type="number">
<HclListItemDescription>

The number of free IP addresses each node should maintain. When null, defaults to the aws-vpc-cni application setting (currently 16 as of version 1.9.0). In prefix delegation mode, determines whether the node will preallocate another full prefix. For example, if this is set to 5 and a node is currently has 9 Pods scheduled, then the node will NOT preallocate a new prefix block of 16 IP addresses. On the other hand, if this was set to the default value, then the node will allocate a new block when the first pod is scheduled.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="vpc_worker_subnet_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of the subnets into which the EKS Cluster's administrative pods will be launched. These should usually be all private subnets and include one in each AWS Availability Zone. Required when <a href="#schedule_control_plane_services"><code>schedule_control_plane_services</code></a> is true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="ebs_csi_addon_arn">
<HclListItemDescription>

The ARN of the EBS CSI AddOn.

</HclListItemDescription>
</HclListItem>

<HclListItem name="ebs_csi_addon_current_version">
<HclListItemDescription>

The current version of the EBS CSI AddOn.

</HclListItemDescription>
</HclListItem>

<HclListItem name="ebs_csi_addon_latest_version">
<HclListItemDescription>

The latest available version of the EBS CSI AddOn.

</HclListItemDescription>
</HclListItem>

<HclListItem name="eks_auto_mode_iam_role_arn">
<HclListItemDescription>

AWS ARN identifier of the IAM role created for the EKS Auto Mode Nodes.

</HclListItemDescription>
</HclListItem>

<HclListItem name="eks_auto_mode_iam_role_name">
<HclListItemDescription>

Name of the IAM role created for the EKS Auto Mode Nodes.

</HclListItemDescription>
</HclListItem>

<HclListItem name="eks_cluster_addons">
<HclListItemDescription>

Map of attribute maps for enabled EKS cluster addons

</HclListItemDescription>
</HclListItem>

<HclListItem name="eks_cluster_arn">
<HclListItemDescription>

AWS ARN identifier of the EKS cluster resource that is created.

</HclListItemDescription>
</HclListItem>

<HclListItem name="eks_cluster_certificate_authority">
<HclListItemDescription>

Certificate authority of the Kubernetes control plane provided by EKS encoded in base64.

</HclListItemDescription>
</HclListItem>

<HclListItem name="eks_cluster_endpoint">
<HclListItemDescription>

URL endpoint of the Kubernetes control plane provided by EKS.

</HclListItemDescription>
</HclListItem>

<HclListItem name="eks_cluster_managed_security_group_id">
<HclListItemDescription>

The ID of the EKS Cluster Security Group, which is automatically attached to managed workers.

</HclListItemDescription>
</HclListItem>

<HclListItem name="eks_cluster_name">
<HclListItemDescription>

Short hand name of the EKS cluster resource that is created.

</HclListItemDescription>
</HclListItem>

<HclListItem name="eks_control_plane_iam_role_arn">
<HclListItemDescription>

AWS ARN identifier of the IAM role created for the EKS Control Plane nodes.

</HclListItemDescription>
</HclListItem>

<HclListItem name="eks_control_plane_iam_role_name">
<HclListItemDescription>

Name of the IAM role created for the EKS Control Plane nodes.

</HclListItemDescription>
</HclListItem>

<HclListItem name="eks_control_plane_security_group_id">
<HclListItemDescription>

AWS ID of the security group created for the EKS Control Plane nodes.

</HclListItemDescription>
</HclListItem>

<HclListItem name="eks_default_fargate_execution_role_arn">
<HclListItemDescription>

A basic IAM Role ARN that has the minimal permissions to pull images from ECR that can be used for most Pods as Fargate Execution Role that do not need to interact with AWS.

</HclListItemDescription>
</HclListItem>

<HclListItem name="eks_default_fargate_execution_role_arn_without_dependency">
<HclListItemDescription>

Same as eks_default_fargate_execution_role_arn, except it does not depend on the Fargate Profile. You can use this instead of the one with the dependency if you are using fargate_profile_dependencies to control the creation of Fargate Profiles.

</HclListItemDescription>
</HclListItem>

<HclListItem name="eks_iam_openid_connect_provider_arn">
<HclListItemDescription>

ARN of the OpenID Connect Provider that can be used to attach AWS IAM Roles to Kubernetes Service Accounts.

</HclListItemDescription>
</HclListItem>

<HclListItem name="eks_iam_openid_connect_provider_issuer_url">
<HclListItemDescription>

The issue URL of the OpenID Connect Provider.

</HclListItemDescription>
</HclListItem>

<HclListItem name="eks_iam_openid_connect_provider_url">
<HclListItemDescription>

URL of the OpenID Connect Provider that can be used to attach AWS IAM Roles to Kubernetes Service Accounts.

</HclListItemDescription>
</HclListItem>

<HclListItem name="eks_kubeconfig">
<HclListItemDescription>

Minimal configuration for kubectl to authenticate with the created EKS cluster.

</HclListItemDescription>
</HclListItem>

<HclListItem name="eks_kubeconfig_context_name">
<HclListItemDescription>

The name of the kubectl config context that was used to setup authentication to the EKS control plane.

</HclListItemDescription>
</HclListItem>

<HclListItem name="eks_service_ipv4_cidr">
<HclListItemDescription>

The IPv4 CIDR block that Kubernetes pod and service IP addresses are assigned from if cluster was created with ipv4 as cluster_network_config_ip_family.

</HclListItemDescription>
</HclListItem>

<HclListItem name="kubergrunt_path">
<HclListItemDescription>

The path to the kubergrunt binary, if in use.

</HclListItemDescription>
</HclListItem>

</TabItem>
</Tabs>

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-eks/tree/v0.75.0/modules/eks-cluster-control-plane/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-eks/tree/v0.75.0/modules/eks-cluster-control-plane/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-eks/tree/v0.75.0/modules/eks-cluster-control-plane/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "fbfec8c13e642dec85079b898836c615"
}
##DOCS-SOURCER-END -->

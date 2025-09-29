---
title: "EKS K8S Role Mapping Module"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Amazon EKS" version="2.1.0" lastModifiedVersion="0.64.3"/>

# EKS K8S Role Mapping Module

<a href="https://github.com/gruntwork-io/terraform-aws-eks/tree/v2.1.0/modules/eks-k8s-role-mapping" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.64.3" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

**NOTE: This module manages a single ConfigMap to use with Kubernetes AWS IAM authentication. If you wish to break up
the ConfigMap across multiple smaller ConfigMaps to manage entries in isolated modules (e.g., when you add a new IAM
role in a separate module from the EKS cluster), refer to the [eks-aws-auth-merger](https://github.com/gruntwork-io/terraform-aws-eks/tree/v2.1.0/modules/eks-aws-auth-merger).**

This Module can be used to manage the mapping of AWS IAM roles and users to Kubernetes RBAC groups for finer grained
access control of your EKS Cluster.

This Module only manages the mapping between IAM roles and Kubernetes RBAC groups. This Module does not create, modify,
or configure either roles. We recommend managing them in a separate Terraform template in the context of your needs,
that are then provided as inputs to this module.

## What is Kubernetes Role Based Access Control (RBAC)?

[Role Based Access Control (RBAC)](https://kubernetes.io/docs/reference/access-authn-authz/rbac/) is a method to regulate
access to resources based on the role that individual users assume in an organization. Kubernetes allows you to define
roles in the system that individual users inherit, and explicitly grant permissions to resources within the system to
those roles. The Control Plane will then honor those permissions when accessing the resources on Kubernetes on behalf of
clients such as `kubectl`. When combined with namespaces, you can implement sophisticated control schemes that limit the
access of resources across the roles in your organization.

The RBAC system is managed using `ClusterRole` and `ClusterRoleBinding` resources (or `Role` and `RoleBinding` resources
if restricting to a single namespace). The `ClusterRole` (or `Role`) object defines a role in the Kubernetes system that
has explicit permissions on what it can and cannot do. These roles are then bound to users and groups using the
`ClusterRoleBinding` (or `RoleBinding`) resource. An important thing to note here is that you do not explicitly create
users and groups using RBAC, and instead rely on the authentication system to implicitly create these entities.

You can refer to [the example scenarios](#examples) below for an example of this in action.

Refer to [the official documentation](https://kubernetes.io/docs/reference/access-authn-authz/rbac/) for more
information.

## What is an AWS IAM role?

[AWS IAM role](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles.html) is AWS's implementation of RBAC. Users
and clients authenticate to AWS to assume an IAM role, that has a set of permissions that grant or deny access to
various resources within AWS. Unlike users, IAM roles do not have long standing credentials associated with them.
Instead, a user uses the AWS API to assume a role, which will issue temporary credentials that can be used to access the
AWS resources as the assumed role. Like the roles in the Kubernetes RBAC implementation, you can configure the roles to have
as much or as little permissions as necessary when accessing resources in the AWS system.

This Module provides code for you to manage the mapping between AWS IAM roles and Kubernetes RBAC roles so that you can
maintain a consistent set of mappings between the two systems. This works hand in hand with the [EKS authentication
system](https://github.com/gruntwork-io/terraform-aws-eks/tree/v2.1.0/core-concepts.md#how-do-i-authenticate-kubectl-to-the-eks-cluster), providing the information to Kubernetes to resolve the user to the right RBAC group based on the provided IAM role credentials.

## Examples

### Restricting specific actions

Suppose that you are setting up your EKS cluster for your organization that has an ops team and a dev team. Suppose
further that your organization would like to restrict access to your dev team so that they can only list and update
existing Pods, but can not create new ones, while the ops team is able to manage all resources in your Kubernetes
cluster.

To support this, we need to first define the roles in Kubernetes that map to the explicit permissions granted to each
team. For the ops team in Kubernetes, since we want to grant them admin level privileges on the cluster, we can use the
default `system:admin` group that will already obtain those permissions. For the `dev` group however, there is no
default group and role that fits our needs, so we need to define a new `ClusterRole` and bind it to the `dev` group. To do
this, we will first define the `ClusterRole` resource using the RBAC API:

```yaml
# dev-role.yml
kind: ClusterRole
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  name: dev
rules:
- apiGroups: [""]
  resources: ["pods"]
  verbs: ["get", "list", "update"]
```

This creates a new role `dev` that allows the role to get, list, and update Pods in any namespace in the cluster. We can
apply this on the cluster using `kubectl`:

```
kubectl apply -f dev-role.yml
```

We then need to bind this to the `dev` group using a `ClusterRoleMapping` resource:

```yaml
# dev-role-binding.yml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: bind-dev
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: dev
subjects:
- kind: Group
  name: dev
  apiGroup: rbac.authorization.k8s.io
```

This config binds the `ClusterRole` named `dev` to the `Group` named `dev`. Like the `ClusterRole` config, we can apply
this on the cluster using `kubectl`:

```
kubectl apply -f dev-role-binding.yml
```

Now that we have the two roles and bindings in the system, we need some way for users in the ops and dev teams to inherit
the roles. This is done implicitly by mapping their authentication credentials to their respective groups. In EKS,
authentication is handled by IAM, which means that we need to tell Kubernetes to map their IAM credentials to their
respective groups. We will use this Module to do exactly that.

This Module takes as input a mapping between IAM roles and RBAC groups as part of the `iam_role_to_rbac_group_mapping`
input variable. In this example, we will assume that members of the ops team access the cluster by assuming the `ops`
IAM role and members of the dev team access the cluster by assuming the `dev` IAM role, so we will map these to their
respective groups in Kubernetes:

```hcl
module "eks_k8s_role_mapping" {
    eks_worker_iam_role_arn = "arn.aws.iam::5555555555:role/eks-worker"

    iam_role_to_rbac_group_mappings = "${
        map(
            "arn:aws:iam::555555555555:role/dev", list("dev"),
            "arn:aws:iam::555555555555:role/ops", list("system:admin"),
        )
    }"
}
```

When you `terraform apply` the above code, the Module will configure Kubernetes to resolve the provided AWS IAM roles to
the specified RBAC groups when fulfilling client requests. In this case, any `kubectl` authentications using the `dev`
IAM role will resolve to the `dev` Kubernetes RBAC group, while any authentications using the `ops` IAM role will resolve
to the `system:admin` Kubernetes RBAC group. The `dev` team will then implicitly inherit the `dev` `ClusterRole` based
on the `ClusterRoleBinding` that binds that role to the `dev` group.

**Important**: Note that we did not need to define the `dev` group explicitly in Kubernetes. This is automatically
handled by the authentication system. In Kubernetes, the group is implicitly defined as part of defining a user entity
that can map to it. As such, it is important to take care to avoid typos here to ensure that the string you use for the
group here matches any groups referenced in the role bindings.

### Restricting by namespace

In this example, suppose that you are setting up a dev EKS cluster for your dev team that is organized into multiple
subteams working on different products. In this scenario, you want to give members of the dev team full access to deploy
and manage their applications, including deleting resources. However, you may want to implement controls so that teams
can only manage their own resources, and not others' resources.

To support this, you would use [Kubernetes
namespaces](https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/) to partition your Kubernetes
cluster. Namespaces allow you to divide your resources into logical groups on the cluster. By utilizing namespaces, you
can grant teams full access to resources launched in their own namespace, but restrict access to resources in other
namespaces.

To implement this on your EKS cluster, you would first need to create namespaces for each team. For this example, we
will assume there are two dev teams in the organization: `api` and `backend`. So we will create a namespace for each
team:

```yaml
# namespaces.yml
---
kind: Namespace
apiVersion: v1
metadata:
  name: apiteam
  labels:
    name: apiteam
---
kind: Namespace
apiVersion: v1
metadata:
  name: backendteam
  labels:
    name: backendteam
```

This will create two namespaces: one named `apiteam` and one named `backendteam`. We can apply this on the cluster using
`kubectl`:

```
kubectl apply -f namespaces.yml
```

Next, we need to create RBAC roles in Kubernetes that grant access to each of the namespaces, but not others. To do this
we will rely on the `Role` resource, instead of the `ClusterRole` resource because we want to scope the permissions to a
particular namespace:

```yaml
# roles.yml
---
kind: Role
apiVersion: rbac.authorization.k8s.io/v1beta1
metadata:
  name: apiteam-full-access
  namespace: apiteam
rules:
- apiGroups: ["", "extensions", "apps"]
  resources: ["*"]
  verbs: ["*"]
---
kind: Role
apiVersion: rbac.authorization.k8s.io/v1beta1
metadata:
  name: backendteam-full-access
  namespace: backendteam
rules:
- apiGroups: ["", "extensions", "apps"]
  resources: ["*"]
  verbs: ["*"]
```

This will create two roles in the Kubernetes cluster: `apiteam-full-access` and `backendteam-full-access`, each giving
full access to all resources in the respective namespaces. Like the YAML file for the namespaces, you can apply this on
the cluster using `kubectl`:

```
kubectl apply -f roles.yml
```

To allow authenticating entities to be able to inherit these roles, we need to map these to a group. We can do that by
defining `RoleBinding` resources:

```
# role-bindings.yml
---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: bind-apiteam
  namespace: apiteam
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: Role
  name: apiteam-full-access
subjects:
- kind: Group
  name: apiteam
  apiGroup: rbac.authorization.k8s.io
---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: bind-backendteam
  namespace: backendteam
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: Role
  name: backendteam-full-access
subjects:
- kind: Group
  name: backendteam
  apiGroup: rbac.authorization.k8s.io
```

These two resources bind the `apiteam` to the `apiteam-full-access` role and the `backendteam` to the
`backendteam-full-access` role so that any client that maps to those groups will inherit the right permissions. We can
apply this to the cluster using `kubectl`:

```
kubectl apply -f role-bindings.yml
```

Now that we have the namespaces, the roles, and the bindings in the system, we need to create the AWS IAM roles that map
to each team and tell Kubernetes to map the AWS IAM role to the proper RBAC role when authenticating the client. We will
assume that the IAM roles already exist (named `ApiDeveloper` and `BackendDeveloper`). To map the IAM roles to the RBAC
groups, we will use this Module. This Module takes as input a mapping between IAM roles and RBAC roles as part of the
`iam_role_to_rbac_group_mapping` input variable:

```hcl
module "eks_k8s_role_mapping" {
    eks_worker_iam_role_arn = "arn.aws.iam::5555555555:role/eks-worker"

    iam_role_to_rbac_group_mappings = "${
        map(
            "arn:aws:iam::555555555555:role/ApiDeveloper", list("apiteam"),
            "arn:aws:iam::555555555555:role/BackendDeveloper", list("backendteam"),
        )
    }"
}
```

When you `terraform apply` the above code, the Module will configure Kubernetes to resolve the provided AWS IAM roles to
the specified RBAC groups when fulfilling client requests. In this case, any `kubectl` authentications using the
`ApiDeveloper` IAM role will resolve to the `apiteam` Kubernetes RBAC group, while any authentications using the
`BackendDeveloper` IAM role will resolve to the `backendteam` Kubernetes RBAC group. In this way, the
developers who authenticate as `ApiDeveloper` will only be able to access the `apiteam` namespace in the Kubernetes
cluster, while the developers who authenticate as `BackendDeveloper` will only be able to access the `backendteam`
namespace.

**Important**: Note that we did not need to define the `apiteam` and `backendteam` group explicitly in Kubernetes. This
is automatically handled by the authentication system. In Kubernetes, the group is implicitly defined as part of
defining a user entity that can map to it. As such, it is important to take care to avoid typos here to ensure that the
string you use for the group here matches any groups referenced in the role bindings.

## Why not use a Helm Chart?

This Module cannot be implemented as a helm chart due to the functionality of the ConfigMap being generated here. In
EKS, the worker nodes also use an IAM role to authenticate against the EKS Control Plane. As such, the worker nodes rely
on the mapping from the `aws-auth` ConfigMap generated by this module to be able to successfully register to the EKS
cluster as a worker node.

To use Helm, the Kubernetes cluster must be running the Tiller (Helm Server) Pods on the cluster. However, to run the
Tiller Pods, the cluster must have worker nodes online and available. As such, we have a chicken and egg situation,
where to use Helm we need to have worker nodes, which need the `aws-auth` ConfigMap, which needs Helm.

To avoid this cyclic dependency, we implement this module using the `kubernetes` provider which will use `kubectl` under
the hood. The cluster requirement for a working `kubectl` is the EKS control plane, which will be available without the
ConfigMap and as such does not have the cyclic dependency problem of Helm.

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S EKS-K8S-ROLE-MAPPING MODULE
# ------------------------------------------------------------------------------------------------------

module "eks_k_8_s_role_mapping" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-eks.git//modules/eks-k8s-role-mapping?ref=v2.1.0"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # List of AWS ARNs of the IAM roles associated with the EKS worker nodes. Each
  # IAM role passed in will be set up as a Node role in Kubernetes.
  eks_worker_iam_role_arns = <list(string)>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Map of string keys and values that can be used to tag the ConfigMap resource
  # that holds the mapping information.
  config_map_labels = {}

  # List of AWS ARNs of the IAM roles associated with launching fargate pods.
  # Each IAM role passed in will be set up as a Node role in Kubernetes.
  eks_fargate_profile_executor_iam_role_arns = []

  # Mapping of AWS IAM roles to RBAC groups, where the keys are AWS ARN of IAM
  # roles and values are the mapped k8s RBAC group names as a list.
  iam_role_to_rbac_group_mappings = {}

  # Mapping of AWS IAM roles assumed via SSO (IAM Identity Center) to RBAC
  # groups, where the keys are AWS ARN of IAM role and values are the mapped k8s
  # RBAC group names as a list.
  iam_sso_role_to_rbac_group_mappings = {}

  # Mapping of AWS IAM users to RBAC groups, where the keys are AWS ARN of IAM
  # users and values are the mapped k8s RBAC group names as a list.
  iam_user_to_rbac_group_mappings = {}

  # Name to apply to the ConfigMap that is created. Note that this must be
  # called aws-auth, unless you are using the aws-auth-merger.
  name = "aws-auth"

  # Namespace to create the ConfigMap in. Note that this must be kube-system,
  # unless you are using the aws-auth-merger.
  namespace = "kube-system"

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S EKS-K8S-ROLE-MAPPING MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-eks.git//modules/eks-k8s-role-mapping?ref=v2.1.0"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # List of AWS ARNs of the IAM roles associated with the EKS worker nodes. Each
  # IAM role passed in will be set up as a Node role in Kubernetes.
  eks_worker_iam_role_arns = <list(string)>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Map of string keys and values that can be used to tag the ConfigMap resource
  # that holds the mapping information.
  config_map_labels = {}

  # List of AWS ARNs of the IAM roles associated with launching fargate pods.
  # Each IAM role passed in will be set up as a Node role in Kubernetes.
  eks_fargate_profile_executor_iam_role_arns = []

  # Mapping of AWS IAM roles to RBAC groups, where the keys are AWS ARN of IAM
  # roles and values are the mapped k8s RBAC group names as a list.
  iam_role_to_rbac_group_mappings = {}

  # Mapping of AWS IAM roles assumed via SSO (IAM Identity Center) to RBAC
  # groups, where the keys are AWS ARN of IAM role and values are the mapped k8s
  # RBAC group names as a list.
  iam_sso_role_to_rbac_group_mappings = {}

  # Mapping of AWS IAM users to RBAC groups, where the keys are AWS ARN of IAM
  # users and values are the mapped k8s RBAC group names as a list.
  iam_user_to_rbac_group_mappings = {}

  # Name to apply to the ConfigMap that is created. Note that this must be
  # called aws-auth, unless you are using the aws-auth-merger.
  name = "aws-auth"

  # Namespace to create the ConfigMap in. Note that this must be kube-system,
  # unless you are using the aws-auth-merger.
  namespace = "kube-system"

}


```

</TabItem>
</Tabs>




## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Required

<HclListItem name="eks_worker_iam_role_arns" requirement="required" type="list(string)">
<HclListItemDescription>

List of AWS ARNs of the IAM roles associated with the EKS worker nodes. Each IAM role passed in will be set up as a Node role in Kubernetes.

</HclListItemDescription>
</HclListItem>

### Optional

<HclListItem name="config_map_labels" requirement="optional" type="map(string)">
<HclListItemDescription>

Map of string keys and values that can be used to tag the ConfigMap resource that holds the mapping information.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="eks_fargate_profile_executor_iam_role_arns" requirement="optional" type="list(string)">
<HclListItemDescription>

List of AWS ARNs of the IAM roles associated with launching fargate pods. Each IAM role passed in will be set up as a Node role in Kubernetes.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="iam_role_to_rbac_group_mappings" requirement="optional" type="map(list(…))">
<HclListItemDescription>

Mapping of AWS IAM roles to RBAC groups, where the keys are AWS ARN of IAM roles and values are the mapped k8s RBAC group names as a list.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
map(list(string))
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="iam_sso_role_to_rbac_group_mappings" requirement="optional" type="map(list(…))">
<HclListItemDescription>

Mapping of AWS IAM roles assumed via SSO (IAM Identity Center) to RBAC groups, where the keys are AWS ARN of IAM role and values are the mapped k8s RBAC group names as a list.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
map(list(string))
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="iam_user_to_rbac_group_mappings" requirement="optional" type="map(list(…))">
<HclListItemDescription>

Mapping of AWS IAM users to RBAC groups, where the keys are AWS ARN of IAM users and values are the mapped k8s RBAC group names as a list.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
map(list(string))
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="name" requirement="optional" type="string">
<HclListItemDescription>

Name to apply to the ConfigMap that is created. Note that this must be called aws-auth, unless you are using the aws-auth-merger.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;aws-auth&quot;"/>
</HclListItem>

<HclListItem name="namespace" requirement="optional" type="string">
<HclListItemDescription>

Namespace to create the ConfigMap in. Note that this must be kube-system, unless you are using the aws-auth-merger.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;kube-system&quot;"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="aws_auth_config_map_name">
<HclListItemDescription>

The name of the ConfigMap created to store the mapping. This exists so that downstream resources can depend on the mapping being setup.

</HclListItemDescription>
</HclListItem>

</TabItem>
</Tabs>

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-eks/tree/v2.1.0/modules/eks-k8s-role-mapping/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-eks/tree/v2.1.0/modules/eks-k8s-role-mapping/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-eks/tree/v2.1.0/modules/eks-k8s-role-mapping/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "dd57396fbcb9b94d3a9ac38e5c7cad7a"
}
##DOCS-SOURCER-END -->

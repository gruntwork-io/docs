# Configure role mapping

When you deploy the `eks-cluster` module later in this guide, it’ll give your IAM user or IAM role (whatever you’re
authenticated as) admin permissions in the cluster. You can use these admin permissions to configure permissions for
the other IAM users and roles on your team using the
[eks-k8s-role-mapping module](https://github.com/gruntwork-io/terraform-aws-eks/tree/master/modules/eks-k8s-role-mapping)
in `terraform-aws-eks`:

```hcl title=infrastructure-modules/services/eks-cluster/main.tf
module "eks_k8s_role_mapping" {
  # Make sure to replace <VERSION> in this URL with the latest terraform-aws-eks release
  source = "git::git@github.com:gruntwork-io/terraform-aws-eks.git//modules/eks-k8s-role-mapping?ref=<VERSION>"

  # This will configure the worker nodes' IAM role to have access to the system:node Kubernetes role
  eks_worker_iam_role_arns = [module.eks_workers.eks_worker_iam_role_arn]

  # The IAM role to Kubernetes role mappings are passed in via a variable
  iam_role_to_rbac_group_mappings = var.iam_role_to_rbac_group_mappings

  config_map_labels = {
    eks-cluster = module.eks_cluster.eks_cluster_name
  }
}
```

And here’s the corresponding input variable:

```hcl title=infrastructure-modules/services/eks-cluster/variables.tf
variable "iam_role_to_rbac_group_mappings" {
  description = "Mapping of AWS IAM roles to RBAC groups, where the keys are the AWS ARN of IAM roles and the values are the mapped k8s RBAC group names as a list."
  type        = map(list(string))
  default     = {}
}
```

This variable allows you to map different IAM role ARNs in different environments to various Kubernetes roles. You’ll
see an example of this later in the guide.

:::info

The `eks-k8s-role-mapping` module uses the Kubernetes provider to talk to your Kubernetes cluster directly
from Terraform. That means that (a) you can only apply this code from within your VPC and/or when connected via VPN and
(b) you have to configure the Kubernetes provider. The latter requires a little bit of hackery due to Terraform
limitations:

:::

```hcl title=infrastructure-modules/services/eks-cluster/main.tf
provider "kubernetes" {
  version = "~> 1.6"

  load_config_file       = false
  host                   = data.template_file.kubernetes_cluster_endpoint.rendered
  cluster_ca_certificate = base64decode(data.template_file.kubernetes_cluster_ca.rendered)
  token                  = data.aws_eks_cluster_auth.kubernetes_token.token
}

# Workaround for Terraform limitation where you cannot directly set a depends on directive or interpolate from resources
# in the provider config.
# Specifically, Terraform requires all information for the Terraform provider config to be available at plan time,
# meaning there can be no computed resources. We work around this limitation by creating a template_file data source
# that does the computation.
# See https://github.com/hashicorp/terraform/issues/2430 for more details
data "template_file" "kubernetes_cluster_endpoint" {
  template = module.eks_cluster.eks_cluster_endpoint
}

data "template_file" "kubernetes_cluster_ca" {
  template = module.eks_cluster.eks_cluster_certificate_authority
}

data "aws_eks_cluster_auth" "kubernetes_token" {
  name = module.eks_cluster.eks_cluster_name
}
```


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Local File Copier","hash":"b38a1e8d5a91d55332bd4b3507773920"}
##DOCS-SOURCER-END -->

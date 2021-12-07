## Configure the worker nodes

The next step is to configure the worker nodes in the `eks-cluster` module. You can use an Auto Scaling Group to run
the worker nodes using the
[eks-cluster-workers](https://github.com/gruntwork-io/terraform-aws-eks/tree/master/modules/eks-cluster-workers) module
in `terraform-aws-eks`:

**infrastructure-modules/services/eks-cluster/main.tf**

```hcl
module "eks_workers" {
  # Make sure to replace <VERSION> in this URL with the latest terraform-aws-eks release
  source = "git::git@github.com:gruntwork-io/terraform-aws-eks.git//modules/eks-cluster-workers?ref=<VERSION>"

  name_prefix  = "app-workers-"
  cluster_name = var.cluster_name

  vpc_id                = data.terraform_remote_state.vpc.outputs.vpc_id
  vpc_worker_subnet_ids = data.terraform_remote_state.vpc.outputs.private_app_subnet_ids

  eks_master_security_group_id = module.eks_cluster.eks_master_security_group_id

  cluster_min_size = var.cluster_min_size
  cluster_max_size = var.cluster_max_size

  cluster_instance_ami          = var.cluster_instance_ami
  cluster_instance_type         = var.cluster_instance_type
  cluster_instance_keypair_name = var.cluster_instance_keypair_name
  cluster_instance_user_data    = data.template_file.user_data.rendered
}
```

The code above does the following:

- Deploy the worker nodes into the same private app subnets as the EKS cluster.

- Pass in the EKS control plane security group ID to the `eks_master_security_group_id`. The `eks-cluster-workers`
  module will use this to open up the proper ports in the control plane and worker node security groups so they can
  talk to each other.

- Use variables for most of the other worker node settings: e.g., min number of nodes, max number of nodes, AMI to run,
  instance type to run, and so on. This allows you to use different settings for the worker nodes in different
  environments.

- Sets the worker nodes to run a User Data script rendered from a `template_file` data source. You’ll see what this
  `template_file` data source looks like a little later.

Add the corresponding input variables to `variables.tf`:

**infrastructure-modules/services/eks-cluster/variables.tf**

```hcl
variable "cluster_min_size" {
  description = "The minimum number of instances to run in the EKS cluster"
  type        = number
}

variable "cluster_max_size" {
  description = "The maximum number of instances to run in the EKS cluster"
  type        = number
}

variable "cluster_instance_type" {
  description = "The type of instances to run in the EKS cluster (e.g. t2.medium)"
  type        = string
}

variable "cluster_instance_ami" {
  description = "The AMI to run on each instance in the EKS cluster. You can build the AMI using the Packer template under packer/build.json."
  type        = string
}

variable "cluster_instance_keypair_name" {
  description = "The name of the Key Pair that can be used to SSH to each instance in the EKS cluster"
  type        = string
}
```



<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Service Catalog Reference","hash":"f7084c319dd95e8ec68cd41859dd1048"}
##DOCS-SOURCER-END -->

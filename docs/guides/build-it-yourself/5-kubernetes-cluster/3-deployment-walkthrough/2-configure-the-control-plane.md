# Configure the control plane

Now that you have the VPC ready, it’s time to configure the EKS control plane using the
[eks-cluster-control-plane module](https://github.com/gruntwork-io/terraform-aws-eks/tree/master/modules/eks-cluster-control-plane)
in `terraform-aws-eks`. Create a new module called `eks-cluster` in \`infrastructure-modules:

```bash
infrastructure-modules
  └ networking
    └ vpc-mgmt
    └ vpc-app
  └ services
    └ eks-cluster
      └ main.tf
      └ dependencies.tf
      └ outputs.tf
      └ variables.tf
```

Inside of `main.tf`, configure your AWS provider and Terraform settings:

```hcl title=infrastructure-modules/services/eks-cluster/main.tf
provider "aws" {
  # The AWS region in which all resources will be created
  region = var.aws_region

  # Require a 2.x version of the AWS provider
  version = "~> 2.6"

  # Only these AWS Account IDs may be operated on by this template
  allowed_account_ids = [var.aws_account_id]
}

terraform {
  # The configuration for this backend will be filled in by Terragrunt or via a backend.hcl file. See
  # https://www.terraform.io/docs/backends/config.html#partial-configuration
  backend "s3" {}

  # Only allow this Terraform version. Note that if you upgrade to a newer version, Terraform won't allow you to use an
  # older version, so when you upgrade, you should upgrade everyone on your team and your CI servers all at once.
  required_version = "= 0.12.6"
}
```

Next, use the `eks-cluster-control-plane` module to configure the EKS control plane:

```hcl title=infrastructure-modules/services/eks-cluster/main.tf
module "eks_cluster" {
  # Make sure to replace <VERSION> in this URL with the latest terraform-aws-eks release
  source = "git::git@github.com:gruntwork-io/terraform-aws-eks.git//modules/eks-cluster-control-plane?ref=<VERSION>"

  cluster_name = var.cluster_name

  vpc_id                = data.terraform_remote_state.vpc.outputs.vpc_id
  vpc_master_subnet_ids = data.terraform_remote_state.vpc.outputs.private_app_subnet_ids

  enabled_cluster_log_types = ["api", "audit", "authenticator"]
  kubernetes_version        = 1.13
  endpoint_public_access    = false
}
```

The code above does the following:

- Fetch information about the app VPC you just deployed using the
  [terraform_remote_state data source](https://www.terraform.io/docs/providers/terraform/d/remote_state.html). You’ll see
  the code for this shortly.

- Configure the control plane to run in the private app subnets of that VPC.

- Configure the API server logs, audit logs, and authenticator logs for the control plane to be sent to CloudWatch.

- Set the Kubernetes version to 1.13.

- Disable public access so that the Kubernetes API server is only accessible from within the VPC.

:::info

This means you MUST be in the VPC network—e.g., connected via a VPN—to access your EKS cluster.

:::

Add the `terraform_remote_state` data source to fetch the app VPC info to `dependencies.tf`:

```hcl title=infrastructure-modules/services/eks-cluster/dependencies.tf
data "terraform_remote_state" "vpc" {
  backend = "s3"
  config = {
    region = var.terraform_state_aws_region
    bucket = var.terraform_state_s3_bucket
    key    = "${var.aws_region}/${var.vpc_name}/vpc/terraform.tfstate"
  }
}
```

And add the corresponding input variables for this code to `variables.tf`:

```hcl title=infrastructure-modules/services/eks-cluster/variables.tf
variable "aws_region" {
  description = "The AWS region in which all resources will be created"
  type        = string
}

variable "aws_account_id" {
  description = "The ID of the AWS Account in which to create resources."
  type        = string
}

variable "cluster_name" {
  description = "The name of the EKS cluster"
  type        = string
}

variable "vpc_name" {
  description = "The name of the VPC in which to run the EKS cluster (e.g. stage, prod)"
  type        = string
}

variable "terraform_state_aws_region" {
  description = "The AWS region of the S3 bucket used to store Terraform remote state"
  type        = string
}

variable "terraform_state_s3_bucket" {
  description = "The name of the S3 bucket used to store Terraform remote state"
  type        = string
}
```


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Local File Copier","hash":"c117b6c75e7609d24e95b51029946518"}
##DOCS-SOURCER-END -->

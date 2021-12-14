# Deploy the EKS cluster

Your `eks-cluster` module is nearly complete! The only thing left to do is to add some useful output variables to
`outputs.tf`:

```hcl title=infrastructure-modules/services/eks-cluster/outputs.tf
output "aws_region" {
  value = var.aws_region
}

output "eks_cluster_arn" {
  value = module.eks_cluster.eks_cluster_arn
}

output "eks_cluster_name" {
  value = module.eks_cluster.eks_cluster_name
}

output "eks_cluster_asg_name" {
  value = module.eks_workers.eks_worker_asg_name
}

output "eks_worker_security_group_id" {
  value = module.eks_workers.eks_worker_security_group_id
}

output "eks_worker_iam_role_arn" {
  value = module.eks_workers.eks_worker_iam_role_arn
}

output "eks_worker_iam_role_name" {
  value = module.eks_workers.eks_worker_iam_role_name
}

output "asg_name" {
  value = module.eks_workers.eks_worker_asg_name
}
```

At this point, run manual and automated tests for your code. Once your `eks-cluster` module is working the way you
want, submit a pull request, get your changes merged into the `master` branch, and create a new versioned release by
using a Git tag:

```bash
git tag -a "v0.6.0" -m "Added eks-cluster module"
git push --follow-tags
```

Head over to your `infrastructure-live` repo and create a `terragrunt.hcl` file to deploy your EKS cluster in one of
your environments, such as staging:

```
infrastructure-live
  └ root
  └ security
  └ stage
    └ us-east-2
      └ stage
        └ services
          └ eks-cluster
            └ terragrunt.hcl
  └ dev
  └ prod
  └ shared-services
```

Point the `source` URL in your `terragrunt.hcl` file to your `eks-cluster` module in the `infrastructure-modules`
repo, setting the `ref` param to the version you released earlier:

```hcl title=infrastructure-live/stage/us-east-2/stage/services/eks-cluster/terragrunt.hcl
terraform {
  source = "git@github.com/<YOUR_ORG>/infrastructure-modules.git//services/eks-cluster?ref=v0.6.0"
}
```

Set the variables for the `cloudtrail` module in this environment in the `inputs = { ... }` block of `terragrunt.hcl`:

```hcl title=infrastructure-live/stage/us-east-2/stage/services/eks-cluster/terragrunt.hcl
inputs = {
  cluster_name                  = "eks-stage"
  cluster_instance_keypair_name = "stage-services-us-east-1-v1"

  # Fill in the ID of the AMI you built from your Packer template
  cluster_instance_ami          = "<AMI_ID>"

  # Set the max size to double the min size so the extra capacity can be used to do a zero-downtime deployment of updates
  # to the EKS Cluster Nodes (e.g. when you update the AMI). For docs on how to roll out updates to the cluster, see:
  # https://github.com/gruntwork-io/terraform-aws-eks/tree/master/modules/eks-cluster-workers#how-do-i-roll-out-an-update-to-the-instances
  cluster_min_size      = 3
  cluster_max_size      = 6
  cluster_instance_type = "t2.small"

  # If your IAM users are defined in a separate AWS account (e.g., in a security account), pass in the ARN of an IAM
  # role in that account that ssh-grunt on the worker nodes can assume to look up IAM group membership and public SSH
  # keys
  external_account_ssh_grunt_role_arn = "arn:aws:iam::1111222233333:role/allow-ssh-grunt-access-from-other-accounts"

  # Configure your role mappings
  iam_role_to_rbac_group_mappings = {
    # Give anyone using the full-access IAM role admin permissions
    "arn:aws:iam::444444444444:role/allow-full-access-from-other-accounts" = ["system:masters"]

    # Give anyone using the developers IAM role developer permissions. Kubernetes will automatically create this group
    # if it doesn't exist already, but you're still responsible for binding permissions to it!
    "arn:aws:iam::444444444444:role/allow-dev-access-from-other-accounts" = ["developers"]
  }
}
```

Configure your Terraform backend:

```hcl title=infrastructure-live/stage/us-east-2/stage/services/eks-cluster/terragrunt.hcl
include {
  path = find_in_parent_folders()
}
```

And run `terragrunt apply` to deploy the EKS cluster:

```bash
cd infrastructure-live/stage/us-east-2/stage/services/eks-cluster
terragrunt apply
```

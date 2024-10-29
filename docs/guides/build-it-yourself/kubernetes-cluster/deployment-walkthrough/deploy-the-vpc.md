# Deploy the VPC

The first step is to deploy a VPC. Follow the instructions in
[How to deploy a production-grade VPC on AWS](/guides/build-it-yourself/vpc/) to use
`module-vpc` to create a VPC setup that looks like this:

![A production-grade VPC setup deployed using module-vpc from the Gruntwork Infrastructure as Code Library](/img/guides/build-it-yourself/vpc/vpc-diagram.png)

After following this guide, you should have `vpc-app` wrapper module in your `infrastructure-modules` repo:

```bash
infrastructure-modules
  └ networking
    └ vpc-mgmt
    └ vpc-app
      └ main.tf
      └ outputs.tf
      └ variables.tf
```

Here’s a snippet of what the code in the `vpc-app` wrapper module looks like:

```hcl title=infrastructure-modules/networking/vpc-app/main.tf
module "vpc" {
  # Make sure to replace <VERSION> in this URL with the latest module-vpc release
  source = "git@github.com:gruntwork-io/module-vpc.git//modules/vpc-app?ref=<VERSION>"

  vpc_name         = var.vpc_name
  aws_region       = var.aws_region
  cidr_block       = var.cidr_block
  num_nat_gateways = var.num_nat_gateways
}

# ... (the rest of the code is omitted) ...
```

Update this module to use the
[eks-vpc-tags](https://github.com/gruntwork-io/terraform-aws-eks/tree/master/modules/eks-vpc-tags) module from the
`terraform-aws-eks` repo to add the tags required by EKS:

:::caution

You must be a <span className="js-subscribe-cta">Gruntwork subscriber</span> to access `terraform-aws-eks`.

:::

```hcl title=infrastructure-modules/networking/vpc-app/main.tf
module "vpc" {
  # Make sure to replace <VERSION> in this URL with the latest module-vpc release
  source = "git@github.com:gruntwork-io/module-vpc.git//modules/vpc-app?ref=<VERSION>"

  vpc_name         = var.vpc_name
  aws_region       = var.aws_region
  cidr_block       = var.cidr_block
  num_nat_gateways = var.num_nat_gateways

  custom_tags                            = module.vpc_tags.vpc_eks_tags
  public_subnet_custom_tags              = module.vpc_tags.vpc_public_subnet_eks_tags
  private_app_subnet_custom_tags         = module.vpc_tags.vpc_private_app_subnet_eks_tags
  private_persistence_subnet_custom_tags = module.vpc_tags.vpc_private_persistence_subnet_eks_tags
}

module "vpc_tags" {
  # Make sure to replace <VERSION> in this URL with the latest terraform-aws-eks release
  source = "git::git@github.com:gruntwork-io/terraform-aws-eks.git//modules/eks-vpc-tags?ref=<VERSION>"

  eks_cluster_name = var.eks_cluster_name
}

# ... (the rest of the code is omitted) ...
```

Add a new input variable that you can use to specify the name of the EKS cluster:

```hcl title=infrastructure-modules/networking/vpc-app/variables.tf
variable "eks_cluster_name" {
  description = "The EKS cluster that will be deployed into the VPC."
  type        = string
}
```

Next, configure DNS forwarding rules using the
[vpc-dns-forwarder](https://github.com/gruntwork-io/module-vpc/tree/master/modules/vpc-dns-forwarder) module in
`module-vpc`:

:::caution

You must be a <span className="js-subscribe-cta">Gruntwork subscriber</span> to access `module-vpc`.

:::

```hcl title=infrastructure-modules/networking/vpc-app/main.tf
module "dns_mgmt_to_app" {
  # Make sure to replace <VERSION> in this URL with the latest module-vpc release
  source = "git::git@github.com:gruntwork-io/module-vpc.git//modules/vpc-dns-forwarder?ref=<VERSION>"

  origin_vpc_id                                   = data.terraform_remote_state.mgmt_vpc.outputs.vpc_id
  origin_vpc_name                                 = data.terraform_remote_state.mgmt_vpc.outputs.vpc_name
  origin_vpc_route53_resolver_primary_subnet_id   = element(data.terraform_remote_state.mgmt_vpc.outputs.public_subnet_ids, 0)
  origin_vpc_route53_resolver_secondary_subnet_id = element(data.terraform_remote_state.mgmt_vpc.outputs.public_subnet_ids, 1)

  destination_vpc_id                                   = module.vpc.vpc_id
  destination_vpc_name                                 = module.vpc.vpc_name
  destination_vpc_route53_resolver_primary_subnet_id   = element(module.vpc.public_subnet_ids, 0)
  destination_vpc_route53_resolver_secondary_subnet_id = element(module.vpc.public_subnet_ids, 1)
}
```

At this point, you’ll want to test your code. See
[Manual tests for Terraform code](/library/usage/using-the-library#testing-terraform-only) for instructions.

Once your updated `vpc-app` wrapper module is working the way you want, submit a pull request, get your changes merged
into the `master` branch, and create a new versioned release by using a Git tag. For example, to create a `v0.5.0`
release:

```bash
git tag -a "v0.5.0" -m "Added tagging and DNS forwarding for EKS"
git push --follow-tags
```

:::info

This guide will use [Terragrunt](https://github.com/gruntwork-io/terragrunt) and its associated file and folder
structure to deploy Terraform modules. Please note that **Terragrunt is NOT required for using Terraform modules from
the Gruntwork Infrastructure as Code Library.**

:::

Head over to your `infrastructure-live` repo and update the `terragrunt.hcl` file to deploy this new version:

```hcl title=infrastructure-live/production/us-east-2/stage/networking/vpc-app/terragrunt.hcl
terraform {
  source = "git@github.com/<YOUR_ORG>/infrastructure-modules.git//networking/vpc-app?ref=v0.5.0"
}
```

And run `terragrunt apply` to deploy the changes:

```bash
cd infrastructure-live/production/us-east-2/stage/networking/vpc-app
terragrunt apply
```


<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "d80ee2abe77083949d6db59d8d3745cb"
}
##DOCS-SOURCER-END -->

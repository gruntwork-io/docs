# What is a module?

Modules are reusable "infrastructure building blocks" that describe how to deploy and manage a specific piece of infrastructure, such as a VPC, ECS cluster, or Auto Scaling Group.

Most modules are written in Terraform and define several AWS resources.

## Example

Let’s look at an example module. The [rds module](/reference/modules/terraform-aws-data-storage/rds/) is a Terraform module that creates an RDS database, the IAM roles needed to operate that database, optional read replicas, database subnet groups, and the relevant security groups.

The module deploys a key element of an overall RDS deployment, but it's not a _complete_ RDS deployment. That's because the `rds` module does not include backup policies using AWS Backup (for disaster recovery), or RDS Proxy (to pool database connections), or CloudWatch alarms (to alert you when something goes wrong). These missing pieces are best thought of as building block modules themselves. Gruntwork has modules for `backup-plan`, `backup-vault`, and `rds-proxy` that can all be used in combination with the `rds` module.

To see how Gruntwork gives you an off-the-shelf overall deployment with all the elements included, see [What is a service module?](./services.md).

## Modules are optimized for control

A module is designed to be small, narrow in scope, and highly reusable, like a building block. Modules give you _control_, but they may not give you _convenience_. You can use the building block modules for all kinds of use cases (high control), but if you want to deploy a complete piece of infrastructure, you still have to do the work of assembling the right modules (low convenience).

To learn how you can optimize for convenience, see [What is a service module?](./services.md).

To learn more about the overall thought process behind building block modules versus service modules, see [Introducing: The Gruntwork Module, Service, and Architecture Catalogs](https://blog.gruntwork.io/introducing-the-gruntwork-module-service-and-architecture-catalogs-eb3a21b99f70).

## When to use a building block module

Building block modules are fairly generic by design, so you won't typically deploy a single building block module directly. Instead, you write code that combines the building block modules you need for a specific use case.

For example, one module might deploy the control plane for Kubernetes and a separate module could deploy worker nodes; you may need to combine both modules together to deploy a Kubernetes cluster.

We recommend our [Service Catalog](/library/overview/services/) for common use cases, but our full module catalog is available if you have a more complex use case.

## Where to find the building block modules

The module catalog features over 250 "building block" modules spanning three major use cases:

1. AWS foundations
2. Running applications
3. Storing data

Each of these use cases covers one or more Subject Matter Expert (SME) topics such as AWS account management, VPC/Networking, EKS, ECS, and RDS. SME topics are a first-class concept within Gruntwork, but do not have much visibility in the product itself at this time.

To browse the module catalog, see the [Library Reference](/library/reference/) and look for "Module Catalog" on the sidebar. You can also visit the list of [private Gruntwork GitHub repos](https://github.com/orgs/gruntwork-io/repositories?q=&type=private&language=&sort=).

## How modules are structured

The code in the module repos are organized into three primary folders:

1. `modules`: The core implementation code. All of the modules that you will use and deploy are defined within. For example to ECS cluster module in the `terraform-aws-ecs` repo in `modules/ecs-cluster`.

1. `examples`: Sample code that shows how to use the modules in the `modules` folder and allows you to try them out without having to write any code: `cd` into one of the folders, follow a few steps in the README (e.g. run `terraform apply`), and you’ll have a fully working module up and running. In other words, this is executable documentation.

1. `test`: Automated tests for the code in modules and examples.

We follow Hashicorp's [Standard Model Structure](https://developer.hashicorp.com/terraform/language/modules/develop/structure) for our files (`main.tf`, `variables.tf`, `outputs.tf`). In the `variables.tf` file we always put the required variables at the top of the file, followed by the optional variables. Although there are often a lot of ways to configure our modules, we set reasonable defaults and try to minimize the effort required to configure the modules to the most common use cases.

## How modules are updated

Gruntwork brings together AWS and Terraform experts around the world who track updates from AWS, Terraform, and the DevOps community at large, along with requests from the Gruntwork customer community. We translate the most important of these updates into new features, new optimizations, and ultimately new releases.

Refer to [Gruntwork releases](/guides/stay-up-to-date/#gruntwork-releases) for a comprehensive listing of all the updates.


<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "b931378b5e8c1665ddeffa61c113960a"
}
##DOCS-SOURCER-END -->

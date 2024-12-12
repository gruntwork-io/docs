# Modules

Modules are reusable "infrastructure building blocks" describing how to deploy and manage specific pieces of infrastructure, such as a VPC, ECS cluster, or Auto Scaling Group.

Most modules are written in Terraform and define multiple AWS resources.

## Example

Consider the [rds module](/reference/modules/terraform-aws-data-storage/rds). This Terraform module creates an RDS database, the IAM roles required to operate it, optional read replicas, database subnet groups, and relevant security groups.

While the module addresses key elements of an RDS deployment, it does not provide a _complete_ solution. It excludes features like backup policies using AWS Backup, RDS Proxy for connection pooling, and CloudWatch alarms for monitoring. These missing elements are available as separate building block modules, such as `backup-plan`, `backup-vault`, and `rds-proxy`, which you can use alongside the `rds` module.

To explore complete solutions combining building blocks, refer to [Service Modules](/2.0/docs/library/concepts/service-modules).

## Modules are optimized for control

Modules are designed to be small, narrow in scope, and highly reusable. They prioritize _control_ over _convenience_, making them suitable for diverse use cases. Deploying a complete infrastructure solution often requires assembling multiple modules.

Consider [Service Modules](/2.0/docs/library/concepts/service-modules) when optimizing for greater convenience.

For insights on building block versus service modules, see [Introducing: The Gruntwork Module, Service, and Architecture Catalogs](https://blog.gruntwork.io/introducing-the-gruntwork-module-service-and-architecture-catalogs-eb3a21b99f70).

## When to use a building block module

Building block modules are typically generic. Instead of deploying a single module, users write code combining multiple modules for specific use cases. For instance, one module might deploy Kubernetes control planes while another deploys worker nodes. A Kubernetes cluster requires both modules.

We recommend using the [Service Catalog](/2.0/docs/library/concepts/service-modules) for everyday use cases, with the entire module catalog available for more complex needs.

## Where to find the building block modules

The module catalog features over 250 building block modules spanning three primary use cases:

1. AWS foundations
2. Running applications
3. Storing data


To browse the module catalog, see the [Library Reference](/library/reference) or visit the [private Gruntwork GitHub repos](https://github.com/orgs/gruntwork-io/repositories?q=&type=private&language=&sort=).

## How modules are updated

Gruntwork employs AWS and Terraform experts who monitor updates from AWS, Terraform, and the broader DevOps community. Feedback from the Gruntwork customer community also informs updates. They incorporate the most significant updates into new features and releases.

Refer to [Gruntwork releases](/guides/stay-up-to-date/#gruntwork-releases) for a comprehensive listing of updates.

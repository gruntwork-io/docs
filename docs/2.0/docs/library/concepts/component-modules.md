# Component Modules

Any OpenTofu/Terraform code that is meant to be reused is called an **OpenTofu module** or **Terraform module**. For example, if you write an OpenTofu file that defines a few resources on AWS that you want to deploy, you can reference that file from a different OpenTofu file using the `module` keyword. In this simple example, it's conventional to say that you've written code to launch an instance of an OpenTofu module.

But it turns out there are two types of OpenTofu/Terraform modules! In this page, we'll talk about **component modules**. We recommend you then read about [composite modules](/service-modules]. 

## About Component Modules

Component modules are reusable, elemental "infrastructure building blocks" that describe how to deploy and manage specific pieces of infrastructure, such as a VPC, ECS cluster, or Auto Scaling Group. That sounds awfully similar to what we just wrote above, so let's look at an example.

:::note

We've previously referred to component modules as "building block modules."

:::

## Example

Consider the [`rds` component module](/reference/modules/terraform-aws-data-storage/rds). This OpenTofu/Terraform module creates an RDS database, the IAM roles required to operate it, optional read replicas, database subnet groups, and relevant security groups.

While this component module addresses key elements of an RDS deployment, it does not provide a _complete_ solution. It excludes features like backup policies using AWS Backup, RDS Proxy for connection pooling, and CloudWatch alarms for monitoring. These missing elements are available as separate component modules, such as `backup-plan`, `backup-vault`, and `rds-proxy`, which you can use alongside the `rds` module.

To explore complete solutions combining component modules, refer to [Composite Modules](/2.0/docs/library/concepts/service-modules).

## Component modules are optimized for control

Component modules are designed to be small, narrow in scope, and highly reusable. They prioritize _control_ over _convenience_, making them suitable for diverse use cases. Deploying a complete infrastructure solution often requires assembling multiple component modules. Consider [Composite Modules](/2.0/docs/library/concepts/service-modules) when optimizing for greater convenience.

For insights on component versus composite modules, see [Introducing: The Gruntwork Module, Service, and Architecture Catalogs](https://blog.gruntwork.io/introducing-the-gruntwork-module-service-and-architecture-catalogs-eb3a21b99f70).

## When to use a component module

Component modules are typically generic. Instead of deploying a single component module, users write code combining many component modules for specific use cases. For instance, one component module might deploy a Kubernetes control plane while another deploys Kubernetes worker nodes. A Kubernetes cluster requires both component modules.

We recommend using [Composite Modules](/2.0/docs/library/concepts/service-modules) for everyday use cases, reserving the entire module catalog available for more complex needs.

## Where to find the component modules

The Gruntwork IaC Library features over 250 component modules spanning three primary use cases:

1. AWS foundations
2. Running applications
3. Storing data


To browse the modules, see the [Library Reference](/library/reference) or peruse the [private Gruntwork GitHub repositories using your subscription](https://github.com/orgs/gruntwork-io/repositories?q=&type=private&language=&sort=).

## How component modules are updated

Gruntwork employs AWS and OpenTofu/Terraform experts who monitor updates from AWS, OpenTofu, Terraform, and the broader DevOps community. Feedback from the Gruntwork customer community also informs updates. They incorporate the most significant updates into new features and releases.

Refer to [Gruntwork releases](/guides/stay-up-to-date/#gruntwork-releases) for a comprehensive listing of updates.

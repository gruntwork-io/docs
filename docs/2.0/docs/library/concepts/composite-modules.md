# Composite Modules

Composite modules are combinations of [component modules](/2.0/docs/library/concepts/component-modules) covering a wide variety of use cases, including CI/CD, networking, container orchestration (EKS, ECS), and more.

Composite modules are written for OpenTofu/Terraform, represent a full use case, and are designed to be used "off the shelf."

:::note

We've previously referred to composite modules as "service modules."

:::

## Example

Let’s look at an example composite module. The [`rds` composite module](/reference/services/data-storage/amazon-rds) creates not only an RDS database, but also a DNS record in Amazon Route53, CloudWatch alarms, a CloudWatch dashboard, and scheduled snapshots of the database, all using a combination of [component modules](/2.0/docs/library/concepts/component-modules).

After running `tofu apply` (or `terraform apply`), you will have an RDS instance that you can access via a human-friendly name, alarms to alert you if something goes wrong, a dashboard for viewing RDS KPIs, and a strategy for disaster recovery.

## Composite modules are optimized for convenience

Whereas component modules are optimized for control, composite modules are optimized for convenience.

A composite module reflects a complete opinion on how you should run a piece of infrastructure. Using a composite module gives you the convenience of a single OpenTofu/Terraform module that does everything you need.

In the case of the composite modules in the Gruntwork IaC Library, Gruntwork has asserted a strong opinion on how a particular pattern should be deployed, and we take responsibility for maintaining and updating those patterns. If you do not agree with our opinions, you can either [customize the module](/2.0/docs/library/tutorials/customizing-modules), or sacrifice convenience in favor of control and build your own module, possibly out of our [component modules](/2.0/docs/library/concepts/component-modules).

## When to use a composite module

Using a composite module can save you time because Gruntwork has already pieced together individual component modules and tested that they correctly reference each other.

For example, the [eks-cluster service module](/reference/services/app-orchestration/amazon-eks) combines all the modules you need to run an EKS (Kubernetes) cluster in a typical production environment, including modules for the control plane, worker nodes, secrets management, log aggregation, alerting, and so on.

If you need more flexibility than our composite module provides, then you can combine component modules from our [IaC Library](/2.0/docs/library/concepts/modules#where-to-find-the-building-block-modules), your own component modules, or open source component modules to meet your specific use case.

CIS customers also have access to the [terraform-aws-cis-service-catalog git repo](https://github.com/gruntwork-io/terraform-aws-service-catalog) to help ensure conformity to the [CIS AWS Foundations Benchmark](https://gruntwork.io/achieve-compliance/).

## Where to find the composite modules

We previously referred to composite modules as "service modules," and therefore placed them in what we call a "service catalog." The service catalog features over 25 composite modules spanning three major use cases:

1. AWS foundations
2. Running applications
3. Storing data

To browse the service catalog, see the [Library Reference](/library/reference) and look for "Service Catalog" in the sidebar. You can also visit the [terraform-aws-service-catalog git repo](https://github.com/gruntwork-io/terraform-aws-service-catalog).

## How composite modules are updated

When [component modules are updated](/2.0/docs/library/concepts/modules#how-modules-are-updated), we propagate those updates to the service catalog. Keep in mind that there is sometimes a delay between when a component module is updated and when that update is reflected in the service catalog.

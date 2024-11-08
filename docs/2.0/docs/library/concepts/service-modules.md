# Service Modules

Service modules are combinations of [modules](./modules) covering a wide variety of use cases, including CI/CD, networking, container orchestration (EKS, ECS), and more.

Service modules are usually written in Terraform, represent a full use case, and are designed to be used "off the shelf."

## Example

Let’s look at an example service module. The [`rds` service module](/reference/services/data-storage/amazon-rds) creates not only an RDS database, but also a DNS record in Amazon Route53, CloudWatch alarms, a CloudWatch dashboard, and scheduled snapshots of the database, all using a combination of "building block" modules.

After applying, you will have an RDS instance that you can access via a human-friendly name, alarms to alert you if something goes wrong, a dashboard for viewing RDS KPIs, and a strategy for disaster recovery.

## Service modules are optimized for convenience

Whereas "building block" modules are optimized for control, service modules are optimized for convenience.

A service module reflects a complete Gruntwork opinion on how you should run a piece of infrastructure. Using a service module gives you the convenience of a single Terraform module that does everything you need, with Gruntwork maintaining the code.

If you do not agree with our opinions, you can either [customize the module](/2.0/docs/library/tutorials/customizing-modules), or sacrifice convenience in favor of control and build your own module, possibly out of our [building block modules](./modules).

## When to use a service module

Using a service module can save you time because Gruntwork has already pieced together individual building block modules and tested that they correctly reference each other.

For example, the [eks-cluster service module](/reference/services/app-orchestration/amazon-eks) combines all the modules you need to run an EKS (Kubernetes) cluster in a typical production environment, including modules for the control plane, worker nodes, secrets management, log aggregation, alerting, and so on.

If you need more flexibility than our services provide, then you can combine modules from our [module catalog](./modules#where-to-find-the-building-block-modules), your own modules, or open source modules to meet your specific use case.

CIS customers also have access to the [terraform-aws-cis-service-catalog git repo](https://github.com/gruntwork-io/terraform-aws-service-catalog) to help ensure conformity to the [CIS AWS Foundations Benchmark](https://gruntwork.io/achieve-compliance/).

## Where to find the service modules

The service catalog features over 25 service modules spanning three major use cases:

1. AWS foundations
2. Running applications
3. Storing data

To browse the service catalog, see the [Library Reference](/library/reference) and look for "Service Catalog" in the sidebar. You can also visit the [terraform-aws-service-catalog git repo](https://github.com/gruntwork-io/terraform-aws-service-catalog).

## How service modules are updated

When [building block modules are updated](./modules#how-modules-are-updated), we propagate those updates to the service catalog. Keep in mind that there is sometimes a delay between when a "building block" module is updated and when that update is reflected in the service catalog.

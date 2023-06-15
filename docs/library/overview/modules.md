# What is a module?

Modules are reusable "infrastructure building blocks" that encapsulate the configuration and resource definitions needed to deploy and manage a specific piece of infrastructure, such as a VPC, ECS cluster, or Auto Scaling Group. Each module defines several AWS resources. For example, the VPC module contains resource definitions for subnets, NAT gateways, and more. Modules promote code reusability, modularity, and consistency in infrastructure deployments and can be customized in a variety of ways.

Gruntwork modules are tested in AWS, in a randomly selected region, each time it changes to verify the infrastructure created matches the desired configuration.

## Example

Let’s look at an example module. The [rds module](/reference/modules/terraform-aws-data-storage/rds/) creates an RDS database, the IAM roles needed to operate that database, optional read replicas, database subnet groups, and the relevant security groups.

The module is written in Terraform and is a key element of an overall RDS deployment, but it's not a _complete_ RDS deployment. That's because the `rds` module does not include backup policies using AWS Backup, or RDS Proxy (to pool database connections), or CloudWatch alarms (to alert you when something goes wrong). These missing pieces are best thought of as building block modules themselves! Indeed, `backup-plan`, `backup-vault`, and `rds-proxy` can all be used in combination with the `rds` module.

To see how Gruntwork gives you an off-the-shelf overall deployment with all the elements included, see [What is a service module?](./services.md)

## When should I use a module?

The Gruntwork Infrastructure as Code (IaC) Library contains [hundreds of modules](/library/reference/) that you can use and combine. These modules are fairly generic building blocks, so you don’t typically deploy a single module directly. Instead, you write code that combines the modules you need for a specific use case.

For example, one module might deploy the control plane for Kubernetes and a separate module could deploy worker nodes; you may need to combine both modules together to deploy a Kubernetes cluster.

We recommend our [Service Catalog](/library/overview/services/) for common use cases, but our full Module Catalog is available if you have a more complex use case. For a full list of modules available, refer to the [Gruntwork Infrastructure as Code Library](/library/reference/).

## How modules are structured

The code in the module repos are organized into three primary folders:

1. `modules`: The core implementation code. All of the modules that you will use and deploy are defined within. For example to ECS cluster module in the `terraform-aws-ecs` repo in `modules/ecs-cluster`.

1. `examples`: Sample code that shows how to use the modules in the `modules` folder and allows you to try them out without having to write any code: `cd` into one of the folders, follow a few steps in the README (e.g. run `terraform apply`), and you’ll have a fully working module up and running. In other words, this is executable documentation.

1. `test`: Automated tests for the code in modules and examples.

We follow Hashicorp's [Standard Model Structure](https://developer.hashicorp.com/terraform/language/modules/develop/structure) for our files (`main.tf`, `variables.tf`, `outputs.tf`). In the `variables.tf` file we always put the required variables at the top of the file, followed by the optional variables. Although there are often a lot of ways to configure our modules, we set reasonable defaults and try to minimize the effort required to configure the modules to the most common use cases.


<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "6cc9b9e5a36e9e2e7b3458df4094c3a7"
}
##DOCS-SOURCER-END -->

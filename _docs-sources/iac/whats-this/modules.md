# What is a Module?

Modules are reusable code components that encapsulate the configuration and resource definitions needed to deploy and manage a specific piece of infrastructure, such as a VPC, ECS cluster, or Auto Scaling Group. Each module defines several AWS resources. For example, the VPC module contains resource definitions for subnets, nat gateways, and more. Modules promote code reusability, modularity, and consistency in infrastructure deployments and can be customized in a variety of ways.

Gruntwork modules are tested in AWS, in a randomly selected region, each time it changes to verify the infrastructure created matches the desired configuration.

## When do you use a Module?

The Gruntwork Infrastructure as Code (IaC) Library contains hundreds of modules that you can use and combine. These modules are fairly generic building blocks, so you don't typically deploy a single module directly. Instead, you write code that combines the modules you need for a specific use case. 

For example, one module might deploy the control plane for Kubernetes and a separate module could deploy worker nodes; you may need to combine both modules together to deploy a Kubernetes cluster, or use the `eks-cluster` service from the [Service Catalog](/iac/whats-this/services/).

For a full list of modules available, refer to the [Gruntwork Infrastructure as Code Library](https://gruntwork.io/infrastructure-as-code-library/).

## How to navigate modules in the IaC Library

The code in the module repos are organized into three primary folders:

1. `modules`: The core implementation code. All of the modules that you will use and deploy are defined within. For example to ECS cluster module in the `terraform-aws-ecs` repo in `modules/ecs-cluster`.

1. `examples`: Sample code that shows how to use the modules in the `modules` folder and allows you to try them out without having to write any code: `cd` into one of the folders, follow a few steps in the README (e.g. run `terraform apply`), and you'll have a fully working module up and running. In other words, this is executable documentation.

1. `test`: Automated tests for the code in modules and examples.
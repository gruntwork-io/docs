# What is a Module?

Modules are reusable code to deploy and manage one piece of infrastructure and each one is a battle-tested, best-practices definition of a piece of infrastructure, such as a VPC, ECS cluster, or an Auto Scaling Group.

## When do you use a Module?

Modules are fairly generic building blocks, so you don't typically deploy a single module directly, but rather, you write code that combines the modules you need for a specific use case. 

For example, one module might deploy the control plane for Kubernetes and a separate module could deploy worker nodes; you may need to combine both modules together to deploy a Kubernetes cluster, or use the `eks-cluster` service from the [Service Catalog](/iac/whats-this/services/).

The Gruntwork Infrastructure as Code (IaC) Library contains hundreds of battle-tested, commercially supported and maintained modules that you can use and combine in many different ways. Modules are versioned using Semantic Versioning to allow Gruntwork clients to keep up to date with the latest infrastructure best practices in a systematic way.

## How to navigate modules in the IaC Library

The code in the module repos are organized into three primary folders:

1. `modules`: The core implementation code. All of the modules that you will use and deploy are defined within. For example to ECS cluster module in the `terraform-aws-ecs` repo in `modules/ecs-cluster`.

1. `examples`: Sample code that shows how to use the modules in the `modules` folder and allows you to try them out without having to write any code: you `cd` into one of the folders, follow a few steps in the README (e.g. run `terraform apply`), and you'll have a fully working module up and running. In other words, this is executable documentation.

1. `test`: Automated tests for the code in modules and examples.
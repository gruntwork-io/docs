# DevOps Components

Gruntwork DevOps Foundations is made up of a collection of _DevOps components._ A DevOps component is an essential building block of modern infrastructure for which Gruntwork has pre-written Infrastructure as Code (IaC) modules and detailed documentation. Gruntwork DevOps components reflect our opinions on best practices for that area of DevOps.

## Available components

The Gruntwork DevOps components include:

1. **Landing Zone.** Set up a best-practice AWS multi-account setup, easily create new AWS accounts, and set secure account baselines.
1. **IaC Foundations.** Set up the foundational Terraform and Terragrunt coding patterns that enable your team to scale.
1. **Pipelines.** Roll out an infrastructure change in a way that meets the needs of your organization.
1. **Network Topology.** Protect your internal cloud resources from external access.
1. **Running Apps.** Run your apps on EKS, ECS, or Lambda in a best-practices way.

All DevOps components are built to support AWS using Terraform/OpenTofu.

## Working with components

Components can be installed independently, however some components work best bundled together, and some components depend on another component being installed first. To reflect this dependency ordering, we have identified two "layers" of components:

### Layer 1

The first layer is the most foundational because all other infrastructure is built on top of it. It includes:

- Landing Zone
- IaC Foundations
- Pipelines
- Network Topology

### Layer 2

Once the layer-1 components are in place, the following components can be added:

- Running Apps

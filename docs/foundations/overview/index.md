# DevOps components

Gruntwork DevOps Foundations is made up of a collection of _DevOps components._ A DevOps component is an essential element of modern infrastructure for which Gruntwork has pre-built IaC modules and pre-written documentation to reflect our recommended best practices and support fast setup.

## Available components

The Gruntwork DevOps components include:

1. **Landing Zone.** Set up a best-practice multi-account setup, easily create new AWS accounts, and set secure account baselines.
1. **Network topology.** Protect your internal cloud resources from external access.
1. **IaC foundations.** Set up the foundational Terraform and Terragrunt coding patterns that your team can scale with
1. **Pipelines.** Roll out an infrastructure change in a way that meets the needs of your organization.
1. **Running apps.** Run your apps on EKS or ECS in a best-practices way.
1. **Automatic updates.** Streamline the process of keeping your infrastructure up to date.

## Working with components

Some components can be installed independently, and some components work best bundled together. In addition, some components depend on others being in place. In general, we have identified two "layers" of components:

### Layer 1

The first layer is the most foundational because all other infrastructure is built on top of it. It includes:

- Pipelines
- Landing Zone
- IaC foundations
- Network topology

### Layer 2

Once the layer-1 components are in place, the following components can be added:

- Running apps
- Automatic updates


<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "09a921853fce63e27fe63a68ecd0f2e1"
}
##DOCS-SOURCER-END -->

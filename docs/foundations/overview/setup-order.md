# Setup order

Some components can be installed on their own, while other components are inter-dependent and can only be installed as a bundle.

## Installable independently

The following components can each be installed on their own, without a dependency on any other component:

- IaC Foundations
- Pipelines
- Network Topology
- Running Apps

## Installable as bundles

The following components can only be installed as a bundle:

- Landing Zone, requires:
  - IaC Foundations
  - Pipelines
  - Network Topology

In practice, this means that if you want to install Gruntwork Landing Zone, you will need to install the full bundle of IaC Foundations, Pipelines, Landing Zone, and Network Topology.

## Component layers

It can also be helpful to think of components in "layers."

### Layer 1: Foundations

The first layer is the most foundational because all other infrastructure is built on top of it. It includes:

- Landing Zone
- IaC Foundations
- Pipelines
- Network Topology

You might also consider adding other components not yet supported by Gruntwork like FinOps or secrets management.

### Layer 2: Applications

Once the layer-1 components are in place, the following components can be added:

- Running Apps

In general, when you build new infrastructure, you first need your AWS accounts and their account baselines, a network topology, your IaC foundational patterns, and a Pipeline to deploy everything. Once those infrastructure foundations are in place, you are ready to add apps, data pipelines, and more.


<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "f83da101ff1b9cbbef4064fd59c6007c"
}
##DOCS-SOURCER-END -->

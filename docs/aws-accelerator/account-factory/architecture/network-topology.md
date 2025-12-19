# About Network Topology

The Network Topology component focuses on implementing best-practices network architecture for your organization.

The standard network architecture includes:

- The Virtual Private Cloud (VPC) itself
- Subnets, isolated subdivisions within the VPC, are organized into three "tiers": public, private app, and private persistence
- Route tables, which define routing rules for subnets
- Internet Gateways, to manage traffic between public subnets and the Internet
- Network Address Translation Gateways (NAT Gateways), to handle traffic between private subnets and the Internet
- VPC peering connections to a management VPC, to allow for centralized network routing
- DNS forwarding, for communication with a management VPC
- Optional tags for an EKS cluster

## Out-of-the-box setup

Gruntwork generates the IaC code required to implement an opinionated, standard, recommended VPC configuration. Details are available in the [VPC service catalog module](https://library.gruntwork.io/services/networking/virtual-private-cloud-vpc).

## Extending the standard VPC

You can expand the configuration using "building block" modules from the VPC topic in the Gruntwork IaC Library. These modules enable additional functionality such as:

- [Enabling IPv6](https://library.gruntwork.io/modules/terraform-aws-vpc/vpc-app/#ipv6-design)
- [Adding a Transit Gateway](https://library.gruntwork.io/modules/terraform-aws-vpc/transit-gateway/)
- [Enabling DNS forwarding](https://library.gruntwork.io/modules/terraform-aws-vpc/vpc-dns-forwarder/)
- [Setting up Tailscale](https://library.gruntwork.io/services/security/tailscale-subnet-router)

This process involves working directly with the OpenTofu/Terraform modules in the Gruntwork IaC Library.

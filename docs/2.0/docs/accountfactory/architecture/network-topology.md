# About Network Topology

The Network Topology component focuses on implementing best-practices network architecture for your organization.

The standard network architecture includes:

- The Virtual Private Cloud (VPC) itself
- Subnets, isolated subdivisions within the VPC, are organized into three "tiers": public, private app, and private persistence
- Route tables, which define routing rules for subnets
- Internet Gateways to manage traffic between public subnets and the Internet
- NATs to handle traffic between private subnets and the Internet
- VPC peering connections to a management VPC
- DNS forwarding for communication with a management VPC
- Optional tags for an EKS cluster

## Out-of-the-box setup

Gruntwork generates the IaC code required to implement the standard, recommended VPC configuration. Details are available in the [VPC service catalog module](/reference/services/networking/virtual-private-cloud-vpc).

## Extending the standard VPC

You can expand the configuration using "building block" modules from the VPC topic in the Gruntwork IaC Library. These modules enable additional functionality such as:

- [Enabling IPv6](/reference/modules/terraform-aws-vpc/vpc-app/#ipv6-design)
- [Adding a Transit Gateway](/reference/modules/terraform-aws-vpc/transit-gateway/)
- [Enabling DNS forwarding](/reference/modules/terraform-aws-vpc/vpc-dns-forwarder/)
- [Setting up Tailscale](/reference/services/security/tailscale-subnet-router)

This process involves working directly with the OpenTofu/Terraform modules in the Gruntwork IaC Library.

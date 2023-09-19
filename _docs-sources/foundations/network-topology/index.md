# About Network Topology

The Network Topology component is focused on setting up the right best-practices network architecture for your organization.

Our standard network architecture includes:

- The VPC itself
- Subnets, which are isolated subdivisions within the VPC. There are 3 "tiers" of subnets: public, private app, and private persistence.
- Route tables, which provide routing rules for the subnets.
- Internet Gateways to route traffic to the public Internet from public subnets.
- NATs to route traffic to the public Internet from private subnets.
- VPC peering to a management VPC
- DNS forwarding for a management VPC
- Optionally, tags for an EKS cluster

## Out-of-the-box setup

Gruntwork will generate the IaC code you need to set up our standard, recommended VPC configuration, as detailed in our [VPC service catalog module](/reference/services/networking/virtual-private-cloud-vpc).

## Extending the standard VPC

You can extend this configuration by using the "building block" modules from the VPC topic in the Gruntwork Library to further extend your VPC, adding functionality such as:

- [Enabling IPv6](/reference/modules/terraform-aws-vpc/vpc-app/#ipv6-design)
- [Adding a Transit Gateway](/reference/modules/terraform-aws-vpc/transit-gateway/)
- [Enabling DNS forwarding](/reference/modules/terraform-aws-vpc/vpc-dns-forwarder/)
- [Setting up Tailscale](/reference/services/security/tailscale-subnet-router)

This is done by directly working with the Terraform modules from Gruntwork Library to accomplish the particular configuration you need.

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

## Extending the standard VPC

Gruntwork will create code for you to set up our standard, recommended VPC configuration. You can extend this configuration by using the "building block" modules from the VPC topic in the Gruntwork Library to further extend your VPC, adding functionality such as:

- [Enabling IPv6](https://docs.gruntwork.io/reference/modules/terraform-aws-vpc/vpc-app/)
- [Adding a Transit Gateway](https://docs.gruntwork.io/reference/modules/terraform-aws-vpc/transit-gateway/)
- [Enabling DNS forwarding](https://docs.gruntwork.io/reference/modules/terraform-aws-vpc/vpc-dns-forwarder/)
- [Setting up Tailscale](https://docs.gruntwork.io/reference/services/security/tailscale-subnet-router)


<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "7a1b9c9c4e72e91ad8c9daae9959ad2d"
}
##DOCS-SOURCER-END -->

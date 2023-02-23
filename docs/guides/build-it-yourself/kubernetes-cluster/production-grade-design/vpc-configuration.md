# VPC configuration

EKS relies on a _[Virtual Private Cloud (VPC)](https://aws.amazon.com/vpc/)_ to provide the basic network topology and
to manage communication across the nodes (see
[How to deploy a production-grade VPC on AWS](/guides/build-it-yourself/vpc/) for more
information on VPCs). Here are the key VPC considerations for your EKS cluster:

<div className="dlist">

#### Add tags to the VPC and subnets

EKS relies on special tags on the VPC and subnets to know which VPC resources to use for deploying
infrastructure. For example, EKS uses tags to figure out which subnets to use for the load balancers associated with a
Service resource. See [Cluster VPC Considerations](https://docs.aws.amazon.com/eks/latest/userguide/network_reqs.html)
for more information.

#### Configure DNS forwarding

EKS supports private API endpoints so that the Kubernetes API Server can only be accessed within the VPC. The
hostname for this internal endpoint lives in a
[Route 53 private hosted zone](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/hosted-zones-private.html),
which works fine if you’re trying to access it from within the VPC, but does not work (by default) if you try to
access it over a VPC peering connection. For example, if you had Kubernetes in an application VPC, and DevOps tooling
(e.g., and OpenVPN server or a Jenkins server) in a peered management VPC, by default, that management tooling would
not be able to talk to this private endpoint. To fix this issue, configure DNS forwarding by creating a
[Route 53 Resolver](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resolver-getting-started.html) and make
sure that remote VPC DNS resolution is enabled on both accepter and requester side of the connection peering.

</div>


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"local-copier","hash":"13fa4dbe8f473c8e7d1a69075e8b8332"}
##DOCS-SOURCER-END -->

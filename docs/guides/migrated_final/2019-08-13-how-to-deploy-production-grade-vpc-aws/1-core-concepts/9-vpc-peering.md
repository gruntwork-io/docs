## VPC Peering

![Multiple VPCs connected via VPC peering](/assets/img/guides/vpc/vpc-diagram.png)

Normally, you use VPCs to create isolated networks, so the resources in one VPC have no way to access the resources in
another VPC. _[VPC Peering](https://docs.aws.amazon.com/vpc/latest/peering/what-is-vpc-peering.html)_ is a networking
connection between two VPCs that gives you a way to allow limited, controlled cross-VPC communication. For example,
you might have a management VPC where you run DevOps tooling (e.g., Jenkins), and you may want to allow that VPC to
have limited access to your staging and production VPCs so that DevOps tooling can carry out maintenance tasks.

To support this use case, you can create a VPC peering connection between the management and staging VPCs, and another
one between the management and production VPCs, plus route table entries that allow certain traffic to be routed
between those VPCs (e.g., allow specific subnets in the management VPC to talk to specific subnets in the staging and
production VPCs). Note that peering connections are not transitive, so while the management VPC will get limited access
to staging and production, staging and production will not have any access to each other (this is why it makes sense to
put the DevOps tooling in its own VPC, rather than shoving it directly into the staging or production VPCs).

If you have a large number of VPCs to interconnect, setting up a peering connection between each pair (n<sup>2</sup>
connections total) can quickly become impractical. In this case, you should look into using the
[AWS Transit Gateway](https://aws.amazon.com/transit-gateway/) or
[Shared VPCs](https://docs.aws.amazon.com/vpc/latest/userguide/vpc-sharing.html).



<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Service Catalog Reference","hash":"28c23afdfcc513298b040a71b1f4676f"}
##DOCS-SOURCER-END -->

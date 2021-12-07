## Multiple subnet tiers

![Each VPC is partitioned into multiple tiers of subnets](/assets/img/guides/vpc/subnets-diagram.png)

The third layer of defense is to use separate _subnet tiers_, where each tier contains multiple subnets configured in
the same way. We recommend the following three theirs for most use cases:

Public tier  
This tier contains public subnets, so any resources in this tier will be directly addressable from the public
Internet. The only things you should run in this tier are highly locked down services that must be exposed directly
to the public, including load balancers and the bastion host.

Private application tier  
This tier contains private subnets, so any resources in tier will not be directly addressable from the public
Internet. This tier should be used for all of your applications: e.g., EC2 instances, Docker containers, and so on.

Private persistence tier  
This tier also contains private subnets, so any resources in tier will not be directly addressable from the public
Internet. This tier should be used for all of your data stores: e.g., relational databases, caches, NoSQL stores, and
so on. This allows you to add additional additional layers of defense for your data, as described in the next
section. If you have no data stores (e.g., in a management VPC), this tier can be omitted.

Each tier should contain one subnet per availability zone in your chosen AWS region so that resources in that tier can
take advantage of all availability zones. So, if you picked the `us-east-2` region, which has three availability zones
(`us-east-2a`, `us-east-2b`, and `us-east-2c`), you’d have three subnets in each tier, for a total of 9 subnets. The
subnets should each use non-overlapping CIDR blocks, typically with a mask of `/21` (2,048 IPs).

The reason to have separate tiers is that it allows you to configure fine-grained security rules for each tier, as
discussed in the next section.



<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Service Catalog Reference","hash":"07899858e1712f23f463cbd4d3db3bf8"}
##DOCS-SOURCER-END -->

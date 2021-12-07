# Security groups and NACLs

![Security group settings for the different subnet tiers](/assets/img/guides/vpc/peering-diagram.png)

Use security groups and NACLs to configure the following rules for each subnet tier:

Public tier  
The public tier should allow all requests.

Private application tier  
The private application tier should only allow requests to/from the public tier, private application tier, private
persistence tier, and the management VPC. Requests from all other subnets and the public Internet are not allowed.

Private persistence tier  
The private persistence tier should only allow requests to/from the private application tier, private persistence
tier, and optionally the management VPC (e.g., if you need to run schema migrations during a CI build). Requests
from all other subnets—including the public subnet tier—and the public Internet are not allowed. This provides
an extra layer of defense for your data, which is the most valuable, irreplaceable, and sought-after resource at most
companies.

This is a defense-in-depth strategy in action: attackers outside your VPC have no direct access to any of your
applications or data stores, only to the resources in your public subnets, such as load balancers, which should be
thoroughly locked down. Moreover, even if the attackers break into the public subnet in one environment, they still
don’t have direct access to the data in the persistence tier of that environment, nor to anything in any other
environment.



<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Service Catalog Reference","hash":"18448985e4db85058c030e0ae609c2bd"}
##DOCS-SOURCER-END -->

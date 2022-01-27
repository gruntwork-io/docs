# Internet Gateways, public subnets, and private subnets

An _[Internet Gateway](https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Internet_Gateway.html)_ is a service managed
by AWS that runs in your VPC. It allows access to and from the public Internet for resources in your subnet that have
a public IP address (assuming you configure a route table entry in that subnet pointing to the Internet Gateway).

Subnets that have routes to Internet Gateways are called _public subnets_, as the public IP addresses in those subnets
can be accessed directly from the public Internet. Subnets that do not have routes to Internet Gateways are called
_private subnets_, as they will rely solely on routing to private IP addresses, which can only be accessed from within
the VPC.


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"local-copier","hash":"d47dde0089191a4a4707e0f5c050d2dd"}
##DOCS-SOURCER-END -->

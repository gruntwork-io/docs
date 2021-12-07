# Subnets

![VPCs partitioned into multiple subnets: public, private (services), private (persistence)](/assets/img/guides/vpc/vpc-subnets-diagram.png)

Each VPC is partitioned into one or more _[subnets](https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Subnets.html:)_
(sub-networks). Each subnet controls a portion of the VPC’s CIDR range. For example, a VPC with the CIDR block
`10.10.0.0/16` (all IPs from `10.10.0.0` - `10.10.255.255`) might be partitioned into two subnets, one with the CIDR
block `10.10.0.0/17` (all IPs from `10.10.0.0` - `10.10.127.255`) and one with CIDR block `10.10.128.0/17` (all IPs
from `10.10.128.0` - `10.10.255.255`). Note that subnets in the same VPC are not allowed to have overlapping CIDR
ranges.



<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Service Catalog Reference","hash":"3fa531d8ccae57acea20faba3ab78281"}
##DOCS-SOURCER-END -->

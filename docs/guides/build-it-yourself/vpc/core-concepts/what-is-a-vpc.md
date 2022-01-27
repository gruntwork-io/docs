# What is a VPC?

If you were building your own data center, you would set up a _physical network_ by configuring switches, routers,
connecting everything with ethernet cables, and so on. In the AWS cloud, you can set up a _virtual network_ (AKA a
software-defined network) by configuring a [_Virtual Private Cloud (VPC)_](https://aws.amazon.com/vpc/). Each VPC defines
a logical partition of your AWS account, complete with its own IP addresses, subnets, routing rules, and firewalls.

The VPC serves three primary purposes:

<div className="dlist">

#### Networking

The VPC is the basic networking and communication layer for your AWS account. Just about every AWS resource (e.g.,
EC2 instances, RDS databases, ELBs, etc) runs in a VPC and the VPC determines how (or if) all those resources are
able to talk to each other.

#### Security

The VPC is also the basic security layer for your AWS account. As it controls all networking and communication,
it’s your first line of defense against attackers, protecting your resources from unwanted access.

#### Partitioning

VPCs also give you a way to create separate, logical partitions within an AWS account. For example, you could have
one VPC for a staging environment and a separate VPC for a production environment. You can also connect VPCs to
other networks, such as connecting your VPC to your corporate intranet via a VPN connection, so that everyone in
your office and all the resources in your AWS account can access the same IPs and domain names.

</div>


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"local-copier","hash":"6c8bc96902491a81cc29d838b18a4226"}
##DOCS-SOURCER-END -->

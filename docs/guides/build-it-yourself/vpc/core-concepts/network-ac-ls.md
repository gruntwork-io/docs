# Network ACLs

In addition to security groups, which act as firewalls on individual resources (e.g., on an EC2 instance), you can also
create _[network access control lists (NACLs)](https://docs.aws.amazon.com/vpc/latest/userguide/vpc-network-acls.html)_,
which act as firewalls for an entire subnet. Just as with security groups, NACLs have inbound and outbound rules that
specify a port range, the IP addresses that can talk to that port range, and the protocol that will be allowed on that
port range.

However, there are two main differences with NACLs:

<div className="dlist">

#### Allow/Deny

Each NACL rule can either `ALLOW` or `DENY` the traffic defined in that rule.

#### Stateful/Stateless

Security groups are _stateful_, so if a security group has a rule that allows an inbound connection on, say, port 80, the security
group will automatically also open up an outbound port for that specific connection so it can respond. With a NACL,
if you have a rule that allows an inbound connection on port 80, that connection will not be able to respond unless
you also manually add another rule that allows outbound connections for the response. You normally don’t know exactly
which port will be used to respond: these are called
_[ephemeral ports](https://docs.aws.amazon.com/vpc/latest/userguide/vpc-network-acls.html#nacl-ephemeral-ports)_, and
the rules depend on the operating system.

</div>

For example, the networking stack on Linux usually picks any available port from
the range 32768-61000, where as Windows Server 2003 uses 1025-5000, NAT Gateways
use 1024-65535, and so on. Therefore, in practice, you typically have to open
ephemeral ports 1024-65535 in your NACL, both for inbound and outbound (as when
you establish outbound connections, anyone responding will likely do so on an
ephemeral port), making them primarily useful for locking down the low-numbered
ports (&lt; 1024) used for standard protocols (e.g., HTTP uses port 80), and
locking down source/destination IP addresses.


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"local-copier","hash":"7d0ca667894b24e72340105224933c82"}
##DOCS-SOURCER-END -->

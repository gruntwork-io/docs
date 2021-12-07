## Multiple VPCs

The second layer of defense is to use separate, isolated VPCs:

Application VPCs  
Each of the environments where you deploy applications (e.g.,dev, stage, prod) should live in a separate VPC. In
fact, as mentioned in the previous section, the gold standard is that each of these environments and their associated
VPCs live in completely separate AWS accounts. We’ll call each of these VPCs your _application VPCs_.

Management VPC  
You will also want a separate VPC for DevOps tooling such as a CI server (e.g., Jenkins) and a bastion host
(discussed later in this guide). We’ll call this the _management VPC_. You can connect the management VPC to each of
your application VPCs using VPC peering. This (a) gives you more fine grained control over which of your DevOps
tooling can talk to the application VPCs and (b) allows you to use a single management VPC with multiple application
VPCs without allowing connections between the application VPCs themselves.

Remove Default VPCs  
Note that all of the above are custom VPCs. To ensure that you always use these (secure) custom VPCs and never
accidentally fallback to the less secure defaults, you should delete the Default VPC and remove all the rules from
your Default Security Group, at least in your production accounts.

VPC sizing  
AWS VPCs allow masks between `/16` (65,536 IPs) and `/28` (16 IPs). For most use cases, we recommend using `/16`, as
that gives you a large, contiguous block of IPs that you’re unlikely to exhaust.

IP addresses  
The Internet Assigned Numbers Authority (IANA) has three blocks of the IP addresses reserved for use as
private IPs ([RFC 1918](http://www.faqs.org/rfcs/rfc1918.html)). Your VPCs should all use CIDR blocks that fall into
one of these IP address ranges:

    10.0.0.0    - 10.255.255.255
    172.16.0.0  - 172.31.255.255
    192.168.0.0 - 192.168.255.255

Unique CIDR blocks  
Every VPC you have should have a unique, non-overlapping CIDR block: e.g., dev could be `10.0.0.0/16`, production
could be `10.10.0.0/16`, management could be `10.20.0.0/16`, and so on. Overlapping CIDR blocks should be avoided as
they will prevent you from being able to peer VPCs together and from connecting your VPCs to other data centers or
your corporate intranet via site-to-site VPN connections.



<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Service Catalog Reference","hash":"a831d6877af457a9d55a2031e675c0cc"}
##DOCS-SOURCER-END -->

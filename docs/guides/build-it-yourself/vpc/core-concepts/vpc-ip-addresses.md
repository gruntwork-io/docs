# VPC IP addresses

Here’s how IP addresses work with AWS VPCs:

<div className="dlist">

#### Private IP addresses

Every VPC defines an isolated network that has its own range of _private IP addresses_. For example, the Default VPC
in AWS is configured to use all the IP addresses between `172.31.0.0` and `172.31.255.255`; if you create a custom
VPC, you can pick a custom IP address range to use, such as `10.10.0.0` to `10.10.255.255`. These private IPs should
be from the IP address ranges defined in [RFC 1918](http://www.faqs.org/rfcs/rfc1918.html) (more on this later).
Private IP addresses are only accessible from within the VPC, and not from the public Internet.

#### Public IP addresses

VPCs can also optionally be configured to assign _public IP addresses_ to your resources (as is the case with the
Default VPC). Public IPs are not associated with your VPC or even your AWS account; instead, they come from a pool of
IP addresses shared by AWS across all of its customers
(see [AWS IP Address Ranges](https://docs.aws.amazon.com/general/latest/gr/aws-ip-ranges.html)), so the IPs you get are
unpredictable, and may change (if you need consistent, predictable public IP addresses, you will need to use
[elastic IP addresses](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/elastic-ip-addresses-eip.html)).

#### Assigning IP addresses

AWS will automatically assign IP addresses to resources you launch in a VPC. For example, in the Default VPC,
one EC2 instance you launch might get the private IP address `172.31.0.2` and public IP address `203.0.113.25`,
while another instance might get the private IP address `172.31.5.3` and the public IP address `54.154.202.112`.

</div>


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"local-copier","hash":"9bbf0955ec269211f268d40559149a83"}
##DOCS-SOURCER-END -->

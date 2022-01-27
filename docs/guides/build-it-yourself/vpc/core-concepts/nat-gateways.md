# NAT Gateways

Resources in your public subnets can access the public Internet via an Internet Gateway. But what about resources in a
private subnet? These resources don’t have public IP addresses, nor a route to an Internet Gateway, so what do you do?

The solution is to deploy a _[NAT Gateway](https://docs.aws.amazon.com/vpc/latest/userguide/vpc-nat-gateway.html)_. The
NAT Gateway should run in a public subnet and have its own public IP address. It can perform _network address
translation_, taking network requests from a resource in a private subnet, swapping in its own public IP address in
those requests, sending them out to the public Internet (via the Internet Gateway in the public subnet), getting back
a response, and sending the response back to the original sender in the private subnet.

In order for the NAT Gateway to work, you’ll need to add a route to the route table for your private subnets:

<table>
<colgroup>
<col />
<col />
</colgroup>
<tbody>
<tr className="odd">
<td><p><b>Destination</b></p></td>
<td><p><b>Target</b></p></td>
</tr>
<tr className="even">
<td><p>10.10.0.0/24</p></td>
<td><p>Local</p></td>
</tr>
<tr className="odd">
<td><p>0.0.0.0/0</p></td>
<td><p>nat-67890</p></td>
</tr>
</tbody>
</table>

This route table sends all traffic within the private subnet’s CIDR block, `10.10.0.0/24`, to the Local route, and
the traffic for all other IPs, `0.0.0.0/0`, to a NAT Gateway with ID `nat-67890`.


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"local-copier","hash":"15d7ee1da61bdf479f662a44cee6c79a"}
##DOCS-SOURCER-END -->

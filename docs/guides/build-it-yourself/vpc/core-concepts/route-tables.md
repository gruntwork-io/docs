# Route tables

Every subnet must define a _[route table](https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Route_Tables.html)_ that
defines how to route traffic within that subnet. A route table consists of one or more _routes_, where each route
specifies a _destination_, which is the range of IP addresses (in CIDR notation) to route, and the _target_, which is
where to send the traffic for that range of IP addresses.

Here’s an example route table:

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
<td><p>10.0.0.0/24</p></td>
<td><p>Local</p></td>
</tr>
<tr className="odd">
<td><p>0.0.0.0/0</p></td>
<td><p>igw-12345</p></td>
</tr>
</tbody>
</table>

This route table sends all traffic within the subnet’s CIDR block, `10.0.0.0/24`, to the _Local_ route, which means it
will be automatically routed within the subnet by AWS. This table then adds a fallback route for all other IPs
(`0.0.0.0/0`) to send traffic to the an Internet Gateway with ID `igw-12345`. We’ll discuss Internet Gateways next.


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"local-copier","hash":"d8ec27c10689e15775980056dfec5918"}
##DOCS-SOURCER-END -->

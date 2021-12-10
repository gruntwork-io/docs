# Security Groups

Most resources in AWS allow you to attach one or more
_[security groups](https://docs.aws.amazon.com/vpc/latest/userguide/VPC_SecurityGroups.html)_, which are virtual
firewalls that you can use to control which ports that resources opens for inbound and outbound network traffic. By
default, all ports are blocked, so to allow network communication, you can add inbound and outbound _rules_. Each rule
in a security group specifies a port range, the IP addresses or other security groups that will be allowed to access
that port range, and the protocol that will be allowed on those port range.

Here’s an example of inbound rules:

<table>
<colgroup>
<col />
<col />
<col />
<col />
</colgroup>
<tbody>
<tr className="odd">
<td><p>Port range</p></td>
<td><p>Source</p></td>
<td><p>Protocol</p></td>
<td><p>Comment</p></td>
</tr>
<tr className="even">
<td><p>80</p></td>
<td><p>10.0.0.0/16</p></td>
<td><p>tcp</p></td>
<td><p>Allow HTTP requests from within the VPC</p></td>
</tr>
<tr className="odd">
<td><p>443</p></td>
<td><p>10.0.0.0/16</p></td>
<td><p>tcp</p></td>
<td><p>Allow HTTPS requests from within the VPC</p></td>
</tr>
<tr className="even">
<td><p>4000 - 5000</p></td>
<td><p>sg-abcd1234</p></td>
<td><p>tcp</p></td>
<td><p>Open a range of ports (e.g., for debugging) to another security group with ID <code>sg-abcd1234</code></p></td>
</tr>
</tbody>
</table>

And here’s an example of outbound rules:

<table>
<colgroup>
<col />
<col />
<col />
<col />
</colgroup>
<tbody>
<tr className="odd">
<td><p>Port range</p></td>
<td><p>Destination</p></td>
<td><p>Protocol</p></td>
<td><p>Comment</p></td>
</tr>
<tr className="even">
<td><p>443</p></td>
<td><p>0.0.0.0/0</p></td>
<td><p>tcp</p></td>
<td><p>Allow all outbound requests over HTTPS so you can talk to the public Internet</p></td>
</tr>
</tbody>
</table>

Note that every VPC has a
_[Default Security Group](https://docs.aws.amazon.com/vpc/latest/userguide/VPC_SecurityGroups.html#DefaultSecurityGroup)_
that will be used if you don’t specify any other security group for your resources. We recommend always attaching a
custom security group with rules that exactly match your use case, rather than relying on this default, global one.


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Local File Copier","hash":"dd515606c300d1047309fcf30da036b0"}
##DOCS-SOURCER-END -->

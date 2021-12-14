# Use a VPC to lock down deploy server

Run your infrastructure deployment workloads in a [Virtual Private Cloud (VPC)](https://aws.amazon.com/vpc/) to isolate
the workloads in a restricted network topology (see [How to deploy a production-grade VPC on AWS](../../4-vpc/0-intro/0-what-youll-learn-in-this-guide.md) for more information on VPCs). Configure it to run all workloads in private
subnets that are not publicly accessible. Make sure to block all inbound internet access and consider blocking all
outbound access except for the minimum required (e.g, allow access to AWS APIs).


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Local File Copier","hash":"7e87dc0cbd05a78a60ab1180db6b5573"}
##DOCS-SOURCER-END -->

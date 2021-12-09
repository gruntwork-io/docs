# Use a VPC to lock down deploy server

Run your infrastructure deployment workloads in a [Virtual Private Cloud (VPC)](https://aws.amazon.com/vpc/) to isolate
the workloads in a restricted network topology (see [How
to deploy a production-grade VPC on AWS](/guides/build-it-yourself/2-vpc/stub.md) for more information on VPCs). Configure it to run all workloads in private
subnets that are not publicly accessible. Make sure to block all inbound internet access and consider blocking all
outbound access except for the minimum required (e.g, allow access to AWS APIs).

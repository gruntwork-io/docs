# Networking

The networking section involves a paltry four recommendations. We don’t consider this section to be sufficient
to ensure a secure networking configuration. For a deeper dive, refer to Gruntwork’s
[How to deploy a
production-grade VPC on AWS](https://gruntwork.io/guides/networking/how-to-deploy-production-grade-vpc-aws/) guide, which includes recommendations for segmentation using network ACLs,
security groups, and remote access. Moreover, our [Reference
Architecture](https://gruntwork.io/reference-architecture/) can get you up and running with a secure network configuration immediately.

Recommendation 5.1 requires that you use Network ACL rules to block all access to the remote server administration ports, such as SSH to port 22 and Remote
Desktop to port 3389, by default. You can then add additional NACL rules to allow remote admin access, but only from specific CIDR blocks. Recommendation 5.2 similarly allows you to allow remote admin access from specific CIDR blocks in your Security Groups. Note that allowing remote admin access from all IPs (`0.0.0.0/0`) is NOT allowed, so instead, if you require SSH or Remote Desktop to your cloud resources, provide a more restricted CIDR
range, such as the IP addresses of your offices.

To meet recommendation 5.3, run the [`cloud-nuke defaults-aws`](https://github.com/gruntwork-io/cloud-nuke) command
to remove the rules from all default security groups. Note that it isn’t possible to actually delete the default
security group, so instead the command deletes the rules, eliminating the risk of something being mistakenly exposed.

Finally, for recommendation 5.4, the guidance is straightforward: when creating peering connections between VPCs, do not
create routes for subnets that don’t need them. In other words, only create routes between subnets that need them based
on the services running on those subnets. This can help to avoid exposing services between networks unnecessarily.

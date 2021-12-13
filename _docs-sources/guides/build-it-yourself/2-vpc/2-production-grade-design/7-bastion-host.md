# Bastion host

Since all of your application servers and data stores are in private subnets, they are not accessible from the public
Internet. So what do you do if you need to access them? For example, you might need to SSH to an application server to
troubleshoot something, or connect to a database to run queries, or access an internal URL for testing.

One solution is to deploy a _bastion host_, which is a single, highly locked-down server that you expose to the public
Internet. You could then connect to the bastion host over SSH or VPN, and once connected, you would be "in the network"
and able to access other resources within your VPC. It’s easier to secure and harden a single server than a whole
fleet of them: for example, you could configure the bastion host to run a CIS-hardened Linux distro, install file
integrity monitoring and intrusion prevention software, disallow any new software to be installed, log all activity on
the server, lock down all ports (except SSH and/or VPN), rebuild and redeploy the server daily, and so on. Check out
the `How to deploy a production-grade bastion host on AWS` guide _(coming soon!)_ for full details on bastion hosts.

Other solutions that can work with resources in private subnets include
[EC2 Instance Connect](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/Connect-using-EC2-Instance-Connect.html),
which can allow you to SSH to EC2 Instances via a browser-based SSH client in the Amazon EC2 Console, and
[AWS Systems Manager Sessions](https://docs.aws.amazon.com/systems-manager/latest/userguide/session-manager.html), which
allow you to manage and connect to EC2 Instances via a custom protocol managed by AWS.

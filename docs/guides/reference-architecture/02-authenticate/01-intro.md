---
pagination_label: Authentication
title: Intro
---

# Authentication

In the last section, you got a basic [overview of the architecture](../01-overview/overview.md), including learning that there is
a variety of infrastructure deployed across multiple AWS accounts. In this section, you'll learn about authenticating
and connecting to all the resources in your AWS accounts:

* [Set up initial access](./02-setting-up-initial-access.md): If this is your first time using this infrastructure—that is,
  if Gruntwork just deployed and handed over the Reference Architecture to you—go through this section first!

* [Authenticate to the AWS Web Console](./03-authenticate-to-the-aws-web-console.md): Learn how to access each of your AWS
  accounts using a web browser. Since all the infrastructure is managed as code, you shouldn't be making many changes
  from the web console, but it's still useful for debugging, troubleshooting, learning, and looking at metrics, and logs.

* [Authenticate to AWS via the CLI](./04-authenticate-to-aws-via-the-cli.md): Learn how to access each of your AWS accounts
  from the command line. You'll need this to work with CLI tools such as the `aws`, `terraform`, `terragrunt`, and
  `packer`.

* [Authenticate to the VPN server](./06-authenticate-to-the-vpn-server.md): Just about all of the infrastructure is deployed
  in private subnets, so it is not accessible directly from the public Internet. To be able to SSH to an EC2 instance
  or connect to a database, you'll first need to get "inside" the networking by connecting to the VPN server.

* [Authenticate to EC2 Instances via SSH](./05-authenticate-to-ec2-instances-via-ssh.md): If you need to debug something on
  an EC2 instance, you'll need to connect over SSH.


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Local File Copier","hash":"0084de7a2d193494fe22e937115960bf"}
##DOCS-SOURCER-END -->

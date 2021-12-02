# Authenticate to the VPN server

For security reasons, just about everything runs in private subnets, which means they do not have a
public IP address, and cannot be reached directly from the public Internet. This reduces the "surface area" that
attackers can reach. Of course, we still need access into the VPCs, so we expose a single entrypoint into the network:
an [OpenVPN server](https://openvpn.net/).

The idea is that you use an OpenVPN client to connect to the OpenVPN server, which gets you "in" to the network, and
you can then connect to other resources in the account as if you were making requests from the OpenVPN server itself.

Here are the steps you'll need to take:

- [Authenticate to the VPN server](#authenticate-to-the-vpn-server)
  - [Install an OpenVPN client](#install-an-openvpn-client)
  - [Join the OpenVPN IAM group](#join-the-openvpn-iam-group)
  - [Use openvpn-admin to generate a configuration file](#use-openvpn-admin-to-generate-a-configuration-file)
  - [Connect to the OpenVPN server](#connect-to-the-openvpn-server)

## Install an OpenVPN client

There are free and paid OpenVPN clients available for most major operating systems:

- **OS X**: [Viscosity](https://www.sparklabs.com/viscosity/) or [Tunnelblick](https://tunnelblick.net/).
- **Windows**: [official client](https://openvpn.net/index.php/open-source/downloads.html).
- **Linux**: `apt-get install openvpn` or `yum install openvpn`.

## Join the OpenVPN IAM group

To get access to an OpenVPN server, your IAM user needs access to SQS queues used by that OpenVPN server. Since our
IAM users are defined in one AWS account (security) and the OpenVPN servers are defined in separate AWS accounts
(stage, prod, etc), that means you need to "switch" to the accounts with the OpenVPN servers by assuming an IAM role
that has access to the SQS queues in those accounts.

To be able to assume an IAM role, your IAM user needs to be part of an IAM group with the proper permissions, such as
`_account.xxx-full-access` or `_account.xxx-openvpn-users`, where `xxx` is the name of the account you want to access
(`stage`, `prod`, etc). See [Configure other IAM users](#configure-other-iam-users) for instructions on adding users to
IAM groups.

## Use openvpn-admin to generate a configuration file

To connect to an OpenVPN server, you need an OpenVPN configuration file, which includes a certificate that you can use
to authenticate. To generate this configuration file, do the following:

1. Install the latest [openvpn-admin binary](https://github.com/gruntwork-io/terraform-aws-openvpn/releases) for your OS.

1. [Authenticate to AWS via the CLI](#authenticate-to-aws-via-the-cli). You will need to assume an IAM role in the AWS
   account with the OpenVPN server you're trying to connect to. This IAM role must have access to the SQS queues used
   by OpenVPN server. Typically, the `allow-full-access-from-other-accounts` or
   `openvpn-server-allow-certificate-requests-for-external-accounts` IAM role is what you want.

1. Run `openvpn-admin request --aws-region <AWS REGION> --username <YOUR IAM USERNAME>`.

1. This will create your OpenVPN configuration file in the current folder.

1. Load this configuration file into your OpenVPN client.

## Connect to the OpenVPN server

To connect to the OpenVPN server, simply click the "Connect" button next to your configuration file in the OpenVPN
client! After a few seconds, you should be connected. You will now be able to access all the resources within the AWS
network (e.g., SSH to EC2 instances in private subnets) as if you were "in" the VPC itself.


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Local File Copier","hash":"985b6f48fa51298c5c3706c62cb6854c"}
##DOCS-SOURCER-END -->

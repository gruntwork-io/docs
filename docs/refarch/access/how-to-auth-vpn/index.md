# VPN Authentication

Most of the AWS resources that comprise the Reference Architecture run in private subnets, which means they do not have a public IP address, and cannot be reached directly from the public Internet. This reduces the "surface area" that attackers can reach. Of course, you still need access into the VPCs so we exposed a single entrypoint into the network: an [OpenVPN server](https://openvpn.net/).

## Install an OpenVPN client

There are free and paid OpenVPN clients available for most major operating systems. Popular options include:

1. OS X: [Viscosity](https://www.sparklabs.com/viscosity/) or [Tunnelblick](https://tunnelblick.net/).
1. Windows: [official client](https://openvpn.net/index.php/open-source/downloads.html).
1. Linux:

   ```bash title="Debian"
   apt-get install openvpn
   ```

   ```bash title="Redhat"
   yum install openvpn
   ```

## Join the OpenVPN IAM Group

Your IAM User needs access to SQS queues used by the OpenVPN server. Since IAM users are defined only in the security account, and the OpenVPN servers are defined in separate AWS accounts (stage, prod, etc), that means you need to authenticate to the accounts with the OpenVPN servers by assuming an IAM Role that has access to the SQS queues in those accounts.

To be able to assume an IAM Role, your IAM user needs to be part of an IAM Group with the proper permissions, such as `_account.xxx-full-access` or `_account.xxx-openvpn-users`, where `xxx` is the name of the account you want to access (stage, prod, etc). See [Configure other IAM users](/refarch/access/setup-auth/#configure-other-iam-users) for instructions on adding users to IAM Groups.

## Use openvpn-admin to generate a configuration file

To connect to an OpenVPN server, you need an OpenVPN configuration file, which includes a certificate that you can use to authenticate. To generate this configuration file, do the following:

1. Install the latest [`openvpn-admin binary`](https://github.com/gruntwork-io/terraform-aws-openvpn/releases) for your OS.

1. Authenticate to AWS via the CLI. You will need to assume an IAM Role in the AWS account with the OpenVPN server you're trying to connect to. This IAM Role must have access to the SQS queues used by OpenVPN server. Typically, the `allow-full-access-from-other-accounts` or `openvpn-server-allow-certificate-requests-for-external-accounts` IAM Role is what you want.

1. Run `openvpn-admin request --aws-region <AWS REGION> --username <YOUR IAM USERNAME>`.

1. This will create your OpenVPN configuration file in your current directory.

1. Load this configuration file into your OpenVPN client.

## Connect to one of your OpenVPN servers

To connect to an OpenVPN server in one of your app accounts (Dev, Stage, Prod), click the "Connect" button next to your configuration file in the OpenVPN client. After a few seconds, you should be connected. You will now be able to access all the resources within the AWS network (e.g., SSH to EC2 instances in private subnets) as if you were "in" the VPC itself.


<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "91ff031d4942093c0a2f574e1644bdd7"
}
##DOCS-SOURCER-END -->

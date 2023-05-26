# SSH to EC2 Instances

You can SSH to any of your EC2 Instances in the Reference Architecture in two different ways:

1. `ssh-grunt` (Recommended)
1. EC2 Key Pairs (For emergency / backup use only)

## `ssh-grunt` (Recommended)

[`ssh-grunt`](../../../reference/modules/terraform-aws-security/ssh-grunt/) is a tool developed by Gruntwork that automatically syncs user accounts from AWS IAM to your servers to allow individual developers to SSH onto EC2 instances using their own username and SSH keys.

In this section, you will learn how to SSH to an EC2 instance in your Reference Architecture using `ssh-grunt`. Every EC2 instance has `ssh-grunt` installed by default.

### Add users to SSH IAM Groups

When running `ssh-grunt`, each EC2 instance specifies from which IAM Groups it will allow SSH access, and SSH access with sudo permissions. By default, these IAM Group names are `ssh-grunt-users` and `ssh-grunt-sudo-users`, respectively. To be able to SSH to an EC2 instance, your IAM User must be added to one of these IAM Groups (see Configure other IAM Users for instructions).

### Upload your public SSH key

1. Authenticate to the AWS Web Console in the security account.
1. Go to your IAM User profile page, select the "Security credentials" tab, and click "Upload SSH public key".
1. Upload your public SSH key (e.g. `~/.ssh/id_rsa.pub`). Do NOT upload your private key.

### Determine your SSH username

Your username for SSH is typically the same as your IAM User name. However, if your IAM User name has special characters that are not allowed by operating systems (e.g., most punctuation is not allowed), your SSH username may be a bit different, as specified in the `ssh-grunt` [documentation](../../../reference/modules/terraform-aws-security/ssh-grunt/). For example:

1. If your IAM User name is `jane`, your SSH username will also be `jane`.
1. If your IAM User name is `jane@example.com`, your SSH username will be `jane`.
1. If your IAM User name is `_example.jane.doe`, your SSH username will be `example_jane_doe`.


### SSH to an EC2 instance

Since most EC2 instances in the Reference Architecture are deployed into private subnets, you won't be able to access them over the public Internet. Therefore, you must first connect to the VPN server. See [VPN Authentication](../how-to-auth-vpn/index.md) for more details.

Given that:

1.  Your IAM User name is jane.
1.  You've uploaded your public SSH key to your IAM User profile.
1.  Your private key is located at `/Users/jane/.ssh/id_rsa` on your local machine.
1.  Your EC2 Instance's IP address is 1.2.3.4.


First, add your SSH Key into the SSH Agent using the following command:

```bash
ssh-add /Users/jane/.ssh/id_rsa
```

Then, use this command to SSH to the EC2 Instance:

```bash
ssh jane@1.2.3.4
```

You should now be able to execute commands on the instance.

## EC2 Key Pairs (For emergency / backup use only)

When you launch an EC2 Instance in AWS, you can specify an EC2 Key Pair that can be used to SSH into the EC2 Instance. This suffers from an important problem: usually more than one person needs access to the EC2 Instance, which means you have to share this key with others. Sharing secrets of this sort is a security risk. Moreover, if someone leaves the company, to ensure they no longer have access, you'd have to change the Key Pair, which requires redeploying all of your servers.

As part of the Reference Architecture deployment, Gruntwork will create EC2 Key Pairs and put the private keys into AWS Secrets Manager. These keys are there only for emergency / backup use: e.g., if there's a bug in `ssh-grunt` that prevents you from accessing your EC2 instances. We recommend only giving a handful of trusted admins access to these Key Pairs.


<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "6dd716749e279fd1709bc1957390d47b"
}
##DOCS-SOURCER-END -->

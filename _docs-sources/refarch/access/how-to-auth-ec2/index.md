# SSH to EC2 Instances 
You can SSH to any of your EC2 Instances two different ways:
1. (Recommended) ssh-grunt
1. (For emergency / backup use only) EC2 Key Pairs

## (Recommended) ssh-grunt

Every EC2 instance has ssh-grunt installed, which allows you to manage SSH access using IAM Groups. Here's how it works:

1. Add users to SSH IAM Groups
1. Upload your public SSH key
1. Figure out your SSH username
1. Connect to VPN
1. SSH to an EC2 instance

## Add users to SSH IAM Groups

When running ssh-grunt, each EC2 instance specifies from which IAM Groups it will allow SSH access, and SSH access with sudo permissions. By default, these IAM Group names are ssh-grunt-users and ssh-grunt-sudo-users, respectively. To be able to SSH to an EC2 instance, your IAM User must be added to one of these IAM Groups (see Configure other IAM Users for instructions).

## Upload your public SSH key

1. Authenticate to the AWS Web Console in the security account.
1. Go to your IAM User profile page, select the "Security credentials" tab, and click "Upload SSH public key".
1. Upload your public SSH key (e.g. `~/.ssh/id_rsa.pub`). Do NOT upload your private key.

## Figure out your SSH username

Your username for SSH is typically the same as your IAM User name. However, if your IAM User name has special characters that are not allowed by operating systems (e.g., most puncuation is not allowed), your SSH username may be a bit different, as specified in the ssh-grunt documentation. For example:

1. If your IAM User name is josh, your SSH username will also be josh.
1. If your IAM User name is josh@gruntwork.io, your SSH username will be josh.
1. If your IAM User name is `_gruntwork.josh.padnick`, your SSH username will be `gruntwork_josh_padnick`.

## Connect to VPN

Since just about all the EC2 instances are deployed into public subnets, you won't be able to access them over the public Internet. Therefore, you must first connect to the VPN server.

## SSH to an EC2 instance

Let's assume that:

1.  Your IAM User name is josh.
1.  You've uploaded your public SSH key to your IAM User profile.
1.  Your private key is located at /Users/josh/.ssh/id_rsa on your local machine.
1.  Your EC2 Instance's IP address is 1.2.3.4.

Then you can SSH to the EC2 Instance as follows:

# Do this once to load your SSH Key into the SSH Agent
`ssh-add /Users/josh/.ssh/id_rsa`

# Every time you want to login to an EC2 Instance, use this command
`ssh josh@1.2.3.4`

(For emergency / backup use only) EC2 Key Pairs

When you launch an EC2 Instance in AWS, you can specify an EC2 Key Pair that can be used to SSH into the EC2 Instance. This suffers from an important problem: usually more than one person needs access to the EC2 Instance, which means you have to share this key with others. Sharing secrets of this sort is a security risk. Moreover, if someone leaves the company, to ensure they no longer have access, you'd have to change the Key Pair, which requires redeploying all of your servers.

As part of the Reference Architecture deployment, Gruntwork will create EC2 Key Pairs and put the private keys into AWS Secrets Manager. These keys are there only for emergency / backup use: e.g., if there's a bug in ssh-grunt that prevents you from accessing your EC2 instances. We recommend only giving a handful of trusted admins access to these Key Pairs.

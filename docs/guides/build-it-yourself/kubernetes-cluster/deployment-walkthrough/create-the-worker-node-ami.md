# Create the worker node AMI

The next step is to create the Amazon Machine Image (AMI) that will run on each worker node. We recommend using the
[Amazon EKS-Optimized AMI](https://docs.aws.amazon.com/eks/latest/userguide/eks-optimized-ami.html) as the base and
installing other tooling you need (e.g., server-hardening, monitoring, log aggregation, etc.) on top of it.

Create a [Packer](https://www.packer.io) template in called `eks-node.json` in your `infrastructure-modules` repo:

```
infrastructure-modules
  └ networking
    └ vpc-mgmt
    └ vpc-app
  └ services
    └ eks-cluster
      └ packer
        └ eks-node.json
      └ main.tf
      └ dependencies.tf
      └ outputs.tf
      └ variables.tf
```

Here’s what `eks-node.json` should look like:

```json title=infrastructure-modules/services/eks-cluster/packer/eks-node.json
{
  "variables": {
    "aws_region": "us-east-2",
    "github_auth_token": "{{env `GITHUB_OAUTH_TOKEN`}}",
    "kubernetes_version": "1.13"
  },
  "builders": [
    {
      "ami_name": "eks-cluster-instance-{{isotime | clean_ami_name}}",
      "ami_description": "An Amazon EKS-optimized AMI that is meant to be run as part of an EKS cluster.",
      "instance_type": "t2.micro",
      "region": "{{user `aws_region`}}",
      "type": "amazon-ebs",
      "source_ami_filter": {
        "filters": {
          "virtualization-type": "hvm",
          "architecture": "x86_64",
          "name": "amazon-eks-node-{{user `kubernetes_version`}}-v*",
          "root-device-type": "ebs"
        },
        "owners": ["602401143452"],
        "most_recent": true
      },
      "ssh_username": "ec2-user",
      "encrypt_boot": false
    }
  ],
  "provisioners": [
    {
      "type": "shell",
      "inline": [
        "echo 'Sleeping for 30 seconds to give the AMIs enough time to initialize (otherwise, packages may fail to install).'",
        "sleep 30",
        "echo 'Installing AWS CLI'",
        "sudo yum update -y && sudo yum install -y aws-cli unzip perl-Digest-SHA jq"
      ]
    },
    {
      "type": "shell",
      "inline": "curl -Ls https://raw.githubusercontent.com/gruntwork-io/gruntwork-installer/master/bootstrap-gruntwork-installer.sh | bash /dev/stdin --version v0.0.22"
    },
    {
      "type": "shell",
      "inline": [
        "gruntwork-install --module-name 'bash-commons' --repo 'https://github.com/gruntwork-io/bash-commons' --tag 'v0.1.2'",
        "gruntwork-install --module-name 'eks-scripts' --repo 'https://github.com/gruntwork-io/terraform-aws-eks' --tag 'v0.6.0'",
        "gruntwork-install --module-name 'metrics/cloudwatch-memory-disk-metrics-scripts' --repo https://github.com/gruntwork-io/module-aws-monitoring --tag 'v0.13.2'",
        "gruntwork-install --module-name 'logs/syslog' --repo https://github.com/gruntwork-io/module-aws-monitoring --tag 'v0.13.2'",
        "gruntwork-install --module-name 'auto-update' --repo https://github.com/gruntwork-io/module-security --tag 'v0.18.1'",
        "gruntwork-install --module-name 'fail2ban' --repo https://github.com/gruntwork-io/module-security --tag 'v0.18.1'",
        "gruntwork-install --module-name 'ntp' --repo https://github.com/gruntwork-io/module-security --tag 'v0.18.1'",
        "gruntwork-install --module-name 'ip-lockdown' --repo https://github.com/gruntwork-io/module-security --tag 'v0.18.1'",
        "gruntwork-install --binary-name 'ssh-grunt' --repo https://github.com/gruntwork-io/module-security --tag 'v0.18.1'",
        "sudo /usr/local/bin/ssh-grunt iam install --iam-group ssh-grunt-users --iam-group-sudo ssh-grunt-sudo-users --role-arn arn:aws:iam::111122223333:role/allow-ssh-grunt-access-from-other-accounts"
      ],
      "environment_vars": ["GITHUB_OAUTH_TOKEN={{user `github_auth_token`}}"]
    }
  ]
}
```

:::caution

You must be a <span className="js-subscribe-cta">Gruntwork subscriber</span> to access the `terraform-aws-eks`,
`module-aws-monitoring`, and `module-security` repos used in the Packer template above.

:::

This Packer template installs the following on top of the EKS-optimized AMI base image:

- [bash-commons](https://github.com/gruntwork-io/bash-commons): A collection of reusable Bash functions for handling
  common tasks such as logging, assertions, string manipulation, and more. It’s used by some of the other tooling below.

- [eks-scripts](https://github.com/gruntwork-io/terraform-aws-eks/tree/master/modules/eks-scripts): A script that takes
  the labels on a worker node EC2 instance and converts them to a format that can be passed to the EKS bootstrap script
  so that those tags show up as labels in Kubernetes.

- [cloudwatch-agent](https://github.com/gruntwork-io/terraform-aws-monitoring/tree/master/modules/agents/cloudwatch-agent):
  Send memory and disk usage metrics for your EC2 Instances to CloudWatch. These metrics are not available by default
  as they are only visible from inside a VM.

- [syslog](https://github.com/gruntwork-io/module-aws-monitoring/tree/master/modules/logs/syslog): Configure log rotation
  and rate limiting for syslog.

- [auto-update](https://github.com/gruntwork-io/module-security/tree/master/modules/auto-update): Configure a Linux
  server to automatically install critical security updates on a nightly basis.

- [fail2ban](https://github.com/gruntwork-io/module-security/tree/master/modules/fail2ban): Configure a Linux server to
  automatically ban malicious ip addresses from connecting to the server via SSH.

- [ntp](https://github.com/gruntwork-io/module-security/tree/master/modules/ntp): Install and configure NTP on a Linux
  server to prevent clock drift.

- [ip-lockdown](https://github.com/gruntwork-io/module-security/tree/master/modules/ip-lockdown): Lock down specified IP
  addresses so only certain OS users can access them. Primarily used to lock down the EC2 instance metadata endpoint
  (and therefore, the IAM role attached to the EC2 instance) so that it can only be accessed by specific users (e.g.,
  only `root`).

- [ssh-grunt](https://github.com/gruntwork-io/module-security/tree/master/modules/ssh-grunt): Allow managing SSH access
  to EC2 instances using IAM. Developers you add to specific IAM groups will be able to SSH to specific servers using
  their own username and SSH key.

To build an AMI from this Packer template, you run:

```bash
packer build eks-node.json
```

Packer will output the ID of the AMI at the end of the build. Copy this AMI down so you can deploy it later in this
guide.


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Local File Copier","hash":"e5f9d652cc31940ba66f4a28616a859c"}
##DOCS-SOURCER-END -->

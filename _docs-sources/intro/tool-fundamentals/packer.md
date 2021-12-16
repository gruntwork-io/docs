# Packer

[Packer](https://www.packer.io) is an open source tool you can use to define _machine images_ (e.g., VM
images, Docker images) as code. For example, here is how you can use Packer to define an Ubuntu 18.04 [Amazon Machine Image (AMI)](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AMIs.html) that has Node.js installed:

```json
{
  "builders": [{
    "type": "amazon-ebs",
    "region": "us-east-2",
    "source_ami": "ami-0c55b159cbfafe1f0",
    "instance_type": "t2.micro",
    "ssh_username": "ubuntu",
    "ami_name": "packer-example-{{timestamp}}"
  }],
  "provisioners": [{
    "type": "shell",
    "inline": [
      "curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -",
      "sudo apt-get update -y",
      "sudo apt-get install -y nodejs"
    ]
  }]
}
```

You can run `packer build packer-example.json` to build an AMI from this code and then deploy this AMI to your AWS
account using other tools. For example, the Gruntwork Infrastructure as Code Library contains several Terraform modules that can
deploy AMIs across one or more servers (e.g., into an AWS Auto Scaling Group), with support for auto scaling, auto
healing, zero-downtime deployments, etc.

The Gruntwork Infrastructure as Code Library contains a number of scripts and binaries that you can run on your servers: e.g., the
ELK code includes scripts you run during boot on Elasticsearch servers to bootstrap the cluster, and the security code
includes an `ssh-grunt` binary you can run on each server to manage SSH access to that server using IAM groups (i.e.,
IAM users in specific IAM groups will be able to SSH to specific servers using their own usernames and SSH keys).

To get these scripts and binaries onto your virtual servers (e.g., onto EC2 instances in AWS), we recommend using Packer to build VM images that have these scripts and binaries installed. You'll see an
example of how to do this in [How to use the Gruntwork Infrastructure as Code Library](https://gruntwork.io/guides/foundations/how-to-use-gruntwork-infrastructure-as-code-library/#how_to_use_the_catalog). Note that Gruntwork Infrastructure as Code Library does NOT require that
you use Packer (e.g., you could also use Ansible or Chef to install the scripts and binaries), but the Gruntwork
Reference Architecture does use Packer as one of its opinionated tools.

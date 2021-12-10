# Configure the worker node User Data script

Now that you know what will be installed on each worker node AMI, you can fill in the User Data script that each worker
node will run on boot. Create `user-data.sh` in your `infrastructure-modules` repo:

```bash
infrastructure-modules
  └ networking
    └ vpc-mgmt
    └ vpc-app
  └ services
    └ eks-cluster
      └ packer
        └ eks-node.json
      └ user-data
        └ user-data.sh
      └ main.tf
      └ dependencies.tf
      └ outputs.tf
      └ variables.tf
```

Here’s what `user-data.sh` should look like:

```bash title=infrastructure-modules/services/eks-cluster/user-data/user-data.sh
#!/bin/bash

set -e

# Send the log output from this script to user-data.log, syslog, and the console
# From: https://alestic.com/2010/12/ec2-user-data-output/
exec > >(tee /var/log/user-data.log|logger -t user-data -s 2>/dev/console) 2>&1

function start_fail2ban {
  echo "Starting fail2ban"
  /etc/user-data/configure-fail2ban-cloudwatch/configure-fail2ban-cloudwatch.sh --cloudwatch-namespace Fail2Ban
}

function start_cloudwatch_logs_agent {
  local -r vpc_name="$1"
  local -r log_group_name="$2"

  echo "Starting CloudWatch Logs Agent in VPC $vpc_name"
  /etc/user-data/cloudwatch-log-aggregation/run-cloudwatch-logs-agent.sh \
    --vpc-name "$vpc_name" \
    --log-group-name "$log_group_name"
}

function configure_eks_instance {
  local -r aws_region="$1"
  local -r eks_cluster_name="$2"
  local -r eks_endpoint="$3"
  local -r eks_certificate_authority="$4"
  local -r vpc_name="$5"
  local -r log_group_name="$6"

  start_cloudwatch_logs_agent "$vpc_name" "$log_group_name"
  start_fail2ban

  echo "Running eks bootstrap script to register instance to cluster"
  local -r node_labels="$(map-ec2-tags-to-node-labels)"
  /etc/eks/bootstrap.sh \
    --apiserver-endpoint "$eks_endpoint" \
    --b64-cluster-ca "$eks_certificate_authority" \
    --kubelet-extra-args "--node-labels=\"$node_labels\"" \
    "$eks_cluster_name"

  echo "Locking down the EC2 metadata endpoint so only the root and default users can access it"
  /usr/local/bin/ip-lockdown 169.254.169.254 root ec2-user
}

# These variables are set by Terraform interpolation
configure_eks_instance "${aws_region}" "${eks_cluster_name}" "${eks_endpoint}" "${eks_certificate_authority}" "${vpc_name}" "${log_group_name}"
```

The User Data script above does the following:

- Starts the CloudWatch Logs Agent so that logs from the EC2 instance (especially syslog) are sent to CloudWatch Logs.

- Starts `fail2ban` to protect the instance against malicious SSH attempts.

- Runs the EKS bootstrap script to register the instance in the cluster.

- Run `ip-lockdown` to lock down the EC2 metadata endpoint so only the `root` and `ec2-user` users can access it.

Note that at the bottom of `user-data.sh`, there are some variables that are supposed to be filled in by Terraform
interpolation. How does that work? When you configured the worker nodes earlier in this guide, you set the
`cluster_instance_user_data` parameter to a `template_file` data source that didn’t yet exist; well, this is what’s
going to provide the variables via interpolation! Add the `template_file` data source as follows:

```hcl title=infrastructure-modules/services/eks-cluster/main.tf
data "template_file" "user_data" {
  template = file("${path.module}/user-data/user-data.sh")

  vars = {
    aws_region                = var.aws_region
    eks_cluster_name          = var.cluster_name
    eks_endpoint              = module.eks_cluster.eks_cluster_endpoint
    eks_certificate_authority = module.eks_cluster.eks_cluster_certificate_authority
    vpc_name                  = var.vpc_name
    log_group_name            = var.cluster_name
  }
}
```

# Configure access to the control plane and worker nodes

If you want to make the control plane accessible outside of the cluster itself, you can add additional security group
rules. For example, here is how you can make it possible to connect to the control plane from a VPN server:

```hcl title=infrastructure-modules/services/eks-cluster/main.tf
resource "aws_security_group_rule" "openvpn_server_control_plane_access" {
  type                     = "ingress"
  from_port                = 443
  to_port                  = 443
  protocol                 = "tcp"
  security_group_id        = module.eks_cluster.eks_master_security_group_id
  # Replace <SECURITY_GROUP_ID> with the ID of a security group from which SSH access should be allowed. E.g., If you
  # are running a VPN server, you could use a terraform_remote_state data source to fetch its security group ID and
  # fill it in here.
  source_security_group_id = "<VPN_SECURITY_GROUP_ID>"
}
```

Note that if the VPN server is in another VPC (e.g., a management VPC), you will need to add DNS forwarding rules in
order for the VPN server to be able to resolve the private domain name of the EKS cluster. You can add these rules
using the
[vpc-dns-forwarder-rules module](https://github.com/gruntwork-io/module-vpc/tree/master/modules/vpc-dns-forwarder-rules)
from `terraform-aws-eks`:

```hcl title=infrastructure-modules/services/eks-cluster/main.tf
module "dns_forwarder_rule" {
  # Make sure to replace <VERSION> in this URL with the latest terraform-aws-eks release
  source = "git::git@github.com:gruntwork-io/module-vpc.git//modules/vpc-dns-forwarder-rules?ref=<VERSION>"

  vpc_id                                        = data.terraform_remote_state.mgmt_vpc.outputs.vpc_id
  origin_vpc_route53_resolver_endpoint_id       = data.terraform_remote_state.vpc.outputs.origin_vpc_route53_resolver_endpoint_id
  destination_vpc_route53_resolver_primary_ip   = data.terraform_remote_state.vpc.outputs.destination_vpc_route53_resolver_primary_ip
  destination_vpc_route53_resolver_secondary_ip = data.terraform_remote_state.vpc.outputs.destination_vpc_route53_resolver_secondary_ip

  num_endpoints_to_resolve = 1
  endpoints_to_resolve = [
    # endpoint returned here is of the form https://DOMAIN. We want just the domain, so we chop off the https
    replace(lower(module.eks_cluster.eks_cluster_endpoint), "https://", ""),
  ]
}
```

Note that this code pulls in the ID of the management VPC via a `terraform_remote_state` data source:

```hcl title=infrastructure-modules/services/eks-cluster/dependencies.tf
data "terraform_remote_state" "mgmt_vpc" {
  backend = "s3"
  config = {
    region = var.terraform_state_aws_region
    bucket = var.terraform_state_s3_bucket
    key    = "${var.aws_region}/mgmt/vpc/terraform.tfstate"
  }
}
```

If you want to be able to SSH to the worker nodes (e.g., for debugging), you can update the worker nodes security group
to allow SSH access from specific IPs or security groups:

```hcl title=infrastructure-modules/services/eks-cluster/main.tf
resource "aws_security_group_rule" "allow_inbound_ssh" {
  type                     = "ingress"
  from_port                = 22
  to_port                  = 22
  protocol                 = "tcp"
  security_group_id        = module.eks_workers.eks_worker_security_group_id
  # Replace <SECURITY_GROUP_ID> with the ID of a security group from which SSH access should be allowed. E.g., If you
  # are running a VPN server, you could use a terraform_remote_state data source to fetch its security group ID and
  # fill it in here.
  source_security_group_id = "<VPN_SECURITY_GROUP_ID>"
}
```

If you’re using [ssh-grunt](https://github.com/gruntwork-io/module-security/tree/master/modules/ssh-grunt) from
`module-security` to manage SSH access with IAM groups, you’ll need to give the worker nodes IAM permissions to talk to
IAM. You can do this using the
[iam-policies](https://github.com/gruntwork-io/module-security/tree/master/modules/iam-policies) module from
`module-security`:

```hcl title=infrastructure-modules/services/eks-cluster/main.tf
module "iam_policies" {
  # Make sure to replace <VERSION> in this URL with the latest terraform-aws-eks release
  source = "git::git@github.com:gruntwork-io/module-security.git//modules/iam-policies?ref=<VERSION>"

  aws_account_id = var.aws_account_id

  # ssh-grunt is an automated app, so we can't use MFA with it
  iam_policy_should_require_mfa   = false
  trust_policy_should_require_mfa = false

  # If your IAM users are defined in a separate AWS account (e.g., a security account), you can pass in the ARN of
  # of that account via an input variable, and the IAM policy will give the worker nodes permission to assume that
  # IAM role
  allow_access_to_other_account_arns = [var.external_account_ssh_grunt_role_arn]
}

resource "aws_iam_role_policy" "ssh_grunt_permissions" {
  name   = "ssh-grunt-permissions"
  role   = module.eks_workers.eks_worker_iam_role_name
  policy = module.iam_policies.allow_access_to_other_accounts[0]
}
```


<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "985bfb828a22c317d6b029d2afb50f13"
}
##DOCS-SOURCER-END -->

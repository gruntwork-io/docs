---
title: "Sample Usage"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="OpenTofu/Terraform Modules for AWS Networking & Content Delivery" version="0.28.10" />

# Sample Usage

<a href="https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.28.10/modules/tailscale-subnet-router" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases?q=tailscale-subnet-router" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

```hcl
terraform {
  required_version = "1.5.7"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.26"
    }
  }
}

data "aws_availability_zones" "azs" { state = "available" }
data "aws_region" "current" {}

# Sample three-tier VPC setup with public, private, and isolated subnets
module "vpc" {
  source = "../../modules/vpc"

  vpc_settings               = { cidr_block = "10.0.0.0/16" }
  internet_gateways_settings = { enable_internet_gateway = true }
}
module "subnets" {
  source = "../../modules/vpc-subnet"

  vpc_id = module.vpc.vpc.id
  subnets_settings = {
    publicAZ1 = {
      cidr_block        = "10.0.0.0/20",
      availability_zone = data.aws_availability_zones.azs.names[0],
    }
    publicAZ2 = {
      cidr_block        = "10.0.16.0/20",
      availability_zone = data.aws_availability_zones.azs.names[1],
    }
    privateAZ1 = {
      cidr_block        = "10.0.112.0/20",
      availability_zone = data.aws_availability_zones.azs.names[0],
    }
    privateAZ2 = {
      cidr_block        = "10.0.128.0/20",
      availability_zone = data.aws_availability_zones.azs.names[1],
    }
    isolatedAZ1 = {
      cidr_block        = "10.0.208.0/20",
      availability_zone = data.aws_availability_zones.azs.names[0],
    }
    isolatedAZ2 = {
      cidr_block        = "10.0.224.0/20",
      availability_zone = data.aws_availability_zones.azs.names[1],
    }
  }
  routing_tables_settings = {
    "public"     = { associate_with = ["publicAZ1", "publicAZ2"] }
    "isolated"   = { associate_with = ["isolatedAZ1", "isolatedAZ2"] }
    "privateAZ1" = { associate_with = ["privateAZ1"] }
    "privateAZ2" = { associate_with = ["privateAZ2"] }
  }
  nat_gateways_settings = {
    public = {
      "NATaz1" = { subnet = "publicAZ1" }
      "NATaz2" = { subnet = "publicAZ2" }
    }
  }
}
module "endpoints" {
  source = "../../modules/vpc-subnet-endpoint"

  endpoint_settings = {
    "ssm" = {
      vpc_endpoint_type = "Interface"
      vpc_id            = module.vpc.vpc.id
      service_name      = "com.amazonaws.${data.aws_region.current.id}.ssm"
      subnets = {
        "isolatedAZ1" = { "id" = module.subnets.subnets["isolatedAZ1"].id }
        "isolatedAZ2" = { "id" = module.subnets.subnets["isolatedAZ2"].id }
      }
      security_groups_settings = {
        security_group_rules = {
          ingress = {
            allowHTTPs = {
              cidr_ipv4   = module.vpc.vpc.ipv4_cidr_block
              from_port   = 443
              to_port     = 443
              ip_protocol = "tcp"
            }
          }
          egress = {
            allowALL = {
              cidr_ipv4   = "0.0.0.0/0"
              ip_protocol = "-1"
            }
          }
        }
      }
    }
    "ssmmessages" = {
      vpc_endpoint_type = "Interface"
      vpc_id            = module.vpc.vpc.id
      service_name      = "com.amazonaws.${data.aws_region.current.id}.ssmmessages"
      subnets = {
        "isolatedAZ1" = { "id" = module.subnets.subnets["isolatedAZ1"].id }
        "isolatedAZ2" = { "id" = module.subnets.subnets["isolatedAZ2"].id }
      }
      security_groups_settings = {
        security_group_rules = {
          ingress = {
            allowHTTPs = {
              cidr_ipv4   = module.vpc.vpc.ipv4_cidr_block
              from_port   = 443
              to_port     = 443
              ip_protocol = "tcp"
            }
          }
          egress = {
            allowALL = {
              cidr_ipv4   = "0.0.0.0/0"
              ip_protocol = "-1"
            }
          }
        }
      }
    }
    "ec2messages" = {
      vpc_endpoint_type = "Interface"
      vpc_id            = module.vpc.vpc.id
      service_name      = "com.amazonaws.${data.aws_region.current.id}.ec2messages"
      subnets = {
        "isolatedAZ1" = { "id" = module.subnets.subnets["isolatedAZ1"].id }
        "isolatedAZ2" = { "id" = module.subnets.subnets["isolatedAZ2"].id }
      }
      security_groups_settings = {
        security_group_rules = {
          ingress = {
            allowHTTPs = {
              cidr_ipv4   = module.vpc.vpc.ipv4_cidr_block
              from_port   = 443
              to_port     = 443
              ip_protocol = "tcp"
            }
          }
          egress = {
            allowALL = {
              cidr_ipv4   = "0.0.0.0/0"
              ip_protocol = "-1"
            }
          }
        }
      }
    }
  }
}
module "routes_in_public_rt" {
  source = "../../modules/vpc-route"

  route_table_id = module.subnets.route_tables["public"].id
  routes = {
    RoutetoIGW = {
      destination_cidr_block = "0.0.0.0/0",
      gateway_id             = module.vpc.internet_gateway.id
    }
  }
}
module "routes_in_privateAZ1_rt" {
  source = "../../modules/vpc-route"

  route_table_id = module.subnets.route_tables["privateAZ1"].id
  routes = {
    RoutetoNAT = {
      destination_cidr_block = "0.0.0.0/0",
      nat_gateway_id         = module.subnets.public_nat_gateways["NATaz1"].id
    }
  }
}
module "routes_in_privateAZ2_rt" {
  source = "../../modules/vpc-route"

  route_table_id = module.subnets.route_tables["privateAZ2"].id
  routes = {
    RoutetoNAT = {
      destination_cidr_block = "0.0.0.0/0",
      nat_gateway_id         = module.subnets.public_nat_gateways["NATaz2"].id
    }
  }
}

module "tailscale_subnet_router" {
  source = "../../modules/tailscale-subnet-router"

  tailscale_auth_key = "<KEY_HERE>" # TODO replace with your Tailscale auth key
  network_settings = {
    subnet_ids_to_host_ts_router = [module.subnets.subnets["publicAZ1"].id, module.subnets.subnets["publicAZ2"].id]
    reachable_cidr_blocks        = ["10.0.0.0/8"]
  }
}

# Sample resources to demonstrate the use of subnets and routing
data "aws_ami" "ami" {
  most_recent = true
  owners      = ["amazon"]
  filter {
    name   = "architecture"
    values = ["arm64"]
  }
  filter {
    name   = "name"
    values = ["al2023-ami-2023*"]
  }
}
resource "random_string" "demo" {
  length  = 5
  special = false
  upper   = false
}

resource "aws_iam_role" "ec2_ssm_role" {
  name = "_ssm_role_ec2_${random_string.demo.result}"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Principal = {
          Service = "ec2.amazonaws.com"
        }
        Action = "sts:AssumeRole"
      }
    ]
  })
}
resource "aws_iam_role_policy_attachment" "ssm_core" {
  role       = aws_iam_role.ec2_ssm_role.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore"
}
resource "aws_iam_instance_profile" "ec2_ssm_profile" {
  name = "_ssm_role_ec2_${random_string.demo.result}"
  role = aws_iam_role.ec2_ssm_role.name
}

resource "aws_security_group" "ec2s" {
  name        = "_ec2-isolated-sg-${random_string.demo.result}"
  description = "Security group for EC2 instances in isolated subnets"
  vpc_id      = module.vpc.vpc.id

  # Allow all inbound traffic from the VPC CIDR block
  ingress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = [module.vpc.vpc.ipv4_cidr_block]
  }

  # Allow all outbound traffic
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_instance" "ec2s" {
  for_each = toset(["privateAZ1", "privateAZ2", "isolatedAZ1", "isolatedAZ2"])
  tags     = { Name = "TEST-${each.key}" }

  ami                    = data.aws_ami.ami.id
  instance_type          = "t4g.nano"
  iam_instance_profile   = aws_iam_instance_profile.ec2_ssm_profile.name
  subnet_id              = module.subnets.subnets[each.key].id
  vpc_security_group_ids = [aws_security_group.ec2s.id]
  user_data              = <<-EOF
              #!/bin/bash
              yum update -y
              yum install -y httpd
              systemctl start httpd.service
              systemctl enable httpd.service
              echo "Hello from $(hostname -f)" > /var/www/html/index.html
              EOF
}
```

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S TAILSCALE-SUBNET-ROUTER MODULE
#
# NOTE: This module uses some sensitive variables marked inline with "# SENSITIVE".
# When using values other than defaults for these variables, set them through environment variables or
# another secure method.
#
# ------------------------------------------------------------------------------------------------------

module "tailscale_subnet_router" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-vpc.git//modules/tailscale-subnet-router?ref=v0.28.10"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Network Settings. Please see the variable details for more information.
  network_settings = <object(
    subnet_ids_to_host_ts_router = list(string)
    reachable_cidr_blocks        = list(string)
  )>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # IAM Role Settings. Please see the variable details for more information.
  iam_role_settings = {}

  # Instance Settings. Please see the variable details for more information.
  instance_settings = {}

  # Launch Template Settings. Please see the variable details for more
  # information.
  launch_template_settings = {}

  # Security Group Settings. Please see the variable details for more
  # information.
  security_group_settings = {}

  # Tags to assign to all resources
  tags = {}

  # Tailscale auth key for device enrollment. EITHER this OR
  # ssm_param_arn_with_auth_key must be provided
  tailscale_auth_key = null # SENSITIVE

  # Tailscale settings. Please see the variable details for more information.
  tailscale_settings = {}

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S TAILSCALE-SUBNET-ROUTER MODULE
#
# NOTE: This module uses some sensitive variables marked inline with "# SENSITIVE".
# When using values other than defaults for these variables, set them through environment variables or
# another secure method.
#
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-vpc.git//modules/tailscale-subnet-router?ref=v0.28.10"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Network Settings. Please see the variable details for more information.
  network_settings = <object(
    subnet_ids_to_host_ts_router = list(string)
    reachable_cidr_blocks        = list(string)
  )>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # IAM Role Settings. Please see the variable details for more information.
  iam_role_settings = {}

  # Instance Settings. Please see the variable details for more information.
  instance_settings = {}

  # Launch Template Settings. Please see the variable details for more
  # information.
  launch_template_settings = {}

  # Security Group Settings. Please see the variable details for more
  # information.
  security_group_settings = {}

  # Tags to assign to all resources
  tags = {}

  # Tailscale auth key for device enrollment. EITHER this OR
  # ssm_param_arn_with_auth_key must be provided
  tailscale_auth_key = null # SENSITIVE

  # Tailscale settings. Please see the variable details for more information.
  tailscale_settings = {}

}


```

</TabItem>
</Tabs>

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.28.10/modules/tailscale-subnet-router/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.28.10/modules/tailscale-subnet-router/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.28.10/modules/tailscale-subnet-router/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "6a84eff57588826a1706d2cc9fc23a02"
}
##DOCS-SOURCER-END -->

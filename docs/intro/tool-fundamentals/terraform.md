# Terraform

[Terraform](https://www.terraform.io) is an open source _provisioning_ tool that allows you to define and manage a
wide variety of infrastructure (e.g., servers, load balancers, databases, network settings, and so on) as code across
a wide variety of _providers_ (e.g., AWS, GCP, Azure). For example, here's some example Terraform code you can use to
deploy an EC2 instance (a virtual server) running Ubuntu 18.04 into the `us-east-2` region of AWS:

```hcl
# Deploy to the us-east-2 region of AWS
provider "aws" {
  region = "us-east-2"
}

# Deploy an EC2 instance running Ubuntu 18.04
resource "aws_instance" "example" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "t2.micro"
}
```

You can deploy this server by running `terraform init` and then `terraform apply`. Check out our
[Comprehensive Guide to Terraform](https://blog.gruntwork.io/a-comprehensive-guide-to-terraform-b3d32832baca) for a
thorough introduction to the language.

A large percentage of the infrastructure code in the Gruntwork Infrastructure as Code Library is defined using Terraform. We even
wrote [the book](https://www.terraformupandrunning.com) on it!

## Terraform Cloud and Terraform Enterprise

[Terraform Cloud](https://www.terraform.io/docs/cloud/index.html) and [Terraform Enterprise](https://www.terraform.io/docs/enterprise/index.html) are HashiCorp’s commercial Terraform products. They include many additional features for Terraform, including plan and apply workflows with approvals, role-based access control for teams, policy as code using Sentinel, and more.

![](/img/intro/tool-fundamentals/tfc.png)

:::note We're compatible with TFC/TFE

The Gruntwork module library and open source tools are compatible with Terraform Cloud and Terraform Enterprise.

:::


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Local File Copier","hash":"35d2a05aaaf155d7193c065022234ada"}
##DOCS-SOURCER-END -->

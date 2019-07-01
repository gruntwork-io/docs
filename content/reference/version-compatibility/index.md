---
title: "Module Version Compatibility"
date: 2019-06-24
---

## Terraform Version Compatibility Chart

The following lists our Terraform packages and their compatibility with Terraform versions.

**NOTE**: If a package is not listed here, then either it does not contain any Terraform code (e.g., `gruntkms`) or it has not been updated for Terraform 0.12 compatibility yet.

<!-- This was generated using the Markdown Table Generator: https://www.tablesgenerator.com/markdown_tables -->

| IaC Package                                                                                      | Terraform 0.11.X   | Terraform 0.12.X |
|--------------------------------------------------------------------------------------------------|--------------------|------------------|
| [Terragrunt](https://github.com/gruntwork-io/terragrunt)                                         | <=v0.18.7          | >=v0.19.0        |
| [Terratest](https://github.com/gruntwork-io/terratest)                                           | ALL                | >=v0.15.8        |
| [package-terraform-utilities](https://github.com/gruntwork-io/package-terraform-utilities)       | <=v0.0.8           | >=v0.1.0         |
| [module-ci](https://github.com/gruntwork-io/module-ci)                                           | <=v0.13.16         | >=v0.14.0        |
| [module-security](https://github.com/gruntwork-io/module-security)                               | <=v0.16.6          | >=v0.17.0        |
| [module-cache](https://github.com/gruntwork-io/module-cache)                                     | <=v0.5.0           | >=v0.6.0         |
| [module-vpc](https://github.com/gruntwork-io/module-vpc)                                         | <=v0.5.8           | >=v0.6.0         |
| [module-server](https://github.com/gruntwork-io/module-server)                                   | <=v0.6.2           | >=v0.7.0         |
| [module-load-balancer](https://github.com/gruntwork-io/module-load-balancer)                     | <=v0.13.3          | >=v0.14.0        |
| [module-aws-monitoring](https://github.com/gruntwork-io/module-aws-monitoring)                   | <=v0.12.7          | >=v0.13.0        |
| [module-data-storage](https://github.com/gruntwork-io/module-data-storage)                       | <=v0.8.9           | >=v0.9.0         |
| [module-asg](https://github.com/gruntwork-io/module-asg)                                         | <=v0.6.26          | >=v0.7.0         |
| [module-ecs](https://github.com/gruntwork-io/module-ecs)                                         | <=v0.13.5          | >=v0.14.0        |
| [package-openvpn](https://github.com/gruntwork-io/package-openvpn)                               | <=v0.8.2           | >=v0.9.0         |
| [package-messaging](https://github.com/gruntwork-io/package-messaging)                           | <=v0.2.0           | >=v0.3.0         |
| [package-lambda](https://github.com/gruntwork-io/package-lambda)                                 | <=v0.5.1           | >=v0.6.0         |
| [package-sam](https://github.com/gruntwork-io/package-sam)                                       | <=v0.1.12          | >=v0.2.0         |
| [package-zookeeper](https://github.com/gruntwork-io/package-zookeeper)                           | <=v0.5.4           | >=v0.6.0         |
| [terraform-aws-couchbase](https://github.com/gruntwork-io/terraform-aws-couchbase)               | <=v0.1.5           | >=v0.2.0         |
| [terraform-aws-consul](https://github.com/hashicorp/terraform-aws-consul)                        | <=v0.6.1           | >=v0.7.0         |
| [terraform-kubernetes-helm](https://github.com/gruntwork-io/terraform-kubernetes-helm)           | <=v0.4.0           | >=v0.5.0         |
| [terraform-google-network](https://github.com/gruntwork-io/terraform-google-network)             | <=v0.1.2           | >=v0.2.0         |
| [terraform-google-load-balancer](https://github.com/gruntwork-io/terraform-google-load-balancer) | <=v0.1.2           | >=v0.2.0         |
| [terraform-google-sql](https://github.com/gruntwork-io/terraform-google-sql)                     | <=v0.1.1           | >=v0.2.0         |
| [terraform-google-static-assets](https://github.com/gruntwork-io/terraform-google-static-assets) | <=v0.1.1           | >=v0.2.0         |
| [terraform-google-gke](https://github.com/gruntwork-io/terraform-google-gke)                     | <=v0.2.0           | >=v0.3.0         |
| [terraform-google-consul](https://github.com/hashicorp/terraform-google-consul)                  | <=v0.3.2           | >=v0.4.0         |
| [terraform-google-vault](https://github.com/hashicorp/terraform-google-vault)                    | <=v0.1.3           | >=v0.2.0         |

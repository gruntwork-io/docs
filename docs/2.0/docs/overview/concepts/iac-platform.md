# IaC Platform Choice

Gruntwork's platform is designed for teams adopting OpenTofu and Terragrunt. Our products are compatible with all versions of OpenTofu and Hashicorp Terraform up to version `1.5.7` (the final open-source licensed version of Terraform). In some cases, we also provide support for other IaC platforms, including Kubernetes, Packer, Docker, and Pulumi.

Note that, at times, certain modules will use features only available in later versions of OpenTofu/Terraform, and in those circumstances, the module will pin a minimum version of OpenTofu/Terraform.

## Do I have to use Terragrunt?

Certain Gruntwork platform products, such as [Pipelines](/2.0/docs/pipelines/concepts/overview) and [Account Factory](/2.0/docs/accountfactory/concepts/), are explicitly built on Terragrunt features and therefore require organizations to use Terragrunt as part of their IaC platform. Other products, such as the [Library](/2.0/docs/library/concepts/overview), can be used with or without Terragrunt. 

While it is not mandatory, we generally recommend that Library customers adopt Terragrunt. Terragrunt has been specifically designed to address challenges in orchestrating OpenTofu at scale, and we can provide the most effective support to help you succeed when Terragrunt is part of your implementation.

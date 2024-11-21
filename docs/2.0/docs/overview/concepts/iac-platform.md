# IaC Platform Choice

Gruntwork's platform is built for teams adopting OpenTofu and Terragrunt. Our products will work with Hashicorp Terraform up to version `1.5.7` (the last open source licensed version of Terraform) and in some cases we offer support for other IaC platforms such as Kubernetes, Packer, Docker or Pulumi.

## Do I have to use Terragrunt?

Several Gruntwork platform products, such as [Pipelines](/2.0/docs/pipelines/concepts/overview) and [Account Factory](/2.0/docs/accountfactory/concepts/) are built explicitly on top of features of Terragrunt and thus require that organizations adopt Terragrunt as part of their IaC platform. Other products, such as the [Library](/2.0/docs/library/concepts/overview) can be used with or without Terragrunt.  We generally do advise Library customers to adopt Terragrunt, we have built Terragrunt specifically to solve problems related to orchestrating OpenTofu at scale and we can best help you achieve a successful implementation if you are using Terragrunt.
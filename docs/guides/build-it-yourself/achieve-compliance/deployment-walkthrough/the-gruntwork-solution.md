# The Gruntwork solution

Gruntwork offers infrastructure-as-code battle-tested modules that will help you create _production-grade_ infrastructure faster and much more efficiently than if you develop your modules from scratch. In the CIS compliance library, there are many core modules, and each one of them is "compliance-ready". They are configured in a way to help you achieve CIS compliance up to the latest supported benchmark, but still allow some flexibility in the setup.

The compliance library is known as "Gruntwork CIS Service Catalog" and it has its own standalone modules, or could be building on top of the existing standard & non-compliant core modules from the "Standard Service Catalog" or "Infrastructure as Code Library". Each of these modules can be used on their own, or within "wrappers" (explained later) by passing in the required inputs and using `terraform` or `terragrunt`.

The image below shows the hierarchy between the different levels of modules from the different code libraries Gruntwork offers.

![Types of CIS module relationships to avoid repetitive code and minimize the amount of extra work needed to achieve compliance.](/img/guides/build-it-yourself/achieve-compliance/cis-module-relationships.png)

Let’s unpack this a bit.

## Core modules

Core modules are broadly applicable and can be used with or without compliance requirements. For example,
the [`iam-groups`
core module](https://github.com/gruntwork-io/terraform-aws-security/blob/master/modules/iam-groups/README.md) creates a best practices set of IAM groups. The groups are configurable according to your needs.
You could, for example, choose to create a group with read-only access, another group with full administrator
access, and no other groups. All Gruntwork subscribers have access to the core modules, which reside in
Gruntwork’s [infrastructure as code repositories](https://gruntwork.io/repos).

## Standalone Compliance modules

The standalone compliance modules complement the modules available in the IaC Library. They have the CIS compliance requirements built right in and may combine multiple modules including Core modules for a
specific use case. For example, the [`cleanup-expired-certs` standalone module](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/tree/master/modules/security/cleanup-expired-certs) deploys a Lambda function that runs regularly and automatically removes all expired SSL/TLS certificates stored in AWS IAM in compliance with recommendation 1.19 of the CIS AWS Foundations Benchmark. These modules are in the [`terraform-aws-cis-service-catalog`
repository](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog) (accessible to Gruntwork Compliance subscribers).

## Compliance wrapper modules

The compliance wrapper modules are an extension of the IaC Library. They use the
[`source` argument in a Terraform module block](https://www.terraform.io/docs/modules/sources.html) to invoke
the core module with a configuration that is customized for compliance with the CIS AWS Foundations Benchmark.
These modules are in the [`terraform-aws-cis-service-catalog`
repository](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog) (accessible to Gruntwork Compliance subscribers).

## infrastructure-live

`infrastructure-live` uses [Terragrunt](https://github.com/gruntwork-io/terragrunt) to make it easier to
work with Terraform modules in multiple environments. `infrastructure-live` is optional - you can use all of the modules
with or without Terragrunt.

If you’re not using Terragrunt, you can use Terraform modules to call the compliance wrapper modules directly. Subscribers can refer to the
[Create your own service catalog section](https://github.com/gruntwork-io/terraform-aws-service-catalog/blob/master/core-concepts.md#create-your-own-service-catalog)
in the Gruntwork Service Catalog documentation for more information on how you might use `infrastructure-live`.

## Benefits

This modular, decomposed approach allows for maximum code reuse. The core modules can be used with or without
compliance, depending on how they are configured. The compliance wrappers are like shadows of the core
modules; they pass through most of the variables to the core modules without alteration, but hard code any
settings needed for compliance. When you call the compliance modules from your own code, you only need to set up any variables that are custom for your environment. Often
times the default settings are good enough.

You can use this approach on each AWS account. In many cases, you’ll only need compliance for production accounts, but the
same methodology can be applied to pre-production accounts as well.


<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "81acd02dda18bf32fb8caa79c4628c3c"
}
##DOCS-SOURCER-END -->

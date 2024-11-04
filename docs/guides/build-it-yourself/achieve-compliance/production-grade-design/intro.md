---
pagination_label: Production-grade Design
---

# Intro to Production-grade Design

In [core concepts](../core-concepts/intro.md) we discussed the basics of the AWS Foundations Benchmark. Although it's possible to achieve
compliance with the Benchmark by manually configuring each setting in the web console or entering the CLI commands, we
strongly discourage this approach. It precludes [the myriad benefits of using code to manage infrastructure](/2.0/docs/library/concepts/overview).

Instead, we advise using [Terraform](https://www.terraform.io) (or similar tools, such as
[CloudFormation](https://aws.amazon.com/cloudformation/) or [Pulumi](https://www.pulumi.com/) to configure cloud
resources programmatically. This section will cover the Terraform resources you can use to implement each of the
recommendations. We assume that you're familiar with the basics of Terraform. If you aren't, read our
[Introduction to Terraform blog post](https://blog.gruntwork.io/an-introduction-to-terraform-f17df9c6d180), or pick
up the [3rd
edition of Terraform Up & Running](https://medium.com/gruntwork/terraform-up-running-3rd-edition-is-now-published-4b99804d922a).


<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "18a8232d7ae48ad3c403db27db200815"
}
##DOCS-SOURCER-END -->

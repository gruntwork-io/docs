---
title: "Extending your Reference Architecture"
---

# Extending and modifying your Reference Architecture

Your Reference Architecture is delivered as a collection of IaC code. You will grow and evolve this codebase through out the lifetime of your cloud deployment. There are a few ways in which you can extend and modify your Reference Architecture:

- You can immediately add any off-the-shelf Gruntwork services.
- You can create your own services using any Gruntwork modules.
- You can build your own modules and combine them into your own services.

## Use Gruntwork's services

Gruntwork provides a [_catalog_ of services](/library/reference/) that can be added by directly referencing them in your terragrunt configuration. You can add these services to your architecture by creating references to them in the `_envcommon` directory, then each respective environment directory.

## Composing your own services

If Gruntwork doesn't already have the service you are looking you may be able to use our [modules](../../../2.0/docs/library/concepts/modules) and combine them into your own bespoke new services to accelerate your development of the functionality you need.

## Build your own modules

If Gruntwork doesn't have existing modules for the AWS services that you are trying to deploy, you can always [create and deploy your own modules](../../../2.0/docs/library/tutorials/deploying-your-first-gruntwork-module.md), compose them into your on bespoke services and add them to your Reference Architecture.


<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "b86acd94bd882dbca93ee7075b12c596"
}
##DOCS-SOURCER-END -->

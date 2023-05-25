---
title: "Extending your Reference Architecture"
---

# Extending and modifying your Reference Architecture

Your Reference Architecture is delivered as a collection of IaC code. You will grow and evolve this codebase through out the lifetime of your cloud deployment. There are a few ways in which you can extend and modify your Reference Architecture:

- You can immediately add any off-the-shelf Gruntwork services.
- You can create your own services using any Gruntwork modules.
- You can build your own modules and combine them into your own services.

## Use Gruntwork's services

Gruntwork provides a _catalog_ of services that can be added by directly referencing them in your terragrunt configuration. Check out the [Using a Service](/iac/usage/using-a-service) docs to learn how you can quickly start using our services in your own Reference Architecture.

## Composing your own services

If Gruntwork doesn't already have the service you are looking you may be able to use our [modules](/iac/overview/modules) and [combine them into your own bespoke new services](/iac/usage/composing-your-own-service) to accelerate your development of the functionality you need. Please check out how you can start [using modules](/iac/usage/using-a-module).

## Build your own modules

If Gruntwork doesn't have existing modules for the AWS services that you are trying to deploy, you can always [create your own modules](https://developer.hashicorp.com/terraform/language/modules/develop), compose them into your on bespoke services and add them to your Reference Architecture.

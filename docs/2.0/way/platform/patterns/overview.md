---
sidebar_position: 1
title: Overview
---

# Patterns

## What are patterns?

**Patterns are pre-built, opinionated solutions to common infrastructure problems.**

That definition might sound a little abstract, so here are some real-world examples of patterns:

- OpenTofu/Terraform modules
- Terragrunt stack definitions
- OPA policies
- Helm charts

The common theme among all patterns is that when a user goes to consume them, they are pre-built, they reflect the opinion of a subject matter expert, and they solve a common infrastructure problem.
Now let's go back to the definition of a pattern so we can understand that more deeply.
### Common infrastructure problems

_Patterns are pre-built, opinionated solutions to **common infrastructure problems.**_

Any DevOps challenge that requires subject matter expertise can be captured as a pattern. For example, all of the following are common DevOps problems that require some degree of subject matter expertise to solve:

- Building a standard network configuration
- Creating an Azure blob storage configuration
- Launching a Spring Boot app based on a starter template
- Launching an AWS Strands agent from a starter template
- Asserting a repeatable process for handling database recovery
- Creating an EKS service
- Creating a `conftest` policy that forbids public S3 buckets
- Defining a reusable Terragrunt unit to deploy a Lambda function
- Defining a Terragrunt Stack to deploy a Lambda-based application, including observability

It is said that DevOps is "broad and shallow," and as you can see in the list above, patterns can indeed span a wide range of areas.

We talk about patterns as a first-class concept because _creating standardized solutions to common problems is one of the most impactful investments you can make in velocity, governance, and maintainability._

In general, when you see a pattern that is likely to recur, it's worth building some kind of reusable solution for it.

### Pre-built, opinionated solutions

_Patterns are **pre-built, opinionated solutions** to common infrastructure problems._


A pattern is useful because it's _pre-built._ That is, when a developer goes to, say, launch an Azure Blob Container, they can move faster if their organization has already built a way to configure an Azure Blob Container. Now the developer can apply that pattern by entering some parameter values (e.g. container name, metadata, whether to enable versioning, etc.) without having to understand how the entire pattern works. Better yet, they can trust that they're automatically doing it "the right way."

A pattern is _opinionated_ because the mere act of writing it means you are asserting an opinion on how Azure Blob Containers should be configured at your organization. For example, maybe you always require blob versioning. That is an opinion and anyone who uses your Azure Blob Container pattern will always inherit that opinion.

Because patterns are opinionated, _who_ authored the pattern becomes important. This is because you only want to use patterns you _trust_. As a counterexample, would you blindly trust a network configuration pattern that ChatGPT generated for you? Hopefully not. But you would presumably trust such a pattern produced by your internal networking team.

## Next

Now that you understand what a pattern is, let's look at the different types of patterns that exist in practice.
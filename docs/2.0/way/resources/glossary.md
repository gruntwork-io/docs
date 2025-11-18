---
sidebar_position: 2
---

# Glossary

Here's the Gruntwork take on the most common terms we encounter in Platform Engineering and DevOps:

### Developer Platform

A Developer Platform is the collection of tools, methods, and services used to enable developers to quickly deploy the infrastructure they need using a standardized approach. It abstracts operational complexity so application teams can focus on building business value.

### DevOps Engineer

A DevOps engineer works within application teams to automate software delivery and manage the infrastructure needed to run their applications. They handle both building applications and operating the underlying systems.

### Platform Engineer

A Platform engineer builds internal developer platforms that provide standardized, self-service infrastructure tools across the organization. They abstract operational complexity so application teams can focus on building business value.

### DevOps vs. Platform Engineer

| | DevOps Engineer | Platform Engineer |
|--------|----------------|-------------------|
| **Scope** | Works within application teams | Works across the organization |
| **Focus** | Building and running specific applications | Building platforms that enable other teams |
| **Cognitive Load** | Carries operational burden for their applications | Reduces operational burden for all teams |
| **Output** | Ships applications and features | Ships platforms and tooling |
| **Primary Goal** | Make their team ship faster | Make all teams ship faster with less complexity |

### DevOps bankruptcy

When organizations wind up in some or all of these failure modes they may reach a breaking point we describe as **DevOps Bankruptcy**, a point at which starting fresh is often the better option because correcting the anti-patterns in their current infrastructure paradigm would be too costly.”

### Unit

Any company's infrastructure is made up of many component parts. We call the most basic component part a **unit of infrastructure** or just **unit** for short. For example, we consider one instance of one OpenTofu/Terraform module, one "unit." In fact, our open source IaC orchestrator [Terragrunt](https://terragrunt.gruntwork.io) uses this exact terminology!

### Stack

Companies often need to combine their [units](#unit) into common, repeated patterns. We call an opinionated combination of units a **stack.**
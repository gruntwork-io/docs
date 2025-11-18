---
sidebar_position: 1
title: Pre-built patterns are your leverage
---

# Pre-built patterns are your leverage

A small platform team can support hundreds or thousands of developers by offering a collection of pre-written, opinionated solutions to common DevOps problems, better known as **patterns.**

Any reusable opinion that can be expressed as code can qualify as a pattern. For example, one popular way to implement patterns among platform teams is to author OpenTofu/Terraform modules.

:::info
See more examples of [Patterns](/2.0/way/solution/patterns/overview).
:::

A pattern has both an _author_ and a _consumer._ The author is a DevOps subject matter expert (SME) of some kind. For example, a pattern author might be an SME in deploying Amazon RDS as a production-grade database. The author "codifies" all her expertise on deployment, monitoring, disaster recovery, gotchas and anything else that might be relevant into a reusable pattern.

The consumer is someone who has a problem that is solved by a given pattern. The consumer browses available patterns, selects the right one and then "consumes" the expertise of the SME by applying the pattern. A consumer who chooses a vetted pattern will typically get much higher velocity (no need to re-invent the wheel!) while getting governance and maintainability "for free."

It can be helpful to think of patterns as "mini products" within your developer platform. Each one should solve a real need, be easy to use, and get better over time based on feedback. When prioritizing patterns, start with the DevOps problems that your customers (app developers) request the most.

Patterns can be authored inhouse, or "vendored" from open source or commercial pattern libraries (like [Gruntwork IaC Library](https://docs.gruntwork.io/2.0/docs/library/concepts/overview)).


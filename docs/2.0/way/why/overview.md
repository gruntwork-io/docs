---
sidebar_position: 1
title: Overview
---

# Why Developer Platforms?

When companies write their own software with more than a few developers, they need to find a way to balance **three fundamental concerns**.

### 1. Velocity

**Velocity is how quickly you ship changes to production.**

Software teams add value by shipping new features that drive business impact. This applies to both:

- **Applications** - Launching new customer-facing or internal features
- **Infrastructure** - Launching or updating infrastructure to support applications


### 2. Governance

**Governance is how you protect your business and customers.**

Every time you ship a change, you need to answer critical questions like:

- **Is it cost-effective?** Can we afford to run this?
- **Is it compliant?** Does it satisfy our legal obligations?
- **Is it secure?** Will it protect our customers' data?
- **Is it reliable?** Will this work as expected?

### 3. Maintainability

**Maintainability is your ability to spend time on planned work.**

Your ability to focus on *planned work* depends on how often you are forced to deal with *unplanned work*. Unplanned work arises as a result of various forms of *debt*, such as:

- **Drift** - Your infrastructure code does not match what's live in your cloud
- **Non-codified assets** - You have resources in your live cloud that are not represented by an infrastructure code
- **Outdated IaC** - You are using old patterns or tools when newer and better options exist
- **Non-standardization** - Your organization solves the same problem in many different ways

Achieving maintainability is about identifying the different types of debt, knowing how to address each of them, and deciding which forms to prioritize for improvement.

## The Balancing Act

Unfortunately, **you can't maximize all three concerns simultaneously**.

- Push too hard on velocity, and you'll compromise governance and accumulate debt
- Focus only on governance, and you'll slow development to a crawl
- Obsess over maintainability, and you'll never ship anything new

The art of platform engineering is finding the right balance among velocity, governance, and maintainability for your organization at this moment in time, and adjusting that balance as your needs evolve.

## Building a developer platform

In [principles](/2.0/way/principles/overview), we share a set of principles we embrace when it comes to designing a developer platform.

In [building blocks](/2.0/way/platform/overview), we describe the three major elements of a developer platform: 

1. Patterns
2. Platform Components
3. Interfaces

## Next steps

Let's learn more about the three fundamental concerns, starting with velocity.
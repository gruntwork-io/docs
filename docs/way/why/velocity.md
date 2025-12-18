---
sidebar_position: 2
---

# Velocity

## What it is

**Velocity is how quickly you ship changes to production.** It's the primary driver of business value—the faster teams can ship new features and updates, the more quickly your organization can respond to market needs and customer feedback.

## What it covers

Velocity applies across two key areas:

- **Application velocity** - How rapidly you launch new customer-facing or internal features
- **Infrastructure velocity** - How quickly you provision, modify, or destroy infrastructure resources


## How to improve it

Achieving high velocity comes from building the right core abstractions and automations. We believe the following are the most important:

### Offer pre-built infrastructure patterns

Provide vetted, reusable solutions for common infrastructure patterns. Make it easy for developers to adopt these pre-built implementations rather than reinventing them.

_Related: [Patterns concept](/docs/way/platform/patterns/overview), [Catalog component](/docs/way/platform/components/deploy/catalog)_

### Offer pre-built app patterns

Provide application templates that enable developers to quickly bootstrap new services.

_Related: [Patterns concept](/docs/way/platform/patterns/overview), [Catalog component](/docs/way/platform/components/deploy/catalog)_

### Offer developer self-service

Developers need a convenient way to browse and configure the available patterns without waiting for a human to approve their request.

_Related: [Enable developer self-service principle](/docs/way/principles/developer-experience/enable-developer-self-service), [Runbooks component](/docs/way/platform/components/deploy/runbooks)_

### Automate IaC pipelines

Once a pattern is configured, developers need a streamlined way to deploy it.

_Related: [Pipelines component](/docs/way/platform/components/deploy/pipelines)_

### Set up guardrails

Velocity requires safety. To give developers the confidence to deploy quickly, you need guardrails that prevent them from doing the wrong thing.

_Related: [guardrails over gates principle](/docs/way/principles/governance-maintainability/guardrails-over-gates), [Pipelines component](/docs/way/platform/components/deploy/pipelines)_

### Set and measure internal standards

To have pre-built patterns, self-service, and pipeline automation, you need centralized standards to keep your platform team's surface area manageable.

_Related: [offer golden paths principle](/docs/way/principles/governance-maintainability/offer-golden-paths)_

### Platform team velocity

The items above are focused mostly on _developer velocity_, but of course the ability of the _platform team_ to quickly ship is itself a driver of velocity! Doing that effectively is a separate discussion and outside the scope of this framework.

## How to measure it

How do you know how your team is performing at velocity? While there are many possible ways to measure it, we've found the most success with the following metrics:

### 1. Lead time

What you really care about is how quickly you can ship new ideas. So it doesn't take much analysis to conclude that one of the best measures of velocity is **lead time,** which is how long it takes a change to go from committed to deployed.

### 2. Deployment frequency

The famous four [DORA metrics](https://dora.dev/guides/dora-metrics-four-keys/) proved (through lots of survey data) that teams with good lead times also deploy often. This is because frequent deploys lead to:

- A smaller blast radius when things go wrong
- Easier debugging (fewer changes to investigate)
- More practice with your deployment process
- Better feedback loops

In short, deployment frequency is a strong indicator of many best practices. For this reason, we recommend **deployment frequency,** or how often you deploy to production, as the second way to measure velocity.

### 3. Developer satisfaction

The clock starts ticking on lead time the moment you commit code to source control, but what about everything required to enable you to commit code in the first place? For example, security reviews, new cloud pattern development, or approval times could all be an issue.

<!-- **TODO:** Update this URL to link to the relevant content -->

Because there's a wide range of possibilities here, we fall back to something more fundamental: customer satisfaction. When you [treat the developer platform as a product](/docs/way/principles/core-philosophy/your-developer-platform-is-a-product), you need to know how happy your users are. You can ask qualitatively by just chatting with them, but to get the hard metrics, it's better to do user surveys.

:::note

There are many ways to gauge user satisfaction. But if it's a product we're building, then why not ask questions that reveal product-market fit? Inspired by [Rahul Vohra](https://review.firstround.com/how-superhuman-built-an-engine-to-find-product-market-fit/), one effective way to do that is to ask users “how would you feel if you could no longer use the developer platform?” and measure the percent who answer “very disappointed."
:::



<details>
<summary><strong>The Impact Of World-Class Software Delivery</strong></summary>

:::note

This is an excerpt from the preface of [The Fundamentals of DevOps and Software Delivery](https://www.fundamentals-of-devops.com/?ref=gruntwork-way) by Yevgeniy Brikman.

:::

The vast majority of developers have never had the opportunity to see what world-class software delivery looks like first hand. If you’re one of them, you’ll be astonished by the gap between companies with world-class software delivery processes and everyone else. It’s not a 1.1x or 1.5x improvement: it’s 10x, 100x, or more.

**Table P-1** shows the difference between elite performers and low performers at the four key _DevOps Research and Assessment (DORA)_ metrics, which are a quick way to assess the performance of a software development team:

**Table P-1. DORA metrics performance from the _2024 State of DevOps Report_**

| Metric              | Description                                                          | Elite vs low performers       |
|---------------------|----------------------------------------------------------------------|-------------------------------|
| Deployment frequency| How often you deploy to production                                   | 182× more often               |
| Lead time           | How long it takes a change to go from committed to deployed          | 127× faster                   |
| Change failure rate | How often deployments cause failures that need immediate remediation | 8× lower                      |
| Recovery time       | How long it takes to recover from a failed deployment                | 2293× faster                  |

These are _**staggering**_ differences. To put them into perspective, we’re talking the difference between:

- Deploying once per month versus many times per day.
- Deployment processes that take 36 hours versus 5 minutes.
- Two out of three deployments causing problems versus one out of twenty.

</details>

## Next

When done well, velocity improvements actually enhance security, compliance, and maintainability by making good practices the easy default choice. So let's read about how to put those in place next.
---
sidebar_position: 10
toc_max_heading_level: 2
---

# Failure modes

If we identified the right principles, then a developer platform "failure" means there was some violation of the principles. In that spirit, let's talk about common failure modes and how we interpret them:

## You built a platform that no one adopts

### What went wrong
You violated the principle that [your developer platform is a product](/2.0/way/principles/core-philosophy/your-developer-platform-is-a-product).

Successful products need active marketing, customer feedback, and product-market fit. When platform teams build in isolation without understanding their users' needs, they create solutions nobody wants to use. As a result, developers will alternatives like ClickOps, custom scripts, or one-off tools.

### How to avoid it

Treat developers as customers. Market your platform to make them aware of what you've built. Measure satisfaction through surveys and metrics—especially asking "how would you feel if you could no longer use the platform?" and noting the number who would be "very disappointed." Put in place regular feedback loops and use insights to drive your roadmap. Instrument everything to understand adoption patterns and pain points.

## You stumbled into "DevOps bankruptcy"

### What went wrong

You ignored [maintainability](/2.0/way/why/maintainability) concerns until technical debt overwhelmed your ability to operate.

DevOps bankruptcy happens when teams prioritize velocity at all costs without addressing the inevitable accumulation of debt: drift between code and reality, non-codified resources created through the console, outdated patterns, and tool sprawl. Eventually, the maintenance burden becomes so high that teams can barely keep systems running, let alone ship new features. Unplanned work crowds out planned work entirely.

### How to avoid it

Consciously prioritize maintainability. Track key metrics like infrastructure drift rate, IaC coverage, and up-to-date coverage. Allocate dedicated time for debt reduction—treat it as an investment, not overhead. Implement automated drift detection and remediation. 

Build feedback loops to catch problems early. Remember that continuous improvement isn't a side project—it's part of your platform's operating system. Zero debt is unrealistic, but the bill of unmanaged debt will eventually come due.

## You're stuck in endless debates about tooling

### What went wrong

You didn't establish [centralized standards](/2.0/way/principles/governance-maintainability/offer-golden-paths) soon enough and your platform's surface area has become unmanageable.

Without clear standards, every team wants to choose their own tools for the same problems. You end up in endless debates: Terraform vs. OpenTofu vs. Pulumi, Kubernetes vs. ECS, GitHub Actions vs. GitLab CI. Each discussion consumes time and energy, and when teams each make different choices, your platform team must support an ever-growing matrix of tools. This hampers your ability to provide pre-built patterns, self-service, and pipeline automation.

### How to avoid it

Apply the principle of centralized standards, decentralized execution. Make opinionated choices about tooling and patterns at the center, then build ["golden paths"](/2.0/way/principles/governance-maintainability/offer-golden-paths) for these standards. Show developer teams that when they use official standards, they get a large collection of supported tooling. 

Optionally permit teams to deviate from standards with the knowledge that they must support non-standard tools themselves.

## You reinvented solutions that already exist

### What went wrong

You (or your developer teams) didn't leverage [pre-built patterns](/2.0/way/principles/developer-experience/pre-built-patterns-are-your-leverage) when populating your [catalog](/2.0/way/platform/patterns/overview), so you effectively reimplemented the same solutions from scratch.

When developers need to deploy a Kubernetes service, set up a database, or configure observability, they shouldn't have to figure it out from first principles every time. Likewise, when you platform engineers go to populate their catalog, they shouldn't have to reimplement everything from scratch every time.

Without vetted, reusable patterns, every team wastes time solving the same problems in slightly different ways. This saps velocity and multiplies your maintenance burden. Worse, developers building from scratch often make security and reliability mistakes that could have been prevented.

### How to avoid it

[Pre-built patterns are your leverage](/2.0/way/principles/developer-experience/pre-built-patterns-are-your-leverage). 

First, as platform engineers, look for pre-built, battle-tested patterns wherever possible. These could be open source modules, or commercial module catalogs like the [Gruntwork AWS IaC Library](https://docs.gruntwork.io/2.0/docs/library/concepts/overview).

Second, for developers, provide vetted infrastructure and application patterns that developers can adopt instead of reinventing. When you enable developers to deploy proven solutions, you achieve velocity, governance, and maintainability simultaneously. 

Combine these patterns with [self-service](/2.0/way/principles/developer-experience/enable-developer-self-service) so developers can provision infrastructure on demand without waiting for approvals. Build compliance and security into these patterns so [good practices become the easy default](/2.0/way/principles/developer-experience/make-good-practices-the-default).
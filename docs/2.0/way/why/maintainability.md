---
sidebar_position: 4
---

# Maintainability

## What it is

**Maintainability is your ability to spend time on planned work.**

Your ability to focus on _planned work_ depends on how often you are forced to deal with _unplanned work_. If you spend too much time on unplanned work, you will not be able to achieve high levels of velocity.

## What it covers

Maintainability covers all forms of "infrastructure debt."

### The debt analogy

In the financial world, debt means we owe someone _money_. The more debt we have, the more we pay in interest. If debt grows faster than we can service it, we risk _financial bankruptcy_.

In the infrastructure world, debt takes on a variety of forms:

- **Drift** - Your infrastructure code doesn't match what's actually deployed in your cloud
- **Non-codified assets** - Resources exist in your cloud but aren't represented in code
- **Outdated IaC** - You're using old patterns or tools when better options exist
- **Non-standardization** - Your organization solves the same problem in many different ways

We pay off infrastructure debt with _resources_, mainly time, focus, and money.

The more infrastructure debt we accumulate, the more resources we must allocate just to maintain the status quo. If we can't allocate enough resources to both maintain current systems and achieve our velocity goals, we risk _DevOps bankruptcy_, a state where the infrastructure becomes unmaintainable and requires fundamental restructuring.

## How to improve it

Identify the sources of debt, and for each one, put in place processes and tooling that systematically and proactively address the debt.

### Automated drift detection

**Debt source:** Drift

**Prevention and remediation:** Automatically detect drift on a scheduled basis, along with a proposal on how to resolve it. E.g. Open a pull request on a weekly basis that identifies drift and can resolve it by merging the pull request.

_Related: [Drift detector component](/2.0/way/solution/platform/maintain/drift-detector)_

### Streamlined resource imports

**Debt source:** Non-codified assets

**Prevention and remediation:** Use tooling that can discover unmanaged resources and generate the necessary code to bring them under IaC management.

_Related: [Importer component](/2.0/way/solution/platform/maintain/importer)_

### Automated IaC updates

**Debt source:** Outdated IaC

**Prevention and remediation:** Automate the process of updating your IaC to use the latest approved versions of tools, modules, and patterns. Track available updates and provide automated pull requests that upgrade dependencies while running tests to ensure compatibility.

_Related: [IaC updater component](/2.0/way/solution/platform/maintain/iac-updater)_

### Infrastructure estate insights

**Debt source:** Non-standardization

**Prevention and remediation:** Provide visibility into each repo, environment, and unit to identify where teams do not adhere to your standards. Make this information easy to discover, both for the platform engineers and application teams.

_Related: [Scorecard component](/2.0/way/solution/platform/maintain/scorecard)_

## How to measure it

As we've seen, maintainability breaks down into specific sources of debt. For each debt source, focus on the critical metric that drives the most insight.

Let's look at those now, though your own mileage may vary.

### Debt source: Drift

Measure drift by tracking the **drift rate,** which is the percentage of your IaC resources that have drifted from their codified state.

### Debt source: Non-codified assets

Measure non-codified assets by tracking the **IaC coverage rate,** which is the percentage of your cloud resources that are managed with Infrastructure as Code.

### Debt source: Outdated IaC

Measure outdated IaC by tracking the **up-to-date coverage rate,** which is the percentage of your deployed infrastructure that uses the latest versions of your approved tools and patterns.

### Debt source: Non-standardization

You can break standardization down into a discrete set of categories such as:

- **Tooling choices:** IaC tool, CI/CD tool, etc.
- **Tooling configuration:** IaC patterns, CI/CD configuration, etc.
- **Component Use:** Catalog, Runbooks, etc.
- **Governance Status:** Static analysis, Security, cost management, policies, etc.

You can evaluate how well these standards are applied at the repo, environment, or [unit](/2.0/way/resources/glossary#unit) level. You can measure each standard as either a binary value (complies / does not comply) or range value (e.g. 0 to 10).

For example, you could assess whether a given unit uses Terragrunt, which might be your standard IaC orchestrator. You could then ask how many units in a given environment or repo use Terragrunt.

## Next

You've now covered the three fundamental concerns! Now it's time to talk about how we build a developer platform to address them. Let's start by covering the principles of such a platform.
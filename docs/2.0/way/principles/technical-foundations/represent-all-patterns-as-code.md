---
sidebar_position: 2
title: Represent all patterns as code
---

# Represent all patterns as code

We talked earlier about how [pre-built patterns are your leverage](/2.0/way/principles/developer-experience/pre-built-patterns-are-your-leverage). To realize that principle in practice, those patterns should be represented as code.

Naturally, there are many technologies and tools to choose from when codifying a pattern. Some examples of patterns-as-code are:

- OpenTofu modules, CloudFormation modules, or Pulumi Component Resources
- OPA policies
- Helm charts
- Terragrunt unit or stack definitions
- Gruntwork Runbooks
- Gruntwork Boilerplate templates

The common theme here is that an expert -- the "pattern author" -- codified their knowledge and experience into one format or another.

To better understand why this is so important, let's look at what happens when you _don't_ follow it. When patterns are not represented as code, users deploy infrastructure through a series of clicks in the cloud console ("ClickOps"), or perhaps with a collection of manually typed commands. 

This approach leads to many issues:

1. **Changes are invisible.** It's not clear who did the original configuration, and it's hard to track or know about any updates to that configuration.
2. **Reproducibility is impossible.** You can't reliably recreate the configuration because there's no artifact that represents the set of steps that happened.
3. **Knowledge is siloed.** Only the person who clicked through the console or ran the manual commands understands how it works.
4. **Not vetted.** Without code review and automated testing, patterns haven't been validated against your organization's standards and requirements.
5. **Not documented.** Manual processes often lack documentation, and when documentation does exist, it quickly becomes outdated and diverges from reality.
6. **Maintainability is harder.** As new best practices emerge, manually accessing each bespoke instance of a pattern and updating it to reflect the latest best practices is often prohibitively painful or just plain not worth doing because the value-to-cost ratio is unfavorable.

Around 2014, these issues reached an inflection point and the idea of infrastructure-as-code was then a major paradigm shift. More than a decade later, we can now generalize the idea of representing all infrastructure as code to the idea that you should **represent all patterns as code,** and then [define all live infrastructure as pattern instances](/2.0/way/principles/technical-foundations/define-all-live-infrastructure-as-pattern-instances).

Representing patterns as code brings many benefits. To start, when anything is captured as code, it can be stored in version control. That means that every change is now tracked, attributed, and can be reverted if needed. Code can be peer reviewed, and automated tests can run to immediately validate the newly committed code.

More generally, when a pattern is represented as code, what were liabilities above now become key advantages:

1. **Changes are visible.** Every modification is tracked in version control with full attribution and history, making it clear who changed what and why.
2. **Reproducibility is guaranteed.** The code artifact can reliably recreate the same configuration anywhere, anytime.
3. **Knowledge is shared.** The pattern is documented in code that anyone on the team can read, understand, and contribute to.
4. **Vetted through process.** Code review and automated testing validate patterns against your organization's standards before they're approved.
5. **Self-documenting.** In addition to any supplemental written documentation, the code itself serves as living documentation that stays up-to-date because it _is_ the implementation.
6. **Maintainability at scale.** Updates to best practices can be made once in code and rolled out systematically across all instances of the pattern.

:::info
Patterns are a fundamental concept of developer platforms. Learn much more about them in the [Patterns section](/2.0/way/solution/patterns/overview).
:::

Of course, writing all patterns as code does take more time. Sometimes in emergency situations, engineers might need to optimize for speed over maintainability and resort to ClickOps. Or perhaps the team is not clear on how to represent patterns as code but has urgent deadlines to hit.

These decisions remind us that [the platform is a balancing act](/2.0/way/principles/core-philosophy/the-platform-is-a-balancing-act). There is nothing inherently "wrong" about optimizing for velocity over maintainability in a given moment. But it's important to note that every pattern not represented as code does represent [debt](/2.0/way/why/maintainability#what-it-covers) in the form of non-codified assets.

So in general, if it can be code, it should be code. And if you don't have time to make it code, incur the debt and solve your immediate problem, but don't forget to pay off that debt soon after by representing the pattern as code.


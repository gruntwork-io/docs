---
sidebar_position: 1
title: Guardrails over gates
---

# Guardrails over gates

Manual approval processes don't scale. As your organization grows, gatekeepers become bottlenecks, and developers learn to work around them.

While manual approval processes may not scale, they do have one big advantage: a human can render an on-the-spot judgement about whether a given operation or status meets the organization's governance needs. Essentially, manual approvals guarantee [governance](/docs/way/why/governance) but demand a heavy price on [velocity](/docs/way/why/velocity).

But we don't want to view governance and velocity as opposite ends of a spectrum. Rather, we want both good governance _and_ high velocity! 

Enter the guardrail. A **guardrail** is any automated rule or policy that checks infrastructure operations or status against your standards. When you create a guardrail, you are reducing that manual human judgment down to a narrowly scoped rule that systematically renders an opinion on a well-defined situation.

For example, most network experts agree that a virtual machine should not allow SSH access from any arbitrary IP address. This is a human judgement and we can codify it as a _policy_. If we're dealing with AWS, that policy might declare that any AWS security group on an EC2 Instance must not allow port 22 from `0.0.0.0/0` (all IP addresses). We can apply that policy either to live infrastructure by scanning the current state of a security group, or we can [shift left](/docs/way/principles/developer-experience/shift-left) and apply that policy to a _plan_ (e.g. from `tofu plan`) to create such a security group, or even to _in-progress code_ in an IDE that configures such a security group.

The challenge with guardrails is that they're a pain to write. And once again, we are reminded that [the platform is a balancing act](/docs/way/principles/core-philosophy/the-platform-is-a-balancing-act). Guardrails take more time upfront to create. But then they remove the need for manual approvals, and thus increase velocity without compromising governance.

Guardrails are a form of [pattern](/docs/way/platform/patterns/overview). For example, an OPA policy that follows the [conftest](https://www.conftest.dev/) convention is one popular way to codify rules.

As we discussed above, guardrails can be applied at various stages of the development process, but one especially important place to apply them is in your [IaC pipeline](/docs/way/platform/components/deploy/pipelines).

Invest in building guardrails early, as they're the key to scaling both governance and velocity together.


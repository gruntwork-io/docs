---
sidebar_position: 3
title: Define all live infrastructure as pattern instances
---

# Define all live infrastructure as pattern instances

To actually make use of patterns in our infrastructure we need to:

1. Define a pattern
2. Deploy an _instance_ of the pattern

For example, suppose you have an expert opinion on how AWS Lambda functions should be deployed that includes always launching them in a VPC, optionally including Lambda shared layers, and limiting the number of runtime engines to certain versions of Python and Go. You might represent these opinions as an OpenTofu module. You expose configuration options as OpenTofu variables. When you make updates to your opinion, you release new versions of your OpenTofu module.

But critically, defining a pattern is different from launching an instance of that pattern into live infrastructure. To do that, we need a different construct.

Continuing our example, to actually launch an instance of the pattern, we could use a [Terragrunt unit](https://terragrunt.gruntwork.io/docs/features/units/), an [OpenTofu workspace](https://opentofu.org/docs/language/state/workspaces/), or one-off OpenTofu code that references the OpenTofu module. In each case, the code references the original pattern (in this case the OpenTofu module) and specifies a set of configuration values relevant to this instance of the pattern.

Zooming back out to a general principle, you should aim to deploy 100% of your live infrastructure as instances of patterns.

This way, every piece of your infrastructure follows a vetted, well-understood pattern. When you need to update best practices -- say, to add new security requirements or optimize costs -- you update the pattern once and systematically roll out the change to all instances. Your infrastructure becomes more consistent, easier to understand, and significantly more maintainable at scale. Instead of having to track down and update dozens of bespoke configurations, you update the pattern and its instances follow suit.

Of course, there are times when you might have a pattern that is trivial to the point of deploying a single resource. Should even that trivial code be represented as a reusable pattern? Yes, it should. In the future, you may want to expand the sophistication of that pattern. Or you may want to track all instances of that trivial pattern. Or you may want to replace a deprecated resource. Or you may want to define a [Terragrunt Stack](https://terragrunt.gruntwork.io/docs/features/stacks/) that forces you to deploy only instances of patterns.

Once again, [the platform is a balancing act](/docs/way/principles/core-philosophy/the-platform-is-a-balancing-act) and it will take more overhead to launch all infrastructure as instances of a pattern, but the long-term maintainability and governance gains are well worth it.


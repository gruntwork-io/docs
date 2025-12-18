---
sidebar_position: 4
title: Shift left
---

# Shift left

:::info
The concept of "shift left" was introduced all the way back in 2001 by Larry Smith in his article [Shift-Left Testing](https://jacobfilipp.com/DrDobbs/articles/DDJ/2001/0109/0109e/0109e.htm). It has since evolved to include a broader range of activities, including security, compliance, and maintainability and is now considered a core DevOps principle.
:::

In traditional software development, validation checks happen late: security reviews just before deploying to production, cost analysis after the bill arrives, compliance audits months after deployment. By the time problems surface, the code is written, the architecture is set, and changes require rework across multiple systems, making validation failures expensive to fix.

"Shifting left" means moving feedback and decision-making as early in the development process as possible. Instead of discovering a policy violation during a pre-production review, you catch it during code review. Or better yet, catch it while the developer is still writing the code, when the context is fresh and the fix is trivial.

This principle applies to everything: security scanning in CI/CD pipelines, cost estimation when resources are provisioned, policy validation before infrastructure is deployed. In general, the earlier you catch issues, the cheaper they are to fix and the less they disrupt flow.

Modern tools make shifting left practical. IDE plugins can validate infrastructure code as it's written. Git pre-commit hooks can run security scans before code is pushed. Components like your [IaC Pipeline](/docs/way/platform/components/deploy/pipelines) can enforce policies before deployment. Collectively, these tools give developers immediate, actionable feedback when they're in the best position to act on it.


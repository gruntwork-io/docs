---
sidebar_position: 5
title: Use GitOps
---

# Use GitOps

GitOps is the natural evolution of infrastructure as code. If your infrastructure is defined in Git, why not use Git as the source of truth for what should be running? In a GitOps model, the desired state lives in version control, and automated systems continuously reconcile the actual state to match it.

This means all infrastructure changes follow a disciplined workflow: commit to Git, get peer review, run automated checks, then merge. Once merged, automation deploys the changes. Git becomes the single point of control and the complete audit trail.

The benefits of GitOps are substantial. Every change is visible and attributed because you always know who changed what and why. Rollbacks are more straightforward because you have the option to revert a commit. Compliance is built-in because the Git history is your audit log. And the workflow is familiar because developers already know how to use Git, pull/merge requests, and code review.

:::info
GitOps is closely related to the [pipelines component](/2.0/way/platform/components/deploy/pipelines).
:::


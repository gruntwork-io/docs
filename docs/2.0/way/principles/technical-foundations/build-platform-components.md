---
sidebar_position: 1
title: Build platform components
---

# Build platform components

The best way to build a developer platform is to build out a collection of discrete **platform components.**

A platform component is a narrowly scoped collection of functionality focused on solving one well-defined problem. For example, the [Pipelines component](/2.0/way/solution/platform/deploy/pipelines) is focused specifically on deploying infrastructure changes. It is not aware of or concerned with how those infrastructure changes are generated, only that it deploys infrastructure changes in a way that meets your organization's needs.

The real power of platform components comes from combining them together. For example, catalog, runbooks, and pipelines collectively enable a complete developer self-service experience. Or combine drift detector and pipelines to detect and automatically remediate drift. Or combine scorecard and unit browser to show the status of each repo and all infrastructure units across your entire infrastructure.

Platform components generally fall into three major categories: Deploy, Operate, and Maintain. In addition, every component plays some role in achieving velocity, governance, and maintainability.


---
sidebar_position: 1
title: Overview
---

# Building your platform

To build a successful developer platform, you need three essential building blocks:

1. [Patterns](/2.0/way/platform/patterns/overview) - Pre-built solutions to common infrastructure problems
2. [Platform Components](/2.0/way/platform/components/overview) - A core collection of functional capabilities
3. [Interfaces](/2.0/way/platform/interfaces/overview) - How developers interact with your platform

## How they work together

To achieve true developer self-service, you need all three building blocks. For example, when a developer needs to deploy a new Amazon ECS service:
- They have identified a common infrastructure need (pattern)
- They discover the relevant pattern through the **catalog** (platform component)
- They might use a **Web UI** (interface) to configure it
- The **infrastructure pipeline** (platform component) deploys it
- **Policies** (pattern) verify it meets your internal standards
- The **registry** (platform component) tracks the deployment

## Next

Let's dig into the first building block: patterns.
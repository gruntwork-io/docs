---
sidebar_position: 1
title: Overview
---

# Platform Components

**Platform components are the building blocks you need to create and manage modern infrastructure.** They're the tools and systems that enable developers to deploy patterns, maintain infrastructure health, and meet governance requirements.

While [patterns](/2.0/way/solution/patterns/overview) define your opinions for solving a given infrastructure problem, platform components provide the machinery that makes deploying, operating, and maintaining that infrastructure efficient and reliable at scale.

## Component categories

Platform components organize into three major categories based on their purpose:

### Deploy Infrastructure

The components you need to create, modify, and destroy infrastructure. These include:
- **[Catalog](/2.0/way/solution/platform/deploy/catalog)** - Where you store your organization's patterns
- **[Runbooks](/2.0/way/solution/platform/deploy/runbooks)** - How developers request and provision infrastructure
- **[Pipelines](/2.0/way/solution/platform/deploy/pipelines)** - How you deploy infrastructure changes

### Operate Infrastructure

The components you need to understand what's running and how it's performing. These include:
- **[Unit Browser](/2.0/way/solution/platform/operate/unit-browser)** - Browse what infrastructure is deployed
- **[Registry](/2.0/way/solution/platform/operate/registry)** - Track what the business is running
- **[Dashboards](/2.0/way/solution/platform/operate/dashboards)** - Visualize infrastructure data and insights

### Maintain Infrastructure

The components you need to detect and fix infrastructure debt. These include:
- **[Drift Detector](/2.0/way/solution/platform/maintain/drift-detector)** - Detect drift between code and cloud
- **[IaC Updater](/2.0/way/solution/platform/maintain/iac-updater)** - Update out-of-date IaC or tooling versions
- **[Scorecard](/2.0/way/solution/platform/maintain/scorecard)** - Assess standards compliance
- **[Importer](/2.0/way/solution/platform/maintain/importer)** - Import non-codified assets

## Build vs buy

You can choose to build or buy most of these components. You can also choose to optimize for "best of breed" (the best individual component) or "best of suite" (the best combination of components), or mix and match build and buy to suit your needs.

## Next

Now let's learn about each platform component in more depth.
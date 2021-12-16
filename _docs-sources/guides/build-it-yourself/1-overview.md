---
sidebar_label: Overview
pagination_label: Build It Yourself
---

import Card from "/src/components/Card"
import Grid from "/src/components/Grid"

# Build Your Own Architecture

Now that your foundational knowledge is in place and your workspace is configured, you’re ready to dive in and learn how to deploy production-grade infrastructure. If you’ve purchased a Gruntwork Reference Architecture, use [this guide](/docs/guides/reference-architecture/overview/overview) to get started. Otherwise, view our [courses](/docs/courses) and [guides](/docs/guides/welcome), or check out the [Service Catalog API reference](/docs/reference/services/intro) to learn what's available.

### Follow Our Step-By-Step Guides

<Grid>
  <Card
    title="Set Up Your AWS Accounts"
    href="/docs/build-it-yourself/landing-zone"
  >
    Set up a multi-account structure using Gruntwork Landing Zone.
  </Card>
  <Card title="Configure a CI/CD Pipeline" href="/docs/guides/pipelines">
    Implement continuous deployment for your infrastructure code with Gruntwork
    Pipelines.
  </Card>
  <Card
    title="Deploy a VPC"
    href="/docs/guides/reference-architecture/overview/overview"
  >
    Configure your network with our VPC service module.
  </Card>
  <Card
    title="Deploy a Kubernetes Cluster"
    href="/docs/guides/reference-architecture/overview/overview"
  >
    Deploy a Kubernetes Cluster to scalably host all of your apps and services.
  </Card>
  <Card
    title="Acheive Compliance"
    href="/docs/guides/reference-architecture/overview/overview"
  >
    Make your infrastructure compliant with the CIS AWS Foundations Benchmark.
    by step.
  </Card>
</Grid>

### Dig Into the Code

<Grid cols={2}>
  <Card title="Browse Services" href="/docs/reference/services/intro">
    View the API reference for our entire service catalog to learn what’s
    available.
  </Card>
  <Card
    title="View the Code in GitHub"
    href="https://github.com/orgs/gruntwork-io/repositories"
  >
    If you're the type who likes to jump straight to the source, this is for
    you.
  </Card>
</Grid>

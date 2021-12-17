---
sidebar_label: What you’ll learn in this guide
pagination_label: Achieve Compliance With the CIS AWS Foundations Benchmark
---

import { CardList } from "/src/components/CardGroup"

# Achieve Compliance With the CIS AWS Foundations Benchmark

:::info

This guide was last updated on 6th September 2021, and it covers CIS 1.4.0 Benchmark recommendations. We aim to keep
it up to date with our infrastructure-as-code modules with the latest CIS Benchmark that has been released.
If you need to access older versions, please [get in touch](/docs/guides/support) with us.

:::

## Overview

This is a complete guide to help you achieve compliance with the
[CIS AWS Foundations Benchmark](https://www.cisecurity.org/benchmark/amazon_web_services/). By following this guide,
you can launch infrastructure that is compliant with the Benchmark recommendations, and you'll be set to retain a
compliant state over time because all of the infrastructure is defined as code. This guide targets version 1.4.0 of the Benchmark.

Previously, we supported versions 1.3.0 and 1.2.0 of the Benchmark. If you are looking to upgrade from an older version please follow these in order:

- To upgrade from v1.2.0 to v1.3.0, please follow [this upgrade guide](../../../stay-up-to-date/1-cis/1-how-to-update-to-cis-13/0-intro.md);
- To upgrade from v1.3.0 to v1.4.0, please follow [this upgrade guide](../../../stay-up-to-date/1-cis/0-how-to-update-to-cis-14/0-intro.md).

![CIS Benchmark Architecture](/img/guides/build-it-yourself/achieve-compliance/cis-account-architecture.png)

## Sections

Feel free to read this guide from start to finish or skip around to whatever sections interest you.

<CardList>
  <Card
    title="Core Concepts"
    href="../core-concepts/intro"
  >
    An overview of the AWS Foundations Benchmark, including its control sections and structure.
  </Card>
  <Card
    title="Production-grade Design"
    href="../production-grade-design/intro"
  >
    How to use infrastructure as code to achieve compliance with minimal redundancy and maximum flexibility.
  </Card>
  <Card
    title="Deployment Walkthrough"
    href="../deployment-walkthrough/pre-requisites"
  >
    A step-by-step guide to achieving compliance using the Gruntwork Infrastructure as Code Library and the Gruntwork CIS AWS Foundations Benchmark wrapper modules.
  </Card>
  <Card
    title="Next Steps"
    href="../next-steps"
  >
    How to measure and maintain compliance.
  </Card>
  <Card
    title="Traceability Matrix"
    href="../traceability-matrix"
  >
    A reference table that maps each Benchmark recommendation to the corresponding section in the deployment
walkthrough.
  </Card>
</CardList>

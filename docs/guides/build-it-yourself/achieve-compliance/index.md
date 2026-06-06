---
sidebar_label: What you’ll learn in this guide
pagination_label: Achieve Compliance with the CIS AWS Foundations Benchmark
---

import { CardList } from "/src/components/CardGroup"
import { Card } from "/src/components/Card"

# Achieve Compliance with the CIS AWS Foundations Benchmark

:::info

This guide was last updated on 6th September 2021, and it covers CIS 1.4.0 Benchmark recommendations. We aim to keep
it up to date with our infrastructure-as-code modules with the latest CIS Benchmark that has been released.
If you need to access older versions, please [get in touch](/support) with us.

:::

## Overview

This is a complete guide to help you achieve compliance with the
[CIS AWS Foundations Benchmark](https://www.cisecurity.org/benchmark/amazon_web_services/). By following this guide,
you can launch infrastructure that is compliant with the Benchmark recommendations, and you'll be set to retain a
compliant state over time because all of the infrastructure is defined as code. This guide targets version 1.4.0 of the Benchmark.

Previously, we supported versions 1.3.0 and 1.2.0 of the Benchmark. If you are looking to upgrade from an older version please follow these in order:

- To upgrade from v1.2.0 to v1.3.0, please follow [this upgrade guide](/guides/stay-up-to-date/cis/cis-1.3.0).
- To upgrade from v1.3.0 to v1.4.0, please follow [this upgrade guide](/guides/stay-up-to-date/cis/cis-1.4.0).

![CIS Benchmark Architecture](/img/guides/build-it-yourself/achieve-compliance/cis-account-architecture.png)

## Sections

Feel free to read this guide from start to finish or skip around to whatever sections interest you.

<CardList>
  <Card
    title="Core Concepts"
    href="/guides/build-it-yourself/achieve-compliance/core-concepts/intro"
  >
    An overview of the AWS Foundations Benchmark, including its control sections and structure.
  </Card>
  <Card
    title="Production-grade Design"
    href="/guides/build-it-yourself/achieve-compliance/production-grade-design/intro"
  >
    How to use infrastructure as code to achieve compliance with minimal redundancy and maximum flexibility.
  </Card>
  <Card
    title="Deployment Walkthrough"
    href="/guides/build-it-yourself/achieve-compliance/deployment-walkthrough/pre-requisites"
  >
    A step-by-step guide to achieving compliance using the Gruntwork Infrastructure as Code Library and the Gruntwork CIS AWS Foundations Benchmark wrapper modules.
  </Card>
  <Card
    title="Next Steps"
    href="/guides/build-it-yourself/achieve-compliance/next-steps"
  >
    How to measure and maintain compliance.
  </Card>
  <Card
    title="Traceability Matrix"
    href="/guides/build-it-yourself/achieve-compliance/traceability-matrix"
  >
    A reference table that maps each Benchmark recommendation to the corresponding section in the deployment
walkthrough.
  </Card>
</CardList>


<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "399c7297ff4c7b8722233da4e871c2da"
}
##DOCS-SOURCER-END -->

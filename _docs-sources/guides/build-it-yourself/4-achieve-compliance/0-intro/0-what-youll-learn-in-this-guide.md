---
pagination_label: Achieve Compliance With the CIS AWS Foundations Benchmark
---

# What you’ll learn in this guide

This is a complete guide to help you achieve compliance with the
[CIS AWS Foundations Benchmark](https://www.cisecurity.org/benchmark/amazon_web_services/). By following this guide,
you can launch infrastructure that is compliant with the Benchmark recommendations, and you'll be set to retain a
compliant state over time because all of the infrastructure is defined as code. This guide targets version 1.4.0 of the Benchmark.

Previously, we supported versions 1.3.0 and 1.2.0 of the Benchmark. If you are looking to upgrade from an older version please follow these in order:

<!-- TODO: Fix the links below -->
* To upgrade from v1.2.0 to v1.3.0, please follow [this upgrade guide](/guides/upgrades/how-to-update-to-cis-13/);
* To upgrade from v1.3.0 to v1.4.0, please follow [this upgrade guide](/guides/upgrades/how-to-update-to-cis-14/).

![CIS Benchmark Architecture](/img/guides/build-it-yourself/achieve-compliance/cis-account-architecture.png)

This guide consists of five main sections:

<div className="dlist">

#### [Core concepts](#core_concepts)

An overview of the AWS Foundations Benchmark, including its control sections and structure.

#### [Production-grade design](#production_grade_design)

How to use infrastructure as code to achieve compliance with minimal redundancy and maximum flexibility.

#### [Deployment walkthrough](#deployment_walkthrough)

A step-by-step guide to achieving compliance using the Gruntwork Infrastructure as Code Library and the
Gruntwork CIS AWS Foundations Benchmark wrapper modules.

#### [Next steps](#next_steps)

How to measure and maintain compliance.

#### [Traceability matrix](#traceability_matrix)

A reference table that maps each Benchmark recommendation to the corresponding section in the deployment
walkthrough.


</div>

Feel free to read the guide from start to finish or skip around to whatever part interests you!

:::info

This guide was last updated on 6th September 2021, and it covers CIS 1.4.0 Benchmark recommendations. We aim to keep
it up to date with our infrastructure-as-code modules with the latest CIS Benchmark that has been released.
If you need to access older versions, please get in touch with us.

:::

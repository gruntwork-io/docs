---
sidebar_label: Core Concepts
---

# Background

Version 1.4.0 of the CIS AWS Foundations Benchmark was released in May of 2021. You can refer to the [CIS website](https://www.cisecurity.org/benchmark/amazon_web_services/) where you can download the latest version of the Benchmark (as well as all the previous versions). The latest version introduces a few new recommendations, and also updates one recommendation.

## Changes in recommendations

Changes in recommendations (both additions and removals) are listed below. You can think of these as a "diff"
between versions 1.3.0 and 1.4.0.

### New recommendations

These are the new recommendations introduced in version 1.4.0 of the benchmark:

- 2.1.3: Ensure MFA Delete is enabled on S3 buckets
- 2.1.4: Ensure all data in Amazon S3 has been discovered, classified and secured when required
- 2.3.1: Ensure that encryption is enabled for RDS Instances

### Updated recommendations

Version 1.4.0 also updated a recommendation. It only affects the IAM password policy:

- 1.12: Ensure credentials unused for 45 days or greater are disabled. The previous recommendation required credentials older than 90 days to be disabled.

## New Gruntwork modules vs. existing modules

To achieve compliance with the new version of the benchmark, we’ve updated a bunch of existing modules. We’ve also
created a new module for Amazon Macie, and updated the Landing Zone modules so that Landing Zone accounts now
include relevant configurations for the Amazon Macie service. The latter will satisfy the recommendation 2.1.4.

To ensure compliance with version 1.4.0 of the CIS AWS Foundations Benchmark, you’ll need to follow all the
instructions in the [Deployment walkthrough](./deployment-walkthrough/step-1-update-references-to-the-gruntwork-infrastructure-as-code-library.md) section; precisely, follow Steps 1 and 2 to ensure that
the existing modules get updated to their CIS AWS v1.4.0 compliant versions and follow Step 3 to perform the
necessary manual steps.


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Local File Copier","hash":"7d268f35eb0dde2c125ed3ce6289d575"}
##DOCS-SOURCER-END -->

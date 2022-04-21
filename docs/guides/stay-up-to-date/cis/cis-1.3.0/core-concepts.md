---
sidebar_label: Core concepts
---

# Background

Version 1.3.0 of the CIS AWS Foundations Benchmark was released in September of 2020. You can refer to the
[CIS website](https://www.cisecurity.org/benchmark/amazon_web_services/) where you can download the latest version of the
Benchmark (as well as all the previous versions). The latest version introduces several new recommendations, and also
removes several recommendations. This guide will walk you through implementing these using Gruntwork’s Infrastructure as Code Library
so that your infrastructure is fully compliant with version 1.3.0 of the framework.

## Changes in recommendations

Changes in recommendations (both additions and removals) are listed below. You can think of these as a "diff"
between versions 1.2.0 and 1.3.0.

### New recommendations

These are the new recommendations introduced in version 1.3.0 of the Benchmark:

- 1.19: Ensure that all the expired SSL/TLS certificates stored in AWS IAM are removed
- 1.20: Ensure that S3 Buckets are configured with _Block public access (bucket settings)_
- 1.21: Ensure that the IAM Access analyzer is enabled
- 2.1.1: Ensure all S3 buckets employ encryption-at-rest
- 2.1.2: Ensure S3 Bucket Policy allows HTTPS requests
- 2.2.1: Ensure EBS volume encryption is enabled
- 3.10: Ensure that object-level logging for write events is enabled for (CloudTrail) S3 bucket
- 3.11: Ensure that object-level logging for reading events is enabled for (CloudTrail) S3 bucket
- 4.15: Ensure a log metric filter and alarm exists for AWS Organizations changes
- 5.1: Ensure no network ACLs allow ingress from 0.0.0.0/0 to remote server administration ports

### Deleted recommendations

Version 1.3.0 removed some recommendations, but they only affect the IAM password policy:

- 1.5: Ensure IAM password policy requires at least one uppercase letter
- 1.6: Ensure IAM password policy require at least one lowercase letter
- 1.7: Ensure IAM password policy require at least one symbol
- 1.8: Ensure IAM password policy require at least one number

## New Gruntwork modules vs. existing modules

To achieve compliance with the new version of the Framework, we created four new modules in the
Gruntwork’s Infrastructure as Code Library, and updated a bunch of existing modules. Namely: recommendations 1.19, 1.21,
2.2.1 and 5.1 required creating new modules; the rest of the recommendations were achieved by updating existing modules.

To ensure compliance with version 1.3.0 of the CIS AWS Foundations Benchmark, you’ll need to follow all the
instructions in the [Deployment walkthrough](deployment-walkthrough/step-1-update-references-to-the-gruntwork-infrastructure-as-code-library.md) section of this guide; precisely, follow Steps 1 and 2 to ensure that
the existing modules get updated to their CIS AWS v1.3.0 compliant versions and follow Step 3 to ensure that you install and
configure the newly created modules.


<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "43e5a48a98d74f7993a9e6a02c7570df"
}
##DOCS-SOURCER-END -->

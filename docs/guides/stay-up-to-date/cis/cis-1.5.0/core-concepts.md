---
sidebar_label: Core Concepts
---

# Background

Version 1.5.0 of the CIS AWS Foundations Benchmark was released in August of 2022. You can refer to the [CIS website](https://www.cisecurity.org/benchmark/amazon_web_services/)
where you can download the latest version of the Benchmark (as well as all the previous versions).
The latest version introduces five new recommendations, and also updates a couple of existing recommendations.

## Changes in recommendations

Changes in recommendations (both additions and removals) are listed below. You can think of these as a "diff"
between versions 1.4.0 and 1.5.0.

### New recommendations

These are the new recommendations introduced in version 1.5.0 of the benchmark:

- 2.3.2: Ensure Auto Minor Version Upgrade feature is Enabled for RDS Instances
- 2.3.3: Ensure that public access is not given to RDS Instance
- 2.4.1: Ensure that encryption is enabled for EFS file systems
- 4.16: Ensure AWS Security Hub is enabled
- 5.3: Ensure no security groups allow ingress from ::/0 to remote server administration ports

### Updated recommendations

Version 1.5.0 also updated a few recommendations.

- 1.12: Ensure credentials unused for 45 days or greater are disabled. The previous recommendation did not exclude the root account from this requirement.
- 2.1.2: Ensure S3 Bucket Policy is set to deny HTTP requests. The previous recommendation specified `Actions=GetObject`, this is updated to `Actions=*`
- 3.8: Ensure rotation for customer created symmetric CMKs is enabled. The previous recommendation did not specify symmetric keys.

## New Gruntwork modules vs. existing modules

To achieve compliance with the new version of the benchmark, we've updated a bunch of existing modules. We've also
created a new CIS RDS module to satisfy the expanded RDS recommendations.

To ensure compliance with version 1.5.0 of the CIS AWS Foundations Benchmark, you'll need to follow all the
instructions in the [Deployment walkthrough](deployment-walkthrough/step-1-check-your-live-infrastructure-is-cis-v1.4-compliant.md) section. We've
expanded the steps in the guide to include checking v1.4.0 compliance before updating and checking v1.5.0 compliance after the update.


<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "83f0df96fda31a522dd578ffd80d4ac0"
}
##DOCS-SOURCER-END -->

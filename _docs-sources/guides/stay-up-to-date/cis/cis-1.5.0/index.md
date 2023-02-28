# Update to CIS AWS Foundations Benchmark 1.5.0

This guide consists of two main sections:

<div className="dlist">

#### [Core Concepts](core-concepts.md)

An overview of the CIS AWS Foundations Benchmark v1.5.0 and why it is important to update your code for compatibility.

#### [Deployment walkthrough](deployment-walkthrough/step-1-check-your-live-infrastructure-is-cis-v1.4-compliant.md)

The steps you need to take to update your code to be compliant with v1.5.0. It includes a
[version compatibility table](deployment-walkthrough/step-2-update-references-to-the-gruntwork-infrastructure-as-code-library.md#compatibility-table) you can use as a reference to know which Gruntwork Repo version tag is compatible along with the deployment steps you need to perform to achieve compliance with version 1.5.0 of the CIS AWS Foundations Benchmark.

To make updating to CIS AWS Foundations Benchmark v1.5.0 more straighforward we have:
- Introduced a new tool called Patcher which automates the process of updating the module versions
- Added module changelogs that make it clear when you can safely bump the module version

</div>

## Previous versions of this guide

- [How to update to CIS AWS Foundations Benchmark v1.4.0](/guides/stay-up-to-date/cis/cis-1.4.0)

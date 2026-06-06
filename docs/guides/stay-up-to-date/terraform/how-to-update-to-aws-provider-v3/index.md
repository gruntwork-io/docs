# Upgrade to AWS Provider V3

This guide will walk you through how to update the [Gruntwork Reference
Architecture](https://gruntwork.io/reference-architecture/) and any code that depends on the
[Gruntwork Infrastructure as Code Library](https://gruntwork.io/infrastructure-as-code-library/) to version 3.x of the
Terraform AWS provider. Following the release of v3.0.0, new features and bug fixes will only be available on version
3.x, but it also has a number of backwards incompatibilities that have to be incorporated into your codebase.

## What you’ll learn in this guide

This guide consists of three main sections:

<div className="dlist">

#### [Core Concepts](core-concepts.md)

An overview of version 3 of the AWS provider and why it is important to update
your code for compatibility.

#### [Deployment walkthrough](deployment-walkthrough.md)

The steps you need to take to update your code relying on the Gruntwork
Infrastructure as Code library and your version of the Gruntwork Reference
Architecture with compatibility with AWS provider v3. Includes a [version
compatibility table](deployment-walkthrough.md#version-compatibility-table) you can use as a reference to know
which Gruntwork Repo version tag is compatible with AWS provider v3.

</div>


<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "d893235577f4c44c0b19f7f0eed0a15d"
}
##DOCS-SOURCER-END -->

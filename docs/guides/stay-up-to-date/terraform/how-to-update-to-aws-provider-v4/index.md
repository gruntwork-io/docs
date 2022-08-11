# Upgrade to AWS Provider v4

This guide will walk you through how to update the [Gruntwork Reference
Architecture](https://gruntwork.io/reference-architecture/) and any code that depends on the
[Gruntwork Infrastructure as Code Library](https://gruntwork.io/infrastructure-as-code-library/) to version 4.x of the
Terraform AWS provider. Following the release of v4.0.0, new features and bug fixes will only be available on version
4.x, but it also has a number of backward incompatibilities that have to be incorporated into your codebase.

## What you’ll learn in this guide

This guide consists of three main sections:

<div className="dlist">

#### [Core Concepts](core-concepts.md)

An overview of version 4 of the AWS provider and why it is important to update your code for compatibility.

#### [Deployment walkthrough](deployment-walkthrough.md)

The steps you need to take to update your code relying on the Gruntwork Infrastructure as Code library and your 
version of the Gruntwork Reference Architecture with compatibility with AWS provider v4. Includes a [version
compatibility table](deployment-walkthrough.md#version-compatibility-table) you can use as a reference to know
which Gruntwork Repo version tag is compatible with AWS provider v4.

</div>


<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "a71c96e31ea1275948fdaf98786d0855"
}
##DOCS-SOURCER-END -->

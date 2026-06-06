# DRY your Reference Architecture

This guide walks you through how to DRY (don’t repeat yourself) up the
Terragrunt configurations in the [Gruntwork Reference
Architecture](https://gruntwork.io/reference-architecture/) by leveraging the
multi-include feature of Terragrunt that has been introduced in
[v0.32.0](https://github.com/gruntwork-io/terragrunt/releases/tag/v0.32.0).
Multi-include allows you to consolidate common configurations across
environments into a separate configuration file that is imported alongside the
project level configurations, drastically reducing the amount of duplicated
configuration across your project.

## What you’ll learn in this guide

This guide consists of two main sections:

#### [Core Concepts](core-concepts.md)

An overview of the multi-include feature and how it helps to DRY up the Gruntwork Reference Architecture.

#### [Deployment Walkthrough](deployment-walkthrough/intro.md)

The steps you need to take to update your code to use multi-include to avoid duplicating common configuration.


<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "e6b78a8b5feffb8c40a83d5aeab2ae0b"
}
##DOCS-SOURCER-END -->

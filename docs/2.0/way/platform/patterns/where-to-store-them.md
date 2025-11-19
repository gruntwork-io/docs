---
sidebar_position: 3
title: Where To Store Them
---

Once you define a pattern, you need somewhere to store it. This is the core purpose of the **[catalog](/2.0/way/platform/components/deploy/catalog)** platform component.

## Examples

You can learn more about the Catalog in the link above, but here are some quick examples how you could implement a Catalog:

- **Git repository.** The simplest possible catalog is a git repo, with separate folders for each pattern type.
- **Software artifact repository.** Tools like [Artifactory](https://jfrog.com/artifactory/) or [Sonatype Nexus Repository](https://www.sonatype.com/products/sonatype-nexus-repository) can _store_ all the different pattern types, but they often have limited _functionality_ with respect to these infrastructure-as-code pattern types.
- **Native IaC catalogs.** The ideal solution is to build a purpose-built catalog for IaC pattern types that handles each pattern in a first-class way.

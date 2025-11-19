---
sidebar_position: 1
title: Catalog
---

# Catalog

**Where you store your organization's patterns**

## What is the catalog component?

The catalog is the system of record for all your organization's [infrastructure patterns](/2.0/way/platform/patterns/overview).

When a member of your organization goes to ask "how do we solve problem X here?" if you have an official answer, you need a system of record to point them to. Or when you update a pattern, your pattern authors need to know which version is canonical and where to place their updates. That system of record is the **catalog.**

## Good catalogs

### Minimum requirements

To qualify as a catalog, you need only meet one requirement. The catalog is:

- **System of record.** The latest available information about your patterns lives in the catalog.

### Effective catalogs

To be an _effective_ catalog, we need a few more requirements. Effective catalogs are:

- **Browsable.** Users can browse the available patterns using their preferred [interface](/2.0/way/platform/interfaces/overview)
- **Searchable.** Users can search for exactly the pattern they want.
- **Detailed.** Users can browse detailed information about each pattern.
- **Extensible.** As the catalog maintainer, you can add support for new patterns.
- **Reports pattern usage.** Users can see how often patterns are consumed.
- **Educational.** Users can learn background information necessary to be a savvy consumer of a pattern.
- **Connect authors and consumers.** Users can connect easily with pattern authors, creating a virtuous feedback loop.
- **Connect to self-service.** When user identifies a pattern they want to instantiate, the catalog directs them right to the applicable [runbook](/2.0/way/platform/components/deploy/runbooks).

## Catalog options

You have several options when implementing a catalog. In order from least favorable to most favorable:

### No system of record

You simply do not have a system of record. If a user wants to know whether a pattern exists, they verbally ask people, but there is no written resource to consult.

### Documentation site

You have a documentation site that users visit to learn about what patterns are available, but the patterns themselves are scattered across the organization.

### Git repository

All your patterns are collected in one or more git repositories.

### Catalog UI

You have a Terminal UI and/or Web UI that enables users to browse the catalog. The underlying system of record may still be a git repository.

:::info
In our open source tool, Terragrunt, we expose a [terragrunt catalog](https://terragrunt.gruntwork.io/docs/features/catalog/) command that presents a Terminal UI to select the desired module from a specified set of git repos.
:::

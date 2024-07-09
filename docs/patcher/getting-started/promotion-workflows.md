# Using Patcher Promotion Workflows
:::info

As of this writing in July 2024 Gruntwork only officially supports Patcher Promotion Workflows using GitHub Actions.  Other CI systems will come in future releases.

:::

# Introduction

Patcher is built with the idea of being able to detect an infrastructure change and then facilitate incorporating that change across environments (e.g. dev, stage, prod). The idea is to create a series of pull requests for your code that each include the relevant changes for a particular environment which can then be reviewed and tested.  Once approved the act of merging a given pull request with "dispatch" a patcher workflow which will generate an analogous pull request on the next environment in the chain. This continues until the end of the chain at which point the final pull request is merged and no further dispatching occurs.

TODO: Insert a sequence diagram here demonstrating the process.

# Patcher Promotion Workflow Architecture

## Environments

The concept of environments in Patcher Promotion Workflows is modelled via glob-pattern matched folder structures.  Patcher commands then accept commands to match those folders, such as `include_dirs: "{*prod*}/**"`.  A given environment can include 1 or many (without limit) folders.  Patcher will scan the entire group of folders at once for potential updates and changes.

There is no limit on how many environments you can have, or other limit on the naming structure for those environments.

In the future it is planned to model environments using a configuration based system (to be shared with Gruntwork Pipelines) which will allow for even more flexibility in your folder structure.

## Dependencies

A `dependency` in Patcher workflows is a reference to code that is versioned and in use by your codebase. Patcher generally models promotion workflows around the idea of grouping changes together per-dependency. For example, if you are using `gruntwork-io/terraform-aws-messaging.git//modules/sqs?ref=v0.8.0` as a terraform source in a terragrunt unit, then your dependency would be `gruntwork-io/terraform-aws-messaging/sqs`.  Patcher would then identify all usages of `gruntwork-io/terraform-aws-messaging/sqs` within a given environment and create a single pull request to update to the next appropriate version.

# Prerequisites

## Infrastructure As Code
In order to leverage Patcher Promotion Workflows your codebase must be using infrastructure specified as code using Terraform, OpenTofu and/or Terragrunt.

## Environments as Folder Structures

In order to support multiple environments (such as dev, stage and prod) your code must represent those environments with a consistent folder structure that can be grouped via glob pattern matching, e.g.:
```sh
ls
dev-account1  dev-account2  prod-account1  prod-account2  stage-account1  stage-account2
```

Then you would define your dev environments as `dev-*`, stage as `stage-*` and prod as `prod-*` and so fourth.


# Implementation & Setup Steps

<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "15cf3e6e9ed49a5218e3a5dc2fc7ce83"
}
##DOCS-SOURCER-END -->

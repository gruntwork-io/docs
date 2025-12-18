# Account Factory Installation

## Overview

Account Factory is automatically integrated into [new Pipelines root repositories](/docs/aws-accelerator/account-factory/installation/addingnewrepo) during the bootstrapping process.

By default, Account Factory includes the following components:

- A root directory for tracking account requests: `_new-account-requests`

- A mechanism for generating new account request files: `_new-account-requests/account-<AccountName>.yml`

- A YAML file for tracking account names and IDs: `accounts.yml`

For detailed instructions on using these components, refer to the [Vending a New AWS Account Guide](/docs/aws-accelerator/account-factory/guides/vend-aws-account).

## Configuring account factory

Account Factory is fully operational for vending new accounts without requiring any configuration changes. However, a [comprehensive reference for all configuration options is available here](/docs/aws-accelerator/account-factory/reference/configurations-as-code), allowing you to customize values and templates for generating Infrastructure as Code (IaC) for new accounts.

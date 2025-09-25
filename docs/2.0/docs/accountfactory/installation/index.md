# Account Factory Installation

## Overview

Account Factory is automatically integrated into [new Pipelines root repositories](/2.0/docs/pipelines/installation/addingnewrepo) during the bootstrapping process.

By default, Account Factory includes the following components:

- 📋 An HTML form for generating workflow inputs: `.github/workflows/account-factory-inputs.html`

- 🏭 A workflow for generating new requests: `.github/workflows/account-factory.yml`

- 🗃️ A root directory for tracking account requests: `_new-account-requests`

- ⚙️ A YAML file for tracking account names and IDs: `accounts.yml`

For detailed instructions on using these components, refer to the [Vending a New AWS Account Guide](/2.0/docs/accountfactory/guides/vend-aws-account).

## Configuring account factory

Account Factory is fully operational for vending new accounts without requiring any configuration changes. However, a [comprehensive reference for all configuration options is available here](/2.0/reference/accountfactory/configurations), allowing you to customize values and templates for generating Infrastructure as Code (IaC) for new accounts.

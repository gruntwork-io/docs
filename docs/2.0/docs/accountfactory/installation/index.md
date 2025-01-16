# Account Factory Installation

## Overview

Account Factory is automatically added to [new Pipelines root repositories](/2.0/docs/pipelines/installation/addingnewrepo) as part of the bootstrapping process.

Out of the box Account Factory has the following components:

- 📋 An HTML form for generating workflow inputs: `.github/workflows/account-factory-inputs.html`

- 🏭 A workflow for generating new requests: `.github/workflows/account-factory.yml`

- 🗃️ A root directory tracking account requests: `_new-account-requests`

- ⚙️ A yaml file tracking account names and IDs: `accounts.yml`

You can read more about how to use these components in the [Vending a New AWS Account Guide](/2.0/docs/accountfactory/guides/vend-aws-account).

## Configuring Account Factory

Account Factory is ready to start vending new accounts without modifying any options. If needed, you can find a [full reference of every configuration option here](/2.0/reference/accountfactory/configurations) allowing you to customize the values and templates used when generating new IaC for new accounts.

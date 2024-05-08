# Architecture

:::info Recent Upgrade
This documentation relates to the latest version of Gruntwork Pipelines released in May 2024.

If you are using the older version of Gruntwork Pipelines that includes the `infrastructure-pipelines` repository, click [here](../../infrastructure-pipelines/iac-foundations/initial-setup.md) to get the documentation for that version.
:::

## Preamble

The IaC Foundations architecture is designed to provide a solid foundation for managing infrastructure as code (IAC) at scale.

The purpose of IaC is ultimately to provide a way to facilitate _change_ in infrastructure in a way that is repeatable, reliable, and scalable. As such, it is important to understand that this architecture is merely a foundation for you to build upon. It is expected that you will customize and extend it to meet the specific needs of your organization.
<!-- TODO: Add diagram using Excalidraw or something similar to visually showcase how these interact -->
## Infrastructure Live Root

The `infrastructure-live-root` repository is the root of your infrastructure as code (IAC) configuration. It is the entry point for all infrastructure management, and is where you will define the most critical infrastructure for your organization.

### Responsibilities

- **Control Tower**: Controls the account structure of your AWS organization within the `management` account. It is responsible for provisioning all of the accounts in your organization, how they are structured in Organizational Units (OUs), and decommissioning accounts when they are no longer needed.
- **Account Baselines**: Configures the account baselines that are applied to each account in your organization. These are typically standard configurations that need to be applied to every account in your organization, or to specific types of accounts within your organization. Think of things that you want provisioned in every account you create, like a VPC, IAM roles, compliance controls, etc.
- **Infrastructure Delegation**: Delegates management of particular infrastructure to other repositories. One default use-case of this is the `infrastructure-live-access-control` repository, which manages access to cloud infrastructure from other repositories.

  **Enterprise** customers also have the option to delegate management of application workloads to other repositories when vending new accounts.

### Security

Due to the amount of responsibility that this repository has, it is important to ensure that access to this repository is tightly controlled, and that changes to this repository are carefully reviewed and tested.

## Infrastructure Live Access Control

## Infrastructure Modules


<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "f7c64003b1b71186d1a988654498f7c1"
}
##DOCS-SOURCER-END -->

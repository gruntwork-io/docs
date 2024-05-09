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
- **Infrastructure Delegation**: Delegates management of select infrastructure to other repositories. One default use-case of this is the `infrastructure-live-access-control` repository, which manages access to cloud infrastructure from other repositories.

  **Enterprise** customers also have the option to automatically delegate management of application workloads to a new repository when vending new account(s).

### Security

Due to the amount of responsibility that this repository has, it is important to ensure that access to this repository is tightly controlled, and that changes to this repository are carefully reviewed and tested.

Controls that should be in place include:

- **Branch Protection**: Ensure that the `main` branch is protected, and that changes to the `main` branch require code review and approval.
- **Code Review**: Ensure that all changes to the repository are reviewed by at least one other person before being merged.
- **Testing**: Ensure that all modules used in this repository are tested, vetted, and well documented before being used. Gruntwork provides a number of modules as part of the [Gruntwork Library](../../library/overview/index.md) offering that meet this criteria. Consider restricting the kinds of modules you allow into this repository to those that meet your organization's standards.
- **Least Privilege Access**: Ensure that only the necessary people have access to this repository, and that they have the minimum level of access necessary to perform their job functions.

  You should only allow individuals to have write access to this repository that are trusted to modify or propose modifications to the most critical infrastructure for your organization.

  Also consider restricting access to the `main` branch specifically, as this access is required to actually make changes to your infrastructure. It's possible you can be more lenient with general write access to the repository, but restrict write access to the `main` branch to a smaller group of trusted individuals.

## Infrastructure Live Access Control

## Infrastructure Modules


<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "d1346cc4bd276775dd7869664b8fe61a"
}
##DOCS-SOURCER-END -->

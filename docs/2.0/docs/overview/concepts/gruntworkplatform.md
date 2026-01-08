# Overview of the Gruntwork Platform
 
**The Gruntwork Platform provides a collection of components that serve as foundational building blocks for constructing best-practice AWS infrastructure.**

Modern cloud infrastructure involves numerous components, spanning areas such as infrastructure pipelines, secrets management, FinOps, and application deployment. Establishing and managing each component independently requires a deep understanding of core infrastructure needs, the development of strategies to address them, the implementation of solutions, and ongoing maintenance. The Gruntwork Platform addresses these challenges by offering:

- Pre-defined strategic recommendations
- A curated collection of Infrastructure-as-Code (IaC) modules with comprehensive documentation
- Tools that directly meet underlying infrastructure needs
- A streamlined method for integrating components into your environment
- Ongoing updates to ensure alignment with the latest best practices

When setting up a new component, customers also have access to guidance from Gruntwork subject matter experts. Their support ensures correct implementation within your environment and adaptability to meet evolving needs.

## Product packages

Gruntwork offers two main product packages:

### Gruntwork AWS Accelerator

**Gruntwork AWS Accelerator** is a comprehensive solution for organizations deploying infrastructure on AWS. It includes:

* **[Gruntwork AWS IaC Library](/2.0/docs/library/concepts/overview)**: A robust collection of over 300,000 lines of OpenTofu/Terraform code modules, providing foundational components such as VPCs, ECS clusters, and S3 buckets for building infrastructure.
* **[Gruntwork AWS Account Factory](/2.0/docs/accountfactory/concepts/)**: Automated workflows for provisioning new AWS accounts, applying compliance and security baselines, and enforcing infrastructure business rules across multiple accounts.
* **AWS Platform Architecture**: Best-practice multi-account architecture with network topology, security configurations, and compliance baselines.
* **Terragrunt Scale**: All the tools included in the Terragrunt Scale package (see below).

### Terragrunt Scale

**Terragrunt Scale** provides essential tools for managing infrastructure at scale, regardless of your IaC library:

* **[Gruntwork Pipelines](/2.0/docs/pipelines/concepts/overview.md)**: A comprehensive CI/CD pipeline for infrastructure code, including guidelines for structuring OpenTofu code and scripts to manage pipeline operations.
* **[Gruntwork Patcher](/2.0/docs/patcher/concepts/)**: Tools for identifying outdated modules in repositories, creating pull requests to update versions, and automatically refactoring code to handle breaking changes without developer intervention.
* **[Gruntwork Drift Detection](/2.0/docs/pipelines/concepts/drift-detection)**: Automated detection of configuration drift between your infrastructure code and actual cloud resources.

## Additional concepts

* [Infrastructure-Live](/2.0/docs/overview/concepts/infrastructure-live.md): An opinionated structure for IaC repositories that incorporates best practices for organizing OpenTofu code to maintain DRY principles at an enterprise scale.

<!-- * [Catalog]  -- see DEV-628 -->
<!-- Placeholder for networking/transit gateway details -->

All components are designed with a focus on Terragrunt, OpenTofu/Terraform, GitHub, and AWS. Support for additional technologies may be introduced in the future.

## Building your own components

Gruntwork Platform components provide a substantial foundation for modern cloud infrastructure but are not intended to cover every possible need. Customers are encouraged to expand upon these components by integrating their own solutions to develop a comprehensive infrastructure.

Each component in the Gruntwork Platform is purposefully designed for extensibility and customization. Recognizing that many customers are developers, Gruntwork empowers customers to create tailored solutions that address their unique requirements, rather than rely solely on pre-built components. Collaboration is a key focus, and Gruntwork actively welcomes customer feedback and contributions to continually refine and enhance its offerings.


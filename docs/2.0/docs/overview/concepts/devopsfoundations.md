# Overview of Devops Foundations
 
**Gruntwork DevOps Foundations provides a collection of _DevOps components_ that serve as foundational building blocks for constructing best-practice infrastructure.**

Modern cloud infrastructure involves numerous components, spanning areas such as infrastructure pipelines, secrets management, FinOps, and application deployment. Establishing and managing each component independently requires a deep understanding of core infrastructure needs, the development of strategies to address them, the implementation of solutions, and ongoing maintenance. Gruntwork’s DevOps components addresses these challenges by offering:

- Pre-defined strategic recommendations
- A curated collection of Infrastructure-as-Code (IaC) modules with comprehensive documentation
- Tools that directly meet underlying infrastructure needs
- A streamlined method for integrating components into your environment
- Ongoing updates to ensure alignment with the latest best practices

When setting up a new DevOps component, users also have access to guidance from Gruntwork subject matter experts. Their support ensures correct implementation within your environment and adaptability to meet evolving needs.

## Available components

Gruntwork currently offers several DevOps components:

* [Infrastructure-Live](/2.0/docs/overview/concepts/infrastructure-live.md): An opinionated structure for IaC repositories that incorporates best practices for organizing OpenTofu code to maintain DRY principles at an enterprise scale.
* [Pipelines](/2.0/docs/pipelines/concepts/overview.md): A comprehensive CI/CD pipeline for infrastructure code, including guidelines for structuring OpenTofu code and scripts to manage pipeline operations.
* [Account Factory](/2.0/docs/accountfactory/concepts/): Automated workflows for provisioning new AWS accounts, applying compliance and security baselines, and enforcing infrastructure business rules across multiple accounts.
* [Patcher](/2.0/docs/patcher/concepts/): Tools for identifying outdated modules in repositories, creating pull requests to update versions, and automatically refactoring code to handle breaking changes without developer intervention.
* [Library](/2.0/docs/library/concepts/overview): A robust collection of over 300,000 lines of OpenTofu/Terraform code modules, providing foundational components such as VPCs, ECS clusters, and S3 buckets for building infrastructure.

<!-- * [Catalog]  -- see DEV-628 -->
<!-- Placeholder for networking/transit gateway details -->

All components are designed with a focus on Terragrunt, OpenTofu/Terraform, GitHub, and AWS. Support for additional technologies may be introduced in the future.

## Building your own components

Gruntwork DevOps components provide a substantial foundation for modern cloud infrastructure but are not intended to cover every possible need. Users are encouraged to expand upon these components by integrating their own solutions to develop a comprehensive infrastructure.

Each component in DevOps Foundations is purposefully designed for extensibility and customization. Recognizing that many users are developers, Gruntwork empowers users to create tailored solutions that address their unique requirements, rather than rely solely on pre-built components. Collaboration is a key focus, and Gruntwork actively welcomes user feedback and contributions to continually refine and enhance its offerings.

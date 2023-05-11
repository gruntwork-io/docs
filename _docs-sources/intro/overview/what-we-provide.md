# What we provide

## Gruntwork IaC Library

A battle-tested, production-grade _catalog_ of infrastructure code that contains the core "building blocks" of infrastructure. It includes everything you’ll need to set up:

- A Multi-account structure
- An infrastructure CI/CD Pipeline
- Networking and VPCs
- App orchestration — ECS, EC2, Kubernetes, and more
- Data storage — Aurora, Elasticache, RDS, and more
- Best-practice security baselines
- _and [more…](/iac/whats-this)_

## Gruntwork Compliance

An optional _catalog extension_ that contains building blocks that implement various compliance standards. Today we support CIS compliance; SOC 2 is coming soon, and we plan on adding additional standards in the future.

## Support

Gruntwork offers basic and paid support options:

- **[Community support](/support#get-support).** Get help via a [Gruntwork Community Slack](https://gruntwork-community.slack.com/archives/CHH9Y3Z62) and our [Knowledge Base](https://github.com/gruntwork-io/knowledge-base/discussions).
- **[Paid support](/support#paid-support-tiers).** Get help via email, a private Slack channel, or scheduled Zoom calls, with response times backed by SLAs.

## Gruntwork is responsible for

1. Providing a tested, updated, and richly featured [collection of infrastructure code](/iac/whats-this) for the customer to use.
1. Maintaining a healthy [Knowledge Base community](https://github.com/gruntwork-io/knowledge-base/discussions) where other engineers (including Grunts) post & answer questions.
1. For Pro / Enterprise Support customers: Answering questions via email and Slack.
1. For Reference Architecture customers:
   1. Generating the initial Reference Architecture based on our customer’s selections of available configurations. This includes:
      1. Our implementation of Landing Zone
      1. A complete sample app with underlying database and caching layer
      1. The Gruntwork Pipeline for deploying changes to infrastructure
      1. An overview of how to use the Reference Architecture
   1. Deploying the initial Reference Architecture into the customer’s brand new empty AWS accounts.
   1. Delivering the initial Reference Architecture Infrastructure as Code to the customer.
   1. Providing resources to the customer for deeply understanding the inner workings of the Reference Architecture.
1. For CIS customers:
   1. Providing IaC libraries to the CIS customer that correctly implement CIS requirements and restrictions.
   1. For aspects of the CIS AWS Foundations Benchmark where those requirements cannot be met by modules, but require human intervention, provide instructions on manual steps the customer must take to meet the requirements.
   1. For CIS Reference Architecture customers, deploying a Reference Architecture and providing access to infrastructure code that implements the CIS AWS Foundations Benchmark requirements out-of-the-box, wherever possible.

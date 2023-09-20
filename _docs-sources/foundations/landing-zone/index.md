# About Landing Zone

The Landing Zone component is focused on:

- Creating an initial best-practice, AWS multi-account setup
- Putting in place a system for vending new AWS accounts (commonly known as an "account factory")
- Installing secure AWS account baselines compliant with the [CIS AWS Foundations Benchmark](https://www.cisecurity.org/benchmark/amazon_web_services).

Gruntwork Landing Zone is intended to be deployed as your new paradigm for creating and managing AWS accounts. Once set up, you can import existing AWS accounts.

## Extending AWS Control Tower

Gruntwork Landing Zone builds on AWS Control Tower to add important new functionality.

### What is AWS Control Tower?

AWS Control Tower helps you set up and govern AWS accounts, and gives you a centralized way to manage compliance and configuration across your AWS accounts. But Control Tower is fundamentally a Platform-as-a-Service (PaaS) paradigm where you use "ClickOps" to create and configure AWS accounts. That stands in contrast to the vision behind IaC tools like Terraform, which are built on the philosophy that all Cloud resources are described in code. It can also be challenging to customize Control Tower and maintain it over time.

### Additional functionality

Gruntwork Landing Zone directly addresses these limitations by extending Control Tower with the following functionality:

1. Configure and customize new AWS accounts using Terraform/OpenTofu
1. Have all new AWS accounts meet the CIS AWS Foundations Benchmark out of the box
1. Request new AWS accounts using a simple YAML file, GitHub Actions, or any system that can trigger a GitHub Action (e.g. ServiceNow)
1. Review and customize all new AWS account requests using GitHub Pull Request functionality
1. Define a customized account baseline unique to your organization
1. Enable AWS account baselines to stay up to date automatically using [Patcher](./patcher)

## Greenfield vs. Brownfield

Gruntwork Landing Zone is optimized for situations where you are creating a "new world" infrastructure. Once your new world is stable, you can then import existing AWS accounts into Gruntwork Landing Zone.

While it possible to migrate an existing Control Tower deployment into Gruntwork Landing Zone, we do not yet have a defined process for this and do not currently recommend this. Of course, you are free to use other Gruntwork DevOps components along with your existig Landing Zone solution.

# About Landing Zone

The Landing Zone component is focused on:

- Creating an initial best-practice, AWS multi-account setup
- Putting in place a system for vending new AWS accounts (commonly known as an "account factory")
- Installing secure AWS account baselines compliant with the [CIS AWS Foundations Benchmark](https://www.cisecurity.org/benchmark/amazon_web_services).

Gruntwork Landing Zone is intended to be deployed as your new paradigm for creating and managing AWS accounts. Once set up, you can import existing AWS accounts.

## What's included

- **Strategy.** Gruntwork has designed an approach that extends AWS Control Tower to support the full set of needs around AWS account management with  Terraform/OpenTofu and GitHub.
- **IaC Modules.** Gruntwork Landing Zone includes modules to configure Control Tower, configure AWS IAM Identity Center, and install AWS account baselines that meet the CIS AWS Foundations Benchmark.
- **Tooling.** Gruntwork Landing Zone makes use of Gruntwork Pipelines and GitHub Action to support the account request and review process.
- **Setup.** Installing Gruntwork Landing Zone is fully documented.
- **Updates.** Gruntwork publishes regular updates to all Landing Zone modules, including support for the latest versions of the CIS AWS Foundations Benchmark, and ongoing updates to our Landing Zone workflows.

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
1. Enable AWS account baselines to stay up to date automatically using [Patcher](/patcher)

## Greenfield vs. brownfield

Gruntwork Landing Zone is optimized for situations where you are creating a "new world" infrastructure. Once your new world is stable, you can then import existing AWS accounts into Gruntwork Landing Zone, and migrate existing resources as needed.

While it possible to migrate an existing Control Tower deployment into Gruntwork Landing Zone, we have not yet defined a formal process for this and we do not currently recommend this. That being said, other Gruntwork DevOps components can still be installed alongside your existing non-Gruntwork Landing Zone solution.


<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "1b06ee488ae3edb9026ead2ed2671f35"
}
##DOCS-SOURCER-END -->

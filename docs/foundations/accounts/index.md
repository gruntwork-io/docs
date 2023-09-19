# About Landing Zone

The Landing Zone component is focused on:

- Creating an initial best-practice, AWS multi-account setup
- Putting in place a system for vending new AWS accounts (commonly known as an "account factory")
- Installing secure AWS account baselines compliant with the CIS AWS Foundations Benchmark.

Gruntwork Landing Zone is intended to be deployed as your new paradigm for creating and managing AWS accounts. Once set up, you can import existing AWS accounts.

## Extending AWS Control Tower

AWS Control Tower is helps you set up and govern AWS accounts, and gives you a centralized way to enforce compliance, security protocols, and best practices across your AWS accounts. But Control Tower is fundamentally as platform-as-a-service paradigm where you use "ClickOps" to create and configure AWS accounts. That stands in contrast to the vision behind IaC tools like Terraform, which are built on the philosophy that all Cloud resources are described in code. It can also be challenging to customize Control Tower in a maintainable way.

Despite these limitations, AWS Control Tower is a useful foundational tool, so Gruntwork Landing Zone extends Control Tower with the following functionality:

1. Request new AWS accounts using GitHub Actions, which can in turn be triggered by any ticketing system, such as ServiceNow
1. Automatically create a pull request to install a customizable account baseline after a new AWS account is created.
1. Enable AWS account baselines to be kept up to date automatically using the [Automatic Updates component](../maintenance)

TODO: Add a page on initial setup so that customers can fully set up Gruntwork Landing Zone (the GitHub Actions, applying CIS templates, etc.) on their own.


<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "514201f88653aee51417aed954098c5d"
}
##DOCS-SOURCER-END -->

import Card from "/src/components/Card"
import CardGroup from "/src/components/CardGroup"

# Gruntwork Tools

Gruntwork provides several CLI tools to make working with Gruntwork and its IaC library modules easier. Documentation for our open source tools can be found on their microsites, and documentation for subscriber tools is located in their respective GitHub repos.

<CardGroup cols={2}>

<Card
  title="Gruntwork Installer"
  href="https://github.com/gruntwork-io/gruntwork-installer">
The Gruntwork Installer provides utilities for setting up your dev environemnt and configuring your Reference Architecture.
</Card>
<Card
  title="Terragrunt"
  href="https://terragrunt.gruntwork.io">
Terragrunt is a thin wrapper that provides extra tools for keeping your configurations DRY, working with multiple Terraform modules, and managing remote state.
</Card>
<Card
  title="Terratest"
  href="https://terratest.gruntwork.io">
Terratest is a Go library that provides patterns and helper functions for testing infrastructure, with 1st-class support for Terraform, Packer, Docker, Kubernetes, AWS, GCP, and more
</Card>
<Card
title="Repo Copier"
href="https://github.com/gruntwork-io/repo-copier"
tags={["enterprise"]}>
Repo Copier is a CLI tool to copy repository data (including code, issues, PRs, releases, etc) from Gruntwork's GitHub organization to a customer's version control system.
</Card>

</CardGroup>


<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "53f66a2ca74796be0acd18df9bdfffc7"
}
##DOCS-SOURCER-END -->

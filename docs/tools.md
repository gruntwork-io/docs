---
hide_table_of_contents: true
hide_title: true
---

import Card from "/src/components/Card"
import CardGroup from "/src/components/CardGroup"
import CenterLayout from "/src/components/CenterLayout"

<CenterLayout>

# Gruntwork Tools

Gruntwork provides a suite of CLI tools to make working with Gruntwork and its IaC library modules easier.

<CardGroup cols={2}>

<Card
  title="Gruntwork CLI"
  href="https://github.com/gruntwork-io/gruntwork">
The Gruntwork CLI will help you set up your Reference Architecture including creating AWS accounts, registering domain names, and setting up VCS tokens in AWS Secrets Manager.
</Card>
<Card
  title="Gruntwork Installer"
  href="https://github.com/gruntwork-io/gruntwork-installer">
The Gruntwork Installer provides conveniences for downloading and installing Gruntwork modules.
</Card>
<Card
  title="Terragrunt"
  href="https://terragrunt.gruntwork.io">
Terragrunt is a thin wrapper that provides extra tools for keeping your Terraform configurations DRY, working with multiple modules, and managing remote state.
</Card>
<Card
  title="Terratest"
  href="https://terratest.gruntwork.io">
Terratest is a Go library that provides patterns and helper functions for testing infrastructure, with 1st-class support for Terraform, Packer, Docker, Kubernetes, AWS, GCP, and more.
</Card>
<Card
  title="Boilerplate"
  href="https://github.com/gruntwork-io/boilerplate">
Boilerplate is a tool for generating files and folders ("boilerplate") from a set of templates.
</Card>
<Card
title="Repo Copier"
href="https://github.com/gruntwork-io/repo-copier"
tags={["enterprise"]}>
Repo Copier is a CLI tool to copy repository data (including code, issues, PRs, releases, etc) from Gruntwork's GitHub organization to a customer's version control system.
</Card>

</CardGroup>

</CenterLayout>


<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "9163aa4a6f27ddea984ff8f78e22e44b"
}
##DOCS-SOURCER-END -->

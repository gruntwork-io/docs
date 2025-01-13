---
hide_table_of_contents: true
hide_title: true
---

import Card from "/src/components/Card"
import CardGroup from "/src/components/CardGroup"
import CenterLayout from "/src/components/CenterLayout"

<CenterLayout>

# Gruntwork Tools

Gruntwork offers a suite of CLI tools to make working with Gruntwork and its IaC library modules easier.

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
Terragrunt is a lightweight wrapper for Terraform that provides tools to keep configurations DRY, manage multiple modules, and handle remote state efficiently.
</Card>

<Card
  title="Terratest"
  href="https://terratest.gruntwork.io">
Terratest is a Go library offering patterns and helper functions for testing infrastructure, with first-class support for Terraform, Packer, Docker, Kubernetes, AWS, and GCP. 
</Card>

<Card
  title="Boilerplate"
  href="https://github.com/gruntwork-io/boilerplate"> 
Boilerplate is a tool for generating files and directories ("boilerplate") from predefined templates, ensuring consistency across projects.
</Card>

<Card
  title="Repo Copier"
  href="https://github.com/gruntwork-io/repo-copier"
  tag="enterprise"> 
Repo Copier is a CLI tool that enables customers to replicate repository data, including code, issues, pull requests, and releases, from Gruntwork's GitHub organization to their own version control systems.
</Card>

</CardGroup>

</CenterLayout>


<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "9163aa4a6f27ddea984ff8f78e22e44b"
}
##DOCS-SOURCER-END -->

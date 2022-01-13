---
pagination_label: Deployment walkthrough — Prerequisites
---

# Pre-requisites

This walkthrough has the following pre-requisites:

<div className="dlist">

#### Gruntwork Infrastructure as Code Library

This guide uses code from the [Gruntwork Infrastructure as Code Library](https://gruntwork.io/infrastructure-as-code-library/), as it
implements most of the production-grade design for you out of the box. Make sure to read
our [Introduction to Gruntwork](/docs/intro/overview/intro-to-gruntwork).

</div>

:::note

You must be a <span className="js-subscribe-cta">Gruntwork subscriber</span> to access the Gruntwork Infrastructure as Code Library.

:::

<div className="dlist">

#### Terraform

This guide uses [Terraform](https://www.terraform.io/) to define and manage all the infrastructure as code. If you’re
not familiar with Terraform, check out [A
Comprehensive Guide to Terraform](https://blog.gruntwork.io/a-comprehensive-guide-to-terraform-b3d32832baca), [A Crash Course on Terraform](https://training.gruntwork.io/p/terraform), and
our [Introduction to Gruntwork](/docs/intro/overview/intro-to-gruntwork)

#### AWS accounts

This guide deploys infrastructure into one or more AWS accounts. Check out the
[Production Grade AWS Account Structure](../../2-landing-zone/0-intro/0-what-youll-learn-in-this-guide.md) guide for instructions.
You will also need to be able to authenticate to these accounts on the CLI: check out
[A Comprehensive Guide to Authenticating to AWS on the Command Line](https://blog.gruntwork.io/a-comprehensive-guide-to-authenticating-to-aws-on-the-command-line-63656a686799)
for instructions.

</div>


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Local File Copier","hash":"a4bb49a875173e37857ee86cc8ad2884"}
##DOCS-SOURCER-END -->

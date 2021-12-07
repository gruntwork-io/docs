# Pre-requisites

This walkthrough has the following pre-requisites:

Gruntwork Infrastructure as Code Library  
This guide uses code from the [Gruntwork Infrastructure as Code Library](https://gruntwork.io/infrastructure-as-code-library/), as it
implements most of the production-grade design for you out of the box. Make sure to read
[How to use the Gruntwork Infrastructure as Code Library](/guides/foundations/how-to-use-gruntwork-infrastructure-as-code-library).

You must be a <span class="js-subscribe-cta">Gruntwork subscriber</span> to access the Gruntwork Infrastructure as Code Library.

Terraform  
This guide uses [Terraform](https://www.terraform.io/) to define and manage all the infrastructure as code. If you’re
not familiar with Terraform, check out [A
Comprehensive Guide to Terraform](https://blog.gruntwork.io/a-comprehensive-guide-to-terraform-b3d32832baca), [A Crash Course on Terraform](https://training.gruntwork.io/p/terraform), and
[How to use the Gruntwork Infrastructure as Code Library](/guides/foundations/how-to-use-gruntwork-infrastructure-as-code-library).

Terragrunt  
This guide uses [Terragrunt](https://terragrunt.gruntwork.io/) to configure the infrastructure as code. To get familiar
with Terragrunt, explore the [features](https://terragrunt.gruntwork.io/docs/#features), read the [guides](https://terragrunt.gruntwork.io/docs/getting-started/quick-start/),
or dive into the [documentation](https://terragrunt.gruntwork.io/docs/).

Code repository  
You will need to initialize an `infrastructure-live` repository to contain all of the Terragrunt configuration code for your
infrastructure. You may use the [`for-production` example code](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.41.4/examples/for-production/infrastructure-live) to start with.

Keybase (optional)  
As part of this guide, you will create IAM users, including, optionally, credentials for those IAM users. If you
choose to create credentials, those credentials will be encrypted with a PGP key. You could provide the PGP keys
manually, but a more manageable option may be to have your team members to sign up for [Keybase](https://keybase.io),
create PGP keys for themselves, and then you can provide their Keybase usernames, and the PGP keys will be retrieved
automatically.



<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Service Catalog Reference","hash":"817ac711d94cc562d1ee55f4f5ef1345"}
##DOCS-SOURCER-END -->

# Pre-requisites

This walkthrough has the following pre-requisites:



<div className="dlist">

#### Gruntwork Infrastructure as Code Library

This guide uses code from the [Gruntwork Infrastructure as Code Library](https://gruntwork.io/infrastructure-as-code-library/), as it
implements most of the production-grade design for you out of the box. Make sure to read
[How to use the Gruntwork Infrastructure as Code Library](/guides/foundations/how-to-use-gruntwork-infrastructure-as-code-library).


</div>

    You must be a <span className="js-subscribe-cta">Gruntwork subscriber</span> to access the Gruntwork Infrastructure as Code Library.



<div className="dlist">

#### Terraform

This guide uses [Terraform](https://www.terraform.io/) to define and manage all the infrastructure as code. If you’re
not familiar with Terraform, check out [A
Comprehensive Guide to Terraform](https://blog.gruntwork.io/a-comprehensive-guide-to-terraform-b3d32832baca), [A Crash Course on Terraform](https://training.gruntwork.io/p/terraform), and
[How to Use the Gruntwork Infrastructure as Code Library](/guides/foundations/how-to-use-gruntwork-infrastructure-as-code-library)

#### CircleCI

This guide uses [CircleCI](https://circleci.com/) as the CI platform. Although the approach is compatible with any CI
platform, a basic understanding of the CircleCI configuration will be useful for translating the configuration format
to other platforms. You can take a look at [the
official getting started guide](https://circleci.com/docs/2.0/getting-started/#section=getting-started) to get a basic understanding of CircleCI and their configuration format.

#### AWS accounts

This guide deploys infrastructure into one or more AWS accounts. Check out the
[Production Grade AWS Account Structure](/guides/foundations/how-to-configure-production-grade-aws-account-structure) guide for instructions.
You will also need to be able to authenticate to these accounts on the CLI: check out
[A Comprehensive Guide to Authenticating to AWS on the Command Line](https://blog.gruntwork.io/a-comprehensive-guide-to-authenticating-to-aws-on-the-command-line-63656a686799)
for instructions.

#### Repository structure

This guide assumes your infrastructure code is organized in a manner similar to that covered in the
[Using
Terraform Modules section of the How to Use the Gruntwork Infrastructure as Code Library](https://gruntwork.io/guides/foundations/how-to-use-gruntwork-infrastructure-as-code-library/#using_terraform_modules) guide. This means that you
should have two repositories for your infrastructure code, `infrastructure-modules` and `infrastructure-live`. Make
sure that the `infrastructure-live` repository is locked down as recommended in [Lock down VCS systems](#lock_down_vcs_systems). This guide
will assume that `master` is the protected branch where infrastructure is deployed from.


</div>

This guide will use [Terragrunt](https://github.com/gruntwork-io/terragrunt) and its associated file and folder
structure to deploy Terraform modules. Please note that **Terragrunt is NOT required for using Terraform modules from
the Gruntwork Infrastructure as Code Library.** Check out
[How to Use the Gruntwork Infrastructure as Code Library](/guides/foundations/how-to-use-gruntwork-infrastructure-as-code-library) for instructions
on alternative options, such as how to
[Deploy using plain Terraform](/guides/foundations/how-to-use-gruntwork-infrastructure-as-code-library#deploy_using_plain_terraform).



<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Service Catalog Reference","hash":"795e4792e40b826c9683a187bbaf3378"}
##DOCS-SOURCER-END -->

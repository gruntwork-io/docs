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
[How to Use the Gruntwork Infrastructure as Code Library](/guides/foundations/how-to-use-gruntwork-infrastructure-as-code-library).

#### Python and Kubergrunt

Some of the Terraform modules used in this guide call out to Python code and/or
[kubergrunt](https://github.com/gruntwork-io/kubergrunt) to fill in missing features in Terraform. Make sure you have
Python and `kubergrunt` installed on any computer where you will be running Terraform.

#### Docker and Packer

This guide assumes you are deploying a Kubernetes cluster for use with [Docker](https://www.docker.com). The guide also
uses [Packer](https://www.packer.io) to build VM images. If you’re not familiar with Docker or Packer, check out
[A Crash Course on Docker and Packer](https://training.gruntwork.io/p/a-crash-course-on-docker-packer) and
[How to Use the Gruntwork Infrastructure as Code Library](/guides/foundations/how-to-use-gruntwork-infrastructure-as-code-library).

#### AWS accounts

This guide deploys infrastructure into one or more AWS accounts. Check out the
[How to configure a production-grade AWS account structure](/guides/foundations/how-to-configure-production-grade-aws-account-structure)
guide for instructions. You will also need to be able to authenticate to these accounts on the CLI: check out
[A Comprehensive Guide to Authenticating to AWS on the Command Line](https://blog.gruntwork.io/a-comprehensive-guide-to-authenticating-to-aws-on-the-command-line-63656a686799)
for instructions.


</div>



<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Service Catalog Reference","hash":"00e8cc71445e4751fb6a300f5477090c"}
##DOCS-SOURCER-END -->

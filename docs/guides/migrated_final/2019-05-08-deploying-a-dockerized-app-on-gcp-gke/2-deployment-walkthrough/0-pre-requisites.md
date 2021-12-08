# Pre-requisites

This walkthrough has the following pre-requisites:



<div className="dlist">

#### Terraform

This guide uses [Terraform](https://www.terraform.io/) to define and manage all the infrastructure as code. If you’re
not familiar with Terraform, check out [A
Comprehensive Guide to Terraform](https://blog.gruntwork.io/a-comprehensive-guide-to-terraform-b3d32832baca), [A Crash Course on Terraform](https://training.gruntwork.io/p/terraform), and
[How to Use the Gruntwork Infrastructure as Code Library](/guides/foundations/how-to-use-gruntwork-infrastructure-as-code-library).

#### Python and Kubergrunt

Some of the Terraform modules used in this guide call out to Python code and/or
[Kubergrunt](https://github.com/gruntwork-io/kubergrunt) to fill in missing features in Terraform. Make sure you have
Python and Kubergrunt installed on any computer where you will be running Terraform.

#### Docker and Packer

This guide assumes you are deploying a Kubernetes cluster for use with [Docker](https://www.docker.com). The guide also
uses [Packer](https://www.packer.io) to build VM images. If you’re not familiar with Docker or Packer, check out
[A Crash Course on Docker and Packer](https://training.gruntwork.io/p/a-crash-course-on-docker-packer) and
[How to Use the Gruntwork Infrastructure as Code Library](/guides/foundations/how-to-use-gruntwork-infrastructure-as-code-library).

#### GCP

You will need a GCP account with billing enabled. There is a [free tier](https://cloud.google.com/free/) that
includes $300 of free credit overs a 12 month period. You will also need to install the
[gcloud](https://cloud.google.com/sdk/gcloud/) command-line tool


</div>



<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Service Catalog Reference","hash":"90167a13e657c72acfd5182a1f6aebc6"}
##DOCS-SOURCER-END -->

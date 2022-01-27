---
pagination_label: Configure Gruntwork Pipelines
title: Intro
---

# Configure Gruntwork Pipelines

In the previous section, you saw [how to deploy your apps into the Reference Architecture](../03-deploy-apps/01-intro.md). Now it's
time to see how to configure a CI / CD pipeline to automate deployments.

If you are not familiar with Gruntwork Pipelines, you can learn more by reading the Gruntwork Production Deployment Guide
[How to configure a production-grade CI-CD workflow for infrastructure
code](https://gruntwork.io/guides/automations/how-to-configure-a-production-grade-ci-cd-setup-for-apps-and-infrastructure-code/).

* [CI / CD pipeline for infrastructure code](./02-ci--cd-pipeline-for-infrastructure-code.md): How to configure a CI / CD
  pipeline for infrastructure code, such as Terraform modules that configure your VPCs, databases, DNS settings, etc.

* [CI / CD pipeline for app code](./03-ci--cd-pipeline-for-app-code.md): How to configure a CI / CD pipeline for application
  code, such as a Ruby, Python, PHP, or Java web service packaged with Packer or Docker.

* [Update the CI / CD pipeline itself](./04-update-the-ci--cd-pipeline-itself.md): How to pull in changes to the pipeline from
  `terraform-aws-ci` and redeploy pipeline containers.


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"local-copier","hash":"650db08ac5b0d1c348b098d8b887c097"}
##DOCS-SOURCER-END -->

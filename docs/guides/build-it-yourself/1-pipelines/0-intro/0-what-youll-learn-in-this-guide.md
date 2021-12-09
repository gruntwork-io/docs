# What you’ll learn in this guide

This is a comprehensive guide of how to design, configure, and implement a Continuous Integration and Continuous
Delivery pipeline for your infrastructure code. This guide will walk you through the steps to set up a secure CI/CD
pipeline for your favorite infrastructure as code tools (e.g., Terraform) using your favorite CI/CD platform (e.g.,
Jenkins, Circle, GitLab, etc).

TLDR: If you follow this guide, you’ll be able to set up a pipeline that works like this:

![For an extended version with audio commentary, see <https://youtu.be/iYXghJK7YdU>](/img/guides/build-it-yourself/pipelines/walkthrough.gif)

This guide consists of four main sections:

<div className="dlist">

#### [Core Concepts](../1-core-concepts/0-why-is-it-important-to-have-ci-cd.md)

An overview of the core concepts you need to understand what a typical CI/CD pipeline entails for infrastructure code,
including a comparison with CI/CD for application code, a sample workflow, infrastructure to support CI/CD, and threat
models to consider to protect your infrastructure.

#### [Production-grade design](../2-production-grade-design/0-intro.md)

An overview of how to configure a secure, scalable, and robust CI/CD workflow that you can rely on for your
production application and infrastructure code. To get a sense of what production-grade means, check out
[The production-grade infrastructure checklist](https://gruntwork.io/guides/foundations/how-to-use-gruntwork-infrastructure-as-code-library#production_grade_infra_checklist).

#### [Deployment walkthrough](../3-deployment-walkthrough/0-pre-requisites.md)

A step-by-step guide to deploying a production-grade CI/CD pipeline in AWS using code from the Gruntwork
Infrastructure as Code Library.

#### [Next steps](../4-next-steps.md)

What to do once you’ve got your CI/CD pipeline set up.

</div>


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Local File Copier","hash":"e1dca32970bbcb9d9f8f5c1b7f07a4df"}
##DOCS-SOURCER-END -->

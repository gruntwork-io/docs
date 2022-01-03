---
sidebar_label: What you’ll learn in this guide
pagination_label: Set Up an Infrastructure CI/CD Pipeline
---

import { CardList } from "/src/components/CardGroup"

# Set Up an Infrastructure CI/CD Pipeline

:::caution

This guide hasn’t been updated in the past 6 months. If you find any inaccuracies, please share with us at feedback@gruntwork.io.

:::

## Overview

This is a comprehensive guide of how to design, configure, and implement a Continuous Integration and Continuous
Delivery pipeline for your infrastructure code. This guide will walk you through the steps to set up a secure CI/CD
pipeline for your favorite infrastructure as code tools (e.g., Terraform) using your favorite CI/CD platform (e.g.,
Jenkins, Circle, GitLab, etc).

TLDR: If you follow this guide, you’ll be able to set up a pipeline that works like this:

![For an extended version with audio commentary, see <https://youtu.be/iYXghJK7YdU>](/img/guides/build-it-yourself/pipelines/walkthrough.gif)

## Sections

Feel free to read this guide from start to finish or skip around to whatever sections interest you.

<CardList>
  <Card
    title="Core Concepts"
    href="/docs/guides/build-it-yourself/pipelines/core-concepts/why-is-it-important-to-have-ci-cd"
  >
    An overview of the core concepts you need to understand what a typical CI/CD pipeline entails for infrastructure code,
    including a comparison with CI/CD for application code, a sample workflow, infrastructure to support CI/CD, and threat
    models to consider to protect your infrastructure.
  </Card>
  <Card
    title="Production-grade Design"
    href="/docs/guides/build-it-yourself/pipelines/production-grade-design/intro"
  >
    An overview of how to configure a secure, scalable, and robust CI/CD workflow that you can rely on for your
    production application and infrastructure code.
  </Card>
  <Card
    title="Deployment Walkthrough"
    href="/docs/guides/build-it-yourself/pipelines/deployment-walkthrough/pre-requisites"
  >
    A step-by-step guide to deploying a production-grade CI/CD pipeline in AWS using code from the Gruntwork
    Infrastructure as Code Library.
  </Card>
  <Card
    title="Next Steps"
    href="/docs/guides/build-it-yourself/pipelines/next-steps"
  >
    What to do once you’ve got your CI/CD pipeline set up.
  </Card>
</CardList>


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Local File Copier","hash":"9fadda147564499d6fa99721cd23d902"}
##DOCS-SOURCER-END -->

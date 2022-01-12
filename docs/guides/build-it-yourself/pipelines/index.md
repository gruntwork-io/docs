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

## What this guide will not cover

CI/CD for infrastructure code is a large topic and a single guide cannot cover everything. There
are several items that this guide will not cover, including:

<div className="dlist">

#### A pipeline for setting up new environments

This guide will focus on a CI/CD workflow for making changes to infrastructure in an environment that is already set
up. In other words, the design and implementation of the pipeline covered in this guide intentionally does not solve
the use case of infrastructure code for setting up an environment from scratch. Setting up new environments typically
require complex deployment orders and permissions modeling that complicate the task. This makes it hard to automate in
a reasonable fashion that still respects the threat model we cover here.

#### Automated testing and feature toggling strategies for infrastructure code

An important factor of CI/CD pipelines is the existence of automated testing and feature toggles. Automated tests give
you confidence in the code before it is deployed to production. Similarly, feature toggles allow you to partially
integrate and deploy code for a feature without enabling it. By doing so, you are able to continuously integrate new
developments over time. This guide will briefly introduce automated testing and feature toggles for infrastructure
code, but will not do a deep dive on the subject. You can learn more about best practices for automated testing in our
talk
[Automated
testing for Terraform, Docker, Packer, Kubernetes, and More](https://blog.gruntwork.io/new-talk-automated-testing-for-terraform-docker-packer-kubernetes-and-more-cba312171aa6) and blog post
[Agility requires safety](https://www.ybrikman.com/writing/2016/02/14/agility-requires-safety/).

</div>

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
{"sourcePlugin":"Local File Copier","hash":"7bc81688253ed25fe174fa43506dcda0"}
##DOCS-SOURCER-END -->

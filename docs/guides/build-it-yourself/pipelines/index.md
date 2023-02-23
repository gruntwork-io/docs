---
sidebar_label: What you’ll learn in this guide
pagination_label: Set Up an Infrastructure CI/CD Pipeline
---

import { CardList } from "/src/components/CardGroup"

# Set Up an Infrastructure CI/CD Pipeline

:::info

This document is an excellent resource for understanding the problem space of CI/CD and the design choices that Gruntwork Pipelines makes.  

If you are looking to get hands-on with Gruntwork Pipelines and deploy it yourself, see [the official examples in our service catalog](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/examples/for-production/gruntwork-pipelines)

:::

## Overview

This is a comprehensive guide explaining the problem space of CI/CD, its threat vectors, and the design decisions that Gruntwork Pipelines 
makes in order to keep your sensitive credentials secure. 

## What this guide will not cover

This guide is not hands-on! If you're looking to explore and play around with Gruntwork Pipelines, you should instead view and deploy [our official 
examples in our service catalog](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/examples/for-production/gruntwork-pipelines).

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
    href="/guides/build-it-yourself/pipelines/core-concepts/why-is-it-important-to-have-ci-cd"
  >
    An overview of the core concepts you need to understand what a typical CI/CD pipeline entails for infrastructure code,
    including a comparison with CI/CD for application code, a sample workflow, infrastructure to support CI/CD, and threat
    models to consider to protect your infrastructure.
  </Card>
  <Card
    title="Production-grade Design"
    href="/guides/build-it-yourself/pipelines/production-grade-design/intro"
  >
    An overview of how to configure a secure, scalable, and robust CI/CD workflow that you can rely on for your
    production application and infrastructure code.
  </Card>
  <Card
    title="Deployment Walkthrough"
    href="/guides/build-it-yourself/pipelines/deployment-walkthrough/pre-requisites"
  >
    A step-by-step guide to deploying a production-grade CI/CD pipeline in AWS using code from the Gruntwork
    Infrastructure as Code Library.
  </Card>
  <Card
    title="Next Steps"
    href="/guides/build-it-yourself/pipelines/next-steps"
  >
    What to do once you’ve got your CI/CD pipeline set up.
  </Card>
</CardList>


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"local-copier","hash":"0d4a701ecaf6b15a54896e84ee9673cf"}
##DOCS-SOURCER-END -->

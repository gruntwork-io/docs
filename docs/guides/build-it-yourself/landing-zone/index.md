---
sidebar_label: What you’ll learn in this guide
pagination_label: Configure Your Accounts With Landing Zone
---

import { CardList } from "/src/components/CardGroup"

# Configure Your Accounts with Landing Zone

:::caution

This guide hasn’t been updated in the past 6 months. If you find any inaccuracies, please share with us at feedback@gruntwork.io.

:::

## Overview

This guide will walk you through the process of configuring a production-grade AWS account structure, including how to manage multiple environments, users, permissions, and audit logging. We’ll also discuss how to implement a Landing Zone solution that lets you quickly spin up new AWS accounts that all implement a security baseline that enforces your company’s policies.

## Gruntwork AWS Landing Zone vs the alternatives

In June 2018, Amazon [announced](https://aws.amazon.com/about-aws/whats-new/2018/06/introducing-aws-landing-zone/)
AWS Landing Zone, which solved three core problems:

1.  Streamline the process of creating a new AWS account;

2.  Configure that new AWS account according to best practices;

3.  And make it possible to configure a best-practices multi-AWS-account setup.

Almost every AWS customer that creates more than a few accounts needs to solve these problems, so over time we
saw additional solutions enter the market. We call all of these options "Landing Zone solutions" and when we
evaluated them, we found that they varied along the following dimensions:

- **Customizability.** Some users are content to stick with AWS’s default definition of "best
  practices" for how their newly created account should be configured, but other customers would like to add to,
  subtract from or modify that definition and some Landing Zones offer very little customization at all.

- **Automatable.** Many users want to define their own custom pipeline for creating new AWS accounts, but not all
  Landing Zone solutions can be integrated into an arbitrary pipeline. For example, AWS Control Tower includes
  Landing Zone functionality, but does not expose any kind of API and is usable only from the management console.

- **UI-driven.** Some AWS users want a first-class UI they can use to deploy new AWS accounts, but not all Landing
  Zone solutions expose a UI.

- **Terraform-native.** Terraform users often want 100% of their deployed infrastructure to be codified in Terraform,
  but some Landing Zone solutions only offer support for CloudFormation or no infrastructure as code at all.

- **No dependencies.** Some AWS Landing Zone solutions depend on purchasing related commercial products or services
  to have access to them or to make them work, whereas other Landing Zone solutions stand on their own without any
  third-party or related-service dependencies.

With these dimensions in mind, we set out to build a Landing Zone solution that:

- Is fully customizable

- Is easily automatable as part of a separate pipeline

- Is 100% Terraform-native

- Does not depend on any third-party products or related services

Because we use Terraform, we do not currently see the need for adding a first-class UI to our Landing Zone
solution, however some users may wish to add UI or UI-like functionality through their CI system or other Terraform
automation tools.

## Sections

Feel free to read this guide from start to finish or skip around to whatever sections interest you.

<CardList>
  <Card
    title="Core Concepts"
    href="/guides/build-it-yourself/landing-zone/core-concepts/what-is-an-aws-account-structure"
  >
    An overview of the core concepts you need to understand to set up an AWS account structure, including AWS Organizations, IAM Users, IAM Roles, IAM Groups, CloudTrail, and more.
  </Card>
  <Card
    title="Production-grade Design"
    href="/guides/build-it-yourself/landing-zone/production-grade-design/intro"
  >
    An overview of how to configure a secure, scalable, highly available AWS account structure that you can rely on in production.
  </Card>
  <Card
    title="Deployment Walkthrough"
    href="/guides/build-it-yourself/landing-zone/deployment-walkthrough/pre-requisites"
  >
    A step-by-step guide to configuring a production-grade AWS account structure using the Gruntwork AWS Landing Zone solution, including how to manage it all with customizable security baselines defined in Terraform.
  </Card>
  <Card
    title="Next Steps"
    href="/guides/build-it-yourself/landing-zone/next-steps"
  >
    What to do once you’ve got your AWS account structure configured.
  </Card>
</CardList>


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"local-copier","hash":"958ca6a907fe9689d532102b723241d7"}
##DOCS-SOURCER-END -->

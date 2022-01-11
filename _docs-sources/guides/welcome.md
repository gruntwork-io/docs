---
sidebar_label: "Introduction"
sidebar_position": 1
hide_table_of_contents: true
hide_title: true
---

import Card from "/src/components/Card"
import Grid from "/src/components/Grid"
import CenterLayout from "/src/components/CenterLayout"

<CenterLayout>

# Gruntwork Guides

As a Gruntwork subscriber, you have two primary ways to engage with our library. Whichever approach you choose, our guides provide step-by-step instructions to help you deploy your infrastructure with confidence. We also offer detailed upgrade guides to ensure that your infrastructure remains up-to-date with the latest security patches, compliance requirements, and DevOps best practices.

<Grid cols={2}>
  <Card
    title="Set Up Your Reference Architecture"
    href="/docs/guides/reference-architecture"
  >
    Learn how to use and administer a Reference Architecture which Gruntwork has
    deployed for you.
  </Card>
  <Card
    title="Build Your Own Architecture"
    href="#build-your-own-architecture"
  >
    Learn how to utilize our service modules to construct a world-class
    architecture on your own.
  </Card>
</Grid>

## Build Your Own Architecture

The Gruntwork IaC library empowers you to construct your own bespoke architecture in record time. By mix-and-matching our modules and services you can quickly define a custom architecture to suit your needs, all with the confidence of having world-class, battle-tested code running under the hood. This series of guides aims to teach you how to configure and deploy some of our most popular services. Additional guides will be added over time, but the principles covered extend to the rest of the IaC library. If you have trouble, don’t hesitate to ask questions via our [support channels](/docs/guides/support).

### Follow Our Step-By-Step Guides

<Grid>
  <Card
    title="Set Up Your AWS Accounts"
    href="/docs/guides/build-it-yourself/landing-zone/intro/what-youll-learn-in-this-guide"
  >
    Set up a multi-account structure using Gruntwork Landing Zone.
  </Card>
  <Card
    title="Configure a CI/CD Pipeline"
    href="/docs/guides/build-it-yourself/pipelines/intro/what-youll-learn-in-this-guide"
  >
    Implement continuous deployment for your infrastructure code with Gruntwork
    Pipelines.
  </Card>
  <Card
    title="Deploy a VPC"
    href="/docs/guides/build-it-yourself/vpc/intro/what-youll-learn-in-this-guide"
  >
    Set up your network according to industry best practices using our VPC service.
  </Card>
  <Card
    title="Deploy a Kubernetes Cluster"
    href="/docs/guides/build-it-yourself/kubernetes-cluster/intro/what-youll-learn-in-this-guide"
  >
    Deploy a Kubernetes Cluster to host all of your apps and services.
  </Card>
  <Card
    title="Acheive Compliance"
    href="/docs/guides/build-it-yourself/achieve-compliance/intro/what-youll-learn-in-this-guide"
  >
    Make your infrastructure compliant with the CIS AWS Foundations Benchmark.
  </Card>
</Grid>

### Dig Into the Code

<Grid cols={2}>
  <Card title="Browse Services" href="/docs/reference/services/intro">
    View the API reference for our entire service catalog to learn what’s
    available.
  </Card>
  <Card
    title="View the Code in GitHub"
    href="https://github.com/orgs/gruntwork-io/repositories"
  >
    If you're the type who likes to jump straight to the source, this is for
    you.
  </Card>
</Grid>

</CenterLayout>

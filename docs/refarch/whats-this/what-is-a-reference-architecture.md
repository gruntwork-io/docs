# What is AWS Platform Architecture?

:::note Legacy Product

The Gruntwork Reference Architecture has been superseded by the **AWS Platform Architecture** component of [AWS Accelerator](/2.0/docs/overview/concepts/gruntworkplatform). New customers should use AWS Accelerator for the latest best practices and features.

:::

The AWS Platform Architecture (formerly Gruntwork Reference Architecture) is an implementation of best practices for infrastructure in the cloud. It is an end-to-end tech stack built on top of our AWS IaC Library, deployed into your AWS accounts.

AWS Platform Architecture is opinionated, and delivered as code. It is written in [Terragrunt](https://terragrunt.gruntwork.io/), our thin wrapper that provides extra tools for managing remote state and keeping your configurations [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself). Our `_envcommon` pattern reduces the amount of code you need to copy from one place to another when creating additional identical infrastructure.

## Components

AWS Platform Architecture has three main components — AWS Account Factory, Gruntwork Pipelines, and a Sample Application.

### AWS Account Factory

[AWS Account Factory](/2.0/docs/accountfactory/concepts/) is a Terraform-native approach to [AWS Landing Zone / Control Tower](https://docs.aws.amazon.com/controltower/latest/userguide/what-is-control-tower.html). This uses Terragrunt to quickly create new AWS accounts, configure them with a standard security baseline, and defines a best-practices multi-account setup.


### Gruntwork Pipelines

[Gruntwork Pipelines](/2.0/docs/pipelines/concepts/overview) makes the process of deploying infrastructure similar to how developers often deploy code. It is a code framework and approach that enables the customer to use your preferred CI tool to set up an end-to-end pipeline for infrastructure code.


### Sample Application

Our [sample application](https://github.com/gruntwork-io/aws-sample-app) is built with JavaScript, Node.js, and Express.js, following [Twelve-Factor App](https://12factor.net/) practices. It consists of a load balancer, a front end, a backend, a cache, and a database.


<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "be6add7032b21738ccfdf7fff3d6dece"
}
##DOCS-SOURCER-END -->

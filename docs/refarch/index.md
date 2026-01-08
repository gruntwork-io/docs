# AWS Platform Architecture (Legacy)

:::note Legacy Product

The Gruntwork Reference Architecture has been superseded by the **AWS Platform Architecture** component of [Gruntwork AWS Accelerator](/2.0/docs/overview/concepts/gruntworkplatform). New customers should use Gruntwork AWS Accelerator for the latest best practices and features.

:::

The AWS Platform Architecture (formerly Gruntwork Reference Architecture) is an implementation of best practices for infrastructure in the cloud. It is an opinionated, end-to-end tech stack built on top of our Gruntwork AWS IaC Library, deployed into the customer's AWS accounts. It is comprised of three pieces.

## Gruntwork AWS Account Factory

[Gruntwork AWS Account Factory](/2.0/docs/accountfactory/concepts/) is a Terraform-native approach to [AWS Landing Zone / Control Tower](https://docs.aws.amazon.com/controltower/latest/userguide/what-is-control-tower.html). This uses Terraform to quickly create new AWS accounts, configure them with a standard security baseline, and defines a best-practices multi-account setup.

## Sample Application

Our [sample application](https://github.com/gruntwork-io/aws-sample-app) is built with JavaScript, Node.js, and Express.js, following [Twelve-Factor App](https://12factor.net/) practices. It consists of a load balancer, a front end, a backend, a cache, and a database.

## Gruntwork Pipelines

[Gruntwork Pipelines](/2.0/docs/pipelines/concepts/overview) makes the process of deploying infrastructure similar to how developers often deploy code. It is a code framework and approach that enables the customer to use your preferred CI tool to set up an end-to-end pipeline for infrastructure code.


<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "3e89f0794c8838a8942e8594862da4f1"
}
##DOCS-SOURCER-END -->

# Reference Architecture

The Gruntwork Reference Architecture is an implementation of best practices for infrastructure in the cloud. It is an opinionated, end-to-end tech stack built on top of our Infrastructure as Code Library, deployed into the customer's AWS accounts. It is comprised of three pieces.
## Landing Zone

Gruntwork Landing Zone is a Terraform-native approach to [AWS Landing zone / Control Tower](https://docs.aws.amazon.com/controltower/latest/userguide/what-is-control-tower.html). This uses Terraform to quickly create new AWS accounts, configure them with a standard security baseline, and defines a best-practices multi-account setup.

## Sample Application

Our [sample application](https://github.com/gruntwork-io/aws-sample-app) is built with JavaScript, Node.js, and Express.js, following [Twelve-Factor App](https://12factor.net/) practices. It consists of a load balancer, a front end, a backend, a cache, and a database.

## Pipelines

[Gruntwork Pipelines](/pipelines/what-is-it/) makes the process of deploying infrastructure similar to how developers often deploy code. It is a code framework and approach that enables the customer to use your preferred CI tool to set up an end-to-end pipeline for infrastructure code.
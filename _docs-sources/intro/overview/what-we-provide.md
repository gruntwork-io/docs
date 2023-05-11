# What we provide

## Gruntwork IaC Library

A battle-tested, production-grade _catalog_ of infrastructure code that contains the core "building blocks" of infrastructure. It includes everything you’ll need to set up:

- A Multi-account structure
- An infrastructure CI/CD Pipeline
- Networking and VPCs
- App orchestration — ECS, EC2, Kubernetes, and more
- Data storage — Aurora, Elasticache, RDS, and more
- Best-practice security baselines
- _and [more…](/iac/whats-this/)_

## Gruntwork Compliance

An optional _catalog extension_ that contains building blocks that implement various compliance standards. Today we support CIS compliance; SOC 2 is coming soon, and we plan on adding additional standards in the future.

## Support

Gruntwork offers basic and paid support options:

- **[Community support](/support#get-support).** Get help via a [Gruntwork Community Slack](https://gruntwork-community.slack.com/archives/CHH9Y3Z62) and our [Knowledge Base](https://github.com/gruntwork-io/knowledge-base/discussions).
- **[Paid support](/support#paid-support-tiers).** Get help via email, a private Slack channel, or scheduled Zoom calls, with response times backed by SLAs.

## Gruntwork’s Limitations

Gruntwork focuses on helping you launch and maintain your infrastructure as code. Understanding and using the AWS services that our code provisioned is up to you. Since Gruntwork is an accelerator for your AWS infrastructure and not an abstraction layer in front of AWS, knowledge of AWS and the services you intend to use is required.

If you purchased our Reference Architecture: During the process of setting up the AWS accounts our tooling will automatically submit quota increase requests to AWS as a support ticket. These AWS quota increases are required to install the components of the Reference Architecture. Often, AWS will approve these requests quickly. Sometimes these support tickets will take some time for AWS to resolve. Unfortunately, some of these requests may be denied by AWS’s support team. Gruntwork can work with you to get these requests approved, but this can take some time, and that time is mostly out of our control.

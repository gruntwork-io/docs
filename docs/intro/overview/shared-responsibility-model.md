# Shared Responsibility Model

:::note

The implementation and maintenance of Gruntwork products in AWS is a shared responsibility between Gruntwork and the customer.

:::

## Gruntwork is responsible for:

1. Providing a tested, updated, and richly featured collection of infrastructure code for the customer to use.
1. Maintaining a healthy Knowledge Base community where other engineers (including Grunts) post & answer questions.
1. For Pro / Enterprise Support customers: Answering questions via email and Slack.
1. For Reference Architecture customers:
    1. Generating the initial Reference Architecture based on our customer’s selections of available configurations. This includes:
        1. Our implementation of Landing Zone
        1. A complete sample app with underlying database and caching layer
        1. The Gruntwork Pipeline for deploying changes to infrastructure
        1. An overview of how to use the Reference Architecture
    1. Deploying the initial Reference Architecture into the customer’s brand new empty AWS accounts.
    1. Delivering the initial Reference Architecture Infrastructure as Code to the customer.
    1. Providing resources to the customer for deeply understanding the inner workings of the Reference Architecture.
1. For CIS customers:
    1. Providing IaC libraries to the CIS customer that correctly implement CIS requirements and restrictions.
    1. For aspects of the CIS AWS Foundations Benchmark where those requirements cannot be met by modules, but require human intervention, provide instructions on manual steps the customer must take to meet the requirements.
    1. For CIS Reference Architecture customers, deploying a Reference Architecture and providing access to infrastructure code that implements the CIS AWS Foundations Benchmark requirements out-of-the-box, wherever possible.

## As a Gruntwork customer, you are responsible for:

1. Staffing appropriately (as described in the [Prerequisites Guide](/intro/overview/reference-architecture-prerequisites-guide/)) to maintain and customize the modules and (if applicable) the Reference Architecture and to understand how the Gruntwork product works so that changes can be made to customize it to the customer’s needs.
    1. Raise limitations of Gruntwork modules as a feature request or a pull request.
        1. N.B., Gruntwork does not guarantee any turn-around time on getting features built or PRs reviewed and merged. Gruntwork modules must also be applicable to a wide range of companies, so we will be selective about features added and pull requests accepted.
1. Adding additional Infrastructure as Code to customize it for your company.
1. Communicating with AWS to fix account issues and limitations beyond Gruntwork’s control (quotas, account verification, et cetera).
1. For Reference Architecture customers:
    1. Following all provided manual steps in the Reference Architecture documents where automation is not possible. There are certain steps a Reference Architecture customer must perform on their own. Please keep an eye out for emails from Gruntwork engineers when you are configuring your Reference Architecture form for 
    deployment. 
    1. Extending and customizing Gruntwork Pipelines beyond the basic CI/CD pipeline that Gruntwork has provided to suit your deployment requirements.
    1. Designing and implementing your AWS infrastructure beyond the Reference Architecture.
        1. Understanding and awareness of AWS resource costs for all infrastructure deployed into your AWS accounts ([Knowledge Base #307](https://github.com/gruntwork-io/knowledge-base/discussions/307) for Ref Arch baseline).
    1. Once deployed, maintaining the Reference Architecture to keep it secure and up to date.
        1. Keeping the Reference Architecture secure in accordance with their company needs.
        1. Understanding and accepting the security implications of any changes made to the Reference Architecture.
        1. Monitoring Gruntwork repositories for updates and new releases and applying them as appropriate.
        1. Maintaining all compliance standards after the Reference Architecture has been delivered.


<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "7c6a3318381f1d2e939d82db1c179334"
}
##DOCS-SOURCER-END -->

# What you provide

Gruntwork products and services can help you quickly achieve world-class infrastructure. However, we aren’t a consulting company. To succeed, you (or your trusted DevOps consultant/contractor) must commit to learning how to leverage our products for your use cases, making any additional customizations, and deploying or migrating your apps and services.

## Learn how to use our products

To work effectively with our products, you’ll need to understand our opinionated stance on DevOps best practices and how to apply it for your purposes. You'll also need to learn how to use the Gruntwork products themselves. Our guides and support remain available to assist you in these endeavors.

## Implement the “last mile”

Gruntwork products strike a balance between opinionatedness and configurability. They’ll get you most of the way to your goal, but you may need to make some customizations to suit your use case. You may also need to adapt your apps and services to run in your new infrastructure. Our [Knowledge Base](https://github.com/gruntwork-io/knowledge-base/discussions) and [Community Slack Channel](https://gruntwork-community.slack.com/archives/CHH9Y3Z62) provide great resources to assist you in this effort.

## As a Gruntwork customer, you are responsible for

1. Staffing appropriately (as described in the [Prerequisites Guide](/intro/overview/reference-architecture-prerequisites-guide)) to maintain and customize the modules and (if applicable) the Reference Architecture and to understand how the Gruntwork product works so that changes can be made to customize it to the customer’s needs.
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
  "hash": "7c188f5625165266fbce224db1dc03ce"
}
##DOCS-SOURCER-END -->

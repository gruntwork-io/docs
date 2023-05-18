# What you provide

Gruntwork products and services can help you quickly achieve world-class infrastructure. However, we aren’t a consulting company. To succeed, you (or your trusted DevOps consultant/contractor) must commit to learning how to leverage our products for your use cases, making any additional customizations, and deploying or migrating your apps and services.

## Your team

You must be appropriately staffed in order to maintain and customize the modules, services, and (if applicable) the Reference Architecture.

## Time to learn

With Gruntwork, you can accelerate your journey towards capturing your AWS cloud infrastructure as Infrastructure as Code. Although our aim is to simplify this intricate process, gaining a comprehensive understanding of your infrastructure's complexities and tailoring it to your specific needs will require a significant investment of time and effort on your part. Our [product documentation](/products) and [support](/support) remain available to assist you in these endeavors.

## Implement the “last mile”

Gruntwork products strike a balance between opinionatedness and configurability. They’ll get you most of the way to your goal, but you may need to make some customizations to suit your use case. You may also need to adapt your apps and services to run in your new infrastructure by customizing/adding additional Infrastructure as Code to customize according to the requirements for your company. Our [Knowledge Base](https://github.com/gruntwork-io/knowledge-base/discussions) and [Community Slack Channel](https://gruntwork-community.slack.com/archives/CHH9Y3Z62) provide great resources to assist you in this effort.

If you notice a limitation or bug in Gruntwork modules, we greatly appreciate and welcome [customer PRs](/iac/support/contributing) or you raising this to our attention via [bug or feature requests](/iac/support/issues).

:::note

Gruntwork does not guarantee any turn-around time on getting features built or PRs reviewed and merged. Gruntwork modules must also be applicable to a wide range of companies, so we will be selective about features added and pull requests accepted.

:::

## Talk to AWS if needed

You'll have to communicate with AWS to fix account issues and limitations beyond Gruntwork’s control (quotas, account verification, et cetera).

## If you purchased a Reference Architecture

### Perform any required manual steps

Following all provided manual steps in the Reference Architecture documents where automation is not possible. There are certain steps a Reference Architecture customer must perform on their own. Please keep an eye out for emails from Gruntwork engineers when you are configuring your Reference Architecture form for
deployment.

### Customize Pipelines

Extend and customize Gruntwork Pipelines beyond the basic CI/CD pipeline that Gruntwork has provided to suit your deployment requirements.

### Understand your AWS costs

Understanding and awareness of AWS resource costs for all infrastructure deployed into your AWS accounts ([Knowledge Base #307](https://github.com/gruntwork-io/knowledge-base/discussions/307) for Ref Arch baseline).

### Maintain your Reference Architecture

Once deployed, Gruntwork hands the Reference Architecture over to your team. You should expect to keep it secure and up to date by:

- Keeping the Reference Architecture secure in accordance with your company needs.
- Understanding and accepting the security implications of any changes your team makes to the Reference Architecture.
- Monitoring Gruntwork repositories for updates and new releases and applying them as appropriate.
- Maintaining all compliance standards after the Reference Architecture has been delivered.


<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "c5bd92dbb43cc8eb1b007dc3ae5649b5"
}
##DOCS-SOURCER-END -->

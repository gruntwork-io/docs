# Shared Responsibility Model

**The implementation and maintenance of Gruntwork products in AWS is a shared responsibility between Gruntwork and the customer.**

**Gruntwork is responsible for:**

- Providing a tested, updated, and richly featured collection of infrastructure code for the customer to use.
- Maintaining a healthy Knowledge Base community where other engineers (including Grunts) post & answer questions.
- For Pro / Enterprise Support customers: Answering questions via email and Slack.
- For Reference Architecture customers:
    - Generating the initial Reference Architecture based on our customer’s selections of available configurations. This includes:
        - Our implementation of Landing Zone
        - A complete sample app with underlying database and caching layer
        - The Gruntwork Pipeline for deploying changes to infrastructure
        - An overview of how to use the Reference Architecture
        - Manual steps the customer needs to take that can only be done by the customer
    - Deploying the initial Reference Architecture into the customer’s brand new empty AWS accounts.
    - Delivering the initial Reference Architecture Infrastructure as Code to the customer.
    - Providing resources to the customer for deeply understanding the inner workings of the Reference Architecture.
- For CIS customers:
    - Providing IaC libraries to the CIS customer that correctly implement CIS requirements and restrictions.
    - For aspects of the CIS AWS Foundations Benchmark where those requirements cannot be met by modules, but require human intervention, provide instructions on manual steps the customer must take to meet the requirements.
    - For CIS Reference Architecture customers, deploying a Reference Architecture and providing access to infrastructure code that implements the CIS AWS Foundations Benchmark requirements out-of-the-box, wherever possible.

**As a Gruntwork customer, you are responsible for:**

- Staffing appropriately (as described in the [Prerequisites Guide](/intro/overview/reference-architecture-prerequisites-guide/)) to maintain and customize the modules and (if applicable) the Reference Architecture and to understand how the Gruntwork product works so that changes can be made to customize it to the customer’s needs.
    - Raise limitations of Gruntwork modules as a feature request or a pull request.
    - Gruntwork does not guarantee any turn-around time on getting features built or PRs reviewed and merged. Gruntwork modules must also be applicable to a wide range of companies, and will be selective about features to be added.
- Adding additional Infrastructure as Code to customize it for their company.
- Communicating with AWS to fix account issues and limitations beyond Gruntwork’s control (quotas, account verification, et cetera).
- For Reference Architecture customers:
    - Following all provided manual steps in the Reference Architecture documents where automation is not possible.
    - Extending and customizing Gruntwork Pipelines beyond the basic CI/CD pipeline that Gruntwork has provided to suit their deployment requirements.
    - Designing and implementing their AWS infrastructure beyond the Reference Architecture.
        - Understanding and awareness of AWS resource costs for all infrastructure deployed into their AWS accounts ([Knowledge Base #307](https://github.com/gruntwork-io/knowledge-base/discussions/307) for Ref Arch baseline).
    - Once deployed, maintaining the Reference Architecture to keep it secure and up to date.
        - Keeping the Reference Architecture secure in accordance with their company needs.
        - Understanding and accepting the security implications of any changes made to the Reference Architecture.
        - Monitoring Gruntwork repositories for updates and new releases and applying them as appropriate.
        - Maintaining all compliance standards after the Reference Architecture has been delivered.


<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "8cb709ae3048d52e73ed306feae96724"
}
##DOCS-SOURCER-END -->

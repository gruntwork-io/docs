# Accessing the code

Gruntwork provides all code included in your subscription to the Infrastructure as Code (IaC) library through GitHub. To gain access to the IaC Library, you must first [create an account in the Developer Portal](../../developer-portal/create-account.md). Once you have an account, you must [link your Github ID](../../developer-portal/link-github-id) to your Developer Portal account to gain access to the IaC Library.

## Accessing Modules and Services in the IaC library

Once you have gained access to the Gruntwork IaC library, you can view the source code for our modules and services in [Github](https://github.com/orgs/gruntwork-io/repositories). For a full list of modules and services, check the [Library Reference](../../iac/reference/index.md).

In Github, each IaC repository is prefixed with `terraform-aws-` then a high level description of the modules it contains. For example, Amazon SNS, SQS, MSK, and Kinesis are located in the `terraform-aws-messaging` repository. In each repository, the modules are located in the `modules` directory. Example usage and tests are provided for each module in the `examples` and `tests` directories, respectively.


<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "88f91722ace689986e5db3d4b5723cfc"
}
##DOCS-SOURCER-END -->

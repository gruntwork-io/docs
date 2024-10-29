# Accessing the code

Gruntwork provides all code included in your subscription to the Infrastructure as Code (IaC) library through GitHub. To gain access to the IaC Library, you must first [create an account in the Developer Portal](/2.0/docs/overview/developer-portal/create-account). Once you have an account, you must [link your GitHub ID](/2.0/docs/overview/developer-portal/link-github-id) to your Developer Portal account to gain access to the IaC Library.

## Accessing Modules and Services in the IaC library

Once you have gained access to the Gruntwork IaC library, you can view the source code for our modules and services in [GitHub](https://github.com/orgs/gruntwork-io/repositories). For a full list of modules and services, check the [Library Reference](/2.0/reference/library).

In GitHub, each IaC repository is prefixed with `terraform-aws-` then a high level description of the modules it contains. For example, Amazon SNS, SQS, MSK, and Kinesis are located in the `terraform-aws-messaging` repository. In each repository, the modules are located in the `modules` directory. Example usage and tests are provided for each module in the `examples` and `tests` directories, respectively.
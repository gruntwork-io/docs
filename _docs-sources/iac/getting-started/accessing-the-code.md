# Accessing the code

Gruntwork provides all code included in your subscription to the Infrastructure as Code (IaC) library through GitHub.

To gain access to the IaC Library, link your GitHub ID to your account in the Developer Portal. Follow the steps outlined in the Developer Portal guide on [linking your Github ID](../../developer-portal/link-github-id).

## Accessing Modules and Services in the IaC library

Once you have gained access to the Gruntwork IaC library on Github, you search for repositories and view the source for our modules and services on Github.

Each IaC repository is prefixed with `terraform-aws-`, then a high level description of the modules it contains. For example, Amazon SNS, SQS, MSK, and Kinesis are located in the `terraform-aws-messaging` repository. In each repository, the modules are located in the `modules` directory. Example usage and tests are provided for each module in the `examples` and `tests` directories, respectively.

Please check the [Library Reference](../../iac/reference/index.md) to view the complete list of the available modules and services.

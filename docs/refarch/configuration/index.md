# Get Started

The Gruntwork Reference Architecture allows you to configure key aspects to your needs. Before you receive your deployed Reference Architecture, you will:
1. **Configure** your choice of your primary AWS region, database and compute flavors, domain names and more via a pull request
2. **Iterate** on the configuration in your pull request in response to Gruntwork preflight checks that spot blocking issues and ensure your deployment is ready to commence
3. **Merge** your pull request after all checks pass. Merging will automatically commence your Reference Architecture deployment
4. **Wait** until Gruntwork has successfully completed your deployment. You’ll receive an automated email indicating your deployment is complete

Below, we'll outline the Reference Architecture at a high level.

note: add pre-reqs section about things you need to know

## Requirements

This guide requires that you have access to an AWS IAM user or role in the AWS account that serves as your Organization Root for AWS Organizations with permissions to create member accounts. For more information on IAM policies for AWS organizations see the AWS guide on [managing IAM policies for AWS Organizations](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_permissions_iam-policies.html#orgs_permissions_grant-admin-actions).

## RefArch Configuration

Your Reference Architecture configuration lives in your `infrastructure-live` repository on GitHub. Within your `infrastructure-live` repository, the `reference-architecture-form.yml` file defines all of your specific selections, domain names, AWS account IDs, etc.

Gruntwork deployment tooling reads your `reference-architecture-form.yml` in order to first perform preflight checks to
ensure your accounts and selections are valid and ready for deployment. Once your preflight checks pass, and your pull request has been merged, Gruntwork tooling uses your `reference-architecture-form.yml` to deploy your Reference Architecture into your AWS accounts.

Gruntwork provides bootstrap scripts, automated tooling, documentation and support to help you complete your setup steps and commence your Reference Architecture deployment.

## Required Actions and Data
Some of the initial configuration steps will require you to *perform actions* against your AWS accounts, such as creating an IAM role that Gruntwork uses to access your accounts. Meanwhile, your `reference-architecture-form.yml` requires *data*, such as your AWS account IDs, domain name, etc.

### Actions

Wherever possible, Gruntwork attempts to automate setup actions *for you*.

There is a bootstrap script in your `infrastructure-live` repository that will attempt to programmatically complete your setup actions (such as provisioning new AWS accounts on your behalf, registering domain names if you wish, etc) using a setup wizard and write the resulting *data* to your `reference-architecture-form.yml` file.

### Data
`Data` refers to values, such as an AWS account ID, your desired domain name, etc, which may be the output of an action.

The gruntwork CLI includes a [wizard](/refarch/configuration/run-the-wizard.md) that automates all of the steps to get the required data from you. We strongly recommended using the wizard for the majority of users.

:::info Manual Configuration
If you are required to manually provision AWS accounts, domain names, or otherwise, the Gruntwork CLI has utilities to [manually bootstrap](https://github.com/gruntwork-io/gruntwork#bootstrap-manually) the required resources. This approach is only recommended for advanced users after consulting with Gruntwork. After all data has been generated manually, you will need to fill out the `reference-architecture-form.yml` manually.
:::

## Let’s get started!

Now that you understand the configuration and delivery process at a high level, we’ll get underway configuring your Reference Architecture.



<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "f90abf52becae4dead73f4d4d70b7114"
}
##DOCS-SOURCER-END -->

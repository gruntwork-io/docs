# Understand the process 

The Gruntwork Reference Architecture allows you to configure key aspects to your needs. Before you receive your deployed Reference Architecture, you will: 
1. **Configure** your choice of your primary AWS region, database and compute flavors, domain names and more via a pull request
2. **Iterate** on the configuration in your pull request in response to Gruntwork preflight checks that spot blocking issues and ensure your deployment is ready to commence
3. **Merge** your pull request after all check pass. Merging will automatically commence your Reference Architecture deployment 
4. **Wait** until Gruntwork has successfully completed your deployment. You'll receive an automated email indicating your deployment is complete

## Where and how to configure your Reference Architecture for deployment

GitHub, and your `infrastructure-live` repository, are the source of truth for your configuration decisions. Within your `infrastructure-live` repository, the `reference-architecture-form.yml` file is where all of your specific selections, domain names, AWS account IDs, etc are defined.  

Gruntwork deployment tooling reads your `reference-architecture-form.yml` in order to first perform preflight checks to 
ensure your accounts and selections are valid and ready for deployment. 

Once your preflight checks pass, and your pull request has been merged, Gruntwork tooling uses your `reference-architecture-form.yml` to deploy your Reference Architecture into your AWS accounts. 

Gruntwork provides bootstrap scripts, automated tooling, documentation and support to help you complete your setup steps and commence your Reference Architecture deployment. 

## Configuring your Reference Architecture requires Actions and Data
Some of the initial configuration steps will require you to *perform actions* against your AWS account(s), such as creating an IAM role that Gruntwork uses to access your accounts. Meanwhile, your `reference-architecture-form.yml` requires *data*, such as your AWS account IDs, domain name, etc. 

### Actions 

Wherever possible, Gruntwork attempts to automate setup **actions** for you. 

For example, within your `infrastructure-live` repository is a bootstrap script that will make a best effort attempt to programmatically complete your setup actions (such as provisioning new AWS accounts on your behalf, registering domain names if you wish, etc) and write their resulting *data* to your `reference-architecture-form.yml` file.

### Data 
`Data` refers to values, such as an AWS account ID, your desired domain name, etc, which may be the output of an **action**. 

You complete **setup *actions* against your AWS account(s)** and you **enter the *data* values** such as account IDs, domain names, desired compute stack, etc into your `infrastructure-live/reference-architecture-form.yml` file.

## Let's get started!

Now that you understand the configuration and delivery process at a high level, we'll get underway configuring your Reference Architecure. 


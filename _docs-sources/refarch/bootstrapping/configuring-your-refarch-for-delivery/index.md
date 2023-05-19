# Understand the process 

The Gruntwork Reference Architecture  allows you to configure key aspects to your needs. Before you receive your deployed Reference Architecture, you will configure your choices of: 
* Primary AWS Region
* Database and compute stacks
* Domain names

and more. 

## Where and how to configure your Reference Architecture for deployment

GitHub, and your `infrastructure-live` repository, are the source of truth for your configuration decisions. All your configuration changes should be committed on a branch named `ref-arch-form`.

Within your `infrastructure-live` repository, the `reference-architecture-form.yml` file is where all of your specific selections, domain names, AWS account IDs, etc are defined. 

## Configuring your Reference Architecture requires Actions and Data

### Actions 

Some of the initial configuration steps will require you to *perform actions* against your AWS account that only you are able to perform; for example, running a command to create IAM roles in your Reference Architecture AWS accounts 
that Gruntwork engineers can assume in order to perform your deployment. Wherever possible, Gruntwork provides automations and commands to facilitate completing setup **actions**, within [the Gruntwork command line interface (CLI)](https://github.com/gruntwork-io/gruntwork).

### Data 
`Data` refers to values, such as an AWS account ID, your desired domain name, etc, which may be the output of an **action**. 

You complete **setup *actions* against your AWS account(s)** and you **enter the *data* values** such as account IDs, domain names, desired compute stack, etc into your `infrastructure-live/reference-architecture-form.yml` file.



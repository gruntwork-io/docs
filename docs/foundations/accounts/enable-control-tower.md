# Enable Control Tower

Enabling Control Tower is the first step in getting started with Gruntwork Account Foundations. It must be completed
before infrastructure as code is generated for your infrastructure-live repository.

:::info

[AWS Control Tower](https://docs.aws.amazon.com/controltower/latest/userguide/what-is-control-tower.html) is an AWS service
that orchestrates accounts, handling creation, deletion, security policies, and more. It serves as the base layer of
Gruntwork Account Foundations.

:::

## Prerequisites

In order to enable control tower you will need the following:

1. A new AWS Account and a user with administrator permissions.

:::info

This account will become the root of your multi-account setup after enabling Control Tower.

:::

1. Two(2) new unique email addresses for your logs, and security(audit) accounts.


## Enable AWS Control Tower

1. Sign in to the [AWS management console](https://console.aws.amazon.com) with your administrator user credentials.

1. Navigate to the [AWS Control Tower console](https://console.aws.amazon.com/controltower).

1. Verify that you are working in your desired home Region.

  :::caution

  Your home Region is the AWS Region in which you'll run most of your workloads or store most of your data. It **cannot** be changed after you've set up your AWS Control Tower landing zone. For more information about how to choose a home Region, see [Administrative tips for landing zone setup](https://docs.aws.amazon.com/controltower/latest/userguide/tips-for-admin-setup.html).

  :::

1. Choose **Set up landing zone**.

1. Follow the instructions in the console, accepting all the default values **except the following**:

   1. Review pricing and select Regions:
      1. Enable Region Deny under "Region deny setting"
      1. Select all regions you plan to operate in under "Select additional Regions for governance"

   1. Configure Organizational Units (OUs): Select "Opt out of creating OU" under "Additional OU"

   1. Configure shared accounts: Rename the "Logs Archive" account to `Logs` and "Audit" to `Security`.

      :::caution

      Account names **cannot** be changed after setting up the landing zone. Ensure the accounts are named appropriately.

      :::
   1. Additional configurations: Check "Enable and customize encryption settings" under "KMS Encryption"

      :::caution
      This will require creating a KMS key with the proper KMS key policy as defined by AWS in [Guidance for KMS keys](https://docs.aws.amazon.com/en_us/controltower/latest/userguide//kms-guidance.html)
      :::

1. Review your choices. Please ensure all the exceptions to the default configuration listed above have been correctly handled.

1. Choose **Set up landing zone**.

1. Setting up the landing zone can take up to one hour. You will see a notification like the one below with the estimated time it will take for all the resources to be created.

  ![Landing Zone Setup Status](/img/devops-foundations/account/control-tower-setup-status.png)

  :::tip

  You can safely close the browser once you see this.

  :::

1. Emails will be sent out as the accounts are being created and the Root user will be invited to sign in using the AWS IAM Identity Center and designated the *Control Tower Admin*. Once the invite is accepted; the Root user will be able to access 3 accounts; Root, Logs, and Security using Identity Center's Access Portal URL contained in the email invite.

  ![Root User's Access Portal](/img/devops-foundations/account/root-user-access-portal.png)

## Initial Configuration

Now that Control Tower is enabled in your root account, there are a few configuration changes that need to be made to
prepare the landing zone for Gruntwork Account Foundations.

1. Navigate to the [AWS Control Tower's dashboard](https://console.aws.amazon.com/controltower/home/organization) to create additional Organization Units(OUs) using the administrator user. This is required in order to provision new accounts.

  1. Choose **Create Resources** and select Organization Units.
  1. Create a **Pre-Prod** & **Prod** OU. Select the Root OU as the Parent OU when prompted. Each OU registration takes a couple of minutes.

1. [Turn off the default VPC created for new accounts](https://docs.aws.amazon.com/controltower/latest/userguide/configure-without-vpc.html#create-without-vpc). Gruntwork VPCs will be created for each account using terraform.



<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "6bbac5fb6217e0ff8f1dabed7977c0d2"
}
##DOCS-SOURCER-END -->

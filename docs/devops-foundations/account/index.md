# AWS Account Foundations

## Prerequisites

<!-- I am making an assumption that for v1, we want customers to do this in a brand new account so we don't have to support having them turn off any settings that prevent control tower integration -->

In order to setup the Gruntwork Account foundations you will need the following:

1. A new AWS Account and a user with administrator permissions. This user will be used to integrate [AWS Control Tower](https://docs.aws.amazon.com/controltower/latest/userguide/what-is-control-tower.html); an AWS service for setting up and managing AWS multi-account environments.

  :::info

  This account will be designated the management account(root) of your multi-account setup after enabling Control Tower.

  :::

1. Two(2) unique email accounts for your logs and security(audit) accounts


## Enable AWS Control Tower

Once you have created an account and an administrator user, follow these steps to setup Control Tower:

1. Sign in to the [AWS management console](https://console.aws.amazon.com) with your administrator user credentials.

1. Navigate to the [AWS Control Tower console](https://console.aws.amazon.com/controltower).

1. Verify that you are working in your desired home Region.

  :::caution

  Your home Region is the AWS Region in which you'll run most of your workloads or store most of your data. It **cannot** be changed after you've set up your AWS Control Tower landing zone. For more information about how to choose a home Region, see [Administrative tips for landing zone setup](https://docs.aws.amazon.com/controltower/latest/userguide/tips-for-admin-setup.html).

  :::

1. Choose **Set up landing zone**.

1. Follow the instructions in the console, accepting all the default values **except the following**:

    1. Configuring Organizational Units (OUs). An OU is a container for accounts within a `root`. Control Tower setups an additional OU(Sandbox) in addition to the Foundation OU(Security). Opt out of the Sandbox OU creation. Neccessary OUs will be created later.

    <!-- The Control tower enabling process does not allow us to specify multiple additional OUs. So it is probably simpler for the follow to opt out of creating just one and have the user do it all after the control-tower-enabling process -->

    1. Configuring shared accounts in the Foundation OU(Security). Rename the "Logs Archive" account as `Logs` and "Audit" as `Security`.

      :::caution

      Account names **cannot** be changed after setting up the landing zone. Ensure the accounts are named appropriately.

      :::

    <!-- Eben asked about if we should adopt AWS's account naming -->
    <!-- CloudTrail is also setup by default. Is that something customers should turn off? -->

1. Review your choices. Please ensure all the exceptions to the default configuration listed above have been correctly handled.

1. Choose **Set up landing zone**.

1. Setting up the landing zone can take up to one hour. You will see a notification like this one below with the estimated time it will take for all the resources to be created.

  ![Landing Zone Setup Status](/img/devops-foundations/account/control-tower-setup-status.png)

  :::tip

  You can safely close the browser once you see this.

  :::

1. Emails will be sent out as the accounts are being created and the Root user will be invited to sign in using the AWS IAM Identity Center and designated the *Control Tower Admin*. Once the invite is accepted; the Root user will be able to access 3 accounts; Root account(management), as well as Logs & Security using Identity Center's Access Portal URL contained in the email invite.

  ![Root User's Access Portal](/img/devops-foundations/account/root-user-access-portal.png)

1. Navigate to the [AWS Control Tower's dashboard](https://console.aws.amazon.com/controltower/home/organization) to create additional Organization Units(OUs) using the administrator user. This is required in order to provision new accounts.

    1. Choose **Create Resources** and select Organization Units.
    1. Create a **Pre-Prod** & **Prod** OU. Select the Root OU as the Parent OU when prompted. Each OU registration takes a couple of minutes.

1. [Turn off the default VPC created for new accounts](https://docs.aws.amazon.com/controltower/latest/userguide/configure-without-vpc.html#create-without-vpc). Vetted Gruntwork VPCs will be created for each account.


## Configuring Google as Identity Provider in AWS Identity Center v1

Follow the [AWS docs](https://aws.amazon.com/blogs/security/how-to-use-g-suite-as-external-identity-provider-aws-sso/) for using Google Workspace as an Identity provider.

:::info

Once you have set up Google as the Identity Provider, return to this page to follow instructions for setting up your users in AWS IAM Identity center. This will be done with Infrastructure as Code(IaC) not click-ops.

:::

## Configuring Google as Identity Provider in AWS Identity Center v2

1. Navigate to your [IAM Identity Center's dashboard](https://console.aws.amazon.com/singlesignon/home) page.
1. Choose **Settings**.
1. Choose **Actions** on the *Identity Source* section and select **Change Identity Source**.
1. Choose **External Identity Provider**
1. Copy or Download the metadata file displayed.
1. In a separate browser tab, navigate to your [Google Workspace Admin Console](https://admin.google.com/ac/home).
1. Choose the **Apps** dropdown, and then choose **Web and mobile apps**.
1. In the **Add app** dropdown, select **Add custom SAML app**.
1. Configure the name of the application. Enter **AWS IAM Identity Center** as the application name and choose **Continue**.
1. Copy or Download the Google metadata file and choose **Continue**.
1. Fill in the Service provider details using the metadata info from IAM Identity Center, and then choose **Continue**. The mapping for the data is as follows:

    - For **ACS URL**, enter the IAM Identity Center Assertion Consumer Service (ACS) URL.
    - For **Entity ID**, enter the IAM Identity Center issuer URL.
    - Leave the **Start URL** field empty.
    - For **Name ID format**, select **EMAIL**.

1. On the **Attribute mapping page**, leave the default settings and choose **Finish**. If you get an error page, refresh your browser page.
1. The final step is to enable the application for your users. On the application page, expand the **User access** section by choosing the expand icon in the top corner. Only users that need access to AWS should have the service enabled.

## Setting Up IAM Identity Center Users with Infrastructure as Code

TODO


<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "f19f1cdd295d244643191422231531ed"
}
##DOCS-SOURCER-END -->

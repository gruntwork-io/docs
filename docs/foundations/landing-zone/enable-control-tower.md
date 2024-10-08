# Enable Control Tower

Enabling Control Tower is the first step in getting started with Gruntwork Landing Zone. It must be completed
before infrastructure as code is generated for your infrastructure-live repository.

## Prerequisites

In order to enable AWS Control Tower you will need the resources described in [Prerequisites](./prerequisites).

## Enable AWS Control Tower

:::info
This Guide should take about 1hr 15min to complete, most of that time will be spent
waiting on Control Tower Operations at the conclusion of the setup flow.
:::

### Start Control Tower Setup

1. Sign in to the [AWS management console](https://console.aws.amazon.com) with your administrator user credentials.

1. Navigate to the [AWS Control Tower console](https://console.aws.amazon.com/controltower).

1. Verify that you are working in your desired home Region.

  :::caution

  Your home Region is the AWS Region in which you'll run most of your workloads or store most of your data. It **cannot** be changed after you've set up your AWS Control Tower landing zone. For more information about how to choose a home Region, see [Administrative tips for landing zone setup](https://docs.aws.amazon.com/controltower/latest/userguide/tips-for-admin-setup.html).

  :::

1. Click **Set up landing zone**.

### Review pricing and select Regions

1. Under **Region deny setting** select Enabled

   1. This ensures Control Tower policies and controls are unable to be bypassed by using a non-governed region

1. Under **Select additional Regions for governance** select all regions where you plan to operate.

   <details>
   <summary>Screenshot</summary>

   ![Region Selections](/img/devops-foundations/account/regions.png)

   </details>

1. Click **Next** to continue

### Configure Organizational Units (OUs)

1. Rename the "Additional OU" to **"Pre-prod"** (Take note of the casing here).

   <details>
   <summary>Screenshot</summary>

   ![Configure Organizational Units](/img/devops-foundations/account/configure-ous.png)

   </details>

1. Click **Next** to continue.

### Configure shared accounts

1. Under **Logs archive account** Enter an email address and rename the `Logs Archive` account to `Logs`

1. Under **Audit account** Enter an email address and rename the `Audit` account to `Security`

   :::caution

   Account names **cannot** be changed after setting up the landing zone. Ensure the accounts are named appropriately.

   :::

   <details>
   <summary>Screenshot</summary>

   ![Configure Shared Accounts](/img/devops-foundations/account/log-archive-rename.png)

   </details>

1. Click **Next** to continue

### Additional configurations

1. Ensure your settings match the screenshot below (These are the defaults)

   <details>
   <summary>Screenshot</summary>

   ![Additional Configuration](/img/devops-foundations/account/additional-config.png)

   </details>

1. Under **KMS Encryption** Check the box for `Enable and customize encryption settings`

1. Select the KMS Key you created following the guide in [prerequisites](./prerequisites)

1. Click **Next** to continue

### Finish Control Tower Setup

:::info
Control Tower Creation will take around an hour to complete
:::

1. Review your choices and check the box accepting permissions at the bottom of the screen

1. Choose **Set up landing zone**.

1. Setting up the landing zone can take up to one hour. You will see a notification like the one below with the estimated time it will take for all the resources to be created.

   ![Landing Zone Setup Status](/img/devops-foundations/account/control-tower-setup-status.png)

   :::tip

   You can safely close your browser tab once you see this notice. The setup process will proceed unaffected in the background.

   :::

1. Emails will be sent out as the accounts are being created and the Root user will be invited to sign in using the AWS IAM Identity Center and designated the *Control Tower Admin*. Once the invite is accepted; the Root user will be able to access 3 accounts; Root, Logs, and Security using Identity Center's Access Portal URL contained in the email invite.

   ![Root User's Access Portal](/img/devops-foundations/account/root-user-access-portal.png)

## Initial Configuration

Now that Control Tower is enabled in your root account, there are a few configuration changes that need to be made to
prepare for Gruntwork Landing Zone.

1. [Turn off the default VPC created for new accounts](https://docs.aws.amazon.com/controltower/latest/userguide/configure-without-vpc.html#create-without-vpc). Gruntwork VPCs will be created for each account using terraform.

1. Navigate to the [AWS Control Tower Organization Dashboard](https://console.aws.amazon.com/controltower/home/organization)

1. Choose **Create Resources** and select `Create organizational unit`.

1. Create a **Prod** OU. Select the Root OU as the Parent OU when prompted. Each OU registration takes a couple of minutes.

1. Choose **Create Resources** again and select `Create account`

1. Name the account `Shared`, use the shared email address from the Prerequisites, and set the Organizational Unit to `Prod`

   :::tip
   The shared account is meant to house resources shared with all other accounts. Examples might include KMS Keys, AMIs,
   or ECR repositories.
   :::

1. Grant your IAM Identity Center user access to the `Shared` account

   1. Navigate to IAM Identity Center, then click AWS accounts under **Multi-account permissions** in the side menu

   1. Select the `Shared` account from the `Prod` OU dropdown and click **Assign users or groups**

   1. Switch to the `Users` tab, select your management user from the list and click **Next**

   1. Select `AWSAdministratorAccess` from the list of Permission Sets, then click **Next**
   
   1. Click `Submit` to finish assigning access to your user

## Next Steps

Control Tower is now configured! Next you should consider:

- [Configuring IAM Identity Center](https://docs.aws.amazon.com/singlesignon/latest/userguide/get-started-choose-identity-source.html) for Access Control.
- [Configuring any controls or SCPs](https://docs.aws.amazon.com/controltower/latest/userguide/controls.html) your organization requires.
- [Setting up your Gruntwork IaC Foundations](../iac-foundations)


<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "7f0cf25bc7a6d0be668c9df811b82396"
}
##DOCS-SOURCER-END -->

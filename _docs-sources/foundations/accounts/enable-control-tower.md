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

1. A new AWS Account and a user with administrator permissions. (We recommend using an IAM user with admin permissions rather than the root user)

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

1. On the **Review pricing and select Regions** page
   1. Under **Region deny setting** select Enabled
      1. This ensures Control Tower policies and controls are unable to be bypassed by using a non-governed region

   1. Under **Select additional Regions for governance** Select all regions where you plan to operate.

      ![Region Selections](/img/devops-foundations/account/regions.png)

   1. Click **Next** to continue

1. On the **Configure Organizational Units (OUs)** page:

   1. Rename the "Additional OU" to "Pre-prod"

   ![Configure Organizational Units](/img/devops-foundations/account/configure-ous.png)

   1. Click **Next** to continue.

1. On the **Configure shared accounts** page

   1. Under **Logs archive account** Enter an email address and rename the `Logs Archive` account to `Logs`
   1. Under **Audit account** Enter an email address and rename the `Audit` account to `Security`

      :::caution

      Account names **cannot** be changed after setting up the landing zone. Ensure the accounts are named appropriately.

      :::

   ![Configure Shared Accounts](/img/devops-foundations/account/log-archive-rename.png)

   1. Click **Next** to continue

1. On the **Additional configurations** page

   1. Ensure your setting match the screenshot below (These are the defaults)
      ![Additional Configuration](/img/devops-foundations/account/additional-config.png)
   1. Under **KMS Encryption** Check the box for `Enable and customize encryption settings`
   1. Click **Create a KMS key** (This will open a new tab)
      1. Configure a key with the default parameters (shown in screenshot below)
         ![KMS Key Defaults](/img/devops-foundations/account/kms-default.png)
      1. Give the key a descriptive alias like `control_tower_key`
         ![KMS Key Alias](/img/devops-foundations/account/kms-name.png)
      1. Select your admin user as a key administrator
      1. Select your admin user as a key user
      1. Click finish to create the key
      1. On the next screen, find the key you just created and click on it to edit
      1. In the key policy tab, click edit
         ![Edit Key Policy](/img/devops-foundations/account/edit-key-policy.png)
      1. Add the following config policy statement to the list of Statements, replacing `YOUR-HOME-REGION`, `YOUR-MANAGEMENT-ACCOUNT-ID` and `YOUR_KMS_KEY_ID` with values from your own account.
         ```json
         {
         "Sid": "Allow Config to use KMS for encryption",
         "Effect": "Allow",
         "Principal": {
         "Service": "config.amazonaws.com"
         },
         "Action": [
         "kms:Decrypt",
         "kms:GenerateDataKey"
         ],
         "Resource": "arn:aws:kms:YOUR-HOME-REGION:YOUR-MANAGEMENT-ACCOUNT-ID:key/YOUR-KMS-KEY-ID"
         }
         ```
      1. Add the following CloudTrail policy statement to the list of Statements, replacing `YOUR-HOME-REGION`, `YOUR-MANAGEMENT-ACCOUNT-ID` and `YOUR_KMS_KEY_ID` with values from your own account.
         ```json
         {
             "Sid": "Allow CloudTrail to use KMS for encryption",
             "Effect": "Allow",
             "Principal": {
                 "Service": "cloudtrail.amazonaws.com"
             },
             "Action": [
                 "kms:GenerateDataKey*",
                 "kms:Decrypt"
             ],
             "Resource": "arn:aws:kms:YOUR-HOME-REGION:YOUR-MANAGEMENT-ACCOUNT-ID:key/YOUR-KMS-KEY-ID",
             "Condition": {
                 "StringEquals": {
                     "aws:SourceArn": "arn:aws:cloudtrail:YOUR-HOME-REGION:YOUR-MANAGEMENT-ACCOUNT-ID:trail/aws-controltower-BaselineCloudTrail"
                 },
                 "StringLike": {
                     "kms:EncryptionContext:aws:cloudtrail:arn": "arn:aws:cloudtrail:*:YOUR-MANAGEMENT-ACCOUNT-ID:trail/*"
                 }
             }
         }
         ```

      1. Click Save Changes

      1. Close the KMS tab and choose the key you just created from the dropdown

      :::info
       For more help setting up KMS see the AWS docs: [Guidance for KMS keys](https://docs.aws.amazon.com/en_us/controltower/latest/userguide//kms-guidance.html)
      :::

1. Click next to continue

1. Review your choices and check the box accepting permissions at the bottom of the screen

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
  1. Create a **Prod** OU. Select the Root OU as the Parent OU when prompted. Each OU registration takes a couple of minutes.

1. [Turn off the default VPC created for new accounts](https://docs.aws.amazon.com/controltower/latest/userguide/configure-without-vpc.html#create-without-vpc). Gruntwork VPCs will be created for each account using terraform.

## Next Steps

Control Tower is now configured! Next you should consider:

- [Configuring IAM Identity Center](/) for Access Control. TODO write doc
- [Configuring any controls or SCPs](/) your organization requires. TODO write doc

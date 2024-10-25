# Landing Zone
import TOCInline from '@theme/TOCInline';

<TOCInline toc={toc} />
## Overview

The Landing Zone component is focused on creating an initial best-practice AWS multi-account setup


## Extending AWS Control Tower

Gruntwork Landing Zone builds on AWS Control Tower to add important new functionality.

### What is AWS Control Tower?

AWS Control Tower helps you set up and govern AWS accounts, and gives you a centralized way to manage compliance and configuration across your AWS accounts. But Control Tower is fundamentally a Platform-as-a-Service (PaaS) paradigm where you use "ClickOps" to create and configure AWS accounts. That stands in contrast to the vision behind IaC tools like Terraform, which are built on the philosophy that all Cloud resources are described in code. It can also be challenging to customize Control Tower and maintain it over time.

### Additional functionality

Gruntwork Landing Zone directly addresses these limitations by extending Control Tower with the following functionality:

1. Configure and customize new AWS accounts using Terraform/OpenTofu
1. Via the Gruntwork Account Factory:
   1. Have all new AWS accounts meet the CIS AWS Foundations Benchmark out of the box
   2. (Via Gruntwork Account Factory) Request new AWS accounts using a simple YAML file, GitHub Actions, or any system that can trigger a GitHub Action (e.g. ServiceNow)
   3. Review and customize all new AWS account requests using GitHub Pull Request functionality
   4. Define a customized account baseline unique to your organization
   5. Enable AWS account baselines to stay up to date automatically using [Patcher](/patcher)

## Prerequisites

The first step to using Gruntwork Landing Zone is to use AWS Control Tower to create a new multi-account setup, which requires that you meet the following prerequisites:
1. A [new AWS Account](https://portal.aws.amazon.com/billing/signup) and a user with administrator permissions. (We recommend using an IAM user with admin permissions rather than the root user)

   :::info
   This account will become the root of your multi-account setup after enabling Control Tower.
   :::

2. Three new unique email addresses for your logs, shared, and security (audit) accounts. It's important to note that these email addresses cannot be already associated with an AWS root login. "+" emails are acceptable, such as root+logs@acme.com, root+security@acme.com etc.


3. A home region selection where your Control Tower configuration will reside.
   :::caution
   Your home Region is the AWS Region in which you'll run most of your workloads or store most of your data. It **cannot** be changed after you've set up your AWS Control Tower landing zone. For more information about how to choose a home Region, see [Administrative tips for landing zone setup](https://docs.aws.amazon.com/controltower/latest/userguide/tips-for-admin-setup.html).
   :::

4. A KMS Key for encrypting Control Tower Resources with a suitable permissions policy

   <details>
        <summary>
        Step by Step Instructions to create the Control Tower KMS Key
        </summary>
        :::info
        For more help setting up KMS see the AWS docs: [Guidance for KMS keys](https://docs.aws.amazon.com/en_us/controltower/latest/userguide//kms-guidance.html)
        :::
        1. Logged in as an admin user, navigate to KMS in your root AWS account to create KMS Keys
        2. Ensure you are in your home region and click **Create Key**
            1. Configure a key with the default parameters (shown in screenshot below)
                <details>
                <summary>Screenshot</summary>

                ![KMS Key Defaults](/img/devops-foundations/account/kms-default.png)

                </details>

            2. Give the key a descriptive alias like `control_tower_key`
                <details>
                <summary>Screenshot</summary>

                ![KMS Key Alias](/img/devops-foundations/account/kms-name.png)

                </details>

            3. Select your admin user as a key administrator

            4. Select your admin user as a key user

            5. Click **Finish** to create the key
        3. On the next screen, find the key you just created and click on it to edit the following:

            1. In the key policy tab, click edit

                <details>
                <summary>Screenshot</summary>

                ![Edit Key Policy](/img/devops-foundations/account/edit-key-policy.png)

                </details>

            2. Add the following config policy statement to the list of Statements, replacing `YOUR-HOME-REGION`, `YOUR-MANAGEMENT-ACCOUNT-ID` and `YOUR_KMS_KEY_ID` with values from your own account.

                ```json
                {
                "Sid": "Allow Config to use KMS for encryption",
                "Effect": "Allow",
                "Principal": {
                    "Service": "config.amazonaws.com"
                },
                "Action": ["kms:Decrypt", "kms:GenerateDataKey"],
                "Resource": "arn:aws:kms:YOUR-HOME-REGION:YOUR-MANAGEMENT-ACCOUNT-ID:key/YOUR-KMS-KEY-ID"
                }
                ```

            3. Add the following CloudTrail policy statement to the list of Statements, replacing `YOUR-HOME-REGION`, `YOUR-MANAGEMENT-ACCOUNT-ID` and `YOUR_KMS_KEY_ID` with values from your own account.

                ```json
                {
                "Sid": "Allow CloudTrail to use KMS for encryption",
                "Effect": "Allow",
                "Principal": {
                    "Service": "cloudtrail.amazonaws.com"
                },
                "Action": ["kms:GenerateDataKey*", "kms:Decrypt"],
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

        4. Click **Save Changes**
    </details>

## Configure Control Tower

:::info
Setting up control tower for the first time can take over an hour to complete, most of that time will be spent
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

1. Rename the "Additional OU" to **"Pre-prod"** (Note the casing of the name here).

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

1. Create a Shared account in a Prod OU
   1. Navigate to the [AWS Control Tower Organization Dashboard](https://console.aws.amazon.com/controltower/home/organization)

   2. Choose **Create Resources** and select `Create organizational unit`.

   3. Create a **Prod** OU. Select the Root OU as the Parent OU when prompted. Each OU registration takes a couple of minutes.

   4. Choose **Create Resources** again and select `Create account`

   5. Name the account `Shared`, use the shared email address from the Prerequisites, and set the Organizational Unit to `Prod`

    :::tip
    The shared account is meant to house resources shared with all other accounts. Examples might include KMS Keys, AMIs,
    or ECR repositories.
    :::

   6. Grant your IAM Identity Center user access to the `Shared` account

      1. Navigate to IAM Identity Center, then click AWS accounts under **Multi-account permissions** in the side menu

      2. Select the `Shared` account from the `Prod` OU dropdown and click **Assign users or groups**

      3. Switch to the `Users` tab, select your management user from the list and click **Next**

      4.  Select `AWSAdministratorAccess` from the list of Permission Sets, then click **Next**

      5.  Click `Submit` to finish assigning access to your user

## Next Steps

Control Tower is now configured! Next you should consider:

- [Configuring IAM Identity Center](https://docs.aws.amazon.com/singlesignon/latest/userguide/get-started-choose-identity-source.html) for Access Control.
- [Configuring any controls or SCPs](https://docs.aws.amazon.com/controltower/latest/userguide/controls.html) your organization requires.
- [Set up Gruntwork Pipelines](../viagithubapp.md)
- [Set up Gruntwork Account Factory](../../../accountfactory/installation/index.md)

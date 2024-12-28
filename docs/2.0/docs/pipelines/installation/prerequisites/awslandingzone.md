# Landing Zone

## Overview

The Landing Zone component establishes an initial best-practice AWS multi-account setup.

## Extending AWS Control Tower

Gruntwork’s suggested Landing Zone and Account Factory extend AWS Control Tower to provide additional critical functionality.

### What is AWS Control Tower?

AWS Control Tower allows you to set up and govern AWS accounts while managing compliance and configuration centrally across your organization. However, Control Tower primarily operates as a Platform-as-a-Service (PaaS), relying on "ClickOps" for account creation and configuration. This approach contrasts with the principles of Infrastructure as Code (IaC) tools like Terraform, which emphasize describing cloud resources in code. Additionally, customizing Control Tower and maintaining those customizations over time can be challenging.

### Additional functionality

Gruntwork’s Account Factory addresses these limitations by enhancing Control Tower with the following capabilities:

1. Configure and customize new AWS accounts using Terraform/OpenTofu.
2. With the Gruntwork Account Factory:
   - Ensure all new AWS accounts comply with the CIS AWS Foundations Benchmark by default.
   - Request new AWS accounts through a simple YAML file, GitHub Actions, or systems that can trigger GitHub Actions (e.g., ServiceNow).
   - Review and customize all new AWS account requests using GitHub Pull Request workflows.
   - Define and apply a unique, organization-specific account baseline.
   - Automatically keep AWS account baselines up to date using [Patcher](/2.0/docs/patcher/concepts/).

## Prerequisites

To use Gruntwork Account Factory, begin by setting up a new multi-account environment through AWS Control Tower. The following prerequisites must be met:

1. A [new AWS account](https://portal.aws.amazon.com/billing/signup) with a user granted administrator permissions. 
   :::info
   This account will serve as the root of your multi-account environment after enabling Control Tower.
   :::

2. Three unique email addresses for the logs, shared, and security (audit) accounts. 
   :::note
   These email addresses must not already be associated with an AWS root login. You can use "+" email aliases, such as root+logs@acme.com or root+security@acme.com.
   :::

3. A designated home region for your Control Tower configuration. 
   :::caution
   The home region is where you will primarily run workloads or store data. It **cannot** be changed once the AWS Control Tower landing zone is set up. For guidance on choosing a home region, see [Administrative tips for landing zone setup](https://docs.aws.amazon.com/controltower/latest/userguide/tips-for-admin-setup.html).
   :::

4. A KMS Key for encrypting Control Tower resources with an appropriate permissions policy. 

   <details>
   <summary>Step-by-Step Instructions to Create the Control Tower KMS Key</summary>
   :::info
   For detailed assistance, refer to the AWS documentation on [Guidance for KMS keys](https://docs.aws.amazon.com/en_us/controltower/latest/userguide/kms-guidance.html).
   :::

   1. Log in as an admin user and navigate to KMS in your root AWS account.
   2. Ensure you are in your home region and click **Create Key**.
      - Use the default parameters for key configuration.

        <details>
        <summary>Screenshot</summary>
        ![KMS Key Defaults](/img/devops-foundations/account/kms-default.png)
        </details>

      - Assign a descriptive alias, such as `control_tower_key`.

        <details>
        <summary>Screenshot</summary>
        ![KMS Key Alias](/img/devops-foundations/account/kms-name.png)
        </details>

      - Designate your admin user as both a key administrator and a key user.
      - Click **Finish** to complete the creation of the key.

   3. Locate the newly created key on the next screen and click to edit the following:
      - In the key policy tab, click **Edit**.

        <details>
        <summary>Screenshot</summary>
        ![Edit Key Policy](/img/devops-foundations/account/edit-key-policy.png)
        </details>

      - Add the necessary policy statement, replacing `YOUR-HOME-REGION`, `YOUR-MANAGEMENT-ACCOUNT-ID`, and `YOUR_KMS_KEY_ID` with your account-specific values.
   </details>

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
     - Add the following CloudTrail policy statement to the list of Statements, replacing `YOUR-HOME-REGION`, `YOUR-MANAGEMENT-ACCOUNT-ID` and `YOUR_KMS_KEY_ID` with values from your own account.

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
Setting up Control Tower for the first time can take over an hour to complete, with most of that time spent waiting for Control Tower operations to finish.
:::

### Start Control Tower Setup

1. Sign in to the [AWS Management Console](https://console.aws.amazon.com) using your administrator user credentials.
2. Navigate to the [AWS Control Tower Console](https://console.aws.amazon.com/controltower).
3. Verify that you are working in your desired home region.

   :::caution
   Your home region is where you will run most workloads or store most data. This region **cannot** be changed after setting up your AWS Control Tower landing zone. Refer to [Administrative Tips for Landing Zone Setup](https://docs.aws.amazon.com/controltower/latest/userguide/tips-for-admin-setup.html) for more details on choosing your home region.
   :::

4. Click **Set up landing zone**.

### Review pricing and select regions

1. Under **Region deny setting**, select **Enabled** to ensure Control Tower policies and controls cannot be bypassed by using non-governed regions.
2. Under **Select additional Regions for governance**, choose all regions where you plan to operate.

   <details>
   <summary>Screenshot</summary>
   ![Region Selections](/img/devops-foundations/account/regions.png)
   </details>

3. Click **Next** to continue.

### Configure organizational units (OUs)

1. Rename the "Additional OU" to **"Pre-prod"** (Note the casing).
   
   <details>
   <summary>Screenshot</summary>
   ![Configure Organizational Units](/img/devops-foundations/account/configure-ous.png)
   </details>

2. Click **Next** to continue.

### Configure shared accounts

1. Under **Logs archive account**, enter an email address and rename the `Logs Archive` account to `Logs`.
2. Under **Audit account**, enter an email address and rename the `Audit` account to `Security`.

   :::caution
   Account names **cannot** be changed after setting up the landing zone. Ensure names are correct.
   :::

   <details>
   <summary>Screenshot</summary>
   ![Configure Shared Accounts](/img/devops-foundations/account/log-archive-rename.png)
   </details>

3. Click **Next** to continue.

### Additional configurations

1. Verify your settings match the defaults shown below.

   <details>
   <summary>Screenshot</summary>
   ![Additional Configuration](/img/devops-foundations/account/additional-config.png)
   </details>

2. Under **KMS Encryption**, check the box for **Enable and customize encryption settings**.
3. Select the KMS Key created in the [prerequisites](#prerequisites).
4. Click **Next** to continue.

### Finish Control Tower setup

:::info
Control Tower creation will take approximately one hour to complete.
:::

1. Review your settings and accept the permissions by checking the box at the bottom of the page.
2. Click **Set up landing zone**.
3. During setup, you will see a notification indicating the estimated time for completion.

   <details>
   <summary>Screenshot</summary>
   ![Landing Zone Setup Status](/img/devops-foundations/account/control-tower-setup-status.png)
   </details>

   :::tip
   You can safely close your browser tab while the setup process runs in the background.
   :::

4. Invitations will be sent to the Root user for signing in using AWS IAM Identity Center. Once the invite is accepted, the Root user can access the Root, Logs, and Security accounts through the Identity Center Access Portal URL included in the email invite.

   <details>
   <summary>Screenshot</summary>
   ![Root User's Access Portal](/img/devops-foundations/account/root-user-access-portal.png)
   </details>

## Post-setup configuration

After enabling Control Tower, complete the following steps to prepare for Gruntwork Account Factory:

1. [Disable the default VPC](https://docs.aws.amazon.com/controltower/latest/userguide/configure-without-vpc.html#create-without-vpc) created for new accounts. Gruntwork VPCs will be created for each account using Terraform.
2. Create a shared account in a `Prod` OU:
   1. Navigate to the [AWS Control Tower Organization Dashboard](https://console.aws.amazon.com/controltower/home/organization).
   2. Choose **Create Resources** and select `Create organizational unit`.
   3. Create a **Prod** OU with the Root OU as the parent.
   4. Choose **Create Resources** and select `Create account`.
   5. Name the account `Shared`, use the shared email address from the prerequisites, and assign it to the `Prod` OU.

      :::tip
      The shared account is intended for resources shared across accounts, such as KMS Keys, AMIs, or ECR repositories.
      :::

   6. Grant IAM Identity Center user access to the `Shared` account:
      - Navigate to IAM Identity Center and select **AWS accounts** under **Multi-account permissions**.
      - Choose the `Shared` account from the `Prod` OU dropdown and click **Assign users or groups**.
      - Select your management user and assign the `AWSAdministratorAccess` permission set.
      - Submit to finalize access assignments.

## Next steps

With Control Tower configured, consider the following next steps:
- [Set up IAM Identity Center](https://docs.aws.amazon.com/singlesignon/latest/userguide/get-started-choose-identity-source.html) for access control.
- [Apply any required controls or SCPs](https://docs.aws.amazon.com/controltower/latest/userguide/controls.html).
- [Install Gruntwork Pipelines](/2.0/docs/pipelines/installation/viagithubapp).
- [Set up Gruntwork Account Factory](/2.0/docs/accountfactory/installation).

- [Set up Gruntwork Pipelines](/2.0/docs/pipelines/installation/viagithubapp)
- [Set up Gruntwork Account Factory](/2.0/docs/accountfactory/installation)

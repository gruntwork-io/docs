# Landing Zone

## Overview

The Landing Zone component establishes an initial best-practice AWS multi-account setup.

## Extending AWS Control Tower

Gruntwork’s suggested Landing Zone and Account Factory extend AWS Control Tower to provide additional critical functionality.

### What is AWS Control Tower?

AWS Control Tower enables centralized governance and compliance for AWS accounts within an organization. However, it primarily operates as a Platform-as-a-Service (PaaS), relying on manual "ClickOps" processes for account creation and configuration. This approach contrasts with Infrastructure as Code (IaC) tools like Terraform, which emphasize codifying cloud resources. Customizing Control Tower and maintaining those customizations over time can also pose challenges.

### Additional functionality

Gruntwork’s Account Factory addresses these limitations by enhancing Control Tower with the following capabilities:

1. Configure and customize new AWS accounts using Terraform/OpenTofu.
2. Through Gruntwork Account Factory:
   - Ensure all new AWS accounts comply with the CIS AWS Foundations Benchmark by default.
   - Request new AWS accounts using YAML files, GitHub Actions, or systems like ServiceNow.
   - Review and customize AWS account requests through GitHub Pull Request workflows.
   - Define and apply an organization-specific account baseline.
   - Automatically keep AWS account baselines up-to-date with [Patcher](/2.0/docs/patcher/concepts/).

## Prerequisites

To use Gruntwork Account Factory, begin by setting up a new multi-account environment through AWS Control Tower. The following prerequisites must be met:

1. A [new AWS account](https://portal.aws.amazon.com/billing/signup) with a user granted administrator permissions.
   :::info
   This account will serve as the root of your multi-account environment after enabling Control Tower.
   :::

2. Three unique email addresses for the logs, shared, and security (audit) accounts.
   :::note
   These email addresses must not already be associated with an AWS root login. "+" email aliases, such as root+logs@acme.com or root+security@acme.com, are acceptable.
   :::

3. A designated home region for your Control Tower configuration.
   :::caution
   The home region is where most workloads or data will reside. This region **cannot** be changed once the AWS Control Tower landing zone is set up. For guidance, refer to [Administrative Tips for Landing Zone Setup](https://docs.aws.amazon.com/controltower/latest/userguide/tips-for-admin-setup.html).
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
      - In the **Key Policy** tab, click **Edit**.

        <details>
        <summary>Screenshot</summary>
        ![Edit Key Policy](/img/devops-foundations/account/edit-key-policy.png)
        </details>

      - Add the necessary policy statement, replacing `YOUR-HOME-REGION`, `YOUR-MANAGEMENT-ACCOUNT-ID`, and `YOUR-KMS-KEY-ID` with your account-specific values:

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

      - Add the following CloudTrail policy statement to the list of statements, replacing `YOUR-HOME-REGION`, `YOUR-MANAGEMENT-ACCOUNT-ID`, and `YOUR-KMS-KEY-ID` with your account-specific values:

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

   4. Click **Save Changes**.
   </details>




## Configure Control Tower

:::info
Setting up Control Tower for the first time can take over an hour, with most of the time spent waiting for operations to complete.
:::

### Start Control Tower setup

1. Sign in to the [AWS Management Console](https://console.aws.amazon.com) using administrator credentials.
2. Navigate to the [AWS Control Tower Console](https://console.aws.amazon.com/controltower).
3. Verify that you are working in your desired home region.

   :::caution
   The home region is where most workloads or data will reside. This region **cannot** be changed after setup. Refer to [Administrative Tips for Landing Zone Setup](https://docs.aws.amazon.com/controltower/latest/userguide/tips-for-admin-setup.html) for guidance.
   :::

4. Click **Set up landing zone**.

### Review pricing and select regions

1. Under **Region deny setting**, select **Enabled** to ensure policies and controls cannot be bypassed using non-governed regions.
2. Under **Select additional Regions for governance**, choose all regions where operations will occur.

   <details>
   <summary>Screenshot</summary>
   ![Region Selections](/img/devops-foundations/account/regions.png)
   </details>

3. Click **Next**.

### Configure Organizational Units (OUs)

1. Rename the "Additional OU" to **"Pre-prod"**.

   <details>
   <summary>Screenshot</summary>
   ![Configure Organizational Units](/img/devops-foundations/account/configure-ous.png)
   </details>

2. Click **Next**.

### Configure shared accounts

1. Under **Logs archive account**, enter an email address and rename `Logs Archive` to `Logs`.
2. Under **Audit account**, enter an email address and rename `Audit` to `Security`.

   :::caution
   Account names **cannot** be changed after setup. Ensure accuracy before proceeding.
   :::

   <details>
   <summary>Screenshot</summary>
   ![Configure Shared Accounts](/img/devops-foundations/account/log-archive-rename.png)
   </details>

3. Click **Next**.

### Additional configurations

1. Ensure settings match the defaults.

   <details>
   <summary>Screenshot</summary>
   ![Additional Configuration](/img/devops-foundations/account/additional-config.png)
   </details>

2. Under **KMS Encryption**, check **Enable and customize encryption settings**.
3. Select the KMS Key created earlier.
4. Click **Next**.

### Finish Control Tower setup

:::info
Control Tower creation will take approximately one hour.
:::

1. Review settings, accept permissions, and click **Set up landing zone**.
2. You will see a notification with the estimated time for completion.

   <details>
   <summary>Screenshot</summary>
   ![Landing Zone Setup Status](/img/devops-foundations/account/control-tower-setup-status.png)
   </details>

   :::tip
   You can safely close the browser tab during this process.
   :::

3. Invitations will be sent to the Root user for signing in using AWS IAM Identity Center. Once accepted, the Root user can access the Root, Logs, and Security accounts via the Identity Center Access Portal.

   <details>
   <summary>Screenshot</summary>
   ![Root User's Access Portal](/img/devops-foundations/account/root-user-access-portal.png)
   </details>

## Post-setup configuration

Complete the following steps to prepare for Gruntwork Account Factory:

1. [Disable the default VPC](https://docs.aws.amazon.com/controltower/latest/userguide/configure-without-vpc.html#create-without-vpc) created for new accounts. Gruntwork will create VPCs as needed.
2. Create a shared account in a `Prod` OU:
   - Navigate to the [AWS Control Tower Organization Dashboard](https://console.aws.amazon.com/controltower/home/organization).
   - Choose **Create Resources** > `Create organizational unit`.
   - Create a **Prod** OU with the Root OU as the parent.
   - Choose **Create Resources** > `Create account`.
   - Name the account `Shared`, use the shared email address from the prerequisites, and assign it to the `Prod` OU.

      :::tip
      The shared account is intended for resources like KMS Keys, AMIs, or ECR repositories.
      :::

   - Assign IAM Identity Center user access to the `Shared` account.

## Next steps

Now that Control Tower is configured, consider these next steps:
- [Set up IAM Identity Center](https://docs.aws.amazon.com/singlesignon/latest/userguide/get-started-choose-identity-source.html) for access control.
- [Apply required controls or SCPs](https://docs.aws.amazon.com/controltower/latest/userguide/controls.html).
- [Install Gruntwork Pipelines](/2.0/docs/pipelines/installation/viagithubapp).
- [Set up Gruntwork Account Factory](/2.0/docs/accountfactory/installation).



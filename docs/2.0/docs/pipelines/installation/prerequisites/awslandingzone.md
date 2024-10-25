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

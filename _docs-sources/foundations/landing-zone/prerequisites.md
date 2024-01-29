# Prerequisites

The first step to using Gruntwork Landing Zone is to use AWS Control Tower to create a new multi-account setup, which requires that you meet the prerequisites below.

1. A [new AWS Account](https://portal.aws.amazon.com/billing/signup) and a user with administrator permissions. (We recommend using an IAM user with admin permissions rather than the root user)

   :::info
   This account will become the root of your multi-account setup after enabling Control Tower.
   :::

2. Three(3) new unique email addresses for your logs, shared, and security (audit) accounts. It's important to note that these email addresses cannot be already associated with an AWS root login.

3. A home region selection where your Control Tower configuration will reside.
   :::caution
   Your home Region is the AWS Region in which you'll run most of your workloads or store most of your data. It **cannot** be changed after you've set up your AWS Control Tower landing zone. For more information about how to choose a home Region, see [Administrative tips for landing zone setup](https://docs.aws.amazon.com/controltower/latest/userguide/tips-for-admin-setup.html).
   :::

4. A KMS Key for encrypting Control Tower Resources with a suitable permissions policy

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

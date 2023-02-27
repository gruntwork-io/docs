---
pagination_label: Deployment Walkthrough
---

# Manual steps

Now that your infrastructure is up and running, some manual steps are necessary before the resources meet the CIS AWS Benchmark recommendations.

## 1. Revoke Gruntwork's access

As your infrastructure is deployed, Gruntwork doesn't need access to it anymore. The access is given through an IAM role called `GruntworkAccountAccessRole` in each of the accounts through the `AdministratorAccess` policy. Use the `gruntwork` CLI to delete the IAM role and revoke access in each account by [following these steps](https://github.com/gruntwork-io/gruntwork#revoking-access-to-aws):

```bash
gruntwork aws revoke \
            --account "dev" \
            --account "stage" \
            --account "prod" \
            --account "security" \
            --account "shared" \
            --account "logs"
```

To revoke Gruntwork's access from the "current" account—the one you are authenticated to in the terminal—use the name
`__current__` (i.e., `--account "__current__"`).


**Important**: The CIS AWS Benchmark recommends that policies with full `*:*` administrative privileges are not attached. `AdministratorAccess` is an AWS managed policy that gives full administrative privileges, but you should avoid using it with any users, groups, or roles. Instead, to give access to administrators, you should use the `iam-admin` policy that lives in the Security account. The `iam-admin` policy allows full IAM privileges (e.g. `iam:*`) on all resources. [More information about the existing groups in the `iam-groups` module.](https://github.com/gruntwork-io/terraform-aws-security/tree/main/modules/iam-groups)

The steps below should be performed on each deployed account.

## 2. Enable MFA for the root user

Securing the "root" user, or the first user that is created when you set up an AWS account, is one of the
first actions you should take in any new account. It is highly recommended that you avoid using this root user for everyday tasks. Unfortunately, there is no API or automation available for configuring an MFA device for the
root user. Follow the manual steps outlined in the [AWS docs](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_root-user.html#id_root-user_manage_mfa) for configuring a MFA device.

- (Recommended) Configure a hardware MFA device. We suggest using a
[Yubikey](https://www.yubico.com/) due to its strong security characteristics and multitude of form
factors. Refer to
[the AWS documentation for more information on using a hardware device with the root user](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_mfa_enable_physical.html#enable-hw-mfa-for-root). If you're targeting the CIS AWS Foundations Benchmark, this is part of recommendation 1.6.

- Alternatively, if you don't have access to a hardware MFA device, configure a virtual MFA device. This is still vastly more secure than no MFA device at all!

## 3. Answer security questions and complete contact details

When setting up a new account, AWS asks for contact information and security questions. Unfortunately, there is no API or automation available for this functionality. In the AWS console, visit the [Account settings](https://console.aws.amazon.com/billing/home?#/account) page and complete the _Alternate Contacts_ and _Configure Security Challenge Questions_ questions.


## 4. Delete default VPCs and rules from default security groups

Use [cloud-nuke](https://github.com/gruntwork-io/cloud-nuke) to remove the rules from the default VPC and the default ingress/egress rules from the default security groups. Note that it isn’t possible to actually delete the default security group, so instead the command deletes the rules, eliminating the risk of something being mistakenly exposed.

Authenticate to each account (shared, security, dev, prod etc), and then run the following command:

Usage:
```bash
cloud-nuke defaults-aws
```

Example:
```bash
aws-vault exec dev -- cloud-nuke defaults-aws
```

## 5. Subscribe to `BenchmarkAlarmTopic` Alarms

The AWS Config alerts and CloudWatch Metric Alarms all go to the SNS topic `BenchmarkAlarmTopic`. Unfortunately, there is no way to automate
subscribing to the SNS topic as each of the steps require validating the delivery target. For each deployed account, follow the steps outlined in
the [AWS docs](https://docs.aws.amazon.com/sns/latest/dg/sns-user-notifications.html) to be notified by Email, Phone,
or SMS for each of the alerts.

You can also configure an automated system integration if you have a third party alerting system or central dashboard.
Follow the steps in the [AWS
docs](https://docs.aws.amazon.com/sns/latest/dg/sns-http-https-endpoint-as-subscriber.html) on how to add an HTTPS endpoint as a subscriber to the alerts.

## 6. Add existing buckets to a new Macie classification job

Macie is a new AWS service that uses machine learning (ML) and pattern matching to discover and help protect your sensitive
data. The Landing Zone solution already configured Macie in all deployed accounts. The last step is to specify the S3 buckets to be analyzed.
To set up Macie to analyze the desired S3 buckets, you’ll need to create a **Macie classification job**. There is a bug
in the [terraform-provider-aws](https://github.com/hashicorp/terraform-provider-aws/issues/20726), where the `aws_macie2_classification_job`
can't be updated. Therefore, until that bug is fixed (it has been open more than 2 years), we ask you to manually create a new Classification Job and add all buckets that might contain sensitive information, across **all accounts**.

:::note

If you are using Steampipe for checking your Compliance status, you should create the job by "selecting specific buckets",
and **not** by "specifying bucket criteria". Steampipe fetches the bucket list that's being analyzed by Macie, so if you
specify a filter for finding the buckets, Steampipe will not match which bucket are being analyzed. [See Steampipe's
query for finding the buckets analyzed by Macie](https://github.com/turbot/steampipe-mod-aws-compliance/blob/c7cea47662c03f4cc4a84a17e41872e8ace611dc/query/s3/s3_bucket_protected_by_macie.sql#L6-L7).

:::

You can use either the [AWS Console](https://docs.aws.amazon.com/macie/latest/user/discovery-jobs-create.html), or the
[AWS CLI](https://docs.aws.amazon.com/de_de/cli/latest/reference/macie2/create-classification-job.html#create-classification-job) to make the change.


## 7. Enable MFA Delete for all S3 buckets

:::caution

We do not recommend having active AWS access keys for the root user, so remember to delete them when you finish this step.

:::

Enabling MFA Delete in your bucket adds another layer of security by requiring MFA in any request to delete a version or change the versioning state of the bucket.

The attribute `mfa_delete` is only used by Terraform to [reflect the current state of the bucket](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/s3_bucket#mfa_delete). It is not possible to create a bucket if the `mfa_delete` is `true`, because it needs to be activated [using AWS CLI or the API](https://docs.aws.amazon.com/AmazonS3/latest/userguide/MultiFactorAuthenticationDelete.html).

To make this change [**you need to use the root user of the account**](https://docs.aws.amazon.com/general/latest/gr/root-vs-iam.html#aws_tasks-that-require-root) that owns the bucket, and MFA needs to be enabled.

1. [Configure MFA for the root user](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_root-user.html#id_root-user_manage_mfa), which you did before in this guide.
2. [Create access keys for the root user](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_root-user.html#id_root-user_manage_add-key).

Authenticate as the root user and use the AWS CLI to enable MFA Delete. If you are using `aws-vault`, it is necessary to use the `--no-session` flag. [More information about the `--no-session` flag in our Knowledge Base](https://github.com/gruntwork-io/knowledge-base/discussions/647).

```bash
aws-vault exec <PROFILE> --no-session -- aws s3api put-bucket-versioning --region <REGION> \
      --bucket <BUCKET NAME> \
      --versioning-configuration Status=Enabled,MFADelete=Enabled \
      --mfa "arn:aws:iam::<ACCOUNT ID>:mfa/root-account-mfa-device <MFA CODE>"
```

We also created a [script](https://github.com/gruntwork-io/terraform-aws-security/tree/main/modules/private-s3-bucket#how-do-you-enable-mfa-delete) to help you enable MFA Delete in all buckets from a single account at once.

Usage:

 ```bash
 aws-vault exec <PROFILE> --no-session -- ./mfa-delete.sh --account-id <ACCOUNT ID>
 ```

Example:

 ```bash
 aws-vault exec root-prod --no-session -- ./mfa-delete.sh --account-id 226486542153
 ```

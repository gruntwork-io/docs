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

## 6. Manually maintain buckets to analyze in the `buckets_to_analyze` variable

Macie is a new AWS service that uses machine learning (ML) and pattern matching to discover and help protect your sensitive
data. To set up Macie to analyze the desired S3 buckets, you’ll need to create a **Macie classification job**. Typically,
you’ll want it to analyze all the buckets in the region. However, the terraform AWS provider does not support specifying
all the buckets in a region - it requires that an explicit list of buckets be provided. Therefore, you’ll
need to maintain an explicit list of buckets per region, namely in the variable `buckets_to_analyze`. This list of buckets needs to be maintained in the future as new buckets are created in the account. Please read the
[documentation](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/blob/master/modules/security/macie/variables.tf#L21-L30)
for this variable in order to understand how to structure the list of buckets per region.

On each account, you can get a full list of existing S3 buckets using the AWS CLI:

```
aws s3 ls
```

For each bucket, the region can also be retrieved using the AWS CLI:


```
aws s3api get-bucket-location --bucket <BUCKET_NAME>
```


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


<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "402d73f62a8fa3b89d18d1decb3ebeba"
}
##DOCS-SOURCER-END -->

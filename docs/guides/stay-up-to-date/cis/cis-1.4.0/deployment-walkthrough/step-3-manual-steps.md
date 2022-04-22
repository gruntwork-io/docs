---
sidebar_label: Manual Steps
---

# Step 3: Manual steps

## Enable MFA Delete (recommendation 2.1.3)

Enabling MFA Delete in your bucket adds another layer of security by requiring MFA in any request to delete a version or change the versioning state of the bucket.

The attribute `mfa_delete` is only used by Terraform to [reflect the current state of the bucket](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/s3_bucket#mfa_delete). It is not possible to create a bucket if the `mfa_delete` is `true`, because it needs to be activated [using AWS CLI or the API](https://docs.aws.amazon.com/AmazonS3/latest/userguide/MultiFactorAuthenticationDelete.html).

To make this change [**you need to use the root user of the account**](https://docs.aws.amazon.com/general/latest/gr/root-vs-iam.html#aws_tasks-that-require-root) that owns the bucket, and MFA needs to be enabled.

:::caution

We do not recommend having active AWS access keys for the root user, so remember to delete them when you finish this step.

:::

In order to enable MFA Delete, you need to:

- [Create access keys for the root user](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_root-user.html#id_root-user_manage_add-key)
- [Configure MFA for the root user](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_root-user.html#id_root-user_manage_mfa)
- Create a bucket with `mfa_delete=false`.
- Using the root user, call the AWS CLI to enable MFA Delete. If you are using `aws-vault`, it is necessary to use the `--no-session` flag.
  ```bash
  aws s3api put-bucket-versioning --region <REGION> \
      --bucket <BUCKET NAME> \
      --versioning-configuration Status=Enabled,MFADelete=Enabled \
      --mfa "arn:aws:iam::<ACCOUNT ID>:mfa/root-account-mfa-device <MFA CODE>"
  ```
- Set `mfa_delete=true` in your Terraform code
- Remove any Lifecycle Rule that the bucket might contain (for the `aws-config-bucket` and `cloudtrail-bucket` modules, enabling `mfa_delete` will already disable the lifecycle rules).
- Run `terraform apply`.
- If there are no S3 buckets remaining to enable MFA Delete, delete the access keys for the root user, but be sure to **leave MFA enabled**.

We also created a script to help you enable MFA Delete in all buckets from a single account at once.

### Using mfa-delete.sh

If you want to enable MFA Delete to _all_ your buckets at once, you can use the script at [terraform-aws-security/private-s3-bucket/mfa-delete-script](https://github.com/gruntwork-io/terraform-aws-security/tree/master/modules/private-s3-bucket). You need to use the access keys for the root user and the root MFA code.

Usage:

```bash
aws-vault exec <PROFILE> --no-session -- ./mfa-delete.sh --account-id <ACCOUNT ID>
```

Example:

```bash
aws-vault exec root-prod -- ./mfa-delete.sh --account-id 226486542153
```

## Configure Amazon Macie (recommendation 2.1.4)

When configuring Macie for each account and each region, you’ll need to specify a few things:

- the S3 bucket to be a repository for the sensitive data discovery results;
- the KMS key that the data in that bucket will be encrypted with;
- and the S3 bucket(s) that you’ll need Macie to analyze for you.

Below, we’ll cover in a few steps how to configure the above resources for Macie. These steps are manual, because at the time of developing this module and releasing the Gruntwork Service Catalog for CIS Benchmark 1.4.0, some of these configurations are [currently not supported](https://github.com/hashicorp/terraform-provider-aws/issues/19856) in the terraform AWS provider.

#### Configure bucket to store sensitive data discovery results

Once you’ve applied the account baseline configurations that include the Macie module using `terraform` or `terragrunt`, you need to do the following manual steps in each of the account baseline accounts:

- Log into the AWS console and for every region where you have enabled Macie, repeat the steps 2 to 9.
- Go to the Amazon Macie service.
- In the left pane, under Settings, click on "Discovery results".
- Click on "Configure now" to configure an S3 bucket for long-term retention of sensitive data discovery results.
- Choose "Existing bucket".
- Under "Choose a bucket", select your bucket. This can be either one you already have, or the one that the module created under the variable `macie_bucket_name` (if you set the `create_macie_bucket` variable to `true`). You will use the same bucket for every region.
- Under "KMS encryption" choose "Select a key from your account". You can also re-use a single key across different accounts - if you wish to do this, select "Enter the ARN of a key in another account" instead.
- Under "KMS key alias" (or "KMS key ARN", if you’re re-using a KMS key from a different account) select your KMS key. This can be either one you already have, or the one that the module created under the variable `kms_key_name` (if you set the `create_kms_key` variable to `true`). You will use the same key for every region.
- Click "Save".

Note that you can re-use a single KMS key across AWS accounts, but you need a separate bucket for each account.

Once Terraform AWS provider supports the above configurations, we will
[update the Gruntwork Macie module](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/issues/205)
so that it completely automates all the steps of configuring Amazon Macie, and no manual steps will be required any longer.

#### Manually maintain buckets to analyze in the `buckets_to_analyze` variable

To set up Macie to analyze the desired S3 buckets, you’ll need to create a **Macie classification job**. Typically, you’ll want it to analyze all the buckets in the region. However, the terraform AWS provider does not support specifying all the buckets in a region - it requires that an explicit list of buckets be provided (see related bug
[here](https://github.com/hashicorp/terraform-provider-aws/issues/20044)). Therefore, you’ll need to maintain an
explicit list of buckets per region, namely in the variable `buckets_to_analyze`. Please read the
[documentation](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/blob/master/modules/security/macie/variables.tf#L21-L30)
for this variable in order to understand how to structure the list of buckets per region. Once the above issue in the
terraform AWS provider has been resolved, we will
[update the Gruntwork macie module](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/issues/204)
to add support for specifying all buckets in a region.

## Known Issues

You may encounter the following issues when trying to upgrade to v0.27.0 of the AWS CIS Service Catalog.

#### Cloudtrail KMS Key Error

```bash
with module.cloudtrail.module.cloudtrail.data.aws_kms_key.by_loose_id[0],
on .terraform/modules/cloudtrail.cloudtrail/modules/cloudtrail/main.tf line 40, in data "aws_kms_key" "by_loose_id":
```

Please ensure `var.cloudtrail_kms_key_arn_is_alias` is set to `false` in each account baseline.

#### AWS Config Rules

```bash
Error: Error creating AWSConfig rule: Failed to create AWSConfig rule: InvalidParameterValueException: The sourceIdentifier VPC_SG_OPEN_ONLY_TO_AUTHORIZED_PORTS is invalid. Please refer to the documentation for a list of valid sourceIdentifiers that can be used when AWS is the Owner.
```

You may be using a region that doesn’t properly support AWS Config (e.g: `ap-northeast-3` Osaka). Please ensure this region is disabled or remove it from your opt-in regions.


<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "339270287018e92e149b0be448340c4d"
}
##DOCS-SOURCER-END -->

# Storage

Version 1.3.0 of the Benchmark includes a new storage section that has three recommendations pertaining to the S3 service as well as the EC2 service.
These have to do with encryption at rest and in transit.

To comply with recommendation 2.1.1, make sure to enable server side encryption on your S3 buckets. In Terraform, this
is achieved by configuring the `server_side_encryption_configuration` argument of the `aws_s3_bucket` resource.

To comply with recommendation 2.1.2, make sure that all access to your S3 buckets is over TLS. In Terraform, you will
want to attach a policy to your buckets that includes a statement similar to this:

```hcl
statement {
  sid     = "AllowTLSRequestsOnly"
  effect  = "Deny"
  actions = ["s3:*"]
  resources = [
    "<YOUR BUCKET ARN>",
    "${<YOUR BUCKET ARN>}/*"
  ]
  principals {
    type        = "*"
    identifiers = ["*"]
  }
  condition {
    test     = "Bool"
    variable = "aws:SecureTransport"
    values   = ["false"]
  }
}
```

## Configure EBS Encryption

To comply with recommendation 2.2.1 be sure to configure [EBS volume encryption](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/EBSEncryption.html)
in all of the enabled AWS regions within your AWS Account(s). You can invoke the Terraform
`aws_ebs_encryption_by_default` resource to implement the recommendation.

For example:

```hcl
resource "aws_ebs_encryption_by_default" "ebs_encryption" {
  enabled = true
}
```

## Configure RDS Encryption

To comply with recommendation 2.3.1, if you use RDS it must be configured with [RDS encryption](http://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Overview.Encryption.html) for all instances and in all of the enabled AWS regions within your AWS Account(s). You can set to `true` the Terraform `storage_encrypted` attribute for an RDS instance to implement the recommendation.

For example:

```hcl
resource "aws_db_instance" "your_primary_db" {
  storage_encrypted = true
}
```

## Secure your S3 Data

The CIS 1.4.0 Benchmark recommends a few additional steps to ensure your data is secured and accessible. There are two new recommendations that relate to S3:

- 2.1.3 prescribes that the MFA Delete is enabled on all S3 buckets in your accounts
- 2.1.4 recommends that all data in your S3 buckets be classified, discovered and secured

:::info

The steps below are not the full list of actions needed to configure MFA Delete or Amazon Macie for your account. To follow the steps necessary to configure it according to the CIS 1.4.0 Benchmark, please follow the MFA Delete and Macie section in the [the migration guide to CIS 1.4.0](/guides/stay-up-to-date/cis/cis-1.4.0), or the deployment guide section in this guide.
:::

### Enable MFA Delete (recommendation 2.1.3)

Enabling MFA Delete in your bucket adds another layer of security by requiring MFA in any request to delete a version or change the versioning state of the bucket.

Unfortunately, the way AWS built the MFA delete feature is currently quite hard to use. Due to AWS API limitations,
Terraform can’t configure MFA delete on S3 buckets; you must first
[do it using the `aws` CLI](https://docs.aws.amazon.com/AmazonS3/latest/userguide/MultiFactorAuthenticationDelete.html),
and then, after that, set `mfa_delete = true` in your Terraform code to
[reflect the update](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/s3_bucket#mfa_delete).
Moreover, to enable MFA delete, you must authenticate as the root user of the AWS account that owns the bucket, and pass
in a different MFA token value for every single bucket where you enable MFA delete. We’ve tried to make it as easy as we
can, but due to how AWS built this feature, it is still quite tedious.

To make this change [**you need to use the root user of the account**](https://docs.aws.amazon.com/general/latest/gr/root-vs-iam.html#aws_tasks-that-require-root) that owns the bucket, and MFA needs to be enabled. Follow the manual steps below to do so:

#### MFA Delete - manual steps

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

We also created a [script](https://github.com/gruntwork-io/terraform-aws-security/tree/master/modules/private-s3-bucket/mfa-delete-script) to help you enable MFA Delete in all buckets from a single account at once. To learn how to run it and when, please follow the production _Deployment Walkthrough_ guide section below.

### Configure Amazon Macie (recommendation 2.1.4)

The new CIS AWS v1.4.0 recommendation 2.1.4 requires that all data in Amazon S3 be discovered, classified and secured.
One way to achieve this is the by leveraging the [Amazon Macie](https://aws.amazon.com/macie/) service.
Amazon Macie is a fully managed data security and data privacy service that uses machine learning and pattern matching
to discover and protect your sensitive data in AWS. To help you achieve this recommendation, we have created a dedicated
[`macie` service](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/tree/master/modules/security/macie)
in our CIS service catalog.

#### AWS Macie - manual steps

When configuring Macie for each region, you’ll need to specify a few things: \* the S3 bucket to be a repository for the sensitive data discovery results; \* the KMS key that the data in that bucket will be encrypted with; \* and the S3 bucket(s) that you’ll need Macie to analyze for you. The following manual steps are not a comprehensive full setup for Macie. To configure Macie fully and understand the details, please follow

- Log into the AWS console and for every region where you have enabled Macie, repeat the steps 2 to 9.
- Go to the Amazon Macie service.
- In the left pane, under Settings, click on "Discovery results".
- Click on "Configure now" to configure an S3 bucket for long-term retention of sensitive data discovery results.
- Choose "Existing bucket".
- Under "Choose a bucket", select your bucket. This can be either one you already have, or the one that the `macie` module created (if you set the `create_macie_bucket` variable to `true`). You will use the same bucket for every region.
- Under "KMS encryption" choose "Select a key from your account".
- Under "KMS key alias" select your KMS key. This can be either one you already have, or the one that the `macie` module created (if you set the `create_kms_key` variable to `true`). You will use the same key for every region.
- Click "Save".

### Manually maintain buckets to analyze in the `buckets_to_analyze` variable

To set up Macie to analyze the desired S3 buckets, you’ll need to create a **Macie classification job**, Typically, you’ll want it to analyze all the buckets in the region. However, the terraform AWS provider does not support specifying all the buckets in a region - it requires that an explicit list of buckets be provided (see related bug
[here](https://github.com/hashicorp/terraform-provider-aws/issues/20044)). Therefore, you’ll need to maintain an
explicit list of buckets per region, namely in the variable `buckets_to_analyze`. For more details, see the production _Deployment Walkthrough_ guide section below.


<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "a42545420e9759182b9a7727a91aab4a"
}
##DOCS-SOURCER-END -->

# Logging

In the Logging section, the Benchmark recommendations target the following services:

- [AWS CloudTrail](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-user-guide.html)

- [AWS Config](https://docs.aws.amazon.com/config/latest/developerguide/WhatIsConfig.html)

- [KMS Key rotation](https://docs.aws.amazon.com/kms/latest/developerguide/rotate-keys.html)

- [VPC Flow Logs](https://docs.aws.amazon.com/vpc/latest/userguide/flow-logs.html)

We’ll cover each of them in turn.

## AWS CloudTrail

The Benchmark has specific requirements for the CloudTrail configuration, described in recommendations 3.1-4, 3.6-7 and 3.10-11.
The CloudTrail must have the following characteristics:

1. Collects events[in all regions](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/receive-cloudtrail-log-files-from-multiple-regions.html)

2. Enables [log file integrity validation](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-log-file-validation-intro.html)

3. Ensures that the S3 bucket used by CloudTrail is not publicly accessible

4. Integrates [CloudTrail with CloudWatch Logs](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/send-cloudtrail-events-to-cloudwatch-logs.html)

5. [Encrypts CloudTrail logs at rest](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/encrypting-cloudtrail-log-files-with-aws-kms.html)

6. Enables [access logging](https://docs.aws.amazon.com/AmazonS3/latest/dev/ServerLogs.html) for the CloudTrail S3 bucket

7. Enables [object-level logging](https://docs.aws.amazon.com/AmazonS3/latest/user-guide/enable-cloudtrail-events.html) for read and write events for the CloudTrail S3 bucket

Use the [`aws_cloudtrail`](https://www.terraform.io/docs/providers/aws/r/cloudtrail.html) Terraform resource to create the CloudTrail. Include the following settings in the CloudTrail configuration:

```hcl
is_multi_region_trail         = true
include_global_service_events = true
enable_log_file_validation    = true
s3_bucket_name                = "<YOUR CLOUDTRAIL BUCKET NAME>"
cloud_watch_logs_group_arn    = "<YOUR CLOUDWATCH LOGS GROUP ARN>"

event_selector {
  read_write_type           = "All"
  include_management_events = true

  data_resource {
    type   = "AWS::S3::Object"
    values = ["<YOUR CLOUDTRAIL BUCKET ARN>"]
  }
}
```

You’ll also need the [`aws_s3_bucket`](https://www.terraform.io/docs/providers/aws/r/s3_bucket.html),
[`aws_s3_account_public_access_block`](https://www.terraform.io/docs/providers/aws/r/s3_account_public_access_block.html)
resources to create an S3 bucket for the CloudTrail to send its events to and to disable public access to the bucket;
you wouldn’t want to expose the CloudTrail data publicly!

Finally, you’ll need the
[`aws_cloudwatch_log_group`](https://www.terraform.io/docs/providers/aws/r/cloudwatch_log_group.html) resource to
create a CloudWatch Log group as another location for CloudTrail to send events. Use this ARN for the `aws_cloudtrail`
resource `cloud_watch_logs_group_arn` parameter when creating the CloudTrail.

## AWS Config

Benchmark recommendation 3.5 states that AWS Config be enabled in all regions. This is challenging to implement with
Terraform because running a particular configuration in all regions is not a feature that Terraform has natively.
Terraform has [loops](https://www.terraform.io/docs/configuration/expressions.html#for-expressions), but they aren’t
available for the purpose of repeating a resource in many regions. Unfortunately, at the time of writing, there isn’t a
way to complete this recommendation without repetitive code.

To proceed, start by creating a Terraform module that takes the following actions:

1. Creates an [SNS topic](https://www.terraform.io/docs/providers/aws/r/sns_topic.html) for publishing Config events

2. Creates an [S3 bucket](https://www.terraform.io/docs/providers/aws/d/s3_bucket.html) for Config events and [disables public access](https://www.terraform.io/docs/providers/aws/r/s3_account_public_access_block.html)

3. Creates an [IAM role](https://www.terraform.io/docs/providers/aws/d/iam_role.html) for the config service to access an S3 bucket and an SNS topic

4. Creates a [configuration recorder](https://www.terraform.io/docs/providers/aws/r/config_configuration_recorder.html)

5. Creates a [delivery channel](https://www.terraform.io/docs/providers/aws/r/config_delivery_channel.html)

6. [Enables the configuration recorder](https://www.terraform.io/docs/providers/aws/r/config_configuration_recorder_status.html)

When the module is working and sets up AWS Config according to the prescribed configuration, you should invoke it once
for each region in the account. One way to do this is to use
[provider aliases](https://www.terraform.io/docs/configuration/providers.html#alias-multiple-provider-instances). For
example, you could specify one provider for each region, then invoke the module for each provider:

```hcl
# The default provider configuration
provider "aws" {
  alias  = "us-east-1"
  region = "us-east-1"
}

# Additional provider configuration for west coast region
provider "aws" {
  alias  = "us-west-2"
  region = "us-west-2"
}

# ... repeat the provider for each region in the AWS account

module "aws_config_us_east_1" {
  source = "/path/to/your/config/module"
  providers = {
    aws = aws.us-east-1
  }
}

module "aws_config_us_west_2" {
  source = "/path/to/your/config/module"
  providers = {
    aws = aws.us-west-2
  }
}

# ... repeat the module invocation for each provider
```

When AWS launches new regions, they are [not enabled by default](https://docs.aws.amazon.com/general/latest/gr/rande-manage.html), so you won’t need to add to this list over time.

Alternatively, you could [disable](https://docs.aws.amazon.com/general/latest/gr/rande-manage.html#rande-manage-disable) the regions you aren’t using and only enable AWS Config for those that you need.

## KMS Key rotation

Finally, a simple recommendation! To meet recommendation 3.8, create KMS keys with key rotation enabled. Using Terraform, it looks like this:

```hcl
resource "aws_kms_key" "example" {
  description         = "Example Key"
  enable_key_rotation = true
}
```

## VPC Flow Logs

Under the Benchmark, all VPCs must have a Flow Log to log network traffic. Use the
[`aws_flow_log`](https://www.terraform.io/docs/providers/aws/r/flow_log.html) Terraform resource, being sure to use
`log_destination_type=cloud-watch-logs`.

Because the recommendation is to attach flow logs to every single VPC, you’ll need to repeat the configuration for all
the default VPCs which exist in all regions of the account. You can use the
[`cloud-nuke defaults-aws` command](https://github.com/gruntwork-io/cloud-nuke) to easily remove all the default VPCs
(and default security groups) from all regions of an account, making it easier to achieve this recommendation.

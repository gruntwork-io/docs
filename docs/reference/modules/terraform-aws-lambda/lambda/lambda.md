---
title: "Lambda Function Module"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="AWS Lambda" version="1.0.2" lastModifiedVersion="1.0.2"/>

# Lambda Function Module

<a href="https://github.com/gruntwork-io/terraform-aws-lambda/tree/v1.0.2/modules/lambda" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v1.0.2" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This module makes it easy to deploy and manage an [AWS Lambda](https://aws.amazon.com/lambda/) function. Lambda gives
you a way to run code on-demand in AWS without having to manage servers.

## What is AWS Lambda?

[AWS Lambda](https://aws.amazon.com/lambda/) lets you run code without provisioning or managing servers. You define a
function in a supported language (currently: Python, JavaScript, Java, and C#), upload the code to Lambda, specify how
that function can be triggered, and then AWS Lambda takes care of all the details of deploying and scaling the
infrastructure to run that code.

## How do you add additional IAM policies and permissions?

By default, the `lambda` module configures your lambda function with an IAM role that allows it to write logs to
CloudWatch Logs. The ID of the IAM role is exported as the output `iam_role_id` and the ID of the lambda function is
exported as the output `function_arn`, so you can add custom rules using the `aws_iam_role_policy` or
`aws_lambda_permission` resources, respectively. For example, to allow your lambda function to be triggered by SNS:

```hcl
module "my_lambda_function" {
  source = "git::git@github.com:gruntwork-io/terraform-aws-lambda.git//modules/lambda?ref=v1.0.8"
  # (params omitted)
}

resource "aws_lambda_permission" "with_sns" {
  statement_id = "AllowExecutionFromSNS"
  action = "lambda:InvokeFunction"
  function_name = "${module.my_lambda_function.function_arn}"
  principal = "sns.amazonaws.com"
  source_arn = "${aws_sns_topic.default.arn}"
}
```

## How do you give the lambda function access to a VPC?

By default, your Lambda functions do not have access to your VPCs or subnets. If the lambda function needs to be able
to talk to something directly within your VPC, you need to:

1.  Set the `run_in_vpc` parameter to `true`.

2.  Specify the ID of the VPC your Lambda function should be able to access via the `vpc_id` parameter.

3.  Specify the IDs of the subnets your Lambda function should be able to access via the `subnet_ids` parameter.

Here's an example:

```hcl
module "my_lambda_function" {
  source = "git::git@github.com:gruntwork-io/terraform-aws-lambda.git//modules/lambda?ref=v1.0.8"
  
  run_in_vpc = true
  vpc_id = "${data.terraform_remote_state.vpc.id}"
  subnet_ids = "${data.terraform_remote_state.vpc.private_app_subnet_ids}"
  
  # (other params omitted)
}
```

When you set `run_in_vpc` to `true`, this module also creates a Security Group for your Lambda function. By default,
this security group does not allow any inbound or outbound requests, so if the Lambda function needs to make requests
to the outside world, you will need to add the corresponding rules to that security group (its ID is available as the
output variable `security_group_id`):

```hcl
module "my_lambda_function" {
  source = "git::git@github.com:gruntwork-io/terraform-aws-lambda.git//modules/lambda?ref=v1.0.8"
  
  run_in_vpc = true
  vpc_id = "${data.terraform_remote_state.vpc.id}"
  subnet_ids = "${data.terraform_remote_state.vpc.private_app_subnet_ids}"
  
  # (other params omitted)
}

resource "aws_security_group_rule" "allow_all_outbound_to_vpc" {
  type = "egress"
  from_port = 0
  to_port = 0
  protocol = "-1"
  cidr_blocks = ["${data.terraform_remote_state.vpc.vpc_cidr_block}"]
  security_group_id = "${module.my_lambda_function.security_group_id}"
}
```

Sometimes, destroying the Security Group can take long when the network interfaces created automatically by the
Lambda function are still in use. If necessary, the variable `enable_eni_cleanup` can be used to force the detachment
of the function from the VPC during `terraform destroy` and unblock the Security Group for destruction. Note: this
requires the [`aws` cli tool](https://aws.amazon.com/cli/) to be installed.

Check out the [lambda-vpc example](https://github.com/gruntwork-io/terraform-aws-lambda/tree/v1.0.2/examples/lambda-vpc) for working sample code. Make sure to note the Known Issues
section in that example's README.

## How do you share Lambda functions across multiple AWS accounts?

If you want to have a central S3 bucket that you use as a repository for your Lambda functions in one AWS account (e.g., `shared-services`) and you want to allow all the other accounts (e.g., `dev`, `stage`, `prod`) to access that S3 bucket, you need to do the following:

1.  In the `shared-services` account, add a bucket policy to allow access to the bucket from other AWS accounts:
    ```json
    {
       "Version": "2012-10-17",
       "Statement": [
           {
               "Sid": "ReadOnlyAccessForExternalAccounts",
               "Effect": "Allow",
               "Principal": {
                   "AWS": [
                       "arn:aws:iam::222222222222:root",
                       "arn:aws:iam::333333333333:root",
                       "arn:aws:iam::444444444444:root"                       
                   ]
               },
               "Action": [
                   "s3:GetObjectVersion",
                   "s3:GetObject"
               ],
               "Resource": "arn:aws:s3:::bucket-name/*"
           }
       ]
    }
    ```
    `s3:GetObjectVersion` is only required if you want to use `s3 object versioning` when deploying `lambdas`. You also need to enable `bucket versioning` in such case.
2.  If you want to enable `encryption` for `S3 objects` you must use a customer master key, or CMK (see the [kms-master-key](https://github.com/gruntwork-io/terraform-aws-security/tree/main/modules/kms-master-key) module) rather than the default key, and ensure that both the `shared-services` account and all the other accounts (`dev`, `stage`, `prod`) have access to that CMK.
3.  The IAM User or IAM Role which will be running `terraform apply` for the other accounts (`dev`, `stage`, `prod`) must also be explicitly granted access to the S3 bucket in (1) and the CMK in (2).

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S LAMBDA MODULE
# ------------------------------------------------------------------------------------------------------

module "lambda" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-lambda.git//modules/lambda?ref=v1.0.2"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The maximum amount of memory, in MB, your Lambda function will be able to
  # use at runtime. Can be set in 64MB increments from 128MB up to 1536MB. Note
  # that the amount of CPU power given to a Lambda function is proportional to
  # the amount of memory you request, so a Lambda function with 256MB of memory
  # has twice as much CPU power as one with 128MB.
  memory_size = <number>

  # The name of the Lambda function. Used to namespace all resources created by
  # this module.
  name = <string>

  # The maximum amount of time, in seconds, your Lambda function will be allowed
  # to run. Must be between 1 and 300 seconds.
  timeout = <number>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # A list of Security Group IDs that should be attached to the Lambda function
  # when running in a VPC. Only used if var.run_in_vpc is true.
  additional_security_group_ids = []

  # Instruction set architecture for your Lambda function. Valid values are:
  # x86_64; arm64. When null, defaults to x86_64.
  architecture = null

  # A custom assume role policy for the IAM role for this Lambda function. If
  # not set, the default is a policy that allows the Lambda service to assume
  # the IAM role, which is what most users will need. However, you can use this
  # variable to override the policy for special cases, such as using a Lambda
  # function to rotate AWS Secrets Manager secrets.
  assume_role_policy = null

  # The ID (ARN, alias ARN, AWS ID) of a customer managed KMS Key to use for
  # encrypting log data.
  cloudwatch_log_group_kms_key_id = null

  # The number of days to retain log events in the log group. Refer to
  # https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudwatch_log_group#retention_in_days
  # for all the valid values. When null, the log events are retained forever.
  cloudwatch_log_group_retention_in_days = null

  # The ARN of the destination to deliver matching log events to. Kinesis stream
  # or Lambda function ARN. Only applicable if
  # var.should_create_cloudwatch_log_group is true.
  cloudwatch_log_group_subscription_destination_arn = null

  # The method used to distribute log data to the destination. Only applicable
  # when var.cloudwatch_log_group_subscription_destination_arn is a kinesis
  # stream. Valid values are `Random` and `ByLogStream`.
  cloudwatch_log_group_subscription_distribution = null

  # A valid CloudWatch Logs filter pattern for subscribing to a filtered stream
  # of log events.
  cloudwatch_log_group_subscription_filter_pattern = ""

  # ARN of an IAM role that grants Amazon CloudWatch Logs permissions to deliver
  # ingested log events to the destination. Only applicable when
  # var.cloudwatch_log_group_subscription_destination_arn is a kinesis stream.
  cloudwatch_log_group_subscription_role_arn = null

  # Tags to apply on the CloudWatch Log Group, encoded as a map where the keys
  # are tag keys and values are tag values.
  cloudwatch_log_group_tags = null

  # The CMD for the docker image. Only used if you specify a Docker image via
  # image_uri.
  command = []

  # Set to false to have this module skip creating resources. This weird
  # parameter exists solely because Terraform does not support conditional
  # modules. Therefore, this is a hack to allow you to conditionally decide if
  # this module should create anything or not.
  create_resources = true

  # The ARN of an SNS topic or an SQS queue to notify when invocation of a
  # Lambda function fails. If this option is used, you must grant this
  # function's IAM role (the ID is outputted as iam_role_id) access to write to
  # the target object, which means allowing either the sns:Publish or
  # sqs:SendMessage action on this ARN, depending on which service is targeted.
  dead_letter_target_arn = null

  # A description of what the Lambda function does.
  description = null

  # When true, this will force the detachment of the Lambda from the VPC, if
  # var.run_in_vpc is set, and the automatic cleanup of the ENIs created by the
  # Lambda function. This will prevent issues with the security group when
  # running `terraform destroy`. Warning: requires the `aws` cli tool to be
  # installed.
  enable_eni_cleanup = false

  # Set to true to enable versioning for this Lambda function. This allows you
  # to use aliases to refer to execute different versions of the function in
  # different environments. Note that an alternative way to run Lambda functions
  # in multiple environments is to version your Terraform code.
  enable_versioning = false

  # The ENTRYPOINT for the docker image. Only used if you specify a Docker image
  # via image_uri.
  entry_point = []

  # A map of environment variables to pass to the Lambda function. AWS will
  # automatically encrypt these with KMS and decrypt them when running the
  # function.
  environment_variables = {"EnvVarPlaceHolder":"Placeholder"}

  # The amount of Ephemeral storage(/tmp) to allocate for the Lambda Function in
  # MB. This parameter is used to expand the total amount of Ephemeral storage
  # available, beyond the default amount of 512MB.
  ephemeral_storage = null

  # The ARN of existing IAM role that will be used for the Lambda function. If
  # set, the module will not create any IAM entities and fully relies on caller
  # to provide correct IAM role and its policies. Using the variable allows the
  # module to leverage an existing IAM role - for example, when an account has
  # centralized set of IAM entities, or when deploying same function across
  # multiple AWS region to avoid the module attempting to create duplicate IAM
  # entities.
  existing_role_arn = null

  # The ARN of an EFS access point to use to access the file system. Only used
  # if var.mount_to_file_system is true.
  file_system_access_point_arn = null

  # The mount path where the lambda can access the file system. This path must
  # begin with /mnt/. Only used if var.mount_to_file_system is true.
  file_system_mount_path = null

  # The function entrypoint in your code. This is typically the name of a
  # function or method in your code that AWS will execute when this Lambda
  # function is triggered.
  handler = null

  # The name to use for the IAM role created for the lambda function. If null,
  # default to the function name (var.name). Only used if var.existing_role_arn
  # is null.
  iam_role_name = null

  # A map of tags to apply to the IAM role created for the lambda function. This
  # will be merged with the var.tags parameter. Only used if
  # var.existing_role_arn is null.
  iam_role_tags = {}

  # When true, this will ignore changes to image_uri for container based
  # Lambdas. This will allow the image tag to be managed and deployed outside of
  # Terraform using your favorite CICD deployment tool without configuration
  # drift.
  ignore_image_uri_changes = false

  # The ECR image URI containing the function's deployment package. Example:
  # 01234501234501.dkr.ecr.us-east-1.amazonaws.com/image_name:image_tag
  image_uri = null

  # A custom KMS key to use to encrypt and decrypt Lambda function environment
  # variables. Leave it blank to use the default KMS key provided in your AWS
  # account.
  kms_key_arn = null

  # The ARN of the policy that is used to set the permissions boundary for the
  # IAM role for the lambda
  lambda_role_permissions_boundary_arn = null

  # The list of Lambda Layer Version ARNs to attach to your Lambda Function. You
  # can have a maximum of 5 Layers attached to each function.
  layers = []

  # Advanced logging settings. Format can either be the default Text option or
  # JSON. JSON allows for different log levels to be selected, not setting those
  # attributes will use the AWS defaults. The log group destination name can
  # also be overridden. More information available at:
  # https://docs.aws.amazon.com/lambda/latest/dg/monitoring-cloudwatchlogs-advanced.html
  logging_config = null

  # Time to wait after creating managed policy, to avoid AWS eventual
  # consistency racing. Default: 60s.
  managed_policy_waiting_time = "60s"

  # Set to true to mount your Lambda function on an EFS. Note that the lambda
  # must also be deployed inside a VPC (run_in_vpc must be set to true) for this
  # config to have any effect.
  mount_to_file_system = false

  # The amount of reserved concurrent executions for this lambda function or -1
  # if unreserved.
  reserved_concurrent_executions = null

  # Set to true to give your Lambda function access to resources within a VPC.
  run_in_vpc = false

  # The runtime environment for the Lambda function (e.g. nodejs, python3.9,
  # java8). See
  # https://docs.aws.amazon.com/lambda/latest/dg/API_CreateFunction.html#SSS-CreateFunction-request-Runtime
  # for all possible values.
  runtime = null

  # An S3 bucket location containing the function's deployment package. Exactly
  # one of var.source_path or the var.s3_xxx variables must be specified.
  s3_bucket = null

  # The path within var.s3_bucket where the deployment package is located.
  # Exactly one of var.source_path or the var.s3_xxx variables must be
  # specified.
  s3_key = null

  # The version of the path in var.s3_key to use as the deployment package.
  # Exactly one of var.source_path or the var.s3_xxx variables must be
  # specified.
  s3_object_version = null

  # A description of what the security group is used for.
  security_group_description = null

  # If set to false, this function will no longer set the source_code_hash
  # parameter, so this module will no longer detect and upload changes to the
  # deployment package. This is primarily useful if you update the Lambda
  # function from outside of this module (e.g., you have scripts that do it
  # separately) and want to avoid a plan diff. Used only if var.source_path is
  # non-empty.
  set_source_code_hash = true

  # When true, precreate the CloudWatch Log Group to use for log aggregation
  # from the lambda function execution. This is useful if you wish to customize
  # the CloudWatch Log Group with various settings such as retention periods and
  # KMS encryption. When false, AWS Lambda will automatically create a basic log
  # group to use.
  should_create_cloudwatch_log_group = true

  # If true, create an egress rule allowing all outbound traffic from Lambda
  # function to the entire Internet (e.g. 0.0.0.0/0).
  should_create_outbound_rule = false

  # Set to true to skip zip archive creation and assume that var.source_path
  # points to a pregenerated zip archive.
  skip_zip = false

  # The path to the directory that contains your Lambda function source code.
  # This code will be zipped up and uploaded to Lambda as your deployment
  # package. If var.skip_zip is set to true, then this is assumed to be the path
  # to an already-zipped file, and it will be uploaded directly to Lambda as a
  # deployment package. Exactly one of var.source_path or the var.s3_xxx
  # variables must be specified.
  source_path = null

  # A list of subnet IDs the Lambda function should be able to access within
  # your VPC. Only used if var.run_in_vpc is true.
  subnet_ids = []

  # A map of tags to apply to the Lambda function and all resources created in
  # this module.
  tags = {}

  # Whether to sample and trace a subset of incoming requests with AWS X-Ray.
  # Valid values are `PassThrough` and `Active`. More information available at:
  # https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lambda_function#tracing_config.
  tracing_config_mode = null

  # When true, all IAM policies will be managed as dedicated policies rather
  # than inline policies attached to the IAM roles. Dedicated managed policies
  # are friendlier to automated policy checkers, which may scan a single
  # resource for findings. As such, it is important to avoid inline policies
  # when targeting compliance with various security standards.
  use_managed_iam_policies = true

  # The ID of the VPC the Lambda function should be able to access. Only used if
  # var.run_in_vpc is true.
  vpc_id = null

  # The working directory for the docker image. Only used if you specify a
  # Docker image via image_uri.
  working_directory = null

  # Files in var.source_path to ignore when zipping the directory in addition to
  # .terragrunt-source-manifest.
  zip_exclude_files = []

  # The path to store the output zip file of your source code. If empty,
  # defaults to module path. This should be the full path to the zip file, not a
  # directory.
  zip_output_path = null

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S LAMBDA MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-lambda.git//modules/lambda?ref=v1.0.2"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The maximum amount of memory, in MB, your Lambda function will be able to
  # use at runtime. Can be set in 64MB increments from 128MB up to 1536MB. Note
  # that the amount of CPU power given to a Lambda function is proportional to
  # the amount of memory you request, so a Lambda function with 256MB of memory
  # has twice as much CPU power as one with 128MB.
  memory_size = <number>

  # The name of the Lambda function. Used to namespace all resources created by
  # this module.
  name = <string>

  # The maximum amount of time, in seconds, your Lambda function will be allowed
  # to run. Must be between 1 and 300 seconds.
  timeout = <number>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # A list of Security Group IDs that should be attached to the Lambda function
  # when running in a VPC. Only used if var.run_in_vpc is true.
  additional_security_group_ids = []

  # Instruction set architecture for your Lambda function. Valid values are:
  # x86_64; arm64. When null, defaults to x86_64.
  architecture = null

  # A custom assume role policy for the IAM role for this Lambda function. If
  # not set, the default is a policy that allows the Lambda service to assume
  # the IAM role, which is what most users will need. However, you can use this
  # variable to override the policy for special cases, such as using a Lambda
  # function to rotate AWS Secrets Manager secrets.
  assume_role_policy = null

  # The ID (ARN, alias ARN, AWS ID) of a customer managed KMS Key to use for
  # encrypting log data.
  cloudwatch_log_group_kms_key_id = null

  # The number of days to retain log events in the log group. Refer to
  # https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudwatch_log_group#retention_in_days
  # for all the valid values. When null, the log events are retained forever.
  cloudwatch_log_group_retention_in_days = null

  # The ARN of the destination to deliver matching log events to. Kinesis stream
  # or Lambda function ARN. Only applicable if
  # var.should_create_cloudwatch_log_group is true.
  cloudwatch_log_group_subscription_destination_arn = null

  # The method used to distribute log data to the destination. Only applicable
  # when var.cloudwatch_log_group_subscription_destination_arn is a kinesis
  # stream. Valid values are `Random` and `ByLogStream`.
  cloudwatch_log_group_subscription_distribution = null

  # A valid CloudWatch Logs filter pattern for subscribing to a filtered stream
  # of log events.
  cloudwatch_log_group_subscription_filter_pattern = ""

  # ARN of an IAM role that grants Amazon CloudWatch Logs permissions to deliver
  # ingested log events to the destination. Only applicable when
  # var.cloudwatch_log_group_subscription_destination_arn is a kinesis stream.
  cloudwatch_log_group_subscription_role_arn = null

  # Tags to apply on the CloudWatch Log Group, encoded as a map where the keys
  # are tag keys and values are tag values.
  cloudwatch_log_group_tags = null

  # The CMD for the docker image. Only used if you specify a Docker image via
  # image_uri.
  command = []

  # Set to false to have this module skip creating resources. This weird
  # parameter exists solely because Terraform does not support conditional
  # modules. Therefore, this is a hack to allow you to conditionally decide if
  # this module should create anything or not.
  create_resources = true

  # The ARN of an SNS topic or an SQS queue to notify when invocation of a
  # Lambda function fails. If this option is used, you must grant this
  # function's IAM role (the ID is outputted as iam_role_id) access to write to
  # the target object, which means allowing either the sns:Publish or
  # sqs:SendMessage action on this ARN, depending on which service is targeted.
  dead_letter_target_arn = null

  # A description of what the Lambda function does.
  description = null

  # When true, this will force the detachment of the Lambda from the VPC, if
  # var.run_in_vpc is set, and the automatic cleanup of the ENIs created by the
  # Lambda function. This will prevent issues with the security group when
  # running `terraform destroy`. Warning: requires the `aws` cli tool to be
  # installed.
  enable_eni_cleanup = false

  # Set to true to enable versioning for this Lambda function. This allows you
  # to use aliases to refer to execute different versions of the function in
  # different environments. Note that an alternative way to run Lambda functions
  # in multiple environments is to version your Terraform code.
  enable_versioning = false

  # The ENTRYPOINT for the docker image. Only used if you specify a Docker image
  # via image_uri.
  entry_point = []

  # A map of environment variables to pass to the Lambda function. AWS will
  # automatically encrypt these with KMS and decrypt them when running the
  # function.
  environment_variables = {"EnvVarPlaceHolder":"Placeholder"}

  # The amount of Ephemeral storage(/tmp) to allocate for the Lambda Function in
  # MB. This parameter is used to expand the total amount of Ephemeral storage
  # available, beyond the default amount of 512MB.
  ephemeral_storage = null

  # The ARN of existing IAM role that will be used for the Lambda function. If
  # set, the module will not create any IAM entities and fully relies on caller
  # to provide correct IAM role and its policies. Using the variable allows the
  # module to leverage an existing IAM role - for example, when an account has
  # centralized set of IAM entities, or when deploying same function across
  # multiple AWS region to avoid the module attempting to create duplicate IAM
  # entities.
  existing_role_arn = null

  # The ARN of an EFS access point to use to access the file system. Only used
  # if var.mount_to_file_system is true.
  file_system_access_point_arn = null

  # The mount path where the lambda can access the file system. This path must
  # begin with /mnt/. Only used if var.mount_to_file_system is true.
  file_system_mount_path = null

  # The function entrypoint in your code. This is typically the name of a
  # function or method in your code that AWS will execute when this Lambda
  # function is triggered.
  handler = null

  # The name to use for the IAM role created for the lambda function. If null,
  # default to the function name (var.name). Only used if var.existing_role_arn
  # is null.
  iam_role_name = null

  # A map of tags to apply to the IAM role created for the lambda function. This
  # will be merged with the var.tags parameter. Only used if
  # var.existing_role_arn is null.
  iam_role_tags = {}

  # When true, this will ignore changes to image_uri for container based
  # Lambdas. This will allow the image tag to be managed and deployed outside of
  # Terraform using your favorite CICD deployment tool without configuration
  # drift.
  ignore_image_uri_changes = false

  # The ECR image URI containing the function's deployment package. Example:
  # 01234501234501.dkr.ecr.us-east-1.amazonaws.com/image_name:image_tag
  image_uri = null

  # A custom KMS key to use to encrypt and decrypt Lambda function environment
  # variables. Leave it blank to use the default KMS key provided in your AWS
  # account.
  kms_key_arn = null

  # The ARN of the policy that is used to set the permissions boundary for the
  # IAM role for the lambda
  lambda_role_permissions_boundary_arn = null

  # The list of Lambda Layer Version ARNs to attach to your Lambda Function. You
  # can have a maximum of 5 Layers attached to each function.
  layers = []

  # Advanced logging settings. Format can either be the default Text option or
  # JSON. JSON allows for different log levels to be selected, not setting those
  # attributes will use the AWS defaults. The log group destination name can
  # also be overridden. More information available at:
  # https://docs.aws.amazon.com/lambda/latest/dg/monitoring-cloudwatchlogs-advanced.html
  logging_config = null

  # Time to wait after creating managed policy, to avoid AWS eventual
  # consistency racing. Default: 60s.
  managed_policy_waiting_time = "60s"

  # Set to true to mount your Lambda function on an EFS. Note that the lambda
  # must also be deployed inside a VPC (run_in_vpc must be set to true) for this
  # config to have any effect.
  mount_to_file_system = false

  # The amount of reserved concurrent executions for this lambda function or -1
  # if unreserved.
  reserved_concurrent_executions = null

  # Set to true to give your Lambda function access to resources within a VPC.
  run_in_vpc = false

  # The runtime environment for the Lambda function (e.g. nodejs, python3.9,
  # java8). See
  # https://docs.aws.amazon.com/lambda/latest/dg/API_CreateFunction.html#SSS-CreateFunction-request-Runtime
  # for all possible values.
  runtime = null

  # An S3 bucket location containing the function's deployment package. Exactly
  # one of var.source_path or the var.s3_xxx variables must be specified.
  s3_bucket = null

  # The path within var.s3_bucket where the deployment package is located.
  # Exactly one of var.source_path or the var.s3_xxx variables must be
  # specified.
  s3_key = null

  # The version of the path in var.s3_key to use as the deployment package.
  # Exactly one of var.source_path or the var.s3_xxx variables must be
  # specified.
  s3_object_version = null

  # A description of what the security group is used for.
  security_group_description = null

  # If set to false, this function will no longer set the source_code_hash
  # parameter, so this module will no longer detect and upload changes to the
  # deployment package. This is primarily useful if you update the Lambda
  # function from outside of this module (e.g., you have scripts that do it
  # separately) and want to avoid a plan diff. Used only if var.source_path is
  # non-empty.
  set_source_code_hash = true

  # When true, precreate the CloudWatch Log Group to use for log aggregation
  # from the lambda function execution. This is useful if you wish to customize
  # the CloudWatch Log Group with various settings such as retention periods and
  # KMS encryption. When false, AWS Lambda will automatically create a basic log
  # group to use.
  should_create_cloudwatch_log_group = true

  # If true, create an egress rule allowing all outbound traffic from Lambda
  # function to the entire Internet (e.g. 0.0.0.0/0).
  should_create_outbound_rule = false

  # Set to true to skip zip archive creation and assume that var.source_path
  # points to a pregenerated zip archive.
  skip_zip = false

  # The path to the directory that contains your Lambda function source code.
  # This code will be zipped up and uploaded to Lambda as your deployment
  # package. If var.skip_zip is set to true, then this is assumed to be the path
  # to an already-zipped file, and it will be uploaded directly to Lambda as a
  # deployment package. Exactly one of var.source_path or the var.s3_xxx
  # variables must be specified.
  source_path = null

  # A list of subnet IDs the Lambda function should be able to access within
  # your VPC. Only used if var.run_in_vpc is true.
  subnet_ids = []

  # A map of tags to apply to the Lambda function and all resources created in
  # this module.
  tags = {}

  # Whether to sample and trace a subset of incoming requests with AWS X-Ray.
  # Valid values are `PassThrough` and `Active`. More information available at:
  # https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lambda_function#tracing_config.
  tracing_config_mode = null

  # When true, all IAM policies will be managed as dedicated policies rather
  # than inline policies attached to the IAM roles. Dedicated managed policies
  # are friendlier to automated policy checkers, which may scan a single
  # resource for findings. As such, it is important to avoid inline policies
  # when targeting compliance with various security standards.
  use_managed_iam_policies = true

  # The ID of the VPC the Lambda function should be able to access. Only used if
  # var.run_in_vpc is true.
  vpc_id = null

  # The working directory for the docker image. Only used if you specify a
  # Docker image via image_uri.
  working_directory = null

  # Files in var.source_path to ignore when zipping the directory in addition to
  # .terragrunt-source-manifest.
  zip_exclude_files = []

  # The path to store the output zip file of your source code. If empty,
  # defaults to module path. This should be the full path to the zip file, not a
  # directory.
  zip_output_path = null

}


```

</TabItem>
</Tabs>




## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Required

<HclListItem name="memory_size" requirement="required" type="number">
<HclListItemDescription>

The maximum amount of memory, in MB, your Lambda function will be able to use at runtime. Can be set in 64MB increments from 128MB up to 1536MB. Note that the amount of CPU power given to a Lambda function is proportional to the amount of memory you request, so a Lambda function with 256MB of memory has twice as much CPU power as one with 128MB.

</HclListItemDescription>
</HclListItem>

<HclListItem name="name" requirement="required" type="string">
<HclListItemDescription>

The name of the Lambda function. Used to namespace all resources created by this module.

</HclListItemDescription>
</HclListItem>

<HclListItem name="timeout" requirement="required" type="number">
<HclListItemDescription>

The maximum amount of time, in seconds, your Lambda function will be allowed to run. Must be between 1 and 300 seconds.

</HclListItemDescription>
</HclListItem>

### Optional

<HclListItem name="additional_security_group_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of Security Group IDs that should be attached to the Lambda function when running in a VPC. Only used if <a href="#run_in_vpc"><code>run_in_vpc</code></a> is true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="architecture" requirement="optional" type="string">
<HclListItemDescription>

Instruction set architecture for your Lambda function. Valid values are: x86_64; arm64. When null, defaults to x86_64.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="assume_role_policy" requirement="optional" type="string">
<HclListItemDescription>

A custom assume role policy for the IAM role for this Lambda function. If not set, the default is a policy that allows the Lambda service to assume the IAM role, which is what most users will need. However, you can use this variable to override the policy for special cases, such as using a Lambda function to rotate AWS Secrets Manager secrets.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="cloudwatch_log_group_kms_key_id" requirement="optional" type="string">
<HclListItemDescription>

The ID (ARN, alias ARN, AWS ID) of a customer managed KMS Key to use for encrypting log data.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="cloudwatch_log_group_retention_in_days" requirement="optional" type="number">
<HclListItemDescription>

The number of days to retain log events in the log group. Refer to https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudwatch_log_group#retention_in_days for all the valid values. When null, the log events are retained forever.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="cloudwatch_log_group_subscription_destination_arn" requirement="optional" type="string">
<HclListItemDescription>

The ARN of the destination to deliver matching log events to. Kinesis stream or Lambda function ARN. Only applicable if <a href="#should_create_cloudwatch_log_group"><code>should_create_cloudwatch_log_group</code></a> is true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="cloudwatch_log_group_subscription_distribution" requirement="optional" type="string">
<HclListItemDescription>

The method used to distribute log data to the destination. Only applicable when <a href="#cloudwatch_log_group_subscription_destination_arn"><code>cloudwatch_log_group_subscription_destination_arn</code></a> is a kinesis stream. Valid values are `Random` and `ByLogStream`.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="cloudwatch_log_group_subscription_filter_pattern" requirement="optional" type="string">
<HclListItemDescription>

A valid CloudWatch Logs filter pattern for subscribing to a filtered stream of log events.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;&quot;"/>
</HclListItem>

<HclListItem name="cloudwatch_log_group_subscription_role_arn" requirement="optional" type="string">
<HclListItemDescription>

ARN of an IAM role that grants Amazon CloudWatch Logs permissions to deliver ingested log events to the destination. Only applicable when <a href="#cloudwatch_log_group_subscription_destination_arn"><code>cloudwatch_log_group_subscription_destination_arn</code></a> is a kinesis stream.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="cloudwatch_log_group_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

Tags to apply on the CloudWatch Log Group, encoded as a map where the keys are tag keys and values are tag values.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="command" requirement="optional" type="list(string)">
<HclListItemDescription>

The CMD for the docker image. Only used if you specify a Docker image via image_uri.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="create_resources" requirement="optional" type="bool">
<HclListItemDescription>

Set to false to have this module skip creating resources. This weird parameter exists solely because Terraform does not support conditional modules. Therefore, this is a hack to allow you to conditionally decide if this module should create anything or not.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="dead_letter_target_arn" requirement="optional">
<HclListItemDescription>

The ARN of an SNS topic or an SQS queue to notify when invocation of a Lambda function fails. If this option is used, you must grant this function's IAM role (the ID is outputted as iam_role_id) access to write to the target object, which means allowing either the sns:Publish or sqs:SendMessage action on this ARN, depending on which service is targeted.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="description" requirement="optional" type="string">
<HclListItemDescription>

A description of what the Lambda function does.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="enable_eni_cleanup" requirement="optional" type="bool">
<HclListItemDescription>

When true, this will force the detachment of the Lambda from the VPC, if <a href="#run_in_vpc"><code>run_in_vpc</code></a> is set, and the automatic cleanup of the ENIs created by the Lambda function. This will prevent issues with the security group when running `terraform destroy`. Warning: requires the `aws` cli tool to be installed.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="enable_versioning" requirement="optional" type="bool">
<HclListItemDescription>

Set to true to enable versioning for this Lambda function. This allows you to use aliases to refer to execute different versions of the function in different environments. Note that an alternative way to run Lambda functions in multiple environments is to version your Terraform code.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="entry_point" requirement="optional" type="list(string)">
<HclListItemDescription>

The ENTRYPOINT for the docker image. Only used if you specify a Docker image via image_uri.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="environment_variables" requirement="optional" type="map(string)">
<HclListItemDescription>

A map of environment variables to pass to the Lambda function. AWS will automatically encrypt these with KMS and decrypt them when running the function.

</HclListItemDescription>
<HclListItemDefaultValue>

```hcl
{
  EnvVarPlaceHolder = "Placeholder"
}
```

</HclListItemDefaultValue>
<HclGeneralListItem title="More Details">
<details>


```hcl

   Lambda does not permit you to pass it an empty map of environment variables, so our default value has to contain
   this totally useless placeholder.

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="ephemeral_storage" requirement="optional" type="number">
<HclListItemDescription>

The amount of Ephemeral storage(/tmp) to allocate for the Lambda Function in MB. This parameter is used to expand the total amount of Ephemeral storage available, beyond the default amount of 512MB.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="existing_role_arn" requirement="optional" type="string">
<HclListItemDescription>

The ARN of existing IAM role that will be used for the Lambda function. If set, the module will not create any IAM entities and fully relies on caller to provide correct IAM role and its policies. Using the variable allows the module to leverage an existing IAM role - for example, when an account has centralized set of IAM entities, or when deploying same function across multiple AWS region to avoid the module attempting to create duplicate IAM entities.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="file_system_access_point_arn" requirement="optional" type="string">
<HclListItemDescription>

The ARN of an EFS access point to use to access the file system. Only used if <a href="#mount_to_file_system"><code>mount_to_file_system</code></a> is true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="file_system_mount_path" requirement="optional" type="string">
<HclListItemDescription>

The mount path where the lambda can access the file system. This path must begin with /mnt/. Only used if <a href="#mount_to_file_system"><code>mount_to_file_system</code></a> is true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="handler" requirement="optional" type="string">
<HclListItemDescription>

The function entrypoint in your code. This is typically the name of a function or method in your code that AWS will execute when this Lambda function is triggered.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="iam_role_name" requirement="optional" type="string">
<HclListItemDescription>

The name to use for the IAM role created for the lambda function. If null, default to the function name (<a href="#name"><code>name</code></a>). Only used if <a href="#existing_role_arn"><code>existing_role_arn</code></a> is null.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="iam_role_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

A map of tags to apply to the IAM role created for the lambda function. This will be merged with the <a href="#tags"><code>tags</code></a> parameter. Only used if <a href="#existing_role_arn"><code>existing_role_arn</code></a> is null.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="ignore_image_uri_changes" requirement="optional" type="bool">
<HclListItemDescription>

When true, this will ignore changes to image_uri for container based Lambdas. This will allow the image tag to be managed and deployed outside of Terraform using your favorite CICD deployment tool without configuration drift.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="image_uri" requirement="optional" type="string">
<HclListItemDescription>

The ECR image URI containing the function's deployment package. Example: 01234501234501.dkr.ecr.us-east-1.amazonaws.com/image_name:image_tag

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="kms_key_arn" requirement="optional" type="string">
<HclListItemDescription>

A custom KMS key to use to encrypt and decrypt Lambda function environment variables. Leave it blank to use the default KMS key provided in your AWS account.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="lambda_role_permissions_boundary_arn" requirement="optional" type="string">
<HclListItemDescription>

The ARN of the policy that is used to set the permissions boundary for the IAM role for the lambda

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="layers" requirement="optional" type="list(string)">
<HclListItemDescription>

The list of Lambda Layer Version ARNs to attach to your Lambda Function. You can have a maximum of 5 Layers attached to each function.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="logging_config" requirement="optional" type="object(…)">
<HclListItemDescription>

Advanced logging settings. Format can either be the default Text option or JSON. JSON allows for different log levels to be selected, not setting those attributes will use the AWS defaults. The log group destination name can also be overridden. More information available at: https://docs.aws.amazon.com/lambda/latest/dg/monitoring-cloudwatchlogs-advanced.html

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
object({
    log_format            = optional(string, "Text")
    application_log_level = optional(string)
    system_log_level      = optional(string)
    log_group             = optional(string)
  })
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="managed_policy_waiting_time" requirement="optional" type="string">
<HclListItemDescription>

Time to wait after creating managed policy, to avoid AWS eventual consistency racing. Default: 60s.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;60s&quot;"/>
</HclListItem>

<HclListItem name="mount_to_file_system" requirement="optional" type="bool">
<HclListItemDescription>

Set to true to mount your Lambda function on an EFS. Note that the lambda must also be deployed inside a VPC (run_in_vpc must be set to true) for this config to have any effect.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="reserved_concurrent_executions" requirement="optional" type="number">
<HclListItemDescription>

The amount of reserved concurrent executions for this lambda function or -1 if unreserved.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="run_in_vpc" requirement="optional" type="bool">
<HclListItemDescription>

Set to true to give your Lambda function access to resources within a VPC.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="runtime" requirement="optional" type="string">
<HclListItemDescription>

The runtime environment for the Lambda function (e.g. nodejs, python3.9, java8). See https://docs.aws.amazon.com/lambda/latest/dg/API_CreateFunction.html#SSS-CreateFunction-request-Runtime for all possible values.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="s3_bucket" requirement="optional" type="string">
<HclListItemDescription>

An S3 bucket location containing the function's deployment package. Exactly one of <a href="#source_path"><code>source_path</code></a> or the <a href="#s3_xxx"><code>s3_xxx</code></a> variables must be specified.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="s3_key" requirement="optional" type="string">
<HclListItemDescription>

The path within <a href="#s3_bucket"><code>s3_bucket</code></a> where the deployment package is located. Exactly one of <a href="#source_path"><code>source_path</code></a> or the <a href="#s3_xxx"><code>s3_xxx</code></a> variables must be specified.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="s3_object_version" requirement="optional" type="string">
<HclListItemDescription>

The version of the path in <a href="#s3_key"><code>s3_key</code></a> to use as the deployment package. Exactly one of <a href="#source_path"><code>source_path</code></a> or the <a href="#s3_xxx"><code>s3_xxx</code></a> variables must be specified.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="security_group_description" requirement="optional" type="string">
<HclListItemDescription>

A description of what the security group is used for.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="set_source_code_hash" requirement="optional" type="bool">
<HclListItemDescription>

If set to false, this function will no longer set the source_code_hash parameter, so this module will no longer detect and upload changes to the deployment package. This is primarily useful if you update the Lambda function from outside of this module (e.g., you have scripts that do it separately) and want to avoid a plan diff. Used only if <a href="#source_path"><code>source_path</code></a> is non-empty.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="should_create_cloudwatch_log_group" requirement="optional" type="bool">
<HclListItemDescription>

When true, precreate the CloudWatch Log Group to use for log aggregation from the lambda function execution. This is useful if you wish to customize the CloudWatch Log Group with various settings such as retention periods and KMS encryption. When false, AWS Lambda will automatically create a basic log group to use.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="should_create_outbound_rule" requirement="optional" type="bool">
<HclListItemDescription>

If true, create an egress rule allowing all outbound traffic from Lambda function to the entire Internet (e.g. 0.0.0.0/0).

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="skip_zip" requirement="optional" type="bool">
<HclListItemDescription>

Set to true to skip zip archive creation and assume that <a href="#source_path"><code>source_path</code></a> points to a pregenerated zip archive.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="source_path" requirement="optional" type="string">
<HclListItemDescription>

The path to the directory that contains your Lambda function source code. This code will be zipped up and uploaded to Lambda as your deployment package. If <a href="#skip_zip"><code>skip_zip</code></a> is set to true, then this is assumed to be the path to an already-zipped file, and it will be uploaded directly to Lambda as a deployment package. Exactly one of <a href="#source_path"><code>source_path</code></a> or the <a href="#s3_xxx"><code>s3_xxx</code></a> variables must be specified.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="subnet_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of subnet IDs the Lambda function should be able to access within your VPC. Only used if <a href="#run_in_vpc"><code>run_in_vpc</code></a> is true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="tags" requirement="optional" type="map(string)">
<HclListItemDescription>

A map of tags to apply to the Lambda function and all resources created in this module.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="tracing_config_mode" requirement="optional" type="string">
<HclListItemDescription>

Whether to sample and trace a subset of incoming requests with AWS X-Ray. Valid values are `PassThrough` and `Active`. More information available at: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lambda_function#tracing_config.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="use_managed_iam_policies" requirement="optional" type="bool">
<HclListItemDescription>

When true, all IAM policies will be managed as dedicated policies rather than inline policies attached to the IAM roles. Dedicated managed policies are friendlier to automated policy checkers, which may scan a single resource for findings. As such, it is important to avoid inline policies when targeting compliance with various security standards.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="vpc_id" requirement="optional" type="string">
<HclListItemDescription>

The ID of the VPC the Lambda function should be able to access. Only used if <a href="#run_in_vpc"><code>run_in_vpc</code></a> is true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="working_directory" requirement="optional" type="string">
<HclListItemDescription>

The working directory for the docker image. Only used if you specify a Docker image via image_uri.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="zip_exclude_files" requirement="optional" type="list(string)">
<HclListItemDescription>

Files in <a href="#source_path"><code>source_path</code></a> to ignore when zipping the directory in addition to .terragrunt-source-manifest.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="zip_output_path" requirement="optional" type="string">
<HclListItemDescription>

The path to store the output zip file of your source code. If empty, defaults to module path. This should be the full path to the zip file, not a directory.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="cloudwatch_log_group_name">
<HclListItemDescription>

Name of the (optionally) created CloudWatch log group for the lambda function.

</HclListItemDescription>
</HclListItem>

<HclListItem name="function_arn">
</HclListItem>

<HclListItem name="function_name">
</HclListItem>

<HclListItem name="iam_role_arn">
</HclListItem>

<HclListItem name="iam_role_id">
</HclListItem>

<HclListItem name="invoke_arn">
</HclListItem>

<HclListItem name="qualified_arn">
</HclListItem>

<HclListItem name="security_group_id">
</HclListItem>

<HclListItem name="version">
</HclListItem>

</TabItem>
</Tabs>

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-lambda/tree/v1.0.2/modules/lambda/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-lambda/tree/v1.0.2/modules/lambda/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-lambda/tree/v1.0.2/modules/lambda/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "f8da13327af1706792c0ab4846ee826a"
}
##DOCS-SOURCER-END -->

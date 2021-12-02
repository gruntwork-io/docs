import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Lambda

Deploy a Lambda on AWS.

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/modules/services/lambda" class="link-button">View on GitHub</a>

<Tabs>
  <TabItem value="inputs" label="Inputs" default>
    <table>
        <thead>
            <tr>
                <td>Variable name</td>
                <td>Description</td>
            </tr>
        </thead>
        <tbody>
            <tr>
        <td>alarm_sns_topic_arns</td>
        <td>A list of SNS topic ARNs to notify when the lambda alarms change to ALARM, OK, or INSUFFICIENT_DATA state</td>
    </tr><tr>
        <td>assume_role_policy</td>
        <td>A custom assume role policy for the IAM role for this Lambda function. If not set, the default is a policy that allows the Lambda service to assume the IAM role, which is what most users will need. However, you can use this variable to override the policy for special cases, such as using a Lambda function to rotate AWS Secrets Manager secrets.</td>
    </tr><tr>
        <td>command</td>
        <td>The CMD for the docker image. Only used if you specify a Docker image via image_uri.</td>
    </tr><tr>
        <td>comparison_operator</td>
        <td>The arithmetic operation to use when comparing the specified Statistic and Threshold. The specified Statistic value is used as the first operand. Either of the following is supported: `GreaterThanOrEqualToThreshold`, `GreaterThanThreshold`, `LessThanThreshold`, `LessThanOrEqualToThreshold`. Additionally, the values `LessThanLowerOrGreaterThanUpperThreshold`, `LessThanLowerThreshold`, and `GreaterThanUpperThreshold` are used only for alarms based on anomaly detection models.</td>
    </tr><tr>
        <td>create_resources</td>
        <td>Set to false to have this module skip creating resources. This weird parameter exists solely because Terraform does not support conditional modules. Therefore, this is a hack to allow you to conditionally decide if this module should create anything or not.</td>
    </tr><tr>
        <td>datapoints_to_alarm</td>
        <td>The number of datapoints that must be breaching to trigger the alarm.</td>
    </tr><tr>
        <td>dead_letter_target_arn</td>
        <td>The ARN of an SNS topic or an SQS queue to notify when invocation of a Lambda function fails. If this option is used, you must grant this function's IAM role (the ID is outputted as iam_role_id) access to write to the target object, which means allowing either the sns:Publish or sqs:SendMessage action on this ARN, depending on which service is targeted.</td>
    </tr><tr>
        <td>description</td>
        <td>A description of what the Lambda function does.</td>
    </tr><tr>
        <td>enable_versioning</td>
        <td>Set to true to enable versioning for this Lambda function. This allows you to use aliases to refer to execute different versions of the function in different environments. Note that an alternative way to run Lambda functions in multiple environments is to version your Terraform code.</td>
    </tr><tr>
        <td>entry_point</td>
        <td>The ENTRYPOINT for the docker image. Only used if you specify a Docker image via image_uri.</td>
    </tr><tr>
        <td>environment_variables</td>
        <td>A map of environment variables to pass to the Lambda function. AWS will automatically encrypt these with KMS and decrypt them when running the function.</td>
    </tr><tr>
        <td>evaluation_periods</td>
        <td>The number of periods over which data is compared to the specified threshold.</td>
    </tr><tr>
        <td>file_system_access_point_arn</td>
        <td>The ARN of an EFS access point to use to access the file system. Only used if var.mount_to_file_system is true.</td>
    </tr><tr>
        <td>file_system_mount_path</td>
        <td>The mount path where the lambda can access the file system. This path must begin with /mnt/. Only used if var.mount_to_file_system is true.</td>
    </tr><tr>
        <td>handler</td>
        <td>The function entrypoint in your code. This is typically the name of a function or method in your code that AWS will execute when this Lambda function is triggered.</td>
    </tr><tr>
        <td>image_uri</td>
        <td>The ECR image URI containing the function's deployment package. Example: 01234501234501.dkr.ecr.us-east-1.amazonaws.com/image_name:image_tag</td>
    </tr><tr>
        <td>kms_key_arn</td>
        <td>A custom KMS key to use to encrypt and decrypt Lambda function environment variables. Leave it blank to use the default KMS key provided in your AWS account.</td>
    </tr><tr>
        <td>lambda_role_permissions_boundary_arn</td>
        <td>The ARN of the policy that is used to set the permissions boundary for the IAM role for the lambda</td>
    </tr><tr>
        <td>layers</td>
        <td>The list of Lambda Layer Version ARNs to attach to your Lambda Function. You can have a maximum of 5 Layers attached to each function.</td>
    </tr><tr>
        <td>memory_size</td>
        <td>The maximum amount of memory, in MB, your Lambda function will be able to use at runtime. Can be set in 64MB increments from 128MB up to 1536MB. Note that the amount of CPU power given to a Lambda function is proportional to the amount of memory you request, so a Lambda function with 256MB of memory has twice as much CPU power as one with 128MB.</td>
    </tr><tr>
        <td>metric_name</td>
        <td>The name for the alarm's associated metric.</td>
    </tr><tr>
        <td>mount_to_file_system</td>
        <td>Set to true to mount your Lambda function on an EFS. Note that the lambda must also be deployed inside a VPC (run_in_vpc must be set to true) for this config to have any effect.</td>
    </tr><tr>
        <td>name</td>
        <td>The name of the Lambda function. Used to namespace all resources created by this module.</td>
    </tr><tr>
        <td>namespace</td>
        <td>The namespace to use for all resources created by this module. If not set, var.lambda_function_name, with '-scheduled' as a suffix, is used.</td>
    </tr><tr>
        <td>period</td>
        <td>The period in seconds over which the specified `statistic` is applied.</td>
    </tr><tr>
        <td>reserved_concurrent_executions</td>
        <td>The amount of reserved concurrent executions for this lambda function or -1 if unreserved.</td>
    </tr><tr>
        <td>run_in_vpc</td>
        <td>Set to true to give your Lambda function access to resources within a VPC.</td>
    </tr><tr>
        <td>runtime</td>
        <td>The runtime environment for the Lambda function (e.g. nodejs, python2.7, java8). See https://docs.aws.amazon.com/lambda/latest/dg/API_CreateFunction.html#SSS-CreateFunction-request-Runtime for all possible values.</td>
    </tr><tr>
        <td>s3_bucket</td>
        <td>An S3 bucket location containing the function's deployment package. Exactly one of var.source_path or the var.s3_xxx variables must be specified.</td>
    </tr><tr>
        <td>s3_key</td>
        <td>The path within var.s3_bucket where the deployment package is located. Exactly one of var.source_path or the var.s3_xxx variables must be specified.</td>
    </tr><tr>
        <td>s3_object_version</td>
        <td>The version of the path in var.s3_key to use as the deployment package. Exactly one of var.source_path or the var.s3_xxx variables must be specified.</td>
    </tr><tr>
        <td>schedule_expression</td>
        <td>An expression that defines the schedule for this lambda job. For example, cron(0 20 * * ? *) or rate(5 minutes). For more information visit https://docs.aws.amazon.com/lambda/latest/dg/services-cloudwatchevents-expressions.html</td>
    </tr><tr>
        <td>should_create_outbound_rule</td>
        <td>If true, create an egress rule allowing all outbound traffic from Lambda function to the entire Internet (e.g. 0.0.0.0/0).</td>
    </tr><tr>
        <td>skip_zip</td>
        <td>Set to true to skip zip archive creation and assume that var.source_path points to a pregenerated zip archive.</td>
    </tr><tr>
        <td>source_path</td>
        <td>The path to the directory that contains your Lambda function source code. This code will be zipped up and uploaded to Lambda as your deployment package. If var.skip_zip is set to true, then this is assumed to be the path to an already-zipped file, and it will be uploaded directly to Lambda as a deployment package. Exactly one of var.source_path or the var.s3_xxx variables must be specified.</td>
    </tr><tr>
        <td>statistic</td>
        <td>The statistic to apply to the alarm's associated metric.</td>
    </tr><tr>
        <td>subnet_ids</td>
        <td>A list of subnet IDs the Lambda function should be able to access within your VPC. Only used if var.run_in_vpc is true.</td>
    </tr><tr>
        <td>tags</td>
        <td>A map of tags to apply to the Lambda function.</td>
    </tr><tr>
        <td>threshold</td>
        <td>The value against which the specified statistic is compared. This parameter is required for alarms based on static thresholds, but should not be used for alarms based on anomaly detection models.</td>
    </tr><tr>
        <td>timeout</td>
        <td>The maximum amount of time, in seconds, your Lambda function will be allowed to run. Must be between 1 and 900 seconds.</td>
    </tr><tr>
        <td>vpc_id</td>
        <td>The ID of the VPC the Lambda function should be able to access. Only used if var.run_in_vpc is true.</td>
    </tr><tr>
        <td>working_directory</td>
        <td>The working directory for the docker image. Only used if you specify a Docker image via image_uri.</td>
    </tr><tr>
        <td>zip_output_path</td>
        <td>The path to store the output zip file of your source code. If empty, defaults to module path. This should be the full path to the zip file, not a directory.</td>
    </tr>
        </tbody>
    </table>
  </TabItem>
  <TabItem value="outputs" label="Outputs">
    <table>
        <thead>
            <tr>
                <td>Variable name</td>
                <td>Description</td>
            </tr>
        </thead>
        <tbody>
            <tr>
        <td>alarm_actions</td>
        <td>The list of actions to execute when this alarm transitions into an ALARM state from any other state</td>
    </tr><tr>
        <td>alarm_arn</td>
        <td>ARN of the Cloudwatch alarm</td>
    </tr><tr>
        <td>alarm_name</td>
        <td>Name of the Cloudwatch alarm</td>
    </tr><tr>
        <td>event_rule_arn</td>
        <td>Cloudwatch Event Rule Arn</td>
    </tr><tr>
        <td>event_rule_schedule</td>
        <td>Cloudwatch Event Rule schedule expression</td>
    </tr><tr>
        <td>function_arn</td>
        <td>Amazon Resource Name (ARN) identifying the Lambda Function</td>
    </tr><tr>
        <td>function_name</td>
        <td>Unique name for Lambda Function</td>
    </tr><tr>
        <td>iam_role_arn</td>
        <td>Amazon Resource Name (ARN) of the AWS IAM Role created for the Lambda Function</td>
    </tr><tr>
        <td>iam_role_id</td>
        <td>Name of the AWS IAM Role created for the Lambda Function</td>
    </tr><tr>
        <td>insufficient_data_actions</td>
        <td>The list of actions to execute when this alarm transitions into an INSUFFICIENT_DATA state from any other state</td>
    </tr><tr>
        <td>invoke_arn</td>
        <td>Amazon Resource Name (ARN) to be used for invoking the Lambda Function</td>
    </tr><tr>
        <td>ok_actions</td>
        <td>The list of actions to execute when this alarm transitions into an OK state from any other state</td>
    </tr><tr>
        <td>qualified_arn</td>
        <td>Amazon Resource Name (ARN) identifying your Lambda Function version</td>
    </tr><tr>
        <td>security_group_id</td>
        <td>Security Group ID of the Security Group created for the Lambda Function</td>
    </tr><tr>
        <td>version</td>
        <td>Latest published version of your Lambda Function</td>
    </tr>
        </tbody>
    </table>
  </TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Service Catalog Reference","hash":"151346aebd73eec3e288cff140a6d351"}
##DOCS-SOURCER-END -->

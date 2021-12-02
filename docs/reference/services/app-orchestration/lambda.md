import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Lambda

Deploy a Lambda on AWS.

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/modules/services/lambda" className="link-button">View on GitHub</a>

### Reference 

<Tabs>
  <TabItem value="inputs" label="Inputs" default>
    <table>
        <thead>
            <tr>
                <td><b>Variable name</b></td>
                <td><b>Description</b></td>
            </tr>
        </thead>
        <tbody>
            <tr>
        <td><a name="alarm_sns_topic_arns" href="#alarm_sns_topic_arns" className="snap-top"><code>alarm_sns_topic_arns</code></a></td>
        <td>A list of SNS topic ARNs to notify when the lambda alarms change to ALARM, OK, or INSUFFICIENT_DATA state</td>
    </tr><tr>
        <td><a name="assume_role_policy" href="#assume_role_policy" className="snap-top"><code>assume_role_policy</code></a></td>
        <td>A custom assume role policy for the IAM role for this Lambda function. If not set, the default is a policy that allows the Lambda service to assume the IAM role, which is what most users will need. However, you can use this variable to override the policy for special cases, such as using a Lambda function to rotate AWS Secrets Manager secrets.</td>
    </tr><tr>
        <td><a name="command" href="#command" className="snap-top"><code>command</code></a></td>
        <td>The CMD for the docker image. Only used if you specify a Docker image via image_uri.</td>
    </tr><tr>
        <td><a name="comparison_operator" href="#comparison_operator" className="snap-top"><code>comparison_operator</code></a></td>
        <td>The arithmetic operation to use when comparing the specified Statistic and Threshold. The specified Statistic value is used as the first operand. Either of the following is supported: `GreaterThanOrEqualToThreshold`, `GreaterThanThreshold`, `LessThanThreshold`, `LessThanOrEqualToThreshold`. Additionally, the values `LessThanLowerOrGreaterThanUpperThreshold`, `LessThanLowerThreshold`, and `GreaterThanUpperThreshold` are used only for alarms based on anomaly detection models.</td>
    </tr><tr>
        <td><a name="create_resources" href="#create_resources" className="snap-top"><code>create_resources</code></a></td>
        <td>Set to false to have this module skip creating resources. This weird parameter exists solely because Terraform does not support conditional modules. Therefore, this is a hack to allow you to conditionally decide if this module should create anything or not.</td>
    </tr><tr>
        <td><a name="datapoints_to_alarm" href="#datapoints_to_alarm" className="snap-top"><code>datapoints_to_alarm</code></a></td>
        <td>The number of datapoints that must be breaching to trigger the alarm.</td>
    </tr><tr>
        <td><a name="dead_letter_target_arn" href="#dead_letter_target_arn" className="snap-top"><code>dead_letter_target_arn</code></a></td>
        <td>The ARN of an SNS topic or an SQS queue to notify when invocation of a Lambda function fails. If this option is used, you must grant this function's IAM role (the ID is outputted as iam_role_id) access to write to the target object, which means allowing either the sns:Publish or sqs:SendMessage action on this ARN, depending on which service is targeted.</td>
    </tr><tr>
        <td><a name="description" href="#description" className="snap-top"><code>description</code></a></td>
        <td>A description of what the Lambda function does.</td>
    </tr><tr>
        <td><a name="enable_versioning" href="#enable_versioning" className="snap-top"><code>enable_versioning</code></a></td>
        <td>Set to true to enable versioning for this Lambda function. This allows you to use aliases to refer to execute different versions of the function in different environments. Note that an alternative way to run Lambda functions in multiple environments is to version your Terraform code.</td>
    </tr><tr>
        <td><a name="entry_point" href="#entry_point" className="snap-top"><code>entry_point</code></a></td>
        <td>The ENTRYPOINT for the docker image. Only used if you specify a Docker image via image_uri.</td>
    </tr><tr>
        <td><a name="environment_variables" href="#environment_variables" className="snap-top"><code>environment_variables</code></a></td>
        <td>A map of environment variables to pass to the Lambda function. AWS will automatically encrypt these with KMS and decrypt them when running the function.</td>
    </tr><tr>
        <td><a name="evaluation_periods" href="#evaluation_periods" className="snap-top"><code>evaluation_periods</code></a></td>
        <td>The number of periods over which data is compared to the specified threshold.</td>
    </tr><tr>
        <td><a name="file_system_access_point_arn" href="#file_system_access_point_arn" className="snap-top"><code>file_system_access_point_arn</code></a></td>
        <td>The ARN of an EFS access point to use to access the file system. Only used if var.mount_to_file_system is true.</td>
    </tr><tr>
        <td><a name="file_system_mount_path" href="#file_system_mount_path" className="snap-top"><code>file_system_mount_path</code></a></td>
        <td>The mount path where the lambda can access the file system. This path must begin with /mnt/. Only used if var.mount_to_file_system is true.</td>
    </tr><tr>
        <td><a name="handler" href="#handler" className="snap-top"><code>handler</code></a></td>
        <td>The function entrypoint in your code. This is typically the name of a function or method in your code that AWS will execute when this Lambda function is triggered.</td>
    </tr><tr>
        <td><a name="image_uri" href="#image_uri" className="snap-top"><code>image_uri</code></a></td>
        <td>The ECR image URI containing the function's deployment package. Example: 01234501234501.dkr.ecr.us-east-1.amazonaws.com/image_name:image_tag</td>
    </tr><tr>
        <td><a name="kms_key_arn" href="#kms_key_arn" className="snap-top"><code>kms_key_arn</code></a></td>
        <td>A custom KMS key to use to encrypt and decrypt Lambda function environment variables. Leave it blank to use the default KMS key provided in your AWS account.</td>
    </tr><tr>
        <td><a name="lambda_role_permissions_boundary_arn" href="#lambda_role_permissions_boundary_arn" className="snap-top"><code>lambda_role_permissions_boundary_arn</code></a></td>
        <td>The ARN of the policy that is used to set the permissions boundary for the IAM role for the lambda</td>
    </tr><tr>
        <td><a name="layers" href="#layers" className="snap-top"><code>layers</code></a></td>
        <td>The list of Lambda Layer Version ARNs to attach to your Lambda Function. You can have a maximum of 5 Layers attached to each function.</td>
    </tr><tr>
        <td><a name="memory_size" href="#memory_size" className="snap-top"><code>memory_size</code></a></td>
        <td>The maximum amount of memory, in MB, your Lambda function will be able to use at runtime. Can be set in 64MB increments from 128MB up to 1536MB. Note that the amount of CPU power given to a Lambda function is proportional to the amount of memory you request, so a Lambda function with 256MB of memory has twice as much CPU power as one with 128MB.</td>
    </tr><tr>
        <td><a name="metric_name" href="#metric_name" className="snap-top"><code>metric_name</code></a></td>
        <td>The name for the alarm's associated metric.</td>
    </tr><tr>
        <td><a name="mount_to_file_system" href="#mount_to_file_system" className="snap-top"><code>mount_to_file_system</code></a></td>
        <td>Set to true to mount your Lambda function on an EFS. Note that the lambda must also be deployed inside a VPC (run_in_vpc must be set to true) for this config to have any effect.</td>
    </tr><tr>
        <td><a name="name" href="#name" className="snap-top"><code>name</code></a></td>
        <td>The name of the Lambda function. Used to namespace all resources created by this module.</td>
    </tr><tr>
        <td><a name="namespace" href="#namespace" className="snap-top"><code>namespace</code></a></td>
        <td>The namespace to use for all resources created by this module. If not set, var.lambda_function_name, with '-scheduled' as a suffix, is used.</td>
    </tr><tr>
        <td><a name="period" href="#period" className="snap-top"><code>period</code></a></td>
        <td>The period in seconds over which the specified `statistic` is applied.</td>
    </tr><tr>
        <td><a name="reserved_concurrent_executions" href="#reserved_concurrent_executions" className="snap-top"><code>reserved_concurrent_executions</code></a></td>
        <td>The amount of reserved concurrent executions for this lambda function or -1 if unreserved.</td>
    </tr><tr>
        <td><a name="run_in_vpc" href="#run_in_vpc" className="snap-top"><code>run_in_vpc</code></a></td>
        <td>Set to true to give your Lambda function access to resources within a VPC.</td>
    </tr><tr>
        <td><a name="runtime" href="#runtime" className="snap-top"><code>runtime</code></a></td>
        <td>The runtime environment for the Lambda function (e.g. nodejs, python2.7, java8). See https://docs.aws.amazon.com/lambda/latest/dg/API_CreateFunction.html#SSS-CreateFunction-request-Runtime for all possible values.</td>
    </tr><tr>
        <td><a name="s3_bucket" href="#s3_bucket" className="snap-top"><code>s3_bucket</code></a></td>
        <td>An S3 bucket location containing the function's deployment package. Exactly one of var.source_path or the var.s3_xxx variables must be specified.</td>
    </tr><tr>
        <td><a name="s3_key" href="#s3_key" className="snap-top"><code>s3_key</code></a></td>
        <td>The path within var.s3_bucket where the deployment package is located. Exactly one of var.source_path or the var.s3_xxx variables must be specified.</td>
    </tr><tr>
        <td><a name="s3_object_version" href="#s3_object_version" className="snap-top"><code>s3_object_version</code></a></td>
        <td>The version of the path in var.s3_key to use as the deployment package. Exactly one of var.source_path or the var.s3_xxx variables must be specified.</td>
    </tr><tr>
        <td><a name="schedule_expression" href="#schedule_expression" className="snap-top"><code>schedule_expression</code></a></td>
        <td>An expression that defines the schedule for this lambda job. For example, cron(0 20 * * ? *) or rate(5 minutes). For more information visit https://docs.aws.amazon.com/lambda/latest/dg/services-cloudwatchevents-expressions.html</td>
    </tr><tr>
        <td><a name="should_create_outbound_rule" href="#should_create_outbound_rule" className="snap-top"><code>should_create_outbound_rule</code></a></td>
        <td>If true, create an egress rule allowing all outbound traffic from Lambda function to the entire Internet (e.g. 0.0.0.0/0).</td>
    </tr><tr>
        <td><a name="skip_zip" href="#skip_zip" className="snap-top"><code>skip_zip</code></a></td>
        <td>Set to true to skip zip archive creation and assume that var.source_path points to a pregenerated zip archive.</td>
    </tr><tr>
        <td><a name="source_path" href="#source_path" className="snap-top"><code>source_path</code></a></td>
        <td>The path to the directory that contains your Lambda function source code. This code will be zipped up and uploaded to Lambda as your deployment package. If var.skip_zip is set to true, then this is assumed to be the path to an already-zipped file, and it will be uploaded directly to Lambda as a deployment package. Exactly one of var.source_path or the var.s3_xxx variables must be specified.</td>
    </tr><tr>
        <td><a name="statistic" href="#statistic" className="snap-top"><code>statistic</code></a></td>
        <td>The statistic to apply to the alarm's associated metric.</td>
    </tr><tr>
        <td><a name="subnet_ids" href="#subnet_ids" className="snap-top"><code>subnet_ids</code></a></td>
        <td>A list of subnet IDs the Lambda function should be able to access within your VPC. Only used if var.run_in_vpc is true.</td>
    </tr><tr>
        <td><a name="tags" href="#tags" className="snap-top"><code>tags</code></a></td>
        <td>A map of tags to apply to the Lambda function.</td>
    </tr><tr>
        <td><a name="threshold" href="#threshold" className="snap-top"><code>threshold</code></a></td>
        <td>The value against which the specified statistic is compared. This parameter is required for alarms based on static thresholds, but should not be used for alarms based on anomaly detection models.</td>
    </tr><tr>
        <td><a name="timeout" href="#timeout" className="snap-top"><code>timeout</code></a></td>
        <td>The maximum amount of time, in seconds, your Lambda function will be allowed to run. Must be between 1 and 900 seconds.</td>
    </tr><tr>
        <td><a name="vpc_id" href="#vpc_id" className="snap-top"><code>vpc_id</code></a></td>
        <td>The ID of the VPC the Lambda function should be able to access. Only used if var.run_in_vpc is true.</td>
    </tr><tr>
        <td><a name="working_directory" href="#working_directory" className="snap-top"><code>working_directory</code></a></td>
        <td>The working directory for the docker image. Only used if you specify a Docker image via image_uri.</td>
    </tr><tr>
        <td><a name="zip_output_path" href="#zip_output_path" className="snap-top"><code>zip_output_path</code></a></td>
        <td>The path to store the output zip file of your source code. If empty, defaults to module path. This should be the full path to the zip file, not a directory.</td>
    </tr>
        </tbody>
    </table>
  </TabItem>
  <TabItem value="outputs" label="Outputs">
    <table>
        <thead>
            <tr>
              <td><b>Variable name</b></td>
              <td><b>Description</b></td>
            </tr>
        </thead>
        <tbody>
            <tr>
        <td><a name="alarm_actions" href="#alarm_actions" className="snap-top"><code>alarm_actions</code></a></td>
        <td>The list of actions to execute when this alarm transitions into an ALARM state from any other state</td>
    </tr><tr>
        <td><a name="alarm_arn" href="#alarm_arn" className="snap-top"><code>alarm_arn</code></a></td>
        <td>ARN of the Cloudwatch alarm</td>
    </tr><tr>
        <td><a name="alarm_name" href="#alarm_name" className="snap-top"><code>alarm_name</code></a></td>
        <td>Name of the Cloudwatch alarm</td>
    </tr><tr>
        <td><a name="event_rule_arn" href="#event_rule_arn" className="snap-top"><code>event_rule_arn</code></a></td>
        <td>Cloudwatch Event Rule Arn</td>
    </tr><tr>
        <td><a name="event_rule_schedule" href="#event_rule_schedule" className="snap-top"><code>event_rule_schedule</code></a></td>
        <td>Cloudwatch Event Rule schedule expression</td>
    </tr><tr>
        <td><a name="function_arn" href="#function_arn" className="snap-top"><code>function_arn</code></a></td>
        <td>Amazon Resource Name (ARN) identifying the Lambda Function</td>
    </tr><tr>
        <td><a name="function_name" href="#function_name" className="snap-top"><code>function_name</code></a></td>
        <td>Unique name for Lambda Function</td>
    </tr><tr>
        <td><a name="iam_role_arn" href="#iam_role_arn" className="snap-top"><code>iam_role_arn</code></a></td>
        <td>Amazon Resource Name (ARN) of the AWS IAM Role created for the Lambda Function</td>
    </tr><tr>
        <td><a name="iam_role_id" href="#iam_role_id" className="snap-top"><code>iam_role_id</code></a></td>
        <td>Name of the AWS IAM Role created for the Lambda Function</td>
    </tr><tr>
        <td><a name="insufficient_data_actions" href="#insufficient_data_actions" className="snap-top"><code>insufficient_data_actions</code></a></td>
        <td>The list of actions to execute when this alarm transitions into an INSUFFICIENT_DATA state from any other state</td>
    </tr><tr>
        <td><a name="invoke_arn" href="#invoke_arn" className="snap-top"><code>invoke_arn</code></a></td>
        <td>Amazon Resource Name (ARN) to be used for invoking the Lambda Function</td>
    </tr><tr>
        <td><a name="ok_actions" href="#ok_actions" className="snap-top"><code>ok_actions</code></a></td>
        <td>The list of actions to execute when this alarm transitions into an OK state from any other state</td>
    </tr><tr>
        <td><a name="qualified_arn" href="#qualified_arn" className="snap-top"><code>qualified_arn</code></a></td>
        <td>Amazon Resource Name (ARN) identifying your Lambda Function version</td>
    </tr><tr>
        <td><a name="security_group_id" href="#security_group_id" className="snap-top"><code>security_group_id</code></a></td>
        <td>Security Group ID of the Security Group created for the Lambda Function</td>
    </tr><tr>
        <td><a name="version" href="#version" className="snap-top"><code>version</code></a></td>
        <td>Latest published version of your Lambda Function</td>
    </tr>
        </tbody>
    </table>
  </TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Service Catalog Reference","hash":"ebbb16daa59e4e1e80701420bb78e4ee"}
##DOCS-SOURCER-END -->

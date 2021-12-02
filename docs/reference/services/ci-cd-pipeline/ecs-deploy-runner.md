import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# ECS Deploy Runner

Use a CI/CD pipeline for deploying infrastructure code updates.

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/modules/mgmt/ecs-deploy-runner" class="link-button">View on GitHub</a>

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
        <td>ami_builder_config</td>
        <td>Configuration options for the ami-builder container of the ECS deploy runner stack. This container will be used for building AMIs in the CI/CD pipeline using packer. Set to `null` to disable this container.</td>
    </tr><tr>
        <td>container_cpu</td>
        <td>The default CPU units for the instances that Fargate will spin up. The invoker allows users to override the CPU at run time, but this value will be used if the user provides no value for the CPU. Options here: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/AWS_Fargate.html#fargate-tasks-size.</td>
    </tr><tr>
        <td>container_default_launch_type</td>
        <td>The default launch type of the ECS deploy runner workers. This launch type will be used if it is not overridden during invocation of the lambda function. Must be FARGATE or EC2.</td>
    </tr><tr>
        <td>container_max_cpu</td>
        <td>The maximum CPU units that is allowed to be specified by the user when invoking the deploy runner with the Lambda function.</td>
    </tr><tr>
        <td>container_max_memory</td>
        <td>The maximum memory units that is allowed to be specified by the user when invoking the deploy runner with the Lambda function.</td>
    </tr><tr>
        <td>container_memory</td>
        <td>The default memory units for the instances that Fargate will spin up. The invoker allows users to override the memory at run time, but this value will be used if the user provides no value for memory. Options here: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/AWS_Fargate.html#fargate-tasks-size.</td>
    </tr><tr>
        <td>docker_image_builder_config</td>
        <td>Configuration options for the docker-image-builder container of the ECS deploy runner stack. This container will be used for building docker images in the CI/CD pipeline. Set to `null` to disable this container.</td>
    </tr><tr>
        <td>docker_image_builder_hardcoded_args</td>
        <td>Unlike hardcoded_options, this is used for hardcoded positional args and will always be passed in at the end of the args list.</td>
    </tr><tr>
        <td>docker_image_builder_hardcoded_options</td>
        <td>Which options and args to always pass in alongside the ones provided by the command. This is a map of option keys to args to pass in. Each arg in the list will be passed in as a separate option. This will be passed in first, before the args provided by the user in the event data.</td>
    </tr><tr>
        <td>ec2_worker_pool_configuration</td>
        <td>Worker configuration of a EC2 worker pool for the ECS cluster. An EC2 worker pool supports caching of Docker images, so your builds may run faster, whereas Fargate is serverless, so you have no persistent EC2 instances to manage and pay for. If null, no EC2 worker pool will be allocated and the deploy runner will be in Fargate only mode. Note that when this variable is set, this example module will automatically lookup and use the base ECS optimized AMI that AWS provides.</td>
    </tr><tr>
        <td>iam_groups</td>
        <td>List of AWS IAM groups that should be given access to invoke the deploy runner.</td>
    </tr><tr>
        <td>iam_roles</td>
        <td>List of AWS IAM roles that should be given access to invoke the deploy runner.</td>
    </tr><tr>
        <td>iam_users</td>
        <td>List of AWS IAM usernames that should be given access to invoke the deploy runner.</td>
    </tr><tr>
        <td>kms_grant_opt_in_regions</td>
        <td>Create multi-region resources in the specified regions. The best practice is to enable multi-region services in all enabled regions in your AWS account. This variable must NOT be set to null or empty. Otherwise, we won't know which regions to use and authenticate to, and may use some not enabled in your AWS account (e.g., GovCloud, China, etc). To get the list of regions enabled in your AWS account, you can use the AWS CLI: aws ec2 describe-regions.</td>
    </tr><tr>
        <td>name</td>
        <td>Name of this instance of the deploy runner stack. Used to namespace all resources.</td>
    </tr><tr>
        <td>private_subnet_ids</td>
        <td>List of IDs of private subnets that can be used for running the ECS task and Lambda function.</td>
    </tr><tr>
        <td>shared_secrets_enabled</td>
        <td>If true, this module will create grants for a given shared secrets KMS key. You must pass a value for shared_secrets_kms_cmk_arn if this is set to true. Defaults to false.</td>
    </tr><tr>
        <td>shared_secrets_kms_cmk_arn</td>
        <td>The ARN of the KMS CMK used for sharing AWS Secrets Manager secrets between accounts.</td>
    </tr><tr>
        <td>snapshot_encryption_kms_cmk_arns</td>
        <td>Map of names to ARNs of KMS CMKs that are used to encrypt snapshots (including AMIs). This module will create the necessary KMS key grants to allow the respective deploy containers access to utilize the keys for managing the encrypted snapshots. The keys are arbitrary names that are used to identify the key.</td>
    </tr><tr>
        <td>terraform_applier_config</td>
        <td>Configuration options for the terraform-applier container of the ECS deploy runner stack. This container will be used for running infrastructure deployment actions (including automated variable updates) in the CI/CD pipeline with Terraform / Terragrunt. Set to `null` to disable this container.</td>
    </tr><tr>
        <td>terraform_planner_config</td>
        <td>Configuration options for the terraform-planner container of the ECS deploy runner stack. This container will be used for running infrastructure plan (including validate) actions in the CI/CD pipeline with Terraform / Terragrunt. Set to `null` to disable this container.</td>
    </tr><tr>
        <td>vpc_id</td>
        <td>ID of the VPC where the ECS task and Lambda function should run.</td>
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
        <td>cloudwatch_log_group_name</td>
        <td>Name of the CloudWatch Log Group used to store the log output from the Deploy Runner ECS task.</td>
    </tr><tr>
        <td>default_ecs_task_arn</td>
        <td>AWS ARN of the default ECS Task Definition. Can be used to trigger the ECS Task directly.</td>
    </tr><tr>
        <td>ecs_cluster_arn</td>
        <td>AWS ARN of the ECS Cluster that can be used to run the deploy runner task.</td>
    </tr><tr>
        <td>ecs_task_arns</td>
        <td>Map of AWS ARNs of the ECS Task Definition. There are four entries, one for each container in the standard config (docker-image-builder ; ami-builder ; terraform-planner ; terraform-applier).</td>
    </tr><tr>
        <td>ecs_task_execution_role_arn</td>
        <td>ECS Task execution role ARN</td>
    </tr><tr>
        <td>ecs_task_families</td>
        <td>Map of the families of the ECS Task Definition that is currently live. There are four entries, one for each container in the standard config (docker-image-builder ; ami-builder ; terraform-planner ; terraform-applier).</td>
    </tr><tr>
        <td>ecs_task_iam_roles</td>
        <td>Map of AWS ARNs and names of the IAM role that will be attached to the ECS task to grant it access to AWS resources. Each container will have its own IAM role. There are four entries, one for each container in the standard config (docker-image-builder ; ami-builder ; terraform-planner ; terraform-applier).</td>
    </tr><tr>
        <td>ecs_task_revisions</td>
        <td>Map of the current revision of the ECS Task Definition that is currently live. There are four entries, one for each container in the standard config (docker-image-builder ; ami-builder ; terraform-planner ; terraform-applier).</td>
    </tr><tr>
        <td>invoke_policy_arn</td>
        <td>The ARN of the IAM policy that allows access to the invoke the deploy runner.</td>
    </tr><tr>
        <td>invoker_function_arn</td>
        <td>AWS ARN of the invoker lambda function that can be used to invoke a deployment.</td>
    </tr><tr>
        <td>security_group_allow_all_outbound_id</td>
        <td>Security Group ID of the ECS task</td>
    </tr>
        </tbody>
    </table>
  </TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Service Catalog Reference","hash":"95bc33fff2a657b3e86fe0321b878a5c"}
##DOCS-SOURCER-END -->

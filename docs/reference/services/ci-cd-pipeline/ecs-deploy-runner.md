import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# ECS Deploy Runner

Use a CI/CD pipeline for deploying infrastructure code updates.

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/modules/mgmt/ecs-deploy-runner" className="link-button">View on GitHub</a>

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
        <td><a name="ami_builder_config" href="#ami_builder_config" className="snap-top"><code>ami_builder_config</code></a></td>
        <td>Configuration options for the ami-builder container of the ECS deploy runner stack. This container will be used for building AMIs in the CI/CD pipeline using packer. Set to `null` to disable this container.</td>
    </tr><tr>
        <td><a name="container_cpu" href="#container_cpu" className="snap-top"><code>container_cpu</code></a></td>
        <td>The default CPU units for the instances that Fargate will spin up. The invoker allows users to override the CPU at run time, but this value will be used if the user provides no value for the CPU. Options here: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/AWS_Fargate.html#fargate-tasks-size.</td>
    </tr><tr>
        <td><a name="container_default_launch_type" href="#container_default_launch_type" className="snap-top"><code>container_default_launch_type</code></a></td>
        <td>The default launch type of the ECS deploy runner workers. This launch type will be used if it is not overridden during invocation of the lambda function. Must be FARGATE or EC2.</td>
    </tr><tr>
        <td><a name="container_max_cpu" href="#container_max_cpu" className="snap-top"><code>container_max_cpu</code></a></td>
        <td>The maximum CPU units that is allowed to be specified by the user when invoking the deploy runner with the Lambda function.</td>
    </tr><tr>
        <td><a name="container_max_memory" href="#container_max_memory" className="snap-top"><code>container_max_memory</code></a></td>
        <td>The maximum memory units that is allowed to be specified by the user when invoking the deploy runner with the Lambda function.</td>
    </tr><tr>
        <td><a name="container_memory" href="#container_memory" className="snap-top"><code>container_memory</code></a></td>
        <td>The default memory units for the instances that Fargate will spin up. The invoker allows users to override the memory at run time, but this value will be used if the user provides no value for memory. Options here: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/AWS_Fargate.html#fargate-tasks-size.</td>
    </tr><tr>
        <td><a name="docker_image_builder_config" href="#docker_image_builder_config" className="snap-top"><code>docker_image_builder_config</code></a></td>
        <td>Configuration options for the docker-image-builder container of the ECS deploy runner stack. This container will be used for building docker images in the CI/CD pipeline. Set to `null` to disable this container.</td>
    </tr><tr>
        <td><a name="docker_image_builder_hardcoded_args" href="#docker_image_builder_hardcoded_args" className="snap-top"><code>docker_image_builder_hardcoded_args</code></a></td>
        <td>Unlike hardcoded_options, this is used for hardcoded positional args and will always be passed in at the end of the args list.</td>
    </tr><tr>
        <td><a name="docker_image_builder_hardcoded_options" href="#docker_image_builder_hardcoded_options" className="snap-top"><code>docker_image_builder_hardcoded_options</code></a></td>
        <td>Which options and args to always pass in alongside the ones provided by the command. This is a map of option keys to args to pass in. Each arg in the list will be passed in as a separate option. This will be passed in first, before the args provided by the user in the event data.</td>
    </tr><tr>
        <td><a name="ec2_worker_pool_configuration" href="#ec2_worker_pool_configuration" className="snap-top"><code>ec2_worker_pool_configuration</code></a></td>
        <td>Worker configuration of a EC2 worker pool for the ECS cluster. An EC2 worker pool supports caching of Docker images, so your builds may run faster, whereas Fargate is serverless, so you have no persistent EC2 instances to manage and pay for. If null, no EC2 worker pool will be allocated and the deploy runner will be in Fargate only mode. Note that when this variable is set, this example module will automatically lookup and use the base ECS optimized AMI that AWS provides.</td>
    </tr><tr>
        <td><a name="iam_groups" href="#iam_groups" className="snap-top"><code>iam_groups</code></a></td>
        <td>List of AWS IAM groups that should be given access to invoke the deploy runner.</td>
    </tr><tr>
        <td><a name="iam_roles" href="#iam_roles" className="snap-top"><code>iam_roles</code></a></td>
        <td>List of AWS IAM roles that should be given access to invoke the deploy runner.</td>
    </tr><tr>
        <td><a name="iam_users" href="#iam_users" className="snap-top"><code>iam_users</code></a></td>
        <td>List of AWS IAM usernames that should be given access to invoke the deploy runner.</td>
    </tr><tr>
        <td><a name="kms_grant_opt_in_regions" href="#kms_grant_opt_in_regions" className="snap-top"><code>kms_grant_opt_in_regions</code></a></td>
        <td>Create multi-region resources in the specified regions. The best practice is to enable multi-region services in all enabled regions in your AWS account. This variable must NOT be set to null or empty. Otherwise, we won't know which regions to use and authenticate to, and may use some not enabled in your AWS account (e.g., GovCloud, China, etc). To get the list of regions enabled in your AWS account, you can use the AWS CLI: aws ec2 describe-regions.</td>
    </tr><tr>
        <td><a name="name" href="#name" className="snap-top"><code>name</code></a></td>
        <td>Name of this instance of the deploy runner stack. Used to namespace all resources.</td>
    </tr><tr>
        <td><a name="private_subnet_ids" href="#private_subnet_ids" className="snap-top"><code>private_subnet_ids</code></a></td>
        <td>List of IDs of private subnets that can be used for running the ECS task and Lambda function.</td>
    </tr><tr>
        <td><a name="shared_secrets_enabled" href="#shared_secrets_enabled" className="snap-top"><code>shared_secrets_enabled</code></a></td>
        <td>If true, this module will create grants for a given shared secrets KMS key. You must pass a value for shared_secrets_kms_cmk_arn if this is set to true. Defaults to false.</td>
    </tr><tr>
        <td><a name="shared_secrets_kms_cmk_arn" href="#shared_secrets_kms_cmk_arn" className="snap-top"><code>shared_secrets_kms_cmk_arn</code></a></td>
        <td>The ARN of the KMS CMK used for sharing AWS Secrets Manager secrets between accounts.</td>
    </tr><tr>
        <td><a name="snapshot_encryption_kms_cmk_arns" href="#snapshot_encryption_kms_cmk_arns" className="snap-top"><code>snapshot_encryption_kms_cmk_arns</code></a></td>
        <td>Map of names to ARNs of KMS CMKs that are used to encrypt snapshots (including AMIs). This module will create the necessary KMS key grants to allow the respective deploy containers access to utilize the keys for managing the encrypted snapshots. The keys are arbitrary names that are used to identify the key.</td>
    </tr><tr>
        <td><a name="terraform_applier_config" href="#terraform_applier_config" className="snap-top"><code>terraform_applier_config</code></a></td>
        <td>Configuration options for the terraform-applier container of the ECS deploy runner stack. This container will be used for running infrastructure deployment actions (including automated variable updates) in the CI/CD pipeline with Terraform / Terragrunt. Set to `null` to disable this container.</td>
    </tr><tr>
        <td><a name="terraform_planner_config" href="#terraform_planner_config" className="snap-top"><code>terraform_planner_config</code></a></td>
        <td>Configuration options for the terraform-planner container of the ECS deploy runner stack. This container will be used for running infrastructure plan (including validate) actions in the CI/CD pipeline with Terraform / Terragrunt. Set to `null` to disable this container.</td>
    </tr><tr>
        <td><a name="vpc_id" href="#vpc_id" className="snap-top"><code>vpc_id</code></a></td>
        <td>ID of the VPC where the ECS task and Lambda function should run.</td>
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
        <td><a name="cloudwatch_log_group_name" href="#cloudwatch_log_group_name" className="snap-top"><code>cloudwatch_log_group_name</code></a></td>
        <td>Name of the CloudWatch Log Group used to store the log output from the Deploy Runner ECS task.</td>
    </tr><tr>
        <td><a name="default_ecs_task_arn" href="#default_ecs_task_arn" className="snap-top"><code>default_ecs_task_arn</code></a></td>
        <td>AWS ARN of the default ECS Task Definition. Can be used to trigger the ECS Task directly.</td>
    </tr><tr>
        <td><a name="ecs_cluster_arn" href="#ecs_cluster_arn" className="snap-top"><code>ecs_cluster_arn</code></a></td>
        <td>AWS ARN of the ECS Cluster that can be used to run the deploy runner task.</td>
    </tr><tr>
        <td><a name="ecs_task_arns" href="#ecs_task_arns" className="snap-top"><code>ecs_task_arns</code></a></td>
        <td>Map of AWS ARNs of the ECS Task Definition. There are four entries, one for each container in the standard config (docker-image-builder ; ami-builder ; terraform-planner ; terraform-applier).</td>
    </tr><tr>
        <td><a name="ecs_task_execution_role_arn" href="#ecs_task_execution_role_arn" className="snap-top"><code>ecs_task_execution_role_arn</code></a></td>
        <td>ECS Task execution role ARN</td>
    </tr><tr>
        <td><a name="ecs_task_families" href="#ecs_task_families" className="snap-top"><code>ecs_task_families</code></a></td>
        <td>Map of the families of the ECS Task Definition that is currently live. There are four entries, one for each container in the standard config (docker-image-builder ; ami-builder ; terraform-planner ; terraform-applier).</td>
    </tr><tr>
        <td><a name="ecs_task_iam_roles" href="#ecs_task_iam_roles" className="snap-top"><code>ecs_task_iam_roles</code></a></td>
        <td>Map of AWS ARNs and names of the IAM role that will be attached to the ECS task to grant it access to AWS resources. Each container will have its own IAM role. There are four entries, one for each container in the standard config (docker-image-builder ; ami-builder ; terraform-planner ; terraform-applier).</td>
    </tr><tr>
        <td><a name="ecs_task_revisions" href="#ecs_task_revisions" className="snap-top"><code>ecs_task_revisions</code></a></td>
        <td>Map of the current revision of the ECS Task Definition that is currently live. There are four entries, one for each container in the standard config (docker-image-builder ; ami-builder ; terraform-planner ; terraform-applier).</td>
    </tr><tr>
        <td><a name="invoke_policy_arn" href="#invoke_policy_arn" className="snap-top"><code>invoke_policy_arn</code></a></td>
        <td>The ARN of the IAM policy that allows access to the invoke the deploy runner.</td>
    </tr><tr>
        <td><a name="invoker_function_arn" href="#invoker_function_arn" className="snap-top"><code>invoker_function_arn</code></a></td>
        <td>AWS ARN of the invoker lambda function that can be used to invoke a deployment.</td>
    </tr><tr>
        <td><a name="security_group_allow_all_outbound_id" href="#security_group_allow_all_outbound_id" className="snap-top"><code>security_group_allow_all_outbound_id</code></a></td>
        <td>Security Group ID of the ECS task</td>
    </tr>
        </tbody>
    </table>
  </TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Service Catalog Reference","hash":"d916e788627e4b4a66cbd0ed98524c00"}
##DOCS-SOURCER-END -->

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Extending your ECS Deploy Runner

:::info Newer Version Available
This documentation pertains to an old version of Gruntwork Pipelines which used the `infrastructure-pipelines` repository. [Click here](../../pipelines/overview/) to view documentation for the most recent version.
:::

Pipelines can be extended in several ways:
- Adding repositories to supporting building Docker images for many applications
- Updating which branches can kick off which jobs
- Adding additional build scripts that can run in Pipelines
- Adding permissions to Pipelines


## Adding a repository

Pipelines has separate configurations for each type of job that can be performed (e.g., building a docker image, running terraform plan, running terraform apply). An allow-list of repos and branches is defined for each job type, which can be updated to extend your usage of pipelines to additional application repositories.

This portion of the guide focuses on building Docker images for application repos. If you have repositories for which you would like to run `terraform plan` or `terraform apply` jobs, similar steps can be followed, modifying the appropriate task configurations.

<Tabs groupId="deployment-type">
<TabItem value="RefArch" label="RefArch" default>

If you’ve deployed Pipelines as a part of your Reference Architecture, we recommend following the guide on [how to deploy your apps into the Reference Architecture](../../refarch/usage/maintain-your-refarch//deploying-your-apps.md) to learn how to define a module for your application.

To allow Pipelines jobs to be started by events in your repository, open `shared/<your region>/mgmt/ecs-deploy-runner/terragrunt.hcl` and update `docker_image_builder_config.allowed_repos` to include the HTTPS Git URL of the application repo for which you would like to deploy Docker images.

Since pipelines [cannot update itself](./updating.md), you must run `terragrunt plan` and `terragrunt apply` manually to deploy the change from your local machine. Run `terragrunt plan` to inspect the changes that will be made to your pipeline. Once the changes have been reviewed, run `terragrunt apply` to deploy the changes.

</TabItem>
<TabItem value="Standalone" label="Standalone">

If you’ve deployed Pipelines as a standalone framework using the `ecs-deploy-runner` service in the Service Catalog, you will need to locate the file in which you’ve defined a module block sourcing the `ecs-deploy-runner` service.

Once the `ecs-deploy-runner` module block is located, update the `allowed_repos` list in the `docker_image_builder_config` variable to include the HTTPS Git URL of the application repo for which you would like to deploy Docker images.

Refer to the [Variable Reference](../../reference/services/ci-cd-pipeline/ecs-deploy-runner#reference) section for the service in the Library Reference for full configuration details.

Run `terraform plan` to inspect the changes that will be made to your pipeline. Once the changes have been reviewed, run `terraform apply` to deploy the changes. To deploy the application to ECS or EKS you will need to deploy a task definition (ECS) or Deployment (EKS) that references the newly built image.
</TabItem>
</Tabs>

### Adding infrastructure deployer to the new repo

Pipelines can be triggered from GitHub events in many repositories. In order to configure Pipelines for the new repository, you need to add a step in your CI/CD configuration for the repository that uses the `infrastructure-deployer` CLI tool to trigger Docker image builds.

```bash
export ACCOUNT_ID=$(aws sts get-caller-identity --query 'Account' --output text)
export DEPLOY_RUNNER_REGION=$(aws configure get region)
export ECR_REPO_URL="${ACCOUNT_ID}.dkr.ecr.${DEPLOY_RUNNER_REGION}.amazonaws.com"
export DOCKER_TAG=$(git rev-parse --short HEAD)
export REPOSITORY_NAME="example"
export GITHUB_ORG="example-org"

infrastructure-deployer --aws-region "us-east-1" -- docker-image-builder build-docker-image \
    --repo "https://github.com/${GITHUB_ORG}/${REPOSITORY_NAME}" \
    --ref "origin/main" \
    --context-path "path/to/directory/with/dockerfile/" \
    --docker-image-tag "${ECR_REPO_URL}/${REPOSITORY_NAME}:${DOCKER_TAG}" \
```

## Specifying branches that can be deployed

Pipelines can be configured to only allow jobs to be performed on specific branches. For example, a common configuration is to allow `terraform plan` or `terragrunt plan` jobs for pull requests, and only allow `terraform apply` or `terragrunt apply` to run on merges to the main branch.

Depending on your use case, you may need to modify the `allowed_apply_git_refs` attribute to update the allow-list of branch names that can kick off the `plan` and `apply` jobs.

For example, a common configuration for `apply` jobs is to specify that this job can only run on the `main` branch:
```tf
allowed_apply_git_refs = ["main", "origin/main"]
```

<Tabs groupId="deployment-type">
<TabItem value="RefArch" label="RefArch" default>

If you’ve deployed Pipelines as a part of your Reference Architecture, open `shared/<your region>/mgmt/ecs-deploy-runner/terragrunt.hcl` and update the values in the `allowed_apply_git_refs` attribute for the job configuration you would like to modify (either `terraform_planner_config` or `terraform_applier_config`).

Run `terragrunt plan` to inspect the changes that will be made to your pipeline. Once the changes have been reviewed, run `terragrunt apply` to deploy the changes.

</TabItem>
<TabItem value="Standalone" label="Standalone">

If you’ve deployed Pipelines as a standalone framework using the `ecs-deploy-runner` service in the Service Catalog, you will need to locate the file in which you’ve defined a module block sourcing the `ecs-deploy-runner` service.

By default, the `ecs-deploy-runner` service from the Service Catalog allows any git ref to be applied. After you locate the module block for `ecs-deploy-runner`, modify the `allowed_apply_git_refs` attribute for the job configuration that you would like to modify (either `terraform_planner_config` or `terraform_applier_config`).

Run `terraform plan` to inspect the changes that will be made to your pipeline. Once the changes have been reviewed, run `terraform apply` to deploy the changes.
</TabItem>
</Tabs>

## Adding a new AWS Service

If you are expanding your usage of AWS to include an AWS service you’ve never used before, you will need to grant each job sufficient permissions to access that service. Pipelines executes in ECS tasks running in your AWS account(s). Each task (terraform planner, applier, docker builder, ami builder) has a distinct execution IAM role with only the permissions each task requires to complete successfully. For example, if you need to create an Amazon DynamoDB Table using Pipelines for the first time, you would want to add (at a minimum) the ability to list and describe tables to the policy for the `planner` IAM role, and all permissions for DynamoDB to the IAM policy for the `terraform-applier` IAM role.

We recommend that the `planner` configuration have read-only access to resources, and the applier be able to read, create, modify, and destroy resources.

<Tabs groupId="deployment-type">
<TabItem value="RefArch" label="RefArch" default>

If you’ve deployed Pipelines as a part of your Reference Architecture, the permissions for the `terraform-planner` task are located in `_envcommon/mgmt/read_only_permissions.yml` and the permissions for the `terraform-applier` task are located in `_envcommon/mgmt/deploy_permissions.yml`. Open and add the required permissions to each file.

After you are done updating both files, you will need to run `terragrunt plan`, review the changes, then `terragrunt apply` for each account in your Reference Architecture.
```bash
cd logs/$DEPLOY_RUNNER_REGION/mgmt/ecs-deploy-runner
aws-vault exec <your-logs> -- terragrunt apply --terragrunt-source-update -auto-approve

cd shared/$DEPLOY_RUNNER_REGION/mgmt/ecs-deploy-runner
aws-vault exec <your-shared> -- terragrunt apply --terragrunt-source-update -auto-approve

cd security/$DEPLOY_RUNNER_REGION/mgmt/ecs-deploy-runner
aws-vault exec <your-security> -- terragrunt apply --terragrunt-source-update -auto-approve

cd dev/$DEPLOY_RUNNER_REGION/mgmt/ecs-deploy-runner
aws-vault exec <your-dev> -- terragrunt apply --terragrunt-source-update -auto-approve

cd stage/$DEPLOY_RUNNER_REGION/mgmt/ecs-deploy-runner
aws-vault exec <your-stage> -- terragrunt apply --terragrunt-source-update -auto-approve

cd prod/$DEPLOY_RUNNER_REGION/mgmt/ecs-deploy-runner
aws-vault exec <your-prod> -- terragrunt apply --terragrunt-source-update -auto-approve
```
</TabItem>
<TabItem value="Standalone" label="Standalone">

If you’ve deployed Pipelines as a standalone framework using the `ecs-deploy-runner` service in the Service Catalog, you will need to locate the file in which you’ve defined a module block sourcing the `ecs-deploy-runner` service.

Modify the AWS IAM policy document being passed into the `iam_policy` variable for the [`terraform_applier_config`](../../reference/services/ci-cd-pipeline/ecs-deploy-runner#terraform_applier_config) and the [`terraform_planner_config`](../../reference/services/ci-cd-pipeline/ecs-deploy-runner#terraform_planner_config) variables. Refer to the [variable reference](../../reference/services/ci-cd-pipeline/ecs-deploy-runner#reference) section for the service in the Library Reference for the full set of configuration details for this service.

After you are done updating the IAM policy documents, run `terraform plan` then review the changes that will be made. Finally, run `terraform apply` to apply the changes.
</TabItem>
</Tabs>

## Adding scripts that can be run in Pipelines

The `deploy-runner` Docker image for Pipelines only allows scripts within a single directory to be executed in the ECS task as an additional security measure.

By default, the `deploy-runner` ships with three scripts — one to build HashiCorp Packer images, one to run `terraform plan` and `terraform apply`, and one to automatically update the value of a variable in a Terraform tfvars or Terragrunt HCL file.

If you need to run a custom script in the `deploy-runner`, you must fork the image code, add an additional line to copy your script into directory designated by the `trigger_directory` argument. Then, you will need to rebuild the Docker image, push to ECR, then update your Pipelines deployment following the steps in [Updating your Pipeline](./updating.md).


<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "68f6551330b76b6bb8ef7b8a735a9d29"
}
##DOCS-SOURCER-END -->

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Updating Your ECS Deploy Runner

:::info Newer Version Available
This documentation pertains to an old version of Gruntwork Pipelines which used the `infrastructure-pipelines` repository. [Click here](../../pipelines/overview/) to view documentation for the most recent version.
:::

Pipelines is built using the [`terraform-aws-ci`](../../reference/modules/terraform-aws-ci/ecs-deploy-runner/) module. We recommend updating your pipeline whenever there’s a new release of the module.

By default, Pipelines cannot update it’s own infrastructure (ECS cluster, AWS Lambda function, etc), so you must run upgrades to Pipelines manually from your local machine. This safeguard is in place to prevent you from accidentally locking yourself out of the Pipeline when applying a change to permissions.

For example, if you change the IAM permissions of the CI user, you may no longer be able to run the pipeline. The pipeline job that updates the permissions will also be affected by the change. This is a difficult scenario to recover from, since you will have lost access to make further changes using Pipelines.

## Prerequisites

This guide assumes you have the following:
- An AWS account with permissions to create the necessary resources
- An [AWS Identity and Access Management](https://aws.amazon.com/iam/) (IAM) user or role with permissions to start pipelines deployments and update AWS Lambda functions
- [AWS Command Line Interface](https://aws.amazon.com/cli/) (AWS CLI) installed on your local machine
- [`infrastructure-deployer`](https://github.com/gruntwork-io/terraform-aws-ci/tree/main/modules/infrastructure-deployer) CLI tool installed locally
- [`aws-vault`](https://www.github.com/99designs/aws-vault) installed locally for authenticating to AWS

## Updating container images

Gruntwork Pipelines uses two images — one for the [Deploy Runner](https://github.com/gruntwork-io/terraform-aws-ci/blob/main/modules/ecs-deploy-runner/docker/deploy-runner/Dockerfile) and one for [Kaniko](https://github.com/gruntwork-io/terraform-aws-ci/blob/main/modules/ecs-deploy-runner/docker/kaniko/Dockerfile). To update pipelines to the latest version, you must build and push new versions of each image.

Pipelines has the ability to build container images, including the images it uses. You can use the `infrastructure-deployer` CLI tool locally to start building the new image versions. This is the same tool used by Pipelines in your CI system.

```bash
export ACCOUNT_ID=$(aws sts get-caller-identity --query 'Account' --output text)
export DEPLOY_RUNNER_REGION=$(aws configure get region)
export DOCKERFILE_REPO="https://github.com/gruntwork-io/terraform-aws-ci.git"
export ECR_REPO_URL="${ACCOUNT_ID}.dkr.ecr.${DEPLOY_RUNNER_REGION}.amazonaws.com"
export TERRAFORM_AWS_CI_VERSION="v0.52.1"

# Builds and pushes the deploy runner image
infrastructure-deployer --aws-region "$DEPLOY_RUNNER_REGION" -- docker-image-builder build-docker-image \
    --repo "$DOCKERFILE_REPO" \
    --ref "$TERRAFORM_AWS_CI_VERSION" \
    --context-path "modules/ecs-deploy-runner/docker/deploy-runner" \
    --env-secret 'github-token=GITHUB_OAUTH_TOKEN' \
    --docker-image-tag "${ECR_REPO_URL}/ecs-deploy-runner:${TERRAFORM_AWS_CI_VERSION}" \
    --build-arg "module_ci_tag=$TERRAFORM_AWS_CI_VERSION"

# Builds and pushes the kaniko image
infrastructure-deployer --aws-region "$DEPLOY_RUNNER_REGION" -- docker-image-builder build-docker-image \
    --repo "$DOCKERFILE_REPO" \
    --ref "$TERRAFORM_AWS_CI_VERSION" \
    --context-path "modules/ecs-deploy-runner/docker/kaniko" \
    --env-secret 'github-token=GITHUB_OAUTH_TOKEN' \
    --docker-image-tag "${ECR_REPO_URL}/kaniko:${TERRAFORM_AWS_CI_VERSION}" \
    --build-arg "module_ci_tag=$TERRAFORM_AWS_CI_VERSION"
```
Each image may take a few minutes to build and push. Once both images are built, you can update the image tag in your terraform module and update the infrastructure.

## Updating infrastructure

Next, update the references to these images to the new tag values. This will vary depending on if you’re using Pipelines as configured by the Reference Architecture or if you’ve deployed Pipelines as a standalone framework.

<Tabs groupId="deployment-type">
<TabItem value="RefArch" label="RefArch" default>

To update the image tags for pipelines deployed by a Reference Architecture, you update `common.hcl` with the new tag values for these images. The new tag value will be version of `terraform-aws-ci` that the images use. For example, if your newly created images are using the v0.52.1 release of `terraform-aws-ci`, update common.hcl to:

```
deploy_runner_container_image_tag = "v0.52.1"
kaniko_container_image_tag = "v0.52.1"
```

Next, apply the ecs-deploy-runner module in each account:
```bash
cd logs/$DEPLOY_RUNNER_REGION/mgmt/ecs-deploy-runner
aws-vault exec your-logs -- terragrunt apply --terragrunt-source-update -auto-approve

cd shared/$DEPLOY_RUNNER_REGION/mgmt/ecs-deploy-runner
aws-vault exec your-shared -- terragrunt apply --terragrunt-source-update -auto-approve

cd security/$DEPLOY_RUNNER_REGION/mgmt/ecs-deploy-runner
aws-vault exec your-security -- terragrunt apply --terragrunt-source-update -auto-approve

cd dev/$DEPLOY_RUNNER_REGION/mgmt/ecs-deploy-runner
aws-vault exec your-dev -- terragrunt apply --terragrunt-source-update -auto-approve

cd stage/$DEPLOY_RUNNER_REGION/mgmt/ecs-deploy-runner
aws-vault exec your-stage -- terragrunt apply --terragrunt-source-update -auto-approve

cd prod/$DEPLOY_RUNNER_REGION/mgmt/ecs-deploy-runner
aws-vault exec your-prod -- terragrunt apply --terragrunt-source-update -auto-approve
```
</TabItem>
<TabItem value="Standalone" label="Standalone">

If you’ve deployed Pipelines as a standalone framework using the `ecs-deploy-runner` service in the Service Catalog, refer to the [Variable Reference](../../reference/services/ci-cd-pipeline/ecs-deploy-runner#reference) section for the service in the Library Reference for configuration details. You will need to update the `docker_tag` value in the `container_image` object for the [`ami_builder_config`](../../reference/services/ci-cd-pipeline/ecs-deploy-runner#ami_builder_config), [`docker_image_builder_config`](../../reference/services/ci-cd-pipeline/ecs-deploy-runner#docker_image_builder_config), [`terraform_applier_config`](../../reference/services/ci-cd-pipeline/ecs-deploy-runner#terraform_applier_config), and [`terraform_planner_config`](../../reference/services/ci-cd-pipeline/ecs-deploy-runner#terraform_planner_config) variables.

Once you have updated any references to the container image tags, you will need to run `terraform plan` and `terraform apply` in each account where pipelines is deployed.

</TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "6a2b0a06b22a1f9f52909f68250435fb"
}
##DOCS-SOURCER-END -->

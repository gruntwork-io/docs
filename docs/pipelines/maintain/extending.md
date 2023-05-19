# Extending your Pipeline

Pipelines can be extended to support building and deploying application code in many repositories. This guide demonstrates how to update which repositories are allowed to submit requests to Pipelines to build docker images.


## Adding a repository

Pipelines has separate configurations for each type of job that be performed (e.g., building a docker image, running terraform plan, running terraform apply). An allow-list of repos and branches is defined for each job type, which can be updated to extend your usage of pipelines to additional application repositories.

This guide focuses on building Docker images for applications repos, if you have repositories for which you would like to run `terraform plan` or `terraform apply` jobs, similar steps can be followed, modifying the appropriate task configurations.

### RefArch

First, define a module for your application by following the guide on [how to deploy your apps into the Reference Architecture](../../guides/reference-architecture/example-usage-guide/deploy-apps/intro).

Next, open `shared/<your region>/mgmt/ecs-deploy-runner/terragrunt.hcl` and update `docker_image_builder_config.allowed_repos` to include the HTTPS Git URL of the application repo for which you would like to deploy Docker images.

Since pipelines [cannot update itself](./updating.md), you must run `terragrunt plan` and `terragrunt apply` manually to deploy the change from your local machine. Run `terragrunt plan` to inspect the changes that will be made to your pipeline. Once the changes have been reviewed, run `terragrunt apply` to deploy the changes.

### Standalone

If you've deployed Pipelines as a standalone framework using the `ecs-deploy-runner` service in the Service Catalog, you will need to locate the file in which you've defined a module block sourcing the `ecs-deploy-runner` service.

Once the `ecs-deploy-runner` module block is located, update the `allowed_repos` list in the `docker_image_builder_config` variable to include the HTTPS Git URL of the application repo for which you would like to deploy Docker images.

Refer to the [Variable Reference](../../reference/services/ci-cd-pipeline/ecs-deploy-runner#reference) section for the service in the Library Reference for full configuration details.

Run `terraform plan` to inspect the changes that will be made to your pipeline. Once the changes have been reviewed, run `terraform apply` to deploy the changes. To deploy the application to ECS or EKS you will need to deploy a task definition (ECS) or Deployment (EKS) that references the newly built image.

### Adding infrastructure deployer to the new repo (RefArch & Standalone)

Pipelines can be triggered from Github events in many repositories. In order to configure Pipelines for the new repository, you need to add a step in your CI/CD configuration for the repository that uses the `infrastructure-deployer` CLI tool to trigger Docker image builds.

```sh
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

## Updating branches that can be deployed

Pipelines can be configured to only allow jobs to be performed on specific branches. For example, a common configuration is to allow `terraform plan` or `terragrunt plan` jobs for Pull Requests, and only allow `terraform apply` or `terragrunt apply` to run on merges to the main branch.

Depending on your use case, you may need to modify the allow-list to only allow a pre-defined list of branch names.

### RefArch

Open `shared/<your region>/mgmt/ecs-deploy-runner/terragrunt.hcl` and update the values the `allowed_apply_git_refs` attribute for the job configuration you would like to modify (either `terraform_planner_config` or `terraform_applier_config`).

Run `terragrunt plan` to inspect the changes that will be made to your pipeline. Once the changes have been reviewed, run `terragrunt apply` to deploy the changes.

### Standalone

If you've deployed Pipelines as a standalone framework using the `ecs-deploy-runner` service in the Service Catalog, you will need to locate the file in which you've defined a module block sourcing the `ecs-deploy-runner` service.

By default, the `ecs-deploy-runner` service from the Service Catalog allows any git ref to be applied. After you locate the module block for `ecs-deploy-runner`, modify the `allowed_apply_git_refs` attribute for the job configuration that you would like to modify (either `terraform_planner_config` or `terraform_applier_config`).

Run `terraform plan` to inspect the changes that will be made to your pipeline. Once the changes have been reviewed, run `terraform apply` to deploy the changes.

## Adding script arguments

## Adding permissions

### RefArch


### Standalone


<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "1842b029821de51504893a6699745e41"
}
##DOCS-SOURCER-END -->

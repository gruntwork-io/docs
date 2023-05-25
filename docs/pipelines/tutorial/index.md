# Single Account Tutorial

In this tutorial, you’ll walk you through the process of setting up Gruntwork Pipelines in a single
AWS account. By the end, you’ll deploy:

- ECR Repositories for storing Docker images
  - `deploy-runner` — stores the default image for planning and applying terraform and building AMIs
  - `kaniko` — stores the default image for building other Docker images using [kaniko](https://github.com/GoogleContainerTools/kaniko)
  - `hello-world` — a demonstration repo used for illustrating how a Docker application might be managed with Gruntwork Pipelines
- Our [ECS Deploy Runner Module](https://github.com/gruntwork-io/terraform-aws-ci/tree/main/modules/ecs-deploy-runner)
- Supporting IAM Roles, IAM Policies, and CloudWatch Log Groups
- ECS Tasks
  - `docker-image-builder` — builds Docker images within the `kaniko` container image
  - `ami-builder` — builds AMIs using HashiCorp Packer within the `deploy-runner` image
  - `terraform-planner` — Runs plan commands within the `deploy-runner` container
  - `terraform-applier` — Runs apply commands within the `deploy-runner` container

## Prerequisites

Before you begin, make sure your system has:

- [Docker](https://docs.docker.com/get-docker/), with support for Buildkit (version 18.09 or newer)
- [Terraform](https://developer.hashicorp.com/terraform/tutorials/aws-get-started/install-cli) (version 1.0 or newer)
- Valid [AWS credentials](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html) for an IAM user with `AdministratorAccess`

## Repo Setup

The code for this tutorial can be found in the [Gruntwork Service Catalog](https://github.com/gruntwork-io/terraform-aws-service-catalog/blob/master/examples/for-learning-and-testing/gruntwork-pipelines/README.md). Start by cloning the repo:

```shell
git clone https://github.com/gruntwork-io/terraform-aws-service-catalog.git
```

You will be following the example found at `terraform-aws-service-catalog/examples/for-learning-and-testing/gruntwork-pipelines`

```shell
cd terraform-aws-service-catalog/examples/for-learning-and-testing/gruntwork-pipelines
```

## Create the required ECR repositories

Change directories to deploy the Terraform for ECR

```shell
cd ecr-repositories
```

Set the `AWS_REGION` environment variable to your desired AWS region:

```shell
export AWS_REGION=<your-desired-region>
```

Authenticate with your AWS account and deploy the Terraform code provided to create the three
ECR repositories.

Initialize Terraform to download required dependencies:
```shell
terraform init
```

Run plan and ensure the output matches your expectations:
```shell
terraform plan
```

Deploy the code using apply
```shell
terraform apply
```

## Build and Push the Docker Images

The four standard Gruntwork Pipelines capabilities are instrumented by two separate Docker files

1. `ecs-deploy-runner` — Terraform plan, apply and AMI building
2. `kaniko` — Docker image building. [Kaniko](https://github.com/GoogleContainerTools/kaniko) is a tool that supports building Docker images inside a container

These Dockerfiles live in the ecs-deploy-runner module within [the terraform-aws-ci repository](https://github.com/gruntwork-io/terraform-aws-ci). In this example, you'll clone the terraform-aws-ci and running Docker build against the Dockerfiles defined there.

You’re now going to build these two Docker images and push them to the ECR repositories you just created.

### Export Environment Variables

If you do not already have a GitHub Personal Access Token (PAT) available, you can follow this [guide to Create a new GitHub Personal Access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)

For the purposes of this example, your token will need the `repo` scope, so that Gruntwork Pipelines is able to fetch modules and code from private Gruntwork repositories. Note that in production, the best practice is to create a separate GitHub machine user account,
and provision a GitHub PAT against that account.

This GitHub PAT will be used for two purposes:
1. Initially, when running the Docker build commands below, the GitHub PAT will be used to fetch private code from `github.com/gruntwork-io`.
2. Once the Docker images are built, you’ll store your GitHub PAT in AWS Secrets Manager. When Gruntwork Pipelines is running on your behalf, it will fetch
   your GitHub PAT from Secrets Manager "just in time" so that only the running ECS task has access to the token — and so that your token only exists for the lifespan
   of the ephemeral ECS task container.

Export a valid GitHub PAT using the following command so that you can use it to build Docker images that fetch private code via GitHub:
```shell
export GITHUB_OAUTH_TOKEN=<your-github-pat>
```

Export your AWS Account ID and primary region. The commands in the rest of this document require these variables to be set. The region to use is up to you.
```shell
export AWS_ACCOUNT_ID=<your-aws-account-id>
export AWS_REGION=<your-aws-region>
```

The Gruntwork Pipelines Dockerfiles used by Gruntwork Pipelines are stored in the `gruntwork-io/terraform-aws-ci` repository. Therefore, in order to pin both Dockerfiles
to a known version, you export the following variable which you’ll use during our Docker builds:

```shell
export TERRAFORM_AWS_CI_VERSION=v0.51.4
```

The latest version can be retrieved from the [releases page](https://github.com/gruntwork-io/terraform-aws-ci/releases) of the `gruntwork-io/terraform-aws-ci` repository. At a minimum, `v0.51.4` must be selected.

### Clone `terraform-aws-ci` to your machine
Next, you are going to build the two Docker images required for this example. The Dockerfiles are defined in the [terraform-aws-ci](https://github.com/gruntwork-io/terraform-aws-ci) repository, so it must be available locally:

```bash
git clone git@github.com:gruntwork-io/terraform-aws-ci.git
```

Change directory into the example folder:
```bash
cd terraform-aws-ci/modules/ecs-deploy-runner
```

### Build the ecs-deploy-runner and kaniko Docker images

This next command is going to perform a Docker build of the `deploy-runner` image. You don’t need to authenticate to AWS in order to run this command, as the build will happen on your machine.
We do, however, pass your exported GitHub PAT into the build as a secret, so that the Docker build can fetch private code from `github.com/gruntwork-io`. Since you’re using BuildKit, the token
is only used during the build process and does not remain in the final image.

Run the following command to build the ecs-deploy-runner Docker image:
```shell
DOCKER_BUILDKIT=1 docker build \
  --secret id=github-token,env=GITHUB_OAUTH_TOKEN \
  --build-arg module_ci_tag="$TERRAFORM_AWS_CI_VERSION" \
  --tag "$AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/ecs-deploy-runner:$TERRAFORM_AWS_CI_VERSION" \
  ./docker/deploy-runner/
```

Similarly to the ecs-deploy-runner image, you’ll now use the Kaniko Dockerfile included in this example to build the kaniko image:
```shell
DOCKER_BUILDKIT=1 docker build \
  --secret id=github-token,env=GITHUB_OAUTH_TOKEN \
  --build-arg module_ci_tag="$TERRAFORM_AWS_CI_VERSION" \
  --tag "$AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/kaniko:$TERRAFORM_AWS_CI_VERSION" \
  ./docker/kaniko/
```

### Log In and Push to ECR
Now you have local Docker images for ecs-deploy-runner and kaniko that are properly tagged, but before you can push it into the private ECR repository that you created
with our `terraform apply`, you need to authenticate with ECR itself. Authenticate to AWS and run the following:

```shell
aws ecr get-login-password --region $AWS_REGION \
  | docker login -u AWS --password-stdin "$AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com"
```

If you receive a success message from your previous command, you’re ready to push your ecs-deploy-runner image:
```shell
docker push "$AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/ecs-deploy-runner:$TERRAFORM_AWS_CI_VERSION"
```

```shell
docker push "$AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/kaniko:$TERRAFORM_AWS_CI_VERSION"
```

## Deploy the Pipelines Cluster

Now that the ECR repositories are deployed and have the required Docker images, you are ready
to deploy the rest of Gruntwork Pipelines. The Terraform that defines the setup is defined in
`terraform-aws-service-catalog/examples/for-learning-and-testing/gruntwork-pipelines/pipelines-cluster`

```shell
cd terraform-aws-service-catalog/examples/for-learning-and-testing/gruntwork-pipelines/pipelines-cluster
```

### Export a GitHub Personal Access Token (PAT)
For the purposes of this example, you may use the same PAT as before. In a production deployment, best practice
would be to create a separate GitHub machine user account. This module uses a slightly different naming convention for
its environment variable, so you’ll need to re-export the token:

```shell
export TF_VAR_github_token=<your-github-personal-access-token>
```

### Configure and Deploy the ecs deploy runner
Authenticate to your AWS account and run `init`, then `apply`.
:::note
If you  are using `aws-vault` to authenticate on the command line, you must supply the `--no-session` flag as explained in [this Knowledge Base entry](https://github.com/gruntwork-io/knowledge-base/discussions/647)
:::

```shell
terraform init
```

```shell
terraform plan
```
Check your plan output before applying:
```shell
terraform apply
```

## Install the `infrastructure-deployer` command line tool

Gruntwork Pipelines requires all requests to transit through its Lambda function, which ensures only valid arguments and commands are passed along to ECS.
To invoke the Lambda function, you should use the `infrastructure-deployer` command line interface (CLI) tool. For testing and setup purposes, you’ll install and use the `infrastructure-deployer` CLI locally; when you’re ready to configure CI/CD, you’ll install and use it in your CI/CD config.

If you do not already have the `gruntwork-install` binary installed, you can get it [here.](https://github.com/gruntwork-io/gruntwork-installer)

```bash

gruntwork-install --binary-name "infrastructure-deployer" --repo "https://github.com/gruntwork-io/terraform-aws-ci" --tag "$TERRAFORM_AWS_CI_VERSION"
```
:::note
If you’d rather not use the Gruntwork installer, you can alternatively download the binary manually from [the releases page.](https://github.com/gruntwork-io/terraform-aws-ci/releases)
:::

## Invoke your Lambda Function

### Get your Lambda ARN from the output
Next, you need to retrieve the Amazon Resource Name (ARN) for the Lambda function that guards your Gruntwork Pipelines installation:

```shell
terraform output -r gruntwork_pipelines_lambda_arn
```

Once you have your invoker Lambda’s ARN, export it like so:

```shell
export INVOKER_FUNCTION_ARN=<arn>
```

This value is used by the `run-docker-build.sh` and `run-packer-build.sh` scripts in the next step.

### Perform a Docker/Packer build via Pipelines

Now that you have Gruntwork Pipelines installed in the `docker-packer-builder` configuration, let’s put arbitrary Docker and Packer builds through it!

For your convenience, we’ve provided two scripts that you can run:
* `run-docker-build.sh`
* `run-packer-build.sh`

These two scripts will:

1. Ensure all required environment variables are set
2. Use the `infrastructure-deployer` CLI to send a Docker build request to the invoker lambda

Once the request is sent, Gruntwork Pipelines will begin streaming the logs back to you so you can watch the images get built. The Docker build will push the completed image to your hello-world repository, and the Packer build will push the completed AMI to EC2.

The following environment variables must be set in your shell before you run `run-docker-build.sh`:
* `AWS_ACCOUNT_ID`
* `AWS_REGION`
* `INVOKER_FUNCTION_ARN`

## Prepare a test `infrastructure-live` repo

You now have a functional Gruntwork Pipelines example that can build and deploy Docker images and AMIs.
Feel free to stop here and experiment with what you’ve built so far. The following steps will extend
pipelines to be capable of running Terraform plan and apply.

Pipelines is a flexible solution that can be deployed in many configurations.
In your own organization, you might consider deploying one Pipelines installation with all the ECS tasks enabled,
or having a central Pipelines installation plus one in each account of your Reference Architecture.

To test the plan and apply functionality, you’ll need a simple demo repository.
You may create your own or fork our [testing repo](https://github.com/gruntwork-io/terraform-module-in-root-for-terragrunt-test)

## Enable the Terraform planner and applier

We’ve intentionally deployed an incomplete version of Gruntwork Pipelines so far. To deploy the full version with the planner
and applier, you’ll need to make a few edits to the module.  In this directory you should see a few files prefixed with `config_`.
Two are proper Terraform files with all the configuration for running the Docker image builder and the ami builder.

Each consists of
* A `locals` block containing the configuration variables specifying which repos are allowed and providing credentials
* Some IAM resources that give the task permission to access the resources it needs

The other two files have a `.example` postfix. Remove that postfix to let Terraform discover them.

Next, let’s take a look at `main.tf`.  You should see a `TODO` in the `locals` block,  marking the location where the configuration might normally
live.  As this example ships with the Docker image builder and AMI builder defined in external files we have commented out
the default null values.

Comment out or delete the following lines:
* `terraform_planner_config = null`
* `terraform_planner_https_tokens_config = null`
* `terraform_applier_config = null`
* `terraform_applier_https_tokens_config = null`

These values are now properly defined in the external `config_*.tf` files.

## Configure the Terraform planner and applier

Now that the planner and applier are enabled, you could run `terraform apply`, but the default values of a few
variables might not be correct for your test environment. Make the following changes to your `.tfvars` file to
define the correct repos and credentials. Pipelines is configured to reject any commands that aren’t explicitly allowed
by the configuration below:

* `allowed_terraform_planner_repos = ["https://github.com/your-org/your-forked-repo.git"]` — a list of repos where `terraform plan` is allowed to be run
* `allowed_terraform_applier_repos = ["https://github.com/your-org/your-forked-repo.git"]` — a list of repos where `terraform apply` is allowed to be run
* optionally `machine_user_git_info = {name="machine_user_name", email="machine_user_email"}` — if you’d like to customize your machine user info
* optionally `allowed_apply_git_refs = ["master", "main", "branch1", ...]` — for any branches or git refs you’d like to be able to run `terraform apply` on

Now you’re ready to run `terraform apply`! Once complete, you should see 2 new ECS task definitions in your AWS account:
* `ecs-deploy-runner-terraform-planner`
* `ecs-deploy-runner-terraform-applier`

## Try a `plan` or `apply`

With Gruntwork Pipelines deployed, it’s time to test it out! Run the following command to trigger
a `plan` or `apply`:

```shell
infrastructure-deployer --aws-region us-east-1 -- terraform-planner infrastructure-deploy-script \
 --ref "master" \
 --binary "terraform" \
 --command "plan"
```

If you forked the example repo provided you should see `+ out = "Hello, World"` if the plan was a success.

## Celebrate, you did it!

As a next step you could add a `.github/workflows/pipeline.yml` file to your repo that runs the command above
or try it in your favorite CI/CD tool.  Your tooling only needs permission to trigger the lambda
function `arn:aws:lambda:us-east-1:<your account id>:function:ecs-deploy-runner-invoker`.

## Cleanup

If you want to remove the infrastructure created, you can use Terraform `destroy`.

```shell
terraform plan -destroy -out terraform.plan
terraform apply terraform.plan
```

To destroy the `ecr-repositories` resources you created, you’ll first need to empty the repos of any images:

```shell
aws ecr batch-delete-image --repository-name ecs-deploy-runner --image-ids imageTag=$TERRAFORM_AWS_CI_VERSION
aws ecr batch-delete-image --repository-name kaniko --image-ids imageTag=$TERRAFORM_AWS_CI_VERSION
aws ecr batch-delete-image --repository-name hello-world --image-ids imageTag=v1.0.0
```

Then Terraform can take care of the rest:

```shell
cd ../ecr-repositories
terraform plan -destroy -out terraform.plan
terraform apply terraform.plan
```


<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "e1aa8061a22ec7daa77011d0a183c554"
}
##DOCS-SOURCER-END -->

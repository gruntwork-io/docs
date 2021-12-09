# Deploy the ECS Deploy Runner

**This guide is currently only compatible with ECS deploy runner version v0.27.x.** We are working on a
series of updates to the Gruntwork CI/CD pipeline spread out across multiple versions. Once complete, we will update
this guide to the latest version. In the meantime, use `v0.27.2` for a stable deployment process.

For this guide, we will use
[Gruntwork’s ECS Deploy
Runner stack](https://github.com/gruntwork-io/module-ci/blob/master/README-Terraform-Terragrunt-Pipeline.adoc) as our infrastructure deployment CD platform. We will deploy the stack into the private subnet of our
mgmt VPC using the [ecs-deploy-runner
module](https://github.com/gruntwork-io/module-ci/tree/master/modules/ecs-deploy-runner) in `module-ci`.

To deploy the ECS Deploy Runner, we will follow four steps:

- [Create Secrets Manager Entries](#create_secrets_manager_entries)

- [Create ECR repo](#create_ecr_repo)

- [Create Docker Image](#create_docker_image)

- [Deploy ECS Deploy Runner stack](#deploy_ecs_deploy_runner_stack)

## Create Secrets Manager Entries

The ECS deploy runner needs access to your git repositories that contain the infrastructure code in order to be able to
deploy them. To allow access to the infrastructure code, you will need to provide it with an SSH key for a machine user
that has access to the infrastructure repos. We will use [AWS Secrets Manager](https://aws.amazon.com/secrets-manager/) to
securely share the secrets with the deploy runner.

1.  Create a machine user on your version control platform.

2.  Create a new SSH key pair on the command line using `ssh-keygen`:

    ```bash
    ssh-keygen -t rsa -b 4096 -C "MACHINE_USER_EMAIL"
    ```

Make sure to set a different path to store the key (to avoid overwriting any existing key). Also avoid setting a
passphrase on the key.

1.  Upload the SSH key pair to the machine user. See the following docs for the major VCS platforms:

    - [GitHub](https://help.github.com/en/github/authenticating-to-github/adding-a-new-ssh-key-to-your-github-account)

    - [GitLab](https://docs.gitlab.com/ee/ssh/README.html#adding-an-ssh-key-to-your-gitlab-account)

    - [BitBucket](https://confluence.atlassian.com/bitbucket/set-up-an-ssh-key-728138079.html#SetupanSSHkey-#installpublickeyStep3.AddthepublickeytoyourBitbucketsettings) (Note: you will need to expand one of the instructions to see the full instructions for adding an SSH key to the machine user account)

2.  Create an AWS Secrets Manager entry with the contents of the private key. In the following example, we use the aws
    CLI to create the entry in `us-east-2`, sourcing the contents from the SSH private key file `~/.ssh/machine_user`:

    ```bash
    cat ~/.ssh/machine_user \
        | xargs -0 aws secretsmanager create-secret --region us-east-2 --name "SSHPrivateKeyForECSDeployRunner" --secret-string
    ```

When you run this command, you should see a JSON output with metadata about the created secret:

\+

```json
{
  "ARN": "arn:aws:secretsmanager:us-east-2:000000000000:secret:SSHPrivateKeyForECSDeployRunner-SOME_RANDOM_STRING",
  "Name": "SSHPrivateKeyForECSDeployRunner",
  "VersionId": "21cda90e-84e0-4976-8914-7954cb6151bd"
}
```

Record the ARN. You will need this later when setting up the terraform module.

## Create ECR repo

The ECS Deploy Runner uses an ECS Task to run the infrastructure deployment. In order to run the ECS task, we need a
Docker image that contains all the necessary software for the deployment, as well as an ECR repository to store that
Docker image. We will start by creating the ECR repo.

Create a new module called `ecr-repo` in `infrastructure-modules`:

    infrastructure-modules
      └ cicd
        └ ecr-repo
          └ main.tf
          └ outputs.tf
          └ variables.tf
      └ networking
        └ vpc-mgmt
          └ main.tf
          └ outputs.tf
          └ variables.tf

Inside of `main.tf`, configure the ECR repository:

**infrastructure-modules/cicd/ecr-repo/main.tf**

```hcl
resource "aws_ecr_repository" "repo" {
  name                 = var.name

  image_scanning_configuration {
    scan_on_push = true
  }
}
```

This defines a new ECR repository with a name configured by an input variable and indicates that images should be
scanned automatically on push.

Add the corresponding `name` variable to `variables.tf`:

**infrastructure-modules/cicd/ecr-repo/variables.tf**

```hcl
variable "name" {
  description = "The name of the ECR repository to be created."
  type        = string
}
```

Also make sure that the repository URL is exposed in `outputs.tf`, as we will need it later when deploying the ECS
Deploy Runner:

**infrastructure-modules/cicd/ecr-repo/outputs.tf**

```hcl
output "url" {
  description = "The Docker URL for the created ECR repository. This can be used as the push URL for containers."
  value       = aws_ecr_repository.repo.repository_url
}
```

At this point, you’ll want to test your code. See
[Manual tests for Terraform code](/guides/foundations/how-to-use-gruntwork-infrastructure-as-code-library#manual_tests_terraform)
and
[Automated tests for Terraform code](/guides/foundations/how-to-use-gruntwork-infrastructure-as-code-library#automated_tests_terraform)
for instructions.

Once your `ecr-repo` module is working the way you want, submit a pull request, get your changes merged into the
`master` branch, and create a new versioned release by using a Git tag. For example, to create a `v0.5.0` release:

```bash
git tag -a "v0.5.0" -m "Added module for creating ECR repositories"
git push --follow-tags
```

Now that we have a module for managing an ECR repo, head over to your `infrastructure-live` repo and add a
`terragrunt.hcl` file for creating the ECR repo for the ECS deploy runner:

    infrastructure-live
      └ production
        └ terragrunt.hcl
        └ us-east-2
          └ prod
            └ cicd
              └ ecr-repo
                └ terragrunt.hcl
            └ networking
              └ vpc-mgmt
                └ terragrunt.hcl

**infrastructure-live/production/us-east-2/prod/cicd/ecr-repo/terragrunt.hcl**

```hcl
# Pull in the backend and provider configurations from a root terragrunt.hcl file that you include in each child terragrunt.hcl:
include {
  path = find_in_parent_folders()
}

# Set the source to an immutable released version of the infrastructure module being deployed:
terraform {
  source = "git@github.com:<YOUR_ORG>/infrastructure-modules.git//cicd/ecr-repo?ref=v0.5.0"
}

# Configure input values for the specific environment being deployed:
inputs = {
  name = "ecs-deploy-runner"
}
```

And run `terragrunt apply` to deploy the changes:

```bash
cd infrastructure-live/production/us-east-2/prod/cicd/ecr-repo
terragrunt apply
```

Make sure to note the repository URL. You can store it in an environment variable for easy reference when building the
Docker image:

```bash
cd infrastructure-live/production/us-east-2/prod/cicd/ecr-repo
export ECR_REPO_URL=$(terragrunt output url)
```

## Create Docker Image

Once we have the ECR repository to house Docker images, we need to create the Docker image for the infrastructure
deploy script. This Docker image should contain everything you need to deploy your infrastructure, such as `terraform` and
`terragrunt`. In addition, the Docker image should include the
[infrastructure-deploy-script](https://github.com/gruntwork-io/module-ci/tree/master/modules/infrastructure-deploy-script).
This is a python script that does the following:

- Clone the repository containing the infrastructure code using git.

- Change the working directory to the desired path passed in the parameters.

- Run `terraform` or `terragrunt` with `plan` or `apply` depending on the passed in parameters, streaming the output to
  `stdout` and `stderr`.

- Exit with the appropriate exit code depending on if the underlying command succeeded or failed.

You can run any Docker image with any script in the ECS Deploy Runner. That is, you can setup a custom Docker and expose
custom scripts that can be invoked remotely on the stack. To integrate the container with the ECS deploy runner, it must
meet the following requirements:

- Define a trigger directory where scripts that can be invoked by the ECS Deploy Runner Lambda function are contained.
  You should limit the scripts that can be run within the ECS tasks to avoid escape hatches to run arbitrary code due to
  its powerful IAM permissions. The ECS Deploy Runner will be configured using an entrypoint script to ensure that only
  scripts defined in the trigger directory can be invoked.

- The entrypoint must be set to the `deploy-runner` entrypoint command provided in the
  [module-ci repository](https://github.com/gruntwork-io/module-ci/tree/master/modules/ecs-deploy-runner/entrypoint).
  This is a small go binary that enforces the configured trigger directory of the Docker container by making sure that
  the script requested to invoke actually resides in the trigger directory. See the
  [Dockerfile
  for the deploy-runner container](https://github.com/gruntwork-io/module-ci/blob/master/modules/ecs-deploy-runner/docker/deploy-runner/Dockerfile) for an example of how to install the entrypoint script.

For convenience, Gruntwork provides a standard deploy runner container and configuration that includes everything you
need for a typical Infrastructure as Code pipeline: Terraform, Terragrunt, Packer, Docker, etc. You can read more about
what is included in the standard container
[in the
documentation](https://github.com/gruntwork-io/module-ci/blob/master/modules/ecs-deploy-runner/core-concepts.md#deploy-runner).

For this guide, we will deploy the standard deploy runner provided by Gruntwork.

To build the standard deploy runner containers, clone the `module-ci` repository to a temporary directory and build the
`Dockerfile` in the
[modules/ecs-deploy-runner/docker/deploy-runner](https://github.com/gruntwork-io/module-ci/tree/master/modules/ecs-deploy-runner/docker/deploy-runner)
folder:

```bash
git clone git@github.com:gruntwork-io/module-ci.git
cd module-ci
git checkout v0.27.2
cd modules/ecs-deploy-runner/docker/deploy-runner
# Make sure you have set the environment variable GITHUB_OAUTH_TOKEN with a GitHub personal access token that has access
# to the Gruntwork repositories
docker build --build-arg GITHUB_OAUTH_TOKEN --tag "$ECR_REPO_URL:v1" .
```

Then, push the Docker image to the ECR repository so that it is available to ECS:

```bash
# Authenticate docker so that you can access the ECR Repository
eval "$(aws ecr get-login --region "us-east-2" --no-include-email)"
docker push "$ECR_REPO_URL:v1"
```

## Deploy ECS Deploy Runner stack

Once we have the ECR repo with an available Docker image, it is time to configure the ECS task and Lambda function
invoker. We will deploy both using the
[ecs-deploy-runner module](https://github.com/gruntwork-io/module-ci/tree/master/modules/ecs-deploy-runner) in
`module-ci`.

Create a new module called `ecs-deploy-runner` in `infrastructure-modules`:

    infrastructure-modules
      └ cicd
        └ ecs-deploy-runner
          └ main.tf
          └ variables.tf
        └ ecr-repo
          └ main.tf
          └ outputs.tf
          └ variables.tf
      └ networking
        └ vpc-mgmt
          └ main.tf
          └ outputs.tf
          └ variables.tf

Inside of `main.tf`, configure the ECS Deploy Runner:

**infrastructure-modules/cicd/ecs-deploy-runner/main.tf**

```hcl
module "ecs_deploy_runner" {
  source = "git::git@github.com:gruntwork-io/module-ci.git//modules/ecs-deploy-runner?ref=v0.27.2"

  name             = var.name
  container_images = module.standard_config.container_images

  vpc_id         = var.vpc_id
  vpc_subnet_ids = var.private_subnet_ids
}

module "standard_config" {
  source = "git::git@github.com:gruntwork-io/module-ci.git//modules/ecs-deploy-runner-standard-configuration?ref=v0.27.2"

  terraform_planner = {
    container_image                  = var.terraform_planner_config.container_image
    infrastructure_live_repositories = var.terraform_planner_config.infrastructure_live_repositories
    secrets_manager_env_vars = merge(
      {
        DEPLOY_SCRIPT_SSH_PRIVATE_KEY = var.terraform_planner_config.repo_access_ssh_key_secrets_manager_arn
      },
      var.terraform_planner_config.secrets_manager_env_vars,
    )
    environment_vars = var.terraform_planner_config.env_vars
  }

  terraform_applier = {
    container_image                         = var.terraform_applier_config.container_image
    infrastructure_live_repositories        = var.terraform_applier_config.infrastructure_live_repositories
    allowed_apply_git_refs                  = var.terraform_applier_config.allowed_apply_git_refs
    repo_access_ssh_key_secrets_manager_arn = var.terraform_applier_config.repo_access_ssh_key_secrets_manager_arn
    secrets_manager_env_vars = merge(
      {
        DEPLOY_SCRIPT_SSH_PRIVATE_KEY = var.terraform_applier_config.repo_access_ssh_key_secrets_manager_arn
      },
      var.terraform_applier_config.secrets_manager_env_vars,
    )
    environment_vars = var.terraform_applier_config.env_vars

    # This guide is focused on infrastructure CI/CD and this feature is not used as part of infrastructure CI/CD
    # pipelines. We will cover this in our guide on how to configure application CI/CD workflows using Gruntwork
    # Pipelines.
    allowed_update_variable_names = []
    machine_user_git_info = {
      name  = ""
      email = ""
    }
  }

  # This guide is focused on infrastructure CI/CD, and so we will shut off the capabilities to build docker images and
  # AMIs in the ECS deploy runner. We will cover the docker_image_builder and ami_builder configurations in our guide on
  # how to configure application CI/CD workflows using Gruntwork Pipelines.
  docker_image_builder = null
  ami_builder          = null
}

# ---------------------------------------------------------------------------------------------------------------------
# ATTACH AWS PERMISSIONS TO ECS TASKS
# ---------------------------------------------------------------------------------------------------------------------

locals {
  configure_terraform_planner_iam_policy    = length(var.terraform_planner_config.iam_policy) > 0
  configure_terraform_applier_iam_policy    = length(var.terraform_applier_config.iam_policy) > 0
}

resource "aws_iam_role_policy" "terraform_planner" {
  count  = local.configure_terraform_planner_iam_policy ? 1 : 0
  name   = "access-to-services"
  role   = module.ecs_deploy_runner.ecs_task_iam_roles["terraform-planner"].name
  policy = data.aws_iam_policy_document.terraform_planner[0].json
}

data "aws_iam_policy_document" "terraform_planner" {
  count = local.configure_terraform_planner_iam_policy ? 1 : 0
  dynamic "statement" {
    for_each = var.terraform_planner_config.iam_policy
    content {
      sid       = statement.key
      effect    = statement.value.effect
      actions   = statement.value.actions
      resources = statement.value.resources
    }
  }
}

resource "aws_iam_role_policy" "terraform_applier" {
  count  = local.configure_terraform_applier_iam_policy ? 1 : 0
  name   = "access-to-services"
  role   = module.ecs_deploy_runner.ecs_task_iam_roles["terraform-applier"].name
  policy = data.aws_iam_policy_document.terraform_applier[0].json
}

data "aws_iam_policy_document" "terraform_applier" {
  count = local.configure_terraform_applier_iam_policy ? 1 : 0
  dynamic "statement" {
    for_each = var.terraform_applier_config.iam_policy
    content {
      sid       = statement.key
      effect    = statement.value.effect
      actions   = statement.value.actions
      resources = statement.value.resources
    }
  }
}

# ---------------------------------------------------------------------------------------------------------------------
# CREATE IAM POLICY WITH PERMISSIONS TO INVOKE THE ECS DEPLOY RUNNER VIA THE LAMBDA FUNCTION AND ATTACH TO USERS
# ---------------------------------------------------------------------------------------------------------------------

module "invoke_policy" {
  source = "git::git@github.com:gruntwork-io/module-ci.git//modules/ecs-deploy-runner-invoke-iam-policy?ref=v0.23.4"

  name                                      = "invoke-${var.name}"
  deploy_runner_invoker_lambda_function_arn = module.ecs_deploy_runner.invoker_function_arn
  deploy_runner_ecs_cluster_arn             = module.ecs_deploy_runner.ecs_cluster_arn
  deploy_runner_cloudwatch_log_group_name   = module.ecs_deploy_runner.cloudwatch_log_group_name
}

resource "aws_iam_role_policy_attachment" "attach_invoke_to_roles" {
  for_each   = length(var.iam_roles) > 0 ? { for k in var.iam_roles : k => k } : {}
  role       = each.key
  policy_arn = module.invoke_policy.arn
}
```

This module call does the following:

- Create an ECS cluster that can be used to run ECS Fargate tasks

- Configure two separate ECS Task Definition: one for running plan, and one for running apply
  (`var.terraform_planner_config` and `var.terraform_applier_config`).

- Configure the ECS Task to expose the secrets in the Secrets Manager entry with the ARN as environment variables (the
  attribute `repo_access_ssh_key_secrets_manager_arn`).

- Deploy a Lambda function that is configured to invoke the ECS task to run on Fargate in the provided VPC and subnet
  (`var.vpc_id` and `var.private_subnet_ids`).
  The information provided in `terraform_planner_config` and `terraform_applier_config` is used to restrict the
  interface so that it can only be triggered to deploy code from allowed sources (e.g., the
  `infrastructure_live_repositories` attribute is used to only allow `plan` and `apply` to run from code in those
  repositories).

- Grant permissions to invoke the Invoker Lambda function to the given list of IAM users.

- Grant permissions to access the provided AWS services to the ECS Task. Note that each task has their own set of
  permissions.

Add the corresponding input variables to `variables.tf`:

**infrastructure-modules/cicd/ecs-deploy-runner/variables.tf**

```hcl
variable "vpc_id" {
  description = "ID of the VPC where the ECS task and Lambda function should run."
  type        = string
}

variable "private_subnet_ids" {
  description = "List of IDs of private subnets that can be used for running the ECS task and Lambda function."
  type        = list(string)
}

variable "terraform_planner_config" {
  description = "Configuration options for the terraform-planner container of the ECS deploy runner stack. This container will be used for running infrastructure plan (including validate) actions in the CI/CD pipeline with Terraform / Terragrunt. Set to `null` to disable this container."
  type = object({
    # Docker repo and image tag to use as the container image for the ami builder. This should be based on the
    # Dockerfile in module-ci/modules/ecs-deploy-runner/docker/deploy-runner.
    container_image = object({
      docker_image = string
      docker_tag   = string
    })

    # An object defining the IAM policy statements to attach to the IAM role associated with the ECS task for the
    # terraform planner. Accepts a map of objects, where the map keys are sids for IAM policy statements, and the object
    # fields are the resources, actions, and the effect (\"Allow\" or \"Deny\") of the statement.
    # Note that you do not need to explicitly grant read access to the secrets manager entries set on the other
    # variables (repo_access_ssh_key_secrets_manager_arn and secrets_manager_env_vars).
    # iam_policy = {
    #   S3Access = {
    #     actions = ["s3:*"]
    #     resources = ["arn:aws:s3:::mybucket"]
    #     effect = "Allow"
    #   },
    #   EC2Access = {
    #     actions = ["ec2:*"],
    #     resources = ["*"]
    #     effect = "Allow"
    #   }
    # }
    iam_policy = map(object({
      resources = list(string)
      actions   = list(string)
      effect    = string
    }))

    # List of git repositories containing infrastructure live configuration (top level terraform or terragrunt
    # configuration to deploy infrastructure) that the deploy runner is allowed to run plan on. These should be the SSH
    # git URL of the repository (e.g., git@github.com:gruntwork-io/module-ci.git).
    # NOTE: when only a single repository is provided, this will automatically be included as a hardcoded option.
    infrastructure_live_repositories = list(string)

    # The ARN of a secrets manager entry containing the raw contents of a SSH private key to use when accessing the
    # infrastructure live repository.
    repo_access_ssh_key_secrets_manager_arn = string

    # ARNs of AWS Secrets Manager entries that you would like to expose to the terraform/terragrunt process as
    # environment variables. For example,
    # secrets_manager_env_vars = {
    #   GITHUB_OAUTH_TOKEN = "ARN_OF_PAT"
    # }
    # Will inject the secret value stored in the secrets manager entry ARN_OF_PAT as the env var `GITHUB_OAUTH_TOKEN`
    # in the container that can then be accessed through terraform/terragrunt.
    secrets_manager_env_vars = map(string)

    # Map of environment variable names to values share with the container during runtime.
    # Do NOT use this for sensitive variables! Use secrets_manager_env_vars for secrets.
    env_vars = map(string)
  })
}

variable "terraform_applier_config" {
  description = "Configuration options for the terraform-applier container of the ECS deploy runner stack. This container will be used for running infrastructure deployment actions (including automated variable updates) in the CI/CD pipeline with Terraform / Terragrunt. Set to `null` to disable this container."
  type = object({
    # Docker repo and image tag to use as the container image for the ami builder. This should be based on the
    # Dockerfile in module-ci/modules/ecs-deploy-runner/docker/deploy-runner.
    container_image = object({
      docker_image = string
      docker_tag   = string
    })

    # An object defining the IAM policy statements to attach to the IAM role associated with the ECS task for the
    # terraform applier. Accepts a map of objects, where the map keys are sids for IAM policy statements, and the object
    # fields are the resources, actions, and the effect (\"Allow\" or \"Deny\") of the statement.
    # Note that you do not need to explicitly grant read access to the secrets manager entries set on the other
    # variables (repo_access_ssh_key_secrets_manager_arn and secrets_manager_env_vars).
    # iam_policy = {
    #   S3Access = {
    #     actions = ["s3:*"]
    #     resources = ["arn:aws:s3:::mybucket"]
    #     effect = "Allow"
    #   },
    #   EC2Access = {
    #     actions = ["ec2:*"],
    #     resources = ["*"]
    #     effect = "Allow"
    #   }
    # }
    iam_policy = map(object({
      resources = list(string)
      actions   = list(string)
      effect    = string
    }))

    # List of Git repository containing infrastructure live configuration (top level terraform or terragrunt
    # configuration to deploy infrastructure) that the deploy runner is allowed to deploy. These should be the SSH git
    # URL of the repository (e.g., git@github.com:gruntwork-io/module-ci.git).
    # NOTE: when only a single repository is provided, this will automatically be included as a hardcoded option.
    infrastructure_live_repositories = list(string)

    # A list of Git Refs (branch or tag) that are approved for running apply on. Any git ref that does not match this
    # list will not be allowed to run `apply` or `apply-all`. This is useful for protecting against internal threats
    # where users have access to the CI script and bypass the approval flow by commiting a new CI flow on their branch.
    # Set to null to allow all refs to apply.
    allowed_apply_git_refs = list(string)

    # The ARN of a secrets manager entry containing the raw contents of a SSH private key to use when accessing remote
    # repository containing the live infrastructure configuration. This SSH key should be for a machine user that has write
    # access to the code when using with terraform-update-variable.
    repo_access_ssh_key_secrets_manager_arn = string

    # ARNs of AWS Secrets Manager entries that you would like to expose to the terraform/terragrunt process as
    # environment variables. For example,
    # secrets_manager_env_vars = {
    #   GITHUB_OAUTH_TOKEN = "ARN_OF_PAT"
    # }
    # Will inject the secret value stored in the secrets manager entry ARN_OF_PAT as the env var `GITHUB_OAUTH_TOKEN`
    # in the container that can then be accessed through terraform/terragrunt.
    secrets_manager_env_vars = map(string)

    # Map of environment variable names to values share with the container during runtime.
    # Do NOT use this for sensitive variables! Use secrets_manager_env_vars for secrets.
    env_vars = map(string)
  })
}

variable "name" {
  description = "Name of this instance of the deploy runner stack. Used to namespace all resources."
  type        = string
  default     = "ecs-deploy-runner"
}

variable "iam_roles" {
  description = "List of AWS IAM roles that should be given access to invoke the deploy runner."
  type        = list(string)
  default     = []
}
```

Since all the lookups for the ECS Deploy Runner can be done by name, it is not necessary for this module to expose any
outputs.

Once you test your code and the `ecs-deploy-runner` module is working the way you want, submit a
pull request, get your changes merged into the `master` branch, and create a new versioned release by using a Git tag.

Next, head over to your `infrastructure-live` repo to deploy the
stack to your environments. Add a new `terragrunt.hcl` file that calls the module. We will use Terragrunt `dependency`
blocks to get the outputs of our dependencies to pass them to the module:

Below is a sample `terragrunt.hcl` file that you can use, but it is incomplete. You will need to update all
the TODOs and set the appropriate IAM permissions for the containers (the `iam_policy` attribute) to deploy your
infrastructure.

It is tempting to grant admin permissions to both the planner and applier ECS tasks. In production it is
**strongly** recommended to take the effort to identify the least privileges the Deploy Runner needs to accomplish plan
and apply separately. `plan` runs on _every branch_, so you don’t have the typical "protected branches" permissions
during the plan action. Given that Terraform has many escape hatches that allow you to run arbitrary code even during
plan, it is important to ensure that you don’t give powerful permissions to the `terraform-planner` task.

    infrastructure-live
      └ production
        └ terragrunt.hcl
        └ us-east-2
          └ prod
            └ cicd
              └ ecr-repo
                └ terragrunt.hcl
              └ ecs-deploy-runner
                └ terragrunt.hcl
            └ networking
              └ vpc-mgmt
                └ terragrunt.hcl

**infrastructure-live/production/us-east-2/prod/cicd/ecs-deploy-runner/terragrunt.hcl**

```hcl
# Pull in the backend and provider configurations from a root terragrunt.hcl file that you include in each child terragrunt.hcl:
include {
  path = find_in_parent_folders()
}

# Set the source to an immutable released version of the infrastructure module being deployed:
terraform {
  source = "git@github.com:<YOUR_ORG>/infrastructure-modules.git//cicd/ecs-deploy-runner?ref=v0.5.0"
}

# Look up the VPC and ECR repository information using dependency blocks:
dependency "vpc" {
  config_path = "${get_terragrunt_dir()}/../../networking/vpc-mgmt"
}

dependency "ecr" {
  config_path = "${get_terragrunt_dir()}/../ecr-repo"
}

# Extract common references.
# TODO: Fill these in.
locals {
  # Name of the S3 bucket where the terraform state is stored.
  state_bucket = TODO
  # Name of the dynamodb table used to store lock records for accessing terraform state.
  state_lock_table = TODO
  # SSH Git URL of the infrastructure-live repository.
  infrastructure_live_git_url = TODO (example: git@github.com:<YOUR_ORG>/infrastructure-live.git)
  # ARN of the AWS Secrets Manager entry that contains the SSH private key.
  repo_access_ssh_key_secrets_manager_arn = TODO
}

# Configure input values for the specific environment being deployed:
inputs = {
  vpc_id             = dependency.vpc.outputs.vpc_id
  private_subnet_ids = dependency.vpc.outputs.private_subnet_ids

  terraform_planner_config = {
    container_image = {
      docker_image = dependency.ecr.outputs.url
      docker_tag   = "v1"
    }

    infrastructure_live_repositories        = [local.infrastructure_live_git_url]
    secrets_manager_env_vars                = {}
    env_vars                                = {}
    repo_access_ssh_key_secrets_manager_arn = local.repo_access_ssh_key_secrets_manager_arn

    # Include read only access for the services that you use. Here we include typical read only permissions needed for
    # deploying EC2 clusters.
    iam_policy = {
      ReadOnlyAccess = {
        effect = "Allow"
        actions = [
          "autoscaling:Describe*",
          "ec2:Describe*",
          "iam:Get*",
          "iam:List*",
          "iam:PassRole",
          "s3:Get*",
          "s3:List*",
        ]
        resources = ["*"]
      }

      # The following permissions are needed to read the remote state resources
      S3StateBucketAccess = {
        effect  = "Allow"
        actions = ["s3:*"]
        resources = [
          "arn:aws:s3:::${local.state_bucket}",
          "arn:aws:s3:::${local.state_bucket}/*",
        ]
      }
      DynamoDBLocksTableAccess = {
        effect  = "Allow"
        actions = ["dynamodb:*"]
        resources = [
          "arn:aws:dynamodb:*:*:table/${local.state_lock_table}"
        ]
      }
    }
  }

  terraform_applier_config = {
    container_image = {
      docker_image = dependency.ecr.outputs.url
      docker_tag   = "v1"
    }

    infrastructure_live_repositories        = [local.infrastructure_live_git_url]
    allowed_apply_git_refs                  = ["master"]
    secrets_manager_env_vars                = {}
    env_vars                                = {}
    repo_access_ssh_key_secrets_manager_arn = local.repo_access_ssh_key_secrets_manager_arn

    # Include access for the services that you use. Here we include typical permissions needed for deploying EC2
    # clusters.
    iam_policy = {
      DeployAccess = {
        effect    = "Allow"
        actions   = [
          "autoscaling:*",
          "ec2:*",
          "iam:*",
          "s3:*",
        ]
        resources = ["*"]
      }
      DynamoDBLocksTableAccess = {
        effect  = "Allow"
        actions = ["dynamodb:*"]
        resources = [
          "arn:aws:dynamodb:*:*:table/${local.state_lock_table}"
        ]
      }
    }
  }

  # Set this to the AWS IAM role that your machine user will assume.
  iam_roles = ["allow-auto-deploy-from-other-accounts"]
}
```

And run `terragrunt apply` to deploy the changes:

```bash
cd infrastructure-live/production/us-east-2/prod/cicd/ecs-deploy-runner
terragrunt apply
```

Repeat for each environment that you want to support the ECS Deploy Runner stack.

---
title: "ECS Deploy Runner Standard Configuration module"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="CI Modules" version="1.2.1" lastModifiedVersion="0.52.17"/>

# ECS Deploy Runner Standard Configuration module

<a href="https://github.com/gruntwork-io/terraform-aws-ci/tree/v1.2.1/modules/ecs-deploy-runner-standard-configuration" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.52.17" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This Terraform Module provides a streamlined interface to configure the [ecs-deploy-runner
module](https://github.com/gruntwork-io/terraform-aws-ci/tree/v1.2.1/modules/ecs-deploy-runner) for a standard infrastructure and applications pipeline. This includes:

*   Base pipeline of build image, update variables, deploy infrastructure with Terraform/Terragrunt.
*   Restricting git repos that can deploy infrastructure.
*   Restricting git repos that can build AMIs or Docker images.
*   Restricting parameters that can be provided to underlying scripts

## How to use the standard configuration

This module will output a map that can be passed directly into the `container_images` input variable of the
`ecs-deploy-runner` module. For example:

```hcl
module "standard_configuration" {
  source = "git::git@github.com:gruntwork-io/terraform-aws-ci.git//modules/ecs-deploy-runner-standard-configuration?ref=v1.0.8"

  # ... other args omitted for brevity ...
}

module "ecs_deploy_runner" {
  source = "git::git@github.com:gruntwork-io/terraform-aws-ci.git//modules/ecs-deploy-runner?ref=v1.0.8"

  container_images = module.standard_configuration.container_images

  # ... other args omitted for brevity ...
}
```

This will configure the ECS deploy runner to setup:

*   An ECS task for building docker images using [kaniko](https://github.com/GoogleContainerTools/kaniko).
*   An ECS task for building AMIs using `packer`.
*   An ECS task for running plan to review infrastructure deployments using `terraform` and `terragrunt`.
*   An ECS task for deploying infrastructure using `terraform` and `terragrunt`.
*   Container configurations that restrict the arguments you can pass in to the scripts, such as restricting which repos
    you can deploy infrastructure from. This is derived from the arguments you pass in to this module.

## IAM Roles

Each ECS task in the standard configuration will get its own IAM role, leading to a total of four IAM roles in the
standard deployment. To ensure that each step only has the minimal permissions necessary, the following IAM permissions
are recommended for each container:

*   [docker-image-builder](#docker-image-builder)
*   [ami-builder](#ami-builder)
*   [terraform-planner](#terraform-planner)
*   [terraform-applier](#terraform-applier)

### docker-image-builder

This task should only have the permissions necessary for building your application Docker images and pushing them to
ECR (if using ECR to store images). Note that whatever permission you bind to this IAM role **will be available to the
Docker context**.

### ami-builder

This task requires enough permissions for Packer to build AMIs. This typically involves managing a new EC2 instance,
including destroying the infrastructure at the end. It is oftentimes necessary to grant full EC2 permissions for packer
to function (Allow `ec2:*` on all resources). Note that this permission **will be made available to local actions in the
packer template**.

### terraform-planner

This task requires enough permissions to run `plan` with `terraform` and `terragrunt`. This is typically limited to read
only actions, unless you have external data sources that run arbitrary scripts that have side effects. Note that this
permission **will be made available to external scripts run through `terraform` and `terragrunt`**. For example, you can
call out to the `aws` CLI from an [external data
source](https://www.terraform.io/docs/providers/external/data_source.html) to perform arbitrary actions against your
account. Since all PRs typically go through a plan action, it is recommended to limit the permissions to read only
access to your AWS account to limit the damage that can be done by attackers with write access to the repository.

### terraform-applier

This task requires permissions necessary to deploy infrastructure `terraform` and `terragrunt`, which typically requires
admin access. Like the `terraform-planner`, note that this permission **will be made available to external scripts run
through `terraform` and `terragrunt`**. Given the potentially powerful permissions assigned to this container, it is
important to restrict deployments to only be allowed from specific Git refs that are protected by external mechanisms
(see [Github protected branches](https://help.github.com/en/github/administering-a-repository/about-protected-branches)
for more information).

## How do I invoke scripts in a given container?

You can use the [infrastructure-deployer CLI](https://github.com/gruntwork-io/terraform-aws-ci/tree/v1.2.1/modules/infrastructure-deployer) to invoke a deployed ECS deploy runner. Refer
to [How do I invoke the ECS deploy runner](https://github.com/gruntwork-io/terraform-aws-ci/tree/v1.2.1/modules/infrastructure-deployer/core-concepts.md#how-do-i-invoke-the-ecs-deploy-runner)
for more information.

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S ECS-DEPLOY-RUNNER-STANDARD-CONFIGURATION MODULE
# ------------------------------------------------------------------------------------------------------

module "ecs_deploy_runner_standard_configuration" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-ci.git//modules/ecs-deploy-runner-standard-configuration?ref=v1.2.1"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Configuration options for the ami-builder container of the ECS deploy runner
  # stack. This container will be used for building AMIs in the CI/CD pipeline
  # with packer. Set to `null` to disable this container.
  ami_builder = <object(
    container_image = object(
      docker_image = string
      docker_tag   = string
    )
    allowed_repos = list(string)
    allowed_repos_regex = list(string)
    repo_access_ssh_key_secrets_manager_arn = string
    repo_access_https_tokens = map(string)
    secrets_manager_env_vars = map(string)
    environment_vars = map(string)
  )>

  # Configuration options for the docker-image-builder container of the ECS
  # deploy runner stack. This container will be used for building docker images
  # in the CI/CD pipeline. Set to `null` to disable this container.
  docker_image_builder = <object(
    container_image = object(
      docker_image = string
      docker_tag   = string
    )
    allowed_repos = list(string)
    allowed_repos_regex = list(string)
    secrets_manager_env_vars = map(string)
    environment_vars = map(string)
  )>

  # Configuration options for the terraform-applier container of the ECS deploy
  # runner stack. This container will be used for running infrastructure
  # deployment actions (including automated variable updates) in the CI/CD
  # pipeline with Terraform / Terragrunt. Set to `null` to disable this
  # container.
  terraform_applier = <object(
    container_image = object(
      docker_image = string
      docker_tag   = string
    )
    infrastructure_live_repositories = list(string)
    infrastructure_live_repositories_regex = list(string)
    additional_allowed_options = list(string)
    allowed_update_variable_names = list(string)
    allowed_apply_git_refs = list(string)
    machine_user_git_info = object(
      name  = string
      email = string
    )
    repo_access_ssh_key_secrets_manager_arn = string
    repo_access_https_tokens = map(string)
    secrets_manager_env_vars = map(string)
    environment_vars = map(string)
  )>

  # Configuration options for the terraform-planner container of the ECS deploy
  # runner stack. This container will be used for running infrastructure plan
  # (including validate) actions in the CI/CD pipeline with Terraform /
  # Terragrunt. Set to `null` to disable this container.
  terraform_planner = <object(
    container_image = object(
      docker_image = string
      docker_tag   = string
    )
    infrastructure_live_repositories = list(string)
    infrastructure_live_repositories_regex = list(string)
    additional_allowed_options = list(string)
    secrets_manager_env_vars = map(string)
    environment_vars = map(string)
  )>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Unlike hardcoded_options, this is used for hardcoded positional args and
  # will always be passed in at the end of the args list.
  docker_image_builder_hardcoded_args = ["--idempotent"]

  # Which options and args to always pass in alongside the ones provided by the
  # command. This is a map of option keys to args to pass in. Each arg in the
  # list will be passed in as a separate option. This will be passed in first,
  # before the args provided by the user in the event data.
  docker_image_builder_hardcoded_options = {}

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S ECS-DEPLOY-RUNNER-STANDARD-CONFIGURATION MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-ci.git//modules/ecs-deploy-runner-standard-configuration?ref=v1.2.1"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Configuration options for the ami-builder container of the ECS deploy runner
  # stack. This container will be used for building AMIs in the CI/CD pipeline
  # with packer. Set to `null` to disable this container.
  ami_builder = <object(
    container_image = object(
      docker_image = string
      docker_tag   = string
    )
    allowed_repos = list(string)
    allowed_repos_regex = list(string)
    repo_access_ssh_key_secrets_manager_arn = string
    repo_access_https_tokens = map(string)
    secrets_manager_env_vars = map(string)
    environment_vars = map(string)
  )>

  # Configuration options for the docker-image-builder container of the ECS
  # deploy runner stack. This container will be used for building docker images
  # in the CI/CD pipeline. Set to `null` to disable this container.
  docker_image_builder = <object(
    container_image = object(
      docker_image = string
      docker_tag   = string
    )
    allowed_repos = list(string)
    allowed_repos_regex = list(string)
    secrets_manager_env_vars = map(string)
    environment_vars = map(string)
  )>

  # Configuration options for the terraform-applier container of the ECS deploy
  # runner stack. This container will be used for running infrastructure
  # deployment actions (including automated variable updates) in the CI/CD
  # pipeline with Terraform / Terragrunt. Set to `null` to disable this
  # container.
  terraform_applier = <object(
    container_image = object(
      docker_image = string
      docker_tag   = string
    )
    infrastructure_live_repositories = list(string)
    infrastructure_live_repositories_regex = list(string)
    additional_allowed_options = list(string)
    allowed_update_variable_names = list(string)
    allowed_apply_git_refs = list(string)
    machine_user_git_info = object(
      name  = string
      email = string
    )
    repo_access_ssh_key_secrets_manager_arn = string
    repo_access_https_tokens = map(string)
    secrets_manager_env_vars = map(string)
    environment_vars = map(string)
  )>

  # Configuration options for the terraform-planner container of the ECS deploy
  # runner stack. This container will be used for running infrastructure plan
  # (including validate) actions in the CI/CD pipeline with Terraform /
  # Terragrunt. Set to `null` to disable this container.
  terraform_planner = <object(
    container_image = object(
      docker_image = string
      docker_tag   = string
    )
    infrastructure_live_repositories = list(string)
    infrastructure_live_repositories_regex = list(string)
    additional_allowed_options = list(string)
    secrets_manager_env_vars = map(string)
    environment_vars = map(string)
  )>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Unlike hardcoded_options, this is used for hardcoded positional args and
  # will always be passed in at the end of the args list.
  docker_image_builder_hardcoded_args = ["--idempotent"]

  # Which options and args to always pass in alongside the ones provided by the
  # command. This is a map of option keys to args to pass in. Each arg in the
  # list will be passed in as a separate option. This will be passed in first,
  # before the args provided by the user in the event data.
  docker_image_builder_hardcoded_options = {}

}


```

</TabItem>
</Tabs>




## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Required

<HclListItem name="ami_builder" requirement="required" type="object(…)">
<HclListItemDescription>

Configuration options for the ami-builder container of the ECS deploy runner stack. This container will be used for building AMIs in the CI/CD pipeline with packer. Set to `null` to disable this container.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
object({
    # Docker repo and image tag to use as the container image for the ami builder. This should be based on the
    # Dockerfile in ecs-deploy-runner/docker/deploy-runner.
    container_image = object({
      docker_image = string
      docker_tag   = string
    })

    # List of repositories that are allowed to build AMIs. These should be the SSH git URL of the repository
    # (e.g., git@github.com:gruntwork-io/terraform-aws-ci.git).
    allowed_repos = list(string)

    # List of repositories (matching the regex) that are allowed to build AMIs. These should be the SSH git URL of the repository
    # (e.g., "git@github.com:gruntwork-io/.+" ).
    # Note that this is a list of individual regex because HCL doesn't allow bitwise operator: https://github.com/hashicorp/terraform/issues/25326
    allowed_repos_regex = list(string)

    # The ARN of a secrets manager entry containing the raw contents of a SSH private key to use when accessing remote
    # git repositories containing packer templates.
    repo_access_ssh_key_secrets_manager_arn = string

    # Configurations for setting up private git repo access to https based git URLs for each supported VCS platform.
    # The following keys are supported:
    #
    # - github_token_secrets_manager_arn    : The ARN of an AWS Secrets Manager entry containing contents of a GitHub
    #                                         Personal Access Token for accessing git repos over HTTPS.
    # - gitlab_token_secrets_manager_arn    : The ARN of an AWS Secrets Manager entry containing contents of a GitLab
    #                                         Personal Access Token for accessing git repos over HTTPS.
    # - bitbucket_token_secrets_manager_arn : The ARN of an AWS Secrets Manager entry containing contents of a BitBucket
    #                                         Personal Access Token for accessing git repos over HTTPS.
    #                                         bitbucket_username is required if this is set.
    # - bitbucket_username                  : The username of the BitBucket user associated with the bitbucket token
    #                                         passed in with bitbucket_token_secrets_manager_arn.
    repo_access_https_tokens = map(string)

    # Map of key value pairs where keys are environment variable names and values are ARNs of secrets manager entries to
    # inject as that variable. Note that these environment variables will be available to the packer build.
    # For the AMI builder, the following environment variables are recommended:
    # - GITHUB_OAUTH_TOKEN : Personal access token for use with gruntwork-install.
    secrets_manager_env_vars = map(string)

    # Map of environment variable names to values share with the container during runtime.
    # Do NOT use this for sensitive variables! Use secrets_manager_env_vars for secrets.
    environment_vars = map(string)
  })
```

</HclListItemTypeDetails>
<HclGeneralListItem title="More Details">
<details>


```hcl

     List of repositories that are allowed to build AMIs. These should be the SSH git URL of the repository
     (e.g., git@github.com:gruntwork-io/terraform-aws-ci.git).

```
</details>

<details>


```hcl

     List of repositories (matching the regex) that are allowed to build AMIs. These should be the SSH git URL of the repository
     (e.g., "git@github.com:gruntwork-io/.+" ).
     Note that this is a list of individual regex because HCL doesn't allow bitwise operator: https://github.com/hashicorp/terraform/issues/25326

```
</details>

<details>


```hcl

     The ARN of a secrets manager entry containing the raw contents of a SSH private key to use when accessing remote
     git repositories containing packer templates.

```
</details>

<details>


```hcl

     Configurations for setting up private git repo access to https based git URLs for each supported VCS platform.
     The following keys are supported:
    
     - github_token_secrets_manager_arn    : The ARN of an AWS Secrets Manager entry containing contents of a GitHub
                                             Personal Access Token for accessing git repos over HTTPS.
     - gitlab_token_secrets_manager_arn    : The ARN of an AWS Secrets Manager entry containing contents of a GitLab
                                             Personal Access Token for accessing git repos over HTTPS.
     - bitbucket_token_secrets_manager_arn : The ARN of an AWS Secrets Manager entry containing contents of a BitBucket
                                             Personal Access Token for accessing git repos over HTTPS.
                                             bitbucket_username is required if this is set.
     - bitbucket_username                  : The username of the BitBucket user associated with the bitbucket token
                                             passed in with bitbucket_token_secrets_manager_arn.

```
</details>

<details>


```hcl

     Map of key value pairs where keys are environment variable names and values are ARNs of secrets manager entries to
     inject as that variable. Note that these environment variables will be available to the packer build.
     For the AMI builder, the following environment variables are recommended:
     - GITHUB_OAUTH_TOKEN : Personal access token for use with gruntwork-install.

```
</details>

<details>


```hcl

     Map of environment variable names to values share with the container during runtime.
     Do NOT use this for sensitive variables! Use secrets_manager_env_vars for secrets.

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="docker_image_builder" requirement="required" type="object(…)">
<HclListItemDescription>

Configuration options for the docker-image-builder container of the ECS deploy runner stack. This container will be used for building docker images in the CI/CD pipeline. Set to `null` to disable this container.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
object({
    # Docker repo and image tag to use as the container image for the docker image builder. This should be based on the
    # Dockerfile in ecs-deploy-runner/docker/kaniko.
    container_image = object({
      docker_image = string
      docker_tag   = string
    })

    # List of repositories that are allowed to build docker images. These should be the https git URL of the repository
    # (e.g., https://github.com/gruntwork-io/terraform-aws-ci.git).
    allowed_repos = list(string)

    # List of repositories (matching the regex) that are allowed to build AMIs. These should be the https git URL of the repository
    # (e.g., "https://github\.com/gruntwork-io/.+" ).
    # Note that this is a list of individual regex because HCL doesn't allow bitwise operator: https://github.com/hashicorp/terraform/issues/25326
    allowed_repos_regex = list(string)

    # Map of key value pairs where keys are environment variable names and values are ARNs of secrets manager entries to
    # inject as that variable. Note that these environment variables will be available to the docker build. For the
    # docker image builder, the following environment variables are recommended:
    # - GIT_USERNAME : Username to use when cloning https based git repositories. Set as a Github personal access token
    #                  to clone private repos from github.
    # - GIT_PASSWORD : Password to use when cloning https based git repositories.
    # - GITHUB_OAUTH_TOKEN : Personal access token for use with gruntwork-install.
    secrets_manager_env_vars = map(string)

    # Map of environment variable names to values share with the container during runtime.
    # Do NOT use this for sensitive variables! Use secrets_manager_env_vars for secrets.
    environment_vars = map(string)
  })
```

</HclListItemTypeDetails>
<HclGeneralListItem title="More Details">
<details>


```hcl

     List of repositories that are allowed to build docker images. These should be the https git URL of the repository
     (e.g., https://github.com/gruntwork-io/terraform-aws-ci.git).

```
</details>

<details>


```hcl

     List of repositories (matching the regex) that are allowed to build AMIs. These should be the https git URL of the repository
     (e.g., "https://github\.com/gruntwork-io/.+" ).
     Note that this is a list of individual regex because HCL doesn't allow bitwise operator: https://github.com/hashicorp/terraform/issues/25326

```
</details>

<details>


```hcl

     Map of key value pairs where keys are environment variable names and values are ARNs of secrets manager entries to
     inject as that variable. Note that these environment variables will be available to the docker build. For the
     docker image builder, the following environment variables are recommended:
     - GIT_USERNAME : Username to use when cloning https based git repositories. Set as a Github personal access token
                      to clone private repos from github.
     - GIT_PASSWORD : Password to use when cloning https based git repositories.
     - GITHUB_OAUTH_TOKEN : Personal access token for use with gruntwork-install.

```
</details>

<details>


```hcl

     Map of environment variable names to values share with the container during runtime.
     Do NOT use this for sensitive variables! Use secrets_manager_env_vars for secrets.

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="terraform_applier" requirement="required" type="object(…)">
<HclListItemDescription>

Configuration options for the terraform-applier container of the ECS deploy runner stack. This container will be used for running infrastructure deployment actions (including automated variable updates) in the CI/CD pipeline with Terraform / Terragrunt. Set to `null` to disable this container.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
object({
    # Docker repo and image tag to use as the container image for the ami builder. This should be based on the
    # Dockerfile in ecs-deploy-runner/docker/deploy-runner.
    container_image = object({
      docker_image = string
      docker_tag   = string
    })

    # List of Git repositories containing infrastructure live configuration (top level terraform or terragrunt
    # configuration to deploy infrastructure) that the deploy runner is allowed to deploy. These should be the SSH git
    # URL of the repository (e.g., git@github.com:gruntwork-io/terraform-aws-ci.git).
    # NOTE: when only a single repository is provided, this will automatically be included as a hardcoded option such
    # that users of the pipeline do not need to specify the repo.
    infrastructure_live_repositories = list(string)

    # List of Git repositories (matching the regex) containing infrastructure live configuration (top level terraform or terragrunt
    # configuration to deploy infrastructure) that the deploy runner is allowed to deploy. These should be the SSH git
    # URL of the repository (e.g., git@github.com:gruntwork-io/terraform-aws-ci.git).
    # Note that this is a list of individual regex because HCL doesn't allow bitwise operator: https://github.com/hashicorp/terraform/issues/25326
    infrastructure_live_repositories_regex = list(string)

    # List of additional allowed options to pass to terraform plan. This is useful for passing in additional options
    # that are not supported by the pipeline by default. For example, if you want to pass in the -var option,
    # you would set this to ["-var"].
    additional_allowed_options = list(string)

    # List of variable names that are allowed to be automatically updated by the CI/CD pipeline. Recommended to set to:
    # ["image_version", "version", "ami_version_tag", "ami"]
    allowed_update_variable_names = list(string)

    # A list of Git Refs (branch or tag) that are approved for running apply on. Any git ref that does not match this
    # list will not be allowed to run `apply` or `apply-all`. This is useful for protecting against internal threats
    # where users have access to the CI script and bypass the approval flow by commiting a new CI flow on their branch.
    # Set to null to allow all refs to apply.
    allowed_apply_git_refs = list(string)

    # User information to use when commiting updates to the infrastructure live configuration.
    machine_user_git_info = object({
      name  = string
      email = string
    })

    # The ARN of a secrets manager entry containing the raw contents of a SSH private key to use when accessing remote
    # repository containing the live infrastructure configuration. This SSH key should be for a machine user that has write
    # access to the code when using with terraform-update-variable
    repo_access_ssh_key_secrets_manager_arn = string

    # Configurations for setting up private git repo access to https based git URLs for each supported VCS platform.
    # The following keys are supported:
    #
    # - github_token_secrets_manager_arn    : The ARN of an AWS Secrets Manager entry containing contents of a GitHub
    #                                         Personal Access Token for accessing git repos over HTTPS.
    # - gitlab_token_secrets_manager_arn    : The ARN of an AWS Secrets Manager entry containing contents of a GitLab
    #                                         Personal Access Token for accessing git repos over HTTPS.
    # - bitbucket_token_secrets_manager_arn : The ARN of an AWS Secrets Manager entry containing contents of a BitBucket
    #                                         Personal Access Token for accessing git repos over HTTPS.
    #                                         bitbucket_username is required if this is set.
    # - bitbucket_username                  : The username of the BitBucket user associated with the bitbucket token
    #                                         passed in with bitbucket_token_secrets_manager_arn.
    repo_access_https_tokens = map(string)

    # Map of key value pairs where keys are environment variable names and values are ARNs of secrets manager entries to
    # inject as that variable. Note that these environment variables will be available to the
    # infrastructure-deploy-script. For the terraform applier, the following environment variables are recommended:
    # - DEPLOY_SCRIPT_SSH_PRIVATE_KEY : The raw contents of a SSH private key to use when accessing the remote git
    #                                   repository containing the live infrastructure configuration.
    secrets_manager_env_vars = map(string)

    # Map of environment variable names to values share with the container during runtime.
    # Do NOT use this for sensitive variables! Use secrets_manager_env_vars for secrets.
    environment_vars = map(string)
  })
```

</HclListItemTypeDetails>
<HclGeneralListItem title="More Details">
<details>


```hcl

     List of Git repositories containing infrastructure live configuration (top level terraform or terragrunt
     configuration to deploy infrastructure) that the deploy runner is allowed to deploy. These should be the SSH git
     URL of the repository (e.g., git@github.com:gruntwork-io/terraform-aws-ci.git).
     NOTE: when only a single repository is provided, this will automatically be included as a hardcoded option such
     that users of the pipeline do not need to specify the repo.

```
</details>

<details>


```hcl

     List of Git repositories (matching the regex) containing infrastructure live configuration (top level terraform or terragrunt
     configuration to deploy infrastructure) that the deploy runner is allowed to deploy. These should be the SSH git
     URL of the repository (e.g., git@github.com:gruntwork-io/terraform-aws-ci.git).
     Note that this is a list of individual regex because HCL doesn't allow bitwise operator: https://github.com/hashicorp/terraform/issues/25326

```
</details>

<details>


```hcl

     List of additional allowed options to pass to terraform plan. This is useful for passing in additional options
     that are not supported by the pipeline by default. For example, if you want to pass in the -var option,
     you would set this to ["-var"].

```
</details>

<details>


```hcl

     List of variable names that are allowed to be automatically updated by the CI/CD pipeline. Recommended to set to:
     ["image_version", "version", "ami_version_tag", "ami"]

```
</details>

<details>


```hcl

     A list of Git Refs (branch or tag) that are approved for running apply on. Any git ref that does not match this
     list will not be allowed to run `apply` or `apply-all`. This is useful for protecting against internal threats
     where users have access to the CI script and bypass the approval flow by commiting a new CI flow on their branch.
     Set to null to allow all refs to apply.

```
</details>

<details>


```hcl

     User information to use when commiting updates to the infrastructure live configuration.

```
</details>

<details>


```hcl

     The ARN of a secrets manager entry containing the raw contents of a SSH private key to use when accessing remote
     repository containing the live infrastructure configuration. This SSH key should be for a machine user that has write
     access to the code when using with terraform-update-variable

```
</details>

<details>


```hcl

     Configurations for setting up private git repo access to https based git URLs for each supported VCS platform.
     The following keys are supported:
    
     - github_token_secrets_manager_arn    : The ARN of an AWS Secrets Manager entry containing contents of a GitHub
                                             Personal Access Token for accessing git repos over HTTPS.
     - gitlab_token_secrets_manager_arn    : The ARN of an AWS Secrets Manager entry containing contents of a GitLab
                                             Personal Access Token for accessing git repos over HTTPS.
     - bitbucket_token_secrets_manager_arn : The ARN of an AWS Secrets Manager entry containing contents of a BitBucket
                                             Personal Access Token for accessing git repos over HTTPS.
                                             bitbucket_username is required if this is set.
     - bitbucket_username                  : The username of the BitBucket user associated with the bitbucket token
                                             passed in with bitbucket_token_secrets_manager_arn.

```
</details>

<details>


```hcl

     Map of key value pairs where keys are environment variable names and values are ARNs of secrets manager entries to
     inject as that variable. Note that these environment variables will be available to the
     infrastructure-deploy-script. For the terraform applier, the following environment variables are recommended:
     - DEPLOY_SCRIPT_SSH_PRIVATE_KEY : The raw contents of a SSH private key to use when accessing the remote git
                                       repository containing the live infrastructure configuration.

```
</details>

<details>


```hcl

     Map of environment variable names to values share with the container during runtime.
     Do NOT use this for sensitive variables! Use secrets_manager_env_vars for secrets.

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="terraform_planner" requirement="required" type="object(…)">
<HclListItemDescription>

Configuration options for the terraform-planner container of the ECS deploy runner stack. This container will be used for running infrastructure plan (including validate) actions in the CI/CD pipeline with Terraform / Terragrunt. Set to `null` to disable this container.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
object({
    # Docker repo and image tag to use as the container image for the ami builder. This should be based on the
    # Dockerfile in ecs-deploy-runner/docker/deploy-runner.
    container_image = object({
      docker_image = string
      docker_tag   = string
    })

    # List of Git repository containing infrastructure live configuration (top level terraform or terragrunt
    # configuration to deploy infrastructure) that the deploy runner is allowed to run plan on. These should be the SSH
    # git URL of the repository (e.g., git@github.com:gruntwork-io/terraform-aws-ci.git).
    # NOTE: when only a single repository is provided, this will automatically be included as a hardcoded option such
    # that users of the pipeline do not need to specify the repo.
    infrastructure_live_repositories = list(string)

    # List of Git repositories (matching the regex) containing infrastructure live configuration (top level terraform or terragrunt
    # configuration to deploy infrastructure) that the deploy runner is allowed to deploy. These should be the SSH git
    # URL of the repository (e.g., git@github.com:gruntwork-io/terraform-aws-ci.git).
    # Note that this is a list of individual regex because HCL doesn't allow bitwise operator: https://github.com/hashicorp/terraform/issues/25326
    infrastructure_live_repositories_regex = list(string)

    # List of additional allowed options to pass to terraform plan. This is useful for passing in additional options
    # that are not supported by the pipeline by default. For example, if you want to pass in the -var option,
    # you would set this to ["-var"].
    additional_allowed_options = list(string)

    # Map of key value pairs where keys are environment variable names and values are ARNs of secrets manager entries to
    # inject as that variable. Note that these environment variables will be available to the
    # infrastructure-deploy-script. For the terraform planner, the following environment variables are recommended:
    # - DEPLOY_SCRIPT_SSH_PRIVATE_KEY : The raw contents of a SSH private key to use when accessing remote git
    #                                   repositories containing live infrastructure configuration.
    secrets_manager_env_vars = map(string)

    # Map of environment variable names to values share with the container during runtime.
    # Do NOT use this for sensitive variables! Use secrets_manager_env_vars for secrets.
    environment_vars = map(string)
  })
```

</HclListItemTypeDetails>
<HclGeneralListItem title="More Details">
<details>


```hcl

     List of Git repository containing infrastructure live configuration (top level terraform or terragrunt
     configuration to deploy infrastructure) that the deploy runner is allowed to run plan on. These should be the SSH
     git URL of the repository (e.g., git@github.com:gruntwork-io/terraform-aws-ci.git).
     NOTE: when only a single repository is provided, this will automatically be included as a hardcoded option such
     that users of the pipeline do not need to specify the repo.

```
</details>

<details>


```hcl

     List of Git repositories (matching the regex) containing infrastructure live configuration (top level terraform or terragrunt
     configuration to deploy infrastructure) that the deploy runner is allowed to deploy. These should be the SSH git
     URL of the repository (e.g., git@github.com:gruntwork-io/terraform-aws-ci.git).
     Note that this is a list of individual regex because HCL doesn't allow bitwise operator: https://github.com/hashicorp/terraform/issues/25326

```
</details>

<details>


```hcl

     List of additional allowed options to pass to terraform plan. This is useful for passing in additional options
     that are not supported by the pipeline by default. For example, if you want to pass in the -var option,
     you would set this to ["-var"].

```
</details>

<details>


```hcl

     Map of key value pairs where keys are environment variable names and values are ARNs of secrets manager entries to
     inject as that variable. Note that these environment variables will be available to the
     infrastructure-deploy-script. For the terraform planner, the following environment variables are recommended:
     - DEPLOY_SCRIPT_SSH_PRIVATE_KEY : The raw contents of a SSH private key to use when accessing remote git
                                       repositories containing live infrastructure configuration.

```
</details>

<details>


```hcl

     Map of environment variable names to values share with the container during runtime.
     Do NOT use this for sensitive variables! Use secrets_manager_env_vars for secrets.

```
</details>

</HclGeneralListItem>
</HclListItem>

### Optional

<HclListItem name="docker_image_builder_hardcoded_args" requirement="optional" type="list(string)">
<HclListItemDescription>

Unlike hardcoded_options, this is used for hardcoded positional args and will always be passed in at the end of the args list.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[
  &quot;--idempotent&quot;
]"/>
</HclListItem>

<HclListItem name="docker_image_builder_hardcoded_options" requirement="optional" type="map(list(…))">
<HclListItemDescription>

Which options and args to always pass in alongside the ones provided by the command. This is a map of option keys to args to pass in. Each arg in the list will be passed in as a separate option. This will be passed in first, before the args provided by the user in the event data.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
map(list(string))
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="container_images">
<HclListItemDescription>

Configuration map for the ecs-deploy-runner module that can be passed straight in as the container_images input variable.

</HclListItemDescription>
</HclListItem>

</TabItem>
</Tabs>

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-ci/tree/v1.2.1/modules/ecs-deploy-runner-standard-configuration/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-ci/tree/v1.2.1/modules/ecs-deploy-runner-standard-configuration/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-ci/tree/v1.2.1/modules/ecs-deploy-runner-standard-configuration/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "7b4d12942f4c92e72af8b8700d8fe32b"
}
##DOCS-SOURCER-END -->

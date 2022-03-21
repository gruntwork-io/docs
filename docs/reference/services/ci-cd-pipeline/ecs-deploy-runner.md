---
type: "service"
name: "ECS Deploy Runner"
description: "Use a CI/CD pipeline for deploying infrastructure code updates."
category: "ci-cd"
cloud: "aws"
tags: ["ci-cd","pipelines","ci","cd"]
license: "gruntwork"
built-with: "terraform, bash, packer"
title: "ECS Deploy Runner"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemTypeDetails, HclListItemDefaultValue } from '../../../../src/components/HclListItem.tsx';

<VersionBadge version="0.85.0" lastModifiedVersion="0.85.0"/>

# ECS Deploy Runner


<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/modules/mgmt/ecs-deploy-runner" className="link-button">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases?q=mgmt%2Fecs-deploy-runner" className="link-button" title="Release notes for only the service catalog versions which impacted this service.">Release Notes</a>

## Overview

This service deploys ECS Deploy Runner, the central component of [Gruntwork Pipelines](https://gruntwork.io/pipelines).

![Gruntwork Pipelines architecture](/img/reference/services/ci-cd-pipeline/pipelines-architecture.png)

Gruntwork Pipelines is a code framework and approach that enables you to use your preferred CI tool to set up an
end-to-end pipeline for infrastructure code (Terraform) and app code packaged in multiple formats, including container
images (Docker) and Amazon Machine Images (AMIs built with Packer).

## Features

*   Set up a Terraform and Terragrunt pipeline based on best practices
*   Run deployments using Fargate or EC2 tasks on the ECS cluster
*   Configure the pipeline for building Packer and Docker images and for running `plan` and `apply` operations
*   Grant fine-grained permissions for running deployments with minimum necessary privileges
*   Stream output from the pipeline to CloudWatch Logs
*   Protect secrets needed by the pipeline using AWS Secrets Manager
*   Use KMS grants to allow the ECS task containers to access shared secrets and encrypted images between accounts
*   Easily upgrade Terraform versions with Terraform version management support

Under the hood, this is all implemented using Terraform modules from the Gruntwork
[terraform-aws-ci](https://github.com/gruntwork-io/terraform-aws-ci) repo.

## Learn

:::note

This repo is a part of the [Gruntwork Service Catalog](https://github.com/gruntwork-io/terraform-aws-service-catalog/),
a collection of reusable, battle-tested, production ready infrastructure code.
If you’ve never used the Service Catalog before, make sure to read
[How to use the Gruntwork Service Catalog](https://docs.gruntwork.io/reference/services/intro/overview)!

:::

### Core concepts

*   For a comprehensive guide to Gruntwork Pipelines, refer to
    [How to configure a production-grade CI-CD workflow for infrastructure code](https://docs.gruntwork.io/guides/build-it-yourself/pipelines/).
*   For an overview of how the various parts fit together to form the complete pipeline, refer to the
    [ECS Deploy Runner Core Concepts](https://github.com/gruntwork-io/terraform-aws-ci/blob/master/modules/ecs-deploy-runner/core-concepts.md#overview).
*   The rest of the docs within the
    [ecs-deploy-runner module in the terraform-aws-ci repository](https://github.com/gruntwork-io/terraform-aws-ci/blob/master/modules/ecs-deploy-runner/README.adoc)
    may also help with context.
*   The [ECS Deploy Runner standard configuration](https://github.com/gruntwork-io/terraform-aws-ci/blob/master/modules/ecs-deploy-runner-standard-configuration/README.md)
    is a shortcut for setting up the `ecs-deploy-runner` module in a manner consistent with Gruntwork recommendations.

## Deploy

### Non-production deployment (quick start for learning)

If you just want to try this repo out for experimenting and learning, check out the following resources:

*   [examples/for-learning-and-testing folder](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/examples/for-learning-and-testing): The
    `examples/for-learning-and-testing` folder contains standalone sample code optimized for learning, experimenting, and
    testing (but not direct production usage).

### Production deployment

If you want to deploy this repo in production, check out the following resources:

*   [shared account ecs-deploy-runner configuration in the for-production folder](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/examples/for-production/infrastructure-live/shared/us-west-2/mgmt/ecs-deploy-runner/):
    The `examples/for-production` folder contains sample code optimized for direct usage in production. This is code from
    the [Gruntwork Reference Architecture](https://gruntwork.io/reference-architecture/), and it shows you how we build an
    end-to-end, integrated tech stack on top of the Gruntwork Service Catalog.

## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

<br/>

### Required

<HclListItem name="ami_builder_config" description="Configuration options for the ami-builder container of the ECS deploy runner stack. This container will be used for building AMIs in the CI/CD pipeline using packer. Set to `null` to disable this container." requirement="required" type="object">
<HclListItemTypeDetails>

```hcl
object({
    # Docker repo and image tag to use as the container image for the ami builder. This should be based on the
    # Dockerfile in terraform-aws-ci/modules/ecs-deploy-runner/docker/deploy-runner.
    container_image = object({
      docker_image = string
      docker_tag   = string
    })

    # An object defining the IAM policy statements to attach to the IAM role associated with the ECS task for the
    # ami builder. Accepts a map of objects, where the map keys are sids for IAM policy statements, and the object
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

    # List of repositories that are allowed to build docker images. These should be the SSH git URL of the repository
    # (e.g., git@github.com:gruntwork-io/terraform-aws-ci.git).
    allowed_repos = list(string)

    # List of repositories (matching the regex) that are allowed to build AMIs. These should be the SSH git URL of the repository
    # (e.g., "(git@github.com:gruntwork-io/)+" ).
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

    # ARNs of AWS Secrets Manager entries that you would like to expose to the packer process as environment
    # variables. For example,
    # secrets_manager_env_vars = {
    #   GITHUB_OAUTH_TOKEN = "ARN_OF_PAT"
    # }
    # Will inject the secret value stored in the secrets manager entry ARN_OF_PAT as the env var `GITHUB_OAUTH_TOKEN`
    # in the container that can then be passed through to the AMI via the `env` directive in the packer template.
    secrets_manager_env_vars = map(string)

    # Map of environment variable names to values share with the container during runtime.
    # Do NOT use this for sensitive variables! Use secrets_manager_env_vars for secrets.
    environment_vars = map(string)
  })
```

</HclListItemTypeDetails>
</HclListItem>

<HclListItem name="docker_image_builder_config" description="Configuration options for the docker-image-builder container of the ECS deploy runner stack. This container will be used for building docker images in the CI/CD pipeline. Set to `null` to disable this container." requirement="required" type="object">
<HclListItemTypeDetails>

```hcl
object({
    # Docker repo and image tag to use as the container image for the docker image builder. This should be based on the
    # Dockerfile in terraform-aws-ci/modules/ecs-deploy-runner/docker/kaniko.
    container_image = object({
      docker_image = string
      docker_tag   = string
    })

    # An object defining the IAM policy statements to attach to the IAM role associated with the ECS task for the docker
    # image builder. Accepts a map of objects, where the map keys are sids for IAM policy statements, and the object
    # fields are the resources, actions, and the effect (\"Allow\" or \"Deny\") of the statement.
    # Note that you do not need to explicitly grant read access to the secrets manager entries set on the other
    # variables (git_config and secrets_manager_env_vars).
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

    # List of repositories that are allowed to build docker images. These should be the https git URL of the repository
    # (e.g., https://github.com/gruntwork-io/terraform-aws-ci.git).
    allowed_repos = list(string)

    # List of repositories (matching the regex) that are allowed to build AMIs. These should be the https git URL of the repository
    # (e.g., "https://github.com/gruntwork-io/.+" ).
    # Note that this is a list of individual regex because HCL doesn't allow bitwise operator: https://github.com/hashicorp/terraform/issues/25326
    allowed_repos_regex = list(string)

    # ARNs of AWS Secrets Manager entries that can be used for authenticating to HTTPS based git repos that contain the
    # Dockerfile for building the images. The associated user is recommended to be limited to read access only.
    #
    # Settings for each git service provider:
    #
    # Github:
    # - `username_secrets_manager_arn` should contain a valid Personal Access Token for the corresponding machine user.
    # - `password_secrets_manager_arn` should be set to null.
    #
    # BitBucket:
    # - `username_secrets_manager_arn` should contain the bitbucket username for the corresponding machine user.
    # - `password_secrets_manager_arn` should contain a valid App password for the corresponding machine user.
    #
    # GitLab:
    # - `username_secrets_manager_arn` should contain the hardcoded string "oauth2" (without the quotes).
    # - `password_secrets_manager_arn` should contain a valid Personal Access Token for the corresponding machine user.
    git_config = object({
      username_secrets_manager_arn = string
      password_secrets_manager_arn = string
    })

    # ARNs of AWS Secrets Manager entries that you would like to expose to the docker build process as environment
    # variables that can be passed in as build args. For example,
    # secrets_manager_env_vars = {
    #   GITHUB_OAUTH_TOKEN = "ARN_OF_PAT"
    # }
    # Will inject the secret value stored in the secrets manager entry ARN_OF_PAT as the env var `GITHUB_OAUTH_TOKEN`
    # in the container that can then be passed through to the docker build if you pass in
    # `--build-arg GITHUB_OAUTH_TOKEN`.
    secrets_manager_env_vars = map(string)

    # Map of environment variable names to values share with the container during runtime.
    # Do NOT use this for sensitive variables! Use secrets_manager_env_vars for secrets.
    environment_vars = map(string)
  })
```

</HclListItemTypeDetails>
</HclListItem>

<HclListItem name="private_subnet_ids" description="List of IDs of private subnets that can be used for running the ECS task and Lambda function." requirement="required" type="list">
<HclListItemTypeDetails>

```hcl
list(string)
```

</HclListItemTypeDetails>
</HclListItem>

<HclListItem name="terraform_applier_config" description="Configuration options for the terraform-applier container of the ECS deploy runner stack. This container will be used for running infrastructure deployment actions (including automated variable updates) in the CI/CD pipeline with Terraform / Terragrunt. Set to `null` to disable this container." requirement="required" type="object">
<HclListItemTypeDetails>

```hcl
object({
    # Docker repo and image tag to use as the container image for the ami builder. This should be based on the
    # Dockerfile in terraform-aws-ci/modules/ecs-deploy-runner/docker/deploy-runner.
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
    # URL of the repository (e.g., git@github.com:gruntwork-io/terraform-aws-ci.git).
    # NOTE: when only a single repository is provided, this will automatically be included as a hardcoded option.
    infrastructure_live_repositories = list(string)

    # List of Git repositories (matching the regex) containing infrastructure live configuration (top level terraform or terragrunt
    # configuration to deploy infrastructure) that the deploy runner is allowed to deploy. These should be the SSH git
    # URL of the repository (e.g., git@github.com:gruntwork-io/terraform-aws-ci.git).
    # Note that this is a list of individual regex because HCL doesn't allow bitwise operator: https://github.com/hashicorp/terraform/issues/25326
    infrastructure_live_repositories_regex = list(string)

    # List of variable names that are allowed to be automatically updated by the CI/CD pipeline. Recommended to set to:
    # ["tag", "docker_tag", "ami_version_tag", "ami"]
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
    # access to the code when using with terraform-update-variable.
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
    environment_vars = map(string)
  })
```

</HclListItemTypeDetails>
</HclListItem>

<HclListItem name="terraform_planner_config" description="Configuration options for the terraform-planner container of the ECS deploy runner stack. This container will be used for running infrastructure plan (including validate) actions in the CI/CD pipeline with Terraform / Terragrunt. Set to `null` to disable this container." requirement="required" type="object">
<HclListItemTypeDetails>

```hcl
object({
    # Docker repo and image tag to use as the container image for the ami builder. This should be based on the
    # Dockerfile in terraform-aws-ci/modules/ecs-deploy-runner/docker/deploy-runner.
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
    # git URL of the repository (e.g., git@github.com:gruntwork-io/terraform-aws-ci.git).
    # NOTE: when only a single repository is provided, this will automatically be included as a hardcoded option.
    infrastructure_live_repositories = list(string)

    # List of Git repositories (matching the regex) containing infrastructure live configuration (top level terraform or terragrunt
    # configuration to deploy infrastructure) that the deploy runner is allowed to deploy. These should be the SSH git
    # URL of the repository (e.g., git@github.com:gruntwork-io/terraform-aws-ci.git).
    # Note that this is a list of individual regex because HCL doesn't allow bitwise operator: https://github.com/hashicorp/terraform/issues/25326
    infrastructure_live_repositories_regex = list(string)

    # The ARN of a secrets manager entry containing the raw contents of a SSH private key to use when accessing the
    # infrastructure live repository.
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
    environment_vars = map(string)
  })
```

</HclListItemTypeDetails>
</HclListItem>

<HclListItem name="vpc_id" description="ID of the VPC where the ECS task and Lambda function should run." requirement="required" type="string">
</HclListItem>

### Optional

<HclListItem name="additional_container_images" description="Container configurations that should be added to the ECS Deploy Runner that should be added in addition to the standard containers. This can be used to customize your deployment of the ECS Deploy Runner beyond the standard use cases." requirement="optional" type="map">
<HclListItemTypeDetails>

```hcl
map(object({
    # Docker container identifiers
    docker_image = string
    docker_tag   = string

    # Map of environment variable names to secret manager arns of secrets to share with the container during runtime.
    # Note that the container processes will not be able to directly read these secrets directly using the Secrets
    # Manager API (they are only available implicitly through the env vars).
    secrets_manager_env_vars = map(string)

    # Map of environment variable names to values share with the container during runtime.
    # Do NOT use this for sensitive variables! Use secrets_manager_env_vars for secrets.
    environment_vars = map(string)

    # List of additional secrets manager entries that the container should have access to, but not directly injected as
    # environment variables. These secrets can be read by the container processes using the Secrets Manager API, unlike
    # those shared as environment variables with `secrets_manager_env_vars`.
    additional_secrets_manager_arns = list(string)

    # Security configuration for each script for each container. Each entry in the map corresponds to a script in the
    # triggers directory. If a script is not included in the map, then the default is to allow no additional args to be
    # passed in when invoked.
    script_config = map(object({
      # Which options and args to always pass in alongside the ones provided by the command.
      # This is a map of option keys to args to pass in. Each arg in the list will be passed in as a separate option.
      # E.g., if you had {'foo': ['bar', 'baz', 'car']}, then this will be: `--foo bar --foo baz --foo car`
      # This will be passed in first, before the args provided by the user in the event data.
      hardcoded_options = map(list(string))

      # Unlike hardcoded_options, this is used for hardcoded positional args and will always be passed in at the end of
      # the args list.
      hardcoded_args = list(string)

      # Whether or not positional args are allowed to be passed in.
      allow_positional_args = bool

      # This is a list of option keys that are explicitly allowed. When set, any option key that is not present in this
      # list will cause an exception. Note that `null` means allow any option, as opposed to `[]` which means allow no
      # option. Only one of `allowed_options` or `restricted_options` should be used.
      allowed_options = list(string)

      # List of options without arguments
      allowed_options_without_args = list(string)

      # This is a list of option keys that are not allowed. When set, any option key passed in that is in this list will
      # cause an exception. Empty list means allow any option (unless restricted by allowed_options).
      restricted_options = list(string)

      # This is a map of option keys to a regex for specifying what args are allowed to be passed in for that option key.
      # There is no restriction to the option if there is no entry in this map.
      restricted_options_regex = map(string)
    }))

    # Whether or not the particular container is the default container for the pipeline. This container is used when no
    # name is provided to the infrastructure deployer. Exactly one must be marked as the default. An arbitrary container
    # will be picked amongst the list of defaults when multiple are marked as default.
    # If no containers are marked as default, then the invoker lambda function always requires a container name to be
    # provided.
    default = bool
  }))
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="cloudwatch_log_group_for_ec2_kms_key_id" description="The ID (ARN, alias ARN, AWS ID) of a customer managed KMS Key to use for encrypting log data." requirement="optional" type="string">
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="cloudwatch_log_group_for_ec2_retention_in_days" description="The number of days to retain log events in the log group. Refer to https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudwatch_log_group#retention_in_days for all the valid values. When null, the log events are retained forever." requirement="optional" type="number">
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="cloudwatch_log_group_for_ec2_tags" description="Tags to apply on the CloudWatch Log Group, encoded as a map where the keys are tag keys and values are tag values." requirement="optional" type="map">
<HclListItemTypeDetails>

```hcl
map(string)
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="container_cpu" description="The default CPU units for the instances that Fargate will spin up. The invoker allows users to override the CPU at run time, but this value will be used if the user provides no value for the CPU. Options here: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/AWS_Fargate.html#fargate-tasks-size." requirement="optional" type="number">
<HclListItemDefaultValue defaultValue="1024"/>
</HclListItem>

<HclListItem name="container_default_launch_type" description="The default launch type of the ECS deploy runner workers. This launch type will be used if it is not overridden during invocation of the lambda function. Must be FARGATE or EC2." requirement="optional" type="string">
<HclListItemDefaultValue defaultValue="FARGATE"/>
</HclListItem>

<HclListItem name="container_max_cpu" description="The maximum CPU units that is allowed to be specified by the user when invoking the deploy runner with the Lambda function." requirement="optional" type="number">
<HclListItemDefaultValue defaultValue="8192"/>
</HclListItem>

<HclListItem name="container_max_memory" description="The maximum memory units that is allowed to be specified by the user when invoking the deploy runner with the Lambda function." requirement="optional" type="number">
<HclListItemDefaultValue defaultValue="32768"/>
</HclListItem>

<HclListItem name="container_memory" description="The default memory units for the instances that Fargate will spin up. The invoker allows users to override the memory at run time, but this value will be used if the user provides no value for memory. Options here: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/AWS_Fargate.html#fargate-tasks-size." requirement="optional" type="number">
<HclListItemDefaultValue defaultValue="2048"/>
</HclListItem>

<HclListItem name="docker_image_builder_hardcoded_args" description="Unlike hardcoded_options, this is used for hardcoded positional args and will always be passed in at the end of the args list." requirement="optional" type="list">
<HclListItemTypeDetails>

```hcl
list(string)
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="['--idempotent']"/>
</HclListItem>

<HclListItem name="docker_image_builder_hardcoded_options" description="Which options and args to always pass in alongside the ones provided by the command. This is a map of option keys to args to pass in. Each arg in the list will be passed in as a separate option. This will be passed in first, before the args provided by the user in the event data." requirement="optional" type="map">
<HclListItemTypeDetails>

```hcl
map(list(string))
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="ec2_worker_pool_configuration" description="Worker configuration of a EC2 worker pool for the ECS cluster. An EC2 worker pool supports caching of Docker images, so your builds may run faster, whereas Fargate is serverless, so you have no persistent EC2 instances to manage and pay for. If null, no EC2 worker pool will be allocated and the deploy runner will be in Fargate only mode. Note that when this variable is set, this example module will automatically lookup and use the base ECS optimized AMI that AWS provides." requirement="optional" type="any">
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="ecs_task_cloudwatch_log_group_kms_key_id" description="The ID (ARN, alias ARN, AWS ID) of a customer managed KMS Key to use for encrypting log data." requirement="optional" type="string">
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="ecs_task_cloudwatch_log_group_name" description="A custom name to set for the CloudWatch Log Group used to stream the container logs. When null, the Log Group will default to /ecs/{var.name}." requirement="optional" type="string">
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="ecs_task_cloudwatch_log_group_retention_in_days" description="The number of days to retain log events in the log group. Refer to https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudwatch_log_group#retention_in_days for all the valid values. When null, the log events are retained forever." requirement="optional" type="number">
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="ecs_task_cloudwatch_log_group_subscription_destination_arn" description="The ARN of the destination to deliver matching log events to. Kinesis stream or Lambda function ARN. Only applicable if <a href=#ecs_task_should_create_cloudwatch_log_group><code>ecs_task_should_create_cloudwatch_log_group</code></a> is true, and <a href=#container_images><code>container_images</code></a> is non-empty." requirement="optional" type="string">
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="ecs_task_cloudwatch_log_group_subscription_distribution" description="The method used to distribute log data to the destination. Only applicable when <a href=#ecs_task_cloudwatch_log_group_subscription_destination_arn><code>ecs_task_cloudwatch_log_group_subscription_destination_arn</code></a> is a kinesis stream. Valid values are `Random` and `ByLogStream`." requirement="optional" type="string">
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="ecs_task_cloudwatch_log_group_subscription_filter_pattern" description="A valid CloudWatch Logs filter pattern for subscribing to a filtered stream of log events." requirement="optional" type="string">
<HclListItemDefaultValue defaultValue=""/>
</HclListItem>

<HclListItem name="ecs_task_cloudwatch_log_group_subscription_role_arn" description="ARN of an IAM role that grants Amazon CloudWatch Logs permissions to deliver ingested log events to the destination. Only applicable when <a href=#ecs_task_cloudwatch_log_group_subscription_destination_arn><code>ecs_task_cloudwatch_log_group_subscription_destination_arn</code></a> is a kinesis stream." requirement="optional" type="string">
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="ecs_task_cloudwatch_log_group_tags" description="Tags to apply on the CloudWatch Log Group, encoded as a map where the keys are tag keys and values are tag values." requirement="optional" type="map">
<HclListItemTypeDetails>

```hcl
map(string)
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="ecs_task_should_create_cloudwatch_log_group" description="When true, precreate the CloudWatch Log Group to use for log aggregation from the ECS Task execution. This is useful if you wish to customize the CloudWatch Log Group with various settings such as retention periods and KMS encryption. When false, AWS ECS will automatically create a basic log group to use." requirement="optional" type="bool">
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="iam_groups" description="List of AWS IAM groups that should be given access to invoke the deploy runner." requirement="optional" type="list">
<HclListItemTypeDetails>

```hcl
list(string)
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="iam_roles" description="List of AWS IAM roles that should be given access to invoke the deploy runner." requirement="optional" type="list">
<HclListItemTypeDetails>

```hcl
list(string)
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="iam_users" description="List of AWS IAM usernames that should be given access to invoke the deploy runner." requirement="optional" type="list">
<HclListItemTypeDetails>

```hcl
list(string)
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="invoke_schedule" description="Configurations for invoking ECS Deploy Runner on a schedule. Use this to configure any periodic background jobs that you would like run through the ECS Deploy Runner (e.g., regularly running plan on your infrastructure to detect drift). Input is a map of unique schedule name to its settings." requirement="optional" type="map">
<HclListItemTypeDetails>

```hcl
map(object({
    # Name of the container in ECS Deploy Runner that should be invoked (e.g., terraform-planner).
    container_name = string

    # The script within the container that should be invoked (e.g., infrastructure-deploy-script).
    script = string

    # The args that should be passed to the script.
    args = string

    # An expression that defines the schedule. For example, cron(0 20 * * ? *) or rate(5 minutes).
    schedule_expression = string
  }))
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="invoker_lambda_cloudwatch_log_group_kms_key_id" description="The ID (ARN, alias ARN, AWS ID) of a customer managed KMS Key to use for encrypting log data for the invoker lambda function." requirement="optional" type="string">
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="invoker_lambda_cloudwatch_log_group_retention_in_days" description="The number of days to retain log events in the log group for the invoker lambda function. Refer to https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudwatch_log_group#retention_in_days for all the valid values. When null, the log events are retained forever." requirement="optional" type="number">
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="invoker_lambda_cloudwatch_log_group_tags" description="Tags to apply on the CloudWatch Log Group for the invoker lambda function, encoded as a map where the keys are tag keys and values are tag values." requirement="optional" type="map">
<HclListItemTypeDetails>

```hcl
map(string)
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="invoker_lambda_should_create_cloudwatch_log_group" description="When true, precreate the CloudWatch Log Group to use for log aggregation from the invoker lambda function execution. This is useful if you wish to customize the CloudWatch Log Group with various settings such as retention periods and KMS encryption. When false, AWS Lambda will automatically create a basic log group to use." requirement="optional" type="bool">
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="kms_grant_opt_in_regions" description="Create multi-region resources in the specified regions. The best practice is to enable multi-region services in all enabled regions in your AWS account. This variable must NOT be set to null or empty. Otherwise, we won't know which regions to use and authenticate to, and may use some not enabled in your AWS account (e.g., GovCloud, China, etc). To get the list of regions enabled in your AWS account, you can use the AWS CLI: aws ec2 describe-regions." requirement="optional" type="list">
<HclListItemTypeDetails>

```hcl
list(string)
```

</HclListItemTypeDetails>
<HclListItemDefaultValue>

```hcl
['eu-north-1','ap-south-1','eu-west-3','eu-west-2','eu-west-1','ap-northeast-2','ap-northeast-1','sa-east-1','ca-central-1','ap-southeast-1','ap-southeast-2','eu-central-1','us-east-1','us-east-2','us-west-1','us-west-2']
```

</HclListItemDefaultValue>
</HclListItem>

<HclListItem name="name" description="Name of this instance of the deploy runner stack. Used to namespace all resources." requirement="optional" type="string">
<HclListItemDefaultValue defaultValue="ecs-deploy-runner"/>
</HclListItem>

<HclListItem name="outbound_security_group_name" description="When non-null, set the security group name of the ECS Deploy Runner ECS Task to this string. When null, a unique name will be generated by Terraform to avoid conflicts when deploying multiple instances of the ECS Deploy Runner." requirement="optional" type="string">
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="shared_secrets_enabled" description="If true, this module will create grants for a given shared secrets KMS key. You must pass a value for shared_secrets_kms_cmk_arn if this is set to true. Defaults to false." requirement="optional" type="bool">
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="shared_secrets_kms_cmk_arn" description="The ARN of the KMS CMK used for sharing AWS Secrets Manager secrets between accounts." requirement="optional" type="string">
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="should_create_cloudwatch_log_group_for_ec2" description="When true, precreate the CloudWatch Log Group to use for log aggregation from the EC2 instances. This is useful if you wish to customize the CloudWatch Log Group with various settings such as retention periods and KMS encryption. When false, the CloudWatch agent will automatically create a basic log group to use." requirement="optional" type="bool">
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="snapshot_encryption_kms_cmk_arns" description="Map of names to ARNs of KMS CMKs that are used to encrypt snapshots (including AMIs). This module will create the necessary KMS key grants to allow the respective deploy containers access to utilize the keys for managing the encrypted snapshots. The keys are arbitrary names that are used to identify the key." requirement="optional" type="map">
<HclListItemTypeDetails>

```hcl
map(string)
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="use_managed_iam_policies" description="When true, all IAM policies will be managed as dedicated policies rather than inline policies attached to the IAM roles. Dedicated managed policies are friendlier to automated policy checkers, which may scan a single resource for findings. As such, it is important to avoid inline policies when targeting compliance with various security standards." requirement="optional" type="bool">
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<br/>

<HclListItem name="cloudwatch_log_group_name" description="Name of the CloudWatch Log Group used to store the log output from the Deploy Runner ECS task.">
</HclListItem>

<HclListItem name="default_ecs_task_arn" description="AWS ARN of the default ECS Task Definition. Can be used to trigger the ECS Task directly.">
</HclListItem>

<HclListItem name="ecs_cluster_arn" description="AWS ARN of the ECS Cluster that can be used to run the deploy runner task.">
</HclListItem>

<HclListItem name="ecs_task_arns" description="Map of AWS ARNs of the ECS Task Definition. There are four entries, one for each container in the standard config (docker-image-builder ; ami-builder ; terraform-planner ; terraform-applier).">
</HclListItem>

<HclListItem name="ecs_task_execution_role_arn" description="ECS Task execution role ARN">
</HclListItem>

<HclListItem name="ecs_task_families" description="Map of the families of the ECS Task Definition that is currently live. There are four entries, one for each container in the standard config (docker-image-builder ; ami-builder ; terraform-planner ; terraform-applier).">
</HclListItem>

<HclListItem name="ecs_task_iam_roles" description="Map of AWS ARNs and names of the IAM role that will be attached to the ECS task to grant it access to AWS resources. Each container will have its own IAM role. There are four entries, one for each container in the standard config (docker-image-builder ; ami-builder ; terraform-planner ; terraform-applier).">
</HclListItem>

<HclListItem name="ecs_task_revisions" description="Map of the current revision of the ECS Task Definition that is currently live. There are four entries, one for each container in the standard config (docker-image-builder ; ami-builder ; terraform-planner ; terraform-applier).">
</HclListItem>

<HclListItem name="invoke_policy_arn" description="The ARN of the IAM policy that allows access to the invoke the deploy runner.">
</HclListItem>

<HclListItem name="invoker_function_arn" description="AWS ARN of the invoker lambda function that can be used to invoke a deployment.">
</HclListItem>

<HclListItem name="invoker_function_name" description="Name of the invoker lambda function that can be used to invoke a deployment.">
</HclListItem>

<HclListItem name="security_group_allow_all_outbound_id" description="Security Group ID of the ECS task">
</HclListItem>

</TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"service-catalog-api","hash":"3de525c3daf725215ebc9f88f3f0fc37"}
##DOCS-SOURCER-END -->

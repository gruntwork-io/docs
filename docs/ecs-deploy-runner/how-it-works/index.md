# How it works

:::info Newer Version Available
This documentation pertains to an old version of Gruntwork Pipelines which used the `infrastructure-pipelines` repository. [Click here](../../pipelines/overview/) to view documentation for the most recent version.
:::

![Gruntwork Pipelines Architecture](/img/guides/build-it-yourself/pipelines/tftg-pipeline-architecture.png)

## External CI Tool

Gruntwork Pipelines has been validated with [CircleCI](https://circleci.com/), [GitHub Actions](https://github.com/features/actions), and [GitLab](https://about.gitlab.com/). However, it can be used with any external CI/CD tool.
The role of the CI/CD tool is to trigger jobs inside Gruntwork Pipelines.
We have [example configurations](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/examples/for-production/infrastructure-live/_ci/scripts)
that identify changed terraform modules and call the Gruntwork Pipelines invoker Lambda function.

By default, the invoker Lambda function is run by a CLI tool called `infrastructure-deployer` from within your CI tool.

## ECS Deploy Runner

The [ECS Deploy Runner Module](https://github.com/gruntwork-io/terraform-aws-ci/tree/main/modules/ecs-deploy-runner)
is a flexible framework for running pre-defined, locked-down jobs in an isolated
ECS task. It serves as the foundation for Gruntwork Pipelines.
The components described below work together to trigger jobs, validate them, run them, and stream
the logs back to your CI tool as if they were running locally.

### Infrastructure Deployer CLI

The [Infrastructure Deployer CLI tool](https://github.com/gruntwork-io/terraform-aws-ci/tree/main/modules/infrastructure-deployer)
serves as the interface between your chosen CI tool and Gruntwork Pipelines. It is used to trigger
jobs in the deploy-runner. Primarily, it calls instances of the invoker lambda described in the next section.

Usage:

`infrastructure-deployer --aws-region AWS_REGION [other options] -- CONTAINER_NAME SCRIPT ARGS...`

When launching a task, you may optionally set the following useful flags:

- `max-wait-time` (default 2h0m0s) — timeout length for the action, this can be any golang parseable string
- `task-cpu` — A custom number of CPU units to allocate to the ECS task
- `task-memory` — A custom number of memory units to allocate to the ECS task

To get the list of supported containers and scripts, pass in the `--describe-containers` option. For example:

`infrastructure-deployer --describe-containers --aws-region us-west-2`

This will list all the containers and the scripts for each container that can be invoked using the invoker function of
the ECS deploy runner stack deployed in `us-west-2`.


### Invoker Lambda

The [Invoker Lambda](https://github.com/gruntwork-io/terraform-aws-ci/blob/main/modules/ecs-deploy-runner/invoker-lambda/invoker/index.py)
is an AWS Lambda function written in Python that acts as the AWS entrypoint for your pipeline.
It has 3 primary roles:

1. Serving as a gatekeeper for pipelines runs, determining if a particular command is allowed to be run, and if the arguments are valid
2. Creating ECS tasks that run terraform, docker, or packer commands
3. Shipping deployment logs back to your CI/CD tool

### Standard Configuration

The ECS deploy runner is flexible and can be configured for many tasks.  The [standard configuration](https://github.com/gruntwork-io/terraform-aws-ci/tree/main/modules/ecs-deploy-runner-standard-configuration)
is a set of ECS task definitions that we ship with Pipelines by default.
Once you have your pipeline deployed you can [modify the ECS Deploy Runner configuration](../maintain/extending.md) as you like.
The configuration defines what scripts are accepted by the invoker Lambda and which arguments may be provided. The invoker Lambda
will reject _any_ script or argument not defined in the ECS Deploy Runner configuration.
The default tasks are defined below.

#### Docker Image Builder (Kaniko)

The Docker Image Builder task definition allows CI jobs to build docker images.
This ECS task uses an open source library called [Kaniko](https://github.com/GoogleContainerTools/kaniko) to enable docker builds from within a docker container.
We provide a [Docker image](https://github.com/gruntwork-io/terraform-aws-ci/tree/main/modules/ecs-deploy-runner/docker/kaniko) based on Kaniko for this task.

#### Packer AMI Builder

The Packer AMI Builder task definition allows CI jobs to build AMIs using HashiCorp Packer. This task runs in
a [Docker image](https://github.com/gruntwork-io/terraform-aws-ci/tree/main/modules/ecs-deploy-runner/docker/deploy-runner) we provide.

#### Terraform Planner and Applier

The Terraform Planner task definition and Terraform Applier task definition are very similar. They allow CI jobs to
plan and apply Terraform and Terragrunt code. These tasks run in the same [Docker image](https://github.com/gruntwork-io/terraform-aws-ci/tree/main/modules/ecs-deploy-runner/docker/deploy-runner)
as the AMI builder.


<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "54a11ef2c99ee2c379ea199e14e8a669"
}
##DOCS-SOURCER-END -->

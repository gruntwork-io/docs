---
title: "Lambda Container Entrypoint Command"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="AWS Lambda" version="0.24.0" lastModifiedVersion="0.20.3"/>

<!-- Frontmatter
type: service
name: Lambda Container Entrypoint Command
description: Container entrypoint command for Lambda functions to securely manage secrets.
category: secrets
cloud: aws
tags: ["lambda"]
license: gruntwork
built-with: go
-->

<a href="https://github.com/gruntwork-io/terraform-aws-lambda/tree/v0.24.0/modules/run-lambda-entrypoint" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.20.3" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

# Lambda Container Entrypoint Command

This module contains a Go CLI (`run-lambda-entrypoint`) that wraps any container Lambda runtime interface client. The
primary feature of this CLI is to provide a secure way to inject secrets from Secrets Manager as environment variables
to the lambda runtime. This entrypoint will pull the provided secrets manager entry and map each key-value pair in the
secrets manager entry to environment variables that are injected into the lambda runtime.

This module only includes an entrypoint CLI. If you are looking for a module to deploy container based Lambda functions,
refer to the [lambda](https://github.com/gruntwork-io/terraform-aws-lambda/tree/v0.24.0/modules/lambda) module.

## Motivation

Lambda functions do not have native support for Secrets Manager. To work around this, many frameworks such as
[serverless](https://www.serverless.com/) rely on reading the secrets at deploy time and configuring them in the
environment variable settings of the Lambda function (see [this guide from Serverless for
example](https://www.serverless.com/blog/aws-secrets-management/)).

However, environment variable settings are exposed in plain text in the Lambda function metadata. This means that anyone
who has read access to the Lambda function metadata can retrieve the secrets being configured in plain text, by passing
the encryption guarantees of Secrets Manager!

The canonical way to avoid this is to bake the secrets reading setup into the application itself, which adds overhead to
the configuration system for the serverless applications. This module allows users to delegate this responsibility of
retrieving secrets from secrets manager to an external script without modifying their application (assuming the
application can be configured with environment variables).

## Features

*   Expose secrets from Secrets Manager as environment variables to the Lambda function.
*   Only leaks the Secrets Manager ARN to Lambda function configuration settings, and not the secrets themselves.
*   Support a custom path for [the Lambda Runtime Interface
    Emulator](https://docs.aws.amazon.com/lambda/latest/dg/images-test.html).

## Learn

:::note

This repo is a part of the [the Gruntwork Infrastructure as Code Library](https://gruntwork.io/infrastructure-as-code-library/),
a collection of reusable, battle-tested, production ready infrastructure code.
If you’ve never used the Gruntwork Modules before, make sure to read
[Using Gruntwork Terraform Modules](https://docs.gruntwork.io/guides/working-with-code/using-modules)!

:::

*   [How to create a Lambda container image?](https://docs.aws.amazon.com/lambda/latest/dg/images-create.html)

## Deploy

### Non-production deployment (quick start for learning)

If you just want to try this repo out for experimenting and learning, check out the following resources:

*   [examples/lambda-docker](https://github.com/gruntwork-io/terraform-aws-lambda/tree/v0.24.0/examples/lambda-docker): This example contains a sample `Dockerfile` that uses this
    entrypoint to expose secrets to a python based Lambda function.

## Manage

### How do I install this entrypoint in a container without leaking the GitHub Token into the container?

The canonical way to install this module into a container would be through the
[gruntwork-installer](https://github.com/gruntwork-io/gruntwork-installer). You can install the `gruntwork-installer`
and use that to build + install this entrypoint script using the following `RUN` command in the `Dockerfile`:

```docker
ARG terraform_aws_lambda_version=v0.19.0

RUN curl -Ls https://raw.githubusercontent.com/gruntwork-io/gruntwork-installer/main/bootstrap-gruntwork-installer.sh | bash /dev/stdin --version v0.0.37 \
    && gruntwork-install \
      --repo "https://github.com/gruntwork-io/terraform-aws-lambda" \
      --module-name "run-lambda-entrypoint" \
      --tag "$terraform_aws_lambda_version"
```

However, since `terraform-aws-lambda` is a private repo, you must provide a valid [GitHub Personal Access
Token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)
of a user who has access to the Gruntwork Library. The problem is that when you set a build arg, this will leak into the
final container image.

The standard solution to this is to use [a multi-stage
build](https://docs.docker.com/develop/develop-images/multistage-build/). In this approach, you separate your docker
build into two steps:

1.  First stage with secrets passed in using `build-arg`.
2.  Second stage denoting the final image, which copies the binary from the first stage.

In this approach, the build args are not leaked into the final image since the final image only has the history for the
second stage. However, this results in slower build times since Docker can not take advantage of caching.

Another approach to avoid leaking secrets is by taking advantage of secrets management in [Docker
Buildkit](https://docs.docker.com/develop/develop-images/build_enhancements/). Using Buildkit secrets, you can pass in
any environment variable to the container without any worry of the secret leaking.

### How do I test the container locally using the Runtime Interface Emulator?

Almost all of the base Lambda Docker container images come standard with the Runtime Interface Emulator (RIE). However,
for some runtimes (e.g., Golang), you may want to use a [distroless container
image](https://github.com/GoogleContainerTools/distroless) as your base. In this case, you will need to install the
Lambda RIE manually and manage how it is called.

The challenge with implementing this is that in a distroless image, you intentionally do not have a shell available.
This means that you can't implement a custom entrypoint script to handle the logic of invoking with the RIE only when
the image is run locally.

To support this use case, the `run-lambda-entrypoint` CLI includes the ability to invoke the RIE only when the container
is not running in a Lambda environment. When `run-lambda-entrypoint` is invoked with the arg `--rie-path`, it will wrap
the provided entrypoint script with the RIE when running in local mode.

Refer to the [secret-reflector-go](https://github.com/gruntwork-io/terraform-aws-lambda/tree/v0.24.0/examples/lambda-docker/secret-reflector-go) example for an example of how to set
this up with a Go based Lambda function.

### How do I pass in Secrets Manager ARNs for environment variable lookup?

The entrypoint relies on environment variables configured on the Lambda function to know which Secrets Manager entries
to lookup. Any Secrets Manager entry encoded as a JSON object of key=value pairs is supported. The entrypoint will take
all the keys and values in the JSON object stored in Secrets Manager and loads them into environment variables for the
underlying Lambda function.

The entrypoint looks for Secrets Manager ARNs to read in as environment variables from the following Lambda function
environment variables

*   `SECRETS_MANAGER_ARN`
*   Any environment variable prefixed with `LAMBDA_ENV_SECRETS_MANAGER_ARN_`.

For example, you can configure the Lambda function to look up three different Secrets Manager entries by configuring the
following environment variables on the function:

```json
{
    "LAMBDA_ENV_SECRETS_MANAGER_ARN_ECR": "arn:aws:secretsmanager:us-east-1:************:secret:my-secrets-for-ecr-1SvgR7",
    "LAMBDA_ENV_SECRETS_MANAGER_ARN_RDS": "arn:aws:secretsmanager:us-east-1:************:secret:my-secrets-for-db-1SvgR7",
    "LAMBDA_ENV_SECRETS_MANAGER_ARN_APP": "arn:aws:secretsmanager:us-east-1:************:secret:my-secrets-for-app-1SvgR7"
}
```

Note that if you are passing in multiple Secrets Manager entries and they contain duplicate keys, then the entrypoint
will load the Secrets Manager entry passed in with `SECRETS_MANAGER_ARN` first, and then merge the additional entries in
lexicographic order.

For example, using the above example, the entrypoint will merge the variables in the following order:

```
SECRETS_MANAGER_ARN => LAMBDA_ENV_SECRETS_MANAGER_ARN_APP => LAMBDA_ENV_SECRETS_MANAGER_ARN_ECR => LAMBDA_ENV_SECRETS_MANAGER_ARN_RDS
```

If you wish to have more control over the ordering, insert a prefix on the suffix that you can use to control the
ordering. E.g.:

```
SECRETS_MANAGER_ARN => LAMBDA_ENV_SECRETS_MANAGER_ARN_P0_RDS => LAMBDA_ENV_SECRETS_MANAGER_ARN_P1_ECR => LAMBDA_ENV_SECRETS_MANAGER_ARN_P3_APP
```

Note that the passed in ARN can also reference a Secrets Manager name. If the value is not an ARN, the entrypoint CLI
will assume it is the name of a Secrets Manager entry in the same region as the Lambda function.


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-lambda/tree/v0.24.0/modules/run-lambda-entrypoint/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-lambda/tree/v0.24.0/modules/run-lambda-entrypoint/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-lambda/tree/v0.24.0/modules/run-lambda-entrypoint/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "a8560d78dffdafe5346e6e4c844d716d"
}
##DOCS-SOURCER-END -->

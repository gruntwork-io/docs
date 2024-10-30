# Adding Pipelines to an existing repository


:::info
In July 2024 Gruntwork released a new configuration paradigm for Pipelines referred to as ["Pipelines Configuration as Code."](/2.0/reference/pipelines/configurations-as-code).  This new system allows developers to use pipelines with arbitrary folder layouts inside their IaC repositories.  Prior to this system, pipelines required using a specific folder layout in order to map folders in source control to AWS Accounts for authentication.  As of Q4 2024 this new configuration system does not yet support Gruntwork Account Factory, and so if you're using both Pipelines and Account factory we strongly advise you to start with a [new repository](/2.0/docs/pipelines/installation/addingnewrepo).
:::

## Installing Pipelines

Pipelines relies on configurations written in [HashiCorp Configuration Language (HCL)](https://github.com/hashicorp/hcl) to drive dynamic behavior. These configurations are primarily used by Pipelines to determine how to interact with cloud environments within the context of the Infrastructure As Code (IaC) within a code repository.

At a high level, Pipelines will read these configurations by parsing all files that end with `.hcl` within a directory named `.gruntwork` or a single file named `gruntwork.hcl`. In typical usage, the configurations that are global to the git repository will be defined within the `.gruntwork` directory at the root of the repository, and configurations that are specific to a particular `terragrunt.hcl` file (a "unit") located in the same directory as the `terragrunt.hcl` file.

## Minimum Required Configuration

The minimum configurations required for Pipelines to operate correctly will vary depending on context. For the most common usage, Pipelines will need to be able to determine how to authenticate with a cloud provider in order to run Terragrunt commands. If it is not able to determine how to authenticate within a context where it needs to be able to do so, Pipelines will throw an error.

The following is an example of a minimal configuration for a single Terragrunt unit that tells Pipelines how to authenticate with AWS using OIDC:

```hcl
# gruntwork.hcl
unit {
  authentication {
    aws_oidc {
      account_id         = "an-aws-account-id"
      plan_iam_role_arn  = "arn:aws:iam::an-aws-account-id:role-to-assume-for-plans"
      apply_iam_role_arn = "arn:aws:iam::an-aws-account-id:role-to-assume-for-applies"
    }
  }
}
```

Placing this configuration in a `gruntwork.hcl` file in the same directory as a `terragrunt.hcl` file will cause Pipelines to assume the `role-to-assume-for-plans` role in the AWS account with ID `an-aws-account-id` when running Terragrunt plan commands, using [OIDC](https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/configuring-openid-connect-in-amazon-web-services) to authenticate to AWS and assume that role.

In most circumstances, the same role would be assumed by multiple Terragrunt units of configuration within a repository (e.g. all units within a given directory configure resources for the same AWS account). In this situation, it would be more convenient to set the AWS authentication at the environment level by declaring an `enivronment` block in one of the `.hcl` files in the `.gruntwork` directory at the root of the repository, and declaring the AWS authentication configuration there.

e.g.

```hcl
# .gruntwork/environments.hcl
environment "an_environment" {
  filter {
    paths = ["an-environment/*"]
  }

  authentication {
    aws_oidc {
      account_id         = "an-aws-account-id"
      plan_iam_role_arn  = "arn:aws:iam::an-aws-account-id:role-to-assume-for-plans"
      apply_iam_role_arn = "arn:aws:iam::an-aws-account-id:role-to-assume-for-applies"
    }
  }
}
```

In this example, all the units located within the `an-environment` directory sibling to the `.gruntwork` directory will assume the `role-to-assume-for-plans` role in the AWS account with ID `an-aws-account-id` when running Terragrunt plan commands by Pipelines.

A typical approach to building Pipelines configurations is to first define minimal configurations that address the most common use-cases, and then to refactor and generalize those configurations as needed to reduce repetition.

More details on how these configurations are defined will be detailed below.

## Primer on HCL Terminology

HCL is an extensible configuration language developed by HashiCorp. See [this](https://github.com/hashicorp/hcl/blob/main/hclsyntax/spec.md) for the full specification.

The main terminology you need to know to understand the documentation below includes:

### Blocks

A block is a collection of nested configurations that are defined within curly braces `{}`, immediately after the identifier of the block.

:::tip
A `filter` block is nested in the `environment` block in the example above.
:::

### Attributes

An attribute is a key-value pair separated by an `=` that is defined within a block.

:::tip
The `paths` attribute is defined within the `filter` block in the example above.
:::

### Labels

A label is one or more strings that are used to qualify a block.

:::tip
The `an_environment` label is used to qualify the `environment` block in the example above.
:::

## Configuration Hierarchy

Pipelines configurations are designed to be organized into a hierarchy. This hierarchy reflects the specificity of configurations, with configurations more specific to a single unit of IaC taking precedence over configurations that are more general when they are in conflict.

The hierarchy of configurations is as follows:

### Repository Configurations

These are the most general configurations that are applicable to the entire repository, regardless of working directory context. They are always defined in [global configurations](#global-configurations) via [repository blocks](#repository-blocks).

These configurations are the most general and will always be overridden by more specific configurations when they are in conflict.

### Environment Configurations

These are configurations that are applicable to a specific environment within a repository. They are only ever applicable to units that match a specific [filter](#filter-blocks). They are always defined in [global configurations](#global-configurations) via [environment blocks](#environment-blocks).

These configurations are more specific than repository configurations, and as such override repository configurations when they are in conflict within the context of a matched filter.

### Unit Configurations

These are configurations that are applicable to a single unit of IaC within a repository. They are always defined in [local configurations](#local-configurations) via [unit blocks](#unit-blocks).

These configurations are the most specific and will always override other configurations when they are in conflict.

## Global Configurations

Any configurations located within a `.gruntwork` directory either in the current working directory, or a parent directory of the current working directory are referred to as global configurations. These configurations are typically applicable within a wide range of contexts within a repository, and are the primary mechanism for configuring Pipelines.

Pipelines will attempt to find exactly one directory named `.gruntwork` when it is attempting to discover configurations. It will not continue to search for configurations in parent directories once it finds a `.gruntwork` directory.

Note that you will frequently see filenames for configurations within the `.gruntwork` directory that are named after the configuration block that they define. This is a common pattern, but not a requirement. Any `.hcl` file found within a `.gruntwork` directory will be parsed by Pipelines as one global configuration.

### Environment Blocks

Environment blocks are used to define configurations that are applicable to a specific environment within a repository.

The label applied to an environment block is the name of the environment. This is a user-defined label for the environment, and must be globally unique.

e.g.

```hcl
# .gruntwork/environments.hcl
environment "an_environment" {
  filter {
    paths = ["an-environment/*"]
  }

  authentication {
    aws_oidc {
      account_id         = "an-aws-account-id"
      plan_iam_role_arn  = "arn:aws:iam::an-aws-account-id:role-to-assume-for-plans"
      apply_iam_role_arn = "arn:aws:iam::an-aws-account-id:role-to-assume-for-applies"
    }
  }
}
```

In this example, the `an_environment` environment is defined to match all units located within the `an-environment` directory sibling to the `.gruntwork` directory. All units that match this filter will assume the `role-to-assume-for-plans` role in the AWS account with ID `an-aws-account-id` when running Terragrunt plan commands by Pipelines.

Environment blocks should reference other configuration blocks rather than continuously redefining configurations when possible.

As such, you will typically see environment blocks that look more like the following:

```hcl
# .gruntwork/environments.hcl
environment "an_environment" {
  filter {
    paths = ["an-environment/*"]
  }

  authentication {
    aws_oidc {
      account_id         = aws.accounts.all.an_account.id
      plan_iam_role_arn  = "arn:aws:iam::${aws.accounts.all.an_account.id}:role-to-assume-for-plans"
      apply_iam_role_arn = "arn:aws:iam::${aws.accounts.all.an_account.id}:role-to-assume-for-applies"
    }
  }
}

aws {
  accounts "all" {
    path = "aws/accounts.yml"
  }
}
```

More on configuration components like [aws](#aws-blocks) blocks can be found below.

*Supported Blocks:*

- `filter` (Required): A filter block that determines which units the environment is applicable to. See [Filter Blocks](#filter-blocks) for more information.
- `authentication` (Required): An authentication block that determines how Pipelines will authenticate with cloud platforms when running Terragrunt commands. See [Authentication Blocks](#authentication-blocks) for more information.

:::caution
Every unit must be uniquely matched by the filters of a single environment block. If a unit is matched by multiple environment blocks, Pipelines will throw an error.
:::

### AWS Blocks

AWS blocks are configurations used by `aws-oidc` [authentication](#authentication-blocks) blocks to have commonly re-used AWS configurations codified and referenced by multiple authentication blocks.

There can only be one `aws` block defined within [global configurations](#global-configurations).

Nested within the `aws` block are `accounts` blocks that define the configurations for collections of AWS accounts.

The label applied to an `accounts` block is the name of the Accounts block. This is a user-defined label for the collection of AWS accounts defined by the block, and must be unique within the context of the `aws` block.

e.g.

```hcl
# .gruntwork/aws.hcl
aws {
  accounts "all" {
    path = "aws/accounts.yml"
  }
}
```

In this example, the `all` AWS accounts block is defined within an `aws` block in a file named `aws.hcl` within the `.gruntwork` directory.

The `all` Accounts block references an external file located at `aws/accounts.yml` via the `path` attribute that contains the definitions of AWS accounts in YAML format.

DevOps Foundations customers may be familiar with the `accounts.yml` file as a file that is used by Account Factory to define the configurations of AWS accounts. Pipelines uses the same schema for the `accounts.yml` file as Account Factory. Consequently, the `accounts.yml` file that is used by Account Factory can be used by the `accounts` block without modification.

The expected schema for the `accounts.yml` file is as follows:

```yaml
# required: Name of an account
an_account:
  # required: The AWS account ID
  id: "an-aws-account-id"
  # optional: The email address of the account owner
  owner_email: "an-email-address"
  # optional: Whether or not a VPC has been created in the account. Default is false.
  vpc_created: true
```

Note that multiple AWS Accounts blocks can be defined, pointing to different `accounts.yml` files. This allows for the segmentation of AWS accounts into different YAML files for organizational purposes.

:::info
The decision to leverage YAML files instead of HCL files for defining the configurations for AWS accounts was an intentional decision to increase the portability of these configurations for usage outside of Pipelines. Tools like [Terragrunt](https://github.com/gruntwork-io/terragrunt/) and [yq](https://github.com/mikefarah/yq) can be used to leverage these files, as they are more portable than HCL files.
:::

*Supported Attributes:*

- `path` (Required): The path to the YAML file that contains the definitions of AWS accounts.

### Repository Blocks

Repository blocks are used to define configurations that are applicable to the entire repository.

e.g.

```hcl
repository {
  deploy_branch_name = "main"
}
```

In this example, the `deploy_branch_name` attribute is set to `main`, which means that Pipelines will deploy infrastructure changes when the `main` branch is updated.

*Supported Attributes:*

- `deploy_branch_name` (Optional): The branch that Pipelines will deploy infrastructure changes from. If not set, Pipelines will deploy infrastructure changes from the `main` branch.
- `consolidate_added_or_changed` (Optional): Whether or not Pipelines will consolidate added or changed resources when running Terragrunt commands. If not set, Pipelines will consolidate added or changed resources.

  :::info

  Job consolidation is the mechanism whereby Pipelines will take multiple jobs (e.g. `ModuleAdded`, `ModuleChanged`) and consolidate them into a single job (e.g. `ModulesAddedOrChanged`) when running Terragrunt commands.

  This is a useful optimization that Pipelines can perform, as it divides the CI/CD costs of running Terragrunt in CI by the number of jobs that are consolidated. In addition, this results in more accurate runs, as it allows Terragrunt to leverage the Directed Acyclic Graph (DAG) to order updates.

  e.g. Instead of running the following jobs:
  A. `ModuleAdded`
  B. `ModuleChanged`

  Where `ModuleChanged` depends on `ModuleAdded`, Pipelines will consolidate these jobs into a single job:
  C. `ModulesAddedOrChanged`

  Because the underlying implementation of a `ModulesAddedOrChanged` uses the `run-all` Terragrunt command, it will use the DAG to ensure that the `ModuleAdded` job runs before the `ModuleChanged` job.

  :::

  :::tip

  In very rare circumstances, you may want to disable this in order to maximize the resources allocated to your CI/CD run. This is not generally recommended, but can be a useful workaround if the runner you are using is exhausting allocated resources.

  :::

- `consolidate_deleted` (Optional): Whether or not Pipelines will consolidate deleted resources when running Terragrunt plan commands. If not set, Pipelines will not consolidate deleted resources.

  :::caution

  This is disabled by default because there can be unintended consequences to deleting additional resources via a `run-all` Terragrunt command. It is recommended to enable this feature only when you are confident that you understand the implications of doing so.

  :::

## Local Configurations

The configurations found within a directory that contains a `terragrunt.hcl` file are referred to as local configurations. These configurations are typically used to define configurations that are specific to a single unit of IaC within a repository.

They must be specified within a single file named `gruntwork.hcl` in the same directory as the `terragrunt.hcl` file.

Local configurations can be used both to define the complete configurations required for Pipelines to operate within the context of a single unit, or to override global configurations that are defined in the `.gruntwork` directory.

### Unit Blocks

Unit blocks are used to define configurations that are applicable to a single unit of IaC within a repository.

e.g.

```hcl
unit {
  authentication {
    aws_oidc {
      account_id         = "an-aws-account-id"
      plan_iam_role_arn  = "arn:aws:iam::an-aws-account-id:role-to-assume-for-plans"
      apply_iam_role_arn = "arn:aws:iam::an-aws-account-id:role-to-assume-for-applies"
    }
  }
}
```

In this example, the `unit` block is defined to assume the `role-to-assume-for-plans` role in the AWS account with ID `an-aws-account-id` when running Terragrunt plan commands by Pipelines.

*Supported Blocks:*

- `authentication` (Required): An authentication block that determines how Pipelines will authenticate with cloud platforms when running Terragrunt commands. See [Authentication Blocks](#authentication-blocks) for more information.

## Configuration Components

Some configurations are only relevant within the context of other configurations. These configurations are referred to as configuration components. Some configuration components are required for other configurations to be valid, while others can be used to reduce repetition in configurations.

### Filter Blocks

Filter blocks are components used by [environment](#environment-blocks) blocks to determine where certain configurations are applicable.

e.g.

```hcl
filter {
  paths = ["a-folder/*"]
}
```

All configuration blocks that contain a `filter` block will only be applied to units that match the filter.

*Supported Attributes:*

- `paths` (Required): A list of path globs that the filter should match against. Paths are relative to the directory containing the `.gruntwork` directory.

### Authentication Blocks

Authentication blocks are components used by [environment](#environment-blocks) and [unit](#unit-blocks) blocks to determine how Pipelines will authenticate with cloud platforms when running Terragrunt commands.

:::note
Authentication blocks wrap other, more specific authentication blocks that are used to authenticate with specific cloud platforms. When Pipelines encounters an `authentication` block, it will attempt to authenticate with all cloud platforms defined within the block.

At this time, the only supported block that can be nested within the `authentication` block is `aws_oidc`.
:::

:::tip
Authentication blocks can be defined at both the environment and unit levels. When defined at the environment level, they will be applied to all units that match the filter of the environment.

When defined at the unit level, they will only be applied to the unit that contains the block. Unit-level authentication blocks will override environment-level authentication blocks when they are in conflict.
:::

e.g.

```hcl
authentication {
  aws_oidc {
    account_id     = "an-aws-account-id"
    plan_iam_role  = "arn:aws:iam::an-aws-account-id:role-to-assume-for-plans"
    apply_iam_role = "arn:aws:iam::an-aws-account-id:role-to-assume-for-applies"
  }
}
```

In this example, Pipelines will use OIDC to authenticate with AWS and assume the `role-to-assume-for-plans` role in the AWS account with ID `an-aws-account-id` when running Terragrunt plan commands.

*Supported Blocks:*

- `aws_oidc` (Required): An AWS OIDC authentication block that determines how Pipelines will authenticate with AWS using OIDC. See [AWS OIDC Authentication Blocks](#aws-oidc-authentication-blocks) for more information.
  - `account_id` (Required): The AWS account ID that Pipelines will authenticate with.
  - `plan_iam_role_arn` (Required): The IAM role ARN that Pipelines will assume when running Terragrunt plan commands.
  - `apply_iam_role_arn` (Required): The IAM role ARN that Pipelines will assume when running Terragrunt apply commands.
  - `region` (Optional): The AWS region that Pipelines will use when running Terragrunt commands. If not set, Pipelines will use the default region of `us-east-1`.
  - `session_duration` (Optional): The duration in seconds that the AWS session will be valid for. If not set, Pipelines will use the default session duration of `3600` seconds.
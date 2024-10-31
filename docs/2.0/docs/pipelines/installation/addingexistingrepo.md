# Adding Pipelines to an existing repository


:::info
In July 2024 Gruntwork released a new configuration paradigm for Pipelines referred to as ["Pipelines Configuration as Code."](/2.0/reference/pipelines/configurations-as-code).  This new system allows developers to use pipelines with arbitrary folder layouts inside their IaC repositories. Prior to this system, pipelines required using a specific folder layout in order to map folders in source control to AWS Accounts for authentication. As of Q4 2024 this new configuration system does not yet support Gruntwork Account Factory, and so if you're using both Pipelines and Account factory we strongly advise you to start with a [new repository](/2.0/docs/pipelines/installation/addingnewrepo).
:::

## Pipelines Configuration as Code

Pipelines relies on configurations written in [HashiCorp Configuration Language (HCL)](https://github.com/hashicorp/hcl) to drive dynamic behavior. These configurations are primarily used by Pipelines to determine how to interact with cloud environments within the context of the Infrastructure As Code (IaC) within a code repository.

At a high level, Pipelines will read these configurations by parsing all files that end with `.hcl` within a directory named `.gruntwork` or a single file named `gruntwork.hcl`. In typical usage, the configurations that are global to the git repository will be defined within the `.gruntwork` directory at the root of the repository, and configurations that are specific to a particular `terragrunt.hcl` file (a "unit") will be located in the same directory as the `terragrunt.hcl` file.

:::info
We recommend reading our [concepts page](../concepts/hcl-config-language.md) on the HCL language to ensure you're up to date on the specifics of HCL before diving into pipelines configuration
:::

## Installation Process

The steps below are a high level description of the steps to install pipelines in an existing repository with an arbitrary folder structure of IaC.  The content in the rest of this document goes into detail on how to apply the configurations to match how your IaC is structured.

<ol>
<li>Identify where your account authentication information is stored. This is typically in a file named `accounts.yml` in the root of your repository, although you can also store the file in another location or inline the configuration in an [aws block](#aws-blocks) in your pipelines configuration.</li>
<li>Create a file called `.gruntwork/gruntwork.hcl` in the root of your repository</li>
<li>Apply the [basic configurations below](#basic-configuration) to your `gruntwork.hcl` file</li>
<li>Augment the `gruntwork.hcl` file with additional configurations as needed to match your IaC structure</li>
<li>Install the pipelines workflow files</li>
</ol>

## Installing the Pipelines workflow files

Pipelines is implemented as a GitHub [reusable workflow](https://docs.github.com/en/actions/sharing-automations/reusing-workflows#creating-a-reusable-workflow). This means that the code to implement Pipelines and all of its features lives in an external repository (generally you'll point to [ours](https://github.com/gruntwork-io/pipelines-workflows/)) and the code in your repository simply makes a reference.

* Create a file called `.github/workflows/pipelines.yml`
* The contents of the file should be sourced from our template [here](https://github.com/gruntwork-io/.terraform-aws-architecture-catalog/blob/main/templates/devops-foundations-infrastructure-live-root/.github/workflows/pipelines.yml)
* NOTE: As of writing this in October 2024 the above template points to a boilerplate template which is not directly usable; the file is meant to be rendered by boilerplate into a usable file.  Please reach out to your Gruntwork solutions architect for assistance if you need help rendering the template.

## Basic Configuration

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

[Full Reference for Environment Blocks](/2.0/reference/pipelines/configurations-as-code#environment)

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

:::caution
Every unit must be uniquely matched by the filters of a single environment block. If a unit is matched by multiple environment blocks, Pipelines will throw an error.
:::

### AWS Blocks

[Full Reference for AWS Blocks](/2.0/reference/pipelines/configurations-as-code#aws)

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

### Repository Blocks

[Full Reference for Repository Blocks](/2.0/reference/pipelines/configurations-as-code#repository)

Repository blocks are used to define configurations that are applicable to the entire repository.

e.g.

```hcl
repository {
  deploy_branch_name = "main"
}
```

In this example, the `deploy_branch_name` attribute is set to `main`, which means that Pipelines will deploy infrastructure changes when the `main` branch is updated.

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

## Local Configurations

The configurations found within a directory that contains a `terragrunt.hcl` file are referred to as local configurations. These configurations are typically used to define configurations that are specific to a single unit of IaC within a repository.

They must be specified within a single file named `gruntwork.hcl` in the same directory as the `terragrunt.hcl` file.

Local configurations can be used both to define the complete configurations required for Pipelines to operate within the context of a single unit, or to override global configurations that are defined in the `.gruntwork` directory.

### Unit Blocks

[Full Reference for Unit Blocks](/2.0/reference/pipelines/configurations-as-code#unit)

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

## Configuration Components

Some configurations are only relevant within the context of other configurations. These configurations are referred to as configuration components. Some configuration components are required for other configurations to be valid, while others can be used to reduce repetition in configurations.

### Filter Blocks

[Full Reference for Filter Blocks](/2.0/reference/pipelines/configurations-as-code#filter)

Filter blocks are components used by [environment](#environment-blocks) blocks to determine where certain configurations are applicable.

e.g.

```hcl
filter {
  paths = ["a-folder/*"]
}
```

All configuration blocks that contain a `filter` block will only be applied to units that match the filter.


### Authentication Blocks

[Full Reference for Authentication Blocks](/2.0/reference/pipelines/configurations-as-code#authentication)

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
# Pipelines Configurations as Code

Pipelines uses configurations written in [HashiCorp Configuration Language (HCL)](https://github.com/hashicorp/hcl) to enable dynamic behavior. These configurations direct Pipelines in managing interactions with cloud environments, using Infrastructure as Code (IaC) stored in a repository.

Pipelines reads its configuration from a `.gruntwork` directory at the root of the repository. Pipelines parses every `.hcl` file in that directory as global configuration that applies to the whole repository. To override the configuration for an individual unit, place a single file named `gruntwork.hcl` alongside the unit's `terragrunt.hcl`.

:::info

We recommend reviewing our [concepts page](/2.0/docs/pipelines/concepts/hcl-config-language) on the HCL language to ensure familiarity with its features before configuring Pipelines.
:::

## Basic configuration

The minimum configuration required for Pipelines to function is a `.gruntwork` directory at the root of the repository containing at least one `environment` block. The `environment` block tells Pipelines which units belong to that environment and how to authenticate with a cloud provider when executing Terragrunt commands against them.

For example, the following defines a single environment that authenticates to AWS using OIDC:

```hcl
# .gruntwork/environments.hcl
environment "an_environment" {
  filter {
    paths = ["an-environment/*"]
  }

  authentication {
    aws_oidc {
      account_id         = "an-aws-account-id"
      plan_iam_role_arn  = "arn:aws:iam::an-aws-account-id:role/role-to-assume-for-plans"
      apply_iam_role_arn = "arn:aws:iam::an-aws-account-id:role/role-to-assume-for-applies"
    }
  }
}
```

All units located within the `an-environment` directory (a sibling of the `.gruntwork` directory) will assume the `role-to-assume-for-plans` role in the AWS account with ID `an-aws-account-id` when Pipelines runs Terragrunt plan commands. The authentication process leverages [OIDC](https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/configuring-openid-connect-in-amazon-web-services) to securely connect to AWS and assume the specified role.

:::tip

If you are running Pipelines on a host machine that is already authenticated with a cloud provider (e.g. a self-hosted runner), you can leave the `authentication` block empty (`authentication {}`) to signal that Pipelines should not attempt to perform any authentication itself.

:::

Other top-level blocks are optional. In particular, the [`repository`](#repository-blocks) block configures repository-wide settings such as `deploy_branch_name`; if it is not defined, Pipelines uses default values for those settings.

A common strategy for creating Pipelines configurations is to start with minimal setups that address the most frequent use cases. As the repository evolves, these configurations can be refactored and generalized to reduce repetition and improve maintainability. To get started with Pipelines configurations as code, check out the guide on [adding existing repositories](/2.0/docs/pipelines/installation/addingexistingrepo).

Details regarding the functionality of each configuration type are outlined below.

## Configuration hierarchy

Pipelines configurations are structured into a hierarchy to manage specificity. Configurations that are more specific to an individual unit of IaC will take precedence over more general configurations in cases of conflict.

The configuration hierarchy is as follows:

### Repository configurations

Repository configurations are overridden by more specific configurations, such as environment or unit configurations, in cases of conflict.
These configurations are the most general and apply to the entire repository, regardless of the working directory context. They are defined in [global configurations](#global-configurations) using the [repository block](#repository-blocks).

### Environment configurations

Environment configurations apply to specific environments within a repository. These are relevant only to units that match a specified [filter](#filter-blocks). They are defined in [global configurations](#global-configurations) using [environment blocks](#environment-blocks).
These configurations are more specific than repository configurations and override them in contexts matching the defined filter.

### Unit configurations

Unit configurations apply to individual units of IaC within a repository. These are defined in [local configurations](#local-configurations) using [unit blocks](#unit-blocks).

These configurations are the most specific and take precedence over repository and environment configurations in cases of conflict.

## Global configurations

Configurations within the `.gruntwork` directory at the root of the repository are referred to as global configurations. They apply across the entire repository and are the primary mechanism for setting up Pipelines.

Pipelines parses every `.hcl` file in `.gruntwork/` as a global configuration. Filenames within `.gruntwork/` commonly mirror the block names they define (e.g. `environments.hcl`, `aws.hcl`), but this convention is not mandatory.

### Repository Blocks

[Full Reference for Repository Blocks](/2.0/reference/pipelines/configurations-as-code/api#repository-block)

Repository blocks serve to define configurations that apply universally across the entire repository.

e.g.

```hcl
repository {
  deploy_branch_name = "main"
}
```

In this example, the `deploy_branch_name` attribute is configured as `main`, meaning Pipelines will deploy infrastructure changes whenever updates occur on the `main` branch.

  :::info

Job consolidation is a process by which Pipelines merges multiple related jobs (e.g., `ModuleAdded`, `ModuleChanged`) into a single job (e.g., `ModulesAddedOrChanged`) when executing Terragrunt commands.

This optimization significantly reduces CI/CD costs by consolidating Terragrunt execution into fewer jobs, spreading the operational expenses more efficiently. Additionally, it enhances accuracy by allowing Terragrunt to leverage a Directed Acyclic Graph (DAG) for proper sequencing of updates.

For example:

- Instead of running the following independent jobs:
  A. `ModuleAdded`
  B. `ModuleChanged` (which depends on `ModuleAdded`)

- Pipelines consolidates them into a single job:
  C. `ModulesAddedOrChanged`

Since `ModulesAddedOrChanged` uses the `run-all` Terragrunt command, it respects the DAG to ensure that the `ModuleAdded` operation is completed before the `ModuleChanged` operation.

  :::

  :::tip

In rare cases, you might disable job consolidation to allocate maximum resources to each CI/CD job. While this is not a general recommendation, it can be a helpful workaround if your runner is depleting its available resources during execution.

  :::

### Environment blocks

[Full Reference for Environment Blocks](/2.0/reference/pipelines/configurations-as-code/api#environment-block)

Environment blocks define configurations that apply to a specific environment within a repository.

The label assigned to an environment block serves as the name of the environment. This label is user-defined and must be globally unique across the repository.

To maintain clarity and reduce redundancy, environment blocks should reference other configuration blocks (such as [`aws` blocks](#aws-blocks)) rather than redefining configurations repeatedly. For this reason, environment blocks often resemble the following:

```hcl
# .gruntwork/environments.hcl
environment "an_environment" {
  filter {
    paths = ["an-environment/*"]
  }

  authentication {
    aws_oidc {
      account_id         = aws.accounts.all.an_account.id
      plan_iam_role_arn  = "arn:aws:iam::${aws.accounts.all.an_account.id}:role/role-to-assume-for-plans"
      apply_iam_role_arn = "arn:aws:iam::${aws.accounts.all.an_account.id}:role/role-to-assume-for-applies"
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
Each unit must match the filters of a single environment block exclusively. If a unit matches filters from multiple environment blocks, Pipelines will generate an error.
:::

### AWS blocks

[Full Reference for AWS Blocks](/2.0/reference/pipelines/configurations-as-code/api#aws-block)

AWS blocks enable the codification and reuse of standard AWS configurations, which can be referenced by multiple `aws-oidc` [authentication](#authentication-blocks) blocks. These blocks streamline the management of shared AWS settings.

Only one `aws` block can be defined within [global configurations](#global-configurations).

Within the `aws` block, `accounts` blocks specify configurations for collections of AWS accounts.

The label assigned to an `accounts` block serves as its unique identifier. This label is user-defined and must be distinct within the scope of the enclosing `aws` block.

e.g.

```hcl
# .gruntwork/aws.hcl
aws {
  accounts "all" {
    path = "aws/accounts.yml"
  }
}
```

In this example, the `all` AWS accounts block is specified within an `aws` block located in a file named `aws.hcl` within the `.gruntwork` directory.

The `all` accounts block uses the `path` attribute to reference an external file, `aws/accounts.yml`, which contains AWS account definitions in YAML format.

Customers familiar with Gruntwork AWS Accelerator may recognize the `accounts.yml` file as a configuration file used by AWS Account Factory to define AWS account settings. Gruntwork Pipelines leverages the same schema for the `accounts.yml` file as AWS Account Factory. As a result, the `accounts.yml` file from AWS Account Factory can be directly utilized within the `accounts` block without requiring modifications.

The `accounts.yml` file must adhere to the following schema:

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

It is possible to define multiple AWS accounts blocks, each pointing to distinct `accounts.yml` files. This approach enables the segmentation of AWS accounts into separate YAML files, which can aid in maintaining organizational clarity.

:::info
Using YAML files instead of HCL files for defining AWS account configurations was a deliberate decision to enhance the portability of these configurations for use beyond Pipelines. Tools such as [Terragrunt](https://github.com/gruntwork-io/terragrunt/) and [yq](https://github.com/mikefarah/yq) can leverage these files effectively due to their portability compared to HCL files.
:::

## Local configurations

A `gruntwork.hcl` file located in the same directory as a `terragrunt.hcl` file is referred to as a local configuration. Local configurations override the global configuration in `.gruntwork/` for that single unit of Infrastructure as Code (IaC), letting you tailor settings to the unit's specific needs.

### Unit blocks

[Full Reference for Unit Blocks](/2.0/reference/pipelines/configurations-as-code/api#unit-block)

Unit blocks are specifically designed to define configurations that apply to an individual unit of IaC within a repository.

e.g.

```hcl
unit {
  authentication {
    aws_oidc {
      account_id         = "an-aws-account-id"
      plan_iam_role_arn  = "arn:aws:iam::an-aws-account-id:role/role-to-assume-for-plans"
      apply_iam_role_arn = "arn:aws:iam::an-aws-account-id:role/role-to-assume-for-applies"
    }
  }
}
```

In this example, the `unit` block is configured to assume the `role-to-assume-for-plans` role in the AWS account identified by `an-aws-account-id` when Pipelines executes Terragrunt plan commands.

## Configuration components

Specific configurations are relevant only when used in conjunction with others. These are referred to as configuration components. Some components are mandatory for the validity of specific configurations, while others serve to streamline and reduce redundancy in configuration files.

### Filter blocks

[Full Reference for Filter Blocks](/2.0/reference/pipelines/configurations-as-code/api#filter-block)

Filter blocks are a configuration component used by [environment](#environment-blocks) blocks to specify the conditions under which particular configurations apply.

e.g.

```hcl
filter {
  paths = ["a-folder/*"]
}
```

All configuration blocks containing a `filter` block will apply only to units that match the specified filter.

### Authentication blocks

[Full Reference for Authentication Blocks](/2.0/reference/pipelines/configurations-as-code/api#authentication-block)

Authentication blocks are configuration components used by [environment](#environment-blocks) and [unit](#unit-blocks) blocks to specify how Pipelines will authenticate with cloud platforms when executing Terragrunt commands.

:::note

Authentication blocks encapsulate more specific authentication configurations tailored to individual cloud platforms. When Pipelines processes an `authentication` block, it attempts to authenticate with the relevant cloud platform defined within it.

:::

:::tip
Authentication blocks can be declared at both the environment and unit levels. When declared at the environment level, they are applied to all units that match the associated filter.

At the unit level, authentication blocks apply exclusively to the unit containing the block. In cases of conflict, unit-level authentication blocks will override environment-level configurations.
:::

e.g.

```hcl
authentication {
  aws_oidc {
    account_id     = "an-aws-account-id"
    plan_iam_role  = "arn:aws:iam::an-aws-account-id:role/role-to-assume-for-plans"
    apply_iam_role = "arn:aws:iam::an-aws-account-id:role/role-to-assume-for-applies"
  }
}
```

In this example, Pipelines authenticates with AWS using OIDC and assumes the `role-to-assume-for-plans` role within the AWS account identified by `an-aws-account-id` when executing Terragrunt plan commands.

### Environment variables block

[Full Reference for Environment Variables Block](/2.0/reference/pipelines/configurations-as-code/api#env-block)

The environment variables(env) block is a configuration component used by [repository](#repository-blocks) blocks to specify environment variables that will be set when executing Terragrunt commands.

e.g.

```hcl
repository {
  env {
    TF_VAR_environment = "an_environment_provided_input"
    TG_STRICT_VALIDATE = true
  }
}
```

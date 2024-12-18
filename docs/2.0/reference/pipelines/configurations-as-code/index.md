# Pipelines Configurations as Code

Pipelines employs configurations written in [HashiCorp Configuration Language (HCL)](https://github.com/hashicorp/hcl) to enable dynamic behavior. These configurations guide Pipelines in managing interactions with cloud environments within Infrastructure as Code (IaC) stored in a repository.

Pipelines processes these configurations at a high level by parsing all files ending with `.hcl` located in a `.gruntwork` directory or a single file named `gruntwork.hcl`. Typically, global configurations relevant to the entire repository are placed in the `.gruntwork` directory at the root, while configurations specific to a particular `terragrunt.hcl` file (referred to as a "unit") reside in the same directory as the corresponding `terragrunt.hcl` file.

:::info
We recommend reviewing our [concepts page](/2.0/docs/pipelines/concepts/hcl-config-language) on the HCL language to ensure familiarity with its features before configuring Pipelines.
:::


## Basic configuration

The minimum configuration required for Pipelines to function depends on the specific context. In most scenarios, Pipelines must determine how to authenticate with a cloud provider to execute Terragrunt commands. If authentication is not configured where required, Pipelines will generate an error.

Below is an example of a minimal configuration for a single Terragrunt unit, demonstrating how to enable Pipelines to authenticate with AWS using OIDC:

```hcl
# gruntwork.hcl
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

Placing this configuration in a `gruntwork.hcl` file within the same directory as a `terragrunt.hcl` file directs Pipelines to assume the `role-to-assume-for-plans` role in the AWS account with the ID `an-aws-account-id` when executing Terragrunt plan commands. The authentication process leverages [OIDC](https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/configuring-openid-connect-in-amazon-web-services) to securely connect to AWS and assume the specified role.


Multiple Terragrunt units within a repository will assume the same AWS role. For instance, all units within a specific directory may provision resources for the same AWS account. Configuring AWS authentication at the environment level is more efficient in these cases. You can do this by defining an `environment` block within one of the `.hcl` files in the `.gruntwork` directory at the repository root and specifying the AWS authentication configuration.

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
      plan_iam_role_arn  = "arn:aws:iam::an-aws-account-id:role/role-to-assume-for-plans"
      apply_iam_role_arn = "arn:aws:iam::an-aws-account-id:role/role-to-assume-for-applies"
    }
  }
}
```

In this example, all units located within the `an-environment` directory, which is a sibling to the `.gruntwork` directory, will assume the `role-to-assume-for-plans` role in the AWS account with ID `an-aws-account-id` when Pipelines runs Terragrunt plan commands.

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

Configurations within a `.gruntwork` directory, in the current working directory or a parent directory, are referred to as global configurations. These configurations typically have broader applicability within the repository and serve as the primary mechanism for setting up Pipelines.

When searching for configurations, Pipelines will identify a single `.gruntwork` directory and will not search further up the directory structure once it locates one.

It is common to see configuration filenames within the `.gruntwork` directory that correspond to the block names they define. However, this naming convention is not mandatory. Pipelines will parse any `.hcl` file within the `.gruntwork` directory as a global configuration.

### Environment blocks

[Full Reference for Environment Blocks](/2.0/reference/pipelines/configurations-as-code/api#environment-block)

Environment blocks define configurations that apply to a specific environment within a repository.

The label assigned to an environment block serves as the name of the environment. This label is user-defined and must be globally unique across the repository.

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
      plan_iam_role_arn  = "arn:aws:iam::an-aws-account-id:role/role-to-assume-for-plans"
      apply_iam_role_arn = "arn:aws:iam::an-aws-account-id:role/role-to-assume-for-applies"
    }
  }
}
```

In this example, the `an_environment` environment is configured to match all units located within the `an-environment` directory adjacent to the `.gruntwork` directory. Units matching this filter will assume the `role-to-assume-for-plans` role in the AWS account with ID `an-aws-account-id` when Pipelines executes Terragrunt plan commands.

To maintain clarity and reduce redundancy, environment blocks should reference other configuration blocks rather than redefining configurations repeatedly.

For this reason, environment blocks often resemble the following:

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

Customers familiar with DevOps Foundations may recognize the `accounts.yml` file as a configuration file used by Account Factory to define AWS account settings. Pipelines leverages the same schema for the `accounts.yml` file as Account Factory. As a result, the `accounts.yml` file from Account Factory can be directly utilized within the `accounts` block without requiring modifications.

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

## Local configurations

Configurations located in the same directory as a `terragrunt.hcl` file are referred to as local configurations. These are generally used to define settings specific to a single unit of Infrastructure as Code (IaC) within a repository.

Local configurations must be defined in a single file named `gruntwork.hcl`, located in the same directory as the corresponding `terragrunt.hcl` file.

These configurations can serve two purposes: 
1. Define all the settings necessary for Pipelines to operate within the scope of a single unit.
2. Override global configurations defined in the `.gruntwork` directory, tailoring them to the unit's specific needs.
   
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
Authentication blocks encapsulate more specific authentication configurations tailored to individual cloud platforms. When Pipelines processes an `authentication` block, it attempts to authenticate with all cloud platforms defined within it.

Currently, the only supported block that can be nested within an `authentication` block is `aws_oidc`.
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

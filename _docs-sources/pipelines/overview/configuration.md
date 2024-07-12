# Pipelines Configurations as Code

:::note
This page includes documentation for modern Pipelines Configuration as Code.

If you are using an older version of Pipelines, please refer to the documentation on [Upgrading from config.yml](../upgrading/upgrading-from-config-yml.md).
:::

:::caution
As of July, 2024, the legacy configuration is still the primary mechanism for configuring Pipelines in DevOps Foundations. The best experience in DevOps Foundations remains with the legacy configuration system, as interactions with Account Factory still need improvement in the modern configuration system.

If you are currently using legacy configurations, you should not migrate to the new configuration system at this time.
:::

Pipelines relies on configurations written in [HashiCorp Configuration Language (HCL)](https://github.com/hashicorp/hcl) to drive dynamic behavior. These configurations are primarily used by Pipelines to determine how to interact with cloud environments within the context of the Infrastructure As Code (IAC) within a code repository.

At a high level, Pipelines will read these configurations by parsing all files that end with `.hcl` within a directory named `.gruntwork` or a single file named `gruntwork.hcl`. In typical usage, the configurations that are global to the IAC in a repository will be defined within a `.gruntwork` directory at the root of the repository, and configurations that are specific to a particular `terragrunt.hcl` file (a unit) located in the same directory as the `terragrunt.hcl` file.

## Minimum Required Configuration

The minimum configurations required for Pipelines to operate correctly will vary depending on context. For the most common usage, Pipelines will need to be able to determine how to authenticate with a cloud provider in order to run Terragrunt commands. If it is not able to determine how to authenticate within a context where it needs to be able to do so, Pipelines will throw an error.

The following is an example of a minimal configuration that would allow Pipelines to determine how to authenticate with AWS for exactly one unit of IAC:

```hcl
# gruntwork.hcl
unit {
  authentication {
    aws_oidc {
      account_id = "an-aws-account-id"
      authentication_profile = {
        plan_iam_role = "role-to-assume-for-plans"
        apply_iam_role = "role-to-assume-for-applies"
      }
    }
  }
}
```

Placing this configuration in a `gruntwork.hcl` file in the same directory as a `terragrunt.hcl` file will cause Pipelines to assume the `role-to-assume-for-plans` role in the AWS account with ID `an-aws-account-id` when running Terragrunt plan commands, using [OIDC](https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/configuring-openid-connect-in-amazon-web-services) to authenticate to AWS and assume that role.

In most circumstances, the same role would be assumed by multiple units of configuration within a repository (e.g. all units within a given directory configure resources for the same AWS account). In that circumstance, it would be more appropriate not to define a `gruntwork.hcl` file at all, and instead define a `.gruntwork` directory at the root of the repository with a file ending in `.hcl` that contains configurations that are applicable to all units within that directory.

e.g.

```hcl
# .gruntwork/environments.hcl
environment "an_account" {
  filter {
    paths = ["an-account/*"]
  }

  authentication {
    aws_oidc {
      account_id = "an-aws-account-id"
      authentication_profile = {
        plan_iam_role = "role-to-assume-for-plans"
        apply_iam_role = "role-to-assume-for-applies"
      }
    }
  }
}
```

In this example, all the units located within the `an-account` directory sibling to the `.gruntwork` directory will assume the `role-to-assume-for-plans` role in the AWS account with ID `an-aws-account-id` when running Terragrunt plan commands by Pipelines.

A typical approach to building Pipelines configurations is to first define minimal configurations that address the most common use-cases, and then to refactor and generalize those configurations as needed to reduce repetition.

More details on how these configurations are defined will be detailed below.

## Global Configurations

The configurations found within a `.gruntwork` directory found in the current working directory, or a parent directory of the current working directory are referred to as global configurations. These configurations are typically applicable within a wide range of contexts within a repository, and are the primary mechanism for configuring Pipelines.

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
      account_id = "an-aws-account-id"
      authentication_profile = {
        plan_iam_role  = "role-to-assume-for-plans"
        apply_iam_role = "role-to-assume-for-applies"
      }
    }
  }
}
```

In this example, the `an_environment` environment is defined to match all units located within the `an-environment` directory sibling to the `.gruntwork` directory. All units that match this filter will assume the `role-to-assume-for-plans` role in the AWS account with ID `an-aws-account-id` when running Terragrunt plan commands by Pipelines.

The environment block is most idiomatically used in conjunction with other configuration blocks, as the contents frequently involve configurations that are applicable to multiple units within a repository.

As such, you will typically see environment blocks that look more like the following:

```hcl
# .gruntwork/environments.hcl
environment "an_environment" {
  filter {
    paths = ["an-environment/*"]
  }

  authentication {
    aws_oidc {
      account_id = aws_accounts.all.an_account.id
      authentication_profile = authentication_profile.aws_oidc.profile
    }
  }
}

aws_accounts "all" {
  path = "aws/accounts.yml"
}

authentication_profile "aws_oidc" "profile" {
  plan_iam_role  = "role-to-assume-for-plans"
  apply_iam_role = "role-to-assume-for-applies"
}
```

More on configuration components like [aws_accounts](#aws-accounts-blocks) and [authentication_profile](#authentication-profile-blocks) can be found below.

*Supported Blocks:*

- `filter` (Required): A filter block that determines which units the environment is applicable to. See [Filter Blocks](#filter-blocks) for more information.
- `authentication` (Required): An authentication block that determines how Pipelines will authenticate with cloud platforms when running Terragrunt commands. See [Authentication Blocks](#authentication-blocks) for more information.

:::caution
Every unit must be uniquely identified by a single environment block. If a unit is matched by multiple environment blocks, Pipelines will throw an error.
:::

### Authentication Profile Blocks

Authentication Profile blocks are configurations used by [authentication](#authentication-blocks) blocks to have commonly re-used authentication configurations codified and referenced by multiple authentication blocks.

Note that this is a configuration block that is qualified by the first label used on it. In the example below, the first label is `aws_oidc`, so the block is an `aws_oidc` authentication profile block.

At this time, the only supported label that can be set for the first label is `aws_oidc`.

The second label is the name of the authentication profile. This is a user-defined name that can be used to reference the authentication profile in other parts of the configuration. This label must be globally unique.

e.g.

```hcl
# .gruntwork/authentication_profile.hcl
authentication_profile "aws_oidc" "profile" {
  plan_iam_role  = "role-to-assume-for-plans"
  apply_iam_role = "role-to-assume-for-applies"

  region           = "us-east-1"
  session_duration = 3600
}

# some-unit/gruntwork.hcl
unit {
  authentication {
    aws_oidc {
      account_id = "an-aws-account-id"
      authentication_profile = authentication_profile.aws_oidc.profile
    }
  }
}
```

In this example, the `aws_oidc` authentication profile named `profile` is defined in a file named `authentication_profile.hcl` in the `.gruntwork` directory. The `aws_oidc` authentication block in the `gruntwork.hcl` file in the `some-unit` directory references the `profile` authentication profile.

*Supported Attributes:*

- `plan_iam_role` (Required): The IAM role that Pipelines will assume when running Terragrunt plan commands.
- `apply_iam_role` (Required): The IAM role that Pipelines will assume when running Terragrunt apply commands.
- `region` (Optional): The AWS region that Pipelines will use when running Terragrunt commands. If not set, Pipelines will use the default region of `us-east-1`.
- `session_duration` (Optional): The duration in seconds that the AWS session will be valid for. If not set, Pipelines will use the default session duration of `3600` seconds.

### AWS Accounts Blocks

AWS Accounts blocks are configurations used by `aws-oidc` [authentication](#authentication-blocks) blocks to have commonly re-used AWS account configurations codified and referenced by multiple authentication blocks.

The label applied to an AWS Accounts block is the name of the AWS accounts block. This is a user-defined label for the collection of AWS accounts defined by the block, and must be globally unique.

e.g.

```hcl
# .gruntwork/aws_accounts.hcl
aws_accounts "all" {
  path = "aws/accounts.yml"
}
```

In this example, the `all` AWS accounts block is defined in a file named `aws_accounts.yml` within the `.gruntwork` directory. The `all` AWS accounts block references an external file located at `aws/accounts.yml` that contains the definitions of AWS accounts.

DevOps Foundations customers may be familiar with the `accounts.yml` file as a file that is used by Account Factory to define the configurations of AWS accounts. In an effort to reduce the burden of migrating to the new configuration system, Pipelines uses the same schema for the `accounts.yml` file as Account Factory. This means that the `accounts.yml` file that is used by Account Factory can be used by the `aws_accounts` block without modification.

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

The decision to leverage YAML files instead of HCL files for defining the configurations for AWS accounts was an intentional decision to increase the portability of these configurations for usage outside of Pipelines. Tools like [Terragrunt](https://github.com/gruntwork-io/terragrunt/) and [yq](https://github.com/mikefarah/yq) can be used to leverage these files, as they are more portable than HCL files.

*Supported Attributes:*

- `path` (Required): The path to the YAML file that contains the definitions of AWS accounts.

### Pipelines Blocks

Pipelines blocks are used to define configurations that are applicable to Pipelines itself.

e.g.

```hcl
pipelines {
  deploy_branch_name = "main"
}
```

In this example, the `deploy_branch_name` attribute is set to `main`, which means that Pipelines will deploy infrastructure changes when the `main` branch is updated.

*Supported Attributes:*

- `deploy_branch_name` (Optional): The branch that Pipelines will deploy infrastructure changes from. If not set, Pipelines will deploy infrastructure changes from the `main` branch.

### Annotation Blocks

Annotation blocks are used to define configurations that are applicable to multiple units within a repository. These configurations are typically used to provide metadata about configurations that can be used by Pipelines to make decisions about how to interact with those configurations.

The label applied to an annotation block is the name of the annotation. This is a user-defined label for the annotation, and must be globally unique.

e.g.

```hcl
annotation "dev" {
  filter {
    paths = ["*dev/*"]
  }

  labels = {
    "environment" = "dev"
  }
}
```

In this example, the `an_annotation` annotation is defined to match all units located within a directory that contains `dev` at the end of the path. All units that match this filter will have the label `key` set to `value`.

*Supported Blocks:*

- `filter` (Required): A filter block that determines which units the annotation is applicable to. See [Filter Blocks](#filter-blocks) for more information.
- `labels` (Required): A map of key-value pairs that provide metadata about the units that the annotation is applicable to.

## Local Configurations

The configurations found within a directory that contains a `terragrunt.hcl` file are referred to as local configurations. These configurations are typically used to define configurations that are specific to a single unit of IAC within a repository.

They must be specified within a single file named `gruntwork.hcl` in the same directory as the `terragrunt.hcl` file.

Local configurations can be used both to define the complete configurations required for Pipelines to operate within the context of a single unit, or to override global configurations that are defined in the `.gruntwork` directory.

### Unit Blocks

Unit blocks are used to define configurations that are applicable to a single unit of IAC within a repository.

e.g.

```hcl
unit {
  authentication {
    aws_oidc {
      account_id = "an-aws-account-id"
      authentication_profile = {
        plan_iam_role = "role-to-assume-for-plans"
        apply_iam_role = "role-to-assume-for-applies"
      }
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

Filter blocks are components used by [environment](#environment-blocks) and [annotation](#annotation-blocks) blocks to determine where certain configurations are applicable.

e.g.

```hcl
filter {
  paths = ["a-folder/*"]
}
```

All configuration blocks contain a `filter` block will only be applied to units that match the filter.

*Supported Attributes:*

- `paths` (Required): A list of path globs that the filter should match against. Paths are relative to the directory containing the `.gruntwork` directory.

### Authentication Blocks

Authentication blocks are components used by [environment](#environment-blocks) and [unit](#unit-blocks) blocks to determine how Pipelines will authenticate with cloud platforms when running Terragrunt commands.

Note that `authentication` blocks wrap other, more specific authentication blocks that are used to authenticate with specific cloud platforms. When Pipelines encounters an `authentication` block, it will attempt to authenticate with all cloud platforms defined within the block.

At this time, the only supported block that can be nested within the `authentication` block is `aws_oidc`.

e.g.

```hcl
authentication {
  aws_oidc {
    account_id = "an-aws-account-id"
    authentication_profile = {
      plan_iam_role  = "role-to-assume-for-plans"
      apply_iam_role = "role-to-assume-for-applies"
    }
  }
}
```

In this example, Pipelines will use OIDC to authenticate with AWS and assume the `role-to-assume-for-plans` role in the AWS account with ID `an-aws-account-id` when running Terragrunt plan commands.

*Supported Blocks:*

- `aws_oidc` (Required): An AWS OIDC authentication block that determines how Pipelines will authenticate with AWS using OIDC. See [AWS OIDC Authentication Blocks](#aws-oidc-authentication-blocks) for more information.
  - `account_id` (Required): The AWS account ID that Pipelines will authenticate with.
  - `authentication_profile` (Required): An authentication profile attribute that determines how Pipelines will authenticate to a particular AWS account using OIDC. This is what's referred to as an "inline" Authentication Profile, and is shorthand for the DRY-er (Don't Repeat Yourself) approach of leveraging an Authentication Profile by reference. See [Authentication Profile Blocks](#authentication-profile-blocks) for more information.


# Pipelines Configurations as Code
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import { HclListItem, HclListItemExample, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '/src/components/HclListItem.tsx';
//import { ModuleUsage } from "/src/components/ModuleUsage";

## Block Reference

For a more comprehensive walkthrough of how blocks work please see the Pipelines Configurations as Code [documentation](/2.0/docs/pipelines/installation/addingexistingrepo).


### `environment` block
<HclListItem name="environment" requirement="optional" type="labeled-block">
<HclListItemDescription>
Environment blocks are used to define configurations that are applicable to a specific environment within a repository.
<br />
The label applied to an environment block is the name of the environment. This is a user-defined label for the environment, and must be globally unique.
<br />
See more [below](#environment-block-attributes).
</HclListItemDescription>
<HclListItemExample>

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
</HclListItemExample>
</HclListItem>

### `unit` block
<HclListItem name="unit" requirement="optional" type="block">
<HclListItemDescription>

Unit blocks are used to define configurations that are applicable to a single unit of IaC within a repository. See more [below](#unit-block-attributes).

</HclListItemDescription>
<HclListItemExample>
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
</HclListItemExample>
</HclListItem>

### `authentication` block

<HclListItem name="authentication" requirement="optional" type="block">
<HclListItemDescription>

Authentication blocks are components used by environment and unit blocks to determine how Pipelines will authenticate with cloud platforms when running Terragrunt commands. See more [below](#authentication-block-attributes).

</HclListItemDescription>
<HclListItemExample>
```hcl
authentication {
  aws_oidc {
    account_id     = "an-aws-account-id"
    plan_iam_role  = "arn:aws:iam::an-aws-account-id:role-to-assume-for-plans"
    apply_iam_role = "arn:aws:iam::an-aws-account-id:role-to-assume-for-applies"
  }
}
```
</HclListItemExample>
</HclListItem>

### `repository` block

<HclListItem name="repository" requirement="optional" type="block">
<HclListItemDescription>

Repository blocks are used to define configurations that are applicable to the entire repository. See more [below](#repository-block-attributes).

</HclListItemDescription>
<HclListItemExample>

```hcl
repository {
  deploy_branch_name = "main"
}
```
</HclListItemExample>
</HclListItem>

### `filter` block

<HclListItem name="filter" requirement="optional" type="block">
<HclListItemDescription>

The ceiling of retention days that can be configured via a backup plan for the given vault

</HclListItemDescription>
</HclListItem>

### `aws` block

<HclListItem name="aws" type="block">
<HclListItemDescription>
<p>
AWS blocks are configurations used by aws-oidc authentication blocks to have commonly re-used AWS configurations codified and referenced by multiple authentication blocks.
</p><p>
There can only be one aws block defined within global configurations.
</p><p>
Nested within the aws block are accounts blocks that define the configurations for collections of AWS accounts.
</p><p>
The label applied to an accounts block is the name of the Accounts block. This is a user-defined label for the collection of AWS accounts defined by the block, and must be unique within the context of the aws block.
</p>
<p>
For more information on importing accounts from `accounts.yml` [click here](/2.0/docs/pipelines/installation/addingexistingrepo#aws-blocks)
</p>
<p>
See more [below](#aws-block-attributes).
</p>
</HclListItemDescription>
<HclListItemExample>
```hcl
aws {
  accounts "all" {
    path = "aws/accounts.yml"
  }
}
```
</HclListItemExample>

</HclListItem>

### `accounts` block

<HclListItem name="accounts" requirement="optional" type="labeled block">
<HclListItemDescription>

<p>Accounts blocks define the configurations for collections of AWS accounts.</p>
<br />
<p>
The label applied to an accounts block is the name of the Accounts block. This is a user-defined label for the collection of AWS accounts defined by the block, and must be unique within the context of the aws block.
</p>
</HclListItemDescription>
</HclListItem>

### `aws_oidc` block

<HclListItem name="aws_oidc" requirement="optional" type="block">
<HclListItemDescription>

An AWS OIDC authentication block that determines how Pipelines will authenticate with AWS using OIDC. See more [below](#aws_oidc-block-attributes).

</HclListItemDescription>
</HclListItem>

## Block Attributes

### `environment` block attributes

<HclListItem name="filter" requirement="required" type="block">
<HclListItemDescription>

A filter block that determines which units the environment is applicable to.  See more [below](#filter-block-attributes).

:::caution
Every unit must be uniquely matched by the filters of a single environment block. If a unit is matched by multiple environment blocks, Pipelines will throw an error.
:::
</HclListItemDescription>
</HclListItem>

<HclListItem name="authentication" requirement="required" type="block">
<HclListItemDescription>
An authentication block that determines how Pipelines will authenticate with cloud platforms when running Terragrunt commands. See more [below](#authentication-block-attributes).
</HclListItemDescription>
</HclListItem>

### `unit` block attributes

<HclListItem name="authentication" requirement="required" type="block">
<HclListItemDescription>

An authentication block that determines how Pipelines will authenticate with cloud platforms when running Terragrunt commands.  See more [below](#authentication-block-attributes).
</HclListItemDescription>

</HclListItem>

### `authentication` block attributes


<HclListItem name="aws_oidc" requirement="required" type="block">
<HclListItemDescription>

An AWS OIDC authentication block that determines how Pipelines will authenticate with AWS using OIDC See more [below](#aws_oidc-block-attributes).
</HclListItemDescription>

</HclListItem>

### `repository` block attributes

<HclListItem name="deploy_branch_name" requirement="optional" type="string">
<HclListItemDescription>

The branch that Pipelines will deploy infrastructure changes from.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="main"/>
</HclListItem>

<HclListItem name="consolidate_added_or_changed" requirement="optional" type="boolean">
<HclListItemDescription>

Whether or not Pipelines will consolidate added or changed resources when running Terragrunt commands.

<details>
<summary>Job Consolidation Definition</summary>

  Job consolidation is the mechanism whereby Pipelines will take multiple jobs (e.g. ModuleAdded, ModuleChanged) and consolidate them into a single job (e.g. ModulesAddedOrChanged) when running Terragrunt commands.

  This is a useful optimization that Pipelines can perform, as it divides the CI/CD costs of running Terragrunt in CI by the number of jobs that are consolidated. In addition, this results in more accurate runs, as it allows Terragrunt to leverage the Directed Acyclic Graph (DAG) to order updates.

  e.g. Instead of running the following jobs: A. ModuleAdded B. ModuleChanged

  Where ModuleChanged depends on ModuleAdded, Pipelines will consolidate these jobs into a single job: C. ModulesAddedOrChanged

  Because the underlying implementation of a ModulesAddedOrChanged uses the run-all Terragrunt command, it will use the DAG to ensure that the ModuleAdded job runs before the ModuleChanged job.

</details>

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="consolidate_deleted" requirement="optional" type="boolean">
<HclListItemDescription>

Whether or not Pipelines will consolidate deleted resources when running Terragrunt plan commands.
  :::caution

  This is disabled by default because there can be unintended consequences to deleting additional resources via a `run-all` Terragrunt command. It is recommended to enable this feature only when you are confident that you understand the implications of doing so.

  :::
</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>



### `filter` block attributes

<HclListItem name="paths" requirement="required" type="array[string]">
<HclListItemDescription>

A list of path globs that the filter should match against. Paths are relative to the directory containing the .gruntwork directory.
</HclListItemDescription>
</HclListItem>

### `aws` block attributes

<HclListItem name="accounts" requirement="required" type="labeled block">
<HclListItemDescription>

The AWS account ID that Pipelines will authenticate with.  See more [below](#accounts-block-attributes).
</HclListItemDescription>
</HclListItem>

### `accounts` block attributes

<HclListItem name="path" requirement="required" type="string">
<HclListItemDescription>

The path to the `accounts.yml` file that contains the definition of AWS accounts.

:::note
The value used for the `path` attribute is relative to the directory containing the .gruntwork directory.

e.g. If the `accounts.yml` file is located at the root of the repository, and the configuration containing the `aws` block is located in `.gruntwork/aws.hcl`, then the value of the `path` attribute would be `../accounts.yml`.

This is to make it convenient to tuck the `accounts.yml` file away somewhere in the `.gruntwork` directory if you like.
:::

</HclListItemDescription>
</HclListItem>



### `aws_oidc` block attributes

<HclListItem name="account_id" requirement="required" type="string">
<HclListItemDescription>

The AWS account ID that Pipelines will authenticate with.
</HclListItemDescription>
</HclListItem>

<HclListItem name="plan_iam_role_arn" requirement="required" type="string">
<HclListItemDescription>

The IAM role ARN that Pipelines will assume when running Terragrunt plan commands.
</HclListItemDescription>
</HclListItem>

<HclListItem name="apply_iam_role_arn" requirement="required" type="string">
<HclListItemDescription>

The IAM role ARN that Pipelines will assume when running Terragrunt apply commands.
</HclListItemDescription>
</HclListItem>

<HclListItem name="region" requirement="optional" type="string">
<HclListItemDescription>

The AWS region that Pipelines will use when running Terragrunt commands.
</HclListItemDescription>
<HclListItemDefaultValue defaultValue="us-east-1"/>
</HclListItem>

<HclListItem name="session_duration" requirement="optional" type="number">
<HclListItemDescription>

The duration in seconds that the AWS session will be valid for.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="3600"/>
</HclListItem>

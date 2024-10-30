# Pipelines Configurations as Code
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import { HclListItem, HclListItemExample, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../src/components/HclListItem.tsx';
//import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

## File Reference
| Variable            | Type       | Description     | Default value   |
|---------------------|------------|-----------------|-----------------|
| `gruntwork.hcl`           | `String`   | Query text. See the [query language doc](query-language.md) | _required_ |
| `environments.hcl` | `i64`      | If set, restrict search to documents with a `timestamp >= start_timestamp`, taking advantage of potential time pruning opportunities. The value must be in seconds. | |

## Block Reference

<HclListItem name="unit" requirement="optional" type="block">
<HclListItemDescription>

Unit blocks are used to define configurations that are applicable to a single unit of IaC within a repository. See more [below](#unit-block-attributes).

</HclListItemDescription>

</HclListItem>

<HclListItem name="environment" requirement="optional" type="block">
<HclListItemDescription>

Environment blocks are used to define configurations that are applicable to a specific environment within a repository. See more [below](#environment-block-attributes).

</HclListItemDescription>
</HclListItem>

<HclListItem name="authentication" requirement="optional" type="block">
<HclListItemDescription>

Authentication blocks are components used by environment and unit blocks to determine how Pipelines will authenticate with cloud platforms when running Terragrunt commands. See more [below](#authentication-block-attributes).

</HclListItemDescription>
</HclListItem>

<HclListItem name="aws_oidc" requirement="optional" type="block">
<HclListItemDescription>

An AWS OIDC authentication block that determines how Pipelines will authenticate with AWS using OIDC. See more [below](#aws_oidc-block-attributes).

</HclListItemDescription>
</HclListItem>

<HclListItem name="repository" requirement="optional" type="block">
<HclListItemDescription>

Repository blocks are used to define configurations that are applicable to the entire repository. See more [below](#repository-block-attributes).

</HclListItemDescription>
</HclListItem>

<HclListItem name="filter" requirement="optional" type="block">
<HclListItemDescription>

The ceiling of retention days that can be configured via a backup plan for the given vault

</HclListItemDescription>
</HclListItem>

<HclListItem name="aws" type="block">
<HclListItemDescription>
AWS blocks are configurations used by aws-oidc authentication blocks to have commonly re-used AWS configurations codified and referenced by multiple authentication blocks.

There can only be one aws block defined within global configurations.

Nested within the aws block are accounts blocks that define the configurations for collections of AWS accounts.

The label applied to an accounts block is the name of the Accounts block. This is a user-defined label for the collection of AWS accounts defined by the block, and must be unique within the context of the aws block.
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

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

### `environment` block attributes

<HclListItem name="filter" requirement="required" type="block">
<HclListItemDescription>

A filter block that determines which units the environment is applicable to.  See more [below](#filter-block-attributes).
</HclListItemDescription>
</HclListItem>

<HclListItem name="authentication" requirement="required" type="block">
<HclListItemDescription>
An authentication block that determines how Pipelines will authenticate with cloud platforms when running Terragrunt commands. See more [below](#authentication-block-attributes).
</HclListItemDescription>
</HclListItem>

### `aws` block attributes

<HclListItem name="accounts" requirement="required" type="qualified block">
<HclListItemDescription>

The AWS account ID that Pipelines will authenticate with.
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

### `unit` block attributes

<HclListItem name="authentication" requirement="required" type="block">
<HclListItemDescription>

The AWS account ID that Pipelines will authenticate with.
</HclListItemDescription>
</HclListItem>

### `authentication` block attributes

### `filter` block attributes

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

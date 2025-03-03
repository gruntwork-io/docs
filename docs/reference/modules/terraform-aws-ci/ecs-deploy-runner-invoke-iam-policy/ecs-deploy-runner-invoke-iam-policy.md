---
title: "ECS Deploy Runner Invoke IAM Policies module"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="CI Modules" version="0.59.10" lastModifiedVersion="0.52.17"/>

# ECS Deploy Runner Invoke IAM Policies module

<a href="https://github.com/gruntwork-io/terraform-aws-ci/tree/v0.59.10/modules/ecs-deploy-runner-invoke-iam-policy" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.52.17" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This Terraform Module defines an [IAM
policy](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies.html) that
defines the minimal set of permissions necessary to trigger a deployment event for the deployment pipeline implemented
in the [ecs-deploy-runner module](https://github.com/gruntwork-io/terraform-aws-ci/tree/v0.59.10/modules/ecs-deploy-runner).

## Attaching IAM policy to IAM roles

To attach the IAM policy from this module to an IAM role, you can use the `invoke_policy_arn` output with the
[aws_iam_role_policy_attachment
resource](https://www.terraform.io/docs/providers/aws/r/iam_role_policy_attachment.html). For example, the following
attaches the policy to a custom IAM role defined in the same terraform module:

```hcl
module "ecs_deploy_runner_invoke_iam_policies" {
  # (arguments omitted)
}

resource "aws_iam_role" "example" {
  # (arguments omitted)
}

resource "aws_iam_role_policy_attachment" "example" {
  name = "attach-ecs-deploy-runner-invoke-policy"
  role = aws_iam_role.example.name
  policy_arn = module.ecs_deploy_runner_invoke_iam_policies.invoke_policy_arn
}
```

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S ECS-DEPLOY-RUNNER-INVOKE-IAM-POLICY MODULE
# ------------------------------------------------------------------------------------------------------

module "ecs_deploy_runner_invoke_iam_policy" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-ci.git//modules/ecs-deploy-runner-invoke-iam-policy?ref=v0.59.10"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The name of the CloudWatch Log Group that is used to store the logs for the
  # ECS Deploy Runner tasks.
  deploy_runner_cloudwatch_log_group_name = <string>

  # ARN of the ECS Cluster that is used to run the ECS Deploy Runner tasks.
  deploy_runner_ecs_cluster_arn = <string>

  # ARN of the AWS Lambda function that can be used to invoke the ECS Deploy
  # Runner.
  deploy_runner_invoker_lambda_function_arn = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The name to use for the IAM policy that is created.
  name = "invoke-ecs-deploy-runner"

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S ECS-DEPLOY-RUNNER-INVOKE-IAM-POLICY MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-ci.git//modules/ecs-deploy-runner-invoke-iam-policy?ref=v0.59.10"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The name of the CloudWatch Log Group that is used to store the logs for the
  # ECS Deploy Runner tasks.
  deploy_runner_cloudwatch_log_group_name = <string>

  # ARN of the ECS Cluster that is used to run the ECS Deploy Runner tasks.
  deploy_runner_ecs_cluster_arn = <string>

  # ARN of the AWS Lambda function that can be used to invoke the ECS Deploy
  # Runner.
  deploy_runner_invoker_lambda_function_arn = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The name to use for the IAM policy that is created.
  name = "invoke-ecs-deploy-runner"

}


```

</TabItem>
</Tabs>




## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Required

<HclListItem name="deploy_runner_cloudwatch_log_group_name" requirement="required" type="string">
<HclListItemDescription>

The name of the CloudWatch Log Group that is used to store the logs for the ECS Deploy Runner tasks.

</HclListItemDescription>
</HclListItem>

<HclListItem name="deploy_runner_ecs_cluster_arn" requirement="required" type="string">
<HclListItemDescription>

ARN of the ECS Cluster that is used to run the ECS Deploy Runner tasks.

</HclListItemDescription>
</HclListItem>

<HclListItem name="deploy_runner_invoker_lambda_function_arn" requirement="required" type="string">
<HclListItemDescription>

ARN of the AWS Lambda function that can be used to invoke the ECS Deploy Runner.

</HclListItemDescription>
</HclListItem>

### Optional

<HclListItem name="name" requirement="optional" type="string">
<HclListItemDescription>

The name to use for the IAM policy that is created.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;invoke-ecs-deploy-runner&quot;"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="arn">
<HclListItemDescription>

The ARN of the IAM policy created with the permissions for invoking the ECS Deploy Runner.

</HclListItemDescription>
</HclListItem>

<HclListItem name="id">
<HclListItemDescription>

The AWS ID of the IAM policy created with the permissions for invoking the ECS Deploy Runner.

</HclListItemDescription>
</HclListItem>

<HclListItem name="name">
<HclListItemDescription>

The name of the IAM policy created with the permissions for invoking the ECS Deploy Runner.

</HclListItemDescription>
</HclListItem>

</TabItem>
</Tabs>

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-ci/tree/v0.59.10/modules/ecs-deploy-runner-invoke-iam-policy/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-ci/tree/v0.59.10/modules/ecs-deploy-runner-invoke-iam-policy/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-ci/tree/v0.59.10/modules/ecs-deploy-runner-invoke-iam-policy/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "7c21790c49136c15d6cee7aef57a8f30"
}
##DOCS-SOURCER-END -->

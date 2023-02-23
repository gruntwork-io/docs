---
title: "ECS Deploy Runner Invoke IAM Policies module"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem} from '../../../../../src/components/HclListItem.tsx';

<a href="https://github.com/gruntwork-io/terraform-aws-ci/tree/main/modules%2Fecs-deploy-runner-invoke-iam-policy" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-ci/releases?q=" className="link-button" title="Release notes for only the service catalog versions which impacted this service.">Release Notes</a>

# ECS Deploy Runner Invoke IAM Policies module

This Terraform Module defines an [IAM
policy](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies.html) that
defines the minimal set of permissions necessary to trigger a deployment event for the deployment pipeline implemented
in the [ecs-deploy-runner module](https://github.com/gruntwork-io/terraform-aws-ci/tree/main/modules/ecs-deploy-runner).

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




## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Required

<HclListItem name="deploy_runner_invoker_lambda_function_arn" requirement="required" type="string">
<HclListItemDescription>

ARN of the AWS Lambda function that can be used to invoke the ECS Deploy Runner.

</HclListItemDescription>
</HclListItem>

<HclListItem name="deploy_runner_ecs_cluster_arn" requirement="required" type="string">
<HclListItemDescription>

ARN of the ECS Cluster that is used to run the ECS Deploy Runner tasks.

</HclListItemDescription>
</HclListItem>

<HclListItem name="deploy_runner_cloudwatch_log_group_name" requirement="required" type="string">
<HclListItemDescription>

The name of the CloudWatch Log Group that is used to store the logs for the ECS Deploy Runner tasks.

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

<HclListItem name="name">
<HclListItemDescription>

The name of the IAM policy created with the permissions for invoking the ECS Deploy Runner.

</HclListItemDescription>
</HclListItem>

<HclListItem name="id">
<HclListItemDescription>

The AWS ID of the IAM policy created with the permissions for invoking the ECS Deploy Runner.

</HclListItemDescription>
</HclListItem>

<HclListItem name="arn">
<HclListItemDescription>

The ARN of the IAM policy created with the permissions for invoking the ECS Deploy Runner.

</HclListItemDescription>
</HclListItem>

</TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-ci/tree/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-ci/tree/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-ci/tree/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "6874d181d873fa2105c8de49d89577ca"
}
##DOCS-SOURCER-END -->

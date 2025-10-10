import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Upgrading Pipelines GitLab Workflows From v1 to v2

To upgrade Pipelines from v1 to v2, perform the following changes in each
repository that includes the Gruntwork Pipelines Workflows.

## Updating Terragrunt Version

The minimum supported Terragrunt version in v4 is **0.86.3**.

In `.mise.toml` in the root of the repository, update the `terragrunt` version e.g.

```
terragrunt = "0.86.3"
```

See the [Terragrunt Release Notes](https://github.com/gruntwork-io/terragrunt/releases)
for detailed information on the changes to Terragrunt.

:::note Progress Checklist

- [ ] Terragrunt Version Updated

:::

## Pipelines Workflow

In your infrastructure-live repository, replace the contents of the v1 `.gitlab-ci.yml` file with the v2 `.gitlab-ci.yml`. See the v1 and v2 content below.

### Change Summary

- Spec inputs added to allow running Drift Detection and Unlock Unit workflows
- Pipelines Workflow job updated to reference `@v2`

<Tabs groupId="gitlab-ci-yml">
<TabItem value="v2-yaml" label="v2">

```yaml title=".gitlab-ci.yml"
spec:
  inputs:
    pipelines_workflow:
      default: "infrachanges"
      options: ["infrachanges", "drift-detection", "unlock-unit", "unlock-all"]
    pipelines_drift_detection_filter:
      type: string
      description: "[drift-detection] Limit drift detection to units matching filter https://docs.gruntwork.io/2.0/docs/pipelines/guides/running-drift-detection#drift-detection-filter"
      default: ""
    pipelines_drift_detection_branch:
      type: string
      description: "[drift-detection] The branch name used for drift remediation MRs"
      default: "drift-detection"
    pipelines_unlock_unit_path:
      type: string
      description: "[unlock-unit] Path to the Terragrunt Unit directory where the lock is held (everything up to but not including terragrunt.hcl)"
      default: ""
    pipelines_unlock_unit_lock_id:
      type: string
      description: "[unlock-unit] The ID of the lock, usually a GUID. This is generally found in the console output when Terraform/OpenTofu command fails due to a timeout waiting to acquire a lock"
      default: ""
    pipelines_unlock_unit_stack_path:
      type: string
      description: "[unlock-unit] Path to a Terragrunt Stack directory (everything up to but not including terragrunt.stack.hcl) that generates content required to run unlock in a specified Terragrunt Unit"
      default: ""
---
workflow:
  name: GruntworkPipelines
  rules:
    - if: $CI_PIPELINE_SOURCE == 'merge_request_event'
    - if: $CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH

include:
  - component: gitlab.com/gruntwork-io/pipelines-workflows/pipelines@v2
    inputs:
      pipelines_workflow: $[[ inputs.pipelines_workflow ]]
      pipelines_drift_detection_filter: $[[ inputs.pipelines_drift_detection_filter ]]
      pipelines_drift_detection_branch: $[[ inputs.pipelines_drift_detection_branch ]]
      pipelines_unlock_unit_path: $[[ inputs.pipelines_unlock_unit_path ]]
      pipelines_unlock_unit_lock_id: $[[ inputs.pipelines_unlock_unit_lock_id ]]
      pipelines_unlock_unit_stack_path: $[[ inputs.pipelines_unlock_unit_stack_path ]]

variables:
  GIT_DEPTH: 0

```

</TabItem>
<TabItem value="v1-yaml" label="v1">

```yaml title=".gitlab-ci.yml-v1"
workflow:
  name: GruntworkPipelines
  rules:
    - if: $CI_PIPELINE_SOURCE == 'merge_request_event'
    - if: $CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH

include:
  - component: gitlab.com/gruntwork-io/pipelines-workflows/pipelines@v1

variables:
  GIT_DEPTH: 0

```

</TabItem>
</Tabs>

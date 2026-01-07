# Installing Drift Detection

import PersistentCheckbox from '/src/components/PersistentCheckbox';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::note
Pipelines Drift Detection is exclusively available to AWS Accelerator Enterprise customers on GitHub and GitLab.
:::

For new pipelines repositories using the latest version of Pipelines, Drift Detection is installed automatically and requires no additional action.

To upgrade an existing repository and enable Drift Detection, follow these steps:

### Step 1 - Ensure authentication is properly configured

<Tabs groupId="platform">
<TabItem value="github" label="GitHub">

Verify that the [GitHub App](/2.0/docs/pipelines/installation/viagithubapp) is installed and in use for this repository. Drift Detection relies on permissions granted by the GitHub App and is not compatible with machine user tokens.

<PersistentCheckbox id="install-drift-1" label="GitHub App In Use" />

</TabItem>
<TabItem value="gitlab" label="GitLab">

Verify that your GitLab project has the necessary [Machine User tokens](/2.0/docs/pipelines/installation/viamachineusers) configured. Drift Detection requires:
- `PIPELINES_GITLAB_TOKEN`: A GitLab access token with `api` scope
- `PIPELINES_GITLAB_READ_TOKEN`: A GitLab access token with `read_repository` scope

<PersistentCheckbox id="install-drift-1-gitlab" label="GitLab Machine User Tokens Configured" />

</TabItem>
</Tabs>

### Step 2 - Set up the workflow file

<Tabs groupId="platform">
<TabItem value="github" label="GitHub">

Create a new workflow file in your repository at `.github/workflows/pipelines-drift-detection.yml`.

This directory is the same location as your other Pipelines workflows.

Add the following content to the workflow:

```yml
name: Pipelines Drift Detection
run-name: "[GWP]: Pipelines Drift Detection"
on:
  # Uncomment to enable scheduled Drift Detection
  # schedule:
  #  - cron: '15 12 * * 1'
  workflow_dispatch:
    inputs:
      pipelines_drift_detection_filter:
        description: Limit drift detection to units matching filter https://docs.gruntwork.io/2.0/docs/pipelines/guides/running-drift-detection#drift-detection-filter
        type: string
      pipelines_drift_detection_branch:
        description: The branch name used for drift remediation PRs
        default: drift-detection
        type: string
permissions:
  id-token: write

jobs:
  GruntworkPipelines:
    uses: gruntwork-io/pipelines-workflows/.github/workflows/pipelines-drift-detection.yml@v4
    with:
      pipelines_drift_detection_filter: ${{ inputs.pipelines_drift_detection_filter }}
      pipelines_drift_detection_branch: ${{ inputs.pipelines_drift_detection_branch }}
```

<PersistentCheckbox id="install-drift-2" label="Workflow File Created" />

</TabItem>
<TabItem value="gitlab" label="GitLab">

Drift Detection for GitLab is implemented in the `pipelines-workflows` GitLab CI/CD Component. Add the following configuration to your `.gitlab-ci.yml` file:

```yml
spec:
  inputs:
    pipelines_workflow:
      options: ["infrachanges", "drift-detection"]
      description: "Select the pipeline workflow to use"
      default: "infrachanges"
    pipelines_drift_detection_filter:
      type: string
      description: "Filter for drift detection"
      default: ""
    pipelines_drift_detection_branch:
      type: string
      description: "Branch name for drift detection"
      default: "drift-detection"
---
workflow:
  name: GruntworkPipelines
  rules:
    - if: $CI_PIPELINE_SOURCE == 'merge_request_event'
    - if: $CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH
include:
  # Reference the latest version of the pipelines workflow, replace this path if you are
  # using a fork of the pipelines-workflows repository
  - component: $CI_SERVER_FQDN/gruntwork-io/pipelines-workflows/pipelines@v2
    inputs:
      pipelines_workflow: $[[ inputs.pipelines_workflow ]]
      pipelines_drift_detection_filter: $[[ inputs.pipelines_drift_detection_filter ]]
      pipelines_drift_detection_branch: $[[ inputs.pipelines_drift_detection_branch ]]
```

<PersistentCheckbox id="install-drift-2-gitlab" label="GitLab CI Configuration Updated" />

</TabItem>
</Tabs>

### Step 3 - Run your first drift detection job

Follow the instructions at [Running Drift Detection](/2.0/docs/pipelines/guides/running-drift-detection) to start using the new workflow.

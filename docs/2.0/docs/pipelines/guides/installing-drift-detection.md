# Installing Drift Detection

import PersistentCheckbox from '/src/components/PersistentCheckbox';

:::note
Pipelines Drift Detection is only available to Devops Foundations Enterprise customers.
:::

If you're creating new pipelines repositories using the latest version of Pipelines, then Drift Detection will be installed automatically without any action on your part.

If you want to upgrade an older repository to add Drift Detection perform the following steps:

### Step 1

Ensure you are using the [GitHub App](/2.0/docs/pipelines/installation/viagithubapp) in this repository. Drift Detection requires permissions from the GitHub App and is not available via machine user tokens.

<PersistentCheckbox id="install-drift-1" label="GitHub App In Use" />

### Step 2

Create a new workflow file in your repository at `.github/workflows/pipelines-drift-detection.yml`

This is the same directory where your other Pipelines workflows are located.

Add the following content to the workflow

```yml
name: Pipelines Drift Detection
run-name: "[GWP]: Pipelines Drift Detection"
on:
  # Uncomment to enable scheduled Drift Detection
  # schedule:
  #  - cron: '15 12 * * 1'
  workflow_dispatch:
    inputs:
      path:
        description: (Optional) Path to filter units e.g. "./management/*"
        type: string
      branch-name:
        description: (Optional) branch name to open Drift Detection PRs with
        default: drift-detection
        type: string
permissions:
  id-token: write

jobs:
  GruntworkPipelines:
    uses: gruntwork-io/pipelines-workflows/.github/workflows/pipelines-drift-detection.yml@v3
    with:
      path: ${{ inputs.path }}
      branch-name: ${{ inputs.branch-name }}
```

Commit the changes to the repository. If you are using [branch protection](/2.0/docs/pipelines/installation/branch-protection) (highly  recommended) you will need to create a new pull request to add the workflow.

<PersistentCheckbox id="install-drift-2" label="Workflow File Created" />

### Step 3

Follow the instructions at [Running Drift Detection](/2.0/docs/pipelines/guides/running-drift-detection) to start using the new workflow.

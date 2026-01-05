# Unlocking State Locks

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Overview

Occasionally, OpenTofu/Terraform state locks may remain in place if the process holding the lock does not release it properly. This can occur due to unexpected failures, such as crashes or premature termination of jobs.

When this occurs, jobs will fail after a timeout with `Error: Error acquiring the state lock`, and will not succeed until the lock is manually removed.

:::note
You might have a default lock timeout in your `root.hcl` file that looks like this:

```hcl
terraform {
  extra_arguments "retry_lock" {
    commands  = get_terraform_commands_that_need_locking()
    arguments = ["-lock-timeout=10m"]
  }
}
```

:::

## Unlocking Unit State

When a unit lock is held, the lock can be manually removed with the unlock unit workflow. This is a convenience workflow for running the OpenTofu/Terraform force-unlock command. The workflow requires the following inputs:

### Lock ID

The Lock ID can be found in the logs where a job has failed to acquire the state lock.

![Lock ID](/img/pipelines/maintain/unlock-logs-lock-id.png)

In this example the ID is `ca9c97f1-6315-c0d1-56ef-efb8c8996e8c`.

### Unit Path

The Unit Path is the relative path to the directory containing your `terragrunt.hcl` file where the lock is being held.

In the above example the Unit Path is `acme/us-east-1/storage/s3bucket1`.

### Stack Path

Optional: When a Unit within a Stack is locked, Pipelines requires the Stack Path to generate the stack before running force-unlock in the Unit.

<Tabs groupId="platform">
<TabItem value="github" label="GitHub">

1. From the Actions Tab, select Pipelines Unlock from the list of workflows on the left.
2. Select the Run workflow dropdown on the right
3. Enter the Lock ID and Unit Path values into the dropdown
4. Select Run workflow

![GitHub Unlock Unit Workflow](/img/pipelines/maintain/unlock-unit-github.png)

</TabItem>
<TabItem value="gitlab" label="GitLab">

1. From the Pipelines tab select New Pipeline
2. Select the `pipelines_workflow` Input and change the Value to `unlock-unit` from the dropdown
3. Enter the Lock ID and Unit Path into the `pipelines_unlock_unit_lock_id` and `pipelines_unlock_unit_path` inputs
4. Select New pipeline

![GitLab Unlock Unit Workflow](/img/pipelines/maintain/unlock-unit-gitlab.png)

</TabItem>
</Tabs>

## Unlocking All State

:::warning
The Unlock All workflow currently only unlocks AWS DynamoDB locks. It does this by attempting to delete the entire `terraform-locks` table in each region.
:::

In the event that many locks are being held, and it is difficult to obtain the Lock IDs, an Unlock All workflow exists to forcibly remove all locks. Run this workflow with caution.

<Tabs groupId="platform">
<TabItem value="github" label="GitHub">

1. From the Actions Tab, select Pipelines Unlock from the list of workflows on the left.
2. Select the Run workflow dropdown on the right
3. Tick the checkbox to forcibly reset all locks
4. Select Run workflow

![GitHub Unlock All Workflow](/img/pipelines/maintain/unlock-all-github.png)

</TabItem>
<TabItem value="gitlab" label="GitLab">

1. From the Pipelines tab select New Pipeline
2. Select the `pipelines_workflow` Input and change the Value to `unlock-all` from the dropdown
3. Select New pipeline

![GitLab Unlock All Workflow](/img/pipelines/maintain/unlock-all-gitlab.png)

</TabItem>
</Tabs>

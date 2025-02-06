# Branch Protection

Gruntwork Pipelines is designed to function within a PR-based workflow. Approving a pull request (PR) or merge request (MR) signals approval to deploy infrastructure, so it's important to configure repository settings and branch protection accurately.

## Recommended settings

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="GitHub" label="GitHub">

By default, Gruntwork Pipelines runs a `plan` on every push to a PR and an `apply` on every push to `main`. To ensure that infrastructure changes are reviewed and approved before deployment, branch protection should be enabled on `main` to prevent unauthorized changes.

- Enable **Require a pull request before merging** to ensure all changes go through a pull request.
- Enable **Require approvals** to require at least one approval before merging. Optionally, configure more than one required approval.
- Enable **Require review from code owners** for controlled reviews of specific code areas. For more details, see [GitHub Documentation](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners).
- Enable **Require status checks to pass before merging** to ensure the `apply` does not run if the `plan` fails, or if organizational validation rules fail.
- Enable **Require branches to be up to date before merging** and select the `Pipelines` workflow as required.

  :::info

    This prevents running an inaccurate `apply` by ensuring the PR is up-to-date. However, it increases GitHub Actions minute usage. If disabled, another PR merged into `main` after the `plan` could lead to an inaccurate `apply`. Evaluate whether this tradeoff aligns with your organization's risk tolerance.

    Example warning when PR is not up-to-date:

    ![Recommended Branch Protection Settings](/img/pipelines/pr-sync.png)

  :::

Below is an example of the recommended branch protection settings:

![Recommended Branch Protection Settings](/img/pipelines/repo-settings.png)

:::info
  Consider enabling **Do not allow bypassing the above settings** to prevent admins from bypassing branch protection rules. While this improves security, it may limit options for emergency fixes.
:::

:::info
  GitHub Enterprise customers can also configure [push rulesets](https://docs.github.com/en/enterprise-cloud@latest/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/about-rulesets#push-rulesets). This feature allows restricting edits to `.github/workflows` files, ensuring infrastructure changes are properly reviewed and approved through Pipelines. Follow the documentation [here](https://docs.github.com/en/enterprise-cloud@latest/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/creating-rulesets-for-a-repository#creating-a-push-ruleset) to enable push rulesets if available.
:::

</TabItem>
<TabItem value="GitLab" label="GitLab">

## GitLab Recommended Settings

For GitLab repositories, similar protection rules should be configured on the default branch (typically `main`). Navigate to `Settings > Repository > Protected branches` to configure the following settings:

- Set the initial default branch to **Protected**.
- Set **Allowed to merge** to "Developers" or a specific group to control who can merge changes.
- Set **Allowed to push** to "No one" to prevent direct pushes to the protected branch.
- (Optional) Enable **Require approval from code owners** to ensure designated reviewers approve changes to specific files.

Below is an example of the recommended GitLab branch protection settings:

![GitLab Branch Protection Settings](/img/pipelines/gitlab_branch_protection.png)

</TabItem>
</Tabs>

## PR/MR Workflow

1. Developers make infrastructure changes on a branch and create a PR (GitHub) or MR (GitLab) against the default branch.
2. On PR/MR creation, Gruntwork Pipelines runs `plan` for any changes and posts the results as a comment.
3. Gruntwork Pipelines re-runs `plan` on every push to the branch and updates the results in a comment.
4. Gather approvals. If Code Owners is enabled, all relevant code owners must approve the changes.
5. Once approved, merge the PR/MR into the default branch.
6. Gruntwork Pipelines runs `apply` for the changes from the PR/MR.
   - On success, the PR/MR is updated to indicate the successful `apply`.
   - On failure, the PR/MR is updated to indicate the failure of the `apply`. If the failure cannot be resolved by retrying, a new PR/MR must be created to address the issues.

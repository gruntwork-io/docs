# Adding Branch Protection to a GitLab Project

Gruntwork Pipelines is designed to function within a merge request (MR) based workflow. Approving a merge request signals approval to deploy infrastructure, so it's important to configure repository settings and branch protection accurately.

## GitLab Recommended Settings

For GitLab repositories, similar protection rules should be configured on the default branch (typically `main`). Navigate to `Settings > Repository > Protected branches` to configure the following settings:

- Set the initial default branch to **Protected**.
- Set **Allowed to merge** to "Developers" or a specific group to control who can merge changes.
- Set **Allowed to push** to "No one" to prevent direct pushes to the protected branch.
- (Optional) Enable **Require approval from code owners** to ensure designated reviewers approve changes to specific files.

Below is an example of the recommended GitLab branch protection settings:

![GitLab Branch Protection Settings](/img/pipelines/gitlab_branch_protection.png)

## Securing User Accounts

Branch protection rules are only effective if you are confident that the users who have access to your repository are legitimate and trusted.

You can improve your security posture by ensuring that:

1. [User accounts have Multi-Factor Authentication (MFA) enabled](https://docs.gitlab.com/user/profile/account/two_factor_authentication/).
2. [User accounts don't have compromised credentials](https://docs.gitlab.com/auth/auth_practices/).
3. [User accounts are granted access to infrastructure-live repositories on a least privilege basis](https://en.wikipedia.org/wiki/Principle_of_least_privilege).

## Merge Request Workflow

1. Developers make infrastructure changes on a branch and create a merge request (MR) against the default branch.
2. On merge request creation, Gruntwork Pipelines runs `plan` for any changes and posts the results as a comment.
3. Gruntwork Pipelines re-runs `plan` on every push to the branch and updates the results in a comment.
4. Gather approvals. If Code Owners is enabled, all relevant code owners must approve the changes.
5. Once approved, merge the merge request into the default branch.
6. Gruntwork Pipelines runs `apply` for the changes from the merge request.
   - On success, the merge request is updated to indicate the successful `apply`.
   - On failure, the merge request is updated to indicate the failure of the `apply`. If the failure cannot be resolved by retrying, a new merge request must be created to address the issues.

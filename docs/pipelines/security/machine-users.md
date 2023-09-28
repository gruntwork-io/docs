# Machine Users

Gruntwork recommends using CI users in Gruntwork Pipelines, separate from human users in your organization. Using a CI user ensures that a workflow won't break due to an employee leaving your company. Further, using CI users allow you to apply granular permissions that may normally be too restrictive for a normal employee to do their daily work.

## Creating machine users

Gruntwork recommends using two ci-users - one with the ability to open pull requests and run workflows on your behalf and another that can only read code from GitHub. Restrictive permissions are then applied to each user to limit them to only perform the required actions to accomplish their tasks. This means that in order to actually run a pipeline job, both users must be involved at separate stages.

We’ll refer to this user as `ci-user` and `ci-read-only-user`, but you may name them anything you like. These users **must**:

    1. Be a member of your GitHub Organization
    1. Have permission to create Pull requests within your GitHub Organization
    1. Be a member of your team in **Gruntwork**’s GitHub Organization (See [instructions on inviting a user to your team](https://docs.gruntwork.io/developer-portal/invite-team#inviting-team-members) and [linking the user’s GitHub ID to Gruntwork](https://docs.gruntwork.io/developer-portal/link-github-id))

### ci-user

The `ci-user` orchestrates workflows, can open pull requests from automated code generation, and leave comments on pull requests. This user should have two GitHub Fine Grained [Personal Access Tokens (PAT)](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#fine-grained-personal-access-tokens)s with the following permissions.

1. `INFRA_LIVE_ACCESS`. This token will be used to grant GitHub Actions access to clone your `infrastructure-live` repository, open PRs, and create comments & issues.

    This token **must** have:

    - Content (read & write) access
    - Pull Requests (read & write) access

    to your **`infrastructure-live`** repo in your GitHub Organization.

    ![INFRA_LIVE_ACCESS PAT Configuration](/img/pipelines/security/INFRA_LIVE_ACCESS.png)

1. `PIPELINES_DISPATCH`. This token will be used to grant GitHub Actions permission to trigger workflows in your `infrastructure-pipelines` repository.

    This token **must** have:

    - Contents (read only) access
    - Actions (read & write) access

    to your **`infrastructure-pipelines`** repo in your GitHub Organization.

    ![PIPELINES_DISPATCH PAT Configuration](/img/pipelines/security/PIPELINES_DISPATCH.png)


### ci-read-only-user

The `ci-read-only-user` is used clone `infrastructure-live` and in terragrunt actions to access Gruntwork Library modules and your own `infrastructure-modules` repository (or repositories). The `ci-read-only-user` should have a single classic token [Personal Access Tokens (PAT)](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#personal-access-tokens-classic) with read permissions. Because classic PATs have coarse granularity, we recommend putting this user in a GitHub team that only has READ access to `infrastructure-live` and `infrastructure-modules` in your own GitHub Organization. By adding this user to the Gruntwork Developer portal, they will automatically gain access to the Gruntwork Library.

Create the following token for the `ci-read-only-user`:

1. `GRUNTWORK_CODE_ACCESS`. This token will be used to manage access to Gruntwork resources during GitHub Action runs.

This token **must** have `repo` scopes.

![GRUNTWORK_CODE_ACCESS PAT Configuration](/img/pipelines/security/GRUNTWORK_CODE_ACCESS.png)

The expiration of this token is up to you and the security posture of your organization, Gruntwork recommend 90 days to avoid having to regularly rotate a token and secrets.

## Repository Secrets

Gruntwork Pipelines reads these secrets from GitHub Actions secrets created in the repo. For steps on how to create repository Actions secrets, refer to [creating secrets for a repository](https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions#creating-secrets-for-a-repository).

In the `infrastructure-live` repository create the following secrets:
1. `GRUNTWORK_CODE_ACCESS_TOKEN`. This should be assigned the _`GRUNTWORK_CODE_ACCESS`_ token generated in the step above as its value.
1. `INFRA_LIVE_ACCESS_TOKEN`. This should be assigned the _`INFRA_LIVE_ACCESS`_ token generated in the step above as its value.
1. `PIPELINES_DISPATCH_TOKEN`. This should be assigned the _`PIPELINES_DISPATCH`_ token generated in the step above as its value.

In the `infrastructure-pipelines` repository create the following secrets:
1. `GRUNTWORK_CODE_ACCESS_TOKEN`. This should be assigned the _`GRUNTWORK_CODE_ACCESS`_ token generated in the step above as its value.
1. `INFRA_LIVE_ACCESS_TOKEN`. This should be assigned the _`INFRA_LIVE_ACCESS`_ token generated in the step above as its value.

Your organization is required to rotate tokens and update all secrets that use them.


<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "b6355671fae15f5b9b784f1674f3ca5b"
}
##DOCS-SOURCER-END -->

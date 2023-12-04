import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Machine users

Gruntwork recommends using CI users in Gruntwork Pipelines, separate from human users in your organization. Using a CI user ensures that a workflow won't break due to an employee leaving your company. Further, using CI users allow you to apply granular permissions that may normally be too restrictive for a normal employee to do their daily work.

:::info

 This guide will take approximately 25 minutes to complete.

:::

## Creating machine users

Gruntwork Pipelines requires using two machine users; one with the ability to open pull requests and run workflows on your behalf and another that can only read code from GitHub. Restrictive permissions are then applied to each user to limit them to only perform the required actions to accomplish their tasks. This means that in order to actually run a pipeline job, both users must be involved at separate stages.

We’ll refer to this user as `ci-user` and `ci-read-only-user`, but you may name them anything you like. These users **must**:

1. Both be members of your GitHub Organization
1. Both be members of your team in **Gruntwork**’s GitHub Organization (See [instructions on inviting a user to your team](https://docs.gruntwork.io/developer-portal/invite-team#inviting-team-members) and [linking the user’s GitHub ID to Gruntwork](https://docs.gruntwork.io/developer-portal/link-github-id))

## Storing secrets
During this setup, you will need to generate and securely store three GitHub tokens for two GitHub users. You will need a temporary location for these sensitive values between generating them and storing them in GitHub Actions. Do so according to your company's recommended security best practices (e.g., do not store them in Slack, a sticky note, etc., during this exercise.)

:::note
Your organization is required to rotate the GitHub tokens and update all GitHub secrets that use them.
:::

### ci-user

The `ci-user` orchestrates workflows, can open pull requests from automated code generation, and leave comments on pull requests. This user should have two GitHub Fine Grained [Personal Access Tokens (PAT)](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#fine-grained-personal-access-tokens)s with the following permissions.

First, invite the `ci-user` to both your `infrastructure-live` and `infrastructure-pipelines` repositories with collaborator access. Then, create the following access tokens in the `ci-user`'s GitHub account:

1. `INFRA_LIVE_ACCESS`. This is a fine-grained GitHub access token and will be used to grant GitHub Actions access to clone your `infrastructure-live` repository, open PRs, and create comments & issues.

    This token **must** have the following permissions to your **`infrastructure-live`** repo in your GitHub Organization:

    - Content read & write access
    - Issues read & write access
    - Metadata read access
    - Pull Requests read & write access
    - Workflows read & write access

    ![INFRA_LIVE_ACCESS PAT Configuration](/img/pipelines/security/INFRA_LIVE_ACCESS.png)

1. `PIPELINES_DISPATCH`. This token will be used to grant GitHub Actions permission to trigger workflows in your `infrastructure-pipelines` repository to your **`infrastructure-pipelines`** repo in your GitHub Organization:

    This token **must** have:

    - Actions read & write access
    - Contents read only access
    - Metadata read access

    ![PIPELINES_DISPATCH PAT Configuration](/img/pipelines/security/PIPELINES_DISPATCH.png)

1. `PIPELINES_BOOTSTRAP`. This token will be used to grant GitHub Actions permission to create open PRs and create comments in your `infrastructure-pipelines` repository in your GitHub Organization. **This is only required during the bootstrap process of the pipelines repository and should be removed immediately after.**

    This token **must** have:

    - Contents read & write access
    - Metadata read access
    - Pull Requests read & write access
    - Workflows read & write access

    ![PIPELINES_BOOTSTRAP PAT Configuration](/img/pipelines/security/PIPELINES_BOOTSTRAP.png)

### ci-read-only-user

This user is created to pull down Terraform/OpenTofu code, but not to apply it. The `ci-read-only-user` is used clone `infrastructure-live` and in Terragrunt actions to access Gruntwork Library modules and your own `infrastructure-modules` repository or any custom module repositories that are private.

The `ci-read-only-user` should have a single classic token [Personal Access Tokens (PAT)](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#personal-access-tokens-classic) with read permissions. Classic PATs have coarse granularity, we recommend putting this user in a GitHub team that only has READ access to `infrastructure-live` and any relevant module repositories in your own GitHub Organization. By adding this user to the Gruntwork Developer portal, they will automatically gain access to the Gruntwork Library.

Invite `ci-user-read-only` to your `infrastructure-live` repository with collaborator access. Create the following token for the `ci-read-only-user`:

1. `GRUNTWORK_CODE_ACCESS`. This token will be used to manage access to Gruntwork resources during GitHub Action runs.

This token **must** have `repo` scopes.

![GRUNTWORK_CODE_ACCESS PAT Configuration](/img/pipelines/security/GRUNTWORK_CODE_ACCESS.png)

The expiration of this token is up to you and the security posture of your organization, Gruntwork recommend 90 days to avoid having to regularly rotate a token and secrets.

## Invite both machine users to Gruntwork
Ensure both of these machine users are members of your team in **Gruntwork**’s GitHub Organization (See [instructions on inviting a user to your team](https://docs.gruntwork.io/developer-portal/invite-team#inviting-team-members) and [linking the user’s GitHub ID to Gruntwork](https://docs.gruntwork.io/developer-portal/link-github-id))

### Configure secrets for GitHub Actions

:::info

The recommended path for storing secrets in GitHub Actions is with [Organization-level secrets](https://docs.github.com/en/codespaces/managing-codespaces-for-your-organization/managing-secrets-for-your-repository-and-organization-for-github-codespaces#adding-secrets-for-an-organization), however not all GitHub plans support Organization secrets that can be used with specific repositories. If this is the case for your GitHub organization, you should use [Repository-level secrets](https://docs.github.com/en/codespaces/managing-codespaces-for-your-organization/managing-secrets-for-your-repository-and-organization-for-github-codespaces#adding-secrets-for-a-repository).

:::

:::info

Since this guide implements secrets that are scoped to specific repositories, anytime a new `infrastructure-live` or `infrastructure-pipelines` repository is created, the permissions for these tokens will need to be updated.

:::

<Tabs groupId="github-actions-secrets">
<TabItem value="Organization Secrets" label="Organization Secrets" default>

1. Navigate to your top level GitHub Organization and select the **Settings** tab.

1. From the navigation bar on the left side, select **Secrets and variables** then select **Actions**.

1. Using the **New organization secret** option, add the following secrets:

  - `GRUNTWORK_CODE_ACCESS_TOKEN`

    1. This should be assigned the _`GRUNTWORK_CODE_ACCESS`_ token generated by the `ci-read-only-user` in the [secrets section](#ci-read-only-user) as its value.

    1. **Repository access**. Using the `Selected repositories` option select both the `infrastructure-live` and `infrastructure-pipelines` repositories.

  - `INFRA_LIVE_ACCESS_TOKEN`

    1. This should be assigned the _`INFRA_LIVE_ACCESS`_ token generated by the `ci-user` in the [secrets section](#ci-user) as its value.

    1. **Repository access**. Using the `Selected repositories` option select both the `infrastructure-live` and `infrastructure-pipelines` repositories. 

  - `PIPELINES_DISPATCH_TOKEN`
  
    1. This should be assigned the _`PIPELINES_DISPATCH`_ token generated by the `ci-user` in the [secrets section](#ci-user) as its value.

    1. **Repository access**. Using the `Selected repositories` option select **only** the `infrastructure-live` repository.

  - `PIPELINES_BOOTSTRAP_TOKEN`

    1. This should be assigned the _`PIPELINES_BOOTSTRAP`_ token generated by the `ci-user` in the [secrets section](#ci-user) as its value.

    1. **Repository access**. Using the `Selected repositories` option select **only** the `infrastructure-pipelines` repository.

  :::warning

  After the bootstrap process is complete, you should delete the following tokens for security purposes:

    - The `PIPELINES_BOOTSTRAP` Personal Access Token from the `ci-user` GitHub account
    - The `PIPELINES_BOOTSTRAP_TOKEN` GitHub Actions secret from the `infrastructure-pipelines` repository

  :::

  :::info

  For additional information on creating and using Github Actions Organization secrets, please refer to the [GitHub Documentation](https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions#creating-secrets-for-an-organization).

  :::

</TabItem>
<TabItem value="Repository Secrets" label="Repository Secrets">

Gruntwork Pipelines reads these secrets from GitHub Actions secrets created in the repo. For steps on how to create repository Actions secrets, refer to [creating secrets for a repository](https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions#creating-secrets-for-a-repository).

### infrastructure-live

In the `infrastructure-live` repository create the following secrets:
1. `GRUNTWORK_CODE_ACCESS_TOKEN`. This should be assigned the _`GRUNTWORK_CODE_ACCESS`_ token generated by the `ci-read-only-user` in the [secrets section](#ci-read-only-user) as its value.
1. `INFRA_LIVE_ACCESS_TOKEN`. This should be assigned the _`INFRA_LIVE_ACCESS`_ token generated by the `ci-user` in the [secrets section](#ci-user) as its value.
1. `PIPELINES_DISPATCH_TOKEN`. This should be assigned the _`PIPELINES_DISPATCH`_ token generated by the `ci-user` in the [secrets section](#ci-user) as its value.

### infrastructure-pipelines

In the `infrastructure-pipelines` repository create the following secrets:
1. `GRUNTWORK_CODE_ACCESS_TOKEN`. This should be assigned the _`GRUNTWORK_CODE_ACCESS`_ token generated by the `ci-read-only-user` in the [secrets section](#ci-read-only-user) as its value.
1. `INFRA_LIVE_ACCESS_TOKEN`. This should be assigned the _`INFRA_LIVE_ACCESS`_ token generated by the `ci-user` in the [secrets section](#ci-user) as its value.
1. `PIPELINES_BOOTSTRAP_TOKEN`. This should be assigned the _`PIPELINES_BOOTSTRAP`_ token generated by the `ci-user` in the [secrets section](#ci-user) as its value.

  :::warning

  After the bootstrap process is complete, you should delete the following tokens for security purposes:

    - The `PIPELINES_BOOTSTRAP` Personal Access Token from the `ci-user` GitHub account
    - The `PIPELINES_BOOTSTRAP_TOKEN` GitHub Actions secret from the `infrastructure-pipelines` repository

  :::

  :::info

  For additional information on creating and using Github Actions Repository secrets, please refer to the [GitHub Documentation](https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions#creating-secrets-for-a-repository)

  :::

</TabItem>
</Tabs>
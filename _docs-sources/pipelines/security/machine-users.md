import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Machine users

:::info Recent Upgrade
This documentation relates to the latest version of Gruntwork Pipelines released in May 2024.

If you are using the older version of Gruntwork Pipelines that includes the `infrastructure-pipelines` repository, click [here](../../infrastructure-pipelines/overview/deprecation.md) to learn more about the deprecation of that version.
:::

Gruntwork recommends using CI users in Gruntwork Pipelines, separate from human users in your organization. Using a CI user ensures that a workflow won't break due to an employee leaving your company. Using CI users allows you to apply granular permissions that may normally be too restrictive for a normal employee to do their daily work.

:::info

This guide will take approximately 30 minutes to complete.

:::

## Creating machine users

Gruntwork Pipelines requires using two machine users; one with the ability to open pull requests and run workflows on your behalf and another that can only has read access to repositories in GitHub. Restrictive permissions are then granted to each user, granting them requisite permissions to accomplish their tasks. This means that in order to actually run a pipeline job, both users may be involved at separate stages.

We’ll refer to this user as `ci-user` and `ci-read-only-user`, but you may name them anything you like. These users **must**:

1. Both be members of your GitHub Organization
2. Both be members of your team in **Gruntwork**’s GitHub Organization (See [instructions on inviting a user to your team](https://docs.gruntwork.io/developer-portal/invite-team#inviting-team-members) and [linking the user’s GitHub ID to Gruntwork](https://docs.gruntwork.io/developer-portal/link-github-id))

## Storing secrets

During this setup, you will need to generate and securely store three GitHub tokens for two GitHub users. You will need a temporary location for these sensitive values between generating them and storing them in GitHub Actions. Do so according to your company's recommended security best practices (e.g., do not store them in Slack, a sticky note, etc., during this exercise.)


:::note
Your organization is required to rotate the GitHub tokens and update all GitHub secrets that use them.
:::

:::tip
Gruntwork recommends that you use a password manager like [1Password](https://1password.com) to store these secrets securely.

If you are screen sharing when generating these tokens, **hide or pause your screen** before selecting the `Generate token` button to prevent the token from being exposed.
:::



### ci-user

The `ci-user` orchestrates workflows, can open pull requests from automated code generation, and leave comments on pull requests. This user should have two GitHub Fine Grained [Personal Access Tokens (PAT)](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#fine-grained-personal-access-tokens)s with the following permissions.

#### Invite the `ci-user` to your repository

Invite the `ci-user` to your `infrastructure-live-root` and `infrastructure-live-access-control` repositories with write access.

#### Create the appropriate tokens for the `ci-user`

Create the following access tokens in the `ci-user`'s GitHub account:

1. `INFRA_ROOT_WRITE_TOKEN`. This is a fine-grained GitHub Personal Access Token and will be used to grant GitHub Actions access to clone your `infrastructure-live-root` repository, open PRs, and create/update comments.

   This token **must** have the following permissions to your **`infrastructure-live-root`** repo **in your GitHub Organization**:

   - Content read & write access
   - Issues read & write access
   - Metadata read access
   - Pull requests read & write access
   - Workflows read & write access

   ![INFRA_ROOT_WRITE_TOKEN PAT Configuration](/img/pipelines/security/INFRA_ROOT_WRITE_TOKEN.png)

2. `ORG_REPO_ADMIN_TOKEN`. This is a fine-grained GitHub Personal Access Token that will be used to initially bootstrap repositories vended as part of DevOps Foundations.

   In addition, Enterprise customers will have it used during account vending to create new delegated `infrastructure-live` repositories in their GitHub Organization when vending AWS accounts with the `isDelegated` value selected.

   :::tip
   If you are not an Enterprise customer, you can delete it after DevOps Foundations setup.
   :::

   This token **must** have the following permissions to **all** repositories the `ci-user` has access to **in your GitHub Organization**:

   - Administration read & write access
   - Contents read & write access
   - Metadata read access
   - Pull requests read & write access
   - Workflows read & write access

   ![ORG_REPO_ADMIN_TOKEN PAT Configuration](/img/pipelines/security/ORG_REPO_ADMIN_TOKEN.png)

### ci-read-only-user

This user is created to download private software within GitHub Actions Workflows. The `ci-read-only-user` is used to access Gruntwork Library modules, your own `infrastructure-modules` repository, any other custom module repositories that are private and the Pipelines CLI itself.

The `ci-read-only-user` should have a single classic token [Personal Access Tokens (PAT)](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#personal-access-tokens-classic) with read permissions. Classic PATs have coarse granularity, we recommend putting this user in a GitHub team that only has READ access to `infrastructure-live-root` and any relevant module repositories in your own GitHub Organization. By adding this user to the Gruntwork Developer portal, they will automatically gain access to the Gruntwork Library.

#### Invite the `ci-read-only-user` to your repository

Invite `ci-user-read-only` to your `infrastructure-live-root` repository with read access.

#### Create the appropriate tokens for the `ci-read-only-user`

Create the following token for the `ci-read-only-user`:

1. `PIPELINES_READ_TOKEN`. This token will be used to manage access to private software during GitHub Action runs.

This token **must** have `repo` scopes.

![PIPELINES_READ_TOKEN PAT Configuration](/img/pipelines/security/PIPELINES_READ_TOKEN.png)

The expiration of this token is up to you and the security posture of your organization, Gruntwork recommends 90 days to reduce the burden of rotating tokens and secrets.

## Invite both machine users to Gruntwork

Ensure both of these machine users are members of your team in **Gruntwork**’s GitHub Organization (See [instructions on inviting a user to your team](https://docs.gruntwork.io/developer-portal/invite-team#inviting-team-members) and [linking the user’s GitHub ID to Gruntwork](https://docs.gruntwork.io/developer-portal/link-github-id))

### Configure secrets for GitHub Actions

:::info

The recommended path for storing secrets in GitHub Actions is with Organization level secrets, however not all GitHub plans support repository specific Organization secrets. If this is the case for your GitHub organization, you should use Repository level secrets.

:::

:::info

Since this guide implements secrets that are scoped to specific repositories, anytime a new `infrastructure-live` repository is created, the permissions for these tokens will need to be updated.

:::

<Tabs groupId="github-actions-secrets">
<TabItem value="Organization Secrets" label="Organization Secrets" default>

1. Navigate to your top level GitHub Organization and select the **Settings** tab.

2. From the navigation bar on the left side, select **Secrets and variables** then select **Actions**.

3. Using the **New organization secret** option, add the following secrets:

- `PIPELINES_READ_TOKEN`

  1. This should be assigned the _`PIPELINES_READ_TOKEN`_ token generated by the `ci-read-only-user` in the [secrets section](#ci-read-only-user) as its value.

  1. **Repository access**. Select the `Private Repositories` option.

  :::info

  The `PIPELINES_READ_TOKEN` token is made available to **all** private repositories so that every vended `infrastructure-live` repository automatically has access to this secret.

  :::

- `INFRA_ROOT_WRITE_TOKEN`

  1. This should be assigned the _`INFRA_ROOT_WRITE_TOKEN`_ token generated by the `ci-user` in the [secrets section](#ci-user) as its value.

  2. **Repository access**. Using the `Selected repositories` option select the `infrastructure-live-root` repository.

- `ORG_REPO_ADMIN_TOKEN`

  1. This should be assigned the _`ORG_REPO_ADMIN_TOKEN`_ token generated by the `ci-user` in the [secrets section](#ci-user) as its value.

  1. **Repository access**. Using the `Selected repositories` option select the `infrastructure-live-root` and `infrastructure-live-access-control` repositories.

:::warning

After the bootstrap process is complete, you can do the following:

- Remove the `infrastructure-live-access-control` repository from the `Selected repositories` dropdown in the `ORG_REPO_ADMIN_TOKEN` GitHub Actions secret

If you are not an Enterprise customer, you can do the following as well:

- Remove the `infrastructure-live-root` repository from the `Selected repositories` dropdown in the `ORG_REPO_ADMIN_TOKEN` GitHub Actions secret
- Delete the `ORG_REPO_ADMIN_TOKEN` Personal Access Token from the `ci-user` GitHub account

:::

:::info

For additional information on creating and using Github Actions Organization secrets, please refer to the [GitHub Documentation](https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions#creating-secrets-for-an-organization).

:::

</TabItem>
<TabItem value="Repository Secrets" label="Repository Secrets">

Gruntwork Pipelines reads these secrets from GitHub Actions secrets created in the repo. For steps on how to create repository Actions secrets, refer to [creating secrets for a repository](https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions#creating-secrets-for-a-repository).

### infrastructure-live-root

In the `infrastructure-live-root` repository create the following secrets:

1. `PIPELINES_READ_TOKEN`. This should be assigned the _`PIPELINES_READ_TOKEN`_ token generated by the `ci-read-only-user` in the [secrets section](#ci-read-only-user) as its value.
1. `INFRA_ROOT_WRITE_TOKEN`. This should be assigned the _`INFRA_ROOT_WRITE_TOKEN`_ token generated by the `ci-user` in the [secrets section](#ci-user) as its value.
1. `ORG_REPO_ADMIN_TOKEN`. This should be assigned the _`ORG_REPO_ADMIN_TOKEN`_ token generated by the `ci-user` in the [secrets section](#ci-user) as its value.

### infrastructure-live-access-control

In the `infrastructure-live-access-control` repository create the following secrets:

1. `PIPELINES_READ_TOKEN`. This should be assigned the _`PIPELINES_READ_TOKEN`_ token generated by the `ci-read-only-user` in the [secrets section](#ci-read-only-user) as its value.
1. `ORG_REPO_ADMIN_TOKEN`. This should be assigned the _`ORG_REPO_ADMIN_TOKEN`_ token generated by the `ci-user` in the [secrets section](#ci-user) as its value.

:::warning

After the bootstrap process is complete, you can delete the following secret:

- The `ORG_REPO_ADMIN_TOKEN` GitHub Actions secret from the `infrastructure-live-access-control` repository

If you are not an Enterprise customer, you can delete the following as well:

- The `ORG_REPO_ADMIN_TOKEN` GitHub Actions secret from the `infrastructure-live-root` repository
- The `ORG_REPO_ADMIN_TOKEN` Personal Access Token from the `ci-user` GitHub account

:::

:::info

For additional information on creating and using Github Actions Repository secrets, please refer to the [GitHub Documentation](https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions#creating-secrets-for-a-repository)

:::

</TabItem>
</Tabs>

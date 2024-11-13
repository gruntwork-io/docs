---
# Display h2 to h4 headings
toc_min_heading_level: 2
toc_max_heading_level: 4
---
# Setting up Pipelines via GitHub Machine Users
import PersistentCheckbox from '/src/components/PersistentCheckbox';

Of the [two ways](./authoverview.md) of installing Pipelines, we strongly encourage users to use [GitHub App](./viagithubapp.md) to install pipelines. However, if you're unable to use the app, or if you wish to setup machine users as a [fallback](http://localhost:3000/2.0/docs/pipelines/installation/viagithubapp#fallback) then you can use this guide to setup authentication for pipeline via access tokens and machine users.

When using GitHub tokens Gruntwork recommends using CI users in Gruntwork Pipelines, separate from human users in your organization. Using a CI user ensures that a workflow won't break due to an employee leaving your company. Further, using CI users allow you to apply granular permissions that may normally be too restrictive for a normal employee to do their daily work.

:::info

This guide will take approximately 30 minutes to complete.

:::

## Background
### Guidance on Storing Secrets

During this setup, you will need to generate and securely store three GitHub tokens for two GitHub users. You will need a temporary location for these sensitive values between generating them and storing them in GitHub Actions. Do so according to your company's recommended security best practices (e.g., do not store them in Slack, a sticky note, etc., during this exercise.)

:::note
Your organization is required to rotate the GitHub tokens and update all GitHub secrets that use them.
:::

:::tip
Gruntwork recommends that you use a password manager like [1Password](https://1password.com) to store these secrets securely.
:::

:::caution
If you are screen sharing when generating these tokens, **hide or pause your screen** before selecting the `Generate token` button to prevent the token from being exposed.
:::

### GitHub Token Types

GitHub has two types of tokens that can be generated:

1. Classic tokens
2. Fine-grained tokens

#### Classic Tokens

Classic tokens have coarse granularity and for the most part grant similar access to the user that generated them.

The restrictions that can be applied to them are few, but they are still useful for some limited use cases.

In Pipelines, the `ci-read-only-user` will need a Classic token because it needs to access software across **multiple GitHub organizations**. This is something that classic tokens can do that fine-grained tokens cannot.

:::tip
The `PIPELINES_READ_TOKEN` token must be created as a **Classic token**.
:::

#### Fine-grained

Fine-grained tokens have more granular permissions, and are generally recommended over Classic tokens when they are applicable.

The only limitations on fine-grained tokens that are relevant from a Pipelines perspective is that:

1. They have a single **Resource owner**, which is the organization that is allowed to access the token.
2. They must have an expiration shorter than 1 year (Classic tokens can be configured to never expire).

In Pipelines, the `ci-user` will need two fine-grained tokens because they allow for very limited access to specific repositories, with minimal permissions to them.

:::tip
The `INFRA_ROOT_WRITE_TOKEN` and `ORG_REPO_ADMIN_TOKEN` tokens must be created as **fine-grained tokens**.
:::

:::tip
The **Resource owner** must be set to the GitHub organization of the repositories that the tokens will be used to access (e.g. `infrastructure-live-root`).
:::

![Resource owner](/img/pipelines/security/resource_owner.png)

:::tip
You might see your token status as **pending** after generating it. This is because some GitHub organizations require that fine-grained tokens be approved by an organization owner before they can be used.

If you have the appropriate access, you can approve your new token by navigating to the settings of your GitHub organization and finding the token in the **Pending requests** section.

More information can be found on that [here](https://docs.github.com/en/organizations/managing-programmatic-access-to-your-organization/managing-requests-for-personal-access-tokens-in-your-organization).
:::

![Pending requests](/img/pipelines/security/pending_requests.png)


import Tabs from "@theme/Tabs"
import TabItem from "@theme/TabItem"


## Creating machine users

The recommended setup for Pipelines uses two machine users; one with the ability to open pull requests and run workflows on your behalf and another that can only has read access to repositories in GitHub. Restrictive permissions are then granted to each user, granting them requisite permissions to accomplish their tasks. This means that in order to actually run a pipeline job, both users may be involved at separate stages.

We’ll refer to this user as `ci-user` and `ci-read-only-user`, but you may name them anything you like. These users **must**:

1. Both be members of your GitHub Organization
2. Both be members of your team in **Gruntwork**’s GitHub Organization (See [instructions on inviting a user to your team](https://docs.gruntwork.io/developer-portal/invite-team#inviting-team-members) and [linking the user’s GitHub ID to Gruntwork](https://docs.gruntwork.io/developer-portal/link-github-id))

:::tip
We recommend creating two machine users for this use case, but you can adjust this based on your organization's needs. Ensure that the correct tokens are created and that the permissions for the machine users and tokens are appropriate for their required access.

Note that additional licenses in your GitHub subscription might be required if you are at capacity.
:::

:::caution
There is a security implication to having one machine user for all the tokens generated here, as it would need to have write access to all repositories that the `ci-user` and `ci-read-only-user` need to access. This violates the security [principle of least privilege](https://en.wikipedia.org/wiki/Principle_of_least_privilege) access.

Make sure you are aware of trade-offs in security for convenience when making decisions related to this.
:::

### ci-user

The `ci-user` orchestrates workflows, can open pull requests from automated code generation, and leave comments on pull requests. This user should have two GitHub Fine Grained [Personal Access Tokens (PATs)](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#fine-grained-personal-access-tokens) with the following permissions.

**Invite the `ci-user` to your repository**

Invite the `ci-user` to your `infrastructure-live-root` and `infrastructure-live-access-control` repositories with write access.

**Checklist:**
<PersistentCheckbox id="via-machine-users-1" label="ci-user created" />

**Create the appropriate tokens for the `ci-user`**

Create the following access tokens in the `ci-user`'s GitHub account:

**Checklist:**
<PersistentCheckbox id="via-machine-users-2" label="INFRA_ROOT_WRITE_TOKEN created under ci-user" />
<PersistentCheckbox id="via-machine-users-3" label="ORG_REPO_ADMIN_TOKEN created under ci-user" />


#### INFRA_ROOT_WRITE_TOKEN
`INFRA_ROOT_WRITE_TOKEN`. This is a [fine-grained GitHub Personal Access Token](#fine-grained) and will be used to grant GitHub Actions access to clone your `infrastructure-live-root` repository, open PRs, and create/update comments.

   This token **must** have the following permissions to your **`infrastructure-live-root`** repo **in your GitHub Organization**:

   - Content read & write access
   - Issues read & write access
   - Metadata read access
   - Pull requests read & write access
   - Workflows read & write access

   ![INFRA_ROOT_WRITE_TOKEN PAT Configuration](/img/pipelines/security/INFRA_ROOT_WRITE_TOKEN.png)

   <details>
     <summary>Why does this token need these permissions?</summary>

     What follows is a breakdown of the permissions required by the `INFRA_ROOT_WRITE_TOKEN` token, as per our testing, incrementally introducing more permissions to achieve the minimal set of permissions required to support Pipelines. Note that some permissions are specific to certain behavior, and some are only used by Enterpise customers.

     If you are not an Enterprise customer, or don't want Pipelines to perform those specific behaviors, you can chose to not grant the corresponding permissions.

     <h3>Content read & write access</h3>

     This is required to clone `infrastructure-live-root` and push changes to it. The `infrastructure-live-root` repository updates itself in automated processes during account vending, and baselining. Without this permission, the pull request opened by the GitHub Actions workflow would not trigger the necessary automation to support account vending.

     <h3>Issues read & write access</h3>

     This is required to open issues. Pipelines will open issues when necessary to signal that manual intervention is required.

     <h3>Metadata read access</h3>

     This is required to read the repository metadata. This is added onto the token by default by GitHub when selecting the `repo` scope.

     <h3>Pull requests read & write access</h3>

     This is required to open pull requests. Pipelines opens pull requests to automate the process of introducing new Infrastructure as Code changes to drive infrastructure updates.

     <h3>Workflows read & write access</h3>

     This is required to update GitHub Action workflow files. When vending delegated repositories for Enterprise customers, Pipelines will create new repositories, including content in the `.github/workflows` directory. Without this permission, Pipelines would not be able to provision repositories with this content.

   </details>
#### ORG_REPO_ADMIN_TOKEN
`ORG_REPO_ADMIN_TOKEN`. This is a [fine-grained GitHub Personal Access Token](#fine-grained) that will be used to initially bootstrap repositories vended as part of DevOps Foundations.

   In addition, Enterprise customers will have it used during account vending to create new delegated `infrastructure-live` repositories in their GitHub Organization when vending AWS accounts with the `isDelegated` value selected.

   :::tip
   If you are not an Enterprise customer, you should delete it after DevOps Foundations setup.
   :::

   This token **must** have the following permissions to **all** repositories the `ci-user` has access to **in your GitHub Organization**:

   - Administration read & write access
   - Contents read & write access
   - Metadata read access
   - Pull requests read & write access
   - Workflows read & write access

   In addition, the token **may** require the following permissions in your organization:

   - Members read & write access

   ![ORG_REPO_ADMIN_TOKEN PAT Configuration](/img/pipelines/security/ORG_REPO_ADMIN_TOKEN.png)

   <details>
     <summary>Why does this token need these permissions?</summary>

     What follows is a breakdown of the permissions required by the `ORG_REPO_ADMIN_TOKEN` token, as per our testing, incrementally introducing more permissions to achieve the minimal set of permissions required to support Pipelines. Note that some permissions are specific to certain behavior, and some are only used by Enterpise customers.

     If you are not an Enterprise customer, or don't want Pipelines to perform those specific behaviors, you can chose to not grant the corresponding permissions.

     <h3>Administration read & write access</h3>

     This is required to create new repositories. Pipelines will create new repositories when vending delegated repositories for Enterprise customers. Without this permission, Pipelines would not be able to provision repositories.

     <h3>Contents read & write access</h3>

     This is required to read and write repository contents. This token is used for bootstrapping repositories by all customers, and to populate delegated respoitories for Enterprise customers.

     <h3>Metadata read access</h3>

     This is required to read the repository metadata. This is added onto the token by default by GitHub when selecting the `repo` scope.

     <h3>Pull requests read & write access</h3>

     This is required to open pull requests. When vending delegated repositories for Enterprise customers, Pipelines will open pull requests to automate the process of introducing new Infrastructure as Code changes to drive infrastructure updates.

     <h3>Workflows read & write access</h3>

     This is required to update GitHub Action workflow files. When vending delegated repositories for Enterprise customers, Pipelines will create new repositories, including content in the `.github/workflows` directory. Without this permission, Pipelines would not be able to provision repositories with this content.

     <h3>Members read & write access</h3>

     This is required to update GitHub organization team members. When vending delegated repositories for Enterprise customers, Pipelines will add team members to a team that has access to a delegated repository. Without this permission, Pipelines would not be able to provision repositories that are accessible to the correct team members.

   </details>

### ci-read-only-user

This user is created to download private software within GitHub Actions Workflows. The `ci-read-only-user` is used to access Gruntwork Library modules, your own `infrastructure-modules` repository, any other custom module repositories that are private and the Pipelines CLI itself.

The `ci-read-only-user` should have a single classic [Personal Access Token (PAT)](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#personal-access-tokens-classic) with read permissions. Classic PATs have coarse granularity, we recommend putting this user in a GitHub team that only has READ access to `infrastructure-live-root` and any relevant module repositories in your own GitHub Organization. By adding this user to the Gruntwork Developer portal, they will automatically gain access to the Gruntwork Library.

**Invite the `ci-read-only-user` to your repository**

Invite `ci-user-read-only` to your `infrastructure-live-root` repository with read access.

**Checklist:**
<PersistentCheckbox id="via-machine-users-4" label="ci-read-only-user invited to infrastructure-live-root" />

**Create the appropriate tokens for the `ci-read-only-user`**

Create the following token for the `ci-read-only-user`

**Checklist:**
<PersistentCheckbox id="via-machine-users-4" label="PIPELINES_READ_TOKEN created under ci-read-only-user" />


#### PIPELINES_READ_TOKEN
`PIPELINES_READ_TOKEN`. This [Classic Personal Access Token](#classic-tokens) will be used to manage access to private software during GitHub Action runs.

This token **must** have `repo` scopes.

![PIPELINES_READ_TOKEN PAT Configuration](/img/pipelines/security/PIPELINES_READ_TOKEN.png)

The expiration of this token is up to you and the security posture of your organization, Gruntwork recommends 90 days to reduce the burden of rotating tokens and secrets.

## Invite both machine users to Gruntwork

Ensure both of these machine users are members of your team in **Gruntwork**’s GitHub Organization (See [instructions on inviting a user to your team](https://docs.gruntwork.io/developer-portal/invite-team#inviting-team-members) and [linking the user’s GitHub ID to Gruntwork](https://docs.gruntwork.io/developer-portal/link-github-id))

**Checklist:**
<PersistentCheckbox id="via-machine-users-4" label="Machine users invited to Gruntwork organization" />

## Configure secrets for GitHub Actions

:::info

The recommended path for storing secrets in GitHub Actions is with Organization level secrets, however not all GitHub plans support repository specific Organization secrets. If this is the case for your GitHub organization, you should use Repository level secrets.

:::

:::info

Since this guide implements secrets that are scoped to specific repositories, anytime a new `infrastructure-live` repository is created, the permissions for these tokens will need to be updated.

:::

<Tabs groupId="github-actions-secrets">
<TabItem value="Organization Secrets" label="Organization Secrets" default>
**Checklist:**
<PersistentCheckbox id="via-machine-users-5a" label="PIPELINES_READ_TOKEN added to organization secrets" />
<PersistentCheckbox id="via-machine-users-5b" label="INFRA_ROOT_WRITE_TOKEN added to organization secrets" />
<PersistentCheckbox id="via-machine-users-5c" label="ORG_REPO_ADMIN_TOKEN added to organization secrets" />
<hr />
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

:::danger

After the bootstrap process is complete, you should clean up the `ORG_REPO_ADMIN_TOKEN` token by doing the following:

If you are **not an Enterprise customer**:

- Delete the `ORG_REPO_ADMIN_TOKEN` Personal Access Token from the `ci-user`&rsquo;s GitHub account
- Delete the Organization secret `ORG_REPO_ADMIN_TOKEN` from the GitHub Organization

Enterprise customers:

- Remove the `infrastructure-live-access-control` repository from the Selected repositories dropdown in the `ORG_REPO_ADMIN_TOKEN` GitHub Actions secret. This repository only needed the token for bootstrapping.

:::

:::info

For additional information on creating and using Github Actions Organization secrets, please refer to the [GitHub Documentation](https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions#creating-secrets-for-an-organization).

:::

</TabItem>
<TabItem value="Repository Secrets" label="Repository Secrets">
**Checklist:**
<PersistentCheckbox id="via-machine-users-6a" label="PIPELINES_READ_TOKEN added to infrastructure-live-root" />
<PersistentCheckbox id="via-machine-users-6b" label="INFRA_ROOT_WRITE_TOKEN added to infrastructure-live-root" />
<PersistentCheckbox id="via-machine-users-6c" label="ORG_REPO_ADMIN_TOKEN added to infrastructure-live-root" />
<PersistentCheckbox id="via-machine-users-6d" label="PIPELINES_READ_TOKEN added to infrastructure-live-access-control" />
<PersistentCheckbox id="via-machine-users-6e" label="ORG_REPO_ADMIN_TOKEN added to infrastructure-live-access-control" />
<hr />
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

:::danger

After the bootstrap process is complete, you should clean up the `ORG_REPO_ADMIN_TOKEN` token by doing the following:

- Delete the `ORG_REPO_ADMIN_TOKEN` Repository secret from the `infrastructure-live-access-control` repository. This repository only needed the token for bootstrapping.

If you are **not an Enterprise customer** you should also do the following:

- Delete the `ORG_REPO_ADMIN_TOKEN` Personal Access Token from the `ci-user`&rsquo;s GitHub account
- Delete the `ORG_REPO_ADMIN_TOKEN` Repository secret from the `infrastructure-live-root` repository.

:::

:::info

For additional information on creating and using Github Actions Repository secrets, please refer to the [GitHub Documentation](https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions#creating-secrets-for-a-repository)

:::

</TabItem>
</Tabs>

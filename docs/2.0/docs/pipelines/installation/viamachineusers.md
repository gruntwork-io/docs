---
# Display h2 to h4 headings
toc_min_heading_level: 2
toc_max_heading_level: 4
---
# Setting up Pipelines via GitHub Machine Users
import PersistentCheckbox from '/src/components/PersistentCheckbox';
import Tabs from "@theme/Tabs"
import TabItem from "@theme/TabItem"

For GitHub users, of the [two methods](/2.0/docs/pipelines/installation/authoverview.md) for installing Gruntwork Pipelines, we strongly recommend using the [GitHub App](/2.0/docs/pipelines/installation/viagithubapp.md). However, if the GitHub App cannot be used or if machine users are required as a [fallback](http://localhost:3000/2.0/docs/pipelines/installation/viagithubapp#fallback), this guide outlines how to set up authentication for Pipelines using access tokens and machine users.

For GitHub or GitLab users, when using tokens, Gruntwork recommends setting up CI users specifically for Gruntwork Pipelines, separate from human users in your organization. This separation ensures workflows are not disrupted if an employee leaves the company and allows for more precise permission management. Additionally, using CI users allow you to apply granular permissions that may normally be too restrictive for a normal employee to do their daily work.

:::info

This guide will take approximately 30 minutes to complete.

:::

## Background
### Guidance on storing secrets

During this process, you will generate and securely store several access tokens. Use a temporary but secure location for these sensitive values between generating them and storing them in GitHub or GitLab. Follow your organization's security best practices and avoid insecure methods (e.g., Slack or sticky notes) during this exercise.

:::note
Organizations are required to rotate tokens and update all secrets referencing them.
:::

:::tip
Gruntwork recommends using a password manager such as [1Password](https://1password.com) for secure storage of secrets.
:::

:::caution
If screen sharing while generating tokens, **pause or hide your screen** before selecting the `Generate token` button to prevent exposure.
:::

### Token types
<Tabs groupId="platform">
<TabItem value="github" label="GitHub" default>

GitHub supports two types of tokens:

1. Classic tokens
2. Fine-grained tokens

#### Classic tokens

- Classic tokens provide coarse-grained permissions and generally match the access level of the user who created them.

- While they offer limited configuration options, classic tokens can still be useful for basic access control needs.

#### Fine-grained tokens

Fine-grained tokens offer more granular permissions and are recommended where applicable.

However, fine-grained tokens have the following limitations:

1. They have a single **Resource owner** (e.g., the organization owning the token).

2. They have a maximum expiration of one year (Classic tokens can be set to never expire).

:::tip
Set the **Resource owner** to the GitHub organization associated with the repositories that the tokens will access (e.g., `infrastructure-live-root`).
:::

![Resource owner](/img/pipelines/security/resource_owner.png)

:::tip
Tokens marked as **pending** after generation may require approval from an organization owner before they can be used.

If you have the necessary permissions, you can approve your token by going to your organization's settings and selecting **Pending requests**.

More information is available [here](https://docs.github.com/en/organizations/managing-programmatic-access-to-your-organization/managing-requests-for-personal-access-tokens-in-your-organization).
:::

![Pending requests](/img/pipelines/security/pending_requests.png)

</TabItem>
<TabItem value="GitLab" label="GitLab">

GitLab uses access tokens for authentication. There are several types of access tokens in GitLab:

1. Personal Access Tokens
2. Project Access Tokens
3. Group Access Tokens

For Pipelines, we recommend using Project or Group Access Tokens.

Note that Project and Group access tokens are only available in certain GitLab licenses.  Specifically:

[Project Access Tokens](https://docs.gitlab.com/user/project/settings/project_access_tokens/#token-availability)
* On GitLab SaaS: If you have the Premium or Ultimate license tier, only one project access token is available with a [trial license](https://about.gitlab.com/free-trial/).
* On GitLab Self-Managed instances: With any license tier. If you have the Free tier, consider [restricting the creation of project access tokens](https://docs.gitlab.com/user/project/settings/project_access_tokens/#restrict-the-creation-of-project-access-tokens) to lower potential abuse.

[Group Access Tokens](https://docs.gitlab.com/user/group/settings/group_access_tokens/)

* On GitLab.com, you can use group access tokens if you have the Premium or Ultimate license tier. Group access tokens are not available with a [trial license](https://about.gitlab.com/free-trial/).
* On GitLab Dedicated and self-managed instances, you can use group access tokens with any license tier.

</TabItem>
</Tabs>

:::caution
When creating tokens, carefully consider the expiration date and scope of access. Follow your organization's security policies regarding token rotation.
:::

## Creating machine users

<Tabs groupId="platform">
<TabItem value="GitHub" label="GitHub" default>

The recommended setup for Pipelines uses two machine users: one for opening pull requests and running workflows (`ci-user`) and another with read-only access to repositories (`ci-read-only-user`). Each user is assigned restrictive permissions based on their tasks. As a result, both users may need to participate at different stages to successfully run a pipeline job.

Both the `ci-user` and the `ci-read-only-user` must:

1. Be members of your GitHub Organization.

2.  Be added to your team in **Gruntwork**’s GitHub Organization (See [instructions on inviting a user to your team](https://docs.gruntwork.io/developer-portal/invite-team#inviting-team-members) and [linking the user’s GitHub ID to Gruntwork](https://docs.gruntwork.io/developer-portal/link-github-id)).

:::tip
We recommend creating two machine users for better access control, but you may adjust this setup to fit your organization’s needs. Ensure permissions are appropriate for their roles, and note that additional GitHub licenses may be required if at capacity.

Note that additional licenses in your GitHub subscription might be required if you are at capacity.
:::

:::caution
Using a single machine user for all tokens introduces security vulnerabilities by providing broad write access to both the `ci-user` and `ci-read-only-user`. This approach violates the [principle of least privilege](https://en.wikipedia.org/wiki/Principle_of_least_privilege), which recommends granting only the minimum permissions necessary for each task. Weigh security trade-offs carefully.
:::

### ci-user

The `ci-user` orchestrates workflows, opens pull requests, and leaves comments on pull requests. This user should have two fine-grained GitHub [Personal Access Tokens (PATs)](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#fine-grained-personal-access-tokens) with the following permissions.

**Invite the `ci-user` to your repository**

Ensure the `ci-user` has write access to your:

- `infrastructure-live-root` repository

- `infrastructure-live-access-control` repository

**Checklist:**
<PersistentCheckbox id="via-machine-users-1" label="ci-user created" />

**Create access tokens for the `ci-user`**

Generate the required tokens for the ci-user in their GitHub account.

**Checklist:**
<PersistentCheckbox id="via-machine-users-2" label="INFRA_ROOT_WRITE_TOKEN created under ci-user" />
<PersistentCheckbox id="via-machine-users-3" label="ORG_REPO_ADMIN_TOKEN created under ci-user" />


#### INFRA_ROOT_WRITE_TOKEN

This [fine-grained](#fine-grained) Personal Access Token allows GitHub Actions to clone `infrastructure-live-root`, open pull requests, and update comments.

This token must have the following permissions to the `INFRA_ROOT_WRITE_TOKEN` for the `infrastructure-live-root` repository:

- **Content:** Read & write access — Required to clone the repository and push changes.
- **Issues:** Read & write access — Allows Pipelines to open issues when manual intervention is needed.
- **Metadata:** Read access — Grants access to repository metadata.
- **Pull requests:** Read & write access — Enables Pipelines to automate infrastructure changes through PRs.
- **Workflows:** Read & write access — Needed to update workflow files in `.github/workflows` when provisioning new repositories.

![INFRA_ROOT_WRITE_TOKEN PAT Configuration](/img/pipelines/security/INFRA_ROOT_WRITE_TOKEN.png)

<details>

<summary>Why does this token need these permissions?</summary>

Below is a detailed breakdown of the permissions needed for the `INFRA_ROOT_WRITE_TOKEN`. Some permissions are tied to specific actions, while others are exclusively used by Enterprise customers.

If you are not an Enterprise customer or prefer Pipelines not to execute certain behaviors, you can opt not to grant the related permissions.

##### Content read & write access
Needed for cloning `infrastructure-live-root` and pushing automated changes. Without this permission, the pull request opened by the GitHub Actions workflow will not trigger automation during account vending.

##### Issues read & write access
Allows Pipelines to open issues that alert teams when manual action is required.

##### Metadata read access
Grants visibility into repository metadata.

##### Pull requests read & write access
Allows Pipelines to create pull requests to introduce infrastructure changes.

##### Workflows read & write access
Required to update workflows when provisioning new repositories.

</details>

#### ORG_REPO_ADMIN_TOKEN

This fine-grained token is used for initial setup and bootstrapping repositories. For Enterprise customers, it also provisions delegated repositories. Assign the following permissions to all accessible repositories:

- **Administration:** Read & write access — Required to create and manage repositories.
- **Content:** Read & write access — Necessary for reading and writing repository files.
- **Metadata:** Read access — Grants access to repository metadata.
- **Pull requests:** Read & write access — Enables automation of infrastructure updates via PRs.
- **Workflows:** Read & write access — Required to manage workflow files.

  In addition, the token **may** require the following permissions in your organization:

- **Members:** Read & write access — Needed to manage team access for repositories.

![ORG_REPO_ADMIN_TOKEN PAT Configuration](/img/pipelines/security/ORG_REPO_ADMIN_TOKEN.png)

<details>
<summary>Why does this token need these permissions?</summary>

The following is a breakdown of the permissions needed for the `ORG_REPO_ADMIN_TOKEN`, based on our testing. Permissions were gradually added to identify the minimal set necessary to support Pipelines. Some permissions apply to specific actions, while others are exclusive to Enterprise customers.

If you are not an Enterprise customer or prefer Pipelines not to carry out certain actions, you can choose to withhold the related permissions.

##### Administration read & write access
Allows the creation of new repositories for delegated infrastructure management.

##### Content read & write access
Used for bootstrapping repositories and populating them with necessary content.

##### Metadata read access
Grants repository-level insights needed for automation.

##### Pull requests read & write access
     This is required to open pull requests. When vending delegated repositories for Enterprise customers, Pipelines will open pull requests to automate the process of introducing new Infrastructure as Code changes to drive infrastructure updates.

##### Workflows read & write access
 This is required to update GitHub Action workflow files. When vending delegated repositories for Enterprise customers, Pipelines will create new repositories, including content in the `.github/workflows` directory. Without this permission, Pipelines would not be able to provision repositories with this content.

##### Members read & write access

     Required to update GitHub organization team members. When vending delegated repositories for Enterprise customers, Pipelines will add team members to a team that has access to a delegated repository. Without this permission, Pipelines would not be able to provision repositories that are accessible to the correct team members.

</details>


:::tip
If you are not an Enterprise customer, you should delete it after DevOps Foundations setup.
:::

### ci-read-only-user

The `ci-read-only-user` is configured to download private software within GitHub Actions workflows. This user is responsible for accessing Gruntwork IaC Library modules, your infrastructure-modules repository, other private custom module repositories, and the Pipelines CLI.

This user should use a single classic Personal Access Token (PAT)(https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#personal-access-tokens-classic) with read-only permissions. Since classic PATs offer coarse grained access controls, it’s recommended to assign this user to a GitHub team with READ access limited to the `infrastructure-live-root` repository and any relevant module repositories within your GitHub Organization. Adding this user to the Gruntwork Developer Portal will automatically grant access to the Gruntwork IaC Library.

**Invite ci-read-only-user to your repository**

Invite `ci-user-read-only` to your `infrastructure-live-root` repository with read access.

**Checklist:**
<PersistentCheckbox id="via-machine-users-4" label="ci-read-only-user invited to infrastructure-live-root" />

**Create a token for ci-read-only-user**

Generate the following token for the `ci-read-only-user`:

**Checklist:**
<PersistentCheckbox id="via-machine-users-5" label="PIPELINES_READ_TOKEN created under ci-read-only-user" />



#### PIPELINES_READ_TOKEN

This [Classic Personal Access Token](#classic-tokens) manages access to private software during GitHub Action runs.

This token must have `repo` scopes. Gruntwork recommends setting expiration to 90 days to balance the concerns of security vs. the burden of rotating tokens and secrets.

![PIPELINES_READ_TOKEN PAT Configuration](/img/pipelines/security/PIPELINES_READ_TOKEN.png)

## Invite both machine users to Gruntwork

Make sure both machine users are added to your team in Gruntwork’s GitHub Organization. Refer to the [instructions for inviting a user to your team](https://docs.gruntwork.io/developer-portal/invite-team#inviting-team-members) and [linking the user’s GitHub ID to Gruntwork](https://docs.gruntwork.io/developer-portal/link-github-id) for guidance.

**Checklist:**
<PersistentCheckbox id="via-machine-users-6" label="Machine users invited to Gruntwork organization" />

## Configure secrets for GitHub Actions

:::info
The preferred method for storing secrets in GitHub Actions is using Organization-level secrets. However, if your GitHub plan doesn’t support repository-specific Organization secrets, you should use Repository-level secrets instead.
:::

Since this guide uses secrets scoped to specific repositories, the token permissions must be updated whenever a new `infrastructure-live` repository is created.

<Tabs groupId="github-actions-secrets">
<TabItem value="Organization Secrets" label="Organization Secrets" default>
**Checklist:**
<PersistentCheckbox id="via-machine-users-5a" label="PIPELINES_READ_TOKEN added to organization secrets" />
<PersistentCheckbox id="via-machine-users-5b" label="INFRA_ROOT_WRITE_TOKEN added to organization secrets" />
<PersistentCheckbox id="via-machine-users-5c" label="ORG_REPO_ADMIN_TOKEN added to organization secrets" />
<hr />
1. Navigate to your top-level GitHub Organization and select the **Settings** tab.

2. From the navigation bar on the left side, choose **Secrets and variables**, then select **Actions**.

3. Use the **New organization secret** option to add the following secrets:

- `PIPELINES_READ_TOKEN`

  1. Assign the _`PIPELINES_READ_TOKEN`_ token generated by the `ci-read-only-user` in the [secrets section](#ci-read-only-user) as its value.

  2. **Repository access**: Select the `Private Repositories` option.

  :::info

  The `PIPELINES_READ_TOKEN` token is made accessible to **all** private repositories, ensuring every vended `infrastructure-live` repository automatically has access to this secret.

  :::

- `INFRA_ROOT_WRITE_TOKEN`

  1. Assign the _`INFRA_ROOT_WRITE_TOKEN`_ token generated by the `ci-user` in the [secrets section](#ci-user) as its value.

  2. **Repository access**: Using the `Selected repositories` option, select the `infrastructure-live-root` repository.

- `ORG_REPO_ADMIN_TOKEN`

  1. Assign the _`ORG_REPO_ADMIN_TOKEN`_ token generated by the `ci-user` in the [secrets section](#ci-user) as its value.

  2. **Repository access**: Using the `Selected repositories` option, select the `infrastructure-live-root` and `infrastructure-live-access-control` repositories.

:::danger

After completing the bootstrap process, clean up the `ORG_REPO_ADMIN_TOKEN` token as follows:

For **Non-Enterprise customers**:

- Delete the `ORG_REPO_ADMIN_TOKEN` Personal Access Token from the `ci-user`’s GitHub account.
- Remove the `ORG_REPO_ADMIN_TOKEN` Organization secret from the GitHub Organization.

For **Enterprise customers**:

- Remove the `infrastructure-live-access-control` repository from the Selected repositories dropdown in the `ORG_REPO_ADMIN_TOKEN` GitHub Actions secret. This repository only needed the token for the bootstrapping process.

:::

:::info

For more details on creating and using GitHub Actions Organization secrets, refer to the [GitHub Documentation](https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions#creating-secrets-for-an-organization).

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
Gruntwork Pipelines retrieves these secrets from GitHub Actions secrets configured in the repository. For instructions on creating repository Actions secrets, refer to [creating secrets for a repository](https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions#creating-secrets-for-a-repository).

### `infrastructure-live-root`

In the `infrastructure-live-root` repository, create the following secrets:

1. `PIPELINES_READ_TOKEN`: Assign the _`PIPELINES_READ_TOKEN`_ token generated by the `ci-read-only-user` in the [secrets section](#ci-read-only-user) as its value.
2. `INFRA_ROOT_WRITE_TOKEN`: Assign the _`INFRA_ROOT_WRITE_TOKEN`_ token generated by the `ci-user` in the [secrets section](#ci-user) as its value.
3. `ORG_REPO_ADMIN_TOKEN`: Assign the _`ORG_REPO_ADMIN_TOKEN`_ token generated by the `ci-user` in the [secrets section](#ci-user) as its value.

### `infrastructure-live-access-control`

In the `infrastructure-live-access-control` repository, create the following secrets:

1. `PIPELINES_READ_TOKEN`: Assign the _`PIPELINES_READ_TOKEN`_ token generated by the `ci-read-only-user` in the [secrets section](#ci-read-only-user) as its value.
2. `ORG_REPO_ADMIN_TOKEN`: Assign the _`ORG_REPO_ADMIN_TOKEN`_ token generated by the `ci-user` in the [secrets section](#ci-user) as its value.

:::danger
After completing the bootstrap process, clean up the `ORG_REPO_ADMIN_TOKEN` token as follows:

- Delete the `ORG_REPO_ADMIN_TOKEN` Repository secret from the `infrastructure-live-access-control` repository. This repository only required the token for bootstrapping.

If you are **not an Enterprise customer**, you should also do the following:

- Delete the `ORG_REPO_ADMIN_TOKEN` Personal Access Token from the `ci-user`’s GitHub account.
- Remove the `ORG_REPO_ADMIN_TOKEN` Repository secret from the `infrastructure-live-root` repository.
:::


:::info
For more information on creating and using GitHub Actions Repository secrets, refer to the [GitHub Documentation](https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions#creating-secrets-for-a-repository).
:::

</TabItem>
</Tabs>

</TabItem>
<TabItem value="GitLab" label="GitLab">


For GitLab, Gruntwork Pipelines two CI variables. The first, the `PIPELINES_GITLAB_TOKEN` requires the `Developer`, `Maintainer` or `Owner` role and the scopes listed below. This token will be used to authenticate API calls and access repositories within your GitLab group.  The second, the `PIPELINES_GITLAB_READ_TOKEN` will be used to access your own code within GitLab. If not set, Pipelines will default to the `CI_JOB_TOKEN` when accessing internal GitLab hosted code.


### Creating the Access Token

Gruntwork recommends [creating](https://docs.gitlab.com/user/project/settings/project_access_tokens/#create-a-project-access-token) two Project or Group Access Tokens as best practice:
| Token Name                      | Required Scopes                              | Required Role                   | Purpose                                                                      |
| ------------------------------- | -------------------------------------------- | ------------------------------- | ---------------------------------------------------------------------------- |
| **PIPELINES_GITLAB_TOKEN**      | `api` (and `ai_features` if using GitLab AI) | Developer, Maintainer, or Owner | Making API calls (e.g., creating comments on merge requests)                 |
| **PIPELINES_GITLAB_READ_TOKEN** | `read_repository`                            | Any                             | Accessing GitLab repositories (e.g., your catalog or infrastructure modules) |

You may however generate a single token all scopes scopes if you prefer and use it for both purposes.

These tokens will be stored in your CI/CD variables.

:::note

If you have GitLab AI installed then you will also need the `ai_features` scope on `PIPELINES_GITLAB_TOKEN`. This requirement to add `ai_features` is driven by the mechanics of how GitLab operates and not because Pipelines itself behaves differently in the presence of GitLab AI.
:::

:::tip
Set an expiration date according to your organization's security policies. We recommend 90 days as a balance between security and maintenance.
:::

**Checklist:**
<PersistentCheckbox id="via-machine-users-gitlab-3" label="PIPELINES_GITLAB_TOKEN created" />
<PersistentCheckbox id="via-machine-users-gitlab-4" label="PIPELINES_GITLAB_READ_TOKEN created" />

### Configure CI/CD Variables

Add the `PIPELINES_GITLAB_TOKEN` and `PIPELINES_GITLAB_READ_TOKEN` as CI/CD variables at the group or project level:

1. Navigate to your GitLab group or project's **Settings > CI/CD**
2. Expand the **Variables** section
3. Click **Add variable**
4. Mark the variables as **Masked**
5. Leave both the **Protect variable** and **Expand variable reference** options unchecked
6. Select the environments where this variable should be available
7. Set the key to the name of the token e.g. `PIPELINES_GITLAB_TOKEN` or `PIPELINES_GITLAB_READ_TOKEN`
8. Set the value as the Personal Access Token generated in the [Creating the Access Token](#creating-the-access-token) section

**Checklist:**
<PersistentCheckbox id="via-machine-users-gitlab-5" label="PIPELINES_GITLAB_TOKEN added to CI/CD variables" />
<PersistentCheckbox id="via-machine-users-gitlab-6" label="PIPELINES_GITLAB_READ_TOKEN added to CI/CD variables" />

:::caution
Remember to update this token before it expires to prevent pipeline disruptions.
:::

### Authorize your groups to the Gruntwork Pipelines backend

In order to use the Gruntwork Pipelines backend, you need to authorize your groups to it. To do so, email your Gruntwork account manager or support@gruntwork.io with the following information:

- The group name (s) you want to authorize for Gruntwork Pipelines in GitLab
- The GitLab instance you want to authorize (e.g. https://gitlab.com)
- The name of your organization

</TabItem>
</Tabs>

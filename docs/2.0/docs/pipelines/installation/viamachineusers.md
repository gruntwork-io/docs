---
# Display h2 to h4 headings
toc_min_heading_level: 2
toc_max_heading_level: 4
---
# Setting up Pipelines via GitHub Machine Users
import PersistentCheckbox from '/src/components/PersistentCheckbox';

Of the [two methods](/2.0/docs/pipelines/installation/authoverview.md) for installing Gruntwork Pipelines, we strongly recommend using the [GitHub App](/2.0/docs/pipelines/installation/viagithubapp.md). However, if the GitHub App cannot be used or if machine users are required as a [fallback](http://localhost:3000/2.0/docs/pipelines/installation/viagithubapp#fallback), this guide outlines how to set up authentication for Pipelines using access tokens and machine users.

When using GitHub tokens, Gruntwork recommends setting up CI users specifically for Gruntwork Pipelines, separate from human users in your organization. This separation ensures workflows are not disrupted if an employee leaves the company and allows granular permissions to be applied, which may be too restrictive for day-to-day employee use.

:::info

This guide will take approximately 30 minutes to complete.

:::

## Background
### Guidance on storing secrets

During this process, you will generate and securely store three GitHub tokens for two GitHub users. Use a temporary but secure location for these sensitive values between generating them and storing them in GitHub Actions. Follow your organization's security best practices and avoid insecure methods (e.g., Slack or sticky notes).

:::note
Organizations are required to rotate GitHub tokens and update all GitHub secrets referencing them.
:::

:::tip
Gruntwork recommends using a password manager such as [1Password](https://1password.com) for secure storage of secrets.
:::

:::caution
If screen sharing while generating tokens, **pause or hide your screen** before selecting the Generate token button to prevent exposure.
:::


### GitHub token types

GitHub supports two types of tokens:

1. Classic tokens
   
2. Fine-grained tokens

#### Classic tokens

Classic tokens provide coarse-grained permissions and generally match the access level of the user who created them. While they offer limited configurability, they are still suitable for specific use cases. For Pipelines, the `ci-read-only-user` requires a Classic token because it must access software across **multiple GitHub organizations**, a capability not available with fine-grained tokens.

:::tip
The `PIPELINES_READ_TOKEN` token must be created as a **Classic token**.
:::

#### Fine-grained tokens

Fine-grained tokens offer more granular permissions and are recommended where applicable. However, they have the following limitations:

1. A single **Resource owner** (e.g., the organization owning the token).

2. A maximum expiration of one year (Classic tokens can be set to never expire).


:::tip 
The `INFRA_ROOT_WRITE_TOKEN` and `ORG_REPO_ADMIN_TOKEN` must be created as **fine-grained tokens**.

:::

:::tip
Set the **Resource owner** to the GitHub organization associated with the repositories that the tokens will access (e.g., `infrastructure-live-root`).
:::

![Resource owner](/img/pipelines/security/resource_owner.png)

:::tip
If your token status appears as **pending** after generation, it may require approval by an organization owner. Approve pending tokens via the organization's settings under **Pending requests**.

More information is available [here](https://docs.github.com/en/organizations/managing-programmatic-access-to-your-organization/managing-requests-for-personal-access-tokens-in-your-organization).

:::

![Pending requests](/img/pipelines/security/pending_requests.png)


import Tabs from "@theme/Tabs"
import TabItem from "@theme/TabItem"


## Creating machine users

The recommended setup for Pipelines uses two machine users: one for opening pull requests and running workflows (`ci-user`) and another with read-only access to repositories (`ci-read-only-user`). Each user is assigned restrictive permissions based on their tasks. Both users must:

1. Be members of your GitHub Organization.

2. Be added to your team in Gruntwork's GitHub Organization ([Invite team members](https://docs.gruntwork.io/developer-portal/invite-team#inviting-team-members) and [link GitHub ID](https://docs.gruntwork.io/developer-portal/link-github-id)).

:::tip
We recommend creating two machine users for better access control, but you may adjust this setup to fit your organization’s needs. Ensure permissions are appropriate for their roles, and note that additional GitHub licenses may be required if at capacity.
:::

:::caution
Using a single machine user for all tokens poses security risks by granting broad write access, violating the [principle of least privilege](https://en.wikipedia.org/wiki/Principle_of_least_privilege). Weigh security trade-offs carefully.
:::

### ci-user
The `ci-user` orchestrates workflows, opens pull requests, and comments on pull requests. This user requires two fine-grained GitHub [Personal Access Tokens (PATs)](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#fine-grained-personal-access-tokens).

**Invite `ci-user` to your repositories**

Ensure `ci-user` has write access to `infrastructure-live-root` and `infrastructure-live-access-control`.

**Checklist:**
<PersistentCheckbox id="via-machine-users-1" label="ci-user created" />

**Create access tokens for ci-user**

Generate the following tokens in the `ci-user` GitHub account:

**Checklist:**
<PersistentCheckbox id="via-machine-users-2" label="INFRA_ROOT_WRITE_TOKEN created under ci-user" />
<PersistentCheckbox id="via-machine-users-3" label="ORG_REPO_ADMIN_TOKEN created under ci-user" />


#### INFRA_ROOT_WRITE_TOKEN
This [fine-grained](#fine-grained) token allows GitHub Actions to clone `infrastructure-live-root`, open pull requests, and update comments. Assign the following permissions to the `INFRA_ROOT_WRITE_TOKEN` for the `infrastructure-live-root` repository:

- Content: Read & write
- Issues: Read & write
- Metadata: Read
- Pull requests: Read & write
- Workflows: Read & write

![INFRA_ROOT_WRITE_TOKEN PAT Configuration](/img/pipelines/security/INFRA_ROOT_WRITE_TOKEN.png)

<details>
<summary>Permission breakdown</summary>
Each permission is configured to support required pipeline operations, with additional details provided for Enterprise-specific use cases. If unnecessary for your workflows, consider omitting corresponding permissions.
</details>

#### ORG_REPO_ADMIN_TOKEN

This fine-grained token is used for initial setup and bootstrapping repositories. For Enterprise customers, it also provisions delegated repositories. Assign the following permissions to all accessible repositories:

- Administration: Read & write
- Content: Read & write
- Metadata: Read
- Pull requests: Read & write
- Workflows: Read & write

<details>
<summary>Permission breakdown</summary>
Permissions are incrementally tested to minimize access while enabling required functionality. Review and omit permissions based on your use case.
</details>

:::tip
For non-Enterprise customers, delete this token after the setup process is complete.
:::

### ci-read-only-user

The `ci-read-only-user` downloads private software and accesses Gruntwork IaC Library modules or private repositories during GitHub Actions runs. This user requires a single Classic token with read permissions. Add this user to a GitHub team with read access to relevant repositories, including `infrastructure-live-root`.

**Invite ci-read-only-user**

Grant read access to `infrastructure-live-root`.

**Checklist:**
<PersistentCheckbox id="via-machine-users-4" label="ci-read-only-user invited to infrastructure-live-root" />

**Create a token for ci-read-only-user**

Generate the following token for `ci-read-only-user`:

**Checklist:**
<PersistentCheckbox id="via-machine-users-4" label="PIPELINES_READ_TOKEN created under ci-read-only-user" />



#### PIPELINES_READ_TOKEN

This Classic token allows access to private software during workflows. Assign the `repo` scope. Gruntwork recommends setting an expiration of 90 days to balance security and token rotation.

![PIPELINES_READ_TOKEN PAT Configuration](/img/pipelines/security/PIPELINES_READ_TOKEN.png)

## Invite Machine Users to Gruntwork

Ensure both machine users are added to your Gruntwork GitHub Organization team ([Invite team members](https://docs.gruntwork.io/developer-portal/invite-team#inviting-team-members) and [link GitHub ID](https://docs.gruntwork.io/developer-portal/link-github-id)).

**Checklist:**
<PersistentCheckbox id="via-machine-users-4" label="Machine users invited to Gruntwork organization" />

## Configure GitHub Actions secrets

Store secrets securely in GitHub Actions. Organization-level secrets are recommended where available. For plans that do not support organization-specific secrets, use repository-level secrets.

:::info
When adding new `infrastructure-live` repositories, update the secret permissions as required.
:::



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

If you are **not an Enterprise customer**:

- Delete the `ORG_REPO_ADMIN_TOKEN` Personal Access Token from the `ci-user`’s GitHub account.
- Remove the `ORG_REPO_ADMIN_TOKEN` Organization secret from the GitHub Organization.

For Enterprise customers:

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

If you are **not an Enterprise customer**, also do the following:

- Delete the `ORG_REPO_ADMIN_TOKEN` Personal Access Token from the `ci-user`’s GitHub account.
- Remove the `ORG_REPO_ADMIN_TOKEN` Repository secret from the `infrastructure-live-root` repository.
:::


:::info
For more information on creating and using GitHub Actions Repository secrets, refer to the [GitHub Documentation](https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions#creating-secrets-for-a-repository).
:::

</TabItem>
</Tabs>

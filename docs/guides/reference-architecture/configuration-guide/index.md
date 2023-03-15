# Gruntwork Reference Architecture Setup Instructions

This repository is used to generate the code to deploy and manage the [the Gruntwork Reference Architecture](https://gruntwork.io/reference-architecture/). You will receive an automated email at the end of the deployment indicating that the initial deployment has finished, which includes instructions for copying the code to your own repository outside of the `gruntwork-clients` GitHub organization.

![Landing Zone Reference Architecture](/img/guides/reference-architecture/configuration-guide/landing-zone-ref-arch.png)

Follow the instructions below to prepare for a Reference Architecture deployment:

:::info

We recommend that you use the Gruntwork CLI tool to automate most of this process for you: <https://github.com/gruntwork-io/gruntwork>. Note that the Gruntwork CLI is in a private repo that is part of the Gruntwork IaC Library. If you don’t already have access to the Library, please email <support@gruntwork.io> to get access, or you will get a 404! Once you have access, follow the documentation in the README closely!

:::

:::caution

Caveat: at this time, the Reference Architecture does not configure or manage the root/management account of an AWS Organization set up. That is, it does not include the [`account-baseline-root` module](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/modules/landingzone/account-baseline-root). Gruntwork is planning to add this in a future enhancement to the reference architecture.

:::

## 1. Create an infrastructure-live repository

1. Create a new repository in your VCS platform. We recommend naming it _infrastructure-live_.
1. Keep this repo handy, as you'll be prompted for the following information in a subsequent step:
    - HTTPS URL (e.g. `https://github.com/gruntwork-io/infrastructure-live`)
    - SSH URL (e.g. `git@github.com:gruntwork-io/infrastructure-live.git`)
    - Default branch (e.g. `main` or `master`)

## 2. Set up the machine user

The next step is to configure the Machine User Personal Access Token(s)

If you are using GitHub to host your `infrastructure-live` repository, you will only need the one 
personal access token as the permissions will allow access to both your `infrastructure-live` repo and 
Gruntwork's private repositories.

If you are using GitLab or Bitbucket to host your `infrastructure-live` repository, you will need a 
Personal Access Token for your respective VCS in addition to a GitHub PAT for access to the 
private Gruntwork GitHub repositories. Note that at this time GitHub is the only supported VCS for 
Reference Architecture deployments.

First we will create a GitHub Personal Access Token:

1. In GitHub, create a new user account, then create a [Personal Access Token (PAT)](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token).
1. In the ref arch form, `MachineUserGitUsername` and `MachineUserGitEmail` is where you enter this account’s details.
1. In the [Gruntwork developer portal](https://app.gruntwork.io/), add the user to your team, then log in to the portal _as the machine user_ and link the GitHub account. You’ll know it’s set up correctly when you see the Gruntwork icon in the machine user’s GitHub profile, indicating that they are a member of the Gruntwork Organization.
1. The PAT should be granted `repo`, `user:email`, and `admin:public_key` permissions. You should include `GitHub-MachineUser-PAT` as part of the name/description of the token to be able to identify it later.
1. Once you have the PAT, create a new [AWS Secrets Manager](https://aws.amazon.com/secrets-manager/) secret in the _shared_ account.  You can use any name you wish for this secret, but it's recommended you include `GitHub-MachineUser-PAT` as part of the name to be able to identify it later. See the section [Appendix: How to create a secret for the VCS token in AWS Secrets Manager](#secrets_manager_howto) for details.
1. Once the secret is created, **make a note of the ARN**.

If your `infrastructure-live` repository is hosted in GitHub, enter the secrets manager ARN from the above steps into the Ref Arch `VCSPATSecretsManagerARN` field. This token will provide access to both your `infrastructure-live` repo and to the Gruntwork private repositories and you are done setting up the machine user! You can skip to the next section. 

If your `infrastructure-live` repository is hosted in BitBucket or GitLab, expand the `BitBucket / GitLab` tab below for more details.

<details><summary>BitBucket / GitLab</summary>

> Note that at this time, GitHub is the only supported VCS for Reference Architecture deployments.

If you are using GitLab or BitBucket to host your `infrastructure-live` repository, enter the secrets manager ARN from the above steps into the `GitHubPATSecretsManagerARN` field. Since this token will provide access to only the Gruntwork private repositories, we will next need to create the token to access your `infrastructure-live` repo.

- For GitLab, use [these instructions](https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html), and
  grant the following scopes (NOTE: `api`, `read_user`, and `read_api` scopes are only used for uploading the public SSH
  key for the user. You can replace the token with a new one that only has `write_repository` permission after the
  Reference Architecture is deployed.):

  - `write_repository`
  - `api`
  - `read_user`
  - `read_api`

  You should name the token `GitLab-MachineUser-PAT` to be able to identify it later

- For Bitbucket, use [these instructions](https://support.atlassian.com/bitbucket-cloud/docs/app-passwords/), and
  grant the following scopes (NOTE: `Account:Write` is only used for uploading the public SSH key for the user. You can
  replace the token with a new one that only has `Repositories:Write` permission after the Reference Architecture is
  deployed.):

  - `Repositories:Write`
  - `Account:Write`

  You should name the token `BitBucket-MachineUser-PAT` to be able to identify it later.

Now you will need to create _another_ secret in AWS Secrets Manager in the _shared_ account containing this PAT. You should name the secret following the above naming convention (`GitLab-MachineUser-PAT`/`BitBucket-MachineUser-PAT`). Once the secret is created, **make a note of the ARN**.

Finally, enter the newly created `GitLab-MachineUser-PAT`/`BitBucket-MachineUser-PAT` secrets manager ARN from the above step into the Ref Arch `VCSPATSecretsManagerARN` field.

</details>

### Explanation

The reference architecture includes an end-to-end [CI/CD pipeline for infrastructure](https://gruntwork.io/pipelines/). You’ll need to set up a _machine user_ (also known as a _service account_) that will automatically checkout your code, push artifacts (such as Docker images and AMIs), and access the Gruntwork IaC Library.

There are two primary uses for the Machine User:
- Accessing Gruntwork private repositories hosted in GitHub
- Accessing your `infrastructure-live` repository that is hosted in GitHub, BitBucket, or GitLab

You need at least one [machine user in GitHub](https://developer.github.com/v3/guides/managing-deploy-keys/#machine-users) to access the repos in the Gruntwork IaC Library private repositories. If you are using GitHub to host your `infrastructure-live` repo then this machine user PAT will also grant all the access you will need.

If you have chosen Bitbucket or GitLab to host your `infrastructure-live` repo, then you will need a second PAT that grants access to that repo. 

In the `reference-architecture-form.yml` there are two fields that relate to the machine user PAT(s)
- `VCSPATSecretsManagerARN` 
- `GitHubPATSecretsManagerARN`

`VCSPATSecretsManagerARN` is for the secrets manager ARN that contains the PAT for your VCS system hosting your `infrastructure-live` repo. If your VCS happens to be GitHub then it automatically grants all the access you need and you can set `GitHubPATSecretsManagerARN` to an empty string as it is not needed.

Since BitBucket and GitLab PATs wouldn't grant access to GitHub, the additional `GitHubPATSecretsManagerARN` is needed in order to access Gruntwork Private IaC Library repositories.

## 3. Clone this repository

Use Git to clone this repository. If you do not have `git` available on your system, refer to [these instructions](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) to install Git on your platform.

1. Clone the repository.

   ```bash
   git clone git@github.com:gruntwork-clients/<this-repo>.git
   ```

## 4. Authenticate to AWS on your command line

The bootstrap script will prepare your AWS accounts for deployment. To use the bootstrap script and form filling wizard,
the CLI will need access to your AWS Root account you would like to use for the Reference Architecture. The Root account
is where the AWS Organization is defined.

1. If you do not have a Root account (an AWS account with AWS Organizations setup) already, create one. We recommend
   creating a brand new account to use as the Root account if you are not already using AWS Organizations, and import
   your existing AWS Account(s) to it as members.
1. Setup AWS Organizations in your Root account if you haven't already. Refer to [this
   documentation](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_tutorials_basic.html) for instructions
   on how to setup AWS Organizations.
1. If you do not have one already, [create an IAM
   User](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users_create.html) with administrator permissions (attach
   the `AdministratorAccess` IAM policy). Make sure to create AWS Access Keys for the IAM User as well.
1. Once you have an IAM User and AWS Access Keys for accessing the Root account, configure your terminal to be able to
   authenticate to the IAM User. If you do not know how to do this, refer to our [Comprehensive Guide to Authenticating
   to AWS on the Command
   Line](https://blog.gruntwork.io/a-comprehensive-guide-to-authenticating-to-aws-on-the-command-line-63656a686799).

## 5. Run the bootstrap script

We're ready to run the wizard to fill in your `reference-architecture-form.yml` with valid values.

Before running the wizard, ensure you have completed steps 1, 2 and 3 and that you have the following values ready at hand:

- Personal Access Token for YOUR GitHub user. This token is used to create the Pull Request for the Reference Architecture form.
    - If you do not have one, generate a new Personal Access Token with `repo` level permissions.
- GitHub Machine User Personal Access Token (required in all cases)
- VCS Machine User Personal Access Token (only required if your ultimate infrastructure-live destination is NOT GitHub)
- The HTTPS URL to your VCS `infrastructure-live` repo (e.g., `https://github.com/gruntwork-io/infrastructure-live.git`)
- The SSH URL to your same VCS `infrastructure-live` repo (e.g., `git@github.com:gruntwork-io/infrastructure-live.git`)

In your repo, you will find two scripts:

- `bootstrap_unix.sh`
- `bootstrap_windows.py`

Both scripts will:

1. Sanity check that you have access to the required organizations.
2. Install the Gruntwork command line tool, which does all the heavy lifting for you
3. Run the Gruntwork wizard for you, which helps you:
   - Provision your AWS accounts
   - Register domains
   - Set up your VCS token secrets
   - Fill in your reference-architecture-form.yml file with valid values
   - Commit and push your form to GitHub and open a pull request

Run the corresponding script based on your platform:

### Linux or Mac OS

```bash
export GITHUB_OAUTH_TOKEN=<YOUR GITHUB PERSONAL ACCESS TOKEN>
./bootstrap_unix.sh
```

### Windows

Install python, and then run:

```
$env:GITHUB_OAUTH_TOKEN = 'YOUR GITHUB PERSONAL ACCESS TOKEN'
python3 bootstrap_windows.py
```

## 6. Iterate on your form and push your changes up to run your Preflight Checks

![Gruntwork Preflight Checks on GitHub](/img/guides/reference-architecture/configuration-guide/preflight-checks.png)

Once your form is filled in and pushed to GitHub, our GitHub automations will take over. You'll notice a special GitHub check called _Preflight Checks_ that will run against your `reference-architecture-form.yml` file and flag any errors for you directly in your pull request, like so:

![Gruntwork Preflight Checks](/img/guides/reference-architecture/configuration-guide/preflight-checks-preview.png)

You can then locally iterate on your form by editing `reference-architecture-form.yml` on the `ref-arch-form` branch and pushing your changes up to GitHub. Each time you make a new commit and push it, the Gruntwork _Preflight Checks_ will be run against your form.

## Next Steps

Once all your _Preflight Checks_ pass, you can merge your pull request, which will commence your Ref Arch deployment.

Gruntwork engineers are automatically notified of each new Ref Arch deployment, so there's no need to reach out to support just to inform us that your deployment has commenced.

Gruntwork engineers will monitor your deployment and receive notifications about failures and issues that may require intervention to resolve.

Gruntwork engineers rotate through all active deployments to fix up issues preventing them from making forward progress. In general, deployments take "A few days", although there are plenty of variables outside of our control that can occasionally interfere with a deployment, and which may take longer to remediate.

Gruntwork engineers will reach out to you to communicate a status update or next steps if your deployment requires additional intervention to complete.

## Manual setup instructions

<details>
<summary>
Click here if you would like to perform the setup actions manually
</summary>

Visit [the Gruntwork releases page](https://github.com/gruntwork-io/gruntwork/releases)

Find and download the correct binary for your platform.

### Mac and Linux instructions

Mac and Linux users, move it into `/usr/local/bin/`. For example, assuming you downloaded `gruntwork_linux_amd64`:

`sudo mv ~/Downloads/gruntwork_linux_amd64 /usr/local/bin/gruntwork`

Make the binary executable

`chmod +x /usr/local/bin/gruntwork`

Run the setup wizard

`gruntwork wizard`

### Windows users

Download and move your binary to your `C:\Program Files` directory.

Append the full path to your `gruntwork` binary to your system's PATH.

Run the setup wizard

`gruntwork wizard`

</details>

## Frequently Asked Questions (F.A.Q)

<details>
<summary>Click to expand the FAQ section</summary>

_Why do I need to create another repository? Can't I use this repository for my infrastructure code?_

Our Reference Architecture deployment process depends on having access to the code. In lieu of requesting for access to
a repository that you own, we use this current repository in the `gruntwork-clients` GitHub organization to stage the
code for the Reference Architecture deployment.

This code should be moved to a repository that you have full control over once everything is deployed.


_Why do I need a machine user?_

The reference architecture includes an end-to-end [CI/CD pipeline for infrastructure](https://gruntwork.io/pipelines/). You’ll need to set up a _machine user_ (also known as a _service account_) that will automatically checkout your code, push artifacts (such as Docker images and AMIs), and access the Gruntwork IaC Library.

You need one [machine user in GitHub](https://developer.github.com/v3/guides/managing-deploy-keys/#machine-users) to access the repos in the Gruntwork IaC Library. 


_What are the various Ref Arch accounts used for?_

This is the breakdown of AWS accounts in the Reference Architecture:

- **Security**: for centralized authentication to other accounts, including management of IAM users, groups, and roles.
- **Logs**: A log archive account that contains a central Amazon S3 bucket for storing copies of all AWS CloudTrail and AWS Config log files.
- **Shared**: Shared services account for sharing resources such as Amazon Machine Images (AMIs) and Docker images with other accounts. This account can also be used to provide common infrastructure such as monitoring systems (e.g. Grafana) with other accounts.
- **Dev**: A dedicated app account for development purposes, intended to isolate early development releases from the rest of your infrastructure.
- **Stage**: A dedicated app account for hosting staging, testing, and/or QA environments.
- **Prod**: A dedicated app account for production deployments, intended for live environments used by customers.


_Where can I read the Ref Arch Setup FAQ?_

Please find our [Reference Architecture Pre-Deployment FAQ page here](https://docs.gruntwork.io/faq/ref-arch-predeployment/).


_How do I commit and push my form changes?_

Committing changes and pushing to the remote repository:

```bash
git add reference-architecture-form.yml
git commit -m 'Completed reference architecture form.'
git push origin ref-arch-form
```


_How do I open a pull request with my changes?_

[See the GitHub docs on how to open a pull request](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request).


_How do I create a secret for the VCS token in AWS Secrets Manager?_

To create a secret in AWS Secrets Manager, first open the AWS console for the _shared_ AWS account, and navigate to the Secrets Manager console.

![](/img/guides/reference-architecture/configuration-guide/SM1.png)

Next, choose _Store a new secret_.

![](/img/guides/reference-architecture/configuration-guide/SM2.png)

Choose _Other types of secrets_, then click on _Plaintext_, then paste the value of your PAT in the text field.

![](/img/guides/reference-architecture/configuration-guide/SM3.png)

Click _Next_ to continue.

![](/img/guides/reference-architecture/configuration-guide/SM4.png)

Choose a name for the secret (we’ve chosen _GitHubPAT_ here), then click _Next_ through the remaining screens and save the secret. Once the secret is created, you’ll find it in the list of secrets. If you click on the secret, you’ll see the secret ARN in the fields.

![](/img/guides/reference-architecture/configuration-guide/SM5.png)

In the ref arch form, `VCSPATSecretsManagerARN` is where you enter this ARN.

</details>

<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "59d4e6a65fe7285afd4030eb4b11e002"
}
##DOCS-SOURCER-END -->

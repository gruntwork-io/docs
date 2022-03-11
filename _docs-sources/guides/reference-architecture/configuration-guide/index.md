# Gruntwork Reference Architecture Setup Instructions DEMO!

This repository is used to generate the code to deploy and manage the [the Gruntwork Reference Architecture](https://gruntwork.io/reference-architecture/). When we have finished the initial deployment, all of the code will be committed to this repository. We will then hand off the architecture for you to use, and we will include instructions for copying the code to your own repository outside of the `gruntwork-clients` GitHub organization.

![Landing Zone Reference Architecture](/img/guides/reference-architecture/configuration-guide/landing-zone-ref-arch.png)

Follow the instructions below to prepare for a Reference Architecture deployment:

:::info

We recommend that you use the Gruntwork CLI tool to automate most of this process for you: <https://github.com/gruntwork-io/gruntwork>. Note that the Gruntwork CLI is in a private repo that is part of the Gruntwork IaC Library. If you don’t already have access to the Library, please email <support@gruntwork.io> to get access, or you will get a 404! Once you have access, follow the documentation in the README closely!

:::

:::caution

Caveat: at this time, the Reference Architecture does not configure or manage the root/management account of an AWS Organization set up. That is, it does not include the [`account-baseline-root` module](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/modules/landingzone/account-baseline-root). Gruntwork is planning to add this in a future enhancement to the reference architecture.

:::

## Clone this repository

The very first step is to clone this repository to your local machine. You must have Git installed on your machine. Refer to [these instructions](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) to install Git on your platform.

1. Clone the repository.

  ```bash
  git clone git@github.com:gruntwork-clients/<this-repo>.git
  ```

1. Check out a new branch with your changes:

  ```bash
  git checkout -b ref-arch-form
  ```

## Create and configure AWS Accounts

1. Create the following AWS accounts:

   - Security: for centralized authentication to other accounts, including management of IAM users, groups, and roles.
   - Logs: A log archive account that contains a central Amazon S3 bucket for storing copies of all AWS CloudTrail and AWS Config log files.
   - Shared: Shared services account for sharing resources such as Amazon Machine Images (AMIs) and Docker images with other accounts. This account can also be used to provide common infrastructure such as self-hosted CI/CD systems (e.g. Jenkins) and monitoring systems (e.g. Grafana) with other accounts.
   - Dev: A dedicated app account for development purposes, intended to isolate early development releases from the rest of your infrastructure.
   - Stage: A dedicated app account for hosting staging, testing, and/or QA environments.
   - Prod: A dedicated app account for production deployments, intended for live environments used by customers.

1. Once they are created, record the account IDs.

1. These account IDs will go under `AWSAccounts` in the reference architecture form.

For the best results, use [Gruntwork CLI](https://github.com/gruntwork-io/gruntwork) to create the accounts. The Gruntwork CLI automatically grants Gruntwork engineers access to your accounts through an IAM role. However, **if you choose to create the accounts manually and do not use the Gruntwork CLI, you still MUST run the `gruntwork aws grant` command to grant the Gruntwork team access to these accounts**. MFA is enforced for all Gruntwork access. You can use the same tool to revoke access when the deployment is complete. See [CLI documentation](https://github.com/gruntwork-io/gruntwork) for details.

:::info

- The accounts must be new, empty accounts, with no resources present. That means no EC2 instances, RDS databases, CloudTrail trails, AWS Config recorders, etc.
- Do not apply any Service Control Policies to the accounts as they may interfere with the Terraform resources in the Reference Architecture.
- You can name the _dev, stage,_ and _prod_ accounts anything you like, but the others must be named _shared_, _logs_, and _security_.

:::

## Purchase and register domain names

The Reference Architecture uses Route 53 to setup public DNS records for several aspects of the infrastructure, such as the network bastion and the [AWS Sample App](https://github.com/gruntwork-io/aws-sample-app/). For this to work, we ask that you set up domains for each application account (_dev_, _stage_, and _prod_) and, if you’re using Jenkins, in the _shared_ account. These domains should be configured as public hosted zones in Route 53. There are two options for domain registration:

### Option A: Register one domain per account (recommended!)

Follow the instructions in the [Gruntwork CLI documentation](https://github.com/gruntwork-io/gruntwork#create-the-aws-accounts) to complete this step.

If you choose not to use the Gruntwork CLI, you may either [register a new domain using Route 53](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/domain-register.html) yourself, or you may register a domain using an external provider, and [set up Route 53 as the DNS service for that domain](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/MigratingDNS.html).

#### Explanation

You’ll be using Route 53 to register a separate domain name in the _dev_, _stage_, _prod_ accounts, as well as _shared_ if you are using Jenkins.

This is the more secure option because:

- Reduces the chance of making changes to the wrong domain: e.g., accidentally update prod while working on dev.
- Less likely to make a mistake such as issuing cookies for the wrong domain: e.g., accidentally create a cookie in dev that is also accepted in prod.
- Lowers the possibility of issuing TLS certificates for the wrong domain: e.g., accidentally create a TLS cert in dev that is also accepted in prod.

Most domains in Route 53 are just $12, so this should not add much expense.

### Option B: Register one domain with subdomains in each account

Follow the instructions in the [Route 53 documentation](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/CreatingNewSubdomain.html) to delegate a subdomain. We recommend that you manage the top-level domain as a hosted zone in either the _security_ or the root account of your AWS Organization, and delegate subdomains to each of the other accounts (e.g. _dev_, _stage_, _prod_, and _shared_ if using Jenkins).

#### Explanation

You’ll be purchasing one domain (e.g. _example.com_), and delegate subdomains to each account (e.g. _dev.example.com_, _stage.example.com_, etc.). The upside of this approach is that there is a single [top-level domain namespace](https://en.wikipedia.org/wiki/Top-level_domain) (e.g. _example.com_) for all of your accounts. However, there are several important downsides:

- You may accidentally make a mistake when managing the top-level domain that may impact all of your subdomains.
- A subdomain such as `prod.example.com` is less intuitive for users. This can be mitigated by choosing a top-level domain for prod, and subdomains for non-production environments.
- You must be careful about issuing cookies with the [`Set-Cookie` HTTP header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie) so that cookies are valid only for the intended subdomain.

## Confirm the domain configuration

Once everything is configured up correctly, check that you can resolve the domains and confirm the nameserver settings using the `dig` command on MacOS or Linux, or `nslookup` on Windows. For example, the hosted zone configuration for the _gruntwork.in_ domain used by Gruntwork for testing looks like this in Route 53:

![](/img/guides/reference-architecture/configuration-guide/gruntwork.in.ns.png)

1. On MacOS or Linux, use `dig` to confirm that the domain can be resolved correctly over the Internet:

  ```bash
  $ dig gruntwork.in +short ns
  ns-1202.awsdns-22.org.
  ns-1749.awsdns-26.co.uk.
  ns-559.awsdns-05.net.
  ns-67.awsdns-08.com.
  ```

1. On Windows, use `nslookup`:

  ```bash
  $ nslookup -type=mx gruntwork.in
  Server:             8.8.8.8
  Address:    8.8.8.8#53

  Non-authoritative answer:
  gruntwork.in        nameserver = ns-1202.awsdns-22.org.
  gruntwork.in        nameserver = ns-1749.awsdns-26.co.uk.
  gruntwork.in        nameserver = ns-559.awsdns-05.net.
  gruntwork.in        nameserver = ns-67.awsdns-08.com.
  ```

Notice that the NS records in the image match the values returned by the commands. The same process applies if you’re using subdomains. Make sure to validate each domain or subdomain in this manner.

## Create an infrastructure-live repository

1. Create a new repository in your VCS platform. We recommend naming it _infrastructure-live_.
2. In the ref arch form, `InfraLiveRepoURL` is where you enter this repo’s HTTPS URL (e.g. <https://github.com/gruntwork-io/infrastructure-live.git>).
3. `InfraLiveRepoSSHURL` is where you enter this repo’s SSH URL (e.g. <git@github.com>:gruntwork-io/infrastructure-live.git).
4. `InfraLiveDefaultBranchName` is where you enter your repo’s default branch name (e.g. main).

This current repository will contain all of the infrastructure code you need to extend and operate the environment. For you to have access to all the code, you should copy this code into your newly created _infrastructure-live_ repo once the deployment is done.

## Set up the machine user

Whatever VCS platform you are using, do this:

1. In GitHub, create a new user account, then create a [Personal Access Token (PAT)](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token).
1. In the ref arch form, `MachineUserGitUsername` and `MachineUserGitEmail` is where you enter this account’s details.
1. In the [Gruntwork developer portal](https://app.gruntwork.io/), add the user to your team, then log in to the portal _as the machine user_ and link the GitHub account. You’ll know it’s set up correctly when you see the Gruntwork icon in the machine user’s GitHub profile, indicating that they are a member of the Gruntwork Organization.
1. The PAT should be granted `repo`, `user:email`, and `admin:public_key` permissions.
1. Once you have the PAT, create a new [AWS Secrets Manager](https://aws.amazon.com/secrets-manager/) secret in the _shared_ account. You can use any name you wish for this secret. See the section [Appendix: How to create a secret for the VCS token in AWS Secrets Manager](#secrets_manager_howto) for details.
1. Once the secret is created, **make a note of the ARN**.
1. In the ref arch form, `VCSPATSecretsManagerARN` is where you enter this ARN.

If you are using GitHub as your VCS, you’re done with this section! If you’re using GitLab or BitBucket, do the following:

- For GitLab, use [these instructions](https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html), and
  grant the following scopes (NOTE: `api`, `read_user`, and `read_api` scopes are only used for uploading the public SSH
  key for the user. You can replace the token with a new one that only has `write_repository` permission after the
  Reference Architecture is deployed.):

  - `write_repository`
  - `api`
  - `read_user`
  - `read_api`

- For Bitbucket, use [these instructions](https://support.atlassian.com/bitbucket-cloud/docs/app-passwords/), and
  grant the following scopes (NOTE: `Account:Write` is only used for uploading the public SSH key for the user. You can
  replace the token with a new one that only has `Repositories:Write` permission after the Reference Architecture is
  deployed.):

  - `Repositories:Write`
  - `Account:Write`

- Then create _another_ secret in AWS Secrets Manager in the _shared_ account containing this PAT. **Note the ARN, as in the GitHub step above**.

- In the ref arch form, `GitHubPATSecretsManagerARN` is where you enter this ARN.

### Explanation

The reference architecture includes an end-to-end [CI/CD pipeline for infrastructure](https://gruntwork.io/pipelines/). You’ll need to set up a _machine user_ (also known as a _service account_) that will automatically checkout your code, push artifacts (such as Docker images and AMIs), and access the Gruntwork IaC Library.

You need one [machine user in GitHub](https://developer.github.com/v3/guides/managing-deploy-keys/#machine-users) to access the repos in the Gruntwork IaC Library. If you’re not using GitHub, (e.g., in BitBucket or GitLab), you’ll need to create a machine user for that VCS.

## Fill out the reference architecture form

The [reference architecture form](https://github.com/gruntwork-clients/infrastructure-live/blob/main/reference-architecture-form.yml) is a [YAML file](https://en.wikipedia.org/wiki/YAML) that contains all the fields that Gruntwork needs to deploy your reference architecture.

You’ll need all the information you’ve noted in the previous steps. This is where you’ll also be able to customize your infrastructure by choosing a compute option (e.g. ASG, ECS, or EKS), a cache cluster (Redis or Memcached), and a database (e.g. MySQL, PostgreSQL, Aurora, etc). The form contains detailed descriptions of each field.

YAML files are space-sensitive. As you edit the file, be sure to retain the correct whitespace! This should be apparent as you review the file.

1. Open `reference-architecture-form.yml` in a text editor.
1. Update the _replace-me_ placeholder text in each field. Use double quotes (`""`) to wrap the values, as shown in the examples.

If you’re unsure about how to answer any of the questions, email <support@gruntwork.io> and let us know!

## Complete the set up process and open a pull request for Gruntwork

1. Review your changes. If you notice any errors, correct them, and rerun:

  ```bash
  git diff
  ```

1. Commit the changes and push to the remote repository:

  ```bash
  git add reference-architecture-form.yml
  git commit -m 'Completed reference architecture form.'
  git push origin ref-arch-form
  ```

1. [Open a pull request](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request). Gruntwork will review the pull request, resolve any open questions or issues, then merge and begin the deployment.

## Appendix: How to create a secret for the VCS token in AWS Secrets Manager

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

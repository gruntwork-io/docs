import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CustomizableValue from '/src/components/CustomizableValue';

# Adding Account Factory to a new repository

To configure Gruntwork Account Factory in a new GitHub/GitLab repository, the following steps are required (and will be explained in detail below):

1. Create your infrastructure-live root, access-control and catalog repositories.
2. Configure the authentication for the repositories to ensure that required access tokens are available.

<Tabs groupId="platform" queryString="adding-account-factory">

<TabItem value="github" label="GitHub">

<h2> Creating the infrastructure-live-root repository </h2>

Gruntwork provides a pre-configured git repository template that incorporates best practices while allowing for customization.

[infrastructure-live-root-template](https://github.com/gruntwork-io/infrastructure-live-root-template)

This template generates an `infrastructure-live-root` repository with a bootstrap workflow designed to scaffold a best-practices Terragrunt configuration. It includes patterns for module defaults, global variables, and account baselines. Additionally, it integrates Gruntwork Pipelines, which can be removed if not required.

The workflow can optionally scaffold the `infrastructure-live-access-control` and `infrastructure-catalog` repositories.

Navigate to the template repository and select **Use this template** -> **Create a new Repository**. Choose your organization as the owner, add a description if desired, set the repository to **private**, and click **Create repository**.

<h2> Configuring Gruntwork app settings </h2>

Use the Gruntwork.io GitHub App to [add the repository as an Infra Root repository](/2.0/docs/pipelines/installation/viagithubapp#configuration).

If using the [machine user model](/2.0/docs/pipelines/installation/viamachineusers), ensure the `INFRA_ROOT_WRITE_TOKEN` (and `ORG_REPO_ADMIN_TOKEN` for enterprise customers) is added to the repository as a secret or configured as an organization secret.

<h2> Updating the Bootstrap Workflow </h2>

Return to your `infrastructure-live-root` repository and follow the `README` instructions to update the bootstrap workflow for IaC Foundations. Provide details about your AWS organization, accounts, and default values for new account provisioning.

<h2> Running the workflow </h2>

Follow the instructions in your `infrastructure-live-root` repository to execute the Bootstrap Workflow. Gruntwork support is available to address any questions that arise. During the workflow execution, you can choose to create the `infrastructure-live-access-control` and `infrastructure-catalog` repositories. These repositories will be created in your GitHub organization using values defined in the workflow configuration.

<h3> Infrastructure live access control </h3>

This repository is primarily for Enterprise customers but is recommended for all users. When running the Bootstrap Workflow in your `infrastructure-live-root` repository, select the option to "Bootstrap the infrastructure-access-control repository."

<h3> Infrastructure catalog </h3>

The Bootstrap Workflow also creates an empty `infrastructure-catalog` repository. This repository is used to store Terraform/OpenTofu modules authored by your organization for internal use. During the Bootstrap Workflow execution in your `infrastructure-live-root` repository, select the option to "Bootstrap the infrastructure-catalog repository."

<h2> Completing instructions in Bootstrap Pull Requests </h2>

Each of your repositories will contain a Bootstrap Pull Request. Follow the instructions in these Pull Requests to finalize the setup of your IaC repositories.

:::info

The bootstrapping pull requests include pre-configured files, such as a `.mise.toml` file that specifies versions of OpenTofu and Terragrunt. Ensure you review and update these configurations to align with your organization's requirements.

:::

</TabItem>
<TabItem value="gitlab" label="GitLab">

This guide walks you through the process of setting up a new GitLab Project with the Gruntwork Platform. By the end, you'll have a fully configured GitLab CI/CD pipeline that can create new AWS accounts and deploy infrastructure changes automatically.

:::info
To use Gruntwork Pipelines in an **existing** GitLab repository, see this [guide](/2.0/docs/pipelines/installation/addinggitlabrepo).
:::

<h2> Prerequisites </h2>

Before you begin, make sure you have:

- Basic familiarity with Git, GitLab, and infrastructure as code concepts
- Completed the [AWS Landing Zone setup](/2.0/docs/accountfactory/prerequisites/awslandingzone)
- Have programmatic access to the AWS accounts created in the [AWS Landing Zone setup](/2.0/docs/accountfactory/prerequisites/awslandingzone)
- Completed the [Pipelines Auth setup for GitLab](/2.0/docs/pipelines/installation/viamachineusers#gitlab) and setup a machine user with appropriate PAT tokens
- Local access to Gruntwork's GitHub repositories, specifically the [architecture catalog](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/)

<details>
<summary>Additional setup for **custom GitLab instances only**</summary>

<h3> Fork the Pipelines workflow project </h3>

You must [fork](https://docs.gitlab.com/user/project/repository/forking_workflow/#create-a-fork) Gruntwork's public [Pipelines workflow project](https://gitlab.com/gruntwork-io/pipelines-workflows) into your own GitLab instance.
This is necessary because Gruntwork Pipelines uses [GitLab CI/CD components](/2.0/docs/pipelines/architecture/ci-workflows), and GitLab requires components to reside within the [same GitLab instance as the project referencing them](https://docs.gitlab.com/ci/components/#use-a-component).

When creating the fork, we recommend configuring it as a public mirror of the original Gruntwork project and ensuring that tags are included.

<h3> Ensure OIDC configuration and JWKS are publicly accessible </h3>

This step only applies if you are using a self-hosted GitLab instance that is not accessible from the public internet. If you are using GitLab.com or a self-hosted instance that is publicly accessible, you can skip this step.

1. [Follow GitLab's instructions](https://docs.gitlab.com/ci/cloud_services/aws/#configure-a-non-public-gitlab-instance) for hosting your OIDC configuration and JWKS in a public location (e.g. S3 Bucket). This is necessary for both Gruntwork and the AWS OIDC provider to access the GitLab OIDC configuration and JWKS when authenticating JWT's generated by your custom instance.
2. Note the <CustomizableValue id="ISSUER_URL" /> (stored as `ci_id_tokens_issuer_url` in your `gitlab.rb` file per GitLab's instructions) generated above for reuse in the next steps.
</details>

1. Create a new GitLab project for your `infrastructure-live-root` repository.
1. Install dependencies.
1. Configure the variables required to run the infrastructure-live-root boilerplate template.
1. Create your `infrastructure-live-root` repository contents using Gruntwork's architecture-catalog template.
1. Apply the account baselines to your AWS accounts.


<h2> Create a new infrastructure-live-root </h2>

<h3> Authorize Your GitLab Group with Gruntwork </h3>

To use Gruntwork Pipelines with GitLab, your group needs authorization from Gruntwork. Email your Gruntwork account manager or support@gruntwork.io with:

    ```
    GitLab group name(s): $$GITLAB_GROUP_NAME$$ (e.g. acme-io)
    GitLab Issuer URL: $$ISSUER_URL$$ (For most users this is the URL of your GitLab instance e.g. https://gitlab.acme.io, if your instance is not publicly accessible, this should be a separate URL that is publicly accessible per step 0, e.g. https://s3.amazonaws.com/YOUR_BUCKET_NAME/)
    Organization name: $$ORGANIZATION_NAME$$ (e.g. Acme, Inc.)
    ```

Continue with the rest of the guide while you await confirmation when your group has been authorized.

<h3> Create a new GitLab project </h3>

1. Navigate to the <CustomizableValue id="GITLAB_GROUP_NAME" /> group.
1. Click the **New Project** button.
1. Enter a name for the project. e.g. infrastructure-live-root
1. Click **Create Project**.
1. Clone the project to your local machine.
1. Navigate to the project directory.
1. Create a new branch `bootstrap-repository`.

<h3> Install dependencies </h3>

1. Install [mise](https://mise.jdx.dev/getting-started.html) on your machine.
1. Activate mise in your shell:

    ```bash
    # For Bash
    echo 'eval "$(~/.local/bin/mise activate bash)"' >> ~/.bashrc

    # For Zsh
    echo 'eval "$(~/.local/bin/mise activate zsh)"' >> ~/.zshrc

    # For Fish
    echo 'mise activate fish | source' >> ~/.config/fish/config.fish
    ```

1. Add the following to a .mise.toml file in the root of your project:

    ```toml title=".mise.toml"
    [tools]
    boilerplate = "0.8.1"
    opentofu = "1.10.0"
    terragrunt = "0.81.6"
    awscli = "latest"
    ```

1. Run `mise install`.


<h3>Bootstrap the repository</h3>

Gruntwork provides a boilerplate [template](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/tree/main/templates/devops-foundations-infrastructure-live-root) that incorporates best practices while allowing for customization. The template is designed to scaffold a best-practices Terragrunt configurations. It includes patterns for module defaults, global variables, and account baselines. Additionally, it integrates Gruntwork Pipelines.

<h4> Configure the variables required to run the boilerplate template </h4>

Copy the content below to a `vars.yaml` file in the root of your project and update the `<REPLACE>` values with your own.

```yaml title="vars.yaml"
SCMProvider: GitLab

# The GitLab group to use for the infrastructure repositories. This should include any additional sub-groups in the name
# Example: acme/prod
SCMProviderGroup: $$GITLAB_GROUP_NAME$$

# The GitLab project to use for the infrastructure-live repository.
SCMProviderRepo: infrastructure-live-root

# The name of the project to use for the infrastructure-live-access-control repository.
AccessControlRepoName: infrastructure-live-access-control

# The name of the project to use for the infrastructure-catalog repository.
InfraModulesRepoName: infrastructure-catalog

# The base URL of your GitLab group repos. E.g., gitlab.com/<group>
RepoBaseUrl: $$GITLAB_GROUP_REPO_BASE_URL$$

# The name of the branch to deploy to.
# Example: main
DeployBranchName: $$DEPLOY_BRANCH_NAME$$

# The AWS account ID for the management account
# Example: "123456789012"
AwsManagementAccountId: $$AWS_MANAGEMENT_ACCOUNT_ID$$

# The AWS account ID for the security account
# Example: "123456789013"
AwsSecurityAccountId: $$AWS_SECURITY_ACCOUNT_ID$$

# The AWS account ID for the logs account
# Example: "123456789014"
AwsLogsAccountId: $$AWS_LOGS_ACCOUNT_ID$$

# The AWS account ID for the shared account
# Example: "123456789015"
AwsSharedAccountId: $$AWS_SHARED_ACCOUNT_ID$$

# The AWS account Email for the logs account
# Example: logs@acme.com
AwsLogsAccountEmail: $$AWS_LOGS_ACCOUNT_EMAIL$$

# The AWS account Email for the management account
# Example: management@acme.com
AwsManagementAccountEmail: $$AWS_MANAGEMENT_ACCOUNT_EMAIL$$

# The AWS account Email for the security account
# Example: security@acme.com
AwsSecurityAccountEmail: $$AWS_SECURITY_ACCOUNT_EMAIL$$

# The AWS account Email for the shared account
# Example: shared@acme.com
AwsSharedAccountEmail: $$AWS_SHARED_ACCOUNT_EMAIL$$

# The name prefix to use for creating resources e.g S3 bucket for OpenTofu state files
# Example: acme
OrgNamePrefix: $$ORG_NAME_PREFIX$$

# The default region for AWS Resources
# Example: us-east-1
DefaultRegion: $$DEFAULT_REGION$$

################################################################################
# OPTIONAL VARIABLES WITH THEIR DEFAULT VALUES. UNCOMMENT AND MODIFY IF NEEDED.
################################################################################

# If you are an enterprise customer, set this to true.
# IsEnterprise: true

# List of the git repositories to populate for the catalog
# CatalogRepositories:
#   - github.com/gruntwork-io/terraform-aws-service-catalog

# The AWS partition to use. Options: aws, aws-us-gov, aws-cn
# AWSPartition: aws

# The name of the IAM role to use for the plan job.
# PlanIAMRoleName: root-pipelines-plan

# The name of the IAM role to use for the apply job.
# ApplyIAMRoleName: root-pipelines-apply

# The default tags to apply to all resources.
# DefaultTags:
#   "{{ .OrgNamePrefix }}:Team": "DevOps"

# The version for terraform-aws-security module to use for OIDC provider and roles provisioning
# SecurityModulesVersion: v0.75.18

# The URL of the custom SCM provider instance. Set this if you are using a custom instance of GitLab.
# CustomSCMProviderInstanceURL: https://gitlab.example.io

# The relative path from the host server to the custom pipelines workflow repository. Set this if you are using a custom/forked instance of the pipelines workflow.
# CustomWorkflowHostRelativePath: pipelines-workflows
```

<h4> Generate the repository contents </h4>

1. Run the following command, from the root of your project, to generate the `infrastructure-live-root` repository contents:

    ```bash
    boilerplate --template-url "git@github.com:gruntwork-io/terraform-aws-architecture-catalog.git//templates/devops-foundations-infrastructure-live-root/?ref=4.0.1" --output-folder . --var-file vars.yaml --non-interactive
    ```

    This command adds all code required to set up your `infrastructure-live-root` repository.
1. Remove the boilerplate dependency from the `mise.toml` file. It is no longer needed.

1. Commit your local changes and push them to the `bootstrap-repository` branch.

    ```bash
    git add .
    git commit -m "Bootstrap infrastructure-live-root repository initial commit [skip ci]"
    git push origin bootstrap-repository
    ```

    Skipping the CI/CD process for now; you will manually apply the infrastructure baselines to your AWS accounts in a later step.

1. Create a new merge request for the `bootstrap-repository` branch. Review the changes to understand what will be applied to your AWS accounts. The generated files fall under the following categories:

        - GitLab Pipelines workflow file
        - Gruntwork Pipelines configuration files
        - Module defaults files for infrastructure code
        - Account baselines and GitLab OIDC module scaffolding files for your core AWS accounts: management, security, logs and shared.

<h3> Apply the account baselines to your AWS accounts </h3>

You will manually `terragrunt apply` the generated infrastructure baselines to get your accounts bootstrapped **before** merging this content into your main branch.

:::tip
You can utilize the AWS SSO Portal to obtain temporary AWS credentials necessary for subsequent steps:

1. Sign in to the Portal page and select your preferred account to unveil the roles accessible to your SSO user.
1. Navigate to the "Access keys" tab adjacent to the "AWSAdministratorAccess" role.
1. Copy the "AWS environment variables" provided and paste them into your terminal for usage.
:::


1. [ ] Apply infrastructure changes in the **management** account

    1. - [ ] Obtain AWS CLI Administrator credentials for the management account

    1. - [ ] Navigate to the management account folder

            ```bash
            cd management/
            ```

    1. - [ ] Using your credentials, run `terragrunt plan`.

            ```bash
            terragrunt run --all --non-interactive --backend-bootstrap plan
            ```

    1. - [ ] After the plan succeeds, apply the changes:

            ```bash
            terragrunt run --all --non-interactive apply
            ```

    1. - [ ] After applying the changes, make sure to lock providers in your `.terraform.lock.hcl` files. The lock files will be committed in the final step of the setup. e.g.

            ```bash
            terragrunt run --all providers -- lock -platform=darwin_amd64 -platform=linux_amd64
            ```

    1. - [ ] Update Permissions for Account Factory Portfolio

            The account factory pipeline _will fail_ until you grant the pipelines roles (`root-pipelines-plan` and `root-pipelines-apply`) access to the portfolio. This step **must be done after** you provision the pipelines roles in the management account (where control tower is set up).

            Access to the portfolio is separate from IAM access, it **must** be granted in the Service Catalog console.

            #### **Steps to grant access**

            To grant access to the Account Factory Portfolio, you **must** be an individual with Service Catalog administrative permissions.

            1. Log into the management AWS account
            1. Go into the Service Catalog console
            1. Ensure you are in your default region(control-tower region)
            1. Select the **Portfolios** option in **Administration** from the left side navigation panel
            1. Click on the portfolio named **AWS Control Tower Account Factory Portfolio**
            1. Select the **Access** tab
            1. Click the **Grant access** button
            1. In the **Access type** section, leave the default value of **IAM Principal**
            1. Select the **Roles** tab in the lower section
            1. Enter `root-pipelines` into the search bar, there should be two results (`root-pipelines-plan` and `root-pipelines-apply`). Click the checkbox to the left of each role name.
            1. Click the **Grant access** button in the lower right hand corner

    1. - [ ] Increase Account Quota Limit (OPTIONAL)

        Note that DevOps Foundations makes it very convenient, and therefore likely, that you will encounter one of the soft limits imposed by AWS on the number of accounts you can create.

        You may need to request a limit increase for the number of accounts you can create in the management account, as the default is currently 10 accounts.

        To request an increase to this limit, search for "Organizations" in the AWS management console [here](https://console.aws.amazon.com/servicequotas/home/dashboard) and request a limit increase to a value that makes sense for your organization.

1. - [ ] Apply infrastructure changes in the **logs** account

    1. - [ ] Obtain AWS CLI Administrator credentials for the logs account
    1. - [ ] Navigate to the logs account folder

            ```bash
            cd ../logs/
            ```

    1. - [ ] Using your credentials, run `terragrunt plan`.

            ```bash
            terragrunt run --all --non-interactive --backend-bootstrap plan
            ```

    1. - [ ] After the plan succeeds, apply the changes:

            ```bash
            terragrunt run --all --non-interactive apply
            ```

    1. - [ ] After applying the changes, make sure to lock providers in your `.terraform.lock.hcl` files. e.g.

            ```bash
            terragrunt run --all providers lock -platform=darwin_amd64 -platform=linux_amd64
            ```

1. - [ ] Apply infrastructure changes in the **security** account

    1. - [ ] Obtain AWS CLI Administrator credentials for the security account
    1. - [ ] Navigate to the security account folder

            ```bash
            cd ../security/
            ```

    1. - [ ] Using your credentials, run `terragrunt plan`.

            ```bash
            terragrunt run --all --non-interactive --backend-bootstrap plan
            ```

    1. - [ ] After the plan succeeds, apply the changes:

            ```bash
            terragrunt run --all --non-interactive apply
            ```

    1. - [ ] After applying the changes, make sure to lock providers in your `.terraform.lock.hcl` files. e.g.

            ```bash
            terragrunt run --all providers lock -platform=darwin_amd64 -platform=linux_amd64
            ```

1. - [ ] Apply infrastructure changes in the **shared** account

    1. - [ ] Obtain AWS CLI Administrator credentials for the shared account. You may need to grant your user access to the `AWSAdministratorAccess` permission set in the shared account from the management account's Identity Center Admin console.
    1. - [ ] Using your credentials, create a service role

            ```bash
            aws iam create-service-linked-role --aws-service-name autoscaling.amazonaws.com
            ```

    1. - [ ] Navigate to the shared account folder

            ```bash
            cd ../shared/
            ```

    1. - [ ] Using your credentials, run `terragrunt plan`.

            ```bash
            terragrunt run --all --non-interactive --backend-bootstrap plan
            ```

    1. - [ ] After the plan succeeds, apply the changes:

            ```bash
            terragrunt run --all --non-interactive apply
            ```

    1. - [ ] After applying the changes, make sure to lock providers in your `.terraform.lock.hcl` files. e.g.

            ```bash
            terragrunt run --all providers lock -platform=darwin_amd64 -platform=linux_amd64
            ```

1. - [ ] Commit your local changes and push them to the `bootstrap-repository` branch.

        ```bash
        cd ..
        git add .
        git commit -m "Bootstrap infrastructure-live-root repository final commit [skip ci]"
        git push origin bootstrap-repository
        ```

1. - [ ] Merge the open merge request. **Ensure [skip ci] is present in the commit message.**


<h2> Create a new infrastructure-live-access-control (optional, required for enterprise customers) </h2>

<h3> Create a new GitLab project </h3>

1. Navigate to the <CustomizableValue id="GITLAB_GROUP_NAME" /> group.
1. Click the **New Project** button.
1. Enter the name for the project as `infrastructure-live-access-control`.
1. Click **Create Project**.
1. Clone the project to your local machine.
1. Navigate to the project directory.
1. Create a new branch `bootstrap-repository`.

<h3> Install dependencies </h3>

Run `mise install boilerplate@0.8.1` to install the boilerplate tool.

<h3> Bootstrap the repository </h3>

<h4> Configure the variables required to run the boilerplate template </h4>

Copy the content below to a `vars.yaml` file in the root of your project and update the customizable values as needed.

```yaml title="vars.yaml"
SCMProvider: GitLab

# The GitLab group to use for the infrastructure repositories. This should include any additional sub-groups in the name
# Example: acme/prod
SCMProviderGroup: $$GITLAB_GROUP_NAME$$

# The GitLab project to use for the infrastructure-live-access-control repository.
InfraLiveAccessControlRepoName: infrastructure-live-access-control

# The name of the branch to deploy to.
# Example: main
DeployBranchName: $$DEPLOY_BRANCH_NAME$$

# The name prefix to use for creating resources e.g S3 bucket for OpenTofu state files
# Example: acme
OrgNamePrefix: $$ORG_NAME_PREFIX$$

# The default region for AWS Resources
# Example: us-east-1
DefaultRegion: $$DEFAULT_REGION$$

################################################################################
# OPTIONAL VARIABLES WITH THEIR DEFAULT VALUES. UNCOMMENT AND MODIFY IF NEEDED.
################################################################################

# The AWS partition to use.
# AWSPartition: aws
```

<h4> Generate the repository contents </h4>

1. Run the following command, from the root of your project, to generate the `infrastructure-live-access-control` repository contents:

    ```bash
    boilerplate --template-url "git@github.com:gruntwork-io/terraform-aws-architecture-catalog.git//templates/devops-foundations-infrastructure-live-access-control/?ref=4.0.1" --output-folder . --var-file vars.yaml --non-interactive
    ```

    This command adds all code required to set up your `infrastructure-live-access-control` repository. The generated files fall under the following categories:

    - GitLab Pipelines workflow file
    - Gruntwork Pipelines configuration files
    - Module defaults files for GitLab OIDC roles and policies


2. Commit your local changes and push them to the `bootstrap-repository` branch.

    ```bash
    git add .
    git commit -m "Bootstrap infrastructure-live-access-control repository [skip ci]"
    git push origin bootstrap-repository
    ```

    Skipping the CI/CD process now because there is no infrastructure to apply; repository simply contains the GitLab OIDC role module defaults to enable GitLab OIDC authentication from repositories other than `infrastructure-live-root`.

3. Create a new merge request for the `bootstrap-repository` branch. Review the changes to understand the GitLab OIDC role module defaults.
4. Merge the open merge request. **Ensure [skip ci] is present in the commit message.**

<h2> Create a new infrastructure-catalog (optional) </h2>

The `infrastructure-catalog` repository is a collection of modules that can be used to build your infrastructure. It is a great way to share modules with your team and across your organization. Learn more about the [Developer Self-Service](/2.0/docs/overview/concepts/developer-self-service) concept.

<h3> Create a new GitLab project </h3>

1. Navigate to the <CustomizableValue id="GITLAB_GROUP_NAME" /> group.
1. Click the **New Project** button.
1. Enter the name for the project as `infrastructure-catalog`.
1. Click **Create Project**.
1. Clone the project to your local machine.
1. Navigate to the project directory.
1. Create a new branch `bootstrap-repository`.

<h3> Install dependencies </h3>

Run `mise install boilerplate@0.8.1` to install the boilerplate tool.

<h3> Bootstrap the repository </h3>

<h4> Configure the variables required to run the boilerplate template </h4>

Copy the content below to a `vars.yaml` file in the root of your project and update the customizable values as needed.

```yaml title="vars.yaml"
# The name of the repository to use for the catalog.
InfraModulesRepoName: infrastructure-catalog

# The version of the Gruntwork Service Catalog to use. https://github.com/gruntwork-io/terraform-aws-service-catalog
ServiceCatalogVersion: v0.111.2

# The version of the Gruntwork VPC module to use. https://github.com/gruntwork-io/terraform-aws-vpc
VpcVersion: v0.26.22

# The default region for AWS Resources
# Example: us-east-1
DefaultRegion: $$DEFAULT_REGION$$

################################################################################
# OPTIONAL VARIABLES WITH THEIR DEFAULT VALUES. UNCOMMENT AND MODIFY IF NEEDED.
################################################################################

# The base URL of the Organization to use for the catalog.
# If you are using Gruntwork's RepoCopier tool, this should be the base URL of the repository you are copying from.
# RepoBaseUrl: github.com/gruntwork-io

# The name prefix to use for the Gruntwork RepoCopier copied repositories.
# Example: gruntwork-io-
# GWCopiedReposNamePrefix:
```

<h4> Generate the repository contents </h4>

1. Run the following command, from the root of your project, to generate the `infrastructure-catalog` repository contents:

    ```bash
    boilerplate --template-url "git@github.com:gruntwork-io/terraform-aws-architecture-catalog.git//templates/devops-foundations-infrastructure-modules/?ref=4.0.1" --output-folder . --var-file vars.yaml --non-interactive
    ```

    This command adds some code required to set up your `infrastructure-catalog` repository. The generated files are some usable modules for your infrastructure.

1. Commit your local changes and push them to the `bootstrap-repository` branch.

    ```bash
    git add .
    git commit -m "Bootstrap infrastructure-catalog repository"
    git push origin bootstrap-repository
    ```

1. Create a new merge request for the `bootstrap-repository` branch. Review the changes to understand the example Service Catalog modules.
1. Merge the open merge request.

</TabItem>
</Tabs>


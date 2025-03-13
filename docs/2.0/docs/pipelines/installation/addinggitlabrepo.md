import CustomizableValue from '/src/components/CustomizableValue';

# Adding Pipelines to a GitLab Project

This guide walks you through the process of adding Gruntwork Pipelines to a GitLab project. By the end, you'll have a fully configured GitLab CI/CD pipeline that can deploy infrastructure changes automatically.

## Prerequisites

Before you begin, make sure you have:

- Basic familiarity with Git, GitLab, and infrastructure as code concepts
- Access to one (or many) AWS account(s) where you have permission to create IAM roles and OIDC providers
- Completed the [Pipelines Auth setup for GitLab](/2.0/docs/pipelines/installation/viamachineusers#gitlab) and setup a machine user with appropriate PAT tokens
- Local access to Gruntwork's GitHub repositories, specifically [boilerplate](https://github.com/gruntwork-io/boilerplate) and the [architecture catalog](https://github.com/gruntwork-io/terraform-aws-architecture-catalog/)

## Setup Process Overview

Setting up Gruntwork Pipelines for GitLab involves these main steps:

(prerequisite) Complete the [Pipelines Auth setup for GitLab](/2.0/docs/pipelines/installation/viamachineusers#gitlab)

1. [Authorize Your GitLab Group with Gruntwork](#step-1-authorize-your-gitlab-group-with-gruntwork)
2. [Install required tools (mise, boilerplate)](#step-2-install-required-tools)
3. [Install Gruntwork Pipelines in Your Repository](#step-3-install-gruntwork-pipelines-in-your-repository)
4. [Install AWS OIDC Provider and IAM Roles for Pipelines](#step-4-install-aws-oidc-provider-and-iam-roles-for-pipelines)
5. [Complete the setup](#step-5-complete-the-setup)

## Detailed Setup Instructions

### Step 1: Authorize Your GitLab Group with Gruntwork

To use Gruntwork Pipelines with GitLab, your group needs authorization from Gruntwork:

1. Email your Gruntwork account manager or support@gruntwork.io with:
   - Your GitLab group name(s) e.g. <CustomizableValue id="GITLAB_GROUP_NAME" />
   - The GitLab instance URL (e.g., https://gitlab.com)
   - Your organization name

2. Wait for confirmation that your group has been authorized.

### Step 2: Install Required Tools

First, you'll need to install [mise](https://mise.jdx.dev/), a powerful environment manager that will help set up the required tools:

1. Install mise by following the [getting started guide](https://mise.jdx.dev/getting-started.html)

2. Activate mise in your shell:
   ```bash
   # For Bash
   echo 'eval "$(~/.local/bin/mise activate bash)"' >> ~/.bashrc

   # For Zsh
   echo 'eval "$(~/.local/bin/mise activate zsh)"' >> ~/.zshrc

   # For Fish
   echo 'mise activate fish | source' >> ~/.config/fish/config.fish
   ```

3. Install the boilerplate tool, which will generate the project structure:
   ```bash
   # For mise version BEFORE 2025.2.10
   mise plugin add boilerplate https://github.com/gruntwork-io/asdf-boilerplate.git

   # For mise version 2025.2.10+
   mise plugin add boilerplate

   mise use boilerplate@0.6.0
   ```

4. Verify the installation:
   ```bash
   boilerplate --version

   # If that doesn't work, try:
   mise x -- boilerplate --version

   # If that still doesn't work, check where boilerplate is installed:
   mise which boilerplate
   ```

### Step 3: Install Gruntwork Pipelines in Your Repository

1. Identify where you want to install Gruntwork Pipelines, for example create a new project/repository in your GitLab group (or use an existing one) named <CustomizableValue id="REPOSITORY_NAME" />

2. Clone the repository to your local machine if it's not already cloned:
   ```bash
   git clone git@gitlab.com:$$GITLAB_GROUP_NAME$$/$$REPOSITORY_NAME$$.git
   cd $$REPOSITORY_NAME$$
   ```
3. Create a new branch for your changes:
   ```bash
   git checkout -b gruntwork-pipelines
   ```

4. Download the sample vars.yaml file:
   ```bash
   curl -O https://raw.githubusercontent.com/gruntwork-io/terraform-aws-architecture-catalog/main/examples/gitlab-pipelines/vars.yaml
   ```

4. Edit the `vars.yaml` file to customize it for your environment

5. `cd` to the root of <CustomizableValue id="REPOSITORY_NAME" /> where you wish to install Gruntwork Pipelines.  Run the boilerplate tool to generate your repository structure:
   ```bash
   boilerplate --template-url "git@github.com:gruntwork-io/terraform-aws-architecture-catalog.git//templates/gitlab-pipelines-infrastructure-live-root/?ref=v2.12.9" --output-folder . --var-file vars.yaml --non-interactive
   ```

   If you encounter SSH issues, verify your SSH access to GitHub:
   ```bash
   ssh -T git@github.com
   # or try cloning manually
   git clone git@github.com:gruntwork-io/terraform-aws-architecture-catalog.git
   ```

6. Commit the changes:
   ```bash
   git add .
   git commit -m "[skip ci] Add Gruntwork Pipelines"
   git push origin gruntwork-pipelines
   ```

7. Create a merge request in GitLab and review the changes.

### Step 4: Install AWS OIDC Provider and IAM Roles for Pipelines


1. Navigate to the `_global` folder under each account in your repository and review the Terraform files that were created:
   - The GitLab OIDC identity provider in AWS
   - IAM roles for your the account (`root-pipelines-plan` and `root-pipelines-apply`)

2. Apply these configurations to create the required AWS resources:
   ```bash
   cd $ACCOUNT/_global/
   terragrunt run-all plan
   terragrunt run-all apply
   ```


### Step 5: Complete the Setup

1. Return to GitLab and merge the merge request with your changes.
2. Ensure the `PIPELINES_GITLAB_TOKEN` (and optionally, `PIPELINES_GITLAB_READ_TOKEN`) is set as a CI/CD variable to your group if you haven't already (see the [Machine Users setup guide](/2.0/docs/pipelines/installation/viamachineusers#gitlab) for details)
3. Test your setup by creating a new branch with some sample infrastructure code and creating a merge request.

## Next Steps

After setting up Pipelines, you can:

- [Deploy your first infrastructure change](/2.0/docs/pipelines/tutorials/deploying-your-first-infrastructure-change)
- [Learn how to run plan and apply operations](/2.0/docs/pipelines/guides/running-plan-apply)
- [Extend Pipelines with custom actions](/2.0/docs/pipelines/guides/extending-pipelines)

## Troubleshooting

If you encounter issues during setup:

- Ensure your GitLab CI user has the correct permissions to your group and projects
- Verify the `PIPELINES_GITLAB_TOKEN` is set correctly as a CI/CD variable and is *NOT* marked as protected
- Confirm your GitLab group has been authorized by Gruntwork for Pipelines usage

For further assistance, contact [support@gruntwork.io](mailto:support@gruntwork.io).

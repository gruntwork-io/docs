# Setting up the Gruntwork Platform
import PersistentCheckbox from '/src/components/PersistentCheckbox';

### Step 1: [Activate your Gruntwork account](/2.0/docs/overview/getting-started/create-account)

Create your Gruntwork account and invite your team members to access Gruntwork resources.

<PersistentCheckbox id="install-df-1" label="Gruntwork Account Ready" />

### Step 2: [Set up a Landing Zone](/2.0/docs/accountfactory/prerequisites/awslandingzone)

Follow Gruntwork's AWS Landing Zone walkthrough to implement a best-practice multi-account setup, ready for use with AWS Accelerator.

<PersistentCheckbox id="install-df-2" label="AWS Landing Zone Ready" />

### Step 3: [Configure Gruntwork Pipelines authentication](/2.0/docs/pipelines/installation/authoverview)

Set up authentication for Gruntwork Pipelines to enable secure automation of infrastructure changes.

<PersistentCheckbox id="install-df-3" label="Gruntwork Pipelines Auth Configured" />

### Step 4: Create new Gruntwork Pipelines repositories

- [New GitHub repository](/2.0/docs/pipelines/installation/addingnewrepo)
- [New GitLab repository](/2.0/docs/pipelines/installation/addinggitlabrepo)

Alternatively, you can add Gruntwork Pipelines to an existing repository:

- [Existing GitHub repository](/2.0/docs/pipelines/installation/addingexistingrepo)
- [Existing GitLab repository](/2.0/docs/pipelines/installation/addingexistinggitlabrepo)

<PersistentCheckbox id="install-df-4" label="Gruntwork Pipelines Repositories Ready" />

### Step 5: [Configure AWS Account Factory](/2.0/reference/accountfactory/configurations)

During the Gruntwork Pipelines setup process, configure AWS Account Factory for AWS account management.

<PersistentCheckbox id="install-df-5" label="AWS Account Factory Configured" />

### Step 6: Start using the Gruntwork Platform

You're all set! You can now:
- [Build with the AWS IaC Library](/2.0/docs/library/tutorials/deploying-your-first-gruntwork-module)
- Automatically [plan and apply IaC changes with Gruntwork Pipelines](/2.0/docs/pipelines/guides/running-plan-apply)
- [Vend new AWS accounts with AWS Account Factory](/2.0/docs/accountfactory/guides/vend-aws-account)
- [Keep your infrastructure up to date with Patcher](/2.0/docs/patcher/concepts/)

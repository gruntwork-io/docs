# Setting up DevOps Foundations & Components
import PersistentCheckbox from '/src/components/PersistentCheckbox';

### Step 1: [Activate your Gruntwork account](/2.0/docs/overview/getting-started/create-account)

Create your Gruntwork account and invite your team members to access Gruntwork resources.

<PersistentCheckbox id="install-df-1" label="Gruntwork Account Ready" />

### Step 2: [Set up a Landing Zone](/2.0/docs/pipelines/installation/prerequisites/awslandingzone)

Follow Gruntwork's AWS Landing Zone walkthrough to implement a best-practice multi-account setup, ready for use with DevOps Foundations.

<PersistentCheckbox id="install-df-2" label="AWS Landing Zone Ready" />

### Step 3: [Configure Pipelines authentication](/2.0/docs/pipelines/installation/authoverview)

Set up authentication for Pipelines to enable secure automation of infrastructure changes.

<PersistentCheckbox id="install-df-3" label="Pipelines Auth Configured" />

### Step 4: Create new Pipelines repositories

- [New GitHub repository](/2.0/docs/pipelines/installation/addingnewrepo)
- [New GitLab repository](/2.0/docs/pipelines/installation/addingnewgitlabrepo)

Alternatively, you can add Pipelines to an existing repository:

- [Existing GitHub repository](/2.0/docs/pipelines/installation/addingexistingrepo)
- [Existing GitLab repository](/2.0/docs/pipelines/installation/addinggitlabrepo)

<PersistentCheckbox id="install-df-4" label="Pipelines Repositories Ready" />

### Step 5: [Configure Account Factory](/2.0/reference/accountfactory/configurations)

During the Pipelines setup process, configure Gruntwork Account Factory for AWS account management.

<PersistentCheckbox id="install-df-5" label="Account Factory Configured" />

### Step 6: Start using DevOps Foundations

You're all set! You can now:
- [Build with the Gruntwork IaC Library](/2.0/docs/library/tutorials/deploying-your-first-gruntwork-module)
- Automatically [plan and apply IaC changes with Pipelines](/2.0/docs/pipelines/guides/running-plan-apply)
- [Vend new AWS accounts with Account Factory](/2.0/docs/accountfactory/guides/vend-aws-account)
- [Keep your infrastructure up to date with Patcher](/2.0/docs/patcher/concepts/)

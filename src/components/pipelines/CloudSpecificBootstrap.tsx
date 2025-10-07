import React from "react";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Admonition from '@theme/Admonition';
import CodeBlock from '@theme/CodeBlock';
import PersistentCheckbox from '../PersistentCheckbox';
import AwsRootHcl from '!!raw-loader!./snippets/aws-root.hcl';
import AzureRootHcl from '!!raw-loader!./snippets/azure-root.hcl';
import AzureBootstrapOutputHcl from '!!raw-loader!./snippets/azure-bootstrap-output.hcl';

interface CloudSpecificBootstrapProps {
  gitProvider: 'github' | 'gitlab';
}

// Helper functions to generate provider-specific content
const getGitProviderConfig = (provider: 'github' | 'gitlab') => {
  if (provider === 'github') {
    return {
      awsTemplateUrl: 'github.com/gruntwork-io/terragrunt-scale-catalog//templates/boilerplate/aws/github/account?ref=v1.0.0',
      azureTemplateUrl: 'github.com/gruntwork-io/terragrunt-scale-catalog//templates/boilerplate/azure/github/subscription?ref=v1.0.0',
      orgVarName: 'GitHubOrgName',
      repoVarName: 'GitHubRepoName',
      orgLabel: 'GitHub Organization',
      repoLabel: 'GitHub Repository',
      instanceUrlVar: null,
      instanceUrlLabel: null,
      issuerVar: null,
      issuerLabel: null,
    };
  } else {
    return {
      awsTemplateUrl: 'github.com/gruntwork-io/terragrunt-scale-catalog//templates/boilerplate/aws/gitlab/account?ref=v1.0.0',
      azureTemplateUrl: 'github.com/gruntwork-io/terragrunt-scale-catalog//templates/boilerplate/azure/gitlab/subscription?ref=v1.0.0',
      orgVarName: 'GitLabGroupName',
      repoVarName: 'GitLabRepoName',
      orgLabel: 'GitLab Group',
      repoLabel: 'GitLab Repository',
      instanceUrlVar: 'GitLabInstanceURL',
      instanceUrlLabel: 'GitLab Instance URL',
      issuerVar: 'Issuer',
      issuerLabel: 'Issuer URL',
    };
  }
};

export const CloudSpecificBootstrap = ({ gitProvider }: CloudSpecificBootstrapProps) => {
  const config = getGitProviderConfig(gitProvider);

  return (
    <>
<Tabs groupId="cloud-provider">
<TabItem value="aws" label="AWS" default>

<p>The resources you need provisioned in AWS to start managing resources with Pipelines are:</p>

<ol>
<li>An OpenID Connect (OIDC) provider</li>
<li>An IAM role for Pipelines to assume when running Terragrunt plan commands</li>
<li>An IAM role for Pipelines to assume when running Terragrunt apply commands</li>
</ol>

<p>For every account you want Pipelines to manage infrastructure in.</p>

<Admonition type="tip" title="Don't Panic!">

This may seem like a lot to set up, but the content you need to add to your project is minimal. The majority of the work will be pulled from a reusable catalog that you'll reference in your project.

If you want to peruse the catalog that's used in the bootstrap process, you can take a look at the <a href="https://github.com/gruntwork-io/terragrunt-scale-catalog">terragrunt-scale-catalog</a> repository.

</Admonition>

<p>The process that we'll follow to get these resources ready for Pipelines is:</p>

<ol>
<li>Use Boilerplate to scaffold bootstrap configurations in your project for each AWS account</li>
<li>Use Terragrunt to provision these resources in your AWS accounts</li>
<li>(Optionally) Bootstrap additional AWS accounts until all your AWS accounts are ready for Pipelines</li>
</ol>

<h3>Bootstrap Your Project for AWS</h3>

<p>First, confirm that you have a `root.hcl` file in the root of your project that looks something like this:</p>

<CodeBlock language="hcl" title="root.hcl">{AwsRootHcl}</CodeBlock>

<p>If you don't have a `root.hcl` file, you might need to customize the bootstrapping process, as the Terragrunt scale catalog expects a `root.hcl` file in the root of the project. Please contact [Gruntwork support](/support) for assistance if you need help.</p>

<p>For each AWS account that needs bootstrapping, we'll use Boilerplate to scaffold the necessary content. Run this command from the root of your project for each account:</p>

<CodeBlock language="bash">
boilerplate \
  --template-url '{config.awsTemplateUrl}' \
  --output-folder .
</CodeBlock>

<Admonition type="tip" title="tip">

You'll need to run this boilerplate command once for each AWS account you want to manage with Pipelines. Boilerplate will prompt you for account-specific values each time.

</Admonition>

<Admonition type="tip" title="tip">

You can reply `y` to all the prompts to include dependencies, and accept defaults unless you want to customize something.

Alternatively, you could run Boilerplate non-interactively by passing the `--non-interactive` flag. You'll need to supply the relevant values for required variables in that case.

e.g.

<CodeBlock language="bash">
{`boilerplate \\
  --template-url '${config.awsTemplateUrl}' \\
  --output-folder . \\
  --var 'AccountName=dev' \\
  --var '${config.orgVarName}=acme' \\
  --var '${config.repoVarName}=infrastructure-live' \\
  ${config.instanceUrlVar ? `--var '${config.instanceUrlVar}=https://gitlab.com' \\` : ''}
  --var 'AWSAccountID=123456789012' \\
  --var 'AWSRegion=us-east-1' \\
  --var 'StateBucketName=my-state-bucket' \\
  --non-interactive`}
</CodeBlock>

{gitProvider === 'gitlab' && (
  <>
    <p>If you're using a self-hosted GitLab instance, you'll want to make sure the issuer is set correctly when calling Boilerplate.</p>

    <CodeBlock language="bash">
      {`boilerplate \\
        --template-url '${config.awsTemplateUrl}' \\
        --output-folder . \\
        --var 'AccountName=dev' \\
        --var '${config.orgVarName}=acme' \\
        --var '${config.repoVarName}=infrastructure-live' \\
        --var '${config.instanceUrlVar}=https://gitlab.com' \\
        --var 'AWSAccountID=123456789012' \\
        --var 'AWSRegion=us-east-1' \\
        --var 'StateBucketName=my-state-bucket' \\
        --var '${config.issuerVar}=$$ISSUER_URL$$' \\
        --non-interactive`}
    </CodeBlock>
  </>
)}

You can also choose to store these values in a YAML file and pass it to Boilerplate using the `--var-file` flag.

<CodeBlock language="yaml" title="vars.yml">
{`AccountName: dev
${config.orgVarName}: acme
${config.repoVarName}: infrastructure-live
${config.instanceUrlVar ? `${config.instanceUrlVar}: https://gitlab.com` : ''}
AWSAccountID: 123456789012
AWSRegion: us-east-1
StateBucketName: my-state-bucket`}
</CodeBlock>

<CodeBlock language="bash">
{`boilerplate \\
  --template-url '${config.awsTemplateUrl}' \\
  --output-folder . \\
  --var-file vars.yml \\
  --non-interactive`}
</CodeBlock>

</Admonition>

<Admonition type="note" title="Progress Checklist">

<PersistentCheckbox id="scaffold-aws-account" label="Use Boilerplate to scaffold out your project with the necessary bootstrap configurations for each AWS account." />

</Admonition>

<h3>Provision AWS Bootstrap Resources</h3>

<p>Once you've scaffolded out the accounts you want to bootstrap, you can use Terragrunt to provision the resources in each of these accounts.</p>

<Admonition type="tip" title="tip">

<p>Make sure that you authenticate to each AWS account you are bootstrapping using AWS credentials for that account before you attempt to provision resources in it.</p>

<p>You can follow the documentation <a href="https://search.opentofu.org/provider/hashicorp/aws/latest#authentication-and-configuration">here</a> to authenticate with the AWS provider. You are advised to choose an authentication method that doesn't require any hard-coded credentials, like assuming an IAM role.</p>

</Admonition>

<p>For each account you want to bootstrap, you'll need to run the following commands:</p>

<p>First, make sure that everything is set up correctly by running a plan in the `bootstrap` directory in `name-of-account/_global` where `name-of-account` is the name of the AWS account you want to bootstrap.</p>

<CodeBlock language="bash" title="name-of-account/_global/bootstrap">
terragrunt run --all --non-interactive --provider-cache plan
</CodeBlock>

<Admonition type="tip" title="tip">

We're using the `--provider-cache` flag here to ensure that we don't re-download the AWS provider on every run by leveraging the [Terragrunt Provider Cache Server](https://terragrunt.gruntwork.io/docs/features/provider-cache-server/).

</Admonition>

Next, apply the changes to your account.

<CodeBlock language="bash" title="name-of-account/_global/bootstrap">
terragrunt run --all --non-interactive --provider-cache apply
</CodeBlock>

<Admonition type="note" title="Progress Checklist">

<PersistentCheckbox id="run-aws-plan" label="Run a plan in the bootstrap directory to make sure that everything is set up correctly." />
<PersistentCheckbox id="run-aws-apply" label="Run an apply in the bootstrap directory to provision the resources in your AWS account." />

</Admonition>

</TabItem>

<TabItem value="azure" label="Azure">

<p>The resources you need provisioned in Azure to start managing resources with Pipelines are:</p>

<ol>
  <li>
    An Azure Resource Group for OpenTofu state resources
    <ol>
      <li>
        An Azure Storage Account in that resource group for OpenTofu state storage
        <ol>
          <li>
            An Azure Storage Container in that storage account for OpenTofu state storage
          </li>
        </ol>
      </li>
    </ol>
  </li>
  <li>
    An Entra ID Application to use for plans
    <ol>
      <li>
        A Flexible Federated Identity Credential for the application to authenticate with your project on any branch
      </li>
      <li>
        A Service Principal for the application to be used in role assignments
        <ol>
          <li>
            A role assignment for the service principal to access the Azure subscription
          </li>
          <li>
            A role assignment for the service principal to access the Azure Storage Account
          </li>
        </ol>
      </li>
    </ol>
  </li>
  <li>
    An Entra ID Application to use for applies
    <ol>
      <li>
        A Federated Identity Credential for the application to authenticate with your project on the deploy branch
      </li>
      <li>
        A Service Principal for the application to be used in role assignments
        <ol>
          <li>
            A role assignment for the service principal to access the Azure subscription
          </li>
        </ol>
      </li>
    </ol>
  </li>
</ol>

<Admonition type="tip" title="tip">

This may seem like a lot to set up, but the content you need to add to your project is minimal. The majority of the work will be pulled from a reusable catalog that you'll reference in your project.

If you want to peruse the catalog that's used in the bootstrap process, you can take a look at the [terragrunt-scale-catalog](https://github.com/gruntwork-io/terragrunt-scale-catalog) repository.

</Admonition>

The process that we'll follow to get these resources ready for Pipelines is:

<ol>
<li>Use Boilerplate to scaffold bootstrap configurations in your project for each Azure subscription</li>
<li>Use Terragrunt to provision these resources in your Azure subscription</li>
<li>Finalizing Terragrunt configurations using the bootstrap resources we just provisioned</li>
<li>Pull the bootstrap resources into state, now that we have configured a remote state backend</li>
<li>(Optionally) Bootstrap additional Azure subscriptions until all your Azure subscriptions are ready for Pipelines</li>
</ol>

<h3>Bootstrap Your Project for Azure</h3>

<p>For each Azure subscription that needs bootstrapping, we'll use Boilerplate to scaffold the necessary content. Run this command from the root of your project for each subscription:</p>

<CodeBlock language="bash">
{`boilerplate \\
  --template-url '${config.azureTemplateUrl}' \\
  --output-folder .`}
</CodeBlock>

<Admonition type="tip" title="tip">

You'll need to run this boilerplate command once for each Azure subscription you want to manage with Pipelines. Boilerplate will prompt you for subscription-specific values each time.

</Admonition>

<Admonition type="tip" title="tip">

<p>You can reply `y` to all the prompts to include dependencies, and accept defaults unless you want to customize something.</p>

<p>Alternatively, you could run Boilerplate non-interactively by passing the `--non-interactive` flag. You'll need to supply the relevant values for required variables in that case.</p>

<p>e.g.</p>

<CodeBlock language="bash">
{`boilerplate \\
  --template-url '${config.azureTemplateUrl}' \\
  --output-folder . \\
  --var 'AccountName=dev' \\
  --var '${config.orgVarName}=acme' \\
  --var '${config.repoVarName}=infrastructure-live' \\
  ${config.instanceUrlVar ? `--var '${config.instanceUrlVar}=https://gitlab.com' \\` : ''}
  --var 'SubscriptionName=dev' \\
  --var 'AzureTenantID=00000000-0000-0000-0000-000000000000' \\
  --var 'AzureSubscriptionID=11111111-1111-1111-1111-111111111111' \\
  --var 'AzureLocation=East US' \\
  --var 'StateResourceGroupName=pipelines-rg' \\
  --var 'StateStorageAccountName=mysa' \\
  --var 'StateStorageContainerName=tfstate' \\
  --non-interactive`}
</CodeBlock>

<p>You can also choose to store these values in a YAML file and pass it to Boilerplate using the `--var-file` flag.</p>

<CodeBlock language="yaml" title="vars.yml">
{`AccountName: dev
${config.orgVarName}: acme
${config.repoVarName}: infrastructure-live
${config.instanceUrlVar ? `${config.instanceUrlVar}: https://gitlab.com` : ''}
SubscriptionName: dev
AzureTenantID: 00000000-0000-0000-0000-000000000000
AzureSubscriptionID: 11111111-1111-1111-1111-111111111111
AzureLocation: East US
StateResourceGroupName: pipelines-rg
StateStorageAccountName: my-storage-account
StateStorageContainerName: tfstate`}
</CodeBlock>

<CodeBlock language="bash">
{`boilerplate \\
  --template-url '${config.azureTemplateUrl}' \\
  --output-folder . \\
  --var-file vars.yml \\
  --non-interactive`}
</CodeBlock>

</Admonition>

<Admonition type="note" title="Progress Checklist">

<PersistentCheckbox id="scaffold-azure-subscription" label="Use Boilerplate to scaffold out your project with the necessary bootstrap configurations for each Azure subscription." />

</Admonition>

<h3>Provision Azure Bootstrap Resources</h3>

<p>Once you've scaffolded out the subscriptions you want to bootstrap, you can use Terragrunt to provision the resources in your Azure subscription.</p>

<p>If you haven't already, you'll want to authenticate to Azure using the `az` CLI.</p>

<CodeBlock language="bash">
az login
</CodeBlock>

<Admonition type="note" title="Progress Checklist">

<PersistentCheckbox id="authenticate-with-azure" label="Authenticate with Azure using the `az` CLI." />

</Admonition>


To dynamically configure the Azure provider with a given tenant ID and subscription ID, ensure that you are exporting the following environment variables if you haven't the values via the `az` CLI:

- `ARM_TENANT_ID`
- `ARM_SUBSCRIPTION_ID`

For example:

<CodeBlock language="bash">
export ARM_TENANT_ID="00000000-0000-0000-0000-000000000000"
export ARM_SUBSCRIPTION_ID="11111111-1111-1111-1111-111111111111"
</CodeBlock>

<Admonition type="note" title="Progress Checklist">

<PersistentCheckbox id="export-arm-tenant-id" label="Export the ARM_TENANT_ID environment variable with the tenant ID of the Azure subscription you want to provision resources in." />
<PersistentCheckbox id="export-arm-subscription-id" label="Export the ARM_SUBSCRIPTION_ID environment variable with the subscription ID of the Azure subscription you want to provision resources in." />
</Admonition>

First, make sure that everything is set up correctly by running a plan in the subscription directory.

<CodeBlock language="bash" title="name-of-subscription">
terragrunt run --all --non-interactive --provider-cache plan
</CodeBlock>

<Admonition type="tip" title="tip">

We're using the `--provider-cache` flag here to ensure that we don't re-download the Azure provider on every run to speed up the process by leveraging the [Terragrunt Provider Cache Server](https://terragrunt.gruntwork.io/docs/features/provider-cache-server/).

</Admonition>

<Admonition type="note" title="Progress Checklist">

<PersistentCheckbox id="run-azure-plan" label="Run a plan in the subscription directory to make sure that everything is set up correctly." />

</Admonition>

Next, apply the changes to your subscription.

<CodeBlock language="bash" title="name-of-subscription">
terragrunt run --all --non-interactive --provider-cache --no-stack-generate apply
</CodeBlock>

<Admonition type="tip" title="tip">

We're adding the `--no-stack-generate` flag here, as Terragrunt will already have the requisite stack configurations generated, and we don't want to accidentally overwrite any configurations while we have state stored locally before we pull them into remote state.

</Admonition>

<Admonition type="note" title="Progress Checklist">

<PersistentCheckbox id="run-azure-apply" label="Run an apply in the subscription directory to provision the resources in your Azure subscription." />
</Admonition>

<h3>Finalizing Terragrunt configurations</h3>

Once you've provisioned the resources in your Azure subscription, you can finalize the Terragrunt configurations using the bootstrap resources we just provisioned.

First, edit the `root.hcl` file in the root of your project to leverage the storage account we just provisioned.

If your `root.hcl` file doesn't already have a remote state backend configuration, you'll need to add one that looks like this:

<CodeBlock language="hcl" title="root.hcl">
{AzureRootHcl}
</CodeBlock>

<Admonition type="note" title="Progress Checklist">

<PersistentCheckbox id="add-remote-state-backend" label="Add or uncomment the section that defines the remote state backend in the `root.hcl` file." />

</Admonition>

<p>Next, finalize the `.gruntwork/environment-(name-of-subscription).hcl` file in the root of your project to reference the IDs for the applications we just provisioned.</p>

<p>You can find the values for the `plan_client_id` and `apply_client_id` by running `terragrunt stack output` in the `bootstrap` directory in `name-of-subscription/bootstrap`.</p>

<CodeBlock language="bash">
terragrunt stack output
</CodeBlock>

<p>The relevant bits that you want to extract from the stack output are the following:</p>

<CodeBlock language="hcl">
{AzureBootstrapOutputHcl}
</CodeBlock>

<p>You can use those values to set the values for `plan_client_id` and `apply_client_id` in the `.gruntwork/environment-(name-of-subscription).hcl` file.</p>

<Admonition type="note" title="Progress Checklist">

<PersistentCheckbox id="fill-in-plan-client-id" label="Fill in `plan_client_id` after bootstrapping." />
<PersistentCheckbox id="fill-in-apply-client-id" label="Fill in `apply_client_id` after bootstrapping." />

</Admonition>

<h3>Pulling the resources into state</h3>

<p>Once you've provisioned the resources in your Azure subscription, you can pull the resources into state using the storage account we just provisioned.</p>

<CodeBlock language="bash" title="name-of-subscription">
terragrunt run --all --non-interactive --provider-cache --no-stack-generate -- init -migrate-state -force-copy
</CodeBlock>

<Admonition type="tip" title="tip">

We're adding the `-force-copy` flag here to avoid any issues with OpenTofu waiting for an interactive prompt to copy up local state.

</Admonition>

<Admonition type="note" title="Progress Checklist">

<PersistentCheckbox id="run-init-migrate-state-force-copy" label="Pull the resources into state using Terragrunt." />

</Admonition>

        </TabItem>
      </Tabs>
    </>
  );
};

export default CloudSpecificBootstrap;

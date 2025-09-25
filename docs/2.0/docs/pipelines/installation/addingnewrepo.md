# Initial Setup

To configure Gruntwork Pipelines in a new GitHub repository, complete the following steps (which are explained in detail below):

1. Create an `infrastructure-live` repository.
2. Configure the Gruntwork.io GitHub App to authorize your `infrastructure-live` repository, or ensure that the appropriate machine user tokens are set up as repository or organization secrets.
3. Create `.gruntwork` HCL configurations to tell Pipelines how to authenticate in your environments.
4. Create `.github/workflows/pipelines.yml` to tell your GitHub Actions workflow how to run your pipelines.
5. Commit and push your changes to your repository.

## Creating the infrastructure-live repository

Creating an `infrastructure-live` repository is fairly straightforward. First, create a new repository using the official GitHub documentation for [creating repositories](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-new-repository). Name the repository something like `infrastructure-live` and make it private (or internal).

Clone the repository to your local machine using [Git](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository).

For example:

```bash
git clone git@github.com:acme/infrastructure-live.git
```

Once the repository is created, you'll want to create a `.mise.toml` file in the root of the repository to tell Pipelines what version of Terragrunt and OpenTofu to use.

For example:

```toml title=".mise.toml"
[tools]
terragrunt = "0.87.6"
opentofu = "1.10.6"
```

:::tip

You can get `mise` to lookup the versions available for a given tool by using the `ls-remote` command.

Follow the official [mise installation guide](https://mise.jdx.dev/getting-started.html) to install it locally.

```bash
mise ls-remote terragrunt
mise ls-remote opentofu
```

:::

## Configuring Gruntwork app settings

Use the Gruntwork.io GitHub App to [add the repository as an Infra Root repository](/2.0/docs/pipelines/installation/viagithubapp#configuration).

If using the [machine user model](/2.0/docs/pipelines/installation/viamachineusers.md), ensure the `INFRA_ROOT_WRITE_TOKEN` (and `ORG_REPO_ADMIN_TOKEN` for enterprise customers) is added to the repository as a secret or configured as an organization secret.

## Creating `.gruntwork` HCL configurations

Create [HCL configurations](/2.0/reference/pipelines/configurations-as-code/) in the `.gruntwork` directory in the root of your `infrastructure-live` repository to tell Pipelines how you plan to organize your infrastructure, and how you plan to have Pipelines authenticate with your cloud provider(s).

For example:

```hcl title=".gruntwork/repository.hcl"
repository {
  deploy_branch_name = "main"
}
```

```hcl title=".gruntwork/environment.hcl"
environment "dev" {
  filter {
    paths = ["dev/*"]
  }

  authentication {
    aws_oidc {
      account_id = "123456789012"
      plan_iam_role_arn = "arn:aws:iam::123456789012:role/pipelines-plan"
      apply_iam_role_arn = "arn:aws:iam::123456789012:role/pipelines-apply"
    }
  }
}

environment "prod" {
  filter {
    paths = ["prod/*"]
  }

  authentication {
    aws_oidc {
      account_id = "987654321098"
      plan_iam_role_arn = "arn:aws:iam::987654321098:role/pipelines-plan"
      apply_iam_role_arn = "arn:aws:iam::987654321098:role/pipelines-apply"
    }
  }
}
```

:::tip

Check out the [aws block](/2.0/reference/pipelines/configurations-as-code/#aws-blocks) for more information on how to configure Pipelines to authenticate with AWS conveniently.

:::

## Creating `.github/workflows/pipelines.yml`

Create a `.github/workflows/pipelines.yml` file in the root of your `infrastructure-live` repository with the following content:

```yaml title=".github/workflows/pipelines.yml"
name: Pipelines
run-name: "[GWP]: ${{ github.event.commits[0].message || github.event.pull_request.title || 'No commit message' }}"
on:
  push:
    branches:
      - main
    paths-ignore:
      - ".github/**"
  pull_request:
    types:
      - opened
      - synchronize
      - reopened
    paths-ignore:
      - ".github/**"

# Permissions to assume roles and create pull requests
permissions:
  id-token: write
  contents: write
  pull-requests: write

jobs:
  GruntworkPipelines:
    uses: gruntwork-io/pipelines-workflows/.github/workflows/pipelines.yml@main
```

:::tip

You can read the [Pipelines GitHub Actions Workflow](https://github.com/gruntwork-io/pipelines-workflows/blob/main/.github/workflows/pipelines.yml) to learn how this GitHub Actions workflow calls the Pipelines CLI to run your pipelines.

:::

## Commit and push your changes

Commit and push your changes to your repository.

:::note

You should include `[skip ci]` in your commit message here to prevent triggering the Pipelines workflow.

:::

```bash
git add .
git commit -m "Add Pipelines GitHub Actions workflow [skip ci]"
git push
```

🚀 You've successfully added Gruntwork Pipelines to your new repository!

## Next steps

You have successfully completed the installation of Gruntwork Pipelines in a new repository. Proceed to [Deploying your first infrastructure change](/2.0/docs/pipelines/tutorials/deploying-your-first-infrastructure-change.md) to begin deploying changes.

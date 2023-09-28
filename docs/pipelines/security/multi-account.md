# Multiple Infrastructure-Live Repos

We recommend using a single `infrastructure-live` repository for managing your organization's infrastructure.
Sometimes, this isn't possible due to team structure, security requirements, or other limitations.
In order to accommodate multiple infrastructure repositories, Gruntwork Pipelines is configurable.

## Create Additional Repos

New `infrastructure-live` repositories can be created using the same process described in the
[Hello World](../hello-world#setting-up-the-repositories) documentation.

:::info
Once the repo is created, you'll need to set up machine user access using either the existing machine user and `PIPELINES_DISPATCH` PAT token,
or one created specifically for this purpose. See [Machine Users](../using-pipelines/machine-users) for more information.
:::

No special configuration is required for the new `infrastructure-live` repository,
the Pipelines Dispatch job will identify the source repository and pass that information
to the shared `infrastructure-pipelines` repository.

## Enable Additional Repos

:::warning
Once a repo is enabled for pipelines, any code pushed to the `main` branch of that repo will be eligible to access your
AWS account using OIDC. Ensure you have the [recommended settings](../using-pipelines) for branch protection configured before adding the new
repository to the allowlist.
:::

To ensure no unauthorized access is granted to your `infrastructure-pipelines` repository,
an allowlist of `infrastructure-live` repositories exists in the `.gruntwork/config.yml` file in the `infrastructure-pipelines` repository.
To allow resources to be deployed by your new repository,
add the repository to the `repo-allow-list` section of `.gruntwork/config.yml`.

The new resource should match the name of your repository **exactly** in the format
`github-org/infrastructure-live-repo-name` with a single repository per line. See the example file below:

```txt title=infrastructure-pipelines/.gruntwork/config.yml
# The git repos that have permissions to invoke Pipelines jobs
- repo-allowlist:
  - acme/team-1-infrastructure-live
  - acme/team-2-infrastructure-live
```

:::info
The `INFRA_LIVE_ACCESS_TOKEN` available to the `infrastructure-pipelines` repository must have content read & write access to all repositories in the allowlist.
:::


<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "acf01978368545da7fc936e403648934"
}
##DOCS-SOURCER-END -->

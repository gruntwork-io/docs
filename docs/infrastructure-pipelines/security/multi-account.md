# Multiple Infrastructure-Live Repos

:::info Newer Version Available
This documentation pertains to an old version of Gruntwork Pipelines which used the `infrastructure-pipelines` repository. [Click here](../../pipelines/overview/) to view documentation for the most recent version.
:::

We recommend using a single `infrastructure-live` git repository for managing your organization's infrastructure.
Sometimes, this isn't possible due to team structure, security requirements, or other limitations.
You may choose to use multiple `infrastructure-live` repos to:

1. Facilitate more granular access controls
1. Separate concerns that do not require shared configuration
1. Ease the burden of high traffic repos (reducing the likelihood of feature branches becoming out-of-date relative to `main`)

Note that when using multiple repositories, it is more difficult to share a infrastructure configuration across environments,
so think carefully about your specific use case before making the decision.


## Create Additional Repos

New `infrastructure-live` repositories can be created using the same process described in the
[Hello World](../hello-world#setting-up-the-repositories) documentation.

:::info
Once the repository is created, you'll need to set up machine user access using either the existing machine user and `PIPELINES_DISPATCH` PAT token,
or one created specifically for this purpose. See [Machine Users](machine-users) for more information.
:::

No special configuration is required for the new `infrastructure-live` repository,
the Pipelines Dispatch job will identify the source repository and pass that information
to the shared `infrastructure-pipelines` repository.

## Enable Additional Repos

:::warning
Once a repository is enabled for pipelines, any code pushed to the `main` branch of that repository will be eligible to access your
AWS account using OIDC. Ensure you have the [recommended settings](branch-protection) for branch protection configured before adding the new
repository to the allowlist.
:::

To ensure no unauthorized access is granted to your `infrastructure-pipelines` repository,
an allowlist of `infrastructure-live` repositories exists in the `.gruntwork/config.yml` file in the `infrastructure-pipelines` repository.
To allow resources to be deployed by your new repository,
add the repository to the `repo-allow-list` section of `.gruntwork/config.yml`.

The new resource should match the name of your repository **exactly** in the format
`github-org/infrastructure-live-repo-name` with a single repository per line. See the example file below:

```yml title=infrastructure-pipelines/.gruntwork/config.yml
# The git repos that have permissions to invoke Pipelines jobs
repo-allow-list:
  - acme/team-1-infrastructure-live
  - acme/team-2-infrastructure-live
```

:::info
The `INFRA_LIVE_ACCESS_TOKEN` available to the `infrastructure-pipelines` repository must have content read & write access to all repositories in the allowlist.
:::


<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "d492c3f3f068ced6c6c9af871eb11719"
}
##DOCS-SOURCER-END -->

# Multiple Infrastructure Repos

We recommend using a single `infrastructure-live` repository for managing your organization's infrastructure.
Sometimes, this isn't possible due to team structure, security requirements, or other limitations.
In order to accommodate multiple infrastructure repositories, Gruntwork Pipelines is configurable.

## Create Additional Repos

New `infrrastructure-live` repositories can be created using the same process described in the
[Hello World](../hello-world#setting-up-the-repositories) documentation.

:::info
Once the repo is created, you'll need to set up machine user access using either the existing machine user and `PIPELINES_DISPATCH` PAT token,
or one created specifically for this purpose. See [Machine Users](../using-pipelines/machine-users) for more information.
:::

No special configuration is required for the new `infrastructure-live` repository,
the Pipelines Dispatch job will identify the source repository and pass that information
to the shared `infrastructure-pipelines` repository.

## Enable Additional Repos

To ensure no unauthorized access is granted to your `infrastructure-pipelines` repository,
an allowlist of `infrastructure-live` repositories exists at the root directory.
To allow resources to be deployed by your new repository,
add the repository to `repo-allowlist.txt` on a new line.

The new resource should match the name of your repository **exactly** in the format
`github-org/infrastructure-live-repo-name` with a single repository per line. See the example file below:

```txt title=infrastructure-pipelines/repo-allowlist.txt
acme/team-1-infrastructure-live
acme/team-2-infrastructure-live
```

:::info
The `INFRA_LIVE_ACCESS_TOKEN` available to the `infrastructure-pipelines` repository must have content read & write access to all repositories in the allowlist.
:::


<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "fabe61448cd4431369f8c1c508dae64b"
}
##DOCS-SOURCER-END -->

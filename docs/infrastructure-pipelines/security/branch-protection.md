# Branch Protection

:::info Newer Version Available
This documentation pertains to an old version of Gruntwork Pipelines which used the `infrastructure-pipelines` repository. [Click here](../../pipelines/overview/) to view documentation for the most recent version.
:::

Gruntwork Pipelines is designed to be used with a PR based workflow.
This means an approval on a PR is an approval to deploy infrastructure, making the configuration of repo settings and branch protection especially important.

## Recommended Settings

By default, Gruntwork pipelines runs a plan on every push to a PR and an apply on every push to `main`.
Branch protection should be enabled on `main` to prevent changes from being applied without approval.

- **Require a pull request before merging** should be enabled.
- **Require approvals** should be enabled. Optionally, more than one approval could be required.
- **Require review from Code Owners** should be enabled if you need control over which users are required to review specific code areas. See the [GitHub Documentation](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners) for more information.
- **Require status checks to pass before merging** should be enabled.
  :::info
    This prevents `apply` from running when `plan` fails and ensures any validation rules your organization has put in place have been run.
  :::
- **Require branches to be up to date before merging** should be enabled with the `Pipelines` workflow selected as required.
  :::info
    This option prevents `apply` from running with an inaccurate `plan`, but has a tradeoff of increased GitHub Actions minute usage.
    When the PR is not up to date you will see the following message:
    ![Recommended Branch Protection Settings](/img/pipelines/pr-sync.png)
    With this option disabled, another PR could be merged into `main` after this PR has run `plan`. No new plan would be run
    in that scenario, so the `apply` has a higher likelihood of failure. If this risk is acceptable to your organization you may
    choose to ignore this recommendation.
  :::

The following is an example of the recommended settings for branch protection:
![Recommended Branch Protection Settings](/img/pipelines/repo-settings.png)

:::info
  You may wish to enable **Do not allow bypassing the above settings** to prevent admins from bypassing the branch
  protection rules. This will limit your options for applying emergency fixes, but is more secure.
:::

## PR Workflow

1. Developers make infrastructure changes on a branch and create a PR against `main`
1. On PR creation, Gruntwork Pipelines runs `plan` on any changes and posts the results as a comment
1. Gruntwork Pipelines re-runs `plan` on every push to the branch and posts results as a comment
1. Approvals are gathered. If codeowners is enabled, the owner of each changed folder/file must approve the PR before it can be merged
1. Once approved, the PR is merged into `main`
1. Gruntwork Pipelines runs `apply` on any changes from the PR
   - On Success, a comment is placed on the PR indicating success
   - On Failure, a new GitHub issue is created describing the failure. A new PR must be created to resolve any failures.


<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "79327c7c5cfee06581006fc3bbb85805"
}
##DOCS-SOURCER-END -->

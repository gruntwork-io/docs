# Allowing Pipelines Actions in GitHub Actions

:::info Newer Version Available
This documentation pertains to an old version of Gruntwork Pipelines which used the `infrastructure-pipelines` repository. [Click here](../../pipelines/overview/) to view documentation for the most recent version.
:::

Gruntwork Pipelines uses a set of Gruntwork-built reusable Github Actions, which are available in the GitHub Marketplace. Gruntwork is a Verified Creator of GitHub Actions.

### GitHub Enterprise

Gruntwork recommends explicitly allowing Actions required by Gruntwork Pipelines to run in your GitHub organization. See [Allowing select actions and reusable workflows to run](https://docs.github.com/en/enterprise-cloud@latest/admin/policies/enforcing-policies-for-your-enterprise/enforcing-policies-for-github-actions-in-your-enterprise#allowing-select-actions-and-reusable-workflows-to-run) to learn more.

You will need to allow the following GitHub Actions for Gruntwork Pipelines to run successfully:
- [gruntwork-io/pipelines-dispatch](https://github.com/gruntwork-io/pipelines-dispatch)
- [gruntwork-io/pipelines-orchestrate](https://github.com/gruntwork-io/pipelines-orchestrate)
- [gruntwork-io/pipelines-execute](https://github.com/gruntwork-io/pipelines-execute)
- [gruntwork-io/terragrunt-action](https://github.com/gruntwork-io/terragrunt-action)
- [aws-actions/configure-aws-credentials](https://github.com/aws-actions/configure-aws-credentials)
- [Codex-/return-dispatch](https://github.com/Codex-/return-dispatch)
- [Codex-/await-remote-run](https://github.com/Codex-/await-remote-run)
- [dsaltares/fetch-gh-release-asset](https://github.com/dsaltares/fetch-gh-release-asset)
- [peter-evans/create-pull-request](https://github.com/peter-evans/create-pull-request)

Gruntwork recommends using a tagged version of the `gruntwork-io` actions and a wildcard for the non-Gruntwork actions, as the non-Gruntwork actions are wrapped in the Gruntwork actions. This will require less administrative work to keep policies up to date with versions being used by Gruntwork actions. An example policy can be found below.

```txt
gruntwork-io/pipelines-dispatch@<newest release>,
gruntwork-io/pipelines-orchestrate@<newest release>,
gruntwork-io/pipelines-execute@<newest release>,
gruntwork-io/terragrunt-action@<newest release>,
aws-actions/configure-aws-credentials@*,
Codex-/return-dispatch@*,
Codex-/await-remote-run@*,
dsaltares/fetch-gh-release-asset@*,
peter-evans/create-pull-request@*
```

Navigate to each Gruntwork repository to retrieve the latest tagged release for each action.

### GitHub Team and Pro

Currently GitHub Actions does not support selecting specific repos outside of your own GitHub organization for the team and pro tier. To use Gruntwork Pipelines you must select the **Allow all actions and reusable workflows** option in the Actions general settings at the Organization level.



<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "3aabe632e15cbdf89976e5fc6fd4a30a"
}
##DOCS-SOURCER-END -->

# Updating Your Pipeline

Staying up to date with the latest in Gruntwork Pipelines is fairly simple. We release new versions of the Pipelines CLI, the associated GitHub Actions Workflows and the underlying custom GitHub Actions regularly to provide the optimal experience for managing infrastructure changes at scale.

To pull in the latest changes across all three of these dimensions, you can simply edit the `pipelines.yml` file found under `.github/workflows` in any repository integrated with Gruntwork Pipelines in order to select the latest version of the Pipelines GitHub Actions Workflow:

```yml
jobs:
  GruntworkPipelines:
    uses: gruntwork-io-team/pipelines-workflows/.github/workflows/pipelines-root.yml@v0.0.5
```

Due to our integration with [Dependabot](https://docs.github.com/en/code-security/getting-started/dependabot-quickstart-guide), you can also automatically receive pull requests that suggest updates to the `pipelines.yml` file in your repository by leveraging a `.github/dependabot.yml` file. This will help you stay up to date with the latest changes in Gruntwork Pipelines. DevOps Foundations customers receive this configuration as part of their `infrastructure-live` repositories by default.

## Updating Customized Workflows

Note that if you follow the instructions under [Extending Pipelines](./extending-pipelines.md), you may have incurred greater burden in maintaining updates to your customized workflows. If you decide to fork the [pipelines-workflows](https://github.com/gruntwork-io/pipelines-workflows) repository to customize your workflows, you will need to manually update your workflows to include the latest changes from the upstream repository. This can be done by following the instructions in the [GitHub documentation](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/syncing-a-fork), as long as you have not made changes that conflict with the upstream repository.

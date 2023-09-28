# GitHub Enterprise

Gruntwork Pipelines includes a set of re-usable GitHub Actions built by Gruntwork. Companies using GitHub Enterprise may need to explicitly allow GitHub Actions from Gruntwork to run in their GitHub organization. See the "Allow specified actions and reusable workflows" section in [Allowing select actions and reusable workflows to run](https://docs.github.com/en/enterprise-cloud@latest/admin/policies/enforcing-policies-for-your-enterprise/enforcing-policies-for-github-actions-in-your-enterprise#allowing-select-actions-and-reusable-workflows-to-run) to learn more.

You will need to allow the following Actions to run:
- [pipelines-dispatch](https://github.com/gruntwork-io/pipelines-dispatch)
- [pipelines-orchestrate](https://github.com/gruntwork-io/pipelines-orchestrate)
- [pipelines-execute](https://github.com/gruntwork-io/pipelines-execute)

Navigate to each repository to retrieve the latest tagged release for each action.

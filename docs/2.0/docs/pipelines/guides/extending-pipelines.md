# Extending Your Pipeline

Gruntwork Pipelines is designed to be extensible, enabling users to tailor GitHub Actions workflows and underlying custom actions to align with their organization’s unique requirements. This guide explains how to extend your pipeline.

## Pipelines extension architecture

Extending Gruntwork Pipelines requires managing code across three distinct repositories. This architecture segregates customer-specific modifications from Gruntwork-maintained code, minimizing conflicts and simplifying updates. The repositories are as follows:

- **`pipelines-workflows`**: Handles the central orchestration of control flow within pipelines. It contains minimal business logic and primarily calls other repositories to perform tasks.
- **`pipelines-actions`**: Hosts most of the business logic for pipelines.
- **`pipelines-actions-customization`**: Serves as the primary repository for customer-specific custom logic.

This structure ensures that customers rarely need to modify Gruntwork-managed repositories, such as `pipelines-actions`. Instead, customizations typically involve modifying code references in `pipelines-workflows` to point to customized repositories. This approach minimizes the likelihood of merge conflicts or maintenance issues.

## Extend the GitHub Actions workflow

The Pipelines workflow is implemented as a [Reusable Workflow](https://docs.github.com/en/actions/using-workflows/reusing-workflows). This allows you to reference a specific pinned version in your `.github/workflows/pipelines.yml` file without hosting the workflow code yourself.

To extend this workflow for custom organizational logic, you can either [fork](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/fork-a-repo) or [mirror](https://docs.github.com/en/repositories/creating-and-managing-repositories/duplicating-a-repository) the repository. Common reasons for extending the workflow include:

- Adding organization-specific steps to the workflow.
- Utilizing customized versions of existing actions in the workflow.

:::caution
If you fork Gruntwork's `pipelines-workflows` repository, Gruntwork may have visibility into the forked repository. For privacy concerns, consider mirroring the repository instead. For assistance, contact [support@gruntwork.io](mailto:support@gruntwork.io).

Avoid including sensitive information in forked repositories, especially if they are public.
:::

## How to extend the Pipelines workflow

Once you've created your version of `pipelines-workflows`, you are free to modify the code. However, if you intend to track upstream changes, follow best practices to simplify updates. Gruntwork designed `pipelines-workflows` with minimal required changes, allowing for seamless upstream merges.

The recommended approach is to extend `pipelines-workflows` by injecting [custom actions](#adding-custom-actions) at predefined entry points. This minimizes changes to Gruntwork-maintained files and establishes clear data contracts between workflows and custom actions, simplifying future updates.

### Adding custom actions

#### Procedure

This step-by-step guide outlines best practices for implementing custom actions:

**Creating the custom action:**
1. Create a new repository, `pipelines-actions-customizations`.
2. Add a folder named `.github/actions/` to the repository.
3. Identify the appropriate workflow location for customization (use [examples](https://github.com/gruntwork-io/pipelines-actions/tree/main/.github/custom-actions) and [custom-action hook locations](https://github.com/gruntwork-io/pipelines-workflows/blob/main/.github/workflows/pipelines-root.yml) as references).
4. For default hook points, copy the corresponding stub `action.yml` file from the `pipelines-actions` repository to `.github/actions/$HOOK_NAME/action.yml`.
   - For non-standard hooks, review an existing action.yml file for guidance, especially for input definitions.
5. Modify `action.yml` to define your custom logic.

**Adding the custom action to your workflow:**
1. Fork or mirror the `pipelines-workflows` repository.
2. Locate the workflow section where the custom action should run.
3. Add a step to check out your custom actions repository.

    ```yml
    - name: Checkout ACME's Custom Pipelines Actions
        uses: actions/checkout@v4
        with:
            path: pipelines-actions-customizations
            repository: acme-org/pipelines-actions-customizations
            # We recommend pinning this to a specific commit, branch or tag instead of main
            ref: main
    ```
2. Call your custom action. Ensure you carefully manage the inputs passed to your custom action. Most custom actions require access to tokens (e.g., `PIPELINES_READ_TOKEN`) and the `gruntwork_context` object. This context object contains all relevant [outputs](https://github.com/gruntwork-io/pipelines-actions/blob/main/.github/actions/pipelines-bootstrap/action.yml#L43) from the `pipelines-bootstrap` action, providing valuable metadata about the current workflow execution.

    ```yml
    - name: "[Baseline]: Pre Provision New Account Custom Action"
        uses: ./pipelines-actions-customizations/.github/actions/pre-provision-new-account
        if: ${{ steps.gruntwork_context.outputs.action == 'PROVISION_ACCOUNT' }}
        with:
            PIPELINES_READ_TOKEN: ${{ secrets.PIPELINES_READ_TOKEN }}
            INFRA_ROOT_WRITE_TOKEN: ${{ secrets.INFRA_ROOT_WRITE_TOKEN }}
            gruntwork_context: ${{ toJson(steps.gruntwork_context.outputs) }}
    ```

#### Background / Explanation
The `pipelines-root.yml` file includes several sample custom actions by default. Below is an example of the pre-provision new account custom hook:

```yml
  - name: Checkout Pipelines Actions
    uses: actions/checkout@v4
    with:
        path: pipelines-actions
        repository: gruntwork-io/pipelines-actions
        ref: ${{ env.PIPELINES_ACTIONS_VERSION }}
        token: ${{ secrets.PIPELINES_READ_TOKEN }}

  - name: "[Baseline]: Pre Provision New Account Custom Action"
    uses: ./pipelines-actions/.github/custom-actions/pre-provision-new-account
    if: ${{ steps.gruntwork_context.outputs.action == 'PROVISION_ACCOUNT' }}
    with:
        PIPELINES_READ_TOKEN: ${{ secrets.PIPELINES_READ_TOKEN }}
        INFRA_ROOT_WRITE_TOKEN: ${{ secrets.INFRA_ROOT_WRITE_TOKEN }}
        gruntwork_context: ${{ toJson(steps.gruntwork_context.outputs) }}
```

There are two key components to the hook: 

1. **Checking out actions**: Since Pipelines is invoked as a [reusable workflow](https://docs.github.com/en/actions/using-workflows/reusing-workflows#calling-a-reusable-workflow), it does not have inherent access to any other code, even within its own repository. To use external code, it must be explicitly included either by checking out the necessary repository or referencing a repository accessible to the workflow.

2. **Running the custom action**: Custom actions must be stored in a repository you control. In the provided examples, custom-action stubs are stored in the same repository as the Pipelines actions. For your implementation, ensure your custom actions are stored in your repository, and bring them into the workflow by checking out the code or referencing the repository directly.

For example:

```yml
  - name: Checkout Pipelines Actions
    uses: actions/checkout@v4
    with:
        path: pipelines-actions
        repository: gruntwork-io/pipelines-actions
        ref: ${{ env.PIPELINES_ACTIONS_VERSION }}
        token: ${{ secrets.PIPELINES_READ_TOKEN }}

  - name: Checkout ACME's Custom Pipelines Actions
    uses: actions/checkout@v4
    with:
        path: pipelines-actions-customizations
        repository: acme-org/pipelines-actions-customizations
        # We recommend pinning this to a specific commit, branch or tag instead of main
        ref: main

  - name: "[Baseline]: Pre Provision New Account Custom Action"
    uses: ./pipelines-actions-customizations/.github/actions/pre-provision-new-account
    if: ${{ steps.gruntwork_context.outputs.action == 'PROVISION_ACCOUNT' }}
    with:
        PIPELINES_READ_TOKEN: ${{ secrets.PIPELINES_READ_TOKEN }}
        INFRA_ROOT_WRITE_TOKEN: ${{ secrets.INFRA_ROOT_WRITE_TOKEN }}
        gruntwork_context: ${{ toJson(steps.gruntwork_context.outputs) }}
```

### Support for extending workflows

At Gruntwork, we are committed to addressing real-world business needs with our documentation. If you require assistance in extending the Pipelines Workflow and are not comfortable following the steps outlined above, please reach out to us at [support@gruntwork.io](mailto:support@gruntwork.io).

## Extending GitHub Actions

Beyond extending the top-level workflow, you can also modify the underlying custom GitHub Actions that the workflow employs. This approach allows for precise customization of the behavior of individual Actions to meet your organization's specific requirements.

:::note
To customize the behavior of an Action, you must fork the repository that contains the Action. This repository may house another GitHub Action or a Workflow.
:::

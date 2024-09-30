# Extending Your Pipeline

Gruntwork Pipelines is designed to be extensible. This means that you can add your own customizations to the GitHub Actions Workflows, and the underlying custom GitHub Actions to suit your organization's needs. This document will guide you through the process of extending your pipeline.


## Pipelines Extension Architecture

Extending Gruntwork Pipelines involves managing code in three different source code repositories. We've architected these repositories in such a way that customer modifications live in a different repository from code that Gruntwork maintains, therefore dramatically limiting, or even eliminating, the work required to incorporate upstream changes from Gruntwork.  The three repositories are:

* `pipelines-workflows` - This is the central orchestration of the control flow within pipelines. This repo contains as little business logic as possible and generally makes calls to other repositories to do work.
* `pipelines-actions` - This is where the bulk of the business logic for pipelines lives
* `pipelines-actions-customization` - This is where a customer's custom logic primarily lives.

The intention is that customers will never have to touch code that is frequently modified by Gruntwork, namely `pipelines-actions`.  Instead customers will update code references inside `pipelines-workflows` to point to custom code in another repository, so the only surface area for merge conflict/code maintaince is a scant few lines of reference change in `pipelines-workflows`.

<img alt="Diagram of Gruntwork Pipelines Repositories" className="img_node_modules-@docusaurus-theme-classic-lib-theme-MDXComponents-Img-styles-module medium-zoom-image" src="/img/pipelines/pipelines_customization_code_locations.svg" />

## Extend the GitHub Actions Workflow

The GitHub Actions Workflow that Pipelines uses is a [Reusable Workflow](https://docs.github.com/en/actions/using-workflows/reusing-workflows). This allows your `infrastructure-live` repositories to reference a specific pinned version of it in your `.github/workflows/pipelines.yml` file without having to host any of the code yourself.

If you would like to extend this workflow to introduce custom logic that is specific to your organization, you can [fork the repository](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/fork-a-repo) or [mirror the repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/duplicating-a-repository).

Common reasons that you might decide to do this include:

- You wish to add additional steps to the workflow that are specific to your organization.
- You wish to utilize a forked action used in existing step(s) in the workflow to suit your organization's needs (more on that below).

:::caution
If you choose to fork Gruntwork's `pipelines-workflows` into your GitHub organization note that Gruntwork will have visibility to that repository ([docs](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/about-permissions-and-visibility-of-forks#about-permissions-for-creating-forks)). If you have concerns about this you can instead [mirror](https://docs.github.com/en/repositories/creating-and-managing-repositories/duplicating-a-repository) the repository. Reach out to [support@gruntwork.io](mailto:support@gruntwork.io) if you need assistance with this.

Do not include any sensitive information in your forked repository, especially if hosted publicly.
:::

## How to Extend the Pipelines Workflow

Once you have created your own version of `pipelines-workflows` you are free to change the code as you wish. One key concern, however, is whether you intend to continue to track upstream changes and incorporate any upstream bugfixes/new features into your workflow. We have endeavored to design `pipelines-workflows` in such a way that Gruntwork should seldom be making changes to those files, and to provide a mechanism for customers to extend `pipelines-workflows` in a way that touches very few lines of Gruntwork maintained code. The goal being to allow you to make customizations, and also merge in upstream changes with very few or no merge conflicts.

Our recommended best practice for customizing `pipelines-workflows` is to do so by injecting [customized actions](#adding-custom-actions) at various points in the workflow. We have already included a handful of entrypoints and sample custom-actions to demonstrate this practice. By using custom actions you minimize the actual lines of code changed in the workflow, and also create a clean data-contract between the workflow and your custom action, making it easier to refactor (if necessary) for future `pipelines-workflow` updates. Again, Gruntwork endeavors to do the bulk of its work on Pipelines within `pipelines-actions` which should mean very few updates will be required.

### Adding Custom Actions

#### Procedure

There are many ways to actually implement custom actions in your workflow, this procedure is a step by step guide to the method that Gruntwork recommends as best practice.

**Creating the custom action:**
1. Create a new repository `pipelines-actions-customizations`
1. Create a new folder in that repository, `.github/actions/`
1. Identify where in the workflow you want to customize (we provide a set of [example](https://github.com/gruntwork-io/pipelines-actions/tree/main/.github/custom-actions) actions and [custom-action hook locations](https://github.com/gruntwork-io/pipelines-workflows/blob/main/.github/workflows/pipelines-root.yml) for reference).
1. If you're using one of our default hook points, copy the stub example hook `action.yml` file from the `pipelines-actions` [repository](https://github.com/gruntwork-io/pipelines-actions/tree/main/.github/custom-actions) and place it into `.github/actions/$HOOK_NAME/action.yml`.
    1. If you're not using a sample hook it may still be helpful to copy an existing one for reference, particularly around the inputs that the custom actions accept.
1. At this point you can customize `action.yml` to execute your desired logic

**Adding the custom action to your workflow:**
1. Create a fork or mirror of the `pipelines-workflows` [repository](https://github.com/gruntwork-io/pipelines-workflows).
1. Identify where you want to run your custom action
1. Add a step to checkout your custom action repository
    ```yml
    - name: Checkout ACME's Custom Pipelines Actions
        uses: actions/checkout@v4
        with:
            path: pipelines-actions-customizations
            repository: acme-org/pipelines-actions-customizations
            # We recommend pinning this to a specific commit, branch or tag instead of main
            ref: main
    ```
1. Call your custom action. Make sure you pay attention to what inputs you are passing to your custom action.  Most custom actions will need access to tokens (e.g. `PIPELINES_READ_TOKEN`) as well as the `gruntwork_context` object. The context object contains all of the [outputs](https://github.com/gruntwork-io/pipelines-actions/blob/main/.github/actions/pipelines-bootstrap/action.yml#L43) from the `pipelines-bootstrap` action which includes useful metadata about the current workflow execution.
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
Out of the box the `pipelines-root.yml` file comes with several sample custom actions. Here is an example of the pre-provision new account custom hook:

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

There are two key components to the hook, 1) Checking out actions and 2) Running the custom action.  As Pipelines is called as a [reusable workflow](https://docs.github.com/en/actions/using-workflows/reusing-workflows#calling-a-reusable-workflow) it does not have access to any other code by default, even in its own repository. This means that any external code has to be explicitly brought in, either via a checkout or via a repository reference your code has access to. In our examples we store the custom-action stub examples in the same repository as the actual pipelines actions. You will need to store your custom actions in your own repository and either checkout that code or make it available to be called directly from this workflow.  For example:

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

### Support for extending Workflows

We, at Gruntwork, want to make sure we're addressing real business use-cases with our documentation, so if you have a need to extend the Pipelines Workflow and are not comfortable with doing so following the documentation above, please reach out to us at [support@gruntwork.io](mailto:support@gruntwork.io).


## Extending the GitHub Actions

In addition to extending the top-level workflow, you can also extend the underlying custom GitHub Actions that the workflow uses. This allows you to customize the behavior of individual Actions to suit your organization's needs.

:::note
In order to customize the behavior of an Action, you will need to fork the repository that contains the Action, which might be another GitHub Action, or a Workflow.
:::


<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "4f00edc5308693e07f576d4d2a3d408d"
}
##DOCS-SOURCER-END -->

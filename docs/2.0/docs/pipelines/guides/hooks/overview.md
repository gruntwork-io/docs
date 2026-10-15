# Hooks

:::info

Hooks are an Enterprise-only feature.

:::

Hooks are how you extend a Pipelines run with your own tooling. If you have used Terragrunt's before and after hooks, the model will feel familiar: you declare a hook and Pipelines runs your command at a defined point in the run.

This unblocks the kinds of integrations teams reach for most when running infrastructure changes at scale, such as cost estimation, security scanning, policy enforcement, auditing, and notifications.

Hooks are configured in your Pipelines HCL configuration. Each hook declares the commands it applies to, `plan` and/or `apply`, and the command to execute. Pipelines supports two types of hooks:

1. [After hooks](/2.0/docs/pipelines/guides/hooks/hook-types#after-hooks) run after a `plan` or `apply`.
2. [Error hooks](/2.0/docs/pipelines/guides/hooks/hook-types#error-hooks) run when a `plan` or `apply` fails with an error matching a pattern you set.

Pipelines passes each hook context about the run through environment variables (for example the actor, repository, and action). Hooks also receive the run's OpenTofu/Terraform plan. In turn, a hook can write outputs that Pipelines reflects back in the pull/merge request comment, so its results show up alongside the plan or apply summary. See [Hooks API](/2.0/reference/pipelines/hooks-api) for the full contract.

:::note

Hooks are under active development, and new capabilities will continue to roll out over time. Expect this documentation to expand alongside them.

:::

## In this section

- [Setup & Prerequisites](/2.0/docs/pipelines/guides/hooks/setup) - what you need before configuring a hook.
- [Hook Types](/2.0/docs/pipelines/guides/hooks/hook-types) - how to declare each type of hook.
- [How Hooks Execute](/2.0/docs/pipelines/guides/hooks/execution) - when and how Pipelines runs hooks.
- [Gruntwork Provided Hooks](/2.0/docs/pipelines/guides/hooks/gruntwork-provided) - hooks Gruntwork maintains, ready to use without writing one.
- [Hooks API](/2.0/reference/pipelines/hooks-api) - the environment variables and files exchanged with a hook.
- [Writing a Hook](/2.0/docs/pipelines/guides/hooks/writing-a-hook) - a step-by-step guide to authoring your own hook.
- [Authentication & Secrets](/2.0/docs/pipelines/guides/hooks/authentication) - giving a hook cloud credentials and secrets when it runs.
- [Slack Deploy Notification](/2.0/docs/pipelines/tutorials/slack-deploy-notification) - a worked example.

## Related documentation

- [`after_hook` block reference](/2.0/reference/pipelines/configurations-as-code/api#after_hook-block) - the full list of configurable fields.
- [`error_hook` block reference](/2.0/reference/pipelines/configurations-as-code/api#error_hook-block) - the full list of configurable fields.

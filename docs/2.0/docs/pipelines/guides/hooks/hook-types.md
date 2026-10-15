# Hook Types

Hooks are configured in your Pipelines HCL configuration, as blocks nested inside the [`repository`](/2.0/reference/pipelines/configurations-as-code/api#repository-block) block. This page covers the fields each type of hook accepts. See [How Hooks Execute](/2.0/docs/pipelines/guides/hooks/execution) for when and how Pipelines runs them.

## After hooks

After hooks run after Pipelines completes a `plan` or `apply`. They are configured with [`after_hook`](/2.0/reference/pipelines/configurations-as-code/api#after_hook-block) blocks. Each block declares which `commands` it runs after and the command to `execute`. You can define multiple after hooks, and they run in the order they are defined.

```hcl
repository {
  after_hook "success" {
    commands = ["plan"]
    execute  = [".gruntwork/hooks/success.sh"]
  }
}
```

### Required fields

- **`commands`**: the Pipelines commands this hook runs after. One or both of `plan` and `apply`.
- **`execute`**: the command to run, given as a list of the program followed by its arguments.

The block label (`success` in the example above) is also required and must be unique within the `repository` block.

### Optional fields

- **`name`**: a human-readable display name for the hook.
- **`source`**: a URL to fetch before the hook runs, so `execute` can run scripts that live outside the repository. See [Remote script sources](/2.0/docs/pipelines/guides/hooks/execution#remote-script-sources). Hooks Gruntwork provides do not need a `source`; see [Gruntwork Provided Hooks](/2.0/docs/pipelines/guides/hooks/gruntwork-provided).
- **`env`**: environment variables to set for the `execute` command.
- **`run_on_error`**: whether the hook runs when a preceding command or hook failed. Defaults to `false`.
- **`timeout_seconds`**: how long the hook may run before it is terminated. Defaults to `300`.
- **`authentication`**: cloud credentials and secrets for the hook. See [Authentication & Secrets](/2.0/docs/pipelines/guides/hooks/authentication).
- **`filter`**: scopes the hook to a subset of the run's affected units by path, environment, and/or label. See [Scoping a hook to specific units](/2.0/docs/pipelines/guides/hooks/execution#scoping-a-hook-to-specific-units).

See the [`after_hook` block attributes](/2.0/reference/pipelines/configurations-as-code/api#after_hook-block-attributes) reference for full details.

## Error hooks

Error hooks run when a `plan` or `apply` fails with an error that matches one of their patterns. They are configured with [`error_hook`](/2.0/reference/pipelines/configurations-as-code/api#error_hook-block) blocks. Each block declares which `commands` it handles failures of, the error patterns to match in `on_errors`, and the command to `execute`. You can define multiple error hooks, and they run in the order they are defined.

```hcl
repository {
  error_hook "failed" {
    commands  = ["plan", "apply"]
    on_errors = ["Error"]
    execute   = [".gruntwork/hooks/failed.sh"]
  }
}
```

### Required fields

- **`commands`**: the Pipelines commands whose failures this hook handles. One or both of `plan` and `apply`.
- **`on_errors`**: a list of regular expressions matched against the output of the failed command. See [Matching errors](/2.0/docs/pipelines/guides/hooks/execution#matching-errors).
- **`execute`**: the command to run, given as a list of the program followed by its arguments.

The block label (`failed` in the example above) is also required and must be unique among the `error_hook` blocks in the `repository` block.

### Optional fields

- **`name`**: a human-readable display name for the hook.
- **`source`**: a URL to fetch before the hook runs, so `execute` can run scripts that live outside the repository. See [Remote script sources](/2.0/docs/pipelines/guides/hooks/execution#remote-script-sources).
- **`env`**: environment variables to set for the `execute` command.
- **`timeout_seconds`**: how long the hook may run before it is terminated. Defaults to `300`.
- **`authentication`**: cloud credentials and secrets for the hook. See [Authentication & Secrets](/2.0/docs/pipelines/guides/hooks/authentication).
- **`filter`**: scopes the hook to failures in a subset of the run's affected units by path, environment, and/or label. See [Scoping a hook to specific units](/2.0/docs/pipelines/guides/hooks/execution#scoping-a-hook-to-specific-units).

Error hooks have no `run_on_error` field, because running on error is a non-configurable setting for them.

See the [`error_hook` block attributes](/2.0/reference/pipelines/configurations-as-code/api#error_hook-block-attributes) reference for full details.

## Next steps

- [How Hooks Execute](/2.0/docs/pipelines/guides/hooks/execution)
- [Hooks API](/2.0/reference/pipelines/hooks-api)
- [Writing a Hook](/2.0/docs/pipelines/guides/hooks/writing-a-hook)

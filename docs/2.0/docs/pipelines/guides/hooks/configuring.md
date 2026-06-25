# Configuring Hooks

Hooks are configured in your Pipelines HCL configuration.

## After hooks

After hooks run after Pipelines completes a `plan` or `apply`. They are configured with [`after_hook`](/2.0/reference/pipelines/configurations-as-code/api#after_hook-block) blocks nested inside the `repository` block. Each block declares which commands it runs after and the command to run. You can define multiple after hooks, and they run in the order they are defined.

```hcl
repository {
  after_hook "hello_world" {
    commands = ["plan"]
    execute  = ["echo", "Hello, World!"]
  }
}
```

### Required fields

- **`commands`**: the Pipelines commands this hook runs after. One or both of `plan` and `apply`.
- **`execute`**: the command to run, given as a list of the program followed by its arguments.

The block label (`hello_world` in the example above) is also required and must be unique within the `repository` block.

### Optional fields

- **`name`**: a human-readable display name for the hook.
- **`env`**: environment variables to set for the `execute` command.
- **`run_on_error`**: whether the hook runs when a preceding command or hook failed. Defaults to `false`.
- **`timeout_seconds`**: how long the hook may run before it is terminated. Defaults to `300`.
- **`authentication`**: cloud credentials and secrets for the hook. See [Authentication & Secrets](/2.0/docs/pipelines/guides/hooks/authentication).

See the [`after_hook` block attributes](/2.0/reference/pipelines/configurations-as-code/api#after_hook-block-attributes) reference for full details.

## How hooks execute

### Hooks only run when units are affected

Hooks only run when the Pipelines run affected at least one unit. A unit is affected when the run actually planned or applied it; units excluded from the run do not count.

If a change produces no work, hooks are skipped and the run still succeeds. This covers two cases:

- The change touches no unit, so Pipelines schedules no jobs to run.
- Jobs run, but no units are affected (for example an edit to a file that does not belong to any unit).

In both cases there is nothing for a hook to act on, so no hooks run.

### Command filtering

A run executes a single command, either `plan` or `apply`, and only hooks whose `commands` include that command run. A hook scoped to `apply` does not run on a pull/merge request plan, and a hook scoped to `plan` does not run on an apply.

A destroy is treated as an `apply` for this purpose, so a hook configured with `commands = ["apply"]` also runs after a destroy.

### Isolated working directory

Each hook runs in its own temporary copy of the repository, with that copy as its working directory. This is why an `execute` path like `.gruntwork/hooks/affected-units.sh` resolves relative to the repository root.

Any changes a hook makes to files are not persisted. The copy is discarded once the hook finishes, so edits are never committed, pushed, or seen by the rest of the run. Because each hook gets its own fresh copy, hooks also do not see file changes made by other hooks.

### Exit codes

A hook's exit code is how it tells Pipelines whether it succeeded:

- **Exit `0`** means the hook succeeded. Pipelines reads back its output files (result, summary, and comment).
- **Any non-zero exit** means the hook failed. **A failed hook fails the entire pipeline run**, exactly as a failed `plan` or `apply` does, and Pipelines ignores the hook's output files.

The exit code is not the only thing that can fail the run. When a hook exits `0`, Pipelines reads the result it wrote (`pass`, `warn`, or `deny`) and surfaces it in the comment. A `deny` result fails the pipeline run and blocks the pull/merge request from merging. `warn` is advisory and does not affect the run, and `pass` (or an empty or unrecognized value) has no effect. See [Hooks API](/2.0/reference/pipelines/hooks-api) for the result values.

### Skipping after a failure

By default, a hook is skipped if anything earlier in the run failed. This includes:

- the `plan` or `apply` the hook runs after, or
- an earlier hook in the list that exited non-zero.

A skipped hook does not run, and is reported as skipped on the pull/merge request.

Set `run_on_error = true` to run the hook regardless of an earlier failure. This is useful for hooks that should always run, such as sending a notification whether the run succeeded or failed. A `run_on_error` hook still runs even when a preceding hook failed.

### Timeout and cancellation

Each hook has a `timeout_seconds` limit (default `300`). The limit covers the whole hook, including acquiring any credentials from its [`authentication`](/2.0/docs/pipelines/guides/hooks/authentication) block. A hook that runs longer than its limit is cancelled.

When a hook is cancelled, Pipelines signals the hook's process group to terminate, gives it a brief grace period to exit cleanly, and then forcibly kills it. Because the whole process group is signalled, any child processes the hook started are terminated too.

A cancelled hook counts as a failure: it fails the run and, like any failure, causes later hooks without `run_on_error = true` to be skipped.

### Inputs and outputs

Pipelines passes information to a hook through environment variables, and a hook returns information by writing to files whose paths Pipelines provides. See [Hooks API](/2.0/reference/pipelines/hooks-api) for the full contract.

## Next steps

- [Hooks API](/2.0/reference/pipelines/hooks-api)
- [Writing a Hook](/2.0/docs/pipelines/guides/hooks/writing-a-hook)

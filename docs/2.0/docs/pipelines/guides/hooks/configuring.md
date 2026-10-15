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
- **`source`**: a URL to fetch before the hook runs, so `execute` can run scripts that live outside the repository. See [Remote script sources](#remote-script-sources). Hooks Gruntwork provides do not need a `source`; see [Gruntwork Provided Hooks](/2.0/docs/pipelines/guides/hooks/gruntwork-provided).
- **`env`**: environment variables to set for the `execute` command.
- **`run_on_error`**: whether the hook runs when a preceding command or hook failed. Defaults to `false`.
- **`timeout_seconds`**: how long the hook may run before it is terminated. Defaults to `300`.
- **`authentication`**: cloud credentials and secrets for the hook. See [Authentication & Secrets](/2.0/docs/pipelines/guides/hooks/authentication).
- **`filter`**: scopes the hook to a subset of the run's affected units by path, environment, and/or label. See [Scoping a hook to specific units](#scoping-a-hook-to-specific-units).

See the [`after_hook` block attributes](/2.0/reference/pipelines/configurations-as-code/api#after_hook-block-attributes) reference for full details.

## Error hooks

Error hooks run when a `plan` or `apply` fails with an error that matches one of their patterns. They are configured with [`error_hook`](/2.0/reference/pipelines/configurations-as-code/api#error_hook-block) blocks nested inside the `repository` block. Each block declares which commands it handles failures of, the error patterns to match, and the command to run. You can define multiple error hooks, and they run in the order they are defined.

```hcl
repository {
  error_hook "state_lock" {
    commands  = ["plan", "apply"]
    on_errors = ["Error acquiring the state lock"]
    execute   = ["echo", "Another run holds the state lock"]
  }
}
```

### Required fields

- **`commands`**: the Pipelines commands whose failures this hook handles. One or both of `plan` and `apply`.
- **`on_errors`**: a list of regular expressions matched against the output of the failed command. See [Matching errors](#matching-errors).
- **`execute`**: the command to run, given as a list of the program followed by its arguments.

The block label (`state_lock` in the example above) is also required and must be unique among the `error_hook` blocks in the `repository` block.

### Optional fields

- **`name`**: a human-readable display name for the hook.
- **`source`**: a URL to fetch before the hook runs, so `execute` can run scripts that live outside the repository. See [Remote script sources](#remote-script-sources).
- **`env`**: environment variables to set for the `execute` command.
- **`timeout_seconds`**: how long the hook may run before it is terminated. Defaults to `300`.
- **`authentication`**: cloud credentials and secrets for the hook. See [Authentication & Secrets](/2.0/docs/pipelines/guides/hooks/authentication).
- **`filter`**: scopes the hook to failures in a subset of the run's affected units by path, environment, and/or label. See [Scoping a hook to specific units](#scoping-a-hook-to-specific-units).

Error hooks have no `run_on_error` field, because running on error is a non-configurable setting for them.

See the [`error_hook` block attributes](/2.0/reference/pipelines/configurations-as-code/api#error_hook-block-attributes) reference for full details.

## How hooks execute

### Hooks only run when units are affected

Hooks only run when the Pipelines run affected at least one unit. A unit is affected when the run actually planned or applied it; units excluded from the run do not count.

If a change produces no work, hooks are skipped and the run still succeeds. This covers two cases:

- The change touches no unit, so Pipelines schedules no jobs to run.
- Jobs run, but no units are affected (for example an edit to a file that does not belong to any unit).

In both cases there is nothing for a hook to act on, so no hooks run.

:::note

Error hooks are the exception. Pipelines evaluates them whenever the `plan` or `apply` fails, regardless of whether a unit was affected. If an error hook has a `filter`, it runs only when a unit matching the filter failed, so it is skipped when no unit was affected. See [Scoping a hook to specific units](#scoping-a-hook-to-specific-units).

:::

### Command filtering

A run executes a single command, either `plan` or `apply`, and only hooks whose `commands` include that command run. A hook scoped to `apply` does not run on a pull/merge request plan, and a hook scoped to `plan` does not run on an apply.

A destroy is treated as an `apply` for this purpose, so a hook configured with `commands = ["apply"]` also runs after a destroy.

### Matching errors

Error hooks run at the end of the run, after the after hooks, and only when a `plan` or `apply` failed. A failed after hook does not trigger them.

Pipelines matches each pattern in `on_errors` against the combined output of the run's failed Terragrunt executions. Patterns use [Go RE2 syntax](https://github.com/google/re2/wiki/Syntax), and a hook runs if any one of them matches. Pipelines strips ANSI color codes from the output first, so patterns match plain text. The hook can read the same output from the file named in `PIPELINES_HOOK_IN_ERRORS_FILE`.

### Scoping a hook to specific units

By default a hook applies to every unit in the run. Add a `filter` block to scope it to a subset of those units, matching by path, environment, and/or label:

```hcl
repository {
  after_hook "notify_prod" {
    commands = ["apply"]
    execute  = [".gruntwork/hooks/notify.sh"]

    filter {
      environments = ["prod"]
      labels = {
        team = ["platform"]
      }
    }
  }
}
```

The filter is evaluated against the run's units:

- **`paths`**: a list of path globs. A unit matches if its path matches any of the globs.
- **`environments`**: a list of [`environment`](/2.0/reference/pipelines/configurations-as-code/api#environment-block) names. Units in any of the listed environments match.
- **`labels`**: a map of label keys to lists of values. A unit matches only if it has every listed key/value. Labels are assigned by [`annotation`](/2.0/reference/pipelines/configurations-as-code/api#annotation-block) blocks.

If at least one affected unit matches, the hook runs and receives only the matched units. If no affected unit matches, the hook is skipped.

An error hook's filter is stricter: the hook runs only if at least one matched unit failed. It receives every unit the filter matches, including units that succeeded. To act only on the failures, have the hook read each unit's `result` field from the [units JSON file](/2.0/reference/pipelines/hooks-api#units-json-file).

### Isolated working directory

Each hook runs in its own temporary copy of the repository, with that copy as its working directory. This is why an `execute` path like `.gruntwork/hooks/affected-units.sh` resolves relative to the repository root.

Any changes a hook makes to files are not persisted. The copy is discarded once the hook finishes, so edits are never committed, pushed, or seen by the rest of the run. Because each hook gets its own fresh copy, hooks also do not see file changes made by other hooks.

### Remote script sources

To execute a script from a remote source, declare a `source`: a [go-getter](https://github.com/hashicorp/go-getter#url-format) URL, and set `execute` to a path within the remote source.

```hcl
repository {
  after_hook "policy_scan" {
    name     = "Policy Scan"
    commands = ["plan"]
    source   = "git::https://github.com/acme/pipelines-hooks.git?ref=v1.2.0"
    execute  = ["bash", "$PIPELINES_HOOK_CTX_SOURCE_DIR/scripts/scan.sh"]
  }
}
```

The source is fetched into a directory whose path is provided to the hook as the `PIPELINES_HOOK_CTX_SOURCE_DIR` environment variable. This variable is expanded within the `execute` arguments, allowing execute to reference files within the source.

Within a hook, `PIPELINES_HOOK_CTX_SOURCE_DIR` can be used to reference (i.e. import) other files from the fetched source.

Using `source` does not affect the working directory `execute` runs in.

The URL accepts the same syntax as [Terragrunt module sources](https://terragrunt.gruntwork.io/docs/reference/hcl/blocks/#terraform), handled by go-getter. Pin a `ref` so hook runs are reproducible. A source must resolve to a directory, paths to individual files are not supported.

:::tip

We recommend using a git repository for your source to get the advantage of fetching private repositories with the same git credentials Pipelines already uses to access your repositories.

:::

Fetching counts against the hook's `timeout_seconds` and is retried on transient failures. A fetch failure fails the hook like any other hook error. Preflight also fetches every declared source, so a broken URL or ref fails the pull/merge request before any plan or apply runs.

### Exit codes

A hook's exit code is how it tells Pipelines whether it succeeded:

- **Exit `0`** means the hook succeeded. Pipelines reads back its output files (result, summary, and comment).
- **Any non-zero exit** means the hook failed. **A failed hook fails the entire pipeline run**, exactly as a failed `plan` or `apply` does. Pipelines ignores the result, summary and comment files and reads the error summary and error comment instead, so the hook can explain why it failed.

An error hook only runs once the run has already failed, so it cannot change the run's outcome. Its exit code and result are still reported in the comment.

The exit code is not the only thing that can fail the run. When a hook exits `0`, Pipelines reads the result it wrote (`pass`, `warn`, or `deny`) and surfaces it in the comment. A `deny` result fails the pipeline run and blocks the pull/merge request from merging. `warn` is advisory and does not affect the run, and `pass` (or an empty or unrecognized value) has no effect. See [Hooks API](/2.0/reference/pipelines/hooks-api) for the result values.

### Skipping after a failure

By default, any hook other than an error hook is skipped if anything earlier in the run failed. This includes:

- the `plan` or `apply` the hook runs after, or
- an earlier hook in the list that exited non-zero.

A skipped hook does not run, and is reported as skipped on the pull/merge request.

Set `run_on_error = true` to run the hook regardless of an earlier failure. This is useful for hooks that should always run, such as sending a notification whether the run succeeded or failed. A `run_on_error` hook still runs even when a preceding hook failed. For error hooks, running on error is a non-configurable setting.

### Timeout and cancellation

Each hook has a `timeout_seconds` limit (default `300`). The limit covers the whole hook, including fetching its [`source`](#remote-script-sources) and acquiring any credentials from its [`authentication`](/2.0/docs/pipelines/guides/hooks/authentication) block. A hook that runs longer than its limit is cancelled.

When a hook is cancelled, Pipelines signals the hook's process group to terminate, gives it a brief grace period to exit cleanly, and then forcibly kills it. Because the whole process group is signalled, any child processes the hook started are terminated too.

A cancelled hook counts as a failure: it fails the run and, like any failure, causes later hooks to be skipped, except error hooks and hooks with `run_on_error = true`.

### Inputs and outputs

Pipelines passes information to a hook through environment variables, and a hook returns information by writing to files whose paths Pipelines provides. See [Hooks API](/2.0/reference/pipelines/hooks-api) for the full contract.

Error hooks also receive `PIPELINES_HOOK_IN_ERRORS_FILE`, the output of the failed Terragrunt executions. Their outputs appear in a separate Error Hooks section of the pull/merge request comment, below the after hooks.

## Next steps

- [Hooks API](/2.0/reference/pipelines/hooks-api)
- [Writing a Hook](/2.0/docs/pipelines/guides/hooks/writing-a-hook)

# Writing a Hook

This guide builds a hook from scratch: a small bash script that reads context about the run, inspects the units that were planned, and posts a comment back on the pull/merge request. Along the way it covers the full loop a hook goes through, reading inputs from the environment and writing outputs to files.

Before you start, make sure hooks are set up for your repository. See [Setup & Prerequisites](/2.0/docs/pipelines/guides/hooks/setup).

## 1. Create the hook script

A hook is any executable command. Here we use a bash script committed to the repository. Create a file at `.gruntwork/hooks/affected-units.sh` with a shebang and strict mode:

```bash
#!/usr/bin/env bash
set -euo pipefail
```

Hooks run from the root of a copy of your repository, so this path resolves relative to the repository root when the hook is configured. See [Isolated working directory](/2.0/docs/pipelines/guides/hooks/configuring#isolated-working-directory) for details.

## 2. Read the run context

Pipelines passes information to the hook through environment variables. Context values about the run are in the `PIPELINES_HOOK_CTX_*` namespace, and paths to input files are in the `PIPELINES_HOOK_IN_*` namespace.

Read the actor and action from the context, and the path to the units file from the inputs:

```bash
actor="$PIPELINES_HOOK_CTX_ACTOR"
action="$PIPELINES_HOOK_CTX_ACTION"
units_file="$PIPELINES_HOOK_IN_UNITS_JSON_FILE"
```

`PIPELINES_HOOK_IN_UNITS_JSON_FILE` points at a JSON array of the units in the run, each with its path and (when one exists) the path to its plan JSON. For example, list the affected unit paths with `jq`:

```bash
jq -r '.[].path' "$units_file"
```

For the complete list of context variables and input files, see the [Hooks API](/2.0/reference/pipelines/hooks-api).

## 3. Write the comment

A hook returns information by writing to the files named in the `PIPELINES_HOOK_OUT_*` namespace. Build a comment listing the affected units and write it to the comment file:

```bash
{
  echo "<code>$action</code> triggered by @$actor affected:"
  echo
  jq -r '.[] | "- <code>\(.path)</code>"' "$units_file"
} > "$PIPELINES_HOOK_OUT_COMMENT_FILE"
```

Writing outputs is optional. This hook only posts a comment, so it does not write a result file: when a hook writes nothing to `PIPELINES_HOOK_OUT_RESULT_FILE` and exits `0`, Pipelines defaults its result to `pass`. To flag a problem instead, write `warn` or `deny` to that file. The result is advisory and surfaces in the comment, but does not by itself fail the run. [How results and comments appear](#how-results-and-comments-appear) below covers how each one renders on the request.

The complete script:

```bash
#!/usr/bin/env bash
set -euo pipefail

actor="$PIPELINES_HOOK_CTX_ACTOR"
action="$PIPELINES_HOOK_CTX_ACTION"
units_file="$PIPELINES_HOOK_IN_UNITS_JSON_FILE"

{
  echo "<code>$action</code> triggered by @$actor affected:"
  echo
  jq -r '.[] | "- <code>\(.path)</code>"' "$units_file"
} > "$PIPELINES_HOOK_OUT_COMMENT_FILE"
```

## 4. Make the script executable

Pipelines runs the hook as a program, so the script needs the executable bit set. Set it and commit the change so the bit is preserved in git:

```bash
chmod +x .gruntwork/hooks/affected-units.sh
git add .gruntwork/hooks/affected-units.sh
```

## 5. Configure the hook

Declare an [`after_hook`](/2.0/reference/pipelines/configurations-as-code/api#after_hook-block) block in your `repository` configuration. Set `commands` to the commands it runs after and `execute` to the script's repository-root-relative path:

```hcl
repository {
  after_hook "affected_units" {
    name     = "Affected Units"
    commands = ["plan"]
    execute  = [".gruntwork/hooks/affected-units.sh"]
  }
}
```

See [Configuring Hooks](/2.0/docs/pipelines/guides/hooks/configuring) for every field and how hooks execute.

## 6. Run the hook

Commit the script and configuration, then open a pull/merge request that changes at least one unit. Pipelines runs the hook after the `plan`, and the comment your hook wrote appears on the request alongside the plan output.

![Hook comment on a pull request](/img/pipelines/guides/affected-units-comment.png)

The result and comment your hook produced are shown in the Pipelines status comment. The next section covers exactly how they render.

## How results and comments appear

Pipelines includes each hook in its status comment on the pull/merge request, rendered as a collapsible section. The output files the hook writes control how that section looks.

### Title and icon

The section is titled by the hook's `name`, or its block label when `name` is unset. An icon prefixes the title to reflect the outcome:

| Outcome | Icon |
|---|---|
| `pass` result | ✅ |
| `warn` result | ⚠️ |
| `deny` result | ❌ |
| Failed (non-zero exit) | ❌ |
| Timed out | ❌ |
| Skipped | ⏭️ |

The overall comment reflects the most severe hook outcome, so a `warn` or `deny` is visible at the top without expanding each section.

### Summary and comment

The two text outputs serve different purposes:

- **Summary** (`PIPELINES_HOOK_OUT_SUMMARY_FILE`) appears inline next to the title, after a colon, for example `⚠️ Affected Units: 3 units changed`. Use it for a short, at-a-glance headline.
- **Comment** (`PIPELINES_HOOK_OUT_COMMENT_FILE`) is the body of the collapsible section, rendered as HTML. Use it for detailed output such as a table, a list, or links.

If the hook writes no comment, Pipelines shows a fallback line in the body, such as `Hook exited with code 0`. The hook from this guide writes a `pass` result and a comment, so it appears with a ✅ icon and its unit list in the body.

### Results do not fail the run

A `deny` shows a ❌ and raises the severity shown in the comment, but it does not fail the run. Only a non-zero exit fails the run; see [Exit codes](/2.0/docs/pipelines/guides/hooks/configuring#exit-codes).

### Skipped hooks

A hook skipped because of an earlier failure (see [Skipping after a failure](/2.0/docs/pipelines/guides/hooks/configuring#skipping-after-a-failure)) appears with a ⏭️ icon and the note "Hook skipped due to previous failure", rather than as a pass or a failure.

## Next steps

- [Authentication & Secrets](/2.0/docs/pipelines/guides/hooks/authentication) - give a hook cloud credentials and secrets.
- [Hooks API](/2.0/reference/pipelines/hooks-api) - the full environment variable and file contract.

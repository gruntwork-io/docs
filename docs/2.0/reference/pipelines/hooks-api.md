# Hooks API

Pipelines communicates with a hook entirely through environment variables. There are three namespaces:

- **`PIPELINES_HOOKS_CTX_*`**: context values about the run, set directly as the variable's value.
- **`PIPELINES_HOOKS_IN_*`**: paths to input files the hook reads.
- **`PIPELINES_HOOKS_OUT_*`**: paths to output files the hook writes.

The hook's `execute` command reads from the first two namespaces and writes to the third.

## Context inputs (`PIPELINES_HOOKS_CTX_*`)

Scalar facts about the run, set directly as the variable's value.

A context variable that does not apply to the run is left unset, rather than set to an empty string. A hook can therefore tell "not applicable" apart from "set but blank", for example with `[ -z "${PIPELINES_HOOKS_CTX_ACTION+x}" ]` in bash.

### Always set

| Variable | Description |
|---|---|
| `PIPELINES_HOOKS_CTX_CI_PLATFORM` | The CI platform running the hook: `github` or `gitlab`. |
| `PIPELINES_HOOKS_CTX_ORGANIZATION` | The organization (GitHub) or group (GitLab) that owns the repository. |
| `PIPELINES_HOOKS_CTX_REPOSITORY` | The repository name. |
| `PIPELINES_HOOKS_CTX_ACTOR` | The user that triggered the run. |
| `PIPELINES_HOOKS_CTX_GIT_REF` | The git ref that triggered the run. |
| `PIPELINES_HOOKS_CTX_GIT_HASH` | The commit SHA the run is operating on. |

### Set when applicable

| Variable | Description |
|---|---|
| `PIPELINES_HOOKS_CTX_ACTION` | The command the hook ran after: `plan` or `apply`. A destroy is reported as `apply`. |
| `PIPELINES_HOOKS_CTX_ACTION_STATUS` | The outcome of that command: `succeeded` or `failed`. |
| `PIPELINES_HOOKS_CTX_CHANGE_REQUEST_NUMBER` | The pull/merge request number. |
| `PIPELINES_HOOKS_CTX_CHANGE_REQUEST_URL` | The pull/merge request URL. |
| `PIPELINES_HOOKS_CTX_CHANGE_REQUEST_BRANCH` | The source branch of the pull/merge request. |

The three `CHANGE_REQUEST` variables are set or absent together: they are set when the run is associated with a pull/merge request, and absent for a push to a deploy branch.

## File inputs (`PIPELINES_HOOKS_IN_*`)

Paths to files the hook reads. Both are always set.

| Variable | Description |
|---|---|
| `PIPELINES_HOOKS_IN_PLANS_JSON_DIR` | Directory containing the decrypted plan JSON for the run's units. |
| `PIPELINES_HOOKS_IN_UNITS_JSON_FILE` | Path to a JSON file describing the units in the run. |

### Plans JSON directory

Within `PIPELINES_HOOKS_IN_PLANS_JSON_DIR`, each unit's plan is stored at `<unit-path>/tfplan.json`, where `<unit-path>` is the unit's path relative to the repository root. Only units that produced a plan have a file, so the directory may not contain an entry for every unit in the run.

The file is the JSON form of the OpenTofu/Terraform plan (`terraform show -json`).

### Units JSON file

`PIPELINES_HOOKS_IN_UNITS_JSON_FILE` points to a JSON array describing each unit the hook applies to:

```json
[
  {
    "path": "dev/us-east-1/vpc",
    "plan_json_file": "/abs/path/to/dev/us-east-1/vpc/tfplan.json"
  },
  {
    "path": "dev/us-east-1/no-changes"
  }
]
```

| Field | Description |
|---|---|
| `path` | The unit's path relative to the repository root. |
| `plan_json_file` | Absolute path to the unit's decrypted plan JSON, the same file addressed under the plans directory above. Omitted when the unit produced no plan. |

## Outputs (`PIPELINES_HOOKS_OUT_*`)

Paths to files the hook may write. All are always set. Pipelines reads them back only when the hook process exits `0`; if the hook exits non-zero the output files are ignored.

| Variable | Description |
|---|---|
| `PIPELINES_HOOKS_OUT_RESULT_FILE` | Write the hook's result: `pass`, `warn`, or `deny`. |
| `PIPELINES_HOOKS_OUT_SUMMARY_FILE` | Write a short summary of the hook's outcome. |
| `PIPELINES_HOOKS_OUT_COMMENT_FILE` | Write a comment body to surface on the pull/merge request. |

Writing to these files is optional. A hook that writes nothing reports a `pass` with no summary or comment.

### Results

The result written to `PIPELINES_HOOKS_OUT_RESULT_FILE` is one of:

| Result | Meaning |
|---|---|
| `pass` | The default result. |
| `warn` | Advisory warning. |
| `deny` | Advisory rejection. |

The result is an advisory severity surfaced in the pull/merge request comment; it does not by itself change whether the run succeeds. In particular, `deny` does not fail the run. An empty or unrecognized value is treated as `pass`.

For how the result, summary, and comment appear on the pull/merge request, see [How results and comments appear](/2.0/docs/pipelines/guides/hooks/writing-a-hook#how-results-and-comments-appear).

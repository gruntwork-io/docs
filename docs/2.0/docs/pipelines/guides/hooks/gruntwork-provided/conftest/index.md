import hook from './_hook.json'
import HookVersion from '@site/src/components/HookVersion'
import HookUsage from '@site/src/components/HookUsage'
import HookInputs from '@site/src/components/HookInputs'

# Conftest (OPA)

<HookVersion {...hook} />

Run [Conftest](https://www.conftest.dev/) against each unit's plan, so your [Rego](https://www.openpolicyagent.org/docs/policy-language) policies decide whether a change may merge.

## Usage

<HookUsage {...hook} />

## Policies

`PIPELINES_HOOK_CONFTEST_POLICIES_SOURCE` takes one of two forms:

- **A path in the repository** Pipelines is running against, such as `./policies`.
- **A remote source**, such as `git::https://github.com/acme/policies.git//rego`, to share one set of policies across repositories. Any source [`conftest pull`](https://www.conftest.dev/sharing/) accepts works.

The run fails if the source holds no `.rego` files.

## Writing a policy

`input` is the unit's plan as [JSON](https://developer.hashicorp.com/terraform/internals/json-format#plan-representation), for example:

```rego
package main

warn contains msg if {
	some change in input.resource_changes
	change.type == "aws_db_instance"
	"create" in change.change.actions
	change.change.after.deletion_protection == false
	msg := sprintf("%s has deletion protection disabled", [change.address])
}
```

A `deny` or `violation` rule blocks the merge; a `warn` rule is advisory. A [rule name](https://www.conftest.dev/#evaluating-policies) may carry a suffix, so `deny_deletion_protection` still counts as a `deny`.

Conftest loads every `.rego` file in the source, including those in subdirectories, and evaluates all of them against every unit's plan. Only rules in `package main` run.

Set any additional [Conftest environment variables](https://www.conftest.dev/options/) in the hook's `env` block. Each is a flag name prefixed with `CONFTEST_`, such as `CONFTEST_NAMESPACE` to evaluate a package other than `main`.

## Outputs

The hook posts a table on the pull or merge request, one row per message:

| Unit | Result | Message |
| --- | --- | --- |
| `dev/us-east-1/database` | WARN | `aws_db_instance.this` has deletion protection disabled |
| `prod/us-east-1/vpc` | NOT CHECKED | No plan to check |

The hook reports `deny` when a policy fails. It reports `warn` when a policy warns, or when a unit had no plan to check. Otherwise it reports `pass`.

## Inputs

<HookInputs {...hook} />

## Related documentation

- [Gruntwork Provided Hooks](/2.0/docs/pipelines/guides/hooks/gruntwork-provided) - version pinning and configuration common to every provided hook.
- [Configuring Hooks](/2.0/docs/pipelines/guides/hooks/configuring) - the full set of hook fields.
- [Authentication & Secrets](/2.0/docs/pipelines/guides/hooks/authentication) - giving a hook cloud credentials.

import hook from './_hook.json'
import HookVersion from '@site/src/components/HookVersion'
import HookUsage from '@site/src/components/HookUsage'
import HookInputs from '@site/src/components/HookInputs'

# Conftest (OPA)

<HookVersion {...hook} />

Run [Conftest](https://www.conftest.dev/) against each unit's plan, so policies you write in [Rego](https://www.openpolicyagent.org/docs/policy-language) decide whether a change may merge.

## Usage

<HookUsage {...hook} />

## Policies

`PIPELINES_HOOK_CONFTEST_POLICIES_SOURCE` is either:

- a path in the repository Pipelines is running against, such as `./policies`
- any remote source `conftest pull` accepts, such as `git::https://github.com/acme/policies.git//rego`, to share one set of policies across repositories

The run fails if the source holds no `.rego` files.

## Writing a policy

`input` is the unit's plan as [JSON](https://developer.hashicorp.com/terraform/internals/json-format#plan-representation):

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

A `deny` or `violation` rule blocks the merge; a `warn` rule is advisory.

Set any additional [Conftest environment variables](https://www.conftest.dev/configuration/) in the hook's `env` block, such as `CONFTEST_NAMESPACE` to evaluate a package other than `main`.

## Outputs

Every message appears in a table on the pull or merge request, one row per unit and rule:

| Unit | Result | Message |
| --- | --- | --- |
| `dev/us-east-1/database` | WARN | `aws_db_instance.this` has deletion protection disabled |
| `prod/us-east-1/vpc` | NOT CHECKED | No plan to check |

The hook reports `deny` when a policy fails, `warn` when a policy warns or a unit had no plan to check, and `pass` otherwise.

## Inputs

<HookInputs {...hook} />

## Related documentation

- [Gruntwork Provided Hooks](/2.0/docs/pipelines/guides/hooks/gruntwork-provided) - version pinning and configuration common to every provided hook.
- [Configuring Hooks](/2.0/docs/pipelines/guides/hooks/configuring) - the full set of hook fields.
- [Authentication & Secrets](/2.0/docs/pipelines/guides/hooks/authentication) - giving a hook cloud credentials.

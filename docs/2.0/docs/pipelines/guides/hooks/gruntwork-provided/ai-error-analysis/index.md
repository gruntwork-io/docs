import hook from './_hook.json'
import HookVersion from '@site/src/components/HookVersion'
import HookUsage from '@site/src/components/HookUsage'
import HookInputs from '@site/src/components/HookInputs'

# AI Error Analysis

<HookVersion {...hook} />

The Gruntwork-provided AI Error Analysis hook explains why a Terragrunt run failed and how to fix it. The model is given each failed unit's error together with the Terragrunt and any OpenTofu/Terraform files of the units in the run, so it can trace an error back to the code that caused it. When no unit reports an error, it is given the output of the failed steps instead.

## Usage

<HookUsage {...hook} />

## Outputs

The hook posts its analysis on the pull or merge request:

![AI Error Analysis Comment](/img/pipelines/guides/ai-error-analysis-hook-comment.png)

The summary line states the cause. Below it, each distinct cause gets one finding, numbered when there is more than one. A finding names the units it affects, the issue, and the fix.

## Inputs

<HookInputs {...hook} />

## Related documentation

- [Gruntwork Provided Hooks](/2.0/docs/pipelines/guides/hooks/gruntwork-provided) - version pinning and configuration common to every provided hook.
- [How Hooks Execute](/2.0/docs/pipelines/guides/hooks/execution) - when and how Pipelines runs hooks.
- [Authentication & Secrets](/2.0/docs/pipelines/guides/hooks/authentication) - giving a hook cloud credentials.

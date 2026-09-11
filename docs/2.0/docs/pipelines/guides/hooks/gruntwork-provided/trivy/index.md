import hook from './_hook.json'
import HookVersion from '@site/src/components/HookVersion'
import HookUsage from '@site/src/components/HookUsage'
import HookInputs from '@site/src/components/HookInputs'

# Trivy

<HookVersion {...hook} />

Scan each unit's plan for misconfigurations with Trivy

## Usage

<HookUsage {...hook} />

## Inputs

<HookInputs {...hook} />

## Related documentation

- [Gruntwork Provided Hooks](/2.0/docs/pipelines/guides/hooks/gruntwork-provided) - version pinning and configuration common to every provided hook.
- [Configuring Hooks](/2.0/docs/pipelines/guides/hooks/configuring) - the full set of hook fields.
- [Authentication & Secrets](/2.0/docs/pipelines/guides/hooks/authentication) - giving a hook cloud credentials.

# Gruntwork Provided Hooks

:::info

Hooks are an Enterprise-only feature.

:::

Gruntwork provided hooks are ready-to-use extensions of a Pipelines run, built and maintained by Gruntwork. They require `pipelines-workflows` v4.24.0 or later on GitHub, or v2.19.0 or later on GitLab.

```hcl
repository {
  after_hook "infracost_estimate" {
    name     = "InfraCost Estimate"
    commands = ["plan"]
    execute  = ["pipelines", "hook", "infracost@v0"]
  }
}
```

Gruntwork provided hooks are executed by running pipelines with the hook's name and version as shown above.

## Available hooks

- [Infracost](/2.0/docs/pipelines/guides/hooks/gruntwork-provided/infracost) - shows what a change costs before it is applied, per unit and in total.

More are in development and will appear here as they are released.

## Configuration

### Choosing a version

A hook is referenced as `<name>@<version>`. Hooks are versioned independently of Pipelines. Pin the reference as tightly or as loosely as you want new releases to be automatically used.

| Reference | Resolves to | Use when |
| --- | --- | --- |
| `infracost@v0` | the latest `v0.x.x` | you want fixes and new features |
| `infracost@v0.5` | the latest `v0.5.x` | you only want patches |
| `infracost@v0.5.0` | this specific release | you want fixed versions |

### Environment variables

The `pipelines hook` command accepts the hook reference and nothing else, so a hook reads its configuration from environment variables. Set them in the hook block's `env` declaration:

```hcl
repository {
  after_hook "infracost_estimate" {
    # ...

    env {
      INFRACOST_CURRENCY = "EUR"
    }
  }
}
```

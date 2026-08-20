# Gruntwork Provided Hooks

Gruntwork provided hooks are ready-to-use extensions of a Pipelines run, built and maintained by Gruntwork. They are available from `pipelines-workflows` vTBD.

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

## Choosing a version

A hook is referenced as `<name>@<version>`. Hooks are versioned independently of Pipelines, so a hook gains features without a Pipelines upgrade, and you decide when to take them. Pin as needed.

| Reference | Resolves to | Use when |
| --- | --- | --- |
| `infracost@v0` | the latest `v0.x.x` | you want fixes and new features |
| `infracost@v0.5` | the latest `v0.5.x` | you only want patches |
| `infracost@v0.5.0` | this specific release | you want fixed versions |

## Configuration

`pipelines hook` accepts the hook reference and nothing else, so a hook reads its configuration from environment variables. Set them in the block's `env`:

```hcl
repository {
  after_hook "infracost_estimate" {
    name     = "InfraCost Estimate"
    commands = ["plan"]
    execute  = ["pipelines", "hook", "infracost@v0"]

    env {
      INFRACOST_CURRENCY = "EUR"
    }
  }
}
```

## Related documentation

- [Configuring Hooks](/2.0/docs/pipelines/guides/hooks/configuring) - the full set of hook fields.
- [Authentication & Secrets](/2.0/docs/pipelines/guides/hooks/authentication) - giving a hook cloud credentials.
- [Writing a Hook](/2.0/docs/pipelines/guides/hooks/writing-a-hook) - when you need a hook Gruntwork does not provide.

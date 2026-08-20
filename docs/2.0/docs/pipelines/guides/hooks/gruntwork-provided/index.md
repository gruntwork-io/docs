# Gruntwork Provided Hooks

Gruntwork provided hooks are ready-to-use extensions of a Pipelines run, built and maintained by Gruntwork. Pipelines resolves and runs them directly, so adding one is a line of configuration.

```hcl
repository {
  after_hook "infracost_estimate" {
    name     = "InfraCost Estimate"
    commands = ["plan"]
    execute  = ["pipelines", "hook", "infracost@v0"]
  }
}
```

Configuration is the same as for a hook you author yourself, with no script in your repository and no [`source`](/2.0/docs/pipelines/guides/hooks/configuring#remote-script-sources) to fetch.

## Available hooks

- [Infracost](/2.0/docs/pipelines/guides/hooks/gruntwork-provided/infracost) - estimates the cost of every unit a run affects.

More hooks are on the way.

## Choosing a version

A hook is referenced as `<name>@<version>`. Pin as narrowly as you need:

| Reference | Resolves to | Use when |
| --- | --- | --- |
| `infracost@v0` | the latest `v0.x.x` | you want fixes and new features, and never a breaking change |
| `infracost@v0.5` | the latest `v0.5.x` | you want patches only |
| `infracost@v0.5.0` | that release exactly | every run must use an identical hook |

Hooks are released independently of Pipelines, so a hook can add features without a Pipelines upgrade.

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

Each hook's release notes list the variables that version accepts.

## Related documentation

- [Configuring Hooks](/2.0/docs/pipelines/guides/hooks/configuring) - the full set of hook fields.
- [Authentication & Secrets](/2.0/docs/pipelines/guides/hooks/authentication) - giving a hook cloud credentials.
- [Writing a Hook](/2.0/docs/pipelines/guides/hooks/writing-a-hook) - when you need a hook Gruntwork does not provide.

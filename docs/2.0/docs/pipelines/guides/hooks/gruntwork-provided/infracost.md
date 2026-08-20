# Infracost

The Gruntwork-provided Infracost hook estimates the cost of every unit a pipelines run affects, so a reviewer can see what a change costs before it is applied. It invokes the [Infracost](https://www.infracost.io/) CLI directly.

```hcl
repository {
  after_hook "infracost_estimate" {
    name     = "InfraCost Estimate"
    commands = ["plan"]
    execute  = ["pipelines", "hook", "infracost@v0"]
  }
}
```

The hook should be configured to run after `plan` given that it estimates the cost of the change that the `plan` command describes.

## Outputs

The hook posts the estimate on the pull or merge request:

![Cost Estimate Comment](/img/pipelines/guides/infracost-hook-comment.png)

The summary line shows the change to your monthly bill. The table breaks that change down by unit, alongside each unit's new monthly cost. The Baseline Cost and Usage Cost columns appear only when usage costs were projected.

A unit whose cost could not be estimated is marked ⚠️ rather than counted as zero, so a partial estimate is not mistaken for a complete one.

The hook reports `pass` when every affected unit was estimated, and `warn` when any could not be. It does not report `deny`, so it cannot fail a run or block a merge.

## Inputs

The hook reads its settings from environment variables. Set them in the block's `env`, or export them before the hook runs.

### Required

| Variable | Description |
|---|---|
| `INFRACOST_API_KEY` | Your Infracost API key. See [Providing an API key](#providing-an-api-key). |

### Optional

| Variable | Description |
|---|---|
| `INFRACOST_CURRENCY` | An [ISO 4217 currency code](https://en.wikipedia.org/wiki/ISO_4217#List_of_ISO_4217_currency_codes) to report in. Defaults to `USD`. |
| `PIPELINES_HOOK_INFRACOST_CLI_VERSION` | The Infracost CLI version the hook installs. Defaults to the version that release of the hook was tested against. |

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

## Providing an API key

Infracost requires an API key, which the hook reads from `INFRACOST_API_KEY`.

Pipelines does not store secrets for you (see [Authentication & Secrets](/2.0/docs/pipelines/guides/hooks/authentication)), so fetch the key as part of `execute`, using the credentials the hook's `authentication` block provides:

```hcl
repository {
  after_hook "infracost_estimate" {
    name     = "InfraCost Estimate"
    commands = ["plan"]
    execute = ["bash", "-c", <<-EOT
      export INFRACOST_API_KEY=$(aws ssm get-parameter --name infracost-api-key --with-decryption --query Parameter.Value --output text)
      pipelines hook infracost@v0
    EOT
    ]

    authentication {
      aws_oidc {
        account_id        = "222222222222"
        plan_iam_role_arn = "arn:aws:iam::222222222222:role/infracost-api-key-read"
      }
    }
  }
}
```

The same approach works with any secret store the hook's identity can reach. For a walkthrough, see [Slack Deploy Notification](/2.0/docs/pipelines/tutorials/slack-deploy-notification).

## Usage-based costs

Some costs depend on how much a resource is used rather than on it existing, such as requests, storage, and data transfer. Infracost cannot read those figures from a plan, so it projects them.

Commit an `infracost-usage.yml` at the root of your repository to supply your own projections, and the hook picks it up automatically, with Infracost Cloud usage defaults as a fallback. The footnote under the table names the sources that applied.

See Infracost's [usage costs](https://www.infracost.io/docs/features/usage_based_resources/) documentation for the file format and how to override individual resources.

## Related documentation

- [Gruntwork Provided Hooks](/2.0/docs/pipelines/guides/hooks/gruntwork-provided) - version pinning and configuration common to every provided hook.
- [Configuring Hooks](/2.0/docs/pipelines/guides/hooks/configuring) - the full set of hook fields.
- [Authentication & Secrets](/2.0/docs/pipelines/guides/hooks/authentication) - giving a hook cloud credentials.

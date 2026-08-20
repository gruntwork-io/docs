# Infracost

The Infracost hook estimates the cost of every unit a run affects, so a reviewer can see what a change costs before it is applied. It uses the [Infracost](https://www.infracost.io/) CLI, which the hook installs itself.

```hcl
repository {
  after_hook "infracost_estimate" {
    name     = "InfraCost Estimate"
    commands = ["plan"]
    execute  = ["pipelines", "hook", "infracost@v0"]
  }
}
```

The hook runs after `plan` and prices the plan Pipelines gives it, so it reports the change under review rather than everything you already run.

## What it reports

The hook summary shows the change to your monthly bill:

> ✅ **InfraCost Estimate**: +$158 / month ▲

The comment includes a table of every affected unit, its change, and its new monthly cost. A unit whose cost could not be estimated is marked ⚠️ rather than counted as zero, so a partial estimate is not mistaken for a complete one.

The hook reports a [result](/2.0/reference/pipelines/hooks-api) of `warn` when any unit could not be estimated, and `pass` otherwise. It never reports `deny`, so it cannot fail a run or block a merge.

## Providing an API key

Infracost requires an API key, which the hook reads from `INFRACOST_API_KEY`.

Pipelines does not store secrets for you (see [Authentication & Secrets](/2.0/docs/pipelines/guides/hooks/authentication)), so fetch the key as part of `execute`, using the credentials the hook's `authentication` block provides:

```hcl
repository {
  after_hook "infracost_estimate" {
    name     = "InfraCost Estimate"
    commands = ["plan"]
    execute = ["bash", "-c",
      "INFRACOST_API_KEY=$(aws ssm get-parameter --name infracost-api-key --with-decryption --query Parameter.Value --output text) pipelines hook infracost@v0"]

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

Commit an [`infracost-usage.yml`](https://www.infracost.io/docs/features/usage_based_resources/#how-to-override--improve-estimates) at the root of your repository to supply your own projections, and the hook picks it up automatically. Without one, Infracost Cloud's defaults are used where available. The comment states which of the two produced the figures.

## Currency

Infracost reports in US dollars. Set `INFRACOST_CURRENCY` to an [ISO 4217 currency code](https://en.wikipedia.org/wiki/ISO_4217#List_of_ISO_4217_currency_codes) to report in another currency.

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

- [Gruntwork Provided Hooks](/2.0/docs/pipelines/guides/hooks/gruntwork-provided) - version pinning and configuration common to every provided hook.
- [Configuring Hooks](/2.0/docs/pipelines/guides/hooks/configuring) - the full set of hook fields.
- [Authentication & Secrets](/2.0/docs/pipelines/guides/hooks/authentication) - giving a hook cloud credentials.

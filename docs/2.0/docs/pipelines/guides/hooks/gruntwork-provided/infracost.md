# Infracost

The Gruntwork-provided Infracost hook estimates the cost of every unit a Pipelines run affects, so a reviewer can see what a change costs before it is applied. It invokes the [Infracost](https://www.infracost.io/) CLI directly.

```hcl
repository {
  after_hook "infracost_estimate" {
    name     = "Infracost Estimate"
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

A unit whose cost could not be estimated shows ⚠️ in its row, and the summary line reports how many units were not estimated. Its cost contributes zero to the totals.

The hook reports `deny` when a change exceeds a deny [cost threshold](#cost-thresholds). It reports `warn` when a change exceeds a warn threshold, when a unit could not be estimated, or when the estimate failed. Otherwise it reports `pass`.

## Inputs

Settings are supplied as environment variables. Set them in the block's `env`, or export them before the hook runs.

### Required

| Variable | Description |
|---|---|
| `INFRACOST_API_KEY` | Your Infracost API key, read by the Infracost CLI. The hook stops before estimating if it is unset. See [Providing an API key](#providing-an-api-key). |

### Optional

| Variable | Description |
|---|---|
| `PIPELINES_HOOK_INFRACOST_CLI_VERSION` | The Infracost CLI version the hook installs. Defaults to the version the released hook was tested against. |
| `PIPELINES_HOOK_INFRACOST_WARN_TOTAL_CHANGE_ABOVE_AMOUNT` | A monthly amount. The hook reports `warn` when the Total Change exceeds it. |
| `PIPELINES_HOOK_INFRACOST_WARN_TOTAL_CHANGE_ABOVE_PERCENT` | A percentage. The hook reports `warn` when the Total Change, as a percentage of the previous total, exceeds it. |
| `PIPELINES_HOOK_INFRACOST_DENY_TOTAL_CHANGE_ABOVE_AMOUNT` | A monthly amount. The hook reports `deny` when the Total Change exceeds it. |
| `PIPELINES_HOOK_INFRACOST_DENY_TOTAL_CHANGE_ABOVE_PERCENT` | A percentage. The hook reports `deny` when the Total Change, as a percentage of the previous total, exceeds it. |

### Infracost CLI settings

The Infracost CLI reads some of its settings from the environment, and the hook passes them through unchanged. For example, set `INFRACOST_CURRENCY` to an [ISO 4217 currency code](https://en.wikipedia.org/wiki/ISO_4217#List_of_ISO_4217_currency_codes) to report in a currency other than `USD`.

```hcl
repository {
  after_hook "infracost_estimate" {
    name     = "Infracost Estimate"
    commands = ["plan"]
    execute  = ["pipelines", "hook", "infracost@v0"]

    env {
      INFRACOST_CURRENCY = "EUR"
    }
  }
}
```

The hook also passes an `infracost-usage.yml` from your repository root to the CLI. See [Usage-based costs](#usage-based-costs).

## Providing an API key

Infracost requires an API key, which the hook reads from `INFRACOST_API_KEY`.

Pipelines does not store secrets for you (see [Authentication & Secrets](/2.0/docs/pipelines/guides/hooks/authentication)), so fetch the key as part of `execute`, using the credentials the hook's `authentication` block provides:

```hcl
repository {
  after_hook "infracost_estimate" {
    name     = "Infracost Estimate"
    commands = ["plan"]
    execute  = ["bash", "-c", <<-EOT
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

## Cost thresholds

Set a threshold to have the hook warn on, or block, a change that raises your monthly cost above a limit you set. Thresholds apply to the Total Change for the whole run rather than to individual units, as an amount or as a percentage of the previous total, and each is optional.

```hcl
repository {
  after_hook "infracost_estimate" {
    # ...

    env {
      PIPELINES_HOOK_INFRACOST_WARN_TOTAL_CHANGE_ABOVE_AMOUNT  = "100"
      PIPELINES_HOOK_INFRACOST_DENY_TOTAL_CHANGE_ABOVE_PERCENT = "50"
    }
  }
}
```

Each threshold is a whole number greater than zero. An amount is in the currency the estimate reports, and a value the hook cannot read fails the run.

Above the table, the hook lists the thresholds a change exceeded:

![Cost Thresholds Comment](/img/pipelines/guides/infracost-hook-thresholds.png)

### Evaluation

- A change equal to a threshold does not exceed it.
- A change that lowers your monthly cost, or leaves it unchanged, never exceeds a threshold.
- A percentage threshold is skipped when the previous total is zero, so it never fires on newly created infrastructure. An amount threshold still applies.
- A unit the hook could not estimate contributes zero, so a change with a ⚠️ row can stay under a threshold its full cost would exceed.
- A run whose estimate failed reports `warn`, with no threshold checked.
- A change that exceeds both a warn and a deny threshold reports `deny`, and only the deny thresholds are listed.
- A `deny` result fails the run and blocks the pull or merge request.

## Related documentation

- [Gruntwork Provided Hooks](/2.0/docs/pipelines/guides/hooks/gruntwork-provided) - version pinning and configuration common to every provided hook.
- [Configuring Hooks](/2.0/docs/pipelines/guides/hooks/configuring) - the full set of hook fields.
- [Authentication & Secrets](/2.0/docs/pipelines/guides/hooks/authentication) - giving a hook cloud credentials.

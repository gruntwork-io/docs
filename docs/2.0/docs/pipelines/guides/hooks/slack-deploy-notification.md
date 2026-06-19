# Example: Slack Deploy Notification

This example posts a message to Slack after a deploy (`apply`), so your team is notified when infrastructure changes are rolled out. It uses `run_on_error` so a notification is sent whether the apply succeeds or fails, and it fetches the Slack webhook URL from AWS SSM Parameter Store using the credentials from the hook's [`authentication`](/2.0/docs/pipelines/guides/hooks/authentication) block.

Before you start, make sure hooks are set up for your repository (see [Setup & Prerequisites](/2.0/docs/pipelines/guides/hooks/setup)).

## 1. Decide where to store the secret

Pipelines does not store secrets for you (see [Authentication & Secrets](/2.0/docs/pipelines/guides/hooks/authentication)). As the hook author, you decide where the webhook URL is stored and how the hook retrieves it. This example stores it in AWS SSM Parameter Store and gives the hook an IAM role that can read it. The same approach works with any secret store that the hook's identity can reach, such as AWS Secrets Manager, Azure Key Vault, or GCP Secret Manager.

## 2. Create a Slack incoming webhook

In Slack, create an app with [incoming webhooks](https://api.slack.com/messaging/webhooks) enabled and add a webhook to the channel you want to post to. Slack gives you a webhook URL that looks like `https://hooks.slack.com/services/FOO/BAR/BAZ`. Posting a JSON payload to that URL delivers a message to the channel.

## 3. Store the webhook URL in SSM Parameter Store

The webhook URL is a secret, so keep it out of your configuration. Store it in SSM Parameter Store as an encrypted `SecureString`:

```bash
aws ssm put-parameter \
  --name "/$$SLACK_WEBHOOK_PARAM$$" \
  --type "SecureString" \
  --value "$$SLACK_WEBHOOK_URL$$"
```

## 4. Create a role the hook can assume

The hook reads the secret at runtime under an IAM role. Create (or reuse) a role the hook can assume, and allow it to read the parameter. At minimum the role needs `ssm:GetParameter` on the parameter, plus `kms:Decrypt` on the key if you encrypted it with a customer-managed key:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "ssm:GetParameter",
      "Resource": "arn:aws:ssm:*:$$AWS_ACCOUNT_ID$$:parameter/$$SLACK_WEBHOOK_PARAM$$"
    }
  ]
}
```

The role also needs a trust policy that allows Pipelines to assume it. See [Authenticating to the Cloud](/2.0/docs/pipelines/concepts/cloud-auth/aws) for how Pipelines assumes roles.

## 5. Configure the hook

Declare an [`after_hook`](/2.0/reference/pipelines/configurations-as-code/api#after_hook-block) on `apply`. Set `run_on_error = true` so the notification is sent even when the apply fails, and reference the role from the previous step in the `authentication` block as both the plan and apply role:

```hcl
repository {
  after_hook "notify_slack" {
    name         = "Notify Slack"
    commands     = ["apply"]
    execute      = ["bash", ".gruntwork/hooks/slack-notify.sh"]
    run_on_error = true

    authentication {
      aws_oidc {
        account_id         = "$$AWS_ACCOUNT_ID$$"
        plan_iam_role_arn  = "arn:aws:iam::$$AWS_ACCOUNT_ID$$:role/$$HOOK_ROLE$$"
        apply_iam_role_arn = "arn:aws:iam::$$AWS_ACCOUNT_ID$$:role/$$HOOK_ROLE$$"
      }
    }
  }
}
```

## 6. Fetch the secret and post to Slack

Create `.gruntwork/hooks/slack-notify.sh`. It fetches the webhook URL, reads the run context from the [Hooks API](/2.0/reference/pipelines/hooks-api) environment variables to build a message, and posts it to Slack:

```bash
#!/usr/bin/env bash
set -euo pipefail

# The authentication block has already authenticated the hook to AWS,
# so the AWS CLI reads the webhook URL directly.
webhook_url=$(aws ssm get-parameter \
  --name "/$$SLACK_WEBHOOK_PARAM$$" \
  --with-decryption \
  --query "Parameter.Value" \
  --output text)

# Read run context provided by Pipelines.
repository="$PIPELINES_HOOK_CTX_REPOSITORY"
actor="$PIPELINES_HOOK_CTX_ACTOR"
status="$PIPELINES_HOOK_CTX_ACTION_STATUS"

if [ "$status" = "succeeded" ]; then
  text="✅ Deploy of $repository by $actor succeeded."
else
  text="❌ Deploy of $repository by $actor failed."
fi

# Build the JSON payload safely and post it to the Slack webhook.
payload=$(jq -n --arg text "$text" '{text: $text}')
curl --fail --silent --show-error \
  -X POST \
  -H 'Content-type: application/json' \
  --data "$payload" \
  "$webhook_url"
```

This hook writes no output files, so Pipelines reports it as a `pass`. (Heads up: with `set -euo pipefail` and curl's `--fail`, a failed secret lookup or Slack post exits non-zero and fails the run; handle those cases in your script if you want it to pass regardless.) To also leave a comment on the pull/merge request, see [Writing a Hook](/2.0/docs/pipelines/guides/hooks/writing-a-hook).

## What you'll see

After your next merge to a deploy branch, Pipelines runs the apply and then this hook. Your team receives a Slack message reporting who deployed and whether it succeeded or failed.

## Related documentation

- [Authentication & Secrets](/2.0/docs/pipelines/guides/hooks/authentication) - how the `authentication` block gives the hook access to the secret.
- [Writing a Hook](/2.0/docs/pipelines/guides/hooks/writing-a-hook) - authoring hooks from scratch.
- [Hooks API](/2.0/reference/pipelines/hooks-api) - the environment variables the script reads.

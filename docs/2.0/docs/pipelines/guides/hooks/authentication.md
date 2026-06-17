# Authentication & Secrets

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

A hook often needs to call a cloud API or reach an external service: to inspect live resources, fetch a secret, or post a notification. The [`authentication`](/2.0/reference/pipelines/configurations-as-code/api#authentication-block) block on an [`after_hook`](/2.0/reference/pipelines/configurations-as-code/api#after_hook-block) gives the hook's `execute` command a cloud identity to do this. When it is present, Pipelines authenticates and makes the resulting credentials available to the hook before running its command. When it is omitted, the hook runs with no cloud credentials.

## Cloud credentials

The `authentication` block authenticates the hook against a cloud provider. It supports AWS, Azure, and GCP through their OIDC blocks (`aws_oidc`, `azure_oidc`, `gcp_oidc`), as well as a `custom` block that runs your own command to obtain credentials. Each provider takes a separate identity for plan and for apply: Pipelines authenticates with the plan identity when the hook runs after a `plan`, and the apply identity when it runs after an `apply`. The two can be the same or different.

Once the hook is authenticated, the provider's CLIs and SDKs work inside it with no further configuration. Configure the block for your provider:

<Tabs groupId="cloud-provider">
<TabItem value="aws" label="AWS" default>

```hcl
repository {
  after_hook "inspect_resources" {
    commands = ["plan"]
    execute  = [".gruntwork/hooks/inspect-resources.sh"]

    authentication {
      aws_oidc {
        account_id         = "123456789012"
        plan_iam_role_arn  = "arn:aws:iam::123456789012:role/pipelines-plan"
        apply_iam_role_arn = "arn:aws:iam::123456789012:role/pipelines-apply"
      }
    }
  }
}
```

</TabItem>
<TabItem value="azure" label="Azure">

```hcl
repository {
  after_hook "inspect_resources" {
    commands = ["plan"]
    execute  = [".gruntwork/hooks/inspect-resources.sh"]

    authentication {
      azure_oidc {
        tenant_id       = "a-tenant-id"
        subscription_id = "a-subscription-id"
        plan_client_id  = "plan-client-id"
        apply_client_id = "apply-client-id"
      }
    }
  }
}
```

</TabItem>
<TabItem value="gcp" label="GCP">

```hcl
repository {
  after_hook "inspect_resources" {
    commands = ["plan"]
    execute  = [".gruntwork/hooks/inspect-resources.sh"]

    authentication {
      gcp_oidc {
        workload_identity_provider_id = "projects/123456789012/locations/global/workloadIdentityPools/pipelines-pool/providers/pipelines-provider"
        plan_service_account_email    = "pipelines-plan@my-gcp-project.iam.gserviceaccount.com"
        apply_service_account_email   = "pipelines-apply@my-gcp-project.iam.gserviceaccount.com"
      }
    }
  }
}
```

</TabItem>
<TabItem value="custom" label="Custom">

```hcl
repository {
  after_hook "inspect_resources" {
    commands = ["plan"]
    execute  = [".gruntwork/hooks/inspect-resources.sh"]

    authentication {
      custom {
        auth_provider_cmd = "./scripts/auth-provider.sh"
      }
    }
  }
}
```

</TabItem>
</Tabs>

For setting up each provider and the full set of fields, see [Authenticating to the Cloud](/2.0/docs/pipelines/concepts/cloud-auth/index.md) and the [`authentication` block reference](/2.0/reference/pipelines/configurations-as-code/api#authentication-block).

## Secrets

Pipelines does not load secrets into a hook for you. It is up to the hook author to decide how a secret is stored and retrieved. What the `authentication` block provides is the context, a cloud identity, that lets the hook retrieve the secret itself at runtime.

The pattern is the same whatever your provider: store the secret in a secret store, grant the hook's identity permission to read it, and have the hook fetch it at runtime using the credentials the `authentication` block already provides. The secret never appears in your configuration or the hook script.

For a worked example using AWS and SSM Parameter Store, see [Example: Slack Deploy Notification](/2.0/docs/pipelines/guides/hooks/slack-deploy-notification). For other ways to manage and supply secrets across Pipelines, see [Managing Secrets in your Pipelines](/2.0/docs/pipelines/guides/managing-secrets).

## Related documentation

- [Writing a Hook](/2.0/docs/pipelines/guides/hooks/writing-a-hook)
- [`authentication` block reference](/2.0/reference/pipelines/configurations-as-code/api#authentication-block)
- [Authenticating to the Cloud](/2.0/docs/pipelines/concepts/cloud-auth/index.md)

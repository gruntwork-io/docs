# Custom Authentication

Pipelines supports custom authentication mechanisms through the `custom` authentication block, allowing you to integrate with any cloud provider or service that Terragrunt needs to interact with.

:::warning

This is a more advanced feature, and is not recommended for most users if they have a viable alternative listed in [Authenticating to the Cloud](/2.0/docs/pipelines/concepts/cloud-auth/index.md).

Using custom authentication provides more flexibility in how authentication is handled, but it also requires more responsibility from users to ensure that the authentication being used is secure and does not expose sensitive information.

If you are not sure if custom authentication is right for you, please contact Gruntwork support.

:::

## How custom authentication works

Pipelines supports custom authentication via Terragrunt's [auth provider command](https://terragrunt.gruntwork.io/docs/features/authentication/#auth-provider-command) feature. When you configure a `custom` authentication block, Pipelines will execute the command specified in the `auth_provider_cmd` attribute, and pass the output of that command to Terragrunt (with the output expected to match the schema documented in Terragrunt's documentation for the auth provider command feature).

Your authentication provider command should output a JSON response to stdout that follows the schema expected by Terragrunt:

```json
{
  "awsCredentials": {
    "ACCESS_KEY_ID": "",
    "SECRET_ACCESS_KEY": "",
    "SESSION_TOKEN": ""
  },
  "awsRole": {
    "roleARN": "",
    "sessionName": "",
    "duration": 0,
    "webIdentityToken": ""
  },
  "envs": {
    "ANY_KEY": "any_value"
  }
}
```

All top-level objects are optional, and you can provide multiple. The `envs` object is particularly useful for setting cloud provider-specific environment variables.

## Configuring custom authentication

Custom authentication is defined using environments specified in HCL configuration files in the `.gruntwork` directory at the root of your repository.

### Basic configuration

```hcl title=".gruntwork/environments.hcl"
environment "my_custom_environment" {
  filter {
    paths = ["my-custom-provider/*"]
  }

  authentication {
    custom {
      auth_provider_cmd = "./scripts/auth-provider.sh"
    }
  }
}
```

### Path resolution behavior

The `auth_provider_cmd` attribute supports flexible path resolution:

#### 1. Relative paths (recommended)

When you specify a relative path, Pipelines first looks for the file relative to your `.gruntwork` directory at the root of your repository:

```hcl
custom {
  auth_provider_cmd = "./scripts/auth-provider.sh"
}
```

Expected location: `.gruntwork/scripts/auth-provider.sh`

If the file is not found in a path relative to the `.gruntwork` directory (you can also use paths that start with `..` to go out of the `.gruntwork` directory), Pipelines will use the path as-is, allowing Terragrunt to resolve it relative to the unit directory.

#### 2. Absolute paths

Absolute paths are used exactly as specified:

```hcl
custom {
  auth_provider_cmd = "/usr/local/bin/auth-provider"
}
```

#### 3. Commands in PATH

You can also reference commands available in your system's PATH:

```hcl
custom {
  auth_provider_cmd = "my-custom-auth-provider --method=gcp --project=my-project"
}
```

### Example authentication scripts

#### Google Cloud Platform

```bash title=".gruntwork/scripts/gcp-auth.sh"
#!/bin/bash
set -e

# Authenticate using gcloud and get access token
ACCESS_TOKEN=$(gcloud auth print-access-token)

# Output credentials in the format expected by Terragrunt
cat <<EOF
{
  "envs": {
    "GOOGLE_OAUTH_ACCESS_TOKEN": "$ACCESS_TOKEN"
  }
}
EOF
```

Configuration:

```hcl title=".gruntwork/environments.hcl"
environment "gcp_environment" {
  filter {
    paths = ["gcp-project/*"]
  }

  authentication {
    custom {
      auth_provider_cmd = "./scripts/gcp-auth.sh"
    }
  }
}
```

#### Cloudflare

```bash title=".gruntwork/scripts/cloudflare-auth.sh"
#!/bin/bash
set -e

# Acquire a Cloudflare API token
# This is just an example of how to acquire a Cloudflare API token from a secrets manager.
# You can use any method you like to set environment variables like this,
# but you are encouraged never to hardcode secrets in your repository.
CLOUDFLARE_API_TOKEN=$(aws secretsmanager get-secret-value --secret-id cloudflare-api-token --query SecretString --output text)

# Output credentials in the format expected by Terragrunt
cat <<EOF
{
  "envs": {
    "CLOUDFLARE_API_TOKEN": "$CLOUDFLARE_API_TOKEN",
  }
}
EOF
```

Configuration:

```hcl title=".gruntwork/environments.hcl"
environment "cloudflare_environment" {
  filter {
    paths = ["cloudflare/*"]
  }

  authentication {
    custom {
      auth_provider_cmd = "./scripts/cloudflare-auth.sh"
    }
  }
}
```

## Best practices

These are some general best practices you should keep in mind as you implement custom authentication.

1. **If possible, use OIDC**: Use OIDC when possible to avoid storing long-lived credentials in your CI/CD environment.
2. **Store scripts in version control**: Keep your authentication scripts in the `.gruntwork/scripts/` directory so they're versioned with your infrastructure code
3. **Handle errors gracefully**: Ensure your authentication scripts exit with non-zero status codes on failure
4. **Use secure credential storage**: Don't hardcode secrets in your scripts; use secure secret management systems such as GitHub Actions Secrets, GitLab Secrets, AWS Secrets Manager, etc.
5. **Test your scripts**: Validate that your authentication scripts work in both development and CI/CD environments
6. **Document requirements**: Clearly document any prerequisites (installed tools, environment variables, etc.) needed for your authentication scripts, and test for them.

## Troubleshooting

If your custom authentication isn't working:

1. **Check script permissions**: Ensure your authentication script is executable (`chmod +x`)
2. **Validate JSON output**: Test your script manually and verify it outputs valid JSON
3. **Check PATH**: If using commands in PATH, ensure they're available in your CI/CD environment
4. **Review logs**: Check Pipelines and Terragrunt logs for authentication-related error messages
5. **Test locally**: Run your authentication script in the same environment where Terragrunt executes

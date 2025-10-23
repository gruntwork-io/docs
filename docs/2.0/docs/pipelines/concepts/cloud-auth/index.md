# Authenticating to the Cloud

Pipelines supports secure authentication to various cloud providers using industry-standard protocols. This section covers the authentication mechanisms and configurations required to enable Pipelines to manage your cloud infrastructure.

## Overview

Cloud authentication in Pipelines is built on the principle of least privilege and uses modern authentication protocols like [OpenID Connect (OIDC)](https://en.wikipedia.org/wiki/OpenID) to establish secure, temporary credentials. This approach eliminates the need to store long-lived credentials in your CI/CD environment while maintaining robust security.

## Key Concepts

- **Identity Providers**: External services (like GitHub or GitLab) that can verify identity
- **OpenID Connect (OIDC)**: A protocol that allows secure authentication between services
- **Temporary Credentials**: Short-lived access tokens that expire automatically
- **Role-Based Access Control (RBAC)**: Permissions granted based on specific roles rather than static user accounts

## Supported Cloud Providers

Currently, Pipelines supports authentication to the following cloud providers:

- [AWS](/2.0/docs/pipelines/concepts/cloud-auth/aws) - AWS authentication using OIDC
- [Azure](/2.0/docs/pipelines/concepts/cloud-auth/azure) - Azure authentication using OIDC
- [Custom](/2.0/docs/pipelines/concepts/cloud-auth/custom) - Custom authentication you can implement yourself

## Security Best Practices

When configuring cloud authentication:

1. **Use OIDC when possible** - Avoid storing long-lived credentials
2. **Apply least privilege** - Grant only the minimum permissions required
3. **Rotate credentials regularly** - For long-lived credentials that cannot use OIDC
4. **Monitor access logs** - Keep track of authentication events and access patterns
5. **Isolate environments** - Isolate environments (dev, staging, prod) in separate containers (e.g. accounts, subscriptions, projects) to limit the impact of a breach

## Next Steps

Choose your cloud provider from the list above (or select "Custom" if your cloud provider isn't listed, or you have custom authentication requirements) to learn more about how Pipelines authentication works.

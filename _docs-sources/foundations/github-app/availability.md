# Availability

The availability of the Gruntwork.io GitHub App is something Gruntwork will endeavor to maximize. Core to the design of the app is that day-to-day operations do not depend on the availability of the app, however.

Any downtime of Gruntwork services will not impact the ability of your team to manage infrastructure using Gruntwork products.

## App Only Features

The following features of the Gruntwork.io GitHub App will be unavailable during downtime:

- **GitHub App Linking**: In order to link a Gruntwork.io GitHub App installation to the [Gruntwork Developer Portal](https://app.gruntwork.io), the service backing the GitHub app must be available and operating correctly.
- **Gruntwork Pipelines Comments**: While Pipelines will allow for IaC updates in a degraded state without the availability of the GitHub App, comments are a feature that rely on the availability of the app for the best experience.
- **Gruntwork Pipelines Drift Detection**: Drift detection requires the availability of the GitHub App to function correctly.

## Fallback

In order to ensure that the availability of the Gruntwork.io GitHub App is not something that can impair the ability of users to drive infrastructure updates, the legacy mechanism of authenticating with GitHub using [Machine users](../../pipelines/security/machine-users.mdx) is supported.

Configuring the `PIPELINES_READ_TOKEN`, `INFRA_ROOT_WRITE_TOKEN` and `ORG_REPO_ADMIN_TOKEN` where necessary will result in Pipelines using the legacy mechanism to authenticate with GitHub, rather than the Gruntwork.io GitHub App.

Using these fallback tokens will ensure that Pipelines can continue to perform operations like:

- Plan on Pull Request open.
- Apply on Pull Request merge.
- Destroy on Pull Request merge.


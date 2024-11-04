# Self-hosting the library

:::caution

Self-hosting Gruntwork Library is only available with a Gruntwork Enterprise subscription.

:::

We recommend accessing Gruntwork Library directly through our private repos hosted at https://github.com/gruntwork-io. However if your company requires that all Terraform modules are hosted internally, we offer a tool called [repo-copier](https://github.com/gruntwork-io/repo-copier) to support this use case.

## What is repo-copier?

Repo Copier is a CLI tool that copies all the data in our private GitHub repos (including code, GitHub issues, GitHub pull requests, and releases) to a version control system operated by you, the customer. This gives you full access to Gruntwork Library without having to use GitHub.com directly. To learn more, see https://github.com/gruntwork-io/repo-copier.

## What version control systems are supported?

Repo-copier supports copying the Gruntwork repos to your own GitHub.com org, GitHub Enterprise, BitBucket Server, and GitLab.com. We may add support for additional systems in the future.

## Can I use Artifactory or Nexus?

Repo-copier only works with version control systems like GitHub, GitLab, and BitBucket Server. Version control systems include support for not only hosting code, but also issues, pull requests, release tags, and release assets.

By contrast, artifact management tools like Artifactory or Nexus can store release assets and even support Terraform module registry functionality, however they don't capture all the metadata, such as issues and pull requests that engineers need to gain full value of the code and all the community activity around it.

## Can I just fork the repos myself?

You're welcome to do this, but it doesn't solve the full problem. A fully self-hosted solution must meet all the following requirements:

- As Gruntwork posts updates, those updates propagate to your hosted version automatically.
- Your copy must include not only the code, but all the metadata, including issues, pull requests, release tags, and release assets.
- All internal cross-references to github.com/gruntwork-io must be updated to point to the new hosting URL.

## How do I contribute changes back to Gruntwork if I self-host?

Contribute your changes directly to our GitHub.com repos. Those changes will then propagate back to your locally hosted copy!

# Self-hosting the Library

:::caution

Self-hosting the Gruntwork IaC Library is only available with a Gruntwork Enterprise subscription.

:::

We recommend accessing the Gruntwork IaC Library directly through our private repositories hosted at https://github.com/gruntwork-io. However, if your organization requires hosting all Terraform modules internally, you can use Gruntwork's [repo-copier](https://github.com/gruntwork-io/repo-copier) to meet this requirement.

## What is repo copier?
Repo Copier is a command-line tool that copies all content from Gruntwork’s private GitHub repositories—including code, GitHub issues, pull requests, and releases—to a version control system you operate. It enables full access to the Gruntwork IaC Library without requiring direct use of GitHub.com. For more details, refer to https://github.com/gruntwork-io/repo-copier.

## Supported version control systems
Repo Copier supports the following version control systems:

- Your own GitHub.com organization
- GitHub Enterprise
- BitBucket Server
- GitLab.com

We may introduce support for additional systems in future releases.

## Can I Use Artifactory or Nexus?
Repo Copier works exclusively with version control systems like GitHub, GitLab, and BitBucket Server. Version control systems not only host code but also include support for issues, pull requests, release tags, and release assets.

In contrast, artifact management tools like Artifactory or Nexus can store release assets and provide Terraform module registry functionality. However, they do not capture the essential metadata—such as issues, pull requests, and community activity—that is critical for gaining the full value of the library.

## Can I manually fork the repositories?
While you can manually fork the repositories, this approach does not fully address all self-hosting requirements. A complete self-hosted solution must satisfy the following criteria:

- Updates posted by Gruntwork must propagate automatically to your internally hosted version.
- Your copy must include the source code and all related metadata, such as issues, pull requests, release tags, and release assets.
- All internal cross-references to `github.com/gruntwork-io` must be updated to point to your new hosting URL.

## Contributing changes back to Gruntwork
To contribute changes while self-hosting, submit your changes directly to Gruntwork’s repositories on GitHub.com. Once merged, those updates will propagate to your self-hosted version automatically.

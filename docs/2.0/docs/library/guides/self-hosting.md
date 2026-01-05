# Self-hosting the IaC Library

:::caution

Self-hosting the Gruntwork IaC Library is only available with a Gruntwork Enterprise subscription.

:::

We recommend accessing the Gruntwork IaC Library directly through our private repositories hosted at [https://github.com/gruntwork-io](https://github.com/gruntwork-io). However, if your organization requires hosting all Terraform modules internally, you can use Gruntwork's [repo-copier](https://github.com/gruntwork-io/repo-copier) to meet this requirement.

## What is repo-copier?
Repo Copier is a command-line tool that copies all content from Gruntwork’s private GitHub repositories — including code, GitHub issues, pull requests, and releases — to a version control system you operate. It enables full access to the Gruntwork IaC Library without requiring direct use of GitHub.com. For more details, refer to https://github.com/gruntwork-io/repo-copier.

## Supported version control systems
Repo Copier supports the following version control systems:

- Your own GitHub.com organization
- GitHub Enterprise Server
- BitBucket Server
- GitLab.com

We may introduce support for additional systems in future releases.

## Can I use Artifactory or Nexus?
Repo Copier works exclusively with version control systems like GitHub, GitLab, and BitBucket Server. These systems not only host code but provide features such as issue tracking, pull requests, release tags, and release assets.

In contrast, artifact management tools like Artifactory and Nexus are primarily used for storing release assets and offering Terraform module registry functionality. However, they lack essential metadata — such as issues, pull requests, and community activity — that are critical for gaining the full value of the library. 

## Can I manually fork the repositories?
Manually forking the repositories is an option, but it does not fully meet all self-hosting requirements. 
A complete self-hosted solution must satisfy the following criteria:

- Updates posted by Gruntwork must propagate automatically to your internally hosted version.
- Your copy must include the source code and all related metadata, such as issues, pull requests, release tags, and release assets.
- All internal cross-references to `github.com/gruntwork-io` must be updated to point to your new hosting URL.

## Contributing changes back to Gruntwork
To contribute changes while self-hosting, submit your updates directly to Gruntwork’s repositories on GitHub.com. Once your changes are merged, they will automatically sync with your self-hosted version. 


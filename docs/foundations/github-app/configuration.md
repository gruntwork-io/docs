# Configuration

## Infrastructure Live Root Repositories

DevOps Foundations treats certain repositories as especially privileged in order to perform critical operations like vending new AWS accounts and creating new repositories. These repositories are called "infrastructure live root repositories" and you can configure them in the [GitHub Account section](https://app.gruntwork.io/account?scroll_to=github-app) for your organization in the Gruntwork developer portal **if you are a designated administrator**.

![Root Repository Configuration](/img/devops-foundations/github-app/root-repo-config.png)

The Gruntwork.io GitHub App will cross reference this list when attempting to perform these privileged operations. If the repository is not listed here, the Gruntwork.io GitHub App will not be able to perform these operations on your behalf.

Keeping this list up to date is critical to ensure the Gruntwork.io GitHub App can perform its duties in and only in the repositories you trust as the "root" of your infrastructure management.

For more information, see the [relevant architecture documentation](../iac-foundations/architecture.md#infrastructure-live-root).



<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "c355fd80f04a7ba6f15755fc671d2e88"
}
##DOCS-SOURCER-END -->

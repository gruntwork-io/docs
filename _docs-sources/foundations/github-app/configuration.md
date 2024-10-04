# Configuration

## Infrastructure Live Root Repositories

DevOps Foundations treats certain repositories as especially privileged in order to perform critical operations like vending new AWS accounts and creating new repositories. These repositories are called "infrastructure live root repositories" and you can configure them in the `Account` section in your organization developer portal.

<!-- TODO: Add screenshot -->

The Gruntwork.io GitHub App will cross reference this list when attempting to perform these privileged operations. If the repository is not listed here, the Gruntwork.io GitHub App will not be able to perform these operations on your behalf.

Keeping this list up to date is critical to ensure the Gruntwork.io GitHub App can perform its duties in and only in the repositories you trust as the "root" of your infrastructure management.

For more information, see the [relevant architecture documentation](../iac-foundations/architecture.md#infrastructure-live-root).


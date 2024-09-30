# Configuration

## Infrastructure Root Repositories

DevOps Foundations treats certain repositories as especially privileged in order to perform critical operations like vending new AWS accounts and creating new repositories. These repositories are called "infrastructure root repositories" and you can configure them in the `Account` section in your organization developer portal.

<!-- TODO: Add screenshot -->

The Grunty app will cross reference this list when attempting to perform these privileged operations. If the repository is not listed here, the Grunty app will not be able to perform these operations on your behalf.

Keeping this list up to date is critical to ensure the Grunty app can perform its duties in and only in the repositories you trust as the "root" of your infrastructure management.

For more information, see the [relevant architecture documentation](). <!-- TODO: Add link to infrastructure-live-root architecture docs. -->



<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "74f58cb78568482714286c19bed9d4c0"
}
##DOCS-SOURCER-END -->

# Be Judicious with New Features

Introducing new OpenTofu features can enhance module development and expand functionality. However, adopting these features may require users to upgrade to newer OpenTofu versions. This requirement can create challenges for organizations that are unable to update OpenTofu promptly but still wish to utilize the latest module versions.

Modules within the library often have interdependencies. If a module update introduces a dependency on a newer OpenTofu version, **all related modules must be updated** to reflect this version requirement.

## Guidelines for adopting new features

Evaluate the following factors when determining whether to implement a new feature:

### Feature stability and maturity

Well-established features typically offer greater compatibility with existing environments. While incorporating newer features is not discouraged, prioritizing stable and widely adopted features helps maintain consistency and reliability.

### Impact on module users

Upgrading OpenTofu versions may sometimes be necessary. For instance, the [`moved`](https://opentofu.org/docs/v1.6/language/modules/develop/refactoring/#moved-block-syntax) block allows seamless upgrades even when resource addresses change. When the benefits of upgrading outweigh the effort of manual adjustments, adopting newer versions is recommended.




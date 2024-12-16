# Be Judicious With New Features

New OpenTofu features can streamline module authoring and provide more features, but may also require that consumers adopt newer OpenTofu versions. This requirement can pose challenges for organizations that cannot upgrade OpenTofu versions promptly, but want to keep using the latest version of our modules.

Modules in the Library often depend on each other. All dependent modules must be updated to require a newer OpenTofu version if a dependent module update requires a newer OpenTofu version.

## How to Decide to Use Newer Features

Consider the following when deciding whether to adopt a new feature:

### Age of Feature

Older features are more likely to be compatible with existing consumer environments. While it is unnecessary to avoid newer features altogether, prioritizing well-established features ensures broader compatibility.

### Impact on Module Consumers

Requiring upgrades is sometimes justified. For example, the [moved](https://opentofu.org/docs/v1.6/language/modules/develop/refactoring/#moved-block-syntax) block enables seamless upgrades even when resource addresses change. If upgrading provides greater benefits than manual interventions, adopting newer versions can be a practical choice.

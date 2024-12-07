# Be Judicious With New Features

New OpenTofu features can streamline module authoring but may also require consumers to adopt newer OpenTofu versions. This requirement can pose challenges for organizations that cannot upgrade promptly.

Modules in the Library often depend on each other. All dependent modules must be updated if a module update requires a newer OpenTofu version.

## How to Decide to Use Newer Features

Consider the following when deciding whether to adopt a new feature:

### Age of Feature

Older features are more likely to be compatible with existing consumer environments. While it is unnecessary to avoid newer features altogether, prioritizing well-established features ensures broader compatibility.

### Impact on Module Consumers

Requiring upgrades can sometimes be justified. For instance, the [moved](https://opentofu.org/docs/v1.6/language/modules/develop/refactoring/#moved-block-syntax) block enables seamless upgrades despite resource address changes. If upgrading provides greater benefits than manual interventions, it may be worthwhile to require newer versions.

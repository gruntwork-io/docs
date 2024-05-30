# Be Judicious With New Features

Sometimes new features in OpenTofu are released that make module authoring more convenient.

Leveraging them can make it convenient author modules, but it can be really inconvenient for module consumers, as they can be inadvertently forced into adopting the newer version of OpenTofu that supports those new features.

## How to Decide to Use Newer Features

Some individual judgement is required to decide when this trade-off is worth making.

Qualities of OpenTofu features to keep in mind when deciding if they should be adopted for modules include:

### Age of Feature

The older the feature, the more likely it is that consumers of the module will be able to use it without updating their versions of OpenTofu.

It is not necessarily a good idea to only use features that are excessively old, as you don't want consumers to miss out on the latest and greatest from OpenTofu.

### Impact to Module Consumers

Even when features are relatively new, however, there can be advantages to requiring that consumers upgrade OpenTofu to adopt newer versions of modules.

Take, for example, the [moved](https://opentofu.org/docs/v1.6/language/modules/develop/refactoring/#moved-block-syntax) block. Using this block can allow consumers to upgrade to newer versions of modules despite addresses of resources in modules changing without manual intervention. If the cost to a consumer to manually move state is greater than the cost of requiring that they upgrade to `v1.1` of Terraform at the earliest, it can be worth it to introduce the `moved` block in a release.


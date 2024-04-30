# Deprecation

The previous version of Gruntwork Pipelines used the `infrastructure-pipelines` repository to manage infrastructure changes. This repository has been deprecated in a new architecture of Pipelines, which no longer requires maintaining a separate repository for initiating infrastructure changes.

Documentation on the architecture used in the previous version of Gruntwork Pipelines can be found [here](../architecture/).

This section will preserve the legacy documentation for the `infrastructure-pipelines` repository, and provide guidance on how to migrate to the new version of Pipelines.

If you have any questions or need help, please reach out to us at <support@gruntwork.io>.

## Do I Have to Migrate to the New Version?

While we do recommend migrating to the new version of Pipelines, we understand that this might not be trivial for all users. If you are unable to migrate to the new version of Pipelines, you can continue using the previous version of Pipelines that used the `infrastructure-pipelines` repository until you are ready to make the switch.

However, please note that we will no longer be actively maintaining the architecture that uses the `infrastructure-pipelines` repository, and new features will only be added to the new version of Pipelines.

## How Do I Migrate to the New Version?

Follow the steps outlined in the [migration guide](../../pipelines/upgrading/upgrading-from-infrastructure-pipelines) to migrate to the new version of Pipelines.

## Why Was This Deprecation Necessary?

As we at Gruntwork continue to improve and refine our products, we look to continuously optimize our offerings to provide an experience for our customers that is maximally easy to interact with, without compromising on security or capability. The new architecture of Pipelines is designed to be easier to secure, customize and maintain, while also providing a more streamlined experience for users.

### The `infrastructure-pipelines` Repository

One of the core design decisions for the previous version of Pipelines was to use a separate repository, `infrastructure-pipelines`, to manage infrastructure changes. This repository contained the configuration for the pipelines, as well as the code that executed infrastructure changes.

The reason for this design was to provide a clear separation between the infrastructure code and the code that executed infrastructure changes. This separation was intended to make it easier to manage infrastructure software separate from the software that executed infrastructure changes. In addition, it provided a mechanism for clearly isolating the access to sensitive workloads in a dedicated repository, which was the only repository that had access to cloud resources.

#### Confusion and Complexity

However, this design also introduced complexity in managing multiple repositories, and computational and cognitive overhead in synchronizing activity across an `infrastructure-live` repository that contained the infrastructure code, and the `infrastructure-pipelines` repository that contained the pipeline configuration.

Customers found this architecture to be confusing to reason about when introducing infrastructure changes, as logs had to be read across multiple repositories to understand the full context of a change.

#### Scaling Limits

The architecture also had scaling limits, as the `infrastructure-live` repository had to continuously poll the `infrastructure-pipelines` repository as changes were being planned and applied in order for users to have real-time feedback on their changes. This polling mechanism required making multiple API calls to GitHub per change, which could lead to rate limiting issues for large organizations with a high volume of changes.

#### Security

As the feature set in this architecture advanced, and customers desired more granular access controls, the responsibility for customers to manage access controls across multiple repositories became a significant burden.

The architecture made it difficult to manage access controls across multiple repositories with infrastructure code, as the origin of each infrastructure change had to be cryptographically verified to ensure that privilege escalation was not possible, via a presigned `GetCallerIdentity` call.

#### Lack of Flexibility

Collocating all the pipelines software in a single repository also limited the flexibility of customers to customize their pipelines, as all changes had to be made in the `infrastructure-pipelines` repository. This made it difficult for customers to extend the functionality of Pipelines to meet their specific use cases, as any change to the `infrastructure-pipelines` repository resulted in a change to the pipelines for all users, and prevented customers from pulling in updates to the upstream `infrastructure-pipelines` template.

#### Upgradeability

Customers found it difficult to upgrade to new versions of Pipelines, as the `infrastructure-pipelines` repository was a monolithic repository that contained all the pipelines configuration. This made it difficult to upgrade to new versions of Pipelines, as any change to the `infrastructure-pipelines` repository required a manual merge of the changes into the customer's repository.

## What's Next?

In the next iteration on our Pipelines architecture, we have addressed these issues and more. Customers can now manage their infrastructure in the same repository, and reference the Pipelines configuration hosted by Gruntwork in the [pipelines-workflows](https://github.com/gruntwork-io/pipelines-workflows) repository at a specific reference remotely.

### Upgradeable

This allows for customers to focus on the code that matters, their infrastructure, without having to worry about managing the software for executing infrastructure changes. To upgrade to a new version of Pipelines, customers can simply update the reference to the workflow configuration, and use the latest version of Pipelines without having to manually merge any changes.

### Flexible

Customers are also free to customize their Pipelines configurations more easily, as they can fork the workflow, and use a bespoke version of the Pipelines configuration that meets their specific use cases. As long as bespoke functionality has not deviated too significantly from the upstream Pipelines configuration, customers can pull in updates simply by [syncing their forks](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/syncing-a-fork). In the event that this isn't possible due to merge conflicts, customers have reference to the upstream Pipelines configuration as a public repository to manually resolve merge conflicts.

In addition, the underlying actions that make up the Pipelines configuration are also public, so customers can inject their own logic in between the steps taken by Pipelines to customize workflows to their specific use cases, without losing the ability to pull in upstream updates to those actions.

### Secure

The new architecture is also easier for customers to secure due to the fact that all infrastructure changes are initiated from the same repository that contains the infrastructure code. This makes it easier to manage access control, as IAM trust policies are configured to only trust the `infrastructure-live` repository that needs access.

In addition to this adjustment, we've also introduced a new `infrastructure-live-access-control` to explicitly provide a forum for collaborative access control management between central platform teams and engineers working on particular workloads. This repository contains the configuration for any IAM access delegated to other repositories in the organization, and can be centrally managed by a platform team.

To reflect the change in the way Pipelines is now architected, the default `infrastructure-live` repository vended for new customers is now named `infrastructure-live-root`. This rename is done to signal that this repository is the root of all infrastructure management, and that only heavily restricted access should be granted to this repository (similar to the `root` user in Unix systems).

### Scalable

In our internal testing, we've found that the new architecture is more scalable, as the `infrastructure-live` repository no longer has to poll the `infrastructure-pipelines` repository for changes. As a consequence, we've removed the rate limiting we've self imposed on the number of changes that can be executed concurrently. Customers can expect that changes will be executed in a more timely manner, and that the Pipelines experience will be more responsive.

### Simple

Customers can also expect a much easier time reasoning about their infrastructure changes, as all the context for a change is now accessible from a single repository. This makes it easier to understand the full context of a change, and to debug issues that may arise during the execution of a change.

## Conclusion

We at Gruntwork are excited to bring you this new architecture for Pipelines, and we hope that it will make your experience with managing infrastructure changes more enjoyable and productive. We're always looking for feedback on how we can improve our products, so please don't hesitate to reach out to us at <feedback@gruntwork.io>.

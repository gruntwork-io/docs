# Deprecation

This version of Gruntwork Pipelines uses the `infrastructure-pipelines` repository to manage infrastructure changes. This repository has been deprecated in a new architecture of Pipelines, which no longer requires maintaining a separate repository for initiating infrastructure changes.

Documentation on the architecture used in this version of Gruntwork Pipelines can be found [here](../architecture/index.md).

This section will preserve the legacy documentation for the `infrastructure-pipelines` repository, and provide guidance on how to migrate to the new version of Pipelines.

If you have any questions or need help, please reach out to us at [support@gruntwork.io](mailto:support@gruntwork.io).

## Do I Have to Migrate to the New Version?

While we do recommend migrating to the new version of Pipelines, we understand that this might not be trivial for all users. If you are unable to migrate to the new version of Pipelines, you can continue using the previous version of Pipelines that used the `infrastructure-pipelines` repository until you are ready to make the switch.

:::tip Don't be alarmed
We know it can feel overwhelming to be told that you should migrate to a new version of a tool you've been using. It's even more overwhelming when it's a tool that's critical to your infrastructure management. The good news is that the version of Pipelines that uses `infrastructure-pipelines` is a perfectly good tool for managing infrastructure changes.

You should not feel like you have to migrate to the new version to mitigate a security or stability risk.

The new version of Pipelines is designed to make your life easier, but it's not a requirement for using Pipelines.
:::

However, please note that we will no longer be actively maintaining the architecture that uses the `infrastructure-pipelines` repository, and new features will only be added to the new version of Pipelines.

If you still need documentation for the previous version of Pipelines, you can find it [here](./index.md).

## How Do I Migrate to the New Version?

Follow the steps outlined in the [migration guide](../../2.0/docs/pipelines/previous-versions/upgrading-from-infrastructure-pipelines.md) to migrate to the new version of Pipelines.

## Why Was This Deprecation Necessary?

At Gruntwork, we continue to improve and refine our products, optimizing for an experience that is maximally simple to interact with, without compromising on security or capability. The new architecture of Pipelines is designed to be easier to secure, customize and maintain, while also providing a more streamlined experience for our customers.

### The `infrastructure-pipelines` Repository

One of the core design decisions for the previous version of Pipelines was to use a separate repository, `infrastructure-pipelines`, to manage infrastructure changes. This repository contained the configuration for Pipelines, as well as the software that executed infrastructure changes.

The reason for this design was to provide a clear separation between infrastructure code and Pipelines code. This separation was intended to make it easier to manage infrastructure software independent from the software that executed infrastructure changes. In addition, it provided a mechanism for isolating access to sensitive workloads in a dedicated repository (`infrastructure-pipelines`), which was the only repository that had access to cloud resources.

#### Confusion and Complexity

However, this design also introduced complexity in managing multiple repositories. The computational and cognitive overhead in synchronizing activity across an `infrastructure-live` repository that contained the infrastructure code, and an `infrastructure-pipelines` repository that contained the Pipelines configuration became a burden for customers.

Customers also found this architecture to be confusing to reason about when introducing infrastructure changes, as logs had to be read across multiple repositories to understand the full context of a change.

#### Scaling Limits

The architecture also had scaling limits, as the `infrastructure-live` repository had to continuously poll the `infrastructure-pipelines` repository when changes were being planned or applied in order for users to have real-time feedback on their changes. This polling mechanism required making multiple API calls to GitHub per change, which could lead to rate limiting issues for organizations regularly creating a large volume of changes.

#### Security

As the feature set in this architecture advanced, and customers desired more granular access controls, the responsibility for customers to manage access controls across multiple repositories became a significant burden.

The architecture made it difficult to manage access controls across multiple repositories with infrastructure code, as the origin of each infrastructure change had to be cryptographically verified to ensure that privilege escalation was not possible, via a presigned `GetCallerIdentity` call.

Customers with a single `infrastructure-live` repository did not experience this issue, as all changes where initiated from a single repository, and the origin of the change was clear, meaning that privilege granted to the `infrastructure-pipelines` repository was directly linked to the privilege of the `infrastructure-live` repository. Pipelines is able to mitigate this issue by leveraging the presigned `GetCallerIdentity` call to ensure that privilege for a given `infrastructure-live` repository is not escalated, but this mechanism is cumbersome, and was a source of confusion.

We strive to provide a security posture that is not only technically secure, but also easy to reason about for maintenance, compliance and auditing purposes. Part of this re-architecture was undertaken to simplify the security model for Pipelines, and to provide more comprehensive tooling for customers to manage access control.

#### Lack of Flexibility

Collocating all the pipelines software in a single repository also limited the flexibility of customers looking to customize their pipelines, as all changes had to be made in the `infrastructure-pipelines` repository. This made it difficult for customers to extend the functionality of Pipelines to meet their specific use cases, as any change to the `infrastructure-pipelines` repository resulted in a change to the pipelines for all `infrastructure-live` repositories, and prevented customers from pulling in updates from the upstream `infrastructure-pipelines` template.

Any updates made in the `infrastructure-pipelines` repository also made it harder to reason about where a change originated from, as customer changes were mixed in with Gruntwork provided software in the same repository.

#### Upgradeability

Customers found it difficult to upgrade to new versions of Pipelines, as the `infrastructure-pipelines` repository was a monolithic repository that contained all the pipelines configuration. This made it difficult to upgrade to new versions of Pipelines, as any change to the `infrastructure-pipelines` repository required a manual merge of the changes into the customer's repository.

There was also no clear mechanism for customers to realize that a new version of Pipelines was available, as the software in `infrastructure-pipelines` had to be manually updated to the latest version when a new version was released, and to be updated correctly to avoid breaking changes.

## What's Next?

In the next iteration on our Pipelines architecture, we have addressed these issues and more. Customers can now manage their infrastructure in the same repository they are currently using, and reference the Pipelines configuration hosted by Gruntwork in the [pipelines-workflows](https://github.com/gruntwork-io/pipelines-workflows) repository at a specific reference remotely.

### Upgradeable

This allows customers to focus on the code that matters, their infrastructure code, without having to worry about managing the software for executing infrastructure changes. To upgrade to a new version of Pipelines, customers can simply update the reference to the workflow configuration, and use the latest version of Pipelines without having to manually merge any changes.

e.g.

```yml
GruntworkPipelines:
  uses: gruntwork-io/pipelines-workflows/.github/workflows/pipelines-root.yml@v1.1.0
```

to

```yml
GruntworkPipelines:
  uses: gruntwork-io/pipelines-workflows/.github/workflows/pipelines-root.yml@v1.2.0
```

Customers now have two new capabilities to help them stay up to date with the latest version of Pipelines:

1. Dependabot integration: Customers can now leverage Dependabot to automatically create pull requests that suggest updates to the `pipelines.yml` file in their repositories. This will help customers stay up to date with the latest changes in Pipelines. Make sure to [read the release notes](https://github.com/gruntwork-io/pipelines-workflows/releases) before upgrading!
2. Major version tag: Customers can also use the unqualified major version tag to automatically receive the latest version of Pipelines without having to make any manual adjustments to the `pipelines.yml` file.

   e.g.

   ```yml
   GruntworkPipelines:
     uses: gruntwork-io/pipelines-workflows/.github/workflows/pipelines-root.yml@v1
   ```

More documentation on upgrading to the latest version of Pipelines can be found [here](../../2.0/docs/pipelines/guides/updating-pipelines.md).

### Flexible

Customers are also free to customize their Pipelines configurations more easily, as they can fork the workflow, and use a bespoke version of the Pipelines configuration that meets their specific use cases. As long as bespoke functionality has not deviated too significantly from the upstream Pipelines configuration, customers can pull in updates simply by [syncing their forks](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/syncing-a-fork). In the event that this isn't possible due to merge conflicts, customers have reference to the upstream Pipelines configuration as a public repository to manually resolve merge conflicts.

In addition, the underlying actions that make up the Pipelines configuration are also public, so customers can inject their own logic in between the steps taken by Pipelines to customize workflows to their specific use cases, without losing the ability to pull in upstream updates to those actions.

:::tip
If you intend on leveraging this functionality, make sure to read the documentation on [extending Pipelines](../../2.0/docs/pipelines/guides/extending-pipelines.md) to understand how to structure your custom workflows.
:::

### Secure

The new architecture is also easier for customers to secure due to the fact that all infrastructure changes are initiated from the same repository that contains the infrastructure code. This makes it easier to manage access control, as IAM role trust policies are configured to only trust the `infrastructure-live` repository that needs an appropriate level of access.

In addition to this adjustment, we've also introduced a new `infrastructure-live-access-control` repository to explicitly provide a forum for collaborative access control management between central platform teams and engineers working on particular workloads. This repository contains the configuration for any IAM access delegated to other repositories in the organization, and can be centrally managed by a platform team.

To reflect the change in the way Pipelines is now architected, the default `infrastructure-live` repository vended for new customers is now named `infrastructure-live-root`. This rename is done to signal that this repository is the root of all infrastructure management, and that only heavily restricted access should be granted to this repository (similar to the `root` user in Unix systems).

Explaining the security posture of Pipelines is now as simple as:

- The `infrastructure-live-root` repository can initiate GitHub Actions workflows that are allowed to assume read-only permissions via a `root-pipelines-plan` role upon opening/creating a pull request, and read-write permissions via a `root-pipelines-apply` role on a pull request merge.
- Any other access that needs to be granted to interact with cloud resources can be delegated via the `infrastructure-live-access-control` repository, which comes pre-configured with the boilerplate necessary for granting least privilege access to create similar plan/apply roles for other repositories to assume.

### Scalable

In our internal testing, we've found that the new architecture is more scalable, largely due to the fact that the `infrastructure-live` repository no longer has to poll the `infrastructure-pipelines` repository for changes. As a consequence, we've removed the rate limiting we've self imposed on the number of changes that can be executed concurrently. Customers can expect that changes will be executed in a more timely manner, and that the Pipelines experience will be more responsive.

### Simple

Customers can also expect a much easier time reasoning about their infrastructure changes, as all the context for a change is now accessible from a single repository. This makes it easier to understand the full context of a change, and to debug issues that may arise during the execution of a change.

## Conclusion

Gruntwork is excited to bring you this new architecture for Pipelines, and we hope that it will make your experience with managing infrastructure changes more enjoyable and productive. We're always looking for feedback on how we can improve our products, so please don't hesitate to reach out to us at [feedback@gruntwork.io](mailto:feedback@gruntwork.io).


<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "ecb848f92776d655af21dd8ebaa993f0"
}
##DOCS-SOURCER-END -->

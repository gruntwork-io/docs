# Core Concepts

Terragrunt
[v0.32.0](https://github.com/gruntwork-io/terragrunt/releases/tag/v0.32.0)
introduced the feature of multiple `include` blocks, which allowed you to have
different tiers of common configuration. Before this change, you were limited to
only a single set of included configuration, which was typically used for
project level configuration that affected all modules in your project (e.g., the
remote state configuration). This was limiting because oftentimes you had
additional tiers of common configuration, such as at the component level. For
example, the configuration for a database typically does not differ much between
environments, with the only differences being to the storage and instance size.
Yet each environment ends up having the same configuration copied with only
these minor differences between them.

This limitation led to a lot of duplication in component configuration across
the Reference Architecture. Over time, the difference between environments
typically widen, especially at the application level, but for common
infrastructure such as VPCs and Databases, the environment level deviation is
rarely significant. This makes it difficult to manage the individual components
across updates, as you need to reflect the same changes in every environment,
rather than making the change in one place.

Multiple `include` blocks allow you to extract common configuration across the
different environments for a particular component. This common configuration is
then imported to be combined with the project level configuration to manage that
component.

Using these features, we can dramatically reduce duplication in the Terragrunt
code in the Gruntwork Reference Architecture, [cutting down the footprint by
48.5%](https://github.com/gruntwork-io/terraform-aws-service-catalog/pull/1060).

The best part about these features is that you can take advantage of them with
changes that will be isolated to Terragrunt configuration files (syntactic
changes vs semantic changes). This means that you won’t be making changes to the
underlying behavior of the Terraform code or how Terraform is called. As such,
there will be no need for rolling out the changes with `apply`, or performing
any state migrations to avoid backward incompatibilities, making it a relatively
low risk change.

To learn more about the multiple `include` feature, including a use case
walkthrough, refer to [the official Terragrunt
documentation](https://terragrunt.gruntwork.io/docs/features/keep-your-terragrunt-architecture-dry/).


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Local File Copier","hash":"29aa2eab851b8a4a259acf265a6c2315"}
##DOCS-SOURCER-END -->

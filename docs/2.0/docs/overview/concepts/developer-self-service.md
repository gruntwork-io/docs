# Developer Self Service

Developer Self-Service lets developers deploy and manage their apps and infrastructure themselves, without always needing help from the platform team.

Effective developer self-service then requires a set of patterns, practices, rules, constraints and governance pre-baked into the modules that engineers use to represent their infrastructure. Some teams call these modules "approved blueprints" or "blessed modules".  At Gruntwork we generally refer to this as the **Infrastructure Catalog** that lives in a repository we call `infrastructure-catalog` (previously `infrastructure-modules`).

Inside the `infrastructure-catalog` we recommend following the [infrastructure-live pattern](https://docs.gruntwork.io/2.0/docs/overview/concepts/infrastructure-live#separating-modules-from-live-infrastructure) and storing catalog module code in a folder called `modules`.

## Why self-service

### Benefits to Developers

Developers benefit by avoiding "reinventing the wheel". They're able to leverage pre-built, tested, and secure modules that have already been approved for use at your organization. Handoffs between platform and development teams are reduced resulting in faster delivery and fewer bottlenecks.

### Benefits to Platform Teams

Platform teams are able to operate effectively at scale. They retain centralized control of reusable modules, and are able to focus on standardizing testing, security, compliance, and governance. The day to day workload of assisting Developers with infrastructure code is reduced, while retaining oversight.

## Terragrunt Catalog

Terragrunt has [native support](https://terragrunt.gruntwork.io/docs/features/catalog/) for an interface that allows developers to browse modules using a terminal based UI, and then [scaffold](https://terragrunt.gruntwork.io/docs/features/scaffold/) out new modules using [boilerplate](https://github.com/gruntwork-io/boilerplate). All repositories vended as part of Devops Foundations include a `catalog` configuration in the root `terragrunt.hcl` file that points to a starter `infrastructure-catalog` repository that provides examples on how to further build out the catalog.

### Using Catalog

Within a DevOps Foundations repository, create a new directory to contain your new terragrunt unit, then navigate to this directory.

Running `terragrunt catalog` will open an interactive terminal UI allowing you to browse the available units from your `infrastructure-catalog`.

When browsing your catalog, you can select a unit, and hit **S** to scaffold it out.
The scaffold command does the following automatically:

- Download and template the unit into the current directory.

- Figures out the module URL and the latest version (tag) available, and fills that into the source URL.

- Parse all of the module’s input variables and generate placeholders in the inputs = { } block to make it easy to fill those variables in.

Once you've replaced these placeholders, commit the new unit, and push it to a new Pull Request for [Gruntwork Pipelines](/2.0/docs/pipelines/concepts/overview) to being planning the changes.

## Self-Service Best Practices

### Versioning

Implement a consistent versioning strategy, such as [semantic versioning](https://semver.org/), for all modules in your infrastructure catalog. This allows you to:

* **Track Changes:** Maintain a clear history of module updates and modifications.
* **Enable Rollbacks:** Revert to previous versions in case of issues or errors.
* **Ensure Clarity:** Use semantic versioning (e.g., v1.2.3) to communicate the nature of changes (major, minor, patch).

Use [Gruntwork Patcher](/2.0/docs/patcher/concepts/) to efficiently roll out breaking changes across your infrastructure and minimize disruption.

### Infrastructure Tagging and Labeling

A central catalog allows core teams to implement a consistent tagging and labeling strategy across all infrastructure components. This enables:

* **Cost Tracking and Allocation:** Assign costs to specific teams or projects based on tags.
* **Access Control:** Use tags to manage and control access to resources.
* **Automation:** Automate tasks like provisioning, termination, and reporting based on tags.
* **Monitoring and Alerting:** Filter and group resources for monitoring and alerting purposes.


### Wrapper Modules / Services

Create wrapper modules or services to simplify complex deployments and configurations. These wrappers can:

* **Encapsulate Best Practices:** Bundle security, compliance, and operational best practices into reusable units.
* **Reduce Boilerplate:** Minimize repetitive code and configuration for developers.
* **Standardize Deployments:** Ensure consistency and reduce errors across different deployments.
* **Abstract Complexity:** Hide the underlying complexity of infrastructure from developers, allowing them to focus on application logic.


### Using Stacks to keep developer code DRY

Organize infrastructure into stacks to promote code reusability and maintainability. Terragrunt Stacks allow you to:

* **Group Related Resources:** Manage interconnected units as a single entity.
* **Reduce Code Duplication:** Avoid repeating the same code across different environments or projects.
* **Promote Modularity:** Break down complex infrastructure into smaller, manageable components.
* **Simplify Management:** Deploy, update, and destroy entire stacks with ease.
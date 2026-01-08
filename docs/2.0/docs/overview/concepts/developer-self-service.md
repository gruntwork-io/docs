# Developer Self-Service

Developer self-service enables developers to deploy and manage their applications and infrastructure independently, without constant reliance on the platform team.

Effective self-service requires patterns, practices, rules, constraints, and governance to be embedded within the modules developers use to define their infrastructure. These modules are often referred to as "approved blueprints" or "blessed modules." At Gruntwork, we call this the **Infrastructure Catalog**, which resides in a repository named `infrastructure-catalog` (formerly `infrastructure-modules`).

Within the `infrastructure-catalog`, we recommend following the [infrastructure-live pattern](https://docs.gruntwork.io/2.0/docs/overview/concepts/infrastructure-live#separating-modules-from-live-infrastructure) and organizing catalog module code in a folder named `modules`.

## Why self-service

### Benefits to developers

Self-service allows developers to avoid "reinventing the wheel" by using pre-built, tested, and secure modules that are already approved for use. This reduces handoffs between platform and development teams, speeding up delivery and minimizing bottlenecks.

### Benefits to platform teams

Self-service enables platform teams to operate efficiently at scale. By centralizing control over reusable modules, platform teams can focus on standardizing testing, security, compliance, and governance. The workload of assisting developers with infrastructure code is reduced, while maintaining oversight and control.

## Terragrunt catalog

Terragrunt provides [native support](https://terragrunt.gruntwork.io/docs/features/catalog/) for an interface that allows developers to browse modules using a terminal-based UI and [scaffold](https://terragrunt.gruntwork.io/docs/features/scaffold/) new modules with [boilerplate](https://github.com/gruntwork-io/boilerplate). Repositories vended through Gruntwork AWS Accelerator include a `catalog` configuration in the root `terragrunt.hcl` file, pointing to a starter `infrastructure-catalog` repository with examples for expanding the catalog.

### Using catalog

In a Gruntwork AWS Accelerator repository, create a new directory for the new Terragrunt unit, then navigate to this directory.

Running `terragrunt catalog` opens an interactive terminal UI to browse available units in the `infrastructure-catalog`.

To scaffold a unit, select it and press **S**. The scaffold process automatically:

- Downloads and templates the unit into the current directory.
- Determines the module URL and latest version (tag), populating the source URL.
- Parses the module’s input variables and generates placeholders in the `inputs = { }` block for easy configuration.

After replacing the placeholders, commit the new unit and push it to a new Pull Request for [Gruntwork Pipelines](/2.0/docs/pipelines/concepts/overview) to begin planning the changes.

## Self-service best practices

### Versioning

Adopt a consistent versioning strategy, such as [semantic versioning](https://semver.org/), for all modules in the infrastructure catalog. This approach helps:

- **Track changes:** Maintain a clear history of updates and modifications.
- **Enable rollbacks:** Revert to previous versions if issues arise.
- **Ensure clarity:** Use semantic versioning (e.g., v1.2.3) to communicate the scope of changes (major, minor, patch).

Leverage [Gruntwork Patcher](/2.0/docs/patcher/concepts/) to roll out breaking changes efficiently while minimizing disruptions.

### Infrastructure tagging and labeling

A centralized catalog facilitates consistent tagging and labeling across infrastructure components, enabling:

- **Cost tracking and allocation:** Assign costs to specific teams or projects using tags.
- **Access control:** Manage and control resource access with tags.
- **Automation:** Automate tasks such as provisioning, termination, and reporting based on tags.
- **Monitoring and alerting:** Group and filter resources for effective monitoring and alerting.

### Wrapper modules / services

Use wrapper modules or services to simplify deployments and configurations. Wrappers can:

- **Encapsulate best practices:** Integrate security, compliance, and operational standards into reusable modules.
- **Reduce boilerplate:** Eliminate repetitive code for developers.
- **Standardize deployments:** Ensure consistency and reduce errors across deployments.
- **Abstract complexity:** Hide infrastructure complexity, allowing developers to focus on application logic.


### Using stacks to keep developer code DRY

Organize infrastructure into [stacks](https://terragrunt.gruntwork.io/docs/features/stacks/) to enhance reusability and maintainability. Terragrunt Stacks enable you to:

- **Group related resources:** Manage interconnected units as a single entity.
- **Reduce code duplication:** Avoid repeating code across environments or projects.
- **Promote modularity:** Break complex infrastructure into manageable components.
- **Simplify management:** Deploy, update, and destroy stacks with ease.



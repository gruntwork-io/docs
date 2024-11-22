# Developer Self Service

In platform teams, DevOps, and Infrastructure as Code (IaC) ecosystems, Developer Self-Service ensures development teams can independently deploy and manage their applications and required infrastructure without constant handoffs to platform teams.

It follows that there is a set of patterns, practices, rules, constraints and governance pre-baked into the modules that engineers use to represent their infrastructure. Some teams call these modules "approved blueprints" or "blessed modules".  At Gruntwork we generally refer to this as the **Infrastructure Catalog** that lives in a repository we call `infrastructure-catalog` (previously `infrastructure-modules`).

Inside the `infrastructure-catalog` we recommend following the [infrastructure-live pattern](https://docs.gruntwork.io/2.0/docs/overview/concepts/infrastructure-live#separating-modules-from-live-infrastructure) and storing catalog module code in a folder called `modules`.

## Why self-service

### Benefits to Developers

Developers benefit by avoiding "reinventing the wheel". They're able to leverage pre-built, tested, and secure modules, that have already been approved for use at your organization. Handoff's between platform and development teams are reduced resulting in faster delivery and less bottlenecks.

### Benefits to Platform Teams

Platform Teams are able to operate effectively at scale. They retain centralized control of reusable modules, and are able to focus on standardizing testing, security, compliance, and governance. The day to day workload from assisting Developers with infrastructure is reduced, while retaining oversight.

## Terragrunt Catalog

Terragrunt has [native support](https://terragrunt.gruntwork.io/docs/features/catalog/) for an interface that allows developers to browse modules using a terminal based UI, and then [scaffold](https://terragrunt.gruntwork.io/docs/features/scaffold/) out new modules using [boilerplate](https://github.com/gruntwork-io/boilerplate). All repositories vended as part of Devops Foundations include a `catalog` configuration in the root `terragrunt.hcl` file that points to a starter `infrastructure-catalog` repository that provides examples on how to further build out the catalog.

### Using Catalog

Within a DevOps Foundations repository, create a new directory to contain your new terragrunt unit, then navigate to this directory.

Running `terragrunt catalog` will open an interactive terminal UI allowing you to browse the available units from your `infrastructure-catalog`.

When browsing your catalog, you can select a unit, and hit **S** to scaffold it out.
The scaffold command does the following automatically:

- Download and template the unit into the current directory.

- Figure out the module URL and the latest version (tag) available, and fill that into the source URL.

- Parse all of the module’s input variables and generate placeholders in the inputs = { } block to make it easy to fill those variables in.

Once you've replaced these placeholders, commit the new unit, and push it to a new Pull Request for Pipelines to being planning the changes.

## Self-Service Best Practices

### Versioning

Always version modules to track changes and allow safe rollbacks. Encourage semantic versioning for clarity.

Use Patcher to roll out breaking changes across your workforce.

### Infrastructure Tagging and Labeling

TODO

### Wrapper Modules / Services

TODO

### Using Stacks to keep developer code DRY

TODO
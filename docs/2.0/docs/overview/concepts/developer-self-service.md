# Developer Self Service

In the context of platform teams, devops or IaC the idea of developer self service is that there is a set of patterns, practices, rules, constraints and governance pre-baked into the modules that engineers use to represent their infrastructure.  Some teams call these modules "approved blueprints" or "blessed modules".  At Gruntwork we generally refer to this as the Infrastructure Catalog that lives in a repository we call `infrastructure-catalog` (previously `infrastructure-modules`).

Inside the `infrastructure-catalog` we recommend following the [infrastructure-live pattern](https://docs.gruntwork.io/2.0/docs/overview/concepts/infrastructure-live#separating-modules-from-live-infrastructure) and storing catalog module code in a folder called `modules`.

## Why self-service

### Benefits to developers - not reinventing the wheel building services

### Benefits to platform team - central testing, security, compliance, and governance

## Terragrunt Catalog
Terragrunt has [native support](https://terragrunt.gruntwork.io/docs/features/catalog/) for an interface that allows developers to browse modules using a terminal based UI, and then [scaffold](https://terragrunt.gruntwork.io/docs/features/scaffold/) out new modules using [boilerplate](https://github.com/gruntwork-io/boilerplate). All repositories vended as part of Devops Foundations include a `catalog` configuration in the root `terragrunt.hcl` file that points to a starter `infrastructure-catalog` repository that provides examples on how to further build out the catalog.

## Self-Service Best Practices

### Versioning

### Infrastructure Tagging and Labeling

### Wrapper Modules / Services

### Using Stacks to keep developer code DRY
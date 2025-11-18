---
sidebar_position: 6
title: Authoring
---

# Authoring Infrastructure Modules

Infrastructure modules have both _authors_ and _consumers_. In this section, we talk about infrastructure module authors.

The **infrastructure module author** is the person who creates or defines the infrastructure module.

## Infrastructure module author lifecycle

Infrastructure module authors experience the following lifecycle:

1. **Create a module** - Create the infrastructure module based on a recurring need from stakeholders.
2. **Update a module** - Update the infrastructure module to reflect the latest best practices.
3. **Retire a module** - When the infrastructure module is no longer recommended or needed, gracefully retire it.

## Creating infrastructure modules

When infrastructure module authors create a new module, they need to answer two questions:

1. From where should I source the infrastructure module?
2. How should I implement the infrastructure module?

### Sourcing infrastructure modules

Authors have three main options for sourcing infrastructure modules:

1. **Build in-house** - You build the infrastructure module yourself from scratch. This gives you full control,  but also the highest maintenance burden. (high control, low convenience)
2. **Use open source infrastructure modules** - You find community-authored infrastructure modules that work for your needs, review them, and vet them as an official infrastructure modules for your organization. This gives you low control, but also outsources maintenance to others (low control, high convenience)
3. **Use commercial infrastructure modules** - You purchase a commercial infrastructure module library like the [Gruntwork AWS IaC Library](https://docs.gruntwork.io/2.0/docs/library/concepts/overview). This gives you moderate control (you can engage the vendor if needed) and outsources maintenance to others (moderate control, high convenience).

### Consuming infrastructure modules

If you source a module from a third party (open source or commercial), you have three options for how your users can consume it:

1. **Direct reference** - You decide that users will directly reference the infrastructure module. For example, you choose a commercial infrastructure module and decide your [infrastructure module instances](/2.0/way/solution/patterns/types#infrastructure-module-instances) will directly reference the vendor's GitHub repo. 
2. **Wrapper module** - You write an inhouse module that calls the third-party module. This gives you the ability to customize the third-party module without having to re-implement or maintain it. Users will now directly access this wrapper module. For example, you use an open source AWS Lambda module, but write your own Acme AWS Lambda module that uses the open source AWS Lambda module.
3. **Fork** - You fork the third-party module and maintain your own copy, at which point this is a direct reference, but based on a third-party starting point. Platform engineers are often tempted to do this when a single variable or output is missing, but they can massively underestimate the amount of work required to maintain the module over time. Only do this as an absolute last resort. Try working with the module author to incorporate your desired change first.

Note that if you build your infrastructure module in-house, the only way to implement your module is by building it as a direct reference module.

### Two layers of abstraction

When building infrastructure modules, you deal with two somewhat competing needs:

- **Developers want convenience.** Application developers want often complex infrastructure modules that "just work" out of the box.
- **Platform engineers want maintainability.** Platform engineers want small, narrowly scoped infrastructure modules that are easy to maintain.

The way to address this tension is to build infrastructure modules at two different layers of abstractions:

1. **Low-level modules.** Low-level modules should be narrowly scoped, and optimized for reusability and maintainability.
2. **High-level modules.** High-level modules should be broadly scoped, and optimized for convenience. Importantly, high-level modules should be built out of low-level modules.

For example, you might have a low-level module that only creates a load balancer. A load balancer on its own isn't terribly useful, but as we'll see shortly, you can use the load balancer as a "building block" to create more complex modules.

To give an example of a high-level module, suppose that you have application teams who want to create their own Kubernetes clusters. In this case, the high-level module we need is a "Kubernetes cluster." But we build that high-level module out of one or more low-level modules like load balancer, K8s control plane, K8s managed workers, container logs, karpenter, ArgoCD, and more. 

The key idea here is that you can _compose_ lower-level modules into one or more higher-level modules. This enables you to reuse a single lower-level module (like one to create an S3 bucket) in many scenarios, and thus lower overall maintenance surface area. It also makes testing easier because you can aggressively test lower-level modules and build more limited tests for higher-level modules.

Of course, even this approach has its tradeoffs because now any update to a lower-level module has to "propagate" to higher-level modules, which can be cumbersome. Fortunately, there are tools available to mitigate this. For example, [Terragrunt Stacks](https://terragrunt.gruntwork.io/docs/features/stacks/) explicitly defines a higher-level infrastructure module out of lower-level modules, making it far easier to manage individual OpenTofu module version updates.

:::note
You can see a real-world example of the low-level/high-level split in the [Gruntwork AWS IaC Library](https://docs.gruntwork.io/2.0/docs/library/concepts/overview#two-types-of-modules), which has both "building block modules" (low-level modules) and "service modules" (high-level modules).
:::

### Testing infrastructure modules

It's important to write automated tests to validate your infrastructure modules. For example, [Gruntwork Terratest](https://github.com/gruntwork-io/terratest) is a Go library that you can use to automatically apply an OpenTofu/Terraform module, run tests against the deployed infrastructure, and tear down the deployed infrastructure.

:::note
For more information, see the section on [automated testing](https://books.gruntwork.io/books/fundamentals-of-devops/testing-your-systems#automated_testing) in the _Fundamentals of DevOps and Software Delivery: A hands-on guide to deploying and managing software in production_ by our co-founder, Yevgeniy Brikman.
:::

### Compliant infrastructure modules

It can be helpful to scan your infrastructure modules against known security policies so that you assert the _compliance status_ of an infrastructure module.

In some cases, you can build an infrastructure module so that it can only ever be configured in a compliant way. In other cases, you can only build a "possibly compliant" module, which means that for the right variable inputs, the module will indeed pass a given compliance check.

Testing modules for compliance can be tricky because you need to identify which compliance standard you care about, identify the relevant rule within that standard that might apply to the module, write automated tests that launch the relevant module infrastructure, and then run the specific compliance checks against the deployed infrastructure.

This is the gold standard of compliant module checking, but frankly, it's a lot of work!

### Infrastructure module visualizations

Many teams like to include a visualization of their infrastructure modules so that consumers can see at a glance what architecture it uses and what resources it contains.

Once built, these visualizations are great. The challenge is in keeping them up to date. 

## Updating infrastructure modules

Once an infrastructure module is created, it needs to be updated from time-to-time. That in turn creates some other unique needs.

### Versioning

We recommend adopting [semantic versioning](https://semver.org/) for your infrastructure modules, where, given a version number `MAJOR.MINOR.PATCH`, you increment the:

- `MAJOR` version when you make a breaking change
- `MINOR` version when you add functionality in a backward-compatible manner
- `PATCH` version when you make a backward-compatible bug fix

But this guideline holds another fundamental tension because you'll also need to balance two somewhat competing concerns:

- **You want to limit the number of git repos you use.** Infrastructure modules are, by definition, written in code, and so they are stored in git repos. Each git repo involves some degree of overhead to manage, so ideally, you have a limited number of repos used to manage all your infrastructure modules. The ideal here is a single repo containing many modules.
- **You want meaningful new versions.**. Every time you make a change and assign a new version to a module update, you ideally want that new git repo tag to refer only to the new module, and not have any "empty" updates. The ideal here is one repo per module so that you never have empty versions.

But the ideals of "single repo containing many modules" and "one repo per module" are direct contradictions of each other. So what to do?

In our experience, the better option is to deal with empty versions and fewer git repos. Better yet, you can write tooling to automate nearly all aspects of empty versions (like your [IaC updater](/2.0/way/solution/platform/maintain/iac-updater)). There's also tooling available to manage many git repos at once (like our open source tool, [git-xargs](https://github.com/gruntwork-io/git-xargs)), but using these can be cumbersome. That's why we recommend fewer git repos at the expense of empty versions, mitigated by tooling.

### Propagating version updates

When you update a low-level infrastructure module, you often need to propagate that update to all the higher-level modules and infrastructure module instances that depend on it. This can become a significant maintenance burden, especially in large organizations with many modules.

To manage this effectively:

- **Use automation** - Tools like [Terragrunt's dependency management](https://terragrunt.gruntwork.io/docs/features/keep-your-terraform-code-dry/) or an [IaC updater](/2.0/way/solution/platform/maintain/iac-updater) can help automate the process of updating module versions across your infrastructure.
- **Batch updates** - Group related module updates together to reduce the number of change cycles.
- **Validate your updates** - Run tests after you update infrastructure modules or infrastructure module instances to validate that your modules still work as expected.

## Retiring infrastructure modules

Retiring infrastructure modules requires careful planning and communication to ensure a smooth transition for consumers. When an infrastructure module is no longer recommended or needed, follow these steps:

### Detecting when to retire a module

Infrastructure modules should be scheduled for retirement when ALL of the following are true:

- **Better alternatives exist** - A newer module or approach provides superior functionality, security, or maintainability, and
- **You cannot easily update the existing module** - The architecture of the module is such that upgrading it to reflect your latest opinions would be akin to creating a new module.

Separately, you might retire a module if it is simply not used very often. By reducing your surface area, you increase your team's velocity on the projects that are adding impact.

### Deprecation process

When you do retire a module, follow a gradual deprecation process:

1. **Announce deprecation** - Clearly communicate to all module consumers that the module is being deprecated, why it's being deprecated, and what the recommended alternative is.
2. **Set a timeline** - Give consumers a reasonable amount of time to migrate (typically 6-12 months for critical infrastructure).
3. **Update documentation** - Add clear deprecation warnings to the module's README and any relevant documentation.
4. **Provide migration guidance** - Create detailed migration guides showing consumers how to move from the deprecated module to the recommended alternative.
5. **Stop accepting new features** - Only accept critical bug fixes and security patches during the deprecation period.
6. **Monitor usage** - Track which teams are still using the deprecated module and reach out proactively to help them migrate.
7. **Remove the module** - Once usage drops to zero (or the timeline expires), archive or remove the module from your infrastructure module catalog.

## Next

You've made it through a lot of material! Now that your infrastructure module has been created, let's look at the infrastructure module consumer's experience.
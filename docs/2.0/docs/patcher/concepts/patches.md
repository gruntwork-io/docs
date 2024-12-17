# What is a Patcher Patch?

A Patch is a set of instructions Patcher executes to perform code transformations. This approach automates the adoption of breaking changes in infrastructure-as-code projects using tools like Terragrunt, OpenTofu, or Terraform. 

These instructions are delivered through a `yaml` file in the following format:

```yaml title=".patcher/patches/v1.0.0/my-patch/patch.yaml"
name: "<name-of-patch>"
description: "<description for patch>"
author: <your-name-here> <<your-email-address-here>>

# Optional dependencies. Terrapatch is a typical one
dependencies:
  - name: terrapatch
    version: "0.1.0"

# Steps necessary to resolve breaking changes
steps:
  - name: "<name-of-step>"
    run: <command-to-run>
  - name: "<name-of-second-step>"
    run: <second-command-to-run>
  # etc
```
[View an example patch in the CIS Service Catalog.](https://github.com/gruntwork-io/terraform-aws-service-catalog/blob/c3d5ede211fc3230a7d493ceea43622b337ee88a/.patcher/patches/v0.96.4/switch-to-cis-rds-module/patch.yaml)

## Module Consumers and Module Authors

Patcher is designed for two key personas:

- **Module Authors**: Write or update OpenTofu/Terraform modules.
- **Module Consumers**: Use OpenTofu/Terraform modules created by module authors, typically referenced in Terragrunt units (`terragrunt.hcl` files) or directly in Terraform/OpenTofu code.

## For Module Authors

Module authors often need to introduce breaking changes in their modules, which can create a challenging experience for module consumers who must manually update their code. Patcher simplifies this process by allowing module authors to include a patch YAML file that automates these updates.

When a module consumer executes a patch, their code is updated automatically to reflect changes such as adding or renaming variables, updating provider references, or applying other transformations defined in the patch. 

While module authors have the flexibility to write any command steps for patches—such as validating tool versions or using `sed` for find-and-replace operations—it is **strongly recommended** to use [`terrapatch`](https://github.com/gruntwork-io/terrapatch). Terrapatch is a Gruntwork tool that enables precise updates to Terraform/OpenTofu HCL files.

By investing a small amount of additional time in authoring a patch, module authors enable all module consumers to seamlessly adopt breaking changes without manual intervention.

## For Module Consumers

Module consumers typically reference specific versions of OpenTofu/Terraform modules to maintain consistency. Over time, as new versions of modules are released, consumer code can become outdated. In cases where updates introduce breaking changes, the code must be edited to ensure compatibility—this is where Patcher proves valuable.

Patcher automates updates by applying patches that incorporate breaking changes, reducing the manual effort required to keep infrastructure code current.

### Two Update Strategies

Patches can be applied using one of two strategies:

1. **Push Strategy**: Patcher proactively opens pull requests containing updates.
2. **Pull Strategy**: Users manually run the Patcher CLI to scan their repository and apply updates.

While the implementation details differ, the purpose remains the same: Patcher suggests changes to keep your infrastructure code up to date.

### Update Push Strategy

In the push strategy, Patcher automatically opens pull requests on a schedule you define. Pull requests can be grouped by parameters such as environment or module version. For example:

![Patcher PR Example](/img/patcher/pr-example.png)

To enable the push strategy, implement the [Patcher GitHub Action workflow](https://github.com/gruntwork-io/patcher-action). This action provides full control over your upgrade cadence. For safer updates, you can promote changes sequentially through environments like `dev`, `stage`, and `prod`. Refer to our guide on [promotion workflows](/2.0/docs/patcher/guides/promotion-workflows) for more details.

### Update Pull Strategy

In the pull strategy, users manually invoke the Patcher CLI to scan the repository and apply updates.
To begin, run the following command in the target repository:

```bash
$ patcher update ./
```

By default, the CLI operates interactively, presenting details of available updates:
![Patcher Update Interactive Mode](/img/patcher/interactive-update.png)
Alternatively, use `--non-interactive` mode to apply updates automatically:

```bash
$ patcher update --non-interactive
```
By default, Patcher does not open a pull request. However, changes are visible in version control, allowing you to create pull requests or integrate changes using your IaC workflow

### Examples Running `patcher update`
Here is a basic example:

```bash
$ cd <repo-root-directory>
# Show patches available for all directories
$ patcher update ./
```
For advanced usage, including automated PR creation, run:
```bash
$ patcher update --update-strategy next-safe --non-interactive --publish --pr-branch grunty/update-via-patcher --pr-title "[Patcher] Update All Dependencies to Next Safe"
```
For a complete list of options, refer to the [Patcher CLI Reference](/2.0/reference/patcher/index.md#update).

# Update Grouping & Pull Request Strategy
## Overview

Enterprise IaC repositories often reuse modules extensively across a single repository. This creates a situation where updating a dependent module version can result in multiple references requiring updates throughout the codebase. Unlike application codebases in environments like Java or Node.js—where a single version bump may involve minimal changes in files such as 'gradle.build' or p'ackage.json'—IaC repositories frequently repeat environments and dependencies across folders.
This repetition presents a challenge: when a dependency is updated, how should the changes be grouped into pull requests to balance efficiency and manageability?
The simplest approach is to create one pull request per dependency update. However, this can become unmanageable at scale. Patcher supports this approach but also offers more flexible options for grouping updates. Pull requests can be consolidated based on the following strategies:

- **Full-Consolidation**: A single pull request updates all dependencies across the repository.
- **No-Consolidation**: A separate pull request is created for each individual update.
- **Dependency-Only Consolidation**: A single pull request is created for each dependency, updating it across all environments.
- **Environment-Only Consolidation**: A single pull request is created for each environment, updating all dependencies within that environment.
- **(Environment x Dependency) Consolidation**: A single pull request is created for each dependency within each environment.

## Grouping Examples  
To demonstrate these strategies, consider the following example repository:
```
/dev/unit1/terragrunt.hcl -> dependency1@1.0.0
/dev/unit2/terragrunt.hcl -> dependency1@1.0.0
/dev/unit3/terragrunt.hcl -> dependency2@1.0.0
/prod/unit1/terragrunt.hcl -> dependency1@1.0.0
/prod/unit2/terragrunt.hcl -> dependency1@1.0.0
/prod/unit3/terragrunt.hcl -> dependency2@1.0.0
/prod/unit4/terragrunt.hcl -> dependency3@1.0.0
```
Assuming newer versions are available for all three dependencies, the strategies would result in:
- **Full-Consolidation**: One pull request updating all seven units.
- **No-Consolidation**: Seven separate pull requests, one per unit.
- **Dependency-Only Consolidation**: Three pull requests—one for each dependency. For example, 'dependency1' would be updated across both 'dev' and 'prod'.
- **Environment-Only Consolidation**: Two pull requests—one for all updates in 'dev' and one for all updates in 'prod'.
- **(Environment x Dependency) Consolidation**: Five pull requests—two for updates in 'dev' and three for updates in 'prod'.

## Terminology
* 'unit': A folder containing a 'terragrunt.hcl' file, representing a single OpenTofu state file. A unit may reference one or more modules as dependencies.
* 'dependency' (or 'target'): An OpenTofu module referenced using a 'ref' (typically a full source path and version) in a 'unit'. Patcher interprets semantic versioning for dependency updates.
* 'environment': A logical grouping of infrastructure representing application stages, such as 'dev' or 'prod'. Environments are generally organized as folders in the repository and include multiple units and dependencies.
* 'update': The action of modifying a dependency reference to use a newer version and accommodating any associated breaking changes.
:::info
As of November 2024, Patcher recognizes environments using folder groupings matched with glob patterns. For example, 'dev' may correspond to 'dev-*' folders and 'prod' to 'prod-*' folders. A more sophisticated environment definition using HCL syntax (similar to Pipelines) is planned for future releases. Let us know if this capability is important for your use case.
::
## Implementation Discussion
In CI workflows, pull requests are typically generated by first running patcher report to identify updates, followed by 'patcher update' to apply those updates. Patcher does not include a single option to specify grouping strategies by name. Instead, grouping is implemented through combinations of 'report' and 'update' command flags.

### Patcher Report
The 'patcher report' command accepts the '--include-dirs' flag, which filters updates based on matching glob patterns. This allows developers to limit updates to specific environments. By running 'patcher report' multiple times with different '--include-dirs' values, you can create distinct workflows for each environment.

The patcher report output is JSON-formatted and can be inspected or iterated over for further customization.

### Patcher Update
The 'patcher update' command accepts a '--target' flag, which specifies one or more dependencies to update. By running 'patcher update' with different '--target' values, you can control which dependencies are included in each pull request.

## Implementation Walkthrough

### Full-Consolidation
For full consolidation, omit the '--include-dirs' and '--target' arguments. This approach generates a single pull request containing all updates.

**Pseudocode:**
```
run patcher report
run patcher update
```
### No-Consolidation
To create one pull request per update, use the 'plan' output of 'patcher report' and iterate over each dependency and its instances.

**Pseudocode:**
```bash
run patcher report --output-plan plan.json
for each dependency in plan.json
    for each usage of the dependency:
        cd $(dirname usage.source.file)
        run patcher update --target $dependency.org/$dependency.repo/$dependency.module
```

### Dependency-Only Consolidation
To group by dependency, run 'patcher update' for each target without filtering environments.

**Pseudocode:**
```
run patcher report
for each $target in output
    run patcher update --target=$target
```


### Environment-Only Consolidation
To group updates by environment, use '--include-dirs' to filter by environment and run 'patcher update' without specifying targets.

**Pseudocode:**
```
for each $environment
    run patcher report -include-dirs=$environment
    run patcher update 
```

### (Environment x Dependency) Consolidation
To create pull requests for each dependency within specific environments, combine '--include-dirs' with '--target'.

**Pseudocode:**
```
for each $environment e.g., glob patterns like dev-* or prod-*)
  run patcher report --include-dirs=$environment
  for each $target output 
    run patcher update --target=$target
```


**Pseudocode:** 





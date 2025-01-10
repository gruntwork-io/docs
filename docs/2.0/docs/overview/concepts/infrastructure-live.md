# Recommended Folder Structure - Infrastructure Live

One common question from customers is how to structure their Terragrunt code effectively. Our document outlines Gruntwork's recommendations for determining _where_ your code should reside and _how_ to structure it to enhance comprehension, scalability, and development efficiency.


## Separating modules from live infrastructure

We recommend separating the _implementation_ of your OpenTofu/Terraform modules from the _usage_ of those modules by placing them in separate repositories. The key benefit of this approach is the ability to version your modules independently and run different versions across environments. For instance, you might use `v1.0.0` of an EKS module in `prod` while testing `v2.0.0` in `stage`. This separation typically involves at least two repositories:

- `modules`: This repository defines reusable modules. Each module acts as a "blueprint" that specifies a particular aspect of your infrastructure.
- `live`: This repository defines the live infrastructure for each environment (e.g., stage, prod, mgmt). It represents the "houses" built from the "blueprints" in the `modules` repository.


The next section focuses on structuring the `live` infrastructure repository.

## Live infrastructure repository

To achieve an organized codebase optimized for comprehension, scalability, and development speed, Gruntwork recommends a structured approach that organizes Terragrunt units by account, region, environment, and category.

### Suggested folder hierarchy

Below is an example of a recommended folder structure:

```
account
 └ _global
 └ region
    └ _global
    └ environment
       └ category
          └ resource
```

A comprehensive example of this folder structure is available in our [example `infrastructure-live` repository](https://github.com/gruntwork-io/terragrunt-infrastructure-live-example).

The following sections break down each level of the folder structure and explain their purpose.

### Accounts

At the highest level of the folder structure are directories representing each of your AWS accounts, such as `stage`, `prod`, and `mgmt`. For deployments consolidated in a single AWS account, you would typically have a single root-level folder (e.g., `main-account`).

### Regions

Within each account directory, subfolders represent AWS regions, such as `us-east-1`, `eu-west-1`, or `ap-southeast-2`, where resources are deployed. Additionally, a `_global` folder may exist to define resources applicable across all AWS regions in the account, such as IAM users, Route 53 hosted zones, or CloudTrail configurations.

### Environments

If you are deploying multiple environments for each region, you might organize units within regions into environments like `qa`, `stage`, or `prod`. Typically, each environment corresponds to a single AWS Virtual Private Cloud (VPC), providing isolation from other environments within the same account. A `_global` folder may also be included here to define resources shared across environments in the region, such as Route 53 A records, SNS topics, or ECR repositories.

Note that many organizations chose to isolate different environments by AWS account, and thus don't have a need for this level of gruanularity.

### Categories

Within each environment (or region, if there's a one-to-one mapping of account to environment), resources are grouped by category to maintain logical organization. Categories might include networking (e.g., VPCs), compute (e.g., EC2 instances), or services (e.g., EKS clusters). This categorization facilitates clarity and modularity when deploying infrastructure components.

### Resources

Each category folder contains the resources deployed within that environment, such as EC2 instances, databases, or load balancers. Each resource is represented by a dedicated directory and an associated `terragrunt.hcl` file (e.g., `vpc/terragrunt.hcl`). Proper "right-sizing" of these modules is essential to balance ease of understanding, security, and risk.

When determining module sizes, avoid overly large modules, as they can be cumbersome to manage, and overly small modules, which may increase the number of applies needed for provisioning. Instead, aim for logical groupings, such as modules for networking, data stores (e.g., RDS), orchestration tools (e.g., EKS), or individual applications managed by separate teams.

### State management

Gruntwork advises managing state on a per-resource basis. For example, if you have an account named `dev`, within region `us-east-1`, an environment named `dev`, and a Terragrunt unit for `networking/vpc` (path: `dev/us-east-1/dev/networking/vpc/terragrunt.hcl`), the corresponding remote state configuration would be `dev/us-east-1/dev/networking/vpc/tofu.tfstate`.

For additional guidance, see the Terragrunt documentation on [managing your state backend](https://terragrunt.gruntwork.io/docs/features/state-backend/).

### Global variables

A variable hierarchy is typically used with different levels for: global variables across accounts/environments, account-specific variables, region-specific variables, and category-specific variables. 

A common approach involves:

1. Storing reusable variables at the appropriate level in the hierarchy in `.hcl` files, such as `account.hcl`, `region.hcl`, or `networking.hcl`.
2. Using [`read_terragrunt_config`](https://terragrunt.gruntwork.io/docs/reference/built-in-functions/#read_terragrunt_config) and [`find_in_parent_folders`](https://terragrunt.gruntwork.io/docs/reference/built-in-functions/#find_in_parent_folders) functions to load variables from the appropriate location in the hierarchy.

For further options, see [includes](https://terragrunt.gruntwork.io/docs/features/includes/).

### Module defaults

To enhance code reusability within your `live` repository, Gruntwork recommends adopting the ["module defaults"](/2.0/docs/library/concepts/module-defaults) pattern. This approach helps to maintain a DRY (Don't Repeat Yourself) architecture in your Terragrunt configuration.


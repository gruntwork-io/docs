# Recommended Folder Structure - Infrastructure Live

A frequent question we get from customers is how to structure their Terragrunt code. In this document, we cover Gruntwork's recommendations for _where_ your code should live (and which code should live where) and _how_ to structure your code to optimize for comprehension, scale, and development speed.

## Separating modules from live infrastructure

We recommend separating the _implementation_ of your Terraform modules and the _usage_ of modules into separate repos. The primary reason is so you can version your modules and run different versions of those modules in different environments: e.g., you might run `v1.0.0` of your EKS module in `prod` while testing out `v2.0.0` of the EKS module in `stage`. This means your Terraform code will be spread out across (at least) two repositories:

- `modules`: This repo defines reusable modules. Think of each module as a “blueprint” that defines a specific part of your infrastructure.
- `live`: This repo defines the live infrastructure you’re running in each environment (stage, prod, mgmt, etc.). Think of this as the “houses” you built from the “blueprints” in the modules repo.

In the next section, we'll focus on how to organize your `live` infrastructure repository. Structuring your `modules` repository is outside of the scope of this document.

## Live infrastructure repository

To meet the goal of organizing code to optimize for comprehension, scale, and development speed. Gruntwork has developed an approach that structures code that organizes Terragrunt modules by account, region, environment, and category.

### Suggested folder hierarchy

Below is an example folder structure:

```
account
 └ _global
 └ region
    └ _global
    └ environment
       └ category
          └ resource
```

A full example of this structure can be seen in our [example `infrastructure-live` repo](https://github.com/gruntwork-io/terragrunt-infrastructure-live-example).

Next, we'll walk through each level of the folder structure and how it is used.

### Accounts

At the top level of the folder structure are folders for each of your AWS accounts, such as `stage`, `prod`, `mgmt`, etc. If you have everything deployed in a single AWS account, there will just be a single folder at the root (e.g. `main-account`).

### Regions

Within each account, there will be one or more AWS regions, such as `us-east-1`, `eu-west-1`, and `ap-southeast-2`, where you've deployed resources. There may also be a `_global` folder that defines resources that are available across all the AWS regions in this account, such as IAM users, Route 53 hosted zones, and CloudTrail.

### Environments

Within each region, there will be one or more "environments", such as `qa`, `stage`, etc. Typically, an environment will correspond to a single AWS Virtual Private Cloud (VPC), which isolates that environment from everything else in that AWS account. There may also be a `_global` folder that defines resources that are available across all the environments in this AWS region, such as Route 53 A records, SNS topics, and ECR repos.

### Categories

Within each Environment, you deploy all the resources for that environment, such as EKS clusters and Aurora databases, using Terraform modules. Groups or similar modules inside an environment are further organized by the overarching category they relate to, such as networking (VPCs) and services (EKS workers).

### Resources

Within each environment, you deploy all the resources for that environment, such as EC2 Instances, Auto Scaling Groups, ECS Clusters, Databases, Load Balancers, and so on. These are represented as a directory and a `terragrunt.hcl` file. For example `vpc/terragrunt.hcl`. Care should be taken to ensure these modules are "right sized" to optimize for ease of understanding, security, and risk (e.g., smaller modules have lower blast radius).

When working to "right size" a module, consider that [large modules are considered harmful](https://blog.gruntwork.io/5-lessons-learned-from-writing-over-300-000-lines-of-infrastructure-code-36ba7fadeac1#302b), but that you also don't want a single module to deploy a single resource, due to the number of applies it would require to provision an entire environment. You need to find a good balance, grouping things that are typically deployed together, have similar deployment cadences, have similar risk/security profiles, have common team ownership, etc.

For example, you might have one module that handles all your networking; another module that sets up your data stores (e.g., RDS); another module that handles your orchestration tool (e.g., EKS); and perhaps a bunch of individual modules to deploy apps, each owned by a separate team.

### State management

Gruntwork recommends storing state _per resource_. As an example, if you had an account named `dev` in region `us-east-1`, with the environment `dev`, and a Terragrunt module defined in the category `networking` and resource `vpc` (for a full path of `dev/us-east-1/dev/networking/vpc/terragrunt.hcl`), your remote state would be configured for `dev/us-east-1/dev/networking/vpc/terraform.tfstate`.

Please see the Terragrunt documentation on [keeping your remote state configuration dry](https://terragrunt.gruntwork.io/docs/features/keep-your-remote-state-configuration-dry/) for more information.

### Global variables

Typically, you have a hierarchy of variables: some that are truly global across all accounts/environments; some that apply across a single account/environment; some that apply across a single region; some that apply across a set of services; etc.

There are multiple ways to handle this, depending on the use case, but the most common pattern is:

1. Put reusable variables at the right "level" within [your hierarchy](#suggested-folder-hierarchy) in an `.hcl` file: e.g., `account.hcl`, `region.hcl`, `networking.hcl`, etc.
1. Use [`read_terragrunt_config`](https://terragrunt.gruntwork.io/docs/reference/built-in-functions/#read_terragrunt_config) and [`find_in_parent_folders`](https://terragrunt.gruntwork.io/docs/reference/built-in-functions/#find_in_parent_folders) to automatically load the data from the file from the appropriate place in the hierarchy.

For more details and the other options, see [Keep your Terragrunt Architecture DRY](https://terragrunt.gruntwork.io/docs/features/keep-your-terragrunt-architecture-dry/).

### Module defaults

Now that you have your accounts, environments, categories, resources, and state figured out, you may be wondering how you can increase code re-use across your `live` repository. Gruntwork recommends using the ["module defaults"](./module_defaults/index.md) pattern to keep your Terragrunt architecture DRY.


<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "2399e94f2698f60d3efe7783d670d310"
}
##DOCS-SOURCER-END -->

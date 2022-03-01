# Introduction to Gruntwork

### What is Gruntwork?

**Gruntwork is a "DevOps accelerator" designed to make it possible to achieve a world-class DevOps setup based completely on infrastructure-as-code in just a few days.**

All Gruntwork products exist within a framework we’ve devised specifically to emphasize DevOps industry best-practices and maximize your team’s efficiency. In the [how it works](how-it-works.md) section, we’ll cover how Gruntwork can help your team implement your infrastructure using this framework.

Gruntwork works best for teams building new infrastructure ("greenfield"), either from scratch or as part of a migration. However, it can also be used by teams with existing infrastructure ("brownfield") if they have sufficient DevOps experience.

### Supported public clouds

Gruntwork products focus on Amazon Web Services (AWS). Support for other public clouds such as GCP and Azure may be added in the future.

### Gruntwork uses Terraform

All Gruntwork products are built on and fully compatible with [open source Terraform](https://terraform.io). The one exception to this is the [Gruntwork Reference Architecture](https://gruntwork.io/reference-architecture/), which uses [Terragrunt](https://terragrunt.gruntwork.io/) (one of our open source tools) to implement an end-to-end architecture.

### Core modules at our core

In each of our repositories, you will find the following structure:

```
├── README.md
├── examples/
├── modules/
├── test/
```

The `README.md` file gives an overview of the modules inside the repository, and may include diagrams and information on how to use the modules.

The `examples/` directory contains small bits of code that launch the module. You can use these examples to craft your own infrastructure.

The `modules/` directory contains the code for each of the modules. This is where the meat of the work is done.

The `test/` directory contains all of our tests that go through our CI/CD pipeline for every commit. It uses our open source [Terratest](https://terratest.gruntwork.io/) Go library. The tests leverage the examples in the `examples/` directory.
### Services bring multiple modules together

One level up from our modules is our [Service Catalog](https://docs.gruntwork.io/guides/production-framework/ingredients/service-catalog/). The Service Catalog brings modules that are often used together into their own module that you can instantiate.

One difference in the [file layout for our Service Catalog](https://github.com/gruntwork-io/terraform-aws-service-catalog/) can be seen in the `examples/` folder:

```
├── examples
│   ├── for-learning-and-testing
│   │   ├── data-stores
│   │   ├── landingzone
│   │   ├── mgmt
│   │   ├── networking
│   │   └── services
│   └── for-production
│       └── infrastructure-live
```

The `for-learning-and-testing/` folder mimics the `examples/` folder at the lower module level. The `for-production/` folder follows the opinionated folder structure that we use when we deliver a [Reference Architecture](https://docs.gruntwork.io/guides/reference-architecture/) to a customer. Regardless of whether you've purchased a Reference Architecture or not, this folder may be useful for you to see how we recommend organizing your files.

The files inside of the `for-production/` folder also show our use of [Terragrunt](https://terragrunt.gruntwork.io/), our open source wrapper arround Terraform that helps keep your configurations DRY and manage your remote state files.

One key feature of Terragrunt is its ability to maintain separate (small) state files so that `plan`s and `apply`s have to load as little state as possible. To bring different states together, you create explicit dependencies:

```
dependency "vpc" {
  config_path = "../vpc"
}

inputs = {
  vpc_id = dependency.vpc.outputs.vpc_id
}
```

When terragrunt runs, it resolves those dependencies and only loads the state files that it needs to modify your infrastructure. The rest of the state files are left alone.

### The Reference Architecture

Our [Reference Architecture](https://docs.gruntwork.io/guides/reference-architecture/) consists of our own [Landing Zone](https://docs.gruntwork.io/guides/build-it-yourself/landing-zone/) implementation and our [CI/CD Pipeline](https://docs.gruntwork.io/guides/build-it-yourself/pipelines/).

We start with six completely empty AWS accounts (`security`, `shared`, `logs`, `dev`, `stage`, and `prod`). We add in our Pipeline to a selection of Continuous Integration products (Jenkins, GitLab, CircleCI, and Gitub Actions). The complete product is DRY and follows secure methodology. For those with higher security requirements, we also offer a [CIS implementation](https://docs.gruntwork.io/guides/build-it-yourself/achieve-compliance/core-concepts/intro/) of both the Reference Architecture and the Service Catalog.




<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"local-copier","hash":"4b33c9136d368be2b7dc4d5aab2901ec"}
##DOCS-SOURCER-END -->

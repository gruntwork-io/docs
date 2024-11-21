# Control Provider Usage

There are two main methods for controlling the provider used in OpenTofu/Terraform operations:

1. Setting required provider versions.
2. Committing the `.terraform.lock.hcl` file.

## Required Provider Versions

Generally speaking, follow [OpenTofu recommendations](https://opentofu.org/docs/language/providers/requirements/#best-practices-for-provider-versions) regarding specifying the minimum provider version for any providers used by modules authored as part of the library.

This recommendation is useful guidance for ensuring that the feature set used as part of modules being authored for the library are available in provider versions end users install.

You can do that by using a `required_provider` configuration block like the following:

```terraform
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = ">= 5.0"
    }
  }
}
```

Note the guidance against setting maximum provider versions. This is especially important for modules that end up as dependencies of other modules.

Because only one version of a provider is ultimately installed by end users, conflicting provider versions in module dependencies can result in modules being unusable.

An exception to the general rule of avoiding pinning maximum provider versions in modules is to prevent a module from pulling in breaking changes from a future version of a provider.

## Committing `.terraform.lock.hcl` File

When running `tofu init` in a directory with `.tf` files, a [`.terraform.lock.hcl`](https://opentofu.org/docs/language/files/dependency-lock) file will be automatically generated if it doesn't exist.

This file shouldn't be committed in module repositories, but should be committed to repositories where those modules are referenced to provision live infrastructure.

When using Terragrunt, note how [Terragrunt handles lock files](https://terragrunt.gruntwork.io/docs/features/lock-file-handling/).

Keep this behavior in mind when deciding how to handle `.terraform.lock.hcl` files in modules.

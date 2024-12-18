# Control Provider Usage

There are two primary methods for managing the provider used in OpenTofu/Terraform operations:

1. Specifying required provider versions.
2. Committing the `.terraform.lock.hcl` file to version control.
   
## Required Provider Versions

It is advisable to follow the [OpenTofu recommendations](https://opentofu.org/docs/language/providers/requirements/#best-practices-for-provider-versions) rfor specifying minimum provider versions for any providers used in modules developed as part of the library.

This practice ensures that the features leveraged in authored modules are supported by the provider versions installed by end users. 

You can specify required provider versions using a `required_provider` configuration block, as demonstrated below:

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
Following guidance against setting maximum provider versions is critical, particularly for modules dependent on other modules.

Since only one provider version is ultimately installed by end users, specifying conflicting provider versions across module dependencies can render modules unusable.

An exception to avoiding maximum provider version constraints is to prevent a module from inadvertently pulling in breaking changes introduced in future provider versions.

## Committing `.terraform.lock.hcl` File

When running `tofu init` in a directory containing `.tf` files, a [`.terraform.lock.hcl`](https://opentofu.org/docs/language/files/dependency-lock) file is automatically generated if it does not already exist.

This file should not be committed in module repositories. However, committing it in repositories that use those modules to provision live infrastructure is recommended.

If using Terragrunt, consider how [Terragrunt manages lock files](https://terragrunt.gruntwork.io/docs/features/lock-file-handling/) when determining how to handle `.terraform.lock.hcl` files in modules.

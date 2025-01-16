# Control Provider Usage

There are two primary methods for managing the provider used in OpenTofu/Terraform operations:

1. Specifying required provider versions.
2. Committing the `.terraform.lock.hcl` file to version control.
 
## Required provider versions

It is advisable to follow the [OpenTofu recommendations](https://opentofu.org/docs/language/providers/requirements/#best-practices-for-provider-versions) for specifying minimum provider versions for any providers used in modules developed as part of the library, ensuring compatibility between installed provider versions and the features in your modules.



Specify these versions using a `required_provider` configuration block, as demonstrated below:

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

Since end users install only one provider version, conflicting provider version constraints across module dependencies can make the modules unusable.

The exception to this rule is when setting a maximum provider version is necessary to prevent a module from inadvertently adopting breaking changes in future provider versions.

## Committing `.terraform.lock.hcl` File


When you run `tofu init` in a directory with `.tf` files, a [`.terraform.lock.hcl`](https://opentofu.org/docs/language/files/dependency-lock) file is automatically created if one does not already exist.

This file should not be committed in module repositories. However, committing it in repositories used to provision live infrastructure is recommended.

For Terragrunt users, review [Terragrunt’s approach to lock file management](https://terragrunt.gruntwork.io/docs/features/lock-file-handling/) to determine the best way to handle `.terraform.lock.hcl` files in modules.

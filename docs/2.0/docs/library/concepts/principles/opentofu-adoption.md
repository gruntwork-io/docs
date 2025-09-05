# Support Smooth OpenTofu Adoption

Gruntwork is a co-founder and active maintainer of [OpenTofu](https://opentofu.org/), the open source successor to HashiCorp Terraform. We proudly support OpenTofu because we believe that core infrastructure is too critical to run on anything but proven open source technology. In line with this philosophy, Gruntwork IaC Library aims to provide first-class OpenTofu support.

 But in the real world, platform engineers face endless module and tooling upgrades, [yak shaves](https://softwareengineering.stackexchange.com/a/388236) and competing priorities. This means we must balance our desire to embrace the latest OpenTofu functionality with our separate principle of [being judicious with new features](be-judicious-with-new-features.md).
 
## Core principle

Given our need to balance embracing the latest OpenTofu functionality while keeping real-world maintenance as easy as possible, we must make it easy for customers to transition from Terraform to OpenTofu without requiring them to learn new syntax or extensively modify their existing configurations.

## Implementation

### High-level approach

1. We support modern OpenTofu versions in our modules.
1. However, we strongly prefer language features that work identically in both OpenTofu and Terraform.
1. We avoid OpenTofu-specific syntax unless there is a compelling reason and clear customer benefit.

### OpenTofu/Terraform version support

- **OpenTofu**: We support OpenTofu 1.9 for new features that provide significant customer value.
- **Terraform**: We maintain compatibility with Terraform versions that support the same language features we use, but do not explicitly test or support Terraform versions beyond 1.5.7

When we upgrade a module to require a newer version of OpenTofu, we explicitly require that version in the `terraform` block of the module, publish a major module version release in the related git repo, and include clear migration guidance, if applicable.

### OpenTofu feature adoption

When evaluating new OpenTofu language features for use in Gruntwork modules:

1. **Dual-compatible features (Preferred)**: Features that work identically in both OpenTofu and Terraform should be placed in `.tf` files. (e.g. see [cross-variable validation](#cross-variable-validation) below.)
2. **OpenTofu-specific Features (Discouraged)**: Features that only work in OpenTofu should be placed in `.tofu` files and used sparingly. Terraform ignores `.tofu` files, while OpenTofu reads both `.tf` and `.tofu`. Avoid duplicating the same blocks across both extensions; prefer additive enhancements in `.tofu`. This approach increases maintenance cost, so we will use it only when the user benefit is clear.
3. **Terraform-specific Features**: We do not support Terraform-specific features.

## Current feature adoption

### Cross-variable validation

We now support cross-variable validation (the ability to reference the values of other variables in `variable` validation blocks) because:
- It significantly improves module usability by preventing invalid input combinations
- It works identically in both OpenTofu 1.9+ and Terraform 1.9+
- It addresses direct customer feedback about configuration errors

## Future evolution

-This principle will evolve as the Terraform and OpenTofu ecosystems develop. We will:
-- Regularly review compatibility and our support policy based on customer needs
-- Update our supported feature list as new stable releases become available
-- Clearly communicate any changes to our compatibility strategy
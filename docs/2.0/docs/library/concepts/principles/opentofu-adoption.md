# Prefer OpenTofu; Minimize Friction

Gruntwork is a co-founder and active maintainer of [OpenTofu](https://opentofu.org/), the open source successor to HashiCorp Terraform. We proudly support OpenTofu because we believe that core infrastructure should run on proven open source technology. In line with this philosophy, Gruntwork IaC Library aims to provide first-class OpenTofu support.

But we also know that platform teams may be on very early versions of Terraform (pre-1.0) or still on Terraform 1.5.7, and that upgrading to the latest OpenTofu is yet another item on their plate of competing priorities. This means we must balance the benefits of embracing the latest OpenTofu functionality with the real-world costs of migration.
 
## Core principle

We prefer OpenTofu over Terraform but design our modules to work seamlessly with both whenever possible, ensuring customers can adopt OpenTofu without syntax changes or configuration rewrites.

## Implementation

### Approach

1. We design our modules to work with both OpenTofu and Terraform, prioritizing features that work identically in both tools.
2. When we do adopt OpenTofu-specific features, we use `.tofu` files and provide clear migration guidance.

### OpenTofu/Terraform version support

- **OpenTofu**: We support OpenTofu 1.9 for new features that provide significant customer value.
- **Terraform**: We maintain compatibility with Terraform versions that support the same OpenTofu language features we use, but do not explicitly test or support Terraform versions beyond 1.5.7.

### OpenTofu feature adoption

When evaluating new OpenTofu language features for use in Gruntwork modules:

1. **Dual-compatible features (Preferred)**: Features that work identically in both OpenTofu and Terraform should be placed in `.tf` files. (e.g. see [cross-variable validation](#cross-variable-validation) below.)
2. **OpenTofu-only Features (Discouraged)**: Features that only work in OpenTofu should be placed in `.tofu` files and used sparingly. Terraform ignores `.tofu` files, while OpenTofu reads both `.tf` and `.tofu`. Avoid duplicating the same blocks across both extensions; prefer additive enhancements in `.tofu`. This approach increases maintenance cost, so we will use it only when the user benefit is clear.
3. **Terraform-only Features**: We do not support Terraform-specific features.

## Current feature adoption

### Cross-variable validation

We now support cross-variable validation (the ability to reference the values of other variables in `variable` validation blocks) because:
- It significantly improves module usability by preventing invalid input combinations
- It works identically in both OpenTofu 1.9+ and Terraform 1.9+
- It addresses direct customer feedback about configuration errors

## Future evolution

This principle will evolve as the Terraform and OpenTofu ecosystems develop. We will:
- Regularly review compatibility and our support policy based on customer needs
- Update our supported feature list as new stable releases become available
- Clearly communicate any changes to our compatibility strategy
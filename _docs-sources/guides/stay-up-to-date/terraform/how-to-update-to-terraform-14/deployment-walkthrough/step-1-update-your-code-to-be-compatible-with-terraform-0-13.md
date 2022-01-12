---
sidebar_label: Update to Terraform 13
---

# Step 1: update your code to be compatible with Terraform 0.13

If you haven’t already, you need to:

1.  Update your code to work with Terraform 0.13. Do NOT skip from, say, 0.11,
    straight to 0.14. You MUST update to 0.13.0 or above first! If you’re still
    on Terraform 0.11 or older, see our [Terraform 0.12 upgrade
    guide](../../how-to-update-to-terraform-12/intro.md) for
    instructions. If you’re still on Terraform 0.12, see our [Terraform 0.13
    upgrade
    guide](../../how-to-update-to-terraform-13/intro.md).

2.  Update all your Gruntwork modules to the latest versions just _before_ the
    TF 0.14 versions in the compatibility table below. The upgrade will be much
    easier and less error prone if you keep the number of version jumps as small
    as possible.

---
pagination_label: Deployment Walkthrough - Step 1
sidebar_label: Update to Terraform 12
---

# Step 1: update your code to be compatible with Terraform 0.12

If you haven’t already, you need to:

1.  Update your code to work with Terraform 0.12. Do NOT skip from, say, 0.11, straight to 0.13. You MUST update to
    0.12.26 or above first! If you’re still on Terraform 0.11 or older, see our
    [Terraform 0.12 upgrade guide](../../0-how-to-update-to-terraform-12/0-intro.md) for instructions.

2.  Update all your Gruntwork modules to the latest versions just _before_ the TF 0.13 versions in the compatibility
    table below. The upgrade will be much easier and less error prone if you keep the number of version jumps as small
    as possible.

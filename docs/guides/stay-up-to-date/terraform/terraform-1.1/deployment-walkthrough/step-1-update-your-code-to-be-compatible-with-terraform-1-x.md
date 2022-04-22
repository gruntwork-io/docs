---
sidebar_label: Update to Terraform 1.0
---

# Step 1: update your code to be compatible with Terraform 1.0

If you haven’t already, you need to:

1.  Update your code to work with Terraform 1.0. Do NOT skip from, say, 0.11, straight to 1.1. You MUST update to
    1.0.0 or above first!

    1. If you’re still on Terraform 0.11 or older, see our
        [Terraform 0.12 upgrade guide](../../terraform-12/index.md).

    2. If you’re still on Terraform 0.12, see our
        [Terraform 0.13 upgrade guide](../../terraform-13/index.md).

    3. If you’re still on Terraform 0.13, see our
        [Terraform 0.14 upgrade guide](../../terraform-14/index.md).

    4. If you’re still on Terraform 0.14, see our
        [Terraform 0.15 upgrade guide](../../terraform-15/index.md).

    5. If you’re still on Terraform 0.15, see our
       [Terraform 1.x upgrade guide](../../terraform-1.x/index.md).

2.  Update all your Gruntwork modules to the latest versions just _before_ the TF 1.1 versions in the [compatibility
    table](/guides/stay-up-to-date/terraform/terraform-1.1/deployment-walkthrough/step-2-update-references-to-the-gruntwork-infrastructure-as-code-library#version-compatibility-table). The upgrade will be much easier and less error prone if you keep the number of version jumps as small
    as possible.


<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "901f5f12726f3f8ebba1f5058c1e957a"
}
##DOCS-SOURCER-END -->

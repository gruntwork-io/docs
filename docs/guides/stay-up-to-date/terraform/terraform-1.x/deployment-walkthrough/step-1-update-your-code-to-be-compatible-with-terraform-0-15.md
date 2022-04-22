---
sidebar_label: Update to Terraform 15
---

# Step 1: update your code to be compatible with Terraform 0.15

If you haven’t already, you need to:

1.  Update your code to work with Terraform 0.15. Do NOT skip from, say, 0.11, straight to 1.x. You MUST update to
    0.15.0 or above first!

    1.  If you’re still on Terraform 0.11 or older, see our
        [Terraform 0.12 upgrade guide](../../terraform-12/index.md).

    2.  If you’re still on Terraform 0.12, see our
        [Terraform 0.13 upgrade guide](../../terraform-13/index.md).

    3.  If you’re still on Terraform 0.13, see our
        [Terraform 0.14 upgrade guide](../../terraform-14/index.md).

    4.  If you’re still on Terraform 0.14, see our
        [Terraform 0.15 upgrade guide](../../terraform-15/index.md).

2.  Update all your Gruntwork modules to the latest versions just _before_ the TF 1.x versions in the [compatibility
    table](/guides/stay-up-to-date/terraform/terraform-1.x/deployment-walkthrough/step-2-update-references-to-the-gruntwork-infrastructure-as-code-library#version-compatibility-table). The upgrade will be much easier and less error prone if you keep the number of version jumps as small
    as possible.


<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "79d751e6f54ffaa62190769a98e3b402"
}
##DOCS-SOURCER-END -->

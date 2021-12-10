# Step 1: update your code to be compatible with Terraform 0.15

If you haven’t already, you need to:

1.  Update your code to work with Terraform 0.15. Do NOT skip from, say, 0.11, straight to 1.x. You MUST update to
    0.15.0 or above first!

    1.  If you’re still on Terraform 0.11 or older, see our
        [Terraform 0.12 upgrade guide](https://docs.gruntwork.io/guides/upgrading-to-tf12-tg19/).

    2.  If you’re still on Terraform 0.12, see our
        [Terraform 0.13 upgrade guide](https://gruntwork.io/guides/upgrades/how-to-update-to-terraform-13/).

    3.  If you’re still on Terraform 0.13, see our
        [Terraform 0.14 upgrade guide](https://gruntwork.io/guides/upgrades/how-to-update-to-terraform-14/).

    4.  If you’re still on Terraform 0.14, see our
        [Terraform 0.15 upgrade guide](https://gruntwork.io/guides/upgrades/how-to-update-to-terraform-15/).

2.  Update all your Gruntwork modules to the latest versions just _before_ the TF 1.x versions in the compatibility
    table below. The upgrade will be much easier and less error prone if you keep the number of version jumps as small
    as possible.

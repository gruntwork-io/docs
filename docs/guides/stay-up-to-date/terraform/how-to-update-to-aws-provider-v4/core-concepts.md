# Core Concepts

Version
[v4.0.0](https://github.com/terraform-providers/terraform-provider-aws/releases/tag/v4.0.0)
of the Terraform AWS provider was released on February 10th 2022 with backward
incompatible updates. Following the provider release cycle, future releases from
this point onward would only be compatible with 4.X. This means that if you wish
to use any new resources or data sources that are released from this point
onwards, you will need to be compatible with version 4 of the AWS provider to be
able to pull those changes in.

Since this is a major version change, there are a number of backwards
incompatible changes that were introduced. In order to be able to use version 4,
you need to update your code to be compatible when upgrading (specifically, the
resource and data source blocks that have backwards incompatible changes).

For your own code, you can follow [the official
guide](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/guides/version-4-upgrade)
on updating to AWS provider version 4. The rest of this guide will focus on
updating references to Gruntwork modules and the Gruntwork Reference
Architecture to be compatible with AWS provider version 4.

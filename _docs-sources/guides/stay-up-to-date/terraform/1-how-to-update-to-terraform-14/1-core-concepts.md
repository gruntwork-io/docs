---
---

# Core Concepts

[Terraform 0.14 was released on
December 02, 2020](https://www.hashicorp.com/blog/announcing-hashicorp-terraform-0-14-general-availability). Some of the major new features in 0.14 include:

1.  Consise diff output in `plan`.

2.  The ability to mark input variables as `sensitive`.

3.  A lock file for provider dependency versions.

For more info, check out the
[announcement blog post](https://www.hashicorp.com/blog/announcing-hashicorp-terraform-0-14-general-availability).

0.14 is a major new release for Terraform, which means it includes some backwards incompatible changes. We have
gone through all the Terraform modules in the [Gruntwork
Infrastructure as Code Library](https://gruntwork.io/infrastructure-as-code-library/) and updated them to work with Terraform 0.14. In order to use 0.14, you will need to
update to these new versions and make other changes to your code, as described in the following section.

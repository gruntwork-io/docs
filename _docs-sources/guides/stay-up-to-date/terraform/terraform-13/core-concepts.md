# Core Concepts

[Terraform 0.13 was released on August 10th, 2020](https://www.hashicorp.com/blog/announcing-hashicorp-terraform-13).
Some of the major new features in 0.13 include:

1.  The ability to use `count`, `for_each`, and `depends_on` with modules.

2.  A new `required_providers` block that makes it much easier to work with third-party providers.

3.  Custom variable validation.

For more info, check out the [announcement blog post](https://www.hashicorp.com/blog/announcing-hashicorp-terraform-13).

0.13 is a major new release for Terraform, which means it includes a number of backwards incompatible changes. We have
gone through all the Terraform modules in the [Gruntwork
Infrastructure as Code Library](https://gruntwork.io/infrastructure-as-code-library/) and updated them to work with Terraform 0.13. In order to use 0.13, you will need to
update to these new versions and make other changes to your code, as described in the following section.

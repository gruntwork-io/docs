# Core Concepts

[Terraform 0.15 was released on April 14,
2021](https://www.hashicorp.com/blog/announcing-hashicorp-terraform-0-15-general-availability).
Some of the major new features in 0.15 include:

1.  A more stable state file format that will be compatible with Terraform 0.14,
    0.15, and, once it’s released, 1.0.

2.  Stronger support for handling input variables, output variables, and
    resource attributes that are "sensitive" (e.g., passwords).

3.  Structured logging.

4.  Better console support, especially on Windows.

For more info, check out the [announcement blog
post](https://www.hashicorp.com/blog/announcing-hashicorp-terraform-0-15-general-availability).

0.15 is a major new release for Terraform, which means it includes some
backwards incompatible changes. We have gone through all the Terraform modules
in the [Gruntwork Infrastructure as Code
Library](https://gruntwork.io/infrastructure-as-code-library/) and updated them
to work with Terraform 0.15. In order to use 0.15, you will need to update to
these new versions and make other changes to your code, as described in the
following section.


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Local File Copier","hash":"11dd054fc7d70bce30badb6f78ce6f46"}
##DOCS-SOURCER-END -->

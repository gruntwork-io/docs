---
'title': 'Terragrunt'
---

# Terragrunt

[Terragrunt](https://github.com/gruntwork-io/terragrunt) is a thin, open source wrapper for Terraform. It is designed to
fill in some missing features in Terraform, such as allowing you to define your Terraform backend configuration in
one `terragrunt.hcl` file, rather than having to copy/paste the same config over and over again:

```hcl
remote_state {
  backend = "s3"
  config = {
    bucket         = "my-terraform-state"
    key            = "${path_relative_to_include()}/terraform.tfstate"
    region         = "us-east-1"
    encrypt        = true
    dynamodb_table = "my-lock-table"
  }
}
```

Once you've created your `terragrunt.hcl` configuration, you can run all the usual Terraform commands, but with
`terragrunt` as the binary: e.g., `terragrunt plan`, `terragrunt apply`, `terragrunt destroy`. Check out
[Terragrunt: how to keep your Terraform code DRY and maintainable](https://blog.gruntwork.io/terragrunt-how-to-keep-your-terraform-code-dry-and-maintainable-f61ae06959d8)
for a thorough introduction.

Note that while the Gruntwork Reference Architecture relies on Terragrunt as one of its opinionated tools, the
Gruntwork Infrastructure as Code Library does NOT require Terragrunt; you can use the Terraform modules in the Gruntwork
Infrastructure as Code Library with plain Terraform, Terraform Enterprise, Atlantis, Terragrunt, or any other tools you prefer.

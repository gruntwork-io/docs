---
sidebar_label: Update provider sources
---

# Step 4: update provider sources to the new format

Terraform 0.13 introduced a new registry for managing provider releases. This makes it easier to publish and distribute
third party providers. As a part of this, Terraform changed the way providers are tracked in the state file. When
running `terraform init` for the first time on a module that has been updated from &lt;0.13 to 0.13+, you might notice
Terraform installing two providers:

- `-/PROVIDER`
- `hashicorp/PROVIDER`

The first one is used to track legacy provider sources that are mentioned in the old state file, while the latter is
what is configured in your module using the new `required_providers` blocks when you upgraded your modules in step 2.

To avoid conflict between the two providers, it is recommended to update your state file to use the new provider
references. This can be done by using the `state replace-provider` command.

For each provider your module uses, run the following command:

```
# NOTE: Use terragrunt instead of terraform if you are using terragrunt to manage your resources.
terraform state replace-provider -- -/PROVIDER registry.terraform.io/hashicorp/PROVIDER
```

For example, if your module uses `null` and `aws` providers, you will want to run:

```
terraform state replace-provider -- -/null registry.terraform.io/hashicorp/null
terraform state replace-provider -- -/aws registry.terraform.io/hashicorp/aws
```


<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "cbd959c092bb7e6dc1f6da8dbd29aba2"
}
##DOCS-SOURCER-END -->

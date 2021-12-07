## Comments

This section lists the Gruntwork conventions around comments in Terraform code.

### # over //

Use `#` for comment strings, not `//` or `/**/`.

### # - over # ~

Delimit section header comment blocks with `# ----` instead of `# \~~~~`.

### `variables.tf`

`variables.tf` files should clearly indicate required environment variables, and separate out required variables from
optional variables (with defaults) using block comments.

Example:

```hcl
# ---------------------------------------------------------------------------------------------------------------------
# ENVIRONMENT VARIABLES
# Define these secrets as environment variables
# ---------------------------------------------------------------------------------------------------------------------



<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Service Catalog Reference","hash":"29ceb68513d0ae945bfa4caf6c0d5f1c"}
##DOCS-SOURCER-END -->

# Update Strategies

Patcher supports two update strategies: **next safe** and **next breaking**. These strategies dictate how Patcher behaves when encountering a breaking change that cannot be automatically patched.

For example, the Gruntwork `terraform-aws-security/custom-iam-entity` module has two recent breaking changes: `0.62.0` and `0.65.0`.

In the `infrastructure-live/dev` environment, there are two dependencies on the `terraform-aws-security/custom-iam-entity` module:  
- `_global/ops-admin-role/terragrunt.hcl` currently uses version `0.65.6`.  
- `_global/website-ci-cd-access/terragrunt.hcl` currently uses version `0.61.0`.  

## `Next safe` update strategy (default)

The **next safe** strategy updates a dependency to either the highest version **before the next closest breaking change** or the latest version of the dependency, whichever occurs first.

If Patcher encounters a breaking change that cannot be automatically patched, it stops at the highest version before that breaking change. If no breaking changes are detected, it updates the dependency to the latest available version.

For example, for the dependencies on `terraform-aws-security/custom-iam-entity` in `infrastructure-live/dev`:

- `_global/ops-admin-role/terragrunt.hcl` is updated from `0.65.6` to `0.68.2`, the latest version.  
  - There are no breaking changes between `0.65.6` and `0.68.2`.  

- `_global/website-ci-cd-access/terragrunt.hcl` is updated from `0.61.0` to `0.61.1`, the highest version before `0.62.0`.  
  - Version `0.62.0` introduces a breaking change that requires manual intervention.  


This is an example of the YAML that Patcher outputs to `stdout` to describe these updates:  

```yaml
  successful_updates:
  - file_path: ~/infrastructure-live/dev/_global/ops-admin-role/terragrunt.hcl
    updated_modules:
    - repo: terraform-aws-security
      module: custom-iam-entity
      previous_version: v0.65.6
      updated_version: v0.68.2
  - file_path: ~/infrastructure-live/dev/_global/website-ci-cd-access/terragrunt.hcl
    updated_modules:
    - repo: terraform-aws-security
      module: custom-iam-entity
      previous_version: v0.61.0
      updated_version: v0.61.1
      next_breaking_version:
        version: v0.62.0
        release_notes_url: https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.62.0
```

## `Next breaking` update strategy  

The **next breaking** strategy updates a dependency to either the next closest breaking change or the latest version of the dependency, whichever occurs first.  

If Patcher encounters a breaking change that cannot be automatically patched, it updates the dependency to the version containing the breaking change and stops. If no breaking changes are found, it updates the dependency to the latest available version.  

This strategy may result in updates that require manual intervention. In such cases, Patcher provides additional guidance by writing a `README-TO-COMPLETE-UPDATE.md` file into the folder containing the dependency. If multiple dependencies in a folder are updated to breaking versions, the `README-TO-COMPLETE-UPDATE.md` file will include release note extracts for each breaking change.

For example, for the dependencies on `terraform-aws-security/custom-iam-entity` in `infrastructure-live/dev`:

- `_global/ops-admin-role/terragrunt.hcl` is updated from `0.65.6` to `0.68.2`, the latest version.  
  - There are no breaking changes between `0.65.6` and `0.68.2`.  
- `_global/website-ci-cd-access/terragrunt.hcl` is updated from `0.61.0` to `0.62.0`, the next version containing a breaking change that requires manual intervention.  

If any dependencies are updated to a breaking version, the YAML output that Patcher writes to `stdout` will include a `manual_steps_you_must_follow` section listing the generated `README-TO-COMPLETE-UPDATE.md` files. For example:  

```yaml
  successful_updates:
  - file_path: ~/infrastructure-live/dev/_global/ops-admin-role/terragrunt.hcl
    updated_modules:
    - repo: terraform-aws-security
      module: custom-iam-entity
      previous_version: v0.65.6
      updated_version: v0.68.2
  - file_path: ~/infrastructure-live/dev/_global/website-ci-cd-access/terragrunt.hcl
    updated_modules:
    - repo: terraform-aws-security
      module: custom-iam-entity
      previous_version: v0.61.0
      updated_version: v0.62.0
      next_breaking_version:
        version: v0.62.0
        release_notes_url: https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.62.0
  manual_steps_you_must_follow:
  - instructions_file_path: ~/-infrastructure-live/dev/_global/website-ci-cd-access/README-TO-COMPLETE-UPDATE.md
```

This is the `README-TO-COMPLETE-UPDATE.md` written into `dev/_global/website-ci-cd-access`:

```markdown
# custom-iam-entity v0.61.0 -> v0.62.0 (2023.06.05 12:26:30)Updated dependency `custom-iam-entity` in `~/infrastructure-live/dev/_global/website-ci-cd-access/terragrunt.hcl` to version `v0.62.0`, which contains breaking changes. You **must** follow the instructions in the release notes to complete this update safely: https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.62.0

Here are the release notes for version `v0.62.0`:

## Description  
**Terraform 1.1 Upgrade**: We have verified that this repository is compatible with Terraform `1.1.x`!  
- From this release onward, we will only run tests with Terraform `1.1.x` against this repository, so we recommend updating to `1.1.x` soon.  
- The minimum required version of Terraform has been updated to `1.0.0`. While earlier versions of Terraform may still work, we no longer guarantee compatibility with pre-1.0.0 versions.  
- Once all Gruntwork repositories have been upgraded to work with `1.1.x`, we will publish a migration guide with a version compatibility table and announce it via the Gruntwork Newsletter.  

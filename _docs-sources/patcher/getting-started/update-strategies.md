# Update Strategies

Patcher supports two update strategies: **next safe** and **next breaking**. These update strategies determine how Patcher will behave if it encounters a breaking change that it cannot patch.

For example, the Gruntwork `terraform-aws-security/custom-iam-entity` module has two recent breaking changes: `0.62.0` and `0.65.0`.

And in `infrastructure-live/dev` there are 2 dependencies on `terraform-aws-security/custom-iam-entity`:
- `_global/ops-admin-role/terragrunt.hcl` currently uses `0.65.6`
- `_global/website-ci-cd-access/terragrunt.hcl` currently use `0.61.0`

## "Next Safe" Update Strategy (Default)

The **next safe** strategy will update a dependency to either the highest version **before the next closest breaking change** or the latest version of the dependency, whichever is encountered first.

So if Patcher encounters a breaking change that it cannot patch then it will update the dependencies to the highest version before that breaking change and stop. Otherwise, if no breaking changes are encountered it will update the dependencies the latest version of that module.

For example, for the dependencies on `terraform-aws-security/custom-iam-entity` in `infrastructure-live/dev`:
- `_global/ops-admin-role/terragrunt.hcl` will be updated from `0.65.6` to `0.68.2`, the latest version
  - There are no breaking changes between `0.65.6` and `0.68.2`
- `_global/website-ci-cd-access/terragrunt.hcl` will be updated from `0.61.0` to `0.61.1`, the highest version before `0.62.0`
  - `0.62.0` is the next highest version that contains a breaking change which requires manual intervention

This is an example of the YAML that Patcher writes to `stdout` describing these updates:

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

## "Next Breaking" Update Strategy

The **next breaking** strategy will update a dependency to either the next closest breaking change or the latest version of the dependency, whichever is encountered first.

So if Patcher encounters a breaking change that it cannot patch then it will update the dependencies to the version with the breaking change and stop. Otherwise, if no breaking changes are encountered, it will update the dependencies to the latest version of that module.

This may result in an update that requires manual intervention. If so, Patcher will provide additional information to help you understand what needs to be done.

Patcher does this by writing a `README-TO-COMPLETE-UPDATE.md` into the folder containing the dependency. If more than one dependency in a folder has been updated to a breaking version, then the `README-TO-COMPLETE-UPDATE.md` file will contain a release note extract for each breaking change in that folder.

For example, for the dependencies on `terraform-aws-security/custom-iam-entity` in `infrastructure-live/dev`:
- `_global/ops-admin-role/terragrunt.hcl` will be updated from `0.65.6` to `0.68.2`, the latest version
  - There are no breaking changes between `0.65.6` and `0.68.2`
- `_global/website-ci-cd-access/terragrunt.hcl` will be updated from `0.61.0` to `0.62.0`, the next highest version with a breaking change that requires manual intervention.

If any of the dependencies were updated to a breaking version, then the YAML that Patcher writes to `stdout` describing these updates will include a `manual_steps_you_must_follow` section listing the generated `README-TO-COMPLETE-UPDATE.md` files, for example:

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
# custom-iam-entity v0.61.0 -> v0.62.0 (2023.06.05 12:26:30)

Updated dependency custom-iam-entity in ~/infrastructure-live/dev/_global/website-ci-cd-access/terragrunt.hcl to version v0.62.0, which contains breaking changes. You MUST follow the instructions in the release notes to complete this update safely: https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.62.0

Here are the release notes for version v0.62.0:


## Description
**Terraform 1.1 upgrade**: We have verified that this repo is compatible with Terraform `1.1.x`!
  - From this release onward, we will only be running tests with Terraform `1.1.x` against this repo, so we recommend updating to `1.1.x` soon!
  - We have also updated the minimum required version of Terraform to `1.0.0`. While our repos might continue to be compatible with pre-1.0.0 version of Terraform, we are no longer making any guarantees of that.
  - Once all Gruntwork repos have been upgraded to work with `1.1.x`, we will publish a migration guide with a version compatibility table and announce it all via the Gruntwork Newsletter.
```

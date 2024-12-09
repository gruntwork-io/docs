# `patcher` Commands

## Global Options

| Option Name | Description | 
|---|---|
| `--loglevel value` | The log level to output information at. Available values: Default: `info`. |
| `--container-image value` | Use the specified container image for applying patches. Ignored if `--skip-container-runtime` is used. |
| `--skip-container-runtime` | Skip using a container runtime for applying patches and perform all operations directly on the host. Default: `false`. |
| `--dry-run` | Run in dry run mode. Will not bump any versions or apply any patches. Default: `false` |
| `--help`, `-h` | Show help text for the given command. |

## `apply`

Apply a local or remote patch to the target module. 

**Usage**: 

```bash
$ patcher apply [options] <MODULE_ADDRESS> <PATCH_PATH>
```

**Arguments**:

  `MODULE_ADDRESS`: The address of the module to which the patch will be applied. For Terragrunt modules, use "terragrunt".

  `PATCH_PATH`: Either a local path to the patch folder, or a remote URL pointing to the patch to apply, in the following
  format: GITHUB_ORG/GITHUB_REPO/PATCH_NAME.

**Examples**:

```bash
  $ patcher apply module.vpc ~/my-patches/some-patch/
```

## `generate`

Generate a patch in `.patcher/patches/<PATCH_NAME_SLUG>/patch.yaml` in the root of the git repo (or the current folder).

**Usage**: 

```bash
$ patcher generate [options] <PATCH_NAME>
```

**Arguments**:

`PATCH_NAME`: Can be any arbitrary string. This value will be set directly as the value of the 'name' field in the `patch.yaml` file. The slugified version of this value will be used as a folder name for the patch. `PATCH_NAME_SLUG` is generated from this value.

**Example**:

```bash
$ patcher generate "Terraform Upgrade 1.1"
```

## `report`

Discover which dependencies in a directory need to be updated.

**Usage**:

```bash
$ patcher report [options] <WORKING_DIR> [WORKING_DIR_2]...
```

**Arguments**:

`WORKING_DIR`: The directory to scan. The resultant report will only contain dependency update information based on this working directory. Multiple space-separated directories may be provided.

**Example**:

```bash
# Generate a report based off the root directory
$ patcher report ./
```

**Additional Options**:

| Option Name | Description | 
|---|---|
| `--output-plan value` | Write an upgrade plan to the given file. |
| `--output-spec value` | Write an upgrade spec to the given file. |
| `--include-dirs value` | Include only directories matching the given glob pattern. | 
| `--exclude-dirs value` | Exclude any directories matching the given glob pattern. |

## `update`

Update your dependency versions. In interactive mode (default), discover your dependencies and update them to the latest versions. In non-interactive
mode, update all discovered dependencies to the next safe or next-breaking versions.

**Usage**:

```bash
$ patcher update [options] <WORKING_DIR> [WORKING_DIR_2]...
```

**Arguments**:

`WORKING_DIR`: The directory to scan. The resultant report and potential updates will only contain dependency update information based on this working directory. Multiple space-separated directories may be provided.

**Example**:

```bash
# Generate a report, and possibly perform updates, based off the root directory
$ patcher update ./
```

**Additional Options**:

| Option Name | Description | 
|---|---|
| `--non-interactive` | Run in non-interactive mode. Won't prompt the user for input. Useful for scripts, automation, CI/CD. Default: `false`. |
| `--no-color` | Disable terminal colors. Only works with the non-interactive flag. Default: `false` |
| `--update-strategy value` | The update strategy to use in non-interactive mode. Must be one of: [`next-safe`, `next-breaking`]. Default: `next-safe`. |
| `--plan-file value` | Path to the JSON file containing the resolved upgrade plan.
| `--spec-file value` | Path to the JSON file containing the upgrade spec. |
| `--spec-target value [--spec-target value]...` | Limit the update to the given dependency in the upgrade spec. Can be used multiple times. e.g: `--spec-target gruntwork-io/terraform-aws-service-catalog/services/ecs-module`. Only works with the `spec-file` flag. |
| `--target value [--target value]...` | Limit the update to the given dependency and optionally specify the target version. Can be used multiple times. e.g: `--target gruntwork-io/terraform-aws-service-catalog/services/ecs-module@v0.1.0`. Only works with the `non-interactive` flag. |
| `--publish` | Publish the changes to the remote Git repository and open a pull request. Only works with the `non-interactive` flag. Default: `false`. |
| `--pr-branch value` | The branch to create a pull request against. Only works with the `publish` flag. |
| `--pr-title value` | The title of the pull request to create. Only works with the `publish` flag. |
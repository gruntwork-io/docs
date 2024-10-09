---
title: "Terraform Helpers"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="CI Modules" version="0.58.2" lastModifiedVersion="0.52.4"/>

# Terraform Helpers

<a href="https://github.com/gruntwork-io/terraform-aws-ci/tree/v0.58.2/modules/terraform-helpers" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.52.4" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This folder contains several helper scripts for working with [Terraform](https://www.terraform.io/). The scripts are:

1.  `terraform-update-variable`: This script can automatically update a variable in a `terraform.tfvars` or
    `terragrunt.hcl` file and commit and push the changes to Git. It's common practice to store the version number of the
    currently deployed app in a variable and this script comes in handy for updating those variables automatically, such
    as in a CI job after building a new AMI or Docker image.
2.  `git-updated-files`: This script can be used to detect all the files that have have been updated between two git
    refs (branch, tag, sha, etc). This can be used in a CI pipeline to find various scripts and files that were affected
    and only run actions against those files (e.g., build scripts).
3.  `git-updated-folders`: This script can be used to detect all the folders that have have been updated between two git
    refs (branch, tag, sha, etc). This can be used in a CI pipeline to find the terraform and terragrunt modules that
    have changed, and only run `plan` or `apply` on the modules that has been affected.

## Using the helper scripts in your code

You can install these scripts using the [Gruntwork Installer](https://github.com/gruntwork-io/gruntwork-installer):

```bash
gruntwork-install --module-name "terraform-helpers" --repo "https://github.com/gruntwork-io/terraform-aws-ci" --tag "0.0.1"
```

Note that `terraform-update-variable` depends on the [git-helpers module](https://github.com/gruntwork-io/terraform-aws-ci/tree/v0.58.2/modules/git-helpers) being installed!

See the examples in the next section for how to use them.

## Examples

The examples below should give you an idea of how to use the scripts. Run the scripts above with the `--help` flag to
see full documentation.

*   [terraform-update-variable](#terraform-update-variable)
*   [git-updated-files](#git-updated-files)
*   [git-updated-folders](#git-updated-folders)

## terraform-update-variable

### Terragrunt

Imagine you have a set of Terragrunt config in the `live` folder to deploy an app called `rails-app`. You create
Amazon Machine Images (AMIs) for each new version of the app using [Packer](https://www.packer.io/) and the currently
deployed version of the app is defined in a variable called `rails_app_version`, set to `ami-12345` in
`live/rails-app/terragrunt.hcl`.

If you just build a new version of the AMI, `ami-67890`, you could deploy it automatically, perhaps in a CI job,
as follows:

```bash
cd live/rails-app
# Due to the existence of types in terragrunt.hcl, we need to be explicit about how the variable values are quoted.
terraform-update-variable --name rails_app_version --value "\"ami-67890\""
terragrunt apply
```

Running the commands above would:

1.  Set the `rails_app_version` variable in the inputs map to the ID of the new AMI, `ami-67890` in `terragrunt.hcl`.
2.  `commit` and `push` the changes to `terragrunt.hcl` to Git.
3.  Deploy the changes using Terragrunt.

### Terraform

Imagine you have a set of Terraform templates in the `templates` folder to deploy an app called `rails-app`. You create
Amazon Machine Images (AMIs) for each new version of the app using [Packer](https://www.packer.io/) and the currently
deployed version of the app is defined in a variable called `rails_app_version`, set to `ami-12345` in
`templates/terraform.tfvars`.

If you just build a new version of the AMI, `ami-67890`, you could deploy it automatically, perhaps in a CI job,
as follows:

```bash
cd templates
terraform-update-variable --vars-path terraform.tfvars --name rails_app_version --value "\"ami-67890\""
terraform apply
```

Running the commands above would:

1.  Set the `rails_app_version` variable to the ID of the new AMI, `ami-67890` in `terraform.tfvars`.
2.  `commit` and `push` the changes to `terraform.tfvars` to Git.
3.  Deploy the changes using Terraform.

## git-updated-files

### Build scripts

Consider the following typical terragrunt folder structure:

```
.
├── shared
│   └── us-east-1
│       └── _global
│           └── amis
│               └── build_web_server_ami.sh*
├── non-prod
│   ├── terragrunt.hcl
│   └── us-east-1
│       ├── qa
│       │   ├── env.yaml
│       │   ├── mysql
│       │   │   └── terragrunt.hcl
│       │   └── webserver-cluster
│       │       └── terragrunt.hcl*
│       ├── region.yaml
│       └── stage
│           ├── env.yaml
│           ├── mysql
│           │   └── terragrunt.hcl
│           └── webserver-cluster
│               └── terragrunt.hcl*
└── prod
    ├── terragrunt.hcl
    └── us-east-1
        ├── prod
        │   ├── env.yaml
        │   ├── mysql
        │   │   └── terragrunt.hcl
        │   └── webserver-cluster
        │       └── terragrunt.hcl*
        └── region.yaml*
```

Here we use `*` to indicate files that have been modified between the git refs `development` and `main`. To get the
build scripts that have changed:

```
$ git-updated-files --source-ref development --target-ref main --ext sh
shared/us-east-1/_global/amis/build_web_server_ami.sh
```

This command looks for the files that changed with the extension `sh`. You can use this in your CI pipeline to act only
on the files that changed in a particular commit. For example, in this case, you might want to invoke the build scripts
that changed so that new AMIs can be built.

This command is not limited to a single extension. You can detect other files (e.g. `yaml` files) by passing additional
`--ext` arguments. For example, to get the `region.yaml` file, you can run:

```
$ git-updated-files --source-ref development --target-ref main --ext sh --ext yaml
shared/us-east-1/_global/amis/build_web_server_ami.sh
prod/us-east-1/region.yaml
```

You can also do search for files that changed that do not match the extension. For example, to get all files that
changes that are not `terragrunt.hcl`:

```
$ git-updated-files --source-ref development --target-ref main --exclude-ext terragrunt.hcl
shared/us-east-1/_global/amis/build_web_server_ami.sh
prod/us-east-1/region.yaml
```

## git-updated-folders

### Terragrunt

Consider the following typical terragrunt folder structure:

```
.
├── shared
│   └── us-east-1
│       └── _global
│           └── amis
│               └── build_web_server_ami.sh
├── non-prod
│   ├── terragrunt.hcl
│   └── us-east-1
│       ├── qa
│       │   ├── env.yaml
│       │   ├── mysql
│       │   │   └── terragrunt.hcl*
│       │   └── webserver-cluster
│       │       └── terragrunt.hcl
│       ├── region.yaml
│       └── stage
│           ├── env.yaml
│           ├── mysql
│           │   └── terragrunt.hcl*
│           └── webserver-cluster
│               └── terragrunt.hcl
└── prod
    ├── terragrunt.hcl
    └── us-east-1
        ├── prod
        │   ├── env.yaml
        │   ├── mysql
        │   │   └── terragrunt.hcl*
        │   └── webserver-cluster
        │       └── terragrunt.hcl
        └── region.yaml
```

Here we use `*` to indicate files that have been modified between the git refs `development` and `main`. To get the
terragrunt modules that have changed:

```
$ git-updated-modules --source-ref development --target-ref main --terragrunt
non-prod/us-east-1/qa/mysql
non-prod/us-east-1/stage/mysql
prod/us-east-1/prod/mysql
```

Each of these folders were detected as terragrunt modules (because they contain a `terragrunt.hcl` file), and were
marked as changed because the underlying terragrunt config was updated.

Note that this will only detect `terragrunt.hcl` files that have changed. For example, in the following scenario where
the root `terragrunt.hcl` file and a few yaml files were changed (the files denoted with `*` are those that changed),
only the root folder is returned:

```
.
├── non-prod
│   ├── terragrunt.hcl*
│   └── us-east-1
│       ├── qa
│       │   ├── env.yaml
│       │   ├── mysql
│       │   │   └── terragrunt.hcl
│       │   └── webserver-cluster
│       │       └── terragrunt.hcl
│       ├── region.yaml*
│       └── stage
│           ├── env.yaml
│           ├── mysql
│           │   └── terragrunt.hcl
│           └── webserver-cluster
│               └── terragrunt.hcl
└── prod
    ├── terragrunt.hcl
    └── us-east-1
        ├── prod
        │   ├── env.yaml
        │   ├── mysql
        │   │   └── terragrunt.hcl
        │   └── webserver-cluster
        │       └── terragrunt.hcl
        └── region.yaml*
```

```
$ git-updated-modules --source-ref development --target-ref main --terragrunt
non-prod
```

If you want to additionally pull in the folders with the `yaml` files that changed, you can pass in `--ext .yaml`:

```
$ git-updated-modules --source-ref development --target-ref main --terragrunt --ext .yaml
non-prod
non-prod/us-east-1
prod/us-east-1
```

### Terraform

Consider the following project structure for a monorepo terraform project:

```
.
├── modules
│   ├── mysql
│   │   ├── main.tf
│   │   ├── outputs.tf*
│   │   └── variables.tf
│   └── webserver-cluster
│       ├── main.tf
│       ├── outputs.tf
│       └── variables.tf
└── live
    └── us-east-1
        ├── prod
        │   ├── terraform.tfvars
        │   ├── main.tf*
        │   ├── outputs.tf*
        │   └── variables.tf
        └── non-prod
            ├── terraform.tfvars*
            ├── main.tf
            ├── outputs.tf
            └── variables.tf
```

Here we use `*` to indicate files that have been modified between the git refs `development` and `main`. To get the
terraform modules that have changed:

```
$ git-updated-modules --source-ref development --target-ref main --terraform
modules/mysql
live/us-east-1/prod
live/us-east-1/non-prod
```

Each of these were detected as terraform modules (because they contain `.tf` files), and were marked as changed because
one of the underlying `.tf` or `.tfvars` files have changed. Specifically:

*   `modules/mysql` <= `modules/mysql/outputs.tf`
*   `live/us-east-1/prod` <= `live/us-east-1/prod/main.tf` and `live/us-east-1/prod/outputs.tf`
*   `live/us-east-1/non-prod` <= `live/us-east-1/non-prod/terraform.tfvars`

### Deleted folders

By default, `git-updated-folders` will include deleted folders in the return list. This can cause problems in
infrastructure pipelines as you don't want to run any `plan` or `apply` action on folders that don't exist.

To support destroy workflows, the `git-updated-folders` script supports two filters:

*   `--exclude-deleted`: This parameter will tell `git-updated-folders` to exclude folders that have been deleted when
    returning the updated folders.
*   `--include-deleted-only`: This parameter will tell `git-updated-folders` to only include folders that have been
    deleted when returning the updated folders.

Note that a folder is only considered deleted if all the tracked files in that folder is deleted. E.g., if you have a
folder that only deleted the `*.tf` files, but keeps a `README.md`, then that folder is NOT considered deleted by the
script because it still contains a tracked file.

In your infrastructure pipelines, you should use `--exclude-deleted` to filter out the deleted folders from your `plan`
and `apply` actions so that Terraform/Terragrunt can run. If you wish to implement destroy workflows, you can use the
`--include-deleted-only` parameter to setup a separate pipeline for handling `destroy` actions.


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-ci/tree/v0.58.2/modules/terraform-helpers/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-ci/tree/v0.58.2/modules/terraform-helpers/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-ci/tree/v0.58.2/modules/terraform-helpers/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "265614dd4f91aeee88a9906410f98edf"
}
##DOCS-SOURCER-END -->

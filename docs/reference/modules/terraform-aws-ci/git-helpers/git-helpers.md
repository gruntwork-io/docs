---
title: "Git Helpers"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="CI Modules" version="1.0.1" lastModifiedVersion="0.52.4"/>

# Git Helpers

<a href="https://github.com/gruntwork-io/terraform-aws-ci/tree/v1.0.1/modules/git-helpers" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.52.4" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This module contains helper scripts that automate common git tasks:

*   `git-rebase`: This script can be used to merge git branch A into branch B using git rebase.
*   `git-add-commit-push`: This script is meant to be run in a CI job to add, commit, and push a given set of files to
    Git, handling common tasks like configuring Git in a CI job, checking for common error cases, and ensuring the commit
    doesn't trigger another CI job.

## Installing the helpers

You can install the helpers using the [Gruntwork Installer](https://github.com/gruntwork-io/gruntwork-installer)
(make sure to replace `<VERSION>` below with the latest version from the [releases
page](https://github.com/gruntwork-io/terraform-aws-ci/releases)):

```bash
gruntwork-install --module-name "git-helpers" --repo "https://github.com/gruntwork-io/terraform-aws-ci" --tag "<VERSION>"
```

We recommend running this command in the `dependencies` section of `circle.yml`:

```yaml
dependencies:
  override:
    # Install the Gruntwork Installer
    - curl -Ls https://raw.githubusercontent.com/gruntwork-io/gruntwork-installer/main/bootstrap-gruntwork-installer.sh | bash /dev/stdin --version 0.0.9

    # Use the Gruntwork Installer to install the gruntwork-module-circleci-helpers module
    - gruntwork-install --module-name "git-helpers" --repo "https://github.com/gruntwork-io/terraform-aws-ci" --tag "0.0.5"
```

## Using the git-add-commit-push helper

The most common use-case for this script is to automatically commit generated files (e.g. generated code, auto-filled
version number, aut-generated docs) to Git at the end of a CI job. Here is an example `circle.yml` file that shows the
usage:

```yaml
deployment:
  release:
    tag: /v.*/
    commands:
      # Generate a new file
      - auto-generate-some-code --output generated-file.txt
      # Commit the file to Git
      - git-add-commit-push --path generated-file.txt --message "Automatically regenerate generated-file.txt"
```

The main options to pass to `git-add-commit-push` are:

*   `--path`: The path to add, commit, and push to Git. Required. May be specified more than once.
*   `--message`: The commit message. Required.

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-ci/tree/v1.0.1/modules/git-helpers/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-ci/tree/v1.0.1/modules/git-helpers/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-ci/tree/v1.0.1/modules/git-helpers/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "d03be9231da9be2fe4de8c859bcd2a34"
}
##DOCS-SOURCER-END -->

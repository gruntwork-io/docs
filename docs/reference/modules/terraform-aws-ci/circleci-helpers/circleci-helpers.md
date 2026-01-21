---
title: "CircleCI Helpers"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="CI Modules" version="1.0.0" lastModifiedVersion="1.0.0"/>

# CircleCI Helpers

<a href="https://github.com/gruntwork-io/terraform-aws-ci/tree/v1.0.0/modules/circleci-helpers" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v1.0.0" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This module contains helper scripts specially for CircleCI jobs, including:

*   `place-repo-in-gopath`: Places the git repo that triggered the CircleCI build in the GOPATH. This is useful because
    some tools (e.g. vendoring tools) require that they be executed in a repo located within the GOPATH.
*   `install-go-version`: Installs the given version of Golang.

## Installing the helpers

You can install the helpers using the [Gruntwork Installer](https://github.com/gruntwork-io/gruntwork-installer):

```bash
gruntwork-install --module-name "circleci-helpers" --repo "https://github.com/gruntwork-io/terraform-aws-ci" --tag "0.0.1"
```

We recommend running this command in the `dependencies` section of `circle.yml`:

```yaml
dependencies:
  override:
    # Install the Gruntwork Installer
    - curl -Ls https://raw.githubusercontent.com/gruntwork-io/gruntwork-installer/main/bootstrap-gruntwork-installer.sh | bash /dev/stdin --version 0.0.9

    # Use the Gruntwork Installer to install the gruntwork-module-circleci-helpers module
    - gruntwork-install --module-name "circleci-helpers" --repo "https://github.com/gruntwork-io/terraform-aws-ci" --tag "0.0.5"
```

## Using the place-repo-in-gopath script

The `place-repo-in-gopath` script will create symlinks so GOPATH works correctly, as explained in [this
post](https://robots.thoughtbot.com/configure-circleci-for-go).

We recommend running this helper in the `dependencies` section of `circle.yml`:

```yaml
dependencies:
  override:
    # Install the Gruntwork Installer
    - curl -Ls https://raw.githubusercontent.com/gruntwork-io/gruntwork-installer/main/bootstrap-gruntwork-installer.sh | bash /dev/stdin --version 0.0.9

    # Use the Gruntwork Installer to install the gruntwork-module-circleci-helpers module
    - gruntwork-install --module-name "circleci-helpers" --repo "https://github.com/gruntwork-io/terraform-aws-ci" --tag "0.0.1"

    # Place the repo in the GOPATH
    - place-repo-in-gopath
```

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-ci/tree/v1.0.0/modules/circleci-helpers/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-ci/tree/v1.0.0/modules/circleci-helpers/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-ci/tree/v1.0.0/modules/circleci-helpers/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "8981248224724f25d4e4bf7928214000"
}
##DOCS-SOURCER-END -->

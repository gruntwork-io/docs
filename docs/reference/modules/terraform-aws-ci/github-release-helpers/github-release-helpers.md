---
title: "GitHub Release Helpers"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="CI Modules" version="0.58.2" lastModifiedVersion="0.58.1"/>

# GitHub Release Helpers

<a href="https://github.com/gruntwork-io/terraform-aws-ci/tree/v0.58.2/modules/github-release-helpers" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.58.1" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This repository contains a collection of scripts designed to automate the creation and management of GitHub releases.
These scripts streamline the process of preparing release files, signing them with GPG, and publishing them as release
candidates or final releases on GitHub.

## Features

*   **GPG Signing**: Securely sign your release files using GPG before publishing.
*   **Automated Release Creation**: Automate the creation of GitHub releases, including both release candidates and final releases.
*   **Asset Verification and Re-uploading**: Ensure that all assets are correctly uploaded to GitHub, with automatic retries for failed uploads.

## Scripts

### GPG Signing of Files

The `sign-files` script is used to package and sign release files with a GPG key. This is particularly useful for
ensuring the integrity and authenticity of your releases.

#### Usage

```bash
sign-files --source-dir bin --out-dir release --name terragrunt-iac-engine-opentofu --version 0.0.1
```

#### Arguments

*   `--source-dir`: The directory containing the files to be signed. (Default: `bin`)
*   `--out-dir`: The directory where the signed files will be output. (Default: `release`)
*   `--name`: The name of the release. (Default: `terragrunt-iac-engine-opentofu`)
*   `--version`: The version of the release. (Default: `0.0.1`)

### Create GitHub RC and Release

The `create-release` script automates the creation of GitHub releases, starting from a release candidate (RC) tag and
culminating in a final release. It handles all aspects of the release process, including asset management and versioning.

#### Usage

```bash
create-release --repo-owner gruntwork-io --repo-name terragrunt-engine-opentofu --version 1.0.0 --rc-version 1.0.0-rc1 --release-dir release
```

#### Arguments

*   `--repo-owner`: The owner of the GitHub repository. (Default: `gruntwork-io`)
*   `--repo-name`: The name of the GitHub repository. (Default: `terragrunt-engine-opentofu`)
*   `--version`: The version number for the release. (Default: extracted from the `TAG` environment variable)
*   `--rc-version`: The release candidate version tag. (Default: extracted from the `TAG` environment variable)
*   `--release-dir`: The directory containing the files to be included in the release. (Default: `release`)

### Example Workflow

1.  **Sign Files**: Before creating a release, you might want to sign your binaries or other files to ensure they haven't been tampered with.

```bash
sign-files --source-dir bin --out-dir release --name terragrunt-iac-engine-opentofu --version 0.0.1
```

2.  **Create Release**: After signing the files, you can create a GitHub release. First, create a release candidate (RC), and once validated, create the final release.

```bash
create-release --repo-owner gruntwork-io --repo-name terragrunt-engine-opentofu --rc-version 1.0.0-rc1 --version 1.0.0 --release-dir release
```


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-ci/tree/v0.58.2/modules/github-release-helpers/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-ci/tree/v0.58.2/modules/github-release-helpers/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-ci/tree/v0.58.2/modules/github-release-helpers/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "8f957fb1054e26da7acc06a164bf314c"
}
##DOCS-SOURCER-END -->

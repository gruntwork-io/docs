---
title: "Binary signing Helpers"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="CI Modules" version="0.59.9" lastModifiedVersion="0.57.0"/>

# Binary signing Helpers

<a href="https://github.com/gruntwork-io/terraform-aws-ci/tree/v0.59.9/modules/sign-binary-helpers" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.57.0" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This module contains helper script called `sign-binary` used to sign executable files for Windows and MacOS.

## Installing the helpers

You can install the helpers using the [Gruntwork Installer](https://github.com/gruntwork-io/gruntwork-installer):

```bash
gruntwork-install --module-name "sign-binary-helpers" --repo "https://github.com/gruntwork-io/terraform-aws-ci" --tag "0.0.1"
```

## Using sign-binary helper

Script can be used to sign binaries for different operating systems (MacOS, Windows).

## Windows signing

*   Signing can be done in Linux (containers) or Windows environments
*   `osslsigncode` tool is used to sign and should be installed in the environment
*   Signed binary is not sent to any third party

The script requires mandatory environment variables to be set with sensitive data to avoid possible logging.

Required environment variables for signing Windows binaries:

*   `WINDOWS_CERT` - Signing certificate encoded in Base64 format
*   `WINDOWS_KEY`  - Certificate key, encoded in Base64 format
*   `WINDOWS_CERT_NAME` - Name used during signing of binaries
*   `WINDOWS_CERT_URL` - Url saved in binary file signature

Note: values for `WINDOWS_CERT` and `WINDOWS_KEY` are provided by signing authority.

Required script options:

*   `--os`: Operating system for which binaries should be signed. Allowed values: mac, windows.

Windows signing example:

```bash
export WINDOWS_CERT=$(cat codesign.crt | base64 -w0)
export WINDOWS_KEY=$(cat codesign.key | base64 -w0)
export WINDOWS_CERT_NAME=Terragrunt
export WINDOWS_CERT_URL=https://www.gruntwork.io

sign-binary --os windows terragrunt_windows_amd64.exe
```

Outputs:

*   file `terragrunt_windows_amd64.exe` will be signed with provided certificate

## MacOS signing

> :warning: 14th February 2023: The `gon` project does not work in the Apple Silicon M1 machines. See
> https://github.com/mitchellh/gon/issues/64 on how use a fork of the project with the fix. To run this project locally,
> it's recommended to use `gon` directly.

*   MacOS environment is required with XCode
*   Valid Apple developer account credentials
*   `gon` utility is used to sign and notarize binary
*   During notarization - binary will be sent to Apple, the process is synchronous - script will wait for the entire
    process to finish

The script requires mandatory environment variables to be set with sensitive data to avoid possible logging.

Required environment variables for signing MacOS binaries:

*   `MACOS_CERTIFICATE` - Apple developer certificate exported in P12 format and encoded in Base64, certificate can be
    obtained in [developer.apple.com](https://developer.apple.com/), exporting steps are documented on [gon](https://github.com/mitchellh/gon#prerequisite-acquiring-a-developer-id-certificate) page
    *   **For Grunts**: The .cer file, the .p12 file, and it's password are in 1Password.
*   `MACOS_CERTIFICATE_PASSWORD` - Developer certificate password, set during exporting of certificate

Required environment variables for notarizing the MacOS binaries:

*   `MACOS_AC_LOGIN` - The Apple account's email. The account should be enrolled to the Apple Developer Program.
*   `MACOS_AC_PASSWORD` - You have to create an app-specific password at the [Apple ID](http://appleid.apple.com/account/manage) portal. Under the `Security` area -&gt; `Generate Password...` and that will give you the password you can use for the notarization. This is necessary because Apple needs a different password for third-party apps.

Required script options:

*   `--os`: Operating system for which binaries should be signed. Allowed values: mac, windows.

MacOS signing example (MacOS environment with XCode installed):

```hcl
# sign.hcl https://github.com/mitchellh/gon#configuration-file
source = ["./app_darwin_arm64"]
# application identifier https://developer.apple.com/documentation/appstoreconnectapi/bundle_ids
bundle_id = "io.gruntwork.app.identifier"
sign {
  # The name of the certificate.
  application_identity = "Developer ID Application: Gruntwork, Inc."
}
apple_id {
  username = "@env:MACOS_AC_LOGIN"
  password = "@env:MACOS_AC_PASSWORD"
}
zip {
  output_path = "app_darwin_arm64.zip"
}
# Send binary to Apple for notarization
notarize {
  path = "./app_darwin_arm64.zip"
  # The same `bundle_id` as above
  bundle_id = "io.gruntwork.app.identifier"
}
```

Binary signing and notarization:

```bash
export MACOS_CERTIFICATE=$(cat developer-cert.p12 | base64)
export MAC_CERTIFICATE_PASSWORD="..."

export MACOS_AC_LOGIN="your@email.com"
export MACOS_AC_PASSWORD="Password to Apple developer portal, can be service account password too"

sign-binary --os mac sign.hcl
```

Outputs:

*   `app_darwin_arm64.zip` - signed and notarized executable file
*   An email from Apple saying that notarization was accepted (or failed)

References:

*   https://github.com/mtrojnar/osslsigncode
*   https://github.com/mitchellh/gon
*   https://localazy.com/blog/how-to-automatically-sign-macos-apps-using-github-actions

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-ci/tree/v0.59.9/modules/sign-binary-helpers/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-ci/tree/v0.59.9/modules/sign-binary-helpers/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-ci/tree/v0.59.9/modules/sign-binary-helpers/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "f89daae655ec24329b2325ef0263f2a6"
}
##DOCS-SOURCER-END -->

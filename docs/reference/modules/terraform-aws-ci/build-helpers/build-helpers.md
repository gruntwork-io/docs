---
title: "Build Helpers"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="CI Modules" version="0.59.9" lastModifiedVersion="0.50.11"/>

# Build Helpers

<a href="https://github.com/gruntwork-io/terraform-aws-ci/tree/v0.59.9/modules/build-helpers" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.50.11" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This folder contains several helper scripts for automatically building deployable, versioned artifacts of your apps:

*   `build-docker-image`: This script is meant to be run from a CI job to automatically build a Docker image. It builds
    the Docker image, tags the image with the sha1 of the most recent Git commit (or a custom tag, if specified), and then
    pushes the new image to a Docker registry (unless the same image/tag already exists in the registry!).

*   `build-packer-artifact`: This script can be used to automatically build an artifact, such as an AMI, defined in a
    Packer template. It runs a Packer build, runs an optional test command to verify the new artifact, extracts the
    artifact ID from the build, and writes the ID to a properties file. This script is meant to be run from a CI job and
    the properties file is a convenient way to pass information about the new artifact to another CI job.

## Using the helper scripts in your code

You can install these scripts using the [Gruntwork Installer](https://github.com/gruntwork-io/gruntwork-installer):

```bash
gruntwork-install --module-name "build-helpers" --repo "https://github.com/gruntwork-io/terraform-aws-ci" --tag "v0.29.1"
```

## Properties files

After a successful build, the build helper scripts write the versions of the artifacts they produce to a properties
file. The idea is that this properties file is easy to use in other scripts or other CI jobs to deploy those artifacts.

The `build-docker-image` script adds an entry to the properties file of the form:

```
DOCKER_IMAGE_TAG=<IMAGE_TAG>
```

The `build-packer-artifact` script adds an entry to the properties file of the form:

```
ARTIFACT_ID=<ARTIFACT_ID>
```

## Examples

The examples below should give you an idea of how to use the scripts. Run the scripts above with the `--help` flag to
see full documentation.

Imagine you have a Packer template `templates/build.json` that specifies how to build an AMI for your app. You could
set up automatic deployment for this app using two Jenkins CI jobs: `build-app` and `deploy-app`.

The `build-app` CI job would first use the `build-packer-artifact` script to automatically build your AMI:

```bash
build-packer-artifact --packer-template-path templates/build.json --output-properties-file artifacts.properties
```

Next, the `build-app` CI job would then pass the contents of `artifacts.properties` directly to the `deploy-app` CI
job using the [Jenkins Parameterized Trigger
Plugin](https://wiki.jenkins-ci.org/display/JENKINS/Parameterized+Trigger+Plugin). The `deploy-app` CI job, in turn,
would be a [parameterized build](https://wiki.jenkins-ci.org/display/JENKINS/Parameterized+Build) that takes as input
a parameter called `ARTIFACT_ID` (the same parameter name that's in the `artifacts.properties` file) and use it, along
with the scripts in the [terraform-helpers module](https://github.com/gruntwork-io/terraform-aws-ci/tree/v0.59.9/modules/terraform-helpers) to automatically deploy the new AMI:

```bash
cd templates
terraform-update-variable --name rails_app_version --value $ARTIFACT_ID
terragrunt apply
```

## Remote packer templates

`build-packer-artifact` also supports building Packer templates that are stored in a git repository. When a path of the
format `git::GIT_REPO_URL//RELATIVE_PATH_TO_PACKER_TEMPLATE?ref=GIT_REF` is passed in as the Packer template path,
`build-packer-artifact` will clone the repository `GIT_REPO_URL` at the ref `GIT_REF` to a temporary directory and build
the template referenced at `RELATIVE_PATH_TO_PACKER_TEMPLATE` in the git repository.

For example, to build the example jenkins Packer template in this repo on the release tag `v0.19.0`:

```
build-packer-artifact \
  --packer-template-path git::git@github.com:gruntwork-io/terraform-aws-ci.git//examples/jenkins/packer/jenkins.json?ref=v0.19.0
```

### Accessing private repositories

`build-packer-artifact` supports a way to load authentication credentials to access private remote git repositories via
SSH or HTTPS. Both mechanisms assume the authentication credentials are stored in [AWS Secrets
Manager](https://aws.amazon.com/secrets-manager/).

For SSH, `build-packer-artifact` can load a password-less SSH private key from AWS Secrets Manager:

1.  Create a new AWS Secrets Manager entry containing the full private SSH key. You can create it using the `awscli`:

    ```
     aws secretsmanager create-secret --name GitSSHPrivateKey --secret-string file://path/to/ssh/private/key.pem
    ```

2.  Record the ARN of the Secrets Manager entry you created in step 1.

3.  Pass the ARN of the Secrets Manager entry to `build-packer-artifact` using the input option
    `--ssh-key-secrets-manager-arn`.

For HTTPS, `build-packer-artifact` can load personal access tokens to authenticate to remote repositories for GitHub,
GitLab, and BitBucket.

1.  For each platform, create a Personal Access Token for accessing private repositories over HTTPS.

2.  Load the personal access token for your VCS platform in to AWS Secrets Manager. You can create it using the `awscli`:

    ```
     aws secretsmanager create-secret --name GitPersonalAccessToken --secret-string "$GIT_PERSONAL_ACCESS_TOKEN"
    ```

3.  Record the ARN of the Secrets Manager entry you created in step 2.

4.  Pass the ARN of the Secrets Manager entry to `build-packer-artifact` using the input option
    `--github-token-secrets-manager-arn`, `--gitlab-token-secrets-manager-arn`, or
    `--bitbucket-token-secrets-manager-arn`, depending on which VCS platform you are using. Note that for BitBucket, you
    must also provide `--bitbucket-username`, which corresponds to the username of the BitBucket account the personal
    access token is for.

## Idempotent packer templates

For AWS AMI builds that use `tags`, `build-packer-artifact` supports idempotent builds by AMI tags. When you pass in
`--idempotent true` to the script, `build-packer-artifact` will only build a new AMI if an existing AMI with the same
tags and similar name does not already exist in your account. A name is similar if everything matches except for unique
build time identifiers (e.g., that returned by `isotime`, `uuid`, or `timestamp`).

Note that we include the name in the idempotency check to ensure that you can preserve AMIs in a multiaccount scenario,
where AMI tags are not visible in the target account.

For example, consider the following packer template:

```json
{
  "variables": {
    "aws_region": "us-east-1",
    "tag": ""
  },
  "builders": [{
    "ami_name": "gruntwork-test-{{user `tag`}}-packer-build-{{uuid | clean_resource_name}}",
    "ami_description": "An AMI created as part of testing the build-packer-artifact script.",
    "instance_type": "t2.micro",
    "region": "{{user `aws_region`}}",
    "type": "amazon-ebs",
    "source_ami": "ami-fce3c696",
    "ssh_username": "ubuntu",
    "tags": {
      "tag": "{{user `tag`}}"
    }
  }],
  "provisioners": [{
    "type": "shell",
    "inline": [
      "echo 'Hello, World'"
    ]
  }]
}
```

If you pass in the `--idempotent true` and `--var tag=v1`, then this will only build the AMI if it does not find any AMI
with the tag `tag=v1` and name that begins with `gruntwork-test-v1-packer-build-` in the `us-east-1` region.

Under the hood the tags, names, and regions are computed at runtime using `packer console` with the provided vars.

Note that the following conditions must be true in order to use this feature:

*   Packer version is at least `v1.4.2` (version that introduced `packer console`).
*   Templates are in `json` format (you can not use HCL based templates at this time).
*   Build is for an AMI (builder type `amazon-ebs`).
*   Builder is configured to tag the AMIs (`tags` is set).

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-ci/tree/v0.59.9/modules/build-helpers/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-ci/tree/v0.59.9/modules/build-helpers/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-ci/tree/v0.59.9/modules/build-helpers/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "60bc0132f6e4a421c7233907375948ad"
}
##DOCS-SOURCER-END -->

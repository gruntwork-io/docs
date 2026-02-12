---
title: "Check Url"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="CI Modules" version="1.3.0" lastModifiedVersion="0.50.11"/>

# Check Url

<a href="https://github.com/gruntwork-io/terraform-aws-ci/tree/v1.3.0/modules/check-url" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.50.11" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This folder contains a script called `check-url`. This script can be used to repeatedly test a URL until either it
returns an expected response, and the script exits successfully, or the max number of retries is exceeded, and the
script exits with an error.

## Installing the script in your code

You can install these scripts using the [Gruntwork Installer](https://github.com/gruntwork-io/gruntwork-installer):

```bash
gruntwork-install --module-name "check-url" --repo "https://github.com/gruntwork-io/terraform-aws-ci" --tag "v0.3.6"
```

## Example usage

One place this script is useful is as part of a CI job that automatically deploys a Docker container using Amazon's
[EC2 Container Service](https://aws.amazon.com/ecs/). When you deploy a service with ECS (e.g. by running Terraform or
making an API call to AWS), the ECS scheduler will always return a "success" response. However, it's possible the
scheduler won't actually be able to deploy your Docker container, either because there is no room left for it in your
ECS cluster or because there is a bug in the container itself that prevents it from booting correctly. Unfortunately,
there is no way for your CI job to know about that, so it'll exit successfully, even though the deployment actually
failed.

The `check-url` script can help you verify your container actually deployed successfully, assuming that container
exposes an endpoint this script can test. For example, imagine you added a `/version` endpoint to your Docker container
that returns the currently running version:

```
> curl http://www.my-company.com/version

version = 1.0.0
```

After telling ECS to deploy version 2.0.0 of your container, you can use the `check-url` to repeatedly test the
`/version` URL until it returns 2.0.0, which means your new container deployed successfully, or the maximum retries
are exceeded (default is to keep retrying for 5 minutes), which means the container failed to deploy:

```
> check-url --url http://www.my-company.com/version --expected-body 2.0.0

Making a request to URL http://www.my-company.com/version
Response code: 200
Response body:
version = 1.0.0
Body did not contain expected text '1.0.0'
Sleeping for 10 seconds before trying again.
 
Making a request to URL http://www.my-company.com/version
Response code: 200
Response body:
version = 1.0.0
Body did not contain expected text '1.0.0'
Sleeping for 10 seconds before trying again.
 
Making a request to URL http://www.my-company.com/version
Response code: 200
Response body:
version = 2.0.0
Success! Got expected status code '200' and text '2.0.0' from URL http://www.my-company.com/version. 
```

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-ci/tree/v1.3.0/modules/check-url/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-ci/tree/v1.3.0/modules/check-url/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-ci/tree/v1.3.0/modules/check-url/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "675f2b2225099e162325d9ac5ad984c8"
}
##DOCS-SOURCER-END -->

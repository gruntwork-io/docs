---
title: "ElastAlert IAM Policies"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="ELK AWS Module" version="0.11.1" lastModifiedVersion="0.11.0"/>

# ElastAlert IAM Policies

<a href="https://github.com/gruntwork-io/terraform-aws-elk/tree/master/modules/elastalert-iam-policies" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-elk/releases/tag/v0.11.0" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This folder contains a [Terraform](https://www.terraform.io/) module that defines the IAM Policies used by an
[ElastAlert](https://github.com/Yelp/elastalert) cluster. These policies are defined in a separate module
so that you can add them to any existing IAM Role.

## Quick start

Let's say you want to deploy ElastAlert using the [elastalert
module](https://github.com/gruntwork-io/terraform-aws-elk/tree/master/modules/elastalert):

```hcl
module "elastalert" {
  # TODO: replace <VERSION> with the latest version from the releases page: https://github.com/gruntwork-io/terraform-aws-elk/releases
  source = "github.com/gruntwork-io/terraform-aws-elk//modules/elastalert?ref=<VERSION>"

  # ... (other params omitted) ...
}
```

You can attach the IAM policies to this cluster as follows:

```hcl
module "elastalert_iam_policies" {
  # TODO: replace <VERSION> with the latest version from the releases page: https://github.com/gruntwork-io/terraform-aws-elk/releases
  source = "github.com/gruntwork-io/terraform-aws-elk//modules/elastalert-iam-policies?ref=<VERSION>"

  iam_role_id = module.elasticsearch.iam_role_id
}
```

Note the following parameters:

*   `source`: Use this parameter to specify the URL of this module. The double slash (`//`) is intentional
    and required. Terraform uses it to specify subfolders within a Git repo (see [module
    sources](https://www.terraform.io/docs/modules/sources.html)). The `ref` parameter specifies a specific Git tag in
    this repo. That way, instead of using the latest version of this module from the `master` branch, which
    will change every time you run Terraform, you're using a fixed version of the repo.

*   `iam_role_id`: Use this parameter to specify the ID of the IAM Role to which the policies in this module
    should be added.

You can find the other parameters in [variables.tf](https://github.com/gruntwork-io/terraform-aws-elk/tree/master/modules/elastalert-iam-policies/variables.tf).

Check out the [elk-multi-cluster example](https://github.com/gruntwork-io/terraform-aws-elk/tree/master/examples/elk-multi-cluster) for working sample code.

## Sample Usage

<ModuleUsage>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S ELASTALERT-IAM-POLICIES MODULE
# ------------------------------------------------------------------------------------------------------

module "elastalert_iam_policies" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-elk.git//modules/elastalert-iam-policies?ref=v0.11.1"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The ID of the IAM Role to which these IAM policies should be attached
  iam_role_id = <INPUT REQUIRED>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The name we will give to the aws_iam_role_policy.
  policy_name = "elastalert-cluster-policy"

  # The Amazon S3 bucket ARNs to grant the Elasticsearch instances access to for
  # storing backup snapshots
  sns_topic_arn = "*"

}

```

</ModuleUsage>


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-elk/tree/master/modules/elastalert-iam-policies/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-elk/tree/master/modules/elastalert-iam-policies/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-elk/tree/master/modules/elastalert-iam-policies/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "5d62271bea1fb16eb6003bc341bef8df"
}
##DOCS-SOURCER-END -->

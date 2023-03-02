---
title: "Logstash IAM Policies"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="ELK AWS Module" version="0.11.1" />

# Logstash IAM Policies

<a href="https://github.com/gruntwork-io/terraform-aws-elk/tree/master/modules/logstash-iam-policies" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-elk/releases?q=" className="link-button" title="Release notes for only the service catalog versions which impacted this service.">Release Notes</a>

This folder contains a [Terraform](https://www.terraform.io/) module that defines the IAM Policies used by an
[Logstash](https://www.elastic.co/products/logstash) cluster. These policies are defined in a separate module
so that you can add them to any existing IAM Role. The IAM policies defined in this module are to give Logstash input plugins read-only access to CloudWatch and S3 to allow forwarding logs to Elasticsearch.

## Quick start

Let's say you want to deploy Logstash using the [logstash-cluster module](https://github.com/gruntwork-io/terraform-aws-elk/tree/master/modules/logstash-cluster):

```hcl
module "logstash" {
  # TODO: replace <VERSION> with the latest version from the releases page: https://github.com/gruntwork-io/terraform-aws-elk/releases
  source = "github.com/gruntwork-io/terraform-aws-elk//modules/logstash-cluster?ref=<VERSION>"

  # ... (other params omitted) ...
}
```

You can attach the IAM policies to this cluster as follows:

```hcl
module "logstash_iam_policies" {
  # TODO: replace <VERSION> with the latest version from the releases page: https://github.com/gruntwork-io/terraform-aws-elk/releases
  source = "github.com/gruntwork-io/terraform-aws-elk//modules/logstash-iam-policies?ref=<VERSION>"

  iam_role_id = module.logstash.iam_role_id
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

You can find the other parameters in [vars.tf](https://github.com/gruntwork-io/terraform-aws-elk/tree/master/modules/logstash-iam-policies/vars.tf).

Check out the [examples folder](https://github.com/gruntwork-io/terraform-aws-elk/tree/master/examples) for working sample code.

## Sample Usage

<ModuleUsage>

```hcl title="main.tf"

# ---------------------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S LOGSTASH-IAM-POLICIES MODULE
# ---------------------------------------------------------------------------------------------------------------------

module "logstash_iam_policies" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-elk.git//modules/logstash-iam-policies?ref=v0.11.1"

  # ---------------------------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ---------------------------------------------------------------------------------------------------------------------

  # The ID of the IAM Role to which these IAM policies should be attached
  iam_role_id = <INPUT REQUIRED>

  # ---------------------------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ---------------------------------------------------------------------------------------------------------------------

  # A list of Amazon S3 bucket ARNs to grant the Logstash instance access to
  bucket_arns = ["*"]

}

```

</ModuleUsage>


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-elk/tree/master/modules/logstash-iam-policies/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-elk/tree/master/modules/logstash-iam-policies/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-elk/tree/master/modules/logstash-iam-policies/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "e8ae734435ade97a0fba0fa524c5a022"
}
##DOCS-SOURCER-END -->

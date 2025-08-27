---
title: "K8S External DNS IAM Policy Module"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Amazon EKS" version="1.3.0" lastModifiedVersion="0.72.1"/>

# K8S External DNS IAM Policy Module

<a href="https://github.com/gruntwork-io/terraform-aws-eks/tree/v1.3.0/modules/eks-k8s-external-dns-iam-policy" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.72.1" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This Terraform Module defines an [IAM
policy](http://docs.aws.amazon.com/AmazonCloudWatch/latest/DeveloperGuide/QuickStartEC2Instance.html#d0e22325) that
defines the minimal set of permissions necessary for the [external-dns
application](https://github.com/kubernetes-incubator/external-dns). This policy can then be attached to EC2
instances or IAM roles so that the app deployed has enough permissions to manage Route 53 Hosted Zones.

See [the eks-k8s-external-dns module](https://github.com/gruntwork-io/terraform-aws-eks/tree/v1.3.0/modules/eks-k8s-external-dns) for a module that deploys the external-dns
application on to your EKS cluster.

## Attaching IAM policy to workers

To allow the external-dns app to manage Route 53 Hosted Zones, it needs IAM permissions to use the AWS API to manage the
zones. Currently, the way to grant Pods IAM privileges is to use the worker IAM profiles provisioned by [the
eks-cluster-workers module](https://github.com/gruntwork-io/terraform-aws-eks/tree/v1.3.0/modules/eks-cluster-workers/README.md#how-do-you-add-additional-iam-policies).

The Terraform templates in this module create an IAM policy that has the required permissions. You then need to use an
[aws_iam_policy_attachment](https://www.terraform.io/docs/providers/aws/r/iam_policy_attachment.html) to attach that
policy to the IAM roles of your EC2 Instances.

```hcl
module "eks_workers" {
  # (arguments omitted)
}

module "k8s_external_dns_iam_policy" {
  # (arguments omitted)
}

resource "aws_iam_role_policy_attachment" "attach_k8s_external_dns_iam_policy" {
    role = "${module.eks_workers.eks_worker_iam_role_name}"
    policy_arn = "${module.k8s_external_dns_iam_policy.k8s_external_dns_policy_arn}"
}
```

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S EKS-K8S-EXTERNAL-DNS-IAM-POLICY MODULE
# ------------------------------------------------------------------------------------------------------

module "eks_k_8_s_external_dns_iam_policy" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-eks.git//modules/eks-k8s-external-dns-iam-policy?ref=v1.3.0"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # A name that uniquely identified in which context this module is being
  # invoked. This also helps to avoid creating two resources with the same name
  # from different terraform applies.
  name_prefix = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The AWS partition used for default AWS Resources.
  aws_partition = "aws"

  # If you set this variable to false, this module will not create any
  # resources. This is used as a workaround because Terraform does not allow you
  # to use the 'count' parameter on modules. By using this parameter, you can
  # optionally create or not create the resources within this module.
  create_resources = true

  # Tags to apply to all AWS resources managed by this module.
  default_tags = {}

  # A map of custom tags to apply to the External DNS IAM Policies if enabled.
  # The key is the tag name and the value is the tag value.
  external_dns_iam_policy_tags = {}

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S EKS-K8S-EXTERNAL-DNS-IAM-POLICY MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-eks.git//modules/eks-k8s-external-dns-iam-policy?ref=v1.3.0"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # A name that uniquely identified in which context this module is being
  # invoked. This also helps to avoid creating two resources with the same name
  # from different terraform applies.
  name_prefix = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The AWS partition used for default AWS Resources.
  aws_partition = "aws"

  # If you set this variable to false, this module will not create any
  # resources. This is used as a workaround because Terraform does not allow you
  # to use the 'count' parameter on modules. By using this parameter, you can
  # optionally create or not create the resources within this module.
  create_resources = true

  # Tags to apply to all AWS resources managed by this module.
  default_tags = {}

  # A map of custom tags to apply to the External DNS IAM Policies if enabled.
  # The key is the tag name and the value is the tag value.
  external_dns_iam_policy_tags = {}

}


```

</TabItem>
</Tabs>




## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Required

<HclListItem name="name_prefix" requirement="required" type="string">
<HclListItemDescription>

A name that uniquely identified in which context this module is being invoked. This also helps to avoid creating two resources with the same name from different terraform applies.

</HclListItemDescription>
</HclListItem>

### Optional

<HclListItem name="aws_partition" requirement="optional" type="string">
<HclListItemDescription>

The AWS partition used for default AWS Resources.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;aws&quot;"/>
</HclListItem>

<HclListItem name="create_resources" requirement="optional" type="bool">
<HclListItemDescription>

If you set this variable to false, this module will not create any resources. This is used as a workaround because Terraform does not allow you to use the 'count' parameter on modules. By using this parameter, you can optionally create or not create the resources within this module.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="default_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

Tags to apply to all AWS resources managed by this module.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="external_dns_iam_policy_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

A map of custom tags to apply to the External DNS IAM Policies if enabled. The key is the tag name and the value is the tag value.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="k8s_external_dns_policy_arn">
<HclListItemDescription>

The ARN of the IAM policy created with the permissions for the external-dns Kubernetes app.

</HclListItemDescription>
</HclListItem>

<HclListItem name="k8s_external_dns_policy_id">
<HclListItemDescription>

The AWS ID of the IAM policy created with the permissions for the external-dns Kubernetes app.

</HclListItemDescription>
</HclListItem>

<HclListItem name="k8s_external_dns_policy_name">
<HclListItemDescription>

The name of the IAM policy created with the permissions for the external-dns Kubernetes app.

</HclListItemDescription>
</HclListItem>

</TabItem>
</Tabs>

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-eks/tree/v1.3.0/modules/eks-k8s-external-dns-iam-policy/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-eks/tree/v1.3.0/modules/eks-k8s-external-dns-iam-policy/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-eks/tree/v1.3.0/modules/eks-k8s-external-dns-iam-policy/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "5668e6a864f2d1904eaf54c2c9f22e22"
}
##DOCS-SOURCER-END -->

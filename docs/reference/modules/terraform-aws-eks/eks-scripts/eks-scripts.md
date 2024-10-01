---
title: "EKS Scripts Module"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Amazon EKS" version="0.70.1" lastModifiedVersion="0.55.2"/>

# EKS Scripts Module

<a href="https://github.com/gruntwork-io/terraform-aws-eks/tree/v0.70.1/modules/eks-scripts" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.55.2" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This folder contains helper scripts for running an EKS Cluster, including:

*   `map-ec2-tags-to-node-labels`: This script will pull the associated tags on the EC2 instance and convert it into a
    format that can be passed into the EKS node bootstrap script to set the node labels as the tags.

## Installing the helpers

You can install the helpers using the [Gruntwork Installer](https://github.com/gruntwork-io/gruntwork-installer):

```bash
gruntwork-install --module-name "eks-scripts" --repo "https://github.com/gruntwork-io/terraform-aws-eks" --tag "0.2.0"
```

For an example, see the [Packer](https://www.packer.io/) template under
[examples/eks-cluster-with-supporting-services/packer/build.json](https://github.com/gruntwork-io/terraform-aws-eks/tree/v0.70.1/examples/eks-cluster-with-supporting-services/packer/build.json).

## Using the map-ec2-tags-to-node-labels helper

The `map-ec2-tags-to-node-labels` script will take [EC2 instance
tags](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/Using_Tags.html) and format them for use as Kubernetes Node
Labels, which [play an integral role in having control over assigning which nodes Pods should be scheduled
on](https://kubernetes.io/docs/concepts/configuration/assign-pod-node/).

This script has the following prerequisites:

1.  It must be run on an EC2 instance.
2.  The EC2 instance must be running an [Amazon EKS-optimized AMI](https://aws.amazon.com/marketplace/pp/B00U6QTYI2/).
3.  The EC2 instance must have the AWS CLI installed.
4.  The EC2 instance must have Python 3 installed.

When you run the script, the script will output the node label argument to stdout. You can then pass this output to the
bootstrap script:

```bash
NODE_LABELS="$(map-ec2-tags-to-node-labels)"
/etc/eks/bootstrap.sh \
  --apiserver-endpoint "$EKS_ENDPOINT" \
  --b64-cluster-ca "$EKS_CERTIFICATE_AUTHORITY" \
  --kubelet-extra-args "--node-labels=\"$NODE_LABELS\"" \
  "$EKS_CLUSTER_NAME"
```

This script will read in the EC2 tags from the metadata API and convert it to a string of comma separated key=value
pairs, outputting the result to stdout.

Note: unlike EC2 tags, Kubernetes node labels have the following restrictions on BOTH keys and labels:

*   Must be 63 characters or less
*   Begin and end with an alphanumeric character (`[a-zA-Z0-9]`)
*   Only contain dashes (`-`), underscores (`_`), dots (`.`), and alphanumeric characters (`[a-zA-Z0-9]`)

As such, this script will convert the EC2 tags to fit the scheme above. Notably, this script will:

*   Take all unsupported characters and replace them with dashes (`-`). E.g if you have a EC2 tag with key `foo@bar`, this
    will be converted to `foo-bar`.
*   Truncate keys and values to 63 characters.
*   Namespace the labels with the prefix `ec2.amazonaws.com`. E.g if you have a EC2 tag with key `foo`, this will be
    registered under the key `ec2.amazonaws.com/foo` in Kubernetes.

Finally, this script will log all conversions to stderr so it can be traced and referenced.

## Prefix

You can restrict the tags that get converted by prefix using the `--tag-prefix` option. That is, if your EC2 instance
had the following tags:

```
Name: "my-asg-ec2-instance"
AutoScalingGroup: "my-asg"
ec2.gruntwork.io/group: "my-group"
```

and you specified `ec2.gruntwork.io/` as your tag prefix (`map-ec2-tags-to-node-labels --tag-prefix
'ec2.gruntwork.io/group'`), then only the tag `ec2.gruntwork.io/group: "my-group"` will get converted to a node label.

### IAM Role

In order for the script to be able to successfully retrieve the tags for EC2 instance, the instances need to be
associated with an IAM profile that grants it access to retrieve the EC2 tags on the instance. If you launch the workers
using the [eks-cluster-workers module](https://github.com/gruntwork-io/terraform-aws-eks/tree/v0.70.1/modules/eks-cluster-workers), this is automatically attached to the worker IAM role.

### map_ec2\_tags_to_node_labels.py symlink

Due to limitations in how python imports scripts, this module includes a symlink that maps
`map_ec2_tags_to_node_labels.py` to the `map-ec2-tags-to-node-labels` script so that it can be imported in the unit
tests.


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-eks/tree/v0.70.1/modules/eks-scripts/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-eks/tree/v0.70.1/modules/eks-scripts/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-eks/tree/v0.70.1/modules/eks-scripts/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "de830dc668ce5546c697225e35644974"
}
##DOCS-SOURCER-END -->

---
title: "SSH Grunt"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Security Modules" version="0.75.12" lastModifiedVersion="0.75.7"/>

# SSH Grunt

<a href="https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.12/modules/ssh-grunt" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.75.7" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This module can configure a Linux server to manage SSH access to the server via an Identity Provider (IdP). Via AWS [Identity and Access Management (IAM)](https://aws.amazon.com/iam/), developers in certain IAM Groups will be able to SSH to your servers using their IAM user name and the SSH key they uploaded to their IAM user account.

![ssh-grunt architecture](/img/reference/modules/terraform-aws-security/ssh-grunt/ssh-grunt-architecture.png)

## Features

*   Automatically sync user accounts from your identity provider (e.g., IAM, Google, ADFS) to your servers, so each developer can have their own user name (e.g. "susan", "jim") rather than everyone using a shared user (e.g. "ubuntu", "ec2-user").

*   Each developer uses their own SSH keys to connect to servers (instead of a single, shared Key Pair).

*   Quickly use IAM to rotate old keys and upload a new one

*   Revoke SSH access to servers from the centralized IdP

## Conflicts with ec2-instance-connect

AWS has a similar service in [EC2 Instance Connect](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/Connect-using-EC2-Instance-Connect.html). There are pros and cons to each service. For example, with `ssh-grunt`, there is no additional client-side tooling required beyond the native SSH that you have already. Connection is a one step process of SSHing to your target instance. With EC2 Instance Connect, in order to use native SSH, you must first [use the AWS CLI to push your key up to AWS](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-connect-methods.html).

EC2 Instance Connect is installed by default in recent AWS AMIs, including Ubuntu 20.04. It conflicts with `ssh-grunt` due to both services relying on SSH’s AuthorizedKeysCommand. In order to make `ssh-grunt` work properly, you’ll need to uninstall the `ec2-instance-connect` package.

On installation, `ssh-grunt` will detect if `ec2-instance-connect` is installed and halt.

## Learn

Note

This repo is a part of [the Gruntwork Infrastructure as Code Library](https://gruntwork.io/infrastructure-as-code-library/), a collection of reusable, battle-tested, production ready infrastructure code. If you’ve never used the Infrastructure as Code Library before, make sure to read [How to use the Gruntwork Infrastructure as Code Library](https://docs.gruntwork.io/library/overview/)!

### Core concepts

*   [How to install ssh-grunt on your servers](https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.12/modules/ssh-grunt/core-concepts.md#install-ssh-grunt-on-your-servers)

*   [How SSH Grunt works](https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.12/modules/ssh-grunt/core-concepts.md#how-it-works)

*   [Core Security Concepts](https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.12/README.adoc#core-concepts)

### Repo organization

*   [modules](https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.12/modules): the main implementation code for this repo, broken down into multiple standalone, orthogonal submodules.

*   [examples](https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.12/examples): This folder contains working examples of how to use the submodules.

*   [test](https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.12/test): Automated tests for the modules and examples.

## Deploy

### Compatibility

This module is known to work on **CentOS 7**, **Ubuntu**, **Amazon Linux 2**, and **Amazon Linux 2023**

**Amazon Linux 1 Compatibility**: [Amazon Linux 1 reached EOL on December 31, 2023](https://aws.amazon.com/blogs/aws/update-on-amazon-linux-ami-end-of-life/) and is therefore no longer supported in this module.

### Non-production deployment (quick start for learning)

If you just want to try this repo out for experimenting and learning, check out the following resources:

*   [ssh-grunt examples](https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.12/examples/ssh-grunt): The `examples/ssh-grunt` folder contains sample code optimized for learning, experimenting, and testing (but not production usage).

*   [Packer template](https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.12/examples/ssh-grunt/packer/ssh-grunt-iam.json)

### Production deployment

If you want to deploy this module in production, check out the following resources:

*   [IAM policy with permissions for ssh-grunt](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/main/modules/base/ec2-baseline): Production-ready sample code for IAM entites that can be used for managing SSH grunt access.

*   [IAM cross account roles in an app account](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/main/examples/for-production/infrastructure-live/dev/\_global/account-baseline): Production-ready sample code for cross account IAM roles, from the Reference Architecture.

*   [IAM cross account roles as defined in a service module](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/main/modules/landingzone/account-baseline-app/): Service module code for IAM roles that can be used for a production-ready app account, as in the production example above.

## Manage

### Day-to-day operations

*   [How to manage SSH keys](https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.12/modules/ssh-grunt/core-concepts.md#upload-public-ssh-keys)

*   [IAM permissions required for ssh-grunt to work](https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.12/modules/ssh-grunt/core-concepts.md#set-up-iam-permissions)

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.12/modules/ssh-grunt/readme.adoc",
    "https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.12/modules/ssh-grunt/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.12/modules/ssh-grunt/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "4f66a4bee4759e84191e5dcd941be947"
}
##DOCS-SOURCER-END -->

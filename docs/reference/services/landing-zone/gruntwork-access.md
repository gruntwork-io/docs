---
type: "service"
name: "Gruntwork Access"
description: "Grant the Gruntwork team access to one of your AWS accounts so we can deploy a Reference Architecture for you or help with troubleshooting!"
category: "remote-access"
cloud: "aws"
tags: ["reference-architecture","troubleshooting"]
license: "gruntwork"
built-with: "terraform"
title: "Gruntwork Access"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../src/components/VersionBadge.tsx';

<VersionBadge version="0.80.2" lastModifiedVersion="0.20.0"/>

# Gruntwork Access


<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/eak12913-patch-1/modules/landingzone/gruntwork-access" className="link-button">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases?q=landingzone%2Fgruntwork-access" className="link-button" title="Release notes for only the service catalog versions which impacted this service.">Release Notes</a>

## Overview

You can use this service to grant the Gruntwork team access to your AWS account to either:

*   Deploying a [Reference Architecture](https://gruntwork.io/reference-architecture/)
*   Helping your team with troubleshooting.

Under the hood, this service creates an [IAM Role](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles.html) in
your AWS account that the Gruntwork team can assume. This allows the Gruntwork team to securely access your AWS accounts
without having to create, share, or manage credentials.

## Features

*   Create an IAM role that grants Gruntwork access to your AWS accounts
*   Choose the Managed IAM Policy to grant
*   Require MFA for assuming the IAM role
*   Grant access to your own security account (required for Reference Architecture deployments)

## Learn

:::note

This repo is a part of the [Gruntwork Service Catalog](https://github.com/gruntwork-io/terraform-aws-service-catalog/),
a collection of reusable, battle-tested, production ready infrastructure code.
If you’ve never used the Service Catalog before, make sure to read
[How to use the Gruntwork Service Catalog](https://docs.gruntwork.io/reference/services/intro/overview)!

:::

### Core concepts

*   [What is the Gruntwork Reference Architecture?](https://gruntwork.io/reference-architecture/)

## Deploy

### Non-production deployment (quick start for learning)

If you just want to try this repo out for experimenting and learning, check out the following resources:

*   [examples/for-learning-and-testing folder](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/eak12913-patch-1/examples/for-learning-and-testing): The
    `examples/for-learning-and-testing` folder contains standalone sample code optimized for learning, experimenting, and
    testing (but not direct production usage).

### Production deployment

If you want to deploy this repo in production, check out the following resources:

*   [examples/for-production folder](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/eak12913-patch-1/examples/for-production): The `examples/for-production` folder contains sample code
    optimized for direct usage in production. This is code from the
    [Gruntwork Reference Architecture](https://gruntwork.io/reference-architecture/), and it shows you how we build an
    end-to-end, integrated tech stack on top of the Gruntwork Service Catalog, configure CI / CD for your apps and
    infrastructure.

## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

<a name="grant_security_account_access" className="snap-top"></a>

* [**`grant_security_account_access`**](#grant_security_account_access) &mdash; Set to true to grant your security account, with the account ID specified in [`security_account_id`](#security_account_id), access to the IAM role. This is required for deploying a Reference Architecture.

<a name="gruntwork_aws_account_id" className="snap-top"></a>

* [**`gruntwork_aws_account_id`**](#gruntwork_aws_account_id) &mdash; The ID of the AWS account that will be allowed to assume the IAM role.

<a name="iam_role_name" className="snap-top"></a>

* [**`iam_role_name`**](#iam_role_name) &mdash; The name to use for the IAM role

<a name="managed_policy_name" className="snap-top"></a>

* [**`managed_policy_name`**](#managed_policy_name) &mdash; The name of the AWS Managed Policy to attach to the IAM role. To deploy a Reference Architecture, the Gruntwork team needs AdministratorAccess, so this is the default.

<a name="require_mfa" className="snap-top"></a>

* [**`require_mfa`**](#require_mfa) &mdash; If set to true, require MFA to assume the IAM role from the Gruntwork account.

<a name="security_account_id" className="snap-top"></a>

* [**`security_account_id`**](#security_account_id) &mdash; The ID of your security account (where IAM users are defined). Required for deploying a Reference Architecture, as the Gruntwork team deploys an EC2 instance in the security account, and that instance assumes this IAM role to get access to all the other child accounts and bootstrap the deployment process.

<a name="tags" className="snap-top"></a>

* [**`tags`**](#tags) &mdash; Tags to apply to all resources created by this module

</TabItem>
<TabItem value="outputs" label="Outputs">

<a name="iam_role_arn" className="snap-top"></a>

* [**`iam_role_arn`**](#iam_role_arn) &mdash; The ARN of the IAM role

<a name="iam_role_name" className="snap-top"></a>

* [**`iam_role_name`**](#iam_role_name) &mdash; The name of the IAM role

</TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"service-catalog-api","hash":"cd883f066942d728a26d7947826b5842"}
##DOCS-SOURCER-END -->

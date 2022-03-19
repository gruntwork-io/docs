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
import HclListItem from '../../../../src/components/HclListItem.tsx';

<VersionBadge version="0.85.0" lastModifiedVersion="0.20.0"/>

# Gruntwork Access


<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/modules/landingzone/gruntwork-access" className="link-button">View Source</a>

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

*   [examples/for-learning-and-testing folder](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/examples/for-learning-and-testing): The
    `examples/for-learning-and-testing` folder contains standalone sample code optimized for learning, experimenting, and
    testing (but not direct production usage).

### Production deployment

If you want to deploy this repo in production, check out the following resources:

*   [examples/for-production folder](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/examples/for-production): The `examples/for-production` folder contains sample code
    optimized for direct usage in production. This is code from the
    [Gruntwork Reference Architecture](https://gruntwork.io/reference-architecture/), and it shows you how we build an
    end-to-end, integrated tech stack on top of the Gruntwork Service Catalog, configure CI / CD for your apps and
    infrastructure.

## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

<br/>

### Required

<HclListItem name="grant_security_account_access" requirement="required" description="Set to true to grant your security account, with the account ID specified in <a href=#security_account_id><code>security_account_id</code></a>, access to the IAM role. This is required for deploying a Reference Architecture." type="bool"/>

<HclListItem name="security_account_id" requirement="required" description="The ID of your security account (where IAM users are defined). Required for deploying a Reference Architecture, as the Gruntwork team deploys an EC2 instance in the security account, and that instance assumes this IAM role to get access to all the other child accounts and bootstrap the deployment process." type="string"/>


<br/>


### Optional

<HclListItem name="gruntwork_aws_account_id" requirement="optional" description="The ID of the AWS account that will be allowed to assume the IAM role." type="string" defaultValue="583800379690"/>

<HclListItem name="iam_role_name" requirement="optional" description="The name to use for the IAM role" type="string" defaultValue="GruntworkAccountAccessRole"/>

<HclListItem name="managed_policy_name" requirement="optional" description="The name of the AWS Managed Policy to attach to the IAM role. To deploy a Reference Architecture, the Gruntwork team needs AdministratorAccess, so this is the default." type="string" defaultValue="AdministratorAccess"/>

<HclListItem name="require_mfa" requirement="optional" description="If set to true, require MFA to assume the IAM role from the Gruntwork account." type="bool" defaultValue="true"/>

<HclListItem name="tags" requirement="optional" description="Tags to apply to all resources created by this module" type="map" typeDetails="map(string)" defaultValue="{}"/>

</TabItem>
<TabItem value="outputs" label="Outputs">

<br/>

<HclListItem name="iam_role_arn" requirement="required" description="The ARN of the IAM role"/>

<HclListItem name="iam_role_name" requirement="required" description="The name of the IAM role"/>

</TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"service-catalog-api","hash":"f7069a1a130a85bd43fe82a3db7e5f39"}
##DOCS-SOURCER-END -->

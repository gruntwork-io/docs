---
title: Gruntwork Access
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from "../../../../src/components/VersionBadge.tsx"

<VersionBadge version="0.74.0"/>

# Gruntwork Access

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/modules/landingzone/gruntwork-access" className="link-button">View Source</a>
<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases?q=landingzone/gruntwork-access" className="link-button" title="Release notes for only the service catalog versions which impacted this service.">Filtered Release Notes</a>

Grant the Gruntwork team access to one of your AWS accounts so we can deploy a Reference Architecture for you or help with troubleshooting!

### Reference

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
{"sourcePlugin":"service-catalog-api","hash":"f1592659a2e00848cd0bba1c4e67a1a4"}
##DOCS-SOURCER-END -->

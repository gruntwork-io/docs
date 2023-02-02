# Identity and Access Management

The first section of the Benchmark centers on Identity and Access Management, including the following:

- Avoiding usage of the "root" account
- Requiring MFA for IAM users and the root account
- Setting a specific password policy
- Disabling administrative permissions
- Limiting the use of API access keys
- Using IAM roles
- Removing expired SSL/TLS certificates
- Enabling IAM Access Analyzer
- Using AWS Organizations or identity federation to manage multi-account environments

In the subsequent sections, we’ll review the recommendations and discuss how to implement them using Terraform resources and data sources.

## Configure authentication

One of main areas of concern in the IAM section relates to authentication. The Benchmark has recommendations for IAM
users and the root user account, password policy, and multi-factor authentication. There is more than one way to
authenticate to AWS, and the method you choose determines how to implement these recommendations in your code.

#### Federated authentication using SAML

Perhaps the most robust and secure method for authenticating to AWS is to use
[federated SAML authentication](https://aws.amazon.com/identity/saml/) with an identity provider (IdP) like Okta,
Google, or Active Directory. In this configuration, users authenticate to the IdP and assume IAM roles to obtain
permissions in AWS. All user management is handled in the IdP, where you can assign roles to users according to their
needs. If you use this approach, recommendation 1.21 from the Benchmark is the one relevant to you. However, several of
other recommendations including 1.10, 1.15, and 1.11, are not applicable (assuming you have no IAM users at all).

Configuring SAML is a multi-step process that is outside the scope of this guide. Familiarize yourself with the
process by reviewing the [AWS
documentation on the matter](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_providers_create_saml.html). You can use the
[`aws_iam_saml_provider`](https://www.terraform.io/docs/providers/aws/r/iam_saml_provider.html) and
[`aws_iam_policy_document`](https://www.terraform.io/docs/providers/aws/d/iam_policy_document.html) Terraform
resources to manage your SAML provider via code.

#### IAM user authentication

Another option is to authenticate using IAM users. The accounts are created and managed directly in AWS as opposed to a
third-party provider. IAM users log in to AWS with a password and an optional MFA device. IAM users are easier to get
started with than SAML, and they’re also free to use. However, to avoid unauthorized access, it’s crucial to configure
the IAM user settings securely. IAM users may be more suitable for smaller environments with only a few users.

A few tips on creating IAM users with Terraform:

- To create IAM users, use the [`aws_iam_user`](https://www.terraform.io/docs/providers/aws/r/iam_user.html) and
  [`aws_iam_user_login_profile`](https://www.terraform.io/docs/providers/aws/r/iam_user_login_profile.html) resources.

- As instructed by recommendation 1.11, do not create API access keys for new users automatically. The intent is that
  users should create them on their own if and when needed.

- To stay compliant with recommendation 1.15, be sure to never attach IAM policies directly to IAM users. Instead, create IAM groups, attach policies to those groups, and add the user to groups using the [`aws_iam_user_group_membership`](https://www.terraform.io/docs/providers/aws/r/iam_user_group_membership.html). This helps to avoid scenarios where auditing the exact permissions of IAM users becomes difficult and unmaintainable.

Consider the following example which creates a user with access to AWS Support:

```hcl
resource "aws_iam_user" "support_user" {
  name = "support"
}

resource "aws_iam_group" "example_group" {
  name = "support-group"
}

resource "aws_iam_group_policy_attachment" "support_group_attach" {
  group      = aws_iam_group.example_group.name
  policy_arn = "arn:aws:iam::aws:policy/AWSSupportAccess"
}

resource "aws_iam_user_group_membership" "example" {
  user = aws_iam_user.example_user.name
  groups = [aws_iam_group.example_group.name]
}
```

This code creates an IAM user called `support`, adds them to a new group called `support-group`, and attaches the
`AWSSupportAccess` managed policy to the group. It demonstrates how to meet a few of the Benchmark recommendations:

1. The user is created without an API access key (recommendation 1.11). Access keys should only be created by the user later.

2. The policy is attached to an IAM group, not directly to the IAM user (recommendation 1.15).

3. Recommendation 1.17 specifically requires that the Support policy be used. You should attach it to a group, as
   shown here.

## Do not use full administrator privileges

Recommendation 1.16 states that no IAM policies with full administrator privileges be assigned. However, some
administrator access is needed to maintain the account on an ongoing basis, and use of the root account is also
prohibited. What to do?

One approach is to create an IAM policy with full permissions to IAM and nothing else. Attach the policy to a group,
and give access only to trusted users. This allows _effective_ administrator access without an _explicit_
administrator policy. For example, you could use the following Terraform code to create such a policy:

```hcl
data "aws_iam_policy_document" "iam_admin" {
  statement {
    sid = "iamAdmin"
    actions = [
      "iam:*",
    ]
    resources = ["*"]
    effect = "Allow"
  }
}
```

You can then attach that policy to a group:

```hcl
resource "aws_iam_policy" "iam_admin" {
  name   = "iam_admin"
  path   = "/"
  policy = data.aws_iam_policy_document.iam_admin.json
}

resource "aws_iam_group" "iam_admin" {
  name = "iam-admins"
}

resource "aws_iam_group_policy_attachment" "iam_admin_group_attach" {
  group      = aws_iam_group.iam_admin.name
  policy_arn = aws_iam_policy.iam_admin.arn
}
```

In this example, any IAM user that is a member of the `iam-admins` group will have has permissions to access all
functionality in the IAM service, make them an effective administrator of the account.

## Enabling multi-factor authentication for IAM users

Recommendation 1.10, which requires all IAM users to have MFA enabled, seems straightforward on the surface, but in AWS,
there’s no way to explicitly require MFA for log in. Instead, you can make sure that all groups and roles have a
conditional IAM policy attached that explicitly denies all actions unless MFA is enabled. This way, whenever a user logs
in without MFA, all services will show a permission denied error if the user didn’t use MFA.

The
[AWS
documentation has an example of this policy](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_examples_aws_my-sec-creds-self-manage-mfa-only.html). Create the policy with Terraform, and attach it to every group
you create - including the `iam-admins` and `support` groups we created above. Here’s an example:

```hcl
data "aws_iam_policy_document" "require_mfa_policy" {
  statement {
    sid = "AllowViewAccountInfo"
    effect = "Allow"
    actions = ["iam:ListVirtualMFADevices"]
    resources = ["*"]
  }

  statement {
    sid = "AllowManageOwnVirtualMFADevice"
    effect = "Allow"
    actions = [
      "iam:CreateVirtualMFADevice",
      "iam:DeleteVirtualMFADevice"
    ]
    resources = [
      "arn:aws:iam::${var.aws_account_id}:mfa/$${aws:username}",
    ]
  }

  statement {
    sid = "AllowManageOwnUserMFA"
    effect = "Allow"
    actions = [
      "iam:DeactivateMFADevice",
      "iam:EnableMFADevice",
      "iam:GetUser",
      "iam:ListMFADevices",
      "iam:ResyncMFADevice"
    ]
    resources = [
      "arn:aws:iam::${var.aws_account_id}:user/$${aws:username}",
      "arn:aws:iam::${var.aws_account_id}:mfa/$${aws:username}"
    ]
  }

  statement {
    sid = "DenyAllExceptListedIfNoMFA"
    effect = "Deny"
    not_actions = [
      "iam:CreateVirtualMFADevice",
      "iam:EnableMFADevice",
      "iam:GetUser",
      "iam:ListMFADevices",
      "iam:ListVirtualMFADevices",
      "iam:ResyncMFADevice",
      "sts:GetSessionToken"
    ]
    resources = ["*"]
    condition {
      test     = "Bool"
      variable = "aws:MultiFactorAuthPresent"
      values   = ["false"]
    }
  }
}

resource "aws_iam_group" "support" {
  name  = "support"
}


resource "aws_iam_group_policy" "require_mfa_for_support" {
  name   = "RequireMFA"
  group  = aws_iam_group.support.name
  policy = data.aws_iam_policy_document.require_mfa_policy
}
```

We’ve created an IAM policy that denies all access accept the necessary permissions to set up an MFA device, then we
attached the policy to the `support` group. If a user that is a member of the `support` group logs in without MFA, they
won’t have access to any services, even if the `support` group or the user had other policies attached. They will have
enough permissions to set up an MFA device, and after doing so, they can log in and will have any permissions granted to
them by other IAM policies.

Attach a policy like this one to every group in your account.

## Password policy

The IAM password policy is perhaps the most straightforward and explicit set of recommendations (1.8-1.9 and 1.12) in the entire
Benchmark. You can invoke [the
Terraform `aws_iam_account_password_policy` resource](https://www.terraform.io/docs/providers/aws/r/iam_account_password_policy.html) to implement the recommended policy.

For example:

```hcl
resource "aws_iam_account_password_policy" "aws_foundations_benchmark_policy" {
  minimum_password_length        = 14
  allow_users_to_change_password = true
  hard_expiry                    = true
  max_password_age               = 90
  password_reuse_prevention      = 24
}
```

## Cleanup Expired SSL/TLS certificates

The CIS AWS v1.3 recommendations require that all expired SSL/TLS certificates stored in AWS IAM are automatically removed
(see 1.19). Unfortunately removing expired certificates via AWS Management Console is not currently supported so we must remove
then using the AWS API. To view the current certificates stored in IAM, use the AWS CLI and execute the `list-server-certificates`
command:

```bash
aws iam list-server-certificates
```

The command output should return an array that contains all of the SSL/TLS certificates currently stored in IAM and their metadata:

```json
{
  "ServerCertificateMetadataList": [
    {
      "ServerCertificateId": "EHDGFRW7EJFYTE88D",
      "ServerCertificateName": "MyServerCertificate",
      "Expiration": "2021-07-05T23:59:59Z",
      "Path": "/",
      "Arn": "arn:aws:iam::012345678910:server-certificate/MySSLCertificate",
      "UploadDate": "2018-06-10T11:56:08Z"
    }
  ]
}
```

The `Expiration` attribute contains the expiration date for each SSL/TLS certificate which you can use to determine
if it should be removed. To remove the certificate use the `delete-server-certificate` command, making sure to
substitute `<CERTIFICATE_NAME>` with the `ServerCertificateId` attribute from the previous command:

```bash
aws iam delete-server-certificate --server-certificate-name <CERTIFICATE_NAME>
```

To automate this process you might decide to implement a Lambda function that runs on a regular schedule and removes all
expired SSL/TLS certificates. Check out the [Apply the baseline to the root
account](../deployment-walkthrough/deploy-landing-zone-solution/apply-account-baseline-root-to-root-account.md#apply-the-account-baseline-root-baseline-to-the-root-account),
[Apply the to the logs
account](../deployment-walkthrough/deploy-landing-zone-solution/apply-account-baseline-app-to-logs-account.md) and
[Apply the to the security
account](../deployment-walkthrough/deploy-landing-zone-solution/apply-account-baseline-security-to-security-account.md)
section of the deployment walkthrough to see how this module is used from the Landing Zone account baselines and is
deployed in each of your AWS accounts.

## IAM Access Analyzer

In both versions 1.3.0 and 1.4.0, the CIS recommendations stipulate that the AWS IAM Access Analyzer service is enabled across all active regions in a given
AWS Account or Organization.

To achieve this compliance requirement, enable the IAM Access Analyzer service for every AWS region you have enabled in
every one of your AWS accounts. Alternatively, you could make use of the
[`iam-access-analyzer-multi-region`](https://github.com/gruntwork-io/terraform-aws-security/tree/master/modules/iam-access-analyzer-multi-region)
module available in the Gruntwork Service Catalog, or if you’re following this guide, refer to [Apply the baseline to
the root
account](../deployment-walkthrough/deploy-landing-zone-solution/apply-account-baseline-root-to-root-account.md#apply-the-account-baseline-root-baseline-to-the-root-account),
[Apply the to the logs
account](../deployment-walkthrough/deploy-landing-zone-solution/apply-account-baseline-app-to-logs-account.md) and
[Apply the to the security
account](../deployment-walkthrough/deploy-landing-zone-solution/apply-account-baseline-security-to-security-account.md)
sections of the deployment walkthrough to see how this module is used from the Landing Zone account baselines and is
deployed in each of your AWS accounts.

Once enabled, it will scan only within the boundaries of the AWS Account or Organization it has access to. Only specific
resources are analyzed and included in the results - e.g. S3 buckets, SQS, etc. (For the full list of resources supported,
please visit [the relevant AWS docs](https://docs.aws.amazon.com/IAM/latest/UserGuide/access-analyzer-resources.html)).
This lets you identify unintended access to these resources and data by external entities.

The findings from the IAM Access Analyzer can be found in the AWS web console, and can be archived or resolved.
Please visit the [AWS guidance on how to do so](https://docs.aws.amazon.com/IAM/latest/UserGuide/access-analyzer-findings.html).

## Manual steps

A few of the recommendations in the IAM section are not achievable via API and require a one-time manual configuration.
Perform the steps in this section manually.

#### Enable MFA for the root account

Securing the "root" user, or the first user that is created when you set up an AWS account, is one of the
first actions you should take in any new account. It is highly recommended that the user of this account be avoided for everyday tasks. Unfortunately, there is no API or automation available for configuring an MFA device for the
root user. Follow the manual steps outlined in the
[AWS docs](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_root-user.html#id_root-user_manage_mfa). Configuring a virtual MFA device will achieve recommendation 1.5. You can also refer to the [production-grade AWS account structure guide.](https://gruntwork.io/guides/foundations/how-to-configure-production-grade-aws-account-structure/)

Configure an MFA device, as suggested by recommendation 1.6. We suggest using a
[Yubikey](https://www.yubico.com/) due to its reputation for strong security characteristics and multitude of form
factors. Refer to
[the documentation for more information on using a hardware device with the root user](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_mfa_enable_physical.html#enable-hw-mfa-for-root).

#### Answer security questions and complete contact details

When setting up a new account, AWS asks for contact information and security questions. Unfortunately, there
is no API or automation available for this functionality. In the AWS console, visit the [Account settings](https://console.aws.amazon.com/billing/home?#/account) page and complete the _Alternate Contacts_ and _Configure Security Challenge Questions_ questions.

For further detail, follow the manual steps outlined in the CIS Benchmark document.

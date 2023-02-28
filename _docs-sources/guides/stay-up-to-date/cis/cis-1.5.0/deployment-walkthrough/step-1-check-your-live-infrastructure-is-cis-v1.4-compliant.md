---
sidebar_label: Check your live infrastructure is CIS AWS v1.4 compliant
---

# Step 1: Check your live infrastructure is CIS AWS v1.4 compliant

The later steps in this guide assume that you are upgrading from CIS AWS Foundations Benchmark v1.4 to v1.5.

Before you update to CIS AWS Foundations Benchmark v1.5, we strongly recommend that you confirm that your live
infrastructure is compliant with the CIS AWS Foundations Benchmark v1.4.

If you do not have existing tooling in place to confirm this, then we suggest that you run the
[Steampipe CIS v1.4.0](https://hub.steampipe.io/mods/turbot/aws_compliance/controls/benchmark.cis_v140) check against
your infrastructure.

In the final step in this guide, we suggest you run Steampipe to verify that your infrastructure is CIS AWS Foundations
Benchmark v1.5 compliant.

## 1.1 Download and install Steampipe

Homebrew is the recommended way to install Steampipe for Mac. Instructions for different OS versions can be found at
https://steampipe.io/downloads.

```
brew tap turbot/tap
brew install steampipe
```

Next install the AWS plugin with Steampipe:

```
steampipe plugin install aws
```

## 1.2 Configure Steampipe with AWS credentials

The [Steampipe AWS plugin](https://hub.steampipe.io/plugins/turbot/aws) supports a range of options for granting
Steampipe access to your AWS accounts.

In order for the compliance checks to work correctly, you need to:
- Configure [multi-region connections](https://hub.steampipe.io/plugins/turbot/aws#multi-region-connections) so that Steampipe can access to all the regions you are using
- Configure [multi-account connections](https://hub.steampipe.io/plugins/turbot/aws#multi-account-connections) so that Steampipe can access all the accounts you are using

## 1.3 Clone the Steampipe AWS Compliance Mod

The [AWS Compliance Mod](https://hub.steampipe.io/mods/turbot/aws_compliance#aws-compliance-mod) includes compliance
checks for CIS AWS Foundations Benchmark v1.4 and v1.5.

Clone:

```
git clone https://github.com/turbot/steampipe-mod-aws-compliance.git
cd steampipe-mod-aws-compliance
```

## 1.4 Run the CIS v1.4.0 compliance check

Before running, an IAM credential report needs to be generated:

```
aws iam generate-credential-report
```

Run the check:

```
steampipe check aws_compliance.benchmark.cis_v140
```

Example:

```
aws-vault exec dev -- aws iam generate-credential-report
aws-vault exec dev -- steampipe check aws_compliance.benchmark.cis_v140
```

## Next steps

If you've confirmed that your live infrastructure is compliant with the CIS AWS Foundations Benchmark v1.4 then you're
ready to move to [step 2](step-2-update-references-to-the-gruntwork-infrastructure-as-code-library.md) and update your
references to the Gruntwork Infrastructure as Code Library. Otherwise, if some checks are failing you should check the [Manual steps](/guides/build-it-yourself/achieve-compliance/deployment-walkthrough/manual-steps) section, that contains extra steps to achieve CIS compliance.

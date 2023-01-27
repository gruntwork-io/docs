---
pagination_label: Reference Architecture
---

# Manual steps

Using a CIS Reference Architecture? [There are extra steps to complete in order to meet the CIS AWS Benchmark recommendations](/guides/build-it-yourself/achieve-compliance/deployment-walkthrough/manual_steps).
## Revoke Gruntwork's access

Now that your infrastructure is deployed, Gruntwork doesn't need access to it anymore. Use the `gruntwork` CLI to revoke the access, [following these steps](https://github.com/gruntwork-io/gruntwork#revoking-access-to-aws):

```bash
gruntwork aws revoke \
            --account "dev" \
            --account "stage" \
            --account "prod" \
            --account "security" \
            --account "shared" \
            --account "logs"
```

To revoke Gruntwork's access from the "current" account—the one you are authenticated to in the terminal—use the name
`__current__` (i.e., `--account "__current__"`).


**Important**: Never use the `AdministratorAccess` AWS managed policy with any users, groups, or roles. It gives full access to all resources. Instead, use a policy that allows full IAM privileges (e.g. `iam:*`) on all resources. Our Landing Zone solution created a `iam-admin` group in the Security account.

## AA
The following steps should be performed on each deployed account.

### 1. Enable MFA for the root user

Securing the "root" user, or the first user that is created when you set up an AWS account, is one of the
first actions you should take in any new account. It is highly recommended that the user of this account be avoided for everyday tasks. Unfortunately, there is no API or automation available for configuring an MFA device for the
root user. Follow the manual steps outlined in the
[AWS docs](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_root-user.html#id_root-user_manage_mfa). Configuring a virtual MFA device will achieve recommendation 1.5. You can also refer to the [production-grade AWS account structure guide.](https://gruntwork.io/guides/foundations/how-to-configure-production-grade-aws-account-structure/)

Configure a hardware MFA device, as suggested by recommendation 1.6. We suggest using a
[Yubikey](https://www.yubico.com/) due to its reputation for strong security characteristics and multitude of form
factors. Refer to
[the documentation for more information on using a hardware device with the root user](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_mfa_enable_physical.html#enable-hw-mfa-for-root).

### 2. Delete default VPCs and rules from default security groups

Use [cloud-nuke](https://github.com/gruntwork-io/cloud-nuke) to remove the rules from the default VPC and the default ingress/egress rules from the default security groups. Note that it isn’t possible to actually delete the default security group, so instead the command deletes the rules, eliminating the risk of something being mistakenly exposed.

For each account (shared, security, dev, prod etc), run the following command:

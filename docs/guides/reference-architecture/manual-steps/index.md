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


## Delete default VPCs and rules from default security groups

Use [cloud-nuke](https://github.com/gruntwork-io/cloud-nuke) to remove the rules from the default VPC and the default ingress/egress rules from the default security groups. Note that it isn’t possible to actually delete the default security group, so instead the command deletes the rules, eliminating the risk of something being mistakenly exposed.

For each account (shared, security, dev, prod etc), run the following command:

```
cloud-nuke defaults-aws
```

## Answer security questions and complete contact details

When setting up a new account, AWS asks for contact information and security questions. Unfortunately, there is no API or automation available for this functionality. In the AWS console, visit the [Account settings](https://console.aws.amazon.com/billing/home?#/account) page and complete the _Alternate Contacts_ and _Configure Security Challenge Questions_ questions.


<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "9ba8a84532cad7f8e0b70c5cc5e7bb63"
}
##DOCS-SOURCER-END -->

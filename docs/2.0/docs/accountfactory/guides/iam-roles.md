# Adding IAM Permissions To Delegated Repositories

import CustomizableValue from '/src/components/CustomizableValue';

:::note
Delegated Repositories are only available to DevOps Foundations Enterprise customers.
:::

## Introduction

When delegated repositories are vended from Account Factory they will be granted a minimal set of permissions in AWS to manage infrastructure. These permissions are controlled by IAM policies, tracked as IaC in your `infrastructure-live-access-control` repository. As part of the account provisioning process a pull request will be opened in the access control repository to add these policies.

## Adding Permissions

You can add permissions to a role when the repository is created by modifying the Access Control Pull Request before it is merged, or by updating the policies in later updates.

### Customizing a Specific Repository

Each repository will have two sets of policies in your `infrastructure-live-access-control`, one used for `terragrunt plan` that should be read only, and another for `terragrunt apply`.

To locate these policies, navigate to your `infrastructure-live-access-control` repository. The two terragrunt units for a given repository will be located in the following locations:

- Plan role: <CustomizableValue id="DELEGATED_REPOSITORY_NAME" />`/_global/delegated-pipelines-plan-role/terragrunt.hcl`

- Apply role: <CustomizableValue id="DELEGATED_REPOSITORY_NAME" />`/_global/delegated-pipelines-apply-role/terragrunt.hcl`

At the end of each terragrunt file you will find the following block

```hcl
iam_policy = {
}
```

You can add additional policies granting permissions to this repository here. For example, to add read only ec2 permissions to the `plan` role you would add the following:

```hcl
iam_policy = {
    "EC2ServiceReadOnlyAccess" = {
      effect = "Allow"
      actions = [
        "ec2:Describe*",
        "ec2:Get*",
      ]
      resources = ["*"]
    }
}
```

And to grant write permissions to the `apply` role:

```hcl
iam_policy = {
    "EC2DeployAccess" = {
      effect    = "Allow"
      actions   = ["ec2:*"]
      resources = ["*"]
    }
}
```

See the full description of the `iam_policy` input [in the library reference](/reference/modules/terraform-aws-security/github-actions-iam-role/#iam_policy).

### Customizing All Delegated Repositories

To add IAM roles to all delegated repositories you can modify the base roles in `_envcommon/landingzone/delegated-pipelines-plan-role.hcl` and `_envcommon/landingzone/delegated-pipelines-apply-role.hcl`.

These HCL files also contain a `iam_policy` block which is already populated with the necesary policies for terragrunt to store state and perform barebones plans and applies.

You can expand this block by adding new policy descriptions, and they will be granted to all delegated repositories.

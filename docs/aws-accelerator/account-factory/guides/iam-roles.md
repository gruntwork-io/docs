# Adding IAM Permissions To Delegated Repositories

import CustomizableValue from '/src/components/CustomizableValue';

:::note
Delegated Repositories are only available to DevOps Foundations Enterprise customers.
:::

## Introduction

When delegated repositories are created using Account Factory, they are granted a minimal set of AWS permissions for managing infrastructure. These permissions are controlled through IAM policies, which are tracked as Infrastructure as Code (IaC) in your `infrastructure-live-access-control` repository. As part of account provisioning, a pull request is automatically created in the access control repository to add the necessary IAM policies.

## Adding permissions

To grant additional permissions, modify the Access Control pull request during repository creation or update the policies in future changes.

### Customizing a specific repository
 
Each repository includes two sets of IAM policies in your `infrastructure-live-access-control` repository: one for `terragrunt plan` (read-only) and another for `terragrunt apply`.

To locate these policies, go to your `infrastructure-live-access-control` repository. The two Terragrunt units for a specific repository are located at the following paths:

- Plan role: <CustomizableValue id="DELEGATED_REPOSITORY_NAME" />`/_global/delegated-pipelines-plan-role/terragrunt.hcl`

- Apply role: <CustomizableValue id="DELEGATED_REPOSITORY_NAME" />`/_global/delegated-pipelines-apply-role/terragrunt.hcl`

At the end of each Terragrunt file, you will find the following block:

```hcl
iam_policy = {
}
```

You can add additional policies to grant permissions to the repository in this section. For example, to provide read-only EC2 permissions to the `plan` role, add the following:

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

See the full description of the `iam_policy` input [in the library reference](https://library.gruntwork.io/modules/terraform-aws-security/github-actions-iam-role/#iam_policy).

### Customizing all delegated repositories
 
To add IAM roles to all delegated repositories, modify the base roles located in `_envcommon/landingzone/delegated-pipelines-plan-role.hcl` and `_envcommon/landingzone/delegated-pipelines-apply-role.hcl`.

These HCL files include an `iam_policy` block, which is pre-populated with the necessary policies for Terragrunt to store state and perform basic plans and applies.

You can extend this block by adding new policy descriptions, which will then apply to all delegated repositories.

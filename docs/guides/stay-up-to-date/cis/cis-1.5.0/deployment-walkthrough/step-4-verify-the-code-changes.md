---
sidebar_label: Verify the code changes
---

# Step 4: Verify the code changes

:::caution

We strongly recommend that you verify the changes by following this step before executing `terraform/terragrunt apply`

:::

Upgrading to CIS AWS Foundations Benchmark v1.5.0 includes migrating to our new CIS RDS module, this breaking change
will result in data loss if not updated correctly.

We strongly recommend that you run `terraform plan` or `terragrunt plan` and verify that any RDS resources you have will not be destroyed with new resources created.

## The RDS migrations were correctly executed

If the migrations have been correctly executed then running `terraform plan`  or `terragrunt plan` will output a
message similar to this one:

    Plan: 0 to add, 6 to change, 0 to destroy.

This indicates that the existing resources will be "updated in-place" when Terraform/Terragrunt `apply` is executed.

The output of the diff will contain messages similar to these:

    Terraform will perform the following actions:

    # module.rds.module.rds_alarms.aws_cloudwatch_metric_alarm.rds_disk_space_available[0] will be updated in-place
    ~ resource "aws_cloudwatch_metric_alarm" "rds_disk_space_available" \{
        ...
        \}

    # module.rds.module.rds_alarms.aws_cloudwatch_metric_alarm.rds_high_cpu_utilization[0] will be updated in-place
    ~ resource "aws_cloudwatch_metric_alarm" "rds_high_cpu_utilization" \{
        ...
        \}

    ...

    Plan: 0 to add, 6 to change, 0 to destroy.


## The RDS migrations were not correctly executed

If the migrations have not been correctly executed then running `terraform plan` or `terragrunt plan` will output a
message similar to this one:

    Plan: 11 to add, 0 to change, 11 to destroy.

This indicates that executing Terraform or Terragrunt `apply` will destroy the existing resources and create new ones instead.

The output `plan` will contain messages similar to these:

    Terraform will perform the following actions:

    # module.database.aws_db_instance.primary[0] will be destroyed
    # (because aws_db_instance.primary is not in configuration)
    - resource "aws_db_instance" "primary" \{
        ...
        \}

    # module.database.aws_db_subnet_group.db[0] will be destroyed
    # (because aws_db_subnet_group.db is not in configuration)
    - resource "aws_db_subnet_group" "db" \{
        ...
        \}

    ...

    # module.rds.module.database.aws_db_instance.primary[0] will be created
    + resource "aws_db_instance" "primary" \{
        ...
        \}

    # module.rds.module.database.aws_db_subnet_group.db[0] will be created
    + resource "aws_db_subnet_group" "db" \{
        ...
        \}

    ...

    Plan: 11 to add, 0 to change, 11 to destroy.

### If you are using Patcher

If you used Patcher to do the upgrade then start by checking that you completed [step 2A.3](step-2-update-references-to-the-gruntwork-infrastructure-as-code-library).

### If you are updating the modules manually

If you updated the modules manually then check that you completed all the steps in the migration guide for [v0.41.2](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/blob/master/modules/data-stores/rds/CHANGELOG.md#v0412---2022-10-28).

## Next step

Before proceeding we recommend that you satisfy yourself that:
- You have verified that any RDS resources you have will be correctly migrated
- You understand the changes that will be made

You can now safely commit the changes to your git repo and apply the changes. If you use Gruntwork Pipelines, [we
recommend you using the `DeployOrder` feature](https://github.com/gruntwork-io/knowledge-base/discussions/112) to handle
multiple account updates.

When applying the changes manually, you can run `terragrunt run-all apply` inside each environment folder (dev, logs,
security, shared etc), and waiting them to successful update before applying the changes before the next one, e.g. wait
for `dev` to successfully finish before applying `prod`.

Example of using Terragrunt, after running Patcher in the `dev` folder:
```
aws-vault exec dev -- terragrunt run-all init
aws-vault exec dev -- terragrunt run-all apply
```

After the changes have been applied we recommend you complete [step 5](step-5-check-your-live-infrastructure-is-cis-v1.5-compliant)
and confirm that your infrastructure is now CIS AWS Foundations Benchmark v1.5.0 compliant.


<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "e3b698dabedbe106b7af11907dcd0951"
}
##DOCS-SOURCER-END -->

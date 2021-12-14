# Deployment approach

Before we dive into the code and deployment for each resource, let’s take a step back and understand how the code is structured.
Most of the features explained in the [Production-grade design](../2-production-grade-design/0-intro.md) section will be deployed using the Landing Zone solution, and some more standalone modules like the VPC module.

The Landing Zone will be deployed in three steps - the `account-baseline-root` to set up your organization-wide configurations, create the necessary child AWS accounts, set up the CloudTrail and AWS Config buckets. Next, we’ll need to apply the `account-baseline-app` against the created logs account, adding more settings that will be used for aggregation of logs and metrics from the whole organization. Then the `account-baseline-security` will be applied, and that’s responsible to set up your IAM roles and groups that would allow you to access the rest of the accounts within your organization. And finally, the `account-baseline-app` will be applied to an AWS account with the purpose of hosting an application.

The standalone modules will follow the pattern of referencing the module and providing the necessary input variables for it, then applying with `terragrunt`.


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Local File Copier","hash":"55c4e62971e55e3ee35d13e221352839"}
##DOCS-SOURCER-END -->

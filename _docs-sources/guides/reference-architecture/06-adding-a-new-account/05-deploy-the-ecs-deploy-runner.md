# Deploy the ECS Deploy Runner

Once the security baseline is deployed on the new account, you can deploy the ECS Deploy Runner. With the ECS Deploy
Runner, you will be able to provision new resources in the account using the CI/CD pipeline that you configured in
[Configure Gruntwork Pipelines](../04-configure-gw-pipelines/01-intro.md).

To deploy the ECS Deploy Runner, copy the terragrunt configurations for `mgmt/vpc-mgmt` and `mgmt/ecs-deploy-runner`
from the `dev` account:

```bash
mkdir -p <REPLACE_WITH_NAME_OF_ACCOUNT>/us-west-2/mgmt
cp -r dev/us-west-2/mgmt/{vpc-mgmt,ecs-deploy-runner} <REPLACE_WITH_NAME_OF_ACCOUNT>/us-west-2/mgmt
```

Be sure to open the `terragrunt.hcl` file in the copied folders and sanity check the configuration. Make sure there are
no hard coded parameters that are specific to the dev account. If you have not touched the configuration since the
Reference Architecture was deployed, you won't need to change anything.

Once the configuration looks correct, go in to the `mgmt` folder and use `terragrunt run-all apply` to deploy the ECS
Deploy Runner:

```bash
(cd <REPLACE_WITH_NAME_OF_ACCOUNT>/us-west-2/mgmt && terragrunt run-all apply)
```

:::note

Because this uses `run-all`, the command will not pause to show you the plan. If you wish to view the plan,
run `apply` in each subfolder of the `mgmt` folder, in dependency graph order. You can see the dependency graph by using
the [graph-dependencies terragrunt
command](https://terragrunt.gruntwork.io/docs/reference/cli-options/#graph-dependencies).

:::

At this point, the ECS Deploy Runner is provisioned in the new account, and you can start using the Gruntwork Pipeline
to provision new infrastructure in the account.

# Try out the ECS Deploy Runner

At this point, you can see if the ECS Deploy Runner can be used to deploy your infrastructure. To test, use the
[infrastructure-deployer CLI](https://github.com/gruntwork-io/module-ci/tree/master/modules/infrastructure-deployer).

To use the `infrastructure-deployer` CLI, use `gruntwork-install` to install a pre-compiled version for your system:

```bash
gruntwork-install --binary-name "infrastructure-deployer" --repo "https://github.com/gruntwork-io/module-ci" --tag "v0.27.2"
```

Then, invoke the `infrastructure-deployer` against the `master` branch of your live infrastructure to run a `plan` on
the `vpc-mgmt` module (don’t forget to assume the role):

```bash
# NOTE: you should assume the IAM role allow-auto-deploy-from-other-accounts before running this step
infrastructure-deployer --aws-region "us-east-2" -- \
  terraform-planner infrastructure-deploy-script \
  --ref "master" \
  --binary "terragrunt" \
  --command "plan" \
  --deploy-path "production/us-east-2/prod/networking/vpc-mgmt"
```

If everything is set up correctly, you should see a stream of logs that indicate a `terragrunt plan` running on the
`vpc-mgmt` module.

:::note

We don’t specify the infrastructure-live repository in the command. The ECS Deploy Runner will automatically
select the provided `infrastructure-live` repository when
`var.terraform_planner_config.infrastructure_live_repositories` and
`var.terraform_applier_config.infrastructure_live_repositories` is a list with a single item.

:::

You can see all the containers and scripts that you can invoke using the `infrastructure-deployer` by running the
`--describe-containers` command:

    infrastructure-deployer --describe-containers --aws-region us-west-2

Running this command will provide output similar to below:

    INFO[2020-08-17T10:00:44-05:00] The Lambda function arn:aws:lambda:ca-central-1:738755648600:function:7kr4n5-ecs-deploy-runner-gmvitx-invoker supports the following containers (container is in bold):  name=infrastructure-deployer
    INFO[2020-08-17T10:00:44-05:00]   terraform-applier
    INFO[2020-08-17T10:00:44-05:00]         infrastructure-deploy-script
    INFO[2020-08-17T10:00:44-05:00]         terraform-update-variable
    INFO[2020-08-17T10:00:44-05:00]   terraform-planner
    INFO[2020-08-17T10:00:44-05:00]         infrastructure-deploy-script
